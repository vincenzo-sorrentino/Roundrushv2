import { readFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

const REQUIRED_FRONTMATTER_FIELDS = [
  "id",
  "domain",
  "feature",
  "status",
  "owner",
  "prototype_route",
  "figma_url",
  "updated_at"
]

const REQUIRED_SECTIONS = [
  "# Problem",
  "# Scope",
  "# User Stories",
  "# Functional Requirements",
  "# Non-Functional Requirements",
  "# Edge Cases",
  "# Dependencies",
  "# Acceptance Criteria"
]

const VALID_STATUSES = ["draft", "in_review", "approved", "implemented", "archived"]

function walkFiles(dir, predicate) {
  const entries = readdirSync(dir)
  const found = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      found.push(...walkFiles(fullPath, predicate))
      continue
    }

    if (predicate(fullPath)) {
      found.push(fullPath)
    }
  }

  return found
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    return null
  }

  const body = match[1]
  const fields = {}

  for (const line of body.split("\n")) {
    if (!line.trim()) {
      continue
    }

    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    fields[key] = value
  }

  return fields
}

function collectFlowConfigs() {
  const flowDir = path.resolve("prototypes/app/src/flows")
  const flowConfigPaths = walkFiles(flowDir, (filePath) => filePath.endsWith("flow.config.json"))
  const byRoute = new Map()

  for (const configPath of flowConfigPaths) {
    const data = JSON.parse(readFileSync(configPath, "utf8"))
    if (data.route) {
      byRoute.set(data.route, {
        path: path.relative(process.cwd(), configPath),
        config: data
      })
    }
  }

  return byRoute
}

const errors = []
const specsDir = path.resolve("requirements/epics")
const specPaths = walkFiles(specsDir, (filePath) => filePath.endsWith("/spec.md"))
const linkPaths = walkFiles(specsDir, (filePath) => filePath.endsWith("/links.json"))
const routeConfigsByRoute = collectFlowConfigs()
const specMetaByRelativePath = new Map()

for (const specPath of specPaths) {
  const relativeSpecPath = path.relative(process.cwd(), specPath)
  const markdown = readFileSync(specPath, "utf8")
  const frontmatter = parseFrontmatter(markdown)

  if (!frontmatter) {
    errors.push(`${relativeSpecPath}: missing frontmatter`) 
    continue
  }

  for (const field of REQUIRED_FRONTMATTER_FIELDS) {
    if (!frontmatter[field]) {
      errors.push(`${relativeSpecPath}: missing frontmatter field '${field}'`)
    }
  }

  if (frontmatter.status && !VALID_STATUSES.includes(frontmatter.status)) {
    errors.push(`${relativeSpecPath}: invalid status '${frontmatter.status}'`)
  }

  if (frontmatter.status === "approved" && !frontmatter.prototype_route) {
    errors.push(`${relativeSpecPath}: approved spec requires prototype_route`)
  }

  if (frontmatter.updated_at && Number.isNaN(Date.parse(frontmatter.updated_at))) {
    errors.push(`${relativeSpecPath}: invalid updated_at '${frontmatter.updated_at}'`)
  }

  for (const section of REQUIRED_SECTIONS) {
    if (!markdown.includes(section)) {
      errors.push(`${relativeSpecPath}: missing required section '${section}'`)
    }
  }

  specMetaByRelativePath.set(relativeSpecPath, frontmatter)

  const requiresPrototypeLink = frontmatter.status === "approved" || frontmatter.status === "implemented"
  if (requiresPrototypeLink && frontmatter.prototype_route && !routeConfigsByRoute.has(frontmatter.prototype_route)) {
    errors.push(`${relativeSpecPath}: prototype_route '${frontmatter.prototype_route}' has no matching flow.config.json`)
  }
}

for (const linkPath of linkPaths) {
  const relativeLinkPath = path.relative(process.cwd(), linkPath)
  const data = JSON.parse(readFileSync(linkPath, "utf8"))
  const linkedSpecMeta = data.spec_file ? specMetaByRelativePath.get(data.spec_file) : null
  const requiresPrototypeLink = linkedSpecMeta
    ? linkedSpecMeta.status === "approved" || linkedSpecMeta.status === "implemented"
    : true

  if (!data.spec_file || !data.flow_file || !data.acceptance_file || !data.prototype_route) {
    errors.push(`${relativeLinkPath}: missing required keys (spec_file/flow_file/acceptance_file/prototype_route)`)
  }

  if (data.spec_file) {
    const specAbsolute = path.resolve(data.spec_file)
    try {
      statSync(specAbsolute)
    } catch {
      errors.push(`${relativeLinkPath}: referenced spec_file does not exist: ${data.spec_file}`)
    }
  }

  if (requiresPrototypeLink && data.prototype_route && !routeConfigsByRoute.has(data.prototype_route)) {
    errors.push(`${relativeLinkPath}: prototype_route '${data.prototype_route}' has no matching flow.config.json`)
  }

  if (requiresPrototypeLink && !data.prototype_flow_config) {
    errors.push(`${relativeLinkPath}: approved or implemented flow requires prototype_flow_config`)
  }

  if (requiresPrototypeLink && data.prototype_flow_config) {
    const absoluteFlowConfig = path.resolve(data.prototype_flow_config)
    try {
      const flowConfigStats = statSync(absoluteFlowConfig)
      if (!flowConfigStats.isFile()) {
        errors.push(`${relativeLinkPath}: prototype_flow_config is not a file: ${data.prototype_flow_config}`)
      }
    } catch {
      errors.push(`${relativeLinkPath}: prototype_flow_config missing: ${data.prototype_flow_config}`)
    }
  }
}

if (errors.length > 0) {
  console.error("Spec validation failed:\n")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`Spec validation passed (${specPaths.length} specs, ${linkPaths.length} link maps).`)
