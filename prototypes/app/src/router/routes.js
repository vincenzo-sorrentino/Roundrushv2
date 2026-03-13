import { renderAuthLoginFlow, mountAuthLoginFlow } from "../flows/auth-login/index.js"
import { renderAuthSignupTeamFlow, mountAuthSignupTeamFlow } from "../flows/auth-signup-team/index.js"
import { renderAuthSignupGuestFlow, mountAuthSignupGuestFlow } from "../flows/auth-signup-guest/index.js"
import { renderComponentsLibraryFlow } from "../flows/components-library/index.js"
import { renderFoundationsColorsFlow } from "../flows/foundations-colors/index.js"
import { mountRequirementsModuleFlow, renderRequirementsModuleFlow } from "../flows/requirements-module/index.js"
import { renderKanbanModuleFlow, mountKanbanModuleFlow } from "../flows/kanban-module/index.js"
import { renderPrototypeIndexFlow } from "../flows/prototype-index/index.js"
import { renderDependenciesUmlFlow, mountDependenciesUmlFlow } from "../flows/dependencies-uml/index.js"
import { renderDocsHubFlow, mountDocsHubFlow } from "../flows/docs-hub/index.js"
import { renderDesignTabFlow, mountDesignTabFlow } from "../flows/design-tab/index.js"
import { renderOldSprintFlow, mountOldSprintFlow } from "../flows/old-sprint/index.js"
import { renderReleaseNotesFlow, mountReleaseNotesFlow } from "../flows/release-notes/index.js"
import { renderTestingTabFlow, initTestingTab } from "../flows/testing-tab/index.js"
import { renderRoadmapFlow, mountRoadmapFlow } from "../flows/roadmap/index.js"
import { renderNotificationsInboxFlow, mountNotificationsInboxFlow } from "../flows/notifications-inbox/index.js"
import { renderSprintsDraftFlow, mountSprintsDraftFlow } from "../flows/sprints-draft/index.js"

const routes = [
  {
    id: "prototype-index",
    path: "/prototypes",
    render: renderPrototypeIndexFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "foundations-colors",
    path: "/library/foundations/colors",
    render: renderFoundationsColorsFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "components-library",
    path: "/library/components",
    render: renderComponentsLibraryFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "auth-login-default",
    path: "/auth/login/default",
    render: renderAuthLoginFlow,
    mount: mountAuthLoginFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "auth-signup-team",
    path: "/auth/signup/team",
    render: renderAuthSignupTeamFlow,
    mount: mountAuthSignupTeamFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "auth-signup-guest",
    path: "/auth/signup/guest",
    render: renderAuthSignupGuestFlow,
    mount: mountAuthSignupGuestFlow,
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "requirements-module",
    path: "/requirements/module",
    render: renderRequirementsModuleFlow,
    mount: mountRequirementsModuleFlow,
    status: "approved"
  },
  {
    id: "sprints-current",
    path: "/planning/kanban",
    render: renderKanbanModuleFlow,
    mount: mountKanbanModuleFlow,
    status: "approved"
  },
  {
    id: "sprints-current-legacy",
    path: "/sprints/current",
    render: renderKanbanModuleFlow,
    mount: mountKanbanModuleFlow,
    status: "approved"
  },
  {
    id: "sprints-draft",
    path: "/planning/draft",
    render: renderSprintsDraftFlow,
    mount: mountSprintsDraftFlow,
    status: "approved"
  },
  {
    id: "sprints-draft-legacy",
    path: "/sprints/draft",
    render: renderSprintsDraftFlow,
    mount: mountSprintsDraftFlow,
    status: "approved"
  },
  {
    id: "dependencies-uml",
    path: "/dependencies/uml",
    render: renderDependenciesUmlFlow,
    mount: mountDependenciesUmlFlow,
    status: "approved"
  },
  {
    id: "dependencies-list",
    path: "/dependencies/list",
    render: renderDependenciesUmlFlow,
    mount: mountDependenciesUmlFlow,
    status: "approved"
  },
  {
    id: "docs-hub",
    path: "/docs/hub",
    render: renderDocsHubFlow,
    mount: mountDocsHubFlow,
    status: "approved"
  },
  {
    id: "design-tab",
    path: "/design/tab",
    render: renderDesignTabFlow,
    mount: mountDesignTabFlow,
    status: "approved"
  },
  {
    id: "testing-tab",
    path: "/testing/overview",
    render: renderTestingTabFlow,
    mount: initTestingTab,
    status: "approved"
  },
  {
    id: "sprints-old",
    path: "/planning/old-sprint",
    render: renderOldSprintFlow,
    mount: mountOldSprintFlow,
    status: "approved"
  },
  {
    id: "sprints-old-legacy",
    path: "/sprints/old",
    render: renderOldSprintFlow,
    mount: mountOldSprintFlow,
    status: "approved"
  },
  {
    id: "sprints-approve",
    path: "/planning/release-notes",
    render: renderReleaseNotesFlow,
    mount: mountReleaseNotesFlow,
    status: "approved"
  },
  {
    id: "sprints-approve-legacy",
    path: "/sprints/approve",
    render: renderReleaseNotesFlow,
    mount: mountReleaseNotesFlow,
    status: "approved"
  },
  {
    id: "roadmap",
    path: "/planning/roadmap",
    render: renderRoadmapFlow,
    mount: mountRoadmapFlow,
    status: "approved"
  },
  {
    id: "roadmap-legacy",
    path: "/sprints/roadmap",
    render: renderRoadmapFlow,
    mount: mountRoadmapFlow,
    status: "approved"
  },
  {
    id: "notifications-inbox",
    path: "/notifications/inbox",
    render: renderNotificationsInboxFlow,
    mount: mountNotificationsInboxFlow,
    status: "approved"
  }
]

export function resolveRoute(pathname) {
  return routes.find((route) => route.path === pathname) || null
}

export function getRoutes() {
  return routes
}
