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
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSearch,
  Fingerprint,
  Search,
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
   DASHBOARD
   ========================================================= */

const AWAITING_REVIEW = 5;


/* =========================================================
   MAIN METRICS
   ========================================================= */

const dashboardMetrics = [
  {
    key: "master",

    value:
      PLATFORM_METRICS.masterIdentities.toLocaleString(),

    icon:
      Database,

    en: {
      title:
        "Reference Records",

      subtitle:
        "Approved reference data",
    },

    ar: {
      title:
        "البيانات المرجعية",

      subtitle:
        "السجلات المعتمدة للمقارنة",
    },
  },

  {
    key: "biometric",

    value:
      PLATFORM_METRICS.biometricRecords.toLocaleString(),

    icon:
      Fingerprint,

    en: {
      title:
        "Biometric Records",

      subtitle:
        "Records monitored by the system",
    },

    ar: {
      title:
        "السجلات البيومترية",

      subtitle:
        "السجلات التي يراقبها النظام",
    },
  },

  {
    key: "cases",

    value:
      String(
        PLATFORM_METRICS.aggregatedCases
      ),

    icon:
      FileSearch,

    en: {
      title:
        "Detected Cases",

      subtitle:
        "Cases requiring attention",
    },

    ar: {
      title:
        "الحالات المكتشفة",

      subtitle:
        "حالات تحتاج إلى متابعة",
    },
  },

  {
    key: "review",

    value:
      String(
        AWAITING_REVIEW
      ),

    icon:
      UserCheck,

    en: {
      title:
        "Awaiting Review",

      subtitle:
        "Waiting for a human decision",
    },

    ar: {
      title:
        "بانتظار المراجعة",

      subtitle:
        "تنتظر قرار الموظف المختص",
    },
  },
];


/* =========================================================
   SIMPLE WORKFLOW
   ========================================================= */

const workflowSteps = [
  {
    number: "1",

    icon:
      Search,

    en: {
      title:
        "Problem Detected",

      text:
        "The system finds a suspicious link.",
    },

    ar: {
      title:
        "اكتشاف المشكلة",

      text:
        "يرصد النظام حالة تحتاج إلى مراجعة.",
    },
  },

  {
    number: "2",

    icon:
      UserCheck,

    en: {
      title:
        "Employee Review",

      text:
        "The authorized employee checks the case.",
    },

    ar: {
      title:
        "مراجعة الموظف",

      text:
        "يراجع الموظف المختص الحالة والأدلة.",
    },
  },

  {
    number: "3",

    icon:
      ShieldCheck,

    en: {
      title:
        "Manager Approval",

      text:
        "The manager approves the correction.",
    },

    ar: {
      title:
        "موافقة المدير",

      text:
        "يعتمد المدير الإجراء المقترح.",
    },
  },

  {
    number: "4",

    icon:
      CheckCircle2,

    en: {
      title:
        "Correction & Verification",

      text:
        "The change is applied and checked.",
    },

    ar: {
      title:
        "التصحيح والتحقق",

      text:
        "يتم التعديل ثم التأكد من نجاحه.",
    },
  },
];


/* =========================================================
   IMPORTANT CASES

   Synthetic identities only.
   First Name + Second Name.
   ========================================================= */

const attentionCases = [
  {
    id:
      "CASE-2026-00002",

    person: {
      en:
        "Khalid Rashid",

      ar:
        "خالد راشد",
    },

    issue: {
      en:
        "Possible wrong-person link",

      ar:
        "احتمال ربط السجل بالشخص الخطأ",
    },

    status: {
      en:
        "Awaiting Review",

      ar:
        "بانتظار المراجعة",
    },

    priority:
      "IMMEDIATE",

    href:
      "/cases",
  },

  {
    id:
      "CASE-2026-00003",

    person: {
      en:
        "Maryam Ahmed",

      ar:
        "مريم أحمد",
    },

    issue: {
      en:
        "Critical record conflict",

      ar:
        "تعارض حرج يحتاج مراجعة",
    },

    status: {
      en:
        "Analysis Complete",

      ar:
        "اكتمل تحليل الحالة",
    },

    priority:
      "IMMEDIATE",

    href:
      "/cases",
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    person:
      COMPLEX_DEMO_CASE.person,

    issue: {
      en:
        "Complex record conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    status: {
      en:
        "Analysis Complete",

      ar:
        "اكتمل تحليل الحالة",
    },

    priority:
      COMPLEX_DEMO_CASE.priority,

    href:
      `/cases/${COMPLEX_DEMO_CASE.id}`,
  },
];


/* =========================================================
   PRIORITY
   ========================================================= */

function getPriorityLabel(
  priority,
  language
) {
  if (
    priority ===
    "IMMEDIATE"
  ) {
    return L(
      language,
      "Urgent",
      "فوري"
    );
  }


  if (
    priority ===
    "HIGH"
  ) {
    return L(
      language,
      "High",
      "مرتفع"
    );
  }


  return L(
    language,
    "Medium",
    "متوسط"
  );
}


