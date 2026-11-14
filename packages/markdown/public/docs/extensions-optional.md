# Optional extensions

Optional modules are requested in the document's YAML frontmatter. Use their identifiers in the `extensions:` list, for example:

```yaml
---
extensions:
  - diagram
  - music
---
```

Each module recognizes its own source notation. Some also use a browser renderer to create a drawing, animation or interactive interface.

Pandoc compatibility is an optional **document mode**: enable it with `pandoc: true`, rather than adding `pandoc` to the module list. Its rules apply to the entire document.

[Extension overview](extensions.md)

::: tp-toc {position=end}
:::

## binary

Recognizes fenced `binary` blocks describing a binary puzzle. The browser renderer displays the grid and its game controls.

Activation: `extensions: [binary]` in the YAML frontmatter.

## crossword

Recognizes fenced `crossword` blocks describing a grid and its clues. The browser renderer provides the crossword interface.

Activation: `extensions: [crossword]` in the YAML frontmatter.

## cryptarithm

Recognizes fenced `cryptarithm` blocks describing a letter-based arithmetic puzzle. The browser renderer provides the puzzle interface.

Activation: `extensions: [cryptarithm]` in the YAML frontmatter.

## diagram

Interprets Mermaid diagram source and renders it through the browser diagram renderer.

Activation: `extensions: [diagram]` in the YAML frontmatter.

## game-life

Recognizes fenced `game-life` blocks and prepares their configuration for the browser simulation renderer.

Activation: `extensions: [game-life]` in the YAML frontmatter.

## handwriting

Recognizes inline handwriting roles and fenced `handwriting` blocks. The browser renderer handles the handwriting presentation.

Activation: `extensions: [handwriting]` in the YAML frontmatter.

## l-system

Recognizes fenced `l-system` blocks describing an L-system or a preset. The browser renderer generates the drawing and its controls.

Activation: `extensions: [l-system]` in the YAML frontmatter.

## map

Recognizes `::map{...}` directives. Their attributes configure the map placeholder, which the browser renderer turns into an interactive map.

Activation: `extensions: [map]` in the YAML frontmatter.

## music

Recognizes fenced `music` blocks containing ABC notation. The `play` option enables playback controls; `tablature` requests tablature and `instrument` selects its instrument.

Activation: `extensions: [music]` in the YAML frontmatter.

## Pandoc compatibility mode

Enable the supported Pandoc Markdown syntax for one document:

```yaml
---
pandoc: true
---
```

Or configure the JavaScript parser with `new TpMarkdownParser({ pandoc: true })`.
A document's boolean `pandoc` frontmatter overrides this default. The mode is
available with both synchronous and asynchronous parsing and rendering.

This mode enables the following targeted adaptations without loading Pandoc or WebAssembly. Without this option, TP syntax is unchanged; this is not the complete Pandoc dialect.

- **Containers:** Pandoc fenced divs alongside explicitly attributed HTML and TP elements (see below).
- **Lists and quotations:** parenthesized ordered markers, starting numbers, aligned alphabetic/Roman sublists, capital-initial disambiguation, and blank-line boundaries for block quotations.
- **Code:** a fenced language class such as `.haskell` selects the language. `.numberLines` uses a readonly `tp-code-editor`; `startFrom` sets its first line number. These numbered blocks require `@tp/tp-components` (automatically loaded in TP viewers).
- **Tables:** `: Caption` or `Table: Caption` immediately above or below a pipe table, optionally separated by blank lines, becomes its caption.
- **Images:** a standalone image becomes a figure with a caption. A trailing backslash keeps it inline; `alt` can differ from the caption. Reference-image definitions accept attributes. `latex-placement` is preserved as `data-latex-placement` for inspection, without controlling web layout.
- **HTML blocks:** Markdown text in HTML containers and table cells is rendered; raw content in `script`, `style`, `pre`, `code`, `textarea`, SVG and MathML is preserved.
- **Notes:** indented multi-block footnotes preserve paragraphs and code. A note list is appended automatically unless an explicit notes block is already present; references link to that list.

Interactive task lists retain TP behavior. Citation groups remain supported, but this mode does not supply citeproc author–date formatting or author suppression. PDF pagination, LaTeX float positioning and other output-format-specific behavior are outside its scope.

| Opening fence in Pandoc mode | Meaning |
| --- | --- |
| `::: Warning` | `<div class="Warning">` |
| `::: {.warning #notice}` | `<div class="warning" id="notice">` |
| `::: tp-callout {variant="warning"}` | `<tp-callout variant="warning">` |
| `::: tp-box {}` | `<tp-box>` with no attributes |
| `::: section {}` | `<section>` with no attributes |

A bare word is always a class in this mode, including `div` or `tp-box`.
**Use an explicit attribute block, even an empty `{}`, for an HTML or custom element.**
Whitespace after the opening colons does not change this rule. Inline element
syntax, such as `:tp-icon:{name=logo-tp}`, remains available.

Divs and elements can be nested. Every closing fence contains at least three
colons and closes the innermost container; its length need not match the opening
fence. Opening fences can also have decorative trailing colons. Separate the
containers from surrounding paragraphs with blank lines.

```markdown
::: Warning ::::::
This is a Pandoc div.

::: tp-box {}
This is a TP component inside the div.

::: {.details}
This is another div inside the component.
:::
::::
::::::::
```

Container-looking text inside fenced or indented code is preserved literally.


### Try Pandoc containers

::: tp-markdown-viewer {lite src="pandoc-containers.md"}
:::

## slide

Recognizes fenced `slide` and `reveal` blocks. Inside the block, `---` separates horizontal slides and `--` separates vertical slides. The browser renderer uses Reveal.js.

Activation: `extensions: [slide]` in the YAML frontmatter.

## speech-to-text

Recognizes inline speech-to-text roles and fenced `speech-to-text` blocks. The browser renderer supplies recognition controls; availability depends on browser support and microphone permission.

Activation: `extensions: [speech-to-text]` in the YAML frontmatter.

## sudoku

Recognizes fenced `sudoku` blocks describing a Sudoku grid. The browser renderer supplies the puzzle interface.

Activation: `extensions: [sudoku]` in the YAML frontmatter.

## text-to-speech

Recognizes inline text-to-speech roles and fenced `text-to-speech` blocks. The browser renderer connects the text to speech-synthesis controls and the available voices.

Activation: `extensions: [text-to-speech]` in the YAML frontmatter.

## turtle

Recognizes fenced `turtle` blocks containing a drawing program. Turtle instructions describe the successive movements used to construct the drawing.

Activation: `extensions: [turtle]` in the YAML frontmatter.

## typewriting

Recognizes inline typewriting roles and fenced `typewriting` blocks. The browser renderer animates the supplied text or sequence of phrases.

Activation: `extensions: [typewriting]` in the YAML frontmatter.

## xy-plot

Recognizes fenced `xy-plot` blocks describing mathematical curves, axes and optional characteristic points, and renders SVG graphs.

Activation: `extensions: [xy-plot]` in the YAML frontmatter.

## yakazu

Recognizes fenced `yakazu` blocks describing a puzzle grid. The browser renderer supplies the puzzle interface.

Activation: `extensions: [yakazu]` in the YAML frontmatter.

