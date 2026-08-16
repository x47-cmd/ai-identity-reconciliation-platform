"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  useLanguage,
} from "../components/LanguageProvider";

import {
  Activity,
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  PieChart,
  Search,
  ShieldAlert,
  ShieldCheck,
  Timer,
  TrendingUp,
  UserCheck,
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
   EXECUTIVE ANALYTICS
   ========================================================= */

const executiveMetrics = [
  {
    label: "Total Cases",
    value: "53",
    description:
      "Aggregated identity integrity cases",
    icon: FileSearch,
    trend: "103",
    trendLabel: "raw findings",
    tone: "blue",
  },

  {
    label: "Protective Cases",
    value: "9",
    description:
      "Wrong-person / harm protection grouping",
    icon: ShieldAlert,
    trend: "17.0%",
    trendLabel: "of all cases",
    tone: "red",
  },

  {
    label: "Detection Recall",
    value: "100%",
    description:
      "Seeded synthetic issues detected",
    icon: ShieldCheck,
    trend: "53 / 53",
    trendLabel: "expected issues",
    tone: "green",
  },

  {
    label: "Diagnostic Precision",
    value: "100%",
    description:
      "After corroborating finding analysis",
    icon: Gauge,
    trend: "0",
    trendLabel:
      "unexplained false positives",
    tone: "green",
  },

  {
    label: "Protective Detection",
    value: "100%",
    description:
      "Protective synthetic cases detected",
    icon: UserCheck,
    trend: "100%",
    trendLabel: "priority accuracy",
    tone: "green",
  },

  {
    label: "Canonical Resolution",
    value: "53",
    description:
      "Cases with canonical identity candidate",
    icon: BrainCircuit,
    trend: "0",
    trendLabel: "unresolved cases",
    tone: "blue",
  },
];


const priorityBreakdown = [
  {
    label: "Immediate",
    value: 9,
    percentage: 17,
    tone: "red",
  },

  {
    label: "High",
    value: 23,
    percentage: 43,
    tone: "orange",
  },

  {
    label: "Medium",
    value: 21,
    percentage: 40,
    tone: "blue",
  },
];


const errorBreakdown = [
  {
    label: "Data Mismatch",
    value: 15,
    percentage: 28.3,
  },

  {
    label: "Wrong Mapping",
    value: 11,
    percentage: 20.8,
  },

  {
    label:
      "Complex Identity Conflict",
    value: 8,
    percentage: 15.1,
  },

  {
    label: "Duplicate Identity",
    value: 6,
    percentage: 11.3,
  },

  {
    label: "Harm Impact",
    value: 6,
    percentage: 11.3,
  },

  {
    label: "Orphan Record",
    value: 4,
    percentage: 7.5,
  },

  {
    label:
      "Critical Harm Identity Conflict",
    value: 3,
    percentage: 5.7,
  },
];


const workflowBreakdown = [
  {
    label: "Cases Generated",
    value: 53,
    total: 53,
  },

  {
    label: "Awaiting Officer",
    value: 5,
    total: 53,
  },

  {
    label: "Awaiting Manager",
    value: 3,
    total: 53,
  },

  {
    label: "Correction Executed",
    value: 1,
    total: 53,
  },

  {
    label: "Verified Closed",
    value: 1,
    total: 53,
  },
];


const pipelineStages = [
  {
    label: "Biometric Records",
    value: "1,000",
    description:
      "Synthetic source records monitored",
  },

  {
    label: "Raw Findings",
    value: "103",
    description:
      "Reconciliation findings produced",
  },

  {
    label: "Aggregated Cases",
    value: "53",
    description:
      "Canonical investigation cases",
  },

  {
    label:
      "Corroborating Findings",
    value: "50",
    description:
      "Secondary evidence collapsed",
  },

  {
    label:
      "Multi-Finding Cases",
    value: "17",
    description:
      "Cases supported by multiple findings",
  },

  {
    label: "Protective Cases",
    value: "9",
    description:
      "Wrong-person / harm protection group",
  },
];


const agentMetrics = [
  {
    name: "Monitoring Agent",
    status: "VALIDATED",
    processed: "1,000",
    output:
      "Biometric records monitored",
  },

  {
    name: "Reconciliation Agent",
    status: "VALIDATED",
    processed: "1,000",
    output: "103 raw findings",
  },

  {
    name:
      "Case Aggregation Engine",
    status: "VALIDATED",
    processed: "103",
    output: "53 aggregated cases",
  },

  {
    name:
      "Investigation Workflow",
    status: "DEMO READY",
    processed: "53 cases",
    output:
      "Investigation-ready case set",
  },

  {
    name: "Approval Workflow",
    status: "VALIDATED",
    processed: "1 E2E case",
    output:
      "Officer + Manager approval passed",
  },

  {
    name: "Verification Agent",
    status: "VALIDATED",
    processed: "1 correction",
    output: "1 verified closed",
  },
];


const powerBiDatasets = [
  {
    name: "Case Performance",
    source:
      "Case and priority metrics",
    status: "PLANNED",
  },

  {
    name: "AI Findings",
    source:
      "Reconciliation finding metrics",
    status: "PLANNED",
  },

  {
    name:
      "Investigation Results",
    source:
      "AI investigation outputs",
    status: "PLANNED",
  },

  {
    name:
      "Approval Workflow",
    source:
      "Human decision and approval state",
    status: "PLANNED",
  },

  {
    name:
      "Verification Results",
    source:
      "Post-correction verification data",
    status: "PLANNED",
  },
];


/* =========================================================
   LOCALIZATION HELPERS
   ========================================================= */

function executiveLabel(
  label,
  language,
  t
) {
  const keys = {
    "Total Cases":
      "commandCenter.totalCases",

    "Protective Cases":
      "analytics.protectiveCases",

    "Detection Recall":
      "analytics.detectionRecall",

    "Diagnostic Precision":
      "analytics.diagnosticPrecision",

    "Protective Detection":
      "analytics.protectiveDetection",

    "Canonical Resolution":
      "dataIntegrity.canonicalResolution",
  };


  if (keys[label]) {
    return t(keys[label]);
  }


  return label;
}


function executiveDescription(
  text,
  language
) {
  const labels = {
    "Aggregated identity integrity cases":
      "حالات سلامة الهوية المجمعة",

    "Wrong-person / harm protection grouping":
      "تجميع الحالات المرتبطة بحماية الشخص الخطأ والضرر",

    "Seeded synthetic issues detected":
      "المشكلات الاصطناعية المزروعة التي تم اكتشافها",

    "After corroborating finding analysis":
      "بعد تحليل النتائج الداعمة",

    "Protective synthetic cases detected":
      "الحالات الوقائية الاصطناعية المكتشفة",

    "Cases with canonical identity candidate":
      "حالات لديها مرشح للهوية المرجعية",
  };


  return language === "ar"
    ? labels[text] || text
    : text;
}


function executiveTrendLabel(
  text,
  language
) {
  const labels = {
    "raw findings":
      "نتائج أولية",

    "of all cases":
      "من إجمالي الحالات",

    "expected issues":
      "مشكلات متوقعة",

    "unexplained false positives":
      "تنبيهات خاطئة غير مفسرة",

    "priority accuracy":
      "دقة الأولوية",

    "unresolved cases":
      "حالات غير محسومة",
  };


  return language === "ar"
    ? labels[text] || text
    : text;
}


function priorityLabel(
  label,
  t
) {
  const keys = {
    Immediate:
      "priorities.IMMEDIATE",

    High:
      "priorities.HIGH",

    Medium:
      "priorities.MEDIUM",
  };


  return keys[label]
    ? t(keys[label])
    : label;
}


function errorLabel(
  label,
  language,
  t
) {
  const keys = {
    "Data Mismatch":
      "analytics.dataMismatch",

    "Wrong Mapping":
      "analytics.wrongMapping",

    "Complex Identity Conflict":
      "analytics.complexIdentityConflict",

    "Duplicate Identity":
      "analytics.duplicateIdentity",

    "Harm Impact":
      "analytics.harmImpact",

    "Orphan Record":
      "analytics.orphan",

    "Critical Harm Identity Conflict":
      "analytics.criticalHarmIdentityConflict",
  };


  if (keys[label]) {
    return t(keys[label]);
  }


  return L(
    language,
    label,
    label
  );
}


function workflowLabel(
  label,
  language
) {
  const labels = {
    "Cases Generated":
      "الحالات المنشأة",

    "Awaiting Officer":
      "بانتظار الضابط",

    "Awaiting Manager":
      "بانتظار المدير",

    "Correction Executed":
      "تم تنفيذ التصحيح",

    "Verified Closed":
      "تم التحقق والإغلاق",
  };


  return language === "ar"
    ? labels[label] || label
    : label;
}


function pipelineLabel(
  label,
  language,
  t
) {
  const keys = {
    "Biometric Records":
      "analytics.totalBiometricRecords",

    "Raw Findings":
      "analytics.rawFindings",

    "Aggregated Cases":
      "analytics.aggregatedCases",

    "Corroborating Findings":
      "analytics.corroboratingFindings",

    "Multi-Finding Cases":
      "analytics.multifindingCases",

    "Protective Cases":
      "analytics.protectiveCases",
  };


  if (keys[label]) {
    return t(keys[label]);
  }


  return L(
    language,
    label,
    label
  );
}


function pipelineDescription(
  text,
  language
) {
  const labels = {
    "Synthetic source records monitored":
      "سجلات المصدر الاصطناعية التي تمت مراقبتها",

    "Reconciliation findings produced":
      "نتائج المطابقة التي تم إنتاجها",

    "Canonical investigation cases":
      "حالات التحقيق المرجعية",

    "Secondary evidence collapsed":
      "تم دمج الأدلة الثانوية",

    "Cases supported by multiple findings":
      "حالات مدعومة بعدة نتائج",

    "Wrong-person / harm protection group":
      "مجموعة حماية الشخص الخطأ والضرر",
  };


  return language === "ar"
    ? labels[text] || text
    : text;
}


function agentName(
  name,
  language
) {
  const labels = {
    "Monitoring Agent":
      "وكيل المراقبة",

    "Reconciliation Agent":
      "وكيل المطابقة",

    "Case Aggregation Engine":
      "محرك تجميع الحالات",

    "Investigation Workflow":
      "مسار التحقيق",

    "Approval Workflow":
      "مسار الاعتماد",

    "Verification Agent":
      "وكيل التحقق",
  };


  return language === "ar"
    ? labels[name] || name
    : name;
}


function agentStatus(
  status,
  language
) {
  const labels = {
    VALIDATED:
      "تم التحقق",

    "DEMO READY":
      "جاهز للعرض",
  };


  return language === "ar"
    ? labels[status] || status
    : status;
}


function agentOutput(
  output,
  language
) {
  const labels = {
    "Biometric records monitored":
      "تمت مراقبة السجلات البيومترية",

    "103 raw findings":
      "103 نتائج أولية",

    "53 aggregated cases":
      "53 حالة مجمعة",

    "Investigation-ready case set":
      "مجموعة حالات جاهزة للتحقيق",

    "Officer + Manager approval passed":
      "نجح اعتماد الضابط والمدير",

    "1 verified closed":
      "حالة واحدة تم التحقق منها وإغلاقها",
  };


  return language === "ar"
    ? labels[output] || output
    : output;
}


function datasetName(
  name,
  language
) {
  const labels = {
    "Case Performance":
      "أداء الحالات",

    "AI Findings":
      "نتائج الذكاء الاصطناعي",

    "Investigation Results":
      "نتائج التحقيق",

    "Approval Workflow":
      "مسار الاعتماد",

    "Verification Results":
      "نتائج التحقق",
  };


  return language === "ar"
    ? labels[name] || name
    : name;
}


function datasetSource(
  source,
  language
) {
  const labels = {
    "Case and priority metrics":
      "مقاييس الحالات والأولوية",

    "Reconciliation finding metrics":
      "مقاييس نتائج المطابقة",

    "AI investigation outputs":
      "مخرجات تحقيق الذكاء الاصطناعي",

    "Human decision and approval state":
      "حالة القرارات والاعتمادات البشرية",

    "Post-correction verification data":
      "بيانات التحقق بعد التصحيح",
  };


  return language === "ar"
    ? labels[source] || source
    : source;
}


/* =========================================================
   EXECUTIVE METRIC
   ========================================================= */

function ExecutiveMetric({
  item,
  language,
  t,
}) {
  const Icon =
    item.icon;


  const colors = {
    red: {
      icon: "#ff7887",
      background:
        "rgba(255,80,100,0.08)",
      trend: "#ff8b97",
    },

    green: {
      icon: "#59cfa0",
      background:
        "rgba(52,211,153,0.08)",
      trend: "#60d5a6",
    },

    blue: {
      icon: "#69a2ff",
      background:
        "rgba(70,140,255,0.08)",
      trend: "#77aaff",
    },
  };


  const tone =
    colors[item.tone]
    ||
    colors.blue;


  return (
    <div className="metricCard">
      <div className="metricTop">
        <div
          className="metricIcon"
          style={{
            color: tone.icon,
            background:
              tone.background,
          }}
        >
          <Icon size={20} />
        </div>

        <span
          style={{
            color:
              tone.trend,

            fontSize:
              "10px",

            fontWeight:
              800,
          }}
        >
          {t(
            "commandCenter.demoKpi"
          )}
        </span>
      </div>


      <div className="metricValue">
        {item.value}
      </div>


      <div className="metricTitle">
        {
          executiveLabel(
            item.label,
            language,
            t
          )
        }
      </div>


      <div className="metricSubtitle">
        {
          executiveDescription(
            item.description,
            language
          )
        }
      </div>


      <div
        style={{
          marginTop:
            "12px",

          paddingTop:
            "11px",

          borderTop:
            "1px solid rgba(255,255,255,0.045)",

          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          gap:
            "12px",
        }}
      >
        <strong
          style={{
            color:
              tone.trend,

            fontSize:
              "10px",
          }}
        >
          {item.trend}
        </strong>

        <span
          style={{
            color:
              "#6c7f97",

            fontSize:
              "10px",

            textAlign:
              language === "ar"
                ? "left"
                : "right",
          }}
        >
          {
            executiveTrendLabel(
              item.trendLabel,
              language
            )
          }
        </span>
      </div>
    </div>
  );
}


/* =========================================================
   PRIORITY BAR
   ========================================================= */

function PriorityBar({
  item,
  t,
}) {
  const tones = {
    red: "#ff697a",
    orange: "#ffb55d",
    blue: "#5f9cff",
  };


  return (
    <div
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

          marginBottom:
            "8px",
        }}
      >
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
          <span
            style={{
              width:
                "7px",

              height:
                "7px",

              borderRadius:
                "50%",

              background:
                tones[item.tone],
            }}
          />

          <span
            style={{
              color:
                "#8b9db3",

              fontSize:
                "11px",
            }}
          >
            {
              priorityLabel(
                item.label,
                t
              )
            }
          </span>
        </div>


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
                "10px",

              marginInlineStart:
                "7px",
            }}
          >
            {item.percentage}%
          </span>
        </div>
      </div>


      <div className="progress">
        <div
          style={{
            width:
              `${item.percentage}%`,

            height:
              "100%",

            borderRadius:
              "inherit",

            background:
              tones[item.tone],
          }}
        />
      </div>
    </div>
  );
}


