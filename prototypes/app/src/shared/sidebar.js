/**
 * Sidebar component — matches Figma "Sidebar" component (167:31314)
 * Branch: Kat | Variants: Collapsed (88px) | Open (260px)
 */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

const ICON = {
  menu: `<svg width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="64" x2="216" y2="64" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="192" x2="216" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  bell: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M168 224a40 40 0 01-80 0M208 192H48a8 8 0 01-5.66-13.66l17-17A47.72 47.72 0 0072 128V96a56 56 0 01112 0v32a47.72 47.72 0 0012.65 33.34l17 17A8 8 0 01208 192z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="88" cy="108" r="52" stroke="currentColor" stroke-width="16"/><path d="M155.41 57.94A52 52 0 01207.86 160M16 197.4a88 88 0 01144 0M220 197.4a88 88 0 00-44.62-38" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretRight: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM232,120H208a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Zm-104,88a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128ZM69.11,59.22a8,8,0,0,0-11.32,11.31l16.95,17A8,8,0,0,0,86.06,76.18ZM59.22,186.89a8,8,0,0,0-11.32,11.32l17,16.95a8,8,0,0,0,11.32-11.31ZM186.89,59.22l-17,16.95A8,8,0,0,0,181.25,87.56l16.95-17a8,8,0,1,0-11.31-11.31ZM186.89,196.78a8,8,0,0,0-11.31,0L169.26,203a8,8,0,1,0,11.32,11.32l16.95-17A8.05,8.05,0,0,0,186.89,196.78Z"></path></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23Z"></path></svg>`,
}

