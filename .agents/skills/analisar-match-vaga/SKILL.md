---
name: analisar-match-vaga
description: Analisa a compatibilidade entre uma vaga e o curriculo-base, produzindo uma avaliacao fundamentada e reutilizavel. Use ao comparar perfil e vaga, decidir se vale candidatar-se ou preparar insumos para adaptar uma candidatura; nao use para editar curriculo ou carta.
---

# Analisar match de vaga

Produza uma analise rastreavel entre a vaga e evidencias reais do perfil profissional.

## Entradas

- Obtenha a descricao integral da vaga, por texto, URL ou arquivo.
- Leia `perfil/curriculo-base.md` como fonte canonica.
- Consulte tambem `C:\Users\paulo\Desktop\CV-Paulo-2026.pdf` como referencia curricular atual e somente leitura.
- Consulte `perfil/inventario-de-experiencias.md` e `perfil/preferencias-de-vagas.md` quando existirem.
- Se faltar a vaga ou o curriculo-base, indique exatamente o insumo ausente e aguarde; nao estime o perfil.

## Candidatura

1. Identifique empresa e cargo a partir da vaga.
2. Use `candidaturas/<empresa>-<cargo>/`. Normalize o nome para minusculas ASCII e hifens.
3. Se a pasta ja existir para outra vaga, acrescente um sufixo curto que a diferencie. Preserve todo conteudo existente.
4. Registre em `vaga.md` o texto recebido, a origem e a data de acesso quando conhecidas.

## Avaliacao

Use esta ponderacao inicial:

| Dimensao | Peso |
| --- | ---: |
| Requisitos tecnicos obrigatorios | 40% |
| Experiencia e senioridade | 20% |
| Dominio ou setor | 15% |
| Formacao e certificacoes | 10% |
| Idioma e localizacao | 10% |
| Diferenciais | 5% |

Adapte os pesos somente quando a vaga demonstrar outra prioridade. Registre os pesos finais e a justificativa. Um requisito eliminatorio sem evidencia deve limitar a recomendacao mesmo quando a nota agregada for alta.

Classifique cada requisito como obrigatorio, desejavel ou contextual. Para cada um, associe uma evidencia concreta do perfil e marque o estado como atendido, parcial, ausente ou desconhecido. Trate desconhecido como pergunta pendente, nunca como evidencia.

## Integridade

Use apenas fatos presentes nas fontes. Reorganize evidencias, mas mantenha cargos, competencias, datas, metricas e resultados fieis ao material. Quando a fonte for ambigua ou incompleta, formule uma pergunta ao usuario.

Compare o PDF e os arquivos Markdown quando ambos cobrirem a mesma informacao. Se houver divergencia, registre a divergencia e solicite confirmacao ao usuario; nao escolha uma versao silenciosamente. O PDF e uma referencia somente leitura e nunca deve ser sobrescrito ou editado por esta skill.

## Saida

Grave `match.md` na pasta da candidatura com:

1. resumo executivo e percentual estimado de compatibilidade;
2. metodologia, pesos e limites da estimativa;
3. matriz requisito-evidencia;
4. requisitos eliminatorios e riscos;
5. lacunas e perguntas pendentes;
6. palavras-chave comprovadas no perfil;
7. recomendacao: candidatar-se, candidatar-se com ressalvas ou nao priorizar;
8. sugestoes para a adaptacao, sem editar os documentos.

Conclua quando toda afirmacao sobre o candidato estiver ligada a uma fonte e cada requisito relevante da vaga estiver classificado.
