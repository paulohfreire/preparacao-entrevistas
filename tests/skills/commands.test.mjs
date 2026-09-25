import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  buildCommandCatalog,
  formatCommandCatalog,
} from '../../.agents/skills/comandos/scripts/list-commands.mjs';

async function createFixture() {
  const root = await mkdtemp(join(tmpdir(), 'catalogo-comandos-'));
  const skills = join(root, '.agents', 'skills');
  await mkdir(join(skills, 'zeta', 'agents'), { recursive: true });
  await mkdir(join(skills, 'alfa'), { recursive: true });
  await writeFile(
    join(skills, 'zeta', 'SKILL.md'),
    '---\nname: zeta\ndescription: Descrição extensa. Use somente em testes.\n---\n',
  );
  await writeFile(
    join(skills, 'zeta', 'agents', 'openai.yaml'),
    'interface:\n  short_description: "Descrição curta"\n  default_prompt: "Use $zeta para testar."\n',
  );
  await writeFile(
    join(skills, 'alfa', 'SKILL.md'),
    '---\nname: alfa\ndescription: Primeira frase. Segunda frase.\n---\n',
  );
  await writeFile(
    join(root, 'package.json'),
    JSON.stringify({
      scripts: { verificar: 'node --test' },
      commandDescriptions: { verificar: 'Executa os testes.' },
    }),
  );
  return root;
}

test('descobre e ordena skills locais e comandos npm', async () => {
  const catalog = await buildCommandCatalog({ root: await createFixture() });

  assert.deepEqual(catalog.skills, [
    { name: 'alfa', description: 'Primeira frase.', example: null },
    { name: 'zeta', description: 'Descrição curta', example: 'Use $zeta para testar.' },
  ]);
  assert.deepEqual(catalog.commands, [
    { name: 'npm run verificar', description: 'Executa os testes.' },
  ]);
});

test('formata invocações com $ e mantém comandos em seção separada', async () => {
  const output = formatCommandCatalog(await buildCommandCatalog({ root: await createFixture() }));

  assert.match(output, /`\$alfa` — Primeira frase\./);
  assert.match(output, /Exemplo: Use \$zeta para testar\./);
  assert.match(output, /# Comandos do projeto[\s\S]*`npm run verificar`/);
});

test('rejeita skill sem metadados obrigatórios', async () => {
  const root = await createFixture();
  await mkdir(join(root, '.agents', 'skills', 'invalida'), { recursive: true });
  await writeFile(join(root, '.agents', 'skills', 'invalida', 'SKILL.md'), '---\nname: invalida\n---\n');

  await assert.rejects(buildCommandCatalog({ root }), /Nome ou descrição ausente/);
});
