import "@roundrush/tokens/tokens.css"
import "@roundrush/themes/light.css"
import "@roundrush/themes/dark.css"
import "@roundrush/components"
import "./styles/app.css"

import { resolveRoute } from "./router/routes.js"
import { canAccessRoute } from "./router/guards.js"
import { renderSidebar, mountSidebar, isSidebarCollapsed } from "./shared/sidebar.js"

const app = document.querySelector("#app")
let currentUnmount = null
const TAB_SYNC_ICON_URL = "http://localhost:3845/assets/42ec88ad5e301cefafc623f7aee872a71a63c91f.svg"
const TAB_SYNC_TEXT = "Last sync: 28/02/26"

const TAB_HEADER_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    path: null },
  { id: "requirements", label: "Requirements", path: "/requirements/module" },
  { id: "roadmap",      label: "Roadmap",      path: null },
  { id: "planning",     label: "Planning",     path: "/planning/kanban" },
  { id: "design",       label: "Design",       path: "/design/tab" },
  { id: "dependencies", label: "Dependencies", path: "/dependencies/uml" },
  { id: "testing",      label: "Testing",      path: "/testing/overview" },
  { id: "docs",         label: "Docs",         path: "/docs/hub" },
]

function renderTabHeader(currentPath) {
  const tabs = TAB_HEADER_ITEMS.map(tab => {
    const isActive = tab.path && currentPath.startsWith(tab.path)
    const tabState = tab.path ? (isActive ? "selected" : "default") : "disabled"
    const tabMarkup = `<rr-tabs type="horizontal" state="${tabState}" label="${tab.label}"></rr-tabs>`

    if (tab.path) {
      return `<a href="${tab.path}" class="rr-tab-header-tab-link" aria-label="${tab.label}">${tabMarkup}</a>`
    }

    return `<span class="rr-tab-header-tab-slot rr-tab-header-tab-slot--static" aria-label="${tab.label}">${tabMarkup}</span>`
  }).join("")

  /* For Planning routes, the sprint selector is injected by the kanban module.
     For Docs routes, the history toggle is injected by the docs-hub module.
     For other routes, show the default sync label + action. */
  const isPlanning = currentPath.startsWith("/planning")
  const isDocs     = currentPath.startsWith("/docs")
  const isDesign   = currentPath.startsWith("/design")
  const actionsHtml = isPlanning
    ? `<div class="rr-tab-header-actions" id="rr-tab-sprint-header"></div>`
    : isDocs
    ? `<div class="rr-tab-header-actions" id="rr-tab-docs-header"></div>`
    : isDesign
    ? `<div class="rr-tab-header-actions"></div>`
    : `<div class="rr-tab-header-actions">
        <span class="rr-tab-sync">${TAB_SYNC_TEXT}</span>
        <button type="button" class="rr-tab-sync-action" aria-label="Sync history">
          <img src="${TAB_SYNC_ICON_URL}" alt="" />
        </button>
      </div>`

  return `
    <header class="rr-tab-header" id="rr-tab-header">
      <div class="rr-tab-header-tabs">${tabs}</div>
      ${actionsHtml}
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
  const showNav = route.showGlobalNavigation !== false
  app.innerHTML = `
    <div class="rr-app-layout">
      ${sidebarHtml}
      <div class="rr-app-content${showNav ? "" : " rr-app-content--no-nav"}">
        ${showNav ? tabHeaderHtml : ""}
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
