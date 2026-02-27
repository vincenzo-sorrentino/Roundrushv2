import { rrBaseStyles } from "../internal/theme.js"

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
    const variant = this.getAttribute("variant") || "info"

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .alert {
          border-radius: var(--rr-radius-md);
          border: 1px solid var(--rr-sem-borderDefault);
          padding: var(--rr-spacing-md);
          font-size: var(--rr-typography-fontSizeSm);
          color: var(--rr-sem-textPrimary);
          background: var(--rr-sem-surfaceSubtle);
        }

        .alert[data-variant="danger"] {
          border-color: var(--rr-sem-danger);
        }

        .alert[data-variant="success"] {
          border-color: var(--rr-sem-success);
        }
      </style>
      <div class="alert" data-variant="${variant}" role="status">
        <slot></slot>
      </div>
    `
  }
}

if (!customElements.get("rr-alert")) {
  customElements.define("rr-alert", RrAlert)
}
