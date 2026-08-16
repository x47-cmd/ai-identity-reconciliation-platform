import Link from "next/link";

import Sidebar from "../../components/Sidebar";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Database,
  FileCheck2,
  FileSearch,
  Fingerprint,
  GitCompareArrows,
  LockKeyhole,
  ScanFace,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";


/* =========================================================
   SYNTHETIC DEMO CASES

   Frontend demo data only.
   Later this page will consume backend/API case data.
   ========================================================= */

const caseDatabase = {
  "CASE-2026-00001": {
    id: "CASE-2026-00001",

    title:
      "Potential Wrong-Person Harm",

    caseType:
      "HARM_IMPACT",

    priority:
      "IMMEDIATE",

    status:
      "READY_FOR_OFFICER_REVIEW",

    biometricId:
      "BIO-000166",

    currentIdentity:
      "REF-002711",

    proposedIdentity:
      "REF-001009",

    confidence:
      99.99,

    risk:
      94.99,

    harm:
      97.5,

    protectivePriority:
      98.0,

    wronglyAffected:
      true,

    findings:
      2,

    investigationId:
      "INV-2026-00001",

    detectedAt:
      "16 Aug 2026 · 11:56",

    sourceSystem:
      "Biometric System",

    referenceSystem:
      "Master Reference System",

    aiConclusion:
      (
        "The aggregated biometric and identity evidence strongly "
        + "indicates that BIO-000166 is associated with REF-001009 "
        + "rather than its current identity REF-002711. The current "
        + "mapping may cause adverse information belonging to another "
        + "identity to affect an unrelated person. Immediate human "
        + "review is recommended."
      ),

    rootCause:
      (
        "A post-registration biometric-to-identity mapping conflict "
        + "appears to have associated the biometric record with the "
        + "wrong Master Reference identity."
      ),

    evidence: {
      face:
        99.98,

      fingerprint:
        99.99,

      iris:
        99.97,

      combined:
        99.99,
    },

    dataComparison: [
      {
        field:
          "Master Identity",

        current:
          "REF-002711",

        reference:
          "REF-001009",

        result:
          "CONFLICT",
      },

      {
        field:
          "Biometric Ownership",

        current:
          "REF-002711",

        reference:
          "REF-001009",

        result:
          "CONFLICT",
      },

      {
        field:
          "Identity Attributes",

        current:
          "Low consistency",

        reference:
          "High consistency",

        result:
          "MISMATCH",
      },

      {
        field:
          "Biometric Evidence",

        current:
          "Low support",

        reference:
          "99.99% support",

        result:
          "MATCH",
      },
    ],

    findingsList: [
      {
        id:
          "FND-000041",

        type:
          "WRONG_MAPPING",

        role:
          "PRIMARY",

        confidence:
          99.99,
      },

      {
        id:
          "FND-000042",

        type:
          "HARM_IMPACT",

        role:
          "CORROBORATING",

        confidence:
          99.97,
      },
    ],

    correction: {
      action:
        "REASSIGN_BIOMETRIC_IDENTITY",

      targetSystem:
        "BIOMETRIC_SYSTEM",

      targetRecord:
        "BIO-000166",

      field:
        "linked_master_id",

      before:
        "REF-002711",

      after:
        "REF-001009",

      execution:
        "NOT_AUTHORIZED",
    },

    officer: {
      status:
        "PENDING",

      name:
        "Not assigned",

      decision:
        "PENDING",

      comments:
        "Awaiting Monitoring Officer review.",
    },

    manager: {
      status:
        "NOT_READY",

      name:
        "Not assigned",

      decision:
        "NOT_READY",

      comments:
        "Manager review becomes available after Officer approval.",
    },

    audit: [
      {
        time:
          "11:56:01",

        actor:
          "Monitoring Agent",

        action:
          "Change detected",

        detail:
          "Biometric identity relationship selected for reconciliation.",
      },

      {
        time:
          "11:56:02",

        actor:
          "Reconciliation Agent",

        action:
          "Identity conflict detected",

        detail:
          "Current biometric mapping conflicts with Master Reference evidence.",
      },

      {
        time:
          "11:56:02",

        actor:
          "Identity Resolution Agent",

        action:
          "Canonical identity resolved",

        detail:
          "REF-001009 selected as strongest identity candidate at 99.99% confidence.",
      },

      {
        time:
          "11:56:03",

        actor:
          "Investigation Agent",

        action:
          "Harm impact identified",

        detail:
          "Potential wrong-person adverse impact detected and protective priority raised to 98.",
      },

      {
        time:
          "11:56:03",

        actor:
          "Approval Workflow Agent",

        action:
          "Officer review requested",

        detail:
          "Correction package prepared. Automatic execution remains blocked.",
      },
    ],
  },


  /* -------------------------------------------------------
     Second case used to demonstrate complex conflict
     ------------------------------------------------------- */

  "CASE-2026-00010": {
    id:
      "CASE-2026-00010",

    title:
      "Complex Identity Conflict",

    caseType:
      "COMPLEX_IDENTITY_CONFLICT",

    priority:
      "HIGH",

    status:
      "AI_INVESTIGATED",

    biometricId:
      "BIO-000795",

    currentIdentity:
      "REF-001183",

    proposedIdentity:
      "REF-002343",

    confidence:
      99.99,

    risk:
      90.0,

    harm:
      60.0,

    protectivePriority:
      85.0,

    wronglyAffected:
      false,

    findings:
      5,

    investigationId:
      "INV-2026-00010",

    detectedAt:
      "16 Aug 2026 · 11:56",

    sourceSystem:
      "Biometric System",

    referenceSystem:
      "Master Reference System",

    aiConclusion:
      (
        "Multiple related biometric findings were aggregated into "
        + "one investigation case. The strongest canonical identity "
        + "candidate is REF-002343 with 99.99% confidence."
      ),

    rootCause:
      (
        "Multiple biometric and identity relationships conflict "
        + "across linked registration records."
      ),

    evidence: {
      face:
        99.98,

      fingerprint:
        99.99,

      iris:
        99.96,

      combined:
        99.99,
    },

    dataComparison: [
      {
        field:
          "Current Master Link",

        current:
          "REF-001183",

        reference:
          "REF-002343",

        result:
          "CONFLICT",
      },

      {
        field:
          "Related Biometric",

        current:
          "BIO-000277",

        reference:
          "BIO-000795",

        result:
          "RELATED",
      },

      {
        field:
          "Canonical Resolution",

        current:
          "Unresolved at finding level",

        reference:
          "REF-002343",

        result:
          "MATCH",
      },
    ],

    findingsList: [
      {
        id:
          "FND-000081",

        type:
          "WRONG_MAPPING",

        role:
          "PRIMARY",

        confidence:
          99.99,
      },

      {
        id:
          "FND-000082",

        type:
          "DUPLICATE_BIOMETRIC",

        role:
          "CORROBORATING",

        confidence:
          100,
      },

      {
        id:
          "FND-000083",

        type:
          "DATA_MISMATCH",

        role:
          "CORROBORATING",

        confidence:
          99.95,
      },

      {
        id:
          "FND-000084",

        type:
          "DUPLICATE_IDENTITY",

        role:
          "CORROBORATING",

        confidence:
          99.92,
      },

      {
        id:
          "FND-000085",

        type:
          "IDENTITY_CORRELATION",

        role:
          "CORROBORATING",

        confidence:
          99.91,
      },
    ],

    correction: {
      action:
        "REASSIGN_BIOMETRIC_IDENTITY",

      targetSystem:
        "BIOMETRIC_SYSTEM",

      targetRecord:
        "BIO-000795",

      field:
        "linked_master_id",

      before:
        "REF-001183",

      after:
        "REF-002343",

      execution:
        "NOT_AUTHORIZED",
    },

    officer: {
      status:
        "PENDING",

      name:
        "Not assigned",

      decision:
        "PENDING",

      comments:
        "Awaiting Monitoring Officer review.",
    },

    manager: {
      status:
        "NOT_READY",

      name:
        "Not assigned",

      decision:
        "NOT_READY",

      comments:
        "Manager review becomes available after Officer approval.",
    },

    audit: [
      {
        time:
          "11:56:01",

        actor:
          "Reconciliation Agent",

        action:
          "Multiple findings detected",

        detail:
          "Five related findings were detected across linked biometric records.",
      },

      {
        time:
          "11:56:02",

        actor:
          "Case Aggregation Engine",

        action:
          "Findings aggregated",

        detail:
          "Related findings were collapsed into one complex identity case.",
      },

      {
        time:
          "11:56:03",

        actor:
          "Identity Resolution Agent",

        action:
          "Canonical identity resolved",

        detail:
          "REF-002343 selected with 99.99% confidence.",
      },
    ],
  },
};


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


