import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

test('status.json contém as candidaturas atuais e etapas', async () => {
  const data = JSON.parse(await readFile(join(root, 'candidaturas', 'status.json'), 'utf8'));
  assert.equal(data.schemaVersion, 1);
  assert.deepEqual(data.candidaturas.map((item) => item.empresa).sort(), ['BySix Portugal', 'Luza', 'SII Portugal', 'Trend4IT']);
  assert.ok(data.candidaturas.every((item) => Array.isArray(item.etapas)));
});
