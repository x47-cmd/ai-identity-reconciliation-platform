import Link from "next/link";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Database,
  FileCheck2,
  FileSearch,
  Fingerprint,
  Gauge,
  GitCompareArrows,
  History,
  LayoutDashboard,
  LockKeyhole,
  RefreshCcw,
  RotateCcw,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


const correctionCases = [
  {
    id: "CASE-2026-00001",
    biometric: "BIO-000166",

    before: "REF-002711",
    after: "REF-001009",

    execution: "COMPLETED",
    verification: "PASSED",
    verificationScore: 100,

    biometricMatch: 99.9903,

    identityValid: true,
    conflictResolved: true,
    secondaryConflict: false,

    rollback: "NOT_REQUIRED",

    finalStatus: "VERIFIED_CLOSED",

    officer: "APPROVED",
    manager: "APPROVED",

    priority: "IMMEDIATE",
  },

  {
    id: "CASE-2026-00010",
    biometric: "BIO-000795",

    before: "REF-001183",
    after: "REF-002343",

    execution: "NOT_AUTHORIZED",
    verification: "NOT_STARTED",
    verificationScore: null,

    biometricMatch: 99.99,

    identityValid: null,
    conflictResolved: null,
    secondaryConflict: null,

    rollback: "NOT_REQUIRED",

    finalStatus: "AWAITING_APPROVAL",

    officer: "PENDING",
    manager: "NOT_READY",

    priority: "HIGH",
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

          <span>
            Command Center
          </span>
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

        <div className="navItem">
          <BrainCircuit size={19} />

          <span>
            AI Investigations
          </span>
        </div>

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
          className="navItem active"
          href="/corrections-verification"
        >
          <CircleCheckBig size={19} />

          <span>
            Corrections & Verification
          </span>
        </Link>

        <div className="navLabel navSecond">
          INTELLIGENCE
        </div>

        <div className="navItem">
          <Gauge size={19} />

          <span>
            Analytics
          </span>
        </div>

        <div className="navItem">
          <Database size={19} />

          <span>
            Data Integrity
          </span>
        </div>

        <div className="navItem">
          <Activity size={19} />

          <span>
            Audit Trail
          </span>
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


function StatusPill({
  value,
}) {
  let color = "#79a9ff";
  let background =
    "rgba(80,140,255,0.08)";
  let border =
    "rgba(80,140,255,0.13)";


  if (
    value === "PASSED"
    ||
    value === "COMPLETED"
    ||
    value === "VERIFIED_CLOSED"
  ) {
    color = "#59cfa0";

    background =
      "rgba(52,211,153,0.07)";

    border =
      "rgba(52,211,153,0.13)";
  }


  if (
    value === "FAILED"
    ||
    value === "VERIFICATION_FAILED"
  ) {
    color = "#ff7d8b";

    background =
      "rgba(255,80,100,0.07)";

    border =
      "rgba(255,80,100,0.13)";
  }


  if (
    value === "NOT_STARTED"
    ||
    value === "NOT_AUTHORIZED"
    ||
    value === "AWAITING_APPROVAL"
  ) {
    color = "#ffbd67";

    background =
      "rgba(255,185,90,0.06)";

    border =
      "rgba(255,185,90,0.12)";
  }


  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        minHeight: "25px",

        padding:
          "0 9px",

        borderRadius:
          "7px",

        color,

        background,

        border:
          `1px solid ${border}`,

        fontSize:
          "8px",

        fontWeight:
          800,

        letterSpacing:
          "0.4px",
      }}
    >
      {value}
    </span>
  );
}


function BooleanResult({
  value,
}) {
  if (value === null) {
    return (
      <span
        style={{
          color: "#62758e",
          fontSize: "9px",
        }}
      >
        —
      </span>
    );
  }

  return (
    <span
      style={{
        color:
          value
            ? "#59cfa0"
            : "#ff7d8b",

        fontSize:
          "9px",

        fontWeight:
          750,
      }}
    >
      {value ? "TRUE" : "FALSE"}
    </span>
  );
}


