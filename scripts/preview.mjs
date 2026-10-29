import { preview } from 'vite';
import { fileURLToPath } from 'node:url';
const server = await preview({
  configFile: false,
  appType: 'mpa',
  build: { outDir: fileURLToPath(new URL('../dist/', import.meta.url)) },
  preview: { host: '127.0.0.1', port: 4320, strictPort: true, open: process.env.OPEN_BROWSER !== '0' },
});
server.printUrls();
