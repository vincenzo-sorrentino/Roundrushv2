---
id: DES
title_short: Design
title: Design prototypes management
design_state: draft
modules:
  - DES-M001
  - DES-M002
  - DES-M003
---

## Objective

Give the product team a structured, version-controlled subsystem for managing clickable HTML/CSS/JS prototypes directly within RoundRush V2. Every prototype is stored in the repository under a standardised folder structure, automatically linked to the corresponding requirement module from the codebase without manual mapping, and rendered inside the app through a sandboxed viewer that prevents cross-site scripting. A CI/CD pipeline handles the full delivery lifecycle — copying prototypes to a static storage bucket on each branch merge and notifying the backend via a sync API. The design status board gives designers and project managers a single surface to track the design lifecycle of every requirement and access the associated clickable prototype at any stage.

## In scope

- Prototype catalogue index listing all available prototype flows grouped by category
- Design status board tracking design lifecycle per requirement (to-do → in-progress → ready-for-review → approved → ready-for-sprint)
- In-app prototype viewer with light/dark theme and desktop/mobile device toggles
- Prototype info panel showing linked epic, module, source path, file type, and version
- Repository folder convention at `/prototypes/epicXXX/moduleXXX/` with mandatory requirement reference and version declaration
- Three-branch versioning model (design / develop / main) mapping pre-sprint, active sprint, and production prototype states
- Automated CI/CD pipeline: on merge, sync `/prototypes/` to S3 and POST a sync payload to the backend API
- Backend sync API (`POST /api/v2/syncruns`) storing URL pointers — not raw file content — in the module database record
- Secure iframe sandbox rendering prototype content without exposing the main application to arbitrary JavaScript
- Automatic validation status update on prototypes when a module's Acceptance Laws reach full pass state

## Out of scope

- Manual scheduling or assignment of prototypes to sprints (lifecycle is driven by branch merges)
- Editing prototype source files from inside RoundRush (prototypes are authored in the repository, not the app)
- Figma embed or third-party design tool integration
- Prototype version diffing or visual comparison tooling
- Notifications to team members when prototype status changes

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
