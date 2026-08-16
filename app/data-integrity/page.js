import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Database,
  FileSearch,
  Fingerprint,
  Gauge,
  GitCompareArrows,
  Link2,
  LockKeyhole,
  RefreshCcw,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";


/* =========================================================
   DATA INTEGRITY DEMO METRICS
   Synthetic Demo Only
   ========================================================= */

const integrityMetrics = [
  {
    label: "Master Identities",
    value: "3,000",
    description:
      "Authoritative reference identities",
    icon: Database,
    status: "READ ONLY",
  },
  {
    label: "Biometric Records",
    value: "1,000",
    description:
      "Records under continuous reconciliation",
    icon: Fingerprint,
    status: "MONITORED",
  },
  {
    label: "AI Findings",
    value: "103",
    description:
      "Raw reconciliation findings generated",
    icon: BrainCircuit,
    status: "ANALYZED",
  },
  {
    label: "Aggregated Cases",
    value: "53",
    description:
      "Distinct identity integrity cases",
    icon: FileSearch,
    status: "RESOLVED",
  },
];


const integrityIssues = [
  {
    label: "Data Mismatch",
    count: 15,
    severity: "MEDIUM",
    description:
      "Personal or identity attributes are inconsistent across systems.",
  },
  {
    label: "Wrong Mapping",
    count: 11,
    severity: "HIGH",
    description:
      "Biometric record appears linked to the wrong Master identity.",
  },
  {
    label: "Harm Impact",
    count: 9,
    severity: "IMMEDIATE",
    description:
      "Identity conflict may negatively affect an unrelated person.",
  },
  {
    label: "Complex Identity Conflict",
    count: 8,
    severity: "HIGH",
    description:
      "Multiple related identity and biometric findings require aggregation.",
  },
  {
    label: "Duplicate Identity",
    count: 6,
    severity: "HIGH",
    description:
      "Multiple registration relationships appear to reference the same identity.",
  },
  {
    label: "Orphan Record",
    count: 4,
    severity: "MEDIUM",
    description:
      "Biometric record has no valid authoritative Master relationship.",
  },
];


const systemHealth = [
  {
    system: "Master Reference System",
    role: "Authoritative Identity Source",
    records: "3,000",
    access: "READ ONLY",
    status: "HEALTHY",
    icon: Database,
  },
  {
    system: "Biometric System",
    role: "Operational Biometric Source",
    records: "1,000",
    access: "CONTROLLED",
    status: "HEALTHY",
    icon: Fingerprint,
  },
  {
    system: "Reconciliation Engine",
    role: "Cross-System Comparison",
    records: "1,000",
    access: "AI PROCESSING",
    status: "ACTIVE",
    icon: GitCompareArrows,
  },
  {
    system: "Case Engine",
    role: "Finding Aggregation",
    records: "53 cases",
    access: "AI PROCESSING",
    status: "ACTIVE",
    icon: FileSearch,
  },
];


const monitoringRuns = [
  {
    id: "MON-2026-00004",
    time: "12:00",
    biometric: "1,000",
    master: "3,000",
    findings: "103",
    cases: "53",
    status: "COMPLETED",
  },
  {
    id: "MON-2026-00003",
    time: "11:00",
    biometric: "1,000",
    master: "3,000",
    findings: "103",
    cases: "53",
    status: "COMPLETED",
  },
  {
    id: "MON-2026-00002",
    time: "10:00",
    biometric: "1,000",
    master: "3,000",
    findings: "103",
    cases: "53",
    status: "COMPLETED",
  },
];


const integrityChecks = [
  {
    label: "Master Reference Availability",
    score: 100,
  },
  {
    label: "Biometric Record Coverage",
    score: 100,
  },
  {
    label: "Canonical Identity Resolution",
    score: 100,
  },
  {
    label: "Protective Harm Detection",
    score: 100,
  },
  {
    label: "Post-Correction Verification",
    score: 100,
  },
];


/* =========================================================
   METRIC CARD
   ========================================================= */

function IntegrityMetric({
  item,
}) {
  const Icon = item.icon;

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
          {item.status}
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
    </div>
  );
}


/* =========================================================
   SEVERITY BADGE
   ========================================================= */

