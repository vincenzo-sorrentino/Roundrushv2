import { escapeHtml, getBooleanAttribute, rrBaseStyles } from "../internal/theme.js"
import rrDropdownTemplateStyles from "./rr-dropdown-template.css?inline"
import "./rr-dropdown-item.js"

const FIGMA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=18-0&m=dev"
const STYLES = `${rrBaseStyles}\n${rrDropdownTemplateStyles}`
const DEFAULT_ITEMS = [
  { text: "Edit", value: "edit" },
  { text: "Update", value: "update" },
  { type: "divider" },
  { text: "Delete", value: "delete", type: "destructive", iconLeft: "trash" }
]

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

function normalizeToken(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")
}

function normalizeState(value) {
  const candidate = normalizeToken(value || "default")
  if (candidate === "focus" || candidate === "active" || candidate === "active-focused" || candidate === "active/focused") {
    return "focused"
  }
  if (candidate === "disabled") {
    return "disabled"
  }
  if (candidate === "hover") {
    return "hover"
  }
  return "default"
}

function normalizeType(value) {
  const candidate = normalizeToken(value || "default")
  if (candidate === "divider") {
    return "divider"
  }
  if (candidate === "destructive") {
    return "destructive"
  }
  return "default"
}

function normalizeItem(item, index) {
  if (item && typeof item === "object") {
    const type = normalizeType(item.type || (item.divider ? "divider" : "default"))
    const text = String(item.text ?? item.label ?? item.value ?? `Option ${index + 1}`)
    return {
      type,
      text: type === "divider" ? "" : text,
      value: type === "divider" ? `divider-${index}` : String(item.value ?? text),
      state: normalizeState(item.state || "default"),
      disabled: item.disabled === true,
      iconLeft: item.iconLeft ?? item.icon_left ?? item.iconleft ?? item["icon-left"] ?? false,
      iconRight: item.iconRight ?? item.icon_right ?? item.iconright ?? item["icon-right"] ?? false,
      subline: item.subline ? String(item.subline) : "",
      checkbox: item.checkbox === true,
      avatar: item.avatar === true,
      dot: item.dot === true
    }
  }

  const text = String(item ?? "")
  return {
    type: "default",
    text,
    value: text,
    state: "default",
    disabled: false,
    iconLeft: false,
    iconRight: false,
    subline: "",
    checkbox: false,
    avatar: false,
    dot: false
  }
}

function renderItem(item, selectedValue, showSelectedCheck) {
  if (item.type === "divider") {
    return `<rr-dropdown-item type="divider"></rr-dropdown-item>`
  }

  const isSelected = String(item.value) === selectedValue
  const attrs = [
    `text="${escapeHtml(item.text)}"`,
    `value="${escapeHtml(item.value)}"`,
    `type="${item.type}"`,
    `state="${item.disabled ? "disabled" : item.state}"`
  ]

  if (item.disabled) {
    attrs.push("disabled")
  }
  if (item.subline) {
    attrs.push(`subline="${escapeHtml(item.subline)}"`)
  }
  if (item.checkbox) {
    attrs.push("checkbox")
  }
  if (item.avatar) {
    attrs.push("avatar")
  }
  if (item.dot) {
    attrs.push("dot")
  }
  if (item.iconLeft) {
    attrs.push(`icon-left="${escapeHtml(String(item.iconLeft))}"`)
  }
  if (item.iconRight) {
    attrs.push(`icon-right="${escapeHtml(String(item.iconRight))}"`)
  }
  if (showSelectedCheck && isSelected) {
    attrs.push("selected")
    if (!item.iconRight) {
      attrs.push('icon-right="check"')
    }
  }

  return `<rr-dropdown-item ${attrs.join(" ")}></rr-dropdown-item>`
}

class RrDropdownTemplate extends HTMLElement {
  static figmaUrl = FIGMA_URL

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.handleItemSelect = this.handleItemSelect.bind(this)
  }

  static get observedAttributes() {
    return ["options", "value", "show-selected-check", "figma-url"]
  }

  connectedCallback() {
    if (!this.hasAttribute("figma-url")) {
      this.setAttribute("figma-url", FIGMA_URL)
    }
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    void name
    if (oldValue === newValue) {
      return
    }
    this.render()
  }

  handleItemSelect(event) {
    event.stopPropagation()
    const detail = event.detail || {}
    if (detail.value !== undefined) {
      this.setAttribute("value", String(detail.value))
    }
    this.dispatchEvent(
      new CustomEvent("rr-select", {
        bubbles: true,
        composed: true,
        detail
      })
    )
  }

  render() {
    const selectedValue = this.getAttribute("value") || ""
    const showSelectedCheck = getBooleanAttribute(this, "show-selected-check", false)
    const rawOptions = parseOptions(this.getAttribute("options"))
    const normalized = (rawOptions.length > 0 ? rawOptions : DEFAULT_ITEMS).map(normalizeItem)
    const itemsMarkup = normalized.map((item) => renderItem(item, selectedValue, showSelectedCheck)).join("")

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="template" role="listbox">
        ${itemsMarkup}
      </div>
    `

    this.shadowRoot.querySelector(".template")?.addEventListener("rr-select", this.handleItemSelect)
  }
}

if (!customElements.get("rr-dropdown-template")) {
  customElements.define("rr-dropdown-template", RrDropdownTemplate)
}
