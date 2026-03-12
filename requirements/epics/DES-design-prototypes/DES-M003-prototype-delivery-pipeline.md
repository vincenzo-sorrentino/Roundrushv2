---
id: DES-M003
title: Prototype Delivery Pipeline
epic: DES
status: draft
prototype_route: ~
functionalities:
  - DES-M003-F001
  - DES-M003-F002
  - DES-M003-F003
  - DES-M003-F004
  - DES-M003-F005
  - DES-M003-F006
---

## Overview

Define the secure, version-controlled infrastructure that moves prototype files from the repository into the app without introducing database bloat or cross-site scripting risk. The pipeline operates automatically on branch merge events: it copies prototype files to a namespaced path in a static storage bucket and notifies the backend API, which stores only a URL pointer against the module record. The frontend never executes raw prototype HTML inside the main application context; instead it renders the prototype through a sandboxed iframe that isolates the prototype's JavaScript from the parent application.

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

### DES-M003-F001 — Repository folder structure and naming convention

All prototype files must reside under `/prototypes/` in the repository, organised by epic and module in the path `/prototypes/<epic-id>/<module-id>/`. Every prototype directory must contain an `index.html` as the entry point, a `version.json` file declaring the current version string and the linked requirement module identifier, and any supporting CSS and JS assets as self-contained files. No external CDN references are permitted inside prototype bundles; all dependencies must be vendored locally to guarantee reproducibility. The naming convention is enforced at the CI step — any pull request that introduces a prototype directory missing these mandatory files is rejected with a descriptive pipeline error.

---

### DES-M003-F002 — Three-branch lifecycle model

The repository maintains three long-lived branches that correspond to distinct prototype lifecycle states. The `design` branch holds all future requirements and their associated prototypes that have not yet been scheduled into an active sprint; this is the backlog state. The `develop` branch holds all previously delivered prototypes plus the prototypes assigned to the currently active sprint; this is the work-in-progress state. The `main` branch holds only prototypes that belong to officially completed and released sprints; this is the production state. Promoting a prototype from one state to the next happens exclusively through a pull request merge into the corresponding branch — no direct pushes to these branches are permitted.

---

### DES-M003-F003 — Automated CI/CD sync pipeline

A GitHub Actions workflow is triggered on every push to `design`, `develop`, or `main` that touches any path under `prototypes/`. The pipeline checks out the code, resolves the branch name, and executes a sync command that copies the entire contents of `/prototypes/` to the matching namespaced path in the static storage bucket (`s3://rr-prototypes/<branch>/`). The sync uses a delete flag so that files removed from the repository are also removed from the bucket, preventing stale prototype versions from remaining accessible. After a successful upload the pipeline constructs a JSON payload containing the branch, the base CDN URL for that branch, and a trigger identifier, then POSTs it to the backend sync endpoint. The pipeline fails and alerts on any upload or API error; it does not silently continue on partial failure.

---

### DES-M003-F004 — Backend sync API and database contract

The backend exposes a `POST /api/v2/syncruns` endpoint that receives the payload from the CI/CD pipeline. The payload carries a `trigger` string (always `merge`), the `branch` name, the `module_id` string identifying the linked requirement module, and a `prototype_evidence` object containing the `version` label and the fully qualified CDN `url` pointing to the prototype's `index.html`. The backend parses this payload, resolves the module record by `module_id`, and updates it with the new URL pointer and version. The backend stores the URL string only — it never fetches, parses, or executes the prototype HTML. The endpoint requires authentication via a server-side API key passed in the `Authorization` header; unauthenticated requests are rejected with a `401` response.

---

### DES-M003-F005 — Secure iframe sandbox rendering

When the frontend receives a module record that contains a `prototype_evidence.url`, it renders the prototype inside an `<iframe>` element using the URL as the `src` attribute. The iframe carries a `sandbox` attribute set to `allow-scripts allow-same-origin`. This configuration permits the prototype's own JavaScript to execute within its origin context while physically blocking any attempt to access the parent application's storage, cookies, or JavaScript execution context. The iframe is sized to fill its container and carries a descriptive `title` for accessibility. No `allow-top-navigation`, `allow-forms`, or `allow-popups` permissions are granted. If the URL is absent or the prototype returns a non-200 response the frontend shows a descriptive empty state rather than a broken iframe.

---

### DES-M003-F006 — Acceptance validation linkage

When a module's Acceptance Laws table transitions to a fully passing state — meaning every law from AL-01 through AL-07 records a `pass` status — the system automatically marks the prototype version associated with that module as `validated`. This status is stored on the `prototype_evidence` record alongside the URL pointer and is surfaced as a badge in the design status board and in the prototype catalogue. The purpose of this linkage is to prevent divergence between the design intent encoded in the prototype and the implemented production behaviour: a prototype that has never been validated against its Acceptance Laws remains in an `unvalidated` state regardless of how long it has been in the repository.
