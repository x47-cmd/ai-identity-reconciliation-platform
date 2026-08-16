/* =========================================================
   AI IDENTITY RECONCILIATION PLATFORM
   SHARED DEMO DATA

   Purpose:
   - Single frontend source of truth
   - Prevent inconsistent metrics between pages
   - Keep backend-confirmed demo values separate
     from illustrative UI-only data

   IMPORTANT:
   - Synthetic demonstration data only
   - Master Reference remains read-only
   - Human approval is required before correction
   ========================================================= */


/* =========================================================
   GLOBAL PLATFORM METRICS
   ========================================================= */

export const PLATFORM_METRICS = {
  masterIdentities: 3000,

  biometricRecords: 1000,

  rawFindings: 103,

  aggregatedCases: 53,

  corroboratingFindingsCollapsed: 50,

  multiFindingCases: 17,

  wronglyAffectedCases: 9,

  unresolvedIdentityCases: 0,

  priority: {
    immediate: 9,
    high: 23,
    medium: 21,
  },

  evaluation: {
    expectedIssues: 53,

    detectedIssues: 53,

    missedIssues: 0,

    recall: 100,

    rawPrecision: 72.82,

    f1: 84.27,

    diagnosticPrecision: 100,

    unexplainedFalsePositives: 0,

    protectiveDetectionRecall: 100,

    protectivePriorityAccuracy: 100,
  },
};


/* =========================================================
   TECHNICAL CASE TYPE BREAKDOWN

   This reflects the actual aggregated case taxonomy.

   Total:
   15 + 11 + 8 + 6 + 6 + 4 + 3 = 53
   ========================================================= */

export const CASE_TYPE_BREAKDOWN = [
  {
    type: "DATA_MISMATCH",
    label: "Data Mismatch",
    count: 15,
  },

  {
    type: "WRONG_MAPPING",
    label: "Wrong Mapping",
    count: 11,
  },

  {
    type: "COMPLEX_IDENTITY_CONFLICT",
    label: "Complex Identity Conflict",
    count: 8,
  },

  {
    type: "DUPLICATE_IDENTITY",
    label: "Duplicate Identity",
    count: 6,
  },

  {
    type: "HARM_IMPACT",
    label: "Harm Impact",
    count: 6,
  },

  {
    type: "ORPHAN_RECORD",
    label: "Orphan Record",
    count: 4,
  },

  {
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    label: "Critical Harm Identity Conflict",
    count: 3,
  },
];


/* =========================================================
   EXECUTIVE CASE GROUPING

   Executive reporting combines:
   HARM_IMPACT = 6
   CRITICAL_HARM_IDENTITY_CONFLICT = 3

   Total protective / wrong-person impact cases = 9
   ========================================================= */

export const EXECUTIVE_CASE_BREAKDOWN = [
  {
    type: "DATA_MISMATCH",
    label: "Data Mismatch",
    count: 15,
  },

  {
    type: "WRONG_MAPPING",
    label: "Wrong Mapping",
    count: 11,
  },

  {
    type: "PROTECTIVE_HARM",
    label: "Wrong-Person / Harm Impact",
    count: 9,
  },

  {
    type: "COMPLEX_IDENTITY_CONFLICT",
    label: "Complex Identity Conflict",
    count: 8,
  },

  {
    type: "DUPLICATE_IDENTITY",
    label: "Duplicate Identity",
    count: 6,
  },

  {
    type: "ORPHAN_RECORD",
    label: "Orphan Record",
    count: 4,
  },
];


/* =========================================================
   PRIMARY VERIFIED E2E DEMO CASE

   Main full lifecycle demonstration:

   AI Investigation
   → Monitoring Officer Approval
   → Supervising Manager Approval
   → Controlled Execution
   → Post-Correction Verification
   → VERIFIED_CLOSED
   ========================================================= */

