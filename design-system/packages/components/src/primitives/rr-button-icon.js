import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrButtonIconStyles from "./rr-button-icon.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=821-6261&m=dev"
const VALID_TYPES = ["primary", "secondary", "neutral", "border", "icon", "destructive"]
const VALID_SIZES = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrButtonIconStyles}`

class RrButtonIcon extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["type", "variant", "size", "state", "disabled", "label"]
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

  getType() {
    return normalizeOption(this.getAttribute("type") || this.getAttribute("variant") || "primary", VALID_TYPES, "primary")
  }

  getSize() {
    return normalizeOption(this.getAttribute("size") || "md", VALID_SIZES, "md")
  }

  getState() {
    return normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
  }

  render() {
    const type = this.getType()
    const size = this.getSize()
    const state = this.getState()
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const ariaLabel = this.getAttribute("label") || this.getAttribute("aria-label") || "Icon action"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        type="button"
        data-type="${type}"
        data-size="${size}"
        data-state="${state}"
        aria-label="${escapeHtml(ariaLabel)}"
        ${disabled ? "disabled" : ""}
      >
        <span class="icon">
          <slot>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </slot>
        </span>
      </button>
    `

    this.shadowRoot.querySelector("button")?.addEventListener("click", (event) => {
      this.dispatchEvent(
        new CustomEvent("rr-click", {
          bubbles: true,
          composed: true,
          detail: { sourceEvent: event }
        })
      )
    })
  }
}

if (!customElements.get("rr-button-icon")) {
  customElements.define("rr-button-icon", RrButtonIcon)
}
