/**
 * Sidebar component — matches Figma "Sidebar" component (298:46142)
 * Variants: Collapsed (88px) | Open (260px)
 */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

const ICON = {
  menu: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="64" x2="216" y2="64" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="192" x2="216" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  house: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M216 216V115.54a8 8 0 00-2.62-5.92l-80-75.54a8 8 0 00-10.76 0l-80 75.54A8 8 0 0040 115.54V216a8 8 0 008 8h56a8 8 0 008-8v-48a8 8 0 018-8h16a8 8 0 018 8v48a8 8 0 008 8h56a8 8 0 008-8z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bell: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M168 224a40 40 0 01-80 0M208 192H48a8 8 0 01-5.66-13.66l17-17A47.72 47.72 0 0072 128V96a56 56 0 01112 0v32a47.72 47.72 0 0012.65 33.34l17 17A8 8 0 01208 192z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="88" cy="108" r="52" stroke="currentColor" stroke-width="16"/><path d="M155.41 57.94A52 52 0 01207.86 160M16 197.4a88 88 0 01144 0M220 197.4a88 88 0 00-44.62-38" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDoubleLeft: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="200,48 120,128 200,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="120,48 40,128 120,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  speedometer: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><path d="M128 128l40-40" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="128" r="12" fill="currentColor"/></svg>`,
  list: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="64" x2="216" y2="64" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="192" x2="216" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
}

const WORKSPACE_BADGES = [
  { initials: "RR", color: "#0067da", label: "RoundRush" },
]

const TEAM_ITEMS = [
  { id: "team-1", label: "Team 1" },
  { id: "team-2", label: "Team 2" },
  { id: "team-3", label: "Team 3" },
]

export function renderSidebar(collapsed = true) {
  if (collapsed) {
    return `
      <aside class="rr-sidebar rr-sidebar--collapsed" id="rr-sidebar" aria-label="App navigation">
        <div class="rr-sidebar-top">
          <button class="rr-sidebar-toggle" data-action="toggle-sidebar" aria-label="Expand sidebar" type="button">
            ${ICON.menu}
          </button>
        </div>
        <nav class="rr-sidebar-nav">
          ${WORKSPACE_BADGES.map(b => `
            <button class="rr-sidebar-badge" style="background:${b.color}" title="${escapeHtml(b.label)}" type="button">
              ${escapeHtml(b.initials)}
            </button>
          `).join("")}
        </nav>
        <div class="rr-sidebar-bottom">
          <div class="rr-sidebar-avatar" title="Brooklyn Simmons">
            <span>BS</span>
          </div>
        </div>
      </aside>
    `
  }

  return `
    <aside class="rr-sidebar rr-sidebar--open" id="rr-sidebar" aria-label="App navigation">
      <div class="rr-sidebar-top">
        <div class="rr-sidebar-logo">
          <span class="rr-sidebar-logo-mark">RR</span>
          <span class="rr-sidebar-logo-text">RoundRush</span>
        </div>
        <button class="rr-sidebar-toggle" data-action="toggle-sidebar" aria-label="Collapse sidebar" type="button">
          ${ICON.caretDoubleLeft}
        </button>
      </div>
      <nav class="rr-sidebar-nav">
        <a href="/requirements/module" class="rr-sidebar-link rr-sidebar-link--active">
          ${ICON.house}
          <span>Dashboard</span>
        </a>
        <a href="#" class="rr-sidebar-link">
          ${ICON.bell}
          <span>Inbox</span>
          <span class="rr-sidebar-inbox-badge">12</span>
        </a>
        <div class="rr-sidebar-section-label">Teams</div>
        ${TEAM_ITEMS.map(team => `
          <a href="#" class="rr-sidebar-link rr-sidebar-link--team">
            ${ICON.users}
            <span>${escapeHtml(team.label)}</span>
          </a>
        `).join("")}
      </nav>
      <div class="rr-sidebar-bottom">
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

export function mountSidebar(onToggle) {
  const sidebar = document.querySelector("#rr-sidebar")
  if (!sidebar) return

  sidebar.addEventListener("click", (event) => {
    const toggle = event.target.closest('[data-action="toggle-sidebar"]')
    if (!toggle) return
    sidebarCollapsed = !sidebarCollapsed
    if (typeof onToggle === "function") {
      onToggle(sidebarCollapsed)
    }
  })
}

export function isSidebarCollapsed() {
  return sidebarCollapsed
}
