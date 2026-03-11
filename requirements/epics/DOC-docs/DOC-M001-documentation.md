---
id: DOC-M001
title: Documentation hub
epic: DOC
status: draft
prototype_route: /docs/hub
functionalities:
  - DOC-M001-F001
  - DOC-M001-F002
  - DOC-M001-F003
  - DOC-M001-F004
---

## Overview

The documentation hub is a dedicated tab in every Roundrush project that renders the contents of the repository's `requirements/documentation/` folder as a browsable, searchable knowledge base. Contributors edit `.md` files directly in the repo and the hub reads and displays them without any additional publishing step. The hub is the single authoritative surface for project governance, engineering standards, and operational workflows within the Roundrush UI.

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

### DOC-M001-F001 — Documentation hub landing view

The documentation tab opens on a hub landing page with a hero area and a 3-column card grid. The hero displays the title "Project documentation HUB" and a search bar. The grid shows one card per `.md` file found in `requirements/documentation/`, each card showing the section icon, title, and short description. Clicking a card opens the detail view for that section. Typing in the search bar filters the grid in real time across title, tags, and description; a dropdown below the field shows a maximum of 6 matching results — each with icon, title, and category — and clicking a result also opens the detail view. A clear button appears inside the field whenever it contains text and dismisses the dropdown and resets the grid when clicked. When no cards match the query, the grid area shows: `No sections match "<query>"`. The dropdown closes when the user clicks outside it or presses Escape.

---

### DOC-M001-F002 — Documentation section detail view

Opening any section switches to a two-panel detail view. The left panel lists all documentation sections; the active section is visually highlighted and its sub-headings expand beneath it as anchor links. Clicking another section title replaces the article on the right without a full page reload; clicking an anchor link scrolls the article to that sub-heading. The article panel opens with a header row containing the section icon, an in-article search field, and a history toggle button (clock icon), followed by the section title as the primary heading. The body renders content blocks in the order they appear in the source file: paragraphs, bolded label lines (used as group headers before lists or code blocks), bulleted lists, and code blocks. Code blocks show an optional label bar and a copy-to-clipboard button; clicking the button copies the content and gives brief visual feedback. The in-article search field filters sub-sections by heading and paragraph text. All content rendered from MD files is HTML-escaped.

---

### DOC-M001-F003 — Section history drawer

Each section has a change history accessible via the clock icon button in the article header. Clicking the button slides in a history drawer from the right; it overlays the article area without blocking the left navigation panel. The drawer header shows the title "History", a filter icon button (non-functional placeholder), and a close button. History entries are grouped by date with the most recent group first; within a group each entry shows the action type (Added, Changed, Removed, Deprecated, or Renamed), a quoted description of the change, and the contributor's avatar (coloured circle with initials) alongside their full name. If no history has been recorded for the section the drawer body shows: "No history recorded yet". Pressing Escape or clicking the close button dismisses the drawer.

---

### DOC-M001-F004 — MD file ingestion from requirements/documentation/

The hub sources all its content from the `.md` files in `requirements/documentation/` at the path configured for the current project. No separate CMS, database, or publishing step exists. Each file maps to one section. Section metadata comes from YAML frontmatter; the required fields are: `id` (kebab-case slug), `title`, `category` (one of Governance, Engineering, Quality, or Workflow), `description` (short text shown on the hub card), `tags` (array of keyword strings for search), `version`, and `last_updated` (YYYY-MM-DD). The MD body is parsed into structured content blocks: headings become article sub-sections, body paragraphs become `p` blocks, list items become `ul` blocks, and fenced code becomes `code` blocks. Sections are ordered alphabetically by filename unless a `sort_order` integer is present in frontmatter, in which case that value takes precedence ascending. Files with missing required frontmatter fields are excluded from the hub and the error is recorded in the application log; the remaining sections still load. Files with malformed YAML frontmatter are skipped and logged. Non-markdown and binary files are silently ignored. A file with valid frontmatter but an empty body renders a card and nav entry; the article body shows: "No content available yet."
