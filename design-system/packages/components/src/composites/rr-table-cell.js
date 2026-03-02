import { escapeHtml, getBooleanAttribute, normalizeOption, parseNumberAttribute, rrBaseStyles } from "../internal/theme.js"
import rrTableCellStyles from "./rr-table-cell.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=214-0&m=dev"
const VALID_VARIANTS = [
  "default",
  "add-record",
  "progress",
  "checkbox",
  "radio",
  "toggle",
  "rating",
  "avatar",
  "avatar-group",
  "icon-button",
  "button",
  "priority",
  "badge",
  "status",
  "tc-status",
  "badge-square",
  "scope",
  "roadmap",
  "module"
]
const VALID_STATES = ["default", "hover", "disabled", "hover-blue"]
const STYLES = `${rrBaseStyles}\n${rrTableCellStyles}`

function normalizeState(rawState, variant) {
  const candidate = normalizeOption(rawState || "default", VALID_STATES, "default")
  if (candidate === "hover-blue" && variant !== "default") {
    return "hover"
  }
  return candidate
}

function clampPercent(value) {
  const parsed = Number.parseInt(String(value ?? "60"), 10)
  if (Number.isNaN(parsed)) {
    return 60
  }
  return Math.min(Math.max(parsed, 0), 100)
}

function renderIcon(name) {
  if (name === "file") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 3h7l4 4v14H7z"></path>
        <path d="M14 3v5h5"></path>
      </svg>
    `
  }

  if (name === "plus") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5v14M5 12h14"></path>
      </svg>
    `
  }

  if (name === "blocker") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M8 16l8-8"></path>
      </svg>
    `
  }

  if (name === "flag") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 20V5"></path>
        <path d="M7 6h9l-2 3 2 3H7"></path>
      </svg>
    `
  }

  if (name === "dots-vertical") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="6" r="1.5"></circle>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="12" cy="18" r="1.5"></circle>
      </svg>
    `
  }

  if (name === "priority-up") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 14l5-5 5 5"></path>
        <path d="M7 19l5-5 5 5"></path>
      </svg>
    `
  }

  if (name === "github") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3a9 9 0 0 0-2.85 17.55v-2.2c-1.2.25-1.55-.55-1.55-.55-.3-.8-.95-1-1.15-1.1-.6-.35.05-.35.05-.35.65.05 1 .65 1 .65.6 1 1.5.7 1.85.55.05-.45.25-.75.45-.95-1.8-.2-3.65-.9-3.65-3.95 0-.9.3-1.65.85-2.2-.1-.2-.4-1 .1-2.05 0 0 .7-.2 2.25.85a7.6 7.6 0 0 1 4.1 0c1.55-1.05 2.25-.85 2.25-.85.5 1.05.2 1.85.1 2.05.55.55.85 1.3.85 2.2 0 3.05-1.85 3.75-3.65 3.95.3.25.55.75.55 1.55v2.3A9 9 0 0 0 12 3z"></path>
      </svg>
    `
  }

  return ""
}

function renderControl({ variant, checked, state }) {
  if (variant === "checkbox") {
    return `<span class="control-box" data-checked="${checked}" data-state="${state}"></span>`
  }
  if (variant === "radio") {
    return `<span class="control-radio" data-checked="${checked}" data-state="${state}"></span>`
  }
  return ""
}

function renderPill(text, tone = "success", { shape = "rounded", outline = true } = {}) {
  return `
    <span class="pill" data-tone="${tone}" data-shape="${shape}" data-outline="${outline}">
      ${escapeHtml(text)}
    </span>
  `
}

function renderDefaultVariant({ state, title, subtitle, showCheckbox, showIcon, showAvatar, showBlocker, showFlag }) {
  const titleIsLink = state === "hover-blue"
  return `
    ${showCheckbox ? renderControl({ variant: "checkbox", checked: false, state }) : ""}
    ${showIcon ? `<span class="icon icon--leading">${renderIcon("file")}</span>` : ""}
    ${showAvatar ? '<span class="avatar avatar--md" aria-hidden="true"></span>' : ""}
    <div class="text-stack">
      <div class="title-row">
        <span class="title" data-link="${titleIsLink}">${escapeHtml(title)}</span>
      </div>
      ${subtitle ? `<span class="subtitle">${escapeHtml(subtitle)}</span>` : ""}
    </div>
    ${showBlocker ? `<span class="icon icon--trailing">${renderIcon("blocker")}</span>` : ""}
    ${showFlag ? `<span class="icon icon--trailing">${renderIcon("flag")}</span>` : ""}
  `
}

function renderAddRecordVariant({ title }) {
  return `
    <span class="icon icon--leading">${renderIcon("plus")}</span>
    <div class="text-stack">
      <span class="title title--secondary">${escapeHtml(title)}</span>
    </div>
  `
}

function renderProgressVariant({ percent }) {
  return `
    <div class="progress-wrap">
      <div class="progress-track">
        <span class="progress-fill" style="width:${percent}%"></span>
      </div>
      <span class="progress-value">${percent}%</span>
    </div>
  `
}

function renderToggleVariant({ checked }) {
  return `
    <span class="toggle" data-checked="${checked}">
      <span class="toggle-thumb"></span>
    </span>
  `
}

function renderRatingVariant({ rating }) {
  const stars = []
  for (let index = 0; index < 5; index += 1) {
    stars.push(`<span class="star" data-filled="${index < rating}">&#9733;</span>`)
  }
  return `<div class="rating">${stars.join("")}</div>`
}

