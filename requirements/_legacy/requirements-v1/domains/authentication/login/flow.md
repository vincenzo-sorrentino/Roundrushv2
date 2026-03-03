# Entry Conditions

- User is unauthenticated.
- User is on `/auth/login/default`.

# Primary Steps

1. User enters email and password.
2. User submits form.
3. Client validates non-empty fields.
4. Client calls `POST /auth/login`.
5. On success, session is stored and user is redirected to dashboard.

# Alternate Paths

- User chooses "Forgot password" and is routed to reset request flow.
- User chooses "Use SSO" and is routed to organization SSO initiation.

# Failure Paths

- Invalid credentials: inline alert, no field-specific leak.
- Too many attempts: lockout messaging with retry-after guidance.
- Service unavailable: generic temporary failure with retry action.

# Exit Conditions

- Authenticated session created and dashboard route loaded.
