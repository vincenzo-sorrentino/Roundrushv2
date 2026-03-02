import { normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrCheckboxStyles from "./rr-checkbox.css?inline"

const VALID_STATES = ["default", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrCheckboxStyles}`

class RrCheckbox extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["checked", "disabled", "state"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const checked = this.hasAttribute("checked")
    const state = normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <label data-state="${resolvedState}">
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
