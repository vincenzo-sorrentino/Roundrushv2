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
    description: "Documentation is updated where applicable (requirements if necessary, code comments, component docs, and any required technical docs).",
    evidence: "Confluence update, inline code comments",
    status: "in-progress"
  },
  {
    id: "AL-04",
    name: "End-to-end tests implemented and passed",
    description: "E2E tests exist for all user-facing flows and pass in CI with no critical failures.",
    evidence: "E2E test report (CI)",
    status: "fail"
  },
  {
    id: "AL-05",
    name: "Dependency map updated",
    description: "Dependency map is updated (or explicitly confirmed unchanged) when changes affect module boundaries or coupling.",
    evidence: "Dependency map snapshot",
    status: "pass"
  },
  {
    id: "AL-06",
    name: "Dependency-based regression tests pass",
    description: "Regression tests derived from impacted modules (via dependency map) pass with 100% success.",
    evidence: "Regression test report",
    status: "pending"
  },
  {
    id: "AL-07",
    name: "Required manual suites completed",
    description: "Required manual validation sessions are completed and recorded by the QA team.",
    evidence: "QA sign-off log",
    status: "pending"
  }
]

const MODULES = [
  {
    id: "AUT-M001",
    code: "AUT-M001",
    title: "User login",
    epic: "AUT",
    prototypeRoute: "/auth/login/default",
    overview: "Allow registered users to authenticate securely using their email and password. If a user forgets their password, they can request a reset link by email and set a new password through a time-limited secure flow.",
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
    dependencies: [
      {
        from: "UI-REQ (Backlog)",
        to: "API-READ",
        relation: "calls_api",
        iface: "GET/requirements/tree",
        risk: "high",
        conf: 0.92,
        why: "Backlog renders EP – Module – F hierarchy"
      },
      {
        from: "UI-REQ (Backlog)",
        to: "SVC-DEPS",
        relation: "calls_api",
        iface: "GET/dependencies/impact",
        risk: "medium",
        conf: 0.88,
        why: "Shows \"impact count\" + deep-links"
      },
      {
        from: "UI-PLAN (Planning)",
        to: "SVC-SPRINT",
        relation: "calls_api",
        iface: "POST/sprint-cycles",
        risk: "low",
        conf: 0.90,
        why: "Create/activate sprint-cycles"
      },
      {
        from: "UI-PLAN (Planning)",
        to: "SVC-INTEGRATION",
        relation: "triggers_workflow",
        iface: "POST/automation/create-pr",
        risk: "medium",
        conf: 0.80,
        why: "\"Start sprint\" opens PR design --> dev"
      },
      {
        from: "UI-TEST (Testing)",
        to: "SVC-TEST",
        relation: "calls_api",
        iface: "GET/testing/runs",
        risk: "low",
        conf: 0.95,
        why: "Testing dashboard/runs/coverage"
      },
      {
        from: "SVC-TEST",
        to: "SVC-GOV",
        relation: "reads_policy",
        iface: "policy.coverage.threshold",
        risk: "low",
        conf: 0.85,
        why: "Coverage & manual suite requirements"
      },
      {
        from: "SVC-RELEASE",
        to: "SVC-TEST",
        relation: "aggregates",
        iface: "evidence: tests/coverage/regression",
        risk: "low",
        conf: 0.90,
        why: "Release notes include test proof"
      },
      {
        from: "SVC-RELEASE",
        to: "SVC-DEPS",
        relation: "aggregates",
        iface: "dep diff: versionA\u2192B",
        risk: "medium",
        conf: 0.82,
        why: "Release notes include dependency changes"
      }
    ],
    functionalities: [
      {
        id: "AUT-M001-F001",
        shortCode: "AUT-M001-F001",
        title: "Login form",
        filename: "AUT-M001-F001-login-form.md",
        status: "validated",
        description: "The user enters their email address and password and clicks \"Log in\". If the credentials are correct they land straight in their workspace. If something is wrong, a neutral inline error appears — it doesn't reveal whether the email or the password failed, so no information is leaked. After several consecutive failed attempts within a short window the account is temporarily locked to guard against brute-force access; the user receives a plain-language explanation of what happened and what to do next. If the email doesn't match any known account, a visible link to request an invitation is surfaced so the user isn't left without a path forward.",
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
        description: "From the login screen, a user who can't remember their password clicks \"Forgot password\" and is asked for their email address. A time-limited reset link is sent to that address. Clicking the link opens a form where the user sets a new password; on success they are taken directly to the login screen to sign in with the new credentials. If the link has expired or is invalid, the page explains clearly why it didn't work and tells the user exactly how to get a fresh one.",
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
    epic: "AUT",
    prototypeRoute: "/auth/signup/default",
    overview: "Allow new users to join RoundRush through invitation email, account creation, and automatic team joining.",
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
        status: "validated",
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
    epic: "AUT",
    prototypeRoute: "/auth/sessions",
    overview: "Track, refresh, and revoke authenticated sessions safely across multiple devices. A user can view all their active sessions, understand how each was created, and revoke any of them individually or all at once — so they stay in control of where they are currently signed in.",
    scope: "Track, refresh, and revoke sessions safely across devices.",
    status: "released",
    laws: {
      "AL-01": { status: "unknown" },
      "AL-02": { status: "unknown" },
      "AL-03": { status: "unknown" },
      "AL-04": { status: "unknown" },
      "AL-05": { status: "unknown" },
      "AL-06": { status: "unknown" },
      "AL-07": { status: "unknown" }
    },
    prototypes: [
      {
        name: "Session management - v1",
        version: "v1",
        path: "/prototypes/AUT/sessions/v1/",
        status: "in-progress",
        flow: "Active sessions list -> revoke session"
      }
    ],
    functionalities: [
      {
        id: "AUT-M003-F001",
        shortCode: "AUT-M003-F001",
        title: "Active sessions list",
        status: "draft",
        description: "From the user account settings area the user can open a sessions page that shows every device or client where they are currently signed in. Each session entry shows the device type, the approximate location derived from the IP address, the date and time of the most recent activity, and a label indicating whether the entry corresponds to the current session. The list is ordered most-recent-first. The current session is visually distinguished from the others so the user can immediately identify where they are right now relative to any other active contexts."
      },
      {
        id: "AUT-M003-F002",
        shortCode: "AUT-M003-F002",
        title: "Session revocation",
        status: "draft",
        description: "From the active sessions list the user can revoke any session other than their current one by clicking a revoke action on that row. Revoking a session immediately invalidates its token on the server; any subsequent request using that token is rejected and the affected client is signed out. The user can also revoke all other sessions in a single action, which signs out every other context simultaneously while keeping the current session active. A confirmation step is shown before the bulk revocation executes to prevent accidental sign-outs."
      }
    ]
  },
  {
    id: "AUT-M004",
    code: "AUT-M004",
    title: "User password recovery",
    epic: "AUT",
    prototypeRoute: "/auth/recovery",
    overview: "Centralise the recovery policies and risk checks for all password reset journeys. This module governs the server-side logic that validates reset tokens, enforces rate limits on reset attempts, detects anomalous request patterns, and ensures that expired or previously used links are rejected before any password change is committed.",
    scope: "Centralize recovery policies and risk checks for reset journeys.",
    status: "released",
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
    functionalities: [
      { id: "AUT-M004-F001", shortCode: "AUT-M004-F001", title: "Reset token validation", status: "draft", description: "Validate the integrity, expiry, and single-use constraint of password reset tokens before allowing any password change operation to proceed." },
      { id: "AUT-M004-F002", shortCode: "AUT-M004-F002", title: "Rate limiting and anomaly detection", status: "draft", description: "Enforce request rate limits on the reset initiation endpoint and flag anomalous burst patterns to the security monitoring layer without exposing account existence to the requester." },
      { id: "AUT-M004-F003", shortCode: "AUT-M004-F003", title: "Password policy enforcement", status: "draft", description: "Apply the project password policy (minimum length, complexity rules, no reuse of the last N passwords) at the point of committing the new password and return structured validation errors to the UI." }
    ]
  },
  {
    id: "AUT-M005",
    code: "AUT-M005",
    title: "2-factor authentication",
    epic: "AUT",
    prototypeRoute: "/auth/2fa",
    overview: "Add step-up authentication for sensitive access paths so that a compromised password alone is not sufficient for an attacker to gain entry. When a user action triggers the 2FA gate, they must supply a time-based OTP from their authenticator app before proceeding. The module covers enrolment, verification, recovery codes, and the policy rules that determine which actions require step-up.",
    scope: "Add step-up authentication for sensitive access paths.",
    status: "released",
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
    functionalities: [
      { id: "AUT-M005-F001", shortCode: "AUT-M005-F001", title: "2FA enrolment", status: "draft", description: "Guide the user through scanning a QR code with their authenticator app, confirming the first valid TOTP code, and storing the encrypted TOTP secret against their account." },
      { id: "AUT-M005-F002", shortCode: "AUT-M005-F002", title: "Step-up OTP verification", status: "draft", description: "When a protected action is triggered, prompt the user for a TOTP code. Validate the code against the stored secret with a ±1 window tolerance and reject expired or previously used codes." },
      { id: "AUT-M005-F003", shortCode: "AUT-M005-F003", title: "Recovery codes", status: "draft", description: "Generate a set of one-time recovery codes at enrolment time. A user who has lost access to their authenticator app can consume a recovery code to bypass the TOTP step and is then prompted to re-enrol 2FA." }
    ]
  },

  // ── DEP ───────────────────────────────────────────────────────
  {
    id: "DEP-M001", code: "DEP-M001", title: "Dependency Map — Graph View", epic: "DEP",
    prototypeRoute: "/dependencies/uml",
    overview: "Render the full global dependency map as an interactive UML component diagram so that developers and QA teams can visually trace exactly how modules connect, understand the blast radius of any proposed change, and spot high-risk coupling at a glance.",
    scope: "Interactive UML component diagram of all inter-module dependencies.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Dependencies UML — v1", version: "v1", path: "/dependencies/uml", status: "in-progress", flow: "Global dependency map as interactive UML component diagram" }],
    dependencies: [], functionalities: [
      { id: "DEP-M001-F001", shortCode: "DEP-M001-F001", title: "Dependency graph canvas", status: "draft", description: "Render the full global dependency map as an interactive node-link diagram. Each module is a node and each dependency is a directed edge coloured by risk level. The canvas supports pan and zoom and auto-layouts on load." },
      { id: "DEP-M001-F002", shortCode: "DEP-M001-F002", title: "Node detail panel", status: "draft", description: "Clicking any node opens a side panel showing that module's ID, title, epic, status, and a list of its inbound and outbound dependencies with risk ratings, confidence scores, and interface labels." },
      { id: "DEP-M001-F003", shortCode: "DEP-M001-F003", title: "View mode toggle", status: "draft", description: "A toolbar control allows the user to switch between the graph view and the list view (DEP-M002) without losing the current filter state." },
      { id: "DEP-M001-F004", shortCode: "DEP-M001-F004", title: "Canvas legend and toolbar controls", status: "draft", description: "A persistent legend explains the edge colour coding by risk level. Toolbar controls provide zoom in, zoom out, fit-to-screen, and a full-screen toggle." }
    ]
  },
  {
    id: "DEP-M002", code: "DEP-M002", title: "Dependency Map — List View", epic: "DEP",
    prototypeRoute: "/dependencies/list",
    overview: "Render the same global dependency map that powers the graph view (DEP-M001) as a flat, readable table. Where the graph is optimised for visual topology, the list view is optimised for scanning, filtering, and sharing: every edge in the DAG becomes one row, with its natural-language why explanation front and centre alongside the risk level, confidence score, and interface string.",
    scope: "Flat tabular list view of all dependency edges.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Dependencies List — v1", version: "v1", path: "/dependencies/list", status: "in-progress", flow: "Global dependency map as sortable, filterable flat table" }],
    dependencies: [], functionalities: [
      { id: "DEP-M002-F001", shortCode: "DEP-M002-F001", title: "Dependency table", status: "draft", description: "Render every dependency edge as a table row with columns for source module, target module, relation type, interface string, risk level, confidence score, and the natural-language why explanation." },
      { id: "DEP-M002-F002", shortCode: "DEP-M002-F002", title: "Filter, search, and sort", status: "draft", description: "A filter bar above the table allows narrowing by risk level (high, medium, low) and relation type. A free-text search filters by module ID, interface, or why text in real time. Column headers are sortable." },
      { id: "DEP-M002-F003", shortCode: "DEP-M002-F003", title: "View mode toggle", status: "draft", description: "A toggle control switches between the list view and the graph view (DEP-M001), preserving the active search and filter state across the switch." }
    ]
  },
  {
    id: "DEP-M003", code: "DEP-M003", title: "Module-Level Dependency Panel", epic: "DEP",
    prototypeRoute: null,
    overview: "Surface a scoped, read-only subset of the global dependency map in the contextual panels where it is most needed: the Dependencies sub-view inside the requirements module detail page (/requirements/module) and the Dependencies tab inside the sprint board bottom-sheet (/planning/kanban).",
    scope: "Scoped dependency panel component used in /requirements/module and /planning/kanban.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [], dependencies: [], functionalities: [
      { id: "DEP-M003-F001", shortCode: "DEP-M003-F001", title: "Scoped dependency list", status: "draft", description: "Show only the dependency edges directly involving the currently viewed module, filtered to its immediate inbound and outbound connections. Each row shows the counterpart module ID, relation type, interface, risk, and why text." },
      { id: "DEP-M003-F002", shortCode: "DEP-M003-F002", title: "Deep-link to main map", status: "draft", description: "A \"View full map\" link navigates the user to the global dependency graph (DEP-M001) or list view (DEP-M002) with the current module pre-selected as the focal node." }
    ]
  },

  // ── DOC ───────────────────────────────────────────────────────
  {
    id: "DOC-M001", code: "DOC-M001", title: "Documentation Hub", epic: "DOC",
    prototypeRoute: "/docs/hub",
    overview: "The documentation hub is a dedicated tab in every Roundrush project that renders the contents of the repository's requirements/documentation/ folder as a browsable, searchable knowledge base. Contributors edit .md files directly in the repo and the hub reads and displays them without any additional publishing step. The hub is the single authoritative surface for project governance, engineering standards, and operational workflows within the Roundrush UI.",
    scope: "Browsable markdown knowledge base rendered from the repo's requirements/documentation/ folder.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Docs Hub — v1", version: "v1", path: "/docs/hub", status: "in-progress", flow: "Browse and search documentation sections" }],
    dependencies: [], functionalities: [
      { id: "DOC-M001-F001", shortCode: "DOC-M001-F001", title: "Documentation hub landing view", status: "draft", description: "Render a landing page listing all documentation sections found in requirements/documentation/ as cards with their title and a short excerpt. Clicking a card opens the section detail view." },
      { id: "DOC-M001-F002", shortCode: "DOC-M001-F002", title: "Documentation section detail view", status: "draft", description: "Render the full markdown content of a selected documentation file with syntax highlighting for code blocks and proper heading hierarchy. A back button returns the user to the landing list." },
      { id: "DOC-M001-F003", shortCode: "DOC-M001-F003", title: "Section history drawer", status: "draft", description: "A history icon on the detail view opens a side drawer listing the git commit history for that file, showing commit message, author, and date for each entry." },
      { id: "DOC-M001-F004", shortCode: "DOC-M001-F004", title: "MD file ingestion", status: "draft", description: "The hub reads .md files from requirements/documentation/ at build or sync time. Filenames are used as section slugs. Only files in that specific directory are included; subdirectories are ignored." }
    ]
  },

  // ── DES ───────────────────────────────────────────────────────
  {
    id: "DES-M001", code: "DES-M001", title: "Prototype Catalogue", epic: "DES",
    prototypeRoute: "/prototypes",
    overview: "Provide a navigational index that surfaces every available prototype flow in the system as a browsable catalogue, accessible from the RoundRush logo shortcut in the sidebar. Prototypes are grouped into named categories — Design System, Marketing Website, and Module Prototypes — so that team members can orient themselves and open any prototype directly from a single place without knowing the exact route in advance.",
    scope: "Grouped card catalogue of all prototype flows with status badges and in-app or new-tab routing.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Prototype Catalogue — v1", version: "v1", path: "/prototypes", status: "in-progress", flow: "Grouped card grid → click card → navigate in-app or open new tab" }],
    dependencies: [], functionalities: [
      { id: "DES-M001-F001", shortCode: "DES-M001-F001", title: "Grouped prototype sections", status: "draft", description: "The catalogue page is divided into named sections, each representing a logical category. Each section carries a heading, a one-line description, and a grid of prototype cards below it. The current categories are Design System, Marketing Website, and Module Prototypes. New categories are added by appending a group entry in the catalogue data — no structural changes to the rendering logic are required." },
      { id: "DES-M001-F002", shortCode: "DES-M001-F002", title: "Prototype card", status: "draft", description: "Each item in a section is rendered as a clickable card containing the prototype title, a one-line subtitle, and a status badge. When the prototype belongs to a requirement module the card also shows the linked epic identifier and module code as secondary metadata. The status badge reflects the prototype's current review state: approved, draft, or archived. The entire card surface is the interactive target and is keyboard-navigable." },
      { id: "DES-M001-F003", shortCode: "DES-M001-F003", title: "In-app and external routing", status: "draft", description: "Clicking a card whose route ends in .html opens the prototype in a new browser tab so that standalone HTML/CSS/JS prototypes can be viewed without breaking the main application's navigation. Clicking a card with an internal route navigates to that route within the single-page app. The distinction is derived entirely from the route value stored in the prototype registry — no additional flag or manual categorisation is needed." }
    ]
  },
  {
    id: "DES-M002", code: "DES-M002", title: "Design Status Board", epic: "DES",
    prototypeRoute: "/design/tab",
    overview: "Give designers and project managers a single board where the design status of every active requirement is visible at a glance, sortable by any column, and directly linked to the associated clickable prototype. The board is split into a main working list for requirements currently in the design pipeline and a collapsible Ready for sprint backlog section for requirements whose design has been approved and is awaiting sprint selection.",
    scope: "Sortable design status tracking table with prototype viewer overlay and sprint backlog section.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Design Tab — v1", version: "v1", path: "/design/tab", status: "in-progress", flow: "Design status table → click prototype link → viewer overlay → info panel" }],
    dependencies: [], functionalities: [
      { id: "DES-M002-F001", shortCode: "DES-M002-F001", title: "Design status tracking table", status: "draft", description: "The board renders requirements as rows in a sortable table. Each row shows the requirement identifier and title, a priority badge (urgent, high, medium, low), the date of the last design update, an avatar group of up to three assigned team members, a prototype link icon, and a status badge. The table is sortable by requirement ID, priority level, last update date, and status. Clicking an active sort column reverses the direction." },
      { id: "DES-M002-F002", shortCode: "DES-M002-F002", title: "Design status lifecycle", status: "draft", description: "Each requirement moves through a defined sequence of design states: to-do, in-progress, ready-for-review, approved, and ready-for-sprint. The status badge reflects the current state with a distinct colour. Requirements in to-do with no prototype link show no clickable icon. Requirements in in-progress may show a link icon that opens the viewer but shows an empty state when the prototype is not yet ready. Requirements in ready-for-review, approved, and ready-for-sprint navigate to the fully rendered prototype viewer." },
      { id: "DES-M002-F003", shortCode: "DES-M002-F003", title: "Ready for sprint backlog section", status: "draft", description: "Below the main table a collapsible section groups all requirements that have reached ready-for-sprint status. The section header shows the label and the item count; clicking it toggles visibility. When expanded the section renders the same sortable table structure as the main list, sharing the active sort column and direction." },
      { id: "DES-M002-F004", shortCode: "DES-M002-F004", title: "Prototype viewer overlay", status: "draft", description: "Clicking the prototype link icon on a linked row opens a full-screen overlay rendering a wireframe preview of the prototype. The overlay header shows the source file path and a row of controls: theme toggle (light/dark), device toggle (desktop/mobile), info panel toggle, and close. Switching theme or device updates only the canvas wireframe without re-rendering the full overlay. Pressing Escape or clicking close dismisses the overlay." },
      { id: "DES-M002-F005", shortCode: "DES-M002-F005", title: "Prototype info panel", status: "draft", description: "Within the viewer overlay, toggling the info button opens a collapsible aside panel listing structured metadata: linked epic, module code, prototype title, source file path, file type, last design update date, and version string. The panel can be closed with the same toggle button. When closed the canvas expands to fill the full available width without a page reload." }
    ]
  },
  {
    id: "DES-M003", code: "DES-M003", title: "Prototype Delivery Pipeline", epic: "DES",
    prototypeRoute: null,
    overview: "Define the secure, version-controlled infrastructure that moves prototype files from the repository into the app without introducing database bloat or cross-site scripting risk. The pipeline operates automatically on branch merge events: it copies prototype files to a namespaced path in a static storage bucket and notifies the backend API, which stores only a URL pointer against the module record. The frontend renders prototypes through a sandboxed iframe that isolates the prototype's JavaScript from the parent application.",
    scope: "Repo folder convention, three-branch lifecycle, CI/CD sync pipeline, backend sync API, and secure iframe rendering.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [],
    dependencies: [], functionalities: [
      { id: "DES-M003-F001", shortCode: "DES-M003-F001", title: "Repository folder structure and naming convention", status: "draft", description: "All prototype files must reside under /prototypes/ organised as /prototypes/<epic-id>/<module-id>/. Every prototype directory must contain an index.html entry point, a version.json declaring the version string and linked module identifier, and all supporting CSS and JS as vendored self-contained files. Any pull request introducing a prototype directory that is missing these mandatory files is rejected by the CI step with a descriptive error." },
      { id: "DES-M003-F002", shortCode: "DES-M003-F002", title: "Three-branch lifecycle model", status: "draft", description: "The repository maintains three long-lived branches mapping prototype states: design (pre-sprint backlog), develop (active sprint work-in-progress), and main (completed and released). Promoting a prototype from one state to the next happens exclusively through a pull request merge into the corresponding branch — no direct pushes are permitted." },
      { id: "DES-M003-F003", shortCode: "DES-M003-F003", title: "Automated CI/CD sync pipeline", status: "draft", description: "A GitHub Actions workflow triggers on every push to design, develop, or main that touches any path under prototypes/. The pipeline syncs /prototypes/ to the matching namespaced path in the static storage bucket (s3://rr-prototypes/<branch>/) with a delete flag to remove stale files, then POSTs a JSON payload to the backend sync endpoint. The pipeline fails and alerts on any upload or API error — it does not silently continue on partial failure." },
      { id: "DES-M003-F004", shortCode: "DES-M003-F004", title: "Backend sync API and database contract", status: "draft", description: "The backend exposes POST /api/v2/syncruns authenticated by a server-side API key. The payload carries a trigger string, the branch name, the module_id, and a prototype_evidence object with version and CDN url. The backend resolves the module record by module_id and updates it with the URL pointer and version string. The backend stores the URL only — it never fetches, parses, or executes prototype HTML. Unauthenticated requests are rejected with a 401 response." },
      { id: "DES-M003-F005", shortCode: "DES-M003-F005", title: "Secure iframe sandbox rendering", status: "draft", description: "The frontend renders each prototype inside an iframe whose src is the CDN URL received from the API. The iframe carries sandbox=\"allow-scripts allow-same-origin\", which permits the prototype's own JavaScript to run within its origin context while blocking access to the parent application's storage, cookies, and JavaScript execution context. No allow-top-navigation, allow-forms, or allow-popups permissions are granted. If the URL is absent or returns a non-200 response the frontend shows a descriptive empty state rather than a broken iframe." },
      { id: "DES-M003-F006", shortCode: "DES-M003-F006", title: "Acceptance validation linkage", status: "draft", description: "When a module's Acceptance Laws table transitions to a fully passing state — all seven laws recording pass — the system automatically marks the associated prototype version as validated. This status is stored on the prototype_evidence record and surfaced as a badge in the design status board and prototype catalogue. A prototype that has never been validated against its Acceptance Laws remains in an unvalidated state regardless of how long it has existed in the repository." }
    ]
  },

  // ── KAN ───────────────────────────────────────────────────────
  {
    id: "KAN-M001", code: "KAN-M001", title: "Current Sprint Board", epic: "KAN",
    prototypeRoute: "/planning/kanban",
    overview: "Show all modules assigned to the active sprint in a reactive, read-only planning board. Modules are grouped by feature area and each row reflects the real-time delivery state of that module, driven entirely by CI/CD pipeline events. The board gives the team a shared, authoritative view of sprint progress with no manual status editing. A sprint selector allows navigation across sprints, and a close sprint action is available once all modules in the active sprint have reached the Done state.",
    scope: "Reactive CI/CD-driven sprint board with sort/filter and close sprint flow.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Kanban Board — v1", version: "v1", path: "/planning/kanban", status: "in-progress", flow: "Sprint board → module detail overlay" }],
    dependencies: [], functionalities: [
      { id: "KAN-M001-F001", shortCode: "KAN-M001-F001", title: "Sprint board table view", status: "draft", description: "Display all modules in the active sprint grouped by feature area. Each module row shows Requirements chip, Priority, Assignee, Last Update, Tasks count, Unit Tests progress bar, and Status badge. Group rows collapse/expand and an empty-state placeholder is shown if a sprint has no modules." },
      { id: "KAN-M001-F002", shortCode: "KAN-M001-F002", title: "Sort and multi-filter", status: "draft", description: "A filter bar with four multi-select dropdowns (Modules, Priority, Assignees, Statuses) and a free-text search allows narrowing the module list in real time. Column headers for Priority, Last Update, Tasks, and Unit Tests are interactive sort triggers." },
      { id: "KAN-M001-F003", shortCode: "KAN-M001-F003", title: "Sprint selector and navigation", status: "draft", description: "The sprint selector in the tab header shows the active sprint number and its date range. A dropdown lists all sprints with coloured status dots. Selecting a sprint loads its data and resets all filters." },
      { id: "KAN-M001-F004", shortCode: "KAN-M001-F004", title: "Close sprint", status: "draft", description: "A close-sprint button appears only when the active sprint is displayed. Clicking it validates all modules — incomplete modules trigger a blocking warning modal. If all pass, a confirmation modal shows and Confirm marks the sprint as closed." },
      { id: "KAN-M001-F005", shortCode: "KAN-M001-F005", title: "Reactive CI/CD-driven status system", status: "draft", description: "Module and task statuses are maintained entirely by the CI/CD pipeline. Task states progress automatically: TODO → IN PROGRESS (first commit) → RFR (PR ready) → MERGED (CI pass + approvals) → QA (manual session committed) → DONE (all Acceptance Laws passing)." }
    ]
  },
  {
    id: "KAN-M002", code: "KAN-M002", title: "Module Detail Panel", epic: "KAN",
    prototypeRoute: "/planning/kanban",
    overview: "Allow team members to open a sliding detail panel for any module directly from the sprint board. The panel is organised into six tabs — Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, and UAT Issues — so all context about a module is accessible in one place without leaving the board. Tab content and progress indicators are computed in real time from the CI/CD pipeline and backend data.",
    scope: "Six-tab module detail overlay open from the sprint board.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Kanban Module Detail — v1", version: "v1", path: "/planning/kanban", status: "in-progress", flow: "Open detail overlay → navigate 6 tabs" }],
    dependencies: [], functionalities: [
      { id: "KAN-M002-F001", shortCode: "KAN-M002-F001", title: "Open and dismiss the detail overlay", status: "draft", description: "Clicking any module row on the sprint board slides open a detail panel from the right edge of the viewport. Pressing Escape, clicking the close button, or clicking the backdrop dismisses it and returns focus to the board." },
      { id: "KAN-M002-F002", shortCode: "KAN-M002-F002", title: "Tab navigation with progress indicator", status: "draft", description: "A six-tab bar at the top of the panel (Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, UAT Issues) allows navigation between content areas. A thin progress bar below the tabs reflects the overall Acceptance Law completion percentage." },
      { id: "KAN-M002-F003", shortCode: "KAN-M002-F003", title: "Overview tab", status: "draft", description: "Show the module title, epic, status badge, description text, scope, and the list of assigned team members with their avatars and roles." },
      { id: "KAN-M002-F004", shortCode: "KAN-M002-F004", title: "Acceptance Laws tab", status: "draft", description: "Render the seven Acceptance Laws as a table with their current pass/fail/pending status for this module, derived live from the CI/CD pipeline and manual QA records." },
      { id: "KAN-M002-F005", shortCode: "KAN-M002-F005", title: "Dependencies tab", status: "draft", description: "Show the scoped dependency panel (DEP-M003) for this module: its direct inbound and outbound edges with risk, interface, and a deep-link to the full global map." },
      { id: "KAN-M002-F006", shortCode: "KAN-M002-F006", title: "Tasks tab", status: "draft", description: "List all tasks under this module with their current CI/CD-driven status, assignee, branch name, and last updated timestamp. Tasks are read-only and cannot be manually modified." },
      { id: "KAN-M002-F007", shortCode: "KAN-M002-F007", title: "Test Cases tab", status: "draft", description: "Display the unit and integration test cases linked to this module, their last execution result, coverage percentage, and the CI run that produced the result." },
      { id: "KAN-M002-F008", shortCode: "KAN-M002-F008", title: "UAT Issues tab", status: "draft", description: "List open UAT issues raised against this module during manual test sessions, each with severity, description, linked test case, and current resolution status." }
    ]
  },
  {
    id: "KAN-M003", code: "KAN-M003", title: "Closed Sprint", epic: "KAN",
    prototypeRoute: "/planning/old-sprint",
    overview: "Provide a read-only record of every closed sprint, structured as a tabbed report card. The view covers the sprint's delivery summary, all issues raised across stakeholder, UAT, and production channels, the finalized design items, and the automated test coverage snapshot. The sprint history button on the active sprint board navigates directly to this view, where the user can switch between past sprints using a dedicated selector.",
    scope: "Read-only six-tab closed sprint report card with PDF/XLS export.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Old Sprint View — v1", version: "v1", path: "/planning/old-sprint", status: "in-progress", flow: "Closed sprint tabbed report → sprint selector" }],
    dependencies: [], functionalities: [
      { id: "KAN-M003-F001", shortCode: "KAN-M003-F001", title: "Closed sprint overview", status: "draft", description: "Show a summary card for the closed sprint with total modules delivered, pass rate, sprint dates, and a summary of the delivery state for each module." },
      { id: "KAN-M003-F002", shortCode: "KAN-M003-F002", title: "Stakeholders Issues Log", status: "draft", description: "List all issues raised by stakeholders during the sprint with severity, description, linked module, and resolution status." },
      { id: "KAN-M003-F003", shortCode: "KAN-M003-F003", title: "UAT Issues Log", status: "draft", description: "List all issues surfaced during UAT sessions in this sprint with test case reference, tester name, severity, and current resolution." },
      { id: "KAN-M003-F004", shortCode: "KAN-M003-F004", title: "PROD Issues Log", status: "draft", description: "List production incidents that originated from changes delivered in this sprint, each linked to the originating module and post-mortem document." },
      { id: "KAN-M003-F005", shortCode: "KAN-M003-F005", title: "Finalized Design tab", status: "draft", description: "Display the design deliverables finalised in this sprint — Figma links, component names, and sign-off status from the design lead." },
      { id: "KAN-M003-F006", shortCode: "KAN-M003-F006", title: "Automated Tests Coverage", status: "draft", description: "Show the final automated test coverage snapshot for each module in the sprint, with a per-module breakdown of unit and integration coverage percentages." },
      { id: "KAN-M003-F007", shortCode: "KAN-M003-F007", title: "Sprint history selector", status: "draft", description: "A dropdown in the view header lists all closed sprints. Selecting one loads its report card data without a full page navigation." },
      { id: "KAN-M003-F008", shortCode: "KAN-M003-F008", title: "Export release notes", status: "draft", description: "An export button produces a PDF or XLS version of the sprint report card containing all six tabs of data." }
    ]
  },
  {
    id: "KAN-M004", code: "KAN-M004", title: "Release Notes", epic: "KAN",
    prototypeRoute: "/planning/release-notes",
    overview: "Provide an approval-gated release notes view that extends the closed sprint report with a formal stakeholder sign-off workflow. The six-tab content from the closed sprint view is presented identically here, and above the report card an approval section allows designated stakeholders to sign and approve the release. The sprint is considered fully approved only when every listed stakeholder has recorded their individual approval, at which point a confirmation banner replaces the approval list.",
    scope: "Stakeholder approval flow layered on top of the closed sprint report.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Release Notes — v1", version: "v1", path: "/planning/release-notes", status: "in-progress", flow: "Release notes card + stakeholder sign-off approval section" }],
    dependencies: [], functionalities: [
      { id: "KAN-M004-F001", shortCode: "KAN-M004-F001", title: "Release notes content", status: "draft", description: "Render the identical six-tab sprint report card from KAN-M003 as the body of the release notes view, below the stakeholder approval section." },
      { id: "KAN-M004-F002", shortCode: "KAN-M004-F002", title: "Stakeholder approval section", status: "draft", description: "Above the report card, show a list of designated stakeholders each with an \"Approve\" button. Clicking it records that stakeholder's sign-off with a timestamp. When all stakeholders have approved, a green confirmation banner replaces the approval list and the sprint is marked as fully released." },
      { id: "KAN-M004-F003", shortCode: "KAN-M004-F003", title: "Export", status: "draft", description: "An export button produces a PDF or XLS of the full release notes document including the stakeholder approvals section and the sprint report card content." }
    ]
  },

  // ── REQ ───────────────────────────────────────────────────────
  {
    id: "REQ-M001", code: "REQ-M001", title: "Epic Level View", epic: "REQ",
    prototypeRoute: "/requirements/module",
    overview: "Show the epic-level detail view so that stakeholders can understand the overall epic and drill into its components. The view includes an explorer sidebar for navigating the full requirement hierarchy, a summary metrics grid, and four tabs: Description, Acceptance Laws, Dependencies, and Modules. The Description tab is the default view when an epic node is first selected.",
    scope: "Epic-level requirements detail view with four tabs.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Requirements Module — v1", version: "v1", path: "/requirements/module", status: "in-progress", flow: "Epic node selected → description, AL, dependencies, modules tabs" }],
    dependencies: [], functionalities: [
      { id: "REQ-M001-F001", shortCode: "REQ-M001-F001", title: "Explorer navigation", status: "draft", description: "A collapsible tree sidebar lists all epics and, when expanded, their child modules and functionalities. Clicking any node selects it and loads its detail view in the main content area." },
      { id: "REQ-M001-F002", shortCode: "REQ-M001-F002", title: "Breadcrumb navigation", status: "draft", description: "A breadcrumb trail above the detail header shows the full path from project root to the currently selected node. Each segment is a clickable link that navigates to that level." },
      { id: "REQ-M001-F003", shortCode: "REQ-M001-F003", title: "Epic summary metrics", status: "draft", description: "A metrics grid below the epic title shows total modules, compliant functionalities count, Acceptance Laws compliance score, and design state badge for the selected epic." },
      { id: "REQ-M001-F004", shortCode: "REQ-M001-F004", title: "Description tab", status: "draft", description: "The default tab renders the epic objective, in-scope items, and out-of-scope items as structured prose read from the epic's markdown file." },
      { id: "REQ-M001-F005", shortCode: "REQ-M001-F005", title: "Acceptance Laws tab", status: "draft", description: "Render the seven Acceptance Laws table for the selected epic, summarising compliance status across all its child modules." },
      { id: "REQ-M001-F006", shortCode: "REQ-M001-F006", title: "Modules tab", status: "draft", description: "List all modules belonging to the selected epic as cards with their title, status badge, functionality count, and a link to navigate to the module-level view." },
      { id: "REQ-M001-F007", shortCode: "REQ-M001-F007", title: "Dependencies tab", status: "draft", description: "Show the scoped dependency panel (DEP-M003) at the epic level, listing all dependency edges originating from or pointing to modules within this epic." }
    ]
  },
  {
    id: "REQ-M002", code: "REQ-M002", title: "Module Level View", epic: "REQ",
    prototypeRoute: "/requirements/module",
    overview: "Show the module-level detail view so that stakeholders can inspect a module's scope and drill into its functionalities. The view has five tabs: Description (the default), Acceptance Laws, Dependencies, Functionalities, and Prototypes.",
    scope: "Module-level requirements detail view with five tabs.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Requirements Module — v1", version: "v1", path: "/requirements/module", status: "in-progress", flow: "Module node selected → description, AL, deps, functionalities, prototypes" }],
    dependencies: [], functionalities: [
      { id: "REQ-M002-F001", shortCode: "REQ-M002-F001", title: "Description tab", status: "draft", description: "Render the module overview text as prose, read from the module's markdown file. The overview is the single authoritative description of what the module does and why it exists." },
      { id: "REQ-M002-F002", shortCode: "REQ-M002-F002", title: "Acceptance Laws tab", status: "draft", description: "Render the seven Acceptance Laws table for the selected module with pass/fail/pending status derived from the pipeline and QA records." },
      { id: "REQ-M002-F003", shortCode: "REQ-M002-F003", title: "Functionalities tab", status: "draft", description: "List all functionalities of the module as expandable cards. Each card shows the functionality ID, title, status badge, and description text. Clicking a functionality navigates to its detail view." },
      { id: "REQ-M002-F004", shortCode: "REQ-M002-F004", title: "Prototypes tab", status: "draft", description: "Show prototype links associated with the module, each with a name, version label, status badge, and a direct link to the prototype route in the app." },
      { id: "REQ-M002-F005", shortCode: "REQ-M002-F005", title: "Dependencies tab", status: "draft", description: "Show the scoped dependency panel (DEP-M003) for the selected module with its direct inbound and outbound dependency edges." }
    ]
  },
  {
    id: "REQ-M003", code: "REQ-M003", title: "Functionality Level View", epic: "REQ",
    prototypeRoute: "/requirements/module",
    overview: "Show the functionality-level detail view so that developers and testers can read the complete specification for a single functionality. Unlike the epic and module levels, the functionality view has no tab bar — all information is rendered in a single content card that the user reads top to bottom.",
    scope: "Functionality-level requirements detail view with a single content card.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Requirements Module — v1", version: "v1", path: "/requirements/module", status: "in-progress", flow: "Functionality node selected → single content card" }],
    dependencies: [], functionalities: [
      { id: "REQ-M003-F001", shortCode: "REQ-M003-F001", title: "Functionality description card", status: "draft", description: "Render the functionality ID, title, status badge, and full description prose in a single scrollable content card with no tab bar. The description is read directly from the functionality section of the module markdown file." },
      { id: "REQ-M003-F002", shortCode: "REQ-M003-F002", title: "Sibling functionality navigation via the explorer tree", status: "draft", description: "The explorer sidebar remains visible and shows the parent module's functionality nodes. The currently viewed functionality is highlighted, and clicking a sibling loads it without a full page reload." },
      { id: "REQ-M003-F003", shortCode: "REQ-M003-F003", title: "Prototype access from functionality context", status: "draft", description: "A prototype link button in the card header opens the relevant prototype route in a new tab, giving developers and testers a direct path from the specification to the working interactive prototype." }
    ]
  },

  // ── RMP ───────────────────────────────────────────────────────
  {
    id: "RMP-M001", code: "RMP-M001", title: "Roadmap Timeline View", epic: "RMP",
    prototypeRoute: "/planning/roadmap",
    overview: "Display an automatically generated, read-only Gantt timeline that covers the entire project lifespan — past sprints shown as historical context and future sprints as the planned horizon. No user edits the data directly; every module item, its position, and its status are derived from sprint metadata and pipeline state stored in the repository. The view is split into two parallel horizontal tracks — Development and Design — and auto-scrolls to bring the current sprint into the visible centre on load.",
    scope: "Automatically generated two-track Gantt timeline with sprint-based columns, status colours, and project settings.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Roadmap — v1", version: "v1", path: "/planning/roadmap", status: "in-progress", flow: "Two-track Gantt canvas → project settings → snapshot dropdown" }],
    dependencies: [], functionalities: [
      { id: "RMP-M001-F001", shortCode: "RMP-M001-F001", title: "Two-track Gantt canvas", status: "draft", description: "Render a horizontally scrollable canvas divided into Development and Design tracks. A shared timeline header shows sprint columns and week sub-columns. On load the canvas auto-scrolls to centre the current sprint." },
      { id: "RMP-M001-F002", shortCode: "RMP-M001-F002", title: "Module items and status colour coding", status: "draft", description: "Each module bar spans its assigned sprint range and displays EPIC-NNN · Short title. Bar colour encodes status: green (completed), blue (in-dev), purple (designing), grey (to-do). Historical sprints are filled with placeholder completed bars." },
      { id: "RMP-M001-F003", shortCode: "RMP-M001-F003", title: "Project header and team strip", status: "draft", description: "A fixed header shows the project date range on the left and the team member count with overlapping avatar row on the right." },
      { id: "RMP-M001-F004", shortCode: "RMP-M001-F004", title: "Project settings", status: "draft", description: "A settings modal lets the user configure project start/end dates, sprint duration (1–3 weeks), and team members. Saving regenerates the full timeline grid immediately." },
      { id: "RMP-M001-F005", shortCode: "RMP-M001-F005", title: "Snapshot and settings entry points", status: "draft", description: "Two icon buttons in the tab header open the project settings modal (gear) and the snapshots dropdown (screen icon). The dropdown lists saved snapshots grouped by sprint and a New snapshot action." }
    ]
  },
  {
    id: "RMP-M002", code: "RMP-M002", title: "Roadmap Snapshot", epic: "RMP",
    prototypeRoute: "/planning/roadmap",
    overview: "Allow product managers to open an editable working copy of the live roadmap canvas during planning sessions and stakeholder meetings. A snapshot is a named clone of the current roadmap state where module bars can be freely repositioned and resized to explore schedule projections without affecting the authoritative read-only view. Saved snapshots are preserved and can be reopened at any time from the snapshots dropdown.",
    scope: "Named editable copies of the roadmap timeline for PM planning sessions.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Roadmap Snapshot — v1", version: "v1", path: "/planning/roadmap", status: "in-progress", flow: "Open snapshot modal → drag/resize modules → save named snapshot" }],
    dependencies: [], functionalities: [
      { id: "RMP-M002-F001", shortCode: "RMP-M002-F001", title: "Snapshot modal canvas", status: "draft", description: "A full-screen modal overlays the roadmap with an editable copy of the Gantt canvas. Module bars not in completed status can be dragged and resized. Closing without saving discards all edits." },
      { id: "RMP-M002-F002", shortCode: "RMP-M002-F002", title: "Drag to reposition modules", status: "draft", description: "Non-completed module bars can be dragged to new sprint columns. A ghost clone follows the cursor and a drop indicator snaps to valid columns. Drag is constrained to the same track row." },
      { id: "RMP-M002-F003", shortCode: "RMP-M002-F003", title: "Resize module spans", status: "draft", description: "Left and right resize handles on each non-completed bar allow extending or contracting the sprint span. Column snapping is applied during drag. Minimum span is one week column." },
      { id: "RMP-M002-F004", shortCode: "RMP-M002-F004", title: "Save and name a snapshot", status: "draft", description: "A save button lets the user name and persist the current layout. The snapshot is grouped under the current sprint label in the snapshots dropdown and survives page reloads." },
      { id: "RMP-M002-F005", shortCode: "RMP-M002-F005", title: "Export snapshot", status: "draft", description: "Export buttons produce a PNG image or PDF of the full canvas (both tracks, timeline header). Modal chrome is excluded from the export output." }
    ]
  },

  // ── TST ───────────────────────────────────────────────────────
  {
    id: "TST-M001", code: "TST-M001", title: "Test Planning & Traceability", epic: "TST",
    prototypeRoute: "/testing/overview",
    overview: "Expose the full test planning matrix for every sprint through three integrated views — an execution overview per environment, a sprint-level test case matrix, and a regression tracking list — so that QA engineers have one place to define test cases, read execution results, and confirm that all requirements are covered.",
    scope: "Test planning matrix and traceability views across environments.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [{ name: "Testing Tab — v1", version: "v1", path: "/testing/overview", status: "in-progress", flow: "Test planning overview → matrix → regression list" }],
    dependencies: [], functionalities: [
      { id: "TST-M001-F001", shortCode: "TST-M001-F001", title: "Test suite execution overview", status: "draft", description: "Show a per-environment execution summary for the active sprint: total test runs, pass/fail counts, and coverage percentage for each environment (dev, staging, production)." },
      { id: "TST-M001-F002", shortCode: "TST-M001-F002", title: "Test case planning matrix", status: "draft", description: "Render a matrix linking each requirement functionality to its test cases. Each cell shows the test case status and last execution result. QA engineers can define new test cases against unlinked functionalities from this view." },
      { id: "TST-M001-F003", shortCode: "TST-M001-F003", title: "Regression test tracking", status: "draft", description: "List the regression test suite for the sprint with each test's current pass/fail state, the last CI run that executed it, and a filter to isolate newly failing tests." },
      { id: "TST-M001-F004", shortCode: "TST-M001-F004", title: "Requirement-to-test traceability", status: "draft", description: "For any selected functionality, show all test cases that cover it and their statuses — so coverage gaps are immediately visible without leaving the requirements context." }
    ]
  },
  {
    id: "TST-M002", code: "TST-M002", title: "Automated Execution & CI Integration", epic: "TST",
    prototypeRoute: null,
    overview: "Handle the end-to-end pipeline from test execution in CI to visual state synchronisation on the dashboard. The module operates on a strict Git-as-Truth principle — no test status is ever updated manually through the UI; all state changes arrive as structured API payloads triggered by repository events and CI/CD pipelines.",
    scope: "CI/CD-driven test execution and dashboard state sync.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [], dependencies: [], functionalities: [
      { id: "TST-M002-F001", shortCode: "TST-M002-F001", title: "CI execution result ingestion", status: "draft", description: "Receive structured JSON payloads from the CI/CD pipeline via a webhook endpoint. Each payload carries the test run results, coverage deltas, and the triggering commit SHA." },
      { id: "TST-M002-F002", shortCode: "TST-M002-F002", title: "Test state synchronisation", status: "draft", description: "Map incoming CI payloads to the affected modules and functionalities and update their test status records in the backend store. All state changes are append-only and timestamped." },
      { id: "TST-M002-F003", shortCode: "TST-M002-F003", title: "Execution metadata rendering", status: "draft", description: "Surface per-run metadata on the testing dashboard: commit SHA, branch name, run duration, triggered-by actor, and pass/fail summary. Each run is a link to the full CI log." },
      { id: "TST-M002-F004", shortCode: "TST-M002-F004", title: "Acceptance Law progress tracking", status: "draft", description: "After each CI result ingestion, recompute the Acceptance Law AL-02 and AL-06 scores for all affected modules and push the updated scores to the kanban and requirements views." }
    ]
  },
  {
    id: "TST-M003", code: "TST-M003", title: "Coverage & Regression Intelligence", epic: "TST",
    prototypeRoute: null,
    overview: "The intelligence layer that analyses dependency graphs, generates regression scenarios, tracks coverage evolution, and surfaces recurring failure patterns across sprints. This module is primarily driven by AI agent actions with QA engineers serving as the validation and approval layer.",
    scope: "AI-driven coverage analysis and regression intelligence engine.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [], dependencies: [], functionalities: [
      { id: "TST-M003-F001", shortCode: "TST-M003-F001", title: "AI-driven regression generation", status: "draft", description: "An AI agent traverses the dependency graph for each changed module and generates a set of regression test scenarios covering the impacted paths. Generated scenarios are presented to QA engineers as a draft list for approval before they enter the test suite." },
      { id: "TST-M003-F002", shortCode: "TST-M003-F002", title: "Coverage evolution visualisation", status: "draft", description: "Plot the coverage percentage for each module across the last N sprints as a sparkline chart, so QA engineers can immediately spot trends of increasing or decreasing coverage over time." },
      { id: "TST-M003-F003", shortCode: "TST-M003-F003", title: "Coverage drop detection", status: "draft", description: "Automatically flag any module whose coverage drops by more than the configured threshold between two consecutive CI runs, and surface an alert in the testing dashboard and in the kanban board status for that module." },
      { id: "TST-M003-F004", shortCode: "TST-M003-F004", title: "Recurring failure pattern analysis", status: "draft", description: "Identify test cases that have failed in three or more consecutive sprints and group them as a recurring failure cluster. Present these clusters to QA engineers with suggested root-cause hypotheses generated by the AI agent." }
    ]
  },
  {
    id: "TST-M004", code: "TST-M004", title: "Manual UAT & Bug Linking", epic: "TST",
    prototypeRoute: null,
    overview: "Govern the workflow for tests that cannot be fully automated or require human visual validation — covering UAT library definition, executed UAT session instances, non-functional testing sessions, CLI and IDE-driven manual status submission, and bug ticket linking with evidence attachment.",
    scope: "Manual UAT session management, non-functional testing, and bug linking.",
    status: "draft",
    laws: { "AL-01":{status:"unknown"}, "AL-02":{status:"unknown"}, "AL-03":{status:"unknown"}, "AL-04":{status:"unknown"}, "AL-05":{status:"unknown"}, "AL-06":{status:"unknown"}, "AL-07":{status:"unknown"} },
    prototypes: [], dependencies: [], functionalities: [
      { id: "TST-M004-F001", shortCode: "TST-M004-F001", title: "UAT test suite management", status: "draft", description: "Allow QA engineers to define and maintain the UAT test suite library: a set of named manual test cases each with steps, expected outcomes, and the functionality or module it targets." },
      { id: "TST-M004-F002", shortCode: "TST-M004-F002", title: "Non-functional testing sessions", status: "draft", description: "Support the creation of non-functional test session records (performance, accessibility, usability) with a free-form notes field, environment details, and pass/fail verdict." },
      { id: "TST-M004-F003", shortCode: "TST-M004-F003", title: "Manual status update via CLI or IDE", status: "draft", description: "Provide a CLI command and IDE plugin action that engineers can use to record the outcome of a manual test session without opening the web UI. Results are submitted as structured JSON and ingested by the same pipeline as automated results." },
      { id: "TST-M004-F004", shortCode: "TST-M004-F004", title: "Bug ticket and evidence linking", status: "draft", description: "Allow a QA engineer to link a bug ticket (e.g. GitHub Issue URL) to a failed test case within a UAT session, along with screenshot or video evidence. The linked bug is displayed in the UAT Issues tab of the kanban module detail panel." }
    ]
  }
]

