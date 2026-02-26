# Roundrush Authentication Specification

## Overview

This document describes the authentication system for Roundrush. It defines modules, flows, API contracts, security controls, UX guidance, and acceptance criteria for: Login, SSO, Registration, Invitation (plus supporting features: password reset, MFA, session management, and API authentication).

## Goals

- **Secure**: Protect user accounts and data against common attacks.
- **Simple UX**: Minimize friction for common tasks (login, signup, accept invite).
- **Composable**: Support multiple identity sources (email/password and enterprise SSO).
- **Auditable**: Produce logs for security and compliance.

## Non-Goals

- Full IAM/role management beyond basic organization roles (owner/admin/member).
- Identity federation protocols beyond SAML and OIDC (initial scope).

## Terminology

- **User**: Person with an account in Roundrush.
- **Organization**: Tenant grouping users and resources.
- **SSO Provider**: External identity provider (OIDC/SAML).
- **Session**: Server-side or token-based authenticated session.

---

**Modules**

Each module contains: Purpose, Actors, Primary flows, API endpoints, Data contracts, Validation, Security notes, UX notes, Acceptance criteria.

**Login**

- Purpose: Authenticate returning users via email/password or passwordless link.
- Actors: User, Client (web/mobile), Auth service.
- Flows:
	- Email/password: POST `/auth/login` -> {email, password} -> 200 + session cookie / access token; on failure return 401 with generic message.
	- Passwordless (magic link): POST `/auth/magic-link` -> {email} -> 200; user clicks link with token -> GET `/auth/magic-link/accept?token=...` -> create session.
- API:
	- POST `/auth/login`
		- Request: {email:string, password:string, remember:boolean}
		- Success: 200 {user:{id,email}, access_token, expires_in}
		- Errors: 400 (validation), 401 (invalid creds), 429 (rate limit)
- Validation:
	- Email normalized (lowercase, trimmed).
	- Password length >= 8, strength recommendations.
- Security:
	- Rate-limit per IP and per account on login attempts.
	- Lock account after configurable N failed attempts; require password reset or admin unlock.
	- Store passwords with bcrypt/argon2 (configurable cost) and per-user salt.
	- Use secure, HttpOnly, SameSite cookies for browser sessions. Support JWT access + refresh token model for API/mobile.
- UX:
	- Generic error message: "Invalid email or password." Do not reveal which part failed.
	- Show countdown for resend of magic link.
- Acceptance criteria:
	- Valid credentials produce a usable session token/cookie.
	- Failed attempts are rate-limited and logged.

**Single Sign-On (SSO)**

- Purpose: Allow organizations to authenticate users via OIDC or SAML IdPs.
- Actors: Org admin, Identity Provider (IdP), Roundrush Auth.
- Flows:
	- OIDC: Initiate auth -> redirect to IdP -> IdP returns id_token/assertion -> verify signature & claims -> map to user.
	- SAML: SP-initiated SSO with signed assertions; verify audience, issuer, signature.
- API / Endpoints:
	- GET `/auth/sso/:provider/redirect?org_id=...` -> redirect to IdP
	- POST or GET `/auth/sso/:provider/callback` -> process IdP response
- Provisioning & mapping:
	- Map IdP email claim to existing user in org; if user exists and is invited, accept invitation automatically (see Invitation).
	- If auto-provisioning enabled: create user with role `member` and send welcome email.
- Security:
	- Validate signature and audience on assertions and tokens.
	- Enforce IdP-level constraints (e.g., domain allowlist).
	- Support metadata refresh and certificate rotation without downtime.
- UX:
	- Org admin config screen for adding providers, with test button.
	- Clear errors when metadata or certificates are invalid.
- Acceptance criteria:
	- Successful OIDC/SAML login creates/returns a session identical in capabilities to local login.
	- IdP failures surface actionable admin-level errors.

**Registration**

- Purpose: Create new user accounts via self-signup or via SSO provisioning.
- Actors: New user, client, optional invitation flow.
- Flows:
	- Self-serve: POST `/auth/register` -> {email,password,name,org_name?} -> create user, optional org.
	- Email verification: send verification link POST `/auth/verify` before enabling sensitive access.
