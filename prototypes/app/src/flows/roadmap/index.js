/* ──────────────────────────────────────────────────────────────
   Roadmap Tab — Gantt chart with Development and Design tracks
   Path: /planning/roadmap
   Main view: Two-track timeline (Development / Design) with status modules
   ────────────────────────────────────────────────────────────── */

/* ── Helpers ───────────────────────────────────────────────– */
function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const MS_PER_DAY = 24 * 60 * 60 * 1000
const ROADMAP_BASE_SPRINT_COUNT = 6
const ROADMAP_SPRINT_START_NO = 11
const ROADMAP_CURRENT_SPRINT_NO = 13
const ROADMAP_HISTORY_SPRINTS_COUNT = 10
const DEFAULT_START_DATE = "2025-09-28"
const DEFAULT_END_DATE = "2026-06-06"

function toDateUtc(dateStr) {
  if (!dateStr) return null
  const d = new Date(`${dateStr}T00:00:00Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

function toIsoDate(value) {
  const date = value instanceof Date ? value : toDateUtc(value)
  if (!date) return ""
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY)
}

function formatDateShort(value) {
  if (!value) return ""
  const date = value instanceof Date ? value : toDateUtc(value)
  if (!date) return ""
  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  return `${day}/${month}`
}

function formatDateShortWithYear(value) {
  if (!value) return ""
  const date = value instanceof Date ? value : toDateUtc(value)
  if (!date) return ""
  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const year = String(date.getUTCFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

function getInitials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "NN"
  const initials = parts.slice(0, 2).map(part => part[0]?.toUpperCase() || "").join("")
  return initials || "NN"
}

function getSubtleSolidColor(hexColor) {
  const hex = String(hexColor || "").trim()
  const normalized = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#d1d5db"
  const r = Number.parseInt(normalized.slice(1, 3), 16)
  const g = Number.parseInt(normalized.slice(3, 5), 16)
  const b = Number.parseInt(normalized.slice(5, 7), 16)
  const mixWithWhite = 0.72
  const toHex = value => Math.round(value).toString(16).padStart(2, "0")

  return `#${toHex(r + (255 - r) * mixWithWhite)}${toHex(g + (255 - g) * mixWithWhite)}${toHex(b + (255 - b) * mixWithWhite)}`
}

function deepCloneSettings(settings) {
  return {
    ...settings,
    team: settings.team.map(member => ({ ...member })),
  }
}

function normalizeSettings(input) {
  const startDate = toDateUtc(input.projectStartDate) || toDateUtc(DEFAULT_START_DATE)
  const endDateRaw = toDateUtc(input.projectEndDate) || toDateUtc(DEFAULT_END_DATE)
  const endDate = endDateRaw < startDate ? startDate : endDateRaw
  const duration = Number(input.sprintDurationWeeks)
  const sprintDurationWeeks = [1, 2, 3].includes(duration) ? duration : 3

  return {
    projectStartDate: toIsoDate(startDate),
    projectEndDate: toIsoDate(endDate),
    sprintDurationWeeks,
    team: Array.isArray(input.team) ? input.team.map(member => ({ ...member })) : [],
  }
}

/* ── Status colors ─────────────────────────────────────────– */
const STATUS_COLORS = {
  "completed": "#10b981",
  "in-dev": "#3b82f6",
  "designing": "#8b5cf6",
  "to-do": "#bfc6d0",
}

/* ── Team members with avatar images ──────────────────────– */
const TEAM = [
  { id: "u1", name: "Olivia Rhye", image: "http://localhost:3845/assets/67da9fddd372b1b5b44ffef41eed6ceb810ddf8a.png" },
  { id: "u2", name: "Candice Wu", image: "http://localhost:3845/assets/261d783da4147da7fea569d1940840845897657f.png" },
  { id: "u3", name: "Orlando Diggs", image: "http://localhost:3845/assets/30d4a462ea7b6e1428ffcb7ed5d646ca522e5a23.png" },
  { id: "u4", name: "Demi Wilkinson", image: "http://localhost:3845/assets/4e18492d9e016d792d3dfe93dd80d52dd96046ee.png" },
  { id: "u5", name: "Drew Cano", image: "http://localhost:3845/assets/0728c923a00edf130deb71506d0756fc0d57a8b8.png" },
  { id: "u6", name: "Phoenix Baker", image: "http://localhost:3845/assets/d9ddce204792163ce745396135bdc5f320b012d7.png" },
  { id: "u7", name: "Nat Craig", image: "http://localhost:3845/assets/3bbe168eab287460eef89ff5351e750f87e0634b.png" },
  { id: "u8", name: "Lana Steiner", image: "http://localhost:3845/assets/05be041b58b5e1fe37be4a6bb5a74f76d7c0f06d.png" },
  { id: "u9", name: "Andi Lane", image: "http://localhost:3845/assets/264ae50c597aef89a0c4eff3aa6d5fa1503db174.png" },
  { id: "u10", name: "Kate Morrison", image: "http://localhost:3845/assets/d62f72d9c8052940bb7983e7caefb57013f80477.png" },
]

/* ── Module definitions: Development track ────────────────– */
const DEV_MODULES = [
  { id: "AUT-001", title: "Login form", status: "completed", sprintStartNo: 11, sprintEndNo: 11 },
  { id: "ONB-003", title: "Provider onboarding", status: "completed", sprintStartNo: 12, sprintEndNo: 12 },
  { id: "AUT-002", title: "User authentication process", status: "in-dev", sprintStartNo: 13, sprintEndNo: 13 },
  { id: "ONB-004", title: "Acquirer onboarding", status: "in-dev", sprintStartNo: 13, sprintEndNo: 14 },
  { id: "TRA-001", title: "Transaction section", status: "in-dev", sprintStartNo: 12, sprintEndNo: 13 },
  { id: "TEM-001", title: "Team section", status: "to-do", sprintStartNo: 14, sprintEndNo: 14 },
  { id: "TEM-002", title: "Team members roles", status: "to-do", sprintStartNo: 14, sprintEndNo: 15 },
  { id: "AUT-003", title: "User session management", status: "to-do", sprintStartNo: 15, sprintEndNo: 15 },
  { id: "AUT-004", title: "User password recovery", status: "to-do", sprintStartNo: 16, sprintEndNo: 16 },
]

/* ── Module definitions: Design track ─────────────────────– */
const DESIGN_MODULES = [
  { id: "AUT-002", title: "User authentication process", status: "completed", sprintStartNo: 11, sprintEndNo: 11 },
  { id: "ONB-004", title: "Acquirer onboarding", status: "completed", sprintStartNo: 12, sprintEndNo: 12 },
  { id: "TRA-002", title: "Transaction refunds", status: "completed", sprintStartNo: 12, sprintEndNo: 12 },
  { id: "AUT-003", title: "User session management", status: "designing", sprintStartNo: 13, sprintEndNo: 13 },
  { id: "TEM-001", title: "Team section", status: "designing", sprintStartNo: 13, sprintEndNo: 13 },
  { id: "TEM-002", title: "Team members roles", status: "designing", sprintStartNo: 13, sprintEndNo: 13 },
  { id: "TEM-003", title: "Permission management", status: "to-do", sprintStartNo: 14, sprintEndNo: 14 },
  { id: "TEM-004", title: "Add new member", status: "to-do", sprintStartNo: 15, sprintEndNo: 15 },
]

const SETTINGS_ICON_PATH = "M8.99928 5.62499C8.33177 5.62499 7.67925 5.82293 7.12423 6.19378C6.56921 6.56463 6.13663 7.09173 5.88119 7.70843C5.62574 8.32513 5.5589 9.00373 5.68913 9.65842C5.81935 10.3131 6.14079 10.9145 6.61279 11.3865C7.0848 11.8585 7.68616 12.1799 8.34085 12.3101C8.99554 12.4404 9.67414 12.3735 10.2908 12.1181C10.9075 11.8626 11.4346 11.4301 11.8055 10.875C12.1763 10.32 12.3743 9.6675 12.3743 8.99999C12.3733 8.10517 12.0175 7.24726 11.3847 6.61453C10.752 5.9818 9.8941 5.62592 8.99928 5.62499ZM8.99928 11.25C8.55427 11.25 8.11926 11.118 7.74925 10.8708C7.37924 10.6236 7.09085 10.2722 6.92055 9.86102C6.75025 9.44989 6.7057 8.99749 6.79251 8.56103C6.87933 8.12458 7.09362 7.72366 7.40829 7.409C7.72296 7.09433 8.12387 6.88004 8.56033 6.79322C8.99678 6.7064 9.44918 6.75096 9.86032 6.92126C10.2715 7.09155 10.6229 7.37994 10.8701 7.74995C11.1173 8.11996 11.2493 8.55498 11.2493 8.99999C11.2493 9.59672 11.0122 10.169 10.5903 10.591C10.1683 11.0129 9.59602 11.25 8.99928 11.25ZM16.7294 7.53819C16.7138 7.45898 16.6812 7.38407 16.634 7.31855C16.5868 7.25304 16.5261 7.19845 16.4559 7.1585L14.3585 5.96319L14.3501 3.59928C14.3498 3.51787 14.3319 3.43748 14.2975 3.36368C14.2632 3.28987 14.2132 3.2244 14.1511 3.17178C13.3902 2.52821 12.5141 2.03502 11.5692 1.71842C11.4948 1.69324 11.4159 1.68392 11.3377 1.69106C11.2595 1.69821 11.1836 1.72166 11.115 1.75991L8.99928 2.94256L6.88147 1.7578C6.81281 1.71933 6.73684 1.69571 6.65848 1.68844C6.58012 1.68117 6.50111 1.69043 6.42655 1.71561C5.48235 2.03452 4.6072 2.52959 3.84748 3.1746C3.78544 3.22713 3.73553 3.29249 3.70118 3.36617C3.66683 3.43985 3.64885 3.5201 3.6485 3.60139L3.63795 5.96741L1.54053 7.16272C1.47036 7.20267 1.40961 7.25726 1.36241 7.32277C1.31522 7.38829 1.28268 7.4632 1.26701 7.54241C1.07506 8.50701 1.07506 9.49999 1.26701 10.4646C1.28268 10.5438 1.31522 10.6187 1.36241 10.6842C1.40961 10.7497 1.47036 10.8043 1.54053 10.8443L3.63795 12.0396L3.64639 14.4035C3.64664 14.4849 3.66457 14.5653 3.69892 14.6391C3.73328 14.7129 3.78324 14.7784 3.84537 14.831C4.6062 15.4746 5.48236 15.9678 6.42725 16.2844C6.50166 16.3095 6.58052 16.3189 6.65875 16.3117C6.73698 16.3046 6.81285 16.2811 6.88147 16.2429L8.99928 15.0574L11.1171 16.2422C11.2009 16.2889 11.2954 16.3131 11.3913 16.3125C11.4527 16.3125 11.5138 16.3025 11.572 16.283C12.5161 15.9645 13.3912 15.4699 14.1511 14.8254C14.2131 14.7728 14.263 14.7075 14.2974 14.6338C14.3317 14.5601 14.3497 14.4799 14.3501 14.3986L14.3606 12.0326L16.458 10.8373C16.5282 10.7973 16.5889 10.7427 16.6361 10.6772C16.6833 10.6117 16.7159 10.5368 16.7315 10.4576C16.9224 9.49373 16.9217 8.50175 16.7294 7.53819ZM15.6747 9.9928L13.6659 11.1354C13.5779 11.1854 13.505 11.2583 13.455 11.3463C13.4142 11.4166 13.3713 11.4912 13.3277 11.5615C13.2719 11.6501 13.2422 11.7527 13.2419 11.8575L13.2314 14.1251C12.6914 14.5491 12.0899 14.8882 11.4476 15.1305L9.42115 14.0013C9.33703 13.9548 9.24238 13.9306 9.14623 13.931H9.13287C9.04779 13.931 8.96201 13.931 8.87694 13.931C8.77631 13.9285 8.67682 13.9528 8.58865 14.0013L6.56084 15.1333C5.91714 14.8928 5.31394 14.5554 4.77209 14.1328L4.76436 11.8687C4.76401 11.7638 4.7343 11.661 4.67858 11.572C4.63498 11.5017 4.59209 11.4314 4.55201 11.3569C4.50232 11.2675 4.42945 11.1932 4.34108 11.1417L2.33014 9.99632C2.22608 9.33806 2.22608 8.66754 2.33014 8.00928L4.33545 6.8646C4.42347 6.81455 4.49634 6.74167 4.54639 6.65366C4.58717 6.58335 4.63006 6.50881 4.67365 6.4385C4.72946 6.34983 4.75918 6.24725 4.75944 6.14249L4.76998 3.87491C5.30993 3.45089 5.91148 3.11182 6.55381 2.86944L8.5774 3.99866C8.66547 4.04748 8.76503 4.07176 8.86569 4.06897C8.95076 4.06897 9.03655 4.06897 9.12162 4.06897C9.22225 4.07149 9.32174 4.04722 9.4099 3.99866L11.4377 2.86663C12.0814 3.10715 12.6846 3.44455 13.2265 3.86717L13.2342 6.13124C13.2345 6.23621 13.2643 6.33899 13.32 6.42796C13.3636 6.49827 13.4065 6.56858 13.4465 6.64311C13.4962 6.73249 13.5691 6.80681 13.6575 6.85827L15.6684 8.00366C15.7739 8.66242 15.7751 9.33367 15.6719 9.9928H15.6747Z"
const ROADMAP_SECONDARY_ICON_PATH = "M15.1875 2.8125H9.5625V1.6875C9.5625 1.53832 9.50324 1.39524 9.39775 1.28975C9.29226 1.18426 9.14918 1.125 9 1.125C8.85082 1.125 8.70774 1.18426 8.60225 1.28975C8.49676 1.39524 8.4375 1.53832 8.4375 1.6875V2.8125H2.8125C2.51413 2.8125 2.22798 2.93103 2.017 3.142C1.80603 3.35298 1.6875 3.63913 1.6875 3.9375V12.375C1.6875 12.6734 1.80603 12.9595 2.017 13.1705C2.22798 13.3815 2.51413 13.5 2.8125 13.5H5.58L4.06055 15.3984C3.96731 15.515 3.92418 15.6638 3.94067 15.8121C3.95715 15.9605 4.03189 16.0962 4.14844 16.1895C4.26499 16.2827 4.4138 16.3258 4.56215 16.3093C4.71049 16.2929 4.84621 16.2181 4.93945 16.1016L7.02 13.5H10.98L13.0605 16.1016C13.1067 16.1593 13.1638 16.2073 13.2285 16.243C13.2933 16.2786 13.3644 16.3012 13.4379 16.3093C13.5113 16.3175 13.5856 16.3111 13.6566 16.2905C13.7276 16.27 13.7939 16.2356 13.8516 16.1895C13.9093 16.1433 13.9573 16.0862 13.993 16.0215C14.0286 15.9567 14.0512 15.8856 14.0593 15.8121C14.0675 15.7387 14.0611 15.6644 14.0405 15.5934C14.02 15.5224 13.9856 15.4561 13.9395 15.3984L12.42 13.5H15.1875C15.4859 13.5 15.772 13.3815 15.983 13.1705C16.194 12.9595 16.3125 12.6734 16.3125 12.375V3.9375C16.3125 3.63913 16.194 3.35298 15.983 3.142C15.772 2.93103 15.4859 2.8125 15.1875 2.8125ZM15.1875 12.375H2.8125V3.9375H15.1875V12.375Z"
const ROADMAP_PLUS_ICON_PATH = "M10 4.16666C10 3.93654 9.81312 3.74966 9.58333 3.74966C9.35355 3.74966 9.16666 3.93654 9.16666 4.16666V9.16666H4.16666C3.93654 9.16666 3.74966 9.35355 3.74966 9.58333C3.74966 9.81312 3.93654 9.99999 4.16666 9.99999H9.16666V15C9.16666 15.2298 9.35355 15.4167 9.58333 15.4167C9.81312 15.4167 10 15.2298 10 15V9.99999H15C15.2298 9.99999 15.4167 9.81312 15.4167 9.58333C15.4167 9.35355 15.2298 9.16666 15 9.16666H10V4.16666Z"
const ROADMAP_SNAPSHOT_IMAGE_ICON_PATH = "M13.5 2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V12.5C1.5 12.7652 1.60536 13.0196 1.79289 13.2071C1.98043 13.3946 2.23478 13.5 2.5 13.5H13.5C13.7652 13.5 14.0196 13.3946 14.2071 13.2071C14.3946 13.0196 14.5 12.7652 14.5 12.5V3.5C14.5 3.23478 14.3946 2.98043 14.2071 2.79289C14.0196 2.60536 13.7652 2.5 13.5 2.5ZM13.5 3.5V9.92188L11.8706 8.29313C11.7778 8.20024 11.6675 8.12656 11.5462 8.07629C11.4248 8.02602 11.2948 8.00015 11.1634 8.00015C11.0321 8.00015 10.902 8.02602 10.7807 8.07629C10.6594 8.12656 10.5491 8.20024 10.4563 8.29313L9.20625 9.54313L6.45625 6.79313C6.26873 6.60573 6.01448 6.50046 5.74937 6.50046C5.48427 6.50046 5.23002 6.60573 5.0425 6.79313L2.5 9.33562V3.5H13.5ZM2.5 10.75L5.75 7.5L10.75 12.5H2.5V10.75ZM13.5 12.5H12.1644L9.91438 10.25L11.1644 9L13.5 11.3363V12.5ZM9 6.25C9 6.10166 9.04399 5.95666 9.1264 5.83332C9.20881 5.70999 9.32594 5.61386 9.46299 5.55709C9.60003 5.50032 9.75083 5.48547 9.89632 5.51441C10.0418 5.54335 10.1754 5.61478 10.2803 5.71967C10.3852 5.82456 10.4567 5.9582 10.4856 6.10368C10.5145 6.24917 10.4997 6.39997 10.4429 6.53701C10.3861 6.67406 10.29 6.79119 10.1667 6.8736C10.0433 6.95601 9.89834 7 9.75 7C9.55109 7 9.36032 6.92098 9.21967 6.78033C9.07902 6.63968 9 6.44891 9 6.25Z"
const ROADMAP_SNAPSHOT_PDF_ICON_PATH = "M17.5 11.875C17.5 12.0408 17.4342 12.1997 17.3169 12.3169C17.1997 12.4342 17.0408 12.5 16.875 12.5H15V13.75H16.25C16.4158 13.75 16.5747 13.8158 16.6919 13.9331C16.8092 14.0503 16.875 14.2092 16.875 14.375C16.875 14.5408 16.8092 14.6997 16.6919 14.8169C16.5747 14.9342 16.4158 15 16.25 15H15V16.25C15 16.4158 14.9342 16.5747 14.8169 16.6919C14.6997 16.8092 14.5408 16.875 14.375 16.875C14.2092 16.875 14.0503 16.8092 13.9331 16.6919C13.8158 16.5747 13.75 16.4158 13.75 16.25V11.875C13.75 11.7092 13.8158 11.5503 13.9331 11.4331C14.0503 11.3158 14.2092 11.25 14.375 11.25H16.875C17.0408 11.25 17.1997 11.3158 17.3169 11.4331C17.4342 11.5503 17.5 11.7092 17.5 11.875ZM7.1875 13.4375C7.1875 14.0177 6.95703 14.5741 6.5468 14.9843C6.13656 15.3945 5.58016 15.625 5 15.625H4.375V16.25C4.375 16.4158 4.30915 16.5747 4.19194 16.6919C4.07473 16.8092 3.91576 16.875 3.75 16.875C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875C3.125 11.7092 3.19085 11.5503 3.30806 11.4331C3.42527 11.3158 3.58424 11.25 3.75 11.25H5C5.58016 11.25 6.13656 11.4805 6.5468 11.8907C6.95703 12.3009 7.1875 12.8573 7.1875 13.4375ZM5.9375 13.4375C5.9375 13.1889 5.83873 12.9504 5.66291 12.7746C5.4871 12.5988 5.24864 12.5 5 12.5H4.375V14.375H5C5.24864 14.375 5.4871 14.2762 5.66291 14.1004C5.83873 13.9246 5.9375 13.6861 5.9375 13.4375ZM12.8125 14.0625C12.8125 14.8084 12.5162 15.5238 11.9887 16.0512C11.4613 16.5787 10.7459 16.875 10 16.875H8.75C8.58424 16.875 8.42527 16.8092 8.30806 16.6919C8.19085 16.5747 8.125 16.4158 8.125 16.25V11.875C8.125 11.7092 8.19085 11.5503 8.30806 11.4331C8.42527 11.3158 8.58424 11.25 8.75 11.25H10C10.7459 11.25 11.4613 11.5463 11.9887 12.0738C12.5162 12.6012 12.8125 13.3166 12.8125 14.0625ZM11.5625 14.0625C11.5625 13.6481 11.3979 13.2507 11.1049 12.9576C10.8118 12.6646 10.4144 12.5 10 12.5H9.375V15.625H10C10.4144 15.625 10.8118 15.4604 11.1049 15.1674C11.3979 14.8743 11.5625 14.4769 11.5625 14.0625ZM3.125 8.75V3.125C3.125 2.79348 3.2567 2.47554 3.49112 2.24112C3.72554 2.0067 4.04348 1.875 4.375 1.875H11.875C11.9571 1.87494 12.0384 1.89105 12.1143 1.92241C12.1902 1.95378 12.2591 1.99979 12.3172 2.05781L16.6922 6.43281C16.7502 6.4909 16.7962 6.55985 16.8276 6.63572C16.859 6.71159 16.8751 6.7929 16.875 6.875V8.75C16.875 8.91576 16.8092 9.07473 16.6919 9.19194C16.5747 9.30915 16.4158 9.375 16.25 9.375C16.0842 9.375 15.9253 9.30915 15.8081 9.19194C15.6908 9.07473 15.625 8.91576 15.625 8.75V7.5H11.875C11.7092 7.5 11.5503 7.43415 11.4331 7.31694C11.3158 7.19973 11.25 7.04076 11.25 6.875V3.125H4.375V8.75C4.375 8.91576 4.30915 9.07473 4.19194 9.19194C4.07473 9.30915 3.91576 9.375 3.75 9.375C3.58424 9.375 3.42527 9.30915 3.30806 9.19194C3.19085 9.07473 3.125 8.91576 3.125 8.75ZM12.5 6.25H14.7414L12.5 4.00859V6.25Z"
const ROADMAP_SNAPSHOT_SAVE_ICON_PATH = "M17.1336 5.62501L14.375 2.86641C14.2593 2.74983 14.1217 2.65741 13.97 2.59451C13.8183 2.5316 13.6556 2.49948 13.4914 2.50001H3.75C3.41848 2.50001 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41849 2.5 3.75001V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V6.5086C17.5005 6.34439 17.4684 6.18171 17.4055 6.03002C17.3426 5.87833 17.2502 5.74066 17.1336 5.62501ZM13.125 16.25H6.875V11.875H13.125V16.25ZM16.25 16.25H14.375V11.875C14.375 11.5435 14.2433 11.2255 14.0089 10.9911C13.7745 10.7567 13.4565 10.625 13.125 10.625H6.875C6.54348 10.625 6.22554 10.7567 5.99112 10.9911C5.7567 11.2255 5.625 11.5435 5.625 11.875V16.25H3.75V3.75001H13.4914L16.25 6.5086V16.25ZM12.5 5.62501C12.5 5.79077 12.4342 5.94974 12.3169 6.06695C12.1997 6.18416 12.0408 6.25001 11.875 6.25001H7.5C7.33424 6.25001 7.17527 6.18416 7.05806 6.06695C6.94085 5.94974 6.875 5.79077 6.875 5.62501C6.875 5.45925 6.94085 5.30027 7.05806 5.18306C7.17527 5.06585 7.33424 5.00001 7.5 5.00001H11.875C12.0408 5.00001 12.1997 5.06585 12.3169 5.18306C12.4342 5.30027 12.5 5.45925 12.5 5.62501Z"
const ROADMAP_SNAPSHOT_LABEL = "Sprint 15"
const ROADMAP_SNAPSHOTS = ["Snapshot 7", "Snapshot 6", "Snapshot 5", "Snapshot 4", "Snapshot 3", "Snapshot 2"]

function renderRoadmapSnapshotDropdown() {
  return `
    <div class="rr-roadmap-snapshot-dropdown" role="menu" aria-label="Roadmap snapshots">
      <button type="button" class="rr-roadmap-snapshot-item rr-roadmap-snapshot-item--new" data-action="create-roadmap-snapshot" role="menuitem">
        <span class="rr-roadmap-snapshot-plus" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
            <path d="${ROADMAP_PLUS_ICON_PATH}" fill="#14161B"/>
          </svg>
        </span>
        <span class="rr-roadmap-snapshot-text">New snapshot</span>
      </button>

      <div class="rr-roadmap-snapshot-group" role="none">
        <p class="rr-roadmap-snapshot-group-label">${ROADMAP_SNAPSHOT_LABEL}</p>
        ${ROADMAP_SNAPSHOTS.map(snapshot => `
          <button type="button" class="rr-roadmap-snapshot-item" data-action="select-roadmap-snapshot" data-snapshot-name="${escapeHtml(snapshot)}" role="menuitem">
            <span class="rr-roadmap-snapshot-text">${escapeHtml(snapshot)}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `
}

function renderRoadmapHeaderActions(isSnapshotDropdownOpen) {
  return `
    <div class="rr-roadmap-snapshot-anchor">
      <button type="button" class="rr-kb-sprint-history-btn rr-roadmap-secondary-btn" data-action="toggle-roadmap-snapshot-dropdown" aria-label="Roadmap snapshots" aria-expanded="${isSnapshotDropdownOpen ? "true" : "false"}" title="Roadmap snapshots">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="${ROADMAP_SECONDARY_ICON_PATH}" fill="#14161B"/>
        </svg>
      </button>
      ${isSnapshotDropdownOpen ? renderRoadmapSnapshotDropdown() : ""}
    </div>
    <button type="button" class="rr-kb-sprint-history-btn rr-roadmap-settings-btn" data-action="open-roadmap-settings" aria-label="Roadmap settings" title="Roadmap settings">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="${SETTINGS_ICON_PATH}" fill="#14161B"/>
      </svg>
    </button>
  `
}

function buildSprints(projectStartDate, projectEndDate, sprintDurationWeeks) {
  const start = toDateUtc(projectStartDate) || toDateUtc(DEFAULT_START_DATE)
  const endRaw = toDateUtc(projectEndDate) || toDateUtc(DEFAULT_END_DATE)
  const end = endRaw < start ? start : endRaw
  const sprintLengthDays = Math.max(1, sprintDurationWeeks) * 7
  const sprints = []
  let cursor = new Date(start.getTime())
  let index = 0

  while (cursor <= end) {
    const sprintEnd = addDays(cursor, sprintLengthDays - 1)
    const boundedEnd = sprintEnd > end ? end : sprintEnd
    const sprintNo = ROADMAP_SPRINT_START_NO + index
    sprints.push({
      id: `s${sprintNo}`,
      sprintNo,
      startDate: toIsoDate(cursor),
      endDate: toIsoDate(boundedEnd),
    })
    cursor = addDays(boundedEnd, 1)
    index += 1
  }

  const historySprints = []
  for (let sprintNo = ROADMAP_SPRINT_START_NO - 1; sprintNo >= 1; sprintNo -= 1) {
    const offset = ROADMAP_SPRINT_START_NO - sprintNo
    if (offset > ROADMAP_HISTORY_SPRINTS_COUNT) break
    const historyEnd = addDays(start, -(offset * sprintLengthDays))
    const historyStart = addDays(historyEnd, -(sprintLengthDays - 1))
    historySprints.push({
      id: `s${sprintNo}`,
      sprintNo,
      startDate: toIsoDate(historyStart),
      endDate: toIsoDate(historyEnd),
    })
  }

  return [...historySprints.reverse(), ...sprints]
}

function buildPlaceholderModules(trackPrefix, startNo, endNo) {
  const modules = []
  for (let sprintNo = startNo; sprintNo <= endNo; sprintNo += 1) {
    modules.push({
      id: `${trackPrefix}-PLH-${String(sprintNo).padStart(3, "0")}`,
      title: `Historical placeholder sprint ${sprintNo}`,
      status: "completed",
      sprintStartNo: sprintNo,
      sprintEndNo: sprintNo,
    })
  }
  return modules
}

function getWeekStartsForSprint(sprint) {
  const start = toDateUtc(sprint.startDate)
  const end = toDateUtc(sprint.endDate)
  if (!start || !end) return []

  const weeks = []
  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 7)) {
    weeks.push(cursor)
  }

  if (weeks.length === 0) weeks.push(start)
  return weeks
}

function buildSprintLayout(settings) {
  const sprints = buildSprints(settings.projectStartDate, settings.projectEndDate, settings.sprintDurationWeeks)
  let nextColumnStart = 1
  const preferredCurrentSprintNo = ROADMAP_CURRENT_SPRINT_NO

  const layout = sprints.map((sprint, index) => {
    const weekStarts = getWeekStartsForSprint(sprint)
    const weekCount = Math.max(1, weekStarts.length)
    const columnStart = nextColumnStart
    nextColumnStart += weekCount

    return {
      ...sprint,
      weekStarts,
      weekCount,
      columnStart,
      isCurrent: sprint.sprintNo === preferredCurrentSprintNo,
    }
  })

  const currentSprint = layout.find(item => item.isCurrent) || layout[0]
  const currentSprintIndex = Math.max(0, layout.findIndex(item => item.isCurrent))
  const totalWeekColumns = layout.reduce((acc, sprint) => acc + sprint.weekCount, 0)

  return {
    layout,
    totalWeekColumns,
    currentSprintIndex,
    currentSprintStart: currentSprint?.columnStart || 1,
    currentSprintSpan: currentSprint?.weekCount || 1,
  }
}

function mapModuleToColumns(module, sprintLayout, currentSprintIndex) {
  if (sprintLayout.length === 0) return { startColumn: 1, colSpan: 1 }

  if (Number.isFinite(module.sprintStartNo) && Number.isFinite(module.sprintEndNo)) {
    const startNo = Number(module.sprintStartNo)
    const endNo = Number(module.sprintEndNo)
    const firstSprint = sprintLayout[0]
    const lastSprint = sprintLayout[sprintLayout.length - 1]
    const boundedStartNo = Math.min(Math.max(startNo, firstSprint.sprintNo), lastSprint.sprintNo)
    const boundedEndNo = Math.min(Math.max(endNo, boundedStartNo), lastSprint.sprintNo)
    const mappedStartIndex = sprintLayout.findIndex(sprint => sprint.sprintNo >= boundedStartNo)
    const mappedEndIndex = sprintLayout.findIndex(sprint => sprint.sprintNo >= boundedEndNo)
    const startIndex = mappedStartIndex >= 0 ? mappedStartIndex : 0
    const endIndex = mappedEndIndex >= 0 ? mappedEndIndex : startIndex
    const startSprint = sprintLayout[startIndex]
    const endSprint = sprintLayout[endIndex]
    const startColumn = startSprint.columnStart
    const endColumnExclusive = endSprint.columnStart + endSprint.weekCount

    return {
      startColumn,
      colSpan: Math.max(1, endColumnExclusive - startColumn),
    }
  }

  const sprintCount = sprintLayout.length
  const startRatio = module.sprintStart / ROADMAP_BASE_SPRINT_COUNT
  const endRatio = (module.sprintEnd + 1) / ROADMAP_BASE_SPRINT_COUNT
  let mappedStartIndex = Math.min(sprintCount - 1, Math.max(0, Math.floor(startRatio * sprintCount)))
  let mappedEndExclusive = Math.min(sprintCount, Math.max(mappedStartIndex + 1, Math.ceil(endRatio * sprintCount)))

  if (module.status === "in-dev" || module.status === "designing") {
    if (currentSprintIndex < mappedStartIndex) {
      mappedStartIndex = currentSprintIndex
    }
    if (currentSprintIndex >= mappedEndExclusive) {
      mappedEndExclusive = Math.min(sprintCount, currentSprintIndex + 1)
    }
    if (mappedEndExclusive <= mappedStartIndex) {
      mappedEndExclusive = Math.min(sprintCount, mappedStartIndex + 1)
    }
  }

  const startSprint = sprintLayout[mappedStartIndex]
  const endSprint = sprintLayout[mappedEndExclusive - 1]
  const startColumn = startSprint.columnStart
  const endColumnExclusive = endSprint.columnStart + endSprint.weekCount
  return {
    startColumn,
    colSpan: Math.max(1, endColumnExclusive - startColumn),
  }
}

function renderSprintRow(sprintLayout) {
  return sprintLayout.map(sprint => `
    <div class="rr-roadmap-sprint-cell${sprint.isCurrent ? " is-current" : ""}" style="grid-column:${sprint.columnStart} / span ${sprint.weekCount};">
      ${sprint.isCurrent ? '<span class="rr-roadmap-sprint-dot" aria-hidden="true"></span>' : ""}
      <span class="rr-roadmap-sprint-label">Sprint ${sprint.sprintNo}</span>
    </div>
  `).join("")
}

function renderWeeksRow(sprintLayout) {
  return sprintLayout.flatMap(sprint => sprint.weekStarts.map(weekStart => `
    <div class="rr-roadmap-week-cell${sprint.isCurrent ? " is-current" : ""}">
      <span class="rr-roadmap-week-label">${formatDateShort(weekStart)}</span>
    </div>
  `)).join("")
}

function renderTimelineHeader(sprintLayout, totalWeekColumns) {
  const gridTemplate = `repeat(${totalWeekColumns}, var(--rr-roadmap-week-col-width))`
  return `
    <div class="rr-roadmap-timeline-header">
      <div style="display:flex;flex-direction:row;min-width:min-content;width:max-content;">
        <div class="rr-roadmap-track-header-spacer" style="display:flex;flex-direction:column;">
          <div class="rr-roadmap-track-header-spacer-top"></div>
          <div class="rr-roadmap-track-header-spacer-bottom"></div>
        </div>
        <div style="display:flex;flex-direction:column;">
          <div class="rr-roadmap-sprint-headers-row" style="grid-template-columns:${gridTemplate};">
            ${renderSprintRow(sprintLayout)}
          </div>
          <div class="rr-roadmap-weeks-row" style="grid-template-columns:${gridTemplate};">
            ${renderWeeksRow(sprintLayout)}
          </div>
        </div>
      </div>
    </div>
  `
}

function renderModule(module, sprintLayout, currentSprintIndex, totalWeekColumns, options = {}) {
  const { moduleKey = "", isSnapshotView = false, moduleResizeOverrides = {}, moduleDragOverrides = {}, trackName = "" } = options
  const color = STATUS_COLORS[module.status] || STATUS_COLORS["to-do"]
  const isDraggable = isSnapshotView && module.status !== "completed"
  const isResizable = module.status !== "completed"
  const resizeHandlesHtml = (isSnapshotView && isResizable)
    ? '<div class="rr-roadmap-module-resize-handle rr-roadmap-module-resize-handle--left" data-action="resize-roadmap-module-left" aria-hidden="true"></div><div class="rr-roadmap-module-resize-handle rr-roadmap-module-resize-handle--right" data-action="resize-roadmap-module-right" aria-hidden="true"></div>'
    : ""
  const subtleBackground = getSubtleSolidColor(color)
  const mappedColumns = mapModuleToColumns(module, sprintLayout, currentSprintIndex)
  
  // Apply drag overrides first (they take precedence)
  const dragOverride = isSnapshotView ? moduleDragOverrides[moduleKey] : null
  let startColumn, colSpan, gridRow
  
  if (dragOverride) {
    startColumn = dragOverride.startColumn
    colSpan = dragOverride.colSpan
    gridRow = dragOverride.gridRow
  } else {
    // Otherwise apply resize overrides
    const resizeOverride = isSnapshotView ? moduleResizeOverrides[moduleKey] : null
    startColumn = Number.isFinite(resizeOverride?.startColumn) ? resizeOverride.startColumn : mappedColumns.startColumn
    const maxSpan = Math.max(1, totalWeekColumns - startColumn + 1)
    const requestedSpan = Number.isFinite(resizeOverride?.colSpan) ? resizeOverride.colSpan : mappedColumns.colSpan
    colSpan = Math.max(1, Math.min(maxSpan, requestedSpan))
    gridRow = undefined
  }
  
  const draggableAttr = isDraggable ? 'data-draggable-module="true"' : ""

  const gridRowStyle = Number.isFinite(Number(gridRow)) ? `grid-row:${Number(gridRow)};` : ""

  return `
    <div class="rr-roadmap-module rr-roadmap-module--${escapeHtml(module.status)}" data-module-key="${escapeHtml(moduleKey)}" data-module-start="${startColumn}" data-module-span="${colSpan}" data-module-total-cols="${totalWeekColumns}" data-module-track="${escapeHtml(trackName)}" ${draggableAttr} style="grid-column:${startColumn} / span ${colSpan}; ${gridRowStyle} --rr-roadmap-module-color:${color}; background-color:${subtleBackground};">
      ${resizeHandlesHtml}
      <span class="rr-roadmap-module-text">${escapeHtml(module.id)} · ${escapeHtml(module.title)}</span>
    </div>
  `
}

function renderTrack(trackLabel, modules, sprintLayout, totalWeekColumns, currentSprintStart, currentSprintSpan, currentSprintIndex, options = {}) {
  const { isSnapshotView = false, moduleResizeOverrides = {}, moduleDragOverrides = {} } = options
  const trackKey = trackLabel.toLowerCase()
  const moduleBars = modules.map((module, index) => renderModule(module, sprintLayout, currentSprintIndex, totalWeekColumns, {
    moduleKey: `${trackKey}-${module.id}-${index}`,
    isSnapshotView,
    moduleResizeOverrides,
    moduleDragOverrides,
    trackName: trackLabel,
  })).join("")
  const gridTemplate = `repeat(${totalWeekColumns}, var(--rr-roadmap-week-col-width))`
  const trackClass = trackLabel.toLowerCase() === "development" ? "rr-roadmap-track--development" : "rr-roadmap-track--design"

  return `
    <div class="rr-roadmap-track ${trackClass}" data-track="${trackKey}">
      <div class="rr-roadmap-track-header">
        <span class="rr-roadmap-track-label">${escapeHtml(trackLabel)}</span>
      </div>
      <div class="rr-roadmap-track-grid" style="grid-template-columns:${gridTemplate}; --rr-current-col-start:${currentSprintStart}; --rr-current-col-span:${currentSprintSpan};">
        ${moduleBars}
      </div>
    </div>
  `
}

function renderTeamAvatars(team, options = {}) {
  const { avatarClass = "rr-roadmap-avatar", groupClass = "rr-roadmap-avatars" } = options
  const avatarHtml = team.map(user => {
    const image = String(user.image || "").trim()
    if (image) {
      return `
        <div class="${avatarClass}" title="${escapeHtml(user.name)}">
          <img alt="${escapeHtml(user.name)}" src="${image}" />
        </div>
      `
    }

    return `
      <div class="${avatarClass}" title="${escapeHtml(user.name)}">
        <span class="rr-roadmap-avatar-fallback">${escapeHtml(getInitials(user.name))}</span>
      </div>
    `
  }).join("")

  return `<div class="${groupClass}">${avatarHtml}</div>`
}

function renderRoadmapMemberPicker(draftSettings) {
  const selectedIds = new Set(draftSettings.team.map(member => member.id))
  const availableMembers = TEAM.filter(member => !selectedIds.has(member.id))

  if (availableMembers.length === 0) {
    return `
      <div class="rr-roadmap-member-picker" role="listbox" aria-label="Select team member">
        <p class="rr-roadmap-member-picker-empty">All users are already in this team</p>
      </div>
    `
  }

  return `
    <div class="rr-roadmap-member-picker" role="listbox" aria-label="Select team member">
      ${availableMembers.map(member => {
        const image = String(member.image || "").trim()
        const avatar = image
          ? `<img alt="" src="${image}" />`
          : `<span class="rr-roadmap-avatar-fallback">${escapeHtml(getInitials(member.name))}</span>`

        return `
          <button type="button" class="rr-roadmap-member-picker-item" data-action="select-team-member" data-member-id="${escapeHtml(member.id)}" role="option" aria-label="Add ${escapeHtml(member.name)}">
            <span class="rr-roadmap-avatar rr-roadmap-avatar--picker">${avatar}</span>
            <span class="rr-roadmap-member-picker-name">${escapeHtml(member.name)}</span>
          </button>
        `
      }).join("")}
    </div>
  `
}

function renderRoadmapSettingsModal(draftSettings, memberPickerOpen = false) {
  if (!draftSettings) return ""
  const sprintLabel = `${draftSettings.sprintDurationWeeks} week${draftSettings.sprintDurationWeeks > 1 ? "s" : ""}`

  return `
    <div class="rr-roadmap-settings-overlay" data-action="close-roadmap-settings">
      <div class="rr-roadmap-settings-modal" role="dialog" aria-modal="true" aria-label="Project settings">
        <div class="rr-roadmap-settings-header">
          <p class="rr-roadmap-settings-title">GivePayments Project Settings</p>
          <button type="button" class="rr-roadmap-settings-close" data-action="close-roadmap-settings" aria-label="Close settings">
            <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M4.05 3.1L9 8.06L13.95 3.1L14.9 4.05L9.95 9L14.9 13.95L13.95 14.9L9 9.94L4.05 14.9L3.1 13.95L8.05 9L3.1 4.05L4.05 3.1Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="rr-roadmap-settings-body">
          <label class="rr-roadmap-settings-field">
            <span class="rr-roadmap-settings-label">Project start date</span>
            <span class="rr-roadmap-settings-input-wrap">
              <input type="date" class="rr-roadmap-settings-input" data-setting="projectStartDate" value="${escapeHtml(draftSettings.projectStartDate)}" />
            </span>
          </label>

          <label class="rr-roadmap-settings-field">
            <span class="rr-roadmap-settings-label">Project end date</span>
            <span class="rr-roadmap-settings-input-wrap">
              <input type="date" class="rr-roadmap-settings-input" data-setting="projectEndDate" value="${escapeHtml(draftSettings.projectEndDate)}" />
            </span>
          </label>

          <label class="rr-roadmap-settings-field">
            <span class="rr-roadmap-settings-label">Sprint duration</span>
            <span class="rr-roadmap-settings-input-wrap rr-roadmap-settings-input-wrap--select">
              <select class="rr-roadmap-settings-select" data-setting="sprintDurationWeeks" aria-label="Sprint duration">
                <option value="1"${draftSettings.sprintDurationWeeks === 1 ? " selected" : ""}>1 week</option>
                <option value="2"${draftSettings.sprintDurationWeeks === 2 ? " selected" : ""}>2 weeks</option>
                <option value="3"${draftSettings.sprintDurationWeeks === 3 ? " selected" : ""}>3 weeks</option>
              </select>
              <span class="rr-roadmap-settings-select-text" aria-hidden="true">${escapeHtml(sprintLabel)}</span>
              <svg viewBox="0 0 20 20" width="20" height="20" class="rr-roadmap-settings-select-caret" aria-hidden="true" focusable="false">
                <path d="M4.375 7.5L10 13.125L15.625 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </label>

          <div class="rr-roadmap-settings-field">
            <span class="rr-roadmap-settings-label">Team members</span>
            <div class="rr-roadmap-modal-team-row">
              ${renderTeamAvatars(draftSettings.team, { avatarClass: "rr-roadmap-avatar rr-roadmap-avatar--modal", groupClass: "rr-roadmap-avatars rr-roadmap-avatars--modal" })}
              <button type="button" class="rr-roadmap-avatar-add" data-action="toggle-team-member-picker" aria-label="Add team member" aria-expanded="${memberPickerOpen ? "true" : "false"}" aria-haspopup="listbox">
                <span>+</span>
              </button>
              ${memberPickerOpen ? renderRoadmapMemberPicker(draftSettings) : ""}
            </div>
          </div>
        </div>

        <div class="rr-add-issue-footer rr-roadmap-settings-footer">
          <rr-button variant="neutral" size="sm" data-action="cancel-roadmap-settings">Cancel</rr-button>
          <rr-button variant="primary" size="sm" data-action="save-roadmap-settings">Save</rr-button>
        </div>
      </div>
    </div>
  `
}

function renderRoadmapSnapshotModal(contentHtml) {
  return `
    <div class="rr-roadmap-snapshot-overlay" data-action="close-roadmap-snapshot-modal">
      <div class="rr-roadmap-snapshot-modal" role="dialog" aria-modal="true" aria-label="Roadmap snapshot">
        <div class="rr-roadmap-snapshot-header">
          <p class="rr-roadmap-snapshot-title">Roadmap Snapshot</p>

          <button type="button" class="rr-roadmap-snapshot-icon-btn" aria-label="Export snapshot image" title="Export snapshot image">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="${ROADMAP_SNAPSHOT_IMAGE_ICON_PATH}" fill="#14161B"/>
            </svg>
          </button>

          <button type="button" class="rr-roadmap-snapshot-icon-btn" aria-label="Export snapshot PDF" title="Export snapshot PDF">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="${ROADMAP_SNAPSHOT_PDF_ICON_PATH}" fill="#14161B"/>
            </svg>
          </button>

          <button type="button" class="rr-roadmap-snapshot-icon-btn" aria-label="Save snapshot" title="Save snapshot">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="${ROADMAP_SNAPSHOT_SAVE_ICON_PATH}" fill="#14161B"/>
            </svg>
          </button>

          <button type="button" class="rr-roadmap-snapshot-icon-btn rr-roadmap-snapshot-icon-btn--close" data-action="close-roadmap-snapshot-modal" aria-label="Close snapshot" title="Close snapshot">
            <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M4.05 3.1L9 8.06L13.95 3.1L14.9 4.05L9.95 9L14.9 13.95L13.95 14.9L9 9.94L4.05 14.9L3.1 13.95L8.05 9L3.1 4.05L4.05 3.1Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        ${contentHtml}
      </div>
    </div>
  `
}

function renderRoadmapMainContent(state, sprintData, options = {}) {
  const { viewKey = "main", isSnapshotView = false } = options
  const { layout, totalWeekColumns, currentSprintIndex, currentSprintStart, currentSprintSpan } = sprintData
  const sprintDuration = Number(state.settings.sprintDurationWeeks) || 3
  const placeholderStartNo = Math.max(1, ROADMAP_SPRINT_START_NO - ROADMAP_HISTORY_SPRINTS_COUNT)
  const placeholderEndNo = ROADMAP_SPRINT_START_NO - 1
  let developmentModules = [
    ...buildPlaceholderModules("DEV", placeholderStartNo, placeholderEndNo),
    ...DEV_MODULES,
  ]
  let designModules = [
    ...buildPlaceholderModules("DSN", placeholderStartNo, placeholderEndNo),
    ...DESIGN_MODULES,
  ]

  // Handle module drag overrides - move modules between tracks in snapshot view
  if (isSnapshotView && Object.keys(state.moduleDragOverrides).length > 0) {
    const draggedModulesToMove = []
    
    // Find which modules need to be moved between tracks
    for (const [moduleKey, dragOverride] of Object.entries(state.moduleDragOverrides)) {
      if (!dragOverride.track) continue
      const keyParts = moduleKey.split("-")
      const currentTrackKey = keyParts[0]
      const targetTrackKey = dragOverride.track.toLowerCase()
      
      // If track changed, mark for movement
      if (currentTrackKey !== targetTrackKey) {
        draggedModulesToMove.push({ moduleKey, currentTrackKey, targetTrackKey, dragOverride })
      }
    }
    
    // Move modules between tracks
    for (const { moduleKey, currentTrackKey, targetTrackKey } of draggedModulesToMove) {
      if (currentTrackKey === "development") {
        // Find and move from Development to Design
        for (let i = developmentModules.length - 1; i >= 0; i--) {
          const module = developmentModules[i]
          const testKey = `development-${module.id}-${i}`
          // Match based on module ID and approximate position
          if (module.id && moduleKey.includes(module.id)) {
            designModules.push(module)
            developmentModules.splice(i, 1)
            break
          }
        }
      } else if (currentTrackKey === "design") {
        // Find and move from Design to Development
        for (let i = designModules.length - 1; i >= 0; i--) {
          const module = designModules[i]
          if (module.id && moduleKey.includes(module.id)) {
            developmentModules.push(module)
            designModules.splice(i, 1)
            break
          }
        }
      }
    }
  }

  return `
    <section class="rr-roadmap${isSnapshotView ? " rr-roadmap--snapshot" : ""}" data-flow="roadmap" style="--rr-roadmap-sprint-duration-weeks:${sprintDuration};">
      <div class="rr-roadmap-header">
        <div class="rr-roadmap-header-left">
          <p class="rr-roadmap-dates">Project dates: ${formatDateShortWithYear(state.settings.projectStartDate)} - ${formatDateShortWithYear(state.settings.projectEndDate)}</p>
        </div>
        <div class="rr-roadmap-header-right">
          <p class="rr-roadmap-team-count">${state.settings.team.length} team members</p>
          ${renderTeamAvatars(state.settings.team)}
        </div>
      </div>

      <div class="rr-roadmap-container" data-roadmap-view="${viewKey}" data-current-col-start="${currentSprintStart}" data-current-col-span="${currentSprintSpan}">
        ${renderTimelineHeader(layout, totalWeekColumns)}
        ${renderTrack("Development", developmentModules, layout, totalWeekColumns, currentSprintStart, currentSprintSpan, currentSprintIndex, { isSnapshotView, moduleResizeOverrides: state.moduleResizeOverrides, moduleDragOverrides: state.moduleDragOverrides })}
        ${renderTrack("Design", designModules, layout, totalWeekColumns, currentSprintStart, currentSprintSpan, currentSprintIndex, { isSnapshotView, moduleResizeOverrides: state.moduleResizeOverrides, moduleDragOverrides: state.moduleDragOverrides })}
      </div>
    </section>
  `
}

function buildView(state) {
  const sprintData = buildSprintLayout(state.settings)
  const mainContent = renderRoadmapMainContent(state, sprintData, { viewKey: "main" })
  const snapshotModal = state.isSnapshotModalOpen
    ? renderRoadmapSnapshotModal(renderRoadmapMainContent(state, sprintData, { viewKey: "snapshot", isSnapshotView: true }))
    : ""

  return `
    ${mainContent}
    ${state.isModalOpen ? renderRoadmapSettingsModal(state.draftSettings, state.memberPickerOpen) : ""}
    ${snapshotModal}
  `
}

function createInitialState() {
  return {
    settings: normalizeSettings({
      projectStartDate: DEFAULT_START_DATE,
      projectEndDate: DEFAULT_END_DATE,
      sprintDurationWeeks: 3,
      team: TEAM,
    }),
    draftSettings: null,
    isModalOpen: false,
    memberPickerOpen: false,
    isSnapshotDropdownOpen: false,
    isSnapshotModalOpen: false,
    snapshotModalScrollLeft: 0,
    moduleResizeOverrides: {},
    moduleDragOverrides: {},
  }
}

export async function renderRoadmapFlow() {
  return buildView(createInitialState())
}

export function mountRoadmapFlow() {
  const root = document.querySelector('[data-flow="roadmap"]')
  if (!root) return undefined

  const tabHeaderActions = document.querySelector("#rr-tab-sprint-header")
  const state = createInitialState()
  let hasAutoScrolled = false

  function renderHeaderActions() {
    if (!tabHeaderActions) return
    tabHeaderActions.innerHTML = renderRoadmapHeaderActions(state.isSnapshotDropdownOpen)
  }

  function render() {
    const previousMainContainer = root.querySelector('.rr-roadmap-container[data-roadmap-view="main"]')
    const previousMainScrollLeft = previousMainContainer ? previousMainContainer.scrollLeft : 0
    root.innerHTML = buildView(state)

    const nextMainContainer = root.querySelector('.rr-roadmap-container[data-roadmap-view="main"]')
    const snapshotContainer = root.querySelector('.rr-roadmap-container[data-roadmap-view="snapshot"]')

    if (nextMainContainer && hasAutoScrolled) {
      nextMainContainer.scrollLeft = previousMainScrollLeft
    }

    if (snapshotContainer && state.isSnapshotModalOpen) {
      snapshotContainer.scrollLeft = state.snapshotModalScrollLeft
    }

    if (!hasAutoScrolled) {
      if (nextMainContainer) {
        setTimeout(() => {
          const currentColStart = Number(nextMainContainer.dataset.currentColStart || "1")
          const currentColSpan = Number(nextMainContainer.dataset.currentColSpan || "1")
          const roadmapEl = root.querySelector(".rr-roadmap")
          const weekColWidthRaw = roadmapEl
            ? getComputedStyle(roadmapEl).getPropertyValue("--rr-roadmap-week-col-width")
            : "88"
          const weekColWidth = Number.parseFloat(weekColWidthRaw) || 88

          const currentCenterX = ((currentColStart - 1) + (currentColSpan / 2)) * weekColWidth
          const targetScrollLeft = Math.max(0, currentCenterX - (nextMainContainer.clientWidth / 2))
          nextMainContainer.scrollLeft = targetScrollLeft
        }, 100)
      }
      hasAutoScrolled = true
    }
  }

  function commitDraftSettings() {
    if (!state.draftSettings) return
    state.settings = normalizeSettings(state.draftSettings)
  }

  function openSettingsModal() {
    state.isSnapshotDropdownOpen = false
    renderHeaderActions()
    state.draftSettings = deepCloneSettings(state.settings)
    state.isModalOpen = true
    state.memberPickerOpen = false
    render()
  }

  function openSnapshotModal() {
    const mainContainer = root.querySelector('.rr-roadmap-container[data-roadmap-view="main"]')
    state.snapshotModalScrollLeft = mainContainer ? mainContainer.scrollLeft : 0
    state.isSnapshotDropdownOpen = false
    state.isSnapshotModalOpen = true
    state.moduleResizeOverrides = {}
    state.moduleDragOverrides = {}
    renderHeaderActions()
    render()
  }

  function closeSnapshotModal() {
    if (!state.isSnapshotModalOpen) return
    stopModuleResize()
    stopModuleDrag()
    state.isSnapshotModalOpen = false
    render()
  }

  let moduleResizeState = null
  let previousUserSelectValue = ""
  let previousCursorValue = ""

  function stopModuleResize() {
    if (!moduleResizeState) return
    moduleResizeState.moduleEl.classList.remove("is-resizing")
    moduleResizeState = null
    document.removeEventListener("mousemove", handleModuleResizeMove)
    document.removeEventListener("mouseup", handleModuleResizeUp)
    document.body.style.userSelect = previousUserSelectValue
    document.body.style.cursor = previousCursorValue
  }

  function applyModuleSpan(moduleStart, moduleSpan) {
    if (!moduleResizeState) return
    const safeStart = Math.max(1, Math.min(moduleResizeState.totalCols, moduleStart))
    const safeSpan = Math.max(1, Math.min(moduleResizeState.totalCols - safeStart + 1, moduleSpan))
    moduleResizeState.moduleEl.style.gridColumn = `${safeStart} / span ${safeSpan}`
    moduleResizeState.moduleEl.dataset.moduleStart = String(safeStart)
    moduleResizeState.moduleEl.dataset.moduleSpan = String(safeSpan)
    state.moduleResizeOverrides[moduleResizeState.moduleKey] = {
      startColumn: safeStart,
      colSpan: safeSpan,
    }
  }

  function handleModuleResizeMove(event) {
    if (!moduleResizeState) return
    const deltaX = event.clientX - moduleResizeState.startClientX
    const deltaCols = Math.round(deltaX / moduleResizeState.weekColumnWidth)

    if (moduleResizeState.side === "right") {
      const nextSpan = moduleResizeState.startColSpan + deltaCols
      applyModuleSpan(moduleResizeState.startColumn, nextSpan)
      return
    }

    const endExclusive = moduleResizeState.startColumn + moduleResizeState.startColSpan
    const nextStart = Math.max(1, Math.min(endExclusive - 1, moduleResizeState.startColumn + deltaCols))
    const nextSpan = endExclusive - nextStart
    applyModuleSpan(nextStart, nextSpan)
  }

  function handleModuleResizeUp() {
    stopModuleResize()
  }

  /* ── Drag handlers ────────────────────────────────────────── */
  let moduleDragState = null
  let dragPreviousUserSelectValue = ""
  let dragPreviousCursorValue = ""

  function stopModuleDrag() {
    if (!moduleDragState) return
    // Remove ghost
    if (moduleDragState.ghostEl) {
      moduleDragState.ghostEl.remove()
    }
    // Remove drop indicator
    if (moduleDragState.dropIndicatorEl) {
      moduleDragState.dropIndicatorEl.remove()
    }
    // Restore original tile
    moduleDragState.moduleEl.style.visibility = ""
    moduleDragState = null
    document.removeEventListener("mousemove", handleModuleDragMove)
    document.removeEventListener("mouseup", handleModuleDragUp)
    document.body.style.userSelect = dragPreviousUserSelectValue
    document.body.style.cursor = dragPreviousCursorValue
  }

  function updateDropIndicator(target) {
    if (!moduleDragState) return
    const { nextStartColumn, nextColSpan, nextTrack, nextGridRow } = target

    // Find the grid that belongs to the target track
    const dragRoot = moduleDragState.dragRootEl || root
    const tracks = dragRoot.querySelectorAll('.rr-roadmap-track')
    let targetGrid = null
    for (const track of tracks) {
      const label = track.querySelector('.rr-roadmap-track-label')
      const trackName = label ? label.textContent.trim() : ""
      if (trackName === nextTrack) {
        targetGrid = track.querySelector('.rr-roadmap-track-grid')
        break
      }
    }
    if (!targetGrid) return

    // Create indicator on first use
    if (!moduleDragState.dropIndicatorEl) {
      const ind = document.createElement("div")
      ind.className = "rr-roadmap-module-drop-indicator"
      targetGrid.appendChild(ind)
      moduleDragState.dropIndicatorEl = ind
      moduleDragState.dropIndicatorGrid = targetGrid
    }

    const ind = moduleDragState.dropIndicatorEl

    // Move to a different grid if track changed
    if (moduleDragState.dropIndicatorGrid !== targetGrid) {
      targetGrid.appendChild(ind)
      moduleDragState.dropIndicatorGrid = targetGrid
    }

    // Keep indicator in the same row as the dragged module's slot.
    ind.style.gridRow = String(nextGridRow)
    ind.style.gridColumn = `${nextStartColumn} / span ${nextColSpan}`
    ind.style.height = `${moduleDragState.tileHeight}px`
  }

  function calcDropTarget(clientX, clientY) {
    if (!moduleDragState) return null

    // Determine target track
    const dragRoot = moduleDragState.dragRootEl || root
    const tracks = dragRoot.querySelectorAll('.rr-roadmap-track')
    let nextTrack = moduleDragState.track
    for (const track of tracks) {
      const rect = track.getBoundingClientRect()
      if (clientY >= rect.top && clientY <= rect.bottom) {
        const label = track.querySelector('.rr-roadmap-track-label')
        nextTrack = label ? label.textContent.trim() : nextTrack
        break
      }
    }

    // Determine target grid column by finding the track grid under the cursor
    let nextStartColumn = moduleDragState.nextStartColumn
    const trackGrids = dragRoot.querySelectorAll('.rr-roadmap-track-grid')
    for (const grid of trackGrids) {
      const gridRect = grid.getBoundingClientRect()
      if (clientX >= gridRect.left && clientX <= gridRect.right) {
        const relX = clientX - gridRect.left
        const deltaCols = Math.round(relX / moduleDragState.weekColumnWidth)
        // Anchor the column so the grab offset is preserved
        const anchorCol = Math.round(moduleDragState.grabOffsetX / moduleDragState.weekColumnWidth)
        nextStartColumn = Math.max(1, Math.min(
          moduleDragState.totalCols - moduleDragState.colSpan + 1,
          deltaCols - anchorCol + 1
        ))
        break
      }
    }

    const maxSpan = Math.max(1, moduleDragState.totalCols - nextStartColumn + 1)
    const nextColSpan = Math.min(moduleDragState.colSpan, maxSpan)
    const nextGridRow = findFirstAvailableRow(nextTrack, nextStartColumn, nextColSpan)
    if (!nextGridRow) {
      return {
        nextStartColumn: moduleDragState.nextStartColumn,
        nextColSpan: moduleDragState.nextColSpan,
        nextTrack: moduleDragState.nextTrack,
        nextGridRow: moduleDragState.nextGridRow,
      }
    }
    return { nextStartColumn, nextColSpan, nextTrack, nextGridRow }
  }

  function columnsOverlap(startA, spanA, startB, spanB) {
    const endA = startA + spanA - 1
    const endB = startB + spanB - 1
    return !(endA < startB || endB < startA)
  }

  function getTrackGridByName(trackName) {
    const dragRoot = moduleDragState?.dragRootEl || root
    const tracks = dragRoot.querySelectorAll('.rr-roadmap-track')
    for (const track of tracks) {
      const label = track.querySelector('.rr-roadmap-track-label')
      const name = label ? label.textContent.trim() : ""
      if (name === trackName) {
        return track.querySelector('.rr-roadmap-track-grid')
      }
    }
    return null
  }

  function findFirstAvailableRow(trackName, nextStartColumn, nextColSpan) {
    const grid = getTrackGridByName(trackName)
    if (!grid) return null

    const gridStyle = getComputedStyle(grid)
    const rowGap = Number.parseFloat(gridStyle.rowGap) || 0
    const paddingTop = Number.parseFloat(gridStyle.paddingTop) || 0
    const paddingBottom = Number.parseFloat(gridStyle.paddingBottom) || 0
    const tileHeight = Math.max(1, moduleDragState.tileHeight || 48)
    const availableHeight = Math.max(0, grid.clientHeight - paddingTop - paddingBottom)
    const maxRowsBySpace = Math.max(1, Math.floor((availableHeight + rowGap) / (tileHeight + rowGap)))

    const modules = Array.from(grid.querySelectorAll('.rr-roadmap-module'))
      .filter(el => el !== moduleDragState.moduleEl)

    const occupiedByRow = new Map()
    for (const el of modules) {
      const row = Number.parseInt(getComputedStyle(el).gridRowStart, 10) || 1
      const start = Number(el.dataset.moduleStart || "1")
      const span = Number(el.dataset.moduleSpan || "1")
      if (!occupiedByRow.has(row)) occupiedByRow.set(row, [])
      occupiedByRow.get(row).push({ start, span })
    }

    for (let row = 1; row <= maxRowsBySpace; row += 1) {
      const rowItems = occupiedByRow.get(row) || []
      const collides = rowItems.some(item => columnsOverlap(nextStartColumn, nextColSpan, item.start, item.span))
      if (!collides) return row
    }

    return null
  }

  function handleModuleDragMove(event) {
    if (!moduleDragState) return

    // Move ghost freely with the mouse
    const ghostEl = moduleDragState.ghostEl
    ghostEl.style.left = `${event.clientX - moduleDragState.grabOffsetX}px`
    ghostEl.style.top  = `${event.clientY - moduleDragState.grabOffsetY}px`

    // Compute snapped target (for drop indicator and state)
    const target = calcDropTarget(event.clientX, event.clientY)
    if (!target) return
    moduleDragState.nextStartColumn = target.nextStartColumn
    moduleDragState.nextColSpan     = target.nextColSpan
    moduleDragState.nextTrack       = target.nextTrack
    moduleDragState.nextGridRow     = target.nextGridRow
    updateDropIndicator(target)
  }

  function handleModuleDragUp() {
    if (!moduleDragState) return

    const oldTrackKey   = moduleDragState.track.toLowerCase()
    const newTrackKey   = moduleDragState.nextTrack.toLowerCase()
    const oldModuleKey  = `${oldTrackKey}-${moduleDragState.moduleId}-${moduleDragState.moduleIndex}`
    const finalModuleKey = `${newTrackKey}-${moduleDragState.moduleId}-${moduleDragState.moduleIndex}`

    const moved =
      moduleDragState.nextTrack       !== moduleDragState.track ||
      moduleDragState.nextStartColumn !== moduleDragState.startColumn ||
      moduleDragState.nextColSpan     !== moduleDragState.colSpan ||
      moduleDragState.nextGridRow     !== moduleDragState.gridRow

    if (moved) {
      // Clean up old key when track changes
      if (moduleDragState.nextTrack !== moduleDragState.track) {
        delete state.moduleDragOverrides[oldModuleKey]
      }
      state.moduleDragOverrides[finalModuleKey] = {
        startColumn: moduleDragState.nextStartColumn,
        colSpan:     moduleDragState.nextColSpan,
        track:       moduleDragState.nextTrack,
        gridRow:     moduleDragState.nextGridRow,
      }
    }

    stopModuleDrag()
    if (moved) render()
  }

  function startModuleDrag(event, moduleEl) {
    if (!state.isSnapshotModalOpen) return
    if (event.button !== 0) return

    const moduleKey  = moduleEl.dataset.moduleKey
    const moduleTrack = moduleEl.dataset.moduleTrack || "Development"
    const startColumn = Number(moduleEl.dataset.moduleStart   || "1")
    const colSpan     = Number(moduleEl.dataset.moduleSpan    || "1")
    const totalCols   = Number(moduleEl.dataset.moduleTotalCols || "1")
    if (!moduleKey) return

    const keyParts   = moduleKey.split("-")
    const moduleIndex = Number(keyParts[keyParts.length - 1]) || 0
    const moduleId   = keyParts.slice(1, -1).join("-")
    const dragRootEl = moduleEl.closest('.rr-roadmap--snapshot') || root

    const roadmapEl = moduleEl.closest(".rr-roadmap")
    const weekColWidthRaw = roadmapEl
      ? getComputedStyle(roadmapEl).getPropertyValue("--rr-roadmap-week-col-width")
      : "88"
    const weekColumnWidth = Number.parseFloat(weekColWidthRaw) || 88

    // Grab offset — where inside the tile the user clicked
    const tileRect = moduleEl.getBoundingClientRect()
    const computedRowStart = Number.parseInt(getComputedStyle(moduleEl).gridRowStart, 10)
    const initialGridRow = Number.isFinite(computedRowStart) && computedRowStart > 0 ? computedRowStart : 1
    const grabOffsetX = event.clientX - tileRect.left
    const grabOffsetY = event.clientY - tileRect.top

    event.preventDefault()
    dragPreviousUserSelectValue = document.body.style.userSelect
    dragPreviousCursorValue     = document.body.style.cursor
    document.body.style.userSelect = "none"
    document.body.style.cursor     = "grabbing"

    // Build a ghost clone that floats freely
    const ghostEl = moduleEl.cloneNode(true)
    ghostEl.classList.add("rr-roadmap-module-drag-ghost")
    ghostEl.style.width  = `${tileRect.width}px`
    ghostEl.style.height = `${tileRect.height}px`
    ghostEl.style.left   = `${tileRect.left}px`
    ghostEl.style.top    = `${tileRect.top}px`
    // Strip resize handles from ghost (already aria-hidden, just keep it clean)
    for (const handle of ghostEl.querySelectorAll(".rr-roadmap-module-resize-handle")) {
      handle.remove()
    }
    document.body.appendChild(ghostEl)

    // Hide the original in-grid tile
    moduleEl.style.visibility = "hidden"

    moduleDragState = {
      moduleEl,
      ghostEl,
      dropIndicatorEl:   null,
      dropIndicatorGrid: null,
      dragRootEl,
      moduleKey,
      moduleId,
      moduleIndex,
      track:           moduleTrack,
      nextTrack:       moduleTrack,
      startColumn,
      nextStartColumn: startColumn,
      colSpan,
      nextColSpan:     colSpan,
      gridRow:         initialGridRow,
      nextGridRow:     initialGridRow,
      totalCols,
      weekColumnWidth,
      grabOffsetX,
      grabOffsetY,
      tileHeight:      tileRect.height,
    }

    // Show dashed target slot immediately on click-and-hold, even before first mousemove.
    updateDropIndicator({
      nextStartColumn: startColumn,
      nextColSpan: colSpan,
      nextTrack: moduleTrack,
      nextGridRow: initialGridRow,
    })

    document.addEventListener("mousemove", handleModuleDragMove)
    document.addEventListener("mouseup",   handleModuleDragUp)
  }

  function startModuleResize(side, event, handleEl) {
    if (!state.isSnapshotModalOpen) return
    if (event.button !== 0) return
    const moduleEl = handleEl.closest(".rr-roadmap-module")
    if (!moduleEl) return
    const snapshotContainer = moduleEl.closest('.rr-roadmap-container[data-roadmap-view="snapshot"]')
    if (!snapshotContainer) return
    const roadmapEl = moduleEl.closest(".rr-roadmap")
    const weekColWidthRaw = roadmapEl
      ? getComputedStyle(roadmapEl).getPropertyValue("--rr-roadmap-week-col-width")
      : "88"
    const weekColumnWidth = Number.parseFloat(weekColWidthRaw) || 88
    const startColumn = Number(moduleEl.dataset.moduleStart || "1")
    const startColSpan = Number(moduleEl.dataset.moduleSpan || "1")
    const totalCols = Number(moduleEl.dataset.moduleTotalCols || "1")
    const moduleKey = moduleEl.dataset.moduleKey
    if (!moduleKey) return

    event.preventDefault()
    previousUserSelectValue = document.body.style.userSelect
    previousCursorValue = document.body.style.cursor
    document.body.style.userSelect = "none"
    document.body.style.cursor = "ew-resize"
    moduleEl.classList.add("is-resizing")

    moduleResizeState = {
      moduleEl,
      moduleKey,
      side,
      startClientX: event.clientX,
      startColumn,
      startColSpan,
      totalCols,
      weekColumnWidth,
    }

    document.addEventListener("mousemove", handleModuleResizeMove)
    document.addEventListener("mouseup", handleModuleResizeUp)
  }

  function closeSnapshotDropdown() {
    if (!state.isSnapshotDropdownOpen) return
    state.isSnapshotDropdownOpen = false
    renderHeaderActions()
  }

  function closeSettingsModal(saveChanges = false) {
    if (saveChanges) {
      commitDraftSettings()
    }

    state.draftSettings = null
    state.isModalOpen = false
    state.memberPickerOpen = false
    render()
  }

  function handleHeaderClick(event) {
    const action = event.target.closest("[data-action]")?.dataset.action
    if (action === "toggle-roadmap-snapshot-dropdown") {
      state.isSnapshotDropdownOpen = !state.isSnapshotDropdownOpen
      renderHeaderActions()
      return
    }

    if (action === "create-roadmap-snapshot" || action === "select-roadmap-snapshot") {
      if (action === "create-roadmap-snapshot") {
        openSnapshotModal()
        return
      }

      closeSnapshotDropdown()
      return
    }

    if (action === "open-roadmap-settings") {
      openSettingsModal()
    }
  }

  function handleDocumentClick(event) {
    if (!state.isSnapshotDropdownOpen || !tabHeaderActions) return
    const clickPath = typeof event.composedPath === "function" ? event.composedPath() : []
    if (clickPath.includes(tabHeaderActions)) return
    closeSnapshotDropdown()
  }

  function handleRootClick(event) {
    const actionEl = event.target.closest("[data-action]")
    if (!actionEl) return

    const action = actionEl.dataset.action
    if (action === "cancel-roadmap-settings") {
      closeSettingsModal(false)
      return
    }

    if (action === "save-roadmap-settings") {
      closeSettingsModal(true)
      return
    }

    if (action === "toggle-team-member-picker" && state.draftSettings) {
      state.memberPickerOpen = !state.memberPickerOpen
      render()
      return
    }

    if (action === "select-team-member" && state.draftSettings) {
      const memberId = actionEl.dataset.memberId
      const nextMember = TEAM.find(member => member.id === memberId)
      const exists = state.draftSettings.team.some(member => member.id === memberId)

      if (nextMember && !exists) {
        state.draftSettings.team.push({ ...nextMember })
      }

      state.memberPickerOpen = false
      render()
      return
    }

    if (action === "close-roadmap-settings") {
      if (actionEl.classList.contains("rr-roadmap-settings-modal")) return
      if (actionEl.classList.contains("rr-roadmap-settings-overlay") && event.target !== actionEl) return
      closeSettingsModal(false)
      return
    }

    if (action === "close-roadmap-snapshot-modal") {
      if (actionEl.classList.contains("rr-roadmap-snapshot-modal")) return
      if (actionEl.classList.contains("rr-roadmap-snapshot-overlay") && event.target !== actionEl) return
      closeSnapshotModal()
      return
    }

    if (state.memberPickerOpen) {
      const clickedInsidePicker = Boolean(event.target.closest(".rr-roadmap-member-picker"))
      const clickedPickerToggle = Boolean(event.target.closest('[data-action="toggle-team-member-picker"]'))
      if (!clickedInsidePicker && !clickedPickerToggle) {
        state.memberPickerOpen = false
        render()
      }
    }
  }

  function handleRootMouseDown(event) {
    if (!state.isSnapshotModalOpen) return
    const actionEl = event.target.closest("[data-action]")
    if (actionEl) {
      const action = actionEl.dataset.action
      if (action === "resize-roadmap-module-left") {
        startModuleResize("left", event, actionEl)
        return
      }
      if (action === "resize-roadmap-module-right") {
        startModuleResize("right", event, actionEl)
        return
      }
    }
    
    // Check for draggable module click (but not on resize handles)
    const moduleEl = event.target.closest("[data-draggable-module]")
    if (moduleEl && !event.target.closest(".rr-roadmap-module-resize-handle")) {
      startModuleDrag(event, moduleEl)
    }
  }

  function handleRootChange(event) {
    if (!state.draftSettings) return
    const target = event.target
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return
    const setting = target.dataset.setting

    if (setting === "projectStartDate") {
      state.draftSettings.projectStartDate = target.value
      return
    }

    if (setting === "projectEndDate") {
      state.draftSettings.projectEndDate = target.value
      return
    }

    if (setting === "sprintDurationWeeks") {
      state.draftSettings.sprintDurationWeeks = Number(target.value)
      render()
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && state.isSnapshotModalOpen) {
      closeSnapshotModal()
      return
    }

    if (event.key === "Escape" && state.isModalOpen) {
      closeSettingsModal(false)
    }
  }

  if (tabHeaderActions) {
    renderHeaderActions()
    tabHeaderActions.addEventListener("click", handleHeaderClick)
  }

  root.addEventListener("click", handleRootClick)
  root.addEventListener("mousedown", handleRootMouseDown)
  root.addEventListener("change", handleRootChange)
  document.addEventListener("keydown", handleKeyDown)
  document.addEventListener("click", handleDocumentClick)
  render()

  return function unmount() {
    root.removeEventListener("click", handleRootClick)
    root.removeEventListener("mousedown", handleRootMouseDown)
    root.removeEventListener("change", handleRootChange)
    stopModuleResize()
    stopModuleDrag()
    document.removeEventListener("keydown", handleKeyDown)
    document.removeEventListener("click", handleDocumentClick)

    if (tabHeaderActions) {
      tabHeaderActions.removeEventListener("click", handleHeaderClick)
      tabHeaderActions.innerHTML = ""
    }
  }
}
