import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../packages/markdown/', import.meta.url);
const guide = JSON.parse(readFileSync(new URL('source/commonmark/guide.json', root), 'utf8'));
const directory = new URL('public/docs/commonmark-examples/', root);
mkdirSync(new URL('images/', directory), { recursive: true });
writeFileSync(new URL('images/shapes.svg', directory), '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120"><rect width="240" height="120" rx="12" fill="#c8ded8"/><circle cx="65" cy="60" r="30" fill="#50776c"/><path d="M130 90 170 25 210 90Z" fill="#50776c"/></svg>\n');
writeFileSync(new URL('images/dot.svg', directory), '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#50776c"/></svg>\n');
writeFileSync(new URL('destination.html', directory), '<!doctype html><html lang="en"><meta charset="utf-8"><title>CommonMark sample destination</title><h1>Sample destination</h1><p>You followed a link from a CommonMark example.</p><h2 id="practice">Practice</h2><p>This section is the target of the fragment link.</p></html>\n');
const examples = guide.sections.flatMap(section => section.examples);
if (new Set(examples.map(e => e.id)).size !== examples.length) throw new Error('Duplicate example ID');
let page = `# Syntax: CommonMark

**CommonMark** is the reference syntax used throughout this Base guide. This page explains its everyday authoring rules, with ${examples.length} editable examples. TP-specific additions are documented separately in [Extensions](extensions.md); the optional Pandoc dialect is covered in [Pandoc Markdown compatibility](pandoc-markdown.md).

::: tp-callout {variant=info heading="About this guide"}
This guide follows the [CommonMark ${guide.version} specification](${guide.specification}) by John MacFarlane, published under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The explanations and examples are written for this TP guide; they are not a reproduction of the complete specification or its conformance test suite. Each section links to the corresponding specification rules.

The examples use [tp-markdown-viewer](https://tp-web-lab.github.io/tp-components/#/components/markdown-viewer/index.md) from the \`@tp/tp-components\` library in lite mode. Edit their Markdown source to experiment and immediately see the result. Each viewer is an independent document: definitions and settings in one do not affect another.

These viewers render with **TP Markdown's default configuration**, without \`pandoc: true\`. They demonstrate CommonMark syntax through TP's renderer and styling, not a dedicated strict CommonMark mode. TP also enables additional syntax and conveniences; the final section identifies the distinction. None of the examples requires Pandoc mode.
:::

::: tp-toc {position=end}
:::

## Reading the source

CommonMark combines **blocks** (paragraphs, headings, lists, quotations and code blocks) with **inline content** (emphasis, links, images and code spans). Blank lines, indentation and delimiters determine the structure. Font sizes, colors, list markers and spacing are chosen by the renderer and its styles.

Try changing one marker or blank line at a time. A source line break is not necessarily a visible line break, and adding indentation can change a paragraph into code. The examples deliberately keep their content small so these effects are easy to observe.

`;
let number = 0;
for (const section of guide.sections) {
  page += `## ${section.title}\n\n${section.intro}\n\n[CommonMark rules: ${section.title}](${guide.specification}#${section.anchor})\n\n`;
  for (const example of section.examples) {
    number++;
    writeFileSync(new URL(`${example.id}.md`, directory), example.source);
    page += `### Example ${number}: ${example.title}\n\n${example.description}\n\n::: tp-markdown-viewer {lite src="commonmark-examples/${example.id}.md"}\n:::\n\n`;
  }
}
page += `## CommonMark and TP extensions

CommonMark defines the source syntax and its document structure. It does not prescribe the visual theme. A TP-styled heading, quotation, table or code block therefore does not establish a different Markdown rule.

The following features are **outside the CommonMark base**, even when TP enables them by default:

| Feature | Where to learn more |
| --- | --- |
| Pipe and MultiMarkdown tables, definition lists, task lists, alphabetic and Roman list markers | [Extensions](extensions.md) |
| Attributes, bracketed spans, additional text formats and section numbering | [Extensions](extensions.md) |
| YAML metadata, expressions, notes, citations and glossaries | [Extensions](extensions.md) |
| Mathematical notation and TP components | [Extensions](extensions.md) |
| TP element directives such as \`::: tp-box\` and \`:tp-icon:{}\` | [Extensions](extensions.md) |
| Pandoc fenced divs, implicit figures and other optional Pandoc adaptations | [Pandoc compatibility](pandoc-markdown.md) |

TP additionally recognizes bare URLs and applies typographic substitutions by default. For portable CommonMark, use angle-bracket autolinks and do not rely on these conveniences. Automatic heading IDs, syntax highlighting, copy buttons and other interface features belong to the application, not to the CommonMark specification.

Enabling \`pandoc: true\` changes parsing rules for the **whole document**. It is not needed for this Base guide. Do not assume that syntax with different TP and Pandoc meanings can be mixed unchanged; use separate documents or independent viewers to compare modes.

For all edge cases and the complete set of reference examples, read the [CommonMark ${guide.version} specification](${guide.specification}). Its [source and test tools](https://github.com/commonmark/commonmark-spec/tree/${guide.version}) are available in the CommonMark repository. See [Compliance](base-compliance.md) for the measured TP results. Continue with [Extensions](extensions.md) for the additional features of TP Markdown.
`;
writeFileSync(new URL('public/docs/base-syntax.md', root), page);
console.log(`Built CommonMark Base: ${guide.sections.length} sections, ${examples.length} editable examples.`);
