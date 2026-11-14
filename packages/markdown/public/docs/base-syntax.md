# Syntax: CommonMark

**CommonMark** is the reference syntax used throughout this Base guide. This page explains its everyday authoring rules, with 38 editable examples. TP-specific additions are documented separately in [Extensions](extensions.md); the optional Pandoc dialect is covered in [Pandoc Markdown compatibility](pandoc-markdown.md).

::: tp-callout {variant=info heading="About this guide"}
This guide follows the [CommonMark 0.31.2 specification](https://spec.commonmark.org/0.31.2/) by John MacFarlane, published under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The explanations and examples are written for this TP guide; they are not a reproduction of the complete specification or its conformance test suite. Each section links to the corresponding specification rules.

The examples use [tp-markdown-viewer](https://tp-web-lab.github.io/tp-components/#/components/markdown-viewer/index.md) from the `@tp/tp-components` library in lite mode. Edit their Markdown source to experiment and immediately see the result. Each viewer is an independent document: definitions and settings in one do not affect another.

These viewers render with **TP Markdown's default configuration**, without `pandoc: true`. They demonstrate CommonMark syntax through TP's renderer and styling, not a dedicated strict CommonMark mode. TP also enables additional syntax and conveniences; the final section identifies the distinction. None of the examples requires Pandoc mode.
:::

::: tp-toc {position=end}
:::

## Reading the source

CommonMark combines **blocks** (paragraphs, headings, lists, quotations and code blocks) with **inline content** (emphasis, links, images and code spans). Blank lines, indentation and delimiters determine the structure. Font sizes, colors, list markers and spacing are chosen by the renderer and its styles.

Try changing one marker or blank line at a time. A source line break is not necessarily a visible line break, and adding indentation can change a paragraph into code. The examples deliberately keep their content small so these effects are easy to observe.

## Paragraphs and blank lines

A paragraph contains one or more lines of text. Separate paragraphs with a blank line. Several blank lines still separate blocks; they do not create empty paragraphs.

[CommonMark rules: Paragraphs and blank lines](https://spec.commonmark.org/0.31.2/#paragraphs)

### Example 1: Separate paragraphs

Remove the blank line to join the two paragraphs.

::: tp-markdown-viewer {lite src="commonmark-examples/paragraphs.md"}
:::

### Example 2: A soft line break

An ordinary newline inside a paragraph is a soft break. In normal HTML layout, it is displayed like a space.

::: tp-markdown-viewer {lite src="commonmark-examples/soft-breaks.md"}
:::

## Hard line breaks

End a line with two or more spaces, or with a backslash, to request a line break within the same paragraph. The backslash is easier to see when editing. These markers must be followed by another line in the paragraph.

[CommonMark rules: Hard line breaks](https://spec.commonmark.org/0.31.2/#hard-line-breaks)

### Example 3: Two ways to force a line break

The first line ends with two spaces; the second ends with a backslash. Both produce a line break.

::: tp-markdown-viewer {lite src="commonmark-examples/hard-breaks.md"}
:::

## ATX headings

Start a heading with one to six hash characters followed by a space. The number of hashes sets its level. Optional closing hashes must be separated from the heading text by a space. Heading numbering and generated link IDs are not specified by CommonMark.

[CommonMark rules: ATX headings](https://spec.commonmark.org/0.31.2/#atx-headings)

### Example 4: Six heading levels

Change the number of opening hashes to change the heading level.

::: tp-markdown-viewer {lite src="commonmark-examples/headings.md"}
:::

### Example 5: Opening and closing markers

The first line is a heading; the second is ordinary text because there is no space after its opening hashes.

::: tp-markdown-viewer {lite src="commonmark-examples/heading-markers.md"}
:::

## Setext headings

Underline text with equals signs for a level-one heading or hyphens for a level-two heading. The underline belongs to the preceding paragraph; insert a blank line if you intend a thematic break instead.

[CommonMark rules: Setext headings](https://spec.commonmark.org/0.31.2/#setext-headings)

### Example 6: Underlined headings

Compare the heading underlines with the separate thematic break at the end.

::: tp-markdown-viewer {lite src="commonmark-examples/setext-headings.md"}
:::

## Thematic breaks

A line containing at least three matching asterisks, hyphens or underscores forms a thematic break. Spaces between the markers are allowed. Use blank lines around the break to avoid ambiguity with headings or lists.

[CommonMark rules: Thematic breaks](https://spec.commonmark.org/0.31.2/#thematic-breaks)

### Example 7: Three marker styles

All three marker styles produce the same kind of HTML separator.

::: tp-markdown-viewer {lite src="commonmark-examples/thematic-breaks.md"}
:::

## Emphasis and strong emphasis

Use matching asterisks or underscores around text for emphasis, and double markers for strong emphasis. Markers must touch the text they enclose. Underscores inside a word do not create emphasis.

[CommonMark rules: Emphasis and strong emphasis](https://spec.commonmark.org/0.31.2/#emphasis-and-strong-emphasis)

### Example 8: Emphasis, strong emphasis and nesting

Try single, double and triple markers.

::: tp-markdown-viewer {lite src="commonmark-examples/emphasis.md"}
:::

### Example 9: Word boundaries and spaces

Compare markers around words with underscores inside an identifier.

::: tp-markdown-viewer {lite src="commonmark-examples/emphasis-boundaries.md"}
:::

## Code spans

Surround inline code with backticks. If the code contains a backtick, use a longer matching delimiter. Code spans treat Markdown punctuation literally; line endings become spaces, and one surrounding space is removed when both ends have a space and the content is not entirely spaces.

[CommonMark rules: Code spans](https://spec.commonmark.org/0.31.2/#code-spans)

### Example 10: Literal inline code

The asterisks inside the code span do not create emphasis.

::: tp-markdown-viewer {lite src="commonmark-examples/code-spans.md"}
:::

### Example 11: Backticks inside code

The outer delimiter has two backticks, so the single backticks belong to the code.

::: tp-markdown-viewer {lite src="commonmark-examples/backticks.md"}
:::

## Escapes

A backslash before ASCII punctuation makes that punctuation literal. It does not escape ordinary letters. Escapes are not processed inside code spans or code blocks.

[CommonMark rules: Escapes](https://spec.commonmark.org/0.31.2/#backslash-escapes)

### Example 12: Literal punctuation

Remove a backslash to see whether the punctuation becomes markup.

::: tp-markdown-viewer {lite src="commonmark-examples/escapes.md"}
:::

## Character references

HTML named and numeric character references can represent characters in text and attributes. They remain literal inside code. Characters produced by a reference are not reinterpreted as Markdown markers.

[CommonMark rules: Character references](https://spec.commonmark.org/0.31.2/#entity-and-numeric-character-references)

### Example 13: Named and numeric references

Compare the rendered references with their literal form inside code.

::: tp-markdown-viewer {lite src="commonmark-examples/entities.md"}
:::

## Fenced code blocks

Open a code block with at least three backticks or tildes. Close it with the same character and at least as many markers. Content is literal. An optional information string can name the language; CommonMark does not prescribe syntax highlighting or line numbering.

[CommonMark rules: Fenced code blocks](https://spec.commonmark.org/0.31.2/#fenced-code-blocks)

### Example 14: A code block with a language hint

The language hint is javascript. The Markdown markers inside the string remain code.

::: tp-markdown-viewer {lite src="commonmark-examples/fenced-code.md"}
:::

### Example 15: Showing a code fence as text

Use a longer outer fence when the example itself contains a shorter fence.

::: tp-markdown-viewer {lite src="commonmark-examples/nested-fences.md"}
:::

### Example 16: Tilde fences

Tildes are another way to delimit code without conflicting with backticks.

::: tp-markdown-viewer {lite src="commonmark-examples/tilde-code.md"}
:::

## Indented code blocks

Indent a block by at least four spaces to make it code. A code block cannot interrupt a paragraph, so leave a blank line before it. Inside lists, indentation is relative to the list item content.

[CommonMark rules: Indented code blocks](https://spec.commonmark.org/0.31.2/#indented-code-blocks)

### Example 17: Code indented by four spaces

The four leading spaces are removed from the rendered code.

::: tp-markdown-viewer {lite src="commonmark-examples/indented-code.md"}
:::

## Block quotations

Prefix a quotation with >. Quotes can contain paragraphs, lists, headings and other quotes. A line containing only > keeps a blank line inside the quotation. Prefix every line for clarity; ordinary paragraph continuation lines may omit the marker.

[CommonMark rules: Block quotations](https://spec.commonmark.org/0.31.2/#block-quotes)

### Example 18: A quotation with several blocks

The empty quoted line separates the paragraphs.

::: tp-markdown-viewer {lite src="commonmark-examples/blockquotes.md"}
:::

### Example 19: Nested quotations

A second marker creates a quote inside the first quote.

::: tp-markdown-viewer {lite src="commonmark-examples/nested-quotes.md"}
:::

### Example 20: Paragraph continuation

The unmarked second line continues the quoted paragraph; the blank line ends it.

::: tp-markdown-viewer {lite src="commonmark-examples/lazy-quotes.md"}
:::

## Bullet lists

Start list items with a hyphen, plus sign or asterisk followed by a space. Keep the same marker for one list. Changing the marker starts a separate list.

[CommonMark rules: Bullet lists](https://spec.commonmark.org/0.31.2/#lists)

### Example 21: A bullet list

Add an item by repeating the same marker.

::: tp-markdown-viewer {lite src="commonmark-examples/bullet-lists.md"}
:::

### Example 22: Different markers, separate lists

Each change of marker begins a new list, even without a blank line.

::: tp-markdown-viewer {lite src="commonmark-examples/list-markers.md"}
:::

## Ordered lists

An ordered marker contains one to nine digits followed by a period or a closing parenthesis, then a space. The first marker determines the starting number; later source numbers do not set individual item values. Use consistent delimiters. A list interrupting a paragraph must start at 1.

[CommonMark rules: Ordered lists](https://spec.commonmark.org/0.31.2/#list-items)

### Example 23: Starting number and consecutive numbering

The rendered sequence starts at 3; the source number 8 does not skip items.

::: tp-markdown-viewer {lite src="commonmark-examples/ordered-lists.md"}
:::

### Example 24: Closing-parenthesis markers

The closing parenthesis is part of the Markdown marker; the browser chooses how to display the resulting ordered list.

::: tp-markdown-viewer {lite src="commonmark-examples/parenthesized-lists.md"}
:::

## Nested lists and item contents

Indent nested blocks to the content column of their parent item. For ordinary markers such as - or 1., using four spaces is a clear way to nest a list. A list item can contain several paragraphs, quotations or code blocks.

[CommonMark rules: Nested lists and item contents](https://spec.commonmark.org/0.31.2/#list-items)

### Example 25: A list inside a list

The nested items belong to Preparation, not to the outer list.

::: tp-markdown-viewer {lite src="commonmark-examples/nested-lists.md"}
:::

### Example 26: Several blocks in one item

The second paragraph and the code fence remain inside the first item because they are indented.

::: tp-markdown-viewer {lite src="commonmark-examples/item-blocks.md"}
:::

## Tight and loose lists

Blank lines between items or between blocks inside an item can make a list loose. In HTML, loose list items retain paragraph elements; tight items omit those wrappers. TP styles determine the visible spacing.

[CommonMark rules: Tight and loose lists](https://spec.commonmark.org/0.31.2/#lists)

### Example 27: Compare list spacing

The first list is tight. The second is loose because its items are separated by blank lines.

::: tp-markdown-viewer {lite src="commonmark-examples/tight-loose.md"}
:::

## Inline links

Write the link text in square brackets and the destination in parentheses. An optional title follows the destination. Angle brackets around the destination allow spaces. Links can contain emphasis or code, but cannot contain another link.

[CommonMark rules: Inline links](https://spec.commonmark.org/0.31.2/#links)

### Example 28: Links and optional titles

The second link has a title that browsers may display on hover.

::: tp-markdown-viewer {lite src="commonmark-examples/inline-links.md"}
:::

### Example 29: A local destination and a fragment

These links open a bundled example page; the second targets a section in that page.

::: tp-markdown-viewer {lite src="commonmark-examples/local-links.md"}
:::

## Reference links

A reference definition associates a label with a destination and optional title. Definitions can appear before or after their uses and are not displayed. Labels are case-insensitive and normalize whitespace. Full, collapsed and shortcut references share this mechanism.

[CommonMark rules: Reference links](https://spec.commonmark.org/0.31.2/#link-reference-definitions)

### Example 30: Three forms of reference links

All three links use the same definition.

::: tp-markdown-viewer {lite src="commonmark-examples/reference-links.md"}
:::

## Images

Image syntax resembles link syntax with an exclamation mark before the opening bracket. The bracketed text provides the text alternative; an optional title is separate. CommonMark does not define image sizing attributes, automatic figures or captions.

[CommonMark rules: Images](https://spec.commonmark.org/0.31.2/#images)

### Example 31: An image with alternative text

The image is bundled with this documentation. Its title is not a caption.

::: tp-markdown-viewer {lite src="commonmark-examples/images.md"}
:::

### Example 32: An image within a paragraph

The image belongs to the surrounding paragraph. Its small intrinsic dimensions keep it suitable for inline use.

::: tp-markdown-viewer {lite src="commonmark-examples/inline-image.md"}
:::

### Example 33: An image using a reference

The destination and title are written separately from the image.

::: tp-markdown-viewer {lite src="commonmark-examples/reference-images.md"}
:::

## Autolinks

Put an absolute URI or an email address inside angle brackets to create an autolink. Bare URL recognition is an extension, not a CommonMark rule. TP also recognizes bare URLs by default.

[CommonMark rules: Autolinks](https://spec.commonmark.org/0.31.2/#autolinks)

### Example 34: URI and email autolinks

The displayed address is also the link destination. The email link uses mailto.

::: tp-markdown-viewer {lite src="commonmark-examples/autolinks.md"}
:::

## Inline HTML

CommonMark can pass HTML tags through to the output. Markdown between inline HTML tags is still parsed. HTML is useful when the basic syntax has no equivalent, but what a host application permits may vary.

[CommonMark rules: Inline HTML](https://spec.commonmark.org/0.31.2/#raw-html)

### Example 35: Standard HTML inside text

The subscript and superscript use HTML. Emphasis inside the span uses Markdown.

::: tp-markdown-viewer {lite src="commonmark-examples/inline-html.md"}
:::

## HTML blocks

An HTML block is passed through as HTML, without interpreting Markdown inside it. Depending on the HTML construct, the block ends at a matching terminator or at a blank line. Use ordinary HTML content inside the block. TP element directives, which can contain Markdown, are covered in Extensions.

[CommonMark rules: HTML blocks](https://spec.commonmark.org/0.31.2/#html-blocks)

### Example 36: HTML content inside an HTML block

The strong element renders as HTML. The asterisks remain literal inside this block.

::: tp-markdown-viewer {lite src="commonmark-examples/html-blocks.md"}
:::

### Example 37: An HTML comment

The comment is present in the source but is not displayed.

::: tp-markdown-viewer {lite src="commonmark-examples/html-comments.md"}
:::

## Spaces, tabs and indentation

Indentation affects block structure. Tabs advance to four-column tab stops where indentation is significant; they are not simply four spaces in every position. Prefer spaces in examples so the content column is easy to inspect. Trailing spaces can be meaningful, as the hard-break example shows.

[CommonMark rules: Spaces, tabs and indentation](https://spec.commonmark.org/0.31.2/#tabs)

### Example 38: A tab-indented code block

The code line starts with a literal tab character. Replace it with four spaces to obtain the same block here.

::: tp-markdown-viewer {lite src="commonmark-examples/tabs.md"}
:::

## CommonMark and TP extensions

CommonMark defines the source syntax and its document structure. It does not prescribe the visual theme. A TP-styled heading, quotation, table or code block therefore does not establish a different Markdown rule.

The following features are **outside the CommonMark base**, even when TP enables them by default:

| Feature | Where to learn more |
| --- | --- |
| Pipe and MultiMarkdown tables, definition lists, task lists, alphabetic and Roman list markers | [Extensions](extensions.md) |
| Attributes, bracketed spans, additional text formats and section numbering | [Extensions](extensions.md) |
| YAML metadata, expressions, notes, citations and glossaries | [Extensions](extensions.md) |
| Mathematical notation and TP components | [Extensions](extensions.md) |
| TP element directives such as `::: tp-box` and `:tp-icon:{}` | [Extensions](extensions.md) |
| Pandoc fenced divs, implicit figures and other optional Pandoc adaptations | [Pandoc compatibility](pandoc-markdown.md) |

TP additionally recognizes bare URLs and applies typographic substitutions by default. For portable CommonMark, use angle-bracket autolinks and do not rely on these conveniences. Automatic heading IDs, syntax highlighting, copy buttons and other interface features belong to the application, not to the CommonMark specification.

Enabling `pandoc: true` changes parsing rules for the **whole document**. It is not needed for this Base guide. Do not assume that syntax with different TP and Pandoc meanings can be mixed unchanged; use separate documents or independent viewers to compare modes.

For all edge cases and the complete set of reference examples, read the [CommonMark 0.31.2 specification](https://spec.commonmark.org/0.31.2/). Its [source and test tools](https://github.com/commonmark/commonmark-spec/tree/0.31.2) are available in the CommonMark repository. See [Compliance](base-compliance.md) for the measured TP results. Continue with [Extensions](extensions.md) for the additional features of TP Markdown.
