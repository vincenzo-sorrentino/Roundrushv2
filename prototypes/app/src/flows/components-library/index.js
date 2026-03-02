import { tokens } from "@roundrush/tokens"

const BUTTON_VARIANTS = ["primary", "secondary", "neutral", "border", "text", "destructive"]
const BUTTON_STATES = ["default", "hover", "focused", "disabled"]
const BUTTON_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"]
const ICON_BUTTON_TYPES = ["primary", "secondary", "neutral", "border", "icon", "destructive"]
const ICON_BUTTON_SIZES = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]
const LINK_BUTTON_COLORS = ["primary", "black"]
const LINK_BUTTON_SIZES = ["sm", "md"]
const LINK_BUTTON_ICON_DISPLAYS = ["leading", "trailing"]
const INPUT_VARIANTS = [
  { label: "Trailing Icon", value: "trailing-icon" },
  { label: "Money", value: "money" },
  { label: "Phone", value: "phone" },
  { label: "Link", value: "link" },
  { label: "Credit Card", value: "credit-card" },
  { label: "Default", value: "default" }
]
const INPUT_STATES = ["placeholder", "hover", "filled", "focused", "disabled", "error", "error-focused"]
const DROPDOWN_TYPES = [
  { label: "Default", value: "default" },
  { label: "Icon Leading", value: "icon-leading" },
  { label: "Avatar Leading", value: "avatar-leading" }
]
const DROPDOWN_FIELD_ROWS = [
  { label: "default-no value", state: "default", hasValue: false },
  { label: "default-value", state: "default", hasValue: true },
  { label: "hover", state: "hover", hasValue: true },
  { label: "focused", state: "focused", hasValue: true },
  { label: "disabled", state: "disabled", hasValue: false }
]
const DROPDOWN_ITEM_STATES = ["default", "hover", "focused", "disabled"]
const DROPDOWN_ITEM_TYPES = [
  { label: "Default", value: "default" },
  { label: "Destructive", value: "destructive" }
]
const DROPDOWN_SELECTOR_OPTIONS = JSON.stringify([
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" }
])
const DROPDOWN_TEMPLATE_OPTIONS = JSON.stringify([
  { text: "Edit", value: "edit" },
  { text: "Update", value: "update" },
  { type: "divider" },
  { text: "Delete", value: "delete", type: "destructive", iconLeft: "trash" }
])
const TOGGLE_SIZES = ["sm", "md", "lg"]
const TOGGLE_STATES = ["default", "hover", "focused", "disabled"]
const MEGA_INPUT_SIZES = ["sm", "md", "lg"]
const MEGA_INPUT_STATES = ["empty", "active", "filled", "focused", "disabled"]
const VERIFICATION_CODE_SIZES = ["sm", "md", "lg"]
const VERIFICATION_CODE_DIGITS = [4, 6]
const TABLE_ATOM_STATES = ["default", "hover", "disabled"]
const TABLE_ATOM_VARIANTS = [
  {
    label: "Default / File",
    tag: "rr-table-cell-default",
    attrs: 'title="Tech requirements.pdf" subtitle="200 KB" show-icon'
  },
  {
    label: "Default / Link Hover",
    tag: "rr-table-cell-default",
    attrs: 'title="Tech requirements.pdf" subtitle="200 KB" show-icon',
    hoverState: "hover-blue"
  },
  {
    label: "Default / Checkbox + Avatar",
    tag: "rr-table-cell-default",
    attrs: 'title="Tech requirements.pdf" subtitle="200 KB" show-checkbox show-avatar'
  },
  {
    label: "Add New Record",
    tag: "rr-table-cell-add-record",
    attrs: 'title="New"'
  },
  {
    label: "Progress",
    tag: "rr-table-cell-progress",
    attrs: 'percent="60"'
  },
  {
    label: "Checkbox",
    tag: "rr-table-cell-checkbox",
    attrs: ""
  },
  {
    label: "Radio",
    tag: "rr-table-cell-radio",
    attrs: ""
  },
  {
    label: "Toggle",
    tag: "rr-table-cell-toggle",
    attrs: ""
  },
  {
    label: "Rating",
    tag: "rr-table-cell-rating",
    attrs: 'rating="4"'
  },
  {
    label: "Avatar",
    tag: "rr-table-cell-avatar",
    attrs: ""
  },
  {
    label: "Avatar Group",
    tag: "rr-table-cell-avatar-group",
    attrs: 'title="10 users" users-count="10" overflow-count="5" avatars-count="5" show-text'
  },
  {
    label: "Icon Button",
    tag: "rr-table-cell-icon-button",
    attrs: ""
  },
  {
    label: "Button",
    tag: "rr-table-cell-button",
    attrs: 'title="pull/9874"'
  },
  {
    label: "Priority",
    tag: "rr-table-cell-priority",
    attrs: 'title="Urgent"'
  },
  {
    label: "Badge / Single",
    tag: "rr-table-cell-badge",
    attrs: 'badge-type="single"'
  },
  {
    label: "Badge / Group",
    tag: "rr-table-cell-badge",
    attrs: 'badge-type="group"'
  },
  {
    label: "Status",
    tag: "rr-table-cell-status",
    attrs: 'title="Ready for sprint"'
  },
  {
    label: "TC Status",
    tag: "rr-table-cell-tc-status",
    attrs: 'title="Pass"'
  },
  {
    label: "Badge Square",
    tag: "rr-table-cell-badge-square",
    attrs: 'title="Label"'
  },
  {
    label: "Scope",
    tag: "rr-table-cell-scope",
    attrs: 'title="FE"'
  },
  {
    label: "Roadmap",
    tag: "rr-table-cell-roadmap",
    attrs: 'title="TRA002"'
  },
  {
    label: "Module",
    tag: "rr-table-cell-module",
    attrs: 'title="LOG" subtitle="Login"'
  }
]

