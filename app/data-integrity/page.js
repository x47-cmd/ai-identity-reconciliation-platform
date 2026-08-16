import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
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

   Validated reconciliation dataset:
   - Master Reference identities: 3,000
   - Biometric records: 1,000
   - Raw findings: 103
   - Aggregated cases: 53
   - Unresolved canonical cases: 0
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
      "Synthetic operational records reconciled",
    icon: Fingerprint,
    status: "MONITORED",
  },
  {
    label: "Raw AI Findings",
    value: "103",
    description:
      "Reconciliation findings generated",
    icon: BrainCircuit,
    status: "ANALYZED",
  },
  {
    label: "Aggregated Cases",
    value: "53",
    description:
      "Distinct identity integrity cases",
    icon: FileSearch,
    status: "AGGREGATED",
  },
];


/* =========================================================
   PRIMARY BACKEND CASE TAXONOMY

   Total = 53

   Protective / Wrong-Person grouping = 9
   - HARM_IMPACT = 6
   - CRITICAL_HARM_IDENTITY_CONFLICT = 3
   ========================================================= */

const integrityIssues = [
  {
    label: "Data Mismatch",
    count: 15,
    severity: "MEDIUM",
    description:
      "Identity or registration attributes are inconsistent across compared records.",
  },
  {
    label: "Wrong Mapping",
    count: 11,
    severity: "HIGH",
    description:
      "A biometric record appears associated with an incorrect Master identity.",
  },
  {
    label: "Complex Identity Conflict",
    count: 8,
    severity: "HIGH",
    description:
      "Multiple related identity findings require combined investigation and resolution.",
  },
  {
    label: "Duplicate Identity",
    count: 6,
    severity: "HIGH",
    description:
      "Multiple registration relationships appear to reference the same identity.",
  },
  {
    label: "Harm Impact",
    count: 6,
    severity: "IMMEDIATE",
    description:
      "An identity conflict creates elevated potential for wrong-person impact.",
  },
  {
    label: "Orphan Record",
    count: 4,
    severity: "MEDIUM",
    description:
      "A biometric record has no valid authoritative Master relationship.",
  },
  {
    label: "Critical Harm Identity Conflict",
    count: 3,
    severity: "IMMEDIATE",
    description:
      "Critical cross-identity conflict requires immediate protective human attention.",
  },
];


/* =========================================================
   SYSTEM STATE
   ========================================================= */

const systemHealth = [
  {
    system: "Master Reference System",
    role: "Authoritative Identity Source",
    records: "3,000",
    access: "READ ONLY",
    status: "PROTECTED",
    icon: Database,
  },
  {
    system: "Biometric System",
    role: "Operational Biometric Source",
    records: "1,000",
    access: "CONTROLLED TARGET",
    status: "MONITORED",
    icon: Fingerprint,
  },
  {
    system: "Reconciliation Engine",
    role: "Cross-System Comparison",
    records: "1,000",
    access: "AI PROCESSING",
    status: "VALIDATED",
    icon: GitCompareArrows,
  },
  {
    system: "Case Engine",
    role: "Finding Aggregation",
    records: "53 cases",
    access: "AI PROCESSING",
    status: "VALIDATED",
    icon: FileSearch,
  },
];


/* =========================================================
   VALIDATED DEMO SNAPSHOT

   Fabricated monitoring IDs and timestamps are intentionally
   not displayed.
   ========================================================= */

const demoSnapshots = [
  {
    name: "Current Demo Reconciliation",
    scope: "Synthetic validation dataset",
    biometric: "1,000",
    master: "3,000",
    findings: "103",
    cases: "53",
    status: "VALIDATED",
  },
];


/* =========================================================
   VALIDATED QUALITY CHECKS

   These checks correspond to metrics actually produced
   by the current synthetic evaluation.
   ========================================================= */

