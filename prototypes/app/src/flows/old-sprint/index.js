/* ──────────────────────────────────────────────────────────────
   Old Sprint / Release Notes — prototype flow
   Path: /planning/old-sprint
   Shows closed sprint data as a tabbed release notes view.
   Tabs: Overview | Stakeholders Issues Log | UAT Issues Log |
         PROD Issues Log | Finalized Design | Automated Tests Coverage
   ────────────────────────────────────────────────────────────── */

/* ── Helpers ───────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── SVG icons ───────────────────────────────────────────────── */
const ICON = {
  caretDown:    `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDoubleUp:`<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,208 128,128 208,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretUp:      `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown:    `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp:      `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="128" y1="216" x2="128" y2="40" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,112 128,40 200,112" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  equals:       `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  search:       `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  link:         `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M144 80h32a40 40 0 0 1 0 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 0 1 0-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  download:     `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M48 216h160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M128 40v128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="72,120 128,176 184,120" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check:        `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  checkCircle:  `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="88,128 112,152 168,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockHistory: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="128,80 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flag:         `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40 168c32-24 64 24 96 0s64-24 96 0V48c-32 24-64-24-96 0s-64 24-96 0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning:      `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M230 194L142 34c-6-11-22-11-28 0L26 194c-6 11 1 26 14 26h176c13 0 20-15 14-26z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="128" y1="104" x2="128" y2="144" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="176" r="8" fill="currentColor"/></svg>`,
  files:        `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M200 224H56a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h96l56 56v128a8 8 0 0 1-8 8z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="152,32 152,88 208,88" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

/* ── Team ───────────────────────────────────────────────────── */
const TEAM = [
  { id: "u1", name: "Olivia Rhye",     initials: "OR", color: "#d4b5ad", img: "https://i.pravatar.cc/48?img=1"  },
  { id: "u2", name: "Candice Wu",      initials: "CW", color: "#a2a8cd", img: "https://i.pravatar.cc/48?img=5"  },
  { id: "u3", name: "Orlando Diggs",   initials: "OD", color: "#cfc3a7", img: "https://i.pravatar.cc/48?img=12" },
  { id: "u4", name: "Demi Wilkinson",  initials: "DW", color: "#bea887", img: "https://i.pravatar.cc/48?img=9"  },
  { id: "u5", name: "Drew Cano",       initials: "DC", color: "#d1dfc3", img: "https://i.pravatar.cc/48?img=8"  },
  { id: "u6", name: "Phoenix Baker",   initials: "PB", color: "#aa9c75", img: "https://i.pravatar.cc/48?img=3"  },
  { id: "u7", name: "Nat Craig",       initials: "NC", color: "#c3b5d1", img: "https://i.pravatar.cc/48?img=16" },
  { id: "u8", name: "Lana Steiner",    initials: "LS", color: "#d4b5ad", img: "https://i.pravatar.cc/48?img=25" },
]

const PRIORITY_CONFIG = {
  urgent: { icon: "caretDoubleUp", label: "Urgent", color: "#c0362d", weight: 4 },
  high:   { icon: "caretUp",       label: "High",   color: "#d13245", weight: 3 },
  medium: { icon: "equals",        label: "Medium", color: "#e7a600", weight: 2 },
  low:    { icon: "arrowDown",     label: "Low",    color: "#0067da", weight: 1 },
}

const STATUS_CONFIG = {
  "to-do":       { label: "To do",        bg: "#e0e2e7", text: "#3d4350" },
  "in-progress": { label: "In progress",  bg: "#daebff", text: "#0067da" },
  "merged-qa":   { label: "Merged-QA",    bg: "#fbc6cd", text: "#d13245" },
  "done":        { label: "Done",         bg: "#d4f5e3", text: "#0e9255" },
  "review":      { label: "Review",       bg: "#fff3cd", text: "#856404" },
  "validating":  { label: "Validating",   bg: "#f6edfd", text: "#9b5bce" },
  "blocked":     { label: "Blocked",      bg: "#fef2f1", text: "#c0362d" },
  "closed":      { label: "Closed",       bg: "#d4f5e3", text: "#0e9255" },
}

// Issues status config
const ISSUE_STATUS_CONFIG = {
  "open":     { label: "Open",     bg: "#fef2f1", text: "#c0362d" },
  "resolved": { label: "Resolved", bg: "#d4f5e3", text: "#0e9255" },
  "wont-fix": { label: "Won't fix",bg: "#e0e2e7", text: "#667085" },
  "pending":  { label: "Pending",  bg: "#fff3cd", text: "#856404" },
}

/* ── Closed sprint data ─────────────────────────────────────── */
export const CLOSED_SPRINTS = [
  {
    id: "sprint-12",
    number: 12,
    startDate: "31/01",
    endDate: "13/02",
    releaseDate: "14/02/2026",
    status: "closed",
    groups: [
      {
        id: "AUT",
        label: "AUT - Authentication",
        modules: [
          { id: "AUT-M001", title: "Login form",        priority: "high",   assignees: ["u1","u3"],       lastUpdate: "10.02.2026", tasksComplete: 8, tasksTotal: 8,  testPercent: 100, status: "done"    },
          { id: "AUT-M002", title: "OAuth integration", priority: "medium", assignees: ["u2","u4","u6"],  lastUpdate: "12.02.2026", tasksComplete: 6, tasksTotal: 6,  testPercent: 100, status: "done"    },
        ],
      },
      {
        id: "SET",
        label: "SET - Settings",
        modules: [
          { id: "SET-001",  title: "User profile page", priority: "low",    assignees: ["u5","u8"],       lastUpdate: "08.02.2026", tasksComplete: 5, tasksTotal: 5,  testPercent: 100, status: "done"    },
        ],
      },
      {
        id: "LOG",
        label: "LOG - Login",
        modules: [
          { id: "LOG-001",  title: "User login",                   priority: "high",   assignees: ["u4","u2","u5"], lastUpdate: "13.02.2026", tasksComplete: 12, tasksTotal: 12, testPercent: 92,  status: "done" },
          { id: "LOG-002",  title: "User authentication process",  priority: "medium", assignees: ["u6","u1"],      lastUpdate: "13.02.2026", tasksComplete: 9,  tasksTotal: 9,  testPercent: 85,  status: "done" },
          { id: "LOG-003",  title: "Password recovery flow",       priority: "low",    assignees: ["u3"],           lastUpdate: "12.02.2026", tasksComplete: 7,  tasksTotal: 7,  testPercent: 45,  status: "done" },
          { id: "LOG-004",  title: "Session token renewal",        priority: "medium", assignees: ["u7","u2"],      lastUpdate: "14.02.2026", tasksComplete: 5,  tasksTotal: 5,  testPercent: 100, status: "done" },
        ],
      },
    ],
  },
  {
    id: "sprint-11",
    number: 11,
    startDate: "17/01",
    endDate: "30/01",
    releaseDate: "31/01/2026",
    status: "closed",
    groups: [
      {
        id: "ONB",
        label: "ONB - Onboarding",
        modules: [
          { id: "ONB-001",  title: "Merchant onboarding wizard",   priority: "high",   assignees: ["u1","u4"],       lastUpdate: "29.01.2026", tasksComplete: 10, tasksTotal: 10, testPercent: 88, status: "done" },
          { id: "ONB-002",  title: "KYC document upload",          priority: "urgent", assignees: ["u7"],            lastUpdate: "28.01.2026", tasksComplete: 8,  tasksTotal: 8,  testPercent: 72, status: "done" },
        ],
      },
      {
        id: "DSH",
        label: "DSH - Dashboard",
        modules: [
          { id: "DSH-001",  title: "Dashboard overview",           priority: "urgent", assignees: ["u5","u2"],       lastUpdate: "30.01.2026", tasksComplete: 14, tasksTotal: 14, testPercent: 95, status: "done" },
        ],
      },
    ],
  },
]

/* ── Finalized design items (from Figma 507:59095) ─────────── */
const FINALIZED_ITEMS = {
  "sprint-12": [
    { id: "LOG005", title: "User password recovery",   priority: "urgent", date: "07/02/26", protoRoute: "/auth/login/default" },
    { id: "ONB004", title: "Merchant onboarding",      priority: "high",   date: "08/02/26", protoRoute: null                  },
    { id: "TRA003", title: "Transaction side panel",   priority: "urgent", date: "07/02/26", protoRoute: null                  },
    { id: "TRA004", title: "Transaction details",      priority: "high",   date: "12/02/26", protoRoute: null                  },
  ],
  "sprint-11": [
    { id: "ONB001", title: "Merchant onboarding wizard",  priority: "high",   date: "29/01/26", protoRoute: null },
    { id: "ONB002", title: "KYC document upload",         priority: "urgent", date: "28/01/26", protoRoute: null },
    { id: "DSH001", title: "Dashboard overview",          priority: "urgent", date: "30/01/26", protoRoute: null },
  ],
}

/* ── Issues data (mock) ─────────────────────────────────────── */
const ISSUES = {
  "sprint-12": {
    stakeholders: [
      { id: "STK-001", title: "Login screen contrast ratio below WCAG 2.1 AA",     reporter: "u5", priority: "high",   status: "resolved", date: "09/02/26" },
      { id: "STK-002", title: "Password reset email wording unclear",               reporter: "u1", priority: "medium", status: "resolved", date: "10/02/26" },
      { id: "STK-003", title: "Session timeout warning not visible enough",         reporter: "u8", priority: "low",    status: "wont-fix", date: "11/02/26" },
      { id: "STK-004", title: "OAuth buttons need stronger visual hierarchy",       reporter: "u4", priority: "medium", status: "resolved", date: "12/02/26" },
    ],
    uat: [
      { id: "UAT-001", title: "Password reset link expires too fast on mobile",     reporter: "u2", priority: "urgent", status: "resolved", date: "10/02/26" },
      { id: "UAT-002", title: "Google OAuth fails silently on slow 3G connections", reporter: "u3", priority: "high",   status: "resolved", date: "11/02/26" },
      { id: "UAT-003", title: "Login error message overlaps on 320px screens",      reporter: "u6", priority: "medium", status: "resolved", date: "12/02/26" },
      { id: "UAT-004", title: "Remember me checkbox not announced to screen reader",reporter: "u7", priority: "high",   status: "resolved", date: "13/02/26" },
    ],
    prod: [
      { id: "PRD-001", title: "OAuth callback fails on slow connections",            reporter: "u7", priority: "high",   status: "resolved", date: "12/02/26" },
      { id: "PRD-002", title: "Session token not revoked on explicit logout (edge)", reporter: "u2", priority: "urgent", status: "resolved", date: "13/02/26" },
    ],
  },
  "sprint-11": {
    stakeholders: [
      { id: "STK-005", title: "Onboarding step indicators hard to read on mobile",  reporter: "u5", priority: "medium", status: "resolved", date: "28/01/26" },
    ],
    uat: [
      { id: "UAT-005", title: "KYC upload accepts unsupported file type silently",  reporter: "u3", priority: "high",   status: "resolved", date: "27/01/26" },
    ],
    prod: [],
  },
}

/* ── Test coverage data (from Figma 507:69959) ─────────────── */
const TEST_COVERAGE = {
  summary: {
    statements: { pct: 55.88, covered: 43896, total: 78384 },
    branches:   { pct: 46.54, covered: 29990, total: 64431 },
    functions:  { pct: 49.02, covered: 10946, total: 22326 },
    lines:      { pct: 56.84, covered: 42164, total: 74173 },
  },
  files: [
    { path: "src/auth/login.js",              stmts: 92.3, branches: 88.5, funcs: 95.0, lines: 92.3 },
    { path: "src/auth/session.js",            stmts: 78.1, branches: 62.0, funcs: 81.5, lines: 79.0 },
    { path: "src/auth/recovery.js",           stmts: 45.0, branches: 33.3, funcs: 50.0, lines: 45.0 },
    { path: "src/auth/oauth.js",              stmts: 88.5, branches: 74.2, funcs: 90.0, lines: 88.5 },
    { path: "src/team/create.js",             stmts: 88.0, branches: 75.4, funcs: 91.7, lines: 88.0 },
    { path: "src/team/roles.js",              stmts: 61.2, branches: 49.1, funcs: 65.0, lines: 62.0 },
    { path: "src/requirements/modules.js",   stmts: 34.5, branches: 22.8, funcs: 37.5, lines: 35.0 },
    { path: "src/dependencies/graph.js",     stmts: 28.0, branches: 18.0, funcs: 30.0, lines: 28.0 },
    { path: "src/settings/profile.js",       stmts: 95.0, branches: 90.2, funcs: 100.0, lines: 95.0 },
    { path: "src/sessions/token.js",         stmts: 82.4, branches: 70.1, funcs: 85.0, lines: 83.0 },
    { path: "src/sessions/revocation.js",    stmts: 44.0, branches: 31.5, funcs: 46.2, lines: 44.5 },
    { path: "src/utils/validation.js",       stmts: 71.9, branches: 58.3, funcs: 75.0, lines: 72.0 },
  ],
}

/* ── Tabs config ────────────────────────────────────────────── */
const TABS = [
  { id: "overview",          label: "Overview" },
  { id: "stakeholders-log",  label: "Stakeholders Issues Log" },
  { id: "uat-log",           label: "UAT Issues Log" },
  { id: "prod-log",          label: "PROD Issues Log" },
  { id: "finalized-design",  label: "Finalized Design" },
  { id: "test-coverage",     label: "Automated Tests Coverage" },
]

/* ═══════════════════════════════════════════════════════════════
   STATE & ELEMENT REFS
   ═══════════════════════════════════════════════════════════════ */
let root = null
let els  = {}
let state = {
  selectedSprintId:   "sprint-12",
  activeTab:          "finalized-design",
  sprintDropdownOpen: false,
  sortCol:            "priority",
  sortDir:            "desc",
  searchQuery:        "",
}

function getSprint() {
  return CLOSED_SPRINTS.find(s => s.id === state.selectedSprintId) || CLOSED_SPRINTS[0]
}

/* ═══════════════════════════════════════════════════════════════
   RENDERING HELPERS
   ═══════════════════════════════════════════════════════════════ */
function renderPriorityBadge(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `<span class="rr-rn-priority" style="color:${cfg.color}">${ICON[cfg.icon]}<span>${escapeHtml(cfg.label)}</span></span>`
}

function renderAvatar(userId) {
  const u = TEAM.find(t => t.id === userId)
  if (!u) return ""
  return `<span class="rr-kb-avatar" style="background:${u.color}" title="${escapeHtml(u.name)}">
    <img src="${u.img}" alt="${escapeHtml(u.initials)}" class="rr-kb-avatar-img" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
    <span class="rr-kb-avatar-fallback">${escapeHtml(u.initials)}</span>
  </span>`
}

function pctColor(pct) {
  if (pct >= 80) return "#0e9255"
  if (pct >= 60) return "#e7a600"
  return "#c0362d"
}

/* ── Sprint selector (injected into #rr-tab-sprint-header) ── */
function renderSprintHeader(sprint) {
  const dropdown = state.sprintDropdownOpen ? `
    <div class="rr-kb-sprint-dropdown">
      ${CLOSED_SPRINTS.map(s => `
        <button type="button"
          class="rr-kb-sprint-option ${s.id === sprint.id ? "is-selected" : ""}"
          data-action="select-sprint" data-sprint-id="${escapeHtml(s.id)}">
          <span class="rr-kb-sprint-dot" style="background:#667085"></span>
          Sprint ${s.number}
          <span class="rr-rn-sprint-dates-small">(${escapeHtml(s.startDate)} – ${escapeHtml(s.endDate)})</span>
        </button>
      `).join("")}
    </div>
  ` : ""

  return `
    <span class="rr-kb-sprint-dates">Sprint dates: ${escapeHtml(sprint.startDate)} – ${escapeHtml(sprint.endDate)}</span>
    <span class="rr-rn-sprint-anchor">
      <button type="button" class="rr-kb-sprint-btn" data-action="toggle-sprint-dropdown">
        <span class="rr-kb-sprint-dot" style="background:#667085"></span>
        <span>Sprint ${sprint.number}</span>
        ${ICON.caretDown}
      </button>
      ${dropdown}
    </span>
  `
}

/* ── Tab nav ────────────────────────────────────────────────── */
function renderTabNav(activeTab) {
  return `
    <nav class="rr-rn-tab-nav">
      ${TABS.map(tab => `
        <button type="button"
          class="rr-rn-tab-btn ${tab.id === activeTab ? "is-active" : ""}"
          data-action="switch-tab" data-tab="${escapeHtml(tab.id)}">
          ${escapeHtml(tab.label)}
        </button>
      `).join("")}
    </nav>
  `
}

/* ── Overview tab ───────────────────────────────────────────── */
function renderOverviewTab(sprint) {
  const allModules = sprint.groups.flatMap(g => g.modules)
  const total  = allModules.length
  const done   = allModules.filter(m => m.status === "done" || m.status === "closed").length
  const tests  = allModules.reduce((sum, m) => sum + m.testPercent, 0) / (total || 1)
  const tasks  = allModules.reduce((a, m) => a + m.tasksComplete, 0)
  const taskTt = allModules.reduce((a, m) => a + m.tasksTotal, 0)

  const stats = [
    { label: "Total Requirements", value: total,                      sub: "in this sprint",    color: "#0067da" },
    { label: "Completed",          value: done,                       sub: `of ${total} modules`, color: "#0e9255" },
    { label: "Tasks Closed",       value: `${tasks}/${taskTt}`,       sub: "tasks completed",   color: "#3d4350" },
    { label: "Avg. Test Coverage", value: `${tests.toFixed(1)}%`,     sub: "unit test coverage",color: pctColor(tests) },
  ]

  const statCards = stats.map(s => `
    <div class="rr-rn-stat-card">
      <span class="rr-rn-stat-value" style="color:${s.color}">${escapeHtml(String(s.value))}</span>
      <span class="rr-rn-stat-label">${escapeHtml(s.label)}</span>
      <span class="rr-rn-stat-sub">${escapeHtml(s.sub)}</span>
    </div>
  `).join("")

  const moduleRows = sprint.groups.map(group => {
    const rows = group.modules.map(mod => {
      const st = STATUS_CONFIG[mod.status] || STATUS_CONFIG["done"]
      return `
        <div class="rr-rn-overview-row">
          <span class="rr-rn-overview-row-id">${escapeHtml(mod.id)}</span>
          <span class="rr-rn-overview-row-title">${escapeHtml(mod.title)}</span>
          <span class="rr-rn-overview-row-priority">${renderPriorityBadge(mod.priority)}</span>
          <span class="rr-rn-overview-row-tasks">${mod.tasksComplete}/${mod.tasksTotal} tasks</span>
          <span class="rr-rn-overview-row-test" style="color:${pctColor(mod.testPercent)}">${mod.testPercent}%</span>
          <span class="rr-rn-overview-row-status" style="background:${st.bg};color:${st.text}">${escapeHtml(st.label)}</span>
        </div>
      `
    }).join("")
    return `
      <div class="rr-rn-overview-group">
        <div class="rr-rn-overview-group-label">${escapeHtml(group.label)}</div>
        ${rows}
      </div>
    `
  }).join("")

  return `
    <div class="rr-rn-overview">
      <div class="rr-rn-stats-grid">${statCards}</div>
      <div class="rr-rn-overview-list">${moduleRows}</div>
    </div>
  `
}

/* ── Issues log tab (shared for stakeholders / UAT / PROD) ── */
function renderIssuesLogTab(issues, heading) {
  if (!issues.length) {
    return `<p class="rr-rn-empty">${ICON.checkCircle} No ${escapeHtml(heading)} issues reported for this sprint.</p>`
  }

  const rows = issues.map(issue => {
    const st = ISSUE_STATUS_CONFIG[issue.status] || ISSUE_STATUS_CONFIG["open"]
    const u  = TEAM.find(t => t.id === issue.reporter)
    return `
      <div class="rr-rn-issues-row">
        <span class="rr-rn-issues-id">${escapeHtml(issue.id)}</span>
        <span class="rr-rn-issues-title">${escapeHtml(issue.title)}</span>
        <span class="rr-rn-issues-reporter">${u ? renderAvatar(issue.reporter) : "—"}</span>
        <span class="rr-rn-issues-priority">${renderPriorityBadge(issue.priority)}</span>
        <span class="rr-rn-issues-status" style="background:${st.bg};color:${st.text}">${escapeHtml(st.label)}</span>
        <span class="rr-rn-issues-date">${escapeHtml(issue.date)}</span>
      </div>
    `
  }).join("")

  return `
    <div class="rr-rn-issues-table">
      <div class="rr-rn-issues-thead">
        <span class="rr-rn-issues-th rr-rn-issues-th--id">ID</span>
        <span class="rr-rn-issues-th rr-rn-issues-th--title">Issue</span>
        <span class="rr-rn-issues-th rr-rn-issues-th--reporter">Reporter</span>
        <span class="rr-rn-issues-th rr-rn-issues-th--priority">Priority</span>
        <span class="rr-rn-issues-th rr-rn-issues-th--status">Status</span>
        <span class="rr-rn-issues-th rr-rn-issues-th--date">Date</span>
      </div>
      <div class="rr-rn-issues-tbody">${rows}</div>
    </div>
  `
}

/* ── Finalized design tab ───────────────────────────────────── */
function renderFinalizedDesignTab(sprintId) {
  const items = FINALIZED_ITEMS[sprintId] || []

  if (!items.length) {
    return `<p class="rr-rn-empty">No finalized design items for this sprint.</p>`
  }

  const sortedItems = [...items].sort((a, b) => {
    if (state.sortDir === "desc") {
      return (PRIORITY_CONFIG[b.id]?.weight ?? 0) - (PRIORITY_CONFIG[a.priority]?.weight ?? 0)
    }
    return (PRIORITY_CONFIG[a.priority]?.weight ?? 0) - (PRIORITY_CONFIG[b.priority]?.weight ?? 0)
  })

  const rows = sortedItems.map(item => {
    const protoCell = item.protoRoute
      ? `<a href="${escapeHtml(item.protoRoute)}" class="rr-rn-design-link" title="Open prototype">${ICON.link}</a>`
      : `<span class="rr-rn-design-link rr-rn-design-link--disabled" title="Prototype not available">${ICON.link}</span>`
    return `
      <div class="rr-rn-design-row">
        <span class="rr-rn-design-cell rr-rn-design-cell--req">
          <span class="rr-rn-design-id">${escapeHtml(item.id)}</span>
          <span class="rr-rn-design-title">${escapeHtml(item.title)}</span>
        </span>
        <span class="rr-rn-design-cell rr-rn-design-cell--priority">${renderPriorityBadge(item.priority)}</span>
        <span class="rr-rn-design-cell rr-rn-design-cell--date">${escapeHtml(item.date)}</span>
        <span class="rr-rn-design-cell rr-rn-design-cell--proto">${protoCell}</span>
      </div>
    `
  }).join("")

  const sortIcon = state.sortDir === "desc" ? ICON.arrowDown : ICON.arrowUp

  return `
    <div class="rr-rn-design-table">
      <div class="rr-rn-design-thead">
        <span class="rr-rn-design-th rr-rn-design-th--req">Requirements</span>
        <span class="rr-rn-design-th rr-rn-design-th--priority">
          <button type="button" class="rr-rn-sort-btn" data-action="sort-priority">
            Priority ${sortIcon}
          </button>
        </span>
        <span class="rr-rn-design-th rr-rn-design-th--date">Date</span>
        <span class="rr-rn-design-th rr-rn-design-th--proto">Prototype</span>
      </div>
      <div class="rr-rn-design-tbody">${rows}</div>
    </div>
  `
}

/* ── Automated tests coverage tab ───────────────────────────── */
function renderTestCoverageTab() {
  const { summary, files } = TEST_COVERAGE

  const summaryRow = [
    { key: "statements", label: "Statements", ...summary.statements },
    { key: "branches",   label: "Branches",   ...summary.branches   },
    { key: "functions",  label: "Functions",  ...summary.functions  },
    { key: "lines",      label: "Lines",      ...summary.lines      },
  ].map(m => `
    <span class="rr-rn-cov-stat">
      <span class="rr-rn-cov-pct" style="color:${pctColor(m.pct)}">${m.pct}%</span>
      <span class="rr-rn-cov-label">${escapeHtml(m.label)}</span>
      <span class="rr-rn-cov-badge">${escapeHtml(String(m.covered))}/${escapeHtml(String(m.total))}</span>
    </span>
  `).join("")

  const fileRows = files.map(f => {
    const cells = [f.stmts, f.branches, f.funcs, f.lines].map(pct =>
      `<span class="rr-rn-cov-cell" style="color:${pctColor(pct)}">${pct.toFixed(1)}%</span>`
    ).join("")
    return `
      <div class="rr-rn-cov-file-row">
        <span class="rr-rn-cov-file-path">${ICON.files} ${escapeHtml(f.path)}</span>
        ${cells}
      </div>
    `
  }).join("")

  return `
    <div class="rr-rn-coverage">
      <div class="rr-rn-cov-summary-row">${summaryRow}</div>
      <div class="rr-rn-cov-file-table">
        <div class="rr-rn-cov-file-thead">
          <span class="rr-rn-cov-th rr-rn-cov-th--path">File</span>
          <span class="rr-rn-cov-th">Stmts %</span>
          <span class="rr-rn-cov-th">Branches %</span>
          <span class="rr-rn-cov-th">Funcs %</span>
          <span class="rr-rn-cov-th">Lines %</span>
        </div>
        <div class="rr-rn-cov-file-tbody">${fileRows}</div>
      </div>
    </div>
  `
}

/* ── Tab content dispatcher ─────────────────────────────────── */
function renderTabContent(sprint) {
  const issues = ISSUES[sprint.id] || { stakeholders: [], uat: [], prod: [] }
  switch (state.activeTab) {
    case "overview":         return renderOverviewTab(sprint)
    case "stakeholders-log": return renderIssuesLogTab(issues.stakeholders, "Stakeholders")
    case "uat-log":          return renderIssuesLogTab(issues.uat, "UAT")
    case "prod-log":         return renderIssuesLogTab(issues.prod, "PROD")
    case "finalized-design": return renderFinalizedDesignTab(sprint.id)
    case "test-coverage":    return renderTestCoverageTab()
    default:                 return ""
  }
}

/* ── Release notes card header ──────────────────────────────── */
function renderCardHeader(sprint) {
  return `
    <div class="rr-rn-card-header">
      <div class="rr-rn-card-header-left">
        <span class="rr-rn-card-title">Release notes Sprint ${sprint.number}</span>
        <span class="rr-rn-card-subtitle">Release date: ${escapeHtml(sprint.releaseDate)}</span>
      </div>
      <div class="rr-rn-card-header-right">
        <button type="button" class="rr-rn-download-btn" data-action="download-pdf">
          ${ICON.download}<span>Download PDF</span>
        </button>
        <button type="button" class="rr-rn-download-btn" data-action="download-xls">
          ${ICON.download}<span>Download XLS</span>
        </button>
      </div>
    </div>
  `
}

/* ═══════════════════════════════════════════════════════════════
   MAIN RENDER
   ═══════════════════════════════════════════════════════════════ */
function render() {
  const sprint = getSprint()
  els.filterRow.innerHTML    = "" // no filter bar for release notes
  els.cardHeader.innerHTML   = renderCardHeader(sprint)
  els.tabNav.innerHTML       = renderTabNav(state.activeTab)
  els.tabContent.innerHTML   = renderTabContent(sprint)

  const sprintHeaderEl = document.getElementById("rr-tab-sprint-header")
  if (sprintHeaderEl) sprintHeaderEl.innerHTML = renderSprintHeader(sprint)
}

/* ═══════════════════════════════════════════════════════════════
   HTML SHELL
   ═══════════════════════════════════════════════════════════════ */
export function renderOldSprintFlow() {
  return `
    <section class="rr-rn" data-flow="old-sprint">
      <div class="rr-rn-body">
        <div id="rr-rn-filter-row"></div>
        <div class="rr-rn-card">
          <div id="rr-rn-card-header"></div>
          <div id="rr-rn-tab-nav"></div>
          <div id="rr-rn-tab-content"></div>
        </div>
      </div>
    </section>
  `
}

/* ═══════════════════════════════════════════════════════════════
   MOUNT
   ═══════════════════════════════════════════════════════════════ */
export function mountOldSprintFlow() {
  root = document.querySelector("[data-flow='old-sprint']")
  if (!root) return

  els = {
    filterRow:  root.querySelector("#rr-rn-filter-row"),
    cardHeader: root.querySelector("#rr-rn-card-header"),
    tabNav:     root.querySelector("#rr-rn-tab-nav"),
    tabContent: root.querySelector("#rr-rn-tab-content"),
  }

  // Reset state for fresh mount
  state.activeTab          = "finalized-design"
  state.sprintDropdownOpen = false
  state.sortDir            = "desc"

  render()

  root.addEventListener("click", handleClick)
  document.addEventListener("keydown", handleKeydown)

  return () => {
    root.removeEventListener("click", handleClick)
    document.removeEventListener("keydown", handleKeydown)
    const sprintHeaderEl = document.getElementById("rr-tab-sprint-header")
    if (sprintHeaderEl) sprintHeaderEl.innerHTML = ""
    root = null
  }
}

/* ═══════════════════════════════════════════════════════════════
   EVENT HANDLING
   ═══════════════════════════════════════════════════════════════ */
function handleClick(e) {
  const btn = e.target.closest("[data-action]")
  if (!btn) {
    if (state.sprintDropdownOpen) {
      state.sprintDropdownOpen = false
      render()
    }
    return
  }

  const action = btn.dataset.action

  if (action === "toggle-sprint-dropdown") {
    state.sprintDropdownOpen = !state.sprintDropdownOpen
    render()
    return
  }

  if (action === "select-sprint") {
    state.selectedSprintId   = btn.dataset.sprintId
    state.sprintDropdownOpen = false
    state.activeTab          = "finalized-design"
    render()
    return
  }

  if (action === "switch-tab") {
    state.activeTab = btn.dataset.tab
    render()
    return
  }

  if (action === "sort-priority") {
    state.sortDir = state.sortDir === "desc" ? "asc" : "desc"
    render()
    return
  }

  if (action === "download-pdf" || action === "download-xls") {
    const sprint = getSprint()
    const ext    = action === "download-pdf" ? "PDF" : "XLS"
    // Prototype: just show a toast-style message
    showDownloadToast(`${ext} export for Sprint ${sprint.number} would download here.`)
    return
  }
}

function handleKeydown(e) {
  if (e.key === "Escape" && state.sprintDropdownOpen) {
    state.sprintDropdownOpen = false
    render()
  }
}

/* ── Prototype download toast ───────────────────────────────── */
function showDownloadToast(message) {
  let toast = document.getElementById("rr-rn-toast")
  if (!toast) {
    toast = document.createElement("div")
    toast.id = "rr-rn-toast"
    toast.className = "rr-rn-toast"
    document.body.appendChild(toast)
  }
  toast.textContent = message
  toast.classList.add("is-visible")
  clearTimeout(toast._timer)
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2800)
}
