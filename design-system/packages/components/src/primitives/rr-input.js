import { rrBaseStyles } from "../internal/theme.js"

class RrInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["label", "placeholder", "value", "type", "disabled"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  get value() {
    return this.getAttribute("value") || ""
  }

  set value(nextValue) {
    this.setAttribute("value", nextValue)
  }

  render() {
    const label = this.getAttribute("label") || ""
    const placeholder = this.getAttribute("placeholder") || ""
    const value = this.getAttribute("value") || ""
    const type = this.getAttribute("type") || "text"
    const disabled = this.hasAttribute("disabled")

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .wrapper {
          display: grid;
          gap: var(--rr-spacing-sm);
        }

        label {
          font-size: var(--rr-typography-fontSizeTiny);
          color: var(--rr-sem-textSecondary);
        }

        input {
          min-height: var(--rr-control-height);
          border-radius: var(--rr-radius-sm);
          border: 1px solid var(--rr-sem-borderField);
          background: var(--rr-sem-surfaceField);
          color: var(--rr-sem-textPrimary);
          padding: 0 var(--rr-spacing-md);
          font-size: var(--rr-typography-fontSizeSm);
          line-height: var(--rr-typography-lineHeightParagraph);
          outline: none;
        }

        input::placeholder {
          color: var(--rr-sem-textMuted);
        }

        input:focus {
          border-color: var(--rr-sem-actionPrimary);
        }
      </style>
      <div class="wrapper">
        ${label ? `<label>${label}</label>` : `<slot name="label"></slot>`}
        <input type="${type}" placeholder="${placeholder}" value="${value}" ${disabled ? "disabled" : ""} />
        <slot name="helper"></slot>
      </div>
    `

    this.shadowRoot.querySelector("input")?.addEventListener("input", (event) => {
      const current = event.target.value
      this.setAttribute("value", current)
      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { value: current }
        })
      )
    })
  }
}

if (!customElements.get("rr-input")) {
  customElements.define("rr-input", RrInput)
}