function SeverityBadge({
  severity,
}) {
  const styles = {
    IMMEDIATE: {
      color: "#ff7c89",
      background:
        "rgba(255,80,100,0.08)",
      border:
        "rgba(255,80,100,0.14)",
    },

    HIGH: {
      color: "#ffbd67",
      background:
        "rgba(255,185,90,0.07)",
      border:
        "rgba(255,185,90,0.13)",
    },

    MEDIUM: {
      color: "#76a9ff",
      background:
        "rgba(70,135,255,0.07)",
      border:
        "rgba(70,135,255,0.13)",
    },
  };


  const style =
    styles[severity]
    ||
    styles.MEDIUM;


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
          style.color,

        background:
          style.background,

        border:
          `1px solid ${style.border}`,

        fontSize:
          "8px",

        fontWeight:
          800,
      }}
    >
      {severity}
    </span>
  );
}


/* =========================================================
   READ ONLY BADGE
   ========================================================= */

function ReadOnlyBadge() {
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
          "#59cfa0",

        background:
          "rgba(52,211,153,0.07)",

        border:
          "1px solid rgba(52,211,153,0.13)",

        fontSize:
          "8px",

        fontWeight:
          800,
      }}
    >
      READ ONLY
    </span>
  );
}


/* =========================================================
   STATUS
   ========================================================= */

