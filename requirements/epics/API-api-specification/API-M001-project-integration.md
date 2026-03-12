---
id: API-M001
title: Project Integration
epic: API
status: draft
prototype_route: ~
functionalities:
  - API-M001-F001
  - API-M001-F002
  - API-M001-F003
---

## Overview

Define the mandatory steps for connecting a project repository to RoundRush V2. Every project that operates within V2 must complete the formal integration process before any synchronisation can occur. The integration flow covers repository connection, API key generation, secure key storage, and Copilot configuration.

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

### API-M001-F001 — Repository connection

A project administrator connects the target repository to RoundRush V2 through the integration onboarding flow. The system validates that the repository is accessible, records the connection, and assigns the project a unique internal identifier used in all subsequent API calls. If the repository is already registered, the system surfaces the existing connection record rather than creating a duplicate.

---

### API-M001-F002 — API key generation

Once a repository is connected, the system generates a project-specific API key scoped exclusively to that project. The key is shown to the administrator once at generation time and cannot be retrieved again — a lost key requires revocation and re-generation. The system stores only a hashed representation of the key and never exposes the raw value after the initial display. Each project may have at most one active key at any time; generating a new key automatically revokes the previous one after a short overlap window to allow CI pipelines to be updated without downtime.

---

### API-M001-F003 — Environment and Copilot configuration

After key generation, the system provides step-by-step guidance for storing the key in the project's environment variables and configuring the Copilot integration. The guidance is specific to the repository host (GitHub, GitLab, Bitbucket) and includes the exact environment variable name expected by the RoundRush sync agent. The configuration is considered complete when the system receives a successful test ping from the repository's CI environment confirming that the key is valid and the sync agent is reachable.
