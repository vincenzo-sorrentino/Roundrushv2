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
  "designing":  "#8b5cf6",  // Purple-violet
  "to-do":      "#bfc6d0",  // Gray (slightly darker)
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
    const normalizedWeekStarts = [...weekStarts]
    while (normalizedWeekStarts.length < 3) {
      const lastWeek = normalizedWeekStarts[normalizedWeekStarts.length - 1]
      normalizedWeekStarts.push(addDays(lastWeek, 7))
    }

    const finalWeekStarts = normalizedWeekStarts
    const columnStart = nextColumnStart
    const normalizedWeekCount = Math.max(1, finalWeekStarts.length)
    nextColumnStart += normalizedWeekCount

    return {
      ...sprint,
      sprintNo: 11 + index,
      weekStarts: finalWeekStarts,
      weekCount: normalizedWeekCount,
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
  { id: "TEM-001", title: "Team section",                       status: "to-do",     sprintStart: 3, sprintEnd: 3 },
  { id: "TEM-002", title: "Team members roles",                 status: "to-do",     sprintStart: 3, sprintEnd: 4 },
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
  { id: "TEM-003", title: "Permission management",              status: "to-do",     sprintStart: 4, sprintEnd: 4 },
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

function getSubtleSolidColor(hexColor) {
  const hex = String(hexColor || "").trim()
  const normalized = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#d1d5db"
  const r = Number.parseInt(normalized.slice(1, 3), 16)
  const g = Number.parseInt(normalized.slice(3, 5), 16)
  const b = Number.parseInt(normalized.slice(5, 7), 16)
  const mixWithWhite = 0.72

  const toHex = value => Math.round(value).toString(16).padStart(2, "0")
  const mixedR = r + (255 - r) * mixWithWhite
  const mixedG = g + (255 - g) * mixWithWhite
  const mixedB = b + (255 - b) * mixWithWhite

  return `#${toHex(mixedR)}${toHex(mixedG)}${toHex(mixedB)}`
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
  const subtleBackground = getSubtleSolidColor(color)
  const startSprint = SPRINT_LAYOUT[module.sprintStart]
  const endSprint = SPRINT_LAYOUT[module.sprintEnd]
  const startColumn = startSprint.columnStart
  const endColumnExclusive = endSprint.columnStart + endSprint.weekCount
  const colSpan = Math.max(1, endColumnExclusive - startColumn)
  
  return `
    <div class="rr-roadmap-module"
         style="grid-column: ${startColumn} / span ${colSpan}; --rr-roadmap-module-color: ${color}; background-color: ${subtleBackground};">
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

function renderRoadmapHeaderActions() {
  return `
    <button type="button" class="rr-kb-sprint-history-btn rr-roadmap-settings-btn" aria-label="Roadmap settings" title="Roadmap settings">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M8.99928 5.62499C8.33177 5.62499 7.67925 5.82293 7.12423 6.19378C6.56921 6.56463 6.13663 7.09173 5.88119 7.70843C5.62574 8.32513 5.5589 9.00373 5.68913 9.65842C5.81935 10.3131 6.14079 10.9145 6.61279 11.3865C7.0848 11.8585 7.68616 12.1799 8.34085 12.3101C8.99554 12.4404 9.67414 12.3735 10.2908 12.1181C10.9075 11.8626 11.4346 11.4301 11.8055 10.875C12.1763 10.32 12.3743 9.6675 12.3743 8.99999C12.3733 8.10517 12.0175 7.24726 11.3847 6.61453C10.752 5.9818 9.8941 5.62592 8.99928 5.62499ZM8.99928 11.25C8.55427 11.25 8.11926 11.118 7.74925 10.8708C7.37924 10.6236 7.09085 10.2722 6.92055 9.86102C6.75025 9.44989 6.7057 8.99749 6.79251 8.56103C6.87933 8.12458 7.09362 7.72366 7.40829 7.409C7.72296 7.09433 8.12387 6.88004 8.56033 6.79322C8.99678 6.7064 9.44918 6.75096 9.86032 6.92126C10.2715 7.09155 10.6229 7.37994 10.8701 7.74995C11.1173 8.11996 11.2493 8.55498 11.2493 8.99999C11.2493 9.59672 11.0122 10.169 10.5903 10.591C10.1683 11.0129 9.59602 11.25 8.99928 11.25ZM16.7294 7.53819C16.7138 7.45898 16.6812 7.38407 16.634 7.31855C16.5868 7.25304 16.5261 7.19845 16.4559 7.1585L14.3585 5.96319L14.3501 3.59928C14.3498 3.51787 14.3319 3.43748 14.2975 3.36368C14.2632 3.28987 14.2132 3.2244 14.1511 3.17178C13.3902 2.52821 12.5141 2.03502 11.5692 1.71842C11.4948 1.69324 11.4159 1.68392 11.3377 1.69106C11.2595 1.69821 11.1836 1.72166 11.115 1.75991L8.99928 2.94256L6.88147 1.7578C6.81281 1.71933 6.73684 1.69571 6.65848 1.68844C6.58012 1.68117 6.50111 1.69043 6.42655 1.71561C5.48235 2.03452 4.6072 2.52959 3.84748 3.1746C3.78544 3.22713 3.73553 3.29249 3.70118 3.36617C3.66683 3.43985 3.64885 3.5201 3.6485 3.60139L3.63795 5.96741L1.54053 7.16272C1.47036 7.20267 1.40961 7.25726 1.36241 7.32277C1.31522 7.38829 1.28268 7.4632 1.26701 7.54241C1.07506 8.50701 1.07506 9.49999 1.26701 10.4646C1.28268 10.5438 1.31522 10.6187 1.36241 10.6842C1.40961 10.7497 1.47036 10.8043 1.54053 10.8443L3.63795 12.0396L3.64639 14.4035C3.64664 14.4849 3.66457 14.5653 3.69892 14.6391C3.73328 14.7129 3.78324 14.7784 3.84537 14.831C4.6062 15.4746 5.48236 15.9678 6.42725 16.2844C6.50166 16.3095 6.58052 16.3189 6.65875 16.3117C6.73698 16.3046 6.81285 16.2811 6.88147 16.2429L8.99928 15.0574L11.1171 16.2422C11.2009 16.2889 11.2954 16.3131 11.3913 16.3125C11.4527 16.3125 11.5138 16.3025 11.572 16.283C12.5161 15.9645 13.3912 15.4699 14.1511 14.8254C14.2131 14.7728 14.263 14.7075 14.2974 14.6338C14.3317 14.5601 14.3497 14.4799 14.3501 14.3986L14.3606 12.0326L16.458 10.8373C16.5282 10.7973 16.5889 10.7427 16.6361 10.6772C16.6833 10.6117 16.7159 10.5368 16.7315 10.4576C16.9224 9.49373 16.9217 8.50175 16.7294 7.53819ZM15.6747 9.9928L13.6659 11.1354C13.5779 11.1854 13.505 11.2583 13.455 11.3463C13.4142 11.4166 13.3713 11.4912 13.3277 11.5615C13.2719 11.6501 13.2422 11.7527 13.2419 11.8575L13.2314 14.1251C12.6914 14.5491 12.0899 14.8882 11.4476 15.1305L9.42115 14.0013C9.33703 13.9548 9.24238 13.9306 9.14623 13.931H9.13287C9.04779 13.931 8.96201 13.931 8.87694 13.931C8.77631 13.9285 8.67682 13.9528 8.58865 14.0013L6.56084 15.1333C5.91714 14.8928 5.31394 14.5554 4.77209 14.1328L4.76436 11.8687C4.76401 11.7638 4.7343 11.661 4.67858 11.572C4.63498 11.5017 4.59209 11.4314 4.55201 11.3569C4.50232 11.2675 4.42945 11.1932 4.34108 11.1417L2.33014 9.99632C2.22608 9.33806 2.22608 8.66754 2.33014 8.00928L4.33545 6.8646C4.42347 6.81455 4.49634 6.74167 4.54639 6.65366C4.58717 6.58335 4.63006 6.50881 4.67365 6.4385C4.72946 6.34983 4.75918 6.24725 4.75944 6.14249L4.76998 3.87491C5.30993 3.45089 5.91148 3.11182 6.55381 2.86944L8.5774 3.99866C8.66547 4.04748 8.76503 4.07176 8.86569 4.06897C8.95076 4.06897 9.03655 4.06897 9.12162 4.06897C9.22225 4.07149 9.32174 4.04722 9.4099 3.99866L11.4377 2.86663C12.0814 3.10715 12.6846 3.44455 13.2265 3.86717L13.2342 6.13124C13.2345 6.23621 13.2643 6.33899 13.32 6.42796C13.3636 6.49827 13.4065 6.56858 13.4465 6.64311C13.4962 6.73249 13.5691 6.80681 13.6575 6.85827L15.6684 8.00366C15.7739 8.66242 15.7751 9.33367 15.6719 9.9928H15.6747Z" fill="#14161B"/>
      </svg>
    </button>
  `
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

  const tabHeaderActions = document.querySelector("#rr-tab-sprint-header")
  if (tabHeaderActions) {
    tabHeaderActions.innerHTML = renderRoadmapHeaderActions()
  }

  // Scroll to most recent sprint on load
  const container = root.querySelector('.rr-roadmap-container')
  if (container) {
    setTimeout(() => {
      container.scrollLeft = container.scrollWidth - container.clientWidth
    }, 100)
  }

  return function unmount() {
    if (tabHeaderActions) {
      tabHeaderActions.innerHTML = ""
    }

    // Cleanup if needed
  }
}
