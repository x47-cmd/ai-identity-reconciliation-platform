"use client";

import Link from "next/link";

import Sidebar from "./components/Sidebar";
import { useLanguage } from "./components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "./lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSearch,
  Fingerprint,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";


/* =========================================================
   LANGUAGE
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
   WORKFLOW SNAPSHOT
   ========================================================= */

const AWAITING_REVIEW = 5;


/* =========================================================
   MAIN DASHBOARD METRICS
   ========================================================= */

const dashboardMetrics = [
  {
    key: "master",

    value: PLATFORM_METRICS.masterIdentities.toLocaleString(),

    icon: Database,

    en: {
      title: "Master Reference Records",

      subtitle:
        "Authoritative records used for biometric comparison",
    },

    ar: {
      title: "سجلات المرجع المعتمد",

      subtitle:
        "السجلات المرجعية المستخدمة في المطابقة البيومترية",
    },
  },

  {
    key: "biometric",

    value: PLATFORM_METRICS.biometricRecords.toLocaleString(),

    icon: Fingerprint,

    en: {
      title: "Biometric Records",

      subtitle:
        "Operational biometric records monitored by the system",
    },

    ar: {
      title: "السجلات البيومترية",

      subtitle:
        "السجلات التشغيلية التي تتم مراقبتها ومطابقتها",
    },
  },

  {
    key: "cases",

    value: String(
      PLATFORM_METRICS.aggregatedCases
    ),

    icon: FileSearch,

    en: {
      title: "Detected Cases",

      subtitle:
        "Matching and linking problems detected by the system",
    },

    ar: {
      title: "الحالات المكتشفة",

      subtitle:
        "مشكلات في المطابقة والربط رصدها النظام",
    },
  },

  {
    key: "review",

    value: String(
      AWAITING_REVIEW
    ),

    icon: UserCheck,

    en: {
      title: "Awaiting Review",

      subtitle:
        "Cases currently requiring a human decision",
    },

    ar: {
      title: "بانتظار المراجعة",

      subtitle:
        "حالات تحتاج حاليًا إلى قرار بشري",
    },
  },
];


/* =========================================================
   IMPORTANT CASES

   Synthetic demonstration names only.

   Identity-name policy:
   First Name + Second Name only.
   No third name, surname, family name or tribe name.
   ========================================================= */

const attentionCases = [
  {
    id: "CASE-2026-00002",

    person: {
      en: "Khalid Rashid",
      ar: "خالد راشد",
    },

    issue: "HARM_IMPACT",

    confidence: "99.98%",

    priority: "IMMEDIATE",

    status: "OFFICER_REVIEW",

    hasDetail: false,
  },

  {
    id: "CASE-2026-00003",

    person: {
      en: "Maryam Ahmed",
      ar: "مريم أحمد",
    },

    issue:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    confidence: "99.98%",

    priority: "IMMEDIATE",

    status: "AI_INVESTIGATED",

    hasDetail: false,
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    person:
      COMPLEX_DEMO_CASE.person,

    issue:
      COMPLEX_DEMO_CASE.caseType,

    confidence:
      `${COMPLEX_DEMO_CASE.aiConfidence}%`,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      COMPLEX_DEMO_CASE.finalStatus,

    hasDetail: true,
  },
];


/* =========================================================
   SMART MONITORING STATUS
   ========================================================= */

