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
const EXPANDED_MODULES = new Set()

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
    testCases: [
      {
        id: "TC-201",
        description: "Verify login fails with invalid password and displays validation message",
        idBadge: "ID-9201",
        preConditions: "User account exists and is active",
        steps: "1. Open login page\n2. Enter valid email\n3. Enter invalid password\n4. Submit form",
        expectedResults: "- Login is rejected\n- Validation message is shown\n- User remains on login page",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-202",
        description: "Verify account is locked after maximum failed attempts",
        idBadge: "ID-9202",
        preConditions: "Lockout policy is configured",
        steps: "1. Try invalid password repeatedly\n2. Reach maximum attempts\n3. Try one more login",
        expectedResults: "- Account is marked as locked\n- Login is blocked\n- Lockout message is displayed",
        result: "blocked",
        uatIssue: "Lockout timer value not synced with backend policy",
        uatIssueStatus: "todo",
      },
      {
        id: "TC-203",
        description: "Verify successful login redirects user to dashboard",
        idBadge: "ID-9203",
        preConditions: "User has valid credentials",
        steps: "1. Enter valid email and password\n2. Submit form\n3. Observe redirect",
        expectedResults: "- Session is created\n- User is redirected to dashboard\n- Top navigation is visible",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
  {
    id: "AUT-003",
    title: "AUT-003 - User session management",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-301",
        description: "Verify user stays authenticated after page refresh",
        idBadge: "ID-9301",
        preConditions: "User is logged in",
        steps: "1. Open dashboard\n2. Refresh browser tab\n3. Observe session state",
        expectedResults: "- User remains logged in\n- Current page is preserved\n- No extra login prompt appears",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-302",
        description: "Verify expired session redirects user to login page",
        idBadge: "ID-9302",
        preConditions: "Session expiration is configured",
        steps: "1. Log in\n2. Wait for token expiration\n3. Trigger API action",
        expectedResults: "- Request is rejected as unauthorized\n- User is redirected to login\n- Session data is cleared",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-303",
        description: "Verify user can log out from top navigation",
        idBadge: "ID-9303",
        preConditions: "User is logged in",
        steps: "1. Click profile menu\n2. Select Logout\n3. Open protected route URL",
        expectedResults: "- User is redirected to login\n- Protected route is not accessible\n- Session cookie is removed",
        result: "fail",
        uatIssue: "Logout does not clear remember-me cookie in some browsers",
        uatIssueStatus: "review",
      },
    ],
  },
  {
    id: "AUT-004",
    title: "AUT-004 - User password recovery",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-401",
        description: "Verify reset password email is sent for registered account",
        idBadge: "ID-9401",
        preConditions: "Email service is available",
        steps: "1. Open forgot password\n2. Enter registered email\n3. Submit form",
        expectedResults: "- Success confirmation is shown\n- Reset email is sent\n- No sensitive user info is exposed",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-402",
        description: "Verify reset link expires after configured time window",
        idBadge: "ID-9402",
        preConditions: "Reset token TTL is configured",
        steps: "1. Request password reset\n2. Wait until link expires\n3. Open reset link",
        expectedResults: "- Expired link page is displayed\n- User is asked to request new link\n- Password is not changed",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-403",
        description: "Verify password strength validation appears on reset form",
        idBadge: "ID-9403",
        preConditions: "User has valid reset token",
        steps: "1. Open reset form\n2. Enter weak password\n3. Submit form",
        expectedResults: "- Validation feedback appears\n- Weak password is rejected\n- Form remains editable",
        result: "blocked",
        uatIssue: "Strength meter does not load on Safari",
        uatIssueStatus: "todo",
      },
    ],
  },
  {
    id: "AUT-005",
    title: "AUT-005 - 2-factor authentication",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-501",
        description: "Verify OTP input accepts valid 6-digit code",
        idBadge: "ID-9501",
        preConditions: "2FA is enabled for the user",
        steps: "1. Login with valid credentials\n2. Enter valid OTP\n3. Submit verification",
        expectedResults: "- OTP is accepted\n- Login completes successfully\n- User lands on dashboard",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-502",
        description: "Verify invalid OTP displays error and keeps user on challenge screen",
        idBadge: "ID-9502",
        preConditions: "2FA challenge screen is displayed",
        steps: "1. Enter invalid OTP\n2. Submit verification\n3. Observe error state",
        expectedResults: "- OTP is rejected\n- Error message is visible\n- Retry remains available",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-503",
        description: "Verify backup code can be used when OTP device is unavailable",
        idBadge: "ID-9503",
        preConditions: "User has generated backup codes",
        steps: "1. Select backup code option\n2. Enter unused backup code\n3. Submit verification",
        expectedResults: "- Backup code is accepted\n- User is authenticated\n- Used backup code cannot be reused",
        result: "fail",
        uatIssue: "Used backup codes remain valid after successful login",
        uatIssueStatus: "review",
      },
      {
        id: "TC-504",
        description: "Verify resend OTP action is rate limited",
        idBadge: "ID-9504",
        preConditions: "User is on OTP challenge screen",
        steps: "1. Click Resend OTP repeatedly\n2. Observe button and response\n3. Check cooldown timer",
        expectedResults: "- Resend is throttled\n- Cooldown message is shown\n- New OTP is issued after cooldown",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
]

