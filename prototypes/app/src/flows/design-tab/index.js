/* ──────────────────────────────────────────────────────────────
   Design Tab — Prototype tracking per requirement
   Path: /design/tab
   Main view: flat list of requirements + design status
   Bottom:    collapsible "Ready for sprint" backlog section
   ────────────────────────────────────────────────────────────── */

/* ── Helpers ───────────────────────────────────────────────── */
function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── SVG icon set ──────────────────────────────────────────── */
const ICON = {
  caretDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDoubleUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,208 128,128 208,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  equals: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  arrowDown: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  link: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M144 80h32a40 40 0 0 1 0 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 0 1 0-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sun: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="56" stroke="currentColor" stroke-width="16"/><line x1="128" y1="24" x2="128" y2="56" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="128" y1="200" x2="128" y2="232" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="24" y1="128" x2="56" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="200" y1="128" x2="232" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="68" y1="68" x2="91" y2="91" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="165" y1="165" x2="188" y2="188" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="188" y1="68" x2="165" y2="91" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="68" y1="188" x2="91" y2="165" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  moon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M108 40C74 54 52 90 52 128c0 53 43 96 96 96 33 0 62-17 79-43-23 9-49 12-73 4C104 171 74 119 86 67c3-11 11-21 22-27z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  monitor: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><rect x="32" y="48" width="192" height="144" rx="16" stroke="currentColor" stroke-width="16"/><line x1="80" y1="232" x2="176" y2="232" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="128" y1="192" x2="128" y2="232" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  phone: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><rect x="64" y="16" width="128" height="224" rx="16" stroke="currentColor" stroke-width="16"/><line x1="108" y1="188" x2="148" y2="188" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><line x1="128" y1="120" x2="128" y2="176" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="88" r="10" fill="currentColor"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="56" y1="56" x2="200" y2="200" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="184" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,112 128,184 200,112" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="40" y1="216" x2="216" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  chat: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M216 48H40a8 8 0 0 0-8 8v160l48-40h136a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  send: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M222 128L42 42l46 86-46 86Z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="88" y1="128" x2="222" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
}

/* ── Team members ──────────────────────────────────────────── */
const TEAM = [
  { id: "u1", name: "Olivia Rhye",    initials: "OR", color: "#c7b9da", img: "https://i.pravatar.cc/48?img=1"  },
  { id: "u2", name: "Candice Wu",     initials: "CW", color: "#a2a8cd", img: "https://i.pravatar.cc/48?img=5"  },
  { id: "u3", name: "Orlando Diggs",  initials: "OD", color: "#cfc3a7", img: "https://i.pravatar.cc/48?img=12" },
  { id: "u4", name: "Demi Wilkinson", initials: "DW", color: "#dbc0dd", img: "https://i.pravatar.cc/48?img=9"  },
  { id: "u5", name: "Drew Cano",      initials: "DC", color: "#d1dfc3", img: "https://i.pravatar.cc/48?img=8"  },
  { id: "u6", name: "Phoenix Baker",  initials: "PB", color: "#cfc3a7", img: "https://i.pravatar.cc/48?img=3"  },
  { id: "u7", name: "Nat Craig",      initials: "NC", color: "#c3b5d1", img: "https://i.pravatar.cc/48?img=16" },
  { id: "u8", name: "Lana Steiner",   initials: "LS", color: "#d4b5ad", img: "https://i.pravatar.cc/48?img=25" },
]

/* ── Status config ─────────────────────────────────────────── */
const STATUS_CONFIG = {
  "to-do":             { label: "To do",             bg: "#e0e2e7", text: "#3d4350" },
  "in-progress":       { label: "In progress",       bg: "#daebff", text: "#0067da" },
  "ready-for-review":  { label: "Ready for review",  bg: "#fff3cd", text: "#856404" },
  "approved":          { label: "Approved",          bg: "#ddf7eb", text: "#0e9255" },
  "ready-for-sprint":  { label: "Ready for sprint",  bg: "#ddf7eb", text: "#0e9255" },
}

/* ── Priority config ───────────────────────────────────────── */
const PRIORITY_CONFIG = {
  urgent: { icon: "caretDoubleUp", label: "Urgent", color: "#c0362d" },
  high:   { icon: "caretUp",       label: "High",   color: "#d13245" },
  medium: { icon: "equals",        label: "Medium", color: "#e7a600" },
  low:    { icon: "caretDown",     label: "Low",    color: "#0067da" },
}

/* ── Module names ──────────────────────────────────────────── */
const MODULE_NAMES = {
  LOG: "Login & Auth",
  ONB: "Onboarding",
  TRA: "Transactions",
  DSH: "Dashboard",
  PAY: "Payment",
  SET: "Account Settings",
  KYC: "Verification",
  REP: "Reports",
  NTF: "Notifications",
  NAV: "Navigation",
  AUT: "Authentication",
  NOT: "Notification Centre",
  USR: "User Profile",
  WLT: "Wallet",
  CAR: "Card Management",
}

