---
id: EP005-M001-F001
title: View sprint modules
module: EP005-M001
status: draft          # draft | ready | in_dev | done
---

## User story
As a project manager, I want to see all modules in the current sprint grouped by feature area so that I can understand the sprint scope at a glance.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A sprint contains modules assigned to feature groups | The user navigates to the Planning > Kanban view | A table displays all modules grouped under collapsible feature-area headers |
| 2 | A module row is displayed | The user reads the row | The row shows module ID, title, priority badge, assignee avatar + name, start date, due date, and status badge |
| 3 | A feature group contains modules | The user clicks the group header chevron | The group collapses and its module rows are hidden |
| 4 | A feature group is collapsed | The user clicks the group header chevron again | The group expands and its module rows are visible |
| 5 | The sprint has no modules | The user views the board | An empty state message is shown indicating no modules are assigned |
