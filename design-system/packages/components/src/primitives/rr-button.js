import { rrBaseStyles } from "../internal/theme.js"

class RrButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["variant", "disabled"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = this.getAttribute("variant") || "primary"
    const disabled = this.hasAttribute("disabled")

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        button {
          min-height: var(--rr-control-height);
          border-radius: var(--rr-radius-sm);
          border: 1px solid var(--rr-sem-borderDefault);
          padding: 0 var(--rr-spacing-lg);
          cursor: pointer;
          font-size: var(--rr-typography-fontSizeSm);
          font-weight: var(--rr-typography-fontWeightMedium);
          line-height: var(--rr-typography-lineHeightParagraph);
          transition: all 120ms ease-in-out;
        }

        button[data-variant="primary"] {
          color: var(--rr-sem-surfaceOnPrimary);
          background: var(--rr-sem-actionPrimary);
          border-color: var(--rr-sem-actionPrimary);
        }

        button[data-variant="primary"]:hover {
          background: var(--rr-sem-actionPrimaryHover);
          border-color: var(--rr-sem-actionPrimaryHover);
        }

        button[data-variant="secondary"] {
          color: var(--rr-sem-textPrimary);
          background: var(--rr-sem-surfaceField);
          border-color: var(--rr-sem-borderField);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      </style>
      <button data-variant="${variant}" ${disabled ? "disabled" : ""}>
        <slot></slot>
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

if (!customElements.get("rr-button")) {
  customElements.define("rr-button", RrButton)
}
