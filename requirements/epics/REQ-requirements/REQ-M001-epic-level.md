---
id: REQ-M001
title: Epic Level View
epic: REQ
status: draft
prototype_route: /requirements/module
functionalities:
  - REQ-M001-F001
  - REQ-M001-F002
  - REQ-M001-F003
  - REQ-M001-F004
  - REQ-M001-F005
  - REQ-M001-F006
  - REQ-M001-F007
---

## Overview

Show the epic-level detail view so that stakeholders can understand the overall epic and drill into its components. The view includes an explorer sidebar for navigating the full requirement hierarchy, a summary metrics grid, and four tabs: Description, Acceptance Laws, Modules, and Prototypes.

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

### REQ-M001-F001 — Explorer navigation

A collapsible tree sidebar lets users browse the entire requirements hierarchy — epics at the top, then modules, then functionalities — without losing their place in the main panel. Clicking a tree node loads that item's detail and highlights the node so the user always knows what they're looking at. Folder nodes (epics and modules) can be expanded and collapsed individually. A search box inside the explorer filters the tree in real time, automatically expanding ancestor folders to surface matching nodes, and clears back to the previous state when the search input is removed. Each node carries a small colour-coded status dot so the user can assess the state of items at a glance while browsing.

---

### REQ-M001-F002 — Breadcrumb navigation

A breadcrumb trail at the top of the detail panel always reflects the user's exact position in the hierarchy. At epic level it shows the epic title alone. At module level it shows the epic title and the module title separated by a slash. At functionality level it shows all three segments in sequence. This gives users a constant sense of location as they navigate deeper into the structure.

---

### REQ-M001-F003 — Epic summary metrics

When viewing an epic, a compact metrics grid below the breadcrumb gives an instant health snapshot: how many acceptance laws are currently passing out of the total, and how many modules are compliant out of the total. This lets product owners check the overall state of an epic without reading through all the detail. The grid only appears at the epic level — it is not shown when navigating inside a module or functionality.

---

### REQ-M001-F004 — Description tab

The Description tab presents a complete picture of the epic: its core metadata (ID, short title, full title, design state, and module list), its objective written in plain language, a bullet list of everything that is in scope, and a bullet list of what is explicitly out of scope. This is the primary reference for anyone trying to understand what the epic is about and what it intentionally does not cover.

---

### REQ-M001-F005 — Acceptance Laws tab

The Acceptance Laws tab shows a structured table of all seven shared laws that define when work in this epic can be considered complete. Each law has an ID, a name, an evidence field describing what proof is required, and a colour-coded status badge. This tab is the default view when an epic node is first selected, so the compliance picture is always front and centre before diving into modules or prototypes.

---

### REQ-M001-F006 — Modules tab

The Modules tab lists every module that belongs to the epic in a table with its code, title, scope summary, and a colour-coded status badge. An "Open" button on each row navigates directly to that module's detail view, updating the breadcrumb, the sidebar selection, and the full content panel in a single click. If the epic has no modules yet, a clear empty-state message is shown instead of an empty table.

---

### REQ-M001-F007 — Prototypes tab

The Prototypes tab surfaces all design artefacts linked to the epic as a grid of cards. Each card shows the prototype name, version, a status badge, a brief flow description, and a direct link to open it. Prototype links open in a new browser tab so the user never loses their place in the requirements view. If no prototypes have been linked yet, the tab displays a simple "No prototype references" message.
