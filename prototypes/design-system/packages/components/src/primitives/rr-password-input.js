import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrPasswordInputStyles from "./rr-password-input.css?inline"

const VALID_STATES = ["default", "focused", "error", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrPasswordInputStyles}`

class RrPasswordInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.visible = false
  }

  static get observedAttributes() {
    return ["label", "placeholder", "value", "disabled", "state"]
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
    const state = normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state
    const type = this.visible ? "text" : "password"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-state="${resolvedState}">
        ${label ? `<label>${escapeHtml(label)}</label>` : `<slot name="label"></slot>`}
        <div class="field">
          <input type="${type}" placeholder="${escapeHtml(placeholder)}" value="${escapeHtml(value)}" ${disabled ? "disabled" : ""} />
          <button type="button" ${disabled ? "disabled" : ""}>${this.visible ? "Hide" : "Show"}</button>
        </div>
        <div class="helper"><slot name="helper"></slot></div>
      </div>
    `

    const input = this.shadowRoot.querySelector("input")
    const toggle = this.shadowRoot.querySelector("button")

    input?.addEventListener("input", (event) => {
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

    toggle?.addEventListener("click", () => {
      if (disabled) {
        return
      }
      this.visible = !this.visible
      this.render()
    })
  }
}

if (!customElements.get("rr-password-input")) {
  customElements.define("rr-password-input", RrPasswordInput)
}
