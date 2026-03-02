import { escapeHtml, getBooleanAttribute, normalizeOption, parseNumberAttribute, rrBaseStyles } from "../internal/theme.js"
import rrVerificationCodeInputStyles from "./rr-verification-code-input.css?inline"
import "./rr-mega-input.js"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1106-66757&m=dev"
const VALID_SIZES = ["sm", "md", "lg"]
const VALID_DIGITS = [4, 6]
const DEFAULT_LABEL = "Secure code"
const DEFAULT_HINT = "This is a hint text to help user."
const DEFAULT_VALUE = "000"
const STYLES = `${rrBaseStyles}\n${rrVerificationCodeInputStyles}`

function normalizeDigits(value) {
  const parsed = Number.parseInt(String(value ?? ""), 10)
  return VALID_DIGITS.includes(parsed) ? parsed : 4
}

function sanitizeCodeValue(value, digits) {
  return String(value ?? "")
    .replaceAll(/\D+/g, "")
    .slice(0, digits)
}

function buildCells({ digits, value, activeIndex, size, disabled, separator }) {
  const items = []
  for (let index = 0; index < digits; index += 1) {
    let state = "empty"
    let digit = ""

    if (index < value.length) {
      state = "filled"
      digit = value[index]
    } else if (!disabled && index === activeIndex) {
      state = "active"
    }

    const valueAttribute = digit ? ` value="${escapeHtml(digit)}"` : ""
    items.push(
      `<rr-mega-input class="code-cell" size="${size}" state="${state}" aria-label="Digit ${index + 1} of ${digits}"${disabled ? " disabled" : ""}${valueAttribute}></rr-mega-input>`
    )

    if (separator && digits === 6 && index === 2) {
      items.push('<span class="separator" aria-hidden="true">-</span>')
    }
  }

  return items.join("")
}

class RrVerificationCodeInput extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return [
      "size",
      "digits",
      "value",
      "active-index",
      "label",
      "hint",
      "show-label",
      "show-hint",
      "separator",
      "disabled",
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

    this.render()
  }

  get value() {
    const digits = normalizeDigits(this.getAttribute("digits") || "4")
    const fallback = this.hasAttribute("value") ? "" : DEFAULT_VALUE
    return sanitizeCodeValue(this.getAttribute("value") || fallback, digits)
  }

  set value(nextValue) {
    this.setAttribute("value", nextValue ?? "")
  }

  render() {
    const size = normalizeOption(this.getAttribute("size") || "md", VALID_SIZES, "md")
    const digits = normalizeDigits(this.getAttribute("digits") || "4")
    const disabled = this.hasAttribute("disabled")
    const separator = getBooleanAttribute(this, "separator", digits === 6)
    const value = this.value
    const defaultActiveIndex = Math.min(value.length, digits - 1)
    const activeIndex = disabled
      ? -1
      : parseNumberAttribute(this, "active-index", defaultActiveIndex, { min: 0, max: digits - 1 })

    const hasLabelAttribute = this.hasAttribute("label")
    const hasHintAttribute = this.hasAttribute("hint")
    const showLabel = getBooleanAttribute(this, "show-label", hasLabelAttribute)
    const showHint = getBooleanAttribute(this, "show-hint", hasHintAttribute)
    const label = this.getAttribute("label") || DEFAULT_LABEL
    const hint = this.getAttribute("hint") || DEFAULT_HINT

    const labelMarkup = showLabel ? `<label class="label">${escapeHtml(label)}</label>` : ""
    const hintMarkup = showHint ? `<p class="hint">${escapeHtml(hint)}</p>` : ""
    const cells = buildCells({ digits, value, activeIndex, size, disabled, separator })

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-size="${size}" data-digits="${digits}">
        ${labelMarkup}
        <div class="code-row" role="group" aria-label="Verification code input">
          ${cells}
        </div>
        ${hintMarkup}
      </div>
    `
  }
}

if (!customElements.get("rr-verification-code-input")) {
  customElements.define("rr-verification-code-input", RrVerificationCodeInput)
}
