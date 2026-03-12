---
id: API
title_short: API Specification
title: RoundRush API Specification
design_state: drafting
modules:
  - API-M001
  - API-M002
  - API-M003
  - API-M004
---

## Objective

Define how external repositories integrate with RoundRush V2, establishing the synchronisation model between repository truth and RoundRush visualisation. The API is the backbone of deterministic, automated progress mirroring — eliminating manual reporting and ensuring a single source of truth across all connected projects.

## In scope

- Project integration flow and API key management
- Copilot integration configuration and mandatory synchronisation paragraph
- API endpoint responsibilities for requirements, tests, dependencies, branches, and user roles
- Required project boilerplate structure for consistent mirroring

## Out of scope

- Internal RoundRush platform services not exposed to external repositories
- UI implementation of the RoundRush dashboard
- Authentication mechanisms beyond API key generation and storage

---

## Acceptance Laws

> Law definitions are maintained in [`requirements/documentation/acceptance-laws.md`](../../documentation/acceptance-laws.md). The table below tracks compliance status for this epic. This epic is compliant only when every module listed below is compliant.

| ID    | Name                                                                                         | Status  |
|-------|----------------------------------------------------------------------------------------------|---------|
| AL-01 | All production code implemented                                                              | pending |
| AL-02 | All automated unit and integration tests pass with 100% coverage                             | pending |
| AL-03 | All documentation updated (requirements, tests, code comments, component docs, UML diagrams) | pending |
| AL-04 | All end-to-end tests implemented and passed                                                  | pending |
| AL-05 | Dependency map between modules updated                                                       | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100%                        | pending |
| AL-07 | All manual test suites (including smoke tests) completed                                     | pending |
