---
id: TST-M002
title: Automated Execution & CI Integration
epic: TST
status: draft
prototype_route: ~
functionalities:
  - TST-M002-F001
  - TST-M002-F002
  - TST-M002-F003
  - TST-M002-F004
---

## Overview

Handle the end-to-end pipeline from test execution in CI to visual state synchronisation on the dashboard. The module operates on a strict Git-as-Truth principle — no test status is ever updated manually through the UI; all state changes arrive as structured API payloads triggered by repository events and CI/CD pipelines.

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

### TST-M002-F001 — CI execution result ingestion

When the CI/CD pipeline completes a test suite run, it sends a structured JSON payload to the backend API. The payload declares the test run layer (unit, integration, or end-to-end), then enumerates each test result as an object containing the unique test ID, the pass/fail/blocked status, an optional evidence URL pointing to CI logs or a screen recording, and an ISO-8601 execution timestamp. The backend receives this payload and updates the corresponding test case records in the database, matching each result to the test case that holds the same unique ID. The test runner's custom reporter is configured to parse each test title, extract the embedded unique ID using a defined pattern, determine the pass/fail state, and format the outbound payload automatically. No browser-side or manual action is required for this update to take effect.

---

### TST-M002-F002 — Test state synchronisation

The frontend test planning matrix reflects the live state from the database by fetching module data on load and after each significant pipeline event. The synchronisation architecture ensures the planning matrix (defined in Git and injected via the planning sync pipeline) and the execution results (sent by CI) converge on the same unique ID anchor. This one-way data flow guarantees that the dashboard is always a verifiable reflection of what happened in the pipeline. Pushing updated planning JSON to the repository triggers a sync pipeline event that POSTs the file content to the backend, populating or updating the test table with Pending statuses for any new cases and preserving existing execution records for unchanged IDs. Execution payloads subsequently overwrite only the status fields, leaving planning data intact.

---

### TST-M002-F003 — Execution metadata rendering

Alongside the pass/fail badge, each test case row renders the most recent execution metadata: the timestamp of the last run, the environment and pipeline in which it was executed, and, when available, a direct link to the CI log or evidence URL. For tests that ended in a failure, the evidence URL renders as a prominent linked button so QA engineers can access the build artefact or recording without leaving the dashboard. Environment metadata is passed as part of the CI payload and is stored per execution result, meaning the same test case can accumulate separate last-run records per environment. Each execution result also carries the testing layer it belongs to (unit, integration, or end-to-end) so coverage can be broken down by layer in the overview.

---

### TST-M002-F004 — Acceptance Law progress tracking

The system aggregates execution results at the module level to compute Acceptance Law compliance progress. AL-02 (automated unit and integration tests passing at full coverage) and AL-04 (end-to-end tests implemented and passed) are directly driven by the CI payloads received for each testing layer. When all test cases for a module have a passing status and the coverage threshold is met for every layer, the corresponding law updates its status badge from pending to compliant. The testing dashboard summarises Acceptance Law status across all modules so QA leads can see overall compliance progression without navigating into individual requirement files. A module-level drill-down shows which specific test cases are blocking a law from reaching compliant status.
