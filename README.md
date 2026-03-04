# Roundrush Product Specs Workspace

This repository is a single monorepo for product specification, design system implementation, and interactive prototypes.

## Workspace Areas

- `requirements/` — EP-based product requirements, acceptance laws, governance, and legacy docs.
- `prototypes/` — Vite prototype app, design system (tokens/themes/components), and CI/validation tools.

## Quick Start

```bash
npm install
npm run build:tokens
npm run scaffold:components
npm start
```

## View Component Library

Use the prototype app as the designer-facing library explorer (no Storybook required):

```bash
npm run dev:prototype
```

Then open:

- `http://localhost:5173/library/components` for the full component gallery (variants, states, sizes, composites).
- `http://localhost:5173/library/foundations/colors` for the full token/theme foundations view.
- `http://localhost:5173/requirements/module` for the read-only Requirements Module reflection prototype.

## Key Workflows

- Validate specs and links: `npm run validate:specs`
- Build design tokens and themes: `npm run build:tokens`
- Regenerate component skeletons from Figma export: `npm run scaffold:components`
- Run prototype app: `npm start` or `npm run dev:prototype`
- Run component library explorer (Storybook): `npm run dev:storybook`

## Acceptance Laws

Each epic under `requirements/epics/EP00x-*/` contains:

- `acceptance-laws.md` — the list of acceptance criteria that must be met before an epic is considered done
