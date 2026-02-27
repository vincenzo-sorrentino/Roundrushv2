import { execSync } from "node:child_process"

function getChangedFiles() {
  if (process.argv.length > 2) {
    return process.argv.slice(2)
  }

  const base = process.env.BASE_SHA
  const head = process.env.HEAD_SHA

  if (base && head) {
    const output = execSync(`git diff --name-only ${base} ${head}`, { encoding: "utf8" })
    return output.split("\n").filter(Boolean)
  }

  const output = execSync("git diff --name-only HEAD~1 HEAD", { encoding: "utf8" })
  return output.split("\n").filter(Boolean)
}

const changedFiles = getChangedFiles()
const flowPrefix = "prototypes/app/src/flows/"

const changedFlows = new Set()
for (const filePath of changedFiles) {
  if (!filePath.startsWith(flowPrefix)) {
    continue
  }

  const parts = filePath.replace(flowPrefix, "").split("/")
  const flowId = parts[0]
  if (flowId) {
    changedFlows.add(flowId)
  }
}

console.log(JSON.stringify({ changedFlows: [...changedFlows] }, null, 2))
