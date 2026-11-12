// Accessibility and smoke tests against the built site in public/.
//   npm run build && npm run test:a11y
// Serves public/ like Caddy's file_server (directory index.html, no SPA
// fallback), then for every route: runs axe-core with the WCAG 2.2 A/AA rules (2.0, 2.1 and 2.2 tags),
// fails on console errors (e.g. hydration mismatches), checks 320px reflow,
// the skip link, rendering without JavaScript, and in-app navigation focus.
// Set SHOTS=dir to also save screenshots.
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const root = path.resolve('public');
const routes = ['/', '/projects/', '/projects/code-visualizer/', '/projects/kibitz-chess/', '/projects/cloud-infrastructure/', '/projects/rebel-locate/'];
const shots = process.env.SHOTS;
if (shots) await mkdir(shots, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const server = http.createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, url);
    if (file !== root && !file.startsWith(root + path.sep)) return res.writeHead(403).end();
    if ((await stat(file)).isDirectory()) {
      if (!url.endsWith('/')) return res.writeHead(308, { Location: `${url}/` }).end();
      file = path.join(file, 'index.html');
    }
    await stat(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  FAIL ${msg}`);
};

async function axe(page, label) {
  await page.addScriptTag({ content: axeSource });
  const result = await page.evaluate(() =>
    // eslint-disable-next-line no-undef
    axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }),
  );
  for (const v of result.violations) {
    fail(`[${label}] axe ${v.id} (${v.impact}): ${v.help}`);
    for (const n of v.nodes.slice(0, 5)) console.log(`       ${n.target.join(' ')} :: ${n.failureSummary?.split('\n')[1] ?? ''}`);
  }
  const incomplete = result.incomplete.filter((i) => i.id === 'color-contrast').flatMap((i) => i.nodes);
  if (incomplete.length) console.log(`  note [${label}] ${incomplete.length} contrast checks need manual review (text over gradients)`);
}

for (const route of routes) {
  console.log(`\n${route}`);
  const slug = route === '/' ? 'home' : route.replaceAll('/', '_').replace(/^_|_$/g, '');

  // 1) Reduced motion: everything visible immediately. Full axe run.
  for (const [name, viewport] of [['desktop', { width: 1280, height: 860 }], ['mobile', { width: 375, height: 760 }]]) {
    const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    const resp = await page.goto(base + route, { waitUntil: 'networkidle' });
    if (resp.status() !== 200) fail(`HTTP ${resp.status()}`);
    await page.waitForFunction(() => window.__hydrated === true);
    await axe(page, `${name}, reduced motion`);
    if (shots) await page.screenshot({ path: `${shots}/${slug}-${name}.png`, fullPage: true });
    for (const e of errors) fail(`[${name}] console: ${e.slice(0, 300)}`);
    await ctx.close();
  }

  // 2) Full motion, after scrolling everything into view (animated end state).
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(2200);
    const hidden = await page.$$eval('.reveal:not(.is-in)', (els) => els.length);
    if (hidden) fail(`${hidden} reveal blocks never became visible after scrolling`);
    await axe(page, 'desktop, full motion');
    await ctx.close();
  }

  // 3) 320px reflow (no horizontal scrolling).
  {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 640 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) fail(`320px: page is ${overflow}px wider than the viewport`);
    await ctx.close();
  }

  // 3b) 200% text-only zoom (WCAG 1.4.4, 2.4.11): the header must not cover the
  // top of the page or hide a focused element completely.
  {
    const ctx = await browser.newContext({ viewport: { width: 800, height: 600 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__hydrated === true);
    await page.addStyleTag({ content: 'html { font-size: 32px !important; }' });
    await page.waitForTimeout(300);
    const covered = await page.evaluate(() => {
      const hb = document.querySelector('.site-header').getBoundingClientRect().bottom;
      const first = document.querySelector('main .breadcrumb, main .hero-eyebrow, main h1');
      return first.getBoundingClientRect().top < hb ? first.textContent.trim().slice(0, 40) : null;
    });
    if (covered) fail(`200% text: "${covered}" starts under the header`);
    for (const dir of ['Tab', 'Shift+Tab']) {
      await page.evaluate((d) => window.scrollTo(0, d === 'Tab' ? 0 : document.body.scrollHeight), dir);
      for (let n = 0; n < 40; n++) {
        await page.keyboard.press(dir);
        const hidden = await page.evaluate(() => {
          const el = document.activeElement;
          const hdr = document.querySelector('.site-header');
          if (!el || el === document.body || hdr.contains(el) || el.classList.contains('skip-link')) return null;
          const r = el.getBoundingClientRect();
          const top = Math.max(r.top, hdr.getBoundingClientRect().bottom);
          return Math.min(r.bottom, innerHeight) <= top ? el.textContent.trim().slice(0, 40) : null;
        });
        if (hidden) {
          fail(`200% text: focused "${hidden}" is entirely hidden (${dir})`);
          break;
        }
      }
    }
    await ctx.close();
  }

  // 4) No JavaScript: prerendered content is present and visible.
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(base + route);
    await page.waitForTimeout(1500); // let the CSS entrance animation finish
    const ok = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return !!h1 && getComputedStyle(h1).opacity !== '0' && document.querySelectorAll('main *').length > 20;
    });
    if (!ok) fail('no-JS: page content missing or hidden');
    await ctx.close();
  }
}

// 5) Keyboard: first Tab lands on the skip link, which moves focus to <main>.
{
  console.log('\nkeyboard + navigation');
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__hydrated === true);
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (first !== 'Skip to content') fail(`first Tab focused "${first}", expected the skip link`);
  await page.keyboard.press('Enter');
  const afterSkip = await page.evaluate(() => document.activeElement?.id);
  if (afterSkip !== 'main') fail(`skip link moved focus to "${afterSkip}", expected #main`);

  // In-app navigation: title updates and focus moves to the new page's h1.
  await page.click('a.card-link[href="/projects/cloud-infrastructure/"]');
  await page.waitForURL('**/projects/cloud-infrastructure/');
  await page.waitForTimeout(800);
  const nav = await page.evaluate(() => ({
    title: document.title,
    focused: document.activeElement?.tagName,
    canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
  }));
  if (!nav.title.startsWith('Personal Cloud Infrastructure')) fail(`title after nav: ${nav.title}`);
  if (nav.focused !== 'H1') fail(`focus after nav on ${nav.focused}, expected H1`);
  if (!nav.canonical?.endsWith('/projects/cloud-infrastructure/')) fail(`canonical after nav: ${nav.canonical}`);

  // Header link to a home section from a subpage scrolls to that section.
  await page.click('.main-nav >> text=Skills');
  await page.waitForURL('**/#skills');
  await page.waitForTimeout(800);
  const top = await page.evaluate(() => document.getElementById('skills')?.getBoundingClientRect().top ?? 9999);
  if (top < 0 || top > 300) fail(`#skills not scrolled into view after nav (top=${top})`);

  // Back returns to the previous scroll position instead of the top.
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__hydrated === true);
  await page.evaluate(() => document.getElementById('projects').scrollIntoView());
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => window.scrollY);
  await page.click('a.card-link[href="/projects/cloud-infrastructure/"]');
  await page.waitForURL('**/projects/cloud-infrastructure/');
  await page.waitForTimeout(800);
  await page.goBack();
  await page.waitForTimeout(1000);
  const after = await page.evaluate(() => window.scrollY);
  if (Math.abs(after - before) > 40) fail(`Back restored scrollY ${after}, expected about ${before}`);

  // Motion toggle: aria-pressed flips and the preference persists across reloads.
  await page.click('.motion-toggle');
  const pressed = await page.getAttribute('.motion-toggle', 'aria-pressed');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__hydrated === true);
  const persisted = await page.evaluate(() => document.documentElement.dataset.motion);
  // Context starts in OS reduced-motion, so the first press turns motion ON.
  if (pressed !== 'false' || persisted !== 'full') fail(`motion toggle: pressed=${pressed}, after reload=${persisted}`);
  await ctx.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} failure(s)` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
