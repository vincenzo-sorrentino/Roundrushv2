import { readFileSync } from "node:fs"
import path from "node:path"

const filePath = path.resolve("design-system/source/figma/components.raw.json")
const source = JSON.parse(readFileSync(filePath, "utf8"))
const expected = [
  "rr-button",
  "rr-button-icon",
  "rr-button-link",
  "rr-input",
  "rr-mega-input",
  "rr-verification-code-input",
  "rr-text-area",
  "rr-password-input",
  "rr-checkbox",
  "rr-select",
  "rr-dropdown-item",
  "rr-dropdown-template",
  "rr-toggle",
  "rr-toggle-text",
  "rr-alert",
  "rr-card",
  "rr-modal",
  "rr-spinner",
  "rr-table-header",
  "rr-table-header-cell",
  "rr-table-cell"
]

const actual = (source.components || []).map((entry) => entry.tag)
const missing = expected.filter((tag) => !actual.includes(tag))

if (missing.length > 0) {
  console.error(`Missing component tags in components.raw.json: ${missing.join(", ")}`)
  process.exit(1)
}

console.log("Component contract check passed.")
