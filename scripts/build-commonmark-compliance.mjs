import { classifyDifferences } from './commonmark-difference-types.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../packages/markdown/', import.meta.url);
const parserRoot = new URL('../../tp-markdown/', import.meta.url);
const requireParser = createRequire(new URL('package.json', parserRoot));
const { JSDOM } = requireParser('jsdom');
const MarkdownIt = requireParser('markdown-it');
const dom = new JSDOM('');
globalThis.document = dom.window.document;
globalThis.window = dom.window;
const { TpMarkdownParser } = await import(new URL('dist/markdown/engine/markdown.js', parserRoot));
const fixtures = new URL('source/commonmark/compliance/', root);
const corpusText = readFileSync(new URL('spec.json', fixtures), 'utf8');
const corpus = JSON.parse(corpusText);
if (corpus.length !== 652) throw new Error('Unexpected CommonMark 0.31.2 corpus size');
const baseline = new MarkdownIt('commonmark');
const results = [];
for (const example of corpus) {
  let actual = '', error = null;
  try { actual = await new TpMarkdownParser().renderAsync(example.markdown); }
  catch (caught) { error = String(caught); }
  results.push({ ...example, actual, error, baseline: baseline.render(example.markdown) });
}
// Use the version-pinned upstream normalizer, not a TP-specific comparison.
const normalized = spawnSync('python3', ['-c', `
import json, sys
sys.dont_write_bytecode = True
sys.path.insert(0, sys.argv[1])
from normalize import normalize_html
rows = json.load(sys.stdin)
json.dump([[normalize_html(r['html']), normalize_html(r['actual']), normalize_html(r['baseline'])] for r in rows], sys.stdout)
`, fileURLToPath(fixtures)], { input: JSON.stringify(results), encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
if (normalized.status !== 0) throw new Error(normalized.stderr);
const comparisons = JSON.parse(normalized.stdout);
for (const [index, result] of results.entries()) {
  const [expected, actual, reference] = comparisons[index];
  result.status = result.error ? 'error' : expected === actual ? 'pass' : 'difference';
  result.normalizedExpected = expected;
  result.normalizedActual = actual;
  result.baselinePass = expected === reference;
  delete result.baseline;
}
const differenceTypes = classifyDifferences(results, JSON.parse(readFileSync(new URL('difference-types.json', fixtures), 'utf8')));
const sections = [...new Set(results.map(r => r.section))].map((section, index) => {
  const cases = results.filter(r => r.section === section);
  return { section, id: `section-${index + 1}`, total: cases.length, pass: cases.filter(r => r.status === 'pass').length, errors: cases.filter(r => r.status === 'error').length, cases };
});
const passed = results.filter(r => r.status === 'pass').length;
const errors = results.filter(r => r.status === 'error').length;
const baselinePassed = results.filter(r => r.baselinePass).length;
const intentionalTypes = new Set(['heading-attributes', 'typography', 'frontmatter', 'linkify']);
const onlyIntentionalDifferences = errors === 0 && differenceTypes.every(type => intentionalTypes.has(type.id));
const interpretation = onlyIntentionalDifferences
  ? `All ${results.length-passed-errors} remaining differences in this corpus result from deliberate TP Markdown implementation choices: generated heading attributes, typographic substitutions, automatic links and YAML frontmatter recognition. They remain counted as differences in the strict CommonMark comparison; this does not imply full CommonMark conformance.`
  : 'The current results include differences or errors that require review before all remaining differences can be described as deliberate implementation choices. Every difference remains counted in the strict CommonMark comparison.';

const output = new URL('public/docs/commonmark-compliance/', root);
mkdirSync(output, {recursive:true});
const metadata = {
  specification: 'CommonMark 0.31.2', source: 'https://spec.commonmark.org/0.31.2/spec.json',
  corpusSha256: createHash('sha256').update(corpusText).digest('hex'),
  parserBundleSha256: createHash('sha256').update(readFileSync(new URL('dist/markdown/engine/markdown.js', parserRoot))).digest('hex'),
  configuration: 'TpMarkdownParser defaults; renderAsync; no Pandoc; no browser runtime',
  comparison: 'Official CommonMark 0.31.2 test/normalize.py',
  onlyIntentionalDifferences, interpretation,
  total: results.length, passed, differences: results.length-passed-errors, errors, baselinePassed,
};
writeFileSync(new URL('results.json', output), JSON.stringify({metadata, differenceTypes: differenceTypes.map(({cases, ...type}) => ({...type, examples: cases.map(test => test.example), count: cases.length})), results}, null, 2)+'\n');
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function differenceSummary() {
  return `<h2 id="difference-types">Main types of differences</h2>
<p>Each differing example belongs to exactly one row; the counts add up to ${results.length-passed-errors}. Mixed cases are identified in their descriptions. Classification does not change the official comparison or the pass count.</p>
<p>The largest groups concern attributes automatically added to the HTML, rather than the Markdown attribute-list notation. Attribute-only classifications are checked by removing just the named attributes from the normalized output and comparing again. The other cases have been reviewed; their classification is retained only while both HTML fingerprints remain unchanged.</p>
<table><thead><tr><th>Type</th><th>Tests</th><th>Explanation</th><th>Examples</th></tr></thead><tbody>${differenceTypes.map(type => `<tr><td>${escape(type.label)}</td><td>${type.cases.length}</td><td>${escape(type.description)}</td><td><details><summary>Show ${type.cases.length} tests</summary>${type.cases.map(test => `<a href="#example-${test.example}">${test.example}</a>`).join(', ')}</details></td></tr>`).join('')}</tbody></table>`;
}
function createReport(selectedSections, differencesOnly = false) {
return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>CommonMark compliance — TP Markdown</title>
<style>html{color-scheme:light dark;font:16px system-ui}body{max-width:85rem;margin:2rem auto;padding:1rem}a{color:light-dark(#005cc5,#9cdcfe)}details{border:1px solid #888;padding:1rem;margin:1rem 0}summary{cursor:pointer}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:.6rem;text-align:left;vertical-align:top}th{background:light-dark(#eee,#333)}td details{margin:0;padding:.3rem}pre{overflow:auto;padding:1rem;background:light-dark(#f2f2f2,#202020);white-space:pre-wrap;overflow-wrap:anywhere}.outputs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,25rem),1fr));gap:1rem}</style>
<h1>CommonMark 0.31.2 — TP Markdown${differencesOnly ? " — Differences only" : ""}</h1><p>${passed}/${results.length} passed; ${results.length-passed-errors} differences; ${errors} errors. Default TP configuration, using the official HTML normalizer.</p>
<p>${differencesOnly ? "This report contains only examples whose status is difference. <a href=\"report.html\">Inspect all examples</a>." : "<a href=\"differences.html\">Inspect differences only</a>."}</p>
<p>${escape(interpretation)}</p>
<p>Every result below is static test output. Source and HTML are escaped and never executed.</p>
<p>Corpus by John MacFarlane and contributors, <a href="https://spec.commonmark.org/0.31.2/">CommonMark specification</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. <a href="results.json">Full JSON results</a>.</p>
${differencesOnly ? differenceSummary() : ""}
${selectedSections.map(s=>`<h2 id="${s.id}">${escape(s.section)} — ${differencesOnly ? `${s.cases.length} differences` : `${s.pass}/${s.total}`}</h2>${s.cases.map(r=>`<details id="example-${r.example}"><summary>Example ${r.example}: ${r.status}</summary><p><a href="https://spec.commonmark.org/0.31.2/#example-${r.example}">Official example</a></p>${r.differenceType ? `<p><strong>Difference type:</strong> ${escape(differenceTypes.find(type => type.id === r.differenceType).label)}</p>` : ""}<h3>Markdown source</h3><pre><code>${escape(r.markdown)}</code></pre><div class="outputs"><section><h3>Expected HTML</h3><pre><code>${escape(r.html)}</code></pre></section><section><h3>TP HTML</h3><pre><code>${escape(r.error ?? r.actual)}</code></pre></section></div></details>`).join('')}`).join('')}
</html>`;
}
writeFileSync(new URL('report.html', output), createReport(sections));
const differenceSections = sections.map(section => ({ ...section, cases: section.cases.filter(result => result.status === 'difference') })).filter(section => section.cases.length > 0);
writeFileSync(new URL('differences.html', output), createReport(differenceSections, true));
let page = `# Compliance: CommonMark

This page reports the complete **CommonMark 0.31.2** conformance corpus against **TP Markdown's default configuration**. It complements the teaching examples in [Syntax](base-syntax.md).

## Results

| Result | Examples |
| --- | ---: |
| Pass | ${passed} |
| Difference | ${results.length-passed-errors} |
| Execution error | ${errors} |
| Total | ${results.length} |
{style="width: fit-content; max-width: 100%;"}

**${(100*passed/results.length).toFixed(1)}%** of examples produce the expected HTML after the official normalization. This is a measured compatibility result, not a claim of full CommonMark compliance or an official certification.

[Inspect all examples: Markdown, expected HTML and TP HTML](/docs/commonmark-compliance/report.html){target=_blank}

[Inspect only the ${results.length-passed-errors} differences: Markdown, expected HTML and TP HTML](/docs/commonmark-compliance/differences.html){target=_blank}

[Download the complete results](/docs/commonmark-compliance/results.json){target=_blank}

## Method

- Corpus: all ${results.length} examples from the [official 0.31.2 JSON](https://spec.commonmark.org/0.31.2/spec.json), without edits or exclusions.
- Each example is rendered with a fresh <code>TpMarkdownParser</code> through <code>renderAsync()</code>, with default options and built-in extensions enabled. Pandoc mode is not enabled.
- Expected and actual HTML are compared with the [official version-pinned normalizer](https://github.com/commonmark/commonmark-spec/blob/0.31.2/test/normalize.py). This tolerates the serialization differences accepted by that tool; it does not remove TP attributes, wrappers or syntax extensions.
- Browser rendering, CSS, syntax highlighting and other runtime widgets are not part of this parser-level comparison.
- As a control, the same corpus and comparison run against markdown-it's <code>commonmark</code> preset: **${baselinePassed}/${results.length}** pass. This control is not the TP result.

${interpretation}

Open a category to compare the exact source and both HTML outputs.

## Results by specification section

| Section | Total | Pass | Difference | Error |
| --- | ---: | ---: | ---: | ---: |
${sections.map(s=>`| [${s.section}](/docs/commonmark-compliance/report.html#${s.id}){target=_blank} | ${s.total} | ${s.pass} | ${s.total-s.pass-s.errors} | ${s.errors} |`).join('\n')}

## Reproducing the results

Build the sibling <code>@tp/tp-markdown</code> package, then run <code>pnpm docs:markdown:compliance</code> from <code>@tp/tp-docs</code>. The command uses the bundled corpus and normalizer, requires Python 3, and regenerates this page and the detailed reports without downloading test data. Rerun it after parser changes; this page is a generated snapshot, not a live browser test.

The JSON report records SHA-256 fingerprints of the corpus and the parser entry bundle. Differences are reported rather than silently excluded. The command fails if the corpus size is unexpected or the runner cannot complete; a nonzero difference count is a report result rather than a build failure.

## Attribution

The [CommonMark specification and examples](https://spec.commonmark.org/0.31.2/) are by John MacFarlane and contributors, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The corpus is reproduced unchanged; TP outputs and this comparison are additions. The upstream normalizer is preserved with its source attribution in the bundled test directory.
`;
writeFileSync(new URL('public/docs/base-compliance.md', root), page);
console.log(JSON.stringify(metadata, null, 2));
