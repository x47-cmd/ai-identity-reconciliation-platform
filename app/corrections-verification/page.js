"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleCheckBig,
  Database,
  FileCheck2,
  GitCompareArrows,
  History,
  LockKeyhole,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   LANGUAGE HELPER
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
   STATUS LOCALIZATION
   ========================================================= */

function localizeStatus(
  value,
  language,
  t
) {
  const translationKeys = {
    COMPLETED:
      "statuses.COMPLETED",

    PASSED:
      "statuses.PASSED",

    VERIFIED_CLOSED:
      "statuses.VERIFIED_CLOSED",

    AI_INVESTIGATED:
      "statuses.AI_INVESTIGATED",

    NOT_STARTED:
      "statuses.NOT_STARTED",

    NOT_AUTHORIZED:
      "statuses.NOT_AUTHORIZED",

    APPROVED:
      "statuses.APPROVED",

    PENDING:
      "statuses.PENDING",

    NOT_READY:
      "statuses.NOT_READY",

    FAILED:
      "statuses.FAILED",
  };


  if (translationKeys[value]) {
    return t(
      translationKeys[value],
      value
    );
  }


  const labels = {
    AWAITING_APPROVAL: {
      en:
        "AWAITING APPROVAL",

      ar:
        "بانتظار الاعتماد",
    },

    NOT_REQUIRED: {
      en:
        "NOT REQUIRED",

      ar:
        "غير مطلوب",
    },

    VERIFICATION_FAILED: {
      en:
        "VERIFICATION FAILED",

      ar:
        "فشل التحقق",
    },
  };


  return (
    labels[value]?.[
      language
    ] ||
    labels[value]?.en ||
    value
  );
}


/* =========================================================
   CORRECTION REGISTER

   CASE-2026-00001:
   Fully approved, executed, verified and closed.

   CASE-2026-00014:
   AI-investigated only. Officer approval remains pending,
   therefore execution is not authorized and verification
   has not started.
   ========================================================= */

const correctionCases = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    biometric:
      VERIFIED_DEMO_CASE.biometricId,

    before:
      VERIFIED_DEMO_CASE.execution.before,

    after:
      VERIFIED_DEMO_CASE.execution.after,

    execution:
      VERIFIED_DEMO_CASE.execution.status,

    verification:
      VERIFIED_DEMO_CASE.verification.status,

    verificationScore:
      VERIFIED_DEMO_CASE.verification.score,

    biometricMatchRaw:
      VERIFIED_DEMO_CASE.verification.biometricMatch,

    biometricMatchPercent:
      VERIFIED_DEMO_CASE.verification.biometricMatchPercent,

    identityValid:
      VERIFIED_DEMO_CASE.verification.identityMappingValid,

    conflictResolved:
      VERIFIED_DEMO_CASE.verification.originalConflictResolved,

    secondaryConflict:
      VERIFIED_DEMO_CASE.verification.secondaryConflict,

    rollback:
      VERIFIED_DEMO_CASE.verification.rollbackRequired
        ? "REQUIRED"
        : "NOT_REQUIRED",

    finalStatus:
      VERIFIED_DEMO_CASE.finalStatus,

    officer:
      VERIFIED_DEMO_CASE.officer.decision,

    manager:
      VERIFIED_DEMO_CASE.manager.decision,

    priority:
      VERIFIED_DEMO_CASE.priority,
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    before:
      COMPLEX_DEMO_CASE.currentIdentity,

    after:
      COMPLEX_DEMO_CASE.proposedIdentity,

    execution:
      "NOT_AUTHORIZED",

    verification:
      "NOT_STARTED",

    verificationScore:
      null,

    biometricMatchRaw:
      null,

    biometricMatchPercent:
      null,

    identityValid:
      null,

    conflictResolved:
      null,

    secondaryConflict:
      null,

    rollback:
      "NOT_REQUIRED",

    finalStatus:
      COMPLEX_DEMO_CASE.finalStatus,

    officer:
      "PENDING",

    manager:
      "NOT_READY",

    priority:
      COMPLEX_DEMO_CASE.priority,
  },
];


