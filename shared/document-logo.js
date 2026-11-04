/** Link document toolbar logos to the documentation portal. */
export function linkDocumentLogos(href) {
  for (const host of document.querySelectorAll('[logo]')) {
    host.setAttribute('logo-href', href);
  }
}
