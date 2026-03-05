/* ──────────────────────────────────────────────────────────────
   Kanban / Sprint Planning Module — Prototype flow
   Matches Figma "Desktop - Modules" (304:49110)
   ────────────────────────────────────────────────────────────── */

/* ── SVG icons (Phosphor-style) ───────────────────────────── */
const ICON = {
  caretDown: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretUp: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="216" x2="128" y2="40" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,112 128,40 200,112" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  equals: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  arrowDownSmall: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="128" y1="56" x2="128" y2="200" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="72,144 128,200 184,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  prohibit: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><line x1="60" y1="196" x2="196" y2="60" stroke="currentColor" stroke-width="16"/></svg>`,
  flagCheckered: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40 168c32-24 64 24 96 0s64-24 96 0V48c-32 24-64-24-96 0s-64 24-96 0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockHistory: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="128,80 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDoubleUp: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,208 128,128 208,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="64" y1="64" x2="192" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="192" y1="64" x2="64" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
}

/* ── Helpers ───────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── Avatar image placeholders (realistic photos via pravatar) ── */
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

/* ── Sprint data (expanded with more modules & statuses) ── */
const SPRINTS = [
  {
    id: "sprint-13",
    number: 13,
    startDate: "14/02",
    endDate: "28/02",
    status: "active",
    groups: [
      {
        id: "LOG",
        label: "LOG - Login",
        modules: [
          {
            id: "LOG-001",
            title: "User login",
            priority: "high",
            assignees: ["u4", "u2", "u5"],
            overflowCount: 2,
            lastUpdate: "13.02.2026",
            tasksComplete: 12,
            tasksTotal: 16,
            testPercent: 60,
            status: "merged-qa",
            blocker: false,
          },
          {
            id: "LOG-002",
            title: "User authentication process",
            priority: "medium",
            assignees: ["u6", "u1"],
            overflowCount: 0,
            lastUpdate: "13.02.2026",
            tasksComplete: 9,
            tasksTotal: 11,
            testPercent: 80,
            status: "in-progress",
            blocker: true,
          },
          {
            id: "LOG-003",
            title: "Password recovery flow",
            priority: "low",
            assignees: ["u3"],
            overflowCount: 0,
            lastUpdate: "12.02.2026",
            tasksComplete: 2,
            tasksTotal: 7,
            testPercent: 15,
            status: "to-do",
            blocker: false,
          },
          {
            id: "LOG-004",
            title: "Session token renewal",
            priority: "medium",
            assignees: ["u7", "u2"],
            overflowCount: 0,
            lastUpdate: "14.02.2026",
            tasksComplete: 5,
            tasksTotal: 5,
            testPercent: 100,
            status: "review",
            blocker: false,
          },
        ],
      },
      {
        id: "TEM",
        label: "TEM - Managing teams",
        modules: [
          {
            id: "TEM-001",
            title: "Team creation wizard",
            priority: "high",
            assignees: ["u4", "u2", "u5"],
            overflowCount: 2,
            lastUpdate: "13.02.2026",
            tasksComplete: 3,
            tasksTotal: 3,
            testPercent: 100,
            status: "in-progress",
            blocker: false,
          },
          {
            id: "TEM-002",
            title: "Team member roles",
            priority: "medium",
            assignees: ["u1", "u8"],
            overflowCount: 0,
            lastUpdate: "14.02.2026",
            tasksComplete: 6,
            tasksTotal: 9,
            testPercent: 45,
            status: "validating",
            blocker: false,
          },
          {
            id: "TEM-003",
            title: "Team settings page",
            priority: "low",
            assignees: ["u3", "u6"],
            overflowCount: 0,
            lastUpdate: "11.02.2026",
            tasksComplete: 0,
            tasksTotal: 4,
            testPercent: 0,
            status: "blocked",
            blocker: true,
          },
        ],
      },
      {
        id: "REQ",
        label: "REQ - Requirements",
        modules: [
          {
            id: "REQ-001",
            title: "Module CRUD operations",
            priority: "high",
            assignees: ["u1", "u4", "u7"],
            overflowCount: 1,
            lastUpdate: "15.02.2026",
            tasksComplete: 10,
            tasksTotal: 10,
            testPercent: 100,
            status: "done",
            blocker: false,
          },
          {
            id: "REQ-002",
            title: "Acceptance law validation",
            priority: "high",
            assignees: ["u2", "u5"],
            overflowCount: 0,
            lastUpdate: "14.02.2026",
            tasksComplete: 7,
            tasksTotal: 12,
            testPercent: 55,
            status: "in-progress",
            blocker: false,
          },
          {
            id: "REQ-003",
            title: "Dependency graph view",
            priority: "medium",
            assignees: ["u8"],
            overflowCount: 0,
            lastUpdate: "13.02.2026",
            tasksComplete: 1,
            tasksTotal: 8,
            testPercent: 10,
            status: "to-do",
            blocker: false,
          },
        ],
      },
      {
        id: "DEP",
        label: "DEP - Dependencies",
        modules: [
          {
            id: "DEP-001",
            title: "Dependency tree renderer",
            priority: "high",
            assignees: ["u6", "u3", "u1"],
            overflowCount: 0,
            lastUpdate: "15.02.2026",
            tasksComplete: 4,
            tasksTotal: 6,
            testPercent: 50,
            status: "review",
            blocker: false,
          },
          {
            id: "DEP-002",
            title: "Circular dependency detection",
            priority: "medium",
            assignees: ["u7"],
            overflowCount: 0,
            lastUpdate: "12.02.2026",
            tasksComplete: 0,
            tasksTotal: 3,
            testPercent: 0,
            status: "to-do",
            blocker: false,
          },
        ],
      },
    ],
  },
  {
    id: "sprint-12",
    number: 12,
    startDate: "31/01",
    endDate: "13/02",
    status: "closed",
    groups: [
      {
        id: "AUT",
        label: "AUT - Authentication",
        modules: [
          {
            id: "AUT-M001",
            title: "Login form",
            priority: "high",
            assignees: ["u1", "u3"],
            overflowCount: 0,
            lastUpdate: "10.02.2026",
            tasksComplete: 8,
            tasksTotal: 8,
            testPercent: 100,
            status: "done",
            blocker: false,
          },
          {
            id: "AUT-M002",
            title: "OAuth integration",
            priority: "medium",
            assignees: ["u2", "u4", "u6"],
            overflowCount: 0,
            lastUpdate: "12.02.2026",
            tasksComplete: 6,
            tasksTotal: 6,
            testPercent: 100,
            status: "done",
            blocker: false,
          },
        ],
      },
      {
        id: "SET",
        label: "SET - Settings",
        modules: [
          {
            id: "SET-001",
            title: "User profile page",
            priority: "low",
            assignees: ["u5", "u8"],
            overflowCount: 0,
            lastUpdate: "08.02.2026",
            tasksComplete: 5,
            tasksTotal: 5,
            testPercent: 100,
            status: "done",
            blocker: false,
          },
        ],
      },
    ],
  },
  {
    id: "sprint-14",
    number: 14,
    startDate: "01/03",
    endDate: "14/03",
    status: "planned",
    groups: [],
  },
]

/* ── Status colour mapping ─────────────────────────────────── */
const STATUS_CONFIG = {
  "to-do":       { label: "To do",        bg: "#e0e2e7", text: "#3d4350" },
  "in-progress": { label: "In progress",  bg: "#daebff", text: "#0067da" },
  "merged-qa":   { label: "Merged-QA",    bg: "#fbc6cd", text: "#d13245" },
  "done":        { label: "Done",         bg: "#d4f5e3", text: "#0e9255" },
  "review":      { label: "Review",       bg: "#fff3cd", text: "#856404" },
  "validating":  { label: "Validating",   bg: "#f6edfd", text: "#9b5bce" },
  "blocked":     { label: "Blocked",      bg: "#fef2f1", text: "#c0362d" },
}

/* Priority with Figma-matching colours */
const PRIORITY_CONFIG = {
  urgent: { icon: "caretDoubleUp",  label: "Urgent", color: "#c0362d", weight: 4 },
  high:   { icon: "caretUp",        label: "High",   color: "#d13245", weight: 3 },
  medium: { icon: "equals",         label: "Medium", color: "#e7a600", weight: 2 },
  low:    { icon: "arrowDownSmall", label: "Low",    color: "#0067da", weight: 1 },
}

/* ── Rendering helpers ────────────────────────────────────── */
function renderPriorityCell(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `
    <span class="rr-kb-priority" style="color:${cfg.color}">
      ${ICON[cfg.icon]}
      <span>${escapeHtml(cfg.label)}</span>
    </span>
  `
}

function renderAvatarGroup(assigneeIds, overflowCount) {
  const visible = assigneeIds.slice(0, 3).map(id => TEAM.find(t => t.id === id)).filter(Boolean)
  let html = visible.map(u => `
    <span class="rr-kb-avatar" style="background:${u.color}" title="${escapeHtml(u.name)}">
      <img src="${u.img}" alt="${escapeHtml(u.initials)}" class="rr-kb-avatar-img" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"  />
      <span class="rr-kb-avatar-fallback">${escapeHtml(u.initials)}</span>
    </span>
  `).join("")
  if (overflowCount > 0) {
    html += `<span class="rr-kb-avatar rr-kb-avatar--overflow">+${overflowCount}</span>`
  }
  return `<span class="rr-kb-avatar-group">${html}</span>`
}

function renderProgressBar(percent) {
  const barColor = percent >= 100 ? "#0e9255" : "#667085"
  return `
    <span class="rr-kb-progress">
      <span class="rr-kb-progress-track">
        <span class="rr-kb-progress-fill" style="width:${percent}%;background:${barColor}"></span>
      </span>
      <span class="rr-kb-progress-label">${percent}%</span>
    </span>
  `
}

function renderStatusBadge(status) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["to-do"]
  return `<span class="rr-kb-status" style="background:${cfg.bg};color:${cfg.text}">${escapeHtml(cfg.label)}</span>`
}

function renderBlockerIcon() {
  return `<span class="rr-kb-blocker" title="Blocker">${ICON.prohibit}</span>`
}

/* ── Filter dropdown ──────────────────────────────────────── */
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

/* ── Build filter options from current sprint data ────────── */
function getFilterOptions(sprint) {
  const modules = []
  const priorities = []
  const assignees = []
  const statuses = []

  for (const grp of sprint.groups) {
    if (!modules.find(m => m.value === grp.id)) {
      modules.push({ value: grp.id, label: grp.label })
    }
    for (const mod of grp.modules) {
      if (!priorities.find(p => p.value === mod.priority)) {
        const cfg = PRIORITY_CONFIG[mod.priority]
        priorities.push({ value: mod.priority, label: cfg.label, dot: cfg.color })
      }
      for (const uid of mod.assignees) {
        if (!assignees.find(a => a.value === uid)) {
          const user = TEAM.find(t => t.id === uid)
          if (user) assignees.push({ value: uid, label: user.name })
        }
      }
      if (!statuses.find(s => s.value === mod.status)) {
        const cfg = STATUS_CONFIG[mod.status]
        statuses.push({ value: mod.status, label: cfg.label, dot: cfg.bg })
      }
    }
  }
  return { modules, priorities, assignees, statuses }
}

/* ── Filter bar ───────────────────────────────────────────── */
function renderFilterBar(state, sprint) {
  const opts = getFilterOptions(sprint)
  const filterDefs = [
    { id: "modules",   label: "All modules",   options: opts.modules,    selected: state.filters.modules },
    { id: "priority",  label: "All priority",   options: opts.priorities, selected: state.filters.priority },
    { id: "assignees", label: "All assignees",  options: opts.assignees,  selected: state.filters.assignees },
    { id: "statuses",  label: "All statuses",   options: opts.statuses,   selected: state.filters.statuses },
  ]

  const buttons = filterDefs.map(f => {
    const activeCount = f.selected.length
    const displayLabel = activeCount > 0 ? `${f.label.replace("All ", "")} (${activeCount})` : f.label
    const isOpen = state.openFilter === f.id
    return `
      <span class="rr-kb-filter-anchor">
        <button type="button" class="rr-kb-filter-btn ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-active" : ""}"
                data-action="toggle-filter" data-filter="${f.id}">
          ${escapeHtml(displayLabel)} ${ICON.caretDown}
        </button>
        ${renderFilterDropdown(f.id, f.options, f.selected, isOpen)}
      </span>
    `
  }).join("")

  return `
    <div class="rr-kb-filters">
      <div class="rr-kb-filter-buttons">${buttons}</div>
      <div class="rr-kb-search-wrap">
        <div class="rr-kb-search">
          ${ICON.search}
          <input type="search" class="rr-kb-search-input" id="rr-kb-search" placeholder="Search" />
        </div>
      </div>
    </div>
  `
}

/* ── Sprint selector (rendered inside tab-header-actions) ── */
function renderSprintSelector(activeSprint) {
  const dotColor = activeSprint.status === "active" ? "#0e9255"
    : activeSprint.status === "closed" ? "#667085" : "#0067da"
  return `
    <span class="rr-kb-sprint-dates">Sprint dates: ${escapeHtml(activeSprint.startDate)} – ${escapeHtml(activeSprint.endDate)}</span>
    <button type="button" class="rr-kb-sprint-btn" data-action="toggle-sprint-dropdown">
      <span class="rr-kb-sprint-dot" style="background:${dotColor}"></span>
      <span>Sprint ${activeSprint.number}</span>
      ${ICON.caretDown}
    </button>
    <button type="button" class="rr-kb-sprint-history-btn" data-action="sprint-history" title="Sprint history">
      ${ICON.clockHistory}
    </button>
  `
}

/* ── Table header ─────────────────────────────────────────── */
function renderTableHeader(state) {
  const cols = [
    { key: "req",      label: "Requirements", sortable: false },
    { key: "priority", label: "Priority",     sortable: true  },
    { key: "assignee", label: "Assignee",     sortable: false },
    { key: "update",   label: "Last update",  sortable: true  },
    { key: "tasks",    label: "Tasks",        sortable: true  },
    { key: "tests",    label: "Unit tests",   sortable: false },
    { key: "status",   label: "Status",       sortable: true  },
  ]
  const ths = cols.map(col => {
    if (!col.sortable) {
      return `<span class="rr-kb-th rr-kb-th--${col.key}">${col.label}</span>`
    }
    const isActive = state.sortCol === col.key
    const icon = isActive ? (state.sortDir === "asc" ? ICON.arrowUp : ICON.arrowDown) : ICON.arrowDown
    return `
      <span class="rr-kb-th rr-kb-th--${col.key}">
        <button type="button" class="rr-kb-sort-btn ${isActive ? "is-active" : ""}" data-action="sort" data-sort="${col.key}">
          ${col.label} ${icon}
        </button>
      </span>
    `
  }).join("")
  return `<div class="rr-kb-thead">${ths}</div>`
}

/* ── Table rows ───────────────────────────────────────────── */
function renderGroupRow(group, isCollapsed) {
  const caretIcon = isCollapsed ? ICON.caretRight : ICON.caretDown
  return `
    <div class="rr-kb-row rr-kb-row--group" data-action="toggle-group" data-group-id="${escapeHtml(group.id)}" role="button" tabindex="0">
      <span class="rr-kb-cell rr-kb-cell--req">
        <span class="rr-kb-expand-icon">${caretIcon}</span>
        <span class="rr-kb-group-label">${escapeHtml(group.label)}</span>
      </span>
      <span class="rr-kb-cell rr-kb-cell--priority"></span>
      <span class="rr-kb-cell rr-kb-cell--assignee"></span>
      <span class="rr-kb-cell rr-kb-cell--update"></span>
      <span class="rr-kb-cell rr-kb-cell--tasks"></span>
      <span class="rr-kb-cell rr-kb-cell--tests"></span>
      <span class="rr-kb-cell rr-kb-cell--status"></span>
    </div>
  `
}

function renderModuleRow(mod) {
  return `
    <div class="rr-kb-row rr-kb-row--module" data-action="open-detail" data-module-id="${escapeHtml(mod.id)}" role="button" tabindex="0">
      <span class="rr-kb-cell rr-kb-cell--req rr-kb-cell--indent">
        <span class="rr-kb-module-label">${escapeHtml(mod.id)} - ${escapeHtml(mod.title)}</span>
        ${mod.blocker ? renderBlockerIcon() : ""}
      </span>
      <span class="rr-kb-cell rr-kb-cell--priority">${renderPriorityCell(mod.priority)}</span>
      <span class="rr-kb-cell rr-kb-cell--assignee">${renderAvatarGroup(mod.assignees, mod.overflowCount)}</span>
      <span class="rr-kb-cell rr-kb-cell--update">${escapeHtml(mod.lastUpdate)}</span>
      <span class="rr-kb-cell rr-kb-cell--tasks">${mod.tasksComplete}/${mod.tasksTotal}</span>
      <span class="rr-kb-cell rr-kb-cell--tests">${renderProgressBar(mod.testPercent)}</span>
      <span class="rr-kb-cell rr-kb-cell--status">${renderStatusBadge(mod.status)}</span>
    </div>
  `
}

/* ── Sorting helper ───────────────────────────────────────── */
function sortModules(modules, sortCol, sortDir) {
  if (!sortCol) return modules
  const sorted = [...modules]
  const dir = sortDir === "asc" ? 1 : -1
  sorted.sort((a, b) => {
    let va, vb
    switch (sortCol) {
      case "priority":
        va = (PRIORITY_CONFIG[a.priority]?.weight ?? 0)
        vb = (PRIORITY_CONFIG[b.priority]?.weight ?? 0)
        return (va - vb) * dir
      case "update":
        va = a.lastUpdate.split(".").reverse().join("")
        vb = b.lastUpdate.split(".").reverse().join("")
        return va.localeCompare(vb) * dir
      case "tasks":
        va = a.tasksTotal === 0 ? 0 : a.tasksComplete / a.tasksTotal
        vb = b.tasksTotal === 0 ? 0 : b.tasksComplete / b.tasksTotal
        return (va - vb) * dir
      case "status": {
        const order = ["to-do","in-progress","review","validating","merged-qa","done","blocked"]
        va = order.indexOf(a.status)
        vb = order.indexOf(b.status)
        return (va - vb) * dir
      }
      default:
        return 0
    }
  })
  return sorted
}

/* ── Apply filters ────────────────────────────────────────── */
function applyFilters(groups, state) {
  let result = groups

  if (state.filters.modules.length) {
    result = result.filter(g => state.filters.modules.includes(g.id))
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase()
    result = result.map(g => {
      const groupMatches = g.label.toLowerCase().includes(q)
      const matchingModules = g.modules.filter(m =>
        m.id.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        g.label.toLowerCase().includes(q)
      )
      if (!groupMatches && matchingModules.length === 0) return null
      return { ...g, modules: matchingModules.length ? matchingModules : g.modules }
    }).filter(Boolean)
  }

  if (state.filters.priority.length) {
    result = result.map(g => {
      const filtered = g.modules.filter(m => state.filters.priority.includes(m.priority))
      if (!filtered.length) return null
      return { ...g, modules: filtered }
    }).filter(Boolean)
  }

  if (state.filters.assignees.length) {
    result = result.map(g => {
      const filtered = g.modules.filter(m => m.assignees.some(a => state.filters.assignees.includes(a)))
      if (!filtered.length) return null
      return { ...g, modules: filtered }
    }).filter(Boolean)
  }

  if (state.filters.statuses.length) {
    result = result.map(g => {
      const filtered = g.modules.filter(m => state.filters.statuses.includes(m.status))
      if (!filtered.length) return null
      return { ...g, modules: filtered }
    }).filter(Boolean)
  }

  if (state.sortCol) {
    result = result.map(g => ({
      ...g,
      modules: sortModules(g.modules, state.sortCol, state.sortDir),
    }))
  }

  return result
}

function renderSprintTable(sprint, state) {
  if (!sprint.groups.length) {
    return `<p class="rr-kb-empty">No modules assigned to this sprint yet.</p>`
  }

  const filteredGroups = applyFilters(sprint.groups, state)

  if (!filteredGroups.length) {
    const msg = state.searchQuery
      ? `No results matching "${escapeHtml(state.searchQuery)}".`
      : "No modules match the current filters."
    return `<p class="rr-kb-empty">${msg}</p>`
  }

  const rows = filteredGroups.map(group => {
    const isCollapsed = state.collapsedGroups.has(group.id)
    const groupRow = renderGroupRow(group, isCollapsed)
    const moduleRows = isCollapsed ? "" : group.modules.map(renderModuleRow).join("")
    return groupRow + moduleRows
  }).join("")

  return `
    ${renderTableHeader(state)}
    <div class="rr-kb-tbody">${rows}</div>
  `
}

/* ── Close Sprint button ─────────────────────────────────── */
function renderCloseSprintButton(sprint) {
  if (sprint.status !== "active") return ""
  return `
    <button type="button" class="rr-kb-close-sprint-btn" data-action="close-sprint">
      ${ICON.flagCheckered}
      <span>Close Sprint</span>
    </button>
  `
}

/* ═══════════════════════════════════════════════════════════════
   DETAIL PANEL — Module detail overlay
   Matches Figma 382:43742
   ═══════════════════════════════════════════════════════════════ */

/* ── Detail panel status config (extended) ─────────────────── */
const DETAIL_STATUS_CONFIG = {
  ...STATUS_CONFIG,
  "paused":            { label: "Paused",           bg: "#f0f1f3", text: "#3d4350" },
  "ready-for-review":  { label: "Ready for review", bg: "#fff3cd", text: "#856404" },
}

/* ── Detail panel tab definitions ──────────────────────────── */
const DETAIL_TABS = [
  { id: "overview",      label: "Overview" },
  { id: "dependencies",  label: "Dependencies" },
  { id: "tasks",         label: "Tasks" },
  { id: "test-cases",    label: "Test Cases" },
  { id: "uat-issues",    label: "UAT Issues" },
  { id: "docs",          label: "Docs" },
]

/* ── Mock task data per module ─────────────────────────────── */
function getModuleTasks(moduleId) {
  const taskDb = {
    "LOG-001": {
      features: [
        {
          id: "AUT-001-F01",
          title: "Login form",
          tasks: [
            { id: "T-001", title: "Create login form UI component", priority: "high", assignees: ["u4", "u2"], dueDate: "20.02.2026", status: "done" },
            { id: "T-002", title: "Add email validation logic", priority: "medium", assignees: ["u5"], dueDate: "21.02.2026", status: "done" },
            { id: "T-003", title: "Implement password strength check", priority: "medium", assignees: ["u2"], dueDate: "22.02.2026", status: "in-progress" },
            { id: "T-004", title: "Add remember me functionality", priority: "low", assignees: ["u4"], dueDate: "23.02.2026", status: "ready-for-review" },
            { id: "T-005", title: "Error state handling", priority: "high", assignees: ["u5", "u2"], dueDate: "24.02.2026", status: "in-progress" },
            { id: "T-006", title: "Loading state & spinner", priority: "low", assignees: ["u4"], dueDate: "24.02.2026", status: "to-do" },
          ],
        },
        {
          id: "AUT-001-F02",
          title: "Password reset",
          tasks: [
            { id: "T-007", title: "Reset password email template", priority: "urgent", assignees: ["u2"], dueDate: "18.02.2026", status: "done" },
            { id: "T-008", title: "Token generation & validation", priority: "high", assignees: ["u5", "u4"], dueDate: "19.02.2026", status: "done" },
            { id: "T-009", title: "New password form & validation", priority: "medium", assignees: ["u2"], dueDate: "20.02.2026", status: "paused" },
            { id: "T-010", title: "Rate limiting for reset requests", priority: "high", assignees: ["u4"], dueDate: "21.02.2026", status: "in-progress" },
            { id: "T-011", title: "Success confirmation page", priority: "low", assignees: ["u5"], dueDate: "22.02.2026", status: "to-do" },
            { id: "T-012", title: "Email delivery retry mechanism", priority: "medium", assignees: ["u2", "u4"], dueDate: "23.02.2026", status: "to-do" },
          ],
        },
      ],
    },
    "LOG-002": {
      features: [
        {
          id: "AUT-002-F01",
          title: "Session management",
          tasks: [
            { id: "T-013", title: "JWT token service", priority: "high", assignees: ["u6", "u1"], dueDate: "18.02.2026", status: "done" },
            { id: "T-014", title: "Refresh token rotation", priority: "urgent", assignees: ["u1"], dueDate: "19.02.2026", status: "done" },
            { id: "T-015", title: "Session timeout handler", priority: "medium", assignees: ["u6"], dueDate: "20.02.2026", status: "in-progress" },
            { id: "T-016", title: "Multi-device session tracking", priority: "low", assignees: ["u1"], dueDate: "22.02.2026", status: "to-do" },
          ],
        },
        {
          id: "AUT-002-F02",
          title: "OAuth providers",
          tasks: [
            { id: "T-017", title: "Google OAuth integration", priority: "high", assignees: ["u6"], dueDate: "20.02.2026", status: "done" },
            { id: "T-018", title: "GitHub OAuth integration", priority: "medium", assignees: ["u1", "u6"], dueDate: "21.02.2026", status: "in-progress" },
            { id: "T-019", title: "Microsoft OAuth integration", priority: "low", assignees: ["u1"], dueDate: "23.02.2026", status: "to-do" },
            { id: "T-020", title: "OAuth callback error handling", priority: "high", assignees: ["u6"], dueDate: "22.02.2026", status: "ready-for-review" },
            { id: "T-021", title: "Account linking flow", priority: "medium", assignees: ["u1"], dueDate: "24.02.2026", status: "to-do" },
          ],
        },
      ],
    },
  }

  // If no specific tasks, generate generic ones
  if (taskDb[moduleId]) return taskDb[moduleId]

  return {
    features: [
      {
        id: `${moduleId}-F01`,
        title: "Core implementation",
        tasks: [
          { id: `${moduleId}-T1`, title: "Set up project scaffolding", priority: "high", assignees: ["u1", "u3"], dueDate: "20.02.2026", status: "done" },
          { id: `${moduleId}-T2`, title: "Implement main logic", priority: "high", assignees: ["u3"], dueDate: "22.02.2026", status: "in-progress" },
          { id: `${moduleId}-T3`, title: "Add error handling", priority: "medium", assignees: ["u1"], dueDate: "24.02.2026", status: "to-do" },
          { id: `${moduleId}-T4`, title: "Write unit tests", priority: "medium", assignees: ["u3", "u1"], dueDate: "25.02.2026", status: "to-do" },
        ],
      },
      {
        id: `${moduleId}-F02`,
        title: "UI & integration",
        tasks: [
          { id: `${moduleId}-T5`, title: "Build UI components", priority: "high", assignees: ["u2"], dueDate: "21.02.2026", status: "in-progress" },
          { id: `${moduleId}-T6`, title: "API integration", priority: "medium", assignees: ["u2", "u5"], dueDate: "23.02.2026", status: "to-do" },
          { id: `${moduleId}-T7`, title: "Accessibility review", priority: "low", assignees: ["u5"], dueDate: "26.02.2026", status: "to-do" },
        ],
      },
    ],
  }
}

/* ── Detail panel: compute progress ────────────────────────── */
function computeDetailProgress(moduleData) {
  let done = 0, total = 0
  for (const feature of moduleData.features) {
    for (const task of feature.tasks) {
      total++
      if (task.status === "done" || task.status === "merged-qa") done++
    }
  }
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

/* ── Detail panel: render modal header ─────────────────────── */
function renderDetailHeader(mod) {
  return `
    <div class="rr-detail-header">
      <p class="rr-detail-title">${escapeHtml(mod.id)} - ${escapeHtml(mod.title)}</p>
      <button type="button" class="rr-detail-close" data-action="close-detail" title="Close">
        ${ICON.close}
      </button>
    </div>
  `
}

/* ── Detail panel: render tab navigation ───────────────────── */
function renderDetailNav(activeTab, progressPercent) {
  const tabs = DETAIL_TABS.map(tab => {
    const isActive = tab.id === activeTab
    return `
      <button type="button"
        class="rr-detail-tab ${isActive ? "is-active" : ""}"
        data-action="detail-tab" data-tab="${tab.id}">
        ${escapeHtml(tab.label)}
      </button>
    `
  }).join("")

  const barColor = progressPercent >= 100 ? "#0e9255" : "#667085"
  return `
    <div class="rr-detail-nav">
      <div class="rr-detail-tabs">${tabs}</div>
      <div class="rr-detail-progress-wrap">
        <span class="rr-detail-progress-track">
          <span class="rr-detail-progress-fill" style="width:${progressPercent}%;background:${barColor}"></span>
        </span>
        <span class="rr-detail-progress-label">${progressPercent}%</span>
      </div>
    </div>
  `
}

/* ── Detail panel: render task priority ────────────────────── */
function renderDetailPriority(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `
    <span class="rr-kb-priority" style="color:${cfg.color}">
      ${ICON[cfg.icon]}
      <span>${escapeHtml(cfg.label)}</span>
    </span>
  `
}

/* ── Detail panel: render task status badge ────────────────── */
function renderDetailStatus(status) {
  const cfg = DETAIL_STATUS_CONFIG[status] || DETAIL_STATUS_CONFIG["to-do"]
  return `<span class="rr-kb-status" style="background:${cfg.bg};color:${cfg.text}">${escapeHtml(cfg.label)}</span>`
}

/* ── Detail panel: Tasks tab content ───────────────────────── */
function renderDetailTasksTab(moduleData, collapsedFeatures) {
  const ths = `
    <div class="rr-detail-thead">
      <span class="rr-detail-th rr-detail-th--task">Task</span>
      <span class="rr-detail-th rr-detail-th--priority">
        <button type="button" class="rr-kb-sort-btn is-active" data-action="noop">
          Priority ${ICON.arrowDown}
        </button>
      </span>
      <span class="rr-detail-th rr-detail-th--assignee">Assignee</span>
      <span class="rr-detail-th rr-detail-th--due">Due Date</span>
      <span class="rr-detail-th rr-detail-th--status">Status</span>
    </div>
  `

  const rows = moduleData.features.map(feature => {
    const isCollapsed = collapsedFeatures.has(feature.id)
    const caretIcon = isCollapsed ? ICON.caretRight : ICON.caretDown
    const featureRow = `
      <div class="rr-detail-row rr-detail-row--feature" data-action="toggle-detail-feature" data-feature-id="${escapeHtml(feature.id)}" role="button" tabindex="0">
        <span class="rr-detail-cell rr-detail-cell--task">
          <span class="rr-kb-expand-icon">${caretIcon}</span>
          <span class="rr-detail-feature-label">${escapeHtml(feature.id)} - ${escapeHtml(feature.title)}</span>
        </span>
        <span class="rr-detail-cell rr-detail-cell--priority"></span>
        <span class="rr-detail-cell rr-detail-cell--assignee"></span>
        <span class="rr-detail-cell rr-detail-cell--due"></span>
        <span class="rr-detail-cell rr-detail-cell--status"></span>
      </div>
    `
    if (isCollapsed) return featureRow

    const taskRows = feature.tasks.map(task => `
      <div class="rr-detail-row rr-detail-row--task">
        <span class="rr-detail-cell rr-detail-cell--task rr-detail-cell--indent">
          <span class="rr-detail-task-label">${escapeHtml(task.title)}</span>
        </span>
        <span class="rr-detail-cell rr-detail-cell--priority">${renderDetailPriority(task.priority)}</span>
        <span class="rr-detail-cell rr-detail-cell--assignee">${renderAvatarGroup(task.assignees, 0)}</span>
        <span class="rr-detail-cell rr-detail-cell--due">${escapeHtml(task.dueDate)}</span>
        <span class="rr-detail-cell rr-detail-cell--status">${renderDetailStatus(task.status)}</span>
      </div>
    `).join("")

    return featureRow + taskRows
  }).join("")

  return `
    <div class="rr-detail-table">
      ${ths}
      <div class="rr-detail-tbody">${rows}</div>
    </div>
  `
}

/* ── Detail panel: placeholder tab content ─────────────────── */
function renderDetailTabContent(tabId, mod, moduleData, collapsedFeatures) {
  if (tabId === "tasks") return renderDetailTasksTab(moduleData, collapsedFeatures)

  const placeholders = {
    overview: {
      title: "Module Overview",
      description: "High-level summary, acceptance criteria and module metadata.",
      items: [
        { label: "Module ID", value: mod.id },
        { label: "Title", value: mod.title },
        { label: "Priority", value: PRIORITY_CONFIG[mod.priority]?.label || mod.priority },
        { label: "Status", value: STATUS_CONFIG[mod.status]?.label || mod.status },
        { label: "Tasks Progress", value: `${mod.tasksComplete}/${mod.tasksTotal}` },
        { label: "Test Coverage", value: `${mod.testPercent}%` },
        { label: "Last Update", value: mod.lastUpdate },
      ],
    },
    dependencies: {
      title: "Dependencies",
      description: "Upstream and downstream module dependencies.",
      items: [
        { label: "Upstream", value: "No upstream dependencies defined" },
        { label: "Downstream", value: "No downstream dependencies defined" },
        { label: "External", value: "None" },
      ],
    },
    "test-cases": {
      title: "Test Cases",
      description: "Unit, integration and E2E test cases linked to this module.",
      items: [
        { label: "Total Test Cases", value: "—" },
        { label: "Passing", value: "—" },
        { label: "Failing", value: "—" },
        { label: "Coverage", value: `${mod.testPercent}%` },
      ],
    },
    "uat-issues": {
      title: "UAT Issues",
      description: "User acceptance testing issues and defects.",
      items: [
        { label: "Open Issues", value: "0" },
        { label: "Resolved", value: "0" },
        { label: "Critical", value: "0" },
      ],
    },
    docs: {
      title: "Documentation",
      description: "Related specifications, design docs and API references.",
      items: [
        { label: "Spec Document", value: "Not linked" },
        { label: "Design File", value: "Not linked" },
        { label: "API Reference", value: "Not linked" },
      ],
    },
  }

  const tab = placeholders[tabId]
  if (!tab) return `<div class="rr-detail-placeholder"><p>Tab content not available.</p></div>`

  const rows = tab.items.map(item => `
    <div class="rr-detail-meta-row">
      <span class="rr-detail-meta-label">${escapeHtml(item.label)}</span>
      <span class="rr-detail-meta-value">${escapeHtml(item.value)}</span>
    </div>
  `).join("")

  return `
    <div class="rr-detail-placeholder">
      <h3 class="rr-detail-placeholder-title">${escapeHtml(tab.title)}</h3>
      <p class="rr-detail-placeholder-desc">${escapeHtml(tab.description)}</p>
      <div class="rr-detail-meta-table">${rows}</div>
    </div>
  `
}

/* ── Detail panel: full overlay ────────────────────────────── */
function renderDetailPanel(mod, detailState) {
  if (!mod) return ""
  const moduleData = getModuleTasks(mod.id)
  const progress = computeDetailProgress(moduleData)

  return `
    <div class="rr-detail-backdrop" data-action="close-detail"></div>
    <div class="rr-detail-panel">
      ${renderDetailHeader(mod)}
      ${renderDetailNav(detailState.activeTab, progress)}
      <div class="rr-detail-content">
        ${renderDetailTabContent(detailState.activeTab, mod, moduleData, detailState.collapsedFeatures)}
      </div>
    </div>
  `
}

/* ── Sprint dropdown ──────────────────────────────────────── */
function renderSprintDropdown(sprints, activeSprintId, isOpen) {
  if (!isOpen) return ""
  return `
    <div class="rr-kb-sprint-dropdown">
      ${sprints.map(s => {
        const isActive = s.id === activeSprintId
        const dotColor = s.status === "active" ? "#0e9255" : s.status === "closed" ? "#667085" : "#0067da"
        return `
          <button type="button" class="rr-kb-sprint-option ${isActive ? "is-active" : ""}" data-action="select-sprint" data-sprint-id="${escapeHtml(s.id)}">
            <span class="rr-kb-sprint-dot" style="background:${dotColor}"></span>
            Sprint ${s.number}
            <span class="rr-kb-sprint-option-dates">${escapeHtml(s.startDate)} – ${escapeHtml(s.endDate)}</span>
            ${s.status === "closed" ? '<span class="rr-kb-sprint-closed-tag">Closed</span>' : ""}
          </button>
        `
      }).join("")}
    </div>
  `
}

/* ── Main render entry point ─────────────────────────────── */
export async function renderKanbanModuleFlow() {
  return `
    <section class="rr-kb" data-flow="kanban-module">
      <div class="rr-kb-body">
        <div class="rr-kb-filter-row" id="rr-kb-filter-row"></div>
        <div class="rr-kb-table" id="rr-kb-table"></div>
        <div class="rr-kb-actions" id="rr-kb-actions"></div>
      </div>
      <div class="rr-detail-overlay" id="rr-detail-overlay"></div>
    </section>
  `
}

/* ── Mount (state + events) ───────────────────────────────── */
export function mountKanbanModuleFlow() {
  const root = document.querySelector('[data-flow="kanban-module"]')
  if (!root) return undefined

  /* Sprint selector is injected into the tab header (outside the flow root) */
  const tabHeaderActions = document.querySelector("#rr-tab-sprint-header")

  const els = {
    filterRow:      root.querySelector("#rr-kb-filter-row"),
    table:          root.querySelector("#rr-kb-table"),
    actions:        root.querySelector("#rr-kb-actions"),
    detailOverlay:  root.querySelector("#rr-detail-overlay"),
  }

  const state = {
    activeSprintId: "sprint-13",
    sortCol: "priority",
    sortDir: "desc",
    searchQuery: "",
    collapsedGroups: new Set(),
    sprintDropdownOpen: false,
    openFilter: null,
    filters: {
      modules:   [],
      priority:  [],
      assignees: [],
      statuses:  [],
    },
    /* Detail panel state */
    detail: {
      open: false,
      moduleId: null,
      activeTab: "tasks",
      collapsedFeatures: new Set(),
    },
  }

  function getActiveSprint() {
    return SPRINTS.find(s => s.id === state.activeSprintId) || SPRINTS[0]
  }

  /* Re-render everything except the search input (to preserve cursor) */
  function render() {
    const sprint = getActiveSprint()

    /* Sprint selector goes into the tab header */
    if (tabHeaderActions) {
      tabHeaderActions.innerHTML =
        renderSprintSelector(sprint) +
        renderSprintDropdown(SPRINTS, state.activeSprintId, state.sprintDropdownOpen)
    }

    els.filterRow.innerHTML = renderFilterBar(state, sprint)
    els.table.innerHTML = renderSprintTable(sprint, state)
    els.actions.innerHTML = renderCloseSprintButton(sprint)

    // Restore search value without re-creating the input
    const searchInput = root.querySelector("#rr-kb-search")
    if (searchInput && state.searchQuery) {
      searchInput.value = state.searchQuery
    }

    /* Detail panel */
    renderDetail()
  }

  function renderDetail() {
    if (state.detail.open && state.detail.moduleId) {
      const mod = findModuleById(state.detail.moduleId)
      if (mod) {
        els.detailOverlay.innerHTML = renderDetailPanel(mod, state.detail)
        els.detailOverlay.classList.add("is-open")
        // Trigger opening animation on next frame
        requestAnimationFrame(() => {
          const panel = els.detailOverlay.querySelector(".rr-detail-panel")
          const backdrop = els.detailOverlay.querySelector(".rr-detail-backdrop")
          if (panel) panel.classList.add("is-visible")
          if (backdrop) backdrop.classList.add("is-visible")
        })
        document.body.style.overflow = "hidden"
        return
      }
    }
  }

  function findModuleById(moduleId) {
    for (const sprint of SPRINTS) {
      for (const group of sprint.groups) {
        for (const mod of group.modules) {
          if (mod.id === moduleId) return mod
        }
      }
    }
    return null
  }

  function openDetailPanel(moduleId) {
    state.detail.open = true
    state.detail.moduleId = moduleId
    state.detail.activeTab = "tasks"
    state.detail.collapsedFeatures = new Set()
    renderDetail()
  }

  function closeDetailPanel() {
    // Reset state immediately to prevent race conditions
    state.detail.open = false
    state.detail.moduleId = null

    const panel = els.detailOverlay.querySelector(".rr-detail-panel")
    const backdrop = els.detailOverlay.querySelector(".rr-detail-backdrop")

    if (panel) panel.classList.remove("is-visible")
    if (backdrop) backdrop.classList.remove("is-visible")

    // Wait for animation to finish before removing content
    setTimeout(() => {
      els.detailOverlay.classList.remove("is-open")
      els.detailOverlay.innerHTML = ""
      document.body.style.overflow = ""
    }, 300)
  }

  function closeAllDropdowns() {
    let changed = false
    if (state.sprintDropdownOpen) { state.sprintDropdownOpen = false; changed = true }
    if (state.openFilter) { state.openFilter = null; changed = true }
    return changed
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]")

    if (!target) {
      if (closeAllDropdowns()) render()
      return
    }

    const action = target.dataset.action

    if (action === "toggle-group") {
      event.preventDefault()
      const groupId = target.dataset.groupId
      if (state.collapsedGroups.has(groupId)) {
        state.collapsedGroups.delete(groupId)
      } else {
        state.collapsedGroups.add(groupId)
      }
      render()
      return
    }

    if (action === "sort") {
      const col = target.dataset.sort
      if (state.sortCol === col) {
        state.sortDir = state.sortDir === "desc" ? "asc" : "desc"
      } else {
        state.sortCol = col
        state.sortDir = "desc"
      }
      render()
      return
    }

    if (action === "toggle-sprint-dropdown") {
      event.stopPropagation()
      state.openFilter = null
      state.sprintDropdownOpen = !state.sprintDropdownOpen
      render()
      return
    }

    if (action === "select-sprint") {
      state.activeSprintId = target.dataset.sprintId
      state.sprintDropdownOpen = false
      state.collapsedGroups.clear()
      for (const key of Object.keys(state.filters)) state.filters[key] = []
      render()
      return
    }

    if (action === "toggle-filter") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      state.sprintDropdownOpen = false
      state.openFilter = state.openFilter === filterId ? null : filterId
      render()
      return
    }

    if (action === "toggle-filter-option") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      const value = target.dataset.value
      const arr = state.filters[filterId]
      const idx = arr.indexOf(value)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(value)
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

    if (action === "close-sprint") {
      const sprint = getActiveSprint()
      if (sprint) sprint.status = "closed"
      render()
      return
    }

    if (action === "sprint-history") {
      return
    }

    /* ── Detail panel actions ─────────────────────────────── */
    if (action === "open-detail") {
      event.preventDefault()
      const moduleId = target.dataset.moduleId
      if (moduleId) openDetailPanel(moduleId)
      return
    }

    if (action === "close-detail") {
      event.preventDefault()
      closeDetailPanel()
      return
    }

    if (action === "detail-tab") {
      event.preventDefault()
      event.stopPropagation()
      const tab = target.dataset.tab
      if (tab && tab !== state.detail.activeTab) {
        state.detail.activeTab = tab
        renderDetail()
      }
      return
    }

    if (action === "toggle-detail-feature") {
      event.preventDefault()
      event.stopPropagation()
      const featureId = target.dataset.featureId
      if (state.detail.collapsedFeatures.has(featureId)) {
        state.detail.collapsedFeatures.delete(featureId)
      } else {
        state.detail.collapsedFeatures.add(featureId)
      }
      renderDetail()
      return
    }
  }

  function handleInput(event) {
    if (event.target.id === "rr-kb-search") {
      state.searchQuery = event.target.value || ""
      // Re-render table only (not the filter bar) to keep search input focused
      const sprint = getActiveSprint()
      els.table.innerHTML = renderSprintTable(sprint, state)
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && state.detail.open) {
      closeDetailPanel()
      return
    }
    if (event.key === "Enter" || event.key === " ") {
      const groupRow = event.target.closest('[data-action="toggle-group"]')
      if (groupRow) {
        event.preventDefault()
        groupRow.click()
      }
      const moduleRow = event.target.closest('[data-action="open-detail"]')
      if (moduleRow) {
        event.preventDefault()
        moduleRow.click()
      }
      const featureRow = event.target.closest('[data-action="toggle-detail-feature"]')
      if (featureRow) {
        event.preventDefault()
        featureRow.click()
      }
    }
  }

  root.addEventListener("click", handleClick)
  root.addEventListener("input", handleInput)
  root.addEventListener("keydown", handleKeyDown)
  if (tabHeaderActions) tabHeaderActions.addEventListener("click", handleClick)

  render()

  return () => {
    root.removeEventListener("click", handleClick)
    root.removeEventListener("input", handleInput)
    root.removeEventListener("keydown", handleKeyDown)
    if (tabHeaderActions) {
      tabHeaderActions.removeEventListener("click", handleClick)
      tabHeaderActions.innerHTML = ""
    }
  }
}
