---
id: DEP
title_short: Dependencies
title: Dependency tracking and intelligent impact mapping
design_state: draft
modules:
  - DEP-M001
  - DEP-M002
  - DEP-M003
---

## Objective

Give every team member — and the local AI agent — a live, authoritative map of how modules depend on each other, so that developers can anticipate the blast radius of any change, QA teams can construct targeted regression suites sprint after sprint, and unintended regressions are caught before they reach production.

## In scope

- Global dependency map maintained as a Directed Acyclic Graph (DAG) at module-to-module granularity
- Graph view: interactive UML component diagram rendering the full DAG with risk and confidence annotations
- List view: flat, filterable table rendering the same underlying dependency data in natural language
- Module-level scoped dependency panel embedded contextually inside the requirements view and the sprint board
- AI-agent-driven detection of structural connections from repository analysis, with a per-edge confidence score
- Impact analysis: automatic identification of all modules affected when a given module changes
- Regression test suite generation driven by dependency analysis, performed sprint after sprint with QA and Copilot agents
- Deep-linking from the scoped module panel back to the relevant node in the global map

## Out of scope

- Automated enforcement (blocking merges based on dependency violations)
- External third-party or library dependency management
- Semantic version resolution
- Dependency tracking below module level (task or code-file granularity)

---

## AI Agent Role

The dependency map is not maintained manually — it is continuously updated by the local AI agent (Copilot) as part of the standard development workflow. The agent is responsible for five core behaviours:

- **Maintain the map**: Keep the global `Dependency_Edges` table accurate and current as the module structure evolves.
- **Analyse the repository**: Detect structural connections between modules by inspecting code — API calls, workflow triggers, shared interfaces, and policy reads — and assign a confidence score (0–1) to each detected edge.
- **Detect changes**: Update the dependency graph automatically whenever a module changes, a new functionality is introduced, or an existing one is modified.
- **Identify impact areas**: When a new requirement or functionality is added, determine which existing modules are affected and surface this as updated edges in the graph and list views.
- **Generate regression tests**: Produce contextual regression tests and validation scenarios per sprint, derived from the current dependency map, so that QA always has a targeted testing scope that reflects the real coupling in the codebase.

When the agent detects a structural change it transmits the updated dependency payload to the backend via the **SyncRun ingestion pipeline**. The backend stores each edge in the **`Dependency_Edges`** database table and serves the flat JSON array to the frontend on demand. Both the graph and list views always render live, agent-verified data — not a static diagram.

The ultimate goal is to strongly mitigate unintended regressions. Sprint after sprint, QA and Copilot agents study the existing inter-dependencies and those that may arise from new requirements, and produce a strict, targeted regression testing suite from that analysis.

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

---

## Modules

| ID       | Title                            | Status  |
|----------|----------------------------------|---------|
| DEP-M001 | Dependency Map — Graph View      | draft   |
| DEP-M002 | Dependency Map — List View       | draft   |
| DEP-M003 | Module-Level Dependency Panel    | draft   |
