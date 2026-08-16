import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  ChevronRight,
  CircleAlert,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  LayoutDashboard,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


const cases = [
  {
    id: "CASE-2026-00001",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000166",
    current: "REF-002711",
    proposed: "REF-001009",
    confidence: 99.99,
    risk: 94.99,
    harm: 97.5,
    protective: 98.0,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
  },
  {
    id: "CASE-2026-00002",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: 99.98,
    risk: 93.8,
    harm: 96.5,
    protective: 97.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
  },
  {
    id: "CASE-2026-00003",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: 99.98,
    risk: 96.2,
    harm: 96.0,
    protective: 97.0,
    priority: "IMMEDIATE",
    status: "AI_INVESTIGATED",
    affected: true,
    findings: 5,
  },
  {
    id: "CASE-2026-00004",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000714",
    current: "REF-002905",
    proposed: "REF-001337",
    confidence: 99.97,
    risk: 92.5,
    harm: 95.0,
    protective: 96.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
  },
  {
    id: "CASE-2026-00005",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000621",
    current: "REF-001912",
    proposed: "REF-002448",
    confidence: 99.96,
    risk: 95.0,
    harm: 94.5,
    protective: 96.0,
    priority: "IMMEDIATE",
    status: "AWAITING_MANAGER_APPROVAL",
    affected: true,
    findings: 4,
  },
  {
    id: "CASE-2026-00006",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000804",
    current: "REF-002130",
    proposed: "REF-000744",
    confidence: 99.96,
    risk: 91.5,
    harm: 94.0,
    protective: 95.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
  },
  {
    id: "CASE-2026-00007",
    type: "WRONG_MAPPING",
    title: "Incorrect Biometric Identity Mapping",
    biometric: "BIO-000207",
    current: "REF-001782",
    proposed: "REF-000431",
    confidence: 99.95,
    risk: 89.5,
    harm: 70.0,
    protective: 88.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 2,
  },
  {
    id: "CASE-2026-00008",
    type: "COMPLEX_IDENTITY_CONFLICT",
    title: "Complex Identity Conflict",
    biometric: "BIO-000422",
    current: "REF-002117",
    proposed: "REF-000905",
    confidence: 99.94,
    risk: 91.0,
    harm: 72.0,
    protective: 87.0,
    priority: "HIGH",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 5,
  },
  {
    id: "CASE-2026-00009",
    type: "DUPLICATE_IDENTITY",
    title: "Duplicate Identity Registration",
    biometric: "BIO-000612",
    current: "REF-000374",
    proposed: "REF-000374",
    confidence: 99.92,
    risk: 83.0,
    harm: 55.0,
    protective: 82.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 3,
  },
  {
    id: "CASE-2026-00010",
    type: "COMPLEX_IDENTITY_CONFLICT",
    title: "Complex Identity Conflict",
    biometric: "BIO-000795",
    current: "REF-001183",
    proposed: "REF-002343",
    confidence: 99.99,
    risk: 90.0,
    harm: 60.0,
    protective: 85.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 5,
  },
  {
    id: "CASE-2026-00011",
    type: "DATA_MISMATCH",
    title: "Identity Data Mismatch",
    biometric: "BIO-000318",
    current: "REF-002204",
    proposed: "REF-002204",
    confidence: 99.91,
    risk: 61.0,
    harm: 35.0,
    protective: 58.0,
    priority: "MEDIUM",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 1,
  },
  {
    id: "CASE-2026-00012",
    type: "ORPHAN_RECORD",
    title: "Orphan Biometric Record",
    biometric: "BIO-000909",
    current: "REF-INVALID",
    proposed: "REF-001567",
    confidence: 99.90,
    risk: 76.0,
    harm: 45.0,
    protective: 70.0,
    priority: "MEDIUM",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 1,
  },
];


