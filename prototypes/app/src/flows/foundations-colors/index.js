import { tokens } from "@roundrush/tokens"
import figmaDesignTokens from "../../../../design-tokens.tokens.json"

const SCALE_STEPS = ["0", "25", "50", "100", "150", "200", "300", "400", "500", "600", "700", "800", "850", "900", "950"]

const COLOR_GROUPS = [
  {
    key: "primary",
    title: "Primary colors",
    description:
      "The primary color is your brand color and is used across all interactive elements such as buttons, links and inputs."
  },
  {
    key: "neutral",
    title: "Neutral",
    description:
      "Gray is the neutral color and is the foundation of the color system. Most UI fields, backgrounds, and dividers are usually gray."
  },
  {
    key: "error",
    title: "Error",
    description:
      "Error colors are used across error states and in destructive actions."
  },
  {
    key: "warning",
    title: "Warning",
    description:
      "Warning colors communicate caution and are commonly used in confirmations and hold states."
  },
  {
    key: "success",
    title: "Success",
    description:
      "Success colors communicate positive action and successful confirmation."
  },
  {
    key: "secondary",
    title: "Secondary",
    description:
      "Secondary colors are used for accents and alternate action states."
  },
  {
    key: "purple",
    title: "Purple",
    description:
      "Purple tokens are used for specific semantic contexts and selections."
  }
]

const DISPLAY_COLOR_KEYS = ["roundrushRedDark", "rounrushYellowDark", "rounrushGreenDark", "rounrushBlueDark"]
const TEXT_STYLE_GROUPS = ["titles", "headings", "fields", "actions", "paragraph"]

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function toTitleCase(value) {
  return String(value)
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll(/[-_]/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function hexToRgb(hex) {
  const sanitized = String(hex).replace("#", "")
  if (sanitized.length === 8) {
    const rgb = sanitized.slice(0, 6)
    const value = Number.parseInt(rgb, 16)
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    }
  }
  if (sanitized.length === 6) {
    const value = Number.parseInt(sanitized, 16)
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    }
  }
  if (sanitized.length === 3) {
    const expanded = sanitized
      .split("")
      .map((char) => `${char}${char}`)
      .join("")
    const value = Number.parseInt(expanded, 16)
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    }
  }
  return { r: 0, g: 0, b: 0 }
}

function channelToLinear(channel) {
  const normalized = channel / 255
  if (normalized <= 0.03928) {
    return normalized / 12.92
  }
  return ((normalized + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b)
}

function contrastRatio(a, b) {
  const aLum = luminance(a)
  const bLum = luminance(b)
  const brightest = Math.max(aLum, bLum)
  const darkest = Math.min(aLum, bLum)
  return (brightest + 0.05) / (darkest + 0.05)
}

function toDisplayHex(hex) {
  return String(hex).toUpperCase()
}

function scoreForHex(hex) {
  const withWhite = contrastRatio(hex, "#FFFFFF")
  const withBlack = contrastRatio(hex, "#14161B")
  const useLightText = withWhite >= withBlack
  const ratio = Math.max(withWhite, withBlack)
  return {
    useLightText,
    ratio,
    level: ratio >= 7 ? "AAA" : `AA ${ratio.toFixed(2)}`
  }
}

function flattenObject(object, prefix = []) {
  return Object.entries(object ?? {}).flatMap(([key, value]) => {
    const nextPrefix = [...prefix, key]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenObject(value, nextPrefix)
    }
    return [[nextPrefix.join("."), value]]
  })
}

function parsePx(value, fallback = 0) {
  const numeric = Number.parseFloat(String(value).replace("px", ""))
  return Number.isNaN(numeric) ? fallback : numeric
}

function textCaseToTransform(textCase) {
  const value = String(textCase || "none").toLowerCase()
  if (value === "upper" || value === "uppercase") {
    return "uppercase"
  }
  if (value === "lower" || value === "lowercase") {
    return "lowercase"
  }
  if (value === "title" || value === "capitalize") {
    return "capitalize"
  }
  return "none"
}

function styleDefinitionToInlineCss(definition) {
  if (!definition || typeof definition !== "object") {
    return ""
  }

  const map = {
    fontFamily: "font-family",
    fontSize: "font-size",
    fontWeight: "font-weight",
    fontStyle: "font-style",
    lineHeight: "line-height",
    letterSpacing: "letter-spacing",
    textDecoration: "text-decoration"
  }

  const rules = Object.entries(map)
    .map(([sourceKey, cssKey]) => {
      const value = definition[sourceKey]
      if (!value) {
        return ""
      }
      return `${cssKey}:${value};`
    })
    .filter(Boolean)

  rules.push(`text-transform:${textCaseToTransform(definition.textCase)};`)

  return rules.join("")
}

function sampleTextForStyle(groupKey, styleKey) {
  if (groupKey === "titles") {
    return "Marketing Title"
  }
  if (groupKey === "headings") {
    return "Section Heading"
  }
  if (groupKey === "fields") {
    return styleKey === "input" ? "Input text sample" : "Field Label"
  }
  if (groupKey === "actions") {
    return "Primary Action"
  }
  return "Body paragraph sample text."
}

