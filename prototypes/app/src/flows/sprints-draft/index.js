/* --------------------------------------------------------------
   Draft Sprint flow
   Routes: /planning/draft (legacy: /sprints/draft)
   -------------------------------------------------------------- */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const ICON = {
  caretDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDoubleUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,208 128,128 208,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  equals: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  arrowDown: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="18" stroke-linecap="round"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-width="18" stroke-linecap="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  send: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M224 32L32 128l72 32 32 72 88-200Z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg width="22" height="22" viewBox="0 0 256 256" fill="none"><path d="M230 194L142 34c-6-11-22-11-28 0L26 194c-6 11 1 26 14 26h176c13 0 20-15 14-26z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="128" y1="104" x2="128" y2="144" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><circle cx="128" cy="176" r="10" fill="currentColor"/></svg>`,
  checkCircle: `<svg width="22" height="22" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="88,128 112,152 168,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path d="M216 56 200 40 40 200 32 224 56 216Z" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><line x1="184" y1="72" x2="72" y2="184" stroke="currentColor" stroke-width="14" stroke-linecap="round"/></svg>`,
}

const TEAM = [
  { id: "u1", name: "Olivia Rhye", initials: "OR", color: "#d4b5ad", img: "https://i.pravatar.cc/48?img=1" },
  { id: "u2", name: "Candice Wu", initials: "CW", color: "#a2a8cd", img: "https://i.pravatar.cc/48?img=5" },
  { id: "u3", name: "Orlando Diggs", initials: "OD", color: "#cfc3a7", img: "https://i.pravatar.cc/48?img=12" },
  { id: "u4", name: "Demi Wilkinson", initials: "DW", color: "#bea887", img: "https://i.pravatar.cc/48?img=9" },
  { id: "u5", name: "Drew Cano", initials: "DC", color: "#d1dfc3", img: "https://i.pravatar.cc/48?img=8" },
  { id: "u6", name: "Phoenix Baker", initials: "PB", color: "#aa9c75", img: "https://i.pravatar.cc/48?img=3" },
  { id: "u7", name: "Nat Craig", initials: "NC", color: "#c3b5d1", img: "https://i.pravatar.cc/48?img=16" },
  { id: "u8", name: "Lana Steiner", initials: "LS", color: "#d4b5ad", img: "https://i.pravatar.cc/48?img=25" },
]

const PRIORITY_CONFIG = {
  urgent: { icon: "caretDoubleUp", label: "Urgent", color: "#c0362d" },
  high: { icon: "caretUp", label: "High", color: "#d13245" },
  medium: { icon: "equals", label: "Medium", color: "#e7a600" },
  low: { icon: "arrowDown", label: "Low", color: "#0067da" },
}

const BACKLOG_MODULES = [
  { id: "NTF-001", epic: "NTF", title: "Notification inbox", priority: "high" },
  { id: "NTF-002", epic: "NTF", title: "Real-time push alerts", priority: "medium" },
  { id: "NTF-003", epic: "NTF", title: "Email digest", priority: "low" },
  { id: "DOC-001", epic: "DOC", title: "Docs hub search", priority: "medium" },
  { id: "DOC-002", epic: "DOC", title: "Version-controlled specs", priority: "high" },
  { id: "DOC-003", epic: "DOC", title: "Inline comment threads", priority: "medium" },
  { id: "TST-001", epic: "TST", title: "E2E test runner panel", priority: "high" },
  { id: "TST-002", epic: "TST", title: "Coverage report view", priority: "medium" },
  { id: "TST-003", epic: "TST", title: "Flaky test detector", priority: "low" },
  { id: "DES-001", epic: "DES", title: "Design token sync", priority: "high" },
  { id: "DES-002", epic: "DES", title: "Figma component mapper", priority: "medium" },
  { id: "RMP-001", epic: "RMP", title: "Roadmap timeline view", priority: "high" },
  { id: "KAN-005", epic: "KAN", title: "Sprint capacity planner", priority: "urgent" },
  { id: "KAN-006", epic: "KAN", title: "Velocity chart", priority: "medium" },
  { id: "API-001", epic: "API", title: "Public API gateway", priority: "high" },
  { id: "API-002", epic: "API", title: "API versioning strategy", priority: "medium" },
  { id: "API-003", epic: "API", title: "Rate limiting middleware", priority: "high" },
]

const DRAFT_SPRINT = {
  number: 14,
  startDate: "01/03/2026",
  endDate: "14/03/2026",
  goal: "Complete notification system and begin documentation hub improvements.",
  status: "draft",
}

const GOAL_CHAR_LIMIT = 110
const MAX_ASSIGNEES_PER_MODULE = 3

function renderAvatar(userId) {
  const user = TEAM.find(member => member.id === userId)
  if (!user) return ""
  return `
    <span class="rr-sd-avatar" style="background:${user.color}" title="${escapeHtml(user.name)}">
      <img src="${user.img}" alt="${escapeHtml(user.initials)}" class="rr-sd-avatar-img" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <span class="rr-sd-avatar-fallback">${escapeHtml(user.initials)}</span>
    </span>
  `
}

