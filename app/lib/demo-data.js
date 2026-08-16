/* =========================================================
   AI IDENTITY RECONCILIATION PLATFORM
   SHARED DEMO DATA

   Synthetic demonstration data only.

   Principles:
   - Clear human-readable identity names in the UI
   - Technical IDs remain available for audit/reference
   - Master Reference remains read-only
   - AI detects, analyzes and recommends
   - Humans authorize sensitive corrections
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
   SYNTHETIC DEMO IDENTITIES

   Human-readable names are shown first in the interface.
   Reference IDs remain available for technical traceability.
   ========================================================= */

export const DEMO_IDENTITIES = {
  REF_001009: {
    referenceId: "REF-001009",

    name: {
      en: "Salem Mohammed Al Kaabi",
      ar: "سالم محمد الكعبي",
    },
  },

  REF_002711: {
    referenceId: "REF-002711",

    name: {
      en: "Khalid Abdullah Al Mansoori",
      ar: "خالد عبدالله المنصوري",
    },
  },

  REF_002343: {
    referenceId: "REF-002343",

    name: {
      en: "Ali Saeed Al Dhaheri",
      ar: "علي سعيد الظاهري",
    },
  },

  REF_001183: {
    referenceId: "REF-001183",

    name: {
      en: "Ahmed Rashid Al Nuaimi",
      ar: "أحمد راشد النعيمي",
    },
  },
};


/* =========================================================
   CASE TYPE BREAKDOWN

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
    label: "Incorrect Identity Link",
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
    label: "Possible Wrong-Person Impact",
    count: 6,
  },

  {
    type: "ORPHAN_RECORD",
    label: "Missing Identity Link",
    count: 4,
  },

  {
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    label: "Critical Identity Conflict",
    count: 3,
  },
];


/* =========================================================
   EXECUTIVE CASE GROUPING
   ========================================================= */

export const EXECUTIVE_CASE_BREAKDOWN = [
  {
    type: "DATA_MISMATCH",
    label: "Data Mismatch",
    count: 15,
  },

  {
    type: "WRONG_MAPPING",
    label: "Incorrect Identity Link",
    count: 11,
  },

  {
    type: "PROTECTIVE_HARM",
    label: "Possible Wrong-Person Impact",
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
    label: "Missing Identity Link",
    count: 4,
  },
];


/* =========================================================
   PRIMARY VERIFIED DEMO CASE

   AI Analysis
   → Officer Approval
   → Manager Approval
   → Controlled Correction
   → Verification
   → Case Closed
   ========================================================= */

export const VERIFIED_DEMO_CASE = {
  id: "CASE-2026-00001",

  person: {
    en: "Salem Mohammed Al Kaabi",
    ar: "سالم محمد الكعبي",
  },

  caseType: "HARM_IMPACT",

  title: "Possible Wrong-Person Impact",

  priority: "IMMEDIATE",

  wronglyAffected: true,

  biometricId: "BIO-000166",

  currentIdentity: "REF-002711",

  currentIdentityName: {
    en: "Khalid Abdullah Al Mansoori",
    ar: "خالد عبدالله المنصوري",
  },

  proposedIdentity: "REF-001009",

  proposedIdentityName: {
    en: "Salem Mohammed Al Kaabi",
    ar: "سالم محمد الكعبي",
  },

  canonicalIdentity: "REF-001009",

  canonicalIdentityName: {
    en: "Salem Mohammed Al Kaabi",
    ar: "سالم محمد الكعبي",
  },

  aiConfidence: 99.99,

  /*
   * Technical internal risk values.
   * These remain available for AI analysis and audit,
   * but the main employee interface uses simple labels.
   */
  risk: 94.99,

  harm: 97.5,

  protectivePriority: 98.0,

  aiSummary: {
    en:
      "AI detected that the biometric record was linked to the wrong identity and identified Salem Mohammed Al Kaabi as the strongest verified identity candidate.",

    ar:
      "اكتشف الذكاء الاصطناعي أن السجل البيومتري مرتبط بهوية غير صحيحة، وحدد سالم محمد الكعبي كأقوى مرشح للهوية الصحيحة.",
  },

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

    beforeName: {
      en: "Khalid Abdullah Al Mansoori",
      ar: "خالد عبدالله المنصوري",
    },

    after:
      "REF-001009",

    afterName: {
      en: "Salem Mohammed Al Kaabi",
      ar: "سالم محمد الكعبي",
    },
  },

  verification: {
    status:
      "PASSED",

    score:
      100,

    /*
     * Backend-confirmed synthetic similarity score.
     * Raw value remains in 0..1 format.
     */
    biometricMatch:
      0.999903,

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

   BIO-000795 belongs to CASE-2026-00014.
   ========================================================= */

export const COMPLEX_DEMO_CASE = {
  id:
    "CASE-2026-00014",

  person: {
    en: "Ali Saeed Al Dhaheri",
    ar: "علي سعيد الظاهري",
  },

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

  currentIdentityName: {
    en: "Ahmed Rashid Al Nuaimi",
    ar: "أحمد راشد النعيمي",
  },

  proposedIdentity:
    "REF-002343",

  proposedIdentityName: {
    en: "Ali Saeed Al Dhaheri",
    ar: "علي سعيد الظاهري",
  },

  canonicalIdentity:
    "REF-002343",

  canonicalIdentityName: {
    en: "Ali Saeed Al Dhaheri",
    ar: "علي سعيد الظاهري",
  },

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

  aiSummary: {
    en:
      "AI combined five related findings and identified Ali Saeed Al Dhaheri as the strongest identity candidate.",

    ar:
      "جمع الذكاء الاصطناعي خمس نتائج مترابطة وحدد علي سعيد الظاهري كأقوى مرشح للهوية.",
  },

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

    userLabel: {
      en: "AI Analysis",
      ar: "تحليل الذكاء الاصطناعي",
    },

    status:
      "COMPLETED",
  },

  {
    order: 2,

    stage:
      "OFFICER_APPROVAL",

    label:
      "Officer Approval",

    userLabel: {
      en: "Officer Review",
      ar: "مراجعة الضابط",
    },

    status:
      "APPROVED",
  },

  {
    order: 3,

    stage:
      "MANAGER_APPROVAL",

    label:
      "Manager Approval",

    userLabel: {
      en: "Manager Approval",
      ar: "اعتماد المدير",
    },

    status:
      "APPROVED",
  },

  {
    order: 4,

    stage:
      "CONTROLLED_CORRECTION",

    label:
      "Controlled Correction",

    userLabel: {
      en: "Correction",
      ar: "التصحيح",
    },

    status:
      "COMPLETED",
  },

  {
    order: 5,

    stage:
      "POST_CORRECTION_VERIFICATION",

    label:
      "Post-Correction Verification",

    userLabel: {
      en: "Final Verification",
      ar: "التحقق النهائي",
    },

    status:
      "VERIFIED_CLOSED",
  },
];


