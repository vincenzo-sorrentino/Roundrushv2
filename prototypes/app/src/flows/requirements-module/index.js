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
    code: "LOG-001",
    title: "User login",
    scope: "Allow registered users to authenticate with email + password and recover a forgotten password.",
    status: "released",
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
        shortCode: "LOG-001-F01",
        title: "Login form",
        filename: "LOG-001-F01-login-form.md",
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
        shortCode: "LOG-001-F02",
        title: "Password reset",
        filename: "LOG-001-F02-password-reset.md",
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
        shortCode: "LOG-001-F03",
        title: "OTP code",
        filename: "LOG-001-F03-otp-code.md",
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
        shortCode: "LOG-001-F04",
        title: "Account selection",
        filename: "LOG-001-F04-account-selection.md",
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
    code: "LOG-002",
    title: "User authentication process",
    scope:
      "Allow new users to join RoundRush through invitation email, account creation, and automatic team joining.",
    status: "released",
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
        shortCode: "LOG-002-F01",
        title: "Get invitation email",
        filename: "LOG-002-F01-invitation-email.md",
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
        shortCode: "LOG-002-F02",
        title: "Make an account",
        filename: "LOG-002-F02-make-an-account.md",
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
        shortCode: "LOG-002-F03",
        title: "Join team",
        filename: "LOG-002-F03-join-team.md",
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
    code: "LOG-003",
    title: "User session management",
    scope: "Track, refresh, and revoke sessions safely across devices.",
    status: "planned",
    prototypes: [],
    functionalities: []
  },
  {
    id: "AUT-M004",
    code: "LOG-004",
    title: "User password recovery",
    scope: "Centralize recovery policies and risk checks for reset journeys.",
    status: "planned",
    prototypes: [],
    functionalities: []
  },
  {
    id: "AUT-M005",
    code: "LOG-005",
    title: "2-factor authentication",
    scope: "Add step-up authentication for sensitive access paths.",
    status: "planned",
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

  return [
    { id: "description", label: "Description" },
    { id: "acceptance-laws", label: "Acceptance Laws" },
    { id: "functionalities", label: "Functionalities" },
    { id: "prototypes", label: "Prototype" }
  ]
}

function getDefaultTabForNode(node) {
  if (node.type === "epic") {
    return "acceptance-laws"
  }
  if (node.type === "module") {
    return "functionalities"
  }
  return "description"
}

function renderStatusBadge(status) {
  return `<span class="rr-rm2-status is-${toStatusClass(status)}">${escapeHtml(toStatusLabel(status))}</span>`
}

function renderAcceptanceLawsTable() {
  const rows = ACCEPTANCE_LAWS.map(
    (law) => `
      <tr>
        <td>${escapeHtml(law.id)}</td>
        <td>
          <strong>${escapeHtml(law.name)}</strong>
          <p>${escapeHtml(law.description)}</p>
        </td>
        <td>${escapeHtml(law.evidence)}</td>
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

function renderModulesTable() {
  return `
    <div class="rr-rm2-table-wrap">
      <table class="rr-rm2-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Scope</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${MODULES.map(
            (module) => `
              <tr>
                <td>${escapeHtml(module.code)} - ${escapeHtml(module.title)}</td>
                <td>${escapeHtml(module.scope)}</td>
                <td>${renderStatusBadge(module.status)}</td>
                <td>
                  <button type="button" class="rr-rm2-link-button" data-action="open-node" data-node-id="${escapeHtml(module.id)}">Open</button>
                </td>
              </tr>
            `
          ).join("")}
        </tbody>
      </table>
    </div>
  `
}

function renderModuleFunctionalities(module) {
  if (!Array.isArray(module.functionalities) || module.functionalities.length === 0) {
    return `<p class="rr-rm2-empty">No functionalities linked yet.</p>`
  }

  return `
    <div class="rr-rm2-list">
      ${module.functionalities
        .map(
          (item) => `
            <div class="rr-rm2-list-row">
              <button type="button" class="rr-rm2-list-title" data-action="open-node" data-node-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>
              <a class="rr-rm2-icon-link" href="${escapeHtml(module.prototypes[0]?.path || "#")}" target="_blank" rel="noreferrer" aria-label="Open prototype">Open</a>
              ${renderStatusBadge(item.status)}
            </div>
          `
        )
        .join("")}
    </div>
  `
}

function renderSiblingFunctionalities(functionality) {
  const module = MODULE_BY_ID.get(functionality.moduleId)
  if (!module || !Array.isArray(module.functionalities)) {
    return `<p class="rr-rm2-empty">No linked functionalities.</p>`
  }

  return `
    <div class="rr-rm2-list">
      ${module.functionalities
        .map((item) => {
          const isCurrent = item.id === functionality.id
          return `
            <div class="rr-rm2-list-row ${isCurrent ? "is-current" : ""}">
              <button type="button" class="rr-rm2-list-title" data-action="open-node" data-node-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button>
              <a class="rr-rm2-icon-link" href="${escapeHtml(module.prototypes[0]?.path || "#")}" target="_blank" rel="noreferrer" aria-label="Open prototype">Open</a>
              ${renderStatusBadge(item.status)}
            </div>
          `
        })
        .join("")}
    </div>
  `
}

function renderPrototypePanel(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return `<p class="rr-rm2-empty">No prototype references.</p>`
  }

  return `
    <div class="rr-rm2-prototype-grid">
      ${items
        .map(
          (item) => `
            <article class="rr-rm2-prototype-card">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                ${item.version ? `<span>${escapeHtml(item.version)}</span>` : ""}
              </div>
              ${renderStatusBadge(item.status || "in-progress")}
              <p>${escapeHtml(item.flow || item.path)}</p>
              <a href="${escapeHtml(item.path)}" target="_blank" rel="noreferrer">Open prototype</a>
            </article>
          `
        )
        .join("")}
    </div>
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

