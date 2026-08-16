import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileSearch,
  Fingerprint,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   CASE WORKSPACE

   Synthetic Demo Only

   Backend-confirmed detail pages currently available:
   - CASE-2026-00001
   - CASE-2026-00014

   Other rows are representative workspace records and are
   intentionally not deep-linked until their case detail
   payloads are implemented.
   ========================================================= */


const cases = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    type:
      VERIFIED_DEMO_CASE.caseType,

    title:
      VERIFIED_DEMO_CASE.title,

    biometric:
      VERIFIED_DEMO_CASE.biometricId,

    current:
      VERIFIED_DEMO_CASE.currentIdentity,

    proposed:
      VERIFIED_DEMO_CASE.canonicalIdentity,

    confidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    risk:
      VERIFIED_DEMO_CASE.risk,

    harm:
      VERIFIED_DEMO_CASE.harm,

    protective:
      VERIFIED_DEMO_CASE.protectivePriority,

    priority:
      VERIFIED_DEMO_CASE.priority,

    status:
      VERIFIED_DEMO_CASE.finalStatus,

    affected:
      VERIFIED_DEMO_CASE.wronglyAffected,

    findings:
      2,

    hasDetail:
      true,
  },


  {
    id: "CASE-2026-00002",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000341",
    current: "REF-000882",
    proposed: "REF-001704",
    confidence: 99.98,
    risk: 93.8,
    harm: 96.5,
    protective: 97.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00003",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000492",
    current: "REF-001547",
    proposed: "REF-000621",
    confidence: 99.98,
    risk: 96.2,
    harm: 96.0,
    protective: 97.0,
    priority: "IMMEDIATE",
    status: "AI_INVESTIGATED",
    affected: true,
    findings: 5,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00004",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000714",
    current: "REF-002905",
    proposed: "REF-001337",
    confidence: 99.97,
    risk: 92.5,
    harm: 95.0,
    protective: 96.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00005",
    type: "CRITICAL_HARM_IDENTITY_CONFLICT",
    title: "Critical Cross-Identity Harm Conflict",
    biometric: "BIO-000621",
    current: "REF-001912",
    proposed: "REF-002448",
    confidence: 99.96,
    risk: 95.0,
    harm: 94.5,
    protective: 96.0,
    priority: "IMMEDIATE",
    status: "AWAITING_MANAGER_APPROVAL",
    affected: true,
    findings: 4,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00006",
    type: "HARM_IMPACT",
    title: "Potential Wrong-Person Harm",
    biometric: "BIO-000804",
    current: "REF-002130",
    proposed: "REF-000744",
    confidence: 99.96,
    risk: 91.5,
    harm: 94.0,
    protective: 95.5,
    priority: "IMMEDIATE",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: true,
    findings: 2,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00007",
    type: "WRONG_MAPPING",
    title: "Incorrect Biometric Identity Mapping",
    biometric: "BIO-000207",
    current: "REF-001782",
    proposed: "REF-000431",
    confidence: 99.95,
    risk: 89.5,
    harm: 70.0,
    protective: 88.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 2,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00008",
    type: "COMPLEX_IDENTITY_CONFLICT",
    title: "Complex Identity Conflict",
    biometric: "BIO-000422",
    current: "REF-002117",
    proposed: "REF-000905",
    confidence: 99.94,
    risk: 91.0,
    harm: 72.0,
    protective: 87.0,
    priority: "HIGH",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 5,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00009",
    type: "DUPLICATE_IDENTITY",
    title: "Duplicate Identity Registration",
    biometric: "BIO-000612",
    current: "REF-000374",
    proposed: "REF-000374",
    confidence: 99.92,
    risk: 83.0,
    harm: 55.0,
    protective: 82.0,
    priority: "HIGH",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 3,
    hasDetail: false,
  },


  {
    id:
      COMPLEX_DEMO_CASE.id,

    type:
      COMPLEX_DEMO_CASE.caseType,

    title:
      COMPLEX_DEMO_CASE.title,

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    current:
      COMPLEX_DEMO_CASE.currentMasterIdentities[0],

    proposed:
      COMPLEX_DEMO_CASE.canonicalIdentity,

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    risk:
      COMPLEX_DEMO_CASE.risk,

    harm:
      COMPLEX_DEMO_CASE.harm,

    protective:
      COMPLEX_DEMO_CASE.protectivePriority,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      "AI_INVESTIGATED",

    affected:
      COMPLEX_DEMO_CASE.wronglyAffected,

    findings:
      COMPLEX_DEMO_CASE.findingCount,

    hasDetail:
      true,
  },


  {
    id: "CASE-2026-00011",
    type: "DATA_MISMATCH",
    title: "Identity Data Mismatch",
    biometric: "BIO-000318",
    current: "REF-002204",
    proposed: "REF-002204",
    confidence: 99.91,
    risk: 61.0,
    harm: 35.0,
    protective: 58.0,
    priority: "MEDIUM",
    status: "READY_FOR_OFFICER_REVIEW",
    affected: false,
    findings: 1,
    hasDetail: false,
  },


  {
    id: "CASE-2026-00012",
    type: "ORPHAN_RECORD",
    title: "Orphan Biometric Record",
    biometric: "BIO-000909",
    current: "REF-INVALID",
    proposed: "REF-001567",
    confidence: 99.9,
    risk: 76.0,
    harm: 45.0,
    protective: 70.0,
    priority: "MEDIUM",
    status: "AI_INVESTIGATED",
    affected: false,
    findings: 1,
    hasDetail: false,
  },
];


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


