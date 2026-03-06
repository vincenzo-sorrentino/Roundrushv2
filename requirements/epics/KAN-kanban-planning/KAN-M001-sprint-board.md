---
id: KAN-M001
title: Sprint Board
epic: KAN
status: draft
prototype_route: /planning/kanban
functionalities:
  - KAN-M001-F001
  - KAN-M001-F002
  - KAN-M001-F003
---

## Overview

Show all modules assigned to the current sprint in a table grouped by feature area. The board lets the team sort by any column, apply filters across status, priority, and assignee, and run a free-text search — all at the same time. A sprint selector at the top lets the user switch between sprints and browse history.

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

### KAN-M001-F001 — View sprint modules

**User story**

As a project manager, I want to see all the modules in the current sprint grouped by their feature area so that I can get a clear picture of what is planned and who is working on what.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A sprint has modules assigned to it | The sprint board loads | All modules are displayed in a table, grouped under collapsible feature-area headers |
| 2 | A module row is visible | The user views the board | The row shows the module ID, title, priority, assignee, start date, due date, and status |
| 3 | A feature group is expanded | The user clicks the chevron | The group collapses and its module rows are hidden |
| 4 | A feature group is collapsed | The user clicks the chevron | The group expands and its module rows become visible |
| 5 | A sprint has no modules assigned | The user opens that sprint | An empty-state message is shown instead of the table |

---

### KAN-M001-F002 — Sort and filter modules

**User story**

As a project manager, I want to sort the module table by any column, apply filters for status, priority, and assignee, and search by keyword — so that I can quickly find the modules I care about.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A sortable column header is visible | The user clicks it | The table sorts ascending by that column |
| 2 | A column is already sorted ascending | The user clicks its header again | The table sorts descending by that column |
| 3 | A different column header is clicked | The user changes sort | The table re-sorts ascending by the newly selected column |
| 4 | One or more filter options are selected (Status, Priority, Assignee) | Filters are applied | Only modules matching all selected criteria are shown |
| 5 | An active filter is cleared | The user removes it | The table updates to show all modules that still match remaining criteria |
| 6 | The user types in the search field | Characters are entered | Only modules whose ID or title contain the search text (case-insensitive) are shown |
| 7 | Both filters and a search query are active | The user reads the board | Both criteria are applied together using AND logic |

---

### KAN-M001-F003 — Sprint selection

**User story**

As a project manager, I want to switch between sprints using a dropdown so that I can review what was planned in any past sprint or look ahead to a future one.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The sprint board is displayed | The view loads | The current sprint name is shown with a dropdown trigger next to it |
| 2 | The user clicks the sprint name or dropdown trigger | The trigger is clicked | A dropdown opens listing all sprints with their date ranges |
| 3 | The user selects a different sprint from the dropdown | A sprint is chosen | The dropdown closes and the table updates to show that sprint's modules |
| 4 | The user clicks outside the open dropdown | Focus moves away | The dropdown closes without changing the selected sprint |
| 5 | The user clicks the sprint history action | The action is triggered | The view navigates to the sprint history page |