const ALERT_VARIANTS = ["info", "success", "warning", "danger"]
const FIGMA_BUTTON_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6353-98804&m=dev"
const FIGMA_ICON_BUTTON_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=821-6261&m=dev"
const FIGMA_LINK_BUTTON_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=821-7099&m=dev"
const FIGMA_INPUT_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6373-31764&m=dev"
const FIGMA_MEGA_INPUT_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1106-66560&m=dev"
const FIGMA_VERIFICATION_CODE_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1106-66757&m=dev"
const FIGMA_TEXT_AREA_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=6373-33560&m=dev"
const FIGMA_DROPDOWN_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=18-0&m=dev"
const FIGMA_TOGGLE_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=1102-4631&m=dev"
const FIGMA_TABLE_ATOMS_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System?node-id=214-0&m=dev"

const SEMANTIC_SWATCHES = [
  { label: "Page", token: "--rr-sem-background-page" },
  { label: "Surface", token: "--rr-sem-surface" },
  { label: "Surface Subtle", token: "--rr-sem-surfaceSubtle" },
  { label: "Primary Action", token: "--rr-sem-action-btnPrimary" },
  { label: "Secondary Action", token: "--rr-sem-action-btnSecondary" },
  { label: "Danger Action", token: "--rr-sem-action-btnDanger" },
  { label: "Text Primary", token: "--rr-sem-textPrimary" },
  { label: "Border Default", token: "--rr-sem-borderDefault" }
]

function renderSemanticSwatches() {
  return SEMANTIC_SWATCHES.map(
    (item) => `
      <article class="rr-library-token-card">
        <div class="rr-library-token-color" style="background: var(${item.token});"></div>
        <div class="rr-library-token-meta">
          <strong>${item.label}</strong>
          <code>${item.token}</code>
        </div>
      </article>
    `
  ).join("")
}

function renderButtonMatrix() {
  return BUTTON_VARIANTS.map(
    (variant) => `
      <div class="rr-library-matrix-row">
        <div class="rr-library-matrix-label">${variant}</div>
        ${BUTTON_STATES.map((state) => `<rr-button variant="${variant}" state="${state}" icon-right>Button CTA</rr-button>`).join("")}
      </div>
    `
  ).join("")
}

function renderButtonSizes() {
  return BUTTON_SIZES.map((size) => `<rr-button variant="primary" size="${size}" icon-right>${size.toUpperCase()}</rr-button>`).join("")
}

