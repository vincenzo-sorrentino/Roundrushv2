---
id: AUT-M001-F002
title: Recover password
module: AUT-M001
status: draft          # draft | ready | in_dev | done
---

## User story
As a registered user who forgot their password, I want to reset it via email so that I can regain access.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A user is on the login page | They click "Forgot password" | They see a form to enter their email |
| 2 | A user submits a valid registered email | The system processes the request | A time-limited reset link is sent to that email |
| 3 | A user opens a valid reset link | They submit a new password meeting the policy | The password is updated and they are prompted to log in |
| 4 | A user opens an expired or invalid reset link | They try to submit a new password | An error message explains the link is no longer valid |
