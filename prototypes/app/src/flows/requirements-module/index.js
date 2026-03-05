const ACCEPTANCE_LAWS = [
  {
    id: "AL-01",
    name: "Production code implemented",
    description: "Required production code for all modules is implemented and merged into the integration branch.",
    evidence: "Merge status",
    status: "pass"
  },
  {
    id: "AL-02",
    name: "Unit and integration tests pass with required coverage",
    description: "All unit and integration tests pass and coverage meets the project threshold.",
    evidence: "TestExecution (unit), TestExecution (integration), CoverageReport",
    status: "pass"
  },
  {
    id: "AL-03",
    name: "Documentation updated",
    description: "Documentation is updated where applicable (requirements, code comments, component docs, technical docs).",
    evidence: "Documentation update",
    status: "pass"
  },
  {
    id: "AL-04",
    name: "End-to-end tests implemented and passed",
    description: "E2E tests exist for user-facing flows and pass in CI.",
    evidence: "Test execution (e2e)",
    status: "pass"
  },
  {
    id: "AL-05",
    name: "Dependency map updated",
    description: "Dependency map is updated (or explicitly confirmed unchanged) when changes affect module boundaries or coupling.",
    evidence: "Dependency graph update",
    status: "pass"
  },
  {
    id: "AL-06",
    name: "Dependency-based regression tests pass",
    description: "Regression tests derived from impacted modules (via dependency map) pass with 100% success.",
    evidence: "Test execution (regression)",
    status: "pass"
  },
  {
    id: "AL-07",
    name: "Required manual suites completed",
    description: "Required manual validation sessions are completed and recorded.",
    evidence: "Manual test session",
    status: "pass"
  }
]