/* ── Main list — requirements with design statuses ─────────── */
// Status lifecycle:
//   to-do            → no prototype link, nothing happens on click
//   in-progress      → may have link, clicking shows empty state (prototype not ready)
//   ready-for-review → has link (will navigate in next iteration)
//   approved         → customer-approved, has link
const MAIN_ITEMS = [
  { id: "LOG005", title: "User password recovery",       priority: "high",   lastUpdate: "07/02/26", assignees: ["u1", "u2"], status: "in-progress",      hasLink: true  },
  { id: "ONB004", title: "Merchant onboarding",          priority: "high",   lastUpdate: "08/02/26", assignees: ["u6"],        status: "in-progress",      hasLink: false },
  { id: "TRA003", title: "Transaction side panel",       priority: "high",   lastUpdate: "07/02/26", assignees: [],            status: "to-do",            hasLink: false },
  { id: "TRA004", title: "Transaction details view",     priority: "medium", lastUpdate: "12/02/26", assignees: ["u3"],        status: "to-do",            hasLink: false },
  { id: "DSH001", title: "Dashboard overview",           priority: "urgent", lastUpdate: "14/02/26", assignees: ["u5", "u7"],  status: "in-progress",      hasLink: true  },
  { id: "PAY002", title: "Payment confirmation screen",  priority: "high",   lastUpdate: "10/02/26", assignees: ["u2", "u8"],  status: "in-progress",      hasLink: false },
  { id: "SET003", title: "Account settings page",        priority: "low",    lastUpdate: "05/02/26", assignees: ["u4"],        status: "to-do",            hasLink: false },
  { id: "KYC001", title: "KYC document upload",          priority: "urgent", lastUpdate: "15/02/26", assignees: ["u7"],        status: "ready-for-review", hasLink: true  },
  { id: "REP002", title: "Reports & analytics layout",   priority: "medium", lastUpdate: "11/02/26", assignees: ["u5"],        status: "ready-for-review", hasLink: true  },
  { id: "NTF003", title: "Transaction notifications",    priority: "low",    lastUpdate: "09/02/26", assignees: ["u3", "u1"],  status: "ready-for-review", hasLink: true  },
  { id: "NAV001", title: "Side navigation redesign",     priority: "high",   lastUpdate: "18/02/26", assignees: ["u1", "u6"],  status: "approved",         hasLink: true  },
  { id: "AUT003", title: "Signup flow v2",               priority: "urgent", lastUpdate: "17/02/26", assignees: ["u8", "u3"],  status: "approved",         hasLink: true  },
  { id: "NOT001", title: "Notification centre",          priority: "medium", lastUpdate: "16/02/26", assignees: ["u7"],        status: "approved",         hasLink: true  },
  { id: "USR006", title: "User profile card",            priority: "low",    lastUpdate: "13/02/26", assignees: ["u2"],        status: "approved",         hasLink: true  },
]

/* ── Ready for sprint backlog section ──────────────────────── */
// Separate items in the backlog, all "ready-for-sprint" status.
// These are requirements whose design is complete and ready for sprint selection.
const SPRINT_BACKLOG_ITEMS = [
  { id: "WLT001", title: "Wallet overview screen",       priority: "high",   lastUpdate: "20/02/26", assignees: [],            status: "ready-for-sprint", hasLink: true },
  { id: "ONB005", title: "Business onboarding v2",       priority: "urgent", lastUpdate: "19/02/26", assignees: [],            status: "ready-for-sprint", hasLink: true },
  { id: "TRA006", title: "Transaction receipt detail",   priority: "low",    lastUpdate: "21/02/26", assignees: [],            status: "ready-for-sprint", hasLink: true },
  { id: "DSH002", title: "Dashboard widget library",     priority: "medium", lastUpdate: "18/02/26", assignees: [],            status: "ready-for-sprint", hasLink: true },
  { id: "CAR001", title: "Card management screen",       priority: "high",   lastUpdate: "22/02/26", assignees: [],            status: "ready-for-sprint", hasLink: true },
]

/* ── Prototype metadata — for viewer info panel ────────────── */
const PROTO_META = {
  "LOG005": { epic: "LOG - Login & Auth",        module: "LOG005 - Password recovery",    source: "prototypes/LOG005/password-recovery.html",  type: "HTML", version: "v1.2" },
  "DSH001": { epic: "DSH - Dashboard",           module: "DSH001 - Dashboard overview",   source: "prototypes/DSH001/overview.html",            type: "HTML", version: "v0.4" },
  "KYC001": { epic: "KYC - Verification",        module: "KYC001 - Document upload",      source: "prototypes/KYC001/document-upload.html",     type: "HTML", version: "v1.0" },
  "REP002": { epic: "REP - Reports",             module: "REP002 - Analytics layout",     source: "prototypes/REP002/analytics.html",           type: "HTML", version: "v0.9" },
  "NTF003": { epic: "NTF - Notifications",       module: "NTF003 - Tx notifications",     source: "prototypes/NTF003/notifications.html",       type: "HTML", version: "v0.6" },
  "NAV001": { epic: "NAV - Navigation",          module: "NAV001 - Side nav redesign",    source: "prototypes/NAV001/sidebar.html",             type: "HTML", version: "v2.0" },
  "AUT003": { epic: "AUT - Authentication",      module: "AUT003 - Signup flow v2",       source: "prototypes/AUT003/signup.html",              type: "HTML", version: "v2.1" },
  "NOT001": { epic: "NOT - Notifications",       module: "NOT001 - Notification centre",  source: "prototypes/NOT001/notifications.html",       type: "HTML", version: "v1.3" },
  "USR006": { epic: "USR - User Profile",        module: "USR006 - Profile card",         source: "prototypes/USR006/profile-card.html",        type: "HTML", version: "v1.0" },
  "WLT001": { epic: "WLT - Wallet",             module: "WLT001 - Wallet overview",       source: "prototypes/WLT001/wallet.html",              type: "HTML", version: "v1.4" },
  "ONB005": { epic: "ONB - Onboarding",          module: "ONB005 - Business onboarding",  source: "prototypes/ONB005/onboarding.html",          type: "HTML", version: "v2.0" },
  "TRA006": { epic: "TRA - Transactions",        module: "TRA006 - Receipt detail",       source: "prototypes/TRA006/receipt.html",             type: "HTML", version: "v0.8" },
  "DSH002": { epic: "DSH - Dashboard",           module: "DSH002 - Widget library",       source: "prototypes/DSH002/widgets.html",             type: "HTML", version: "v0.3" },
  "CAR001": { epic: "CAR - Card Management",     module: "CAR001 - Card management",      source: "prototypes/CAR001/card-mgmt.html",           type: "HTML", version: "v1.1" },
}

