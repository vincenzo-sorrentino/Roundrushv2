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

**User story**

As a prospective user, I want to receive an invitation email from an admin so that I can begin the signup process for my team.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | An admin submits a valid email address | They send the invite | An invitation email is dispatched to that address |
| 2 | The prospective user opens the email | The email has been delivered | A unique, time-limited signup link and the team name are clearly visible |
| 3 | The admin tries to invite an email that already has an account | They submit the form | The system informs them that user already exists |
| 4 | The user opens an expired invitation link | The page loads | A message explains the link has expired and describes how to request a new one |

---

### AUT-M002-F002 — Make an account

**User story**

As an invited user, I want to create my account with a name and password so that I have personal credentials to access the workspace.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user opens a valid invitation link | The page loads | Their email address is pre-filled and marked as read-only |
| 2 | A name and a valid password are submitted | The user completes the form | The account is created and the flow continues to team joining |
| 3 | The entered password does not meet the policy | The user submits | Inline validation explains what the password is missing |
| 4 | The form is submitted | Registration completes | The password is stored using a secure hashing algorithm (bcrypt or argon2) |

---

### AUT-M002-F003 — Join team

**User story**

As a newly registered user, I want to be automatically added to the inviting team so that I can start collaborating without any extra steps.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user completes account creation using an invitation | Registration finishes | They are automatically added to the inviting team as a member |
| 2 | A user has been added to the team | The dashboard loads | It shows the team name and the shared resources for that team |
| 3 | The user tries to join a team they already belong to | The system detects the duplicate | A friendly message informs them they are already a member |
| 4 | The invitation references a team that has been deleted | The user tries to join | An error is shown and they are advised to contact support |
