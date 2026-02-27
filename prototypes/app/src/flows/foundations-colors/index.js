import { tokens } from "@roundrush/tokens"

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

function hexToRgb(hex) {
  const sanitized = hex.replace("#", "")
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
  return {
    r: 0,
    g: 0,
    b: 0
  }
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
  return hex.toUpperCase()
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
        <strong>${key}</strong>
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

function flattenObject(object, prefix = []) {
  return Object.entries(object ?? {}).flatMap(([key, value]) => {
    const nextPrefix = [...prefix, key]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenObject(value, nextPrefix)
    }
    return [[nextPrefix.join("."), value]]
  })
}

function renderVariableRows(object, prefix = []) {
  return Object.entries(object)
    .flatMap(([key, value]) => {
      const path = [...prefix, key]
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return renderVariableRows(value, path)
      }
      return [
        `<tr><td><code>${path.join(".")}</code></td><td><code>${value}</code></td></tr>`
      ]
    })
    .join("")
}

function renderSemanticThemeTable(themeName, themeObject) {
  const rows = flattenObject(themeObject)
    .map(([path, value]) => {
      return `
        <tr>
          <td><code>${path}</code></td>
          <td><code>${value}</code></td>
          <td><span class="rr-foundation-sem-sample" style="background:${value};"></span></td>
        </tr>
      `
    })
    .join("")

  return `
    <section class="rr-foundation-block">
      <h2>Semantic Tokens (${themeName})</h2>
      <table class="rr-foundation-table">
        <thead>
          <tr><th>Semantic token</th><th>Reference</th><th>Preview</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `
}

function renderTextStyleCards() {
  return `
    <div class="rr-foundation-text-style-grid">
      <article class="rr-foundation-text-style-card">
        <h1 style="font-size: ${tokens.typography.fontSizeH1}; line-height: ${tokens.typography.lineHeightHeading}; font-weight: ${tokens.typography.fontWeightMedium}; margin: 0;">H1 Medium</h1>
        <p><code>Headings/H1-medium</code></p>
      </article>
      <article class="rr-foundation-text-style-card">
        <h2 style="font-size: ${tokens.typography.fontSizeH4}; line-height: ${tokens.typography.lineHeightHeading}; font-weight: ${tokens.typography.fontWeightMedium}; margin: 0;">H4 Medium</h2>
        <p><code>Headings/H4-medium</code></p>
      </article>
      <article class="rr-foundation-text-style-card">
        <h3 style="font-size: ${tokens.typography.fontSizeH6}; line-height: ${tokens.typography.lineHeightHeading}; font-weight: ${tokens.typography.fontWeightMedium}; margin: 0;">H6 Medium</h3>
        <p><code>Headings/H6-medium</code></p>
      </article>
      <article class="rr-foundation-text-style-card">
        <p style="font-size: ${tokens.typography.fontSizeMd}; line-height: ${tokens.typography.lineHeightParagraph}; margin: 0;">Paragraph medium sample</p>
        <p><code>Paragraph/Medium</code></p>
      </article>
      <article class="rr-foundation-text-style-card">
        <p style="font-size: ${tokens.typography.fontSizeBig}; line-height: ${tokens.typography.lineHeightParagraph}; margin: 0;">Paragraph big sample</p>
        <p><code>Paragraph/Big</code></p>
      </article>
    </div>
  `
}

function renderEffects() {
  return `
    <div class="rr-foundation-effects-grid">
      <article class="rr-foundation-effect-card" style="box-shadow: ${tokens.effects.shadowLg};">
        <h4>Shadow/lg</h4>
        <code>${tokens.effects.shadowLg}</code>
      </article>
      <article class="rr-foundation-effect-card" style="box-shadow: ${tokens.shadow.md};">
        <h4>Shadow/md</h4>
        <code>${tokens.shadow.md}</code>
      </article>
      <article class="rr-foundation-effect-card" style="box-shadow: ${tokens.shadow.sm};">
        <h4>Shadow/sm</h4>
        <code>${tokens.shadow.sm}</code>
      </article>
    </div>
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

        ${Object.entries(tokens.semantic ?? {})
          .map(([themeName, themeObject]) => renderSemanticThemeTable(themeName, themeObject))
          .join("")}

        <section class="rr-foundation-block">
          <h2>All Variables</h2>
          <table class="rr-foundation-table">
            <thead>
              <tr><th>Variable</th><th>Value</th></tr>
            </thead>
            <tbody>
              ${renderVariableRows(tokens)}
            </tbody>
          </table>
        </section>

        <section class="rr-foundation-block">
          <h2>Text Styles</h2>
          ${renderTextStyleCards()}
          <pre class="rr-foundation-pre">${JSON.stringify(tokens.textStyles, null, 2)}</pre>
        </section>

        <section class="rr-foundation-block">
          <h2>Effects</h2>
          ${renderEffects()}
          <pre class="rr-foundation-pre">${JSON.stringify(tokens.effects, null, 2)}</pre>
        </section>
      </section>
    </main>
  `
}
