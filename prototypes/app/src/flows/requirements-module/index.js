import {
  ACCEPTANCE_LAWS,
  PROTOTYPE_LINKS,
  REQUIREMENTS_SYNC,
  REQUIREMENTS_SYNC_TIMELINE,
  REQUIREMENTS_TREE
} from "../../../../requirements-module/data.mock.js"
import {
  isModuleCompliant,
  isRequirementComplete,
  rollupRequirementStage
} from "../../../../requirements-module/logic.js"

const LAW_IDS = ACCEPTANCE_LAWS.map((law) => law.id)
const NODE_STATUS_VALUES = ["to-do", "design", "design-review", "approved", "ready-for-sprint"]
const NODE_STATUS_LABELS = {
  "to-do": "To do",
  design: "Design",
  "design-review": "Design review",
  approved: "Approved",
  "ready-for-sprint": "Ready for sprint"
}
const SYNC_STAGE_VALUES = ["in-progress", "ready-for-review", "done"]
const SYNC_STAGE_LABELS = {
  "in-progress": "In progress",
  "ready-for-review": "Ready for review",
  done: "Done"
}
const COMPLIANCE_VALUES = ["fully-compliant", "has-failures", "has-unknowns"]
const SYNC_STATUS_LABELS = {
  synced: "Synced",
  syncing: "Syncing",
  "sync-failed": "Sync failed"
}
const SYNC_RUN_RESULT_VALUES = ["success", "failure"]
const SYNC_RUN_RESULT_LABELS = {
  success: "Success",
  failure: "Failure"
}
const SYNC_RUN_SCOPE_TYPES = ["requirement", "module"]
const REPOSITORY_STRUCTURE_ITEMS = [
  { key: "requirementsPath", label: "/requirements/" },
  { key: "testsUnitPath", label: "/tests/unit/" },
  { key: "testsIntegrationPath", label: "/tests/integration/" },
  { key: "testsE2EPath", label: "/tests/e2e/" },
  { key: "docsPath", label: "/docs/" },
  { key: "docsUmlPath", label: "/docs/uml/" },
  { key: "projectGovernancePath", label: "/project-governance/" },
  { key: "dependencyMapPath", label: "/dependency-map/" },
  { key: "prototypesPath", label: "/prototypes/" }
]

let unmountRequirementsModuleFlow = null

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function toNodeStatusLabel(stage) {
  return NODE_STATUS_LABELS[stage] || NODE_STATUS_LABELS["to-do"]
}

function toSyncStageLabel(stage) {
  return SYNC_STAGE_LABELS[stage] || SYNC_STAGE_LABELS["in-progress"]
}

function toSyncLabel(status) {
  return SYNC_STATUS_LABELS[status] || SYNC_STATUS_LABELS.synced
}

function toSyncRunResultLabel(result) {
  return SYNC_RUN_RESULT_LABELS[result] || SYNC_RUN_RESULT_LABELS.success
}

function normalizeNodeStatus(value) {
  const candidate = String(value || "")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")
  if (NODE_STATUS_VALUES.includes(candidate)) {
    return candidate
  }
  if (candidate === "in-progress") {
    return "design"
  }
  if (candidate === "ready-for-review") {
    return "design-review"
  }
  if (candidate === "done") {
    return "ready-for-sprint"
  }
  return "to-do"
}

function normalizeLawStatus(value) {
  const candidate = String(value || "")
    .toLowerCase()
    .trim()
  if (candidate === "fail") {
    return "fail"
  }
  if (candidate === "unknown") {
    return "unknown"
  }
  return "pass"
}

function normalizeDependencyEntries(entries) {
  if (!Array.isArray(entries)) {
    return []
  }

  return entries
    .map((entry) => {
      const moduleId = String(entry?.moduleId || "").trim()
      const reason = String(entry?.reason || "").trim()
      const evidencePaths = Array.isArray(entry?.evidencePaths)
        ? entry.evidencePaths.map((path) => String(path || "").trim()).filter(Boolean)
        : []
      if (!moduleId || !reason) {
        return null
      }
      return {
        moduleId,
        reason,
        evidencePaths
      }
    })
    .filter(Boolean)
}

function normalizeRepositoryPaths(repositoryPaths) {
  const source = repositoryPaths && typeof repositoryPaths === "object"
    ? repositoryPaths
    : {}
  const aliasSource = source.repoPaths && typeof source.repoPaths === "object"
    ? source.repoPaths
    : {}
  const normalized = {}
  for (const item of REPOSITORY_STRUCTURE_ITEMS) {
    normalized[item.key] = String(source[item.key] || aliasSource[item.key] || "").trim()
  }
  return normalized
}

function statusClassFromValue(value) {
  return String(value || "").replaceAll(/[\s_]+/g, "-")
}

function normalizeSyncRunStage(value) {
  const candidate = String(value || "")
    .toLowerCase()
    .trim()
    .replaceAll(/[\s_]+/g, "-")
  return SYNC_STAGE_VALUES.includes(candidate) ? candidate : "in-progress"
}

function normalizeSyncRunResult(value) {
  const candidate = String(value || "")
    .toLowerCase()
    .trim()
  return SYNC_RUN_RESULT_VALUES.includes(candidate) ? candidate : "success"
}

function normalizeSyncRunScopeType(value) {
  const candidate = String(value || "")
    .toLowerCase()
    .trim()
  return SYNC_RUN_SCOPE_TYPES.includes(candidate) ? candidate : "module"
}

function normalizePathList(values) {
  if (!Array.isArray(values)) {
    return []
  }
  return values.map((value) => String(value || "").trim()).filter(Boolean)
}

function normalizeFailingLaws(values) {
  if (!Array.isArray(values)) {
    return []
  }
  return values
    .map((value) => String(value || "").trim().toUpperCase())
    .filter(Boolean)
}

