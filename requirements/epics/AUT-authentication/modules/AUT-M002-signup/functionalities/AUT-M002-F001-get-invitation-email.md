---
id: AUT-M002-F001
title: Get invitation email
module: AUT-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As a prospective user, I want to receive an invitation email from a team admin so that I can begin the signup process.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | An admin enters a valid email in the "Invite member" form | They submit the form | An invitation email is sent to that address |
| 2 | The prospective user receives the email | They open it | The email contains a unique, time-limited signup link and the team name |
| 3 | An admin tries to invite an email that already has an account | They submit the form | The system informs the admin that the user already exists |
| 4 | An invitation link expires | The prospective user clicks it | They see a message explaining the link has expired and how to request a new one |
