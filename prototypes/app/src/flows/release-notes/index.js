/* ──────────────────────────────────────────────────────────────
   Release Notes (Stakeholder Approval Flow) — prototype
   Path: /planning/release-notes
   Release notes view with stakeholder approval, plus a
   stakeholder approval section: sign & approve per person.
   When all stakeholders have approved → "Sprint fully approved"
   green banner is shown.
   ────────────────────────────────────────────────────────────── */

import { CLOSED_SPRINTS } from "../old-sprint/index.js"

// Re-import everything from old-sprint (we shadow what we need)
/* ── Helpers ───────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── Icons ──────────────────────────────────────────────────── */
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
  seal:         `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M128 24 L152 48 L184 40 L192 72 L224 80 L216 112 L240 128 L216 144 L224 176 L192 184 L184 216 L152 208 L128 232 L104 208 L72 216 L64 184 L32 176 L40 144 L16 128 L40 112 L32 80 L64 72 L72 40 L104 48 Z" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/><polyline points="88,128 112,152 168,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockHistory: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="128,80 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flag:         `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40 168c32-24 64 24 96 0s64-24 96 0V48c-32 24-64-24-96 0s-64 24-96 0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  files:        `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M200 224H56a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h96l56 56v128a8 8 0 0 1-8 8z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="152,32 152,88 208,88" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

/* ── Team / Priority / Status configs (same as old-sprint) ─── */
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
  "done":        { label: "Done",         bg: "#d4f5e3", text: "#0e9255" },
  "review":      { label: "Review",       bg: "#fff3cd", text: "#856404" },
  "closed":      { label: "Closed",       bg: "#d4f5e3", text: "#0e9255" },
}

const ISSUE_STATUS_CONFIG = {
  "open":     { label: "Open",      bg: "#fef2f1", text: "#c0362d" },
  "resolved": { label: "Resolved",  bg: "#d4f5e3", text: "#0e9255" },
  "fixed":    { label: "Fixed",     bg: "#d4f5e3", text: "#0e9255" },
  "closed":   { label: "Closed",    bg: "#e0e2e7", text: "#3d4350" },
  "wont-fix": { label: "Won't fix", bg: "#e0e2e7", text: "#667085" },
  "pending":  { label: "Pending",   bg: "#fff3cd", text: "#856404" },
}

/* ── Finalized items ────────────────────────────────────────── */
const FINALIZED_ITEMS = {
  "sprint-12": [
    { id: "LOG005", title: "User password recovery",  priority: "urgent", date: "07/02/26", protoRoute: "/auth/login/default" },
    { id: "ONB004", title: "Merchant onboarding",     priority: "high",   date: "08/02/26", protoRoute: null },
    { id: "TRA003", title: "Transaction side panel",  priority: "urgent", date: "07/02/26", protoRoute: null },
    { id: "TRA004", title: "Transaction details",     priority: "high",   date: "12/02/26", protoRoute: null },
  ],
  "sprint-11": [
    { id: "ONB001", title: "Merchant onboarding wizard", priority: "high",   date: "29/01/26", protoRoute: null },
    { id: "ONB002", title: "KYC document upload",         priority: "urgent", date: "28/01/26", protoRoute: null },
    { id: "DSH001", title: "Dashboard overview",          priority: "urgent", date: "30/01/26", protoRoute: null },
  ],
}

const ISSUES = {
  "sprint-12": {
    stakeholders: [
      { id: "STK-001", title: "Login screen contrast ratio below WCAG 2.1 AA",   reporter: "u5", priority: "high",   status: "resolved", date: "09/02/26" },
      { id: "STK-002", title: "Password reset email wording unclear",             reporter: "u1", priority: "medium", status: "resolved", date: "10/02/26" },
      { id: "STK-003", title: "Session timeout warning not visible enough",       reporter: "u8", priority: "low",    status: "wont-fix", date: "11/02/26" },
      { id: "STK-004", title: "OAuth buttons need stronger visual hierarchy",     reporter: "u4", priority: "medium", status: "resolved", date: "12/02/26" },
    ],
    uat: [
      { id: "UAT-001", title: "Password reset link expires too fast on mobile",   reporter: "u2", priority: "urgent", status: "resolved", date: "10/02/26" },
      { id: "UAT-002", title: "Google OAuth fails silently on slow 3G connections", reporter: "u3", priority: "high", status: "resolved", date: "11/02/26" },
      { id: "UAT-003", title: "Login error message overlaps on 320px screens",   reporter: "u6", priority: "medium", status: "resolved", date: "12/02/26" },
      { id: "UAT-004", title: "Remember me checkbox not announced to screen reader", reporter: "u7", priority: "high", status: "resolved", date: "13/02/26" },
    ],
    prod: [
      { id: "PRD-001", title: "OAuth callback fails on slow connections",          reporter: "u7", priority: "high",   status: "resolved", date: "12/02/26" },
      { id: "PRD-002", title: "Session token not revoked on explicit logout",      reporter: "u2", priority: "urgent", status: "resolved", date: "13/02/26" },
      { id: "PRD-003", title: "Notification badge counter stale after read state sync", reporter: "u4", priority: "medium", status: "fixed", date: "13/02/26" },
      { id: "PRD-004", title: "Duplicate webhook retry caused duplicate transaction logs", reporter: "u6", priority: "high", status: "fixed", date: "12/02/26" },
      { id: "PRD-005", title: "Kanban filters reset unexpectedly after browser back", reporter: "u3", priority: "medium", status: "closed", date: "11/02/26" },
      { id: "PRD-006", title: "Dashboard totals mismatch on timezone boundary", reporter: "u1", priority: "high", status: "resolved", date: "13/02/26" },
      { id: "PRD-007", title: "File preview crash on oversized image upload", reporter: "u8", priority: "urgent", status: "fixed", date: "14/02/26" },
      { id: "PRD-008", title: "Email digest scheduler skipped weekend backlog", reporter: "u5", priority: "low", status: "resolved", date: "14/02/26" },
    ],
  },
  "sprint-11": {
    stakeholders: [
      { id: "STK-005", title: "Onboarding step indicators hard to read on mobile", reporter: "u5", priority: "medium", status: "resolved", date: "28/01/26" },
    ],
    uat: [
      { id: "UAT-005", title: "KYC upload accepts unsupported file type silently", reporter: "u3", priority: "high",   status: "resolved", date: "27/01/26" },
    ],
    prod: [
      { id: "PRD-009", title: "KYC upload timeout on unstable 4G connections", reporter: "u7", priority: "high", status: "resolved", date: "29/01/26" },
      { id: "PRD-010", title: "Session audit logs missing for guest invite flow", reporter: "u4", priority: "medium", status: "fixed", date: "30/01/26" },
      { id: "PRD-011", title: "Dashboard chart tooltip overflow on iPad view", reporter: "u2", priority: "low", status: "closed", date: "30/01/26" },
    ],
  },
}

const TEST_COVERAGE = {
  summary: {
    statements: { pct: 55.88, covered: 43896, total: 78384 },
    branches:   { pct: 46.54, covered: 29990, total: 64431 },
    functions:  { pct: 49.02, covered: 10946, total: 22326 },
    lines:      { pct: 56.84, covered: 42164, total: 74173 },
  },
  files: [
    { path: "src/auth/login.js",           stmts: 92.3, branches: 88.5, funcs: 95.0,  lines: 92.3 },
    { path: "src/auth/session.js",         stmts: 78.1, branches: 62.0, funcs: 81.5,  lines: 79.0 },
    { path: "src/auth/recovery.js",        stmts: 45.0, branches: 33.3, funcs: 50.0,  lines: 45.0 },
    { path: "src/auth/oauth.js",           stmts: 88.5, branches: 74.2, funcs: 90.0,  lines: 88.5 },
    { path: "src/team/create.js",          stmts: 88.0, branches: 75.4, funcs: 91.7,  lines: 88.0 },
    { path: "src/settings/profile.js",     stmts: 95.0, branches: 90.2, funcs: 100.0, lines: 95.0 },
    { path: "src/sessions/token.js",       stmts: 82.4, branches: 70.1, funcs: 85.0,  lines: 83.0 },
    { path: "src/utils/validation.js",     stmts: 71.9, branches: 58.3, funcs: 75.0,  lines: 72.0 },
  ],
}

const TABS = [
  { id: "overview",           label: "Overview" },
  { id: "bug-fixing",         label: "Bug fixing" },
  { id: "implemented-tasks",  label: "Implemented tasks" },
  { id: "finalized-design",   label: "Finalized Design" },
  { id: "test-coverage",      label: "Automated Tests Coverage" },
]

/* ── Stakeholders data ──────────────────────────────────────── */
const STAKEHOLDERS = [
  { id: "sh1", name: "Marco Ricci",     role: "Product Owner",          userId: "u1", status: "pending" },
  { id: "sh2", name: "Giulia Ferrero",  role: "Engineering Lead",       userId: "u4", status: "pending" },
  { id: "sh3", name: "Thomas Müller",   role: "QA Manager",             userId: "u7", status: "pending" },
  { id: "sh4", name: "Sara Esposito",   role: "UX Design Lead",         userId: "u8", status: "pending" },
  { id: "sh5", name: "James Holloway",  role: "Senior Stakeholder",     userId: "u6", status: "pending" },
]

/* ═══════════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════════ */
let root = null
let els  = {}
let state = {
  selectedSprintId:   "sprint-12",
  activeTab:          "overview",
  sprintDropdownOpen: false,
  sortDir:            "desc",
  approvals:          {}, // { sh1: true, sh2: false, ... }
}

function getSprint() {
  return CLOSED_SPRINTS.find(s => s.id === state.selectedSprintId) || CLOSED_SPRINTS[0]
}

function allApproved() {
  return STAKEHOLDERS.every(sh => state.approvals[sh.id] === true)
}

/* ═══════════════════════════════════════════════════════════════
   RENDERING HELPERS
   ═══════════════════════════════════════════════════════════════ */
function renderPriorityBadge(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `<span class="rr-kb-priority" style="color:${cfg.color}">${ICON[cfg.icon]}<span>${escapeHtml(cfg.label)}</span></span>`
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

function formatReleaseDateCell(value) {
  const raw = String(value ?? "").trim()
  if (!raw) return "—"
  const normalized = raw.replaceAll(".", "/")
  const parts = normalized.split("/")
  if (parts.length !== 3) return normalized
  const [d, m, y] = parts
  const day = d.padStart(2, "0")
  const month = m.padStart(2, "0")
  const year = y.length === 4 ? y.slice(2) : y
  return `${day}/${month}/${year}`
}

/* ── Approval section ───────────────────────────────────────── */
function renderApprovalSection() {
  if (allApproved()) {
    return `
      <div class="rr-rn-approval-section rr-rn-approval-section--approved">
        <div class="rr-rn-approval-banner">
          ${ICON.seal}
          <div class="rr-rn-approval-banner-text">
            <strong>Sprint fully approved</strong>
            <span>All stakeholders have signed and approved this release.</span>
          </div>
        </div>
        <div class="rr-rn-stakeholder-list">
          ${STAKEHOLDERS.map(sh => renderStakeholderRow(sh, true)).join("")}
        </div>
      </div>
    `
  }

  const approvedCount = STAKEHOLDERS.filter(sh => state.approvals[sh.id]).length
  const totalCount    = STAKEHOLDERS.length

  return `
    <div class="rr-rn-approval-section">
      <div class="rr-rn-approval-header">
        <div class="rr-rn-approval-header-left">
          <span class="rr-rn-approval-title">${ICON.seal} Stakeholder Approval</span>
          <span class="rr-rn-approval-subtitle">
            ${approvedCount} of ${totalCount} approvals received
          </span>
        </div>
        <div class="rr-rn-approval-progress-bar-wrap">
          <div class="rr-rn-approval-progress-bar"
               style="width:${Math.round((approvedCount / totalCount) * 100)}%"></div>
        </div>
      </div>
      <div class="rr-rn-stakeholder-list">
        ${STAKEHOLDERS.map(sh => renderStakeholderRow(sh, false)).join("")}
      </div>
    </div>
  `
}

function renderStakeholderRow(sh, allDone) {
  const approved = allDone || state.approvals[sh.id]
  const avatar   = renderAvatar(sh.userId)
  const badge    = approved
    ? `<span class="rr-rn-approved-badge">${ICON.check} Approved</span>`
    : `<button type="button" class="rr-rn-sign-btn" data-action="sign-approve" data-sh-id="${escapeHtml(sh.id)}">
        Sign &amp; Approve
       </button>`

  return `
    <div class="rr-rn-stakeholder-row${approved ? " is-approved" : ""}">
      <div class="rr-rn-stakeholder-avatar">${avatar}</div>
      <div class="rr-rn-stakeholder-info">
        <span class="rr-rn-stakeholder-name">${escapeHtml(sh.name)}</span>
        <span class="rr-rn-stakeholder-role">${escapeHtml(sh.role)}</span>
      </div>
      <div class="rr-rn-stakeholder-action">${badge}</div>
    </div>
  `
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
  const modules = sprint.groups.flatMap(group => group.modules)
  if (!modules.length) {
    return `<p class="rr-rn-empty">${ICON.checkCircle} No released modules for this sprint.</p>`
  }

  const rows = modules.map((mod) => {
    const acceptanceLaws = `${mod.tasksComplete}/${mod.tasksTotal}`
    const unitTests = `${Number(mod.testPercent || 0).toFixed(2)}%`
    const updateDate = formatReleaseDateCell(mod.lastUpdate || sprint.releaseDate)
    return `
      <div class="rr-rn-overview-row">
        <span class="rr-rn-overview-row-title"><span class="rr-kb-module-label">${escapeHtml(mod.id)} - ${escapeHtml(mod.title)}</span></span>
        <span class="rr-rn-overview-row-laws">${escapeHtml(acceptanceLaws)}</span>
        <span class="rr-rn-overview-row-test" style="color:${pctColor(mod.testPercent)}">${escapeHtml(unitTests)}</span>
        <span class="rr-rn-overview-row-date">${escapeHtml(updateDate)}</span>
        <span class="rr-rn-overview-row-status"><span class="rr-rn-status-pill rr-rn-status-pill--released">Released</span></span>
      </div>
    `
  }).join("")

  return `
    <div class="rr-rn-overview-table">
      <div class="rr-rn-overview-head">
        <span class="rr-rn-overview-th rr-rn-overview-th--req">Requirements</span>
        <span class="rr-rn-overview-th">Acceptance Laws</span>
        <span class="rr-rn-overview-th">Unit tests</span>
        <span class="rr-rn-overview-th">Date</span>
        <span class="rr-rn-overview-th">Status</span>
      </div>
      <div class="rr-rn-overview-body">${rows}</div>
    </div>
  `
}

/* ── Issues log tab ─────────────────────────────────────────── */
function renderIssuesLogTab(issues, heading) {
  if (!issues.length) {
    return `<p class="rr-rn-empty">${ICON.checkCircle} No ${escapeHtml(heading)} issues reported for this sprint.</p>`
  }
  const rows = issues.map(issue => {
    const st = ISSUE_STATUS_CONFIG[issue.status] || ISSUE_STATUS_CONFIG["open"]
    return `
      <div class="rr-rn-issues-row">
        <span class="rr-rn-issues-id">${escapeHtml(issue.id)}</span>
        <span class="rr-rn-issues-title">${escapeHtml(issue.title)}</span>
        <span class="rr-rn-issues-reporter">${renderAvatar(issue.reporter)}</span>
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

