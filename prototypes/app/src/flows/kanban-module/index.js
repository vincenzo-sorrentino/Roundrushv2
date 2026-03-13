/* ──────────────────────────────────────────────────────────────
   Current Sprint — Sprints flow
   Route: /sprints/current
   Shows the active sprint table with module detail overlay.
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
  warning: `<svg width="24" height="24" viewBox="0 0 256 256" fill="none"><path d="M230 194L142 34c-6-11-22-11-28 0L26 194c-6 11 1 26 14 26h176c13 0 20-15 14-26z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="128" y1="104" x2="128" y2="144" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="176" r="10" fill="currentColor"/></svg>`,
  link: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M144 80h32a40 40 0 0 1 0 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 0 1 0-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  github: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24,40,40,0,0,0-40-40,8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z"/></svg>`,
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
            status: "in-progress",
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
            status: "review",
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
            status: "in-progress",
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
            status: "validating",
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

/* ── Detail (module) Tasks filter helpers & bar ───────────── */
function getDetailFilterOptions(moduleData) {
  const priorities = []
  const statuses = []
  for (const feature of moduleData.features || []) {
    for (const t of feature.tasks || []) {
      if (!priorities.find(p => p.value === t.priority)) {
        const cfg = PRIORITY_CONFIG[t.priority]
        priorities.push({ value: t.priority, label: cfg ? cfg.label : t.priority, dot: cfg ? cfg.color : undefined })
      }
      if (!statuses.find(s => s.value === t.status)) {
        const cfg = DETAIL_STATUS_CONFIG[t.status] || DETAIL_STATUS_CONFIG["to-do"]
        statuses.push({ value: t.status, label: cfg.label, dot: cfg.bg })
      }
    }
  }
  return { priorities, statuses }
}

function renderDetailFilterDropdown(filterId, options, selectedValues, isOpen) {
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

function renderDetailFilterBar(detailState, moduleData) {
  const opts = getDetailFilterOptions(moduleData)
  const defs = [
    { id: "priority", label: "Priority", options: opts.priorities, selected: detailState.filters.priority },
    { id: "statuses", label: "Status",  options: opts.statuses,   selected: detailState.filters.statuses },
  ]

  const buttons = defs.map(f => {
    const activeCount = f.selected.length
    const displayLabel = activeCount > 0 ? `${f.label} (${activeCount})` : f.label
    const isOpen = detailState.openFilter === f.id
    return `
      <span class="rr-kb-filter-anchor">
        <button type="button" class="rr-kb-filter-btn ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-active" : ""}"
          data-action="toggle-filter" data-filter="${f.id}">
          ${escapeHtml(displayLabel)} ${ICON.caretDown}
        </button>
        ${renderDetailFilterDropdown(f.id, f.options, f.selected, isOpen)}
      </span>
    `
  }).join("")

  return `
    <div class="rr-kb-filters rr-detail-filters">
      <div class="rr-kb-filter-buttons">${buttons}</div>
      <div class="rr-kb-search-wrap">
        <div class="rr-kb-search">
          ${ICON.search}
          <input type="search" class="rr-kb-search-input" id="rr-detail-search" placeholder="Search tasks" />
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
    ${activeSprint.status === "active" ? `
    <button type="button" class="rr-kb-sprint-history-btn rr-kb-close-sprint-icon-btn" data-action="close-sprint" title="Close Sprint">
      ${ICON.flagCheckered}
    </button>
    ` : ""}
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
      <span class="rr-kb-cell rr-kb-cell--req">
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

  // Flat list — epic group headers removed, modules shown directly
  const rows = filteredGroups.flatMap(group => group.modules.map(renderModuleRow)).join("")

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

/* ── Overview tab: per-module rich content ────────────────── */
const OVERVIEW_CONTENT = {
  "LOG-001": {
    description: "Allows registered users to authenticate using email and password. Failed attempts surface a neutral inline error without revealing which field was wrong; repeated failures temporarily lock the account to guard against brute-force access.",
    protoRoute: "/log/login/default",
    features: {
      "LOG-001-F01": "User enters credentials and clicks Log in. Correct credentials land the user directly in their workspace. Incorrect ones show a neutral inline error. Multiple consecutive failures trigger a temporary lockout with plain-language guidance.",
      "LOG-001-F02": "An optional remember me checkbox stores an encrypted session token so returning users are re-authenticated without re-entering credentials for up to 30 days.",
    },
  },
  "LOG-002": {
    description: "Manages the full authentication lifecycle including JWT issuance, OAuth provider integrations, and session revocation across multiple devices or browser tabs.",
    protoRoute: "/log/auth/flow",
    features: {
      "AUT-002-F01": "Issues short-lived JWTs with a refresh token rotation strategy. Handles session timeout and triggers silent renewal before expiry to avoid disrupting active users.",
      "AUT-002-F02": "Supports Google, GitHub and Microsoft OAuth flows with error handling for callback failures. Users can link an OAuth identity to an existing email-password account.",
    },
  },
  "LOG-003": {
    description: "Self-service password reset workflow. Users receive a time-limited link via email to set a new password, with clear guidance shown if the link has expired or is invalid.",
    protoRoute: "/log/recovery/email",
  },
  "LOG-004": {
    description: "Silent JWT refresh cycle keeps users authenticated across sessions without requiring a re-login, while enforcing per-device token revocation on explicit logout.",
    protoRoute: "/log/session/renew",
  },
  "AUT-M001": {
    description: "Allow registered users to authenticate securely using their email and password. If a user forgets their password they can request a reset link by email and set a new password through a time-limited secure flow.",
    protoRoute: "/auth/login/default",
    features: {
      "AUT-001-F01": `The user enters their email address and password and clicks "Log in". If the credentials are correct they land straight in their workspace. If something is wrong, a neutral inline error appears — it doesn't reveal whether the email or the password failed. After several consecutive failed attempts the account is temporarily locked to guard against brute-force access.`,
      "AUT-001-F02": `From the login screen a user who can't remember their password clicks "Forgot password" and is asked for their email address. A time-limited reset link is sent to that address. Clicking the link opens a form where the user sets a new password; on success they are taken to the login screen to sign in with the new credentials.`,
    },
  },
  "AUT-M002": {
    description: "Provides OAuth sign-in via Google, GitHub and Microsoft. Users can choose to link an OAuth identity to an existing account. Handles callback errors with clear user-facing messages and fallback paths.",
    protoRoute: "/auth/oauth/callback",
  },
  "TEM-001": {
    description: "Guided multi-step wizard for creating a new team workspace. Covers name, avatar, initial member invitations and role assignment in a single cohesive flow.",
    protoRoute: "/team/create/wizard",
  },
  "TEM-002": {
    description: "RBAC role management for team members. Admins can assign, elevate or revoke roles. Permission boundaries are enforced at both UI and API layer.",
    protoRoute: "/team/roles/manage",
  },
  "TEM-003": {
    description: "Central settings page for team-level preferences: name, timezone, notification defaults, billing plan and danger-zone destructive actions.",
    protoRoute: "/team/settings",
  },
  "REQ-001": {
    description: "Full CRUD interface for requirement modules — create, edit, archive and restore. Changes are version-logged with audit trail and support optimistic locking.",
    protoRoute: "/req/modules/crud",
  },
  "REQ-002": {
    description: "Automated validation engine that checks each module's acceptance laws on save. Surfaces violations inline and maintains a historical pass/fail log per sprint.",
    protoRoute: "/req/acceptance-laws",
  },
  "REQ-003": {
    description: "Interactive graph visualisation of inter-module dependencies. Allows filtering by epic, highlighting critical paths and exporting the current view.",
    protoRoute: "/req/dependencies/graph",
  },
  "DEP-001": {
    description: "Renders the full dependency tree as a collapsible node graph. Supports zoom, pan and node selection to drill into individual module coupling details.",
    protoRoute: "/dep/tree/view",
  },
  "DEP-002": {
    description: "Static analysis pass that detects circular dependencies and surfaces them as blocking issues before a sprint is confirmed.",
    protoRoute: "/dep/circular/detect",
  },
  "SET-001": {
    description: "User-level profile page covering avatar, display name, contact details, notification preferences and linked OAuth accounts.",
    protoRoute: "/settings/profile",
  },
}

/* ── Detail panel status config (extended) ─────────────────── */
const DETAIL_STATUS_CONFIG = {
  ...STATUS_CONFIG,
  "paused":            { label: "Paused",           bg: "#f0f1f3", text: "#3d4350" },
  "ready-for-review":  { label: "Ready for review", bg: "#fff3cd", text: "#856404" },
}

/* ── Detail panel tab definitions ──────────────────────────── */
const DETAIL_TABS = [
  { id: "overview",          label: "Description" },
  { id: "acceptance-laws",   label: "Acceptance Laws" },
  { id: "dependencies",      label: "Dependencies" },
  { id: "tasks",             label: "Tasks" },
  { id: "unit-tests",        label: "Unit tests" },
  { id: "test-cases",        label: "Test Cases" },
  { id: "uat-issues",        label: "UAT Issues" },
]

/* ── Acceptance laws definitions (global, constant across all modules) ── */
const ACCEPTANCE_LAWS = [
  {
    id: "AL-01",
    title: "Production code implemented",
    description: "Required production code for all modules is implemented and merged into the integration branch",
    evidence: "Merge status",
  },
  {
    id: "AL-02",
    title: "Unit and integration tests pass with required coverage",
    description: "All unit and integration tests pass and coverage meets the project threshold",
    evidence: "TestExecution (unit), TestExecution (integration), CoverageReport",
  },
  {
    id: "AL-03",
    title: "Documentation updated",
    description: "Documentation is updated where applicable (requirements if necessary, code comments, component docs, and any required technical docs)",
    evidence: "Documentation update",
  },
  {
    id: "AL-04",
    title: "End-to-end tests implemented and passed",
    description: "E2E tests exist for user-facing flows and pass in CI",
    evidence: "Test execution (e2e)",
  },
  {
    id: "AL-05",
    title: "Dependency map updated",
    description: "Dependency map is updated (or explicitly confirmed unchanged) when changes affect module boundaries or coupling",
    evidence: "Dependency graph update",
  },
  {
    id: "AL-06",
    title: "Dependency-based regression tests pass",
    description: "Regression tests derived from impacted modules (via dependency map) pass with 100% success",
    evidence: "Test execution (regression)",
  },
  {
    id: "AL-07",
    title: "Required manual suites completed",
    description: "Required manual validation sessions are completed and recorded",
    evidence: "Manual test session",
  },
]