// RoundRush glyph logo — two-tone circular arrows (matches Figma RrLogoGlyph)
const RR_LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Blue arc: right half, sweeping counter-clockwise from ~4 o'clock to ~10 o'clock -->
  <path d="M27 20.5 A12 12 0 1 0 9 7" stroke="#0067da" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Blue arrowhead at the end of the blue arc (~10 o'clock) -->
  <polyline points="13,3 9,7 13,11" stroke="#0067da" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Red arc: left half, sweeping counter-clockwise from ~10 o'clock to ~4 o'clock -->
  <path d="M5 11.5 A12 12 0 1 0 23 25" stroke="#d03045" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Red arrowhead at the end of the red arc (~4 o'clock) -->
  <polyline points="19,29 23,25 19,21" stroke="#d03045" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`

const TEAM_ITEMS = [
  {
    id: "team-1",
    label: "Team 1",
    expanded: true,
    projects: [
      { id: "proj-gp", label: "Give Payments", color: "#0067da" },
      { id: "proj-gc", label: "Give Cash", color: "#1a9e5f" },
    ],
  },
  { id: "team-2", label: "Team 2", expanded: false, projects: [] },
  { id: "team-3", label: "Team 3", expanded: false, projects: [] },
]

// Collapsed sidebar: project badges shown between dividers
const COLLAPSED_PROJECT_BADGES = [
  { initials: "GP", color: "#0067da", bg: "#f2f8ff" },
  { initials: "GC", color: "#0e9255", bg: "#f3fcf8" },
]

// Collapsed sidebar: team badges shown below project badges
const COLLAPSED_TEAM_BADGES = [
  { initials: "R",  color: "#9b5bce", bg: "#f6edfd" },
  { initials: "IM", color: "#c0362d", bg: "#fef2f1" },
]

export function renderSidebar(collapsed = true) {
  if (collapsed) {
    const themeIcon = darkMode ? ICON.sun : ICON.moon
    const themeLabel = darkMode ? "Switch to light mode" : "Switch to dark mode"
    return `
      <aside class="rr-sidebar rr-sidebar--collapsed" id="rr-sidebar" aria-label="App navigation">
        <div class="rr-sidebar-top">
          <a href="/prototypes" class="rr-sidebar-logo-link rr-sidebar-logo-link--collapsed" aria-label="Prototype directory">
            ${RR_LOGO_SVG}
          </a>
          <button class="rr-sidebar-toggle" data-action="toggle-sidebar" aria-label="Expand sidebar" type="button">
            ${ICON.menu}
          </button>
        </div>
        <div class="rr-sidebar-collapsed-nav">
          <div class="rr-sidebar-collapsed-bell">
            ${ICON.bell}
            <span class="rr-sidebar-notification-dot"></span>
          </div>
          <div class="rr-sidebar-divider"></div>
          <div class="rr-sidebar-collapsed-badges">
            ${COLLAPSED_PROJECT_BADGES.map(b => `
              <div class="rr-sidebar-collapsed-badge" style="background:${b.bg};color:${b.color}" title="${escapeHtml(b.initials)}">
                ${escapeHtml(b.initials)}
              </div>
            `).join("")}
          </div>
          <div class="rr-sidebar-divider"></div>
          <div class="rr-sidebar-collapsed-badges">
            ${COLLAPSED_TEAM_BADGES.map(b => `
              <div class="rr-sidebar-collapsed-badge" style="background:${b.bg};color:${b.color}" title="${escapeHtml(b.initials)}">
                ${escapeHtml(b.initials)}
              </div>
            `).join("")}
          </div>
          <div class="rr-sidebar-divider"></div>
        </div>
        <div class="rr-sidebar-bottom">
          <button class="rr-sidebar-theme-btn" data-action="toggle-theme" aria-label="${themeLabel}" type="button">
            ${themeIcon}
          </button>
          <div class="rr-sidebar-avatar" title="Brooklyn Simmons">
            <span>BS</span>
          </div>
        </div>
      </aside>
    `
  }

  return `
    <aside class="rr-sidebar rr-sidebar--open" id="rr-sidebar" aria-label="App navigation">
      <div class="rr-sidebar-cont">
        <div class="rr-sidebar-top">
          <div class="rr-sidebar-logo">
            <a href="/prototypes" class="rr-sidebar-logo-link" aria-label="Prototype directory">
              ${RR_LOGO_SVG}
            </a>
          </div>
          <button class="rr-sidebar-toggle" data-action="toggle-sidebar" aria-label="Collapse sidebar" type="button">
            ${ICON.menu}
          </button>
        </div>
        <nav class="rr-sidebar-nav">
          <a href="#" class="rr-sidebar-link">
            ${ICON.bell}
            <span>Inbox</span>
            <span class="rr-sidebar-inbox-badge">12</span>
          </a>
          <div class="rr-sidebar-divider"></div>
          <div class="rr-sidebar-section-header">
            <span class="rr-sidebar-section-header-icon">${ICON.users}</span>
            <span class="rr-sidebar-section-header-text">Teams</span>
            <button class="rr-sidebar-section-header-add" type="button" aria-label="Add team">${ICON.plus}</button>
          </div>
          ${TEAM_ITEMS.map(team => `
            <div class="rr-sidebar-team-item">
              <span class="rr-sidebar-team-dot"></span>
              <span class="rr-sidebar-team-label">${escapeHtml(team.label)}</span>
              <span class="rr-sidebar-team-caret">${team.expanded ? ICON.caretDown : ICON.caretRight}</span>
            </div>
            ${team.expanded && team.projects.length ? `
              <div class="rr-sidebar-subnav">
                ${team.projects.map(proj => `
                  <div class="rr-sidebar-subitem">
                    <span class="rr-sidebar-project-icon" style="background:${proj.color}"></span>
                    <span class="rr-sidebar-subitem-label">${escapeHtml(proj.label)}</span>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          `).join("")}
        </nav>
      </div>
      <div class="rr-sidebar-bottom">
        <button class="rr-sidebar-theme-btn rr-sidebar-theme-btn--open" data-action="toggle-theme"
                aria-label="${darkMode ? "Switch to light mode" : "Switch to dark mode"}" type="button">
          ${darkMode ? ICON.sun : ICON.moon}
        </button>
        <div class="rr-sidebar-profile">
          <div class="rr-sidebar-avatar">
            <span>BS</span>
          </div>
          <div class="rr-sidebar-profile-info">
            <strong>Brooklyn Simmons</strong>
            <span>brooklyn@simmons.com</span>
          </div>
        </div>
      </div>
    </aside>
  `
}

let sidebarCollapsed = true
let darkMode = (typeof localStorage !== "undefined" && localStorage.getItem("rr-theme") === "dark")

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
  if (typeof localStorage !== "undefined") localStorage.setItem("rr-theme", dark ? "dark" : "light")
}

// Apply saved theme on module load
applyTheme(darkMode)

export function mountSidebar(onToggle) {
  const sidebar = document.querySelector("#rr-sidebar")
  if (!sidebar) return

  sidebar.addEventListener("click", (event) => {
    const toggle = event.target.closest('[data-action="toggle-sidebar"]')
    if (toggle) {
      sidebarCollapsed = !sidebarCollapsed
      if (typeof onToggle === "function") {
        onToggle(sidebarCollapsed)
      }
      return
    }
    const themeBtn = event.target.closest('[data-action="toggle-theme"]')
    if (themeBtn) {
      darkMode = !darkMode
      applyTheme(darkMode)
      if (typeof onToggle === "function") onToggle(sidebarCollapsed)
    }
  })
}

export function isSidebarCollapsed() {
  return sidebarCollapsed
}
