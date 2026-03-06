---
id: REQ-M001
title: Epic Level View
epic: REQ
status: draft
prototype_route: /requirements/module
functionalities:
  - REQ-M001-F001
  - REQ-M001-F002
  - REQ-M001-F003
  - REQ-M001-F004
  - REQ-M001-F005
  - REQ-M001-F006
  - REQ-M001-F007
---

## Overview

Show the epic-level detail view so that stakeholders can understand the overall epic and drill into its components. The view includes an explorer sidebar for navigating the full requirement hierarchy, a summary metrics grid, and four tabs: Description, Acceptance Laws, Modules, and Prototypes.

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

### REQ-M001-F001 — Explorer navigation

**User story**

As a product owner, I want to browse the entire requirement hierarchy in a tree sidebar so that I can navigate between epics, modules, and functionalities without losing context.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is viewing any node in the Requirements Module | They click the open-explorer button (double chevron) | The sidebar opens and shows a hierarchical tree of the epic, its modules (as folders), and functionalities (as files) |
| 2 | The explorer sidebar is open | The user clicks a folder toggle caret | The folder expands or collapses to show or hide its children |
| 3 | The explorer sidebar is open | The user clicks a tree node label | The main panel updates to show that node's detail and the node is visually highlighted |
| 4 | The explorer sidebar is open | The user types in the search input | The tree filters to show only matching nodes plus their ancestor folders, all auto-expanded |
| 5 | The explorer sidebar is open | The user clears the search input | The tree reverts to its previous expansion state |
| 6 | The explorer sidebar is open | The user clicks the collapse button (double left chevron) | The sidebar closes and the open-explorer button becomes visible again |

**Edge cases / negative paths**

- If the search yields no results, the tree area should remain empty without errors.
- Each tree node shows a coloured status dot: released = green, in-progress = blue, planned = red, draft = grey, design = purple.

---

### REQ-M001-F002 — Breadcrumb navigation

**User story**

As a user navigating deep into the hierarchy, I want to see breadcrumb segments showing my exact path (Epic / Module / Functionality) so that I always know where I am.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user selects an epic node | The view renders | The breadcrumb shows a single segment: the epic title |
| 2 | The user selects a module node | The view renders | The breadcrumb shows two segments separated by "/": Epic title / Module title |
| 3 | The user selects a functionality node | The view renders | The breadcrumb shows three segments: Epic title / Module title / Functionality title |

**Edge cases / negative paths**

- Breadcrumb segments are display-only (not clickable) in the current design.

---

### REQ-M001-F003 — Epic summary metrics

**User story**

As a product owner, I want to see a quick summary grid showing acceptance law compliance and module readiness so that I can gauge epic health at a glance.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is viewing an epic node | The view renders | A summary grid shows "Acceptance laws: X / Y" where X = laws with status "pass" and Y = total laws |
| 2 | The user is viewing an epic node | The view renders | The summary grid also shows "Compliant modules: X / Y" where X = non-"planned" modules and Y = total modules |
| 3 | The user navigates to a module or functionality node | The view renders | The summary grid is not displayed (epic-only feature) |

**Edge cases / negative paths**

- If no laws or no modules exist, counts display "0 / 0".

---

### REQ-M001-F004 — Description tab (epic)

**User story**

As a product owner, I want to view the epic's metadata and scope breakdown so that I understand its purpose and boundaries.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on an epic node | They select the "Description" tab | A content card shows the epic frontmatter (id, title_short, title, design_state, module list) in a preformatted block |
| 2 | The description tab is active | The content renders | Sections for "Objective", "In scope" (bullet list), and "Out of scope" (bullet list) are shown below the frontmatter |
| 3 | The module list is in the frontmatter | Modules exist | Each module is shown as "MODULE-ID (Module title)" |

**Edge cases / negative paths**

- If any section (objective, in-scope, out-of-scope) is missing from the source data, the heading still appears with an empty body.

---

### REQ-M001-F005 — Acceptance Laws tab (epic)

**User story**

As a quality engineer, I want to see all acceptance laws for the epic in a structured table so that I can track compliance at a glance.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on an epic node | They select the "Acceptance Laws" tab | A table is shown with columns: No. (ID), Law (name + description), Evidence, Status |
| 2 | A law has status "pass" | The table renders | A coloured status badge reading "Pass" is shown in the Status column |
| 3 | Acceptance laws exist | The table renders | All 7 laws are listed in order from AL-01 to AL-07 |

**Edge cases / negative paths**

- The Acceptance Laws tab is the default tab when an epic node is first selected.
- If no acceptance laws are defined, the table displays an empty state row.

---

### REQ-M001-F006 — Modules tab (epic)

**User story**

As a product owner, I want to see all modules belonging to the epic in a table so that I can review scope and navigate into each module.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on an epic node | They select the "Modules" tab | A table is shown with columns: Module (code + title), Scope, Status, and an action column |
| 2 | A module row is shown | The table renders | The Module column shows the code followed by " - " and the title; the Scope column shows the module's scope; the Status column shows a coloured badge |
| 3 | The user clicks the "Open" button on a module row | They click it | The view navigates to that module's detail, updating breadcrumbs, title, tabs, and explorer selection |

**Edge cases / negative paths**

- Modules with status "planned" still appear with a "Ready for sprint" badge.
- If the epic has no modules, show an empty state message.

---

### REQ-M001-F007 — Prototypes tab (epic)

**User story**

As a designer or product owner, I want to see prototype references linked to the epic so that I can quickly access relevant design artefacts.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on an epic node | They select the "Prototypes" tab | A grid of prototype cards is displayed, each showing: name, version, status badge, flow description, and an "Open prototype" link |
| 2 | A prototype card has a valid path | The user clicks "Open prototype" | The prototype opens in a new browser tab |
| 3 | No prototypes are linked to the epic | The tab is selected | A message reads "No prototype references." |

**Edge cases / negative paths**

- Prototype links with missing paths fail gracefully and fall back to "#".
