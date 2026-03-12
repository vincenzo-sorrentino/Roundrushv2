---
id: TST
title_short: Testing Suite
title: Test management and execution tracking
design_state: discovery
modules:
  - TST-M001
  - TST-M002
  - TST-M003
  - TST-M004
---

## Objective

Centralise, validate, and visualise all testing activity in RoundRush — covering automated test execution, code coverage, regression test generation, manual test sessions, and Acceptance Law verification — so that every quality signal is traceable, up to date, and never manually maintained.

Testing in RoundRush V2 is proactive and AI-assisted. The testing suite must be designed before each sprint or development cycle begins, based on new requirements, dependency graph analysis, and historical regression patterns. The platform dashboard is a read-only visualisation layer driven entirely by automated API payloads triggered by repository events and CI/CD pipelines.

## In scope

- Test case planning and organisation (structured JSON/YAML committed to Git)
- Test execution tracking per environment with pass, fail, and blocked counts
- Unique test ID scheme establishing the traceability anchor between planning and execution
- Requirement-to-test bidirectional traceability
- CI/CD execution result ingestion via structured API payloads
- Test status synchronisation without manual dashboard updates
- Acceptance Law progress tracking per module derived from test results
- Unit, integration, and end-to-end test coverage per module
- UAT library and executed UAT session instances
- Non-functional testing library and sessions
- AI-driven regression scenario generation based on dependency graph analysis
- Coverage evolution visualisation and coverage drop detection
- Recurring failure pattern identification
- Manual UAT status submission via CLI tool or IDE extension with evidence attachment
- Bug ticket and screen-recording linking per blocked or failed test case

## Out of scope

- CI/CD pipeline infrastructure configuration and hosting
- Test framework or runner selection (Cypress, Playwright, etc.)
- Local device lab management for mobile testing

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
