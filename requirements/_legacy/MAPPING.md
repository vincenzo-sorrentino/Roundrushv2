# Legacy Mapping

> This file documents what was moved from the original repo structure and where
> each item was relocated (or should be relocated in the future).

## Inventory (pre-reorg)

### Requirements docs (original location: `/requirements/`)

| Original path | Content | Suggested future mapping |
|---|---|---|
| `requirements/README.md` | Requirements overview | EP-level context / root README |
| `requirements/authentication.md` | Authentication domain overview | EP001-authentication epic.md |
| `requirements/changelog.md` | Changelog | Repo-level or EP006-docs |
| `requirements/glossary.md` | Glossary | EP006-docs or root-level |
| `requirements/_templates/` | Spec/flow/acceptance/decision templates | `/process/` or `/requirements/_templates/` |
| `requirements/domains/authentication/` | Auth subdomain specs (login, registration, invitation) | EP001-authentication modules |
| `requirements/domains/authentication/_index.md` | Auth index | EP001 overview |
| `requirements/domains/authentication/shared-rules.md` | Shared auth rules | EP001 shared rules |
| `requirements/domains/authentication/login/` | Login spec/flow/acceptance | EP001-M001-login |
| `requirements/domains/authentication/registration/` | Registration spec/flow/acceptance | EP001-M002-registration |
| `requirements/domains/authentication/invitation/` | Invitation spec/flow/acceptance | EP001-M003-invitation |

### Prototypes (original location: `/prototypes/`)

| Original path | Content | Suggested future mapping |
|---|---|---|
| `prototypes/app/` | Vite-based prototype app (HTML/CSS/JS) | Keep in place; reference from EP prototype YAMLs |
| `prototypes/app/src/flows/auth-login/` | Auth login prototype flow | EP001 module prototype |
| `prototypes/app/src/flows/requirements-module/` | Requirements module prototype flow | EP002 module prototype |
| `prototypes/app/src/flows/components-library/` | Component library prototype flow | Design system reference |
| `prototypes/app/src/flows/foundations-colors/` | Color foundations prototype flow | Design system reference |
| `prototypes/app/public/prototypes/compliance-dashboard/` | Compliance dashboard static prototype | EP002 or related EP |
| `prototypes/app/public/prototypes/execution-summary/` | Execution summary static prototype | EP002 or related EP |
| `prototypes/app/public/prototypes/requirements-module/` | Requirements module static prototype | EP002 module prototype |
| `prototypes/requirements-module/` | Standalone requirements module logic | EP002 module prototype logic |

### Design system (original location: `/design-system/`)

| Original path | Content | Suggested future mapping |
|---|---|---|
| `design-system/` | Full design system (stays in place) | `/design-system/` (no move) |
| `design-system/packages/components/` | Web components | `/design-system/` components |
| `design-system/packages/themes/` | Theme CSS files | `/design-system/` styles |
| `design-system/packages/tokens/` | Design tokens | `/design-system/` tokens |
| `design-system/apps/storybook/` | Storybook documentation | `/design-system/` docs |
| `design-system/scripts/` | Build/scaffold scripts | `/design-system/` scripts |
| `design-system/source/` | Figma source files | `/design-system/` source |

### Process / Governance (original location: `/process/`)

| Original path | Content | Suggested future mapping |
|---|---|---|
| `process/conventions/` | Naming, DoD, review checklists | EP006-docs or keep in `/process/` |
| `process/decisions/` | ADRs | EP006-docs or keep in `/process/` |
| `process/workflows/` | Figma-to-code, spec lifecycle | EP006-docs or keep in `/process/` |

### Tools (original location: `/tools/`)

| Original path | Content | Suggested future mapping |
|---|---|---|
| `tools/ci/` | CI scripts (changed-flow-detector) | Keep in `/tools/` or `/scripts/` |
| `tools/validators/` | Spec validators | Keep in `/tools/` or `/scripts/` |

## Actions Taken

| Action | Old path | New path | Notes |
|---|---|---|---|
| Moved to legacy | `requirements/README.md` | `legacy/requirements-v1/README.md` | Old requirements overview |
| Moved to legacy | `requirements/authentication.md` | `legacy/requirements-v1/authentication.md` | Old auth domain overview |
| Moved to legacy | `requirements/changelog.md` | `legacy/requirements-v1/changelog.md` | Old changelog |
| Moved to legacy | `requirements/glossary.md` | `legacy/requirements-v1/glossary.md` | Old glossary |
| Moved to legacy | `requirements/_templates/` | `legacy/requirements-v1/_templates/` | Old spec/flow/acceptance templates |
| Moved to legacy | `requirements/domains/` | `legacy/requirements-v1/domains/` | Old domain specs (auth login/registration/invitation) |
| Created scaffolding | — | `requirements/epics/EP001..EP007/` | New EP structure with acceptance laws |
| Design system kept | `design-system/` | `design-system/` | Added placeholder dirs (tokens/, components/, styles/, docs/) |
| Prototypes kept | `prototypes/app/` | `prototypes/app/` | Moving would break Vite build; added `_shared/` |
| Process kept | `process/` | `process/` | No move; governance docs still valid, referenced from EP006 |
