import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  Activity,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  History,
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

   Notes:
   - Selected E2E case: CASE-2026-00001
   - Known demo audit trail count: 5 lifecycle events
   - PDF generation is planned and not yet implemented
   ========================================================= */


const auditEvents = [
  {
    id: "AUD-SEQ-01",
    caseId: "CASE-2026-00001",
    sequence: "01",
    actor: "Investigation Agent",
    actorType: "AI_AGENT",
    action: "AI_INVESTIGATION_COMPLETED",
    status: "COMPLETED",
    detail:
      "AI investigation completed and the proposed identity correction package was prepared for human review.",
  },
  {
    id: "AUD-SEQ-02",
    caseId: "CASE-2026-00001",
    sequence: "02",
    actor: "Demo Monitoring Officer",
    actorType: "HUMAN",
    action: "OFFICER_APPROVAL_RECORDED",
    status: "APPROVED",
    detail:
      "Monitoring Officer reviewed the evidence and approved the proposed correction.",
  },
  {
    id: "AUD-SEQ-03",
    caseId: "CASE-2026-00001",
    sequence: "03",
    actor: "Demo Supervising Manager",
    actorType: "HUMAN",
    action: "MANAGER_APPROVAL_RECORDED",
    status: "APPROVED",
    detail:
      "Manager completed the second-level review and authorized controlled correction execution.",
  },
  {
    id: "AUD-SEQ-04",
    caseId: "CASE-2026-00001",
    sequence: "04",
    actor: "Execution Agent",
    actorType: "AI_AGENT",
    action: "CONTROLLED_CORRECTION_EXECUTED",
    status: "COMPLETED",
    detail:
      "BIO-000166 was changed from REF-002711 to REF-001009 in the isolated controlled runtime dataset.",
  },
  {
    id: "AUD-SEQ-05",
    caseId: "CASE-2026-00001",
    sequence: "05",
    actor: "Verification Agent",
    actorType: "AI_AGENT",
    action: "POST_CORRECTION_VERIFICATION_PASSED",
    status: "VERIFIED_CLOSED",
    detail:
      "Post-correction verification passed with score 100. Mapping was validated, the original conflict was resolved and the case reached VERIFIED_CLOSED.",
  },
];