function inferArtifactPaths(changedPaths = []) {
  return changedPaths.filter((path) => /\/(?:artifacts?|reports?)\//i.test(path))
}

function normalizeSyncRun(entry, index = 0) {
  const changedPaths = normalizePathList(entry?.changedPaths)
  const explicitArtifactPaths = normalizePathList(entry?.artifactPaths)
  const artifactPaths = explicitArtifactPaths.length > 0
    ? explicitArtifactPaths
    : inferArtifactPaths(changedPaths)
  const scopeType = normalizeSyncRunScopeType(entry?.scope?.type)
  const scopeId = String(entry?.scope?.scopeId || "").trim()
  const timestamp = String(entry?.timestamp || entry?.timestampIso || "").trim()
  const actor = String(entry?.actor || "").trim() || "AI Copilot (local)"
  const summary = String(entry?.summary || "").trim() || "Repository sync event."

  return {
    id: String(entry?.id || `sync-run-${index + 1}`).trim(),
    timestamp,
    stage: normalizeSyncRunStage(entry?.stage),
    result: normalizeSyncRunResult(entry?.result),
    actor,
    summary,
    changedPaths,
    failingLaws: normalizeFailingLaws(entry?.failingLaws),
    artifactPaths,
    scope: {
      type: scopeType,
      scopeId
    }
  }
}

function toNumber(value) {
  const parsed = Number.parseFloat(String(value ?? ""))
  return Number.isNaN(parsed) ? null : parsed
}

function createUnknownLawMap() {
  return Object.fromEntries(LAW_IDS.map((lawId) => [lawId, "unknown"]))
}

function summarizeComplianceFromLawMap(lawMap) {
  const values = Object.values(lawMap)
  const passedCount = values.filter((value) => value === "pass").length
  const hasFailLaw = values.includes("fail")
  const hasUnknownLaw = values.includes("unknown")
  return {
    passedCount,
    hasFailLaw,
    hasUnknownLaw,
    compliance: hasFailLaw ? "has-failures" : hasUnknownLaw ? "has-unknowns" : "fully-compliant"
  }
}

function inferStageFromLawSummary(summary) {
  if (summary.hasFailLaw) {
    return "ready-for-review"
  }
  if (summary.hasUnknownLaw) {
    return "in-progress"
  }
  return "done"
}

function mapDeterministicStageToNodeStatus(stage) {
  if (stage === "done") {
    return "ready-for-sprint"
  }
  if (stage === "in-progress") {
    return "design"
  }
  return "design-review"
}

function hasRequiredEvidence(evidence) {
  const docs = Array.isArray(evidence?.docsChangedPaths) ? evidence.docsChangedPaths.filter(Boolean) : []
  const requiredPaths = [
    evidence?.coverageArtifactPath,
    evidence?.testRunLogsPath,
    evidence?.dependencyMapPath,
    evidence?.regressionReportPath,
    evidence?.manualSuiteReferencePath
  ]

  const hasRequiredPaths = requiredPaths.every((value) => typeof value === "string" && value.trim().length > 0)
  const hasCoverage = toNumber(evidence?.coveragePercent) !== null
  const hasRegressionPassPercent = toNumber(evidence?.regressionPassPercent) !== null
  const hasDocs = docs.length > 0

  return hasRequiredPaths && hasCoverage && hasRegressionPassPercent && hasDocs
}

function normalizeModuleLawRecord(moduleNode, lawId) {
  const sourceRecord = moduleNode?.laws?.[lawId] || {}
  const evidence = sourceRecord.evidence || {}
  const sourceStatus = normalizeLawStatus(sourceRecord.status || "unknown")
  const evidenceComplete = hasRequiredEvidence(evidence)
  const coveragePercent = toNumber(evidence.coveragePercent)
  const regressionPassPercent = toNumber(evidence.regressionPassPercent)

  let status = sourceStatus

  if (!evidenceComplete) {
    status = "unknown"
  }

  if (evidenceComplete && lawId === "L2" && coveragePercent < 100) {
    status = "fail"
  }

  if (evidenceComplete && lawId === "L6" && regressionPassPercent < 100) {
    status = "fail"
  }

  return {
    lawId,
    status,
    sourceStatus,
    evidence,
    evidenceComplete,
    coveragePercent,
    regressionPassPercent
  }
}

function normalizeAcLawResult(result) {
  return normalizeLawStatus(result)
}

function annotateAcceptanceCriteria(node, parentPath = []) {
  const path = [...parentPath, node.id]
  const pathKey = path.join(":")
  const requirementId = path[0] || ""
  const lawResult = normalizeAcLawResult(node.result)
  const lawMap = createUnknownLawMap()
  if (LAW_IDS.includes(node.lawId)) {
    lawMap[node.lawId] = lawResult
  }
  const hasFailLaw = lawResult === "fail"
  const hasUnknownLaw = lawResult === "unknown"
  const compliance = hasFailLaw ? "has-failures" : (hasUnknownLaw ? "has-unknowns" : "fully-compliant")
  const configuredStage = node.status || node.stage
  const derivedStage = mapDeterministicStageToNodeStatus(hasFailLaw ? "ready-for-review" : (hasUnknownLaw ? "in-progress" : "done"))
  const stage = configuredStage ? normalizeNodeStatus(configuredStage) : derivedStage
  const inconsistentState = stage === "ready-for-sprint" && compliance !== "fully-compliant"

  return {
    ...node,
    type: "acceptance-criteria",
    path,
    pathKey,
    children: [],
      meta: {
        requirementId,
        repositoryPaths: normalizeRepositoryPaths(node.repositoryPaths || node.repoPaths),
        stage,
        compliance,
        hasFailLaw,
        hasUnknownLaw,
        warning: hasFailLaw,
        inconsistentState,
        lawMap,
        lawPassedCount: lawResult === "pass" ? 1 : 0,
      lawTotalCount: 1,
      acTotalCount: 1,
      acPassedCount: lawResult === "pass" ? 1 : 0,
      lawResult
    }
  }
}

function annotateFunctionality(node, parentPath = []) {
  const path = [...parentPath, node.id]
  const pathKey = path.join(":")
  const requirementId = path[0] || ""
  const children = (node.children || []).map((child) => annotateAcceptanceCriteria(child, path))
  const acResults = children.map((child) => child.meta.lawResult)
  const hasFailLaw = acResults.includes("fail")
  const hasUnknownLaw = acResults.includes("unknown")
  const acTotalCount = children.length
  const acPassedCount = children.filter((child) => child.meta.lawResult === "pass").length
  const lawMap = createUnknownLawMap()

  for (const lawId of LAW_IDS) {
    const lawResults = children
      .filter((criterion) => criterion.lawId === lawId)
      .map((criterion) => criterion.meta.lawResult)

    if (lawResults.length === 0) {
      lawMap[lawId] = "unknown"
      continue
    }
    if (lawResults.includes("fail")) {
      lawMap[lawId] = "fail"
      continue
    }
    if (lawResults.includes("unknown")) {
      lawMap[lawId] = "unknown"
      continue
    }
    lawMap[lawId] = "pass"
  }

  const summary = summarizeComplianceFromLawMap(lawMap)
  const derivedStage = mapDeterministicStageToNodeStatus(hasFailLaw ? "ready-for-review" : (hasUnknownLaw ? "in-progress" : "done"))
  const configuredStage = node.status || node.stage
  const stage = configuredStage ? normalizeNodeStatus(configuredStage) : derivedStage
  const inconsistentState = stage === "ready-for-sprint" && (hasFailLaw || hasUnknownLaw)

  return {
    ...node,
    type: "functionality",
    path,
    pathKey,
    children,
      meta: {
      requirementId,
      repositoryPaths: normalizeRepositoryPaths(node.repositoryPaths || node.repoPaths),
      stage,
      compliance: hasFailLaw ? "has-failures" : (hasUnknownLaw ? "has-unknowns" : "fully-compliant"),
      hasFailLaw,
      hasUnknownLaw,
      warning: hasFailLaw,
      inconsistentState,
      lawMap,
      lawPassedCount: summary.passedCount,
      lawTotalCount: LAW_IDS.length,
      acTotalCount,
      acPassedCount
    }
  }
}

function annotateModule(node, parentPath = []) {
  const path = [...parentPath, node.id]
  const pathKey = path.join(":")
  const requirementId = path[0] || ""
  const children = (node.children || []).map((child) => annotateFunctionality(child, path))
  const lawRecords = Object.fromEntries(
    LAW_IDS.map((lawId) => [lawId, normalizeModuleLawRecord(node, lawId)])
  )
  const lawMap = Object.fromEntries(LAW_IDS.map((lawId) => [lawId, lawRecords[lawId].status]))
  const summary = summarizeComplianceFromLawMap(lawMap)
  const acTotalCount = children.reduce((total, child) => total + child.meta.acTotalCount, 0)
  const acPassedCount = children.reduce((total, child) => total + child.meta.acPassedCount, 0)
  const isCompliant = isModuleCompliant(lawMap, LAW_IDS)
  const derivedStage = mapDeterministicStageToNodeStatus(inferStageFromLawSummary(summary))
  const configuredStage = node.status || node.stage
  const stage = configuredStage ? normalizeNodeStatus(configuredStage) : derivedStage
  const inconsistentState = stage === "ready-for-sprint" && !isCompliant
  const dependencyMapPath = String(node.dependencyMapPath || "").trim()
  const dependsOn = normalizeDependencyEntries(node.dependsOn)
  const impacts = normalizeDependencyEntries(node.impacts)

  return {
    ...node,
    type: "module",
    path,
    pathKey,
    children,
      meta: {
      requirementId,
      repositoryPaths: normalizeRepositoryPaths(node.repositoryPaths || node.repoPaths),
      stage,
      compliance: summary.compliance,
      hasFailLaw: summary.hasFailLaw,
      hasUnknownLaw: summary.hasUnknownLaw,
      warning: summary.hasFailLaw,
      inconsistentState,
      isCompliant,
      dependencyMapPath,
      dependsOn,
      impacts,
      lawMap,
      lawRecords,
      lawPassedCount: summary.passedCount,
      lawTotalCount: LAW_IDS.length,
      acTotalCount,
      acPassedCount
    }
  }
}

function rollupRequirementLawStatus(modules, lawId) {
  const statuses = modules.map((moduleNode) => moduleNode.meta.lawMap[lawId] || "unknown")
  if (statuses.every((status) => status === "pass")) {
    return "pass"
  }
  if (statuses.includes("fail")) {
    return "fail"
  }
  return "unknown"
}

function annotateRequirement(node, parentPath = []) {
  const path = [...parentPath, node.id]
  const pathKey = path.join(":")
  const requirementId = node.id
  const children = (node.children || []).map((child) => annotateModule(child, path))
  const lawMap = Object.fromEntries(
    LAW_IDS.map((lawId) => [lawId, rollupRequirementLawStatus(children, lawId)])
  )
  const summary = summarizeComplianceFromLawMap(lawMap)
  const lawRollup = Object.fromEntries(
    LAW_IDS.map((lawId) => [
      lawId,
      children.map((moduleNode) => ({
        moduleId: moduleNode.id,
        status: moduleNode.meta.lawMap[lawId] || "unknown"
      }))
    ])
  )
  const acTotalCount = children.reduce((total, child) => total + child.meta.acTotalCount, 0)
  const acPassedCount = children.reduce((total, child) => total + child.meta.acPassedCount, 0)
  const compliantModules = children.filter((moduleNode) => moduleNode.meta.isCompliant).length
  const modulesTotal = children.length
  const isComplete = isRequirementComplete(children, LAW_IDS)
  const derivedStage = mapDeterministicStageToNodeStatus(rollupRequirementStage(children, isComplete))
  const configuredStage = node.status || node.stage
  const stage = configuredStage ? normalizeNodeStatus(configuredStage) : derivedStage
  const inconsistentState = stage === "ready-for-sprint" && !isComplete

  return {
    ...node,
    type: "requirement",
    path,
    pathKey,
    children,
      meta: {
      requirementId,
      repositoryPaths: normalizeRepositoryPaths(node.repositoryPaths || node.repoPaths),
      stage,
      compliance: summary.compliance,
      hasFailLaw: summary.hasFailLaw,
      hasUnknownLaw: summary.hasUnknownLaw,
      warning: summary.hasFailLaw,
      inconsistentState,
      isComplete,
      moduleCompliantCount: compliantModules,
      moduleTotalCount: modulesTotal,
      lawMap,
      lawRollup,
      lawPassedCount: summary.passedCount,
      lawTotalCount: LAW_IDS.length,
      acTotalCount,
      acPassedCount
    }
  }
}

function annotateTreeNode(node, parentPath = []) {
  if (node.type === "module") {
    return annotateModule(node, parentPath)
  }
  if (node.type === "functionality") {
    return annotateFunctionality(node, parentPath)
  }
  if (node.type === "acceptance-criteria") {
    return annotateAcceptanceCriteria(node, parentPath)
  }
  return annotateRequirement(node, parentPath)
}

function buildTreeModel() {
  const tree = REQUIREMENTS_TREE.map((node) => annotateTreeNode(node))
  const nodeByPath = new Map()
  const nodeById = new Map()

  function walk(node) {
    nodeByPath.set(node.pathKey, node)
    if (!nodeById.has(node.id)) {
      nodeById.set(node.id, node)
    }
    node.children.forEach(walk)
  }

  tree.forEach(walk)
  return { tree, nodeByPath, nodeById }
}

function formatTimestamp(isoValue) {
  const date = new Date(isoValue)
  if (Number.isNaN(date.getTime())) {
    return "-"
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date)
}

function getNodeLabel(node) {
  return `${node.id} ${node.name}`.toLowerCase()
}

function nodeMatchesFilters(node, filters) {
  const searchTerm = filters.search.trim().toLowerCase()
  const searchMatch = !searchTerm || getNodeLabel(node).includes(searchTerm)
  const stageMatch = filters.stage === "all" || node.meta.stage === filters.stage
  const complianceMatch = filters.compliance === "all" || node.meta.compliance === filters.compliance
  return searchMatch && stageMatch && complianceMatch
}

function filterTree(nodes, filters) {
  return nodes
    .map((node) => {
      const children = filterTree(node.children, filters)
      if (nodeMatchesFilters(node, filters) || children.length > 0) {
        return {
          ...node,
          children
        }
      }
      return null
    })
    .filter(Boolean)
}

function getInitialSelectedPath(treeModel) {
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get("node")
  if (fromUrl && treeModel.nodeByPath.has(fromUrl)) {
    return fromUrl
  }
  const first = treeModel.tree[0]
  return first ? first.pathKey : null
}

function writeSelectedPathToUrl(pathKey) {
  const url = new URL(window.location.href)
  if (pathKey) {
    url.searchParams.set("node", pathKey)
  } else {
    url.searchParams.delete("node")
  }
  const next = `${url.pathname}${url.search}${url.hash}`
  window.history.replaceState(window.history.state ?? {}, "", next)
}

function collectAncestorPaths(pathKey) {
  const parts = String(pathKey || "").split(":").filter(Boolean)
  const paths = []
  for (let index = 0; index < parts.length - 1; index += 1) {
    paths.push(parts.slice(0, index + 1).join(":"))
  }
  return paths
}

function getComplianceText(node) {
  if (node.type === "requirement" || node.type === "module") {
    return `Laws ${node.meta.lawPassedCount}/${node.meta.lawTotalCount}`
  }
  if (node.type === "functionality") {
    return `AC ${node.meta.acTotalCount}`
  }
  if (node.type === "acceptance-criteria") {
    const outcome = node.lawId && node.meta.lawMap[node.lawId] ? node.meta.lawMap[node.lawId] : "unknown"
    return `Law ${String(outcome).toUpperCase()}`
  }
  return "-"
}

function getExplorerChildren(node) {
  if (!node || !Array.isArray(node.children)) {
    return []
  }
  if (node.type === "functionality") {
    return []
  }
  return node.children
}

function renderFolderOrganization(filteredTree) {
  const requirementNodes = Array.isArray(filteredTree) ? filteredTree : []
  if (requirementNodes.length === 0) {
    return '<p class="rr-req-folder-empty">No requirement folders match current filters.</p>'
  }

  return `
    <ul class="rr-req-folder-list">
      ${requirementNodes.map((requirementNode) => {
    const moduleItems = getExplorerChildren(requirementNode)
      .map((moduleNode) => `<span class="rr-req-folder-chip">${escapeHtml(moduleNode.meta.repositoryPaths.requirementsPath || "")}</span>`)
      .join("")
    return `
          <li class="rr-req-folder-item">
            <strong class="rr-req-folder-title">${escapeHtml(requirementNode.id)}</strong>
            <p class="rr-req-folder-path">${escapeHtml(requirementNode.meta.repositoryPaths.requirementsPath || "")}</p>
            ${moduleItems ? `<div class="rr-req-folder-chips">${moduleItems}</div>` : ""}
          </li>
        `
  }).join("")}
    </ul>
  `
}

function renderTreeNodes(nodes, state, level = 1) {
  return nodes
    .map((node) => {
      const explorerChildren = getExplorerChildren(node)
      const hasChildren = explorerChildren.length > 0
      const selected = node.pathKey === state.selectedPathKey
      const groupId = `rr-req-group-${node.pathKey.replaceAll(":", "-")}`
      const expanded = hasChildren && state.expandedPathKeys.has(node.pathKey)
      const complianceText = getComplianceText(node)
      const requirementPath = node.meta.repositoryPaths.requirementsPath || ""
      const warningMarker = node.meta.warning
        ? '<span class="rr-req-warning" title="Failing law detected in this branch">FAIL</span>'
        : ""
      const inconsistentMarker = node.meta.inconsistentState
        ? '<span class="rr-req-inconsistent" title="Status is ready-for-sprint but laws are FAIL/UNKNOWN">Inconsistent state</span>'
        : ""

      return `
        <li role="none" class="rr-req-tree-item">
          <div class="rr-req-tree-row">
            ${hasChildren
    ? `<button
                  type="button"
                  class="rr-req-expand"
                  data-action="toggle-expand"
                  data-path="${escapeHtml(node.pathKey)}"
                  aria-expanded="${expanded ? "true" : "false"}"
                  aria-controls="${groupId}"
                >
                  <span aria-hidden="true">${expanded ? "▾" : "▸"}</span>
                  <span class="rr-req-sr-only">${expanded ? "Collapse" : "Expand"} ${escapeHtml(node.name)}</span>
                </button>`
    : '<span class="rr-req-expand-spacer" aria-hidden="true"></span>'}
            <button
              type="button"
              class="rr-req-node-select"
              data-action="select-node"
              data-path="${escapeHtml(node.pathKey)}"
              data-has-children="${hasChildren ? "true" : "false"}"
              role="treeitem"
              aria-level="${level}"
              aria-selected="${selected ? "true" : "false"}"
              ${hasChildren ? `aria-expanded="${expanded ? "true" : "false"}" aria-controls="${groupId}"` : ""}
              data-selected="${selected ? "true" : "false"}"
            >
              <span class="rr-req-node-main">
                <span class="rr-req-node-name">${escapeHtml(node.name)}</span>
                <span class="rr-req-node-id">${escapeHtml(node.id)}</span>
                ${requirementPath ? `<span class="rr-req-node-path">${escapeHtml(requirementPath)}</span>` : ""}
              </span>
              <span class="rr-req-node-meta">
                <span class="rr-req-stage rr-req-stage--${statusClassFromValue(node.meta.stage)}">${toNodeStatusLabel(node.meta.stage)}</span>
                <span class="rr-req-compliance">${escapeHtml(complianceText)}</span>
                ${warningMarker}
                ${inconsistentMarker}
              </span>
            </button>
          </div>
          ${hasChildren
    ? `<ul id="${groupId}" role="group" ${expanded ? "" : "hidden"}>
                ${renderTreeNodes(explorerChildren, state, level + 1)}
              </ul>`
    : ""}
        </li>
      `
    })
    .join("")
}

function renderExplorerTree(filteredTree, state) {
  if (filteredTree.length === 0) {
    return `<p class="rr-req-tree-empty">No nodes match current filters.</p>`
  }

  return `
    <ul class="rr-req-tree" role="tree" aria-label="Requirements explorer">
      ${renderTreeNodes(filteredTree, state, 1)}
    </ul>
  `
}

function statusToAlertVariant(status) {
  if (status === "fail") {
    return "danger"
  }
  if (status === "unknown") {
    return "warning"
  }
  return "success"
}

function renderStatusBadge(status) {
  return `
    <rr-alert class="rr-req-law-badge" variant="${statusToAlertVariant(status)}" style="display:inline-block;width:auto;">
      ${escapeHtml(String(status).toUpperCase())}
    </rr-alert>
  `
}

function toLinkHref(path) {
  const sanitized = String(path || "").replace(/^\/+/, "")
  return sanitized ? `./${sanitized}` : ""
}

function renderPathLink(path) {
  if (!path || !String(path).trim()) {
    return '<span class="rr-req-missing">Missing</span>'
  }
  return `<a class="rr-req-artifact-link" href="${escapeHtml(toLinkHref(path))}" target="_blank" rel="noreferrer"><code>${escapeHtml(path)}</code></a>`
}

function renderMockupLink(link) {
  const value = String(link || "").trim()
  if (!value) {
    return ""
  }

  if (/^https?:\/\//i.test(value)) {
    return `<a class="rr-req-artifact-link" href="${escapeHtml(value)}" target="_blank" rel="noreferrer">${escapeHtml(value)}</a>`
  }

  return `<span>${escapeHtml(value)}</span>`
}

function normalizePrototypeLinks(entries) {
  if (!Array.isArray(entries)) {
    return []
  }

  return entries
    .map((entry) => {
      const name = String(entry?.name || "").trim()
      const version = String(entry?.version || "").trim()
      const path = String(entry?.path || "").trim()
      const linkedRequirementIds = Array.isArray(entry?.linkedRequirementIds)
        ? entry.linkedRequirementIds.map((value) => String(value || "").trim()).filter(Boolean)
        : []
      const linkedModuleIds = Array.isArray(entry?.linkedModuleIds)
        ? entry.linkedModuleIds.map((value) => String(value || "").trim()).filter(Boolean)
        : []

      if (!name || !version || !path) {
        return null
      }

      return {
        name,
        version,
        path,
        linkedRequirementIds,
        linkedModuleIds
      }
    })
    .filter(Boolean)
}

const NORMALIZED_PROTOTYPE_LINKS = normalizePrototypeLinks(PROTOTYPE_LINKS)
const NORMALIZED_SYNC_TIMELINE = REQUIREMENTS_SYNC_TIMELINE.map((entry, index) => normalizeSyncRun(entry, index))

function getLinkedPrototypesForRequirement(requirementNode) {
  const requirementId = requirementNode.id
  const moduleIds = new Set(requirementNode.children.map((moduleNode) => moduleNode.id))

  return NORMALIZED_PROTOTYPE_LINKS.filter((prototype) => {
    if (prototype.linkedRequirementIds.includes(requirementId)) {
      return true
    }
    return prototype.linkedModuleIds.some((moduleId) => moduleIds.has(moduleId))
  })
}

function getLinkedPrototypesForModule(moduleNode) {
  const requirementId = moduleNode.meta.requirementId
  return NORMALIZED_PROTOTYPE_LINKS.filter((prototype) => {
    if (prototype.linkedModuleIds.includes(moduleNode.id)) {
      return true
    }
    return requirementId ? prototype.linkedRequirementIds.includes(requirementId) : false
  })
}

function renderLinkedPrototypeItems(prototypes, { showValidatedBadge = false } = {}) {
  if (!Array.isArray(prototypes) || prototypes.length === 0) {
    return '<li class="rr-req-dependency-empty">No linked prototypes.</li>'
  }

  return prototypes
    .map((prototype, index) => {
      const previewId = `rr-prototype-preview-${index}`
      return `
        <li class="rr-req-prototype-item">
          <div class="rr-req-prototype-main">
            <strong>${escapeHtml(prototype.name)}</strong>
            <span class="rr-req-prototype-version">${escapeHtml(prototype.version)}</span>
            ${showValidatedBadge ? '<span class="rr-req-prototype-validated">Prototype validated</span>' : ""}
          </div>
          <div class="rr-req-prototype-actions">
            <a class="rr-req-prototype-open" href="${escapeHtml(prototype.path)}" target="_blank" rel="noreferrer">Open</a>
            <button
              type="button"
              class="rr-req-preview-button"
              data-action="open-prototype-preview"
              data-path="${escapeHtml(prototype.path)}"
              data-name="${escapeHtml(prototype.name)}"
              data-preview-id="${previewId}"
            >Preview</button>
          </div>
        </li>
      `
    })
    .join("")
}

function renderLinkedPrototypesSection({ prototypes, requirementComplete }) {
  return `
    <section class="rr-req-linked-prototypes">
      <h4>Linked Prototypes</h4>
      <ul class="rr-req-prototype-list">
        ${renderLinkedPrototypeItems(prototypes, { showValidatedBadge: requirementComplete })}
      </ul>
    </section>
  `
}

function resolveContextNodes(node, treeModel) {
  const requirementNode = node.type === "requirement"
    ? node
    : treeModel?.nodeById?.get(node.meta.requirementId || "")
  const moduleNode = node.type === "module"
    ? node
    : treeModel?.nodeById?.get(node.path?.[1] || "")

  return {
    requirementNode: requirementNode?.type === "requirement" ? requirementNode : null,
    moduleNode: moduleNode?.type === "module" ? moduleNode : null
  }
}

function resolveRepositoryPathItems(node, treeModel) {
  const { requirementNode, moduleNode } = resolveContextNodes(node, treeModel)
  const localPaths = normalizeRepositoryPaths(node.meta.repositoryPaths)
  const modulePaths = normalizeRepositoryPaths(moduleNode?.meta?.repositoryPaths)
  const requirementPaths = normalizeRepositoryPaths(requirementNode?.meta?.repositoryPaths)

  const prototypeCandidates = node.type === "requirement"
    ? getLinkedPrototypesForRequirement(node)
    : moduleNode
      ? getLinkedPrototypesForModule(moduleNode)
      : requirementNode
        ? getLinkedPrototypesForRequirement(requirementNode)
        : []

  return REPOSITORY_STRUCTURE_ITEMS.map((item) => {
    const value = localPaths[item.key] || modulePaths[item.key] || requirementPaths[item.key] || (item.key === "prototypesPath" ? (prototypeCandidates[0]?.path || "") : "")
    return {
      key: item.key,
      label: item.label,
      value
    }
  })
}

function renderRepositoryPathsCard(node, treeModel) {
  const items = resolveRepositoryPathItems(node, treeModel)
  const rows = items
    .map((item, index) => {
      if (!item.value) {
        return `
          <li class="rr-req-repo-item">
            <div class="rr-req-repo-meta">
              <strong>${escapeHtml(item.label)}</strong>
              <span class="rr-req-repo-missing">Not available yet (UNKNOWN evidence)</span>
            </div>
          </li>
        `
      }

      return `
        <li class="rr-req-repo-item">
          <div class="rr-req-repo-meta">
            <strong>${escapeHtml(item.label)}</strong>
            <code>${escapeHtml(item.value)}</code>
          </div>
          <button
            type="button"
            class="rr-req-copy-button"
            data-action="copy-repo-path"
            data-value="${escapeHtml(item.value)}"
            data-path-key="${escapeHtml(item.key)}-${index}"
          >Copy path</button>
        </li>
      `
    })
    .join("")

  return `
    <section class="rr-req-repository-paths">
      <h4>Repository Paths</h4>
      <ul class="rr-req-repo-list">${rows}</ul>
    </section>
  `
}

function getModuleName(moduleId, treeModel) {
  const node = treeModel?.nodeById?.get(moduleId)
  if (!node) {
    return "Unknown module"
  }
  return node.name || "Unknown module"
}

function renderDependencyEvidencePaths(paths) {
  if (!Array.isArray(paths) || paths.length === 0) {
    return ""
  }

  return `
    <div class="rr-req-dependency-evidence">
      <span>Evidence:</span>
      <ul>
        ${paths.map((path) => `<li>${renderPathLink(path)}</li>`).join("")}
      </ul>
    </div>
  `
}

function renderDependencyListItems(entries, treeModel) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return '<li class="rr-req-dependency-empty">No linked modules.</li>'
  }

  return entries
    .map((entry) => {
      const moduleName = getModuleName(entry.moduleId, treeModel)
      return `
        <li class="rr-req-dependency-item">
          <div class="rr-req-dependency-title">
            <strong>${escapeHtml(entry.moduleId)}</strong>
            <span>${escapeHtml(moduleName)}</span>
          </div>
          <p>${escapeHtml(entry.reason)}</p>
          ${renderDependencyEvidencePaths(entry.evidencePaths)}
        </li>
      `
    })
    .join("")
}

