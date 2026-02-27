import { rrBaseStyles } from "../internal/theme.js"

class RrCheckbox extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["checked", "disabled"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const checked = this.hasAttribute("checked")
    const disabled = this.hasAttribute("disabled")

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        label {
          display: inline-flex;
          align-items: center;
          gap: var(--rr-spacing-sm);
          color: var(--rr-sem-textPrimary);
          font-size: var(--rr-typography-fontSizeSm);
          line-height: var(--rr-typography-lineHeightParagraph);
        }

        input {
          width: 16px;
          height: 16px;
          margin: 0;
          appearance: none;
          border: 1px solid var(--rr-sem-borderField);
          border-radius: var(--rr-radius-sm);
          background: var(--rr-sem-surfaceField);
          position: relative;
          cursor: pointer;
        }

        input:checked {
          background: var(--rr-sem-actionPrimary);
          border-color: var(--rr-sem-actionPrimary);
        }

        input:checked::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 1px;
          width: 4px;
          height: 8px;
          border: solid var(--rr-sem-surfaceOnPrimary);
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      </style>
      <label>
        <input type="checkbox" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
        <slot></slot>
      </label>
    `

    this.shadowRoot.querySelector("input")?.addEventListener("change", (event) => {
      if (event.target.checked) {
        this.setAttribute("checked", "")
      } else {
        this.removeAttribute("checked")
      }

      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { checked: event.target.checked }
        })
      )
    })
  }
}

if (!customElements.get("rr-checkbox")) {
  customElements.define("rr-checkbox", RrCheckbox)
}
