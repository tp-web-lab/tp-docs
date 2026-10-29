import { sites } from './sites.mjs';
import './style.css';

const current = document.documentElement.dataset.site;
const nav = document.querySelector('[aria-label="Documentation"]');
const root = new URL(current === 'home' ? './' : '../', window.location.href);
for (const site of sites) {
  const link = document.createElement('a');
  link.textContent = site.title;
  link.href = import.meta.env.DEV
    ? `http://127.0.0.1:${site.port}/`
    : new URL(site.id === 'home' ? './' : `${site.id}/`, root).href;
  if (site.id === current) link.setAttribute('aria-current', 'page');
  nav.append(link);
}
