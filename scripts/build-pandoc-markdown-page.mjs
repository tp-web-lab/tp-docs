import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
const root = new URL('../packages/markdown/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('source/pandoc/examples.json', root), 'utf8'));
for (const example of manifest.examples) {
  if (example.status !== 'compatible' && !example.workaround?.explanation?.trim()) {
    throw new Error(`Missing TP alternative for ${example.id}`);
  }
}
function sourceBlock(source) {
  const runs = [...source.matchAll(/`+/g)].map(match => match[0].length);
  const fence = '`'.repeat(Math.max(3, ...runs) + 1);
  return `${fence}markdown\n${source.trimEnd()}\n${fence}\n\n`;
}
const examples = new URL('public/docs/pandoc-markdown-examples/', root);
mkdirSync(new URL('images/', examples), { recursive: true });
writeFileSync(new URL('images/sample.svg', examples), '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120"><rect width="240" height="120" rx="12" fill="#c8ded8"/><circle cx="62" cy="60" r="30" fill="#50776c"/><path d="M120 85 155 30 190 85Z" fill="#50776c"/><text x="120" y="110" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#243d35">TP sample image</text></svg>');
writeFileSync(new URL('example-target.html', examples), '<!doctype html><html lang="en"><meta charset="utf-8"><title>Example link destination</title><h1>Example link destination</h1><p>The Markdown link successfully reached this bundled page.</p><h2 id="special">Special section</h2><p>This is the destination of the fragment link.</p></html>');
for (const name of ['COPYRIGHT', 'COPYING.md']) copyFileSync(new URL(`source/pandoc/${name}`, root), new URL(name, examples));
const unsupportedCategories = JSON.parse(readFileSync(new URL('source/pandoc/unsupported-categories.json', root), 'utf8'));
const unsupportedExamples = manifest.examples.filter(example => example.status === 'unsupported');
for (const example of unsupportedExamples) {
  const matches = unsupportedCategories.filter(category => category.sections.includes(example.section));
  if (matches.length !== 1) throw new Error(`Expected one unsupported category for ${example.id}, found ${matches.length}`);
}
const populatedCategories = unsupportedCategories.map(category => ({
  ...category,
  examples: unsupportedExamples.filter(example => category.sections.includes(example.section)),
})).filter(category => category.examples.length > 0);
function tableCell(value) { return value.replaceAll('|', '\\|').replaceAll('\n', ' '); }
const unsupportedSummary = `## Unsupported examples by category

The ${unsupportedExamples.length} examples marked **Not supported** belong to ${populatedCategories.length} categories. This classification concerns the original Pandoc syntax, not whether the same content can be produced in TP Markdown. Prefer native Markdown when it suffices; use element directives or components where richer behavior is needed. The links lead to the detailed examples and their alternatives.

| Category | Count | Examples | TP Markdown alternative and limits |
| --- | ---: | --- | --- |
${populatedCategories.map(category => `| ${tableCell(category.title)} | ${category.examples.length} | ${category.examples.map(example => { const n = Number(example.id.slice(-3)); return `[${n}](#example-${n})`; }).join(', ')} | ${tableCell(category.alternative)} |`).join('\n')}

`;
const labels = { compatible: 'Compatible', partial: 'Partial', unsupported: 'Not supported' };
const variants = { compatible: 'success', partial: 'warning', unsupported: 'neutral' };
const counts = Object.fromEntries(Object.keys(labels).map(status => [status, manifest.examples.filter(e => e.status === status).length]));
const partialResolvedByPandoc = manifest.examples.filter(e => e.status === 'partial' && e.pandocMode?.status === 'compatible').length;
let page = `# Pandoc’s Markdown: compatibility with tp-markdown

::: tp-callout {variant=info heading="About this compatibility page"}
This page tests Markdown input examples from the **Pandoc’s Markdown** section of John MacFarlane’s [Pandoc User’s Guide](https://pandoc.org/MANUAL.html#pandocs-markdown), distributed under GPL-2.0-or-later. The preserved manual is dated ${manifest.manualDate}; its checksum and the original example sources are retained in this repository. See the bundled [copyright notice](pandoc-markdown-examples/COPYRIGHT) and [license](pandoc-markdown-examples/COPYING.md).

Each example uses [tp-markdown-viewer](https://tp-web-lab.github.io/tp-components/#/components/markdown-viewer/index.md) from \`@tp/tp-components\` in lite mode. Edit the source to experiment with the actual TP result. **These statuses describe the displayed examples, not full conformance to every Pandoc extension.** Parsing without an exception does not imply compatibility.
:::

## Reading the results

- :tp-badge:Compatible{variant=success}: the feature demonstrated by this example is preserved; styling, generated identifiers and incidental HTML may differ.
- :tp-badge:Partial{variant=warning}: part of the example works, but structure, semantics or behavior differs. The explanation identifies the difference.
- :tp-badge:Not supported{variant=neutral}: the demonstrated Pandoc feature is not interpreted, even if ordinary text or other markup still appears.

Baseline: TP’s default Markdown configuration, without enabling optional extensions such as math. Reviewed on ${manifest.testedOn}; reference conversions use Pandoc ${manifest.pandocVersion}. Some non-default Pandoc features require enabling their named extension when comparing with Pandoc. The descriptions and source links explain these settings.

The optional [Pandoc compatibility mode](extensions-optional.md#pandoc-compatibility-mode) adds targeted adaptations for containers, lists, quotations, code, tables, images, HTML blocks and notes. Each affected example includes a **With pandoc: true** explanation and a ready-to-copy source. The gallery below keeps the default configuration, so its baseline statuses are unchanged.

Of the **${counts.partial} Partial examples** in the default configuration, **${partialResolvedByPandoc} become Compatible with \`pandoc: true\`**. The remaining **${counts.partial - partialResolvedByPandoc} stay Partial**: interactive task lists (48), LaTeX float placement (125), and citation formatting (133–135). Example 125 preserves the placement attribute, but does not reproduce LaTeX float positioning in a web page. These counts concern the supplied examples, not full support for the corresponding Pandoc extensions.

**Choose one syntax mode per document.** The \`pandoc\` option applies to the entire Markdown page, not to individual blocks. Standard TP syntax and Pandoc syntax cannot always be mixed unchanged: for example, \`::: tp-box\` creates a TP element in standard mode but a div with class \`tp-box\` in Pandoc mode; write \`::: tp-box {}\` to create the element in Pandoc mode. To compare both modes, use separate documents or independent viewers, each with its own configuration. The gallery's viewers are independent; enabling the option in one does not enable it in the others.

There are **${manifest.examples.length} editable examples**: **${counts.compatible} compatible**, **${counts.partial} partial**, and **${counts.unsupported} not supported**. Badges are a recorded assessment of the supplied source; editing an example does not automatically recalculate its status.

Unavailable image files and placeholder links use bundled fixtures. Missing local headings or reference uses are supplied where necessary, and the three alternative headings with the same ID are tested separately. Every adaptation is stated beside its example. Unsupported syntax is preserved in the viewers instead of being rewritten into TP syntax. Each Partial or Not supported example is followed by a **Currently in TP Markdown** alternative. These alternatives explain the required rewrite or configuration, and distinguish equivalent results from approximations and features without a web equivalent. Code samples can be copied into the viewer above; they do not change the baseline badge.

The ${manifest.excluded.length} omitted code blocks are command lines, templates, syntax fragments, expected output or output-format-specific configuration rather than standalone Markdown input. This is an input-compatibility gallery, not a reproduction of the complete manual or a test of Pandoc’s PDF, DOCX and bibliography-processing pipelines.

::: tp-toc {position=end}
:::

`;
page += unsupportedSummary;
let section = '';
for (const [index, e] of manifest.examples.entries()) {
  if (section !== e.section) { section = e.section; page += `## ${section}\n\n`; }
  writeFileSync(new URL(`${e.id}.md`, examples), e.source);
  page += `### Example ${index + 1}\n\n::: tp-badge {variant=${variants[e.status]}}\n${labels[e.status]}\n:::\n\n${e.explanation}\n\n`;
  if (e.adaptations.length) page += e.adaptations.map(note => `Adaptation: ${note}`).join('\n\n') + '\n\n';
  page += `::: tp-markdown-viewer {lite src="pandoc-markdown-examples/${e.id}.md"}\n:::\n\n`;
  if (e.pandocMode) {
    page += `**With pandoc: true**\n\n${e.pandocMode.explanation} This option applies only to this document.\n\n`;
    page += sourceBlock(`---\npandoc: true\n---\n${e.source}`);
  }
  if (e.status !== 'compatible') {
    page += `**Currently in TP Markdown**\n\n${e.workaround.explanation}\n\n`;
    if (e.workaround.source) page += sourceBlock(e.workaround.source);
    for (const alternative of e.workaround.alternatives ?? []) {
      page += `**${alternative.title}**\n\n${sourceBlock(alternative.source)}`;
    }
  }

}
page += 'For the complete syntax and output rules, see [Pandoc’s Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown). For TP-specific authoring, see [Extensions](extensions.md).\n';
writeFileSync(new URL('public/docs/pandoc-markdown.md', root), page);
console.log(JSON.stringify({ examples: manifest.examples.length, ...counts }));
