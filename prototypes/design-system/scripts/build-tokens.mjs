import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, "../../..")
const fromRepoRoot = (...segments) => path.resolve(repoRoot, ...segments)

const figmaExportPath = fromRepoRoot("prototypes/design-tokens.tokens.json")
const tokensRawPath = fromRepoRoot("prototypes/design-system/source/figma/tokens.raw.json")
const themesRawPath = fromRepoRoot("prototypes/design-system/source/figma/themes.raw.json")

const tokensDistDir = fromRepoRoot("prototypes/design-system/packages/tokens/dist")
const themesSrcDir = fromRepoRoot("prototypes/design-system/packages/themes/src")
const themesDistDir = fromRepoRoot("prototypes/design-system/packages/themes/dist")

const REFERENCE_PATTERN = /^\{(.+)\}$/

const LEGACY_SEMANTIC_ALIASES = {
  surface: "background.page",
  surfaceSubtle: "background.neutralSubtle",
  surfaceField: "background.field",
  surfaceTable: "background.table",
  surfaceOnPrimary: "text.actionForeground",
  textPrimary: "text.primary",
  textSecondary: "text.secondary",
  textMuted: "text.tertiary",
  borderDefault: "stroke.primary",
  borderField: "stroke.field",
  iconPrimary: "display.iconPrimary",
  iconSecondary: "display.iconSecondary",
  overlay: "background.overlay",
  actionPrimary: "action.btnPrimary",
  actionPrimaryHover: "action.btnPrimaryHover",
  danger: "display.error",
  success: "display.success",
  warning: "display.warning",
  secondary: "display.secondary",
  brandGradientStart: "display.primary",
  brandGradientEnd: "display.secondary"
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"))
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isTokenLeaf(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, "value")
}

function canonicalPath(pathParts) {
  return pathParts
    .map((part) => String(part).replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
    .join(".")
}

function flattenObject(object, prefix = [], options = {}) {
  const entries = []
  const skipRootKeys = options.skipRootKeys ?? new Set()

  for (const [key, value] of Object.entries(object ?? {})) {
    if (prefix.length === 0 && skipRootKeys.has(key)) {
      continue
    }

    const nextPrefix = [...prefix, key]
    if (isObject(value)) {
      entries.push(...flattenObject(value, nextPrefix, options))
      continue
    }

    if (value === undefined || value === null) {
      continue
    }

    entries.push([nextPrefix.join("-"), value])
  }

  return entries
}

function traverseLeaves(node, prefix = [], visit) {
  if (isTokenLeaf(node)) {
    visit(prefix, node.value, node.type)
    return
  }

  if (!isObject(node)) {
    visit(prefix, node, undefined)
    return
  }

  for (const [key, value] of Object.entries(node)) {
    traverseLeaves(value, [...prefix, key], visit)
  }
}

function resolveReference(value, referenceMap) {
  if (typeof value !== "string") {
    return null
  }

  const match = value.match(REFERENCE_PATTERN)
  if (!match) {
    return null
  }

  const referencePath = match[1].split(".")
  const mappedPath = referenceMap.get(canonicalPath(referencePath))
  if (!mappedPath) {
    throw new Error(`Unresolved token reference: ${value}`)
  }

  return `var(--rr-${mappedPath.join("-")})`
}

function normalizeTokenValue(value, type, referenceMap) {
  const reference = resolveReference(value, referenceMap)
  if (reference) {
    return reference
  }

  if (type === "dimension") {
    if (typeof value === "number") {
      return `${value}px`
    }
    if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) {
      return `${value}px`
    }
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false"
  }

  if (typeof value === "number") {
    return String(value)
  }

  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}

function mapTokenTree(node, mapLeaf, referenceMap, pathPrefix = []) {
  if (isTokenLeaf(node)) {
    return mapLeaf(node.value, node.type, pathPrefix)
  }

  if (!isObject(node)) {
    return mapLeaf(node, undefined, pathPrefix)
  }

  const mapped = {}
  for (const [key, value] of Object.entries(node)) {
    mapped[key] = mapTokenTree(value, mapLeaf, referenceMap, [...pathPrefix, key])
  }

  return mapped
}

function toShadowCss(shadowValue) {
  if (!isObject(shadowValue)) {
    return ""
  }

  const shadowType = shadowValue.shadowType === "innerShadow" ? "inset " : ""
  const x = Number(shadowValue.offsetX ?? 0)
  const y = Number(shadowValue.offsetY ?? 0)
  const blur = Number(shadowValue.radius ?? 0)
  const spread = Number(shadowValue.spread ?? 0)
  const color = String(shadowValue.color ?? "#000000")
  return `${shadowType}${x}px ${y}px ${blur}px ${spread}px ${color}`.trim()
}

