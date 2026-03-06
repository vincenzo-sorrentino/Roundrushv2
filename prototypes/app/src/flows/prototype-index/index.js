/**
 * Prototype Index — entry point accessible via the RR logo in the sidebar.
 * Lists all available prototype flows grouped by type, with status badges and
 * direct links. Acts as the navigational home for the prototype system.
 */

const PROTOTYPE_GROUPS = [
  {
    id: "design-system",
    label: "Design System",
    description: "Foundations, tokens, and component documentation.",
    items: [
      {
        id: "foundations-colors",
        title: "Colour Foundations",
        subtitle: "Token scales, semantic colours, and display palette.",
        route: "/library/foundations/colors",
        status: "approved",
        epic: null,
        module: null
      },
      {
        id: "components-library",
        title: "Components Library",
        subtitle: "All UI components with variants, states, and sizes.",
        route: "/library/components",
        status: "approved",
        epic: null,
        module: null
      }
    ]
  },
  {
    id: "module-prototypes",
    label: "Module Prototypes",
    description: "Interactive flows for each requirement module.",
    items: [
      {
        id: "auth-login",
        title: "Login",
        subtitle: "Email and password authentication flow.",
        route: "/auth/login/default",
        status: "approved",
        epic: "AUT",
        module: "AUT-M001"
      },
      {
        id: "requirements-module",
        title: "Requirements Module",
        subtitle: "Hierarchical explorer for epics, modules, and functionalities.",
        route: "/requirements/module",
        status: "approved",
        epic: "REQ",
        module: "REQ-M001 · REQ-M002 · REQ-M003"
      },
      {
        id: "kanban-module",
        title: "Kanban / Sprint Board",
        subtitle: "Sprint planning board with module detail overlay.",
        route: "/planning/kanban",
        status: "approved",
        epic: "KAN",
        module: "KAN-M001 · KAN-M002"
      },
      {
        id: "dependencies-uml",
        title: "Dependencies Graph",
        subtitle: "UML dependency diagram — Bézier graph view with pan & node selection.",
        route: "/dependencies/uml",
        status: "approved",
        epic: "DEP",
        module: "DEP-M001"
      },
      {
        id: "docs-hub",
        title: "Docs Hub",
        subtitle: "Project documentation hub with search and section cards.",
        route: "/docs/hub",
        status: "approved",
        epic: "DOC",
        module: "DOC-M001"
      }
    ]
  }
]

const STATUS_LABELS = {
  approved: "Approved",
  draft: "Draft",
  archived: "Archived"
}

const STATUS_COLORS = {
  approved: "var(--rr-color-success-500)",
  draft: "var(--rr-color-neutral-400)",
  archived: "var(--rr-color-neutral-300)"
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function renderStatusBadge(status) {
  const label = escapeHtml(STATUS_LABELS[status] ?? status)
  const color = STATUS_COLORS[status] ?? STATUS_COLORS.draft
  return `
    <span class="rr-proto-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">
      ${label}
    </span>
  `
}

function renderCard(item) {
  const metaHtml = item.module
    ? `<span class="rr-proto-card-meta">${escapeHtml(item.epic)} &nbsp;/&nbsp; ${escapeHtml(item.module)}</span>`
    : ""

  return `
    <a href="${escapeHtml(item.route)}" class="rr-proto-card">
      <div class="rr-proto-card-header">
        <span class="rr-proto-card-title">${escapeHtml(item.title)}</span>
        ${renderStatusBadge(item.status)}
      </div>
      <p class="rr-proto-card-subtitle">${escapeHtml(item.subtitle)}</p>
      ${metaHtml}
    </a>
  `
}

function renderGroup(group) {
  return `
    <section class="rr-proto-group">
      <div class="rr-proto-group-header">
        <h2 class="rr-proto-group-title">${escapeHtml(group.label)}</h2>
        <p class="rr-proto-group-desc">${escapeHtml(group.description)}</p>
      </div>
      <div class="rr-proto-grid">
        ${group.items.map(renderCard).join("")}
      </div>
    </section>
  `
}

export async function renderPrototypeIndexFlow() {
  return `
    <style>
      .rr-proto-index {
        width: min(960px, 100%);
        margin: 0 auto;
        padding: var(--rr-spacing-xl) var(--rr-spacing-xl);
        display: grid;
        gap: var(--rr-spacing-2xl);
      }

      .rr-proto-index-header h1 {
        margin: 0 0 var(--rr-spacing-xs);
        font-size: 28px;
        font-weight: var(--rr-typography-fontWeightSemibold);
        color: var(--rr-sem-textPrimary);
      }

      .rr-proto-index-header p {
        margin: 0;
        color: var(--rr-sem-textMuted);
        font-size: 15px;
      }

      .rr-proto-group {
        display: grid;
        gap: var(--rr-spacing-lg);
      }

      .rr-proto-group-header {
        display: grid;
        gap: var(--rr-spacing-xs);
      }

      .rr-proto-group-title {
        margin: 0;
        font-size: 13px;
        font-weight: var(--rr-typography-fontWeightSemibold);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--rr-sem-textMuted);
      }

      .rr-proto-group-desc {
        margin: 0;
        font-size: 14px;
        color: var(--rr-sem-textSecondary);
      }

      .rr-proto-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: var(--rr-spacing-md);
      }

      .rr-proto-card {
        display: grid;
        gap: var(--rr-spacing-sm);
        padding: var(--rr-spacing-lg);
        background: var(--rr-sem-surface);
        border: 1px solid var(--rr-sem-borderDefault);
        border-radius: var(--rr-radius-lg);
        text-decoration: none;
        color: inherit;
        transition: border-color 0.15s, box-shadow 0.15s;
        cursor: pointer;
      }

      .rr-proto-card:hover {
        border-color: var(--rr-sem-actionPrimary);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.07);
      }

      .rr-proto-card-header {
        display: flex;
        align-items: center;
        gap: var(--rr-spacing-sm);
        justify-content: space-between;
      }

      .rr-proto-card-title {
        font-weight: var(--rr-typography-fontWeightSemibold);
        font-size: 15px;
        color: var(--rr-sem-textPrimary);
      }

      .rr-proto-card-subtitle {
        margin: 0;
        font-size: 13px;
        color: var(--rr-sem-textSecondary);
        line-height: 1.5;
      }

      .rr-proto-card-meta {
        font-size: 11px;
        font-weight: var(--rr-typography-fontWeightMedium);
        color: var(--rr-sem-textMuted);
        letter-spacing: 0.02em;
        font-family: var(--rr-typography-fontFamilyMono, monospace);
      }

      .rr-proto-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: var(--rr-typography-fontWeightMedium);
        white-space: nowrap;
        flex-shrink: 0;
      }

      .rr-proto-divider {
        border: none;
        border-top: 1px solid var(--rr-sem-borderDefault);
      }

      @media (max-width: 640px) {
        .rr-proto-index {
          padding: var(--rr-spacing-lg);
        }
        .rr-proto-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>

    <main class="rr-proto-index">
      <div class="rr-proto-index-header">
        <h1>Prototype Directory</h1>
        <p>Browse and open all interactive prototype flows for Roundrush. Click any card to navigate directly to the prototype.</p>
      </div>

      <hr class="rr-proto-divider" />

      ${PROTOTYPE_GROUPS.map(renderGroup).join('<hr class="rr-proto-divider" />')}
    </main>
  `
}
