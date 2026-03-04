---
id: REQ-M003
title: Functionality Level View
epic: REQ
functionalities:
  - REQ-M003-F001
  - REQ-M003-F002
  - REQ-M003-F003
  - REQ-M003-F004
---

## Scope

Display the functionality-level detail view with four content tabs (Description, Acceptance Laws, Functionalities, Prototype) so that developers and testers can read the user story, acceptance criteria, edge cases, and access the linked prototype for a single functionality.

---

## Functionalities

### REQ-M003-F001 — Description tab (functionality)

**User story**

As a developer, I want to view a functionality's user story, acceptance criteria in Given/When/Then format, edge cases, and prototype references so that I know exactly what to implement and how to test it.

**Acceptance criteria**

1. **Given** the user is on a functionality node
   **When** they select the "Description" tab (default tab for functionalities)
   **Then** a content card is displayed showing the functionality frontmatter (id, module_id, title_short) in a preformatted block

2. **Given** the description tab is active
   **When** the content renders
   **Then** a "User story" section appears with the functionality's user-story text in "As a …, I want to … so that …" format

3. **Given** the description tab is active
   **When** the content renders
   **Then** an "Acceptance criteria" section appears with a numbered ordered list where each item shows three bold-labelled lines: **Given:** …, **When:** …, **Then:** …

4. **Given** the description tab is active
   **When** the content renders
   **Then** an "Edge cases / negative paths" section appears with free-text describing boundary conditions and error scenarios

5. **Given** the description tab is active
   **When** the content renders
   **Then** a "Prototype references" section appears with a text reference linking to the relevant prototype flow

6. **Given** a functionality has multiple acceptance criteria
   **When** displayed
   **Then** they are rendered as a numbered list preserving the original order

**Edge cases / negative paths**

- If a functionality has no acceptance criteria defined, the "Acceptance criteria" section should display an empty state.
- If the edge-cases field is empty, the heading should appear with no body text.
- Prototype reference text is informational (not a live link) — it describes which prototype and flow the functionality corresponds to.

---

### REQ-M003-F002 — Acceptance Laws tab (functionality)

**User story**

As a quality engineer, I want to see the acceptance laws while reviewing a functionality so that I can check whether the functionality contributes to overarching epic compliance.

**Acceptance criteria**

1. **Given** the user is on a functionality node
   **When** they select the "Acceptance Laws" tab
   **Then** the shared acceptance laws table is displayed with columns: No., Law, Evidence, Status — identical to the epic and module level

2. **Given** the table is displayed
   **When** laws are listed
   **Then** each law shows its ID, name, description, evidence type, and a coloured status badge

**Edge cases / negative paths**

- The acceptance laws table is shared across all hierarchy levels. It is not filtered by functionality.

---

### REQ-M003-F003 — Functionalities tab (sibling list)

**User story**

As a product owner, I want to see all sibling functionalities within the same module — with the current one highlighted — so that I can quickly switch between related features without navigating back to the module.

**Acceptance criteria**

1. **Given** the user is on a functionality node
   **When** they select the "Functionalities" tab
   **Then** a list is displayed showing all functionalities that share the same parent module

2. **Given** the sibling list is displayed
   **When** the current functionality appears in the list
   **Then** its row is visually distinguished with a "current" highlight style

3. **Given** the sibling list is displayed
   **When** the user clicks another functionality's title
   **Then** the view navigates to that functionality's detail, updating the title, breadcrumbs, and tabs

4. **Given** the sibling list is displayed
   **When** each row renders
   **Then** it shows: functionality title (clickable), an "Open" link pointing to the parent module's prototype, and a coloured status badge

**Edge cases / negative paths**

- If the parent module has only one functionality, the list shows a single row that is highlighted as current.
- The "Open" link falls back to "#" if the parent module has no prototypes.

---

### REQ-M003-F004 — Prototype tab (functionality)

**User story**

As a developer, I want to access the prototype linked to the functionality's module so that I can inspect the expected visual and interaction design for this feature.

**Acceptance criteria**

1. **Given** the user is on a functionality node
   **When** they select the "Prototype" tab (singular, unlike the plural "Prototypes" at epic/module level)
   **Then** the prototype card linked to the parent module is displayed with name, version, status badge, flow description, and an "Open prototype" link

2. **Given** the prototype card is displayed
   **When** the user clicks "Open prototype"
   **Then** the prototype opens in a new browser tab

3. **Given** the parent module has no prototypes
   **When** the tab is selected
   **Then** a message reads "No prototype references."

**Edge cases / negative paths**

- The tab label at functionality level is "Prototype" (singular) to indicate it derives from the parent module's single primary prototype, unlike the plural "Prototypes" at higher levels.
- If the parent module has multiple prototypes, only the cards relevant to the module are shown.
