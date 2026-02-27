import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const rawPath = path.resolve("design-system/source/figma/components.raw.json")
const outRoot = path.resolve("design-system/packages/components/src")

const payload = JSON.parse(readFileSync(rawPath, "utf8"))
const components = payload.components || []

if (!Array.isArray(components) || components.length === 0) {
  console.error("No components found in components.raw.json")
  process.exit(1)
}

for (const component of components) {
  const category = component.category || "primitives"
  const outDir = path.join(outRoot, category)
  mkdirSync(outDir, { recursive: true })

  const filePath = path.join(outDir, `${component.tag}.js`)
  if (existsSync(filePath)) {
    continue
  }

  const className = component.tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

  const content = `export class ${className} extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = \
\`<style>
  :host {
    display: block;
    font-family: var(--rr-typography-fontFamilyBase);
    color: var(--rr-sem-textPrimary);
  }
</style>
<slot></slot>\`
  }
}

if (!customElements.get("${component.tag}")) {
  customElements.define("${component.tag}", ${className})
}
`

  writeFileSync(filePath, content)
}

const exportLines = components.map((component) => {
  const category = component.category || "primitives"
  return `import "./${category}/${component.tag}.js"`
})

const indexPath = path.join(outRoot, "index.js")
writeFileSync(indexPath, `${exportLines.join("\n")}\n`)

console.log(`Scaffolded ${components.length} components from components.raw.json`)
