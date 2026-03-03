import rrThemeStyles from "./theme.css?inline"

export const rrBaseStyles = rrThemeStyles

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function getBooleanAttribute(element, name, fallback = false) {
  if (!element.hasAttribute(name)) {
    return fallback
  }

  const value = element.getAttribute(name)
  return value === "" || value === "true" || value === name
}

export function normalizeOption(value, validOptions, fallback) {
  const candidate = String(value ?? "").toLowerCase()
  return validOptions.includes(candidate) ? candidate : fallback
}

export function parseNumberAttribute(element, name, fallback, { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = {}) {
  const value = Number.parseInt(element.getAttribute(name) ?? "", 10)
  if (Number.isNaN(value)) {
    return fallback
  }
  return Math.min(Math.max(value, min), max)
}
