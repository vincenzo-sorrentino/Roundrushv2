---
id: REQ-M002
title: Module Level View
epic: REQ
functionalities:
  - REQ-M002-F001
  - REQ-M002-F002
  - REQ-M002-F003
  - REQ-M002-F004
---

## Scope

Display the module-level detail view with four content tabs (Description, Acceptance Laws, Functionalities, Prototypes) so that stakeholders can inspect a module's scope and drill into its functionalities.

---

## Functionalities

### REQ-M002-F001 — Description tab (module)

**User story**

As a product owner, I want to view the module's metadata, scope, and linked functionalities so that I understand what the module covers and which features it contains.

**Acceptance criteria**

1. **Given** the user is on a module node
   **When** they select the "Description" tab
   **Then** a content card is displayed showing the module frontmatter (id, title, epic) in a preformatted block

2. **Given** the description tab is active
   **When** the content renders
   **Then** a "Scope" section appears below the frontmatter with the module's scope text

3. **Given** the module has functionalities
   **When** the description tab is active
   **Then** a "Functionalities" section lists each functionality as "FUNCTIONALITY-ID - Functionality title"

4. **Given** the module has no functionalities
   **When** the description tab is active
   **Then** the "Functionalities" section shows an empty list

**Edge cases / negative paths**

- The description tab is not the default tab for modules; the default tab is "Functionalities".
- If the scope field is empty, the "Scope" heading should still appear with no body text.

---

### REQ-M002-F002 — Acceptance Laws tab (module)

**User story**

As a quality engineer, I want to review the acceptance laws while viewing a module so that I can verify the module contributes to epic-level compliance.

**Acceptance criteria**

1. **Given** the user is on a module node
   **When** they select the "Acceptance Laws" tab
   **Then** the same acceptance laws table is displayed as at the epic level (shared across all nodes) with columns: No., Law, Evidence, Status

2. **Given** the table is displayed
   **When** laws are listed
   **Then** each law shows its ID, name, description, evidence type, and a coloured status badge

**Edge cases / negative paths**

- The acceptance laws are shared at the epic level and are identical regardless of which module is selected. The table does not filter per-module.

---

### REQ-M002-F003 — Functionalities tab (module)

**User story**

As a product owner, I want to see all functionalities belonging to this module in a list so that I can review their status and navigate to individual functionality details.

**Acceptance criteria**

1. **Given** the user is on a module node
   **When** they select the "Functionalities" tab (default tab for modules)
   **Then** a list is displayed where each row shows: functionality title (clickable), an "Open" link to the prototype, and a coloured status badge

2. **Given** the functionalities list is displayed
   **When** the user clicks a functionality title
   **Then** the view navigates to that functionality's detail, updating breadcrumbs, title, tabs, and explorer selection

3. **Given** the functionalities list is displayed
   **When** the user clicks the "Open" link on a row
   **Then** the prototype linked to the parent module opens in a new tab

4. **Given** the module has no functionalities
   **When** the tab is selected
   **Then** a message reads "No functionalities linked yet."

**Edge cases / negative paths**

- The "Open" link always points to the first prototype of the parent module. If the module has no prototypes, the link falls back to "#".
- Status badges follow the same colour mapping as modules (released = green "Released", validated = green "Validated", in-progress = blue "In sprint", planned = red "Ready for sprint", draft = grey "To do", design = purple "Design").

---

### REQ-M002-F004 — Prototypes tab (module)

**User story**

As a designer, I want to see the prototypes linked to this module so that I can access the relevant design artefacts for module-level flows.

**Acceptance criteria**

1. **Given** the user is on a module node
   **When** they select the "Prototypes" tab
   **Then** a grid of prototype cards is displayed, each showing: name, version, status badge, flow description, and an "Open prototype" link

2. **Given** a prototype card has a valid path
   **When** the user clicks "Open prototype"
   **Then** the prototype opens in a new browser tab

3. **Given** the module has no prototypes
   **When** the tab is selected
   **Then** a message reads "No prototype references."

**Edge cases / negative paths**

- Module prototypes may differ from epic-level prototypes. Each module carries its own prototype references.
- Cards without a version field should omit the version span rather than showing an empty tag.
