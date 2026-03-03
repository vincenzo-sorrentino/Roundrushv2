import { escapeHtml, getBooleanAttribute, rrBaseStyles } from "../internal/theme.js"
import rrInputStyles from "./rr-input.css?inline"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6373-31764&m=dev"
const DEFAULT_HELPER_TEXT = "This is a hint text to help user."
const VALID_VARIANTS = ["default", "trailing-icon", "money", "phone", "link", "credit-card"]
const VALID_STATES = ["placeholder", "hover", "filled", "focused", "disabled", "error", "error-focused"]
const VALID_INPUT_TYPES = ["text", "email", "password", "number", "tel", "url", "search"]
const DEFAULT_INPUT_TYPE_BY_VARIANT = {
  default: "text",
  "trailing-icon": "text",
  money: "text",
  phone: "tel",
  link: "url",
  "credit-card": "text"
}
const STYLES = `${rrBaseStyles}\n${rrInputStyles}`

function normalizeToken(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")
}

function normalizeVariant(value) {
  const candidate = normalizeToken(value)
  const aliases = {
    default: "default",
    text: "default",
    plain: "default",
    "trailing-icon": "trailing-icon",
    trailing: "trailing-icon",
    icon: "trailing-icon",
    money: "money",
    currency: "money",
    phone: "phone",
    tel: "phone",
    link: "link",
    url: "link",
    "credit-card": "credit-card",
    credit: "credit-card",
    creditcard: "credit-card",
    card: "credit-card"
  }

  const resolved = aliases[candidate] ?? candidate
  return VALID_VARIANTS.includes(resolved) ? resolved : "default"
}

function normalizeState(value) {
  const candidate = normalizeToken(value)
  if (candidate === "default") {
    return "placeholder"
  }
  if (candidate === "errorfocused") {
    return "error-focused"
  }
  return VALID_STATES.includes(candidate) ? candidate : "placeholder"
}

function normalizeInputType(value, fallback = "text") {
  const candidate = normalizeToken(value)
  return VALID_INPUT_TYPES.includes(candidate) ? candidate : fallback
}

function renderIcon(type) {
  if (type === "envelope") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2"></rect>
        <path d="M4 7l8 6 8-6"></path>
      </svg>
    `
  }

  if (type === "warning") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 7.75v5.25"></path>
        <circle cx="12" cy="16.5" r="1" class="icon-dot"></circle>
      </svg>
    `
  }

  if (type === "caret") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7 10l5 5 5-5"></path>
      </svg>
    `
  }

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M9.75 9.75a2.25 2.25 0 014.5 0c0 1.5-2.25 1.875-2.25 3.75"></path>
      <circle cx="12" cy="16.5" r="1" class="icon-dot"></circle>
    </svg>
  `
}

function renderCardBrandBadge() {
  return `
    <span class="card-brand" aria-hidden="true">
      <svg viewBox="0 0 34 24" focusable="false">
        <rect x="0.5" y="0.5" width="33" height="23" rx="4" fill="#ffffff" stroke="#f2f4f7"></rect>
        <circle cx="13.5" cy="12" r="6" fill="#eb001b"></circle>
        <circle cx="20.5" cy="12" r="6" fill="#f79e1b"></circle>
        <path d="M17 6.7a6 6 0 0 0 0 10.6a6 6 0 0 0 0-10.6Z" fill="#ff5f00"></path>
      </svg>
    </span>
  `
}

function renderInputControl({ type, value, placeholder, disabled, inputMode, ariaLabel }) {
  const modeAttr = inputMode ? ` inputmode="${escapeHtml(inputMode)}"` : ""
  return `
    <input
      class="input"
      type="${escapeHtml(type)}"
      value="${escapeHtml(value)}"
      placeholder="${escapeHtml(placeholder)}"
      aria-label="${escapeHtml(ariaLabel)}"
      ${disabled ? "disabled" : ""}${modeAttr}
    />
  `
}

function renderTrailingIcon(state, show) {
  if (!show) {
    return ""
  }

  const iconType = state === "error" || state === "error-focused" ? "warning" : "question"
  return `<span class="icon icon--trailing" aria-hidden="true">${renderIcon(iconType)}</span>`
}

