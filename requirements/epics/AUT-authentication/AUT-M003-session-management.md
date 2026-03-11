---
id: AUT-M003
title: Session Management
epic: AUT
status: draft
prototype_route: ~
functionalities:
  - AUT-M003-F001
  - AUT-M003-F002
---

## Overview

Track, refresh, and revoke authenticated sessions safely across multiple devices. A user can view all their active sessions, understand how each was created, and revoke any of them individually or all at once — so they stay in control of where they are currently signed in.

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

### AUT-M003-F001 — Active sessions list

From the user account settings area the user can open a sessions page that shows every device or client where they are currently signed in. Each session entry shows the device type, the approximate location derived from the IP address, the date and time of the most recent activity, and a label indicating whether the entry corresponds to the current session. The list is ordered most-recent-first. If only one session exists it is shown normally; there is no minimum count required to surface the list. The current session is visually distinguished from the others so the user can immediately identify where they are right now relative to any other active contexts.

---

### AUT-M003-F002 — Session revocation

From the active sessions list the user can revoke any session other than their current one by clicking a revoke action on that row. Revoking a session immediately invalidates its token on the server; any subsequent request using that token is rejected and the affected client is signed out. The revoked entry is removed from the list after the operation completes. The user can also revoke all other sessions in a single action, which signs out every other context simultaneously while keeping the current session active. A confirmation step is shown before the bulk revocation executes to prevent accidental sign-outs. If a revocation fails due to a server error, an inline error message is displayed on the affected row and the list is not modified.