const IMPLEMENTED_TASKS = {
  "sprint-12": {
    "AUT-M001": [
      { id: "T-101", title: "Build login form UI and validation states", owner: "u1", date: "07/02/26", status: "done" },
      { id: "T-102", title: "Add password masking and remember-me persistence", owner: "u3", date: "08/02/26", status: "done" },
      { id: "T-103", title: "Wire login API with inline error handling", owner: "u1", date: "09/02/26", status: "done" },
    ],
    "AUT-M002": [
      { id: "T-111", title: "Integrate OAuth callback flow for Google", owner: "u2", date: "10/02/26", status: "done" },
      { id: "T-112", title: "Implement token refresh and revocation handlers", owner: "u6", date: "11/02/26", status: "done" },
      { id: "T-113", title: "Add retry and failure paths for provider timeouts", owner: "u4", date: "12/02/26", status: "done" },
    ],
    "SET-001": [
      { id: "T-121", title: "Create profile detail editing sections", owner: "u5", date: "08/02/26", status: "done" },
      { id: "T-122", title: "Attach avatar upload with validation limits", owner: "u8", date: "09/02/26", status: "done" },
    ],
    "LOG-001": [
      { id: "T-131", title: "Harden login API response mapping", owner: "u4", date: "11/02/26", status: "done" },
      { id: "T-132", title: "Implement audit events for login attempts", owner: "u2", date: "12/02/26", status: "done" },
    ],
    "LOG-002": [
      { id: "T-141", title: "Implement session lifecycle state tracking", owner: "u6", date: "12/02/26", status: "done" },
      { id: "T-142", title: "Add fallback handling for expired provider tokens", owner: "u1", date: "13/02/26", status: "done" },
    ],
    "LOG-003": [
      { id: "T-151", title: "Build password recovery request and confirmation flow", owner: "u3", date: "12/02/26", status: "done" },
      { id: "T-152", title: "Add reset-token verification guards", owner: "u3", date: "13/02/26", status: "done" },
    ],
    "LOG-004": [
      { id: "T-161", title: "Implement session token renewal worker", owner: "u7", date: "13/02/26", status: "done" },
      { id: "T-162", title: "Add explicit logout token revocation path", owner: "u2", date: "14/02/26", status: "done" },
    ],
  },
  "sprint-11": {
    "ONB-001": [
      { id: "T-201", title: "Build multi-step onboarding wizard shell", owner: "u1", date: "24/01/26", status: "done" },
      { id: "T-202", title: "Connect onboarding step validations", owner: "u4", date: "25/01/26", status: "done" },
    ],
    "ONB-002": [
      { id: "T-211", title: "Implement KYC upload dropzone and progress", owner: "u7", date: "26/01/26", status: "done" },
      { id: "T-212", title: "Add file-type and size server validations", owner: "u7", date: "27/01/26", status: "done" },
    ],
    "DSH-001": [
      { id: "T-221", title: "Build dashboard summary cards and filters", owner: "u5", date: "28/01/26", status: "done" },
      { id: "T-222", title: "Implement KPI aggregation query", owner: "u2", date: "29/01/26", status: "done" },
    ],
  },
}

