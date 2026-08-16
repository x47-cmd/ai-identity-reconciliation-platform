import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  Activity,
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  PieChart,
  Search,
  ShieldAlert,
  ShieldCheck,
  Timer,
  TrendingUp,
  UserCheck,
} from "lucide-react";


/* =========================================================
   EXECUTIVE ANALYTICS

   Synthetic Demo Only

   Confirmed demo metrics:
   - 3,000 Master Reference identities
   - 1,000 biometric records
   - 103 raw findings
   - 53 aggregated cases
   - 50 corroborating findings collapsed
   - 17 multi-finding cases
   - 9 protective / wrong-person cases
   - 9 Immediate / 23 High / 21 Medium
   - Detection Recall: 100%
   - Raw Finding Precision: 72.82%
   - F1: 84.27%
   - Diagnostic Precision: 100%
   - Unexplained False Positives: 0
   - Protective Detection: 100%
   - Protective Priority Accuracy: 100%
   ========================================================= */


const executiveMetrics = [
  {
    label: "Total Cases",
    value: "53",
    description:
      "Aggregated identity integrity cases",
    icon: FileSearch,
    trend: "103",
    trendLabel: "raw findings",
    tone: "blue",
  },
  {
    label: "Protective Cases",
    value: "9",
    description:
      "Wrong-person / harm protection grouping",
    icon: ShieldAlert,
    trend: "17.0%",
    trendLabel: "of all cases",
    tone: "red",
  },
  {
    label: "Detection Recall",
    value: "100%",
    description:
      "Seeded synthetic issues detected",
    icon: ShieldCheck,
    trend: "53 / 53",
    trendLabel: "expected issues",
    tone: "green",
  },
  {
    label: "Diagnostic Precision",
    value: "100%",
    description:
      "After corroborating finding analysis",
    icon: Gauge,
    trend: "0",
    trendLabel: "unexplained false positives",
    tone: "green",
  },
  {
    label: "Protective Detection",
    value: "100%",
    description:
      "Protective synthetic cases detected",
    icon: UserCheck,
    trend: "100%",
    trendLabel: "priority accuracy",
    tone: "green",
  },
  {
    label: "Canonical Resolution",
    value: "53",
    description:
      "Cases with canonical identity candidate",
    icon: BrainCircuit,
    trend: "0",
    trendLabel: "unresolved cases",
    tone: "blue",
  },
];


const priorityBreakdown = [
  {
    label: "Immediate",
    value: 9,
    percentage: 17,
    tone: "red",
  },
  {
    label: "High",
    value: 23,
    percentage: 43,
    tone: "orange",
  },
  {
    label: "Medium",
    value: 21,
    percentage: 40,
    tone: "blue",
  },
];


/* =========================================================
   PRIMARY BACKEND CASE TAXONOMY

   Total = 53
   ========================================================= */

const errorBreakdown = [
  {
    label: "Data Mismatch",
    value: 15,
    percentage: 28.3,
  },
  {
    label: "Wrong Mapping",
    value: 11,
    percentage: 20.8,
  },
  {
    label: "Complex Identity Conflict",
    value: 8,
    percentage: 15.1,
  },
  {
    label: "Duplicate Identity",
    value: 6,
    percentage: 11.3,
  },
  {
    label: "Harm Impact",
    value: 6,
    percentage: 11.3,
  },
  {
    label: "Orphan Record",
    value: 4,
    percentage: 7.5,
  },
  {
    label: "Critical Harm Identity Conflict",
    value: 3,
    percentage: 5.7,
  },
];


/* =========================================================
   CURRENT WORKFLOW SNAPSHOT

   Queue counts reflect the cleaned frontend demo state.
   ========================================================= */

const workflowBreakdown = [
  {
    label: "Cases Generated",
    value: 53,
    total: 53,
  },
  {
    label: "Awaiting Officer",
    value: 5,
    total: 53,
  },
  {
    label: "Awaiting Manager",
    value: 3,
    total: 53,
  },
  {
    label: "Correction Executed",
    value: 1,
    total: 53,
  },
  {
    label: "Verified Closed",
    value: 1,
    total: 53,
  },
];