const EPIC = {
  id: "AUT",
  title: "Authentication",
  fullTitle: "Authentication and team access",
  owner: "GivePayments",
  objective:
    "Provide secure, invitation-based authentication so that only authorised team members can access the workspace. Users can log in with email and password, recover a forgotten password, and join a team through a time-limited invitation link.",
  designState: "drafting",
  inScope: [
    "Email and password login with rate-limiting on failed attempts",
    "Password recovery via a time-limited reset link",
    "Invitation-based signup (admin sends invite → user creates account → user joins team)",
    "Automatic team membership upon completing the invitation flow"
  ],
  outOfScope: [
    "Advanced organisation management",
    "Single Sign-On (SSO) and Multi-Factor Authentication (MFA)",
    "Role and permission management beyond member/admin distinction"
  ],
  prototypes: [
    { name: "Login flow - v1", path: "/prototypes/AUT/login/v1/", status: "validated" },
    { name: "Signup flow - v1", path: "/prototypes/AUT/signup/v1/", status: "in-progress" }
  ]
}

const EPIC_DEPENDENCIES = [
  {
    from: "UI-REQ (Backlog)",
    to: "API-READ",
    relation: "calls_api",
    iface: "GET/requirements/tree",
    risk: "high",
    conf: 0.92,
    why: "Backlog renders EP – Module – F hierarchy"
  },
  {
    from: "UI-REQ (Backlog)",
    to: "SVC-DEPS",
    relation: "calls_api",
    iface: "GET/dependencies/impact",
    risk: "medium",
    conf: 0.88,
    why: "Shows \"impact count\" + deep-links"
  },
  {
    from: "UI-PLAN (Planning)",
    to: "SVC-SPRINT",
    relation: "calls_api",
    iface: "POST/sprint-cycles",
    risk: "low",
    conf: 0.90,
    why: "Create/activate sprint-cycles"
  },
  {
    from: "UI-PLAN (Planning)",
    to: "SVC-INTEGRATION",
    relation: "triggers_workflow",
    iface: "POST/automation/create-pr",
    risk: "medium",
    conf: 0.80,
    why: "\"Start sprint\" opens PR design → dev"
  },
  {
    from: "UI-TEST (Testing)",
    to: "SVC-TEST",
    relation: "calls_api",
    iface: "GET/testing/runs",
    risk: "low",
    conf: 0.95,
    why: "Testing dashboard/runs/coverage"
  },
  {
    from: "SVC-TEST",
    to: "SVC-GOV",
    relation: "reads_policy",
    iface: "policy.coverage.threshold",
    risk: "low",
    conf: 0.85,
    why: "Coverage & manual suite requirements"
  },
  {
    from: "SVC-RELEASE",
    to: "SVC-TEST",
    relation: "aggregates",
    iface: "evidence: tests/coverage/regression",
    risk: "low",
    conf: 0.90,
    why: "Release notes include test proof"
  },
  {
    from: "SVC-RELEASE",
    to: "SVC-DEPS",
    relation: "aggregates",
    iface: "dep diff: versionA→B",
    risk: "medium",
    conf: 0.82,
    why: "Release notes include dependency changes"
  }
]

