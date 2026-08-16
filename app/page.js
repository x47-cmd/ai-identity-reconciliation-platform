import Link from "next/link";

import Sidebar from "./components/Sidebar";

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

   Synthetic Demo Only
   ========================================================= */

const stats = [
  {
    title: "Total Cases",
    value: "53",
    subtitle: "Aggregated identity integrity cases",
    icon: FileSearch,
  },
  {
    title: "Immediate Priority",
    value: "9",
    subtitle: "Protective intervention priority",
    icon: CircleAlert,
  },
  {
    title: "High Priority",
    value: "23",
    subtitle: "Require accelerated human review",
    icon: AlertTriangle,
  },
  {
    title: "Unresolved Identity",
    value: "0",
    subtitle: "All cases have canonical candidates",
    icon: UserCheck,
  },
];


/* =========================================================
   CURRENT ATTENTION QUEUE

   CASE-2026-00001 is intentionally excluded because the
   verified E2E demonstration case is already VERIFIED_CLOSED.

   Queue identities below are aligned with the Cases workspace.

   Only cases with implemented detail routes are linked.
   ========================================================= */

const cases = [
  {
    id: "CASE-2026-00002",
    type: "HARM IMPACT",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: "99.98%",
    priority: "IMMEDIATE",
    status: "Officer Review",
    protective: "97.5",
    hasDetail: false,
  },
  {
    id: "CASE-2026-00003",
    type: "CRITICAL HARM CONFLICT",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: "99.98%",
    priority: "IMMEDIATE",
    status: "AI Investigated",
    protective: "97.0",
    hasDetail: false,
  },
  {
    id: "CASE-2026-00014",
    type: "COMPLEX IDENTITY CONFLICT",
    biometric: "BIO-000795",
    current: "REF-001183",
    proposed: "REF-002343",
    confidence: "99.99%",
    priority: "HIGH",
    status: "AI Investigated",
    protective: "85.0",
    hasDetail: true,
  },
];


const agents = [
  {
    name: "Monitoring Agent",
    status: "Active",
    icon: Activity,
  },
  {
    name: "Reconciliation Agent",
    status: "Active",
    icon: Fingerprint,
  },
  {
    name: "Investigation Agent",
    status: "Active",
    icon: BrainCircuit,
  },
  {
    name: "Approval Workflow",
    status: "Ready",
    icon: UserCheck,
  },
  {
    name: "Verification Agent",
    status: "Active",
    icon: ShieldCheck,
  },
];


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function MetricCard({
  item,
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
          DEMO KPI
        </span>
      </div>

      <div className="metricValue">
        {item.value}
      </div>

      <div className="metricTitle">
        {item.title}
      </div>

      <div className="metricSubtitle">
        {item.subtitle}
      </div>
    </div>
  );
}


function PriorityBadge({
  priority,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";

  return (
    <span className={className}>
      {priority}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function Home() {
  return (
    <div className="appShell">

      {/* ================================================
          SHARED PLATFORM SIDEBAR
          ================================================ */}

      <Sidebar />


      <main className="mainContent">

        {/* ================================================
            HEADER
            ================================================ */}

        <header className="topbar">
          <div>
            <div className="eyebrow">
              <Sparkles size={15} />

              AI IDENTITY OPERATIONS
            </div>

            <h1>
              Command Center
            </h1>

            <p>
              Continuous identity reconciliation,
              protective risk detection and
              AI-assisted investigation.
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search case
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                MO
              </div>

              <div className="profileText">
                <strong>
                  Monitoring Officer
                </strong>

                <span>
                  Operations
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
              Protective Priority Engine Active
            </strong>

            <span>
              9 protective cases were identified
              in the current synthetic demo dataset
              where identity conflicts may create
              potential wrong-person impact.
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
            Review Cases

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
                  key={
                    item.title
                  }
                  item={
                    item
                  }
                />
              )
            )
          }
        </section>


        {/* ================================================
            PRIORITY CASES + AGENT OPERATIONS
            ================================================ */}

        <section className="dashboardGrid">

          {/* ==============================================
              CASE PRIORITY QUEUE
              ============================================== */}

          <div className="panel casesPanel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  AI PRIORITY QUEUE
                </div>

                <h2>
                  Cases Requiring Attention
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
                View all cases

                <ChevronRight size={16} />
              </Link>
            </div>


            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>CASE</th>
                    <th>TYPE</th>
                    <th>BIOMETRIC</th>
                    <th>AI IDENTITY</th>
                    <th>CONFIDENCE</th>
                    <th>PRIORITY</th>
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
                              {item.status}
                            </div>
                          </td>

                          <td>
                            {item.type}
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
                  AGENTIC AI
                </div>

                <h2>
                  Agent Operations
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
                        key={
                          agent.name
                        }
                      >
                        <div className="agentLeft">
                          <div className="agentIcon">
                            <Icon size={18} />
                          </div>

                          <div>
                            <strong>
                              {agent.name}
                            </strong>

                            <span>
                              Operational
                            </span>
                          </div>
                        </div>

                        <div className="agentStatus">
                          <div className="greenDot" />

                          {agent.status}
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
                  Environment
                </span>

                <strong>
                  Synthetic Demo
                </strong>
              </div>

              <div>
                <span>
                  Processing state
                </span>

                <strong>
                  Operational
                </strong>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            VERIFIED DEMO CASE + PLATFORM HEALTH
            ================================================ */}

        <section className="lowerGrid">

          {/* ==============================================
              LATEST VERIFIED PROTECTIVE CASE
              ============================================== */}

          <div className="panel selectedCase">
            <div className="caseHeroHeader">
              <div>
                <div className="panelEyebrow">
                  LATEST VERIFIED PROTECTIVE CASE
                </div>

                <h2>
                  {VERIFIED_DEMO_CASE.id}
                </h2>
              </div>

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

                  justifyContent:
                    "flex-end",
                }}
              >
                <PriorityBadge
                  priority={
                    VERIFIED_DEMO_CASE.priority
                  }
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
                  VERIFIED CLOSED
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
                    Protective
                  </span>
                </div>
              </div>


              <div className="caseDetails">
                <div className="detailRow">
                  <span>
                    Biometric record
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
                    Previous identity
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
                    Verified identity
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
                    AI confidence
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
                    Harm impact
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
                    Verification
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
                  Protective wrong-person impact
                  was detected
                </strong>

                <span>
                  The identity conflict was assigned
                  immediate protective priority,
                  reviewed by both required human
                  approval levels, corrected in the
                  permitted target and subsequently
                  verified closed.
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
              <CheckCircle2 size={21} />

              <div>
                <strong>
                  End-to-End Verification Passed
                </strong>

                <span>
                  The approved correction passed
                  post-correction verification and
                  reached VERIFIED_CLOSED status.
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
              View Verified Case Lifecycle

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
                  DATA INTEGRITY
                </div>

                <h2>
                  Platform Health
                </h2>
              </div>

              <Database size={22} />
            </div>


            <div className="healthScore">
              <div>
                <span>
                  Canonical case resolution
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
                  Protective detection
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
                  Unexplained false positives
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
                  Master Reference protected
                </strong>

                <span>
                  The authoritative Master
                  Reference remains read only.
                  Automated corrections target
                  only the permitted Biometric
                  System runtime dataset after
                  required human approval.
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

                marginLeft:
                  "18px",

                width:
                  "fit-content",
              }}
            >
              Open Data Integrity Center

              <ChevronRight size={16} />
            </Link>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Synthetic Demonstration
          </span>

          <div>
            <Clock3 size={15} />

            Continuous Monitoring Active
          </div>
        </footer>

      </main>
    </div>
  );
}