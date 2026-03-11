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

**User story:** As a team member, I want to see all documentation sections on a single landing page with a live search bar so I can quickly identify and navigate to the relevant document.

**Description:** The hub landing is the entry point for the documentation tab. It renders a hero area with a search bar and a 3-column grid of section cards. Each card represents one `.md` file from `requirements/documentation/` and shows the section icon, title, and short description.

**Acceptance criteria:**

- The hero area displays the page title "Project documentation HUB" centred at the top of the view.
- All documentation sections loaded from `requirements/documentation/` are rendered as cards in a 3-column responsive grid below the hero.
- Each card shows: section icon, title, and short description. No category label is shown on the card itself.
- Clicking or pressing Enter/Space on a card opens the detail view for that section.
- Cards are keyboard-navigable with visible focus rings.
- The search input accepts free-text; typing filters the grid in real time:
  - Matching is case-insensitive across title, tags, and short description fields.
  - A dropdown appears below the search field showing a maximum of 6 matching results; each result shows icon, title, and category.
  - Clicking a dropdown result opens the detail view for that section.
  - The card grid simultaneously filters to all full matches.
- A clear (×) button appears inside the search field when it has a value; clicking it resets the search and collapses the dropdown.
- When no sections match the query, the grid area shows: `No sections match "<query>"`.
- If `requirements/documentation/` contains no eligible `.md` files, the grid shows: "No documentation sections available yet."

**Edge cases:**
- Partial text match anywhere within a title, tag, or description is valid (e.g. "gov" matches "Governance").
- The dropdown is dismissed when the user clicks outside it or presses Escape.

---

### DOC-M001-F002 — Documentation section detail view

**User story:** As a team member, I want to read a full documentation section in a structured two-panel layout with persistent section navigation so I can jump directly to any sub-heading without scrolling the whole article.

**Description:** The detail view is a two-panel layout. The left panel is a persistent navigation list of all documentation sections. The right panel renders the active section's full article with structured content blocks parsed from the source `.md` file.

**Acceptance criteria:**

Left navigation panel:
- All documentation section titles are listed vertically in the left panel.
- The currently active section is visually highlighted.
- When a section is active, its article sub-headings expand beneath it as clickable anchor links in the nav.
- Clicking a section title switches the article panel to that section without a full page reload.
- Clicking an anchor link scrolls the article panel to that sub-heading.

Article panel:
- The article header contains: the section icon, an in-article search field, and a history toggle button (clock icon).
- Below the header, the section title is rendered as the primary heading (h1).
- The article body renders content blocks in order, supporting the following types:
  - **paragraph**: standard body text rendered as a `<p>`.
  - **label**: a visually distinct bolded label line used as a group header before lists or code blocks.
  - **unordered list**: bulleted list of items.
  - **code block**: monospaced block with an optional label bar at the top and a copy-to-clipboard button; clicking the button copies the block content to the clipboard and gives brief visual feedback on the button icon.
- Each article sub-section carries an anchor id matching its heading slug so the left-nav sub-heading links resolve correctly.

In-article search:
- The search field in the article header filters visible article sub-sections by heading text and paragraph content.
- A clear button inside the field removes the filter.

**Edge cases:**
- If a section's source file has only one heading level (no sub-sections), the left nav does not expand anchor links for that section.
- Code blocks with no label still render the copy button.
- All content rendered from MD files must be HTML-escaped to prevent XSS injection.

---

### DOC-M001-F003 — Section history drawer

**User story:** As a team member, I want to view the change history for any documentation section so I can understand what was updated and by whom without leaving the documentation tab.

**Description:** Each documentation section has an associated change history visible in a side drawer. The user opens it via the history toggle button in the article header. The drawer slides in from the right overlaying the article area without blocking the left navigation panel.

**Acceptance criteria:**

- The history toggle button (clock icon) is located in the article panel header, right-aligned.
- Clicking the toggle button opens the history drawer; clicking again or the drawer's close button closes it.
- The drawer header shows: the title "History", a filter icon button (UI placeholder, non-functional in this iteration), and a close icon button.
- History entries are grouped by date, newest group first.
- Within each date group, entries are listed in order. Each entry shows:
  - An action type label: one of `Added`, `Changed`, `Removed`, `Deprecated`, or `Renamed`.
  - A quoted detail description of the change.
  - A user avatar (coloured circle with the user's initials) alongside the user's full name.
- If no history data exists for a section, the drawer body shows: "No history recorded yet".
- The drawer is keyboard-accessible: pressing Escape closes it.
- The drawer does not overlay or displace the left navigation panel.

**Edge cases:**
- Multiple entries sharing the same date are grouped together under one date heading.
- Long detail descriptions wrap within the entry row without truncation.

---

### DOC-M001-F004 — MD file ingestion from requirements/documentation/

**User story:** As a contributor, I want to edit documentation by modifying Markdown files in the `requirements/documentation/` folder in the repository, so that changes appear in the documentation tab without any additional publishing or CMS step.

**Description:** The documentation hub's content is sourced exclusively from `.md` files in the `requirements/documentation/` folder of each Roundrush project repository. The app reads these files, extracts metadata from their YAML frontmatter, and parses their bodies into structured content for rendering. No separate CMS, database, or content pipeline exists.

**Acceptance criteria:**

- The docs tab scans all `.md` files in `requirements/documentation/` at the path configured for the current project.
- Each `.md` file maps to exactly one documentation section (one hub card, one left-nav entry).
- Section metadata is read from the file's YAML frontmatter; the following fields are required:
  - `id` — unique section slug (kebab-case).
  - `title` — display title shown on the hub card and in the left nav.
  - `category` — one of `Governance`, `Engineering`, `Quality`, or `Workflow`; used for colour coding in search results.
  - `description` — short description shown on the hub card (recommended maximum 160 characters).
  - `tags` — array of keyword strings used as additional search targets.
  - `version` — semantic version string.
  - `last_updated` — date in `YYYY-MM-DD` format surfaced in the article view.
- The MD body is parsed into structured content: heading levels map to article sub-sections, body paragraphs to `p` blocks, `-` list items to `ul` blocks, and fenced code blocks to `code` blocks.
- If a file's frontmatter is missing any required field, the section is excluded from the hub and an error is recorded in the application log; no crash or blank screen occurs.
- The hub renders sections in alphabetical order by filename unless a `sort_order` integer field is present in the frontmatter, in which case that value takes precedence (ascending).
- Non-markdown files and binary files in `requirements/documentation/` are silently ignored.
- `.md` files with malformed YAML frontmatter are skipped and logged; they do not block the remaining sections from loading.
- An `.md` file with valid frontmatter but an empty body renders a hub card and left-nav entry; the article body shows: "No content available yet."
