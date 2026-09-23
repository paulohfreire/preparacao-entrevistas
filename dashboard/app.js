const state = { data: null, selected: null };
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const activeStatuses = new Set(['planejada', 'em andamento', 'oferta recebida']);

function badge(value) {
  return `<span class="badge badge-${value.replaceAll(' ', '-').replaceAll('ã', 'a')}">${escapeHtml(value)}</span>`;
}

function filtered() {
  const query = $('#search').value.trim().toLowerCase();
  const status = $('#status').value;
  const stage = $('#stage').value;
  return state.data.candidaturas.filter((item) => {
    const matchesQuery = !query || `${item.empresa} ${item.cargo}`.toLowerCase().includes(query);
    return matchesQuery && (!status || item.status === status) && (!stage || item.etapas.some((step) => step.categoria === stage));
  });
}

function renderCards() {
  const all = state.data.candidaturas;
  const cards = [
    ['Total', all.length],
    ['Ativas', all.filter((item) => activeStatuses.has(item.status)).length],
    ['Entrevistas concluídas', all.filter((item) => item.etapas.some((step) => step.categoria === 'entrevista com recrutador' && step.situacao === 'concluída')).length],
    ['Aguardando retorno', all.filter((item) => /aguardar|feedback/i.test(item.proximaAcao || '')).length]
  ];
  $('#cards').innerHTML = cards.map(([label, value]) => `<article class="card"><span class="muted">${label}</span><strong>${value}</strong></article>`).join('');
}

function renderFilters() {
  const statuses = [...new Set(state.data.candidaturas.map((item) => item.status))].sort();
  const stages = [...new Set(state.data.candidaturas.flatMap((item) => item.etapas.map((step) => step.categoria)))].sort();
  $('#status').innerHTML = '<option value="">Todos</option>' + statuses.map((item) => `<option>${escapeHtml(item)}</option>`).join('');
  $('#stage').innerHTML = '<option value="">Todas</option>' + stages.map((item) => `<option>${escapeHtml(item)}</option>`).join('');
}

function renderDetails(item) {
  if (!item) { $('#details').className = 'details empty'; $('#details').innerHTML = '<p>Selecione uma candidatura para ver a linha do tempo.</p>'; return; }
  $('#details').className = 'details';
  $('#details').innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(item.empresa)}</p><h2>${escapeHtml(item.cargo)}</h2></div>${badge(item.status)}</div><p><strong>Próxima ação:</strong> ${escapeHtml(item.proximaAcao || 'Não definida')}</p><div class="timeline">${item.etapas.map((step) => `<article class="timeline-item"><div class="timeline-dot"></div><div><p class="timeline-date">${escapeHtml(step.dataHorario || step.data)}</p><h3>${escapeHtml(step.nome)}</h3><p>${badge(step.situacao)} ${escapeHtml(step.resumo || '')}</p><p class="muted"><strong>Próxima ação:</strong> ${escapeHtml(step.proximaAcao || 'Não definida')}</p></div></article>`).join('')}</div>`;
}

function renderRows() {
  const items = filtered();
  $('#count').textContent = `${items.length} processo${items.length === 1 ? '' : 's'}`;
  $('#rows').innerHTML = items.length ? items.map((item) => `<tr data-folder="${escapeHtml(item.pasta)}" class="${state.selected === item.pasta ? 'selected' : ''}"><td><strong>${escapeHtml(item.empresa)}</strong></td><td>${escapeHtml(item.cargo)}</td><td>${badge(item.status)}</td><td>${escapeHtml(item.etapa)}</td><td>${escapeHtml(item.proximaAcao || 'Não definida')}</td><td>${escapeHtml(item.ultimaAtualizacao || '—')}</td></tr>`).join('') : '<tr><td colspan="6" class="empty-cell">Nenhuma candidatura encontrada.</td></tr>';
  document.querySelectorAll('tr[data-folder]').forEach((row) => row.addEventListener('click', () => { state.selected = row.dataset.folder; renderRows(); renderDetails(state.data.candidaturas.find((item) => item.pasta === state.selected)); }));
}

async function load() {
  const response = await fetch(`/data/status.json?ts=${Date.now()}`);
  if (!response.ok) throw new Error('Não foi possível carregar os dados.');
  state.data = await response.json();
  renderCards(); renderFilters(); renderRows(); renderDetails(state.data.candidaturas.find((item) => item.pasta === state.selected));
  $('#updated').textContent = `Dados atualizados em ${state.data.atualizadoEm || 'data desconhecida'}.`;
}

$('#search').addEventListener('input', renderRows);
$('#status').addEventListener('change', renderRows);
$('#stage').addEventListener('change', renderRows);
$('#clear').addEventListener('click', () => { $('#search').value = ''; $('#status').value = ''; $('#stage').value = ''; renderRows(); });
$('#refresh').addEventListener('click', async () => { $('#refresh').disabled = true; try { await load(); } finally { $('#refresh').disabled = false; } });
load().catch((error) => { $('#rows').innerHTML = `<tr><td colspan="6" class="empty-cell">${escapeHtml(error.message)}</td></tr>`; });
