---
id: KAN-M002
title: Module Detail Panel
epic: KAN
status: draft
prototype_route: /planning/kanban
functionalities:
  - KAN-M002-F001
  - KAN-M002-F002
  - KAN-M002-F003
  - KAN-M002-F004
  - KAN-M002-F005
  - KAN-M002-F006
  - KAN-M002-F007
  - KAN-M002-F008
---

## Overview

Allow team members to open a sliding detail panel for any module directly from the sprint board. The panel is organised into six tabs — Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, and UAT Issues — so all context about a module is accessible in one place without leaving the board. Tab content and progress indicators are computed in real time from the CI/CD pipeline and backend data.

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

### KAN-M002-F001 — Open and dismiss the detail overlay

Clicking any module row on the sprint board slides a detail panel into view from the side, placing a dimmed backdrop over the board behind it. The panel header immediately shows the module's ID, title, epic, and a progress bar. The user can dismiss the panel by clicking the close button in the header, by clicking the backdrop, or by pressing Escape — all three methods trigger the same slide-out animation. While the panel is open, scrolling is locked on the body behind it. If the same module row is clicked while its panel is already open, the panel content updates in place without re-animating. Keyboard navigation is fully supported: Enter and Space open the panel from a focused row, and Escape closes it.

---

### KAN-M002-F002 — Tab navigation with progress indicator

The detail panel exposes six tabs: Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, and UAT Issues. The active tab is indicated visually. A progress bar and label in the panel header change meaning depending on which tab is active — on the Acceptance Laws tab it shows the percentage of passing laws, on the Tasks tab it shows the ratio of completed to total tasks, and on other tabs it shows the appropriate computed metric. Clicking any tab switches the content area immediately without closing or re-animating the panel. Feature-area sub-groups within the Tasks tab can be independently expanded or collapsed.

---

### KAN-M002-F003 — Overview tab

The Overview tab presents the module's identity and structural context. A title row shows the module ID and full title alongside the current status badge. A Prototype button links directly to the registered prototype route for that module in the browser. A metadata section displays the module's ID, title, epic, status, and prototype route as labelled field–value pairs. Below the metadata, a short description paragraph explains the module's purpose and delivery progress. Finally, a Functionalities section lists each functionality by its ID and title, with a descriptive paragraph explaining what it covers.

---

### KAN-M002-F004 — Acceptance Laws tab

The Acceptance Laws tab shows a table of all seven canonical Acceptance Laws (AL-01 through AL-07). Each row contains the law number, the law title and a brief description of what it requires, an evidence column showing the computational or manual artefacts that prove compliance, and a Pass or Fail badge computed by the backend. The progress bar in the panel header updates to reflect the proportion of laws currently passing. Laws that are not yet evaluated show a neutral pending state rather than a false Fail.

---

### KAN-M002-F005 — Dependencies tab

The Dependencies tab shows all declared inter-module dependencies for the open module in a table. Each row carries: the source module (From), the dependent module (To), the relation type (e.g., uses, extends, triggers), the interface through which the dependency operates, a Risk badge colour-coded by severity (low / medium / high / critical), a Confidence decimal (0.0 to 1.0) indicating how precisely the dependency boundary is understood, and a Why column with a plain-language explanation of why the dependency exists. The table is read-only.

---

### KAN-M002-F006 — Tasks tab

The Tasks tab lists all implementation tasks for the module, auto-generated from the module's Acceptance Laws. Tasks cannot be created, edited, or deleted manually. Rows are grouped under named feature areas using collapsible group headers. Each task row shows: task title, Priority (icon and label), Due Date, Assignee (avatar), PR Link (a GitHub icon button that opens the associated pull request in a new tab), and a Status badge reflecting the current CI/CD-driven state (TODO, IN PROGRESS, RFR, MERGED, QA, or DONE). All status transitions are driven by pipeline events as defined in KAN-M001-F005. The progress bar in the panel header reflects tasks-complete divided by tasks-total for this module.

---

### KAN-M002-F007 — Test Cases tab

The Test Cases tab shows the full list of test cases registered against the module. Each row is numbered sequentially and contains: a description of what is being tested, pre-conditions that must hold before the test can run, the step-by-step execution instructions, the expected result, and a Result badge indicating the current outcome (pass / fail / blocked / not-run). Result badges are colour-coded: green for pass, red for fail, amber for blocked, and neutral for not-run. The table is read-only.

---

### KAN-M002-F008 — UAT Issues tab

The UAT Issues tab shows user acceptance testing issues scoped to this module. Each row contains: a Scope badge indicating whether the issue is front-end (FE), back-end (BE), full-stack (BE&FE), or infrastructure (Devops), the issue title, Priority (icon and label), Date, Assignee (avatar), PR Link (a GitHub icon button that opens the remediation pull request), and a Status/Stg-Dev badge reflecting the current issue state (to-do, in-progress, fixed, open, merged, or closed). If no UAT issues exist for the module, an empty-state message is shown. The table is read-only.
