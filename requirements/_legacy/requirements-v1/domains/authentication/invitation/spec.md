---
id: auth-invitation
domain: authentication
feature: invitation
status: draft
owner: product
prototype_route: /auth/invitation/default
figma_url: https://figma.com/design/REPLACE/auth-flow?node-id=1-4
updated_at: 2026-02-27
---

# Problem

Organization admins need reliable invite management so users join the right tenant and role.

# Scope

- Invite creation and acceptance.
- Single-use token behavior and expiry.

# User Stories

- As an org admin, I can invite members by email.
- As an invitee, I can accept and join the organization with the assigned role.

# Functional Requirements

- `POST /orgs/:org_id/invites` creates invite token with expiry.
- `GET /auth/invite/accept?token=...` consumes token and maps user to org.

# Non-Functional Requirements

- Token entropy and single-use guarantee.

# Edge Cases

- Expired token.
- Revoked token.
- Existing account with different organization context.

# Dependencies

- Organization service, email sender, token service.

# Acceptance Criteria

- Invite token can be consumed once and user is added with correct role.
