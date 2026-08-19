"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  BadgeCheck,
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
   DEMO CASE
   ========================================================= */

const DEMO_CASE = {
  id:
    VERIFIED_DEMO_CASE.id,

  person:
    VERIFIED_DEMO_CASE.person,

  biometricId:
    VERIFIED_DEMO_CASE.biometricId,

  before:
    VERIFIED_DEMO_CASE.execution.before,

  after:
    VERIFIED_DEMO_CASE.execution.after,

  targetSystem:
    VERIFIED_DEMO_CASE.execution.targetSystem,

  targetRecord:
    VERIFIED_DEMO_CASE.execution.targetRecord,

  field:
    VERIFIED_DEMO_CASE.execution.field,

  verificationScore:
    VERIFIED_DEMO_CASE.verification.score,

  biometricMatch:
    VERIFIED_DEMO_CASE.verification.biometricMatch,

  biometricMatchPercent:
    VERIFIED_DEMO_CASE.verification.biometricMatchPercent,

  identityMappingValid:
    VERIFIED_DEMO_CASE.verification.identityMappingValid,

  conflictResolved:
    VERIFIED_DEMO_CASE.verification.originalConflictResolved,

  secondaryConflict:
    VERIFIED_DEMO_CASE.verification.secondaryConflict,
};


/* =========================================================
   WORKFLOW STEPS
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
   WORKFLOW STEPPER
   ========================================================= */

function WorkflowStepper({
  language,
  completed,
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
          completed
            ? "1px solid rgba(89,207,160,0.20)"
            : "1px solid rgba(121,169,255,0.12)",

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

            const earlier =
              step.number <
              5;

            const finalStep =
              step.number ===
              5;


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
                      finalStep
                        ? completed
                          ? "2px solid #59cfa0"
                          : "2px solid #79a9ff"
                        : "1px solid rgba(89,207,160,0.45)",

                    color:
                      finalStep
                        ? completed
                          ? "#59cfa0"
                          : "#79a9ff"
                        : "#59cfa0",

                    background:
                      finalStep
                        ? completed
                          ? "rgba(89,207,160,0.10)"
                          : "rgba(121,169,255,0.09)"
                        : "rgba(89,207,160,0.055)",

                    boxShadow:
                      finalStep
                        ? completed
                          ? "0 0 20px rgba(89,207,160,0.13)"
                          : "0 0 20px rgba(121,169,255,0.10)"
                        : "none",

                    fontSize:
                      "11px",

                    fontWeight:
                      850,
                  }}
                >
                  {earlier ||
                  completed ? (
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
                      finalStep
                        ? completed
                          ? "#59cfa0"
                          : "#79a9ff"
                        : "#bcd8cd",

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
    </section>
  );
}


