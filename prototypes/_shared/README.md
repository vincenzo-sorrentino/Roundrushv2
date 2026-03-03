# Prototypes — Shared Runtime

This folder contains shared assets, libraries, and styles used across all
prototypes in the project.

| Folder   | Purpose                                    |
|----------|--------------------------------------------|
| `assets/` | Shared images, icons, and static assets   |
| `lib/`    | Shared JS helpers / router / mock data    |
| `styles/` | Base CSS / shared style sheets            |

## TODO

- [ ] Extract shared router logic from `prototypes/app/src/router/` into `_shared/lib/`.
- [ ] Extract shared CSS from `prototypes/app/src/styles/` into `_shared/styles/`.
- [ ] Extract shared layout from `prototypes/app/src/shared/` into `_shared/lib/`.

> These extractions are deferred to avoid breaking the existing Vite build in `prototypes/app/`.