function findItem(id) {
  return [...MAIN_ITEMS, ...SPRINT_BACKLOG_ITEMS].find(i => i.id === id)
}

function getModuleCode(itemId) {
  return String(itemId || "").replace(/[0-9-].*$/, "") || "UNKNOWN"
}

function getAllItems() {
  return [...MAIN_ITEMS, ...SPRINT_BACKLOG_ITEMS]
}

function renderFilterDropdown(filterId, options, selectedValues, isOpen) {
  if (!isOpen) return ""

  return `
    <div class="rr-kb-filter-dropdown" data-dropdown="${escapeHtml(filterId)}">
      ${options.map(opt => {
        const isSelected = selectedValues.includes(opt.value)
        return `
          <button type="button" class="rr-kb-filter-option ${isSelected ? "is-selected" : ""}"
                  data-action="toggle-filter-option" data-filter="${escapeHtml(filterId)}" data-value="${escapeHtml(opt.value)}">
            <span class="rr-kb-filter-check">${isSelected ? ICON.check : ""}</span>
            ${opt.dot ? `<span class="rr-kb-filter-dot" style="background:${opt.dot}"></span>` : ""}
            <span>${escapeHtml(opt.label)}</span>
          </button>
        `
      }).join("")}
      <div class="rr-kb-filter-actions">
        <button type="button" class="rr-kb-filter-clear" data-action="clear-filter" data-filter="${escapeHtml(filterId)}">Clear</button>
      </div>
    </div>
  `
}

function getFilterOptions() {
  const all = getAllItems()

  const modules = [...new Set(all.map(item => getModuleCode(item.id)))].sort()
    .map(code => ({ value: code, label: MODULE_NAMES[code] ? `${code} — ${MODULE_NAMES[code]}` : code }))

  const priorities = [...new Set(all.map(item => item.priority))]
    .map(value => ({ value, label: PRIORITY_CONFIG[value]?.label || value, dot: PRIORITY_CONFIG[value]?.color }))

  const assigneeIds = [...new Set(all.flatMap(item => item.assignees))]
  const assignees = assigneeIds
    .map(uid => TEAM.find(member => member.id === uid))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(member => ({ value: member.id, label: member.name }))

  const statuses = [...new Set(all.map(item => item.status))]
    .map(value => ({ value, label: STATUS_CONFIG[value]?.label || value, dot: STATUS_CONFIG[value]?.bg }))

  return { modules, priorities, assignees, statuses }
}

function renderFilterBar(state) {
  const opts = getFilterOptions()
  const filterDefs = [
    { id: "modules", label: "All modules", options: opts.modules, selected: state.filters.modules },
    { id: "priority", label: "All priority", options: opts.priorities, selected: state.filters.priority },
    { id: "assignees", label: "All assignees", options: opts.assignees, selected: state.filters.assignees },
    { id: "statuses", label: "All statuses", options: opts.statuses, selected: state.filters.statuses },
  ]

  const buttons = filterDefs.map(filter => {
    const activeCount = filter.selected.length
    const displayLabel = activeCount > 0 ? `${filter.label.replace("All ", "")} (${activeCount})` : filter.label
    const isOpen = state.openFilter === filter.id
    return `
      <span class="rr-kb-filter-anchor">
        <button type="button" class="rr-kb-filter-btn ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-active" : ""}"
                data-action="toggle-filter" data-filter="${escapeHtml(filter.id)}">
          ${escapeHtml(displayLabel)} ${ICON.caretDown}
        </button>
        ${renderFilterDropdown(filter.id, filter.options, filter.selected, isOpen)}
      </span>
    `
  }).join("")

  return `
    <div class="rr-kb-filters">
      <div class="rr-kb-filter-buttons">${buttons}</div>
      <div class="rr-kb-search-wrap">
        <button type="button" class="rr-dt-download-btn" data-action="download-design" title="Download all designs">
          ${ICON.download}
        </button>
        <div class="rr-kb-search">
          ${ICON.search}
          <input type="search" class="rr-kb-search-input" id="rr-dt-search" value="${escapeHtml(state.searchQuery)}" placeholder="Search" />
        </div>
      </div>
    </div>
  `
}