function renderAvatarGroup(ids) {
  const visible = ids.slice(0, 3)
  const overflow = ids.length - visible.length
  let html = visible.map(renderAvatar).join("")
  if (overflow > 0) {
    html += `<span class="rr-sd-avatar rr-sd-avatar--overflow">+${overflow}</span>`
  }
  return `<span class="rr-sd-avatar-group">${html}</span>`
}

function renderPriority(priority) {
  const cfg = PRIORITY_CONFIG[priority]
  if (!cfg) return ""
  return `<span class="rr-kb-priority" style="color:${cfg.color}">${ICON[cfg.icon]}<span>${escapeHtml(cfg.label)}</span></span>`
}

function renderSprintMeta(draft, isEditing) {
  const goalLength = draft.goal.trim().length

  if (isEditing) {
    return `
      <div class="rr-sd-meta rr-sd-meta--editing">
        <div class="rr-sd-meta-field">
          <label class="rr-sd-meta-label">Sprint number</label>
          <input class="rr-sd-meta-input" id="rr-sd-number" type="number" value="${escapeHtml(String(draft.number))}" min="1" />
        </div>
        <div class="rr-sd-meta-field">
          <label class="rr-sd-meta-label">Start date</label>
          <input class="rr-sd-meta-input" id="rr-sd-start" type="text" value="${escapeHtml(draft.startDate)}" placeholder="DD/MM/YYYY" />
        </div>
        <div class="rr-sd-meta-field">
          <label class="rr-sd-meta-label">End date</label>
          <input class="rr-sd-meta-input" id="rr-sd-end" type="text" value="${escapeHtml(draft.endDate)}" placeholder="DD/MM/YYYY" />
        </div>
        <div class="rr-sd-meta-field rr-sd-meta-field--goal">
          <label class="rr-sd-meta-label">Sprint goal</label>
          <div class="rr-sd-meta-goal-input-wrap">
            <input class="rr-sd-meta-input rr-sd-meta-input--goal" id="rr-sd-goal" type="text" maxlength="${GOAL_CHAR_LIMIT}" value="${escapeHtml(draft.goal)}" />
            <span class="rr-sd-meta-goal-counter" id="rr-sd-goal-counter">${goalLength}/${GOAL_CHAR_LIMIT}</span>
          </div>
        </div>
        <button type="button" class="rr-sd-meta-save-btn" data-action="save-meta">Save</button>
      </div>
    `
  }

  return `
    <div class="rr-sd-meta">
      <div class="rr-sd-meta-info">
        <span class="rr-sd-meta-stat"><span class="rr-sd-meta-stat-label">Sprint</span><strong>#${escapeHtml(String(draft.number))}</strong></span>
        <span class="rr-sd-meta-divider"></span>
        <span class="rr-sd-meta-stat"><span class="rr-sd-meta-stat-label">Dates</span><strong>${escapeHtml(draft.startDate)} - ${escapeHtml(draft.endDate)}</strong></span>
        <span class="rr-sd-meta-divider"></span>
        <span class="rr-sd-meta-stat"><span class="rr-sd-meta-stat-label">Goal</span><span class="rr-sd-meta-goal">${escapeHtml(draft.goal)}</span></span>
      </div>
      <button type="button" class="rr-sd-edit-btn" data-action="edit-meta">${ICON.edit} Edit</button>
    </div>
  `
}

function renderAssigneePicker(moduleId, selectedIds) {
  return `
    <div class="rr-sd-assignee-menu" role="menu">
      ${TEAM.map((member) => {
        const isSelected = selectedIds.includes(member.id)
        return `
          <button type="button"
                  class="rr-sd-assignee-option ${isSelected ? "is-selected" : ""}"
                  data-action="toggle-assignee-member"
                  data-module-id="${escapeHtml(moduleId)}"
                  data-user-id="${escapeHtml(member.id)}"
                  role="menuitemcheckbox"
                  aria-checked="${isSelected ? "true" : "false"}">
            <span class="rr-sd-assignee-option-name">${escapeHtml(member.name)}</span>
            ${isSelected ? `<span class="rr-sd-assignee-option-check">${ICON.check}</span>` : ""}
          </button>
        `
      }).join("")}
    </div>
  `
}

function renderAssigneeControl(moduleId, selectedIds, openMenuModuleId) {
  const isOpen = openMenuModuleId === moduleId
  const hasAssignees = selectedIds.length > 0

  return `
    <div class="rr-sd-assignee-wrap">
      <button type="button"
              class="rr-sd-assignee-add-btn ${hasAssignees ? "is-filled" : ""}"
              data-action="toggle-assignee-menu"
              data-module-id="${escapeHtml(moduleId)}"
              title="${hasAssignees ? "Edit assignees" : "Add assignee"}">
        ${hasAssignees ? renderAvatarGroup(selectedIds) : ICON.plus}
      </button>
      ${hasAssignees ? `
        <button type="button"
                class="rr-sd-assignee-add-inline"
                data-action="toggle-assignee-menu"
                data-module-id="${escapeHtml(moduleId)}"
                title="Add assignee">
          ${ICON.plus}
        </button>
      ` : ""}
      ${isOpen ? renderAssigneePicker(moduleId, selectedIds) : ""}
    </div>
  `
}

