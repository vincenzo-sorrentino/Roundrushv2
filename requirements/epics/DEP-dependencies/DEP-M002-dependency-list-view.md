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

### DEP-M002-F001 — Dependency table

When the view loads, every edge in the dependency payload is rendered as one row in the table — none are omitted. Each row displays all seven fields from the JSON payload: `from_module`, `to_module`, `relation`, `interface`, `risk`, `confidence`, and `why`. The risk cell uses the same colour convention as the graph view: red for High, amber for Medium, blue for Low. Confidence scores are shown as percentages (e.g. `0.92` renders as `92%`), and any score below 80% carries an additional warning indicator to flag that the AI-detected connection warrants human review. If the payload is empty, a clear empty-state message is shown in place of the table.

---

### DEP-M002-F002 — Filter, search, and sort

The toolbar above the table provides two filtering controls that apply simultaneously. A **module filter dropdown** lists every distinct `from_module` value in the dataset alongside an "All modules" option; selecting a module hides all rows where a different module is the source. A **text search field** filters rows by any text match across the entire row — module names, relation types, interface strings, confidence values, and the `why` column — making it easy to find a specific dependency by keyword. Clearing both controls restores the full unfiltered table. When the user arrives from a "View in list" deep-link in the graph view, the search field is pre-populated with the module name from the URL parameter so the table opens already scoped to the relevant module.

The **From** column header is interactive and toggles between ascending and descending alphabetical sort on each click. An arrow icon on the header reflects the current sort direction. Sorting applies on top of any active filter so the user can combine both without losing their scope.

---

### DEP-M002-F003 — View mode toggle

A toggle control mirrors the one in DEP-M001. Activating it from `/dependencies/list` navigates back to `/dependencies/uml`. If a search filter is active when the user switches, the graph view opens with the corresponding node highlighted, preserving the context the user was working in.
