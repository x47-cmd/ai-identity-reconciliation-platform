"use client";

import {
  useEffect,
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  ACTIVE_CASES,
  PLATFORM_METRICS,
} from "../lib/demo-data";

import {
  initializeDemoCaseStore,
  useCaseStore,
} from "../lib/case-store";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  ChevronRight,
  CircleAlert,
  FileSearch,
  GitCompareArrows,
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
   SIMPLE WORKFLOW

   Employee-facing explanation only.

   1. AI detects and analyzes
   2. Employee reviews
   3. AI prepares correction
   4. Manager approves
   5. Correction is executed and verified
   ========================================================= */

const workflowSteps = [
  {
    number:
      1,

    title: {
      en:
        "Detect & Analyze",

      ar:
        "اكتشاف وتحليل",
    },

    description: {
      en:
        "AI detects the problem and analyzes the evidence.",

      ar:
        "يكتشف الذكاء الاصطناعي المشكلة ويحلل الأدلة.",
    },
  },

  {
    number:
      2,

    title: {
      en:
        "Employee Review",

      ar:
        "تدقيق الموظف",
    },

    description: {
      en:
        "The authorized employee reviews the case.",

      ar:
        "يراجع الموظف المخول الحالة والتوصية.",
    },
  },

  {
    number:
      3,

    title: {
      en:
        "Prepare Correction",

      ar:
        "تجهيز التعديل",
    },

    description: {
      en:
        "AI prepares the proposed before-and-after change.",

      ar:
        "يجهز الذكاء الاصطناعي التعديل المقترح قبل وبعد.",
    },
  },

  {
    number:
      4,

    title: {
      en:
        "Manager Approval",

      ar:
        "موافقة المدير",
    },

    description: {
      en:
        "The Manager approves or returns the correction.",

      ar:
        "يعتمد المدير التعديل أو يعيده للمراجعة.",
    },
  },

  {
    number:
      5,

    title: {
      en:
        "Execute & Verify",

      ar:
        "التنفيذ والتحقق",
    },

    description: {
      en:
        "The approved change is executed and verified.",

      ar:
        "يتم تنفيذ التعديل المعتمد ثم التحقق منه.",
    },
  },
];


/* =========================================================
   ISSUE LABELS
   ========================================================= */

function getIssueLabel(
  issue,
  language
) {
  const labels = {
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

    WRONG_MAPPING: {
      en:
        "Incorrect Identity Link",

      ar:
        "ربط هوية غير صحيح",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en:
        "Complex Record Conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Identity",

      ar:
        "سجل هوية مكرر",
    },

    DATA_MISMATCH: {
      en:
        "Data Mismatch",

      ar:
        "اختلاف في البيانات",
    },

    ORPHAN_RECORD: {
      en:
        "Missing Identity Link",

      ar:
        "سجل بدون مرجع مرتبط",
    },
  };


  return (
    labels[
      issue
    ]?.[
      language
    ] ||
    labels[
      issue
    ]?.en ||
    issue
  );
}


/* =========================================================
   STATUS LABELS
   ========================================================= */

function getStatusLabel(
  status,
  language
) {
  const labels = {
    AI_INVESTIGATED: {
      en:
        "AI Analysis Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
    },

    READY_FOR_OFFICER_REVIEW: {
      en:
        "Ready for Employee Review",

      ar:
        "جاهزة لتدقيق الموظف",
    },

    AWAITING_MANAGER_APPROVAL: {
      en:
        "Waiting for Manager",

      ar:
        "بانتظار موافقة المدير",
    },

    READY_FOR_CORRECTION: {
      en:
        "Ready for Correction",

      ar:
        "جاهزة لتنفيذ التعديل",
    },

    AWAITING_VERIFICATION: {
      en:
        "Waiting for Verification",

      ar:
        "بانتظار التحقق",
    },

    VERIFICATION_FAILED: {
      en:
        "Verification Requires Review",

      ar:
        "التحقق يحتاج إلى مراجعة",
    },

    OFFICER_REJECTED: {
      en:
        "Returned by Employee",

      ar:
        "لم تعتمد من الموظف",
    },

    MANAGER_REJECTED: {
      en:
        "Not Approved by Manager",

      ar:
        "لم تعتمد من المدير",
    },
  };


  return (
    labels[
      status
    ]?.[
      language
    ] ||
    labels[
      status
    ]?.en ||
    status
  );
}