export const VERIFIED_DEMO_CASE = {
  id: "CASE-2026-00001",

  caseType: "HARM_IMPACT",

  title: "Potential Wrong-Person Harm",

  priority: "IMMEDIATE",

  wronglyAffected: true,

  biometricId: "BIO-000166",

  currentIdentity: "REF-002711",

  proposedIdentity: "REF-001009",

  canonicalIdentity: "REF-001009",

  aiConfidence: 99.99,

  risk: 94.99,

  harm: 97.5,

  protectivePriority: 98.0,

  officer: {
    role: "Monitoring Officer",

    actor:
      "Demo Monitoring Officer",

    decision:
      "APPROVED",
  },

  manager: {
    role:
      "Supervising Manager",

    actor:
      "Demo Supervising Manager",

    decision:
      "APPROVED",
  },

  officerDecision:
    "APPROVED",

  managerDecision:
    "APPROVED",

  execution: {
    status:
      "COMPLETED",

    action:
      "REASSIGN_BIOMETRIC_IDENTITY",

    targetSystem:
      "BIOMETRIC_SYSTEM",

    targetRecord:
      "BIO-000166",

    field:
      "linked_master_id",

    before:
      "REF-002711",

    after:
      "REF-001009",
  },

  verification: {
    status:
      "PASSED",

    score:
      100,

    /*
     Backend-confirmed raw similarity score.
     Keep this value in raw 0..1 form.
    */
    biometricMatch:
      0.999903,

    /*
     Convenience value for UI percentage display.
     0.999903 × 100 = 99.9903%
    */
    biometricMatchPercent:
      99.9903,

    identityMappingValid:
      true,

    originalConflictResolved:
      true,

    secondaryConflict:
      false,

    rollbackRequired:
      false,
  },

  finalStatus:
    "VERIFIED_CLOSED",

  auditTrailEventCount:
    5,

  masterModified:
    false,

  originalBiometricDatasetModified:
    false,

  demoResult:
    "SUCCESS",
};


/* =========================================================
   COMPLEX IDENTITY DEMO CASE

   IMPORTANT:
   BIO-000795 belongs to CASE-2026-00014.

   Previous frontend versions incorrectly used:
   CASE-2026-00010

   CASE-2026-00010 must not be used for BIO-000795.
   ========================================================= */

export const COMPLEX_DEMO_CASE = {
  id:
    "CASE-2026-00014",

  caseType:
    "COMPLEX_IDENTITY_CONFLICT",

  title:
    "Complex Identity Conflict",

  priority:
    "HIGH",

  wronglyAffected:
    false,

  affectedBiometrics: [
    "BIO-000277",
    "BIO-000795",
  ],

  primaryBiometricId:
    "BIO-000795",

  currentIdentity:
    "REF-001183",

  proposedIdentity:
    "REF-002343",

  canonicalIdentity:
    "REF-002343",

  currentMasterIdentities: [
    "REF-001183",
    "REF-002343",
  ],

  aiConfidence:
    99.99,

  risk:
    90,

  harm:
    60,

  protectivePriority:
    85,

  supportCount:
    3,

  findingCount:
    5,

  unresolvedIdentity:
    false,

  finalStatus:
    "AI_INVESTIGATED",
};


/* =========================================================
   VERIFIED DEMO LIFECYCLE
   ========================================================= */

export const VERIFIED_DEMO_LIFECYCLE = [
  {
    order: 1,

    stage:
      "AI_INVESTIGATION",

    label:
      "AI Investigation",

    status:
      "COMPLETED",
  },

  {
    order: 2,

    stage:
      "OFFICER_APPROVAL",

    label:
      "Officer Approval",

    status:
      "APPROVED",
  },

  {
    order: 3,

    stage:
      "MANAGER_APPROVAL",

    label:
      "Manager Approval",

    status:
      "APPROVED",
  },

  {
    order: 4,

    stage:
      "CONTROLLED_CORRECTION",

    label:
      "Controlled Correction",

    status:
      "COMPLETED",
  },

  {
    order: 5,

    stage:
      "POST_CORRECTION_VERIFICATION",

    label:
      "Post-Correction Verification",

    status:
      "VERIFIED_CLOSED",
  },
];


/* =========================================================
   GOVERNANCE CONSTANTS
   ========================================================= */

