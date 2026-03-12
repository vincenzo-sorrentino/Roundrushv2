---
id: API-M004
title: Repository Organisation
epic: API
status: draft
prototype_route: ~
functionalities:
  - API-M004-F001
  - API-M004-F002
---

## Overview

Define the required project boilerplate structure that all repositories integrated with RoundRush V2 must follow. The structure ensures consistent mirroring between repository layout and RoundRush visualisation. The API specification describes where each artefact type must reside so the sync agent can locate and interpret them without per-project configuration.

## Acceptance Laws

> Law definitions are maintained in [`requirements/documentation/acceptance-laws.md`](../../documentation/acceptance-laws.md). The table below tracks compliance status for this module.

| ID    | Name                                                                                         | Status  |
|-------|----------------------------------------------------------------------------------------------|---------|
| AL-01 | All production code implemented                                                              | pending |
| AL-02 | All automated unit and integration tests pass with 100% coverage                             | pending |
| AL-03 | All documentation updated (requirements, tests, code comments, component docs, UML diagrams) | pending |
| AL-04 | All end-to-end tests implemented and passed                                                  | pending |
| AL-05 | Dependency map between modules updated                                                       | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100%                        | pending |
| AL-07 | All manual test suites (including smoke tests) completed                                     | pending |

---

## Functionalities

### API-M004-F001 — Required directory structure

Every repository connected to RoundRush V2 must follow the standard boilerplate structure. The `/requirements/` directory holds the project's requirement files, grouped inside `/requirements/modules/`. Test suites are organised under `/tests/` with three mandatory subdirectories: `/tests/unit/`, `/tests/integration/`, and `/tests/e2e/`. Documentation and UML diagrams live under `/docs/` and `/docs/uml/`. Governance documents reside in `/project-governance/`, dependency maps in `/dependency-map/`, and prototype implementations in `/prototypes/`. The sync agent reads these paths as fixed conventions — repositories that deviate from the structure will fail the integration compliance check and their pushes will be rejected until the structure is corrected.

---

### API-M004-F002 — Naming and documentation conventions

Within the required structure, naming conventions are enforced as part of the API contract. Requirement module files follow the `<CODE>-M00N-<kebab-slug>.md` pattern. Test files follow the `<module-id>.<type>.test.<ext>` pattern. Dependency maps are stored as `dependency-map.json` at the root of the `/dependency-map/` directory. UML diagrams use the module ID as the filename. Documentation update rules require that any change to a module's implementation is accompanied by an update to the corresponding requirement file within the same commit or pull request. These conventions allow the sync agent to deterministically locate, parse, and mirror all artefacts into RoundRush without requiring per-project configuration.
