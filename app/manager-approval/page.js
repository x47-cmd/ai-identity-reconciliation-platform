import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  GitCompareArrows,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


const managerCases = [
  {
    id: "CASE-2026-00005",
    title: "Critical Cross-Identity Harm Conflict",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    biometric: "BIO-000621",
    current: "REF-001912",
    proposed: "REF-002448",
    confidence: 99.96,
    risk: 95.0,
    harm: 94.5,
    protective: 96.0,
    priority: "IMMEDIATE",
    affected: true,
    officer: "Demo Monitoring Officer",
    officerDecision: "APPROVED",
    officerTime: "11:58",
    waiting: "3 min",
  },
  {
    id: "CASE-2026-00013",
    title: "Incorrect Biometric Identity Mapping",
    type: "WRONG_MAPPING",
    biometric: "BIO-000487",
    current: "REF-001452",
    proposed: "REF-000834",
    confidence: 99.95,
    risk: 88.0,
    harm: 68.0,
    protective: 86.0,
    priority: "HIGH",
    affected: false,
    officer: "Demo Monitoring Officer",
    officerDecision: "APPROVED",
    officerTime: "11:51",
    waiting: "10 min",
  },
  {
    id: "CASE-2026-00019",
    title: "Identity Data Mismatch",
    type: "DATA_MISMATCH",
    biometric: "BIO-000733",
    current: "REF-002081",
    proposed: "REF-002081",
    confidence: 99.91,
    risk: 63.0,
    harm: 38.0,
    protective: 59.0,
    priority: "MEDIUM",
    affected: false,
    officer: "Demo Monitoring Officer",
    officerDecision: "APPROVED",
    officerTime: "11:42",
    waiting: "19 min",
  },
];


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