function createJsonDownloadHref(payload) {
  return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`
}

function renderSwatch(scaleKey, step) {
  const hex = tokens.color?.[scaleKey]?.[step]
  if (!hex) {
    return ""
  }

  const score = scoreForHex(hex)

  return `
    <article class="rr-foundation-swatch" style="box-shadow: ${tokens.effects.shadowLg}; border-radius: ${tokens.radius.md};">
      <div class="rr-foundation-swatch-color" style="background: ${hex}; color: ${score.useLightText ? "#FFFFFF" : "#14161B"};">
        <span>${score.level}</span>
      </div>
      <div class="rr-foundation-swatch-meta">
        <strong>${step}</strong>
        <small>${toDisplayHex(hex)}</small>
      </div>
    </article>
  `
}

function renderDisplaySwatch(key) {
  const hex = tokens.color?.display?.[key]
  if (!hex) {
    return ""
  }

  return `
    <article class="rr-foundation-swatch">
      <div class="rr-foundation-swatch-color" style="background: ${hex}; color: #ffffff;">
        <span>Display</span>
      </div>
      <div class="rr-foundation-swatch-meta">
        <strong>${escapeHtml(key)}</strong>
        <small>${toDisplayHex(hex)}</small>
      </div>
    </article>
  `
}

function renderScaleRow(group) {
  return `
    <section class="rr-foundation-row">
      <div class="rr-foundation-row-note">
        <h3>${group.title}</h3>
        <p>${group.description}</p>
      </div>
      <div class="rr-foundation-swatch-grid">
        ${SCALE_STEPS.map((step) => renderSwatch(group.key, step)).join("")}
      </div>
    </section>
  `
}

function renderSemanticComparisonTable() {
  const lightMap = new Map(flattenObject(tokens.semantic?.light || {}))
  const darkMap = new Map(flattenObject(tokens.semantic?.dark || {}))
  const paths = [...new Set([...lightMap.keys(), ...darkMap.keys()])].sort((a, b) => a.localeCompare(b))

  const rows = paths
    .map((path) => {
      const lightValue = lightMap.get(path) || ""
      const darkValue = darkMap.get(path) || ""

      return `
        <tr>
          <td><code>${escapeHtml(path)}</code></td>
          <td><code>${escapeHtml(lightValue || "-")}</code></td>
          <td>
            ${lightValue
    ? `<span class="rr-foundation-sem-sample" style="background:${escapeHtml(lightValue)};"></span>`
    : `<span class="rr-foundation-sem-sample rr-foundation-sem-sample--empty">-</span>`}
          </td>
          <td><code>${escapeHtml(darkValue || "-")}</code></td>
          <td>
            ${darkValue
    ? `<span class="rr-foundation-sem-sample" style="background:${escapeHtml(darkValue)};"></span>`
    : `<span class="rr-foundation-sem-sample rr-foundation-sem-sample--empty">-</span>`}
          </td>
        </tr>
      `
    })
    .join("")

  return `
    <section class="rr-foundation-block">
      <h2>Semantic Tokens (Light + Dark)</h2>
      <div class="rr-foundation-table-wrap">
        <table class="rr-foundation-table">
          <thead>
            <tr>
              <th>Semantic token</th>
              <th>Light reference</th>
              <th>Light preview</th>
              <th>Dark reference</th>
              <th>Dark preview</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `
}

function renderTextStyleGroups() {
  return TEXT_STYLE_GROUPS.map((groupKey) => {
    const styles = tokens.textStyles?.[groupKey] || {}
    const cards = Object.entries(styles)
      .map(([styleKey, styleDefinition]) => {
        const styleInline = styleDefinitionToInlineCss(styleDefinition)
        const sample = sampleTextForStyle(groupKey, styleKey)
        return `
          <article class="rr-foundation-text-style-card">
            <div class="rr-foundation-text-style-preview">
              <p class="rr-foundation-text-style-sample" style="${styleInline}">${escapeHtml(sample)}</p>
            </div>
            <div class="rr-foundation-text-style-meta">
              <strong>${toTitleCase(styleKey)}</strong>
              <code>${groupKey}.${styleKey}</code>
              <div class="rr-foundation-text-style-props">
                <span>${escapeHtml(styleDefinition.fontSize || "-")}</span>
                <span>${escapeHtml(styleDefinition.fontWeight || "-")}</span>
                <span>${escapeHtml(styleDefinition.lineHeight || "-")}</span>
              </div>
            </div>
          </article>
        `
      })
      .join("")

    return `
      <section class="rr-foundation-text-group">
        <h3>${toTitleCase(groupKey)}</h3>
        <div class="rr-foundation-text-style-grid">
          ${cards}
        </div>
      </section>
    `
  }).join("")
}

function renderAllTextStylesTable() {
  const rows = TEXT_STYLE_GROUPS.flatMap((groupKey) => {
    const styles = tokens.textStyles?.[groupKey] || {}
    return Object.entries(styles).map(([styleKey, definition]) => {
      return `
        <tr>
          <td><code>${groupKey}.${styleKey}</code></td>
          <td><code>${escapeHtml(definition.fontSize || "-")}</code></td>
          <td><code>${escapeHtml(definition.fontWeight || "-")}</code></td>
          <td><code>${escapeHtml(definition.lineHeight || "-")}</code></td>
          <td><code>${escapeHtml(definition.letterSpacing || "-")}</code></td>
        </tr>
      `
    })
  }).join("")

  return `
    <div class="rr-foundation-table-wrap">
      <table class="rr-foundation-table">
        <thead>
          <tr>
            <th>Text style</th>
            <th>Font size</th>
            <th>Weight</th>
            <th>Line height</th>
            <th>Letter spacing</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `
}

function renderEffects() {
  const effectRows = flattenObject(tokens.effects || {})

  const cards = effectRows
    .map(([path, value]) => {
      const safePath = escapeHtml(path)
      const safeValue = escapeHtml(value)
      const sampleStyle = path.includes("shadow") || path.includes("focusRing") ? `box-shadow:${value};` : ""

      return `
        <article class="rr-foundation-effect-card">
          <div class="rr-foundation-effect-sample" style="${sampleStyle}"></div>
          <h4>${safePath}</h4>
          <code>${safeValue}</code>
        </article>
      `
    })
    .join("")

  return `
    <div class="rr-foundation-effects-grid">
      ${cards}
    </div>
  `
}

function renderSpacing() {
  const spacingRows = Object.entries(tokens.spacing || {})
    .map(([key, value]) => {
      const px = parsePx(value)
      const width = Math.max(4, Math.min(px, 320))
      return `
        <article class="rr-foundation-spacing-item">
          <div class="rr-foundation-spacing-meta">
            <strong>${escapeHtml(key)}</strong>
            <code>${escapeHtml(value)}</code>
          </div>
          <div class="rr-foundation-spacing-track">
            <span style="width:${width}px;"></span>
          </div>
        </article>
      `
    })
    .join("")

  return `<div class="rr-foundation-spacing-list">${spacingRows}</div>`
}

function renderRadius() {
  const radiusRows = Object.entries(tokens.radius || {})
    .map(([key, value]) => {
      return `
        <article class="rr-foundation-radius-card">
          <div class="rr-foundation-radius-sample" style="border-radius:${escapeHtml(value)};"></div>
          <strong>${escapeHtml(key)}</strong>
          <code>${escapeHtml(value)}</code>
        </article>
      `
    })
    .join("")

  return `<div class="rr-foundation-radius-grid">${radiusRows}</div>`
}

function renderJsonDownloads() {
  return `
    <section class="rr-foundation-block">
      <h2>JSON Downloads</h2>
      <p>Download the Figma source token file used for the design variables.</p>
      <div class="rr-foundation-downloads">
        <a
          class="rr-foundation-download-link"
          href="${createJsonDownloadHref(figmaDesignTokens)}"
          download="design-tokens.tokens.json"
        >
          design-tokens.tokens.json
        </a>
      </div>
    </section>
  `
}

export async function renderFoundationsColorsFlow() {
  return `
    <main class="rr-foundations-page">
      <section class="rr-foundations-hero">
        <div class="rr-foundations-gradient-strip"></div>
        <div class="rr-foundations-hero-content">
          <div class="rr-foundations-breadcrumb">Foundations <span>-></span> Colors</div>
          <h1>Primitive Colors</h1>
          <p>These primitive colors are the ones that customize the theme. They should drive hierarchy and consistency across the UI library.</p>
        </div>
      </section>

      <section class="rr-foundations-content">
        ${COLOR_GROUPS.map(renderScaleRow).join("")}

        <section class="rr-foundation-row rr-foundation-secondary-row">
          <div class="rr-foundation-row-note">
            <h3>Display colors</h3>
            <p>Display colors are non-scale visual accents used in specific high-emphasis surfaces.</p>
          </div>
          <div class="rr-foundation-swatch-grid">
            ${DISPLAY_COLOR_KEYS.map((key) => renderDisplaySwatch(key)).join("")}
          </div>
        </section>

        ${renderSemanticComparisonTable()}

        <section class="rr-foundation-block">
          <h2>Text Styles</h2>
          ${renderTextStyleGroups()}
          <h3>All Text Styles</h3>
          ${renderAllTextStylesTable()}
        </section>

        <section class="rr-foundation-block">
          <h2>Effects</h2>
          ${renderEffects()}
        </section>

        <section class="rr-foundation-block">
          <h2>Spacing and Radius</h2>
          <div class="rr-foundation-layout-grid">
            <div>
              <h3>Spacing</h3>
              ${renderSpacing()}
            </div>
            <div>
              <h3>Radius</h3>
              ${renderRadius()}
            </div>
          </div>
        </section>

        ${renderJsonDownloads()}
      </section>
    </main>
  `
}