function PriorityBadge({
  priority,
  language,
}) {
  const className =
    priority ===
    "IMMEDIATE"
      ? "priority immediate"
      : priority ===
          "HIGH"
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
   METRIC
   ========================================================= */

function MetricCard({
  item,
  language,
}) {
  const Icon =
    item.icon;


  const content =
    item[
      language
    ] ||
    item.en;


  return (
    <div className="metricCard">

      <div className="metricIcon">
        <Icon
          size={21}
          aria-hidden="true"
        />
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
              <ShieldCheck
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "IDENTITY MONITORING",
                "متابعة حالات الهوية"
              )}
            </div>


            <h1>
              {L(
                language,
                "Identity Monitoring Dashboard",
                "لوحة متابعة الحالات البيومترية"
              )}
            </h1>


            <p>
              {L(
                language,

                "The system monitors biometric records, detects suspicious links and sends cases requiring action to authorized staff.",

                "يراقب النظام السجلات البيومترية، ويكشف الحالات التي تحتاج مراجعة أو تصحيح، ثم يحولها إلى الموظف المختص."
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
              <FileSearch
                size={18}
                aria-hidden="true"
              />

              <span>
                {L(
                  language,
                  "View Cases",
                  "عرض الحالات"
                )}
              </span>
            </Link>

          </div>

        </header>


        {/* ================================================
            MAIN METRICS
            ================================================ */}

        <section className="statsGrid">

          {dashboardMetrics.map(
            (
              item
            ) => (
              <MetricCard
                key={
                  item.key
                }
                item={
                  item
                }
                language={
                  language
                }
              />
            )
          )}

        </section>


        {/* ================================================
            URGENT CASES
            ================================================ */}

        <section
          className="alertBanner"
          style={{
            marginTop:
              "18px",
          }}
        >

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

                `${PLATFORM_METRICS.priority.immediate} urgent cases`,

                `${PLATFORM_METRICS.priority.immediate} حالات عاجلة`
              )}
            </strong>


            <span>
              {L(
                language,

                "These cases require faster review because an incorrect link may affect another person.",

                "تحتاج هذه الحالات إلى متابعة سريعة لأن الربط غير الصحيح قد يؤثر على شخص آخر."
              )}
            </span>

          </div>


          <Link
            href="/cases"
            className="bannerButton"
          >
            {L(
              language,
              "View",
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
            SIMPLE WORKFLOW
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "18px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "HOW IT WORKS",
                  "كيف يعمل النظام؟"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "From Detection to Resolution",
                  "من اكتشاف المشكلة إلى حلها"
                )}
              </h2>

            </div>

          </div>


          <div
            className="homeWorkflowGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",

              gap:
                "12px",

              padding:
                "18px",
            }}
          >

            {workflowSteps.map(
              (
                step
              ) => {

                const Icon =
                  step.icon;


                const content =
                  step[
                    language
                  ] ||
                  step.en;


                return (
                  <div
                    key={
                      step.number
                    }
                    style={{
                      padding:
                        "16px",

                      borderRadius:
                        "13px",

                      border:
                        "1px solid rgba(121,169,255,0.10)",

                      background:
                        "rgba(121,169,255,0.035)",
                    }}
                  >

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "space-between",

                        gap:
                          "10px",
                      }}
                    >

                      <div
                        style={{
                          width:
                            "36px",

                          height:
                            "36px",

                          display:
                            "grid",

                          placeItems:
                            "center",

                          borderRadius:
                            "11px",

                          color:
                            "#79a9ff",

                          background:
                            "rgba(121,169,255,0.08)",
                        }}
                      >
                        <Icon
                          size={18}
                          aria-hidden="true"
                        />
                      </div>


                      <span
                        style={{
                          color:
                            "#536b89",

                          fontSize:
                            "15px",

                          fontWeight:
                            900,
                        }}
                      >
                        {
                          step.number
                        }
                      </span>

                    </div>


                    <strong
                      style={{
                        display:
                          "block",

                        marginTop:
                          "13px",

                        color:
                          "#dce6f2",

                        fontSize:
                          "11px",
                      }}
                    >
                      {
                        content.title
                      }
                    </strong>


                    <span
                      style={{
                        display:
                          "block",

                        marginTop:
                          "6px",

                        color:
                          "#71849c",

                        fontSize:
                          "9px",

                        lineHeight:
                          1.6,
                      }}
                    >
                      {
                        content.text
                      }
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* ================================================
            IMPORTANT CASES
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "18px",
          }}
        >

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
                  "Important Cases",
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
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </Link>

          </div>


          <div
            style={{
              padding:
                "4px 18px",
            }}
          >

            {attentionCases.map(
              (
                item
              ) => {

                const personName =
                  item.person?.[
                    language
                  ] ||
                  item.person?.en ||
                  item.id;


                const issue =
                  item.issue?.[
                    language
                  ] ||
                  item.issue?.en;


                const status =
                  item.status?.[
                    language
                  ] ||
                  item.status?.en;


                return (
                  <Link
                    key={
                      item.id
                    }
                    href={
                      item.href
                    }
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "minmax(130px,0.8fr) minmax(180px,1.2fr) minmax(130px,0.8fr) auto auto",

                      alignItems:
                        "center",

                      gap:
                        "14px",

                      padding:
                        "17px 0",

                      borderBottom:
                        "1px solid rgba(255,255,255,0.045)",

                      textDecoration:
                        "none",

                      color:
                        "inherit",
                    }}
                  >

                    {/* NAME */}

                    <div>

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
                        {
                          personName
                        }
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
                        {
                          item.id
                        }
                      </span>

                    </div>


                    {/* PROBLEM */}

                    <div>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#71849c",

                          fontSize:
                            "8px",

                          marginBottom:
                            "4px",
                        }}
                      >
                        {L(
                          language,
                          "Problem",
                          "المشكلة"
                        )}
                      </span>


                      <strong
                        style={{
                          color:
                            "#c4d0de",

                          fontSize:
                            "10px",

                          lineHeight:
                            1.5,
                        }}
                      >
                        {
                          issue
                        }
                      </strong>

                    </div>


                    {/* STATUS */}

                    <div>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#71849c",

                          fontSize:
                            "8px",

                          marginBottom:
                            "4px",
                        }}
                      >
                        {L(
                          language,
                          "Status",
                          "الحالة"
                        )}
                      </span>


                      <strong
                        style={{
                          color:
                            "#79a9ff",

                          fontSize:
                            "10px",
                        }}
                      >
                        {
                          status
                        }
                      </strong>

                    </div>


                    <PriorityBadge
                      priority={
                        item.priority
                      }
                      language={
                        language
                      }
                    />


                    <ChevronRight
                      size={17}
                      color="#79a9ff"
                      style={
                        arrowStyle
                      }
                      aria-hidden="true"
                    />

                  </Link>
                );
              }
            )}

          </div>

        </section>


        {/* ================================================
            LAST COMPLETED CASE
            ================================================ */}

        <section
          style={{
            marginTop:
              "18px",

            padding:
              "17px 18px",

            borderRadius:
              "16px",

            border:
              "1px solid rgba(89,207,160,0.14)",

            background:
              "rgba(89,207,160,0.035)",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap:
              "16px",

            flexWrap:
              "wrap",
          }}
        >

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "11px",
            }}
          >

            <div
              style={{
                width:
                  "38px",

                height:
                  "38px",

                display:
                  "grid",

                placeItems:
                  "center",

                borderRadius:
                  "11px",

                color:
                  "#59cfa0",

                background:
                  "rgba(89,207,160,0.08)",
              }}
            >
              <CheckCircle2
                size={20}
                aria-hidden="true"
              />
            </div>


            <div>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#6d8298",

                  fontSize:
                    "8px",
                }}
              >
                {L(
                  language,
                  "LAST COMPLETED CASE",
                  "آخر حالة مكتملة"
                )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#dce7f2",

                  fontSize:
                    "11px",
                }}
              >
                {
                  VERIFIED_DEMO_CASE.person?.[
                    language
                  ] ||
                  VERIFIED_DEMO_CASE.person?.en
                }

                {" · "}

                <span
                  dir="ltr"
                >
                  {
                    VERIFIED_DEMO_CASE.id
                  }
                </span>
              </strong>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#59cfa0",

                  fontSize:
                    "9px",

                  fontWeight:
                    800,
                }}
              >
                {L(
                  language,
                  "Resolved and verified successfully",
                  "تم الحل والتحقق بنجاح"
                )}
              </span>

            </div>

          </div>


          <Link
            href={
              `/cases/${VERIFIED_DEMO_CASE.id}`
            }
            className="textButton"
            style={{
              textDecoration:
                "none",
            }}
          >
            {L(
              language,
              "View Details",
              "عرض التفاصيل"
            )}

            <ChevronRight
              size={16}
              style={
                arrowStyle
              }
              aria-hidden="true"
            />
          </Link>

        </section>


        {/* ================================================
            SIMPLE SAFETY NOTE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "18px 0 0",

            padding:
              "16px",
          }}
        >

          <ShieldCheck
            size={22}
            aria-hidden="true"
          />


          <div>

            <strong>
              {L(
                language,
                "Human approval is required",
                "التعديل يحتاج اعتمادًا بشريًا"
              )}
            </strong>


            <span>
              {L(
                language,

                "The system detects and recommends. Sensitive corrections are executed only after employee and manager approval.",

                "يكتشف النظام المشكلة ويقترح الحل، ولا يتم تنفيذ التعديل الحساس إلا بعد اعتماد الموظف والمدير."
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

            <CheckCircle2
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "System Active",
              "النظام نشط"
            )}

          </div>

        </footer>


        <style jsx>{`
          @media (max-width: 760px) {
            .homeWorkflowGrid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 560px) {
            .homeWorkflowGrid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>

      </main>

    </div>
  );
}