const reports = [
  {
    title: "Case Investigation Report",
    description:
      "AI investigation, evidence, risk analysis, identity resolution and proposed correction.",
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
      "Chronological lifecycle record covering AI actions, human decisions, execution and verification.",
    type: "AUDIT REPORT",
    icon: History,
  },
  {
    title: "Harm Impact Report",
    description:
      "Protective cases where identity errors may negatively affect an unrelated person.",
    type: "PROTECTIVE REPORT",
    icon: ShieldAlert,
  },
  {
    title: "Executive Monthly Report",
    description:
      "Management KPIs, case volumes, priorities, AI performance and resolution outcomes.",
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

  masterModified: "FALSE",

  sourceModified: "FALSE",

  finalStatus: "VERIFIED_CLOSED",
};


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
          AUDIT READY
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

        padding:
          "0 9px",

        borderRadius:
          "7px",

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
            margin:
              "0 0 20px",

            padding:
              "18px",
          }}
        >
          <LockKeyhole size={25} />

          <div>
            <strong>
              Full Case Traceability Active
            </strong>

            <span>
              AI actions, human decisions,
              correction execution,
              verification outcomes and final
              case state can be reconstructed
              through the recorded case
              lifecycle.
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
            value="5"
            description="Selected E2E lifecycle events"
          />

          <Metric
            icon={Users}
            label="Human Decisions"
            value="2"
            description="Officer and Manager approvals"
          />

          <Metric
            icon={BrainCircuit}
            label="Controlled AI Stages"
            value="3"
            description="Investigation, execution and verification"
          />

          <Metric
            icon={CheckCircle2}
            label="Verified Closed"
            value="1"
            description="Completed end-to-end demo case"
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
              padding:
                "21px",
            }}
          >
            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(4,1fr)",

                gap:
                  "10px",
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
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={label}
                    style={{
                      padding:
                        "14px",

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
                        display:
                          "block",

                        color:
                          "#596c84",

                        fontSize:
                          "8px",
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
                          "12px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            {/* ============================================
                BEFORE / AFTER
                ============================================ */}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "1fr auto 1fr",

                alignItems:
                  "center",

                gap:
                  "14px",

                marginTop:
                  "16px",
              }}
            >

              {/* BEFORE */}

              <div
                style={{
                  padding:
                    "18px",

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
                      "#9b626a",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  BEFORE
                </span>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#ff7b89",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {caseSummary.before}
                </strong>
              </div>


              <ChevronRight
                size={21}
                color="#5f94df"
              />


              {/* AFTER */}

              <div
                style={{
                  padding:
                    "18px",

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
                      "#56806f",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  VERIFIED AFTER
                </span>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#59cfa0",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {caseSummary.after}
                </strong>
              </div>
            </div>


            {/* ============================================
                DECISIONS
                ============================================ */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr 1fr",

                gap:
                  "10px",

                marginTop:
                  "14px",
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


            {/* ============================================
                SOURCE PROTECTION
                ============================================ */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "10px",

                marginTop:
                  "10px",
              }}
            >
              <div className="integrityInfo">
                <Database size={20} />

                <div>
                  <strong>
                    Master Modified
                  </strong>

                  <span>
                    {caseSummary.masterModified}
                    {" · READ ONLY"}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <LockKeyhole size={20} />

                <div>
                  <strong>
                    Original Source Modified
                  </strong>

                  <span>
                    {caseSummary.sourceModified}
                    {" · SOURCE PRESERVED"}
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
            marginTop:
              "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                TRACEABLE CASE HISTORY
              </div>

              <h2>
                End-to-End Audit Sequence
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
                    key={
                      event.id
                    }
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "65px 28px 175px 1fr 120px",

                      alignItems:
                        "start",

                      gap:
                        "11px",

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
                        color:
                          "#52647b",

                        fontSize:
                          "9px",

                        paddingTop:
                          "5px",
                      }}
                    >
                      STEP {event.sequence}
                    </div>


                    <div
                      style={{
                        width:
                          "24px",

                        height:
                          "24px",

                        borderRadius:
                          "50%",

                        display:
                          "grid",

                        placeItems:
                          "center",

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
                          display:
                            "block",

                          color:
                            "#cbd7e7",

                          fontSize:
                            "9px",
                        }}
                      >
                        {event.actor}
                      </strong>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#566980",

                          fontSize:
                            "8px",

                          marginTop:
                            "4px",
                        }}
                      >
                        {event.actorType}
                      </span>
                    </div>


                    <div>
                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#9eb0c5",

                          fontSize:
                            "9px",
                        }}
                      >
                        {event.action}
                      </strong>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#63758d",

                          fontSize:
                            "9px",

                          lineHeight:
                            1.6,

                          marginTop:
                            "5px",
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
            marginTop:
              "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                DEMO AUDIT REGISTER
              </div>

              <h2>
                Recorded Lifecycle Sequence
              </h2>
            </div>

            <Activity size={22} />
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1100px",
              }}
            >
              <thead>
                <tr>
                  <th>SEQUENCE</th>
                  <th>CASE</th>
                  <th>ACTOR</th>
                  <th>ACTOR TYPE</th>
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
                          {event.sequence}
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
            marginTop:
              "14px",
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
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,1fr)",

              gap:
                "12px",

              padding:
                "20px",
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
                        padding:
                          "18px",

                        borderRadius:
                          "13px",

                        border:
                          "1px solid rgba(255,255,255,0.055)",

                        background:
                          "rgba(255,255,255,0.022)",

                        display:
                          "flex",

                        flexDirection:
                          "column",

                        minHeight:
                          "215px",
                      }}
                    >
                      <div className="metricIcon">
                        <Icon size={20} />
                      </div>

                      <span
                        style={{
                          color:
                            "#5f91dd",

                          fontSize:
                            "8px",

                          fontWeight:
                            800,

                          marginTop:
                            "16px",
                        }}
                      >
                        {report.type}
                      </span>

                      <strong
                        style={{
                          color:
                            "#d1ddea",

                          fontSize:
                            "11px",

                          marginTop:
                            "5px",
                        }}
                      >
                        {report.title}
                      </strong>

                      <p
                        style={{
                          color:
                            "#63758d",

                          fontSize:
                            "9px",

                          lineHeight:
                            1.6,

                          margin:
                            "8px 0 16px",
                        }}
                      >
                        {report.description}
                      </p>


                      <button
                        className="searchButton"
                        disabled
                        style={{
                          marginTop:
                            "auto",

                          width:
                            "100%",

                          justifyContent:
                            "center",

                          cursor:
                            "not-allowed",

                          opacity:
                            0.62,
                        }}
                      >
                        <FileText size={15} />

                        PDF Generator Planned
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
            marginTop:
              "14px",
          }}
        >

          {/* FORMAL EVIDENCE PACKAGE */}

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
                "Case ID & lifecycle metadata",
                "Case type & priority",
                "AI investigation conclusion",
                "Identity resolution evidence",
                "Biometric correlation scores",
                "Risk & harm assessment",
                "Wrong-person impact analysis",
                "Before / After correction",
                "Officer decision",
                "Manager decision",
                "Execution result",
                "Post-correction verification",
                "Final case status",
                "Audit sequence",
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


          {/* TRACEABILITY CONTROLS */}

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
                padding:
                  "17px",
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
                    remain attributable to the
                    relevant human review stage.
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
                    AI findings, recommendations
                    and lifecycle actions identify
                    the responsible processing
                    component.
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <History size={21} />

                <div>
                  <strong>
                    Chronological Traceability
                  </strong>

                  <span>
                    The case lifecycle can be
                    reconstructed from AI
                    investigation through verified
                    closure.
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
                    The selected demo confirms
                    that the Master Reference
                    remained unchanged during
                    controlled correction.
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
            marginTop:
              "14px",
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
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                "10px",

              padding:
                "20px",
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
                "Demo Verification",
                "PASSED",
                ShieldCheck,
              ],

              [
                "Unresolved Identity",
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
                    padding:
                      "16px",

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
                      display:
                        "block",

                      color:
                        "#d2deeb",

                      fontSize:
                        "21px",

                      marginTop:
                        "12px",
                    }}
                  >
                    {value}
                  </strong>

                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#61738b",

                      fontSize:
                        "8px",

                      marginTop:
                        "4px",
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
            EXPORT READINESS
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CURRENT ARTIFACTS
                </div>

                <h2>
                  Machine-Readable Outputs
                </h2>
              </div>

              <Database size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  "Case data",
                  "CSV / JSON",
                ],
                [
                  "AI findings",
                  "CSV / JSON",
                ],
                [
                  "Investigations",
                  "CSV / JSON",
                ],
                [
                  "Approval state",
                  "JSON",
                ],
                [
                  "Execution results",
                  "CSV / JSON",
                ],
                [
                  "Verification results",
                  "CSV / JSON",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <strong>
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  FUTURE EXPORT
                </div>

                <h2>
                  Formal PDF Reporting
                </h2>
              </div>

              <FileText size={22} />
            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Report Model Ready
                  </strong>

                  <span>
                    Required case, AI,
                    approval, correction and
                    verification information is
                    already represented in the
                    reporting design.
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.09)",

                  background:
                    "rgba(255,185,90,0.04)",
                }}
              >
                <FileText
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#d0a35f",
                    }}
                  >
                    PDF Generator Planned
                  </strong>

                  <span>
                    A formal downloadable PDF
                    generator has not yet been
                    connected to this frontend
                    workspace.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL AUDIT STATUS
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "18px",
          }}
        >
          <CheckCircle2 size={25} />

          <div>
            <strong>
              Auditable End-to-End Case Lifecycle
            </strong>

            <span>
              CASE-2026-00001 demonstrates a
              traceable lifecycle from AI
              investigation through Officer and
              Manager approvals, controlled
              correction, post-correction
              verification and
              VERIFIED_CLOSED status.
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

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