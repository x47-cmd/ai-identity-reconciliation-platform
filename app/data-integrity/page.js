"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  CASE_TYPE_BREAKDOWN,
  GOVERNANCE,
  PLATFORM_METRICS,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  GitCompareArrows,
  Link2,
  LockKeyhole,
  RefreshCcw,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";


/* =========================================================
   LANGUAGE HELPER
   ========================================================= */

function L(
  language,
  english,
  arabic
) {
  return language === "ar"
    ? arabic
    : english;
}


/* =========================================================
   FORMAT HELPERS
   ========================================================= */

function formatNumber(
  value
) {
  return Number(
    value
  ).toLocaleString("en-US");
}


/* =========================================================
   DATA INTEGRITY METRICS

   Core values come from shared demo data.
   ========================================================= */

const integrityMetrics = [
  {
    key:
      "MASTER_IDENTITIES",

    value:
      PLATFORM_METRICS.masterIdentities,

    description:
      "Authoritative reference identities",

    icon:
      Database,

    status:
      "READ_ONLY",
  },

  {
    key:
      "BIOMETRIC_RECORDS",

    value:
      PLATFORM_METRICS.biometricRecords,

    description:
      "Synthetic operational records reconciled",

    icon:
      Fingerprint,

    status:
      "MONITORED",
  },

  {
    key:
      "RAW_FINDINGS",

    value:
      PLATFORM_METRICS.rawFindings,

    description:
      "Reconciliation findings generated",

    icon:
      BrainCircuit,

    status:
      "ANALYZED",
  },

  {
    key:
      "AGGREGATED_CASES",

    value:
      PLATFORM_METRICS.aggregatedCases,

    description:
      "Distinct identity integrity cases",

    icon:
      FileSearch,

    status:
      "AGGREGATED",
  },
];


/* =========================================================
   CASE TAXONOMY METADATA

   Counts are taken from CASE_TYPE_BREAKDOWN.
   ========================================================= */

const issueMetadata = {
  DATA_MISMATCH: {
    severity:
      "MEDIUM",

    description:
      "Identity or registration attributes are inconsistent across compared records.",
  },

  WRONG_MAPPING: {
    severity:
      "HIGH",

    description:
      "A biometric record appears associated with an incorrect Master identity.",
  },

  COMPLEX_IDENTITY_CONFLICT: {
    severity:
      "HIGH",

    description:
      "Multiple related identity findings require combined investigation and case-level resolution.",
  },

  DUPLICATE_IDENTITY: {
    severity:
      "HIGH",

    description:
      "Multiple registration relationships appear to reference the same identity.",
  },

  HARM_IMPACT: {
    severity:
      "IMMEDIATE",

    description:
      "An identity conflict creates elevated potential for wrong-person impact.",
  },

  ORPHAN_RECORD: {
    severity:
      "MEDIUM",

    description:
      "A biometric record has no valid authoritative Master relationship.",
  },

  CRITICAL_HARM_IDENTITY_CONFLICT: {
    severity:
      "IMMEDIATE",

    description:
      "A critical cross-identity conflict requires immediate protective human attention.",
  },
};


const integrityIssues =
  CASE_TYPE_BREAKDOWN.map(
    (item) => ({
      type:
        item.type,

      label:
        item.label,

      count:
        item.count,

      severity:
        issueMetadata[
          item.type
        ]?.severity ||
        "MEDIUM",

      description:
        issueMetadata[
          item.type
        ]?.description ||
        "",
    })
  );


/* =========================================================
   SYSTEM STATE
   ========================================================= */

const systemHealth = [
  {
    key:
      "MASTER_REFERENCE",

    role:
      "Authoritative Identity Source",

    records:
      PLATFORM_METRICS.masterIdentities,

    access:
      GOVERNANCE.masterReferenceAccess,

    status:
      "PROTECTED",

    icon:
      Database,
  },

  {
    key:
      "BIOMETRIC_SYSTEM",

    role:
      "Operational Biometric Source",

    records:
      PLATFORM_METRICS.biometricRecords,

    access:
      "CONTROLLED_TARGET",

    status:
      "MONITORED",

    icon:
      Fingerprint,
  },

  {
    key:
      "RECONCILIATION_ENGINE",

    role:
      "Cross-System Comparison",

    records:
      PLATFORM_METRICS.biometricRecords,

    access:
      "AI_PROCESSING",

    status:
      "VALIDATED",

    icon:
      GitCompareArrows,
  },

  {
    key:
      "CASE_ENGINE",

    role:
      "Finding Aggregation",

    records:
      `${PLATFORM_METRICS.aggregatedCases} cases`,

    access:
      "AI_PROCESSING",

    status:
      "VALIDATED",

    icon:
      FileSearch,
  },
];


/* =========================================================
   VALIDATED DEMO SNAPSHOT
   ========================================================= */

const demoSnapshots = [
  {
    key:
      "CURRENT_RECONCILIATION",

    biometric:
      PLATFORM_METRICS.biometricRecords,

    master:
      PLATFORM_METRICS.masterIdentities,

    findings:
      PLATFORM_METRICS.rawFindings,

    cases:
      PLATFORM_METRICS.aggregatedCases,

    status:
      "VALIDATED",
  },
];


/* =========================================================
   VALIDATED QUALITY CHECKS
   ========================================================= */

const resolvedCaseCount =
  (
    PLATFORM_METRICS.aggregatedCases
    -
    PLATFORM_METRICS.unresolvedIdentityCases
  );