function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandIcon">
          <Fingerprint size={25} />
        </div>

        <div>
          <div className="brandTitle">
            Identity AI
          </div>

          <div className="brandSubtitle">
            Reconciliation Platform
          </div>
        </div>
      </div>

      <nav className="navigation">
        <div className="navLabel">
          WORKSPACE
        </div>

        <Link
          className="navItem"
          href="/"
        >
          <LayoutDashboard size={19} />
          <span>Command Center</span>
        </Link>

        <Link
          className="navItem active"
          href="/cases"
        >
          <FileSearch size={19} />
          <span>Cases</span>
          <span className="navCount">53</span>
        </Link>

        <div className="navItem">
          <BrainCircuit size={19} />
          <span>AI Investigations</span>
        </div>

        <div className="navItem">
          <UserCheck size={19} />
          <span>Officer Review</span>
        </div>

        <div className="navItem">
          <BadgeCheck size={19} />
          <span>Manager Approval</span>
        </div>

        <div className="navLabel navSecond">
          INTELLIGENCE
        </div>

        <div className="navItem">
          <Gauge size={19} />
          <span>Analytics</span>
        </div>

        <div className="navItem">
          <Database size={19} />
          <span>Data Integrity</span>
        </div>

        <div className="navItem">
          <Activity size={19} />
          <span>Audit Trail</span>
        </div>
      </nav>

      <div className="sidebarFooter">
        <div className="systemDot" />

        <div>
          <div className="systemTitle">
            System Operational
          </div>

          <div className="systemSubtitle">
            Synthetic Demo Environment
          </div>
        </div>
      </div>
    </aside>
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


function StatusBadge({ status }) {
  const labels = {
    READY_FOR_OFFICER_REVIEW:
      "Officer Review",

    AWAITING_MANAGER_APPROVAL:
      "Manager Approval",

    AI_INVESTIGATED:
      "AI Investigated",

    VERIFIED_CLOSED:
      "Closed",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        color:
          status === "AWAITING_MANAGER_APPROVAL"
            ? "#ffbb5d"
            : "#79a9ff",
        fontSize: "9px",
        fontWeight: 700,
        marginTop: "5px",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background:
            status === "AWAITING_MANAGER_APPROVAL"
              ? "#ffbb5d"
              : "#5c99ff",
        }}
      />

      {labels[status] || status}
    </span>
  );
}


