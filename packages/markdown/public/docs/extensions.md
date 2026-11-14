# Extensions

Extensions add syntax and rendering features to the [CommonMark base](base.md).

**Built-in** extensions are available automatically. Use their notation directly in the document. Some features, such as section numbering, also have settings in the YAML frontmatter.

**Optional** modules are loaded when requested in the YAML `extensions:` list. Pandoc compatibility is listed with the optional features, but uses the separate `pandoc: true` setting.

Follow an extension name to read its description, syntax and available examples.

## Built-in

| Extension name | Description |
| --- | --- |
| [Additional text formats](extensions-built-in.md#additional-text-formats) | Mark insertions, deletions, highlights, subscripts and superscripts. |
| [Alphabetic and Roman lists](extensions-built-in.md#alphabetic-and-roman-lists) | Write lettered or Roman lists, task items and single-choice lists. |
| [Attributes](extensions-built-in.md#attributes) | Attach IDs, CSS classes and attributes to document elements. |
| [Automatic links and typography](extensions-built-in.md#automatic-links-and-typography) | Recognize bare URLs and apply typographic substitutions. |
| [Bibliography references](extensions-built-in.md#bibliography-references) | Cite defined entries and generate a bibliography. |
| [Bracketed spans](extensions-built-in.md#bracketed-spans) | Apply attributes to an inline range of Markdown text. |
| [Citation groups](extensions-built-in.md#citation-groups) | Combine several bibliography references in one citation. |
| [Data tables](extensions-built-in.md#data-tables) | Generate tables from CSV, JSON or newline-delimited JSON data. |
| [Definition lists](extensions-built-in.md#definition-lists) | Associate terms with one or more definitions. |
| [Glossary](extensions-built-in.md#glossary) | Define terms and link to their explanations. |
| [Heading anchors](extensions-built-in.md#heading-anchors) | Generate heading IDs and link to named sections. |
| [Highlight](extensions-built-in.md#code-language-hints) | Color the syntax of code blocks according to their language. |
| [HTML and custom elements](extensions-built-in.md#html-and-custom-elements) | Create HTML and custom elements containing Markdown. |
| [Include](extensions-built-in.md#include) | Insert Markdown files into a document, including nested files. |
| [Index and lists of elements](extensions-built-in.md#index-and-lists-of-elements) | Collect marked terms and lists of matching document elements. |
| [Layout classes](extensions-built-in.md#layout-classes) | Arrange content using reusable CSS layout classes. |
| [Line blocks](extensions-built-in.md#line-blocks) | Preserve authored line breaks and indentation. |
| [List tables](extensions-built-in.md#list-tables) | Describe table rows and cells with nested lists. |
| [Markdown and HTML preview widgets](extensions-built-in.md#markdown-and-html-preview-widgets) | Display source alongside selectable previews. |
| [Math](extensions-built-in.md#math) | Render inline and block formulas in LaTeX or AsciiMath, loading MathJax on demand. |
| [Metadata and expressions](extensions-built-in.md#metadata-and-expressions) | Define document data in YAML and insert values with expressions. |
| [MultiMarkdown tables](extensions-built-in.md#multimarkdown-tables) | Add merged cells, multiline rows, multiple bodies and captions. |
| [Notes](extensions-built-in.md#notes) | Create numbered note references and a notes list. |
| [Page navigation](extensions-built-in.md#page-navigation) | Generate links to adjacent pages and the top of a document. |
| [Pipe tables](extensions-built-in.md#pipe-tables) | Create tables with headings and column alignment. |
| [Placeholder text](extensions-built-in.md#placeholder-text) | Generate reproducible sample paragraphs and lists. |
| [Raw HTML fences](extensions-built-in.md#raw-html-fences) | Insert an HTML fragment while preserving its contents. |
| [Rendered examples](extensions-built-in.md#rendered-examples) | Present rendered Markdown inside a labeled example. |
| [Section numbering](extensions-built-in.md#section-numbering) | Configure hierarchical numbering and excluded headings. |
| [Tabbed content](extensions-built-in.md#tabbed-content) | Organize several content panels under tab labels. |
| [Table of contents](extensions-built-in.md#table-of-contents) | Generate a linked outline of the document headings. |

## Optional

| Extension name | Description |
| --- | --- |
| [binary](extensions-optional.md#binary) | Present interactive binary logic puzzles. |
| [crossword](extensions-optional.md#crossword) | Present crossword grids and clues. |
| [cryptarithm](extensions-optional.md#cryptarithm) | Present arithmetic puzzles with letters standing for digits. |
| [diagram](extensions-optional.md#diagram) | Render diagrams from Mermaid notation. |
| [game-life](extensions-optional.md#game-life) | Run cellular-automaton examples. |
| [handwriting](extensions-optional.md#handwriting) | Display text with a handwriting effect. |
| [l-system](extensions-optional.md#l-system) | Draw patterns generated by rewriting rules. |
| [map](extensions-optional.md#map) | Display interactive geographic maps. |
| [music](extensions-optional.md#music) | Render musical scores from ABC notation. |
| [Pandoc compatibility mode](extensions-optional.md#pandoc-compatibility-mode) | Apply the supported Pandoc Markdown syntax rules. |
| [slide](extensions-optional.md#slide) | Present Markdown as a slide show. |
| [speech-to-text](extensions-optional.md#speech-to-text) | Provide speech-recognition input. |
| [sudoku](extensions-optional.md#sudoku) | Present Sudoku puzzles. |
| [text-to-speech](extensions-optional.md#text-to-speech) | Read supplied text aloud. |
| [turtle](extensions-optional.md#turtle) | Draw graphics from turtle commands. |
| [typewriting](extensions-optional.md#typewriting) | Animate text with a typewriter effect. |
| [xy-plot](extensions-optional.md#xy-plot) | Draw mathematical curves in an XY coordinate system. |
| [yakazu](extensions-optional.md#yakazu) | Present Yakazu number puzzles. |
