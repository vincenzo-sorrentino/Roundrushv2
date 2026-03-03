import "@roundrush/tokens/tokens.css"
import "@roundrush/themes/light.css"
import "@roundrush/components"
import "./styles/app.css"

import { resolveRoute } from "./router/routes.js"
import { canAccessRoute } from "./router/guards.js"

const app = document.querySelector("#app")
let currentUnmount = null

function renderNavigation(currentPath) {
  return `
    <nav class="rr-nav">
      <a href="/library/foundations/colors" ${currentPath === "/library/foundations/colors" ? 'data-active="true"' : ""}>Foundations</a>
      <a href="/library/components" ${currentPath === "/library/components" ? 'data-active="true"' : ""}>Components Library</a>
      <a href="/requirements/module" ${currentPath === "/requirements/module" ? 'data-active="true"' : ""}>Requirements</a>
      <a href="/auth/login/default" ${currentPath === "/auth/login/default" ? 'data-active="true"' : ""}>Auth Login</a>
    </nav>
  `
}

async function render() {
  if (typeof currentUnmount === "function") {
    currentUnmount()
    currentUnmount = null
  }

  const currentPath = window.location.pathname === "/" ? "/library/foundations/colors" : window.location.pathname
  if (window.location.pathname === "/") {
    window.history.replaceState({}, "", currentPath)
  }
  const route = resolveRoute(currentPath)

  if (!route) {
    app.innerHTML = `${renderNavigation(currentPath)}<section class="rr-empty"><h1>Route not found</h1></section>`
    return
  }

  if (!canAccessRoute(route)) {
    app.innerHTML = `${renderNavigation(currentPath)}<section class="rr-empty"><h1>Access denied</h1></section>`
    return
  }

  const html = await route.render()
  app.innerHTML = `${renderNavigation(currentPath)}${html}`

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
