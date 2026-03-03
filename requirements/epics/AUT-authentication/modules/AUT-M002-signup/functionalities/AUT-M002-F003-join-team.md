---
id: AUT-M002-F003
title: Join team
module: AUT-M002
status: draft          # draft | ready | in_dev | done
---

## User story
As a newly registered user, I want to be automatically added to the team that invited me so that I can start collaborating immediately.

## Acceptance criteria

| # | Given | When | Then |
|---|-------|------|------|
| 1 | A user has just completed account creation via invitation | The account is confirmed | They are automatically added to the inviting team as a member |
| 2 | The user is added to the team | They land on the dashboard | They see the team name and any shared resources |
| 3 | A user tries to join a team they are already a member of | The system processes the request | A friendly message indicates they are already a member |
| 4 | The invitation referenced a team that no longer exists | The user completes signup | They are shown an error and prompted to contact support |
