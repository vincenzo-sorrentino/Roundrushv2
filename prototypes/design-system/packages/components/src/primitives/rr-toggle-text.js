import { escapeHtml, getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrToggleTextStyles from "./rr-toggle-text.css?inline"
import "./rr-toggle.js"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1102-4631&m=dev"
const VALID_SIZES = ["sm", "md", "lg"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrToggleTextStyles}`

function normalizeSize(value) {
  return normalizeOption(String(value || "md").toLowerCase().trim(), VALID_SIZES, "md")
}

function normalizeState(value) {
  const candidate = String(value || "default")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")

  if (candidate === "focus" || candidate === "active" || candidate === "active-focused" || candidate === "active/focused") {
    return "focused"
  }

  return normalizeOption(candidate, VALID_STATES, "default")
}

function resolveChecked(element) {
  if (element.hasAttribute("checked")) {
    return getBooleanAttribute(element, "checked", false)
  }
  return getBooleanAttribute(element, "pressed", false)
}

function resolveUnderline(element) {
  const attrNames = ["has-underline", "show-underline", "underline"]
  for (const name of attrNames) {
    if (!element.hasAttribute(name)) {
      continue
    }

    const raw = String(element.getAttribute(name) ?? "")
      .toLowerCase()
      .trim()
    if (!raw || raw === "true" || raw === "yes" || raw === "on" || raw === name) {
      return true
    }
    if (raw === "false" || raw === "no" || raw === "off" || raw === "none") {
      return false
    }
    return true
  }

  return element.hasAttribute("description")
}

class RrToggleText extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowKeydown = this.handleRowKeydown.bind(this)
  }

  static get observedAttributes() {
    return [
      "checked",
      "pressed",
      "size",
      "state",
      "disabled",
      "readonly",
      "label",
      "text",
      "description",
      "underline",
      "has-underline",
      "show-underline",
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
    if (oldValue === newValue) {
      return
    }

    if (name === "checked") {
      if (getBooleanAttribute(this, "checked", false)) {
        this.setAttribute("pressed", "")
      } else {
        this.removeAttribute("pressed")
      }
    }

    if (name === "pressed" && !this.hasAttribute("checked")) {
      if (getBooleanAttribute(this, "pressed", false)) {
        this.setAttribute("checked", "")
      } else {
        this.removeAttribute("checked")
      }
    }

    this.render()
  }

  get checked() {
    return resolveChecked(this)
  }

  set checked(nextValue) {
    if (nextValue) {
      this.setAttribute("checked", "")
      this.setAttribute("pressed", "")
      return
    }

    this.removeAttribute("checked")
    this.removeAttribute("pressed")
  }

  toggleChecked() {
    const state = normalizeState(this.getAttribute("state") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const readOnly = this.hasAttribute("readonly")
    if (disabled || readOnly) {
      return
    }

    const nextChecked = !this.checked
    this.checked = nextChecked
    this.dispatchEvent(
      new CustomEvent("rr-change", {
        bubbles: true,
        composed: true,
        detail: { checked: nextChecked, pressed: nextChecked }
      })
    )
  }

  handleRowClick() {
    this.toggleChecked()
  }

  handleRowKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.toggleChecked()
    }
  }

  render() {
    const label = this.getAttribute("label") || this.getAttribute("text") || "Remember me"
    const description = this.getAttribute("description") || "Save my login details for next time."
    const size = normalizeSize(this.getAttribute("size") || "md")
    const state = normalizeState(this.getAttribute("state") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state
    const readOnly = this.hasAttribute("readonly")
    const checked = this.checked
    const hasUnderline = resolveUnderline(this)

    const descriptionMarkup = hasUnderline ? `<p class="description">${escapeHtml(description)}</p>` : ""

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div
        class="row"
        data-underline="${hasUnderline ? "true" : "false"}"
        data-disabled="${disabled ? "true" : "false"}"
        role="switch"
        aria-checked="${checked ? "true" : "false"}"
        aria-disabled="${disabled ? "true" : "false"}"
        tabindex="${disabled ? "-1" : "0"}">
        <rr-toggle
          size="${size}"
          state="${resolvedState}"
          ${checked ? "checked" : ""}
          readonly
          aria-label="${escapeHtml(label)}">
        </rr-toggle>
        <div class="meta">
          <p class="label">${escapeHtml(label)}</p>
          ${descriptionMarkup}
        </div>
      </div>
    `

    const row = this.shadowRoot.querySelector(".row")
    if (row && !disabled && !readOnly) {
      row.addEventListener("click", this.handleRowClick)
      row.addEventListener("keydown", this.handleRowKeydown)
    }
  }
}

if (!customElements.get("rr-toggle-text")) {
  customElements.define("rr-toggle-text", RrToggleText)
}
