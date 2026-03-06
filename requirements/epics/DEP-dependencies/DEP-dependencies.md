---
id: DEP
title_short: Dependencies
title: Dependency tracking and impact analysis
design_state: discovery
modules:
  - DEP-M001
---

## Objective

Give every team member clear visibility into how modules and epics depend on each other, so that they can anticipate the ripple effect of changes, unblock sequencing decisions, and avoid delivering work that breaks something else silently.

## In scope

- Dependency graph visualisation at module and epic level
- Impact analysis: identify everything affected when a module changes
- Blocking and blocked-by tracking between modules
- Cross-epic dependency visibility

## Out of scope

- Automated detection of dependencies from source code
- External third-party or library dependencies
- Semantic version resolution
- Auto-updating of the dependency graph from CI output

---

## Acceptance Laws

These are the aggregate of all module-level acceptance laws. The epic is fully compliant only when every module below is compliant.

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |
