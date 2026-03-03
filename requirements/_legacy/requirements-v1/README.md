# Requirements Structure

This folder is the source of truth for product requirements.

## Layout

- `domains/<domain>/_index.md`: domain overview and flow inventory.
- `domains/<domain>/<flow>/spec.md`: feature specification with required frontmatter and sections.
- `domains/<domain>/<flow>/flow.md`: exact interaction path and alternates.
- `domains/<domain>/<flow>/acceptance.md`: testable acceptance scenarios.
- `domains/<domain>/<flow>/links.json`: canonical mapping between spec, prototype route, and Figma nodes.

## Status Lifecycle

Every `spec.md` status must be one of:

`draft -> in_review -> approved -> implemented -> archived`