const integrityChecks = [
  {
    label: "Detection Recall",
    value: "100%",
    score: 100,
    description:
      "53 of 53 seeded synthetic issues detected",
  },
  {
    label: "Canonical Case Resolution",
    value: "53 / 53",
    score: 100,
    description:
      "No unresolved canonical identity cases",
  },
  {
    label: "Diagnostic Precision",
    value: "100%",
    score: 100,
    description:
      "After corroborating finding analysis",
  },
  {
    label: "Protective Detection",
    value: "100%",
    score: 100,
    description:
      "All protective synthetic cases detected",
  },
  {
    label: "Protective Priority Accuracy",
    value: "100%",
    score: 100,
    description:
      "Protective priority classification validated",
  },
];


/* =========================================================
   METRIC CARD
   ========================================================= */

function IntegrityMetric({
  item,
}) {
  const Icon =
    item.icon;

  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={20} />
        </div>

        <span
          style={{
            color: "#59cfa0",
            fontSize: "10px",
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
        minHeight: "25px",
        padding: "0 10px",
        borderRadius: "7px",
        color: style.color,
        background: style.background,
        border:
          `1px solid ${style.border}`,
        fontSize: "10px",
        fontWeight: 800,
        whiteSpace: "nowrap",
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
        minHeight: "25px",
        padding: "0 10px",
        borderRadius: "7px",
        color: "#59cfa0",
        background:
          "rgba(52,211,153,0.07)",
        border:
          "1px solid rgba(52,211,153,0.13)",
        fontSize: "10px",
        fontWeight: 800,
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
        fontSize: "10px",
        fontWeight: 800,
        whiteSpace: "nowrap",
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
            margin: "0 0 20px",
            padding: "18px",
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
              are escalated for dedicated human
              review.
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
            marginBottom: "16px",
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
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  marginTop: "16px",
                }}
              >
                SYSTEM B
              </div>

              <h3
                style={{
                  margin: "5px 0 0",
                  fontSize: "14px",
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
                  color: "#71859b",
                  fontSize: "10px",
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
                  fontSize: "10px",
                  fontWeight: 800,
                  marginTop: "9px",
                }}
              >
                SOURCE OF TRUTH · PROTECTED
              </div>
            </div>


            {/* MASTER → AI */}

            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <ChevronRight
                size={25}
                color="#557391"
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
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  marginTop: "16px",
                }}
              >
                SYSTEM C
              </div>

              <h3
                style={{
                  margin: "5px 0 0",
                  fontSize: "14px",
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
                  color: "#71859b",
                  fontSize: "10px",
                }}
              >
                raw reconciliation findings
              </span>

              <div
                style={{
                  marginTop: "16px",
                  color: "#69a2ff",
                  fontSize: "10px",
                  fontWeight: 800,
                }}
              >
                COMPARE · DETECT · INVESTIGATE
              </div>

              <div
                style={{
                  marginTop: "8px",
                  color: "#657990",
                  fontSize: "10px",
                  lineHeight: 1.5,
                }}
              >
                Reads both source systems and
                evaluates identity relationships.
              </div>
            </div>


            {/* BIOMETRIC → AI */}

            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <ChevronLeft
                size={25}
                color="#557391"
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
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  marginTop: "16px",
                }}
              >
                SYSTEM A
              </div>

              <h3
                style={{
                  margin: "5px 0 0",
                  fontSize: "14px",
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
                  color: "#71859b",
                  fontSize: "10px",
                }}
              >
                biometric records
              </span>

              <div
                style={{
                  marginTop: "16px",
                  color: "#d59d52",
                  fontSize: "10px",
                  fontWeight: 800,
                }}
              >
                CONTROLLED CORRECTION TARGET
              </div>

              <div
                style={{
                  marginTop: "8px",
                  color: "#7e725d",
                  fontSize: "10px",
                  lineHeight: 1.5,
                }}
              >
                Corrections require Officer and
                Manager approval before execution.
              </div>
            </div>
          </div>


          <div
            style={{
              margin: "0 24px 22px",
              padding: "12px 14px",
              borderRadius: "10px",
              background:
                "rgba(70,140,255,0.035)",
              border:
                "1px solid rgba(70,140,255,0.07)",
              color: "#71849c",
              fontSize: "10px",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Master Reference → AI Reconciliation ← Biometric System.
            The AI compares both sources; it does
            not treat the Master Reference as an
            automated correction target.
          </div>
        </section>


        {/* ================================================
            QUALITY + SUMMARY
            ================================================ */}

        <section className="dashboardGrid">

          {/* DATA QUALITY */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  VALIDATED DATA QUALITY
                </div>

                <h2>
                  Reconciliation Quality Metrics
                </h2>
              </div>

              <Gauge size={22} />
            </div>

            <div
              style={{
                padding: "9px 20px 20px",
              }}
            >
              {
                integrityChecks.map(
                  (check) => (
                    <div
                      key={check.label}
                      style={{
                        padding: "12px 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              display: "block",
                              color: "#8b9db3",
                              fontSize: "11px",
                              fontWeight: 650,
                            }}
                          >
                            {check.label}
                          </span>

                          <span
                            style={{
                              display: "block",
                              color: "#657890",
                              fontSize: "10px",
                              lineHeight: 1.45,
                              marginTop: "3px",
                            }}
                          >
                            {check.description}
                          </span>
                        </div>

                        <strong
                          style={{
                            color: "#59cfa0",
                            fontSize: "11px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {check.value}
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
                  CURRENT DEMO STATE
                </div>

                <h2>
                  Integrity Summary
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>

            <div
              style={{
                padding: "18px",
              }}
            >
              <div
                style={{
                  width: "145px",
                  height: "145px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  border:
                    "13px solid rgba(52,211,153,0.10)",
                  outline:
                    "4px solid rgba(52,211,153,0.20)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <strong
                  style={{
                    fontSize: "27px",
                    color: "#59cfa0",
                  }}
                >
                  53/53
                </strong>

                <span
                  style={{
                    color: "#6b9384",
                    fontSize: "10px",
                    fontWeight: 750,
                    textAlign: "center",
                    marginTop: "3px",
                  }}
                >
                  CANONICAL
                  <br />
                  RESOLUTION
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
                      color: "#59cfa0",
                    }}
                  >
                    0
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Unresolved Canonical Cases
                  </span>

                  <strong
                    style={{
                      color: "#59cfa0",
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
                      color: "#59cfa0",
                    }}
                  >
                    0
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
                  marginTop: "13px",
                  color: "#71839a",
                  fontSize: "10px",
                  lineHeight: 1.6,
                }}
              >
                Canonical resolution means each
                aggregated case has an identified
                canonical identity candidate. It
                does not mean all 53 workflow
                cases are closed.
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
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                PRIMARY CASE TAXONOMY
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
                              display: "flex",
                              alignItems: "center",
                              gap: "9px",
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
                                color: "#ccd8e7",
                                fontSize: "11px",
                              }}
                            >
                              {issue.label}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <strong
                            style={{
                              fontSize: "12px",
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
                              color: "#788ba2",
                              fontSize: "11px",
                              lineHeight: 1.55,
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
                              borderRadius: "8px",
                              display: "grid",
                              placeItems: "center",
                              border:
                                "1px solid rgba(255,255,255,0.06)",
                              color: "#69a2ff",
                              textDecoration: "none",
                            }}
                            aria-label={
                              `View ${issue.label} cases`
                            }
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


          <div
            style={{
              padding: "14px 18px",
              borderTop:
                "1px solid rgba(255,255,255,0.05)",
              color: "#687b93",
              fontSize: "10px",
              lineHeight: 1.55,
            }}
          >
            The primary backend taxonomy totals
            53 cases. The separate 9-case
            protective grouping combines
            HARM_IMPACT and
            CRITICAL_HARM_IDENTITY_CONFLICT
            cases for executive protection
            reporting.
          </div>
        </section>


        {/* ================================================
            SYSTEM STATE
            ================================================ */}

        <section
          className="panel"
          style={{
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                PLATFORM CONNECTIONS
              </div>

              <h2>
                Source & Processing State
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
                  <th>DEMO STATE</th>
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
                                display: "flex",
                                alignItems: "center",
                                gap: "9px",
                              }}
                            >
                              <div className="agentIcon">
                                <Icon size={16} />
                              </div>

                              <strong
                                style={{
                                  color: "#ccd8e7",
                                  fontSize: "11px",
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
                                    : system.access
                                      ===
                                      "CONTROLLED TARGET"
                                      ? "#ffbd67"
                                      : "#73a7ff",

                                fontSize: "10px",
                                fontWeight: 800,
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
            DEMO SNAPSHOT + MASTER GOVERNANCE
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop: "16px",
          }}
        >

          {/* VALIDATED SNAPSHOT */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  VALIDATED DEMO SNAPSHOT
                </div>

                <h2>
                  Reconciliation Dataset
                </h2>
              </div>

              <RefreshCcw size={22} />
            </div>


            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>SNAPSHOT</th>
                    <th>SCOPE</th>
                    <th>BIOMETRIC</th>
                    <th>MASTER</th>
                    <th>FINDINGS</th>
                    <th>CASES</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    demoSnapshots.map(
                      (run) => (
                        <tr key={run.name}>
                          <td>
                            <strong
                              style={{
                                color: "#d0dbea",
                                fontSize: "11px",
                              }}
                            >
                              {run.name}
                            </strong>
                          </td>

                          <td>
                            {run.scope}
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


            <div
              style={{
                padding: "14px 18px",
                borderTop:
                  "1px solid rgba(255,255,255,0.05)",
                color: "#687b93",
                fontSize: "10px",
                lineHeight: 1.55,
              }}
            >
              The interface intentionally avoids
              fabricated monitoring IDs and
              timestamps. This table represents
              the validated synthetic
              reconciliation dataset used by the
              current demo.
            </div>
          </div>


          {/* MASTER GOVERNANCE */}

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
                padding: "17px",
              }}
            >
              <div className="integrityInfo">
                <LockKeyhole size={21} />

                <div>
                  <strong>
                    Master Writes Blocked
                  </strong>

                  <span>
                    Automated AI correction
                    workflows do not modify the
                    Master Reference System.
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
                    Master identities are read as
                    authoritative candidates during
                    reconciliation.
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.12)",
                  background:
                    "rgba(255,185,90,0.055)",
                }}
              >
                <AlertTriangle
                  size={21}
                  color="#ffbd67"
                />

                <div>
                  <strong
                    style={{
                      color: "#e0ad5f",
                    }}
                  >
                    Master Data Review Required
                  </strong>

                  <span>
                    If evidence suggests the
                    authoritative Master record
                    itself may be incorrect, the
                    issue is escalated for
                    dedicated human review rather
                    than automatically corrected.
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
            marginTop: "16px",
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
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      minWidth: "110px",
                      padding: "11px",
                      borderRadius: "10px",
                      textAlign: "center",

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

                      fontSize: "10px",
                      fontWeight: 750,
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
                        color="#52647b"
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
            margin: "16px 0 0",
            padding: "18px",
          }}
        >
          <CheckCircle2 size={25} />

          <div>
            <strong>
              Continuous Identity Integrity Model
            </strong>

            <span>
              The platform compares operational
              biometric relationships against the
              authoritative Master Reference,
              detects integrity exceptions,
              prioritizes potential human harm and
              supports controlled remediation with
              required human approval and
              post-correction verification.
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

            Synthetic Reconciliation Demo
          </div>
        </footer>

      </main>
    </div>
  );
}