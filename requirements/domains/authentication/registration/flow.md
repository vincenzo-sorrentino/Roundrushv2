# Entry Conditions

- User is unauthenticated and on registration route.

# Primary Steps

1. User enters name, email, and password.
2. User submits registration form.
3. Service validates payload and creates pending account.
4. Verification email is sent.
5. UI shows verification pending state.

# Alternate Paths

- User navigates to login if already registered.

# Failure Paths

- Email already in use.
- Disposable email blocked.
- Verification email send temporary failure.

# Exit Conditions

- Account created in pending verification state.