function renderDocsPaths(paths) {
  const list = Array.isArray(paths) ? paths.filter(Boolean) : []
  if (list.length === 0) {
    return '<span class="rr-req-missing">Missing</span>'
  }

  return `
    <ul class="rr-req-docs-list">
      ${list.map((path) => `<li>${renderPathLink(path)}</li>`).join("")}
    </ul>
  `
}

function renderLawTable(columns, rowMarkup, variantClass) {
  return `
    <section class="rr-req-law-table ${variantClass}">
      <div class="rr-req-law-table-head">
        ${columns.map((label) => `
          <div class="rr-req-law-head-cell">
            <rr-table-header-cell label="${escapeHtml(label)}" color="gray"></rr-table-header-cell>
          </div>
        `).join("")}
      </div>
      <div class="rr-req-law-table-body">
        ${rowMarkup}
      </div>
    </section>
  `
}

function renderInconsistentWarning(node) {
  if (!node.meta.inconsistentState) {
    return ""
  }

  return `
    <rr-alert variant="danger" class="rr-req-inconsistent-alert">
      <strong>Inconsistent state</strong>: status is <code>ready-for-sprint</code> but this ${escapeHtml(node.type)} still has FAIL/UNKNOWN acceptance laws.
      Deterministic completion rules would block <code>ready-for-sprint</code> until all required evidence is PASS.
    </rr-alert>
  `
}