function renderAvatarGroupVariant({ title, usersCount, overflowCount, avatarsCount, showText }) {
  const avatars = []
  for (let index = 0; index < avatarsCount; index += 1) {
    avatars.push(`<span class="avatar avatar--sm" data-index="${index}" aria-hidden="true"></span>`)
  }
  return `
    ${showText ? `<span class="title">${escapeHtml(title || `${usersCount} users`)}</span>` : ""}
    <div class="avatars">
      ${avatars.join("")}
      <span class="avatar-more">+${overflowCount}</span>
    </div>
  `
}

function renderIconButtonVariant() {
  return `
    <button type="button" class="icon-button" aria-label="More actions">
      <span class="icon icon--button">${renderIcon("dots-vertical")}</span>
    </button>
  `
}

function renderButtonVariant({ title }) {
  return `
    <button type="button" class="mini-button">
      <span class="icon icon--button">${renderIcon("github")}</span>
      <span>${escapeHtml(title)}</span>
    </button>
  `
}

function renderPriorityVariant({ title }) {
  return `
    <span class="priority-wrap">
      <span class="icon icon--priority">${renderIcon("priority-up")}</span>
      <span class="title">${escapeHtml(title)}</span>
    </span>
  `
}

function renderBadgeVariant({ badgeType }) {
  if (badgeType === "group") {
    return `
      <div class="badges">
        ${renderPill("Label", "success")}
        ${renderPill("Label", "primary")}
        ${renderPill("Label", "secondary")}
        ${renderPill("+4", "neutral")}
      </div>
    `
  }

  return renderPill("Active", "success")
}

function renderStatusVariant({ title }) {
  return renderPill(title || "Ready for sprint", "success", { shape: "square", outline: true })
}

function renderTcStatusVariant({ title }) {
  return renderPill(title || "Pass", "success", { shape: "square", outline: true })
}

function renderBadgeSquareVariant({ title }) {
  return renderPill(title || "Label", "success", { shape: "square", outline: true })
}

function renderScopeVariant({ title }) {
  return renderPill(title || "FE", "warning", { shape: "square", outline: true })
}

function renderRoadmapVariant({ title }) {
  return renderPill(title || "TRA002", "success", { shape: "square", outline: false })
}

function renderModuleVariant({ title, subtitle }) {
  return `
    ${renderPill(title || "LOG", "neutral", { shape: "square", outline: false })}
    <span class="title">${escapeHtml(subtitle || "Login")}</span>
  `
}

function renderContent({
  variant,
  state,
  title,
  subtitle,
  showCheckbox,
  showIcon,
  showAvatar,
  showBlocker,
  showFlag,
  percent,
  checked,
  rating,
  badgeType,
  usersCount,
  overflowCount,
  avatarsCount,
  showText
}) {
  if (variant === "default") {
    return renderDefaultVariant({ state, title, subtitle, showCheckbox, showIcon, showAvatar, showBlocker, showFlag })
  }
  if (variant === "add-record") {
    return renderAddRecordVariant({ title })
  }
  if (variant === "progress") {
    return renderProgressVariant({ percent })
  }
  if (variant === "checkbox" || variant === "radio") {
    return renderControl({ variant, checked, state })
  }
  if (variant === "toggle") {
    return renderToggleVariant({ checked })
  }
  if (variant === "rating") {
    return renderRatingVariant({ rating })
  }
  if (variant === "avatar") {
    return '<span class="avatar avatar--sm" aria-hidden="true"></span>'
  }
  if (variant === "avatar-group") {
    return renderAvatarGroupVariant({ title, usersCount, overflowCount, avatarsCount, showText })
  }
  if (variant === "icon-button") {
    return renderIconButtonVariant()
  }
  if (variant === "button") {
    return renderButtonVariant({ title })
  }
  if (variant === "priority") {
    return renderPriorityVariant({ title })
  }
  if (variant === "badge") {
    return renderBadgeVariant({ badgeType })
  }
  if (variant === "status") {
    return renderStatusVariant({ title })
  }
  if (variant === "tc-status") {
    return renderTcStatusVariant({ title })
  }
  if (variant === "badge-square") {
    return renderBadgeSquareVariant({ title })
  }
  if (variant === "scope") {
    return renderScopeVariant({ title })
  }
  if (variant === "roadmap") {
    return renderRoadmapVariant({ title })
  }
  if (variant === "module") {
    return renderModuleVariant({ title, subtitle })
  }
  return ""
}

