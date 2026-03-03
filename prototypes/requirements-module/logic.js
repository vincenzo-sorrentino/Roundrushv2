/**
 * Deterministic RoundRush V2 rollup rules:
 * 1) A module is compliant only when all 7 Acceptance Laws are PASS.
 * 2) A requirement is complete only when every module is compliant.
 * 3) Requirement stage rollup:
 *    - if complete => done
 *    - else if any module stage is in-progress => in-progress
 *    - else => ready-for-review
 */

export function isModuleCompliant(lawMap, lawIds = []) {
  const ids = Array.isArray(lawIds) && lawIds.length > 0
    ? lawIds
    : Object.keys(lawMap || {})

  if (ids.length === 0) {
    return false
  }

  return ids.every((lawId) => (lawMap?.[lawId] || "unknown") === "pass")
}

export function isRequirementComplete(modules, lawIds = []) {
  if (!Array.isArray(modules) || modules.length === 0) {
    return false
  }

  return modules.every((moduleNode) => {
    const lawMap = moduleNode?.meta?.lawMap || moduleNode?.lawMap || {}
    return isModuleCompliant(lawMap, lawIds)
  })
}

export function rollupRequirementStage(modules, isComplete) {
  if (isComplete) {
    return "done"
  }

  // Treat early lifecycle statuses as "in-progress" for deterministic stage rollups.
  const hasInProgressModule = Array.isArray(modules) && modules.some((moduleNode) => {
    const stage = String(moduleNode?.meta?.stage || moduleNode?.stage || "")
      .toLowerCase()
      .trim()
      .replaceAll(/[\s_]+/g, "-")
    return stage === "in-progress" || stage === "to-do" || stage === "design"
  })

  if (hasInProgressModule) {
    return "in-progress"
  }

  return "ready-for-review"
}
