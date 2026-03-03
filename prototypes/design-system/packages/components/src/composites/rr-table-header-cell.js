import { escapeHtml, getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrTableHeaderCellStyles from "./rr-table-header-cell.css?inline"
import "./rr-table-header.js"

const VALID_COLORS = ["white", "gray"]
const STYLES = `${rrBaseStyles}\n${rrTableHeaderCellStyles}`

class RrTableHeaderCell extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["label", "text", "checkbox", "color", "dot", "arrow", "state", "help-icon"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const label = this.getAttribute("label") || "Company"
    const showText = this.getAttribute("text") !== "false"
    const showCheckbox = getBooleanAttribute(this, "checkbox")
    const color = normalizeOption(this.getAttribute("color") || "white", VALID_COLORS, "white")
    const showDot = getBooleanAttribute(this, "dot")
    const arrow = this.getAttribute("arrow") || "none"
    const state = this.getAttribute("state") || "default"
    const helpIcon = getBooleanAttribute(this, "help-icon")

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="cell" data-color="${color}">
        ${showCheckbox ? `<span class="checkbox" aria-hidden="true"></span>` : ""}
        ${showDot ? `<span class="dot" aria-hidden="true"></span>` : ""}
        ${showText
    ? `<rr-table-header label="${escapeHtml(label)}" arrow="${escapeHtml(arrow)}" state="${escapeHtml(state)}" help-icon="${helpIcon}"></rr-table-header>`
    : ""}
      </div>
    `

    this.shadowRoot.querySelector("rr-table-header")?.addEventListener("rr-sort", (event) => {
      this.dispatchEvent(
        new CustomEvent("rr-sort", {
          bubbles: true,
          composed: true,
          detail: event.detail
        })
      )
    })
  }
}

if (!customElements.get("rr-table-header-cell")) {
  customElements.define("rr-table-header-cell", RrTableHeaderCell)
}
