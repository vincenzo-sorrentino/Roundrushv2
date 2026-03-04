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
}

// Two-tone circular glyph logo — matches Figma RrLogoGlyph component
const RR_LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M28 16C28 9.373 22.627 4 16 4C12.686 4 9.686 5.343 7.515 7.515" stroke="#0067da" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 16C4 22.627 9.373 28 16 28C19.314 28 22.314 26.657 24.485 24.485" stroke="#d03045" stroke-width="3" stroke-linecap="round"/>
  <polyline points="23.5,7.5 28,16 19.5,16" stroke="#0067da" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="8.5,24.5 4,16 12.5,16" stroke="#d03045" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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
    return `
      <aside class="rr-sidebar rr-sidebar--collapsed" id="rr-sidebar" aria-label="App navigation">
        <div class="rr-sidebar-top">
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
            ${RR_LOGO_SVG}
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
