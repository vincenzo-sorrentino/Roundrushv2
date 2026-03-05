/* ──────────────────────────────────────────────────────────────
   Kanban / Sprint Planning Module — Prototype flow
   Matches Figma "Desktop - Modules" (304:49110)
   ────────────────────────────────────────────────────────────── */

/* ── SVG icons (Phosphor-style) ───────────────────────────── */
const ICON = {
  caretDown: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretUp: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  equals: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  arrowDownSmall: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="128" y1="56" x2="128" y2="200" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="72,144 128,200 184,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  prohibit: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><line x1="60" y1="196" x2="196" y2="60" stroke="currentColor" stroke-width="16"/></svg>`,
  flagCheckered: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40 168c32-24 64 24 96 0s64-24 96 0V48c-32 24-64-24-96 0s-64 24-96 0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockHistory: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="128,80 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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

/* ── Mock team members (avatars) ─────────────────────────── */
const TEAM = [
  { id: "u1", name: "Olivia Rhye",     initials: "OR", color: "#d4b5ad" },
  { id: "u2", name: "Candice Wu",      initials: "CW", color: "#a2a8cd" },
  { id: "u3", name: "Orlando Diggs",   initials: "OD", color: "#cfc3a7" },
  { id: "u4", name: "Demi Wilkinson",  initials: "DW", color: "#bea887" },
  { id: "u5", name: "Drew Cano",       initials: "DC", color: "#d1dfc3" },
  { id: "u6", name: "Phoenix Baker",   initials: "PB", color: "#aa9c75" },
]

/* ── Sprint data ─────────────────────────────────────────── */
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
        ],
      },
      {
        id: "TEM",
        label: "TEM - Managing teams",
        modules: [
          {
            id: "TEM002",
            title: "Managing teams",
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
  "to-do":       { label: "To do",        bg: "var(--rr-kanban-status-todo-bg,      #e0e2e7)", text: "var(--rr-kanban-status-todo-text,      #3d4350)" },
  "in-progress": { label: "In progress",  bg: "var(--rr-kanban-status-progress-bg,  #daebff)", text: "var(--rr-kanban-status-progress-text,  #0067da)" },
  "merged-qa":   { label: "Merged-QA",    bg: "var(--rr-kanban-status-merged-bg,    #fbc6cd)", text: "var(--rr-kanban-status-merged-text,    #d13245)" },
  "done":        { label: "Done",         bg: "var(--rr-kanban-status-done-bg,      #d4f5e3)", text: "var(--rr-kanban-status-done-text,      #0e9255)" },
  "review":      { label: "Review",       bg: "var(--rr-kanban-status-review-bg,    #fff3cd)", text: "var(--rr-kanban-status-review-text,    #856404)" },
  "validating":  { label: "Validating",   bg: "var(--rr-kanban-status-validating-bg,#f6edfd)", text: "var(--rr-kanban-status-validating-text,#9b5bce)" },
  "blocked":     { label: "Blocked",      bg: "var(--rr-kanban-status-blocked-bg,   #fef2f1)", text: "var(--rr-kanban-status-blocked-text,   #c0362d)" },
}

const PRIORITY_ICON = {
  high:   { icon: "caretUp",        label: "High"   },
  medium: { icon: "equals",         label: "Medium" },
  low:    { icon: "arrowDownSmall", label: "Low"    },
}

/* ── Rendering helpers ────────────────────────────────────── */
function renderPriorityCell(priority) {
  const config = PRIORITY_ICON[priority]
  if (!config) return ""
  return `
    <span class="rr-kb-priority">
      ${ICON[config.icon]}
      <span>${escapeHtml(config.label)}</span>
    </span>
  `
}

function renderAvatarGroup(assigneeIds, overflowCount) {
  const visible = assigneeIds.slice(0, 3).map(id => TEAM.find(t => t.id === id)).filter(Boolean)
  let html = visible.map(u => `
    <span class="rr-kb-avatar" style="background:${u.color}" title="${escapeHtml(u.name)}">
      ${escapeHtml(u.initials)}
    </span>
  `).join("")
  if (overflowCount > 0) {
    html += `<span class="rr-kb-avatar rr-kb-avatar--overflow">+${overflowCount}</span>`
  }
  return `<span class="rr-kb-avatar-group">${html}</span>`
}

function renderProgressBar(percent) {
  const barColor = percent >= 100
    ? "var(--rr-kanban-progress-full, #0e9255)"
    : "var(--rr-kanban-progress-partial, #667085)"
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

/* ── Filter bar ───────────────────────────────────────────── */
function renderFilterBar(state) {
  return `
    <div class="rr-kb-filters">
      <div class="rr-kb-filter-buttons">
        <button type="button" class="rr-kb-filter-btn" data-action="filter" data-filter="modules">
          All modules ${ICON.caretDown}
        </button>
        <button type="button" class="rr-kb-filter-btn" data-action="filter" data-filter="priority">
          All priority ${ICON.caretDown}
        </button>
        <button type="button" class="rr-kb-filter-btn" data-action="filter" data-filter="assignees">
          All assignees ${ICON.caretDown}
        </button>
        <button type="button" class="rr-kb-filter-btn" data-action="filter" data-filter="statuses">
          All statuses ${ICON.caretDown}
        </button>
      </div>
      <div class="rr-kb-search-wrap">
        <div class="rr-kb-search">
          ${ICON.search}
          <input type="search" class="rr-kb-search-input" id="rr-kb-search" placeholder="Search" value="${escapeHtml(state.searchQuery)}" />
        </div>
      </div>
    </div>
  `
}

/* ── Sprint selector (top-right header area) ─────────────── */
function renderSprintSelector(activeSprint) {
  const dotColor = activeSprint.status === "active"
    ? "var(--rr-kanban-sprint-dot-active, #0e9255)"
    : activeSprint.status === "closed"
      ? "var(--rr-kanban-sprint-dot-closed, #667085)"
      : "var(--rr-kanban-sprint-dot-planned, #0067da)"
  return `
    <span class="rr-kb-sprint-dates">Sprint dates: ${escapeHtml(activeSprint.startDate)} - ${escapeHtml(activeSprint.endDate)}</span>
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
  const sortIcon = state.sortDir === "asc" ? ICON.caretUp : ICON.arrowDown
  return `
    <div class="rr-kb-thead">
      <span class="rr-kb-th rr-kb-th--req">Requirements</span>
      <span class="rr-kb-th rr-kb-th--priority">
        <button type="button" class="rr-kb-sort-btn" data-action="sort" data-sort="priority">
          Priority ${sortIcon}
        </button>
      </span>
      <span class="rr-kb-th rr-kb-th--assignee">Assignee</span>
      <span class="rr-kb-th rr-kb-th--update">Last update</span>
      <span class="rr-kb-th rr-kb-th--tasks">Tasks</span>
      <span class="rr-kb-th rr-kb-th--tests">Unit tests</span>
      <span class="rr-kb-th rr-kb-th--status">Status</span>
    </div>
  `
}

/* ── Table rows ───────────────────────────────────────────── */
function renderGroupRow(group) {
  return `
    <div class="rr-kb-row rr-kb-row--group" data-group-id="${escapeHtml(group.id)}">
      <span class="rr-kb-cell rr-kb-cell--req">
        <button type="button" class="rr-kb-expand-btn" data-action="toggle-group" data-group-id="${escapeHtml(group.id)}">
          ${ICON.caretDown}
        </button>
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
    <div class="rr-kb-row rr-kb-row--module">
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

function renderSprintTable(sprint, state) {
  if (!sprint.groups.length) {
    return `<p class="rr-kb-empty">No modules assigned to this sprint yet.</p>`
  }

  let filteredGroups = sprint.groups
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase()
    filteredGroups = filteredGroups.map(g => {
      const matchingModules = g.modules.filter(m =>
        m.id.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        g.label.toLowerCase().includes(q)
      )
      if (matchingModules.length === 0 && !g.label.toLowerCase().includes(q)) return null
      return { ...g, modules: matchingModules.length ? matchingModules : g.modules }
    }).filter(Boolean)
  }

  if (!filteredGroups.length) {
    return `<p class="rr-kb-empty">No results matching "${escapeHtml(state.searchQuery)}".</p>`
  }

  const rows = filteredGroups.map(group => {
    const isCollapsed = state.collapsedGroups.has(group.id)
    const groupRow = renderGroupRow(group)
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
            <span class="rr-kb-sprint-option-dates">${escapeHtml(s.startDate)} - ${escapeHtml(s.endDate)}</span>
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
      <div class="rr-kb-header" id="rr-kb-header">
        <div class="rr-kb-sprint-selector" id="rr-kb-sprint-selector"></div>
      </div>
      <div class="rr-kb-body">
        <div class="rr-kb-filter-row" id="rr-kb-filter-row"></div>
        <div class="rr-kb-table" id="rr-kb-table"></div>
        <div class="rr-kb-actions" id="rr-kb-actions"></div>
      </div>
    </section>
  `
}

/* ── Mount (state + events) ───────────────────────────────── */
export function mountKanbanModuleFlow() {
  const root = document.querySelector('[data-flow="kanban-module"]')
  if (!root) return undefined

  const els = {
    sprintSelector: root.querySelector("#rr-kb-sprint-selector"),
    filterRow:      root.querySelector("#rr-kb-filter-row"),
    table:          root.querySelector("#rr-kb-table"),
    actions:        root.querySelector("#rr-kb-actions"),
  }

  const state = {
    activeSprintId: "sprint-13",
    sortDir: "desc",
    searchQuery: "",
    collapsedGroups: new Set(),
    sprintDropdownOpen: false,
  }

  function getActiveSprint() {
    return SPRINTS.find(s => s.id === state.activeSprintId) || SPRINTS[0]
  }

  function render() {
    const sprint = getActiveSprint()

    els.sprintSelector.innerHTML =
      renderSprintSelector(sprint) +
      renderSprintDropdown(SPRINTS, state.activeSprintId, state.sprintDropdownOpen)

    els.filterRow.innerHTML = renderFilterBar(state)
    els.table.innerHTML = renderSprintTable(sprint, state)
    els.actions.innerHTML = renderCloseSprintButton(sprint)
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]")
    if (!target) {
      // Close dropdown on outside click
      if (state.sprintDropdownOpen) {
        state.sprintDropdownOpen = false
        render()
      }
      return
    }

    const action = target.dataset.action

    if (action === "toggle-group") {
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
      state.sortDir = state.sortDir === "desc" ? "asc" : "desc"
      render()
      return
    }

    if (action === "toggle-sprint-dropdown") {
      event.stopPropagation()
      state.sprintDropdownOpen = !state.sprintDropdownOpen
      render()
      return
    }

    if (action === "select-sprint") {
      state.activeSprintId = target.dataset.sprintId
      state.sprintDropdownOpen = false
      state.collapsedGroups.clear()
      render()
      return
    }

    if (action === "close-sprint") {
      // Prototype only — visual feedback
      const sprint = getActiveSprint()
      if (sprint) sprint.status = "closed"
      render()
      return
    }
  }

  function handleInput(event) {
    if (event.target.id === "rr-kb-search") {
      state.searchQuery = event.target.value || ""
      render()
    }
  }

  root.addEventListener("click", handleClick)
  root.addEventListener("input", handleInput)

  render()

  return () => {
    root.removeEventListener("click", handleClick)
    root.removeEventListener("input", handleInput)
  }
}
