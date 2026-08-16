import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
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


const officerCases = [
  {
    id: "CASE-2026-00001",
    title: "Potential Wrong-Person Harm",
    type: "HARM_IMPACT",
    biometric: "BIO-000166",
    current: "REF-002711",
    proposed: "REF-001009",
    confidence: 99.99,
    risk: 94.99,
    harm: 97.5,
    protective: 98.0,
    priority: "IMMEDIATE",
    affected: true,
    age: "4 min",
    findings: 2,
  },
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
    age: "7 min",
    findings: 2,
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
    age: "11 min",
    findings: 2,
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
    age: "14 min",
    findings: 2,
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
    age: "19 min",
    findings: 5,
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
    age: "26 min",
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
          className="navItem"
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

        <Link
          className="navItem active"
          href="/officer-review"
        >
          <UserCheck size={19} />
          <span>Officer Review</span>
          <span className="navCount">6</span>
        </Link>

        <Link
          className="navItem"
          href="/manager-approval"
        >
          <BadgeCheck size={19} />
          <span>Manager Approval</span>
        </Link>

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


export default function OfficerReviewPage() {
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
              HUMAN-IN-THE-LOOP · LEVEL 1
            </div>

            <h1>
              Officer Review
            </h1>

            <p>
              Review AI investigation evidence,
              validate proposed corrections and
              decide whether a case should advance
              to Manager approval.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search review queue
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
                  Level 1 Reviewer
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
              4 Wrong-Person Impact Cases
              Require Immediate Review
            </strong>

            <span>
              Protective cases are placed ahead
              of normal technical cases because
              an unrelated person may currently
              be affected by incorrect identity
              data.
            </span>
          </div>

          <div
            className="priority immediate"
            style={{
              height: "31px",
              padding: "0 12px",
            }}
          >
            REVIEW NOW
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={UserCheck}
            label="Awaiting Officer"
            value="6"
            description="Cases ready for Level 1 review"
          />

          <Metric
            icon={CircleAlert}
            label="Immediate"
            value="4"
            description="Wrong-person protective cases"
          />

          <Metric
            icon={BrainCircuit}
            label="AI Investigated"
            value="6"
            description="Evidence packages completed"
          />

          <Metric
            icon={BadgeCheck}
            label="Sent to Manager"
            value="1"
            description="Officer-approved cases"
          />
        </section>


        {/* ================================================
            REVIEW GOVERNANCE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "14px",
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
                Officer Review Control
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#63768f",
                  fontSize: "9px",
                  lineHeight: 1.6,
                  marginTop: "4px",
                }}
              >
                AI recommendations cannot authorize
                corrections. A Monitoring Officer
                must review the evidence and record
                a human decision before Manager
                approval becomes available.
              </span>
            </div>

            <div
              style={{
                color: "#57c99c",
                fontSize: "9px",
                fontWeight: 800,
              }}
            >
              HUMAN DECISION REQUIRED
            </div>
          </div>
        </section>


        {/* ================================================
            FILTER BAR
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "14px",
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
              All Pending
              <span
                style={{
                  opacity: 0.7,
                }}
              >
                6
              </span>
            </button>

            <button className="searchButton">
              Immediate
              <span>4</span>
            </button>

            <button className="searchButton">
              High
              <span>1</span>
            </button>

            <button className="searchButton">
              Medium
              <span>1</span>
            </button>

            <button className="searchButton">
              Wrong-Person Impact
              <span>4</span>
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
                PRIORITIZED HUMAN REVIEW QUEUE
              </div>

              <h2>
                Cases Awaiting Monitoring Officer
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: "#61738c",
                fontSize: "9px",
              }}
            >
              <Activity size={15} />
              Live Queue
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
                  <th>CASE</th>
                  <th>INVESTIGATION</th>
                  <th>IDENTITY CHANGE</th>
                  <th>AI CONFIDENCE</th>
                  <th>RISK</th>
                  <th>HARM</th>
                  <th>PROTECTIVE</th>
                  <th>PRIORITY</th>
                  <th>WAITING</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {officerCases.map(
                  (item) => (
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
                          {item.affected ? (
                            <ShieldAlert
                              size={16}
                              color="#ff7584"
                            />
                          ) : (
                            <BrainCircuit
                              size={16}
                              color="#669fff"
                            />
                          )}

                          <div>
                            <strong
                              style={{
                                display: "block",
                                color: "#cbd8e7",
                                fontSize: "9px",
                              }}
                            >
                              {item.title}
                            </strong>

                            <span
                              style={{
                                display: "block",
                                color: "#566981",
                                fontSize: "8px",
                                marginTop: "4px",
                              }}
                            >
                              {item.type}
                              {" · "}
                              {item.findings}
                              {" findings"}
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
                                  : "#a4b2c4",
                            fontSize: "10px",
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
                                : "#a4b2c4",
                            fontSize: "10px",
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
                                : "#70a5ff",
                            fontSize: "10px",
                          }}
                        >
                          {item.protective}
                        </strong>
                      </td>

                      <td>
                        <PriorityBadge
                          priority={item.priority}
                        />
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#687b93",
                            fontSize: "9px",
                          }}
                        >
                          <Clock3 size={13} />
                          {item.age}
                        </div>
                      </td>

                      <td>
                        <Link
                          href={`/cases/${item.id}`}
                          className="primaryButton"
                          style={{
                            width: "auto",
                            minWidth: "105px",
                            height: "34px",
                            marginTop: 0,
                            padding: "0 12px",
                            textDecoration: "none",
                            fontSize: "9px",
                          }}
                        >
                          Review Case
                          <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: "14px 18px",
              borderTop:
                "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#52657d",
              fontSize: "9px",
            }}
          >
            <span>
              6 cases awaiting human review
            </span>

            <span>
              Protective Priority → Harm → Risk
              → AI Confidence
            </span>
          </div>
        </section>


        {/* ================================================
            TOP CASE PREVIEW
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns: "1.35fr 0.65fr",
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
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <div>
                <div className="panelEyebrow">
                  NEXT RECOMMENDED REVIEW
                </div>

                <h2
                  style={{
                    margin: "6px 0 0",
                    fontSize: "17px",
                  }}
                >
                  CASE-2026-00001
                </h2>

                <p
                  style={{
                    color: "#71839b",
                    fontSize: "10px",
                    lineHeight: 1.7,
                    maxWidth: "650px",
                    marginTop: "9px",
                  }}
                >
                  AI detected a potential
                  wrong-person identity mapping
                  with high potential harm. The
                  biometric evidence supports
                  reassignment from REF-002711
                  to REF-001009 with 99.99%
                  confidence.
                </p>
              </div>

              <PriorityBadge
                priority="IMMEDIATE"
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
                  "AI Confidence",
                  "99.99%",
                ],
                [
                  "Risk",
                  "94.99",
                ],
                [
                  "Harm",
                  "97.5",
                ],
                [
                  "Protective",
                  "98.0",
                ],
              ].map(
                ([label, value]) => (
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
                        color: "#5c6f87",
                        fontSize: "8px",
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

            <Link
              href="/cases/CASE-2026-00001"
              className="primaryButton"
              style={{
                textDecoration: "none",
                marginTop: "18px",
              }}
            >
              Open Full AI Investigation
              <ChevronRight size={17} />
            </Link>
          </div>


          {/* ==============================================
              DECISION MODEL
              ============================================== */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  OFFICER DECISION
                </div>

                <h2>
                  Available Actions
                </h2>
              </div>

              <UserCheck size={22} />
            </div>

            <div
              style={{
                padding: "17px",
              }}
            >
              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Approve
                  </strong>

                  <span>
                    Sends the AI correction
                    package to Manager approval.
                  </span>
                </div>
              </div>

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,180,80,0.09)",
                  background:
                    "rgba(255,180,80,0.045)",
                }}
              >
                <BrainCircuit
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color: "#d2a65f",
                    }}
                  >
                    More Investigation
                  </strong>

                  <span>
                    Returns the case for
                    additional AI or manual
                    investigation.
                  </span>
                </div>
              </div>

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,90,105,0.09)",
                  background:
                    "rgba(255,90,105,0.04)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ff7887"
                />

                <div>
                  <strong
                    style={{
                      color: "#d56f7b",
                    }}
                  >
                    Reject
                  </strong>

                  <span>
                    Stops the proposed correction
                    and records the human reason.
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
            margin: "14px 0 0",
            padding: "17px",
          }}
        >
          <ShieldCheck size={24} />

          <div>
            <strong>
              AI Cannot Approve Its Own
              Recommendation
            </strong>

            <span>
              Officer and Manager decisions
              remain independent human controls.
              No sensitive identity correction
              can be executed from this queue
              without both approvals.
            </span>
          </div>
        </section>


        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Officer Review Workspace
          </span>

          <div>
            <Activity size={15} />
            Protective Queue Active
          </div>
        </footer>
      </main>
    </div>
  );
}