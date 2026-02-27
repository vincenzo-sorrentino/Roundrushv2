---
id: auth-login
domain: authentication
feature: login
status: approved
owner: product
prototype_route: /auth/login/default
figma_url: https://figma.com/design/REPLACE/auth-flow?node-id=1-2
updated_at: 2026-02-27
---

# Problem

Returning users need a secure and low-friction way to authenticate and access their organization workspace.

# Scope

In scope:
- Email and password login.
- Generic error handling for credential failures.
- Login throttling and lockout protections.
- Session creation for browser client.

Out of scope:
- MFA enrollment UX.
- SSO login flow details.

# User Stories

- As a returning user, I can log in with email and password.
- As a user with failed attempts, I receive a safe generic error and clear recovery path.

# Functional Requirements

- `POST /auth/login` accepts `{ email, password, remember }`.
- Valid credentials return authenticated session context.
- Invalid credentials return `401` with generic message.
- Endpoint supports `429` throttling response.

# Non-Functional Requirements

- 95th percentile login response under 800ms (excluding network latency).
- Logging must include request correlation ID.

# Edge Cases

- Locked account attempts must return deterministic lockout code.
- Email normalization is case-insensitive and trims whitespace.

# Dependencies

- User account store.
- Session/token service.
- Rate limiting middleware.

# Acceptance Criteria

- Valid credentials create an active session.
- Repeated failures trigger rate limiting.
- Error message does not reveal which field is invalid.
