---
id: DOC-review-checklists
title: Review Checklists
category: Governance
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

This document defines the review checklists that apply to each category of pull request. Reviewers must verify every item on the relevant checklist before approving. Items are not optional — if an item cannot be confirmed, the PR must be updated before approval is granted.

---

## Spec PR checklist

Applies to any PR that creates or modifies a file in `requirements/`.

- [ ] All frontmatter fields are present and have valid values (`id`, `title`, `epic`, `status`, `prototype_route`, `functionalities`).
- [ ] All required sections are present: Overview, Acceptance Laws, and at least one Functionality section.
- [ ] The Acceptance Laws table uses the current canonical law labels from `requirements/documentation/acceptance-laws.md`.
- [ ] The canonical source annotation is present above the Acceptance Laws table.
- [ ] Status transition is valid according to the spec lifecycle (`draft → ready → in_dev → done`).
- [ ] If `status` is `approved` or `done`, a non-null `prototype_route` is declared.
- [ ] Any `prototype_route` declared is registered in `prototypes/app/src/router/routes.js`.
- [ ] Spec validator (`npm run validate:specs`) passes with no errors.

---

## Design system PR checklist

Applies to any PR that creates or modifies files in `prototypes/design-system/`.

- [ ] No hardcoded style values are used where a design token variable exists.
- [ ] Component API uses kebab-case attributes and `rr-*` prefixed event names.
- [ ] Storybook stories exist for all new or modified component variants.
- [ ] Token and theme build artifacts are regenerated when raw token sources changed (`npm run build:tokens` passes).
- [ ] Component contract tests pass (`npm run test:components`).
- [ ] No new `@ts-ignore` or ESLint disable comments without an inline justification.

---

## Prototype PR checklist

Applies to any PR that creates or modifies files in `prototypes/app/`.

- [ ] The flow route exists in `prototypes/app/src/router/routes.js` and maps to the matching `spec_id`.
- [ ] The core happy path and at least one failure path are represented and interactive.
- [ ] The prototype route is accessible from the prototype index navigation.
- [ ] No hardcoded hex colours or pixel values — all styles use semantic design tokens.
- [ ] The flow renders without runtime JavaScript errors in the browser console.
- [ ] Prototype route smoke test passes in CI.

---

## Documentation PR checklist

Applies to any PR that creates or modifies files in `requirements/documentation/`.

- [ ] Any change to an acceptance law definition is reflected in the relevant epic and module files within the same PR.
- [ ] Section headings use `##` or `###` — matching the subsection structure expected by the docs display.
- [ ] Frontmatter is valid: `id`, `title`, `category`, `version`, `last_updated` are all present.
- [ ] All internal links to other documentation files are valid paths.
