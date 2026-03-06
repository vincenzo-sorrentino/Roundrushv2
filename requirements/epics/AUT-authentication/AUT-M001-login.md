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

The user enters their email address and password and clicks "Log in". If the credentials are correct they land straight in their workspace. If something is wrong, a neutral inline error appears — it doesn't reveal whether the email or the password failed, so no information is leaked. After several consecutive failed attempts within a short window the account is temporarily locked to guard against brute-force access; the user receives a plain-language explanation of what happened and what to do next. If the email doesn't match any known account, a visible link to request an invitation is surfaced so the user isn't left without a path forward.

---

### AUT-M001-F002 — Recover password

From the login screen, a user who can't remember their password clicks "Forgot password" and is asked for their email address. A time-limited reset link is sent to that address. Clicking the link opens a form where the user sets a new password; on success they are taken directly to the login screen to sign in with the new credentials. If the link has expired or is invalid, the page explains clearly why it didn't work and tells the user exactly how to get a fresh one.
