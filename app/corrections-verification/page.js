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
  PRIMARY_ACTIVE_CASE_ID,
} from "../lib/demo-data";

import {
  executeCaseCorrection,
  initializeDemoCaseStore,
  verifyCaseCorrection,
  useCaseStore,
} from "../lib/case-store";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleCheckBig,
  Database,
  FileCheck2,
  GitCompareArrows,
  History,
  LockKeyhole,
  Play,
  RefreshCcw,
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
  verified,
}) {
  return (
    <section
      className="executionWorkflow"
      style={{
        marginBottom:
          "16px",

        padding:
          "17px",

        borderRadius:
          "16px",

        border:
          verified
            ? "1px solid rgba(89,207,160,0.15)"
            : "1px solid rgba(121,169,255,0.10)",

        background:
          "rgba(11,29,50,0.72)",
      }}
    >

      <div
        className="executionWorkflowGrid"
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
              verified ||
              step.number <
                currentStep;


            const active =
              !verified &&
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
   INFO CARD
   ========================================================= */

function InfoCard({
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
   RESULT ROW
   ========================================================= */

function ResultRow({
  label,
  value,
  success = false,
  warning = false,
  dir,
}) {
  return (
    <div
      style={{
        display:
          "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        gap:
          "14px",

        padding:
          "11px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.04)",
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
          color:
            success
              ? "#59cfa0"
              : warning
                ? "#ffbd67"
                : "#d3deea",

          fontSize:
            "9.5px",

          textAlign:
            "end",
        }}
      >
        {value}
      </strong>

    </div>
  );
}


/* =========================================================
   AUDIT EVENT
   ========================================================= */

function AuditEvent({
  number,
  title,
  completed,
  active,
}) {
  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "32px 1fr",

        gap:
          "10px",

        alignItems:
          "center",

        padding:
          "10px 0",
      }}
    >

      <div
        style={{
          width:
            "28px",

          height:
            "28px",

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
                : "#5d7088",

          background:
            completed
              ? "rgba(89,207,160,0.07)"
              : active
                ? "rgba(121,169,255,0.07)"
                : "rgba(255,255,255,0.02)",

          border:
            completed
              ? "1px solid rgba(89,207,160,0.15)"
              : active
                ? "1px solid rgba(121,169,255,0.15)"
                : "1px solid rgba(255,255,255,0.04)",

          fontSize:
            "8px",

          fontWeight:
            850,
        }}
      >

        {completed ? (
          <CheckCircle2
            size={14}
            aria-hidden="true"
          />
        ) : (
          number
        )}

      </div>


      <span
        style={{
          color:
            completed
              ? "#b6c8d7"
              : active
                ? "#8fb4ef"
                : "#60738b",

          fontSize:
            "9.5px",

          lineHeight:
            1.55,
        }}
      >
        {title}
      </span>

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


        <section
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

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CorrectionsVerificationPage() {
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
    error,
    setError,
  ] =
    useState(
      ""
    );


  /* =======================================================
     INITIALIZE + READ CASE ID

     Example:
     /corrections-verification?case=CASE-2026-00002
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
     CORE VALUES
     ======================================================= */

  const personName =
    localizedValue(
      caseData.person,
      language,
      caseData.id
    );


  const biometricId =
    caseData.biometricId ||
    caseData.primaryBiometricId ||
    caseData.execution?.targetRecord ||
    "—";


  const beforeReference =
    caseData.execution?.before ||
    caseData.currentIdentity ||
    "—";


  const afterReference =
    caseData.execution?.after ||
    caseData.proposedIdentity ||
    caseData.canonicalIdentity ||
    "—";


  const beforeName =
    localizedValue(
      caseData.execution?.beforeName ||
        caseData.currentIdentityName,
      language,
      L(
        language,
        "Current linked reference",
        "المرجع المرتبط حاليًا"
      )
    );


  const afterName =
    localizedValue(
      caseData.execution?.afterName ||
        caseData.proposedIdentityName ||
        caseData.canonicalIdentityName,
      language,
      personName
    );


  const officerDecision =
    caseData.officerDecision ||
    caseData.officer?.decision ||
    "PENDING";


  const managerDecision =
    caseData.managerDecision ||
    caseData.manager?.decision ||
    "NOT_READY";


  const executionStatus =
    typeof caseData.execution ===
      "object"
      ? caseData.execution.status ||
        "NOT_AUTHORIZED"
      : caseData.correction ||
        "NOT_AUTHORIZED";


  const verificationStatus =
    typeof caseData.verification ===
      "object"
      ? caseData.verification.status ||
        "NOT_STARTED"
      : "NOT_STARTED";


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


  const executed =
    executionStatus ===
      "COMPLETED" ||
    workflowStatus ===
      "AWAITING_VERIFICATION" ||
    closed;


  const verified =
    verificationStatus ===
      "PASSED" ||
    closed;


  const verificationFailed =
    verificationStatus ===
      "FAILED" ||
    workflowStatus ===
      "VERIFICATION_FAILED";


  const authorized =
    !closed &&
    officerApproved &&
    managerApproved &&
    (
      executionStatus ===
        "READY" ||
      workflowStatus ===
        "READY_FOR_CORRECTION"
    );


  /* =======================================================
     VERIFICATION RESULT VALUES
     ======================================================= */

  const verificationScore =
    caseData.verification?.score ??
    null;


  const biometricMatchPercent =
    caseData.verification
      ?.biometricMatchPercent ??
    null;


  const identityMappingValid =
    caseData.verification
      ?.identityMappingValid ??
    null;


  const conflictResolved =
    caseData.verification
      ?.originalConflictResolved ??
    null;


  const secondaryConflict =
    caseData.verification
      ?.secondaryConflict ??
    null;


  /* =======================================================
     WORKFLOW STEP
     ======================================================= */

  let currentStep =
    4;


  if (
    executed &&
    !verified
  ) {
    currentStep =
      5;
  }


  if (
    verified
  ) {
    currentStep =
      6;
  }


  /* =======================================================
     EXECUTE CORRECTION
     ======================================================= */

  const executeCorrection =
    () => {
      try {
        setError(
          ""
        );


        executeCaseCorrection(
          selectedCaseId,
          "Demo Execution Agent"
        );

      } catch (
        executionError
      ) {
        setError(
          executionError?.message ||
          L(
            language,
            "Unable to execute the correction.",
            "تعذر تنفيذ التعديل."
          )
        );
      }
    };


  /* =======================================================
     VERIFY CORRECTION

     Synthetic frontend demo verification.

     A successful result closes the case through the
     central case store.

     The case then:
     - active = false
     - closed = true
     - finalStatus = VERIFIED_CLOSED

     Therefore it automatically leaves Active Cases and
     remains available to Reports & Audit.
     ======================================================= */

  const verifyCorrection =
    () => {
      try {
        setError(
          ""
        );


        const confidence =
          Number(
            caseData.aiConfidence ||
            99.9
          );


        verifyCaseCorrection(
          selectedCaseId,
          {
            status:
              "PASSED",

            score:
              100,

            biometricMatchPercent:
              confidence,

            biometricMatch:
              Number(
                (
                  confidence /
                  100
                ).toFixed(
                  6
                )
              ),

            identityMappingValid:
              true,

            originalConflictResolved:
              true,

            secondaryConflict:
              false,

            rollbackRequired:
              false,

            actor:
              "Demo Verification Agent",
          }
        );

      } catch (
        verificationError
      ) {
        setError(
          verificationError?.message ||
          L(
            language,
            "Unable to verify the correction.",
            "تعذر التحقق من التعديل."
          )
        );
      }
    };


  /* =======================================================
     PAGE ACCESS RULE

     The page may be opened before authorization,
     but execution itself remains locked.
     ======================================================= */

  const executionLocked =
    !authorized &&
    !executed &&
    !closed;


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
              : `/cases/${caseData.id}`
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

              <CircleCheckBig
                size={15}
                aria-hidden="true"
              />


              {verified
                ? L(
                    language,
                    "VERIFIED CASE",
                    "حالة تم التحقق منها"
                  )
                : L(
                    language,
                    "CONTROLLED CORRECTION",
                    "التصحيح الخاضع للتحكم"
                  )}

            </div>


            <h1>
              {L(
                language,
                "Correction & Verification",
                "التعديل والتحقق"
              )}
            </h1>


            <p>
              {verified
                ? L(
                    language,

                    "The correction was executed, verification passed and the case has been transferred from Active Cases to Reports & Audit.",

                    "تم تنفيذ التعديل ونجح التحقق، وانتقلت الحالة من الحالات النشطة إلى التقارير والسجل."
                  )
                : executed
                  ? L(
                      language,

                      "The approved correction has been executed. Final verification is required before this case can close.",

                      "تم تنفيذ التعديل المعتمد، ويجب إجراء التحقق النهائي قبل إغلاق الحالة."
                    )
                  : L(
                      language,

                      "Execution is permitted only after Employee and Manager approval. After execution, the new relationship must be verified before closure.",

                      "لا يسمح بالتنفيذ إلا بعد اعتماد الموظف والمدير، وبعد التنفيذ يجب التحقق من الربط الجديد قبل إغلاق الحالة."
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
                dir="ltr"
                style={{
                  color:
                    "#71849c",

                  fontSize:
                    "9px",
                }}
              >
                {biometricId}
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
          verified={
            verified
          }
        />


        {/* ================================================
            CURRENT STATUS
            ================================================ */}

        <section
          style={{
            marginBottom:
              "14px",

            padding:
              "18px",

            borderRadius:
              "15px",

            border:
              verified
                ? "1px solid rgba(89,207,160,0.20)"
                : verificationFailed
                  ? "1px solid rgba(255,80,100,0.18)"
                  : executed
                    ? "1px solid rgba(121,169,255,0.16)"
                    : authorized
                      ? "1px solid rgba(89,207,160,0.15)"
                      : "1px solid rgba(255,189,103,0.16)",

            background:
              verified
                ? "rgba(89,207,160,0.045)"
                : verificationFailed
                  ? "rgba(255,80,100,0.04)"
                  : executed
                    ? "rgba(121,169,255,0.045)"
                    : authorized
                      ? "rgba(89,207,160,0.035)"
                      : "rgba(255,189,103,0.035)",
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
                "14px",

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
                    "44px",

                  height:
                    "44px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  borderRadius:
                    "12px",

                  color:
                    verified
                      ? "#59cfa0"
                      : verificationFailed
                        ? "#ff7c89"
                        : executed
                          ? "#79a9ff"
                          : authorized
                            ? "#59cfa0"
                            : "#ffbd67",

                  background:
                    "rgba(255,255,255,0.025)",
                }}
              >

                {verified ? (
                  <CheckCircle2
                    size={22}
                    aria-hidden="true"
                  />
                ) : verificationFailed ? (
                  <AlertTriangle
                    size={21}
                    aria-hidden="true"
                  />
                ) : executed ? (
                  <RefreshCcw
                    size={21}
                    aria-hidden="true"
                  />
                ) : authorized ? (
                  <Play
                    size={20}
                    aria-hidden="true"
                  />
                ) : (
                  <LockKeyhole
                    size={20}
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
                      verified
                        ? "#59cfa0"
                        : verificationFailed
                          ? "#ff7c89"
                          : executed
                            ? "#79a9ff"
                            : authorized
                              ? "#59cfa0"
                              : "#ffbd67",

                    fontSize:
                      "13px",
                  }}
                >
                  {verified
                    ? L(
                        language,
                        "Correction Verified — Case Closed",
                        "تم التحقق من التعديل — الحالة مغلقة"
                      )
                    : verificationFailed
                      ? L(
                          language,
                          "Verification Failed",
                          "فشل التحقق"
                        )
                      : executed
                        ? L(
                            language,
                            "Correction Executed",
                            "تم تنفيذ التعديل"
                          )
                        : authorized
                          ? L(
                              language,
                              "Authorized for Execution",
                              "مصرح بالتنفيذ"
                            )
                          : L(
                              language,
                              "Execution Locked",
                              "التنفيذ مقفل"
                            )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#8193aa",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.6,
                  }}
                >
                  {verified
                    ? L(
                        language,
                        "The case is no longer part of the active queue.",
                        "الحالة لم تعد ضمن قائمة الحالات النشطة."
                      )
                    : verificationFailed
                      ? L(
                          language,
                          "The case remains active because closure is blocked until verification succeeds.",
                          "تبقى الحالة نشطة لأن الإغلاق محظور حتى نجاح التحقق."
                        )
                      : executed
                        ? L(
                            language,
                            "The approved relationship was changed. Verification is now mandatory.",
                            "تم تغيير الربط المعتمد، والتحقق النهائي أصبح إلزاميًا الآن."
                          )
                        : authorized
                          ? L(
                              language,
                              "Both required human approvals have been recorded.",
                              "تم تسجيل الموافقتين البشريتين المطلوبتين."
                            )
                          : L(
                              language,
                              "Employee and Manager approval must both be complete before execution.",
                              "يجب اكتمال اعتماد الموظف والمدير قبل السماح بالتنفيذ."
                            )}
                </span>

              </div>

            </div>


            {verified && (
              <div
                style={{
                  minWidth:
                    "105px",

                  textAlign:
                    "center",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#6e829a",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "VERIFICATION SCORE",
                    "درجة التحقق"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "3px",

                    color:
                      "#59cfa0",

                    fontSize:
                      "31px",
                  }}
                >
                  {verificationScore}
                </strong>

              </div>
            )}

          </div>

        </section>


        {/* ================================================
            PERSON + AUTHORIZATION
            ================================================ */}

        <section
          className="executionSummaryGrid"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "0.8fr 1.2fr",

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
                display:
                  "grid",

                gap:
                  "8px",

                padding:
                  "17px",
              }}
            >

              <InfoCard
                label={
                  L(
                    language,
                    "Case",
                    "رقم الحالة"
                  )
                }
                value={
                  caseData.id
                }
                dir="ltr"
              />


              <InfoCard
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

            </div>

          </div>


          {/* AUTHORIZATION */}

          <div className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "AUTHORIZATION",
                    "التصريح"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Human Approval Status",
                    "حالة الموافقات البشرية"
                  )}
                </h2>

              </div>


              <ShieldCheck
                size={21}
                aria-hidden="true"
              />

            </div>


            <div
              className="authorizationGrid"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",

                gap:
                  "8px",

                padding:
                  "17px",
              }}
            >

              <InfoCard
                label={
                  L(
                    language,
                    "Employee Approval",
                    "اعتماد الموظف"
                  )
                }
                value={
                  officerApproved
                    ? L(
                        language,
                        "APPROVED",
                        "معتمد"
                      )
                    : L(
                        language,
                        "NOT APPROVED",
                        "غير معتمد"
                      )
                }
                color={
                  officerApproved
                    ? "#59cfa0"
                    : "#ffbd67"
                }
              />


              <InfoCard
                label={
                  L(
                    language,
                    "Manager Approval",
                    "موافقة المدير"
                  )
                }
                value={
                  managerApproved
                    ? L(
                        language,
                        "APPROVED",
                        "معتمد"
                      )
                    : L(
                        language,
                        "NOT APPROVED",
                        "غير معتمد"
                      )
                }
                color={
                  managerApproved
                    ? "#59cfa0"
                    : "#ffbd67"
                }
              />


              <InfoCard
                label={
                  L(
                    language,
                    "Target System",
                    "النظام المستهدف"
                  )
                }
                value={
                  caseData.execution
                    ?.targetSystem ||
                  "BIOMETRIC_SYSTEM"
                }
                color="#79a9ff"
                dir="ltr"
              />


              <InfoCard
                label={
                  L(
                    language,
                    "Target Field",
                    "الحقل المستهدف"
                  )
                }
                value={
                  caseData.execution
                    ?.field ||
                  "linked_master_id"
                }
                color="#79a9ff"
                dir="ltr"
              />

            </div>

          </div>

        </section>


        {/* ================================================
            EXACT CHANGE
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
                {verified
                  ? L(
                      language,
                      "CORRECTION RESULT",
                      "نتيجة التعديل"
                    )
                  : L(
                      language,
                      "AUTHORIZED CHANGE",
                      "التعديل المصرح به"
                    )}
              </div>


              <h2>
                {verified
                  ? L(
                      language,
                      "What changed?",
                      "ما الذي تم تغييره؟"
                    )
                  : L(
                      language,
                      "Before and After",
                      "قبل وبعد"
                    )}
              </h2>

            </div>


            <GitCompareArrows
              size={21}
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
                  "16px",

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
                {verified || executed
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
                    "#e1e9f3",

                  fontSize:
                    "11px",
                }}
              >
                {beforeName}
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
                {beforeReference}
              </span>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#65788f",

                  fontSize:
                    "8px",
                }}
              >
                {biometricId}
              </span>

            </div>


            <ChevronRight
              className="executionMappingArrow"
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
                  "16px",

                borderRadius:
                  "11px",

                border:
                  executed
                    ? "1px solid rgba(89,207,160,0.15)"
                    : "1px dashed rgba(121,169,255,0.14)",

                background:
                  executed
                    ? "rgba(89,207,160,0.04)"
                    : "rgba(121,169,255,0.025)",
              }}
            >

              <span
                style={{
                  display:
                    "block",

                  color:
                    executed
                      ? "#589a82"
                      : "#7198d6",

                  fontSize:
                    "8px",

                  fontWeight:
                    850,
                }}
              >
                {verified || executed
                  ? L(
                      language,
                      "AFTER",
                      "بعد التعديل"
                    )
                  : L(
                      language,
                      "APPROVED TARGET",
                      "الربط المعتمد"
                    )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "9px",

                  color:
                    "#e1e9f3",

                  fontSize:
                    "11px",
                }}
              >
                {afterName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "5px",

                  color:
                    executed
                      ? "#59cfa0"
                      : "#79a9ff",

                  fontSize:
                    "12px",

                  fontWeight:
                    850,
                }}
              >
                {afterReference}
              </span>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "4px",

                  color:
                    "#65788f",

                  fontSize:
                    "8px",
                }}
              >
                {biometricId}
              </span>

            </div>

          </div>


          {/* ==============================================
              EXACT OWNERSHIP CLARITY

              Makes the demo understandable to a manager.
              ============================================== */}

          {executed && (
            <div
              className="ownershipGrid"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "8px",

                margin:
                  "0 17px 17px",
              }}
            >

              <div
                style={{
                  padding:
                    "11px",

                  borderRadius:
                    "9px",

                  border:
                    "1px solid rgba(255,80,100,0.08)",

                  background:
                    "rgba(255,80,100,0.025)",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#a36b74",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Removed from",
                    "تمت إزالته من"
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
                      "10px",
                  }}
                >
                  {beforeReference}
                </strong>

              </div>


              <div
                style={{
                  padding:
                    "11px",

                  borderRadius:
                    "9px",

                  border:
                    "1px solid rgba(89,207,160,0.09)",

                  background:
                    "rgba(89,207,160,0.025)",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#598f7b",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "Assigned to",
                    "تم ربطه بـ"
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
                      "10px",
                  }}
                >
                  {afterReference}
                </strong>

              </div>

            </div>
          )}


          <div
            className="sourceProtectionGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(2,minmax(0,1fr))",

              gap:
                "8px",

              margin:
                "0 17px 17px",
            }}
          >

            <InfoCard
              label={
                L(
                  language,
                  "Master Reference Modified",
                  "تم تعديل المرجع الرئيسي؟"
                )
              }
              value="FALSE"
              color="#59cfa0"
              dir="ltr"
            />


            <InfoCard
              label={
                L(
                  language,
                  "Original Biometric Dataset Modified",
                  "تم تعديل المصدر البيومتري الأصلي؟"
                )
              }
              value="FALSE"
              color="#59cfa0"
              dir="ltr"
            />

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

            <Database
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

              "Only the authorized runtime biometric identity relationship is changed. The Master Reference and original source dataset remain protected.",

              "يتم تغيير علاقة ربط الهوية المصرح بها داخل نسخة التشغيل فقط، بينما يبقى المرجع الرئيسي ومصدر البيانات الأصلي محفوظين بدون تعديل."
            )}

          </div>

        </section>


        {/* ================================================
            ERROR
            ================================================ */}

        {error && (
          <section
            style={{
              marginBottom:
                "14px",

              padding:
                "12px",

              borderRadius:
                "10px",

              color:
                "#ff7c89",

              background:
                "rgba(255,80,100,0.045)",

              border:
                "1px solid rgba(255,80,100,0.12)",

              fontSize:
                "9px",

              lineHeight:
                1.6,
            }}
          >
            <AlertTriangle
              size={14}
              aria-hidden="true"
              style={{
                marginInlineEnd:
                  "6px",

                verticalAlign:
                  "middle",
              }}
            />

            {error}
          </section>
        )}


        {/* ================================================
            LOCKED
            ================================================ */}

        {executionLocked && (
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
                    "EXECUTION LOCK",
                    "قفل التنفيذ"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Execution Not Authorized",
                    "التنفيذ غير مصرح به"
                  )}
                </h2>

              </div>


              <LockKeyhole
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
                    "#8193aa",

                  fontSize:
                    "9.5px",

                  lineHeight:
                    1.65,
                }}
              >
                {L(
                  language,

                  "This correction cannot be executed until Employee approval and Manager approval are both present for the same case.",

                  "لا يمكن تنفيذ هذا التعديل حتى يتم تسجيل اعتماد الموظف وموافقة المدير على نفس الحالة."
                )}
              </p>


              <div
                className="lockedApprovalGrid"
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
                    `/officer-review?case=${caseData.id}`
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

                    borderRadius:
                      "9px",

                    textDecoration:
                      "none",

                    color:
                      officerApproved
                        ? "#59cfa0"
                        : "#79a9ff",

                    background:
                      "rgba(121,169,255,0.035)",

                    border:
                      "1px solid rgba(121,169,255,0.09)",

                    fontSize:
                      "9px",

                    fontWeight:
                      850,
                  }}
                >
                  {officerApproved
                    ? L(
                        language,
                        "Employee Approved",
                        "اعتماد الموظف مكتمل"
                      )
                    : L(
                        language,
                        "Open Employee Review",
                        "فتح تدقيق الموظف"
                      )}
                </Link>


                <Link
                  href={
                    `/manager-approval?case=${caseData.id}`
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

                    borderRadius:
                      "9px",

                    textDecoration:
                      "none",

                    color:
                      managerApproved
                        ? "#59cfa0"
                        : "#ffbd67",

                    background:
                      "rgba(255,189,103,0.035)",

                    border:
                      "1px solid rgba(255,189,103,0.09)",

                    fontSize:
                      "9px",

                    fontWeight:
                      850,
                  }}
                >
                  {managerApproved
                    ? L(
                        language,
                        "Manager Approved",
                        "موافقة المدير مكتملة"
                      )
                    : L(
                        language,
                        "Open Manager Approval",
                        "فتح موافقة المدير"
                      )}
                </Link>

              </div>

            </div>

          </section>
        )}


        {/* ================================================
            EXECUTE
            ================================================ */}

        {authorized &&
          !executed && (
            <section
              className="panel"
              style={{
                marginBottom:
                  "14px",

                border:
                  "1px solid rgba(89,207,160,0.14)",
              }}
            >

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "CONTROLLED EXECUTION",
                      "التنفيذ الخاضع للتحكم"
                    )}
                  </div>


                  <h2>
                    {L(
                      language,
                      "Execute Approved Correction",
                      "تنفيذ التعديل المعتمد"
                    )}
                  </h2>

                </div>


                <Play
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
                  className="integrityInfo"
                  style={{
                    margin:
                      "0 0 13px",
                  }}
                >

                  <ShieldCheck
                    size={20}
                    aria-hidden="true"
                  />


                  <div>

                    <strong>
                      {L(
                        language,
                        "Execution authorization confirmed",
                        "تم تأكيد تصريح التنفيذ"
                      )}
                    </strong>


                    <span>
                      {L(
                        language,

                        `This action will change ${biometricId} from ${beforeReference} to ${afterReference} only.`,

                        `سيتم تغيير ربط السجل ${biometricId} من ${beforeReference} إلى ${afterReference} فقط.`
                      )}
                    </span>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={
                    executeCorrection
                  }
                  style={{
                    width:
                      "100%",

                    minHeight:
                      "46px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid rgba(111,230,180,0.40)",

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

                  <Play
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
                    "Execute Authorized Correction",
                    "تنفيذ التعديل المصرح به"
                  )}

                </button>

              </div>

            </section>
          )}


        {/* ================================================
            VERIFY
            ================================================ */}

        {executed &&
          !verified && (
            <section
              className="panel"
              style={{
                marginBottom:
                  "14px",

                border:
                  verificationFailed
                    ? "1px solid rgba(255,80,100,0.14)"
                    : "1px solid rgba(121,169,255,0.14)",
              }}
            >

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "POST-CORRECTION VERIFICATION",
                      "التحقق بعد التعديل"
                    )}
                  </div>


                  <h2>
                    {verificationFailed
                      ? L(
                          language,
                          "Run Verification Again",
                          "إعادة التحقق"
                        )
                      : L(
                          language,
                          "Verify the New Relationship",
                          "التحقق من الربط الجديد"
                        )}
                  </h2>

                </div>


                <RefreshCcw
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
                  style={{
                    padding:
                      "13px",

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

                    `Execution is complete. ${biometricId} is now associated with ${afterReference}. Verification must confirm that the new identity relationship is valid before closure.`,

                    `اكتمل التنفيذ وأصبح السجل ${biometricId} مرتبطًا بالمرجع ${afterReference}. يجب أن يؤكد التحقق صحة الربط الجديد قبل إغلاق الحالة.`
                  )}
                </div>


                <button
                  type="button"
                  onClick={
                    verifyCorrection
                  }
                  style={{
                    width:
                      "100%",

                    minHeight:
                      "46px",

                    marginTop:
                      "12px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid rgba(121,169,255,0.25)",

                    background:
                      "linear-gradient(90deg,rgba(70,140,255,0.88),rgba(90,165,255,0.88))",

                    color:
                      "#f3f7fc",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "10px",

                    fontWeight:
                      900,
                  }}
                >

                  <RefreshCcw
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
                    "Run Final Verification",
                    "بدء التحقق النهائي"
                  )}

                </button>

              </div>

            </section>
          )}


        {/* ================================================
            VERIFIED RESULT
            ================================================ */}

        {verified && (
          <section
            className="panel"
            style={{
              marginBottom:
                "14px",

              border:
                "1px solid rgba(89,207,160,0.16)",
            }}
          >

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "VERIFICATION RESULT",
                    "نتيجة التحقق"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Verification Passed",
                    "نجح التحقق"
                  )}
                </h2>

              </div>


              <CheckCircle2
                size={23}
                color="#59cfa0"
                aria-hidden="true"
              />

            </div>


            <div
              className="verificationResultGrid"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "120px 1fr",

                gap:
                  "17px",

                alignItems:
                  "center",

                padding:
                  "17px",
              }}
            >

              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "12px",

                  textAlign:
                    "center",

                  border:
                    "1px solid rgba(89,207,160,0.15)",

                  background:
                    "rgba(89,207,160,0.045)",
                }}
              >

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#71849b",

                    fontSize:
                      "8px",
                  }}
                >
                  {L(
                    language,
                    "SCORE",
                    "الدرجة"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "3px",

                    color:
                      "#59cfa0",

                    fontSize:
                      "34px",
                  }}
                >
                  {verificationScore}
                </strong>


                <span
                  style={{
                    color:
                      "#59cfa0",

                    fontSize:
                      "8px",

                    fontWeight:
                      850,
                  }}
                >
                  PASSED
                </span>

              </div>


              <div>

                <ResultRow
                  label={
                    L(
                      language,
                      "Identity Mapping",
                      "ربط الهوية"
                    )
                  }
                  value={
                    identityMappingValid
                      ? L(
                          language,
                          "VALID",
                          "صحيح"
                        )
                      : L(
                          language,
                          "INVALID",
                          "غير صحيح"
                        )
                  }
                  success={
                    identityMappingValid
                  }
                />


                <ResultRow
                  label={
                    L(
                      language,
                      "Biometric Match",
                      "مطابقة السجل البيومتري"
                    )
                  }
                  value={
                    biometricMatchPercent !==
                    null
                      ? `${biometricMatchPercent}%`
                      : "—"
                  }
                  success
                  dir="ltr"
                />


                <ResultRow
                  label={
                    L(
                      language,
                      "Original Conflict Resolved",
                      "تم حل التعارض الأصلي"
                    )
                  }
                  value={
                    conflictResolved
                      ? L(
                          language,
                          "YES",
                          "نعم"
                        )
                      : L(
                          language,
                          "NO",
                          "لا"
                        )
                  }
                  success={
                    conflictResolved
                  }
                />


                <ResultRow
                  label={
                    L(
                      language,
                      "Secondary Conflict",
                      "تعارض ثانوي"
                    )
                  }
                  value={
                    secondaryConflict
                      ? L(
                          language,
                          "YES",
                          "نعم"
                        )
                      : L(
                          language,
                          "NO",
                          "لا"
                        )
                  }
                  success={
                    !secondaryConflict
                  }
                />


                <ResultRow
                  label={
                    L(
                      language,
                      "Final Status",
                      "الحالة النهائية"
                    )
                  }
                  value="VERIFIED_CLOSED"
                  success
                  dir="ltr"
                />

              </div>

            </div>

          </section>
        )}


        {/* ================================================
            AUDIT TIMELINE
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
                  "CASE HISTORY",
                  "سجل الحالة"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Action Timeline",
                  "تسلسل الإجراءات"
                )}
              </h2>

            </div>


            <History
              size={21}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              padding:
                "12px 17px 17px",
            }}
          >

            <AuditEvent
              number="01"
              completed
              title={
                L(
                  language,

                  "AI analyzed the case and prepared the correction recommendation.",

                  "حلل الذكاء الاصطناعي الحالة وجهز توصية التعديل."
                )
              }
            />


            <AuditEvent
              number="02"
              completed={
                officerApproved
              }
              active={
                !officerApproved
              }
              title={
                L(
                  language,

                  "Employee reviewed the evidence and recorded the first human approval.",

                  "راجع الموظف الأدلة وسجل الموافقة البشرية الأولى."
                )
              }
            />


            <AuditEvent
              number="03"
              completed={
                managerApproved
              }
              active={
                officerApproved &&
                !managerApproved
              }
              title={
                L(
                  language,

                  "Manager recorded the second human approval.",

                  "سجل المدير الموافقة البشرية الثانية."
                )
              }
            />


            <AuditEvent
              number="04"
              completed={
                executed
              }
              active={
                authorized &&
                !executed
              }
              title={
                executed
                  ? L(
                      language,

                      `Approved correction executed: ${beforeReference} → ${afterReference}.`,

                      `تم تنفيذ التعديل المعتمد: ${beforeReference} → ${afterReference}.`
                    )
                  : L(
                      language,

                      "Controlled correction waiting for execution.",

                      "التعديل الخاضع للتحكم بانتظار التنفيذ."
                    )
              }
            />


            <AuditEvent
              number="05"
              completed={
                verified
              }
              active={
                executed &&
                !verified
              }
              title={
                verified
                  ? L(
                      language,

                      "Verification passed and the case was closed.",

                      "نجح التحقق وتم إغلاق الحالة."
                    )
                  : L(
                      language,

                      "Post-correction verification required.",

                      "التحقق بعد التعديل مطلوب."
                    )
              }
            />

          </div>

        </section>


        {/* ================================================
            FINAL SUCCESS
            ================================================ */}

        {verified && (
          <section
            style={{
              marginBottom:
                "14px",

              padding:
                "18px",

              borderRadius:
                "15px",

              border:
                "1px solid rgba(89,207,160,0.18)",

              background:
                "rgba(89,207,160,0.04)",
            }}
          >

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "flex-start",

                gap:
                  "10px",
              }}
            >

              <CheckCircle2
                size={23}
                color="#59cfa0"
                aria-hidden="true"
              />


              <div>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#59cfa0",

                    fontSize:
                      "12px",
                  }}
                >
                  {L(
                    language,
                    "Identity conflict resolved",
                    "تم حل مشكلة ربط الهوية"
                  )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "6px",

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

                    `${biometricId} was removed from ${beforeReference} and assigned to ${afterReference}. Verification passed and this case has been removed from Active Cases.`,

                    `تمت إزالة السجل ${biometricId} من المرجع ${beforeReference} وربطه بالمرجع ${afterReference}. نجح التحقق وتمت إزالة الحالة من الحالات النشطة.`
                  )}
                </span>

              </div>

            </div>


            <div
              className="finalButtons"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "8px",

                marginTop:
                  "14px",
              }}
            >

              <Link
                href={
                  `/reports-audit?case=${caseData.id}`
                }
                style={{
                  minHeight:
                    "42px",

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
                    "#071c17",

                  background:
                    "linear-gradient(90deg,#4bc58f,#68d9ab)",

                  border:
                    "1px solid rgba(111,230,180,0.40)",

                  fontSize:
                    "9.5px",

                  fontWeight:
                    900,
                }}
              >

                <FileCheck2
                  size={14}
                  aria-hidden="true"
                />


                {L(
                  language,
                  "Open Reports & Audit",
                  "فتح التقارير والسجل"
                )}


                <ChevronRight
                  size={14}
                  style={
                    arrowStyle
                  }
                  aria-hidden="true"
                />

              </Link>


              <Link
                href="/cases"
                style={{
                  minHeight:
                    "42px",

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
                    "9.5px",

                  fontWeight:
                    850,
                }}
              >

                {L(
                  language,
                  "Return to Active Cases",
                  "العودة إلى الحالات النشطة"
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
        )}


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
                "Verification controls case closure",
                "التحقق هو الذي يسمح بإغلاق الحالة"
              )}
            </strong>


            <span>
              {L(
                language,

                "Execution alone never closes the case. The case moves to Reports & Audit only after verification succeeds and the final status becomes VERIFIED_CLOSED.",

                "تنفيذ التعديل وحده لا يغلق الحالة. تنتقل الحالة إلى التقارير والسجل فقط بعد نجاح التحقق وتحول حالتها النهائية إلى VERIFIED_CLOSED."
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

              "AI Biometric Reconciliation Platform · Correction & Verification",

              "منصة المطابقة البيومترية بالذكاء الاصطناعي · التعديل والتحقق"
            )}
          </span>


          <div>

            {verified ? (
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

            .executionSummaryGrid {
              grid-template-columns:
                1fr
                !important;
            }

          }


          @media (
            max-width: 760px
          ) {

            .executionWorkflow {
              overflow-x:
                auto;
            }


            .executionWorkflowGrid {
              min-width:
                520px;
            }


            .mappingGrid {
              grid-template-columns:
                1fr
                !important;
            }


            :global(.executionMappingArrow) {
              margin:
                0 auto;

              transform:
                rotate(90deg)
                !important;
            }


            .verificationResultGrid {
              grid-template-columns:
                1fr
                !important;
            }


            .verificationResultGrid
            > div:first-child {
              max-width:
                150px;

              width:
                100%;

              margin:
                0 auto;
            }

          }


          @media (
            max-width: 520px
          ) {

            .authorizationGrid,
            .sourceProtectionGrid,
            .ownershipGrid,
            .lockedApprovalGrid,
            .finalButtons {
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