function renderRequirementRollupRows(node) {
  return ACCEPTANCE_LAWS.map((law) => {
    const status = node.meta.lawMap[law.id] || "unknown"
    const sources = (node.meta.lawRollup[law.id] || [])
      .map((entry) => `<span class="rr-req-source-chip rr-req-source-chip--${statusClassFromValue(entry.status)}">${escapeHtml(entry.moduleId)}: ${escapeHtml(entry.status.toUpperCase())}</span>`)
      .join("")

    return `
      <div class="rr-req-law-row">
        <div class="rr-req-law-cell"><strong>${escapeHtml(law.id)}</strong></div>
        <div class="rr-req-law-cell">${escapeHtml(law.name)}</div>
        <div class="rr-req-law-cell">${renderStatusBadge(status)}</div>
        <div class="rr-req-law-cell"><div class="rr-req-source-chip-wrap">${sources}</div></div>
      </div>
    `
  }).join("")
}

function renderModuleLawEvidence(record, disclosureId) {
  return `
    <details class="rr-req-evidence-disclosure" id="${disclosureId}">
      <summary>Evidence</summary>
      <div class="rr-req-evidence-body">
        <dl class="rr-req-evidence-list">
          <dt>Coverage percent</dt>
          <dd>${record.coveragePercent !== null ? `${record.coveragePercent}%` : '<span class="rr-req-missing">Missing</span>'}</dd>

          <dt>Coverage artifact path</dt>
          <dd>${renderPathLink(record.evidence.coverageArtifactPath)}</dd>

          <dt>Test run logs path</dt>
          <dd>${renderPathLink(record.evidence.testRunLogsPath)}</dd>

          <dt>Docs changed paths (incl UML)</dt>
          <dd>${renderDocsPaths(record.evidence.docsChangedPaths)}</dd>

          <dt>Dependency map file path</dt>
          <dd>${renderPathLink(record.evidence.dependencyMapPath)}</dd>

          <dt>Regression report path</dt>
          <dd>${renderPathLink(record.evidence.regressionReportPath)}</dd>

          <dt>Manual suite reference path</dt>
          <dd>${renderPathLink(record.evidence.manualSuiteReferencePath)}</dd>
        </dl>
      </div>
    </details>
  `
}