const aiStatus = [
  {
    icon: Activity,

    en: {
      title: "Continuous Monitoring",

      description:
        "New and changed biometric record relationships are monitored.",

      status: "Active",
    },

    ar: {
      title: "المراقبة المستمرة",

      description:
        "تتم مراقبة علاقات السجلات البيومترية الجديدة والمتغيرة.",

      status: "نشطة",
    },
  },

  {
    icon: Fingerprint,

    en: {
      title: "AI Biometric Reconciliation",

      description:
        "Biometric records are compared with the authoritative Master Reference.",

      status: "Active",
    },

    ar: {
      title: "المطابقة البيومترية بالذكاء الاصطناعي",

      description:
        "تتم مقارنة السجلات البيومترية مع المرجع الرئيسي المعتمد.",

      status: "نشطة",
    },
  },

  {
    icon: BrainCircuit,

    en: {
      title: "AI Case Analysis",

      description:
        "Detected conflicts are analyzed and prepared for human review.",

      status: "Active",
    },

    ar: {
      title: "تحليل الحالات بالذكاء الاصطناعي",

      description:
        "يتم تحليل التعارضات المكتشفة وتجهيز النتائج للمراجعة البشرية.",

      status: "نشط",
    },
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

function getIssueLabel(
  type,
  language
) {
  const labels = {
    HARM_IMPACT: {
      en: "Possible Wrong-Person Impact",
      ar: "احتمال تأثير على شخص آخر",
    },

    CRITICAL_HARM_IDENTITY_CONFLICT: {
      en: "Critical Identity Conflict",
      ar: "تعارض هوية حرج",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en: "Complex Identity Conflict",
      ar: "تعارض هوية معقد",
    },

    WRONG_MAPPING: {
      en: "Incorrect Record-to-Person Link",
      ar: "ربط السجل بشخص غير صحيح",
    },

    DATA_MISMATCH: {
      en: "Data Mismatch",
      ar: "اختلاف في البيانات",
    },

    DUPLICATE_IDENTITY: {
      en: "Duplicate Identity Record",
      ar: "سجل هوية مكرر",
    },

    ORPHAN_RECORD: {
      en: "Missing Reference Link",
      ar: "سجل بدون مرجع مرتبط",
    },
  };


  return (
    labels[type]?.[language]
    ||
    labels[type]?.en
    ||
    type
  );
}


function getStatusLabel(
  status,
  language
) {
  const labels = {
    OFFICER_REVIEW: {
      en: "Awaiting Officer Review",
      ar: "بانتظار مراجعة الضابط",
    },

    AI_INVESTIGATED: {
      en: "AI Analysis Complete",
      ar: "اكتمل تحليل الذكاء الاصطناعي",
    },

    VERIFIED_CLOSED: {
      en: "Resolved & Verified",
      ar: "تم الحل والتحقق",
    },
  };


  return (
    labels[status]?.[language]
    ||
    labels[status]?.en
    ||
    status
  );
}


function getPriorityLabel(
  priority,
  language
) {
  const labels = {
    IMMEDIATE: {
      en: "Urgent",
      ar: "فوري",
    },

    HIGH: {
      en: "High",
      ar: "مرتفع",
    },

    MEDIUM: {
      en: "Medium",
      ar: "متوسط",
    },
  };


  return (
    labels[priority]?.[language]
    ||
    labels[priority]?.en
    ||
    priority
  );
}


/* =========================================================
   METRIC CARD
   ========================================================= */

function MetricCard({
  item,
  language,
}) {
  const Icon =
    item.icon;

  const content =
    item[language]
    ||
    item.en;


  return (
    <div className="metricCard">

      <div className="metricTop">
        <div className="metricIcon">
          <Icon
            size={20}
            aria-hidden="true"
          />
        </div>

        <span className="metricStatus">
          {L(
            language,
            "DEMO DATA",
            "بيانات تجريبية"
          )}
        </span>
      </div>


      <div className="metricValue">
        {item.value}
      </div>


      <div className="metricTitle">
        {content.title}
      </div>


      <div className="metricSubtitle">
        {content.subtitle}
      </div>

    </div>
  );
}


/* =========================================================
   PRIORITY BADGE
   ========================================================= */

function PriorityBadge({
  priority,
  language,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";


  return (
    <span className={className}>
      {getPriorityLabel(
        priority,
        language
      )}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function Home() {
  const {
    language,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


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
              <Sparkles
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI BIOMETRIC MONITORING",
                "المراقبة البيومترية بالذكاء الاصطناعي"
              )}
            </div>


            <h1>
              {L(
                language,
                "Biometric Reconciliation Dashboard",
                "لوحة المطابقة البيومترية"
              )}
            </h1>


            <p>
              {L(
                language,

                "Monitor biometric records and their links with the authoritative reference, detect conflicts with AI, and route cases requiring action to the appropriate reviewer.",

                "مراقبة السجلات البيومترية وروابطها بالمرجع المعتمد، واكتشاف التعارضات بالذكاء الاصطناعي وتحويل الحالات التي تحتاج إلى إجراء للموظف المختص."
              )}
            </p>

          </div>


          <div className="topbarActions">

            <Link
              href="/cases"
              className="searchButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>
                {L(
                  language,
                  "Search Cases",
                  "البحث في الحالات"
                )}
              </span>
            </Link>

          </div>

        </header>


        {/* ================================================
            SIMPLE EXPLANATION
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
          <ShieldCheck
            size={24}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "What does the system monitor?",
                "ماذا يراقب النظام؟"
              )}
            </strong>


            <span>
              {L(
                language,

                `The system continuously compares ${PLATFORM_METRICS.biometricRecords.toLocaleString()} biometric records with ${PLATFORM_METRICS.masterIdentities.toLocaleString()} authoritative reference records. AI detected ${PLATFORM_METRICS.aggregatedCases} cases that require investigation, review or follow-up.`,

                `يقارن النظام بشكل مستمر ${PLATFORM_METRICS.biometricRecords.toLocaleString()} سجل بيومتري مع ${PLATFORM_METRICS.masterIdentities.toLocaleString()} سجل في المرجع المعتمد. واكتشف الذكاء الاصطناعي ${PLATFORM_METRICS.aggregatedCases} حالة تحتاج إلى تحقيق أو مراجعة أو متابعة.`
              )}
            </span>

          </div>
        </section>


        {/* ================================================
            MAIN KPIs
            ================================================ */}

        <section className="statsGrid">

          {dashboardMetrics.map(
            (item) => (
              <MetricCard
                key={item.key}
                item={item}
                language={
                  language
                }
              />
            )
          )}

        </section>


        {/* ================================================
            URGENT NOTICE
            ================================================ */}

        <section className="alertBanner">

          <div className="alertIcon">
            <AlertTriangle
              size={24}
              aria-hidden="true"
            />
          </div>


          <div className="alertText">

            <strong>
              {L(
                language,

                `${PLATFORM_METRICS.priority.immediate} urgent cases require priority attention`,

                `${PLATFORM_METRICS.priority.immediate} حالات فورية تحتاج إلى أولوية في المتابعة`
              )}
            </strong>


            <span>
              {L(
                language,

                "These cases include conflicts where an incorrect biometric-to-person relationship may affect another person. AI assesses the risk, while the final decision remains with authorized staff.",

                "تشمل هذه الحالات تعارضات قد يؤدي فيها ربط السجل البيومتري بشخص غير صحيح إلى التأثير على شخص آخر. يحلل الذكاء الاصطناعي مستوى الخطر، بينما يبقى القرار النهائي لدى الموظفين المخولين."
              )}
            </span>

          </div>


          <Link
            href="/cases"
            className="bannerButton"
          >
            {L(
              language,
              "View Cases",
              "عرض الحالات"
            )}

            <ChevronRight
              size={17}
              style={arrowStyle}
              aria-hidden="true"
            />
          </Link>

        </section>


        {/* ================================================
            CASES + AI STATUS
            ================================================ */}

        <section className="dashboardGrid">

          {/* IMPORTANT CASES */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASES REQUIRING ATTENTION",
                    "حالات تحتاج إلى متابعة"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Priority Cases",
                    "الحالات المهمة"
                  )}
                </h2>

              </div>


              <Link
                href="/cases"
                className="textButton"
                style={{
                  textDecoration:
                    "none",
                }}
              >
                {L(
                  language,
                  "View All",
                  "عرض الكل"
                )}

                <ChevronRight
                  size={16}
                  style={arrowStyle}
                  aria-hidden="true"
                />
              </Link>

            </div>


            <div
              style={{
                padding:
                  "5px 18px",
              }}
            >
              {attentionCases.map(
                (item) => {

                  const personName =
                    item.person?.[
                      language
                    ]
                    ||
                    item.person?.en
                    ||
                    item.id;


                  const content = (
                    <>
                      <div
                        style={{
                          flex:
                            "1 1 180px",
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#e1eaf6",

                            fontSize:
                              "12px",
                          }}
                        >
                          {personName}
                        </strong>

                        <span
                          dir="ltr"
                          style={{
                            display:
                              "block",

                            marginTop:
                              "4px",

                            color:
                              "#63768e",

                            fontSize:
                              "9px",
                          }}
                        >
                          {item.id}
                        </span>
                      </div>


                      <div
                        style={{
                          flex:
                            "1.2 1 190px",
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#b9c7d8",

                            fontSize:
                              "11px",
                          }}
                        >
                          {getIssueLabel(
                            item.issue,
                            language
                          )}
                        </strong>

                        <span
                          style={{
                            display:
                              "block",

                            marginTop:
                              "4px",

                            color:
                              "#687b93",

                            fontSize:
                              "9px",
                          }}
                        >
                          {L(
                            language,
                            `AI confidence ${item.confidence}`,
                            `ثقة تحليل الذكاء الاصطناعي ${item.confidence}`
                          )}
                        </span>
                      </div>


                      <div
                        style={{
                          flex:
                            "1 1 160px",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#76a9ff",

                            fontSize:
                              "10px",

                            fontWeight:
                              700,
                          }}
                        >
                          {getStatusLabel(
                            item.status,
                            language
                          )}
                        </span>
                      </div>


                      <PriorityBadge
                        priority={
                          item.priority
                        }
                        language={
                          language
                        }
                      />
                    </>
                  );


                  return item.hasDetail ? (
                    <Link
                      key={item.id}
                      href={
                        `/cases/${item.id}`
                      }
                      style={{
                        display:
                          "flex",

                        flexWrap:
                          "wrap",

                        alignItems:
                          "center",

                        gap:
                          "14px",

                        padding:
                          "16px 0",

                        borderBottom:
                          "1px solid rgba(255,255,255,0.045)",

                        textDecoration:
                          "none",

                        color:
                          "inherit",
                      }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div
                      key={item.id}
                      style={{
                        display:
                          "flex",

                        flexWrap:
                          "wrap",

                        alignItems:
                          "center",

                        gap:
                          "14px",

                        padding:
                          "16px 0",

                        borderBottom:
                          "1px solid rgba(255,255,255,0.045)",
                      }}
                    >
                      {content}
                    </div>
                  );
                }
              )}
            </div>


            <div
              style={{
                padding:
                  "13px 18px",

                color:
                  "#657890",

                fontSize:
                  "9px",

                lineHeight:
                  1.6,
              }}
            >
              {L(
                language,

                "AI analyzes biometric and reference evidence, identifies likely conflicts and prepares recommendations. Sensitive corrections still require human approval.",

                "يحلل الذكاء الاصطناعي الأدلة البيومترية والبيانات المرجعية، ويحدد التعارضات المحتملة ويجهز التوصيات، بينما تتطلب التصحيحات الحساسة اعتمادًا بشريًا."
              )}
            </div>

          </div>


          {/* SMART MONITORING */}

          <div className="panel agentPanel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI MONITORING",
                    "المراقبة الذكية"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Smart Monitoring Status",
                    "حالة النظام الذكي"
                  )}
                </h2>

              </div>


              <BrainCircuit
                size={22}
                aria-hidden="true"
              />

            </div>


            <div className="agentList">

              {aiStatus.map(
                (
                  item,
                  index
                ) => {

                  const Icon =
                    item.icon;

                  const content =
                    item[language]
                    ||
                    item.en;


                  return (
                    <div
                      className="agentItem"
                      key={index}
                    >

                      <div className="agentLeft">

                        <div className="agentIcon">
                          <Icon
                            size={18}
                            aria-hidden="true"
                          />
                        </div>


                        <div>

                          <strong>
                            {content.title}
                          </strong>

                          <span>
                            {
                              content.description
                            }
                          </span>

                        </div>

                      </div>


                      <div className="agentStatus">

                        <div
                          className="greenDot"
                          aria-hidden="true"
                        />

                        {content.status}

                      </div>

                    </div>
                  );
                }
              )}

            </div>


            <div
              style={{
                padding:
                  "13px 17px",

                borderTop:
                  "1px solid rgba(255,255,255,0.05)",

                color:
                  "#687b93",

                fontSize:
                  "9px",

                lineHeight:
                  1.6,
              }}
            >
              {L(
                language,

                "AI supports continuous monitoring, biometric reconciliation, case analysis and recommendations. It cannot independently approve or execute sensitive corrections.",

                "يدعم الذكاء الاصطناعي المراقبة المستمرة والمطابقة البيومترية وتحليل الحالات وتجهيز التوصيات، ولا يستطيع اعتماد أو تنفيذ التصحيحات الحساسة بشكل مستقل."
              )}
            </div>

          </div>

        </section>


        {/* ================================================
            LATEST RESOLVED CASE
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
                  "LATEST COMPLETED CASE",
                  "آخر حالة مكتملة"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Resolved & Verified",
                  "تم الحل والتحقق"
                )}
              </h2>

            </div>


            <CheckCircle2
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              padding:
                "20px",
            }}
          >

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "flex-start",

                justifyContent:
                  "space-between",

                gap:
                  "16px",

                flexWrap:
                  "wrap",
              }}
            >

              <div>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#e1eaf6",

                    fontSize:
                      "15px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.person?.[
                      language
                    ]
                    ||
                    VERIFIED_DEMO_CASE.person?.en
                    ||
                    VERIFIED_DEMO_CASE.id
                  }
                </strong>


                <span
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#657890",

                    fontSize:
                      "10px",

                    marginTop:
                      "4px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.id
                  }

                  {" · "}

                  {
                    VERIFIED_DEMO_CASE.biometricId
                  }
                </span>

              </div>


              <span
                style={{
                  display:
                    "inline-flex",

                  alignItems:
                    "center",

                  minHeight:
                    "27px",

                  padding:
                    "0 11px",

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
                {L(
                  language,
                  "RESOLVED & VERIFIED",
                  "تم الحل والتحقق"
                )}
              </span>

            </div>


            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",

                gap:
                  "10px",

                marginTop:
                  "18px",
              }}
            >

              <div
                style={{
                  padding:
                    "14px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(255,80,100,0.04)",

                  border:
                    "1px solid rgba(255,80,100,0.08)",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#8f6b72",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Previous Incorrect Link",
                    "الربط السابق الخاطئ"
                  )}
                </span>


                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#ff7c89",

                    fontSize:
                      "13px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.currentIdentity
                  }
                </strong>

              </div>


              <div
                style={{
                  padding:
                    "14px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(52,211,153,0.04)",

                  border:
                    "1px solid rgba(52,211,153,0.08)",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#628b7b",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Verified Reference",
                    "المرجع الصحيح بعد التحقق"
                  )}
                </span>


                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#59cfa0",

                    fontSize:
                      "13px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.canonicalIdentity
                  }
                </strong>

              </div>

            </div>


            <div
              style={{
                marginTop:
                  "12px",
              }}
            >

              <div className="detailRow">

                <span>
                  {L(
                    language,
                    "AI Analysis Confidence",
                    "ثقة تحليل الذكاء الاصطناعي"
                  )}
                </span>

                <strong dir="ltr">
                  {
                    VERIFIED_DEMO_CASE.aiConfidence
                  }%
                </strong>

              </div>


              <div className="detailRow">

                <span>
                  {L(
                    language,
                    "Human Approval",
                    "الاعتماد البشري"
                  )}
                </span>

                <strong>
                  {L(
                    language,
                    "Officer + Manager Approved",
                    "اعتماد الضابط والمدير"
                  )}
                </strong>

              </div>


              <div className="detailRow">

                <span>
                  {L(
                    language,
                    "Post-Correction Verification",
                    "التحقق بعد التصحيح"
                  )}
                </span>

                <strong className="successText">
                  {L(
                    language,
                    "Passed",
                    "ناجح"
                  )}

                  {" · "}

                  {
                    VERIFIED_DEMO_CASE.verification.score
                  }
                </strong>

              </div>

            </div>


            <Link
              href={
                `/cases/${VERIFIED_DEMO_CASE.id}`
              }
              className="primaryButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              {L(
                language,
                "View Case Details",
                "عرض تفاصيل الحالة"
              )}

              <ChevronRight
                size={18}
                style={arrowStyle}
                aria-hidden="true"
              />
            </Link>

          </div>

        </section>


        {/* ================================================
            DATA PROTECTION
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

          <Database
            size={23}
            aria-hidden="true"
          />


          <div>

            <strong>
              {L(
                language,
                "Master Reference Protected",
                "المرجع الرئيسي محمي"
              )}
            </strong>


            <span>
              {L(
                language,

                "The authoritative Master Reference remains read-only. Approved corrections can only target the permitted Biometric System after the required human approvals.",

                "يبقى المرجع الرئيسي المعتمد للقراءة فقط، ولا يتم تنفيذ التصحيح إلا على النظام البيومتري المسموح وبعد الحصول على الاعتمادات البشرية المطلوبة."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">

          <span>
            {L(
              language,
              "AI Biometric Reconciliation Platform · Synthetic Demo",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · عرض تجريبي"
            )}
          </span>


          <div>

            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Continuous Monitoring Active",
              "المراقبة المستمرة نشطة"
            )}

          </div>

        </footer>

      </main>

    </div>
  );
}