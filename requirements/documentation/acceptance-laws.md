---
id: DOC-acceptance-laws
title: Acceptance Laws
category: Governance
version: "1.0"
last_updated: "2026-03-11"
---

## Purpose

This document is the **canonical and sole authoritative source** for the Roundrush Acceptance Laws. Every epic and module file tracks compliance against the laws defined here. Laws are read-only in all other documents — any change to a law's definition must be made here first and then reflected in the platform.

The seven Acceptance Laws are strict, non-negotiable quality gates. A module is considered compliant only when all seven laws are in Pass status simultaneously. Partial compliance does not qualify a module or epic for release.

**Validation authority:** The authority that validates acceptance law compliance is the AI Copilot agent operating locally in the development environment. Validation is a joint responsibility between the developer and the QA engineer, but the enforcement logic is automated and deterministic — Copilot evaluates each law against objective evidence (merged PRs, CI reports, coverage reports, test execution logs, dependency map snapshots, regression test reports, and QA sign-off entries) and determines pass or fail without subjective override. A human developer or QA engineer may flag a discrepancy for re-evaluation, but compliance cannot be self-certified by hand.

---

## AL-01 — All production code implemented

All production code for the module has been implemented, peer-reviewed, and merged into the integration branch before the module is evaluated for compliance.

**Standards:**
- No feature flags masking incomplete work at evaluation time.
- Code must pass the CI lint and build pipeline with no errors.
- Breaking changes to shared interfaces require a migration path documented in the PR.

**Evidence required:**
- Closed and merged PR(s) linked to the module task.
- Green CI build on the integration branch.

**Failure condition:** Module has open or draft PRs, or CI is red on the integration branch.

---

## AL-02 — All automated unit and integration tests pass with 100% coverage

All automated unit and integration tests must pass with no failures. Overall coverage must meet or exceed the project threshold (currently 80% statement coverage).

**Standards:**
- Tests must be deterministic — no flaky or time-dependent assertions.
- New logic paths introduced by the module must be covered.
- Integration tests must assert against real service boundaries, not internal implementation details.

**Evidence required:**
- Test execution report (unit and integration).
- Coverage report showing module-level and project-level percentages.

**Failure condition:** Any test failure, or coverage below the threshold for the modified files.

---

## AL-03 — All documentation updated

All documentation affected by the module changes has been updated. This includes requirements files (if necessary), tests, code comments, component documentation, and UML diagrams — covering both architecture diagrams and use case diagrams where applicable.

**Standards:**
- Requirements files must reflect the final implemented scope — no gaps between spec and code.
- Public APIs and exported functions must have updated JSDoc or equivalent.
- Architecture and use case UML diagrams must be updated when structure or behaviour changes.
- ADRs must be filed for any architectural decision made during delivery.

**Evidence required:**
- Updated requirement `.md` file(s) linked in the PR.
- Confirmed UML diagrams are current (architecture + use cases).

**Failure condition:** Any documentation gap between the implemented scope and the written spec, or stale UML diagrams.

---

## AL-04 — All end-to-end tests implemented and passed

End-to-end tests covering all user-facing flows defined in the module's acceptance criteria must be implemented and pass in CI before the module is marked compliant.

**Standards:**
- E2E tests must cover happy paths and critical error paths.
- Tests run against a deployed staging environment, not a local server.
- Any flaky E2E test must be fixed — not skipped — before compliance is granted.

**Evidence required:**
- E2E test execution report (Playwright or Cypress CI run).
- All tests green on the latest staging deployment.

**Failure condition:** Any E2E test failure or a user-facing acceptance criterion without test coverage.

---

## AL-05 — Dependency map between modules updated

The module dependency map must be reviewed and updated whenever the module introduces, removes, or modifies dependencies on other modules.

**Standards:**
- Dependency graph snapshot must be regenerated and committed.
- Circular dependencies introduced by the module are a blocking issue.
- Explicit confirmation of "no change" must appear in the PR description if no dependencies changed.

**Evidence required:**
- Updated dependency map snapshot file committed to the repository.
- PR description includes a dependency review summary.

**Failure condition:** Dependency map not updated after a change with impact on module relationships.

---

## AL-06 — AI-generated regression tests based on dependency analysis pass 100%

All regression tests derived from modules that depend on (or are depended upon by) the changed module must pass with 100% success before compliance is granted.

**Standards:**
- The regression scope is derived from the dependency map, not manually selected.
- Zero failures permitted — partial success is not acceptable for this gate.
- Regression suite must be re-run after any fix that modifies dependency behaviour.

**Evidence required:**
- Regression test execution report with 100% pass rate.
- The report must reference the dependency scope used to derive the test set.

**Failure condition:** Any regression test failure, or regression suite not executed for impacted modules.

---

## AL-07 — All manual test suites (including smoke tests) completed

All required manual validation sessions — smoke tests, exploratory testing, and accessibility review where applicable — must be completed and documented before the module is released.

**Standards:**
- Manual sessions must be conducted in the staging environment.
- Results must be recorded in the QA sign-off log with tester name, date, and outcome.
- Any discovered defect must either be fixed or explicitly accepted as a known issue with a ticket.

**Evidence required:**
- QA sign-off log entry linked to the module.
- All discovered defects resolved or triaged to backlog with documented acceptance.

**Failure condition:** Manual sessions not completed or defects unresolved without a documented acceptance decision.

---

## Compliance verification

A module is compliant only when all seven laws are simultaneously in Pass status. The Acceptance Laws table in each module and epic requirement file reflects the live compliance state and must be kept current. The **only place to amend a law's definition** is this document.
