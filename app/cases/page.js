"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  useLanguage,
} from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileSearch,
  Fingerprint,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   CASE WORKSPACE
   ========================================================= */

const cases = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    type:
      VERIFIED_DEMO_CASE.caseType,

    title:
      VERIFIED_DEMO_CASE.title,

    biometric:
      VERIFIED_DEMO_CASE.biometricId,

    current:
      VERIFIED_DEMO_CASE.currentIdentity,

    proposed:
      VERIFIED_DEMO_CASE.canonicalIdentity,

    confidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    risk:
      VERIFIED_DEMO_CASE.risk,

    harm:
      VERIFIED_DEMO_CASE.harm,

    protective:
      VERIFIED_DEMO_CASE.protectivePriority,

    priority:
      VERIFIED_DEMO_CASE.priority,

    status:
      VERIFIED_DEMO_CASE.finalStatus,

    affected:
      VERIFIED_DEMO_CASE.wronglyAffected,

    findings:
      2,

    hasDetail:
      true,
  },

  {
    id: "CASE-2026-00002",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: 99.98,
    risk: 93.8,
    harm: 96.5,
    protective: 97.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00003",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: 99.98,
    risk: 96.2,
    harm: 96.0,
    protective: 97.0,
    priority: "IMMEDIATE",
    status: "AI_INVESTIGATED",
    affected: true,
    findings: 5,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00004",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000714",
    current: "REF-002905",
    proposed: "REF-001337",
    confidence: 99.97,
    risk: 92.5,
    harm: 95.0,
    protective: 96.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00005",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000621",
    current: "REF-001912",
    proposed: "REF-002448",
    confidence: 99.96,
    risk: 95.0,
    harm: 94.5,
    protective: 96.0,
    priority: "IMMEDIATE",
    status: "AWAITING_MANAGER_APPROVAL",
    affected: true,
    findings: 4,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00006",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000804",
    current: "REF-002130",
    proposed: "REF-000744",
    confidence: 99.96,
    risk: 91.5,
    harm: 94.0,
    protective: 95.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00007",
    type: "WRONG_MAPPING",
    title: "Incorrect Biometric Identity Mapping",
    biometric: "BIO-000207",
    current: "REF-001782",
    proposed: "REF-000431",
    confidence: 99.95,
    risk: 89.5,
    harm: 70.0,
    protective: 88.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 2,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00008",
    type: "COMPLEX_IDENTITY_CONFLICT",
    title: "Complex Identity Conflict",
    biometric: "BIO-000422",
    current: "REF-002117",
    proposed: "REF-000905",
    confidence: 99.94,
    risk: 91.0,
    harm: 72.0,
    protective: 87.0,
    priority: "HIGH",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 5,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00009",
    type: "DUPLICATE_IDENTITY",
    title: "Duplicate Identity Registration",
    biometric: "BIO-000612",
    current: "REF-000374",
    proposed: "REF-000374",
    confidence: 99.92,
    risk: 83.0,
    harm: 55.0,
    protective: 82.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 3,
    hasDetail: false,
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    type:
      COMPLEX_DEMO_CASE.caseType,

    title:
      COMPLEX_DEMO_CASE.title,

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    current:
      COMPLEX_DEMO_CASE.currentMasterIdentities[0],

    proposed:
      COMPLEX_DEMO_CASE.canonicalIdentity,

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    risk:
      COMPLEX_DEMO_CASE.risk,

    harm:
      COMPLEX_DEMO_CASE.harm,

    protective:
      COMPLEX_DEMO_CASE.protectivePriority,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      "AI_INVESTIGATED",

    affected:
      COMPLEX_DEMO_CASE.wronglyAffected,

    findings:
      COMPLEX_DEMO_CASE.findingCount,

    hasDetail:
      true,
  },

  {
    id: "CASE-2026-00011",
    type: "DATA_MISMATCH",
    title: "Identity Data Mismatch",
    biometric: "BIO-000318",
    current: "REF-002204",
    proposed: "REF-002204",
    confidence: 99.91,
    risk: 61.0,
    harm: 35.0,
    protective: 58.0,
    priority: "MEDIUM",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 1,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00012",
    type: "ORPHAN_RECORD",
    title: "Orphan Biometric Record",
    biometric: "BIO-000909",
    current: "REF-INVALID",
    proposed: "REF-001567",
    confidence: 99.9,
    risk: 76.0,
    harm: 45.0,
    protective: 70.0,
    priority: "MEDIUM",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 1,
    hasDetail: false,
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

function getTypeLabel(
  type,
  language,
  t
) {
  const keys = {
    HARM_IMPACT:
      "caseTypes.HARM_IMPACT",

    CRITICAL_HARM_IDENTITY_CONFLICT:
      "caseTypes.CRITICAL_HARM_CONFLICT",

    WRONG_MAPPING:
      "caseTypes.WRONG_MAPPING",

    COMPLEX_IDENTITY_CONFLICT:
      "caseTypes.COMPLEX_IDENTITY_CONFLICT",

    DUPLICATE_IDENTITY:
      "caseTypes.DUPLICATE_IDENTITY",

    DATA_MISMATCH:
      "caseTypes.DATA_MISMATCH",

    ORPHAN_RECORD:
      "caseTypes.ORPHAN",
  };

  if (keys[type]) {
    return t(keys[type]);
  }

  return language === "ar"
    ? "حالة هوية"
    : type;
}


function getCaseTitle(
  type,
  language
) {
  const titles = {
    HARM_IMPACT: {
      en: "Potential Wrong-Person Harm",
      ar: "ضرر محتمل على الشخص الخطأ",
    },

    CRITICAL_HARM_IDENTITY_CONFLICT: {
      en: "Critical Cross-Identity Harm Conflict",
      ar: "تعارض هوية حرج ذو تأثير ضار",
    },

    WRONG_MAPPING: {
      en: "Incorrect Biometric Identity Mapping",
      ar: "ربط بيومتري خاطئ بالهوية",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en: "Complex Identity Conflict",
      ar: "تعارض هوية معقد",
    },

    DUPLICATE_IDENTITY: {
      en: "Duplicate Identity Registration",
      ar: "تسجيل هوية مكررة",
    },

    DATA_MISMATCH: {
      en: "Identity Data Mismatch",
      ar: "اختلاف في بيانات الهوية",
    },

    ORPHAN_RECORD: {
      en: "Orphan Biometric Record",
      ar: "سجل بيومتري دون مرجع",
    },
  };

  return (
    titles[type]?.[language]
    ||
    titles[type]?.en
    ||
    type
  );
}


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function PriorityBadge({
  priority,
  t,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";

  return (
    <span className={className}>
      {t(`priorities.${priority}`)}
    </span>
  );
}


function StatusBadge({
  status,
  t,
}) {
  const labels = {
    READY_FOR_OFFICER_REVIEW:
      t("common.officerReview"),

    AWAITING_MANAGER_APPROVAL:
      t("common.managerApproval"),

    AI_INVESTIGATED:
      t("common.aiInvestigated"),

    VERIFIED_CLOSED:
      t("common.verifiedClosed"),
  };


  const styles = {
    READY_FOR_OFFICER_REVIEW: {
      color: "#79a9ff",
      dot: "#5c99ff",
    },

    AWAITING_MANAGER_APPROVAL: {
      color: "#ffbb5d",
      dot: "#ffbb5d",
    },

    AI_INVESTIGATED: {
      color: "#79a9ff",
      dot: "#5c99ff",
    },

    VERIFIED_CLOSED: {
      color: "#59cfa0",
      dot: "#34d399",
    },
  };


  const style =
    styles[status]
    ||
    styles.AI_INVESTIGATED;


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
          style.color,

        fontSize:
          "10px",

        lineHeight:
          1.4,

        fontWeight:
          700,

        marginTop:
          "5px",

        whiteSpace:
          "nowrap",
      }}
    >
      <span
        style={{
          width:
            "6px",

          height:
            "6px",

          borderRadius:
            "50%",

          background:
            style.dot,
        }}
      />

      {
        labels[status]
        ||
        status
      }
    </span>
  );
}


