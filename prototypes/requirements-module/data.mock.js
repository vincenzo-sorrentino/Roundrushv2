export const ACCEPTANCE_LAWS = [
  {
    id: "L1",
    name: "Production code implemented"
  },
  {
    id: "L2",
    name: "Unit + integration tests pass AND 100% coverage (hard rule: <100% is FAIL, no rounding)"
  },
  {
    id: "L3",
    name: "Documentation updated (requirements if necessary, tests, code comments, component documentation, UML diagrams incl. architecture & use cases)"
  },
  {
    id: "L4",
    name: "End-to-end tests implemented and passed"
  },
  {
    id: "L5",
    name: "Dependency map between modules updated"
  },
  {
    id: "L6",
    name: "AI-generated regression tests based on dependency analysis pass 100% (hard rule)"
  },
  {
    id: "L7",
    name: "Manual test suites completed (incl smoke tests)"
  }
]

const FIGMA_BASE_URL = "https://www.figma.com/design/01Dsb5eQkVmnsXWF6v4MJ5/Roundrush-Design-System"

function toLower(value) {
  return String(value || "").toLowerCase()
}

function createMockups(nodeId) {
  return [`${FIGMA_BASE_URL}?node-id=${nodeId}&m=dev`]
}

function createRepoPaths({
  requirementId,
  moduleId = "",
  functionalityId = "",
  criterionId = "",
  dependencyMapPath = "/dependency-map/global.json"
}) {
  const req = toLower(requirementId)
  const mod = toLower(moduleId)
  const base = mod || req

  // Flat structure: requirements/epics/<EPIC>-<domain>/<MODULE>-<slug>.md
  // For mock data with generic IDs (e.g. EP001, EP001-001) the paths are
  // illustrative — they follow the same flat convention used in the real repo.
  let requirementsPath = `requirements/epics/${req}/${req}.md`
  if (moduleId) {
    requirementsPath = `requirements/epics/${req}/${mod}.md`
  }

  return {
    requirementsPath,
    testsUnitPath: `/tests/unit/${base}/`,
    testsIntegrationPath: `/tests/integration/${base}/`,
    testsE2EPath: `/tests/e2e/${base}/`,
    docsPath: `/docs/requirements/${req}/${base}/`,
    docsUmlPath: `/docs/uml/${req}/${base}/`,
    projectGovernancePath: `/project-governance/reviews/${base}/`,
    dependencyMapPath,
    prototypesPath: "/prototypes"
  }
}

function withRepoPaths(paths) {
  return {
    repositoryPaths: paths,
    repoPaths: paths
  }
}

function createEvidence({
  requirementId,
  moduleId,
  coveragePercent = 100,
  regressionPassPercent = 100,
  coverageArtifactPath,
  testRunLogsPath,
  docsChangedPaths,
  dependencyMapPath = "/dependency-map/global.json",
  regressionReportPath,
  manualSuiteReferencePath
}) {
  const req = toLower(requirementId)
  const mod = toLower(moduleId)
  return {
    coveragePercent,
    regressionPassPercent,
    coverageArtifactPath: coverageArtifactPath || `/artifacts/${mod}/coverage/coverage-summary.json`,
    testRunLogsPath: testRunLogsPath || `/artifacts/${mod}/tests/run.log`,
    docsChangedPaths: docsChangedPaths || [
      `/docs/requirements/${req}/${mod}/spec-update.md`,
      `/docs/uml/${req}/${mod}/architecture.puml`,
      `/docs/uml/${req}/${mod}/use-cases.puml`
    ],
    dependencyMapPath,
    regressionReportPath: regressionReportPath || `/artifacts/${mod}/regression/ai-regression-report.json`,
    manualSuiteReferencePath: manualSuiteReferencePath || `/project-governance/manual-suites/${mod}/smoke-suite.md`
  }
}

function createPassLawSet(requirementId, moduleId) {
  const laws = {}
  for (const law of ACCEPTANCE_LAWS) {
    laws[law.id] = {
      status: "pass",
      evidence: createEvidence({ requirementId, moduleId })
    }
  }
  return laws
}