function renderImplementedTasksTab(sprint) {
  const sprintTasks = IMPLEMENTED_TASKS[sprint.id] || {}
  const moduleGroups = []

  for (const group of sprint.groups) {
    for (const module of group.modules) {
      const moduleTasks = sprintTasks[module.id] || []
      if (!moduleTasks.length) continue

      const taskRows = moduleTasks.map((task) => {
        const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG.done
        return `
          <div class="rr-rn-tasks-row rr-rn-tasks-row--grouped">
            <span class="rr-rn-tasks-cell rr-rn-tasks-cell--task">${escapeHtml(task.id)} - ${escapeHtml(task.title)}</span>
            <span class="rr-rn-tasks-cell rr-rn-tasks-cell--owner">${renderAvatar(task.owner)}</span>
            <span class="rr-rn-tasks-cell rr-rn-tasks-cell--date">${escapeHtml(formatReleaseDateCell(task.date))}</span>
            <span class="rr-rn-tasks-cell rr-rn-tasks-cell--status" style="background:${statusCfg.bg};color:${statusCfg.text}">${escapeHtml(statusCfg.label)}</span>
          </div>
        `
      }).join("")

      moduleGroups.push(`
        <section class="rr-rn-tasks-group">
          <div class="rr-rn-tasks-group-title"><span class="rr-kb-module-label">${escapeHtml(module.id)} - ${escapeHtml(module.title)}</span></div>
          <div class="rr-rn-tasks-table">
            <div class="rr-rn-tasks-thead rr-rn-tasks-thead--grouped">
              <span class="rr-rn-tasks-th rr-rn-tasks-th--task">Task</span>
              <span class="rr-rn-tasks-th rr-rn-tasks-th--owner">Owner</span>
              <span class="rr-rn-tasks-th rr-rn-tasks-th--date">Date</span>
              <span class="rr-rn-tasks-th rr-rn-tasks-th--status">Status</span>
            </div>
            <div class="rr-rn-tasks-tbody">${taskRows}</div>
          </div>
        </section>
      `)
    }
  }

  if (!moduleGroups.length) {
    return `<p class="rr-rn-empty">${ICON.checkCircle} No implemented tasks recorded for this sprint.</p>`
  }

  return `
    <div class="rr-rn-tasks-groups">${moduleGroups.join("")}</div>
  `
}