/* =========================================================
   STATUS STYLE
   ========================================================= */

function getStatusColors(
  status
) {
  if (
    status ===
    "READY_FOR_OFFICER_REVIEW"
  ) {
    return {
      color:
        "#59cfa0",

      background:
        "rgba(89,207,160,0.08)",

      border:
        "rgba(89,207,160,0.20)",
    };
  }


  if (
    status ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return {
      color:
        "#ffbd67",

      background:
        "rgba(255,189,103,0.08)",

      border:
        "rgba(255,189,103,0.20)",
    };
  }


  if (
    status ===
    "READY_FOR_CORRECTION"
  ) {
    return {
      color:
        "#59cfa0",

      background:
        "rgba(89,207,160,0.08)",

      border:
        "rgba(89,207,160,0.20)",
    };
  }


  if (
    status ===
    "AWAITING_VERIFICATION"
  ) {
    return {
      color:
        "#8db6ff",

      background:
        "rgba(121,169,255,0.08)",

      border:
        "rgba(121,169,255,0.19)",
    };
  }


  if (
    status ===
    "VERIFICATION_FAILED"
  ) {
    return {
      color:
        "#ff7c89",

      background:
        "rgba(255,80,100,0.08)",

      border:
        "rgba(255,80,100,0.20)",
    };
  }


  return {
    color:
      "#79a9ff",

    background:
      "rgba(121,169,255,0.07)",

    border:
      "rgba(121,169,255,0.17)",
  };
}


/* =========================================================
   PRIORITY
   ========================================================= */

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
    <span className={className}>
      {
        labels[
          priority
        ]?.[
          language
        ] ||
        priority
      }
    </span>
  );
}


/* =========================================================
   NEXT ACTION
   ========================================================= */

function getCaseAction(
  item,
  language
) {
  const status =
    item.workflowStatus ||
    item.finalStatus;


  if (
    status ===
    "READY_FOR_OFFICER_REVIEW"
  ) {
    return {
      href:
        `/officer-review?case=${item.id}`,

      label:
        L(
          language,
          "Start Employee Review",
          "بدء تدقيق الموظف"
        ),

      tone:
        "green",
    };
  }


  if (
    status ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return {
      href:
        `/manager-approval?case=${item.id}`,

      label:
        L(
          language,
          "Open Manager Approval",
          "فتح موافقة المدير"
        ),

      tone:
        "amber",
    };
  }


  if (
    status ===
    "READY_FOR_CORRECTION" ||
    status ===
    "AWAITING_VERIFICATION" ||
    status ===
    "VERIFICATION_FAILED"
  ) {
    return {
      href:
        `/corrections-verification?case=${item.id}`,

      label:
        status ===
        "READY_FOR_CORRECTION"
          ? L(
              language,
              "Open Correction",
              "فتح تنفيذ التعديل"
            )
          : L(
              language,
              "Open Verification",
              "فتح التحقق"
            ),

      tone:
        "blue",
    };
  }


  return {
    href:
      `/cases/${item.id}`,

    label:
      L(
        language,
        "View Case Analysis",
        "عرض تحليل الحالة"
      ),

    tone:
      "blue",
  };
}


/* =========================================================
   METRIC CARD
   ========================================================= */

function Metric({
  icon: Icon,
  value,
  title,
  accent,
}) {
  return (
    <div
      className="metricCard"
      style={{
        minHeight:
          "122px",

        border:
          `1px solid ${accent}20`,

        background:
          `linear-gradient(180deg, ${accent}08 0%, rgba(9,24,43,0.72) 100%)`,
      }}
    >

      <div
        className="metricIcon"
        style={{
          color:
            accent,

          background:
            `${accent}10`,

          border:
            `1px solid ${accent}18`,
        }}
      >
        <Icon
          size={20}
          aria-hidden="true"
        />
      </div>


      <div className="metricValue">
        {value}
      </div>


      <div className="metricTitle">
        {title}
      </div>

    </div>
  );
}


/* =========================================================
   WORKFLOW
   ========================================================= */

