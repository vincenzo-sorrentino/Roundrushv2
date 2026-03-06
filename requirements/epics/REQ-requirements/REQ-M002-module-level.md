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

### REQ-M002-F001 — Description tab (module)

**User story**

As a product owner, I want to view the module's metadata, scope, and linked functionalities so that I understand what the module covers and which features it contains.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a module node | They select the "Description" tab | A content card shows the module frontmatter (id, title, epic) in a preformatted block |
| 2 | The description tab is active | The content renders | A "Scope" section appears below the frontmatter with the module's scope text |
| 3 | The module has functionalities | The description tab is active | A "Functionalities" section lists each one as "FUNCTIONALITY-ID - Functionality title" |
| 4 | The module has no functionalities | The description tab is active | The "Functionalities" section shows an empty list |

**Edge cases / negative paths**

- The description tab is not the default tab for modules; the default tab is "Functionalities".
- If the scope field is empty, the "Scope" heading still appears with no body text.

---

### REQ-M002-F002 — Acceptance Laws tab (module)

**User story**

As a quality engineer, I want to review the acceptance laws while viewing a module so that I can verify the module contributes to epic-level compliance.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a module node | They select the "Acceptance Laws" tab | The shared acceptance laws table is displayed with columns: No., Law, Evidence, Status |
| 2 | The table is displayed | Laws are listed | Each row shows its ID, name, description, evidence type, and a coloured status badge |

**Edge cases / negative paths**

- The acceptance laws are shared at the epic level. The table is identical regardless of which module is selected.

---

### REQ-M002-F003 — Functionalities tab (module)

**User story**

As a product owner, I want to see all functionalities belonging to this module in a list so that I can review their status and navigate to individual functionality details.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a module node | They select the "Functionalities" tab (default) | A list is displayed where each row shows the functionality title (clickable), an "Open" link to the prototype, and a coloured status badge |
| 2 | The functionalities list is displayed | The user clicks a functionality title | The view navigates to that functionality's detail, updating breadcrumbs, title, tabs, and explorer selection |
| 3 | The functionalities list is displayed | The user clicks the "Open" link on a row | The prototype linked to the parent module opens in a new tab |
| 4 | The module has no functionalities | The tab is selected | A message reads "No functionalities linked yet." |

**Edge cases / negative paths**

- The "Open" link points to the first prototype of the parent module. If the module has no prototypes, the link falls back to "#".
- Status badge colour mapping: released = green "Released", validated = green "Validated", in-progress = blue "In sprint", planned = red "Ready for sprint", draft = grey "To do", design = purple "Design".

---

### REQ-M002-F004 — Prototypes tab (module)

**User story**

As a designer, I want to see the prototypes linked to this module so that I can access the relevant design artefacts for module-level flows.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on a module node | They select the "Prototypes" tab | A grid of prototype cards is displayed, each showing: name, version, status badge, flow description, and an "Open prototype" link |
| 2 | A prototype card has a valid path | The user clicks "Open prototype" | The prototype opens in a new browser tab |
| 3 | The module has no prototypes | The tab is selected | A message reads "No prototype references." |

**Edge cases / negative paths**

- Module prototypes may differ from epic-level prototypes; each module carries its own references.
- Cards without a version field omit the version span rather than showing an empty tag.
