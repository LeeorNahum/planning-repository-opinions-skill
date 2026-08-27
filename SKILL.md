---
name: "context-directory-opinions"
description: "Opinionated structure for a Context directory: the durable home for a project's plans, research, notes, schedules, program info, and shared memory as markup. Use when creating, saving, organizing, or reorganizing any durable documentation or planning material, when the user says to save, note, remember, capture, or document project material for later (even vaguely), never for personal reminders or in-chat preferences, when adding plans, meeting notes, research, or reference material to a repository, when reading or maintaining an existing Context directory and its index, whenever adding to a document in one, because that is when a document is checked for whether it still has one owner, or whenever a Temp-Context directory exists and needs draining into Context. Also use whenever a harness offers its own memory, recall, or auto-save store for project knowledge, because a Context directory supersedes it. Applies only where a Context directory already exists or the user or the project's instructions call for one. Not for code documentation, READMEs, or comments that live with the source."
metadata:
  author: "Leeor Nahum"
  version: "2.7.0"
---

# Context Directory Opinions

`Context/` is the durable home for what a project knows that is not code: plans, research, decisions, rationale, status, schedules, references, and shared memory. It is project knowledge, not a second instruction hierarchy.

Topical documents state facts, opinions, constraints, decisions, and plans directly. Rules that govern how an agent works across tasks belong in the nearest applicable `AGENTS.md`. A plan, checklist, decision, or runbook may still contain instructions when those instructions are the subject of the document.

## Where This Skill Applies

This skill governs a project when a `Context/` directory in this format already exists there, when the user asks for one, or when the project's instructions call for one, whatever file carries them. Being installed is not one of those signals: availability in a catalog, a global skills folder, or a remote library does not make the skill apply, and a project with none of these signals keeps whatever it already uses.

## Precedence Over Built-In Memory

Where this skill applies, `Context/` is the durable store for project knowledge and it supersedes any memory feature the harness provides: an auto-saved memory file, a per-project memory directory, a recall store, or a default "remember this" mechanism. Do not write project knowledge into those. When a harness memory store already holds some, migrate each fact into its owning Context document and leave the harness store empty.

Two stores holding the same facts drift apart, and the drift is silent because nothing forces them to disagree out loud. `Context/` is also versioned alongside the code, reviewable in a diff, and portable: it travels with a clone, a rename, or a move, while harness memory is usually keyed to a machine, an account, or an absolute path, and is lost or silently orphaned when any of those change.

This governs durable project knowledge only. A harness memory that carries personal user preferences across unrelated projects is a different thing and is out of scope; that material does not belong in `Context/` either.

## Core Structure

- `Context/` lives at the root of the project it describes unless the user or the project's instructions name another place, such as a subfolder or a parent folder. A parent workspace's Context describes the workspace, not the projects inside it, and the two never share an index.
- Additional Context directories inside one project exist only where the user or the project's instructions declare them, such as one per subtree that acts as its own agent. Each is indexed on its own. The skill owns only Context directories, never the rest of the tree.
- `Context/AGENTS.md` contains the generated active index and may carry a few Context-specific structural rules outside the generated guards.
- Organize by the project's real subjects. Rename, split, merge, move, and retire material when ownership or reading needs change.
- Three or four levels of meaningful subdirectories are healthy. Avoid keeping files together merely because the first folder layout already exists.
- Root-level files are reserved for project-wide owners such as current status or a master plan.
- One current fact has one owner. Other documents link to it.

## Directory Density

Aim for roughly 4 to 12 active markup files in a directory. More than 12 triggers an organization review. More than 20 means the directory needs clearer subtopics unless it is an intentional chronological or generated collection.

File count is the cost that is always paid. Every active file puts its description in the generated index, and that index is loaded whenever an agent works in the directory, whether or not any document is opened. A document's own length is paid only by a reader who opens it, and a reader opens it because they need it, so length is not what this rule is defending against.

## Chronological Logs

A record that only ever gains entries grows without end by design. It stays useful only if the active document holds the entries a reader would reach for and the rest move out by period.

- Keep the entries a reader would actually reach for in the active document, and move older ones into `Archive/` split by period, named for the period they cover.
- Do it when entries have accumulated that nobody would reach for, not on a fixed schedule and not at a particular length.
- Leave a line in the active document saying where the earlier entries went.
- Never summarize an entry away during this move. It is a relocation, not a rewrite: archived history is cheap to keep and is the raw material for noticing patterns later.

