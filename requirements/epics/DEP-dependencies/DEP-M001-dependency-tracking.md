---
id: DEP-M001
title: Dependency Map — Graph View
epic: DEP
status: draft
prototype_route: /dependencies/uml
functionalities:
  - DEP-M001-F001
  - DEP-M001-F002
  - DEP-M001-F003
---

## Overview

Render the full global dependency map as an interactive UML component diagram so that developers and QA teams can visually trace exactly how modules connect, understand the blast radius of any proposed change, and spot high-risk coupling at a glance.

The underlying data model is a Directed Acyclic Graph (DAG). Every edge in the graph represents a directional dependency between two modules: a `from_module` that relies on a `to_module` through a defined interface. Each edge carries a risk level (High / Medium / Low), a confidence score produced by the local AI agent from repository analysis, and a natural-language explanation of why the dependency exists. The graph view feeds this same JSON payload into a canvas renderer; the list view in DEP-M002 feeds it into a table.

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

### DEP-M001-F001 — Dependency graph canvas

**User story**

As a developer or QA engineer, I want to see the full module dependency map rendered as an interactive graph so that I can understand how modules are connected and visually trace the blast radius of any change.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The dependency payload has been loaded | The graph canvas mounts | Every node from the JSON is rendered at its computed position with its correct type styling (UI node, service node, endpoint node) |
| 2 | The graph contains edges | The graph canvas mounts | Every directed edge is drawn as a Bézier curve from `from_module` to `to_module` with colour coding matching its risk level: red for High, amber for Medium, blue for Low |
| 3 | The graph is larger than the viewport | The user drags the canvas | The entire graph pans smoothly without any node or edge being clipped |
| 4 | An off-canvas trailing edge is present in the data | The graph renders | The edge draws to its explicit exit point and fades out, clearly indicating the connection continues beyond the visible area |
| 5 | A node carries a confidence score below 0.80 | The graph renders | A visual indicator on that node signals that human verification of the detected dependency is recommended |

---

### DEP-M001-F002 — Node detail panel

**User story**

As a developer, I want to click any node in the graph and see its full connection detail so that I can assess whether a planned change to that module is safe.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The graph is rendered | The user clicks a node | All edges connected to that node are visually highlighted; all unrelated edges are dimmed |
| 2 | A node is selected | The detail panel opens | The panel displays: module ID, all incoming and outgoing dependencies, the interface string for each edge (`GET /requirements/tree`, `POST /sprint-cycles`, etc.), the risk level badge, the confidence score, and the `why` field in natural language |
| 3 | The detail panel is open | The user clicks anywhere outside the panel or on a different node | The panel closes or switches to the newly selected node; the original node returns to its default visual state |
| 4 | A node is selected | The detail panel is open | A "View in list" action is available that navigates to `/dependencies/list` with that module pre-filtered |

---

### DEP-M001-F003 — View mode toggle

**User story**

As a user, I want to switch from the graph view to the list view without losing context so that I can choose the format that best suits my current task.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on `/dependencies/uml` | The user activates the list view toggle | The browser navigates to `/dependencies/list` (DEP-M002) |
| 2 | The user navigates to `/dependencies/list` | The page loads | The graph view toggle is shown and returns the user to `/dependencies/uml` |
| 3 | A module is pre-filtered via the "View in list" action from F002 | The list view loads | The table in DEP-M002 opens with that module's name already applied as a filter |