const integrityChecks = [
  {
    key:
      "DETECTION_RECALL",

    value:
      `${PLATFORM_METRICS.evaluation.recall}%`,

    score:
      PLATFORM_METRICS.evaluation.recall,

    description:
      `${PLATFORM_METRICS.evaluation.detectedIssues} of ${PLATFORM_METRICS.evaluation.expectedIssues} seeded synthetic issues detected`,
  },

  {
    key:
      "CANONICAL_RESOLUTION",

    value:
      `${resolvedCaseCount} / ${PLATFORM_METRICS.aggregatedCases}`,

    score:
      PLATFORM_METRICS.aggregatedCases > 0
        ? (
            resolvedCaseCount
            /
            PLATFORM_METRICS.aggregatedCases
          )
          *
          100
        : 0,

    description:
      "No unresolved canonical identity cases",
  },

  {
    key:
      "DIAGNOSTIC_PRECISION",

    value:
      `${PLATFORM_METRICS.evaluation.diagnosticPrecision}%`,

    score:
      PLATFORM_METRICS.evaluation.diagnosticPrecision,

    description:
      "After corroborating finding analysis",
  },

  {
    key:
      "PROTECTIVE_DETECTION",

    value:
      `${PLATFORM_METRICS.evaluation.protectiveDetectionRecall}%`,

    score:
      PLATFORM_METRICS.evaluation.protectiveDetectionRecall,

    description:
      "All protective synthetic cases detected",
  },

  {
    key:
      "PROTECTIVE_PRIORITY",

    value:
      `${PLATFORM_METRICS.evaluation.protectivePriorityAccuracy}%`,

    score:
      PLATFORM_METRICS.evaluation.protectivePriorityAccuracy,

    description:
      "Protective priority classification validated",
  },
];


/* =========================================================
   LOCALIZATION
   ========================================================= */

function localizeMetricLabel(
  key,
  t
) {
  const keys = {
    MASTER_IDENTITIES:
      "analytics.masterIdentities",

    BIOMETRIC_RECORDS:
      "analytics.totalBiometricRecords",

    RAW_FINDINGS:
      "analytics.rawFindings",

    AGGREGATED_CASES:
      "dataIntegrity.aggregatedCases",
  };

  return keys[key]
    ? t(
        keys[key],
        key
      )
    : key;
}


function localizeMetricDescription(
  description,
  language
) {
  const labels = {
    "Authoritative reference identities":
      "هويات المرجع المعتمد",

    "Synthetic operational records reconciled":
      "سجلات تشغيل اصطناعية تمت مطابقتها",

    "Reconciliation findings generated":
      "نتائج تم إنتاجها من عملية المطابقة",

    "Distinct identity integrity cases":
      "حالات مستقلة لسلامة الهوية",
  };

  return language === "ar"
    ? labels[description] ||
        description
    : description;
}


function localizeMetricStatus(
  status,
  language,
  t
) {
  const labels = {
    READ_ONLY:
      t(
        "common.readOnly",
        "READ ONLY"
      ),

    MONITORED:
      L(
        language,
        "MONITORED",
        "قيد المراقبة"
      ),

    ANALYZED:
      L(
        language,
        "ANALYZED",
        "تم التحليل"
      ),

    AGGREGATED:
      L(
        language,
        "AGGREGATED",
        "تم التجميع"
      ),
  };

  return (
    labels[status] ||
    status
  );
}


function localizeIssueLabel(
  issue,
  t
) {
  return t(
    `caseTypes.${issue.type}`,
    issue.label
  );
}


function localizeIssueDescription(
  description,
  language
) {
  const labels = {
    "Identity or registration attributes are inconsistent across compared records.":
      "توجد اختلافات في سمات الهوية أو بيانات التسجيل بين السجلات التي تمت مقارنتها.",

    "A biometric record appears associated with an incorrect Master identity.":
      "يبدو أن سجلًا بيومتريًا مرتبط بهوية غير صحيحة داخل المرجع الرئيسي.",

    "Multiple related identity findings require combined investigation and case-level resolution.":
      "تتطلب عدة نتائج مترابطة للهوية تحقيقًا موحدًا وحسمًا على مستوى الحالة.",

    "Multiple registration relationships appear to reference the same identity.":
      "يبدو أن عدة علاقات تسجيل تشير إلى الهوية نفسها.",

    "An identity conflict creates elevated potential for wrong-person impact.":
      "يؤدي تعارض الهوية إلى ارتفاع احتمال التأثير على الشخص الخطأ.",

    "A biometric record has no valid authoritative Master relationship.":
      "لا يملك السجل البيومتري علاقة صالحة مع هوية معتمدة في المرجع الرئيسي.",

    "A critical cross-identity conflict requires immediate protective human attention.":
      "يتطلب تعارض الهوية الحرج بين أشخاص مختلفين تدخلًا بشريًا وقائيًا فوريًا.",
  };

  return language === "ar"
    ? labels[description] ||
        description
    : description;
}


function localizeSystemName(
  key,
  language
) {
  const labels = {
    MASTER_REFERENCE: {
      en:
        "Master Reference System",

      ar:
        "نظام المرجع الرئيسي",
    },

    BIOMETRIC_SYSTEM: {
      en:
        "Biometric System",

      ar:
        "النظام البيومتري",
    },

    RECONCILIATION_ENGINE: {
      en:
        "Reconciliation Engine",

      ar:
        "محرك المطابقة",
    },

    CASE_ENGINE: {
      en:
        "Case Engine",

      ar:
        "محرك الحالات",
    },
  };

  return (
    labels[key]?.[
      language
    ] ||
    labels[key]?.en ||
    key
  );
}


