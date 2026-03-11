---
id: TST-M001
title: Test Planning & Traceability
epic: TST
status: draft
prototype_route: /testing/overview
functionalities:
  - TST-M001-F001
  - TST-M001-F002
  - TST-M001-F003
  - TST-M001-F004
---

## Overview

Expose the full test planning matrix for every sprint through three integrated views — an execution overview per environment, a sprint-level test case matrix, and a regression tracking list — so that QA engineers have one place to define test cases, read execution results, and confirm that all requirements are covered.

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

### TST-M001-F001 — Test suite execution overview

When the testing module is opened, the default view shows a per-environment breakdown of test execution results. Each environment run (PROD, STG, and any other configured environment) is displayed as its own section with a date stamp and an overall progress indicator. Within each section, every module is listed as a row showing the section name, pass rate, total test count, number of passed, failed, and blocked cases, an overall progress percentage, and a colour-coded status badge. The status badge reflects whether the module is fully completed, requires attention, or is actively failing. This gives QA engineers and stakeholders an instant picture of product quality per environment without requiring individual case drilldowns.

---

### TST-M001-F002 — Test case planning matrix

Within each module row, QA engineers can expand a sprint detail view that presents the structured test case planning matrix for that module. Each test case occupies its own accordion row showing the unique test ID badge, the test description, and an expanded area containing the full test steps, expected results, pre-conditions, and current pass/fail/blocked status. The test case records originate from structured JSON planning files committed directly to the repository — the system reads these files and renders them automatically when they are pushed. Each test case must carry a globally unique numeric ID (e.g. ID-8456), which is the anchor used to link the planning record to its downstream execution result received from the CI pipeline.

---

### TST-M001-F003 — Regression test tracking

The regressions tab surfaces all regression test scenarios generated or manually defined for the current development cycle. Regression entries are organised into two collapsible sections: in-progress regressions and completed regressions. Each row shows the regression scenario title, the triggering module or requirement, the impacted area, the current execution status, and a link to the generating agent run. Completed regressions can be collapsed to reduce visual noise. The classification and initial population of regression scenarios is driven by the AI regression agent described in TST-M003, but QA engineers can review entries and mark them as approved directly from this tab.

---

### TST-M001-F004 — Requirement-to-test traceability

Every test case in the planning matrix carries a reference to the requirement module or functionality it was written to verify. The traceability link is established in the planning JSON at the time the test case is authored and is rendered in the expanded detail view of each test case row. Traceability is bidirectional: from the requirements module a user can navigate to the linked test cases, and from a test case they can follow the link back to the specific requirement functionality. Coverage status per requirement functionality is derived from the aggregated pass/fail state of all test cases linked to that functionality and updates automatically when new CI results arrive via the pipeline described in TST-M002.
