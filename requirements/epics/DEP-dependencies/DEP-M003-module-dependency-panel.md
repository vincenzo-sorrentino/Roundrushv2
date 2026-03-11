---
id: DEP-M003
title: Module-Level Dependency Panel
epic: DEP
status: draft
prototype_route: ~
functionalities:
  - DEP-M003-F001
  - DEP-M003-F002
---

## Overview

Surface a scoped, read-only subset of the global dependency map in the contextual panels where it is most needed: the Dependencies sub-view inside the requirements module detail page (`/requirements/module`) and the Dependencies tab inside the sprint board bottom-sheet (`/planning/kanban`).

Rather than duplicating data, this panel queries the same `Dependency_Edges` payload and filters it to the module currently in context — showing only the edges where that module appears as `from_module` or `to_module`. The panel is intentionally read-only; adding or editing dependencies is done through the global map in DEP-M001 and DEP-M002.

Each row in the panel provides a direct deep-link back to the main dependency map so that the user can jump from a scoped view into the full picture with a single click.

## Acceptance Laws

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |

---

## Functionalities

### DEP-M003-F001 — Scoped dependency list

**User story**

As a developer reviewing a specific module in the requirements view or the sprint board, I want to see only the dependencies that involve that module so that I can quickly assess its coupling without navigating away to the full dependency map.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A module is open in the requirements detail view | The user opens the Dependencies sub-view | The panel resolves the current module's ID and loads only the edges from `Dependency_Edges` where `from_module` or `to_module` matches that ID |
| 2 | A module card is expanded in the sprint board bottom-sheet | The user opens the Dependencies tab | The same scoped filter is applied using the module ID of the card in context |
| 3 | The scoped results are loaded | — | Each row displays: direction indicator (depends on / depended on by), the counterpart module ID, relation type, interface, risk badge, confidence score, and the `why` explanation |
| 4 | The module has no edges in the global map | The panel loads | A clear empty-state message is shown: "No dependencies defined for this module" |
| 5 | The panel renders | — | No controls for creating or editing dependencies are shown; the panel is strictly read-only |

---

### DEP-M003-F002 — Deep-link to main map

**User story**

As a developer, I want to jump from a scoped module dependency row directly into the full global map with that module highlighted so that I can see the wider context without losing my place.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The scoped dependency panel is showing at least one row | — | Each row has a "View in map" action |
| 2 | The user activates "View in map" on a row | — | The browser navigates to `/dependencies/uml` with the module node highlighted and the graph centred on it |
| 3 | The user activates "View in list" on a row | — | The browser navigates to `/dependencies/list` with the module name pre-populated in the search field (DEP-M002-F002 AC4) |
| 4 | The user follows a deep-link and then navigates back | — | The browser back button returns them to the requirements module or sprint board at the exact scroll and tab position they left |
