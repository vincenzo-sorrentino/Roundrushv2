import "@roundrush/tokens/tokens.css"
import "@roundrush/themes/light.css"
import "@roundrush/components"
import "./styles/app.css"

import { resolveRoute } from "./router/routes.js"
import { canAccessRoute } from "./router/guards.js"
import { renderSidebar, mountSidebar, isSidebarCollapsed } from "./shared/sidebar.js"

const app = document.querySelector("#app")
let currentUnmount = null

const TAB_HEADER_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/library/foundations/colors" },
  { id: "requirements", label: "Requirements", path: "/requirements/module" },
  { id: "planning", label: "Planning", path: "/planning/kanban" },
  { id: "dependencies", label: "Dependencies", path: null },
  { id: "issues", label: "Issues", path: null },
  { id: "docs", label: "Docs", path: null },
  { id: "design", label: "Design", path: "/library/components" },
]

function renderTabHeader(currentPath) {
  const tabs = TAB_HEADER_ITEMS.map(tab => {
    const isActive = tab.path && currentPath.startsWith(tab.path)
    const href = tab.path || "#"
    const cls = `rr-tab-header-item${isActive ? " rr-tab-header-item--active" : ""}${!tab.path ? " rr-tab-header-item--disabled" : ""}`
    return `<a href="${href}" class="${cls}">${tab.label}</a>`
  }).join("")

  return `
    <header class="rr-tab-header" id="rr-tab-header">
      <div class="rr-tab-header-tabs">${tabs}</div>
      <div class="rr-tab-header-actions">
        <button type="button" class="rr-tab-filter">All modules</button>
        <button type="button" class="rr-tab-filter">All priority</button>
        <button type="button" class="rr-tab-filter">All statuses</button>
        <span class="rr-tab-sync">Last sync: 03/03/26</span>
      </div>
    </header>
  `
}

async function render() {
  if (typeof currentUnmount === "function") {
    currentUnmount()
    currentUnmount = null
  }

  const currentPath = window.location.pathname === "/" ? "/requirements/module" : window.location.pathname
  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", currentPath)
  }
  const route = resolveRoute(currentPath)

  const sidebarHtml = renderSidebar(isSidebarCollapsed())
  const tabHeaderHtml = renderTabHeader(currentPath)

  if (!route) {
    app.innerHTML = `
      <div class="rr-app-layout">
        ${sidebarHtml}
        <div class="rr-app-content">
          ${tabHeaderHtml}
          <section class="rr-empty"><h1>Route not found</h1></section>
        </div>
      </div>
    `
    mountSidebar(() => render())
    return
  }

  if (!canAccessRoute(route)) {
    app.innerHTML = `
      <div class="rr-app-layout">
        ${sidebarHtml}
        <div class="rr-app-content">
          ${tabHeaderHtml}
          <section class="rr-empty"><h1>Access denied</h1></section>
        </div>
      </div>
    `
    mountSidebar(() => render())
    return
  }

  const html = await route.render()
  app.innerHTML = `
    <div class="rr-app-layout">
      ${sidebarHtml}
      <div class="rr-app-content">
        ${tabHeaderHtml}
        ${html}
      </div>
    </div>
  `

  mountSidebar(() => render())

  if (typeof route.mount === "function") {
    const maybeCleanup = route.mount()
    if (typeof maybeCleanup === "function") {
      currentUnmount = maybeCleanup
    }
  }
}

window.addEventListener("popstate", render)
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='/']")
  if (!link) {
    return
  }

  if (
    link.getAttribute("target") === "_blank" ||
    link.hasAttribute("download") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  event.preventDefault()
  window.history.pushState({}, "", link.getAttribute("href"))
  render()
})

render()
