import { rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
const result = spawnSync('pnpm', ['-r', 'build'], { stdio: 'inherit', cwd: new URL('../', import.meta.url) });
process.exit(result.status ?? 1);
