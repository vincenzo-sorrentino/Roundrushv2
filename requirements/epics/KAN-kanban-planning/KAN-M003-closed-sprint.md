---
id: KAN-M003
title: Closed Sprint
epic: KAN
status: draft
prototype_route: /planning/old-sprint
functionalities:
  - KAN-M003-F001
  - KAN-M003-F002
  - KAN-M003-F003
  - KAN-M003-F004
  - KAN-M003-F005
  - KAN-M003-F006
  - KAN-M003-F007
  - KAN-M003-F008
---

## Overview

Provide a read-only record of every closed sprint, structured as a tabbed report card. The view covers the sprint's delivery summary, all issues raised across stakeholder, UAT, and production channels, the finalized design items, and the automated test coverage snapshot. The sprint history button on the active sprint board navigates directly to this view, where the user can switch between past sprints using a dedicated selector.

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

### KAN-M003-F001 — Closed sprint overview

The Overview tab shows a summary dashboard for the selected closed sprint. Four stat cards are displayed: Total Requirements (count of modules in the sprint), Completed (count of modules that reached Done status), Tasks Closed (completed tasks / total tasks), and Average Test Coverage (mean unit-test percentage across all modules). Below the stat cards, all modules in the sprint are listed grouped by feature area. Each row shows the module ID, title, priority icon and label, task completion ratio, test coverage percentage coloured by threshold, and final status badge. The view is fully read-only — no editing interaction is available.

---

### KAN-M003-F002 — Stakeholders Issues Log

The Stakeholders Issues Log tab lists all issues raised by stakeholders during the sprint. Each row shows: the issue ID, the issue title, the reporter's avatar, a priority icon and label, a status badge (Open / Resolved / Won't fix / Pending), and the date the issue was logged. If no stakeholder issues were raised during the sprint, an empty-state message with a check icon confirms this. The table is sortable but read-only.

---

### KAN-M003-F003 — UAT Issues Log

The UAT Issues Log tab shows issues surfaced during user acceptance testing sessions conducted in the sprint, using the same table layout as the Stakeholders Issues Log: issue ID, title, reporter avatar, priority, status badge, and date. If the sprint produced no UAT issues, an empty-state confirmation message is shown instead.

---

### KAN-M003-F004 — PROD Issues Log

The PROD Issues Log tab lists production incidents that occurred and were attributed to the sprint, using the same table layout as the other issue log tabs. Issues scoped to production are distinguished from UAT and stakeholder issues by their IDs (prefixed PRD-). If no production incidents were logged for the sprint, a confirming empty-state is shown.

---

### KAN-M003-F005 — Finalized Design tab

The Finalized Design tab lists design artefacts that were signed off as final during the sprint. Each row shows the requirement ID and title, the priority (sortable by clicking the Priority column header), the finalisation date, and a Prototype link icon. If a registered prototype route exists for the item, the icon is an active link that opens the prototype; if no route is available, the icon is shown in a disabled state. The sort direction toggles between descending and ascending on each click of the Priority header.

---

### KAN-M003-F006 — Automated Tests Coverage

The Automated Tests Coverage tab presents the snapshot of test coverage taken at the moment the sprint was closed. A summary row shows aggregate percentages and covered / total counts for four dimensions: Statements, Branches, Functions, and Lines. Each percentage is colour-coded by threshold (green ≥ 80 %, amber ≥ 60 %, red below 60 %). Below the summary, a per-file breakdown table shows the same four metrics for every source file included in the coverage report. File paths are displayed with a file icon. The data in this tab is immutable — it reflects the state of the codebase at sprint close and does not update retroactively.

---

### KAN-M003-F007 — Sprint history selector

A sprint selector rendered in the tab header shows the number and date range of the currently viewed closed sprint. Clicking the selector button opens a dropdown listing all closed sprints, each identified by a grey status dot, the sprint number, and the start–end date range. Selecting a sprint from the list switches all six tabs to display that sprint's data and closes the dropdown. Clicking outside the open dropdown closes it without changing the current selection. Active and planned sprints are never shown in this selector — it is scoped exclusively to closed sprints.

---

### KAN-M003-F008 — Export release notes

A card header sits above the tab navigation and displays the sprint title (e.g. "Release notes Sprint 12") and the release date. Two download buttons are provided: Download PDF and Download XLS. Activating either button initiates an export of the current sprint's full release notes content — covering all six tabs — in the selected format. In the prototype, a transient toast notification confirms that the export would proceed.