function renderScopePanel(scopedIds, allModules, state) {
  const scoped = allModules.filter(module => scopedIds.has(module.id))
  if (!scoped.length) {
    return `
      <div class="rr-sd-scope-empty">
        <p>No modules scoped yet.</p>
        <p class="rr-sd-scope-empty-hint">Add modules from the backlog on the left.</p>
      </div>
    `
  }

  const rows = scoped.map((module) => {
    const assignees = state.assigneesByModule[module.id] || []
    return `
      <div class="rr-sd-scope-row">
        <span class="rr-sd-scope-id">${escapeHtml(module.id)}</span>
        <span class="rr-sd-scope-title">${escapeHtml(module.title)}</span>
        <span class="rr-sd-scope-priority">${renderPriority(module.priority)}</span>
        <span class="rr-sd-scope-assignees">
          ${renderAssigneeControl(module.id, assignees, state.assigneeMenuModuleId)}
        </span>
        <button type="button" class="rr-sd-scope-remove-btn" data-action="remove-module" data-module-id="${escapeHtml(module.id)}" title="Remove from sprint">
          ${ICON.minus}
        </button>
      </div>
    `
  }).join("")

  return `
    <div class="rr-sd-scope-thead">
      <span class="rr-sd-scope-th rr-sd-scope-th--id">ID</span>
      <span class="rr-sd-scope-th rr-sd-scope-th--title">Module</span>
      <span class="rr-sd-scope-th rr-sd-scope-th--priority">Priority</span>
      <span class="rr-sd-scope-th rr-sd-scope-th--assignee">Assignee</span>
      <span class="rr-sd-scope-th rr-sd-scope-th--actions"></span>
    </div>
    <div class="rr-sd-scope-rows">${rows}</div>
  `
}

function renderBacklogPanel(scopedIds, allModules, state) {
  const epicGroups = {}
  for (const module of allModules) {
    if (!epicGroups[module.epic]) {
      epicGroups[module.epic] = []
    }
    epicGroups[module.epic].push(module)
  }

  const query = (state.backlogSearch || "").toLowerCase().trim()

  const groups = Object.entries(epicGroups).map(([epic, modules]) => {
    const filtered = modules.filter((module) =>
      !scopedIds.has(module.id)
      && (query === ""
        || module.id.toLowerCase().includes(query)
        || module.title.toLowerCase().includes(query)
        || epic.toLowerCase().includes(query))
    )

    if (!filtered.length) return ""
    const isCollapsed = state.collapsedEpics.has(epic)

    const rows = isCollapsed ? "" : filtered.map((module) => `
      <div class="rr-sd-backlog-row">
        <span class="rr-sd-backlog-id">${escapeHtml(module.id)}</span>
        <span class="rr-sd-backlog-title">${escapeHtml(module.title)}</span>
        <span class="rr-sd-backlog-priority">${renderPriority(module.priority)}</span>
        <button type="button" class="rr-sd-backlog-add-btn" data-action="add-module" data-module-id="${escapeHtml(module.id)}" title="Add to sprint">
          ${ICON.plus}
        </button>
      </div>
    `).join("")

    return `
      <div class="rr-sd-backlog-group">
        <div class="rr-sd-backlog-group-header" data-action="toggle-epic" data-epic="${escapeHtml(epic)}">
          ${isCollapsed ? ICON.caretRight : ICON.caretDown}
          <span class="rr-sd-backlog-epic">${escapeHtml(epic)}</span>
          <span class="rr-sd-backlog-count">${filtered.length}</span>
        </div>
        ${rows}
      </div>
    `
  }).join("")

  return `
    <div class="rr-sd-backlog-search-wrap">
      <input type="search" class="rr-sd-backlog-search" id="rr-sd-backlog-search" placeholder="Search backlog..." value="${escapeHtml(state.backlogSearch)}" />
    </div>
    <div class="rr-sd-backlog-thead">
      <span class="rr-sd-backlog-th rr-sd-backlog-th--id">ID</span>
      <span class="rr-sd-backlog-th rr-sd-backlog-th--title">Module</span>
      <span class="rr-sd-backlog-th rr-sd-backlog-th--priority">Priority</span>
      <span class="rr-sd-backlog-th rr-sd-backlog-th--add"></span>
    </div>
    ${groups || `<p class="rr-sd-backlog-empty">All available modules are already scoped, or nothing matches your search.</p>`}
  `
}

function computeValidation(scopedIds, draft) {
  const issues = []
  if (!scopedIds.size) issues.push("No modules scoped into the sprint.")
  if (!draft.startDate.trim()) issues.push("Sprint start date is missing.")
  if (!draft.endDate.trim()) issues.push("Sprint end date is missing.")
  if (!draft.goal.trim()) issues.push("Sprint goal is not defined.")
  if (draft.goal.trim().length > GOAL_CHAR_LIMIT) issues.push(`Sprint goal exceeds ${GOAL_CHAR_LIMIT} characters.`)

  return issues
}

