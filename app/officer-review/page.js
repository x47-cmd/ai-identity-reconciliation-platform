"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  ACTIVE_CASES,
  CASE_TYPE_LABELS,
  PRIMARY_ACTIVE_CASE_ID,
} from "../lib/demo-data";

import {
  initializeDemoCaseStore,
  submitOfficerDecision,
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
      className="reviewWorkflow"
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
        className="reviewWorkflowGrid"
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
                        ? "1px solid rgba(121,169,255,0.18)"
                        : "1px solid rgba(255,255,255,0.04)",

                  background:
                    completed
                      ? "rgba(89,207,160,0.04)"
                      : active
                        ? "rgba(121,169,255,0.07)"
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
                          ? "#79a9ff"
                          : "#61738a",

                    background:
                      completed
                        ? "rgba(89,207,160,0.07)"
                        : active
                          ? "rgba(121,169,255,0.07)"
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
                          ? "#b4cefb"
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
   SMALL INFO BOX
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
   CASE NOT AVAILABLE
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
              "Case not available for employee review",
              "الحالة غير متاحة لتدقيق الموظف"
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

export default function OfficerReviewPage() {
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
     INITIALIZE STORE + READ CASE FROM URL

     Example:
     /officer-review?case=CASE-2026-00002

     We intentionally avoid useSearchParams here so the
     static GitHub Pages export remains simple.
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
     CASE DATA

     Store is the source of truth after hydration.
     Baseline data is used only as an initial fallback.
     ======================================================= */

  const fallbackCase =
    ACTIVE_CASES.find(
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
     LOAD PREVIOUS NOTES
     ======================================================= */

  useEffect(
    () => {
      if (
        !caseData
      ) {
        return;
      }


      setComments(
        typeof caseData.officerNotes ===
          "string"
          ? caseData.officerNotes
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
        "AI detected an identity relationship that requires authorized human review.",
        "اكتشف الذكاء الاصطناعي مشكلة في ربط الهوية تحتاج إلى مراجعة بشرية مخولة."
      )
    );


  const workflowStatus =
    caseData.workflowStatus ||
    caseData.finalStatus ||
    "READY_FOR_OFFICER_REVIEW";


  const officerDecision =
    caseData.officerDecision ||
    caseData.officer?.decision ||
    "PENDING";


  const approved =
    officerDecision ===
    "APPROVED";


  const furtherInvestigation =
    officerDecision ===
    "MORE_INVESTIGATION";


  const closed =
    Boolean(
      caseData.closed
    ) ||
    caseData.finalStatus ===
      "VERIFIED_CLOSED";


  /* =======================================================
     WORKFLOW DISPLAY POSITION
     ======================================================= */

  let currentStep =
    2;


  if (
    furtherInvestigation
  ) {
    currentStep =
      1;
  } else if (
    approved
  ) {
    currentStep =
      3;
  }


  /* =======================================================
     CAN REVIEW?

     Employee review is allowed only while this case is
     awaiting the first human decision.
     ======================================================= */

  const canReview =
    !closed &&
    !approved &&
    !furtherInvestigation &&
    [
      "READY_FOR_OFFICER_REVIEW",
      "AI_INVESTIGATED",
      "OFFICER_REJECTED",
    ].includes(
      workflowStatus
    );


  /* =======================================================
     APPROVE
     ======================================================= */

  const approveCase =
    () => {
      try {
        setError(
          ""
        );


        updateCase(
          selectedCaseId,
          {
            officerNotes:
              comments.trim(),

            officerReviewUpdatedAt:
              new Date().toISOString(),
          }
        );


        submitOfficerDecision(
          selectedCaseId,
          "APPROVED",
          "Demo Monitoring Officer"
        );

      } catch (
        reviewError
      ) {
        setError(
          reviewError?.message ||
          L(
            language,
            "Unable to record the decision.",
            "تعذر تسجيل القرار."
          )
        );
      }
    };


  /* =======================================================
     REQUEST MORE INVESTIGATION
     ======================================================= */

  const requestInvestigation =
    () => {
      try {
        setError(
          ""
        );


        updateCase(
          selectedCaseId,
          {
            officerNotes:
              comments.trim(),

            officerReviewUpdatedAt:
              new Date().toISOString(),
          }
        );


        submitOfficerDecision(
          selectedCaseId,
          "MORE_INVESTIGATION",
          "Demo Monitoring Officer"
        );

      } catch (
        reviewError
      ) {
        setError(
          reviewError?.message ||
          L(
            language,
            "Unable to update the case.",
            "تعذر تحديث الحالة."
          )
        );
      }
    };


  /* =======================================================
     REOPEN AFTER DEMO INVESTIGATION

     This lets the presenter continue the walkthrough after
     demonstrating a request for additional investigation.
     ======================================================= */

  const reopenForReview =
    () => {
      try {
        setError(
          ""
        );


        updateCase(
          selectedCaseId,
          (
            current
          ) => ({
            officer: {
              ...(
                typeof current.officer ===
                "object"
                  ? current.officer
                  : {}
              ),

              role:
                "Monitoring Officer",

              actor:
                null,

              decision:
                "PENDING",
            },

            officerDecision:
              "PENDING",

            manager: {
              ...(
                typeof current.manager ===
                "object"
                  ? current.manager
                  : {}
              ),

              role:
                "Supervising Manager",

              actor:
                null,

              decision:
                "NOT_READY",
            },

            managerDecision:
              "NOT_READY",

            workflowStatus:
              "READY_FOR_OFFICER_REVIEW",

            stage:
              "READY_FOR_OFFICER_REVIEW",

            status:
              "READY_FOR_OFFICER_REVIEW",

            finalStatus:
              "READY_FOR_OFFICER_REVIEW",
          })
        );

      } catch (
        reviewError
      ) {
        setError(
          reviewError?.message ||
          L(
            language,
            "Unable to return the case to review.",
            "تعذر إعادة الحالة إلى التدقيق."
          )
        );
      }
    };


  /* =======================================================
     CLOSED CASE SAFETY
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
                "Completed cases are retained in Reports & Audit and no longer require employee review.",
                "الحالات المكتملة محفوظة في التقارير والسجل ولم تعد تحتاج إلى تدقيق الموظف."
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
                "HUMAN REVIEW",
                "المراجعة البشرية"
              )}
            </div>


            <h1>
              {L(
                language,
                "Employee Review",
                "تدقيق الموظف"
              )}
            </h1>


            <p>
              {L(
                language,

                "Review what the AI found and confirm whether the proposed correction should continue to Manager approval.",

                "راجع ما اكتشفه الذكاء الاصطناعي، ثم قرر ما إذا كان التعديل المقترح سينتقل إلى موافقة المدير."
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
            CASE HERO
            ================================================ */}

        <section
          style={{
            marginBottom:
              "16px",

            padding:
              "17px",

            borderRadius:
              "15px",

            border:
              approved
                ? "1px solid rgba(89,207,160,0.20)"
                : "1px solid rgba(121,169,255,0.12)",

            background:
              approved
                ? "rgba(89,207,160,0.04)"
                : "rgba(11,29,50,0.72)",
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
                    approved
                      ? "#59cfa0"
                      : "#79a9ff",

                  background:
                    approved
                      ? "rgba(89,207,160,0.07)"
                      : "rgba(121,169,255,0.07)",
                }}
              >
                {approved ? (
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

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#e3ecf7",

                    fontSize:
                      "14px",
                  }}
                >
                  {personName}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#71849c",

                    fontSize:
                      "9px",
                  }}
                >
                  {issueLabel}
                </span>

              </div>

            </div>


            {caseData.wronglyAffected && (
              <div
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
                    "#ff7c89",

                  background:
                    "rgba(255,80,100,0.07)",

                  border:
                    "1px solid rgba(255,80,100,0.15)",

                  fontSize:
                    "8px",

                  fontWeight:
                    850,
                }}
              >
                <AlertTriangle
                  size={13}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "May affect another person",
                  "قد تؤثر على شخص آخر"
                )}
              </div>
            )}

          </div>

        </section>


        {/* ================================================
            AI FINDING
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
                  "AI FINDING",
                  "نتيجة الذكاء الاصطناعي"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "What did the system find?",
                  "ماذا اكتشف النظام؟"
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
                  "#c4d0de",

                fontSize:
                  "10.5px",

                lineHeight:
                  1.7,
              }}
            >
              {aiSummary}
            </p>


            <div
              className="reviewInfoGrid"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(3,minmax(0,1fr))",

                gap:
                  "8px",

                marginTop:
                  "14px",
              }}
            >
              <InfoBox
                label={
                  L(
                    language,
                    "Biometric Record",
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
                dir="ltr"
                color="#79a9ff"
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

        </section>


        {/* ================================================
            PROPOSED CHANGE
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
                  "PROPOSED CORRECTION",
                  "التعديل المقترح"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "What will change?",
                  "ما الذي سيتغير؟"
                )}
              </h2>

            </div>


            <GitCompareArrows
              size={21}
              aria-hidden="true"
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
                "17px",
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
                  "CURRENT",
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
                    "11px",

                  fontWeight:
                    800,
                }}
              >
                {currentReference}
              </span>

            </div>


            <ChevronRight
              className="reviewMappingArrow"
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
                  "PROPOSED",
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
                    "11px",

                  fontWeight:
                    800,
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
            <ShieldCheck
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

              `The proposed correction changes the biometric link from ${currentReference} to ${proposedReference}. No change is executed from this page.`,

              `يقترح النظام تغيير ربط السجل البيومتري من ${currentReference} إلى ${proposedReference}. لا يتم تنفيذ أي تعديل من هذه الصفحة.`
            )}
          </div>

        </section>


        {/* ================================================
            HUMAN DECISION
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
                  "EMPLOYEE DECISION",
                  "قرار الموظف"
                )}
              </div>


              <h2>
                {approved
                  ? L(
                      language,
                      "Review Completed",
                      "اكتمل تدقيق الموظف"
                    )
                  : furtherInvestigation
                    ? L(
                        language,
                        "Additional Investigation Requested",
                        "تم طلب تحقيق إضافي"
                      )
                    : L(
                        language,
                        "Review and Decide",
                        "راجع واتخذ القرار"
                      )}
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

            {/* ============================================
                PENDING REVIEW
                ============================================ */}

            {canReview && (
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
                    "Review Notes",
                    "ملاحظات التدقيق"
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

                      "Example: Evidence reviewed and the proposed correction is supported.",

                      "مثال: تمت مراجعة الأدلة والتعديل المقترح مدعوم بالنتائج."
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
                  className="decisionButtons"
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
                      approveCase
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
                      "Approve & Send to Manager",
                      "اعتماد وإرسال للمدير"
                    )}
                  </button>


                  <button
                    type="button"
                    onClick={
                      requestInvestigation
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
                    <BrainCircuit
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
                      "Request More Investigation",
                      "طلب تحقيق إضافي"
                    )}
                  </button>

                </div>

              </>
            )}


            {/* ============================================
                APPROVED
                ============================================ */}

            {approved && (
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
                      "Employee approval recorded",
                      "تم تسجيل اعتماد الموظف"
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

                    "The first human approval is saved. No correction has been executed. The case is now waiting for Manager authorization.",

                    "تم حفظ الموافقة البشرية الأولى. لم يتم تنفيذ أي تعديل، والحالة الآن بانتظار موافقة المدير."
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
                        "Employee Notes",
                        "ملاحظات الموظف"
                      )}
                    </strong>

                    {comments}
                  </div>
                )}


                <Link
                  href={
                    `/manager-approval?case=${caseData.id}`
                  }
                  style={{
                    minHeight:
                      "44px",

                    marginTop:
                      "13px",

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
                  <BadgeCheck
                    size={15}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Continue to Manager Approval",
                    "الانتقال إلى موافقة المدير"
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
                MORE INVESTIGATION
                ============================================ */}

            {furtherInvestigation && (
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
                  <BrainCircuit
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
                      "Additional investigation requested",
                      "تم طلب تحقيق إضافي"
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

                    "The case returned to the investigation stage. Execution remains blocked and the Manager cannot approve it yet.",

                    "عادت الحالة إلى مرحلة التحقيق. يبقى التنفيذ محظورًا ولا يمكن للمدير اعتمادها حاليًا."
                  )}
                </p>


                <div
                  className="investigationActions"
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap:
                      "8px",

                    marginTop:
                      "12px",
                  }}
                >

                  <Link
                    href={
                      `/cases/${caseData.id}`
                    }
                    style={{
                      minHeight:
                        "40px",

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
                        800,
                    }}
                  >
                    <BrainCircuit
                      size={14}
                      aria-hidden="true"
                    />

                    {L(
                      language,
                      "View Investigation",
                      "عرض التحقيق"
                    )}
                  </Link>


                  <button
                    type="button"
                    onClick={
                      reopenForReview
                    }
                    style={{
                      minHeight:
                        "40px",

                      borderRadius:
                        "9px",

                      border:
                        "1px solid rgba(89,207,160,0.13)",

                      background:
                        "rgba(89,207,160,0.04)",

                      color:
                        "#59cfa0",

                      fontFamily:
                        "inherit",

                      fontSize:
                        "9px",

                      fontWeight:
                        850,
                    }}
                  >
                    <UserCheck
                      size={14}
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
                      "Return to Employee Review",
                      "إعادة الحالة لتدقيق الموظف"
                    )}
                  </button>

                </div>

              </div>
            )}


            {/* ============================================
                CASE ALREADY MOVED FORWARD
                ============================================ */}

            {!canReview &&
              !approved &&
              !furtherInvestigation && (
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

                    "This case has already moved beyond the Employee Review stage. Open the case details to continue from its current workflow step.",

                    "تجاوزت هذه الحالة مرحلة تدقيق الموظف. افتح تفاصيل الحالة للمتابعة من المرحلة الحالية."
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
            GOVERNANCE
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
                "Employee approval does not execute the correction",
                "اعتماد الموظف لا ينفذ التعديل"
              )}
            </strong>


            <span>
              {L(
                language,

                "After Employee approval, the same case moves to Manager approval. The correction remains locked until the second human approval is recorded.",

                "بعد اعتماد الموظف تنتقل نفس الحالة إلى موافقة المدير، ويبقى التعديل مقفلًا حتى تسجيل الموافقة البشرية الثانية."
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
              "AI Biometric Reconciliation Platform · Employee Review",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · تدقيق الموظف"
            )}
          </span>


          <div>
            <Activity
              size={14}
              aria-hidden="true"
            />

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
            max-width: 760px
          ) {

            .reviewWorkflow {
              overflow-x:
                auto;
            }


            .reviewWorkflowGrid {
              min-width:
                520px;
            }


            .reviewInfoGrid {
              grid-template-columns:
                1fr
                1fr
                !important;
            }


            .reviewInfoGrid
            > div:first-child {
              grid-column:
                1 / -1;
            }


            .beforeAfterGrid {
              grid-template-columns:
                1fr
                !important;
            }


            :global(.reviewMappingArrow) {
              margin:
                0 auto;

              transform:
                rotate(90deg)
                !important;
            }


            .decisionButtons,
            .investigationActions {
              grid-template-columns:
                1fr
                !important;
            }

          }

        `}</style>

      </main>

    </div>
  );
}