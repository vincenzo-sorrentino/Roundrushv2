import { rrBaseStyles } from "../internal/theme.js"
import rrCardStyles from "./rr-card.css?inline"

const STYLES = `${rrBaseStyles}\n${rrCardStyles}`

class RrCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.observer = new MutationObserver(() => this.render())
  }

  connectedCallback() {
    this.observer.observe(this, { childList: true, subtree: true })
    this.render()
  }

  disconnectedCallback() {
    this.observer.disconnect()
  }

  render() {
    const hasHeader = Boolean(this.querySelector('[slot="header"]'))
    const hasActions = Boolean(this.querySelector('[slot="actions"]'))

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <article data-has-header="${hasHeader}" data-has-actions="${hasActions}">
        <header><slot name="header"></slot></header>
        <section class="content"><slot></slot></section>
        <footer><slot name="actions"></slot></footer>
      </article>
    `
  }
}

if (!customElements.get("rr-card")) {
  customElements.define("rr-card", RrCard)
}
