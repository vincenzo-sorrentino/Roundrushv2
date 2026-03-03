# Authentication Shared Rules

## Security Baselines

- Transport must use TLS 1.2+.
- Passwords must be hashed with Argon2id or bcrypt using per-user salt.
- Login endpoints are rate-limited per IP and per account.
- Session cookies must be `HttpOnly`, `Secure`, and `SameSite=Lax` or stricter.

## Audit Events

Capture at least:

- `login_success`
- `login_failure`
- `registration_started`
- `registration_completed`
- `invite_created`
- `invite_accepted`
- `password_reset_requested`
- `password_reset_completed`
