---
id: KAN-M001-F002
title: Sort and filter modules
module: KAN-M001
status: draft          # draft | ready | in_dev | done
---

## User story
As a project manager, I want to sort, filter, and search modules in the sprint board so that I can quickly find specific items or focus on a subset.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The module table is displayed | The user clicks a sortable column header | The table rows are sorted by that column in ascending order |
| 2 | The table is sorted ascending by a column | The user clicks the same column header again | The sort order toggles to descending |
| 3 | The table is sorted by a column | The user clicks a different column header | The table re-sorts by the new column in ascending order |
| 4 | Filter dropdowns are available (Status, Priority, Assignee) | The user opens a filter dropdown and selects one or more options | Only modules matching all active filter criteria are displayed |
| 5 | One or more filters are active | The user clears a filter | The filter is removed and the table updates to reflect remaining active filters |
| 6 | A search input is visible above the table | The user types a query | Only modules whose ID or title contains the search text (case-insensitive) are displayed |
| 7 | Filters and search are both active | The user views the table | Both criteria are applied; only modules matching filters AND search query are shown |
