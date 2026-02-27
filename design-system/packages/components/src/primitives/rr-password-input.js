import { rrBaseStyles } from "../internal/theme.js"

class RrPasswordInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.visible = false
  }

  static get observedAttributes() {
    return ["label", "placeholder", "value", "disabled"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const label = this.getAttribute("label") || ""
    const placeholder = this.getAttribute("placeholder") || ""
    const value = this.getAttribute("value") || ""
    const disabled = this.hasAttribute("disabled")
    const type = this.visible ? "text" : "password"

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

        .field {
          display: grid;
          grid-template-columns: 1fr auto;
          border: 1px solid var(--rr-sem-borderField);
          border-radius: var(--rr-radius-sm);
          background: var(--rr-sem-surfaceField);
          overflow: hidden;
        }

        input {
          min-height: var(--rr-control-height);
          border: none;
          padding: 0 var(--rr-spacing-md);
          font-size: var(--rr-typography-fontSizeSm);
          line-height: var(--rr-typography-lineHeightParagraph);
          color: var(--rr-sem-textPrimary);
          background: var(--rr-sem-surfaceField);
          outline: none;
        }

        input::placeholder {
          color: var(--rr-sem-textMuted);
        }

        button {
          border: none;
          border-left: 1px solid var(--rr-sem-borderDefault);
          background: var(--rr-sem-surfaceSubtle);
          color: var(--rr-sem-textSecondary);
          padding: 0 var(--rr-spacing-md);
          cursor: pointer;
        }
      </style>
      <div class="wrapper">
        ${label ? `<label>${label}</label>` : `<slot name="label"></slot>`}
        <div class="field">
          <input type="${type}" placeholder="${placeholder}" value="${value}" ${disabled ? "disabled" : ""} />
          <button type="button" ${disabled ? "disabled" : ""}>${this.visible ? "Hide" : "Show"}</button>
        </div>
        <slot name="helper"></slot>
      </div>
    `

    const input = this.shadowRoot.querySelector("input")
    const toggle = this.shadowRoot.querySelector("button")

    input?.addEventListener("input", (event) => {
      this.setAttribute("value", event.target.value)
      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { value: event.target.value }
        })
      )
    })

    toggle?.addEventListener("click", () => {
      this.visible = !this.visible
      this.render()
    })
  }
}

if (!customElements.get("rr-password-input")) {
  customElements.define("rr-password-input", RrPasswordInput)
}
