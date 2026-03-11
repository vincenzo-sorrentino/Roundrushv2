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
  close: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><rect x="40" y="88" width="120" height="144" rx="8" stroke="currentColor" stroke-width="16"/><path d="M216,88V48a8,8,0,0,0-8-8H96" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  chatCircle: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><path d="M180,152c0,20-27.4,36-60,36c-8.2,0-16.2-1-24-2.8l-26.9,14.3c-1.5.8-3-1.4-2-3.1l10.3-24.8c-9-9-14.4-21-14.4-35.6c0-20,27.4-36,60-36s60,16,60,36Z" fill="currentColor"/></svg>`,
  chatCircleSimple: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><path d="M80 176l16-30a56 56 0 1 1 24 20Z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  link: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M136.41,200.86a59.79,59.79,0,0,1-84.72-84.72l24-24a59.79,59.79,0,0,1,84.72,0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M119.59,55.14a59.79,59.79,0,0,1,84.72,84.72l-24,24a59.79,59.79,0,0,1-84.72,0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  linkSimple: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M136 80h32a48 48 0 0 1 0 96h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M120 176H88a48 48 0 1 1 0-96h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  history: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="168 40 168 96 112 96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M152,56a88,88,0,1,0,88,88" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="128 128 128 80 152 104" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockCounterClockwise: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="16 128 64 128 64 80" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M64 128a88 88 0 1 0 26-62" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="128 72 128 128 168 152" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dotsThree: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="60" cy="128" r="16" fill="currentColor"/><circle cx="128" cy="128" r="16" fill="currentColor"/><circle cx="196" cy="128" r="16" fill="currentColor"/></svg>`,
  smiley: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><circle cx="100" cy="116" r="12" fill="currentColor"/><circle cx="156" cy="116" r="12" fill="currentColor"/><path d="M104,156c0,13.3,11.2,24,24,24s24-10.7,24-24" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  at: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="104" cy="112" r="48" stroke="currentColor" stroke-width="16"/><path d="M152,112a48,48,0,1,1-48-48" stroke="currentColor" stroke-width="16"/><path d="M128,156v40a40,40,0,0,1-40,40" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  image: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><rect x="32" y="48" width="192" height="160" rx="16" stroke="currentColor" stroke-width="16"/><circle cx="92" cy="108" r="16" fill="currentColor"/><path d="M32 172l52-52 44 44 28-28 68 68" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  paperclip: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M216,120v72a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V88a40,40,0,0,1,40-40h72" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><polyline points="152 32 216 32 216 96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  gitFork: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="64" cy="48" r="20" stroke="currentColor" stroke-width="16"/><circle cx="192" cy="80" r="20" stroke="currentColor" stroke-width="16"/><circle cx="64" cy="208" r="20" stroke="currentColor" stroke-width="16"/><path d="M84 48h36a40 40 0 0 1 40 40v0" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M64 68v100" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  send: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="232 32 104 160 232 32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M232,32,104,160,40,192a16,16,0,0,1-20-20l32-64" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="216" x2="128" y2="56" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,128 128,56 200,128" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function getAvatarInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase()
}

function renderAvatarWithFallback(avatar, wrapperClass, imageClass = "") {
  const safeAvatar = avatar || {}
  const initials = getAvatarInitials(safeAvatar.name)
  const imageClassAttr = imageClass ? ` class="${imageClass}"` : ""

  return `<span class="${wrapperClass}" style="background:${safeAvatar.bg || "#d0d5dd"}"><span class="rr-avatar-fallback">${escapeHtml(initials)}</span>${safeAvatar.url ? `<img src="${safeAvatar.url}" alt=""${imageClassAttr} onerror="this.remove()"/>` : ""}</span>`
}

