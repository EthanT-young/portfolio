// Per-page <head> data. The prerender step writes these into each static
// HTML file; on client-side navigation useDocumentHead() applies them.

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  ogType: 'profile' | 'website' | 'article';
  ogDescription?: string;
};

const ORIGIN = 'https://ethantyoung.com';

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Ethan Young — Software Engineer',
    description: 'Ethan Young — software engineer focused on systems, infrastructure, and applied AI. UNLV CS 2027.',
    ogType: 'profile',
    ogDescription: 'Systems, infrastructure, and applied AI. Multi-agent orchestration, containerized deployments, campus-scale network engineering.',
  },
  {
    path: '/projects/',
    title: 'Projects — Ethan Young',
    description: "Projects by Ethan Young: a code visualizer, a chess game review, cloud infrastructure on Oracle Cloud's free tier, and applied machine learning.",
    ogType: 'website',
    ogDescription: "A code visualizer, a chess game review, cloud infrastructure on Oracle Cloud's free tier, and applied machine learning.",
  },
  {
    path: '/projects/code-visualizer/',
    title: 'Code Visualizer — Ethan Young',
    description: 'A web app for stepping through Java, C++ or Python code line by line and watching arrays, maps, linked lists, trees and the call stack change.',
    ogType: 'article',
  },
  {
    path: '/projects/kibitz-chess/',
    title: 'Kibitz — Ethan Young',
    description: 'A free chess game review in the browser: Stockfish analysis, move verdicts, accuracy and a rule-based coach that explains each move.',
    ogType: 'article',
  },
  {
    path: '/projects/cloud-infrastructure/',
    title: 'Personal Cloud Infrastructure — Ethan Young',
    description: 'Docker services on an Oracle Cloud Always Free instance, behind Caddy with automatic HTTPS.',
    ogType: 'article',
  },
  {
    path: '/projects/rebel-locate/',
    title: 'Rebel Locate — Ethan Young',
    description: 'A team machine learning course project: locating the UNLV building a photo was taken near from its GPS metadata (KNN, 98.01% accuracy) and labeling the type of room (CNN, 91.83% accuracy).',
    ogType: 'article',
  },
];

export const notFoundMeta: RouteMeta = {
  path: '',
  title: 'Page not found — Ethan Young',
  description: 'This page does not exist.',
  ogType: 'website',
};

export function normalizePath(p: string): string {
  return p.endsWith('/') ? p : `${p}/`;
}

export function metaFor(pathname: string): RouteMeta {
  const p = normalizePath(pathname);
  return routes.find((r) => r.path === p) ?? notFoundMeta;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Static <head> tags for prerendering. */
export function headHtml(m: RouteMeta): string {
  const url = ORIGIN + m.path;
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${m.ogType}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.ogDescription ?? m.description)}">`,
    `<meta property="og:url" content="${url}">`,
  ].join('\n    ');
}

/** Client-side equivalent of headHtml, run after in-app navigation. */
export function applyHead(m: RouteMeta): void {
  document.title = m.title;
  const set = (sel: string, attr: string, val: string) => {
    const el = document.head.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  const url = ORIGIN + m.path;
  set('meta[name="description"]', 'content', m.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:type"]', 'content', m.ogType);
  set('meta[property="og:title"]', 'content', m.title);
  set('meta[property="og:description"]', 'content', m.ogDescription ?? m.description);
  set('meta[property="og:url"]', 'content', url);
}