function localizeSystemRole(
  role,
  language
) {
  const labels = {
    "Authoritative Identity Source":
      "مصدر الهوية المعتمد",

    "Operational Biometric Source":
      "المصدر البيومتري التشغيلي",

    "Cross-System Comparison":
      "المقارنة بين الأنظمة",

    "Finding Aggregation":
      "تجميع النتائج",
  };

  return language === "ar"
    ? labels[role] ||
        role
    : role;
}


function localizeAccess(
  access,
  language,
  t
) {
  const labels = {
    READ_ONLY:
      t(
        "common.readOnly",
        "READ ONLY"
      ),

    CONTROLLED_TARGET:
      L(
        language,
        "CONTROLLED TARGET",
        "هدف خاضع للتحكم"
      ),

    AI_PROCESSING:
      L(
        language,
        "AI PROCESSING",
        "معالجة بالذكاء الاصطناعي"
      ),
  };

  return (
    labels[access] ||
    access
  );
}


function localizeHealthStatus(
  status,
  language
) {
  const labels = {
    PROTECTED: {
      en:
        "PROTECTED",

      ar:
        "محمي",
    },

    MONITORED: {
      en:
        "MONITORED",

      ar:
        "قيد المراقبة",
    },

    VALIDATED: {
      en:
        "VALIDATED",

      ar:
        "تم التحقق",
    },
  };

  return (
    labels[status]?.[
      language
    ] ||
    labels[status]?.en ||
    status
  );
}


function localizeCheckLabel(
  key,
  t
) {
  const keys = {
    DETECTION_RECALL:
      "analytics.detectionRecall",

    CANONICAL_RESOLUTION:
      "dataIntegrity.canonicalResolution",

    DIAGNOSTIC_PRECISION:
      "dataIntegrity.diagnosticPrecision",

    PROTECTIVE_DETECTION:
      "dataIntegrity.protectiveDetection",

    PROTECTIVE_PRIORITY:
      "dataIntegrity.protectivePriorityAccuracy",
  };

  return keys[key]
    ? t(
        keys[key],
        key
      )
    : key;
}


function localizeCheckDescription(
  description,
  language
) {
  const labels = {
    [`${PLATFORM_METRICS.evaluation.detectedIssues} of ${PLATFORM_METRICS.evaluation.expectedIssues} seeded synthetic issues detected`]:
      `تم اكتشاف ${PLATFORM_METRICS.evaluation.detectedIssues} من أصل ${PLATFORM_METRICS.evaluation.expectedIssues} مشكلة اصطناعية مزروعة`,

    "No unresolved canonical identity cases":
      "لا توجد حالات هوية مرجعية غير محسومة",

    "After corroborating finding analysis":
      "بعد تحليل النتائج الداعمة",

    "All protective synthetic cases detected":
      "تم اكتشاف جميع الحالات الوقائية الاصطناعية",

    "Protective priority classification validated":
      "تم التحقق من صحة تصنيف الأولوية الوقائية",
  };

  return language === "ar"
    ? labels[description] ||
        description
    : description;
}


/* =========================================================
   METRIC CARD
   ========================================================= */

function IntegrityMetric({
  item,
  language,
  t,
}) {
  const Icon =
    item.icon;

  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon
            size={20}
            aria-hidden="true"
          />
        </div>

        <span
          style={{
            color:
              "#59cfa0",

            fontSize:
              "10px",

            fontWeight:
              800,
          }}
        >
          {localizeMetricStatus(
            item.status,
            language,
            t
          )}
        </span>
      </div>


      <div className="metricValue">
        {formatNumber(
          item.value
        )}
      </div>


      <div className="metricTitle">
        {localizeMetricLabel(
          item.key,
          t
        )}
      </div>


      <div className="metricSubtitle">
        {localizeMetricDescription(
          item.description,
          language
        )}
      </div>
    </div>
  );
}


/* =========================================================
   SEVERITY BADGE
   ========================================================= */

function SeverityBadge({
  severity,
  t,
}) {
  const styles = {
    IMMEDIATE: {
      color:
        "#ff7c89",

      background:
        "rgba(255,80,100,0.08)",

      border:
        "rgba(255,80,100,0.14)",
    },

    HIGH: {
      color:
        "#ffbd67",

      background:
        "rgba(255,185,90,0.07)",

      border:
        "rgba(255,185,90,0.13)",
    },

    MEDIUM: {
      color:
        "#76a9ff",

      background:
        "rgba(70,135,255,0.07)",

      border:
        "rgba(70,135,255,0.13)",
    },
  };


  const style =
    styles[severity] ||
    styles.MEDIUM;


  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        minHeight:
          "25px",

        padding:
          "0 10px",

        borderRadius:
          "7px",

        color:
          style.color,

        background:
          style.background,

        border:
          `1px solid ${style.border}`,

        fontSize:
          "10px",

        fontWeight:
          800,

        whiteSpace:
          "nowrap",
      }}
    >
      {t(
        `priorities.${severity}`,
        severity
      )}
    </span>
  );
}


/* =========================================================
   READ ONLY BADGE
   ========================================================= */

function ReadOnlyBadge({
  t,
}) {
  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        minHeight:
          "25px",

        padding:
          "0 10px",

        borderRadius:
          "7px",

        color:
          "#59cfa0",

        background:
          "rgba(52,211,153,0.07)",

        border:
          "1px solid rgba(52,211,153,0.13)",

        fontSize:
          "10px",

        fontWeight:
          800,
      }}
    >
      {t(
        "common.readOnly",
        "READ ONLY"
      )}
    </span>
  );
}


