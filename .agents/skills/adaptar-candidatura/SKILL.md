---
name: adaptar-candidatura
description: Adapta curriculo e carta em Markdown para uma candidatura ja analisada, preservando a veracidade e o documento-base. Use ao personalizar documentos para uma vaga; nao use para calcular o match inicial da vaga.
---

# Adaptar candidatura

Crie documentos direcionados a uma vaga sem alterar a historia profissional do candidato.

## Entradas

- Localize a pasta da candidatura em `candidaturas/<empresa>-<cargo>/`.
- Leia `vaga.md`, `match.md` e `perfil/curriculo-base.md` por inteiro.
- Consulte tambem `perfil/curriculo-referencia.pdf`, quando existir, como referencia curricular atual e somente leitura.
- Consulte `perfil/inventario-de-experiencias.md` quando existir.
- Se `match.md` estiver ausente, encaminhe a analise ao especialista de vagas ou invoque `$analisar-match-vaga` quando estiver autorizado a executar as duas etapas.
- Se faltar evidencia necessaria, apresente perguntas objetivas e aguarde antes de afirmar o fato.

## Adaptacao

1. Selecione e ordene experiencias conforme os requisitos comprovadamente relevantes.
2. Reescreva resumos e bullets para clareza, concisao e correspondencia semantica com a vaga.
3. Preserve cargos, empregadores, datas, competencias, metricas e resultados das fontes.
4. Use palavras-chave da vaga apenas quando sustentadas pelo perfil.
5. Mantenha o idioma solicitado pelo usuario ou, na ausencia de instrucao, o idioma predominante da vaga.
6. Produza uma carta especifica para empresa e cargo, conectando motivacao e evidencias sem elogios genericos.

## Arquivos

- Grave o curriculo adaptado em `curriculo/curriculo.md` dentro da candidatura.
- Grave a carta em `carta/carta.md` dentro da candidatura.
- Preserve arquivos existentes que nao fazem parte do pedido.
- Trate `perfil/curriculo-base.md` como canonico: leia-o, mas nunca o sobrescreva neste fluxo.
- Antes de substituir um documento adaptado existente, leia a versao atual e preserve contribuicoes ainda validas. Resuma as mudancas ao final.

## Integridade

Trabalhe somente com evidencias presentes no curriculo-base, no inventario de experiencias ou em respostas explicitas do usuario. Converta qualquer lacuna em pergunta pendente. Uma redacao mais forte deve tornar a evidencia mais clara, nao ampliar o que aconteceu.

Compare o PDF e os arquivos Markdown quando ambos cobrirem a mesma informacao. Se houver divergencia, registre a divergencia e solicite confirmacao ao usuario antes de adaptar o documento. O PDF e uma referencia somente leitura e nunca deve ser sobrescrito ou editado por esta skill.

Conclua quando cada afirmacao verificavel dos documentos estiver apoiada pelas fontes, os requisitos prioritarios comprovados estiverem visiveis e os dois arquivos estiverem salvos nos caminhos da candidatura.
