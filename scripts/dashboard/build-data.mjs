import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const candidaturasDir = join(root, 'candidaturas');
const outputPath = join(candidaturasDir, 'status.json');
const statuses = new Set(['planejada', 'em andamento', 'oferta recebida', 'aprovada', 'rejeitada', 'desistência', 'encerrada sem retorno']);
const situations = new Set(['agendada', 'concluída', 'cancelada']);

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

async function processFiles() {
  const entries = await readdir(candidaturasDir, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory());
  const records = [];
  for (const folder of folders) {
    const processPath = join(candidaturasDir, folder.name, 'processo-seletivo.md');
    let text;
    try {
      text = await readFile(processPath, 'utf8');
    } catch {
      continue;
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
      etapas: parseStages(text)
    };
    if (!record.empresa || !record.etapa || !record.ultimaAtualizacao || !statuses.has(record.status)) {
      throw new Error(`Resumo inválido em ${relative(root, processPath)}`);
    }
    records.push(record);
  }
  records.sort((a, b) => {
    const active = (status) => ['planejada', 'em andamento', 'oferta recebida'].includes(status) ? 0 : 1;
    return active(a.status) - active(b.status) || b.ultimaAtualizacao.localeCompare(a.ultimaAtualizacao) || a.empresa.localeCompare(b.empresa);
  });
  return {
    schemaVersion: 1,
    atualizadoEm: records.map((record) => record.ultimaAtualizacao).sort().at(-1) || null,
    candidaturas: records
  };
}

const data = await processFiles();
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Dashboard atualizado: ${relative(root, outputPath)} (${data.candidaturas.length} candidaturas)`);
