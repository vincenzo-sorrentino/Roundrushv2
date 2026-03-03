import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrMegaInputStyles from "./rr-mega-input.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1106-66560&m=dev"
const VALID_SIZES = ["sm", "md", "lg"]
const VALID_STATES = ["empty", "active", "filled", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrMegaInputStyles}`

class RrMegaInput extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["size", "state", "value", "disabled", "figma-url", "aria-label"]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === "value") {
      const input = this.shadowRoot.querySelector(".input")
      if (input && this.shadowRoot.activeElement === input) {
        if (input.value !== (newValue ?? "")) {
          input.value = newValue ?? ""
        }
        return
      }
    }

    this.render()
  }

  get value() {
    return this.getAttribute("value") || ""
  }

  set value(nextValue) {
    this.setAttribute("value", nextValue ?? "")
  }

  render() {
    const size = normalizeOption(this.getAttribute("size") || "md", VALID_SIZES, "md")
    const requestedState = normalizeOption(this.getAttribute("state") || "empty", VALID_STATES, "empty")
    const disabled = this.hasAttribute("disabled") || requestedState === "disabled"
    const state = disabled ? "disabled" : requestedState
    const value = (this.getAttribute("value") || "").slice(0, 1)
    const displayValue = value || (state === "filled" || state === "focused" || state === "disabled" ? "0" : "")
    const ariaLabel = this.getAttribute("aria-label") || "Verification digit input"
    const showCaret = state === "active" && displayValue.length === 0

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-size="${size}" data-state="${state}">
        <div class="field">
          <input
            class="input"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="1"
            value="${escapeHtml(displayValue)}"
            aria-label="${escapeHtml(ariaLabel)}"
            ${disabled ? "disabled" : ""}
          />
          ${showCaret ? '<span class="caret" aria-hidden="true"></span>' : ""}
        </div>
      </div>
    `

    this.shadowRoot.querySelector(".input")?.addEventListener("input", (event) => {
      const nextValue = (event.target.value || "").slice(0, 1)
      if (event.target.value !== nextValue) {
        event.target.value = nextValue
      }

      if (nextValue !== this.getAttribute("value")) {
        this.setAttribute("value", nextValue)
      }

      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { value: nextValue }
        })
      )
    })
  }
}

if (!customElements.get("rr-mega-input")) {
  customElements.define("rr-mega-input", RrMegaInput)
}