function renderFieldMarkup({ variant, state, value, placeholder, disabled, rightIcon, currency, country, protocol, inputType }) {
  const inputMode = variant === "money" ? "decimal" : variant === "phone" ? "tel" : undefined
  const ariaLabel = "Input field"
  const inputControl = renderInputControl({ type: inputType, value, placeholder, disabled, inputMode, ariaLabel })
  const trailingIcon = renderTrailingIcon(state, rightIcon)

  if (variant === "money") {
    return `
      <div class="field">
        <div class="content content--money">
          <div class="money-copy">
            <span class="money-symbol">$</span>
            ${inputControl}
          </div>
          ${trailingIcon}
        </div>
        <div class="addon addon--money">
          <span class="addon-value">${escapeHtml(currency)}</span>
          <span class="icon icon--caret" aria-hidden="true">${renderIcon("caret")}</span>
        </div>
      </div>
    `
  }

  if (variant === "phone") {
    return `
      <div class="field">
        <div class="addon addon--phone">
          <span class="addon-value">${escapeHtml(country)}</span>
          <span class="icon icon--caret" aria-hidden="true">${renderIcon("caret")}</span>
        </div>
        <div class="content content--phone">
          ${inputControl}
          ${trailingIcon}
        </div>
      </div>
    `
  }

  if (variant === "link") {
    return `
      <div class="field">
        <div class="addon addon--link">
          <span class="prefix-text">${escapeHtml(protocol)}</span>
        </div>
        <div class="content content--link">
          ${inputControl}
          ${trailingIcon}
        </div>
      </div>
    `
  }

  const leading = variant === "trailing-icon"
    ? `<span class="icon icon--leading" aria-hidden="true">${renderIcon("envelope")}</span>`
    : variant === "credit-card"
      ? renderCardBrandBadge()
      : ""

  return `
    <div class="field">
      <div class="content content--simple">
        ${leading}
        ${inputControl}
      </div>
      ${trailingIcon}
    </div>
  `
}

class RrInput extends HTMLElement {
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
      "input-type",
      "variant",
      "field-type",
      "kind",
      "state",
      "disabled",
      "helper",
      "right-icon",
      "currency",
      "country",
      "protocol",
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
    const label = this.getAttribute("label")
    const helper = this.getAttribute("helper")
    const placeholder = this.getAttribute("placeholder") || "Placeholder"
    const value = this.getAttribute("value") || ""
    const typeAttribute = this.getAttribute("type") || ""
    const variantSource = this.getAttribute("variant") || this.getAttribute("field-type") || this.getAttribute("kind") || typeAttribute
    const variant = normalizeVariant(variantSource)
    const state = normalizeState(this.getAttribute("state") || "placeholder")
    const disabled = this.hasAttribute("disabled") || state === "disabled"
    const showRightIcon = getBooleanAttribute(this, "right-icon", true)
    const resolvedState = disabled ? "disabled" : state
    const currency = this.getAttribute("currency") || "USD"
    const country = this.getAttribute("country") || "US"
    const protocol = this.getAttribute("protocol") || "http://"
    const hideHelper = getBooleanAttribute(this, "hide-helper", false)
    const hideLabel = getBooleanAttribute(this, "hide-label", false)
    const legacyInputType = normalizeInputType(typeAttribute, "")
    const explicitInputType = this.getAttribute("input-type") || legacyInputType
    const inputType = normalizeInputType(explicitInputType, DEFAULT_INPUT_TYPE_BY_VARIANT[variant])

    const labelMarkup = hideLabel
      ? ""
      : label !== null
        ? `<label class="label">${escapeHtml(label || "Label")}</label>`
        : `<label class="label"><slot name="label">Label</slot></label>`

    const helperContent = helper !== null
      ? escapeHtml(helper || DEFAULT_HELPER_TEXT)
      : `<slot name="helper">${escapeHtml(DEFAULT_HELPER_TEXT)}</slot>`

    const helperMarkup = hideHelper ? "" : `<p class="helper">${helperContent}</p>`
    const fieldMarkup = renderFieldMarkup({
      variant,
      state: resolvedState,
      value,
      placeholder,
      disabled,
      rightIcon: showRightIcon,
      currency,
      country,
      protocol,
      inputType
    })

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="wrapper" data-variant="${variant}" data-state="${resolvedState}">
        ${labelMarkup}
        ${fieldMarkup}
        ${helperMarkup}
      </div>
    `

    this.shadowRoot.querySelector(".input")?.addEventListener("input", (event) => {
      const current = event.target.value
      if (current !== this.getAttribute("value")) {
        this.setAttribute("value", current)
      }
      this.dispatchEvent(
        new CustomEvent("rr-change", {
          bubbles: true,
          composed: true,
          detail: { value: current }
        })
      )
    })
  }
}

if (!customElements.get("rr-input")) {
  customElements.define("rr-input", RrInput)
}
