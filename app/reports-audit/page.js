import Link from "next/link";

import {
  Activity,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileCheck2,
  FileSearch,
  FileText,
  Fingerprint,
  Gauge,
  History,
  LayoutDashboard,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";


/* =========================================================
   REPORTS & AUDIT TRAIL CENTER
   Synthetic Demo Only
   ========================================================= */


const auditEvents = [
  {
    id: "AUD-000001",
    caseId: "CASE-2026-00001",
    time: "11:56:01",
    actor: "Monitoring Agent",
    actorType: "AI_AGENT",
    action: "CHANGE_DETECTED",
    status: "COMPLETED",
    detail:
      "Biometric identity relationship selected for reconciliation.",
  },
  {
    id: "AUD-000002",
    caseId: "CASE-2026-00001",
    time: "11:56:02",
    actor: "Reconciliation Agent",
    actorType: "AI_AGENT",
    action: "IDENTITY_CONFLICT_DETECTED",
    status: "COMPLETED",
    detail:
      "BIO-000166 mapping to REF-002711 conflicted with authoritative identity evidence.",
  },
  {
    id: "AUD-000003",
    caseId: "CASE-2026-00001",
    time: "11:56:03",
    actor: "Investigation Agent",
    actorType: "AI_AGENT",
    action: "CANONICAL_IDENTITY_RESOLVED",
    status: "COMPLETED",
    detail:
      "REF-001009 identified as canonical identity candidate with 99.99% AI confidence.",
  },
  {
    id: "AUD-000004",
    caseId: "CASE-2026-00001",
    time: "11:57:10",
    actor: "Demo Monitoring Officer",
    actorType: "HUMAN",
    action: "OFFICER_APPROVAL",
    status: "APPROVED",
    detail:
      "Monitoring Officer reviewed AI evidence and approved the proposed correction.",
  },
  {
    id: "AUD-000005",
    caseId: "CASE-2026-00001",
    time: "11:58:02",
    actor: "Demo Supervising Manager",
    actorType: "HUMAN",
    action: "MANAGER_APPROVAL",
    status: "APPROVED",
    detail:
      "Manager completed final review and authorized controlled correction execution.",
  },
  {
    id: "AUD-000006",
    caseId: "CASE-2026-00001",
    time: "11:58:04",
    actor: "Execution Agent",
    actorType: "AI_AGENT",
    action: "AUTHORIZED_CORRECTION",
    status: "COMPLETED",
    detail:
      "BIO-000166 linked_master_id changed from REF-002711 to REF-001009 in the controlled runtime dataset.",
  },
  {
    id: "AUD-000007",
    caseId: "CASE-2026-00001",
    time: "11:58:05",
    actor: "Verification Agent",
    actorType: "AI_AGENT",
    action: "POST_CORRECTION_VERIFICATION",
    status: "PASSED",
    detail:
      "Verification score 100. Identity mapping valid, original conflict resolved and no secondary conflict detected.",
  },
  {
    id: "AUD-000008",
    caseId: "CASE-2026-00001",
    time: "11:58:05",
    actor: "Audit Agent",
    actorType: "AI_AGENT",
    action: "CASE_CLOSED",
    status: "VERIFIED_CLOSED",
    detail:
      "Case lifecycle completed and immutable audit history finalized.",
  },
];


const reports = [
  {
    title: "Case Investigation Report",
    description:
      "Complete AI investigation, evidence, risk analysis, identity resolution and proposed correction.",
    type: "CASE REPORT",
    icon: BrainCircuit,
  },
  {
    title: "Correction & Verification Report",
    description:
      "Before/After correction, approvals, execution result and post-correction verification.",
    type: "CORRECTION REPORT",
    icon: FileCheck2,
  },
  {
    title: "Full Audit Report",
    description:
      "Chronological record of AI and human actions across the complete case lifecycle.",
    type: "AUDIT REPORT",
    icon: History,
  },
  {
    title: "Harm Impact Report",
    description:
      "Protective cases where identity errors may affect an unrelated person.",
    type: "PROTECTIVE REPORT",
    icon: ShieldAlert,
  },
  {
    title: "Executive Monthly Report",
    description:
      "Management KPIs, trends, case volumes, priorities, performance and resolution outcomes.",
    type: "EXECUTIVE REPORT",
    icon: BarChart3,
  },
  {
    title: "Data Integrity Report",
    description:
      "Cross-system mismatches, duplicates, orphan records, source health and reconciliation results.",
    type: "DATA REPORT",
    icon: Database,
  },
];


const caseSummary = {
  caseId: "CASE-2026-00001",
  type: "HARM_IMPACT",
  priority: "IMMEDIATE",

  biometric: "BIO-000166",

  before: "REF-002711",
  after: "REF-001009",

  confidence: "99.99%",
  risk: "94.99",
  harm: "97.5",
  protective: "98.0",

  officer: "Demo Monitoring Officer",
  officerDecision: "APPROVED",

  manager: "Demo Supervising Manager",
  managerDecision: "APPROVED",

  execution: "COMPLETED",
  verification: "PASSED",
  verificationScore: "100",

  finalStatus: "VERIFIED_CLOSED",
};


/* =========================================================
   SIDEBAR
   ========================================================= */


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

          <span>
            Cases
          </span>

          <span className="navCount">
            53
          </span>
        </Link>

        <Link
          className="navItem"
          href="/cases"
        >
          <BrainCircuit size={19} />

          <span>
            AI Investigations
          </span>
        </Link>

        <Link
          className="navItem"
          href="/officer-review"
        >
          <UserCheck size={19} />

          <span>
            Officer Review
          </span>
        </Link>

        <Link
          className="navItem"
          href="/manager-approval"
        >
          <BadgeCheck size={19} />

          <span>
            Manager Approval
          </span>
        </Link>

        <Link
          className="navItem"
          href="/corrections-verification"
        >
          <FileCheck2 size={19} />

          <span>
            Corrections & Verification
          </span>
        </Link>

        <div className="navLabel navSecond">
          INTELLIGENCE
        </div>

        <Link
          className="navItem"
          href="/analytics"
        >
          <Gauge size={19} />

          <span>
            Analytics
          </span>
        </Link>

        <Link
          className="navItem"
          href="/data-integrity"
        >
          <Database size={19} />

          <span>
            Data Integrity
          </span>
        </Link>

        <Link
          className="navItem active"
          href="/reports-audit"
        >
          <Activity size={19} />

          <span>
            Reports & Audit
          </span>
        </Link>
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


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */


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

        <span
          style={{
            color: "#59cfa0",
            fontSize: "8px",
            fontWeight: 800,
          }}
        >
          AUDITED
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


function StatusBadge({
  value,
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        minHeight: "24px",

        padding: "0 9px",

        borderRadius: "7px",

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

        fontSize: "8px",
        fontWeight: 800,
      }}
    >
      {value}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */


export default function ReportsAuditPage() {
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

              GOVERNANCE · TRACEABILITY · REPORTING
            </div>

            <h1>
              Reports & Audit Trail
            </h1>

            <p>
              Complete traceability of AI findings,
              human decisions, approved corrections,
              verification outcomes and executive
              reporting.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search audit history
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                AU
              </div>

              <div className="profileText">
                <strong>
                  Audit & Governance
                </strong>

                <span>
                  Reporting Center
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
            margin: "0 0 20px",
            padding: "18px",
          }}
        >
          <LockKeyhole size={25} />

          <div>
            <strong>
              Full Case Traceability Active
            </strong>

            <span>
              Every AI action, human decision,
              correction, verification result and
              final case status is recorded as part
              of the case audit history. Sensitive
              identity changes remain attributable
              to the approving human reviewers.
            </span>
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={History}
            label="Audit Events"
            value="8"
            description="Events in selected case lifecycle"
          />

          <Metric
            icon={Users}
            label="Human Decisions"
            value="2"
            description="Officer and Manager approvals"
          />

          <Metric
            icon={BrainCircuit}
            label="AI Actions"
            value="6"
            description="Automated monitored lifecycle events"
          />

          <Metric
            icon={CheckCircle2}
            label="Verified Closed"
            value="1"
            description="Completed end-to-end correction case"
          />
        </section>


        {/* ================================================
            SELECTED CASE AUDIT SUMMARY
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                SELECTED AUDIT CASE
              </div>

              <h2>
                {caseSummary.caseId}
              </h2>
            </div>

            <StatusBadge
              value={
                caseSummary.finalStatus
              }
            />
          </div>


          <div
            style={{
              padding: "21px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "10px",
              }}
            >
              {[
                [
                  "Case Type",
                  caseSummary.type,
                ],
                [
                  "Priority",
                  caseSummary.priority,
                ],
                [
                  "AI Confidence",
                  caseSummary.confidence,
                ],
                [
                  "Protective Priority",
                  caseSummary.protective,
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px",

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
                        display: "block",
                        color: "#596c84",
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
                        fontSize: "12px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            {/* BEFORE AFTER */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr auto 1fr",
                alignItems: "center",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  padding: "18px",

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
                    display: "block",
                    color: "#9b626a",
                    fontSize: "8px",
                    fontWeight: 800,
                  }}
                >
                  BEFORE
                </span>

                <span
                  style={{
                    display: "block",
                    color: "#61738b",
                    fontSize: "8px",
                    marginTop: "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display: "block",
                    color: "#ff7b89",
                    fontSize: "21px",
                    marginTop: "4px",
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
                  padding: "18px",

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
                    display: "block",
                    color: "#56806f",
                    fontSize: "8px",
                    fontWeight: 800,
                  }}
                >
                  VERIFIED AFTER
                </span>

                <span
                  style={{
                    display: "block",
                    color: "#61738b",
                    fontSize: "8px",
                    marginTop: "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display: "block",
                    color: "#59cfa0",
                    fontSize: "21px",
                    marginTop: "4px",
                  }}
                >
                  {caseSummary.after}
                </strong>
              </div>
            </div>


            {/* DECISIONS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              <div className="integrityInfo">
                <UserCheck size={20} />

                <div>
                  <strong>
                    Officer Approval
                  </strong>

                  <span>
                    {
                      caseSummary.officer
                    }
                    {" · "}
                    {
                      caseSummary.officerDecision
                    }
                  </span>
                </div>
              </div>

              <div className="integrityInfo">
                <BadgeCheck size={20} />

                <div>
                  <strong>
                    Manager Approval
                  </strong>

                  <span>
                    {
                      caseSummary.manager
                    }
                    {" · "}
                    {
                      caseSummary.managerDecision
                    }
                  </span>
                </div>
              </div>

              <div className="integrityInfo">
                <ShieldCheck size={20} />

                <div>
                  <strong>
                    Verification
                  </strong>

                  <span>
                    {
                      caseSummary.verification
                    }
                    {" · Score "}
                    {
                      caseSummary.verificationScore
                    }
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
            marginTop: "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                IMMUTABLE CASE HISTORY
              </div>

              <h2>
                End-to-End Audit Timeline
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
                    key={event.id}
                    style={{
                      display: "grid",

                      gridTemplateColumns:
                        "80px 28px 175px 1fr 120px",

                      alignItems:
                        "start",

                      gap: "11px",

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
                        color: "#52647b",
                        fontSize: "9px",
                        paddingTop: "5px",
                      }}
                    >
                      {event.time}
                    </div>


                    <div
                      style={{
                        width: "24px",
                        height: "24px",

                        borderRadius: "50%",

                        display: "grid",
                        placeItems: "center",

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
                          display: "block",
                          color: "#cbd7e7",
                          fontSize: "9px",
                        }}
                      >
                        {event.actor}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          color: "#566980",
                          fontSize: "8px",
                          marginTop: "4px",
                        }}
                      >
                        {event.actorType}
                      </span>
                    </div>


                    <div>
                      <strong
                        style={{
                          display: "block",
                          color: "#9eb0c5",
                          fontSize: "9px",
                        }}
                      >
                        {event.action}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          color: "#63758d",
                          fontSize: "9px",
                          lineHeight: 1.6,
                          marginTop: "5px",
                        }}
                      >
                        {event.detail}
                      </span>
                    </div>


                    <StatusBadge
                      value={
                        event.status
                      }
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
            marginTop: "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AUDIT REGISTER
              </div>

              <h2>
                Recorded Governance Events
              </h2>
            </div>

            <Activity size={22} />
          </div>

          <div className="tableWrap">
            <table
              style={{
                minWidth: "1100px",
              }}
            >
              <thead>
                <tr>
                  <th>EVENT ID</th>
                  <th>CASE</th>
                  <th>TIME</th>
                  <th>ACTOR</th>
                  <th>TYPE</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
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
                          {event.id}
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
                          {event.time}
                        </td>

                        <td>
                          {event.actor}
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
                            {event.actorType}
                          </span>
                        </td>

                        <td>
                          {event.action}
                        </td>

                        <td>
                          <StatusBadge
                            value={
                              event.status
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
        </section>


        {/* ================================================
            REPORT CENTER
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop: "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                FORMAL REPORTING
              </div>

              <h2>
                Report Center
              </h2>
            </div>

            <FileText size={22} />
          </div>


          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(3,1fr)",

              gap: "12px",

              padding: "20px",
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
                        padding: "18px",

                        borderRadius:
                          "13px",

                        border:
                          "1px solid rgba(255,255,255,0.055)",

                        background:
                          "rgba(255,255,255,0.022)",

                        display: "flex",

                        flexDirection:
                          "column",

                        minHeight:
                          "205px",
                      }}
                    >
                      <div
                        className="metricIcon"
                      >
                        <Icon size={20} />
                      </div>

                      <span
                        style={{
                          color: "#5f91dd",
                          fontSize: "8px",
                          fontWeight: 800,
                          marginTop: "16px",
                        }}
                      >
                        {report.type}
                      </span>

                      <strong
                        style={{
                          color: "#d1ddea",
                          fontSize: "11px",
                          marginTop: "5px",
                        }}
                      >
                        {report.title}
                      </strong>

                      <p
                        style={{
                          color: "#63758d",
                          fontSize: "9px",
                          lineHeight: 1.6,
                          margin:
                            "8px 0 16px",
                        }}
                      >
                        {report.description}
                      </p>

                      <button
                        className="searchButton"
                        style={{
                          marginTop: "auto",
                          width: "100%",
                          justifyContent:
                            "center",
                        }}
                      >
                        <Download size={15} />

                        Generate Report
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
            marginTop: "14px",
          }}
        >

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE REPORT CONTENT
                </div>

                <h2>
                  Formal Evidence Package
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
                "Case ID & timestamps",
                "Case type & priority",
                "AI investigation conclusion",
                "Identity resolution evidence",
                "Biometric correlation scores",
                "Risk & harm assessment",
                "Wrong-person impact analysis",
                "Before / After correction",
                "Officer decision & comments",
                "Manager decision & comments",
                "Execution result",
                "Post-correction verification",
                "Final case status",
                "Complete audit timeline",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="detailRow"
                  >
                    <span>
                      {item}
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


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  REPORT GOVERNANCE
                </div>

                <h2>
                  Traceability Controls
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>


            <div
              style={{
                padding: "17px",
              }}
            >
              <div className="integrityInfo">
                <LockKeyhole size={21} />

                <div>
                  <strong>
                    Human Attribution
                  </strong>

                  <span>
                    Officer and Manager decisions
                    are tied to the reviewing
                    user and decision timestamp.
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BrainCircuit size={21} />

                <div>
                  <strong>
                    AI Attribution
                  </strong>

                  <span>
                    AI findings and recommendations
                    identify the responsible agent,
                    confidence and supporting evidence.
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <History size={21} />

                <div>
                  <strong>
                    Chronological Audit
                  </strong>

                  <span>
                    Every lifecycle event can be
                    reconstructed from detection
                    through verified closure.
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <Database size={21} />

                <div>
                  <strong>
                    Master Reference Protection
                  </strong>

                  <span>
                    Audit reporting records that
                    the Master Reference remained
                    read only during correction.
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
            marginTop: "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                MANAGEMENT REPORTING
              </div>

              <h2>
                Executive Reporting Coverage
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap: "10px",

              padding: "20px",
            }}
          >
            {[
              [
                "Case Volume",
                "53",
                FileSearch,
              ],
              [
                "Protective Cases",
                "9",
                ShieldAlert,
              ],
              [
                "Verification Success",
                "100%",
                ShieldCheck,
              ],
              [
                "Unresolved Cases",
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
                    padding: "16px",

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
                      display: "block",
                      color: "#d2deeb",
                      fontSize: "21px",
                      marginTop: "12px",
                    }}
                  >
                    {value}
                  </strong>

                  <span
                    style={{
                      display: "block",
                      color: "#61738b",
                      fontSize: "8px",
                      marginTop: "4px",
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
            FINAL AUDIT STATUS
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin: "14px 0 0",
            padding: "18px",
          }}
        >
          <CheckCircle2 size={25} />

          <div>
            <strong>
              Auditable End-to-End Case Lifecycle
            </strong>

            <span>
              CASE-2026-00001 can be traced from
              automated detection through AI
              investigation, two human approvals,
              authorized correction,
              post-correction verification and
              VERIFIED_CLOSED status.
            </span>
          </div>
        </section>


        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Reports & Audit Trail Center
          </span>

          <div>
            <Activity size={15} />
            Audit Monitoring Active
          </div>
        </footer>
      </main>
    </div>
  );
}