/* =========================================================
   VERIFIED CASE METRICS
   ========================================================= */

const completedCorrections =
  correctionCases.filter(
    (item) =>
      item.execution ===
      "COMPLETED"
  ).length;


const verifiedCorrections =
  correctionCases.filter(
    (item) =>
      item.verification ===
      "PASSED"
  ).length;


const verifiedClosedCases =
  correctionCases.filter(
    (item) =>
      item.finalStatus ===
      "VERIFIED_CLOSED"
  ).length;


const fullyAuthorizedCases =
  correctionCases.filter(
    (item) =>
      item.officer ===
        "APPROVED"
      &&
      item.manager ===
        "APPROVED"
  ).length;


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon
            size={20}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="metricValue">
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
   STATUS PILL
   ========================================================= */

function StatusPill({
  value,
  language,
  t,
}) {
  let color =
    "#79a9ff";

  let background =
    "rgba(80,140,255,0.08)";

  let border =
    "rgba(80,140,255,0.13)";


  if (
    value === "PASSED"
    ||
    value === "COMPLETED"
    ||
    value === "VERIFIED_CLOSED"
    ||
    value === "APPROVED"
  ) {
    color =
      "#59cfa0";

    background =
      "rgba(52,211,153,0.07)";

    border =
      "rgba(52,211,153,0.13)";
  }


  if (
    value === "FAILED"
    ||
    value === "VERIFICATION_FAILED"
  ) {
    color =
      "#ff7d8b";

    background =
      "rgba(255,80,100,0.07)";

    border =
      "rgba(255,80,100,0.13)";
  }


  if (
    value === "NOT_STARTED"
    ||
    value === "NOT_AUTHORIZED"
    ||
    value === "AWAITING_APPROVAL"
    ||
    value === "PENDING"
    ||
    value === "NOT_READY"
  ) {
    color =
      "#ffbd67";

    background =
      "rgba(255,185,90,0.06)";

    border =
      "rgba(255,185,90,0.12)";
  }


  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        minHeight:
          "25px",

        padding:
          "0 9px",

        borderRadius:
          "7px",

        color,

        background,

        border:
          `1px solid ${border}`,

        fontSize:
          "8px",

        fontWeight:
          800,

        letterSpacing:
          "0.4px",

        whiteSpace:
          "nowrap",
      }}
    >
      {localizeStatus(
        value,
        language,
        t
      )}
    </span>
  );
}


/* =========================================================
   BOOLEAN RESULT
   ========================================================= */

