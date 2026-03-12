---
id: KAN-M004
title: Release Notes
epic: KAN
status: draft
prototype_route: /planning/release-notes
functionalities:
  - KAN-M004-F001
  - KAN-M004-F002
  - KAN-M004-F003
---

## Overview

Provide an approval-gated release notes view that extends the closed sprint report with a formal stakeholder sign-off workflow. The six-tab content from the closed sprint view is presented identically here, and above the report card an approval section allows designated stakeholders to sign and approve the release. The sprint is considered fully approved only when every listed stakeholder has recorded their individual approval, at which point a confirmation banner replaces the approval list.

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

### KAN-M004-F001 — Release notes content

The release notes view contains the same six-tab report as the closed sprint view (KAN-M003): Overview, Stakeholders Issues Log, UAT Issues Log, PROD Issues Log, Finalized Design, and Automated Tests Coverage. All tab content, column layouts, sorting interactions, sprint selector behaviour, and empty-state messaging are identical to those defined in KAN-M003. The sprint selector in the tab header is scoped to closed sprints only, and switching sprints resets the stakeholder approval state for that session.

---

### KAN-M004-F002 — Stakeholder approval section

Above the report card, a dedicated approval section lists all designated stakeholders for the release. Each stakeholder is shown with their avatar, full name, and role. Those who have not yet approved display a Sign & Approve button; those who have approved display a green Approved badge in place of the button. An approval count label (e.g., "2 of 5 approvals received") and a horizontal progress bar at the top of the section update in real time as each stakeholder approves. Once every stakeholder on the list has individually approved, the entire approval section is replaced by a full-width "Sprint fully approved" banner containing a seal icon and a confirmation message stating that all stakeholders have signed the release. Approval actions are session-scoped in the prototype — navigating away and returning resets the recorded approvals.

---

### KAN-M004-F003 — Export

A card header sits above the tab navigation, matching the closed sprint card header: it shows the sprint title and release date. Two download buttons — Download PDF and Download XLS — are provided. Activating either exports the full release notes content for the selected sprint in the chosen format. In the prototype, a transient toast notification confirms that the export action would proceed.