/* ══════════════════════════════════════════════════════════════
   Regressions Tab
   Matches Figma "Desktop - 43" (471:52909)
   ══════════════════════════════════════════════════════════════ */
let REGRESSIONS_DONE_COLLAPSED = false

/* ══════════════════════════════════════════════════════════════
   Production Issues Tab
   Matches Figma "Desktop - 44" (471:54619)
   ══════════════════════════════════════════════════════════════ */
let PRODUCTION_DONE_COLLAPSED = false

const REG_AVATAR = {
  kate:    { url: "http://localhost:3845/assets/2f1190870d753151f58657595136f67c584b5c8c.png", bg: "#c7b9da" },
  kate2:   { url: "http://localhost:3845/assets/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", bg: "#dbc0dd" },
  orlando: { url: "http://localhost:3845/assets/555cb3735701db8d4318f0d93edd1f4b64493b37.png", bg: "#cfc3a7" },
  lana:    { url: "http://localhost:3845/assets/d688ab8bff2aebfc3cab587865468c4713ecad78.png", bg: "#d4b5ad" },
  phoenix: { url: "http://localhost:3845/assets/2780e16db1a4a364d3d872737f7fe9563d7abb29.png", bg: "#aa9c75" },
  candice: { url: "http://localhost:3845/assets/504bc691102d8a6217d1fc1f8e79a810b1842a0d.png", bg: "#a2a8cd" },
  demi:    { url: "http://localhost:3845/assets/c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png", bg: "#bea887" },
  drew:    { url: "http://localhost:3845/assets/2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png", bg: "#d1dfc3" },
}

