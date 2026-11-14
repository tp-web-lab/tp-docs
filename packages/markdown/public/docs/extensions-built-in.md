# Built-in extensions

These extensions provide additional syntax, formatting and document features. Edit the examples to experiment; each example is an independent document.

Browse the themes below or choose a subsection under **Built-in** in the sidebar.

[Extension overview](extensions.md)

::: tp-toc {position=end}
:::

## Text and typography {#text-and-typography}

### Additional text formats

These delimiters extend CommonMark emphasis and inline code:

| Source | Meaning | HTML |
| --- | --- | --- |
| `==marked==` | Highlighted text | `mark` |
| `++inserted++` | Inserted text | `ins` |
| `~~obsolete~~` | Struck-through text | `s` |
| `x^2^` | Superscript | `sup` |
| `H~2~O` | Subscript | `sub` |

Use `<del>removed text</del>` for semantic deletion. Paired hash characters remain literal: `#text#` does not apply formatting.

Keep delimiters on the same line. Use a backslash to escape a literal delimiter, or put literal syntax in a code span.

::: tp-markdown-viewer {lite src="extensions-examples/formats.md"}
:::

### Automatic links and typography

TP enables automatic recognition of bare web addresses and typographic substitutions. For example, quotation marks can become curly quotes and `(c)` can become ©. Code spans and code blocks remain literal. Applications using the JavaScript parser can set `linkify: false` and `typographer: false` when literal behavior is needed.

::: tp-markdown-viewer {lite src="extensions-examples/typography.md"}
:::

### Bracketed spans

Write `[inline content]{attributes}` to create an HTML `span`.

```markdown
[This is *some text*]{.class key="val"}
```

The attributes belong to the span, not its paragraph. Use `#id`, `.class`, or `key="value"`; place the attribute block immediately after the closing bracket. Inline Markdown, links and nested spans remain supported. The existing `:span:content{attributes}` syntax also remains available.

With the shared TP styles, `[Underline]{.underline}`, `[Small caps]{.smallcaps}` and `[Mark]{.mark}` apply the corresponding formatting.

::: tp-markdown-viewer {lite src="extensions-examples/spans.md"}
:::

## Lists {#lists}

### Alphabetic and Roman lists

In addition to numeric CommonMark lists, TP recognizes alphabetic and Roman markers followed by a period: `a.`, `A.`, `i.`, `ii.`, `I.`, `II.`. Keep each sequence consistent and separate different lists with a paragraph or another block. The output uses the corresponding HTML list type. For a specific starting number, use a numeric list with `{type=A start=3}` after it.

Checkbox markers `[ ]` and `[x]` make interactive task items. Radio markers `( )` and `(x)` make single-choice items; choices in the same list share a group.

::: tp-markdown-viewer {lite src="extensions-examples/lists.md"}
:::

### Definition lists

Put a term on a line and introduce each definition with `:` or `~`. A blank line between the term and definition is optional. Multiple definitions may follow one term. Indent continuation content to keep it inside the definition.

::: tp-markdown-viewer {lite src="extensions-examples/definitions.md"}
:::

## Tables {#tables}

### Pipe tables

Separate cells with pipes and place a separator row after the header. Colons in the separator select left, right or centered alignment. TP applies its shared table styles and recognizes numeric cells. Escape a literal pipe with a backslash. More advanced structures are available through the MultiMarkdown features below.

::: tp-markdown-viewer {lite src="extensions-examples/pipe-tables.md"}
:::

### MultiMarkdown tables