function renderModuleLawRows(node) {
  return ACCEPTANCE_LAWS.map((law, index) => {
    const record = node.meta.lawRecords[law.id]
    const status = record?.status || "unknown"
    const showEvidence = status !== "pass"
    const disclosureId = `rr-req-evidence-${node.id}-${law.id}-${index}`

    return `
      <div class="rr-req-law-row">
        <div class="rr-req-law-cell"><strong>${escapeHtml(law.id)}</strong></div>
        <div class="rr-req-law-cell">${escapeHtml(law.name)}</div>
        <div class="rr-req-law-cell">${renderStatusBadge(status)}</div>
        <div class="rr-req-law-cell">
          ${showEvidence ? renderModuleLawEvidence(record, disclosureId) : '<span class="rr-req-evidence-empty">All required evidence present.</span>'}
        </div>
      </div>
    `
  }).join("")
}

function renderReadOnlyTextSection(node, title) {
  const sourcePath = node?.meta?.repositoryPaths?.requirementsPath || ""
  const text = String(
    node?.readOnlyText ||
    node?.description ||
    node?.summary ||
    ""
  ).trim()

  return `
    <article class="rr-req-detail-card rr-req-detail-card--narrative">
      <h4>${escapeHtml(title)}</h4>
      ${sourcePath ? `<p class="rr-req-source-path">Source: <code>${escapeHtml(sourcePath)}</code></p>` : ""}
      ${text
    ? `<p>${escapeHtml(text)}</p>`
    : '<p class="rr-req-empty-copy">Read-only repository text is not available yet.</p>'}
    </article>
  `
}

function getCriterionStatus(criterion) {
  return criterion?.lawId && criterion?.meta?.lawMap?.[criterion.lawId]
    ? criterion.meta.lawMap[criterion.lawId]
    : "unknown"
}

function collectFunctionalityMockups(functionalityNode) {
  const links = new Set()
  for (const criterion of functionalityNode.children || []) {
    const linkedMockups = Array.isArray(criterion.linkedMockups) && criterion.linkedMockups.length > 0
      ? criterion.linkedMockups
      : criterion.mockups || []
    for (const link of linkedMockups) {
      const value = String(link || "").trim()
      if (value) {
        links.add(value)
      }
    }
  }
  return Array.from(links)
}

function renderFunctionalityAcceptanceCriteria(functionalityNode) {
  const criteria = Array.isArray(functionalityNode.children) ? functionalityNode.children : []
  if (criteria.length === 0) {
    return '<li class="rr-req-dependency-empty">No acceptance criteria linked.</li>'
  }

  return criteria.map((criterion) => {
    const status = getCriterionStatus(criterion)
    return `
      <li class="rr-req-ac-item">
        <div class="rr-req-ac-row">
          <strong>${escapeHtml(criterion.id)}</strong>
          ${renderStatusBadge(status)}
        </div>
        <p>${escapeHtml(criterion.name)}</p>
        <span class="rr-req-ac-law">${escapeHtml(criterion.lawId || "-")}</span>
      </li>
    `
  }).join("")
}

function renderRequirementDetail(node, treeModel) {
  const linkedPrototypes = getLinkedPrototypesForRequirement(node)

  return `
    <section class="rr-req-detail-block">
      ${renderInconsistentWarning(node)}
      <h3>${escapeHtml(node.name)}</h3>
      <p class="rr-req-detail-id">${escapeHtml(node.id)} · Requirement</p>
      <rr-alert variant="info" class="rr-req-info-callout">
        RoundRush V2 reflects repository truth; requirements are not edited here.
      </rr-alert>
      <p>Requirement completion is deterministic: it is complete only when every module is compliant and all 7 Acceptance Laws resolve to PASS.</p>
      <div class="rr-req-kpi-grid">
        <article>
          <span>Status</span>
          <strong>${toNodeStatusLabel(node.meta.stage)}</strong>
        </article>
        <article>
          <span>Compliance</span>
          <strong>Laws ${node.meta.lawPassedCount}/${node.meta.lawTotalCount}</strong>
        </article>
        <article>
          <span>Compliant Modules</span>
          <strong>${node.meta.moduleCompliantCount}/${node.meta.moduleTotalCount}</strong>
        </article>
      </div>
      ${renderReadOnlyTextSection(node, "Requirement Description (Read-only)")}
      <h4>Acceptance Laws Rollup Across Modules</h4>
      ${renderLawTable(
    ["Law", "Acceptance Law", "Derived Status", "Module Rollup"],
    renderRequirementRollupRows(node),
    "rr-req-law-table--requirement"
  )}
      ${renderRepositoryPathsCard(node, treeModel)}
      ${renderLinkedPrototypesSection({
    prototypes: linkedPrototypes,
    requirementComplete: node.meta.isComplete
  })}
    </section>
  `
}

