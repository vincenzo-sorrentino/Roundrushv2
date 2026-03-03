import { tokens } from "@roundrush/tokens"
import "@roundrush/components"

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function flattenObject(object, prefix = []) {
  const rows = []
  for (const [key, value] of Object.entries(object ?? {})) {
    const nextPrefix = [...prefix, key]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      rows.push(...flattenObject(value, nextPrefix))
      continue
    }
    rows.push([nextPrefix.join("."), value])
  }
  return rows
}

function renderPrimitiveColors() {
  return Object.entries(tokens.tokenColors?.primitive ?? tokens.color ?? {})
    .map(([groupName, scale]) => {
      const swatches = Object.entries(scale ?? {})
        .map(([step, value]) => {
          const tokenName = `--rr-color-${groupName}-${step}`
          return `
            <article class="rr-token-swatch">
              <div class="rr-token-swatch-color" style="background:${value};"></div>
              <div class="rr-token-swatch-meta">
                <strong>${escapeHtml(groupName)}.${escapeHtml(step)}</strong>
                <code>${escapeHtml(tokenName)}</code>
                <code>${escapeHtml(value)}</code>
              </div>
            </article>
          `
        })
        .join("")

      return `
        <section class="rr-token-block">
          <h3>${escapeHtml(groupName)}</h3>
          <div class="rr-token-swatch-grid">${swatches}</div>
        </section>
      `
    })
    .join("")
}

function renderSemanticColors(themeName) {
  const semanticRows = flattenObject(tokens.tokenColors?.semantic?.[themeName] ?? tokens.semantic?.[themeName] ?? {})
    .map(([path, value]) => {
      const tokenName = `--rr-sem-${path.replaceAll(".", "-")}`
      return `
        <tr>
          <td><code>${escapeHtml(path)}</code></td>
          <td><code>${escapeHtml(tokenName)}</code></td>
          <td><code>${escapeHtml(value)}</code></td>
          <td><span class="rr-token-sem-preview" style="background:${value};"></span></td>
        </tr>
      `
    })
    .join("")

  return `
    <section class="rr-token-block">
      <h2>Token Colors (Semantic)</h2>
      <p>Semantic colors for <strong>${escapeHtml(themeName)}</strong> mode (<code>tokens.tokenColors.semantic.${escapeHtml(themeName)}</code>).</p>
      <table class="rr-token-table">
        <thead>
          <tr>
            <th>Path</th>
            <th>CSS Variable</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>${semanticRows}</tbody>
      </table>
    </section>
  `
}

function renderTextStyles() {
  const textVariableRows = flattenObject(tokens.textTokens ?? {})
    .map(([path, value]) => `<tr><td><code>${escapeHtml(path)}</code></td><td><code>${escapeHtml(value)}</code></td></tr>`)
    .join("")

  const styleCards = Object.entries(tokens.textStyles ?? {})
    .flatMap(([groupName, styles]) => {
      return Object.entries(styles ?? {}).map(([styleName, styleProps]) => {
        const styleCss = [
          `font-family:${styleProps.fontFamily};`,
          `font-size:${styleProps.fontSize};`,
          `font-style:${styleProps.fontStyle};`,
          `font-weight:${styleProps.fontWeight};`,
          `line-height:${styleProps.lineHeight};`,
          `letter-spacing:${styleProps.letterSpacing};`,
          `text-transform:${styleProps.textCase === "none" ? "none" : styleProps.textCase};`,
          "margin:0;",
          "color:var(--rr-sem-textPrimary);"
        ].join("")

        return `
          <article class="rr-token-text-style">
            <p style="${styleCss}">
              ${escapeHtml(groupName)} / ${escapeHtml(styleName)} sample
            </p>
            <code>textStyles.${escapeHtml(groupName)}.${escapeHtml(styleName)}</code>
          </article>
        `
      })
    })
    .join("")

  return `
    <section class="rr-token-block">
      <h2>Text Variables</h2>
      <p>Base text variables from Figma (<code>tokens.textTokens</code>).</p>
      <table class="rr-token-table">
        <thead>
          <tr><th>Variable Path</th><th>Value</th></tr>
        </thead>
        <tbody>${textVariableRows}</tbody>
      </table>
    </section>

    <section class="rr-token-block">
      <h2>Text Styles</h2>
      <p>Text styles use token variables first (<code>tokens.textStyles</code>).</p>
      <div class="rr-token-text-style-grid">${styleCards}</div>
    </section>
  `
}

