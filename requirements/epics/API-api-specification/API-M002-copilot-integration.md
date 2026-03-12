---
id: API-M002
title: Copilot Integration
epic: API
status: draft
prototype_route: ~
functionalities:
  - API-M002-F001
  - API-M002-F002
---

## Overview

Define the mandatory Copilot integration structure for every repository connected to RoundRush V2. The integration is not optional and must follow a modular file structure to prevent instruction bloat. The synchronisation sub-file must contain the mandatory paragraph that instructs the AI agent to push status updates to RoundRush after every commit.

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

### API-M002-F001 — Modular Copilot instructions structure

Every repository connected to RoundRush V2 must include a `copilot-instructions` directory at the root level. The directory must contain at minimum four sub-files: `main.md` as the entry point, `rr-sync.md` for synchronisation instructions, `testing.md` for test execution guidance, and `governance.md` for compliance and acceptance law enforcement. The `main.md` file must reference all sub-files explicitly — it must not contain inline instructions that duplicate or replace sub-file content. This modular structure prevents the instructions file from growing into an unmaintainable monolith over time.

---

### API-M002-F002 — Mandatory synchronisation paragraph

The `rr-sync.md` sub-file must include the following paragraph verbatim: "At each new commit, all progress and structural changes must be mirrored to RoundRush via the RoundRush API. The AI agent must evaluate updated requirements, modified modules, testing results, coverage metrics, documentation changes, and dependency updates, and push the corresponding status update to RoundRush automatically." This paragraph is the enforcement mechanism for automatic synchronisation. Its presence is validated by the RoundRush integration check on every repository connection and re-checked on each API key renewal. A repository missing this paragraph is flagged as out-of-compliance and its sync agent will not be activated until the paragraph is restored.
