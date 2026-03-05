---
id: REQ-M001
title: Epic Level View
epic: REQ
functionalities:
  - REQ-M001-F001
  - REQ-M001-F002
  - REQ-M001-F003
  - REQ-M001-F004
  - REQ-M001-F005
  - REQ-M001-F006
  - REQ-M001-F007
---

## Scope

Display the epic-level detail view including explorer navigation, summary metrics, and four content tabs (Description, Acceptance Laws, Modules, Prototypes) so that stakeholders can understand the overall epic and drill into its components.

---

## Functionalities

### REQ-M001-F001 — Explorer navigation

**User story**

As a product owner, I want to browse the entire requirement hierarchy in a tree sidebar so that I can navigate between epics, modules, and functionalities without losing context.

**Acceptance criteria**

1. **Given** the user is viewing any node in the Requirements Module
   **When** they click the open-explorer button (double chevron)
   **Then** the sidebar explorer opens, showing a hierarchical tree of the epic, its modules (as folders), and functionalities (as files)

2. **Given** the explorer sidebar is open
   **When** the user clicks a folder toggle caret
   **Then** the folder expands or collapses to show/hide its children

3. **Given** the explorer sidebar is open
   **When** the user clicks a tree node (module or functionality label)
   **Then** the main panel updates to display that node's detail view and the node is visually highlighted as selected

4. **Given** the explorer sidebar is open
   **When** the user types in the search input
   **Then** the tree is filtered to show only matching nodes plus their ancestor folders, all auto-expanded

5. **Given** the explorer sidebar is open
   **When** the user clears the search input
   **Then** the tree reverts to its previous expansion state

6. **Given** the explorer sidebar is open
   **When** the user clicks the collapse button (double left chevron)
   **Then** the sidebar closes and the open-explorer button becomes visible again

**Edge cases / negative paths**

- If the search yields no results, the tree area should remain empty without errors.
- Each tree node displays a coloured status dot matching the node's current status (released = green, in-progress = blue, planned = red, draft = grey, design = purple).

---

### REQ-M001-F002 — Breadcrumb navigation

**User story**

As a user navigating deep into the hierarchy, I want to see breadcrumb segments showing my path (Epic / Module / Functionality) so that I always know where I am.

**Acceptance criteria**

1. **Given** the user selects an epic node
   **When** the view renders
   **Then** the breadcrumb shows a single segment: the epic title

2. **Given** the user selects a module node
   **When** the view renders
   **Then** the breadcrumb shows two segments separated by "/": Epic title / Module title

3. **Given** the user selects a functionality node
   **When** the view renders
   **Then** the breadcrumb shows three segments separated by "/": Epic title / Module title / Functionality title

**Edge cases / negative paths**

- Breadcrumb segments are display-only (not clickable) in the current design.

---

### REQ-M001-F003 — Epic summary metrics

**User story**

As a product owner, I want to see a quick summary grid showing acceptance law compliance and module readiness so that I can gauge epic health at a glance.

**Acceptance criteria**

1. **Given** the user is viewing an epic node
   **When** the view renders
   **Then** a summary grid appears below the title row showing "Acceptance laws: X / Y" where X = laws with status pass and Y = total laws

2. **Given** the user is viewing an epic node
   **When** the view renders
   **Then** the summary grid also shows "Compliant modules: X / Y" where X = modules whose status is not "planned" and Y = total modules

3. **Given** the user navigates to a module or functionality node
   **When** the view renders
   **Then** the summary grid is not displayed (epic-only)

**Edge cases / negative paths**

- Zero-state: if no laws exist or no modules exist, counts should display "0 / 0".

---

### REQ-M001-F004 — Description tab (epic)

**User story**

As a product owner, I want to view the epic's metadata and scope breakdown so that I understand its purpose and boundaries.

**Acceptance criteria**

1. **Given** the user is on an epic node
   **When** they select the "Description" tab
   **Then** a content card is displayed showing the epic frontmatter (id, title_short, title, design_state, module list) in a preformatted block

2. **Given** the description tab is active
   **When** the content renders
   **Then** sections for "Objective", "In scope" (bullet list), and "Out of scope" (bullet list) are displayed below the frontmatter

3. **Given** the module list in the frontmatter
   **When** modules exist
   **Then** each module is shown as "MODULE-ID (Module title)"

**Edge cases / negative paths**

- If any section (objective, in-scope, out-of-scope) is missing from the source data, the heading should still appear with an empty body.

---

### REQ-M001-F005 — Acceptance Laws tab (epic)

**User story**

As a quality engineer, I want to see all acceptance laws for the epic in a structured table so that I can track compliance at a glance.

**Acceptance criteria**

1. **Given** the user is on an epic node
   **When** they select the "Acceptance Laws" tab
   **Then** a table is displayed with columns: No. (ID), Law (name + description), Evidence, Status

2. **Given** the acceptance laws table is displayed
   **When** a law has status "pass"
   **Then** a coloured status badge reading "Pass" is shown in the Status column

3. **Given** acceptance laws exist
   **When** the table is rendered
   **Then** all 7 acceptance laws are listed in order from AL-01 to AL-07

**Edge cases / negative paths**

- The Acceptance Laws tab is the default tab when an epic node is first selected.
- If no acceptance laws are defined, the table should display an empty state row.

---

### REQ-M001-F006 — Modules tab (epic)

**User story**

As a product owner, I want to see all modules belonging to the epic in a table so that I can review scope and navigate into each module.

**Acceptance criteria**

1. **Given** the user is on an epic node
   **When** they select the "Modules" tab
   **Then** a table is displayed with columns: Module (code + title), Scope, Status, and an action column

2. **Given** the modules table is displayed
   **When** a module row is shown
   **Then** the Module column displays the module code followed by " - " and the title, the Scope column shows the module's scope description, and the Status column shows a coloured badge

3. **Given** the modules table is displayed
   **When** the user clicks the "Open" button on a module row
   **Then** the view navigates to that module's detail, updating breadcrumbs, title, tabs, and explorer selection

**Edge cases / negative paths**

- Modules with status "planned" should still appear in the table with a "Ready for sprint" badge.
- If the epic has no modules, show an empty state message.

---

### REQ-M001-F007 — Prototypes tab (epic)

**User story**

As a designer or product owner, I want to see prototype references linked to the epic so that I can quickly access design artefacts.

**Acceptance criteria**

1. **Given** the user is on an epic node
   **When** they select the "Prototypes" tab
   **Then** a grid of prototype cards is displayed, each showing: name, version, status badge, flow description, and an "Open prototype" link

2. **Given** a prototype card has a valid path
   **When** the user clicks "Open prototype"
   **Then** the prototype opens in a new browser tab

3. **Given** no prototypes are linked to the epic
   **When** the tab is selected
   **Then** a message reads "No prototype references."

**Edge cases / negative paths**

- Prototype links with invalid or missing paths should fail gracefully (link to "#").
