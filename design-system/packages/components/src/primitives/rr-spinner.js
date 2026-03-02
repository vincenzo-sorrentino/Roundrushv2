import { parseNumberAttribute, rrBaseStyles } from "../internal/theme.js"
import rrSpinnerStyles from "./rr-spinner.css?inline"

const STYLES = `${rrBaseStyles}\n${rrSpinnerStyles}`

class RrSpinner extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["size"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const size = parseNumberAttribute(this, "size", 20, { min: 10, max: 96 })

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="spinner" style="--rr-spinner-size:${size}px;" role="status" aria-label="Loading"></div>
    `
  }
}

if (!customElements.get("rr-spinner")) {
  customElements.define("rr-spinner", RrSpinner)
}
