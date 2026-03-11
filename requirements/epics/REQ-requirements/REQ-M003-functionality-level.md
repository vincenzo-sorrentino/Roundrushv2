---
id: REQ-M003
title: Functionality Level View
epic: REQ
status: draft
prototype_route: /requirements/module
functionalities:
  - REQ-M003-F001
  - REQ-M003-F002
  - REQ-M003-F003
  - REQ-M003-F004
---

## Overview

Show the functionality-level detail view so that developers and testers can read the full description, expected outcomes, edge cases, and access the linked prototype for a single functionality. The view has four tabs: Description (the default), Acceptance Laws, Functionalities (sibling list), and Prototype.

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

### REQ-M003-F001 — Description tab

The Description tab is the default view when a functionality is opened. It consolidates everything a developer or tester needs in one place: the functionality's metadata, a plain-language description of what it covers, a numbered list of expected outcomes written in context–action–result form, any relevant edge cases or error paths worth knowing about, and a reference to the prototype flow that visualises the feature. Selecting this tab always brings the user back to this full summary.

---

### REQ-M003-F002 — Acceptance Laws tab

The Acceptance Laws tab at functionality level shows the same seven shared laws table that appears at epic and module level, providing a consistent compliance reference regardless of how deep into the hierarchy the user is working. Each row shows the law ID, name, evidence type, and a colour-coded status badge. Because the laws are shared at the epic level, the table is identical for every functionality within that epic.

---

### REQ-M003-F003 — Functionalities tab (sibling list)

When the user is inside a functionality, this tab lists all the other functionalities that belong to the same parent module, making it easy to move between related features without navigating backwards. The currently selected functionality is visually highlighted in the list. Clicking another row navigates to it immediately — the breadcrumb, the detail title, and all tabs update in place so the user never loses their sense of position.

---

### REQ-M003-F004 — Prototype tab

At functionality level the Prototype tab shows a single card for the prototype linked to the parent module. The card includes the prototype's name, version, status badge, a short description, and an "Open prototype" link that opens in a new browser tab. If no prototype is linked to the parent module, the tab shows a clear empty-state message instead of a blank area.
