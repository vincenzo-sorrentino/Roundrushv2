import { execSync } from "node:child_process"

function tryGitFiles(command) {
  try {
    const output = execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
    return output.split("\n").filter(Boolean)
  } catch {
    return null
  }
}

function getChangedFiles() {
  if (process.argv.length > 2) {
    return process.argv.slice(2)
  }

  const base = process.env.BASE_SHA
  const head = process.env.HEAD_SHA

  if (base && head) {
    const files = tryGitFiles(`git diff --name-only ${base} ${head}`)
    if (files) {
      return files
    }
  }

  const previousHeadFiles = tryGitFiles("git diff --name-only HEAD~1 HEAD")
  if (previousHeadFiles) {
    return previousHeadFiles
  }

  const headFiles = tryGitFiles("git show --pretty= --name-only HEAD")
  if (headFiles) {
    return headFiles
  }

  return []
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
