---
id: DOC-architecture-decisions
title: Architecture Decisions
category: Governance
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

This document records the foundational architecture decisions that govern the structure and evolution of the Roundrush monorepo. Each entry follows the Architecture Decision Record (ADR) format. Once an ADR is accepted it is immutable — superseding decisions require a new ADR entry rather than editing an existing one.

All team members may propose an ADR. Acceptance requires two senior engineer approvals.

---

## ADR process

An Architecture Decision Record is required for any decision that:

- Changes a module or domain boundary
- Introduces or removes an external package dependency
- Adopts, deprecates, or fundamentally changes a pattern used across the codebase
- Deviates from or extends the principles in this document

**Format** for each ADR: `ADR-NNNN` identifier, `## Status` (Proposed / Accepted / Superseded), `## Context`, `## Decision`, `## Consequences`.

---

## ADR-0001 — Monorepo structure

**Status:** Accepted

### Context

Roundrush needs a scalable operating model where product requirements, UI library implementation, and interactive flow prototypes remain aligned over time.

### Decision

Adopt a single monorepo with the following top-level boundaries:

- `requirements/` — product specifications, acceptance laws, governance documentation
- `prototypes/design-system/` — component library, design tokens, themes
- `prototypes/app/` — interactive flow prototypes
- `requirements/_governance/` *(archived)* — governance conventions now live in `requirements/documentation/`

npm workspaces are used for package management and local package consumption across design system packages and the prototype app.

### Consequences

**Positive:**
- Strong linkage between spec and prototype route — both live in the same repository.
- Easier cross-review and automated consistency checks in CI.
- Faster iteration on design system and prototypes with local package resolution.

**Negative:**
- Requires active governance to avoid folder drift as the repo grows.
- CI matrix grows as new workspaces are added — must be managed deliberately.

---

## ADR-0002 — Flat requirements structure

**Status:** Accepted

### Context

An earlier layout used three levels of nesting (epic → modules → functionalities as separate files). This created friction: opening a single feature required navigating 3–4 directory levels, a `links.json` per module drifted out of sync, and the spec validator had to walk deeply nested trees.

### Decision

Collapse to a flat two-level structure inside each epic folder:

```
requirements/epics/<CODE>-<domain>/
  <CODE>-<domain>.md          ← epic file
  <CODE>-M001-<slug>.md       ← module file (functionalities as ### sections)
  <CODE>-M002-<slug>.md
```

Rules:
1. One `.md` file per module — functionalities are `### F-ID — Title` sections within it, not separate files.
2. The epic file carries the aggregated Acceptance Laws status table and a `modules:` list in its frontmatter.
3. `links.json` is removed — prototype linkage is encoded in the `prototype_route` frontmatter field.
4. Module `status` values: `draft → ready → in_dev → done → archived`.
5. Modules with `status: done` must have a non-null `prototype_route` registered in `prototypes/app/src/router/routes.js`.

### Consequences

**Positive:**
- Each module is a single file — easy to open, diff, and review.
- Prototype linkage is always co-located with the spec.
- The spec validator (`validate-spec-links.mjs`) is simpler and more robust.
- Search by module ID (e.g. `AUT-M001`) finds the file directly.

**Negative:**
- Very large modules with many functionalities can become long files. Mitigated by keeping functionality descriptions concise and linking to Figma for visual detail.

---

## ADR-0003 — Centralised acceptance laws

**Status:** Accepted

### Context

The seven Acceptance Laws were previously duplicated verbatim in every epic and module `.md` file (20+ files). This created a maintenance risk: updating a law required editing every file, and definitions could silently diverge.

### Decision

Establish `requirements/documentation/acceptance-laws.md` as the single canonical source for all law definitions. Epic and module files retain their compliance-status tables but add a read-only annotation linking to the canonical source. Law labels in the status tables are updated to use the full, precise wording defined in the canonical document.

`requirements/documentation/` replaces `requirements/_governance/` as the home for all transversal governance documentation.

### Consequences

**Positive:**
- Law definitions are authored in exactly one place.
- Divergence between files is eliminated structurally.
- The documentation folder is surfaced as first-class content in the Roundrush docs tab.

**Negative:**
- Epic and module files now depend on an external reference for the law definitions — contributors must follow the link to read the full definition rather than seeing it inline.
