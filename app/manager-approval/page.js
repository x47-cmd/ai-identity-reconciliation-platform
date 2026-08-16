"use client";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  GitCompareArrows,
  LockKeyhole,
  Search,
  ShieldAlert,
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
   MANAGER APPROVAL QUEUE

   IMPORTANT:
   - These are representative frontend-only Manager queue
     records for the synthetic demonstration.
   - All records shown here have already completed
     Monitoring Officer approval.
   - No real approval transaction is executed by this page.
   ========================================================= */

const managerCases = [
  {
    id:
      "CASE-2026-00005",

    type:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    biometric:
      "BIO-000621",

    current:
      "REF-001912",

    proposed:
      "REF-002448",

    confidence:
      99.96,

    risk:
      95.0,

    harm:
      94.5,

    protective:
      96.0,

    priority:
      "IMMEDIATE",

    affected:
      true,

    officer:
      "Demo Monitoring Officer",

    officerDecision:
      "APPROVED",

    queueOrder:
      1,
  },

  {
    id:
      "CASE-2026-00013",

    type:
      "WRONG_MAPPING",

    biometric:
      "BIO-000487",

    current:
      "REF-001452",

    proposed:
      "REF-000834",

    confidence:
      99.95,

    risk:
      88.0,

    harm:
      68.0,

    protective:
      86.0,

    priority:
      "HIGH",

    affected:
      false,

    officer:
      "Demo Monitoring Officer",

    officerDecision:
      "APPROVED",

    queueOrder:
      2,
  },

  {
    id:
      "CASE-2026-00019",

    type:
      "DATA_MISMATCH",

    biometric:
      "BIO-000733",

    current:
      "REF-002081",

    proposed:
      "REF-002081",

    confidence:
      99.91,

    risk:
      63.0,

    harm:
      38.0,

    protective:
      59.0,

    priority:
      "MEDIUM",

    affected:
      false,

    officer:
      "Demo Monitoring Officer",

    officerDecision:
      "APPROVED",

    queueOrder:
      3,
  },
];


/* =========================================================
   QUEUE METRICS
   ========================================================= */

const queueMetrics = {
  total:
    managerCases.length,

  immediate:
    managerCases.filter(
      (item) =>
        item.priority ===
        "IMMEDIATE"
    ).length,

  high:
    managerCases.filter(
      (item) =>
        item.priority ===
        "HIGH"
    ).length,

  medium:
    managerCases.filter(
      (item) =>
        item.priority ===
        "MEDIUM"
    ).length,

  officerApproved:
    managerCases.filter(
      (item) =>
        item.officerDecision ===
        "APPROVED"
    ).length,

  executionAuthorized:
    0,
};


const recommendedCase =
  managerCases[0];


/* =========================================================
   CASE TITLES
   ========================================================= */

const caseTitles = {
  CRITICAL_HARM_IDENTITY_CONFLICT: {
    en:
      "Critical Cross-Identity Harm Conflict",

    ar:
      "تعارض هوية حرج ذو تأثير ضار",
  },

  WRONG_MAPPING: {
    en:
      "Incorrect Biometric Identity Mapping",

    ar:
      "ربط بيومتري خاطئ بالهوية",
  },

  DATA_MISMATCH: {
    en:
      "Identity Data Mismatch",

    ar:
      "اختلاف في بيانات الهوية",
  },
};


/* =========================================================
   HELPERS
   ========================================================= */

function getCaseTitle(
  item,
  language
) {
  return (
    caseTitles[item.type]?.[
      language
    ] ||
    caseTitles[item.type]?.en ||
    item.type
  );
}


function getCaseType(
  item,
  t
) {
  return t(
    `caseTypes.${item.type}`,
    item.type
  );
}


/* =========================================================
   PRIORITY BADGE
   ========================================================= */

