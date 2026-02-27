# Naming Conventions

## Requirements

- Domain folder: lowercase singular, e.g. `authentication`.
- Flow folder: lowercase kebab-case, e.g. `login`, `password-reset`.
- Spec IDs: `<domain-short>-<flow>`, e.g. `auth-login`.

## Prototypes

- Flow implementation folder: kebab-case, e.g. `auth-login`.
- Route format: `/<domain>/<feature>/<variant>`.

## Design System

- Component tags: `rr-*` prefix.
- CSS variables: `--rr-<category>-<token>` for base tokens and `--rr-sem-<name>` for semantic values.
