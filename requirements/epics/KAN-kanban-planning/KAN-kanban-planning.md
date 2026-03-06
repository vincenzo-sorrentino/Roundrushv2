---
id: KAN
title_short: Kanban / Planning
title: Sprint planning board and module detail
design_state: drafting
modules:
  - KAN-M001
  - KAN-M002
---

## Objective

Give the team a sprint-centric planning view where modules are grouped by feature area, can be sorted and filtered, and can be opened for a deep-dive detail panel — so that everyone has a shared, up-to-date picture of what is in a sprint and where each item stands.

## In scope

- Sprint board table with modules grouped by feature, showing priority, assignees, dates, and status
- Column sorting, multi-criteria filtering (status, priority, assignee), and free-text search
- Sprint selector with history browsing
- Module detail overlay with six tabs: Overview, Dependencies, Tasks, Test Cases, UAT Issues, Docs
- Task breakdown within the detail panel (feature grouping, priority badges, status badges, progress bar)
- Module-level progress tracking

## Out of scope

- Drag-and-drop reordering of modules or tasks
- Inline editing of module or task fields on the board
- Real-time collaboration with live cursor presence
- Sprint creation, deletion, and capacity planning
- Resource allocation across team members

---

## Acceptance Laws

These are the aggregate of all module-level acceptance laws. The epic is fully compliant only when every module below is compliant.

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |
