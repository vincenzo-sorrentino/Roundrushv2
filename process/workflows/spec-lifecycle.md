# Spec Lifecycle

## Order of Operations

1. Draft `spec.md`.
2. Write `flow.md` and `acceptance.md`.
3. Add or update `links.json`.
4. Move status to `in_review`.
5. After review, move to `approved`.
6. Build or update prototype route.
7. Move to `implemented` once route + QA checks pass.

## Status Rules

- `approved` requires a non-empty `prototype_route`.
- `implemented` requires `prototype_flow_config` in `links.json`.
- `archived` flows must not be exposed in prototype navigation.
