# Roundrush Design System

Design system implementation derived from Figma exports.

## Source of Truth

- Raw Figma artifacts: `source/figma/`
- Tokens package: `packages/tokens`
- Themes package: `packages/themes`
- Components package: `packages/components`

## Scripts

- `npm run build:tokens`: compile token and theme artifacts.
- `npm run scaffold:components`: scaffold `rr-*` components from `components.raw.json`.
- `npm run sync:figma -- <dir>`: sync local Figma export files into `source/figma`.
