---
id: KAN-M002-F001
title: Open module detail
module: KAN-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As a team member, I want to click a module row to open its detail panel so that I can inspect its full information without leaving the sprint board.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The sprint board table is displayed | The user clicks a module row | A full-screen overlay opens with a dimmed backdrop and the module detail panel slides up |
| 2 | The detail panel is open | The user clicks the X close button | The panel animates out and the sprint board is fully interactive again |
| 3 | The detail panel is open | The user clicks the dimmed backdrop area | The panel closes |
| 4 | The detail panel is open | The user presses the Escape key | The panel closes |
| 5 | The detail panel is open | The page scroll behind the overlay | Scrolling is locked on the body to prevent background content from scrolling |
| 6 | The detail panel header is visible | The user reads it | It displays the module ID and module title |
