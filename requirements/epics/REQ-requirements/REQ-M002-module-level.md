---
id: REQ-M002
title: Module Level View
epic: REQ
status: draft
prototype_route: /requirements/module
functionalities:
  - REQ-M002-F001
  - REQ-M002-F002
  - REQ-M002-F003
  - REQ-M002-F004
  - REQ-M002-F005
---

## Overview

Show the module-level detail view so that stakeholders can inspect a module's scope and drill into its functionalities. The view has five tabs: Description (the default), Acceptance Laws, Dependencies, Functionalities, and Prototypes.

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

### REQ-M002-F001 — Description tab

The Description tab is the default view when a module is selected. It shows a metadata block with the module's ID, title, parent epic, current status, and prototype route, followed by a prose overview of the module's scope, and then the full list of functionalities grouped inline — each showing the functionality code, title, and its description text. This gives product owners and developers a complete in-one-place reference for what the module covers and how it breaks down without having to open individual functionality records.

---

### REQ-M002-F002 — Acceptance Laws tab

The Acceptance Laws tab at module level displays the same set of seven shared laws that appear at the epic level, so compliance can be reviewed regardless of where in the hierarchy the user is working. Every row shows the law ID, name, evidence type, and a colour-coded status badge. The table is identical across all levels — it reflects epic-wide compliance, not module-specific status.

---

### REQ-M002-F003 — Functionalities tab

The Functionalities tab lists every functionality that belongs to the module. Each row shows the functionality title and a colour-coded status badge. Clicking a functionality title navigates straight into that functionality's detail view, updating the breadcrumb and sidebar selection in place. If no functionalities have been added to the module yet, a clear placeholder message is shown instead of an empty list.

---

### REQ-M002-F004 — Prototypes tab

The Prototypes tab shows the design artefacts linked specifically to this module. Each row shows the prototype flow description, a direct link icon to open it in a new browser tab, and a status badge. The rows are displayed as a flat list without group nesting. If no prototypes are linked to the module, the tab shows a simple empty-state message.

---

### REQ-M002-F005 — Dependencies tab

The Dependencies tab shows the subset of dependency edges in which this specific module participates, drawn from the same global `Dependency_Edges` payload used by the DEP module. The table shows From, To, Relation, Interface, Risk, Confidence, and Why columns, filtered to rows where this module's ID appears as either the source or the target. This gives developers and QA an in-context view of the coupling implications of the module without navigating away to the global dependency map. The tab is read-only; dependency data is authored in DEP-M001 and DEP-M002.
