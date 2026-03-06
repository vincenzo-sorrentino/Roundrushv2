---
id: AUT-M001
title: Login
epic: AUT
status: draft
prototype_route: /auth/login/default
functionalities:
  - AUT-M001-F001
  - AUT-M001-F002
---

## Overview

Allow registered users to authenticate securely using their email and password. If a user forgets their password, they can request a reset link by email and set a new password through a time-limited secure flow.

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

### AUT-M001-F001 — Basic login

**User story**

As a registered user, I want to log in with my email and password so that I can access my team workspace.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A valid email and password are entered | The user clicks "Log in" | The user is redirected to the dashboard |
| 2 | An incorrect password is entered | The user clicks "Log in" | An inline error is shown without revealing which field is wrong |
| 3 | 5 or more failed login attempts happen within 15 minutes | The user tries to log in again | The account is temporarily locked and the user receives an explanation |
| 4 | The entered email has no associated account | The user views the login form | A visible link to request an invitation is shown |

---

### AUT-M001-F002 — Recover password

**User story**

As a registered user who has forgotten their password, I want to receive a reset link by email so that I can set a new password and regain access to my account.

**Acceptance criteria**

| # | Given | When | Then |
|---|-------|------|------|
| 1 | The user is on the login screen | They click "Forgot password" | A form appears asking for their email address |
| 2 | A valid registered email is submitted | The user requests a reset | A time-limited password reset link is sent to that email |
| 3 | The user opens a valid reset link and submits a new password | The form is completed | The password is updated and the user is prompted to log in |
| 4 | The user opens an expired or invalid reset link | The page loads | A clear error message explains the link is invalid and how to request a new one |