function renderIconButtonMatrix() {
  return ICON_BUTTON_TYPES.map(
    (type) => `
      <div class="rr-library-matrix-row">
        <div class="rr-library-matrix-label">${type}</div>
        ${BUTTON_STATES.map((state) => `<rr-button-icon type="${type}" size="md" state="${state}" label="${type} ${state}"></rr-button-icon>`).join("")}
      </div>
    `
  ).join("")
}

function renderIconButtonSizes() {
  return ICON_BUTTON_SIZES.map((size) => `<rr-button-icon type="primary" size="${size}" label="Primary ${size}"></rr-button-icon>`).join("")
}

function renderLinkButtonMatrix() {
  return LINK_BUTTON_COLORS.map(
    (color) => `
      ${LINK_BUTTON_ICON_DISPLAYS.map((iconDisplay) => `
        <div class="rr-library-matrix-row">
          <div class="rr-library-matrix-label">${color} / ${iconDisplay}</div>
          ${BUTTON_STATES.map((state) => `<rr-button-link color="${color}" size="md" state="${state}" icon-display="${iconDisplay}">Button CTA</rr-button-link>`).join("")}
        </div>
      `).join("")}
    `
  ).join("")
}

function renderLinkButtonSizes() {
  return LINK_BUTTON_SIZES.map((size) => `<rr-button-link color="primary" size="${size}" icon-display="leading">Button CTA</rr-button-link>`).join("")
}

function renderInputCell(state, variant) {
  const attrs = [
    `variant="${variant.value}"`,
    `state="${state}"`,
    `label="Label"`,
    `value="Placeholder"`,
    `helper="This is a hint text to help user."`
  ]

  return `
    <div class="rr-library-input-cell">
      <rr-input ${attrs.join(" ")}></rr-input>
    </div>
  `
}

function renderInputMatrix() {
  return `
    <div class="rr-library-input-matrix">
      <div class="rr-library-input-row rr-library-input-row--header">
        <div class="rr-library-input-axis">State</div>
        ${INPUT_VARIANTS.map((variant) => `<div class="rr-library-input-col-title">${variant.label}</div>`).join("")}
      </div>
      ${INPUT_STATES.map((state) => `
        <div class="rr-library-input-row">
          <div class="rr-library-input-axis">${state.replace("-", " ")}</div>
          ${INPUT_VARIANTS.map((variant) => renderInputCell(state, variant)).join("")}
        </div>
      `).join("")}
    </div>
  `
}

function renderMegaInputCell(state, size) {
  const valueAttribute = state === "filled" || state === "focused" || state === "disabled" ? ' value="0"' : ""
  return `
    <div class="rr-library-mega-cell">
      <rr-mega-input size="${size}" state="${state}" aria-label="Verification digit"${valueAttribute}></rr-mega-input>
    </div>
  `
}

function renderMegaInputMatrix() {
  return `
    <div class="rr-library-mega-matrix">
      <div class="rr-library-mega-row rr-library-mega-row--header">
        <div class="rr-library-mega-axis">State</div>
        ${MEGA_INPUT_SIZES.map((size) => `<div class="rr-library-mega-col-title">${size.toUpperCase()}</div>`).join("")}
      </div>
      ${MEGA_INPUT_STATES.map((state) => `
        <div class="rr-library-mega-row">
          <div class="rr-library-mega-axis">${state}</div>
          ${MEGA_INPUT_SIZES.map((size) => renderMegaInputCell(state, size)).join("")}
        </div>
      `).join("")}
    </div>
  `
}

function renderDropdownFieldCell(row, type) {
  const attrs = [
    `type="${type.value}"`,
    `state="${row.state}"`,
    'label="Label"',
    'placeholder="Select"',
    `options='${DROPDOWN_SELECTOR_OPTIONS}'`
  ]
  if (row.hasValue) {
    attrs.push('value="admin"')
  }
  return `
    <div class="rr-library-dropdown-cell">
      <rr-select ${attrs.join(" ")}></rr-select>
    </div>
  `
}

