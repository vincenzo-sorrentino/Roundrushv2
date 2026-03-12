---
id: RMP-M002
title: Roadmap Snapshot
epic: RMP
status: draft
prototype_route: /planning/roadmap
functionalities:
  - RMP-M002-F001
  - RMP-M002-F002
  - RMP-M002-F003
  - RMP-M002-F004
  - RMP-M002-F005
---

## Overview

Allow product managers to open an editable working copy of the live roadmap canvas during planning sessions and stakeholder meetings. A snapshot is a named clone of the current roadmap state where module bars can be freely repositioned and resized to explore schedule projections without affecting the authoritative read-only view. Saved snapshots are preserved and can be reopened at any time from the snapshots dropdown.

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

### RMP-M002-F001 — Snapshot modal canvas

Clicking "New snapshot" from the snapshots dropdown opens a full-screen modal dialog overlaying the roadmap. The modal header shows the title "Roadmap Snapshot" on the left and a row of action buttons on the right: export as image, export as PDF, save, and close. The modal body renders a complete copy of the Gantt canvas — both tracks, all module bars, the sprint header, and the timeline grid — initialised with the same scroll position as the live roadmap at the moment of opening. The snapshot canvas is fully interactive: module bars that are not in a `completed` status can be dragged and resized. Completed modules are locked and cannot be repositioned. Closing the modal without saving discards all unsaved edits and returns focus to the live roadmap. No changes made inside a snapshot are ever reflected in the live read-only view.

---

### RMP-M002-F002 — Drag to reposition modules

Inside the snapshot canvas, a non-completed module bar can be picked up by pressing and holding the primary mouse button anywhere on the bar. While dragging, the original bar becomes invisible in the grid and a floating ghost clone follows the cursor freely. Simultaneously, a translucent drop-indicator bar snaps to the nearest valid grid column in the same track, showing where the module will land when released. The drop target column is calculated by measuring the cursor position relative to the track grid and snapping to week-column boundaries, preserving the grab offset so the bar does not jump to the cursor's left edge. If the snapped position would collide with another bar on the same grid row, the system automatically places the indicator on the first available row below. On mouse release the ghost and indicator are removed, the module bar is committed to the new column and row, and the canvas re-renders. Drag is constrained to the same track — modules cannot be moved between the Development and Design tracks via drag.

---

### RMP-M002-F003 — Resize module spans

Each non-completed module bar in the snapshot canvas has two transparent resize handles: one attached to its left edge and one to its right edge. Pressing and holding on the right handle and moving the mouse horizontally extends or contracts the bar from its end. Pressing and holding on the left handle moves the bar's start position while keeping the end column fixed, effectively changing both the start column and the span length simultaneously. Column snapping is applied during the drag so the bar always aligns to week-column boundaries. The minimum span is one week column. The bar cannot be resized beyond the last column of the timeline grid. Visual feedback (a resize cursor) is applied to the document body during the operation to prevent accidental text selection.

---

### RMP-M002-F004 — Save and name a snapshot

Clicking the save button in the snapshot modal header opens a brief naming interaction where the user can assign a label to the current layout state. The saved snapshot records the full module position and span overrides applied during the session, associated with the sprint label of the current active sprint at the time of saving. After saving, the snapshot is appended to the snapshots dropdown list in the live roadmap view, grouped under that sprint's label. Subsequent saves of the same session overwrite the snapshot rather than creating a duplicate. Snapshots persist across page reloads and sessions.

---

### RMP-M002-F005 — Export snapshot

The snapshot modal header provides two export actions. The image export button captures the visible snapshot canvas as a raster image file (PNG) and triggers a browser download. The PDF export button renders the snapshot canvas to a PDF document and triggers a download. Both exports include the full canvas with both tracks and the timeline header as displayed in the modal at the time of export, including any repositioning or resizing performed in the current session. Only the canvas area is exported — the modal chrome (header buttons, modal frame) is excluded from the output.