function PriorityBadge({
  priority,
  t,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";

  return (
    <span className={className}>
      {t(
        `priorities.${priority}`,
        priority
      )}
    </span>
  );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  description,
  t,
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

        <span className="metricStatus">
          {t(
            "commandCenter.demoKpi"
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
   PAGE
   ========================================================= */

export default function ManagerApprovalPage() {
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
              <BadgeCheck
                size={15}
                aria-hidden="true"
              />

              {t(
                "managerApproval.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "managerApproval.title"
              )}
            </h1>

            <p>
              {t(
                "managerApproval.subtitle"
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
                  "Search approval queue",
                  "البحث في قائمة الاعتماد"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                SM
              </div>

              <div className="profileText">
                <strong>
                  {L(
                    language,
                    "Supervising Manager",
                    "المدير المشرف"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Final Approver",
                    "المعتمد النهائي"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            MANAGER CONTROL
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldCheck
              size={24}
              aria-hidden="true"
            />
          </div>

          <div className="alertText">
            <strong>
              {L(
                language,
                "Final Human Authorization Gate",
                "بوابة الاعتماد البشري النهائي"
              )}
            </strong>

            <span>
              {L(
                language,
                "No sensitive identity correction can enter controlled execution until both the Monitoring Officer and Supervising Manager have independently approved the correction package.",
                "لا يمكن لأي تصحيح حساس للهوية الانتقال إلى التنفيذ الخاضع للتحكم قبل اعتماد حزمة التصحيح بشكل مستقل من ضابط المراقبة والمدير المشرف."
              )}
            </span>
          </div>

          <div
            className="priority high"
            style={{
              height:
                "31px",

              padding:
                "0 12px",
            }}
          >
            {L(
              language,
              `${queueMetrics.total} PENDING`,
              `${queueMetrics.total} قيد الانتظار`
            )}
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={BadgeCheck}
            label={
              t(
                "managerApproval.awaitingManager"
              )
            }
            value={
              queueMetrics.total
            }
            description={
              L(
                language,
                "Officer-approved packages at Level 2",
                "حزم معتمدة من الضابط في المستوى الثاني"
              )
            }
            t={t}
          />

          <Metric
            icon={CircleAlert}
            label={
              t(
                "managerApproval.immediateCases"
              )
            }
            value={
              queueMetrics.immediate
            }
            description={
              L(
                language,
                "Highest protective priority",
                "أعلى أولوية وقائية"
              )
            }
            t={t}
          />

          <Metric
            icon={UserCheck}
            label={
              t(
                "managerApproval.officerApproved"
              )
            }
            value={
              queueMetrics.officerApproved
            }
            description={
              L(
                language,
                "Level 1 human control completed",
                "اكتملت المراجعة البشرية من المستوى الأول"
              )
            }
            t={t}
          />

          <Metric
            icon={LockKeyhole}
            label={
              t(
                "managerApproval.executionAuthorized"
              )
            }
            value={
              queueMetrics.executionAuthorized
            }
            description={
              L(
                language,
                "No pending package authorized yet",
                "لم يتم التصريح بأي حزمة معلقة حتى الآن"
              )
            }
            t={t}
          />
        </section>


        {/* ================================================
            APPROVAL CHAIN
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "18px",
          }}
        >
          <div className="panelEyebrow">
            {L(
              language,
              "APPROVAL GOVERNANCE",
              "حوكمة الاعتماد"
            )}
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr auto 1fr",

              alignItems:
                "center",

              gap:
                "11px",

              marginTop:
                "17px",
            }}
          >

            {/* AI INVESTIGATION */}

            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "12px",

                background:
                  "rgba(52,211,153,0.05)",

                border:
                  "1px solid rgba(52,211,153,0.1)",
              }}
            >
              <BrainCircuit
                size={20}
                color="#59c99d"
                aria-hidden="true"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "10px",

                  fontSize:
                    "11px",
                }}
              >
                {L(
                  language,
                  "AI Investigation",
                  "تحقيق الذكاء الاصطناعي"
                )}
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#6f9586",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.4,

                  marginTop:
                    "4px",
                }}
              >
                {t(
                  "statuses.COMPLETED"
                )}
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#52647b"
              style={
                navigationArrowStyle
              }
              aria-hidden="true"
            />


            {/* OFFICER REVIEW */}

            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "12px",

                background:
                  "rgba(52,211,153,0.05)",

                border:
                  "1px solid rgba(52,211,153,0.1)",
              }}
            >
              <UserCheck
                size={20}
                color="#59c99d"
                aria-hidden="true"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "10px",

                  fontSize:
                    "11px",
                }}
              >
                {t(
                  "common.officerReview"
                )}
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#6f9586",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.4,

                  marginTop:
                    "4px",
                }}
              >
                {t(
                  "statuses.APPROVED"
                )}
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#52647b"
              style={
                navigationArrowStyle
              }
              aria-hidden="true"
            />


            {/* MANAGER APPROVAL */}

            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "12px",

                background:
                  "rgba(255,185,90,0.055)",

                border:
                  "1px solid rgba(255,185,90,0.12)",
              }}
            >
              <BadgeCheck
                size={20}
                color="#ffbd67"
                aria-hidden="true"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "10px",

                  fontSize:
                    "11px",
                }}
              >
                {t(
                  "common.managerApproval"
                )}
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#b18b55",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.4,

                  marginTop:
                    "4px",
                }}
              >
                {L(
                  language,
                  "CURRENT STAGE",
                  "المرحلة الحالية"
                )}
              </span>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL APPROVAL QUEUE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "FINAL APPROVAL QUEUE",
                  "قائمة الاعتماد النهائي"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Officer-Approved Cases",
                  "الحالات المعتمدة من الضابط"
                )}
              </h2>
            </div>

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "7px",

                color:
                  "#71839a",

                fontSize:
                  "10px",
              }}
            >
              <Activity
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "Synthetic Manager Queue",
                "قائمة المدير الاصطناعية"
              )}
            </div>
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1320px",
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
                    {L(
                      language,
                      "INVESTIGATION",
                      "التحقيق"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "PROPOSED CORRECTION",
                      "التصحيح المقترح"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "OFFICER APPROVAL",
                      "اعتماد الضابط"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "AI CONFIDENCE",
                      "ثقة الذكاء الاصطناعي"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.risk"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.harm"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.protectivePriority"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.priority"
                    )}
                  </th>

                  <th>
                    {t(
                      "managerApproval.queueOrder"
                    )}
                  </th>

                  <th
                    aria-label={
                      t(
                        "managerApproval.finalReview"
                      )
                    }
                  />
                </tr>
              </thead>


              <tbody>
                {managerCases.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >

                      {/* CASE */}

                      <td>
                        <span
                          className="caseId"
                          dir="ltr"
                          style={{
                            display:
                              "inline-block",
                          }}
                        >
                          {item.id}
                        </span>

                        <div
                          className="caseStatus"
                          dir="ltr"
                        >
                          {item.biometric}
                        </div>
                      </td>


                      {/* INVESTIGATION */}

                      <td>
                        <div
                          style={{
                            display:
                              "flex",

                            gap:
                              "9px",

                            alignItems:
                              "center",
                          }}
                        >
                          {item.affected ? (
                            <ShieldAlert
                              size={16}
                              color="#ff7584"
                              aria-hidden="true"
                            />
                          ) : (
                            <BrainCircuit
                              size={16}
                              color="#669fff"
                              aria-hidden="true"
                            />
                          )}

                          <div>
                            <strong
                              style={{
                                display:
                                  "block",

                                color:
                                  "#cbd8e7",

                                fontSize:
                                  "11px",

                                lineHeight:
                                  1.45,
                              }}
                            >
                              {getCaseTitle(
                                item,
                                language
                              )}
                            </strong>

                            <span
                              style={{
                                display:
                                  "block",

                                color:
                                  "#71839a",

                                fontSize:
                                  "10px",

                                lineHeight:
                                  1.4,

                                marginTop:
                                  "4px",
                              }}
                            >
                              {getCaseType(
                                item,
                                t
                              )}
                            </span>
                          </div>
                        </div>
                      </td>


                      {/* PROPOSED CORRECTION */}

                      <td>
                        <div
                          className="identityChange"
                          dir="ltr"
                        >
                          <span className="oldIdentity">
                            {item.current}
                          </span>

                          <ChevronRight
                            size={14}
                            aria-hidden="true"
                          />

                          <span className="newIdentity">
                            {item.proposed}
                          </span>
                        </div>
                      </td>


                      {/* OFFICER APPROVAL */}

                      <td>
                        <div
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap:
                              "7px",
                          }}
                        >
                          <CheckCircle2
                            size={15}
                            color="#55c99b"
                            aria-hidden="true"
                          />

                          <div>
                            <strong
                              style={{
                                display:
                                  "block",

                                color:
                                  "#67cba6",

                                fontSize:
                                  "10px",
                              }}
                            >
                              {t(
                                "statuses.APPROVED"
                              )}
                            </strong>

                            <span
                              style={{
                                display:
                                  "block",

                                color:
                                  "#71839a",

                                fontSize:
                                  "10px",

                                lineHeight:
                                  1.4,

                                marginTop:
                                  "3px",
                              }}
                            >
                              {L(
                                language,
                                item.officer,
                                "ضابط المراقبة التجريبي"
                              )}
                            </span>
                          </div>
                        </div>
                      </td>


                      {/* CONFIDENCE */}

                      <td>
                        <span className="confidence">
                          {
                            item.confidence
                          }
                          %
                        </span>
                      </td>


                      {/* RISK */}

                      <td>
                        <strong
                          style={{
                            color:
                              item.risk >= 90
                                ? "#ff7d8b"
                                : item.risk >= 80
                                  ? "#ffbd67"
                                  : "#aab9ca",

                            fontSize:
                              "11px",
                          }}
                        >
                          {item.risk}
                        </strong>
                      </td>


                      {/* HARM */}

                      <td>
                        <strong
                          style={{
                            color:
                              item.harm >= 90
                                ? "#ff7d8b"
                                : "#aab9ca",

                            fontSize:
                              "11px",
                          }}
                        >
                          {item.harm}
                        </strong>
                      </td>


                      {/* PROTECTIVE */}

                      <td>
                        <strong
                          style={{
                            color:
                              item.protective >=
                              95
                                ? "#ff7d8b"
                                : "#82aeff",

                            fontSize:
                              "11px",
                          }}
                        >
                          {item.protective}
                        </strong>
                      </td>


                      {/* PRIORITY */}

                      <td>
                        <PriorityBadge
                          priority={
                            item.priority
                          }
                          t={t}
                        />
                      </td>


                      {/* QUEUE ORDER */}

                      <td>
                        <div
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap:
                              "7px",

                            color:
                              "#7b8da4",

                            fontSize:
                              "10px",

                            fontWeight:
                              700,
                          }}
                        >
                          <span
                            style={{
                              width:
                                "24px",

                              height:
                                "24px",

                              borderRadius:
                                "7px",

                              display:
                                "grid",

                              placeItems:
                                "center",

                              background:
                                "rgba(70,140,255,0.07)",

                              border:
                                "1px solid rgba(70,140,255,0.1)",

                              color:
                                "#78a9ff",
                            }}
                          >
                            {
                              item.queueOrder
                            }
                          </span>

                          {t(
                            "common.priority"
                          )}
                        </div>
                      </td>


                      {/* FINAL REVIEW */}

                      <td>
                        <button
                          type="button"
                          className="searchButton"
                          disabled
                          title={
                            t(
                              "cases.detailUnavailable"
                            )
                          }
                          style={{
                            minWidth:
                              "112px",

                            minHeight:
                              "36px",

                            padding:
                              "0 12px",

                            cursor:
                              "not-allowed",

                            opacity:
                              0.62,
                          }}
                        >
                          {t(
                            "managerApproval.finalReview"
                          )}

                          <ChevronRight
                            size={14}
                            style={
                              navigationArrowStyle
                            }
                            aria-hidden="true"
                          />
                        </button>
                      </td>

                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>


          <div
            style={{
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              gap:
                "16px",

              color:
                "#687b93",

              fontSize:
                "10px",

              lineHeight:
                1.5,
            }}
          >
            <span>
              {L(
                language,

                `${queueMetrics.total} cases awaiting final management approval`,

                `${queueMetrics.total} حالات بانتظار الاعتماد الإداري النهائي`
              )}
            </span>

            <span>
              {L(
                language,
                "Protective Priority → Harm → Risk",
                "الأولوية الوقائية ← الضرر ← المخاطر"
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            RECOMMENDED APPROVAL + MANAGER ACTIONS
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1.35fr 0.65fr",
          }}
        >

          {/* RECOMMENDED APPROVAL */}

          <div
            className="panel"
            style={{
              padding:
                "20px",
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
                  "20px",
              }}
            >
              <div>
                <div className="panelEyebrow">
                  {t(
                    "managerApproval.recommendedCase"
                  )}
                </div>

                <h2
                  dir="ltr"
                  style={{
                    margin:
                      "6px 0 0",

                    fontSize:
                      "17px",
                  }}
                >
                  {recommendedCase.id}
                </h2>

                <p
                  style={{
                    color:
                      "#7b8da4",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.7,

                    maxWidth:
                      "650px",

                    marginTop:
                      "9px",
                  }}
                >
                  {L(
                    language,

                    `The Monitoring Officer has approved the proposed reassignment of ${recommendedCase.biometric} from ${recommendedCase.current} to ${recommendedCase.proposed}. This package currently has the highest protective priority in the synthetic Manager queue.`,

                    `اعتمد ضابط المراقبة إعادة الربط المقترحة للسجل ${recommendedCase.biometric} من ${recommendedCase.current} إلى ${recommendedCase.proposed}. وتمثل هذه الحزمة أعلى أولوية وقائية حاليًا في قائمة المدير الاصطناعية.`
                  )}
                </p>
              </div>

              <PriorityBadge
                priority={
                  recommendedCase.priority
                }
                t={t}
              />
            </div>


            {/* BEFORE / AFTER */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr auto 1fr",

                alignItems:
                  "center",

                gap:
                  "12px",

                marginTop:
                  "19px",
              }}
            >
              <div
                style={{
                  padding:
                    "17px",

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
                      "#a36d76",

                    fontSize:
                      "10px",

                    fontWeight:
                      750,
                  }}
                >
                  {L(
                    language,
                    "CURRENT IDENTITY",
                    "الهوية الحالية"
                  )}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#ff7c89",

                    fontSize:
                      "19px",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    recommendedCase.current
                  }
                </strong>
              </div>


              <GitCompareArrows
                size={21}
                color="#609cff"
                aria-hidden="true"
              />


              <div
                style={{
                  padding:
                    "17px",

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
                      "#679585",

                    fontSize:
                      "10px",

                    fontWeight:
                      750,
                  }}
                >
                  {L(
                    language,
                    "AI PROPOSED IDENTITY",
                    "الهوية المقترحة بالذكاء الاصطناعي"
                  )}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#59cea0",

                    fontSize:
                      "19px",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    recommendedCase.proposed
                  }
                </strong>
              </div>
            </div>


            {/* RISK METRICS */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(4,1fr)",

                gap:
                  "9px",

                marginTop:
                  "13px",
              }}
            >
              {[
                [
                  L(
                    language,
                    "AI Confidence",
                    "ثقة الذكاء الاصطناعي"
                  ),
                  `${recommendedCase.confidence}%`,
                ],

                [
                  t(
                    "common.risk"
                  ),
                  recommendedCase.risk,
                ],

                [
                  t(
                    "common.harm"
                  ),
                  recommendedCase.harm,
                ],

                [
                  t(
                    "common.protectivePriority"
                  ),
                  recommendedCase.protective,
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
                        "12px",

                      borderRadius:
                        "10px",

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
                          "#71839a",

                        fontSize:
                          "10px",
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
                          "13px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            <button
              type="button"
              className="primaryButton"
              disabled
              title={
                t(
                  "cases.detailUnavailable"
                )
              }
              style={{
                marginTop:
                  "17px",

                cursor:
                  "not-allowed",

                opacity:
                  0.62,
              }}
            >
              {L(
                language,
                "Detailed Approval Package Planned",
                "حزمة الاعتماد التفصيلية مخطط لها"
              )}

              <ChevronRight
                size={17}
                style={
                  navigationArrowStyle
                }
                aria-hidden="true"
              />
            </button>
          </div>


          {/* ==============================================
              MANAGER ACTION MODEL
              ============================================== */}

          <div className="panel">
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
                  {L(
                    language,
                    "Available Actions",
                    "الإجراءات المتاحة"
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
                  "17px",
              }}
            >
              <div
                style={{
                  marginBottom:
                    "13px",

                  padding:
                    "11px 12px",

                  borderRadius:
                    "9px",

                  background:
                    "rgba(70,140,255,0.045)",

                  border:
                    "1px solid rgba(70,140,255,0.08)",

                  color:
                    "#8194ad",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.55,
                }}
              >
                {L(
                  language,
                  "The controls below describe the Manager decision model. This static frontend does not execute real authorization transactions.",
                  "توضح العناصر أدناه نموذج قرار المدير. هذه الواجهة التجريبية الثابتة لا تنفذ معاملات تصريح فعلية."
                )}
              </div>


              <div className="integrityInfo">
                <CheckCircle2
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {L(
                      language,
                      "Approve",
                      "اعتماد"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Authorizes the reviewed correction package for controlled execution.",
                      "يصرح لحزمة التصحيح التي تمت مراجعتها بالانتقال إلى التنفيذ الخاضع للتحكم."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,180,80,0.12)",

                  background:
                    "rgba(255,180,80,0.055)",
                }}
              >
                <UserCheck
                  size={21}
                  color="#ffbd67"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#e0ad5f",
                    }}
                  >
                    {L(
                      language,
                      "Return to Officer",
                      "إعادة إلى الضابط"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Sends the package back for revised Level 1 human review.",
                      "يعيد الحزمة إلى المراجعة البشرية من المستوى الأول لإعادة التقييم."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(87,145,255,0.12)",

                  background:
                    "rgba(87,145,255,0.05)",
                }}
              >
                <BrainCircuit
                  size={21}
                  color="#6da4ff"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#86b0ff",
                    }}
                  >
                    {L(
                      language,
                      "More Investigation",
                      "مزيد من التحقيق"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Requests additional AI-assisted or manual evidence before a final decision.",
                      "يطلب أدلة إضافية مدعومة بالذكاء الاصطناعي أو تحقيقًا يدويًا قبل اتخاذ القرار النهائي."
                    )}
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,90,105,0.11)",

                  background:
                    "rgba(255,90,105,0.05)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ff7887"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#df7884",
                    }}
                  >
                    {L(
                      language,
                      "Reject",
                      "رفض"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Stops authorization and records the management decision.",
                      "يوقف التصريح ويسجل قرار الإدارة."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            EXECUTION LOCK
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "16px 0 0",

            padding:
              "17px",
          }}
        >
          <LockKeyhole
            size={24}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Execution Remains Locked Until Manager Approval",
                "يظل التنفيذ مقفلًا حتى اعتماد المدير"
              )}
            </strong>

            <span>
              {L(
                language,
                "Officer approval alone cannot authorize execution. The controlled Execution Agent remains locked until the second human authorization is recorded. The Master Reference remains read-only.",
                "اعتماد الضابط وحده لا يصرح بالتنفيذ. يظل وكيل التنفيذ الخاضع للتحكم مقفلًا حتى يتم تسجيل الاعتماد البشري الثاني. ويبقى المرجع الرئيسي للقراءة فقط."
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
              "Manager Approval Workspace",
              "مساحة اعتماد المدير"
            )}
          </span>

          <div>
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Two-Level Governance Active",
              "حوكمة المستويين نشطة"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}