// Global state for current active tab
let ACTIVE_TAB = "overview"
// Global state for modal
let SELECTED_ISSUE = null
let MODAL_VISIBLE = false
let ISSUE_MODAL_TOOL = "history"
const BUTTONS = [
  { id: "overview", label: "Overview" },
  { id: "sprint", label: "Sprint" },
  { id: "regressions", label: "Regressions" },
  { id: "production", label: "Production Issues" },
  { id: "stakeholders", label: "Stakeholders’ Issues" },
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
let STAKEHOLDERS_DONE_COLLAPSED = false

const REG_AVATAR = {
  alisa:   { url: "http://localhost:3845/assets/4507a3162dffac2d85eeb6e31d1a15c57091a204.png", bg: "#c7b9da", name: "Alisa Brown" },
  kate:    { url: "http://localhost:3845/assets/2f1190870d753151f58657595136f67c584b5c8c.png", bg: "#c7b9da", name: "Kate Morrison" },
  kate2:   { url: "http://localhost:3845/assets/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", bg: "#dbc0dd", name: "Kate Fox" },
  orlando: { url: "http://localhost:3845/assets/555cb3735701db8d4318f0d93edd1f4b64493b37.png", bg: "#cfc3a7", name: "Orlando Diggs" },
  lana:    { url: "http://localhost:3845/assets/d688ab8bff2aebfc3cab587865468c4713ecad78.png", bg: "#d4b5ad", name: "Lana Steiner" },
  phoenix: { url: "http://localhost:3845/assets/2780e16db1a4a364d3d872737f7fe9563d7abb29.png", bg: "#aa9c75", name: "Phoenix Baker" },
  candice: { url: "http://localhost:3845/assets/504bc691102d8a6217d1fc1f8e79a810b1842a0d.png", bg: "#a2a8cd", name: "Candice Wu" },
  demi:    { url: "http://localhost:3845/assets/c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png", bg: "#bea887", name: "Demi Wilkinson" },
  drew:    { url: "http://localhost:3845/assets/2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png", bg: "#d1dfc3", name: "Drew Cano" },
  loki:    { url: "http://localhost:3845/assets/d4b04f99db960f52b2cf64f40f4e56eb5cd841e3.png", bg: "#f0f1f3", name: "Loki Hayes" },
  noah:    { url: "http://localhost:3845/assets/ab41a74aead9e7cb47a87ad793df9b09ed9d1ea5.png", bg: "#f0f1f3", name: "Noah Bennett" },
  lucy:    { url: "http://localhost:3845/assets/cc20770e67dac754b967ba908e8faaf230d75581.png", bg: "#dbc0dd", name: "Lucy Mendez" },
  brooklyn: { url: "http://localhost:3845/assets/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", bg: "#dbc0dd", name: "Brooklyn Simmons" },
  rene:    { url: "http://localhost:3845/assets/555cb3735701db8d4318f0d93edd1f4b64493b37.png", bg: "#cfc3a7", name: "Rene Wells" },
}

const ISSUE_MODAL_ATTACHMENTS = [
  {
    url: "http://localhost:3845/assets/b32a89c46b368fe66c10652698fb8fea4d31a63f.png",
    type: "video",
  },
  {
    url: "http://localhost:3845/assets/5eb09a579a993a8c98c5d0be927ff09114216df8.png",
    type: "image",
  },
  {
    url: "http://localhost:3845/assets/205aa03909fb9337568d32d68be65044d4bb2512.png",
    type: "image",
  },
  {
    url: "http://localhost:3845/assets/76024a0393388402b643f98a5d90a7f5a9262c20.png",
    type: "image",
  },
]

const ISSUE_MODAL_PLAY_BG = "http://localhost:3845/assets/3df5e28ae1564c866cea2734eeb2cd98435a7846.svg"
const ISSUE_MODAL_PLAY_ICON = "http://localhost:3845/assets/8266f660760eed5a5315590e65ca724c4066a5e3.svg"
const ISSUE_MODAL_HISTORY_AVATAR_RENE = "http://localhost:3845/assets/501bde5384c13a2e469fcc8407daa6da0960c687.png"
const ISSUE_MODAL_HISTORY_AVATAR_LANA = "http://localhost:3845/assets/30d4a462ea7b6e1428ffcb7ed5d646ca522e5a23.png"
const ISSUE_MODAL_HISTORY_AVATAR_ORLANDO = "http://localhost:3845/assets/05be041b58b5e1fe37be4a6bb5a74f76d7c0f06d.png"

/* ── Issue Details & Comments Data ──────────────────────── */
const ISSUE_DETAILS_MAP = {
  "Document access denied.": {
    scope: "STG",
    priority: "urgent",
    status: "review",
    reporter: { ...REG_AVATAR.rene, name: "Rene Wells" },
    assignee: { ...REG_AVATAR.orlando, name: "Orlando Diggs" },
    description: "Users with valid access permissions receive an \"Access Denied\" error when attempting to open certain documents via direct URL or from the document list view.\n\nSteps to Reproduce:\n1. Log in as a user with the \"Editor\" role.\n2. Navigate to the Documents page.\n3. Select a document assigned to the user's group.\n4. Click the document title OR open the document via direct URL.\n\nExpected Result\nThe document opens successfully and displays its content.\n\nActual Result\nThe user receives a 403 Access Denied error page.\n\nIn some cases:\n- No error message is shown.\n- The user is redirected to the dashboard without explanation.",
    comments: [
      {
        author: "Brooklyn Simmons",
        avatar: REG_AVATAR.brooklyn,
        timestamp: "5 days ago",
        text: "To clarify with stakeholder.",
      },
      {
        author: "Demi Wilkinson",
        avatar: REG_AVATAR.demi,
        timestamp: "2 days ago",
        text: "This part need an update due to technical constraints.",
      },
    ],
    relatedIssues: [
      {
        scope: "STG",
        title: "Document upload issue",
      },
      {
        scope: "STG",
        title: "Document not accessible",
      },
    ],
    history: [
      {
        date: "19/02/26",
        event: "Ready for review",
        author: "Orlando Diggs",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_ORLANDO,
          bg: "#cfc3a7",
        },
      },
      {
        date: "17/02/26",
        event: "Added Orlando Diggs as assignee",
        author: "Lana Steiner",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_LANA,
          bg: "#d4b5ad",
        },
      },
      {
        date: "14/02/26",
        event: "Issue created",
        author: "Rene Wells",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_RENE,
          bg: "#dfcc9f",
        },
      },
    ],
  },
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