function mapEffectNode(node) {
  if (isTokenLeaf(node)) {
    if (node.type === "custom-shadow") {
      return toShadowCss(node.value)
    }
    return normalizeTokenValue(node.value, node.type, new Map())
  }

  if (!isObject(node)) {
    return node === undefined || node === null ? "none" : String(node)
  }

  const numericShadowKeys = Object.keys(node).filter((key) => /^\d+$/.test(key) && isTokenLeaf(node[key]))
  if (numericShadowKeys.length > 0) {
    return numericShadowKeys
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => toShadowCss(node[key].value))
      .join(", ")
  }

  const mapped = {}
  for (const [key, value] of Object.entries(node)) {
    if (["description", "extensions", "type", "blendMode"].includes(key)) {
      continue
    }

    const nextValue = mapEffectNode(value)
    if (nextValue === undefined || nextValue === null) {
      continue
    }

    if (isObject(nextValue) && Object.keys(nextValue).length === 0) {
      continue
    }

    mapped[key] = nextValue
  }

  if (Object.keys(mapped).length === 0) {
    return "none"
  }

  return mapped
}

function getPathValue(object, pathParts, fallback = "") {
  const resolved = pathParts.reduce((acc, key) => (isObject(acc) ? acc[key] : undefined), object)
  if (resolved === undefined || resolved === null || resolved === "") {
    return fallback
  }
  return resolved
}

function toFontWeight(value) {
  const normalized = String(value ?? "").trim().toLowerCase()
  if (normalized === "regular") {
    return "400"
  }
  if (normalized === "medium") {
    return "500"
  }
  if (normalized === "semi-bold" || normalized === "semibold") {
    return "600"
  }
  if (normalized === "bold") {
    return "700"
  }
  return String(value)
}

function buildReferenceMap(figmaExport) {
  const map = new Map()

  const registerCollection = (sourceCollection, outputCollection, sourceTree) => {
    traverseLeaves(sourceTree, [], (pathParts) => {
      const sourcePath = [sourceCollection, ...pathParts]
      const outputPath = [outputCollection, ...pathParts]
      map.set(canonicalPath(sourcePath), outputPath)
    })
  }

  registerCollection("colors", "color", figmaExport.variables.colors)
  registerCollection("spacing", "spacingScale", figmaExport.variables.spacing)
  registerCollection("textTokens", "textTokens", figmaExport.variables.textTokens)

  return map
}

function buildSpacingAliases(spacingScale) {
  return {
    xs: spacingScale.space25,
    sm: spacingScale.space50,
    md: spacingScale.space75,
    lg: spacingScale.space100,
    xl: spacingScale.space125,
    "2xl": spacingScale.space150,
    "3xl": spacingScale.space200,
    "4xl": spacingScale.space400,
    "5xl": spacingScale.space500,
    "6xl": spacingScale.space600,
    "7xl": spacingScale.space750
  }
}

function buildTypographyAliases(textTokens) {
  const fontFamilyRaw = getPathValue(textTokens, ["general", "fontFamily"], "Rubik")
  const fontFamily = fontFamilyRaw.includes(",") ? fontFamilyRaw : `"${fontFamilyRaw}", sans-serif`

  return {
    fontFamilyBase: fontFamily,
    fontFamilyUi: fontFamily,
    fontSizeTiny: getPathValue(textTokens, ["fontSizes", "paragraph", "tiny"], "12px"),
    fontSizeSm: getPathValue(textTokens, ["fontSizes", "paragraph", "small"], "14px"),
    fontSizeMd: getPathValue(textTokens, ["fontSizes", "paragraph", "medium"], "16px"),
    fontSizeBig: getPathValue(textTokens, ["fontSizes", "paragraph", "big"], "18px"),
    fontSizeLg: getPathValue(textTokens, ["fontSizes", "headings", "h6"], "18px"),
    fontSizeH6: getPathValue(textTokens, ["fontSizes", "headings", "h6"], "18px"),
    fontSizeH4: getPathValue(textTokens, ["fontSizes", "headings", "h4"], "24px"),
    fontSizeH1: getPathValue(textTokens, ["fontSizes", "headings", "h1"], "48px"),
    fontWeightRegular: toFontWeight(getPathValue(textTokens, ["general", "fontWeightRegular"], "Regular")),
    fontWeightMedium: toFontWeight(getPathValue(textTokens, ["general", "fontWeightMedium"], "Medium")),
    fontWeightSemibold: toFontWeight(getPathValue(textTokens, ["general", "fontWeightSemibold"], "Semi-Bold")),
    fontWeightBold: toFontWeight(getPathValue(textTokens, ["general", "fontWeightBold"], "Bold")),
    lineHeightParagraph: getPathValue(textTokens, ["lineHeight", "actions", "small"], "18px"),
    lineHeightHeading: "1.2",
    letterSpacingMax: getPathValue(textTokens, ["general", "letterSpacingMax"], "0px")
  }
}

