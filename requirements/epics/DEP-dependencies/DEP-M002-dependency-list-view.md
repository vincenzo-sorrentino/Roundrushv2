---
id: DEP-M002
title: Dependency Map — List View
epic: DEP
status: draft
prototype_route: /dependencies/list
functionalities:
  - DEP-M002-F001
  - DEP-M002-F002
  - DEP-M002-F003
---

## Overview

Render the same global dependency map that powers the graph view (DEP-M001) as a flat, readable table. Where the graph is optimised for visual topology, the list view is optimised for scanning, filtering, and sharing: every edge in the DAG becomes one row, with its natural-language `why` explanation front and centre alongside the risk level, confidence score, and interface string.

The list view and the graph view share exactly the same JSON payload from the `Dependency_Edges` backend table. No separate data fetch is required; the toggle between views is purely a rendering decision.

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

### DEP-M002-F001 — Dependency table

**User story**

As a QA engineer or developer, I want to read the full dependency map as a structured table so that I can quickly find which modules are coupled and understand the reason behind each dependency in plain language.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The dependency payload has been loaded | The list view mounts | Every edge in the JSON is rendered as one row; no edges are omitted |
| 2 | A row is rendered | — | The row displays all seven fields from the payload: `from_module`, `to_module`, `relation`, `interface`, `risk`, `confidence`, and `why` |
| 3 | A row has `risk: "High"` | — | The risk cell shows a high-risk badge (red); Medium shows amber; Low shows blue — matching the colour convention used in the graph view |
| 4 | A row has a `confidence` value | — | The confidence score is displayed as a percentage (e.g. `0.92` renders as `92%`); values below 80% display an additional warning indicator signalling that human verification is recommended |
| 5 | The payload is empty | The list view mounts | A clear empty-state message is shown instead of an empty table |

---

### DEP-M002-F002 — Filter and search

**User story**

As a QA engineer, I want to filter the dependency table by risk level and search by module name so that I can focus on the edges most relevant to my current regression scope.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The table is populated | The user types a module name into the search field | Rows are filtered in real time to show only edges where `from_module` or `to_module` contains the search string (case-insensitive) |
| 2 | The table is populated | The user selects a risk level filter (High / Medium / Low / All) | Only rows matching the selected risk level are shown; selecting All restores the full table |
| 3 | A filter or search is active | The user clears both inputs | The table returns to its full unfiltered state |
| 4 | The user arrives from a "View in list" deep-link in the graph view (DEP-M001-F002) | The list view loads | The search field is pre-populated with the module name from the deep-link parameter and the table is already filtered accordingly |

---

### DEP-M002-F003 — View mode toggle

**User story**

As a user, I want to switch from the list view back to the graph view so that I can see the same dependency data as a visual diagram.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on `/dependencies/list` | The user activates the graph view toggle | The browser navigates to `/dependencies/uml` (DEP-M001) |
| 2 | A search filter is active when the user toggles to graph view | The graph view loads | The graph opens with the corresponding node visually highlighted or selected, preserving the user's context |
