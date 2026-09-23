# Interview preparation

[Versão em português brasileiro](README.md)

A personal project for organizing job opportunity assessments, tailored résumés and cover letters, and technical interview preparation with Codex.

The repository separates responsibilities to reduce context loss and prevent one stage from improperly changing another stage's work. Professional data and application materials remain in the local environment; Git tracks only the structure, rules, and reusable workflows.

## How the project works

The work is divided among four roles:

- **Orchestrator:** coordinates requests that involve more than one area of expertise.
- **Technical preparation:** covers interview questions, programming, tools, architecture, and system design.
- **Job analysis and matching:** compares a job opportunity with evidence from the professional profile and recommends whether it should be prioritized.
- **Résumé and documents:** tailors the résumé and cover letter for an application that has already been assessed, without inventing experience or results.

Subagents may support focused tasks that can run in parallel, but they do not replace these permanent roles. Repository files serve as the shared source of facts and results.

## Application workflow

1. Record the professional profile in `perfil/curriculo-base.md`.
2. Provide the complete job description to the analysis specialist.
3. The `analisar-match-vaga` skill creates the application directory, records the job description, and produces `match.md` with requirements, evidence, gaps, and a recommendation.
4. If the application is prioritized, the `adaptar-candidatura` skill uses the job description, assessment, and base résumé to produce:
   - `curriculo/curriculo.md`;
   - `carta/carta.md`.
5. Before a stage, the `preparar-etapa` skill combines requirements, evidence, and lessons from previous stages into a targeted plan and can also run mock interviews.
6. During the selection process, the `atualizar-status-vaga` skill records interviews, challenges, feedback, and status changes in `processo-seletivo.md`, while also maintaining the `candidaturas/status.md` and `candidaturas/status.json` dashboards.
7. Preparation for the next stage can incorporate recorded feedback, creating a continuous practice and improvement loop.

The compatibility assessment must always take place before the documents are tailored.

## Structure

```text
.
|-- .agents/
|   `-- skills/
|       |-- analisar-match-vaga/
|       |-- adaptar-candidatura/
|       |-- atualizar-status-vaga/
|       `-- preparar-etapa/
|-- candidaturas/               # local content and dashboards, ignored by Git
|-- dashboard/                  # local visual tracking front end
|-- scripts/dashboard/          # front-end data generation and validation
|-- perfil/                      # local professional data, ignored by Git
|-- CONTEXT.md                   # domain vocabulary and boundaries
|-- .gitignore
|-- README.en.md
`-- README.md
```

## Local dashboard

To show the visual application tracker, run this command from the repository root:

```powershell
npm run dashboard
```

The command regenerates data from the process histories, starts the local front end, and opens the browser. The dashboard provides summary cards, filters, a table, a timeline, and each application's preparation indicator. Available preparations open in a local reading page. Markdown files remain the source of truth; `candidaturas/status.json` is a projection for the front end.

Each application follows this structure:

```text
candidaturas/<company>-<role>/
|-- vaga.md
|-- match.md
|-- processo-seletivo.md
|-- preparacao/
|   `-- <date>-<category>.md
|-- curriculo/
|   `-- curriculo.md
`-- carta/
    `-- carta.md
```

## Local setup

After cloning the repository:

1. Create `perfil/curriculo-base.md` with verified experience, skills, education, and results.
2. Optionally, save a reference version of the résumé as `perfil/curriculo-referencia.pdf`.
3. When needed, keep supporting information in `perfil/inventario-de-experiencias.md` and job preferences in `perfil/preferencias-de-vagas.md`.
4. Open the repository in Codex and request a job assessment or interview preparation.

Codex discovers the local skills under `.agents/skills/` when a request matches their purpose.

## Privacy and integrity

The `.gitignore` file prevents content under `perfil/` and `candidaturas/` from being tracked, preserving only the `.gitkeep` files. Before publishing any change, run `git status --ignored` and confirm that personal documents remain ignored.

The skills follow these rules:

- use only facts found in the supplied sources;
- never invent skills, job titles, dates, metrics, or results;
- turn missing or ambiguous information into questions;
- treat the base résumé as the canonical, read-only source during tailoring;
- preserve the original job description and link every recommendation to its supporting evidence.

## Skills

### `analisar-match-vaga`

Classifies job requirements, maps them to evidence from the professional profile, estimates compatibility, and records risks, gaps, and a supported recommendation. It does not edit résumés or cover letters.

### `adaptar-candidatura`

Produces a tailored résumé and cover letter after compatibility has been assessed. It may reorganize and improve the wording of the evidence, but it must not exaggerate what actually happened.

### `atualizar-status-vaga`

Records scheduled and completed stages, feedback, next actions, and selection-process status changes. It maintains the application's detailed history and Markdown/JSON dashboards, proposes a 1-to-5 assessment for evaluative stages, and requests confirmation before recording it. It does not modify `vaga.md`, perform the initial compatibility assessment, or create reminders without explicit authorization.

### `preparar-etapa`

Creates persistent, stage-specific preparation by mapping job requirements to verified evidence from the professional profile. It offers quick, standard, and in-depth modes, can run mock interviews, and records assessments by dimension. It reads the process history but leaves status changes to `atualizar-status-vaga`.
