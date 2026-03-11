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

### DEP-M003-F001 — Scoped dependency list

When the user opens the Dependencies sub-view on a requirements module detail page, or the Dependencies tab in the sprint board bottom-sheet for a specific module card, the panel resolves the current module's ID and loads only the edges from the global `Dependency_Edges` table where that ID appears as `from_module` or `to_module`. Each row shows a direction indicator (depends on / depended on by), the counterpart module ID, relation type, interface string, risk badge, confidence score, and the `why` explanation in natural language. If the module has no recorded edges, the panel shows a clear empty-state message instead of a blank table. No controls for creating or editing dependencies are shown — the panel is strictly read-only; all authoring happens in the global map via DEP-M001 and DEP-M002.

---

### DEP-M003-F002 — Deep-link to main map

Every row in the scoped panel provides two navigation actions: "View in map" and "View in list". Activating "View in map" navigates to `/dependencies/uml` with that module node highlighted and the graph centred on it. Activating "View in list" navigates to `/dependencies/list` with the module name pre-populated in the search field, matching the deep-link pre-filter behaviour described in DEP-M002. After following either deep-link, the browser back button returns the user to the requirements module or sprint board at the exact scroll position and tab they left.
