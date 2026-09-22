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
5. Durante o processo seletivo, a skill `atualizar-status-vaga` registra entrevistas, desafios, feedbacks e mudanças de status em `processo-seletivo.md`, além de manter o painel `candidaturas/status.md`.
6. A preparação técnica pode usar os requisitos comprovados da vaga e os aprendizados das etapas anteriores para orientar estudos e simulações de entrevista.

A análise de compatibilidade deve sempre ocorrer antes da adaptação dos documentos.

## Estrutura

```text
.
|-- .agents/
|   `-- skills/
|       |-- analisar-match-vaga/
|       |-- adaptar-candidatura/
|       `-- atualizar-status-vaga/
|-- candidaturas/               # conteúdo e painel locais, ignorados pelo Git
|-- perfil/                      # dados profissionais locais, ignorados pelo Git
|-- CONTEXT.md                   # vocabulário e limites do domínio
|-- .gitignore
|-- README.en.md
`-- README.md
```

Cada candidatura segue esta organização:

```text
candidaturas/<empresa>-<cargo>/
|-- vaga.md
|-- match.md
|-- processo-seletivo.md
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

Registra etapas agendadas e concluídas, feedbacks, próximas ações e mudanças no processo seletivo. Mantém o histórico detalhado da candidatura e um painel consolidado, propõe uma avaliação de 1 a 5 para etapas avaliativas e solicita confirmação antes de registrá-la. Não altera `vaga.md`, não realiza a análise inicial de compatibilidade e não cria lembretes sem autorização explícita.
