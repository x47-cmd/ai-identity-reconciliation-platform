import Sidebar from "../components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   OFFICER REVIEW QUEUE

   Synthetic Demo Only

   CASE-2026-00001 is intentionally excluded because the
   verified E2E demonstration case is already VERIFIED_CLOSED.

   These records represent cases currently positioned at the
   Level 1 human review stage in the frontend demonstration.
   ========================================================= */

const officerCases = [
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
    findings: 2,
    queueOrder: 1,
    hasDetail: false,
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
    findings: 2,
    queueOrder: 2,
    hasDetail: false,
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
    findings: 2,
    queueOrder: 3,
    hasDetail: false,
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
    findings: 5,
    queueOrder: 4,
    hasDetail: false,
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
    findings: 1,
    queueOrder: 5,
    hasDetail: false,
  },
];


/* =========================================================
   QUEUE METRICS

   Derived from the queue to prevent frontend count drift.
   ========================================================= */

const queueMetrics = {
  total:
    officerCases.length,

  immediate:
    officerCases.filter(
      (item) =>
        item.priority === "IMMEDIATE"
    ).length,

  high:
    officerCases.filter(
      (item) =>
        item.priority === "HIGH"
    ).length,

  medium:
    officerCases.filter(
      (item) =>
        item.priority === "MEDIUM"
    ).length,

  wrongPerson:
    officerCases.filter(
      (item) =>
        item.affected
    ).length,

  aiInvestigated:
    officerCases.length,

  sentToManager:
    3,
};


const recommendedCase =
  officerCases[0];


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
              {queueMetrics.wrongPerson}
              {" "}
              Wrong-Person Impact Cases
              Require Immediate Review
            </strong>

            <span>
              Protective cases are positioned
              ahead of normal technical cases
              because an unrelated person may
              be affected by an incorrect
              identity relationship.
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
            value={queueMetrics.total}
            description="Cases positioned for Level 1 review"
          />

          <Metric
            icon={CircleAlert}
            label="Immediate"
            value={queueMetrics.immediate}
            description="Protective intervention cases"
          />

          <Metric
            icon={BrainCircuit}
            label="AI Investigated"
            value={queueMetrics.aiInvestigated}
            description="Evidence packages prepared for review"
          />

          <Metric
            icon={BadgeCheck}
            label="Awaiting Manager"
            value={queueMetrics.sentToManager}
            description="Officer-approved cases at Level 2"
          />
        </section>


        {/* ================================================
            REVIEW GOVERNANCE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "16px",
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
                  color: "#71839a",
                  fontSize: "10px",
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
                fontSize: "10px",
                fontWeight: 800,
                whiteSpace: "nowrap",
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
            marginBottom: "16px",
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
                {queueMetrics.total}
              </span>
            </button>

            <button className="searchButton">
              Immediate

              <span>
                {queueMetrics.immediate}
              </span>
            </button>

            <button className="searchButton">
              High

              <span>
                {queueMetrics.high}
              </span>
            </button>

            <button className="searchButton">
              Medium

              <span>
                {queueMetrics.medium}
              </span>
            </button>

            <button className="searchButton">
              Wrong-Person Impact

              <span>
                {queueMetrics.wrongPerson}
              </span>
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
                color: "#71839a",
                fontSize: "10px",
              }}
            >
              <Activity size={15} />

              Synthetic Review Queue
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
                  <th>QUEUE</th>
                  <th></th>
                </tr>
              </thead>


              <tbody>
                {
                  officerCases.map(
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
                                {" · "}
                                {item.findings}
                                {" findings"}
                              </span>
                            </div>
                          </div>
                        </td>


                        {/* IDENTITY CHANGE */}

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


                        {/* CONFIDENCE */}

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
                            priority={item.priority}
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


                        {/* REVIEW */}

                        <td>
                          <button
                            className="searchButton"
                            disabled
                            title="Detailed case view is not included in the current frontend demo"
                            style={{
                              minWidth: "112px",
                              minHeight: "36px",
                              padding: "0 12px",
                            }}
                          >
                            Review Case

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
              cases awaiting Level 1 human review
            </span>

            <span>
              Protective Priority → Harm → Risk
              → AI Confidence
            </span>
          </div>
        </section>


        {/* ================================================
            RECOMMENDED REVIEW + DECISION MODEL
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1.35fr 0.65fr",
          }}
        >

          {/* ==============================================
              NEXT RECOMMENDED REVIEW
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
                  NEXT RECOMMENDED REVIEW
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
                  The current highest-priority
                  Officer review case contains a
                  potential wrong-person identity
                  conflict. The proposed identity
                  relationship is
                  {" "}
                  {recommendedCase.proposed}
                  {" "}
                  with
                  {" "}
                  {recommendedCase.confidence}%
                  {" "}
                  AI confidence.
                </p>
              </div>

              <PriorityBadge
                priority={
                  recommendedCase.priority
                }
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
              title="Detailed case view is not included in the current frontend demo"
              style={{
                marginTop: "18px",
              }}
            >
              Detailed Investigation View Planned

              <ChevronRight size={17} />
            </button>
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
                Decision controls shown below
                apply to the selected Officer
                review case after its evidence
                package is opened.
              </div>


              {/* APPROVE */}

              <div className="integrityInfo">
                <CheckCircle2 size={21} />

                <div>
                  <strong>
                    Approve
                  </strong>

                  <span>
                    Sends the reviewed correction
                    package to Manager approval.
                  </span>
                </div>
              </div>


              {/* MORE INVESTIGATION */}

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,180,80,0.12)",
                  background:
                    "rgba(255,180,80,0.055)",
                }}
              >
                <BrainCircuit
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color: "#e0ad5f",
                    }}
                  >
                    More Investigation
                  </strong>

                  <span>
                    Returns the case for
                    additional AI-assisted or
                    manual investigation.
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
            margin: "16px 0 0",
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
              can be executed from this workflow
              without both approvals.
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Officer Review Workspace
          </span>

          <div>
            <Activity size={15} />

            Synthetic Review Queue
          </div>
        </footer>

      </main>
    </div>
  );
}