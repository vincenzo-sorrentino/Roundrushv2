import { escapeHtml, getBooleanAttribute, normalizeOption, parseNumberAttribute, rrBaseStyles } from "../internal/theme.js"
import rrTextAreaStyles from "./rr-text-area.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6373-33560&m=dev"
const DEFAULT_HELPER_TEXT = "This is a hint text to help user."
const DEFAULT_PLACEHOLDER = "Enter a description..."
const VALID_TYPES = ["default", "error"]
const VALID_STATES = ["default", "filled", "focused", "disabled"]
const STYLES = `${rrBaseStyles}\n${rrTextAreaStyles}`

class RrTextArea extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return [
      "label",
      "placeholder",
      "value",
      "type",
      "state",
      "disabled",
      "helper",
      "show-count",
      "max-length",
      "rows",
      "hide-helper",
      "hide-label",
      "figma-url"
    ]
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
      const textArea = this.shadowRoot.querySelector(".textarea")
      if (textArea && this.shadowRoot.activeElement === textArea) {
        if (textArea.value !== (newValue ?? "")) {
          textArea.value = newValue ?? ""
        }
        this.refreshCount(textArea.value.length)
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

  refreshCount(length) {
    const countNode = this.shadowRoot.querySelector(".count")
    if (!countNode) {
      return
    }

    const maxLength = parseNumberAttribute(this, "max-length", 0, { min: 0, max: 5000 })
    countNode.textContent = maxLength > 0 ? `${length}/${maxLength}` : String(length)
  }

  render() {
    const label = this.getAttribute("label")
    const helper = this.getAttribute("helper")
    const placeholder = this.getAttribute("placeholder") || DEFAULT_PLACEHOLDER
    const value = this.getAttribute("value") || ""
    const type = normalizeOption(this.getAttribute("type") || "default", VALID_TYPES, "default")
    const state = normalizeOption(this.getAttribute("state") || "default", VALID_STATES, "default")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const resolvedState = disabled ? "disabled" : state
    const resolvedType = resolvedState === "disabled" ? "default" : type
    const hideHelper = getBooleanAttribute(this, "hide-helper", false)
    const hideLabel = getBooleanAttribute(this, "hide-label", false)
    const showCount = getBooleanAttribute(this, "show-count", false)
    const rows = parseNumberAttribute(this, "rows", 4, { min: 3, max: 12 })
    const maxLength = parseNumberAttribute(this, "max-length", 0, { min: 0, max: 5000 })
    const maxLengthAttribute = maxLength > 0 ? `maxlength="${maxLength}"` : ""
    const countText = maxLength > 0 ? `${value.length}/${maxLength}` : String(value.length)

    const labelMarkup = hideLabel
      ? ""
      : label !== null
        ? `<label class="label">${escapeHtml(label || "Label")}</label>`
        : `<label class="label"><slot name="label">Label</slot></label>`

    const helperContent = helper !== null
      ? escapeHtml(helper || DEFAULT_HELPER_TEXT)
      : `<slot name="helper">${escapeHtml(DEFAULT_HELPER_TEXT)}</slot>`

    const helperMarkup = hideHelper ? "" : `<span class="helper-text">${helperContent}</span>`
    const countMarkup = showCount ? `<span class="count">${escapeHtml(countText)}</span>` : ""
    const footerMarkup = hideHelper && !showCount ? "" : `<div class="footer">${helperMarkup}${countMarkup}</div>`

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-type="${resolvedType}" data-state="${resolvedState}">
        ${labelMarkup}
        <div class="field">
          <textarea
            class="textarea"
            rows="${rows}"
            placeholder="${escapeHtml(placeholder)}"
            ${disabled ? "disabled" : ""}
            ${maxLengthAttribute}
          >${escapeHtml(value)}</textarea>
        </div>
        ${footerMarkup}
      </div>
    `

    this.shadowRoot.querySelector(".textarea")?.addEventListener("input", (event) => {
      const current = event.target.value
      if (current !== this.getAttribute("value")) {
        this.setAttribute("value", current)
      }

      const max = parseNumberAttribute(this, "max-length", 0, { min: 0, max: 5000 })
      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: {
            value: current,
            length: current.length,
            remaining: max > 0 ? max - current.length : null
          }
        })
      )
    })
  }
}

if (!customElements.get("rr-text-area")) {
  customElements.define("rr-text-area", RrTextArea)
}
