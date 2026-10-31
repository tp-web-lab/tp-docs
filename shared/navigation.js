import { linkDocumentLogos } from './document-logo.js';
import { sites } from './sites.mjs';
import './style.css';

// Document shells expect a path rooted at the server, including any publication prefix.
for (const shell of document.querySelectorAll('[repository]')) {
  const repository = shell.getAttribute('repository');
  if (repository.startsWith('./')) {
    shell.setAttribute('repository', new URL(repository, window.location.href).pathname);
  }
}

const current = document.documentElement.dataset.site;
const nav = document.querySelector('[aria-label="Documentation"]');
const root = new URL(current === 'home' ? './' : '../', window.location.href);
for (const site of nav ? sites : []) {
  const link = document.createElement('a');
  link.textContent = site.title;
  link.href = import.meta.env.DEV
    ? `http://127.0.0.1:${site.port}/`
    : new URL(site.id === 'home' ? './' : `${site.id}/`, root).href;
  if (site.id === current) link.setAttribute('aria-current', 'page');
  nav.append(link);
}

if (nav && current !== 'home') {
  const api = document.createElement('a');
  api.textContent = 'API reference';
  api.href = new URL('./api/index.html', window.location.href).href;
  nav.append(api);
}

const home = sites.find(site => site.id === 'home');
const homeUrl = import.meta.env.DEV
  ? new URL(`http://${window.location.hostname}:${home.port}/`)
  : root;
linkDocumentLogos(homeUrl.href);

// The component reference is shared by all guides; keep the selected component in the drawer.
const componentSite = sites.find(site => site.id === 'components');
const componentRoot = import.meta.env.DEV
  ? new URL(`http://${window.location.hostname}:${componentSite.port}/`)
  : new URL('components/', root);
for (const [name, path] of [
  ['tp-components-docs-root', 'docs/components/'],
  ['tp-components-api-root', 'api/'],
]) {
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = new URL(path, componentRoot).href;
  document.head.append(meta);
}
