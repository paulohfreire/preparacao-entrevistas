import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { resolvePreparationPath } from '../../scripts/dashboard/paths.mjs';

const root = join('C:', 'workspace', 'project');

test('aceita somente caminhos de preparação no formato publicado pelo gerador', () => {
  const path = resolvePreparationPath(root, 'candidaturas/example-role/preparacao/2026-10-01-entrevista-tecnica.md');
  assert.equal(path, join(root, 'candidaturas', 'example-role', 'preparacao', '2026-10-01-entrevista-tecnica.md'));
});

test('rejeita travessia e arquivos fora da pasta de preparação', () => {
  assert.equal(resolvePreparationPath(root, 'candidaturas/example-role/preparacao/../../vaga.md'), null);
  assert.equal(resolvePreparationPath(root, 'candidaturas/example-role/vaga.md'), null);
  assert.equal(resolvePreparationPath(root, 'C:/Users/example/secret.md'), null);
});
