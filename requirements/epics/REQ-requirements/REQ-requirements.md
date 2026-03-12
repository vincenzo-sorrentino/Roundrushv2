---
id: REQ
title_short: Requirements
title: Requirements Module
design_state: drafting
modules:
  - REQ-M001
  - REQ-M002
  - REQ-M003
---

## Objective

Provide a structured, hierarchical viewer for all requirement artefacts — epics, modules, and functionalities — so that product owners, developers, and testers always have a single, navigable source of truth for what needs to be built and why. RoundRush acts as a reflection layer: it consumes repository data via API and renders the current state in a read-only interface. No requirement is ever authored or edited inside the application — all authoring happens in the repository via VSCode, exclusively by developers and AI coding agents.

## Repository management model

All requirements are stored as Markdown files inside the project repository, structured hierarchically: epic files at the top level, module files within each epic, and functionality descriptions written as plain prose paragraphs within each module file. RoundRush never persists or modifies requirement content itself. It reads from the repository's API on demand and displays whatever the repository currently contains.

Each development cycle — not an Agile sprint, but literally every completed coding iteration with an agent — triggers API synchronisation with RoundRush. This synchronisation updates progress status in real time: statuses transition through `in-progress`, `ready-for-review`, and `done` as coding work advances. The synchronisation is driven by the SyncRun ingestion pipeline, which the local AI agent activates at the end of each iteration.

Validation of acceptance law compliance is automated and deterministic. The authority that validates completion is the AI Copilot agent operating locally. Validation is a joint responsibility between the developer and the QA engineer, but the enforcement logic is owned by Copilot. A module is considered complete only when every one of its seven acceptance laws reaches Pass status simultaneously.

## In scope

- Hierarchical explorer tree (Epic → Module → Functionality) with search and filter
- Tab-based detail panels at epic and module level; single-pane description view at functionality level
- Acceptance law tracking with status badges at every level
- Breadcrumb navigation reflecting the current position in the hierarchy
- Dependencies tab at epic and module level showing the dependency edges for that scope
- Prototype reference linking at module and functionality level
- Summary metrics at epic level (law compliance, module readiness)
- Read-only rendering of repository data consumed via API — no in-app editing

## Out of scope

- Inline editing of requirements artefacts from the UI
- Approval workflows and sign-off processes inside the application
- Role-based access control beyond read-only view
- Requirement versioning and change history within the UI
- Notifications and mentions

---

## Acceptance Laws

> Law definitions are maintained in [`requirements/documentation/acceptance-laws.md`](../../documentation/acceptance-laws.md). The table below tracks compliance status for this epic. This epic is compliant only when every module listed below is compliant.

| ID    | Name                                                                                         | Status  |
|-------|----------------------------------------------------------------------------------------------|---------|
| AL-01 | All production code implemented                                                              | pending |
| AL-02 | All automated unit and integration tests pass with 100% coverage                             | pending |
| AL-03 | All documentation updated (requirements, tests, code comments, component docs, UML diagrams) | pending |
| AL-04 | All end-to-end tests implemented and passed                                                  | pending |
| AL-05 | Dependency map between modules updated                                                       | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100%                        | pending |
| AL-07 | All manual test suites (including smoke tests) completed                                     | pending |
