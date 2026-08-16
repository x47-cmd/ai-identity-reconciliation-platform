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
   EXECUTIVE DEMO METRICS

   Synthetic Demo Only

   These numbers reflect the current project demo:
   - 53 aggregated cases
   - 9 Immediate
   - 23 High
   - 21 Medium
   - 9 Wrong-person impact cases
   - 100% recall on seeded synthetic anomalies
   - 100% diagnostic precision after excluding
     corroborating / secondary findings
   - 100% protective detection
   - 100% protective priority accuracy
   ========================================================= */


const executiveMetrics = [
  {
    label: "Total Cases",
    value: "53",
    description:
      "Aggregated identity integrity cases",
    icon: FileSearch,
    trend: "+53",
    trendLabel: "current demo run",
    tone: "blue",
  },
  {
    label: "Wrong-Person Impact",
    value: "9",
    description:
      "Cases requiring protective attention",
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
    trendLabel: "issues detected",
    tone: "green",
  },
  {
    label: "Diagnostic Precision",
    value: "100%",
    description:
      "After corroborating findings analysis",
    icon: Gauge,
    trend: "0",
    trendLabel: "unexplained false positives",
    tone: "green",
  },
  {
    label: "Protective Detection",
    value: "100%",
    description:
      "Synthetic harm-impact cases detected",
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
    label: "Harm Impact",
    value: 9,
    percentage: 17.0,
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
    label: "Orphan Record",
    value: 4,
    percentage: 7.5,
  },
];


const workflowBreakdown = [
  {
    label: "AI Investigated",
    value: 53,
    total: 53,
  },
  {
    label: "Awaiting Officer",
    value: 6,
    total: 53,
  },
  {
    label: "Awaiting Manager",
    value: 3,
    total: 53,
  },
  {
    label: "Authorized",
    value: 1,
    total: 53,
  },
  {
    label: "Verified Closed",
    value: 1,
    total: 53,
  },
];


const trendData = [
  {
    label: "08:00",
    cases: 8,
    harm: 1,
  },
  {
    label: "09:00",
    cases: 17,
    harm: 2,
  },
  {
    label: "10:00",
    cases: 29,
    harm: 4,
  },
  {
    label: "11:00",
    cases: 41,
    harm: 7,
  },
  {
    label: "12:00",
    cases: 53,
    harm: 9,
  },
];


const agentMetrics = [
  {
    name: "Monitoring Agent",
    status: "ACTIVE",
    processed: "1,000",
    output: "Changes monitored",
  },
  {
    name: "Reconciliation Agent",
    status: "ACTIVE",
    processed: "1,000",
    output: "103 findings",
  },
  {
    name: "Case Aggregation Engine",
    status: "ACTIVE",
    processed: "103",
    output: "53 cases",
  },
  {
    name: "Investigation Agent",
    status: "ACTIVE",
    processed: "53",
    output: "53 investigations",
  },
  {
    name: "Approval Workflow",
    status: "READY",
    processed: "53",
    output: "Human review queues",
  },
  {
    name: "Verification Agent",
    status: "ACTIVE",
    processed: "1",
    output: "1 verified closed",
  },
];


const powerBiDatasets = [
  {
    name: "Case Performance",
    source: "cases.csv",
    records: "53",
    status: "READY",
  },
  {
    name: "AI Findings",
    source: "findings.csv",
    records: "103",
    status: "READY",
  },
  {
    name: "Investigation Results",
    source: "investigations.csv",
    records: "53",
    status: "READY",
  },
  {
    name: "Approval Workflow",
    source: "approval_state.json",
    records: "53",
    status: "READY",
  },
  {
    name: "Verification Results",
    source: "verification_results.csv",
    records: "1+",
    status: "READY",
  },
];


/* =========================================================
   METRIC CARD
   ========================================================= */

