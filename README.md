# TP Docs

Documentation workspace for the TP web ecosystem. This is an independent pnpm workspace next to the library repositories, with one Git repository and one lockfile. Do not add its packages to the parent workspace.

## Layout

| Package | Purpose | Development URL |
| --- | --- | --- |
| `@tp/docs-home` | Documentation portal | http://127.0.0.1:4320/ |
| `@tp/docs-components` | Web components | http://127.0.0.1:4321/ |
| `@tp/docs-markdown` | Markdown | http://127.0.0.1:4322/ |
| `@tp/docs-asciidoc` | AsciiDoc | http://127.0.0.1:4323/ |
| `@tp/docs-restructuredtext` | reStructuredText | http://127.0.0.1:4324/ |

`shared/` owns the Vite configuration, navigation and styles. Each package owns its HTML entry and `public/docs/` content.

## Local setup

Use Node.js 20.19+ (20.x) or 22.12+ and pnpm 9.15.5. Place this repository alongside an existing, built `tp-components` checkout:

```text
@tp/
  tp-components/dist/tp-loader.js
  tp-docs/
```

The component library must be built using its own workspace instructions and dependencies. A checkout of tp-docs alone is not sufficient to build the documentation. Each documentation package links to `../../../tp-components`; nothing is downloaded from an npm registry for this dependency.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` starts only the home site and opens the portal. Each documentation has an independent command; run the sites you need in separate terminals:

| Command | Site | Port |
| --- | --- | --- |
| `pnpm dev` or `pnpm dev:home` | Home | 4320 |
| `pnpm dev:components` | Components | 4321 |
| `pnpm dev:markdown` | Markdown | 4322 |
| `pnpm dev:asciidoc` | AsciiDoc | 4323 |
| `pnpm dev:restructuredtext` | reStructuredText | 4324 |
| `pnpm dev:jt-vr` | JT VR example (sibling `tp-examples`) | 4316 |

`pnpm dev:jt-vr` forwards to the existing example in `../tp-examples`; keep that checkout next to `tp-docs` and install its dependencies first. It starts the example independently and does not add it to the documentation build.

Links to other development sites require those sites to be running. Set `OPEN_BROWSER=0` to suppress automatic browser opening. If an older `pnpm dev` session is still running all sites, stop it with Ctrl+C in its terminal before using these independent commands. A site cannot be started twice on the same port.

## Production build

```sh
pnpm build
pnpm preview
```

The build clears `dist/` and creates the portal at its root, with the four documentations under their respective subdirectories. Preview serves the complete collection at http://127.0.0.1:4330/. Its separate port allows development and preview servers to run at the same time. Relative asset and navigation URLs also support deployment under a URL prefix.

The compiled component runtime is copied into each site's output, following the existing tp-examples convention. This is a starting point; runtime distribution and automated deployment can be refined separately. Build output is not committed. No GitHub Pages deployment is configured yet.

## Using TP components

Every entry loads `./@tp/tp-components/tp-loader.js`. Add TP elements to an HTML entry or documentation content using the component API. Keep shared registration and build configuration in `shared/`. Components and rendering engines remain implemented in their library repositories.

## Migration status

The four TypeDoc references are integrated here, and migration of the guides has started with Markdown. Other documentation, examples, tests, coverage and Lighthouse reports remain in their original repositories. Migrate them incrementally, preserving links, assets and generated report workflows. The current component runtime is supplied by the local checkout; this repository does not yet pin or publish that runtime.

## TypeDoc API references

API comments remain in each library's TypeScript sources. This workspace owns the
shared TypeDoc configuration, generation and publication of their HTML references.
Place the four library checkouts alongside `tp-docs` and install their workspace
dependencies before generating references. `tp-components` must also be built to
provide the live HTML example previews.

```sh
pnpm api:build                    # All four references
pnpm api:build:components         # One reference
pnpm api:build:markdown
pnpm api:build:asciidoc
pnpm api:build:restructuredtext
```

Each reference is generated into `packages/<name>/public/api/` (ignored by Git).
`pnpm build` regenerates all references before building the sites. Each independent
`pnpm dev:<name>` generates only its own API before starting Vite. After changing
library comments, rerun the corresponding API command to refresh the HTML.
`pnpm dev` still starts only the home site; links to the other development sites
require their servers to be running.

The portal is available at `/api/index.html`; published references are under
`/<name>/api/index.html`. In development each reference is served at
`http://127.0.0.1:<site-port>/api/index.html`. Generated pages link back to their
guides and to the API portal. Relative URLs support deployment under a path prefix.
The source repositories' existing TypeDoc commands remain available independently.

## Native multipage guides

