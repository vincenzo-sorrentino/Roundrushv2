import { renderAuthLoginFlow } from "../flows/auth-login/index.js"
import { renderComponentsLibraryFlow } from "../flows/components-library/index.js"
import { renderFoundationsColorsFlow } from "../flows/foundations-colors/index.js"
import { mountRequirementsModuleFlow, renderRequirementsModuleFlow } from "../flows/requirements-module/index.js"
import { renderKanbanModuleFlow, mountKanbanModuleFlow } from "../flows/kanban-module/index.js"
import { renderPrototypeIndexFlow } from "../flows/prototype-index/index.js"
import { renderDependenciesUmlFlow, mountDependenciesUmlFlow } from "../flows/dependencies-uml/index.js"
import { renderDocsHubFlow, mountDocsHubFlow } from "../flows/docs-hub/index.js"

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
    status: "approved"
  },
  {
    id: "requirements-module",
    path: "/requirements/module",
    render: renderRequirementsModuleFlow,
    mount: mountRequirementsModuleFlow,
    status: "approved"
  },
  {
    id: "kanban-module",
    path: "/planning/kanban",
    render: renderKanbanModuleFlow,
    mount: mountKanbanModuleFlow,
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
    id: "docs-hub",
    path: "/docs/hub",
    render: renderDocsHubFlow,
    mount: mountDocsHubFlow,
    status: "approved"
  }
]

export function resolveRoute(pathname) {
  return routes.find((route) => route.path === pathname) || null
}

export function getRoutes() {
  return routes
}
