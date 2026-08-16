"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
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
   OFFICER REVIEW QUEUE

   IMPORTANT:
   - CASE-2026-00014 uses authoritative shared demo data.
   - Other rows are representative frontend-only records.
   - Only supported detail routes are linked.
   ========================================================= */

const officerCases = [
  {
    id:
      "CASE-2026-00002",

    type:
      "HARM_IMPACT",

    biometric:
      "BIO-000341",

    current:
      "REF-000882",

    proposed:
      "REF-001704",

    confidence:
      99.98,

    risk:
      93.8,

    harm:
      96.5,

    protective:
      97.5,

    priority:
      "IMMEDIATE",

    affected:
      true,

    findings:
      2,

    queueOrder:
      1,

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00004",

    type:
      "HARM_IMPACT",

    biometric:
      "BIO-000714",

    current:
      "REF-002905",

    proposed:
      "REF-001337",

    confidence:
      99.97,

    risk:
      92.5,

    harm:
      95.0,

    protective:
      96.5,

    priority:
      "IMMEDIATE",

    affected:
      true,

    findings:
      2,

    queueOrder:
      2,

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00006",

    type:
      "HARM_IMPACT",

    biometric:
      "BIO-000804",

    current:
      "REF-002130",

    proposed:
      "REF-000744",

    confidence:
      99.96,

    risk:
      91.5,

    harm:
      94.0,

    protective:
      95.5,

    priority:
      "IMMEDIATE",

    affected:
      true,

    findings:
      2,

    queueOrder:
      3,

    hasDetail:
      false,
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    type:
      COMPLEX_DEMO_CASE.caseType,

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    current:
      COMPLEX_DEMO_CASE.currentIdentity,

    proposed:
      COMPLEX_DEMO_CASE.proposedIdentity,

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    risk:
      COMPLEX_DEMO_CASE.risk,

    harm:
      COMPLEX_DEMO_CASE.harm,

    protective:
      COMPLEX_DEMO_CASE.protectivePriority,

    priority:
      COMPLEX_DEMO_CASE.priority,

    affected:
      COMPLEX_DEMO_CASE.wronglyAffected,

    findings:
      COMPLEX_DEMO_CASE.findingCount,

    queueOrder:
      4,

    hasDetail:
      true,
  },

  {
    id:
      "CASE-2026-00011",

    type:
      "DATA_MISMATCH",

    biometric:
      "BIO-000318",

    current:
      "REF-002204",

    proposed:
      "REF-002204",

    confidence:
      99.91,

    risk:
      61.0,

    harm:
      35.0,

    protective:
      58.0,

    priority:
      "MEDIUM",

    affected:
      false,

    findings:
      1,

    queueOrder:
      5,

    hasDetail:
      false,
  },
];


/* =========================================================
   QUEUE METRICS
   ========================================================= */

const queueMetrics = {
  total:
    officerCases.length,

  immediate:
    officerCases.filter(
      (item) =>
        item.priority ===
        "IMMEDIATE"
    ).length,

  high:
    officerCases.filter(
      (item) =>
        item.priority ===
        "HIGH"
    ).length,

  medium:
    officerCases.filter(
      (item) =>
        item.priority ===
        "MEDIUM"
    ).length,

  wrongPerson:
    officerCases.filter(
      (item) =>
        item.affected
    ).length,

  aiInvestigated:
    officerCases.length,

  sentToManager:
    3,
};


const recommendedCase =
  officerCases[0];


/* =========================================================
   CASE TITLES
   ========================================================= */

