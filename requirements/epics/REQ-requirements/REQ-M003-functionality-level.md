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
---

## Overview

Show the functionality-level detail view so that developers and testers can read the complete specification for a single functionality. Unlike the epic and module levels, the functionality view has no tab bar — all information is rendered in a single content card that the user reads top to bottom.

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

### REQ-M003-F001 — Functionality description card

When a functionality node is selected in the explorer tree, the main panel renders a single content card with no tab bar. The card opens with a heading labelled “Description”, followed by a YAML-style metadata block showing the functionality ID, parent module ID, and short title. Below the metadata the card is divided into four sections rendered in order: User story (a plain-language sentence describing the actor, their intent, and the desired outcome), Acceptance criteria (a numbered list in Given / When / Then form covering all key paths including success, error, and edge paths), Edge cases and negative paths (free-form prose covering non-happy-path scenarios, invalid inputs, and security considerations), and Prototype references (a plain-text reference identifying the linked prototype and the specific flow within it). All content in this card is HTML-escaped before rendering.

---

### REQ-M003-F002 — Sibling functionality navigation via the explorer tree

From the functionality view the user navigates to sibling functionalities — other functionalities belonging to the same parent module — by clicking the relevant node in the explorer sidebar rather than through a dedicated tab. The explorer tree expands the parent module automatically when a functionality is active and highlights the current node, making all siblings visible at a glance. Clicking a sibling in the tree loads it in the main panel and updates the breadcrumb. The currently active functionality is visually distinguished from the others in the tree.

---

### REQ-M003-F003 — Prototype access from functionality context

The functionality description card includes a Prototype references section at the bottom that names the prototype and flow associated with the functionality. The reference is a plain-text label — no interactive button inside the card itself. Access to the actual prototype is available through the Prototypes tab at module level (REQ-M002-F004), which the user can reach by navigating up one level to the parent module in the explorer tree.