const MODULES = [
  {
    id: "AUT-M001",
    code: "AUT-M001",
    title: "User login",
    scope: "Allow registered users to authenticate with email + password and recover a forgotten password.",
    status: "released",
    laws: {
      "AL-01": { status: "pass" },
      "AL-02": { status: "pass" },
      "AL-03": { status: "pass" },
      "AL-04": { status: "pass" },
      "AL-05": { status: "pass" },
      "AL-06": { status: "pass" },
      "AL-07": { status: "pass" }
    },
    prototypes: [
      {
        name: "Login flow - v1",
        version: "v1",
        path: "/prototypes/AUT/login/v1/",
        status: "validated",
        flow: "Login form -> submit -> success and failed states"
      }
    ],
    functionalities: [
      {
        id: "AUT-M001-F001",
        shortCode: "AUT-M001-F001",
        title: "Login form",
        filename: "AUT-M001-F001-login-form.md",
        status: "validated",
        userStory:
          "As a registered user, I want to log in with my email and password so that I can access my team's workspace.",
        acceptanceCriteria: [
          {
            given: "A user with a verified account exists",
            when: "They submit valid email + password",
            then: "They are redirected to the dashboard"
          },
          {
            given: "A user with a verified account exists",
            when: "They submit an incorrect password",
            then: "An inline error is shown without revealing which field is wrong"
          },
          {
            given: "A user submits the login form",
            when: "More than 5 failed attempts occur within 15 min",
            then: "The account is temporarily locked and the user is notified"
          },
          {
            given: "A user is on the login page",
            when: "They have no account",
            then: "A link to request an invitation is visible"
          }
        ],
        edgeCases:
          "Multiple failed attempts should not expose whether an email exists. Error messages must not reveal sensitive details. Form validation for empty/invalid email format.",
        prototypeRef: "Prototype: AUT-M001 v1 | Flow: Login form -> submit -> success/failed states"
      },
      {
        id: "AUT-M001-F002",
        shortCode: "AUT-M001-F002",
        title: "Password reset",
        filename: "AUT-M001-F002-password-reset.md",
        status: "validated",
        userStory:
          "As a registered user who forgot their password, I want to reset it via email so that I can regain access.",
        acceptanceCriteria: [
          {
            given: "A user is on the login page",
            when: 'They click "Forgot password"',
            then: "They see a form to enter their email"
          },
          {
            given: "A user submits a valid registered email",
            when: "The system processes the request",
            then: "A time-limited reset link is sent to that email"
          },
          {
            given: "A user opens a valid reset link",
            when: "They submit a new password meeting the policy",
            then: "The password is updated and they are prompted to log in"
          },
          {
            given: "A user opens an expired or invalid reset link",
            when: "They try to submit a new password",
            then: "An error message explains the link is no longer valid"
          }
        ],
        edgeCases:
          "Do not reveal account existence in reset responses. Expired links should fail safely with a clear retry path.",
        prototypeRef: "Prototype: AUT-M001 v1 | Flow: recover password request -> email link -> reset"
      },
      {
        id: "AUT-M001-F003",
        shortCode: "AUT-M001-F003",
        title: "OTP code",
        filename: "AUT-M001-F003-otp-code.md",
        status: "released",
        userStory:
          "As a user in high-risk sessions, I want to validate with a temporary OTP code so that sign-in remains secure.",
        acceptanceCriteria: [
          {
            given: "A login attempt triggers OTP",
            when: "A valid OTP is submitted within the time window",
            then: "The user is authenticated"
          }
        ],
        edgeCases: "Expired or reused OTP codes must be rejected.",
        prototypeRef: "Prototype: AUT-M001 v1 | Flow: OTP verification"
      },
      {
        id: "AUT-M001-F004",
        shortCode: "AUT-M001-F004",
        title: "Account selection",
        filename: "AUT-M001-F004-account-selection.md",
        status: "released",
        userStory:
          "As a user with access to multiple contexts, I want to choose an account before entering the workspace.",
        acceptanceCriteria: [
          {
            given: "A user belongs to multiple workspaces",
            when: "They log in successfully",
            then: "They can pick the workspace to enter"
          }
        ],
        edgeCases: "Selection defaults must be deterministic when one workspace exists.",
        prototypeRef: "Prototype: AUT-M001 v1 | Flow: select account"
      }
    ]
  },
  {
    id: "AUT-M002",
    code: "AUT-M002",
    title: "User authentication process",
    scope:
      "Allow new users to join RoundRush through invitation email, account creation, and automatic team joining.",
    status: "released",
    laws: {
      "AL-01": { status: "pass" },
      "AL-02": { status: "pass" },
      "AL-03": { status: "pass" },
      "AL-04": { status: "pass" },
      "AL-05": { status: "pass" },
      "AL-06": { status: "pass" },
      "AL-07": { status: "pass" }
    },
    prototypes: [
      {
        name: "Signup flow - v1",
        version: "v1",
        path: "/prototypes/AUT/signup/v1/",
        status: "in-progress",
        flow: "Invitation email -> account creation -> join team"
      }
    ],
    functionalities: [
      {
        id: "AUT-M002-F001",
        shortCode: "AUT-M002-F001",
        title: "Get invitation email",
        filename: "AUT-M002-F001-invitation-email.md",
        status: "released",
        userStory:
          "As a prospective user, I want to receive an invitation email from a team admin so that I can begin the signup process.",
        acceptanceCriteria: [
          {
            given: 'An admin enters a valid email in the "Invite member" form',
            when: "They submit the form",
            then: "An invitation email is sent to that address"
          },
          {
            given: "The prospective user receives the email",
            when: "They open it",
            then: "The email contains a unique, time-limited signup link and the team name"
          },
          {
            given: "An admin tries to invite an email that already has an account",
            when: "They submit the form",
            then: "The system informs the admin that the user already exists"
          },
          {
            given: "An invitation link expires",
            when: "The prospective user clicks it",
            then: "They see a message explaining the link has expired and how to request a new one"
          }
        ],
        edgeCases: "Invitation links must be single-use and securely signed.",
        prototypeRef: "Prototype: AUT-M002 v1 | Flow: admin invite -> invitation email"
      },
      {
        id: "AUT-M002-F002",
        shortCode: "AUT-M002-F002",
        title: "Make an account",
        filename: "AUT-M002-F002-make-an-account.md",
        status: "validated",
        userStory:
          "As an invited user, I want to create my account by setting my name and password so that I have credentials to log in.",
        acceptanceCriteria: [
          {
            given: "A user arrives via a valid invitation link",
            when: "They see the signup form",
            then: "The email field is pre-filled and read-only"
          },
          {
            given: "The user fills in name and a password meeting the policy",
            when: "They submit the form",
            then: "The account is created and they proceed to join the team"
          },
          {
            given: "The user enters a password that does not meet the policy",
            when: "They try to submit",
            then: "Inline validation explains the policy requirements"
          },
          {
            given: "The signup form is submitted",
            when: "The server processes it",
            then: "The password is stored using a secure hashing algorithm (bcrypt or argon2)"
          }
        ],
        edgeCases: "Invitation email must stay immutable in the form.",
        prototypeRef: "Prototype: AUT-M002 v1 | Flow: invitation link -> account creation"
      },
      {
        id: "AUT-M002-F003",
        shortCode: "AUT-M002-F003",
        title: "Join team",
        filename: "AUT-M002-F003-join-team.md",
        status: "validated",
        userStory:
          "As a newly registered user, I want to be automatically added to the team that invited me so that I can start collaborating immediately.",
        acceptanceCriteria: [
          {
            given: "A user has just completed account creation via invitation",
            when: "The account is confirmed",
            then: "They are automatically added to the inviting team as a member"
          },
          {
            given: "The user is added to the team",
            when: "They land on the dashboard",
            then: "They see the team name and any shared resources"
          },
          {
            given: "A user tries to join a team they are already a member of",
            when: "The system processes the request",
            then: "A friendly message indicates they are already a member"
          },
          {
            given: "The invitation referenced a team that no longer exists",
            when: "The user completes signup",
            then: "They are shown an error and prompted to contact support"
          }
        ],
        edgeCases: "Team assignment must be transactional with account creation when possible.",
        prototypeRef: "Prototype: AUT-M002 v1 | Flow: account created -> team membership"
      }
    ]
  },
  {
    id: "AUT-M003",
    code: "AUT-M003",
    title: "User session management",
    scope: "Track, refresh, and revoke sessions safely across devices.",
    status: "planned",
    laws: {
      "AL-01": { status: "unknown" },
      "AL-02": { status: "unknown" },
      "AL-03": { status: "unknown" },
      "AL-04": { status: "unknown" },
      "AL-05": { status: "unknown" },
      "AL-06": { status: "unknown" },
      "AL-07": { status: "unknown" }
    },
    prototypes: [],
    functionalities: []
  },
  {
    id: "AUT-M004",
    code: "AUT-M004",
    title: "User password recovery",
    scope: "Centralize recovery policies and risk checks for reset journeys.",
    status: "planned",
    laws: {
      "AL-01": { status: "unknown" },
      "AL-02": { status: "unknown" },
      "AL-03": { status: "unknown" },
      "AL-04": { status: "unknown" },
      "AL-05": { status: "unknown" },
      "AL-06": { status: "unknown" },
      "AL-07": { status: "unknown" }
    },
    prototypes: [],
    functionalities: []
  },
  {
    id: "AUT-M005",
    code: "AUT-M005",
    title: "2-factor authentication",
    scope: "Add step-up authentication for sensitive access paths.",
    status: "planned",
    laws: {
      "AL-01": { status: "unknown" },
      "AL-02": { status: "unknown" },
      "AL-03": { status: "unknown" },
      "AL-04": { status: "unknown" },
      "AL-05": { status: "unknown" },
      "AL-06": { status: "unknown" },
      "AL-07": { status: "unknown" }
    },
    prototypes: [],
    functionalities: []
  }
]

const EPIC = {
  id: "AUT",
  title: "Authentication",
  fullTitle: "Authentication and team access",
  owner: "GivePayments",
  objective:
    "Provide secure authentication and invitation-based onboarding so users can access RoundRush within the correct team.",
  designState: "drafting",
  inScope: [
    "Login and password recovery",
    "Invitation-based signup and team joining"
  ],
  outOfScope: [
    "Advanced org management (multiple orgs per user)",
    "SSO (SAML/OAuth enterprise), MFA (can be later EP)",
    'Role/permission system beyond minimum "member/admin" needed for invites'
  ],
  prototypes: [
    { name: "Login flow - v1", path: "/prototypes/AUT/login/v1/", status: "validated" },
    { name: "Signup flow - v1", path: "/prototypes/AUT/signup/v1/", status: "in-progress" }
  ]
}

const SIDE_PROJECTS = [
  "DAS - Dashboard",
  "ONB - Onboarding",
  "TEM - Team management",
  "TRA - Transactions"
]

