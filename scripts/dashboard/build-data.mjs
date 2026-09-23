import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const candidaturasDir = join(root, 'candidaturas');
const outputPath = join(candidaturasDir, 'status.json');
const statuses = new Set(['planejada', 'em andamento', 'oferta recebida', 'aprovada', 'rejeitada', 'desistência', 'encerrada sem retorno']);
const situations = new Set(['agendada', 'concluída', 'cancelada']);
const coverages = new Set(['limitada', 'completa']);
const targets = new Set(['provável', 'confirmado']);
const modes = new Set(['rápido', 'padrão', 'aprofundado']);

const value = (text, label) => {
  const match = text.match(new RegExp(`^(?:-\\s*)?\\*\\*${label}:\\*\\*\\s*(.+)$`, 'm'));
  return match?.[1]?.trim() || null;
};

function parseStages(text) {
  const matches = [...text.matchAll(/^### (\d{4}-\d{2}-\d{2}|Data desconhecida) — (.+)$/gm)];
  return matches.map((match, index) => {
    const end = matches[index + 1]?.index ?? text.length;
    const block = text.slice(match.index, end);
    const categoria = value(block, 'Categoria');
    const situacao = value(block, 'Situação');
    if (!categoria || !situacao || !situations.has(situacao)) {
      throw new Error(`Etapa inválida em processo-seletivo.md: ${match[2]}`);
    }
    return {
      data: match[1],
      nome: match[2].trim(),
      categoria,
      situacao,
      dataHorario: value(block, 'Data e horário'),
      resumo: value(block, 'Resumo factual'),
      proximaAcao: value(block, 'Próxima ação')
    };
  });
}

async function findLatestPreparation(folderPath, rootPath) {
  const preparationDir = join(folderPath, 'preparacao');
  let entries;
  try {
    entries = await readdir(preparationDir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }

  const preparations = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith('.md'))) {
    const path = join(preparationDir, entry.name);
    const text = await readFile(path, 'utf8');
    const preparation = {
      titulo: text.match(/^# Preparação de etapa — (.+)$/m)?.[1]?.trim() || null,
      cobertura: value(text, 'Cobertura'),
      alvo: value(text, 'Alvo'),
      modo: value(text, 'Modo'),
      dataEtapa: value(text, 'Data da etapa'),
      ultimaAtualizacao: value(text, 'Última atualização'),
      arquivo: relative(rootPath, path).replaceAll('\\', '/')
    };

    if (!preparation.titulo || !coverages.has(preparation.cobertura) || !targets.has(preparation.alvo) || !modes.has(preparation.modo) || !preparation.ultimaAtualizacao) {
      throw new Error(`Preparação inválida em ${relative(rootPath, path)}`);
    }
    preparations.push(preparation);
  }

  preparations.sort((a, b) => b.ultimaAtualizacao.localeCompare(a.ultimaAtualizacao) || b.arquivo.localeCompare(a.arquivo));
  return preparations[0] || null;
}

export async function buildDashboardData({ candidaturasPath = candidaturasDir, rootPath = root } = {}) {
  const entries = await readdir(candidaturasPath, { withFileTypes: true });
  const records = [];

  for (const folder of entries.filter((entry) => entry.isDirectory())) {
    const folderPath = join(candidaturasPath, folder.name);
    const processPath = join(folderPath, 'processo-seletivo.md');
    let text;
    try {
      text = await readFile(processPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }

    const record = {
      empresa: value(text, 'Empresa'),
      cargo: text.match(/^# Processo seletivo — (.+)$/m)?.[1]?.trim() || folder.name,
      status: value(text, 'Status geral'),
      etapa: value(text, 'Etapa atual'),
      proximaAcao: value(text, 'Próxima ação'),
      prazo: value(text, 'Prazo'),
      ultimaAtualizacao: value(text, 'Última atualização'),
      pasta: folder.name,
      etapas: parseStages(text),
      preparacao: await findLatestPreparation(folderPath, rootPath)
    };
    if (!record.empresa || !record.etapa || !record.ultimaAtualizacao || !statuses.has(record.status)) {
      throw new Error(`Resumo inválido em ${relative(rootPath, processPath)}`);
    }
    records.push(record);
  }

  records.sort((a, b) => {
    const active = (status) => ['planejada', 'em andamento', 'oferta recebida'].includes(status) ? 0 : 1;
    return active(a.status) - active(b.status) || b.ultimaAtualizacao.localeCompare(a.ultimaAtualizacao) || a.empresa.localeCompare(b.empresa);
  });
  return {
    schemaVersion: 2,
    atualizadoEm: records.map((record) => record.ultimaAtualizacao).sort().at(-1) || null,
    candidaturas: records
  };
}

export async function generateDashboardData({ candidaturasPath = candidaturasDir, rootPath = root, destination = outputPath } = {}) {
  const data = await buildDashboardData({ candidaturasPath, rootPath });
  await writeFile(destination, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Dashboard atualizado: ${relative(rootPath, destination)} (${data.candidaturas.length} candidaturas)`);
  return data;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) await generateDashboardData();