function ScoreBar({
  label,
  score,
  icon: Icon,
}) {
  return (
    <div
      style={{
        padding:
          "13px 0",
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

            color:
              "#8598b0",

            fontSize:
              "10px",
          }}
        >
          <Icon
            size={16}
            color="#659eff"
          />

          {label}
        </div>

        <strong
          style={{
            fontSize:
              "11px",

            color:
              "#d7e3f1",
          }}
        >
          {score}%
        </strong>
      </div>

      <div className="progress">
        <div
          className="progressFill"
          style={{
            width:
              `${Math.min(score, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}


function RiskMetric({
  label,
  value,
  type,
}) {
  const color =
    type === "danger"
      ? "#ff7786"
      : type === "warning"
        ? "#ffbd67"
        : "#659eff";

  return (
    <div
      style={{
        flex:
          1,

        minWidth:
          "150px",

        padding:
          "17px",

        borderRadius:
          "13px",

        background:
          "rgba(255,255,255,0.025)",

        border:
          "1px solid rgba(255,255,255,0.055)",
      }}
    >
      <div
        style={{
          color:
            "#61748e",

          fontSize:
            "9px",

          marginBottom:
            "9px",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          color,
          fontSize:
            "24px",
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color:
            "#50627b",

          fontSize:
            "9px",
        }}
      >
        {" / 100"}
      </span>
    </div>
  );
}


/* =========================================================
   NOT FOUND
   ========================================================= */

function CaseNotFound({
  caseId,
}) {
  return (
    <div className="appShell">

      <Sidebar />

      <main className="mainContent">

        <Link
          href="/cases"
          className="textButton"
          style={{
            width:
              "fit-content",

            textDecoration:
              "none",
          }}
        >
          <ArrowLeft size={16} />

          Back to Cases
        </Link>

        <div
          className="panel"
          style={{
            padding:
              "50px",

            marginTop:
              "20px",

            textAlign:
              "center",
          }}
        >
          <CircleAlert
            size={40}
            color="#ff7786"
          />

          <h1>
            Case not found
          </h1>

          <p
            style={{
              color:
                "#6f819a",
            }}
          >
            {caseId}
          </p>
        </div>

      </main>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default async function CaseInvestigationPage({
  params,
}) {
  const {
    caseId,
  } = await params;

  const caseData =
    caseDatabase[
      caseId
    ];


  if (!caseData) {
    return (
      <CaseNotFound
        caseId={caseId}
      />
    );
  }


  return (
    <div className="appShell">

      {/* ================================================
          SHARED PLATFORM SIDEBAR
          ================================================ */}

      <Sidebar />


      <main className="mainContent">

        {/* ===============================================
            BACK / HEADER
            =============================================== */}

        <div
          style={{
            marginBottom:
              "19px",
          }}
        >
          <Link
            href="/cases"
            className="textButton"
            style={{
              width:
                "fit-content",

              padding:
                0,

              textDecoration:
                "none",

              marginBottom:
                "15px",
            }}
          >
            <ArrowLeft size={16} />

            Back to Cases
          </Link>


          <header
            className="topbar"
            style={{
              marginBottom:
                0,
            }}
          >
            <div>
              <div className="eyebrow">
                <BrainCircuit size={15} />

                AI INVESTIGATION WORKSPACE
              </div>


              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "12px",

                  flexWrap:
                    "wrap",

                  marginTop:
                    "7px",
                }}
              >
                <h1
                  style={{
                    margin:
                      0,
                  }}
                >
                  {caseData.id}
                </h1>

                <PriorityBadge
                  priority={
                    caseData.priority
                  }
                />
              </div>


              <p
                style={{
                  marginTop:
                    "7px",
                }}
              >
                {caseData.title}

                {" · "}

                {caseData.caseType}
              </p>
            </div>


            <div className="topbarActions">
              <button className="searchButton">
                <Search size={18} />

                <span>
                  Search Evidence
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
                    Case Review
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>


        {/* ===============================================
            WRONG PERSON WARNING
            =============================================== */}

        {caseData.wronglyAffected && (
          <section className="alertBanner">
            <div className="alertIcon">
              <ShieldAlert size={24} />
            </div>

            <div className="alertText">
              <strong>
                Critical Protective Case —
                Potential Wrong-Person Impact
              </strong>

              <span>
                The AI investigation indicates
                that an unrelated person may be
                negatively affected by the current
                identity mapping. Protective
                review has been automatically
                prioritized.
              </span>
            </div>

            <div
              className="priority immediate"
              style={{
                height:
                  "32px",

                padding:
                  "0 13px",
              }}
            >
              PRIORITY {caseData.protectivePriority}
            </div>
          </section>
        )}


        {/* ===============================================
            CASE HEADER CARDS
            =============================================== */}

        <section className="statsGrid">

          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <Fingerprint size={20} />
              </div>
            </div>

            <div
              className="metricValue"
              style={{
                fontSize:
                  "18px",
              }}
            >
              {caseData.biometricId}
            </div>

            <div className="metricTitle">
              Primary Biometric
            </div>

            <div className="metricSubtitle">
              Source record under investigation
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <BrainCircuit size={20} />
              </div>
            </div>

            <div className="metricValue">
              {caseData.confidence}%
            </div>

            <div className="metricTitle">
              AI Confidence
            </div>

            <div className="metricSubtitle">
              Canonical identity resolution
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <ShieldAlert size={20} />
              </div>
            </div>

            <div
              className="metricValue"
              style={{
                color:
                  caseData.harm >= 90
                    ? "#ff7887"
                    : undefined,
              }}
            >
              {caseData.harm}
            </div>

            <div className="metricTitle">
              Harm Impact
            </div>

            <div className="metricSubtitle">
              Potential consequence score
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <FileSearch size={20} />
              </div>
            </div>

            <div className="metricValue">
              {caseData.findings}
            </div>

            <div className="metricTitle">
              AI Findings
            </div>

            <div className="metricSubtitle">
              Aggregated supporting evidence
            </div>
          </div>

        </section>


        {/* ===============================================
            LIFECYCLE
            =============================================== */}

        <section
          className="panel"
          style={{
            marginBottom:
              "14px",

            padding:
              "18px 20px",
          }}
        >
          <div className="panelEyebrow">
            CASE LIFECYCLE
          </div>


          <div
            style={{
              marginTop:
                "17px",

              display:
                "flex",

              alignItems:
                "center",

              gap:
                "8px",

              overflowX:
                "auto",

              paddingBottom:
                "4px",
            }}
          >
            {[
              [
                "Detected",
                true,
              ],
              [
                "Reconciled",
                true,
              ],
              [
                "AI Investigated",
                true,
              ],
              [
                "Officer Review",
                false,
              ],
              [
                "Manager Approval",
                false,
              ],
              [
                "Execution",
                false,
              ],
              [
                "Verification",
                false,
              ],
              [
                "Closed",
                false,
              ],
            ].map(
              (
                [
                  label,
                  complete,
                ],
                index
              ) => (
                <div
                  key={label}
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "8px",

                    flexShrink:
                      0,
                  }}
                >
                  <div
                    style={{
                      minWidth:
                        "108px",

                      padding:
                        "10px 12px",

                      borderRadius:
                        "10px",

                      border:
                        complete
                          ? "1px solid rgba(52,211,153,0.17)"
                          : "1px solid rgba(255,255,255,0.06)",

                      background:
                        complete
                          ? "rgba(52,211,153,0.06)"
                          : "rgba(255,255,255,0.025)",

                      color:
                        complete
                          ? "#5fd0a5"
                          : "#65778f",

                      fontSize:
                        "9px",

                      fontWeight:
                        700,

                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "6px",
                    }}
                  >
                    {complete ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock3 size={14} />
                    )}

                    {label}
                  </div>

                  {index < 7 && (
                    <ChevronRight
                      size={14}
                      color="#43546a"
                    />
                  )}
                </div>
              )
            )}
          </div>
        </section>


        {/* ===============================================
            AI INVESTIGATION + CASE INFORMATION
            =============================================== */}

        <section className="dashboardGrid">

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  AI INVESTIGATION
                </div>

                <h2>
                  Investigation Conclusion
                </h2>
              </div>

              <BrainCircuit size={23} />
            </div>


            <div
              style={{
                padding:
                  "21px",
              }}
            >
              <div
                style={{
                  padding:
                    "17px",

                  borderRadius:
                    "13px",

                  background:
                    "rgba(54,125,255,0.055)",

                  border:
                    "1px solid rgba(72,139,255,0.1)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    gap:
                      "10px",
                  }}
                >
                  <Sparkles
                    size={20}
                    color="#69a1ff"
                    style={{
                      flexShrink:
                        0,
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display:
                          "block",

                        fontSize:
                          "11px",

                        color:
                          "#d7e6f9",
                      }}
                    >
                      AI Conclusion
                    </strong>

                    <p
                      style={{
                        color:
                          "#8194ad",

                        fontSize:
                          "10px",

                        lineHeight:
                          1.8,

                        margin:
                          "8px 0 0",
                      }}
                    >
                      {caseData.aiConclusion}
                    </p>
                  </div>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "17px",
                }}
              >
                <div className="panelEyebrow">
                  PROBABLE ROOT CAUSE
                </div>

                <p
                  style={{
                    color:
                      "#91a1b6",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.8,

                    margin:
                      "10px 0 0",
                  }}
                >
                  {caseData.rootCause}
                </p>
              </div>


              <div
                style={{
                  marginTop:
                    "20px",

                  display:
                    "flex",

                  gap:
                    "8px",

                  flexWrap:
                    "wrap",
                }}
              >
                <span className="confidence">
                  AI Confidence:
                  {" "}
                  {caseData.confidence}%
                </span>

                <span
                  style={{
                    color:
                      "#52677f",

                    fontSize:
                      "9px",
                  }}
                >
                  Investigation:
                  {" "}
                  {caseData.investigationId}
                </span>
              </div>
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  CASE INFORMATION
                </div>

                <h2>
                  Investigation Metadata
                </h2>
              </div>

              <FileSearch size={22} />
            </div>


            <div
              style={{
                padding:
                  "7px 19px 17px",
              }}
            >
              {[
                [
                  "Case ID",
                  caseData.id,
                ],
                [
                  "Investigation ID",
                  caseData.investigationId,
                ],
                [
                  "Case Type",
                  caseData.caseType,
                ],
                [
                  "Detected",
                  caseData.detectedAt,
                ],
                [
                  "Source",
                  caseData.sourceSystem,
                ],
                [
                  "Reference",
                  caseData.referenceSystem,
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

        </section>


        {/* ===============================================
            IDENTITY BEFORE / AI RESOLUTION
            =============================================== */}

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
                IDENTITY RESOLUTION
              </div>

              <h2>
                Current Mapping vs AI
                Canonical Identity
              </h2>
            </div>

            <GitCompareArrows size={23} />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              alignItems:
                "stretch",

              gap:
                "18px",

              padding:
                "22px",
            }}
          >

            {/* CURRENT */}

            <div
              style={{
                padding:
                  "22px",

                borderRadius:
                  "15px",

                border:
                  "1px solid rgba(255,90,108,0.15)",

                background:
                  "rgba(255,76,96,0.055)",
              }}
            >
              <div
                style={{
                  color:
                    "#c26d77",

                  fontSize:
                    "9px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",
                }}
              >
                CURRENT MAPPING
              </div>


              <div
                style={{
                  marginTop:
                    "17px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "11px",
                }}
              >
                <div
                  style={{
                    width:
                      "43px",

                    height:
                      "43px",

                    borderRadius:
                      "12px",

                    display:
                      "grid",

                    placeItems:
                      "center",

                    background:
                      "rgba(255,92,108,0.09)",

                    color:
                      "#ff7887",
                  }}
                >
                  <Users size={21} />
                </div>


                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#805d64",

                      fontSize:
                        "8px",
                    }}
                  >
                    Linked Master Identity
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#ff8592",

                      fontSize:
                        "20px",

                      marginTop:
                        "3px",
                    }}
                  >
                    {caseData.currentIdentity}
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "18px",

                  color:
                    "#9b6970",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                AI evidence indicates that
                this identity relationship
                is inconsistent with the
                biometric evidence.
              </div>
            </div>


            {/* ARROW */}

            <div
              style={{
                display:
                  "grid",

                placeItems:
                  "center",
              }}
            >
              <div
                style={{
                  width:
                    "42px",

                  height:
                    "42px",

                  borderRadius:
                    "50%",

                  display:
                    "grid",

                  placeItems:
                    "center",

                  background:
                    "rgba(58,130,255,0.1)",

                  border:
                    "1px solid rgba(72,141,255,0.18)",

                  color:
                    "#6ca4ff",
                }}
              >
                <ArrowRight size={19} />
              </div>
            </div>


            {/* AI RESOLUTION */}

            <div
              style={{
                padding:
                  "22px",

                borderRadius:
                  "15px",

                border:
                  "1px solid rgba(52,211,153,0.14)",

                background:
                  "rgba(52,211,153,0.045)",
              }}
            >
              <div
                style={{
                  color:
                    "#58bd96",

                  fontSize:
                    "9px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",
                }}
              >
                AI CANONICAL RESOLUTION
              </div>


              <div
                style={{
                  marginTop:
                    "17px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "11px",
                }}
              >
                <div
                  style={{
                    width:
                      "43px",

                    height:
                      "43px",

                    borderRadius:
                      "12px",

                    display:
                      "grid",

                    placeItems:
                      "center",

                    background:
                      "rgba(52,211,153,0.08)",

                    color:
                      "#55c99c",
                  }}
                >
                  <UserCheck size={21} />
                </div>


                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#568775",

                      fontSize:
                        "8px",
                    }}
                  >
                    Canonical Identity Candidate
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        "#59d0a1",

                      fontSize:
                        "20px",

                      marginTop:
                        "3px",
                    }}
                  >
                    {caseData.proposedIdentity}
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "18px",

                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",
                }}
              >
                <span
                  style={{
                    color:
                      "#608c7d",

                    fontSize:
                      "9px",
                  }}
                >
                  AI Identity Confidence
                </span>

                <strong
                  style={{
                    color:
                      "#59d0a1",

                    fontSize:
                      "13px",
                  }}
                >
                  {caseData.confidence}%
                </strong>
              </div>
            </div>

          </div>
        </section>


        {/* ===============================================
            BIOMETRIC EVIDENCE + RISK
            =============================================== */}

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
                  BIOMETRIC CORRELATION
                </div>

                <h2>
                  AI Biometric Evidence
                </h2>
              </div>

              <ScanFace size={23} />
            </div>


            <div
              style={{
                padding:
                  "8px 20px 20px",
              }}
            >
              <ScoreBar
                label="Face Similarity"
                score={caseData.evidence.face}
                icon={ScanFace}
              />

              <ScoreBar
                label="Fingerprint Similarity"
                score={caseData.evidence.fingerprint}
                icon={Fingerprint}
              />

              <ScoreBar
                label="Iris Similarity"
                score={caseData.evidence.iris}
                icon={Activity}
              />


              <div
                style={{
                  marginTop:
                    "9px",

                  padding:
                    "15px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(54,125,255,0.06)",

                  border:
                    "1px solid rgba(73,140,255,0.11)",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#617796",

                      fontSize:
                        "8px",
                    }}
                  >
                    COMBINED BIOMETRIC SCORE
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        "#74a9ff",

                      fontSize:
                        "20px",
                    }}
                  >
                    {caseData.evidence.combined}%
                  </strong>
                </div>

                <ShieldCheck
                  size={28}
                  color="#639fff"
                />
              </div>
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  PROTECTIVE RISK MODEL
                </div>

                <h2>
                  Risk & Harm Analysis
                </h2>
              </div>

              <ShieldAlert size={23} />
            </div>


            <div
              style={{
                padding:
                  "18px",

                display:
                  "flex",

                flexDirection:
                  "column",

                gap:
                  "9px",
              }}
            >
              <RiskMetric
                label="Risk Score"
                value={caseData.risk}
                type="danger"
              />

              <RiskMetric
                label="Harm Impact"
                value={caseData.harm}
                type="danger"
              />

              <RiskMetric
                label="Protective Priority"
                value={
                  caseData.protectivePriority
                }
                type="danger"
              />


              <div className="integrityInfo">
                <ShieldAlert size={21} />

                <div>
                  <strong>
                    Wrongly Affected Person:
                    {" "}
                    {
                      caseData.wronglyAffected
                        ? "YES"
                        : "NO"
                    }
                  </strong>

                  <span>
                    Protective Priority can
                    override normal technical
                    severity when another person
                    may be harmed.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </section>


        {/* ===============================================
            DATA COMPARISON
            =============================================== */}

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
                CROSS-SYSTEM RECONCILIATION
              </div>

              <h2>
                Registration Data Comparison
              </h2>
            </div>

            <Database size={22} />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    FIELD
                  </th>

                  <th>
                    BIOMETRIC SYSTEM
                  </th>

                  <th>
                    MASTER REFERENCE
                  </th>

                  <th>
                    RESULT
                  </th>
                </tr>
              </thead>


              <tbody>
                {
                  caseData.dataComparison.map(
                    (row) => (
                      <tr key={row.field}>
                        <td>
                          <strong
                            style={{
                              color:
                                "#cbd7e7",
                            }}
                          >
                            {row.field}
                          </strong>
                        </td>

                        <td className="mono">
                          {row.current}
                        </td>

                        <td className="mono">
                          {row.reference}
                        </td>

                        <td>
                          <span
                            className={
                              row.result === "MATCH"
                                ? "priority medium"
                                : "priority immediate"
                            }
                            style={
                              row.result === "MATCH"
                                ? {
                                    color:
                                      "#56ca9d",

                                    background:
                                      "rgba(52,211,153,0.07)",
                                  }
                                : undefined
                            }
                          >
                            {row.result}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                }
              </tbody>
            </table>
          </div>
        </section>


        {/* ===============================================
            FINDINGS
            =============================================== */}

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
                AGGREGATED AI EVIDENCE
              </div>

              <h2>
                Findings Supporting This Case
              </h2>
            </div>

            <BrainCircuit size={22} />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    FINDING ID
                  </th>

                  <th>
                    TYPE
                  </th>

                  <th>
                    ROLE
                  </th>

                  <th>
                    AI CONFIDENCE
                  </th>
                </tr>
              </thead>


              <tbody>
                {
                  caseData.findingsList.map(
                    (finding) => (
                      <tr key={finding.id}>
                        <td className="mono">
                          {finding.id}
                        </td>

                        <td>
                          {finding.type}
                        </td>

                        <td>
                          <span
                            className={
                              finding.role === "PRIMARY"
                                ? "priority high"
                                : "priority medium"
                            }
                          >
                            {finding.role}
                          </span>
                        </td>

                        <td>
                          <span className="confidence">
                            {finding.confidence}%
                          </span>
                        </td>
                      </tr>
                    )
                  )
                }
              </tbody>
            </table>
          </div>
        </section>


        {/* ===============================================
            PROPOSED CORRECTION
            =============================================== */}

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
                AI REMEDIATION AGENT
              </div>

              <h2>
                Proposed Correction
              </h2>
            </div>

            <GitCompareArrows size={22} />
          </div>


          <div
            style={{
              padding:
                "22px",
            }}
          >
            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "14px",
              }}
            >

              {/* BEFORE */}

              <div
                style={{
                  padding:
                    "20px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid rgba(255,86,103,0.14)",

                  background:
                    "rgba(255,74,94,0.045)",
                }}
              >
                <div
                  style={{
                    color:
                      "#bd6974",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  BEFORE
                </div>

                <div
                  style={{
                    marginTop:
                      "15px",

                    color:
                      "#61718a",

                    fontSize:
                      "9px",
                  }}
                >
                  {
                    caseData.correction
                      .targetRecord
                  }
                </div>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#ff808d",

                    fontSize:
                      "22px",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    caseData.correction
                      .before
                  }
                </strong>

                <div
                  style={{
                    color:
                      "#815e64",

                    fontSize:
                      "9px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    caseData.correction
                      .field
                  }
                </div>
              </div>


              {/* AFTER */}

              <div
                style={{
                  padding:
                    "20px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid rgba(52,211,153,0.14)",

                  background:
                    "rgba(52,211,153,0.04)",
                }}
              >
                <div
                  style={{
                    color:
                      "#55bb93",

                    fontSize:
                      "9px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  AI PROPOSED AFTER
                </div>

                <div
                  style={{
                    marginTop:
                      "15px",

                    color:
                      "#61718a",

                    fontSize:
                      "9px",
                  }}
                >
                  {
                    caseData.correction
                      .targetRecord
                  }
                </div>

                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#58cea0",

                    fontSize:
                      "22px",

                    marginTop:
                      "5px",
                  }}
                >
                  {
                    caseData.correction
                      .after
                  }
                </strong>

                <div
                  style={{
                    color:
                      "#557c6e",

                    fontSize:
                      "9px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    caseData.correction
                      .field
                  }
                </div>
              </div>

            </div>


            <div
              style={{
                marginTop:
                  "15px",

                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr 1fr",

                gap:
                  "10px",
              }}
            >
              {[
                [
                  "Action",
                  caseData.correction.action,
                ],
                [
                  "Target System",
                  caseData.correction.targetSystem,
                ],
                [
                  "Execution",
                  caseData.correction.execution,
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
                        "13px",

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
                          "#596b84",

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
                          "#b8c6d8",

                        fontSize:
                          "9px",
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>


            <div
              className="integrityInfo"
              style={{
                margin:
                  "15px 0 0",
              }}
            >
              <LockKeyhole size={21} />

              <div>
                <strong>
                  Execution Locked
                </strong>

                <span>
                  The AI can recommend and
                  prepare this correction but
                  cannot execute it until both
                  Monitoring Officer and Manager
                  approvals are complete.
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ===============================================
            APPROVALS
            =============================================== */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",

            marginTop:
              "14px",
          }}
        >

          {/* OFFICER */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  HUMAN REVIEW · LEVEL 1
                </div>

                <h2>
                  Monitoring Officer
                </h2>
              </div>

              <UserCheck size={22} />
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
                      display:
                        "block",

                      color:
                        "#5e7189",

                      fontSize:
                        "8px",
                    }}
                  >
                    REVIEW STATUS
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        "#ffbd67",

                      fontSize:
                        "11px",
                    }}
                  >
                    {caseData.officer.status}
                  </strong>
                </div>

                <Clock3
                  size={21}
                  color="#ffbd67"
                />
              </div>


              <div className="detailRow">
                <span>
                  Officer
                </span>

                <strong>
                  {caseData.officer.name}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  Decision
                </span>

                <strong>
                  {caseData.officer.decision}
                </strong>
              </div>


              <p
                style={{
                  color:
                    "#667991",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                {caseData.officer.comments}
              </p>


              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr 1fr",

                  gap:
                    "8px",

                  marginTop:
                    "16px",
                }}
              >
                <button className="primaryButton">
                  <Check size={17} />

                  Approve
                </button>

                <button
                  className="searchButton"
                  style={{
                    justifyContent:
                      "center",

                    height:
                      "42px",
                  }}
                >
                  More Investigation
                </button>
              </div>
            </div>
          </div>


          {/* MANAGER */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  HUMAN REVIEW · LEVEL 2
                </div>

                <h2>
                  Manager Approval
                </h2>
              </div>

              <BadgeCheck size={22} />
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
                      display:
                        "block",

                      color:
                        "#5e7189",

                      fontSize:
                        "8px",
                    }}
                  >
                    APPROVAL STATUS
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        "#687b94",

                      fontSize:
                        "11px",
                    }}
                  >
                    {caseData.manager.status}
                  </strong>
                </div>

                <LockKeyhole
                  size={21}
                  color="#64768d"
                />
              </div>


              <div className="detailRow">
                <span>
                  Manager
                </span>

                <strong>
                  {caseData.manager.name}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  Decision
                </span>

                <strong>
                  {caseData.manager.decision}
                </strong>
              </div>


              <p
                style={{
                  color:
                    "#667991",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                {caseData.manager.comments}
              </p>


              <button
                className="searchButton"
                disabled
                style={{
                  width:
                    "100%",

                  justifyContent:
                    "center",

                  height:
                    "42px",

                  marginTop:
                    "16px",

                  cursor:
                    "not-allowed",

                  opacity:
                    0.45,
                }}
              >
                <LockKeyhole size={16} />

                Waiting for Officer Approval
              </button>
            </div>
          </div>

        </section>


        {/* ===============================================
            EXECUTION / VERIFICATION
            =============================================== */}

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
                CONTROLLED CORRECTION LIFECYCLE
              </div>

              <h2>
                Execution & Post-Correction
                Verification
              </h2>
            </div>

            <ShieldCheck size={22} />
          </div>


          <div
            style={{
              padding:
                "22px",

              display:
                "grid",

              gridTemplateColumns:
                "repeat(3, 1fr)",

              gap:
                "12px",
            }}
          >
            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "12px",

                background:
                  "rgba(255,255,255,0.025)",

                border:
                  "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <LockKeyhole
                size={20}
                color="#6d809a"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "12px",

                  fontSize:
                    "10px",
                }}
              >
                Execution
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#60728c",

                  marginTop:
                    "5px",

                  fontSize:
                    "9px",
                }}
              >
                NOT AUTHORIZED
              </span>
            </div>


            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "12px",

                background:
                  "rgba(255,255,255,0.025)",

                border:
                  "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <Activity
                size={20}
                color="#6d809a"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "12px",

                  fontSize:
                    "10px",
                }}
              >
                Verification
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#60728c",

                  marginTop:
                    "5px",

                  fontSize:
                    "9px",
                }}
              >
                NOT STARTED
              </span>
            </div>


            <div
              style={{
                padding:
                  "17px",

                borderRadius:
                  "12px",

                background:
                  "rgba(255,255,255,0.025)",

                border:
                  "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <FileCheck2
                size={20}
                color="#6d809a"
              />

              <strong
                style={{
                  display:
                    "block",

                  marginTop:
                    "12px",

                  fontSize:
                    "10px",
                }}
              >
                Case Closure
              </strong>

              <span
                style={{
                  display:
                    "block",

                  color:
                    "#60728c",

                  marginTop:
                    "5px",

                  fontSize:
                    "9px",
                }}
              >
                PENDING VERIFICATION
              </span>
            </div>
          </div>
        </section>


        {/* ===============================================
            AUDIT TIMELINE
            =============================================== */}

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
                IMMUTABLE CASE HISTORY
              </div>

              <h2>
                Audit Timeline
              </h2>
            </div>

            <Activity size={22} />
          </div>


          <div
            style={{
              padding:
                "8px 21px 20px",
            }}
          >
            {
              caseData.audit.map(
                (
                  event,
                  index
                ) => (
                  <div
                    key={
                      `${event.time}-${event.action}`
                    }
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "80px 24px 1fr",

                      gap:
                        "10px",

                      padding:
                        "15px 0",

                      borderBottom:
                        index
                        < caseData.audit.length - 1
                          ? "1px solid rgba(255,255,255,0.045)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#53667e",

                        fontSize:
                          "9px",

                        paddingTop:
                          "3px",
                      }}
                    >
                      {event.time}
                    </div>

                    <div
                      style={{
                        width:
                          "22px",

                        height:
                          "22px",

                        borderRadius:
                          "50%",

                        display:
                          "grid",

                        placeItems:
                          "center",

                        background:
                          "rgba(66,139,255,0.09)",

                        color:
                          "#659eff",
                      }}
                    >
                      <Check size={12} />
                    </div>

                    <div>
                      <div
                        style={{
                          display:
                            "flex",

                          gap:
                            "7px",

                          alignItems:
                            "center",

                          flexWrap:
                            "wrap",
                        }}
                      >
                        <strong
                          style={{
                            fontSize:
                              "10px",

                            color:
                              "#cbd8e7",
                          }}
                        >
                          {event.action}
                        </strong>

                        <span
                          style={{
                            color:
                              "#5278b0",

                            fontSize:
                              "8px",
                          }}
                        >
                          {event.actor}
                        </span>
                      </div>

                      <div
                        style={{
                          color:
                            "#65778f",

                          fontSize:
                            "9px",

                          lineHeight:
                            1.6,

                          marginTop:
                            "5px",
                        }}
                      >
                        {event.detail}
                      </div>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </section>


        {/* ===============================================
            SAFETY FOOTER
            =============================================== */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "17px",
          }}
        >
          <ShieldCheck size={24} />

          <div>
            <strong>
              Human-in-the-Loop Identity
              Governance
            </strong>

            <span>
              AI agents can detect,
              investigate, prioritize and
              recommend corrections. Sensitive
              identity changes remain blocked
              until required human approvals are
              recorded. The Master Reference
              remains read only.
            </span>
          </div>
        </section>


        {/* ===============================================
            FOOTER
            =============================================== */}

        <footer className="footer">
          <span>
            AI Identity Reconciliation Platform
            · Synthetic Demonstration
          </span>

          <div>
            <Clock3 size={15} />

            Full Case Audit Active
          </div>
        </footer>

      </main>
    </div>
  );
}