const MODULE_BY_ID = new Map(MODULES.map((module) => [module.id, module]))
const FUNCTIONALITY_BY_ID = new Map(
  MODULES.flatMap((module) =>
    module.functionalities.map((item) => [
      item.id,
      {
        ...item,
        moduleId: module.id,
        moduleCode: module.code,
        moduleTitle: module.title,
        moduleStatus: module.status,
        modulePrototypes: module.prototypes
      }
    ])
  )
)

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function toStatusClass(status) {
  return String(status || "unknown")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
}

function toStatusLabel(status) {
  const labels = {
    pass: "Pass",
    released: "Released",
    validated: "Validated",
    "in-progress": "In sprint",
    planned: "Ready for sprint",
    draft: "To do",
    design: "Design"
  }
  return labels[String(status || "").toLowerCase()] || "Unknown"
}

function getNodeById(id) {
  if (id === EPIC.id) {
    return { type: "epic", ...EPIC }
  }

  if (MODULE_BY_ID.has(id)) {
    return { type: "module", ...MODULE_BY_ID.get(id) }
  }

  if (FUNCTIONALITY_BY_ID.has(id)) {
    return { type: "functionality", ...FUNCTIONALITY_BY_ID.get(id) }
  }

  return { type: "epic", ...EPIC }
}

function getTabsForNode(node) {
  if (node.type === "epic") {
    return [
      { id: "description", label: "Description" },
      { id: "acceptance-laws", label: "Acceptance Laws" },
      { id: "modules", label: "Modules" },
      { id: "prototypes", label: "Prototypes" }
    ]
  }

  if (node.type === "module") {
    return [
      { id: "description", label: "Description" },
      { id: "acceptance-laws", label: "Acceptance Laws" },
      { id: "functionalities", label: "Functionalities" },
      { id: "prototypes", label: "Prototypes" }
    ]
  }

  // No tabs for functionality pages
  if (node.type === "functionality") {
    return []
  }

  return [
    { id: "description", label: "Description" },
    { id: "acceptance-laws", label: "Acceptance Laws" },
    { id: "functionalities", label: "Functionalities" },
    { id: "prototypes", label: "Prototype" }
  ]
}

function getDefaultTabForNode(node) {
  return "description"
}

function renderStatusBadge(status) {
  const statusClass = toStatusClass(status)
  const label = toStatusLabel(status)
  
  // Map status to badge color
  let badgeColor = "gray"
  if (["pass", "released", "validated"].includes(statusClass)) {
    badgeColor = "green"
  } else if (["in-sprint", "in-progress"].includes(statusClass)) {
    badgeColor = "blue"
  } else if (["ready-for-sprint", "planned"].includes(statusClass)) {
    badgeColor = "red"
  } else if (statusClass === "design") {
    badgeColor = "purple"
  }
  
  return `<div class="rr-badge-square rr-badge-square--${badgeColor} rr-badge-square--fill-light">
    <p class="rr-badge-square-label">${escapeHtml(label)}</p>
  </div>`
}

function renderAcceptanceLawsTable() {
  const rows = ACCEPTANCE_LAWS.map(
    (law) => `
      <tr>
        <td>
          <div class="rr-rm2-table-cell-content">
            <span class="rr-rm2-table-cell-text">${escapeHtml(law.id)}</span>
          </div>
        </td>
        <td>
          <div class="rr-rm2-table-cell-content">
            <span class="rr-rm2-table-cell-text">${escapeHtml(law.name)}</span>
            <span class="rr-rm2-table-cell-supporting">${escapeHtml(law.description)}</span>
          </div>
        </td>
        <td>
          <div class="rr-rm2-table-cell-content">
            <span class="rr-rm2-table-cell-text">${escapeHtml(law.evidence)}</span>
          </div>
        </td>
        <td>${renderStatusBadge(law.status)}</td>
      </tr>
    `
  ).join("")

  return `
    <div class="rr-rm2-table-wrap">
      <table class="rr-rm2-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Law</th>
            <th>Evidence</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `
}

function renderEpicDescription() {
  return `
    <section class="rr-rm2-content-card">
      <h3>Description</h3>
      <div class="rr-rm2-divider"></div>
      <pre class="rr-rm2-pre">id: AUT
title_short: Authentication
title: Authentication and team access
design_state: drafting
modules:
  - AUT-M001 (User login)
  - AUT-M002 (Signup)
  - AUT-M003 (Session management)
  - AUT-M004 (Password recovery)
  - AUT-M005 (2-factor authentication)</pre>
      <div class="rr-rm2-divider"></div>
      <h4>Objective</h4>
      <p>${escapeHtml(EPIC.objective)}</p>
      <h4>In scope</h4>
      <ul>
        ${EPIC.inScope.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
      </ul>
      <h4>Out of scope (for this EP)</h4>
      <ul>
        ${EPIC.outOfScope.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
      </ul>
    </section>
  `
}

