---
id: RMP
title_short: Roadmap
title: Roadmap timeline and snapshot planning
design_state: draft
modules:
  - RMP-M001
  - RMP-M002
---

## Objective

Give product managers and leadership a dynamically generated timeline canvas that visualises every module across all epics over the full project lifespan — from inception to present — without any manual maintenance. The roadmap is driven entirely by repository truth: sprint metadata, requirement identifiers, and pipeline state are parsed automatically to produce a live Gantt chart. A companion snapshot mode lets managers create named, editable copies of the roadmap for planning sessions and stakeholder meetings.

## In scope

- Automatically generated two-track Gantt timeline (Development and Design)
- Module items identified by epic-module ID and short title (e.g. `AUT-001 · Login form`)
- Sprint-based columns with status-colour coding and current-sprint highlighting
- Project settings (start/end dates, sprint duration, team members)
- Snapshot mode: named, editable copies of the live roadmap
- Drag-and-drop and resize interactions within a snapshot
- Export of a snapshot as image or PDF

## Out of scope

- Manual editing of the live roadmap (all data comes from repository and pipeline state)
- Resource allocation and capacity planning per team member
- Financial budgeting and cost tracking
- External stakeholder portal or public roadmap sharing
- Milestone markers or release groupings (handled by the Kanban epic)

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
