---
id: TST-M004
title: Manual UAT & Bug Linking
epic: TST
status: draft
prototype_route: ~
functionalities:
  - TST-M004-F001
  - TST-M004-F002
  - TST-M004-F003
  - TST-M004-F004
---

## Overview

Govern the workflow for tests that cannot be fully automated or require human visual validation — covering UAT library definition, executed UAT session instances, non-functional testing sessions, CLI and IDE-driven manual status submission, and bug ticket linking with evidence attachment.

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

### TST-M004-F001 — UAT test suite management

The UAT section of the testing module exposes two layers: the UAT library and the UAT executed instances. The library is the canonical catalogue of user acceptance test cases defined against each requirement, authored in the same structured JSON format as automated test cases with unique IDs, descriptions, pre-conditions, and expected results. Executed instances are individual records of each time a UAT case was run by a QA engineer or a product stakeholder on a specific environment or device. Each instance captures the tester's identity, the target environment, the execution timestamp, and the outcome. Library entries and executed instances are kept separate so the cumulative history of a UAT case is always visible independently of its current status.

---

### TST-M004-F002 — Non-functional testing sessions

Non-functional test cases covering areas such as performance, accessibility, security, and compatibility are managed through a dedicated library within the same module. The library groups non-functional cases by category, and each case follows the same unique-ID-anchored format used elsewhere in the testing suite. Execution sessions record the run configuration alongside the outcome — including the target environment, the testing tool used, and the measured parameter values. Non-functional sessions are not expected to go through the automated CI pipeline; they are submitted as manual payloads via the CLI tool using the standard `rr test:pass` or `rr test:fail` commands, extended with a session-level metadata block that describes the tested configuration and the measured results.

---

### TST-M004-F003 — Manual status update via CLI or IDE

When a test cannot be automated or requires a physical device or human judgement, QA engineers use the local CLI tool or the IDE extension to submit the result directly against its unique test ID. The tool accepts the test ID and outcome (pass, fail, or blocked) as arguments, then prompts the engineer to provide supporting evidence before submitting — a link to a screen recording, a Jam.dev capture URL, or a textual description of the observed behaviour. The tool formats this information into the standard API payload structure and POSTs it to the backend API, updating the test case status in exactly the same way as a CI pipeline payload. The manual provenance is recorded in the execution metadata so dashboard consumers can distinguish automated results from human-submitted ones at a glance.

---

### TST-M004-F004 — Bug ticket and evidence linking

When a test case status is set to Failed or Blocked through any submission channel, the system requires a bug reference to be supplied alongside the evidence. The UAT Issue column on the planning matrix renders this reference as a linked badge that navigates to the corresponding ticket in the integrated issue tracker. If the evidence URL is a screen recording or Jam.dev capture, it is rendered as a playback link within the expanded test case detail view. A test case cannot be transitioned from Blocked back to Pending or Active without the associated bug reference first being marked as resolved in the issue tracker — this coupling ensures no blocked test is silently cleared without a corresponding fix record. The evidence URL and bug reference are preserved in the execution history and remain visible even after the test case eventually passes.
