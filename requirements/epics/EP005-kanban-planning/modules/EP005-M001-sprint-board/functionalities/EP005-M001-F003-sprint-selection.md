---
id: EP005-M001-F003
title: Sprint selection
module: EP005-M001
status: draft          # draft | ready | in_dev | done
---

## User story
As a project manager, I want to switch between sprints so that I can review past, current, or upcoming sprint plans.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The sprint board is displayed | The user sees the tab header area | The current sprint name is displayed with a dropdown trigger |
| 2 | The sprint selector is closed | The user clicks the sprint name / dropdown trigger | A dropdown opens listing all available sprints with their date ranges |
| 3 | The dropdown is open | The user selects a different sprint | The dropdown closes and the table updates to show modules for the selected sprint |
| 4 | The dropdown is open | The user clicks outside the dropdown | The dropdown closes without changing the selected sprint |
| 5 | The sprint selector area is visible | The user clicks the history action | They are navigated to the sprint history view |
