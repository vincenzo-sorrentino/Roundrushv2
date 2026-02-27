# Roundrush Product Specs Workspace

This repository is a single monorepo for product specification, design system implementation, and interactive prototypes.

## Workspace Areas

- `requirements/`: domain-first product requirements and flow definitions.
- `design-system/`: Figma-sourced tokens/themes and strict `rr-*` Web Components.
- `prototypes/`: route-driven Vite prototype app consuming the design system packages.
- `process/`: governance docs, conventions, and architecture decisions.
- `tools/`: validators and CI support scripts.

## Quick Start

```bash
npm install
npm run build:tokens
npm run scaffold:components
npm start
```

## Key Workflows

- Validate specs and links: `npm run validate:specs`
- Build design tokens and themes: `npm run build:tokens`
- Regenerate component skeletons from Figma export: `npm run scaffold:components`
- Run prototype app: `npm start` or `npm run dev:prototype`
- Run component library explorer (Storybook): `npm run dev:storybook`