function applyFilters(items, state) {
  const query = String(state.searchQuery || "").trim().toLowerCase()

  return items.filter(item => {
    const assigneeIds = resolveAssigneeIds(item, state)
    const moduleCode = getModuleCode(item.id)

    if (state.filters.modules.length && !state.filters.modules.includes(moduleCode)) return false
    if (state.filters.priority.length && !state.filters.priority.includes(item.priority)) return false
    if (state.filters.statuses.length && !state.filters.statuses.includes(item.status)) return false
    if (state.filters.assignees.length && !assigneeIds.some(uid => state.filters.assignees.includes(uid))) return false

    if (!query) return true

    const assigneeNames = assigneeIds
      .map(uid => TEAM.find(member => member.id === uid)?.name || "")
      .join(" ")
      .toLowerCase()

    const statusLabel = (STATUS_CONFIG[item.status]?.label || item.status).toLowerCase()

    return (
      item.id.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      moduleCode.toLowerCase().includes(query) ||
      assigneeNames.includes(query) ||
      statusLabel.includes(query)
    )
  })
}

/* ── Render helpers ────────────────────────────────────────── */
function renderAvatar(userId) {
  const user = TEAM.find(t => t.id === userId)
  if (!user) return ""
  return `
    <span class="rr-dt-avatar" style="background:${user.color}" title="${escapeHtml(user.name)}">
      <img src="${user.img}" alt="${escapeHtml(user.initials)}" class="rr-dt-avatar-img" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <span class="rr-dt-avatar-fallback">${escapeHtml(user.initials)}</span>
    </span>
  `
}

function renderAvatarGroup(assigneeIds) {
  const visible = assigneeIds.slice(0, 3)
  return `<span class="rr-dt-avatar-group">${visible.map(renderAvatar).join("")}</span>`
}

function renderAssigneePicker(itemId, selectedAssigneeIds) {
  const selectedSet = new Set(selectedAssigneeIds)
  return `
    <div class="rr-roadmap-member-picker rr-dt-assignee-picker" role="listbox" aria-label="Select assignee">
      ${TEAM.map(member => {
        const selected = selectedSet.has(member.id)
        return `
          <button type="button"
                  class="rr-roadmap-member-picker-item"
                  data-action="select-assignee"
                  data-item-id="${escapeHtml(itemId)}"
                  data-user-id="${escapeHtml(member.id)}"
                  aria-selected="${selected ? "true" : "false"}">
            ${renderAvatar(member.id)}
            <span class="rr-roadmap-member-picker-name">${escapeHtml(member.name)}</span>
          </button>
        `
      }).join("")}
    </div>
  `
}

function resolveAssigneeIds(item, state) {
  return state.assigneeOverrides[item.id] ?? item.assignees
}

function renderAssigneeCell(item, state) {
  if (item.status === "ready-for-sprint") {
    return `<span class="rr-dt-assignee-empty" aria-label="No assignee"></span>`
  }

  const assigneeIds = resolveAssigneeIds(item, state)
  if (assigneeIds.length > 0) {
    return renderAvatarGroup(assigneeIds)
  }

  const pickerOpen = state.openAssigneePickerId === item.id
  return `
    <span class="rr-dt-assignee-wrap">
      <button type="button"
              class="rr-roadmap-avatar-add rr-dt-assignee-add"
              data-action="toggle-assignee-picker"
              data-item-id="${escapeHtml(item.id)}"
              aria-label="Add assignee"
              aria-expanded="${pickerOpen ? "true" : "false"}"
              aria-haspopup="listbox">
        <span>+</span>
      </button>
      ${pickerOpen ? renderAssigneePicker(item.id, assigneeIds) : ""}
    </span>
  `
}

function renderPriority(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `
    <span class="rr-dt-priority">
      <span class="rr-dt-priority-icon" style="color:${cfg.color}">${ICON[cfg.icon]}</span>
      <span class="rr-dt-priority-label">${escapeHtml(cfg.label)}</span>
    </span>
  `
}

function renderStatusBadge(status) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["to-do"]
  return `<span class="rr-dt-status-badge" style="background:${cfg.bg};color:${cfg.text}">${escapeHtml(cfg.label)}</span>`
}

function renderLinkCell(item) {
  if (!item.hasLink) {
    /* To do: no link, no action */
    return `<span class="rr-dt-link-cell"></span>`
  }

  /* In progress: link icon shows "empty state" on click (prototype not ready yet) */
  /* Ready for review / Approved / Ready for sprint: link will navigate in next iteration */
  return `
    <span class="rr-dt-link-cell">
      <button type="button" class="rr-dt-link-btn" data-action="open-prototype"
              data-item-id="${escapeHtml(item.id)}" data-status="${escapeHtml(item.status)}"
              aria-label="Open prototype for ${escapeHtml(item.id)}">
        ${ICON.link}
      </button>
    </span>
  `
}