function createCriterion({
  id,
  name,
  lawId,
  result,
  stage,
  mockupNodeId,
  requirementId,
  moduleId,
  functionalityId
}) {
  const paths = createRepoPaths({
    requirementId,
    moduleId,
    functionalityId,
    criterionId: id
  })
  const linkedMockups = createMockups(mockupNodeId)

  return {
    id,
    type: "acceptance-criteria",
    name,
    lawId,
    result,
    stage,
    linkedMockups,
    mockups: linkedMockups,
    ...withRepoPaths(paths)
  }
}

const EP001_001_LAWS = createPassLawSet("EP001", "EP001-001")
const EP001_002_LAWS = createPassLawSet("EP001", "EP001-002")

const EP002_001_LAWS = createPassLawSet("EP002", "EP002-001")
EP002_001_LAWS.L2.evidence.coveragePercent = 99.8
EP002_001_LAWS.L5.evidence.dependencyMapPath = ""

const EP002_002_LAWS = createPassLawSet("EP002", "EP002-002")

const EP003_001_LAWS = createPassLawSet("EP003", "EP003-001")
EP003_001_LAWS.L3.status = "unknown"
EP003_001_LAWS.L3.evidence.docsChangedPaths = []
EP003_001_LAWS.L4.evidence.testRunLogsPath = ""

const EP003_002_LAWS = createPassLawSet("EP003", "EP003-002")

export const REQUIREMENTS_SYNC = {
  lastSyncIso: "2026-03-02T18:40:00Z",
  status: "synced"
}

export const REQUIREMENTS_SYNC_TIMELINE = [
  {
    id: "sync-3414",
    timestamp: "2026-03-02T18:40:00Z",
    stage: "done",
    result: "success",
    actor: "AI Copilot (local)",
    summary: "EP001 deterministic rollup confirmed all modules fully compliant.",
    changedPaths: [
      "/requirements/ep001/spec.md",
      "/tests/unit/ep001-001/",
      "/tests/integration/ep001-002/",
      "/dependency-map/global.json",
      "/artifacts/ep001/reports/sync-3414.json"
    ],
    failingLaws: [],
    artifactPaths: [
      "/artifacts/ep001/reports/sync-3414.json",
      "/artifacts/ep001/coverage/coverage-summary.json"
    ],
    scope: {
      type: "requirement",
      scopeId: "EP001"
    }
  },
  {
    id: "sync-3413",
    timestamp: "2026-03-02T18:19:00Z",
    stage: "in-progress",
    result: "failure",
    actor: "AI Copilot (local)",
    summary: "EP002 compliance blocked: L2 failed (<100% coverage) and L5 dependency map evidence missing.",
    changedPaths: [
      "/requirements/ep002/ep002-001.md",
      "/tests/unit/ep002-001/",
      "/tests/integration/ep002-001/",
      "/artifacts/ep002-001/coverage/coverage-summary.json",
      "/artifacts/ep002-001/reports/sync-3413.json"
    ],
    failingLaws: ["L2", "L5"],
    artifactPaths: [
      "/artifacts/ep002-001/reports/sync-3413.json",
      "/artifacts/ep002-001/tests/run.log"
    ],
    scope: {
      type: "module",
      scopeId: "EP002-001"
    }
  },
  {
    id: "sync-3412",
    timestamp: "2026-03-02T17:58:00Z",
    stage: "ready-for-review",
    result: "success",
    actor: "AI Copilot (local)",
    summary: "EP003 moved to review queue with UNKNOWN evidence waiting for artifact publication.",
    changedPaths: [
      "/requirements/ep003/ep003-001.md",
      "/docs/uml/ep003/ep003-001/architecture.puml",
      "/artifacts/ep003-001/reports/sync-3412.json"
    ],
    failingLaws: [],
    artifactPaths: ["/artifacts/ep003-001/reports/sync-3412.json"],
    scope: {
      type: "requirement",
      scopeId: "EP003"
    }
  }
]

