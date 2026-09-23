import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { buildDashboardData } from '../../scripts/dashboard/build-data.mjs';

const processText = `# Processo seletivo — Software Engineer

**Empresa:** Example Co
**Status geral:** em andamento
**Etapa atual:** Entrevista técnica agendada
**Próxima ação:** Preparar entrevista
**Prazo:** 2026-10-01
**Última atualização:** 2026-09-23

## Linha do tempo

### 2026-10-01 — Entrevista técnica

- **Categoria:** entrevista técnica
- **Situação:** agendada
- **Data e horário:** 2026-10-01 às 10:00
- **Resumo factual:** Entrevista agendada.
- **Próxima ação:** Preparar entrevista.
`;

const preparationText = (coverage = 'completa', updated = '2026-09-23') => `# Preparação de etapa — Entrevista técnica

**Empresa:** Example Co
**Vaga:** Software Engineer
**Cobertura:** ${coverage}
**Alvo:** confirmado
**Modo:** padrão
**Idioma das orientações:** português
**Idioma da entrevista:** inglês
**Data da etapa:** 2026-10-01
**Última atualização:** ${updated}
`;

async function fixture(t) {
  const rootPath = await mkdtemp(join(tmpdir(), 'interview-dashboard-'));
  t.after(() => rm(rootPath, { recursive: true, force: true }));
  const candidaturasPath = join(rootPath, 'candidaturas');
  const folder = join(candidaturasPath, 'example-software-engineer');
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, 'processo-seletivo.md'), processText, 'utf8');
  return { rootPath, candidaturasPath, folder };
}

test('marca preparação ausente quando não há artefato', async (t) => {
  const paths = await fixture(t);
  const data = await buildDashboardData(paths);
  assert.equal(data.schemaVersion, 2);
  assert.equal(data.candidaturas[0].preparacao, null);
});

test('projeta a preparação mais recente e sua cobertura', async (t) => {
  const paths = await fixture(t);
  const preparationDir = join(paths.folder, 'preparacao');
  await mkdir(preparationDir);
  await writeFile(join(preparationDir, '2026-09-30-entrevista-tecnica.md'), preparationText('limitada', '2026-09-22'), 'utf8');
  await writeFile(join(preparationDir, '2026-10-01-entrevista-tecnica.md'), preparationText('completa', '2026-09-23'), 'utf8');

  const data = await buildDashboardData(paths);
  assert.deepEqual(data.candidaturas[0].preparacao, {
    titulo: 'Entrevista técnica',
    cobertura: 'completa',
    alvo: 'confirmado',
    modo: 'padrão',
    dataEtapa: '2026-10-01',
    ultimaAtualizacao: '2026-09-23',
    arquivo: 'candidaturas/example-software-engineer/preparacao/2026-10-01-entrevista-tecnica.md'
  });
});

test('rejeita cobertura de preparação fora do vocabulário controlado', async (t) => {
  const paths = await fixture(t);
  const preparationDir = join(paths.folder, 'preparacao');
  await mkdir(preparationDir);
  await writeFile(join(preparationDir, '2026-10-01-entrevista-tecnica.md'), preparationText('parcial'), 'utf8');

  await assert.rejects(() => buildDashboardData(paths), /Preparação inválida/);
});
