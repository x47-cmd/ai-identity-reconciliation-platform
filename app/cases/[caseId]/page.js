"use client";

import {
  useEffect,
} from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { useLanguage } from "../../components/LanguageProvider";

import {
  ALL_DETECTED_CASES,
} from "../../lib/demo-data";

import {
  initializeDemoCaseStore,
  useCaseStore,
} from "../../lib/case-store";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  GitCompareArrows,
  History,
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
   LOCALIZED VALUE
   ========================================================= */

function localizedValue(
  value,
  language,
  fallback = ""
) {
  if (
    typeof value ===
    "string"
  ) {
    return value;
  }


  if (
    value &&
    typeof value ===
    "object" &&
    !Array.isArray(
      value
    )
  ) {
    return (
      value[
        language
      ] ||
      value.en ||
      fallback
    );
  }


  return fallback;
}


/* =========================================================
   ISSUE LABEL
   ========================================================= */

function getIssueLabel(
  type,
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
      type
    ]?.[
      language
    ] ||
    labels[
      type
    ]?.en ||
    type
  );
}


/* =========================================================
   PRIORITY
   ========================================================= */

function getPriorityLabel(
  priority,
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
    labels[
      priority
    ]?.[
      language
    ] ||
    priority
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
   STATUS
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
        "Waiting for Employee Review",

      ar:
        "بانتظار تدقيق الموظف",
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
        "Verification Failed",

      ar:
        "فشل التحقق",
    },

    OFFICER_REJECTED: {
      en:
        "Not Approved by Employee",

      ar:
        "لم تعتمد من الموظف",
    },

    MANAGER_REJECTED: {
      en:
        "Not Approved by Manager",

      ar:
        "لم تعتمد من المدير",
    },

    VERIFIED_CLOSED: {
      en:
        "Resolved & Verified",

      ar:
        "تم الحل والتحقق",
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
   WORKFLOW
   ========================================================= */

const workflowSteps = [
  {
    number:
      1,

    en:
      "AI Analysis",

    ar:
      "تحليل الذكاء الاصطناعي",
  },

  {
    number:
      2,

    en:
      "Employee Review",

    ar:
      "تدقيق الموظف",
  },

  {
    number:
      3,

    en:
      "Manager Approval",

    ar:
      "موافقة المدير",
  },

  {
    number:
      4,

    en:
      "Correction",

    ar:
      "تنفيذ التعديل",
  },

  {
    number:
      5,

    en:
      "Verification",

    ar:
      "التحقق النهائي",
  },
];


/* =========================================================
   CURRENT WORKFLOW STEP
   ========================================================= */

function getCurrentStep(
  status
) {
  if (
    status ===
    "VERIFIED_CLOSED"
  ) {
    return 6;
  }


  if (
    status ===
      "AWAITING_VERIFICATION" ||
    status ===
      "VERIFICATION_FAILED"
  ) {
    return 5;
  }


  if (
    status ===
    "READY_FOR_CORRECTION"
  ) {
    return 4;
  }


  if (
    status ===
      "AWAITING_MANAGER_APPROVAL" ||
    status ===
      "MANAGER_REJECTED"
  ) {
    return 3;
  }


  return 2;
}


/* =========================================================
   STATUS EXPLANATION
   ========================================================= */

function getStatusExplanation(
  status,
  language
) {
  const messages = {
    AI_INVESTIGATED: {
      en:
        "AI finished analyzing the case. The next step is an authorized employee review.",

      ar:
        "انتهى الذكاء الاصطناعي من تحليل الحالة. الخطوة التالية هي تدقيق الموظف المخول.",
    },

    READY_FOR_OFFICER_REVIEW: {
      en:
        "The case is ready for employee review. No correction has been executed.",

      ar:
        "الحالة جاهزة لتدقيق الموظف، ولم يتم تنفيذ أي تعديل حتى الآن.",
    },

    AWAITING_MANAGER_APPROVAL: {
      en:
        "The employee approved the recommendation. The case is now waiting for Manager approval.",

      ar:
        "اعتمد الموظف التوصية، والحالة الآن بانتظار موافقة المدير.",
    },

    READY_FOR_CORRECTION: {
      en:
        "Employee and Manager approval are complete. The correction is authorized and ready for controlled execution.",

      ar:
        "اكتملت موافقة الموظف والمدير، وأصبح التعديل مصرحًا وجاهزًا للتنفيذ.",
    },

    AWAITING_VERIFICATION: {
      en:
        "The correction has been executed. Final verification is required before the case can close.",

      ar:
        "تم تنفيذ التعديل، ويجب إجراء التحقق النهائي قبل إغلاق الحالة.",
    },

    VERIFICATION_FAILED: {
      en:
        "Verification did not pass. Case closure is blocked and the case remains active for review.",

      ar:
        "لم ينجح التحقق، لذلك تم منع إغلاق الحالة وستبقى نشطة للمراجعة.",
    },

    OFFICER_REJECTED: {
      en:
        "The first human review did not approve the proposed correction. Execution remains blocked.",

      ar:
        "لم يعتمد الموظف التصحيح المقترح، ولذلك يبقى التنفيذ محظورًا.",
    },

    MANAGER_REJECTED: {
      en:
        "The Manager did not authorize the correction. Execution remains blocked.",

      ar:
        "لم يعتمد المدير التصحيح، ولذلك يبقى التنفيذ محظورًا.",
    },

    VERIFIED_CLOSED: {
      en:
        "Correction and verification are complete. This case is closed and retained in Reports & Audit.",

      ar:
        "اكتمل التعديل والتحقق، وتم إغلاق الحالة والاحتفاظ بها في التقارير والسجل.",
    },
  };


  return (
    messages[
      status
    ]?.[
      language
    ] ||
    messages[
      status
    ]?.en ||
    ""
  );
}


/* =========================================================
   STATUS COLORS
   ========================================================= */

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
        "rgba(89,207,160,0.07)",

      border:
        "rgba(89,207,160,0.18)",
    };
  }


  if (
    status ===
      "VERIFICATION_FAILED" ||
    status ===
      "OFFICER_REJECTED" ||
    status ===
      "MANAGER_REJECTED"
  ) {
    return {
      color:
        "#ff7c89",

      background:
        "rgba(255,80,100,0.07)",

      border:
        "rgba(255,80,100,0.18)",
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
        "rgba(255,189,103,0.07)",

      border:
        "rgba(255,189,103,0.18)",
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
   NEXT ACTION
   ========================================================= */

function getNextAction(
  caseData,
  language
) {
  const status =
    caseData.workflowStatus ||
    caseData.finalStatus;


  if (
    status ===
    "VERIFIED_CLOSED"
  ) {
    return {
      href:
        `/reports-audit?case=${caseData.id}`,

      label:
        L(
          language,
          "Open Reports & Audit",
          "فتح التقارير والسجل"
        ),

      description:
        L(
          language,
          "The case is complete. Review its final result and full history.",
          "الحالة مكتملة. يمكنك مراجعة النتيجة النهائية وكامل السجل."
        ),

      icon:
        History,

      tone:
        "green",
    };
  }


  if (
    status ===
      "AWAITING_MANAGER_APPROVAL" ||
    status ===
      "MANAGER_REJECTED"
  ) {
    return {
      href:
        `/manager-approval?case=${caseData.id}`,

      label:
        L(
          language,
          "Open Manager Approval",
          "فتح موافقة المدير"
        ),

      description:
        L(
          language,
          "The employee review is complete. The Manager must now decide whether to authorize the correction.",
          "اكتمل تدقيق الموظف، والآن يجب أن يقرر المدير ما إذا كان سيعتمد التعديل."
        ),

      icon:
        ShieldCheck,

      tone:
        "amber",
    };
  }


  if (
    status ===
    "READY_FOR_CORRECTION"
  ) {
    return {
      href:
        `/corrections-verification?case=${caseData.id}`,

      label:
        L(
          language,
          "Execute Approved Correction",
          "تنفيذ التعديل المعتمد"
        ),

      description:
        L(
          language,
          "Both human approvals are complete. The authorized correction can now be executed.",
          "اكتملت الموافقتان البشريتان، ويمكن الآن تنفيذ التعديل المعتمد."
        ),

      icon:
        GitCompareArrows,

      tone:
        "green",
    };
  }


  if (
    status ===
      "AWAITING_VERIFICATION" ||
    status ===
      "VERIFICATION_FAILED"
  ) {
    return {
      href:
        `/corrections-verification?case=${caseData.id}`,

      label:
        status ===
        "VERIFICATION_FAILED"
          ? L(
              language,
              "Review Verification Failure",
              "مراجعة فشل التحقق"
            )
          : L(
              language,
              "Start Final Verification",
              "بدء التحقق النهائي"
            ),

      description:
        status ===
        "VERIFICATION_FAILED"
          ? L(
              language,
              "The case cannot close until the verification issue is reviewed and resolved.",
              "لا يمكن إغلاق الحالة حتى تتم مراجعة مشكلة التحقق ومعالجتها."
            )
          : L(
              language,
              "The correction is complete. Verify the new relationship before closing the case.",
              "اكتمل التعديل. تحقق من الربط الجديد قبل إغلاق الحالة."
            ),

      icon:
        CheckCircle2,

      tone:
        status ===
        "VERIFICATION_FAILED"
          ? "red"
          : "blue",
    };
  }


  return {
    href:
      `/officer-review?case=${caseData.id}`,

    label:
      L(
        language,
        "Start Employee Review",
        "بدء تدقيق الموظف"
      ),

    description:
      L(
        language,
        "Review the AI finding, confirm the proposed action and decide whether the case should continue to Manager approval.",
        "راجع نتيجة الذكاء الاصطناعي والتعديل المقترح، ثم قرر ما إذا كانت الحالة ستنتقل إلى موافقة المدير."
      ),

    icon:
      UserCheck,

    tone:
      "green",
  };
}


/* =========================================================
   WORKFLOW STEPPER
   ========================================================= */

function WorkflowStepper({
  language,
  status,
}) {
  const currentStep =
    getCurrentStep(
      status
    );


  const closed =
    status ===
    "VERIFIED_CLOSED";


  return (
    <section
      className="caseWorkflow"
      style={{
        marginBottom:
          "16px",

        padding:
          "18px",

        borderRadius:
          "16px",

        border:
          "1px solid rgba(121,169,255,0.10)",

        background:
          "rgba(11,29,50,0.72)",
      }}
    >

      <div
        className="caseWorkflowGrid"
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(5,minmax(0,1fr))",

          gap:
            "8px",
        }}
      >
        {workflowSteps.map(
          (
            step
          ) => {

            const completed =
              closed ||
              step.number <
                currentStep;


            const current =
              !closed &&
              step.number ===
                currentStep;


            return (
              <div
                key={
                  step.number
                }
                style={{
                  padding:
                    "11px 7px",

                  textAlign:
                    "center",

                  borderRadius:
                    "10px",

                  background:
                    completed
                      ? "rgba(89,207,160,0.045)"
                      : current
                        ? "rgba(121,169,255,0.07)"
                        : "rgba(255,255,255,0.018)",

                  border:
                    completed
                      ? "1px solid rgba(89,207,160,0.10)"
                      : current
                        ? "1px solid rgba(121,169,255,0.18)"
                        : "1px solid rgba(255,255,255,0.04)",
                }}
              >

                <div
                  style={{
                    width:
                      "29px",

                    height:
                      "29px",

                    margin:
                      "0 auto 7px",

                    display:
                      "grid",

                    placeItems:
                      "center",

                    borderRadius:
                      "50%",

                    color:
                      completed
                        ? "#59cfa0"
                        : current
                          ? "#79a9ff"
                          : "#64768d",

                    background:
                      completed
                        ? "rgba(89,207,160,0.07)"
                        : current
                          ? "rgba(121,169,255,0.07)"
                          : "rgba(255,255,255,0.025)",

                    fontSize:
                      "9px",

                    fontWeight:
                      850,
                  }}
                >
                  {completed ? (
                    <CheckCircle2
                      size={15}
                      aria-hidden="true"
                    />
                  ) : (
                    step.number
                  )}
                </div>


                <strong
                  style={{
                    color:
                      completed
                        ? "#9dc6b7"
                        : current
                          ? "#b6d0ff"
                          : "#71839a",

                    fontSize:
                      "8.5px",

                    lineHeight:
                      1.4,
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

    </section>
  );
}


/* =========================================================
   DETAIL ITEM
   ========================================================= */

function DetailItem({
  label,
  value,
  dir,
  color,
}) {
  return (
    <div
      style={{
        padding:
          "12px",

        borderRadius:
          "10px",

        background:
          "rgba(255,255,255,0.022)",

        border:
          "1px solid rgba(255,255,255,0.045)",
      }}
    >
      <span
        style={{
          display:
            "block",

          color:
            "#687b93",

          fontSize:
            "8px",
        }}
      >
        {label}
      </span>


      <strong
        dir={
          dir
        }
        style={{
          display:
            "block",

          marginTop:
            "5px",

          color:
            color ||
            "#d3deeb",

          fontSize:
            "10px",

          lineHeight:
            1.5,

          overflowWrap:
            "anywhere",
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
              "50px 20px",

            marginTop:
              "18px",

            textAlign:
              "center",
          }}
        >
          <FileSearch
            size={34}
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


  const fallbackCase =
    ALL_DETECTED_CASES.find(
      (
        item
      ) =>
        item.id ===
        caseId
    ) ||
    null;


  const storedCase =
    store.initialized
      ? store.cases.find(
          (
            item
          ) =>
            item.id ===
            caseId
        ) ||
        null
      : null;


  const caseData =
    storedCase ||
    fallbackCase;


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


  const status =
    caseData.workflowStatus ||
    caseData.finalStatus ||
    "AI_INVESTIGATED";


  const closed =
    status ===
      "VERIFIED_CLOSED" ||
    Boolean(
      caseData.closed
    );


  const personName =
    localizedValue(
      caseData.person,
      language,
      caseData.id
    );


  const currentIdentityName =
    localizedValue(
      caseData.currentIdentityName,
      language,
      ""
    );


  const proposedIdentityName =
    localizedValue(
      caseData.proposedIdentityName ||
        caseData.canonicalIdentityName,
      language,
      personName
    );


  const genericCurrentName =
    currentIdentityName ===
      "Current Reference" ||
    currentIdentityName ===
      "المرجع الحالي";


  const currentDisplayName =
    genericCurrentName ||
    !currentIdentityName
      ? L(
          language,
          "Current linked reference",
          "المرجع المرتبط حاليًا"
        )
      : currentIdentityName;


  const currentReference =
    caseData.currentIdentity ||
    caseData.execution?.before ||
    "—";


  const proposedReference =
    caseData.proposedIdentity ||
    caseData.canonicalIdentity ||
    caseData.execution?.after ||
    "—";


  const biometricId =
    caseData.biometricId ||
    caseData.primaryBiometricId ||
    caseData.execution?.targetRecord ||
    "—";


  const aiSummary =
    localizedValue(
      caseData.aiSummary,
      language,
      L(
        language,
        "AI detected an identity relationship that requires review.",
        "اكتشف الذكاء الاصطناعي مشكلة في ربط الهوية تحتاج إلى مراجعة."
      )
    );


  const aiReason =
    localizedValue(
      caseData.aiReason,
      language,
      L(
        language,
        "The current relationship conflicts with the strongest available synthetic evidence.",
        "يتعارض الربط الحالي مع أقوى الأدلة الاصطناعية المتاحة."
      )
    );


  const recommendedAction =
    localizedValue(
      caseData.recommendedAction,
      language,
      L(
        language,
        `Review the proposed change from ${currentReference} to ${proposedReference} and continue through the required human approvals.`,

        `مراجعة التعديل المقترح من ${currentReference} إلى ${proposedReference} واستكمال الموافقات البشرية المطلوبة.`
      )
    );


  const statusColors =
    getStatusColors(
      status
    );


  const nextAction =
    getNextAction(
      caseData,
      language
    );


  const ActionIcon =
    nextAction.icon;


  const actionStyle =
    nextAction.tone ===
    "green"
      ? {
          color:
            "#071b16",

          background:
            "linear-gradient(90deg,#4bc58f,#68d9ab)",

          border:
            "1px solid rgba(111,230,180,0.40)",
        }
      : nextAction.tone ===
        "amber"
        ? {
            color:
              "#ffbd67",

            background:
              "rgba(255,189,103,0.07)",

            border:
              "1px solid rgba(255,189,103,0.18)",
          }
        : nextAction.tone ===
          "red"
          ? {
              color:
                "#ff7c89",

              background:
                "rgba(255,80,100,0.07)",

              border:
                "1px solid rgba(255,80,100,0.18)",
            }
          : {
              color:
                "#79a9ff",

              background:
                "rgba(121,169,255,0.07)",

              border:
                "1px solid rgba(121,169,255,0.18)",
            };


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
          href={
            closed
              ? "/reports-audit"
              : "/cases/all"
          }
          className="textButton"
          style={{
            width:
              "fit-content",

            padding:
              0,

            marginBottom:
              "15px",

            textDecoration:
              "none",
          }}
        >
          {isArabic ? (
            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          ) : (
            <ArrowLeft
              size={15}
              aria-hidden="true"
            />
          )}

          {closed
            ? L(
                language,
                "Back to Reports & Audit",
                "العودة إلى التقارير والسجل"
              )
            : L(
                language,
                "Back to Active Cases",
                "العودة إلى الحالات النشطة"
              )}
        </Link>


        {/* ================================================
            HEADER
            ================================================ */}

        <header className="topbar">

          <div>

            <div className="eyebrow">
              {closed ? (
                <History
                  size={15}
                  aria-hidden="true"
                />
              ) : (
                <BrainCircuit
                  size={15}
                  aria-hidden="true"
                />
              )}

              {closed
                ? L(
                    language,
                    "COMPLETED CASE",
                    "حالة مكتملة"
                  )
                : L(
                    language,
                    "CASE REVIEW",
                    "مراجعة الحالة"
                  )}
            </div>


            <h1>
              {personName}
            </h1>


            <p>
              {getIssueLabel(
                caseData.caseType,
                language
              )}
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
                  "10px",
              }}
            >

              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "9px",
                }}
              >
                {caseData.id}
              </span>


              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "9px",
                }}
              >
                {biometricId}
              </span>


              <PriorityBadge
                priority={
                  caseData.priority
                }
                language={
                  language
                }
              />


              <span
                style={{
                  display:
                    "inline-flex",

                  padding:
                    "6px 9px",

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
                    850,
                }}
              >
                {getStatusLabel(
                  status,
                  language
                )}
              </span>

            </div>

          </div>

        </header>


        {/* ================================================
            SIMPLE WORKFLOW
            ================================================ */}

        <WorkflowStepper
          language={
            language
          }
          status={
            status
          }
        />


        {/* ================================================
            WHERE ARE WE NOW?
            ================================================ */}

        <section
          style={{
            marginBottom:
              "16px",

            padding:
              "17px",

            borderRadius:
              "15px",

            background:
              statusColors.background,

            border:
              `1px solid ${statusColors.border}`,
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
            {closed ? (
              <CheckCircle2
                size={22}
                color="#59cfa0"
                aria-hidden="true"
              />
            ) : (
              <Activity
                size={22}
                color={
                  statusColors.color
                }
                aria-hidden="true"
              />
            )}


            <div>

              <strong
                style={{
                  display:
                    "block",

                  color:
                    statusColors.color,

                  fontSize:
                    "11px",
                }}
              >
                {getStatusLabel(
                  status,
                  language
                )}
              </strong>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "5px",

                  color:
                    "#8092a9",

                  fontSize:
                    "9.5px",

                  lineHeight:
                    1.65,
                }}
              >
                {getStatusExplanation(
                  status,
                  language
                )}
              </span>

            </div>
          </div>
        </section>


        {/* ================================================
            SIMPLE SUMMARY
            ================================================ */}

        <section
          className="caseSummaryGrid"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "1.35fr 0.65fr",

            gap:
              "14px",
          }}
        >

          {/* AI RESULT */}

          <div className="panel">

            <div className="panelHeader">

              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI RESULT",
                    "نتيجة الذكاء الاصطناعي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "What is the problem?",
                    "ما هي المشكلة؟"
                  )}
                </h2>
              </div>

              <BrainCircuit
                size={21}
                aria-hidden="true"
              />

            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >

              <strong
                style={{
                  display:
                    "block",

                  color:
                    "#dce7f4",

                  fontSize:
                    "11px",

                  lineHeight:
                    1.6,
                }}
              >
                {aiSummary}
              </strong>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "9px",

                  color:
                    "#7f91a8",

                  fontSize:
                    "9.5px",

                  lineHeight:
                    1.7,
                }}
              >
                {aiReason}
              </span>


              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(2,minmax(0,1fr))",

                  gap:
                    "8px",

                  marginTop:
                    "14px",
                }}
              >
                <DetailItem
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
                  dir="ltr"
                  color="#79a9ff"
                />


                <DetailItem
                  label={
                    L(
                      language,
                      "Related Findings",
                      "النتائج المرتبطة"
                    )
                  }
                  value={
                    caseData.findingCount ??
                    1
                  }
                  dir="ltr"
                />
              </div>

            </div>

          </div>


          {/* WHY IMPORTANT */}

          <div className="panel">

            <div className="panelHeader">

              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "ATTENTION",
                    "الأهمية"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Why review it?",
                    "ليش نراجعها؟"
                  )}
                </h2>
              </div>

              {caseData.wronglyAffected ? (
                <ShieldAlert
                  size={21}
                  aria-hidden="true"
                />
              ) : (
                <ShieldCheck
                  size={21}
                  aria-hidden="true"
                />
              )}

            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >

              {caseData.wronglyAffected ? (
                <>
                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#ff8390",

                      fontSize:
                        "11px",
                    }}
                  >
                    {L(
                      language,
                      "Another person may be affected",
                      "قد يتأثر شخص آخر"
                    )}
                  </strong>

                  <span
                    style={{
                      display:
                        "block",

                      marginTop:
                        "7px",

                      color:
                        "#98727a",

                      fontSize:
                        "9.5px",

                      lineHeight:
                        1.7,
                    }}
                  >
                    {L(
                      language,
                      "The incorrect identity relationship may cause data or consequences to be associated with the wrong person, so this case receives higher attention.",

                      "قد يؤدي الربط غير الصحيح إلى ارتباط بيانات أو نتائج بالشخص الخطأ، لذلك تحصل هذه الحالة على أولوية أعلى."
                    )}
                  </span>
                </>
              ) : (
                <>
                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#8db6ff",

                      fontSize:
                        "11px",
                    }}
                  >
                    {L(
                      language,
                      "Identity integrity issue",
                      "مشكلة في سلامة ربط الهوية"
                    )}
                  </strong>

                  <span
                    style={{
                      display:
                        "block",

                      marginTop:
                        "7px",

                      color:
                        "#7c8fa7",

                      fontSize:
                        "9.5px",

                      lineHeight:
                        1.7,
                    }}
                  >
                    {L(
                      language,
                      "The relationship should be reviewed before any sensitive identity change is allowed.",

                      "يجب مراجعة علاقة الربط قبل السماح بأي تعديل حساس على الهوية."
                    )}
                  </span>
                </>
              )}


              <div
                style={{
                  marginTop:
                    "13px",
                }}
              >
                <DetailItem
                  label={
                    L(
                      language,
                      "Priority",
                      "الأولوية"
                    )
                  }
                  value={
                    getPriorityLabel(
                      caseData.priority,
                      language
                    )
                  }
                />
              </div>

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
              "14px",
          }}
        >

          <div className="panelHeader">

            <div>
              <div className="panelEyebrow">
                {closed
                  ? L(
                      language,
                      "CORRECTION RESULT",
                      "نتيجة التعديل"
                    )
                  : L(
                      language,
                      "PROPOSED CORRECTION",
                      "التعديل المقترح"
                    )}
              </div>

              <h2>
                {closed
                  ? L(
                      language,
                      "What changed?",
                      "ما الذي تم تعديله؟"
                    )
                  : L(
                      language,
                      "What needs to change?",
                      "ما الذي يحتاج إلى تعديل؟"
                    )}
              </h2>
            </div>

            <GitCompareArrows
              size={21}
              aria-hidden="true"
            />

          </div>


          <div
            className="identityMappingGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              alignItems:
                "center",

              gap:
                "13px",

              padding:
                "18px",
            }}
          >

            {/* CURRENT / BEFORE */}

            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "12px",

                background:
                  "rgba(255,80,100,0.04)",

                border:
                  "1px solid rgba(255,80,100,0.10)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  color:
                    "#a26b74",

                  fontSize:
                    "8px",

                  fontWeight:
                    850,
                }}
              >
                {closed
                  ? L(
                      language,
                      "BEFORE",
                      "قبل التعديل"
                    )
                  : L(
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
                    "9px",

                  color:
                    "#e3ebf4",

                  fontSize:
                    "12px",
                }}
              >
                {currentDisplayName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "5px",

                  color:
                    "#ff8390",

                  fontSize:
                    "11px",

                  fontWeight:
                    800,
                }}
              >
                {currentReference}
              </span>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#6f8096",

                  fontSize:
                    "8.5px",
                }}
              >
                {biometricId}
              </span>
            </div>


            {/* ARROW */}

            <div
              className="mappingArrow"
              style={{
                width:
                  "39px",

                height:
                  "39px",

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
                  "1px solid rgba(121,169,255,0.12)",
              }}
            >
              <ChevronRight
                size={18}
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </div>


            {/* PROPOSED / AFTER */}

            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "12px",

                background:
                  "rgba(89,207,160,0.04)",

                border:
                  "1px solid rgba(89,207,160,0.12)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  color:
                    "#5a9b83",

                  fontSize:
                    "8px",

                  fontWeight:
                    850,
                }}
              >
                {closed
                  ? L(
                      language,
                      "AFTER",
                      "بعد التعديل"
                    )
                  : L(
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
                    "9px",

                  color:
                    "#e3ebf4",

                  fontSize:
                    "12px",
                }}
              >
                {proposedIdentityName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "5px",

                  color:
                    "#59cfa0",

                  fontSize:
                    "11px",

                  fontWeight:
                    800,
                }}
              >
                {proposedReference}
              </span>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#6f8096",

                  fontSize:
                    "8.5px",
                }}
              >
                {biometricId}
              </span>
            </div>

          </div>


          {!closed && (
            <div
              style={{
                margin:
                  "0 18px 18px",

                padding:
                  "12px",

                borderRadius:
                  "10px",

                background:
                  "rgba(121,169,255,0.035)",

                border:
                  "1px solid rgba(121,169,255,0.07)",

                color:
                  "#7f91a8",

                fontSize:
                  "9px",

                lineHeight:
                  1.65,
              }}
            >
              <BrainCircuit
                size={13}
                aria-hidden="true"
                style={{
                  marginInlineEnd:
                    "6px",

                  verticalAlign:
                    "middle",
                }}
              />

              {recommendedAction}
            </div>
          )}

        </section>


        {/* ================================================
            NEXT ACTION
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "14px",

            border:
              `1px solid ${
                nextAction.tone ===
                "green"
                  ? "rgba(89,207,160,0.14)"
                  : nextAction.tone ===
                    "amber"
                    ? "rgba(255,189,103,0.14)"
                    : nextAction.tone ===
                      "red"
                      ? "rgba(255,80,100,0.14)"
                      : "rgba(121,169,255,0.12)"
              }`,
          }}
        >

          <div className="panelHeader">

            <div>
              <div className="panelEyebrow">
                {closed
                  ? L(
                      language,
                      "CASE HISTORY",
                      "سجل الحالة"
                    )
                  : L(
                      language,
                      "NEXT ACTION",
                      "الإجراء التالي"
                    )}
              </div>

              <h2>
                {nextAction.label}
              </h2>
            </div>

            <ActionIcon
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
            <p
              style={{
                margin:
                  0,

                color:
                  "#7f91a8",

                fontSize:
                  "10px",

                lineHeight:
                  1.7,
              }}
            >
              {nextAction.description}
            </p>


            <Link
              href={
                nextAction.href
              }
              style={{
                minHeight:
                  "46px",

                marginTop:
                  "14px",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                gap:
                  "8px",

                borderRadius:
                  "11px",

                textDecoration:
                  "none",

                fontSize:
                  "10.5px",

                fontWeight:
                  900,

                ...actionStyle,
              }}
            >
              <ActionIcon
                size={16}
                aria-hidden="true"
              />

              {nextAction.label}

              <ChevronRight
                size={15}
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </Link>

          </div>

        </section>


        {/* ================================================
            TECHNICAL REFERENCE

            Kept small — not the main presentation.
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "14px",
          }}
        >
          <div className="panelHeader">

            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "REFERENCE",
                  "البيانات المرجعية"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Case Reference Data",
                  "بيانات الحالة"
                )}
              </h2>
            </div>

            <LockKeyhole
              size={20}
              aria-hidden="true"
            />

          </div>


          <div
            className="referenceGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",

              gap:
                "8px",

              padding:
                "15px",
            }}
          >
            <DetailItem
              label={
                L(
                  language,
                  "Case",
                  "الحالة"
                )
              }
              value={
                caseData.id
              }
              dir="ltr"
            />


            <DetailItem
              label={
                L(
                  language,
                  "Biometric",
                  "السجل البيومتري"
                )
              }
              value={
                biometricId
              }
              dir="ltr"
            />


            <DetailItem
              label={
                L(
                  language,
                  "Current Reference",
                  "المرجع الحالي"
                )
              }
              value={
                currentReference
              }
              dir="ltr"
              color="#ff8390"
            />


            <DetailItem
              label={
                closed
                  ? L(
                      language,
                      "Verified Reference",
                      "المرجع بعد التحقق"
                    )
                  : L(
                      language,
                      "Proposed Reference",
                      "المرجع المقترح"
                    )
              }
              value={
                proposedReference
              }
              dir="ltr"
              color="#59cfa0"
            />
          </div>

        </section>


        {/* ================================================
            GOVERNANCE
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
                "AI recommends — authorized humans approve",
                "الذكاء الاصطناعي يوصي — والموظفون المخولون يعتمدون"
              )}
            </strong>


            <span>
              {L(
                language,

                "The Master Reference remains read-only. No sensitive correction can be executed without the required Employee and Manager approvals, and the case cannot close until verification succeeds.",

                "يبقى المرجع الرئيسي للقراءة فقط. لا يمكن تنفيذ أي تعديل حساس بدون موافقة الموظف والمدير، ولا يمكن إغلاق الحالة قبل نجاح التحقق."
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
              "AI Biometric Reconciliation Platform · Case",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · الحالة"
            )}
          </span>


          <div>
            {closed ? (
              <CheckCircle2
                size={14}
                aria-hidden="true"
              />
            ) : (
              <Activity
                size={14}
                aria-hidden="true"
              />
            )}

            {getStatusLabel(
              status,
              language
            )}
          </div>

        </footer>


        {/* ================================================
            MOBILE
            ================================================ */}

        <style jsx>{`

          @media (
            max-width: 850px
          ) {

            .caseSummaryGrid {
              grid-template-columns:
                1fr
                !important;
            }


            .referenceGrid {
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

          }


          @media (
            max-width: 760px
          ) {

            .caseWorkflow {
              overflow-x:
                auto;
            }


            .caseWorkflowGrid {
              min-width:
                520px;
            }


            .identityMappingGrid {
              grid-template-columns:
                1fr
                !important;
            }


            .mappingArrow {
              margin:
                0 auto;

              transform:
                rotate(90deg);
            }

          }


          @media (
            max-width: 480px
          ) {

            .referenceGrid {
              grid-template-columns:
                1fr
                1fr
                !important;
            }

          }

        `}</style>

      </main>

    </div>
  );
}