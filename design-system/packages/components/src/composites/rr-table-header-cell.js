import { rrBaseStyles } from "../internal/theme.js"
import "./rr-table-header.js"

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
    const showCheckbox = this.getAttribute("checkbox") === "true"
    const color = this.getAttribute("color") || "white"
    const showDot = this.getAttribute("dot") === "true"
    const arrow = this.getAttribute("arrow") || "none"
    const state = this.getAttribute("state") || "default"
    const helpIcon = this.getAttribute("help-icon") || "false"

    const background = color === "gray" ? "var(--rr-sem-surfaceSubtle)" : "var(--rr-sem-surfaceTable)"

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .cell {
          min-height: 40px;
          height: 40px;
          width: 100%;
          border-bottom: 1px solid var(--rr-sem-borderDefault);
          background: ${background};
          display: flex;
          align-items: center;
          gap: var(--rr-spacing-sm);
          padding: 0 var(--rr-spacing-lg);
          box-sizing: border-box;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border-radius: var(--rr-radius-sm);
          border: 1px solid var(--rr-sem-borderField);
          background: var(--rr-sem-surfaceField);
          box-sizing: border-box;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--rr-sem-actionPrimary);
          margin-left: 2px;
          margin-right: 2px;
        }
      </style>
      <div class="cell">
        ${showCheckbox ? `<span class="checkbox" aria-hidden="true"></span>` : ""}
        ${showDot ? `<span class="dot" aria-hidden="true"></span>` : ""}
        ${showText ? `<rr-table-header label="${label}" arrow="${arrow}" state="${state}" help-icon="${helpIcon}"></rr-table-header>` : ""}
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