const EPIC_INFO = {
  "AUT": {
    id: "AUT", title_short: "Authentication", title: "Authentication and team access",
    owner: "GivePayments", designState: "drafting", status: "released",
    objective: "Provide secure, invitation-based authentication so that only authorised team members can access the workspace. Users can log in with email and password, recover a forgotten password, and join a team through a time-limited invitation link.",
    inScope: [
      "Email and password login with rate-limiting on failed attempts",
      "Password recovery via a time-limited reset link",
      "Invitation-based signup (admin sends invite → user creates account → user joins team)",
      "Automatic team membership upon completing the invitation flow"
    ],
    outOfScope: [
      "Advanced organisation management",
      "Single Sign-On (SSO) and Multi-Factor Authentication (MFA)",
      "Role and permission management beyond member/admin distinction"
    ]
  },
  "DEP": {
    id: "DEP", title_short: "Dependencies", title: "Dependency tracking and intelligent impact mapping",
    owner: "GivePayments", designState: "drafting", status: "draft",
    objective: "Track and visualise all inter-module dependencies so that developers, QA and architects can immediately understand the blast radius of any change, maintain accurate coupling diagrams, and surface scoped dependency context directly inside the modules that need it.",
    inScope: [
      "Global UML dependency graph view with component diagram layout",
      "Flat tabular dependency list view with sort and filter",
      "Scoped module-level dependency panel used inside requirements module and sprint board"
    ],
    outOfScope: [
      "Automatic dependency discovery from source-code AST analysis",
      "Real-time live dependency change diffing",
      "Cross-repository dependency tracking"
    ]
  },
  "DES": {
    id: "DES", title_short: "Design", title: "Design prototypes management",
    owner: "GivePayments", designState: "draft", status: "draft",
    objective: "Give the product team a structured, version-controlled subsystem for managing clickable HTML/CSS/JS prototypes directly within RoundRush V2. Every prototype is stored in the repository under a standardised folder structure, automatically linked to the corresponding requirement module from the codebase, and rendered inside the app through a sandboxed iframe. A CI/CD pipeline handles the full delivery lifecycle, and a design status board lets designers and managers track the design lifecycle of every requirement.",
    inScope: [
      "Prototype catalogue index listing all prototype flows grouped by category",
      "Design status board tracking design lifecycle per requirement (to-do → ready-for-sprint)",
      "In-app prototype viewer with light/dark theme and desktop/mobile device toggles",
      "Prototype info panel showing linked epic, module, source path, file type, and version",
      "Repository folder convention at /prototypes/<epic-id>/<module-id>/ with mandatory version and requirement reference",
      "Three-branch versioning model (design / develop / main)",
      "Automated CI/CD pipeline: on merge, sync /prototypes/ to S3 and POST to backend sync API",
      "Secure iframe sandbox rendering (sandbox=\"allow-scripts allow-same-origin\")",
      "Acceptance validation linkage: prototype marked validated when module AL status reaches full pass"
    ],
    outOfScope: [
      "Manual scheduling or assignment of prototypes to sprints",
      "Editing prototype source files from inside RoundRush",
      "Figma embed or third-party design tool integration",
      "Prototype version diffing or visual comparison tooling",
      "Notifications to team members when prototype status changes"
    ]
  },
  "DOC": {
    id: "DOC", title_short: "Documentation", title: "Documentation hub and knowledge base",
    owner: "GivePayments", designState: "drafting", status: "draft",
    objective: "Render the contents of the repository's requirements/documentation/ folder as a browsable, searchable knowledge base within the Roundrush UI, with no additional publishing step required.",
    inScope: [
      "Browsable section list rendered from the documentation/ folder",
      "Full-text search across all documentation markdown files",
      "Inline markdown rendering with syntax highlighting",
      "Back-navigation between search results and section views"
    ],
    outOfScope: [
      "Inline editing of documentation from the UI",
      "Version history or diff view for documentation files",
      "External documentation sources outside the repository"
    ]
  },
  "KAN": {
    id: "KAN", title_short: "Kanban / Planning", title: "Sprint planning board and module detail",
    owner: "GivePayments", designState: "drafting", status: "draft",
    objective: "Give the team a fully reactive, CI/CD-driven sprint planning board where module and task statuses are maintained automatically by the pipeline. Closed sprints produce tabbed report cards and a stakeholder-approval release notes view.",
    inScope: [
      "Reactive sprint board: modules grouped by feature area, 7-column layout, no manual status editing",
      "Column sorting, multi-criteria filtering, and free-text search",
      "Sprint selector with status dots, history navigation, and Copilot-assisted close sprint flow",
      "CI/CD-driven task lifecycle: TODO → IN PROGRESS → RFR → MERGED → QA → DONE",
      "Module detail overlay with six tabs: Overview, Acceptance Laws, Dependencies, Tasks, Test Cases, UAT Issues",
      "Closed sprint tabbed report card and stakeholder sign-off release notes view"
    ],
    outOfScope: [
      "Drag-and-drop reordering of modules or tasks",
      "Manual creation, deletion, or reassignment of tasks",
      "Sprint creation, deletion, and capacity planning"
    ]
  },
  "REQ": {
    id: "REQ", title_short: "Requirements", title: "Requirements module",
    owner: "GivePayments", designState: "drafting", status: "draft",
    objective: "Provide a hierarchical requirements browser with epic, module, and functionality level views so that all stakeholders can navigate, read, and verify the full specification without leaving the Roundrush UI.",
    inScope: [
      "Epic-level view with description, acceptance laws, dependencies, and modules tabs",
      "Module-level view with description, acceptance laws, dependencies, functionalities, and prototypes tabs",
      "Functionality-level view rendered as a single content card",
      "Explorer sidebar with tree navigation and search"
    ],
    outOfScope: [
      "Inline editing of requirement specifications from the UI",
      "Real-time collaborative editing",
      "Automated requirement traceability matrix generation"
    ]
  },
  "RMP": {
    id: "RMP", title_short: "Roadmap", title: "Roadmap timeline and snapshot planning",
    owner: "GivePayments", designState: "draft", status: "draft",
    objective: "Give product managers and leadership a dynamically generated timeline canvas that visualises every module across all epics over the full project lifespan — from inception to present — without any manual maintenance. A companion snapshot mode lets managers create named, editable copies of the roadmap for planning sessions and stakeholder meetings.",
    inScope: [
      "Auto-generated two-track Gantt canvas (Development + Design) derived from sprint and pipeline data",
      "Status colour coding per module bar (completed, in-dev, designing, to-do)",
      "Project settings (dates, sprint duration, team members)",
      "Named snapshot clones with drag-to-reposition and resize",
      "Export snapshot as PNG or PDF"
    ],
    outOfScope: [
      "Manual scheduling or direct edits to the live roadmap",
      "Resource capacity planning",
      "Integration with external project management tools",
      "Notifications or alerts based on roadmap changes"
    ]
  },
  "TST": {
    id: "TST", title_short: "Testing", title: "Test management and execution tracking",
    owner: "GivePayments", designState: "drafting", status: "draft",
    objective: "Track the full lifecycle of test planning, automated CI execution, coverage analysis, and manual UAT sessions in a single integrated surface — so QA engineers and developers always know the current state of quality for every sprint.",
    inScope: [
      "Test planning matrix and traceability views",
      "CI/CD-driven automated test execution and dashboard sync",
      "AI-driven coverage analysis and regression intelligence",
      "Manual UAT session management and bug linking"
    ],
    outOfScope: [
      "Test case authoring IDE",
      "Load and performance testing orchestration",
      "Third-party test management tool integration"
    ]
  }
}

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
    fail: "Fail",
    pending: "Pending",
    released: "Released",
    validated: "Validated",
    "in-progress": "In progress",
    planned: "Ready for sprint",
    draft: "To do",
    design: "Design"
  }
  return labels[String(status || "").toLowerCase()] || "Unknown"
}

