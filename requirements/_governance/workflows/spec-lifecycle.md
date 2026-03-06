# Spec Lifecycle

## Order of Operations

1. Create the epic `.md` file (e.g. `AUT-authentication.md`) with frontmatter and scope sections.
2. Create one module `.md` file per module (e.g. `AUT-M001-login.md`) with frontmatter, overview, acceptance laws, and functionality sections.
3. Write each functionality as a `###` section inside the module `.md` — covering user story and acceptance criteria.
4. Set `status: draft` in the module frontmatter.
5. After review, move module `status` to `in_review`, then `approved`.
6. Build the prototype flow and register its route in `prototypes/app/src/router/routes.js`.
7. Add `prototype_route` to the module frontmatter.
8. Move module `status` to `implemented` once the prototype route passes QA.

## Status Rules

- `approved` and `implemented` modules must have a non-empty `prototype_route` in frontmatter.
- `archived` modules must not appear in prototype navigation.
- The epic `.md` acceptance laws table reflects the aggregate of all its module laws — update it whenever a module compliance status changes.

## No links.json Required

Prototype linkage is declared directly in the module `.md` frontmatter via `prototype_route`. There is no separate `links.json` file. The spec validator (`prototypes/_tools/validators/validate-spec-links.mjs`) reads module frontmatter to verify that approved modules have matching routes.
