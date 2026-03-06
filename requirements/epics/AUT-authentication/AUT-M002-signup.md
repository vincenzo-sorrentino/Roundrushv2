---
id: AUT-M002
title: Signup
epic: AUT
status: draft
prototype_route: ~
functionalities:
  - AUT-M002-F001
  - AUT-M002-F002
  - AUT-M002-F003
---

## Overview

Allow new users to join Roundrush exclusively through an admin-issued invitation. The flow covers receiving the email, creating an account with name and password, and automatically joining the inviting team once registration is complete.

## Acceptance Laws

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |

---

## Functionalities

### AUT-M002-F001 — Get invitation email

Joining Roundrush always starts with an invitation from an admin. Once an admin enters a valid email address and sends the invite, the prospective user receives an email that clearly shows the team name and a unique, time-limited signup link. If that link is opened after it has expired, the user sees a friendly message explaining what happened and how to ask for a new one. Admins are also protected from accidental duplicate invites — if the target email already belongs to an existing account the system alerts them before anything is dispatched.

---

### AUT-M002-F002 — Make an account

When the user opens a valid invitation link, the registration form loads with their email address already filled in and locked — they only need to choose a display name and a password. Password validation runs as they type, giving instant feedback rather than waiting for a submit attempt. Once both fields pass and the form is submitted, the account is created and the flow moves automatically into the team-joining step.

---

### AUT-M002-F003 — Join team

The moment account registration is complete, the user is automatically added to the team that issued the invitation — no extra confirmation is required. When they land on the workspace for the first time, the team name and its shared resources are already visible. If something unexpected happens — for example the team was deleted between the invite being sent and the user registering — a clear error message is shown and the user is given a way to get help rather than being left with a broken screen.
