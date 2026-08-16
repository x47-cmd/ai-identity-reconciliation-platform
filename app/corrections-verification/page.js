"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  useLanguage,
} from "../components/LanguageProvider";

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


function localizeStatus(
  value,
  language,
  t
) {
  const keys = {
    COMPLETED:
      "statuses.COMPLETED",

    PASSED:
      "statuses.PASSED",

    VERIFIED_CLOSED:
      "statuses.VERIFIED_CLOSED",

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
  };


  if (keys[value]) {
    return t(keys[value]);
  }


  const labels = {
    AWAITING_APPROVAL: {
      en: "AWAITING APPROVAL",
      ar: "بانتظار الاعتماد",
    },

    NOT_REQUIRED: {
      en: "NOT REQUIRED",
      ar: "غير مطلوب",
    },

    FAILED: {
      en: "FAILED",
      ar: "فشل",
    },

    VERIFICATION_FAILED: {
      en: "VERIFICATION FAILED",
      ar: "فشل التحقق",
    },
  };


  return (
    labels[value]?.[language]
    ||
    value
  );
}


/* =========================================================
   CORRECTION CASES
   ========================================================= */

const correctionCases = [
  {
    id: "CASE-2026-00001",
    biometric: "BIO-000166",

    before: "REF-002711",
    after: "REF-001009",

    execution: "COMPLETED",
    verification: "PASSED",
    verificationScore: 100,

    biometricMatch: 99.9903,

    identityValid: true,
    conflictResolved: true,
    secondaryConflict: false,

    rollback: "NOT_REQUIRED",

    finalStatus: "VERIFIED_CLOSED",

    officer: "APPROVED",
    manager: "APPROVED",

    priority: "IMMEDIATE",
  },

  {
    id: "CASE-2026-00014",
    biometric: "BIO-000795",

    before: "REF-001183",
    after: "REF-002343",

    execution: "NOT_AUTHORIZED",
    verification: "NOT_STARTED",
    verificationScore: null,

    biometricMatch: 99.99,

    identityValid: null,
    conflictResolved: null,
    secondaryConflict: null,

    rollback: "NOT_REQUIRED",

    finalStatus: "AWAITING_APPROVAL",

    officer: "PENDING",
    manager: "NOT_READY",

    priority: "HIGH",
  },
];


