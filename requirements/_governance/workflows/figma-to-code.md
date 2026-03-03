# Figma to Code Workflow

## Token + Theme Sync

1. Export `tokens.raw.json`, `themes.raw.json`, and `components.raw.json` from Figma pipeline.
2. Run `npm run sync:figma -- <export-dir>`.
3. Run `npm run build:tokens`.

## Component Sync

1. Run `npm run scaffold:components` to generate missing component skeletons.
2. Complete behavior and accessibility manually.
3. Add or update Storybook stories.
4. Validate with package tests.

## Prototype Consumption

1. Import `@roundrush/tokens/tokens.css`, `@roundrush/themes/light.css`, and `@roundrush/components` in prototype app.
2. Build flows with only design-system components and semantic tokens.