export default function ManagerApprovalPage() {
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
              <BadgeCheck size={15} />

              HUMAN-IN-THE-LOOP · LEVEL 2
            </div>

            <h1>
              Manager Approval
            </h1>

            <p>
              Final management review of
              Officer-approved AI correction
              packages before controlled
              execution is authorized.
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search approval queue
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                SM
              </div>

              <div className="profileText">
                <strong>
                  Supervising Manager
                </strong>

                <span>
                  Final Approver
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            MANAGER CONTROL
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldCheck size={24} />
          </div>

          <div className="alertText">
            <strong>
              Final Human Authorization Gate
            </strong>

            <span>
              No identity correction can enter
              the Execution Agent until both the
              Monitoring Officer and Manager have
              independently approved the case.
            </span>
          </div>

          <div
            className="priority high"
            style={{
              height: "31px",
              padding: "0 12px",
            }}
          >
            3 PENDING
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={BadgeCheck}
            label="Awaiting Manager"
            value="3"
            description="Officer-approved cases"
          />

          <Metric
            icon={CircleAlert}
            label="Immediate"
            value="1"
            description="Protective priority case"
          />

          <Metric
            icon={UserCheck}
            label="Officer Approved"
            value="3"
            description="Level 1 control completed"
          />

          <Metric
            icon={LockKeyhole}
            label="Execution Authorized"
            value="0"
            description="Awaiting final management decision"
          />
        </section>


        {/* ================================================
            APPROVAL CHAIN
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "14px",
            padding: "18px",
          }}
        >
          <div className="panelEyebrow">
            APPROVAL GOVERNANCE
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr auto 1fr auto 1fr",
              alignItems: "center",
              gap: "11px",
              marginTop: "17px",
            }}
          >

            {/* AI INVESTIGATION */}

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background:
                  "rgba(52,211,153,0.05)",
                border:
                  "1px solid rgba(52,211,153,0.1)",
              }}
            >
              <BrainCircuit
                size={20}
                color="#59c99d"
              />

              <strong
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontSize: "10px",
                }}
              >
                AI Investigation
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#608476",
                  fontSize: "8px",
                  marginTop: "4px",
                }}
              >
                COMPLETED
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#44566d"
            />


            {/* OFFICER REVIEW */}

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background:
                  "rgba(52,211,153,0.05)",
                border:
                  "1px solid rgba(52,211,153,0.1)",
              }}
            >
              <UserCheck
                size={20}
                color="#59c99d"
              />

              <strong
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontSize: "10px",
                }}
              >
                Officer Review
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#608476",
                  fontSize: "8px",
                  marginTop: "4px",
                }}
              >
                APPROVED
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#44566d"
            />


            {/* MANAGER APPROVAL */}

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background:
                  "rgba(255,185,90,0.05)",
                border:
                  "1px solid rgba(255,185,90,0.1)",
              }}
            >
              <BadgeCheck
                size={20}
                color="#ffbd67"
              />

              <strong
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontSize: "10px",
                }}
              >
                Manager Approval
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#9d7c4d",
                  fontSize: "8px",
                  marginTop: "4px",
                }}
              >
                CURRENT STAGE
              </span>
            </div>
          </div>
        </section>


        {/* ================================================
            FINAL APPROVAL QUEUE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                FINAL APPROVAL QUEUE
              </div>

              <h2>
                Officer-Approved Cases
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

              Management Queue
            </div>
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth: "1320px",
              }}
            >
              <thead>
                <tr>
                  <th>CASE</th>
                  <th>INVESTIGATION</th>
                  <th>PROPOSED CORRECTION</th>
                  <th>OFFICER APPROVAL</th>
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
                {managerCases.map(
                  (item) => (
                    <tr key={item.id}>

                      {/* CASE */}

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


                      {/* INVESTIGATION */}

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
                            </span>
                          </div>
                        </div>
                      </td>


                      {/* PROPOSED CORRECTION */}

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


                      {/* OFFICER APPROVAL */}

                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <CheckCircle2
                            size={15}
                            color="#55c99b"
                          />

                          <div>
                            <strong
                              style={{
                                display: "block",
                                color: "#67cba6",
                                fontSize: "9px",
                              }}
                            >
                              {item.officerDecision}
                            </strong>

                            <span
                              style={{
                                display: "block",
                                color: "#52687f",
                                fontSize: "8px",
                                marginTop: "3px",
                              }}
                            >
                              {item.officer}
                              {" · "}
                              {item.officerTime}
                            </span>
                          </div>
                        </div>
                      </td>


                      {/* AI CONFIDENCE */}

                      <td>
                        <span className="confidence">
                          {item.confidence}%
                        </span>
                      </td>


                      {/* RISK */}

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


                      {/* HARM */}

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


                      {/* PROTECTIVE */}

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


                      {/* PRIORITY */}

                      <td>
                        <PriorityBadge
                          priority={item.priority}
                        />
                      </td>


                      {/* WAITING */}

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

                          {item.waiting}
                        </div>
                      </td>


                      {/* FINAL REVIEW */}

                      <td>
                        <Link
                          href={`/cases/${item.id}`}
                          className="primaryButton"
                          style={{
                            width: "auto",
                            minWidth: "110px",
                            height: "34px",
                            marginTop: 0,
                            padding: "0 12px",
                            textDecoration: "none",
                            fontSize: "9px",
                          }}
                        >
                          Final Review

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
              3 cases awaiting final approval
            </span>

            <span>
              Protective Priority → Harm → Risk
            </span>
          </div>
        </section>


        {/* ================================================
            HIGHEST PRIORITY CASE
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1.35fr 0.65fr",
          }}
        >

          {/* ==============================================
              RECOMMENDED NEXT APPROVAL
              ============================================== */}

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
                  RECOMMENDED NEXT APPROVAL
                </div>

                <h2
                  style={{
                    margin: "6px 0 0",
                    fontSize: "17px",
                  }}
                >
                  CASE-2026-00005
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
                  The Monitoring Officer has
                  reviewed the AI investigation
                  and approved reassignment of
                  BIO-000621 from REF-001912 to
                  REF-002448. This case has a
                  Protective Priority score of
                  96 and requires final Manager
                  authorization.
                </p>
              </div>

              <PriorityBadge
                priority="IMMEDIATE"
              />
            </div>


            {/* BEFORE / AFTER */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr auto 1fr",
                alignItems: "center",
                gap: "12px",
                marginTop: "19px",
              }}
            >
              <div
                style={{
                  padding: "17px",
                  borderRadius: "12px",
                  background:
                    "rgba(255,80,100,0.045)",
                  border:
                    "1px solid rgba(255,80,100,0.1)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "#95616a",
                    fontSize: "8px",
                  }}
                >
                  CURRENT IDENTITY
                </span>

                <strong
                  style={{
                    display: "block",
                    color: "#ff7c89",
                    fontSize: "19px",
                    marginTop: "5px",
                  }}
                >
                  REF-001912
                </strong>
              </div>


              <GitCompareArrows
                size={21}
                color="#609cff"
              />


              <div
                style={{
                  padding: "17px",
                  borderRadius: "12px",
                  background:
                    "rgba(52,211,153,0.045)",
                  border:
                    "1px solid rgba(52,211,153,0.1)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "#568373",
                    fontSize: "8px",
                  }}
                >
                  AI PROPOSED IDENTITY
                </span>

                <strong
                  style={{
                    display: "block",
                    color: "#59cea0",
                    fontSize: "19px",
                    marginTop: "5px",
                  }}
                >
                  REF-002448
                </strong>
              </div>
            </div>


            {/* RISK METRICS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "9px",
                marginTop: "13px",
              }}
            >
              {[
                [
                  "AI Confidence",
                  "99.96%",
                ],
                [
                  "Risk",
                  "95.0",
                ],
                [
                  "Harm",
                  "94.5",
                ],
                [
                  "Protective",
                  "96.0",
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "12px",
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
              href="/cases/CASE-2026-00005"
              className="primaryButton"
              style={{
                textDecoration: "none",
                marginTop: "17px",
              }}
            >
              Open Complete Approval Package

              <ChevronRight size={17} />
            </Link>
          </div>


          {/* ==============================================
              MANAGER ACTIONS
              ============================================== */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  MANAGER DECISION
                </div>

                <h2>
                  Available Actions
                </h2>
              </div>

              <BadgeCheck size={22} />
            </div>


            <div
              style={{
                padding: "17px",
              }}
            >

              {/* APPROVE */}

              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Approve
                  </strong>

                  <span>
                    Authorizes the approved
                    correction for controlled
                    execution.
                  </span>
                </div>
              </div>


              {/* RETURN TO OFFICER */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,180,80,0.09)",
                  background:
                    "rgba(255,180,80,0.045)",
                }}
              >
                <UserCheck
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color: "#d2a65f",
                    }}
                  >
                    Return to Officer
                  </strong>

                  <span>
                    Sends the case back for
                    revised Officer review.
                  </span>
                </div>
              </div>


              {/* MORE INVESTIGATION */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(87,145,255,0.09)",
                  background:
                    "rgba(87,145,255,0.04)",
                }}
              >
                <BrainCircuit
                  size={21}
                  color="#6da4ff"
                />

                <div>
                  <strong
                    style={{
                      color: "#79a9ff",
                    }}
                  >
                    More Investigation
                  </strong>

                  <span>
                    Requests additional AI or
                    manual evidence before a
                    final decision.
                  </span>
                </div>
              </div>


              {/* REJECT */}

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
                    Stops authorization and
                    records the management
                    decision.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ================================================
            EXECUTION LOCK
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin: "14px 0 0",
            padding: "17px",
          }}
        >
          <LockKeyhole size={24} />

          <div>
            <strong>
              Execution Remains Locked Until
              Manager Approval
            </strong>

            <span>
              Even after Officer approval, the
              Execution Agent cannot modify the
              permitted Biometric System runtime
              record until this second human
              authorization is recorded.
              The Master Reference remains
              read-only.
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Manager Approval Workspace
          </span>

          <div>
            <ShieldCheck size={15} />

            Two-Level Governance Active
          </div>
        </footer>

      </main>
    </div>
  );
}