/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({
  label,
  value,
  color = "#dbe6f2",
  dir,
}) {
  return (
    <div
      style={{
        padding:
          "13px",

        borderRadius:
          "11px",

        border:
          "1px solid rgba(255,255,255,0.055)",

        background:
          "rgba(255,255,255,0.022)",
      }}
    >
      <span
        style={{
          display:
            "block",

          color:
            "#687b93",

          fontSize:
            "9px",

          marginBottom:
            "6px",
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

          color,

          fontSize:
            "12px",

          lineHeight:
            1.5,
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
          "16px",

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
          color:
            success
              ? "#59cfa0"
              : "#d3deea",

          fontSize:
            "10px",

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
  active,
}) {
  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "34px 1fr",

        gap:
          "11px",

        alignItems:
          "center",

        padding:
          "11px 0",
      }}
    >
      <div
        style={{
          width:
            "30px",

          height:
            "30px",

          display:
            "grid",

          placeItems:
            "center",

          borderRadius:
            "50%",

          color:
            active
              ? "#59cfa0"
              : "#60748d",

          background:
            active
              ? "rgba(89,207,160,0.08)"
              : "rgba(255,255,255,0.025)",

          border:
            active
              ? "1px solid rgba(89,207,160,0.20)"
              : "1px solid rgba(255,255,255,0.05)",

          fontSize:
            "9px",

          fontWeight:
            850,
        }}
      >
        {active ? (
          <CheckCircle2
            size={15}
            aria-hidden="true"
          />
        ) : (
          number
        )}
      </div>


      <span
        style={{
          color:
            active
              ? "#cbd9e6"
              : "#63768e",

          fontSize:
            "10px",

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
   PAGE
   ========================================================= */

export default function CorrectionsVerificationPage() {
  const {
    language,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const [
    stage,
    setStage,
  ] = useState(
    "AUTHORIZED"
  );


  const personName =
    DEMO_CASE.person[
      language
    ] ||
    DEMO_CASE.person.en;


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  const executed =
    stage ===
      "EXECUTED"
    ||
    stage ===
      "VERIFIED";


  const verified =
    stage ===
    "VERIFIED";


  const executeCorrection =
    () => {
      setStage(
        "EXECUTED"
      );
    };


  const verifyCorrection =
    () => {
      setStage(
        "VERIFIED"
      );
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

              <CircleCheckBig
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "CASE REMEDIATION WORKFLOW",
                "مسار معالجة الحالة"
              )}

            </div>


            <h1>
              {L(
                language,
                "Execution & Verification",
                "التنفيذ والتحقق"
              )}
            </h1>


            <p>
              {verified
                ? L(
                    language,
                    "The approved correction has been executed and post-correction verification confirmed that the identity relationship is now valid.",
                    "تم تنفيذ التعديل المعتمد، وأكد التحقق بعد التنفيذ أن علاقة الهوية أصبحت صحيحة وأن التعارض تم حله."
                  )
                : L(
                    language,
                    "Both human approvals are complete. Execute the authorized biometric correction, then verify the result before closing the case.",
                    "اكتمل الاعتمادان البشريان. نفذ التصحيح البيومتري المصرح به، ثم تحقق من النتيجة قبل إغلاق الحالة."
                  )}
            </p>


            <div
              dir="ltr"
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap:
                  "7px",

                marginTop:
                  "12px",

                padding:
                  "8px 11px",

                borderRadius:
                  "9px",

                border:
                  "1px solid rgba(121,169,255,0.15)",

                background:
                  "rgba(121,169,255,0.05)",

                color:
                  "#91a9c6",

                fontSize:
                  "10px",

                fontWeight:
                  750,
              }}
            >
              <FileCheck2
                size={14}
                aria-hidden="true"
              />

              {
                DEMO_CASE.id
              }
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
          completed={
            verified
          }
        />


        {/* ================================================
            CURRENT STATUS HERO
            ================================================ */}

        <section
          style={{
            marginBottom:
              "18px",

            padding:
              "22px",

            borderRadius:
              "18px",

            border:
              verified
                ? "1px solid rgba(89,207,160,0.34)"
                : executed
                  ? "1px solid rgba(121,169,255,0.22)"
                  : "1px solid rgba(255,189,103,0.22)",

            background:
              verified
                ? "linear-gradient(135deg, rgba(11,51,49,0.72), rgba(8,26,45,0.94))"
                : executed
                  ? "linear-gradient(135deg, rgba(15,39,65,0.72), rgba(8,26,45,0.94))"
                  : "linear-gradient(135deg, rgba(50,39,22,0.38), rgba(8,26,45,0.94))",
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
                "18px",

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
                  "13px",
              }}
            >

              <div
                style={{
                  width:
                    "50px",

                  height:
                    "50px",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  borderRadius:
                    "15px",

                  color:
                    verified
                      ? "#59cfa0"
                      : executed
                        ? "#79a9ff"
                        : "#ffbd67",

                  background:
                    verified
                      ? "rgba(89,207,160,0.08)"
                      : executed
                        ? "rgba(121,169,255,0.08)"
                        : "rgba(255,189,103,0.07)",

                  border:
                    verified
                      ? "1px solid rgba(89,207,160,0.20)"
                      : executed
                        ? "1px solid rgba(121,169,255,0.18)"
                        : "1px solid rgba(255,189,103,0.18)",
                }}
              >
                {verified ? (
                  <CheckCircle2
                    size={27}
                    aria-hidden="true"
                  />
                ) : executed ? (
                  <RefreshCcw
                    size={25}
                    aria-hidden="true"
                  />
                ) : (
                  <LockKeyhole
                    size={24}
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
                        : executed
                          ? "#79a9ff"
                          : "#ffbd67",

                    fontSize:
                      "17px",
                  }}
                >
                  {verified
                    ? L(
                        language,
                        "Correction Successfully Verified",
                        "تم التعديل والتحقق بنجاح"
                      )
                    : executed
                      ? L(
                          language,
                          "Correction Executed",
                          "تم تنفيذ التعديل"
                        )
                      : L(
                          language,
                          "Authorized for Execution",
                          "مصرح بالتنفيذ"
                        )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "6px",

                    color:
                      "#8194ab",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.6,
                  }}
                >
                  {verified
                    ? L(
                        language,
                        "Verification passed and the case is now closed.",
                        "نجح التحقق وتم إغلاق الحالة."
                      )
                    : executed
                      ? L(
                          language,
                          "The approved mapping change was applied. Final verification is still required.",
                          "تم تطبيق تغيير الربط المعتمد، وما زال التحقق النهائي مطلوبًا."
                        )
                      : L(
                          language,
                          "Officer and Manager approvals are complete. No correction has been executed yet.",
                          "اكتمل اعتماد الموظف والمدير، ولم يتم تنفيذ التعديل حتى الآن."
                        )}
                </span>

              </div>

            </div>


            {verified && (
              <div
                style={{
                  minWidth:
                    "125px",

                  paddingInlineStart:
                    "20px",

                  borderInlineStart:
                    "1px solid rgba(89,207,160,0.16)",
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
                    "VERIFICATION SCORE",
                    "درجة التحقق"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "4px",

                    color:
                      "#59cfa0",

                    fontSize:
                      "34px",
                  }}
                >
                  {
                    DEMO_CASE.verificationScore
                  }
                </strong>


                <span
                  dir="ltr"
                  style={{
                    color:
                      "#59cfa0",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  VERIFIED_CLOSED
                </span>
              </div>
            )}

          </div>

        </section>


        {/* ================================================
            AUTHORIZATION SUMMARY
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "18px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "EXECUTION AUTHORIZATION",
                  "تصريح التنفيذ"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Approved Correction Package",
                  "حزمة التصحيح المعتمدة"
                )}
              </h2>

            </div>


            <ShieldCheck
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            className="authorizationGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",

              gap:
                "10px",

              padding:
                "18px",
            }}
          >

            <InfoCard
              label={
                L(
                  language,
                  "Officer Approval",
                  "اعتماد موظف المراجعة"
                )
              }
              value={
                L(
                  language,
                  "APPROVED",
                  "معتمد"
                )
              }
              color="#59cfa0"
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
                L(
                  language,
                  "APPROVED",
                  "معتمد"
                )
              }
              color="#59cfa0"
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
                DEMO_CASE.targetSystem
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
                DEMO_CASE.field
              }
              color="#79a9ff"
              dir="ltr"
            />

          </div>

        </section>


        {/* ================================================
            BEFORE / AFTER EXECUTION
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
              "1px solid rgba(121,169,255,0.14)",

            background:
              "linear-gradient(135deg, rgba(11,31,54,0.92), rgba(8,25,44,0.92))",
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

              marginBottom:
                "17px",
            }}
          >
            <GitCompareArrows
              size={21}
              color="#79a9ff"
              aria-hidden="true"
            />

            <strong
              style={{
                color:
                  "#e3edf8",

                fontSize:
                  "14px",
              }}
            >
              {L(
                language,
                "Correction Result",
                "نتيجة التعديل"
              )}
            </strong>
          </div>


          <div
            className="mappingGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              gap:
                "15px",

              alignItems:
                "center",
            }}
          >

            {/* BEFORE */}

            <div
              style={{
                padding:
                  "18px",

                borderRadius:
                  "13px",

                border:
                  "1px solid rgba(255,90,110,0.16)",

                background:
                  "rgba(255,90,110,0.035)",
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
                  "BEFORE EXECUTION",
                  "قبل التنفيذ"
                )}
              </span>


              <div
                dir="ltr"
                style={{
                  marginTop:
                    "10px",

                  color:
                    "#dce6f1",

                  fontSize:
                    "12px",

                  fontWeight:
                    850,
                }}
              >
                {
                  DEMO_CASE.biometricId
                }

                {"  ←  "}

                <span
                  style={{
                    color:
                      "#ff7685",
                  }}
                >
                  {
                    DEMO_CASE.before
                  }
                </span>
              </div>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "8px",

                  color:
                    "#805f67",

                  fontSize:
                    "8px",
                }}
              >
                {L(
                  language,
                  "Incorrect mapping detected",
                  "الربط غير الصحيح المكتشف"
                )}
              </span>
            </div>


            <ChevronRight
              size={23}
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
                  "18px",

                borderRadius:
                  "13px",

                border:
                  executed
                    ? "1px solid rgba(89,207,160,0.24)"
                    : "1px dashed rgba(121,169,255,0.17)",

                background:
                  executed
                    ? "rgba(89,207,160,0.045)"
                    : "rgba(121,169,255,0.025)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  color:
                    executed
                      ? "#59cfa0"
                      : "#79a9ff",

                  fontSize:
                    "9px",

                  fontWeight:
                    850,
                }}
              >
                {executed
                  ? L(
                      language,
                      "AFTER EXECUTION",
                      "بعد التنفيذ"
                    )
                  : L(
                      language,
                      "APPROVED TARGET",
                      "النتيجة المعتمدة"
                    )}
              </span>


              <div
                dir="ltr"
                style={{
                  marginTop:
                    "10px",

                  color:
                    "#dce6f1",

                  fontSize:
                    "12px",

                  fontWeight:
                    850,
                }}
              >
                {
                  DEMO_CASE.biometricId
                }

                {"  ←  "}

                <span
                  style={{
                    color:
                      executed
                        ? "#59cfa0"
                        : "#79a9ff",
                  }}
                >
                  {
                    DEMO_CASE.after
                  }
                </span>
              </div>


              <span
                style={{
                  display:
                    "block",

                  marginTop:
                    "8px",

                  color:
                    executed
                      ? "#587e70"
                      : "#5e7594",

                  fontSize:
                    "8px",
                }}
              >
                {executed
                  ? L(
                      language,
                      "Approved mapping applied",
                      "تم تطبيق الربط المعتمد"
                    )
                  : L(
                      language,
                      "Not executed yet",
                      "لم يتم التنفيذ بعد"
                    )}
              </span>
            </div>

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(2,minmax(0,1fr))",

              gap:
                "10px",

              marginTop:
                "14px",
            }}
          >
            <InfoCard
              label={
                L(
                  language,
                  "Master Reference Modified",
                  "هل تم تعديل المرجع الرئيسي؟"
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
                  "هل تم تعديل البيانات البيومترية الأصلية؟"
                )
              }
              value="FALSE"
              color="#59cfa0"
              dir="ltr"
            />
          </div>


          <div
            style={{
              marginTop:
                "12px",

              padding:
                "11px 13px",

              borderRadius:
                "10px",

              color:
                "#8194ab",

              background:
                "rgba(255,255,255,0.018)",

              border:
                "1px solid rgba(255,255,255,0.04)",

              fontSize:
                "9px",

              lineHeight:
                1.65,
            }}
          >
            <Database
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
              "Only the approved linked_master_id is changed in the synthetic runtime biometric dataset. The authoritative Master Reference remains read-only.",
              "يتم تغيير الحقل linked_master_id المعتمد فقط داخل نسخة التشغيل الاصطناعية من النظام البيومتري، بينما يبقى المرجع الرئيسي للقراءة فقط."
            )}
          </div>

        </section>


        {/* ================================================
            EXECUTION ACTION
            ================================================ */}

        {stage ===
          "AUTHORIZED" && (
          <section
            className="panel"
            style={{
              marginBottom:
                "18px",
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
                className="integrityInfo"
                style={{
                  margin:
                    "0 0 14px",
                }}
              >
                <LockKeyhole
                  size={22}
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
                      "Officer approval and Manager approval are both present. The Execution Agent is permitted to apply only the approved mapping change.",
                      "اعتماد موظف المراجعة وموافقة المدير موجودان، ويُسمح لوكيل التنفيذ بتطبيق تغيير الربط المعتمد فقط."
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
                    "48px",

                  borderRadius:
                    "12px",

                  border:
                    "1px solid rgba(111,230,180,0.42)",

                  background:
                    "linear-gradient(90deg,#4bc58f,#68d9ab)",

                  color:
                    "#071c17",

                  fontFamily:
                    "inherit",

                  fontSize:
                    "11px",

                  fontWeight:
                    900,

                  cursor:
                    "pointer",
                }}
              >
                <Play
                  size={16}
                  aria-hidden="true"
                  style={{
                    marginInlineEnd:
                      "7px",

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
            EXECUTED — WAITING FOR VERIFY
            ================================================ */}

        {stage ===
          "EXECUTED" && (
          <section
            className="panel"
            style={{
              marginBottom:
                "18px",
            }}
          >

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "EXECUTION COMPLETE",
                    "اكتمل التنفيذ"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Run Post-Correction Verification",
                    "بدء التحقق بعد التعديل"
                  )}
                </h2>

              </div>


              <RefreshCcw
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
                  marginBottom:
                    "14px",

                  padding:
                    "16px",

                  borderRadius:
                    "12px",

                  border:
                    "1px solid rgba(89,207,160,0.18)",

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
                    size={20}
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
                      "Runtime correction completed",
                      "تم تنفيذ التعديل على نسخة التشغيل"
                    )}
                  </strong>
                </div>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "8px",

                    color:
                      "#8194ab",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.65,
                  }}
                >
                  {L(
                    language,
                    `The biometric record is now linked to ${DEMO_CASE.after}. The case cannot be closed until verification confirms the new relationship.`,
                    `أصبح السجل البيومتري مرتبطًا الآن بالمرجع ${DEMO_CASE.after}. ولا يمكن إغلاق الحالة قبل أن يؤكد التحقق سلامة الربط الجديد.`
                  )}
                </span>

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
                    "48px",

                  borderRadius:
                    "12px",

                  border:
                    "1px solid rgba(121,169,255,0.28)",

                  background:
                    "linear-gradient(90deg,rgba(70,140,255,0.88),rgba(90,165,255,0.88))",

                  color:
                    "#f4f8fd",

                  fontFamily:
                    "inherit",

                  fontSize:
                    "11px",

                  fontWeight:
                    900,

                  cursor:
                    "pointer",
                }}
              >
                <RefreshCcw
                  size={16}
                  aria-hidden="true"
                  style={{
                    marginInlineEnd:
                      "7px",

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
                "18px",

              border:
                "1px solid rgba(89,207,160,0.20)",
            }}
          >

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "POST-CORRECTION VERIFICATION",
                    "التحقق بعد التصحيح"
                  )}
                </div>


                <h2>
                  {L(
                    language,
                    "Verification Passed",
                    "تم اجتياز التحقق"
                  )}
                </h2>

              </div>


              <ShieldCheck
                size={24}
                color="#59cfa0"
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
                  display:
                    "grid",

                  gridTemplateColumns:
                    "130px 1fr",

                  gap:
                    "18px",

                  alignItems:
                    "center",
                }}
              >

                <div
                  style={{
                    padding:
                      "18px",

                    borderRadius:
                      "14px",

                    textAlign:
                      "center",

                    border:
                      "1px solid rgba(89,207,160,0.20)",

                    background:
                      "rgba(89,207,160,0.055)",
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

                      color:
                        "#59cfa0",

                      fontSize:
                        "35px",

                      marginTop:
                        "4px",
                    }}
                  >
                    {
                      DEMO_CASE.verificationScore
                    }
                  </strong>


                  <span
                    style={{
                      color:
                        "#59cfa0",

                      fontSize:
                        "9px",

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
                        "مطابقة الهوية"
                      )
                    }
                    value={
                      L(
                        language,
                        "VALID",
                        "ناجحة"
                      )
                    }
                    success
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
                      `${DEMO_CASE.biometricMatchPercent}%`
                    }
                    success
                    dir="ltr"
                  />


                  <ResultRow
                    label={
                      L(
                        language,
                        "Original Conflict Resolved",
                        "تم حل التعارض"
                      )
                    }
                    value={
                      L(
                        language,
                        "YES",
                        "نعم"
                      )
                    }
                    success
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
                      L(
                        language,
                        "NO",
                        "لا"
                      )
                    }
                    success
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
              "18px",
          }}
        >

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "AUDIT TRACE",
                  "سجل الإجراءات"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Case Action Timeline",
                  "التسلسل الكامل للإجراءات"
                )}
              </h2>

            </div>


            <History
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              padding:
                "14px 18px 18px",
            }}
          >

            <AuditEvent
              number="01"
              active
              title={
                L(
                  language,
                  "AI investigation completed and correction recommendation prepared.",
                  "تم إنشاء التحقيق بالذكاء الاصطناعي وتجهيز توصية التصحيح."
                )
              }
            />


            <AuditEvent
              number="02"
              active
              title={
                L(
                  language,
                  "Monitoring Officer reviewed the evidence and approved the recommendation.",
                  "راجع موظف المراجعة الأدلة واعتمد التوصية."
                )
              }
            />


            <AuditEvent
              number="03"
              active
              title={
                L(
                  language,
                  "Manager provided the second human authorization.",
                  "أصدر المدير الموافقة البشرية الثانية."
                )
              }
            />


            <AuditEvent
              number="04"
              active={
                executed
              }
              title={
                L(
                  language,
                  `Approved correction executed: ${DEMO_CASE.before} → ${DEMO_CASE.after}.`,
                  `تم تنفيذ التعديل المعتمد: ${DEMO_CASE.before} ← ${DEMO_CASE.after}.`
                )
              }
            />


            <AuditEvent
              number="05"
              active={
                verified
              }
              title={
                L(
                  language,
                  "Post-correction verification passed and the case was closed.",
                  "تم اجتياز التحقق بعد التصحيح وإغلاق الحالة."
                )
              }
            />

          </div>

        </section>


        {/* ================================================
            FINAL SUCCESS ACTIONS
            ================================================ */}

        {verified && (
          <section
            style={{
              marginBottom:
                "18px",

              padding:
                "20px",

              borderRadius:
                "18px",

              border:
                "1px solid rgba(89,207,160,0.28)",

              background:
                "linear-gradient(135deg, rgba(11,50,47,0.66), rgba(8,26,45,0.92))",
            }}
          >

            <div
              style={{
                display:
                  "flex",

                gap:
                  "11px",

                alignItems:
                  "flex-start",
              }}
            >

              <CheckCircle2
                size={26}
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
                      "14px",
                  }}
                >
                  {L(
                    language,
                    "Identity conflict resolved",
                    "تم حل مشكلة التداخل"
                  )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#8194ab",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.7,
                  }}
                >
                  {L(
                    language,
                    `${DEMO_CASE.biometricId} was moved from ${DEMO_CASE.before} to ${DEMO_CASE.after}. Verification passed with a score of ${DEMO_CASE.verificationScore}, the identity mapping is valid and no secondary conflict remains.`,
                    `تم نقل السجل ${DEMO_CASE.biometricId} من المرجع ${DEMO_CASE.before} إلى المرجع ${DEMO_CASE.after}. ونجح التحقق بدرجة ${DEMO_CASE.verificationScore}، وأصبح ربط الهوية صحيحًا ولم يتبق أي تعارض ثانوي.`
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
                  "10px",

                marginTop:
                  "16px",
              }}
            >

              <Link
                href="/reports-audit"
                style={{
                  minHeight:
                    "45px",

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

                  color:
                    "#071c17",

                  background:
                    "linear-gradient(90deg,#4bc58f,#68d9ab)",

                  border:
                    "1px solid rgba(111,230,180,0.42)",

                  fontSize:
                    "10px",

                  fontWeight:
                    900,
                }}
              >
                <FileCheck2
                  size={15}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "View Final Report",
                  "عرض التقرير النهائي"
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
                    "45px",

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

                  color:
                    "#79a9ff",

                  background:
                    "rgba(121,169,255,0.04)",

                  border:
                    "1px solid rgba(121,169,255,0.17)",

                  fontSize:
                    "10px",

                  fontWeight:
                    850,
                }}
              >
                {L(
                  language,
                  "Return to Cases",
                  "العودة إلى الحالات"
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
            CONTROL NOTE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 16px",

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
                "Controlled correction with mandatory verification",
                "تصحيح خاضع للتحكم مع تحقق إلزامي"
              )}
            </strong>


            <span>
              {L(
                language,
                "The demonstration preserves the Master Reference and original biometric source dataset. Only the authorized runtime mapping is changed, and case closure remains blocked until verification succeeds.",
                "يحافظ العرض التجريبي على المرجع الرئيسي ومصدر البيانات البيومترية الأصلي. يتم تغيير ربط التشغيل المصرح به فقط، ويبقى إغلاق الحالة محظورًا حتى نجاح التحقق."
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
              "AI Biometric Reconciliation Platform · Execution & Verification",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · التنفيذ والتحقق"
            )}
          </span>


          <div>

            <Activity
              size={15}
              aria-hidden="true"
            />

            {verified
              ? L(
                  language,
                  "Case Verified & Closed",
                  "تم التحقق من الحالة وإغلاقها"
                )
              : L(
                  language,
                  "Controlled Workflow Active",
                  "مسار التنفيذ الخاضع للتحكم نشط"
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

            .authorizationGrid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .mappingGrid {
              grid-template-columns: 1fr !important;
            }

            .mappingGrid > svg {
              margin: 0 auto;
              transform: rotate(90deg) !important;
            }
          }

          @media (max-width: 520px) {
            .authorizationGrid,
            .finalButtons {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

      </main>

    </div>
  );
}