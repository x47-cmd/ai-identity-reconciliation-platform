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
   DEMO SNAPSHOT
   ========================================================= */

const MASTER_IDENTITIES = 3000;
const BIOMETRIC_RECORDS = 1000;
const AWAITING_REVIEW = 5;


/* =========================================================
   MAIN DASHBOARD METRICS
   ========================================================= */

const dashboardMetrics = [
  {
    key: "master",
    value: "3,000",
    icon: Database,

    en: {
      title: "Reference Identities",
      subtitle:
        "Authoritative identities used for comparison",
    },

    ar: {
      title: "الهويات المرجعية",
      subtitle:
        "الهويات المعتمدة المستخدمة في المطابقة",
    },
  },

  {
    key: "biometric",
    value: "1,000",
    icon: Fingerprint,

    en: {
      title: "Biometric Records",
      subtitle:
        "Operational records monitored by the system",
    },

    ar: {
      title: "السجلات البيومترية",
      subtitle:
        "السجلات التشغيلية التي يراقبها النظام",
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
        "Identity issues detected for investigation",
    },

    ar: {
      title: "الحالات المكتشفة",
      subtitle:
        "مشكلات هوية رصدها النظام للتحقيق",
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

   Names are synthetic demonstration names.
   ========================================================= */

const attentionCases = [
  {
    id: "CASE-2026-00002",

    person: {
      en: "Khalid Rashid Al Mansoori",
      ar: "خالد راشد المنصوري",
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
      en: "Maryam Ahmed Al Nuaimi",
      ar: "مريم أحمد النعيمي",
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

    person: {
      en: "Ali Saeed Al Dhaheri",
      ar: "علي سعيد الظاهري",
    },

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
   SIMPLE AI STATUS
   ========================================================= */

const aiStatus = [
  {
    icon: Activity,

    en: {
      title: "Continuous Monitoring",
      description:
        "New and changed biometric relationships are monitored.",
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
      title: "AI Identity Comparison",
      description:
        "Biometric relationships are compared with the Master Reference.",
      status: "Active",
    },

    ar: {
      title: "مطابقة الهوية بالذكاء الاصطناعي",
      description:
        "تتم مقارنة علاقات السجلات البيومترية مع المرجع الرئيسي.",
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
        "يتم تحليل التعارضات المكتشفة وتجهيزها للمراجعة البشرية.",
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
      en: "Incorrect Identity Link",
      ar: "ربط هوية غير صحيح",
    },

    DATA_MISMATCH: {
      en: "Data Mismatch",
      ar: "اختلاف في البيانات",
    },

    DUPLICATE_IDENTITY: {
      en: "Duplicate Identity",
      ar: "هوية مكررة",
    },

    ORPHAN_RECORD: {
      en: "Missing Identity Link",
      ar: "سجل بدون هوية مرتبطة",
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
            "LIVE DEMO",
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
                "AI IDENTITY MONITORING",
                "مراقبة الهوية بالذكاء الاصطناعي"
              )}
            </div>


            <h1>
              {L(
                language,
                "Identity Monitoring Dashboard",
                "لوحة مراقبة الهوية"
              )}
            </h1>


            <p>
              {L(
                language,

                "Monitor identity relationships, detect problems with AI, and send cases that require action to the appropriate human reviewer.",

                "مراقبة علاقات الهوية واكتشاف المشكلات بالذكاء الاصطناعي وتحويل الحالات التي تحتاج إجراء إلى الموظف المختص."
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
                "What is the system monitoring?",
                "ماذا يراقب النظام؟"
              )}
            </strong>

            <span>
              {L(
                language,

                `The system compares ${BIOMETRIC_RECORDS.toLocaleString()} biometric records with ${MASTER_IDENTITIES.toLocaleString()} authoritative identities. AI analysis detected ${PLATFORM_METRICS.aggregatedCases} identity cases that require investigation or follow-up.`,

                `يقارن النظام ${BIOMETRIC_RECORDS.toLocaleString()} سجل بيومتري مع ${MASTER_IDENTITIES.toLocaleString()} هوية معتمدة. واكتشف تحليل الذكاء الاصطناعي ${PLATFORM_METRICS.aggregatedCases} حالة هوية تحتاج إلى تحقيق أو متابعة.`
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

                "These cases include identity conflicts where an incorrect relationship may affect another person. AI identifies the risk, but the final decision remains with authorized staff.",

                "تشمل هذه الحالات تعارضات هوية قد يؤدي فيها الربط الخاطئ إلى التأثير على شخص آخر. يحدد الذكاء الاصطناعي مستوى الخطر، بينما يبقى القرار النهائي لدى الموظفين المخولين."
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
                    item.person[
                      language
                    ]
                    ||
                    item.person.en;


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

                "AI analyzes the evidence, identifies likely identity conflicts and prepares recommendations. Sensitive corrections still require human approval.",

                "يحلل الذكاء الاصطناعي الأدلة ويحدد تعارضات الهوية المحتملة ويجهز التوصيات، بينما تتطلب التصحيحات الحساسة اعتمادًا بشريًا."
              )}
            </div>

          </div>


          {/* SIMPLE AI STATUS */}

          <div className="panel agentPanel">

            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI SYSTEM",
                    "النظام الذكي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Smart Monitoring Status",
                    "حالة المراقبة الذكية"
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

                "The AI supports monitoring, analysis and recommendations. It cannot independently approve or execute sensitive identity changes.",

                "يدعم الذكاء الاصطناعي المراقبة والتحليل والتوصيات، ولا يمكنه اعتماد أو تنفيذ تغييرات حساسة على الهوية بشكل مستقل."
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
                  {L(
                    language,
                    "Salem Mohammed Al Kaabi",
                    "سالم محمد الكعبي"
                  )}
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
                    "Incorrect Link",
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
                    "Verified Identity",
                    "الهوية الصحيحة بعد التحقق"
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

                "يبقى المرجع الرئيسي المعتمد للقراءة فقط. ولا يتم تنفيذ أي تصحيح إلا على النظام البيومتري المسموح وبعد الحصول على الاعتمادات البشرية المطلوبة."
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
              "AI Identity Reconciliation Platform · Synthetic Demo",
              "منصة مطابقة الهوية بالذكاء الاصطناعي · عرض تجريبي"
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