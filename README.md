# Preparação para entrevistas

[English version](README.en.md)

Projeto pessoal para organizar a avaliação de vagas, a adaptação de currículos e cartas de apresentação e a preparação técnica para entrevistas com o Codex.

O repositório separa responsabilidades para reduzir a perda de contexto e evitar que uma etapa altere indevidamente o trabalho de outra. Os dados profissionais e os materiais das candidaturas permanecem apenas no ambiente local; o Git versiona somente a estrutura, as regras e os fluxos reutilizáveis.

## Como o projeto funciona

O trabalho é dividido entre quatro papéis:

- **Orquestrador:** coordena solicitações que envolvem mais de uma especialidade.
- **Preparação técnica:** aborda perguntas de entrevista, programação, ferramentas, arquitetura e projeto de sistemas (*system design*).
- **Análise e compatibilidade de vagas:** compara uma vaga com evidências do perfil profissional e recomenda se ela deve ser priorizada.
- **Currículo e documentos:** adapta o currículo e a carta de apresentação para uma candidatura já analisada, sem inventar experiências ou resultados.

Subagentes podem apoiar tarefas pontuais e paralelizáveis, mas não substituem esses papéis permanentes. Os arquivos do repositório funcionam como fonte compartilhada de fatos e resultados.

## Fluxo de uma candidatura

1. Registre o perfil profissional em `perfil/curriculo-base.md`.
2. Forneça a descrição completa da vaga ao especialista em análise.
3. A skill `analisar-match-vaga` cria a pasta da candidatura, registra a vaga e produz o arquivo `match.md` com requisitos, evidências, lacunas e uma recomendação.
4. Se a candidatura for priorizada, a skill `adaptar-candidatura` usa a vaga, a análise e o currículo-base para produzir:
   - `curriculo/curriculo.md`;
   - `carta/carta.md`.
5. Antes de uma etapa, a skill `preparar-etapa` combina requisitos, evidências e aprendizados anteriores em um plano direcionado, podendo também conduzir entrevistas simuladas.
6. Durante o processo seletivo, a skill `atualizar-status-vaga` registra entrevistas, desafios, feedbacks e mudanças de status em `processo-seletivo.md`, além de manter os painéis `candidaturas/status.md` e `candidaturas/status.json`.
7. A preparação da etapa seguinte pode incorporar o feedback registrado, formando um ciclo contínuo de prática e melhoria.

A análise de compatibilidade deve sempre ocorrer antes da adaptação dos documentos.

## Estrutura

```text
.
|-- .agents/
|   `-- skills/
|       |-- analisar-match-vaga/
|       |-- adaptar-candidatura/
|       |-- atualizar-status-vaga/
|       `-- preparar-etapa/
|-- candidaturas/               # conteúdo e painéis locais, ignorados pelo Git
|-- dashboard/                  # front local do acompanhamento visual
|-- scripts/dashboard/          # geração e validação dos dados do front
|-- perfil/                      # dados profissionais locais, ignorados pelo Git
|-- CONTEXT.md                   # vocabulário e limites do domínio
|-- .gitignore
|-- README.en.md
`-- README.md
```

## Dashboard local

Para mostrar o acompanhamento visual das candidaturas, execute na raiz do projeto:

```powershell
npm run dashboard
```

O comando regenera os dados a partir dos históricos em `candidaturas/`, inicia o front local e abre o navegador. O dashboard apresenta cards de resumo, filtros, tabela, linha do tempo e o indicador de preparação de cada candidatura. Preparações disponíveis podem ser abertas em uma página local de leitura. Os arquivos Markdown continuam sendo a fonte de verdade; `candidaturas/status.json` é uma projeção para o front.

Cada candidatura segue esta organização:

```text
candidaturas/<empresa>-<cargo>/
|-- vaga.md
|-- match.md
|-- processo-seletivo.md
|-- preparacao/
|   `-- <data>-<categoria>.md
|-- curriculo/
|   `-- curriculo.md
`-- carta/
    `-- carta.md
```

## Configuração local

Depois de clonar o repositório:

1. Crie `perfil/curriculo-base.md` com experiências, competências, formação e resultados comprovados.
2. Opcionalmente, salve uma versão de referência do currículo como `perfil/curriculo-referencia.pdf`.
3. Quando necessário, mantenha informações complementares em `perfil/inventario-de-experiencias.md` e preferências em `perfil/preferencias-de-vagas.md`.
4. Abra o repositório no Codex e solicite a análise de uma vaga ou a preparação para uma entrevista.

As skills locais em `.agents/skills/` são descobertas pelo Codex de acordo com a solicitação correspondente.

## Privacidade e integridade

O `.gitignore` impede o versionamento do conteúdo de `perfil/` e `candidaturas/`, preservando somente os arquivos `.gitkeep`. Antes de publicar qualquer alteração, execute `git status --ignored` e confirme que os documentos pessoais continuam ignorados.

As skills seguem estas regras:

- usar apenas fatos presentes nas fontes fornecidas;
- nunca inventar competências, cargos, datas, métricas ou resultados;
- transformar informações ausentes ou ambíguas em perguntas;
- manter o currículo-base como fonte canônica e somente para leitura durante a adaptação;
- preservar a descrição original da vaga e vincular cada recomendação às respectivas evidências.

## Skills

### `analisar-match-vaga`

Classifica os requisitos da vaga, associa evidências do perfil, estima a compatibilidade e registra riscos, lacunas e uma recomendação fundamentada. Não edita currículos nem cartas de apresentação.

### `adaptar-candidatura`

Produz um currículo e uma carta de apresentação direcionados depois que a compatibilidade é analisada. Pode reorganizar e aprimorar a redação das evidências, mas não ampliar o que realmente aconteceu.

### `atualizar-status-vaga`

Registra etapas agendadas e concluídas, feedbacks, próximas ações e mudanças no processo seletivo. Mantém o histórico detalhado da candidatura e os painéis Markdown/JSON, propõe uma avaliação de 1 a 5 para etapas avaliativas e solicita confirmação antes de registrá-la. Não altera `vaga.md`, não realiza a análise inicial de compatibilidade e não cria lembretes sem autorização explícita.

### `preparar-etapa`

Cria uma preparação persistente e específica para uma etapa, relacionando requisitos da vaga a evidências reais do perfil. Oferece modos rápido, padrão e aprofundado, pode conduzir entrevistas simuladas e registra avaliações por dimensão. Lê o histórico do processo, mas deixa qualquer alteração de status para `atualizar-status-vaga`.
