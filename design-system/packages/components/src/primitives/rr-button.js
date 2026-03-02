import { getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrButtonStyles from "./rr-button.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6353-98804&m=dev"
const VALID_VARIANTS = ["primary", "secondary", "neutral", "border", "text", "destructive"]
const VALID_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrButtonStyles}`

class RrButton extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["variant", "type", "size", "state", "disabled", "icon-left", "icon-right", "dot"]
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

  getVariant() {
    return normalizeOption(this.getAttribute("variant") || this.getAttribute("type") || "primary", VALID_VARIANTS, "primary")
  }

  getSize() {
    return normalizeOption(this.getAttribute("size") || "md", VALID_SIZES, "md")
  }

  getState() {
    return normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
  }

  render() {
    const variant = this.getVariant()
    const size = this.getSize()
    const state = this.getState()
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const iconLeft = getBooleanAttribute(this, "icon-left")
    const iconRight = getBooleanAttribute(this, "icon-right")
    const dot = getBooleanAttribute(this, "dot")

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        data-variant="${variant}"
        data-size="${size}"
        data-state="${state}"
        type="button"
        ${disabled ? "disabled" : ""}
      >
        ${dot
    ? `<span class="dot"><slot name="dot"><span class="dot-fallback" aria-hidden="true"></span></slot></span>`
    : ""}
        ${iconLeft
    ? `<span class="icon icon-left">
              <slot name="icon-left">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"></path></svg>
              </slot>
            </span>`
    : ""}
        <span class="label"><slot></slot></span>
        ${iconRight
    ? `<span class="icon icon-right">
              <slot name="icon-right">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"></path></svg>
              </slot>
            </span>`
    : ""}
      </button>
    `

    const button = this.shadowRoot.querySelector("button")
    button?.addEventListener("click", (event) => {
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

if (!customElements.get("rr-button")) {
  customElements.define("rr-button", RrButton)
}
