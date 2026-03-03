---
id: AUT-M001-F001
title: Basic login
module: AUT-M001
status: draft          # draft | ready | in_dev | done
---

## User story
As a registered user, I want to log in with my email and password so that I can access my team's workspace.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A user with a verified account exists | They submit valid email + password | They are redirected to the dashboard |
| 2 | A user with a verified account exists | They submit an incorrect password | An inline error is shown without revealing which field is wrong |
| 3 | A user submits the login form | More than 5 failed attempts occur within 15 min | The account is temporarily locked and the user is notified |
| 4 | A user is on the login page | They have no account | A link to request an invitation is visible |
