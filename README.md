# context-directory-opinions-skill

`context-directory-opinions` gives a project a living `Context/` directory for durable plans, research, decisions, state, opinions, and shared memory.

Markdown is the default for agent-facing and mixed-use knowledge. HTML is reserved for intentionally human-facing visual or interactive surfaces. Meaningful subdirectories are encouraged as a topic grows, and historical non-guidance lives under `Context/Archive/` outside the active index.

Every active Markdown and HTML file carries frontmatter with a selection description. `Context/AGENTS.md` provides a compact generated index, while `Temp-Context/` is optional staging that is drained and removed.

## Files

- `SKILL.md` contains the Context directory contract.
- `scripts/index.mjs` regenerates the active index, validates active frontmatter, and warns when a directory or a document has outgrown itself.
- `package.json` exposes the generator as a `bin`, so it runs from the repository without being installed.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Running the generator

With the skill on disk, as a submodule or in a global skills folder:

```bash
node <skill-root>/scripts/index.mjs <path-to-Context>
```

Without it on disk, straight from this repository:

```bash
npx --yes github:LeeorNahum/context-directory-opinions-skill <path-to-Context>
```

Both routes run the same script and need only Node. The remote route fetches from GitHub the first time on a machine. Do not vendor a copy into a project: copies drift, and this route exists so nothing has to be.

## Validation

```bash
node --check scripts/index.mjs
node scripts/index.mjs --help
```

## Install

```bash
git submodule add https://github.com/LeeorNahum/context-directory-opinions-skill.git .agents/skills/context-directory-opinions
```
