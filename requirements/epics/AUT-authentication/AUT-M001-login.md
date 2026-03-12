---
id: AUT-M001
title: Login
epic: AUT
status: draft
prototype_route: /auth/login/default
functionalities:
  - AUT-M001-F001
  - AUT-M001-F002
  - AUT-M001-F003
  - AUT-M001-F004
---

## Overview

Allow registered users to authenticate securely using their email and password. If a user forgets their password, they can request a reset link by email and set a new password through a time-limited secure flow. On high-risk session attempts the system requires OTP verification before granting entry. Users who belong to multiple workspaces are offered an account selection screen after successful credential validation.

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

### AUT-M001-F001 — Basic login

The user enters their email address and password and clicks "Log in". If the credentials are correct they land straight in their workspace. If something is wrong, a neutral inline error appears — it doesn't reveal whether the email or the password failed, so no information is leaked. After several consecutive failed attempts within a short window the account is temporarily locked to guard against brute-force access; the user receives a plain-language explanation of what happened and what to do next. If the email doesn't match any known account, a visible link to request an invitation is surfaced so the user isn't left without a path forward.

---

### AUT-M001-F002 — Recover password

From the login screen, a user who can't remember their password clicks "Forgot password" and is asked for their email address. A time-limited reset link is sent to that address. Clicking the link opens a form where the user sets a new password; on success they are taken directly to the login screen to sign in with the new credentials. If the link has expired or is invalid, the page explains clearly why it didn't work and tells the user exactly how to get a fresh one.

---

### AUT-M001-F003 — OTP verification for high-risk sessions

On login attempts that trigger a high-risk flag — for example, an unrecognised device, an unusual geographic location, or a session pattern that deviates from the user's history — the system requires the user to validate with a one-time code before access is granted. The OTP is sent to the user's registered contact method, has a short validity window, and is single-use; an expired or already-used code is rejected with a clear explanation. This step is layered on top of the standard credential check and does not replace it; users in standard session contexts proceed directly after credential validation without encountering this screen.

---

### AUT-M001-F004 — Account selection for multi-workspace users

A user who belongs to more than one team workspace is presented with an account selection screen immediately after their credentials are validated. The screen lists every workspace the user has access to; they choose which one to enter. Once selected, the user lands in that workspace's dashboard. Users who belong to only a single workspace bypass this screen entirely, transitioning directly to their dashboard without any additional interaction. If a workspace reference in the user's token no longer exists, that entry is shown as unavailable with a brief explanation rather than silently removed.
