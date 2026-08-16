"use client";

import Link from "next/link";

import Sidebar from "./components/Sidebar";
import { useLanguage } from "./components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
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
   COMMAND CENTER METRICS

   All authoritative values are derived from demo-data.js.
   ========================================================= */

const stats = [
  {
    titleKey:
      "commandCenter.totalCases",

    value:
      String(
        PLATFORM_METRICS.aggregatedCases
      ),

    subtitleKey:
      "commandCenter.totalCasesSubtitle",

    icon:
      FileSearch,
  },

  {
    titleKey:
      "commandCenter.immediatePriority",

    value:
      String(
        PLATFORM_METRICS.priority.immediate
      ),

    subtitleKey:
      "commandCenter.immediatePrioritySubtitle",

    icon:
      CircleAlert,
  },

  {
    titleKey:
      "commandCenter.highPriority",

    value:
      String(
        PLATFORM_METRICS.priority.high
      ),

    subtitleKey:
      "commandCenter.highPrioritySubtitle",

    icon:
      AlertTriangle,
  },

  {
    titleKey:
      "commandCenter.unresolvedIdentity",

    value:
      String(
        PLATFORM_METRICS.unresolvedIdentityCases
      ),

    subtitleKey:
      "commandCenter.unresolvedIdentitySubtitle",

    icon:
      UserCheck,
  },
];


/* =========================================================
   CURRENT ATTENTION QUEUE

   CASE-2026-00014 is linked directly to the authoritative
   shared complex demo case.

   Other rows are illustrative queue records used only
   for the frontend demonstration.
   ========================================================= */

const attentionCases = [
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
      "99.98%",

    priority:
      "IMMEDIATE",

    status:
      "OFFICER_REVIEW",

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00003",

    type:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    biometric:
      "BIO-000492",

    current:
      "REF-001547",

    proposed:
      "REF-000621",

    confidence:
      "99.98%",

    priority:
      "IMMEDIATE",

    status:
      "AI_INVESTIGATED",

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
      `${COMPLEX_DEMO_CASE.aiConfidence}%`,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      COMPLEX_DEMO_CASE.finalStatus,

    hasDetail:
      true,
  },
];


/* =========================================================
   AGENT OPERATIONS
   ========================================================= */

