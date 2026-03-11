---
id: DOC-definition-of-done
title: Definition of Done
category: Governance
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

The Definition of Done specifies the minimum set of conditions that must be satisfied before any unit of work — a flow, a module, or a prototype screen — can be considered complete. Meeting the Definition of Done is a prerequisite for marking any item as Done in the project tracking system.

---

## Module level

A module is done when all of the following conditions are met:

- All seven [Acceptance Laws](./acceptance-laws.md) are in Pass status.
- The spec file includes all required frontmatter fields and sections (Overview, Acceptance Laws, Functionalities).
- The `status` field in frontmatter is set to `done`.
- A non-null `prototype_route` is declared in frontmatter and the route is registered in `prototypes/app/src/router/routes.js`.
- All functionality sections within the module file are complete and match the implemented scope.
- The dependency map has been updated and committed.

---

## Prototype flow level

A prototype flow is done when all of the following conditions are met:

- The flow route exists and is accessible from the app navigation.
- The core happy path and at least one failure path are represented and interactive.
- The flow uses only `@roundrush/components` components and semantic design tokens — no hardcoded style values.
- The flow renders without runtime errors in the CI prototype smoke test.
- The spec validator (`validate-spec-links.mjs`) passes with no errors or warnings for this flow.

---

## Design system component level

A component is done when all of the following conditions are met:

- The component API uses kebab-case attributes and `rr-*` event names.
- No hardcoded style values are used where token variables exist.
- Storybook stories exist for all variants of the component.
- Token and theme artifacts have been regenerated if any raw token sources changed.
- Component tests pass and coverage meets the project threshold.

---

## CI validation checks

Changes pass done status only if the following automated checks are all green:

- Spec validation: `npm run validate:specs` exits with code 0.
- Prototype routes check: all prototype routes render without runtime errors.
- Design token build: `npm run build:tokens` completes without errors.
- All test suites: `npm run test` passes across all workspaces.
