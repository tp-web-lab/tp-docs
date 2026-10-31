/** Link document toolbar logos to the portal, including asynchronously rendered toolbars. */
export function linkDocumentLogos(href) {
  const hosts = document.querySelectorAll('[logo]');
  for (const host of hosts) {
    function synchronize() {
      for (const icon of host.querySelectorAll('tp-icon[data-document-logo]')) {
        if (icon.parentElement?.matches('a[data-docs-home-logo]')) continue;
        const link = document.createElement('a');
        link.dataset.docsHomeLogo = '';
        link.setAttribute('section', 'start');
        link.href = href;
        link.setAttribute('aria-label', 'TP documentation home');
        link.title = 'TP documentation home';
        icon.before(link);
        link.append(icon);
      }
      // A component may move or replace its logo when updating its toolbar.
      for (const link of host.querySelectorAll('a[data-docs-home-logo]')) {
        if (!link.querySelector('[data-document-logo]')) link.remove();
      }
    }
    synchronize();
    new MutationObserver(synchronize).observe(host, { childList: true, subtree: true });
  }
}
