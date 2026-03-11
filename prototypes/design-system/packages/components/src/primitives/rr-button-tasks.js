import { escapeHtml, normalizeOption, rrBaseStyles } from "../internal/theme.js"
import rrButtonTasksStyles from "./rr-button-tasks.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=2318-3505&m=dev"
const DEFAULT_ICON_URL = "http://localhost:3845/assets/253d584d7c41be7f9b372b51461c2c65a2e94a5d.svg"
const ACTIVE_ICON_URL = "http://localhost:3845/assets/d2b6309051df901a354ab3866b990defae07df5b.svg"
const VALID_STATES = ["default", "hover", "active"]
const STYLES = `${rrBaseStyles}\n${rrButtonTasksStyles}`

class RrButtonTasks extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["state", "label", "disabled"]
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

  getState() {
    return normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
  }

  render() {
    const state = this.getState()
    const disabled = this.hasAttribute("disabled")
    const ariaLabel = this.getAttribute("label") || this.getAttribute("aria-label") || "Tasks"
    const iconUrl = state === "active" ? ACTIVE_ICON_URL : DEFAULT_ICON_URL

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <button
        type="button"
        data-state="${state}"
        aria-label="${escapeHtml(ariaLabel)}"
        ${disabled ? "disabled" : ""}
      >
        <span class="icon">
          <img src="${iconUrl}" alt="" />
        </span>
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

if (!customElements.get("rr-button-tasks")) {
  customElements.define("rr-button-tasks", RrButtonTasks)
}
