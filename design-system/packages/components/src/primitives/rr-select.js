import { rrBaseStyles } from "../internal/theme.js"

function parseOptions(raw) {
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

class RrSelect extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["label", "value", "disabled", "options"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const label = this.getAttribute("label") || ""
    const value = this.getAttribute("value") || ""
    const disabled = this.hasAttribute("disabled")
    const options = parseOptions(this.getAttribute("options"))

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}
        .wrapper {
          display: grid;
          gap: var(--rr-spacing-sm);
        }

        label {
          font-size: var(--rr-typography-fontSizeTiny);
          color: var(--rr-sem-textSecondary);
        }

        select {
          min-height: var(--rr-control-height);
          border-radius: var(--rr-radius-sm);
          border: 1px solid var(--rr-sem-borderField);
          background: var(--rr-sem-surfaceField);
          color: var(--rr-sem-textPrimary);
          padding: 0 var(--rr-spacing-md);
          font-size: var(--rr-typography-fontSizeSm);
          line-height: var(--rr-typography-lineHeightParagraph);
          outline: none;
        }

        select:focus {
          border-color: var(--rr-sem-actionPrimary);
        }
      </style>
      <div class="wrapper">
        ${label ? `<label>${label}</label>` : `<slot name="label"></slot>`}
        <select ${disabled ? "disabled" : ""}>
          ${options
            .map((option) => `<option value="${option.value}" ${option.value === value ? "selected" : ""}>${option.label}</option>`)
            .join("")}
        </select>
        <slot name="helper"></slot>
      </div>
    `

    this.shadowRoot.querySelector("select")?.addEventListener("change", (event) => {
      this.setAttribute("value", event.target.value)
      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { value: event.target.value }
        })
      )
    })
  }
}

if (!customElements.get("rr-select")) {
  customElements.define("rr-select", RrSelect)
}
