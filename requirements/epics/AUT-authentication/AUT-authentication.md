---
id: AUT
title_short: Authentication
title: Authentication and team access
design_state: drafting
modules:
  - AUT-M001
  - AUT-M002
---

## Objective

Provide secure, invitation-based authentication so that only authorised team members can access the workspace. Users can log in with email and password, recover a forgotten password, and join a team through a time-limited invitation link.

## In scope

- Email and password login with rate-limiting on failed attempts
- Password recovery via a time-limited reset link
- Invitation-based signup (admin sends invite → user creates account → user joins team)
- Automatic team membership upon completing the invitation flow

## Out of scope

- Advanced organisation management
- Single Sign-On (SSO) and Multi-Factor Authentication (MFA)
- Role and permission management beyond member/admin distinction

---

## Acceptance Laws

These are the aggregate of all module-level acceptance laws. The epic is fully compliant only when every module below is compliant.

| ID    | Name                                                          | Status  |
|-------|---------------------------------------------------------------|---------|
| AL-01 | Production code implemented                                   | pending |
| AL-02 | Unit and integration tests pass with 100% coverage           | pending |
| AL-03 | Documentation updated (requirements, tests, comments, UML)   | pending |
| AL-04 | End-to-end tests implemented and passed                      | pending |
| AL-05 | Dependency map between modules updated                        | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100% | pending |
| AL-07 | Manual test suites completed (including smoke tests)          | pending |