function WorkflowOverview({
  language,
}) {
  return (
    <section
      className="simpleWorkflow"
      style={{
        margin:
          "18px 0",

        padding:
          "20px",

        borderRadius:
          "17px",

        border:
          "1px solid rgba(89,207,160,0.13)",

        background:
          "linear-gradient(135deg, rgba(16,45,66,0.78), rgba(8,24,43,0.88))",
      }}
    >

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            "9px",

          marginBottom:
            "18px",

          color:
            "#59cfa0",
        }}
      >
        <GitCompareArrows
          size={20}
          aria-hidden="true"
        />

        <strong
          style={{
            fontSize:
              "13px",
          }}
        >
          {L(
            language,
            "How is a detected case resolved?",
            "كيف يتم حل الحالة؟"
          )}
        </strong>
      </div>


      <div
        className="workflowGrid"
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(5, minmax(0, 1fr))",

          gap:
            "10px",
        }}
      >
        {
          workflowSteps.map(
            (
              step
            ) => (
              <div
                key={
                  step.number
                }
                className="workflowItem"
                style={{
                  minWidth:
                    0,

                  padding:
                    "13px 10px",

                  borderRadius:
                    "11px",

                  textAlign:
                    "center",

                  background:
                    "rgba(255,255,255,0.018)",

                  border:
                    "1px solid rgba(255,255,255,0.045)",
                }}
              >

                <div
                  style={{
                    width:
                      "31px",

                    height:
                      "31px",

                    margin:
                      "0 auto 9px",

                    display:
                      "grid",

                    placeItems:
                      "center",

                    borderRadius:
                      "50%",

                    border:
                      step.number ===
                      1
                        ? "1px solid rgba(89,207,160,0.55)"
                        : "1px solid rgba(121,169,255,0.24)",

                    background:
                      step.number ===
                      1
                        ? "rgba(89,207,160,0.09)"
                        : "rgba(121,169,255,0.045)",

                    color:
                      step.number ===
                      1
                        ? "#59cfa0"
                        : "#9aadc4",

                    fontSize:
                      "10px",

                    fontWeight:
                      850,
                  }}
                >
                  {
                    step.number
                  }
                </div>


                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#dbe6f2",

                    fontSize:
                      "9.5px",

                    lineHeight:
                      1.4,
                  }}
                >
                  {
                    step.title[
                      language
                    ] ||
                    step.title.en
                  }
                </strong>


                <span
                  className="workflowDescription"
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#71849c",

                    fontSize:
                      "8px",

                    lineHeight:
                      1.45,
                  }}
                >
                  {
                    step.description[
                      language
                    ] ||
                    step.description.en
                  }
                </span>

              </div>
            )
          )
        }
      </div>

    </section>
  );
}


/* =========================================================
   CASE CARD
   ========================================================= */