/* =========================================================
   RECONCILIATION EVIDENCE FLOW

   No fabricated timestamps are used.
   ========================================================= */

const pipelineStages = [
  {
    label: "Biometric Records",
    value: "1,000",
    description:
      "Synthetic source records monitored",
  },
  {
    label: "Raw Findings",
    value: "103",
    description:
      "Reconciliation findings produced",
  },
  {
    label: "Aggregated Cases",
    value: "53",
    description:
      "Canonical investigation cases",
  },
  {
    label: "Corroborating Findings",
    value: "50",
    description:
      "Secondary evidence collapsed",
  },
  {
    label: "Multi-Finding Cases",
    value: "17",
    description:
      "Cases supported by multiple findings",
  },
  {
    label: "Protective Cases",
    value: "9",
    description:
      "Wrong-person / harm protection group",
  },
];


const agentMetrics = [
  {
    name: "Monitoring Agent",
    status: "VALIDATED",
    processed: "1,000",
    output: "Biometric records monitored",
  },
  {
    name: "Reconciliation Agent",
    status: "VALIDATED",
    processed: "1,000",
    output: "103 raw findings",
  },
  {
    name: "Case Aggregation Engine",
    status: "VALIDATED",
    processed: "103",
    output: "53 aggregated cases",
  },
  {
    name: "Investigation Workflow",
    status: "DEMO READY",
    processed: "53 cases",
    output: "Investigation-ready case set",
  },
  {
    name: "Approval Workflow",
    status: "VALIDATED",
    processed: "1 E2E case",
    output: "Officer + Manager approval passed",
  },
  {
    name: "Verification Agent",
    status: "VALIDATED",
    processed: "1 correction",
    output: "1 verified closed",
  },
];


const powerBiDatasets = [
  {
    name: "Case Performance",
    source: "Case and priority metrics",
    status: "PLANNED",
  },
  {
    name: "AI Findings",
    source: "Reconciliation finding metrics",
    status: "PLANNED",
  },
  {
    name: "Investigation Results",
    source: "AI investigation outputs",
    status: "PLANNED",
  },
  {
    name: "Approval Workflow",
    source: "Human decision and approval state",
    status: "PLANNED",
  },
  {
    name: "Verification Results",
    source: "Post-correction verification data",
    status: "PLANNED",
  },
];


/* =========================================================
   EXECUTIVE METRIC CARD
   ========================================================= */

function ExecutiveMetric({
  item,
}) {
  const Icon =
    item.icon;

  const colors = {
    red: {
      icon: "#ff7887",
      background:
        "rgba(255,80,100,0.08)",
      trend: "#ff8b97",
    },

    green: {
      icon: "#59cfa0",
      background:
        "rgba(52,211,153,0.08)",
      trend: "#60d5a6",
    },

    blue: {
      icon: "#69a2ff",
      background:
        "rgba(70,140,255,0.08)",
      trend: "#77aaff",
    },
  };

  const tone =
    colors[item.tone]
    ||
    colors.blue;


  return (
    <div className="metricCard">
      <div className="metricTop">
        <div
          className="metricIcon"
          style={{
            color: tone.icon,
            background:
              tone.background,
          }}
        >
          <Icon size={20} />
        </div>

        <span
          style={{
            color:
              tone.trend,
            fontSize:
              "10px",
            fontWeight:
              800,
          }}
        >
          DEMO KPI
        </span>
      </div>

      <div className="metricValue">
        {item.value}
      </div>

      <div className="metricTitle">
        {item.label}
      </div>

      <div className="metricSubtitle">
        {item.description}
      </div>

      <div
        style={{
          marginTop:
            "12px",
          paddingTop:
            "11px",
          borderTop:
            "1px solid rgba(255,255,255,0.045)",
          display:
            "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          gap:
            "12px",
        }}
      >
        <strong
          style={{
            color:
              tone.trend,
            fontSize:
              "10px",
          }}
        >
          {item.trend}
        </strong>

        <span
          style={{
            color:
              "#6c7f97",
            fontSize:
              "10px",
            textAlign:
              "right",
          }}
        >
          {item.trendLabel}
        </span>
      </div>
    </div>
  );
}