/* ── Finalized design tab ───────────────────────────────────── */
function renderFinalizedDesignTab(sprintId) {
  const items = FINALIZED_ITEMS[sprintId] || []
  if (!items.length) {
    return `<p class="rr-rn-empty">No finalized design items for this sprint.</p>`
  }
  const sorted = [...items].sort((a, b) =>
    state.sortDir === "desc"
      ? (PRIORITY_CONFIG[b.priority]?.weight ?? 0) - (PRIORITY_CONFIG[a.priority]?.weight ?? 0)
      : (PRIORITY_CONFIG[a.priority]?.weight ?? 0) - (PRIORITY_CONFIG[b.priority]?.weight ?? 0)
  )
  const rows = sorted.map(item => {
    const protoCell = item.protoRoute
      ? `<a href="${escapeHtml(item.protoRoute)}" class="rr-rn-design-link">${ICON.link}</a>`
      : `<span class="rr-rn-design-link rr-rn-design-link--disabled">${ICON.link}</span>`
    return `
      <div class="rr-rn-design-row">
        <span class="rr-rn-design-cell rr-rn-design-cell--req">
          <span class="rr-rn-design-title"><span class="rr-kb-module-label">${escapeHtml(item.id)} - ${escapeHtml(item.title)}</span></span>
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
          <button type="button" class="rr-rn-sort-btn" data-action="sort-priority">Priority ${sortIcon}</button>
        </span>
        <span class="rr-rn-design-th rr-rn-design-th--date">Date</span>
        <span class="rr-rn-design-th rr-rn-design-th--proto">Prototype</span>
      </div>
      <div class="rr-rn-design-tbody">${rows}</div>
    </div>
  `
}

/* ── Test coverage tab ──────────────────────────────────────── */
function renderTestCoverageTab() {
  const { summary, files } = TEST_COVERAGE
  const summaryRow = [
    { label: "Statements", ...summary.statements },
    { label: "Branches",   ...summary.branches   },
    { label: "Functions",  ...summary.functions  },
    { label: "Lines",      ...summary.lines      },
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
  const issues = ISSUES[sprint.id] || { prod: [] }
  const fixedProdIssues = (issues.prod || []).filter(issue =>
    issue.status === "resolved" || issue.status === "fixed" || issue.status === "closed"
  )
  switch (state.activeTab) {
    case "overview":           return renderOverviewTab(sprint)
    case "bug-fixing":         return renderIssuesLogTab(fixedProdIssues, "production bug fixing")
    case "implemented-tasks":  return renderImplementedTasksTab(sprint)
    case "finalized-design":   return renderFinalizedDesignTab(sprint.id)
    case "test-coverage":      return renderTestCoverageTab()
    default:                   return ""
  }
}

/* ── Card header ────────────────────────────────────────────── */
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
  els.approvalSection.innerHTML = renderApprovalSection()
  els.cardHeader.innerHTML      = renderCardHeader(sprint)
  els.tabNav.innerHTML          = renderTabNav(state.activeTab)
  els.tabContent.innerHTML      = renderTabContent(sprint)

  const sprintHeaderEl = document.getElementById("rr-tab-sprint-header")
  if (sprintHeaderEl) sprintHeaderEl.innerHTML = renderSprintHeader(sprint)
}

/* ═══════════════════════════════════════════════════════════════
   HTML SHELL
   ═══════════════════════════════════════════════════════════════ */
export function renderReleaseNotesFlow() {
  return `
    <section class="rr-rn rr-rn--stakeholder" data-flow="release-notes">
      <div class="rr-rn-body">
        <div id="rr-rn-approval-section"></div>
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
export function mountReleaseNotesFlow() {
  root = document.querySelector("[data-flow='release-notes']")
  if (!root) return

  els = {
    approvalSection: root.querySelector("#rr-rn-approval-section"),
    cardHeader:      root.querySelector("#rr-rn-card-header"),
    tabNav:          root.querySelector("#rr-rn-tab-nav"),
    tabContent:      root.querySelector("#rr-rn-tab-content"),
  }

  // Reset state for fresh mount
  state.activeTab          = "overview"
  state.sprintDropdownOpen = false
  state.sortDir            = "desc"
  state.approvals          = {}

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
    state.activeTab          = "overview"
    // Approvals are per-sprint-session — reset them
    state.approvals          = {}
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

  if (action === "sign-approve") {
    const shId = btn.dataset.shId
    if (shId && !state.approvals[shId]) {
      state.approvals[shId] = true
      render()
    }
    return
  }

  if (action === "download-pdf" || action === "download-xls") {
    const sprint = getSprint()
    const ext    = action === "download-pdf" ? "PDF" : "XLS"
    showToast(`${ext} export for Sprint ${sprint.number} would download here.`)
    return
  }
}

function handleKeydown(e) {
  if (e.key === "Escape" && state.sprintDropdownOpen) {
    state.sprintDropdownOpen = false
    render()
  }
}

function showToast(message) {
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
