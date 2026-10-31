import { rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const api = spawnSync('pnpm', ['api:build'], { stdio: 'inherit', cwd: new URL('../', import.meta.url) });
if (api.status !== 0) process.exit(api.status ?? 1);
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
const result = spawnSync('pnpm', ['-r', 'build'], { stdio: 'inherit', cwd: new URL('../', import.meta.url) });
process.exit(result.status ?? 1);
