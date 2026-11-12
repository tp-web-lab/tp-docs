import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
const root = new URL('../packages/asciidoc/', import.meta.url);
let source = readFileSync(new URL('source/syntax-quick-reference.adoc', root), 'utf8');
// Exclude upstream editorial comments, while keeping comment syntax inside listings.
let sourceListing = '';
let editorialComment = false;
source = source.split('\n').filter(line => {
  if (!sourceListing && line === '////') { editorialComment = !editorialComment; return false; }
  if (editorialComment) return false;
  if (/^-{4,}$/.test(line)) {
    if (!sourceListing) sourceListing = line;
    else if (sourceListing === line) sourceListing = '';
  }
  return true;
}).join('\n');
source = source.replace(':navtitle: Syntax Quick Reference', ':navtitle: Syntax Quick Reference\n:showtitle:\n:listing-caption: Example\n:source-language: asciidoc');
const intro = `
*tp-asciidoc* adapts https://github.com/asciidoctor/asciidoctor.js[Asciidoctor.js] for the web, with convenient support for TP components and standard HTML elements.
This quick reference covers AsciiDoc syntax. The additional component and HTML syntax is covered separately in link:extensions.adoc[Extensions].

[tp-callout,variant=info]
====
This quick reference reproduces the https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/[AsciiDoc Syntax Quick Reference] by Sarah White, Dan Allen and other contributors, under https://creativecommons.org/licenses/by/4.0/[CC BY 4.0].
The https://github.com/asciidoctor/asciidoc-docs/blob/45b7693d7327c8850e7f486049c125fb61e666db/docs/modules/ROOT/pages/syntax-quick-reference.adoc[original source] is pinned to revision \`45b7693d7327c8850e7f486049c125fb61e666db\`.

Executable examples use the https://tp-web-lab.github.io/tp-components/#/components/asciidoc-viewer/index.md[\`tp-asciidoc-viewer\`] component from the \`@tp/tp-components\` library in lite mode. You can easily edit and modify their AsciiDoc source directly in the viewer to experiment with the syntax and immediately see the result.

For this TP adaptation, Antora includes have been expanded, documentation links point to the official site and rendered image paths have been resolved. Examples use continuous numbering. Image URLs and the release-version attribute are made explicit in those isolated examples; outer-listing annotation markers are removed. Examples requiring unavailable files, filesystem access or external services are explicitly marked as syntax-only. Document examples include the attributes and content needed to display their result. The results use the TP semantic HTML renderer and TP styling, so their appearance may differ from the original site. The audio and MP4 examples use bundled TP demonstration assets. YouTube and Vimeo players and other external media depend on their providers; sample filenames in code blocks are illustrative and are not downloadable assets of this guide.
====

[tp-toc%expand-all,position=end]
====
====

`;
source = source.replace('[IMPORTANT]\n', intro + '[IMPORTANT]\n');
source = source.replace('IMPORTANT: You must set the `experimental` attribute in the document header to enable these macros.', 'NOTE: TP AsciiDoc enables `experimental` by default. Keyboard, menu and button macros work without an `:experimental:` document header. Standard Asciidoctor requires this attribute to be enabled explicitly.');
source = source.replace("You must enable xref:verbatim:source-highlighter.adoc[source highlighting]", "TP AsciiDoc uses highlight.js by default for syntax highlighting. You do not need to declare the `source-highlighter` attribute.\n\nWith standard Asciidoctor, you must enable xref:verbatim:source-highlighter.adoc[source highlighting]");
// Preserve the cross-reference target supplied by Antora on the original site.
source = source.replace('== Paragraphs\n', '[#paragraphs]\n== Paragraphs\n');
// Keep code samples literal; adapt only links and images in rendered prose/results.
let listing = false;
source = source.split('\n').map(line => {
  if (line === '----') { listing = !listing; return line; }
  if (listing) return line;
  line = line.replace(/xref:asciidoctor:syntax-highlighting:index\.adoc\[\]/g, 'https://docs.asciidoctor.org/asciidoctor/latest/syntax-highlighting/[Asciidoctor syntax highlighting]');
  line = line.replace(/xref:([\w-]+):([\w/-]+)\.adoc(#[\w-]+)?\[([^\]]*)\]/g, (_, module, page, hash = '', label) => `https://docs.asciidoctor.org/asciidoc/latest/${module}/${page}/${hash}[${label || page.split('/').at(-1).replaceAll('-', ' ')}]`);
  return line.replace(/image:(:?)(?:macros:)?(sunset\.jpg|play\.png|pause\.png)\[/g, (_, block, file) => `image:${block}https://docs.asciidoctor.org/asciidoc/latest/macros/_images/${file}[`);
}).join('\n');
// Replace each published source/result pair with one editable lite viewer.
const results = new Set();
source = source.replace(/^\.View result of <<([^>]+)>>\n\[(?:example)?%collapsible\.result\]\n(={4,}|-{2})\n([\s\S]*?)^\2$/gm,
  (_block, id) => { results.add(id); return ''; });
const examples = new URL('public/docs/quick-reference-examples/', root);
mkdirSync(examples, { recursive: true });
writeFileSync(new URL('document-b.html', examples), '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Document B</title></head><body><h1>Document B</h1><h2 id="section-b">Section B</h2><p>You followed the link to a real sample document.</p><p><a href="javascript:history.back()">Back to the example</a></p></body></html>');
const media = new URL('media/', examples);
mkdirSync(media, { recursive: true });
for (const name of ['melody.wav', 'moving-shapes.mp4']) {
  copyFileSync(new URL(`source/media/${name}`, root), new URL(name, media));
}
const includeFiles = {
  'customers.csv': 'Name,City,Email\nAlice Martin,Paris,alice@example.org\nJames Wilson,London,james@example.org\n"Rivera, Sofia",Madrid,sofia@example.org\n',
  'app.rb': "require 'sinatra'\n\nget '/hi' do\n  'Hello from an included Ruby file!'\nend\n",
  'src/main/java/org/asciidoctor/Asciidoctor.java': 'package org.asciidoctor;\n\npublic class Asciidoctor {\n    public String greet(String name) {\n        return "Hello, " + name + "!";\n    }\n}\n',
  'lib/app.rb': "module Demo\n  # tag::main[]\n  def greet(name)\n    puts \"Hello, #{name}!\"\n  end\n  # end::main[]\nend\n",
};
for (const [path, content] of Object.entries(includeFiles)) {
  const file = new URL(path, examples);
  mkdirSync(new URL('.', file), { recursive: true });
  writeFileSync(file, content);
}
let viewers = 0;
source = source.replace(/^\.([^\n]+)\n\[#([^,\]]+)(?:,[^\]]*)?\]\n(-{4,})\n([\s\S]*?)^\3$/gm,
  (block, title, id, _delimiter, code) => {
    if (!results.has(id)) return block;
    if (id === 'ex-callouts') title = 'Code annotations included when copying';
    if (id === 'ex-hide-callouts') {
      title = 'Code annotations excluded from copying';
      code = '[source,text,role=no-copy-callouts]\n' + code;
    }
    // These markers annotate the outer listing, not the example being executed.
    code = code.replace(/ <\.>/g, '').replace(/^<\.>$/gm, '');
    code = code.replace(/image:(:?)(?:macros:)?(sunset\.jpg|play\.png|pause\.png)\[/g,
      (_, blockImage, file) => `image:${blockImage}https://docs.asciidoctor.org/asciidoc/latest/macros/_images/${file}[`);
    code = code.replace(':release-version: pass:a[{release-version}]', ':release-version: 2.4.3');
    writeFileSync(new URL(`${id}.adoc`, examples), code);
    viewers++;
    results.delete(id);
    return `[#${id}]\n*${title}*\n\n${id === 'ex-callouts' ? 'Select and copy the code in the result: the numbered annotation markers are included. Compare with the next example, which excludes them.\n\n' : id === 'ex-hide-callouts' ? 'Select and copy the code in the result: the numbered annotation markers are excluded. These markers refer to the explanations below the code; they are not tp-callout components. Each line illustrates a different language’s comment syntax.\n\n' : ''}[tp-asciidoc-viewer%lite,src=docs/quick-reference-examples/${id}.adoc]\n====\n====`;
  });
if (results.size) throw new Error(`Missing sources for: ${[...results].join(', ')}`);
if (viewers !== 66) throw new Error(`Expected 66 paired examples, got ${viewers}`);
// Use one explicit sequence for viewers and source-only samples. Native listing
// counters cannot include viewer headings, and restart at the first listing.
source = source.replace(':listing-caption: Example', ':listing-caption!:');
let number = 0;
let standalone = 0;
source = source.replace(/^\[#(ex-[^\]]+)\]\n\*([^\n]+)\*|^\.([^\n]+)\n(?:\[#([^\]]+)\]\n)?(-{4,})\n([\s\S]*?)^\5$/gm,
  (_block, viewerId, viewerTitle, title, explicitId, _fence, originalCode) => {
    number++;
    if (viewerId) return `[#${viewerId}]\n*Example ${number}. ${viewerTitle}*`;
    const id = explicitId || `ex-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`;
    let code = originalCode;
    if (title === 'Link to relative file') code = 'link:docs/quick-reference-examples/document-b.html[Document B]\n';
    if (title === 'Inter-document cross references') code = code.replaceAll('xref:document-b.adoc', 'xref:docs/quick-reference-examples/document-b.adoc');
    if (title === 'Embedded YouTube video') code = 'video::9FWIG_c6PfI[youtube]\n';
    if (title === 'Embedded Vimeo video') code = 'video::76979871[vimeo]\n';
    if (title === 'Block audio macro') code = '.Short melody\naudio::docs/quick-reference-examples/media/melody.wav[]\n';
    if (title === 'Block video macro') code = '.Moving shapes\nvideo::docs/quick-reference-examples/media/moving-shapes.mp4[width=480]\n';
    const includedFile = title === 'Source block content included from a file' ? 'app.rb' : title === 'Source block content included from file relative to source directory' ? 'src/main/java/org/asciidoctor/Asciidoctor.java' : title === 'Strip leading indentation from partial file content' ? 'lib/app.rb' : title === 'Table from CSV data in file' ? 'customers.csv' : '';
    if (includedFile) code = code.replaceAll('\\include::', 'include::');
    if (title === 'Table from CSV data in file') code = '[format=csv,options=header]\n|===\ninclude::customers.csv[]\n|===\n';
    let limitation = '';
    if (!includedFile && /\\?include::/.test(code)) limitation = 'Syntax only: the source files or remote content referenced here are not bundled. Examples 56–58 demonstrate working includes with supplied files.';
    else if (/link:.*(?:index\.html|server\\)/.test(code)) limitation = 'Syntax only: the referenced document is a placeholder and is not supplied with this example.';
    else if (/:data-uri:/.test(code)) limitation = 'Syntax only: embedding external images as data URIs requires file access during conversion and is not demonstrated by this browser renderer.';
    if (limitation) return `[#${id}]\n*Example ${number}. ${title}*\n\n${limitation}\n\n${_fence}\n${code}${_fence}`;
    if (code.startsWith('= ')) {
      const blank = code.indexOf('\n\n');
      if (blank >= 0) code = code.slice(0, blank) + '\n:showtitle:' + code.slice(blank);
      else code = code.trimEnd() + '\n:showtitle:\n\n';
    }
    if (title === 'Document header with attribute entries') code = code.replace(':homepage: https://example.org', ':homepage: https://asciidoc.org') + '\nVisit the {homepage}[AsciiDoc homepage] to learn more.\n';
    if (title === 'Book section levels') code = code.replace('\n:showtitle:', '\n:doctype: book\n:showtitle:') + '\n== A chapter in the second part\n\nEach part contains at least one chapter.\n';
    if (title === 'Line and block comments') code += '\nThis paragraph is visible; the comments above are omitted from the result.\n';
    if (title === 'Activate Table of Contents for a document') code += '\n== Introduction\n\nA first section.\n\n== Next steps\n\nA second section.\n';
    writeFileSync(new URL(`${id}.adoc`, examples), code);
    standalone++;
    return `[#${id}]\n*Example ${number}. ${title}*\n\n${includedFile ? `Open link:docs/quick-reference-examples/${includedFile}[${includedFile},window=_blank] to inspect the file included below.\n\n` : ""}[tp-asciidoc-viewer%lite,src=docs/quick-reference-examples/${id}.adoc]\n====\n====`;
  });
if (number < 90) throw new Error(`Unexpected example count: ${number}`);
console.log(`Numbered ${number} examples; added ${standalone} standalone viewers.`);
// Point the compact cell-format example to the complete table tutorial.
source = source.replace(
  '[tp-asciidoc-viewer%lite,src=docs/quick-reference-examples/ex-cell-format.adoc]\n====\n====',
  '[tp-asciidoc-viewer%lite,src=docs/quick-reference-examples/ex-cell-format.adoc]\n====\n====\n\nFor a step-by-step explanation, start with https://docs.asciidoctor.org/asciidoc/latest/tables/build-a-basic-table/[Build a Basic Table] in the complete AsciiDoc documentation, then follow the subsequent table topics for column formatting, cell alignment, and cells spanning multiple rows or columns.'
);
source = source.replace(
  '== IDs, roles, and options\n',
  '== IDs, roles, and options\n\nRoles correspond to CSS classes: `.role` or `role=role` adds a class to the generated HTML element. Options are boolean flags: a present option means `true`, and an absent option means `false`. For TP components, options become boolean HTML attributes; use `%option` or `options=option` to enable them. For standard AsciiDoc elements, options control the converter’s behavior and do not necessarily become HTML attributes.\n'
);
// Outer-listing callout explanations remain as ordinary numbered explanations.
source = source.replace(/^<\.> /gm, '. ');
source = source.trimEnd() + '\n\nFor more details and further examples, see the https://docs.asciidoctor.org/asciidoc/latest/[complete AsciiDoc documentation].\n';
const directory = new URL('public/docs/', root);
mkdirSync(directory, { recursive: true });
writeFileSync(new URL('base.adoc', directory), source);
writeFileSync(new URL('syntax-quick-reference-LICENSE.txt', directory), readFileSync(new URL('source/syntax-quick-reference-LICENSE.txt', root)));
console.log(`Generated AsciiDoc syntax quick reference with ${viewers + standalone} lite viewers.`);
