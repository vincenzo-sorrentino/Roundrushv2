---
id: AUT-M002-F002
title: Make an account
module: AUT-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As an invited user, I want to create my account by setting my name and password so that I have credentials to log in.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A user arrives via a valid invitation link | They see the signup form | The email field is pre-filled and read-only |
| 2 | The user fills in name and a password meeting the policy | They submit the form | The account is created and they proceed to join the team |
| 3 | The user enters a password that does not meet the policy | They try to submit | Inline validation explains the policy requirements |
| 4 | The signup form is submitted | The server processes it | The password is stored using a secure hashing algorithm (bcrypt or argon2) |