/* =========================================================
   PRIORITY BAR
   ========================================================= */

function PriorityBar({
  item,
}) {
  const tones = {
    red: "#ff697a",
    orange: "#ffb55d",
    blue: "#5f9cff",
  };


  return (
    <div
      style={{
        padding:
          "12px 0",
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
            "8px",
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap:
              "8px",
          }}
        >
          <span
            style={{
              width:
                "7px",
              height:
                "7px",
              borderRadius:
                "50%",
              background:
                tones[item.tone],
            }}
          />

          <span
            style={{
              color:
                "#8b9db3",
              fontSize:
                "11px",
            }}
          >
            {item.label}
          </span>
        </div>

        <div>
          <strong
            style={{
              color:
                "#d1ddeb",
              fontSize:
                "11px",
            }}
          >
            {item.value}
          </strong>

          <span
            style={{
              color:
                "#71839a",
              fontSize:
                "10px",
              marginLeft:
                "7px",
            }}
          >
            {item.percentage}%
          </span>
        </div>
      </div>

      <div className="progress">
        <div
          style={{
            width:
              `${item.percentage}%`,
            height:
              "100%",
            borderRadius:
              "inherit",
            background:
              tones[item.tone],
          }}
        />
      </div>
    </div>
  );
}


/* =========================================================
   ERROR BAR
   ========================================================= */

function ErrorBar({
  item,
  maxValue,
}) {
  const width =
    (
      item.value
      /
      maxValue
    )
    *
    100;


  return (
    <div
      style={{
        display:
          "grid",
        gridTemplateColumns:
          "210px 1fr 50px",
        gap:
          "12px",
        alignItems:
          "center",
        padding:
          "11px 0",
      }}
    >
      <div>
        <span
          style={{
            display:
              "block",
            color:
              "#8b9db3",
            fontSize:
              "11px",
          }}
        >
          {item.label}
        </span>

        <span
          style={{
            display:
              "block",
            color:
              "#61738c",
            fontSize:
              "10px",
            marginTop:
              "3px",
          }}
        >
          {item.percentage}% of cases
        </span>
      </div>

      <div
        style={{
          height:
            "8px",
          borderRadius:
            "8px",
          background:
            "rgba(255,255,255,0.045)",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            width:
              `${width}%`,
            height:
              "100%",
            borderRadius:
              "8px",
            background:
              "linear-gradient(90deg,#286fe6,#5e9cff)",
          }}
        />
      </div>

      <strong
        style={{
          color:
            "#cbd7e7",
          textAlign:
            "right",
          fontSize:
            "11px",
        }}
      >
        {item.value}
      </strong>
    </div>
  );
}


/* =========================================================
   RECONCILIATION PIPELINE
   ========================================================= */

