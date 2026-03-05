import rrFileMenuItemStyles from "./rr-file-menu-item.css?inline"
import { rrBaseStyles } from "../internal/theme.js"

const STYLES = `${rrBaseStyles}\n${rrFileMenuItemStyles}`

const FILE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
  <polyline points="13 2 13 9 20 9"/>
</svg>`

const DROPDOWN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>`

const CURSOR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M3 3l7.07 18.97L13.58 11l7.97-1.51L3 3z"/>
</svg>`

const BLOCKER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="10"/>
  <path d="M7 7l10 10M17 7l-10 10" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>`

const FLAG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 22V2h10l2 3h6v11H7l-2-3V22z"/>
</svg>`

class RrFileMenuItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
  }

  get state() {
    return this.getAttribute("state") || "default"
  }

  set state(value) {
    this.setAttribute("state", value)
    this.render()
  }

  get fileName() {
    return this.getAttribute("file-name") || "Untitled"
  }

  set fileName(value) {
    this.setAttribute("file-name", value)
    this.render()
  }

  get statusType() {
    return this.getAttribute("status-type") || "to-do"
  }

  set statusType(value) {
    this.setAttribute("status-type", value)
    this.render()
  }

  get showCheckbox() {
    return this.hasAttribute("show-checkbox")
  }

  get showAvatar() {
    return this.hasAttribute("show-avatar")
  }

  get showIcon() {
    return this.hasAttribute("show-icon") || !this.hasAttribute("hide-icon")
  }

  get showDropdown() {
    return this.hasAttribute("show-dropdown")
  }

  get showCursor() {
    return this.hasAttribute("show-cursor")
  }

  get showBlocker() {
    return this.hasAttribute("show-blocker")
  }

  get showFeatureFlag() {
    return this.hasAttribute("show-feature-flag")
  }

  get showStatus() {
    return this.hasAttribute("show-status") || !this.hasAttribute("hide-status")
  }

  get avatarSrc() {
    return this.getAttribute("avatar-src") || ""
  }

  getStatusLabel(type) {
    const statusMap = {
      "to-do": "To do",
      "released": "Released",
      "in-progress": "In progress",
      "approved": "Approved",
      "design": "Design",
      "review": "Review",
      "ready": "Ready"
    }
    return statusMap[type] || "To do"
  }

  render() {
    const state = this.state
    const showExtras = ["hover", "selected"].includes(state)

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="menu-item" data-state="${state}">
        ${this.showCheckbox ? `<div class="checkbox"></div>` : ""}
        
        ${this.showIcon || this.showDropdown || this.showAvatar ? `
          <div class="icon-container">
            ${this.showDropdown ? `
              <button class="dropdown-button" aria-label="Dropdown menu">
                ${DROPDOWN_ICON}
              </button>
            ` : ""}
            ${this.showIcon ? `
              <div class="icon-wrapper">
                ${FILE_ICON}
              </div>
            ` : ""}
          </div>
        ` : ""}

        ${this.showAvatar && this.avatarSrc ? `
          <div class="avatar">
            <img src="${this.avatarSrc}" alt="Avatar" />
          </div>
        ` : ""}

        <div class="content">
          <div class="text-container">
            <p class="file-name">${this.fileName}</p>
            ${this.showCursor ? `
              <div class="cursor-icon">
                ${CURSOR_ICON}
              </div>
            ` : ""}
          </div>
        </div>

        <div class="extras">
          ${showExtras && this.showBlocker ? `
            <div class="blocker">
              ${BLOCKER_ICON}
            </div>
          ` : ""}
          ${showExtras && this.showFeatureFlag ? `
            <div class="feature-flag">
              ${FLAG_ICON}
            </div>
          ` : ""}
          ${!showExtras && this.showBlocker ? `
            <div class="blocker">
              ${BLOCKER_ICON}
            </div>
          ` : ""}
          ${!showExtras && this.showFeatureFlag ? `
            <div class="feature-flag">
              ${FLAG_ICON}
            </div>
          ` : ""}
          ${this.showStatus ? `
            <div class="status-badge" data-type="${this.statusType}">
              ${this.getStatusLabel(this.statusType)}
            </div>
          ` : ""}
        </div>
      </div>
    `

    // Add event listeners
    this.setupEventListeners()
  }

  setupEventListeners() {
    const menuItem = this.shadowRoot.querySelector(".menu-item")
    const dropdownBtn = this.shadowRoot.querySelector(".dropdown-button")

    menuItem?.addEventListener("mouseenter", () => {
      if (this.state === "default") {
        this.state = "hover"
      }
    })

    menuItem?.addEventListener("mouseleave", () => {
      if (this.state === "hover") {
        this.state = "default"
      }
    })

    menuItem?.addEventListener("click", (e) => {
      if (e.target !== dropdownBtn) {
        this.state = this.state === "selected" ? "default" : "selected"
        this.dispatchEvent(new CustomEvent("rr-menu-item-select", {
          detail: { fileName: this.fileName },
          bubbles: true
        }))
      }
    })

    dropdownBtn?.addEventListener("click", (e) => {
      e.stopPropagation()
      this.dispatchEvent(new CustomEvent("rr-dropdown-click", {
        detail: { fileName: this.fileName },
        bubbles: true
      }))
    })
  }

  static get observedAttributes() {
    return ["state", "file-name", "status-type"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }
}

if (!customElements.get("rr-file-menu-item")) {
  customElements.define("rr-file-menu-item", RrFileMenuItem)
}
