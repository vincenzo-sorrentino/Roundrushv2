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

### File naming

The `requirements/epics/` folder is **flat**: each epic folder contains only its epic `.md` and one `.md` per module. There are no `modules/` or `functionalities/` subdirectories.

| Level         | File name pattern                       | Example                                    |
|---------------|-----------------------------------------|--------------------------------------------|
| Epic          | `<CODE>-<kebab-domain>.md`              | `AUT-authentication.md`                    |
| Module        | `<CODE>-M00N-<kebab-slug>.md`           | `AUT-M001-login.md`                        |
| Functionality | section inside the module `.md` file    | `### AUT-M001-F001 — Basic login`          |

> **Rules**
>
> 1. Never use `EP` + number as a prefix — always use the 3-letter domain code.
> 2. Module slugs are short (1–3 words).
> 3. Functionalities are **`###` sections** inside their parent module `.md` — they are not separate files.
> 4. Frontmatter keys:
>    - Epic `.md` → `id`, `title_short`, `title`, `design_state`, `modules`
>    - Module `.md` → `id`, `title`, `epic`, `status`, `prototype_route`, `functionalities`
> 5. The epic `.md` contains an aggregated Acceptance Laws table. The module `.md` contains its own Acceptance Laws table. The epic is compliant when all its modules are compliant.

### Module file structure

Every module `.md` must follow this structure:

```markdown
---
id: <CODE>-M00N
title: <Title>
epic: <CODE>
status: draft          # draft | ready | in_dev | done
prototype_route: /path/to/prototype   # ~ if not yet available
functionalities:
  - <CODE>-M00N-F00N
---

## Overview
<Human-friendly one-paragraph description of what this module does and why.>

## Acceptance Laws

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
...

---

## Functionalities

### <CODE>-M00N-F00N — <Short title>

**User story**
As a <role>, I want to <goal> so that <benefit>.

**Acceptance criteria**

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
