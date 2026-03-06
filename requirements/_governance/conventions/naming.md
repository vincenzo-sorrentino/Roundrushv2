# Naming Conventions

## Requirements — Hierarchy IDs

Every requirement artefact uses a **3-letter uppercase short-code** derived from the
epic's domain name. The code is assigned once and never changes.

### Registry of epic short-codes

| Code | Epic folder              | Domain            |
|------|--------------------------|-------------------|
| AUT  | AUT-authentication       | Authentication    |
| REQ  | REQ-requirements         | Requirements      |
| DEP  | DEP-dependencies         | Dependencies      |
| RMP  | RMP-roadmap              | Roadmap           |
| KAN  | KAN-kanban-planning      | Kanban / Planning |
| DOC  | DOC-docs                 | Documentation     |
| TST  | TST-testing-suite        | Testing Suite     |

### ID patterns

| Level         | Pattern                       | Example                          |
|---------------|-------------------------------|----------------------------------|
| Epic          | `<CODE>`                      | `AUT`                            |
| Module        | `<CODE>-M00N`                 | `AUT-M001`                       |
| Functionality | `<CODE>-M00N-F00N`            | `AUT-M001-F001`                  |

### Folder / file naming

| Level         | Folder name                        | Example                                    |
|---------------|------------------------------------|--------------------------------------------|
| Epic          | `<CODE>-<kebab-domain>/`           | `AUT-authentication/`                      |
| Module        | `<CODE>-M00N-<kebab-slug>/`        | `AUT-M001-login/`                          |
| Functionality | `<CODE>-M00N-F00N-<kebab-slug>.md` | `AUT-M001-F001-basic-login.md`             |

> **Rules**
>
> 1. Never use `EP` + number as a prefix — always use the 3-letter domain code.
> 2. Module slugs are short (1–3 words). Do NOT repeat the module name inside
>    functionality filenames (e.g. `KAN-M001-F001-view-sprint-modules.md`, NOT
>    `KAN-M001-sprint-board-F001-view-sprint-modules.md`).
> 3. Frontmatter keys follow the **AUT convention**:
>    - `epic.md` → `id`, `title_short`, `title`, `design_state`, `modules`
>    - `module.md` → `id`, `title`, `epic`, `functionalities`
>    - `functionality.md` → `id`, `title`, `module`, `status`
> 4. Acceptance-laws heading format: `# <CODE> — <Title> · Acceptance Laws`
> 5. Acceptance-laws table columns: `| ID | Name | Description |` (no Evidence column).

### Functionality file structure

Every functionality `.md` file must contain:

```
---
id: <CODE>-M00N-F00N
title: <Short title>
module: <CODE>-M00N
status: draft          # draft | ready | in_dev | done
---

## User story
As a <role>, I want to <goal> so that <benefit>.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | ...   | ...  | ...  |
```

## Prototypes

- Flow implementation folder: kebab-case, e.g. `auth-login`.
- Route format: `/<domain>/<feature>/<variant>`.

## Design System

- Component tags: `rr-*` prefix.
- CSS variables: `--rr-<category>-<token>` for base tokens and `--rr-sem-<name>` for semantic values.
