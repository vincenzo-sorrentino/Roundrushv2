/* ──────────────────────────────────────────────────────────────
   Roadmap Tab — Gantt chart with Development and Design tracks
   Path: /planning/roadmap
   Main view: Two-track timeline (Development / Design) with status modules
   Status colors: Green (completed) | Blue (in-dev) | Purple (designing) | Gray (to-do)
   ────────────────────────────────────────────────────────────── */

/* ── Helpers ───────────────────────────────────────────────– */
function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── Status colors (matching Figma design) ────────────────– */
const STATUS_COLORS = {
  "completed":  "#10b981",  // Green
  "in-dev":     "#3b82f6",  // Blue
  "designing":  "#d946ef",  // Purple
  "to-do":      "#d1d5db",  // Gray
}

/* ── Team members with avatar images ──────────────────────– */
const TEAM = [
  { id: "u1", name: "Olivia Rhye",    image: "http://localhost:3845/assets/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png" },
  { id: "u2", name: "Candice Wu",     image: "http://localhost:3845/assets/261d783da4147da7fea569d1940840845897657f.png" },
  { id: "u3", name: "Orlando Diggs",  image: "http://localhost:3845/assets/30d4a462ea7b6e1428ffcb7ed5d646ca522e5a23.png" },
  { id: "u4", name: "Demi Wilkinson", image: "http://localhost:3845/assets/4e18492d9e016d792d3dfe93dd80d52dd96046ee.png" },
  { id: "u5", name: "Drew Cano",      image: "http://localhost:3845/assets/0728c923a00edf130deb71506d0756fc0d57a8b8.png" },
  { id: "u6", name: "Phoenix Baker",  image: "http://localhost:3845/assets/d9ddce204792163ce745396135bdc5f320b012d7.png" },
  { id: "u7", name: "Nat Craig",      image: "http://localhost:3845/assets/3bbe168eab287460eef89ff5351e750f87e0634b.png" },
  { id: "u8", name: "Lana Steiner",   image: "http://localhost:3845/assets/05be041b58b5e1fe37be4a6bb5a74f76d7c0f06d.png" },
]

/* ── Sprint definitions (12 date columns spanning ~5 months) – */
const SPRINTS = [
  { id: "s11", startDate: "2025-12-17", endDate: "2025-12-31" },
  { id: "s12", startDate: "2026-01-01", endDate: "2026-01-14" },
  { id: "s13", startDate: "2026-01-15", endDate: "2026-02-04" },
  { id: "s14", startDate: "2026-02-05", endDate: "2026-02-25" },
  { id: "s15", startDate: "2026-02-26", endDate: "2026-03-18" },
  { id: "s16", startDate: "2026-03-19", endDate: "2026-04-08" },
]

const MS_PER_DAY = 24 * 60 * 60 * 1000