function renderModuleDetail(node, treeModel) {
  const linkedPrototypes = getLinkedPrototypesForModule(node)
  const requirementNode = treeModel?.nodeById?.get(node.meta.requirementId)
  const requirementComplete = Boolean(requirementNode?.type === "requirement" && requirementNode.meta?.isComplete)

  const functionalityRows = node.children
    .map((functionality) => {
      return `
        <tr>
          <td>${escapeHtml(functionality.id)}</td>
          <td>${escapeHtml(functionality.name)}</td>
          <td>${toNodeStatusLabel(functionality.meta.stage)}</td>
          <td>AC ${functionality.meta.acTotalCount}</td>
        </tr>
      `
    })
    .join("")

  return `
    <section class="rr-req-detail-block">
      ${renderInconsistentWarning(node)}
      <h3>${escapeHtml(node.name)}</h3>
      <p class="rr-req-detail-id">${escapeHtml(node.id)} · Module</p>
      <p>Module compliance is strict: all 7 Acceptance Laws must be PASS. Missing evidence forces UNKNOWN. Hard rules force FAIL when below 100% for Laws 2 and 6.</p>
      <div class="rr-req-kpi-grid">
        <article>
          <span>Status</span>
          <strong>${toNodeStatusLabel(node.meta.stage)}</strong>
        </article>
        <article>
          <span>Compliance</span>
          <strong>Laws ${node.meta.lawPassedCount}/${node.meta.lawTotalCount}</strong>
        </article>
        <article>
          <span>Functionalities</span>
          <strong>${node.children.length}</strong>
        </article>
      </div>
      ${renderReadOnlyTextSection(node, "Module Description (Read-only)")}

      <div class="rr-req-table-wrap">
        <table class="rr-req-detail-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Functionality</th>
              <th>Status</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>${functionalityRows}</tbody>
        </table>
      </div>

      <h4>Acceptance Laws (Module Source of Truth)</h4>
      ${renderLawTable(
    ["Law", "Acceptance Law", "Status", "Evidence (expand FAIL/UNKNOWN)"],
    renderModuleLawRows(node),
    "rr-req-law-table--module"
  )}
      ${renderRepositoryPathsCard(node, treeModel)}
      ${renderLinkedPrototypesSection({
    prototypes: linkedPrototypes,
    requirementComplete
  })}

      <section class="rr-req-dependency-section">
        <h4>Dependencies</h4>
        <div class="rr-req-dependency-map">
          <span>Dependency map path</span>
          ${node.meta.dependencyMapPath
    ? `
              <div class="rr-req-dependency-map-row">
                <code>${escapeHtml(node.meta.dependencyMapPath)}</code>
                <button
                  type="button"
                  class="rr-req-copy-button"
                  data-action="copy-dependency-map"
                  data-value="${escapeHtml(node.meta.dependencyMapPath)}"
                >Copy</button>
              </div>
            `
    : '<span class="rr-req-missing">Missing</span>'}
        </div>
        <div class="rr-req-dependency-grid">
          <article class="rr-req-dependency-card">
            <h5>Depends on (Upstream)</h5>
            <ol class="rr-req-dependency-list">
              ${renderDependencyListItems(node.meta.dependsOn, treeModel)}
            </ol>
          </article>
          <article class="rr-req-dependency-card">
            <h5>Impacts (Downstream)</h5>
            <ol class="rr-req-dependency-list">
              ${renderDependencyListItems(node.meta.impacts, treeModel)}
            </ol>
          </article>
        </div>
      </section>
    </section>
  `
}

function renderFunctionalityDetail(node, treeModel) {
  const userStoryText = String(node.userStory || "").trim()
  const functionalityMockups = collectFunctionalityMockups(node)
  const prototypeItems = functionalityMockups.length > 0
    ? functionalityMockups
      .map((link) => {
        const markup = renderMockupLink(link)
        return markup ? `<li>${markup}</li>` : ""
      })
      .join("")
    : '<li class="rr-req-dependency-empty">No linked prototype URLs.</li>'

  return `
    <section class="rr-req-detail-block">
      ${renderInconsistentWarning(node)}
      <h3>${escapeHtml(node.name)}</h3>
      <p class="rr-req-detail-id">${escapeHtml(node.id)} · Functionality</p>
      <div class="rr-req-kpi-grid">
        <article>
          <span>Status</span>
          <strong>${toNodeStatusLabel(node.meta.stage)}</strong>
        </article>
        <article>
          <span>Acceptance Criteria</span>
          <strong>${node.meta.acTotalCount}</strong>
        </article>
        <article>
          <span>Pass Count</span>
          <strong>${node.meta.acPassedCount}/${node.meta.acTotalCount}</strong>
        </article>
      </div>
      ${renderReadOnlyTextSection(node, "Functionality Description (Read-only)")}
      <article class="rr-req-detail-card rr-req-detail-card--narrative">
        <h4>User Story</h4>
        ${userStoryText
    ? `<p>${escapeHtml(userStoryText)}</p>`
    : '<p class="rr-req-empty-copy">User story text is not available yet.</p>'}
      </article>
      <article class="rr-req-detail-card">
        <h4>Acceptance Criteria</h4>
        <ul class="rr-req-ac-list">
          ${renderFunctionalityAcceptanceCriteria(node)}
        </ul>
      </article>
      <article class="rr-req-detail-card">
        <h4>Linked Prototypes</h4>
        <ul class="rr-req-mockup-list">${prototypeItems}</ul>
      </article>
      ${renderRepositoryPathsCard(node, treeModel)}
    </section>
  `
}

function renderAcceptanceCriteriaDetail(node, treeModel) {
  const law = ACCEPTANCE_LAWS.find((entry) => entry.id === node.lawId)
  const result = node.lawId && node.meta.lawMap[node.lawId] ? node.meta.lawMap[node.lawId] : "unknown"
  const linkedMockups = Array.isArray(node.linkedMockups) && node.linkedMockups.length > 0
    ? node.linkedMockups
    : node.mockups || []
  const mockupItems = linkedMockups
    .map((mockupId) => {
      const markup = renderMockupLink(mockupId)
      return markup ? `<li>${markup}</li>` : ""
    })
    .join("")

  return `
    <section class="rr-req-detail-block">
      ${renderInconsistentWarning(node)}
      <h3>${escapeHtml(node.name)}</h3>
      <p class="rr-req-detail-id">${escapeHtml(node.id)} · Acceptance Criterion</p>
      <div class="rr-req-kpi-grid">
        <article>
          <span>Status</span>
          <strong>${toNodeStatusLabel(node.meta.stage)}</strong>
        </article>
        <article>
          <span>Law</span>
          <strong>${escapeHtml(node.lawId || "-")}</strong>
        </article>
        <article>
          <span>Result</span>
          <strong>${renderStatusBadge(result)}</strong>
        </article>
      </div>
      <article class="rr-req-detail-card">
        <h4>Acceptance Law</h4>
        <p><strong>${escapeHtml(law?.name || "Unknown law")}</strong></p>
      </article>
      <article class="rr-req-detail-card">
        <h4>Linked Mockups</h4>
        ${mockupItems ? `<ul class="rr-req-mockup-list">${mockupItems}</ul>` : "<p>No linked mockups.</p>"}
      </article>
      ${renderRepositoryPathsCard(node, treeModel)}
    </section>
  `
}

function renderDetails(node, treeModel) {
  if (!node) {
    return `<p class="rr-req-empty-state">Select a requirement/module to view details.</p>`
  }
  if (node.type === "requirement") {
    return renderRequirementDetail(node, treeModel)
  }
  if (node.type === "module") {
    return renderModuleDetail(node, treeModel)
  }
  if (node.type === "functionality") {
    return renderFunctionalityDetail(node, treeModel)
  }
  if (node.type === "acceptance-criteria") {
    return renderAcceptanceCriteriaDetail(node, treeModel)
  }
  return `<p class="rr-req-empty-state">Select a requirement/module to view details.</p>`
}

function renderTimelinePaths(paths, emptyMessage) {
  if (!Array.isArray(paths) || paths.length === 0) {
    return `<p class="rr-req-timeline-empty-paths">${escapeHtml(emptyMessage)}</p>`
  }

  return `
    <ul class="rr-req-timeline-path-list">
      ${paths.map((path) => `<li>${renderPathLink(path)}</li>`).join("")}
    </ul>
  `
}

function renderTimelineFailingLaws(failingLaws) {
  if (!Array.isArray(failingLaws) || failingLaws.length === 0) {
    return '<p class="rr-req-timeline-empty-paths">No failing laws in this sync run.</p>'
  }

  return `
    <div class="rr-req-source-chip-wrap">
      ${failingLaws
    .map((lawId) => `<span class="rr-req-source-chip rr-req-source-chip--fail">${escapeHtml(lawId)}</span>`)
    .join("")}
    </div>
  `
}

function renderTimelineScope(scope) {
  const scopeType = scope?.type === "requirement" ? "Requirement" : "Module"
  const scopeId = scope?.scopeId ? escapeHtml(scope.scopeId) : "N/A"
  return `${scopeType} · ${scopeId}`
}