function toTextStyleBaseName(styleName) {
  return String(styleName).replace(/(Regular|Medium|Med|Bold|Semi|Semibold)$/i, "")
}

function resolveTextTokenPath(textTokens, tokenGroup, styleGroup, styleName, expectedValue) {
  const styleCandidates = [styleName, toTextStyleBaseName(styleName)]
  for (const candidate of styleCandidates) {
    if (!candidate) {
      continue
    }
    const candidateValue = getPathValue(textTokens, [tokenGroup, styleGroup, candidate], undefined)
    if (candidateValue === expectedValue) {
      return [tokenGroup, styleGroup, candidate]
    }
  }

  const groupTokens = getPathValue(textTokens, [tokenGroup, styleGroup], {})
  for (const [candidate, candidateValue] of Object.entries(groupTokens)) {
    if (candidateValue === expectedValue) {
      return [tokenGroup, styleGroup, candidate]
    }
  }

  return null
}

function buildTextStylesFromVariables(textStyles, textTokens, typographyAliases) {
  const fontWeightPathByValue = new Map([
    [typographyAliases.fontWeightRegular, "fontWeightRegular"],
    [typographyAliases.fontWeightMedium, "fontWeightMedium"],
    [typographyAliases.fontWeightSemibold, "fontWeightSemibold"],
    [typographyAliases.fontWeightBold, "fontWeightBold"]
  ])

  const letterSpacingPathByValue = new Map([
    [getPathValue(textTokens, ["general", "letterSpacingMin"], undefined), ["general", "letterSpacingMin"]],
    [getPathValue(textTokens, ["general", "letterSpacingMax"], undefined), ["general", "letterSpacingMax"]]
  ])

  const mapped = {}
  for (const [styleGroup, styles] of Object.entries(textStyles)) {
    mapped[styleGroup] = {}
    for (const [styleName, styleProps] of Object.entries(styles)) {
      mapped[styleGroup][styleName] = {}
      for (const [propertyName, propertyValue] of Object.entries(styleProps)) {
        let nextValue = propertyValue

        if (propertyName === "fontSize") {
          const tokenPath = resolveTextTokenPath(textTokens, "fontSizes", styleGroup, styleName, propertyValue)
          if (tokenPath) {
            nextValue = `var(--rr-textTokens-${tokenPath.join("-")})`
          }
        } else if (propertyName === "lineHeight") {
          const tokenPath = resolveTextTokenPath(textTokens, "lineHeight", styleGroup, styleName, propertyValue)
          if (tokenPath) {
            nextValue = `var(--rr-textTokens-${tokenPath.join("-")})`
          }
        } else if (propertyName === "fontFamily") {
          const fontFamilyValue = getPathValue(textTokens, ["general", "fontFamily"], undefined)
          if (propertyValue === fontFamilyValue) {
            nextValue = "var(--rr-textTokens-general-fontFamily)"
          }
        } else if (propertyName === "fontWeight") {
          const fontWeightPath = fontWeightPathByValue.get(String(propertyValue))
          if (fontWeightPath) {
            nextValue = `var(--rr-typography-${fontWeightPath})`
          }
        } else if (propertyName === "letterSpacing") {
          const letterSpacingPath = letterSpacingPathByValue.get(propertyValue)
          if (letterSpacingPath) {
            nextValue = `var(--rr-textTokens-${letterSpacingPath.join("-")})`
          }
        }

        mapped[styleGroup][styleName][propertyName] = nextValue
      }
    }
  }

  return mapped
}

function buildLegacyPrimitiveAliases(themes) {
  const light = themes.light ?? {}
  return {
    text: {
      primary: getPathValue(light, ["text", "primary"]),
      secondary: getPathValue(light, ["text", "secondary"]),
      tertiary: getPathValue(light, ["text", "tertiary"])
    },
    stroke: {
      primary: getPathValue(light, ["stroke", "primary"]),
      field: getPathValue(light, ["stroke", "field"])
    },
    background: {
      pageLight: getPathValue(light, ["background", "pageLight"], getPathValue(light, ["background", "page"])),
      card: getPathValue(light, ["background", "card"]),
      table: getPathValue(light, ["background", "table"])
    }
  }
}

