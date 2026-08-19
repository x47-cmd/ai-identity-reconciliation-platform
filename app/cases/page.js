"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileSearch,
  GitCompareArrows,
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
   WORKFLOW
   ========================================================= */

const workflowSteps = [
  {
    number: 1,

    title: {
      en:
        "Case Detection",

      ar:
        "اكتشاف الحالة",
    },

    description: {
      en:
        "AI detects an identity or biometric linking problem.",

      ar:
        "يكتشف الذكاء الاصطناعي مشكلة في الهوية أو ربط السجل البيومتري.",
    },
  },

  {
    number: 2,

    title: {
      en:
        "Officer Review",

      ar:
        "تدقيق موظف المراجعة",
    },

    description: {
      en:
        "An authorized officer reviews the evidence and recommendation.",

      ar:
        "يراجع الموظف المخول الأدلة والتوصية المقترحة.",
    },
  },

  {
    number: 3,

    title: {
      en:
        "AI Correction Proposal",

      ar:
        "اقتراح التعديل بالذكاء الاصطناعي",
    },

    description: {
      en:
        "AI prepares the proposed before-and-after correction.",

      ar:
        "يجهز الذكاء الاصطناعي الإجراء المقترح وحالة ما قبل وما بعد التعديل.",
    },
  },

  {
    number: 4,

    title: {
      en:
        "Manager Approval",

      ar:
        "موافقة المدير",
    },

    description: {
      en:
        "The manager authorizes or rejects the proposed correction.",

      ar:
        "يعتمد المدير الإجراء المقترح أو يعيده للمراجعة.",
    },
  },

  {
    number: 5,

    title: {
      en:
        "Execution & Verification",

      ar:
        "التنفيذ والتحقق",
    },

    description: {
      en:
        "The approved correction is executed and verified before closure.",

      ar:
        "يتم تنفيذ التعديل المعتمد ثم التحقق منه قبل إغلاق الحالة.",
    },
  },
];


/* =========================================================
   REPRESENTATIVE CASES

   Synthetic demonstration names only.

   Identity-name policy:
   - First Name + Second Name only
   - No third name
   - No surname
   - No family name
   - No tribe name

   CASE-2026-00001 is the primary interactive
   demonstration workflow.
   ========================================================= */

const cases = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    person:
      VERIFIED_DEMO_CASE.person,

    issue:
      VERIFIED_DEMO_CASE.caseType,

    aiFinding: {
      en:
        "AI detected an incorrect biometric-to-person link with possible impact on another person. The case is ready for authorized officer review.",

      ar:
        "اكتشف الذكاء الاصطناعي ربطًا غير صحيح للسجل البيومتري مع احتمال تأثير على شخص آخر، والحالة جاهزة الآن لتدقيق موظف المراجعة.",
    },

    confidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    priority:
      VERIFIED_DEMO_CASE.priority,

    status:
      "READY_FOR_OFFICER_REVIEW",

    featured:
      true,

    action: {
      href:
        "/officer-review",

      en:
        "Start Officer Review",

      ar:
        "بدء تدقيق موظف المراجعة",
    },
  },

  {
    id:
      "CASE-2026-00005",

    person: {
      en:
        "Ahmed Saeed",

      ar:
        "أحمد سعيد",
    },

    issue:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    aiFinding: {
      en:
        "AI completed the analysis and prepared a correction recommendation. The case is now waiting for manager authorization.",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي وتم تجهيز توصية بالتصحيح، والحالة الآن بانتظار اعتماد المدير.",
    },

    confidence:
      99.96,

    priority:
      "IMMEDIATE",

    status:
      "AWAITING_MANAGER_APPROVAL",

    featured:
      false,

    action: {
      href:
        "/manager-approval",

      en:
        "Open Manager Approval",

      ar:
        "فتح مسار موافقة المدير",
    },
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    person:
      COMPLEX_DEMO_CASE.person,

    issue:
      COMPLEX_DEMO_CASE.caseType,

    aiFinding: {
      en:
        "AI combined five related findings and identified REF-002343 as the strongest reference candidate for the investigation.",

      ar:
        "جمع الذكاء الاصطناعي خمس نتائج مترابطة وحدد REF-002343 كأقوى مرشح مرجعي للتحقيق.",
    },

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      COMPLEX_DEMO_CASE.finalStatus,

    featured:
      false,

    action: {
      href:
        `/cases/${COMPLEX_DEMO_CASE.id}`,

      en:
        "View AI Investigation",

      ar:
        "عرض تحليل الحالة",
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
        "Critical Record Conflict",

      ar:
        "تعارض حرج في الربط",
    },

    WRONG_MAPPING: {
      en:
        "Incorrect Biometric Link",

      ar:
        "ربط بيومتري غير صحيح",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en:
        "Complex Record Conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Reference Record",

      ar:
        "تكرار في السجل المرجعي",
    },

    DATA_MISMATCH: {
      en:
        "Data Mismatch",

      ar:
        "اختلاف بين البيانات",
    },

    ORPHAN_RECORD: {
      en:
        "Biometric Record Without Reference",

      ar:
        "سجل بيومتري بدون مرجع",
    },
  };


  return (
    labels[issue]?.[
      language
    ] ||
    labels[issue]?.en ||
    issue
  );
}