function StatusBadge({
  status,
}) {
  const labels = {
    READY_FOR_OFFICER_REVIEW:
      "Officer Review",

    AWAITING_MANAGER_APPROVAL:
      "Manager Approval",

    AI_INVESTIGATED:
      "AI Investigated",

    VERIFIED_CLOSED:
      "Verified Closed",
  };


  const styles = {
    READY_FOR_OFFICER_REVIEW: {
      color: "#79a9ff",
      dot: "#5c99ff",
    },

    AWAITING_MANAGER_APPROVAL: {
      color: "#ffbb5d",
      dot: "#ffbb5d",
    },

    AI_INVESTIGATED: {
      color: "#79a9ff",
      dot: "#5c99ff",
    },

    VERIFIED_CLOSED: {
      color: "#59cfa0",
      dot: "#34d399",
    },
  };


  const style =
    styles[status]
    ||
    styles.AI_INVESTIGATED;


  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          "6px",

        color:
          style.color,

        fontSize:
          "10px",

        lineHeight:
          1.4,

        fontWeight:
          700,

        marginTop:
          "5px",

        whiteSpace:
          "nowrap",
      }}
    >
      <span
        style={{
          width:
            "6px",

          height:
            "6px",

          borderRadius:
            "50%",

          background:
            style.dot,
        }}
      />

      {
        labels[status]
        ||
        status
      }
    </span>
  );
}


