/* ──────────────────────────────────────────────────────────────
   Docs Hub — Project documentation hub + detail view
   Hub:    /docs/hub  → grid of topic cards + live search dropdown
   Detail: (internal state) → two-panel: left nav + article
   ────────────────────────────────────────────────────────────── */

/* ── SVG icons (Phosphor-style) ───────────────────────────── */
const ICON = {
  search: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="116" cy="116" r="84" stroke="currentColor" stroke-width="16"/><line x1="175.4" y1="175.4" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  scales: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="64" y1="216" x2="192" y2="216" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M32 120 L64 56 L96 120" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M160 120 L192 56 L224 120" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="32" y1="120" x2="96" y2="120" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="160" y1="120" x2="224" y2="120" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  gitFork: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="64" r="24" stroke="currentColor" stroke-width="16"/><circle cx="176" cy="64" r="24" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="192" r="24" stroke="currentColor" stroke-width="16"/><path d="M80 88 Q80 128 128 168" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M176 88 Q176 128 128 168" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  gitBranch: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="64" r="24" stroke="currentColor" stroke-width="16"/><circle cx="80" cy="192" r="24" stroke="currentColor" stroke-width="16"/><circle cx="176" cy="88" r="24" stroke="currentColor" stroke-width="16"/><line x1="80" y1="88" x2="80" y2="168" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M80 88 Q80 88 152 88" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  gear: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="40" stroke="currentColor" stroke-width="16"/><path d="M128 24v24M128 208v24M24 128h24M208 128h24M60.7 60.7l17 17M178.3 178.3l17 17M60.7 195.3l17-17M178.3 77.7l17-17" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  fileText: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 32h112l48 48v144H48z" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/><polyline points="160,32 160,80 208,80" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="136" x2="160" y2="136" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="96" y1="168" x2="160" y2="168" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="96" y1="104" x2="128" y2="104" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  testTube: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 80 32 L 80 160 A 48 48 0 0 0 176 160 L 176 32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="64" y1="32" x2="192" y2="32" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="80" y1="128" x2="176" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  lockSimple: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="112" width="176" height="120" rx="8" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/><path d="M88 112V80a40 40 0 0 1 80 0v32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><circle cx="128" cy="160" r="12" fill="currentColor"/></svg>`,

  rocket: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 144c-8 28-8 56 0 56s24-16 40-32l48 16c16-32 32-72 32-112-40 0-80 16-112 32l16 48C64 168 60 156 56 144z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M144 112a16 16 0 1 0-16-16 16 16 0 0 0 16 16z" stroke="currentColor" stroke-width="16"/></svg>`,

  users: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="88" cy="108" r="52" stroke="currentColor" stroke-width="16"/><path d="M155.41 57.94A52 52 0 01207.86 160M16 197.4a88 88 0 01144 0M220 197.4a88 88 0 00-44.62-38" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  caretRight: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  close: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><line x1="64" y1="64" x2="192" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="192" y1="64" x2="64" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  closeSmall: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="64" y1="64" x2="192" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="192" y1="64" x2="64" y2="192" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  clockCounterClockwise: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="88" stroke="currentColor" stroke-width="16"/><polyline points="128,76 128,128 96,156" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M78 34 A96 96 0 0 0 32 96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,8 78,34 104,20" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  funnelSimple: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="40" y1="80" x2="216" y2="80" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="72" y1="128" x2="184" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><line x1="104" y1="176" x2="152" y2="176" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,

  /* Code / Copy icons (Phosphor) */
  code: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><polyline points="80,64 24,128 80,192" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="176,64 232,128 176,192" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  copy: `<svg width="14" height="14" viewBox="0 0 256 256" fill="none"><rect x="48" y="96" width="144" height="144" rx="8" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/><path d="M96 96V56a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v136a8 8 0 0 1-8 8h-40" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  clockCounterClockwiseMd: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M224 48v56h-56" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 128A96 96 0 1 0 59.06 61.37L224 104" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="128,72 128,128 168,152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

/* ── Helpers ───────────────────────────────────────────────── */
function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;")
}

/* ── Category colours ───────────────────────────────────────── */
const CATEGORY_COLOR = {
  Governance:  { bg: "#eef4ff", text: "#3b5bdb" },
  Engineering: { bg: "#e6fcf5", text: "#0ca678" },
  Quality:     { bg: "#fff4e6", text: "#e67700" },
  Workflow:    { bg: "#f3f0ff", text: "#7048e8" },
}
function catStyle(cat) {
  const c = CATEGORY_COLOR[cat] || { bg: "#f1f3f5", text: "#495057" }
  return `background:${c.bg};color:${c.text}`
}

/* ══════════════════════════════════════════════════════════════
   DOC HISTORY — per-section audit entries
   ══════════════════════════════════════════════════════════════ */
const DOC_HISTORY = {
  "acceptance-laws": [
    { date: "08/03/26", entries: [
      { action: "Changed", detail: "AL-07 sign-off now requires both QA lead and engineering lead approval before the module can close", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
      { action: "Removed", detail: "AL-08 visual consistency check removed — moved to the design review checklist outside compliance scope", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
    ]},
    { date: "05/03/26", entries: [
      { action: "Changed", detail: "AL-02 coverage threshold raised from 75% to 80% to align with updated project quality standards", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
    ]},
    { date: "28/02/26", entries: [
      { action: "Added", detail: "AL-07 — Required manual suites section with QA sign-off log and 48-hour turnaround SLA", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
    { date: "14/02/26", entries: [
      { action: "Changed", detail: "AL-05 evidence: PR description must now include a dependency review summary as a required field", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
    ]},
    { date: "03/02/26", entries: [
      { action: "Added", detail: "AL-06 — Regression test suite coverage derived from the module dependency map added as acceptance gate", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
    ]},
  ],
  "definition-of-done": [
    { date: "11/03/26", entries: [
      { action: "Added", detail: "Initial document: module, flow, and component DoD checklists plus CI validation checks", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
  ],
  "naming-conventions": [
    { date: "11/03/26", entries: [
      { action: "Added", detail: "Initial document: requirement IDs, file naming, code symbols, CSS classes, design tokens, and prototype routes", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
  ],
  "review-checklists": [
    { date: "11/03/26", entries: [
      { action: "Added", detail: "Initial document: spec PR, design system PR, prototype PR, and documentation PR checklists", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
  ],
  "architecture-decisions": [
    { date: "11/03/26", entries: [
      { action: "Added", detail: "ADR-0003: centralised acceptance laws — requirements/documentation/ replaces _governance/ as the governance home", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
    { date: "05/03/26", entries: [
      { action: "Added", detail: "ADR-0001 and ADR-0002 migrated from _governance/decisions/ — monorepo structure and flat requirements structure", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
  ],
  "workflows": [
    { date: "11/03/26", entries: [
      { action: "Added", detail: "Initial document: spec lifecycle, Figma-to-code sync, component scaffold, and full build chain reference", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
  ],
  "api-specification": [
    { date: "12/03/26", entries: [
      { action: "Added", detail: "Initial document: project integration flow, Copilot integration requirements, API responsibilities, and repository organisation guidelines", user: "Vincenzo Sorrentino", initials: "VS", color: "#a9c0d4" },
    ]},
  ],
}

/* ══════════════════════════════════════════════════════════════
   DOC SECTIONS — hub meta + full article content
   ══════════════════════════════════════════════════════════════ */
const DOC_SECTIONS = [
  /* ── 1. Acceptance laws ─────────────────────────────────── */
  {
    id: "acceptance-laws",
    title: "Acceptance laws",
    icon: "scales",
    category: "Governance",
    shortDescription: "The seven laws that every module must satisfy before it can be marked as compliant and released.",
    tags: ["laws", "compliance", "done", "module", "qa"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the minimum quality gates required before any module may be marked as compliant and transitioned to a released state. The seven acceptance laws apply uniformly across all epics and modules in the RoundRush platform." },
          { type: "p", text: "The objective is not process compliance for its own sake. The objective is predictability, reliability, and sustainable delivery velocity — ensuring that every merged module leaves the codebase in a verifiably better state than it found it." },
        ],
      },
      {
        anchor: "al-01", heading: "AL-01 — All production code implemented",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All production code for the module has been implemented, peer-reviewed, and merged into the integration branch before the module is evaluated for compliance." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["No feature flags masking incomplete work at evaluation time.", "Code must pass the CI lint and build pipeline with no errors.", "Breaking changes to shared interfaces require a migration path documented in the PR."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Closed and merged PR(s) linked to the module task.", "Green CI build on the integration branch."] },
          { type: "label", text: "Failure Condition" },
          { type: "p", text: "Module has open or draft PRs, or CI is red on the integration branch." },
        ],
      },
      {
        anchor: "al-02", heading: "AL-02 — All automated unit & integration tests pass with 100% coverage",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All unit and integration tests must pass with no failures, and overall coverage must meet or exceed the project threshold currently set at 80% statement coverage." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["Tests must be deterministic — no flaky or time-dependent assertions.", "New logic paths introduced by the module must be covered.", "Integration tests must assert against real service boundaries, not internal implementation details."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Test execution report (unit).", "Test execution report (integration).", "Coverage report showing module-level and project-level percentages."] },
          { type: "label", text: "Failure Condition" },
          { type: "p", text: "Any test failure, or coverage below the threshold for the modified files." },
        ],
      },
      {
        anchor: "al-03", heading: "AL-03 — All documentation updated",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All documentation affected by the module changes has been updated. This includes requirements files (if necessary), tests, code comments, component documentation, and UML diagrams — covering both architecture diagrams and use case diagrams where applicable." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["Requirements files must reflect the final implemented scope — no gaps between spec and code.", "Public APIs and exported functions must have updated JSDoc or equivalent.", "Architecture and use case UML diagrams must be updated when structure or behaviour changes.", "ADRs must be filed for any architectural decision made during delivery."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Updated requirement .md file(s) linked in the PR.", "Confirmation commit touching docs in the same PR or a follow-up within the same sprint."] },
        ],
      },
      {
        anchor: "al-04", heading: "AL-04 — All end-to-end tests implemented and passed",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "E2E tests covering all user-facing flows defined in the module's acceptance criteria must be implemented and pass in CI before the module is marked compliant." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["E2E tests must cover happy paths and critical error paths.", "Tests run against a deployed staging environment, not a local server.", "Any flaky E2E test must be fixed — not skipped — before compliance is granted."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["E2E test execution report (Playwright or Cypress CI run).", "All tests green on the latest staging deployment."] },
        ],
      },
      {
        anchor: "al-05", heading: "AL-05 — Dependency map between modules updated",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "The module dependency map must be reviewed and updated whenever the module introduces, removes, or modifies dependencies on other modules." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["Dependency graph snapshot must be regenerated and committed.", "Circular dependencies introduced by the module are a blocking issue.", "Explicit confirmation of 'no change' must appear in the PR description."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Updated dependency map snapshot file committed to the repository.", "PR description includes dependency review summary."] },
        ],
      },
      {
        anchor: "al-06", heading: "AL-06 — AI-generated regression tests based on dependency analysis pass 100%",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All regression tests derived from modules that depend on (or are depended upon by) the changed module must pass with 100% success before compliance is granted." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["The regression scope is derived from the dependency map, not manually selected.", "Zero failures permitted — partial success is not acceptable for this gate.", "Regression suite must be re-run after any fix that modifies dependency behaviour."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Regression test execution report with 100% pass rate.", "The report must reference the dependency scope used to derive the test set."] },
        ],
      },
      {
        anchor: "al-07", heading: "AL-07 — All manual test suites (including smoke tests) completed",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All required manual validation sessions (smoke tests, exploratory testing, accessibility review where applicable) must be completed and documented before the module is released." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["Manual sessions must be conducted in the staging environment.", "Results must be recorded in the QA sign-off log with tester name, date, and outcome.", "Any discovered defect must either be fixed or explicitly accepted as a known issue with a ticket."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["QA sign-off log entry linked to the module.", "All discovered defects resolved or triaged to backlog with documented acceptance."] },
        ],
      },
      {
        anchor: "compliance", heading: "8. Compliance verification",
        blocks: [
          { type: "p", text: "A module is considered compliant only when all seven laws are in Pass status simultaneously. Partial compliance does not qualify the module for release." },
          { type: "p", text: "This document is the canonical and sole authoritative source for the Acceptance Laws. The table in each module and epic requirements file reflects the live compliance status. Any change to a law's definition must be made here first." },
        ],
      },
    ],
  },

  /* ── 1b. Definition of done ────────────────────────────── */
  {
    id: "definition-of-done",
    title: "Definition of Done",
    icon: "scales",
    category: "Governance",
    shortDescription: "The minimum conditions that must be satisfied before any module, prototype flow, or component is considered complete.",
    tags: ["done", "checklist", "module", "prototype", "component"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "The Definition of Done specifies the minimum set of conditions that must be satisfied before any unit of work can be considered complete. Meeting the Definition of Done is a prerequisite for marking any item as Done in the project tracking system." },
        ],
      },
      {
        anchor: "module-level", heading: "2. Module level",
        blocks: [
          { type: "p", text: "A module is done when all of the following conditions are met:" },
          { type: "ul", items: ["All seven Acceptance Laws are in Pass status.", "The spec file includes all required frontmatter fields and sections (Overview, Acceptance Laws, Functionalities).", "The status field in frontmatter is set to done.", "A non-null prototype_route is declared and the route is registered in the router.", "All functionality sections within the module file are complete and match the implemented scope.", "The dependency map has been updated and committed."] },
        ],
      },
      {
        anchor: "flow-level", heading: "3. Prototype flow level",
        blocks: [
          { type: "p", text: "A prototype flow is done when all of the following conditions are met:" },
          { type: "ul", items: ["The flow route exists and is accessible from the app navigation.", "The core happy path and at least one failure path are represented and interactive.", "The flow uses only @roundrush/components and semantic design tokens — no hardcoded style values.", "The flow renders without runtime errors in CI prototype smoke tests.", "The spec validator (validate-spec-links.mjs) passes with no errors for this flow."] },
        ],
      },
      {
        anchor: "component-level", heading: "4. Design system component level",
        blocks: [
          { type: "ul", items: ["Component API uses kebab-case attributes and rr-* event names.", "No hardcoded style values are used where token variables exist.", "Storybook stories exist for all variants.", "Token and theme artifacts have been regenerated if raw sources changed.", "Component tests pass and coverage meets the project threshold."] },
        ],
      },
      {
        anchor: "ci-checks", heading: "5. CI validation checks",
        blocks: [
          { type: "ul", items: ["npm run validate:specs exits with code 0.", "All prototype routes render without runtime errors.", "npm run build:tokens completes without errors.", "npm run test passes across all workspaces."] },
        ],
      },
    ],
  },

  /* ── 8b. Naming conventions ────────────────────────────── */
  {
    id: "naming-conventions",
    title: "Naming conventions",
    icon: "fileText",
    category: "Governance",
    shortDescription: "Naming rules for requirement IDs, files, code symbols, CSS classes, and design tokens across the entire monorepo.",
    tags: ["naming", "ids", "conventions", "css", "tokens", "files"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the naming rules for all artefacts in the Roundrush monorepo. Consistent naming reduces ambiguity, enables tooling, and makes the codebase navigable by anyone on the team." },
        ],
      },
      {
        anchor: "requirement-ids", heading: "2. Requirement IDs",
        blocks: [
          { type: "p", text: "Every requirement artefact uses a 3-letter uppercase short-code derived from the epic's domain name. The code is assigned once and never changes." },
          { type: "label", text: "Epic short-code registry" },
          { type: "ul", items: ["AUT — Authentication", "REQ — Requirements", "DEP — Dependencies", "RMP — Roadmap", "KAN — Kanban / Planning", "DOC — Documentation", "TST — Testing Suite"] },
          { type: "label", text: "ID patterns" },
          { type: "ul", items: ["Epic: <CODE> e.g. AUT", "Module: <CODE>-M00N e.g. AUT-M001", "Functionality: <CODE>-M00N-F00N e.g. AUT-M001-F001"] },
        ],
      },
      {
        anchor: "file-naming", heading: "3. File naming",
        blocks: [
          { type: "p", text: "The requirements/epics/ folder is flat: each epic folder contains only its epic .md and one .md per module. No modules/ or functionalities/ subdirectories exist." },
          { type: "ul", items: ["Epic: <CODE>-<kebab-domain>.md e.g. AUT-authentication.md", "Module: <CODE>-M00N-<kebab-slug>.md e.g. AUT-M001-login.md", "Functionality: ### section inside the module .md file"] },
        ],
      },
      {
        anchor: "code-symbols", heading: "4. Code symbols",
        blocks: [
          { type: "ul", items: ["Files & folders: kebab-case.", "Variables & functions: camelCase.", "Classes & types: PascalCase.", "Module-level constants: SCREAMING_SNAKE_CASE.", "Function-scoped constants: camelCase."] },
        ],
      },
      {
        anchor: "css-tokens", heading: "5. CSS classes & design tokens",
        blocks: [
          { type: "label", text: "CSS classes — BEM-inspired with rr- prefix" },
          { type: "ul", items: ["Block: rr-sidebar", "Block + element: rr-sidebar__item", "Modifier: rr-sidebar__item--active", "State (JS-applied): is-open, is-error, is-met"] },
          { type: "label", text: "Design tokens" },
          { type: "ul", items: ["Base token: --rr-<category>-<token> e.g. --rr-color-blue-500", "Semantic token: --rr-sem-<name> e.g. --rr-sem-textPrimary", "Component token: --rr-<component>-<property> e.g. --rr-button-paddingX"] },
        ],
      },
      {
        anchor: "prototype-routes", heading: "6. Prototype routes",
        blocks: [
          { type: "ul", items: ["Flow implementation folder: kebab-case e.g. auth-login", "Route format: /<domain>/<feature>/<variant> e.g. /auth/login/default"] },
        ],
      },
    ],
  },

  /* ── 8c. Review checklists ───────────────────────────────── */
  {
    id: "review-checklists",
    title: "Review checklists",
    icon: "scales",
    category: "Governance",
    shortDescription: "Per-PR-type checklists that reviewers must verify before approving any pull request.",
    tags: ["review", "pr", "checklist", "spec", "design-system", "prototype"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "Reviewers must verify every item on the relevant checklist before approving. Items are not optional — if an item cannot be confirmed, the PR must be updated before approval is granted." },
        ],
      },
      {
        anchor: "spec-pr", heading: "2. Spec PR checklist",
        blocks: [
          { type: "p", text: "Applies to any PR that creates or modifies a file in requirements/." },
          { type: "ul", items: ["All frontmatter fields are present and have valid values.", "All required sections are present: Overview, Acceptance Laws, at least one Functionality section.", "Acceptance Laws table uses the current canonical law labels from requirements/documentation/acceptance-laws.md.", "Canonical source annotation is present above the Acceptance Laws table.", "Status transition is valid (draft → ready → in_dev → done).", "If status is approved or done, a non-null prototype_route is declared.", "Any prototype_route declared is registered in routes.js.", "npm run validate:specs passes with no errors."] },
        ],
      },
      {
        anchor: "design-system-pr", heading: "3. Design system PR checklist",
        blocks: [
          { type: "ul", items: ["No hardcoded style values used where a design token variable exists.", "Component API uses kebab-case attributes and rr-* event names.", "Storybook stories exist for all new or modified variants.", "Token and theme build artifacts regenerated when raw sources changed.", "Component contract tests pass.", "No new @ts-ignore or ESLint disable comments without justification."] },
        ],
      },
      {
        anchor: "prototype-pr", heading: "4. Prototype PR checklist",
        blocks: [
          { type: "ul", items: ["Flow route exists in routes.js and maps to the matching spec_id.", "Core happy path and at least one failure path are represented.", "Prototype route is accessible from the prototype index navigation.", "No hardcoded hex colours or pixel values — all styles use semantic tokens.", "Flow renders without runtime JavaScript errors.", "Prototype route smoke test passes in CI."] },
        ],
      },
      {
        anchor: "documentation-pr", heading: "5. Documentation PR checklist",
        blocks: [
          { type: "ul", items: ["Any change to an acceptance law definition is reflected in all epic and module files within the same PR.", "Section headings use ## or ### matching the subsection structure expected by the docs tab.", "Frontmatter is valid: id, title, category, version, last_updated are all present.", "All internal links to other documentation files are valid paths."] },
        ],
      },
    ],
  },

  /* ── 8d. Architecture decisions ─────────────────────────── */
  {
    id: "architecture-decisions",
    title: "Architecture decisions",
    icon: "gitBranch",
    category: "Governance",
    shortDescription: "ADR log: foundational structural decisions that govern how the monorepo is organised and evolved.",
    tags: ["adr", "architecture", "monorepo", "structure", "decisions"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document records the foundational architecture decisions that govern the Roundrush monorepo. Once an ADR is accepted it is immutable — superseding decisions require a new ADR rather than editing an existing one. All team members may propose an ADR; acceptance requires two senior engineer approvals." },
        ],
      },
      {
        anchor: "adr-process", heading: "2. ADR process",
        blocks: [
          { type: "p", text: "An ADR is required for any decision that: changes a module or domain boundary; introduces or removes an external package dependency; adopts, deprecates, or fundamentally changes a pattern; or deviates from these principles." },
          { type: "ul", items: ["Format: ADR-NNNN identifier, Status, Context, Decision, Consequences.", "Once accepted, ADRs are immutable — superseding decisions require a new ADR.", "Acceptance requires two senior engineer approvals."] },
        ],
      },
      {
        anchor: "adr-0001", heading: "ADR-0001 — Monorepo structure",
        blocks: [
          { type: "label", text: "Status: Accepted" },
          { type: "p", text: "Context: Roundrush needs a scalable operating model where requirements, UI library, and prototypes remain aligned over time." },
          { type: "p", text: "Decision: Adopt a single monorepo with top-level boundaries: requirements/, prototypes/design-system/, prototypes/app/. npm workspaces for package management." },
          { type: "ul", items: ["Positive: strong spec-to-prototype linkage; easier cross-review; faster iteration.", "Negative: requires governance to avoid folder drift; CI matrix grows with workspaces."] },
        ],
      },
      {
        anchor: "adr-0002", heading: "ADR-0002 — Flat requirements structure",
        blocks: [
          { type: "label", text: "Status: Accepted" },
          { type: "p", text: "Context: Deep nesting (epic → modules → functionalities as separate files) created friction; links.json drifted out of sync; validator had to walk deeply nested trees." },
          { type: "p", text: "Decision: Flat two-level structure — one .md per module with functionalities as ### sections. prototype_route replaces links.json. Module statuses: draft → ready → in_dev → done → archived." },
          { type: "ul", items: ["Positive: single-file per module; linkage co-located with spec; simpler validator.", "Negative: very large modules become long files — mitigated by keeping descriptions concise."] },
        ],
      },
      {
        anchor: "adr-0003", heading: "ADR-0003 — Centralised acceptance laws",
        blocks: [
          { type: "label", text: "Status: Accepted" },
          { type: "p", text: "Context: Seven Acceptance Laws were duplicated verbatim in all 20+ epic and module files, creating a maintenance risk and risk of silent divergence." },
          { type: "p", text: "Decision: Establish requirements/documentation/acceptance-laws.md as the single canonical source. Epic/module files retain compliance-status tables but add a read-only annotation linking to the canonical source. requirements/documentation/ replaces _governance/." },
          { type: "ul", items: ["Positive: law definitions authored in one place; divergence eliminated; documentation surfaced as first-class content.", "Negative: contributors must follow a link to read the full definition rather than seeing it inline."] },
        ],
      },
    ],
  },

  /* ── 8e. Workflows ───────────────────────────────────────── */
  {
    id: "workflows",
    title: "Workflows",
    icon: "gitFork",
    category: "Workflow",
    shortDescription: "Operational workflows: spec lifecycle, Figma-to-code token sync, component scaffold, and prototype build chain.",
    tags: ["workflow", "spec", "figma", "tokens", "build", "lifecycle"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document describes the key operational workflows used by the Roundrush team: spec authoring lifecycle, Figma-to-code token and component sync, and the full prototype build chain." },
        ],
      },
      {
        anchor: "spec-lifecycle", heading: "2. Spec lifecycle",
        blocks: [
          { type: "ul", items: ["1. Create the epic .md file with frontmatter, objective, scope, and module list.", "2. Create one module .md file per module with frontmatter, overview, acceptance laws table, and functionality sections.", "3. Write each functionality as a ### F-ID section inside the module .md.", "4. Set status: draft in frontmatter during initial authoring.", "5. After review, move module status to ready, then in_dev when work begins.", "6. Build the prototype flow and register its route in routes.js.", "7. Add prototype_route to the module frontmatter.", "8. Move module status to done once all seven Acceptance Laws are in Pass status and prototype QA is complete."] },
          { type: "label", text: "Status rules" },
          { type: "ul", items: ["draft: actively being written — not yet reviewed. No prototype_route required.", "ready: review complete — approved for development.", "in_dev: development in progress.", "done: all Acceptance Laws passing, prototype QA complete. prototype_route must be non-null.", "archived: no longer active — not visible in navigation."] },
        ],
      },
      {
        anchor: "token-sync", heading: "3. Token and theme sync (Figma)",
        blocks: [
          { type: "ul", items: ["1. Export tokens.raw.json, themes.raw.json, components.raw.json from the Figma pipeline.", "2. Run npm run sync:figma -- <export-dir> to copy exports into the design system source folder.", "3. Run npm run build:tokens to compile raw files into CSS custom properties and theme files."] },
        ],
      },
      {
        anchor: "component-sync", heading: "4. Component scaffold",
        blocks: [
          { type: "ul", items: ["1. Run npm run scaffold:components to generate missing component skeletons.", "2. Complete interactive behaviour and accessibility implementation manually.", "3. Add or update Storybook stories for all new or changed variants.", "4. Validate with npm run test:components."] },
        ],
      },
      {
        anchor: "build-chain", heading: "5. Full build chain",
        blocks: [
          { type: "code", label: "Common build commands", lines: [
            "# Install dependencies and build everything from scratch",
            "npm run setup",
            "",
            "# Build only tokens (e.g. after a Figma sync)",
            "npm run build:tokens",
            "",
            "# Run the prototype dev server (rebuilds tokens first)",
            "npm run dev",
            "",
            "# Run all tests",
            "npm run test",
          ]},
          { type: "p", text: "Build flows use only design system components and semantic tokens (--rr-sem-*). Never introduce hardcoded hex colours or pixel values in prototype flows." },
        ],
      },
    ],
  },

  /* ── API Specification ───────────────────────────────────── */
  {
    id: "api-specification",
    title: "RoundRush API Specification",
    icon: "rocket",
    category: "Engineering",
    shortDescription: "How external repositories integrate with RoundRush V2: project connection, Copilot integration, API responsibilities, and required repository structure.",
    tags: ["api", "integration", "copilot", "sync", "repository", "automation"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "The RoundRush API module defines how external repositories integrate with RoundRush V2. This is not merely a technical API description — it is the backbone of the synchronisation model between repository truth and RoundRush visualisation." },
        ],
      },
      {
        anchor: "project-integration", heading: "2. Project Integration Flow",
        blocks: [
          { type: "p", text: "Each new project must complete the following steps before any synchronisation can occur. No project may operate in V2 without formal API integration." },
          { type: "ul", items: ["Connect the repository to RoundRush.", "Generate a secure project-specific API key.", "Store the key securely in project environment variables.", "Configure Copilot integration for automated synchronisation."] },
        ],
      },
      {
        anchor: "copilot-integration", heading: "3. Copilot Integration Requirement",
        blocks: [
          { type: "p", text: "Every integrated repository must include a copilot-instructions directory at the root level. This directory must not become a monolithic instruction file — it must reference modular sub-files to avoid bloating and degradation over time." },
          { type: "label", text: "Required structure" },
          { type: "code", label: "Copilot instructions layout", lines: [
            "/copilot-instructions/",
            "/copilot-instructions/main.md",
            "/copilot-instructions/rr-sync.md",
            "/copilot-instructions/testing.md",
            "/copilot-instructions/governance.md",
          ]},
          { type: "label", text: "Mandatory synchronisation paragraph" },
          { type: "p", text: "Inside rr-sync.md, the following paragraph must be included verbatim: \"At each new commit, all progress and structural changes must be mirrored to RoundRush via the RoundRush API. The AI agent must evaluate updated requirements, modified modules, testing results, coverage metrics, documentation changes, and dependency updates, and push the corresponding status update to RoundRush automatically.\"" },
          { type: "ul", items: ["Automatic API push after every commit.", "Deterministic synchronisation.", "Elimination of manual reporting."] },
        ],
      },
      {
        anchor: "api-responsibilities", heading: "4. API Responsibilities",
        blocks: [
          { type: "p", text: "The RoundRush V2 API must accept and process all state changes from connected repositories. It is designed for AI readability, with deterministic request schemas, explicit payload examples, and validation constraints." },
          { type: "ul", items: [
            "Accept updates about requirement progress.",
            "Accept validation of Acceptance Laws.",
            "Track branch creation, PR status, and merge state.",
            "Track test execution results and coverage.",
            "Store dependency graph updates.",
            "Log sprint associations.",
            "Register user role (developer, QA, designer).",
          ]},
        ],
      },
      {
        anchor: "repository-structure", heading: "5. Repository Organisation Guidelines",
        blocks: [
          { type: "p", text: "The API specification defines a required project boilerplate structure to ensure consistent mirroring between repository layout and RoundRush visualisation." },
          { type: "code", label: "Required project structure", lines: [
            "/requirements/",
            "/requirements/modules/",
            "/tests/",
            "/tests/unit/",
            "/tests/integration/",
            "/tests/e2e/",
            "/docs/",
            "/docs/uml/",
            "/project-governance/",
            "/dependency-map/",
            "/prototypes/",
          ]},
          { type: "label", text: "Documentation rules" },
          { type: "ul", items: [
            "Where testing suites must reside.",
            "How dependency maps must be stored.",
            "How requirements are structured.",
            "Naming conventions for modules and features.",
            "Documentation update rules.",
          ]},
        ],
      },
    ],
  },
]

/* ══════════════════════════════════════════════════════════════
   HUB VIEW — card grid + search dropdown
   ══════════════════════════════════════════════════════════════ */
function renderHubCard(section) {
  return `
    <article class="rr-docs-hub-card" data-section-id="${escapeHtml(section.id)}" tabindex="0" role="button" aria-label="Open ${escapeHtml(section.title)}">
      <div class="rr-docs-hub-card-header">
        <div class="rr-docs-hub-card-icon">${ICON[section.icon] || ICON.fileText}</div>
        <h3 class="rr-docs-hub-card-title">${escapeHtml(section.title)}</h3>
      </div>
      <p class="rr-docs-hub-card-desc">${escapeHtml(section.shortDescription)}</p>
    </article>
  `
}

function renderHubDropdown(results, query) {
  if (!query || !results.length) return ""
  const items = results.slice(0, 6).map(s => `
    <li class="rr-docs-dd-item" data-section-id="${escapeHtml(s.id)}" role="option" tabindex="-1">
      <div class="rr-docs-dd-icon">${ICON[s.icon] || ICON.fileText}</div>
      <div class="rr-docs-dd-text">
        <span class="rr-docs-dd-title">${escapeHtml(s.title)}</span>
        <span class="rr-docs-dd-cat">${escapeHtml(s.category)}</span>
      </div>
      <span class="rr-docs-dd-arrow">${ICON.caretRight}</span>
    </li>
  `).join("")
  return `<ul class="rr-docs-dd" role="listbox" id="rr-docs-hub-dropdown">${items}</ul>`
}

function renderHubView(filteredSections, query) {
  const noResults = filteredSections.length === 0 && query
  const grid = noResults
    ? `<div class="rr-docs-no-results"><span>No sections match "<strong>${escapeHtml(query)}</strong>"</span></div>`
    : filteredSections.map(renderHubCard).join("")
  return `
    <div class="rr-docs-hub" id="rr-docs-hub-view">
      <div class="rr-docs-hub-hero">
        <h1 class="rr-docs-hub-title">Project documentation HUB</h1>
        <div class="rr-docs-hub-search-wrap">
          <div class="rr-docs-hub-search-field">
            <span class="rr-docs-search-icon" aria-hidden="true">${ICON.search}</span>
            <input type="text" class="rr-docs-search-input" id="rr-docs-hub-search"
              placeholder="Search documentation…" autocomplete="off" aria-label="Search documentation"
              value="${escapeHtml(query)}" />
            <button type="button" class="rr-docs-search-clear ${query ? "visible" : ""}" id="rr-docs-hub-clear" aria-label="Clear search">${ICON.close}</button>
          </div>
          <div id="rr-docs-hub-dd-host"></div>
        </div>
      </div>
      <div class="rr-docs-hub-grid-wrap">
        <div class="rr-docs-hub-grid" id="rr-docs-hub-grid">${grid}</div>
      </div>
    </div>
  `
}

/* ══════════════════════════════════════════════════════════════
   DETAIL VIEW — two-panel: left nav + article
   ══════════════════════════════════════════════════════════════ */
function renderLeftNav(activeSectionId) {
  const items = DOC_SECTIONS.map(s => {
    const isActive = s.id === activeSectionId
    const subItems = isActive
      ? s.article.map(sec => `
          <li>
            <a class="rr-docs-nav-sub" href="#${escapeHtml(sec.anchor)}" data-anchor="${escapeHtml(sec.anchor)}">${escapeHtml(sec.heading)}</a>
          </li>
        `).join("")
      : ""
    return `
      <li>
        <button class="rr-docs-nav-item ${isActive ? "active" : ""}" data-section-id="${escapeHtml(s.id)}" type="button">
          ${escapeHtml(s.title)}
        </button>
        ${subItems ? `<ul class="rr-docs-nav-sub-list">${subItems}</ul>` : ""}
      </li>
    `
  }).join("")
  return `
    <nav class="rr-docs-detail-nav" id="rr-docs-detail-nav" aria-label="Documentation sections">
      <ul class="rr-docs-nav-list">${items}</ul>
    </nav>
  `
}

function renderContentBlock(block) {
  switch (block.type) {
    case "p":
      return `<p class="rr-docs-article-p">${escapeHtml(block.text)}</p>`
    case "label":
      return `<p class="rr-docs-article-label">${escapeHtml(block.text)}</p>`
    case "ul":
      return `<ul class="rr-docs-article-ul">${block.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`
    case "code": {
      const id = `rr-cb-${Math.random().toString(36).slice(2, 8)}`
      const label = block.label || ""
      const lines = (block.lines || []).map(l => escapeHtml(l)).join("\n")
      return `
        <div class="rr-docs-code-block" id="${id}">
          ${label ? `<div class="rr-docs-code-label">${ICON.code}<span>${escapeHtml(label)}</span></div>` : ""}
          <div class="rr-docs-code-wrap">
            <pre class="rr-docs-code-pre"><code>${lines}</code></pre>
            <button type="button" class="rr-docs-code-copy" data-target="${id}" aria-label="Copy code">${ICON.copy}</button>
          </div>
        </div>
      `
    }
    default:
      return ""
  }
}

function renderHistoryDrawer(sectionId) {
  const groups = DOC_HISTORY[sectionId] || []
  const bodyHtml = groups.length
    ? groups.map(group => `
      <div class="rr-docs-history-group">
        <div class="rr-docs-history-date">${escapeHtml(group.date)}</div>
        ${group.entries.map(entry => `
          <div class="rr-docs-history-entry">
            <p class="rr-docs-history-action">
              <span class="rr-docs-history-action-type">${escapeHtml(entry.action)}</span>
              <span class="rr-docs-history-action-detail"> "${escapeHtml(entry.detail)}"</span>
            </p>
            <div class="rr-docs-history-user">
              <div class="rr-docs-history-avatar" style="background:${entry.color}">${escapeHtml(entry.initials)}</div>
              <span class="rr-docs-history-username">${escapeHtml(entry.user)}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `).join("")
    : `<div class="rr-docs-history-empty">No history recorded yet</div>`

  return `
    <aside class="rr-docs-history" id="rr-docs-history-panel">
      <div class="rr-docs-history-header">
        <h3 class="rr-docs-history-title">History</h3>
        <div class="rr-docs-history-btns">
          <button type="button" class="rr-docs-history-btn" aria-label="Filter history">${ICON.funnelSimple}</button>
          <button type="button" class="rr-docs-history-btn" id="rr-docs-history-close" aria-label="Close history">${ICON.closeSmall}</button>
        </div>
      </div>
      <div class="rr-docs-history-body">${bodyHtml}</div>
    </aside>
  `
}

function renderArticle(section) {
  const sections = section.article.map(sec => `
    <section class="rr-docs-article-section" id="${escapeHtml(sec.anchor)}">
      <h2 class="rr-docs-article-h2">${escapeHtml(sec.heading)}</h2>
      ${sec.blocks.map(renderContentBlock).join("")}
    </section>
  `).join("")

  return `
    <article class="rr-docs-article" id="rr-docs-article">
      <div class="rr-docs-article-top">
        <div class="rr-docs-article-icon">${ICON[section.icon] || ICON.fileText}</div>
        <div class="rr-docs-detail-search-wrap">
          <div class="rr-docs-hub-search-field rr-docs-detail-search-field">
            <span class="rr-docs-search-icon" aria-hidden="true">${ICON.search}</span>
            <input type="text" class="rr-docs-search-input" id="rr-docs-detail-search"
              placeholder="Search" autocomplete="off" aria-label="Search sections" />
            <button type="button" class="rr-docs-search-clear" id="rr-docs-detail-clear" aria-label="Clear">${ICON.close}</button>
          </div>
          <div id="rr-docs-detail-dd-host"></div>
        </div>
        <button type="button" class="rr-docs-history-toggle" id="rr-docs-history-toggle"
          aria-label="Toggle history" aria-pressed="false">${ICON.clockCounterClockwiseMd}</button>
      </div>
      <h1 class="rr-docs-article-h1">${escapeHtml(section.title)}</h1>
      <div class="rr-docs-article-body">
        ${sections}
      </div>
    </article>
  `
}

function renderDetailView(activeSectionId, historyOpen = false) {
  const section = DOC_SECTIONS.find(s => s.id === activeSectionId) || DOC_SECTIONS[0]
  return `
    <div class="rr-docs-detail" id="rr-docs-detail-view">
      ${renderLeftNav(section.id)}
      <div class="rr-docs-detail-divider"></div>
      ${renderArticle(section, historyOpen)}
      ${historyOpen ? renderHistoryDrawer(section.id) : ""}
    </div>
  `
}

/* ══════════════════════════════════════════════════════════════
   STYLES
   ══════════════════════════════════════════════════════════════ */
const DOCS_STYLES = `
<style>
/* ── Shared search field ──────────────────────────────────── */
.rr-docs-hub-search-field {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--rr-sem-surface, #fff);
  border: 1px solid var(--rr-sem-borderDefault);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(16,24,40,.05);
  transition: border-color .15s, box-shadow .15s;
}
.rr-docs-hub-search-field:focus-within {
  border-color: var(--rr-sem-actionPrimary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--rr-sem-actionPrimary) 15%, transparent);
}
.rr-docs-search-icon {
  position: absolute; left: 11px;
  color: var(--rr-sem-textMuted);
  pointer-events: none;
  display: flex; align-items: center;
}
.rr-docs-search-input {
  width: 100%; height: 38px;
  padding: 0 34px 0 36px;
  background: transparent; border: none; outline: none;
  font-family: var(--rr-typography-fontFamilyBase);
  font-size: var(--rr-typography-fontSizeSm, 13px);
  color: var(--rr-sem-textPrimary);
}
.rr-docs-search-input::placeholder { color: var(--rr-sem-textMuted); }
.rr-docs-search-clear {
  position: absolute; right: 8px;
  display: none; align-items: center; justify-content: center;
  width: 20px; height: 20px;
  background: none; border: none; border-radius: 50%;
  cursor: pointer; color: var(--rr-sem-textMuted); padding: 0;
  transition: background .1s, color .1s;
}
.rr-docs-search-clear.visible { display: flex; }
.rr-docs-search-clear:hover { background: var(--rr-sem-surfaceHover); color: var(--rr-sem-textPrimary); }

/* ── Dropdown ─────────────────────────────────────────────── */
.rr-docs-dd {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--rr-sem-surface, #fff);
  border: 1px solid var(--rr-sem-borderDefault);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(16,24,40,.12);
  list-style: none; margin: 0; padding: 4px;
  z-index: 100; max-height: 300px; overflow-y: auto;
}
.rr-docs-dd-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 6px; cursor: pointer;
  transition: background .1s;
}
.rr-docs-dd-item:hover, .rr-docs-dd-item:focus {
  background: var(--rr-sem-surfaceHover, #f8f9fa); outline: none;
}
.rr-docs-dd-icon {
  flex-shrink: 0; width: 28px; height: 28px;
  background: var(--rr-sem-action-primarySelection, #daebff); border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  color: var(--rr-sem-text-actionLink, #0067da);
}
.rr-docs-dd-text { flex: 1; display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.rr-docs-dd-title { font-size: 13px; font-weight: var(--rr-typography-fontWeightMedium); color: var(--rr-sem-textPrimary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rr-docs-dd-cat  { font-size: 11px; color: var(--rr-sem-textMuted); }
.rr-docs-dd-arrow { flex-shrink: 0; color: var(--rr-sem-textMuted); display: flex; align-items: center; }

/* ── Root containment — height chain so the article can scroll independently */
.rr-docs-root {
  height: 100%;
  overflow: hidden;
}
#rr-docs-view-host {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Hub view ─────────────────────────────────────────────── */
.rr-docs-hub {
  display: flex; flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: var(--rr-sem-background-pageLight, #fff);
}
.rr-docs-hub-hero {
  display: flex; flex-direction: column; align-items: center; gap: 20px;
  padding: 56px 32px;
  text-align: center;
  background: var(--rr-sem-background-primarySubtle, #f2f8ff);
  width: 100%;
}
.rr-docs-hub-title {
  margin: 0;
  font-size: var(--rr-typography-fontSizeH3, 28px); font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textPrimary); line-height: 1.2;
}
.rr-docs-hub-search-wrap { position: relative; width: 100%; max-width: 480px; }
.rr-docs-hub-grid-wrap { padding: 24px 24px 64px; flex: 1; }
.rr-docs-hub-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
@media (max-width: 800px) { .rr-docs-hub-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 520px)  { .rr-docs-hub-grid { grid-template-columns: 1fr; } .rr-docs-hub-hero { padding: 32px 16px; } .rr-docs-hub-grid-wrap { padding: 16px 16px 48px; } }

.rr-docs-hub-card {
  display: flex; flex-direction: column; gap: 8px; padding: 20px;
  background: var(--rr-sem-surface, #fff);
  border: 1px solid var(--rr-sem-borderDefault);
  border-radius: 8px; cursor: pointer;
  transition: border-color .15s, box-shadow .15s, transform .1s;
}
.rr-docs-hub-card:hover { border-color: var(--rr-sem-actionPrimary); box-shadow: 0 4px 16px rgba(16,24,40,.08); transform: translateY(-1px); }
.rr-docs-hub-card:focus-visible { outline: 2px solid var(--rr-sem-actionPrimary); outline-offset: 2px; }
.rr-docs-hub-card-header { display: flex; align-items: center; gap: 8px; }
.rr-docs-hub-card-icon {
  flex-shrink: 0; width: 40px; height: 40px;
  background: var(--rr-sem-action-primarySelection, #daebff);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--rr-sem-text-actionLink, #0067da);
}
.rr-docs-hub-card-title { margin: 0; font-size: var(--rr-typography-fontSizeMd, 16px); font-weight: 400; color: var(--rr-sem-textPrimary); line-height: 1.4; }
.rr-docs-hub-card-desc { margin: 0; font-size: var(--rr-typography-fontSizeTiny, 12px); color: var(--rr-sem-text-tertiary, #667085); line-height: 1.6; }
.rr-docs-no-results { grid-column: 1/-1; display: flex; justify-content: center; padding: 48px 0; font-size: 14px; color: var(--rr-sem-textMuted); }

/* ── Detail view ──────────────────────────────────────────── */
.rr-docs-detail {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: var(--rr-sem-background-pageLight, #fafafa);
}
.rr-docs-detail-divider {
  width: 1px; flex-shrink: 0;
  background: var(--rr-sem-borderDefault);
}

/* Left nav */
.rr-docs-detail-nav {
  width: 260px; flex-shrink: 0;
  padding: 24px 0;
  height: 100%;
  overflow-y: auto;
  background: var(--rr-sem-surface, #fff);
}
.rr-docs-nav-list, .rr-docs-nav-sub-list {
  list-style: none; margin: 0; padding: 0;
}
.rr-docs-nav-item {
  display: block; width: 100%;
  padding: 8px 20px;
  background: none; border: none; border-left: 3px solid transparent;
  text-align: left; cursor: pointer;
  font-family: var(--rr-typography-fontFamilyBase);
  font-size: 13px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textSecondary);
  transition: color .12s, background .12s, border-color .12s;
  line-height: 1.4;
}
.rr-docs-nav-item:hover { color: var(--rr-sem-textPrimary); background: var(--rr-sem-surfaceHover); }
.rr-docs-nav-item.active {
  color: var(--rr-sem-actionPrimary);
  border-left-color: var(--rr-sem-actionPrimary);
  background: color-mix(in srgb, var(--rr-sem-actionPrimary) 6%, transparent);
}
.rr-docs-nav-sub-list { padding: 2px 0 4px 0; }
.rr-docs-nav-sub {
  display: block;
  padding: 5px 20px 5px 32px;
  font-size: 12px; color: var(--rr-sem-textMuted);
  text-decoration: none; line-height: 1.4;
  transition: color .1s;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rr-docs-nav-sub:hover { color: var(--rr-sem-actionPrimary); }

/* Right article */
.rr-docs-article {
  flex: 1; min-width: 0;
  padding: 28px 48px 64px;
  overflow-y: auto;
}
.rr-docs-article-top {
  display: flex; align-items: center;
  gap: 12px; margin-bottom: 16px;
}
.rr-docs-article-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  background: var(--rr-sem-action-primarySelection, #daebff);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: var(--rr-sem-text-actionLink, #0067da);
}
.rr-docs-detail-search-wrap { position: relative; flex: 1; min-width: 0; max-width: 360px; }
.rr-docs-detail-search-field .rr-docs-search-input { height: 36px; font-size: 13px; }
.rr-docs-article-h1 {
  margin: 0 0 24px;
  font-size: 26px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textPrimary); line-height: 1.2;
}
.rr-docs-article-body { display: flex; flex-direction: column; gap: 0; }
.rr-docs-article-section { padding: 24px 0; border-bottom: 1px solid var(--rr-sem-borderDefault); }
.rr-docs-article-section:last-child { border-bottom: none; }
.rr-docs-article-h2 {
  margin: 0 0 14px;
  font-size: 18px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textPrimary); line-height: 1.3;
}
.rr-docs-article-p {
  margin: 0 0 12px; font-size: 14px; line-height: 1.7;
  color: var(--rr-sem-textSecondary);
}
.rr-docs-article-p:last-child { margin-bottom: 0; }
.rr-docs-article-label {
  margin: 14px 0 6px;
  font-size: 11px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textPrimary); letter-spacing: 0.06em;
  text-transform: uppercase;
}
.rr-docs-article-label:first-child { margin-top: 0; }
.rr-docs-article-ul {
  margin: 0 0 12px; padding-left: 0;
  list-style: none;
}
.rr-docs-article-ul li {
  position: relative; padding: 3px 0 3px 16px;
  font-size: 14px; line-height: 1.6; color: var(--rr-sem-textSecondary);
}
.rr-docs-article-ul li::before {
  content: "·"; position: absolute; left: 4px;
  color: var(--rr-sem-textMuted); font-weight: bold;
}

/* ── History toggle button (article top-bar) ────────────── */
.rr-docs-history-toggle {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; flex-shrink: 0;
  background: none;
  border: 1px solid var(--rr-sem-borderDefault);
  border-radius: 8px; cursor: pointer;
  color: var(--rr-sem-textMuted);
  transition: background .12s, color .12s, border-color .12s;
}
.rr-docs-history-toggle:hover { border-color: var(--rr-sem-actionPrimary); color: var(--rr-sem-actionPrimary); }
.rr-docs-history-toggle.active {
  background: var(--rr-sem-action-primarySelection, #daebff);
  border-color: var(--rr-sem-stroke-btnPrimary, #0067da);
  color: var(--rr-sem-text-actionLink, #0067da);
}

/* ── History drawer ─────────────────────────────────────── */
.rr-docs-history {
  width: 200px; flex-shrink: 0;
  display: flex; flex-direction: column;
  border-left: 1px solid var(--rr-sem-borderDefault);
  background: var(--rr-sem-surface, #fff);
  height: 100%; overflow: hidden;
}
.rr-docs-history-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--rr-sem-borderDefault);
  flex-shrink: 0;
}
.rr-docs-history-title {
  margin: 0;
  font-size: var(--rr-typography-fontSizeSm, 14px);
  font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textPrimary);
}
.rr-docs-history-btns { display: flex; align-items: center; gap: 2px; }
.rr-docs-history-btn {
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px;
  background: none; border: none; border-radius: 6px;
  cursor: pointer; color: var(--rr-sem-textMuted); padding: 0;
  transition: background .1s, color .1s;
}
.rr-docs-history-btn:hover { background: var(--rr-sem-surfaceHover); color: var(--rr-sem-textPrimary); }
.rr-docs-history-body { flex: 1; overflow-y: auto; }
.rr-docs-history-date {
  padding: 12px 16px 6px;
  font-size: 11px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textMuted); letter-spacing: 0.04em;
}
.rr-docs-history-entry {
  padding: 10px 16px;
  border-bottom: 1px solid var(--rr-sem-borderDefault);
  display: flex; flex-direction: column; gap: 8px;
}
.rr-docs-history-entry:last-child { border-bottom: none; }
.rr-docs-history-action {
  margin: 0;
  font-size: var(--rr-typography-fontSizeTiny, 12px); line-height: 1.5;
  color: var(--rr-sem-textSecondary);
}
.rr-docs-history-action-type { font-weight: var(--rr-typography-fontWeightMedium); color: var(--rr-sem-textPrimary); }
.rr-docs-history-action-detail { color: var(--rr-sem-text-actionLink, #0067da); }
.rr-docs-history-user { display: flex; align-items: center; gap: 6px; }
.rr-docs-history-avatar {
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: var(--rr-typography-fontWeightMedium);
  color: #3d3d3d; flex-shrink: 0; text-transform: uppercase;
}
.rr-docs-history-username {
  font-size: 12px; color: var(--rr-sem-textSecondary);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rr-docs-history-empty {
  padding: 24px 16px;
  font-size: 13px; color: var(--rr-sem-textMuted); text-align: center;
}

/* ── Code blocks ──────────────────────────────────────────── */
.rr-docs-code-block {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--rr-sem-borderDefault);
}
.rr-docs-code-label {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px;
  background: var(--rr-sem-surface, #fff);
  border-bottom: 1px solid var(--rr-sem-borderDefault);
  font-size: 12px; font-weight: var(--rr-typography-fontWeightMedium);
  color: var(--rr-sem-textSecondary);
}
.rr-docs-code-label svg { flex-shrink: 0; color: var(--rr-sem-textMuted); }
.rr-docs-code-wrap {
  position: relative;
  background: #1c2128;
}
.rr-docs-code-pre {
  margin: 0;
  padding: 16px 48px 16px 16px;
  overflow-x: auto;
  font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
  font-size: 12px; line-height: 1.7;
  color: #cdd9e5;
  white-space: pre;
}
.rr-docs-code-copy {
  position: absolute; top: 8px; right: 8px;
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px; cursor: pointer;
  color: #8b949e;
  transition: background .12s, color .12s;
  padding: 0;
}
.rr-docs-code-copy:hover { background: rgba(255,255,255,0.15); color: #cdd9e5; }
.rr-docs-code-copy.copied { color: #57ab5a; border-color: #57ab5a; }
</style>
`

/* ══════════════════════════════════════════════════════════════
   EXPORTS
   ══════════════════════════════════════════════════════════════ */
export async function renderDocsHubFlow() {
  return `
    ${DOCS_STYLES}
    <section class="rr-docs-root" data-flow="docs-hub" id="rr-docs-root">
      <div id="rr-docs-view-host"></div>
    </section>
  `
}

export function mountDocsHubFlow() {
  const root = document.querySelector('[data-flow="docs-hub"]')
  if (!root) return undefined

  const viewHost = root.querySelector("#rr-docs-view-host")

  const state = {
    view: "hub",
    activeSectionId: null,
    hubQuery: "",
    historyOpen: false,
  }

  /* ── Search helper ──────────────────────────────────────── */
  function searchSections(query) {
    const q = query.toLowerCase().trim()
    if (!q) return DOC_SECTIONS
    return DOC_SECTIONS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    )
  }

  /* ── Render ─────────────────────────────────────────────── */
  function render() {
    if (state.view === "hub") {
      viewHost.innerHTML = renderHubView(searchSections(state.hubQuery), state.hubQuery)
      attachHubEvents()
    } else {
      viewHost.innerHTML = renderDetailView(state.activeSectionId, state.historyOpen)
      attachDetailEvents()
    }
  }

  /* ── Hub events ─────────────────────────────────────────── */
  let hubSearchTimer = null

  function attachHubEvents() {
    const searchInput = document.getElementById("rr-docs-hub-search")
    const clearBtn    = document.getElementById("rr-docs-hub-clear")
    const ddHost      = document.getElementById("rr-docs-hub-dd-host")
    const grid        = document.getElementById("rr-docs-hub-grid")

    function updateHubDropdown(query) {
      if (!ddHost) return
      const results = query ? searchSections(query) : []
      ddHost.innerHTML = renderHubDropdown(results, query)
      attachDropdownEvents(ddHost, (sectionId) => {
        state.hubQuery = ""
        openDetail(sectionId)
      })
    }

    searchInput?.addEventListener("input", (e) => {
      const q = e.target.value
      state.hubQuery = q
      clearBtn?.classList.toggle("visible", q.length > 0)
      clearTimeout(hubSearchTimer)
      hubSearchTimer = setTimeout(() => {
        updateHubDropdown(q)
        if (grid) {
          const filtered = searchSections(q)
          if (filtered.length === 0 && q) {
            grid.innerHTML = `<div class="rr-docs-no-results"><span>No sections match "<strong>${escapeHtml(q)}</strong>"</span></div>`
          } else {
            grid.innerHTML = filtered.map(renderHubCard).join("")
          }
          attachGridEvents(grid)
        }
      }, 120)
    })

    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { clearHubSearch(); searchInput.blur() }
      if (e.key === "ArrowDown") { e.preventDefault(); ddHost?.querySelector(".rr-docs-dd-item")?.focus() }
    })

    clearBtn?.addEventListener("click", () => { clearHubSearch(); searchInput?.focus() })

    function clearHubSearch() {
      state.hubQuery = ""
      if (searchInput) searchInput.value = ""
      clearBtn?.classList.remove("visible")
      if (ddHost) ddHost.innerHTML = ""
      if (grid) { grid.innerHTML = DOC_SECTIONS.map(renderHubCard).join(""); attachGridEvents(grid) }
    }

    document.addEventListener("click", function hubOutside(e) {
      const wrap = root.querySelector(".rr-docs-hub-search-wrap")
      if (wrap && !wrap.contains(e.target) && ddHost) ddHost.innerHTML = ""
    })

    if (grid) attachGridEvents(grid)
  }

  function attachGridEvents(grid) {
    grid?.querySelectorAll(".rr-docs-hub-card").forEach(card => {
      card.addEventListener("click", () => openDetail(card.dataset.sectionId))
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click() } })
    })
  }

  /* ── Detail events ──────────────────────────────────────── */
  function attachDetailEvents() {
    const nav         = document.getElementById("rr-docs-detail-nav")
    const searchInput = document.getElementById("rr-docs-detail-search")
    const clearBtn    = document.getElementById("rr-docs-detail-clear")
    const ddHost      = document.getElementById("rr-docs-detail-dd-host")

    nav?.querySelectorAll(".rr-docs-nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.sectionId
        if (id) { state.activeSectionId = id; render() }
      })
    })

    nav?.querySelectorAll(".rr-docs-nav-sub").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.getElementById(a.dataset.anchor)
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    })

    let detailTimer = null
    searchInput?.addEventListener("input", (e) => {
      const q = e.target.value
      clearBtn?.classList.toggle("visible", q.length > 0)
      clearTimeout(detailTimer)
      detailTimer = setTimeout(() => {
        const results = q ? searchSections(q) : []
        if (ddHost) {
          ddHost.innerHTML = renderHubDropdown(results, q)
          attachDropdownEvents(ddHost, (sectionId) => {
            if (searchInput) searchInput.value = ""
            clearBtn?.classList.remove("visible")
            if (ddHost) ddHost.innerHTML = ""
            state.activeSectionId = sectionId
            render()
          })
        }
      }, 120)
    })

    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { if (searchInput) searchInput.value = ""; clearBtn?.classList.remove("visible"); if (ddHost) ddHost.innerHTML = "" }
      if (e.key === "ArrowDown") { e.preventDefault(); ddHost?.querySelector(".rr-docs-dd-item")?.focus() }
    })

    clearBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = ""
      clearBtn.classList.remove("visible")
      if (ddHost) ddHost.innerHTML = ""
    })

    document.addEventListener("click", (e) => {
      const wrap = root.querySelector(".rr-docs-detail-search-wrap")
      if (wrap && !wrap.contains(e.target) && ddHost) ddHost.innerHTML = ""
    })

    /* ── History toggle (article-top clock button) ─────── */
    const histToggle = document.getElementById("rr-docs-history-toggle")
    if (state.historyOpen && histToggle) {
      histToggle.classList.add("active")
      histToggle.setAttribute("aria-pressed", "true")
    }
    histToggle?.addEventListener("click", () => {
      state.historyOpen ? closeHistory() : openHistory()
    })
    document.getElementById("rr-docs-history-close")?.addEventListener("click", closeHistory)

    /* Copy button handler for code blocks */
    document.querySelectorAll(".rr-docs-code-copy").forEach(btn => {
      btn.addEventListener("click", () => {
        const blockId = btn.dataset.target
        const pre = document.getElementById(blockId)?.querySelector("code")
        if (!pre) return
        navigator.clipboard?.writeText(pre.textContent).then(() => {
          btn.classList.add("copied")
          setTimeout(() => btn.classList.remove("copied"), 1500)
        })
      })
    })

    /* Copy button handler for code blocks */
  }

  /* ── Shared dropdown events ─────────────────────────────── */
  function attachDropdownEvents(ddHost, onSelect) {
    ddHost?.querySelectorAll(".rr-docs-dd-item").forEach(item => {
      item.addEventListener("click", () => onSelect(item.dataset.sectionId))
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.click() }
        if (e.key === "ArrowDown") { e.preventDefault(); item.nextElementSibling?.focus() }
        if (e.key === "ArrowUp")   { e.preventDefault(); item.previousElementSibling?.focus() }
      })
    })
  }

  /* ── Navigation ─────────────────────────────────────────── */
  function openDetail(sectionId) {
    const section = DOC_SECTIONS.find(s => s.id === sectionId)
    if (!section) return
    state.view = "detail"
    state.activeSectionId = section.id
    render()
    setTimeout(() => document.getElementById("rr-docs-article")?.scrollTo(0, 0), 0)
  }

  /* ── History open/close ─────────────────────────────── */
  function openHistory() {
    if (state.view !== "detail") return
    if (document.getElementById("rr-docs-history-panel")) return // already open
    const detailView = document.getElementById("rr-docs-detail-view")
    if (!detailView) return
    detailView.insertAdjacentHTML("beforeend", renderHistoryDrawer(state.activeSectionId))
    document.getElementById("rr-docs-history-close")?.addEventListener("click", closeHistory)
    const toggle = document.getElementById("rr-docs-history-toggle")
    if (toggle) { toggle.classList.add("active"); toggle.setAttribute("aria-pressed", "true") }
    state.historyOpen = true
  }

  function closeHistory() {
    document.getElementById("rr-docs-history-panel")?.remove()
    const toggle = document.getElementById("rr-docs-history-toggle")
    if (toggle) { toggle.classList.remove("active"); toggle.setAttribute("aria-pressed", "false") }
    state.historyOpen = false
  }

  render()

  return function unmount() {
    clearTimeout(hubSearchTimer)
  }
}