/* =========================================================
   GOVERNANCE
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

   Technical workflow remains available for architecture.
   User-facing pages use simplified wording.
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
   SIMPLE USER-FACING WORKFLOW
   ========================================================= */

export const SIMPLE_WORKFLOW = [
  {
    key: "AI_ANALYSIS",

    en: "AI Analysis",

    ar: "تحليل الذكاء الاصطناعي",
  },

  {
    key: "OFFICER_REVIEW",

    en: "Officer Review",

    ar: "مراجعة الضابط",
  },

  {
    key: "MANAGER_APPROVAL",

    en: "Manager Approval",

    ar: "اعتماد المدير",
  },

  {
    key: "CORRECTION",

    en: "Correction",

    ar: "التصحيح",
  },

  {
    key: "VERIFICATION",

    en: "Verification",

    ar: "التحقق",
  },

  {
    key: "CLOSED",

    en: "Case Closed",

    ar: "إغلاق الحالة",
  },
];


/* =========================================================
   AI ARCHITECTURE

   These components remain part of the technical architecture
   and can be used in investigation / architecture views.

   They are intentionally NOT required as main navigation
   concepts for normal employees.
   ========================================================= */

export const AI_AGENTS = [
  {
    id:
      "monitoring",

    name:
      "Monitoring Agent",

    simpleName:
      "Continuous Monitoring",

    role:
      "Detects new or changed operational records.",
  },

  {
    id:
      "reconciliation",

    name:
      "Reconciliation Agent",

    simpleName:
      "Identity Comparison",

    role:
      "Compares biometric records against the Master Reference.",
  },

  {
    id:
      "biometric-correlation",

    name:
      "Biometric Correlation Agent",

    simpleName:
      "Biometric Correlation",

    role:
      "Evaluates synthetic biometric-vector similarity and relationships.",
  },

  {
    id:
      "identity-resolution",

    name:
      "Identity Resolution Agent",

    simpleName:
      "Identity Resolution",

    role:
      "Determines the strongest canonical identity candidate.",
  },

  {
    id:
      "anomaly-detection",

    name:
      "Anomaly Detection Agent",

    simpleName:
      "Anomaly Detection",

    role:
      "Detects mismatches, duplicates, overlaps and identity-integrity anomalies.",
  },

  {
    id:
      "investigation",

    name:
      "Investigation Agent",

    simpleName:
      "AI Investigation",

    role:
      "Combines evidence and prepares structured investigation results.",
  },

  {
    id:
      "remediation",

    name:
      "Remediation Agent",

    simpleName:
      "Correction Recommendation",

    role:
      "Prepares proposed Before / After corrections without independently authorizing them.",
  },

  {
    id:
      "approval-workflow",

    name:
      "Approval Workflow Agent",

    simpleName:
      "Approval Workflow",

    role:
      "Coordinates Monitoring Officer and Supervising Manager human approvals.",
  },

  {
    id:
      "execution",

    name:
      "Execution Agent",

    simpleName:
      "Controlled Execution",

    role:
      "Executes only fully authorized corrections against permitted runtime targets.",
  },

  {
    id:
      "verification",

    name:
      "Verification Agent",

    simpleName:
      "Verification",

    role:
      "Revalidates identity integrity after correction and determines whether closure conditions are satisfied.",
  },

  {
    id:
      "audit",

    name:
      "Audit Agent",

    simpleName:
      "Audit & History",

    role:
      "Maintains case lifecycle traceability and reporting data.",
  },

  {
    id:
      "intelligence-reporting",

    name:
      "Intelligence & Reporting Agent",

    simpleName:
      "Analytics & Reporting",

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