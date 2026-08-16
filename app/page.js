"use client";

import Link from "next/link";

import Sidebar from "./components/Sidebar";

import {
  useLanguage,
} from "./components/LanguageProvider";

import {
  VERIFIED_DEMO_CASE,
} from "./lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Database,
  FileSearch,
  Fingerprint,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";


/* =========================================================
   COMMAND CENTER DEMO METRICS
   ========================================================= */

const stats = [
  {
    titleKey: "commandCenter.totalCases",
    value: "53",
    subtitleKey:
      "commandCenter.totalCasesSubtitle",
    icon: FileSearch,
  },
  {
    titleKey:
      "commandCenter.immediatePriority",
    value: "9",
    subtitleKey:
      "commandCenter.immediatePrioritySubtitle",
    icon: CircleAlert,
  },
  {
    titleKey:
      "commandCenter.highPriority",
    value: "23",
    subtitleKey:
      "commandCenter.highPrioritySubtitle",
    icon: AlertTriangle,
  },
  {
    titleKey:
      "commandCenter.unresolvedIdentity",
    value: "0",
    subtitleKey:
      "commandCenter.unresolvedIdentitySubtitle",
    icon: UserCheck,
  },
];


/* =========================================================
   CURRENT ATTENTION QUEUE
   ========================================================= */

const cases = [
  {
    id: "CASE-2026-00002",
    typeKey: "caseTypes.HARM_IMPACT",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: "99.98%",
    priority: "IMMEDIATE",
    statusKey: "common.officerReview",
    protective: "97.5",
    hasDetail: false,
  },
  {
    id: "CASE-2026-00003",
    typeKey:
      "caseTypes.CRITICAL_HARM_CONFLICT",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: "99.98%",
    priority: "IMMEDIATE",
    statusKey: "common.aiInvestigated",
    protective: "97.0",
    hasDetail: false,
  },
  {
    id: "CASE-2026-00014",
    typeKey:
      "caseTypes.COMPLEX_IDENTITY_CONFLICT",
    biometric: "BIO-000795",
    current: "REF-001183",
    proposed: "REF-002343",
    confidence: "99.99%",
    priority: "HIGH",
    statusKey: "common.aiInvestigated",
    protective: "85.0",
    hasDetail: true,
  },
];


const agents = [
  {
    nameKey:
      "commandCenter.monitoringAgent",
    statusKey: "common.active",
    icon: Activity,
  },
  {
    nameKey:
      "commandCenter.reconciliationAgent",
    statusKey: "common.active",
    icon: Fingerprint,
  },
  {
    nameKey:
      "commandCenter.investigationAgent",
    statusKey: "common.active",
    icon: BrainCircuit,
  },
  {
    nameKey:
      "commandCenter.approvalWorkflow",
    statusKey: "common.ready",
    icon: UserCheck,
  },
  {
    nameKey:
      "commandCenter.verificationAgent",
    statusKey: "common.active",
    icon: ShieldCheck,
  },
];


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function MetricCard({
  item,
  t,
}) {
  const Icon =
    item.icon;

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
        {item.value}
      </div>

      <div className="metricTitle">
        {t(item.titleKey)}
      </div>

      <div className="metricSubtitle">
        {t(item.subtitleKey)}
      </div>
    </div>
  );
}


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


/* =========================================================
   PAGE
   ========================================================= */