const REGRESSION_ROWS = [
  { scope: "FE",    issue: "Document version mismatch.",               issueSub: "DEV | 200 KB file validation error.",         priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.kate2],                                    statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Document access denied.",                  issueSub: "DEV | 200 KB file format not supported.",     priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.orlando],                                  statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "Document upload failed.",                  issueSub: "PROD | 200 KB file exceeds allowed size.",    priority: "high",   date: "08/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "Document missing metadata.",               issueSub: "PROD | 200 KB file upload timeout.",          priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "FE",    issue: "Document format error.",                   issueSub: "STG | 200 KB file not processing correctly.", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "BE",    issue: "Document corrupted.",                      issueSub: "",                                            priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.kate2, REG_AVATAR.orlando],                statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Document missing.",                        issueSub: "",                                            priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Document upload issue.",                   issueSub: "",                                            priority: "medium", date: "08/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "error",      statusProd: "todo"   },
  { scope: "BE&FE", issue: "Document not accessible.",                 issueSub: "",                                            priority: "low",    date: "13/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "todo",       statusProd: "todo"   },
  { scope: "BE&FE", issue: "Issue with file upload for the document.", issueSub: "",                                            priority: "low",    date: "08/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew], statusStaging: "todo",       statusProd: "todo"   },
]

const REGRESSION_DONE_ROWS = [
  { scope: "Devops", issue: "Payment Processing Failure", issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { scope: "FE",     issue: "Delayed Payment Processing", issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew],  statusStaging: "done", statusProd: "done" },
]

const PRODUCTION_ROWS = [
  { scope: "FE",    issue: "Authentication token expired on refresh.",    issueSub: "", priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.kate2],                                    statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "User session ends unexpectedly mid-flow.",    issueSub: "", priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.orlando],                                  statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "API rate limiter blocking valid requests.",   issueSub: "", priority: "high",   date: "08/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "Payment gateway timeout on high load.",       issueSub: "", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "FE",    issue: "Dashboard widget fails to render on Safari.", issueSub: "", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "BE",    issue: "Push notifications not delivered to iOS.",    issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.kate2, REG_AVATAR.orlando],                statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Export report hangs on large datasets.",      issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Search index out of sync after data import.", issueSub: "", priority: "medium", date: "08/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "error",      statusProd: "todo"   },
  { scope: "BE&FE", issue: "Role permissions not enforced on API level.", issueSub: "", priority: "low",    date: "13/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "todo",       statusProd: "todo"   },
  { scope: "BE&FE", issue: "Data sync delay between staging and prod.",   issueSub: "", priority: "low",    date: "08/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew], statusStaging: "todo",       statusProd: "todo"   },
]

const PRODUCTION_DONE_ROWS = [
  { scope: "Devops", issue: "Login redirect loop on mobile devices.",   issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { scope: "FE",     issue: "Account creation email not delivered.",    issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew],  statusStaging: "done", statusProd: "done" },
]

/* ── Regressions Render Helpers ──────────────────────────────── */
const REG_PRIORITY_ICONS = {
  urgent: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,192 128,112 208,192" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,128 128,48 208,128" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  high:   `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,172 128,92 208,172" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  medium: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="40" y1="100" x2="216" y2="100" stroke="#f79009" stroke-width="20" stroke-linecap="round"/><line x1="40" y1="156" x2="216" y2="156" stroke="#f79009" stroke-width="20" stroke-linecap="round"/></svg>`,
  low:    `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,84 128,164 208,84" stroke="#0e9255" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

const REG_PRIORITY_LABELS = { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" }

const REG_GITHUB_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`

const REG_STATUS_CFG = {
  merged:     { label: "Merged",           bg: "#fbc6cd", color: "#d13245" },
  review:     { label: "Ready for review", bg: "#eee3f6", color: "#9b5bce" },
  inprogress: { label: "In progress",      bg: "#daebff", color: "#0067da" },
  todo:       { label: "To do",            bg: "#e0e2e7", color: "#3d4350" },
  error:      { label: "Error",            bg: "#fcdad7", color: "#c0362d" },
  done:       { label: "Done",             bg: "#ddf7eb", color: "#0e9255" },
}

const REG_SCOPE_CFG = {
  "FE":    { bg: "#fef4e6", color: "#f79009" },
  "BE":    { bg: "#e0e2e7", color: "#3d4350" },
  "BE&FE": { bg: "#e0e2e7", color: "#3d4350" },
  "Devops":{ bg: "#eee3f6", color: "#9b5bce" },
}

function renderRegScope(scope) {
  const cfg = REG_SCOPE_CFG[scope] || REG_SCOPE_CFG["FE"]
  return `<span class="rr-reg-scope" style="background:${cfg.bg};color:${cfg.color}">${escapeHtml(scope)}</span>`
}

function renderRegStatus(key) {
  const cfg = REG_STATUS_CFG[key] || REG_STATUS_CFG.todo
  return `<span class="rr-reg-status" style="background:${cfg.bg};color:${cfg.color}">${escapeHtml(cfg.label)}</span>`
}

function renderRegPriority(key) {
  return `<span class="rr-reg-priority">${REG_PRIORITY_ICONS[key] || ""}${escapeHtml(REG_PRIORITY_LABELS[key] || key)}</span>`
}

function renderRegAvatarGroup(assignees) {
  return `<div class="rr-reg-avatar-group">${
    assignees.map(av =>
      `<div class="rr-reg-avatar" style="background:${av.bg}"><img src="${av.url}" alt="" onerror="this.style.display='none'"/></div>`
    ).join("")
  }</div>`
}

function renderRegTableHeader() {
  const sortIcon = `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="24" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  return `
    <div class="rr-reg-row rr-reg-row--header">
      <div class="rr-reg-cell rr-reg-cell--scope">Scope</div>
      <div class="rr-reg-cell rr-reg-cell--issue">Issue</div>
      <div class="rr-reg-cell rr-reg-cell--priority">Priority ${sortIcon}</div>
      <div class="rr-reg-cell rr-reg-cell--date">Date</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Assignee</div>
      <div class="rr-reg-cell rr-reg-cell--pr">PR Link</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Staging</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Production</div>
    </div>`
}

function renderRegRow(row) {
  return `
    <div class="rr-reg-row">
      <div class="rr-reg-cell rr-reg-cell--scope">${renderRegScope(row.scope)}</div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell rr-reg-cell--date">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup(row.assignees)}</div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderRegressionsTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = REGRESSIONS_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderRegTableHeader()}
        ${REGRESSION_ROWS.map(renderRegRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-reg-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!REGRESSIONS_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderRegTableHeader()}
          ${REGRESSION_DONE_ROWS.map(renderRegRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

function renderProductionTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = PRODUCTION_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderRegTableHeader()}
        ${PRODUCTION_ROWS.map(renderRegRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-prod-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!PRODUCTION_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderRegTableHeader()}
          ${PRODUCTION_DONE_ROWS.map(renderRegRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

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
  const tabContent =
    ACTIVE_TAB === "sprint"       ? renderSprintTab() :
    ACTIVE_TAB === "regressions"  ? renderRegressionsTab() :
    ACTIVE_TAB === "production"   ? renderProductionTab() :
    renderOverviewTab()
  
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

function bindSprintModuleToggles() {
  document.querySelectorAll(".rr-sprint-expand-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const moduleId = e.currentTarget.getAttribute("data-module-id")

      if (EXPANDED_MODULES.has(moduleId)) {
        EXPANDED_MODULES.delete(moduleId)
      } else {
        EXPANDED_MODULES.add(moduleId)
      }

      // Re-render only Sprint modules, then rebind toggle handlers for new buttons.
      const sprintContainer = document.querySelector(".rr-sprint-modules")
      if (sprintContainer) {
        sprintContainer.innerHTML = SPRINT_MODULES.map(renderModule).join("")
        bindSprintModuleToggles()
      }
    })
  })
}

/* ── Event Handlers & Interactivity ───────────────────────── */
export function initTestingTab() {
  // Tab switching
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.getAttribute("data-tab")
      ACTIVE_TAB = tabId

      // Re-render only the testing section, leaving the tab header intact
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab() // Re-attach event handlers
      }
    })
  })

  if (ACTIVE_TAB === "sprint") {
    bindSprintModuleToggles()
  }

  // Regressions – Done section toggle
  document.querySelectorAll("[data-action='toggle-reg-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      REGRESSIONS_DONE_COLLAPSED = !REGRESSIONS_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Production Issues – Done section toggle
  document.querySelectorAll("[data-action='toggle-prod-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      PRODUCTION_DONE_COLLAPSED = !PRODUCTION_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })
}