/* =========================================================
   STATUS
   ========================================================= */

function getStatusLabel(
  status,
  language
) {
  const labels = {
    READY_FOR_OFFICER_REVIEW: {
      en:
        "Ready for Officer Review",

      ar:
        "جاهزة لتدقيق الموظف",
    },

    AWAITING_MANAGER_APPROVAL: {
      en:
        "Waiting for Manager Approval",

      ar:
        "بانتظار موافقة المدير",
    },

    AI_INVESTIGATED: {
      en:
        "AI Analysis Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
    },

    VERIFIED_CLOSED: {
      en:
        "Resolved & Verified",

      ar:
        "تم الحل والتحقق",
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


function getStatusColors(
  status
) {
  if (
    status ===
    "VERIFIED_CLOSED"
  ) {
    return {
      color:
        "#59cfa0",

      background:
        "rgba(89,207,160,0.08)",

      border:
        "rgba(89,207,160,0.22)",
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
        "rgba(255,189,103,0.22)",
    };
  }


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
        "rgba(89,207,160,0.22)",
    };
  }


  return {
    color:
      "#79a9ff",

    background:
      "rgba(121,169,255,0.07)",

    border:
      "rgba(121,169,255,0.18)",
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
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
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
      {labels[
        priority
      ]?.[
        language
      ] ||
        priority}
    </span>
  );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  value,
  title,
  description,
  accent,
}) {
  return (
    <div
      className="metricCard"
      style={{
        minHeight:
          "150px",

        border:
          `1px solid ${accent}22`,

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
          size={21}
          aria-hidden="true"
        />
      </div>


      <div className="metricValue">
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
   WORKFLOW STEPPER
   ========================================================= */

function WorkflowOverview({
  language,
}) {
  return (
    <section
      style={{
        margin:
          "20px 0",

        padding:
          "22px",

        borderRadius:
          "18px",

        border:
          "1px solid rgba(89,207,160,0.13)",

        background:
          "linear-gradient(135deg, rgba(16,45,66,0.82), rgba(8,24,43,0.88))",
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
            "20px",

          color:
            "#59cfa0",
        }}
      >
        <GitCompareArrows
          size={21}
          aria-hidden="true"
        />

        <strong
          style={{
            fontSize:
              "14px",
          }}
        >
          {L(
            language,
            "How is an identity conflict handled?",
            "كيف يتم التعامل مع التداخل؟"
          )}
        </strong>
      </div>


      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(5, minmax(0, 1fr))",

          gap:
            "12px",
        }}
      >
        {workflowSteps.map(
          (step) => (
            <div
              key={step.number}
              style={{
                minWidth:
                  0,

                textAlign:
                  "center",
              }}
            >

              <div
                style={{
                  width:
                    "34px",

                  height:
                    "34px",

                  margin:
                    "0 auto 10px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  borderRadius:
                    "50%",

                  border:
                    step.number === 1
                      ? "1px solid rgba(89,207,160,0.65)"
                      : "1px solid rgba(121,169,255,0.28)",

                  background:
                    step.number === 1
                      ? "rgba(89,207,160,0.10)"
                      : "rgba(121,169,255,0.05)",

                  color:
                    step.number === 1
                      ? "#59cfa0"
                      : "#9fb1c7",

                  fontWeight:
                    800,

                  fontSize:
                    "11px",
                }}
              >
                {step.number}
              </div>


              <strong
                style={{
                  display:
                    "block",

                  color:
                    "#dbe6f2",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.45,
                }}
              >
                {step.title[
                  language
                ] ||
                  step.title.en}
              </strong>


              <span
                className="workflowStepDescription"
                style={{
                  display:
                    "block",

                  marginTop:
                    "6px",

                  color:
                    "#71849c",

                  fontSize:
                    "8px",

                  lineHeight:
                    1.5,
                }}
              >
                {step.description[
                  language
                ] ||
                  step.description.en}
              </span>

            </div>
          )
        )}
      </div>


      <div
        style={{
          marginTop:
            "19px",

          paddingTop:
            "14px",

          borderTop:
            "1px solid rgba(255,255,255,0.05)",

          color:
            "#7e91a8",

          fontSize:
            "9px",

          lineHeight:
            1.6,

          textAlign:
            "center",
        }}
      >
        {L(
          language,

          "Every decision is recorded before the case can proceed to controlled execution and final verification.",

          "يتم توثيق كل قرار قبل انتقال الحالة إلى التنفيذ المنضبط والتحقق النهائي."
        )}
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
  arrowStyle,
}) {
  const personName =
    item.person[
      language
    ] ||
    item.person.en;


  const aiFinding =
    item.aiFinding[
      language
    ] ||
    item.aiFinding.en;


  const statusColors =
    getStatusColors(
      item.status
    );


  return (
    <article
      style={{
        position:
          "relative",

        padding:
          "20px",

        borderRadius:
          "18px",

        border:
          item.featured
            ? "1px solid rgba(89,207,160,0.42)"
            : "1px solid rgba(121,169,255,0.12)",

        background:
          item.featured
            ? "linear-gradient(135deg, rgba(15,46,59,0.72), rgba(9,26,46,0.90))"
            : "linear-gradient(135deg, rgba(12,31,52,0.84), rgba(8,24,43,0.88))",

        boxShadow:
          item.featured
            ? "0 0 30px rgba(89,207,160,0.04)"
            : "none",
      }}
    >

      {item.featured && (
        <div
          style={{
            position:
              "absolute",

            top:
              "14px",

            insetInlineEnd:
              "14px",

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              "5px",

            padding:
              "5px 8px",

            borderRadius:
              "999px",

            color:
              "#59cfa0",

            background:
              "rgba(89,207,160,0.08)",

            border:
              "1px solid rgba(89,207,160,0.18)",

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
            "PRIMARY DEMO",
            "الحالة الرئيسية"
          )}
        </div>
      )}


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

          paddingTop:
            item.featured
              ? "22px"
              : "0",
        }}
      >

        <div>

          <strong
            style={{
              display:
                "block",

              color:
                "#e5eef8",

              fontSize:
                "15px",

              lineHeight:
                1.4,
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
                "5px",

              color:
                "#6c7f97",

              fontSize:
                "9px",
            }}
          >
            {item.id}
          </span>

        </div>


        <div
          style={{
            minWidth:
              "42px",

            width:
              "42px",

            height:
              "42px",

            display:
              "grid",

            placeItems:
              "center",

            borderRadius:
              "13px",

            color:
              item.featured
                ? "#59cfa0"
                : "#79a9ff",

            background:
              item.featured
                ? "rgba(89,207,160,0.07)"
                : "rgba(121,169,255,0.06)",

            border:
              item.featured
                ? "1px solid rgba(89,207,160,0.16)"
                : "1px solid rgba(121,169,255,0.13)",
          }}
        >
          <UserCheck
            size={20}
            aria-hidden="true"
          />
        </div>

      </div>


      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",

          gap:
            "10px",

          marginTop:
            "18px",
        }}
      >

        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#657991",

              fontSize:
                "8px",

              marginBottom:
                "5px",
            }}
          >
            {L(
              language,
              "Problem Type",
              "نوع المشكلة"
            )}
          </span>

          <strong
            style={{
              color:
                "#d5dfeb",

              fontSize:
                "10px",

              lineHeight:
                1.45,
            }}
          >
            {getIssueLabel(
              item.issue,
              language
            )}
          </strong>

        </div>


        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#657991",

              fontSize:
                "8px",

              marginBottom:
                "5px",
            }}
          >
            {L(
              language,
              "AI Confidence",
              "ثقة الذكاء الاصطناعي"
            )}
          </span>

          <strong
            dir="ltr"
            style={{
              color:
                "#e6eef8",

              fontSize:
                "14px",
            }}
          >
            {item.confidence}%
          </strong>

        </div>


        <div>

          <span
            style={{
              display:
                "block",

              color:
                "#657991",

              fontSize:
                "8px",

              marginBottom:
                "5px",
            }}
          >
            {L(
              language,
              "Current Status",
              "الحالة الحالية"
            )}
          </span>

          <span
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              padding:
                "6px 8px",

              borderRadius:
                "8px",

              color:
                statusColors.color,

              background:
                statusColors.background,

              border:
                `1px solid ${statusColors.border}`,

              fontSize:
                "9px",

              fontWeight:
                800,

              lineHeight:
                1.4,
            }}
          >
            {getStatusLabel(
              item.status,
              language
            )}
          </span>

        </div>

      </div>


      <div
        style={{
          display:
            "flex",

          gap:
            "8px",

          alignItems:
            "flex-start",

          marginTop:
            "18px",

          paddingTop:
            "14px",

          borderTop:
            "1px solid rgba(255,255,255,0.045)",
        }}
      >
        <BrainCircuit
          size={16}
          color="#69a2ff"
          aria-hidden="true"
          style={{
            flex:
              "0 0 auto",

            marginTop:
              "1px",
          }}
        />

        <span
          style={{
            color:
              "#8193aa",

            fontSize:
              "10px",

            lineHeight:
              1.65,
          }}
        >
          {aiFinding}
        </span>

      </div>


      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "12px",

          marginTop:
            "18px",
        }}
      >

        <PriorityBadge
          priority={
            item.priority
          }
          language={
            language
          }
        />


        <Link
          href={
            item.action.href
          }
          style={{
            flex:
              "1",

            minHeight:
              "42px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap:
              "8px",

            padding:
              "0 16px",

            borderRadius:
              "11px",

            textDecoration:
              "none",

            fontSize:
              "10px",

            fontWeight:
              850,

            color:
              item.featured
                ? "#061b17"
                : statusColors.color,

            background:
              item.featured
                ? "linear-gradient(90deg, #4bc58f, #68d9ab)"
                : statusColors.background,

            border:
              item.featured
                ? "1px solid rgba(111,230,180,0.45)"
                : `1px solid ${statusColors.border}`,
          }}
        >
          {item.status ===
          "AI_INVESTIGATED" ? (
            <Search
              size={15}
              aria-hidden="true"
            />
          ) : (
            <UserCheck
              size={15}
              aria-hidden="true"
            />
          )}

          {item.action[
            language
          ] ||
            item.action.en}

          <ChevronRight
            size={14}
            style={
              arrowStyle
            }
            aria-hidden="true"
          />
        </Link>

      </div>

    </article>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CasesPage() {
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
              <BrainCircuit
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI-DETECTED BIOMETRIC CASES",
                "الحالات البيومترية المكتشفة بالذكاء الاصطناعي"
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

                "Review identity conflicts and incorrect biometric links detected by AI, then follow the required action from investigation through approval, execution and verification.",

                "تعرض هذه الشاشة حالات تداخل الهوية والربط غير الصحيح التي اكتشفها الذكاء الاصطناعي، ويمكن متابعة كل حالة خطوة بخطوة من التدقيق حتى التنفيذ والتحقق."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={FileSearch}
            value={
              PLATFORM_METRICS.aggregatedCases
            }
            accent="#9a7cff"
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
                "Identity integrity cases detected",
                "حالات رصدها نظام المطابقة"
              )
            }
          />


          <Metric
            icon={CircleAlert}
            value={
              PLATFORM_METRICS.priority.immediate
            }
            accent="#69a2ff"
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
                "Require priority attention",
                "تحتاج إلى أولوية في المراجعة"
              )
            }
          />


          <Metric
            icon={UserCheck}
            value="5"
            accent="#ffbd67"
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
                "Waiting for human authorization",
                "تنتظر قرارًا بشريًا"
              )
            }
          />


          <Metric
            icon={CheckCircle2}
            value="1"
            accent="#59cfa0"
            title={
              L(
                language,
                "Resolved & Verified",
                "تم الحل والتحقق"
              )
            }
            description={
              L(
                language,
                "Completed demonstration workflow",
                "حالة اكتملت حتى الإغلاق"
              )
            }
          />

        </section>


        {/* ================================================
            WORKFLOW EXPLANATION
            ================================================ */}

        <WorkflowOverview
          language={
            language
          }
        />


        {/* ================================================
            PROTECTIVE WARNING
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

                `${PLATFORM_METRICS.wronglyAffectedCases} cases may affect another person`,

                `${PLATFORM_METRICS.wronglyAffectedCases} حالات قد تؤثر على شخص آخر`
              )}
            </strong>


            <span>
              {L(
                language,

                "These cases receive elevated protective priority because an incorrect identity relationship may negatively affect someone who does not own the associated record.",

                "تحصل هذه الحالات على أولوية حماية أعلى لأن الربط غير الصحيح قد يؤدي إلى تأثير سلبي على شخص لا تعود إليه البيانات المرتبطة."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            CASE LIST
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "20px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "CURRENT CASES",
                  "الحالات الحالية"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Select a Case and Continue the Workflow",
                  "اختر الحالة وتابع الإجراء التالي"
                )}
              </h2>

            </div>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "7px",

                color:
                  "#6f829a",

                fontSize:
                  "10px",
              }}
            >
              <Activity
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI monitoring active",
                "المراقبة الذكية نشطة"
              )}
            </div>

          </div>


          <div
            style={{
              display:
                "grid",

              gap:
                "14px",

              padding:
                "18px",
            }}
          >
            {cases.map(
              (item) => (
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
                  arrowStyle={
                    arrowStyle
                  }
                />
              )
            )}
          </div>


          <div
            style={{
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

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

              `The cards above are representative demonstration cases. The validated synthetic dataset contains ${PLATFORM_METRICS.aggregatedCases} detected cases in total.`,

              `تعرض البطاقات أعلاه حالات تمثيلية للمحاكاة، بينما تحتوي مجموعة البيانات الاصطناعية المعتمدة على ${PLATFORM_METRICS.aggregatedCases} حالة مكتشفة إجمالًا.`
            )}
          </div>

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
                "AI analyzes — authorized staff approve",
                "الذكاء الاصطناعي يحلل — والموظفون المخولون يعتمدون"
              )}
            </strong>


            <span>
              {L(
                language,

                "AI identifies the problem and prepares the proposed correction. Sensitive identity changes remain blocked until the authorized officer and manager complete the required approvals.",

                "يحدد الذكاء الاصطناعي المشكلة ويجهز التصحيح المقترح، بينما تبقى التغييرات الحساسة محظورة حتى استكمال اعتماد موظف المراجعة وموافقة المدير."
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
              "AI Biometric Reconciliation Platform · Cases",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · الحالات"
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


        <style jsx>{`
          @media (max-width: 760px) {
            .workflowStepDescription {
              display: none !important;
            }
          }

          @media (max-width: 560px) {
            :global(.statsGrid) {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>

      </main>

    </div>
  );
}