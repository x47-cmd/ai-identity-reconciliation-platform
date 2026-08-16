import Link from "next/link";

import Sidebar from "../../components/Sidebar";

import {
  COMPLEX_DEMO_CASE,
  GOVERNANCE,
  VERIFIED_DEMO_CASE,
} from "../../lib/demo-data";

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
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";


/* =========================================================
   CASE DETAIL VIEW MODELS

   Core identity, risk, execution and verification values
   come from app/lib/demo-data.js.

   Narrative fields and supporting finding breakdowns below
   are synthetic frontend presentation data.

   IMPORTANT:
   The current backend demonstration uses synthetic vector
   correlation. It does not expose separate Face,
   Fingerprint or Iris similarity scores.
   ========================================================= */

const caseDatabase = {
  [VERIFIED_DEMO_CASE.id]: {
    id:
      VERIFIED_DEMO_CASE.id,

    title:
      VERIFIED_DEMO_CASE.title,

    caseType:
      VERIFIED_DEMO_CASE.caseType,

    priority:
      VERIFIED_DEMO_CASE.priority,

    status:
      VERIFIED_DEMO_CASE.finalStatus,

    biometricId:
      VERIFIED_DEMO_CASE.biometricId,

    currentIdentity:
      VERIFIED_DEMO_CASE.currentIdentity,

    proposedIdentity:
      VERIFIED_DEMO_CASE.canonicalIdentity,

    confidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    risk:
      VERIFIED_DEMO_CASE.risk,

    harm:
      VERIFIED_DEMO_CASE.harm,

    protectivePriority:
      VERIFIED_DEMO_CASE.protectivePriority,

    wronglyAffected:
      VERIFIED_DEMO_CASE.wronglyAffected,

    findings:
      2,

    investigationId:
      "INV-2026-00001",

    detectedAt:
      "Synthetic E2E demonstration",

    sourceSystem:
      "Biometric System",

    referenceSystem:
      "Master Reference System",

    isVerifiedClosed:
      true,

    aiConclusion:
      (
        "The aggregated synthetic biometric and identity evidence strongly "
        + "indicates that BIO-000166 is associated with REF-001009 "
        + "rather than its previous mapping REF-002711. The identity "
        + "conflict created potential wrong-person impact and was "
        + "therefore assigned immediate protective priority."
      ),

    rootCause:
      (
        "A post-registration biometric-to-identity mapping conflict "
        + "associated the biometric record with an incorrect Master "
        + "Reference identity."
      ),

    evidence: {
      resolutionConfidence:
        VERIFIED_DEMO_CASE.aiConfidence,

      postCorrectionMatch:
        VERIFIED_DEMO_CASE.verification.biometricMatch,
    },

    dataComparison: [
      {
        field:
          "Previous Master Identity",

        current:
          VERIFIED_DEMO_CASE.currentIdentity,

        reference:
          VERIFIED_DEMO_CASE.canonicalIdentity,

        result:
          "CONFLICT",
      },

      {
        field:
          "Biometric Ownership",

        current:
          VERIFIED_DEMO_CASE.currentIdentity,

        reference:
          VERIFIED_DEMO_CASE.canonicalIdentity,

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
          "Canonical Resolution",

        current:
          "Previous mapping rejected",

        reference:
          `${VERIFIED_DEMO_CASE.aiConfidence}% confidence`,

        result:
          "MATCH",
      },
    ],

    findingsList: [
      {
        id:
          "SYN-FND-0001",

        type:
          "WRONG_MAPPING",

        role:
          "PRIMARY",

        confidence:
          VERIFIED_DEMO_CASE.aiConfidence,
      },

      {
        id:
          "SYN-FND-0002",

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
        VERIFIED_DEMO_CASE.execution.action,

      targetSystem:
        VERIFIED_DEMO_CASE.execution.targetSystem,

      targetRecord:
        VERIFIED_DEMO_CASE.execution.targetRecord,

      field:
        VERIFIED_DEMO_CASE.execution.field,

      before:
        VERIFIED_DEMO_CASE.execution.before,

      after:
        VERIFIED_DEMO_CASE.execution.after,

      execution:
        VERIFIED_DEMO_CASE.execution.status,
    },

    officer: {
      status:
        "APPROVED",

      name:
        "Demo Monitoring Officer",

      decision:
        VERIFIED_DEMO_CASE.officerDecision,

      comments:
        "Monitoring Officer reviewed the investigation evidence and approved the proposed correction.",
    },

    manager: {
      status:
        "APPROVED",

      name:
        "Demo Supervising Manager",

      decision:
        VERIFIED_DEMO_CASE.managerDecision,

      comments:
        "Manager completed the second-level review and authorized controlled execution.",
    },

    verification: {
      status:
        VERIFIED_DEMO_CASE.verification.status,

      score:
        VERIFIED_DEMO_CASE.verification.score,

      biometricMatch:
        VERIFIED_DEMO_CASE.verification.biometricMatch,

      identityMappingValid:
        VERIFIED_DEMO_CASE.verification.identityMappingValid,

      conflictResolved:
        VERIFIED_DEMO_CASE.verification.originalConflictResolved,

      secondaryConflict:
        VERIFIED_DEMO_CASE.verification.secondaryConflict,

      finalStatus:
        VERIFIED_DEMO_CASE.finalStatus,
    },

    audit: [
      {
        sequence:
          "01",

        actor:
          "Investigation Agent",

        action:
          "AI investigation completed",

        detail:
          "Identity evidence, risk, harm and proposed correction were prepared for human review.",
      },

      {
        sequence:
          "02",

        actor:
          "Monitoring Officer",

        action:
          "Officer approval recorded",

        detail:
          "Level 1 human review approved the proposed identity correction.",
      },

      {
        sequence:
          "03",

        actor:
          "Supervising Manager",

        action:
          "Manager approval recorded",

        detail:
          "Level 2 human review authorized controlled correction execution.",
      },

      {
        sequence:
          "04",

        actor:
          "Execution Agent",

        action:
          "Controlled correction completed",

        detail:
          "BIO-000166 was reassigned from REF-002711 to REF-001009 in the permitted runtime target.",
      },

      {
        sequence:
          "05",

        actor:
          "Verification Agent",

        action:
          "Post-correction verification passed",

        detail:
          "Verification score reached 100 and the case reached VERIFIED_CLOSED.",
      },
    ],
  },


  /* ======================================================
     BACKEND-CONFIRMED COMPLEX CASE

     BIO-000795 → CASE-2026-00014
     ====================================================== */

  [COMPLEX_DEMO_CASE.id]: {
    id:
      COMPLEX_DEMO_CASE.id,

    title:
      COMPLEX_DEMO_CASE.title,

    caseType:
      COMPLEX_DEMO_CASE.caseType,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      "AI_INVESTIGATED",

    biometricId:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    currentIdentity:
      COMPLEX_DEMO_CASE.currentMasterIdentities[0],

    proposedIdentity:
      COMPLEX_DEMO_CASE.canonicalIdentity,

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    risk:
      COMPLEX_DEMO_CASE.risk,

    harm:
      COMPLEX_DEMO_CASE.harm,

    protectivePriority:
      COMPLEX_DEMO_CASE.protectivePriority,

    wronglyAffected:
      COMPLEX_DEMO_CASE.wronglyAffected,

    findings:
      COMPLEX_DEMO_CASE.findingCount,

    investigationId:
      "INV-2026-00014",

    detectedAt:
      "Synthetic reconciliation run",

    sourceSystem:
      "Biometric System",

    referenceSystem:
      "Master Reference System",

    isVerifiedClosed:
      false,

    aiConclusion:
      (
        "Multiple related biometric and identity findings were "
        + "aggregated into one complex investigation case. "
        + "Case-level identity resolution selected REF-002343 "
        + "as the canonical identity candidate with 99.99% confidence."
      ),

    rootCause:
      (
        "Multiple biometric and identity relationships conflict "
        + "across linked registration records, requiring case-level "
        + "aggregation before canonical identity resolution."
      ),

    evidence: {
      resolutionConfidence:
        COMPLEX_DEMO_CASE.aiConfidence,

      postCorrectionMatch:
        null,
    },

    dataComparison: [
      {
        field:
          "Current Master Link",

        current:
          COMPLEX_DEMO_CASE.currentMasterIdentities[0],

        reference:
          COMPLEX_DEMO_CASE.canonicalIdentity,

        result:
          "CONFLICT",
      },

      {
        field:
          "Related Biometric",

        current:
          COMPLEX_DEMO_CASE.affectedBiometrics[0],

        reference:
          COMPLEX_DEMO_CASE.primaryBiometricId,

        result:
          "RELATED",
      },

      {
        field:
          "Canonical Resolution",

        current:
          "Unresolved at raw finding level",

        reference:
          COMPLEX_DEMO_CASE.canonicalIdentity,

        result:
          "MATCH",
      },
    ],

    findingsList: [
      {
        id:
          "SYN-FND-0011",

        type:
          "WRONG_MAPPING",

        role:
          "PRIMARY",

        confidence:
          COMPLEX_DEMO_CASE.aiConfidence,
      },

      {
        id:
          "SYN-FND-0012",

        type:
          "DUPLICATE_BIOMETRIC",

        role:
          "CORROBORATING",

        confidence:
          100,
      },

      {
        id:
          "SYN-FND-0013",

        type:
          "DATA_MISMATCH",

        role:
          "CORROBORATING",

        confidence:
          99.95,
      },

      {
        id:
          "SYN-FND-0014",

        type:
          "DUPLICATE_IDENTITY",

        role:
          "CORROBORATING",

        confidence:
          99.92,
      },

      {
        id:
          "SYN-FND-0015",

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
        COMPLEX_DEMO_CASE.primaryBiometricId,

      field:
        "linked_master_id",

      before:
        COMPLEX_DEMO_CASE.currentMasterIdentities[0],

      after:
        COMPLEX_DEMO_CASE.canonicalIdentity,

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
        "Manager review becomes available only after Officer approval.",
    },

    verification: {
      status:
        "NOT_STARTED",

      score:
        null,

      biometricMatch:
        null,

      identityMappingValid:
        null,

      conflictResolved:
        null,

      secondaryConflict:
        null,

      finalStatus:
        "AI_INVESTIGATED",
    },

    audit: [
      {
        sequence:
          "01",

        actor:
          "Reconciliation Agent",

        action:
          "Multiple related findings detected",

        detail:
          "Related biometric and identity inconsistencies were identified during reconciliation.",
      },

      {
        sequence:
          "02",

        actor:
          "Case Aggregation Engine",

        action:
          "Findings aggregated",

        detail:
          "Five related findings were consolidated into one complex identity case.",
      },

      {
        sequence:
          "03",

        actor:
          "Identity Resolution Agent",

        action:
          "Canonical identity resolved",

        detail:
          "REF-002343 was selected as the strongest case-level identity candidate.",
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


function StatusBadge({
  value,
}) {
  const success =
    [
      "APPROVED",
      "COMPLETED",
      "PASSED",
      "VERIFIED_CLOSED",
    ].includes(value);

  const warning =
    [
      "PENDING",
    ].includes(value);

  const neutral =
    [
      "NOT_READY",
      "NOT_STARTED",
      "NOT_AUTHORIZED",
    ].includes(value);

  const color =
    success
      ? "#59cfa0"
      : warning
        ? "#ffbd67"
        : neutral
          ? "#8b9db3"
          : "#76a9ff";

  const background =
    success
      ? "rgba(52,211,153,0.07)"
      : warning
        ? "rgba(255,185,90,0.06)"
        : neutral
          ? "rgba(130,150,175,0.06)"
          : "rgba(70,140,255,0.07)";

  const border =
    success
      ? "rgba(52,211,153,0.13)"
      : warning
        ? "rgba(255,185,90,0.12)"
        : neutral
          ? "rgba(130,150,175,0.11)"
          : "rgba(70,140,255,0.12)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "25px",
        padding: "0 10px",
        borderRadius: "7px",
        color,
        background,
        border: `1px solid ${border}`,
        fontSize: "10px",
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
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
        flex: 1,
        minWidth: "150px",
        padding: "17px",
        borderRadius: "13px",
        background:
          "rgba(255,255,255,0.025)",
        border:
          "1px solid rgba(255,255,255,0.055)",
      }}
    >
      <div
        style={{
          color: "#71839a",
          fontSize: "10px",
          marginBottom: "9px",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          color,
          fontSize: "24px",
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: "#667991",
          fontSize: "10px",
        }}
      >
        {" / 100"}
      </span>
    </div>
  );
}


/* =========================================================
   CASE LIFECYCLE
   ========================================================= */

function getLifecycle(
  caseData
) {
  if (
    caseData.isVerifiedClosed
  ) {
    return [
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
        true,
      ],
      [
        "Manager Approval",
        true,
      ],
      [
        "Execution",
        true,
      ],
      [
        "Verification",
        true,
      ],
      [
        "Closed",
        true,
      ],
    ];
  }


  return [
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
  ];
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
            width: "fit-content",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />

          Back to Cases
        </Link>

        <div
          className="panel"
          style={{
            padding: "50px",
            marginTop: "20px",
            textAlign: "center",
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
              color: "#7b8da4",
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


  const lifecycle =
    getLifecycle(
      caseData
    );


  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        {/* ===============================================
            BACK / HEADER
            =============================================== */}

        <div
          style={{
            marginBottom: "19px",
          }}
        >
          <Link
            href="/cases"
            className="textButton"
            style={{
              width: "fit-content",
              padding: 0,
              textDecoration: "none",
              marginBottom: "15px",
            }}
          >
            <ArrowLeft size={16} />

            Back to Cases
          </Link>


          <header
            className="topbar"
            style={{
              marginBottom: 0,
            }}
          >
            <div>
              <div className="eyebrow">
                <BrainCircuit size={15} />

                AI INVESTIGATION WORKSPACE
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "7px",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                  }}
                >
                  {caseData.id}
                </h1>

                <PriorityBadge
                  priority={
                    caseData.priority
                  }
                />

                <StatusBadge
                  value={
                    caseData.status
                  }
                />
              </div>


              <p
                style={{
                  marginTop: "7px",
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
                This case was assigned immediate
                protective priority because an
                unrelated person could be affected
                by the incorrect identity
                relationship.
              </span>
            </div>

            <div
              className="priority immediate"
              style={{
                height: "32px",
                padding: "0 13px",
              }}
            >
              PRIORITY {caseData.protectivePriority}
            </div>
          </section>
        )}


        {/* ===============================================
            VERIFIED SUCCESS
            =============================================== */}

        {caseData.isVerifiedClosed && (
          <section
            className="integrityInfo"
            style={{
              margin: "0 0 20px",
              padding: "17px",
            }}
          >
            <CheckCircle2 size={24} />

            <div>
              <strong>
                Correction Verified and Case Closed
              </strong>

              <span>
                The approved correction was
                executed successfully and passed
                post-correction verification with
                a score of
                {" "}
                {caseData.verification.score}.
              </span>
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
                fontSize: "18px",
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
              Supporting Findings
            </div>

            <div className="metricSubtitle">
              Aggregated case evidence
            </div>
          </div>
        </section>


        {/* ===============================================
            LIFECYCLE
            =============================================== */}

        <section
          className="panel"
          style={{
            marginBottom: "16px",
            padding: "18px 20px",
          }}
        >
          <div className="panelEyebrow">
            CASE LIFECYCLE
          </div>


          <div
            style={{
              marginTop: "17px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {lifecycle.map(
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
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      minWidth: "108px",
                      padding: "10px 12px",
                      borderRadius: "10px",

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
                          : "#74869d",

                      fontSize: "10px",
                      fontWeight: 700,

                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
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
                      color="#52647b"
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
                padding: "21px",
              }}
            >
              <div
                style={{
                  padding: "17px",
                  borderRadius: "13px",
                  background:
                    "rgba(54,125,255,0.055)",
                  border:
                    "1px solid rgba(72,139,255,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Sparkles
                    size={20}
                    color="#69a1ff"
                    style={{
                      flexShrink: 0,
                    }}
                  />

                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#d7e6f9",
                      }}
                    >
                      AI Conclusion
                    </strong>

                    <p
                      style={{
                        color: "#8799b0",
                        fontSize: "11px",
                        lineHeight: 1.75,
                        margin: "8px 0 0",
                      }}
                    >
                      {caseData.aiConclusion}
                    </p>
                  </div>
                </div>
              </div>


              <div
                style={{
                  marginTop: "19px",
                }}
              >
                <div className="panelEyebrow">
                  PROBABLE ROOT CAUSE
                </div>

                <p
                  style={{
                    color: "#96a6ba",
                    fontSize: "11px",
                    lineHeight: 1.75,
                    margin: "10px 0 0",
                  }}
                >
                  {caseData.rootCause}
                </p>
              </div>


              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span className="confidence">
                  AI Confidence:
                  {" "}
                  {caseData.confidence}%
                </span>

                <span
                  style={{
                    color: "#71839a",
                    fontSize: "10px",
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
                padding: "7px 19px 17px",
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
                  "Detection Context",
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
            IDENTITY RESOLUTION
            =============================================== */}

        <section
          className="panel"
          style={{
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                IDENTITY RESOLUTION
              </div>

              <h2>
                Previous / Current Mapping vs
                Canonical Identity
              </h2>
            </div>

            <GitCompareArrows size={23} />
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr auto 1fr",
              alignItems: "stretch",
              gap: "18px",
              padding: "22px",
            }}
          >
            <div
              style={{
                padding: "22px",
                borderRadius: "15px",
                border:
                  "1px solid rgba(255,90,108,0.15)",
                background:
                  "rgba(255,76,96,0.055)",
              }}
            >
              <div
                style={{
                  color: "#d27a85",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                {
                  caseData.isVerifiedClosed
                    ? "PREVIOUS MAPPING"
                    : "CURRENT MAPPING"
                }
              </div>


              <div
                style={{
                  marginTop: "17px",
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                }}
              >
                <div
                  style={{
                    width: "43px",
                    height: "43px",
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    background:
                      "rgba(255,92,108,0.09)",
                    color: "#ff7887",
                  }}
                >
                  <Users size={21} />
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#976c74",
                      fontSize: "10px",
                    }}
                  >
                    Linked Master Identity
                  </span>

                  <strong
                    style={{
                      display: "block",
                      color: "#ff8592",
                      fontSize: "20px",
                      marginTop: "3px",
                    }}
                  >
                    {caseData.currentIdentity}
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop: "18px",
                  color: "#ab737b",
                  fontSize: "10px",
                  lineHeight: 1.6,
                }}
              >
                AI reconciliation identified this
                relationship as inconsistent with
                the stronger case-level identity
                evidence.
              </div>
            </div>


            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background:
                    "rgba(58,130,255,0.1)",
                  border:
                    "1px solid rgba(72,141,255,0.18)",
                  color: "#6ca4ff",
                }}
              >
                <ArrowRight size={19} />
              </div>
            </div>


            <div
              style={{
                padding: "22px",
                borderRadius: "15px",
                border:
                  "1px solid rgba(52,211,153,0.14)",
                background:
                  "rgba(52,211,153,0.045)",
              }}
            >
              <div
                style={{
                  color: "#58bd96",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                {
                  caseData.isVerifiedClosed
                    ? "VERIFIED CANONICAL IDENTITY"
                    : "AI CANONICAL RESOLUTION"
                }
              </div>


              <div
                style={{
                  marginTop: "17px",
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                }}
              >
                <div
                  style={{
                    width: "43px",
                    height: "43px",
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    background:
                      "rgba(52,211,153,0.08)",
                    color: "#55c99c",
                  }}
                >
                  <UserCheck size={21} />
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#679585",
                      fontSize: "10px",
                    }}
                  >
                    Canonical Identity
                  </span>

                  <strong
                    style={{
                      display: "block",
                      color: "#59d0a1",
                      fontSize: "20px",
                      marginTop: "3px",
                    }}
                  >
                    {caseData.proposedIdentity}
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    color: "#719a8b",
                    fontSize: "10px",
                  }}
                >
                  AI Identity Confidence
                </span>

                <strong
                  style={{
                    color: "#59d0a1",
                    fontSize: "13px",
                  }}
                >
                  {caseData.confidence}%
                </strong>
              </div>
            </div>
          </div>
        </section>


        {/* ===============================================
            SYNTHETIC CORRELATION + RISK
            =============================================== */}

        <section
          className="dashboardGrid"
          style={{
            marginTop: "16px",
          }}
        >

          {/* CORRELATION EVIDENCE */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  SYNTHETIC CORRELATION
                </div>

                <h2>
                  Identity Resolution Evidence
                </h2>
              </div>

              <Fingerprint size={23} />
            </div>


            <div
              style={{
                padding: "18px 20px 20px",
              }}
            >
              <div
                style={{
                  padding: "14px",
                  borderRadius: "11px",
                  background:
                    "rgba(70,140,255,0.045)",
                  border:
                    "1px solid rgba(70,140,255,0.08)",
                  color: "#8194ad",
                  fontSize: "10px",
                  lineHeight: 1.65,
                }}
              >
                The current backend demonstration
                uses synthetic vector-based
                correlation. It does not expose
                separate Face, Fingerprint or Iris
                similarity scores.
              </div>


              <div
                style={{
                  marginTop: "15px",
                }}
              >
                <div className="detailRow">
                  <span>
                    Canonical Identity Confidence
                  </span>

                  <strong className="confidence">
                    {caseData.evidence.resolutionConfidence}%
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Supporting Findings
                  </span>

                  <strong>
                    {caseData.findings}
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Canonical Identity Candidate
                  </span>

                  <strong className="successText">
                    {caseData.proposedIdentity}
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    Correlation Source
                  </span>

                  <strong>
                    Synthetic Vector Evidence
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  borderRadius: "11px",
                  background:
                    "rgba(54,125,255,0.06)",
                  border:
                    "1px solid rgba(73,140,255,0.11)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#7185a0",
                      fontSize: "10px",
                      fontWeight: 750,
                    }}
                  >
                    IDENTITY RESOLUTION CONFIDENCE
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: "#74a9ff",
                      fontSize: "20px",
                    }}
                  >
                    {caseData.evidence.resolutionConfidence}%
                  </strong>
                </div>

                <BrainCircuit
                  size={28}
                  color="#639fff"
                />
              </div>


              {caseData.isVerifiedClosed && (
                <div
                  className="integrityInfo"
                  style={{
                    margin: "14px 0 0",
                  }}
                >
                  <ShieldCheck size={21} />

                  <div>
                    <strong>
                      Post-Correction Biometric Match
                    </strong>

                    <span>
                      Verified biometric match score:
                      {" "}
                      {
                        caseData.evidence
                          .postCorrectionMatch
                      }
                      %.
                      This value comes from the
                      completed post-correction
                      verification stage.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* PROTECTIVE RISK */}

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
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "9px",
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
            marginTop: "16px",
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
                  <th>FIELD</th>
                  <th>BIOMETRIC SYSTEM</th>
                  <th>MASTER REFERENCE</th>
                  <th>RESULT</th>
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
                              color: "#cbd7e7",
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
                                : row.result === "RELATED"
                                  ? "priority high"
                                  : "priority immediate"
                            }
                            style={
                              row.result === "MATCH"
                                ? {
                                    color: "#56ca9d",
                                    background:
                                      "rgba(52,211,153,0.07)",
                                    border:
                                      "1px solid rgba(52,211,153,0.13)",
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
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                SYNTHETIC SUPPORTING EVIDENCE
              </div>

              <h2>
                Findings Supporting This Case
              </h2>
            </div>

            <BrainCircuit size={22} />
          </div>


          <div
            style={{
              padding: "12px 18px",
              color: "#71839a",
              fontSize: "10px",
              lineHeight: 1.6,
              borderBottom:
                "1px solid rgba(255,255,255,0.045)",
            }}
          >
            The breakdown below is representative
            frontend evidence for the synthetic
            demonstration. Case-level identity,
            risk and verification metrics remain
            the authoritative demo values.
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>FINDING ID</th>
                  <th>TYPE</th>
                  <th>ROLE</th>
                  <th>AI CONFIDENCE</th>
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
            CORRECTION
            =============================================== */}

        <section
          className="panel"
          style={{
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                AI REMEDIATION AGENT
              </div>

              <h2>
                {
                  caseData.isVerifiedClosed
                    ? "Executed Correction"
                    : "Proposed Correction"
                }
              </h2>
            </div>

            <GitCompareArrows size={22} />
          </div>


          <div
            style={{
              padding: "22px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "14px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  border:
                    "1px solid rgba(255,86,103,0.14)",
                  background:
                    "rgba(255,74,94,0.045)",
                }}
              >
                <div
                  style={{
                    color: "#cd7580",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                  }}
                >
                  BEFORE
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    color: "#71839a",
                    fontSize: "10px",
                  }}
                >
                  {
                    caseData.correction
                      .targetRecord
                  }
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#ff808d",
                    fontSize: "22px",
                    marginTop: "5px",
                  }}
                >
                  {
                    caseData.correction
                      .before
                  }
                </strong>

                <div
                  style={{
                    color: "#916a71",
                    fontSize: "10px",
                    marginTop: "7px",
                  }}
                >
                  {
                    caseData.correction
                      .field
                  }
                </div>
              </div>


              <div
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  border:
                    "1px solid rgba(52,211,153,0.14)",
                  background:
                    "rgba(52,211,153,0.04)",
                }}
              >
                <div
                  style={{
                    color: "#5fc79d",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                  }}
                >
                  {
                    caseData.isVerifiedClosed
                      ? "VERIFIED AFTER"
                      : "AI PROPOSED AFTER"
                  }
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    color: "#71839a",
                    fontSize: "10px",
                  }}
                >
                  {
                    caseData.correction
                      .targetRecord
                  }
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#58cea0",
                    fontSize: "22px",
                    marginTop: "5px",
                  }}
                >
                  {
                    caseData.correction
                      .after
                  }
                </strong>

                <div
                  style={{
                    color: "#668c7e",
                    fontSize: "10px",
                    marginTop: "7px",
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
                marginTop: "15px",
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: "10px",
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
                      padding: "13px",
                      borderRadius: "10px",
                      background:
                        "rgba(255,255,255,0.024)",
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
                        color: "#c2cfdf",
                        fontSize: "10px",
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
                margin: "15px 0 0",
              }}
            >
              {
                caseData.isVerifiedClosed
                  ? (
                    <ShieldCheck size={21} />
                  )
                  : (
                    <LockKeyhole size={21} />
                  )
              }

              <div>
                <strong>
                  {
                    caseData.isVerifiedClosed
                      ? "Controlled Correction Completed"
                      : "Execution Locked"
                  }
                </strong>

                <span>
                  {
                    caseData.isVerifiedClosed
                      ? "The correction was executed only after both required human approvals and subsequently passed verification."
                      : "The AI can recommend and prepare this correction but cannot execute it until both Monitoring Officer and Manager approvals are complete."
                  }
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
            marginTop: "16px",
          }}
        >
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
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#71839a",
                      fontSize: "10px",
                    }}
                  >
                    REVIEW STATUS
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",

                      color:
                        caseData.officer.status === "APPROVED"
                          ? "#59cfa0"
                          : "#ffbd67",

                      fontSize: "11px",
                    }}
                  >
                    {caseData.officer.status}
                  </strong>
                </div>

                {
                  caseData.officer.status === "APPROVED"
                    ? (
                      <CheckCircle2
                        size={21}
                        color="#59cfa0"
                      />
                    )
                    : (
                      <Clock3
                        size={21}
                        color="#ffbd67"
                      />
                    )
                }
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
                  color: "#788ba2",
                  fontSize: "10px",
                  lineHeight: 1.65,
                }}
              >
                {caseData.officer.comments}
              </p>


              {!caseData.isVerifiedClosed && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "8px",
                    marginTop: "16px",
                  }}
                >
                  <button className="primaryButton">
                    <Check size={17} />

                    Approve
                  </button>

                  <button
                    className="searchButton"
                    style={{
                      justifyContent: "center",
                      height: "42px",
                      borderColor:
                        "rgba(255,185,90,0.15)",
                      color: "#e0ad5f",
                    }}
                  >
                    More Investigation
                  </button>
                </div>
              )}
            </div>
          </div>


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
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#71839a",
                      fontSize: "10px",
                    }}
                  >
                    APPROVAL STATUS
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "4px",

                      color:
                        caseData.manager.status === "APPROVED"
                          ? "#59cfa0"
                          : "#8495aa",

                      fontSize: "11px",
                    }}
                  >
                    {caseData.manager.status}
                  </strong>
                </div>

                {
                  caseData.manager.status === "APPROVED"
                    ? (
                      <CheckCircle2
                        size={21}
                        color="#59cfa0"
                      />
                    )
                    : (
                      <LockKeyhole
                        size={21}
                        color="#74869d"
                      />
                    )
                }
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
                  color: "#788ba2",
                  fontSize: "10px",
                  lineHeight: 1.65,
                }}
              >
                {caseData.manager.comments}
              </p>


              {!caseData.isVerifiedClosed && (
                <button
                  className="searchButton"
                  disabled
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "42px",
                    marginTop: "16px",
                  }}
                >
                  <LockKeyhole size={16} />

                  Waiting for Officer Approval
                </button>
              )}
            </div>
          </div>
        </section>


        {/* ===============================================
            EXECUTION / VERIFICATION
            =============================================== */}

        <section
          className="panel"
          style={{
            marginTop: "16px",
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
              padding: "22px",
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {[
              {
                label:
                  "Execution",

                value:
                  caseData.correction.execution,

                icon:
                  LockKeyhole,
              },

              {
                label:
                  "Verification",

                value:
                  caseData.verification.status,

                icon:
                  Activity,
              },

              {
                label:
                  "Case Closure",

                value:
                  caseData.verification.finalStatus,

                icon:
                  FileCheck2,
              },
            ].map(
              (
                item
              ) => {
                const Icon =
                  item.icon;

                const complete =
                  [
                    "COMPLETED",
                    "PASSED",
                    "VERIFIED_CLOSED",
                  ].includes(
                    item.value
                  );


                return (
                  <div
                    key={
                      item.label
                    }
                    style={{
                      padding: "17px",
                      borderRadius: "12px",

                      background:
                        complete
                          ? "rgba(52,211,153,0.045)"
                          : "rgba(255,255,255,0.025)",

                      border:
                        complete
                          ? "1px solid rgba(52,211,153,0.11)"
                          : "1px solid rgba(255,255,255,0.055)",
                    }}
                  >
                    <Icon
                      size={20}
                      color={
                        complete
                          ? "#59cfa0"
                          : "#7b8da4"
                      }
                    />

                    <strong
                      style={{
                        display: "block",
                        marginTop: "12px",
                        fontSize: "11px",
                      }}
                    >
                      {item.label}
                    </strong>

                    <span
                      style={{
                        display: "block",

                        color:
                          complete
                            ? "#59cfa0"
                            : "#71839a",

                        marginTop: "5px",
                        fontSize: "10px",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                );
              }
            )}
          </div>


          {caseData.isVerifiedClosed && (
            <div
              style={{
                padding: "0 22px 22px",
              }}
            >
              <div
                className="integrityInfo"
                style={{
                  margin: 0,
                }}
              >
                <ShieldCheck size={21} />

                <div>
                  <strong>
                    Verification Score:
                    {" "}
                    {caseData.verification.score}
                  </strong>

                  <span>
                    Biometric Match:
                    {" "}
                    {caseData.verification.biometricMatch}%
                    {" · "}
                    Identity Mapping Valid:
                    {" "}
                    {
                      caseData.verification.identityMappingValid
                        ? "TRUE"
                        : "FALSE"
                    }
                    {" · "}
                    Conflict Resolved:
                    {" "}
                    {
                      caseData.verification.conflictResolved
                        ? "TRUE"
                        : "FALSE"
                    }
                    {" · "}
                    Secondary Conflict:
                    {" "}
                    {
                      caseData.verification.secondaryConflict
                        ? "TRUE"
                        : "FALSE"
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>


        {/* ===============================================
            AUDIT TIMELINE
            =============================================== */}

        <section
          className="panel"
          style={{
            marginTop: "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                TRACEABLE CASE HISTORY
              </div>

              <h2>
                Audit Sequence
              </h2>
            </div>

            <Activity size={22} />
          </div>


          <div
            style={{
              padding: "8px 21px 20px",
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
                      `${event.sequence}-${event.action}`
                    }
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "70px 24px 1fr",
                      gap: "10px",
                      padding: "15px 0",

                      borderBottom:
                        index
                        < caseData.audit.length - 1
                          ? "1px solid rgba(255,255,255,0.045)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        color: "#687b93",
                        fontSize: "10px",
                        paddingTop: "3px",
                      }}
                    >
                      STEP {event.sequence}
                    </div>


                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background:
                          "rgba(66,139,255,0.09)",
                        color: "#659eff",
                      }}
                    >
                      <Check size={12} />
                    </div>


                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: "11px",
                            color: "#cbd8e7",
                          }}
                        >
                          {event.action}
                        </strong>

                        <span
                          style={{
                            color: "#6390cd",
                            fontSize: "10px",
                          }}
                        >
                          {event.actor}
                        </span>
                      </div>

                      <div
                        style={{
                          color: "#74869d",
                          fontSize: "10px",
                          lineHeight: 1.6,
                          marginTop: "5px",
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
            GOVERNANCE
            =============================================== */}

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
              Human-in-the-Loop Identity
              Governance
            </strong>

            <span>
              AI can detect, investigate,
              prioritize and recommend
              corrections, but AI approval is
              disabled. Officer and Manager
              authorization are required before
              controlled execution.
              The Master Reference remains
              {" "}
              {GOVERNANCE.masterReferenceAccess}.
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

            Traceable Case Lifecycle
          </div>
        </footer>

      </main>
    </div>
  );
}