function MiniMetric({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={19} />
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


export default function CasesPage() {
  return (
    <div className="appShell">
      <Sidebar />

      <main className="mainContent">
        <header className="topbar">
          <div>
            <div className="eyebrow">
              <FileSearch size={15} />
              IDENTITY INTEGRITY OPERATIONS
            </div>

            <h1>Cases</h1>

            <p>
              AI-detected identity integrity
              issues prioritized by risk,
              potential harm and protective
              urgency.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />
              <span>
                Search Case ID / Identity
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
                  Identity Operations
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            PROTECTIVE WARNING
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldAlert size={24} />
          </div>

          <div className="alertText">
            <strong>
              Wrong-Person Protection Queue
            </strong>

            <span>
              Cases where an unrelated person
              may be negatively affected are
              automatically moved to the top of
              the investigation queue.
            </span>
          </div>

          <div
            className="priority immediate"
            style={{
              height: "31px",
              padding: "0 12px",
            }}
          >
            9 IMMEDIATE
          </div>
        </section>


        {/* ================================================
            CASE KPIs
            ================================================ */}

        <section className="statsGrid">
          <MiniMetric
            icon={FileSearch}
            label="Total Cases"
            value="53"
            description="Aggregated AI investigation cases"
          />

          <MiniMetric
            icon={CircleAlert}
            label="Immediate"
            value="9"
            description="Protective intervention priority"
          />

          <MiniMetric
            icon={AlertTriangle}
            label="High Priority"
            value="23"
            description="Accelerated human review"
          />

          <MiniMetric
            icon={ShieldCheck}
            label="Identity Resolved"
            value="53"
            description="Canonical identity candidate identified"
          />
        </section>


        {/* ================================================
            FILTERS
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "14px",
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              className="primaryButton"
              style={{
                width: "auto",
                marginTop: 0,
                padding: "0 17px",
              }}
            >
              All Cases

              <span
                style={{
                  opacity: 0.7,
                }}
              >
                53
              </span>
            </button>

            <button className="searchButton">
              Immediate
              <span>9</span>
            </button>

            <button className="searchButton">
              High
              <span>23</span>
            </button>

            <button className="searchButton">
              Medium
              <span>21</span>
            </button>

            <button className="searchButton">
              Wrong Person Impact
              <span>9</span>
            </button>

            <button className="searchButton">
              Waiting Officer
            </button>

            <button className="searchButton">
              Waiting Manager
            </button>
          </div>
        </section>


        {/* ================================================
            CASE TABLE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AI PRIORITY QUEUE
              </div>

              <h2>
                Identity Reconciliation Cases
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#62758e",
                fontSize: "9px",
              }}
            >
              <Activity size={15} />

              Continuously monitored
            </div>
          </div>

          <div className="tableWrap">
            <table
              style={{
                minWidth: "1180px",
              }}
            >
              <thead>
                <tr>
                  <th>CASE</th>
                  <th>ERROR TYPE</th>
                  <th>BIOMETRIC</th>
                  <th>IDENTITY RESOLUTION</th>
                  <th>AI CONFIDENCE</th>
                  <th>RISK</th>
                  <th>HARM</th>
                  <th>PROTECTIVE</th>
                  <th>PRIORITY</th>
                  <th></th>
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

                      <StatusBadge
                        status={item.status}
                      />
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {item.affected ? (
                          <ShieldAlert
                            size={15}
                            color="#ff6f7e"
                          />
                        ) : (
                          <Fingerprint
                            size={15}
                            color="#609aff"
                          />
                        )}

                        <div>
                          <div
                            style={{
                              color: "#d2deec",
                              fontWeight: 650,
                              fontSize: "9px",
                            }}
                          >
                            {item.title}
                          </div>

                          <div
                            style={{
                              color: "#566a84",
                              fontSize: "8px",
                              marginTop: "4px",
                            }}
                          >
                            {item.type}
                            {" · "}
                            {item.findings}
                            {" findings"}
                          </div>
                        </div>
                      </div>
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
                        {item.confidence}%
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          color:
                            item.risk >= 90
                              ? "#ff7d8b"
                              : item.risk >= 80
                                ? "#ffbd67"
                                : "#9eafc3",
                          fontWeight: 750,
                        }}
                      >
                        {item.risk}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          color:
                            item.harm >= 90
                              ? "#ff7d8b"
                              : "#9eafc3",
                          fontWeight: 750,
                        }}
                      >
                        {item.harm}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          color:
                            item.protective >= 95
                              ? "#ff7d8b"
                              : "#77aaff",
                          fontWeight: 750,
                        }}
                      >
                        {item.protective}
                      </span>
                    </td>

                    <td>
                      <PriorityBadge
                        priority={item.priority}
                      />
                    </td>

                    <td>
                      <Link
                        href={`/cases/${item.id}`}
                        aria-label={`Open ${item.id}`}
                        style={{
                          width: "31px",
                          height: "31px",
                          borderRadius: "9px",
                          display: "grid",
                          placeItems: "center",
                          border:
                            "1px solid rgba(255,255,255,0.07)",
                          background:
                            "rgba(255,255,255,0.025)",
                          color: "#7098d6",
                          textDecoration: "none",
                        }}
                      >
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: "14px 18px",
              borderTop:
                "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#53667f",
              fontSize: "9px",
            }}
          >
            <span>
              Showing 12 of 53 cases
            </span>

            <span>
              Sorted by Protective Priority
              → Harm → Risk → AI Confidence
            </span>
          </div>
        </section>


        {/* ================================================
            ERROR TYPE SUMMARY
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
          }}
        >
          <div
            className="panel"
            style={{
              paddingBottom: "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  ERROR CLASSIFICATION
                </div>

                <h2>
                  Detected Registration Errors
                </h2>
              </div>

              <Fingerprint size={22} />
            </div>

            {[
              ["Harm Impact", 9],
              ["Wrong Mapping", 11],
              ["Complex Identity Conflict", 8],
              ["Duplicate Identity", 6],
              ["Data Mismatch", 15],
              ["Orphan Record", 4],
            ].map(([label, value]) => (
              <div
                key={label}
                className="detailRow"
                style={{
                  margin: "0 19px",
                }}
              >
                <span>{label}</span>

                <strong>{value}</strong>
              </div>
            ))}
          </div>


          <div
            className="panel"
            style={{
              paddingBottom: "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE SAFETY MODEL
                </div>

                <h2>
                  Protective AI Controls
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            <div
              className="integrityInfo"
              style={{
                marginTop: "16px",
              }}
            >
              <ShieldCheck size={21} />

              <div>
                <strong>
                  Master Reference Read Only
                </strong>

                <span>
                  AI cannot automatically modify
                  the authoritative identity
                  source.
                </span>
              </div>
            </div>

            <div className="integrityInfo">
              <UserCheck size={21} />

              <div>
                <strong>
                  Two-Level Human Approval
                </strong>

                <span>
                  Monitoring Officer and Manager
                  approval are required before
                  sensitive correction execution.
                </span>
              </div>
            </div>

            <div className="integrityInfo">
              <BadgeCheck size={21} />

              <div>
                <strong>
                  Post-Correction Verification
                </strong>

                <span>
                  Every executed correction must
                  pass verification before the
                  case can be closed.
                </span>
              </div>
            </div>
          </div>
        </section>


        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Synthetic Demonstration
          </span>

          <div>
            <Activity size={15} />
            Continuous Monitoring Active
          </div>
        </footer>
      </main>
    </div>
  );
}