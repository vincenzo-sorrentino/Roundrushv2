# ADR-0002: Flat Requirements Structure (Epic + Module files)

## Status
Accepted

## Context

The original requirements layout used three levels of nesting:

```
requirements/epics/<CODE>-<domain>/
  epic.md
  acceptance-laws.md
  modules/<CODE>-M001-<slug>/
    module.md
    functionalities/
      <CODE>-M001-F001-<slug>.md
      ...
```

This created friction in several areas:

- Opening or reviewing a single feature required navigating 3–4 directory levels.
- The `links.json` file per module added a maintenance burden that drifted out of sync with the actual spec states.
- The spec validator had to walk deeply nested trees and join data from multiple files per module.
- Searching for a module by ID in the repository required knowing both the epic folder and the module sub-folder name.

## Decision

Collapse to a flat two-level structure inside each epic folder:

```
requirements/epics/<CODE>-<domain>/
  <CODE>-<domain>.md          ← epic file
  <CODE>-M001-<slug>.md       ← module file (functionalities as ### sections)
  <CODE>-M002-<slug>.md
  ...
```

Rules:

1. One `.md` file per module — functionalities are `### F-ID — Title` sections within it, not separate files.
2. The epic file (`<CODE>-<domain>.md`) carries the aggregated Acceptance Laws table and a `modules:` list in its frontmatter.
3. Module files carry a YAML frontmatter block with: `id`, `title`, `epic`, `status`, `prototype_route`, `functionalities`.
4. `links.json` is removed entirely — prototype linkage is encoded in the `prototype_route` frontmatter field.
5. Module `status` values: `draft` → `ready` → `in_dev` → `done` → `archived`.
6. Modules with `status: done` must have a non-null `prototype_route` that is registered in `prototypes/app/src/router/routes.js`.

The spec validator (`prototypes/_tools/validators/validate-spec-links.mjs`) is rewritten to enforce these rules.

## Consequences

Positive:

- Each module is a single file — easy to open, diff, and review.
- Prototype linkage is always co-located with the spec (no separate link map to maintain).
- The validator is simpler and more robust.
- Search by module ID (e.g. `AUT-M001`) finds the file directly.

Negative:

- Very large modules with many functionalities can become long files. Mitigated by keeping functionality descriptions concise and linking to Figma for visual detail.
- The flat validator cannot perform deep cross-epic consistency checks that `links.json` could theoretically enable. Accepted as out of scope for the current tooling phase.