The active document answers "what happened recently and what is true now". The archive answers "what happened", and stays complete.

## Archive

`Context/Archive/` preserves superseded, completed, or fully synthesized material that remains useful for provenance but is not current guidance. It is omitted from normal indexing. Archive is not a trash folder: delete noise and exact duplicates, and transfer every still-current fact or opinion before moving a mixed document.

Reconsider archival status when a phase closes, a decision is superseded, a one-time runbook is completed, a source is fully synthesized, or a newer owner absorbs the material.

Archiving is not deletion and is not summarizing, so it is cheap and should not be agonized over. Archived material keeps its detail, stays in place, and remains available to anyone who goes looking. What archiving buys is that the active surface stays small enough to read, which is the scarce thing. Retire aggressively from the active set and delete almost nothing.

## Temp-Context

`Temp-Context/` is optional staging at the repository root, beside `Context/`, for a user dump or an in-progress organization pass. When it exists in a Git repository, add `/Temp-Context/` to the root `.gitignore` before placing files there. Inspect every item, move current knowledge into its active owner, preserve worthwhile history in Archive, discard only clear noise, then remove the empty staging directory.

## Reading Discipline

Read `Context/AGENTS.md` first, then load only the active documents whose names and descriptions match the task. Search within the relevant topic when more than one owner is plausible.

A whole-directory cleanup means an editorial audit, not only index regeneration. Inspect active ownership, duplication, stale status, instruction leakage, format choice, directory density, navigation, and historical material.

## Markup Choice

Markdown is the default for agent-facing and mixed-use project knowledge. Use it for plans, decisions, research, architecture, status, meeting records, runbooks, and linear human-readable notes.

HTML is for a deliberately human-facing surface whose value comes from presentation or interaction: dashboards, visual reviews, comparison tools, dense matrices, filterable references, and guided walkthroughs. Do not convert Markdown to HTML merely because it is long.

A long Markdown file should be split when it contains multiple owners, independently changing sections, or a reading path that requires repeated searching. Length alone is not the rule.

Use Mermaid inside Markdown whenever a diagram materially improves a human-facing explanation. Keep diagrams beside the text they explain rather than creating standalone `.mmd` files.

HTML is self-contained with inline CSS and JavaScript and no external dependencies. Images, PDFs, and other assets live beside the document that owns them.

## Frontmatter

Every active Markdown and HTML file begins with:

```yaml
---
name: <Title Case Document Name>
description: <one line saying what the file holds and when it is useful>
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
---
```

HTML places the same fields inside an opening HTML comment.

Descriptions are selection metadata. They state what the file contains and when it is useful, on one line of at most 1024 characters. The body owns the actual information.

`name` matches the document, `date_created` never changes, and `date_modified` changes with the content.

## The Index

Run the generator after active Context changes. It is one zero-dependency Node script, and both routes below run the same file:

```bash
# Skill on disk (a repository .agents/skills install or a global skills folder)
node <skill-root>/scripts/index.mjs <path-to-Context>

# Skill not on disk (served from a remote library)
npx --yes github:LeeorNahum/context-directory-opinions-skill <path-to-Context>
```

Node is the only requirement either way. The remote route fetches the script from its repository and needs network access the first time on a machine.

**The generator's warnings are work, not notes.** It reports the index size, flags frontmatter problems, and warns when a directory exceeds the file counts above. A warning is a task to do in that pass, or to name explicitly as deferred with a reason. Reading one and continuing is how a directory becomes unusable while every individual pass looks fine.

The generated block lists each active markup file as one linked bullet followed by an arrow and its description. It omits historical material and individual assets, validates active frontmatter, preserves authored text outside the guards, and warns when the instruction surface becomes large enough to deserve reorganization.

## Naming And Ownership

- Use Title Case for folders and markup filenames.
- Prefix time-anchored records with `YYYY-MM-DD `.
- Name evergreen files for the subject they own, not the temporary task that created them.
- Before retiring or splitting a document, map every unique fact, opinion, rationale, and link to its destination.

## Validation

Before finishing:

- Run the generator and fix active frontmatter errors.
- Confirm edited frontmatter matches the current purpose.
- Confirm current facts and opinions have one active owner.
- Confirm agent-wide rules live in `AGENTS.md` and document-specific procedures remain with their subject.
- Confirm local links and active wiki links resolve.
- Confirm directory density was reviewed rather than preserved by inertia.
- Confirm every generator warning was acted on or explicitly deferred with a reason.
- Confirm Temp-Context is gone after a drain.