function MiniMetric({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon size={19} />
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

export default function CasesPage() {
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
              <FileSearch size={15} />

              IDENTITY INTEGRITY OPERATIONS
            </div>

            <h1>
              Cases
            </h1>

            <p>
              AI-detected identity integrity
              issues prioritized by risk,
              potential harm and protective
              urgency.
            </p>
          </div>


          <div className="topbarActions">
            <button className="searchButton">
              <Search size={18} />

              <span>
                Search Case ID / Identity
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
                  Identity Operations
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* ================================================
            PROTECTIVE WARNING
            ================================================ */}

        <section className="alertBanner">
          <div className="alertIcon">
            <ShieldAlert size={24} />
          </div>

          <div className="alertText">
            <strong>
              Wrong-Person Protection Model
            </strong>

            <span>
              The synthetic demo dataset contains
              9 protective cases where identity
              conflicts may create potential
              wrong-person impact. These cases
              receive elevated protective
              priority.
            </span>
          </div>

          <div
            className="priority immediate"
            style={{
              height:
                "31px",

              padding:
                "0 12px",
            }}
          >
            9 PROTECTIVE
          </div>
        </section>


        {/* ================================================
            CASE KPIs
            ================================================ */}

        <section className="statsGrid">
          <MiniMetric
            icon={FileSearch}
            label="Total Cases"
            value={
              PLATFORM_METRICS
                .aggregatedCases
            }
            description="Aggregated identity integrity cases"
          />

          <MiniMetric
            icon={CircleAlert}
            label="Immediate"
            value={
              PLATFORM_METRICS
                .priority
                .immediate
            }
            description="Protective intervention priority"
          />

          <MiniMetric
            icon={AlertTriangle}
            label="High Priority"
            value={
              PLATFORM_METRICS
                .priority
                .high
            }
            description="Accelerated human review"
          />

          <MiniMetric
            icon={ShieldCheck}
            label="Identity Resolved"
            value={
              PLATFORM_METRICS
                .aggregatedCases
            }
            description="Cases with canonical identity candidates"
          />
        </section>


        {/* ================================================
            FILTERS
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "14px 16px",
          }}
        >
          <div
            style={{
              display:
                "flex",

              gap:
                "8px",

              flexWrap:
                "wrap",

              alignItems:
                "center",
            }}
          >
            <button
              className="primaryButton"
              style={{
                width:
                  "auto",

                marginTop:
                  0,

                padding:
                  "0 17px",
              }}
            >
              All Cases

              <span
                style={{
                  opacity:
                    0.7,
                }}
              >
                {
                  PLATFORM_METRICS
                    .aggregatedCases
                }
              </span>
            </button>


            <button className="searchButton">
              Immediate

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .immediate
                }
              </span>
            </button>


            <button className="searchButton">
              High

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .high
                }
              </span>
            </button>


            <button className="searchButton">
              Medium

              <span>
                {
                  PLATFORM_METRICS
                    .priority
                    .medium
                }
              </span>
            </button>


            <button className="searchButton">
              Wrong-Person Impact

              <span>
                {
                  PLATFORM_METRICS
                    .wronglyAffectedCases
                }
              </span>
            </button>


            <button className="searchButton">
              Waiting Officer
            </button>


            <button className="searchButton">
              Waiting Manager
            </button>
          </div>
        </section>


        {/* ================================================
            CASE TABLE
            ================================================ */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AI PRIORITY WORKSPACE
              </div>

              <h2>
                Identity Reconciliation Cases
              </h2>
            </div>

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "8px",

                color:
                  "#71839b",

                fontSize:
                  "10px",
              }}
            >
              <Activity size={15} />

              Synthetic monitoring view
            </div>
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1180px",
              }}
            >
              <thead>
                <tr>
                  <th>CASE</th>
                  <th>ERROR TYPE</th>
                  <th>BIOMETRIC</th>
                  <th>IDENTITY RESOLUTION</th>
                  <th>AI CONFIDENCE</th>
                  <th>RISK</th>
                  <th>HARM</th>
                  <th>PROTECTIVE</th>
                  <th>PRIORITY</th>
                  <th></th>
                </tr>
              </thead>


              <tbody>
                {
                  cases.map(
                    (item) => (
                      <tr key={item.id}>

                        {/* CASE */}

                        <td>
                          {
                            item.hasDetail
                              ? (
                                <Link
                                  href={
                                    `/cases/${item.id}`
                                  }
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
                              )
                              : (
                                <span
                                  className="caseId"
                                  style={{
                                    display:
                                      "inline-block",
                                  }}
                                >
                                  {item.id}
                                </span>
                              )
                          }

                          <StatusBadge
                            status={
                              item.status
                            }
                          />
                        </td>


                        {/* ERROR TYPE */}

                        <td>
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
                            {
                              item.affected
                                ? (
                                  <ShieldAlert
                                    size={15}
                                    color="#ff6f7e"
                                  />
                                )
                                : (
                                  <Fingerprint
                                    size={15}
                                    color="#609aff"
                                  />
                                )
                            }

                            <div>
                              <div
                                style={{
                                  color:
                                    "#d2deec",

                                  fontWeight:
                                    650,

                                  fontSize:
                                    "11px",

                                  lineHeight:
                                    1.45,
                                }}
                              >
                                {item.title}
                              </div>

                              <div
                                style={{
                                  color:
                                    "#71839a",

                                  fontSize:
                                    "10px",

                                  lineHeight:
                                    1.4,

                                  marginTop:
                                    "4px",
                                }}
                              >
                                {item.type}

                                {" · "}

                                {item.findings}

                                {" findings"}
                              </div>
                            </div>
                          </div>
                        </td>


                        {/* BIOMETRIC */}

                        <td className="mono">
                          {item.biometric}
                        </td>


                        {/* IDENTITY RESOLUTION */}

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


                        {/* AI CONFIDENCE */}

                        <td>
                          <span className="confidence">
                            {item.confidence}%
                          </span>
                        </td>


                        {/* RISK */}

                        <td>
                          <span
                            style={{
                              color:
                                item.risk >= 90
                                  ? "#ff7d8b"
                                  : item.risk >= 80
                                    ? "#ffbd67"
                                    : "#aab9ca",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.risk}
                          </span>
                        </td>


                        {/* HARM */}

                        <td>
                          <span
                            style={{
                              color:
                                item.harm >= 90
                                  ? "#ff7d8b"
                                  : "#aab9ca",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.harm}
                          </span>
                        </td>


                        {/* PROTECTIVE */}

                        <td>
                          <span
                            style={{
                              color:
                                item.protective >= 95
                                  ? "#ff7d8b"
                                  : "#82aeff",

                              fontWeight:
                                750,
                            }}
                          >
                            {item.protective}
                          </span>
                        </td>


                        {/* PRIORITY */}

                        <td>
                          <PriorityBadge
                            priority={
                              item.priority
                            }
                          />
                        </td>


                        {/* OPEN CASE */}

                        <td>
                          {
                            item.hasDetail
                              ? (
                                <Link
                                  href={
                                    `/cases/${item.id}`
                                  }
                                  aria-label={
                                    `Open ${item.id}`
                                  }
                                  style={{
                                    width:
                                      "31px",

                                    height:
                                      "31px",

                                    borderRadius:
                                      "9px",

                                    display:
                                      "grid",

                                    placeItems:
                                      "center",

                                    border:
                                      "1px solid rgba(255,255,255,0.07)",

                                    background:
                                      "rgba(255,255,255,0.025)",

                                    color:
                                      "#79a5e6",

                                    textDecoration:
                                      "none",
                                  }}
                                >
                                  <ChevronRight size={16} />
                                </Link>
                              )
                              : (
                                <span
                                  title="Detailed case view not included in the current frontend demo"
                                  style={{
                                    width:
                                      "31px",

                                    height:
                                      "31px",

                                    borderRadius:
                                      "9px",

                                    display:
                                      "grid",

                                    placeItems:
                                      "center",

                                    border:
                                      "1px solid rgba(255,255,255,0.045)",

                                    background:
                                      "rgba(255,255,255,0.015)",

                                    color:
                                      "#52647b",

                                    cursor:
                                      "default",
                                  }}
                                >
                                  <ChevronRight size={16} />
                                </span>
                              )
                          }
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
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              gap:
                "16px",

              color:
                "#687b93",

              fontSize:
                "10px",

              lineHeight:
                1.5,
            }}
          >
            <span>
              Showing 12 representative cases
              from 53 aggregated cases
            </span>

            <span>
              Sorted by Protective Priority
              → Harm → Risk → AI Confidence
            </span>
          </div>
        </section>


        {/* ================================================
            SUMMARY
            ================================================ */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",
          }}
        >

          {/* ==============================================
              EXECUTIVE CASE GROUPING
              ============================================== */}

          <div
            className="panel"
            style={{
              paddingBottom:
                "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  EXECUTIVE CASE GROUPING
                </div>

                <h2>
                  Identity Integrity Categories
                </h2>
              </div>

              <Fingerprint size={22} />
            </div>


            {[
              [
                "Data Mismatch",
                15,
              ],
              [
                "Wrong Mapping",
                11,
              ],
              [
                "Protective / Harm Cases",
                9,
              ],
              [
                "Complex Identity Conflict",
                8,
              ],
              [
                "Duplicate Identity",
                6,
              ],
              [
                "Orphan Record",
                4,
              ],
            ].map(
              ([
                label,
                value,
              ]) => (
                <div
                  key={label}
                  className="detailRow"
                  style={{
                    margin:
                      "0 19px",
                  }}
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
              style={{
                margin:
                  "14px 19px 0",

                color:
                  "#71839a",

                fontSize:
                  "10px",

                lineHeight:
                  1.6,
              }}
            >
              Protective / Harm Cases is an
              executive grouping combining
              harm-impact and critical
              wrong-person identity conflicts.
            </div>
          </div>


          {/* ==============================================
              PROTECTIVE AI CONTROLS
              ============================================== */}

          <div
            className="panel"
            style={{
              paddingBottom:
                "18px",
            }}
          >
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE SAFETY MODEL
                </div>

                <h2>
                  Protective AI Controls
                </h2>
              </div>

              <ShieldCheck size={22} />
            </div>


            <div
              className="integrityInfo"
              style={{
                marginTop:
                  "16px",
              }}
            >
              <ShieldCheck size={21} />

              <div>
                <strong>
                  Master Reference Read Only
                </strong>

                <span>
                  AI cannot automatically modify
                  the authoritative identity
                  source.
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <UserCheck size={21} />

              <div>
                <strong>
                  Two-Level Human Approval
                </strong>

                <span>
                  Monitoring Officer and Manager
                  approval are required before
                  sensitive correction execution.
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <BadgeCheck size={21} />

              <div>
                <strong>
                  Post-Correction Verification
                </strong>

                <span>
                  Every executed correction must
                  pass verification before the
                  case can be closed.
                </span>
              </div>
            </div>


            <div className="integrityInfo">
              <CheckCircle2 size={21} />

              <div>
                <strong>
                  Verified Closure Required
                </strong>

                <span>
                  Successful execution alone does
                  not close a case. Verification
                  must confirm the corrected
                  identity relationship.
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Synthetic Demonstration
          </span>

          <div>
            <Activity size={15} />

            Continuous Monitoring Active
          </div>
        </footer>

      </main>
    </div>
  );
}