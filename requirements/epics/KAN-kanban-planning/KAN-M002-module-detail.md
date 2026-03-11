---
id: KAN-M002
title: Module Detail
epic: KAN
status: draft
prototype_route: /planning/kanban
functionalities:
  - KAN-M002-F001
  - KAN-M002-F002
  - KAN-M002-F003
---

## Overview

Let team members open a full-screen detail panel for any module directly from the sprint board. The panel is organised into six tabs — Overview, Dependencies, Tasks, Test Cases, UAT Issues, and Docs — so that all relevant context about a module is available in one place without leaving the sprint board.

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

### KAN-M002-F001 — Open module detail

Clicking any module row on the sprint board opens a full-screen detail panel over the board without navigating away. The panel slides into view with a dimmed backdrop behind it, and the header immediately shows the module's ID and full title. The user can dismiss the panel by clicking the × button, by clicking the dimmed backdrop, or by pressing Escape — all three close it the same way and return full interaction to the board behind. While the panel is open, the page behind it stays in position and does not scroll.

---

### KAN-M002-F002 — Navigate detail tabs

The detail panel organises everything about a module into six tabs — Overview, Dependencies, Tasks, Test Cases, UAT Issues, and Docs — so all relevant context is reachable without opening a separate page. Clicking any tab switches the content area instantly; the active tab is visually highlighted so the user always knows where they are. A progress indicator in the panel header shows the module's overall completion percentage regardless of which tab is currently selected.

---

### KAN-M002-F003 — View module tasks

Inside the Tasks tab, all tasks for the module are listed in a table grouped by feature area, following the same grouping pattern as the sprint board. Each task row shows the title, priority, assignee, due date, and status. Groups can be expanded and collapsed individually. Status and priority are colour-coded with distinct badges — for example Blocked appears differently from In Progress — so the user can scan severity at a glance without reading every label. A progress bar at the top of the tab shows the ratio of completed tasks to the total.
