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
---

## Overview

Show the module-level detail view so that stakeholders can inspect a module's scope and drill into its functionalities. The view has four tabs: Description, Acceptance Laws, Functionalities (the default), and Prototypes.

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

When a module is selected and the Description tab is active, the user sees the module's core metadata (ID, title, parent epic), its scope text, and a list of all the functionalities it contains. This tab gives product owners and developers a concise reference for what the module covers and how it breaks down — without having to open individual functionality records.

---

### REQ-M002-F002 — Acceptance Laws tab

The Acceptance Laws tab at module level displays the same set of seven shared laws that appear at the epic level, so compliance can be reviewed regardless of where in the hierarchy the user is working. Every row shows the law ID, name, evidence type, and a colour-coded status badge. The table is identical across all levels — it reflects epic-wide compliance, not module-specific status.

---

### REQ-M002-F003 — Functionalities tab

The default view when opening a module is the Functionalities tab: a list where each row shows the functionality title, a link to open the related prototype, and a colour-coded status badge. Clicking a functionality title navigates straight into that functionality's detail view, updating the breadcrumb and sidebar selection in place. If no functionalities have been added to the module yet, a clear placeholder message is shown instead of an empty list.

---

### REQ-M002-F004 — Prototypes tab

The Prototypes tab shows the design artefacts linked specifically to this module — which may differ from the prototypes listed at epic level. Each card shows the prototype name, version, status, a brief description, and an "Open prototype" link that opens in a new browser tab. If no prototypes are linked to the module, the tab shows a simple empty-state message.