/* =========================================================
   HEALTH STATUS
   ========================================================= */

function HealthStatus({
  status,
  language,
}) {
  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          "6px",

        color:
          "#59cfa0",

        fontSize:
          "10px",

        fontWeight:
          800,

        whiteSpace:
          "nowrap",
      }}
    >
      <span className="greenDot" />

      {localizeHealthStatus(
        status,
        language
      )}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function DataIntegrityPage() {
  const {
    language,
    t,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const ForwardArrow =
    isArabic
      ? ChevronLeft
      : ChevronRight;


  const BackwardArrow =
    isArabic
      ? ChevronRight
      : ChevronLeft;


  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        {/* ================================================
            HEADER
            ================================================ */}

        <header className="topbar">
          <div>
            <div className="eyebrow">
              <Database
                size={15}
                aria-hidden="true"
              />

              {t(
                "dataIntegrity.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "dataIntegrity.title"
              )}
            </h1>

            <p>
              {t(
                "dataIntegrity.subtitle"
              )}
            </p>
          </div>


          <div className="topbarActions">
            <button
              type="button"
              className="searchButton"
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>
                {L(
                  language,
                  "Search identity / biometric",
                  "البحث عن هوية / سجل بيومتري"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                DI
              </div>

              <div className="profileText">
                <strong>
                  {L(
                    language,
                    "Data Integrity",
                    "سلامة البيانات"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Monitoring Operations",
                    "عمليات المراقبة"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            MASTER PROTECTION
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "18px",
          }}
        >
          <LockKeyhole
            size={25}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Master Reference Protection Active",
                "حماية المرجع الرئيسي نشطة"
              )}
            </strong>

            <span>
              {t(
                "dataIntegrity.masterReadOnlyMessage"
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            METRICS
            ================================================ */}

        <section className="statsGrid">
          {integrityMetrics.map(
            (item) => (
              <IntegrityMetric
                key={
                  item.key
                }
                item={
                  item
                }
                language={
                  language
                }
                t={t}
              />
            )
          )}
        </section>


        {/* ================================================
            SYSTEM ARCHITECTURE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "CROSS-SYSTEM RECONCILIATION",
                  "المطابقة بين الأنظمة"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Identity Data Relationship",
                  "علاقة بيانات الهوية"
                )}
              </h2>
            </div>

            <GitCompareArrows
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1.1fr auto 1fr",

              alignItems:
                "stretch",

              gap:
                "14px",

              padding:
                "24px",
            }}
          >

            {/* MASTER REFERENCE */}

            <div
              style={{
                padding:
                  "22px",

                borderRadius:
                  "15px",

                background:
                  "rgba(52,211,153,0.045)",

                border:
                  "1px solid rgba(52,211,153,0.11)",
              }}
            >
              <div
                style={{
                  width:
                    "44px",

                  height:
                    "44px",

                  borderRadius:
                    "12px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(52,211,153,0.08)",

                  color:
                    "#59cfa0",
                }}
              >
                <Database
                  size={22}
                  aria-hidden="true"
                />
              </div>


              <div
                style={{
                  color:
                    "#58ad8c",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",

                  marginTop:
                    "16px",
                }}
              >
                SYSTEM B
              </div>


              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                {t(
                  "dataIntegrity.masterReference"
                )}
              </h3>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "13px",

                  fontSize:
                    "25px",

                  color:
                    "#d4e3ee",
                }}
              >
                {formatNumber(
                  PLATFORM_METRICS.masterIdentities
                )}
              </strong>


              <span
                style={{
                  color:
                    "#71859b",

                  fontSize:
                    "10px",
                }}
              >
                {L(
                  language,
                  "authoritative identities",
                  "هوية معتمدة"
                )}
              </span>


              <div
                style={{
                  marginTop:
                    "16px",
                }}
              >
                <ReadOnlyBadge
                  t={t}
                />
              </div>


              <div
                style={{
                  color:
                    "#58ad8c",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,

                  marginTop:
                    "9px",
                }}
              >
                {L(
                  language,
                  "SOURCE OF TRUTH · PROTECTED",
                  "مصدر الحقيقة · محمي"
                )}
              </div>
            </div>


            {/* MASTER TO AI */}

            <div
              style={{
                display:
                  "grid",

                placeItems:
                  "center",
              }}
            >
              <ForwardArrow
                size={25}
                color="#557391"
                aria-hidden="true"
              />
            </div>


            {/* AI RECONCILIATION */}

            <div
              style={{
                padding:
                  "22px",

                borderRadius:
                  "15px",

                background:
                  "rgba(66,136,255,0.055)",

                border:
                  "1px solid rgba(70,140,255,0.12)",
              }}
            >
              <div
                style={{
                  width:
                    "44px",

                  height:
                    "44px",

                  borderRadius:
                    "12px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(70,140,255,0.09)",

                  color:
                    "#69a2ff",
                }}
              >
                <BrainCircuit
                  size={22}
                  aria-hidden="true"
                />
              </div>


              <div
                style={{
                  color:
                    "#6598e9",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",

                  marginTop:
                    "16px",
                }}
              >
                SYSTEM C
              </div>


              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                {t(
                  "dataIntegrity.aiReconciliation"
                )}
              </h3>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "13px",

                  fontSize:
                    "25px",
                }}
              >
                {
                  PLATFORM_METRICS.rawFindings
                }
              </strong>


              <span
                style={{
                  color:
                    "#71859b",

                  fontSize:
                    "10px",
                }}
              >
                {L(
                  language,
                  "raw reconciliation findings",
                  "نتيجة مطابقة أولية"
                )}
              </span>


              <div
                style={{
                  marginTop:
                    "16px",

                  color:
                    "#69a2ff",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,
                }}
              >
                {L(
                  language,
                  "COMPARE · DETECT · INVESTIGATE",
                  "مقارنة · اكتشاف · تحقيق"
                )}
              </div>


              <div
                style={{
                  marginTop:
                    "8px",

                  color:
                    "#657990",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.5,
                }}
              >
                {L(
                  language,
                  "Reads both source systems and evaluates identity relationships without autonomously approving corrections.",
                  "يقرأ النظام كلا المصدرين ويقيّم علاقات الهوية بينهما دون اعتماد التصحيحات بشكل ذاتي."
                )}
              </div>
            </div>


            {/* BIOMETRIC TO AI */}

            <div
              style={{
                display:
                  "grid",

                placeItems:
                  "center",
              }}
            >
              <BackwardArrow
                size={25}
                color="#557391"
                aria-hidden="true"
              />
            </div>


            {/* BIOMETRIC SYSTEM */}

            <div
              style={{
                padding:
                  "22px",

                borderRadius:
                  "15px",

                background:
                  "rgba(255,185,90,0.045)",

                border:
                  "1px solid rgba(255,185,90,0.10)",
              }}
            >
              <div
                style={{
                  width:
                    "44px",

                  height:
                    "44px",

                  borderRadius:
                    "12px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(255,185,90,0.08)",

                  color:
                    "#ffbd67",
                }}
              >
                <Fingerprint
                  size={22}
                  aria-hidden="true"
                />
              </div>


              <div
                style={{
                  color:
                    "#c69554",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",

                  marginTop:
                    "16px",
                }}
              >
                SYSTEM A
              </div>


              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                {t(
                  "dataIntegrity.biometricSystem"
                )}
              </h3>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "13px",

                  fontSize:
                    "25px",
                }}
              >
                {formatNumber(
                  PLATFORM_METRICS.biometricRecords
                )}
              </strong>


              <span
                style={{
                  color:
                    "#71859b",

                  fontSize:
                    "10px",
                }}
              >
                {L(
                  language,
                  "biometric records",
                  "سجل بيومتري"
                )}
              </span>


              <div
                style={{
                  marginTop:
                    "16px",

                  color:
                    "#d59d52",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,
                }}
              >
                {t(
                  "dataIntegrity.controlledCorrectionTarget"
                )}
              </div>


              <div
                style={{
                  marginTop:
                    "8px",

                  color:
                    "#7e725d",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.5,
                }}
              >
                {L(
                  language,
                  "Corrections require Officer and Manager approval before execution.",
                  "تتطلب التصحيحات اعتماد الضابط والمدير قبل التنفيذ."
                )}
              </div>
            </div>
          </div>


          <div
            style={{
              margin:
                "0 24px 22px",

              padding:
                "12px 14px",

              borderRadius:
                "10px",

              background:
                "rgba(70,140,255,0.035)",

              border:
                "1px solid rgba(70,140,255,0.07)",

              color:
                "#71849c",

              fontSize:
                "10px",

              lineHeight:
                1.6,

              textAlign:
                "center",
            }}
          >
            {L(
              language,

              "System C reads and compares both source systems. The Master Reference is authoritative and read-only; only the permitted Biometric System target can receive an approved controlled correction.",

              "يقرأ النظام C المصدرين ويقارن بينهما. المرجع الرئيسي هو المصدر المعتمد ويظل للقراءة فقط، بينما يمكن تطبيق التصحيح الخاضع للتحكم بعد اعتماده على النظام البيومتري المسموح فقط."
            )}
          </div>
        </section>


        {/* ================================================
            SYNTHETIC EVIDENCE NOTICE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 16px",

            padding:
              "17px",
          }}
        >
          <Fingerprint
            size={23}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Synthetic Biometric Evidence Only",
                "أدلة بيومترية اصطناعية فقط"
              )}
            </strong>

            <span>
              {L(
                language,

                "The demonstration uses synthetic 32-dimensional vector evidence for reconciliation testing. It does not contain real face, fingerprint or iris biometric templates or modality-specific production scores.",

                "يستخدم العرض أدلة متجهات اصطناعية من 32 بُعدًا لاختبار المطابقة. ولا يحتوي على قوالب بيومترية حقيقية للوجه أو بصمة الإصبع أو قزحية العين، ولا على درجات تشغيلية خاصة بأي نوع بيومتري."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            QUALITY + SUMMARY
            ================================================ */}

        <section className="dashboardGrid">

          {/* DATA QUALITY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "VALIDATED DATA QUALITY",
                    "جودة بيانات تم التحقق منها"
                  )}
                </div>

                <h2>
                  {t(
                    "dataIntegrity.qualityValidation"
                  )}
                </h2>
              </div>

              <Gauge
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "9px 20px 20px",
              }}
            >
              {integrityChecks.map(
                (check) => (
                  <div
                    key={
                      check.key
                    }
                    style={{
                      padding:
                        "12px 0",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "flex-start",

                        gap:
                          "14px",

                        marginBottom:
                          "8px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#8b9db3",

                            fontSize:
                              "11px",

                            fontWeight:
                              650,
                          }}
                        >
                          {localizeCheckLabel(
                            check.key,
                            t
                          )}
                        </span>

                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#657890",

                            fontSize:
                              "10px",

                            lineHeight:
                              1.45,

                            marginTop:
                              "3px",
                          }}
                        >
                          {localizeCheckDescription(
                            check.description,
                            language
                          )}
                        </span>
                      </div>

                      <strong
                        style={{
                          color:
                            "#59cfa0",

                          fontSize:
                            "11px",

                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {check.value}
                      </strong>
                    </div>


                    <div className="progress">
                      <div
                        className="progressFill"
                        style={{
                          width:
                            `${Math.min(
                              check.score,
                              100
                            )}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>


          {/* QUALITY SUMMARY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CURRENT DEMO STATE",
                    "حالة العرض الحالية"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Integrity Summary",
                    "ملخص سلامة البيانات"
                  )}
                </h2>
              </div>

              <ShieldCheck
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div
                style={{
                  width:
                    "145px",

                  height:
                    "145px",

                  borderRadius:
                    "50%",

                  margin:
                    "0 auto",

                  border:
                    "13px solid rgba(52,211,153,0.10)",

                  outline:
                    "4px solid rgba(52,211,153,0.20)",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <strong
                  style={{
                    fontSize:
                      "27px",

                    color:
                      "#59cfa0",
                  }}
                >
                  {resolvedCaseCount}
                  /
                  {
                    PLATFORM_METRICS.aggregatedCases
                  }
                </strong>

                <span
                  style={{
                    color:
                      "#6b9384",

                    fontSize:
                      "10px",

                    fontWeight:
                      750,

                    textAlign:
                      "center",

                    marginTop:
                      "3px",
                  }}
                >
                  {isArabic ? (
                    <>
                      الحسم
                      <br />
                      المرجعي
                    </>
                  ) : (
                    <>
                      CANONICAL
                      <br />
                      RESOLUTION
                    </>
                  )}
                </span>
              </div>


              <div
                style={{
                  marginTop:
                    "22px",
                }}
              >
                <div className="detailRow">
                  <span>
                    {L(
                      language,
                      "Missed Synthetic Issues",
                      "مشكلات اصطناعية لم تُكتشف"
                    )}
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    {
                      PLATFORM_METRICS.evaluation.missedIssues
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {L(
                      language,
                      "Unresolved Canonical Cases",
                      "حالات مرجعية غير محسومة"
                    )}
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    {
                      PLATFORM_METRICS.unresolvedIdentityCases
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "analytics.unexplainedFalsePositives"
                    )}
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    {
                      PLATFORM_METRICS.evaluation.unexplainedFalsePositives
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "analytics.protectiveCases"
                    )}
                  </span>

                  <strong>
                    {
                      PLATFORM_METRICS.wronglyAffectedCases
                    }
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "13px",

                  color:
                    "#71839a",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                {t(
                  "dataIntegrity.resolutionNotice"
                )}
              </div>


              <div
                style={{
                  marginTop:
                    "10px",

                  color:
                    "#61738c",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,

                  "Canonical resolution means a strongest identity candidate was resolved for each aggregated case. It does not mean that every case has been human-approved, corrected, verified or closed.",

                  "يعني الحسم المرجعي أنه تم تحديد أقوى مرشح للهوية لكل حالة مجمعة. ولا يعني أن جميع الحالات تم اعتمادها بشريًا أو تصحيحها أو التحقق منها أو إغلاقها."
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            ISSUE CLASSIFICATION
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "PRIMARY CASE TAXONOMY",
                  "التصنيف الرئيسي للحالات"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Detected Data Integrity Issues",
                  "مشكلات سلامة البيانات المكتشفة"
                )}
              </h2>
            </div>

            <AlertTriangle
              size={22}
              aria-hidden="true"
            />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "ISSUE TYPE",
                      "نوع المشكلة"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "COUNT",
                      "العدد"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "SEVERITY",
                      "الشدة"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "DESCRIPTION",
                      "الوصف"
                    )}
                  </th>

                  <th
                    aria-label={
                      L(
                        language,
                        "View cases",
                        "عرض الحالات"
                      )
                    }
                  />
                </tr>
              </thead>


              <tbody>
                {integrityIssues.map(
                  (issue) => (
                    <tr
                      key={
                        issue.type
                      }
                    >
                      <td>
                        <div
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap:
                              "9px",
                          }}
                        >
                          {issue.severity ===
                          "IMMEDIATE" ? (
                            <ShieldAlert
                              size={16}
                              color="#ff7887"
                              aria-hidden="true"
                            />
                          ) : (
                            <CircleAlert
                              size={16}
                              color="#69a2ff"
                              aria-hidden="true"
                            />
                          )}

                          <strong
                            style={{
                              color:
                                "#ccd8e7",

                              fontSize:
                                "11px",
                            }}
                          >
                            {localizeIssueLabel(
                              issue,
                              t
                            )}
                          </strong>
                        </div>
                      </td>


                      <td>
                        <strong
                          style={{
                            fontSize:
                              "12px",
                          }}
                        >
                          {issue.count}
                        </strong>
                      </td>


                      <td>
                        <SeverityBadge
                          severity={
                            issue.severity
                          }
                          t={t}
                        />
                      </td>


                      <td>
                        <span
                          style={{
                            color:
                              "#788ba2",

                            fontSize:
                              "11px",

                            lineHeight:
                              1.55,
                          }}
                        >
                          {localizeIssueDescription(
                            issue.description,
                            language
                          )}
                        </span>
                      </td>


                      <td>
                        <Link
                          href="/cases"
                          style={{
                            width:
                              "30px",

                            height:
                              "30px",

                            borderRadius:
                              "8px",

                            display:
                              "grid",

                            placeItems:
                              "center",

                            border:
                              "1px solid rgba(255,255,255,0.06)",

                            color:
                              "#69a2ff",

                            textDecoration:
                              "none",
                          }}
                          aria-label={
                            L(
                              language,

                              `View ${issue.label} cases`,

                              `عرض حالات ${localizeIssueLabel(
                                issue,
                                t
                              )}`
                            )
                          }
                        >
                          <ForwardArrow
                            size={15}
                            aria-hidden="true"
                          />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>


          <div
            style={{
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              color:
                "#687b93",

              fontSize:
                "10px",

              lineHeight:
                1.55,
            }}
          >
            {L(
              language,

              `The primary aggregated taxonomy totals ${PLATFORM_METRICS.aggregatedCases} cases. The separate ${PLATFORM_METRICS.wronglyAffectedCases}-case protective grouping combines harm-impact and critical wrong-person identity conflicts for executive protection reporting.`,

              `يبلغ إجمالي التصنيف الرئيسي المجمع ${PLATFORM_METRICS.aggregatedCases} حالة. أما التجميع الوقائي المنفصل البالغ ${PLATFORM_METRICS.wronglyAffectedCases} حالات فيجمع حالات تأثير الضرر وتعارضات الهوية الحرجة المرتبطة بالشخص الخطأ لأغراض تقارير الحماية التنفيذية.`
            )}
          </div>
        </section>


        {/* ================================================
            SYSTEM STATE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "PLATFORM CONNECTIONS",
                  "اتصالات المنصة"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Source & Processing State",
                  "حالة المصادر والمعالجة"
                )}
              </h2>
            </div>

            <Server
              size={22}
              aria-hidden="true"
            />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "SYSTEM",
                      "النظام"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ROLE",
                      "الدور"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "RECORDS / SCOPE",
                      "السجلات / النطاق"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ACCESS MODEL",
                      "نموذج الوصول"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "DEMO STATE",
                      "حالة العرض"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {systemHealth.map(
                  (system) => {
                    const Icon =
                      system.icon;

                    return (
                      <tr
                        key={
                          system.key
                        }
                      >
                        <td>
                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              gap:
                                "9px",
                            }}
                          >
                            <div className="agentIcon">
                              <Icon
                                size={16}
                                aria-hidden="true"
                              />
                            </div>

                            <strong
                              style={{
                                color:
                                  "#ccd8e7",

                                fontSize:
                                  "11px",
                              }}
                            >
                              {localizeSystemName(
                                system.key,
                                language
                              )}
                            </strong>
                          </div>
                        </td>


                        <td>
                          {localizeSystemRole(
                            system.role,
                            language
                          )}
                        </td>


                        <td>
                          <strong>
                            {typeof system.records ===
                            "number"
                              ? formatNumber(
                                  system.records
                                )
                              : system.records}
                          </strong>
                        </td>


                        <td>
                          <span
                            style={{
                              color:
                                system.access ===
                                "READ_ONLY"
                                  ? "#59cfa0"
                                  : system.access ===
                                      "CONTROLLED_TARGET"
                                    ? "#ffbd67"
                                    : "#73a7ff",

                              fontSize:
                                "10px",

                              fontWeight:
                                800,
                            }}
                          >
                            {localizeAccess(
                              system.access,
                              language,
                              t
                            )}
                          </span>
                        </td>


                        <td>
                          <HealthStatus
                            status={
                              system.status
                            }
                            language={
                              language
                            }
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* ================================================
            DEMO SNAPSHOT + MASTER GOVERNANCE
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "16px",
          }}
        >

          {/* VALIDATED SNAPSHOT */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "VALIDATED DEMO SNAPSHOT",
                    "لقطة عرض تم التحقق منها"
                  )}
                </div>

                <h2>
                  {t(
                    "dataIntegrity.reconciliationSnapshot"
                  )}
                </h2>
              </div>

              <RefreshCcw
                size={22}
                aria-hidden="true"
              />
            </div>


            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      {L(
                        language,
                        "SNAPSHOT",
                        "اللقطة"
                      )}
                    </th>

                    <th>
                      {L(
                        language,
                        "SCOPE",
                        "النطاق"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.biometric"
                      )}
                    </th>

                    <th>
                      {L(
                        language,
                        "MASTER",
                        "المرجع الرئيسي"
                      )}
                    </th>

                    <th>
                      {L(
                        language,
                        "FINDINGS",
                        "النتائج"
                      )}
                    </th>

                    <th>
                      {L(
                        language,
                        "CASES",
                        "الحالات"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.status"
                      )}
                    </th>
                  </tr>
                </thead>


                <tbody>
                  {demoSnapshots.map(
                    (run) => (
                      <tr
                        key={
                          run.key
                        }
                      >
                        <td>
                          <strong
                            style={{
                              color:
                                "#d0dbea",

                              fontSize:
                                "11px",
                            }}
                          >
                            {L(
                              language,
                              "Current Demo Reconciliation",
                              "مطابقة العرض الحالية"
                            )}
                          </strong>
                        </td>


                        <td>
                          {L(
                            language,
                            "Synthetic validation dataset",
                            "مجموعة بيانات التحقق الاصطناعية"
                          )}
                        </td>


                        <td>
                          {formatNumber(
                            run.biometric
                          )}
                        </td>


                        <td>
                          {formatNumber(
                            run.master
                          )}
                        </td>


                        <td>
                          {run.findings}
                        </td>


                        <td>
                          {run.cases}
                        </td>


                        <td>
                          <HealthStatus
                            status={
                              run.status
                            }
                            language={
                              language
                            }
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>


            <div
              style={{
                padding:
                  "14px 18px",

                borderTop:
                  "1px solid rgba(255,255,255,0.05)",

                color:
                  "#687b93",

                fontSize:
                  "10px",

                lineHeight:
                  1.55,
              }}
            >
              {L(
                language,

                "The interface intentionally avoids fabricated monitoring IDs and timestamps. This table represents the validated synthetic reconciliation dataset used by the current demo.",

                "تتجنب الواجهة عمدًا عرض أرقام مراقبة أو أوقات غير حقيقية. ويمثل هذا الجدول مجموعة بيانات المطابقة الاصطناعية التي تم التحقق منها والمستخدمة في العرض الحالي."
              )}
            </div>
          </div>


          {/* MASTER GOVERNANCE */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "MASTER GOVERNANCE",
                    "حوكمة المرجع الرئيسي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Source-of-Truth Controls",
                    "ضوابط مصدر الحقيقة"
                  )}
                </h2>
              </div>

              <LockKeyhole
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <LockKeyhole
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Master Writes Blocked",
                      "الكتابة على المرجع الرئيسي محظورة"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "AI-assisted correction workflows do not modify the Master Reference System.",
                      "مسارات التصحيح المدعومة بالذكاء الاصطناعي لا تعدل نظام المرجع الرئيسي."
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <ShieldCheck
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Authoritative Reference Validation",
                      "التحقق من المرجع المعتمد"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Master records are read as the authoritative identity reference during reconciliation.",
                      "تتم قراءة سجلات المرجع الرئيسي باعتبارها المرجع المعتمد للهوية أثناء عملية المطابقة."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.12)",

                  background:
                    "rgba(255,185,90,0.055)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ffbd67"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#e0ad5f",
                    }}
                  >
                    {L(
                      language,
                      "Master Data Review Required",
                      "مراجعة بيانات المرجع الرئيسي مطلوبة"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,

                      "If evidence suggests the authoritative Master record itself may be incorrect, the issue is escalated for dedicated human review rather than automatically corrected.",

                      "إذا أشارت الأدلة إلى احتمال وجود خطأ في سجل المرجع الرئيسي نفسه، يتم تصعيد المشكلة لمراجعة بشرية مخصصة بدل تصحيحها تلقائيًا."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            INTEGRITY CONTROL FLOW
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "INTEGRITY CONTROL FLOW",
                  "مسار التحكم في سلامة البيانات"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "From Data Change to Verified Integrity",
                  "من تغيير البيانات إلى سلامة متحقق منها"
                )}
              </h2>
            </div>

            <Link2
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              padding:
                "20px",

              display:
                "flex",

              alignItems:
                "center",

              gap:
                "8px",

              overflowX:
                "auto",
            }}
          >
            {[
              [
                "Data Change",
                "تغيير البيانات",
              ],

              [
                "Monitoring",
                "المراقبة",
              ],

              [
                "Reconciliation",
                "المطابقة",
              ],

              [
                "AI Finding",
                "نتيجة الذكاء الاصطناعي",
              ],

              [
                "Case",
                "الحالة",
              ],

              [
                "Investigation",
                "التحقيق",
              ],

              [
                "Human Approval",
                "الاعتماد البشري",
              ],

              [
                "Correction",
                "التصحيح",
              ],

              [
                "Verification",
                "التحقق",
              ],

              [
                "Integrity Restored",
                "استعادة سلامة البيانات",
              ],
            ].map(
              (
                [
                  english,
                  arabic,
                ],
                index
              ) => (
                <div
                  key={
                    english
                  }
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "8px",

                    flexShrink:
                      0,
                  }}
                >
                  <div
                    style={{
                      minWidth:
                        "110px",

                      padding:
                        "11px",

                      borderRadius:
                        "10px",

                      textAlign:
                        "center",

                      background:
                        index === 9
                          ? "rgba(52,211,153,0.06)"
                          : "rgba(67,137,255,0.045)",

                      border:
                        index === 9
                          ? "1px solid rgba(52,211,153,0.11)"
                          : "1px solid rgba(67,137,255,0.08)",

                      color:
                        index === 9
                          ? "#59cfa0"
                          : "#76a9ff",

                      fontSize:
                        "10px",

                      fontWeight:
                        750,
                    }}
                  >
                    {L(
                      language,
                      english,
                      arabic
                    )}
                  </div>

                  {index < 9 && (
                    <ForwardArrow
                      size={14}
                      color="#52647b"
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            FINAL MESSAGE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "16px 0 0",

            padding:
              "18px",
          }}
        >
          <CheckCircle2
            size={25}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Continuous Identity Integrity Model",
                "نموذج مستمر لسلامة الهوية"
              )}
            </strong>

            <span>
              {L(
                language,

                "The platform compares operational biometric relationships against the authoritative Master Reference, detects integrity exceptions, prioritizes potential human harm and supports controlled remediation with required human approval and post-correction verification.",

                "تقارن المنصة علاقات السجلات البيومترية التشغيلية مع المرجع الرئيسي المعتمد، وتكتشف حالات عدم سلامة البيانات، وتعطي الأولوية للضرر البشري المحتمل، وتدعم المعالجة الخاضعة للتحكم مع الاعتماد البشري المطلوب والتحقق بعد التصحيح."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t(
              "footer.platform"
            )}

            {" · "}

            {t(
              "dataIntegrity.title"
            )}
          </span>

          <div>
            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Synthetic Reconciliation Demo",
              "عرض مطابقة اصطناعي"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}