function getNodeById(id) {
  if (EPIC_INFO[id]) {
    return { type: "epic", ...EPIC_INFO[id] }
  }

  if (MODULE_BY_ID.has(id)) {
    return { type: "module", ...MODULE_BY_ID.get(id) }
  }

  if (FUNCTIONALITY_BY_ID.has(id)) {
    return { type: "functionality", ...FUNCTIONALITY_BY_ID.get(id) }
  }

  return { type: "epic", ...EPIC_INFO["AUT"] }
}

function getTabsForNode(node) {
  if (node.type === "epic") {
    return [
      { id: "description", label: "Description" },
      { id: "acceptance-laws", label: "Acceptance Laws" },
      { id: "dependencies", label: "Dependencies" },
      { id: "modules", label: "Modules" }
    ]
  }

  if (node.type === "module") {
    return [
      { id: "description", label: "Description" },
      { id: "acceptance-laws", label: "Acceptance Laws" },
      { id: "dependencies", label: "Dependencies" },
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
  } else if (statusClass === "fail") {
    badgeColor = "orange"
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

function renderEpicDescription(epicNode) {
  const info = epicNode || EPIC_INFO["AUT"]
  const epicModules = MODULES.filter((m) => m.epic === info.id)
  const moduleLines = epicModules.length > 0
    ? epicModules.map((m) => `  - ${escapeHtml(m.code)} - ${escapeHtml(m.title)}`).join("\n")
    : "  # No modules defined yet"

  return `
    <section class="rr-rm2-content-card">
      <h3>Description</h3>
      <div class="rr-rm2-divider"></div>
      <pre class="rr-rm2-pre">id: ${escapeHtml(info.id)}
title_short: ${escapeHtml(info.title_short || info.title)}
title: ${escapeHtml(info.title)}
design_state: ${escapeHtml(info.designState || "drafting")}  # discovery | drafting | review | approved | ready_for_delivery
modules:
${moduleLines}</pre>
      <div class="rr-rm2-divider"></div>
      <h4>Objective</h4>
      <p>${escapeHtml(info.objective || "")}</p>
      <h4>In scope</h4>
      <ul>
        ${(info.inScope || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
      </ul>
      <h4>Out of scope (for this EP)</h4>
      <ul>
        ${(info.outOfScope || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
      </ul>
    </section>
  `
}

function renderModulesTable(epicNode) {
  const ARROW_DOWN_ICON = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none" aria-hidden="true"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const LINK_ICON = `<svg width="18" height="18" viewBox="0 0 256 256" fill="none" aria-hidden="true"><path d="M144 80h32a40 40 0 010 80h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 176H80a40 40 0 010-80h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`

  const epicModules = epicNode ? MODULES.filter((m) => m.epic === epicNode.id) : MODULES.filter((m) => m.epic === "AUT")
  if (epicModules.length === 0) {
    return `<p class="rr-rm2-empty">No modules defined for this epic yet.</p>`
  }

  const rows = epicModules.map((module) => {
    const firstProto = Array.isArray(module.prototypes) && module.prototypes.length > 0 ? module.prototypes[0] : null
    const protoStatus = firstProto ? firstProto.status : "draft"
    const protoPath = firstProto ? firstProto.path : null

    const protoLinkCell = protoPath
      ? `<a class="rr-rm2-mod-link-btn" href="${escapeHtml(protoPath)}" target="_blank" rel="noreferrer" aria-label="Open prototype">${LINK_ICON}</a>`
      : `<span class="rr-rm2-mod-link-btn rr-rm2-mod-link-btn--disabled" aria-hidden="true">${LINK_ICON}</span>`

    return `
      <tr>
        <td>
          <div class="rr-rm2-mod-name-cell">
            <span class="rr-rm2-mod-file-icon">${TREE_ICON.file}</span>
            <button type="button" class="rr-rm2-mod-name-btn" data-action="open-node" data-node-id="${escapeHtml(module.id)}">${escapeHtml(module.code)} - ${escapeHtml(module.title)}</button>
          </div>
        </td>
        <td class="rr-rm2-mod-col-prototype">${protoLinkCell}</td>
        <td class="rr-rm2-mod-col-proto-status">${renderStatusBadge(protoStatus)}</td>
        <td class="rr-rm2-mod-col-mod-status">${renderStatusBadge(module.status)}</td>
      </tr>
    `
  }).join("")

  return `
    <div class="rr-rm2-mod-table-wrap">
      <table class="rr-rm2-mod-table">
        <thead>
          <tr>
            <th>
              <div class="rr-rm2-mod-th-content">
                <span>Module</span>
                ${ARROW_DOWN_ICON}
              </div>
            </th>
            <th class="rr-rm2-mod-col-prototype">Prototype</th>
            <th class="rr-rm2-mod-col-proto-status">Prototype status</th>
            <th class="rr-rm2-mod-col-mod-status">Module status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
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
  const protoRouteCell = module.prototypeRoute
    ? `<span class="rr-rm2-desc-meta-value">${escapeHtml(module.prototypeRoute)}</span>`
    : `<span class="rr-rm2-desc-meta-value rr-rm2-desc-meta-value--empty">—</span>`

  const functionalitiesHtml = Array.isArray(module.functionalities) && module.functionalities.length > 0
    ? module.functionalities.map((item) => {
        const shortNum = item.shortCode ? item.shortCode.replace(/^[A-Z]+-M\d+-F(\d+)$/, (_, n) => String(Number(n)).padStart(2, "0")) : ""
        const codeLabel = shortNum ? `${module.code}-F${shortNum}` : item.id
        return `
          <div class="rr-rm2-desc-func">
            <h4 class="rr-rm2-desc-func-title">${escapeHtml(codeLabel)} — ${escapeHtml(item.title)}</h4>
            <p class="rr-rm2-desc-func-body">${escapeHtml(item.description || item.userStory || item.scope || "")}</p>
          </div>
        `
      }).join("")
    : `<p class="rr-rm2-empty">No functionalities defined yet.</p>`

  return `
    <section class="rr-rm2-content-card">
      <h3 class="rr-rm2-desc-section-label">Description</h3>
      <div class="rr-rm2-divider"></div>
      <div class="rr-rm2-desc-meta">
        <div class="rr-rm2-desc-meta-cell">
          <span class="rr-rm2-desc-meta-label">ID</span>
          <span class="rr-rm2-desc-meta-value">${escapeHtml(module.code)}</span>
        </div>
        <div class="rr-rm2-desc-meta-cell">
          <span class="rr-rm2-desc-meta-label">Title</span>
          <span class="rr-rm2-desc-meta-value">${escapeHtml(module.title)}</span>
        </div>
        <div class="rr-rm2-desc-meta-cell">
          <span class="rr-rm2-desc-meta-label">Epic</span>
          <span class="rr-rm2-desc-meta-value">${escapeHtml(module.epic || "AUT")}</span>
        </div>
        <div class="rr-rm2-desc-meta-cell">
          <span class="rr-rm2-desc-meta-label">Status</span>
          <span class="rr-rm2-desc-meta-value">${escapeHtml(toStatusLabel(module.status))}</span>
        </div>
        <div class="rr-rm2-desc-meta-cell">
          <span class="rr-rm2-desc-meta-label">Prototype route</span>
          ${protoRouteCell}
        </div>
      </div>
      <div class="rr-rm2-divider"></div>
      <h2 class="rr-rm2-desc-heading">Overview</h2>
      <p class="rr-rm2-desc-body">${escapeHtml(module.overview || module.scope || "")}</p>
      <div class="rr-rm2-divider"></div>
      <h2 class="rr-rm2-desc-heading">Functionalities</h2>
      ${functionalitiesHtml}
    </section>
  `
}

function renderDependenciesTable() {
  const ARROW_DOWN_ICON = `<svg class="rr-dep-sort-icon" width="16" height="16" viewBox="0 0 256 256" fill="none" aria-hidden="true"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`

  const rows = EPIC_DEPENDENCIES.map((dep) => {
    const riskLabel = { high: "High", medium: "Medium", low: "Low" }[dep.risk] || dep.risk
    return `
      <div class="rr-dep-row">
        <div class="rr-dep-cell rr-dep-cell--from">${escapeHtml(dep.from)}</div>
        <div class="rr-dep-cell rr-dep-cell--to">${escapeHtml(dep.to)}</div>
        <div class="rr-dep-cell rr-dep-cell--relation">${escapeHtml(dep.relation)}</div>
        <div class="rr-dep-cell rr-dep-cell--iface">${escapeHtml(dep.iface)}</div>
        <div class="rr-dep-cell rr-dep-cell--risk">
          <span class="rr-dep-risk-badge rr-dep-risk-badge--${escapeHtml(dep.risk)}">${escapeHtml(riskLabel)}</span>
        </div>
        <div class="rr-dep-cell rr-dep-cell--conf">${escapeHtml(String(dep.conf))}</div>
        <div class="rr-dep-cell rr-dep-cell--why">${escapeHtml(dep.why)}</div>
      </div>
    `
  }).join("")

  return `
    <div class="rr-dep-table">
      <div class="rr-dep-thead-wrap">
        <div class="rr-dep-thead">
          <div class="rr-dep-th rr-dep-th--from">From ${ARROW_DOWN_ICON}</div>
          <div class="rr-dep-th rr-dep-th--to">To</div>
          <div class="rr-dep-th rr-dep-th--relation">Relation</div>
          <div class="rr-dep-th rr-dep-th--iface">Interface</div>
          <div class="rr-dep-th rr-dep-th--risk">Risk</div>
          <div class="rr-dep-th rr-dep-th--conf">Conf.</div>
          <div class="rr-dep-th rr-dep-th--why">Why</div>
        </div>
      </div>
      <div class="rr-dep-tbody">${rows}</div>
    </div>
  `
}

function renderModuleDependenciesTable(module) {
  const deps = module.dependencies || []
  const ARROW_DOWN_ICON = `<svg class="rr-dep-sort-icon" width="16" height="16" viewBox="0 0 256 256" fill="none" aria-hidden="true"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`

  if (deps.length === 0) {
    return `<div class="rr-dep-table"><p class="rr-rm2-empty">No dependencies defined for this module.</p></div>`
  }

  const rows = deps.map((dep) => {
    const riskLabel = { high: "High", medium: "Medium", low: "Low" }[dep.risk] || dep.risk
    return `
      <div class="rr-dep-row">
        <div class="rr-dep-cell rr-dep-cell--from">${escapeHtml(dep.from)}</div>
        <div class="rr-dep-cell rr-dep-cell--to">${escapeHtml(dep.to)}</div>
        <div class="rr-dep-cell rr-dep-cell--relation">${escapeHtml(dep.relation)}</div>
        <div class="rr-dep-cell rr-dep-cell--iface">${escapeHtml(dep.iface)}</div>
        <div class="rr-dep-cell rr-dep-cell--risk">
          <span class="rr-dep-risk-badge rr-dep-risk-badge--${escapeHtml(dep.risk)}">${escapeHtml(riskLabel)}</span>
        </div>
        <div class="rr-dep-cell rr-dep-cell--conf">${escapeHtml(String(dep.conf))}</div>
        <div class="rr-dep-cell rr-dep-cell--why">${escapeHtml(dep.why)}</div>
      </div>
    `
  }).join("")

  return `
    <div class="rr-dep-table">
      <div class="rr-dep-thead-wrap">
        <div class="rr-dep-thead">
          <div class="rr-dep-th rr-dep-th--from">From ${ARROW_DOWN_ICON}</div>
          <div class="rr-dep-th rr-dep-th--to">To</div>
          <div class="rr-dep-th rr-dep-th--relation">Relation</div>
          <div class="rr-dep-th rr-dep-th--iface">Interface</div>
          <div class="rr-dep-th rr-dep-th--risk">Risk</div>
          <div class="rr-dep-th rr-dep-th--conf">Conf.</div>
          <div class="rr-dep-th rr-dep-th--why">Why</div>
        </div>
      </div>
      <div class="rr-dep-tbody">${rows}</div>
    </div>
  `
}

function renderPanel(node, activeTab, state) {
  if (activeTab === "acceptance-laws") {
    return renderAcceptanceLawsTable()
  }

  if (node.type === "epic") {
    if (activeTab === "description") {
      return renderEpicDescription(node)
    }
    if (activeTab === "dependencies") {
      return renderDependenciesTable()
    }
    if (activeTab === "modules") {
      return renderModulesTable(node)
    }
  }

  if (node.type === "module") {
    if (activeTab === "description") {
      return renderModuleDescription(node)
    }
    if (activeTab === "dependencies") {
      return renderModuleDependenciesTable(node)
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
    return `${node.id} - ${node.title_short || node.title}`
  }
  if (node.type === "module") {
    return `${node.code} - ${node.title}`
  }
  return `${node.shortCode} - ${node.title}`
}

function getBreadcrumbSegments(node) {
  const epicId = node.type === "epic" ? node.id : (node.epic || (node.moduleCode ? node.moduleCode.split("-")[0] : "AUT"))
  const epicInfo = EPIC_INFO[epicId] || EPIC_INFO["AUT"]
  const base = [epicInfo.owner || "GivePayments", `${epicId} - ${epicInfo.title_short}`]
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
  const epicIds = ["AUT", "DEP", "DOC", "KAN", "REQ", "RMP", "TST"]
  return epicIds.map((epicId) => {
    const info = EPIC_INFO[epicId]
    const epicModules = MODULES.filter((m) => m.epic === epicId)
    return {
      id: epicId,
      label: `${epicId} - ${info.title_short}`,
      icon: "folder",
      targetNodeId: epicId,
      children: epicModules.map((module) => ({
        id: `tree-${module.id}`,
        label: `${module.code} - ${module.title}`,
        icon: "dot",
        dotColor: ["released", "validated"].includes(module.status) ? "green" : "gray",
        targetNodeId: module.id
      }))
    }
  })
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

      const dotIcon = item.icon === "dot"
        ? `<span class="rr-rm2-tree-dot" style="background:${item.dotColor === "green" ? "#16a34a" : "#94a3b8"}"></span>`
        : null

      return `
        <li>
          <div class="rr-rm2-tree-row ${isSelected ? "is-selected" : ""} ${hasChildren ? "is-folder" : "is-file"}" data-depth="${depth}">
            ${hasChildren
              ? `<button type="button" class="rr-rm2-tree-toggle" data-action="toggle-tree" data-tree-id="${escapeHtml(item.id)}">${isExpanded ? TREE_ICON.caretDown : TREE_ICON.caretRight}</button>`
              : item.icon === "dot" ? `<span class="rr-rm2-tree-toggle rr-rm2-tree-toggle--placeholder" aria-hidden="true"></span>` : ""}
            <span class="rr-rm2-tree-icon">${dotIcon ?? (item.icon === "file" ? TREE_ICON.file : TREE_ICON.folder)}</span>
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
    const epicModules = MODULES.filter((m) => m.epic === node.id)
    const passedLaws = ACCEPTANCE_LAWS.filter((law) => law.status === "pass").length
    const compliantModules = epicModules.filter((m) => m.status === "released" || m.status === "validated").length

    return `
      <div class="rr-rm2-summary-grid">
        <article>
          <strong>Acceptance laws</strong>
          <span>${passedLaws} / ${ACCEPTANCE_LAWS.length}</span>
        </article>
        <article>
          <strong>Compliant modules</strong>
          <span>${compliantModules} / ${epicModules.length}</span>
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
    activeTab: "description",
    isExplorerOpen: true,
    treeSearch: "",
    expandedTreeIds: new Set(["AUT"]),
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
    if (EPIC_INFO[nodeId]) {
      state.expandedTreeIds.add(nodeId)
      return
    }

    const module = MODULE_BY_ID.get(nodeId)
    if (module) {
      state.expandedTreeIds.add(module.epic || "AUT")
      state.expandedTreeIds.add(`tree-${module.id}`)
      return
    }

    const functionality = FUNCTIONALITY_BY_ID.get(nodeId)
    if (functionality) {
      const parentModule = MODULE_BY_ID.get(functionality.moduleId)
      state.expandedTreeIds.add(parentModule?.epic || "AUT")
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