const agents = [
  {
    nameKey:
      "commandCenter.monitoringAgent",

    statusKey:
      "common.active",

    icon:
      Activity,
  },

  {
    nameKey:
      "commandCenter.reconciliationAgent",

    statusKey:
      "common.active",

    icon:
      Fingerprint,
  },

  {
    nameKey:
      "commandCenter.investigationAgent",

    statusKey:
      "common.active",

    icon:
      BrainCircuit,
  },

  {
    nameKey:
      "commandCenter.approvalWorkflow",

    statusKey:
      "common.ready",

    icon:
      UserCheck,
  },

  {
    nameKey:
      "commandCenter.verificationAgent",

    statusKey:
      "common.active",

    icon:
      ShieldCheck,
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

function getCaseTypeLabel(
  type,
  t
) {
  const key =
    `caseTypes.${type}`;

  return t(
    key,
    type
  );
}


function getPriorityLabel(
  priority,
  t
) {
  return t(
    `priorities.${priority}`,
    priority
  );
}


function getStatusLabel(
  status,
  t
) {
  if (
    status ===
    "OFFICER_REVIEW"
  ) {
    return t(
      "common.officerReview"
    );
  }

  return t(
    `statuses.${status}`,
    status
  );
}


/* =========================================================
   METRIC CARD
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
      {getPriorityLabel(
        priority,
        t
      )}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function Home() {
  const {
    language,
    t,
  } = useLanguage();

  const isArabic =
    language === "ar";

  const arrowStyle = {
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
              <Sparkles
                size={15}
                aria-hidden="true"
              />

              {t(
                "commandCenter.eyebrow"
              )}
            </div>

            <h1>
              {t(
                "commandCenter.title"
              )}
            </h1>

            <p>
              {t(
                "commandCenter.subtitle"
              )}
            </p>
          </div>


          <div className="topbarActions">
            <Link
              href="/cases"
              className="searchButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>
                {t(
                  "common.searchCase"
                )}
              </span>
            </Link>


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
                  {t(
                    "common.operations"
                  )}
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
            <ShieldCheck
              size={24}
              aria-hidden="true"
            />
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
              textDecoration:
                "none",
            }}
          >
            {t(
              "commandCenter.reviewCases"
            )}

            <ChevronRight
              size={17}
              style={arrowStyle}
              aria-hidden="true"
            />
          </Link>
        </section>


        {/* ================================================
            KPI CARDS
            ================================================ */}

        <section className="statsGrid">
          {stats.map(
            (item) => (
              <MetricCard
                key={
                  item.titleKey
                }
                item={item}
                t={t}
              />
            )
          )}
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
                  textDecoration:
                    "none",
                }}
              >
                {t(
                  "commandCenter.viewAllCases"
                )}

                <ChevronRight
                  size={16}
                  style={arrowStyle}
                  aria-hidden="true"
                />
              </Link>
            </div>


            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      {t(
                        "common.case"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.type"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.biometric"
                      )}
                    </th>

                    <th>
                      {t(
                        "commandCenter.aiIdentity"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.confidence"
                      )}
                    </th>

                    <th>
                      {t(
                        "common.priority"
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attentionCases.map(
                    (item) => (
                      <tr
                        key={item.id}
                      >
                        <td>
                          {item.hasDetail ? (
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
                          ) : (
                            <span
                              className="caseId"
                              style={{
                                display:
                                  "inline-block",
                              }}
                              dir="ltr"
                            >
                              {item.id}
                            </span>
                          )}

                          <div className="caseStatus">
                            {getStatusLabel(
                              item.status,
                              t
                            )}
                          </div>
                        </td>


                        <td>
                          {getCaseTypeLabel(
                            item.type,
                            t
                          )}
                        </td>


                        <td
                          className="mono"
                          dir="ltr"
                        >
                          {item.biometric}
                        </td>


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
                  )}
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

              <BrainCircuit
                size={22}
                aria-hidden="true"
              />
            </div>


            <div className="agentList">
              {agents.map(
                (agent) => {
                  const Icon =
                    agent.icon;

                  return (
                    <div
                      className="agentItem"
                      key={
                        agent.nameKey
                      }
                    >
                      <div className="agentLeft">
                        <div className="agentIcon">
                          <Icon
                            size={18}
                            aria-hidden="true"
                          />
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
                        <div
                          className="greenDot"
                          aria-hidden="true"
                        />

                        {t(
                          agent.statusKey
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>


            <div className="agentFooter">
              <div>
                <span>
                  {t(
                    "common.environment"
                  )}
                </span>

                <strong>
                  {t(
                    "common.syntheticDemo"
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    "common.processingState"
                  )}
                </span>

                <strong>
                  {t(
                    "common.operational"
                  )}
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

                <h2 dir="ltr">
                  {
                    VERIFIED_DEMO_CASE.id
                  }
                </h2>
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "8px",
                  flexWrap:
                    "wrap",
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
                    `statuses.${VERIFIED_DEMO_CASE.finalStatus}`,
                    VERIFIED_DEMO_CASE.finalStatus
                  )}
                </span>
              </div>
            </div>


            <div className="caseHeroBody">
              <div className="caseScore">
                <div className="scoreRing">
                  <strong>
                    {
                      VERIFIED_DEMO_CASE.protectivePriority
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

                  <strong dir="ltr">
                    {
                      VERIFIED_DEMO_CASE.biometricId
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "common.previousIdentity"
                    )}
                  </span>

                  <strong
                    className="dangerText"
                    dir="ltr"
                  >
                    {
                      VERIFIED_DEMO_CASE.currentIdentity
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "common.verifiedIdentity"
                    )}
                  </span>

                  <strong
                    className="successText"
                    dir="ltr"
                  >
                    {
                      VERIFIED_DEMO_CASE.canonicalIdentity
                    }
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "common.confidence"
                    )}
                  </span>

                  <strong>
                    {
                      VERIFIED_DEMO_CASE.aiConfidence
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
                      VERIFIED_DEMO_CASE.harm
                    }
                    {" / 100"}
                  </strong>
                </div>


                <div className="detailRow">
                  <span>
                    {t(
                      "common.verification"
                    )}
                  </span>

                  <strong className="successText">
                    {t(
                      `statuses.${VERIFIED_DEMO_CASE.verification.status}`,
                      VERIFIED_DEMO_CASE.verification.status
                    )}

                    {" · "}

                    {
                      VERIFIED_DEMO_CASE.verification.score
                    }
                  </strong>
                </div>
              </div>
            </div>


            <div className="caseWarning">
              <AlertTriangle
                size={20}
                aria-hidden="true"
              />

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
                margin:
                  "14px 0 0",
              }}
            >
              <CheckCircle2
                size={21}
                aria-hidden="true"
              />

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
                textDecoration:
                  "none",
              }}
            >
              {t(
                "commandCenter.viewVerifiedLifecycle"
              )}

              <ChevronRight
                size={18}
                style={arrowStyle}
                aria-hidden="true"
              />
            </Link>
          </div>


          {/* ==============================================
              DATA INTEGRITY HEALTH
              ============================================== */}

          <div className="panel integrityPanel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {t(
                    "dataIntegrity.title"
                  )}
                </div>

                <h2>
                  {t(
                    "commandCenter.platformHealth"
                  )}
                </h2>
              </div>

              <Database
                size={22}
                aria-hidden="true"
              />
            </div>


            <div className="healthScore">
              <div>
                <span>
                  {t(
                    "commandCenter.canonicalCaseResolution"
                  )}
                </span>

                <strong>
                  {
                    PLATFORM_METRICS.aggregatedCases
                  }
                  {" / "}
                  {
                    PLATFORM_METRICS.aggregatedCases
                  }
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
                  {
                    PLATFORM_METRICS.evaluation.protectiveDetectionRecall
                  }%
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
                  {
                    PLATFORM_METRICS.evaluation.unexplainedFalsePositives
                  }
                </strong>
              </div>

              <div className="progress">
                <div className="progressFill zero" />
              </div>
            </div>


            <div className="integrityInfo">
              <ShieldCheck
                size={21}
                aria-hidden="true"
              />

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
                textDecoration:
                  "none",

                marginTop:
                  "14px",

                marginInlineStart:
                  "18px",

                width:
                  "fit-content",
              }}
            >
              {t(
                "commandCenter.openDataIntegrityCenter"
              )}

              <ChevronRight
                size={16}
                style={arrowStyle}
                aria-hidden="true"
              />
            </Link>
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
              "footer.demo"
            )}
          </span>

          <div>
            <Clock3
              size={15}
              aria-hidden="true"
            />

            {t(
              "footer.monitoring"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}