---
id: DOC-naming-conventions
title: Naming Conventions
category: Governance
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

This document defines the naming rules for all artefacts in the Roundrush monorepo — requirements IDs, file names, code symbols, CSS classes, and design tokens. Consistent naming reduces ambiguity, enables tooling, and makes the codebase navigable by anyone on the team.

---

## Requirements IDs

Every requirement artefact uses a **3-letter uppercase short-code** derived from the epic's domain name. The code is assigned once and never changes.

### Epic short-code registry

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

| Level         | Pattern                    | Example                |
|---------------|----------------------------|------------------------|
| Epic          | `<CODE>`                   | `AUT`                  |
| Module        | `<CODE>-M00N`              | `AUT-M001`             |
| Functionality | `<CODE>-M00N-F00N`         | `AUT-M001-F001`        |

### Rules

1. Never use `EP` + number as a prefix — always use the 3-letter domain code.
2. Module slugs are short (1–3 words).
3. Functionalities are `###` sections inside their parent module `.md` — they are not separate files.
4. Epic `.md` frontmatter keys: `id`, `title_short`, `title`, `design_state`, `modules`.
5. Module `.md` frontmatter keys: `id`, `title`, `epic`, `status`, `prototype_route`, `functionalities`.

---

## File naming

The `requirements/epics/` folder is **flat**: each epic folder contains only its epic `.md` and one `.md` per module. There are no `modules/` or `functionalities/` subdirectories.

| Level         | File name pattern                    | Example                         |
|---------------|--------------------------------------|----------------------------------|
| Epic          | `<CODE>-<kebab-domain>.md`           | `AUT-authentication.md`         |
| Module        | `<CODE>-M00N-<kebab-slug>.md`        | `AUT-M001-login.md`             |
| Functionality | Section inside the module `.md` file | `### AUT-M001-F001 — Basic login` |

---

## Code symbols

| Symbol type          | Convention          | Example                          |
|----------------------|---------------------|----------------------------------|
| Files & folders      | kebab-case          | `user-profile.ts`, `auth-domain/` |
| Variables & functions | camelCase          | `handleSubmit`, `userData`       |
| Classes & types      | PascalCase          | `AuthService`, `UserProfile`     |
| Module-level constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT`             |
| Function-scoped constants | camelCase     | `defaultTimeout`                 |

---

## CSS classes

All project CSS classes use a BEM-inspired system with the `rr-` prefix.

| Pattern               | Example                               |
|-----------------------|---------------------------------------|
| Block                 | `rr-sidebar`                          |
| Block + element       | `rr-sidebar__item`                    |
| Modifier              | `rr-sidebar__item--active`            |
| State (JS-applied)    | `is-open`, `is-error`, `is-met`       |

---

## Design tokens

| Token type       | Pattern                            | Example                               |
|------------------|------------------------------------|---------------------------------------|
| Base token       | `--rr-<category>-<token>`          | `--rr-color-blue-500`                 |
| Semantic token   | `--rr-sem-<name>`                  | `--rr-sem-textPrimary`                |
| Component token  | `--rr-<component>-<property>`      | `--rr-button-paddingX`                |

---

## Prototype routes

- Flow implementation folder: kebab-case, e.g. `auth-login`
- Route format: `/<domain>/<feature>/<variant>`, e.g. `/auth/login/default`

---

## Module file structure

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

> Law definitions are maintained in [requirements/documentation/acceptance-laws.md](../../documentation/acceptance-laws.md). The table below tracks compliance status for this module.

| ID    | Name                                                                                         | Status  |
|-------|----------------------------------------------------------------------------------------------|---------|
| AL-01 | All production code implemented                                                              | pending |
...

---

## Functionalities

### <CODE>-M00N-F00N — <Short title>

<Plain-language description of the functionality.>
```
