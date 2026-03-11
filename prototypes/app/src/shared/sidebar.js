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
  bell: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3272 13.7453C16.8936 12.9984 16.2491 10.8852 16.2491 8.125C16.2491 6.4674 15.5906 4.87769 14.4185 3.70558C13.2464 2.53348 11.6567 1.875 9.99909 1.875C8.34149 1.875 6.75178 2.53348 5.57968 3.70558C4.40757 4.87769 3.74909 6.4674 3.74909 8.125C3.74909 10.8859 3.10378 12.9984 2.67019 13.7453C2.55946 13.9352 2.50076 14.1509 2.50001 14.3707C2.49925 14.5905 2.55647 14.8066 2.66589 14.9973C2.77531 15.1879 2.93306 15.3463 3.12324 15.4565C3.31342 15.5667 3.52929 15.6248 3.74909 15.625H6.93738C7.08157 16.3306 7.46505 16.9647 8.02295 17.4201C8.58085 17.8756 9.27892 18.1243 9.99909 18.1243C10.7193 18.1243 11.4173 17.8756 11.9752 17.4201C12.5331 16.9647 12.9166 16.3306 13.0608 15.625H16.2491C16.4688 15.6247 16.6846 15.5665 16.8747 15.4562C17.0647 15.346 17.2224 15.1875 17.3317 14.9969C17.441 14.8063 17.4982 14.5903 17.4974 14.3705C17.4966 14.1508 17.4379 13.9351 17.3272 13.7453ZM9.99909 16.875C9.61145 16.8749 9.23338 16.7546 8.91691 16.5308C8.60043 16.3069 8.36112 15.9905 8.23191 15.625H11.7663C11.6371 15.9905 11.3978 16.3069 11.0813 16.5308C10.7648 16.7546 10.3867 16.8749 9.99909 16.875ZM3.74909 14.375C4.35066 13.3406 4.99909 10.9438 4.99909 8.125C4.99909 6.79892 5.52588 5.52715 6.46356 4.58947C7.40124 3.65178 8.67301 3.125 9.99909 3.125C11.3252 3.125 12.5969 3.65178 13.5346 4.58947C14.4723 5.52715 14.9991 6.79892 14.9991 8.125C14.9991 10.9414 15.646 13.3383 16.2491 14.375H3.74909Z" fill="#14161B"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="88" cy="108" r="52" stroke="currentColor" stroke-width="16"/><path d="M155.41 57.94A52 52 0 01207.86 160M16 197.4a88 88 0 01144 0M220 197.4a88 88 0 00-44.62-38" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretRight: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM232,120H208a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Zm-104,88a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128ZM69.11,59.22a8,8,0,0,0-11.32,11.31l16.95,17A8,8,0,0,0,86.06,76.18ZM59.22,186.89a8,8,0,0,0-11.32,11.32l17,16.95a8,8,0,0,0,11.32-11.31ZM186.89,59.22l-17,16.95A8,8,0,0,0,181.25,87.56l16.95-17a8,8,0,1,0-11.31-11.31ZM186.89,196.78a8,8,0,0,0-11.31,0L169.26,203a8,8,0,1,0,11.32,11.32l16.95-17A8.05,8.05,0,0,0,186.89,196.78Z"></path></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23Z"></path></svg>`,
}

// Official Roundrush icon logo (RR_icon_logo.svg)
const RR_LOGO_SVG = `<svg width="28" height="27" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M0.607109 9.62553C2.08351 8.1695 4.57183 8.72574 5.26856 10.6398C5.69987 11.8505 6.41319 12.9957 7.40851 13.9609C7.64076 14.1899 7.873 14.4026 8.12183 14.5989C9.88024 16.0059 12.0368 16.6603 14.1767 16.5785C14.8403 16.5458 15.1887 17.3474 14.7242 17.8055C14.4588 18.0672 14.127 18.2636 13.762 18.3617C9.9466 19.4415 5.6501 18.4926 2.64753 15.5315C1.55267 14.4517 0.723232 13.2084 0.175802 11.8668C-0.172563 11.1143 0.00991217 10.2308 0.607109 9.62553Z" fill="#0079FF"/>
  <path d="M19.021 9.16753C17.5446 10.6236 15.0563 10.0673 14.3596 8.15322C13.9283 6.94258 13.2149 5.79739 12.2196 4.83216C11.9874 4.60312 11.7551 4.39044 11.5063 4.19412C9.76447 2.78717 7.60792 2.13277 5.46797 2.21457C4.80442 2.24729 4.45605 1.44565 4.92054 0.987577C5.18596 0.725818 5.51774 0.529499 5.88269 0.43134C9.69811 -0.648414 13.9946 0.300461 16.9972 3.2616C18.092 4.34136 18.9215 5.58471 19.4689 6.92623C19.8007 7.69514 19.6182 8.57858 19.021 9.16753Z" fill="#F43B51"/>
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
