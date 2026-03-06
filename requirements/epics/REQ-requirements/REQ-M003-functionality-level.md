---
id: REQ-M003
title: Functionality Level View
epic: REQ
status: draft
prototype_route: /requirements/module
functionalities:
  - REQ-M003-F001
  - REQ-M003-F002
  - REQ-M003-F003
  - REQ-M003-F004
---

## Overview

Show the functionality-level detail view so that developers and testers can read the user story, acceptance criteria, edge cases, and access the linked prototype for a single functionality. The view has four tabs: Description (the default), Acceptance Laws, Functionalities (sibling list), and Prototype.

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

### REQ-M003-F001 — Description tab (functionality)

**User story**

As a developer, I want to view a functionality's user story, acceptance criteria, edge cases, and prototype references so that I know exactly what to build and how to test it.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a functionality node | They select the "Description" tab (default) | A content card shows the functionality frontmatter (id, module_id, title_short) in a preformatted block |
| 2 | The description tab is active | The content renders | A "User story" section appears with the user-story text in "As a …, I want to … so that …" format |
| 3 | The description tab is active | The content renders | An "Acceptance criteria" section appears with a numbered list where each item shows **Given:** …, **When:** …, **Then:** … |
| 4 | The description tab is active | The content renders | An "Edge cases / negative paths" section appears describing boundary conditions and error scenarios |
| 5 | The description tab is active | The content renders | A "Prototype references" section appears linking to the relevant prototype flow |
| 6 | A functionality has multiple acceptance criteria | They are displayed | They are rendered as a numbered list preserving the original order |

**Edge cases / negative paths**

- If no acceptance criteria are defined, the "Acceptance criteria" section shows an empty state.
- If the edge-cases field is empty, the heading appears with no body text.
- Prototype reference text is informational (not a live link) — it describes which prototype and flow the functionality corresponds to.

---

### REQ-M003-F002 — Acceptance Laws tab (functionality)

**User story**

As a quality engineer, I want to see the acceptance laws while reviewing a functionality so that I can check whether the functionality contributes to overarching epic compliance.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a functionality node | They select the "Acceptance Laws" tab | The shared acceptance laws table is displayed with columns: No., Law, Evidence, Status — identical to the epic and module level |
| 2 | The table is displayed | Laws are listed | Each row shows its ID, name, description, evidence type, and a coloured status badge |

**Edge cases / negative paths**

- The acceptance laws table is shared across all hierarchy levels and is not filtered by functionality.

---

### REQ-M003-F003 — Functionalities tab (sibling list)

**User story**

As a product owner, I want to see all sibling functionalities within the same module — with the current one highlighted — so that I can switch between related features without navigating back to the module.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a functionality node | They select the "Functionalities" tab | A list is shown of all functionalities that share the same parent module |
| 2 | The sibling list is displayed | The current functionality is in the list | Its row is visually distinguished with a "current" highlight style |
| 3 | The sibling list is displayed | The user clicks another functionality's title | The view navigates to that functionality's detail, updating the title, breadcrumbs, and tabs |
| 4 | Each row renders | The sibling list is shown | The row shows the functionality title (clickable), an "Open" link pointing to the parent module's prototype, and a coloured status badge |

**Edge cases / negative paths**

- If the parent module has only one functionality, the list shows a single row that is highlighted as current.
- The "Open" link falls back to "#" if the parent module has no prototypes.

---

### REQ-M003-F004 — Prototype tab (functionality)

**User story**

As a developer, I want to access the prototype linked to the functionality's module so that I can inspect the expected visual and interaction design for this feature.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a functionality node | They select the "Prototype" tab (singular) | The prototype card linked to the parent module is displayed with name, version, status badge, flow description, and an "Open prototype" link |
| 2 | The prototype card is displayed | The user clicks "Open prototype" | The prototype opens in a new browser tab |
| 3 | The parent module has no prototypes | The tab is selected | A message reads "No prototype references." |

**Edge cases / negative paths**

- The tab label at functionality level is "Prototype" (singular), unlike the plural "Prototypes" at epic and module level — it shows the single primary prototype inherited from the parent module.
- If the parent module has multiple prototypes, only the cards directly relevant to the module are shown.
