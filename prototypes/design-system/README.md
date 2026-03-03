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

## Target Structure (V2 Reorganization)

The V2 target structure adds these top-level folders under `/design-system`:

| Folder | Purpose | Current location |
|---|---|---|
| `tokens/` | Design tokens (placeholder) | Actual content: `packages/tokens/` |
| `components/` | Component library (placeholder) | Actual content: `packages/components/` |
| `styles/` | Theme/style assets (placeholder) | Actual content: `packages/themes/` |
| `docs/` | Documentation (placeholder) | Actual content: `apps/storybook/` |

### TODO

- [ ] Consolidate `packages/tokens/` → `tokens/` once build tooling is updated.
- [ ] Consolidate `packages/components/` → `components/` once build tooling is updated.
- [ ] Consolidate `packages/themes/` → `styles/` once build tooling is updated.
- [ ] Move storybook docs reference into `docs/`.
- [ ] Avoid breaking existing imports: update all consumers before moving.