function renderRow(item, state) {
  return `
    <div class="rr-dt-row">
      <span class="rr-dt-cell rr-dt-cell--req">
        <span class="rr-dt-req-text">${escapeHtml(item.id)} - ${escapeHtml(item.title)}</span>
      </span>
      <span class="rr-dt-cell rr-dt-cell--priority">${renderPriority(item.priority)}</span>
      <span class="rr-dt-cell rr-dt-cell--date">${escapeHtml(item.lastUpdate)}</span>
      <span class="rr-dt-cell rr-dt-cell--assignee">${renderAssigneeCell(item, state)}</span>
      <span class="rr-dt-cell rr-dt-cell--proto">${renderLinkCell(item)}</span>
      <span class="rr-dt-cell rr-dt-cell--status">${renderStatusBadge(item.status)}</span>
    </div>
  `
}

function renderTableHeader(sortCol, sortDir) {
  const cols = [
    { key: "req",      label: "Requirements", sortable: true  },
    { key: "priority", label: "Priority",     sortable: true  },
    { key: "date",     label: "Last update",  sortable: true  },
    { key: "assignee", label: "Assignee",     sortable: false },
    { key: "proto",    label: "Prototype",    sortable: false },
    { key: "status",   label: "Status",       sortable: false },
  ]

  const cells = cols.map(col => {
    if (!col.sortable) {
      return `<span class="rr-dt-th rr-dt-th--${col.key}">${escapeHtml(col.label)}</span>`
    }
    const isActive = sortCol === col.key
    const icon = isActive && sortDir === "asc" ? ICON.arrowDown : ICON.arrowDown
    return `
      <span class="rr-dt-th rr-dt-th--${col.key}">
        <button type="button" class="rr-dt-sort-btn ${isActive ? "is-active" : ""}"
                data-action="sort" data-sort="${escapeHtml(col.key)}">
          ${escapeHtml(col.label)} ${icon}
        </button>
      </span>
    `
  }).join("")

  return `<div class="rr-dt-thead">${cells}</div>`
}

function sortItems(items, sortCol, sortDir) {
  const dir = sortDir === "asc" ? 1 : -1
  return [...items].sort((a, b) => {
    if (sortCol === "priority") {
      const order = { urgent: 4, high: 3, medium: 2, low: 1 }
      return ((order[a.priority] ?? 0) - (order[b.priority] ?? 0)) * dir
    }
    if (sortCol === "date") {
      const parse = d => d.split("/").reverse().join("")
      return parse(a.lastUpdate).localeCompare(parse(b.lastUpdate)) * dir
    }
    if (sortCol === "status") {
      const order = ["to-do", "in-progress", "ready-for-review", "approved", "ready-for-sprint"]
      return (order.indexOf(a.status) - order.indexOf(b.status)) * dir
    }
    /* Default: sort by id/req */
    return a.id.localeCompare(b.id) * dir
  })
}

/* ── Prototype viewer overlay ──────────────────────────────── */
function renderWireframe(device, theme) {
  const dark = theme === "dark"
  if (device === "mobile") {
    return `
      <div class="rr-pv-wf rr-pv-wf--mobile${dark ? " rr-pv-wf--dark" : ""}">
        <div class="rr-pv-wf-m-header">
          <div class="rr-pv-wf-m-title"></div>
          <div class="rr-pv-wf-m-avatar"></div>
        </div>
        <div class="rr-pv-wf-m-banner"></div>
        <div class="rr-pv-wf-m-list">
          ${[...Array(5)].map(() => `<div class="rr-pv-wf-m-row"></div>`).join("")}
        </div>
        <div class="rr-pv-wf-m-tabs">
          <div class="rr-pv-wf-m-tab rr-pv-wf-m-tab--active"></div>
          <div class="rr-pv-wf-m-tab"></div>
          <div class="rr-pv-wf-m-tab"></div>
          <div class="rr-pv-wf-m-tab"></div>
        </div>
      </div>
    `
  }
  return `
    <div class="rr-pv-wf rr-pv-wf--desktop${dark ? " rr-pv-wf--dark" : ""}">
      <div class="rr-pv-wf-sidebar">
        <div class="rr-pv-wf-logo"></div>
        <div class="rr-pv-wf-nav">
          <div class="rr-pv-wf-nav-item rr-pv-wf-nav-item--active"></div>
          <div class="rr-pv-wf-nav-item"></div>
          <div class="rr-pv-wf-nav-item"></div>
          <div class="rr-pv-wf-nav-item"></div>
          <div class="rr-pv-wf-nav-item"></div>
        </div>
      </div>
      <div class="rr-pv-wf-main">
        <div class="rr-pv-wf-banner">
          <div class="rr-pv-wf-banner-title"></div>
          <div class="rr-pv-wf-banner-stats">
            <div class="rr-pv-wf-stat"></div>
            <div class="rr-pv-wf-stat"></div>
            <div class="rr-pv-wf-stat"></div>
          </div>
        </div>
        <div class="rr-pv-wf-toolbar">
          <div class="rr-pv-wf-search"></div>
          <div class="rr-pv-wf-toolbar-btns">
            <div class="rr-pv-wf-btn"></div>
            <div class="rr-pv-wf-btn"></div>
          </div>
        </div>
        <div class="rr-pv-wf-table">
          <div class="rr-pv-wf-thead"></div>
          ${[...Array(7)].map((_, i) => `<div class="rr-pv-wf-trow${i % 2 === 0 ? " rr-pv-wf-trow--alt" : ""}"></div>`).join("")}
        </div>
      </div>
    </div>
  `
}

