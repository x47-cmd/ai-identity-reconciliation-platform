"use client";

import Sidebar from "../components/Sidebar";

import {
  useLanguage,
} from "../components/LanguageProvider";

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
   ========================================================= */

const officerCases = [
  {
    id: "CASE-2026-00002",
    title: "Potential Wrong-Person Harm",
    type: "HARM_IMPACT",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: 99.98,
    risk: 93.8,
    harm: 96.5,
    protective: 97.5,
    priority: "IMMEDIATE",
    affected: true,
    findings: 2,
    queueOrder: 1,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00004",
    title: "Potential Wrong-Person Harm",
    type: "HARM_IMPACT",
    biometric: "BIO-000714",
    current: "REF-002905",
    proposed: "REF-001337",
    confidence: 99.97,
    risk: 92.5,
    harm: 95.0,
    protective: 96.5,
    priority: "IMMEDIATE",
    affected: true,
    findings: 2,
    queueOrder: 2,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00006",
    title: "Potential Wrong-Person Harm",
    type: "HARM_IMPACT",
    biometric: "BIO-000804",
    current: "REF-002130",
    proposed: "REF-000744",
    confidence: 99.96,
    risk: 91.5,
    harm: 94.0,
    protective: 95.5,
    priority: "IMMEDIATE",
    affected: true,
    findings: 2,
    queueOrder: 3,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00008",
    title: "Complex Identity Conflict",
    type: "COMPLEX_IDENTITY_CONFLICT",
    biometric: "BIO-000422",
    current: "REF-002117",
    proposed: "REF-000905",
    confidence: 99.94,
    risk: 91.0,
    harm: 72.0,
    protective: 87.0,
    priority: "HIGH",
    affected: false,
    findings: 5,
    queueOrder: 4,
    hasDetail: false,
  },

  {
    id: "CASE-2026-00011",
    title: "Identity Data Mismatch",
    type: "DATA_MISMATCH",
    biometric: "BIO-000318",
    current: "REF-002204",
    proposed: "REF-002204",
    confidence: 99.91,
    risk: 61.0,
    harm: 35.0,
    protective: 58.0,
    priority: "MEDIUM",
    affected: false,
    findings: 1,
    queueOrder: 5,
    hasDetail: false,
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
        item.priority === "IMMEDIATE"
    ).length,

  high:
    officerCases.filter(
      (item) =>
        item.priority === "HIGH"
    ).length,

  medium:
    officerCases.filter(
      (item) =>
        item.priority === "MEDIUM"
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
   HELPERS
   ========================================================= */

function getCaseTitle(
  item,
  language
) {
  const titles = {
    HARM_IMPACT: {
      en: "Potential Wrong-Person Harm",
      ar: "ضرر محتمل على الشخص الخطأ",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en: "Complex Identity Conflict",
      ar: "تعارض هوية معقد",
    },

    DATA_MISMATCH: {
      en: "Identity Data Mismatch",
      ar: "اختلاف في بيانات الهوية",
    },
  };

  return (
    titles[item.type]?.[language]
    ||
    item.title
  );
}


function getCaseType(
  item,
  language,
  t
) {
  const keys = {
    HARM_IMPACT:
      "caseTypes.HARM_IMPACT",

    COMPLEX_IDENTITY_CONFLICT:
      "caseTypes.COMPLEX_IDENTITY_CONFLICT",

    DATA_MISMATCH:
      "caseTypes.DATA_MISMATCH",
  };

  if (keys[item.type]) {
    return t(keys[item.type]);
  }

  return L(
    language,
    item.type,
    item.type
  );
}


/* =========================================================
   SMALL COMPONENTS
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
      {t(`priorities.${priority}`)}
    </span>
  );
}


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
          <Icon size={20} />
        </div>

        <span className="metricStatus">
          {t("commandCenter.demoKpi")}
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
              <UserCheck size={15} />

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
            <button className="searchButton">
              <Search size={18} />

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
            <ShieldAlert size={24} />
          </div>

          <div className="alertText">
            <strong>
              {
                language === "ar"
                  ? `${queueMetrics.wrongPerson} حالات ذات تأثير محتمل على الشخص الخطأ تتطلب مراجعة فورية`
                  : `${queueMetrics.wrongPerson} Wrong-Person Impact Cases Require Immediate Review`
              }
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
              height: "31px",
              padding: "0 12px",
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
            marginBottom: "16px",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
            }}
          >
            <div
              className="metricIcon"
              style={{
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={20} />
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#d1deec",
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
                  display: "block",
                  color: "#71839a",
                  fontSize: "10px",
                  lineHeight: 1.6,
                  marginTop: "4px",
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
                color: "#57c99c",
                fontSize: "10px",
                fontWeight: 800,
                whiteSpace: "nowrap",
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
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "16px",
            padding: "13px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="primaryButton"
              style={{
                width: "auto",
                marginTop: 0,
                padding: "0 16px",
              }}
            >
              {L(
                language,
                "All Pending",
                "جميع الحالات المعلقة"
              )}

              <span
                style={{
                  opacity: 0.7,
                }}
              >
                {queueMetrics.total}
              </span>
            </button>

            <button className="searchButton">
              {t(
                "officerReview.immediateCases"
              )}

              <span>
                {queueMetrics.immediate}
              </span>
            </button>

            <button className="searchButton">
              {t(
                "officerReview.highCases"
              )}

              <span>
                {queueMetrics.high}
              </span>
            </button>

            <button className="searchButton">
              {t(
                "officerReview.mediumCases"
              )}

              <span>
                {queueMetrics.medium}
              </span>
            </button>

            <button className="searchButton">
              {t(
                "officerReview.wrongPersonCases"
              )}

              <span>
                {queueMetrics.wrongPerson}
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
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: "#71839a",
                fontSize: "10px",
              }}
            >
              <Activity size={15} />

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
                minWidth: "1250px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    {t("common.case")}
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
                    {t("common.risk")}
                  </th>

                  <th>
                    {t("common.harm")}
                  </th>

                  <th>
                    {t(
                      "common.protectivePriority"
                    )}
                  </th>

                  <th>
                    {t("common.priority")}
                  </th>

                  <th>
                    {t(
                      "officerReview.queueOrder"
                    )}
                  </th>

                  <th></th>
                </tr>
              </thead>


              <tbody>
                {
                  officerCases.map(
                    (item) => (
                      <tr key={item.id}>

                        <td>
                          <span
                            className="caseId"
                            style={{
                              display:
                                "inline-block",
                            }}
                          >
                            {item.id}
                          </span>

                          <div className="caseStatus">
                            {item.biometric}
                          </div>
                        </td>


                        <td>
                          <div
                            style={{
                              display: "flex",
                              gap: "9px",
                              alignItems: "center",
                            }}
                          >
                            {
                              item.affected
                                ? (
                                  <ShieldAlert
                                    size={16}
                                    color="#ff7584"
                                  />
                                )
                                : (
                                  <BrainCircuit
                                    size={16}
                                    color="#669fff"
                                  />
                                )
                            }

                            <div>
                              <strong
                                style={{
                                  display: "block",
                                  color: "#cbd8e7",
                                  fontSize: "11px",
                                  lineHeight: 1.45,
                                }}
                              >
                                {
                                  getCaseTitle(
                                    item,
                                    language
                                  )
                                }
                              </strong>

                              <span
                                style={{
                                  display: "block",
                                  color: "#71839a",
                                  fontSize: "10px",
                                  lineHeight: 1.4,
                                  marginTop: "4px",
                                }}
                              >
                                {
                                  getCaseType(
                                    item,
                                    language,
                                    t
                                  )
                                }

                                {" · "}

                                {item.findings}

                                {
                                  language === "ar"
                                    ? " نتائج"
                                    : " findings"
                                }
                              </span>
                            </div>
                          </div>
                        </td>


                        <td>
                          <div className="identityChange">
                            <span className="oldIdentity">
                              {item.current}
                            </span>

                            <ChevronRight size={14} />

                            <span className="newIdentity">
                              {item.proposed}
                            </span>
                          </div>
                        </td>


                        <td>
                          <span className="confidence">
                            {item.confidence}%
                          </span>
                        </td>


                        <td>
                          <strong
                            style={{
                              color:
                                item.risk >= 90
                                  ? "#ff7d8b"
                                  : item.risk >= 80
                                    ? "#ffbd67"
                                    : "#aab9ca",

                              fontSize: "11px",
                            }}
                          >
                            {item.risk}
                          </strong>
                        </td>


                        <td>
                          <strong
                            style={{
                              color:
                                item.harm >= 90
                                  ? "#ff7d8b"
                                  : "#aab9ca",

                              fontSize: "11px",
                            }}
                          >
                            {item.harm}
                          </strong>
                        </td>


                        <td>
                          <strong
                            style={{
                              color:
                                item.protective >= 95
                                  ? "#ff7d8b"
                                  : "#82aeff",

                              fontSize: "11px",
                            }}
                          >
                            {item.protective}
                          </strong>
                        </td>


                        <td>
                          <PriorityBadge
                            priority={
                              item.priority
                            }
                            t={t}
                          />
                        </td>


                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "7px",
                              color: "#7b8da4",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "7px",
                                display: "grid",
                                placeItems: "center",
                                background:
                                  "rgba(70,140,255,0.07)",
                                border:
                                  "1px solid rgba(70,140,255,0.1)",
                                color: "#78a9ff",
                              }}
                            >
                              {item.queueOrder}
                            </span>

                            {t(
                              "common.priority"
                            )}
                          </div>
                        </td>


                        <td>
                          <button
                            className="searchButton"
                            disabled
                            title={
                              t(
                                "cases.detailUnavailable"
                              )
                            }
                            style={{
                              minWidth: "112px",
                              minHeight: "36px",
                              padding: "0 12px",
                            }}
                          >
                            {t(
                              "officerReview.reviewCase"
                            )}

                            <ChevronRight size={14} />
                          </button>
                        </td>

                      </tr>
                    )
                  )
                }
              </tbody>
            </table>
          </div>


          <div
            style={{
              padding: "14px 18px",
              borderTop:
                "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "16px",
              color: "#687b93",
              fontSize: "10px",
              lineHeight: 1.5,
            }}
          >
            <span>
              {
                language === "ar"
                  ? `${queueMetrics.total} حالات بانتظار المراجعة البشرية من المستوى الأول`
                  : `${queueMetrics.total} cases awaiting Level 1 human review`
              }
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
          <div
            className="panel"
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                gap: "20px",
              }}
            >
              <div>
                <div className="panelEyebrow">
                  {t(
                    "officerReview.nextRecommended"
                  )}
                </div>

                <h2
                  style={{
                    margin: "6px 0 0",
                    fontSize: "17px",
                  }}
                >
                  {recommendedCase.id}
                </h2>

                <p
                  style={{
                    color: "#7b8da4",
                    fontSize: "11px",
                    lineHeight: 1.7,
                    maxWidth: "650px",
                    marginTop: "9px",
                  }}
                >
                  {
                    language === "ar"
                      ? `تحتوي الحالة الحالية الأعلى أولوية في قائمة مراجعة الضابط على تعارض هوية قد يؤثر على الشخص الخطأ. الهوية المقترحة هي ${recommendedCase.proposed} بدرجة ثقة ${recommendedCase.confidence}% من الذكاء الاصطناعي.`
                      : `The current highest-priority Officer review case contains a potential wrong-person identity conflict. The proposed identity relationship is ${recommendedCase.proposed} with ${recommendedCase.confidence}% AI confidence.`
                  }
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
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, 1fr)",
                gap: "9px",
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
                  t("common.risk"),
                  recommendedCase.risk,
                ],

                [
                  t("common.harm"),
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
                      padding: "13px",
                      borderRadius: "10px",
                      background:
                        "rgba(255,255,255,0.025)",
                      border:
                        "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#71839a",
                        fontSize: "10px",
                      }}
                    >
                      {label}
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#d0dceb",
                        fontSize: "13px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            <button
              className="primaryButton"
              disabled
              title={
                t(
                  "cases.detailUnavailable"
                )
              }
              style={{
                marginTop: "18px",
              }}
            >
              {L(
                language,
                "Detailed Investigation View Planned",
                "عرض التحقيق التفصيلي مخطط له"
              )}

              <ChevronRight size={17} />
            </button>
          </div>


          {/* ==============================================
              DECISION MODEL
              ============================================== */}

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

              <UserCheck size={22} />
            </div>


            <div
              style={{
                padding: "17px",
              }}
            >
              <div
                style={{
                  marginBottom: "13px",
                  padding: "11px 12px",
                  borderRadius: "9px",
                  background:
                    "rgba(70,140,255,0.045)",
                  border:
                    "1px solid rgba(70,140,255,0.08)",
                  color: "#8194ad",
                  fontSize: "10px",
                  lineHeight: 1.55,
                }}
              >
                {L(
                  language,
                  "Decision controls shown below apply to the selected Officer review case after its evidence package is opened.",
                  "تطبق خيارات القرار أدناه على الحالة المحددة بعد فتح حزمة الأدلة الخاصة بها."
                )}
              </div>


              <div className="integrityInfo">
                <CheckCircle2 size={21} />

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
                />

                <div>
                  <strong
                    style={{
                      color: "#e0ad5f",
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
                />

                <div>
                  <strong
                    style={{
                      color: "#df7884",
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
            margin: "16px 0 0",
            padding: "17px",
          }}
        >
          <ShieldCheck size={24} />

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
                "Officer and Manager decisions remain independent human controls. No sensitive identity correction can be executed from this workflow without both approvals.",
                "تظل قرارات الضابط والمدير ضوابط بشرية مستقلة. ولا يمكن تنفيذ أي تصحيح حساس للهوية من هذا المسار دون الحصول على الاعتمادين."
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
              "Officer Review Workspace",
              "مساحة مراجعة الضابط"
            )}
          </span>

          <div>
            <Activity size={15} />

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