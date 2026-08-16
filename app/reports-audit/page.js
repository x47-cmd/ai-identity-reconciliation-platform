"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  useLanguage,
} from "../components/LanguageProvider";

import {
  Activity,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  History,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
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
   AUDIT EVENTS
   ========================================================= */

const auditEvents = [
  {
    id: "AUD-SEQ-01",
    caseId: "CASE-2026-00001",
    sequence: "01",
    actor: "Investigation Agent",
    actorType: "AI_AGENT",
    action: "AI_INVESTIGATION_COMPLETED",
    status: "COMPLETED",
    detail:
      "AI investigation completed and the proposed identity correction package was prepared for human review.",
  },

  {
    id: "AUD-SEQ-02",
    caseId: "CASE-2026-00001",
    sequence: "02",
    actor: "Demo Monitoring Officer",
    actorType: "HUMAN",
    action: "OFFICER_APPROVAL_RECORDED",
    status: "APPROVED",
    detail:
      "Monitoring Officer reviewed the evidence and approved the proposed correction.",
  },

  {
    id: "AUD-SEQ-03",
    caseId: "CASE-2026-00001",
    sequence: "03",
    actor: "Demo Supervising Manager",
    actorType: "HUMAN",
    action: "MANAGER_APPROVAL_RECORDED",
    status: "APPROVED",
    detail:
      "Manager completed the second-level review and authorized controlled correction execution.",
  },

  {
    id: "AUD-SEQ-04",
    caseId: "CASE-2026-00001",
    sequence: "04",
    actor: "Execution Agent",
    actorType: "AI_AGENT",
    action: "CONTROLLED_CORRECTION_EXECUTED",
    status: "COMPLETED",
    detail:
      "BIO-000166 was changed from REF-002711 to REF-001009 in the isolated controlled runtime dataset.",
  },

  {
    id: "AUD-SEQ-05",
    caseId: "CASE-2026-00001",
    sequence: "05",
    actor: "Verification Agent",
    actorType: "AI_AGENT",
    action: "POST_CORRECTION_VERIFICATION_PASSED",
    status: "VERIFIED_CLOSED",
    detail:
      "Post-correction verification passed with score 100. Mapping was validated, the original conflict was resolved and the case reached VERIFIED_CLOSED.",
  },
];


/* =========================================================
   REPORT TYPES
   ========================================================= */

const reports = [
  {
    title:
      "Case Investigation Report",

    description:
      "AI investigation, evidence, risk analysis, identity resolution and proposed correction.",

    type:
      "CASE REPORT",

    icon:
      BrainCircuit,
  },

  {
    title:
      "Correction & Verification Report",

    description:
      "Before/After correction, approvals, execution result and post-correction verification.",

    type:
      "CORRECTION REPORT",

    icon:
      FileCheck2,
  },

  {
    title:
      "Full Audit Report",

    description:
      "Chronological lifecycle record covering AI actions, human decisions, execution and verification.",

    type:
      "AUDIT REPORT",

    icon:
      History,
  },

  {
    title:
      "Harm Impact Report",

    description:
      "Protective cases where identity errors may negatively affect an unrelated person.",

    type:
      "PROTECTIVE REPORT",

    icon:
      ShieldAlert,
  },

  {
    title:
      "Executive Monthly Report",

    description:
      "Management KPIs, case volumes, priorities, AI performance and resolution outcomes.",

    type:
      "EXECUTIVE REPORT",

    icon:
      BarChart3,
  },

  {
    title:
      "Data Integrity Report",

    description:
      "Cross-system mismatches, duplicates, orphan records, source health and reconciliation results.",

    type:
      "DATA REPORT",

    icon:
      Database,
  },
];


/* =========================================================
   SELECTED CASE
   ========================================================= */

const caseSummary = {
  caseId:
    "CASE-2026-00001",

  type:
    "HARM_IMPACT",

  priority:
    "IMMEDIATE",

  biometric:
    "BIO-000166",

  before:
    "REF-002711",

  after:
    "REF-001009",

  confidence:
    "99.99%",

  risk:
    "94.99",

  harm:
    "97.5",

  protective:
    "98.0",

  officer:
    "Demo Monitoring Officer",

  officerDecision:
    "APPROVED",

  manager:
    "Demo Supervising Manager",

  managerDecision:
    "APPROVED",

  execution:
    "COMPLETED",

  verification:
    "PASSED",

  verificationScore:
    "100",

  masterModified:
    "FALSE",

  sourceModified:
    "FALSE",

  finalStatus:
    "VERIFIED_CLOSED",
};


/* =========================================================
   LOCALIZATION HELPERS
   ========================================================= */

function localizeStatus(
  value,
  language,
  t
) {
  const keys = {
    COMPLETED:
      "statuses.COMPLETED",

    APPROVED:
      "statuses.APPROVED",

    PASSED:
      "statuses.PASSED",

    VERIFIED_CLOSED:
      "statuses.VERIFIED_CLOSED",
  };


  if (keys[value]) {
    return t(
      keys[value]
    );
  }


  return L(
    language,
    value,
    value
  );
}


function localizePriority(
  value,
  t
) {
  const keys = {
    IMMEDIATE:
      "priorities.IMMEDIATE",

    HIGH:
      "priorities.HIGH",

    MEDIUM:
      "priorities.MEDIUM",
  };


  return keys[value]
    ? t(keys[value])
    : value;
}


function localizeCaseType(
  value,
  t
) {
  const keys = {
    HARM_IMPACT:
      "caseTypes.HARM_IMPACT",

    WRONG_MAPPING:
      "caseTypes.WRONG_MAPPING",

    DATA_MISMATCH:
      "caseTypes.DATA_MISMATCH",

    DUPLICATE_IDENTITY:
      "caseTypes.DUPLICATE_IDENTITY",

    COMPLEX_IDENTITY_CONFLICT:
      "caseTypes.COMPLEX_IDENTITY_CONFLICT",

    CRITICAL_HARM_IDENTITY_CONFLICT:
      "caseTypes.CRITICAL_HARM_CONFLICT",

    ORPHAN_RECORD:
      "caseTypes.ORPHAN",
  };


  return keys[value]
    ? t(keys[value])
    : value;
}


function localizeActor(
  actor,
  language
) {
  const labels = {
    "Investigation Agent":
      "وكيل التحقيق",

    "Demo Monitoring Officer":
      "ضابط المراقبة التجريبي",

    "Demo Supervising Manager":
      "المدير المشرف التجريبي",

    "Execution Agent":
      "وكيل التنفيذ",

    "Verification Agent":
      "وكيل التحقق",
  };


  return language === "ar"
    ? labels[actor] || actor
    : actor;
}


function localizeActorType(
  actorType,
  language
) {
  const labels = {
    HUMAN:
      "بشري",

    AI_AGENT:
      "وكيل ذكاء اصطناعي",
  };


  return language === "ar"
    ? labels[actorType] || actorType
    : actorType;
}


function localizeAction(
  action,
  language
) {
  const labels = {
    AI_INVESTIGATION_COMPLETED:
      "اكتمل تحقيق الذكاء الاصطناعي",

    OFFICER_APPROVAL_RECORDED:
      "تم تسجيل اعتماد الضابط",

    MANAGER_APPROVAL_RECORDED:
      "تم تسجيل اعتماد المدير",

    CONTROLLED_CORRECTION_EXECUTED:
      "تم تنفيذ التصحيح الخاضع للتحكم",

    POST_CORRECTION_VERIFICATION_PASSED:
      "نجح التحقق بعد التصحيح",
  };


  return language === "ar"
    ? labels[action] || action
    : action;
}


function localizeEventDetail(
  detail,
  language
) {
  const labels = {
    "AI investigation completed and the proposed identity correction package was prepared for human review.":
      "اكتمل تحقيق الذكاء الاصطناعي وتم إعداد حزمة تصحيح الهوية المقترحة للمراجعة البشرية.",

    "Monitoring Officer reviewed the evidence and approved the proposed correction.":
      "راجع ضابط المراقبة الأدلة واعتمد التصحيح المقترح.",

    "Manager completed the second-level review and authorized controlled correction execution.":
      "أكمل المدير المراجعة من المستوى الثاني وصرح بتنفيذ التصحيح الخاضع للتحكم.",

    "BIO-000166 was changed from REF-002711 to REF-001009 in the isolated controlled runtime dataset.":
      "تم تغيير BIO-000166 من REF-002711 إلى REF-001009 داخل مجموعة بيانات التشغيل المعزولة والخاضعة للتحكم.",

    "Post-correction verification passed with score 100. Mapping was validated, the original conflict was resolved and the case reached VERIFIED_CLOSED.":
      "نجح التحقق بعد التصحيح بدرجة 100، وتم التحقق من صحة الربط وحل التعارض الأصلي ووصلت الحالة إلى مرحلة التحقق والإغلاق.",
  };


  return language === "ar"
    ? labels[detail] || detail
    : detail;
}


function localizeReportTitle(
  title,
  language
) {
  const labels = {
    "Case Investigation Report":
      "تقرير تحقيق الحالة",

    "Correction & Verification Report":
      "تقرير التصحيح والتحقق",

    "Full Audit Report":
      "تقرير التدقيق الكامل",

    "Harm Impact Report":
      "تقرير تأثير الضرر",

    "Executive Monthly Report":
      "التقرير التنفيذي الشهري",

    "Data Integrity Report":
      "تقرير سلامة البيانات",
  };


  return language === "ar"
    ? labels[title] || title
    : title;
}


function localizeReportType(
  type,
  language
) {
  const labels = {
    "CASE REPORT":
      "تقرير حالة",

    "CORRECTION REPORT":
      "تقرير تصحيح",

    "AUDIT REPORT":
      "تقرير تدقيق",

    "PROTECTIVE REPORT":
      "تقرير وقائي",

    "EXECUTIVE REPORT":
      "تقرير تنفيذي",

    "DATA REPORT":
      "تقرير بيانات",
  };


  return language === "ar"
    ? labels[type] || type
    : type;
}


function localizeReportDescription(
  description,
  language
) {
  const labels = {
    "AI investigation, evidence, risk analysis, identity resolution and proposed correction.":
      "تحقيق الذكاء الاصطناعي والأدلة وتحليل المخاطر وحسم الهوية والتصحيح المقترح.",

    "Before/After correction, approvals, execution result and post-correction verification.":
      "حالة ما قبل وبعد التصحيح والاعتمادات ونتيجة التنفيذ والتحقق بعد التصحيح.",

    "Chronological lifecycle record covering AI actions, human decisions, execution and verification.":
      "سجل زمني لدورة الحياة يشمل إجراءات الذكاء الاصطناعي والقرارات البشرية والتنفيذ والتحقق.",

    "Protective cases where identity errors may negatively affect an unrelated person.":
      "الحالات الوقائية التي قد تؤثر فيها أخطاء الهوية سلبًا على شخص غير مرتبط بالحالة.",

    "Management KPIs, case volumes, priorities, AI performance and resolution outcomes.":
      "مؤشرات الإدارة وحجم الحالات والأولويات وأداء الذكاء الاصطناعي ونتائج الحسم.",

    "Cross-system mismatches, duplicates, orphan records, source health and reconciliation results.":
      "الاختلافات بين الأنظمة والسجلات المكررة والمعزولة وسلامة المصادر ونتائج المطابقة.",
  };


  return language === "ar"
    ? labels[description] || description
    : description;
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  description,
  language,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={20} />
        </div>

        <span
          style={{
            color:
              "#59cfa0",

            fontSize:
              "8px",

            fontWeight:
              800,
          }}
        >
          {L(
            language,
            "AUDIT READY",
            "جاهز للتدقيق"
          )}
        </span>
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
   STATUS BADGE
   ========================================================= */

function StatusBadge({
  value,
  language,
  t,
}) {
  const successValues = [
    "COMPLETED",
    "APPROVED",
    "PASSED",
    "VERIFIED_CLOSED",
  ];


  const success =
    successValues.includes(
      value
    );


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
          "24px",

        padding:
          "0 9px",

        borderRadius:
          "7px",

        color:
          success
            ? "#59cfa0"
            : "#76a9ff",

        background:
          success
            ? "rgba(52,211,153,0.07)"
            : "rgba(70,140,255,0.07)",

        border:
          success
            ? "1px solid rgba(52,211,153,0.12)"
            : "1px solid rgba(70,140,255,0.12)",

        fontSize:
          "8px",

        fontWeight:
          800,

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


/* =========================================================
   PAGE
   ========================================================= */

export default function ReportsAuditPage() {
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
              <History size={15} />

              {t(
                "reportsAudit.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "reportsAudit.title"
              )}
            </h1>

            <p>
              {t(
                "reportsAudit.subtitle"
              )}
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                {L(
                  language,
                  "Search audit history",
                  "البحث في سجل التدقيق"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                AU
              </div>

              <div className="profileText">
                <strong>
                  {L(
                    language,
                    "Audit & Governance",
                    "التدقيق والحوكمة"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Reporting Center",
                    "مركز التقارير"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            AUDIT CONTROL
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "18px",
          }}
        >
          <LockKeyhole size={25} />

          <div>
            <strong>
              {L(
                language,
                "Full Case Traceability Active",
                "التتبع الكامل للحالة نشط"
              )}
            </strong>

            <span>
              {t(
                "reportsAudit.governanceMessage"
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={History}
            label={
              t(
                "reportsAudit.auditEvents"
              )
            }
            value="5"
            description={
              L(
                language,
                "Selected E2E lifecycle events",
                "أحداث دورة الحياة للحالة التجريبية المحددة"
              )
            }
            language={language}
          />

          <Metric
            icon={Users}
            label={
              t(
                "reportsAudit.humanDecisions"
              )
            }
            value="2"
            description={
              L(
                language,
                "Officer and Manager approvals",
                "اعتماد الضابط والمدير"
              )
            }
            language={language}
          />

          <Metric
            icon={BrainCircuit}
            label={
              t(
                "reportsAudit.controlledAiStages"
              )
            }
            value="3"
            description={
              L(
                language,
                "Investigation, execution and verification",
                "التحقيق والتنفيذ والتحقق"
              )
            }
            language={language}
          />

          <Metric
            icon={CheckCircle2}
            label={
              t(
                "reportsAudit.verifiedClosed"
              )
            }
            value="1"
            description={
              L(
                language,
                "Completed end-to-end demo case",
                "حالة عرض متكاملة مكتملة"
              )
            }
            language={language}
          />
        </section>


        {/* ================================================
            SELECTED CASE AUDIT SUMMARY
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {t(
                  "reportsAudit.selectedAuditCase"
                )}
              </div>

              <h2>
                {caseSummary.caseId}
              </h2>
            </div>

            <StatusBadge
              value={
                caseSummary.finalStatus
              }
              language={language}
              t={t}
            />
          </div>


          <div
            style={{
              padding:
                "21px",
            }}
          >
            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(4,1fr)",

                gap:
                  "10px",
              }}
            >
              {[
                [
                  t(
                    "common.type"
                  ),

                  localizeCaseType(
                    caseSummary.type,
                    t
                  ),
                ],

                [
                  t(
                    "common.priority"
                  ),

                  localizePriority(
                    caseSummary.priority,
                    t
                  ),
                ],

                [
                  L(
                    language,
                    "AI Confidence",
                    "ثقة الذكاء الاصطناعي"
                  ),

                  caseSummary.confidence,
                ],

                [
                  t(
                    "common.protectivePriority"
                  ),

                  caseSummary.protective,
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={label}
                    style={{
                      padding:
                        "14px",

                      borderRadius:
                        "11px",

                      background:
                        "rgba(255,255,255,0.025)",

                      border:
                        "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#596c84",

                        fontSize:
                          "8px",
                      }}
                    >
                      {label}
                    </span>

                    <strong
                      style={{
                        display:
                          "block",

                        marginTop:
                          "5px",

                        color:
                          "#d0dceb",

                        fontSize:
                          "12px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            {/* ============================================
                BEFORE / AFTER
                ============================================ */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr auto 1fr",

                alignItems:
                  "center",

                gap:
                  "14px",

                marginTop:
                  "16px",
              }}
            >
              <div
                style={{
                  padding:
                    "18px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(255,80,100,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.1)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#9b626a",

                    fontSize:
                      "8px",

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

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#ff7b89",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {caseSummary.before}
                </strong>
              </div>


              <ChevronRight
                size={21}
                color="#5f94df"
              />


              <div
                style={{
                  padding:
                    "18px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(52,211,153,0.045)",

                  border:
                    "1px solid rgba(52,211,153,0.1)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#56806f",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  {L(
                    language,
                    "VERIFIED AFTER",
                    "بعد التحقق"
                  )}
                </span>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#59cfa0",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {caseSummary.after}
                </strong>
              </div>
            </div>


            {/* ============================================
                DECISIONS
                ============================================ */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr 1fr",

                gap:
                  "10px",

                marginTop:
                  "14px",
              }}
            >
              <div className="integrityInfo">
                <UserCheck size={20} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.officerApproval"
                    )}
                  </strong>

                  <span>
                    {
                      localizeActor(
                        caseSummary.officer,
                        language
                      )
                    }

                    {" · "}

                    {
                      localizeStatus(
                        caseSummary.officerDecision,
                        language,
                        t
                      )
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BadgeCheck size={20} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.managerApproval"
                    )}
                  </strong>

                  <span>
                    {
                      localizeActor(
                        caseSummary.manager,
                        language
                      )
                    }

                    {" · "}

                    {
                      localizeStatus(
                        caseSummary.managerDecision,
                        language,
                        t
                      )
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <ShieldCheck size={20} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.postCorrectionVerification"
                    )}
                  </strong>

                  <span>
                    {
                      localizeStatus(
                        caseSummary.verification,
                        language,
                        t
                      )
                    }

                    {" · "}

                    {L(
                      language,
                      "Score",
                      "الدرجة"
                    )}

                    {" "}

                    {
                      caseSummary.verificationScore
                    }
                  </span>
                </div>
              </div>
            </div>


            {/* ============================================
                SOURCE PROTECTION
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
                  "10px",
              }}
            >
              <div className="integrityInfo">
                <Database size={20} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.masterModified"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "FALSE · READ ONLY",
                      "لا · للقراءة فقط"
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <LockKeyhole size={20} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.originalBiometricModified"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "FALSE · SOURCE PRESERVED",
                      "لا · المصدر محفوظ"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            AUDIT TIMELINE
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
                {t(
                  "reportsAudit.auditHistory"
                )}
              </div>

              <h2>
                {t(
                  "reportsAudit.endToEndAuditTrail"
                )}
              </h2>
            </div>

            <History size={22} />
          </div>


          <div
            style={{
              padding:
                "7px 21px 20px",
            }}
          >
            {
              auditEvents.map(
                (
                  event,
                  index
                ) => (
                  <div
                    key={
                      event.id
                    }
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "65px 28px 175px 1fr 120px",

                      alignItems:
                        "start",

                      gap:
                        "11px",

                      padding:
                        "16px 0",

                      borderBottom:
                        index
                        <
                        auditEvents.length - 1
                          ? "1px solid rgba(255,255,255,0.045)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#52647b",

                        fontSize:
                          "9px",

                        paddingTop:
                          "5px",
                      }}
                    >
                      {L(
                        language,
                        `STEP ${event.sequence}`,
                        `الخطوة ${event.sequence}`
                      )}
                    </div>


                    <div
                      style={{
                        width:
                          "24px",

                        height:
                          "24px",

                        borderRadius:
                          "50%",

                        display:
                          "grid",

                        placeItems:
                          "center",

                        background:
                          event.actorType
                          ===
                          "HUMAN"
                            ? "rgba(255,185,90,0.08)"
                            : "rgba(70,140,255,0.08)",

                        color:
                          event.actorType
                          ===
                          "HUMAN"
                            ? "#ffbd67"
                            : "#69a2ff",
                      }}
                    >
                      {
                        event.actorType
                        ===
                        "HUMAN"
                          ? (
                            <Users size={13} />
                          )
                          : (
                            <BrainCircuit size={13} />
                          )
                      }
                    </div>


                    <div>
                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#cbd7e7",

                          fontSize:
                            "9px",
                        }}
                      >
                        {
                          localizeActor(
                            event.actor,
                            language
                          )
                        }
                      </strong>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#566980",

                          fontSize:
                            "8px",

                          marginTop:
                            "4px",
                        }}
                      >
                        {
                          localizeActorType(
                            event.actorType,
                            language
                          )
                        }
                      </span>
                    </div>


                    <div>
                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#9eb0c5",

                          fontSize:
                            "9px",
                        }}
                      >
                        {
                          localizeAction(
                            event.action,
                            language
                          )
                        }
                      </strong>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#63758d",

                          fontSize:
                            "9px",

                          lineHeight:
                            1.6,

                          marginTop:
                            "5px",
                        }}
                      >
                        {
                          localizeEventDetail(
                            event.detail,
                            language
                          )
                        }
                      </span>
                    </div>


                    <StatusBadge
                      value={
                        event.status
                      }
                      language={
                        language
                      }
                      t={t}
                    />
                  </div>
                )
              )
            }
          </div>
        </section>


        {/* ================================================
            AUDIT REGISTER
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
                  "DEMO AUDIT REGISTER",
                  "سجل التدقيق التجريبي"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Recorded Lifecycle Sequence",
                  "تسلسل دورة الحياة المسجل"
                )}
              </h2>
            </div>

            <Activity size={22} />
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1100px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "SEQUENCE",
                      "التسلسل"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.case"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ACTOR",
                      "المنفذ"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ACTOR TYPE",
                      "نوع المنفذ"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ACTION",
                      "الإجراء"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.status"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {
                  auditEvents.map(
                    (event) => (
                      <tr
                        key={
                          event.id
                        }
                      >
                        <td className="mono">
                          {event.sequence}
                        </td>


                        <td>
                          <Link
                            href={
                              `/cases/${event.caseId}`
                            }
                            className="caseId"
                            style={{
                              textDecoration:
                                "none",
                            }}
                          >
                            {event.caseId}
                          </Link>
                        </td>


                        <td>
                          {
                            localizeActor(
                              event.actor,
                              language
                            )
                          }
                        </td>


                        <td>
                          <span
                            style={{
                              color:
                                event.actorType
                                ===
                                "HUMAN"
                                  ? "#ffbd67"
                                  : "#76a9ff",

                              fontSize:
                                "8px",

                              fontWeight:
                                800,
                            }}
                          >
                            {
                              localizeActorType(
                                event.actorType,
                                language
                              )
                            }
                          </span>
                        </td>


                        <td>
                          {
                            localizeAction(
                              event.action,
                              language
                            )
                          }
                        </td>


                        <td>
                          <StatusBadge
                            value={
                              event.status
                            }
                            language={
                              language
                            }
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
            REPORT CENTER
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
                  "FORMAL REPORTING",
                  "التقارير الرسمية"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Report Center",
                  "مركز التقارير"
                )}
              </h2>
            </div>

            <FileText size={22} />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,1fr)",

              gap:
                "12px",

              padding:
                "20px",
            }}
          >
            {
              reports.map(
                (report) => {
                  const Icon =
                    report.icon;


                  return (
                    <div
                      key={
                        report.title
                      }
                      style={{
                        padding:
                          "18px",

                        borderRadius:
                          "13px",

                        border:
                          "1px solid rgba(255,255,255,0.055)",

                        background:
                          "rgba(255,255,255,0.022)",

                        display:
                          "flex",

                        flexDirection:
                          "column",

                        minHeight:
                          "215px",
                      }}
                    >
                      <div className="metricIcon">
                        <Icon size={20} />
                      </div>


                      <span
                        style={{
                          color:
                            "#5f91dd",

                          fontSize:
                            "8px",

                          fontWeight:
                            800,

                          marginTop:
                            "16px",
                        }}
                      >
                        {
                          localizeReportType(
                            report.type,
                            language
                          )
                        }
                      </span>


                      <strong
                        style={{
                          color:
                            "#d1ddea",

                          fontSize:
                            "11px",

                          marginTop:
                            "5px",
                        }}
                      >
                        {
                          localizeReportTitle(
                            report.title,
                            language
                          )
                        }
                      </strong>


                      <p
                        style={{
                          color:
                            "#63758d",

                          fontSize:
                            "9px",

                          lineHeight:
                            1.6,

                          margin:
                            "8px 0 16px",
                        }}
                      >
                        {
                          localizeReportDescription(
                            report.description,
                            language
                          )
                        }
                      </p>


                      <button
                        className="searchButton"
                        disabled
                        style={{
                          marginTop:
                            "auto",

                          width:
                            "100%",

                          justifyContent:
                            "center",

                          cursor:
                            "not-allowed",

                          opacity:
                            0.62,
                        }}
                      >
                        <FileText size={15} />

                        {t(
                          "reportsAudit.pdfAuditReport"
                        )}

                        {" · "}

                        {t(
                          "reportsAudit.planned"
                        )}
                      </button>
                    </div>
                  );
                }
              )
            }
          </div>
        </section>


        {/* ================================================
            REPORT CONTENT MODEL
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE REPORT CONTENT",
                    "محتوى تقرير الحالة"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Formal Evidence Package",
                    "حزمة الأدلة الرسمية"
                  )}
                </h2>
              </div>

              <FileText size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  "Case ID & lifecycle metadata",
                  "معرف الحالة وبيانات دورة الحياة",
                ],

                [
                  "Case type & priority",
                  "نوع الحالة والأولوية",
                ],

                [
                  "AI investigation conclusion",
                  "خلاصة تحقيق الذكاء الاصطناعي",
                ],

                [
                  "Identity resolution evidence",
                  "أدلة حسم الهوية",
                ],

                [
                  "Synthetic correlation evidence",
                  "أدلة المطابقة الاصطناعية",
                ],

                [
                  "Risk & harm assessment",
                  "تقييم المخاطر والضرر",
                ],

                [
                  "Wrong-person impact analysis",
                  "تحليل تأثير الشخص الخطأ",
                ],

                [
                  "Before / After correction",
                  "ما قبل / بعد التصحيح",
                ],

                [
                  "Officer decision",
                  "قرار الضابط",
                ],

                [
                  "Manager decision",
                  "قرار المدير",
                ],

                [
                  "Execution result",
                  "نتيجة التنفيذ",
                ],

                [
                  "Post-correction verification",
                  "التحقق بعد التصحيح",
                ],

                [
                  "Final case status",
                  "الحالة النهائية",
                ],

                [
                  "Audit sequence",
                  "تسلسل التدقيق",
                ],
              ].map(
                ([
                  english,
                  arabic,
                ]) => (
                  <div
                    key={english}
                    className="detailRow"
                  >
                    <span>
                      {L(
                        language,
                        english,
                        arabic
                      )}
                    </span>

                    <CheckCircle2
                      size={15}
                      color="#59cfa0"
                    />
                  </div>
                )
              )}
            </div>
          </div>


          {/* TRACEABILITY CONTROLS */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "REPORT GOVERNANCE",
                    "حوكمة التقارير"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Traceability Controls",
                    "ضوابط التتبع"
                  )}
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <LockKeyhole size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "Human Attribution",
                      "إسناد القرارات البشرية"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Officer and Manager decisions remain attributable to the relevant human review stage.",
                      "تبقى قرارات الضابط والمدير مرتبطة بمرحلة المراجعة البشرية ذات الصلة."
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BrainCircuit size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "AI Attribution",
                      "إسناد إجراءات الذكاء الاصطناعي"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "AI findings, recommendations and lifecycle actions identify the responsible processing component.",
                      "تحدد نتائج وتوصيات وإجراءات الذكاء الاصطناعي المكون المسؤول عن المعالجة."
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <History size={21} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.traceable"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "The case lifecycle can be reconstructed from AI investigation through verified closure.",
                      "يمكن إعادة بناء دورة حياة الحالة من تحقيق الذكاء الاصطناعي وحتى الإغلاق بعد التحقق."
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <Database size={21} />

                <div>
                  <strong>
                    {t(
                      "reportsAudit.dataProtection"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "The selected demo confirms that the Master Reference remained unchanged during controlled correction.",
                      "يؤكد العرض المحدد أن المرجع الرئيسي ظل دون تغيير أثناء التصحيح الخاضع للتحكم."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            EXECUTIVE REPORTING
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
                  "MANAGEMENT REPORTING",
                  "تقارير الإدارة"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Executive Reporting Coverage",
                  "تغطية التقارير التنفيذية"
                )}
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                "10px",

              padding:
                "20px",
            }}
          >
            {[
              [
                L(
                  language,
                  "Case Volume",
                  "حجم الحالات"
                ),
                "53",
                FileSearch,
              ],

              [
                L(
                  language,
                  "Protective Cases",
                  "الحالات الوقائية"
                ),
                "9",
                ShieldAlert,
              ],

              [
                L(
                  language,
                  "Demo Verification",
                  "التحقق التجريبي"
                ),
                t(
                  "statuses.PASSED"
                ),
                ShieldCheck,
              ],

              [
                L(
                  language,
                  "Unresolved Identity",
                  "هويات غير محسومة"
                ),
                "0",
                CheckCircle2,
              ],
            ].map(
              (
                [
                  label,
                  value,
                  Icon,
                ]
              ) => (
                <div
                  key={label}
                  style={{
                    padding:
                      "16px",

                    borderRadius:
                      "11px",

                    background:
                      "rgba(255,255,255,0.024)",

                    border:
                      "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon
                    size={18}
                    color="#69a2ff"
                  />

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#d2deeb",

                      fontSize:
                        "21px",

                      marginTop:
                        "12px",
                    }}
                  >
                    {value}
                  </strong>

                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#61738b",

                      fontSize:
                        "8px",

                      marginTop:
                        "4px",
                    }}
                  >
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            EXPORT READINESS
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CURRENT ARTIFACTS",
                    "المخرجات الحالية"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Machine-Readable Outputs",
                    "مخرجات قابلة للقراءة آليًا"
                  )}
                </h2>
              </div>

              <Database size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  "Case data",
                  "بيانات الحالات",
                  "CSV / JSON",
                ],

                [
                  "AI findings",
                  "نتائج الذكاء الاصطناعي",
                  "CSV / JSON",
                ],

                [
                  "Investigations",
                  "التحقيقات",
                  "CSV / JSON",
                ],

                [
                  "Approval state",
                  "حالة الاعتماد",
                  "JSON",
                ],

                [
                  "Execution results",
                  "نتائج التنفيذ",
                  "CSV / JSON",
                ],

                [
                  "Verification results",
                  "نتائج التحقق",
                  "CSV / JSON",
                ],
              ].map(
                ([
                  english,
                  arabic,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={english}
                  >
                    <span>
                      {L(
                        language,
                        english,
                        arabic
                      )}
                    </span>

                    <strong>
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "FUTURE EXPORT",
                    "التصدير المستقبلي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Formal PDF Reporting",
                    "تقارير PDF الرسمية"
                  )}
                </h2>
              </div>

              <FileText size={22} />
            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    {L(
                      language,
                      "Report Model Ready",
                      "نموذج التقرير جاهز"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Required case, AI, approval, correction and verification information is already represented in the reporting design.",
                      "تم تمثيل معلومات الحالة والذكاء الاصطناعي والاعتماد والتصحيح والتحقق المطلوبة بالفعل داخل تصميم التقارير."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.09)",

                  background:
                    "rgba(255,185,90,0.04)",
                }}
              >
                <FileText
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#d0a35f",
                    }}
                  >
                    {t(
                      "reportsAudit.pdfAuditReport"
                    )}

                    {" · "}

                    {t(
                      "reportsAudit.planned"
                    )}
                  </strong>

                  <span>
                    {t(
                      "reportsAudit.pdfMessage"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL AUDIT STATUS
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
          <CheckCircle2 size={25} />

          <div>
            <strong>
              {L(
                language,
                "Auditable End-to-End Case Lifecycle",
                "دورة حياة متكاملة وقابلة للتدقيق"
              )}
            </strong>

            <span>
              {L(
                language,

                "CASE-2026-00001 demonstrates a traceable lifecycle from AI investigation through Officer and Manager approvals, controlled correction, post-correction verification and VERIFIED_CLOSED status.",

                "توضح CASE-2026-00001 دورة حياة قابلة للتتبع تبدأ من تحقيق الذكاء الاصطناعي مرورًا باعتماد الضابط والمدير والتصحيح الخاضع للتحكم والتحقق بعد التصحيح وحتى الوصول إلى حالة التحقق والإغلاق."
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

            {t(
              "reportsAudit.title"
            )}
          </span>

          <div>
            <Activity size={15} />

            {L(
              language,
              "Audit Monitoring Active",
              "مراقبة التدقيق نشطة"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}