export default function Home() {
  const {
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
              <Sparkles size={15} />

              {t("commandCenter.eyebrow")}
            </div>

            <h1>
              {t("commandCenter.title")}
            </h1>

            <p>
              {t("commandCenter.subtitle")}
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                {t("common.searchCase")}
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
                  {t("common.operations")}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            PROTECTIVE PRIORITY ALERT
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldCheck size={24} />
          </div>

          <div className="alertText">
            <strong>
              {t(
                "commandCenter.protectiveEngine"
              )}
            </strong>

            <span>
              {t(
                "commandCenter.protectiveMessage"
              )}
            </span>
          </div>

          <Link
            href="/cases"
            className="bannerButton"
            style={{
              textDecoration: "none",
            }}
          >
            {t("commandCenter.reviewCases")}

            <ChevronRight size={17} />
          </Link>
        </section>


        {/* ================================================
            KPI CARDS
            ================================================ */}

        <section className="statsGrid">
          {
            stats.map(
              (item) => (
                <MetricCard
                  key={item.titleKey}
                  item={item}
                  t={t}
                />
              )
            )
          }
        </section>


        {/* ================================================
            PRIORITY CASES + AGENT OPERATIONS
            ================================================ */}

        <section className="dashboardGrid">

          <div className="panel casesPanel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {t(
                    "commandCenter.aiPriorityQueue"
                  )}
                </div>

                <h2>
                  {t(
                    "commandCenter.casesRequiringAttention"
                  )}
                </h2>
              </div>

              <Link
                href="/cases"
                className="textButton"
                style={{
                  textDecoration: "none",
                }}
              >
                {t(
                  "commandCenter.viewAllCases"
                )}

                <ChevronRight size={16} />
              </Link>
            </div>


            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      {t("common.case")}
                    </th>

                    <th>
                      {t("common.type")}
                    </th>

                    <th>
                      {t("common.biometric")}
                    </th>

                    <th>
                      {t(
                        "commandCenter.aiIdentity"
                      )}
                    </th>

                    <th>
                      {t("common.confidence")}
                    </th>

                    <th>
                      {t("common.priority")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    cases.map(
                      (item) => (
                        <tr key={item.id}>
                          <td>
                            {
                              item.hasDetail
                                ? (
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
                                    {item.id}
                                  </Link>
                                )
                                : (
                                  <span
                                    className="caseId"
                                    style={{
                                      display:
                                        "inline-block",
                                    }}
                                  >
                                    {item.id}
                                  </span>
                                )
                            }

                            <div className="caseStatus">
                              {t(item.statusKey)}
                            </div>
                          </td>

                          <td>
                            {t(item.typeKey)}
                          </td>

                          <td className="mono">
                            {item.biometric}
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
                              {item.confidence}
                            </span>
                          </td>

                          <td>
                            <PriorityBadge
                              priority={
                                item.priority
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
          </div>


          {/* ==============================================
              AGENT OPERATIONS
              ============================================== */}

          <div className="panel agentPanel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {t(
                    "commandCenter.agenticAi"
                  )}
                </div>

                <h2>
                  {t(
                    "commandCenter.agentOperations"
                  )}
                </h2>
              </div>

              <BrainCircuit size={22} />
            </div>


            <div className="agentList">
              {
                agents.map(
                  (agent) => {
                    const Icon =
                      agent.icon;

                    return (
                      <div
                        className="agentItem"
                        key={agent.nameKey}
                      >
                        <div className="agentLeft">
                          <div className="agentIcon">
                            <Icon size={18} />
                          </div>

                          <div>
                            <strong>
                              {t(
                                agent.nameKey
                              )}
                            </strong>

                            <span>
                              {t(
                                "common.operational"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="agentStatus">
                          <div className="greenDot" />

                          {t(agent.statusKey)}
                        </div>
                      </div>
                    );
                  }
                )
              }
            </div>


            <div className="agentFooter">
              <div>
                <span>
                  {t("common.environment")}
                </span>

                <strong>
                  {t("common.syntheticDemo")}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    "common.processingState"
                  )}
                </span>

                <strong>
                  {t("common.operational")}
                </strong>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            VERIFIED CASE + PLATFORM HEALTH
            ================================================ */}

        <section className="lowerGrid">

          <div className="panel selectedCase">
            <div className="caseHeroHeader">
              <div>
                <div className="panelEyebrow">
                  {t(
                    "commandCenter.latestVerifiedProtectiveCase"
                  )}
                </div>

                <h2>
                  {VERIFIED_DEMO_CASE.id}
                </h2>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  justifyContent:
                    "flex-end",
                }}
              >
                <PriorityBadge
                  priority={
                    VERIFIED_DEMO_CASE.priority
                  }
                  t={t}
                />

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
                      "0 10px",
                    borderRadius:
                      "7px",
                    color:
                      "#59cfa0",
                    background:
                      "rgba(52,211,153,0.07)",
                    border:
                      "1px solid rgba(52,211,153,0.13)",
                    fontSize:
                      "10px",
                    fontWeight:
                      850,
                    letterSpacing:
                      "0.45px",
                  }}
                >
                  {t(
                    "statuses.VERIFIED_CLOSED"
                  )}
                </span>
              </div>
            </div>


            <div className="caseHeroBody">
              <div className="caseScore">
                <div className="scoreRing">
                  <strong>
                    {
                      VERIFIED_DEMO_CASE
                        .protectivePriority
                    }
                  </strong>

                  <span>
                    {t(
                      "common.protectivePriority"
                    )}
                  </span>
                </div>
              </div>


              <div className="caseDetails">
                <div className="detailRow">
                  <span>
                    {t(
                      "common.biometricRecord"
                    )}
                  </span>

                  <strong>
                    {
                      VERIFIED_DEMO_CASE
                        .biometricId
                    }
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "common.previousIdentity"
                    )}
                  </span>

                  <strong className="dangerText">
                    {
                      VERIFIED_DEMO_CASE
                        .currentIdentity
                    }
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "common.verifiedIdentity"
                    )}
                  </span>

                  <strong className="successText">
                    {
                      VERIFIED_DEMO_CASE
                        .canonicalIdentity
                    }
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t("common.confidence")}
                  </span>

                  <strong>
                    {
                      VERIFIED_DEMO_CASE
                        .aiConfidence
                    }%
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "commandCenter.harmImpact"
                    )}
                  </span>

                  <strong>
                    {
                      VERIFIED_DEMO_CASE
                        .harm
                    }
                    {" / 100"}
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t("common.verification")}
                  </span>

                  <strong className="successText">
                    {
                      VERIFIED_DEMO_CASE
                        .verification.status
                    }
                    {" · "}
                    {
                      VERIFIED_DEMO_CASE
                        .verification.score
                    }
                  </strong>
                </div>
              </div>
            </div>


            <div className="caseWarning">
              <AlertTriangle size={20} />

              <div>
                <strong>
                  {t(
                    "commandCenter.protectiveWrongPersonDetected"
                  )}
                </strong>

                <span>
                  {t(
                    "commandCenter.protectiveWrongPersonMessage"
                  )}
                </span>
              </div>
            </div>


            <div
              className="integrityInfo"
              style={{
                margin: "14px 0 0",
              }}
            >
              <CheckCircle2 size={21} />

              <div>
                <strong>
                  {t(
                    "commandCenter.endToEndVerificationPassed"
                  )}
                </strong>

                <span>
                  {t(
                    "commandCenter.verificationPassedMessage"
                  )}
                </span>
              </div>
            </div>


            <Link
              href={
                `/cases/${VERIFIED_DEMO_CASE.id}`
              }
              className="primaryButton"
              style={{
                textDecoration: "none",
              }}
            >
              {t(
                "commandCenter.viewVerifiedLifecycle"
              )}

              <ChevronRight size={18} />
            </Link>
          </div>


          {/* ==============================================
              DATA INTEGRITY HEALTH
              ============================================== */}

          <div className="panel integrityPanel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {t("dataIntegrity.title")}
                </div>

                <h2>
                  {t(
                    "commandCenter.platformHealth"
                  )}
                </h2>
              </div>

              <Database size={22} />
            </div>


            <div className="healthScore">
              <div>
                <span>
                  {t(
                    "commandCenter.canonicalCaseResolution"
                  )}
                </span>

                <strong>
                  53 / 53
                </strong>
              </div>

              <div className="progress">
                <div className="progressFill full" />
              </div>
            </div>


            <div className="healthScore">
              <div>
                <span>
                  {t(
                    "commandCenter.protectiveDetection"
                  )}
                </span>

                <strong>
                  100%
                </strong>
              </div>

              <div className="progress">
                <div className="progressFill full" />
              </div>
            </div>


            <div className="healthScore">
              <div>
                <span>
                  {t(
                    "commandCenter.unexplainedFalsePositives"
                  )}
                </span>

                <strong>
                  0
                </strong>
              </div>

              <div className="progress">
                <div className="progressFill zero" />
              </div>
            </div>


            <div className="integrityInfo">
              <ShieldCheck size={21} />

              <div>
                <strong>
                  {t(
                    "commandCenter.masterReferenceProtected"
                  )}
                </strong>

                <span>
                  {t(
                    "commandCenter.masterProtectionMessage"
                  )}
                </span>
              </div>
            </div>


            <Link
              href="/data-integrity"
              className="textButton"
              style={{
                textDecoration: "none",
                marginTop: "14px",
                marginLeft: "18px",
                width: "fit-content",
              }}
            >
              {t(
                "commandCenter.openDataIntegrityCenter"
              )}

              <ChevronRight size={16} />
            </Link>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            {t("footer.platform")}
            {" · "}
            {t("footer.demo")}
          </span>

          <div>
            <Clock3 size={15} />

            {t("footer.monitoring")}
          </div>
        </footer>

      </main>
    </div>
  );
}