function ExecutiveMetric({
  item,
}) {
  const Icon = item.icon;

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
              "8px",

            fontWeight:
              800,
          }}
        >
          LIVE KPI
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
        }}
      >
        <strong
          style={{
            color:
              tone.trend,

            fontSize:
              "9px",
          }}
        >
          {item.trend}
        </strong>

        <span
          style={{
            color:
              "#50637b",

            fontSize:
              "8px",
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
                "#8597ad",

              fontSize:
                "10px",
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
                "#566a82",

              fontSize:
                "8px",

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
          "160px 1fr 45px",

        gap:
          "12px",

        alignItems:
          "center",

        padding:
          "10px 0",
      }}
    >
      <span
        style={{
          color:
            "#8294aa",

          fontSize:
            "9px",
        }}
      >
        {item.label}
      </span>

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
            "10px",
        }}
      >
        {item.value}
      </strong>
    </div>
  );
}


/* =========================================================
   TREND CHART
   ========================================================= */

function TrendChart() {
  const maxCases =
    Math.max(
      ...trendData.map(
        (item) =>
          item.cases
      )
    );


  return (
    <div
      style={{
        padding:
          "19px 20px 18px",
      }}
    >
      <div
        style={{
          height:
            "210px",

          display:
            "flex",

          alignItems:
            "flex-end",

          gap:
            "20px",

          borderBottom:
            "1px solid rgba(255,255,255,0.06)",

          position:
            "relative",
        }}
      >
        {
          trendData.map(
            (item) => {
              const height =
                (
                  item.cases
                  /
                  maxCases
                )
                *
                170;

              const harmHeight =
                (
                  item.harm
                  /
                  9
                )
                *
                170;


              return (
                <div
                  key={
                    item.label
                  }
                  style={{
                    flex:
                      1,

                    height:
                      "100%",

                    display:
                      "flex",

                    alignItems:
                      "flex-end",

                    justifyContent:
                      "center",

                    gap:
                      "5px",

                    position:
                      "relative",
                  }}
                >
                  <div
                    style={{
                      width:
                        "22px",

                      height:
                        `${height}px`,

                      minHeight:
                        "10px",

                      borderRadius:
                        "7px 7px 0 0",

                      background:
                        "linear-gradient(180deg,#4e96ff,#225dc0)",
                    }}
                  />

                  <div
                    style={{
                      width:
                        "9px",

                      height:
                        `${harmHeight}px`,

                      minHeight:
                        "5px",

                      borderRadius:
                        "5px 5px 0 0",

                      background:
                        "#ff697a",
                    }}
                  />

                  <span
                    style={{
                      position:
                        "absolute",

                      bottom:
                        "-22px",

                      color:
                        "#52657e",

                      fontSize:
                        "8px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            }
          )
        }
      </div>

      <div
        style={{
          marginTop:
            "35px",

          display:
            "flex",

          gap:
            "18px",

          alignItems:
            "center",
        }}
      >
        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "6px",

            color:
              "#657890",

            fontSize:
              "8px",
          }}
        >
          <span
            style={{
              width:
                "8px",

              height:
                "8px",

              borderRadius:
                "3px",

              background:
                "#4e96ff",
            }}
          />

          Total Cases
        </div>

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "6px",

            color:
              "#657890",

            fontSize:
              "8px",
          }}
        >
          <span
            style={{
              width:
                "8px",

              height:
                "8px",

              borderRadius:
                "3px",

              background:
                "#ff697a",
            }}
          />

          Wrong-Person Impact
        </div>
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
              <Gauge size={15} />

              EXECUTIVE INTELLIGENCE
            </div>

            <h1>
              Analytics & KPIs
            </h1>

            <p>
              Executive visibility into identity
              integrity, protective risk,
              AI performance, workflow efficiency
              and correction outcomes.
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
              Identity Integrity Intelligence
              Operational
            </strong>

            <span>
              All seeded synthetic identity
              integrity issues were detected in
              the current demonstration run.
              Protective harm-impact detection
              and priority classification both
              reached 100%.
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
              "14px",

            marginBottom:
              "14px",
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
                              "#596c84",

                            fontSize:
                              "8px",
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
                  Wrong-Person Risk
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
                      "#8e6068",

                    fontSize:
                      "8px",
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
                    Detection Recall
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
                    Immediate Protection
                  </span>

                  <strong>
                    9
                  </strong>
                </div>
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
              "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                ROOT CAUSE INTELLIGENCE
              </div>

              <h2>
                Cases by Error Type
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
                    maxValue={
                      15
                    }
                  />
                )
              )
            }
          </div>
        </section>


        {/* ================================================
            TREND + WORKFLOW
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "14px",
          }}
        >

          {/* TREND */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  MONITORING TREND
                </div>

                <h2>
                  Case Detection Over Time
                </h2>
              </div>

              <TrendingUp size={22} />
            </div>

            <TrendChart />
          </div>


          {/* WORKFLOW */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE LIFECYCLE
                </div>

                <h2>
                  Workflow Position
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

                            marginBottom:
                              "7px",
                          }}
                        >
                          <span
                            style={{
                              color:
                                "#8193aa",

                              fontSize:
                                "9px",
                            }}
                          >
                            {item.label}
                          </span>

                          <strong
                            style={{
                              color:
                                "#d0dbea",

                              fontSize:
                                "10px",
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
            </div>
          </div>
        </section>


        {/* ================================================
            OPERATIONAL KPI
            ================================================ */}

        <section
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(4,minmax(0,1fr))",

            gap:
              "14px",

            marginTop:
              "14px",
          }}
        >
          <div className="metricCard">
            <div className="metricIcon">
              <Timer size={20} />
            </div>

            <div className="metricValue">
              10s
            </div>

            <div className="metricTitle">
              Demo Run Time
            </div>

            <div className="metricSubtitle">
              Full automated GitHub workflow
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
              Read-only reference records
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
              Continuously reconciled dataset
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
              AI Findings
            </div>

            <div className="metricSubtitle">
              Consolidated into 53 cases
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
              "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AGENTIC AI OPERATIONS
              </div>

              <h2>
                Agent Performance
              </h2>
            </div>

            <BrainCircuit size={22} />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>AGENT</th>
                  <th>STATUS</th>
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
                                  "9px",
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
                                "8px",

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
              "14px",
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
                "14px",

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
                          "11px",
                      }}
                    >
                      Executive Power BI Report
                    </strong>

                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#60738d",

                        fontSize:
                          "8px",

                        marginTop:
                          "4px",
                      }}
                    >
                      Embedded reporting workspace
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
                      "9px",
                  }}
                >
                  Power BI Integration Ready
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#826e4d",

                    fontSize:
                      "8px",

                    lineHeight:
                      1.6,

                    marginTop:
                      "5px",
                  }}
                >
                  The final production version can
                  embed a secured Power BI report
                  here. The current page uses
                  frontend demo visualizations
                  until the Power BI dataset and
                  workspace are connected.
                </span>
              </div>
            </div>


            {/* POWER BI DATA SOURCES */}

            <div>
              <div className="panelEyebrow">
                REPORT DATASETS
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
                              "9px",
                          }}
                        >
                          {dataset.name}
                        </strong>

                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#566a82",

                            fontSize:
                              "8px",

                            marginTop:
                              "3px",
                          }}
                        >
                          {dataset.source}
                          {" · "}
                          {dataset.records}
                          {" records"}
                        </span>
                      </div>

                      <span
                        style={{
                          color:
                            "#59cfa0",

                          fontSize:
                            "8px",

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
              "14px",
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
                  Workflow Efficiency
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
                  "6",
                ],
                [
                  "Cases Awaiting Manager",
                  "3",
                ],
                [
                  "Authorized Corrections",
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
                  "Missed Issues",
                  "0",
                ],
                [
                  "Unexplained False Positives",
                  "0",
                ],
                [
                  "Protective Detection Recall",
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
              "14px",

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
              Data mismatch is currently the
              largest case category, while
              wrong-person impact represents
              the highest protective urgency.
              Management reporting should
              therefore monitor both error
              volume and human harm separately.
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

            Intelligence Monitoring Active
          </div>
        </footer>

      </main>
    </div>
  );
}