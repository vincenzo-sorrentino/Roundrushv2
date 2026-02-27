---
id: auth-registration
domain: authentication
feature: registration
status: draft
owner: product
prototype_route: /auth/registration/default
figma_url: https://figma.com/design/REPLACE/auth-flow?node-id=1-3
updated_at: 2026-02-27
---

# Problem

New users need a guided path to create accounts while preventing abuse.

# Scope

- Email/password registration.
- Initial verification step handoff.

# User Stories

- As a new user, I can register with clear next steps to verify my account.

# Functional Requirements

- `POST /auth/register` creates account in pending-verification state.
- Duplicate email handling is deterministic and safe.

# Non-Functional Requirements

- Register endpoint has anti-abuse controls.

# Edge Cases

- Disposable email domain rules.
- Retry behavior on verification email send failure.

# Dependencies

- User service, email provider, anti-abuse middleware.

# Acceptance Criteria

- New account is created with `verify_email` next step.
