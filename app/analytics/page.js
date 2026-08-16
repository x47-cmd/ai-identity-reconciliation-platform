"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  CASE_TYPE_BREAKDOWN,
  PLATFORM_METRICS,
} from "../lib/demo-data";

import {
  Activity,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSearch,
  Gauge,
  ShieldAlert,
  ShieldCheck,
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
   HELPERS
   ========================================================= */

function percentage(
  value
) {
  if (
    !PLATFORM_METRICS.aggregatedCases
  ) {
    return 0;
  }

  return Number(
    (
      value /
      PLATFORM_METRICS.aggregatedCases *
      100
    ).toFixed(1)
  );
}


function caseTypeLabel(
  type,
  language
) {
  const labels = {
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

    HARM_IMPACT: {
      en:
        "Possible Wrong-Person Impact",

      ar:
        "احتمال تأثير على شخص آخر",
    },

    CRITICAL_HARM_IDENTITY_CONFLICT: {
      en:
        "Critical Identity Conflict",

      ar:
        "تعارض هوية حرج",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en:
        "Complex Identity Conflict",

      ar:
        "تعارض هوية معقد",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Identity",

      ar:
        "هوية مكررة",
    },

    ORPHAN_RECORD: {
      en:
        "Missing Identity Link",

      ar:
        "سجل بدون هوية مرتبطة",
    },
  };


  return (
    labels[type]?.[
      language
    ] ||
    labels[type]?.en ||
    type
  );
}


/* =========================================================
   PRIORITY DATA
   ========================================================= */

const priorityData = [
  {
    key:
      "IMMEDIATE",

    value:
      PLATFORM_METRICS.priority.immediate,
  },

  {
    key:
      "HIGH",

    value:
      PLATFORM_METRICS.priority.high,
  },

  {
    key:
      "MEDIUM",

    value:
      PLATFORM_METRICS.priority.medium,
  },
];


function priorityLabel(
  key,
  language
) {
  const labels = {
    IMMEDIATE: {
      en:
        "Urgent",

      ar:
        "فوري",
    },

    HIGH: {
      en:
        "High",

      ar:
        "مرتفع",
    },

    MEDIUM: {
      en:
        "Medium",

      ar:
        "متوسط",
    },
  };


  return (
    labels[key]?.[
      language
    ] ||
    key
  );
}


/* =========================================================
   KPI CARD
   ========================================================= */

function Metric({
  icon: Icon,
  value,
  title,
  description,
  success = false,
}) {
  return (
    <div className="metricCard">

      <div className="metricIcon">
        <Icon
          size={20}
          aria-hidden="true"
        />
      </div>


      <div
        className="metricValue"
        style={
          success
            ? {
                color:
                  "#59cfa0",
              }
            : undefined
        }
      >
        {value}
      </div>


      <div className="metricTitle">
        {title}
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

export default function AnalyticsPage() {
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


  const maxCaseType =
    Math.max(
      ...CASE_TYPE_BREAKDOWN.map(
        (item) =>
          item.count
      )
    );


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
              <BarChart3
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI PERFORMANCE & MANAGEMENT KPIs",
                "أداء الذكاء الاصطناعي ومؤشرات الإدارة"
              )}
            </div>


            <h1>
              {L(
                language,
                "Analytics",
                "التحليلات"
              )}
            </h1>


            <p>
              {L(
                language,
                "Management view of identity cases, priorities, AI performance, approvals and resolution results.",
                "عرض إداري لحالات الهوية والأولويات وأداء الذكاء الاصطناعي والموافقات ونتائج معالجة الحالات."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            DATA SCOPE
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

          <Database
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "Current monitoring scope",
                "نطاق المراقبة الحالي"
              )}
            </strong>


            <span>
              {L(
                language,

                `The synthetic demonstration compares ${PLATFORM_METRICS.biometricRecords.toLocaleString()} biometric records with ${PLATFORM_METRICS.masterIdentities.toLocaleString()} authoritative identities. The system detected ${PLATFORM_METRICS.aggregatedCases} identity cases.`,

                `يقارن العرض التجريبي ${PLATFORM_METRICS.biometricRecords.toLocaleString()} سجل بيومتري مع ${PLATFORM_METRICS.masterIdentities.toLocaleString()} هوية معتمدة، واكتشف النظام ${PLATFORM_METRICS.aggregatedCases} حالة تحتاج إلى المتابعة.`
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            MANAGEMENT KPIs
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={FileSearch}
            value={
              PLATFORM_METRICS.aggregatedCases
            }
            title={
              L(
                language,
                "Detected Cases",
                "الحالات المكتشفة"
              )
            }
            description={
              L(
                language,
                "Identity cases requiring investigation or follow-up",
                "حالات تحتاج إلى تحقيق أو متابعة"
              )
            }
          />


          <Metric
            icon={ShieldAlert}
            value={
              PLATFORM_METRICS.priority.immediate
            }
            title={
              L(
                language,
                "Urgent Cases",
                "حالات فورية"
              )
            }
            description={
              L(
                language,
                "Require priority human attention",
                "تحتاج إلى أولوية في المراجعة"
              )
            }
          />


          <Metric
            icon={UserCheck}
            value="5"
            title={
              L(
                language,
                "Awaiting Review",
                "بانتظار المراجعة"
              )
            }
            description={
              L(
                language,
                "Cases currently waiting for a human decision",
                "حالات تنتظر قرارًا بشريًا"
              )
            }
          />


          <Metric
            icon={CheckCircle2}
            value={
              PLATFORM_METRICS.unresolvedIdentityCases
            }
            title={
              L(
                language,
                "Unresolved Identity",
                "هويات غير محسومة"
              )
            }
            description={
              L(
                language,
                "Cases without an identity candidate",
                "حالات لم يتم تحديد هوية مرجحة لها"
              )
            }
            success={
              PLATFORM_METRICS.unresolvedIdentityCases ===
              0
            }
          />

        </section>


        {/* ================================================
            AI PERFORMANCE
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
                  "AI QUALITY",
                  "جودة الذكاء الاصطناعي"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "AI Detection Performance",
                  "أداء الاكتشاف بالذكاء الاصطناعي"
                )}
              </h2>
            </div>


            <BrainCircuit
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",

              gap:
                "10px",

              padding:
                "20px",
            }}
          >

            <Metric
              icon={Gauge}
              value={
                `${PLATFORM_METRICS.evaluation.recall}%`
              }
              title={
                L(
                  language,
                  "Detection Recall",
                  "نسبة اكتشاف الحالات"
                )
              }
              description={
                L(
                  language,
                  "Expected synthetic issues successfully detected",
                  "المشكلات التجريبية المتوقعة التي تم اكتشافها"
                )
              }
              success
            />


            <Metric
              icon={BrainCircuit}
              value={
                `${PLATFORM_METRICS.evaluation.diagnosticPrecision}%`
              }
              title={
                L(
                  language,
                  "Diagnostic Precision",
                  "دقة التحليل النهائي"
                )
              }
              description={
                L(
                  language,
                  "Accuracy after related findings were analyzed",
                  "الدقة بعد تحليل وتجميع النتائج المرتبطة"
                )
              }
              success
            />


            <Metric
              icon={ShieldCheck}
              value={
                `${PLATFORM_METRICS.evaluation.protectiveDetectionRecall}%`
              }
              title={
                L(
                  language,
                  "Protective Detection",
                  "اكتشاف الحالات الحساسة"
                )
              }
              description={
                L(
                  language,
                  "Wrong-person impact cases successfully identified",
                  "الحالات التي قد تؤثر على شخص آخر وتم اكتشافها"
                )
              }
              success
            />


            <Metric
              icon={CheckCircle2}
              value={
                PLATFORM_METRICS.evaluation.unexplainedFalsePositives
              }
              title={
                L(
                  language,
                  "Unexplained Alerts",
                  "تنبيهات غير مفسرة"
                )
              }
              description={
                L(
                  language,
                  "Alerts remaining without supporting explanation",
                  "تنبيهات بقيت دون تفسير أو دليل داعم"
                )
              }
              success={
                PLATFORM_METRICS.evaluation.unexplainedFalsePositives ===
                0
              }
            />

          </div>


          <div
            style={{
              padding:
                "0 20px 20px",

              color:
                "#70839b",

              fontSize:
                "10px",

              lineHeight:
                1.65,
            }}
          >
            {L(
              language,

              "These values are based on the synthetic evaluation dataset. Related raw findings are combined and analyzed before the system presents the final case-level result.",

              "تعتمد هذه المؤشرات على مجموعة البيانات التجريبية الاصطناعية. ويتم تجميع وتحليل النتائج الأولية المرتبطة قبل عرض النتيجة النهائية على مستوى الحالة."
            )}
          </div>

        </section>


        {/* ================================================
            PRIORITIES + CASE TYPES
            ================================================ */}

        <section className="dashboardGrid">

          {/* PRIORITY DISTRIBUTION */}

          <div className="panel">

            <div className="panelHeader">

              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE PRIORITIES",
                    "أولويات الحالات"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Priority Distribution",
                    "توزيع الحالات حسب الأولوية"
                  )}
                </h2>
              </div>

              <ShieldAlert
                size={22}
                aria-hidden="true"
              />

            </div>


            <div
              style={{
                padding:
                  "10px 20px 20px",
              }}
            >

              {priorityData.map(
                (item) => {

                  const width =
                    percentage(
                      item.value
                    );


                  return (
                    <div
                      key={
                        item.key
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
                            "center",

                          gap:
                            "12px",

                          marginBottom:
                            "8px",
                        }}
                      >

                        <span
                          style={{
                            color:
                              "#93a4b9",

                            fontSize:
                              "11px",
                          }}
                        >
                          {priorityLabel(
                            item.key,
                            language
                          )}
                        </span>


                        <div>
                          <strong
                            style={{
                              color:
                                "#d1ddeb",

                              fontSize:
                                "11px",
                            }}
                          >
                            {item.value}
                          </strong>

                          <span
                            style={{
                              color:
                                "#71839a",

                              fontSize:
                                "9px",

                              marginInlineStart:
                                "7px",
                            }}
                          >
                            {width}%
                          </span>
                        </div>

                      </div>


                      <div className="progress">

                        <div
                          className="progressFill"
                          style={{
                            width:
                              `${width}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>


          {/* CASE TYPES */}

          <div className="panel">

            <div className="panelHeader">

              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "IDENTITY ISSUES",
                    "أنواع مشكلات الهوية"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Case Type Breakdown",
                    "توزيع الحالات حسب المشكلة"
                  )}
                </h2>
              </div>

              <BarChart3
                size={22}
                aria-hidden="true"
              />

            </div>


            <div
              style={{
                padding:
                  "10px 20px 20px",
              }}
            >

              {CASE_TYPE_BREAKDOWN.map(
                (item) => {

                  const width =
                    maxCaseType > 0
                      ? (
                          item.count /
                          maxCaseType
                        ) *
                        100
                      : 0;


                  return (
                    <div
                      key={
                        item.type
                      }
                      style={{
                        padding:
                          "10px 0",
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",

                          justifyContent:
                            "space-between",

                          gap:
                            "12px",

                          marginBottom:
                            "7px",
                        }}
                      >

                        <span
                          style={{
                            color:
                              "#92a4b9",

                            fontSize:
                              "10px",
                          }}
                        >
                          {caseTypeLabel(
                            item.type,
                            language
                          )}
                        </span>


                        <strong
                          style={{
                            color:
                              "#d0dceb",

                            fontSize:
                              "10px",
                          }}
                        >
                          {item.count}
                        </strong>

                      </div>


                      <div className="progress">

                        <div
                          className="progressFill"
                          style={{
                            width:
                              `${width}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </section>


        {/* ================================================
            WORKFLOW
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
                  "CURRENT WORKFLOW",
                  "حالة سير العمل"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Where are the cases now?",
                  "وين وصلت الحالات؟"
                )}
              </h2>
            </div>

            <Activity
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(5,minmax(0,1fr))",

              gap:
                "9px",

              padding:
                "20px",
            }}
          >

            {[
              {
                value:
                  PLATFORM_METRICS.aggregatedCases,

                en:
                  "Detected",

                ar:
                  "تم اكتشافها",
              },

              {
                value:
                  5,

                en:
                  "Waiting for Officer",

                ar:
                  "بانتظار الضابط",
              },

              {
                value:
                  3,

                en:
                  "Waiting for Manager",

                ar:
                  "بانتظار المدير",
              },

              {
                value:
                  1,

                en:
                  "Correction Completed",

                ar:
                  "تم التصحيح",
              },

              {
                value:
                  1,

                en:
                  "Verified & Closed",

                ar:
                  "تم التحقق والإغلاق",
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    item.en
                  }
                  style={{
                    padding:
                      "15px",

                    borderRadius:
                      "11px",

                    background:
                      "rgba(255,255,255,0.024)",

                    border:
                      "1px solid rgba(255,255,255,0.05)",
                  }}
                >

                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#5f8fce",

                      fontSize:
                        "9px",

                      fontWeight:
                        800,
                    }}
                  >
                    {L(
                      language,
                      `STEP ${index + 1}`,
                      `المرحلة ${index + 1}`
                    )}
                  </span>


                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        index ===
                        4
                          ? "#59cfa0"
                          : "#d8e3f0",

                      fontSize:
                        "23px",

                      marginTop:
                        "8px",
                    }}
                  >
                    {item.value}
                  </strong>


                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#71839a",

                      fontSize:
                        "10px",

                      lineHeight:
                        1.45,

                      marginTop:
                        "4px",
                    }}
                  >
                    {L(
                      language,
                      item.en,
                      item.ar
                    )}
                  </span>

                </div>
              )
            )}

          </div>


          <div
            style={{
              padding:
                "0 20px 20px",

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
              "Workflow values are a demonstration snapshot and are not separate totals that must add up to the total number of cases.",
              "تمثل أرقام سير العمل لقطة تجريبية للحالة الحالية، وليست أرقامًا منفصلة يجب أن يساوي مجموعها إجمالي الحالات."
            )}
          </div>

        </section>


        {/* ================================================
            POWER BI
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
                  "MANAGEMENT REPORTING",
                  "تقارير الإدارة"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Power BI Dashboard",
                  "لوحة Power BI"
                )}
              </h2>
            </div>

            <BarChart3
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1.15fr 0.85fr",

              gap:
                "15px",

              padding:
                "20px",
            }}
          >

            {/* POWER BI PREVIEW */}

            <div
              style={{
                padding:
                  "22px",

                minHeight:
                  "260px",

                borderRadius:
                  "14px",

                background:
                  "rgba(70,140,255,0.04)",

                border:
                  "1px solid rgba(70,140,255,0.09)",
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "10px",
                }}
              >

                <div className="metricIcon">
                  <BarChart3
                    size={21}
                    aria-hidden="true"
                  />
                </div>


                <div>

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#d2dfed",

                      fontSize:
                        "12px",
                    }}
                  >
                    {L(
                      language,
                      "Executive Identity Dashboard",
                      "لوحة مؤشرات الهوية التنفيذية"
                    )}
                  </strong>


                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#71839a",

                      fontSize:
                        "10px",

                      marginTop:
                        "4px",
                    }}
                  >
                    {L(
                      language,
                      "Power BI integration planned",
                      "تكامل Power BI مخطط له"
                    )}
                  </span>

                </div>

              </div>


              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(3,minmax(0,1fr))",

                  gap:
                    "9px",

                  marginTop:
                    "22px",
                }}
              >

                {[
                  {
                    label:
                      L(
                        language,
                        "Cases",
                        "الحالات"
                      ),

                    value:
                      PLATFORM_METRICS.aggregatedCases,
                  },

                  {
                    label:
                      L(
                        language,
                        "Urgent",
                        "فورية"
                      ),

                    value:
                      PLATFORM_METRICS.priority.immediate,
                  },

                  {
                    label:
                      L(
                        language,
                        "AI Detection",
                        "اكتشاف AI"
                      ),

                    value:
                      `${PLATFORM_METRICS.evaluation.recall}%`,
                  },
                ].map(
                  (item) => (
                    <div
                      key={
                        item.label
                      }
                      style={{
                        padding:
                          "14px",

                        borderRadius:
                          "10px",

                        background:
                          "rgba(255,255,255,0.025)",

                        border:
                          "1px solid rgba(255,255,255,0.05)",
                      }}
                    >

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#71839a",

                          fontSize:
                            "9px",
                        }}
                      >
                        {item.label}
                      </span>


                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#d8e3ef",

                          fontSize:
                            "20px",

                          marginTop:
                            "5px",
                        }}
                      >
                        {item.value}
                      </strong>

                    </div>
                  )
                )}

              </div>


              <div
                style={{
                  marginTop:
                    "18px",

                  padding:
                    "13px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(255,185,90,0.04)",

                  border:
                    "1px solid rgba(255,185,90,0.08)",

                  color:
                    "#a18a63",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,
                  "This is a frontend preview. Live Power BI embedding is planned and is not connected in the current demonstration.",
                  "هذه معاينة داخل الواجهة فقط. ربط Power BI الفعلي مخطط له وغير متصل في النسخة التجريبية الحالية."
                )}
              </div>

            </div>


            {/* PLANNED CONTENT */}

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "PLANNED POWER BI CONTENT",
                  "المحتوى المخطط له في Power BI"
                )}
              </div>


              <div
                style={{
                  marginTop:
                    "13px",
                }}
              >

                {[
                  {
                    en:
                      "Case volumes and trends",

                    ar:
                      "أعداد الحالات واتجاهاتها",
                  },

                  {
                    en:
                      "Priority and risk distribution",

                    ar:
                      "توزيع الأولويات والمخاطر",
                  },

                  {
                    en:
                      "AI detection performance",

                    ar:
                      "أداء اكتشاف الذكاء الاصطناعي",
                  },

                  {
                    en:
                      "Officer and Manager approvals",

                    ar:
                      "اعتمادات الضابط والمدير",
                  },

                  {
                    en:
                      "Correction and verification results",

                    ar:
                      "نتائج التصحيح والتحقق",
                  },
                ].map(
                  (item) => (
                    <div
                      className="detailRow"
                      key={
                        item.en
                      }
                    >

                      <span>
                        {L(
                          language,
                          item.en,
                          item.ar
                        )}
                      </span>


                      <strong
                        style={{
                          color:
                            "#d0a45f",
                        }}
                      >
                        {L(
                          language,
                          "Planned",
                          "مخطط له"
                        )}
                      </strong>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </section>


        {/* ================================================
            MANAGEMENT INSIGHT
            ================================================ */}

        <section
          className="alertBanner"
          style={{
            marginTop:
              "16px",

            marginBottom:
              0,
          }}
        >

          <div className="alertIcon">
            <BrainCircuit
              size={24}
              aria-hidden="true"
            />
          </div>


          <div className="alertText">

            <strong>
              {L(
                language,
                "AI Management Insight",
                "ملخص الذكاء الاصطناعي للإدارة"
              )}
            </strong>


            <span>
              {L(
                language,

                `The system detected ${PLATFORM_METRICS.aggregatedCases} identity cases. ${PLATFORM_METRICS.priority.immediate} require urgent attention, while ${PLATFORM_METRICS.wronglyAffectedCases} cases include potential wrong-person impact. No identity cases remain unresolved in the synthetic evaluation.`,

                `اكتشف النظام ${PLATFORM_METRICS.aggregatedCases} حالة هوية، منها ${PLATFORM_METRICS.priority.immediate} حالات تحتاج إلى متابعة فورية، و${PLATFORM_METRICS.wronglyAffectedCases} حالات قد تتضمن تأثيرًا على شخص آخر. ولا توجد حالات هوية غير محسومة في التقييم التجريبي.`
              )}
            </span>

          </div>


          <Link
            href="/cases"
            className="bannerButton"
            style={{
              textDecoration:
                "none",
            }}
          >
            {L(
              language,
              "View Cases",
              "عرض الحالات"
            )}

            <ChevronRight
              size={17}
              style={
                arrowStyle
              }
              aria-hidden="true"
            />
          </Link>

        </section>


        {/* ================================================
            GOVERNANCE
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

          <ShieldCheck
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "Management analytics do not replace human approval",
                "التحليلات الإدارية لا تستبدل الاعتماد البشري"
              )}
            </strong>


            <span>
              {L(
                language,
                "AI analytics support monitoring and decision-making. Sensitive identity corrections still require the approved human review process.",
                "تدعم تحليلات الذكاء الاصطناعي المراقبة واتخاذ القرار، بينما تظل تصحيحات الهوية الحساسة خاضعة لمسار الاعتماد البشري."
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
              "AI Identity Reconciliation Platform · Analytics",
              "منصة مطابقة الهوية بالذكاء الاصطناعي · التحليلات"
            )}
          </span>


          <div>
            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Synthetic analytics view",
              "عرض تحليلات تجريبي"
            )}
          </div>

        </footer>

      </main>
    </div>
  );
}