function renderDropdownFieldMatrix() {
  return `
    <div class="rr-library-dropdown-matrix-wrap">
      <div class="rr-library-dropdown-matrix">
        <div class="rr-library-dropdown-row rr-library-dropdown-row--header">
          <div class="rr-library-dropdown-axis">State</div>
          ${DROPDOWN_TYPES.map((type) => `<div class="rr-library-dropdown-col-title">${type.label}</div>`).join("")}
        </div>
        ${DROPDOWN_FIELD_ROWS.map((row) => `
          <div class="rr-library-dropdown-row">
            <div class="rr-library-dropdown-axis">${row.label}</div>
            ${DROPDOWN_TYPES.map((type) => renderDropdownFieldCell(row, type)).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `
}

function renderDropdownItemCell(state, type) {
  const text = type.value === "destructive" ? "Delete" : "Option"
  const iconLeft = type.value === "destructive" ? ' icon-left="trash"' : ""
  return `
    <div class="rr-library-dropdown-item-cell">
      <rr-dropdown-item
        type="${type.value}"
        state="${state}"
        text="${text}"${iconLeft}>
      </rr-dropdown-item>
    </div>
  `
}

function renderDropdownItemMatrix() {
  return `
    <div class="rr-library-dropdown-item-matrix-wrap">
      <div class="rr-library-dropdown-item-matrix">
        <div class="rr-library-dropdown-item-row rr-library-dropdown-item-row--header">
          <div class="rr-library-dropdown-item-axis">State</div>
          ${DROPDOWN_ITEM_TYPES.map((type) => `<div class="rr-library-dropdown-item-col-title">${type.label}</div>`).join("")}
        </div>
        ${DROPDOWN_ITEM_STATES.map((state) => `
          <div class="rr-library-dropdown-item-row">
            <div class="rr-library-dropdown-item-axis">${state}</div>
            ${DROPDOWN_ITEM_TYPES.map((type) => renderDropdownItemCell(state, type)).join("")}
          </div>
        `).join("")}
        <div class="rr-library-dropdown-item-row rr-library-dropdown-item-row--divider">
          <div class="rr-library-dropdown-item-axis">divider</div>
          <div class="rr-library-dropdown-item-divider-cell">
            <rr-dropdown-item type="divider"></rr-dropdown-item>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderDropdownTemplatePreview() {
  return `
    <div class="rr-library-dropdown-template-row">
      <rr-dropdown-template options='${DROPDOWN_TEMPLATE_OPTIONS}'></rr-dropdown-template>
      <rr-dropdown-template options='${DROPDOWN_TEMPLATE_OPTIONS}' value="update" show-selected-check></rr-dropdown-template>
    </div>
  `
}

function renderToggleCell(size, pressed, state) {
  return `
    <div class="rr-library-toggle-cell">
      <rr-toggle size="${size}" state="${state}" ${pressed ? "checked" : ""}></rr-toggle>
    </div>
  `
}

function renderToggleMatrix() {
  return `
    <div class="rr-library-toggle-matrix-wrap">
      <div class="rr-library-toggle-matrix">
        <div class="rr-library-toggle-row rr-library-toggle-row--header">
          <div class="rr-library-toggle-axis">Size / Pressed</div>
          ${TOGGLE_STATES.map((state) => `<div class="rr-library-toggle-col-title">${state}</div>`).join("")}
        </div>
        ${TOGGLE_SIZES.map((size) => `
          <div class="rr-library-toggle-row">
            <div class="rr-library-toggle-axis">${size} / off</div>
            ${TOGGLE_STATES.map((state) => renderToggleCell(size, false, state)).join("")}
          </div>
          <div class="rr-library-toggle-row">
            <div class="rr-library-toggle-axis">${size} / on</div>
            ${TOGGLE_STATES.map((state) => renderToggleCell(size, true, state)).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `
}

function renderToggleTextPreview() {
  return `
    <div class="rr-library-toggle-text-grid">
      <article class="rr-library-toggle-text-group">
        <h5>No Underline</h5>
        <rr-toggle-text size="sm" state="default" label="Remember me"></rr-toggle-text>
        <rr-toggle-text size="md" state="hover" label="Remember me" checked></rr-toggle-text>
        <rr-toggle-text size="lg" state="focused" label="Remember me"></rr-toggle-text>
        <rr-toggle-text size="lg" state="disabled" label="Remember me" checked></rr-toggle-text>
      </article>
      <article class="rr-library-toggle-text-group">
        <h5>With Underline</h5>
        <rr-toggle-text size="sm" state="default" has-underline label="Remember me" description="Save my login details for next time."></rr-toggle-text>
        <rr-toggle-text size="md" state="hover" has-underline label="Remember me" description="Save my login details for next time." checked></rr-toggle-text>
        <rr-toggle-text size="lg" state="focused" has-underline label="Remember me" description="Save my login details for next time." checked></rr-toggle-text>
        <rr-toggle-text size="lg" state="disabled" has-underline label="Remember me" description="Save my login details for next time."></rr-toggle-text>
      </article>
    </div>
  `
}

function renderVerificationCodeSizeColumn(size, digits) {
  return `
    <article class="rr-library-verification-size-column">
      <h6>${size.toUpperCase()}</h6>
      <div class="rr-library-verification-size-stack">
        <rr-verification-code-input size="${size}" digits="${digits}"></rr-verification-code-input>
        <rr-verification-code-input size="${size}" digits="${digits}" show-label></rr-verification-code-input>
        <rr-verification-code-input size="${size}" digits="${digits}" show-label show-hint></rr-verification-code-input>
        <rr-verification-code-input size="${size}" digits="${digits}" show-hint></rr-verification-code-input>
      </div>
    </article>
  `
}

function renderVerificationCodeDigitsBlock(digits) {
  return `
    <article class="rr-library-verification-block">
      <h5>${digits}-Digit</h5>
      <div class="rr-library-verification-grid-wrap">
        <div class="rr-library-verification-grid">
          ${VERIFICATION_CODE_SIZES.map((size) => renderVerificationCodeSizeColumn(size, digits)).join("")}
        </div>
      </div>
    </article>
  `
}

function renderVerificationCodePreview() {
  return VERIFICATION_CODE_DIGITS.map((digits) => renderVerificationCodeDigitsBlock(digits)).join("")
}

function renderTableAtomCell(sample, state) {
  const resolvedState = state === "hover" && sample.hoverState ? sample.hoverState : state
  return `
    <div class="rr-library-table-atom-cell">
      <${sample.tag} ${sample.attrs} state="${resolvedState}"></${sample.tag}>
    </div>
  `
}

function renderTableAtomsMatrix() {
  return `
    <div class="rr-library-table-atom-matrix">
      <div class="rr-library-table-atom-row rr-library-table-atom-row--header">
        <div class="rr-library-table-atom-label">Atom</div>
        ${TABLE_ATOM_STATES.map((state) => `<div class="rr-library-state-pill">${state}</div>`).join("")}
      </div>
      ${TABLE_ATOM_VARIANTS.map((sample) => `
        <div class="rr-library-table-atom-row">
          <div class="rr-library-table-atom-label">${sample.label}</div>
          ${TABLE_ATOM_STATES.map((state) => renderTableAtomCell(sample, state)).join("")}
        </div>
      `).join("")}
    </div>
  `
}

function renderAlertStates() {
  return ALERT_VARIANTS.map((variant) => `<rr-alert variant="${variant}">${variant.toUpperCase()} alert message</rr-alert>`).join("")
}

function renderTypographyPreview() {
  const heading = tokens.typography?.fontSizeH4 || "24px"
  const body = tokens.typography?.fontSizeMd || "16px"
  const tiny = tokens.typography?.fontSizeTiny || "12px"

  return `
    <div class="rr-library-typography-card">
      <h3 style="font-size:${heading};">Heading style sample</h3>
      <p style="font-size:${body};">Paragraph style sample for component labels and body text.</p>
      <p style="font-size:${tiny};">Caption / helper text sample.</p>
    </div>
  `
}

export async function renderComponentsLibraryFlow() {
  return `
    <main class="rr-main rr-library-page">
      <header class="rr-page-header rr-library-header">
        <h1>Roundrush Component Library</h1>
        <p>Prototype-first gallery with theme tokens, variants, sizes, and visual states.</p>
      </header>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Theme Snapshot</h2>
          <a href="/library/foundations/colors">Open full foundations page</a>
        </div>
        <div class="rr-library-token-grid">
          ${renderSemanticSwatches()}
        </div>
        ${renderTypographyPreview()}
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Button Variants x States</h2>
          <p>Primary matrix for designer prototyping.</p>
          <a href="${FIGMA_BUTTON_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
        </div>
        <div class="rr-library-matrix">
          <div class="rr-library-matrix-row rr-library-matrix-row--header">
            <div class="rr-library-matrix-label">Variant</div>
            ${BUTTON_STATES.map((state) => `<div class="rr-library-state-pill">${state}</div>`).join("")}
          </div>
          ${renderButtonMatrix()}
        </div>
        <div class="rr-library-inline-row">
          ${renderButtonSizes()}
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Icon Button Variants x States</h2>
          <p>Icon-only actions across all types, sizes, and states.</p>
          <a href="${FIGMA_ICON_BUTTON_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
        </div>
        <div class="rr-library-matrix">
          <div class="rr-library-matrix-row rr-library-matrix-row--header">
            <div class="rr-library-matrix-label">Type</div>
            ${BUTTON_STATES.map((state) => `<div class="rr-library-state-pill">${state}</div>`).join("")}
          </div>
          ${renderIconButtonMatrix()}
        </div>
        <div class="rr-library-inline-row">
          ${renderIconButtonSizes()}
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Link Button Variants x States</h2>
          <p>Leading and trailing icon behaviors for link-style CTAs.</p>
          <a href="${FIGMA_LINK_BUTTON_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
        </div>
        <div class="rr-library-matrix">
          <div class="rr-library-matrix-row rr-library-matrix-row--header">
            <div class="rr-library-matrix-label">Color / Icon</div>
            ${BUTTON_STATES.map((state) => `<div class="rr-library-state-pill">${state}</div>`).join("")}
          </div>
          ${renderLinkButtonMatrix()}
        </div>
        <div class="rr-library-inline-row">
          ${renderLinkButtonSizes()}
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Inputs and Selection</h2>
          <p>Input field matrix with all variants and states from the design system.</p>
          <a href="${FIGMA_INPUT_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
        </div>
        ${renderInputMatrix()}
        <div class="rr-library-controls-grid">
          <article class="rr-library-control-card rr-library-control-card--wide">
            <div class="rr-library-control-head">
              <h3>Verification Code Input</h3>
              <a href="${FIGMA_VERIFICATION_CODE_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
            </div>
            <p class="rr-library-control-note">4-digit and 6-digit layouts across SM, MD, LG with label and hint text options.</p>
            <div class="rr-library-verification-group">
              ${renderVerificationCodePreview()}
            </div>
          </article>

          <article class="rr-library-control-card rr-library-control-card--wide">
            <div class="rr-library-control-head">
              <h3>Mega Input</h3>
              <a href="${FIGMA_MEGA_INPUT_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
            </div>
            <p class="rr-library-control-note">Single-digit verification field with SM, MD, LG and all visual states.</p>
            ${renderMegaInputMatrix()}
          </article>

          <article class="rr-library-control-card rr-library-control-card--wide">
            <div class="rr-library-control-head">
              <h3>Text Area</h3>
              <a href="${FIGMA_TEXT_AREA_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
            </div>
            <div class="rr-library-control-stack">
              <rr-text-area label="Label" placeholder="Enter a description..." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Label" state="filled" value="A little about the company and the team that you'll be working with." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Label" state="focused" value="A little about the company and the team that you'll be working with." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Label" type="error" state="default" placeholder="Enter a description..." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Label" type="error" state="focused" value="A little about the company and the team that you'll be working with." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Label" state="disabled" placeholder="Enter a description..." helper="This is a hint text to help user."></rr-text-area>
              <rr-text-area label="Description" state="filled" value="Short project summary for teams." helper="Max 120 characters." show-count max-length="120"></rr-text-area>
            </div>
          </article>

          <article class="rr-library-control-card">
            <h3>Password Input</h3>
            <rr-password-input label="Default" placeholder="Enter password"></rr-password-input>
            <rr-password-input state="focused" label="Focused" value="secret123"></rr-password-input>
            <rr-password-input state="error" label="Error" value="weak"></rr-password-input>
            <rr-password-input state="disabled" label="Disabled" value="disabled"></rr-password-input>
          </article>

          <article class="rr-library-control-card rr-library-control-card--wide">
            <div class="rr-library-control-head">
              <h3>Dropdown Selectors</h3>
              <a href="${FIGMA_DROPDOWN_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
            </div>
            <p class="rr-library-control-note">Selector field, dropdown item, and dropdown template mapped from the Dropdowns page.</p>
            <div class="rr-library-dropdown-group">
              <div class="rr-library-dropdown-block">
                <h4>Dropdown Field</h4>
                ${renderDropdownFieldMatrix()}
              </div>
              <div class="rr-library-dropdown-block">
                <h4>Dropdown Item</h4>
                ${renderDropdownItemMatrix()}
              </div>
              <div class="rr-library-dropdown-block">
                <h4>Dropdown Template</h4>
                ${renderDropdownTemplatePreview()}
              </div>
            </div>
          </article>

          <article class="rr-library-control-card rr-library-control-card--wide">
            <div class="rr-library-control-head">
              <h3>Toggles</h3>
              <a href="${FIGMA_TOGGLE_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
            </div>
            <p class="rr-library-control-note">Toggle switch and toggle-with-text components across sizes, states, and pressed states.</p>
            <div class="rr-library-toggle-group">
              <div class="rr-library-toggle-block">
                <h4>Toggle</h4>
                ${renderToggleMatrix()}
              </div>
              <div class="rr-library-toggle-block">
                <h4>Toggle Text</h4>
                ${renderToggleTextPreview()}
              </div>
            </div>
          </article>

          <article class="rr-library-control-card">
            <h3>Checkbox</h3>
            <rr-checkbox>Default</rr-checkbox>
            <rr-checkbox checked>Checked</rr-checkbox>
            <rr-checkbox state="focused" checked>Focused</rr-checkbox>
            <rr-checkbox state="disabled" checked>Disabled</rr-checkbox>
          </article>
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Feedback and Loaders</h2>
        </div>
        <div class="rr-library-alert-grid">
          ${renderAlertStates()}
        </div>
        <div class="rr-library-inline-row">
          <rr-spinner size="12"></rr-spinner>
          <rr-spinner size="18"></rr-spinner>
          <rr-spinner size="24"></rr-spinner>
          <rr-spinner size="32"></rr-spinner>
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Composites</h2>
        </div>
        <div class="rr-library-composite-grid">
          <article class="rr-library-composite-card">
            <h3>Table Header Cell</h3>
            <div class="rr-library-table-sample">
              <rr-table-header-cell label="Company" text="true" checkbox="true" color="white" arrow="down" state="default"></rr-table-header-cell>
              <rr-table-header-cell label="Status" text="true" checkbox="false" color="gray" arrow="none" state="hover" help-icon="true"></rr-table-header-cell>
              <rr-table-header-cell label="Owner" text="true" checkbox="false" color="white" arrow="up" state="disabled"></rr-table-header-cell>
            </div>
          </article>

          <article class="rr-library-composite-card">
            <h3>Card + Actions</h3>
            <rr-card>
              <span slot="header">Card header</span>
              Card body copy for prototyping screen sections.
              <div slot="actions" class="rr-actions">
                <rr-button variant="secondary">Cancel</rr-button>
                <rr-button variant="primary">Continue</rr-button>
              </div>
            </rr-card>
          </article>
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Table Atoms</h2>
          <p>Reusable table-focused atomic cells mapped from the Figma Tables page.</p>
          <a href="${FIGMA_TABLE_ATOMS_URL}" target="_blank" rel="noreferrer">Open in Figma</a>
        </div>
        <div class="rr-library-table-atom-wrap">
          ${renderTableAtomsMatrix()}
        </div>
      </section>

      <section class="rr-library-section">
        <div class="rr-library-section-head">
          <h2>Modal Preview</h2>
          <p>Open state rendered in preview mode.</p>
        </div>
        <rr-modal open preview title="Confirm action">
          This is a modal preview state for designers.
          <div slot="actions">
            <rr-button variant="secondary">Cancel</rr-button>
            <rr-button variant="primary">Confirm</rr-button>
          </div>
        </rr-modal>
      </section>
    </main>
  `
}