function renderPanel(node, activeTab) {
  if (activeTab === "acceptance-laws") {
    return renderAcceptanceLawsTable()
  }

  if (node.type === "epic") {
    if (activeTab === "description") {
      return renderEpicDescription()
    }
    if (activeTab === "modules") {
      return renderModulesTable()
    }
    if (activeTab === "prototypes") {
      return renderPrototypePanel(EPIC.prototypes)
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
      return renderPrototypePanel(node.prototypes)
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
        (node.modulePrototypes || []).map((prototype) => ({
          ...prototype,
          flow: node.prototypeRef
        }))
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

function renderTabs(node, activeTab) {
  return getTabsForNode(node)
    .map(
      (tab) => `
        <button
          type="button"
          class="rr-rm2-tab ${tab.id === activeTab ? "is-active" : ""}"
          data-action="set-tab"
          data-tab-id="${tab.id}"
        >${escapeHtml(tab.label)}</button>
      `
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

function renderExplorerItems(items, state, forceExpanded = false) {
  return items
    .map((item) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0
      const isExpanded = hasChildren && (forceExpanded || state.expandedTreeIds.has(item.id))
      const isSelected = item.targetNodeId && item.targetNodeId === state.selectedNodeId
      const statusColor = item.targetNodeId ? getStatusDotColor(item.targetNodeId) : null
      const statusDot = statusColor ? `<span class="rr-rm2-tree-dot" style="background:${statusColor}"></span>` : ""
      const row = item.targetNodeId
        ? `<button type="button" class="rr-rm2-tree-select ${isSelected ? "is-selected" : ""}" data-action="select-node" data-node-id="${escapeHtml(item.targetNodeId)}">${escapeHtml(item.label)}</button>`
        : `<span class="rr-rm2-tree-label">${escapeHtml(item.label)}</span>`

      return `
        <li>
          <div class="rr-rm2-tree-row">
            ${hasChildren
              ? `<button type="button" class="rr-rm2-tree-toggle" data-action="toggle-tree" data-tree-id="${escapeHtml(item.id)}">${isExpanded ? TREE_ICON.caretDown : TREE_ICON.caretRight}</button>`
              : `<span class="rr-rm2-tree-pad"></span>`}
            <span class="rr-rm2-tree-icon">${item.icon === "file" ? TREE_ICON.file : TREE_ICON.folder}</span>
            ${row}
            ${statusDot}
          </div>
          ${hasChildren && isExpanded ? `<ul>${renderExplorerItems(item.children, state, forceExpanded)}</ul>` : ""}
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
        <input type="search" id="rr-rm2-tree-search" class="rr-rm2-search" placeholder="Search" value="${escapeHtml(state.treeSearch)}" />
      </div>
      <button type="button" class="rr-rm2-explorer-collapse" data-action="toggle-explorer" aria-label="Close explorer">
        <svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="200,48 120,128 200,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="120,48 40,128 120,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <ul class="rr-rm2-tree">${renderExplorerItems(data, state, forceExpanded)}</ul>
  `
}

function renderSummary(node) {
  if (node.type !== "epic") {
    return ""
  }

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
          </div>

          <div class="rr-rm2-title-row">
            <h1 id="rr-rm2-title"></h1>
            <span id="rr-rm2-title-status"></span>
          </div>
          <div id="rr-rm2-summary"></div>

          <div class="rr-rm2-tabs" id="rr-rm2-tabs"></div>
          <section id="rr-rm2-panel"></section>
        </main>
      </div>
    </section>
  `
}

export function mountRequirementsModuleFlow() {
  const root = document.querySelector('[data-flow="requirements-module-v2"]')
  if (!root) {
    return undefined
  }

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
    isExplorerOpen: false,
    treeSearch: "",
    expandedTreeIds: new Set(["AUT", "tree-AUT-M001"])
  }

  function ensureActiveTabForNode(node) {
    const tabs = getTabsForNode(node)
    if (!tabs.some((tab) => tab.id === state.activeTab)) {
      state.activeTab = getDefaultTabForNode(node)
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
    elements.panel.innerHTML = renderPanel(node, state.activeTab)

    elements.explorer.innerHTML = renderExplorer(state)
    elements.explorer.hidden = !state.isExplorerOpen
    elements.openExplorer.hidden = state.isExplorerOpen
  }

  function handleRootClick(event) {
    const actionElement = event.target.closest("[data-action]")
    if (!actionElement) {
      return
    }

    const action = actionElement.getAttribute("data-action")

    if (action === "set-tab") {
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
      state.selectedNodeId = nodeId
      state.activeTab = getDefaultTabForNode(getNodeById(nodeId))
      expandAncestors(nodeId)
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