function PipelineFlow() {
  return (
    <div
      style={{
        padding:
          "20px",
      }}
    >
      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(3,minmax(0,1fr))",
          gap:
            "11px",
        }}
      >
        {
          pipelineStages.map(
            (item, index) => (
              <div
                key={
                  item.label
                }
                style={{
                  minHeight:
                    "118px",
                  padding:
                    "16px",
                  borderRadius:
                    "12px",
                  background:
                    "rgba(255,255,255,0.025)",
                  border:
                    "1px solid rgba(255,255,255,0.055)",
                  position:
                    "relative",
                }}
              >
                <span
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    color:
                      "#6d8098",
                    fontSize:
                      "10px",
                    fontWeight:
                      800,
                  }}
                >
                  STAGE {index + 1}

                  <span
                    style={{
                      width:
                        "22px",
                      height:
                        "22px",
                      borderRadius:
                        "7px",
                      display:
                        "grid",
                      placeItems:
                        "center",
                      background:
                        "rgba(70,140,255,0.08)",
                      color:
                        "#74a8ff",
                    }}
                  >
                    {index + 1}
                  </span>
                </span>

                <strong
                  style={{
                    display:
                      "block",
                    color:
                      "#e1eaf6",
                    fontSize:
                      "22px",
                    marginTop:
                      "10px",
                  }}
                >
                  {item.value}
                </strong>

                <span
                  style={{
                    display:
                      "block",
                    color:
                      "#91a2b7",
                    fontSize:
                      "11px",
                    fontWeight:
                      700,
                    marginTop:
                      "2px",
                  }}
                >
                  {item.label}
                </span>

                <span
                  style={{
                    display:
                      "block",
                    color:
                      "#63768e",
                    fontSize:
                      "10px",
                    lineHeight:
                      1.5,
                    marginTop:
                      "5px",
                  }}
                >
                  {item.description}
                </span>
              </div>
            )
          )
        }
      </div>

      <div
        style={{
          marginTop:
            "14px",
          padding:
            "12px 14px",
          borderRadius:
            "10px",
          background:
            "rgba(70,140,255,0.035)",
          border:
            "1px solid rgba(70,140,255,0.07)",
          color:
            "#71849c",
          fontSize:
            "10px",
          lineHeight:
            1.6,
        }}
      >
        Raw findings are reconciled and aggregated
        into case-level investigations. Corroborating
        findings strengthen existing cases rather
        than being counted as unexplained false
        positives.
      </div>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function AnalyticsPage() {
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
              <Gauge size={15} />

              EXECUTIVE INTELLIGENCE
            </div>

            <h1>
              Analytics & KPIs
            </h1>

            <p>
              Executive visibility into identity
              integrity, protective risk,
              AI performance, workflow governance
              and verified correction outcomes.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search analytics
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                EX
              </div>

              <div className="profileText">
                <strong>
                  Executive View
                </strong>

                <span>
                  Identity Intelligence
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            EXECUTIVE STATUS
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
              Synthetic Demo Validation Passed
            </strong>

            <span>
              All 53 seeded synthetic identity
              issues were detected. Protective
              detection and protective priority
              accuracy both reached 100%, while
              unexplained false positives remained
              at zero after corroborating evidence
              analysis.
            </span>
          </div>
        </section>


        {/* ================================================
            EXECUTIVE KPI GRID
            ================================================ */}

        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(3,minmax(0,1fr))",
            gap:
              "16px",
            marginBottom:
              "16px",
          }}
        >
          {
            executiveMetrics.map(
              (item) => (
                <ExecutiveMetric
                  key={
                    item.label
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
            PRIORITY + PROTECTIVE RISK
            ================================================ */}

        <section className="dashboardGrid">

          {/* PRIORITY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE SEVERITY
                </div>

                <h2>
                  Priority Distribution
                </h2>
              </div>

              <PieChart size={22} />
            </div>

            <div
              style={{
                padding:
                  "12px 20px 20px",
              }}
            >
              {
                priorityBreakdown.map(
                  (item) => (
                    <PriorityBar
                      key={
                        item.label
                      }
                      item={
                        item
                      }
                    />
                  )
                )
              }

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap:
                    "8px",
                  marginTop:
                    "13px",
                }}
              >
                {
                  priorityBreakdown.map(
                    (item) => (
                      <div
                        key={
                          item.label
                        }
                        style={{
                          padding:
                            "12px",
                          borderRadius:
                            "10px",
                          background:
                            "rgba(255,255,255,0.024)",
                          border:
                            "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "block",
                            color:
                              "#71839a",
                            fontSize:
                              "10px",
                          }}
                        >
                          {item.label}
                        </span>

                        <strong
                          style={{
                            display:
                              "block",
                            color:
                              "#d1ddec",
                            fontSize:
                              "18px",
                            marginTop:
                              "4px",
                          }}
                        >
                          {item.value}
                        </strong>
                      </div>
                    )
                  )
                }
              </div>
            </div>
          </div>


          {/* PROTECTIVE RISK */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  PROTECTIVE INTELLIGENCE
                </div>

                <h2>
                  Wrong-Person Protection
                </h2>
              </div>

              <ShieldAlert size={22} />
            </div>

            <div
              style={{
                padding:
                  "19px",
              }}
            >
              <div
                style={{
                  width:
                    "145px",
                  height:
                    "145px",
                  borderRadius:
                    "50%",
                  margin:
                    "0 auto",
                  border:
                    "13px solid rgba(255,85,105,0.10)",
                  outline:
                    "4px solid rgba(255,85,105,0.21)",
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                }}
              >
                <strong
                  style={{
                    color:
                      "#ff7b89",
                    fontSize:
                      "34px",
                  }}
                >
                  9
                </strong>

                <span
                  style={{
                    color:
                      "#a56d76",
                    fontSize:
                      "10px",
                    fontWeight:
                      750,
                  }}
                >
                  PROTECTIVE CASES
                </span>
              </div>

              <div
                style={{
                  marginTop:
                    "22px",
                }}
              >
                <div className="detailRow">
                  <span>
                    Protective Detection
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    100%
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Priority Accuracy
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    100%
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Protective Cases
                  </span>

                  <strong>
                    9
                  </strong>
                </div>
              </div>

              <div
                style={{
                  marginTop:
                    "13px",
                  color:
                    "#71839a",
                  fontSize:
                    "10px",
                  lineHeight:
                    1.6,
                }}
              >
                Protective Cases is an executive
                grouping for wrong-person and
                harm-sensitive cases. It is not
                a single backend case type.
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            ERROR CLASSIFICATION
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                PRIMARY CASE TAXONOMY
              </div>

              <h2>
                Cases by Backend Error Type
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>

          <div
            style={{
              padding:
                "12px 20px 20px",
            }}
          >
            {
              errorBreakdown.map(
                (item) => (
                  <ErrorBar
                    key={
                      item.label
                    }
                    item={
                      item
                    }
                    maxValue={15}
                  />
                )
              )
            }
          </div>
        </section>


        {/* ================================================
            PIPELINE + WORKFLOW
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "16px",
          }}
        >

          {/* PIPELINE */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  RECONCILIATION PIPELINE
                </div>

                <h2>
                  Evidence & Case Flow
                </h2>
              </div>

              <TrendingUp size={22} />
            </div>

            <PipelineFlow />
          </div>


          {/* WORKFLOW */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE LIFECYCLE
                </div>

                <h2>
                  Workflow Snapshot
                </h2>
              </div>

              <Activity size={22} />
            </div>

            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {
                workflowBreakdown.map(
                  (item) => {
                    const percentage =
                      (
                        item.value
                        /
                        item.total
                      )
                      *
                      100;

                    return (
                      <div
                        key={
                          item.label
                        }
                        style={{
                          padding:
                            "11px 0",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            gap:
                              "12px",
                            marginBottom:
                              "7px",
                          }}
                        >
                          <span
                            style={{
                              color:
                                "#8b9db3",
                              fontSize:
                                "11px",
                            }}
                          >
                            {item.label}
                          </span>

                          <strong
                            style={{
                              color:
                                "#d0dbea",
                              fontSize:
                                "11px",
                            }}
                          >
                            {item.value}
                          </strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progressFill"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )
              }

              <div
                style={{
                  marginTop:
                    "11px",
                  color:
                    "#687b93",
                  fontSize:
                    "10px",
                  lineHeight:
                    1.6,
                }}
              >
                Queue and milestone values are a
                workflow snapshot and are not
                mutually exclusive totals.
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            OPERATIONAL DATA
            ================================================ */}

        <section
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(4,minmax(0,1fr))",
            gap:
              "16px",
            marginTop:
              "16px",
          }}
        >
          <div className="metricCard">
            <div className="metricIcon">
              <ShieldCheck size={20} />
            </div>

            <div className="metricValue">
              PASSED
            </div>

            <div className="metricTitle">
              E2E Demo Workflow
            </div>

            <div className="metricSubtitle">
              Officer → Manager → Execution → Verification
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <Database size={20} />
            </div>

            <div className="metricValue">
              3,000
            </div>

            <div className="metricTitle">
              Master Identities
            </div>

            <div className="metricSubtitle">
              Authoritative read-only reference
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <Fingerprint size={20} />
            </div>

            <div className="metricValue">
              1,000
            </div>

            <div className="metricTitle">
              Biometric Records
            </div>

            <div className="metricSubtitle">
              Synthetic reconciliation dataset
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <BrainCircuit size={20} />
            </div>

            <div className="metricValue">
              103
            </div>

            <div className="metricTitle">
              Raw AI Findings
            </div>

            <div className="metricSubtitle">
              Aggregated into 53 cases
            </div>
          </div>
        </section>


        {/* ================================================
            AGENT ANALYTICS
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AGENTIC AI OPERATIONS
              </div>

              <h2>
                Validated Demo Components
              </h2>
            </div>

            <BrainCircuit size={22} />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>COMPONENT</th>
                  <th>DEMO STATUS</th>
                  <th>INPUT / PROCESSED</th>
                  <th>RESULT</th>
                </tr>
              </thead>

              <tbody>
                {
                  agentMetrics.map(
                    (agent) => (
                      <tr
                        key={
                          agent.name
                        }
                      >
                        <td>
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap:
                                "9px",
                            }}
                          >
                            <div className="agentIcon">
                              <BrainCircuit
                                size={16}
                              />
                            </div>

                            <strong
                              style={{
                                color:
                                  "#cbd7e7",
                                fontSize:
                                  "11px",
                              }}
                            >
                              {agent.name}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <span
                            style={{
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              gap:
                                "6px",
                              color:
                                "#59cfa0",
                              fontSize:
                                "10px",
                              fontWeight:
                                800,
                            }}
                          >
                            <span className="greenDot" />

                            {agent.status}
                          </span>
                        </td>

                        <td>
                          {agent.processed}
                        </td>

                        <td>
                          {agent.output}
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
            POWER BI CENTER
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                ENTERPRISE REPORTING
              </div>

              <h2>
                Power BI Intelligence Center
              </h2>
            </div>

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "1.15fr 0.85fr",
              gap:
                "16px",
              padding:
                "20px",
            }}
          >

            {/* POWER BI PREVIEW */}

            <div
              style={{
                minHeight:
                  "330px",
                borderRadius:
                  "14px",
                background:
                  "linear-gradient(135deg,rgba(31,100,210,0.11),rgba(10,22,39,0.35))",
                border:
                  "1px solid rgba(90,150,255,0.11)",
                padding:
                  "22px",
                display:
                  "flex",
                flexDirection:
                  "column",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap:
                      "10px",
                  }}
                >
                  <div className="metricIcon">
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <strong
                      style={{
                        display:
                          "block",
                        color:
                          "#d3dfed",
                        fontSize:
                          "12px",
                      }}
                    >
                      Executive Power BI Report
                    </strong>

                    <span
                      style={{
                        display:
                          "block",
                        color:
                          "#71839a",
                        fontSize:
                          "10px",
                        marginTop:
                          "4px",
                      }}
                    >
                      Planned secured reporting integration
                    </span>
                  </div>
                </div>


                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(3,1fr)",
                    gap:
                      "9px",
                    marginTop:
                      "25px",
                  }}
                >
                  {[
                    [
                      "Cases",
                      "53",
                    ],
                    [
                      "Protection",
                      "9",
                    ],
                    [
                      "Recall",
                      "100%",
                    ],
                  ].map(
                    ([
                      label,
                      value,
                    ]) => (
                      <div
                        key={
                          label
                        }
                        style={{
                          padding:
                            "15px",
                          borderRadius:
                            "11px",
                          background:
                            "rgba(255,255,255,0.025)",
                          border:
                            "1px solid rgba(255,255,255,0.055)",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "block",
                            color:
                              "#71839a",
                            fontSize:
                              "10px",
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
                            fontSize:
                              "20px",
                          }}
                        >
                          {value}
                        </strong>
                      </div>
                    )
                  )}
                </div>
              </div>


              <div
                style={{
                  padding:
                    "16px",
                  borderRadius:
                    "11px",
                  background:
                    "rgba(255,185,65,0.045)",
                  border:
                    "1px solid rgba(255,185,65,0.09)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",
                    color:
                      "#d4ac63",
                    fontSize:
                      "11px",
                  }}
                >
                  Power BI Integration Ready
                </strong>

                <span
                  style={{
                    display:
                      "block",
                    color:
                      "#927b54",
                    fontSize:
                      "10px",
                    lineHeight:
                      1.6,
                    marginTop:
                      "5px",
                  }}
                >
                  Power BI is a planned production
                  integration. The current frontend
                  uses native demonstration
                  visualizations and does not claim
                  an active Power BI connection.
                </span>
              </div>
            </div>


            {/* POWER BI DATA SOURCES */}

            <div>
              <div className="panelEyebrow">
                PLANNED REPORT DATASETS
              </div>

              <h3
                style={{
                  margin:
                    "6px 0 15px",
                  fontSize:
                    "13px",
                }}
              >
                Analytics Data Pipeline
              </h3>

              {
                powerBiDatasets.map(
                  (dataset) => (
                    <div
                      key={
                        dataset.name
                      }
                      style={{
                        padding:
                          "13px",
                        borderRadius:
                          "10px",
                        background:
                          "rgba(255,255,255,0.024)",
                        border:
                          "1px solid rgba(255,255,255,0.05)",
                        marginBottom:
                          "8px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap:
                          "10px",
                      }}
                    >
                      <Database
                        size={17}
                        color="#659eff"
                      />

                      <div
                        style={{
                          flex:
                            1,
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",
                            color:
                              "#c9d6e5",
                            fontSize:
                              "11px",
                          }}
                        >
                          {dataset.name}
                        </strong>

                        <span
                          style={{
                            display:
                              "block",
                            color:
                              "#71839a",
                            fontSize:
                              "10px",
                            marginTop:
                              "3px",
                          }}
                        >
                          {dataset.source}
                        </span>
                      </div>

                      <span
                        style={{
                          color:
                            "#d4ac63",
                          fontSize:
                            "10px",
                          fontWeight:
                            800,
                        }}
                      >
                        {dataset.status}
                      </span>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </section>


        {/* ================================================
            MANAGEMENT KPI GROUPS
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
            marginTop:
              "16px",
          }}
        >

          {/* OPERATIONS */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  OPERATIONAL KPIs
                </div>

                <h2>
                  Workflow Snapshot
                </h2>
              </div>

              <Timer size={22} />
            </div>

            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  "Cases Awaiting Officer",
                  "5",
                ],
                [
                  "Cases Awaiting Manager",
                  "3",
                ],
                [
                  "Completed Demo Correction",
                  "1",
                ],
                [
                  "Verified Closed",
                  "1",
                ],
                [
                  "Verification Failure",
                  "0",
                ],
                [
                  "Rollback Required",
                  "0",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={
                      label
                    }
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


          {/* QUALITY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  AI QUALITY KPIs
                </div>

                <h2>
                  Detection Quality
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {[
                [
                  "Synthetic Issues Expected",
                  "53",
                ],
                [
                  "Synthetic Issues Detected",
                  "53",
                ],
                [
                  "Detection Recall",
                  "100%",
                ],
                [
                  "Raw Finding Precision",
                  "72.82%",
                ],
                [
                  "Raw Finding F1",
                  "84.27%",
                ],
                [
                  "Diagnostic Precision",
                  "100%",
                ],
                [
                  "Unexplained False Positives",
                  "0",
                ],
                [
                  "Protective Detection",
                  "100%",
                ],
                [
                  "Protective Priority Accuracy",
                  "100%",
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    className="detailRow"
                    key={
                      label
                    }
                  >
                    <span>
                      {label}
                    </span>

                    <strong
                      style={{
                        color:
                          value === "0"
                          ||
                          value === "100%"
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
            MANAGEMENT INSIGHT
            ================================================ */}

        <section
          className="alertBanner"
          style={{
            marginTop:
              "16px",
            marginBottom:
              0,
          }}
        >
          <div className="alertIcon">
            <TrendingUp size={24} />
          </div>

          <div className="alertText">
            <strong>
              Executive Insight
            </strong>

            <span>
              Data mismatch is the largest
              individual backend case type.
              Separately, the protective grouping
              contains 9 wrong-person and
              harm-sensitive cases requiring
              elevated human attention. Volume
              and protective harm should therefore
              be monitored as different management
              dimensions.
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
            View Cases

            <ChevronRight size={17} />
          </Link>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Executive Analytics Center
          </span>

          <div>
            <Activity size={15} />

            Synthetic Intelligence View
          </div>
        </footer>

      </main>
    </div>
  );
}