function getFilteredTimelineRuns({ timelineResult, timelineStage }) {
  return NORMALIZED_SYNC_TIMELINE.filter((run) => {
    const resultMatch = timelineResult === "all" || run.result === timelineResult
    const stageMatch = timelineStage === "all" || run.stage === timelineStage
    return resultMatch && stageMatch
  })
}

function renderTimelineItems(runs) {
  if (!Array.isArray(runs) || runs.length === 0) {
    return '<li class="rr-req-timeline-item rr-req-timeline-item--empty">No sync runs match current filters.</li>'
  }

  return runs.map((entry) => {
    return `
      <li class="rr-req-timeline-item">
        <details class="rr-req-timeline-disclosure">
          <summary class="rr-req-timeline-summary">
            <div class="rr-req-timeline-head">
              <strong>${formatTimestamp(entry.timestamp)}</strong>
              <span class="rr-sync-pill rr-sync-pill--${statusClassFromValue(entry.result)}">${toSyncRunResultLabel(entry.result)}</span>
            </div>
            <div class="rr-req-timeline-meta">
              <span class="rr-req-stage rr-req-stage--${statusClassFromValue(entry.stage)}">${toSyncStageLabel(entry.stage)}</span>
              <span class="rr-req-compliance">${escapeHtml(renderTimelineScope(entry.scope))}</span>
              <span class="rr-req-compliance">${escapeHtml(entry.actor)}</span>
            </div>
            <p>${escapeHtml(entry.summary)}</p>
            <code>${escapeHtml(entry.id)}</code>
          </summary>
          <div class="rr-req-timeline-detail-sections">
            <section>
              <h4>Changed paths</h4>
              ${renderTimelinePaths(entry.changedPaths, "No changed paths captured.")}
            </section>
            <section>
              <h4>Failing laws</h4>
              ${renderTimelineFailingLaws(entry.failingLaws)}
            </section>
            <section>
              <h4>Artifact/report paths</h4>
              ${renderTimelinePaths(entry.artifactPaths, "No artifact/report paths captured.")}
            </section>
          </div>
        </details>
      </li>
    `
  }).join("")
}

function renderTimelineStageOptions() {
  return `
    <option value="all">All</option>
    <option value="in-progress">In progress</option>
    <option value="ready-for-review">Ready for review</option>
    <option value="done">Done</option>
  `
}

function renderTimelineResultOptions() {
  return `
    <option value="all">All</option>
    <option value="success">Success</option>
    <option value="failure">Failure</option>
  `
}

function renderStatusOptions() {
  return `
    <option value="all">All</option>
    <option value="to-do">To do</option>
    <option value="design">Design</option>
    <option value="design-review">Design review</option>
    <option value="approved">Approved</option>
    <option value="ready-for-sprint">Ready for sprint</option>
  `
}

function renderComplianceOptions() {
  return `
    <option value="all">All</option>
    <option value="fully-compliant">Fully compliant</option>
    <option value="has-failures">Has failures</option>
    <option value="has-unknowns">Has unknowns</option>
  `
}

export async function renderRequirementsModuleFlow() {
  return `
    <main class="rr-main rr-req-page" id="rr-requirements-module">
      <header class="rr-req-header">
        <div>
          <h1>Requirements</h1>
          <p>Read-only reflection of repository truth</p>
        </div>
        <div class="rr-req-header-right">
          <div class="rr-req-last-sync">
            <span>Last Sync</span>
            <strong id="rr-req-last-sync-value">${formatTimestamp(REQUIREMENTS_SYNC.lastSyncIso)}</strong>
          </div>
          <span
            id="rr-req-sync-pill"
            class="rr-sync-pill rr-sync-pill--${statusClassFromValue(REQUIREMENTS_SYNC.status)}"
          >${toSyncLabel(REQUIREMENTS_SYNC.status)}</span>
          <button type="button" class="rr-req-timeline-button" id="rr-req-open-timeline">Sync timeline</button>
        </div>
      </header>

      <section class="rr-req-shell">
        <aside class="rr-req-pane rr-req-pane--explorer" aria-label="Explorer">
          <header class="rr-req-pane-head">
            <h2>Explorer</h2>
          </header>
          <div class="rr-req-controls">
            <label class="rr-req-control">
              <span>Search</span>
              <input id="rr-req-search" type="search" placeholder="Search requirements, modules, functionalities..." />
            </label>
            <div class="rr-req-filter-grid">
              <label class="rr-req-control">
                <span>Status</span>
                <select id="rr-req-stage-filter">${renderStatusOptions()}</select>
              </label>
              <label class="rr-req-control">
                <span>Compliance</span>
                <select id="rr-req-compliance-filter">${renderComplianceOptions()}</select>
              </label>
            </div>
          </div>
          <section class="rr-req-folder-map" aria-label="Requirement folder organization">
            <h3>Requirement Folder Organization</h3>
            <div id="rr-req-folder-map-region"></div>
          </section>
          <div id="rr-req-tree-region" class="rr-req-tree-region"></div>
        </aside>

        <section class="rr-req-pane rr-req-pane--details" aria-label="Details">
          <header class="rr-req-pane-head">
            <h2>Details</h2>
          </header>
          <div id="rr-req-details-region" class="rr-req-details-region">
            <p class="rr-req-empty-state">Select a requirement/module to view details.</p>
          </div>
        </section>
      </section>

      <dialog id="rr-req-timeline-dialog" class="rr-req-timeline-dialog" aria-label="Sync timeline">
        <article class="rr-req-dialog-card">
          <header class="rr-req-dialog-head">
            <h3>Sync timeline</h3>
            <button type="button" class="rr-req-dialog-close" id="rr-req-close-timeline" aria-label="Close sync timeline">Close</button>
          </header>
          <p>Repository-managed requirements are synced after each AI coding iteration and reflected here as read-only timeline events.</p>
          <div class="rr-req-timeline-filters">
            <label class="rr-req-control">
              <span>Result</span>
              <select id="rr-req-timeline-result-filter">${renderTimelineResultOptions()}</select>
            </label>
            <label class="rr-req-control">
              <span>Stage</span>
              <select id="rr-req-timeline-stage-filter">${renderTimelineStageOptions()}</select>
            </label>
          </div>
          <ul class="rr-req-timeline-list" id="rr-req-timeline-list" aria-live="polite">
            ${renderTimelineItems(getFilteredTimelineRuns({ timelineResult: "all", timelineStage: "all" }))}
          </ul>
        </article>
      </dialog>

      <dialog id="rr-req-preview-dialog" class="rr-req-preview-dialog" aria-label="Prototype preview">
        <article class="rr-req-preview-card">
          <header class="rr-req-dialog-head">
            <h3 id="rr-req-preview-title">Prototype preview</h3>
            <button type="button" class="rr-req-dialog-close" id="rr-req-close-preview" aria-label="Close prototype preview">Close</button>
          </header>
          <div class="rr-req-preview-frame-wrap">
            <iframe
              id="rr-req-preview-iframe"
              title="Linked prototype preview"
              loading="lazy"
              referrerpolicy="no-referrer"
            ></iframe>
          </div>
        </article>
      </dialog>
    </main>
  `
}

