import { getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrToggleStyles from "./rr-toggle.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1102-4631&m=dev"
const VALID_SIZES = ["sm", "md", "lg"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrToggleStyles}`

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

function resolvePressed(element) {
  if (element.hasAttribute("checked")) {
    return getBooleanAttribute(element, "checked", false)
  }
  return getBooleanAttribute(element, "pressed", false)
}

class RrToggle extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.handleClick = this.handleClick.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  static get observedAttributes() {
    return [
      "checked",
      "pressed",
      "size",
      "state",
      "disabled",
      "readonly",
      "aria-label",
      "figma-url"
    ]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Toggle")
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
    return resolvePressed(this)
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
    if (this.hasAttribute("disabled") || this.hasAttribute("readonly")) {
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

  handleClick() {
    this.toggleChecked()
  }

  handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.toggleChecked()
    }
  }

  render() {
    const size = normalizeSize(this.getAttribute("size") || "md")
    const pressed = resolvePressed(this)
    const state = normalizeState(this.getAttribute("state") || "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state
    const readOnly = this.hasAttribute("readonly")
    const ariaLabel = this.getAttribute("aria-label") || "Toggle"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        type="button"
        class="toggle"
        data-size="${size}"
        data-state="${resolvedState}"
        data-pressed="${pressed ? "true" : "false"}"
        data-readonly="${readOnly ? "true" : "false"}"
        role="switch"
        aria-label="${ariaLabel}"
        aria-checked="${pressed ? "true" : "false"}"
        ${disabled ? "disabled" : ""}>
        <span class="thumb" aria-hidden="true"></span>
      </button>
    `

    this.shadowRoot.querySelector(".toggle")?.addEventListener("click", this.handleClick)
    this.shadowRoot.querySelector(".toggle")?.addEventListener("keydown", this.handleKeydown)
  }
}

if (!customElements.get("rr-toggle")) {
  customElements.define("rr-toggle", RrToggle)
}
