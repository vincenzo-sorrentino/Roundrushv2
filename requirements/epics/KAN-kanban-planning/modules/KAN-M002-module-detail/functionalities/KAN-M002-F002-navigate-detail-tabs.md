---
id: KAN-M002-F002
title: Navigate detail tabs
module: KAN-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As a team member, I want to switch between tabs in the module detail panel so that I can review different aspects of the module (overview, dependencies, tasks, tests, UAT issues, docs).

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The detail panel is open | The user sees the tab navigation bar | Six tabs are visible: Overview, Dependencies, Tasks, Test Cases, UAT Issues, Docs |
| 2 | The Tasks tab is active by default | The user clicks a different tab | The clicked tab becomes active (highlighted) and its content area is displayed |
| 3 | A tab is active | The user clicks the same tab again | Nothing happens; the tab remains active without flickering |
| 4 | The tab navigation bar is visible | The user sees the progress indicator | A progress bar shows the module's overall completion percentage |
| 5 | A non-Tasks tab is selected | The user views the content area | A placeholder message is shown for tabs not yet implemented |
