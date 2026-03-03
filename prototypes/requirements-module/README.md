# Requirements Module Prototype

This folder contains the read-only reflection data for the Requirements Module prototype.

- `data.mock.js`: RoundRush V2 hierarchy (Requirement -> Module -> Functionality -> Acceptance Criteria), strict 7 Acceptance Laws, sync timeline sample events, and module-level dependency metadata.
- `data.js`: Compatibility export that re-exports `data.mock.js`.
- `logic.js`: Deterministic rollup rules used by the UI (module compliance, requirement completion, requirement stage rollup).

The UI renderer is located at:

- `prototypes/app/src/flows/requirements-module/index.js`

It consumes this folder as source-of-truth prototype data.