function renderConfirmModal(state, scopedIds, allModules) {
  if (!state.modal) return ""
  const scoped = allModules.filter(module => scopedIds.has(module.id))
  const uniqueAssignees = new Set(
    scoped.flatMap((module) => state.assigneesByModule[module.id] || [])
  )

  const moduleList = scoped.map((module) => {
    const assigneeCount = (state.assigneesByModule[module.id] || []).length
    return `<div class="rr-sd-confirm-item"><span>${escapeHtml(module.id)}</span><span>${escapeHtml(module.title)}</span><span>${assigneeCount}</span></div>`
  }).join("")

  return `
    <div class="rr-sd-modal-backdrop" data-action="cancel-submit"></div>
    <div class="rr-sd-modal-popup">
      <div class="rr-sd-modal-header">
        <span class="rr-sd-modal-title">Submit Sprint #${escapeHtml(String(state.draft.number))} for Approval</span>
      </div>
      <div class="rr-sd-modal-body">
        <div class="rr-sd-modal-meta-row">
          <span><strong>Dates:</strong> ${escapeHtml(state.draft.startDate)} - ${escapeHtml(state.draft.endDate)}</span>
          <span><strong>Modules:</strong> ${scoped.length}</span>
          <span><strong>Assigned members:</strong> ${uniqueAssignees.size}</span>
        </div>
        <div class="rr-sd-confirm-list">
          <div class="rr-sd-confirm-list-header">
            <span>ID</span><span>Module</span><span>Assignees</span>
          </div>
          ${moduleList}
        </div>
      </div>
      <div class="rr-sd-modal-footer">
        <button type="button" class="rr-sd-btn rr-sd-btn--neutral" data-action="cancel-submit">Cancel</button>
        <button type="button" class="rr-sd-btn rr-sd-btn--submit" data-action="confirm-submit">${ICON.send} Submit for approval</button>
      </div>
    </div>
  `
}

function renderSuccessBanner() {
  return `
    <div class="rr-sd-success-banner">
      ${ICON.checkCircle}
      <div>
        <strong>Sprint submitted for stakeholder approval.</strong>
        <p>The sprint has been sent to stakeholders for review. You will be notified once it is approved or changes are requested.</p>
      </div>
      <a href="/planning/release-notes" class="rr-sd-success-link" data-action="spa-link">View approval flow</a>
    </div>
  `
}

export async function renderSprintsDraftFlow() {
  return `
    <section class="rr-sd" data-flow="sprints-draft">
      <div class="rr-sd-inner">
        <div class="rr-sd-page-header">
          <div class="rr-sd-page-header-left">
            <span class="rr-sd-draft-badge">Draft</span>
            <h1 class="rr-sd-page-title" id="rr-sd-page-title">Sprint #14 - Planning</h1>
          </div>
          <div class="rr-sd-page-header-right" id="rr-sd-header-actions"></div>
        </div>
        <div id="rr-sd-success-zone"></div>
        <div id="rr-sd-meta-zone"></div>
        <div class="rr-sd-layout" id="rr-sd-layout">
          <div class="rr-sd-panel rr-sd-panel--backlog">
            <div class="rr-sd-panel-header">
              <span class="rr-sd-panel-title">Backlog</span>
              <span class="rr-sd-panel-count" id="rr-sd-backlog-count">0 available</span>
            </div>
            <div class="rr-sd-panel-body" id="rr-sd-backlog-body"></div>
          </div>
          <div class="rr-sd-panel rr-sd-panel--scope">
            <div class="rr-sd-panel-header">
              <span class="rr-sd-panel-title">Sprint Scope</span>
              <span class="rr-sd-panel-count" id="rr-sd-scope-count">0 modules</span>
            </div>
            <div class="rr-sd-panel-body" id="rr-sd-scope-body"></div>
          </div>
        </div>
      </div>
      <div class="rr-sd-modal-overlay" id="rr-sd-modal-overlay"></div>
    </section>
  `
}

