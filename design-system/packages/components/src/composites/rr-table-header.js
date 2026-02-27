import { rrBaseStyles } from "../internal/theme.js"

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
    const arrow = this.getAttribute("arrow") || "none"
    const state = this.getAttribute("state") || "default"
    const helpIcon = this.getAttribute("help-icon") === "true"

    const isDisabled = state === "disabled"
    const textColor = isDisabled ? "var(--rr-sem-textMuted)" : "var(--rr-sem-textSecondary)"
    const iconColor = isDisabled ? "var(--rr-sem-textMuted)" : "var(--rr-sem-iconSecondary)"

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        button {
          border: none;
          background: transparent;
          padding: 0;
          margin: 0;
          cursor: ${isDisabled ? "not-allowed" : "pointer"};
          display: inline-flex;
          align-items: center;
          gap: var(--rr-spacing-xs);
          color: ${textColor};
          font-size: var(--rr-typography-fontSizeTiny);
          line-height: var(--rr-typography-lineHeightParagraph);
          font-weight: var(--rr-typography-fontWeightRegular);
        }

        .arrow {
          font-size: 16px;
          line-height: 1;
          color: ${iconColor};
          min-width: 10px;
        }

        .help {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 1px solid var(--rr-sem-borderField);
          font-size: 10px;
          color: var(--rr-sem-textSecondary);
        }
      </style>
      <button type="button" aria-disabled="${isDisabled}">
        <span>${label}</span>
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