function renderInfoPanel(item, infoOpen) {
  const meta = PROTO_META[item.id] || { epic: "—", module: item.id, source: `prototypes/${item.id}/prototype.html`, type: "HTML", version: "—" }
  return `
    <aside class="rr-pv-info${infoOpen ? "" : " rr-pv-info--closed"}">
      <div class="rr-pv-info-header">
        <span class="rr-pv-info-source">${escapeHtml(meta.source)}</span>
        <button type="button" class="rr-pv-icon-btn" data-action="toggle-viewer-info" title="Close info">${ICON.close}</button>
      </div>
      <dl class="rr-pv-info-body">
        <div class="rr-pv-info-row"><dt>Epic</dt><dd>${escapeHtml(meta.epic)}</dd></div>
        <div class="rr-pv-info-row"><dt>Module</dt><dd>${escapeHtml(meta.module)}</dd></div>
        <div class="rr-pv-info-row"><dt>Title</dt><dd>${escapeHtml(item.title)}</dd></div>
        <div class="rr-pv-info-row"><dt>Source</dt><dd>${escapeHtml(meta.source)}</dd></div>
        <div class="rr-pv-info-row"><dt>Type</dt><dd>${escapeHtml(meta.type)}</dd></div>
        <div class="rr-pv-info-row"><dt>Last update</dt><dd>${escapeHtml(item.lastUpdate)}</dd></div>
        <div class="rr-pv-info-row"><dt>Version</dt><dd>${escapeHtml(meta.version)}</dd></div>
      </dl>
    </aside>
  `
}

function renderCommentItem(comment) {
  return `
    <div class="rr-pv-comment">
      <div class="rr-pv-comment-avatar">${escapeHtml(String(comment.author || "?")[0].toUpperCase())}</div>
      <div class="rr-pv-comment-content">
        <div class="rr-pv-comment-meta">
          <span class="rr-pv-comment-author">${escapeHtml(comment.author)}</span>
          <span class="rr-pv-comment-time">${escapeHtml(comment.time)}</span>
        </div>
        <p class="rr-pv-comment-text">${escapeHtml(comment.text)}</p>
      </div>
    </div>
  `
}

function renderCommentsList(comments) {
  if (!comments.length) return `<p class="rr-pv-comments-empty">No comments yet.</p>`
  return comments.map(renderCommentItem).join("")
}

function renderCommentsPanel(viewer) {
  return `
    <aside class="rr-pv-comments${viewer.commentsOpen ? "" : " rr-pv-comments--closed"}">
      <div class="rr-pv-info-header">
        <span class="rr-pv-info-source">Comments (${viewer.comments.length})</span>
        <button type="button" class="rr-pv-icon-btn" data-action="toggle-viewer-comments" title="Close comments">${ICON.close}</button>
      </div>
      <div class="rr-pv-comments-list">
        ${renderCommentsList(viewer.comments)}
      </div>
      <div class="rr-pv-comments-footer">
        <textarea class="rr-pv-comments-input" placeholder="Leave a comment…" rows="2"></textarea>
        <button type="button" class="rr-pv-comments-send" data-action="submit-comment" title="Send">${ICON.send}</button>
      </div>
    </aside>
  `
}

function renderViewerOverlay(viewer) {
  const item = findItem(viewer.id)
  if (!item) return ""
  const meta = PROTO_META[item.id] || {}
  const sourcePath = meta.source || `prototypes/${item.id}/prototype.html`

  return `
    <div class="rr-pv-overlay">
      <header class="rr-pv-header">
        <span class="rr-pv-path">${escapeHtml(sourcePath)}</span>
        <div class="rr-pv-controls">
          <div class="rr-pv-btn-group" role="group" aria-label="Theme">
            <button type="button" class="rr-pv-toggle-btn${viewer.theme === "light" ? " is-active" : ""}"
                    data-action="viewer-theme" data-value="light" title="Light mode">${ICON.sun}</button>
            <button type="button" class="rr-pv-toggle-btn${viewer.theme === "dark" ? " is-active" : ""}"
                    data-action="viewer-theme" data-value="dark" title="Dark mode">${ICON.moon}</button>
          </div>
          <div class="rr-pv-btn-group" role="group" aria-label="Device">
            <button type="button" class="rr-pv-toggle-btn${viewer.device === "desktop" ? " is-active" : ""}"
                    data-action="viewer-device" data-value="desktop" title="Desktop">${ICON.monitor}</button>
            <button type="button" class="rr-pv-toggle-btn${viewer.device === "mobile" ? " is-active" : ""}"
                    data-action="viewer-device" data-value="mobile" title="Mobile">${ICON.phone}</button>
          </div>
          <button type="button" class="rr-pv-icon-btn${viewer.infoOpen ? " is-active" : ""}"
                  data-action="toggle-viewer-info" title="Info &amp; details">${ICON.info}</button>
          <button type="button" class="rr-pv-icon-btn${viewer.commentsOpen ? " is-active" : ""}"
                  data-action="toggle-viewer-comments" title="Comments">${ICON.chat}</button>
          <button type="button" class="rr-pv-icon-btn" data-action="close-viewer" title="Close">${ICON.close}</button>
        </div>
      </header>
      <div class="rr-pv-body">
        <div class="rr-pv-canvas${viewer.device === "mobile" ? " rr-pv-canvas--mobile" : ""}">
          ${renderWireframe(viewer.device, viewer.theme)}
        </div>
        ${renderInfoPanel(item, viewer.infoOpen)}
        ${renderCommentsPanel(viewer)}
      </div>
    </div>
  `
}

