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
  - DEP-M001-F004
---

## Overview

Render the full global dependency map as an interactive UML component diagram so that developers and QA teams can visually trace exactly how modules connect, understand the blast radius of any proposed change, and spot high-risk coupling at a glance.

The underlying data model is a Directed Acyclic Graph (DAG). Every edge in the graph represents a directional dependency between two modules: a `from_module` that relies on a `to_module` through a defined interface. Each edge carries a risk level (High / Medium / Low), a confidence score produced by the local AI agent from repository analysis, and a natural-language explanation of why the dependency exists. The graph view feeds this same JSON payload into a canvas renderer; the list view in DEP-M002 feeds it into a table.

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

### DEP-M001-F001 — Dependency graph canvas

When the view loads, the full dependency map is rendered as an interactive canvas with every node positioned according to its computed layout. The graph uses three distinct node types, each with its own visual treatment:

- **UI nodes** — thin pill-shaped labels representing frontend source modules (e.g. `UI-REQ (Backlog)`, `UI-PLAN (Planning)`). They are the originating points of dependency chains.
- **Service nodes** — card-shaped nodes representing backend API or service modules. Each card displays the module ID, a risk badge (High / Medium / Low), the relation source type (e.g. `calls_api`, `triggers_workflow`), the confidence score, the REST endpoint string, and a short description.
- **Endpoint nodes** — simplified cards representing REST endpoint definitions that appear as second-level targets in the graph, showing only the endpoint label and a description.

Every directed edge is drawn as a Bézier curve from the right-centre port of the source node to the left-centre port of the target node. Small coloured dots mark each connection port to make the flow direction unambiguous. Edge colours carry semantic meaning: blue for direct API dependencies (`calls_api`), purple for workflow triggers (`triggers_workflow`), red for high-risk paths, and amber for off-canvas trailing connections. Off-canvas trailing edges — connections that exit the visible area — are drawn to their explicit exit point and fade out to signal the dependency chain continues beyond the frame.

The user can drag to pan the canvas freely; no node or edge is clipped. Any node carrying a confidence score below 0.80 shows a visual indicator prompting human verification of that AI-detected connection.

---

### DEP-M001-F002 — Node detail panel

Clicking a node highlights all edges connected to it and dims everything unrelated, making the impact of that module immediately obvious. A detail panel opens alongside the graph showing the module's ID, every incoming and outgoing dependency, the interface string for each edge (e.g. `GET /requirements/tree`, `POST /sprint-cycles`), the risk level badge, the confidence score, and the `why` field in natural language. Clicking outside the panel or on a different node closes or switches the panel, returning the original node to its default visual state. A "View in list" action inside the panel navigates to `/dependencies/list` with that module pre-filtered, allowing the user to continue their analysis in the table view.

---

### DEP-M001-F003 — View mode toggle

A toggle control switches between the graph and list representations of the same data. Activating it from `/dependencies/uml` navigates to `/dependencies/list` (DEP-M002); activating it from the list view returns to `/dependencies/uml`. If the user arrived at the list view via the "View in list" action in the node detail panel, the toggled graph view opens with that module's node highlighted, preserving the context the user was already working in.

---

### DEP-M001-F004 — Canvas legend and toolbar controls

A colour-coded legend is anchored to the canvas and is always visible regardless of pan position. It contains four entries that explain the semantic meaning of edge colours: blue for direct dependencies, purple for workflow triggers, red for high-risk paths, and amber for connections that continue off-canvas. This legend is the visual key that makes the graph self-explanatory without requiring the user to open a node or consult external documentation.

The toolbar above the canvas provides two additional controls that work in both views. A **module filter dropdown** lists every distinct source module (`from_module`) in the dataset alongside an "All modules" option; the selected module pre-positions the filter so that switching to the list view opens it already scoped to that module. A **text search field** operates directly on the graph: as the user types, nodes whose label, endpoint, description, or source type do not match the query are visually dimmed — they remain on the canvas but are de-emphasised so the relevant parts of the graph stand out.