/* =========================================================
   ERROR BAR
   ========================================================= */

function ErrorBar({
  item,
  maxValue,
  language,
  t,
}) {
  const width =
    (
      item.value
      /
      maxValue
    )
    *
    100;


  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "210px 1fr 50px",

        gap:
          "12px",

        alignItems:
          "center",

        padding:
          "11px 0",
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
          }}
        >
          {
            errorLabel(
              item.label,
              language,
              t
            )
          }
        </span>

        <span
          style={{
            display:
              "block",

            color:
              "#61738c",

            fontSize:
              "10px",

            marginTop:
              "3px",
          }}
        >
          {
            language === "ar"
              ? `${item.percentage}% من الحالات`
              : `${item.percentage}% of cases`
          }
        </span>
      </div>


      <div
        style={{
          height:
            "8px",

          borderRadius:
            "8px",

          background:
            "rgba(255,255,255,0.045)",

          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            width:
              `${width}%`,

            height:
              "100%",

            borderRadius:
              "8px",

            background:
              "linear-gradient(90deg,#286fe6,#5e9cff)",
          }}
        />
      </div>


      <strong
        style={{
          color:
            "#cbd7e7",

          textAlign:
            "center",

          fontSize:
            "11px",
        }}
      >
        {item.value}
      </strong>
    </div>
  );
}


