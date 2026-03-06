import { readFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

// ─── helpers ─────────────────────────────────────────────────────────────────

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const fields = {}
  const lines = match[1].split("\n")
  let currentKey = null
  for (const line of lines) {
    if (!line.trim()) continue
    // YAML block sequence item under current key
    if (currentKey && /^\s+-\s/.test(line)) {
      fields[currentKey] = fields[currentKey]
        ? fields[currentKey] + "," + line.replace(/^\s+-\s*/, "").trim()
        : line.replace(/^\s+-\s*/, "").trim()
      continue
    }
    const sep = line.indexOf(":")
    if (sep === -1) continue
    currentKey = line.slice(0, sep).trim()
    const value = line.slice(sep + 1).trim()
    fields[currentKey] = value
  }
  return fields
}

/** Read prototype routes registered in the app router. */
function collectRegisteredRoutes() {
  const routesPath = path.resolve("prototypes/app/src/router/routes.js")
  const src = readFileSync(routesPath, "utf8")
  const matches = [...src.matchAll(/path:\s*["']([^"']+)["']/g)]
  return new Set(matches.map((m) => m[1]))
}

// ─── constants ────────────────────────────────────────────────────────────────

const VALID_DESIGN_STATES = ["discovery", "drafting", "review", "approved", "ready_for_delivery"]
const VALID_MODULE_STATUSES = ["draft", "ready", "in_dev", "done", "archived"]
const ACTIVE_STATUSES = ["done"]

const EPIC_REQUIRED_FIELDS = ["id", "title_short", "title", "design_state", "modules"]
const MODULE_REQUIRED_FIELDS = ["id", "title", "epic", "status", "prototype_route", "functionalities"]
const MODULE_REQUIRED_SECTIONS = ["## Overview", "## Acceptance Laws", "## Functionalities"]


// ─── main ─────────────────────────────────────────────────────────────────────

const errors = []
const registeredRoutes = collectRegisteredRoutes()
const epicsDir = path.resolve("requirements/epics")

const epicFolders = readdirSync(epicsDir).filter((name) => {
  return statSync(path.join(epicsDir, name)).isDirectory()
})

let epicFileCount = 0
let moduleFileCount = 0

for (const epicFolder of epicFolders) {
  const epicDir = path.join(epicsDir, epicFolder)
  const files = readdirSync(epicDir).filter((f) => f.endsWith(".md"))

  const epicFileName = `${epicFolder}.md`
  const moduleFiles = files.filter((f) => f !== epicFileName)

  // ── validate epic file ─────────────────────────────────────────────────────
  const epicFilePath = path.join(epicDir, epicFileName)
  const epicRelPath = path.relative(process.cwd(), epicFilePath)

  let epicData
  try {
    epicData = readFileSync(epicFilePath, "utf8")
  } catch {
    errors.push(`${epicRelPath}: epic file missing — expected ${epicFileName}`)
    continue
  }

  epicFileCount++
  const epicFm = parseFrontmatter(epicData)

  if (!epicFm) {
    errors.push(`${epicRelPath}: missing frontmatter`)
  } else {
    for (const field of EPIC_REQUIRED_FIELDS) {
      if (!epicFm[field]) {
        errors.push(`${epicRelPath}: missing frontmatter field '${field}'`)
      }
    }
    if (epicFm.design_state && !VALID_DESIGN_STATES.includes(epicFm.design_state)) {
      errors.push(`${epicRelPath}: invalid design_state '${epicFm.design_state}'`)
    }
  }

  if (!epicData.includes("## Acceptance Laws")) {
    errors.push(`${epicRelPath}: missing '## Acceptance Laws' section`)
  }

  // ── validate module files ──────────────────────────────────────────────────
  for (const moduleFileName of moduleFiles) {
    const modulePath = path.join(epicDir, moduleFileName)
    const moduleRelPath = path.relative(process.cwd(), modulePath)
    moduleFileCount++

    const moduleData = readFileSync(modulePath, "utf8")
    const moduleFm = parseFrontmatter(moduleData)

    if (!moduleFm) {
      errors.push(`${moduleRelPath}: missing frontmatter`)
      continue
    }

    for (const field of MODULE_REQUIRED_FIELDS) {
      if (field === "prototype_route" && moduleFm[field] === "~") continue
      if (moduleFm[field] === undefined || moduleFm[field] === "") {
        errors.push(`${moduleRelPath}: missing frontmatter field '${field}'`)
      }
    }

    if (moduleFm.status && !VALID_MODULE_STATUSES.includes(moduleFm.status)) {
      errors.push(`${moduleRelPath}: invalid status '${moduleFm.status}'`)
    }

    const route = moduleFm.prototype_route
    if (ACTIVE_STATUSES.includes(moduleFm.status)) {
      if (!route || route === "~") {
        errors.push(`${moduleRelPath}: status '${moduleFm.status}' requires a non-null prototype_route`)
      }
    }

    if (route && route !== "~") {
      if (!registeredRoutes.has(route)) {
        errors.push(
          `${moduleRelPath}: prototype_route '${route}' is not registered in prototypes/app/src/router/routes.js`
        )
      }
    }

    for (const section of MODULE_REQUIRED_SECTIONS) {
      if (!moduleData.includes(section)) {
        errors.push(`${moduleRelPath}: missing required section '${section}'`)
      }
    }
  }
}

// ─── result ───────────────────────────────────────────────────────────────────

if (errors.length > 0) {
  console.error("Spec validation failed:\n")
  for (const error of errors) {
    console.error(`  - ${error}`)
  }
  process.exit(1)
}

console.log(`Spec validation passed (${epicFileCount} epics, ${moduleFileCount} modules).`)
