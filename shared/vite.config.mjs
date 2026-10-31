import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { sites } from './sites.mjs';

export function docsConfig(id) {
  const site = sites.find(site => site.id === id);
  if (!site) throw new Error(`Unknown documentation: ${id}`);
  return defineConfig(({ isPreview }) => {
    const source = fileURLToPath(new URL(`../packages/${id}/node_modules/@tp/tp-components/dist/`, import.meta.url));
    if (!isPreview && !existsSync(`${source}/tp-loader.js`)) {
      throw new Error('Build the sibling tp-components repository, then run pnpm install in tp-docs.');
    }
    return {
      base: './',
      appType: 'mpa',
      server: { host: '127.0.0.1', port: site.port, strictPort: true, open: id === 'home' && process.env.OPEN_BROWSER !== '0' },
      build: {
        outDir: fileURLToPath(new URL(`../dist/${id === 'home' ? '' : id + '/'}`, import.meta.url)),
        // The home output contains the other sites: never empty it during parallel builds.
        emptyOutDir: false,
      },
      plugins: isPreview ? [] : [viteStaticCopy({ targets: [{
        src: 'node_modules/@tp/tp-components/dist/**/*',
        dest: '@tp/tp-components',
        rename: { stripBase: 4 },
      }, ...(id === 'components' ? [{
        src: 'node_modules/@tp/tp-components/public/docs/{components,medias,appendices,component-authoring,exercises,fr}',
        dest: 'docs',
        rename: { stripBase: 5 },
      }] : [])] })],
    };
  });
}
