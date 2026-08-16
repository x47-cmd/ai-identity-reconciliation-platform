import Sidebar from "../components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  GitCompareArrows,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   MANAGER APPROVAL QUEUE

   Synthetic Demo Only

   These cases represent Officer-approved packages that have
   reached the Level 2 management authorization stage.

   Detailed frontend case pages are not currently implemented
   for these representative queue records, so no deep links
   are exposed from this workspace.
   ========================================================= */

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
    queueOrder: 1,
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
    queueOrder: 2,
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
    queueOrder: 3,
  },
];


/* =========================================================
   QUEUE METRICS

   Derived from managerCases to prevent count drift.
   ========================================================= */

const queueMetrics = {
  total:
    managerCases.length,

  immediate:
    managerCases.filter(
      (item) =>
        item.priority === "IMMEDIATE"
    ).length,

  high:
    managerCases.filter(
      (item) =>
        item.priority === "HIGH"
    ).length,

  medium:
    managerCases.filter(
      (item) =>
        item.priority === "MEDIUM"
    ).length,

  officerApproved:
    managerCases.filter(
      (item) =>
        item.officerDecision === "APPROVED"
    ).length,

  executionAuthorized:
    0,
};


const recommendedCase =
  managerCases[0];


/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

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

        <span className="metricStatus">
          DEMO KPI
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


/* =========================================================
   PAGE
   ========================================================= */