function toDateUtc(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`)
}

function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY)
}

function getWeekStartsForSprint(sprint) {
  const start = toDateUtc(sprint.startDate)
  const end = toDateUtc(sprint.endDate)
  const weeks = []

  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 7)) {
    weeks.push(cursor)
  }

  return weeks
}

const SPRINT_LAYOUT = (() => {
  let nextColumnStart = 1

  return SPRINTS.map((sprint, index) => {
    const weekStarts = getWeekStartsForSprint(sprint)
    const weekCount = Math.max(1, weekStarts.length)
    const columnStart = nextColumnStart
    nextColumnStart += weekCount

    return {
      ...sprint,
      sprintNo: 11 + index,
      weekStarts,
      weekCount,
      columnStart,
      isCurrent: sprint.id === "s13",
    }
  })
})()

const TOTAL_WEEK_COLUMNS = SPRINT_LAYOUT.reduce((acc, sprint) => acc + sprint.weekCount, 0)
const CURRENT_SPRINT = SPRINT_LAYOUT.find(sprint => sprint.isCurrent) || SPRINT_LAYOUT[0]
const CURRENT_SPRINT_START = CURRENT_SPRINT?.columnStart || 1
const CURRENT_SPRINT_SPAN = CURRENT_SPRINT?.weekCount || 1

/* ── Module definitions: Development track ────────────────– */
const DEV_MODULES = [
  { id: "AUT-001", title: "Login form",                         status: "completed", sprintStart: 0, sprintEnd: 1 },
  { id: "ONB-003", title: "Provider onboarding",                status: "completed", sprintStart: 0, sprintEnd: 0 },
  { id: "AUT-002", title: "User authentication process",        status: "in-dev",    sprintStart: 1, sprintEnd: 2 },
  { id: "ONB-004", title: "Acquirer onboarding",                status: "in-dev",    sprintStart: 2, sprintEnd: 2 },
  { id: "TEM-001", title: "Team section",                       status: "in-dev",    sprintStart: 3, sprintEnd: 3 },
  { id: "TEM-002", title: "Team members roles",                 status: "in-dev",    sprintStart: 3, sprintEnd: 4 },
  { id: "TRA-001", title: "Transaction section",                status: "in-dev",    sprintStart: 2, sprintEnd: 4 },
  { id: "AUT-003", title: "User session management",            status: "to-do",     sprintStart: 4, sprintEnd: 4 },
  { id: "AUT-004", title: "User password recovery",             status: "to-do",     sprintStart: 5, sprintEnd: 5 },
]

/* ── Module definitions: Design track ───────────────────────– */
const DESIGN_MODULES = [
  { id: "AUT-002", title: "User authentication process",        status: "completed", sprintStart: 0, sprintEnd: 1 },
  { id: "ONB-004", title: "Acquirer onboarding",                status: "completed", sprintStart: 0, sprintEnd: 0 },
  { id: "TRA-002", title: "Transaction refunds",                status: "completed", sprintStart: 1, sprintEnd: 1 },
  { id: "AUT-003", title: "User session management",            status: "designing", sprintStart: 2, sprintEnd: 2 },
  { id: "TEM-001", title: "Team section",                       status: "designing", sprintStart: 2, sprintEnd: 2 },
  { id: "TEM-002", title: "Team members roles",                 status: "designing", sprintStart: 2, sprintEnd: 3 },
  { id: "TEM-003", title: "Permission management",              status: "designing", sprintStart: 4, sprintEnd: 4 },
  { id: "TEM-004", title: "Add new member",                     status: "to-do",     sprintStart: 4, sprintEnd: 5 },
]

/* ── Helper: Format date to DD/MM ──────────────────────────– */
function formatDateShort(value) {
  if (!value) return ""
  if (value instanceof Date) {
    const day = String(value.getUTCDate()).padStart(2, "0")
    const month = String(value.getUTCMonth() + 1).padStart(2, "0")
    return `${day}/${month}`
  }

  const [year, month, day] = String(value).split("-")
  return `${day}/${month}`
}

/* ── Render two-row timeline header ────────────────────────– */
function renderSprintRow() {
  return SPRINT_LAYOUT.map(sprint => `
    <div class="rr-roadmap-sprint-cell${sprint.isCurrent ? " is-current" : ""}"
         style="grid-column:${sprint.columnStart} / span ${sprint.weekCount};">
      ${sprint.isCurrent ? '<span class="rr-roadmap-sprint-dot" aria-hidden="true"></span>' : ""}
      <span class="rr-roadmap-sprint-label">Sprint ${sprint.sprintNo}</span>
    </div>
  `).join("")
}

function renderWeeksRow() {
  return SPRINT_LAYOUT.flatMap(sprint => sprint.weekStarts.map(weekStart => `
    <div class="rr-roadmap-week-cell${sprint.isCurrent ? " is-current" : ""}">
      <span class="rr-roadmap-week-label">${formatDateShort(weekStart)}</span>
    </div>
  `)).join("")
}

function renderTimelineHeader() {
  const gridTemplate = `repeat(${TOTAL_WEEK_COLUMNS}, var(--rr-roadmap-week-col-width))`
  return `
    <div class="rr-roadmap-timeline-header">
      <div style="display: flex; flex-direction: row; min-width: min-content; width: max-content;">
        <div class="rr-roadmap-track-header-spacer" style="display: flex; flex-direction: column;">
          <div class="rr-roadmap-track-header-spacer-top"></div>
          <div class="rr-roadmap-track-header-spacer-bottom"></div>
        </div>
        <div style="display: flex; flex-direction: column;">
          <div class="rr-roadmap-sprint-headers-row" style="grid-template-columns:${gridTemplate};">
            ${renderSprintRow()}
          </div>
          <div class="rr-roadmap-weeks-row" style="grid-template-columns:${gridTemplate};">
            ${renderWeeksRow()}
          </div>
        </div>
      </div>
    </div>
  `
}

/* ── Render module bar ─────────────────────────────────────– */
function renderModule(module) {
  const color = STATUS_COLORS[module.status] || STATUS_COLORS["to-do"]
  const startSprint = SPRINT_LAYOUT[module.sprintStart]
  const endSprint = SPRINT_LAYOUT[module.sprintEnd]
  const startColumn = startSprint.columnStart
  const endColumnExclusive = endSprint.columnStart + endSprint.weekCount
  const colSpan = Math.max(1, endColumnExclusive - startColumn)
  
  return `
    <div class="rr-roadmap-module"
         style="grid-column: ${startColumn} / span ${colSpan}; background-color: ${color.replace('#', '')}20; border-color: ${color}">
      <span class="rr-roadmap-module-text">${escapeHtml(module.id)} · ${escapeHtml(module.title)}</span>
    </div>
  `
}

/* ── Render track row (Development or Design) ──────────────– */
function renderTrack(trackLabel, modules) {
  const moduleBars = modules.map(renderModule).join("")
  const gridTemplate = `repeat(${TOTAL_WEEK_COLUMNS}, var(--rr-roadmap-week-col-width))`
  const trackClass = trackLabel.toLowerCase() === "development"
    ? "rr-roadmap-track--development"
    : "rr-roadmap-track--design"
  
  return `
    <div class="rr-roadmap-track ${trackClass}">
      <div class="rr-roadmap-track-header">
        <span class="rr-roadmap-track-label">${escapeHtml(trackLabel)}</span>
      </div>
      <div class="rr-roadmap-track-grid" style="grid-template-columns:${gridTemplate}; --rr-current-col-start:${CURRENT_SPRINT_START}; --rr-current-col-span:${CURRENT_SPRINT_SPAN};">
        ${moduleBars}
      </div>
    </div>
  `
}

/* ── Render team avatars ───────────────────────────────────– */
function renderTeamAvatars() {
  return TEAM.map(user => `
    <div class="rr-roadmap-avatar" title="${escapeHtml(user.name)}">
      <img alt="${escapeHtml(user.name)}" src="${user.image}" />
    </div>
  `).join("")
}

/* ── Main render function ──────────────────────────────────– */
function buildView() {
  return `
    <section class="rr-roadmap" data-flow="roadmap">
      <div class="rr-roadmap-header">
        <div class="rr-roadmap-header-left">
          <p class="rr-roadmap-dates">Project dates: 28/09/25 - 06/06/26</p>
        </div>
        <div class="rr-roadmap-header-right">
          <p class="rr-roadmap-team-count">10 team members</p>
          <div class="rr-roadmap-avatars">
            ${renderTeamAvatars()}
          </div>
        </div>
      </div>

      <div class="rr-roadmap-container">
        ${renderTimelineHeader()}

        <!-- Development track -->
        ${renderTrack("Development", DEV_MODULES)}

        <!-- Design track -->
        ${renderTrack("Design", DESIGN_MODULES)}
      </div>
    </section>
  `
}

/* ── Export render and mount functions ──────────────────────– */
export async function renderRoadmapFlow() {
  return buildView()
}

export function mountRoadmapFlow() {
  const root = document.querySelector('[data-flow="roadmap"]')
  if (!root) return undefined

  // Scroll to most recent sprint on load
  const container = root.querySelector('.rr-roadmap-container')
  if (container) {
    setTimeout(() => {
      container.scrollLeft = container.scrollWidth - container.clientWidth
    }, 100)
  }

  return function unmount() {
    // Cleanup if needed
  }
}