function MiniMetric({
  icon: Icon,
  label,
  value,
  description,
  t,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={19} />
        </div>

        <span className="metricStatus">
          {t("commandCenter.demoKpi")}
        </span>
      </div>

      <div className="metricValue">
        {value}
      </div>

      <div className="metricTitle">
        {label}
      </div>

      <div className="metricSubtitle">
        {description}
      </div>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CasesPage() {
  const {
    language,
    t,
  } = useLanguage();


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
              <FileSearch size={15} />

              {t("cases.eyebrow")}
            </div>

            <h1>
              {t("cases.title")}
            </h1>

            <p>
              {t("cases.subtitle")}
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                {t("cases.searchPlaceholder")}
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                MO
              </div>

              <div className="profileText">
                <strong>
                  {t(
                    "common.monitoringOfficer"
                  )}
                </strong>

                <span>
                  {
                    language === "ar"
                      ? "عمليات الهوية"
                      : "Identity Operations"
                  }
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            PROTECTIVE WARNING
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldAlert size={24} />
          </div>

          <div className="alertText">
            <strong>
              {
                language === "ar"
                  ? "نموذج حماية الشخص الخطأ"
                  : "Wrong-Person Protection Model"
              }
            </strong>

            <span>
              {
                language === "ar"
                  ? "تحتوي مجموعة البيانات التجريبية الاصطناعية على 9 حالات وقائية قد تؤدي فيها تعارضات الهوية إلى تأثير محتمل على الشخص الخطأ، ولذلك تحصل هذه الحالات على أولوية وقائية أعلى."
                  : "The synthetic demo dataset contains 9 protective cases where identity conflicts may create potential wrong-person impact. These cases receive elevated protective priority."
              }
            </span>
          </div>

          <div
            className="priority immediate"
            style={{
              height:
                "31px",

              padding:
                "0 12px",
            }}
          >
            {
              language === "ar"
                ? "9 وقائية"
                : "9 PROTECTIVE"
            }
          </div>
        </section>


        {/* ================================================
            CASE KPIs
            ================================================ */}

        <section className="statsGrid">
          <MiniMetric
            icon={FileSearch}
            label={
              t("cases.totalCases")
            }
            value={
              PLATFORM_METRICS
                .aggregatedCases
            }
            description={
              language === "ar"
                ? "حالات سلامة الهوية المجمعة"
                : "Aggregated identity integrity cases"
            }
            t={t}
          />

          <MiniMetric
            icon={CircleAlert}
            label={
              t("cases.immediate")
            }
            value={
              PLATFORM_METRICS
                .priority
                .immediate
            }
            description={
              language === "ar"
                ? "أولوية التدخل الوقائي"
                : "Protective intervention priority"
            }
            t={t}
          />

          <MiniMetric
            icon={AlertTriangle}
            label={
              t("cases.high")
            }
            value={
              PLATFORM_METRICS
                .priority
                .high
            }
            description={
              language === "ar"
                ? "مراجعة بشرية عاجلة"
                : "Accelerated human review"
            }
            t={t}
          />

          <MiniMetric
            icon={ShieldCheck}
            label={
              language === "ar"
                ? "تم حسم الهوية"
                : "Identity Resolved"
            }
            value={
              PLATFORM_METRICS
                .aggregatedCases
            }
            description={
              language === "ar"
                ? "حالات لديها هوية مرجعية مرجحة"
                : "Cases with canonical identity candidates"
            }
            t={t}
          />
        </section>


        {/* ================================================
            FILTERS
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "14px 16px",
          }}
        >
          <div
            style={{
              display:
                "flex",

              gap:
                "8px",

              flexWrap:
                "wrap",

              alignItems:
                "center",
            }}
          >
            <button
              className="primaryButton"
              style={{
                width:
                  "auto",

                marginTop:
                  0,

                padding:
                  "0 17px",
              }}
            >
              {t("cases.allCases")}

              <span
                style={{
                  opacity:
                    0.7,
                }}
              >
                {
                  PLATFORM_METRICS
                    .aggregatedCases
                }
              </span>
            </button>


            <button className="searchButton">
              {t("cases.immediate")}

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .immediate
                }
              </span>
            </button>


            <button className="searchButton">
              {t("cases.high")}

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .high
                }
              </span>
            </button>


            <button className="searchButton">
              {t("cases.medium")}

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .medium
                }
              </span>
            </button>


            <button className="searchButton">
              {
                language === "ar"
                  ? "تأثير على الشخص الخطأ"
                  : "Wrong-Person Impact"
              }

              <span>
                {
                  PLATFORM_METRICS
                    .wronglyAffectedCases
                }
              </span>
            </button>


            <button className="searchButton">
              {
                language === "ar"
                  ? "بانتظار الضابط"
                  : "Waiting Officer"
              }
            </button>


            <button className="searchButton">
              {
                language === "ar"
                  ? "بانتظار المدير"
                  : "Waiting Manager"
              }
            </button>
          </div>
        </section>


        {/* ================================================
            CASE TABLE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {
                  language === "ar"
                    ? "مساحة عمل أولويات الذكاء الاصطناعي"
                    : "AI PRIORITY WORKSPACE"
                }
              </div>

              <h2>
                {
                  language === "ar"
                    ? "حالات مطابقة الهوية"
                    : "Identity Reconciliation Cases"
                }
              </h2>
            </div>

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "8px",

                color:
                  "#71839b",

                fontSize:
                  "10px",
              }}
            >
              <Activity size={15} />

              {
                language === "ar"
                  ? "عرض المراقبة الاصطناعية"
                  : "Synthetic monitoring view"
              }
            </div>
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1180px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    {t("common.case")}
                  </th>

                  <th>
                    {t("common.type")}
                  </th>

                  <th>
                    {t("common.biometric")}
                  </th>

                  <th>
                    {t("cases.identityChange")}
                  </th>

                  <th>
                    {t("common.confidence")}
                  </th>

                  <th>
                    {t("common.risk")}
                  </th>

                  <th>
                    {t("common.harm")}
                  </th>

                  <th>
                    {t(
                      "common.protectivePriority"
                    )}
                  </th>

                  <th>
                    {t("common.priority")}
                  </th>

                  <th></th>
                </tr>
              </thead>


              <tbody>
                {
                  cases.map(
                    (item) => (
                      <tr key={item.id}>

                        <td>
                          {
                            item.hasDetail
                              ? (
                                <Link
                                  href={
                                    `/cases/${item.id}`
                                  }
                                  className="caseId"
                                  style={{
                                    textDecoration:
                                      "none",

                                    display:
                                      "inline-block",
                                  }}
                                >
                                  {item.id}
                                </Link>
                              )
                              : (
                                <span
                                  className="caseId"
                                  style={{
                                    display:
                                      "inline-block",
                                  }}
                                >
                                  {item.id}
                                </span>
                              )
                          }

                          <StatusBadge
                            status={
                              item.status
                            }
                            t={t}
                          />
                        </td>


                        <td>
                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              gap:
                                "8px",
                            }}
                          >
                            {
                              item.affected
                                ? (
                                  <ShieldAlert
                                    size={15}
                                    color="#ff6f7e"
                                  />
                                )
                                : (
                                  <Fingerprint
                                    size={15}
                                    color="#609aff"
                                  />
                                )
                            }

                            <div>
                              <div
                                style={{
                                  color:
                                    "#d2deec",

                                  fontWeight:
                                    650,

                                  fontSize:
                                    "11px",

                                  lineHeight:
                                    1.45,
                                }}
                              >
                                {
                                  getCaseTitle(
                                    item.type,
                                    language
                                  )
                                }
                              </div>

                              <div
                                style={{
                                  color:
                                    "#71839a",

                                  fontSize:
                                    "10px",

                                  lineHeight:
                                    1.4,

                                  marginTop:
                                    "4px",
                                }}
                              >
                                {
                                  getTypeLabel(
                                    item.type,
                                    language,
                                    t
                                  )
                                }

                                {" · "}

                                {item.findings}

                                {
                                  language === "ar"
                                    ? " نتائج"
                                    : " findings"
                                }
                              </div>
                            </div>
                          </div>
                        </td>


                        <td className="mono">
                          {item.biometric}
                        </td>


                        <td>
                          <div className="identityChange">
                            <span className="oldIdentity">
                              {item.current}
                            </span>

                            <ChevronRight size={14} />

                            <span className="newIdentity">
                              {item.proposed}
                            </span>
                          </div>
                        </td>


                        <td>
                          <span className="confidence">
                            {item.confidence}%
                          </span>
                        </td>


                        <td>
                          <span
                            style={{
                              color:
                                item.risk >= 90
                                  ? "#ff7d8b"
                                  : item.risk >= 80
                                    ? "#ffbd67"
                                    : "#aab9ca",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.risk}
                          </span>
                        </td>


                        <td>
                          <span
                            style={{
                              color:
                                item.harm >= 90
                                  ? "#ff7d8b"
                                  : "#aab9ca",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.harm}
                          </span>
                        </td>


                        <td>
                          <span
                            style={{
                              color:
                                item.protective >= 95
                                  ? "#ff7d8b"
                                  : "#82aeff",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.protective}
                          </span>
                        </td>


                        <td>
                          <PriorityBadge
                            priority={
                              item.priority
                            }
                            t={t}
                          />
                        </td>


                        <td>
                          {
                            item.hasDetail
                              ? (
                                <Link
                                  href={
                                    `/cases/${item.id}`
                                  }
                                  aria-label={
                                    `${t(
                                      "common.open"
                                    )} ${item.id}`
                                  }
                                  style={{
                                    width:
                                      "31px",

                                    height:
                                      "31px",

                                    borderRadius:
                                      "9px",

                                    display:
                                      "grid",

                                    placeItems:
                                      "center",

                                    border:
                                      "1px solid rgba(255,255,255,0.07)",

                                    background:
                                      "rgba(255,255,255,0.025)",

                                    color:
                                      "#79a5e6",

                                    textDecoration:
                                      "none",
                                  }}
                                >
                                  <ChevronRight size={16} />
                                </Link>
                              )
                              : (
                                <span
                                  title={
                                    t(
                                      "cases.detailUnavailable"
                                    )
                                  }
                                  style={{
                                    width:
                                      "31px",

                                    height:
                                      "31px",

                                    borderRadius:
                                      "9px",

                                    display:
                                      "grid",

                                    placeItems:
                                      "center",

                                    border:
                                      "1px solid rgba(255,255,255,0.045)",

                                    background:
                                      "rgba(255,255,255,0.015)",

                                    color:
                                      "#52647b",

                                    cursor:
                                      "default",
                                  }}
                                >
                                  <ChevronRight size={16} />
                                </span>
                              )
                          }
                        </td>
                      </tr>
                    )
                  )
                }
              </tbody>
            </table>
          </div>


          <div
            style={{
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              gap:
                "16px",

              color:
                "#687b93",

              fontSize:
                "10px",

              lineHeight:
                1.5,
            }}
          >
            <span>
              {
                language === "ar"
                  ? "عرض 12 حالة تمثيلية من أصل 53 حالة مجمعة"
                  : "Showing 12 representative cases from 53 aggregated cases"
              }
            </span>

            <span>
              {
                language === "ar"
                  ? "الترتيب حسب الأولوية الوقائية ← الضرر ← المخاطر ← ثقة الذكاء الاصطناعي"
                  : "Sorted by Protective Priority → Harm → Risk → AI Confidence"
              }
            </span>
          </div>
        </section>


        {/* ================================================
            SUMMARY
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
          }}
        >
          <div
            className="panel"
            style={{
              paddingBottom:
                "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {
                    language === "ar"
                      ? "التجميع التنفيذي للحالات"
                      : "EXECUTIVE CASE GROUPING"
                  }
                </div>

                <h2>
                  {
                    language === "ar"
                      ? "فئات سلامة الهوية"
                      : "Identity Integrity Categories"
                  }
                </h2>
              </div>

              <Fingerprint size={22} />
            </div>


            {[
              [
                t(
                  "analytics.dataMismatch"
                ),
                15,
              ],
              [
                t(
                  "analytics.wrongMapping"
                ),
                11,
              ],
              [
                t(
                  "cases.protectiveHarmCases"
                ),
                9,
              ],
              [
                t(
                  "analytics.complexIdentityConflict"
                ),
                8,
              ],
              [
                t(
                  "analytics.duplicateIdentity"
                ),
                6,
              ],
              [
                t(
                  "analytics.orphan"
                ),
                4,
              ],
            ].map(
              ([
                label,
                value,
              ]) => (
                <div
                  key={label}
                  className="detailRow"
                  style={{
                    margin:
                      "0 19px",
                  }}
                >
                  <span>
                    {label}
                  </span>

                  <strong>
                    {value}
                  </strong>
                </div>
              )
            )}


            <div
              style={{
                margin:
                  "14px 19px 0",

                color:
                  "#71839a",

                fontSize:
                  "10px",

                lineHeight:
                  1.6,
              }}
            >
              {
                language === "ar"
                  ? "الحالات الوقائية وحالات الضرر هي تجميع تنفيذي يجمع حالات تأثير الضرر وتعارضات الهوية الحرجة المرتبطة بالشخص الخطأ."
                  : "Protective / Harm Cases is an executive grouping combining harm-impact and critical wrong-person identity conflicts."
              }
            </div>
          </div>


          <div
            className="panel"
            style={{
              paddingBottom:
                "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {
                    language === "ar"
                      ? "نموذج سلامة الحالات"
                      : "CASE SAFETY MODEL"
                  }
                </div>

                <h2>
                  {
                    language === "ar"
                      ? "ضوابط الذكاء الاصطناعي الوقائية"
                      : "Protective AI Controls"
                  }
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>


            <div
              className="integrityInfo"
              style={{
                marginTop:
                  "16px",
              }}
            >
              <ShieldCheck size={21} />

              <div>
                <strong>
                  {
                    language === "ar"
                      ? "المرجع الرئيسي للقراءة فقط"
                      : "Master Reference Read Only"
                  }
                </strong>

                <span>
                  {
                    language === "ar"
                      ? "لا يمكن للذكاء الاصطناعي تعديل مصدر الهوية المعتمد تلقائيًا."
                      : "AI cannot automatically modify the authoritative identity source."
                  }
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <UserCheck size={21} />

              <div>
                <strong>
                  {
                    language === "ar"
                      ? "اعتماد بشري من مستويين"
                      : "Two-Level Human Approval"
                  }
                </strong>

                <span>
                  {
                    language === "ar"
                      ? "يلزم اعتماد ضابط المراقبة والمدير قبل تنفيذ أي تصحيح حساس."
                      : "Monitoring Officer and Manager approval are required before sensitive correction execution."
                  }
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <BadgeCheck size={21} />

              <div>
                <strong>
                  {
                    language === "ar"
                      ? "التحقق بعد التصحيح"
                      : "Post-Correction Verification"
                  }
                </strong>

                <span>
                  {
                    language === "ar"
                      ? "يجب أن ينجح كل تصحيح منفذ في التحقق قبل إمكانية إغلاق الحالة."
                      : "Every executed correction must pass verification before the case can be closed."
                  }
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <CheckCircle2 size={21} />

              <div>
                <strong>
                  {
                    language === "ar"
                      ? "يلزم الإغلاق بعد التحقق"
                      : "Verified Closure Required"
                  }
                </strong>

                <span>
                  {
                    language === "ar"
                      ? "نجاح التنفيذ وحده لا يغلق الحالة؛ يجب أن يؤكد التحقق صحة علاقة الهوية المصححة."
                      : "Successful execution alone does not close a case. Verification must confirm the corrected identity relationship."
                  }
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t("footer.platform")}
            {" · "}
            {t("footer.demo")}
          </span>

          <div>
            <Activity size={15} />

            {t("footer.monitoring")}
          </div>
        </footer>

      </main>
    </div>
  );
}