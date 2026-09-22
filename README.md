# Preparacao para entrevistas

Projeto pessoal para organizar a avaliacao de vagas, a adaptacao de curriculos e cartas e a preparacao tecnica para entrevistas com o Codex.

O repositorio separa responsabilidades para reduzir perda de contexto e evitar que uma etapa altere indevidamente o trabalho de outra. Os dados profissionais e os materiais de candidaturas ficam somente no ambiente local; o Git versiona apenas a estrutura, as regras e os fluxos reutilizaveis.

## Como o projeto funciona

O trabalho e dividido entre quatro papeis:

- **Orquestrador:** coordena pedidos que envolvem mais de uma especialidade.
- **Preparacao tecnica:** trabalha perguntas de entrevista, programacao, ferramentas, arquitetura e system design.
- **Analise e match de vagas:** compara uma vaga com evidencias do perfil profissional e recomenda se ela deve ser priorizada.
- **Curriculo e documentos:** adapta curriculo e carta para uma candidatura ja analisada, sem inventar experiencias ou resultados.

Subagentes podem apoiar tarefas pontuais e paralelizaveis, mas nao substituem esses papeis permanentes. Os arquivos do repositorio funcionam como fonte comum de fatos e resultados.

## Fluxo de uma candidatura

1. Registre o perfil profissional em `perfil/curriculo-base.md`.
2. Forneca a descricao completa da vaga ao especialista de analise.
3. A skill `analisar-match-vaga` cria a pasta da candidatura, registra a vaga e produz `match.md` com requisitos, evidencias, lacunas e recomendacao.
4. Se a candidatura for priorizada, a skill `adaptar-candidatura` usa a vaga, a analise e o curriculo-base para produzir:
   - `curriculo/curriculo.md`;
   - `carta/carta.md`.
5. A preparacao tecnica pode usar os requisitos comprovados da vaga para orientar estudos e simulacoes de entrevista.

A analise de match deve sempre ocorrer antes da adaptacao dos documentos.

## Estrutura

```text
.
|-- .agents/
|   `-- skills/
|       |-- analisar-match-vaga/
|       `-- adaptar-candidatura/
|-- candidaturas/               # conteudo local, ignorado pelo Git
|-- perfil/                      # dados profissionais locais, ignorados pelo Git
|-- CONTEXT.md                   # vocabulario e limites do dominio
|-- .gitignore
`-- README.md
```

Cada candidatura segue esta organizacao:

```text
candidaturas/<empresa>-<cargo>/
|-- vaga.md
|-- match.md
|-- curriculo/
|   `-- curriculo.md
`-- carta/
    `-- carta.md
```

## Configuracao local

Depois de clonar o repositorio:

1. Crie `perfil/curriculo-base.md` com experiencias, competencias, formacao e resultados comprovados.
2. Opcionalmente, salve uma versao de referencia do curriculo como `perfil/curriculo-referencia.pdf`.
3. Mantenha informacoes complementares em `perfil/inventario-de-experiencias.md` e preferencias em `perfil/preferencias-de-vagas.md`, quando necessario.
4. Abra o repositorio no Codex e solicite a analise de uma vaga ou a preparacao para uma entrevista.

As skills locais em `.agents/skills/` sao descobertas pelo Codex conforme o pedido correspondente.

## Privacidade e integridade

O `.gitignore` impede o versionamento do conteudo de `perfil/` e `candidaturas/`, preservando somente os arquivos `.gitkeep`. Antes de publicar qualquer alteracao, confirme com `git status --ignored` que documentos pessoais continuam ignorados.

As skills seguem estas regras:

- usar apenas fatos presentes nas fontes fornecidas;
- nunca inventar competencias, cargos, datas, metricas ou resultados;
- transformar informacoes ausentes ou ambiguas em perguntas;
- manter o curriculo-base como fonte canonica e somente leitura durante a adaptacao;
- preservar a descricao original da vaga e tornar cada recomendacao rastreavel a evidencias.

## Skills

### `analisar-match-vaga`

Classifica requisitos da vaga, associa evidencias do perfil, estima a compatibilidade e registra riscos, lacunas e uma recomendacao fundamentada. Nao edita curriculos nem cartas.

### `adaptar-candidatura`

Produz curriculo e carta direcionados depois que o match foi analisado. Pode reorganizar e melhorar a redacao das evidencias, mas nao ampliar o que realmente aconteceu.
