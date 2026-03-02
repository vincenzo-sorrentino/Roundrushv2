import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrTableHeaderStyles from "./rr-table-header.css?inline"

const VALID_STATES = ["default", "hover", "focused", "disabled"]
const VALID_ARROWS = ["none", "up", "down"]
const STYLES = `${rrBaseStyles}\n${rrTableHeaderStyles}`

class RrTableHeader extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["label", "arrow", "state", "help-icon"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const label = this.getAttribute("label") || "Company"
    const arrow = normalizeOption(this.getAttribute("arrow") || "none", VALID_ARROWS, "none")
    const state = normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
    const helpIcon = this.getAttribute("help-icon") === "true"
    const isDisabled = state === "disabled"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button type="button" data-state="${state}" aria-disabled="${isDisabled}" ${isDisabled ? "disabled" : ""}>
        <span>${escapeHtml(label)}</span>
        ${helpIcon ? `<span class="help">?</span>` : ""}
        ${arrow === "down" ? `<span class="arrow">&#8595;</span>` : arrow === "up" ? `<span class="arrow">&#8593;</span>` : ""}
      </button>
    `

    this.shadowRoot.querySelector("button")?.addEventListener("click", () => {
      if (isDisabled) {
        return
      }

      const nextArrow = arrow === "down" ? "up" : "down"
      this.dispatchEvent(
        new CustomEvent("rr-sort", {
          bubbles: true,
          composed: true,
          detail: {
            label,
            currentArrow: arrow,
            nextArrow
          }
        })
      )
    })
  }
}

if (!customElements.get("rr-table-header")) {
  customElements.define("rr-table-header", RrTableHeader)
}