export function mountRequirementsModuleFlow() {
  if (unmountRequirementsModuleFlow) {
    unmountRequirementsModuleFlow()
    unmountRequirementsModuleFlow = null
  }

  const root = document.querySelector("#rr-requirements-module")
  if (!root) {
    return
  }

  const folderMapRegion = root.querySelector("#rr-req-folder-map-region")
  const treeRegion = root.querySelector("#rr-req-tree-region")
  const detailsRegion = root.querySelector("#rr-req-details-region")
  const searchInput = root.querySelector("#rr-req-search")
  const stageFilter = root.querySelector("#rr-req-stage-filter")
  const complianceFilter = root.querySelector("#rr-req-compliance-filter")
  const openTimelineButton = root.querySelector("#rr-req-open-timeline")
  const closeTimelineButton = root.querySelector("#rr-req-close-timeline")
  const timelineDialog = root.querySelector("#rr-req-timeline-dialog")
  const timelineResultFilter = root.querySelector("#rr-req-timeline-result-filter")
  const timelineStageFilter = root.querySelector("#rr-req-timeline-stage-filter")
  const timelineList = root.querySelector("#rr-req-timeline-list")
  const previewDialog = root.querySelector("#rr-req-preview-dialog")
  const previewCloseButton = root.querySelector("#rr-req-close-preview")
  const previewTitle = root.querySelector("#rr-req-preview-title")
  const previewIframe = root.querySelector("#rr-req-preview-iframe")

  const treeModel = buildTreeModel()
  let previewTrigger = null
  let timelineTrigger = null
  const initialSelectedPath = getInitialSelectedPath(treeModel)
  const initialExpanded = new Set()
  collectAncestorPaths(initialSelectedPath).forEach((entry) => initialExpanded.add(entry))

  const state = {
    search: "",
    stage: "all",
    compliance: "all",
    timelineResult: "all",
    timelineStage: "all",
    selectedPathKey: initialSelectedPath,
    expandedPathKeys: initialExpanded
  }

  function getFilteredTree() {
    return filterTree(treeModel.tree, {
      search: state.search,
      stage: NODE_STATUS_VALUES.includes(state.stage) ? state.stage : "all",
      compliance: COMPLIANCE_VALUES.includes(state.compliance) ? state.compliance : "all"
    })
  }

  function renderState() {
    const filteredTree = getFilteredTree()
    folderMapRegion.innerHTML = renderFolderOrganization(filteredTree)
    treeRegion.innerHTML = renderExplorerTree(filteredTree, state)
    detailsRegion.innerHTML = renderDetails(treeModel.nodeByPath.get(state.selectedPathKey) || null, treeModel)
  }

  function renderTimelineState() {
    const filteredRuns = getFilteredTimelineRuns({
      timelineResult: state.timelineResult,
      timelineStage: state.timelineStage
    })
    timelineList.innerHTML = renderTimelineItems(filteredRuns)
  }

  function getTimelineFocusableElements() {
    const selectors = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ]

    return Array.from(timelineDialog.querySelectorAll(selectors.join(",")))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) {
          return false
        }
        return !element.hasAttribute("hidden")
      })
  }

  function trapTimelineFocus(event) {
    if (event.key !== "Tab") {
      return
    }

    const focusableElements = getTimelineFocusableElements()
    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement

    if (event.shiftKey) {
      if (activeElement === first || !timelineDialog.contains(activeElement)) {
        event.preventDefault()
        last.focus()
      }
      return
    }

    if (activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function handleTreeClick(event) {
    const target = event.target.closest("[data-action]")
    if (!target) {
      return
    }

    const action = target.getAttribute("data-action")
    const pathKey = target.getAttribute("data-path")
    if (!pathKey) {
      return
    }

    if (action === "toggle-expand") {
      if (state.expandedPathKeys.has(pathKey)) {
        state.expandedPathKeys.delete(pathKey)
      } else {
        state.expandedPathKeys.add(pathKey)
      }
      renderState()
      return
    }

    if (action === "select-node") {
      const hasChildren = target.getAttribute("data-has-children") === "true"
      const isSameNode = state.selectedPathKey === pathKey
      state.selectedPathKey = pathKey
      if (hasChildren) {
        if (isSameNode) {
          if (state.expandedPathKeys.has(pathKey)) {
            state.expandedPathKeys.delete(pathKey)
          } else {
            state.expandedPathKeys.add(pathKey)
          }
        } else {
          state.expandedPathKeys.add(pathKey)
        }
      }
      collectAncestorPaths(pathKey).forEach((entry) => state.expandedPathKeys.add(entry))
      writeSelectedPathToUrl(pathKey)
      renderState()
    }
  }

  function handleSearchInput(event) {
    state.search = event.target.value || ""
    renderState()
  }

  function handleStageFilter(event) {
    state.stage = event.target.value || "all"
    renderState()
  }

  function handleComplianceFilter(event) {
    state.compliance = event.target.value || "all"
    renderState()
  }

  function handleTimelineResultFilter(event) {
    const candidate = String(event.target.value || "").toLowerCase().trim()
    state.timelineResult = candidate === "all" || SYNC_RUN_RESULT_VALUES.includes(candidate) ? candidate : "all"
    renderTimelineState()
  }

  function handleTimelineStageFilter(event) {
    const candidate = String(event.target.value || "").toLowerCase().trim()
    state.timelineStage = candidate === "all" || SYNC_STAGE_VALUES.includes(candidate) ? candidate : "all"
    renderTimelineState()
  }

  async function handleDetailsClick(event) {
    const copyButton = event.target.closest('[data-action="copy-dependency-map"], [data-action="copy-repo-path"]')
    if (copyButton) {
      const value = copyButton.getAttribute("data-value") || ""
      if (!value) {
        return
      }

      const originalLabel = copyButton.textContent || "Copy"
      try {
        await navigator.clipboard.writeText(value)
        copyButton.textContent = "Copied"
        window.setTimeout(() => {
          copyButton.textContent = originalLabel
        }, 1200)
      } catch {
        copyButton.textContent = "Failed"
        window.setTimeout(() => {
          copyButton.textContent = originalLabel
        }, 1200)
      }
      return
    }

    const previewButton = event.target.closest('[data-action="open-prototype-preview"]')
    if (!previewButton) {
      return
    }

    const path = previewButton.getAttribute("data-path") || ""
    const name = previewButton.getAttribute("data-name") || "Prototype preview"
    if (!path) {
      return
    }

    previewTrigger = previewButton
    previewTitle.textContent = `${name} (${path})`
    previewIframe.setAttribute("src", path)
    if (typeof previewDialog.showModal === "function") {
      previewDialog.showModal()
      return
    }
    previewDialog.setAttribute("open", "")
  }

  function closePreview() {
    if (typeof previewDialog.close === "function") {
      previewDialog.close()
    } else {
      previewDialog.removeAttribute("open")
    }
    previewIframe.removeAttribute("src")
    if (previewTrigger) {
      previewTrigger.focus()
      previewTrigger = null
    }
  }

  function handlePreviewBackdropClick(event) {
    if (event.target === previewDialog) {
      closePreview()
    }
  }

  function handlePreviewCancel(event) {
    event.preventDefault()
    closePreview()
  }

  function openTimeline(event) {
    timelineTrigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : openTimelineButton
    renderTimelineState()
    if (typeof timelineDialog.showModal === "function") {
      timelineDialog.showModal()
    } else {
      timelineDialog.setAttribute("open", "")
    }

    window.setTimeout(() => {
      timelineResultFilter.focus()
    }, 0)
  }

  function closeTimeline() {
    if (typeof timelineDialog.close === "function") {
      timelineDialog.close()
    } else {
      timelineDialog.removeAttribute("open")
    }

    if (timelineTrigger) {
      timelineTrigger.focus()
      timelineTrigger = null
    }
  }

  function handleTimelineBackdropClick(event) {
    if (event.target === timelineDialog) {
      closeTimeline()
    }
  }

  function handleTimelineCancel(event) {
    event.preventDefault()
    closeTimeline()
  }

  treeRegion.addEventListener("click", handleTreeClick)
  searchInput.addEventListener("input", handleSearchInput)
  stageFilter.addEventListener("change", handleStageFilter)
  complianceFilter.addEventListener("change", handleComplianceFilter)
  timelineResultFilter.addEventListener("change", handleTimelineResultFilter)
  timelineStageFilter.addEventListener("change", handleTimelineStageFilter)
  detailsRegion.addEventListener("click", handleDetailsClick)
  openTimelineButton.addEventListener("click", openTimeline)
  closeTimelineButton.addEventListener("click", closeTimeline)
  timelineDialog.addEventListener("click", handleTimelineBackdropClick)
  timelineDialog.addEventListener("cancel", handleTimelineCancel)
  timelineDialog.addEventListener("keydown", trapTimelineFocus)
  previewCloseButton.addEventListener("click", closePreview)
  previewDialog.addEventListener("click", handlePreviewBackdropClick)
  previewDialog.addEventListener("cancel", handlePreviewCancel)

  writeSelectedPathToUrl(state.selectedPathKey)
  renderState()
  renderTimelineState()

  unmountRequirementsModuleFlow = () => {
    treeRegion.removeEventListener("click", handleTreeClick)
    searchInput.removeEventListener("input", handleSearchInput)
    stageFilter.removeEventListener("change", handleStageFilter)
    complianceFilter.removeEventListener("change", handleComplianceFilter)
    timelineResultFilter.removeEventListener("change", handleTimelineResultFilter)
    timelineStageFilter.removeEventListener("change", handleTimelineStageFilter)
    detailsRegion.removeEventListener("click", handleDetailsClick)
    openTimelineButton.removeEventListener("click", openTimeline)
    closeTimelineButton.removeEventListener("click", closeTimeline)
    timelineDialog.removeEventListener("click", handleTimelineBackdropClick)
    timelineDialog.removeEventListener("cancel", handleTimelineCancel)
    timelineDialog.removeEventListener("keydown", trapTimelineFocus)
    previewCloseButton.removeEventListener("click", closePreview)
    previewDialog.removeEventListener("click", handlePreviewBackdropClick)
    previewDialog.removeEventListener("cancel", handlePreviewCancel)
  }

  return unmountRequirementsModuleFlow
}
