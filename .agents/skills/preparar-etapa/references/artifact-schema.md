# Esquema da preparação de etapa

Use este esquema ao criar ou atualizar o artefato. Preserve contribuições manuais e registros de simulações anteriores.

## Valores controlados

- **Cobertura:** `limitada` ou `completa`.
- **Alvo:** `provável` ou `confirmado`.
- **Modo:** `rápido`, `padrão` ou `aprofundado`.

## Caminho

Use `candidaturas/<empresa>-<cargo>/preparacao/<AAAA-MM-DD-ou-sem-data>-<categoria>.md`.

Normalize a categoria em letras minúsculas ASCII e hífens. Quando dois artefatos legítimos resultarem no mesmo nome, acrescente um sufixo curto derivado do nome livre da etapa.

## Cabeçalho

```markdown
# Preparação de etapa — <nome da etapa>

**Empresa:** <empresa>
**Vaga:** <cargo>
**Cobertura:** <limitada|completa>
**Alvo:** <provável|confirmado>
**Modo:** <rápido|padrão|aprofundado>
**Idioma das orientações:** <idioma>
**Idioma da entrevista:** <idioma>
**Data da etapa:** <AAAA-MM-DD ou Não definida>
**Última atualização:** <AAAA-MM-DD>
```

Esses campos são obrigatórios e alimentam o dashboard. Uma preparação sem `match.md` usa `Cobertura: limitada`. Uma etapa escolhida pelo usuário antes da confirmação da organização usa `Alvo: provável`.

## Núcleo

Inclua seções para:

1. objetivo e formato esperado da etapa;
2. fontes consultadas e limites;
3. requisitos prioritários;
4. matriz requisito–evidência;
5. perguntas prováveis;
6. estruturas de resposta e versões faladas úteis;
7. lacunas e evidências a confirmar;
8. perguntas para os entrevistadores;
9. plano de estudo;
10. exercícios aplicáveis;
11. checklist;
12. revisões;
13. simulações realizadas.

Adapte a ênfase ao tipo de etapa:

- recrutador: motivação, trajetória, expectativas, disponibilidade e alinhamento;
- técnica: precisão, raciocínio, decisões, testes e experiência prática;
- liderança: impacto, priorização, conflito, autonomia e influência;
- system design: requisitos, restrições, alternativas, falhas, escala e observabilidade;
- mista: combine apenas os critérios que realmente se aplicam.

## Modos

### Rápido

Prioridades, evidências essenciais, perguntas mais prováveis, perguntas ao entrevistador e checklist. Mantenha plano de estudo e exercícios somente quando forem indispensáveis.

### Padrão

Use todo o núcleo em profundidade proporcional ao risco da etapa. Inclua plano de estudo e ofereça entrevista simulada.

### Aprofundado

Use todo o núcleo, exercícios técnicos aplicáveis e ciclos sucessivos de prática. Preserve cada simulação como uma entrada separada.

## Evidências

Associe respostas recomendadas a caminhos e seções das fontes locais. Separe conhecimento técnico externo de evidência profissional. Registre relatos ainda não corroborados assim:

```markdown
> **Evidência a confirmar:** <relato e confirmação necessária>
```

## Revisões

Mantenha as revisões em ordem cronológica:

```markdown
## Revisões

- **<AAAA-MM-DD>:** <mudança e motivo>
```

Uma alteração de data, alvo, cobertura, modo ou conteúdo relevante acrescenta uma revisão. Renomear o arquivo não cria outro artefato para a mesma etapa.
