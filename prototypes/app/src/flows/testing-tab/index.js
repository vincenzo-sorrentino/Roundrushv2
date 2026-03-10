/* ══════════════════════════════════════════════════════════════
   Testing Tab — "Sprint" View Implementation
   Matches Figma "Desktop - 42" (471:52266)
   ══════════════════════════════════════════════════════════════ */

/* ── SVG icons (Phosphor-style) ───────────────────────────── */
const ICON = {
  search: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folderSimple: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M216,72H130.67a8,8,0,0,1-4.8-1.6L99.2,50.4A8,8,0,0,0,94.4,48.8L68.53,48H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V80A8,8,0,0,0,216,72Z" fill="currentColor"/></svg>`,
  prohibit: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><line x1="60" y1="196" x2="196" y2="60" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  flag: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40,96c32-16,64,16,96,0s64-16,96,0V48c-32,16-64-16-96,0s-64,16-96,0Z" fill="currentColor" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

// Global state for current active tab
let ACTIVE_TAB = "sprint"

const BUTTONS = [
  { id: "overview", label: "Overview" },
  { id: "sprint", label: "Sprint" },
  { id: "regressions", label: "Regressions" },
  { id: "production", label: "Production Issues" },
  { id: "stakeholders", label: "Stakeholders' Issues" },
]

/* ── Overview Tab Data (original implementation) ─────────────── */
const STATUS_CONFIG = {
  completed: { label: "Completed", bg: "#ddf7eb", text: "#0e9255" },
  attention: { label: "Needs attention", bg: "#fff3cd", text: "#b45309" },
  failing: { label: "Failing", bg: "#fbd6d6", text: "#c0362d" },
}

const TABLES = [
  {
    id: "prod",
    title: "PROD 10/02/26",
    totalProgress: "40.99%",
    rows: [
      {
        section: "DAS - Dashboard",
        passRate: "100.00%",
        totalTests: "17",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "AUT - Login",
        passRate: "47.37%",
        totalTests: "42",
        passed: "28",
        failed: "0",
        blocked: "0",
        progress: "59.48%",
        status: "attention",
      },
      {
        section: "ONB - Onboarding",
        passRate: "40.09%",
        totalTests: "38",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "47.37%",
        status: "attention",
      },
      {
        section: "TEM - Team management",
        passRate: "12.74%",
        totalTests: "53",
        passed: "2",
        failed: "3",
        blocked: "1",
        progress: "12.74%",
        status: "failing",
      },
      {
        section: "TRA - Transactions",
        passRate: "58.36%",
        totalTests: "45",
        passed: "32",
        failed: "0",
        blocked: "10",
        progress: "61.98%",
        status: "attention",
      },
    ],
  },
  {
    id: "stg",
    title: "STG 13/02/26",
    totalProgress: "97.45%",
    rows: [
      {
        section: "DAS - Dashboard",
        passRate: "100.00%",
        totalTests: "17",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "AUT - Login",
        passRate: "99.09%",
        totalTests: "42",
        passed: "41",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "ONB - Onboarding",
        passRate: "100.00%",
        totalTests: "38",
        passed: "38",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "TEM - Team management",
        passRate: "87.54%",
        totalTests: "53",
        passed: "49",
        failed: "3",
        blocked: "1",
        progress: "90.10%",
        status: "attention",
      },
      {
        section: "TRA - Transactions",
        passRate: "98.14%",
        totalTests: "45",
        passed: "43",
        failed: "0",
        blocked: "10",
        progress: "98.14%",
        status: "attention",
      },
    ],
  },
]

/* ── Sprint Tab Data ─────────────────────────────────────── */
// Track which modules are expanded
const EXPANDED_MODULES = new Set(["AUT-001"])

const SPRINT_MODULES = [
  {
    id: "AUT-001",
    title: "AUT-001 - User login",
    avatarBg: "#c7b9da",
hasBlocker: true,
    hasFlag: false,
    testCases: [
      {
        id: "TC-001",
        description: "Verify that Export action is available from Merchants list view and opens side panel correctly",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "blocked",
        uatIssue: "Export action is blocked by permissions",
        uatIssueStatus: "review",
      },
      {
        id: "TC-002",
        description: "Verify that all data type export options are available and selectable",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-003",
        description: "Verify that filter-based export options work correctly and display applied filters",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-004",
        description: "Verify that date range options are available and functional for report exports",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-005",
        description: 'Verify that custom field selection interface displays fields grouped by categories with "Select all" functionality',
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
  {
    id: "AUT-002",
    title: "AUT-002 - User authentication process",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: true,
    testCases: [],
  },
  {
    id: "AUT-003",
    title: "AUT-003 - User session management",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [],
  },
  {
    id: "AUT-004",
    title: "AUT-004 - User password recovery",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [],
  },
  {
    id: "AUT-005",
    title: "AUT-005 - 2-factor authentication",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [],
  },
]

function renderButtons() {
  return BUTTONS.map((btn) => {
    const isActive = ACTIVE_TAB === btn.id
    const classes = ["rr-testing-btn", isActive ? "is-active" : ""]
      .filter(Boolean)
      .join(" ")

    return `
      <button class="${classes}" type="button" data-tab="${escapeHtml(btn.id)}">
        ${escapeHtml(btn.label)}
      </button>
    `
  }).join("")
}

/* ── Overview Tab Rendering ───────────────────────────────── */
function renderStatusBadge(statusId) {
  const cfg = STATUS_CONFIG[statusId] || STATUS_CONFIG.attention
  return `
    <span class="rr-testing-status" style="background:${cfg.bg};color:${cfg.text}">
      ${escapeHtml(cfg.label)}
    </span>
  `
}

function renderRow(row) {
  return `
    <div class="rr-testing-row">
      <div class="rr-testing-cell rr-testing-cell--section">${escapeHtml(row.section)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.passRate)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.totalTests)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.passed)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.failed)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.blocked)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.progress)}</div>
      <div class="rr-testing-cell rr-testing-cell--status">${renderStatusBadge(row.status)}</div>
    </div>
  `
}

function renderTable(table) {
  return `
    <div class="rr-testing-table-card" data-table="${escapeHtml(table.id)}">
      <div class="rr-testing-table-title">${escapeHtml(table.title)}</div>
      <div class="rr-testing-table">
        <div class="rr-testing-row rr-testing-row--header">
          <div class="rr-testing-cell">Section</div>
          <div class="rr-testing-cell">Pass Rate</div>
          <div class="rr-testing-cell">Total Tests</div>
          <div class="rr-testing-cell">Passed</div>
          <div class="rr-testing-cell">Failed</div>
          <div class="rr-testing-cell">Blocked</div>
          <div class="rr-testing-cell">Progress</div>
          <div class="rr-testing-cell">Status</div>
        </div>
        ${table.rows.map(renderRow).join("")}
        <div class="rr-testing-row rr-testing-row--footer">
          <div class="rr-testing-footer">
            <span>Total progress</span>
            <strong>${escapeHtml(table.totalProgress)}</strong>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderOverviewTab() {
  return `
    <div class="rr-testing-tables">
      ${TABLES.map(renderTable).join("")}
    </div>
  `
}

/* ── Sprint Tab Rendering ──────────────────────────────────── */
function renderTestCaseStatus(result) {
  if (result === "blocked") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--blocked">Blocked</span>`
  } else if (result === "pass") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--pass">Pass</span>`
  } else if (result === "fail") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--fail">Fail</span>`
  }
  return `<span class="rr-sprint-tc-status">-</span>`
}

function renderTaskStatus(status) {
  if (status === "review") {
    return `<span class="rr-sprint-task-status rr-sprint-task-status--review">Ready for review</span>`
  } else if (status === "todo") {
    return `<span class="rr-sprint-task-status rr-sprint-task-status--todo">To do</span>`
  }
  return ""
}

function renderTestCase(testCase, module) {
  const avatarBg = module.avatarBg || "#c7b9da"
  
  return `
    <tr class="rr-sprint-test-case">
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--description">
        <div class="rr-sprint-tc-description">
          <p class="rr-sprint-tc-text">${escapeHtml(testCase.description)}</p>
          <span class="rr-sprint-id-badge">${escapeHtml(testCase.idBadge)}</span>
        </div>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.preConditions)}</p>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.steps)}</p>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.expectedResults)}</p>
      </td>
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--status">
        ${renderTestCaseStatus(testCase.result)}
      </td>
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--uat">
        <div class="rr-sprint-uat-content">
          <p class="rr-sprint-uat-text">${escapeHtml(testCase.uatIssue)}</p>
          ${testCase.uatIssueStatus ? renderTaskStatus(testCase.uatIssueStatus) : ""}
        </div>
      </td>
    </tr>
  `
}

function renderModule(module) {
  const isExpanded = EXPANDED_MODULES.has(module.id)
  const hasTestCases = module.testCases && module.testCases.length > 0
  
  return `
    <div class="rr-sprint-module" data-module-id="${escapeHtml(module.id)}">
      <div class="rr-sprint-module-header">
        <button class="rr-sprint-expand-btn" data-module-id="${escapeHtml(module.id)}">
          ${isExpanded ? ICON.caretDown : ICON.caretRight}
        </button>
        <span class="rr-sprint-icon">${ICON.folderSimple}</span>
        <h3 class="rr-sprint-module-title">${escapeHtml(module.title)}</h3>
      </div>
      ${isExpanded && hasTestCases ? `
        <div class="rr-sprint-module-content">
          <table class="rr-sprint-test-table">
            <thead>
              <tr class="rr-sprint-test-header">
                <th>Description</th>
                <th>Pre-conditions</th>
                <th>Steps</th>
                <th>Expected results</th>
                <th>Result</th>
                <th>UAT Issue</th>
              </tr>
            </thead>
            <tbody>
              ${module.testCases.map(tc => renderTestCase(tc, module)).join("")}
            </tbody>
          </table>
        </div>
      ` : ""}
    </div>
  `
}

function renderSprintTab() {
  return `
    <div class="rr-sprint-modules">
      ${SPRINT_MODULES.map(renderModule).join("")}
    </div>
  `
}

export function renderTestingTabFlow() {
  // Render the active tab content
  const tabContent = ACTIVE_TAB === "sprint" ? renderSprintTab() : renderOverviewTab()
  
  return `
    <section class="rr-testing" data-flow="testing-tab">
      <div class="rr-testing-controls">
        <div class="rr-testing-button-group" role="tablist">
          ${renderButtons()}
        </div>
        <div class="rr-testing-search">
          <span class="rr-testing-search-icon" aria-hidden="true">
            ${ICON.search}
          </span>
          <input class="rr-testing-search-input" type="text" placeholder="Search" />
        </div>
      </div>
      ${tabContent}
    </section>
  `
}

/* ── Event Handlers & Interactivity ───────────────────────── */
export function initTestingTab() {
  // Tab switching
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.getAttribute("data-tab")
      ACTIVE_TAB = tabId
      
      // Re-render the entire tab
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container && container.parentElement) {
        container.parentElement.innerHTML = renderTestingTabFlow()
        initTestingTab() // Re-attach event handlers
      }
    })
  })

  // Module expand/collapse
  document.querySelectorAll(".rr-sprint-expand-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const moduleId = e.currentTarget.getAttribute("data-module-id")
      
      if (EXPANDED_MODULES.has(moduleId)) {
        EXPANDED_MODULES.delete(moduleId)
      } else {
        EXPANDED_MODULES.add(moduleId)
      }
      
      // Re-render the Sprint tab
      const sprintContainer = document.querySelector(".rr-sprint-modules")
      if (sprintContainer) {
        sprintContainer.innerHTML = SPRINT_MODULES.map(renderModule).join("")
      }
    })
  })
}
