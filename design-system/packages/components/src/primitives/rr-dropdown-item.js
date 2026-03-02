import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrDropdownItemStyles from "./rr-dropdown-item.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=18-0&m=dev"
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const VALID_TYPES = ["default", "destructive", "divider"]
const STYLES = `${rrBaseStyles}\n${rrDropdownItemStyles}`

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
  return normalizeOption(candidate, VALID_STATES, "default")
}

function normalizeType(value) {
  const candidate = normalizeToken(value || "default")
  return normalizeOption(candidate, VALID_TYPES, "default")
}

function resolveBooleanAttribute(element, name, fallback = false) {
  if (!element.hasAttribute(name)) {
    return fallback
  }
  const value = normalizeToken(element.getAttribute(name))
  if (value === "false" || value === "0" || value === "no" || value === "off") {
    return false
  }
  return true
}

function resolveIconName(rawValue, fallback) {
  const candidate = normalizeToken(rawValue)
  if (!candidate || candidate === "true" || candidate === "1" || candidate === "yes" || candidate === "on") {
    return fallback
  }
  const aliases = {
    check: "check",
    tick: "check",
    trash: "trash",
    delete: "trash",
    user: "user",
    person: "user"
  }
  return aliases[candidate] ?? fallback
}

function renderIcon(name) {
  if (name === "trash") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 7h14"></path>
        <path d="M9 7V5h6v2"></path>
        <path d="M8 7l1 12h6l1-12"></path>
        <path d="M10 10v6M14 10v6"></path>
      </svg>
    `
  }

  if (name === "check") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 12.5l4.5 4.5L19 8"></path>
      </svg>
    `
  }

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4.5 19.5c1.3-3.6 4-5.5 7.5-5.5s6.2 1.9 7.5 5.5"></path>
    </svg>
  `
}

class RrDropdownItem extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.handleSelect = this.handleSelect.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  static get observedAttributes() {
    return [
      "text",
      "label",
      "value",
      "subline",
      "state",
      "type",
      "disabled",
      "checkbox",
      "avatar",
      "dot",
      "icon-left",
      "icon-right",
      "selected",
      "figma-url"
    ]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    void name
    if (oldValue === newValue) {
      return
    }
    this.render()
  }

  handleSelect() {
    const type = normalizeType(this.getAttribute("type") || "default")
    const state = normalizeState(this.getAttribute("state") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    if (type === "divider" || disabled) {
      return
    }

    const label = this.getAttribute("text") || this.getAttribute("label") || this.textContent?.trim() || "Option"
    const value = this.getAttribute("value") || label
    this.dispatchEvent(
      new CustomEvent("rr-select", {
        bubbles: true,
        composed: true,
        detail: {
          value,
          label,
          type,
          state,
          disabled
        }
      })
    )
  }

  handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.handleSelect()
    }
  }

  render() {
    const text = this.getAttribute("text") || this.getAttribute("label")
    const subline = this.getAttribute("subline") || ""
    const type = normalizeType(this.getAttribute("type") || "default")
    const state = normalizeState(this.getAttribute("state") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state
    const selected = resolveBooleanAttribute(this, "selected", false)
    const checkbox = resolveBooleanAttribute(this, "checkbox", false)
    const avatar = resolveBooleanAttribute(this, "avatar", false)
    const dot = resolveBooleanAttribute(this, "dot", false)
    const iconLeftRaw = this.getAttribute("icon-left")
    const iconRightRaw = this.getAttribute("icon-right")
    const showIconLeft = iconLeftRaw !== null ? resolveBooleanAttribute(this, "icon-left", false) : type === "destructive"
    const showIconRight = iconRightRaw !== null ? resolveBooleanAttribute(this, "icon-right", false) : selected
    const iconLeftName = showIconLeft ? resolveIconName(iconLeftRaw, type === "destructive" ? "trash" : "user") : ""
    const iconRightName = showIconRight ? resolveIconName(iconRightRaw, "check") : ""
    const interactive = type !== "divider" && !disabled
    const hasSublineSlot = Boolean(this.querySelector('[slot="subline"]'))
    const textMarkup = text ? escapeHtml(text) : "<slot>Option</slot>"
    const sublineMarkup = subline
      ? `<p class="subline">${escapeHtml(subline)}</p>`
      : hasSublineSlot
        ? '<p class="subline"><slot name="subline"></slot></p>'
        : ""

    if (type === "divider") {
      this.shadowRoot.innerHTML = `
        <style>${STYLES}</style>
        <div class="divider-wrap" role="separator">
          <span class="divider"></span>
        </div>
      `
      return
    }

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div
        class="item"
        data-state="${resolvedState}"
        data-type="${type}"
        data-selected="${selected ? "true" : "false"}"
        data-interactive="${interactive ? "true" : "false"}"
        role="option"
        aria-disabled="${disabled ? "true" : "false"}"
        aria-selected="${selected ? "true" : "false"}"
        tabindex="${interactive ? "0" : "-1"}">
        ${checkbox ? '<span class="checkbox" aria-hidden="true"></span>' : ""}
        ${avatar ? '<span class="avatar" aria-hidden="true"></span>' : ""}
        ${dot ? '<span class="dot" aria-hidden="true"></span>' : ""}
        ${showIconLeft ? `<span class="icon icon--left" aria-hidden="true">${renderIcon(iconLeftName)}</span>` : ""}
        <span class="content">
          <p class="text">${textMarkup}</p>
          ${sublineMarkup}
        </span>
        ${showIconRight ? `<span class="icon icon--right" aria-hidden="true">${renderIcon(iconRightName)}</span>` : ""}
      </div>
    `

    const item = this.shadowRoot.querySelector(".item")
    if (item && interactive) {
      item.addEventListener("click", this.handleSelect)
      item.addEventListener("keydown", this.handleKeydown)
    }
  }
}

if (!customElements.get("rr-dropdown-item")) {
  customElements.define("rr-dropdown-item", RrDropdownItem)
}
