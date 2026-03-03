# ADR-0001: Monorepo Structure for Specs + Design System + Prototypes

## Status
Accepted

## Context

Roundrush needs a scalable operating model where product requirements, UI library implementation, and interactive flow prototypes remain aligned over time.

## Decision

Adopt a single monorepo with top-level boundaries:

- `requirements/`
- `design-system/`
- `prototypes/`
- `process/`
- `tools/`

Use npm workspaces for package management and local package consumption.

## Consequences

Positive:

- Strong linkage between spec and prototype route.
- Easier cross-review and automated consistency checks.
- Faster iteration on design system and prototypes.

Negative:

- Requires governance to avoid folder drift.
- CI matrix grows as workspaces increase.
