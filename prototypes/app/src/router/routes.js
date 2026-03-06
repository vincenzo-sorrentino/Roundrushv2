import { renderAuthLoginFlow } from "../flows/auth-login/index.js"
import { renderComponentsLibraryFlow } from "../flows/components-library/index.js"
import { renderFoundationsColorsFlow } from "../flows/foundations-colors/index.js"
import { mountRequirementsModuleFlow, renderRequirementsModuleFlow } from "../flows/requirements-module/index.js"
import { renderKanbanModuleFlow, mountKanbanModuleFlow } from "../flows/kanban-module/index.js"

const routes = [
  {
    id: "foundations-colors",
    path: "/library/foundations/colors",
    render: renderFoundationsColorsFlow,
    status: "approved"
  },
  {
    id: "components-library",
    path: "/library/components",
    render: renderComponentsLibraryFlow,
    status: "approved"
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
    status: "approved",
    showGlobalNavigation: false
  },
  {
    id: "kanban-module",
    path: "/planning/kanban",
    render: renderKanbanModuleFlow,
    mount: mountKanbanModuleFlow,
    status: "approved"
  }
]

export function resolveRoute(pathname) {
  return routes.find((route) => route.path === pathname) || null
}

export function getRoutes() {
  return routes
}
