import { escapeHtml, getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrSelectStyles from "./rr-select.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=18-0&m=dev"
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const VALID_TYPES = ["default", "icon-leading", "avatar-leading"]
const STYLES = `${rrBaseStyles}\n${rrSelectStyles}`

function parseOptions(raw) {
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function normalizeToken(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")
}

function normalizeState(value) {
  const candidate = normalizeToken(value || "default")
  if (candidate === "focus" || candidate === "active" || candidate === "active-focused" || candidate === "active/focused") {
    return "focused"
  }
  if (candidate === "hover") {
    return "hover"
  }
  if (candidate === "placeholder" || candidate === "filled" || candidate === "default-value" || candidate === "default-no-value") {
    return "default"
  }
  return normalizeOption(candidate, VALID_STATES, "default")
}

function normalizeType(value) {
  const candidate = normalizeToken(value || "default")
  const aliases = {
    default: "default",
    "icon-leading": "icon-leading",
    "icon-leading-user": "icon-leading",
    icon: "icon-leading",
    user: "icon-leading",
    "avatar-leading": "avatar-leading",
    avatar: "avatar-leading"
  }
  const resolved = aliases[candidate] ?? candidate
  return VALID_TYPES.includes(resolved) ? resolved : "default"
}

function normalizeSelectOption(option, index) {
  if (option && typeof option === "object") {
    if (option.type === "divider" || option.divider === true) {
      return {
        type: "divider",
        value: `divider-${index}`,
        label: ""
      }
    }

    const label = String(option.label ?? option.text ?? option.value ?? `Option ${index + 1}`)
    return {
      type: option.type === "destructive" ? "destructive" : "default",
      value: String(option.value ?? label),
      label,
      subline: option.subline ? String(option.subline) : "",
      disabled: option.disabled === true,
      iconLeft: option.iconLeft ?? option.icon_left ?? option.iconleft ?? option["icon-left"] ?? false,
      iconRight: option.iconRight ?? option.icon_right ?? option.iconright ?? option["icon-right"] ?? false
    }
  }

  const text = String(option ?? "")
  return {
    type: "default",
    value: text,
    label: text
  }
}

function renderCaretIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 9.5l6 6 6-6"></path>
    </svg>
  `
}

function renderUserIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4.5 19.5c1.3-3.6 4-5.5 7.5-5.5s6.2 1.9 7.5 5.5"></path>
    </svg>
  `
}

class RrSelect extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.handleFieldClick = this.handleFieldClick.bind(this)
    this.handleFieldKeydown = this.handleFieldKeydown.bind(this)
    this.handleOutsidePointerDown = this.handleOutsidePointerDown.bind(this)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
    this.isListeningOutside = false
  }

  static get observedAttributes() {
    return [
      "label",
      "value",
      "disabled",
      "options",
      "state",
      "type",
      "variant",
      "placeholder",
      "open",
      "helper",
      "hide-helper",
      "hide-label",
      "dot",
      "figma-url"
    ]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.shadowRoot.addEventListener("rr-select", this.handleDropdownSelect)
    this.render()
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("rr-select", this.handleDropdownSelect)
    this.disableOutsideListener()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === "open") {
      if (this.hasAttribute("open")) {
        this.enableOutsideListener()
      } else {
        this.disableOutsideListener()
      }
    }

    this.render()
  }

  get value() {
    return this.getAttribute("value") || ""
  }

  set value(nextValue) {
    this.setAttribute("value", nextValue ?? "")
  }

  setOpen(isOpen) {
    if (isOpen) {
      this.setAttribute("open", "")
      return
    }
    this.removeAttribute("open")
  }

  handleFieldClick() {
    const disabled = this.hasAttribute("disabled") || normalizeState(this.getAttribute("state") || "default") === "disabled"
    if (disabled) {
      return
    }

    const options = parseOptions(this.getAttribute("options")).map(normalizeSelectOption).filter((option) => option.type !== "divider")
    if (options.length === 0) {
      return
    }

    this.setOpen(!this.hasAttribute("open"))
  }

  handleFieldKeydown(event) {
    if (event.key === "Escape") {
      this.setOpen(false)
      return
    }

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault()
      this.setOpen(true)
    }
  }

  handleOutsidePointerDown(event) {
    const path = event.composedPath ? event.composedPath() : []
    if (path.includes(this)) {
      return
    }
    this.setOpen(false)
  }

  handleDropdownSelect(event) {
    if (event.target === this) {
      return
    }

    event.stopPropagation()
    const detail = event.detail || {}
    if (detail.disabled) {
      return
    }

    const nextValue = String(detail.value ?? "")
    this.value = nextValue
    this.setOpen(false)
    this.dispatchEvent(
      new CustomEvent("rr-change", {
        bubbles: true,
        composed: true,
        detail: {
          value: nextValue,
          label: detail.label ?? ""
        }
      })
    )
  }

  enableOutsideListener() {
    if (this.isListeningOutside) {
      return
    }
    document.addEventListener("pointerdown", this.handleOutsidePointerDown, true)
    this.isListeningOutside = true
  }

  disableOutsideListener() {
    if (!this.isListeningOutside) {
      return
    }
    document.removeEventListener("pointerdown", this.handleOutsidePointerDown, true)
    this.isListeningOutside = false
  }

  render() {
    const label = this.getAttribute("label")
    const helper = this.getAttribute("helper")
    const placeholder = this.getAttribute("placeholder") || "Select"
    const value = this.value
    const state = normalizeState(this.getAttribute("state") || "default")
    const type = normalizeType(this.getAttribute("type") || this.getAttribute("variant") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const showDot = getBooleanAttribute(this, "dot", false)
    const hideLabel = getBooleanAttribute(this, "hide-label", false)
    const hideHelper = getBooleanAttribute(this, "hide-helper", false)
    const options = parseOptions(this.getAttribute("options")).map(normalizeSelectOption)
    const selectedOption = options.find((option) => option.type !== "divider" && String(option.value) === value)
    const hasValue = Boolean(selectedOption || value)
    const displayValue = selectedOption?.label ?? (hasValue ? value : placeholder)
    const isPlaceholder = !hasValue
    const isOpen = this.hasAttribute("open") && !disabled && options.length > 0
    const resolvedState = disabled ? "disabled" : (isOpen ? "focused" : state)
    const hasHelperSlot = Boolean(this.querySelector('[slot="helper"]'))

    if (isOpen) {
      this.enableOutsideListener()
    } else {
      this.disableOutsideListener()
    }

    const labelMarkup = hideLabel
      ? ""
      : label !== null
        ? `<label class="label">${escapeHtml(label || "Label")}</label>`
        : `<label class="label"><slot name="label">Label</slot></label>`

    const helperMarkup = hideHelper
      ? ""
      : helper !== null
        ? `<p class="helper">${escapeHtml(helper)}</p>`
        : hasHelperSlot
          ? `<p class="helper"><slot name="helper"></slot></p>`
          : ""

    const leadingMarkup = type === "icon-leading"
      ? `<span class="leading leading--icon" aria-hidden="true">${renderUserIcon()}</span>`
      : type === "avatar-leading"
        ? '<span class="leading leading--avatar" aria-hidden="true"></span>'
        : ""

    const menuOptions = escapeHtml(JSON.stringify(options))

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-state="${resolvedState}">
        ${labelMarkup}
        <button
          type="button"
          class="field"
          data-state="${resolvedState}"
          data-type="${type}"
          aria-haspopup="listbox"
          aria-expanded="${isOpen ? "true" : "false"}"
          ${disabled ? "disabled" : ""}>
          ${showDot ? '<span class="dot" aria-hidden="true"></span>' : ""}
          <span class="content">
            ${leadingMarkup}
            <span class="value" data-placeholder="${isPlaceholder ? "true" : "false"}">${escapeHtml(displayValue)}</span>
          </span>
          <span class="caret" aria-hidden="true">${renderCaretIcon()}</span>
        </button>
        ${isOpen
    ? `
            <div class="menu">
              <rr-dropdown-template
                options="${menuOptions}"
                value="${escapeHtml(value)}"
                show-selected-check>
              </rr-dropdown-template>
            </div>
          `
    : ""}
        ${helperMarkup}
      </div>
    `

    this.shadowRoot.querySelector(".field")?.addEventListener("click", this.handleFieldClick)
    this.shadowRoot.querySelector(".field")?.addEventListener("keydown", this.handleFieldKeydown)
  }
}

if (!customElements.get("rr-select")) {
  customElements.define("rr-select", RrSelect)
}