function renderToast(message) {
  return `<div class="rr-dt-toast" role="status" aria-live="polite">${escapeHtml(message)}</div>`
}

/* ── Main render ───────────────────────────────────────────── */
function buildView(state) {
  const sortedMain = sortItems(applyFilters(MAIN_ITEMS, state), state.sortCol, state.sortDir)
  const sortedSprint = sortItems(applyFilters(SPRINT_BACKLOG_ITEMS, state), state.sortCol, state.sortDir)

  const emptyMsg = state.searchQuery
    ? `No results matching "${escapeHtml(state.searchQuery)}".`
    : "No requirements match the current filters."

  const mainRows = sortedMain.length
    ? sortedMain.map(item => renderRow(item, state)).join("")
    : `<p class="rr-kb-empty">${emptyMsg}</p>`

  const sprintRows = sortedSprint.length
    ? sortedSprint.map(item => renderRow(item, state)).join("")
    : `<p class="rr-kb-empty">${emptyMsg}</p>`

  const sprintExpanded = !state.sprintCollapsed
  const sprintCount = SPRINT_BACKLOG_ITEMS.length
  const caretIcon = sprintExpanded ? ICON.caretDown : ICON.caretRight

  const sprintSection = `
    <div class="rr-dt-sprint-group">
      <button type="button" class="rr-dt-sprint-toggle" data-action="toggle-sprint"
              aria-expanded="${String(sprintExpanded)}" aria-controls="rr-dt-sprint-rows">
        <span class="rr-dt-sprint-caret">${caretIcon}</span>
        <span class="rr-dt-sprint-label">Ready for sprint (${sprintCount})</span>
      </button>
      ${sprintExpanded ? `
        <div id="rr-dt-sprint-rows" class="rr-dt-sprint-rows">
          <div class="rr-dt-table">
            ${renderTableHeader(state.sortCol, state.sortDir)}
            <div class="rr-dt-tbody">${sprintRows}</div>
          </div>
        </div>
      ` : ""}
    </div>
  `

  const viewerOverlay = state.viewer ? renderViewerOverlay(state.viewer) : ""
  const toast = state.showDownloadToast ? renderToast("Designs downloaded successfully") : ""

  return `
    <div class="rr-dt-body">
      ${renderFilterBar(state)}
      <div class="rr-dt-table">
        ${renderTableHeader(state.sortCol, state.sortDir)}
        <div class="rr-dt-tbody" id="rr-dt-main-rows">${mainRows}</div>
      </div>
      ${sprintSection}
    </div>
    ${viewerOverlay}
    ${toast}
  `
}

/* ── Export ────────────────────────────────────────────────── */
export async function renderDesignTabFlow() {
  return `<section class="rr-dt" data-flow="design-tab"></section>`
}

