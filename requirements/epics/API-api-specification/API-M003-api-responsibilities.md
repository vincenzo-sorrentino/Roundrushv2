---
id: API-M003
title: API Responsibilities
epic: API
status: draft
prototype_route: ~
functionalities:
  - API-M003-F001
  - API-M003-F002
  - API-M003-F003
---

## Overview

Define the full set of responsibilities that the RoundRush V2 API must fulfil to maintain accurate, real-time visibility into project state. The API receives pushes from connected repositories after each commit and translates those pushes into structured state updates visible in RoundRush. It must handle requirements, tests, branches, coverage, dependencies, sprints, and user roles.

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

### API-M003-F001 — Requirements and compliance tracking

The API accepts push payloads reporting the current state of requirement modules: their status, which acceptance laws are passing, and which functionalities have been implemented. On each push, the API validates the incoming payload against its schema, rejects malformed submissions with a structured error response, and updates the requirement state stored in RoundRush. Changes trigger re-evaluation of module compliance across any dependent modules, so the RoundRush view always reflects the latest known state of each requirement. A push that reports a regression — a previously passing law moving to failing — is recorded and surfaced as a compliance event in the project timeline.

---

### API-M003-F002 — Test execution and coverage tracking

The API accepts test results from connected repositories, covering unit, integration, end-to-end, and regression suites. Each submission includes the test suite type, pass/fail counts, total tests run, and a coverage report with statement and branch percentages at module level. The API stores the result against the commit SHA to maintain a historical record. If coverage drops below the configured project threshold, the API marks the affected modules as non-compliant and the status is immediately visible in RoundRush. Test results must include a dependency scope reference when reporting regression suite runs so the API can correctly attribute them to the affected modules.

---

### API-M003-F003 — Branch, PR, dependency, sprint, and role tracking

The API maintains a live view of the repository's structural state beyond test results. It receives notifications when branches are created, when pull requests are opened, approved, or merged, and when branch state changes — all linked to the module or functionality they relate to. It also receives dependency graph updates whenever a module's declared dependencies change, and sprint association updates when tasks are moved between sprints. User role registration ensures the API correctly attributes contributions to developers, QA engineers, and designers. All of this information is used by RoundRush to construct a complete, accurate picture of project health that does not require any manual data entry.
