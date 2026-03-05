---
id: EP005-M002-F003
title: View module tasks
module: EP005-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As a team member, I want to view all tasks for a module grouped by feature so that I can understand the work breakdown and current progress.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The Tasks tab is active in the detail panel | The user views the content | A table lists tasks grouped under collapsible feature headers |
| 2 | A task row is displayed | The user reads the row | The row shows task title, priority badge, assignee avatar + name, due date, and status badge |
| 3 | A feature group header is displayed | The user clicks it | The group toggles between collapsed and expanded |
| 4 | Tasks have various statuses | The user views status badges | Each status (To do, In progress, Done, Blocked, Paused, Ready for review) is rendered with its distinct colour |
| 5 | Tasks have various priorities | The user views priority badges | Each priority (Urgent, High, Medium, Low) is rendered with its distinct colour |
| 6 | The module has tasks with mixed completion | The user checks the progress bar in the tab nav | The percentage reflects the ratio of completed tasks to total tasks |
