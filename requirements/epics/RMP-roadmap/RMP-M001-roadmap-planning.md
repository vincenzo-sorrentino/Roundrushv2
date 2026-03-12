---
id: RMP-M001
title: Roadmap Timeline View
epic: RMP
status: draft
prototype_route: /planning/roadmap
functionalities:
  - RMP-M001-F001
  - RMP-M001-F002
  - RMP-M001-F003
  - RMP-M001-F004
  - RMP-M001-F005
---

## Overview

Display an automatically generated, read-only Gantt timeline that covers the entire project lifespan — past sprints shown as historical context and future sprints as the planned horizon. No user edits the data directly; every module item, its position, and its status are derived from sprint metadata and pipeline state stored in the repository. The view is split into two parallel horizontal tracks — Development and Design — and auto-scrolls to bring the current sprint into the visible centre on load.

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

### RMP-M001-F001 — Two-track Gantt canvas

When the roadmap loads it renders a horizontally scrollable canvas divided into two tracks stacked vertically: Development on top and Design below. Each track has a fixed left-side label and a scrollable grid body. A shared timeline header sits above both tracks and scrolls in sync with them. The header is divided into sprint columns — each sprint occupies a number of sub-columns equal to its duration in weeks — showing the sprint number label in the upper row and individual week start dates (`dd/mm`) in the lower row. The current sprint column is visually distinguished with a highlighted background and a dot indicator on its label. Vertical dividers separate sprints across both track grids. On initial load the canvas automatically scrolls so that the current sprint sits at the horizontal centre of the visible viewport.

---

### RMP-M001-F002 — Module items and status colour coding

Each module in the Development and Design tracks is rendered as a horizontal bar that spans its assigned sprint range. The bar displays the module identifier and short title in the format `EPIC-NNN · Short title` (e.g. `AUT-001 · Login form`). The bar background colour encodes the module's delivery status: green for `completed`, blue for `in-dev`, purple for `designing`, and grey for `to-do`. Sprints that precede the project start sprint are filled automatically with placeholder `completed` bars to convey historical continuity — these placeholders are not linked to any requirement and exist only to communicate that work was ongoing in those periods. The two tracks are independent: the same module identifier may appear in both tracks with different statuses and sprint ranges, reflecting the design lifecycle running ahead of or alongside the development lifecycle.

---

### RMP-M001-F003 — Project header and team strip

A header bar at the top of the roadmap section shows the project date range on the left side (`dd/mm/yy – dd/mm/yy`) and the team composition on the right side. The team area shows the total number of team members followed by a row of overlapping avatar thumbnails, one per member. Avatars display the member's profile image when available, and fall back to a two-letter initial badge otherwise. This header is always visible and does not scroll with the timeline grid.

---

### RMP-M001-F004 — Project settings

A settings button in the tab header opens a modal dialog titled with the project name. The modal contains three configuration fields and a team management section. The first field is a date input for the project start date. The second is a date input for the project end date; the system silently clamps this to be no earlier than the start date. The third is a select dropdown for sprint duration with options of one, two, or three weeks. The team management section lists current team members as avatars and provides an add-member button; clicking it opens an inline listbox showing members not yet on the team, each with their avatar and name. Selecting a member adds them to the team and removes them from the picker. A Cancel button closes the modal and discards all unsaved changes. A Save button commits the settings, closes the modal, and immediately regenerates the timeline to reflect the updated date range, sprint grid, and sprint duration.

---

### RMP-M001-F005 — Snapshot and settings entry points

Two icon buttons are rendered in the tab header alongside other sprint-level actions. The settings button (gear icon) opens the project settings modal described in F004. The snapshots button (screen/monitor icon) opens a dropdown menu anchored to that button. The dropdown contains a "New snapshot" action at the top and a grouped list of previously saved snapshots labelled by the sprint in which they were created. Clicking "New snapshot" opens the snapshot modal described in RMP-M002. Selecting an existing snapshot from the list opens that saved snapshot in the snapshot modal, restoring its previously committed module positions, titles, and layout. Clicking outside the open dropdown closes it without side effects.
