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

`pnpm dev` starts all five sites and opens the portal. Use `pnpm dev:components` (or `dev:home`, `dev:markdown`, `dev:asciidoc`, `dev:restructuredtext`) to start one site. Links to other development sites require those sites to be running. Set `OPEN_BROWSER=0` to suppress automatic browser opening.

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

This initial scaffold contains landing pages only. Existing documentation, examples, tests, coverage and Lighthouse reports remain in their original repositories. Migrate them incrementally, preserving links, assets and generated report workflows. The current component runtime is supplied by the local checkout; this repository does not yet pin or publish that runtime.