/* ── Deterministic per-module AL status generator ───────────── */
function hashModuleId(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function getAcceptanceLawStatuses(moduleId, moduleStatus) {
  // Pass probability per law index, weighted by module status
  const passProbability = {
    "done":        [0.97, 0.95, 0.96, 0.97, 0.92, 0.90, 0.94],
    "merged-qa":   [0.92, 0.88, 0.90, 0.85, 0.82, 0.78, 0.82],
    "validating":  [0.85, 0.80, 0.78, 0.72, 0.75, 0.70, 0.75],
    "review":      [0.80, 0.74, 0.72, 0.65, 0.62, 0.58, 0.68],
    "in-progress": [0.68, 0.62, 0.55, 0.45, 0.42, 0.38, 0.50],
    "to-do":       [0.30, 0.22, 0.18, 0.14, 0.12, 0.10, 0.16],
    "blocked":     [0.58, 0.52, 0.48, 0.38, 0.22, 0.18, 0.28],
  }
  const weights = passProbability[moduleStatus] ?? passProbability["in-progress"]
  const seed = hashModuleId(moduleId)
  return weights.map((p, i) => {
    const rng = ((seed ^ (seed >>> (i + 2))) * (i * 0x3a4b5c + 0xf1e2d3)) >>> 0
    return (rng / 0xFFFFFFFF) < p ? "pass" : "fail"
  })
}

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
function renderDetailNav(activeTab, progressPercent, progressLabel = null) {
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
        <span class="rr-detail-progress-label">${escapeHtml(progressLabel ?? progressPercent + "%")}</span>
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

/* ── Detail panel: Acceptance Laws tab content ─────────────── */
function renderAcceptanceLawsTab(mod) {
  const statuses = getAcceptanceLawStatuses(mod.id, mod.status)
  const header = `
    <div class="rr-al-thead">
      <span class="rr-al-th rr-al-th--no">No.</span>
      <span class="rr-al-th rr-al-th--law">Law</span>
      <span class="rr-al-th rr-al-th--evidence">Evidence</span>
      <span class="rr-al-th rr-al-th--status">Status</span>
    </div>
  `
  const rows = ACCEPTANCE_LAWS.map((law, i) => {
    const status = statuses[i] ?? "fail"
    const badgeClass = status === "pass" ? "rr-al-badge--pass" : "rr-al-badge--fail"
    const badgeLabel = status === "pass" ? "Pass" : "Fail"
    return `
      <div class="rr-al-row">
        <span class="rr-al-cell rr-al-cell--no">${escapeHtml(law.id)}</span>
        <span class="rr-al-cell rr-al-cell--law">
          <span class="rr-al-law-title">${escapeHtml(law.title)}</span>
          <span class="rr-al-law-desc">${escapeHtml(law.description)}</span>
        </span>
        <span class="rr-al-cell rr-al-cell--evidence">${escapeHtml(law.evidence)}</span>
        <span class="rr-al-cell rr-al-cell--status">
          <span class="rr-al-badge ${badgeClass}">${badgeLabel}</span>
        </span>
      </div>
    `
  }).join("")
  return `<div class="rr-al-table">${header}<div class="rr-al-tbody">${rows}</div></div>`
}

/* ── Detail panel: Tasks tab content ───────────────────────── */
function renderDetailTasksTab(moduleData, detailState) {
  const collapsedFeatures = detailState.collapsedFeatures || new Set()
  const q = (detailState.searchQuery || "").toLowerCase().trim()

  const filteredFeatures = (moduleData.features || []).map(feature => {
    const tasks = feature.tasks.filter(task => {
      if (detailState.filters.priority.length && !detailState.filters.priority.includes(task.priority)) return false
      if (detailState.filters.statuses.length && !detailState.filters.statuses.includes(task.status)) return false
      if (q) {
        const hay = `${task.title} ${task.id} ${feature.title}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    return { ...feature, tasks }
  }).filter(f => f.tasks.length > 0)

  const filterBarHtml = renderDetailFilterBar(detailState, moduleData)

  const ths = `
    <div class="rr-detail-thead">
      <span class="rr-detail-th rr-detail-th--task">Task</span>
      <span class="rr-detail-th rr-detail-th--priority">
        <button type="button" class="rr-kb-sort-btn is-active" data-action="noop">
          Priority ${ICON.arrowDown}
        </button>
      </span>
      <span class="rr-detail-th rr-detail-th--due">Date</span>
      <span class="rr-detail-th rr-detail-th--assignee">Assignee</span>
      <span class="rr-detail-th rr-detail-th--pr">PR Link</span>
      <span class="rr-detail-th rr-detail-th--status">Status</span>
    </div>
  `

  const rows = filteredFeatures.map(feature => {
    const isCollapsed = collapsedFeatures.has(feature.id)
    const caretIcon = isCollapsed ? ICON.caretRight : ICON.caretDown
    const featureRow = `
      <div class="rr-detail-row rr-detail-row--feature" data-action="toggle-detail-feature" data-feature-id="${escapeHtml(feature.id)}" role="button" tabindex="0">
        <span class="rr-detail-cell rr-detail-cell--task">
          <span class="rr-kb-expand-icon">${caretIcon}</span>
          <span class="rr-detail-feature-label">${escapeHtml(feature.id)} - ${escapeHtml(feature.title)}</span>
        </span>
        <span class="rr-detail-cell rr-detail-cell--priority"></span>
        <span class="rr-detail-cell rr-detail-cell--due"></span>
        <span class="rr-detail-cell rr-detail-cell--assignee"></span>
        <span class="rr-detail-cell rr-detail-cell--pr"></span>
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
        <span class="rr-detail-cell rr-detail-cell--due">${escapeHtml(task.dueDate)}</span>
        <span class="rr-detail-cell rr-detail-cell--assignee">${renderAvatarGroup(task.assignees, 0)}</span>
        <span class="rr-detail-cell rr-detail-cell--pr">
          <button type="button" class="rr-detail-pr-link-btn" data-action="noop" title="View PR">${ICON.github}</button>
        </span>
        <span class="rr-detail-cell rr-detail-cell--status">${renderDetailStatus(task.status)}</span>
      </div>
    `).join("")

    return featureRow + taskRows
  }).join("")

  return `
    ${filterBarHtml}
    <div class="rr-detail-table">
      ${ths}
      <div class="rr-detail-tbody">${rows}</div>
    </div>
  `
}

/* ── Dependencies data ─────────────────────────────────────── */
const DEPENDENCY_RISK_CONFIG = {
  high:   { label: "High",   bg: "#fcdad7", text: "#c0362d" },
  medium: { label: "Medium", bg: "#fef4e6", text: "#f79009" },
  low:    { label: "Low",    bg: "#d4f5e3", text: "#0e9255" },
}

const DEPENDENCY_MAP = {
  /* ── LOG / AUT: Authentication & Login ── */
  "LOG-001": [
    { from: "UI-Login",        to: "SVC-AUTH",         relation: "calls_api",      iface: "POST /auth/login",            risk: "high",   conf: 0.97, why: "Core credential validation entry point" },
    { from: "UI-Login",        to: "SVC-SESSION",      relation: "calls_api",      iface: "POST /sessions/init",         risk: "high",   conf: 0.94, why: "JWT issued on successful auth" },
    { from: "SVC-AUTH",        to: "DB-USERS",         relation: "reads",          iface: "SELECT hash, salt WHERE id",  risk: "high",   conf: 0.99, why: "Bcrypt comparison requires stored hash" },
    { from: "SVC-AUTH",        to: "SVC-MFA",          relation: "calls_api",      iface: "POST /mfa/verify",            risk: "medium", conf: 0.85, why: "Optional 2FA step before session grant" },
    { from: "SVC-AUTH",        to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/auth-attempt",   risk: "low",    conf: 0.91, why: "Compliance log for all login events" },
    { from: "UI-Login",        to: "SVC-RATE-LIMIT",   relation: "reads_policy",   iface: "policy.auth.maxAttempts",     risk: "medium", conf: 0.88, why: "Lockout after N failed attempts" },
  ],
  "LOG-002": [
    { from: "SVC-AUTH",        to: "DB-USERS",         relation: "reads",          iface: "SELECT id, hash, provider",   risk: "high",   conf: 0.98, why: "Multi-strategy lookup by provider type" },
    { from: "SVC-AUTH",        to: "SVC-OAUTH",        relation: "delegates_to",   iface: "GET /oauth/callback",         risk: "medium", conf: 0.86, why: "Social login redirect handled externally" },
    { from: "SVC-AUTH",        to: "SVC-TOKEN",        relation: "calls_api",      iface: "POST /tokens/refresh",        risk: "high",   conf: 0.93, why: "Short-lived access tokens must rotate" },
    { from: "SVC-AUTH",        to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/auth-attempt",   risk: "low",    conf: 0.90, why: "All auth attempts logged for SIEM" },
    { from: "UI-Login",        to: "SVC-CAPTCHA",      relation: "calls_api",      iface: "POST /captcha/verify",        risk: "medium", conf: 0.79, why: "Bot prevention on repeated failures" },
  ],
  "LOG-003": [
    { from: "UI-Recovery",     to: "SVC-AUTH",         relation: "calls_api",      iface: "POST /auth/reset-request",    risk: "high",   conf: 0.95, why: "Triggers reset token generation" },
    { from: "SVC-AUTH",        to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/reset-email",    risk: "high",   conf: 0.97, why: "Recovery link delivered via email" },
    { from: "SVC-AUTH",        to: "DB-TOKENS",        relation: "reads_writes",   iface: "INSERT/DELETE reset_tokens",  risk: "high",   conf: 0.99, why: "One-time tokens stored with TTL" },
    { from: "UI-Recovery",     to: "SVC-RATE-LIMIT",   relation: "reads_policy",   iface: "policy.reset.maxPerHour",     risk: "medium", conf: 0.88, why: "Prevents email flooding attacks" },
    { from: "SVC-AUTH",        to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/password-reset", risk: "low",    conf: 0.87, why: "Security audit trail for resets" },
  ],
  "LOG-004": [
    { from: "SVC-SESSION",     to: "DB-SESSIONS",      relation: "reads_writes",   iface: "SELECT/UPDATE sessions",      risk: "high",   conf: 0.98, why: "Sliding expiry updated on each request" },
    { from: "SVC-SESSION",     to: "SVC-TOKEN",        relation: "calls_api",      iface: "POST /tokens/renew",          risk: "high",   conf: 0.96, why: "Access token regenerated before expiry" },
    { from: "SVC-SESSION",     to: "SVC-GOV",          relation: "reads_policy",   iface: "policy.session.ttl",          risk: "medium", conf: 0.91, why: "Configurable session lifetime policy" },
    { from: "SVC-SESSION",     to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/session-renew",  risk: "low",    conf: 0.83, why: "Renewal events tracked for anomaly detection" },
  ],
  /* ── TEM: Team management ── */
  "TEM-001": [
    { from: "UI-TEAMS",        to: "API-USERS",        relation: "calls_api",      iface: "GET /users/directory",        risk: "low",    conf: 0.92, why: "Populates assignable member list" },
    { from: "UI-TEAMS",        to: "SVC-ROLES",        relation: "calls_api",      iface: "GET /roles/available",        risk: "medium", conf: 0.87, why: "Role picker needs current permission set" },
    { from: "SVC-TEAMS",       to: "DB-TEAMS",         relation: "reads_writes",   iface: "INSERT INTO teams",           risk: "low",    conf: 0.96, why: "Persists new team record with owner" },
    { from: "SVC-TEAMS",       to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/team-created",   risk: "low",    conf: 0.83, why: "Invited members receive join notification" },
    { from: "UI-TEAMS",        to: "SVC-PERMISSIONS",  relation: "reads_policy",   iface: "policy.rbac.team-create",     risk: "high",   conf: 0.91, why: "Only workspace admins may create teams" },
  ],
  "TEM-002": [
    { from: "UI-TEAM-ROLES",   to: "SVC-ROLES",        relation: "calls_api",      iface: "GET /roles/by-team",          risk: "medium", conf: 0.89, why: "Displays per-team role assignments" },
    { from: "UI-TEAM-ROLES",   to: "SVC-PERMISSIONS",  relation: "reads_policy",   iface: "policy.rbac.assign",          risk: "high",   conf: 0.94, why: "Role change requires admin privilege" },
    { from: "SVC-ROLES",       to: "DB-ROLES",         relation: "reads_writes",   iface: "UPDATE member_roles",         risk: "medium", conf: 0.97, why: "Role table updated atomically" },
    { from: "SVC-ROLES",       to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/role-change",    risk: "low",    conf: 0.85, why: "RBAC changes always audited" },
    { from: "SVC-ROLES",       to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/role-update",    risk: "low",    conf: 0.81, why: "Affected user notified of privilege change" },
  ],
  "TEM-003": [
    { from: "UI-TEAM-SETTINGS", to: "SVC-TEAMS",       relation: "calls_api",      iface: "PATCH /teams/:id/settings",   risk: "medium", conf: 0.88, why: "Team name, avatar, visibility updated" },
    { from: "UI-TEAM-SETTINGS", to: "SVC-INTEGRATIONS",relation: "calls_api",      iface: "GET /integrations/linked",    risk: "low",    conf: 0.84, why: "Shows connected repos and tools" },
    { from: "SVC-TEAMS",       to: "DB-TEAMS",         relation: "reads_writes",   iface: "UPDATE teams WHERE id",       risk: "low",    conf: 0.96, why: "Settings persisted in teams table" },
    { from: "SVC-TEAMS",       to: "SVC-MEDIA",        relation: "calls_api",      iface: "POST /media/upload",          risk: "low",    conf: 0.78, why: "Avatar upload to object storage" },
  ],
  /* ── REQ: Requirements ── */
  "REQ-001": [
    { from: "UI-BACKLOG",      to: "API-READ",         relation: "calls_api",      iface: "GET /requirements/tree",      risk: "high",   conf: 0.92, why: "Renders Epic→Module→Feature hierarchy" },
    { from: "UI-BACKLOG",      to: "SVC-DEPS",         relation: "calls_api",      iface: "GET /dependencies/impact",    risk: "medium", conf: 0.88, why: "Impact count badge on each module card" },
    { from: "SVC-REQ",         to: "DB-REQ",           relation: "reads_writes",   iface: "CRUD requirements WHERE epic",risk: "low",    conf: 0.97, why: "Full CRUD on requirements table" },
    { from: "SVC-REQ",         to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/req-modified",   risk: "low",    conf: 0.82, why: "Spec changes create audit entries" },
    { from: "SVC-SPRINT",      to: "SVC-REQ",          relation: "aggregates",     iface: "module status rollup",        risk: "medium", conf: 0.85, why: "Sprint progress from module completion %" },
  ],
  "REQ-002": [
    { from: "UI-REQ-EDITOR",   to: "SVC-REQ",          relation: "calls_api",      iface: "GET /acceptance-laws/:id",    risk: "medium", conf: 0.90, why: "Laws retrieved per module on tab open" },
    { from: "SVC-REQ",         to: "SVC-GOV",          relation: "reads_policy",   iface: "policy.al.required-fields",   risk: "high",   conf: 0.93, why: "Gov policy defines mandatory AL fields" },
    { from: "SVC-REQ",         to: "DB-REQ",           relation: "reads_writes",   iface: "UPSERT acceptance_laws",      risk: "medium", conf: 0.96, why: "AL upserted on every save" },
    { from: "SVC-REQ",         to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/al-changed",     risk: "low",    conf: 0.84, why: "Law edits logged with diff" },
  ],
  "REQ-003": [
    { from: "UI-DEP-VIEW",     to: "SVC-DEPS",         relation: "calls_api",      iface: "GET /deps/graph?moduleId",    risk: "medium", conf: 0.90, why: "Full DAG data for canvas render" },
    { from: "SVC-DEPS",        to: "DB-DEPS",          relation: "reads",          iface: "SELECT edges WHERE module",   risk: "low",    conf: 0.95, why: "Persistent store of dep edges" },
    { from: "SVC-DEPS",        to: "SVC-MODULES",      relation: "aggregates",     iface: "module boundary analysis",    risk: "high",   conf: 0.78, why: "Detects cross-module coupling issues" },
    { from: "UI-DEP-VIEW",     to: "SVC-RELEASE",      relation: "reads",          iface: "GET /releases/diff",          risk: "medium", conf: 0.82, why: "Diff view shows dep changes per version" },
  ],
  /* ── DEP: Dependency engine ── */
  "DEP-001": [
    { from: "UI-DEP-GRAPH",    to: "SVC-DEPS",         relation: "calls_api",      iface: "GET /deps/graph?moduleId",    risk: "medium", conf: 0.90, why: "Directed acyclic graph data for canvas" },
    { from: "SVC-DEPS",        to: "DB-DEPS",          relation: "reads",          iface: "SELECT * FROM dep_edges",     risk: "low",    conf: 0.96, why: "Edge store is source of truth for graph" },
    { from: "SVC-DEPS",        to: "SVC-MODULES",      relation: "aggregates",     iface: "boundary analysis payload",   risk: "high",   conf: 0.79, why: "Finds modules sharing internal contracts" },
    { from: "SVC-DEPS",        to: "SVC-GOV",          relation: "reads_policy",   iface: "policy.deps.maxDepth",        risk: "low",    conf: 0.86, why: "Max allowed transitive depth enforced" },
    { from: "UI-DEP-GRAPH",    to: "SVC-RELEASE",      relation: "reads",          iface: "GET /releases/diff",          risk: "medium", conf: 0.81, why: "Version diff highlights new dep edges" },
  ],
  "DEP-002": [
    { from: "SVC-DEPS",        to: "DB-DEPS",          relation: "reads",          iface: "WITH RECURSIVE cycle_check",  risk: "high",   conf: 0.94, why: "Recursive CTE detects back-edges in DAG" },
    { from: "SVC-DEPS",        to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/cycle-detected", risk: "high",   conf: 0.88, why: "Cycle alert surfaced in real time to team" },
    { from: "SVC-DEPS",        to: "SVC-GOV",          relation: "reads_policy",   iface: "policy.deps.allowCycles",     risk: "high",   conf: 0.91, why: "Policy switch: warn vs hard-block" },
    { from: "SVC-DEPS",        to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/cycle-resolved", risk: "low",    conf: 0.80, why: "Resolution logged for compliance review" },
  ],
  /* ── Sprint 12 modules ── */
  "AUT-M001": [
    { from: "UI-Login-Form",   to: "SVC-AUTH",         relation: "calls_api",      iface: "POST /auth/login",            risk: "high",   conf: 0.97, why: "Form submit binds directly to auth API" },
    { from: "UI-Login-Form",   to: "SVC-VALIDATION",   relation: "calls_api",      iface: "POST /validate/credentials",  risk: "medium", conf: 0.88, why: "Client-side validation before network call" },
    { from: "SVC-AUTH",        to: "DB-USERS",         relation: "reads",          iface: "SELECT * WHERE email",        risk: "high",   conf: 0.99, why: "User lookup by email for hash compare" },
    { from: "UI-Login-Form",   to: "SVC-RATE-LIMIT",   relation: "reads_policy",   iface: "policy.auth.lockout",         risk: "medium", conf: 0.87, why: "Lockout banner shown after 5 failures" },
  ],
  "AUT-M002": [
    { from: "UI-OAuth",        to: "SVC-OAUTH",        relation: "delegates_to",   iface: "GET /oauth/:provider/start",  risk: "medium", conf: 0.89, why: "PKCE flow initiated via redirect" },
    { from: "SVC-OAUTH",       to: "SVC-AUTH",         relation: "calls_api",      iface: "POST /auth/oauth/exchange",   risk: "high",   conf: 0.93, why: "Token exchange after provider callback" },
    { from: "SVC-OAUTH",       to: "DB-USERS",         relation: "reads_writes",   iface: "UPSERT users ON oauth_id",    risk: "medium", conf: 0.90, why: "Auto-provision new users on first login" },
    { from: "SVC-AUTH",        to: "SVC-SESSION",      relation: "calls_api",      iface: "POST /sessions/init",         risk: "high",   conf: 0.96, why: "Session created same path as password auth" },
    { from: "SVC-OAUTH",       to: "SVC-AUDIT",        relation: "triggers",       iface: "POST /events/oauth-login",    risk: "low",    conf: 0.84, why: "Provider + scopes recorded per login" },
  ],
  "SET-001": [
    { from: "UI-PROFILE",      to: "API-USERS",        relation: "calls_api",      iface: "GET /users/me",               risk: "low",    conf: 0.97, why: "Fetches current user data on page load" },
    { from: "UI-PROFILE",      to: "SVC-MEDIA",        relation: "calls_api",      iface: "POST /media/avatar",          risk: "low",    conf: 0.82, why: "Avatar upload to object storage bucket" },
    { from: "SVC-USERS",       to: "DB-USERS",         relation: "reads_writes",   iface: "UPDATE users SET profile",    risk: "low",    conf: 0.96, why: "Profile fields patched atomically" },
    { from: "SVC-USERS",       to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/profile-update", risk: "low",    conf: 0.75, why: "Optional notification on email change" },
  ],
}

/* Fallback used when a module id has no specific map entry */
const DEFAULT_DEPENDENCIES = [
  { from: "UI-SPRINT",        to: "SVC-SPRINT",       relation: "calls_api",      iface: "GET /sprints/active",         risk: "medium", conf: 0.93, why: "Loads current sprint scope and dates" },
  { from: "UI-SPRINT",        to: "SVC-MODULES",      relation: "calls_api",      iface: "GET /modules/by-sprint",      risk: "high",   conf: 0.96, why: "Sprint board rows sourced from module list" },
  { from: "UI-SPRINT",        to: "SVC-PROGRESS",     relation: "calls_api",      iface: "GET /progress/aggregate",     risk: "low",    conf: 0.88, why: "Task & test completion % per module" },
  { from: "SVC-SPRINT",       to: "DB-TASKS",         relation: "reads",          iface: "SELECT tasks WHERE sprint",   risk: "low",    conf: 0.97, why: "Task counts feed progress bar display" },
  { from: "SVC-SPRINT",       to: "SVC-NOTIFY",       relation: "triggers",       iface: "POST /notify/sprint-open",    risk: "low",    conf: 0.85, why: "Team notified on sprint start / close" },
  { from: "SVC-RELEASE",      to: "SVC-TEST",         relation: "aggregates",     iface: "evidence: tests+coverage",    risk: "low",    conf: 0.90, why: "Release notes bundle test proof" },
  { from: "SVC-RELEASE",      to: "SVC-DEPS",         relation: "aggregates",     iface: "dep diff: vA\u2192vB",        risk: "medium", conf: 0.82, why: "Dependency changes included in changelog" },
]

function getModuleDependencies(moduleId) {
  return DEPENDENCY_MAP[moduleId] ?? DEFAULT_DEPENDENCIES
}

/* ── Detail panel: Dependencies tab renderer ───────────────── */
function renderDependenciesTab(mod) {
  const deps = getModuleDependencies(mod.id)

  const header = `
    <div class="rr-dep-thead">
      <span class="rr-dep-th rr-dep-th--from">
        <button type="button" class="rr-kb-sort-btn is-active" data-action="noop">
          From ${ICON.arrowDown}
        </button>
      </span>
      <span class="rr-dep-th rr-dep-th--to">To</span>
      <span class="rr-dep-th rr-dep-th--relation">Relation</span>
      <span class="rr-dep-th rr-dep-th--iface">Interface</span>
      <span class="rr-dep-th rr-dep-th--risk">Risk</span>
      <span class="rr-dep-th rr-dep-th--conf">Conf</span>
      <span class="rr-dep-th rr-dep-th--why">Why</span>
    </div>
  `

  const rows = deps.map(dep => {
    const riskKey = dep.risk in DEPENDENCY_RISK_CONFIG ? dep.risk : "low"
    const riskLabel = DEPENDENCY_RISK_CONFIG[riskKey].label
    const riskBadge = `<span class="rr-dep-risk-badge rr-dep-risk-badge--${riskKey}">${escapeHtml(riskLabel)}</span>`
    return `
      <div class="rr-dep-row">
        <span class="rr-dep-cell rr-dep-cell--from">${escapeHtml(dep.from)}</span>
        <span class="rr-dep-cell rr-dep-cell--to">${escapeHtml(dep.to)}</span>
        <span class="rr-dep-cell rr-dep-cell--relation">${escapeHtml(dep.relation)}</span>
        <span class="rr-dep-cell rr-dep-cell--iface">${escapeHtml(dep.iface)}</span>
        <span class="rr-dep-cell rr-dep-cell--risk">${riskBadge}</span>
        <span class="rr-dep-cell rr-dep-cell--conf">${dep.conf.toFixed(2)}</span>
        <span class="rr-dep-cell rr-dep-cell--why">${escapeHtml(dep.why)}</span>
      </div>
    `
  }).join("")

  return `<div class="rr-dep-table"><div class="rr-dep-thead-wrap">${header}</div><div class="rr-dep-tbody">${rows}</div></div>`
}

/* ═══════════════════════════════════════════════════════════════
   TEST CASES TAB
   ═══════════════════════════════════════════════════════════════ */

/* ── Test result badge config ───────────────────────────────── */
const TC_RESULT_CONFIG = {
  pass:      { label: "Pass",    bg: "#ddf7eb", text: "#0e9255" },
  fail:      { label: "Fail",    bg: "#fcdad7", text: "#c0362d" },
  blocked:   { label: "Blocked", bg: "#e0e2e7", text: "#3d4350" },
  "not-run": { label: "Not run", bg: "#f0f1f3", text: "#667085" },
}

/* ── Test case template library (by category) ───────────────── */
const TC_TEMPLATE_POOL = {
  auth: [
    {
      description: "Verify that valid credentials authenticate the user and redirect to the dashboard",
      preconditions: "User account exists with known valid credentials; application is accessible",
      steps: "1. Navigate to the login page\n2. Enter a valid registered email address\n3. Enter the correct password\n4. Click 'Sign in'",
      expectedResults: "- Authentication succeeds within 2 seconds\n- User is redirected to the dashboard\n- Session token is stored in a secure HttpOnly cookie\n- Last login timestamp updates",
    },
    {
      description: "Verify that invalid credentials show an error without revealing which field is wrong",
      preconditions: "Application is loaded; user is unauthenticated",
      steps: "1. Navigate to the login page\n2. Enter a valid email address\n3. Enter an incorrect password\n4. Click 'Sign in'",
      expectedResults: "- Authentication fails\n- Error 'Invalid email or password' is displayed\n- No hint about which field is incorrect\n- User remains on the login page",
    },
    {
      description: "Verify that the login form validates email format before submission",
      preconditions: "Application is loaded; user is on the login page",
      steps: "1. Click the email field\n2. Enter 'notanemail' (no @ symbol)\n3. Click the password field\n4. Observe validation feedback",
      expectedResults: "- Inline error: 'Please enter a valid email address'\n- Form submission is prevented\n- Error clears when corrected",
    },
    {
      description: "Verify that the password field masks entered characters by default",
      preconditions: "User is on the login page",
      steps: "1. Click the password input\n2. Type any text",
      expectedResults: "- Characters appear as masked dots (•••)\n- Input type attribute is 'password'\n- A 'Show password' toggle is visible and functional",
    },
    {
      description: "Verify that 'Remember me' persists the session across browser restarts",
      preconditions: "User account exists; user is on the login page",
      steps: "1. Enter valid credentials\n2. Check 'Remember me'\n3. Click 'Sign in'\n4. Close and reopen the browser",
      expectedResults: "- User is automatically logged in after browser restart\n- Token persists in a long-lived cookie (30 days)\n- Sessions without 'Remember me' expire on browser close",
    },
    {
      description: "Verify that 5 consecutive failed login attempts temporarily lock the account",
      preconditions: "Account exists; rate limiting is active",
      steps: "1. Enter correct email, wrong password\n2. Repeat 5 times consecutively",
      expectedResults: "- Account is locked after the 5th failure\n- Message: 'Too many failed attempts. Try again in 15 minutes'\n- Lockout is logged in the security audit trail",
    },
    {
      description: "Verify that the login page meets WCAG 2.1 AA keyboard navigation requirements",
      preconditions: "Application is loaded",
      steps: "1. Open the login page\n2. Navigate all elements using only Tab\n3. Submit the form using Enter",
      expectedResults: "- All inputs are reachable via Tab in logical order\n- ARIA labels are present on all inputs\n- Focus ring is visible (contrast ratio ≥ 3:1)\n- Form submits successfully via keyboard",
    },
    {
      description: "Verify that 'Forgot password?' link navigates to the password reset screen",
      preconditions: "Application is loaded; user is on the login page",
      steps: "1. Click the 'Forgot password?' link",
      expectedResults: "- User navigates to the password reset page\n- Email input receives focus automatically\n- Page title updates to 'Reset your password'",
    },
  ],
  session: [
    {
      description: "Verify that a JWT access token is issued on successful login",
      preconditions: "Valid user credentials are available",
      steps: "1. Send POST /auth/login with valid credentials\n2. Inspect the response body",
      expectedResults: "- HTTP 200 is returned\n- Body contains accessToken (JWT, 15 min expiry) and refreshToken\n- Payload includes userId, roles, and iat",
    },
    {
      description: "Verify that an access token can be refreshed using a valid refresh token",
      preconditions: "User holds a valid unexpired refresh token",
      steps: "1. Send POST /auth/refresh with the refresh token\n2. Inspect the response",
      expectedResults: "- New access token is returned\n- Refresh token is rotated (old one invalidated)\n- HTTP 200 is returned",
    },
    {
      description: "Verify that expired access tokens are rejected with HTTP 401",
      preconditions: "An expired access token is available",
      steps: "1. Send an authenticated request with an expired token",
      expectedResults: "- HTTP 401 Unauthorized is returned\n- Error code 'TOKEN_EXPIRED' in response body\n- No data is returned",
    },
    {
      description: "Verify that sessions expire after the configured inactivity period",
      preconditions: "User is authenticated; inactivity timeout is 30 minutes",
      steps: "1. Log in successfully\n2. Leave the browser idle for 31 minutes",
      expectedResults: "- Session is automatically invalidated\n- User is redirected to login with 'Session expired' message\n- Refresh token is revoked server-side",
    },
    {
      description: "Verify that logging out revokes all active sessions for the user",
      preconditions: "User is logged in from two devices simultaneously",
      steps: "1. Log out from device A\n2. Attempt an authenticated request from device B",
      expectedResults: "- Device A session is invalidated immediately\n- Device B receives HTTP 401 on next request\n- All refresh tokens for the user are revoked",
    },
    {
      description: "Verify that concurrent sessions from multiple devices are tracked correctly",
      preconditions: "User has active sessions on three devices",
      steps: "1. Navigate to Account Security settings\n2. View 'Active sessions' section",
      expectedResults: "- All three sessions are listed with device, location, and last active time\n- User can individually revoke any session",
    },
  ],
  team: [
    {
      description: "Verify that an admin can create a new team with a unique name",
      preconditions: "User has admin role; application is accessible",
      steps: "1. Navigate to Teams Management\n2. Click 'Create New Team'\n3. Enter a unique team name\n4. Click 'Create'",
      expectedResults: "- Team is created successfully\n- Creator is assigned as team owner\n- Confirmation toast is displayed\n- Team appears in the list immediately",
    },
    {
      description: "Verify that duplicate team names within the same organisation are rejected",
      preconditions: "A team named 'Engineering' already exists",
      steps: "1. Attempt to create a second team named 'Engineering'",
      expectedResults: "- Error: 'A team with this name already exists'\n- Team is not created\n- Form stays open for correction",
    },
    {
      description: "Verify that members can be assigned Owner, Admin, or Member roles",
      preconditions: "Team exists; current user has Owner role",
      steps: "1. Open team settings\n2. Select a member\n3. Change role to Admin\n4. Save",
      expectedResults: "- Role saved as 'Admin'\n- Badge updates in member list\n- Change is recorded in the audit trail",
    },
    {
      description: "Verify that removing a member immediately revokes their access to team resources",
      preconditions: "Team has at least 2 members; current user has Owner role",
      steps: "1. Open team settings\n2. Click 'Remove from team' for a member\n3. Confirm the action",
      expectedResults: "- Member no longer appears in the list\n- Team resource access is revoked immediately\n- Audit log records the removal with timestamp and actor",
    },
    {
      description: "Verify that a non-admin user cannot access team creation",
      preconditions: "User has 'member' role only",
      steps: "1. Navigate to Teams Management\n2. Observe available actions",
      expectedResults: "- 'Create New Team' button is hidden or disabled\n- Accessing the URL directly returns HTTP 403",
    },
    {
      description: "Verify that team settings changes are saved and reflected immediately",
      preconditions: "User is the team owner; team has a name and description",
      steps: "1. Open team settings\n2. Update the team name and description\n3. Click 'Save'",
      expectedResults: "- Changes saved with confirmation toast\n- Updated values appear in the team list without reload\n- Audit trail records the change",
    },
  ],
  requirements: [
    {
      description: "Verify that a new module can be created under an existing epic",
      preconditions: "At least one epic exists; user has write access",
      steps: "1. Open an epic in Requirements view\n2. Click 'Add Module'\n3. Enter a title and save",
      expectedResults: "- Module appears under the epic immediately\n- Auto-generated ID follows [EPIC]-[NNN] format\n- Module is editable on creation",
    },
    {
      description: "Verify that a module cannot be saved with an empty title",
      preconditions: "User is on the 'Add Module' form within an epic",
      steps: "1. Leave the title field empty\n2. Click 'Save'",
      expectedResults: "- Validation error 'Title is required' is shown\n- Module is not created\n- Form remains open for correction",
    },
    {
      description: "Verify that editing a module title updates all linked sprint references",
      preconditions: "Module exists and is assigned to an active sprint",
      steps: "1. Open the module in Requirements view\n2. Edit the title\n3. Save changes",
      expectedResults: "- Title updates in Requirements view\n- Sprint board reflects the updated title\n- Audit log records the change",
    },
    {
      description: "Verify that deleting a module requires confirmation and cascades correctly",
      preconditions: "Module exists with tasks but no active sprint assignment",
      steps: "1. Open the module\n2. Click 'Delete module'\n3. Confirm in the dialog",
      expectedResults: "- Confirmation dialog lists tasks to be deleted\n- Module and tasks removed on confirmation\n- Sprint references are unlinked\n- Action is audit-logged",
    },
    {
      description: "Verify that acceptance law statuses can be toggled from the module detail view",
      preconditions: "Module has at least one acceptance law; user has write access",
      steps: "1. Open module detail\n2. Navigate to 'Acceptance Laws' tab\n3. Toggle a law status to 'Pass'",
      expectedResults: "- Law status updates to the green 'Pass' badge\n- Change is attributed to the current user with timestamp",
    },
  ],
  dependencies: [
    {
      description: "Verify that adding a dependency between modules updates the dependency graph",
      preconditions: "Two modules exist with no existing dependency between them",
      steps: "1. Open module A → Dependencies tab\n2. Add module B as an upstream dependency\n3. Save",
      expectedResults: "- Edge B → A appears in the graph\n- Module B's dependents list includes A",
    },
    {
      description: "Verify that the system prevents circular dependency relationships",
      preconditions: "Module A depends on B; user attempts to make B depend on A",
      steps: "1. Open module B\n2. Attempt to add module A as a dependency",
      expectedResults: "- Error 'Circular dependency detected' is displayed\n- The dependency is not saved",
    },
    {
      description: "Verify that dependency risk levels are displayed with correct colour coding",
      preconditions: "Dependencies exist at each risk level (High, Medium, Low)",
      steps: "1. Open a module with mixed-risk dependencies\n2. Observe the Risk column",
      expectedResults: "- High: red badge\n- Medium: amber badge\n- Low: green badge\n- Risk basis is shown in the 'Why' column",
    },
    {
      description: "Verify that removing a dependency updates the graph in real time",
      preconditions: "An established dependency between two modules exists",
      steps: "1. Open the module detail → Dependencies tab\n2. Remove a dependency\n3. Confirm",
      expectedResults: "- Dependency removed from the table immediately\n- Graph reflects the removal without a page reload",
    },
    {
      description: "Verify that confidence scores are displayed accurately for each dependency",
      preconditions: "Dependencies are defined with confidence scores",
      steps: "1. Open a module with dependencies\n2. Observe the Conf column",
      expectedResults: "- Values displayed as two-decimal decimals (e.g. 0.92)\n- All values fall within the 0.00–1.00 range",
    },
  ],
  generic: [
    {
      description: "Verify that the module renders correctly at 1440px desktop viewport",
      preconditions: "Module is implemented; viewport is 1440px wide",
      steps: "1. Load the module at 1440px viewport\n2. Inspect layout for overflow or misalignment",
      expectedResults: "- No horizontal overflow\n- All interactive elements are fully visible\n- No content is hidden unintentionally",
    },
    {
      description: "Verify that the module loads within acceptable performance thresholds",
      preconditions: "Module has ≥50 records; standard broadband connection",
      steps: "1. Navigate to the module\n2. Measure Time to Interactive (TTI) using browser dev tools",
      expectedResults: "- Initial load completes in under 1.5 seconds\n- TTI is under 3 seconds\n- Cumulative Layout Shift (CLS) < 0.1",
    },
    {
      description: "Verify that an empty state is displayed when no records exist",
      preconditions: "Module has zero records",
      steps: "1. Navigate to the module with no data\n2. Observe the content area",
      expectedResults: "- Empty state illustration or message is displayed\n- 'Add new' action is available and functional\n- No error messages appear",
    },
    {
      description: "Verify that API errors surface with actionable messaging",
      preconditions: "Backend returns HTTP 500 for the module's primary API call",
      steps: "1. Simulate a server error via proxy rule or feature flag\n2. Navigate to the module",
      expectedResults: "- Error state is displayed instead of empty or broken UI\n- A 'Retry' option is available\n- Error details are sent to the monitoring system",
    },
    {
      description: "Verify that all interactive form elements have visible focus indicators",
      preconditions: "Module contains at least one form; user navigates via keyboard",
      steps: "1. Tab through all form elements\n2. Observe the focus ring on each element",
      expectedResults: "- Focus ring is visually distinct (contrast ratio ≥ 3:1)\n- Tab order follows a logical page flow\n- All controls are reachable",
    },
    {
      description: "Verify that module data exports match the on-screen records exactly",
      preconditions: "Module has ≥10 records; export feature is available",
      steps: "1. Note the total record count on screen\n2. Click 'Export'\n3. Open the exported file",
      expectedResults: "- Exported row count matches on-screen total\n- All visible columns are present in the export\n- Data values are identical to on-screen values",
    },
    {
      description: "Verify that real-time updates appear without a manual page reload",
      preconditions: "WebSocket or poll-based live update is configured",
      steps: "1. Open the module in two separate browser windows\n2. Modify a record in window A",
      expectedResults: "- Window B reflects the change within 3 seconds\n- No page refresh is required",
    },
    {
      description: "Verify that pagination handles large datasets without performance degradation",
      preconditions: "Module has 500+ records",
      steps: "1. Navigate to the module\n2. Scroll to the bottom of the list\n3. Measure scroll FPS",
      expectedResults: "- Scroll remains fluid (≥30 FPS)\n- Only visible records render in the DOM\n- Total count displays accurately",
    },
  ],
}

/* ── Deterministic test result per case ─────────────────────── */
function getTestCaseResult(moduleStatus, index, seed) {
  // [pass prob, fail prob, blocked prob] — remainder = "not-run"
  const weights = {
    "done":        [0.90, 0.04, 0.02],
    "merged-qa":   [0.80, 0.08, 0.05],
    "validating":  [0.72, 0.10, 0.08],
    "review":      [0.65, 0.08, 0.06],
    "in-progress": [0.45, 0.12, 0.10],
    "to-do":       [0.05, 0.02, 0.03],
    "blocked":     [0.35, 0.18, 0.28],
  }
  const w = weights[moduleStatus] ?? weights["in-progress"]
  const rng = ((seed ^ (seed >>> (index + 3))) * (index * 0x9e3779b9 + 0xd1b54a35)) >>> 0
  const r = rng / 0xFFFFFFFF
  if (r < w[0]) return "pass"
  if (r < w[0] + w[1]) return "fail"
  if (r < w[0] + w[1] + w[2]) return "blocked"
  return "not-run"
}

/* ── Retrieve test cases for a module ───────────────────────── */
function getModuleTestCases(moduleId, moduleStatus) {
  const prefix = moduleId.split("-")[0].toUpperCase()
  const categoryMap = {
    LOG: [...TC_TEMPLATE_POOL.auth,  ...TC_TEMPLATE_POOL.session],
    AUT: [...TC_TEMPLATE_POOL.auth,  ...TC_TEMPLATE_POOL.session],
    TEM: [...TC_TEMPLATE_POOL.team,  ...TC_TEMPLATE_POOL.generic],
    REQ: [...TC_TEMPLATE_POOL.requirements, ...TC_TEMPLATE_POOL.generic],
    DEP: [...TC_TEMPLATE_POOL.dependencies, ...TC_TEMPLATE_POOL.generic],
    SET: TC_TEMPLATE_POOL.generic,
    KAN: TC_TEMPLATE_POOL.generic,
  }
  const pool = categoryMap[prefix] ?? TC_TEMPLATE_POOL.generic
  const seed = hashModuleId(moduleId)
  const count = 5 + (seed % 8)  // 5–12 test cases per module

  // Deterministic Fisher-Yates shuffle
  const indices = Array.from({ length: pool.length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const rng = (seed * (i + 0x5bd1e995)) >>> 0
    const j = rng % (i + 1)
    const tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp
  }

  return indices.slice(0, Math.min(count, pool.length)).map((poolIdx, i) => ({
    ...pool[poolIdx],
    result: getTestCaseResult(moduleStatus, i, seed),
  }))
}

/* ── Compute pass/total for the nav progress bar ────────────── */
function computeTestProgress(testCases) {
  let pass = 0
  for (const tc of testCases) {
    if (tc.result === "pass") pass++
  }
  return { pass, total: testCases.length }
}

/* ── Progress info for nav bar (adapts per active tab) ──────── */
function getProgressInfo(activeTab, mod, moduleData) {
  if (activeTab === "test-cases") {
    const tcs = getModuleTestCases(mod.id, mod.status)
    const { pass, total } = computeTestProgress(tcs)
    return {
      percent: total === 0 ? 0 : Math.round((pass / total) * 100),
      label: `${pass}/${total}`,
    }
  }
  if (activeTab === "unit-tests") {
    return { percent: mod.testPercent, label: `${mod.testPercent}%` }
  }
  if (activeTab === "acceptance-laws") {
    const statuses = getAcceptanceLawStatuses(mod.id, mod.status)
    const pass = statuses.filter(s => s === "pass").length
    return {
      percent: Math.round((pass / statuses.length) * 100),
      label: `${pass}/${statuses.length}`,
    }
  }
  if (activeTab === "tasks") {
    return { percent: computeDetailProgress(moduleData), label: null }
  }
  return { percent: computeDetailProgress(moduleData), label: null }
}

/* ── Unit tests tab ─────────────────────────────────────────── */
const UNIT_TEST_SUITES = [
  { prefix: "LOG", suites: ["auth.service.spec", "session.service.spec", "token.provider.spec"] },
  { prefix: "AUT", suites: ["auth.service.spec", "oauth.handler.spec", "jwt.middleware.spec"] },
  { prefix: "TEM", suites: ["team.service.spec", "roles.guard.spec", "invite.flow.spec"] },
  { prefix: "REQ", suites: ["requirements.crud.spec", "acceptance-law.validator.spec", "version.log.spec"] },
  { prefix: "DEP", suites: ["dep-graph.renderer.spec", "cycle.detector.spec", "boundary.analyser.spec"] },
  { prefix: "SET", suites: ["profile.service.spec", "media.upload.spec"] },
  { prefix: "KAN", suites: ["sprint.service.spec", "board.filter.spec", "status.transition.spec"] },
]

const UT_RESULT_CONFIG = {
  pass:    { label: "Pass",    bg: "#ddf7eb", text: "#0e9255" },
  fail:    { label: "Fail",    bg: "#fcdad7", text: "#c0362d" },
  skipped: { label: "Skipped", bg: "#f0f1f3", text: "#667085" },
}

function getUnitTestSuites(moduleId, moduleStatus) {
  const prefix = moduleId.split("-")[0].toUpperCase()
  const suiteEntry = UNIT_TEST_SUITES.find(s => s.prefix === prefix)
  const suiteNames = suiteEntry ? suiteEntry.suites : ["module.service.spec", "module.handler.spec"]
  const seed = hashModuleId(moduleId)

  const passBias = {
    "done":        0.96, "merged-qa": 0.88, "validating": 0.78, "review": 0.72,
    "in-progress": 0.55, "to-do":     0.20, "blocked":    0.42,
  }[moduleStatus] ?? 0.55

  return suiteNames.map((name, si) => {
    const testsCount = 4 + ((seed ^ (si * 0x3f)) >>> 0) % 7
    const tests = Array.from({ length: testsCount }, (_, ti) => {
      const rng = ((seed ^ (si * 0x9e37 + ti * 0x1b5e)) * (ti + 0xd1b5)) >>> 0
      const r = rng / 0xFFFFFFFF
      const status = r < passBias ? "pass" : r < passBias + 0.06 ? "skipped" : "fail"
      const descs = [
        "should return correct result for valid input",
        "should throw when required param is missing",
        "should reject unauthorised access",
        "should handle empty payload gracefully",
        "should call dependency once per invocation",
        "should rollback transaction on error",
        "should emit event after successful completion",
        "should apply rate limit policy correctly",
        "should sanitise user-supplied string input",
        "should return cached result on repeat call",
      ]
      return {
        id: `${moduleId}-UT-${si}-${ti}`,
        description: descs[((seed + si * 7 + ti * 3) ^ (seed >>> 2)) % descs.length],
        status,
        duration: `${((rng % 120) + 5)}ms`,
      }
    })
    const passCount  = tests.filter(t => t.status === "pass").length
    const failCount  = tests.filter(t => t.status === "fail").length
    const skipCount  = tests.filter(t => t.status === "skipped").length
    return { name, tests, passCount, failCount, skipCount }
  })
}

function renderUnitTestsTab(mod) {
  const suites = getUnitTestSuites(mod.id, mod.status)
  const allTests = suites.flatMap((suite) =>
    suite.tests.map((test) => ({ suiteName: suite.name, test }))
  )

  const header = `
    <div class="rr-tc-thead">
      <span class="rr-tc-th rr-tc-th--no">No.</span>
      <span class="rr-tc-th rr-tc-th--desc">Suite</span>
      <span class="rr-tc-th rr-tc-th--pre">Test case</span>
      <span class="rr-tc-th rr-tc-th--steps">Duration</span>
      <span class="rr-tc-th rr-tc-th--result">Result</span>
    </div>
  `

  const rows = allTests.map(({ suiteName, test }, index) => {
    const cfg = UT_RESULT_CONFIG[test.status] ?? UT_RESULT_CONFIG.pass
    return `
      <div class="rr-tc-row">
        <span class="rr-tc-cell rr-tc-cell--no">${index + 1}</span>
        <span class="rr-tc-cell rr-tc-cell--desc">${escapeHtml(suiteName)}</span>
        <span class="rr-tc-cell rr-tc-cell--pre">${escapeHtml(test.description)}</span>
        <span class="rr-tc-cell rr-tc-cell--steps">${escapeHtml(test.duration)}</span>
        <span class="rr-tc-cell rr-tc-cell--result"><span class="rr-tc-badge" style="background:${cfg.bg};color:${cfg.text}">${escapeHtml(cfg.label)}</span></span>
      </div>
    `
  }).join("")

  return `
    <div class="rr-tc-table">
      <div class="rr-tc-thead-wrap">${header}</div>
      <div class="rr-tc-tbody">${rows}</div>
    </div>
  `
}

/* ── Render test cases tab ──────────────────────────────────── */
function renderTestCasesTab(mod) {
  const testCases = getModuleTestCases(mod.id, mod.status)

  const header = `
    <div class="rr-tc-thead">
      <span class="rr-tc-th rr-tc-th--no">No. ${ICON.arrowDown}</span>
      <span class="rr-tc-th rr-tc-th--desc">Description</span>
      <span class="rr-tc-th rr-tc-th--pre">Pre-conditions</span>
      <span class="rr-tc-th rr-tc-th--steps">Steps</span>
      <span class="rr-tc-th rr-tc-th--expected">Expected results</span>
      <span class="rr-tc-th rr-tc-th--result">Result</span>
    </div>
  `

  const rows = testCases.map((tc, i) => {
    const cfg = TC_RESULT_CONFIG[tc.result] ?? TC_RESULT_CONFIG["not-run"]
    const badge = `<span class="rr-tc-badge" style="background:${cfg.bg};color:${cfg.text}">${escapeHtml(cfg.label)}</span>`
    const stepsHtml    = escapeHtml(tc.steps).replace(/\n/g, "<br>")
    const expectedHtml = escapeHtml(tc.expectedResults).replace(/\n/g, "<br>")
    return `
      <div class="rr-tc-row">
        <span class="rr-tc-cell rr-tc-cell--no">${i + 1}</span>
        <span class="rr-tc-cell rr-tc-cell--desc">${escapeHtml(tc.description)}</span>
        <span class="rr-tc-cell rr-tc-cell--pre">${escapeHtml(tc.preconditions)}</span>
        <span class="rr-tc-cell rr-tc-cell--steps">${stepsHtml}</span>
        <span class="rr-tc-cell rr-tc-cell--expected">${expectedHtml}</span>
        <span class="rr-tc-cell rr-tc-cell--result">${badge}</span>
      </div>
    `
  }).join("")

  return `
    <div class="rr-tc-table">
      <div class="rr-tc-thead-wrap">${header}</div>
      <div class="rr-tc-tbody">${rows}</div>
    </div>
  `
}

/* ── UAT Issues config & data ──────────────────────────────── */
const UAT_SCOPE_CONFIG = {
  "FE":     { bg: "#fef4e6", text: "#f79009" },
  "BE":     { bg: "#dce9fc", text: "#0067da" },
  "BE&FE":  { bg: "#ede8f5", text: "#7037c0" },
  "Devops": { bg: "#d4f5e3", text: "#0e9255" },
}

const UAT_STATUS_CONFIG = {
  "merged":      { bg: "#fbc6cd", text: "#d13245", label: "Merged" },
  "open":        { bg: "#fef4e6", text: "#f79009",  label: "Open" },
  "in-progress": { bg: "#dce9fc", text: "#0067da",  label: "In Progress" },
  "fixed":       { bg: "#d4f5e3", text: "#0e9255",  label: "Fixed" },
  "closed":      { bg: "#e0e2e7", text: "#3d4350",  label: "Closed" },
  "to-do":       { bg: "#e0e2e7", text: "#3d4350",  label: "To do" },
}

function getModuleUATIssues(moduleId) {
  const issueDb = {
    "LOG-001": [
      { id: "UAT-001", scope: "FE",     title: "Document version mismatch on login screen.",         priority: "urgent", date: "07/02/26", assignees: ["u4"], status: "merged" },
      { id: "UAT-002", scope: "BE",     title: "Login endpoint returns 500 on empty password.",      priority: "high",   date: "08/02/26", assignees: ["u2"], status: "fixed" },
      { id: "UAT-003", scope: "FE",     title: "Remember me checkbox state not persisted.",          priority: "medium", date: "10/02/26", assignees: ["u5"], status: "in-progress" },
      { id: "UAT-004", scope: "BE&FE",  title: "CSRF token missing on form resubmit.",               priority: "high",   date: "11/02/26", assignees: ["u4"], status: "open" },
      { id: "UAT-005", scope: "FE",     title: "Password field autofill breaks validation.",         priority: "low",    date: "12/02/26", assignees: ["u2"], status: "to-do" },
      { id: "UAT-006", scope: "BE",     title: "Rate limiting not enforced per IP.",                 priority: "urgent", date: "08/02/26", assignees: ["u5"], status: "fixed" },
      { id: "UAT-007", scope: "FE",     title: "Error message overlaps button on small viewports.",  priority: "low",    date: "14/02/26", assignees: ["u4"], status: "closed" },
      { id: "UAT-008", scope: "BE&FE",  title: "Session cookie missing HttpOnly flag.",              priority: "high",   date: "09/02/26", assignees: ["u2"], status: "merged" },
      { id: "UAT-009", scope: "Devops", title: "CI pipeline fails on lint step.",                    priority: "medium", date: "15/02/26", assignees: ["u1"], status: "in-progress" },
      { id: "UAT-010", scope: "FE",     title: "Keyboard navigation skips submit button.",           priority: "medium", date: "16/02/26", assignees: ["u5"], status: "to-do" },
    ],
    "LOG-002": [
      { id: "UAT-011", scope: "BE",     title: "OAuth token not revoked on logout.",                 priority: "urgent", date: "10/02/26", assignees: ["u6"], status: "in-progress" },
      { id: "UAT-012", scope: "FE",     title: "Google sign-in button missing ARIA label.",          priority: "low",    date: "11/02/26", assignees: ["u1"], status: "to-do" },
      { id: "UAT-013", scope: "BE&FE",  title: "GitHub OAuth state param not validated.",            priority: "high",   date: "09/02/26", assignees: ["u6"], status: "open" },
      { id: "UAT-014", scope: "BE",     title: "Refresh token not rotated on use.",                  priority: "urgent", date: "08/02/26", assignees: ["u1"], status: "fixed" },
      { id: "UAT-015", scope: "FE",     title: "Account linking modal z-index conflict.",            priority: "medium", date: "12/02/26", assignees: ["u6"], status: "closed" },
    ],
  }

  if (issueDb[moduleId]) return issueDb[moduleId]

  const seed = hashModuleId(moduleId)
  const scopes   = ["FE", "BE", "BE&FE", "Devops"]
  const statuses = ["open", "in-progress", "fixed", "merged", "closed", "to-do"]
  const titles = [
    "UI component renders incorrectly in Safari.",
    "API response missing required field.",
    "Data validation inconsistency between front/back.",
    "Environment variable missing in staging.",
    "Loading spinner not dismissed on error.",
    "Tooltip overflows viewport on edge cases.",
    "Date format inconsistent across locales.",
    "Button disabled state not accessible.",
  ]
  const count = 4 + (seed % 5)
  return Array.from({ length: count }, (_, i) => ({
    id: `${moduleId}-UAT-${i + 1}`,
    scope:    scopes[((seed * (i + 1)) ^ (seed >>> 3)) % scopes.length],
    title:    titles[((seed + i * 7) ^ (seed >>> 2)) % titles.length],
    priority: ["urgent","high","medium","low"][((seed ^ (i * 0x1f)) >>> 0) % 4],
    date:     `${String(15 + (i % 13)).padStart(2,"0")}/02/26`,
    assignees: [["u1","u2","u3","u4","u5","u6","u7","u8"][(seed + i) % 8]],
    status:   statuses[((seed ^ (i * 0x2b)) >>> 0) % statuses.length],
  }))
}

/* ── Detail panel: UAT Issues tab ──────────────────────────── */
function getUATFilterOptions(issues) {
  const priorities = []
  const statuses = []
  for (const issue of issues || []) {
    if (!priorities.find(p => p.value === issue.priority)) {
      const cfg = PRIORITY_CONFIG[issue.priority]
      priorities.push({ value: issue.priority, label: cfg ? cfg.label : issue.priority, dot: cfg ? cfg.color : undefined })
    }
    if (!statuses.find(s => s.value === issue.status)) {
      const cfg = UAT_STATUS_CONFIG[issue.status] || UAT_STATUS_CONFIG["to-do"]
      statuses.push({ value: issue.status, label: cfg.label, dot: cfg.bg })
    }
  }
  return { priorities, statuses }
}

function renderUATFilterBar(detailState, issues) {
  const opts = getUATFilterOptions(issues)
  const defs = [
    { id: "priority", label: "Priority", options: opts.priorities, selected: detailState.filters.priority },
    { id: "statuses", label: "Status",   options: opts.statuses,   selected: detailState.filters.statuses },
  ]

  const buttons = defs.map(f => {
    const activeCount = f.selected.length
    const displayLabel = activeCount > 0 ? `${f.label} (${activeCount})` : f.label
    const isOpen = detailState.openFilter === f.id
    return `
      <span class="rr-kb-filter-anchor">
        <button type="button" class="rr-kb-filter-btn ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-active" : ""}"
          data-action="toggle-filter" data-filter="${f.id}">
          ${escapeHtml(displayLabel)} ${ICON.caretDown}
        </button>
        ${renderDetailFilterDropdown(f.id, f.options, f.selected, isOpen)}
      </span>
    `
  }).join("")

  return `
    <div class="rr-kb-filters rr-detail-filters">
      <div class="rr-kb-filter-buttons">${buttons}</div>
      <div class="rr-kb-search-wrap">
        <div class="rr-kb-search">
          ${ICON.search}
          <input type="search" class="rr-kb-search-input" id="rr-detail-search" placeholder="Search issues" />
        </div>
      </div>
    </div>
  `
}

function renderUATIssuesTab(mod, detailState) {
  const issues = getModuleUATIssues(mod.id)

  // Apply detail-level filters and search
  const q = (detailState.searchQuery || "").toLowerCase().trim()
  let filtered = (issues || []).filter(issue => {
    if (detailState.filters.priority.length && !detailState.filters.priority.includes(issue.priority)) return false
    if (detailState.filters.statuses.length && !detailState.filters.statuses.includes(issue.status)) return false
    if (q) {
      const hay = `${issue.title} ${issue.id} ${issue.scope}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  const filterBarHtml = renderUATFilterBar(detailState, issues)

  const ths = `
    <div class="rr-uat-thead">
      <span class="rr-uat-th rr-uat-th--scope">Scope</span>
      <span class="rr-uat-th rr-uat-th--issue">Issue</span>
      <span class="rr-uat-th rr-uat-th--priority">
        <button type="button" class="rr-kb-sort-btn is-active" data-action="noop">
          Priority ${ICON.arrowDown}
        </button>
      </span>
      <span class="rr-uat-th rr-uat-th--date">Date</span>
      <span class="rr-uat-th rr-uat-th--assignee">Assignee</span>
      <span class="rr-uat-th rr-uat-th--pr">PR Link</span>
      <span class="rr-uat-th rr-uat-th--status">Status Stg/Dev</span>
    </div>
  `

  if (issues.length === 0) {
    return `
      <div class="rr-uat-table">
        ${ths}
        <div class="rr-uat-tbody">
          <div class="rr-uat-empty"><p>No UAT issues found for this module.</p></div>
        </div>
      </div>
    `
  }

  const rows = filtered.map(issue => {
    const scopeCfg  = UAT_SCOPE_CONFIG[issue.scope] ?? UAT_SCOPE_CONFIG["FE"]
    const statusCfg = UAT_STATUS_CONFIG[issue.status] ?? UAT_STATUS_CONFIG["to-do"]
    const priCfg    = PRIORITY_CONFIG[issue.priority]
    return `
      <div class="rr-uat-row">
        <span class="rr-uat-cell rr-uat-cell--scope">
          <span class="rr-uat-scope-badge" style="background:${scopeCfg.bg};color:${scopeCfg.text}">${escapeHtml(issue.scope)}</span>
        </span>
        <span class="rr-uat-cell rr-uat-cell--issue">${escapeHtml(issue.title)}</span>
        <span class="rr-uat-cell rr-uat-cell--priority">
          ${priCfg ? `<span class="rr-kb-priority" style="color:${priCfg.color}">${ICON[priCfg.icon]}<span>${escapeHtml(priCfg.label)}</span></span>` : ""}
        </span>
        <span class="rr-uat-cell rr-uat-cell--date">${escapeHtml(issue.date)}</span>
        <span class="rr-uat-cell rr-uat-cell--assignee">${renderAvatarGroup(issue.assignees, 0)}</span>
        <span class="rr-uat-cell rr-uat-cell--pr">
          <button type="button" class="rr-detail-pr-link-btn" data-action="noop" title="View PR">${ICON.github}</button>
        </span>
        <span class="rr-uat-cell rr-uat-cell--status">
          <span class="rr-uat-status-badge" style="background:${statusCfg.bg};color:${statusCfg.text}">${escapeHtml(statusCfg.label)}</span>
        </span>
      </div>
    `
  }).join("")

  return `
    ${filterBarHtml}
    <div class="rr-uat-table">
      ${ths}
      <div class="rr-uat-tbody">${rows}</div>
    </div>
  `
}

/* ── Detail panel: overview tab ────────────────────────────── */
function renderOverviewTab(mod, moduleData) {
  const epicPrefix = mod.id.split("-")[0]
  const content = OVERVIEW_CONTENT[mod.id] || {}
  const statusCfg = DETAIL_STATUS_CONFIG[mod.status] || DETAIL_STATUS_CONFIG["to-do"]
  const protoRoute = content.protoRoute || `/${epicPrefix.toLowerCase()}/m/${mod.id.toLowerCase()}`
  const overviewText = content.description ||
    `Manages the ${mod.title} workflow within the ${epicPrefix} epic. ${mod.tasksComplete} of ${mod.tasksTotal} implementation tasks are complete with ${mod.testPercent}% test coverage.`

  const features = moduleData.features || []
  const featureRows = features.map(f => {
    const desc = content.features?.[f.id] ||
      `Implementation of the ${f.title} functionality covering all associated tasks, error handling, and edge-case coverage.`
    return `
      <div class="rr-overview-feature">
        <h3 class="rr-overview-feature-title">${escapeHtml(f.id)} — ${escapeHtml(f.title)}</h3>
        <p class="rr-overview-feature-desc">${escapeHtml(desc)}</p>
      </div>
    `
  }).join("")

  return `
    <div class="rr-overview-body">
      <div class="rr-overview-title-row">
        <span class="rr-overview-title">${escapeHtml(mod.id)} — ${escapeHtml(mod.title)}</span>
        <span class="rr-overview-badge" style="background:${statusCfg.bg};color:${statusCfg.text}">${escapeHtml(statusCfg.label)}</span>
      </div>
      <button type="button" class="rr-overview-proto-btn">
        ${ICON.link}
        Prototype
      </button>
      <div class="rr-overview-desc-section">
        <span class="rr-overview-section-label">Description</span>
        <div class="rr-overview-divider"></div>
        <div class="rr-overview-meta-row">
          <div class="rr-overview-meta-col">
            <span class="rr-overview-meta-label">ID</span>
            <span class="rr-overview-meta-value">${escapeHtml(mod.id)}</span>
          </div>
          <div class="rr-overview-meta-col">
            <span class="rr-overview-meta-label">Title</span>
            <span class="rr-overview-meta-value">${escapeHtml(mod.title)}</span>
          </div>
          <div class="rr-overview-meta-col">
            <span class="rr-overview-meta-label">Epic</span>
            <span class="rr-overview-meta-value">${escapeHtml(epicPrefix)}</span>
          </div>
          <div class="rr-overview-meta-col">
            <span class="rr-overview-meta-label">Status</span>
            <span class="rr-overview-meta-value">${escapeHtml(statusCfg.label)}</span>
          </div>
          <div class="rr-overview-meta-col">
            <span class="rr-overview-meta-label">Prototype route</span>
            <span class="rr-overview-meta-value">${escapeHtml(protoRoute)}</span>
          </div>
        </div>
      </div>
      <div class="rr-overview-divider"></div>
      <h2 class="rr-overview-h">Overview</h2>
      <p class="rr-overview-text">${escapeHtml(overviewText)}</p>
      <div class="rr-overview-divider"></div>
      <h2 class="rr-overview-h">Functionalities</h2>
      ${featureRows}
      <div class="rr-overview-divider"></div>
    </div>
  `
}

/* ── Detail panel: placeholder tab content ─────────────────── */
function renderDetailTabContent(tabId, mod, moduleData, detailState) {
  if (tabId === "overview") return renderOverviewTab(mod, moduleData)
  if (tabId === "acceptance-laws") return renderAcceptanceLawsTab(mod)
  if (tabId === "tasks") return renderDetailTasksTab(moduleData, detailState)
  if (tabId === "dependencies") return renderDependenciesTab(mod)
  if (tabId === "unit-tests") return renderUnitTestsTab(mod)
  if (tabId === "test-cases") return renderTestCasesTab(mod)
  if (tabId === "uat-issues") return renderUATIssuesTab(mod, detailState)

  const placeholders = {
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
  const progressInfo = getProgressInfo(detailState.activeTab, mod, moduleData)

  return `
    <div class="rr-detail-backdrop" data-action="close-detail"></div>
    <div class="rr-detail-panel">
      ${renderDetailHeader(mod)}
      ${renderDetailNav(detailState.activeTab, progressInfo.percent, progressInfo.label)}
      <div class="rr-detail-content">
        ${renderDetailTabContent(detailState.activeTab, mod, moduleData, detailState)}
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
      <div class="rr-modal-overlay" id="rr-kb-modal-overlay"></div>
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
    modalOverlay:   root.querySelector("#rr-kb-modal-overlay"),
  }

  const state = {
    activeSprintId: "sprint-13",
    sortCol: "priority",
    sortDir: "desc",
    searchQuery: "",
    collapsedGroups: new Set(),
    sprintDropdownOpen: false,
    modal: null,
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
      activeTab: "overview",
        collapsedFeatures: new Set(),
        // Detail-level filters/search (for Tasks tab)
        filters: {
          priority: [],
          statuses: [],
        },
        openFilter: null,
        searchQuery: "",
    },
  }

  function getActiveSprint() {
    return SPRINTS.find(s => s.id === state.activeSprintId) || SPRINTS[0]
  }

  /* ── Modal overlay ───────────────────────────────────────── */
  function renderModals() {
    if (!state.modal) {
      els.modalOverlay.innerHTML = ""
      els.modalOverlay.classList.remove("is-open")
      return
    }

    const DONE = new Set(["validated", "merged-qa", "closed"])

    let iconHtml, iconBg, title, bodyHtml, buttonsHtml

    if (state.modal.type === "confirm") {
      iconBg = "#fcdad7"
      iconHtml = ICON.flagCheckered
      title = "Close Sprint"
      bodyHtml = `Total requirements included: ${escapeHtml(String(state.modal.total))}`
      buttonsHtml = `
        <button type="button" class="rr-modal-btn rr-modal-btn--neutral" data-action="close-sprint-cancel">Cancel</button>
        <button type="button" class="rr-modal-btn rr-modal-btn--primary" data-action="close-sprint-confirm">Confirm</button>
      `
    } else {
      iconBg = "#fef4e6"
      iconHtml = ICON.warning
      title = "Requirements not fully completed"
      const lines = state.modal.items.map(m => escapeHtml(`${m.id} \u2013 ${m.title}`)).join("<br>")
      bodyHtml = `The following requirements are not completed:<br><br>${lines}<br><br>You can still close the sprint — incomplete items will be carried over to the next sprint.`
      buttonsHtml = `
        <button type="button" class="rr-modal-btn rr-modal-btn--neutral" data-action="close-sprint-cancel">Cancel</button>
        <button type="button" class="rr-modal-btn rr-modal-btn--primary" data-action="close-sprint-confirm">Close anyway</button>
      `
    }

    els.modalOverlay.innerHTML = `
      <div class="rr-modal-backdrop" data-action="close-sprint-cancel"></div>
      <div class="rr-modal-popup">
        <div class="rr-modal-content">
          <div class="rr-modal-icon" style="background:${iconBg}">${iconHtml}</div>
          <div class="rr-modal-text">
            <p class="rr-modal-title">${escapeHtml(title)}</p>
            <p class="rr-modal-body">${bodyHtml}</p>
          </div>
        </div>
        <div class="rr-modal-buttons">${buttonsHtml}</div>
      </div>
    `
    els.modalOverlay.classList.add("is-open")
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

    // Restore search value without re-creating the input
    const searchInput = root.querySelector("#rr-kb-search")
    if (searchInput && state.searchQuery) {
      searchInput.value = state.searchQuery
    }

    /* Detail panel */
    renderDetail()
    renderModals()
  }

  function renderDetail() {
    if (state.detail.open && state.detail.moduleId) {
      const mod = findModuleById(state.detail.moduleId)
      if (mod) {
        const isAlreadyOpen = els.detailOverlay.classList.contains("is-open")

        if (isAlreadyOpen) {
          /* Panel is already visible — update content without re-animating */
          const panelEl = els.detailOverlay.querySelector(".rr-detail-panel")
          if (panelEl) {
            const moduleData = getModuleTasks(mod.id)
            const progressInfo = getProgressInfo(state.detail.activeTab, mod, moduleData)
            panelEl.innerHTML = `
              ${renderDetailHeader(mod)}
              ${renderDetailNav(state.detail.activeTab, progressInfo.percent, progressInfo.label)}
              <div class="rr-detail-content">
                ${renderDetailTabContent(state.detail.activeTab, mod, moduleData, state.detail)}
              </div>
            `
            // Restore detail search input value if present
            const dSearch = panelEl.querySelector('#rr-detail-search')
            if (dSearch && state.detail.searchQuery) dSearch.value = state.detail.searchQuery
          }
        } else {
          /* First open — full render + animate in */
          els.detailOverlay.innerHTML = renderDetailPanel(mod, state.detail)
          els.detailOverlay.classList.add("is-open")
          // Restore detail search input value after initial render
          const newPanel = els.detailOverlay.querySelector('.rr-detail-panel')
          if (newPanel) {
            const dSearch = newPanel.querySelector('#rr-detail-search')
            if (dSearch && state.detail.searchQuery) dSearch.value = state.detail.searchQuery
          }
          requestAnimationFrame(() => {
            const panel = els.detailOverlay.querySelector(".rr-detail-panel")
            const backdrop = els.detailOverlay.querySelector(".rr-detail-backdrop")
            if (panel) panel.classList.add("is-visible")
            if (backdrop) backdrop.classList.add("is-visible")
          })
        }
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

  let _closeTimer = null

  function openDetailPanel(moduleId) {
    // Cancel any pending close animation to prevent race conditions
    if (_closeTimer) {
      clearTimeout(_closeTimer)
      _closeTimer = null
    }
    state.detail.open = true
    state.detail.moduleId = moduleId
    state.detail.activeTab = "overview"
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
    _closeTimer = setTimeout(() => {
      _closeTimer = null
      els.detailOverlay.classList.remove("is-open")
      els.detailOverlay.innerHTML = ""
      document.body.style.overflow = ""
    }, 300)
  }

  function closeAllDropdowns() {
    let changed = false
    if (state.sprintDropdownOpen) { state.sprintDropdownOpen = false; changed = true }
    if (state.openFilter) { state.openFilter = null; changed = true }
    if (state.detail && state.detail.openFilter) { state.detail.openFilter = null; changed = true }
    return changed
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]")

    if (!target) {
      // If clicking inside the detail overlay, don't close dropdowns or re-render
      if (state.detail.open && event.target.closest(".rr-detail-overlay")) return
      if (closeAllDropdowns()) render()
      return
    }

    const action = target.dataset.action

    // Ignore noop actions (e.g. non-functional sort indicator)
    if (action === "noop") return

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
      const inDetail = !!target.closest('.rr-detail-panel')
      if (inDetail) {
        state.detail.openFilter = state.detail.openFilter === filterId ? null : filterId
        renderDetail()
      } else {
        state.openFilter = state.openFilter === filterId ? null : filterId
        render()
      }
      return
    }

    if (action === "toggle-filter-option") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      const value = target.dataset.value
      const inDetail = !!target.closest('.rr-detail-panel')
      const arr = inDetail ? (state.detail.filters[filterId] ||= []) : (state.filters[filterId] ||= [])
      const idx = arr.indexOf(value)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(value)
      if (inDetail) renderDetail()
      else render()
      return
    }

    if (action === "clear-filter") {
      event.stopPropagation()
      const filterId = target.dataset.filter
      const inDetail = !!target.closest('.rr-detail-panel')
      if (inDetail) {
        state.detail.filters[filterId] = []
        state.detail.openFilter = null
        renderDetail()
      } else {
        state.filters[filterId] = []
        state.openFilter = null
        render()
      }
      return
    }

    // (detail filters handled by the generic filter handlers above)

    if (action === "close-sprint") {
      const sprint = getActiveSprint()
      if (!sprint) return
      const DONE = new Set(["validated", "merged-qa", "closed"])
      const allModules = sprint.groups.flatMap(g => g.modules)
      const incomplete = allModules.filter(m => !DONE.has(m.status))
      if (incomplete.length > 0) {
        state.modal = { type: "warning", items: incomplete }
      } else {
        state.modal = { type: "confirm", total: allModules.length }
      }
      renderModals()
      return
    }

    if (action === "close-sprint-confirm") {
      const sprint = getActiveSprint()
      if (sprint) sprint.status = "closed"
      state.modal = null
      render()
      return
    }

    if (action === "close-sprint-cancel") {
      state.modal = null
      renderModals()
      return
    }

    if (action === "sprint-history") {
      window.history.pushState({}, "", "/planning/old-sprint")
      window.dispatchEvent(new PopStateEvent("popstate"))
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
      if (tab) {
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
    if (event.target.id === "rr-detail-search") {
      state.detail.searchQuery = event.target.value || ""
      // Update detail panel content only
      renderDetail()
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
