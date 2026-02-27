import { readFileSync } from "node:fs"
import path from "node:path"

const filePath = path.resolve("design-system/source/figma/components.raw.json")
const source = JSON.parse(readFileSync(filePath, "utf8"))
const expected = [
  "rr-button",
  "rr-input",
  "rr-password-input",
  "rr-checkbox",
  "rr-select",
  "rr-alert",
  "rr-card",
  "rr-modal",
  "rr-spinner",
  "rr-table-header",
  "rr-table-header-cell"
]

const actual = (source.components || []).map((entry) => entry.tag)
const missing = expected.filter((tag) => !actual.includes(tag))

if (missing.length > 0) {
  console.error(`Missing component tags in components.raw.json: ${missing.join(", ")}`)
  process.exit(1)
}

console.log("Component contract check passed.")
