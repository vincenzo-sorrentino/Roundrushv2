import { escapeHtml, rrBaseStyles } from "../internal/theme.js"
import rrModalStyles from "./rr-modal.css?inline"

const STYLES = `${rrBaseStyles}\n${rrModalStyles}`

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

  close() {
    this.removeAttribute("open")
    this.dispatchEvent(new CustomEvent("rr-close", { bubbles: true, composed: true }))
  }

  render() {
    const open = this.hasAttribute("open")
    const title = this.getAttribute("title") || "Modal"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="backdrop" data-open="${open}" aria-hidden="${open ? "false" : "true"}">
        <section class="dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
          <h2 class="title">${escapeHtml(title)}</h2>
          <slot></slot>
          <div class="actions">
            <slot name="actions"></slot>
            <button type="button" class="close" data-close>Close</button>
          </div>
        </section>
      </div>
    `

    this.shadowRoot.querySelector("[data-close]")?.addEventListener("click", () => this.close())

    this.shadowRoot.querySelector(".backdrop")?.addEventListener("click", (event) => {
      if (event.target.classList.contains("backdrop")) {
        this.close()
      }
    })
  }
}

if (!customElements.get("rr-modal")) {
  customElements.define("rr-modal", RrModal)
}
