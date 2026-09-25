import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(scriptDir, '../../../..');

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(markdown, source) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Frontmatter ausente em ${source}`);

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (field) metadata[field[1]] = unquote(field[2]);
  }

  if (!metadata.name || !metadata.description) {
    throw new Error(`Nome ou descrição ausente em ${source}`);
  }
  return metadata;
}

function parseInterface(yaml = '') {
  const result = {};
  let inInterface = false;

  for (const line of yaml.split(/\r?\n/)) {
    if (/^interface:\s*$/.test(line)) {
      inInterface = true;
      continue;
    }
    if (/^[^\s]/.test(line)) inInterface = false;
    if (!inInterface) continue;

    const field = line.match(/^\s{2}([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (field) result[field[1]] = unquote(field[2]);
  }

  return result;
}

function firstSentence(text) {
  return text.split(/\.\s+/)[0].replace(/\.$/, '') + '.';
}

async function readOptional(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

export async function buildCommandCatalog({ root = defaultRoot } = {}) {
  const skillsDir = join(root, '.agents', 'skills');
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = [];

  for (const entry of entries.filter((item) => item.isDirectory())) {
    const skillPath = join(skillsDir, entry.name, 'SKILL.md');
    const markdown = await readOptional(skillPath);
    if (!markdown) continue;

    const metadata = parseFrontmatter(markdown, skillPath);
    const interfaceYaml = await readOptional(join(skillsDir, entry.name, 'agents', 'openai.yaml'));
    const ui = parseInterface(interfaceYaml);

    skills.push({
      name: metadata.name,
      description: ui.short_description || firstSentence(metadata.description),
      example: ui.default_prompt || null,
    });
  }

  skills.sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'));

  const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const commands = Object.entries(packageJson.scripts || {})
    .sort(([left], [right]) => left.localeCompare(right, 'pt-BR'))
    .map(([name, implementation]) => ({
      name: `npm run ${name}`,
      description: packageJson.commandDescriptions?.[name] || `Executa \`${implementation}\`.`,
    }));

  return { skills, commands };
}

export function formatCommandCatalog({ skills, commands }) {
  const lines = ['# Skills disponíveis neste workspace', ''];

  for (const skill of skills) {
    lines.push(`- \`$${skill.name}\` — ${skill.description}`);
    if (skill.example) lines.push(`  Exemplo: ${skill.example}`);
  }

  lines.push('', '# Comandos do projeto', '');
  if (commands.length === 0) {
    lines.push('Nenhum comando npm disponível.');
  } else {
    for (const command of commands) lines.push(`- \`${command.name}\` — ${command.description}`);
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  const rootArgument = process.argv.indexOf('--root');
  const root = rootArgument >= 0 ? resolve(process.argv[rootArgument + 1]) : defaultRoot;
  process.stdout.write(formatCommandCatalog(await buildCommandCatalog({ root })));
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main().catch((error) => {
  console.error(`Não foi possível listar os comandos: ${error.message}`);
  process.exitCode = 1;
});
