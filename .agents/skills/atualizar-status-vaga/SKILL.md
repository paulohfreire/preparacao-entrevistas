---
name: atualizar-status-vaga
description: Registra, revisa e atualiza etapas e status de processos seletivos, mantendo o histórico da candidatura e o painel consolidado. Use quando o usuário pedir explicitamente para registrar, revisar ou atualizar uma entrevista, desafio, feedback, oferta, rejeição, desistência ou próxima etapa; não use para analisar o match inicial, preparar entrevistas ou adaptar documentos.
---

# Atualizar status da vaga

Mantenha um acompanhamento factual do processo seletivo sem misturar a descrição original da vaga, a análise de compatibilidade ou os documentos adaptados.

## Autorização

Altere arquivos somente quando o usuário pedir explicitamente para registrar, revisar ou atualizar o processo. Uma menção informativa a entrevista, feedback ou mudança de etapa permite conversar sobre o assunto, mas não autoriza persistência.

## Localizar a candidatura

1. Procure a empresa e o cargo nas pastas sob `candidaturas/` e confira `vaga.md` quando necessário.
2. Use diretamente uma correspondência única e inequívoca.
3. Quando houver mais de uma candidata possível, apresente as correspondências e solicite a escolha.
4. Quando a candidatura não existir, pergunte se o usuário prefere criar um registro mínimo ou realizar primeiro a análise de compatibilidade. Aguarde a decisão.
5. Se o usuário escolher a análise, encaminhe para `$analisar-match-vaga`. Se escolher o registro mínimo, obtenha empresa e cargo antes de criar `candidaturas/<empresa>-<cargo>/`.

Normalize novas pastas em letras minúsculas ASCII separadas por hífens. Preserve todo conteúdo existente.

## Preparar a atualização

Antes de escrever, leia [references/schema.md](references/schema.md) por inteiro e leia os arquivos atuais da candidatura e `candidaturas/status.md`, quando existirem. Quando `candidaturas/status.json` existir, leia-o também para verificar a projeção estruturada usada pelo dashboard. Trate-o como saída derivada dos registros Markdown, não como fonte independente de fatos.

Extraia do relato somente fatos fornecidos. Toda etapa precisa de categoria, nome, situação, data quando conhecida, resumo factual e próxima ação quando existente. Registre participantes, formato, perguntas, respostas, feedback, percepção pessoal, aprendizados e prazos apenas quando forem aplicáveis.

Mantenha feedback externo separado da percepção do candidato. Preserve perguntas, respostas e feedback no idioma original quando isso conservar informação; redija o restante no idioma usado pelo usuário.

Uma etapa agendada entra como `agendada`. Quando ela acontecer, atualize a mesma entrada para `concluída`. Use a combinação de data, categoria e nome para localizar a entrada; peça confirmação se houver colisão ou dúvida.

## Avaliar uma etapa

Ofereça uma nota somente para entrevista, apresentação ou desafio concluído:

- `1` — desempenho claramente insatisfatório;
- `2` — desempenho abaixo do esperado;
- `3` — desempenho adequado, com pontos relevantes de dúvida;
- `4` — desempenho forte, com pequenas oportunidades de melhoria;
- `5` — desempenho excelente e consistente.

Fundamente a proposta em evidências do relato e identifique-a como percepção de desempenho, não como probabilidade de aprovação. Peça mais informações quando não houver base suficiente. Solicite confirmação antes de gravar uma nota proposta; uma nota já fornecida explicitamente pelo usuário conta como confirmada.

## Atualizar o status

Use somente os estados gerais definidos no esquema. Aplique diretamente transições inequívocas:

- oferta formal recebida → `oferta recebida`;
- aceite da oferta ou contratação confirmada → `aprovada`;
- rejeição comunicada pela organização → `rejeitada`;
- retirada declarada pelo candidato → `desistência`.

Solicite confirmação quando o relato admitir mais de um estado. Ausência de resposta mantém o estado atual; use `encerrada sem retorno` somente por decisão explícita do usuário.

## Persistir

Mantenha `vaga.md` inalterado. Ao criar o primeiro `processo-seletivo.md`, copie dele apenas fatos identificáveis sobre etapas ou datas e não derive avaliações retroativas.

Atualize na mesma operação:

- `candidaturas/<empresa>-<cargo>/processo-seletivo.md`, fonte detalhada do andamento;
- `candidaturas/status.md`, painel resumido de todas as candidaturas.

Se `candidaturas/status.json` existir, regenere a projeção estruturada após atualizar os Markdown. Use `npm run dashboard:data` quando esse comando estiver disponível. Se o gerador ainda não existir, mantenha o JSON alinhado aos campos resumidos confirmados nos Markdown e comunique essa limitação ao usuário.

Preserve contribuições manuais. Em uma correção, edite a entrada correspondente, atualize sua data de revisão e registre um resumo curto do que mudou. Ordene as etapas da mais antiga para a mais recente. No painel, mostre primeiro candidaturas ativas e ordene cada grupo pela atualização mais recente.

## Concluir

Confirme que o histórico e o painel apresentam o mesmo status, etapa atual, próxima ação e data de atualização; que todos os valores controlados pertencem ao esquema; e que nenhuma informação foi adicionada a `vaga.md`. Quando o dashboard estiver configurado, confirme também que `status.json` foi regenerado/validado e contém a candidatura atualizada.

Resuma ao usuário os arquivos e campos alterados. Quando houver uma próxima ação com data, sugira criar um lembrete, mas solicite autorização explícita antes de criar qualquer automação.
