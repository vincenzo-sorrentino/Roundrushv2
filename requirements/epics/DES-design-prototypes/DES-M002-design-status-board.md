---
id: DES-M002
title: Design Status Board
epic: DES
status: draft
prototype_route: /design/tab
functionalities:
  - DES-M002-F001
  - DES-M002-F002
  - DES-M002-F003
  - DES-M002-F004
  - DES-M002-F005
---

## Overview

Give designers and project managers a single board where the design status of every active requirement is visible at a glance, sortable by any column, and directly linked to the associated clickable prototype. The board is split into a main working list for requirements currently in the design pipeline and a collapsible Ready for sprint backlog section for requirements whose design has been completed and approved, awaiting sprint selection by the development team.

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

### DES-M002-F001 — Design status tracking table

The board renders requirements as rows in a sortable table. Each row shows the requirement identifier and title, a priority badge (urgent, high, medium, low) with a corresponding colour-coded chevron icon, the date of the last design update, an avatar group showing up to three assigned team members, a prototype link icon, and a status badge. The entire table is sortable by requirement ID, priority level, last update date, and current status; clicking an active sort column reverses the direction. Sort state is maintained in component memory and does not persist across page navigations.

---

### DES-M002-F002 — Design status lifecycle

Each requirement moves through a defined sequence of design states: `to-do` (design not yet started), `in-progress` (design work underway), `ready-for-review` (design complete, pending stakeholder or lead sign-off), `approved` (design signed off), and `ready-for-sprint` (approved and queued for the next sprint planning). The status badge on each row reflects the current state with a distinct background and text colour. Requirements in the `to-do` state with no prototype link do not show a clickable icon. Requirements in `in-progress` may carry a link icon that opens the viewer overlay but shows an empty-state screen when the prototype is not yet ready. Requirements in `ready-for-review`, `approved`, and `ready-for-sprint` states navigate to the fully rendered prototype viewer.

---

### DES-M002-F003 — Ready for sprint backlog section

Below the main table a collapsible section groups all requirements that have reached `ready-for-sprint` status. The section header shows the label "Ready for sprint" followed by the item count and a caret icon indicating collapsed or expanded state. Clicking the header toggles visibility. When expanded the section renders the same sortable table structure as the main list, sharing the active sort column and direction. This separation keeps approved, sprint-ready work visually distinct from requirements still in the active design pipeline.

---

### DES-M002-F004 — Prototype viewer overlay

Clicking the prototype link icon on any row that has a linked prototype opens a full-screen overlay that renders a wireframe preview of the prototype. The overlay header displays the source file path on the left and a row of controls on the right: a theme toggle (light and dark), a device toggle (desktop and mobile), an info panel toggle button, and a close button. Switching theme or device updates only the canvas wireframe without re-rendering the entire overlay. Pressing Escape or clicking the close button dismisses the overlay and returns focus to the row that opened it. The overlay does not implement a backdrop-click dismiss to avoid accidental closure.

---

### DES-M002-F005 — Prototype info panel

Within the viewer overlay, toggling the info button slides open a collapsible aside panel on the right side of the canvas. The panel lists structured metadata about the selected prototype: the linked epic name, the linked module code, the prototype title, the source file path, the file type (always `HTML` for the current storage model), the date of the last design update, and the version string. The panel can be closed with the same toggle button or with the close button inside the panel header. When closed the canvas expands to fill the available width without a page reload.
