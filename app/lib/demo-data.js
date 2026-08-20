/* =========================================================
   AI IDENTITY RECONCILIATION PLATFORM
   SHARED DEMO DATA

   Synthetic demonstration data only.

   CORE DATA RULES
   ---------------------------------------------------------
   - Validated detected cases: 53 total
   - Active / open cases: 52
   - Closed / historical cases: 1
   - Closed cases do NOT appear in the active Cases workspace
   - Closed cases remain available in Reports & Audit
   - CASE-2026-00002 is the primary interactive walkthrough
   - CASE-2026-00001 remains the verified historical E2E case

   IDENTITY NAME POLICY
   ---------------------------------------------------------
   - First Name + Second Name only
   - No third name
   - No surname
   - No family name
   - No tribe name

   GOVERNANCE
   ---------------------------------------------------------
   - Master Reference remains read-only
   - AI detects, analyzes and recommends
   - Authorized humans approve
   - Controlled systems execute
   - Verification is required before closure
   ========================================================= */


/* =========================================================
   GLOBAL PLATFORM METRICS
   ========================================================= */

export const PLATFORM_METRICS = {
  masterIdentities: 3000,

  biometricRecords: 1000,

  rawFindings: 103,

  /*
   * Validated dataset total.
   *
   * 52 active cases
   * +
   * 1 verified / closed case
   * =
   * 53 total detected cases
   */
  aggregatedCases: 53,

  activeCases: 52,

  closedCases: 1,

  corroboratingFindingsCollapsed: 50,

  multiFindingCases: 17,

  /*
   * The validated dataset contains 9 protective cases.
   * CASE-2026-00001 is already closed.
   *
   * Therefore:
   * 8 remain active
   * 1 is historical / closed
   */
  wronglyAffectedCases: 9,

  activeWronglyAffectedCases: 8,

  closedWronglyAffectedCases: 1,

  unresolvedIdentityCases: 0,

  /*
   * Validated total priority distribution.
   */
  priority: {
    immediate: 9,
    high: 23,
    medium: 21,
  },

  /*
   * Active queue distribution after the verified
   * IMMEDIATE case was closed.
   */
  activePriority: {
    immediate: 8,
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
   ========================================================= */

export const DEMO_IDENTITIES = {
  REF_001009: {
    referenceId:
      "REF-001009",

    name: {
      en:
        "Salem Mohammed",

      ar:
        "سالم محمد",
    },
  },

  REF_002711: {
    referenceId:
      "REF-002711",

    name: {
      en:
        "Khalid Abdullah",

      ar:
        "خالد عبدالله",
    },
  },

  REF_002343: {
    referenceId:
      "REF-002343",

    name: {
      en:
        "Ali Saeed",

      ar:
        "علي سعيد",
    },
  },

  REF_001183: {
    referenceId:
      "REF-001183",

    name: {
      en:
        "Ahmed Rashid",

      ar:
        "أحمد راشد",
    },
  },

  /*
   * Primary active walkthrough references.
   */

  REF_001742: {
    referenceId:
      "REF-001742",

    name: {
      en:
        "Omar Nasser",

      ar:
        "عمر ناصر",
    },
  },

  REF_002518: {
    referenceId:
      "REF-002518",

    name: {
      en:
        "Khalid Rashid",

      ar:
        "خالد راشد",
    },
  },
};


/* =========================================================
   CASE TYPE LABELS
   ========================================================= */

export const CASE_TYPE_LABELS = {
  DATA_MISMATCH: {
    en:
      "Data Mismatch",

    ar:
      "اختلاف في البيانات",
  },

  WRONG_MAPPING: {
    en:
      "Incorrect Identity Link",

    ar:
      "ربط هوية غير صحيح",
  },

  COMPLEX_IDENTITY_CONFLICT: {
    en:
      "Complex Identity Conflict",

    ar:
      "تعارض معقد بين السجلات",
  },

  DUPLICATE_IDENTITY: {
    en:
      "Duplicate Identity",

    ar:
      "سجل هوية مكرر",
  },

  HARM_IMPACT: {
    en:
      "Possible Wrong-Person Impact",

    ar:
      "احتمال تأثير على شخص آخر",
  },

  ORPHAN_RECORD: {
    en:
      "Missing Identity Link",

    ar:
      "سجل بدون مرجع مرتبط",
  },

  CRITICAL_HARM_IDENTITY_CONFLICT: {
    en:
      "Critical Identity Conflict",

    ar:
      "تعارض هوية حرج",
  },
};


/* =========================================================
   VALIDATED CASE TYPE BREAKDOWN
   TOTAL = 53
   ========================================================= */

export const CASE_TYPE_BREAKDOWN = [
  {
    type:
      "DATA_MISMATCH",

    label:
      "Data Mismatch",

    count:
      15,
  },

  {
    type:
      "WRONG_MAPPING",

    label:
      "Incorrect Identity Link",

    count:
      11,
  },

  {
    type:
      "COMPLEX_IDENTITY_CONFLICT",

    label:
      "Complex Identity Conflict",

    count:
      8,
  },

  {
    type:
      "DUPLICATE_IDENTITY",

    label:
      "Duplicate Identity",

    count:
      6,
  },

  {
    type:
      "HARM_IMPACT",

    label:
      "Possible Wrong-Person Impact",

    count:
      6,
  },

  {
    type:
      "ORPHAN_RECORD",

    label:
      "Missing Identity Link",

    count:
      4,
  },

  {
    type:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    label:
      "Critical Identity Conflict",

    count:
      3,
  },
];


/* =========================================================
   ACTIVE CASE TYPE BREAKDOWN
   TOTAL = 52

   The closed historical case is HARM_IMPACT.
   ========================================================= */

export const ACTIVE_CASE_TYPE_BREAKDOWN = [
  {
    type:
      "DATA_MISMATCH",

    label:
      "Data Mismatch",

    count:
      15,
  },

  {
    type:
      "WRONG_MAPPING",

    label:
      "Incorrect Identity Link",

    count:
      11,
  },

  {
    type:
      "COMPLEX_IDENTITY_CONFLICT",

    label:
      "Complex Identity Conflict",

    count:
      8,
  },

  {
    type:
      "DUPLICATE_IDENTITY",

    label:
      "Duplicate Identity",

    count:
      6,
  },

  {
    type:
      "HARM_IMPACT",

    label:
      "Possible Wrong-Person Impact",

    count:
      5,
  },

  {
    type:
      "ORPHAN_RECORD",

    label:
      "Missing Identity Link",

    count:
      4,
  },

  {
    type:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    label:
      "Critical Identity Conflict",

    count:
      3,
  },
];


/* =========================================================
   EXECUTIVE CASE GROUPING
   VALIDATED TOTAL = 53
   ========================================================= */

export const EXECUTIVE_CASE_BREAKDOWN = [
  {
    type:
      "DATA_MISMATCH",

    label:
      "Data Mismatch",

    count:
      15,
  },

  {
    type:
      "WRONG_MAPPING",

    label:
      "Incorrect Identity Link",

    count:
      11,
  },

  {
    type:
      "PROTECTIVE_HARM",

    label:
      "Possible Wrong-Person Impact",

    count:
      9,
  },

  {
    type:
      "COMPLEX_IDENTITY_CONFLICT",

    label:
      "Complex Identity Conflict",

    count:
      8,
  },

  {
    type:
      "DUPLICATE_IDENTITY",

    label:
      "Duplicate Identity",

    count:
      6,
  },

  {
    type:
      "ORPHAN_RECORD",

    label:
      "Missing Identity Link",

    count:
      4,
  },
];


/* =========================================================
   ACTIVE EXECUTIVE GROUPING
   ACTIVE TOTAL = 52
   ========================================================= */

export const ACTIVE_EXECUTIVE_CASE_BREAKDOWN = [
  {
    type:
      "DATA_MISMATCH",

    label:
      "Data Mismatch",

    count:
      15,
  },

  {
    type:
      "WRONG_MAPPING",

    label:
      "Incorrect Identity Link",

    count:
      11,
  },

  {
    type:
      "PROTECTIVE_HARM",

    label:
      "Possible Wrong-Person Impact",

    count:
      8,
  },

  {
    type:
      "COMPLEX_IDENTITY_CONFLICT",

    label:
      "Complex Identity Conflict",

    count:
      8,
  },

  {
    type:
      "DUPLICATE_IDENTITY",

    label:
      "Duplicate Identity",

    count:
      6,
  },

  {
    type:
      "ORPHAN_RECORD",

    label:
      "Missing Identity Link",

    count:
      4,
  },
];


/* =========================================================
   PRIMARY ACTIVE INTERACTIVE CASE

   This is now the main presentation walkthrough.

   CURRENT STATE:
   AI analysis completed.
   Officer review is next.

   It has NOT been executed.
   It has NOT been verified.
   It has NOT been closed.
   ========================================================= */

export const PRIMARY_ACTIVE_DEMO_CASE = {
  id:
    "CASE-2026-00002",

  active:
    true,

  closed:
    false,

  interactive:
    true,

  person: {
    en:
      "Khalid Rashid",

    ar:
      "خالد راشد",
  },

  caseType:
    "HARM_IMPACT",

  title:
    "Possible Wrong-Person Impact",

  priority:
    "IMMEDIATE",

  wronglyAffected:
    true,

  biometricId:
    "BIO-000214",

  currentIdentity:
    "REF-001742",

  currentIdentityName: {
    en:
      "Omar Nasser",

    ar:
      "عمر ناصر",
  },

  proposedIdentity:
    "REF-002518",

  proposedIdentityName: {
    en:
      "Khalid Rashid",

    ar:
      "خالد راشد",
  },

  canonicalIdentity:
    "REF-002518",

  canonicalIdentityName: {
    en:
      "Khalid Rashid",

    ar:
      "خالد راشد",
  },

  aiConfidence:
    99.98,

  risk:
    93.4,

  harm:
    96.1,

  protectivePriority:
    97.2,

  supportCount:
    3,

  findingCount:
    4,

  unresolvedIdentity:
    false,

  aiSummary: {
    en:
      "AI detected that the biometric record may be linked to the wrong person and identified Khalid Rashid as the strongest identity candidate.",

    ar:
      "اكتشف الذكاء الاصطناعي أن السجل البيومتري قد يكون مرتبطًا بالشخص الخطأ، وحدد خالد راشد كأقوى مرشح للهوية الصحيحة.",
  },

  aiReason: {
    en:
      "The current identity relationship conflicts with the combined synthetic biometric and reference evidence. REF-002518 provides the strongest supported match.",

    ar:
      "يتعارض الربط الحالي مع الأدلة البيومترية والمرجعية الاصطناعية المجمعة، بينما يقدم REF-002518 أقوى تطابق مدعوم بالأدلة.",
  },

  recommendedAction: {
    en:
      "Replace the current biometric identity link with REF-002518 after Officer and Manager approval.",

    ar:
      "استبدال الربط الحالي للسجل البيومتري بالمرجع REF-002518 بعد اعتماد موظف المراجعة والمدير.",
  },

  workflowStatus:
    "READY_FOR_OFFICER_REVIEW",

  finalStatus:
    "READY_FOR_OFFICER_REVIEW",

  officer: {
    role:
      "Monitoring Officer",

    actor:
      null,

    decision:
      "PENDING",
  },

  manager: {
    role:
      "Supervising Manager",

    actor:
      null,

    decision:
      "NOT_READY",
  },

  officerDecision:
    "PENDING",

  managerDecision:
    "NOT_READY",

  execution: {
    status:
      "NOT_AUTHORIZED",

    action:
      "REASSIGN_BIOMETRIC_IDENTITY",

    targetSystem:
      "BIOMETRIC_SYSTEM",

    targetRecord:
      "BIO-000214",

    field:
      "linked_master_id",

    before:
      "REF-001742",

    beforeName: {
      en:
        "Omar Nasser",

      ar:
        "عمر ناصر",
    },

    after:
      "REF-002518",

    afterName: {
      en:
        "Khalid Rashid",

      ar:
        "خالد راشد",
    },
  },

  verification: {
    status:
      "NOT_STARTED",

    score:
      null,

    biometricMatch:
      null,

    biometricMatchPercent:
      null,

    identityMappingValid:
      null,

    originalConflictResolved:
      null,

    secondaryConflict:
      null,

    rollbackRequired:
      false,
  },

  auditTrailEventCount:
    1,

  masterModified:
    false,

  originalBiometricDatasetModified:
    false,
};


/* =========================================================
   HISTORICAL VERIFIED E2E CASE

   This case is CLOSED.

   It must NOT appear in the active Cases workspace.

   It remains available in:
   - Reports
   - Audit
   - Historical case details
   ========================================================= */

export const VERIFIED_DEMO_CASE = {
  id:
    "CASE-2026-00001",

  active:
    false,

  closed:
    true,

  interactive:
    false,

  person: {
    en:
      "Salem Mohammed",

    ar:
      "سالم محمد",
  },

  caseType:
    "HARM_IMPACT",

  title:
    "Possible Wrong-Person Impact",

  priority:
    "IMMEDIATE",

  wronglyAffected:
    true,

  biometricId:
    "BIO-000166",

  currentIdentity:
    "REF-002711",

  currentIdentityName: {
    en:
      "Khalid Abdullah",

    ar:
      "خالد عبدالله",
  },

  proposedIdentity:
    "REF-001009",

  proposedIdentityName: {
    en:
      "Salem Mohammed",

    ar:
      "سالم محمد",
  },

  canonicalIdentity:
    "REF-001009",

  canonicalIdentityName: {
    en:
      "Salem Mohammed",

    ar:
      "سالم محمد",
  },

  aiConfidence:
    99.99,

  risk:
    94.99,

  harm:
    97.5,

  protectivePriority:
    98.0,

  aiSummary: {
    en:
      "AI detected that the biometric record was linked to the wrong identity and identified Salem Mohammed as the strongest verified identity candidate.",

    ar:
      "اكتشف الذكاء الاصطناعي أن السجل البيومتري مرتبط بهوية غير صحيحة، وحدد سالم محمد كأقوى مرشح للهوية الصحيحة.",
  },

  workflowStatus:
    "VERIFIED_CLOSED",

  officer: {
    role:
      "Monitoring Officer",

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
      en:
        "Khalid Abdullah",

      ar:
        "خالد عبدالله",
    },

    after:
      "REF-001009",

    afterName: {
      en:
        "Salem Mohammed",

      ar:
        "سالم محمد",
    },
  },

  verification: {
    status:
      "PASSED",

    score:
      100,

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
   COMPLEX ACTIVE DEMO CASE
   ========================================================= */

export const COMPLEX_DEMO_CASE = {
  id:
    "CASE-2026-00014",

  active:
    true,

  closed:
    false,

  interactive:
    false,

  person: {
    en:
      "Ali Saeed",

    ar:
      "علي سعيد",
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

  biometricId:
    "BIO-000795",

  primaryBiometricId:
    "BIO-000795",

  currentIdentity:
    "REF-001183",

  currentIdentityName: {
    en:
      "Ahmed Rashid",

    ar:
      "أحمد راشد",
  },

  proposedIdentity:
    "REF-002343",

  proposedIdentityName: {
    en:
      "Ali Saeed",

    ar:
      "علي سعيد",
  },

  canonicalIdentity:
    "REF-002343",

  canonicalIdentityName: {
    en:
      "Ali Saeed",

    ar:
      "علي سعيد",
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
      "AI combined five related findings and identified Ali Saeed as the strongest identity candidate.",

    ar:
      "جمع الذكاء الاصطناعي خمس نتائج مترابطة وحدد علي سعيد كأقوى مرشح للهوية.",
  },

  workflowStatus:
    "AI_INVESTIGATED",

  finalStatus:
    "AI_INVESTIGATED",

  officer: {
    role:
      "Monitoring Officer",

    actor:
      null,

    decision:
      "PENDING",
  },

  manager: {
    role:
      "Supervising Manager",

    actor:
      null,

    decision:
      "NOT_READY",
  },

  officerDecision:
    "PENDING",

  managerDecision:
    "NOT_READY",

  execution: {
    status:
      "NOT_AUTHORIZED",

    action:
      "REASSIGN_BIOMETRIC_IDENTITY",

    targetSystem:
      "BIOMETRIC_SYSTEM",

    targetRecord:
      "BIO-000795",

    field:
      "linked_master_id",

    before:
      "REF-001183",

    beforeName: {
      en:
        "Ahmed Rashid",

      ar:
        "أحمد راشد",
    },

    after:
      "REF-002343",

    afterName: {
      en:
        "Ali Saeed",

      ar:
        "علي سعيد",
    },
  },

  verification: {
    status:
      "NOT_STARTED",

    score:
      null,

    biometricMatch:
      null,

    biometricMatchPercent:
      null,

    identityMappingValid:
      null,

    originalConflictResolved:
      null,

    secondaryConflict:
      null,

    rollbackRequired:
      false,
  },
};


/* =========================================================
   SYNTHETIC ACTIVE CASE GENERATOR

   Generates the remaining active records used by the
   "View All Active Cases" page.

   These are deterministic frontend demonstration records.
   ========================================================= */

const SYNTHETIC_FIRST_NAMES = [
  {
    en: "Khalid",
    ar: "خالد",
  },

  {
    en: "Maryam",
    ar: "مريم",
  },

  {
    en: "Ahmed",
    ar: "أحمد",
  },

  {
    en: "Fatima",
    ar: "فاطمة",
  },

  {
    en: "Omar",
    ar: "عمر",
  },

  {
    en: "Aisha",
    ar: "عائشة",
  },

  {
    en: "Mohammed",
    ar: "محمد",
  },

  {
    en: "Noura",
    ar: "نورة",
  },

  {
    en: "Saeed",
    ar: "سعيد",
  },

  {
    en: "Hessa",
    ar: "حصة",
  },

  {
    en: "Rashid",
    ar: "راشد",
  },

  {
    en: "Maha",
    ar: "مها",
  },

  {
    en: "Abdullah",
    ar: "عبدالله",
  },

  {
    en: "Sara",
    ar: "سارة",
  },

  {
    en: "Yousef",
    ar: "يوسف",
  },

  {
    en: "Latifa",
    ar: "لطيفة",
  },

  {
    en: "Hamad",
    ar: "حمد",
  },

  {
    en: "Reem",
    ar: "ريم",
  },

  {
    en: "Sultan",
    ar: "سلطان",
  },

  {
    en: "Amal",
    ar: "أمل",
  },

  {
    en: "Nasser",
    ar: "ناصر",
  },

  {
    en: "Shamma",
    ar: "شما",
  },

  {
    en: "Majid",
    ar: "ماجد",
  },

  {
    en: "Hind",
    ar: "هند",
  },

  {
    en: "Mansoor",
    ar: "منصور",
  },

  {
    en: "Maitha",
    ar: "ميثاء",
  },
];


const SYNTHETIC_SECOND_NAMES = [
  {
    en: "Rashid",
    ar: "راشد",
  },

  {
    en: "Ahmed",
    ar: "أحمد",
  },

  {
    en: "Saeed",
    ar: "سعيد",
  },

  {
    en: "Ali",
    ar: "علي",
  },

  {
    en: "Khalid",
    ar: "خالد",
  },

  {
    en: "Mohammed",
    ar: "محمد",
  },

  {
    en: "Nasser",
    ar: "ناصر",
  },

  {
    en: "Abdullah",
    ar: "عبدالله",
  },

  {
    en: "Hamad",
    ar: "حمد",
  },

  {
    en: "Yousef",
    ar: "يوسف",
  },

  {
    en: "Sultan",
    ar: "سلطان",
  },

  {
    en: "Omar",
    ar: "عمر",
  },

  {
    en: "Majid",
    ar: "ماجد",
  },

  {
    en: "Salem",
    ar: "سالم",
  },

  {
    en: "Mansoor",
    ar: "منصور",
  },

  {
    en: "Ibrahim",
    ar: "إبراهيم",
  },

  {
    en: "Hassan",
    ar: "حسن",
  },

  {
    en: "Jasem",
    ar: "جاسم",
  },

  {
    en: "Tariq",
    ar: "طارق",
  },

  {
    en: "Fahad",
    ar: "فهد",
  },

  {
    en: "Khalifa",
    ar: "خليفة",
  },

  {
    en: "Suhail",
    ar: "سهيل",
  },

  {
    en: "Marwan",
    ar: "مروان",
  },

  {
    en: "Adel",
    ar: "عادل",
  },

  {
    en: "Essa",
    ar: "عيسى",
  },

  {
    en: "Zayed",
    ar: "زايد",
  },
];


/* =========================================================
   PERSON OVERRIDES

   Keeps key presentation records stable and readable.
   ========================================================= */

const PERSON_OVERRIDES = {
  2: {
    en:
      "Khalid Rashid",

    ar:
      "خالد راشد",
  },

  3: {
    en:
      "Maryam Ahmed",

    ar:
      "مريم أحمد",
  },

  5: {
    en:
      "Ahmed Saeed",

    ar:
      "أحمد سعيد",
  },

  6: {
    en:
      "Mariam Khalid",

    ar:
      "مريم خالد",
  },

  9: {
    en:
      "Fatima Ali",

    ar:
      "فاطمة علي",
  },

  14: {
    en:
      "Ali Saeed",

    ar:
      "علي سعيد",
  },
};


/* =========================================================
   ACTIVE TYPE TARGETS
   ========================================================= */

const ACTIVE_CASE_TYPE_TARGETS = {
  DATA_MISMATCH:
    15,

  WRONG_MAPPING:
    11,

  COMPLEX_IDENTITY_CONFLICT:
    8,

  DUPLICATE_IDENTITY:
    6,

  HARM_IMPACT:
    5,

  ORPHAN_RECORD:
    4,

  CRITICAL_HARM_IDENTITY_CONFLICT:
    3,
};


/* =========================================================
   FORCED PRESENTATION TYPES

   These keep existing visible demonstration records
   semantically stable.
   ========================================================= */

const FORCED_CASE_TYPES = {
  2:
    "HARM_IMPACT",

  3:
    "CRITICAL_HARM_IDENTITY_CONFLICT",

  5:
    "CRITICAL_HARM_IDENTITY_CONFLICT",

  14:
    "COMPLEX_IDENTITY_CONFLICT",
};


/* =========================================================
   BUILD ACTIVE TYPE MAP
   ========================================================= */

function buildActiveCaseTypeMap() {
  const remaining = {
    ...ACTIVE_CASE_TYPE_TARGETS,
  };


  const result = {};


  Object.entries(
    FORCED_CASE_TYPES
  ).forEach(
    ([
      caseNumber,
      type,
    ]) => {
      result[
        Number(
          caseNumber
        )
      ] =
        type;


      remaining[
        type
      ] -=
        1;
    }
  );


  const fillOrder = [
    "DATA_MISMATCH",

    "WRONG_MAPPING",

    "COMPLEX_IDENTITY_CONFLICT",

    "DUPLICATE_IDENTITY",

    "HARM_IMPACT",

    "ORPHAN_RECORD",

    "CRITICAL_HARM_IDENTITY_CONFLICT",
  ];


  let cursor =
    0;


  for (
    let caseNumber = 2;
    caseNumber <= 53;
    caseNumber += 1
  ) {
    if (
      result[
        caseNumber
      ]
    ) {
      continue;
    }


    let selectedType =
      null;


    for (
      let attempt = 0;
      attempt < fillOrder.length;
      attempt += 1
    ) {
      const type =
        fillOrder[
          cursor %
            fillOrder.length
        ];


      cursor +=
        1;


      if (
        remaining[
          type
        ] >
        0
      ) {
        selectedType =
          type;

        break;
      }
    }


    if (
      !selectedType
    ) {
      selectedType =
        Object.keys(
          remaining
        ).find(
          (type) =>
            remaining[
              type
            ] >
            0
        );
    }


    result[
      caseNumber
    ] =
      selectedType;


    remaining[
      selectedType
    ] -=
      1;
  }


  return result;
}


const ACTIVE_CASE_TYPE_MAP =
  buildActiveCaseTypeMap();


/* =========================================================
   SYNTHETIC PERSON
   ========================================================= */

function buildSyntheticPerson(
  caseNumber
) {
  if (
    PERSON_OVERRIDES[
      caseNumber
    ]
  ) {
    return (
      PERSON_OVERRIDES[
        caseNumber
      ]
    );
  }


  const index =
    caseNumber -
    2;


  const first =
    SYNTHETIC_FIRST_NAMES[
      index %
        SYNTHETIC_FIRST_NAMES.length
    ];


  const group =
    Math.floor(
      index /
        SYNTHETIC_FIRST_NAMES.length
    );


  const second =
    SYNTHETIC_SECOND_NAMES[
      (
        index *
          7 +
        group *
          5 +
        3
      ) %
        SYNTHETIC_SECOND_NAMES.length
    ];


  return {
    en:
      `${first.en} ${second.en}`,

    ar:
      `${first.ar} ${second.ar}`,
  };
}


/* =========================================================
   SYNTHETIC TECHNICAL IDS
   ========================================================= */

function buildReferenceId(
  value
) {
  return (
    `REF-${String(
      value
    ).padStart(
      6,
      "0"
    )}`
  );
}


function buildBiometricId(
  value
) {
  return (
    `BIO-${String(
      value
    ).padStart(
      6,
      "0"
    )}`
  );
}


/* =========================================================
   ACTIVE PRIORITY

   CASE 00002 - 00009 = 8 IMMEDIATE
   CASE 00010 - 00032 = 23 HIGH
   CASE 00033 - 00053 = 21 MEDIUM
   ========================================================= */

function getActivePriority(
  caseNumber
) {
  if (
    caseNumber <=
    9
  ) {
    return (
      "IMMEDIATE"
    );
  }


  if (
    caseNumber <=
    32
  ) {
    return (
      "HIGH"
    );
  }


  return (
    "MEDIUM"
  );
}


/* =========================================================
   ACTIVE WORKFLOW STATUS
   ========================================================= */

function getWorkflowStatus(
  caseNumber
) {
  const special = {
    2:
      "READY_FOR_OFFICER_REVIEW",

    3:
      "AI_INVESTIGATED",

    5:
      "AWAITING_MANAGER_APPROVAL",

    6:
      "READY_FOR_OFFICER_REVIEW",

    9:
      "READY_FOR_CORRECTION",

    14:
      "AI_INVESTIGATED",
  };


  if (
    special[
      caseNumber
    ]
  ) {
    return (
      special[
        caseNumber
      ]
    );
  }


  const cycle = [
    "AI_INVESTIGATED",

    "READY_FOR_OFFICER_REVIEW",

    "AWAITING_MANAGER_APPROVAL",

    "AI_INVESTIGATED",

    "READY_FOR_CORRECTION",
  ];


  return (
    cycle[
      caseNumber %
        cycle.length
    ]
  );
}


/* =========================================================
   WORKFLOW AUTHORIZATION STATE
   ========================================================= */

function getWorkflowControls(
  workflowStatus
) {
  if (
    workflowStatus ===
    "READY_FOR_CORRECTION"
  ) {
    return {
      officerDecision:
        "APPROVED",

      managerDecision:
        "APPROVED",

      executionStatus:
        "READY",

      verificationStatus:
        "NOT_STARTED",
    };
  }


  if (
    workflowStatus ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return {
      officerDecision:
        "APPROVED",

      managerDecision:
        "PENDING",

      executionStatus:
        "NOT_AUTHORIZED",

      verificationStatus:
        "NOT_STARTED",
    };
  }


  return {
    officerDecision:
      "PENDING",

    managerDecision:
      "NOT_READY",

    executionStatus:
      "NOT_AUTHORIZED",

    verificationStatus:
      "NOT_STARTED",
  };
}


/* =========================================================
   GENERATE STANDARD ACTIVE CASE
   ========================================================= */

function generateActiveCase(
  caseNumber
) {
  if (
    caseNumber ===
    2
  ) {
    return (
      PRIMARY_ACTIVE_DEMO_CASE
    );
  }


  if (
    caseNumber ===
    14
  ) {
    return (
      COMPLEX_DEMO_CASE
    );
  }


  const caseType =
    ACTIVE_CASE_TYPE_MAP[
      caseNumber
    ];


  const person =
    buildSyntheticPerson(
      caseNumber
    );


  const priority =
    getActivePriority(
      caseNumber
    );


  const workflowStatus =
    getWorkflowStatus(
      caseNumber
    );


  const controls =
    getWorkflowControls(
      workflowStatus
    );


  const wronglyAffected =
    caseType ===
      "HARM_IMPACT"
    ||
    caseType ===
      "CRITICAL_HARM_IDENTITY_CONFLICT";


  const biometricNumber =
    100 +
    (
      caseNumber *
        17
    ) %
      900;


  const currentRefNumber =
    1000 +
    (
      caseNumber *
        37
    ) %
      1900;


  let proposedRefNumber =
    1000 +
    (
      caseNumber *
        53 +
      211
    ) %
      1900;


  if (
    proposedRefNumber ===
    currentRefNumber
  ) {
    proposedRefNumber +=
      1;
  }


  const biometricId =
    buildBiometricId(
      biometricNumber
    );


  const currentIdentity =
    buildReferenceId(
      currentRefNumber
    );


  const proposedIdentity =
    buildReferenceId(
      proposedRefNumber
    );


  const confidence =
    Number(
      (
        99.7 +
        (
          caseNumber %
            29
        ) /
          100
      ).toFixed(
        2
      )
    );


  const risk =
    priority ===
    "IMMEDIATE"
      ? Number(
          (
            90 +
            (
              caseNumber %
                8
            )
          ).toFixed(
            1
          )
        )
      : priority ===
        "HIGH"
        ? Number(
            (
              75 +
              (
                caseNumber %
                  15
              )
            ).toFixed(
              1
            )
          )
        : Number(
            (
              50 +
              (
                caseNumber %
                  20
              )
            ).toFixed(
              1
            )
          );


  const harm =
    wronglyAffected
      ? Number(
          (
            88 +
            (
              caseNumber %
                11
            )
          ).toFixed(
            1
          )
        )
      : Number(
          (
            30 +
            (
              caseNumber *
                3
            ) %
              45
          ).toFixed(
            1
          )
        );


  const protectivePriority =
    wronglyAffected
      ? Number(
          Math.min(
            99,
            harm +
              1.5
          ).toFixed(
            1
          )
        )
      : Number(
          Math.min(
            89,
            (
              risk +
              harm
            ) /
              2
          ).toFixed(
            1
          )
        );


  const typeLabel =
    CASE_TYPE_LABELS[
      caseType
    ];


  return {
    id:
      `CASE-2026-${String(
        caseNumber
      ).padStart(
        5,
        "0"
      )}`,

    active:
      true,

    closed:
      false,

    interactive:
      false,

    person,

    caseType,

    title:
      typeLabel.en,

    titleLocalized:
      typeLabel,

    priority,

    wronglyAffected,

    biometricId,

    currentIdentity,

    currentIdentityName: {
      en:
        "Current Reference",

      ar:
        "المرجع الحالي",
    },

    proposedIdentity,

    proposedIdentityName:
      person,

    canonicalIdentity:
      proposedIdentity,

    canonicalIdentityName:
      person,

    aiConfidence:
      confidence,

    risk,

    harm,

    protectivePriority,

    supportCount:
      1 +
      (
        caseNumber %
          4
      ),

    findingCount:
      1 +
      (
        caseNumber %
          5
      ),

    unresolvedIdentity:
      false,

    aiSummary: {
      en:
        `${typeLabel.en} detected. AI prepared the strongest supported identity recommendation for authorized human review.`,

      ar:
        `تم اكتشاف ${typeLabel.ar}. وجهز الذكاء الاصطناعي أقوى توصية مدعومة بالأدلة للمراجعة البشرية المخولة.`,
    },

    workflowStatus,

    finalStatus:
      workflowStatus,

    officer: {
      role:
        "Monitoring Officer",

      actor:
        controls.officerDecision ===
        "APPROVED"
          ? "Demo Monitoring Officer"
          : null,

      decision:
        controls.officerDecision,
    },

    manager: {
      role:
        "Supervising Manager",

      actor:
        controls.managerDecision ===
        "APPROVED"
          ? "Demo Supervising Manager"
          : null,

      decision:
        controls.managerDecision,
    },

    officerDecision:
      controls.officerDecision,

    managerDecision:
      controls.managerDecision,

    execution: {
      status:
        controls.executionStatus,

      action:
        "REASSIGN_BIOMETRIC_IDENTITY",

      targetSystem:
        "BIOMETRIC_SYSTEM",

      targetRecord:
        biometricId,

      field:
        "linked_master_id",

      before:
        currentIdentity,

      beforeName: {
        en:
          "Current Reference",

        ar:
          "المرجع الحالي",
      },

      after:
        proposedIdentity,

      afterName:
        person,
    },

    verification: {
      status:
        controls.verificationStatus,

      score:
        null,

      biometricMatch:
        null,

      biometricMatchPercent:
        null,

      identityMappingValid:
        null,

      originalConflictResolved:
        null,

      secondaryConflict:
        null,

      rollbackRequired:
        false,
    },

    masterModified:
      false,

    originalBiometricDatasetModified:
      false,
  };
}


/* =========================================================
   ACTIVE CASES

   CASE-2026-00002
   through
   CASE-2026-00053

   Total = 52
   ========================================================= */

export const ACTIVE_CASES =
  Array.from(
    {
      length:
        52,
    },

    (
      _,
      index
    ) =>
      generateActiveCase(
        index +
          2
      )
  );


/* =========================================================
   CLOSED / HISTORICAL CASES
   ========================================================= */

export const CLOSED_CASES = [
  VERIFIED_DEMO_CASE,
];


/* =========================================================
   ALL DETECTED CASES

   52 active
   +
   1 closed
   =
   53 total
   ========================================================= */

export const ALL_DETECTED_CASES = [
  VERIFIED_DEMO_CASE,
  ...ACTIVE_CASES,
];


/* =========================================================
   ACTIVE PRIORITY CASES

   Used by the simplified main Cases page.

   Closed cases can never appear here.
   ========================================================= */

const PRIORITY_ORDER = {
  IMMEDIATE:
    3,

  HIGH:
    2,

  MEDIUM:
    1,
};


export const TOP_ACTIVE_CASES = [
  ...ACTIVE_CASES,
]
  .sort(
    (
      a,
      b
    ) => {
      const priorityDifference =
        PRIORITY_ORDER[
          b.priority
        ] -
        PRIORITY_ORDER[
          a.priority
        ];


      if (
        priorityDifference !==
        0
      ) {
        return (
          priorityDifference
        );
      }


      if (
        b.protectivePriority !==
        a.protectivePriority
      ) {
        return (
          b.protectivePriority -
          a.protectivePriority
        );
      }


      return (
        a.id.localeCompare(
          b.id
        )
      );
    }
  )
  .slice(
    0,
    3
  );


/* =========================================================
   CASE LOOKUP
   ========================================================= */

export function getCaseById(
  caseId
) {
  return (
    ALL_DETECTED_CASES.find(
      (
        item
      ) =>
        item.id ===
        caseId
    ) ||
    null
  );
}


/* =========================================================
   ACTIVE CASE LOOKUP
   ========================================================= */

export function getActiveCaseById(
  caseId
) {
  return (
    ACTIVE_CASES.find(
      (
        item
      ) =>
        item.id ===
        caseId
    ) ||
    null
  );
}


/* =========================================================
   CLOSED CASE LOOKUP
   ========================================================= */

export function getClosedCaseById(
  caseId
) {
  return (
    CLOSED_CASES.find(
      (
        item
      ) =>
        item.id ===
        caseId
    ) ||
    null
  );
}


/* =========================================================
   VERIFIED DEMO LIFECYCLE

   Historical completed backend demonstration.
   ========================================================= */

export const VERIFIED_DEMO_LIFECYCLE = [
  {
    order:
      1,

    stage:
      "AI_INVESTIGATION",

    label:
      "AI Investigation",

    userLabel: {
      en:
        "AI Analysis",

      ar:
        "تحليل الذكاء الاصطناعي",
    },

    status:
      "COMPLETED",
  },

  {
    order:
      2,

    stage:
      "OFFICER_APPROVAL",

    label:
      "Officer Approval",

    userLabel: {
      en:
        "Officer Review",

      ar:
        "مراجعة الموظف",
    },

    status:
      "APPROVED",
  },

  {
    order:
      3,

    stage:
      "MANAGER_APPROVAL",

    label:
      "Manager Approval",

    userLabel: {
      en:
        "Manager Approval",

      ar:
        "موافقة المدير",
    },

    status:
      "APPROVED",
  },

  {
    order:
      4,

    stage:
      "CONTROLLED_CORRECTION",

    label:
      "Controlled Correction",

    userLabel: {
      en:
        "Correction",

      ar:
        "التصحيح",
    },

    status:
      "COMPLETED",
  },

  {
    order:
      5,

    stage:
      "POST_CORRECTION_VERIFICATION",

    label:
      "Post-Correction Verification",

    userLabel: {
      en:
        "Verification",

      ar:
        "التحقق",
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

  syntheticIdentityNameFormat:
    "FIRST_NAME_SECOND_NAME_ONLY",

  thirdNameAllowed:
    false,

  familyNameAllowed:
    false,

  tribeNameAllowed:
    false,
};


/* =========================================================
   TECHNICAL PLATFORM WORKFLOW
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
    key:
      "DETECTION",

    en:
      "Case Detection",

    ar:
      "اكتشاف الحالة",
  },

  {
    key:
      "OFFICER_REVIEW",

    en:
      "Officer Review",

    ar:
      "تدقيق الموظف",
  },

  {
    key:
      "MANAGER_APPROVAL",

    en:
      "Manager Approval",

    ar:
      "موافقة المدير",
  },

  {
    key:
      "CORRECTION",

    en:
      "Correction",

    ar:
      "التصحيح",
  },

  {
    key:
      "VERIFICATION",

    en:
      "Verification",

    ar:
      "التحقق",
  },
];


/* =========================================================
   AI ARCHITECTURE
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

  identityNameFormat:
    "FIRST_NAME_SECOND_NAME_ONLY",

  thirdNameUsed:
    false,

  familyNameUsed:
    false,

  tribeNameUsed:
    false,
};


/* =========================================================
   HELPER VALUES
   ========================================================= */

export const PRIMARY_ACTIVE_CASE_ID =
  PRIMARY_ACTIVE_DEMO_CASE.id;


export const VERIFIED_CASE_ID =
  VERIFIED_DEMO_CASE.id;


export const COMPLEX_CASE_ID =
  COMPLEX_DEMO_CASE.id;


export const ACTIVE_CASE_COUNT =
  PLATFORM_METRICS.activeCases;


export const CLOSED_CASE_COUNT =
  PLATFORM_METRICS.closedCases;


export const PROTECTIVE_CASE_COUNT =
  PLATFORM_METRICS.wronglyAffectedCases;


export const ACTIVE_PROTECTIVE_CASE_COUNT =
  PLATFORM_METRICS.activeWronglyAffectedCases;


export const TOTAL_CASE_COUNT =
  PLATFORM_METRICS.aggregatedCases;


export const TOTAL_FINDING_COUNT =
  PLATFORM_METRICS.rawFindings;