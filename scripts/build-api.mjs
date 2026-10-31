import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sites } from '../shared/sites.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const available = sites.filter(site => site.id !== 'home').map(site => site.id);
const requested = process.argv.slice(2);
const selected = requested.length ? requested : available;
for (const id of selected) {
  if (!available.includes(id)) throw new Error(`Unknown API: ${id}. Choose ${available.join(', ')}.`);
  if (!existsSync(new URL(`../../tp-${id}/tsconfig.json`, import.meta.url))) {
    throw new Error(`Missing sibling tp-${id} checkout. Install its workspace dependencies before generating the API.`);
  }
}
for (const id of selected) {
  console.log(`Generating tp-${id} API…`);
  const result = spawnSync('pnpm', ['exec', 'typedoc', '--options', `config/api/${id}.json`], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