TP Markdown uses `markdown-it-multimd-table`, which implements an extension of [MultiMarkdown table syntax](https://fletcher.github.io/MultiMarkdown-6/syntax/tables.html). The `multiline`, `rowspan`, `headerless` and `multibody` options are enabled by default.

- Adjacent pipes (`||`) merge columns.
- `^^` merges a cell into the cell above it.
- A backslash at the end of a source row continues that row on the next line, allowing lists and code blocks inside cells.
- Several rows before the separator form a multirow header.
- Starting with the separator row omits the header.
- A blank line between body rows starts another `tbody`.
- `[Caption]` before or after the table supplies its caption.

A blank line creates a separate table body (`tbody`), not a footer (`tfoot`).

::: tp-markdown-viewer {lite src="extensions-examples/multimd-tables.md"}
:::

### List tables

A fenced `list-table` block describes rows as an outer bullet list and cells as the nested list within each row. By default, the first row is the header. The options `no-heading` and `caption="..."` remove the header and set a caption respectively. The browser runtime converts the placeholder into a table; a plain parser call alone does not complete that step.

Add a row or change a cell. Try adding `no-heading` to the fence options.

::: tp-markdown-viewer {lite src="extensions-examples/list-table.md"}
:::

### Data tables

Use a fenced data block to generate a table from CSV, JSON or newline-delimited JSON:

- `csv-table`: comma-separated values. The first row supplies the column headings. Quote values containing commas; double a quote inside a quoted value.
- `json-table`: a JSON object or an array of objects. Object keys supply the column headings.
- `ndjson-table`: one JSON object per line, without a surrounding array.

For JSON and NDJSON, columns follow the order in which keys are first encountered. A missing key produces an empty cell. Numeric cells use the table's numeric formatting.

All three examples describe the same two records.

#### CSV

::: tp-markdown-viewer {lite src="extensions-examples/csv-table.md"}
:::

#### JSON

::: tp-markdown-viewer {lite src="extensions-examples/json-table.md"}
:::

#### NDJSON

::: tp-markdown-viewer {lite src="extensions-examples/ndjson-table.md"}
:::

## References {#references}

### Bibliography references

Define an entry with `[@key]: ...` and cite it with `[@key]`. The citation shows its key and offers a preview of the definition. Add `::bibliography{}` where you want the visible bibliography and its link destinations. Definitions can contain Markdown.

Entries are displayed as written, with their citation keys.

::: tp-markdown-viewer {lite src="extensions-examples/bibliography.md"}
:::

### Citation groups

Group bibliography references with semicolons: `[@doe99; @smith2000; @smith2004]`. Each key has its own link and hover preview inside one pair of brackets.

```markdown
See [@source-a; @source-b].

[@source-a]: Bibliographic details for the first source.

[@source-b]: Bibliographic details for the second source.

::bibliography{}
```

The definitions supply preview content; `::bibliography{}` displays the entries and creates the link targets. Groups retain the authored order and display citation keys. This is not citeproc: automatic author–date formatting, sorting, author suppression and CSL styles are not supported.

Prefixes, page/chapter indications and inline Markdown are also accepted in citation groups:

```markdown
[see @doe99, pp. 33-35 and *passim*; @smith04, chap. 1]
```

These indications are displayed as written, without interpreting page ranges or applying a citation style.

::: tp-markdown-viewer {lite src="extensions-examples/citation-groups.md"}
:::

### Notes

Use `[^key]` for a numbered note reference and `[^key]: ...` for its definition. Add `::notes{}` to display the notes and provide their link destinations. The reference also offers a preview of the definition.

::: tp-markdown-viewer {lite src="extensions-examples/notes.md"}
:::

### Glossary

Define a term with `[%key]: ...`, refer to it explicitly with `[%key]`, and display the glossary with `::glossary{}`. The reference supplies a preview and a link to the definition. Writing the plain word elsewhere does not automatically create another glossary reference.

::: tp-markdown-viewer {lite src="extensions-examples/glossary.md"}
:::

### Index and lists of elements

Mark an index occurrence with ``:index:`term` `` and insert `::index{}` to collect the entries and their occurrence links. The marker inserts an invisible anchor: write the visible word separately. This indexes marked occurrences, not every matching word in the document.

`::listof{selector}` requests a browser-generated list of matching elements, for example `::listof{figure}`. It requires the Markdown runtime to inspect the rendered document; the parser alone emits a placeholder.

::: tp-markdown-viewer {lite src="extensions-examples/index.md"}
:::

## Sections and headings {#sections-and-headings}

### Heading anchors

Headings receive generated IDs automatically, so they can be targets of links and entries in a table of contents. Give a heading an explicit `{#id}` when you want a stable destination independent of its wording. This does not enable section numbering.

::: tp-markdown-viewer {lite src="extensions-examples/anchors.md"}
:::

### Section numbering

Section numbering is disabled by default. Enable it through the document settings:

```yaml
---
sectionNumbering:
  enabled: true
  maxLevel: 3
---
```

`maxLevel` limits the numbered heading depth, from 1 to 6 (default: 6). Use `{-}` or `{.unnumbered}` to exclude an individual heading.

```markdown
# Preface {-}
# Introduction
## Background
## A note {.unnumbered}
## Objectives
# Conclusion
```

The numbered headings are `1 Introduction`, `1.1 Background`, `1.2 Objectives` and `2 Conclusion`. Excluded headings remain in the table of contents and do not increment or reset counters. The exclusion applies only to that heading: subsequent child headings retain normal numbering. Other classes and IDs can be combined with the marker, for example `# Preface {- #preface .intro}`.

::: tp-markdown-viewer {lite src="extensions-examples/numbering.md"}
:::

### Table of contents

Insert `[[toc]]` to collect the document headings into a collapsible table of contents. `[[toc:Contents]]` sets its label; `{position=end}` places it at the end side of the layout. The YAML setting `toc.maxLevel` limits the heading depth.

::: tp-markdown-viewer {lite src="extensions-examples/toc.md"}
:::

### Page navigation

The built-in page-navigation helper can append Previous, Top and Next links when the host enables `pageNavRoot`. It uses the current document path and the configured sidebar file map to determine adjacent pages. A standalone document cannot infer its neighbors merely from its headings.

The `pageNav` settings can customize the Top link's label and destination.

Use Previous and Next to move through the three sample pages. Top returns to the beginning of the current page. The host example defines the page sources and their sidebar order; changing that order changes the adjacent-page links.

::: tp-html-viewer {lite src="extensions-examples/page-nav.html"}
:::

## HTML and custom elements {#custom-elements}

### Attributes

Attach attributes with `{...}`: `#name` supplies an ID, `.name` adds a CSS class, `key=value` supplies an attribute, and a bare name supplies a boolean attribute. Quote values containing spaces. Attributes do not create CSS rules: a class must be defined by TP or by your stylesheet.

Place a block attribute list on its own line immediately after the block. Heading attributes can be appended to the heading text. For an inline span, use the [bracketed-span syntax](#bracketed-spans). IDs must be unique within the document.

::: tp-markdown-viewer {lite src="extensions-examples/attributes.md"}
:::

### HTML and custom elements

Use colon directives to create standard HTML elements or custom elements while keeping Markdown inside their content. In standard TP mode, `::: tp-box` names an element directly; an attribute block is optional. An inline directive has the form `:tag:content{attributes}`; for an empty inline element, leave out the content.

For nested block elements, use longer colon fences around the outer element. Each closing fence must match its opening fence in standard TP mode. A component still needs its JavaScript definition: TP's loader provides TP components in this documentation; load the relevant library yourself for other custom elements.

Inline notation is appropriate only for elements that can occur inside a paragraph, such as `tp-icon`. A block-only component should use a block directive.

::: tp-markdown-viewer {lite src="extensions-examples/elements.md"}
:::

### Raw HTML fences

A `raw html` fence (also spelled `raw-html`) inserts its contents as HTML without interpreting Markdown or dropping its internal blank lines. In contrast, a normal `html` fence displays HTML as code.

Prefer ordinary Markdown or element directives when they express the content. Use a raw fence only when preserving an HTML fragment verbatim is necessary.

::: tp-markdown-viewer {lite src="extensions-examples/raw-html.md"}
:::

## Layout {#layout}

### Layout classes

These layout classes are inspired by [Every Layout](https://every-layout.dev/).

The built-in layout stylesheet provides [`.stack`](#stack), [`.cluster`](#cluster), [`.switcher`](#switcher), [`.sidebar`](#sidebar), [`.cover`](#cover), [`.center`](#center), [`.grid`](#grid), [`.reel`](#reel) and [`.card`](#card). Apply these classes through attributes or element directives. They arrange content without introducing a new Markdown block syntax.

Each example below demonstrates one layout. Open its source to edit the CSS variables, and resize the preview to observe how the content adapts.

#### Stack

Arrange blocks vertically. Change `--layout-space` to adjust their separation.

::: tp-markdown-viewer {lite src="extensions-examples/layout-stack.md"}
:::

#### Cluster

Keep items at their natural width and wrap them onto additional rows when space runs out. Try `--cluster-justify:center` or `space-between`.

::: tp-markdown-viewer {lite src="extensions-examples/layout-cluster.md"}
:::

#### Switcher

Display equal-width columns above `--switcher-threshold` and stack them below it. Resize the preview across the 36rem threshold.

::: tp-markdown-viewer {lite src="extensions-examples/layout-switcher.md"}
:::

#### Sidebar

Place a narrower first child beside the main content. The main content requires at least `--sidebar-content-min`; when space is insufficient, the two blocks stack.

::: tp-markdown-viewer {lite src="extensions-examples/layout-sidebar.md"}
:::

#### Cover

Keep an introduction at the top, a `.centered` block vertically centered in the available space, and a footer at the bottom. Add `style="text-align:center"` to the `.centered` block to center its text horizontally as well, as shown here. Apply this style to the `.cover` container instead to center the introduction and footer too. This example uses a fixed minimum height rather than the default viewport height.

::: tp-markdown-viewer {lite src="extensions-examples/layout-cover.md"}
:::

#### Center

Limit the content width and center it horizontally. Adjust `--center-max-inline-size` to change the reading measure.

::: tp-markdown-viewer {lite src="extensions-examples/layout-center.md"}
:::

#### Grid

Create as many equal-width columns as fit, with a minimum target width given by `--grid-min`. Resize the preview to change the number of columns.

::: tp-markdown-viewer {lite src="extensions-examples/layout-grid.md"}
:::

#### Reel

Keep items on one horizontal row and scroll to reveal the others. The constrained width makes overflow visible even on a wide screen; `--reel-item-width` controls each item.

::: tp-markdown-viewer {lite src="extensions-examples/layout-reel.md"}
:::

#### Card

Group related content in a padded panel with a border and rounded corners. Adjust `--card-padding`, `--card-radius` and `--layout-space`.

::: tp-markdown-viewer {lite src="extensions-examples/layout-card.md"}
:::

### Line blocks

Start each displayed line with `| ` to preserve line breaks, for example in
poems and postal addresses.

```markdown
| The first line
|    An indented line with *emphasis*
|
| The last line

| The Right Honorable Samuel L.
  Constable, Jr.
| 200 Main St.
| Berkeley, CA 94718
```

The marker and its first space are removed. Additional leading spaces are
preserved. A bare `|` produces an empty line. An indented continuation without
a marker is joined to the preceding logical line with a space.

Inline Markdown, including links and emphasis, works within a line,
but emphasis cannot span two marked lines. Block constructs such as headings
and lists remain text inside the block. Separate a line block from preceding
paragraphs with a blank line. Use `\|` for a literal leading bar.

Valid pipe-table separator rows keep their existing table meaning. TP also
supports multi-body tables that continue after blank lines: when a line block
immediately follows such a table, place it in an explicit container to avoid
interpreting its lines as more table rows:

```markdown
::: div {}
| A line after a table
| Another line
:::
```

::: tp-markdown-viewer {lite src="extensions-examples/line-blocks.md"}
:::

### Tabbed content

A fenced `tabs` block creates tab labels and panels. Its content uses definition-list-like entries: a label on its own line followed by `: content`. Indent continuation lines under the content. The browser runtime handles tab switching.

Select each tab, then edit a label or add another panel.

::: tp-markdown-viewer {lite src="extensions-examples/tabs.md"}
:::

## Code, math and previews {#code-math-and-previews}

### Highlight {#code-language-hints}

The `highlight` extension colors the syntax of `<pre><code>` blocks using Highlight.js. Write the language after the opening code fence, for example `javascript`, `css` or `python`. Keywords, strings, numbers and comments receive distinct colors; the code is displayed without being executed.

Without a language hint, Highlight.js attempts automatic language detection, including for indented code blocks. Use `text` for plain text without syntax coloring. In HTML, `class="language-javascript"` selects a language and `class="nohighlight"` disables highlighting on a `<code>` element. Inline code is not syntax-highlighted.

Set the code color mode in the page's YAML frontmatter:

```yaml
---
highlight:
  theme: dark
---
```

- `auto` (default): follow the page's color theme.
- `light`: use a light code background and palette.
- `dark`: use a dark code background and the VS2015 palette.

Override the page setting on an individual code fence:

````markdown
```javascript {theme=light}
const message = "A light block on this page";
```
````

The block setting takes precedence over YAML. `{theme=auto}` returns that block to the page's theme even when YAML forces light or dark. These settings affect only `<pre><code>` blocks, including plain-text blocks, and leave inline code unchanged.

The example below sets `dark` in YAML for JavaScript, overrides CSS with `light`, and uses `auto` for plain text. Edit the YAML or a block's `theme` attribute to compare the palettes.

::: tp-markdown-viewer {lite src="extensions-examples/code-language.md"}
:::

#### Highlight.js palettes

Choose a bundled Highlight.js palette by its file name, without `.css`:

```yaml
---
highlight:
  palette: github
---
```

For example, use `github`, `github-dark`, `atom-one-dark`, `monokai` or `base16/dracula`. The selected palette loads on demand, including its original foreground and background colors. Changing the YAML and rendering again changes the palette. Each document keeps its own choice.

When `palette` is omitted or set to `vs2015`, TP uses its default adapted VS2015 palette with the `theme: auto|light|dark` settings described above. Other named palettes retain their original colors and take precedence over those color-mode settings: use a light or dark palette name to choose their appearance. An unknown name falls back to `vs2015` and reports a warning in the console.

In this example, try replacing `github` with `github-dark` or `atom-one-dark` in the YAML.

::: tp-markdown-viewer {lite src="extensions-examples/highlight-palette.md"}
:::

### Math

Write inline formulas with the roles ``:latexmath:`\frac{a}{b}` ``, ``:asciimath:`sqrt(x)` `` or ``:math:`E=mc^2` ``. Use fenced `latexmath`, `asciimath` or `math` blocks for centered display formulas.

`latexmath` selects LaTeX math syntax; `asciimath` selects AsciiMath. The generic `math` form uses LaTeX by default. Change its default syntax in YAML:

```yaml
---
math: asciimath
---
```

`math: latexmath` explicitly selects LaTeX, which is also the default when the setting is omitted. The object form `math: { syntax: asciimath }` is also supported.

For a single generic expression, override the syntax with ``:math:{syntax=latexmath}`\sqrt{x}` `` inline, or `{syntax=latexmath}` after the `math` fence name.

MathJax is loaded only when a rendered document contains a formula. Plain text, ordinary code blocks and examples displaying math notation as code do not trigger its loading. The mathematical expressions are rendered as SVG; display formulas are centered and can scroll horizontally when necessary.

#### Inline and block formulas

Compare each inline formula with the corresponding display formula. These six examples use the three supported names without YAML activation.

::: tp-markdown-viewer {lite src="extensions-examples/math.md"}
:::

#### Default syntax and local overrides

Here YAML makes generic `math` expressions use AsciiMath. The local overrides select LaTeX for one inline formula and one block.

::: tp-markdown-viewer {lite src="extensions-examples/math-syntax.md"}
:::

### Rendered examples

A fenced `example` block renders its Markdown as a framed example, rather than displaying that Markdown as code. The optional `label` names the example. This is a presentation wrapper, not a code editor.

Change the label and the Markdown content to update the framed example.

::: tp-markdown-viewer {lite src="extensions-examples/example.md"}
:::

### Markdown and HTML preview widgets

Fenced `mdviewer` and `htmlviewer` blocks create native source-and-preview widgets. Their browser renderers initialize the source display and preview controls. Use a longer outer fence if the source itself contains triple backticks.

#### Markdown preview

Edit the fenced Markdown source and compare its rendered output. Inside the result, try the output and layout selectors.

::: tp-markdown-viewer {lite src="extensions-examples/mdviewer.md"}
:::

#### HTML preview

Edit the fenced HTML source and observe the updated preview. Inside the result, compare the rendered page with its DOM view.

::: tp-markdown-viewer {lite src="extensions-examples/htmlviewer.md"}
:::

## Content and data {#content-and-data}

### Metadata and expressions

Put YAML frontmatter at the very beginning of the document, between `---` delimiters; `...` can also close the YAML block. Its values are data or settings, not displayed content. Use expressions such as `{{ title }}` to insert values in the body.

The expression engine also provides conditional and iteration constructs (`{{#if ...}}`, `{{else}}`, `{{/if}}`, `{{#each ...}}`, `{{/each}}`); custom functions and macros can be supplied through the JavaScript API.

::: tp-markdown-viewer {lite src="extensions-examples/expressions.md"}
:::

### Include

Insert the contents of another Markdown file with the `::include` directive followed immediately by a target in braces, such as `{./chapter.md}`, on a line of its own. The file is inserted before Markdown is parsed: its headings, paragraphs, lists and other syntax become part of the surrounding document.

Use a relative path such as `./chapter.md` or `../shared/notice.md`, or a path starting with `/` for a file relative to the inclusion base. Relative paths are resolved from the current source file. An included file can contain further includes; those paths are resolved from that included file.

Files are fetched only when an include directive is encountered. A missing file produces an “Include not found” message; a circular inclusion produces a “Circular include ignored” message instead of looping indefinitely.

#### Include a Markdown fragment

The example includes [a chapter fragment](extensions-examples/include/chapter.md), which itself includes [a checklist](extensions-examples/include/checklist.md). Text before and after the directive stays in the main document. Edit the surrounding text or try a nonexistent path to see the missing-file message.

::: tp-markdown-viewer {lite src="extensions-examples/include.md"}
:::

#### Include source code inside a fenced block

Place the include directive inside a fenced code block, with `mode=raw` after the file path and the language on the opening fence. The `raw` mode inserts the file’s text without adding an HTML wrapper. The file is inserted before Markdown is parsed, so its contents become code rather than ordinary Markdown. The fence’s language controls syntax highlighting; the included code is displayed, not executed.

This example loads [greeting.js](extensions-examples/include/greeting.js) inside a `javascript` fence. Keep the include directive on its own line, starting at the beginning of the line. If the included file contains backtick fences, use a longer enclosing fence or a tilde fence.

::: tp-markdown-viewer {lite src="extensions-examples/include-code.md"}
:::

#### JavaScript API

Use `renderAsync()` or `parseAsync()` to load included files. The synchronous `render()` method does not fetch them. Set the parser’s `path` to the main document’s path so that relative includes resolve correctly; `includeBaseUrl` can supply a common base URL for fetching files.

### Placeholder text

The block directive `::lorem{...}` generates placeholder content. `type` can be `sentence`, `title`, `p`, `dl`, `ol` or `ul`. `length` sets the number of generated items; `words-per-sentence` and `sentences-per-paragraph` control their size. A fixed `seed` makes repeated renders reproducible. Counts may be fixed values or ranges such as `3-5`.

::: tp-markdown-viewer {lite src="extensions-examples/lorem.md"}
:::

