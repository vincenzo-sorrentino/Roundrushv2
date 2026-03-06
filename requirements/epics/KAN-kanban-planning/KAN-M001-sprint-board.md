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

When the sprint board loads, the user sees every module assigned to the current sprint arranged in a table, grouped under their feature area. Each row shows the module ID, title, priority, assigned person, start date, due date, and current status at a glance. Feature area groups can be expanded and collapsed individually, which makes it easy to focus on one area while hiding the rest. If a sprint has no modules assigned to it yet, a clear placeholder message is shown instead of an empty table.

---

### KAN-M001-F002 — Sort and filter modules

The board gives users full control over what they see. Clicking any column header sorts the entire table by that column; clicking it again reverses the order. Filter controls for status, priority, and assignee let users narrow down to exactly the work they care about, and a keyword search field lets them find a module by name or ID. All of these work together simultaneously — adding a filter while a search is active applies both criteria at the same time. Removing any filter or clearing the search immediately refreshes the table.

---

### KAN-M001-F003 — Sprint selection

At the top of the board the current sprint name is always visible alongside a dropdown trigger. Clicking it opens a list of all sprints with their date ranges, letting the user jump to any past or upcoming sprint instantly. Clicking outside the open dropdown closes it without changing the currently selected sprint. From this area the user can also navigate to a dedicated sprint history view if they need a longer perspective on what has been delivered.
