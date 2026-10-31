// TypeDoc copies this classic script to api/assets/custom.js.
const tpApiSiteRoot = new URL('../../', document.currentScript.src);

function tpApiEnhancePage() {
  const navigation = document.createElement('nav');
  navigation.setAttribute('aria-label', 'Documentation links');
  navigation.style.cssText = 'display:flex;gap:1rem;flex-wrap:wrap;padding:1rem;';
  const localDevelopment = ['127.0.0.1', 'localhost'].includes(location.hostname)
    && ['4321', '4322', '4323', '4324'].includes(location.port);
  const portal = localDevelopment
    ? new URL(`http://${location.hostname}:4320/api/index.html`)
    : new URL('../api/index.html', tpApiSiteRoot);
  for (const [label, href] of [['Guides and examples', tpApiSiteRoot], ['All API references', portal]]) {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href.href;
    navigation.append(link);
  }
  const main = document.querySelector('main');
  (main ?? document.body).prepend(navigation);

  const examples = [...document.querySelectorAll('.tsd-tag-example > pre > code')]
    .map(code => ({ code, source: code.textContent.trim().replace(/^(?:\s*\/\/[^\n]*\n)+/, '').trim() }))
    .filter(example => example.source.startsWith('<'));
  if (examples.length === 0) return;
  document.documentElement.setAttribute('data-tp-preserve-document-styles', '');
  import(new URL('@tp/tp-components/tp-loader.js', tpApiSiteRoot).href)
    .then(() => {
      for (const { code, source } of examples) {
        const viewer = document.createElement('tp-html-viewer');
        const template = document.createElement('template');
        viewer.setAttribute('lite', '');
        template.innerHTML = source;
        viewer.append(template);
        code.parentElement.replaceWith(viewer);
      }
    })
    .catch(error => console.error('Could not load API example previews.', error));
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tpApiEnhancePage, { once: true });
} else {
  tpApiEnhancePage();
}