export const GOVERNANCE = {
  masterReferenceAccess:
    "READ_ONLY",

  correctionTarget:
    "BIOMETRIC_SYSTEM",

  aiCanApprove:
    false,

  aiCanModifyMaster:
    false,

  officerApprovalRequired:
    true,

  managerApprovalRequired:
    true,

  twoHumanApprovalRequired:
    true,

  postCorrectionVerificationRequired:
    true,

  verificationFailureBlocksClosure:
    true,

  sourceDataProtectionRequired:
    true,
};


/* =========================================================
   PLATFORM WORKFLOW
   ========================================================= */

export const PLATFORM_WORKFLOW = [
  "New / Changed Data",

  "Automatic Monitoring",

  "AI Detection",

  "AI Investigation",

  "Identity Resolution",

  "Risk & Harm Analysis",

  "Protective Priority",

  "Proposed Correction",

  "Monitoring Officer Review",

  "Manager Approval",

  "Controlled Execution",

  "Post-Correction Verification",

  "Audit Report",

  "Case Closed",
];


/* =========================================================
   AGENT ARCHITECTURE
   ========================================================= */

export const AI_AGENTS = [
  {
    id:
      "monitoring",

    name:
      "Monitoring Agent",

    role:
      "Detects new or changed operational records.",
  },

  {
    id:
      "reconciliation",

    name:
      "Reconciliation Agent",

    role:
      "Compares biometric records against the Master Reference.",
  },

  {
    id:
      "biometric-correlation",

    name:
      "Biometric Correlation Agent",

    role:
      "Evaluates synthetic biometric-vector similarity and relationships.",
  },

  {
    id:
      "identity-resolution",

    name:
      "Identity Resolution Agent",

    role:
      "Determines the strongest canonical identity candidate.",
  },

  {
    id:
      "anomaly-detection",

    name:
      "Anomaly Detection Agent",

    role:
      "Detects mismatches, duplicates, overlaps and other identity-integrity anomalies.",
  },

  {
    id:
      "investigation",

    name:
      "Investigation Agent",

    role:
      "Combines evidence and prepares structured investigation results.",
  },

  {
    id:
      "remediation",

    name:
      "Remediation Agent",

    role:
      "Prepares proposed Before / After corrections without independently authorizing them.",
  },

  {
    id:
      "approval-workflow",

    name:
      "Approval Workflow Agent",

    role:
      "Coordinates Monitoring Officer and Supervising Manager human approvals.",
  },

  {
    id:
      "execution",

    name:
      "Execution Agent",

    role:
      "Executes only fully authorized corrections against permitted runtime targets.",
  },

  {
    id:
      "verification",

    name:
      "Verification Agent",

    role:
      "Revalidates identity integrity after correction and determines whether closure conditions are satisfied.",
  },

  {
    id:
      "audit",

    name:
      "Audit Agent",

    role:
      "Maintains case lifecycle traceability and reporting data.",
  },

  {
    id:
      "intelligence-reporting",

    name:
      "Intelligence & Reporting Agent",

    role:
      "Produces operational and management intelligence.",
  },
];


/* =========================================================
   SYNTHETIC DATA MODEL
   ========================================================= */

export const SYNTHETIC_DATA_MODEL = {
  demonstrationOnly:
    true,

  biometricEvidence:
    "GENERIC_SYNTHETIC_VECTOR",

  modalitySpecificScoresAvailable:
    false,

  realPersonalData:
    false,

  realBiometricData:
    false,
};


/* =========================================================
   HELPER VALUES
   ========================================================= */

export const VERIFIED_CASE_ID =
  VERIFIED_DEMO_CASE.id;


export const COMPLEX_CASE_ID =
  COMPLEX_DEMO_CASE.id;


export const PROTECTIVE_CASE_COUNT =
  PLATFORM_METRICS.wronglyAffectedCases;


export const TOTAL_CASE_COUNT =
  PLATFORM_METRICS.aggregatedCases;


export const TOTAL_FINDING_COUNT =
  PLATFORM_METRICS.rawFindings;