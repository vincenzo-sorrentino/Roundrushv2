import { rrBaseStyles } from "../internal/theme.js"

class RrCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        article {
          background: var(--rr-sem-surface);
          border: 1px solid var(--rr-sem-borderDefault);
          border-radius: var(--rr-radius-lg);
          box-shadow: var(--rr-shadow-sm);
          padding: var(--rr-spacing-xl);
          display: grid;
          gap: var(--rr-spacing-lg);
        }

        header {
          font-size: var(--rr-typography-fontSizeLg);
          font-weight: var(--rr-typography-fontWeightSemibold);
          color: var(--rr-sem-textPrimary);
        }

        footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--rr-spacing-sm);
        }
      </style>
      <article>
        <header><slot name="header"></slot></header>
        <section><slot></slot></section>
        <footer><slot name="actions"></slot></footer>
      </article>
    `
  }
}

if (!customElements.get("rr-card")) {
  customElements.define("rr-card", RrCard)
}
