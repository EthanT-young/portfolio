// Writes a fully rendered HTML file for every route into public/, so each page
// works as a plain static file (no server rewrites, readable without JS) and
// React hydrates it in the browser.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const outDir = path.join(root, 'public');
const ssrDir = path.join(root, '.ssr');

const template = await readFile(path.join(outDir, 'index.html'), 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`Template is missing ${marker}`);
}

const { render, routes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

for (const route of routes) {
  const { html, head } = render(route.path);
  const page = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html);
  const file = path.join(outDir, route.path, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`prerendered ${route.path}`);
}

// Not-found page, so the server can answer unknown URLs with a titled page
// in the site's language instead of an empty body (Caddy: handle_errors).
{
  const { html, head } = render('/404/');
  const page = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html);
  await writeFile(path.join(outDir, '404.html'), page);
  console.log('prerendered 404.html');
}

await rm(ssrDir, { recursive: true, force: true });
