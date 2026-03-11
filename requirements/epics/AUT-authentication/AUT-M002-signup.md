---
id: AUT-M002
title: Signup
epic: AUT
status: draft
prototype_route: /auth/signup/team
prototype_route_secondary: /auth/signup/guest
functionalities:
  - AUT-M002-F001
  - AUT-M002-F002
  - AUT-M002-F003
  - AUT-M002-F004
  - AUT-M002-F005
  - AUT-M002-F006
---

## Overview

Allow new users to join Roundrush exclusively through an admin-issued invitation. Two distinct signup flows exist based on the role embedded in the invitation token: **Team Member** (`/auth/signup/team`) for internal product-team colleagues, and **Guest Stakeholder** (`/auth/signup/guest`) for external reviewers and clients. Both flows use the same two-column split layout — abstract background panel on the left, form panel on the right — and share the Roundrush wordmark at the top of the content panel.

Self-registration is not permitted under any circumstances. The role value carried by the invitation token determines which flow is loaded. Once registration is complete the user is automatically provisioned with the appropriate access level and transitioned to the workspace.

## Acceptance Laws

> Law definitions are maintained in [`requirements/documentation/acceptance-laws.md`](../../documentation/acceptance-laws.md). The table below tracks compliance status for this module.

| ID    | Name                                                                                         | Status  |
|-------|----------------------------------------------------------------------------------------------|---------|
| AL-01 | All production code implemented                                                              | pending |
| AL-02 | All automated unit and integration tests pass with 100% coverage                             | pending |
| AL-03 | All documentation updated (requirements, tests, code comments, component docs, UML diagrams) | pending |
| AL-04 | All end-to-end tests implemented and passed                                                  | pending |
| AL-05 | Dependency map between modules updated                                                       | pending |
| AL-06 | AI-generated regression tests based on dependency analysis pass 100%                        | pending |
| AL-07 | All manual test suites (including smoke tests) completed                                     | pending |

---

## Functionalities

### AUT-M002-F001 — Receive invitation

Both signup flows are triggered exclusively by an admin-issued invitation. The invitation payload carries: the recipient's email address, the team name, and the role assignment (`team` or `guest`). The system resolves the correct signup URL from the role value — `/auth/signup/team` for team members, `/auth/signup/guest` for guests — and embeds that URL together with the team name and a unique, time-limited token in the invitation email.

When a user opens a valid invitation link:
- The email field is pre-populated with the address from the invitation token and is `readonly` — the user cannot change it.
- The form heading and role chip reflect the role embedded in the token (`Team member` or `Guest`), so the user immediately understands the type of access they are being granted.

Before the invitation is dispatched, the system validates the target email address: if it already belongs to an existing Roundrush account the admin is alerted before anything is sent, preventing accidental duplicate invites.

---

### AUT-M002-F002 — Team member registration form

**Route:** `/auth/signup/team`

The team member registration form presents the following fields in this order:

| # | Field | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | Email | `email` | — | Pre-filled from token; `readonly`; `autocomplete="email"` |
| 2 | Full name | `text` | Yes | `autocomplete="name"`; placeholder "Your full name" |
| 3 | Password | `password` | Yes | `autocomplete="new-password"`; placeholder "Create a password"; live strength indicator (see F004) |

**Heading:** "Join {teamName}" — role chip labelled "Team member" appears above the heading.  
**Subheading:** "You've been invited to join the team. Complete your account to get started."  
**Primary CTA:** "Create account".

An inline error banner appears at the top of the form when validation fails. It is cleared at the start of each new submit attempt. Each failing field receives an error state class and keyboard focus is moved to it.

Validation rules, evaluated in order on submit:

1. **Full name** — must not be empty. Error: "Please enter your full name."
2. **Password** — must satisfy all three strength rules (see F004); the first failing rule's label is surfaced. Error: "Password issue: {rule label}."

A "Wrong email? Contact an admin" link is shown beneath the CTA, opening a pre-addressed email to the admin. There is no self-service registration path.

---

