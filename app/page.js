import Link from "next/link";

import Sidebar from "./components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
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


const stats = [
  {
    title: "Active Cases",
    value: "53",
    subtitle: "AI-generated investigation cases",
    icon: FileSearch,
  },
  {
    title: "Immediate Priority",
    value: "9",
    subtitle: "Protective intervention required",
    icon: CircleAlert,
  },
  {
    title: "High Priority",
    value: "23",
    subtitle: "Require accelerated review",
    icon: AlertTriangle,
  },
  {
    title: "Unresolved Identity",
    value: "0",
    subtitle: "All cases have identity candidates",
    icon: UserCheck,
  },
];


const cases = [
  {
    id: "CASE-2026-00001",
    type: "HARM IMPACT",
    biometric: "BIO-000166",
    current: "REF-002711",
    proposed: "REF-001009",
    confidence: "99.99%",
    priority: "IMMEDIATE",
    status: "Ready for Review",
    protective: "98.0",
  },
  {
    id: "CASE-2026-00002",
    type: "CRITICAL HARM CONFLICT",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: "99.98%",
    priority: "IMMEDIATE",
    status: "Ready for Review",
    protective: "97.5",
  },
  {
    id: "CASE-2026-00003",
    type: "HARM IMPACT",
    biometric: "BIO-000714",
    current: "REF-002905",
    proposed: "REF-001337",
    confidence: "99.97%",
    priority: "IMMEDIATE",
    status: "Ready for Review",
    protective: "97.0",
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


function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={20} />
        </div>

        <span className="metricStatus">
          LIVE
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


function PriorityBadge({ priority }) {
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
              9 cases are currently prioritized
              because another person may be
              wrongly affected by an identity
              conflict.
            </span>
          </div>

          <Link
            href="/cases"
            className="bannerButton"
            style={{
              textDecoration: "none",
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
          {stats.map((item) => (
            <MetricCard
              key={item.title}
              item={item}
            />
          ))}
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
                  textDecoration: "none",
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
                  {cases.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Link
                          href={`/cases/${item.id}`}
                          className="caseId"
                          style={{
                            textDecoration: "none",
                            display: "inline-block",
                          }}
                        >
                          {item.id}
                        </Link>

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
                          priority={item.priority}
                        />
                      </td>
                    </tr>
                  ))}
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
              {agents.map((agent) => {
                const Icon = agent.icon;

                return (
                  <div
                    className="agentItem"
                    key={agent.name}
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
              })}
            </div>


            <div className="agentFooter">
              <div>
                <span>
                  Last reconciliation
                </span>

                <strong>
                  Just now
                </strong>
              </div>

              <div>
                <span>
                  Processing state
                </span>

                <strong>
                  Healthy
                </strong>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            HIGHEST PRIORITY CASE + PLATFORM HEALTH
            ================================================ */}

        <section className="lowerGrid">

          {/* ==============================================
              HIGHEST PRIORITY CASE
              ============================================== */}

          <div className="panel selectedCase">
            <div className="caseHeroHeader">
              <div>
                <div className="panelEyebrow">
                  HIGHEST PROTECTIVE PRIORITY
                </div>

                <h2>
                  CASE-2026-00001
                </h2>
              </div>

              <PriorityBadge
                priority="IMMEDIATE"
              />
            </div>


            <div className="caseHeroBody">
              <div className="caseScore">
                <div className="scoreRing">
                  <strong>
                    98
                  </strong>

                  <span>
                    Priority
                  </span>
                </div>
              </div>


              <div className="caseDetails">
                <div className="detailRow">
                  <span>
                    Biometric record
                  </span>

                  <strong>
                    BIO-000166
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Current identity
                  </span>

                  <strong className="dangerText">
                    REF-002711
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    AI proposed identity
                  </span>

                  <strong className="successText">
                    REF-001009
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    AI confidence
                  </span>

                  <strong>
                    99.99%
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Harm impact
                  </span>

                  <strong>
                    97.5 / 100
                  </strong>
                </div>
              </div>
            </div>


            <div className="caseWarning">
              <AlertTriangle size={20} />

              <div>
                <strong>
                  Potential wrong-person impact detected
                </strong>

                <span>
                  AI evidence indicates that
                  adverse information may be
                  affecting an unrelated identity.
                  Immediate human review is
                  recommended.
                </span>
              </div>
            </div>


            <Link
              href="/cases/CASE-2026-00001"
              className="primaryButton"
              style={{
                textDecoration: "none",
              }}
            >
              Open AI Investigation

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
                  Identity resolution
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
                  Unexplained false alerts
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
                  AI agents operate in read-only
                  mode against the authoritative
                  identity source.
                </span>
              </div>
            </div>


            <Link
              href="/data-integrity"
              className="textButton"
              style={{
                textDecoration: "none",
                marginTop: "14px",
                width: "fit-content",
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