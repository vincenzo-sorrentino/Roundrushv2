# Entry Conditions

- Org admin has permission to invite members.
- Invitee receives invite email with tokenized link.

# Primary Steps

1. Admin submits invite form (email + role).
2. System creates invite token and sends email.
3. Invitee opens invite link.
4. System validates token and invite status.
5. Invitee signs in or registers.
6. Invite is consumed and membership is created.

# Alternate Paths

- Existing user signs in directly and completes membership link.

# Failure Paths

- Token expired or invalid.
- Invite revoked before acceptance.

# Exit Conditions

- Invitee is added to organization with expected role.
