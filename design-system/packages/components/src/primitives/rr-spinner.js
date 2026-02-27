import { rrBaseStyles } from "../internal/theme.js"

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
    const size = this.getAttribute("size") || "20"

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .spinner {
          width: ${size}px;
          height: ${size}px;
          border-radius: 999px;
          border: 2px solid var(--rr-sem-borderDefault);
          border-top-color: var(--rr-sem-actionPrimary);
          animation: rr-spin 800ms linear infinite;
        }

        @keyframes rr-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="spinner" role="status" aria-label="Loading"></div>
    `
  }
}

if (!customElements.get("rr-spinner")) {
  customElements.define("rr-spinner", RrSpinner)
}