const STAKEHOLDERS_ROWS = [
  { issue: "Dashboard metrics not loading for external users.",   priority: "urgent", date: "07/02/26", reporter: REG_AVATAR.alisa,  assignees: [REG_AVATAR.kate2],                     statusStaging: "merged",     statusProd: "todo" },
  { issue: "Stakeholder report export generates empty file.",     priority: "urgent", date: "07/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.orlando],                   statusStaging: "review",     statusProd: "todo" },
  { issue: "User role permissions not applied after update.",     priority: "high",   date: "08/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.lana],                      statusStaging: "review",     statusProd: "todo" },
  { issue: "Notification emails delayed by over 24 hours.",       priority: "high",   date: "12/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.phoenix],                   statusStaging: "inprogress", statusProd: "todo" },
  { issue: "Portfolio overview page crashes on mobile.",          priority: "high",   date: "12/02/26", reporter: REG_AVATAR.noah,   assignees: [REG_AVATAR.candice],                   statusStaging: "inprogress", statusProd: "todo" },
  { issue: "Approval workflow skips required sign-off step.",     priority: "medium", date: "12/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.lana, REG_AVATAR.demi],     statusStaging: "merged",     statusProd: "todo" },
  { issue: "Audit log entries missing for bulk actions.",         priority: "medium", date: "12/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.lana],                      statusStaging: "merged",     statusProd: "todo" },
  { issue: "Session timeout too aggressive for guest users.",     priority: "medium", date: "08/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.drew],                      statusStaging: "error",      statusProd: "todo" },
  { issue: "Comment thread collapses unexpectedly on refresh.",   priority: "low",    date: "13/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.phoenix],                   statusStaging: "todo",       statusProd: "todo" },
  { issue: "Search results incomplete for filtered queries.",     priority: "low",    date: "08/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.demi, REG_AVATAR.candice],  statusStaging: "todo",       statusProd: "todo" },
]

const STAKEHOLDERS_DONE_ROWS = [
  { issue: "SSO login fails for external stakeholder accounts.", priority: "medium", date: "12/02/26", reporter: REG_AVATAR.alisa, assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { issue: "Data export includes archived records incorrectly.", priority: "medium", date: "12/02/26", reporter: REG_AVATAR.alisa, assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "done" },
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
      renderAvatarWithFallback(av, "rr-reg-avatar")
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
    <div class="rr-reg-row" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'")}'>
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

function renderRegDoneRow(row) {
  return `
    <div class="rr-reg-row" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'")}'>
      <div class="rr-reg-cell rr-reg-cell--scope">${renderRegScope(row.scope)}</div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell rr-reg-cell--date">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee"></div>
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
          ${REGRESSION_DONE_ROWS.map(renderRegDoneRow).join("")}
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
          ${PRODUCTION_DONE_ROWS.map(renderRegDoneRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

function renderStakeholdersTableHeader() {
  const sortIcon = `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="24" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  return `
    <div class="rr-reg-row rr-reg-row--header rr-reg-row--stakeholders">
      <div class="rr-reg-cell rr-reg-cell--issue">Issue</div>
      <div class="rr-reg-cell rr-reg-cell--priority">Priority ${sortIcon}</div>
      <div class="rr-reg-cell">Date</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Reporter</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Assignee</div>
      <div class="rr-reg-cell rr-reg-cell--pr">PR Link</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Staging</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Production</div>
    </div>`
}

function renderStakeholdersRow(row) {
  return `
    <div class="rr-reg-row rr-reg-row--stakeholders" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'")}'>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup([row.reporter])}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup(row.assignees)}</div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderStakeholdersDoneRow(row) {
  return `
    <div class="rr-reg-row rr-reg-row--stakeholders" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'")}'>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup([row.reporter])}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee"></div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderStakeholdersTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = STAKEHOLDERS_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderStakeholdersTableHeader()}
        ${STAKEHOLDERS_ROWS.map(renderStakeholdersRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-stakeholders-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!STAKEHOLDERS_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderStakeholdersTableHeader()}
          ${STAKEHOLDERS_DONE_ROWS.map(renderStakeholdersDoneRow).join("")}
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

function renderIssueDescription(content) {
  const text = String(content || "No description provided")
  const lines = text.split(/\r?\n/)
  const headingLines = new Set(["Steps to Reproduce:", "Expected Result", "Actual Result"])
  const html = []
  let inOrderedList = false

  const closeList = () => {
    if (inOrderedList) {
      html.push("</ol>")
      inOrderedList = false
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      closeList()
      html.push('<p class="rr-modal-description-paragraph rr-modal-description-paragraph--spacer"></p>')
      continue
    }

    if (headingLines.has(trimmed)) {
      closeList()
      html.push(`<p class="rr-modal-description-heading">${escapeHtml(trimmed)}</p>`)
      continue
    }

    const numberedItem = trimmed.match(/^\d+\.\s+(.*)$/)
    if (numberedItem) {
      if (!inOrderedList) {
        html.push('<ol class="rr-modal-description-list">')
        inOrderedList = true
      }
      html.push(`<li>${escapeHtml(numberedItem[1])}</li>`)
      continue
    }

    closeList()
    html.push(`<p class="rr-modal-description-paragraph">${escapeHtml(trimmed)}</p>`)
  }

  closeList()
  return html.join("")
}

function renderIssueModalAttachments(details) {
  const attachments = Array.isArray(details.attachments) && details.attachments.length > 0
    ? details.attachments
    : ISSUE_MODAL_ATTACHMENTS

  return `
    <div class="rr-modal-attachments" role="region" aria-label="Issue attachments">
      ${attachments.map((attachment) => {
        const isVideo = attachment.type === "video"
        return `
          <button class="rr-modal-attachment-card ${isVideo ? "is-video" : ""}" type="button" title="Open attachment">
            <img class="rr-modal-attachment-image" src="${attachment.url}" alt="" loading="lazy" />
            ${isVideo ? `
              <span class="rr-modal-attachment-overlay" aria-hidden="true"></span>
              <span class="rr-modal-attachment-play" aria-hidden="true">
                <img class="rr-modal-attachment-play-bg" src="${ISSUE_MODAL_PLAY_BG}" alt="" />
                <img class="rr-modal-attachment-play-icon" src="${ISSUE_MODAL_PLAY_ICON}" alt="" />
              </span>
            ` : ""}
          </button>
        `
      }).join("")}
    </div>
  `
}

function renderIssueModalRelatedIssues(details) {
  const relatedIssues = Array.isArray(details.relatedIssues) && details.relatedIssues.length > 0
    ? details.relatedIssues
    : [
        { scope: "STG", title: "Document upload issue" },
        { scope: "STG", title: "Document not accessible" },
      ]

  return `
    <div class="rr-modal-related" role="region" aria-label="Related issues">
      ${relatedIssues.map((item) => `
        <button class="rr-modal-related-row" type="button" title="Open related issue">
          <span class="rr-modal-related-scope-cell">
            <span class="rr-modal-related-scope-badge">${escapeHtml(item.scope || "STG")}</span>
          </span>
          <span class="rr-modal-related-title-cell">${escapeHtml(item.title || "Untitled issue")}</span>
        </button>
      `).join("")}
    </div>
  `
}

function renderIssueModalHistory(details, reporter, assignee, statusLabel) {
  const reporterName = reporter && reporter.name ? reporter.name : "Unknown reporter"
  const reporterAvatar = {
    url: reporter && reporter.url ? reporter.url : "",
    bg: reporter && reporter.bg ? reporter.bg : "#d0d5dd",
  }
  const assigneeName = assignee && assignee.name ? assignee.name : "Unassigned"
  const assigneeAvatar = {
    url: assignee && assignee.url ? assignee.url : "",
    bg: assignee && assignee.bg ? assignee.bg : "#d0d5dd",
  }
  const issueStatusLabel = statusLabel || "To do"

  const history = Array.isArray(details.history) && details.history.length > 0
    ? details.history
    : [
        {
          date: "19/02/26",
          event: "Ready for review",
          author: "Orlando Diggs",
          avatar: { url: ISSUE_MODAL_HISTORY_AVATAR_ORLANDO, bg: "#cfc3a7" },
        },
        {
          date: "17/02/26",
          event: "Added Orlando Diggs as assignee",
          author: "Lana Steiner",
          avatar: { url: ISSUE_MODAL_HISTORY_AVATAR_LANA, bg: "#d4b5ad" },
        },
        {
          date: "14/02/26",
          event: "Issue created",
          author: reporterName,
          avatar: reporterAvatar,
        },
      ]

  const historyWithReporterForCreation = history.map((item) => {
    const eventText = String(item && item.event ? item.event : "").trim().toLowerCase()
    if (eventText === "issue created") {
      return {
        ...item,
        author: reporterName,
        avatar: reporterAvatar,
      }
    }
    if (eventText === "ready for review") {
      return {
        ...item,
        event: issueStatusLabel,
        author: assigneeName,
        avatar: assigneeAvatar,
      }
    }
    if (eventText.includes("as assignee")) {
      return {
        ...item,
        event: `Added ${assigneeName} as assignee`,
      }
    }
    return item
  })

  return `
    <div class="rr-modal-history" role="region" aria-label="Issue history">
      <span class="rr-modal-history-line" aria-hidden="true"></span>
      ${historyWithReporterForCreation.map((item, index) => `
        <span class="rr-modal-history-node" style="top:${index * 86}px" aria-hidden="true"></span>
        <div class="rr-modal-history-card" style="top:${index * 86 - 12}px">
          <p class="rr-modal-history-date">${escapeHtml(item.date || "")}</p>
          <p class="rr-modal-history-event">${escapeHtml(item.event || "")}</p>
          <div class="rr-modal-history-author-row">
            ${renderAvatarWithFallback({ url: item.avatar && item.avatar.url, bg: item.avatar && item.avatar.bg, name: item.author }, "rr-modal-history-avatar-wrap", "rr-modal-history-avatar")}
            <span class="rr-modal-history-author">${escapeHtml(item.author || "")}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `
}

/* ── Issue Details Modal Rendering ─────────────────────────── */
function renderIssueModal() {
  if (!SELECTED_ISSUE || !MODAL_VISIBLE) return ""

  const issue = SELECTED_ISSUE
  const details = ISSUE_DETAILS_MAP[issue.issue] || {}
  
  const priorityColors = {
    urgent: { color: "#e14040", bg: "#fcd6d6" },
    high: { color: "#e14040", bg: "#fcd6d6" },
    medium: { color: "#f79009", bg: "#fff3cd" },
    low: { color: "#0e9255", bg: "#ddf7eb" },
  }
  
  const scopeColors = {
    "FE":    { bg: "#fef4e6", color: "#f79009" },
    "BE":    { bg: "#e0e2e7", color: "#3d4350" },
    "BE&FE": { bg: "#e0e2e7", color: "#3d4350" },
    "Devops":{ bg: "#eee3f6", color: "#9b5bce" },
    "STG":   { bg: "#eee3f6", color: "#9b5bce" },
    "PROD":  { bg: "#e0e2e7", color: "#3d4350" },
    "DEV":   { bg: "#fef4e6", color: "#f79009" },
  }
  
  const statusColors = {
    merged: { label: "Merged", bg: "#fbc6cd", color: "#d13245" },
    review: { label: "Ready for review", bg: "#eee3f6", color: "#9b5bce" },
    inprogress: { label: "In progress", bg: "#daebff", color: "#0067da" },
    todo: { label: "To do", bg: "#e0e2e7", color: "#3d4350" },
    error: { label: "Error", bg: "#fcdad7", color: "#c0362d" },
    done: { label: "Done", bg: "#ddf7eb", color: "#0e9255" },
  }
  
  const priorityConfig = priorityColors[issue.priority] || priorityColors.medium
  const scopeKey = details.scope || issue.scope || "DEV"
  const scopeConfig = scopeColors[scopeKey] || { bg: "#e0e2e7", color: "#3d4350" }
  const statusKey = details.status || issue.statusStaging || "todo"
  const statusConfig = statusColors[statusKey] || statusColors.todo
  const activeTool = ISSUE_MODAL_TOOL
  
  const assignee = details.assignee || (issue.assignees && issue.assignees[0])
  const derivedReporter = issue.reporter || assignee || (issue.assignees && issue.assignees[0]) || REG_AVATAR.alisa
  const reporter = details.reporter || derivedReporter
  
  return `
    <div class="rr-modal-overlay" data-action="close-modal">
      <div class="rr-modal-backdrop"></div>
      <div class="rr-modal-container">
        <div class="rr-modal-header">
          <div class="rr-modal-header-badge" style="background:${scopeConfig.bg};color:${scopeConfig.color}">
            ${escapeHtml(scopeKey)}
          </div>
          <div class="rr-modal-header-title">${escapeHtml(issue.issue)}</div>
          <div class="rr-modal-header-actions">
            <button class="rr-modal-action-btn" title="Copy" type="button">
              ${ICON.copy}
            </button>
            <button class="rr-modal-action-btn" data-action="close-modal" title="Close" type="button">
              ${ICON.close}
            </button>
          </div>
        </div>

        <div class="rr-modal-content">
          <div class="rr-modal-main">
            <h2 class="rr-modal-title">${escapeHtml(issue.issue)}</h2>
            
            <div class="rr-modal-meta-grid">
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">PRIORITY</div>
                <div class="rr-modal-meta-value" style="color:${priorityConfig.color}">
                  ${renderRegPriority(issue.priority)}
                </div>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">STATUS</div>
                <span class="rr-modal-status-badge" style="background:${statusConfig.bg};color:${statusConfig.color}">
                  ${escapeHtml(statusConfig.label || "To do")}
                </span>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">ASSIGNEE</div>
                <div class="rr-modal-assignee">
                  ${renderAvatarWithFallback(assignee, "rr-modal-avatar-wrap", "rr-modal-avatar")}
                  <span>${escapeHtml(assignee && assignee.name ? assignee.name : "Unassigned")}</span>
                </div>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">REPORTER</div>
                <div class="rr-modal-assignee">
                  ${renderAvatarWithFallback(reporter, "rr-modal-avatar-wrap", "rr-modal-avatar")}
                  <span>${escapeHtml(reporter && reporter.name ? reporter.name : "Alisa Brown")}</span>
                </div>
              </div>
            </div>
            
            <div class="rr-modal-section">
              <button class="rr-modal-pr-button" type="button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                Pull Request
              </button>
            </div>
            
            <div class="rr-modal-section">
              <div class="rr-modal-section-label">DESCRIPTION</div>
              <div class="rr-modal-description" role="document">
                ${renderIssueDescription(details.description || issue.issueSub || "No description provided")}
              </div>
            </div>
          </div>

          <div class="rr-modal-aside">
            <div class="rr-modal-comments">
              <div class="rr-modal-tools" role="toolbar" aria-label="Issue panel tools">
                <button class="rr-modal-tool-btn ${activeTool === "comments" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="comments" type="button" title="Comments">${ICON.chatCircleSimple}</button>
                <button class="rr-modal-tool-btn ${activeTool === "attachments" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="attachments" type="button" title="Attach file">${ICON.paperclip}</button>
                <button class="rr-modal-tool-btn ${activeTool === "related" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="related" type="button" title="Related issues">${ICON.gitFork}</button>
                <button class="rr-modal-tool-btn ${activeTool === "history" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="history" type="button" title="History">${ICON.clockCounterClockwise}</button>
              </div>

              ${activeTool === "attachments" ? renderIssueModalAttachments(details) : ""}
              ${activeTool === "related" ? renderIssueModalRelatedIssues(details) : ""}
              ${activeTool === "history" ? renderIssueModalHistory(details, reporter, assignee, statusConfig.label || "To do") : ""}

              ${activeTool === "comments" && details.comments && details.comments.length > 0 ? `
                <div class="rr-modal-comments-list">
                  ${details.comments.map(comment => `
                    <div class="rr-modal-comment">
                      ${renderAvatarWithFallback(comment.avatar, "rr-modal-comment-avatar-wrap", "rr-modal-comment-avatar")}
                      <div class="rr-modal-comment-content">
                        <div class="rr-modal-comment-header">
                          <div class="rr-modal-comment-meta">
                            <span class="rr-modal-comment-author">${escapeHtml(comment.author)}</span>
                            <span class="rr-modal-comment-time">${escapeHtml(comment.timestamp)}</span>
                          </div>
                          <button class="rr-modal-comment-menu" type="button" title="Comment actions">${ICON.dotsThree}</button>
                        </div>
                        <div class="rr-modal-comment-text">${escapeHtml(comment.text)}</div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}

              ${activeTool === "comments" ? `<div class="rr-modal-input-area">
                <input type="text" class="rr-modal-input" placeholder="Write a note..." />
                <div class="rr-modal-input-actions">
                  <button class="rr-modal-input-btn" type="button" title="Emoji">${ICON.smiley}</button>
                  <button class="rr-modal-input-btn" type="button" title="Mention">${ICON.at}</button>
                  <button class="rr-modal-input-btn" type="button" title="Add image">${ICON.image}</button>
                  <button class="rr-modal-input-btn rr-modal-input-btn--send" type="button" title="Send">${ICON.arrowUp}</button>
                </div>
              </div>` : ""}
            </div>
          </div>
        </div>
      </div>
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
    ACTIVE_TAB === "stakeholders" ? renderStakeholdersTab() :
    renderOverviewTab()
  
  return `
    <div class="rr-testing-wrapper">
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
      ${renderIssueModal()}
    </div>
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

  // Stakeholders Issues – Done section toggle
  document.querySelectorAll("[data-action='toggle-stakeholders-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      STAKEHOLDERS_DONE_COLLAPSED = !STAKEHOLDERS_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Issue Modal – Open issue details
  document.querySelectorAll("[data-action='open-issue-modal']").forEach((row) => {
    row.addEventListener("click", (e) => {
      // Don't open modal if clicking the PR button
      if (e.target.closest(".rr-reg-github-btn")) {
        return
      }
      
      const issueData = row.getAttribute("data-issue")
      if (issueData) {
        try {
          SELECTED_ISSUE = JSON.parse(issueData)
          MODAL_VISIBLE = true
          ISSUE_MODAL_TOOL = "history"
          
          // Re-render with modal
          const wrapper = document.querySelector(".rr-testing-wrapper")
          if (wrapper) {
            wrapper.innerHTML = renderTestingTabFlow()
            initTestingTab() // Re-attach event handlers
          }
        } catch (err) {
          console.error("Failed to parse issue data:", err)
        }
      }
    })
  })

  // Issue Modal – Switch right panel tool
  document.querySelectorAll("[data-action='switch-modal-tool']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tool = e.currentTarget.getAttribute("data-tool")
      if (!tool || tool === ISSUE_MODAL_TOOL) return

      ISSUE_MODAL_TOOL = tool

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Issue Modal – Close modal
  document.querySelectorAll("[data-action='close-modal']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedCloseButton = Boolean(e.target.closest(".rr-modal-action-btn"))
      const clickedOverlay = e.currentTarget.classList.contains("rr-modal-overlay") && e.target === e.currentTarget
      const clickedBackdrop = Boolean(e.target.closest(".rr-modal-backdrop"))

      if (clickedCloseButton || clickedOverlay || clickedBackdrop) {
        MODAL_VISIBLE = false
        SELECTED_ISSUE = null
        ISSUE_MODAL_TOOL = "history"
        
        // Re-render without modal
        const wrapper = document.querySelector(".rr-testing-wrapper")
        if (wrapper) {
          wrapper.innerHTML = renderTestingTabFlow()
          initTestingTab() // Re-attach event handlers
        }
      }
    })
  })
}
