/**
 * Dependencies UML — DEP epic (DEP-M001)
 *
 * Renders a Bézier-curve dependency graph from a structured JSON map.
 * Read-only and navigable: drag to pan, click a node to trace its connections.
 */

// ─────────────────────────────────────────────────────────────────────
// DEPENDENCY DATA
// ─────────────────────────────────────────────────────────────────────

/**
 * Node schema
 *   id       – unique identifier
 *   type     – "ui" | "service" | "endpoint"
 *   x, y     – top-left position in the canvas world (px)
 *   w, h     – node dimensions (px)
 *   label    – display name
 *   --- service & endpoint only ---
 *   risk     – "high" | "medium" | "low"
 *   source   – e.g. "calls.api" | "triggers_workflow"
 *   conf     – coupling confidence 0–1
 *   endpoint – REST endpoint string shown as chip
 *   desc     – short description
 */
const DEP_NODES = [
  // ── Left column: UI source nodes ──────────────────────────────────
  {
    id: "UI-REQ",
    type: "ui",
    x: 40,
    y: 237,
    w: 178,
    h: 42,
    label: "UI-REQ (Backlog)",
  },
  {
    id: "UI-PLAN",
    type: "ui",
    x: 40,
    y: 569,
    w: 198,
    h: 42,
    label: "UI-PLAN (Planning)",
  },

  // ── Middle column: service/API nodes ──────────────────────────────
  {
    id: "API-READ",
    type: "service",
    x: 310,
    y: 100,
    w: 185,
    h: 150,
    label: "API-READ",
    risk: "high",
    source: "calls.api",
    conf: 0.92,
    endpoint: "GET/requirements/tree",
    desc: "Backlog renders EP \u2013 Module \u2013 F hierarchy",
  },
  {
    id: "SVC-DEPS",
    type: "service",
    x: 310,
    y: 266,
    w: 185,
    h: 150,
    label: "SVC-DEPS",
    risk: "medium",
    source: "calls.api",
    conf: 0.88,
    endpoint: "GET/dependencies/impact",
    desc: "Shows \u201cimpact count\u201d + deep-links",
  },
  {
    id: "SVC-SPRINT",
    type: "service",
    x: 310,
    y: 432,
    w: 185,
    h: 150,
    label: "SVC-SPRINT",
    risk: "low",
    source: "calls.api",
    conf: 0.90,
    endpoint: "POST/sprint-cycles",
    desc: "Create/activate sprint-cycles",
  },
  {
    id: "SVC-INTEGRATION",
    type: "service",
    x: 310,
    y: 598,
    w: 185,
    h: 150,
    label: "SVC-INTEGRATION",
    risk: "medium",
    source: "triggers_workflow",
    conf: 0.80,
    endpoint: "POST/automation/create-pr",
    desc: "Shows \u201cimpact count\u201d + deep-links",
  },

  // ── Right column: second-level dependencies ───────────────────────
  {
    id: "EP-REQ-TREE",
    type: "endpoint",
    x: 660,
    y: 100,
    w: 185,
    h: 88,
    label: "GET/requirements/tree",
    desc: "Backlog renders EP \u2013 Module \u2013 F hierarchy",
  },
  {
    id: "SVC-TEST",
    type: "service",
    x: 660,
    y: 266,
    w: 185,
    h: 150,
    label: "SVC-TEST",
    risk: "medium",
    source: "calls.api",
    conf: 0.88,
    endpoint: "GET/dependencies/impact",
    desc: "Shows \u201cimpact count\u201d + deep-links",
  },
]

/**
 * Edge schema
 *   id    – unique identifier
 *   from  – source node id
 *   to    – target node id (null = off-canvas)
 *   color – stroke colour
 *   ex,ey – explicit end point when `to` is null (off-canvas)
 */