function HealthStatus({
  status,
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",

        color: "#59cfa0",

        fontSize: "8px",
        fontWeight: 800,
      }}
    >
      <span className="greenDot" />

      {status}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function DataIntegrityPage() {
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
              <Database size={15} />

              CROSS-SYSTEM DATA GOVERNANCE
            </div>

            <h1>
              Data Integrity Center
            </h1>

            <p>
              Continuous visibility into
              biometric-to-identity relationships,
              cross-system inconsistencies,
              duplicate records, orphan records
              and Master Reference protection.
            </p>
          </div>

          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search identity / biometric
              </span>
            </button>

            <div className="profile">
              <div className="avatar">
                DI
              </div>

              <div className="profileText">
                <strong>
                  Data Integrity
                </strong>

                <span>
                  Monitoring Operations
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            MASTER PROTECTION
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
              Master Reference Protection Active
            </strong>

            <span>
              The authoritative Master Reference
              System is used as a read-only source
              of truth. AI agents cannot
              automatically modify Master identity
              records. Suspected Master data issues
              must be escalated for dedicated
              human review.
            </span>
          </div>
        </section>


        {/* ================================================
            METRICS
            ================================================ */}

        <section className="statsGrid">
          {
            integrityMetrics.map(
              (item) => (
                <IntegrityMetric
                  key={item.label}
                  item={item}
                />
              )
            )
          }
        </section>


        {/* ================================================
            SYSTEM ARCHITECTURE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom: "14px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                CROSS-SYSTEM RECONCILIATION
              </div>

              <h2>
                Identity Data Relationship
              </h2>
            </div>

            <GitCompareArrows size={22} />
          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr auto 1.1fr auto 1fr",

              alignItems: "stretch",

              gap: "14px",

              padding: "24px",
            }}
          >

            {/* MASTER */}

            <div
              style={{
                padding: "22px",

                borderRadius: "15px",

                background:
                  "rgba(52,211,153,0.045)",

                border:
                  "1px solid rgba(52,211,153,0.11)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",

                  borderRadius: "12px",

                  display: "grid",
                  placeItems: "center",

                  background:
                    "rgba(52,211,153,0.08)",

                  color: "#59cfa0",
                }}
              >
                <Database size={22} />
              </div>

              <div
                style={{
                  color: "#58ad8c",

                  fontSize: "9px",

                  fontWeight: 800,

                  letterSpacing: "1px",

                  marginTop: "16px",
                }}
              >
                SYSTEM B
              </div>

              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                Master Reference
              </h3>

              <strong
                style={{
                  display: "block",

                  marginTop: "13px",

                  fontSize: "25px",

                  color: "#d4e3ee",
                }}
              >
                3,000
              </strong>

              <span
                style={{
                  color: "#62798a",
                  fontSize: "8px",
                }}
              >
                authoritative identities
              </span>

              <div
                style={{
                  marginTop: "16px",
                }}
              >
                <ReadOnlyBadge />
              </div>

              <div
                style={{
                  color: "#58ad8c",

                  fontSize: "8px",

                  fontWeight: 800,

                  marginTop: "9px",
                }}
              >
                SOURCE OF TRUTH · PROTECTED
              </div>
            </div>


            {/* ARROW */}

            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <ChevronRight
                size={23}
                color="#47627f"
              />
            </div>


            {/* AI LAYER */}

            <div
              style={{
                padding: "22px",

                borderRadius: "15px",

                background:
                  "rgba(66,136,255,0.055)",

                border:
                  "1px solid rgba(70,140,255,0.12)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",

                  borderRadius: "12px",

                  display: "grid",
                  placeItems: "center",

                  background:
                    "rgba(70,140,255,0.09)",

                  color: "#69a2ff",
                }}
              >
                <BrainCircuit size={22} />
              </div>

              <div
                style={{
                  color: "#6598e9",

                  fontSize: "9px",

                  fontWeight: 800,

                  letterSpacing: "1px",

                  marginTop: "16px",
                }}
              >
                SYSTEM C
              </div>

              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                AI Reconciliation Layer
              </h3>

              <strong
                style={{
                  display: "block",

                  marginTop: "13px",

                  fontSize: "25px",
                }}
              >
                103
              </strong>

              <span
                style={{
                  color: "#62798a",
                  fontSize: "8px",
                }}
              >
                AI findings analyzed
              </span>

              <div
                style={{
                  marginTop: "16px",

                  color: "#69a2ff",

                  fontSize: "8px",

                  fontWeight: 800,
                }}
              >
                DETECT · ANALYZE · RESOLVE
              </div>
            </div>


            {/* ARROW */}

            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <ChevronRight
                size={23}
                color="#47627f"
              />
            </div>


            {/* BIOMETRIC */}

            <div
              style={{
                padding: "22px",

                borderRadius: "15px",

                background:
                  "rgba(255,185,90,0.045)",

                border:
                  "1px solid rgba(255,185,90,0.10)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",

                  borderRadius: "12px",

                  display: "grid",
                  placeItems: "center",

                  background:
                    "rgba(255,185,90,0.08)",

                  color: "#ffbd67",
                }}
              >
                <Fingerprint size={22} />
              </div>

              <div
                style={{
                  color: "#c69554",

                  fontSize: "9px",

                  fontWeight: 800,

                  letterSpacing: "1px",

                  marginTop: "16px",
                }}
              >
                SYSTEM A
              </div>

              <h3
                style={{
                  margin:
                    "5px 0 0",

                  fontSize:
                    "14px",
                }}
              >
                Biometric System
              </h3>

              <strong
                style={{
                  display: "block",

                  marginTop: "13px",

                  fontSize: "25px",
                }}
              >
                1,000
              </strong>

              <span
                style={{
                  color: "#62798a",
                  fontSize: "8px",
                }}
              >
                biometric records
              </span>

              <div
                style={{
                  marginTop: "16px",

                  color: "#d59d52",

                  fontSize: "8px",

                  fontWeight: 800,
                }}
              >
                CONTROLLED CORRECTION TARGET
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            QUALITY + ISSUE CLASSIFICATION
            ================================================ */}

        <section className="dashboardGrid">

          {/* DATA QUALITY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  DATA QUALITY
                </div>

                <h2>
                  Integrity Check Performance
                </h2>
              </div>

              <Gauge size={22} />
            </div>

            <div
              style={{
                padding:
                  "9px 20px 20px",
              }}
            >
              {
                integrityChecks.map(
                  (check) => (
                    <div
                      key={check.label}
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
                        <span
                          style={{
                            color:
                              "#8194aa",

                            fontSize:
                              "9px",
                          }}
                        >
                          {check.label}
                        </span>

                        <strong
                          style={{
                            color:
                              "#59cfa0",

                            fontSize:
                              "10px",
                          }}
                        >
                          {check.score}%
                        </strong>
                      </div>

                      <div className="progress">
                        <div
                          className="progressFill"
                          style={{
                            width:
                              `${check.score}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>


          {/* QUALITY SUMMARY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CURRENT STATE
                </div>

                <h2>
                  Integrity Summary
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
                  width: "145px",
                  height: "145px",

                  borderRadius: "50%",

                  margin:
                    "0 auto",

                  border:
                    "13px solid rgba(52,211,153,0.10)",

                  outline:
                    "4px solid rgba(52,211,153,0.20)",

                  display: "flex",

                  flexDirection:
                    "column",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <strong
                  style={{
                    fontSize:
                      "33px",

                    color:
                      "#59cfa0",
                  }}
                >
                  100
                </strong>

                <span
                  style={{
                    color:
                      "#598071",

                    fontSize:
                      "8px",
                  }}
                >
                  MONITORING SCORE
                </span>
              </div>

              <div
                style={{
                  marginTop: "22px",
                }}
              >
                <div className="detailRow">
                  <span>
                    Missed Synthetic Issues
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    0
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Unresolved Identity Cases
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    0
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Unexplained False Positives
                  </span>

                  <strong
                    style={{
                      color:
                        "#59cfa0",
                    }}
                  >
                    0
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            ISSUE CLASSIFICATION
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
                INTEGRITY EXCEPTIONS
              </div>

              <h2>
                Detected Data Integrity Issues
              </h2>
            </div>

            <AlertTriangle size={22} />
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>ISSUE TYPE</th>
                  <th>COUNT</th>
                  <th>SEVERITY</th>
                  <th>DESCRIPTION</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {
                  integrityIssues.map(
                    (issue) => (
                      <tr key={issue.label}>
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
                            {
                              issue.severity
                              ===
                              "IMMEDIATE"
                                ? (
                                  <ShieldAlert
                                    size={16}
                                    color="#ff7887"
                                  />
                                )
                                : (
                                  <CircleAlert
                                    size={16}
                                    color="#69a2ff"
                                  />
                                )
                            }

                            <strong
                              style={{
                                color:
                                  "#ccd8e7",

                                fontSize:
                                  "9px",
                              }}
                            >
                              {issue.label}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <strong
                            style={{
                              fontSize:
                                "12px",
                            }}
                          >
                            {issue.count}
                          </strong>
                        </td>

                        <td>
                          <SeverityBadge
                            severity={
                              issue.severity
                            }
                          />
                        </td>

                        <td>
                          <span
                            style={{
                              color:
                                "#687a91",

                              fontSize:
                                "9px",

                              lineHeight:
                                1.5,
                            }}
                          >
                            {issue.description}
                          </span>
                        </td>

                        <td>
                          <Link
                            href="/cases"
                            style={{
                              width: "30px",
                              height: "30px",

                              borderRadius:
                                "8px",

                              display:
                                "grid",

                              placeItems:
                                "center",

                              border:
                                "1px solid rgba(255,255,255,0.06)",

                              color:
                                "#69a2ff",

                              textDecoration:
                                "none",
                            }}
                            aria-label={`View ${issue.label} cases`}
                          >
                            <ChevronRight size={15} />
                          </Link>
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
            SYSTEM HEALTH
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
                PLATFORM CONNECTIONS
              </div>

              <h2>
                Source & Processing Health
              </h2>
            </div>

            <Server size={22} />
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>SYSTEM</th>
                  <th>ROLE</th>
                  <th>RECORDS</th>
                  <th>ACCESS MODEL</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {
                  systemHealth.map(
                    (system) => {
                      const Icon =
                        system.icon;

                      return (
                        <tr
                          key={
                            system.system
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
                                <Icon size={16} />
                              </div>

                              <strong
                                style={{
                                  color:
                                    "#ccd8e7",

                                  fontSize:
                                    "9px",
                                }}
                              >
                                {system.system}
                              </strong>
                            </div>
                          </td>

                          <td>
                            {system.role}
                          </td>

                          <td>
                            <strong>
                              {system.records}
                            </strong>
                          </td>

                          <td>
                            <span
                              style={{
                                color:
                                  system.access
                                  ===
                                  "READ ONLY"
                                    ? "#59cfa0"
                                    : "#73a7ff",

                                fontSize:
                                  "8px",

                                fontWeight:
                                  800,
                              }}
                            >
                              {system.access}
                            </span>
                          </td>

                          <td>
                            <HealthStatus
                              status={
                                system.status
                              }
                            />
                          </td>
                        </tr>
                      );
                    }
                  )
                }
              </tbody>
            </table>
          </div>
        </section>


        {/* ================================================
            MONITORING RUNS
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop: "14px",
          }}
        >

          {/* RECONCILIATION RUNS */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CONTINUOUS MONITORING
                </div>

                <h2>
                  Reconciliation Runs
                </h2>
              </div>

              <RefreshCcw size={22} />
            </div>

            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>RUN</th>
                    <th>TIME</th>
                    <th>BIOMETRIC</th>
                    <th>MASTER</th>
                    <th>FINDINGS</th>
                    <th>CASES</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    monitoringRuns.map(
                      (run) => (
                        <tr key={run.id}>
                          <td className="mono">
                            {run.id}
                          </td>

                          <td>
                            {run.time}
                          </td>

                          <td>
                            {run.biometric}
                          </td>

                          <td>
                            {run.master}
                          </td>

                          <td>
                            {run.findings}
                          </td>

                          <td>
                            {run.cases}
                          </td>

                          <td>
                            <HealthStatus
                              status={
                                run.status
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
          </div>


          {/* ==============================================
              MASTER GOVERNANCE
              ============================================== */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  MASTER GOVERNANCE
                </div>

                <h2>
                  Source-of-Truth Controls
                </h2>
              </div>

              <LockKeyhole size={22} />
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
                    Master Writes Blocked
                  </strong>

                  <span>
                    AI correction workflows do
                    not write automatically to
                    the Master Reference System.
                  </span>
                </div>
              </div>

              <div className="integrityInfo">
                <ShieldCheck size={21} />

                <div>
                  <strong>
                    Source-of-Truth Validation
                  </strong>

                  <span>
                    Master identities are used
                    as authoritative candidates
                    during reconciliation.
                  </span>
                </div>
              </div>

              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.09)",

                  background:
                    "rgba(255,185,90,0.045)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#d1a35d",
                    }}
                  >
                    Master Review Required
                  </strong>

                  <span>
                    If evidence suggests the
                    Master record itself may be
                    incorrect, the case is
                    escalated rather than
                    automatically corrected.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            INTEGRITY FLOW
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
                INTEGRITY CONTROL FLOW
              </div>

              <h2>
                From Data Change to Verified
                Integrity
              </h2>
            </div>

            <Link2 size={22} />
          </div>

          <div
            style={{
              padding: "20px",

              display: "flex",

              alignItems: "center",

              gap: "8px",

              overflowX: "auto",
            }}
          >
            {[
              "Data Change",
              "Monitoring",
              "Reconciliation",
              "AI Finding",
              "Case",
              "Investigation",
              "Human Approval",
              "Correction",
              "Verification",
              "Integrity Restored",
            ].map(
              (
                stage,
                index
              ) => (
                <div
                  key={stage}
                  style={{
                    display: "flex",

                    alignItems:
                      "center",

                    gap: "8px",

                    flexShrink:
                      0,
                  }}
                >
                  <div
                    style={{
                      minWidth:
                        "110px",

                      padding:
                        "11px",

                      borderRadius:
                        "10px",

                      textAlign:
                        "center",

                      background:
                        index === 9
                          ? "rgba(52,211,153,0.06)"
                          : "rgba(67,137,255,0.045)",

                      border:
                        index === 9
                          ? "1px solid rgba(52,211,153,0.11)"
                          : "1px solid rgba(67,137,255,0.08)",

                      color:
                        index === 9
                          ? "#59cfa0"
                          : "#76a9ff",

                      fontSize:
                        "8px",

                      fontWeight:
                        750,
                    }}
                  >
                    {stage}
                  </div>

                  {
                    index < 9
                    &&
                    (
                      <ChevronRight
                        size={14}
                        color="#43566d"
                      />
                    )
                  }
                </div>
              )
            )}
          </div>
        </section>


        {/* ================================================
            FINAL MESSAGE
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
              Continuous Identity Integrity
              Monitoring
            </strong>

            <span>
              The platform continuously compares
              operational biometric relationships
              against the authoritative Master
              Reference, detects integrity
              exceptions, prioritizes potential
              human harm and provides controlled
              remediation with full verification.
            </span>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Data Integrity Center
          </span>

          <div>
            <Activity size={15} />

            Continuous Reconciliation Active
          </div>
        </footer>

      </main>
    </div>
  );
}