export const PROTOTYPE_LINKS = [
  {
    name: "Requirements Module",
    version: "v2.6.0",
    path: "/prototypes/requirements-module/index.html",
    linkedRequirementIds: ["EP001", "EP002", "EP003"],
    linkedModuleIds: ["EP001-001", "EP001-002", "EP002-001", "EP003-001"]
  },
  {
    name: "Execution Summary",
    version: "v2.2.1",
    path: "/prototypes/execution-summary/index.html",
    linkedRequirementIds: ["EP001", "EP002"],
    linkedModuleIds: ["EP001-001", "EP002-001"]
  },
  {
    name: "Compliance Dashboard",
    version: "v1.1.0",
    path: "/prototypes/compliance-dashboard/index.html",
    linkedRequirementIds: ["EP002", "EP003"],
    linkedModuleIds: ["EP002-001", "EP003-001"]
  }
]

export const REQUIREMENTS_TREE = [
  {
    id: "EP001",
    type: "requirement",
    name: "Repository Reflection Core",
    status: "ready-for-sprint",
    readOnlyText: "RoundRush reflects repository truth by publishing deterministic requirement snapshots after each coding iteration.",
    ...withRepoPaths(createRepoPaths({ requirementId: "EP001" })),
    children: [
      {
        id: "EP001-001",
        type: "module",
        name: "Sync Reflection Layer",
        status: "approved",
        readOnlyText: "Parses requirement manifests and normalizes artifacts for read-only UI consumption.",
        ...withRepoPaths(createRepoPaths({ requirementId: "EP001", moduleId: "EP001-001" })),
        dependencyMapPath: "/dependency-map/global.json",
        dependsOn: [
          {
            moduleId: "EP001-002",
            reason: "Uses acceptance rollup snapshots produced by the completion gate module.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [
          {
            moduleId: "EP002-001",
            reason: "Feeds normalized evidence states into EP002 deterministic checks.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        laws: EP001_001_LAWS,
        children: [
          {
            id: "EP001-001-F01",
            type: "functionality",
            name: "Reflect requirement sync payloads",
            status: "approved",
            userStory: "As a product lead, I want repository changes reflected as immutable snapshots so I can inspect requirement status without editing data.",
            readOnlyText: "This functionality reads sync payloads and derives deterministic requirement snapshots.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP001",
              moduleId: "EP001-001",
              functionalityId: "EP001-001-F01"
            })),
            children: [
              createCriterion({
                id: "AC-EP001-001-001",
                name: "Sync payload mirrors repository requirement data",
                lawId: "L1",
                result: "pass",
                stage: "done",
                mockupNodeId: "821-6261",
                requirementId: "EP001",
                moduleId: "EP001-001",
                functionalityId: "EP001-001-F01"
              }),
              createCriterion({
                id: "AC-EP001-001-002",
                name: "Sync payload validation tests are green at 100% coverage",
                lawId: "L2",
                result: "pass",
                stage: "done",
                mockupNodeId: "821-7099",
                requirementId: "EP001",
                moduleId: "EP001-001",
                functionalityId: "EP001-001-F01"
              })
            ]
          }
        ]
      },
      {
        id: "EP001-002",
        type: "module",
        name: "Completion Gate Evaluator",
        status: "ready-for-sprint",
        readOnlyText: "Evaluates requirement completion by enforcing all seven acceptance laws across modules.",
        ...withRepoPaths(createRepoPaths({ requirementId: "EP001", moduleId: "EP001-002" })),
        dependencyMapPath: "/dependency-map/global.json",
        dependsOn: [
          {
            moduleId: "EP001-001",
            reason: "Reads normalized reflection snapshots to compute deterministic completion.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [
          {
            moduleId: "EP003-001",
            reason: "Provides completion-state API consumed by review dashboards.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        laws: EP001_002_LAWS,
        children: [
          {
            id: "EP001-002-F01",
            type: "functionality",
            name: "Evaluate requirement completion deterministically",
            status: "ready-for-sprint",
            userStory: "As an engineering manager, I want strict completion gates so a requirement is only complete when every module is compliant.",
            readOnlyText: "Runs deterministic completion checks and publishes requirement-level compliance.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP001",
              moduleId: "EP001-002",
              functionalityId: "EP001-002-F01"
            })),
            children: [
              createCriterion({
                id: "AC-EP001-002-001",
                name: "Requirement completes only when all module laws are PASS",
                lawId: "L6",
                result: "pass",
                stage: "done",
                mockupNodeId: "1106-66757",
                requirementId: "EP001",
                moduleId: "EP001-002",
                functionalityId: "EP001-002-F01"
              }),
              createCriterion({
                id: "AC-EP001-002-002",
                name: "Manual smoke evidence is included in final completion run",
                lawId: "L7",
                result: "pass",
                stage: "done",
                mockupNodeId: "1106-66560",
                requirementId: "EP001",
                moduleId: "EP001-002",
                functionalityId: "EP001-002-F01"
              })
            ]
          }
        ]
      }
    ]
  },
  {
    id: "EP002",
    type: "requirement",
    name: "Compliance Guardrails",
    status: "design",
    readOnlyText: "Defines hard enforcement for coverage, dependency evidence, and deterministic compliance checks.",
    ...withRepoPaths(createRepoPaths({ requirementId: "EP002" })),
    children: [
      {
        id: "EP002-001",
        type: "module",
        name: "Coverage and Dependency Enforcement",
        status: "design",
        readOnlyText: "Validates non-negotiable guardrails: 100% coverage and dependency-map evidence presence.",
        ...withRepoPaths(createRepoPaths({
          requirementId: "EP002",
          moduleId: "EP002-001",
          dependencyMapPath: ""
        })),
        dependencyMapPath: "",
        dependsOn: [
          {
            moduleId: "EP001-001",
            reason: "Consumes reflected module evidence as enforcement input.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [
          {
            moduleId: "EP002-002",
            reason: "Publishes law outcomes for orchestration workflows.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        laws: EP002_001_LAWS,
        children: [
          {
            id: "EP002-001-F01",
            type: "functionality",
            name: "Validate hard coverage constraints",
            status: "design",
            userStory: "As a reviewer, I want failures raised for sub-100 coverage and missing dependency evidence so compliance remains deterministic.",
            readOnlyText: "Inspects coverage and dependency artifacts on each sync run.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP002",
              moduleId: "EP002-001",
              functionalityId: "EP002-001-F01",
              dependencyMapPath: ""
            })),
            children: [
              createCriterion({
                id: "AC-EP002-001-001",
                name: "Coverage is exactly 100% for deterministic pass",
                lawId: "L2",
                result: "fail",
                stage: "in-progress",
                mockupNodeId: "6373-31764",
                requirementId: "EP002",
                moduleId: "EP002-001",
                functionalityId: "EP002-001-F01"
              }),
              createCriterion({
                id: "AC-EP002-001-002",
                name: "Dependency map evidence is attached for each sync iteration",
                lawId: "L5",
                result: "unknown",
                stage: "in-progress",
                mockupNodeId: "6373-33560",
                requirementId: "EP002",
                moduleId: "EP002-001",
                functionalityId: "EP002-001-F01"
              })
            ]
          }
        ]
      },
      {
        id: "EP002-002",
        type: "module",
        name: "Compliance Orchestration API",
        status: "design-review",
        readOnlyText: "Aggregates module law outcomes into API payloads consumed by read-only dashboards.",
        ...withRepoPaths(createRepoPaths({ requirementId: "EP002", moduleId: "EP002-002" })),
        dependencyMapPath: "/dependency-map/global.json",
        dependsOn: [
          {
            moduleId: "EP002-001",
            reason: "Reads enforcement outcomes and exposes status snapshots.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [],
        laws: EP002_002_LAWS,
        children: [
          {
            id: "EP002-002-F01",
            type: "functionality",
            name: "Expose law outcome summaries to consumers",
            status: "design-review",
            userStory: "As a stakeholder, I want concise law summaries to understand compliance without opening raw artifacts.",
            readOnlyText: "Transforms law records into concise summary payloads.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP002",
              moduleId: "EP002-002",
              functionalityId: "EP002-002-F01"
            })),
            children: [
              createCriterion({
                id: "AC-EP002-002-001",
                name: "Status endpoint returns per-law evidence summary",
                lawId: "L1",
                result: "pass",
                stage: "ready-for-review",
                mockupNodeId: "6353-98804",
                requirementId: "EP002",
                moduleId: "EP002-002",
                functionalityId: "EP002-002-F01"
              })
            ]
          }
        ]
      }
    ]
  },
  {
    id: "EP003",
    type: "requirement",
    name: "Review Queue Readiness",
    status: "design-review",
    readOnlyText: "Prepares reviewer-facing evidence bundles while preserving read-only repository alignment.",
    ...withRepoPaths(createRepoPaths({ requirementId: "EP003" })),
    children: [
      {
        id: "EP003-001",
        type: "module",
        name: "Evidence Publishing Pipeline",
        status: "design-review",
        readOnlyText: "Publishes artifacts and documentation evidence needed for requirement review.",
        ...withRepoPaths(createRepoPaths({ requirementId: "EP003", moduleId: "EP003-001" })),
        dependencyMapPath: "/dependency-map/global.json",
        dependsOn: [
          {
            moduleId: "EP001-002",
            reason: "Uses completion-state payloads for review routing.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [
          {
            moduleId: "EP003-002",
            reason: "Supplies evidence packets consumed by review dashboard adapters.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        laws: EP003_001_LAWS,
        children: [
          {
            id: "EP003-001-F01",
            type: "functionality",
            name: "Publish evidence package for reviewer validation",
            status: "design-review",
            userStory: "As a reviewer, I want every law artifact in one package so I can validate completion quickly.",
            readOnlyText: "Builds reviewer bundles containing law evidence, docs updates, and test artifacts.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP003",
              moduleId: "EP003-001",
              functionalityId: "EP003-001-F01"
            })),
            children: [
              createCriterion({
                id: "AC-EP003-001-001",
                name: "Documentation evidence includes architecture and use-case UML files",
                lawId: "L3",
                result: "unknown",
                stage: "ready-for-review",
                mockupNodeId: "18-0",
                requirementId: "EP003",
                moduleId: "EP003-001",
                functionalityId: "EP003-001-F01"
              }),
              createCriterion({
                id: "AC-EP003-001-002",
                name: "E2E artifact is published in review bundle",
                lawId: "L4",
                result: "unknown",
                stage: "ready-for-review",
                mockupNodeId: "214-0",
                requirementId: "EP003",
                moduleId: "EP003-001",
                functionalityId: "EP003-001-F01"
              })
            ]
          }
        ]
      },
      {
        id: "EP003-002",
        type: "module",
        name: "Reviewer Dashboard Adapter",
        status: "approved",
        readOnlyText: "Adapts evidence bundles into review dashboard cards and status summaries.",
        ...withRepoPaths(createRepoPaths({ requirementId: "EP003", moduleId: "EP003-002" })),
        dependencyMapPath: "/dependency-map/global.json",
        dependsOn: [
          {
            moduleId: "EP003-001",
            reason: "Reads published evidence bundles for reviewer UI composition.",
            evidencePaths: ["/dependency-map/global.json"]
          }
        ],
        impacts: [],
        laws: EP003_002_LAWS,
        children: [
          {
            id: "EP003-002-F01",
            type: "functionality",
            name: "Render evidence cards in review dashboard",
            status: "approved",
            userStory: "As a PM, I want evidence cards linked to repository paths so review sessions stay deterministic and auditable.",
            readOnlyText: "Renders review card UI from deterministic evidence payloads.",
            ...withRepoPaths(createRepoPaths({
              requirementId: "EP003",
              moduleId: "EP003-002",
              functionalityId: "EP003-002-F01"
            })),
            children: [
              createCriterion({
                id: "AC-EP003-002-001",
                name: "Dashboard adapter consumes module law status feed",
                lawId: "L1",
                result: "pass",
                stage: "done",
                mockupNodeId: "1102-4631",
                requirementId: "EP003",
                moduleId: "EP003-002",
                functionalityId: "EP003-002-F01"
              })
            ]
          }
        ]
      }
    ]
  }
]
