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
- Generate acceptance-laws.md from YAML: `npm run generate:acceptance-laws`

## Acceptance Laws

Each epic under `requirements/epics/EP00x-*/` contains:

- `acceptance-laws.yaml` — the machine-readable source of truth
- `acceptance-laws.md` — human-readable view, auto-generated from the YAML

To regenerate all `.md` files after editing any YAML:

```bash
npm run generate:acceptance-laws
```

The script computes a SHA-256 hash of the YAML contents and embeds it in the
Markdown front matter (`yaml_hash`), making it easy to verify alignment.