export function mountDesignTabFlow() {
  const root = document.querySelector('[data-flow="design-tab"]')
  if (!root) return undefined

  const container = root

  const state = {
    sortCol: "req",
    sortDir: "asc",
    searchQuery: "",
    openFilter: null,
    openAssigneePickerId: null,
    assigneeOverrides: {},
    filters: {
      modules: [],
      priority: [],
      assignees: [],
      statuses: [],
    },
    sprintCollapsed: false,
    showDownloadToast: false,
    viewer: null, // { id, theme, device, infoOpen, commentsOpen, comments }
  }

  function render() {
    container.innerHTML = buildView(state)
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]")
    if (!target) {
      if (state.openFilter || state.openAssigneePickerId) {
        state.openFilter = null
        state.openAssigneePickerId = null
        render()
      }
      return
    }

    const action = target.dataset.action

    if (
      state.openAssigneePickerId &&
      action !== "toggle-assignee-picker" &&
      action !== "select-assignee"
    ) {
      state.openAssigneePickerId = null
    }

    if (action === "toggle-filter") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      state.openFilter = state.openFilter === filterId ? null : filterId
      render()
      return
    }

    if (action === "toggle-filter-option") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      const value = target.dataset.value
      const values = state.filters[filterId]
      const idx = values.indexOf(value)
      if (idx >= 0) values.splice(idx, 1)
      else values.push(value)
      render()
      return
    }

    if (action === "clear-filter") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      state.filters[filterId] = []
      state.openFilter = null
      render()
      return
    }

    if (action === "toggle-assignee-picker") {
      event.stopPropagation()
      const itemId = target.dataset.itemId
      state.openAssigneePickerId = state.openAssigneePickerId === itemId ? null : itemId
      state.openFilter = null
      render()
      return
    }

    if (action === "select-assignee") {
      event.stopPropagation()
      const itemId = target.dataset.itemId
      const userId = target.dataset.userId
      const item = findItem(itemId)
      if (!item || item.status === "ready-for-sprint") return
      state.assigneeOverrides[itemId] = userId ? [userId] : []
      state.openAssigneePickerId = null
      render()
      return
    }

    if (action === "sort") {
      const col = target.dataset.sort
      if (state.sortCol === col) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc"
      } else {
        state.sortCol = col
        state.sortDir = "asc"
      }
      render()
      return
    }

    if (action === "toggle-sprint") {
      state.sprintCollapsed = !state.sprintCollapsed
      render()
      return
    }

    if (action === "open-prototype") {
      const itemId = target.dataset.itemId
      state.viewer = {
        id: itemId,
        theme: "light",
        device: "desktop",
        infoOpen: false,
        commentsOpen: false,
        comments: [
          { author: "Candice Wu",    text: "Header spacing needs more top padding on mobile.", time: "09:12" },
          { author: "Orlando Diggs", text: "LGTM from my side. Minor note on the CTA button colour.", time: "11:30" },
        ],
      }
      render()
      return
    }

    if (action === "close-viewer") {
      state.viewer = null
      render()
      return
    }

    if (action === "viewer-theme") {
      if (!state.viewer || state.viewer.theme === target.dataset.value) return
      state.viewer.theme = target.dataset.value
      container.querySelectorAll("[data-action='viewer-theme']").forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.value === state.viewer.theme)
      })
      const canvas = container.querySelector(".rr-pv-canvas")
      if (canvas) canvas.innerHTML = renderWireframe(state.viewer.device, state.viewer.theme)
      return
    }

    if (action === "viewer-device") {
      if (!state.viewer || state.viewer.device === target.dataset.value) return
      state.viewer.device = target.dataset.value
      container.querySelectorAll("[data-action='viewer-device']").forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.value === state.viewer.device)
      })
      const canvas = container.querySelector(".rr-pv-canvas")
      if (canvas) {
        canvas.className = `rr-pv-canvas${state.viewer.device === "mobile" ? " rr-pv-canvas--mobile" : ""}`
        canvas.innerHTML = renderWireframe(state.viewer.device, state.viewer.theme)
      }
      return
    }

    if (action === "toggle-viewer-info") {
      if (!state.viewer) return
      state.viewer.infoOpen = !state.viewer.infoOpen
      const infoEl = container.querySelector(".rr-pv-info")
      if (infoEl) {
        infoEl.classList.toggle("rr-pv-info--closed", !state.viewer.infoOpen)
        container.querySelector("[data-action='toggle-viewer-info'][title='Info & details']")
          ?.classList.toggle("is-active", state.viewer.infoOpen)
      }
      return
    }

    if (action === "download-design") {
      if (state.showDownloadToast) return
      state.showDownloadToast = true
      render()
      setTimeout(() => { state.showDownloadToast = false; render() }, 3000)
      return
    }

    if (action === "toggle-viewer-comments") {
      if (!state.viewer) return
      state.viewer.commentsOpen = !state.viewer.commentsOpen
      const commentsEl = container.querySelector(".rr-pv-comments")
      if (commentsEl) {
        commentsEl.classList.toggle("rr-pv-comments--closed", !state.viewer.commentsOpen)
        container.querySelector(".rr-pv-controls [data-action='toggle-viewer-comments']")
          ?.classList.toggle("is-active", state.viewer.commentsOpen)
      }
      return
    }

    if (action === "submit-comment") {
      if (!state.viewer) return
      const textarea = container.querySelector(".rr-pv-comments-input")
      const text = (textarea?.value || "").trim()
      if (!text) return
      state.viewer.comments.push({ author: "You", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
      const listEl = container.querySelector(".rr-pv-comments-list")
      if (listEl) listEl.innerHTML = renderCommentsList(state.viewer.comments)
      const countEl = container.querySelector(".rr-pv-comments .rr-pv-info-source")
      if (countEl) countEl.textContent = `Comments (${state.viewer.comments.length})`
      if (textarea) { textarea.value = ""; textarea.focus() }
      return
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && (state.openFilter || state.openAssigneePickerId)) {
      state.openFilter = null
      state.openAssigneePickerId = null
      render()
      return
    }

    if (event.key === "Escape" && state.viewer) {
      state.viewer = null
      render()
    }
  }

  function handleInput(event) {
    if (event.target.id === "rr-dt-search") {
      state.searchQuery = event.target.value || ""
      render()
      const searchInput = root.querySelector("#rr-dt-search")
      if (searchInput) {
        searchInput.focus()
        searchInput.setSelectionRange(state.searchQuery.length, state.searchQuery.length)
      }
    }
  }

  /* No backdrop-click close — the viewer fills the screen, close button is explicit */
  function handleOverlayClick(_event) {}

  root.addEventListener("click", handleClick)
  root.addEventListener("click", handleOverlayClick)
  root.addEventListener("input", handleInput)
  root.addEventListener("keydown", handleKeyDown)

  render()

  return function unmount() {
    root.removeEventListener("click", handleClick)
    root.removeEventListener("click", handleOverlayClick)
    root.removeEventListener("input", handleInput)
    root.removeEventListener("keydown", handleKeyDown)
  }
}