function CaseCard({
  item,
  language,
  featured,
  arrowStyle,
}) {
  const personName =
    item.person?.[
      language
    ] ||
    item.person?.en ||
    item.id;


  const summary =
    item.aiSummary?.[
      language
    ] ||
    item.aiSummary?.en ||
    L(
      language,
      "AI analysis is available for this case.",
      "تحليل الذكاء الاصطناعي متاح لهذه الحالة."
    );


  const status =
    item.workflowStatus ||
    item.finalStatus;


  const statusColors =
    getStatusColors(
      status
    );


  const action =
    getCaseAction(
      item,
      language
    );


  const actionStyle =
    action.tone ===
    "green"
      ? {
          color:
            "#071b16",

          background:
            "linear-gradient(90deg, #4bc58f, #67d8aa)",

          border:
            "1px solid rgba(111,230,180,0.40)",
        }
      : action.tone ===
        "amber"
        ? {
            color:
              "#ffbd67",

            background:
              "rgba(255,189,103,0.07)",

            border:
              "1px solid rgba(255,189,103,0.20)",
          }
        : {
            color:
              "#79a9ff",

            background:
              "rgba(121,169,255,0.07)",

            border:
              "1px solid rgba(121,169,255,0.18)",
          };


  return (
    <article
      style={{
        padding:
          "18px",

        borderRadius:
          "15px",

        border:
          featured
            ? "1px solid rgba(89,207,160,0.30)"
            : "1px solid rgba(121,169,255,0.10)",

        background:
          featured
            ? "linear-gradient(135deg, rgba(15,46,59,0.62), rgba(9,26,46,0.88))"
            : "rgba(11,29,50,0.72)",
      }}
    >

      {/* ================================================
          NAME + PRIORITY
          ================================================ */}

      <div
        style={{
          display:
            "flex",

          alignItems:
            "flex-start",

          justifyContent:
            "space-between",

          gap:
            "14px",
        }}
      >

        <div>

          {
            featured && (
              <span
                style={{
                  display:
                    "inline-flex",

                  alignItems:
                    "center",

                  gap:
                    "5px",

                  marginBottom:
                    "8px",

                  color:
                    "#59cfa0",

                  fontSize:
                    "8px",

                  fontWeight:
                    800,
                }}
              >
                <ShieldCheck
                  size={12}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "TOP PRIORITY",
                  "أعلى أولوية"
                )}
              </span>
            )
          }


          <strong
            style={{
              display:
                "block",

              color:
                "#e4edf8",

              fontSize:
                "14px",
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
                "#657990",

              fontSize:
                "9px",
            }}
          >
            {item.id}
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

      </div>


      {/* ================================================
          ESSENTIAL INFORMATION
          ================================================ */}

      <div
        className="caseEssentials"
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "1fr 0.65fr 1fr",

          gap:
            "10px",

          marginTop:
            "16px",
        }}
      >

        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#667991",

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
                "#d2ddea",

              fontSize:
                "10px",

              lineHeight:
                1.45,
            }}
          >
            {
              getIssueLabel(
                item.caseType,
                language
              )
            }
          </strong>

        </div>


        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#667991",

              fontSize:
                "8px",

              marginBottom:
                "4px",
            }}
          >
            {L(
              language,
              "AI Confidence",
              "ثقة الذكاء"
            )}
          </span>


          <strong
            dir="ltr"
            style={{
              color:
                "#e6eef8",

              fontSize:
                "13px",
            }}
          >
            {
              item.aiConfidence
            }%
          </strong>

        </div>


        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#667991",

              fontSize:
                "8px",

              marginBottom:
                "4px",
            }}
          >
            {L(
              language,
              "Next Step",
              "الإجراء التالي"
            )}
          </span>


          <span
            style={{
              display:
                "inline-flex",

              padding:
                "5px 7px",

              borderRadius:
                "7px",

              color:
                statusColors.color,

              background:
                statusColors.background,

              border:
                `1px solid ${statusColors.border}`,

              fontSize:
                "8.5px",

              fontWeight:
                800,

              lineHeight:
                1.35,
            }}
          >
            {
              getStatusLabel(
                status,
                language
              )
            }
          </span>

        </div>

      </div>


      {/* ================================================
          AI SUMMARY
          ================================================ */}

      <div
        className="caseSummary"
        style={{
          display:
            "flex",

          alignItems:
            "flex-start",

          gap:
            "7px",

          marginTop:
            "15px",

          paddingTop:
            "13px",

          borderTop:
            "1px solid rgba(255,255,255,0.045)",
        }}
      >
        <BrainCircuit
          size={15}
          color="#69a2ff"
          aria-hidden="true"
        />

        <span
          style={{
            color:
              "#8193aa",

            fontSize:
              "9.5px",

            lineHeight:
              1.6,
          }}
        >
          {summary}
        </span>
      </div>


      {/* ================================================
          ACTION
          ================================================ */}

      <Link
        href={
          action.href
        }
        style={{
          minHeight:
            "40px",

          marginTop:
            "15px",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          gap:
            "7px",

          borderRadius:
            "10px",

          textDecoration:
            "none",

          fontSize:
            "10px",

          fontWeight:
            850,

          ...actionStyle,
        }}
      >
        {
          action.label
        }

        <ChevronRight
          size={14}
          style={
            arrowStyle
          }
          aria-hidden="true"
        />
      </Link>

    </article>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CasesPage() {
  const {
    language,
  } =
    useLanguage();


  const store =
    useCaseStore();


  useEffect(
    () => {
      initializeDemoCaseStore();
    },
    []
  );


  const isArabic =
    language ===
    "ar";


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  /* =======================================================
     ACTIVE CASES ONLY

     Historical / VERIFIED_CLOSED cases are deliberately
     excluded from this workspace.
     ======================================================= */

  const activeCases =
    store.initialized
      ? store.cases.filter(
          (
            item
          ) =>
            item.active &&
            !item.closed &&
            item.finalStatus !==
              "VERIFIED_CLOSED"
        )
      : ACTIVE_CASES;


  const priorityOrder = {
    IMMEDIATE:
      3,

    HIGH:
      2,

    MEDIUM:
      1,
  };


  const sortedActiveCases =
    [
      ...activeCases,
    ].sort(
      (
        a,
        b
      ) => {

        const priorityDifference =
          (
            priorityOrder[
              b.priority
            ] ||
            0
          )
          -
          (
            priorityOrder[
              a.priority
            ] ||
            0
          );


        if (
          priorityDifference !==
          0
        ) {
          return (
            priorityDifference
          );
        }


        const protectiveDifference =
          Number(
            b.protectivePriority ||
            0
          )
          -
          Number(
            a.protectivePriority ||
            0
          );


        if (
          protectiveDifference !==
          0
        ) {
          return (
            protectiveDifference
          );
        }


        return (
          a.id.localeCompare(
            b.id
          )
        );
      }
    );


  const importantCases =
    sortedActiveCases.slice(
      0,
      3
    );


  /* =======================================================
     DYNAMIC COUNTS
     ======================================================= */

  const activeCount =
    activeCases.length;


  const urgentCount =
    activeCases.filter(
      (
        item
      ) =>
        item.priority ===
        "IMMEDIATE"
    ).length;


  const officerQueueCount =
    activeCases.filter(
      (
        item
      ) =>
        (
          item.workflowStatus ||
          item.finalStatus
        ) ===
        "READY_FOR_OFFICER_REVIEW"
    ).length;


  const managerQueueCount =
    activeCases.filter(
      (
        item
      ) =>
        (
          item.workflowStatus ||
          item.finalStatus
        ) ===
        "AWAITING_MANAGER_APPROVAL"
    ).length;


  const protectiveCount =
    activeCases.filter(
      (
        item
      ) =>
        Boolean(
          item.wronglyAffected
        )
    ).length;


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
              <BrainCircuit
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "ACTIVE IDENTITY CASES",
                "حالات الهوية النشطة"
              )}
            </div>


            <h1>
              {L(
                language,
                "Cases",
                "الحالات"
              )}
            </h1>


            <p>
              {L(
                language,

                "Review active identity problems and continue each case from the exact step that requires action.",

                "راجع حالات الهوية النشطة، وافتح كل حالة من الخطوة التي تحتاج إلى إجراء."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            SIMPLE KPIs

            No completed cases are shown here.
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={
              FileSearch
            }
            value={
              activeCount
            }
            accent="#9a7cff"
            title={
              L(
                language,
                "Active Cases",
                "الحالات النشطة"
              )
            }
          />


          <Metric
            icon={
              CircleAlert
            }
            value={
              urgentCount
            }
            accent="#ff7c89"
            title={
              L(
                language,
                "Urgent",
                "حالات فورية"
              )
            }
          />


          <Metric
            icon={
              UserCheck
            }
            value={
              officerQueueCount
            }
            accent="#59cfa0"
            title={
              L(
                language,
                "Waiting for Employee",
                "بانتظار الموظف"
              )
            }
          />


          <Metric
            icon={
              ShieldCheck
            }
            value={
              managerQueueCount
            }
            accent="#ffbd67"
            title={
              L(
                language,
                "Waiting for Manager",
                "بانتظار المدير"
              )
            }
          />

        </section>


        {/* ================================================
            WORKFLOW
            ================================================ */}

        <WorkflowOverview
          language={
            language
          }
        />


        {/* ================================================
            PROTECTIVE WARNING

            Active protective cases only.
            ================================================ */}

        {
          protectiveCount >
          0 && (
            <section className="alertBanner">

              <div className="alertIcon">
                <AlertTriangle
                  size={23}
                  aria-hidden="true"
                />
              </div>


              <div className="alertText">

                <strong>
                  {L(
                    language,

                    `${protectiveCount} active cases may affect another person`,

                    `${protectiveCount} حالات نشطة قد تؤثر على شخص آخر`
                  )}
                </strong>


                <span>
                  {L(
                    language,

                    "These cases are given higher attention because an incorrect identity link could affect someone who does not own the related record.",

                    "تحصل هذه الحالات على أولوية أعلى لأن الربط الخاطئ قد يؤثر على شخص لا تعود إليه البيانات المرتبطة."
                  )}
                </span>

              </div>

            </section>
          )
        }


        {/* ================================================
            TOP 3 ACTIVE CASES
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
                  "PRIORITY ACTIVE CASES",
                  "أهم الحالات النشطة"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Cases Requiring Attention Now",
                  "الحالات التي تحتاج إلى إجراء الآن"
                )}
              </h2>

            </div>


            <div
              className="monitoringLabel"
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "6px",

                color:
                  "#6f829a",

                fontSize:
                  "9px",
              }}
            >
              <Activity
                size={14}
                aria-hidden="true"
              />

              {L(
                language,
                "Monitoring Active",
                "المراقبة نشطة"
              )}
            </div>

          </div>


          <div
            style={{
              display:
                "grid",

              gap:
                "12px",

              padding:
                "15px",
            }}
          >
            {
              importantCases.map(
                (
                  item,
                  index
                ) => (
                  <CaseCard
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                    language={
                      language
                    }
                    featured={
                      index ===
                      0
                    }
                    arrowStyle={
                      arrowStyle
                    }
                  />
                )
              )
            }
          </div>


          {/* ==============================================
              VIEW ALL ACTIVE CASES

              New dedicated page.
              ============================================== */}

          <div
            style={{
              padding:
                "0 15px 16px",
            }}
          >
            <Link
              href="/cases/all"
              style={{
                minHeight:
                  "39px",

                width:
                  "100%",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                gap:
                  "6px",

                borderRadius:
                  "10px",

                textDecoration:
                  "none",

                color:
                  "#79a9ff",

                background:
                  "rgba(70,140,255,0.045)",

                border:
                  "1px solid rgba(70,140,255,0.11)",

                fontSize:
                  "10px",

                fontWeight:
                  800,
              }}
            >
              {L(
                language,

                `View All Active Cases (${activeCount})`,

                `عرض جميع الحالات النشطة (${activeCount})`
              )}

              <ChevronRight
                size={14}
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </Link>
          </div>

        </section>


        {/* ================================================
            CLOSED CASE RULE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "15px",
          }}
        >
          <ShieldCheck
            size={21}
            aria-hidden="true"
          />


          <div>

            <strong>
              {L(
                language,
                "Completed cases leave this workspace",
                "الحالات المكتملة تخرج من هذه الصفحة"
              )}
            </strong>


            <span>
              {L(
                language,

                "After correction and successful verification, the case is removed from Active Cases and kept in Reports & Audit with its full history.",

                "بعد تنفيذ التعديل ونجاح التحقق، تختفي الحالة من الحالات النشطة وتنتقل إلى التقارير والسجل مع الاحتفاظ بكامل تاريخها."
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
              "AI Biometric Reconciliation Platform · Active Cases",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · الحالات النشطة"
            )}
          </span>


          <div>

            <Activity
              size={14}
              aria-hidden="true"
            />

            {L(
              language,
              `${PLATFORM_METRICS.aggregatedCases} detected historically`,
              `${PLATFORM_METRICS.aggregatedCases} حالة مكتشفة إجمالًا`
            )}

          </div>

        </footer>


        {/* ================================================
            MOBILE FINE-TUNING
            ================================================ */}

        <style jsx>{`

          @media (
            max-width: 760px
          ) {

            .workflowGrid {
              grid-template-columns:
                repeat(
                  2,
                  minmax(
                    0,
                    1fr
                  )
                )
                !important;
            }


            .workflowItem:last-child {
              grid-column:
                1 / -1;
            }


            .workflowDescription {
              display:
                none
                !important;
            }


            .caseEssentials {
              grid-template-columns:
                1fr
                1fr
                !important;
            }


            .caseEssentials
            > div:last-child {
              grid-column:
                1 / -1;
            }


            .monitoringLabel {
              display:
                none
                !important;
            }

          }


          @media (
            max-width: 460px
          ) {

            .simpleWorkflow {
              padding:
                15px
                !important;
            }


            .caseSummary {
              margin-top:
                12px
                !important;
            }

          }

        `}</style>

      </main>

    </div>
  );
}