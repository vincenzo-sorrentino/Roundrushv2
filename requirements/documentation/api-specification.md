---
id: DOC-api-specification
title: RoundRush API Specification
category: Engineering
version: "1.0"
last_updated: "2026-03-12"
---

## Purpose

The RoundRush API module defines how external repositories integrate with RoundRush V2. This is not merely a technical API description — it is the backbone of the synchronisation model between repository truth and RoundRush visualisation.

---

## Project Integration Flow

Each new project must connect its repository to RoundRush, generate a secure project-specific API key, store that key securely in project environment variables, and configure Copilot integration for automated synchronisation. No project may operate in V2 without formal API integration.

### Steps

1. Connect the repository to RoundRush.
2. Generate a secure project-specific API key.
3. Store the key securely in project environment variables.
4. Configure Copilot integration for automated synchronisation.

---

## Copilot Integration Requirement

Every integrated repository must include a `copilot-instructions` directory at the root level. This directory must not become a monolithic instruction file. Instead, it must reference modular sub-files to avoid bloating and degradation over time.

### Required structure

```
/copilot-instructions/
/copilot-instructions/main.md
/copilot-instructions/rr-sync.md
/copilot-instructions/testing.md
/copilot-instructions/governance.md
```

### Mandatory synchronisation paragraph

Inside the relevant synchronisation sub-file (`rr-sync.md`), the following paragraph must be included verbatim:

> At each new commit, all progress and structural changes must be mirrored to RoundRush via the RoundRush API. The AI agent must evaluate updated requirements, modified modules, testing results, coverage metrics, documentation changes, and dependency updates, and push the corresponding status update to RoundRush automatically.

This instruction ensures:

- Automatic API push after every commit.
- Deterministic synchronisation.
- Elimination of manual reporting.

---

## API Responsibilities

The RoundRush V2 API must:

- Accept updates about requirement progress.
- Accept validation of Acceptance Laws.
- Track branch creation, PR status, and merge state.
- Track test execution results and coverage.
- Store dependency graph updates.
- Log sprint associations.
- Register user role (developer, QA, designer).

The API must be designed for AI readability. Documentation must be structured clearly, with deterministic request schemas, explicit payload examples, and validation constraints.

---

## Repository Organisation Guidelines

The API specification defines a required project boilerplate structure to ensure consistent mirroring between repository layout and RoundRush visualisation.

### Required structure

```
/requirements/
/requirements/modules/
/tests/
/tests/unit/
/tests/integration/
/tests/e2e/
/docs/
/docs/uml/
/project-governance/
/dependency-map/
/prototypes/
```

The API documentation must clearly describe:

- Where testing suites must reside.
- How dependency maps must be stored.
- How requirements are structured.
- Naming conventions for modules and features.
- Documentation update rules.
