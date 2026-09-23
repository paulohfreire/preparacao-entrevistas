import { renderMarkdown, escapeHtml } from './markdown.js';

const params = new URLSearchParams(window.location.search);
const path = params.get('path');
const reader = document.querySelector('#reader');
const pathLabel = document.querySelector('#reader-path');

async function loadPreparation() {
  if (!path) throw new Error('Nenhuma preparação foi selecionada.');
  pathLabel.textContent = path;
  const response = await fetch(`/data/preparation?path=${encodeURIComponent(path)}`);
  if (!response.ok) throw new Error(await response.text() || 'Não foi possível carregar a preparação.');
  const markdown = await response.text();
  reader.innerHTML = renderMarkdown(markdown);
  const title = markdown.match(/^#\s+(.+)$/m)?.[1];
  if (title) document.title = title;
}

loadPreparation().catch((error) => {
  reader.innerHTML = `<h1>Preparação indisponível</h1><p>${escapeHtml(error.message)}</p>`;
});
