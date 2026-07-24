---
name: "context-directory-opinions"
description: "Opinionated structure for a Context directory: the durable home for a project's plans, research, notes, schedules, program info, and shared memory as markup. Use when creating, saving, organizing, or reorganizing any durable documentation or planning material, when the user says to save, note, remember, capture, or document project material for later (even vaguely), never for personal reminders or in-chat preferences, when adding plans, meeting notes, research, or reference material to a repository, when reading or maintaining an existing Context directory and its index, or whenever a Temp-Context directory exists and needs draining into Context. Not for code documentation, READMEs, or comments that live with the source."
metadata:
  author: "Leeor Nahum"
  version: "2.5.2"
---

# Context Directory Opinions

`Context/` is the durable home for what a project knows that is not code: plans, research, decisions, rationale, status, schedules, references, and shared memory. It is project knowledge, not a second instruction hierarchy.

Topical documents state facts, opinions, constraints, decisions, and plans directly. Rules that govern how an agent works across tasks belong in the nearest applicable `AGENTS.md`. A plan, checklist, decision, or runbook may still contain instructions when those instructions are the subject of the document.

## Core Structure

- `Context/` lives at the repository root. The skill owns only that directory.
- `Context/AGENTS.md` contains the generated active index and may carry a few Context-specific structural rules outside the generated guards.
- Organize by the project's real subjects. Rename, split, merge, move, and retire material when ownership or reading needs change.
- Three or four levels of meaningful subdirectories are healthy. Avoid keeping files together merely because the first folder layout already exists.
- Root-level files are reserved for project-wide owners such as current status or a master plan.
- One current fact has one owner. Other documents link to it.

## Directory Density

Aim for roughly 4 to 12 active markup files in a directory. More than 12 triggers an organization review. More than 20 means the directory needs clearer subtopics unless it is an intentional chronological or generated collection.

Create subdirectories around stable subjects, not arbitrary batches. Good folder names explain why the files change together. Avoid catch-all folders such as `Misc`, numbered buckets, or one-child nesting that adds no meaning.

When a directory grows:

- Group files by domain, lifecycle, audience, or artifact type
- Move current owners before historical references
- Combine fragments that change together
- Split files whose sections change independently
- Update links and the generated index in the same pass

## Archive

`Context/Archive/` preserves superseded, completed, or fully synthesized material that remains useful for provenance but is not current guidance. It is omitted from normal indexing. Archive is not a trash folder: delete noise and exact duplicates, and transfer every still-current fact or opinion before moving a mixed document.

Reconsider archival status when a phase closes, a decision is superseded, a one-time runbook is completed, a source is fully synthesized, or a newer owner absorbs the material.

## Temp-Context

`Temp-Context/` is optional staging for a user dump or an in-progress organization pass. Inspect every item, move current knowledge into its active owner, preserve worthwhile history in Archive, discard only clear noise, then remove the empty staging directory.

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

Run the generator after active Context changes:

```bash
node <skill-root>/scripts/index.mjs <path-to-Context>
```

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
- Confirm directory density and large files were reviewed rather than preserved by inertia.
- Confirm Temp-Context is gone after a drain.