const DEP_EDGES = [
  { id: "e-req-api",   from: "UI-REQ",          to: "API-READ",        color: "#0067da" },
  { id: "e-req-deps",  from: "UI-REQ",          to: "SVC-DEPS",        color: "#0067da" },
  { id: "e-plan-spr",  from: "UI-PLAN",         to: "SVC-SPRINT",      color: "#0067da" },
  { id: "e-plan-int",  from: "UI-PLAN",         to: "SVC-INTEGRATION", color: "#9b5bce" },
  { id: "e-api-ep",    from: "API-READ",         to: "EP-REQ-TREE",    color: "#d03045" },
  { id: "e-deps-test", from: "SVC-DEPS",        to: "SVC-TEST",        color: "#0067da" },
  // Off-canvas trailing connections (no target node)
  { id: "e-test-out",  from: "SVC-TEST",        to: null, color: "#f59e0b", ex: 1200, ey: 341 },
  { id: "e-int-out",   from: "SVC-INTEGRATION", to: null, color: "#f59e0b", ex: 1200, ey: 673 },
]

// ─────────────────────────────────────────────────────────────────────
// LIST VIEW DATA
// ─────────────────────────────────────────────────────────────────────

/**
 * Flat rows powering the list/table view.
 * Each row represents one directed dependency edge.
 */
const DEP_LIST_ROWS = [
  {
    from:      "UI-REQ (Backlog)",
    to:        "API-READ",
    relation:  "calls_api",
    interface: "GET/requirements/tree",
    risk:      "high",
    conf:      0.92,
    why:       "Backlog renders EP \u2013 Module \u2013 F hierarchy",
  },
  {
    from:      "UI-REQ (Backlog)",
    to:        "SVC-DEPS",
    relation:  "calls_api",
    interface: "GET/dependencies/impact",
    risk:      "medium",
    conf:      0.88,
    why:       "Shows \u201cimpact count\u201d + deep-links",
  },
  {
    from:      "UI-PLAN (Planning)",
    to:        "SVC-SPRINT",
    relation:  "calls_api",
    interface: "POST/sprint-cycles",
    risk:      "low",
    conf:      0.90,
    why:       "Create/activate sprint-cycles",
  },
  {
    from:      "UI-PLAN (Planning)",
    to:        "SVC-INTEGRATION",
    relation:  "triggers_workflow",
    interface: "POST/automation/create-pr",
    risk:      "medium",
    conf:      0.80,
    why:       "\u201cStart sprint\u201d opens PR design \u2192 dev",
  },
  {
    from:      "UI-TEST (Testing)",
    to:        "SVC-TEST",
    relation:  "calls_api",
    interface: "GET/testing/runs",
    risk:      "low",
    conf:      0.95,
    why:       "Testing dashboard/runs/coverage",
  },
  {
    from:      "SVC-TEST",
    to:        "SVC-GOV",
    relation:  "reads_policy",
    interface: "policy.coverage.threshold",
    risk:      "low",
    conf:      0.85,
    why:       "Coverage & manual suite requirements",
  },
  {
    from:      "SVC-RELEASE",
    to:        "SVC-TEST",
    relation:  "aggregates",
    interface: "evidence: tests/coverage/regresion",
    risk:      "low",
    conf:      0.90,
    why:       "Release notes include test proof",
  },
  {
    from:      "SVC-RELEASE",
    to:        "SVC-DEPS",
    relation:  "aggregates",
    interface: "dep diff: versionA\u2192B",
    risk:      "medium",
    conf:      0.82,
    why:       "Release notes include dependency changes",
  },
]

/** Unique "from" values used to populate the module filter dropdown */
const DEP_MODULES = [...new Set(DEP_LIST_ROWS.map((r) => r.from))]

// Canvas world dimensions
const WORLD_W = 1150
const WORLD_H = 820

// ─────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────