function renderEffects() {
  const effectRows = flattenObject(tokens.effects ?? {})
    .map(([path, value]) => {
      const isShadow = path.includes("shadow") || path.includes("focusRing")
      const isBlur = path.includes("backgroundBlur")
      const effectPreview = isShadow
        ? `<span class="rr-token-effect-preview" style="box-shadow:${value};"></span>`
        : isBlur
          ? `<span class="rr-token-effect-preview rr-token-effect-preview-blur"><span style="backdrop-filter:${value};-webkit-backdrop-filter:${value};"></span></span>`
          : `<span class="rr-token-effect-preview"></span>`

      return `
        <tr>
          <td><code>${escapeHtml(path)}</code></td>
          <td><code>--rr-effects-${escapeHtml(path.replaceAll(".", "-"))}</code></td>
          <td><code>${escapeHtml(value)}</code></td>
          <td>${effectPreview}</td>
        </tr>
      `
    })
    .join("")

  return `
    <section class="rr-token-block">
      <h2>Effects</h2>
      <p>Effect tokens exported from Figma (<code>tokens.effects</code>) including shadows and blur entries.</p>
      <table class="rr-token-table">
        <thead>
          <tr>
            <th>Path</th>
            <th>CSS Variable</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>${effectRows}</tbody>
      </table>
    </section>
  `
}

function renderThemeValidation(themeName) {
  return `
    <style>
      .rr-theme-validation {
        font-family: var(--rr-typography-fontFamilyBase);
        color: var(--rr-sem-textPrimary);
        background: var(--rr-sem-surface);
        min-height: 100vh;
        padding: 24px;
        display: grid;
        gap: 24px;
      }
      .rr-theme-validation h1,
      .rr-theme-validation h2,
      .rr-theme-validation h3,
      .rr-theme-validation p {
        margin: 0;
      }
      .rr-theme-validation h1 {
        font-size: var(--rr-typography-fontSizeH4);
        line-height: 1.2;
      }
      .rr-token-hero {
        display: grid;
        gap: 8px;
        border: 1px solid var(--rr-sem-borderDefault);
        border-radius: var(--rr-radius-md);
        background: var(--rr-sem-surfaceSubtle);
        padding: 16px;
      }
      .rr-token-block {
        display: grid;
        gap: 12px;
        border: 1px solid var(--rr-sem-borderDefault);
        border-radius: var(--rr-radius-md);
        background: var(--rr-sem-surfaceField);
        padding: 16px;
      }
      .rr-token-swatch-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      }
      .rr-token-swatch {
        border: 1px solid var(--rr-sem-borderDefault);
        border-radius: var(--rr-radius-sm);
        background: var(--rr-sem-surface);
        overflow: hidden;
      }
      .rr-token-swatch-color {
        height: 64px;
      }
      .rr-token-swatch-meta {
        display: grid;
        gap: 4px;
        padding: 8px;
      }
      .rr-token-swatch-meta strong {
        font-size: var(--rr-typography-fontSizeSm);
      }
      .rr-token-swatch-meta code,
      .rr-token-table code {
        font-size: 12px;
      }
      .rr-token-table {
        width: 100%;
        border-collapse: collapse;
      }
      .rr-token-table th,
      .rr-token-table td {
        border: 1px solid var(--rr-sem-borderDefault);
        text-align: left;
        padding: 8px;
        vertical-align: middle;
      }
      .rr-token-sem-preview {
        width: 100%;
        max-width: 100px;
        height: 22px;
        border-radius: 8px;
        display: inline-block;
        border: 1px solid var(--rr-sem-borderDefault);
      }
      .rr-token-text-style-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      }
      .rr-token-text-style {
        border: 1px solid var(--rr-sem-borderDefault);
        border-radius: var(--rr-radius-sm);
        background: var(--rr-sem-surface);
        padding: 10px;
        display: grid;
        gap: 8px;
      }
      .rr-token-effect-preview {
        width: 92px;
        height: 36px;
        border-radius: 8px;
        display: inline-block;
        background: var(--rr-sem-surface);
        border: 1px solid var(--rr-sem-borderDefault);
      }
      .rr-token-effect-preview-blur {
        overflow: hidden;
        background: linear-gradient(120deg, var(--rr-sem-actionPrimary), var(--rr-sem-secondary));
      }
      .rr-token-effect-preview-blur > span {
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
      }
    </style>

    <main class="rr-theme-validation">
      <section class="rr-token-hero">
        <h1>Theme Validation</h1>
        <p>Current theme: <strong>${escapeHtml(themeName)}</strong></p>
        <p>Primitive colors are nested under <code>tokens.tokenColors.primitive</code>. Semantic UI colors are under <code>tokens.tokenColors.semantic</code>.</p>
      </section>

      <section class="rr-token-block">
        <h2>Primitive Colors</h2>
        <p>From Figma variables (<code>tokens.tokenColors.primitive</code>).</p>
        ${renderPrimitiveColors()}
      </section>

      ${renderSemanticColors(themeName)}
      ${renderTextStyles()}
      ${renderEffects()}
    </main>
  `
}

export default {
  title: "Foundations/Theme Validation",
  render: (_args, context) => {
    const themeName = context.globals.theme ?? "light"
    return renderThemeValidation(themeName)
  }
}

export const Overview = {}
