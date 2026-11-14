# Compliance: CommonMark

This page reports the complete **CommonMark 0.31.2** conformance corpus against **TP Markdown's default configuration**. It complements the teaching examples in [Syntax](base-syntax.md).

## Results

| Result | Examples |
| --- | ---: |
| Pass | 586 |
| Difference | 66 |
| Execution error | 0 |
| Total | 652 |
{style="width: fit-content; max-width: 100%;"}

**89.9%** of examples produce the expected HTML after the official normalization. This is a measured compatibility result, not a claim of full CommonMark compliance or an official certification.

[Inspect all examples: Markdown, expected HTML and TP HTML](/docs/commonmark-compliance/report.html){target=_blank}

[Inspect only the 66 differences: Markdown, expected HTML and TP HTML](/docs/commonmark-compliance/differences.html){target=_blank}

[Download the complete results](/docs/commonmark-compliance/results.json){target=_blank}

## Method

- Corpus: all 652 examples from the [official 0.31.2 JSON](https://spec.commonmark.org/0.31.2/spec.json), without edits or exclusions.
- Each example is rendered with a fresh <code>TpMarkdownParser</code> through <code>renderAsync()</code>, with default options and built-in extensions enabled. Pandoc mode is not enabled.
- Expected and actual HTML are compared with the [official version-pinned normalizer](https://github.com/commonmark/commonmark-spec/blob/0.31.2/test/normalize.py). This tolerates the serialization differences accepted by that tool; it does not remove TP attributes, wrappers or syntax extensions.
- Browser rendering, CSS, syntax highlighting and other runtime widgets are not part of this parser-level comparison.
- As a control, the same corpus and comparison run against markdown-it's <code>commonmark</code> preset: **652/652** pass. This control is not the TP result.

All 66 remaining differences in this corpus result from deliberate TP Markdown implementation choices: generated heading attributes, typographic substitutions, automatic links and YAML frontmatter recognition. They remain counted as differences in the strict CommonMark comparison; this does not imply full CommonMark conformance.

Open a category to compare the exact source and both HTML outputs.

## Results by specification section

| Section | Total | Pass | Difference | Error |
| --- | ---: | ---: | ---: | ---: |
| [Tabs](/docs/commonmark-compliance/report.html#section-1){target=_blank} | 11 | 10 | 1 | 0 |
| [Backslash escapes](/docs/commonmark-compliance/report.html#section-2){target=_blank} | 13 | 12 | 1 | 0 |
| [Entity and numeric character references](/docs/commonmark-compliance/report.html#section-3){target=_blank} | 17 | 17 | 0 | 0 |
| [Precedence](/docs/commonmark-compliance/report.html#section-4){target=_blank} | 1 | 1 | 0 | 0 |
| [Thematic breaks](/docs/commonmark-compliance/report.html#section-5){target=_blank} | 19 | 16 | 3 | 0 |
| [ATX headings](/docs/commonmark-compliance/report.html#section-6){target=_blank} | 18 | 5 | 13 | 0 |
| [Setext headings](/docs/commonmark-compliance/report.html#section-7){target=_blank} | 27 | 11 | 16 | 0 |
| [Indented code blocks](/docs/commonmark-compliance/report.html#section-8){target=_blank} | 12 | 11 | 1 | 0 |
| [Fenced code blocks](/docs/commonmark-compliance/report.html#section-9){target=_blank} | 29 | 28 | 1 | 0 |
| [HTML blocks](/docs/commonmark-compliance/report.html#section-10){target=_blank} | 44 | 44 | 0 | 0 |
| [Link reference definitions](/docs/commonmark-compliance/report.html#section-11){target=_blank} | 27 | 22 | 5 | 0 |
| [Paragraphs](/docs/commonmark-compliance/report.html#section-12){target=_blank} | 8 | 8 | 0 | 0 |
| [Blank lines](/docs/commonmark-compliance/report.html#section-13){target=_blank} | 1 | 0 | 1 | 0 |
| [Block quotes](/docs/commonmark-compliance/report.html#section-14){target=_blank} | 25 | 21 | 4 | 0 |
| [List items](/docs/commonmark-compliance/report.html#section-15){target=_blank} | 48 | 47 | 1 | 0 |
| [Lists](/docs/commonmark-compliance/report.html#section-16){target=_blank} | 26 | 26 | 0 | 0 |
| [Inlines](/docs/commonmark-compliance/report.html#section-17){target=_blank} | 1 | 1 | 0 | 0 |
| [Code spans](/docs/commonmark-compliance/report.html#section-18){target=_blank} | 22 | 22 | 0 | 0 |
| [Emphasis and strong emphasis](/docs/commonmark-compliance/report.html#section-19){target=_blank} | 132 | 126 | 6 | 0 |
| [Links](/docs/commonmark-compliance/report.html#section-20){target=_blank} | 90 | 89 | 1 | 0 |
| [Images](/docs/commonmark-compliance/report.html#section-21){target=_blank} | 22 | 21 | 1 | 0 |
| [Autolinks](/docs/commonmark-compliance/report.html#section-22){target=_blank} | 19 | 15 | 4 | 0 |
| [Raw HTML](/docs/commonmark-compliance/report.html#section-23){target=_blank} | 20 | 15 | 5 | 0 |
| [Hard line breaks](/docs/commonmark-compliance/report.html#section-24){target=_blank} | 15 | 13 | 2 | 0 |
| [Soft line breaks](/docs/commonmark-compliance/report.html#section-25){target=_blank} | 2 | 2 | 0 | 0 |
| [Textual content](/docs/commonmark-compliance/report.html#section-26){target=_blank} | 3 | 3 | 0 | 0 |

## Reproducing the results

Build the sibling <code>@tp/tp-markdown</code> package, then run <code>pnpm docs:markdown:compliance</code> from <code>@tp/tp-docs</code>. The command uses the bundled corpus and normalizer, requires Python 3, and regenerates this page and the detailed reports without downloading test data. Rerun it after parser changes; this page is a generated snapshot, not a live browser test.

The JSON report records SHA-256 fingerprints of the corpus and the parser entry bundle. Differences are reported rather than silently excluded. The command fails if the corpus size is unexpected or the runner cannot complete; a nonzero difference count is a report result rather than a build failure.

## Attribution

The [CommonMark specification and examples](https://spec.commonmark.org/0.31.2/) are by John MacFarlane and contributors, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The corpus is reproduced unchanged; TP outputs and this comparison are additions. The upstream normalizer is preserved with its source attribution in the bundled test directory.
