---
id: KAN-M001
title: Current Sprint Board
epic: KAN
status: draft
prototype_route: /planning/kanban
functionalities:
  - KAN-M001-F001
  - KAN-M001-F002
  - KAN-M001-F003
  - KAN-M001-F004
  - KAN-M001-F005
---

## Overview

Show all modules assigned to the active sprint in a reactive, read-only planning board. Modules are grouped by feature area and each row reflects the real-time delivery state of that module, driven entirely by CI/CD pipeline events. The board gives the team a shared, authoritative view of sprint progress with no manual status editing. A sprint selector allows navigation across sprints, and a close sprint action is available once all modules in the active sprint have reached the Done state.

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

### KAN-M001-F001 — Sprint board table view

When the sprint board loads, every module assigned to the active sprint is displayed in a table grouped by feature area. Group rows act as collapsible headers — clicking the caret icon expands or collapses all modules under that group. Each module row shows seven columns: a Requirements chip carrying the module ID and title (with a blocker icon if the module is blocked), Priority (icon and label), Assignee (overlapping avatar group), Last Update (date label), Tasks (completed count / total count), Unit Tests (a progress bar coloured by threshold: green ≥ 80 %, amber ≥ 60 %, red below 60 %), and Status (a coloured badge). Module rows are keyboard accessible — pressing Enter or Space on a focused row opens its detail panel. If a sprint has no modules, an empty-state placeholder is shown.

---

### KAN-M001-F002 — Sort and multi-filter

A filter bar sits above the module table. It contains four multi-select filter dropdowns — Modules, Priority, Assignees, and Statuses — each showing a count badge when active, and a clear option to reset that filter. A free-text search input allows filtering by module ID or title in real time without re-rendering the filter bar. Column headers for Priority, Last Update, Tasks, and Unit Tests are interactive sort triggers; clicking a header sorts the table by that column and clicking it again reverses the direction, indicated by an arrow icon. All active filters, search, and sorting are applied simultaneously. Switching to a different sprint resets all filters and search.

---

### KAN-M001-F003 — Sprint selector and navigation

The sprint selector is rendered in the tab header and shows the active sprint number alongside its date range. Clicking the selector button opens a dropdown listing all sprints (active, closed, and planned), each identified by a coloured status dot (green for active, grey for closed, blue for planned) and the sprint's start–end date range. Selecting any sprint from the list loads that sprint's data into the board and closes the dropdown. Clicking outside the open dropdown closes it without changing the selected sprint. A clock/history icon button navigates the user to the dedicated closed sprint history view at `/planning/old-sprint`.

---

### KAN-M001-F004 — Close sprint

A flagged close-sprint button is rendered in the sprint selector area, but only when the currently displayed sprint has an active status. Clicking it runs a pre-close validation check against all modules in the sprint. If any module is not in a validated, merged-QA, or done state, a warning modal appears listing the incomplete modules with a single Cancel button — the close operation is blocked until they are resolved. If all modules are in a completed state, a confirmation modal appears showing the total number of requirements in the sprint and Confirm / Cancel buttons. Pressing Confirm marks the sprint as closed, which removes the close-sprint button, updates the sprint dot colour to grey, and re-renders the board in its read-only closed state. Pressing Cancel or clicking the backdrop dismisses the modal without any side effects. The Copilot / agentic AI layer independently verifies that all seven Acceptance Laws are computationally confirmed as passing for every module before the confirmation step is presented — if this check has not yet completed, the button is disabled with an in-progress indicator.

---

### KAN-M001-F005 — Reactive CI/CD-driven status system

Module and task statuses on the board are maintained entirely by the CI/CD pipeline and cannot be manually edited by any user. Each status transition is triggered by a specific automated event. A task moves from TODO to IN PROGRESS when a feature branch following the naming convention `feat/EPIC-MODULE-*` (enforced locally by Husky and server-side by GitHub Actions) receives its first commit push targeting that module. It advances to RFR (Ready for Review) when the linked pull request is marked ready for review and is no longer in draft state. It transitions to MERGED when the CI pipeline has verified passing coverage at 95 % or above, security scans have returned clean, and at least two required approvals have been recorded. It enters QA when a manual test session JSON file is committed to `/tests/manual/sessions/`. It reaches DONE when the backend computes that all seven Acceptance Laws are passing for that task's module. Any branch name that does not conform to the convention is rejected by the server-side gate and never reaches the board.

