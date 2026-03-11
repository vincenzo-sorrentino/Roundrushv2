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
