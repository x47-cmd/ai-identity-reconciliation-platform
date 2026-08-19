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

  officerName:
    "Demo Monitoring Officer",
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
              4;

            const active =
              step.number ===
              4;


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
                      active
                        ? "2px solid #ffbd67"
                        : completed
                          ? "1px solid rgba(89,207,160,0.5)"
                          : "1px solid rgba(121,169,255,0.25)",

                    color:
                      active
                        ? "#ffbd67"
                        : completed
                          ? "#59cfa0"
                          : "#8497ae",

                    background:
                      active
                        ? "rgba(255,189,103,0.10)"
                        : completed
                          ? "rgba(89,207,160,0.06)"
                          : "rgba(121,169,255,0.04)",

                    boxShadow:
                      active
                        ? "0 0 20px rgba(255,189,103,0.10)"
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
                        ? "#ffbd67"
                        : completed
                          ? "#bcd8cd"
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
   SUMMARY VALUE
   ========================================================= */

function SummaryValue({
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
            1.5,
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function ManagerApprovalPage() {
  const {
    language,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const [
    managerDecision,
    setManagerDecision,
  ] = useState(
    "PENDING"
  );


  const [
    comments,
    setComments,
  ] = useState(
    L(
      language,
      "The correction package was reviewed. Officer approval, AI evidence and the proposed identity reassignment support controlled execution.",
      "تمت مراجعة حزمة التصحيح واعتماد الضابط وأدلة الذكاء الاصطناعي، والتوصية تدعم الانتقال إلى التنفيذ الخاضع للتحكم."
    )
  );


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  const approve =
    () => {
      setManagerDecision(
        "APPROVED"
      );
    };


  const returnToOfficer =
    () => {
      setManagerDecision(
        "RETURNED"
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
                "Manager Approval",
                "موافقة المدير"
              )}
            </h1>


            <p>
              {L(
                language,
                "Review the Officer-approved correction package and provide the final human authorization before controlled execution.",
                "راجع حزمة التصحيح التي اعتمدها موظف المراجعة واتخذ قرار الاعتماد البشري النهائي قبل التنفيذ الخاضع للتحكم."
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
            APPROVAL READINESS
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
              "1px solid rgba(89,207,160,0.24)",

            background:
              "linear-gradient(135deg, rgba(13,46,54,0.68), rgba(8,26,45,0.92))",
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
                "16px",

              flexWrap:
                "wrap",
            }}
          >

            <div
              style={{
                display:
                  "flex",

                gap:
                  "11px",

                alignItems:
                  "center",
              }}
            >

              <div
                style={{
                  width:
                    "45px",

                  height:
                    "45px",

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
                  size={22}
                  aria-hidden="true"
                />
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
                    "Officer Approval",
                    "اعتماد موظف المراجعة"
                  )}
                </span>


                <strong
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "6px",

                    marginTop:
                      "5px",

                    color:
                      "#59cfa0",

                    fontSize:
                      "13px",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Approved",
                    "تم الاعتماد"
                  )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#788ca4",

                    fontSize:
                      "9px",
                  }}
                >
                  {
                    DEMO_CASE.officerName
                  }
                </span>

              </div>

            </div>


            <span
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                gap:
                  "6px",

                padding:
                  "7px 10px",

                borderRadius:
                  "999px",

                color:
                  managerDecision ===
                  "APPROVED"
                    ? "#59cfa0"
                    : "#ffbd67",

                background:
                  managerDecision ===
                  "APPROVED"
                    ? "rgba(89,207,160,0.07)"
                    : "rgba(255,189,103,0.07)",

                border:
                  managerDecision ===
                  "APPROVED"
                    ? "1px solid rgba(89,207,160,0.18)"
                    : "1px solid rgba(255,189,103,0.18)",

                fontSize:
                  "9px",

                fontWeight:
                  850,
              }}
            >
              {managerDecision ===
              "APPROVED"
                ? L(
                    language,
                    "AUTHORIZED FOR EXECUTION",
                    "مصرح للتنفيذ"
                  )
                : L(
                    language,
                    "AWAITING MANAGER APPROVAL",
                    "بانتظار موافقة المدير"
                  )}
            </span>

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
            {L(
              language,
              "The Monitoring Officer reviewed the evidence and approved the AI recommendation. No correction has been executed yet.",
              "راجع موظف المراجعة الأدلة واعتمد توصية الذكاء الاصطناعي. لم يتم تنفيذ أي تعديل حتى هذه المرحلة."
            )}
          </div>

        </section>


        {/* ================================================
            DECISION SUMMARY
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
                  "CORRECTION PACKAGE",
                  "حزمة التصحيح"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Correction Decision Summary",
                  "ملخص قرار التعديل"
                )}
              </h2>

            </div>


            <GitCompareArrows
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            className="decisionSummaryGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,minmax(0,1fr))",

              gap:
                "10px",

              padding:
                "18px",
            }}
          >

            <SummaryValue
              label={
                L(
                  language,
                  "Biometric Record",
                  "السجل البيومتري"
                )
              }
              value={
                DEMO_CASE.biometricId
              }
              dir="ltr"
            />


            <SummaryValue
              label={
                L(
                  language,
                  "Target System",
                  "النظام المستهدف"
                )
              }
              value="BIOMETRIC_SYSTEM"
              color="#79a9ff"
              dir="ltr"
            />


            <SummaryValue
              label={
                L(
                  language,
                  "Target Field",
                  "الحقل المستهدف"
                )
              }
              value="linked_master_id"
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
                "14px",

              padding:
                "0 18px 18px",
            }}
          >

            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "13px",

                background:
                  "rgba(255,90,110,0.04)",

                border:
                  "1px solid rgba(255,90,110,0.16)",
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
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "8px",

                  color:
                    "#ff8492",

                  fontSize:
                    "18px",
                }}
              >
                {
                  DEMO_CASE.currentMasterId
                }
              </strong>
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
                  "17px",

                borderRadius:
                  "13px",

                background:
                  "rgba(89,207,160,0.045)",

                border:
                  "1px solid rgba(89,207,160,0.22)",
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
                  "PROPOSED LINK",
                  "الربط المقترح"
                )}
              </span>


              <strong
                dir="ltr"
                style={{
                  display:
                    "block",

                  marginTop:
                    "8px",

                  color:
                    "#59cfa0",

                  fontSize:
                    "18px",
                }}
              >
                {
                  DEMO_CASE.canonicalMasterId
                }
              </strong>
            </div>

          </div>


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
                "1px solid rgba(121,169,255,0.08)",

              color:
                "#8295ac",

              fontSize:
                "9px",

              lineHeight:
                1.65,
            }}
          >
            <BrainCircuit
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
              "AI recommendation: remove the incorrect biometric identity link and reassign the biometric record to the strongest canonical reference.",
              "توصية الذكاء الاصطناعي: إزالة الربط البيومتري غير الصحيح وإعادة ربط السجل بأقوى هوية مرجعية تم التوصل إليها."
            )}
          </div>

        </section>


        {/* ================================================
            MANAGER RISK REVIEW
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
              "1px solid rgba(255,189,103,0.12)",

            background:
              "linear-gradient(135deg, rgba(42,35,27,0.34), rgba(8,24,43,0.90))",
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
                "16px",
            }}
          >
            <ShieldCheck
              size={21}
              color="#ffbd67"
              aria-hidden="true"
            />

            <strong
              style={{
                color:
                  "#e4edf7",

                fontSize:
                  "14px",
              }}
            >
              {L(
                language,
                "Manager Risk Review",
                "مراجعة المدير"
              )}
            </strong>
          </div>


          <div
            className="riskGrid"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,minmax(0,1fr))",

              gap:
                "10px",
            }}
          >

            <SummaryValue
              label={
                L(
                  language,
                  "Risk Level",
                  "مستوى الخطورة"
                )
              }
              value={
                L(
                  language,
                  `High · ${DEMO_CASE.risk}`,
                  `عالٍ · ${DEMO_CASE.risk}`
                )
              }
              color="#ff7685"
            />


            <SummaryValue
              label={
                L(
                  language,
                  "Potential Human Impact",
                  "الأثر المحتمل"
                )
              }
              value={
                L(
                  language,
                  "May affect another person",
                  "قد يؤثر على شخص آخر"
                )
              }
              color="#ffbd67"
            />


            <SummaryValue
              label={
                L(
                  language,
                  "Post-Execution Verification",
                  "التحقق بعد التنفيذ"
                )
              }
              value={
                L(
                  language,
                  "MANDATORY",
                  "إلزامي"
                )
              }
              color="#59cfa0"
            />

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,minmax(0,1fr))",

              gap:
                "10px",

              marginTop:
                "10px",
            }}
          >

            <SummaryValue
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
              dir="ltr"
            />


            <SummaryValue
              label={
                L(
                  language,
                  "Harm Score",
                  "درجة الضرر"
                )
              }
              value={
                DEMO_CASE.harm
              }
              color="#ff7685"
              dir="ltr"
            />


            <SummaryValue
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

        </section>


        {/* ================================================
            MANAGER ACTION
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
                  "FINAL HUMAN AUTHORIZATION",
                  "الاعتماد البشري النهائي"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Manager Decision",
                  "قرار المدير"
                )}
              </h2>

            </div>


            <BadgeCheck
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


            {managerDecision ===
              "PENDING" && (
              <div
                className="managerButtons"
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
                    approve
                  }
                  style={{
                    minHeight:
                      "46px",

                    borderRadius:
                      "11px",

                    border:
                      "1px solid rgba(111,230,180,0.42)",

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
                    "Approve & Authorize Execution",
                    "موافقة المدير والتصريح بالتنفيذ"
                  )}
                </button>


                <button
                  type="button"
                  onClick={
                    returnToOfficer
                  }
                  style={{
                    minHeight:
                      "46px",

                    borderRadius:
                      "11px",

                    border:
                      "1px solid rgba(121,169,255,0.19)",

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

                    cursor:
                      "pointer",
                  }}
                >
                  <RotateCcw
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
                    "Return to Officer",
                    "إرجاع لموظف المراجعة"
                  )}
                </button>

              </div>
            )}


            {managerDecision ===
              "APPROVED" && (
              <div
                style={{
                  marginTop:
                    "15px",

                  padding:
                    "17px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid rgba(89,207,160,0.28)",

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
                    size={21}
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
                      "Manager approval completed",
                      "تمت موافقة المدير"
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
                      1.7,
                  }}
                >
                  {L(
                    language,
                    "Both required human approvals are complete. The correction package is now authorized for controlled execution. The next step will apply the approved change to the synthetic runtime biometric record and immediately verify the result.",
                    "اكتمل الاعتمادان البشريان المطلوبان. أصبحت حزمة التصحيح الآن مصرحًا لها بالتنفيذ الخاضع للتحكم. في الخطوة التالية سيتم تطبيق التعديل المعتمد على السجل البيومتري الاصطناعي ثم التحقق من النتيجة مباشرة."
                  )}
                </p>


                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "7px",

                    marginBottom:
                      "14px",

                    padding:
                      "10px",

                    borderRadius:
                      "9px",

                    color:
                      "#59cfa0",

                    background:
                      "rgba(89,207,160,0.035)",

                    border:
                      "1px solid rgba(89,207,160,0.09)",

                    fontSize:
                      "9px",

                    fontWeight:
                      750,
                  }}
                >
                  <LockKeyhole
                    size={14}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Execution Lock: RELEASED",
                    "قفل التنفيذ: تم فتحه"
                  )}
                </div>


                <Link
                  href="/corrections-verification"
                  style={{
                    minHeight:
                      "46px",

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
                  <Activity
                    size={16}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Execute Correction & Verify",
                    "تنفيذ التعديل والانتقال للتحقق"
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


            {managerDecision ===
              "RETURNED" && (
              <div
                style={{
                  marginTop:
                    "15px",

                  padding:
                    "17px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid rgba(255,189,103,0.22)",

                  background:
                    "rgba(255,189,103,0.05)",
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
                      "#ffbd67",
                  }}
                >
                  <AlertTriangle
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
                      "Case returned to Officer",
                      "تمت إعادة الحالة إلى موظف المراجعة"
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
                      "#8193aa",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.65,
                  }}
                >
                  {L(
                    language,
                    "Execution remains blocked. The case requires another Officer review before it can return to Manager approval.",
                    "يبقى التنفيذ محظورًا. تحتاج الحالة إلى مراجعة جديدة من الموظف قبل إعادتها إلى المدير."
                  )}
                </span>


                <div
                  style={{
                    display:
                      "flex",

                    gap:
                      "9px",

                    flexWrap:
                      "wrap",

                    marginTop:
                      "13px",
                  }}
                >

                  <Link
                    href="/officer-review"
                    style={{
                      padding:
                        "10px 13px",

                      borderRadius:
                        "9px",

                      textDecoration:
                        "none",

                      border:
                        "1px solid rgba(121,169,255,0.18)",

                      color:
                        "#79a9ff",

                      background:
                        "rgba(121,169,255,0.04)",

                      fontSize:
                        "9px",

                      fontWeight:
                        800,
                    }}
                  >
                    {L(
                      language,
                      "Return to Officer Review",
                      "العودة إلى تدقيق الموظف"
                    )}
                  </Link>


                  <button
                    type="button"
                    onClick={
                      () =>
                        setManagerDecision(
                          "PENDING"
                        )
                    }
                    style={{
                      padding:
                        "10px 13px",

                      borderRadius:
                        "9px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        "rgba(255,255,255,0.025)",

                      color:
                        "#8da0b7",

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
                      "Reset Demo Decision",
                      "إعادة قرار المحاكاة"
                    )}
                  </button>

                </div>

              </div>
            )}

          </div>

        </section>


        {/* ================================================
            SAFETY BOUNDARY
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
                "Manager approval authorizes only the approved biometric correction",
                "موافقة المدير تصرح فقط بالتصحيح البيومتري المعتمد"
              )}
            </strong>


            <span>
              {L(
                language,
                "The Master Reference remains read-only. Controlled execution changes only the authorized linked_master_id in the synthetic runtime biometric dataset, followed by mandatory verification.",
                "يبقى المرجع الرئيسي للقراءة فقط. يغير التنفيذ الخاضع للتحكم الحقل linked_master_id المصرح به فقط داخل نسخة التشغيل الاصطناعية من البيانات البيومترية، ثم يبدأ التحقق الإلزامي."
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

            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            {managerDecision ===
            "APPROVED"
              ? L(
                  language,
                  "Execution Authorized",
                  "تم التصريح بالتنفيذ"
                )
              : L(
                  language,
                  "Final Human Authorization Required",
                  "الاعتماد البشري النهائي مطلوب"
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

            .decisionSummaryGrid,
            .riskGrid {
              grid-template-columns: 1fr !important;
            }

            .beforeAfterGrid {
              grid-template-columns: 1fr !important;
            }

            .beforeAfterGrid > svg {
              margin: 0 auto;
              transform: rotate(90deg) !important;
            }

            .managerButtons {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

      </main>

    </div>
  );
}