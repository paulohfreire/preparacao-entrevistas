---
name: preparar-etapa
description: Prepara uma etapa de entrevista para uma candidatura e conduz simulações opcionais com avaliação estruturada. Use quando o usuário pedir preparação, perguntas prováveis, prática ou entrevista simulada para uma vaga; não use para analisar o match inicial, alterar documentos de candidatura ou atualizar o status do processo seletivo.
---

# Preparar etapa

Produza uma preparação persistente, específica para a etapa e sustentada pelas evidências reais do perfil profissional.

## Autorização e candidatura

Um pedido explícito para preparar ou simular uma etapa autoriza criar ou atualizar o artefato correspondente. Conversas genéricas sobre entrevistas não autorizam escrita.

Localize uma correspondência inequívoca sob `candidaturas/` usando empresa, cargo e `vaga.md`. Apresente opções quando houver ambiguidade. Quando a candidatura não existir, pergunte se o usuário deseja criá-la ou realizar primeiro `$analisar-match-vaga`.

## Reunir contexto

Leia por inteiro:

- `vaga.md`;
- `perfil/curriculo-base.md`;
- `match.md`, quando existir;
- `processo-seletivo.md`, quando existir;
- `perfil/inventario-de-experiencias.md`, quando existir;
- a preparação existente para a mesma etapa, quando existir.

Quando `match.md` estiver ausente, ofereça executar `$analisar-match-vaga` ou continuar com **Cobertura limitada**. Aguarde a escolha. Uma preparação limitada deve explicitar fontes ausentes e perguntas ainda não respondidas.

Use a próxima etapa confirmada no histórico. Se ela não existir, peça ao usuário que escolha uma **Etapa provável** e identifique-a como hipótese no artefato. Leia o histórico somente para contexto; encaminhe alterações de andamento para `$atualizar-status-vaga`.

Pergunte pelo modo `rápido`, `padrão` ou `aprofundado` quando o usuário não o informar; use `padrão` se ele não tiver preferência. Confirme o idioma previsto para a entrevista quando não estiver evidente. Orientações podem seguir o idioma preferido pelo usuário, enquanto perguntas e respostas de prática seguem o idioma da entrevista.

## Construir a preparação

Antes de escrever, leia [references/artifact-schema.md](references/artifact-schema.md). Relacione requisitos prioritários a evidências canônicas. Para cada resposta, ofereça uma estrutura factual curta e, quando útil, uma versão falada natural.

Trate experiência ou resultado mencionado somente durante esta preparação como **Evidência a confirmar**. Mantenha-o fora das respostas recomendadas até confirmação explícita e não altere o currículo-base, o inventário, o match ou documentos adaptados.

Consulte fontes oficiais quando uma questão técnica depender de versão, API ou comportamento atual. Cite as fontes no artefato; conhecimento externo informa a preparação, mas não comprova experiência profissional.

Crie ou atualize `candidaturas/<empresa>-<cargo>/preparacao/<data-ou-sem-data>-<categoria>.md`. Use letras minúsculas ASCII e hífens no nome. Uma mudança de data renomeia o arquivo e registra a revisão. Novas informações enriquecem o mesmo arquivo; preserve simulações anteriores. Quando `match.md` surgir, atualize uma cobertura limitada para completa no mesmo artefato.

## Simular

Quando o usuário solicitar uma entrevista simulada, leia [references/simulation.md](references/simulation.md). Use a preparação existente ou crie uma antes. Faça uma pergunta por vez, adapte acompanhamentos e concentre o feedback no final. Acrescente ao arquivo apenas a síntese definida no protocolo, nunca a transcrição completa.

## Atualizar o dashboard

Após criar, renomear ou atualizar uma preparação, execute `npm run dashboard:data` quando disponível. `candidaturas/status.json` é uma projeção; o Markdown da etapa permanece como fonte de verdade. Verifique que o dashboard apresenta `Cobertura limitada` ou `Cobertura completa` e um caminho válido para leitura.

## Concluir

Conclua quando cada afirmação sobre o candidato estiver ligada a uma fonte canônica ou marcada como evidência a confirmar; o alvo, a cobertura, o modo, os idiomas e a data de revisão estiverem explícitos; e o dashboard estiver regenerado quando configurado.

Resuma o arquivo criado ou atualizado, as lacunas importantes e o próximo foco de prática. Não altere o andamento da candidatura neste fluxo.
