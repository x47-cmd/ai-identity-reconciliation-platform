"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { useLanguage } from "../../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  VERIFIED_DEMO_CASE,
} from "../../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileSearch,
  GitCompareArrows,
  LockKeyhole,
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
   DEMO CASE VIEW MODEL

   IMPORTANT:
   This screen represents the investigation / decision-entry
   point used in the interactive presentation workflow.

   CASE-2026-00001 is intentionally shown at the point where
   AI Investigation is complete and Officer Review is next.

   The validated E2E backend record remains available in
   VERIFIED_DEMO_CASE for final execution / verification data.

   Synthetic identity-name policy:
   - First Name + Second Name only
   - No third name
   - No surname
   - No family name
   - No tribe name
   ========================================================= */

const cases = {
  [VERIFIED_DEMO_CASE.id]: {
    id:
      VERIFIED_DEMO_CASE.id,

    person:
      VERIFIED_DEMO_CASE.person,

    biometric:
      VERIFIED_DEMO_CASE.biometricId,

    caseType:
      VERIFIED_DEMO_CASE.caseType,

    caseTypeLabel: {
      en:
        "Possible Wrong-Person Impact",

      ar:
        "احتمال تأثير على شخص آخر",
    },

    priority:
      VERIFIED_DEMO_CASE.priority,

    currentIdentity: {
      name:
        VERIFIED_DEMO_CASE.currentIdentityName,

      ref:
        VERIFIED_DEMO_CASE.currentIdentity,
    },

    proposedIdentity: {
      name:
        VERIFIED_DEMO_CASE.canonicalIdentityName,

      ref:
        VERIFIED_DEMO_CASE.canonicalIdentity,
    },

    aiConfidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    risk:
      VERIFIED_DEMO_CASE.risk ??
      VERIFIED_DEMO_CASE.riskScore ??
      94.99,

    harm:
      VERIFIED_DEMO_CASE.harm ??
      VERIFIED_DEMO_CASE.harmScore ??
      97.5,

    protectivePriority:
      VERIFIED_DEMO_CASE.protectivePriority ??
      VERIFIED_DEMO_CASE.protectivePriorityScore ??
      98.0,

    findingCount:
      1,

    stage:
      "READY_FOR_OFFICER_REVIEW",

    interactive:
      true,

    aiConclusion: {
      en:
        "AI Identity Resolution detected that the biometric record is linked to the wrong identity. The combined biometric and reference evidence strongly supports REF-001009 as the correct canonical reference.",

      ar:
        "اكتشف حسم الهوية بالذكاء الاصطناعي أن السجل البيومتري مرتبط بهوية غير صحيحة، وأظهرت الأدلة البيومترية والمرجعية أن REF-001009 هو المرجع الصحيح والأقوى للحالة.",
    },

    evidenceReasoning: {
      en:
        "The current mapping to REF-002711 conflicts with the combined biometric evidence. REF-001009 produced the strongest identity-level match and resolves the detected relationship inconsistency.",

      ar:
        "يتعارض الربط الحالي مع REF-002711 مع الأدلة البيومترية المجمعة، بينما حقق REF-001009 أقوى تطابق على مستوى الهوية ويعالج التعارض المكتشف في علاقة الربط.",
    },

    rootCause: {
      en:
        "The biometric record appears to have been associated with an identity that does not belong to its correct owner.",

      ar:
        "يبدو أن السجل البيومتري تم ربطه بهوية لا تعود إلى مالكه الصحيح.",
    },

    humanImpact: {
      en:
        "The incorrect relationship may negatively affect another person. The case therefore receives immediate protective priority and requires authorized human review.",

      ar:
        "قد يؤدي الربط غير الصحيح إلى تأثير سلبي على شخص آخر، ولذلك حصلت الحالة على أولوية حماية فورية وتتطلب مراجعة بشرية مخولة.",
    },

    recommendedAction: {
      en:
        "Replace the current biometric link REF-002711 with the AI-resolved canonical reference REF-001009 after the required human approvals.",

      ar:
        "استبدال الربط البيومتري الحالي REF-002711 بالمرجع الصحيح الذي حدده الذكاء الاصطناعي REF-001009 بعد اكتمال الاعتمادات البشرية المطلوبة.",
    },
  },


  [COMPLEX_DEMO_CASE.id]: {
    id:
      COMPLEX_DEMO_CASE.id,

    person:
      COMPLEX_DEMO_CASE.person,

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    caseType:
      COMPLEX_DEMO_CASE.caseType,

    caseTypeLabel: {
      en:
        "Complex Record Conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    priority:
      COMPLEX_DEMO_CASE.priority,

    currentIdentity: {
      name:
        COMPLEX_DEMO_CASE.currentIdentityName,

      ref:
        COMPLEX_DEMO_CASE.currentIdentity,
    },

    proposedIdentity: {
      name:
        COMPLEX_DEMO_CASE.canonicalIdentityName,

      ref:
        COMPLEX_DEMO_CASE.canonicalIdentity,
    },

    aiConfidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    risk:
      COMPLEX_DEMO_CASE.risk ??
      COMPLEX_DEMO_CASE.riskScore ??
      90,

    harm:
      COMPLEX_DEMO_CASE.harm ??
      COMPLEX_DEMO_CASE.harmScore ??
      60,

    protectivePriority:
      COMPLEX_DEMO_CASE.protectivePriority ??
      COMPLEX_DEMO_CASE.protectivePriorityScore ??
      85,

    findingCount:
      5,

    stage:
      "AI_INVESTIGATED",

    interactive:
      false,

    aiConclusion: {
      en:
        "AI Investigation combined five related findings into a single identity case. Identity Resolution identified REF-002343 as the strongest canonical reference candidate.",

      ar:
        "جمع تحقيق الذكاء الاصطناعي خمس نتائج مترابطة داخل حالة واحدة، وحدد حسم الهوية REF-002343 كأقوى مرشح للهوية المرجعية.",
    },

    evidenceReasoning: {
      en:
        "Several biometric-to-reference relationships conflicted with each other. AI aggregated the related evidence and determined that REF-002343 had the strongest overall support.",

      ar:
        "وجد الذكاء الاصطناعي عدة علاقات متعارضة بين السجلات البيومترية والمراجع، ثم جمع الأدلة ذات العلاقة وحدد REF-002343 كأقوى مرجع مدعوم بالأدلة.",
    },

    rootCause: {
      en:
        "Multiple related mappings contribute to the same underlying identity conflict.",

      ar:
        "توجد عدة عمليات ربط مترابطة تساهم في مشكلة تعارض هوية واحدة.",
    },

    humanImpact: {
      en:
        "The relationship should remain unchanged until authorized human review confirms the proposed canonical identity.",

      ar:
        "يجب عدم تغيير علاقة الربط حتى تؤكد المراجعة البشرية المخولة الهوية المرجعية المقترحة.",
    },

    recommendedAction: {
      en:
        "Continue human investigation of the aggregated findings before authorization is considered.",

      ar:
        "استكمال المراجعة البشرية للنتائج المجمعة قبل النظر في التصريح بأي تعديل.",
    },
  },
};


/* =========================================================
   WORKFLOW
   ========================================================= */

const workflowSteps = [
  {
    number:
      1,

    en:
      "Case Detection",

    ar:
      "اكتشاف الحالة",
  },

  {
    number:
      2,

    en:
      "Officer Review",

    ar:
      "تدقيق الموظف",
  },

  {
    number:
      3,

    en:
      "AI Correction Proposal",

    ar:
      "اقتراح التعديل",
  },

  {
    number:
      4,

    en:
      "Manager Approval",

    ar:
      "موافقة المدير",
  },

  {
    number:
      5,

    en:
      "Execution & Verification",

    ar:
      "التنفيذ والتحقق",
  },
];


/* =========================================================
   LABELS
   ========================================================= */

function priorityLabel(
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


function stageLabel(
  stage,
  language
) {
  const labels = {
    READY_FOR_OFFICER_REVIEW: {
      en:
        "Ready for Officer Review",

      ar:
        "جاهزة لتدقيق الموظف",
    },

    AI_INVESTIGATED: {
      en:
        "AI Investigation Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
    },
  };


  return (
    labels[stage]?.[
      language
    ] ||
    labels[stage]?.en ||
    stage
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
    priority ===
    "IMMEDIATE"
      ? "priority immediate"
      : priority ===
          "HIGH"
        ? "priority high"
        : "priority medium";


  return (
    <span className={className}>
      {priorityLabel(
        priority,
        language
      )}
    </span>
  );
}


/* =========================================================
   STAGE BADGE
   ========================================================= */

function StageBadge({
  stage,
  language,
}) {
  const ready =
    stage ===
    "READY_FOR_OFFICER_REVIEW";


  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          "6px",

        minHeight:
          "28px",

        padding:
          "0 10px",

        borderRadius:
          "8px",

        color:
          ready
            ? "#59cfa0"
            : "#79a9ff",

        background:
          ready
            ? "rgba(89,207,160,0.07)"
            : "rgba(121,169,255,0.07)",

        border:
          ready
            ? "1px solid rgba(89,207,160,0.17)"
            : "1px solid rgba(121,169,255,0.14)",

        fontSize:
          "9px",

        fontWeight:
          850,
      }}
    >
      {ready ? (
        <UserCheck
          size={13}
          aria-hidden="true"
        />
      ) : (
        <BrainCircuit
          size={13}
          aria-hidden="true"
        />
      )}

      {stageLabel(
        stage,
        language
      )}
    </span>
  );
}


