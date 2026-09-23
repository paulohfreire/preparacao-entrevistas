import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../../dashboard/markdown.js';

test('renderiza a estrutura usada pelas preparações', () => {
  const html = renderMarkdown(`# Preparação

**Cobertura:** completa

- Pergunta provável

| Dimensão | Nota |
| --- | ---: |
| Clareza | 4 |
`);

  assert.match(html, /<h1>Preparação<\/h1>/);
  assert.match(html, /<strong>Cobertura:<\/strong> completa/);
  assert.match(html, /<li>Pergunta provável<\/li>/);
  assert.match(html, /<table>/);
});

test('neutraliza HTML fornecido pelo conteúdo Markdown', () => {
  const html = renderMarkdown('<script>alert("x")</script>\n\n<img src=x onerror=alert(1)>');
  assert.doesNotMatch(html, /<script>|<img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;img/);
});
