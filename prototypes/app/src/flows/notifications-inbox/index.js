/* ──────────────────────────────────────────────────────────────
   Notifications Inbox — Prototype flow
   Path: /notifications/inbox
   Shows the bell-triggered notifications panel overlaid on a
   contextual planning view backdrop, matching Figma node 507:72612.
   ────────────────────────────────────────────────────────────── */

/* ── Icons ──────────────────────────────────────────────────── */
const ICON = {
  close: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="64" y1="64" x2="192" y2="192" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><line x1="192" y1="64" x2="64" y2="192" stroke="currentColor" stroke-width="18" stroke-linecap="round"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="40,128 96,184 216,64" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  paperclip: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M209.66 122.34l-82.05 82.05a56 56 0 0 1-79.2-79.19l89.35-89.35a40 40 0 0 1 56.57 56.57l-89.42 89.42a24 24 0 0 1-33.94-33.94l82.76-82.75" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  note: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M216 160l-56 56H48a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8v112z" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/><line x1="96" y1="96" x2="160" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="160,160 160,216 216,160" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chat: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M232 80a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v110.06A16 16 0 0 0 40 206h137.37L224 228V80z" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="216" x2="128" y2="40" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,112 128,40 200,112" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  equals: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  clock: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><polyline points="128,80 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bell: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M221.8 175.9C216.1 166.3 208 146.3 208 104a80 80 0 1 0-160 0c0 42.3-8.1 62.3-13.8 71.9A16 16 0 0 0 48 200h37.4A44 44 0 0 0 128 228a44 44 0 0 0 42.6-28H208a16 16 0 0 0 13.8-24.1z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

/* ── Helpers ─────────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/* ── Notification data ───────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: "n1",
    type: "note",
    actor: { name: "Brooklyn Simmons", initials: "BS", img: "https://i.pravatar.cc/40?img=47", color: "#5b7fa6" },
    action: "added a note",
    module: { label: "AUT – Login", color: "#0067da", bg: "#e8f0ff" },
    content: { type: "text", text: "Ensure the table is optimised for mobile view, maintaining usability and readability." },
    timestamp: "Feb 14, 2026 at 17:45",
    read: false,
  },
  {
    id: "n2",
    type: "attachment",
    actor: { name: "Brooklyn Simmons", initials: "BS", img: "https://i.pravatar.cc/40?img=47", color: "#5b7fa6" },
    action: "added an attachment",
    module: { label: "AUT – Login", color: "#0067da", bg: "#e8f0ff" },
    content: {
      type: "file",
      filename: "screenshot.png",
      preview: "https://placehold.co/72x40/e2e8f0/94a3b8?text=PNG",
    },
    timestamp: "Feb 14, 2026 at 17:45",
    read: false,
  },
  {
    id: "n3",
    type: "comment",
    actor: { name: "Andi Lane", initials: "AL", img: "https://i.pravatar.cc/40?img=32", color: "#b98a5e" },
    action: "added a comment",
    module: { label: "AUT – Login", color: "#0067da", bg: "#e8f0ff" },
    content: { type: "text", text: "Ensure the table is optimised for mobile view, maintaining usability and readability." },
    timestamp: "Feb 14, 2026 at 17:45",
    read: false,
  },
  {
    id: "n4",
    type: "comment",
    actor: { name: "Rene Wells", initials: "RW", img: "https://i.pravatar.cc/40?img=28", color: "#8b9e72" },
    action: "added a comment",
    module: { label: "AUT – Login", color: "#0067da", bg: "#e8f0ff" },
    content: { type: "text", text: "This looks good. The mobile responsiveness is important for the end users." },
    timestamp: "Feb 14, 2026 at 17:30",
    read: false,
  },
  {
    id: "n5",
    type: "note",
    actor: { name: "Orlando Diggs", initials: "OD", img: "https://i.pravatar.cc/40?img=12", color: "#b07a5a" },
    action: "added a note",
    module: { label: "KAN – Sprint Board", color: "#6941c6", bg: "#f5f0ff" },
    content: { type: "text", text: "Consider adding a time-tracking column to the sprint table for better estimation accuracy." },
    timestamp: "Feb 13, 2026 at 09:12",
    read: true,
  },
  {
    id: "n6",
    type: "attachment",
    actor: { name: "Candice Wu", initials: "CW", img: "https://i.pravatar.cc/40?img=5", color: "#7a8dbd" },
    action: "added an attachment",
    module: { label: "REQ – Module view", color: "#027a48", bg: "#ecfdf3" },
    content: {
      type: "file",
      filename: "wireframe-v3.fig",
      preview: "https://placehold.co/72x40/dcfce7/15803d?text=FIG",
    },
    timestamp: "Feb 12, 2026 at 14:20",
    read: true,
  },
]

/* ── Backdrop table data (simplified planning view) ────────── */
const BACKDROP_ROWS = [
  { id: "AUT-001", label: "Login form",        priority: "high",   assignees: ["https://i.pravatar.cc/24?img=1","https://i.pravatar.cc/24?img=5"], lastUpdate: "13.02.2026", tasks: "12/16", progress: 60 },
  { id: "AUT-002", label: "Session handling",  priority: "high",   assignees: ["https://i.pravatar.cc/24?img=9","https://i.pravatar.cc/24?img=3"], lastUpdate: "13.02.2026", tasks: "12/16", progress: 60 },
  { id: "REQ-001", label: "Requirements view", priority: "medium", assignees: ["https://i.pravatar.cc/24?img=8","https://i.pravatar.cc/24?img=12"], lastUpdate: "13.02.2026", tasks: "9/11",  progress: 80 },
  { id: "KAN-001", label: "Sprint board",      priority: "high",   assignees: ["https://i.pravatar.cc/24?img=16"], lastUpdate: "13.02.2026", tasks: "1/5",   progress: 25 },
  { id: "TEM-001", label: "Team management",   priority: "high",   assignees: [], lastUpdate: "13.02.2026", tasks: "3/3",   progress: 100 },
]

const PRIORITY_ICON = {
  urgent: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,208 128,128 208,208" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  high: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><polyline points="48,160 128,80 208,160" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  medium: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="40" y1="96" x2="216" y2="96" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><line x1="40" y1="160" x2="216" y2="160" stroke="currentColor" stroke-width="18" stroke-linecap="round"/></svg>`,
  low: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="18" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const PRIORITY_COLOR = { urgent: "#c0362d", high: "#d13245", medium: "#d97706", low: "#0067da" }

/* ── Render helpers ─────────────────────────────────────────── */
function renderNotificationIcon(type) {
  const cfg = {
    note:       { icon: ICON.note,       bg: "#f0f4ff", color: "#3b5bdb" },
    comment:    { icon: ICON.chat,       bg: "#f0fdf4", color: "#15803d" },
    attachment: { icon: ICON.paperclip,  bg: "#fdf4ff", color: "#9333ea" },
  }[type] || { icon: ICON.bell, bg: "#f5f5f5", color: "#888" }
  return `<span class="rr-notif-type-icon" style="background:${cfg.bg};color:${cfg.color}">${cfg.icon}</span>`
}

function renderContent(content) {
  if (content.type === "text") {
    return `<p class="rr-notif-text">${escapeHtml(content.text)}</p>`
  }
  if (content.type === "file") {
    return `
      <div class="rr-notif-attachment">
        <img class="rr-notif-attachment-thumb" src="${escapeHtml(content.preview)}" alt="" />
        <span class="rr-notif-attachment-name">${ICON.paperclip} ${escapeHtml(content.filename)}</span>
      </div>
    `
  }
  return ""
}

function renderNotificationItem(n) {
  const readClass = n.read ? " rr-notif-item--read" : ""
  return `
    <article class="rr-notif-item${readClass}" data-notif-id="${escapeHtml(n.id)}" role="listitem" tabindex="0" aria-label="${escapeHtml(n.actor.name)} ${escapeHtml(n.action)}">
      <div class="rr-notif-item-left">
        <div class="rr-notif-avatar-wrap">
          <img class="rr-notif-avatar" src="${escapeHtml(n.actor.img)}" alt="${escapeHtml(n.actor.name)}" width="32" height="32" />
          ${renderNotificationIcon(n.type)}
        </div>
      </div>
      <div class="rr-notif-item-body">
        <div class="rr-notif-item-meta">
          <span class="rr-notif-actor">${escapeHtml(n.actor.name)}</span>
          <span class="rr-notif-action"> ${escapeHtml(n.action)}</span>
        </div>
        <span class="rr-notif-module-badge" style="color:${escapeHtml(n.module.color)};background:${escapeHtml(n.module.bg)}">${escapeHtml(n.module.label)}</span>
        ${renderContent(n.content)}
        <time class="rr-notif-timestamp">${ICON.clock} ${escapeHtml(n.timestamp)}</time>
      </div>
      ${!n.read ? `<span class="rr-notif-unread-dot" aria-label="Unread"></span>` : ""}
    </article>
  `
}

function renderBackdropRow(row) {
  const priColor = PRIORITY_COLOR[row.priority] || "#888"
  const priIcon  = PRIORITY_ICON[row.priority] || ""
  const pct = row.progress
  const progressColor = pct >= 80 ? "#12b76a" : pct >= 50 ? "#0067da" : "#e5e7eb"
  const avatarHtml = row.assignees.slice(0, 3).map((img, i) => `
    <img class="rr-notif-backdrop-avatar" src="${img}" alt="" style="margin-left:${i > 0 ? "-8px" : "0"}" />
  `).join("")

  return `
    <tr class="rr-notif-backdrop-row">
      <td class="rr-notif-backdrop-cell rr-notif-backdrop-cell--name">
        <span class="rr-notif-backdrop-id">${escapeHtml(row.id)}</span>
        <span class="rr-notif-backdrop-label">${escapeHtml(row.label)}</span>
      </td>
      <td class="rr-notif-backdrop-cell">
        <span class="rr-notif-backdrop-priority" style="color:${priColor}">${priIcon} ${escapeHtml(row.priority.charAt(0).toUpperCase() + row.priority.slice(1))}</span>
      </td>
      <td class="rr-notif-backdrop-cell">
        <div class="rr-notif-backdrop-avatars">${avatarHtml}</div>
      </td>
      <td class="rr-notif-backdrop-cell rr-notif-backdrop-cell--date">${escapeHtml(row.lastUpdate)}</td>
      <td class="rr-notif-backdrop-cell">${escapeHtml(row.tasks)}</td>
      <td class="rr-notif-backdrop-cell">
        <div class="rr-notif-backdrop-progress">
          <div class="rr-notif-backdrop-progress-bar" style="width:${pct}%;background:${progressColor}"></div>
        </div>
        <span class="rr-notif-backdrop-progress-pct">${pct}%</span>
      </td>
    </tr>
  `
}

/* ── Main render ────────────────────────────────────────────── */
export function renderNotificationsInboxFlow() {
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length

  const panel = `
    <div class="rr-notif-panel" id="rr-notif-panel" role="dialog" aria-label="Notifications" aria-modal="false">
      <div class="rr-notif-header">
        <h2 class="rr-notif-title">${ICON.bell} Notifications
          ${unreadCount > 0 ? `<span class="rr-notif-badge">${unreadCount}</span>` : ""}
        </h2>
        <button class="rr-notif-close-btn" data-action="close-notifications" type="button" aria-label="Close notifications">
          ${ICON.close}
        </button>
      </div>
      <div class="rr-notif-tabs" role="tablist">
        <button class="rr-notif-tab rr-notif-tab--active" data-tab="all" role="tab" aria-selected="true">All</button>
        <button class="rr-notif-tab" data-tab="unread" role="tab" aria-selected="false">
          Unread <span class="rr-notif-tab-count">${unreadCount}</span>
        </button>
        <button class="rr-notif-tab" data-tab="mentions" role="tab" aria-selected="false">Mentions</button>
      </div>
      <div class="rr-notif-list" id="rr-notif-list" role="list">
        ${NOTIFICATIONS.map(renderNotificationItem).join("")}
      </div>
      <div class="rr-notif-footer">
        <button class="rr-notif-mark-all-btn" data-action="mark-all-read" type="button">
          ${ICON.check} Mark all as read
        </button>
      </div>
    </div>
  `

  const backdrop = `
    <div class="rr-notif-backdrop-area">
      <div class="rr-notif-backdrop-toolbar">
        <span class="rr-notif-backdrop-filter-label">All statuses ${ICON.caretDown}</span>
        <div class="rr-notif-backdrop-search">
          ${ICON.search}
          <input type="text" placeholder="Search" class="rr-notif-backdrop-search-input" readonly tabindex="-1" />
        </div>
      </div>
      <div class="rr-notif-backdrop-section">
        <div class="rr-notif-backdrop-section-header">
          <span class="rr-notif-backdrop-section-label">Authentication</span>
          <span class="rr-notif-backdrop-section-count">3 modules</span>
        </div>
        <table class="rr-notif-backdrop-table">
          <thead>
            <tr>
              <th class="rr-notif-backdrop-th rr-notif-backdrop-th--name">Module</th>
              <th class="rr-notif-backdrop-th">Priority ${ICON.arrowDown}</th>
              <th class="rr-notif-backdrop-th">Assignee</th>
              <th class="rr-notif-backdrop-th">Last update</th>
              <th class="rr-notif-backdrop-th">Tasks</th>
              <th class="rr-notif-backdrop-th">Unit tests</th>
            </tr>
          </thead>
          <tbody>
            ${BACKDROP_ROWS.map(renderBackdropRow).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `

  /* Empty state (panel closed) */
  const openBtn = `
    <div class="rr-notif-open-cta" id="rr-notif-open-cta" style="display:none">
      <button class="rr-notif-open-btn" data-action="open-notifications" type="button">
        ${ICON.bell} Open notifications
        ${unreadCount > 0 ? `<span class="rr-notif-badge">${unreadCount}</span>` : ""}
      </button>
    </div>
  `

  return `
    <div class="rr-notif-scene">
      <div class="rr-notif-overlay-area">
        ${panel}
      </div>
      ${backdrop}
      ${openBtn}
    </div>
  `
}

/* ── State management ───────────────────────────────────────── */
let state = NOTIFICATIONS.map(n => ({ ...n }))

function updateUnreadCount() {
  const count = state.filter(n => !n.read).length
  const badge = document.querySelector(".rr-notif-badge")
  const tabCount = document.querySelector(".rr-notif-tab-count")
  const title = document.querySelector(".rr-notif-title")

  if (badge) badge.textContent = count > 0 ? String(count) : ""
  if (badge) badge.style.display = count > 0 ? "" : "none"
  if (tabCount) tabCount.textContent = String(count)

  // Update sidebar bell badge count
  const sidebarDot = document.querySelector(".rr-sidebar-notification-dot")
  if (sidebarDot) sidebarDot.style.display = count > 0 ? "" : "none"
  const sidebarBadge = document.querySelector(".rr-sidebar-inbox-badge")
  if (sidebarBadge) sidebarBadge.textContent = String(count)
}

function markItemRead(id) {
  const n = state.find(n => n.id === id)
  if (!n || n.read) return
  n.read = true
  const el = document.querySelector(`[data-notif-id="${id}"]`)
  if (el) el.classList.add("rr-notif-item--read")
  const dot = el?.querySelector(".rr-notif-unread-dot")
  if (dot) dot.remove()
  updateUnreadCount()
}

function markAllRead() {
  state.forEach(n => { n.read = true })
  document.querySelectorAll(".rr-notif-item").forEach(el => {
    el.classList.add("rr-notif-item--read")
    const dot = el.querySelector(".rr-notif-unread-dot")
    if (dot) dot.remove()
  })
  updateUnreadCount()
}

function closePanel() {
  const panel = document.querySelector("#rr-notif-panel")
  const cta   = document.querySelector("#rr-notif-open-cta")
  if (panel) {
    panel.classList.add("rr-notif-panel--closing")
    setTimeout(() => {
      panel.style.display = "none"
      panel.classList.remove("rr-notif-panel--closing")
    }, 200)
  }
  if (cta) cta.style.display = "flex"
}

function openPanel() {
  const panel = document.querySelector("#rr-notif-panel")
  const cta   = document.querySelector("#rr-notif-open-cta")
  if (panel) {
    panel.style.display = ""
    panel.classList.add("rr-notif-panel--opening")
    setTimeout(() => panel.classList.remove("rr-notif-panel--opening"), 200)
  }
  if (cta) cta.style.display = "none"
}

function switchTab(tab) {
  document.querySelectorAll(".rr-notif-tab").forEach(btn => {
    const active = btn.dataset.tab === tab
    btn.classList.toggle("rr-notif-tab--active", active)
    btn.setAttribute("aria-selected", String(active))
  })

  const list = document.querySelector("#rr-notif-list")
  if (!list) return

  const filtered = tab === "unread" ? state.filter(n => !n.read) : tab === "mentions" ? [] : state
  list.innerHTML = filtered.length
    ? filtered.map(renderNotificationItem).join("")
    : `<div class="rr-notif-empty">No ${tab === "unread" ? "unread" : tab === "mentions" ? "mention" : ""} notifications</div>`
}

export function mountNotificationsInboxFlow() {
  const scene = document.querySelector(".rr-notif-scene")
  if (!scene) return

  // Reset state
  state = NOTIFICATIONS.map(n => ({ ...n }))

  scene.addEventListener("click", e => {
    const action = e.target.closest("[data-action]")?.dataset.action
    const notifItem = e.target.closest(".rr-notif-item")
    const tab = e.target.closest("[data-tab]")?.dataset.tab

    if (action === "close-notifications") { closePanel(); return }
    if (action === "open-notifications")  { openPanel();  return }
    if (action === "mark-all-read")       { markAllRead(); return }
    if (notifItem) { markItemRead(notifItem.dataset.notifId); return }
    if (tab)       { switchTab(tab); return }
  })

  scene.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const notifItem = e.target.closest(".rr-notif-item")
      if (notifItem) { e.preventDefault(); markItemRead(notifItem.dataset.notifId) }
    }
    if (e.key === "Escape") closePanel()
  })

  updateUnreadCount()
}