function renderModulesTable(state) {
  const expandedModuleIds = state?.expandedModuleIds ?? new Set()

  const rootRow = `
    <div class="rr-rm2-modules-row rr-rm2-modules-row--root">
      <div class="rr-rm2-modules-name">
        <span class="rr-rm2-modules-icon">${TREE_ICON.file}</span>
        <span class="rr-rm2-modules-name-text">manifest.yaml</span>
      </div>
      <div class="rr-rm2-modules-status"></div>
    </div>
  `

  const moduleRows = MODULES.map((module) => {
    const hasChildren = Array.isArray(module.functionalities) && module.functionalities.length > 0
    const isExpanded = hasChildren && expandedModuleIds.has(module.id)

    const toggleControl = hasChildren
      ? `<button type="button" class="rr-rm2-modules-toggle" data-action="toggle-module-folder" data-module-id="${escapeHtml(module.id)}" aria-label="${isExpanded ? "Collapse" : "Expand"} ${escapeHtml(module.code)}" aria-expanded="${String(isExpanded)}">${isExpanded ? TREE_ICON.caretDown : TREE_ICON.caretRight}</button>`
      : `<span class="rr-rm2-modules-toggle rr-rm2-modules-toggle--placeholder" aria-hidden="true">${TREE_ICON.caretRight}</span>`

    const childrenRows = isExpanded
      ? module.functionalities
          .map(
            (item) => `
              <div class="rr-rm2-modules-row rr-rm2-modules-row--file">
                <div class="rr-rm2-modules-name">
                  <span class="rr-rm2-modules-icon">${TREE_ICON.file}</span>
                  <button type="button" class="rr-rm2-modules-name-button" data-action="open-node" data-node-id="${escapeHtml(item.id)}">${escapeHtml(item.filename)}</button>
                </div>
                <div class="rr-rm2-modules-status">${renderStatusBadge(item.status)}</div>
              </div>
            `
          )
          .join("")
      : ""

    return `
      <div class="rr-rm2-modules-row rr-rm2-modules-row--module ${isExpanded ? 'is-expanded' : ''}">
        <div class="rr-rm2-modules-name">
          ${toggleControl}
          <span class="rr-rm2-modules-icon">${TREE_ICON.folder}</span>
          <button type="button" class="rr-rm2-modules-name-button" data-action="open-node" data-node-id="${escapeHtml(module.id)}">${escapeHtml(module.code)} - ${escapeHtml(module.title)}</button>
        </div>
        <div class="rr-rm2-modules-status"></div>
      </div>
      ${childrenRows}
    `
  }).join("")

  return `
    <section class="rr-rm2-modules-wrap" aria-label="Modules">
      ${rootRow}
      ${moduleRows}
    </section>
  `
}