export default function CorrectionsVerificationPage() {
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
              <CircleCheckBig size={15} />

              CONTROLLED REMEDIATION
            </div>

            <h1>
              Corrections & Verification
            </h1>

            <p>
              Track authorized identity
              corrections, post-correction
              verification, rollback controls
              and final case closure.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search correction
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                OP
              </div>

              <div className="profileText">
                <strong>
                  Identity Operations
                </strong>

                <span>
                  Controlled Execution
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            CONTROL BANNER
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "17px",
          }}
        >
          <ShieldCheck size={24} />

          <div>
            <strong>
              Closed-Loop Correction Control
            </strong>

            <span>
              Every authorized correction must
              pass post-correction verification
              before the case can reach
              VERIFIED_CLOSED status.
              Failed verification prevents case
              closure and may trigger controlled
              rollback.
            </span>
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={LockKeyhole}
            label="Authorized"
            value="1"
            description="Passed both human approvals"
          />

          <Metric
            icon={CircleCheckBig}
            label="Executed"
            value="1"
            description="Controlled correction completed"
          />

          <Metric
            icon={ShieldCheck}
            label="Verified"
            value="1"
            description="Post-correction verification passed"
          />

          <Metric
            icon={FileCheck2}
            label="Closed"
            value="1"
            description="Cases successfully verified and closed"
          />
        </section>


        {/* ================================================
            CORRECTION LIFECYCLE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "14px",

            padding:
              "18px",
          }}
        >
          <div className="panelEyebrow">
            CORRECTION LIFECYCLE
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "17px",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {[
              [
                "Officer Approved",
                UserCheck,
                true,
              ],

              [
                "Manager Approved",
                BadgeCheck,
                true,
              ],

              [
                "Authorized",
                LockKeyhole,
                true,
              ],

              [
                "Executed",
                CircleCheckBig,
                true,
              ],

              [
                "Verified",
                ShieldCheck,
                true,
              ],

              [
                "Case Closed",
                FileCheck2,
                true,
              ],
            ].map(
              (
                [
                  label,
                  Icon,
                  complete,
                ],
                index
              ) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      minWidth: "135px",

                      padding:
                        "12px",

                      borderRadius:
                        "10px",

                      border:
                        complete
                          ? "1px solid rgba(52,211,153,0.12)"
                          : "1px solid rgba(255,255,255,0.06)",

                      background:
                        complete
                          ? "rgba(52,211,153,0.05)"
                          : "rgba(255,255,255,0.025)",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "8px",

                      color:
                        complete
                          ? "#5dcca2"
                          : "#697c94",

                      fontSize:
                        "9px",

                      fontWeight:
                        700,
                    }}
                  >
                    <Icon size={15} />

                    {label}
                  </div>

                  {
                    index < 5
                    &&
                    (
                      <ChevronRight
                        size={14}
                        color="#43556c"
                      />
                    )
                  }
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            SUCCESSFUL CASE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                VERIFIED CORRECTION
              </div>

              <h2>
                CASE-2026-00001
              </h2>
            </div>

            <StatusPill
              value="VERIFIED_CLOSED"
            />
          </div>

          <div
            style={{
              padding:
                "22px",
            }}
          >

            {/* ============================================
                BEFORE / AFTER
                ============================================ */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr auto 1fr",
                gap: "17px",
                alignItems: "center",
              }}
            >

              {/* BEFORE */}

              <div
                style={{
                  padding:
                    "21px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(255,75,95,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.12)",
                }}
              >
                <div
                  style={{
                    color:
                      "#a5666f",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  BEFORE CORRECTION
                </div>

                <div
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  BIO-000166
                </div>

                <strong
                  style={{
                    display: "block",

                    fontSize:
                      "23px",

                    color:
                      "#ff7c89",

                    marginTop:
                      "5px",
                  }}
                >
                  REF-002711
                </strong>

                <span
                  style={{
                    display: "block",

                    color:
                      "#805c63",

                    fontSize:
                      "8px",

                    marginTop:
                      "6px",
                  }}
                >
                  Incorrect identity mapping
                </span>
              </div>


              {/* ARROW */}

              <div
                style={{
                  width:
                    "47px",

                  height:
                    "47px",

                  borderRadius:
                    "50%",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(59,132,255,0.09)",

                  border:
                    "1px solid rgba(75,143,255,0.15)",

                  color:
                    "#65a0ff",
                }}
              >
                <GitCompareArrows size={21} />
              </div>


              {/* AFTER */}

              <div
                style={{
                  padding:
                    "21px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(52,211,153,0.045)",

                  border:
                    "1px solid rgba(52,211,153,0.12)",
                }}
              >
                <div
                  style={{
                    color:
                      "#558a77",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  AFTER CORRECTION
                </div>

                <div
                  style={{
                    color:
                      "#64758d",

                    fontSize:
                      "9px",

                    marginTop:
                      "15px",
                  }}
                >
                  BIO-000166
                </div>

                <strong
                  style={{
                    display: "block",

                    fontSize:
                      "23px",

                    color:
                      "#59cfa0",

                    marginTop:
                      "5px",
                  }}
                >
                  REF-001009
                </strong>

                <span
                  style={{
                    display: "block",

                    color:
                      "#547c6d",

                    fontSize:
                      "8px",

                    marginTop:
                      "6px",
                  }}
                >
                  Verified canonical identity
                </span>
              </div>
            </div>


            {/* ============================================
                APPROVALS
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
                  "14px",
              }}
            >
              <div className="integrityInfo">
                <UserCheck size={21} />

                <div>
                  <strong>
                    Officer Approval
                  </strong>

                  <span>
                    APPROVED · Demo Monitoring
                    Officer
                  </span>
                </div>
              </div>

              <div className="integrityInfo">
                <BadgeCheck size={21} />

                <div>
                  <strong>
                    Manager Approval
                  </strong>

                  <span>
                    APPROVED · Demo Supervising
                    Manager
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            EXECUTION + VERIFICATION
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >

          {/* EXECUTION */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  EXECUTION AGENT
                </div>

                <h2>
                  Authorized Correction
                </h2>
              </div>

              <CircleCheckBig
                size={22}
              />
            </div>

            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  paddingBottom:
                    "13px",
                }}
              >
                <span
                  style={{
                    color:
                      "#687b94",

                    fontSize:
                      "9px",
                  }}
                >
                  Execution Status
                </span>

                <StatusPill
                  value="COMPLETED"
                />
              </div>

              {[
                [
                  "Target System",
                  "BIOMETRIC_SYSTEM",
                ],

                [
                  "Target Record",
                  "BIO-000166",
                ],

                [
                  "Field",
                  "linked_master_id",
                ],

                [
                  "Before",
                  "REF-002711",
                ],

                [
                  "After",
                  "REF-001009",
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

              <div
                className="integrityInfo"
                style={{
                  margin:
                    "15px 0 0",
                }}
              >
                <Database size={21} />

                <div>
                  <strong>
                    Controlled Runtime Change
                  </strong>

                  <span>
                    The Master Reference was not
                    modified and the original
                    biometric source dataset
                    remained preserved.
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* VERIFICATION */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  VERIFICATION AGENT
                </div>

                <h2>
                  Post-Correction Validation
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  marginBottom:
                    "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      color:
                        "#61738c",

                      fontSize:
                        "8px",
                    }}
                  >
                    VERIFICATION SCORE
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#5bd0a1",

                      fontSize:
                        "31px",

                      marginTop:
                        "3px",
                    }}
                  >
                    100
                  </strong>
                </div>

                <CheckCircle2
                  size={35}
                  color="#59cfa0"
                />
              </div>

              {[
                [
                  "Verification Status",
                  "PASSED",
                ],

                [
                  "Biometric Match",
                  "99.9903%",
                ],

                [
                  "Identity Mapping Valid",
                  "TRUE",
                ],

                [
                  "Original Conflict Resolved",
                  "TRUE",
                ],

                [
                  "Secondary Conflict",
                  "FALSE",
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

                    <strong
                      style={{
                        color:
                          value === "FALSE"
                          && label ===
                          "Secondary Conflict"
                            ? "#59cfa0"
                            : value === "PASSED"
                              ? "#59cfa0"
                              : undefined,
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>
        </section>


        {/* ================================================
            CORRECTION REGISTER
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
                CORRECTION REGISTER
              </div>

              <h2>
                Execution & Verification Status
              </h2>
            </div>

            <History size={22} />
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
                  <th>CASE</th>
                  <th>BIOMETRIC</th>
                  <th>BEFORE</th>
                  <th>AFTER</th>
                  <th>EXECUTION</th>
                  <th>VERIFICATION</th>
                  <th>SCORE</th>
                  <th>IDENTITY VALID</th>
                  <th>CONFLICT RESOLVED</th>
                  <th>SECONDARY CONFLICT</th>
                  <th>ROLLBACK</th>
                  <th>FINAL STATUS</th>
                </tr>
              </thead>

              <tbody>
                {
                  correctionCases.map(
                    (item) => (
                      <tr key={item.id}>
                        <td>
                          <Link
                            href={`/cases/${item.id}`}
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
                        </td>

                        <td className="mono">
                          {item.biometric}
                        </td>

                        <td>
                          <span className="oldIdentity">
                            {item.before}
                          </span>
                        </td>

                        <td>
                          <span className="newIdentity">
                            {item.after}
                          </span>
                        </td>

                        <td>
                          <StatusPill
                            value={
                              item.execution
                            }
                          />
                        </td>

                        <td>
                          <StatusPill
                            value={
                              item.verification
                            }
                          />
                        </td>

                        <td>
                          <span className="confidence">
                            {
                              item.verificationScore
                              === null
                                ? "—"
                                : item.verificationScore
                            }
                          </span>
                        </td>

                        <td>
                          <BooleanResult
                            value={
                              item.identityValid
                            }
                          />
                        </td>

                        <td>
                          <BooleanResult
                            value={
                              item.conflictResolved
                            }
                          />
                        </td>

                        <td>
                          {
                            item.secondaryConflict
                            === null
                              ? (
                                <span
                                  style={{
                                    color:
                                      "#62758e",

                                    fontSize:
                                      "9px",
                                  }}
                                >
                                  —
                                </span>
                              )
                              : (
                                <span
                                  style={{
                                    color:
                                      item.secondaryConflict
                                        ? "#ff7d8b"
                                        : "#59cfa0",

                                    fontSize:
                                      "9px",

                                    fontWeight:
                                      750,
                                  }}
                                >
                                  {
                                    item.secondaryConflict
                                      ? "TRUE"
                                      : "FALSE"
                                  }
                                </span>
                              )
                          }
                        </td>

                        <td>
                          <span
                            style={{
                              color:
                                "#687b93",

                              fontSize:
                                "9px",
                            }}
                          >
                            {item.rollback}
                          </span>
                        </td>

                        <td>
                          <StatusPill
                            value={
                              item.finalStatus
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
            FAILURE / ROLLBACK CONTROL
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  FAILURE HANDLING
                </div>

                <h2>
                  Verification Exception
                </h2>
              </div>

              <AlertTriangle size={22} />
            </div>

            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(255,80,100,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.09)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#db7480",

                    fontSize:
                      "10px",
                  }}
                >
                  If Verification Fails
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#886268",

                    fontSize:
                      "9px",

                    lineHeight:
                      1.7,

                    marginTop:
                      "6px",
                  }}
                >
                  The case cannot be closed.
                  It moves to manual
                  post-correction review and
                  the system can initiate a
                  controlled rollback if the
                  approved correction is no
                  longer considered safe.
                </span>
              </div>
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CONTROLLED ROLLBACK
                </div>

                <h2>
                  Recovery Control
                </h2>
              </div>

              <RotateCcw size={22} />
            </div>

            <div
              style={{
                padding:
                  "18px",
              }}
            >
              <div className="integrityInfo">
                <RefreshCcw size={21} />

                <div>
                  <strong>
                    Restore Previous Mapping
                  </strong>

                  <span>
                    Rollback restores the
                    pre-correction identity
                    relationship only when the
                    runtime state still matches
                    the executed change.
                  </span>
                </div>
              </div>

              <div
                className="integrityInfo"
                style={{
                  marginTop:
                    "10px",
                }}
              >
                <LockKeyhole size={21} />

                <div>
                  <strong>
                    Safety Lock
                  </strong>

                  <span>
                    Automatic rollback is blocked
                    if the record changed again
                    after execution.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL SUCCESS
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
          <CheckCircle2 size={26} />

          <div>
            <strong>
              CASE-2026-00001 Successfully
              Verified and Closed
            </strong>

            <span>
              BIO-000166 was corrected from
              REF-002711 to REF-001009 after
              Officer and Manager approval.
              Post-correction verification
              passed with a score of 100,
              the original conflict was
              resolved and no secondary
              conflict was detected.
            </span>
          </div>
        </section>


        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Correction & Verification Workspace
          </span>

          <div>
            <ShieldCheck size={15} />
            Closed-Loop Verification Active
          </div>
        </footer>
      </main>
    </div>
  );
}