import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const testsDir = path.dirname(fileURLToPath(import.meta.url))
const appRootDir = path.resolve(testsDir, "..")

const routesFile = readFileSync(path.join(appRootDir, "src/router/routes.js"), "utf8")
const flowConfig = JSON.parse(
  readFileSync(path.join(appRootDir, "src/flows/auth-login/flow.config.json"), "utf8")
)

if (!routesFile.includes(flowConfig.route)) {
  console.error(`Missing prototype route in router: ${flowConfig.route}`)
  process.exit(1)
}

if (!flowConfig.spec_id || !flowConfig.entry_screen) {
  console.error("flow.config.json is missing required fields")
  process.exit(1)
}

console.log("Prototype route checks passed.")