function buildFromFigmaExport(figmaExport) {
  const referenceMap = buildReferenceMap(figmaExport)

  const mapLeaf = (value, type) => normalizeTokenValue(value, type, referenceMap)

  const color = mapTokenTree(figmaExport.variables.colors, mapLeaf, referenceMap)
  const spacingScale = mapTokenTree(figmaExport.variables.spacing, mapLeaf, referenceMap)
  const layout = mapTokenTree(figmaExport.variables.tokenSpacing, mapLeaf, referenceMap)
  const textTokens = mapTokenTree(figmaExport.variables.textTokens, mapLeaf, referenceMap)
  const textStylesRaw = mapTokenTree(figmaExport.typography.typography, mapLeaf, referenceMap)
  const typography = buildTypographyAliases(textTokens)
  const textStyles = buildTextStylesFromVariables(textStylesRaw, textTokens, typography)
  const effectStyles = mapEffectNode(figmaExport.effect.effect)

  const themes = {}
  for (const [themeName, themeValues] of Object.entries(figmaExport.variables.tokenColors ?? {})) {
    themes[themeName] = mapTokenTree(themeValues, mapLeaf, referenceMap)
  }

  const legacyPrimitives = buildLegacyPrimitiveAliases(themes)

  const tokens = {
    tokenColors: {
      primitive: color,
      semantic: themes
    },
    color,
    spacingScale,
    spacing: buildSpacingAliases(spacingScale),
    layout,
    radius: getPathValue(layout, ["desktop", "cornerRadius"], {}),
    typography,
    typographySystem: {
      variables: textTokens,
      styles: textStyles
    },
    textTokens,
    textStylesRaw,
    textStyles,
    effects: {
      ...effectStyles,
      shadowLg: getPathValue(effectStyles, ["shadow", "lg"])
    },
    shadow: getPathValue(effectStyles, ["shadow"], {}),
    semantic: themes,
    text: legacyPrimitives.text,
    stroke: legacyPrimitives.stroke,
    background: legacyPrimitives.background
  }

  return { tokens, themes }
}

function buildThemeCss(themeName, themeValues) {
  const flattened = flattenObject(themeValues)
  const flattenedMap = new Map(flattened)
  const lines = flattened.map(([name, value]) => `  --rr-sem-${name}: ${value};`)

  for (const [legacyName, semanticPath] of Object.entries(LEGACY_SEMANTIC_ALIASES)) {
    const semanticKey = semanticPath.replace(/\./g, "-")
    if (!flattenedMap.has(semanticKey)) {
      continue
    }
    lines.push(`  --rr-sem-${legacyName}: var(--rr-sem-${semanticKey});`)
  }

  return `[data-theme=\"${themeName}\"] {\n${lines.join("\n")}\n}\n`
}

let tokens
let themes

if (existsSync(figmaExportPath)) {
  const figmaExport = readJson(figmaExportPath)
  const transformed = buildFromFigmaExport(figmaExport)
  tokens = transformed.tokens
  themes = transformed.themes

  writeFileSync(tokensRawPath, `${JSON.stringify(tokens, null, 2)}\n`)
  writeFileSync(themesRawPath, `${JSON.stringify(themes, null, 2)}\n`)
} else {
  tokens = readJson(tokensRawPath)
  themes = readJson(themesRawPath)
}

mkdirSync(tokensDistDir, { recursive: true })
mkdirSync(themesSrcDir, { recursive: true })
mkdirSync(themesDistDir, { recursive: true })
const flattenedTokens = flattenObject(tokens, [], {
  skipRootKeys: new Set(["semantic", "tokenColors", "typographySystem", "textStylesRaw"])
})
const tokenCssVariables = flattenedTokens
  .map(([name, value]) => `  --rr-${name}: ${value};`)
  .join("\n")

writeFileSync(path.join(tokensDistDir, "tokens.css"), `:root {\n${tokenCssVariables}\n}\n`)
writeFileSync(path.join(tokensDistDir, "tokens.json"), `${JSON.stringify(tokens, null, 2)}\n`)
writeFileSync(
  path.join(tokensDistDir, "tokens.js"),
  `export const tokens = ${JSON.stringify(tokens, null, 2)}\n`
)

for (const [themeName, themeValues] of Object.entries(themes)) {
  const content = buildThemeCss(themeName, themeValues)
  writeFileSync(path.join(themesSrcDir, `theme-${themeName}.css`), content)
  writeFileSync(path.join(themesDistDir, `theme-${themeName}.css`), content)
}

writeFileSync(path.join(themesDistDir, "themes.json"), `${JSON.stringify(themes, null, 2)}\n`)

console.log(
  `Built design tokens and themes (${flattenedTokens.length} base variables, ${Object.keys(themes).length} theme modes).`
)
