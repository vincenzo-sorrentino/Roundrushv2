import { cpSync, existsSync } from "node:fs"
import path from "node:path"

const sourceDir = process.argv[2]
const destinationDir = path.resolve("design-system/source/figma")
const requiredFiles = ["tokens.raw.json", "themes.raw.json", "components.raw.json"]

if (!sourceDir) {
  console.log("Usage: node design-system/scripts/sync-figma-tokens.mjs <figma-export-directory>")
  process.exit(1)
}

const resolvedSourceDir = path.resolve(sourceDir)

for (const fileName of requiredFiles) {
  const inputPath = path.join(resolvedSourceDir, fileName)
  if (!existsSync(inputPath)) {
    console.error(`Missing required file: ${inputPath}`)
    process.exit(1)
  }
}

for (const fileName of requiredFiles) {
  const inputPath = path.join(resolvedSourceDir, fileName)
  const outputPath = path.join(destinationDir, fileName)
  cpSync(inputPath, outputPath)
  console.log(`Synced ${fileName}`)
}
