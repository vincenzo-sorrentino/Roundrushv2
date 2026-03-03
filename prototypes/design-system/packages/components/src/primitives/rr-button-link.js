import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrButtonLinkStyles from "./rr-button-link.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=821-7099&m=dev"
const VALID_COLORS = ["primary", "black"]
const VALID_SIZES = ["sm", "md"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]
const VALID_ICON_DISPLAY = ["leading", "trailing"]
const STYLES = `${rrBaseStyles}\n${rrButtonLinkStyles}`

class RrButtonLink extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["color", "size", "state", "disabled", "icon-display", "label"]
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

  getColor() {
    const rawColor = (this.getAttribute("color") || "primary")
      .toLowerCase()
      .replaceAll(/\s+/g, "-")
      .replaceAll("_", "-")
      .replace("link-", "")
    return normalizeOption(rawColor, VALID_COLORS, "primary")
  }

  getSize() {
    return normalizeOption(this.getAttribute("size") || "sm", VALID_SIZES, "sm")
  }

  getState() {
    return normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
  }

  getIconDisplay() {
    return normalizeOption(this.getAttribute("icon-display") || "leading", VALID_ICON_DISPLAY, "leading")
  }

  render() {
    const color = this.getColor()
    const size = this.getSize()
    const state = this.getState()
    const iconDisplay = this.getIconDisplay()
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const label = this.getAttribute("label") || "Button CTA"

    const leadingIcon = `
      <span class="icon">
        <slot name="icon-leading">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"></path></svg>
        </slot>
      </span>
    `

    const trailingIcon = `
      <span class="icon">
        <slot name="icon-trailing">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"></path></svg>
        </slot>
      </span>
    `

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        type="button"
        data-color="${color}"
        data-size="${size}"
        data-state="${state}"
        data-icon-display="${iconDisplay}"
        ${disabled ? "disabled" : ""}
      >
        ${iconDisplay === "leading" ? leadingIcon : ""}
        <span class="label"><slot>${escapeHtml(label)}</slot></span>
        ${iconDisplay === "trailing" ? trailingIcon : ""}
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

if (!customElements.get("rr-button-link")) {
  customElements.define("rr-button-link", RrButtonLink)
}