- API:
	- POST `/auth/register` Request: {email, password, name, organization?:string}
	- Response: 201 {user_id, next_steps: ["verify_email"]}
- Validation:
	- Email uniqueness enforced per org (and optionally globally).
	- Password strength checks as in Login.
- Security & Abuse:
	- CAPTCHA or rate-limits on register endpoint.
	- Block disposable email domains (configurable list).
- UX:
	- Show clear verification step and resend option.
- Acceptance criteria:
	- New accounts require email verification before joining organizations or accessing protected resources (configurable).

**Invitation**

- Purpose: Allow org admins to invite users to join an organization.
- Actors: Org admin, invitee, system.
- Flows:
	- Admin creates invite via POST `/orgs/:org_id/invites` -> {email, role, expires_in}
	- System sends an email with a one-time invite token link: `/auth/invite/accept?token=...`
	- Invitee clicks link -> if existing account: add to org; if new: pre-fill registration with email and associate invite.
- API:
	- POST `/orgs/:org_id/invites` Request: {email, role}
	- GET `/auth/invite/accept?token=...` Request: token -> Response: redirect to registration/login + consume token
- Security:
	- Invite tokens should be single-use, high-entropy, and expire (e.g., 7 days default).
	- Admins can revoke outstanding invites.
- UX:
	- Invite acceptance should show org name, inviter, and role before finalizing.
- Acceptance criteria:
	- Invite token only usable once and expires.
	- Invitee ends up in correct org and role.

**Password Reset**

- Flow: POST `/auth/password-reset` -> send reset email with token; POST `/auth/password-reset/confirm` -> {token, new_password}.
- Security: Token single-use, short expiry (e.g., 1 hour), throttle requests.
- Acceptance: Successful reset allows login with new password and invalidates earlier sessions (configurable).

**Multi-Factor Authentication (MFA)**

- Support methods: TOTP (authenticator apps), SMS (optional, rate-limited), and WebAuthn (optional future).
- API: endpoints to enroll, verify, and revoke MFA: `/auth/mfa/enroll`, `/auth/mfa/verify`, `/auth/mfa/disable`.
- Security: Backup codes on enrollment, require MFA for high-risk actions.
- Acceptance: Enrolled MFA required on login when enabled.

**Session Management & Tokens**

- Session types: browser cookie sessions (HttpOnly) and token-based (JWT access + refresh).
- Token lifetimes: short-lived access token (e.g., 15m), refresh token (e.g., 30d) with rotation and revocation.
- Logout: POST `/auth/logout` invalidates session and refresh token.
- Admin controls: force logout for user or invalidation of all sessions.

**API Authentication**

- Support OAuth2 client credentials for machine-to-machine tokens, and personal access tokens for developer workflows.
- Endpoints for token creation and revocation: `/api/tokens`.

**Roles, Permissions & Authorization Notes**

- Authentication only asserts identity; authorization handled by RBAC checks elsewhere.
- On registration/invite, assign role `member` by default unless invite specifies otherwise.

**Error Codes & Logging**

- Use consistent error schema: {code:string, message:string, details?:object}
- Common codes: `invalid_credentials`, `rate_limited`, `token_expired`, `token_invalid`, `account_locked`, `mfa_required`.
- Audit events for: login_success, login_failure, password_reset_request, password_reset_complete, invite_created, invite_accepted, sso_config_changed.

**Security & Compliance**

- Transport: TLS 1.2+ mandatory for all endpoints.
- Secrets: rotate keys/certificates regularly; use KMS for token signing keys.
- Storage: encrypt sensitive fields at rest where possible.
- Monitoring: alert on unusual spikes in failed logins or password resets.

**Testing & QA**

- Unit tests for token issuance, token validation, and failure modes.
- Integration tests for SSO flows using test IdPs.
- E2E tests for invite->accept->join flows.

**Open Questions / Decisions**

- Global vs per-organization password policy (default: global, overridable per org later).
- Whether to invalidate all refresh tokens on password change (recommended: yes).

---

For implementation details and API mock examples, request follow-up and I will add concrete request/response examples and sequence diagrams.

