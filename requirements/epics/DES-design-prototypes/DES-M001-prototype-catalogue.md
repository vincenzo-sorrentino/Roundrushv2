---
id: DES-M001
title: Prototype Catalogue
epic: DES
status: draft
prototype_route: /prototypes
functionalities:
  - DES-M001-F001
  - DES-M001-F002
  - DES-M001-F003
---

## Overview

Provide a navigational index that surfaces every available prototype flow in the system as a browsable catalogue, accessible from the RoundRush logo shortcut in the sidebar. Prototypes are grouped into named categories — Design System, Marketing Website, and Module Prototypes — so that team members can orient themselves and open any prototype directly from a single place without knowing the exact route in advance.

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

### DES-M001-F001 — Grouped prototype sections

The catalogue page is divided into named sections, each representing a logical category of prototypes. Each section carries a heading, a one-line description, and a grid of prototype cards below it. The current categories are Design System (foundations, tokens, and component documentation), Marketing Website (public-facing MVP pages served as standalone HTML files), and Module Prototypes (interactive flows tied to specific requirement modules). New categories are added by appending a group entry in the catalogue data — no structural changes to the rendering logic are required.

---

### DES-M001-F002 — Prototype card

Each item in a section is rendered as a clickable card containing the prototype title, a one-line subtitle that describes its content, and a status badge. When the prototype belongs to a requirement module, the card also shows the linked epic identifier and module code as secondary metadata. The status badge reflects the prototype's current review state: `approved` (customer-approved), `draft` (in progress), or `archived` (superseded). Cards are keyboard-navigable and the entire card surface is the interactive target.

---

### DES-M001-F003 — In-app and external routing

Clicking a card whose route ends in `.html` opens the prototype in a new browser tab so that standalone HTML/CSS/JS prototypes can be viewed without breaking the main application's navigation context. Clicking a card with an internal route navigates to that route within the single-page app. The distinction is derived entirely from the route value stored in the prototype registry; no additional flag or manual categorisation is needed. Both navigation modes use the same card rendering component.