const SD_STYLES = `
.rr-sd {
  --sd-radius: 8px;
  --sd-border: var(--rr-sem-strokePrimary, #e0e2e7);
  --sd-bg: var(--rr-sem-background-pageLight, #f8f9fb);
  --sd-panel-bg: var(--rr-sem-surfaceCard, #ffffff);
  --sd-text-primary: var(--rr-sem-textPrimary, #14161b);
  --sd-text-secondary: var(--rr-sem-textSecondary, #667085);
  --sd-text-muted: var(--rr-sem-textMuted, #98a2b3);
  font-family: inherit;
  color: var(--sd-text-primary);
  background: var(--sd-bg);
  min-height: 100vh;
  padding: 0;
}

.rr-sd-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 32px 40px;
}

.rr-sd-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}

.rr-sd-page-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rr-sd-draft-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: #fff3cd;
  color: #856404;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .3px;
}

.rr-sd-page-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.rr-sd-page-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rr-sd-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  background: var(--sd-panel-bg);
  border: 1px solid var(--sd-border);
  border-radius: var(--sd-radius);
  padding: 16px 20px;
  margin-bottom: 20px;
}

.rr-sd-meta-info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  flex: 1;
}

.rr-sd-meta-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.rr-sd-meta-stat-label {
  font-size: 11px;
  color: var(--sd-text-secondary);
}

.rr-sd-meta-stat strong {
  font-size: 14px;
  font-weight: 600;
}

.rr-sd-meta-goal {
  font-size: 14px;
  color: var(--sd-text-secondary);
}

.rr-sd-meta-divider {
  width: 1px;
  background: var(--sd-border);
  min-height: 36px;
  align-self: stretch;
}

.rr-sd-meta--editing {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr)) minmax(320px, 2fr) auto;
  align-items: end;
  gap: 12px 16px;
  background: var(--sd-panel-bg);
  border: 1px solid var(--sd-border);
  border-radius: var(--sd-radius);
  padding: 16px 20px;
  margin-bottom: 20px;
}

.rr-sd-meta-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rr-sd-meta-field--goal {
  min-width: 0;
}

.rr-sd-meta-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--sd-text-secondary);
  text-transform: uppercase;
  letter-spacing: .4px;
}

.rr-sd-meta-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--sd-border);
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: var(--sd-text-primary);
  background: #f8f9fb;
  transition: border-color .15s, background .15s;
}

.rr-sd-meta-input:focus {
  outline: none;
  border-color: #0067da;
  background: #fff;
}

.rr-sd-meta-goal-input-wrap {
  display: grid;
  gap: 4px;
}

.rr-sd-meta-goal-counter {
  justify-self: end;
  font-size: 11px;
  color: var(--sd-text-muted);
}

.rr-sd-meta-save-btn {
  padding: 9px 18px;
  background: #0067da;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  align-self: end;
  white-space: nowrap;
  transition: background .15s;
}

.rr-sd-meta-save-btn:hover {
  background: #0052b8;
}

.rr-sd-edit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--sd-border);
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
  color: var(--sd-text-secondary);
  cursor: pointer;
  transition: background .15s;
}

.rr-sd-edit-btn:hover {
  background: var(--sd-bg);
}

.rr-sd-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.rr-sd-panel {
  background: var(--sd-panel-bg);
  border: 1px solid var(--sd-border);
  border-radius: var(--sd-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rr-sd-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  border-bottom: 1px solid var(--sd-border);
}

.rr-sd-panel-title {
  font-size: 13px;
  font-weight: 700;
}

.rr-sd-panel-count {
  font-size: 12px;
  color: var(--sd-text-muted);
}

.rr-sd-panel-body {
  padding: 14px 16px;
  overflow-y: auto;
  max-height: 58vh;
}

.rr-sd-scope-empty {
  text-align: center;
  padding: 40px 16px;
  color: var(--sd-text-secondary);
  font-size: 13px;
}

.rr-sd-scope-empty-hint {
  font-size: 12px;
  color: var(--sd-text-muted);
  margin-top: 4px;
}

.rr-sd-scope-thead,
.rr-sd-scope-row {
  display: grid;
  grid-template-columns: 90px 1fr 110px 170px 36px;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.rr-sd-scope-thead {
  color: var(--sd-text-secondary);
  font-weight: 400;
  min-height: 40px;
  padding: 0;
  border-bottom: 1px solid var(--sd-border);
}

.rr-sd-scope-th,
.rr-sd-backlog-th {
  font-size: 12px;
  font-weight: 400;
}

.rr-sd-scope-row {
  min-height: 44px;
  padding: 0;
  border-bottom: 1px solid #f0f1f3;
}

.rr-sd-scope-row:last-child {
  border-bottom: none;
}

.rr-sd-scope-id {
  font-weight: 400;
  color: var(--sd-text-secondary);
  font-size: 13px;
}

.rr-sd-scope-title {
  font-size: 14px;
}

.rr-sd-scope-remove-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--sd-border);
  border-radius: 6px;
  background: #fff;
  color: var(--sd-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s, color .15s;
}

.rr-sd-scope-remove-btn:hover {
  background: #fef2f1;
  color: #c0362d;
}

.rr-sd-assignee-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.rr-sd-assignee-add-btn {
  min-width: 30px;
  height: 30px;
  border: 1px dashed #b7c6de;
  border-radius: 999px;
  background: #fff;
  color: #0067da;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
}

.rr-sd-assignee-add-btn.is-filled {
  border-style: solid;
  border-color: var(--sd-border);
  border-radius: 999px;
  color: var(--sd-text-secondary);
  padding: 0 8px;
}

.rr-sd-assignee-add-btn:hover {
  background: #eef5ff;
}

.rr-sd-assignee-add-inline {
  width: 24px;
  height: 24px;
  border: 1px solid var(--sd-border);
  border-radius: 999px;
  background: #fff;
  color: #0067da;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.rr-sd-assignee-add-inline:hover {
  background: #eef5ff;
}

.rr-sd-assignee-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  max-height: 220px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid var(--sd-border);
  border-radius: 8px;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.14);
  padding: 6px;
  z-index: 30;
}

.rr-sd-assignee-option {
  width: 100%;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--sd-text-primary);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 8px;
}

.rr-sd-assignee-option:hover {
  background: #f3f7ff;
}

.rr-sd-assignee-option.is-selected {
  background: #eaf2ff;
}

.rr-sd-assignee-option-check {
  color: #0067da;
  display: inline-flex;
  align-items: center;
}

.rr-sd-backlog-search-wrap {
  margin-bottom: 10px;
}

.rr-sd-backlog-search {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--sd-border);
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: var(--sd-text-primary);
  background: #f8f9fb;
  box-sizing: border-box;
  transition: border-color .15s;
}

.rr-sd-backlog-search:focus {
  outline: none;
  border-color: #0067da;
  background: #fff;
}

.rr-sd-backlog-thead,
.rr-sd-backlog-row {
  display: grid;
  grid-template-columns: 90px 1fr 110px 36px;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.rr-sd-backlog-thead {
  color: var(--sd-text-secondary);
  font-weight: 400;
  min-height: 40px;
  padding: 0;
  border-bottom: 1px solid var(--sd-border);
}

.rr-sd-backlog-row {
  min-height: 44px;
  padding: 0;
  border-bottom: 1px solid #f0f1f3;
}

.rr-sd-backlog-row:last-child {
  border-bottom: none;
}

.rr-sd-backlog-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0 6px;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 700;
  color: var(--sd-text-secondary);
  border-bottom: 1px solid var(--sd-border);
  margin-top: 4px;
}

.rr-sd-backlog-epic {
  text-transform: uppercase;
  letter-spacing: .3px;
}

.rr-sd-backlog-count {
  background: #e0e2e7;
  color: #3d4350;
  border-radius: 999px;
  padding: 1px 7px;
  font-size: 11px;
}

.rr-sd-backlog-id {
  font-weight: 400;
  color: var(--sd-text-secondary);
  font-size: 13px;
}

.rr-sd-backlog-title {
  font-size: 14px;
}

.rr-sd-backlog-empty {
  padding: 24px;
  text-align: center;
  color: var(--sd-text-muted);
  font-size: 13px;
}

.rr-sd-backlog-add-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--sd-border);
  border-radius: 6px;
  background: #fff;
  color: #0067da;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s;
}

.rr-sd-backlog-add-btn:hover {
  background: #daebff;
}

.rr-sd-avatar-group {
  display: inline-flex;
  flex-direction: row-reverse;
}

.rr-sd-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #3d4350;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.rr-sd-avatar-group .rr-sd-avatar:last-child {
  margin-left: 0;
}

.rr-sd-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

.rr-sd-avatar-fallback {
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
}

.rr-sd-avatar--overflow {
  background: #e0e2e7;
  font-size: 10px;
  z-index: 10;
}

.rr-sd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform .1s, box-shadow .15s, background .15s;
}

.rr-sd-btn--neutral {
  background: #fff;
  color: var(--sd-text-primary);
  border: 1px solid var(--sd-border);
}

.rr-sd-btn--neutral:hover {
  background: var(--sd-bg);
}

.rr-sd-btn--submit {
  background: linear-gradient(135deg, #0067da 0%, #0052b8 100%);
  color: #fff;
  box-shadow: 0 8px 16px rgba(0, 103, 218, 0.25);
}

.rr-sd-btn--submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(0, 103, 218, 0.32);
}

.rr-sd-btn--submit:disabled {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.rr-sd-validation-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #fef4e6;
  border: 1px solid #f0c972;
  border-radius: var(--sd-radius);
  padding: 12px 16px;
  margin-bottom: 16px;
  color: #7a4800;
  font-size: 13px;
}

.rr-sd-validation-banner ul {
  margin: 4px 0 0 16px;
  padding: 0;
  line-height: 1.7;
}

.rr-sd-validation-banner svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.rr-sd-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  align-items: center;
  justify-content: center;
}

.rr-sd-modal-overlay.is-open {
  display: flex;
}

.rr-sd-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .35);
}

.rr-sd-modal-popup {
  position: relative;
  z-index: 1;
  background: #fff;
  border-radius: 12px;
  width: min(560px, 90vw);
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .15);
  display: flex;
  flex-direction: column;
}

.rr-sd-modal-header {
  padding: 20px 24px 12px;
  border-bottom: 1px solid #e0e2e7;
}

.rr-sd-modal-title {
  font-size: 16px;
  font-weight: 700;
}

.rr-sd-modal-body {
  padding: 16px 24px;
  flex: 1;
  overflow-y: auto;
}

.rr-sd-modal-meta-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 13px;
}

.rr-sd-modal-footer {
  padding: 14px 24px;
  border-top: 1px solid #e0e2e7;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.rr-sd-confirm-list {
  border: 1px solid #e0e2e7;
  border-radius: 6px;
  overflow: hidden;
}

.rr-sd-confirm-list-header,
.rr-sd-confirm-item {
  display: grid;
  grid-template-columns: 90px 1fr 80px;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 12px;
}

.rr-sd-confirm-list-header {
  font-weight: 700;
  background: #f8f9fb;
  border-bottom: 1px solid #e0e2e7;
}

.rr-sd-confirm-item {
  border-bottom: 1px solid #f0f1f3;
}

.rr-sd-confirm-item:last-child {
  border-bottom: none;
}

.rr-sd-success-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #ddf7eb;
  border: 1px solid #68d391;
  border-radius: var(--sd-radius);
  padding: 16px 20px;
  margin-bottom: 20px;
  color: #0e9255;
  font-size: 13px;
}

.rr-sd-success-banner svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.rr-sd-success-banner strong {
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
}

.rr-sd-success-banner p {
  margin: 0;
  color: #1a7043;
}

.rr-sd-success-link {
  margin-left: auto;
  white-space: nowrap;
  color: #0e9255;
  font-weight: 600;
  font-size: 13px;
  align-self: center;
  text-decoration: none;
}

.rr-sd-success-link:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .rr-sd-meta--editing {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}

@media (max-width: 900px) {
  .rr-sd-layout {
    grid-template-columns: 1fr;
  }

  .rr-sd-meta--editing {
    grid-template-columns: 1fr;
  }

  .rr-sd-scope-thead,
  .rr-sd-scope-row {
    grid-template-columns: 80px 1fr 92px 130px 32px;
  }

  .rr-sd-backlog-thead,
  .rr-sd-backlog-row {
    grid-template-columns: 80px 1fr 92px 32px;
  }
}
`