### AUT-M002-F003 — Guest stakeholder registration form

**Route:** `/auth/signup/guest`

The guest registration form presents the following fields in this order:

| # | Field | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | Email | `email` | — | Pre-filled from token; `readonly`; `autocomplete="email"` |
| 2 | Full name | `text` | Yes | `autocomplete="name"`; placeholder "Your full name" |
| 3 | Company | `text` | No | `autocomplete="organization"`; placeholder "Your organisation"; label includes "(optional)" suffix |
| 4 | Password | `password` | Yes | `autocomplete="new-password"`; placeholder "Create a password"; live strength indicator (see F004) |

**Heading:** "You're invited to {teamName}" — role chip labelled "Guest" appears above the heading.  
**Subheading:** "You've been invited as an external stakeholder. Create an account to review and provide feedback."  
**Primary CTA:** "Create guest account".

A static access-scope notice is always visible above the submit button: *"As a guest, you can view content and leave comments. You won't be able to edit or manage the project."* This notice is informational and cannot be dismissed.

Validation and error handling behaviour is identical to the team member flow (F002), applied only to Full name and Password; the Company field is never validated.

A "Wrong email? Contact an admin" link is shown beneath the CTA. There is no self-service registration path.

---

### AUT-M002-F004 — Password creation with live strength feedback

Both registration forms enforce the same three password rules, evaluated client-side in real time:

| Rule | Label | Condition |
|------|-------|-----------|
| Length | At least 8 characters | `password.length >= 8` |
| Number | At least one number | `/[0-9]/.test(password)` |
| Uppercase | At least one uppercase | `/[A-Z]/.test(password)` |

The strength indicator panel is hidden on initial render and becomes visible as soon as the user types the first character in the password field. Each rule row contains a dot indicator that transitions to a "met" state the moment its condition is satisfied — no form submission is required for this feedback.

On form submission, all three rules are evaluated together. If any rule fails, the first failing rule's label is surfaced in the error banner, the password field receives an error state, and the strength panel is forced visible if it was still hidden. All three rules must be met for the form to proceed.

---

### AUT-M002-F005 — Account provisioning and workspace access

On successful form submission, the UI transitions through three screens in sequence without a full-page reload:

**1 — Joining screen (loading)**  
A spinner replaces the form while the backend provisions the account and assigns team access.

- Team member copy: "Setting up your workspace… Adding you to {teamName}. This will only take a moment."
- Guest copy: "Setting up your access… Granting guest access to {teamName}. This will only take a moment."

**2 — Welcome screen (success)**  
Displayed after provisioning completes, with a success icon.

- Team member copy: "Welcome to {teamName}! — You're now part of the team. Your workspace is ready."
- Guest copy: "Access granted! — You now have guest access to {teamName}. You can view content and leave comments."

**3 — Workspace redirect**  
The user is automatically directed to the workspace. For team members, the team name and all shared resources are immediately visible with full read/write access. For guests, the team workspace is visible in read-only mode with the ability to leave comments; edit and project management controls are not accessible.

Access levels provisioned:

| Role | Access granted |
|------|---------------|
| `team` | Full read/write access within the team workspace |
| `guest` | View and comment only; no edit or project management capabilities |

---

### AUT-M002-F006 — Expired or invalid invitation

If an invitation token is invalid, already used, or expired at the time the signup URL is opened, the registration form is never rendered. An error screen is displayed immediately in its place.

**Team member expired screen:**  
Heading: "Invitation expired"  
Body: "This invitation link is no longer valid. It may have expired or the team has been deleted."  
CTA: "Request a new invitation" — opens a pre-addressed email to the admin.

**Guest expired screen:**  
Heading: "Invitation expired"  
Body: "This guest invitation is no longer valid. Please ask the project owner to send a new one."  
CTA: "Request a new invitation" — opens a pre-addressed email to the admin.

In both cases the admin contact mailto link pre-populates the subject line to make requesting a fresh invite as frictionless as possible. No further recovery action is available to the user from this screen — they must wait for a new invitation to be issued by an admin.
