---
id: KAN
title_short: Kanban / Planning
title: Sprint planning board and module detail
design_state: drafting
modules:
  - KAN-M001
  - KAN-M002
  - KAN-M003
  - KAN-M004
---

## Objective

Give the team a fully reactive, CI/CD-driven sprint planning board where module and task statuses are maintained automatically by the pipeline with no manual editing. Modules are grouped by feature area and can be sorted and filtered. Any module can be opened into a deep-dive detail panel covering six tabs of delivery context. When all modules in the active sprint have reached Done, a Copilot-assisted close sprint flow transitions the sprint to closed. Closed sprints are accessible as read-only tabbed report cards, and a separate release notes view adds a formal stakeholder sign-off workflow before a sprint is declared fully approved.

## In scope

- Reactive sprint board table: modules grouped by feature area, seven-column layout, no manual status editing
- Column sorting, multi-criteria filtering (modules, priority, assignee, status), and free-text search
- Sprint selector with status-dot indicators (active / closed / planned) and sprint history navigation
- Close sprint flow with Copilot / agentic AI pre-validation of all seven Acceptance Laws before confirmation
- CI/CD-driven task status lifecycle: TODO → IN PROGRESS → RFR → MERGED → QA → DONE, triggered by pipeline events
- Branch naming enforcement via Husky (local) and GitHub Actions gate (server-side)
- Module detail overlay with six tabs: Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, UAT Issues
- AL compliance table with Pass / Fail badges computed by the backend
- Task breakdown: auto-generated from Acceptance Laws, feature-grouped, with PR link column and CI-driven statuses
- Test cases tab with numbered rows, pre-conditions, steps, expected results, and result badges
- UAT issues tab scoped by FE / BE / BE&FE / Devops with PR link and staging/dev status
- Closed sprint view: tabbed report card covering Overview, Stakeholders Issues Log, UAT Issues Log, PROD Issues Log, Finalized Design, Automated Tests Coverage
- Release notes view: same tabbed content plus a stakeholder sign-off approval section; sprint fully approved when all stakeholders have signed
- PDF and XLS export of closed sprint release notes

## Out of scope

- Drag-and-drop reordering of modules or tasks
- Inline editing of module or task fields on the board
- Manual creation, deletion, or reassignment of tasks
- Real-time collaboration with live cursor presence
- Sprint creation, deletion, and capacity planning
- Resource allocation and workload balancing across team members

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