function escapeHtml(val) {
  return String(val ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const NODE_MAP = new Map(DEP_NODES.map((n) => [n.id, n]))

/** Right-centre port of a node (connection output) */
function srcPort(node) {
  return { x: node.x + node.w, y: node.y + node.h / 2 }
}

/** Left-centre port of a node (connection input) */
function tarPort(node) {
  return { x: node.x, y: node.y + node.h / 2 }
}

const RISK_LABELS = { high: "High", medium: "Medium", low: "Low" }

// ─────────────────────────────────────────────────────────────────────
// NODE RENDERERS
// ─────────────────────────────────────────────────────────────────────

function renderUiNode(node) {
  return `
    <div class="rr-dep-node rr-dep-node--ui"
         data-node-id="${escapeHtml(node.id)}"
         style="left:${node.x}px;top:${node.y}px;width:${node.w}px;height:${node.h}px"
         role="button" tabindex="0" aria-label="${escapeHtml(node.label)}">
      <span class="rr-dep-node-ui-label">${escapeHtml(node.label)}</span>
    </div>
  `
}

function renderServiceNode(node) {
  const riskLabel = escapeHtml(RISK_LABELS[node.risk] ?? node.risk ?? "")
  return `
    <div class="rr-dep-node rr-dep-node--service rr-dep-node--risk-${escapeHtml(node.risk ?? "unknown")}"
         data-node-id="${escapeHtml(node.id)}"
         style="left:${node.x}px;top:${node.y}px;width:${node.w}px"
         role="button" tabindex="0" aria-label="${escapeHtml(node.label)}">
      <div class="rr-dep-node-header">
        <span class="rr-dep-node-name">${escapeHtml(node.label)}</span>
        <span class="rr-dep-risk rr-dep-risk--${escapeHtml(node.risk ?? "unknown")}">${riskLabel}</span>
      </div>
      <div class="rr-dep-node-source">${escapeHtml(node.source)}</div>
      <div class="rr-dep-node-conf">Conf. ${node.conf.toFixed(2)}</div>
      <div class="rr-dep-node-endpoint">${escapeHtml(node.endpoint)}</div>
      <div class="rr-dep-node-desc">${escapeHtml(node.desc)}</div>
    </div>
  `
}

function renderEndpointNode(node) {
  return `
    <div class="rr-dep-node rr-dep-node--endpoint"
         data-node-id="${escapeHtml(node.id)}"
         style="left:${node.x}px;top:${node.y}px;width:${node.w}px"
         role="button" tabindex="0" aria-label="${escapeHtml(node.label)}">
      <div class="rr-dep-node-ep-label">${escapeHtml(node.label)}</div>
      <div class="rr-dep-node-ep-desc">${escapeHtml(node.desc)}</div>
    </div>
  `
}

function renderNode(node) {
  if (node.type === "ui") return renderUiNode(node)
  if (node.type === "service") return renderServiceNode(node)
  return renderEndpointNode(node)
}

// ─────────────────────────────────────────────────────────────────────
// SVG LAYER (connections + port dots)
// ─────────────────────────────────────────────────────────────────────

function renderEdgePath(edge) {
  const srcNode = NODE_MAP.get(edge.from)
  if (!srcNode) return ""

  const sp = srcPort(srcNode)

  let tp
  if (edge.to) {
    const tarNode = NODE_MAP.get(edge.to)
    if (!tarNode) return ""
    tp = tarPort(tarNode)
  } else {
    tp = { x: edge.ex, y: edge.ey }
  }

  const dx = tp.x - sp.x
  const offset = Math.abs(dx) * 0.45
  const cp1x = sp.x + offset
  const cp2x = tp.x - offset

  const d = `M ${sp.x} ${sp.y} C ${cp1x} ${sp.y}, ${cp2x} ${tp.y}, ${tp.x} ${tp.y}`

  // Off-canvas edges fade out
  const offscreen = !edge.to
  const extra = offscreen ? ' class="rr-dep-edge rr-dep-edge--offscreen"' : ' class="rr-dep-edge"'

  return `<path d="${d}" stroke="${escapeHtml(edge.color)}" fill="none" stroke-width="1.5" stroke-linecap="round" data-edge-id="${escapeHtml(edge.id)}"${extra}/>`
}

function renderPortDot(x, y, color) {
  return `<circle cx="${x}" cy="${y}" r="4.5" fill="${escapeHtml(color)}" class="rr-dep-port-dot"/>`
}

function buildSvg() {
  const paths = DEP_EDGES.map((e) => renderEdgePath(e)).join("\n")

  // Source dots (one per unique source node, coloured by first outgoing edge)
  const srcDotMap = new Map()
  const tarDots = []

  for (const edge of DEP_EDGES) {
    const srcNode = NODE_MAP.get(edge.from)
    if (srcNode && !srcDotMap.has(edge.from)) {
      const sp = srcPort(srcNode)
      srcDotMap.set(edge.from, { x: sp.x, y: sp.y, color: edge.color })
    }
    if (edge.to) {
      const tarNode = NODE_MAP.get(edge.to)
      if (tarNode) {
        const tp = tarPort(tarNode)
        tarDots.push({ x: tp.x, y: tp.y, color: edge.color, edgeId: edge.id })
      }
    }
  }

  const dots = [
    ...[...srcDotMap.values()].map((d) => renderPortDot(d.x, d.y, d.color)),
    ...tarDots.map((d) => renderPortDot(d.x, d.y, d.color)),
  ].join("\n")

  return `
    <svg
      class="rr-dep-svg"
      width="${WORLD_W}"
      height="${WORLD_H}"
      viewBox="0 0 ${WORLD_W} ${WORLD_H}"
      aria-hidden="true"
    >
      ${paths}
      ${dots}
    </svg>
  `
}

// ─────────────────────────────────────────────────────────────────────
// LIST VIEW
// ─────────────────────────────────────────────────────────────────────

const SORT_ASC_SVG  = `<svg class="rr-dep-sort-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3l-5 5h10L8 3z" fill="currentColor"/></svg>`
const SORT_DESC_SVG = `<svg class="rr-dep-sort-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13l5-5H3l5 5z" fill="currentColor"/></svg>`
const SORT_NONE_SVG = `<svg class="rr-dep-sort-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="opacity:.4"><path d="M8 3l-4 4h8L8 3zm0 10l4-4H4l4 4z" fill="currentColor"/></svg>`

function renderListRow(row) {
  const riskLabel = { high: "High", medium: "Medium", low: "Low" }[row.risk] ?? row.risk
  return `
    <div class="rr-dep-row" data-from="${escapeHtml(row.from)}">
      <div class="rr-dep-cell rr-dep-cell--from">${escapeHtml(row.from)}</div>
      <div class="rr-dep-cell rr-dep-cell--to">${escapeHtml(row.to)}</div>
      <div class="rr-dep-cell rr-dep-cell--relation">
        <span class="rr-dep-relation-chip">${escapeHtml(row.relation)}</span>
      </div>
      <div class="rr-dep-cell rr-dep-cell--iface">${escapeHtml(row.interface)}</div>
      <div class="rr-dep-cell rr-dep-cell--risk">
        <span class="rr-dep-risk-badge rr-dep-risk-badge--${escapeHtml(row.risk)}">${escapeHtml(riskLabel)}</span>
      </div>
      <div class="rr-dep-cell rr-dep-cell--why">${escapeHtml(row.why)}</div>
    </div>
  `
}

function renderListView(rows) {
  const rowsHtml = rows.map(renderListRow).join("")
  return `
    <div class="rr-dep-list-wrap" id="rr-dep-list">
      <div class="rr-dep-table" role="table" aria-label="Dependencies list">
        <div class="rr-dep-thead-wrap" role="rowgroup">
          <div class="rr-dep-thead" role="row">
            <div class="rr-dep-th rr-dep-th--from" role="columnheader"
                 id="rr-dep-sort-from" tabindex="0" aria-sort="ascending" style="cursor:pointer;user-select:none">
              From ${SORT_ASC_SVG}
            </div>
            <div class="rr-dep-th rr-dep-th--to" role="columnheader">To</div>
            <div class="rr-dep-th rr-dep-th--relation" role="columnheader">Relation</div>
            <div class="rr-dep-th rr-dep-th--iface" role="columnheader">Interface</div>
            <div class="rr-dep-th rr-dep-th--risk" role="columnheader">Risk</div>
            <div class="rr-dep-th rr-dep-th--why" role="columnheader">Why</div>
          </div>
        </div>
        <div class="rr-dep-tbody" id="rr-dep-tbody" role="rowgroup">
          ${rowsHtml}
        </div>
      </div>
    </div>
  `
}

// ─────────────────────────────────────────────────────────────────────
// TOOLBAR
// ─────────────────────────────────────────────────────────────────────

const CARET_DOWN_SVG = `<svg width="14" height="14" viewBox="0 0 256 256" fill="none" aria-hidden="true"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const SEARCH_SVG = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none" aria-hidden="true"><circle cx="116" cy="116" r="84" stroke="currentColor" stroke-width="16"/><line x1="175.4" y1="175.4" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`

function renderToolbar(state) {
  const viewLabel = state.view === "list" ? "List view" : "Graph view"
  const moduleLabel = state.module === "all" ? "All modules" : escapeHtml(state.module)

  // Module dropdown options
  const moduleOptions = [
    `<button type="button" class="rr-dep-dropdown-item${state.module === "all" ? " is-selected" : ""}" data-module="all">All modules</button>`,
    ...DEP_MODULES.map(
      (m) =>
        `<button type="button" class="rr-dep-dropdown-item${state.module === m ? " is-selected" : ""}" data-module="${escapeHtml(m)}">${escapeHtml(m)}</button>`
    ),
  ].join("")

  return `
    <div class="rr-dep-toolbar">
      <div class="rr-dep-toolbar-left">
        <!-- View-mode dropdown -->
        <div class="rr-dep-dropdown-wrap" id="rr-dep-view-wrap">
          <button type="button" class="rr-dep-select" id="rr-dep-view-btn"
                  aria-haspopup="listbox" aria-expanded="false" aria-label="Switch view mode">
            ${escapeHtml(viewLabel)}
            ${CARET_DOWN_SVG}
          </button>
          <div class="rr-dep-dropdown" id="rr-dep-view-dropdown" hidden role="listbox" aria-label="View mode">
            <button type="button" class="rr-dep-dropdown-item${state.view === "graph" ? " is-selected" : ""}" data-view="graph">Graph view</button>
            <button type="button" class="rr-dep-dropdown-item${state.view === "list"  ? " is-selected" : ""}" data-view="list">List view</button>
          </div>
        </div>
        <!-- Module filter dropdown -->
        <div class="rr-dep-dropdown-wrap" id="rr-dep-module-wrap">
          <button type="button" class="rr-dep-select" id="rr-dep-module-btn"
                  aria-haspopup="listbox" aria-expanded="false" aria-label="Filter by module">
            ${moduleLabel}
            ${CARET_DOWN_SVG}
          </button>
          <div class="rr-dep-dropdown" id="rr-dep-module-dropdown" hidden role="listbox" aria-label="Module filter">
            ${moduleOptions}
          </div>
        </div>
      </div>
      <div class="rr-dep-toolbar-right">
        <div class="rr-dep-search-wrap" role="search">
          <span class="rr-dep-search-icon">${SEARCH_SVG}</span>
          <input
            type="search"
            id="rr-dep-search"
            class="rr-dep-search"
            placeholder="Search"
            value="${escapeHtml(state.search)}"
            aria-label="Search dependencies"
          />
        </div>
      </div>
    </div>
  `
}

// ─────────────────────────────────────────────────────────────────────
// LEGEND
// ─────────────────────────────────────────────────────────────────────

function renderLegend() {
  const items = [
    { color: "#0067da", label: "Direct dependency" },
    { color: "#9b5bce", label: "Workflow trigger" },
    { color: "#d03045", label: "High-risk path" },
    { color: "#f59e0b", label: "Continues off-canvas" },
  ]

  const dots = items
    .map(
      (item) => `
        <div class="rr-dep-legend-item">
          <span class="rr-dep-legend-dot" style="background:${item.color}"></span>
          <span class="rr-dep-legend-label">${escapeHtml(item.label)}</span>
        </div>
      `
    )
    .join("")

  return `<div class="rr-dep-legend">${dots}</div>`
}

// ─────────────────────────────────────────────────────────────────────
// CANVAS WORLD
// ─────────────────────────────────────────────────────────────────────

function renderCanvas(state) {
  const nodes = DEP_NODES.map(renderNode).join("")
  const svg = buildSvg()
  return `
    <div class="rr-dep-canvas" id="rr-dep-canvas">
      <div class="rr-dep-world" id="rr-dep-world"
           style="transform:translate(${state.panX}px,${state.panY}px)">
        ${svg}
        ${nodes}
      </div>
      ${renderLegend()}
    </div>
  `
}

// ─────────────────────────────────────────────────────────────────────
// PUBLIC RENDER
// ─────────────────────────────────────────────────────────────────────

export async function renderDependenciesUmlFlow() {
  const initialState = { view: "graph", module: "all", search: "" }
  return `
    <section class="rr-dep" data-flow="dependencies-uml">
      ${renderToolbar(initialState)}
      ${renderCanvas({ panX: 32, panY: 32 })}
      ${renderListView(DEP_LIST_ROWS)}
    </section>
  `
}

// ─────────────────────────────────────────────────────────────────────
// MOUNT — interactivity
// ─────────────────────────────────────────────────────────────────────

export function mountDependenciesUmlFlow() {
  const root = document.querySelector('[data-flow="dependencies-uml"]')
  if (!root) return

  // ── View state ─────────────────────────────────────────────────────
  let currentView   = "graph"   // "graph" | "list"
  let currentModule = "all"
  let sortDir       = "asc"     // "asc" | "desc"

  const canvas  = root.querySelector("#rr-dep-canvas")
  const listEl  = root.querySelector("#rr-dep-list")
  const world   = root.querySelector("#rr-dep-world")

  /** Show/hide the two main panels based on currentView */
  function applyView() {
    if (currentView === "graph") {
      canvas?.removeAttribute("hidden")
      listEl?.setAttribute("hidden", "")
    } else {
      canvas?.setAttribute("hidden", "")
      listEl?.removeAttribute("hidden")
    }
    // Keep the view button label in sync
    const btn = root.querySelector("#rr-dep-view-btn")
    if (btn) {
      const labelNode = btn.childNodes[0]
      if (labelNode?.nodeType === Node.TEXT_NODE) {
        labelNode.textContent = currentView === "list" ? "List view " : "Graph view "
      }
    }
  }

  // Apply initial state — list starts hidden
  listEl?.setAttribute("hidden", "")

  // ── Dropdown helpers ───────────────────────────────────────────────
  function closeAllDropdowns() {
    root.querySelectorAll(".rr-dep-dropdown").forEach((d) => {
      d.hidden = true
    })
    root.querySelectorAll(".rr-dep-select").forEach((b) => {
      b.setAttribute("aria-expanded", "false")
    })
  }

  function toggleDropdown(dropdownId, btnId) {
    const dropdown = root.querySelector(`#${dropdownId}`)
    const btn      = root.querySelector(`#${btnId}`)
    if (!dropdown || !btn) return
    const isOpen = !dropdown.hidden
    closeAllDropdowns()
    if (!isOpen) {
      dropdown.hidden = false
      btn.setAttribute("aria-expanded", "true")
    }
  }

  root.querySelector("#rr-dep-view-btn")?.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleDropdown("rr-dep-view-dropdown", "rr-dep-view-btn")
  })

  root.querySelector("#rr-dep-module-btn")?.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleDropdown("rr-dep-module-dropdown", "rr-dep-module-btn")
  })

  // ── View switcher items ────────────────────────────────────────────
  root.querySelector("#rr-dep-view-dropdown")?.addEventListener("click", (e) => {
    const item = e.target.closest("[data-view]")
    if (!item) return
    currentView = item.dataset.view
    closeAllDropdowns()
    applyView()
    // Update selected state in dropdown
    root.querySelectorAll("#rr-dep-view-dropdown .rr-dep-dropdown-item").forEach((el) => {
      el.classList.toggle("is-selected", el.dataset.view === currentView)
    })
  })

  // ── Module filter items ────────────────────────────────────────────
  root.querySelector("#rr-dep-module-dropdown")?.addEventListener("click", (e) => {
    const item = e.target.closest("[data-module]")
    if (!item) return
    currentModule = item.dataset.module
    closeAllDropdowns()

    // Update button label
    const btn = root.querySelector("#rr-dep-module-btn")
    if (btn) {
      const labelNode = btn.childNodes[0]
      if (labelNode?.nodeType === Node.TEXT_NODE) {
        labelNode.textContent =
          currentModule === "all" ? "All modules " : `${currentModule} `
      }
    }
    // Update selected state
    root.querySelectorAll("#rr-dep-module-dropdown .rr-dep-dropdown-item").forEach((el) => {
      el.classList.toggle("is-selected", el.dataset.module === currentModule)
    })
    applyListFilter()
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", closeAllDropdowns, { capture: true })

  // ── List view filtering ────────────────────────────────────────────
  const tbody = root.querySelector("#rr-dep-tbody")

  function applyListFilter() {
    if (!tbody) return
    const searchInput = root.querySelector("#rr-dep-search")
    const query = searchInput?.value.trim().toLowerCase() ?? ""

    const rows = tbody.querySelectorAll(".rr-dep-row")
    rows.forEach((rowEl) => {
      const fromVal = rowEl.dataset.from ?? ""
      const matchModule =
        currentModule === "all" || fromVal === currentModule
      const matchSearch =
        !query || rowEl.textContent.toLowerCase().includes(query)
      rowEl.hidden = !(matchModule && matchSearch)
    })
  }

  // ── List view sort (From column) ───────────────────────────────────
  const sortFromBtn = root.querySelector("#rr-dep-sort-from")
  if (sortFromBtn && tbody) {
    sortFromBtn.addEventListener("click", () => {
      sortDir = sortDir === "asc" ? "desc" : "asc"
      sortFromBtn.setAttribute("aria-sort", sortDir === "asc" ? "ascending" : "descending")

      // Update icon
      const iconSvg = sortDir === "asc" ? SORT_ASC_SVG : SORT_DESC_SVG
      const existing = sortFromBtn.querySelector("svg")
      if (existing) existing.outerHTML = iconSvg
      else sortFromBtn.insertAdjacentHTML("beforeend", iconSvg)

      const rowEls = [...tbody.querySelectorAll(".rr-dep-row")]
      rowEls.sort((a, b) => {
        const aVal = (a.dataset.from ?? "").toLowerCase()
        const bVal = (b.dataset.from ?? "").toLowerCase()
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      })
      rowEls.forEach((r) => tbody.appendChild(r))
    })
  }

  // ── Search ─────────────────────────────────────────────────────────
  const searchInput = root.querySelector("#rr-dep-search")
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase()

      // Graph view: dim non-matching nodes
      if (currentView === "graph") {
        const allNodes = root.querySelectorAll(".rr-dep-node")
        if (!query) {
          allNodes.forEach((n) => n.classList.remove("is-search-dimmed"))
          return
        }
        allNodes.forEach((n) => {
          const node = NODE_MAP.get(n.dataset.nodeId)
          const text = [node?.label, node?.endpoint, node?.desc, node?.source]
            .join(" ")
            .toLowerCase()
          n.classList.toggle("is-search-dimmed", !text.includes(query))
        })
      }

      // List view: hide non-matching rows
      applyListFilter()
    })
  }

  // ── Pan state (graph view only) ────────────────────────────────────
  if (!canvas || !world) return

  let panX = 32
  let panY = 32
  let isPanning = false
  let didPan = false
  let startClientX = 0
  let startClientY = 0
  let startPanX = 32
  let startPanY = 32

  canvas.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".rr-dep-node")) return
    isPanning = true
    didPan = false
    startClientX = e.clientX
    startClientY = e.clientY
    startPanX = panX
    startPanY = panY
    canvas.setPointerCapture(e.pointerId)
    canvas.style.cursor = "grabbing"
  })

  canvas.addEventListener("pointermove", (e) => {
    if (!isPanning) return
    const dx = e.clientX - startClientX
    const dy = e.clientY - startClientY
    if (!didPan && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      didPan = true
    }
    if (didPan) {
      panX = startPanX + dx
      panY = startPanY + dy
      world.style.transform = `translate(${panX}px, ${panY}px)`
    }
  })

  canvas.addEventListener("pointerup", () => {
    isPanning = false
    canvas.style.cursor = "grab"
  })

  canvas.addEventListener("pointerleave", () => {
    if (isPanning) {
      isPanning = false
      canvas.style.cursor = "grab"
    }
  })

  // ── Click-to-select ────────────────────────────────────────────────
  let selectedNodeId = null

  function getEdgeIds(nodeId) {
    return new Set(
      DEP_EDGES.filter((e) => e.from === nodeId || e.to === nodeId).map(
        (e) => e.id
      )
    )
  }

  function getNeighbourNodeIds(nodeId) {
    const ids = new Set([nodeId])
    for (const e of DEP_EDGES) {
      if (e.from === nodeId && e.to) ids.add(e.to)
      if (e.to === nodeId) ids.add(e.from)
    }
    return ids
  }

  function applySelection(nodeId) {
    const allNodes = root.querySelectorAll(".rr-dep-node")
    const allEdges = root.querySelectorAll(".rr-dep-edge")
    const allDots  = root.querySelectorAll(".rr-dep-port-dot")

    if (!nodeId) {
      allNodes.forEach((n) => n.classList.remove("is-active", "is-dimmed"))
      allEdges.forEach((e) => {
        e.classList.remove("is-active", "is-dimmed")
        e.setAttribute("stroke-width", "1.5")
      })
      allDots.forEach((d) => d.classList.remove("is-active", "is-dimmed"))
      return
    }

    const edgeIds  = getEdgeIds(nodeId)
    const nodeIds  = getNeighbourNodeIds(nodeId)

    allNodes.forEach((n) => {
      const id = n.dataset.nodeId
      if (nodeIds.has(id)) {
        n.classList.add("is-active")
        n.classList.remove("is-dimmed")
      } else {
        n.classList.add("is-dimmed")
        n.classList.remove("is-active")
      }
    })

    allEdges.forEach((e) => {
      const id = e.dataset.edgeId
      if (edgeIds.has(id)) {
        e.classList.add("is-active")
        e.classList.remove("is-dimmed")
        e.setAttribute("stroke-width", "2.5")
      } else {
        e.classList.add("is-dimmed")
        e.classList.remove("is-active")
        e.setAttribute("stroke-width", "1.5")
      }
    })

    allDots.forEach((d) => d.classList.remove("is-active", "is-dimmed"))
  }

  root.addEventListener("click", (e) => {
    if (didPan) {
      didPan = false
      return
    }
    const nodeEl = e.target.closest(".rr-dep-node")
    if (nodeEl) {
      const nid = nodeEl.dataset.nodeId
      selectedNodeId = selectedNodeId === nid ? null : nid
      applySelection(selectedNodeId)
      return
    }
    if (
      !e.target.closest(".rr-dep-toolbar") &&
      !e.target.closest(".rr-dep-legend")
    ) {
      selectedNodeId = null
      applySelection(null)
    }
  })

  root.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return
    const nodeEl = e.target.closest(".rr-dep-node")
    if (!nodeEl) return
    e.preventDefault()
    const nid = nodeEl.dataset.nodeId
    selectedNodeId = selectedNodeId === nid ? null : nid
    applySelection(selectedNodeId)
  })

  return () => {
    document.removeEventListener("click", closeAllDropdowns, { capture: true })
  }
}
