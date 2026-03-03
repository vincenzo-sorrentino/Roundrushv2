# Acceptance Scenarios

## Successful Login
- Given: valid account and correct password.
- When: user submits login form.
- Then: user lands in authenticated area and session is active.

## Invalid Credentials
- Given: valid account and incorrect password.
- When: user submits login form.
- Then: user sees generic invalid credentials message and remains unauthenticated.

## Rate Limited Login
- Given: multiple failed attempts exceed threshold.
- When: user submits login form again.
- Then: user receives throttled response with retry guidance.
