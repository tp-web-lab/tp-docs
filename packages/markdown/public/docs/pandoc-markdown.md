# Pandoc’s Markdown: compatibility with tp-markdown

::: tp-callout {variant=info heading="About this compatibility page"}
This page tests Markdown input examples from the **Pandoc’s Markdown** section of John MacFarlane’s [Pandoc User’s Guide](https://pandoc.org/MANUAL.html#pandocs-markdown), distributed under GPL-2.0-or-later. The preserved manual is dated 2026-10-25; its checksum and the original example sources are retained in this repository. See the bundled [copyright notice](pandoc-markdown-examples/COPYRIGHT) and [license](pandoc-markdown-examples/COPYING.md).

Each example uses [tp-markdown-viewer](https://tp-web-lab.github.io/tp-components/#/components/markdown-viewer/index.md) from `@tp/tp-components` in lite mode. Edit the source to experiment with the actual TP result. **These statuses describe the displayed examples, not full conformance to every Pandoc extension.** Parsing without an exception does not imply compatibility.
:::

## Reading the results

- :tp-badge:Compatible{variant=success}: the feature demonstrated by this example is preserved; styling, generated identifiers and incidental HTML may differ.
- :tp-badge:Partial{variant=warning}: part of the example works, but structure, semantics or behavior differs. The explanation identifies the difference.
- :tp-badge:Not supported{variant=neutral}: the demonstrated Pandoc feature is not interpreted, even if ordinary text or other markup still appears.

Baseline: TP’s default Markdown configuration, without enabling optional extensions such as math. Reviewed on 2026-11-13; reference conversions use Pandoc 3.9. Some non-default Pandoc features require enabling their named extension when comparing with Pandoc. The descriptions and source links explain these settings.

The optional [Pandoc compatibility mode](extensions-optional.md#pandoc-compatibility-mode) adds targeted adaptations for containers, lists, quotations, code, tables, images, HTML blocks and notes. Each affected example includes a **With pandoc: true** explanation and a ready-to-copy source. The gallery below keeps the default configuration, so its baseline statuses are unchanged.

Of the **24 Partial examples** in the default configuration, **19 become Compatible with `pandoc: true`**. The remaining **5 stay Partial**: interactive task lists (48), LaTeX float placement (125), and citation formatting (133–135). Example 125 preserves the placement attribute, but does not reproduce LaTeX float positioning in a web page. These counts concern the supplied examples, not full support for the corresponding Pandoc extensions.

**Choose one syntax mode per document.** The `pandoc` option applies to the entire Markdown page, not to individual blocks. Standard TP syntax and Pandoc syntax cannot always be mixed unchanged: for example, `::: tp-box` creates a TP element in standard mode but a div with class `tp-box` in Pandoc mode; write `::: tp-box {}` to create the element in Pandoc mode. To compare both modes, use separate documents or independent viewers, each with its own configuration. The gallery's viewers are independent; enabling the option in one does not enable it in the others.

There are **148 editable examples**: **74 compatible**, **24 partial**, and **50 not supported**. Badges are a recorded assessment of the supplied source; editing an example does not automatically recalculate its status.

Unavailable image files and placeholder links use bundled fixtures. Missing local headings or reference uses are supplied where necessary, and the three alternative headings with the same ID are tested separately. Every adaptation is stated beside its example. Unsupported syntax is preserved in the viewers instead of being rewritten into TP syntax. Each Partial or Not supported example is followed by a **Currently in TP Markdown** alternative. These alternatives explain the required rewrite or configuration, and distinguish equivalent results from approximations and features without a web equivalent. Code samples can be copied into the viewer above; they do not change the baseline badge.

The 19 omitted code blocks are command lines, templates, syntax fragments, expected output or output-format-specific configuration rather than standalone Markdown input. This is an input-compatibility gallery, not a reproduction of the complete manual or a test of Pandoc’s PDF, DOCX and bibliography-processing pipelines.

::: tp-toc {position=end}
:::

## Unsupported examples by category

The 50 examples marked **Not supported** belong to 20 categories. This classification concerns the original Pandoc syntax, not whether the same content can be produced in TP Markdown. Prefer native Markdown when it suffices; use element directives or components where richer behavior is needed. The links lead to the detailed examples and their alternatives.

| Category | Count | Examples | TP Markdown alternative and limits |
| --- | ---: | --- | --- |
| Implicit heading references | 3 | [11](#example-11), [12](#example-12), [13](#example-13) | Use explicit fragment links such as `[the section](#section-id)` and assign a stable `{#section-id}` to the heading. |
| List markers and starting numbers | 3 | [42](#example-42), [44](#example-44), [47](#example-47) | Use decimal markers (`1.`), including repeated `1.` for automatic numbering. Add `{type=A start=3}` after a list for alphabetic markers and a chosen start. Parenthesized marker styling may require CSS. |
| Numbered examples and cross-references | 4 | [52](#example-52), [53](#example-53), [54](#example-54), [55](#example-55) | Use ordinary numbered lists with explicit starts, or write example numbers with paragraph IDs and links. There is no shared automatic example counter or `(@label)` resolver. |
| Simple tables | 2 | [60](#example-60), [61](#example-61) | Rewrite using the built-in MultiMarkdown pipe-table syntax. Start with the separator row for a headerless table and put captions in square brackets. |
| Multiline tables | 2 | [62](#example-62), [63](#example-63) | Use MultiMarkdown pipe tables. A trailing backslash joins source lines into one row and permits block content in cells. Captions and headerless tables are supported; ordinary text also wraps to the available width. |
| Grid tables | 6 | [64](#example-64), [65](#example-65), [66](#example-66), [67](#example-67), [68](#example-68), [69](#example-69) | Use MultiMarkdown tables: adjacent pipes for column spans, ^^ for row spans, trailing backslashes for lists or code in cells, multiple header rows, and blank lines for separate tbody sections. Only a semantic tfoot still requires explicit HTML-element directives. |
| Pipe-table separator variant | 1 | [72](#example-72) | Use the usual pipe-table separator row with vertical bars instead of plus signs. |
| Pandoc title blocks | 10 | [73](#example-73), [74](#example-74), [75](#example-75), [76](#example-76), [77](#example-77), [78](#example-78), [79](#example-79), [80](#example-80), [81](#example-81), [82](#example-82) | Use YAML front matter and display its values with `{{ title }}`, `{{ author }}` and `{{ date }}`. Fold multiline values with `>-`. Man-page header/footer conventions have no automatic web equivalent. |
| Raw TeX | 2 | [104](#example-104), [105](#example-105) | For citations, use Markdown bibliography references or `tp-ref` with `tp-biblio`. For the tabular example, use a pipe table or `tp-latex` (basic l/c/r columns, vertical rules and hline). This does not provide general raw-TeX conversion. |
| Raw output-format attributes | 3 | [106](#example-106), [107](#example-107), [108](#example-108) | Use native HTML-element directives for HTML output. There is no ms/roff or OpenXML/DOCX writer. Rewrite the desired web content; CSS `break-before: page` is only a print-page-break approximation. |
| Mathematics and LaTeX macros | 2 | [109](#example-109), [140](#example-140) | Enable `extensions: [math]` in YAML front matter and use a math fence, or use `tp-math` with a `script` of type `tp/latex`. Keep a macro declaration inside the formula that uses it. |
| Anonymous inline notes | 1 | [132](#example-132) | Give the note a name and use `[^detail]` with a `[^detail]:` definition; add `::notes{}` for a visible list and link targets. For rich previews, use `tp-ref` with `tp-note`. Do not mix their independent numbering systems. |
| Author suppression and narrative citations | 2 | [136](#example-136), [137](#example-137) | Write the author name explicitly and use `[@key]` with its bibliography definition and `::bibliography{}`, or `tp-ref`/`tp-biblio`. There is no automatic author–date formatting or author suppression. Simple citation groups are already supported. |
| Spaced reference links | 1 | [139](#example-139) | Remove the space between the label and reference: `[foo][bar]`, with a normal `[bar]: URL` definition. |
| MultiMarkdown title blocks | 1 | [141](#example-141) | Use YAML front matter, then `{{ title }}`, `{{ author }}`, `{{ date }}` and `{{ comment }}` in the body. Use `>-` for a folded multiline comment. |
| Abbreviation definitions | 1 | [142](#example-142) | Use `:abbr:HTML{title="Hypertext Markup Language"}` or `tp-ref` with `tp-glossary`. Occurrences must be marked explicitly. Pandoc itself only discards the declaration; it does not automatically expand abbreviations. |
| Alerts | 1 | [143](#example-143) | Place a `tp-callout` inside a Markdown blockquote, prefixing each directive and content line with `>`. Select its variant and heading explicitly. |
| MultiMarkdown image-reference attributes | 1 | [144](#example-144) | Use an inline image URL with attributes immediately after it: `![image](image.svg){width=20 height=30}`. |
| Unclosed superscripts and subscripts | 2 | [145](#example-145), [146](#example-146) | Use paired markers: `x^2^` and `O~2~`. |
| Wiki links | 2 | [147](#example-147), [148](#example-148) | Use ordinary Markdown links such as `[title](destination)`. Supply the real destination; TP does not resolve wiki page names automatically. |

## Setext-style headings

### Example 1

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-001.md"}
:::

## ATX-style headings

### Example 2

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-002.md"}
:::

### Example 3

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-003.md"}
:::

## Extension: blank_before_header

### Example 4

::: tp-badge {variant=success}
Compatible
:::

The hash characters remain literal; neither a heading nor deletion markup is created.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-004.md"}
:::

## Extension: header_attributes

### Example 5

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: The three alternative heading forms are isolated so that the repeated foo ID does not cause a duplicate-ID error.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-005.md"}
:::

### Example 6

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: The three alternative heading forms are isolated so that the repeated foo ID does not cause a duplicate-ID error.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-006.md"}
:::

### Example 7

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: The three alternative heading forms are isolated so that the repeated foo ID does not cause a duplicate-ID error.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-007.md"}
:::

### Example 8

::: tp-badge {variant=success}
Compatible
:::

This heading remains in the table of contents but is excluded when sectionNumbering.enabled is true. The marker works in standard TP Markdown without Pandoc mode.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-008.md"}
:::

### Example 9

::: tp-badge {variant=success}
Compatible
:::

This heading remains in the table of contents but is excluded when sectionNumbering.enabled is true. The marker works in standard TP Markdown without Pandoc mode.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-009.md"}
:::

## Extension: implicit_header_references

### Example 10

::: tp-badge {variant=success}
Compatible
:::

An automatic heading ID is generated; this tests the heading alone, not implicit reference resolution.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-010.md"}
:::

### Example 11

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s implicit heading-reference lookup is not implemented, even with the heading supplied in this example.

Adaptation: The heading referenced by this isolated example is included.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-011.md"}
:::

**Currently in TP Markdown**

Write an explicit fragment link. Giving the heading an explicit ID keeps the link stable if its wording changes.

````markdown
# Heading identifiers in HTML {#heading-identifiers}

[Heading identifiers in HTML](#heading-identifiers)
````

### Example 12

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s implicit heading-reference lookup is not implemented, even with the heading supplied in this example.

Adaptation: The heading referenced by this isolated example is included.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-012.md"}
:::

**Currently in TP Markdown**

Write an explicit fragment link. Giving the heading an explicit ID keeps the link stable if its wording changes.

````markdown
# Heading identifiers in HTML {#heading-identifiers}

[Heading identifiers in HTML](#heading-identifiers)
````

### Example 13

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s implicit heading-reference lookup is not implemented, even with the heading supplied in this example.

Adaptation: The heading referenced by this isolated example is included.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-013.md"}
:::

**Currently in TP Markdown**

Write an explicit fragment link. Giving the heading an explicit ID keeps the link stable if its wording changes.

````markdown
# Heading identifiers in HTML {#heading-identifiers}

[the section on heading identifiers](#heading-identifiers)
````

### Example 14

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: The heading referenced by this isolated example is included.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-014.md"}
:::

### Example 15

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-015.md"}
:::

## Block quotations

### Example 16

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-016.md"}
:::

### Example 17

::: tp-badge {variant=warning}
Partial
:::

The lazy continuation produces different blockquote/list boundaries.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-017.md"}
:::

**With pandoc: true**

Lazy continuation stays inside each quotation, including its list. This option applies only to this document.

````markdown
---
pandoc: true
---
> This is a block quote. This
paragraph has two lines.

> 1. This is a list inside a block quote.
2. Second item.
````

**Currently in TP Markdown**

Prefix every quoted line with > instead of relying on lazy continuation. Separate the two quotations with an HTML comment so they remain distinct blockquotes. The ordered list stays entirely inside the second quotation.

````markdown
> This is a block quote. This
> paragraph has two lines.

<!-- -->

> 1. This is a list inside a block quote.
> 2. Second item.
````

### Example 18

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-018.md"}
:::

### Example 19

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-019.md"}
:::

## Extension: blank_before_blockquote

### Example 20

::: tp-badge {variant=warning}
Partial
:::

TP creates a nested blockquote where Pandoc’s blank-before-blockquote rule prevents it.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-020.md"}
:::

**With pandoc: true**

A nested block quotation requires a blank line. This option applies only to this document.

````markdown
---
pandoc: true
---
> This is a block quote.
>> Not nested, since `blank_before_blockquote` is enabled by default
````

**Currently in TP Markdown**

Escape the second > so that it is text inside the existing quotation, rather than the start of a nested quotation.

````markdown
> This is a block quote.
> \> Not nested, since `blank_before_blockquote` is enabled by default
````

## Indented code blocks

### Example 21

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-021.md"}
:::

## Extension: fenced_code_blocks

### Example 22

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-022.md"}
:::

### Example 23

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-023.md"}
:::

## Extension: fenced_code_attributes

### Example 24

::: tp-badge {variant=warning}
Partial
:::

Code and attributes survive, but attributes attach differently and Pandoc line numbering is not implemented.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-024.md"}
:::

**With pandoc: true**

A readonly code editor shows Haskell with line numbers starting at 100. This option applies only to this document.

````markdown
---
pandoc: true
---
~~~~ {#mycode .haskell .numberLines startFrom="100"}
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
               qsort (filter (>= x) xs)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
````

**Currently in TP Markdown**

Use tp-code-editor in read-only mode with line-numbers. Haskell syntax highlighting loads on demand. Set line-number-start=100 to display 100, 101 and 102, matching Pandoc’s startFrom; id=mycode preserves the target ID. This provides a web editor presentation rather than a static pre/code block.

````markdown
:::: tp-code-editor {readonly line-numbers line-number-start=100 id=mycode}
::: script {type="tp/haskell"}
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
               qsort (filter (>= x) xs)
:::
::::
````

### Example 25

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-025.md"}
:::

### Example 26

::: tp-badge {variant=warning}
Partial
:::

The class is preserved, but this form does not declare a language-* class for the TP highlighter.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-026.md"}
:::

**With pandoc: true**

The Haskell class selects the code language. This option applies only to this document.

````markdown
---
pandoc: true
---
``` {.haskell}
qsort [] = []
```
````

**Currently in TP Markdown**

Declare the language directly after the opening fence. This produces the language-haskell class used by the highlighter.

````markdown
```haskell
qsort [] = []
```
````

### Example 27

::: tp-badge {variant=warning}
Partial
:::

The code language is recognized, but the numberLines class does not enable Pandoc-style line numbering.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-027.md"}
:::

**With pandoc: true**

A readonly Haskell editor displays line numbers. This option applies only to this document.

````markdown
---
pandoc: true
---
```haskell {.numberLines}
qsort [] = []
```
````

**Currently in TP Markdown**

Use tp-code-editor in read-only mode with line-numbers. Haskell syntax highlighting loads on demand. The gutter starts at 1 by default. This provides a web editor presentation rather than a static pre/code block.

````markdown
:::: tp-code-editor {readonly line-numbers}
::: script {type="tp/haskell"}
qsort [] = []
:::
::::
````

### Example 28

::: tp-badge {variant=warning}
Partial
:::

Classes survive, but the language declaration and line-numbering behavior differ.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-028.md"}
:::

**With pandoc: true**

The language class and numbered-code class configure the editor. This option applies only to this document.

````markdown
---
pandoc: true
---
``` {.haskell .numberLines}
qsort [] = []
```
````

**Currently in TP Markdown**

Use tp-code-editor in read-only mode with line-numbers. Haskell syntax highlighting loads on demand. The gutter starts at 1 by default. This provides a web editor presentation rather than a static pre/code block.

````markdown
:::: tp-code-editor {readonly line-numbers}
::: script {type="tp/haskell"}
qsort [] = []
:::
::::
````

## Extension: line_blocks

### Example 29

::: tp-badge {variant=success}
Compatible
:::

Standard TP Markdown preserves the marked line breaks and leading spaces. Inline Markdown remains available; no Pandoc mode is needed.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-029.md"}
:::

### Example 30

::: tp-badge {variant=success}
Compatible
:::

The indented continuation is joined to the preceding logical line; the marked address lines retain their line breaks. No Pandoc mode is needed.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-030.md"}
:::

## Bullet lists

### Example 31

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-031.md"}
:::

### Example 32

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-032.md"}
:::

### Example 33

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-033.md"}
:::

### Example 34

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-034.md"}
:::

## Block content in list items

### Example 35

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-035.md"}
:::

### Example 36

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-036.md"}
:::

### Example 37

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-037.md"}
:::

### Example 38

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-038.md"}
:::

## Ordered lists

### Example 39

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-039.md"}
:::

### Example 40

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-040.md"}
:::

## Extension: fancy_lists

### Example 41

::: tp-badge {variant=warning}
Partial
:::

TP recognizes an alphabetic list where Pandoc deliberately keeps ordinary text: the two-space rule after a capital-letter marker differs.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-041.md"}
:::

**With pandoc: true**

A capital initial followed by only one space remains prose. This option applies only to this document.

````markdown
---
pandoc: true
---
B. Russell won a Nobel Prize (but not for "On Denoting").
````

**Currently in TP Markdown**

Escape the period so TP does not recognize an alphabetic list marker.

````markdown
B\. Russell won a Nobel Prize (but not for "On Denoting").
````

### Example 42

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc recognizes the parenthesized letter as a list marker; TP instead turns (C) into a copyright symbol.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-042.md"}
:::

**Currently in TP Markdown**

Use an ordinary Markdown ordered list, followed by an attribute block on a separate paragraph. type=A selects uppercase letters and start=3 starts at C. No element directives are needed. The second item below illustrates progression to D. The browser normally displays C. and D.; matching Pandoc’s parenthesized markers would additionally require CSS.

````markdown
1. 2007 Joe Smith
2. 2008 Helen Doe

{type=A start=3}
````

### Example 43

::: tp-badge {variant=success}
Compatible
:::

This counterexample remains ordinary text rather than becoming a list item.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-043.md"}
:::

### Example 44

::: tp-badge {variant=neutral}
Not supported
:::

The #. ordered-list marker is not recognized and conflicts with TP formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-044.md"}
:::

**Currently in TP Markdown**

Replace #. with ordinary decimal list markers. Repeating 1. still lets the browser number the items automatically.

````markdown
1. one
1. two
1. three
````

## Extension: startnum

### Example 45

::: tp-badge {variant=warning}
Partial
:::

TP supports alphabetic and Roman-numeral lists, but this example’s Roman sublist remains part of the parent paragraph because it has no separating blank line and uses varying indentation.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-045.md"}
:::

**With pandoc: true**

The outer list starts at 9 and its nested list uses Roman numerals. This option applies only to this document.

````markdown
---
pandoc: true
---
 9)  Ninth
10)  Tenth
11)  Eleventh
       i. subone
      ii. subtwo
     iii. subthree
````

**Currently in TP Markdown**

Keep native Markdown lists, including the 9), 10) and 11) markers. Insert a blank line before the Roman sublist and align its markers with a consistent four-space indentation under the decimal list item. TP recognizes a./b., A./B., i./ii. and I./II. lists; no element directives are needed here. The closing parenthesis is accepted as source syntax; the browser normally displays decimal markers with a period.

````markdown
9) Ninth
10) Tenth
11) Eleventh

    i. subone
    ii. subtwo
    iii. subthree
````

### Example 46

::: tp-badge {variant=warning}
Partial
:::

Decimal and bullet lists work; parenthesized numeric markers remain ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-046.md"}
:::

**With pandoc: true**

Parenthesized markers form one ordered list; changing delimiters starts a separate list. This option applies only to this document.

````markdown
---
pandoc: true
---
(2) Two
(5) Three
1.  Four
*   Five
````

**Currently in TP Markdown**

Use ordinary decimal markers and an empty HTML comment to separate the two ordered lists. The first list starts at 2 and displays 2, 3: the later source marker 5 does not reset its counter. The comment ends that list so Four starts a new list at 1; Five belongs to a separate bullet list. This reproduces Pandoc’s HTML list structure without element directives.

````markdown
2. Two
5. Three
<!-- -->
1. Four
* Five
````

### Example 47

::: tp-badge {variant=neutral}
Not supported
:::

The #. ordered-list marker is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-047.md"}
:::

**Currently in TP Markdown**

Replace #. with ordinary decimal list markers. Repeating 1. still lets the browser number the items automatically.

````markdown
1. one
1. two
1. three
````

## Extension: task_lists

### Example 48

::: tp-badge {variant=warning}
Partial
:::

Task states are represented by TP interactive checkboxes rather than Pandoc’s list markers.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-048.md"}
:::

**Currently in TP Markdown**

Keep the source unchanged if interactive TP checkboxes are desired. For a read-only display, use explicit disabled input elements. Their appearance follows the browser rather than Pandoc’s static task markers.

````markdown
- :input:{type=checkbox disabled} an unchecked task list item
- :input:{type=checkbox checked disabled} checked item
````

## Extension: definition_lists

### Example 49

::: tp-badge {variant=success}
Compatible
:::

The definition list is supported. In TP Markdown, the blank line between a term and its definition is optional. Without it, the definition is compact; with it, its first paragraph is wrapped in a p element, which may add spacing. The original Pandoc source below keeps the blank line.

The compact TP syntax is:

```markdown
Term
: Definition
```

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-049.md"}
:::

### Example 50

::: tp-badge {variant=success}
Compatible
:::

The definition list is supported. In TP Markdown, the blank line between a term and its definition is optional. Without it, the definition is compact; with it, its first paragraph is wrapped in a p element, which may add spacing. The original Pandoc source below keeps the blank line.

The compact TP syntax is:

```markdown
Term
: Definition
```

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-050.md"}
:::

### Example 51

::: tp-badge {variant=success}
Compatible
:::

The definition list is supported. In TP Markdown, the ~ marker does not need indentation: it can start at the beginning of the line. Multiple definitions for the same term work the same way. The original Pandoc source below keeps its indentation.

The unindented TP syntax is:

```markdown
Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b
```

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-051.md"}
:::

## Extension: example_lists

### Example 52

::: tp-badge {variant=neutral}
Not supported
:::

The (@) example-list sequence is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-052.md"}
:::

**Currently in TP Markdown**

Use ordinary numbered lists and explicitly start the later list at 3. TP does not maintain Pandoc’s global example counter across intervening paragraphs.

````markdown
1. My first example will be numbered (1).
2. My second example will be numbered (2).

Explanation of examples.

3. My third example will be numbered (3).
````

### Example 53

::: tp-badge {variant=neutral}
Not supported
:::

Labeled example lists and their references are not resolved.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-053.md"}
:::

**Currently in TP Markdown**

Assign an ID directly to the paragraph, then use an ordinary fragment link. Put {#good} on the next line without a blank line before it, so the ID belongs to the example paragraph. A blank line before the attribute block would instead create a separate empty paragraph with that ID. Maintain the visible example number yourself; Pandoc’s (@good) lookup is not available.

````markdown
(1) This is a good example.
{#good}

As [(1)](#good) illustrates, ...
````

### Example 54

::: tp-badge {variant=neutral}
Not supported
:::

Repeated example-list labels are not resolved.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-054.md"}
:::

**Currently in TP Markdown**

Write the repeated number explicitly and give the original occurrence a unique ID. Do not reuse an HTML ID for the repeated example; link back to the first occurrence instead.

````markdown
(1) Sample sentence.
{#foo}

Intervening text...

This theory can explain the case we saw earlier (repeated):

[(1)](#foo) Sample sentence.
````

### Example 55

::: tp-badge {variant=neutral}
Not supported
:::

Explicit example-list numbering is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-055.md"}
:::

**Currently in TP Markdown**

Use an ordinary ordered list with an explicit starting number. Add a separate stable ID and an explicit link if the item must be referenced; automatic (@foo) references are unavailable.

````markdown
1. This item will be numbered 1.
2. The next item will be numbered 2.
3. The next item will be numbered 3.
````

## Ending a list

### Example 56

::: tp-badge {variant=warning}
Partial
:::

The list is recognized, but its following brace-delimited content becomes attributes instead of literal list-item content.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-056.md"}
:::

**With pandoc: true**

The brace-delimited paragraph remains literal text inside the list. This option applies only to this document.

````markdown
---
pandoc: true
---
-   item one
-   item two

    { my code block }
````

**Currently in TP Markdown**

Escape braces when they should be literal text in the list item, as in this example. If code formatting is intended instead, use a fenced code block indented under the item; braces alone are interpreted as attributes by TP.

````markdown
- item one
- item two

  \{ my code block \}
````

### Example 57

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-057.md"}
:::

### Example 58

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-058.md"}
:::

## Horizontal rules

### Example 59

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-059.md"}
:::

## Extension: simple_tables

### Example 60

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc simple tables are not parsed as tables.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-060.md"}
:::

**Currently in TP Markdown**

Use a pipe table and put its caption in square brackets below it. TP Markdown renders a native table caption; no figure or custom element is needed.

````markdown
| Right | Left | Center | Default |
| ---: | :--- | :---: | --- |
| 12 | 12 | 12 | 12 |
| 123 | 123 | 123 | 123 |
| 1 | 1 | 1 | 1 |

[Demonstration of simple table syntax.]
````

### Example 61

::: tp-badge {variant=neutral}
Not supported
:::

Headerless simple tables are not parsed as tables.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-061.md"}
:::

**Currently in TP Markdown**

Start a pipe table with its separator row to omit the header entirely. Alignment markers retain the alignment of each column.

````markdown
| ---: | :--- | :---: | ---: |
| 12 | 12 | 12 | 12 |
| 123 | 123 | 123 | 123 |
| 1 | 1 | 1 | 1 |
````

## Extension: multiline_tables

### Example 62

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc fixed-width multiline tables are not supported. The final line of hyphens is interpreted as a Setext level-two heading underline, turning the preceding paragraph (the second row) into a heading instead of a table row.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-062.md"}
:::

**Currently in TP Markdown**

Use a pipe table, join wrapped cell text onto one source line, and put the caption in square brackets below the table. The browser wraps cell text as needed; no element directives are required.

````markdown
| Centered Header | Default Aligned | Right Aligned | Left Aligned |
| :---: | --- | ---: | :--- |
| First | row | 12.0 | Example of a row that spans multiple lines. |
| Second | row | 5.0 | Here's another one. Note the blank line between rows. |

[Here's the caption. It, too, may span multiple lines.]
````

### Example 63

::: tp-badge {variant=neutral}
Not supported
:::

Headerless multiline tables are not parsed as tables.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-063.md"}
:::

**Currently in TP Markdown**

Use a headerless pipe table and a caption in square brackets. Join the wrapped source lines inside each cell: the browser wraps their text according to the available width.

````markdown
| :---: | :--- | ---: | :--- |
| First | row | 12.0 | Example of a row that spans multiple lines. |
| Second | row | 5.0 | Here's another one. Note the blank line between rows. |

[Here's a multiline table without a header.]
````

## Extension: grid_tables

### Example 64

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-064.md"}
:::

**Currently in TP Markdown**

Use the MultiMarkdown table syntax built into TP. A backslash at the end of a source row joins it to the next line, allowing Markdown lists inside cells. Put the caption in square brackets; no HTML or custom elements are needed.

````markdown
| Fruit | Price | Advantages |
| --- | --- | --- |
| Bananas | $1.34 | - built-in wrapper | \
| | | - bright color |
| Oranges | $2.10 | - cures scurvy | \
| | | - tasty |

[Sample grid table.]
````

### Example 65

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-065.md"}
:::

**Currently in TP Markdown**

Use MultiMarkdown cell spans: adjacent pipes extend Property over two columns, and ^^ merges each following Temperature cell with the one above. This preserves the original structure without element directives.

````markdown
| Property || Earth |
| --- | --- | --- |
| Temperature 1961–1990 | min | -89.2 °C |
| ^^ | mean | 14 °C |
| ^^ | max | 56.7 °C |
````

### Example 66

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-066.md"}
:::

**Currently in TP Markdown**

Use two MultiMarkdown header rows. Adjacent pipes extend the temperature heading over three columns; ^^ extends Location over both header rows. Alignment is set in the separator row.

````markdown
| Location | Temperature 1961–1990 in degree Celsius |||
| ^^ | min | mean | max |
| --- | ---: | ---: | ---: |
| Antarctica | -89.2 | N/A | 19.8 |
| Earth | -89.2 | 14 | 56.7 |
````

### Example 67

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-067.md"}
:::

**Currently in TP Markdown**

Replace the grid borders with a pipe table and express alignment in its separator row.

````markdown
| Right | Left | Centered |
| ---: | :--- | :---: |
| Bananas | $1.34 | built-in wrapper |
````

### Example 68

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-068.md"}
:::

**Currently in TP Markdown**

Start a pipe table with an alignment separator row. It remains headerless, with right-, left- and center-aligned cells.

````markdown
| ---: | :--- | :---: |
| Right | Left | Centered |
````

### Example 69

::: tp-badge {variant=neutral}
Not supported
:::

Grid tables are not recognized; their borders are interpreted as text or inline formatting.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-069.md"}
:::

**Currently in TP Markdown**

A MultiMarkdown table can separate the totals into another tbody with a blank line, preserving the visible grouping. If a semantic tfoot is required, use explicit table/thead/tbody/tfoot directives; multibody sections are not footer elements.

````markdown
| Fruit | Price |
| --- | ---: |
| Bananas | $1.34 |
| Oranges | $2.10 |

| Sum | $3.44 |
````

## Extension: pipe_tables

### Example 70

::: tp-badge {variant=warning}
Partial
:::

The table and alignment work; the colon-prefixed caption remains a separate paragraph.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-070.md"}
:::

**With pandoc: true**

The colon-prefixed text becomes a table caption. This option applies only to this document.

````markdown
---
pandoc: true
---
| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |

  : Demonstration of pipe table syntax.
````

**Currently in TP Markdown**

Use a pipe table and put its caption in square brackets below it. TP Markdown renders a native table caption; no figure or custom element is needed.

````markdown
| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |

[Demonstration of pipe table syntax.]
````

### Example 71

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-071.md"}
:::

### Example 72

::: tp-badge {variant=neutral}
Not supported
:::

The + separator variant of pipe tables is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-072.md"}
:::

**Currently in TP Markdown**

Replace the + inside the separator row with |.

````markdown
| One | Two |
| --- | --- |
| my | table |
| is | nice |
````

## Extension: pandoc_title_block

### Example 73

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-073.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter delimited by --- at both ends. Read its values in the Markdown body with {{ title }}, {{ author }} and {{ date }}; metadata is not displayed automatically. In JavaScript, TpMarkdownParser.parse(source).env.attributes contains the parsed metadata.

````markdown
---
title: "title"
author: "author(s) (separated by semicolons)"
date: "date"
---

# {{ title }}

{{ author }}

{{ date }}
````

### Example 74

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-074.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ author }}`. Omit the title field when there is no title.

````markdown
---
author: "Author"
---

{{ author }}
````

### Example 75

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-075.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}` and `{{ date }}`. Omit the author field when there is no author.

````markdown
---
title: "My title"
date: "June 15, 2006"
---

# {{ title }}

{{ date }}
````

### Example 76

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-076.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. The YAML folded scalar >- joins the source lines with spaces without keeping a trailing newline.

````markdown
---
title: >-
  My title
  on multiple lines
---

# {{ title }}
````

### Example 77

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-077.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. The YAML folded scalar >- joins the source lines with spaces without keeping a trailing newline. In this isolated Pandoc source, the first % line occupies the title slot, so this alternative preserves it as title metadata. If the names are intended as authors, use the YAML author field instead and display it with `{{ author }}`.

````markdown
---
title: >-
  Author One
  Author Two
---

# {{ title }}
````

### Example 78

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-078.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. In this isolated Pandoc source, the first % line occupies the title slot, so this alternative preserves it as title metadata. If the names are intended as authors, use the YAML author field instead and display it with `{{ author }}`.

````markdown
---
title: "Author One; Author Two"
---

# {{ title }}
````

### Example 79

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-079.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. The YAML folded scalar >- joins the source lines with spaces without keeping a trailing newline. In this isolated Pandoc source, the first % line occupies the title slot, so this alternative preserves it as title metadata. If the names are intended as authors, use the YAML author field instead and display it with `{{ author }}`.

````markdown
---
title: >-
  Author One;
  Author Two
---

# {{ title }}
````

### Example 80

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-080.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. This displays the title as a web heading. Pandoc’s man-page section, header and footer conventions are not interpreted by the browser renderer.

````markdown
---
title: "PANDOC(1)"
---

# {{ title }}
````

### Example 81

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-081.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. This displays the title as a web heading. Pandoc’s man-page section, header and footer conventions are not interpreted by the browser renderer.

````markdown
---
title: "PANDOC(1) Pandoc User Manuals"
---

# {{ title }}
````

### Example 82

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc’s %-prefixed title/author/date metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-082.md"}
:::

**Currently in TP Markdown**

Replace the %-prefixed block with YAML front matter. Metadata is not displayed automatically: insert its values in the body with `{{ title }}`. This displays the title as a web heading. Pandoc’s man-page section, header and footer conventions are not interpreted by the browser renderer.

````markdown
---
title: "PANDOC(1) Pandoc User Manuals | Version 4.0"
---

# {{ title }}
````

## Extension: yaml_metadata_block

### Example 83

::: tp-badge {variant=success}
Compatible
:::

The leading YAML block is parsed as metadata and accepts ... as its closing delimiter. Metadata does not automatically create visible content: use expressions such as `{{ title }}` in the Markdown body, or read `parser.parse(source).env.attributes` in JavaScript.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-083.md"}
:::

### Example 84

::: tp-badge {variant=success}
Compatible
:::

The leading YAML block is parsed as metadata and accepts ... as its closing delimiter. Metadata does not automatically create visible content: use expressions such as `{{ title }}` in the Markdown body, or read `parser.parse(source).env.attributes` in JavaScript.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-084.md"}
:::

## Extension: all_symbols_escapable

### Example 85

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-085.md"}
:::

## Emphasis

### Example 86

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-086.md"}
:::

### Example 87

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-087.md"}
:::

### Example 88

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-088.md"}
:::

## Extension: intraword_underscores

### Example 89

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-089.md"}
:::

## Extension: strikeout

### Example 90

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-090.md"}
:::

## Extension: superscript, subscript

### Example 91

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-091.md"}
:::

## Verbatim

### Example 92

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-092.md"}
:::

### Example 93

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-093.md"}
:::

### Example 94

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-094.md"}
:::

## Extension: inline_code_attributes

### Example 95

::: tp-badge {variant=success}
Compatible
:::

The code element retains its class; this does not guarantee Pandoc’s syntax-highlighting behavior.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-095.md"}
:::

## Underline

### Example 96

::: tp-badge {variant=success}
Compatible
:::

Bracketed span syntax creates an inline span with its own attributes and parses Markdown inside it. This works by default, without Pandoc mode. Shared TP styles provide the formatting for this class.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-096.md"}
:::

### Example 97

::: tp-badge {variant=success}
Compatible
:::

The span is preserved and TP supplies underline styling; Pandoc emits a u element for the same visible meaning.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-097.md"}
:::

## Small caps

### Example 98

::: tp-badge {variant=success}
Compatible
:::

Bracketed span syntax creates an inline span with its own attributes and parses Markdown inside it. This works by default, without Pandoc mode. Shared TP styles provide the formatting for this class.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-098.md"}
:::

### Example 99

::: tp-badge {variant=success}
Compatible
:::

The HTML span is preserved and the shared TP smallcaps class displays its text in small capitals. The font determines their appearance.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-099.md"}
:::

### Example 100

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-100.md"}
:::

## Highlighting

### Example 101

::: tp-badge {variant=success}
Compatible
:::

Bracketed span syntax creates an inline span with its own attributes and parses Markdown inside it. This works by default, without Pandoc mode. Shared TP styles provide the formatting for this class.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-101.md"}
:::

### Example 102

::: tp-badge {variant=success}
Compatible
:::

The HTML span is preserved and the shared TP mark class highlights its text with the same style as the mark element.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-102.md"}
:::

## Extension: markdown_in_html_blocks

### Example 103

::: tp-badge {variant=warning}
Partial
:::

The HTML table is preserved, but Markdown inside its cells stays literal.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-103.md"}
:::

**With pandoc: true**

Markdown in the HTML table cells renders as emphasis and a link. This option applies only to this document.

````markdown
---
pandoc: true
---
<table>
<tr>
<td>*one*</td>
<td>[a link](https://google.com)</td>
</tr>
</table>
````

**Currently in TP Markdown**

Both alternatives parse Markdown emphasis and links inside the cells. Prefer the headerless pipe table for this simple case. The web-component syntax also supports standard HTML elements: use table, tr and td directives with an extra colon at each nesting level.

**Pipe table**

````markdown
| --- | --- |
| *one* | [a link](https://google.com) |
````

**Web-component syntax with HTML elements**

````markdown
::: table
:::: tr
::::: td
*one*
:::::
::::: td
[a link](https://google.com)
:::::
::::
:::
````

## Extension: raw_tex

### Example 104

::: tp-badge {variant=neutral}
Not supported
:::

Raw TeX commands are not handled as Pandoc raw-format content.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-104.md"}
:::

**Currently in TP Markdown**

Use Markdown references with a visible bibliography, or tp-ref and tp-biblio for a hover preview without displaying a bibliography. Neither alternative implements raw LaTeX passthrough or citeproc formatting. Replace the placeholder with the actual bibliographic details.

**Markdown references with a visible bibliography**

````markdown
This result was proved in [@jones.1967].

[@jones.1967]: Replace with the actual bibliographic details for Jones (1967).

::bibliography{}
````

**tp-ref and tp-biblio with a hover preview only**

````markdown
This result was proved in :tp-ref:{href="@jones.1967"}.

::: tp-biblio {ref="jones.1967"}
Replace with the actual bibliographic details for Jones (1967).
:::
````

### Example 105

::: tp-badge {variant=neutral}
Not supported
:::

The LaTeX table is neither converted nor treated as Pandoc raw TeX.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-105.md"}
:::

**Currently in TP Markdown**

Use a Markdown pipe table for this simple structure, or keep the original tabular source inside tp-latex. A script with type="tp/latex" preserves the LaTeX backslashes and lets tp-latex render the table; no document wrapper is needed.

**Markdown pipe table**

````markdown
| Age | Frequency |
| --- | --- |
| 18–25 | 15 |
| 26–35 | 33 |
| 36–45 | 22 |
````

**LaTeX tabular with tp-latex**

````markdown
::: tp-latex
:::: script {type="tp/latex"}
\begin{tabular}{|l|l|}\hline
Age & Frequency \\ \hline
18--25  & 15 \\
26--35  & 33 \\
36--45  & 22 \\ \hline
\end{tabular}
::::
:::
````

## Extension: raw_attribute

### Example 106

::: tp-badge {variant=neutral}
Not supported
:::

The raw ms attribute is ignored; the source is displayed as code.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-106.md"}
:::

**Currently in TP Markdown**

There is no ms/roff writer or .MYMACRO processor in TP Markdown. To show its source, keep an ordinary code fence. To obtain formatted web content, rewrite the macro’s intended output as Markdown or TP elements; an exact conversion cannot be specified without the macro definition.

### Example 107

::: tp-badge {variant=neutral}
Not supported
:::

The raw HTML attribute is ignored; the HTML remains escaped code.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-107.md"}
:::

**Currently in TP Markdown**

Use the native inline element notation. For this example the a element has no href, so it is not a navigable link.

````markdown
This is :a:html{}
````

### Example 108

::: tp-badge {variant=neutral}
Not supported
:::

OpenXML raw content is displayed as code, not processed for a target writer.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-108.md"}
:::

**Currently in TP Markdown**

There is no OpenXML/DOCX output writer in TP Markdown. A DOCX page-break instruction has no equivalent in a continuously scrolling web page. For a print-only page break, use an empty div with break-before: page; this does not create a DOCX file.

````markdown
::: div {style="break-before: page"}
:::
````

## Extension: latex_macros

### Example 109

::: tp-badge {variant=neutral}
Not supported
:::

The LaTeX macro declaration is not processed, and math is not enabled in this unchanged source.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-109.md"}
:::

**Currently in TP Markdown**

Enable the math extension and put the TeX macro declaration inside the math block it is used in. TP does not collect arbitrary raw TeX declarations outside math; keeping declaration and use together avoids relying on cross-formula macro state. Alternatively, use tp-math directly with displaystyle and a script of type="tp/latex"; no Markdown math extension declaration is needed in that case.

**Markdown math extension**

````markdown
---
extensions: [math]
---
```math
\newcommand{\tuple}[1]{\langle #1 \rangle}
\tuple{a, b, c}
```
````

**tp-math with a LaTeX script**

````markdown
::: tp-math {displaystyle}
:::: script {type="tp/latex"}
\newcommand{\tuple}[1]{\langle #1 \rangle}
\tuple{a, b, c}
::::
:::
````

## Automatic links

### Example 110

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-110.md"}
:::

## Inline links

### Example 111

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-111.md"}
:::

### Example 112

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-112.md"}
:::

## Reference links

### Example 113

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-113.md"}
:::

### Example 114

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: A use of the reference is appended so the definition has a visible result.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-114.md"}
:::

### Example 115

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: A use of the reference is appended so the definition has a visible result.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-115.md"}
:::

### Example 116

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-116.md"}
:::

### Example 117

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-117.md"}
:::

## Extension: shortcut_reference_links

### Example 118

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Placeholder link destinations point to a bundled sample HTML page.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-118.md"}
:::

## Internal links

### Example 119

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: A local Introduction heading supplies the link destination.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-119.md"}
:::

### Example 120

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: A local Introduction heading supplies the link destination.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-120.md"}
:::

## Images

### Example 121

::: tp-badge {variant=warning}
Partial
:::

Both image forms display, but standalone images do not become captioned figures as they do in Pandoc.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-121.md"}
:::

**With pandoc: true**

Standalone images become figures with captions. This option applies only to this document.

````markdown
---
pandoc: true
---
![la lune](docs/pandoc-markdown-examples/images/sample.svg "Voyage to the moon")

![movie reel]

[movie reel]: docs/pandoc-markdown-examples/images/sample.svg
````

**Currently in TP Markdown**

Wrap each image in an explicit figure and add a figcaption. Repeat this pattern for the second image, using movie reel as its caption. Standalone Markdown images are not automatically promoted to figures.

````markdown
:::: figure {}
![la lune](docs/pandoc-markdown-examples/images/sample.svg)

::: figcaption {}
la lune
:::
::::
````

## Extension: implicit_figures

### Example 122

::: tp-badge {variant=warning}
Partial
:::

The image displays, but TP does not turn it into a figure with a caption.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-122.md"}
:::

**With pandoc: true**

The standalone image gets a caption. This option applies only to this document.

````markdown
---
pandoc: true
---
![This is the caption.](docs/pandoc-markdown-examples/images/sample.svg)
````

**Currently in TP Markdown**

Use an explicit figure and figcaption rather than relying on an implicit figure.

````markdown
:::: figure {}
![This is the caption.](docs/pandoc-markdown-examples/images/sample.svg)

::: figcaption {}
This is the caption.
:::
::::
````

### Example 123

::: tp-badge {variant=warning}
Partial
:::

The image remains inline, but the final backslash is preserved instead of Pandoc’s empty inline separator.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-123.md"}
:::

**With pandoc: true**

The trailing backslash keeps the image outside a figure. This option applies only to this document.

````markdown
---
pandoc: true
---
![This image won't be a figure](docs/pandoc-markdown-examples/images/sample.svg)\
````

**Currently in TP Markdown**

Remove the trailing backslash. TP already keeps a standalone Markdown image as an image without an automatic caption.

````markdown
![This image won't be a figure](docs/pandoc-markdown-examples/images/sample.svg)
````

### Example 124

::: tp-badge {variant=warning}
Partial
:::

No figure/caption is created and the explicit alt override is not applied.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-124.md"}
:::

**With pandoc: true**

The explicit image description is distinct from the visible caption. This option applies only to this document.

````markdown
---
pandoc: true
---
![The caption.](docs/pandoc-markdown-examples/images/sample.svg){alt="description of image"}
````

**Currently in TP Markdown**

Put the accessible description in the image’s square brackets, then write the visible caption separately in figcaption.

````markdown
:::: figure {}
![description of image](docs/pandoc-markdown-examples/images/sample.svg)

::: figcaption {}
The caption.
:::
::::
````

### Example 125

::: tp-badge {variant=warning}
Partial
:::

The image attribute is retained, but there is no figure caption or LaTeX placement behavior.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-125.md"}
:::

**With pandoc: true**

The figure retains latex-placement as data-latex-placement; float placement has no web equivalent. This option applies only to this document.

````markdown
---
pandoc: true
---
![The caption.](docs/pandoc-markdown-examples/images/sample.svg){latex-placement="ht"}
````

**Currently in TP Markdown**

Use an explicit figure and figcaption for the web result. Omit latex-placement: it controls LaTeX float placement, which has no browser equivalent.

````markdown
:::: figure {}
![The caption.](docs/pandoc-markdown-examples/images/sample.svg)

::: figcaption {}
The caption.
:::
::::
````

## Extension: link_attributes

### Example 126

::: tp-badge {variant=warning}
Partial
:::

Inline image attributes work; attributes on the reference definition prevent that reference from resolving.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-126.md"}
:::

**With pandoc: true**

The reference image receives its definition’s attributes and remains inline. This option applies only to this document.

````markdown
---
pandoc: true
---
An inline ![image](docs/pandoc-markdown-examples/images/sample.svg){#id .class width=30 height=20px}
and a reference ![image][ref] with attributes.

[ref]: docs/pandoc-markdown-examples/images/sample.svg "optional title" {#id .class key=val key2="val 2"}
````

**Currently in TP Markdown**

Use inline image URLs and attach each attribute block directly to its image. This avoids TP’s limitations with attributes on reference images. Give each image a distinct ID.

````markdown
An inline ![image](docs/pandoc-markdown-examples/images/sample.svg){id=inline-image .class width=30 height=20}
and another ![image](docs/pandoc-markdown-examples/images/sample.svg "optional title"){id=reference-image .class key=val key2="val 2"}.
````

### Example 127

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

Adaptation: Unavailable image filenames are replaced with a bundled TP sample SVG; the Markdown structure is unchanged.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-127.md"}
:::

## Extension: fenced_divs

### Example 128

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-128.md"}
:::

### Example 129

::: tp-badge {variant=warning}
Partial
:::

Some content renders, but the bare names and closing fences are interpreted differently from Pandoc nested divs.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-129.md"}
:::

**With pandoc: true**

Nested fenced divs use Pandoc class semantics. This option applies only to this document.

````markdown
---
pandoc: true
---
::: Warning ::::::
This is a warning.

::: Danger
This is a warning within a warning.
:::
::::::::::::::::::
````

**Currently in TP Markdown**

Enable pandoc: true in the front matter: this example’s bare class names and nested fences are now supported. In standard TP mode, use explicit div containers with .Warning and .Danger classes and distinct matching fence lengths instead. These classes need CSS to have a special appearance.

````markdown
---
pandoc: true
---
::: Warning ::::::
This is a warning.

::: Danger
This is a warning within a warning.
:::
::::::::::::::::::
````

## Extension: bracketed_spans

### Example 130

::: tp-badge {variant=success}
Compatible
:::

Bracketed span syntax creates an inline span with its own attributes and parses Markdown inside it. This works by default, without Pandoc mode.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-130.md"}
:::

## Extension: footnotes

### Example 131

::: tp-badge {variant=warning}
Partial
:::

Simple notes are recognized; the multi-block continuation leaves part of the note outside it.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-131.md"}
:::

**With pandoc: true**

The notes preserve multiple paragraphs and indented code, and appear in an automatically generated note list. This option applies only to this document.

````markdown
---
pandoc: true
---
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

        { some.code }

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won't be part of the note, because it
isn't indented.
````

**Currently in TP Markdown**

Use tp-note and tp-ref for both notes so they share one numbering sequence. The long note retains its paragraphs and code block as structured content. Do not mix native Markdown notes and tp-ref notes in this example: their independent counters would both start at 1.

````markdown
Here is a footnote reference :tp-ref:{href="^shortnote"} and another :tp-ref:{href="^longnote"}.

::: tp-note {ref="shortnote"}
Here is the footnote.
:::

::: tp-note {ref="longnote"}
Here's one with multiple blocks.

Subsequent paragraphs belong to the same note.

```
{ some.code }
```

The whole paragraph is inside the note container.
:::

This paragraph is outside the note.
````

## Extension: inline_notes

### Example 132

::: tp-badge {variant=neutral}
Not supported
:::

Inline footnotes using ^[...] remain literal.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-132.md"}
:::

**Currently in TP Markdown**

Give the note an identifier and use a Markdown footnote reference and definition. TP does not support anonymous ^[...] notes.

````markdown
Here is an inline note[^detail].

[^detail]: Inline notes are easier to write, since you don't have to pick an identifier and move down to type the note.
````

## Extension: citations

### Example 133

::: tp-badge {variant=warning}
Partial
:::

Simple citation groups are supported: each key has its own bibliography link and preview within shared brackets. TP displays citation keys rather than applying Pandoc citeproc author–date formatting. This isolated source supplies no bibliography definitions.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-133.md"}
:::

**Currently in TP Markdown**

Keep the citation group and define each key with [@key]:. Add `::bibliography{}` to display the entries and provide link targets. Each citation has its own hover preview. TP preserves the authored order and displays the keys; automatic author–date formatting, sorting and CSL styles are not implemented. Replace the placeholder entries with the real bibliography.

````markdown
Blah blah [@doe99; @smith2000; @smith2004].

[@doe99]: Replace with the actual bibliographic details for doe99.

[@smith2000]: Replace with the actual bibliographic details for smith2000.

[@smith2004]: Replace with the actual bibliographic details for smith2004.

::bibliography{}
````

### Example 134

::: tp-badge {variant=warning}
Partial
:::

TP resolves each citation key in the group and preserves prefixes, page/chapter indications and inline emphasis. Labels remain the citation keys, without Pandoc citeproc author–date formatting. This isolated source supplies no bibliography definitions.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-134.md"}
:::

**Currently in TP Markdown**

Keep the original group, including see, page/chapter indications and Markdown emphasis. Define each bibliography key and add `::bibliography{}` for visible entries and link targets. Each key has its own preview. Prefixes and locators are displayed as authored text; they are not interpreted or reformatted by citeproc. Replace the placeholders with the actual bibliography.

````markdown
Blah blah [see @doe99, pp. 33-35 and *passim*; @smith04, chap. 1].

[@doe99]: Replace with the actual bibliographic details for doe99.

[@smith04]: Replace with the actual bibliographic details for smith04.

::bibliography{}
````

### Example 135

::: tp-badge {variant=warning}
Partial
:::

TP creates reference links, but does not interpret Pandoc citation locators, suffixes or citeproc semantics.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-135.md"}
:::

**Currently in TP Markdown**

Use one Markdown bibliography reference [@key] per key and define each entry with [@key]:. Write prefixes, page/chapter locators and suffixes as ordinary text outside the references. This preserves navigable references, but not citeproc’s automatic author–date formatting, author suppression or CSL styles. Replace the placeholder entries with the real bibliography. Add `::bibliography{}` to display the entries and create the citation link targets; definitions alone do not insert a visible bibliography.

````markdown
[@smith], ii, A, D–Z, with a suffix

[@smith], pp. iv, vi–xi, (xv)–(xvii), with suffix here

[@smith], 99 years later

[@smith]: Replace with the actual bibliographic details for smith.

::bibliography{}
````

### Example 136

::: tp-badge {variant=neutral}
Not supported
:::

Suppress-author citation syntax is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-136.md"}
:::

**Currently in TP Markdown**

Use one Markdown bibliography reference [@key] per key and define each entry with [@key]:. Write prefixes, page/chapter locators and suffixes as ordinary text outside the references. This preserves navigable references, but not citeproc’s automatic author–date formatting, author suppression or CSL styles. Replace the placeholder entries with the real bibliography. Add `::bibliography{}` to display the entries and create the citation link targets; definitions alone do not insert a visible bibliography.

````markdown
Smith says blah [@smith04].

[@smith04]: Replace with the actual bibliographic details for smith04.

::bibliography{}
````

### Example 137

::: tp-badge {variant=neutral}
Not supported
:::

Narrative citations and locators are not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-137.md"}
:::

**Currently in TP Markdown**

Use one Markdown bibliography reference [@key] per key and define each entry with [@key]:. Write prefixes, page/chapter locators and suffixes as ordinary text outside the references. This preserves navigable references, but not citeproc’s automatic author–date formatting, author suppression or CSL styles. Replace the placeholder entries with the real bibliography. Add `::bibliography{}` to display the entries and create the citation link targets; definitions alone do not insert a visible bibliography.

````markdown
Smith [@smith04] says blah.

Smith [@smith04], p. 33, says blah.

[@smith04]: Replace with the actual bibliographic details for smith04.

::bibliography{}
````

## Extension: mark

### Example 138

::: tp-badge {variant=success}
Compatible
:::

The demonstrated Markdown structure is preserved. TP styling and generated classes may differ from Pandoc.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-138.md"}
:::

## Extension: spaced_reference_links

### Example 139

::: tp-badge {variant=neutral}
Not supported
:::

The separated reference syntax is not resolved as one link.

Adaptation: The bar reference is supplied to test the spaced-reference syntax rather than a missing definition.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-139.md"}
:::

**Currently in TP Markdown**

Remove the space between the link label and reference identifier.

````markdown
[foo][bar].

[bar]: https://www.pandoc.org/
````

## Extension: tex_math_gfm

### Example 140

::: tp-badge {variant=neutral}
Not supported
:::

The math fence displays code with the default configuration; TP’s math extension is not enabled.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-140.md"}
:::

**Currently in TP Markdown**

Enable the optional math extension in front matter. The existing math fence can then stay unchanged.

````markdown
---
extensions: [math]
---
``` math
e=mc^2
```
````

## Extension: mmd_title_block

### Example 141

::: tp-badge {variant=neutral}
Not supported
:::

MultiMarkdown title metadata remains ordinary text.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-141.md"}
:::

**Currently in TP Markdown**

Move the fields into YAML front matter and use a folded YAML string for the multiline comment. Display the metadata with `{{ title }}`, `{{ author }}`, `{{ date }}` and `{{ comment }}` rather than repeating their values in the body.

````markdown
---
title: My title
author: John Doe
date: "September 1, 2008"
comment: >-
  This is a sample mmd title block, with
  a field spanning multiple lines.
---

# {{ title }}

{{ author }} — {{ date }}

{{ comment }}
````

## Extension: abbreviations

### Example 142

::: tp-badge {variant=neutral}
Not supported
:::

TP does not recognize abbreviation definitions and leaves this declaration visible. Pandoc’s abbreviations extension only discards the declaration: its document model does not support abbreviations, so HTML occurrences are not automatically expanded or wrapped in abbr elements.

Adaptation: Text using the abbreviation is supplied.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-142.md"}
:::

**Currently in TP Markdown**

To actually associate an expansion with HTML, use an abbr element for a native browser tooltip, or tp-ref with a hidden tp-glossary entry for a rich hover preview. Each occurrence must be marked explicitly. These alternatives add abbreviation behavior that Pandoc itself does not provide.

**HTML abbreviation**

````markdown
:abbr:HTML{title="Hypertext Markup Language"} is a markup language.
````

**tp-glossary with a hover preview**

````markdown
:tp-ref:{href="%HTML"} is a markup language.

::: tp-glossary {ref="HTML"}
Hypertext Markup Language
:::
````

## Extension: alerts

### Example 143

::: tp-badge {variant=neutral}
Not supported
:::

The blockquote renders, but its [!TIP] marker is not interpreted as an alert.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-143.md"}
:::

**Currently in TP Markdown**

Keep the blockquote and replace the alert marker with a tp-callout inside it. Prefix every line with > so the callout stays inside the quotation. Its styling follows TP rather than GitHub/Pandoc.

````markdown
> ::: tp-callout {variant="info" heading="Tip"}
> Helpful advice for doing things better or more easily.
> :::
````

## Extension: mmd_link_attributes

### Example 144

::: tp-badge {variant=neutral}
Not supported
:::

MultiMarkdown image-reference attributes are not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-144.md"}
:::

**Currently in TP Markdown**

Replace the reference image with an inline image URL and put its attributes in braces immediately afterwards. This avoids unsupported MultiMarkdown reference attributes. The rewrite uses the bundled fixture instead of the placeholder URL.

````markdown
This is an ![image](docs/pandoc-markdown-examples/images/sample.svg "Image title"){#myId .myClass1 .myClass2 width=20 height=30}.
````

## Extension: short_subsuperscripts

### Example 145

::: tp-badge {variant=neutral}
Not supported
:::

Unclosed superscript syntax is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-145.md"}
:::

**Currently in TP Markdown**

Close the superscript with a second ^, as required by TP’s paired-marker syntax.

````markdown
x^2^ = 4
````

### Example 146

::: tp-badge {variant=neutral}
Not supported
:::

Unclosed subscript syntax is not recognized.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-146.md"}
:::

**Currently in TP Markdown**

Close the subscript with a second ~.

````markdown
Oxygen is O~2~.
````

## Extension: wikilinks_title_after_pipe

### Example 147

::: tp-badge {variant=neutral}
Not supported
:::

Pandoc wiki-link syntax is not resolved.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-147.md"}
:::

**Currently in TP Markdown**

Use an ordinary Markdown link with an explicit destination. There is no wiki-page resolver; replace the sample URL with the real destination.

````markdown
[title](https://example.org/)
````

### Example 148

::: tp-badge {variant=neutral}
Not supported
:::

The alternative wiki-link ordering is not resolved.

::: tp-markdown-viewer {lite src="pandoc-markdown-examples/example-148.md"}
:::

**Currently in TP Markdown**

Use an ordinary Markdown link with an explicit destination. There is no wiki-page resolver; replace the sample URL with the real destination.

````markdown
[title](https://example.org/)
````

For the complete syntax and output rules, see [Pandoc’s Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown). For TP-specific authoring, see [Extensions](extensions.md).
