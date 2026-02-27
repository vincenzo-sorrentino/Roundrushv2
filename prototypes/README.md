# Prototype App

This workspace contains one Vite + Vanilla JS prototype app that maps approved requirement flows to routes.

## Mapping Rule

Each approved flow must have:

- `requirements/domains/<domain>/<flow>/spec.md`
- `prototypes/app/src/flows/<flow-id>/flow.config.json`
- One route in `prototypes/app/src/router/routes.js`

## Run

```bash
npm run dev --workspace prototypes/app
```
