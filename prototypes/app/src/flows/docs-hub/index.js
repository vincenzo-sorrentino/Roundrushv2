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
  "integration-api": [
    { date: "07/03/26", entries: [
      { action: "Added", detail: "Section 7 — Pagination contract: cursor-based strategy mandated for all list endpoints returning > 100 items", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "03/03/26", entries: [
      { action: "Added", detail: "Section 6 — Contract-first: OpenAPI 3.1 spec must be reviewed and approved before implementation starts", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
      { action: "Changed", detail: "Error response schema updated — detail and code fields are now mandatory in every 4xx and 5xx response", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
    ]},
    { date: "19/02/26", entries: [
      { action: "Changed", detail: "Auth token expiry reduced from 60 min to 30 min following security audit finding #SA-14", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
    { date: "04/02/26", entries: [
      { action: "Deprecated", detail: "v1 webhook payload format deprecated — consumers must migrate to v2 schema by end of Q2 2026", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
    ]},
  ],
  "architecture-principles": [
    { date: "07/03/26", entries: [
      { action: "Changed", detail: "ADR acceptance rule now requires two senior engineer approvals to reduce single-reviewer risk", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
    { date: "21/02/26", entries: [
      { action: "Added", detail: "Section 5 — Data ownership model: domain-specific write permissions with read-optimised denormalised projections", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
      { action: "Added", detail: "Section 6 — Bounded context map documenting service ownership boundaries and change authority per domain", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "08/02/26", entries: [
      { action: "Changed", detail: "Dependency direction tightened — domain services may no longer import directly from infrastructure adapters", user: "Andi Lane", initials: "AL", color: "#d4c4ab" },
    ]},
    { date: "20/01/26", entries: [
      { action: "Removed", detail: "Event sourcing removed as a mandatory constraint in AP-03 — retained as a recommended pattern only", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
  ],
  "development-standards": [
    { date: "09/03/26", entries: [
      { action: "Changed", detail: "Default exports banned from shared utilities — improves IDE auto-import traceability across the codebase", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "04/03/26", entries: [
      { action: "Added", detail: "TypeScript strict mode: no implicit any, no @ts-ignore without an inline justification comment", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
      { action: "Added", detail: "Naming convention appendix: PascalCase for components, camelCase for utils, SCREAMING_SNAKE_CASE for constants", user: "Andi Lane", initials: "AL", color: "#d4c4ab" },
    ]},
    { date: "17/02/26", entries: [
      { action: "Changed", detail: "PR review rule: mandatory local testing now required for all user-facing feature changes before requesting review", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
    ]},
    { date: "02/02/26", entries: [
      { action: "Removed", detail: "Flow types removed from approved typing tools — TypeScript only going forward in all new and migrated files", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
    ]},
  ],
  "git-commit-policies": [
    { date: "06/03/26", entries: [
      { action: "Changed", detail: "Branch age reduced from 4 weeks to 2 weeks without an open PR before an automated deletion warning fires", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
    ]},
    { date: "24/02/26", entries: [
      { action: "Added", detail: "Squash-merge mandated as the only permitted strategy for feature branches to maintain a linear history", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
      { action: "Changed", detail: "Conventional commit scope validation added to CI — commits without a recognised scope fail the lint check", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "10/02/26", entries: [
      { action: "Added", detail: "Protected branch ruleset for main: no force-push, no deletion, required status checks must pass before merge", user: "Andi Lane", initials: "AL", color: "#d4c4ab" },
    ]},
  ],
  "documentation-standards": [
    { date: "02/03/26", entries: [
      { action: "Changed", detail: "Stale doc threshold reduced from 180 days to 90 days before flagged as outdated in the governance report", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
      { action: "Added", detail: "'Owner' and 'Last reviewed' metadata fields now mandatory in every spec file header", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
    ]},
    { date: "12/02/26", entries: [
      { action: "Added", detail: "CI validator (validate-spec-links.mjs) to enforce required sections and internal link integrity on every push", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "28/01/26", entries: [
      { action: "Renamed", detail: "Section 'Style guide' renamed to 'Formatting standards' to better reflect prose and structural scope", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
    ]},
  ],
  "testing-obligations": [
    { date: "08/03/26", entries: [
      { action: "Changed", detail: "E2E environment updated — all assertions now target deployed staging, not local dev servers", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
    ]},
    { date: "26/02/26", entries: [
      { action: "Added", detail: "Visual regression via Chromatic approved for design system components only, not application flows", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
      { action: "Changed", detail: "Mutation score threshold introduced at 60% — applies to domain logic modules starting Q2 2026", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
    { date: "11/02/26", entries: [
      { action: "Added", detail: "Test co-location rule: unit tests must reside in the same package as the module under test", user: "Andi Lane", initials: "AL", color: "#d4c4ab" },
    ]},
    { date: "27/01/26", entries: [
      { action: "Removed", detail: "Jest snapshot tests removed from approved suite types — replaced with assertion-based component tests", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
    ]},
  ],
  "security-constraints": [
    { date: "07/03/26", entries: [
      { action: "Changed", detail: "Critical vulnerability patch window tightened from 48 h to 24 h for any CVSS score >= 9.0", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
      { action: "Added", detail: "SC-09 — Mandatory SBOM (Software Bill of Materials) generation on every production release build", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
    { date: "20/02/26", entries: [
      { action: "Added", detail: "Rate limiting: 5 failed logins per 15-minute window per IP before temporary lockout is enforced", user: "Olivia Rhye", initials: "OR", color: "#a9c0d4" },
    ]},
    { date: "05/02/26", entries: [
      { action: "Changed", detail: "Secret scanning extended — pre-commit hooks now required in addition to CI-level scanning", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
    ]},
  ],
  "release-policies": [
    { date: "05/03/26", entries: [
      { action: "Added", detail: "Pre-production promotion gate made mandatory between staging and production for all release candidates", user: "Orlando Diggs", initials: "OD", color: "#c8b89a" },
      { action: "Changed", detail: "48-hour freeze window now required before any planned production deployment — no exceptions without VP sign-off", user: "Andi Lane", initials: "AL", color: "#d4c4ab" },
    ]},
    { date: "18/02/26", entries: [
      { action: "Changed", detail: "Rollback decision window reduced from 30 minutes to 15 minutes after incident confirmed by on-call engineer", user: "Lana Steiner", initials: "LS", color: "#c9b0b0" },
    ]},
    { date: "30/01/26", entries: [
      { action: "Added", detail: "Post-release smoke test checklist: 5 critical user flows must pass within 10 minutes of go-live", user: "Candice Wu", initials: "CW", color: "#a7a9cd" },
      { action: "Removed", detail: "Manual approval gate for hotfixes removed — replaced by engineer-owned decision with escalation protocol", user: "Drew Cano", initials: "DC", color: "#abd4c4" },
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
        anchor: "al-01", heading: "AL-01 — Production code implemented",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All module production code must be implemented, peer-reviewed, and merged into the integration branch before the module is evaluated for compliance." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["No feature flags masking incomplete work at evaluation time.", "Code must pass the CI lint and build pipeline with no errors.", "Breaking changes to shared interfaces require a migration path documented in the PR."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Closed and merged PR(s) linked to the module task.", "Green CI build on the integration branch."] },
          { type: "label", text: "Failure Condition" },
          { type: "p", text: "Module has open or draft PRs, or CI is red on the integration branch." },
        ],
      },
      {
        anchor: "al-02", heading: "AL-02 — Unit & integration tests pass",
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
        anchor: "al-03", heading: "AL-03 — Documentation updated",
        blocks: [
          { type: "label", text: "Requirement" },
          { type: "p", text: "All documentation affected by the module changes must be updated prior to compliance review. This includes requirements files, inline code comments, component docs, and any technical decision records." },
          { type: "label", text: "Standards" },
          { type: "ul", items: ["Requirements files must reflect the final implemented scope — no gaps between spec and code.", "Public APIs and exported functions must have updated JSDoc or equivalent.", "ADRs must be filed for any architectural decision made during delivery."] },
          { type: "label", text: "Evidence Required" },
          { type: "ul", items: ["Updated requirement .md file(s) linked in the PR.", "Confirmation commit touching docs in the same PR or a follow-up within the same sprint."] },
        ],
      },
      {
        anchor: "al-04", heading: "AL-04 — End-to-end tests implemented and passed",
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
        anchor: "al-05", heading: "AL-05 — Dependency map updated",
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
        anchor: "al-06", heading: "AL-06 — Dependency-based regression tests pass",
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
        anchor: "al-07", heading: "AL-07 — Required manual suites completed",
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
          { type: "p", text: "The Acceptance Laws table in each module's requirements file reflects the live status and is the single source of truth for compliance state." },
        ],
      },
    ],
  },

  /* ── 2. Integration (API) ───────────────────────────────── */
  {
    id: "integration-api",
    title: "Integration (API)",
    icon: "gitFork",
    category: "Engineering",
    shortDescription: "API contracts, versioning strategy, and integration standards across internal and external services.",
    tags: ["api", "rest", "integration", "versioning", "contracts"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the integration standards that govern how modules communicate across internal service boundaries and how external APIs are designed, versioned, and maintained." },
          { type: "p", text: "Consistency in API shape, authentication, and error responses is critical for maintainability as the number of integrations grows. These standards apply to all HTTP APIs, event-driven contracts, and SDK interfaces produced by the platform." },
        ],
      },
      {
        anchor: "api-design", heading: "2. API design principles",
        blocks: [
          { type: "p", text: "All APIs must follow REST conventions with predictable resource-based URLs. Endpoints are nouns, HTTP verbs describe the action, and plural resource names are used consistently." },
          { type: "ul", items: ["Use nouns for resources: /users, /modules, /sprints.", "Use standard HTTP verbs: GET, POST, PUT, PATCH, DELETE.", "Return appropriate HTTP status codes — never 200 for errors.", "Avoid verbs in URLs: prefer POST /sessions over POST /login."] },
        ],
      },
      {
        anchor: "versioning", heading: "3. Versioning strategy",
        blocks: [
          { type: "label", text: "Approach" },
          { type: "p", text: "APIs are versioned using URI path versioning: /api/v1/, /api/v2/. Semver is used for the public SDK — breaking changes require a major version bump." },
          { type: "label", text: "Backward compatibility rules" },
          { type: "ul", items: ["Adding new optional fields to a response is non-breaking.", "Removing or renaming fields requires a new major version.", "Changing a field type is always a breaking change.", "Deprecation notices must be communicated at least one sprint before removal."] },
        ],
      },
      {
        anchor: "auth", heading: "4. Authentication & authorisation",
        blocks: [
          { type: "p", text: "All API endpoints (except public health checks) must require a valid JWT bearer token in the Authorization header." },
          { type: "ul", items: ["Tokens are short-lived (1 hour) and rotated via refresh tokens.", "Permission scopes are evaluated per-request, not cached on the token.", "Service-to-service calls use dedicated service accounts with minimal scope.", "Tokens must never be logged or included in error responses."] },
        ],
      },
      {
        anchor: "error-shape", heading: "5. Error response shape",
        blocks: [
          { type: "p", text: "All error responses must conform to the following shape to enable consistent client-side handling:" },
          { type: "code", label: "Error response", lines: [
            `{`,
            `  "code": "ERR_MODULE_NOT_FOUND",`,
            `  "message": "Module could not be located.",`,
            `  "details": { "moduleId": "KAN-042" }`,
            `}`,
          ]},
          { type: "ul", items: ["Error codes are SCREAMING_SNAKE_CASE and unique across the platform.", "'message' is safe to display to end users; 'details' is for developer debugging only.", "Stack traces must never appear in API error responses."] },
        ],
      },
      {
        anchor: "contracts", heading: "6. Contract-first development",
        blocks: [
          { type: "p", text: "All new APIs must have an OpenAPI 3.1 spec committed before implementation begins. The spec is the contract and the source of truth for generated client SDKs and mocks." },
          { type: "ul", items: ["Specs live in /api/specs/ alongside the service code.", "Breaking spec changes require a PR review from at least one consumer team.", "Consumer-driven contract tests are run in CI against all active integrations."] },
        ],
      },
    ],
  },

  /* ── 3. Architecture principles ─────────────────────────── */
  {
    id: "architecture-principles",
    title: "Architecture principles",
    icon: "gitBranch",
    category: "Engineering",
    shortDescription: "Core structural decisions and system design rules that govern how the platform is built and extended.",
    tags: ["architecture", "adr", "design", "system", "patterns"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document records the foundational architectural decisions that shape the RoundRush platform. These are not preferences — they are the constraints within which all modules are designed and extended." },
          { type: "p", text: "When a new feature requires revisiting a principle, an ADR must be filed before implementation begins." },
        ],
      },
      {
        anchor: "domain-separation", heading: "2. Domain separation",
        blocks: [
          { type: "p", text: "Each business domain (Authentication, Requirements, Planning, Dependencies, Docs) is a bounded context. Modules within a domain may share internal state; modules across domains must communicate through defined interfaces only." },
          { type: "ul", items: ["Cross-domain direct database access is prohibited.", "Domain boundaries are reflected in the folder structure: src/domains/<name>/.", "Shared utilities live in src/shared/ and must have no domain-specific imports."] },
        ],
      },
      {
        anchor: "coupling", heading: "3. Module coupling policy",
        blocks: [
          { type: "label", text: "Allowed coupling" },
          { type: "ul", items: ["Module A may import from Module B if B is listed as a dependency in A's requirement file.", "Shared design system components may be imported by any module."] },
          { type: "label", text: "Prohibited coupling" },
          { type: "ul", items: ["Circular dependencies between any two modules.", "A module importing internals of another module (only the exported public API).", "Domain-crossing state sharing without an event or API contract."] },
        ],
      },
      {
        anchor: "adr-process", heading: "4. ADR process",
        blocks: [
          { type: "p", text: "An Architecture Decision Record (ADR) is required for any decision that changes a module boundary, introduces a new external dependency, adopts or deprecates a pattern, or deviates from these principles." },
          { type: "ul", items: ["ADRs are stored in requirements/_governance/decisions/.", "Format: ADR-NNNN-short-title.md with sections: Context, Decision, Consequences.", "Once accepted, ADRs are immutable — superseding decisions require a new ADR.", "All team members may propose an ADR; acceptance requires two senior engineer approvals."] },
        ],
      },
      {
        anchor: "data-ownership", heading: "5. Data ownership",
        blocks: [
          { type: "p", text: "Each piece of data is owned by exactly one domain. Only the owning domain's service may write to that data. Other domains must request changes through the owner's API." },
          { type: "ul", items: ["User profile data is owned by the Authentication domain.", "Sprint and task data is owned by the Planning domain.", "Module and requirement data is owned by the Requirements domain.", "Denormalised read models are allowed for performance but must be kept in sync via events."] },
        ],
      },
    ],
  },

  /* ── 4. Development standards ───────────────────────────── */
  {
    id: "development-standards",
    title: "Development standards",
    icon: "gear",
    category: "Engineering",
    shortDescription: "Code quality rules, linting configuration, naming conventions, and toolchain setup for the project.",
    tags: ["code-quality", "linting", "naming", "standards", "toolchain"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the coding standards, toolchain configuration, and review expectations that apply to all code contributed to the RoundRush platform. Consistent standards reduce cognitive load, simplify onboarding, and make automated quality enforcement reliable." },
        ],
      },
      {
        anchor: "code-style", heading: "2. Code style & linting",
        blocks: [
          { type: "p", text: "All JavaScript and TypeScript files are formatted by Prettier (config in .prettierrc) and linted by ESLint (config in .eslintrc.js). Both run in CI and as a pre-commit hook." },
          { type: "code", label: "ESLint disable — must include reason comment", lines: [
            `// eslint-disable-next-line @typescript-eslint/no-explicit-any`,
            `// Reason: third-party callback signature requires unknown shape`,
            `function handleCallback(payload: any) {`,
            `  processEvent(payload)`,
            `}`,
          ]},
          { type: "ul", items: ["Never disable ESLint rules with // eslint-disable without a comment explaining why.", "Prettier auto-format must be applied before every commit.", "TypeScript strict mode is enabled: no implicit any, no @ts-ignore without justification."] },
        ],
      },
      {
        anchor: "naming", heading: "3. Naming conventions",
        blocks: [
          { type: "ul", items: ["Files & folders: kebab-case (user-profile.ts, auth-domain/).", "Variables & functions: camelCase.", "Classes & types: PascalCase.", "Constants: SCREAMING_SNAKE_CASE for module-level, camelCase for function-scoped.", "CSS classes: BEM-inspired with project prefix rr- (rr-sidebar, rr-sidebar__item)."] },
        ],
      },
      {
        anchor: "imports", heading: "4. Import ordering",
        blocks: [
          { type: "p", text: "Imports are ordered by the ESLint import/order rule: node builtins → external packages → internal aliases → relative paths. Blank lines separate each group." },
          { type: "ul", items: ["Prefer named exports over default exports for utilities and components.", "Avoid barrel files (index.ts re-exporting everything) in large domains.", "Circular imports are a lint-time error."] },
        ],
      },
      {
        anchor: "review", heading: "5. Code review expectations",
        blocks: [
          { type: "p", text: "All PRs require at least one approving review before merge. Reviews are expected to cover correctness, security, performance, and alignment with these standards." },
          { type: "ul", items: ["Reviewers must test the change locally for any user-facing feature.", "Comments marked 'nit:' are optional improvements — they must not block merge.", "Comments without 'nit:' are blocking until resolved or explicitly dismissed.", "Large PRs (>500 lines changed) should be split or discussed first in a design thread."] },
        ],
      },
    ],
  },

  /* ── 5. Git & commit policies ───────────────────────────── */
  {
    id: "git-commit-policies",
    title: "Git & commit policies",
    icon: "gitFork",
    category: "Workflow",
    shortDescription: "Branching strategy, commit message format, PR process, and merge requirements for the team.",
    tags: ["git", "commits", "branching", "pr", "merge", "workflow"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the version control conventions that keep the repository history clean, auditable, and useful for automation. These rules apply to all contributors." },
        ],
      },
      {
        anchor: "branching", heading: "2. Branching strategy",
        blocks: [
          { type: "p", text: "We use a trunk-based development model. main is the single integration branch. Short-lived feature branches are created for each task and merged within one sprint." },
          { type: "ul", items: ["Branch naming: <type>/<ticket-id>-short-description (e.g. feat/KAN-042-module-detail-overlay).", "Types: feat, fix, chore, docs, refactor, test.", "Branches older than two weeks without a PR must be deleted.", "main is protected — direct pushes are blocked for all contributors including admins."] },
        ],
      },
      {
        anchor: "commits", heading: "3. Commit message format",
        blocks: [
          { type: "p", text: "We use Conventional Commits. Format: <type>(<scope>): <description>." },
          { type: "code", label: "Conventional commit examples", lines: [
            `feat(auth): add OTP verification step`,
            `fix(kanban): correct sprint boundary date calculation`,
            `docs(acceptance-laws): update AL-05 evidence requirements`,
            ``,
            `# Breaking change footer`,
            `refactor(api)!: rename /modules endpoint to /epics`,
            ``,
            `BREAKING CHANGE: all clients must update endpoint references`,
          ]},
          { type: "ul", items: ["The scope is the module or domain affected.", "Breaking changes must add BREAKING CHANGE: in the commit footer."] },
        ],
      },
      {
        anchor: "pr-process", heading: "4. PR process",
        blocks: [
          { type: "ul", items: ["Every PR must reference a ticket in its title or description.", "PRs must pass all CI checks before requesting review.", "Add relevant team members as reviewers — at minimum one peer and one domain lead.", "Squash-merge is the default merge strategy for feature branches.", "Self-merge is not permitted except for trivial documentation fixes."] },
        ],
      },
      {
        anchor: "merge-requirements", heading: "5. Merge requirements",
        blocks: [
          { type: "p", text: "A PR may be merged only when all of the following are satisfied:" },
          { type: "ul", items: ["At least one approving review from a team member.", "All CI checks green (lint, build, unit tests).", "No unresolved blocking comments.", "Branch is up to date with main (rebase required, not merge commit)."] },
        ],
      },
    ],
  },

  /* ── 6. Documentation standards ────────────────────────── */
  {
    id: "documentation-standards",
    title: "Documentation standards",
    icon: "fileText",
    category: "Governance",
    shortDescription: "How to write and maintain requirements, component docs, API references, and technical notes.",
    tags: ["docs", "writing", "requirements", "maintenance", "standards"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "Documentation is a first-class engineering deliverable at RoundRush. This document defines the hierarchy of documentation types, the required sections for each, writing style guidelines, and the maintenance and review process." },
        ],
      },
      {
        anchor: "hierarchy", heading: "2. Documentation hierarchy",
        blocks: [
          { type: "p", text: "The platform documentation follows the same hierarchy as the requirements: Epic → Module → Functionality." },
          { type: "ul", items: ["Epic .md — overview, acceptance laws aggregate, module list.", "Module .md — scope, acceptance laws, functionality list, dependency notes.", "Functionality .md — user story, acceptance criteria, edge cases, prototype reference.", "Governance docs — ADRs, conventions, workflows (in requirements/_governance/)."] },
        ],
      },
      {
        anchor: "writing-style", heading: "3. Writing style guidelines",
        blocks: [
          { type: "ul", items: ["Use present tense: 'The system displays…' not 'The system will display…'", "Write for a reader who is smart but unfamiliar with context — avoid jargon without definition.", "Acceptance criteria use Given/When/Then format.", "Keep sentences short. One idea per sentence.", "Avoid vague qualifiers: 'quickly', 'easily', 'robust'. Quantify where possible."] },
        ],
      },
      {
        anchor: "required-sections", heading: "4. Required sections by document type",
        blocks: [
          { type: "label", text: "Module document" },
          { type: "ul", items: ["## Overview — one-paragraph scope statement.", "## Acceptance Laws — AL-01 through AL-07 table.", "## Functionalities — linked list of functionality docs.", "## Dependencies — other modules this module depends on."] },
          { type: "label", text: "Functionality document" },
          { type: "ul", items: ["## Overview — user story.", "## Acceptance Criteria — Given/When/Then list.", "## Edge Cases — explicit handling of non-happy paths.", "## Prototype Reference — link to prototype flow."] },
        ],
      },
      {
        anchor: "review", heading: "5. Review & maintenance",
        blocks: [
          { type: "p", text: "Documentation changes must be reviewed alongside the code changes that motivated them. A PR that modifies behaviour without updating the relevant docs will be rejected." },
          { type: "ul", items: ["Documentation PRs require one approving review from a team member.", "Stale docs (last updated > 90 days without a review) are flagged in the weekly governance report.", "The CI validator (validate-spec-links.mjs) enforces required sections and internal link integrity on every push."] },
        ],
      },
    ],
  },

  /* ── 7. Testing obligations ─────────────────────────────── */
  {
    id: "testing-obligations",
    title: "Testing obligations",
    icon: "testTube",
    category: "Quality",
    shortDescription: "Coverage thresholds, required test types per module, frameworks, and the CI test pipeline structure.",
    tags: ["testing", "coverage", "e2e", "unit", "integration", "qa"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document specifies the types of tests required per module, coverage thresholds, approved testing frameworks, and how all tests integrate into the CI pipeline." },
          { type: "p", text: "Testing is not a box to check. Every test must be designed to catch a specific failure mode and must be readable enough that a new contributor can understand its intent within two minutes." },
        ],
      },
      {
        anchor: "coverage", heading: "2. Coverage thresholds",
        blocks: [
          { type: "ul", items: ["Statement coverage: >= 80% per module, >= 75% project-wide.", "Branch coverage: >= 70% per module.", "Critical paths (authentication, payment, data mutation) require >= 90% statement coverage.", "Coverage reports are generated per-module in CI and published as a PR comment."] },
        ],
      },
      {
        anchor: "test-types", heading: "3. Required test types",
        blocks: [
          { type: "label", text: "Unit tests — all modules" },
          { type: "ul", items: ["Cover all exported functions and classes.", "Pure logic isolated from I/O. Use mocks for all external dependencies.", "Run in < 30 seconds total."] },
          { type: "label", text: "Integration tests — modules with external dependencies" },
          { type: "ul", items: ["Test the full interaction with a real database, queue, or external service (use containers in CI).", "Cover all service boundaries defined in the dependency map."] },
          { type: "label", text: "End-to-end tests — user-facing modules" },
          { type: "ul", items: ["Cover every acceptance criterion that involves a user interaction.", "Run against the deployed staging environment.", "Assertions on visible UI state, not internal implementation."] },
          { type: "label", text: "Regression tests — dependency-driven" },
          { type: "ul", items: ["Automatically scoped by the dependency map for each module change.", "Must achieve 100% pass rate — no exemptions."] },
        ],
      },
      {
        anchor: "frameworks", heading: "4. Approved frameworks",
        blocks: [
          { type: "ul", items: ["Unit & integration: Vitest (preferred) or Jest.", "E2E: Playwright (preferred). Cypress is grandfathered for existing suites.", "Contract testing: Pact.", "Visual regression: Chromatic (design system only)."] },
        ],
      },
      {
        anchor: "ci-pipeline", heading: "5. CI pipeline structure",
        blocks: [
          { type: "p", text: "Tests run in the following order to fail fast: lint → build → unit → integration → E2E → regression. Each stage must pass before the next begins." },
          { type: "ul", items: ["Unit and integration tests run on all PRs.", "E2E tests run only on PRs targeting main or on a scheduled nightly run.", "Regression tests run when the dependency map indicates impact.", "Test results are archived as CI artifacts for 30 days."] },
        ],
      },
    ],
  },

  /* ── 8. Security constraints ────────────────────────────── */
  {
    id: "security-constraints",
    title: "Security constraints",
    icon: "lockSimple",
    category: "Governance",
    shortDescription: "Authentication requirements, data handling rules, threat model guidelines, and OWASP compliance.",
    tags: ["security", "auth", "owasp", "privacy", "compliance"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "Security is a non-negotiable constraint on all modules. This document defines the minimum security requirements derived from the OWASP Top 10 and our internal threat model. Every engineer is responsible for understanding and applying these constraints." },
        ],
      },
      {
        anchor: "authentication", heading: "2. Authentication requirements",
        blocks: [
          { type: "ul", items: ["All non-public endpoints must validate a JWT with HS256 or RS256.", "Tokens expire in 60 minutes; refresh tokens expire in 30 days.", "Failed login attempts must be rate-limited: five attempts per 15-minute window per IP.", "Multi-factor authentication is mandatory for accounts with admin or deployment permissions.", "Password reset tokens must be single-use and expire within 30 minutes."] },
        ],
      },
      {
        anchor: "input-validation", heading: "3. Input validation",
        blocks: [
          { type: "p", text: "All data entering the system at an external boundary (API endpoints, webhooks, file uploads) must be validated and sanitised before use." },
          { type: "ul", items: ["Use schema validation (Zod or Joi) at every API boundary — never trust client input.", "Parameterised queries only — string interpolation into SQL or NoSQL queries is prohibited.", "HTML output must be escaped — use the platform's XSS-safe rendering utilities.", "File uploads must validate MIME type server-side, not from the client-supplied Content-Type."] },
        ],
      },
      {
        anchor: "secrets", heading: "4. Secrets management",
        blocks: [
          { type: "ul", items: ["No secrets in source code, commit history, or environment variable files committed to the repo.", "Use the platform secrets manager (Vault or equivalent) for all sensitive values.", "Rotate secrets immediately if accidental exposure is suspected.", "Log access to secrets — unexplained access patterns must trigger an incident review."] },
        ],
      },
      {
        anchor: "vulnerability-reporting", heading: "5. Vulnerability reporting",
        blocks: [
          { type: "p", text: "Security vulnerabilities found in the platform must be reported immediately to the security lead via the private security channel — do not open a public issue." },
          { type: "ul", items: ["Critical vulnerabilities (CVSS >= 9.0) must be patched and deployed within 24 hours.", "High severity (CVSS 7.0–8.9) must be resolved within one week.", "All resolved vulnerabilities must have a post-incident writeup."] },
        ],
      },
    ],
  },

  /* ── 9. Release policies ────────────────────────────────── */
  {
    id: "release-policies",
    title: "Release policies",
    icon: "rocket",
    category: "Workflow",
    shortDescription: "Deployment process, release gates, version numbering, and rollback procedures for all environments.",
    tags: ["release", "deployment", "versioning", "rollback", "pipeline"],
    article: [
      {
        anchor: "purpose", heading: "1. Purpose",
        blocks: [
          { type: "p", text: "This document defines the end-to-end process for deploying software from a merged main branch to production. It covers release gates, versioning conventions, feature flag lifecycle, and the rollback procedure." },
        ],
      },
      {
        anchor: "pipeline", heading: "2. Deployment pipeline",
        blocks: [
          { type: "p", text: "Deployments follow a promotion model: main → Staging → Pre-production → Production. Each promotion is triggered manually after the previous environment is verified." },
          { type: "ul", items: ["Staging is auto-deployed on every merge to main.", "Pre-production is deployed on-demand for release candidate verification.", "Production deployment requires explicit approval from the release owner.", "All deployments are immutable artefacts — no patching deployed containers."] },
        ],
      },
      {
        anchor: "release-gates", heading: "3. Release gates",
        blocks: [
          { type: "p", text: "A release candidate may not be promoted to production unless all of the following gates are satisfied:" },
          { type: "ul", items: ["All seven Acceptance Laws are in Pass status for every module in the release.", "Pre-production smoke tests green.", "No open P1 or P2 incidents in the system.", "Release notes prepared and reviewed.", "On-call engineer confirmed and available for the deployment window."] },
        ],
      },
      {
        anchor: "versioning", heading: "4. Versioning rules",
        blocks: [
          { type: "p", text: "Platform versions follow Semantic Versioning (semver): MAJOR.MINOR.PATCH." },
          { type: "ul", items: ["MAJOR: breaking changes to any public API or significant UX overhaul.", "MINOR: new features that are backward-compatible.", "PATCH: bug fixes, performance improvements, and documentation updates.", "Release versions are tagged in git: v1.4.2.", "Pre-release candidates: v1.4.2-rc.1."] },
        ],
      },
      {
        anchor: "rollback", heading: "5. Rollback procedure",
        blocks: [
          { type: "p", text: "If a production incident is caused by a release, the rollback decision must be made within 15 minutes of incident confirmation." },
          { type: "ul", items: ["Rollback is performed by promoting the previous verified production artefact — not by reverting the code.", "Database migrations that are not backward-compatible block immediate rollback; a fast-forward fix must be applied instead.", "Post-rollback, a mandatory post-incident review must be completed within 48 hours.", "The root cause must be fixed and verified in staging before the next production deployment."] },
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