class RrTableCell extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return [
      "variant",
      "state",
      "title",
      "subtitle",
      "show-checkbox",
      "show-icon",
      "show-avatar",
      "show-blocker",
      "show-flag",
      "percent",
      "checked",
      "rating",
      "badge-type",
      "users-count",
      "overflow-count",
      "avatars-count",
      "show-text",
      "figma-url"
    ]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = normalizeOption(this.getAttribute("variant") || "default", VALID_VARIANTS, "default")
    const state = normalizeState(this.getAttribute("state"), variant)
    const title = this.getAttribute("title") || "Tech requirements.pdf"
    const subtitle = this.getAttribute("subtitle") || "200 KB"
    const showCheckbox = getBooleanAttribute(this, "show-checkbox", false)
    const showIcon = getBooleanAttribute(this, "show-icon", variant === "default")
    const showAvatar = getBooleanAttribute(this, "show-avatar", false)
    const showBlocker = getBooleanAttribute(this, "show-blocker", false)
    const showFlag = getBooleanAttribute(this, "show-flag", false)
    const percent = clampPercent(this.getAttribute("percent"))
    const checked = getBooleanAttribute(this, "checked", false)
    const rating = parseNumberAttribute(this, "rating", 4, { min: 0, max: 5 })
    const badgeType = normalizeOption(this.getAttribute("badge-type") || "single", ["single", "group"], "single")
    const usersCount = parseNumberAttribute(this, "users-count", 10, { min: 0, max: 9999 })
    const overflowCount = parseNumberAttribute(this, "overflow-count", 5, { min: 0, max: 9999 })
    const avatarsCount = parseNumberAttribute(this, "avatars-count", 5, { min: 1, max: 10 })
    const showText = getBooleanAttribute(this, "show-text", true)
    const alignCenter = [
      "checkbox",
      "radio",
      "toggle",
      "rating",
      "avatar",
      "icon-button",
      "button",
      "priority",
      "badge",
      "status",
      "tc-status",
      "badge-square",
      "scope",
      "roadmap",
      "module"
    ].includes(variant)

    const content = renderContent({
      variant,
      state,
      title,
      subtitle,
      showCheckbox,
      showIcon,
      showAvatar,
      showBlocker,
      showFlag,
      percent,
      checked,
      rating,
      badgeType,
      usersCount,
      overflowCount,
      avatarsCount,
      showText
    })

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="cell" data-variant="${variant}" data-state="${state}" data-align="${alignCenter ? "center" : "start"}">
        ${content}
      </div>
    `
  }
}

if (!customElements.get("rr-table-cell")) {
  customElements.define("rr-table-cell", RrTableCell)
}

function defineVariantElement(tag, variant) {
  if (customElements.get(tag)) {
    return
  }

  class VariantTableCell extends RrTableCell {
    connectedCallback() {
      if (!this.hasAttribute("variant")) {
        this.setAttribute("variant", variant)
      }
      super.connectedCallback()
    }
  }

  customElements.define(tag, VariantTableCell)
}

defineVariantElement("rr-table-cell-default", "default")
defineVariantElement("rr-table-cell-add-record", "add-record")
defineVariantElement("rr-table-cell-progress", "progress")
defineVariantElement("rr-table-cell-checkbox", "checkbox")
defineVariantElement("rr-table-cell-radio", "radio")
defineVariantElement("rr-table-cell-toggle", "toggle")
defineVariantElement("rr-table-cell-rating", "rating")
defineVariantElement("rr-table-cell-avatar", "avatar")
defineVariantElement("rr-table-cell-avatar-group", "avatar-group")
defineVariantElement("rr-table-cell-icon-button", "icon-button")
defineVariantElement("rr-table-cell-button", "button")
defineVariantElement("rr-table-cell-priority", "priority")
defineVariantElement("rr-table-cell-badge", "badge")
defineVariantElement("rr-table-cell-status", "status")
defineVariantElement("rr-table-cell-tc-status", "tc-status")
defineVariantElement("rr-table-cell-badge-square", "badge-square")
defineVariantElement("rr-table-cell-scope", "scope")
defineVariantElement("rr-table-cell-roadmap", "roadmap")
defineVariantElement("rr-table-cell-module", "module")