export function mountSprintsDraftFlow() {
  const root = document.querySelector('[data-flow="sprints-draft"]')
  if (!root) return undefined

  if (!document.getElementById("rr-sd-styles")) {
    const style = document.createElement("style")
    style.id = "rr-sd-styles"
    style.textContent = SD_STYLES
    document.head.appendChild(style)
  }

  const tabHeaderActions = document.querySelector("#rr-tab-sprint-header")

  const state = {
    draft: { ...DRAFT_SPRINT },
    scopedIds: new Set(["NTF-001", "NTF-002", "KAN-005"]),
    assigneesByModule: {
      "NTF-001": [],
      "NTF-002": [],
      "KAN-005": [],
    },
    assigneeMenuModuleId: null,
    isEditingMeta: false,
    backlogSearch: "",
    collapsedEpics: new Set(),
    modal: null,
    submitted: false,
  }

  const els = {
    successZone: root.querySelector("#rr-sd-success-zone"),
    metaZone: root.querySelector("#rr-sd-meta-zone"),
    scopeBody: root.querySelector("#rr-sd-scope-body"),
    scopeCount: root.querySelector("#rr-sd-scope-count"),
    backlogBody: root.querySelector("#rr-sd-backlog-body"),
    backlogCount: root.querySelector("#rr-sd-backlog-count"),
    headerActions: root.querySelector("#rr-sd-header-actions"),
    pageTitle: root.querySelector("#rr-sd-page-title"),
    modalOverlay: root.querySelector("#rr-sd-modal-overlay"),
  }

  function getAvailableCount() {
    return BACKLOG_MODULES.filter(module => !state.scopedIds.has(module.id)).length
  }

  function ensureAssigneeState(moduleId) {
    if (!Array.isArray(state.assigneesByModule[moduleId])) {
      state.assigneesByModule[moduleId] = []
    }
    return state.assigneesByModule[moduleId]
  }

  function render() {
    const scoped = BACKLOG_MODULES.filter(module => state.scopedIds.has(module.id))
    const validationIssues = computeValidation(state.scopedIds, state.draft)

    els.pageTitle.textContent = `Sprint #${state.draft.number} - Planning`

    if (tabHeaderActions) {
      tabHeaderActions.innerHTML = `
        <span class="rr-kb-sprint-dates">Sprint dates: ${escapeHtml(state.draft.startDate)} - ${escapeHtml(state.draft.endDate)}</span>
        <button type="button" class="rr-kb-sprint-btn" style="background:#f0f1f3;color:#667085;cursor:default">
          <span class="rr-kb-sprint-dot" style="background:#e7a600"></span>
          <span>Sprint ${escapeHtml(String(state.draft.number))} (Draft)</span>
        </button>
      `
    }

    els.successZone.innerHTML = state.submitted ? renderSuccessBanner() : ""
    els.metaZone.innerHTML = renderSprintMeta(state.draft, state.isEditingMeta)

    if (validationIssues.length && !state.submitted) {
      const existing = root.querySelector(".rr-sd-validation-banner")
      if (!existing) {
        const banner = document.createElement("div")
        banner.className = "rr-sd-validation-banner"
        banner.innerHTML = `${ICON.warning}<div><strong>Before submitting, please address:</strong><ul>${validationIssues.map(issue => `<li>${escapeHtml(issue)}</li>`).join("")}</ul></div>`
        els.metaZone.after(banner)
      }
    } else {
      root.querySelector(".rr-sd-validation-banner")?.remove()
    }

    const canSubmit = !validationIssues.length && !state.submitted
    els.headerActions.innerHTML = `
      <button type="button" class="rr-sd-btn rr-sd-btn--neutral" data-action="navigate-current">
        View current sprint
      </button>
      <button type="button" class="rr-sd-btn rr-sd-btn--submit" data-action="open-submit" ${canSubmit ? "" : "disabled"}>
        ${ICON.send} Submit for approval
      </button>
    `

    els.scopeCount.textContent = `${scoped.length} module${scoped.length !== 1 ? "s" : ""}`
    els.scopeBody.innerHTML = renderScopePanel(state.scopedIds, BACKLOG_MODULES, state)

    const available = getAvailableCount()
    els.backlogCount.textContent = `${available} available`
    els.backlogBody.innerHTML = renderBacklogPanel(state.scopedIds, BACKLOG_MODULES, state)

    const searchInput = root.querySelector("#rr-sd-backlog-search")
    if (searchInput && state.backlogSearch) {
      searchInput.value = state.backlogSearch
    }

    renderModal()
  }

  function renderModal() {
    if (!state.modal) {
      els.modalOverlay.innerHTML = ""
      els.modalOverlay.classList.remove("is-open")
      return
    }
    els.modalOverlay.innerHTML = renderConfirmModal(state, state.scopedIds, BACKLOG_MODULES)
    els.modalOverlay.classList.add("is-open")
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]")
    if (!target) {
      if (state.assigneeMenuModuleId) {
        state.assigneeMenuModuleId = null
        render()
      }
      return
    }

    const action = target.dataset.action

    if (action === "edit-meta") {
      state.isEditingMeta = true
      render()
      return
    }

    if (action === "save-meta") {
      const numInput = root.querySelector("#rr-sd-number")
      const startInput = root.querySelector("#rr-sd-start")
      const endInput = root.querySelector("#rr-sd-end")
      const goalInput = root.querySelector("#rr-sd-goal")

      if (numInput) state.draft.number = parseInt(numInput.value, 10) || state.draft.number
      if (startInput) state.draft.startDate = startInput.value.trim() || state.draft.startDate
      if (endInput) state.draft.endDate = endInput.value.trim() || state.draft.endDate
      if (goalInput) state.draft.goal = goalInput.value.trim().slice(0, GOAL_CHAR_LIMIT)

      state.isEditingMeta = false
      render()
      return
    }

    if (action === "add-module") {
      const moduleId = target.dataset.moduleId
      if (moduleId) {
        state.scopedIds.add(moduleId)
        ensureAssigneeState(moduleId)
        state.assigneeMenuModuleId = moduleId
        render()
      }
      return
    }

    if (action === "remove-module") {
      const moduleId = target.dataset.moduleId
      if (moduleId) {
        state.scopedIds.delete(moduleId)
        delete state.assigneesByModule[moduleId]
        if (state.assigneeMenuModuleId === moduleId) {
          state.assigneeMenuModuleId = null
        }
        render()
      }
      return
    }

    if (action === "toggle-assignee-menu") {
      event.stopPropagation()
      const moduleId = target.dataset.moduleId
      if (!moduleId) return
      state.assigneeMenuModuleId = state.assigneeMenuModuleId === moduleId ? null : moduleId
      render()
      return
    }

    if (action === "toggle-assignee-member") {
      event.stopPropagation()
      const moduleId = target.dataset.moduleId
      const userId = target.dataset.userId
      if (!moduleId || !userId) return

      const assignees = ensureAssigneeState(moduleId)
      const index = assignees.indexOf(userId)
      if (index >= 0) {
        assignees.splice(index, 1)
      } else if (assignees.length < MAX_ASSIGNEES_PER_MODULE) {
        assignees.push(userId)
      }

      render()
      return
    }

    if (action === "toggle-epic") {
      const epic = target.dataset.epic
      if (epic) {
        if (state.collapsedEpics.has(epic)) {
          state.collapsedEpics.delete(epic)
        } else {
          state.collapsedEpics.add(epic)
        }
        render()
      }
      return
    }

    if (action === "open-submit") {
      state.modal = true
      renderModal()
      return
    }

    if (action === "cancel-submit") {
      state.modal = null
      renderModal()
      return
    }

    if (action === "confirm-submit") {
      state.modal = null
      state.submitted = true
      render()
      return
    }

    if (action === "navigate-current") {
      window.history.pushState({}, "", "/planning/kanban")
      window.dispatchEvent(new PopStateEvent("popstate"))
      return
    }

    if (action === "spa-link") {
      event.preventDefault()
      const href = target.getAttribute("href")
      if (href) {
        window.history.pushState({}, "", href)
        window.dispatchEvent(new PopStateEvent("popstate"))
      }
    }
  }

  function handleInput(event) {
    if (event.target.id === "rr-sd-backlog-search") {
      state.backlogSearch = event.target.value || ""
      const available = getAvailableCount()
      els.backlogCount.textContent = `${available} available`
      els.backlogBody.innerHTML = renderBacklogPanel(state.scopedIds, BACKLOG_MODULES, state)
      const input = root.querySelector("#rr-sd-backlog-search")
      if (input) {
        input.value = state.backlogSearch
        requestAnimationFrame(() => {
          input.focus()
          input.setSelectionRange(input.value.length, input.value.length)
        })
      }
      return
    }

    if (event.target.id === "rr-sd-goal") {
      const counter = root.querySelector("#rr-sd-goal-counter")
      if (counter) {
        counter.textContent = `${event.target.value.trim().length}/${GOAL_CHAR_LIMIT}`
      }
    }
  }

  root.addEventListener("click", handleClick)
  root.addEventListener("input", handleInput)
  if (tabHeaderActions) tabHeaderActions.addEventListener("click", handleClick)

  render()

  return () => {
    root.removeEventListener("click", handleClick)
    root.removeEventListener("input", handleInput)
    if (tabHeaderActions) {
      tabHeaderActions.removeEventListener("click", handleClick)
      tabHeaderActions.innerHTML = ""
    }
    document.getElementById("rr-sd-styles")?.remove()
  }
}