const caseTitles = {
  HARM_IMPACT: {
    en:
      "Potential Wrong-Person Harm",

    ar:
      "ضرر محتمل على الشخص الخطأ",
  },

  COMPLEX_IDENTITY_CONFLICT: {
    en:
      "Complex Identity Conflict",

    ar:
      "تعارض هوية معقد",
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

export default function OfficerReviewPage() {
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
              <UserCheck
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "HUMAN-IN-THE-LOOP · LEVEL 1",
                "الإشراف البشري · المستوى الأول"
              )}
            </div>

            <h1>
              {t(
                "officerReview.title"
              )}
            </h1>

            <p>
              {t(
                "officerReview.subtitle"
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
                  "Search review queue",
                  "البحث في قائمة المراجعة"
                )}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                MO
              </div>

              <div className="profileText">
                <strong>
                  {t(
                    "common.monitoringOfficer"
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "Level 1 Reviewer",
                    "مراجع المستوى الأول"
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            PROTECTIVE ALERT
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldAlert
              size={24}
              aria-hidden="true"
            />
          </div>

          <div className="alertText">
            <strong>
              {L(
                language,

                `${queueMetrics.wrongPerson} Wrong-Person Impact Cases Require Immediate Review`,

                `${queueMetrics.wrongPerson} حالات ذات تأثير محتمل على الشخص الخطأ تتطلب مراجعة فورية`
              )}
            </strong>

            <span>
              {L(
                language,
                "Protective cases are positioned ahead of normal technical cases because an unrelated person may be affected by an incorrect identity relationship.",
                "يتم تقديم الحالات الوقائية على الحالات التقنية العادية لأن شخصًا غير مرتبط بالحالة قد يتأثر نتيجة علاقة هوية غير صحيحة."
              )}
            </span>
          </div>

          <div
            className="priority immediate"
            style={{
              height:
                "31px",

              padding:
                "0 12px",
            }}
          >
            {L(
              language,
              "REVIEW NOW",
              "راجع الآن"
            )}
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={UserCheck}
            label={
              t(
                "officerReview.awaitingOfficer"
              )
            }
            value={
              queueMetrics.total
            }
            description={
              L(
                language,
                "Cases positioned for Level 1 review",
                "حالات جاهزة لمراجعة المستوى الأول"
              )
            }
            t={t}
          />

          <Metric
            icon={CircleAlert}
            label={
              t(
                "officerReview.immediateCases"
              )
            }
            value={
              queueMetrics.immediate
            }
            description={
              L(
                language,
                "Protective intervention cases",
                "حالات تدخل وقائي"
              )
            }
            t={t}
          />

          <Metric
            icon={BrainCircuit}
            label={
              t(
                "officerReview.aiInvestigated"
              )
            }
            value={
              queueMetrics.aiInvestigated
            }
            description={
              L(
                language,
                "Evidence packages prepared for review",
                "حزم الأدلة جاهزة للمراجعة"
              )
            }
            t={t}
          />

          <Metric
            icon={BadgeCheck}
            label={
              t(
                "officerReview.awaitingManager"
              )
            }
            value={
              queueMetrics.sentToManager
            }
            description={
              L(
                language,
                "Officer-approved cases at Level 2",
                "حالات اعتمدها الضابط وانتقلت للمستوى الثاني"
              )
            }
            t={t}
          />
        </section>


        {/* ================================================
            REVIEW GOVERNANCE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "16px 18px",
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
              className="metricIcon"
              style={{
                flexShrink:
                  0,
              }}
            >
              <ShieldCheck
                size={20}
                aria-hidden="true"
              />
            </div>

            <div
              style={{
                flex:
                  1,
              }}
            >
              <strong
                style={{
                  display:
                    "block",

                  fontSize:
                    "11px",

                  color:
                    "#d1deec",
                }}
              >
                {L(
                  language,
                  "Officer Review Control",
                  "ضوابط مراجعة الضابط"
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
                    1.6,

                  marginTop:
                    "4px",
                }}
              >
                {L(
                  language,
                  "AI recommendations cannot authorize corrections. A Monitoring Officer must review the evidence and record a human decision before Manager approval becomes available.",
                  "لا تستطيع توصيات الذكاء الاصطناعي اعتماد التصحيحات. يجب على ضابط المراقبة مراجعة الأدلة وتسجيل قرار بشري قبل إتاحة اعتماد المدير."
                )}
              </span>
            </div>

            <div
              style={{
                color:
                  "#57c99c",

                fontSize:
                  "10px",

                fontWeight:
                  800,

                whiteSpace:
                  "nowrap",
              }}
            >
              {L(
                language,
                "HUMAN DECISION REQUIRED",
                "قرار بشري مطلوب"
              )}
            </div>
          </div>
        </section>


        {/* ================================================
            FILTER BAR

            Visual demo controls only.
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "13px 16px",
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

              flexWrap:
                "wrap",
            }}
          >
            <button
              type="button"
              className="primaryButton"
              aria-pressed="true"
              style={{
                width:
                  "auto",

                marginTop:
                  0,

                padding:
                  "0 16px",
              }}
            >
              {L(
                language,
                "All Pending",
                "جميع الحالات المعلقة"
              )}

              <span
                style={{
                  opacity:
                    0.7,
                }}
              >
                {queueMetrics.total}
              </span>
            </button>


            <button
              type="button"
              className="searchButton"
            >
              {t(
                "officerReview.immediateCases"
              )}

              <span>
                {
                  queueMetrics.immediate
                }
              </span>
            </button>


            <button
              type="button"
              className="searchButton"
            >
              {t(
                "officerReview.highCases"
              )}

              <span>
                {queueMetrics.high}
              </span>
            </button>


            <button
              type="button"
              className="searchButton"
            >
              {t(
                "officerReview.mediumCases"
              )}

              <span>
                {queueMetrics.medium}
              </span>
            </button>


            <button
              type="button"
              className="searchButton"
            >
              {t(
                "officerReview.wrongPersonCases"
              )}

              <span>
                {
                  queueMetrics.wrongPerson
                }
              </span>
            </button>
          </div>
        </section>


        {/* ================================================
            REVIEW QUEUE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "PRIORITIZED HUMAN REVIEW QUEUE",
                  "قائمة المراجعة البشرية حسب الأولوية"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Cases Awaiting Monitoring Officer",
                  "حالات بانتظار ضابط المراقبة"
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
                "Synthetic Review Queue",
                "قائمة مراجعة اصطناعية"
              )}
            </div>
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
                    {L(
                      language,
                      "INVESTIGATION",
                      "التحقيق"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "IDENTITY CHANGE",
                      "تغيير الهوية"
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
                      "officerReview.queueOrder"
                    )}
                  </th>

                  <th
                    aria-label={
                      t(
                        "officerReview.reviewCase"
                      )
                    }
                  />
                </tr>
              </thead>


              <tbody>
                {officerCases.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >

                      {/* CASE */}

                      <td>
                        {item.hasDetail ? (
                          <Link
                            href={
                              `/cases/${item.id}`
                            }
                            className="caseId"
                            style={{
                              display:
                                "inline-block",

                              textDecoration:
                                "none",
                            }}
                          >
                            <span dir="ltr">
                              {item.id}
                            </span>
                          </Link>
                        ) : (
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
                        )}

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

                              {" · "}

                              {item.findings}

                              {isArabic
                                ? " نتائج"
                                : " findings"}
                            </span>
                          </div>
                        </div>
                      </td>


                      {/* IDENTITY CHANGE */}

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


                      {/* REVIEW ACTION */}

                      <td>
                        {item.hasDetail ? (
                          <Link
                            href={
                              `/cases/${item.id}`
                            }
                            className="searchButton"
                            style={{
                              minWidth:
                                "112px",

                              minHeight:
                                "36px",

                              padding:
                                "0 12px",

                              textDecoration:
                                "none",

                              justifyContent:
                                "center",
                            }}
                          >
                            {t(
                              "officerReview.reviewCase"
                            )}

                            <ChevronRight
                              size={14}
                              style={
                                navigationArrowStyle
                              }
                              aria-hidden="true"
                            />
                          </Link>
                        ) : (
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
                                0.6,
                            }}
                          >
                            {t(
                              "officerReview.reviewCase"
                            )}

                            <ChevronRight
                              size={14}
                              style={
                                navigationArrowStyle
                              }
                              aria-hidden="true"
                            />
                          </button>
                        )}
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

                `${queueMetrics.total} cases awaiting Level 1 human review`,

                `${queueMetrics.total} حالات بانتظار المراجعة البشرية من المستوى الأول`
              )}
            </span>

            <span>
              {L(
                language,
                "Protective Priority → Harm → Risk → AI Confidence",
                "الأولوية الوقائية ← الضرر ← المخاطر ← ثقة الذكاء الاصطناعي"
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            RECOMMENDED REVIEW + DECISION MODEL
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1.35fr 0.65fr",
          }}
        >

          {/* RECOMMENDED CASE */}

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
                    "officerReview.nextRecommended"
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

                    `The current highest-priority Officer review case contains a potential wrong-person identity conflict. The proposed identity relationship is ${recommendedCase.proposed} with ${recommendedCase.confidence}% AI confidence.`,

                    `تحتوي الحالة الحالية الأعلى أولوية في قائمة مراجعة الضابط على تعارض هوية قد يؤثر على الشخص الخطأ. الهوية المقترحة هي ${recommendedCase.proposed} بدرجة ثقة ${recommendedCase.confidence}% من الذكاء الاصطناعي.`
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


            <div
              style={{
                marginTop:
                  "20px",

                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(4, 1fr)",

                gap:
                  "9px",
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
                        "13px",

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
                  "18px",

                cursor:
                  "not-allowed",

                opacity:
                  0.62,
              }}
            >
              {L(
                language,
                "Detailed Investigation View Planned",
                "عرض التحقيق التفصيلي مخطط له"
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


          {/* DECISION MODEL */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "OFFICER DECISION",
                    "قرار الضابط"
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

              <UserCheck
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
                  "Decision controls shown below describe the Officer review model. This static frontend does not execute real approval transactions.",
                  "توضح عناصر التحكم أدناه نموذج مراجعة الضابط. هذه الواجهة التجريبية الثابتة لا تنفذ معاملات اعتماد فعلية."
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
                      "Sends the reviewed correction package to Manager approval.",
                      "يرسل حزمة التصحيح التي تمت مراجعتها إلى اعتماد المدير."
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
                <BrainCircuit
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
                      "More Investigation",
                      "مزيد من التحقيق"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Returns the case for additional AI-assisted or manual investigation.",
                      "يعيد الحالة لإجراء تحقيق إضافي مدعوم بالذكاء الاصطناعي أو تحقيق يدوي."
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
                      "Stops the proposed correction and records the human reason.",
                      "يوقف التصحيح المقترح ويسجل سبب القرار البشري."
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            SAFETY NOTE
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
          <ShieldCheck
            size={24}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "AI Cannot Approve Its Own Recommendation",
                "لا يستطيع الذكاء الاصطناعي اعتماد توصيته بنفسه"
              )}
            </strong>

            <span>
              {L(
                language,
                "Officer and Manager decisions remain independent human controls. No sensitive identity correction can be executed without both approvals.",
                "تظل قرارات الضابط والمدير ضوابط بشرية مستقلة. ولا يمكن تنفيذ أي تصحيح حساس للهوية دون الحصول على الاعتمادين."
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
              "Officer Review Workspace",
              "مساحة مراجعة الضابط"
            )}
          </span>

          <div>
            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Synthetic Review Queue",
              "قائمة مراجعة اصطناعية"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}