/* =========================================================
   PIPELINE
   ========================================================= */

function PipelineFlow({
  language,
  t,
}) {
  return (
    <div
      style={{
        padding:
          "20px",
      }}
    >
      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(3,minmax(0,1fr))",

          gap:
            "11px",
        }}
      >
        {
          pipelineStages.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  item.label
                }
                style={{
                  minHeight:
                    "118px",

                  padding:
                    "16px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(255,255,255,0.025)",

                  border:
                    "1px solid rgba(255,255,255,0.055)",

                  position:
                    "relative",
                }}
              >
                <span
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",

                    color:
                      "#6d8098",

                    fontSize:
                      "10px",

                    fontWeight:
                      800,
                  }}
                >
                  {
                    L(
                      language,
                      `STAGE ${index + 1}`,
                      `المرحلة ${index + 1}`
                    )
                  }

                  <span
                    style={{
                      width:
                        "22px",

                      height:
                        "22px",

                      borderRadius:
                        "7px",

                      display:
                        "grid",

                      placeItems:
                        "center",

                      background:
                        "rgba(70,140,255,0.08)",

                      color:
                        "#74a8ff",
                    }}
                  >
                    {index + 1}
                  </span>
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#e1eaf6",

                    fontSize:
                      "22px",

                    marginTop:
                      "10px",
                  }}
                >
                  {item.value}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#91a2b7",

                    fontSize:
                      "11px",

                    fontWeight:
                      700,

                    marginTop:
                      "2px",
                  }}
                >
                  {
                    pipelineLabel(
                      item.label,
                      language,
                      t
                    )
                  }
                </span>


                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#63768e",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.5,

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    pipelineDescription(
                      item.description,
                      language
                    )
                  }
                </span>
              </div>
            )
          )
        }
      </div>


      <div
        style={{
          marginTop:
            "14px",

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
        }}
      >
        {L(
          language,

          "Raw findings are reconciled and aggregated into case-level investigations. Corroborating findings strengthen existing cases rather than being counted as unexplained false positives.",

          "تتم مطابقة النتائج الأولية وتجميعها داخل تحقيقات على مستوى الحالة. وتستخدم النتائج الداعمة لتعزيز الحالات الموجودة بدل احتسابها كتنبيهات إيجابية خاطئة غير مفسرة."
        )}
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
              <Gauge size={15} />

              {t(
                "analytics.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "analytics.title"
              )}
            </h1>

            <p>
              {t(
                "analytics.subtitle"
              )}
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                {L(
                  language,
                  "Search analytics",
                  "البحث في التحليلات"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                EX
              </div>

              <div className="profileText">
                <strong>
                  {L(
                    language,
                    "Executive View",
                    "العرض التنفيذي"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Identity Intelligence",
                    "ذكاء الهوية"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            EXECUTIVE STATUS
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "17px",
          }}
        >
          <ShieldCheck size={24} />

          <div>
            <strong>
              {L(
                language,
                "Synthetic Demo Validation Passed",
                "نجح التحقق من العرض الاصطناعي"
              )}
            </strong>

            <span>
              {L(
                language,

                "All 53 seeded synthetic identity issues were detected. Protective detection and protective priority accuracy both reached 100%, while unexplained false positives remained at zero after corroborating evidence analysis.",

                "تم اكتشاف جميع مشكلات الهوية الاصطناعية الـ53. ووصل كل من الاكتشاف الوقائي ودقة الأولوية الوقائية إلى 100%، بينما بقي عدد التنبيهات الخاطئة غير المفسرة عند صفر بعد تحليل الأدلة الداعمة."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            EXECUTIVE KPIs
            ================================================ */}

        <section
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(3,minmax(0,1fr))",

            gap:
              "16px",

            marginBottom:
              "16px",
          }}
        >
          {
            executiveMetrics.map(
              (item) => (
                <ExecutiveMetric
                  key={
                    item.label
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
            )
          }
        </section>


        {/* ================================================
            PRIORITY + PROTECTION
            ================================================ */}

        <section className="dashboardGrid">

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE SEVERITY",
                    "شدة الحالات"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Priority Distribution",
                    "توزيع الأولويات"
                  )}
                </h2>
              </div>

              <PieChart size={22} />
            </div>


            <div
              style={{
                padding:
                  "12px 20px 20px",
              }}
            >
              {
                priorityBreakdown.map(
                  (item) => (
                    <PriorityBar
                      key={
                        item.label
                      }
                      item={
                        item
                      }
                      t={t}
                    />
                  )
                )
              }


              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(3,1fr)",

                  gap:
                    "8px",

                  marginTop:
                    "13px",
                }}
              >
                {
                  priorityBreakdown.map(
                    (item) => (
                      <div
                        key={
                          item.label
                        }
                        style={{
                          padding:
                            "12px",

                          borderRadius:
                            "10px",

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
                              "#71839a",

                            fontSize:
                              "10px",
                          }}
                        >
                          {
                            priorityLabel(
                              item.label,
                              t
                            )
                          }
                        </span>

                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#d1ddec",

                            fontSize:
                              "18px",

                            marginTop:
                              "4px",
                          }}
                        >
                          {item.value}
                        </strong>
                      </div>
                    )
                  )
                }
              </div>
            </div>
          </div>


          {/* PROTECTIVE INTELLIGENCE */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "PROTECTIVE INTELLIGENCE",
                    "الذكاء الوقائي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Wrong-Person Protection",
                    "حماية الشخص الخطأ"
                  )}
                </h2>
              </div>

              <ShieldAlert size={22} />
            </div>


            <div
              style={{
                padding:
                  "19px",
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
                    "13px solid rgba(255,85,105,0.10)",

                  outline:
                    "4px solid rgba(255,85,105,0.21)",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",
                }}
              >
                <strong
                  style={{
                    color:
                      "#ff7b89",

                    fontSize:
                      "34px",
                  }}
                >
                  9
                </strong>

                <span
                  style={{
                    color:
                      "#a56d76",

                    fontSize:
                      "10px",

                    fontWeight:
                      750,
                  }}
                >
                  {L(
                    language,
                    "PROTECTIVE CASES",
                    "حالات وقائية"
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
                    {t(
                      "analytics.protectiveDetection"
                    )}
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    100%
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "analytics.protectivePriorityAccuracy"
                    )}
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    100%
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "analytics.protectiveCases"
                    )}
                  </span>

                  <strong>
                    9
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
                {L(
                  language,

                  "Protective Cases is an executive grouping for wrong-person and harm-sensitive cases. It is not a single backend case type.",

                  "الحالات الوقائية هي تجميع تنفيذي للحالات المرتبطة بالشخص الخطأ والحالات الحساسة للضرر، وليست نوع حالة منفردًا في النظام الخلفي."
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            ERROR CLASSIFICATION
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
                {t(
                  "analytics.caseTypeBreakdown"
                )}
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              padding:
                "12px 20px 20px",
            }}
          >
            {
              errorBreakdown.map(
                (item) => (
                  <ErrorBar
                    key={
                      item.label
                    }
                    item={
                      item
                    }
                    maxValue={15}
                    language={
                      language
                    }
                    t={t}
                  />
                )
              )
            }
          </div>
        </section>


        {/* ================================================
            PIPELINE + WORKFLOW
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "RECONCILIATION PIPELINE",
                    "مسار المطابقة"
                  )}
                </div>

                <h2>
                  {t(
                    "analytics.evidenceFlow"
                  )}
                </h2>
              </div>

              <TrendingUp size={22} />
            </div>

            <PipelineFlow
              language={
                language
              }
              t={t}
            />
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE LIFECYCLE",
                    "دورة حياة الحالة"
                  )}
                </div>

                <h2>
                  {t(
                    "analytics.operationalSnapshot"
                  )}
                </h2>
              </div>

              <Activity size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {
                workflowBreakdown.map(
                  (item) => {
                    const percentage =
                      (
                        item.value
                        /
                        item.total
                      )
                      *
                      100;


                    return (
                      <div
                        key={
                          item.label
                        }
                        style={{
                          padding:
                            "11px 0",
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
                                "#8b9db3",

                              fontSize:
                                "11px",
                            }}
                          >
                            {
                              workflowLabel(
                                item.label,
                                language
                              )
                            }
                          </span>

                          <strong
                            style={{
                              color:
                                "#d0dbea",

                              fontSize:
                                "11px",
                            }}
                          >
                            {item.value}
                          </strong>
                        </div>


                        <div className="progress">
                          <div
                            className="progressFill"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )
              }


              <div
                style={{
                  marginTop:
                    "11px",

                  color:
                    "#687b93",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,

                  "Queue and milestone values are a workflow snapshot and are not mutually exclusive totals.",

                  "قيم القوائم والمراحل تمثل لقطة لحالة سير العمل وليست أرقامًا منفصلة حصريًا عن بعضها."
                )}
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            OPERATIONAL DATA
            ================================================ */}

        <section
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(4,minmax(0,1fr))",

            gap:
              "16px",

            marginTop:
              "16px",
          }}
        >
          <div className="metricCard">
            <div className="metricIcon">
              <ShieldCheck size={20} />
            </div>

            <div className="metricValue">
              {t(
                "statuses.PASSED"
              )}
            </div>

            <div className="metricTitle">
              {L(
                language,
                "E2E Demo Workflow",
                "مسار العرض المتكامل"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Officer → Manager → Execution → Verification",
                "الضابط ← المدير ← التنفيذ ← التحقق"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <Database size={20} />
            </div>

            <div className="metricValue">
              3,000
            </div>

            <div className="metricTitle">
              {t(
                "analytics.masterIdentities"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Authoritative read-only reference",
                "مرجع معتمد للقراءة فقط"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <Fingerprint size={20} />
            </div>

            <div className="metricValue">
              1,000
            </div>

            <div className="metricTitle">
              {t(
                "analytics.totalBiometricRecords"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Synthetic reconciliation dataset",
                "مجموعة بيانات مطابقة اصطناعية"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <BrainCircuit size={20} />
            </div>

            <div className="metricValue">
              103
            </div>

            <div className="metricTitle">
              {t(
                "analytics.rawFindings"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Aggregated into 53 cases",
                "تم تجميعها داخل 53 حالة"
              )}
            </div>
          </div>
        </section>


        {/* ================================================
            AGENT ANALYTICS
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
                  "AGENTIC AI OPERATIONS",
                  "عمليات وكلاء الذكاء الاصطناعي"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Validated Demo Components",
                  "مكونات العرض التي تم التحقق منها"
                )}
              </h2>
            </div>

            <BrainCircuit size={22} />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "COMPONENT",
                      "المكون"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "DEMO STATUS",
                      "حالة العرض"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "INPUT / PROCESSED",
                      "المدخلات / المعالجة"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "RESULT",
                      "النتيجة"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {
                  agentMetrics.map(
                    (agent) => (
                      <tr
                        key={
                          agent.name
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
                              <BrainCircuit
                                size={16}
                              />
                            </div>

                            <strong
                              style={{
                                color:
                                  "#cbd7e7",

                                fontSize:
                                  "11px",
                              }}
                            >
                              {
                                agentName(
                                  agent.name,
                                  language
                                )
                              }
                            </strong>
                          </div>
                        </td>


                        <td>
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
                            }}
                          >
                            <span className="greenDot" />

                            {
                              agentStatus(
                                agent.status,
                                language
                              )
                            }
                          </span>
                        </td>


                        <td>
                          {agent.processed}
                        </td>


                        <td>
                          {
                            agentOutput(
                              agent.output,
                              language
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
                  "ENTERPRISE REPORTING",
                  "التقارير المؤسسية"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Power BI Intelligence Center",
                  "مركز ذكاء Power BI"
                )}
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1.15fr 0.85fr",

              gap:
                "16px",

              padding:
                "20px",
            }}
          >
            <div
              style={{
                minHeight:
                  "330px",

                borderRadius:
                  "14px",

                background:
                  "linear-gradient(135deg,rgba(31,100,210,0.11),rgba(10,22,39,0.35))",

                border:
                  "1px solid rgba(90,150,255,0.11)",

                padding:
                  "22px",

                display:
                  "flex",

                flexDirection:
                  "column",

                justifyContent:
                  "space-between",
              }}
            >
              <div>
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
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#d3dfed",

                        fontSize:
                          "12px",
                      }}
                    >
                      {L(
                        language,
                        "Executive Power BI Report",
                        "تقرير Power BI التنفيذي"
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
                        "Planned secured reporting integration",
                        "تكامل تقارير آمن مخطط له"
                      )}
                    </span>
                  </div>
                </div>


                <div
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(3,1fr)",

                    gap:
                      "9px",

                    marginTop:
                      "25px",
                  }}
                >
                  {[
                    [
                      L(
                        language,
                        "Cases",
                        "الحالات"
                      ),
                      "53",
                    ],

                    [
                      L(
                        language,
                        "Protection",
                        "الحماية"
                      ),
                      "9",
                    ],

                    [
                      L(
                        language,
                        "Recall",
                        "الاستدعاء"
                      ),
                      "100%",
                    ],
                  ].map(
                    ([
                      label,
                      value,
                    ]) => (
                      <div
                        key={
                          label
                        }
                        style={{
                          padding:
                            "15px",

                          borderRadius:
                            "11px",

                          background:
                            "rgba(255,255,255,0.025)",

                          border:
                            "1px solid rgba(255,255,255,0.055)",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#71839a",

                            fontSize:
                              "10px",
                          }}
                        >
                          {label}
                        </span>

                        <strong
                          style={{
                            display:
                              "block",

                            marginTop:
                              "5px",

                            fontSize:
                              "20px",
                          }}
                        >
                          {value}
                        </strong>
                      </div>
                    )
                  )}
                </div>
              </div>


              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(255,185,65,0.045)",

                  border:
                    "1px solid rgba(255,185,65,0.09)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#d4ac63",

                    fontSize:
                      "11px",
                  }}
                >
                  {t(
                    "analytics.integrationReady"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#927b54",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.6,

                    marginTop:
                      "5px",
                  }}
                >
                  {t(
                    "analytics.powerBiMessage"
                  )}
                </span>
              </div>
            </div>


            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "PLANNED REPORT DATASETS",
                  "مجموعات بيانات التقارير المخطط لها"
                )}
              </div>

              <h3
                style={{
                  margin:
                    "6px 0 15px",

                  fontSize:
                    "13px",
                }}
              >
                {L(
                  language,
                  "Analytics Data Pipeline",
                  "مسار بيانات التحليلات"
                )}
              </h3>


              {
                powerBiDatasets.map(
                  (dataset) => (
                    <div
                      key={
                        dataset.name
                      }
                      style={{
                        padding:
                          "13px",

                        borderRadius:
                          "10px",

                        background:
                          "rgba(255,255,255,0.024)",

                        border:
                          "1px solid rgba(255,255,255,0.05)",

                        marginBottom:
                          "8px",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap:
                          "10px",
                      }}
                    >
                      <Database
                        size={17}
                        color="#659eff"
                      />

                      <div
                        style={{
                          flex:
                            1,
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#c9d6e5",

                            fontSize:
                              "11px",
                          }}
                        >
                          {
                            datasetName(
                              dataset.name,
                              language
                            )
                          }
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
                              "3px",
                          }}
                        >
                          {
                            datasetSource(
                              dataset.source,
                              language
                            )
                          }
                        </span>
                      </div>

                      <span
                        style={{
                          color:
                            "#d4ac63",

                          fontSize:
                            "10px",

                          fontWeight:
                            800,
                        }}
                      >
                        {t(
                          "analytics.planned"
                        )}
                      </span>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </section>


        {/* ================================================
            MANAGEMENT KPIs
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",

            marginTop:
              "16px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "OPERATIONAL KPIs",
                    "مؤشرات الأداء التشغيلية"
                  )}
                </div>

                <h2>
                  {t(
                    "analytics.operationalSnapshot"
                  )}
                </h2>
              </div>

              <Timer size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  L(
                    language,
                    "Cases Awaiting Officer",
                    "حالات بانتظار الضابط"
                  ),
                  "5",
                ],

                [
                  L(
                    language,
                    "Cases Awaiting Manager",
                    "حالات بانتظار المدير"
                  ),
                  "3",
                ],

                [
                  L(
                    language,
                    "Completed Demo Correction",
                    "تصحيح تجريبي مكتمل"
                  ),
                  "1",
                ],

                [
                  t(
                    "analytics.verifiedClosed"
                  ),
                  "1",
                ],

                [
                  L(
                    language,
                    "Verification Failure",
                    "فشل التحقق"
                  ),
                  "0",
                ],

                [
                  L(
                    language,
                    "Rollback Required",
                    "تراجع مطلوب"
                  ),
                  "0",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={
                      label
                    }
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
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI QUALITY KPIs",
                    "مؤشرات جودة الذكاء الاصطناعي"
                  )}
                </div>

                <h2>
                  {t(
                    "analytics.qualityMetrics"
                  )}
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  t(
                    "analytics.expectedAnomalies"
                  ),
                  "53",
                ],

                [
                  t(
                    "analytics.detectedAnomalies"
                  ),
                  "53",
                ],

                [
                  t(
                    "analytics.detectionRecall"
                  ),
                  "100%",
                ],

                [
                  t(
                    "analytics.rawPrecision"
                  ),
                  "72.82%",
                ],

                [
                  t(
                    "analytics.f1Score"
                  ),
                  "84.27%",
                ],

                [
                  t(
                    "analytics.diagnosticPrecision"
                  ),
                  "100%",
                ],

                [
                  t(
                    "analytics.unexplainedFalsePositives"
                  ),
                  "0",
                ],

                [
                  t(
                    "analytics.protectiveDetection"
                  ),
                  "100%",
                ],

                [
                  t(
                    "analytics.protectivePriorityAccuracy"
                  ),
                  "100%",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={
                      label
                    }
                  >
                    <span>
                      {label}
                    </span>

                    <strong
                      style={{
                        color:
                          value === "0"
                          ||
                          value === "100%"
                            ? "#59cfa0"
                            : undefined,
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
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
            <TrendingUp size={24} />
          </div>

          <div className="alertText">
            <strong>
              {L(
                language,
                "Executive Insight",
                "رؤية تنفيذية"
              )}
            </strong>

            <span>
              {L(
                language,

                "Data mismatch is the largest individual backend case type. Separately, the protective grouping contains 9 wrong-person and harm-sensitive cases requiring elevated human attention. Volume and protective harm should therefore be monitored as different management dimensions.",

                "يمثل اختلاف البيانات أكبر نوع منفرد من الحالات في النظام الخلفي. وبشكل منفصل، تضم المجموعة الوقائية 9 حالات مرتبطة بالشخص الخطأ أو الحساسة للضرر وتتطلب اهتمامًا بشريًا أعلى. لذلك يجب مراقبة حجم الحالات والضرر الوقائي كأبعاد إدارية مختلفة."
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

            <ChevronRight size={17} />
          </Link>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t("footer.platform")}
            {" · "}
            {L(
              language,
              "Executive Analytics Center",
              "مركز التحليلات التنفيذية"
            )}
          </span>

          <div>
            <Activity size={15} />

            {L(
              language,
              "Synthetic Intelligence View",
              "عرض ذكاء اصطناعي تجريبي"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}