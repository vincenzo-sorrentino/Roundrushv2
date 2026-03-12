---
id: TST-M003
title: Coverage & Regression Intelligence
epic: TST
status: draft
prototype_route: ~
functionalities:
  - TST-M003-F001
  - TST-M003-F002
  - TST-M003-F003
  - TST-M003-F004
---

## Overview

The intelligence layer that analyses dependency graphs, generates regression scenarios, tracks coverage evolution, and surfaces recurring failure patterns across sprints. This module is primarily driven by AI agent actions with QA engineers serving as the validation and approval layer.

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

### TST-M003-F001 — AI-driven regression generation

When a new requirement or module is introduced into the repository, the AI regression agent is triggered automatically. It reads the dependency graph to identify which existing modules are structurally or functionally affected by the change. For each impacted module, the agent generates regression test scenarios based on the new specification, the historical change log, and the existing test definitions. The generated scenarios are committed to the planning directory as structured JSON files, which then flow through the same Git-push-to-sync pipeline to populate the regressions tab in TST-M001. The agent annotates each generated scenario with the triggering requirement ID and the dependency path that led to its inclusion. QA engineers review and approve generated scenarios before they are tagged as active regression tests — validation is the only step that requires human attention in the regression generation cycle.

---

### TST-M003-F002 — Coverage evolution visualisation

The dashboard tracks code coverage percentages over time for each testing layer (unit, integration, end-to-end) per module. Coverage data is included in the CI payload at the end of each pipeline run and is stored as a time-series record alongside the corresponding execution result. The evolution view renders this history as a trend line per module, making it visible when coverage is growing, plateauing, or declining relative to the baseline established at the start of the current sprint. The visualisation distinguishes between the three testing layers so QA leads can immediately identify whether a shift is occurring at unit level, integration level, or end-to-end level and prioritise accordingly.

---

### TST-M003-F003 — Coverage drop detection

When a CI payload introduces a coverage percentage that is lower than the previously recorded value for the same module and testing layer, the system flags the affected module with a drop indicator on the dashboard. The indicator remains visible until coverage recovers at or above the prior measurement. Drop events are also emitted as structured log entries so they can be consumed by external alerting tools. The system does not automatically block pipeline progression on a coverage drop — that decision is enforced at the CI pipeline configuration level — but the dashboard makes every drop visible and timestamped so it can be investigated and resolved within the same sprint.

---

### TST-M003-F004 — Recurring failure pattern analysis

The system maintains a historical record of test case results across all pipeline runs. When the same test case ID accumulates a repeating cycle of pass, fail, or blocked states above a configurable threshold within a sprint window, it is classified as a flaky or recurring failing test. These cases surface in a dedicated panel on the regressions tab, annotated with their failure frequency and the timeline of their last N run results. QA engineers use this signal to prioritise investigation, retire unstable automated tests, or escalate the underlying issue to the appropriate module owner. Patterns are recalculated after every CI payload arrives so the panel always reflects the most current failure history.
