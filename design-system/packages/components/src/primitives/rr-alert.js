import { normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrAlertStyles from "./rr-alert.css?inline"

const VALID_VARIANTS = ["info", "warning", "danger", "success"]
const STYLES = `${rrBaseStyles}\n${rrAlertStyles}`

class RrAlert extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["variant"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = normalizeOption(this.getAttribute("variant") || "info", VALID_VARIANTS, "info")

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="alert" data-variant="${variant}" role="status">
        <slot></slot>
      </div>
    `
  }
}

if (!customElements.get("rr-alert")) {
  customElements.define("rr-alert", RrAlert)
}
