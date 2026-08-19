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
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
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
   PRIMARY DEMO CASE
   ========================================================= */

const DEMO_CASE = {
  id:
    VERIFIED_DEMO_CASE.id ||
    "CASE-2026-00001",

  person:
    VERIFIED_DEMO_CASE.person || {
      en:
        "Salem Mohammed",

      ar:
        "سالم محمد",
    },

  biometricId:
    VERIFIED_DEMO_CASE.biometricId ||
    VERIFIED_DEMO_CASE.primaryBiometricId ||
    "BIO-000166",

  currentMasterId:
    VERIFIED_DEMO_CASE.currentMasterId ||
    VERIFIED_DEMO_CASE.currentIdentity ||
    "REF-002711",

  canonicalMasterId:
    VERIFIED_DEMO_CASE.canonicalMasterId ||
    VERIFIED_DEMO_CASE.proposedIdentity ||
    "REF-001009",

  caseType:
    VERIFIED_DEMO_CASE.caseType ||
    "HARM_IMPACT",

  confidence:
    VERIFIED_DEMO_CASE.aiConfidence ||
    99.99,

  risk:
    VERIFIED_DEMO_CASE.riskScore ||
    94.99,

  harm:
    VERIFIED_DEMO_CASE.harmScore ||
    VERIFIED_DEMO_CASE.harmImpactScore ||
    97.5,

  protectivePriority:
    VERIFIED_DEMO_CASE.protectivePriority ||
    VERIFIED_DEMO_CASE.protectivePriorityScore ||
    98.0,
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
   INFO VALUE
   ========================================================= */

function InfoValue({
  label,
  value,
  color = "#dce7f3",
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

          marginBottom:
            "6px",

          color:
            "#687b93",

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
          display:
            "block",

          color,

          fontSize:
            "12px",

          lineHeight:
            1.45,
        }}
      >
        {value}
      </strong>
    </div>
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
              step.number <
              2;

            const active =
              step.number ===
              2;


            return (
              <div
                key={
                  step.number
                }
                style={{
                  position:
                    "relative",

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
                      active
                        ? "2px solid #59cfa0"
                        : completed
                          ? "1px solid rgba(89,207,160,0.5)"
                          : "1px solid rgba(121,169,255,0.25)",

                    color:
                      active ||
                      completed
                        ? "#59cfa0"
                        : "#8497ae",

                    background:
                      active
                        ? "rgba(89,207,160,0.12)"
                        : completed
                          ? "rgba(89,207,160,0.06)"
                          : "rgba(121,169,255,0.04)",

                    boxShadow:
                      active
                        ? "0 0 20px rgba(89,207,160,0.13)"
                        : "none",

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
                      active
                        ? "#59cfa0"
                        : "#c3d0df",

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
   PAGE
   ========================================================= */

export default function OfficerReviewPage() {
  const {
    language,
  } = useLanguage();


  const isArabic =
    language ===
    "ar";


  const personName =
    DEMO_CASE.person[
      language
    ] ||
    DEMO_CASE.person.en;


  const [
    comments,
    setComments,
  ] = useState(
    L(
      language,
      "Evidence reviewed. The proposed correction is supported and can be submitted for manager approval.",
      "تمت مراجعة الأدلة واعتماد التوصية المقترحة، ويمكن رفع الحالة إلى المدير للموافقة."
    )
  );


  const [
    decision,
    setDecision,
  ] = useState(
    "REVIEWING"
  );


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  const approveCase =
    () => {
      setDecision(
        "APPROVED"
      );
    };


  const requestInvestigation =
    () => {
      setDecision(
        "FURTHER_INVESTIGATION"
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

              <BadgeCheck
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
                "Officer Review",
                "تدقيق موظف المراجعة"
              )}
            </h1>


            <p>
              {L(
                language,
                "Review the identity conflict, examine the AI evidence and proposed correction, then decide whether the case can proceed to manager approval.",
                "راجع مشكلة التداخل والأدلة التي حللها الذكاء الاصطناعي والتعديل المقترح، ثم قرر ما إذا كانت الحالة جاهزة للرفع إلى المدير."
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
        />


        {/* ================================================
            CASE SUMMARY
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
              "1px solid rgba(89,207,160,0.32)",

            background:
              "linear-gradient(135deg, rgba(13,48,55,0.62), rgba(8,26,45,0.92))",
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

                  display:
                    "grid",

                  placeItems:
                    "center",

                  borderRadius:
                    "14px",

                  color:
                    "#59cfa0",

                  background:
                    "rgba(89,207,160,0.07)",

                  border:
                    "1px solid rgba(89,207,160,0.18)",
                }}
              >
                <UserCheck
                  size={23}
                  aria-hidden="true"
                />
              </div>


              <div>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#e6eef8",

                    fontSize:
                      "16px",
                  }}
                >
                  {personName}
                </strong>


                <span
                  style={{
                    display:
                      "inline-flex",

                    alignItems:
                      "center",

                    gap:
                      "5px",

                    marginTop:
                      "7px",

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
                  <Activity
                    size={11}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Officer Review in Progress",
                    "قيد تدقيق الموظف"
                  )}
                </span>

              </div>

            </div>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "6px",

                padding:
                  "7px 10px",

                borderRadius:
                  "9px",

                color:
                  "#ff7685",

                background:
                  "rgba(255,90,110,0.07)",

                border:
                  "1px solid rgba(255,90,110,0.18)",

                fontSize:
                  "9px",

                fontWeight:
                  800,
              }}
            >
              <AlertTriangle
                size={14}
                aria-hidden="true"
              />

              {L(
                language,
                "URGENT",
                "فوري"
              )}
            </div>

          </div>


          <div
            className="summaryGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(5,minmax(0,1fr))",

              gap:
                "9px",

              marginTop:
                "18px",
            }}
          >

            <InfoValue
              label={
                L(
                  language,
                  "Problem Type",
                  "نوع المشكلة"
                )
              }
              value={
                L(
                  language,
                  "Possible Wrong-Person Impact",
                  "احتمال تأثير على شخص آخر"
                )
              }
            />


            <InfoValue
              label={
                L(
                  language,
                  "AI Confidence",
                  "ثقة الذكاء الاصطناعي"
                )
              }
              value={
                `${DEMO_CASE.confidence}%`
              }
              color="#e8f0fa"
              dir="ltr"
            />


            <InfoValue
              label={
                L(
                  language,
                  "Risk",
                  "مستوى الخطر"
                )
              }
              value={
                DEMO_CASE.risk
              }
              color="#ffbd67"
              dir="ltr"
            />


            <InfoValue
              label={
                L(
                  language,
                  "Harm",
                  "مستوى الضرر"
                )
              }
              value={
                DEMO_CASE.harm
              }
              color="#ff7685"
              dir="ltr"
            />


            <InfoValue
              label={
                L(
                  language,
                  "Protective Priority",
                  "أولوية الحماية"
                )
              }
              value={
                DEMO_CASE.protectivePriority
              }
              color="#59cfa0"
              dir="ltr"
            />

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
                "#8496ac",

              fontSize:
                "10px",

              lineHeight:
                1.7,
            }}
          >
            {L(
              language,
              "AI detected an incorrect biometric relationship that may affect another person. Because of the potential human impact, the case was escalated for immediate authorized review.",
              "اكتشف الذكاء الاصطناعي ربطًا غير صحيح قد يؤثر على شخص آخر، ولذلك تم تصعيد الحالة للمراجعة البشرية الفورية."
            )}
          </div>

        </section>


        {/* ================================================
            EVIDENCE
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
                  "AI EVIDENCE",
                  "أدلة الذكاء الاصطناعي"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Evidence Summary",
                  "ملخص الأدلة"
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
              display:
                "grid",

              gap:
                "9px",

              padding:
                "18px",
            }}
          >

            {[
              {
                label:
                  L(
                    language,
                    "Biometric Record",
                    "السجل البيومتري"
                  ),

                value:
                  DEMO_CASE.biometricId,
              },

              {
                label:
                  L(
                    language,
                    "Current Linked Identity",
                    "الهوية المرتبطة حاليًا"
                  ),

                value:
                  DEMO_CASE.currentMasterId,
              },

              {
                label:
                  L(
                    language,
                    "AI Canonical Identity",
                    "الهوية المرجحة بالذكاء الاصطناعي"
                  ),

                value:
                  DEMO_CASE.canonicalMasterId,
              },

              {
                label:
                  L(
                    language,
                    "Detected Problem",
                    "نوع الخلل"
                  ),

                value:
                  L(
                    language,
                    "Incorrect biometric-to-identity mapping",
                    "ربط غير صحيح بين السجل البيومتري والهوية"
                  ),
              },

              {
                label:
                  L(
                    language,
                    "Probable Root Cause",
                    "السبب المرجح"
                  ),

                value:
                  L(
                    language,
                    "The biometric record is currently associated with an identity that does not appear to be its correct owner.",
                    "السجل البيومتري مرتبط حاليًا بهوية لا تبدو أنها تعود إلى مالكه الصحيح."
                  ),
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    item.label
                  }
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "minmax(150px,0.7fr) minmax(220px,1.3fr)",

                    gap:
                      "14px",

                    alignItems:
                      "center",

                    padding:
                      "12px 0",

                    borderBottom:
                      index === 4
                        ? "none"
                        : "1px solid rgba(255,255,255,0.045)",
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
                    {
                      item.label
                    }
                  </span>


                  <strong
                    dir={
                      item.value
                        .toString()
                        .startsWith(
                          "REF-"
                        ) ||
                      item.value
                        .toString()
                        .startsWith(
                          "BIO-"
                        )
                        ? "ltr"
                        : undefined
                    }
                    style={{
                      color:
                        "#cdd9e7",

                      fontSize:
                        "10px",

                      lineHeight:
                        1.55,
                    }}
                  >
                    {
                      item.value
                    }
                  </strong>

                </div>
              )
            )}

          </div>

        </section>


        {/* ================================================
            AI PROPOSED CORRECTION
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
              "1px solid rgba(105,162,255,0.18)",

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
            <BrainCircuit
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
                "AI Proposed Correction",
                "الإجراء المقترح بالذكاء الاصطناعي"
              )}
            </strong>
          </div>


          <div
            className="beforeAfterGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              gap:
                "14px",

              alignItems:
                "center",
            }}
          >

            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "13px",

                border:
                  "1px solid rgba(255,93,112,0.18)",

                background:
                  "rgba(255,93,112,0.035)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  marginBottom:
                    "8px",

                  color:
                    "#ff7685",

                  fontSize:
                    "9px",

                  fontWeight:
                    800,
                }}
              >
                {L(
                  language,
                  "BEFORE",
                  "قبل"
                )}
              </span>

              <div
                dir="ltr"
                style={{
                  color:
                    "#d8e3ef",

                  fontSize:
                    "12px",

                  fontWeight:
                    800,
                }}
              >
                {DEMO_CASE.biometricId}
                {"  ←  "}
                <span
                  style={{
                    color:
                      "#ff7685",
                  }}
                >
                  {
                    DEMO_CASE.currentMasterId
                  }
                </span>
              </div>
            </div>


            <ChevronRight
              size={23}
              color="#71849c"
              style={
                arrowStyle
              }
              aria-hidden="true"
            />


            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "13px",

                border:
                  "1px solid rgba(89,207,160,0.26)",

                background:
                  "rgba(89,207,160,0.045)",
              }}
            >
              <span
                style={{
                  display:
                    "block",

                  marginBottom:
                    "8px",

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
                  "AFTER",
                  "بعد"
                )}
              </span>

              <div
                dir="ltr"
                style={{
                  color:
                    "#d8e3ef",

                  fontSize:
                    "12px",

                  fontWeight:
                    800,
                }}
              >
                {DEMO_CASE.biometricId}
                {"  ←  "}
                <span
                  style={{
                    color:
                      "#59cfa0",
                  }}
                >
                  {
                    DEMO_CASE.canonicalMasterId
                  }
                </span>
              </div>
            </div>

          </div>


          <div
            style={{
              marginTop:
                "14px",

              padding:
                "11px 13px",

              borderRadius:
                "10px",

              color:
                "#7f92a9",

              background:
                "rgba(255,255,255,0.018)",

              border:
                "1px solid rgba(255,255,255,0.04)",

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
              "The AI prepares this correction only. Execution remains blocked until Officer approval and Manager approval are both completed.",
              "الذكاء الاصطناعي يجهز هذا التعديل فقط، ويبقى التنفيذ محظورًا حتى اعتماد موظف المراجعة وموافقة المدير."
            )}
          </div>

        </section>


        {/* ================================================
            OFFICER DECISION
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
                  "HUMAN DECISION",
                  "القرار البشري"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Officer Decision",
                  "قرار موظف المراجعة"
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

            <label
              style={{
                display:
                  "block",

                marginBottom:
                  "8px",

                color:
                  "#7588a0",

                fontSize:
                  "9px",
              }}
            >
              {L(
                language,
                "Officer Notes",
                "ملاحظات الموظف"
              )}
            </label>


            <textarea
              value={
                comments
              }
              onChange={
                (
                  event
                ) =>
                  setComments(
                    event.target.value
                  )
              }
              rows={4}
              style={{
                width:
                  "100%",

                boxSizing:
                  "border-box",

                resize:
                  "vertical",

                padding:
                  "13px",

                borderRadius:
                  "11px",

                outline:
                  "none",

                border:
                  "1px solid rgba(121,169,255,0.13)",

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


            {decision ===
              "REVIEWING" && (
              <div
                className="decisionButtons"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr 1fr",

                  gap:
                    "10px",

                  marginTop:
                    "14px",
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
                      "1px solid rgba(111,230,180,0.42)",

                    borderRadius:
                      "11px",

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

                    cursor:
                      "pointer",
                  }}
                >
                  <CheckCircle2
                    size={15}
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
                      "1px solid rgba(121,169,255,0.22)",

                    borderRadius:
                      "11px",

                    background:
                      "rgba(121,169,255,0.045)",

                    color:
                      "#79a9ff",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "10px",

                    fontWeight:
                      850,

                    cursor:
                      "pointer",
                  }}
                >
                  <BrainCircuit
                    size={15}
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
                    "Request Further Investigation",
                    "طلب تحقيق إضافي"
                  )}
                </button>

              </div>
            )}


            {decision ===
              "APPROVED" && (
              <div
                style={{
                  marginTop:
                    "15px",

                  padding:
                    "16px",

                  borderRadius:
                    "13px",

                  border:
                    "1px solid rgba(89,207,160,0.24)",

                  background:
                    "rgba(89,207,160,0.055)",
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
                        "12px",
                    }}
                  >
                    {L(
                      language,
                      "Officer approval recorded",
                      "تم اعتماد موظف المراجعة"
                    )}
                  </strong>
                </div>


                <p
                  style={{
                    margin:
                      "9px 0 14px",

                    color:
                      "#8295ac",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.65,
                  }}
                >
                  {L(
                    language,
                    "The officer decision has been recorded. The proposed correction remains unexecuted and has now been sent to the manager for final authorization.",
                    "تم تسجيل قرار الموظف ورفع التوصية إلى المدير. لم يتم تنفيذ أي تعديل حتى الآن، وتنتظر الحالة موافقة المدير النهائية."
                  )}
                </p>


                <Link
                  href="/manager-approval"
                  style={{
                    minHeight:
                      "44px",

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
                  <BadgeCheck
                    size={16}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Open Manager Approval",
                    "الانتقال إلى موافقة المدير"
                  )}

                  <ChevronRight
                    size={15}
                    style={
                      arrowStyle
                    }
                    aria-hidden="true"
                  />
                </Link>

              </div>
            )}


            {decision ===
              "FURTHER_INVESTIGATION" && (
              <div
                style={{
                  marginTop:
                    "15px",

                  padding:
                    "16px",

                  borderRadius:
                    "13px",

                  border:
                    "1px solid rgba(255,189,103,0.22)",

                  background:
                    "rgba(255,189,103,0.05)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#ffbd67",

                    fontSize:
                      "11px",
                  }}
                >
                  {L(
                    language,
                    "Further investigation requested",
                    "تم طلب تحقيق إضافي"
                  )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "7px",

                    color:
                      "#8193aa",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.6,
                  }}
                >
                  {L(
                    language,
                    "The case has not been approved and no correction can proceed until additional investigation is completed.",
                    "لم يتم اعتماد الحالة ولن يتم تنفيذ أي تعديل حتى استكمال التحقيق الإضافي وإعادة الحالة للمراجعة."
                  )}
                </span>


                <button
                  type="button"
                  onClick={
                    () =>
                      setDecision(
                        "REVIEWING"
                      )
                  }
                  style={{
                    marginTop:
                      "12px",

                    padding:
                      "9px 13px",

                    borderRadius:
                      "9px",

                    border:
                      "1px solid rgba(121,169,255,0.18)",

                    background:
                      "rgba(121,169,255,0.04)",

                    color:
                      "#79a9ff",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    cursor:
                      "pointer",
                  }}
                >
                  {L(
                    language,
                    "Return to Review",
                    "العودة إلى التدقيق"
                  )}
                </button>

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
                "Officer approval does not execute the correction",
                "اعتماد الموظف لا ينفذ التعديل"
              )}
            </strong>


            <span>
              {L(
                language,
                "After Officer approval, the case moves to the Manager. The biometric correction remains blocked until the Manager provides the second required human authorization.",
                "بعد اعتماد موظف المراجعة تنتقل الحالة إلى المدير، ويبقى التصحيح البيومتري محظورًا حتى صدور الموافقة البشرية الثانية من المدير."
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
              "AI Biometric Reconciliation Platform · Officer Review",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · تدقيق الموظف"
            )}
          </span>


          <div>

            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Human authorization control active",
              "ضابط الاعتماد البشري نشط"
            )}

          </div>

        </footer>


        <style jsx>{`
          @media (max-width: 760px) {
            .summaryGrid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .workflowGrid {
              grid-template-columns: repeat(5, minmax(70px, 1fr)) !important;
              overflow-x: auto;
              padding-bottom: 4px;
            }

            .decisionButtons {
              grid-template-columns: 1fr !important;
            }

            .beforeAfterGrid {
              grid-template-columns: 1fr !important;
            }

            .beforeAfterGrid > svg {
              margin: 0 auto;
              transform: rotate(90deg) !important;
            }
          }

          @media (max-width: 480px) {
            .summaryGrid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>

      </main>

    </div>
  );
}