/* =========================================================
   WORKFLOW STEPPER
   ========================================================= */

function WorkflowStepper({
  language,
}) {
  return (
    <section
      style={{
        marginBottom:
          "18px",

        padding:
          "20px 18px",

        borderRadius:
          "18px",

        border:
          "1px solid rgba(121,169,255,0.12)",

        background:
          "linear-gradient(135deg, rgba(12,32,54,0.90), rgba(8,24,43,0.92))",
      }}
    >
      <div
        className="workflowGrid"
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(5,minmax(0,1fr))",

          gap:
            "10px",
        }}
      >
        {workflowSteps.map(
          (
            step
          ) => {

            const completed =
              step.number ===
              1;


            return (
              <div
                key={
                  step.number
                }
                style={{
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    width:
                      "36px",

                    height:
                      "36px",

                    margin:
                      "0 auto 9px",

                    display:
                      "grid",

                    placeItems:
                      "center",

                    borderRadius:
                      "50%",

                    border:
                      completed
                        ? "1px solid rgba(89,207,160,0.52)"
                        : "1px solid rgba(121,169,255,0.24)",

                    color:
                      completed
                        ? "#59cfa0"
                        : "#8194ab",

                    background:
                      completed
                        ? "rgba(89,207,160,0.07)"
                        : "rgba(121,169,255,0.04)",

                    fontSize:
                      "11px",

                    fontWeight:
                      850,
                  }}
                >
                  {completed ? (
                    <CheckCircle2
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    step.number
                  )}
                </div>


                <strong
                  style={{
                    display:
                      "block",

                    color:
                      completed
                        ? "#bcd8cd"
                        : "#bdcad8",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.45,
                  }}
                >
                  {L(
                    language,
                    step.en,
                    step.ar
                  )}
                </strong>
              </div>
            );
          }
        )}
      </div>


      <div
        style={{
          marginTop:
            "17px",

          paddingTop:
            "13px",

          borderTop:
            "1px solid rgba(255,255,255,0.05)",

          color:
            "#72859c",

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
          "AI detection and investigation are complete. The next controlled step is authorized human review.",
          "اكتمل اكتشاف الحالة وتحليلها بالذكاء الاصطناعي، والخطوة التالية هي المراجعة البشرية المخولة."
        )}
      </div>

    </section>
  );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  description,
  color = "#79a9ff",
}) {
  return (
    <div
      className="metricCard"
      style={{
        border:
          `1px solid ${color}16`,

        background:
          `linear-gradient(180deg, ${color}08 0%, rgba(9,24,43,0.74) 100%)`,
      }}
    >

      <div
        className="metricIcon"
        style={{
          color,

          background:
            `${color}0d`,
        }}
      >
        <Icon
          size={20}
          aria-hidden="true"
        />
      </div>


      <div
        className="metricValue"
        dir="ltr"
        style={{
          color:
            value ===
            "IMMEDIATE"
              ? undefined
              : color,
        }}
      >
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
   DETAIL ROW
   ========================================================= */

function DetailRow({
  label,
  value,
  dir,
  color = "#cbd7e5",
}) {
  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "minmax(145px,0.65fr) minmax(210px,1.35fr)",

        gap:
          "14px",

        alignItems:
          "center",

        padding:
          "12px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.045)",
      }}
    >
      <span
        style={{
          color:
            "#71849c",

          fontSize:
            "9px",
        }}
      >
        {label}
      </span>


      <strong
        dir={
          dir
        }
        style={{
          color,

          fontSize:
            "10px",

          lineHeight:
            1.55,
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   NOT FOUND
   ========================================================= */

function CaseNotFound({
  language,
}) {
  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        <Link
          href="/cases"
          className="textButton"
          style={{
            width:
              "fit-content",

            textDecoration:
              "none",
          }}
        >
          {language ===
          "ar" ? (
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          ) : (
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />
          )}

          {L(
            language,
            "Back to Cases",
            "العودة إلى الحالات"
          )}
        </Link>


        <div
          className="panel"
          style={{
            padding:
              "50px",

            marginTop:
              "20px",

            textAlign:
              "center",
          }}
        >
          <FileSearch
            size={38}
            aria-hidden="true"
          />

          <h1>
            {L(
              language,
              "Case not found",
              "الحالة غير موجودة"
            )}
          </h1>
        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CasePage() {
  const params =
    useParams();


  const rawCaseId =
    params?.caseId;


  const caseId =
    Array.isArray(
      rawCaseId
    )
      ? rawCaseId[0]
      : rawCaseId;


  const {
    language,
  } = useLanguage();


  const isArabic =
    language ===
    "ar";


  const caseData =
    cases[
      caseId
    ];


  if (
    !caseData
  ) {
    return (
      <CaseNotFound
        language={
          language
        }
      />
    );
  }


  const personName =
    caseData.person[
      language
    ] ||
    caseData.person.en;


  const currentName =
    caseData.currentIdentity.name[
      language
    ] ||
    caseData.currentIdentity.name.en;


  const proposedName =
    caseData.proposedIdentity.name[
      language
    ] ||
    caseData.proposedIdentity.name.en;


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
            BACK
            ================================================ */}

        <Link
          href="/cases"
          className="textButton"
          style={{
            width:
              "fit-content",

            padding:
              0,

            marginBottom:
              "16px",

            textDecoration:
              "none",
          }}
        >
          {isArabic ? (
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          ) : (
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />
          )}

          {L(
            language,
            "Back to Cases",
            "العودة إلى الحالات"
          )}
        </Link>


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
                "AI CASE INVESTIGATION",
                "تحقيق الحالة بالذكاء الاصطناعي"
              )}

            </div>


            <h1>
              {personName}
            </h1>


            <p>
              {caseData.caseTypeLabel[
                language
              ] ||
                caseData.caseTypeLabel.en}
            </p>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                flexWrap:
                  "wrap",

                gap:
                  "8px",

                marginTop:
                  "11px",
              }}
            >

              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "10px",
                }}
              >
                {
                  caseData.id
                }
              </span>


              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "10px",
                }}
              >
                {
                  caseData.biometric
                }
              </span>


              <PriorityBadge
                priority={
                  caseData.priority
                }
                language={
                  language
                }
              />


              <StageBadge
                stage={
                  caseData.stage
                }
                language={
                  language
                }
              />

            </div>

          </div>

        </header>


        {/* ================================================
            WORKFLOW
            ================================================ */}

        <WorkflowStepper
          language={
            language
          }
        />


        {/* ================================================
            CURRENT STATE
            ================================================ */}

        <section
          style={{
            marginBottom:
              "18px",

            padding:
              "20px",

            borderRadius:
              "18px",

            border:
              caseData.interactive
                ? "1px solid rgba(89,207,160,0.28)"
                : "1px solid rgba(121,169,255,0.16)",

            background:
              caseData.interactive
                ? "linear-gradient(135deg, rgba(12,47,53,0.62), rgba(8,26,45,0.92))"
                : "linear-gradient(135deg, rgba(12,34,57,0.74), rgba(8,26,45,0.92))",
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

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "12px",
              }}
            >

              <div
                style={{
                  width:
                    "46px",

                  height:
                    "46px",

                  borderRadius:
                    "14px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  color:
                    caseData.interactive
                      ? "#59cfa0"
                      : "#79a9ff",

                  background:
                    caseData.interactive
                      ? "rgba(89,207,160,0.07)"
                      : "rgba(121,169,255,0.06)",

                  border:
                    caseData.interactive
                      ? "1px solid rgba(89,207,160,0.18)"
                      : "1px solid rgba(121,169,255,0.13)",
                }}
              >
                {caseData.interactive ? (
                  <UserCheck
                    size={22}
                    aria-hidden="true"
                  />
                ) : (
                  <BrainCircuit
                    size={22}
                    aria-hidden="true"
                  />
                )}
              </div>


              <div>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#71849c",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Current Workflow Stage",
                    "المرحلة الحالية"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      caseData.interactive
                        ? "#59cfa0"
                        : "#79a9ff",

                    fontSize:
                      "14px",
                  }}
                >
                  {stageLabel(
                    caseData.stage,
                    language
                  )}
                </strong>

              </div>

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
                  "#ff7685",

                fontSize:
                  "9px",

                fontWeight:
                  800,
              }}
            >
              <ShieldAlert
                size={16}
                aria-hidden="true"
              />

              {L(
                language,
                "Human authorization required",
                "اعتماد بشري مطلوب"
              )}
            </div>

          </div>


          <div
            style={{
              marginTop:
                "15px",

              paddingTop:
                "14px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              color:
                "#8295ac",

              fontSize:
                "10px",

              lineHeight:
                1.7,
            }}
          >
            {caseData.interactive
              ? L(
                  language,
                  "AI investigation is complete. No correction has been executed. The next step is Officer Review, where an authorized employee reviews the evidence and decides whether the proposed correction should be sent to the Manager.",
                  "اكتمل تحقيق الذكاء الاصطناعي ولم يتم تنفيذ أي تعديل. الخطوة التالية هي تدقيق موظف المراجعة، حيث يراجع الموظف المخول الأدلة ويقرر ما إذا كان التصحيح المقترح سيرفع إلى المدير."
                )
              : L(
                  language,
                  "AI investigation has completed the current analytical stage. The case remains unchanged until the appropriate human workflow is initiated.",
                  "اكتمل التحليل الحالي للحالة بالذكاء الاصطناعي، ولن يتم تغيير أي ربط حتى يبدأ مسار المراجعة البشرية المناسب."
                )}
          </div>

        </section>


        {/* ================================================
            METRICS
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={BrainCircuit}
            label={
              L(
                language,
                "AI Confidence",
                "ثقة الذكاء الاصطناعي"
              )
            }
            value={
              `${caseData.aiConfidence}%`
            }
            color="#79a9ff"
            description={
              L(
                language,
                "Identity Resolution confidence",
                "ثقة حسم الهوية"
              )
            }
          />


          <Metric
            icon={AlertTriangle}
            label={
              L(
                language,
                "Risk",
                "مستوى الخطر"
              )
            }
            value={
              caseData.risk
            }
            color="#ffbd67"
            description={
              L(
                language,
                "Overall case risk",
                "مستوى مخاطر الحالة"
              )
            }
          />


          <Metric
            icon={ShieldAlert}
            label={
              L(
                language,
                "Harm",
                "مستوى الضرر"
              )
            }
            value={
              caseData.harm
            }
            color="#ff7685"
            description={
              L(
                language,
                "Potential human impact",
                "احتمال التأثير البشري"
              )
            }
          />


          <Metric
            icon={ShieldCheck}
            label={
              L(
                language,
                "Protective Priority",
                "أولوية الحماية"
              )
            }
            value={
              caseData.protectivePriority
            }
            color="#59cfa0"
            description={
              L(
                language,
                "Priority for human attention",
                "أولوية المراجعة البشرية"
              )
            }
          />

        </section>


        {/* ================================================
            AI INVESTIGATION
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "18px",
          }}
        >

          {/* AI FINDING */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI INVESTIGATION",
                    "تحقيق الذكاء الاصطناعي"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "What did the AI find?",
                    "ماذا اكتشف الذكاء الاصطناعي؟"
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
                padding:
                  "18px",
              }}
            >

              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(121,169,255,0.05)",

                  border:
                    "1px solid rgba(121,169,255,0.10)",
                }}
              >

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#dce8f5",

                    fontSize:
                      "11px",
                  }}
                >
                  {L(
                    language,
                    "AI Conclusion",
                    "استنتاج الذكاء الاصطناعي"
                  )}
                </strong>


                <p
                  style={{
                    margin:
                      "8px 0 0",

                    color:
                      "#8b9db3",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.75,
                  }}
                >
                  {caseData.aiConclusion[
                    language
                  ] ||
                    caseData.aiConclusion.en}
                </p>

              </div>


              <div
                style={{
                  marginTop:
                    "16px",
                }}
              >

                <strong
                  style={{
                    color:
                      "#c4d0de",

                    fontSize:
                      "10px",
                  }}
                >
                  {L(
                    language,
                    "Why?",
                    "لماذا؟"
                  )}
                </strong>


                <p
                  style={{
                    margin:
                      "7px 0 0",

                    color:
                      "#7f91a8",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.75,
                  }}
                >
                  {caseData.evidenceReasoning[
                    language
                  ] ||
                    caseData.evidenceReasoning.en}
                </p>

              </div>

            </div>

          </div>


          {/* EVIDENCE */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "EVIDENCE SUMMARY",
                    "ملخص الأدلة"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "What is affected?",
                    "ما هي البيانات المتأثرة؟"
                  )}
                </h2>

              </div>


              <FileCheck2
                size={22}
                aria-hidden="true"
              />

            </div>


            <div
              style={{
                padding:
                  "6px 18px 18px",
              }}
            >

              <DetailRow
                label={
                  L(
                    language,
                    "Biometric Record",
                    "السجل البيومتري"
                  )
                }
                value={
                  caseData.biometric
                }
                dir="ltr"
              />


              <DetailRow
                label={
                  L(
                    language,
                    "Current Identity",
                    "الهوية الحالية"
                  )
                }
                value={
                  caseData.currentIdentity.ref
                }
                dir="ltr"
                color="#ff8390"
              />


              <DetailRow
                label={
                  L(
                    language,
                    "AI Proposed Identity",
                    "الهوية المقترحة"
                  )
                }
                value={
                  caseData.proposedIdentity.ref
                }
                dir="ltr"
                color="#59cfa0"
              />


              <DetailRow
                label={
                  L(
                    language,
                    "Related Findings",
                    "النتائج المرتبطة"
                  )
                }
                value={
                  caseData.findingCount
                }
                dir="ltr"
              />


              <DetailRow
                label={
                  L(
                    language,
                    "Probable Cause",
                    "السبب المرجح"
                  )
                }
                value={
                  caseData.rootCause[
                    language
                  ] ||
                  caseData.rootCause.en
                }
              />

            </div>

          </div>

        </section>


        {/* ================================================
            BEFORE / AFTER
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
                  "AI PROPOSED CORRECTION",
                  "التعديل المقترح بالذكاء الاصطناعي"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "What should change?",
                  "ما الذي يقترح النظام تعديله؟"
                )}
              </h2>

            </div>


            <GitCompareArrows
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            className="mappingGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              gap:
                "16px",

              alignItems:
                "center",

              padding:
                "20px",
            }}
          >

            {/* CURRENT */}

            <div
              style={{
                padding:
                  "19px",

                borderRadius:
                  "13px",

                background:
                  "rgba(255,80,100,0.04)",

                border:
                  "1px solid rgba(255,80,100,0.12)",
              }}
            >

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#ff7685",

                  fontSize:
                    "9px",

                  fontWeight:
                    850,
                }}
              >
                {L(
                  language,
                  "CURRENT LINK",
                  "الربط الحالي"
                )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "11px",

                  color:
                    "#e7eef6",

                  fontSize:
                    "14px",
                }}
              >
                {currentName}
              </strong>


              <div
                dir="ltr"
                style={{
                  marginTop:
                    "6px",

                  color:
                    "#ff8390",

                  fontSize:
                    "12px",

                  fontWeight:
                    800,
                }}
              >
                {
                  caseData.biometric
                }

                {"  ←  "}

                {
                  caseData.currentIdentity.ref
                }
              </div>

            </div>


            <div
              style={{
                width:
                  "42px",

                height:
                  "42px",

                display:
                  "grid",

                placeItems:
                  "center",

                borderRadius:
                  "50%",

                color:
                  "#79a9ff",

                background:
                  "rgba(121,169,255,0.07)",

                border:
                  "1px solid rgba(121,169,255,0.13)",
              }}
            >
              <ChevronRight
                size={19}
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </div>


            {/* PROPOSED */}

            <div
              style={{
                padding:
                  "19px",

                borderRadius:
                  "13px",

                background:
                  "rgba(89,207,160,0.045)",

                border:
                  "1px solid rgba(89,207,160,0.18)",
              }}
            >

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#59cfa0",

                  fontSize:
                    "9px",

                  fontWeight:
                    850,
                }}
              >
                {L(
                  language,
                  "AI PROPOSED LINK",
                  "الربط المقترح"
                )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "11px",

                  color:
                    "#e7eef6",

                  fontSize:
                    "14px",
                }}
              >
                {proposedName}
              </strong>


              <div
                dir="ltr"
                style={{
                  marginTop:
                    "6px",

                  color:
                    "#59cfa0",

                  fontSize:
                    "12px",

                  fontWeight:
                    800,
                }}
              >
                {
                  caseData.biometric
                }

                {"  ←  "}

                {
                  caseData.proposedIdentity.ref
                }
              </div>

            </div>

          </div>


          <div
            style={{
              margin:
                "0 20px 20px",

              padding:
                "13px",

              borderRadius:
                "11px",

              background:
                "rgba(121,169,255,0.035)",

              border:
                "1px solid rgba(121,169,255,0.08)",

              color:
                "#8193aa",

              fontSize:
                "9px",

              lineHeight:
                1.7,
            }}
          >
            <BrainCircuit
              size={14}
              aria-hidden="true"
              style={{
                marginInlineEnd:
                  "7px",

                verticalAlign:
                  "middle",
              }}
            />

            {caseData.recommendedAction[
              language
            ] ||
              caseData.recommendedAction.en}
          </div>

        </section>


        {/* ================================================
            HUMAN IMPACT
            ================================================ */}

        <section
          style={{
            marginTop:
              "18px",

            padding:
              "18px",

            borderRadius:
              "16px",

            border:
              "1px solid rgba(255,118,133,0.16)",

            background:
              "rgba(255,80,100,0.04)",
          }}
        >

          <div
            style={{
              display:
                "flex",

              alignItems:
                "flex-start",

              gap:
                "11px",
            }}
          >
            <ShieldAlert
              size={23}
              color="#ff7685"
              aria-hidden="true"
            />


            <div>

              <strong
                style={{
                  display:
                    "block",

                  color:
                    "#e6edf5",

                  fontSize:
                    "12px",
                }}
              >
                {L(
                  language,
                  "Why does this case require attention?",
                  "ليش هذه الحالة مهمة؟"
                )}
              </strong>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "7px",

                  color:
                    "#94747c",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.7,
                }}
              >
                {caseData.humanImpact[
                  language
                ] ||
                  caseData.humanImpact.en}
              </span>

            </div>

          </div>

        </section>


        {/* ================================================
            NEXT ACTION
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "18px",

            border:
              caseData.interactive
                ? "1px solid rgba(89,207,160,0.20)"
                : undefined,
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "NEXT CONTROLLED ACTION",
                  "الإجراء التالي"
                )}
              </div>


              <h2>
                {caseData.interactive
                  ? L(
                      language,
                      "Officer Review Required",
                      "بدء تدقيق موظف المراجعة"
                    )
                  : L(
                      language,
                      "Human Review Required",
                      "المراجعة البشرية مطلوبة"
                    )}
              </h2>

            </div>


            <UserCheck
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
              className="nextActionGrid"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(4,minmax(0,1fr))",

                gap:
                  "9px",

                marginBottom:
                  "15px",
              }}
            >

              <div
                style={{
                  padding:
                    "12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(89,207,160,0.05)",

                  border:
                    "1px solid rgba(89,207,160,0.10)",
                }}
              >
                <CheckCircle2
                  size={16}
                  color="#59cfa0"
                  aria-hidden="true"
                />

                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#c7d8d1",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "AI Investigation",
                    "تحقيق الذكاء الاصطناعي"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#5f8576",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Completed",
                    "مكتمل"
                  )}
                </span>
              </div>


              <div
                style={{
                  padding:
                    "12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(121,169,255,0.055)",

                  border:
                    "1px solid rgba(121,169,255,0.12)",
                }}
              >
                <UserCheck
                  size={16}
                  color="#79a9ff"
                  aria-hidden="true"
                />

                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#c7d4e4",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Officer Review",
                    "تدقيق الموظف"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#6684ac",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Next",
                    "التالي"
                  )}
                </span>
              </div>


              <div
                style={{
                  padding:
                    "12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(255,255,255,0.02)",

                  border:
                    "1px solid rgba(255,255,255,0.045)",
                }}
              >
                <ShieldCheck
                  size={16}
                  color="#71839a"
                  aria-hidden="true"
                />

                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#8495aa",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Manager Approval",
                    "موافقة المدير"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#566980",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Blocked",
                    "محظور"
                  )}
                </span>
              </div>


              <div
                style={{
                  padding:
                    "12px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(255,255,255,0.02)",

                  border:
                    "1px solid rgba(255,255,255,0.045)",
                }}
              >
                <LockKeyhole
                  size={16}
                  color="#71839a"
                  aria-hidden="true"
                />

                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#8495aa",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Execution",
                    "التنفيذ"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#566980",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Locked",
                    "مقفل"
                  )}
                </span>
              </div>

            </div>


            {caseData.interactive ? (
              <Link
                href="/officer-review"
                style={{
                  minHeight:
                    "48px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  gap:
                    "8px",

                  borderRadius:
                    "12px",

                  textDecoration:
                    "none",

                  color:
                    "#071c17",

                  background:
                    "linear-gradient(90deg,#4bc58f,#68d9ab)",

                  border:
                    "1px solid rgba(111,230,180,0.42)",

                  fontSize:
                    "11px",

                  fontWeight:
                    900,
                }}
              >
                <UserCheck
                  size={16}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "Start Officer Review",
                  "بدء تدقيق موظف المراجعة"
                )}

                <ChevronRight
                  size={15}
                  style={
                    arrowStyle
                  }
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <div
                style={{
                  padding:
                    "13px",

                  borderRadius:
                    "10px",

                  color:
                    "#7f91a8",

                  background:
                    "rgba(121,169,255,0.03)",

                  border:
                    "1px solid rgba(121,169,255,0.07)",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,
                  "This demonstration case is shown for AI investigation analysis. The full interactive approval and correction walkthrough is available on CASE-2026-00001.",
                  "تعرض هذه الحالة كمثال على التحقيق المعقد بالذكاء الاصطناعي. أما المحاكاة التفاعلية الكاملة للاعتماد والتصحيح فهي متاحة في CASE-2026-00001."
                )}
              </div>
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
              "18px 0 0",

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
                "AI recommends — authorized humans approve",
                "الذكاء الاصطناعي يوصي — والموظفون المخولون يعتمدون"
              )}
            </strong>


            <span>
              {L(
                language,
                "No sensitive identity link is changed from this investigation screen. Officer approval and Manager approval remain mandatory before controlled execution, and final verification is required before closure.",
                "لا يتم تغيير أي ربط حساس للهوية من شاشة التحقيق. يبقى اعتماد موظف المراجعة وموافقة المدير إلزاميين قبل التنفيذ الخاضع للتحكم، كما يلزم التحقق النهائي قبل إغلاق الحالة."
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
              "AI Biometric Reconciliation Platform · Case Investigation",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · تحقيق الحالة"
            )}
          </span>


          <div>

            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "AI Investigation Complete",
              "اكتمل تحقيق الذكاء الاصطناعي"
            )}

          </div>

        </footer>


        <style jsx>{`
          @media (max-width: 760px) {
            .workflowGrid {
              grid-template-columns: repeat(5, minmax(70px, 1fr)) !important;
              overflow-x: auto;
              padding-bottom: 4px;
            }

            .mappingGrid {
              grid-template-columns: 1fr !important;
            }

            .mappingGrid > div:nth-child(2) {
              margin: 0 auto;
              transform: rotate(90deg);
            }

            .nextActionGrid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 480px) {
            .nextActionGrid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>

      </main>

    </div>
  );
}