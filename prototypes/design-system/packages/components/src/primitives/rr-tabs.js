import rrTabsStyles from "./rr-tabs.css?inline"
import { escapeHtml, getBooleanAttribute, normalizeOption, rrBaseStyles } from "../internal/theme.js"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6381-104724&m=dev"
const VALID_TYPES = ["horizontal", "vertical"]
const VALID_STATES = ["default", "hover", "focus", "disabled", "selected", "selected-hover"]
const STYLES = `${rrBaseStyles}\n${rrTabsStyles}`

const DEFAULT_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 10L12 15L17 10"></path>
  </svg>
`

class RrTabs extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["type", "state", "disabled", "badge", "badge-value", "icon", "label"]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  getType() {
    return normalizeOption(this.getAttribute("type") || "horizontal", VALID_TYPES, "horizontal")
  }

  getState() {
    return normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
  }

  render() {
    const type = this.getType()
    const state = this.getState()
    const disabled = getBooleanAttribute(this, "disabled") || state === "disabled"
    const showBadge = getBooleanAttribute(this, "badge")
    const showIcon = getBooleanAttribute(this, "icon")
    const badgeValue = this.getAttribute("badge-value") || "3"
    const label = this.getAttribute("label") || "LOREM IPSUM"

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        type="button"
        data-type="${type}"
        data-state="${state}"
        ${disabled ? "disabled" : ""}
      >
        <span class="label"><slot>${escapeHtml(label)}</slot></span>
        ${showBadge ? `<span class="badge">${escapeHtml(badgeValue)}</span>` : ""}
        ${showIcon ? `<span class="icon">${DEFAULT_ICON}</span>` : ""}
      </button>
    `

    this.shadowRoot.querySelector("button")?.addEventListener("click", (event) => {
      this.dispatchEvent(
        new CustomEvent("rr-click", {
          bubbles: true,
          composed: true,
          detail: { sourceEvent: event }
        })
      )
    })
  }
}

if (!customElements.get("rr-tabs")) {
  customElements.define("rr-tabs", RrTabs)
}