export default function ManagerApprovalPage() {
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
              No sensitive identity correction can
              enter controlled execution until both
              the Monitoring Officer and Supervising
              Manager have independently approved
              the correction package.
            </span>
          </div>

          <div
            className="priority high"
            style={{
              height: "31px",
              padding: "0 12px",
            }}
          >
            {queueMetrics.total}
            {" PENDING"}
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">
          <Metric
            icon={BadgeCheck}
            label="Awaiting Manager"
            value={queueMetrics.total}
            description="Officer-approved packages at Level 2"
          />

          <Metric
            icon={CircleAlert}
            label="Immediate"
            value={queueMetrics.immediate}
            description="Highest protective priority"
          />

          <Metric
            icon={UserCheck}
            label="Officer Approved"
            value={queueMetrics.officerApproved}
            description="Level 1 human control completed"
          />

          <Metric
            icon={LockKeyhole}
            label="Execution Authorized"
            value={queueMetrics.executionAuthorized}
            description="No pending package authorized yet"
          />
        </section>


        {/* ================================================
            APPROVAL CHAIN
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "16px",
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
                  fontSize: "11px",
                }}
              >
                AI Investigation
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#6f9586",
                  fontSize: "10px",
                  lineHeight: 1.4,
                  marginTop: "4px",
                }}
              >
                COMPLETED
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#52647b"
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
                  fontSize: "11px",
                }}
              >
                Officer Review
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#6f9586",
                  fontSize: "10px",
                  lineHeight: 1.4,
                  marginTop: "4px",
                }}
              >
                APPROVED
              </span>
            </div>


            <ChevronRight
              size={17}
              color="#52647b"
            />


            {/* MANAGER APPROVAL */}

            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background:
                  "rgba(255,185,90,0.055)",
                border:
                  "1px solid rgba(255,185,90,0.12)",
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
                  fontSize: "11px",
                }}
              >
                Manager Approval
              </strong>

              <span
                style={{
                  display: "block",
                  color: "#b18b55",
                  fontSize: "10px",
                  lineHeight: 1.4,
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
                color: "#71839a",
                fontSize: "10px",
              }}
            >
              <Activity size={15} />

              Synthetic Manager Queue
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
                  <th>QUEUE</th>
                  <th></th>
                </tr>
              </thead>


              <tbody>
                {
                  managerCases.map(
                    (item) => (
                      <tr key={item.id}>

                        {/* CASE */}

                        <td>
                          <span
                            className="caseId"
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {item.id}
                          </span>

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
                            {
                              item.affected
                                ? (
                                  <ShieldAlert
                                    size={16}
                                    color="#ff7584"
                                  />
                                )
                                : (
                                  <BrainCircuit
                                    size={16}
                                    color="#669fff"
                                  />
                                )
                            }

                            <div>
                              <strong
                                style={{
                                  display: "block",
                                  color: "#cbd8e7",
                                  fontSize: "11px",
                                  lineHeight: 1.45,
                                }}
                              >
                                {item.title}
                              </strong>

                              <span
                                style={{
                                  display: "block",
                                  color: "#71839a",
                                  fontSize: "10px",
                                  lineHeight: 1.4,
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
                                  fontSize: "10px",
                                }}
                              >
                                {item.officerDecision}
                              </strong>

                              <span
                                style={{
                                  display: "block",
                                  color: "#71839a",
                                  fontSize: "10px",
                                  lineHeight: 1.4,
                                  marginTop: "3px",
                                }}
                              >
                                {item.officer}
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
                                    : "#aab9ca",

                              fontSize: "11px",
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
                                  : "#aab9ca",

                              fontSize: "11px",
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
                                  : "#82aeff",

                              fontSize: "11px",
                            }}
                          >
                            {item.protective}
                          </strong>
                        </td>


                        {/* PRIORITY */}

                        <td>
                          <PriorityBadge
                            priority={
                              item.priority
                            }
                          />
                        </td>


                        {/* QUEUE ORDER */}

                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "7px",
                              color: "#7b8da4",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "7px",
                                display: "grid",
                                placeItems: "center",
                                background:
                                  "rgba(70,140,255,0.07)",
                                border:
                                  "1px solid rgba(70,140,255,0.1)",
                                color: "#78a9ff",
                              }}
                            >
                              {item.queueOrder}
                            </span>

                            Priority
                          </div>
                        </td>


                        {/* FINAL REVIEW */}

                        <td>
                          <button
                            className="searchButton"
                            disabled
                            title="Detailed case package is not included in the current frontend demo"
                            style={{
                              minWidth: "112px",
                              minHeight: "36px",
                              padding: "0 12px",
                            }}
                          >
                            Final Review

                            <ChevronRight size={14} />
                          </button>
                        </td>

                      </tr>
                    )
                  )
                }
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
              gap: "16px",
              color: "#687b93",
              fontSize: "10px",
              lineHeight: 1.5,
            }}
          >
            <span>
              {queueMetrics.total}
              {" "}
              cases awaiting final management approval
            </span>

            <span>
              Protective Priority → Harm → Risk
            </span>
          </div>
        </section>


        {/* ================================================
            RECOMMENDED APPROVAL + MANAGER ACTIONS
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
                  {recommendedCase.id}
                </h2>

                <p
                  style={{
                    color: "#7b8da4",
                    fontSize: "11px",
                    lineHeight: 1.7,
                    maxWidth: "650px",
                    marginTop: "9px",
                  }}
                >
                  The Monitoring Officer has
                  approved the proposed reassignment
                  of
                  {" "}
                  {recommendedCase.biometric}
                  {" "}
                  from
                  {" "}
                  {recommendedCase.current}
                  {" "}
                  to
                  {" "}
                  {recommendedCase.proposed}.
                  {" "}
                  This package currently has the
                  highest protective priority in
                  the synthetic Manager queue.
                </p>
              </div>

              <PriorityBadge
                priority={
                  recommendedCase.priority
                }
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
                    color: "#a36d76",
                    fontSize: "10px",
                    fontWeight: 750,
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
                  {recommendedCase.current}
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
                    color: "#679585",
                    fontSize: "10px",
                    fontWeight: 750,
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
                  {recommendedCase.proposed}
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
                  `${recommendedCase.confidence}%`,
                ],
                [
                  "Risk",
                  recommendedCase.risk,
                ],
                [
                  "Harm",
                  recommendedCase.harm,
                ],
                [
                  "Protective",
                  recommendedCase.protective,
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
                        color: "#71839a",
                        fontSize: "10px",
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


            <button
              className="primaryButton"
              disabled
              title="Detailed approval package is not included in the current frontend demo"
              style={{
                marginTop: "17px",
              }}
            >
              Detailed Approval Package Planned

              <ChevronRight size={17} />
            </button>
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
              <div
                style={{
                  marginBottom: "13px",
                  padding: "11px 12px",
                  borderRadius: "9px",
                  background:
                    "rgba(70,140,255,0.045)",
                  border:
                    "1px solid rgba(70,140,255,0.08)",
                  color: "#8194ad",
                  fontSize: "10px",
                  lineHeight: 1.55,
                }}
              >
                These actions apply after the
                Manager opens and validates the
                selected Officer-approved
                correction package.
              </div>


              {/* APPROVE */}

              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Approve
                  </strong>

                  <span>
                    Authorizes the reviewed
                    correction package for
                    controlled execution.
                  </span>
                </div>
              </div>


              {/* RETURN TO OFFICER */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,180,80,0.12)",
                  background:
                    "rgba(255,180,80,0.055)",
                }}
              >
                <UserCheck
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color: "#e0ad5f",
                    }}
                  >
                    Return to Officer
                  </strong>

                  <span>
                    Sends the package back for
                    revised Level 1 human review.
                  </span>
                </div>
              </div>


              {/* MORE INVESTIGATION */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(87,145,255,0.12)",
                  background:
                    "rgba(87,145,255,0.05)",
                }}
              >
                <BrainCircuit
                  size={21}
                  color="#6da4ff"
                />

                <div>
                  <strong
                    style={{
                      color: "#86b0ff",
                    }}
                  >
                    More Investigation
                  </strong>

                  <span>
                    Requests additional AI-assisted
                    or manual evidence before a
                    final decision.
                  </span>
                </div>
              </div>


              {/* REJECT */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,90,105,0.11)",
                  background:
                    "rgba(255,90,105,0.05)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ff7887"
                />

                <div>
                  <strong
                    style={{
                      color: "#df7884",
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
            margin: "16px 0 0",
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
              Officer approval alone cannot
              authorize execution. The controlled
              Execution Agent remains locked until
              the second human authorization is
              recorded. The Master Reference
              remains read only.
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