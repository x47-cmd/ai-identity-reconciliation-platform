"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  ALL_DETECTED_CASES,
  CASE_TYPE_LABELS,
  PRIMARY_ACTIVE_CASE_ID,
} from "../lib/demo-data";

import {
  initializeDemoCaseStore,
  submitManagerDecision,
  updateCase,
  useCaseStore,
} from "../lib/case-store";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  GitCompareArrows,
  LockKeyhole,
  RotateCcw,
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
   PRIORITY
   ========================================================= */

function priorityLabel(
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
   WORKFLOW STEPPER
   ========================================================= */

function WorkflowStepper({
  language,
  currentStep,
}) {
  return (
    <section
      className="managerWorkflow"
      style={{
        marginBottom:
          "16px",

        padding:
          "17px",

        borderRadius:
          "16px",

        border:
          "1px solid rgba(121,169,255,0.10)",

        background:
          "rgba(11,29,50,0.72)",
      }}
    >
      <div
        className="managerWorkflowGrid"
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
              step.number <
              currentStep;


            const active =
              step.number ===
              currentStep;


            return (
              <div
                key={
                  step.number
                }
                style={{
                  padding:
                    "10px 6px",

                  borderRadius:
                    "10px",

                  textAlign:
                    "center",

                  border:
                    completed
                      ? "1px solid rgba(89,207,160,0.10)"
                      : active
                        ? "1px solid rgba(255,189,103,0.18)"
                        : "1px solid rgba(255,255,255,0.04)",

                  background:
                    completed
                      ? "rgba(89,207,160,0.04)"
                      : active
                        ? "rgba(255,189,103,0.06)"
                        : "rgba(255,255,255,0.015)",
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
                        : active
                          ? "#ffbd67"
                          : "#61738a",

                    background:
                      completed
                        ? "rgba(89,207,160,0.07)"
                        : active
                          ? "rgba(255,189,103,0.07)"
                          : "rgba(255,255,255,0.02)",

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
                    display:
                      "block",

                    color:
                      completed
                        ? "#9cc5b6"
                        : active
                          ? "#ffd08e"
                          : "#708298",

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
   INFO BOX
   ========================================================= */

function InfoBox({
  label,
  value,
  color = "#d6e1ee",
  dir,
}) {
  return (
    <div
      style={{
        padding:
          "12px",

        borderRadius:
          "10px",

        border:
          "1px solid rgba(255,255,255,0.045)",

        background:
          "rgba(255,255,255,0.02)",
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

          color,

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
   CASE NOT FOUND
   ========================================================= */

function CaseUnavailable({
  language,
  caseId,
}) {
  const isArabic =
    language ===
    "ar";


  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        <Link
          href="/cases/all"
          className="textButton"
          style={{
            width:
              "fit-content",

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

          {L(
            language,
            "Back to Active Cases",
            "العودة إلى الحالات النشطة"
          )}
        </Link>


        <div
          className="panel"
          style={{
            marginTop:
              "18px",

            padding:
              "45px 20px",

            textAlign:
              "center",
          }}
        >
          <FileCheck2
            size={34}
            color="#71849c"
            aria-hidden="true"
          />


          <h2>
            {L(
              language,
              "Case not available",
              "الحالة غير متاحة"
            )}
          </h2>


          <span
            dir="ltr"
            style={{
              color:
                "#71849c",

              fontSize:
                "9px",
            }}
          >
            {caseId}
          </span>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function ManagerApprovalPage() {
  const {
    language,
  } =
    useLanguage();


  const store =
    useCaseStore();


  const [
    selectedCaseId,
    setSelectedCaseId,
  ] =
    useState(
      PRIMARY_ACTIVE_CASE_ID
    );


  const [
    comments,
    setComments,
  ] =
    useState(
      ""
    );


  const [
    error,
    setError,
  ] =
    useState(
      ""
    );


  /* =======================================================
     INITIALIZE + READ CASE ID

     Example:
     /manager-approval?case=CASE-2026-00002
     ======================================================= */

  useEffect(
    () => {
      initializeDemoCaseStore();


      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }


      const params =
        new URLSearchParams(
          window.location.search
        );


      const requestedCaseId =
        params.get(
          "case"
        );


      if (
        requestedCaseId
      ) {
        setSelectedCaseId(
          requestedCaseId
        );
      }
    },
    []
  );


  /* =======================================================
     CASE SOURCE
     ======================================================= */

  const fallbackCase =
    ALL_DETECTED_CASES.find(
      (
        item
      ) =>
        item.id ===
        selectedCaseId
    ) ||
    null;


  const storedCase =
    store.initialized
      ? store.cases.find(
          (
            item
          ) =>
            item.id ===
            selectedCaseId
        ) ||
        null
      : null;


  const caseData =
    storedCase ||
    fallbackCase;


  /* =======================================================
     LOAD SAVED MANAGER NOTES
     ======================================================= */

  useEffect(
    () => {
      if (
        !caseData
      ) {
        return;
      }


      setComments(
        typeof caseData.managerNotes ===
          "string"
          ? caseData.managerNotes
          : ""
      );
    },
    [
      caseData?.id,
    ]
  );


  if (
    !caseData
  ) {
    return (
      <CaseUnavailable
        language={
          language
        }
        caseId={
          selectedCaseId
        }
      />
    );
  }


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
     CASE DATA
     ======================================================= */

  const personName =
    localizedValue(
      caseData.person,
      language,
      caseData.id
    );


  const issueLabel =
    localizedValue(
      CASE_TYPE_LABELS[
        caseData.caseType
      ],
      language,
      caseData.caseType
    );


  const biometricId =
    caseData.biometricId ||
    caseData.primaryBiometricId ||
    caseData.execution?.targetRecord ||
    "—";


  const currentReference =
    caseData.currentIdentity ||
    caseData.execution?.before ||
    "—";


  const proposedReference =
    caseData.proposedIdentity ||
    caseData.canonicalIdentity ||
    caseData.execution?.after ||
    "—";


  const currentName =
    localizedValue(
      caseData.currentIdentityName ||
        caseData.execution?.beforeName,
      language,
      L(
        language,
        "Current linked reference",
        "المرجع المرتبط حاليًا"
      )
    );


  const proposedName =
    localizedValue(
      caseData.proposedIdentityName ||
        caseData.canonicalIdentityName ||
        caseData.execution?.afterName,
      language,
      personName
    );


  const aiSummary =
    localizedValue(
      caseData.aiSummary,
      language,
      L(
        language,
        "AI prepared a supported correction recommendation for human authorization.",
        "جهز الذكاء الاصطناعي توصية مدعومة بالتصحيح للمراجعة البشرية."
      )
    );


  const officerDecision =
    caseData.officerDecision ||
    caseData.officer?.decision ||
    "PENDING";


  const managerDecision =
    caseData.managerDecision ||
    caseData.manager?.decision ||
    "NOT_READY";


  const workflowStatus =
    caseData.workflowStatus ||
    caseData.finalStatus ||
    "AI_INVESTIGATED";


  const closed =
    Boolean(
      caseData.closed
    ) ||
    caseData.finalStatus ===
      "VERIFIED_CLOSED";


  const officerApproved =
    officerDecision ===
    "APPROVED";


  const managerApproved =
    managerDecision ===
    "APPROVED";


  const returnedToOfficer =
    managerDecision ===
      "RETURNED_TO_OFFICER" ||
    workflowStatus ===
      "READY_FOR_OFFICER_REVIEW";


  /* =======================================================
     CAN MANAGER DECIDE?
     ======================================================= */

  const canDecide =
    !closed &&
    officerApproved &&
    !managerApproved &&
    workflowStatus ===
      "AWAITING_MANAGER_APPROVAL";


  /* =======================================================
     WORKFLOW STEP
     ======================================================= */

  let currentStep =
    3;


  if (
    !officerApproved
  ) {
    currentStep =
      2;
  }


  if (
    managerApproved ||
    workflowStatus ===
      "READY_FOR_CORRECTION"
  ) {
    currentStep =
      4;
  }


  if (
    workflowStatus ===
      "AWAITING_VERIFICATION"
  ) {
    currentStep =
      5;
  }


  /* =======================================================
     APPROVE
     ======================================================= */

  const approve =
    () => {
      try {
        setError(
          ""
        );


        updateCase(
          selectedCaseId,
          {
            managerNotes:
              comments.trim(),

            managerReviewUpdatedAt:
              new Date().toISOString(),
          }
        );


        submitManagerDecision(
          selectedCaseId,
          "APPROVED",
          "Demo Supervising Manager"
        );

      } catch (
        approvalError
      ) {
        setError(
          approvalError?.message ||
          L(
            language,
            "Unable to record Manager approval.",
            "تعذر تسجيل موافقة المدير."
          )
        );
      }
    };


  /* =======================================================
     RETURN TO EMPLOYEE
     ======================================================= */

  const returnToOfficer =
    () => {
      try {
        setError(
          ""
        );


        updateCase(
          selectedCaseId,
          {
            managerNotes:
              comments.trim(),

            managerReviewUpdatedAt:
              new Date().toISOString(),
          }
        );


        submitManagerDecision(
          selectedCaseId,
          "RETURN_TO_OFFICER",
          "Demo Supervising Manager"
        );

      } catch (
        approvalError
      ) {
        setError(
          approvalError?.message ||
          L(
            language,
            "Unable to return the case.",
            "تعذر إعادة الحالة."
          )
        );
      }
    };


  /* =======================================================
     CLOSED CASE
     ======================================================= */

  if (
    closed
  ) {
    return (
      <div className="appShell">

        <Sidebar />


        <main className="mainContent">

          <Link
            href={
              `/cases/${caseData.id}`
            }
            className="textButton"
            style={{
              width:
                "fit-content",

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

            {L(
              language,
              "Back to Case",
              "العودة إلى الحالة"
            )}
          </Link>


          <section
            className="panel"
            style={{
              marginTop:
                "18px",

              padding:
                "30px",

              textAlign:
                "center",
            }}
          >
            <CheckCircle2
              size={34}
              color="#59cfa0"
              aria-hidden="true"
            />


            <h2>
              {L(
                language,
                "This case is already closed",
                "هذه الحالة مغلقة بالفعل"
              )}
            </h2>


            <p
              style={{
                color:
                  "#71849c",

                fontSize:
                  "10px",
              }}
            >
              {L(
                language,

                "Completed cases no longer require Manager approval and remain available in Reports & Audit.",

                "الحالات المكتملة لم تعد تحتاج إلى موافقة المدير وتبقى محفوظة في التقارير والسجل."
              )}
            </p>


            <Link
              href={
                `/reports-audit?case=${caseData.id}`
              }
              className="primaryButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              {L(
                language,
                "Open Reports & Audit",
                "فتح التقارير والسجل"
              )}
            </Link>

          </section>

        </main>

      </div>
    );
  }


  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        {/* ================================================
            BACK
            ================================================ */}

        <Link
          href={
            `/cases/${caseData.id}`
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

          {L(
            language,
            "Back to Case",
            "العودة إلى تفاصيل الحالة"
          )}
        </Link>


        {/* ================================================
            HEADER
            ================================================ */}

        <header className="topbar">

          <div>

            <div className="eyebrow">
              <BadgeCheck
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "SECOND HUMAN APPROVAL",
                "الموافقة البشرية الثانية"
              )}
            </div>


            <h1>
              {L(
                language,
                "Manager Approval",
                "موافقة المدير"
              )}
            </h1>


            <p>
              {L(
                language,

                "Review the employee-approved correction and decide whether execution can be authorized.",

                "راجع التعديل الذي اعتمده الموظف وقرر ما إذا كان يمكن التصريح بالتنفيذ."
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
                  "7px",

                marginTop:
                  "10px",
              }}
            >
              <span
                dir="ltr"
                style={{
                  color:
                    "#71849c",

                  fontSize:
                    "9px",
                }}
              >
                {caseData.id}
              </span>


              <span
                className={
                  caseData.priority ===
                  "IMMEDIATE"
                    ? "priority immediate"
                    : caseData.priority ===
                      "HIGH"
                      ? "priority high"
                      : "priority medium"
                }
              >
                {priorityLabel(
                  caseData.priority,
                  language
                )}
              </span>
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
          currentStep={
            currentStep
          }
        />


        {/* ================================================
            APPROVAL READINESS
            ================================================ */}

        <section
          style={{
            marginBottom:
              "14px",

            padding:
              "17px",

            borderRadius:
              "15px",

            border:
              officerApproved
                ? "1px solid rgba(89,207,160,0.15)"
                : "1px solid rgba(255,189,103,0.16)",

            background:
              officerApproved
                ? "rgba(89,207,160,0.035)"
                : "rgba(255,189,103,0.035)",
          }}
        >

          <div
            style={{
              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "flex-start",

              gap:
                "12px",

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
                    "43px",

                  height:
                    "43px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  borderRadius:
                    "12px",

                  color:
                    officerApproved
                      ? "#59cfa0"
                      : "#ffbd67",

                  background:
                    officerApproved
                      ? "rgba(89,207,160,0.07)"
                      : "rgba(255,189,103,0.07)",
                }}
              >
                {officerApproved ? (
                  <CheckCircle2
                    size={21}
                    aria-hidden="true"
                  />
                ) : (
                  <UserCheck
                    size={21}
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
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Employee Review",
                    "تدقيق الموظف"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      officerApproved
                        ? "#59cfa0"
                        : "#ffbd67",

                    fontSize:
                      "11px",
                  }}
                >
                  {officerApproved
                    ? L(
                        language,
                        "Approved",
                        "تم الاعتماد"
                      )
                    : L(
                        language,
                        "Approval Required First",
                        "يجب اعتماد الموظف أولًا"
                      )}
                </strong>


                {caseData.officer?.actor && (
                  <span
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        "#71849c",

                      fontSize:
                        "8.5px",
                    }}
                  >
                    {
                      caseData.officer.actor
                    }
                  </span>
                )}

              </div>

            </div>


            <span
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap:
                  "5px",

                padding:
                  "6px 9px",

                borderRadius:
                  "8px",

                color:
                  managerApproved
                    ? "#59cfa0"
                    : canDecide
                      ? "#ffbd67"
                      : "#71849c",

                background:
                  managerApproved
                    ? "rgba(89,207,160,0.07)"
                    : canDecide
                      ? "rgba(255,189,103,0.07)"
                      : "rgba(255,255,255,0.025)",

                border:
                  managerApproved
                    ? "1px solid rgba(89,207,160,0.15)"
                    : canDecide
                      ? "1px solid rgba(255,189,103,0.15)"
                      : "1px solid rgba(255,255,255,0.05)",

                fontSize:
                  "8px",

                fontWeight:
                  850,
              }}
            >
              {managerApproved
                ? L(
                    language,
                    "EXECUTION AUTHORIZED",
                    "تم التصريح بالتنفيذ"
                  )
                : canDecide
                  ? L(
                      language,
                      "WAITING FOR MANAGER",
                      "بانتظار قرار المدير"
                    )
                  : L(
                      language,
                      "EXECUTION LOCKED",
                      "التنفيذ مقفل"
                    )}
            </span>

          </div>

        </section>


        {/* ================================================
            CASE + AI SUMMARY
            ================================================ */}

        <section
          className="managerSummaryGrid"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap:
              "14px",

            marginBottom:
              "14px",
          }}
        >

          {/* CASE */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE",
                    "الحالة"
                  )}
                </div>


                <h2>
                  {personName}
                </h2>

              </div>


              <UserCheck
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

              <div
                className="managerInfoGrid"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(2,minmax(0,1fr))",

                  gap:
                    "8px",
                }}
              >
                <InfoBox
                  label={
                    L(
                      language,
                      "Problem",
                      "المشكلة"
                    )
                  }
                  value={
                    issueLabel
                  }
                />


                <InfoBox
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


                <InfoBox
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
                  dir="ltr"
                />


                <InfoBox
                  label={
                    L(
                      language,
                      "Priority",
                      "الأولوية"
                    )
                  }
                  value={
                    priorityLabel(
                      caseData.priority,
                      language
                    )
                  }
                  color={
                    caseData.priority ===
                    "IMMEDIATE"
                      ? "#ff7c89"
                      : "#ffbd67"
                  }
                />
              </div>

            </div>

          </div>


          {/* AI */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI RECOMMENDATION",
                    "توصية الذكاء الاصطناعي"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Recommendation Summary",
                    "ملخص التوصية"
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
              <p
                style={{
                  margin:
                    0,

                  color:
                    "#b9c7d7",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.7,
                }}
              >
                {aiSummary}
              </p>


              {caseData.wronglyAffected && (
                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "flex-start",

                    gap:
                      "7px",

                    marginTop:
                      "12px",

                    padding:
                      "10px",

                    borderRadius:
                      "9px",

                    color:
                      "#ff7c89",

                    background:
                      "rgba(255,80,100,0.04)",

                    border:
                      "1px solid rgba(255,80,100,0.10)",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.55,
                  }}
                >
                  <AlertTriangle
                    size={14}
                    aria-hidden="true"
                  />

                  <span>
                    {L(
                      language,

                      "This case may affect another person and requires careful human authorization.",

                      "قد تؤثر هذه الحالة على شخص آخر ولذلك تتطلب اعتمادًا بشريًا دقيقًا."
                    )}
                  </span>
                </div>
              )}

            </div>

          </div>

        </section>


        {/* ================================================
            CORRECTION PACKAGE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "14px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "CORRECTION PACKAGE",
                  "حزمة التعديل"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "What will be authorized?",
                  "ما الذي سيتم التصريح بتعديله؟"
                )}
              </h2>

            </div>


            <GitCompareArrows
              size={21}
              aria-hidden="true"
            />

          </div>


          <div
            className="technicalGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,minmax(0,1fr))",

              gap:
                "8px",

              padding:
                "17px 17px 0",
            }}
          >
            <InfoBox
              label={
                L(
                  language,
                  "Target System",
                  "النظام المستهدف"
                )
              }
              value={
                caseData.execution?.targetSystem ||
                "BIOMETRIC_SYSTEM"
              }
              color="#79a9ff"
              dir="ltr"
            />


            <InfoBox
              label={
                L(
                  language,
                  "Target Record",
                  "السجل المستهدف"
                )
              }
              value={
                caseData.execution?.targetRecord ||
                biometricId
              }
              dir="ltr"
            />


            <InfoBox
              label={
                L(
                  language,
                  "Target Field",
                  "الحقل المستهدف"
                )
              }
              value={
                caseData.execution?.field ||
                "linked_master_id"
              }
              color="#79a9ff"
              dir="ltr"
            />
          </div>


          <div
            className="beforeAfterGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              alignItems:
                "center",

              gap:
                "12px",

              padding:
                "14px 17px 17px",
            }}
          >

            {/* BEFORE */}

            <div
              style={{
                padding:
                  "15px",

                borderRadius:
                  "11px",

                border:
                  "1px solid rgba(255,80,100,0.10)",

                background:
                  "rgba(255,80,100,0.035)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  color:
                    "#a76d76",

                  fontSize:
                    "8px",

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
                    "8px",

                  color:
                    "#e1e9f3",

                  fontSize:
                    "11px",
                }}
              >
                {currentName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "5px",

                  color:
                    "#ff7c89",

                  fontSize:
                    "12px",

                  fontWeight:
                    850,
                }}
              >
                {currentReference}
              </span>

            </div>


            <ChevronRight
              className="managerMappingArrow"
              size={20}
              color="#71849c"
              style={
                arrowStyle
              }
              aria-hidden="true"
            />


            {/* AFTER */}

            <div
              style={{
                padding:
                  "15px",

                borderRadius:
                  "11px",

                border:
                  "1px solid rgba(89,207,160,0.13)",

                background:
                  "rgba(89,207,160,0.04)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  color:
                    "#589a82",

                  fontSize:
                    "8px",

                  fontWeight:
                    850,
                }}
              >
                {L(
                  language,
                  "PROPOSED LINK",
                  "الربط المقترح"
                )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "8px",

                  color:
                    "#e1e9f3",

                  fontSize:
                    "11px",
                }}
              >
                {proposedName}
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
                    "12px",

                  fontWeight:
                    850,
                }}
              >
                {proposedReference}
              </span>

            </div>

          </div>


          <div
            style={{
              margin:
                "0 17px 17px",

              padding:
                "11px",

              borderRadius:
                "9px",

              color:
                "#788ba2",

              background:
                "rgba(121,169,255,0.025)",

              border:
                "1px solid rgba(121,169,255,0.06)",

              fontSize:
                "9px",

              lineHeight:
                1.6,
            }}
          >
            <LockKeyhole
              size={13}
              aria-hidden="true"
              style={{
                marginInlineEnd:
                  "6px",

                verticalAlign:
                  "middle",
              }}
            />

            {L(
              language,

              "Manager approval authorizes this exact Before → After change only. The Master Reference remains read-only.",

              "موافقة المدير تصرح فقط بهذا التعديل المحدد من الربط الحالي إلى الربط المقترح، ويبقى المرجع الرئيسي للقراءة فقط."
            )}
          </div>

        </section>


        {/* ================================================
            MANAGER DECISION
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "14px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "MANAGER DECISION",
                  "قرار المدير"
                )}
              </div>


              <h2>
                {managerApproved
                  ? L(
                      language,
                      "Approval Completed",
                      "اكتملت موافقة المدير"
                    )
                  : returnedToOfficer
                    ? L(
                        language,
                        "Returned to Employee",
                        "تمت إعادة الحالة إلى الموظف"
                      )
                    : L(
                        language,
                        "Review and Decide",
                        "راجع واتخذ القرار"
                      )}
              </h2>

            </div>


            <BadgeCheck
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

            {/* ============================================
                BLOCKED - OFFICER NOT APPROVED
                ============================================ */}

            {!officerApproved &&
              !returnedToOfficer && (
                <div
                  style={{
                    padding:
                      "15px",

                    borderRadius:
                      "11px",

                    border:
                      "1px solid rgba(255,189,103,0.15)",

                    background:
                      "rgba(255,189,103,0.04)",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "7px",

                      color:
                        "#ffbd67",
                    }}
                  >
                    <LockKeyhole
                      size={18}
                      aria-hidden="true"
                    />

                    <strong
                      style={{
                        fontSize:
                          "11px",
                      }}
                    >
                      {L(
                        language,
                        "Manager approval is locked",
                        "موافقة المدير مقفلة"
                      )}
                    </strong>
                  </div>


                  <p
                    style={{
                      margin:
                        "8px 0 0",

                      color:
                        "#8193aa",

                      fontSize:
                        "9.5px",

                      lineHeight:
                        1.65,
                    }}
                  >
                    {L(
                      language,

                      "The case must complete Employee Review before the Manager can authorize execution.",

                      "يجب أن تكمل الحالة تدقيق الموظف قبل أن يتمكن المدير من التصريح بالتنفيذ."
                    )}
                  </p>


                  <Link
                    href={
                      `/officer-review?case=${caseData.id}`
                    }
                    style={{
                      minHeight:
                        "41px",

                      marginTop:
                        "12px",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      gap:
                        "6px",

                      borderRadius:
                        "9px",

                      textDecoration:
                        "none",

                      color:
                        "#79a9ff",

                      background:
                        "rgba(121,169,255,0.04)",

                      border:
                        "1px solid rgba(121,169,255,0.12)",

                      fontSize:
                        "9px",

                      fontWeight:
                        850,
                    }}
                  >
                    <UserCheck
                      size={14}
                      aria-hidden="true"
                    />

                    {L(
                      language,
                      "Open Employee Review",
                      "فتح تدقيق الموظف"
                    )}
                  </Link>

                </div>
              )}


            {/* ============================================
                PENDING MANAGER DECISION
                ============================================ */}

            {canDecide && (
              <>

                <label
                  style={{
                    display:
                      "block",

                    marginBottom:
                      "7px",

                    color:
                      "#71849c",

                    fontSize:
                      "8.5px",
                  }}
                >
                  {L(
                    language,
                    "Manager Notes",
                    "ملاحظات المدير"
                  )}
                </label>


                <textarea
                  value={
                    comments
                  }
                  onChange={
                    (
                      event
                    ) => {
                      setComments(
                        event.target.value
                      );
                    }
                  }
                  rows={4}
                  placeholder={
                    L(
                      language,

                      "Example: Employee approval and evidence reviewed. Correction authorized.",

                      "مثال: تمت مراجعة اعتماد الموظف والأدلة، وتم التصريح بالتعديل."
                    )
                  }
                  style={{
                    width:
                      "100%",

                    boxSizing:
                      "border-box",

                    resize:
                      "vertical",

                    padding:
                      "12px",

                    borderRadius:
                      "10px",

                    outline:
                      "none",

                    border:
                      "1px solid rgba(121,169,255,0.12)",

                    background:
                      "rgba(4,18,33,0.52)",

                    color:
                      "#cbd7e5",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.7,
                  }}
                />


                {error && (
                  <div
                    style={{
                      marginTop:
                        "10px",

                      padding:
                        "10px",

                      borderRadius:
                        "9px",

                      color:
                        "#ff7c89",

                      background:
                        "rgba(255,80,100,0.05)",

                      border:
                        "1px solid rgba(255,80,100,0.12)",

                      fontSize:
                        "9px",
                    }}
                  >
                    {error}
                  </div>
                )}


                <div
                  className="managerButtons"
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap:
                      "9px",

                    marginTop:
                      "13px",
                  }}
                >

                  <button
                    type="button"
                    onClick={
                      approve
                    }
                    style={{
                      minHeight:
                        "44px",

                      border:
                        "1px solid rgba(111,230,180,0.40)",

                      borderRadius:
                        "10px",

                      background:
                        "linear-gradient(90deg,#4bc58f,#68d9ab)",

                      color:
                        "#071c17",

                      fontFamily:
                        "inherit",

                      fontSize:
                        "10px",

                      fontWeight:
                        900,
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      aria-hidden="true"
                      style={{
                        marginInlineEnd:
                          "6px",

                        verticalAlign:
                          "middle",
                      }}
                    />

                    {L(
                      language,
                      "Approve & Authorize Correction",
                      "الموافقة والتصريح بالتعديل"
                    )}
                  </button>


                  <button
                    type="button"
                    onClick={
                      returnToOfficer
                    }
                    style={{
                      minHeight:
                        "44px",

                      border:
                        "1px solid rgba(121,169,255,0.18)",

                      borderRadius:
                        "10px",

                      background:
                        "rgba(121,169,255,0.04)",

                      color:
                        "#79a9ff",

                      fontFamily:
                        "inherit",

                      fontSize:
                        "10px",

                      fontWeight:
                        850,
                    }}
                  >
                    <RotateCcw
                      size={15}
                      aria-hidden="true"
                      style={{
                        marginInlineEnd:
                          "6px",

                        verticalAlign:
                          "middle",
                      }}
                    />

                    {L(
                      language,
                      "Return to Employee",
                      "إعادة إلى الموظف"
                    )}
                  </button>

                </div>

              </>
            )}


            {/* ============================================
                APPROVED
                ============================================ */}

            {managerApproved && (
              <div
                style={{
                  padding:
                    "15px",

                  borderRadius:
                    "11px",

                  border:
                    "1px solid rgba(89,207,160,0.15)",

                  background:
                    "rgba(89,207,160,0.045)",
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

                    color:
                      "#59cfa0",
                  }}
                >
                  <CheckCircle2
                    size={19}
                    aria-hidden="true"
                  />

                  <strong
                    style={{
                      fontSize:
                        "11px",
                    }}
                  >
                    {L(
                      language,
                      "Manager approval recorded",
                      "تم تسجيل موافقة المدير"
                    )}
                  </strong>
                </div>


                <p
                  style={{
                    margin:
                      "8px 0 0",

                    color:
                      "#7f92a9",

                    fontSize:
                      "9.5px",

                    lineHeight:
                      1.65,
                  }}
                >
                  {L(
                    language,

                    "Both required human approvals are complete. The exact correction shown above is now authorized for controlled execution.",

                    "اكتملت الموافقتان البشريتان المطلوبتان. أصبح التعديل المحدد أعلاه مصرحًا الآن للتنفيذ الخاضع للتحكم."
                  )}
                </p>


                {comments && (
                  <div
                    style={{
                      marginTop:
                        "10px",

                      padding:
                        "10px",

                      borderRadius:
                        "9px",

                      color:
                        "#8193aa",

                      background:
                        "rgba(255,255,255,0.02)",

                      border:
                        "1px solid rgba(255,255,255,0.04)",

                      fontSize:
                        "9px",

                      lineHeight:
                        1.6,
                    }}
                  >
                    <strong
                      style={{
                        display:
                          "block",

                        marginBottom:
                          "4px",

                        color:
                          "#a9b8c9",
                      }}
                    >
                      {L(
                        language,
                        "Manager Notes",
                        "ملاحظات المدير"
                      )}
                    </strong>

                    {comments}
                  </div>
                )}


                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "6px",

                    marginTop:
                      "11px",

                    padding:
                      "9px",

                    borderRadius:
                      "8px",

                    color:
                      "#59cfa0",

                    background:
                      "rgba(89,207,160,0.03)",

                    border:
                      "1px solid rgba(89,207,160,0.08)",

                    fontSize:
                      "8.5px",

                    fontWeight:
                      800,
                  }}
                >
                  <LockKeyhole
                    size={13}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Execution lock released for this case",
                    "تم فتح قفل التنفيذ لهذه الحالة"
                  )}
                </div>


                <Link
                  href={
                    `/corrections-verification?case=${caseData.id}`
                  }
                  style={{
                    minHeight:
                      "44px",

                    marginTop:
                      "12px",

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

                    color:
                      "#071c17",

                    background:
                      "linear-gradient(90deg,#4bc58f,#68d9ab)",

                    border:
                      "1px solid rgba(111,230,180,0.40)",

                    fontSize:
                      "10px",

                    fontWeight:
                      900,
                  }}
                >
                  <Activity
                    size={15}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Continue to Correction",
                    "الانتقال إلى تنفيذ التعديل"
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
            )}


            {/* ============================================
                RETURNED TO EMPLOYEE
                ============================================ */}

            {returnedToOfficer &&
              !managerApproved && (
                <div
                  style={{
                    padding:
                      "15px",

                    borderRadius:
                      "11px",

                    border:
                      "1px solid rgba(255,189,103,0.15)",

                    background:
                      "rgba(255,189,103,0.04)",
                  }}
                >

                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "7px",

                      color:
                        "#ffbd67",
                    }}
                  >
                    <RotateCcw
                      size={18}
                      aria-hidden="true"
                    />

                    <strong
                      style={{
                        fontSize:
                          "11px",
                      }}
                    >
                      {L(
                        language,
                        "Case returned to Employee Review",
                        "تمت إعادة الحالة إلى تدقيق الموظف"
                      )}
                    </strong>
                  </div>


                  <p
                    style={{
                      margin:
                        "8px 0 0",

                      color:
                        "#8193aa",

                      fontSize:
                        "9.5px",

                      lineHeight:
                        1.65,
                    }}
                  >
                    {L(
                      language,

                      "Execution remains locked. The employee must review the case again before it can return to Manager approval.",

                      "يبقى التنفيذ مقفلًا. يجب على الموظف مراجعة الحالة مرة أخرى قبل أن تعود إلى موافقة المدير."
                    )}
                  </p>


                  <Link
                    href={
                      `/officer-review?case=${caseData.id}`
                    }
                    style={{
                      minHeight:
                        "41px",

                      marginTop:
                        "12px",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      gap:
                        "6px",

                      borderRadius:
                        "9px",

                      textDecoration:
                        "none",

                      color:
                        "#79a9ff",

                      background:
                        "rgba(121,169,255,0.04)",

                      border:
                        "1px solid rgba(121,169,255,0.12)",

                      fontSize:
                        "9px",

                      fontWeight:
                        850,
                    }}
                  >
                    <UserCheck
                      size={14}
                      aria-hidden="true"
                    />

                    {L(
                      language,
                      "Return to Employee Review",
                      "العودة إلى تدقيق الموظف"
                    )}
                  </Link>

                </div>
              )}


            {/* ============================================
                ALREADY MOVED FORWARD
                ============================================ */}

            {!canDecide &&
              officerApproved &&
              !managerApproved &&
              !returnedToOfficer && (
                <div
                  style={{
                    padding:
                      "14px",

                    borderRadius:
                      "10px",

                    color:
                      "#8193aa",

                    background:
                      "rgba(121,169,255,0.035)",

                    border:
                      "1px solid rgba(121,169,255,0.08)",

                    fontSize:
                      "9.5px",

                    lineHeight:
                      1.65,
                  }}
                >
                  {L(
                    language,

                    "This case is no longer waiting for a Manager decision. Open the case details to continue from its current workflow stage.",

                    "هذه الحالة لم تعد بانتظار قرار المدير. افتح تفاصيل الحالة للمتابعة من مرحلتها الحالية."
                  )}


                  <Link
                    href={
                      `/cases/${caseData.id}`
                    }
                    style={{
                      minHeight:
                        "39px",

                      marginTop:
                        "11px",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      borderRadius:
                        "9px",

                      color:
                        "#79a9ff",

                      textDecoration:
                        "none",

                      background:
                        "rgba(121,169,255,0.04)",

                      border:
                        "1px solid rgba(121,169,255,0.10)",

                      fontWeight:
                        800,
                    }}
                  >
                    {L(
                      language,
                      "Open Case",
                      "فتح الحالة"
                    )}
                  </Link>
                </div>
              )}

          </div>

        </section>


        {/* ================================================
            SAFETY
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 14px",

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
                "Manager approval authorizes only this correction",
                "موافقة المدير تصرح فقط بهذا التعديل"
              )}
            </strong>


            <span>
              {L(
                language,

                "Only the approved biometric relationship may be changed. The Master Reference stays read-only, and successful verification is still required before the case can close.",

                "يمكن تغيير الربط البيومتري المعتمد فقط. يبقى المرجع الرئيسي للقراءة فقط، ويظل نجاح التحقق إلزاميًا قبل إغلاق الحالة."
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
              "AI Biometric Reconciliation Platform · Manager Approval",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · موافقة المدير"
            )}
          </span>


          <div>
            {managerApproved ? (
              <CheckCircle2
                size={14}
                aria-hidden="true"
              />
            ) : (
              <ShieldCheck
                size={14}
                aria-hidden="true"
              />
            )}

            <span dir="ltr">
              {caseData.id}
            </span>
          </div>

        </footer>


        {/* ================================================
            MOBILE
            ================================================ */}

        <style jsx>{`

          @media (
            max-width: 850px
          ) {

            .managerSummaryGrid {
              grid-template-columns:
                1fr
                !important;
            }

          }


          @media (
            max-width: 760px
          ) {

            .managerWorkflow {
              overflow-x:
                auto;
            }


            .managerWorkflowGrid {
              min-width:
                520px;
            }


            .technicalGrid {
              grid-template-columns:
                1fr
                !important;
            }


            .beforeAfterGrid {
              grid-template-columns:
                1fr
                !important;
            }


            :global(.managerMappingArrow) {
              margin:
                0 auto;

              transform:
                rotate(90deg)
                !important;
            }


            .managerButtons {
              grid-template-columns:
                1fr
                !important;
            }

          }


          @media (
            max-width: 480px
          ) {

            .managerInfoGrid {
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