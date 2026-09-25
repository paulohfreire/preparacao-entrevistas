---
name: comandos
description: Lista as skills locais e os comandos npm disponíveis no workspace, com descrições curtas e exemplos de uso. Use quando o usuário invocar $comandos.
---

# Comandos do workspace

Execute, a partir da raiz do repositório:

```bash
node .agents/skills/comandos/scripts/list-commands.mjs
```

Apresente a saída ao usuário sem executar nenhuma das skills ou dos comandos listados. O catálogo deve refletir somente este workspace: não inclua skills pessoais, globais ou disponibilizadas por plugins.

Se o script falhar, informe a causa concreta em vez de reconstruir uma lista manual. Conclua quando cada pasta local que contenha `SKILL.md` estiver representada e os scripts públicos do `package.json` estiverem em uma seção separada.
