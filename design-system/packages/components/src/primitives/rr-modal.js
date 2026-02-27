import { rrBaseStyles } from "../internal/theme.js"

class RrModal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["open", "title"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const open = this.hasAttribute("open")
    const title = this.getAttribute("title") || "Modal"

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .backdrop {
          position: fixed;
          inset: 0;
          display: ${open ? "grid" : "none"};
          place-items: center;
          background: var(--rr-sem-overlay);
        }

        .dialog {
          min-width: 320px;
          max-width: 560px;
          border-radius: var(--rr-radius-lg);
          border: 1px solid var(--rr-sem-borderDefault);
          background: var(--rr-sem-surface);
          box-shadow: var(--rr-shadow-md);
          padding: var(--rr-spacing-xl);
          display: grid;
          gap: var(--rr-spacing-lg);
        }

        .title {
          font-size: var(--rr-typography-fontSizeLg);
          font-weight: var(--rr-typography-fontWeightSemibold);
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--rr-spacing-sm);
        }
      </style>
      <div class="backdrop" aria-hidden="${open ? "false" : "true"}">
        <section class="dialog" role="dialog" aria-modal="true" aria-label="${title}">
          <header class="title">${title}</header>
          <slot></slot>
          <div class="actions">
            <slot name="actions"></slot>
            <button type="button" data-close>Close</button>
          </div>
        </section>
      </div>
    `

    this.shadowRoot.querySelector("[data-close]")?.addEventListener("click", () => {
      this.removeAttribute("open")
      this.dispatchEvent(new CustomEvent("rr-close", { bubbles: true, composed: true }))
    })
  }
}

if (!customElements.get("rr-modal")) {
  customElements.define("rr-modal", RrModal)
}
