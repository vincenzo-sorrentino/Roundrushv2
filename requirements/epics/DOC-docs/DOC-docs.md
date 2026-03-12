---
id: DOC
title_short: Documentation
title: Documentation hub and knowledge base
design_state: discovery
modules:
  - DOC-M001
---

## Objective

Provide a documentation tab in every Roundrush project that reads `.md` files from the repository's `requirements/documentation/` folder and renders them as a browsable, searchable knowledge base. Contributors maintain the documentation in the repo; the tab surfaces it without any additional publishing step.

## In scope

- Hub landing: card grid of all documentation sections with live search and results dropdown
- Section detail view: two-panel layout with persistent left-nav and structured article rendering
- Per-section history drawer showing change log entries with user attribution
- MD file ingestion from `requirements/documentation/` using YAML frontmatter for section metadata
- Category and tag system for search matching and colour coding in results
- Code block rendering with copy-to-clipboard

## Out of scope

- Real-time collaborative editing of documentation in the UI
- Document versioning (diff view or rollback within the app)
- External wiki or Confluence integration
- Automatic derivation of history from git log (history entries are maintained as structured data)

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
