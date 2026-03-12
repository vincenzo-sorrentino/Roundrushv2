---
id: DOC-workflows
title: Workflows
category: Workflow
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

This document describes the key operational workflows used by the Roundrush team. It covers the spec authoring lifecycle, the Figma-to-code token and component sync, and the process for keeping prototypes aligned with the design system.

---

## Spec lifecycle

The spec lifecycle governs how a requirement artefact moves from first draft to fully implemented.

### Order of operations

1. Create the epic `.md` file (e.g. `AUT-authentication.md`) with frontmatter, objective, scope, and module list.
2. Create one module `.md` file per module (e.g. `AUT-M001-login.md`) with frontmatter, overview, acceptance laws table, and functionality sections.
3. Write each functionality as a `### F-ID — Title` section inside the module `.md` — covering behaviour, edge cases, and prototype references.
4. Set `status: draft` in the module frontmatter during initial authoring.
5. After review, move module `status` to `ready`, then `in_dev` when work begins.
6. Build the prototype flow and register its route in `prototypes/app/src/router/routes.js`.
7. Add `prototype_route` to the module frontmatter.
8. Move module `status` to `done` once all seven Acceptance Laws are in Pass status and the prototype route passes QA.

### Status rules

| Status   | Meaning                                             | Prototype route required |
|----------|-----------------------------------------------------|--------------------------|
| `draft`  | Actively being written — not yet reviewed           | No                       |
| `ready`  | Review complete — approved for development          | No                       |
| `in_dev` | Development in progress                             | No                       |
| `done`   | All Acceptance Laws passing, prototype QA complete  | Yes — must be non-null   |
| `archived` | No longer active — not visible in navigation     | N/A                      |

- `done` modules must have a non-null `prototype_route` in frontmatter.
- `archived` modules must not appear in prototype navigation.
- The epic `.md` acceptance laws table reflects the aggregate of all its module statuses — update it whenever a module compliance status changes.

### No links.json required

Prototype linkage is declared directly in the module `.md` frontmatter via `prototype_route`. There is no separate `links.json` file. The spec validator (`prototypes/_tools/validators/validate-spec-links.mjs`) reads module frontmatter to verify that `done` modules have matching routes.

---

## Figma-to-code workflow

### Token and theme sync

1. Export `tokens.raw.json`, `themes.raw.json`, and `components.raw.json` from the Figma pipeline.
2. Run `npm run sync:figma -- <export-dir>` to copy the raw exports into the design system source folder.
3. Run `npm run build:tokens` to compile raw token sources into CSS custom properties and theme files.

Output locations:
- Base CSS tokens: `prototypes/design-system/packages/tokens/dist/`
- Theme CSS files: `prototypes/design-system/packages/themes/dist/`

### Component sync

1. Run `npm run scaffold:components` to generate missing component skeletons from the component mapping configuration.
2. Complete interactive behaviour and accessibility implementation manually.
3. Add or update Storybook stories for all new or changed variants.
4. Validate with `npm run test:components`.

### Prototype consumption

1. Import `@roundrush/tokens/tokens.css`, `@roundrush/themes/light.css`, and `@roundrush/components` in the prototype app entry point.
2. Build prototype flows using only design system components and semantic tokens (`--rr-sem-*`).
3. Never introduce hardcoded hex colours or pixel values in prototype flows — use token variables exclusively.

### Running the full build chain

```bash
# Install dependencies and build everything from scratch
npm run setup

# Build only tokens (e.g. after a Figma sync)
npm run build:tokens

# Run the prototype dev server (rebuilds tokens first)
npm run dev

# Run all tests
npm run test
```