Markdown, AsciiDoc and reStructuredText use their respective `tp-LANG-multi-pages`
components. Each `public/docs/` directory contains `cover`, `sidebar`, `index`,
`base` and `extensions` files in its native format (`.md`, `.adoc` or `.rst`).
The shared entry resolves the repository path relative to each site, including a
publication prefix. The toolbar logo returns to the documentation portal.

## Component help

Ctrl+? opens the selected component's help drawer. Its header offers User help
(interactions and preview), Author help (component guide) and Developer help
(TypeDoc class reference). The component guides and their assets are copied from
`tp-components/public/docs` into the components documentation site at build time.
In development, run `pnpm dev:components` alongside any other guide that needs
Author help or Developer help. User help continues to use the local runtime manifests.

Hosts can configure the reference locations with the `tp-components-docs-root`
and `tp-components-api-root` meta elements. The latter points to the API directory,
which includes a generated `component-pages.json` mapping tags to TypeDoc pages.

## AsciiDoc quick reference

The official syntax quick reference is reproduced under CC BY 4.0 in `packages/asciidoc/public/docs/base.adoc`. Its expanded source and upstream license are kept in `packages/asciidoc/source/`. Run `node scripts/build-asciidoc-quick-reference.mjs` to regenerate the Base page. The pinned upstream revision and adaptation details are displayed at the top of the page. The 97 examples share one continuous numbering sequence. The 92 executable examples use `tp-asciidoc-viewer lite`; their individual sources are generated in `public/docs/quick-reference-examples/`. Examples requiring unavailable files or services are explicitly labeled syntax-only. Relative and inter-document links have a bundled sample target. The audio and MP4 samples are bundled in `packages/asciidoc/source/media/` and copied when regenerating the page; they come from the TP audio-playlist and video-player demonstration assets. YouTube, Vimeo and external images remain hosted by their providers.

Examples 56–58 include bundled Ruby and Java source files relative to the viewer source. The last example selects the `main` tag and uses `indent=0`; links next to each viewer expose the original files.

Example 74 builds a table from the bundled `customers.csv` file using `format=csv`, `options=header` and an actual include directive.

## reStructuredText documentation

The reStructuredText site uses **Base** (the Docutils demonstration and interpreted-text roles) and **Extensions** (TP elements, HTML, external libraries, mathematics and doctests). The reference pages are RST adaptations of the public-domain Docutils sources preserved in `packages/restructuredtext/source/`, with provenance and checksums.

Run `python3 scripts/build-restructuredtext-demo.py` and `python3 scripts/build-restructuredtext-roles.py` to regenerate `base.rst`, `roles.rst` and their examples. The demonstration contains 29 editable examples, including one intentionally invalid example with six expected errors. The roles reference contains 23 editable examples. The 11 manually maintained extension examples live in `public/docs/extensions-examples/` within the reStructuredText package.

The examples use `tp-restructuredtext-viewer lite`. Their relative images are bundled beside the example sources. React, Vue, Shoelace, Pyodide and MathJax still load from their respective CDNs. `Extensions` distinguishes native Docutils syntax from TP features and browser limitations.

Validation: convert the RST documents with the TP Docutils converter and check that only `intentional-diagnostics.rst` produces errors; verify the enabled doctest example (two passing tests). Build with `pnpm --filter @tp/docs-restructuredtext build`. In the browser, check Base, Interpreted Text Roles and Extensions, including image loading, internal links, viewer sizing, the external-library interactions and mathematics. After parser changes, rebuild `tp-restructuredtext`, then `tp-components` and its renderers before checking this site.

## Pandoc Markdown compatibility gallery

The Markdown site has a dedicated `pandoc-markdown.md` page with a lite Markdown viewer and a documented compatibility status for each input example. The original Pandoc manual, extracted section, copyright/license files and curated manifest are preserved under `packages/markdown/source/pandoc/`. The manifest records original and adapted source separately and explains exclusions and adaptations. This gallery uses TP's default configuration; its badges are reviewed snapshots, not a live automatic verdict after editing.

Regenerate the page and example files with `node scripts/build-pandoc-markdown-page.mjs`. Rendering without an exception is only a smoke check: review the output against the manual and Pandoc before changing a status. Images and placeholder link destinations use bundled fixtures. Preserve unsupported syntax to expose actual differences instead of silently translating it into TP syntax.

Every Partial or Not supported Pandoc example must define `workaround.explanation` in the manifest, with optional `workaround.source` for a copyable TP Markdown rewrite. The generator rejects missing explanations and chooses code fences that safely contain nested code blocks. Check rewritten sources against the current TP renderer, retain the original viewer source, and explicitly state remaining differences (including export-only behavior and citeproc).