/* =========================================================
   SMALL COMPONENTS
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
          <Icon size={20} />
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        minHeight: "25px",

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
      {
        localizeStatus(
          value,
          language,
          t
        )
      }
    </span>
  );
}


function BooleanResult({
  value,
  language,
}) {
  if (value === null) {
    return (
      <span
        style={{
          color: "#62758e",
          fontSize: "9px",
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
      {
        value
          ? L(
              language,
              "TRUE",
              "نعم"
            )
          : L(
              language,
              "FALSE",
              "لا"
            )
      }
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
              <CircleCheckBig size={15} />

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
            <button className="searchButton">
              <Search size={18} />

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
          <ShieldCheck size={24} />

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
            value="1"
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
              L(
                language,
                "Executed",
                "تم التنفيذ"
              )
            }
            value="1"
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
              L(
                language,
                "Verified",
                "تم التحقق"
              )
            }
            value="1"
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
              L(
                language,
                "Closed",
                "مغلقة"
              )
            }
            value="1"
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
            CORRECTION LIFECYCLE
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
            {t(
              "corrections.correctionLifecycle"
            )}
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "17px",
              overflowX: "auto",
              paddingBottom: "4px",
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
                true,
              ],

              [
                L(
                  language,
                  "Manager Approved",
                  "اعتماد المدير"
                ),
                BadgeCheck,
                true,
              ],

              [
                L(
                  language,
                  "Authorized",
                  "مصرح به"
                ),
                LockKeyhole,
                true,
              ],

              [
                L(
                  language,
                  "Executed",
                  "تم التنفيذ"
                ),
                CircleCheckBig,
                true,
              ],

              [
                L(
                  language,
                  "Verified",
                  "تم التحقق"
                ),
                ShieldCheck,
                true,
              ],

              [
                L(
                  language,
                  "Case Closed",
                  "تم إغلاق الحالة"
                ),
                FileCheck2,
                true,
              ],
            ].map(
              (
                [
                  label,
                  Icon,
                  complete,
                ],
                index
              ) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      minWidth: "135px",

                      padding:
                        "12px",

                      borderRadius:
                        "10px",

                      border:
                        complete
                          ? "1px solid rgba(52,211,153,0.12)"
                          : "1px solid rgba(255,255,255,0.06)",

                      background:
                        complete
                          ? "rgba(52,211,153,0.05)"
                          : "rgba(255,255,255,0.025)",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "8px",

                      color:
                        complete
                          ? "#5dcca2"
                          : "#697c94",

                      fontSize:
                        "9px",

                      fontWeight:
                        700,
                    }}
                  >
                    <Icon size={15} />

                    {label}
                  </div>

                  {
                    index < 5
                    &&
                    (
                      <ChevronRight
                        size={14}
                        color="#43556c"
                      />
                    )
                  }
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            SUCCESSFUL CASE
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

              <h2>
                CASE-2026-00001
              </h2>
            </div>

            <StatusPill
              value="VERIFIED_CLOSED"
              language={language}
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
                display: "grid",
                gridTemplateColumns:
                  "1fr auto 1fr",
                gap: "17px",
                alignItems: "center",
              }}
            >

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
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  BIO-000166
                </div>

                <strong
                  style={{
                    display: "block",

                    fontSize:
                      "23px",

                    color:
                      "#ff7c89",

                    marginTop:
                      "5px",
                  }}
                >
                  REF-002711
                </strong>

                <span
                  style={{
                    display: "block",

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
                <GitCompareArrows size={21} />
              </div>


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
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  BIO-000166
                </div>

                <strong
                  style={{
                    display: "block",

                    fontSize:
                      "23px",

                    color:
                      "#59cfa0",

                    marginTop:
                      "5px",
                  }}
                >
                  REF-001009
                </strong>

                <span
                  style={{
                    display: "block",

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
                <UserCheck size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "Officer Approval",
                      "اعتماد الضابط"
                    )}
                  </strong>

                  <span>
                    {
                      language === "ar"
                        ? "معتمد · ضابط المراقبة التجريبي"
                        : "APPROVED · Demo Monitoring Officer"
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BadgeCheck size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "Manager Approval",
                      "اعتماد المدير"
                    )}
                  </strong>

                  <span>
                    {
                      language === "ar"
                        ? "معتمد · المدير المشرف التجريبي"
                        : "APPROVED · Demo Supervising Manager"
                    }
                  </span>
                </div>
              </div>
            </div>
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
                  value="COMPLETED"
                  language={language}
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
                  "BIOMETRIC_SYSTEM",
                ],

                [
                  L(
                    language,
                    "Target Record",
                    "السجل المستهدف"
                  ),
                  "BIO-000166",
                ],

                [
                  L(
                    language,
                    "Field",
                    "الحقل"
                  ),
                  "linked_master_id",
                ],

                [
                  t(
                    "corrections.before"
                  ),
                  "REF-002711",
                ],

                [
                  t(
                    "corrections.after"
                  ),
                  "REF-001009",
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

                    <strong>
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
                <Database size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "Controlled Runtime Change",
                      "تغيير تشغيل خاضع للتحكم"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,

                      "The Master Reference was not modified and the original biometric source dataset remained preserved.",

                      "لم يتم تعديل المرجع الرئيسي، كما ظلت مجموعة البيانات البيومترية الأصلية محفوظة دون تغيير."
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

              <ShieldCheck size={22} />
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
                    100
                  </strong>
                </div>

                <CheckCircle2
                  size={35}
                  color="#59cfa0"
                />
              </div>


              {[
                [
                  t(
                    "caseDetail.verificationStatus"
                  ),
                  t(
                    "statuses.PASSED"
                  ),
                  "success",
                ],

                [
                  L(
                    language,
                    "Biometric Match",
                    "المطابقة البيومترية"
                  ),
                  "99.9903%",
                  "normal",
                ],

                [
                  t(
                    "caseDetail.mappingValid"
                  ),
                  t(
                    "common.yes"
                  ),
                  "normal",
                ],

                [
                  t(
                    "caseDetail.conflictResolved"
                  ),
                  t(
                    "common.yes"
                  ),
                  "normal",
                ],

                [
                  t(
                    "caseDetail.secondaryConflict"
                  ),
                  t(
                    "common.no"
                  ),
                  "success",
                ],
              ].map(
                ([
                  label,
                  value,
                  state,
                ]) => (
                  <div
                    className="detailRow"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <strong
                      style={{
                        color:
                          state === "success"
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

            <History size={22} />
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
                    {t("common.case")}
                  </th>

                  <th>
                    {t("common.biometric")}
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
                {
                  correctionCases.map(
                    (item) => (
                      <tr key={item.id}>
                        <td>
                          <Link
                            href={`/cases/${item.id}`}
                            className="caseId"
                            style={{
                              textDecoration:
                                "none",

                              display:
                                "inline-block",
                            }}
                          >
                            {item.id}
                          </Link>
                        </td>


                        <td className="mono">
                          {item.biometric}
                        </td>


                        <td>
                          <span className="oldIdentity">
                            {item.before}
                          </span>
                        </td>


                        <td>
                          <span className="newIdentity">
                            {item.after}
                          </span>
                        </td>


                        <td>
                          <StatusPill
                            value={
                              item.execution
                            }
                            language={language}
                            t={t}
                          />
                        </td>


                        <td>
                          <StatusPill
                            value={
                              item.verification
                            }
                            language={language}
                            t={t}
                          />
                        </td>


                        <td>
                          <span className="confidence">
                            {
                              item.verificationScore
                              === null
                                ? "—"
                                : item.verificationScore
                            }
                          </span>
                        </td>


                        <td>
                          <BooleanResult
                            value={
                              item.identityValid
                            }
                            language={language}
                          />
                        </td>


                        <td>
                          <BooleanResult
                            value={
                              item.conflictResolved
                            }
                            language={language}
                          />
                        </td>


                        <td>
                          {
                            item.secondaryConflict
                            === null
                              ? (
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
                              )
                              : (
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
                                  {
                                    item.secondaryConflict
                                      ? t(
                                          "common.yes"
                                        )
                                      : t(
                                          "common.no"
                                        )
                                  }
                                </span>
                              )
                          }
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
                            {
                              localizeStatus(
                                item.rollback,
                                language,
                                t
                              )
                            }
                          </span>
                        </td>


                        <td>
                          <StatusPill
                            value={
                              item.finalStatus
                            }
                            language={language}
                            t={t}
                          />
                        </td>
                      </tr>
                    )
                  )
                }
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

              <AlertTriangle size={22} />
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

              <RotateCcw size={22} />
            </div>


            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div className="integrityInfo">
                <RefreshCcw size={21} />

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
                <LockKeyhole size={21} />

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
          <CheckCircle2 size={26} />

          <div>
            <strong>
              {L(
                language,
                "CASE-2026-00001 Successfully Verified and Closed",
                "تم التحقق من CASE-2026-00001 وإغلاقها بنجاح"
              )}
            </strong>

            <span>
              {L(
                language,

                "BIO-000166 was corrected from REF-002711 to REF-001009 after Officer and Manager approval. Post-correction verification passed with a score of 100, the original conflict was resolved and no secondary conflict was detected.",

                "تم تصحيح BIO-000166 من REF-002711 إلى REF-001009 بعد اعتماد الضابط والمدير. ونجح التحقق بعد التصحيح بدرجة 100، وتم حل التعارض الأصلي ولم يتم اكتشاف أي تعارض ثانوي."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t("footer.platform")}
            {" · "}
            {L(
              language,
              "Correction & Verification Workspace",
              "مساحة التصحيح والتحقق"
            )}
          </span>

          <div>
            <ShieldCheck size={15} />

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