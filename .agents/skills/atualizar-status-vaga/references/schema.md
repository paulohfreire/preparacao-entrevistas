# Esquema do acompanhamento

Use este esquema ao criar ou atualizar o histórico de uma candidatura e o painel consolidado. Preserve seções ou observações manuais que não entrem em conflito com os campos controlados.

## Valores controlados

### Status geral

- `planejada`: oportunidade identificada, mas candidatura ainda não iniciada;
- `em andamento`: candidatura enviada ou processo ativo;
- `oferta recebida`: oferta formal recebida e ainda não aceita;
- `aprovada`: oferta aceita ou contratação confirmada;
- `rejeitada`: organização encerrou o processo sem aprovação;
- `desistência`: candidato encerrou sua participação;
- `encerrada sem retorno`: encerramento decidido pelo usuário após ausência de resposta.

Considere `planejada`, `em andamento` e `oferta recebida` como estados ativos no painel. Os demais são encerrados.

### Categoria da etapa

- `candidatura`
- `triagem`
- `entrevista com recrutador`
- `entrevista técnica`
- `desafio técnico`
- `entrevista com liderança`
- `entrevista final`
- `oferta`
- `encerramento`
- `outra`

### Situação da etapa

- `agendada`
- `concluída`
- `cancelada`

## `processo-seletivo.md`

Mantenha um resumo no início e uma linha do tempo em ordem cronológica.

```markdown
# Processo seletivo — <cargo>

**Empresa:** <empresa>
**Status geral:** <valor controlado>
**Etapa atual:** <descrição curta>
**Próxima ação:** <ação ou "Não definida">
**Prazo:** <AAAA-MM-DD, data e hora com fuso, ou "Não definido">
**Última atualização:** <AAAA-MM-DD>

## Linha do tempo

### <AAAA-MM-DD ou data desconhecida> — <nome livre da etapa>

- **Categoria:** <valor controlado>
- **Situação:** <valor controlado>
- **Data e horário:** <valor conhecido, com fuso quando relevante>
- **Resumo factual:** <o que aconteceu ou está agendado>
- **Próxima ação:** <ação, responsável e prazo quando conhecidos>

#### Participantes

<nomes e funções fornecidos pelo usuário>

#### Perguntas e respostas

<perguntas e sínteses ou citações relevantes>

#### Feedback externo

<feedback atribuído à organização ou aos entrevistadores>

#### Percepção pessoal e aprendizados

<avaliação do candidato, sinais percebidos e melhoria para a próxima etapa>

#### Avaliação confirmada

**Nota:** <1–5>
**Justificativa:** <evidências que sustentam a nota>

#### Revisão

**Atualizada em:** <AAAA-MM-DD>
**Alteração:** <resumo da correção>
```

O cabeçalho e os seis campos iniciais de cada etapa formam o núcleo. Inclua subseções somente quando houver conteúdo. Em etapas sem data conhecida, use `Data desconhecida`; não estime datas.

`Etapa atual` descreve a posição presente com o vocabulário da empresa quando disponível, por exemplo `Aguardando entrevista técnica com a equipe de plataforma`.

## `candidaturas/status.md`

```markdown
# Status das candidaturas

**Última atualização:** <AAAA-MM-DD>

| Empresa | Vaga | Status geral | Etapa atual | Próxima ação ou prazo | Atualizada em |
| --- | --- | --- | --- | --- | --- |
| <empresa> | <cargo> | <status> | <etapa> | <ação e prazo> | <AAAA-MM-DD> |
```

Mantenha exatamente uma linha por candidatura. Use o nome da empresa e da vaga registrados no histórico detalhado. Posicione primeiro estados ativos, depois encerrados; dentro de cada grupo, ordene pela data de atualização decrescente.

Quando um valor resumido mudar, atualize o histórico detalhado e a linha do painel juntos. Se um dos arquivos estiver inconsistente, trate `processo-seletivo.md` como fonte do detalhe e confirme fatos ambíguos com o usuário antes de reconciliar.

## Projeção estruturada para o dashboard

Quando existir `candidaturas/status.json`, ele é uma projeção gerada para o componente visual. Os Markdown continuam sendo as fontes de verdade: `processo-seletivo.md` contém o histórico detalhado e `status.md` contém o resumo humano consolidado.

O JSON deve conter `schemaVersion`, `atualizadoEm` e `candidaturas`. Cada candidatura pode conter `empresa`, `cargo`, `status`, `etapa`, `proximaAcao`, `prazo`, `ultimaAtualizacao`, `pasta` e, quando o gerador estiver implementado, `etapas`. A projeção deve preservar datas desconhecidas e prazos indefinidos como `null` ou o marcador definido pelo gerador, sem estimá-los.

A ordenação das candidaturas deve seguir o painel: estados ativos primeiro e, dentro de cada grupo, atualização mais recente primeiro. As etapas devem permanecer em ordem cronológica. Valores controlados inválidos, candidatura ausente no histórico, divergência não resolvida entre os Markdown ou campos inventados devem interromper a geração com uma mensagem acionável.

Após cada atualização de processo, regenere e valide a projeção com `npm run dashboard:data` quando o comando existir. O front deve consumir o JSON e não editar os arquivos de candidatura. Até que o gerador seja implementado, qualquer manutenção manual temporária do JSON deve copiar somente valores confirmados nos Markdown e ser comunicada como limitação.
