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

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |

---

## Functionalities

### KAN-M002-F001 — Open module detail

**User story**

As a team member, I want to click on a module row to open a full detail panel so that I can inspect the module's full context without leaving the sprint board.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The sprint board is showing module rows | The user clicks a module row | A full-screen overlay appears with a dimmed backdrop and the detail panel slides up into view |
| 2 | The detail panel is open | The user clicks the × close button | The panel animates out and the sprint board becomes interactive again |
| 3 | The detail panel is open | The user clicks the dimmed backdrop | The panel closes in the same way as the close button |
| 4 | The detail panel is open | The user presses the Escape key | The panel closes |
| 5 | The detail panel is open | The page is in this state | Scrolling on the body is locked so the background does not move |
| 6 | The detail panel header is visible | The panel is open | It displays the module's ID and full title |

---

### KAN-M002-F002 — Navigate detail tabs

**User story**

As a team member, I want to switch between the tabs in the module detail panel so that I can access the type of information I need (overview, tasks, dependencies, etc.) without opening a new page.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The detail panel has just opened | The view renders | Six tabs are visible: Overview, Dependencies, Tasks, Test Cases, UAT Issues, Docs |
| 2 | The Tasks tab is active (default) | The user clicks a different tab | The clicked tab becomes active and highlighted, and the content area updates |
| 3 | The currently active tab is clicked | The user clicks it again | Nothing changes |
| 4 | The tab navigation area is visible | The panel is open | A progress indicator shows the module's overall completion percentage |
| 5 | A tab other than Tasks is selected | The content area loads | A placeholder message is shown for tabs that are not yet implemented |

---

### KAN-M002-F003 — View module tasks

**User story**

As a team member, I want to see all the tasks for a module in the Tasks tab, grouped by feature, so that I can understand the granular work breakdown and track progress.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The Tasks tab is active | The content area loads | All tasks are listed in a table grouped under collapsible feature-area headers |
| 2 | A task row is visible | The user views the tab | The row shows the task title, priority, assignee, due date, and status |
| 3 | A feature group header is visible | The user clicks it | The group toggles between collapsed and expanded states |
| 4 | Tasks have various statuses | The user views them | Status badges use distinct colours: To do, In progress, Done, Blocked, Paused, Ready for review |
| 5 | Tasks have various priorities | The user views them | Priority badges use distinct colours: Urgent, High, Medium, Low |
| 6 | The module has a mix of completed and in-progress tasks | The Tasks tab is open | A progress bar shows the ratio of completed tasks to the total |
