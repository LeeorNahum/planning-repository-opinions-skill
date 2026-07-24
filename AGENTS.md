# AGENTS.md

Rules for editing the **context-directory-opinions** skill. User-facing guidance lives in `SKILL.md`. `README.md` is the human skim layer.

## File roles

| File | Role |
| --- | --- |
| `SKILL.md` | Context ownership, organization, markup choice, frontmatter, indexing, Archive, and Temp-Context |
| `scripts/index.mjs` | Regenerates the compact active index and validates active frontmatter |
| `README.md` | Short human summary |
| `AGENTS.md` | This maintenance contract |

## Editing

- Bump `metadata.version` with semver whenever accepted behavior changes.
- Quote frontmatter string values and keep bullets capitalized and parallel.
- Use no em dashes and no prose-joining semicolons.
- Keep the skill opinionated without repeating one point in several sections.
- Judge guidance from the reader's real task, audience, and scale.
- Keep Markdown as the agent-facing default and HTML as an intentional human surface.
- Encourage meaningful subdirectories before a topic becomes a flat file pile.
- Keep project knowledge in topical Context and cross-task agent behavior in the applicable `AGENTS.md`.
- Keep the generator zero-dependency, compact, deterministic, and idempotent.
- Preserve the managed block guards and authored content outside them.
- Prefer editorial warnings over new hard gates.

## Before finishing

- `SKILL.md` and `README.md` describe the same behavior.
- The version changed if and only if accepted behavior changed.
- Script syntax, help, scratch generation, Archive exclusion, and two-pass idempotency pass.
- The index uses one flat line per active document with its directory and description, and contains no individual assets.
- Directory-density guidance supports useful depth without creating empty hierarchy.
- No repeated Archive or Temp-Context explanation bloats the skill.
- No em dashes or prose-joining semicolons were introduced.