function BooleanResult({
  value,
  language,
}) {
  if (value === null) {
    return (
      <span
        style={{
          color:
            "#62758e",

          fontSize:
            "9px",
        }}
      >
        —
      </span>
    );
  }


  return (
    <span
      style={{
        color:
          value
            ? "#59cfa0"
            : "#ff7d8b",

        fontSize:
          "9px",

        fontWeight:
          750,
      }}
    >
      {value
        ? L(
            language,
            "TRUE",
            "نعم"
          )
        : L(
            language,
            "FALSE",
            "لا"
          )}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CorrectionsVerificationPage() {
  const {
    language,
    t,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const navigationArrowStyle = {
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
              <CircleCheckBig
                size={15}
                aria-hidden="true"
              />

              {t(
                "corrections.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "corrections.title"
              )}
            </h1>

            <p>
              {t(
                "corrections.subtitle"
              )}
            </p>
          </div>


          <div className="topbarActions">
            <button
              type="button"
              className="searchButton"
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>
                {L(
                  language,
                  "Search correction",
                  "البحث عن تصحيح"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                OP
              </div>

              <div className="profileText">
                <strong>
                  {L(
                    language,
                    "Identity Operations",
                    "عمليات الهوية"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Controlled Execution",
                    "التنفيذ الخاضع للتحكم"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            CONTROL BANNER
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "17px",
          }}
        >
          <ShieldCheck
            size={24}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Closed-Loop Correction Control",
                "التحكم المغلق في دورة التصحيح"
              )}
            </strong>

            <span>
              {L(
                language,

                "Every authorized correction must pass post-correction verification before the case can reach VERIFIED_CLOSED status. Failed verification prevents case closure and may trigger controlled rollback.",

                "يجب أن يجتاز كل تصحيح مصرح به مرحلة التحقق بعد التصحيح قبل أن تصل الحالة إلى مرحلة التحقق والإغلاق. ويمنع فشل التحقق إغلاق الحالة وقد يؤدي إلى تشغيل إجراء تراجع خاضع للتحكم."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={LockKeyhole}
            label={
              L(
                language,
                "Authorized",
                "مصرح به"
              )
            }
            value={
              fullyAuthorizedCases
            }
            description={
              L(
                language,
                "Passed both human approvals",
                "اجتاز الاعتمادين البشريين"
              )
            }
          />

          <Metric
            icon={CircleCheckBig}
            label={
              t(
                "corrections.completedCorrections"
              )
            }
            value={
              completedCorrections
            }
            description={
              L(
                language,
                "Controlled correction completed",
                "اكتمل التصحيح الخاضع للتحكم"
              )
            }
          />

          <Metric
            icon={ShieldCheck}
            label={
              t(
                "corrections.verificationPassed"
              )
            }
            value={
              verifiedCorrections
            }
            description={
              L(
                language,
                "Post-correction verification passed",
                "نجح التحقق بعد التصحيح"
              )
            }
          />

          <Metric
            icon={FileCheck2}
            label={
              t(
                "corrections.verifiedClosed"
              )
            }
            value={
              verifiedClosedCases
            }
            description={
              L(
                language,
                "Cases successfully verified and closed",
                "حالات تم التحقق منها وإغلاقها بنجاح"
              )
            }
          />
        </section>


        {/* ================================================
            VERIFIED CASE LIFECYCLE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "14px",

            padding:
              "18px",
          }}
        >
          <div className="panelEyebrow">
            {L(
              language,
              "VERIFIED CASE LIFECYCLE",
              "دورة حياة الحالة المتحقق منها"
            )}
          </div>


          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "8px",

              marginTop:
                "17px",

              overflowX:
                "auto",

              paddingBottom:
                "4px",
            }}
          >
            {[
              [
                L(
                  language,
                  "Officer Approved",
                  "اعتماد الضابط"
                ),
                UserCheck,
              ],

              [
                L(
                  language,
                  "Manager Approved",
                  "اعتماد المدير"
                ),
                BadgeCheck,
              ],

              [
                L(
                  language,
                  "Authorized",
                  "مصرح به"
                ),
                LockKeyhole,
              ],

              [
                L(
                  language,
                  "Executed",
                  "تم التنفيذ"
                ),
                CircleCheckBig,
              ],

              [
                L(
                  language,
                  "Verified",
                  "تم التحقق"
                ),
                ShieldCheck,
              ],

              [
                L(
                  language,
                  "Case Closed",
                  "تم إغلاق الحالة"
                ),
                FileCheck2,
              ],
            ].map(
              (
                [
                  label,
                  Icon,
                ],
                index
              ) => (
                <div
                  key={label}
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "8px",

                    flexShrink:
                      0,
                  }}
                >
                  <div
                    style={{
                      minWidth:
                        "135px",

                      padding:
                        "12px",

                      borderRadius:
                        "10px",

                      border:
                        "1px solid rgba(52,211,153,0.12)",

                      background:
                        "rgba(52,211,153,0.05)",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "8px",

                      color:
                        "#5dcca2",

                      fontSize:
                        "9px",

                      fontWeight:
                        700,
                    }}
                  >
                    <Icon
                      size={15}
                      aria-hidden="true"
                    />

                    {label}
                  </div>

                  {index < 5 && (
                    <ChevronRight
                      size={14}
                      color="#43556c"
                      style={
                        navigationArrowStyle
                      }
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            SUCCESSFUL VERIFIED CASE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "VERIFIED CORRECTION",
                  "تصحيح تم التحقق منه"
                )}
              </div>

              <h2 dir="ltr">
                {VERIFIED_DEMO_CASE.id}
              </h2>
            </div>

            <StatusPill
              value={
                VERIFIED_DEMO_CASE.finalStatus
              }
              language={
                language
              }
              t={t}
            />
          </div>


          <div
            style={{
              padding:
                "22px",
            }}
          >

            {/* ============================================
                BEFORE / AFTER
                ============================================ */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr auto 1fr",

                gap:
                  "17px",

                alignItems:
                  "center",
              }}
            >

              {/* BEFORE */}

              <div
                style={{
                  padding:
                    "21px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(255,75,95,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.12)",
                }}
              >
                <div
                  style={{
                    color:
                      "#a5666f",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  {L(
                    language,
                    "BEFORE CORRECTION",
                    "قبل التصحيح"
                  )}
                </div>

                <div
                  dir="ltr"
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.biometricId
                  }
                </div>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    fontSize:
                      "23px",

                    color:
                      "#ff7c89",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.execution.before
                  }
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#805c63",

                    fontSize:
                      "8px",

                    marginTop:
                      "6px",
                  }}
                >
                  {L(
                    language,
                    "Incorrect identity mapping",
                    "ربط هوية غير صحيح"
                  )}
                </span>
              </div>


              <div
                style={{
                  width:
                    "47px",

                  height:
                    "47px",

                  borderRadius:
                    "50%",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(59,132,255,0.09)",

                  border:
                    "1px solid rgba(75,143,255,0.15)",

                  color:
                    "#65a0ff",
                }}
              >
                <GitCompareArrows
                  size={21}
                  aria-hidden="true"
                />
              </div>


              {/* AFTER */}

              <div
                style={{
                  padding:
                    "21px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(52,211,153,0.045)",

                  border:
                    "1px solid rgba(52,211,153,0.12)",
                }}
              >
                <div
                  style={{
                    color:
                      "#558a77",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  {L(
                    language,
                    "AFTER CORRECTION",
                    "بعد التصحيح"
                  )}
                </div>

                <div
                  dir="ltr"
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.biometricId
                  }
                </div>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    fontSize:
                      "23px",

                    color:
                      "#59cfa0",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.execution.after
                  }
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#547c6d",

                    fontSize:
                      "8px",

                    marginTop:
                      "6px",
                  }}
                >
                  {L(
                    language,
                    "Verified canonical identity",
                    "الهوية المرجعية المتحقق منها"
                  )}
                </span>
              </div>
            </div>


            {/* ============================================
                APPROVALS
                ============================================ */}

            <div
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
              <div className="integrityInfo">
                <UserCheck
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.officerApproval"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      `APPROVED · ${VERIFIED_DEMO_CASE.officer.actor}`,
                      "معتمد · ضابط المراقبة التجريبي"
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BadgeCheck
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.managerApproval"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      `APPROVED · ${VERIFIED_DEMO_CASE.manager.actor}`,
                      "معتمد · المدير المشرف التجريبي"
                    )}
                  </span>
                </div>
              </div>
            </div>


            <Link
              href={
                `/cases/${VERIFIED_DEMO_CASE.id}`
              }
              className="textButton"
              style={{
                textDecoration:
                  "none",

                marginTop:
                  "15px",

                width:
                  "fit-content",
              }}
            >
              {t(
                "common.viewDetails"
              )}

              <ChevronRight
                size={16}
                style={
                  navigationArrowStyle
                }
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>


        {/* ================================================
            EXECUTION + VERIFICATION
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >

          {/* EXECUTION */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "EXECUTION AGENT",
                    "وكيل التنفيذ"
                  )}
                </div>

                <h2>
                  {t(
                    "corrections.authorizedCorrection"
                  )}
                </h2>
              </div>

              <CircleCheckBig
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
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  paddingBottom:
                    "13px",
                }}
              >
                <span
                  style={{
                    color:
                      "#687b94",

                    fontSize:
                      "9px",
                  }}
                >
                  {t(
                    "caseDetail.executionStatus"
                  )}
                </span>

                <StatusPill
                  value={
                    VERIFIED_DEMO_CASE.execution.status
                  }
                  language={
                    language
                  }
                  t={t}
                />
              </div>


              {[
                [
                  L(
                    language,
                    "Target System",
                    "النظام المستهدف"
                  ),
                  VERIFIED_DEMO_CASE.execution.targetSystem,
                ],

                [
                  L(
                    language,
                    "Target Record",
                    "السجل المستهدف"
                  ),
                  VERIFIED_DEMO_CASE.execution.targetRecord,
                ],

                [
                  L(
                    language,
                    "Field",
                    "الحقل"
                  ),
                  VERIFIED_DEMO_CASE.execution.field,
                ],

                [
                  t(
                    "corrections.before"
                  ),
                  VERIFIED_DEMO_CASE.execution.before,
                ],

                [
                  t(
                    "corrections.after"
                  ),
                  VERIFIED_DEMO_CASE.execution.after,
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <strong dir="ltr">
                      {value}
                    </strong>
                  </div>
                )
              )}


              <div
                className="integrityInfo"
                style={{
                  margin:
                    "15px 0 0",
                }}
              >
                <Database
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Controlled Runtime Change",
                      "تغيير تشغيل خاضع للتحكم"
                    )}
                  </strong>

                  <span>
                    {t(
                      "corrections.protectedSourceMessage"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* VERIFICATION */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "VERIFICATION AGENT",
                    "وكيل التحقق"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Post-Correction Validation",
                    "التحقق بعد التصحيح"
                  )}
                </h2>
              </div>

              <ShieldCheck
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
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      color:
                        "#61738c",

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

                      color:
                        "#5bd0a1",

                      fontSize:
                        "31px",

                      marginTop:
                        "3px",
                    }}
                  >
                    {
                      VERIFIED_DEMO_CASE.verification.score
                    }
                  </strong>
                </div>

                <CheckCircle2
                  size={35}
                  color="#59cfa0"
                  aria-hidden="true"
                />
              </div>


              {[
                [
                  t(
                    "caseDetail.verificationStatus"
                  ),

                  t(
                    `statuses.${VERIFIED_DEMO_CASE.verification.status}`,
                    VERIFIED_DEMO_CASE.verification.status
                  ),

                  "success",

                  false,
                ],

                [
                  L(
                    language,
                    "Biometric Match",
                    "المطابقة البيومترية"
                  ),

                  `${VERIFIED_DEMO_CASE.verification.biometricMatch} (${VERIFIED_DEMO_CASE.verification.biometricMatchPercent}%)`,

                  "normal",

                  true,
                ],

                [
                  t(
                    "caseDetail.mappingValid"
                  ),

                  VERIFIED_DEMO_CASE.verification.identityMappingValid
                    ? t("common.yes")
                    : t("common.no"),

                  "normal",

                  false,
                ],

                [
                  t(
                    "caseDetail.conflictResolved"
                  ),

                  VERIFIED_DEMO_CASE.verification.originalConflictResolved
                    ? t("common.yes")
                    : t("common.no"),

                  "normal",

                  false,
                ],

                [
                  t(
                    "caseDetail.secondaryConflict"
                  ),

                  VERIFIED_DEMO_CASE.verification.secondaryConflict
                    ? t("common.yes")
                    : t("common.no"),

                  "success",

                  false,
                ],
              ].map(
                ([
                  label,
                  value,
                  state,
                  forceLtr,
                ]) => (
                  <div
                    className="detailRow"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <strong
                      dir={
                        forceLtr
                          ? "ltr"
                          : undefined
                      }
                      style={{
                        color:
                          state ===
                          "success"
                            ? "#59cfa0"
                            : undefined,
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>
        </section>


        {/* ================================================
            CORRECTION REGISTER
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
                  "CORRECTION REGISTER",
                  "سجل التصحيحات"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Execution & Verification Status",
                  "حالة التنفيذ والتحقق"
                )}
              </h2>
            </div>

            <History
              size={22}
              aria-hidden="true"
            />
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1250px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    {t(
                      "common.case"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.biometric"
                    )}
                  </th>

                  <th>
                    {t(
                      "corrections.before"
                    )}
                  </th>

                  <th>
                    {t(
                      "corrections.after"
                    )}
                  </th>

                  <th>
                    {t(
                      "corrections.execution"
                    )}
                  </th>

                  <th>
                    {t(
                      "corrections.verification"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "SCORE",
                      "الدرجة"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "BIOMETRIC MATCH",
                      "المطابقة البيومترية"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "IDENTITY VALID",
                      "الهوية صحيحة"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "CONFLICT RESOLVED",
                      "تم حل التعارض"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "SECONDARY CONFLICT",
                      "تعارض ثانوي"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ROLLBACK",
                      "التراجع"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "FINAL STATUS",
                      "الحالة النهائية"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {correctionCases.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >
                      <td>
                        <Link
                          href={
                            `/cases/${item.id}`
                          }
                          className="caseId"
                          style={{
                            textDecoration:
                              "none",

                            display:
                              "inline-block",
                          }}
                        >
                          <span dir="ltr">
                            {item.id}
                          </span>
                        </Link>
                      </td>


                      <td
                        className="mono"
                        dir="ltr"
                      >
                        {item.biometric}
                      </td>


                      <td>
                        <span
                          className="oldIdentity"
                          dir="ltr"
                        >
                          {item.before}
                        </span>
                      </td>


                      <td>
                        <span
                          className="newIdentity"
                          dir="ltr"
                        >
                          {item.after}
                        </span>
                      </td>


                      <td>
                        <StatusPill
                          value={
                            item.execution
                          }
                          language={
                            language
                          }
                          t={t}
                        />
                      </td>


                      <td>
                        <StatusPill
                          value={
                            item.verification
                          }
                          language={
                            language
                          }
                          t={t}
                        />
                      </td>


                      <td>
                        <span className="confidence">
                          {item.verificationScore ===
                          null
                            ? "—"
                            : item.verificationScore}
                        </span>
                      </td>


                      <td>
                        <span
                          dir="ltr"
                          style={{
                            color:
                              item.biometricMatchPercent ===
                              null
                                ? "#62758e"
                                : "#aab9ca",

                            fontSize:
                              "9px",

                            fontWeight:
                              item.biometricMatchPercent ===
                              null
                                ? 400
                                : 700,
                          }}
                        >
                          {item.biometricMatchPercent ===
                          null
                            ? "—"
                            : `${item.biometricMatchRaw} (${item.biometricMatchPercent}%)`}
                        </span>
                      </td>


                      <td>
                        <BooleanResult
                          value={
                            item.identityValid
                          }
                          language={
                            language
                          }
                        />
                      </td>


                      <td>
                        <BooleanResult
                          value={
                            item.conflictResolved
                          }
                          language={
                            language
                          }
                        />
                      </td>


                      <td>
                        {item.secondaryConflict ===
                        null ? (
                          <span
                            style={{
                              color:
                                "#62758e",

                              fontSize:
                                "9px",
                            }}
                          >
                            —
                          </span>
                        ) : (
                          <span
                            style={{
                              color:
                                item.secondaryConflict
                                  ? "#ff7d8b"
                                  : "#59cfa0",

                              fontSize:
                                "9px",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.secondaryConflict
                              ? t(
                                  "common.yes"
                                )
                              : t(
                                  "common.no"
                                )}
                          </span>
                        )}
                      </td>


                      <td>
                        <span
                          style={{
                            color:
                              "#687b93",

                            fontSize:
                              "9px",
                          }}
                        >
                          {localizeStatus(
                            item.rollback,
                            language,
                            t
                          )}
                        </span>
                      </td>


                      <td>
                        <StatusPill
                          value={
                            item.finalStatus
                          }
                          language={
                            language
                          }
                          t={t}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* ================================================
            FAILURE / ROLLBACK CONTROL
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "FAILURE HANDLING",
                    "معالجة الفشل"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Verification Exception",
                    "استثناء التحقق"
                  )}
                </h2>
              </div>

              <AlertTriangle
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
                    "rgba(255,80,100,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.09)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#db7480",

                    fontSize:
                      "10px",
                  }}
                >
                  {L(
                    language,
                    "If Verification Fails",
                    "إذا فشل التحقق"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#886268",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.7,

                    marginTop:
                      "6px",
                  }}
                >
                  {L(
                    language,

                    "The case cannot be closed. It moves to manual post-correction review and the system can initiate a controlled rollback if the approved correction is no longer considered safe.",

                    "لا يمكن إغلاق الحالة. تنتقل إلى مراجعة يدوية بعد التصحيح، ويمكن للنظام بدء تراجع خاضع للتحكم إذا لم يعد التصحيح المعتمد يعتبر آمنًا."
                  )}
                </span>
              </div>
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CONTROLLED ROLLBACK",
                    "التراجع الخاضع للتحكم"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Recovery Control",
                    "التحكم في الاستعادة"
                  )}
                </h2>
              </div>

              <RotateCcw
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
              <div className="integrityInfo">
                <RefreshCcw
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Restore Previous Mapping",
                      "استعادة الربط السابق"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,

                      "Rollback restores the pre-correction identity relationship only when the runtime state still matches the executed change.",

                      "يعيد التراجع علاقة الهوية السابقة للتصحيح فقط عندما تظل حالة التشغيل مطابقة للتغيير الذي تم تنفيذه."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  marginTop:
                    "10px",
                }}
              >
                <LockKeyhole
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Safety Lock",
                      "قفل الأمان"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,

                      "Automatic rollback is blocked if the record changed again after execution.",

                      "يتم منع التراجع التلقائي إذا تغير السجل مرة أخرى بعد التنفيذ."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL SUCCESS
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "18px",
          }}
        >
          <CheckCircle2
            size={26}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                `${VERIFIED_DEMO_CASE.id} Successfully Verified and Closed`,
                `تم التحقق من ${VERIFIED_DEMO_CASE.id} وإغلاقها بنجاح`
              )}
            </strong>

            <span>
              {L(
                language,

                `${VERIFIED_DEMO_CASE.biometricId} was corrected from ${VERIFIED_DEMO_CASE.execution.before} to ${VERIFIED_DEMO_CASE.execution.after} after Officer and Manager approval. Post-correction verification passed with a score of ${VERIFIED_DEMO_CASE.verification.score}, the original conflict was resolved and no secondary conflict was detected.`,

                `تم تصحيح ${VERIFIED_DEMO_CASE.biometricId} من ${VERIFIED_DEMO_CASE.execution.before} إلى ${VERIFIED_DEMO_CASE.execution.after} بعد اعتماد الضابط والمدير. ونجح التحقق بعد التصحيح بدرجة ${VERIFIED_DEMO_CASE.verification.score}، وتم حل التعارض الأصلي ولم يتم اكتشاف أي تعارض ثانوي.`
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t(
              "footer.platform"
            )}

            {" · "}

            {L(
              language,
              "Correction & Verification Workspace",
              "مساحة التصحيح والتحقق"
            )}
          </span>

          <div>
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Closed-Loop Verification Active",
              "التحقق المغلق للدورة نشط"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}