function renderModuleFunctionalities(module) {
  if (!Array.isArray(module.functionalities) || module.functionalities.length === 0) {
    return `<p class="rr-rm2-empty">No functionalities linked yet.</p>`
  }

  return `
    <div class="rr-rm2-func-wrap">
      ${module.functionalities
        .map(
          (item) => `
            <div class="rr-rm2-func-row">
              <div class="rr-rm2-func-name">
                <span class="rr-rm2-func-icon">${TREE_ICON.file}</span>
                <button type="button" class="rr-rm2-func-name-button" data-action="open-node" data-node-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>
              </div>
              <div class="rr-rm2-func-status">
                ${renderStatusBadge(item.status)}
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `
}

function getPrototypeGroups(node, items) {
  if (node.type === "epic") {
    return MODULES.map((module) => ({
      id: module.id,
      label: `${module.code} - ${module.title}`,
      children: (module.prototypes || []).map((item, index) => ({
        id: `${module.id}-prototype-${index}`,
        label: item.flow || item.name,
        status: item.status || "in-progress",
        path: item.path || "#"
      }))
    }))
  }

  if (node.type === "module") {
    return [
      {
        id: node.id,
        label: `${node.code} - ${node.title}`,
        children: (items || []).map((item, index) => ({
          id: `${node.id}-prototype-${index}`,
          label: item.flow || item.name,
          status: item.status || "in-progress",
          path: item.path || "#"
        }))
      }
    ]
  }

  return [
    {
      id: node.moduleId,
      label: `${node.moduleCode} - ${node.moduleTitle}`,
      children: (items || []).map((item, index) => ({
        id: `${node.moduleId}-prototype-${index}`,
        label: item.flow || item.name,
        status: item.status || "in-progress",
        path: item.path || "#"
      }))
    }
  ]
}

function renderSiblingFunctionalities(functionality) {
  const module = MODULE_BY_ID.get(functionality.moduleId)
  if (!module || !Array.isArray(module.functionalities)) {
    return `<p class="rr-rm2-empty">No linked functionalities.</p>`
  }

  return `
    <div class="rr-rm2-func-wrap">
      ${module.functionalities
        .map((item) => {
          const isCurrent = item.id === functionality.id
          return `
            <div class="rr-rm2-func-row ${isCurrent ? "is-current" : ""}">
              <div class="rr-rm2-func-name">
                <span class="rr-rm2-func-icon">${TREE_ICON.file}</span>
                <button type="button" class="rr-rm2-func-name-button" data-action="open-node" data-node-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>
              </div>
              <div class="rr-rm2-func-status">
                ${renderStatusBadge(item.status)}
              </div>
            </div>
          `
        })
        .join("")}
    </div>
  `
}

function renderPrototypePanel(node, items, state) {
  if (!Array.isArray(items) || items.length === 0) {
    return `<p class="rr-rm2-empty">No prototype references.</p>`
  }

  // For module pages, display prototypes directly without parent group
  if (node.type === "module") {
    const rows = items
      .map((item, index) => {
        const protoId = `${node.id}-prototype-${index}`
        const label = item.flow || item.name
        const status = item.status || "in-progress"
        const path = item.path || "#"
        
        return `
          <div class="rr-rm2-proto-flat-row">
            <div class="rr-rm2-proto-flat-name">
              <p class="rr-rm2-proto-flat-text">${escapeHtml(label)}</p>
            </div>
            <div class="rr-rm2-proto-flat-link">
              <a class="rr-rm2-proto-flat-button" href="${escapeHtml(path)}" target="_blank" rel="noreferrer" aria-label="Open prototype">
                <svg width="18" height="18" viewBox="0 0 256 256" fill="none" aria-hidden="true"><path d="M144 80h32a40 40 0 010 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 010-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>
              </a>
            </div>
            <div class="rr-rm2-proto-flat-status">${renderStatusBadge(status)}</div>
          </div>
        `
      })
      .join("")

    return `
      <section class="rr-rm2-proto-flat-wrap" aria-label="Prototype references">
        ${rows}
      </section>
    `
  }

  // For epic and functionality pages, show grouped prototypes
  const groups = getPrototypeGroups(node, items)
  const expandedGroupIds = state?.expandedPrototypeGroupIds ?? new Set()

  const rows = groups
    .map((group) => {
      const hasChildren = Array.isArray(group.children) && group.children.length > 0
      const isExpanded = hasChildren && expandedGroupIds.has(group.id)
      const toggleControl = hasChildren
        ? `<button type="button" class="rr-rm2-proto-toggle" data-action="toggle-prototype-group" data-group-id="${escapeHtml(group.id)}" aria-label="${isExpanded ? "Collapse" : "Expand"} ${escapeHtml(group.label)}" aria-expanded="${String(isExpanded)}">${isExpanded ? TREE_ICON.caretDown : TREE_ICON.caretRight}</button>`
        : `<span class="rr-rm2-proto-toggle rr-rm2-proto-toggle--placeholder" aria-hidden="true">${TREE_ICON.caretRight}</span>`

      const childRows = isExpanded
        ? group.children
            .map(
              (child) => `
                <div class="rr-rm2-proto-row rr-rm2-proto-row--file">
                  <div class="rr-rm2-proto-name">
                    <span class="rr-rm2-proto-icon">${TREE_ICON.file}</span>
                    <span class="rr-rm2-proto-name-text">${escapeHtml(child.label)}</span>
                  </div>
                  <div class="rr-rm2-proto-link-cell">
                    <a class="rr-rm2-proto-link" href="${escapeHtml(child.path)}" target="_blank" rel="noreferrer" aria-label="Open prototype reference">
                      <svg width="18" height="18" viewBox="0 0 256 256" fill="none" aria-hidden="true"><path d="M144 80h32a40 40 0 010 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 010-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>
                    </a>
                  </div>
                  <div class="rr-rm2-proto-status">${renderStatusBadge(child.status)}</div>
                </div>
              `
            )
            .join("")
        : ""

      return `
        <div class="rr-rm2-proto-row rr-rm2-proto-row--group ${isExpanded ? 'is-expanded' : ''}">
          <div class="rr-rm2-proto-name">
            ${toggleControl}
            <span class="rr-rm2-proto-icon">${TREE_ICON.folder}</span>
            <span class="rr-rm2-proto-name-text">${escapeHtml(group.label)}</span>
          </div>
          <div class="rr-rm2-proto-link-cell"></div>
          <div class="rr-rm2-proto-status"></div>
        </div>
        ${childRows}
      `
    })
    .join("")

  return `
    <section class="rr-rm2-proto-wrap" aria-label="Prototype references">
      ${rows}
    </section>
  `
}

function renderFunctionalityDescription(functionality) {
  return `
    <section class="rr-rm2-content-card">
      <h3>Description</h3>
      <div class="rr-rm2-divider"></div>
      <pre class="rr-rm2-pre">id: ${escapeHtml(functionality.id)}
module_id: ${escapeHtml(functionality.moduleId)}
title_short: ${escapeHtml(functionality.title)}</pre>
      <div class="rr-rm2-divider"></div>
      <h4>User story</h4>
      <p>${escapeHtml(functionality.userStory)}</p>
      <h4>Acceptance criteria</h4>
      <ol>
        ${functionality.acceptanceCriteria
          .map(
            (item) => `
              <li>
                <strong>Given:</strong> ${escapeHtml(item.given)}<br />
                <strong>When:</strong> ${escapeHtml(item.when)}<br />
                <strong>Then:</strong> ${escapeHtml(item.then)}
              </li>
            `
          )
          .join("")}
      </ol>
      <h4>Edge cases / negative paths</h4>
      <p>${escapeHtml(functionality.edgeCases)}</p>
      <h4>Prototype references</h4>
      <p>${escapeHtml(functionality.prototypeRef)}</p>
    </section>
  `
}

function renderModuleDescription(module) {
  return `
    <section class="rr-rm2-content-card">
      <h3>Description</h3>
      <div class="rr-rm2-divider"></div>
      <pre class="rr-rm2-pre">id: ${escapeHtml(module.id)}
title: ${escapeHtml(module.title)}
epic: AUT</pre>
      <div class="rr-rm2-divider"></div>
      <h4>Scope</h4>
      <p>${escapeHtml(module.scope)}</p>
      <h4>Functionalities</h4>
      <ul>
        ${module.functionalities.map((item) => `<li>${escapeHtml(item.id)} - ${escapeHtml(item.title)}</li>`).join("")}
      </ul>
    </section>
  `
}

function renderPanel(node, activeTab, state) {
  if (activeTab === "acceptance-laws") {
    return renderAcceptanceLawsTable()
  }

  if (node.type === "epic") {
    if (activeTab === "description") {
      return renderEpicDescription()
    }
    if (activeTab === "modules") {
      return renderModulesTable(state)
    }
    if (activeTab === "prototypes") {
      return renderPrototypePanel(node, EPIC.prototypes, state)
    }
  }

  if (node.type === "module") {
    if (activeTab === "description") {
      return renderModuleDescription(node)
    }
    if (activeTab === "functionalities") {
      return renderModuleFunctionalities(node)
    }
    if (activeTab === "prototypes") {
      return renderPrototypePanel(node, node.prototypes, state)
    }
  }

  if (node.type === "functionality") {
    if (activeTab === "description") {
      return renderFunctionalityDescription(node)
    }
    if (activeTab === "functionalities") {
      return renderSiblingFunctionalities(node)
    }
    if (activeTab === "prototypes") {
      return renderPrototypePanel(
        node,
        (node.modulePrototypes || []).map((prototype) => ({
          ...prototype,
          flow: node.prototypeRef
        })),
        state
      )
    }
  }

  return ""
}

function getNodeTitle(node) {
  if (node.type === "epic") {
    return `AUT - ${node.title}`
  }
  if (node.type === "module") {
    return `${node.code} - ${node.title}`
  }
  return `${node.shortCode} - ${node.title}`
}

function getBreadcrumbSegments(node) {
  const base = [EPIC.owner, `AUT - ${EPIC.title}`]
  if (node.type === "module") {
    return [...base, `${node.code} - ${node.title}`]
  }
  if (node.type === "functionality") {
    return [...base, `${node.moduleCode} - ${node.moduleTitle}`, `${node.shortCode} - ${node.title}`]
  }
  return base
}

function isTabDisabled(node, tabId) {
  // Check if tab should be disabled based on content availability
  if (tabId === "prototypes") {
    if (node.type === "epic") {
      return !EPIC.prototypes || EPIC.prototypes.length === 0
    }
    if (node.type === "module") {
      return !node.prototypes || node.prototypes.length === 0
    }
    if (node.type === "functionality") {
      return !node.modulePrototypes || node.modulePrototypes.length === 0
    }
  }
  return false
}

function renderTabs(node, activeTab) {
  return getTabsForNode(node)
    .map(
      (tab) => {
        const isDisabled = isTabDisabled(node, tab.id)
        return `
        <button
          type="button"
          class="rr-rm2-tab ${tab.id === activeTab ? "is-active" : ""}"
          data-action="set-tab"
          data-tab-id="${tab.id}"
          ${isDisabled ? "disabled" : ""}
        >${escapeHtml(tab.label)}</button>
      `
      }
    )
    .join("")
}

function buildExplorerData() {
  return [
    {
      id: "DAS",
      label: "DAS - Dashboard",
      icon: "folder"
    },
    {
      id: "AUT",
      label: "AUT - Authentication",
      icon: "folder",
      targetNodeId: "AUT",
      children: MODULES.map((module) => ({
        id: `tree-${module.id}`,
        label: `${module.code} - ${module.title}`,
        icon: "folder",
        targetNodeId: module.id,
        children: module.functionalities.map((item) => ({
          id: `tree-${item.id}`,
          label: item.filename,
          icon: "file",
          targetNodeId: item.id
        }))
      }))
    },
    ...SIDE_PROJECTS.map((project) => ({
      id: project,
      label: project,
      icon: "folder"
    }))
  ]
}

function filterExplorerData(items, search) {
  const needle = String(search || "").trim().toLowerCase()
  if (!needle) {
    return items
  }

  function walk(item) {
    const ownMatch = item.label.toLowerCase().includes(needle)
    const children = Array.isArray(item.children)
      ? item.children.map(walk).filter(Boolean)
      : []

    if (ownMatch || children.length > 0) {
      return {
        ...item,
        children
      }
    }

    return null
  }

  return items.map(walk).filter(Boolean)
}

function getStatusDotColor(nodeId) {
  const module = MODULE_BY_ID.get(nodeId)
  if (module) {
    const colors = { released: "#0e9255", validated: "#0e9255", "in-progress": "#0067da", planned: "#c0362d", draft: "#667085", design: "#9b5bce" }
    return colors[module.status] || "#667085"
  }
  const functionality = FUNCTIONALITY_BY_ID.get(nodeId)
  if (functionality) {
    const colors = { released: "#0e9255", validated: "#0e9255", "in-progress": "#0067da", planned: "#c0362d", draft: "#667085", design: "#9b5bce" }
    return colors[functionality.status] || "#667085"
  }
  if (nodeId === EPIC.id) return "#0e9255"
  return null
}

const TREE_ICON = {
  caretRight: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folder: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M216 72H131.31L104 44.69A15.86 15.86 0 0092.69 40H40a16 16 0 00-16 16v144.62A15.4 15.4 0 0039.38 216H216.89A15.13 15.13 0 00232 200.89V88a16 16 0 00-16-16z" fill="#5b9bf5" stroke="#3b82f6" stroke-width="8"/></svg>`,
  file: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><path d="M200 224H56a8 8 0 01-8-8V40a8 8 0 018-8h96l56 56v128a8 8 0 01-8 8z" fill="#fff" stroke="#94a3b8" stroke-width="8"/><polyline points="152,32 152,88 208,88" fill="none" stroke="#94a3b8" stroke-width="8"/></svg>`,
}

function renderExplorerItems(items, state, forceExpanded = false, depth = 0) {
  return items
    .map((item) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0
      const isExpanded = hasChildren && (forceExpanded || state.expandedTreeIds.has(item.id))
      const isSelected = item.targetNodeId && item.targetNodeId === state.selectedNodeId
      const row = item.targetNodeId
        ? `<button type="button" class="rr-rm2-tree-select ${isSelected ? "is-selected" : ""}" data-action="select-node" data-node-id="${escapeHtml(item.targetNodeId)}">${escapeHtml(item.label)}</button>`
        : `<span class="rr-rm2-tree-label">${escapeHtml(item.label)}</span>`

      return `
        <li>
          <div class="rr-rm2-tree-row ${isSelected ? "is-selected" : ""} ${hasChildren ? "is-folder" : "is-file"}" data-depth="${depth}">
            ${hasChildren
              ? `<button type="button" class="rr-rm2-tree-toggle" data-action="toggle-tree" data-tree-id="${escapeHtml(item.id)}">${isExpanded ? TREE_ICON.caretDown : TREE_ICON.caretRight}</button>`
              : ""}
            <span class="rr-rm2-tree-icon">${item.icon === "file" ? TREE_ICON.file : TREE_ICON.folder}</span>
            ${row}
          </div>
          ${hasChildren && isExpanded ? `<ul>${renderExplorerItems(item.children, state, forceExpanded, depth + 1)}</ul>` : ""}
        </li>
      `
    })
    .join("")
}

function renderExplorer(state) {
  const data = filterExplorerData(buildExplorerData(), state.treeSearch)
  const forceExpanded = Boolean(String(state.treeSearch || "").trim())

  return `
    <div class="rr-rm2-explorer-header">
      <div class="rr-rm2-explorer-search-wrap">
        <span class="rr-rm2-search-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="84" stroke="currentColor" stroke-width="16"/><line x1="175.4" y1="175.4" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>
        </span>
        <input type="search" id="rr-rm2-tree-search" class="rr-rm2-search" placeholder="Search" value="${escapeHtml(state.treeSearch)}" />
      </div>
      <button type="button" class="rr-rm2-explorer-collapse" data-action="toggle-explorer" aria-label="Close explorer">
        <svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="200,48 120,128 200,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="120,48 40,128 120,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <ul class="rr-rm2-tree">${renderExplorerItems(data, state, forceExpanded)}</ul>
  `
}

function renderSummary(node) {
  if (node.type === "epic") {
    const passedLaws = ACCEPTANCE_LAWS.filter((law) => law.status === "pass").length
    const compliantModules = MODULES.filter((module) => module.status !== "planned").length

    return `
      <div class="rr-rm2-summary-grid">
        <article>
          <strong>Acceptance laws</strong>
          <span>${passedLaws} / ${ACCEPTANCE_LAWS.length}</span>
        </article>
        <article>
          <strong>Compliant modules</strong>
          <span>${compliantModules} / ${MODULES.length}</span>
        </article>
      </div>
    `
  }

  if (node.type === "module") {
    // Count passed laws for this specific module
    const moduleLaws = node.laws || {}
    const passedLaws = Object.values(moduleLaws).filter((law) => law.status === "pass").length
    const totalLaws = ACCEPTANCE_LAWS.length

    // Count compliant functionalities (released or validated)
    const functionalities = node.functionalities || []
    const compliantFunctionalities = functionalities.filter(
      (func) => func.status === "released" || func.status === "validated"
    ).length

    return `
      <div class="rr-rm2-summary-grid">
        <article>
          <strong>Acceptance laws</strong>
          <span>${passedLaws} / ${totalLaws}</span>
        </article>
        <article>
          <strong>Compliant functionalities</strong>
          <span>${compliantFunctionalities} / ${functionalities.length}</span>
        </article>
      </div>
    `
  }

  return ""
}

const FILTER_ICON_URL = "http://localhost:3845/assets/c1ac277a995da9385c6a39a55cf12092dcafa1ab.svg"
const CLOSE_ICON_URL = "http://localhost:3845/assets/690ab9866a6c446fa7d1bfd3f29f885705443183.svg"
const AVATAR_1_URL = "http://localhost:3845/assets/2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png"
const AVATAR_2_URL = "http://localhost:3845/assets/05be041b58b5e1fe37be4a6bb5a74f76d7c0f06d.png"
const AVATAR_3_URL = "http://localhost:3845/assets/30d4a462ea7b6e1428ffcb7ed5d646ca522e5a23.png"
const AVATAR_DEFAULT_URL = "http://localhost:3845/assets/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png"

function renderHistoryDrawer() {
  const historyEntries = [
    {
      date: "19/02/26",
      description: "Example history entry of the sync and applied changes",
      users: [
        { name: "Orlando Diggs", avatar: AVATAR_1_URL },
        { name: "Drew Cano", avatar: AVATAR_2_URL }
      ]
    },
    {
      date: "17/02/26",
      description: "Example history entry of the sync and applied changes",
      users: [
        { name: "Lana Steiner", avatar: AVATAR_3_URL }
      ]
    },
    {
      date: "14/02/26",
      description: "Example history entry",
      users: [
        { name: "Brooklyn Simmons", avatar: AVATAR_DEFAULT_URL }
      ]
    }
  ]

  const entriesHtml = historyEntries.map((entry, index) => `
    <div class="rr-history-card">
      <div class="rr-history-card-date">${entry.date}</div>
      <p class="rr-history-card-description">${entry.description}</p>
      ${entry.users.map(user => `
        <div class="rr-history-card-user">
          <img src="${user.avatar}" alt="" class="rr-history-card-avatar" />
          <span class="rr-history-card-username">${user.name}</span>
        </div>
      `).join("")}
    </div>
  `).join("")

  return `
    <aside class="rr-history-drawer" id="rr-history-drawer">
      <div class="rr-history-drawer-header">
        <h2 class="rr-history-drawer-title">History</h2>
        <button type="button" class="rr-history-drawer-icon-btn" aria-label="Filter history">
          <img src="${FILTER_ICON_URL}" alt="" />
        </button>
        <button type="button" class="rr-history-drawer-icon-btn" data-action="close-history-drawer" aria-label="Close history">
          <img src="${CLOSE_ICON_URL}" alt="" />
        </button>
      </div>
      <div class="rr-history-timeline">
        <div class="rr-history-timeline-line"></div>
        ${entriesHtml}
      </div>
    </aside>
  `
}

export async function renderRequirementsModuleFlow() {
  return `
    <section class="rr-rm2" data-flow="requirements-module-v2">
      <div class="rr-rm2-body">
        <aside class="rr-rm2-explorer" id="rr-rm2-explorer" hidden></aside>

        <main class="rr-rm2-main" id="rr-rm2-main">
          <div class="rr-rm2-breadcrumb-row">
            <button type="button" class="rr-rm2-tree-open" id="rr-rm2-open-explorer">
              <svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="56,48 136,128 56,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="136,48 216,128 136,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="rr-rm2-breadcrumbs" id="rr-rm2-breadcrumbs"></div>
            <div class="rr-rm2-search-container">
              <svg class="rr-rm2-search-icon" width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="116" cy="116" r="84" stroke="currentColor" stroke-width="16"/>
                <line x1="175.4" y1="175.4" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>
              </svg>
              <input type="text" class="rr-rm2-search" placeholder="Search" aria-label="Search" />
            </div>
          </div>

          <div class="rr-rm2-title-row">
            <h1 id="rr-rm2-title"></h1>
            <span id="rr-rm2-title-status"></span>
          </div>
          <div id="rr-rm2-summary"></div>

          <div class="rr-rm2-tabs" id="rr-rm2-tabs"></div>
          <section id="rr-rm2-panel"></section>
        </main>
        
        ${renderHistoryDrawer()}
      </div>
    </section>
  `
}

let isHistoryDrawerOpen = false

function mountHistoryDrawer() {
  const syncButton = document.querySelector(".rr-tab-sync-action")
  const closeButton = document.querySelector('[data-action="close-history-drawer"]')
  const rm2Body = document.querySelector(".rr-rm2-body")
  
  if (syncButton) {
    syncButton.addEventListener("click", () => {
      isHistoryDrawerOpen = !isHistoryDrawerOpen
      if (rm2Body) {
        rm2Body.classList.toggle("rr-rm2-body--drawer-open", isHistoryDrawerOpen)
      }
    })
  }
  
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      isHistoryDrawerOpen = false
      if (rm2Body) {
        rm2Body.classList.remove("rr-rm2-body--drawer-open")
      }
    })
  }
}

export function mountRequirementsModuleFlow() {
  const root = document.querySelector('[data-flow="requirements-module-v2"]')
  if (!root) {
    return undefined
  }
  
  mountHistoryDrawer()

  const elements = {
    title: root.querySelector("#rr-rm2-title"),
    titleStatus: root.querySelector("#rr-rm2-title-status"),
    breadcrumbs: root.querySelector("#rr-rm2-breadcrumbs"),
    summary: root.querySelector("#rr-rm2-summary"),
    tabs: root.querySelector("#rr-rm2-tabs"),
    panel: root.querySelector("#rr-rm2-panel"),
    explorer: root.querySelector("#rr-rm2-explorer"),
    openExplorer: root.querySelector("#rr-rm2-open-explorer")
  }

  if (
    !elements.title ||
    !elements.breadcrumbs ||
    !elements.summary ||
    !elements.tabs ||
    !elements.panel ||
    !elements.explorer ||
    !elements.openExplorer
  ) {
    return undefined
  }

  const state = {
    selectedNodeId: "AUT",
    activeTab: "acceptance-laws",
    isExplorerOpen: true,
    treeSearch: "",
    expandedTreeIds: new Set(["AUT", "tree-AUT-M001"]),
    expandedModuleIds: new Set(),
    expandedPrototypeGroupIds: new Set()
  }

  function ensureActiveTabForNode(node) {
    const tabs = getTabsForNode(node)
    const currentTabExists = tabs.some((tab) => tab.id === state.activeTab)
    const currentTabIsDisabled = currentTabExists && isTabDisabled(node, state.activeTab)
    
    if (!currentTabExists || currentTabIsDisabled) {
      // Find first non-disabled tab or fall back to default
      const firstEnabledTab = tabs.find((tab) => !isTabDisabled(node, tab.id))
      state.activeTab = firstEnabledTab ? firstEnabledTab.id : getDefaultTabForNode(node)
    }
  }

  function expandAncestors(nodeId) {
    if (nodeId === "AUT") {
      state.expandedTreeIds.add("AUT")
      return
    }

    const module = MODULE_BY_ID.get(nodeId)
    if (module) {
      state.expandedTreeIds.add("AUT")
      state.expandedTreeIds.add(`tree-${module.id}`)
      return
    }

    const functionality = FUNCTIONALITY_BY_ID.get(nodeId)
    if (functionality) {
      state.expandedTreeIds.add("AUT")
      state.expandedTreeIds.add(`tree-${functionality.moduleId}`)
    }
  }

  function render() {
    const node = getNodeById(state.selectedNodeId)
    ensureActiveTabForNode(node)

    elements.title.textContent = getNodeTitle(node)
    elements.titleStatus.innerHTML = renderStatusBadge(node.status || EPIC.status || "released")

    const breadcrumbSegments = getBreadcrumbSegments(node)
    elements.breadcrumbs.innerHTML = breadcrumbSegments
      .map((segment) => `<span>${escapeHtml(segment)}</span>`)
      .join('<span class="rr-rm2-breadcrumb-separator">/</span>')

    elements.summary.innerHTML = renderSummary(node)
    elements.tabs.innerHTML = renderTabs(node, state.activeTab)
    elements.panel.innerHTML = renderPanel(node, state.activeTab, state)

    elements.explorer.innerHTML = renderExplorer(state)
    const isExplorerOpen = state.isExplorerOpen
    elements.explorer.hidden = !isExplorerOpen
    elements.explorer.style.display = isExplorerOpen ? "" : "none"

    const collapseButton = elements.explorer.querySelector(".rr-rm2-explorer-collapse")
    if (collapseButton) {
      collapseButton.style.display = isExplorerOpen ? "" : "none"
      collapseButton.setAttribute("aria-expanded", String(isExplorerOpen))
    }

    // Keep button out of layout when explorer is open, per UI requirement.
    elements.openExplorer.hidden = isExplorerOpen
    elements.openExplorer.style.display = isExplorerOpen ? "none" : ""
    elements.openExplorer.setAttribute("aria-expanded", String(isExplorerOpen))
  }

  function handleRootClick(event) {
    const actionElement = event.target.closest("[data-action]")
    if (!actionElement) {
      return
    }

    const action = actionElement.getAttribute("data-action")

    if (action === "set-tab") {
      // Don't process clicks on disabled tabs
      if (actionElement.disabled) {
        return
      }
      const tabId = actionElement.getAttribute("data-tab-id") || ""
      const node = getNodeById(state.selectedNodeId)
      if (getTabsForNode(node).some((tab) => tab.id === tabId)) {
        state.activeTab = tabId
        render()
      }
      return
    }

    if (action === "open-node" || action === "select-node") {
      const nodeId = actionElement.getAttribute("data-node-id") || ""
      if (!nodeId) {
        return
      }

      const selectedModule = MODULE_BY_ID.get(nodeId)
      const selectedFunctionality = FUNCTIONALITY_BY_ID.get(nodeId)
      if (selectedModule) {
        state.expandedModuleIds.add(selectedModule.id)
        state.expandedPrototypeGroupIds.add(selectedModule.id)
      }
      if (selectedFunctionality) {
        state.expandedModuleIds.add(selectedFunctionality.moduleId)
        state.expandedPrototypeGroupIds.add(selectedFunctionality.moduleId)
      }

      state.selectedNodeId = nodeId
      state.activeTab = getDefaultTabForNode(getNodeById(nodeId))
      expandAncestors(nodeId)
      render()
      return
    }

    if (action === "toggle-module-folder") {
      const moduleId = actionElement.getAttribute("data-module-id") || ""
      if (!MODULE_BY_ID.has(moduleId)) {
        return
      }
      if (state.expandedModuleIds.has(moduleId)) {
        state.expandedModuleIds.delete(moduleId)
      } else {
        state.expandedModuleIds.add(moduleId)
      }
      render()
      return
    }

    if (action === "toggle-prototype-group") {
      const groupId = actionElement.getAttribute("data-group-id") || ""
      if (!groupId) {
        return
      }
      if (state.expandedPrototypeGroupIds.has(groupId)) {
        state.expandedPrototypeGroupIds.delete(groupId)
      } else {
        state.expandedPrototypeGroupIds.add(groupId)
      }
      render()
      return
    }

    if (action === "toggle-tree") {
      const treeId = actionElement.getAttribute("data-tree-id") || ""
      if (!treeId) {
        return
      }
      if (state.expandedTreeIds.has(treeId)) {
        state.expandedTreeIds.delete(treeId)
      } else {
        state.expandedTreeIds.add(treeId)
      }
      render()
      return
    }

    if (action === "toggle-explorer") {
      state.isExplorerOpen = !state.isExplorerOpen
      render()
    }
  }

  function handleRootInput(event) {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) {
      return
    }

    if (target.id !== "rr-rm2-tree-search") {
      return
    }

    state.treeSearch = target.value || ""
    render()
  }

  function handleOpenExplorerClick() {
    state.isExplorerOpen = true
    render()
  }

  root.addEventListener("click", handleRootClick)
  root.addEventListener("input", handleRootInput)
  elements.openExplorer.addEventListener("click", handleOpenExplorerClick)

  render()

  return () => {
    root.removeEventListener("click", handleRootClick)
    root.removeEventListener("input", handleRootInput)
    elements.openExplorer.removeEventListener("click", handleOpenExplorerClick)
  }
}
