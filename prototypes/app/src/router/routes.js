import { renderAuthLoginFlow } from "../flows/auth-login/index.js"
import { renderComponentsLibraryFlow } from "../flows/components-library/index.js"
import { renderFoundationsColorsFlow } from "../flows/foundations-colors/index.js"

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
  }
]

export function resolveRoute(pathname) {
  return routes.find((route) => route.path === pathname) || null
}

export function getRoutes() {
  return routes
}
