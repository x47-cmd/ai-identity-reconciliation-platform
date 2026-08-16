"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { useLanguage } from "../../components/LanguageProvider";

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
   LANGUAGE HELPER
   ========================================================= */

function L(
  language,
  english,
  arabic
) {
  return language === "ar"
    ? arabic
    : english;
}


/* =========================================================
   STATUS LOCALIZATION
   ========================================================= */

function localizeStatus(
  value,
  language,
  t
) {
  const keys = {
    APPROVED:
      "statuses.APPROVED",

    COMPLETED:
      "statuses.COMPLETED",

    PASSED:
      "statuses.PASSED",

    PENDING:
      "statuses.PENDING",

    NOT_READY:
      "statuses.NOT_READY",

    NOT_STARTED:
      "statuses.NOT_STARTED",

    NOT_AUTHORIZED:
      "statuses.NOT_AUTHORIZED",

    VERIFIED_CLOSED:
      "statuses.VERIFIED_CLOSED",

    AI_INVESTIGATED:
      "statuses.AI_INVESTIGATED",
  };

  if (keys[value]) {
    return t(
      keys[value],
      value
    );
  }

  return L(
    language,
    value,
    value
  );
}


/* =========================================================
   CASE TYPE LOCALIZATION
   ========================================================= */

function localizeCaseType(
  value,
  t
) {
  return t(
    `caseTypes.${value}`,
    value
  );
}


/* =========================================================
   FINDING TYPE LOCALIZATION
   ========================================================= */

function localizeFindingType(
  value,
  language
) {
  const labels = {
    WRONG_MAPPING: {
      en:
        "Wrong Mapping",

      ar:
        "ربط خاطئ",
    },

    HARM_IMPACT: {
      en:
        "Harm Impact",

      ar:
        "تأثير ضرر",
    },

    DUPLICATE_BIOMETRIC: {
      en:
        "Duplicate Biometric",

      ar:
        "سجل بيومتري مكرر",
    },

    DATA_MISMATCH: {
      en:
        "Data Mismatch",

      ar:
        "اختلاف بيانات",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Identity",

      ar:
        "هوية مكررة",
    },

    IDENTITY_CORRELATION: {
      en:
        "Identity Correlation",

      ar:
        "مطابقة الهوية",
    },
  };

  return (
    labels[value]?.[
      language
    ] ||
    labels[value]?.en ||
    value
  );
}


/* =========================================================
   CASE TITLE LOCALIZATION
   ========================================================= */

function localizeCaseTitle(
  caseData,
  language
) {
  const labels = {
    [VERIFIED_DEMO_CASE.id]: {
      en:
        VERIFIED_DEMO_CASE.title,

      ar:
        "حالة تأثير وقائي على الشخص الخطأ",
    },

    [COMPLEX_DEMO_CASE.id]: {
      en:
        COMPLEX_DEMO_CASE.title,

      ar:
        "تعارض هوية معقد",
    },
  };

  return (
    labels[caseData.id]?.[
      language
    ] ||
    caseData.title
  );
}


/* =========================================================
   AI CONCLUSION
   ========================================================= */

function getAiConclusion(
  caseData,
  language
) {
  if (
    caseData.id ===
    VERIFIED_DEMO_CASE.id
  ) {
    return L(
      language,

      caseData.aiConclusion,

      "تشير الأدلة الاصطناعية المجمعة للبيانات البيومترية والهوية بقوة إلى أن السجل BIO-000166 مرتبط بالهوية REF-001009 وليس بالربط السابق REF-002711. وقد أدى تعارض الهوية إلى احتمال تأثير على الشخص الخطأ، ولذلك تم تصنيف الحالة بأولوية وقائية فورية."
    );
  }

  return L(
    language,

    caseData.aiConclusion,

    "تم تجميع عدة نتائج مترابطة خاصة بالسجلات البيومترية والهوية داخل حالة تحقيق معقدة واحدة. وحدد تحليل حسم الهوية على مستوى الحالة الهوية REF-002343 باعتبارها المرشح المرجعي الأقوى بدرجة ثقة 99.99%."
  );
}


/* =========================================================
   ROOT CAUSE
   ========================================================= */

function getRootCause(
  caseData,
  language
) {
  if (
    caseData.id ===
    VERIFIED_DEMO_CASE.id
  ) {
    return L(
      language,

      caseData.rootCause,

      "أدى تعارض في الربط بعد التسجيل إلى ربط السجل البيومتري بمرجع هوية غير صحيح، بينما ظل المرجع الرئيسي نفسه دون تعديل."
    );
  }

  return L(
    language,

    caseData.rootCause,

    "توجد علاقات متعارضة بين عدة سجلات بيومترية وهويات مرتبطة، مما يتطلب تجميع النتائج على مستوى الحالة قبل تحديد الهوية المرجعية الصحيحة."
  );
}


/* =========================================================
   CASE DATABASE

   Only two detail routes are supported in the static demo:
   - CASE-2026-00001
   - CASE-2026-00014
   ========================================================= */

const caseDatabase = {
  /* =======================================================
     VERIFIED E2E CASE
     ======================================================= */

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
      VERIFIED_DEMO_CASE.proposedIdentity,

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
        + "associated the biometric record with an incorrect identity "
        + "reference while the authoritative Master Reference remained unchanged."
      ),

    evidence: {
      resolutionConfidence:
        VERIFIED_DEMO_CASE.aiConfidence,

      postCorrectionMatchRaw:
        VERIFIED_DEMO_CASE.verification.biometricMatch,

      postCorrectionMatchPercent:
        VERIFIED_DEMO_CASE.verification.biometricMatchPercent,
    },

    dataComparison: [
      {
        field:
          "Previous Master Identity",

        fieldAr:
          "مرجع الهوية السابق",

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

        fieldAr:
          "ارتباط السجل البيومتري",

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

        fieldAr:
          "سمات الهوية",

        current:
          "Low consistency",

        currentAr:
          "اتساق منخفض",

        reference:
          "High consistency",

        referenceAr:
          "اتساق مرتفع",

        result:
          "MISMATCH",
      },

      {
        field:
          "Canonical Resolution",

        fieldAr:
          "الحسم المرجعي",

        current:
          "Previous mapping rejected",

        currentAr:
          "تم رفض الربط السابق",

        reference:
          `${VERIFIED_DEMO_CASE.aiConfidence}% confidence`,

        referenceAr:
          `ثقة ${VERIFIED_DEMO_CASE.aiConfidence}%`,

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
        VERIFIED_DEMO_CASE.officer.actor,

      decision:
        VERIFIED_DEMO_CASE.officer.decision,

      comments:
        "Monitoring Officer reviewed the investigation evidence and approved the proposed correction.",
    },

    manager: {
      status:
        "APPROVED",

      name:
        VERIFIED_DEMO_CASE.manager.actor,

      decision:
        VERIFIED_DEMO_CASE.manager.decision,

      comments:
        "Manager completed the second-level review and authorized controlled execution.",
    },

    verification: {
      status:
        VERIFIED_DEMO_CASE.verification.status,

      score:
        VERIFIED_DEMO_CASE.verification.score,

      biometricMatchRaw:
        VERIFIED_DEMO_CASE.verification.biometricMatch,

      biometricMatchPercent:
        VERIFIED_DEMO_CASE.verification.biometricMatchPercent,

      identityMappingValid:
        VERIFIED_DEMO_CASE.verification.identityMappingValid,

      conflictResolved:
        VERIFIED_DEMO_CASE.verification.originalConflictResolved,

      secondaryConflict:
        VERIFIED_DEMO_CASE.verification.secondaryConflict,

      rollbackRequired:
        VERIFIED_DEMO_CASE.verification.rollbackRequired,

      finalStatus:
        VERIFIED_DEMO_CASE.finalStatus,
    },

    audit: [
      {
        sequence:
          "01",

        actor:
          "Investigation Agent",

        actorAr:
          "وكيل التحقيق",

        action:
          "AI investigation completed",

        actionAr:
          "اكتمل تحقيق الذكاء الاصطناعي",

        detail:
          "Identity evidence, risk, harm and proposed correction were prepared for human review.",

        detailAr:
          "تم تجهيز أدلة الهوية والمخاطر والضرر والتصحيح المقترح للمراجعة البشرية.",
      },

      {
        sequence:
          "02",

        actor:
          "Monitoring Officer",

        actorAr:
          "ضابط المراقبة",

        action:
          "Officer approval recorded",

        actionAr:
          "تم تسجيل اعتماد الضابط",

        detail:
          "Level 1 human review approved the proposed identity correction.",

        detailAr:
          "اعتمد المستوى الأول من المراجعة البشرية تصحيح الهوية المقترح.",
      },

      {
        sequence:
          "03",

        actor:
          "Supervising Manager",

        actorAr:
          "المدير المشرف",

        action:
          "Manager approval recorded",

        actionAr:
          "تم تسجيل اعتماد المدير",

        detail:
          "Level 2 human review authorized controlled correction execution.",

        detailAr:
          "صرح المستوى الثاني من المراجعة البشرية بتنفيذ التصحيح الخاضع للتحكم.",
      },

      {
        sequence:
          "04",

        actor:
          "Execution Agent",

        actorAr:
          "وكيل التنفيذ",

        action:
          "Controlled correction completed",

        actionAr:
          "اكتمل التصحيح الخاضع للتحكم",

        detail:
          "BIO-000166 was reassigned from REF-002711 to REF-001009 in the permitted runtime target.",

        detailAr:
          "تمت إعادة ربط BIO-000166 من REF-002711 إلى REF-001009 داخل هدف التشغيل المسموح.",
      },

      {
        sequence:
          "05",

        actor:
          "Verification Agent",

        actorAr:
          "وكيل التحقق",

        action:
          "Post-correction verification passed",

        actionAr:
          "نجح التحقق بعد التصحيح",

        detail:
          "Verification score reached 100 and the case reached VERIFIED_CLOSED.",

        detailAr:
          "وصلت درجة التحقق إلى 100 وتم إغلاق الحالة بعد التحقق.",
      },
    ],
  },


  /* =======================================================
     COMPLEX CASE
     ======================================================= */

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
      COMPLEX_DEMO_CASE.finalStatus,

    biometricId:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    currentIdentity:
      COMPLEX_DEMO_CASE.currentIdentity,

    proposedIdentity:
      COMPLEX_DEMO_CASE.proposedIdentity,

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

      postCorrectionMatchRaw:
        null,

      postCorrectionMatchPercent:
        null,
    },

    dataComparison: [
      {
        field:
          "Current Master Link",

        fieldAr:
          "الربط المرجعي الحالي",

        current:
          COMPLEX_DEMO_CASE.currentIdentity,

        reference:
          COMPLEX_DEMO_CASE.canonicalIdentity,

        result:
          "CONFLICT",
      },

      {
        field:
          "Related Biometric",

        fieldAr:
          "السجل البيومتري المرتبط",

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

        fieldAr:
          "الحسم المرجعي",

        current:
          "Unresolved at raw finding level",

        currentAr:
          "غير محسوم على مستوى النتائج الأولية",

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
        COMPLEX_DEMO_CASE.currentIdentity,

      after:
        COMPLEX_DEMO_CASE.proposedIdentity,

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

      biometricMatchRaw:
        null,

      biometricMatchPercent:
        null,

      identityMappingValid:
        null,

      conflictResolved:
        null,

      secondaryConflict:
        null,

      rollbackRequired:
        false,

      finalStatus:
        COMPLEX_DEMO_CASE.finalStatus,
    },

    audit: [
      {
        sequence:
          "01",

        actor:
          "Reconciliation Agent",

        actorAr:
          "وكيل المطابقة",

        action:
          "Multiple related findings detected",

        actionAr:
          "تم اكتشاف نتائج مترابطة متعددة",

        detail:
          "Related biometric and identity inconsistencies were identified during reconciliation.",

        detailAr:
          "تم اكتشاف اختلافات مترابطة في السجلات البيومترية والهوية أثناء عملية المطابقة.",
      },

      {
        sequence:
          "02",

        actor:
          "Case Aggregation Engine",

        actorAr:
          "محرك تجميع الحالات",

        action:
          "Findings aggregated",

        actionAr:
          "تم تجميع النتائج",

        detail:
          "Five related findings were consolidated into one complex identity case.",

        detailAr:
          "تم دمج خمس نتائج مترابطة داخل حالة تعارض هوية معقدة واحدة.",
      },

      {
        sequence:
          "03",

        actor:
          "Identity Resolution Agent",

        actorAr:
          "وكيل حسم الهوية",

        action:
          "Canonical identity resolved",

        actionAr:
          "تم حسم الهوية المرجعية",

        detail:
          "REF-002343 was selected as the strongest case-level identity candidate.",

        detailAr:
          "تم اختيار REF-002343 كأقوى مرشح للهوية على مستوى الحالة.",
      },
    ],
  },
};


/* =========================================================
   PRIORITY BADGE
   ========================================================= */

function PriorityBadge({
  priority,
  t,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";

  return (
    <span className={className}>
      {t(
        `priorities.${priority}`,
        priority
      )}
    </span>
  );
}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({
  value,
  language,
  t,
}) {
  const success =
    [
      "APPROVED",
      "COMPLETED",
      "PASSED",
      "VERIFIED_CLOSED",
    ].includes(value);

  const warning =
    value === "PENDING";

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
        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        minHeight:
          "25px",

        padding:
          "0 10px",

        borderRadius:
          "7px",

        color,

        background,

        border:
          `1px solid ${border}`,

        fontSize:
          "10px",

        fontWeight:
          800,

        whiteSpace:
          "nowrap",
      }}
    >
      {localizeStatus(
        value,
        language,
        t
      )}
    </span>
  );
}


/* =========================================================
   RISK METRIC
   ========================================================= */

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
            "#71839a",

          fontSize:
            "10px",

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
            "#667991",

          fontSize:
            "10px",
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
  caseData,
  language
) {
  return [
    [
      L(
        language,
        "Detected",
        "تم الاكتشاف"
      ),
      true,
    ],

    [
      L(
        language,
        "Reconciled",
        "تمت المطابقة"
      ),
      true,
    ],

    [
      L(
        language,
        "AI Investigated",
        "تحقيق الذكاء الاصطناعي"
      ),
      true,
    ],

    [
      L(
        language,
        "Officer Review",
        "مراجعة الضابط"
      ),
      caseData.isVerifiedClosed,
    ],

    [
      L(
        language,
        "Manager Approval",
        "اعتماد المدير"
      ),
      caseData.isVerifiedClosed,
    ],

    [
      L(
        language,
        "Execution",
        "التنفيذ"
      ),
      caseData.isVerifiedClosed,
    ],

    [
      L(
        language,
        "Verification",
        "التحقق"
      ),
      caseData.isVerifiedClosed,
    ],

    [
      L(
        language,
        "Closed",
        "مغلقة"
      ),
      caseData.isVerifiedClosed,
    ],
  ];
}


/* =========================================================
   NOT FOUND
   ========================================================= */

function CaseNotFound({
  caseId,
  language,
  t,
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
          {language === "ar" ? (
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          ) : (
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />
          )}

          {t(
            "caseDetail.backToCases"
          )}
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
            aria-hidden="true"
          />

          <h1>
            {L(
              language,
              "Case not found",
              "الحالة غير موجودة"
            )}
          </h1>

          <p
            dir="ltr"
            style={{
              color:
                "#7b8da4",
            }}
          >
            {caseId || "UNKNOWN"}
          </p>
        </div>
      </main>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CaseInvestigationPage() {
  const params =
    useParams();

  const rawCaseId =
    params?.caseId;

  const caseId =
    Array.isArray(
      rawCaseId
    )
      ? rawCaseId[0]
      : rawCaseId;


  const {
    language,
    t,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const caseData =
    caseId
      ? caseDatabase[caseId]
      : null;


  if (!caseData) {
    return (
      <CaseNotFound
        caseId={caseId}
        language={language}
        t={t}
      />
    );
  }


  const lifecycle =
    getLifecycle(
      caseData,
      language
    );


  const navigationArrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  return (
    <div className="appShell">

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
            {isArabic ? (
              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            ) : (
              <ArrowLeft
                size={16}
                aria-hidden="true"
              />
            )}

            {t(
              "caseDetail.backToCases"
            )}
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
                <BrainCircuit
                  size={15}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "AI INVESTIGATION WORKSPACE",
                  "مساحة تحقيق الذكاء الاصطناعي"
                )}
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
                  dir="ltr"
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
                  t={t}
                />

                <StatusBadge
                  value={
                    caseData.status
                  }
                  language={
                    language
                  }
                  t={t}
                />
              </div>


              <p
                style={{
                  marginTop:
                    "7px",
                }}
              >
                {localizeCaseTitle(
                  caseData,
                  language
                )}

                {" · "}

                {localizeCaseType(
                  caseData.caseType,
                  t
                )}
              </p>
            </div>


            <div className="topbarActions">
              <button
                type="button"
                className="searchButton"
              >
                <Search
                  size={18}
                  aria-hidden="true"
                />

                <span>
                  {L(
                    language,
                    "Search Evidence",
                    "البحث في الأدلة"
                  )}
                </span>
              </button>

              <div className="profile">
                <div className="avatar">
                  MO
                </div>

                <div className="profileText">
                  <strong>
                    {t(
                      "common.monitoringOfficer"
                    )}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Case Review",
                      "مراجعة الحالة"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>


        {/* ===============================================
            WRONG-PERSON WARNING
            =============================================== */}

        {caseData.wronglyAffected && (
          <section className="alertBanner">
            <div className="alertIcon">
              <ShieldAlert
                size={24}
                aria-hidden="true"
              />
            </div>

            <div className="alertText">
              <strong>
                {L(
                  language,
                  "Critical Protective Case — Potential Wrong-Person Impact",
                  "حالة وقائية حرجة — تأثير محتمل على الشخص الخطأ"
                )}
              </strong>

              <span>
                {L(
                  language,
                  "This case was assigned immediate protective priority because an unrelated person could be affected by the incorrect identity relationship.",
                  "تم تصنيف هذه الحالة بأولوية وقائية فورية لأن شخصًا غير مرتبط بالحالة قد يتأثر نتيجة علاقة هوية غير صحيحة."
                )}
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
              {L(
                language,
                `PRIORITY ${caseData.protectivePriority}`,
                `الأولوية ${caseData.protectivePriority}`
              )}
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
              margin:
                "0 0 20px",

              padding:
                "17px",
            }}
          >
            <CheckCircle2
              size={24}
              aria-hidden="true"
            />

            <div>
              <strong>
                {L(
                  language,
                  "Correction Verified and Case Closed",
                  "تم التحقق من التصحيح وإغلاق الحالة"
                )}
              </strong>

              <span>
                {L(
                  language,
                  `The approved correction was executed successfully and passed post-correction verification with a score of ${caseData.verification.score}.`,
                  `تم تنفيذ التصحيح المعتمد بنجاح واجتاز التحقق بعد التصحيح بدرجة ${caseData.verification.score}.`
                )}
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
                <Fingerprint
                  size={20}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div
              className="metricValue"
              dir="ltr"
              style={{
                fontSize:
                  "18px",
              }}
            >
              {caseData.biometricId}
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Primary Biometric",
                "السجل البيومتري الرئيسي"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Source record under investigation",
                "السجل المصدر قيد التحقيق"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <BrainCircuit
                  size={20}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="metricValue">
              {caseData.confidence}%
            </div>

            <div className="metricTitle">
              {L(
                language,
                "AI Confidence",
                "ثقة الذكاء الاصطناعي"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Canonical identity resolution",
                "حسم الهوية المرجعية"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <ShieldAlert
                  size={20}
                  aria-hidden="true"
                />
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
              {t(
                "commandCenter.harmImpact"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Potential consequence score",
                "درجة التأثير المحتمل"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricTop">
              <div className="metricIcon">
                <FileSearch
                  size={20}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="metricValue">
              {caseData.findings}
            </div>

            <div className="metricTitle">
              {t(
                "caseDetail.supportingFindings"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Aggregated case evidence",
                "أدلة الحالة المجمعة"
              )}
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
              "16px",

            padding:
              "18px 20px",
          }}
        >
          <div className="panelEyebrow">
            {L(
              language,
              "CASE LIFECYCLE",
              "دورة حياة الحالة"
            )}
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
            {lifecycle.map(
              (
                [
                  label,
                  complete,
                ],
                index
              ) => (
                <div
                  key={`${label}-${index}`}
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
                          : "#74869d",

                      fontSize:
                        "10px",

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
                      <CheckCircle2
                        size={14}
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock3
                        size={14}
                        aria-hidden="true"
                      />
                    )}

                    {label}
                  </div>

                  {index <
                    lifecycle.length - 1 && (
                    <ChevronRight
                      size={14}
                      color="#52647b"
                      style={
                        navigationArrowStyle
                      }
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            )}
          </div>
        </section>


        {/* ===============================================
            AI INVESTIGATION + METADATA
            =============================================== */}

        <section className="dashboardGrid">

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "AI INVESTIGATION",
                    "تحقيق الذكاء الاصطناعي"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Investigation Conclusion",
                    "نتيجة التحقيق"
                  )}
                </h2>
              </div>

              <BrainCircuit
                size={23}
                aria-hidden="true"
              />
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
                    aria-hidden="true"
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
                      {L(
                        language,
                        "AI Conclusion",
                        "استنتاج الذكاء الاصطناعي"
                      )}
                    </strong>

                    <p
                      style={{
                        color:
                          "#8799b0",

                        fontSize:
                          "11px",

                        lineHeight:
                          1.75,

                        margin:
                          "8px 0 0",
                      }}
                    >
                      {getAiConclusion(
                        caseData,
                        language
                      )}
                    </p>
                  </div>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "19px",
                }}
              >
                <div className="panelEyebrow">
                  {L(
                    language,
                    "PROBABLE ROOT CAUSE",
                    "السبب الجذري المحتمل"
                  )}
                </div>

                <p
                  style={{
                    color:
                      "#96a6ba",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.75,

                    margin:
                      "10px 0 0",
                  }}
                >
                  {getRootCause(
                    caseData,
                    language
                  )}
                </p>
              </div>


              <div
                style={{
                  marginTop:
                    "20px",

                  display:
                    "flex",

                  gap:
                    "10px",

                  flexWrap:
                    "wrap",
                }}
              >
                <span className="confidence">
                  {L(
                    language,
                    "AI Confidence:",
                    "ثقة الذكاء الاصطناعي:"
                  )}

                  {" "}

                  {caseData.confidence}%
                </span>

                <span
                  style={{
                    color:
                      "#71839a",

                    fontSize:
                      "10px",
                  }}
                >
                  {L(
                    language,
                    "Investigation:",
                    "التحقيق:"
                  )}

                  {" "}

                  <span dir="ltr">
                    {caseData.investigationId}
                  </span>
                </span>
              </div>
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CASE INFORMATION",
                    "معلومات الحالة"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Investigation Metadata",
                    "بيانات التحقيق"
                  )}
                </h2>
              </div>

              <FileSearch
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "7px 19px 17px",
              }}
            >
              {[
                [
                  L(
                    language,
                    "Case ID",
                    "رقم الحالة"
                  ),
                  caseData.id,
                  true,
                ],

                [
                  L(
                    language,
                    "Investigation ID",
                    "رقم التحقيق"
                  ),
                  caseData.investigationId,
                  true,
                ],

                [
                  L(
                    language,
                    "Case Type",
                    "نوع الحالة"
                  ),
                  localizeCaseType(
                    caseData.caseType,
                    t
                  ),
                  false,
                ],

                [
                  L(
                    language,
                    "Detection Context",
                    "سياق الاكتشاف"
                  ),
                  L(
                    language,
                    caseData.detectedAt,
                    caseData.id ===
                    VERIFIED_DEMO_CASE.id
                      ? "عرض تجريبي اصطناعي متكامل"
                      : "تشغيل المطابقة الاصطناعية"
                  ),
                  false,
                ],

                [
                  L(
                    language,
                    "Source",
                    "المصدر"
                  ),
                  L(
                    language,
                    caseData.sourceSystem,
                    "النظام البيومتري"
                  ),
                  false,
                ],

                [
                  L(
                    language,
                    "Reference",
                    "المرجع"
                  ),
                  L(
                    language,
                    caseData.referenceSystem,
                    "نظام المرجع الرئيسي"
                  ),
                  false,
                ],
              ].map(
                ([
                  label,
                  value,
                  forceLtr,
                ]) => (
                  <div
                    className="detailRow"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <strong
                      dir={
                        forceLtr
                          ? "ltr"
                          : undefined
                      }
                    >
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
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {t(
                  "caseDetail.identityResolution"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Previous / Current Mapping vs Canonical Identity",
                  "الربط السابق / الحالي مقابل الهوية المرجعية"
                )}
              </h2>
            </div>

            <GitCompareArrows
              size={23}
              aria-hidden="true"
            />
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
                    "#d27a85",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",
                }}
              >
                {caseData.isVerifiedClosed
                  ? L(
                      language,
                      "PREVIOUS MAPPING",
                      "الربط السابق"
                    )
                  : L(
                      language,
                      "CURRENT MAPPING",
                      "الربط الحالي"
                    )}
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
                  <Users
                    size={21}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#976c74",

                      fontSize:
                        "10px",
                    }}
                  >
                    {L(
                      language,
                      "Linked Identity Reference",
                      "مرجع الهوية المرتبط"
                    )}
                  </span>

                  <strong
                    dir="ltr"
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
                    "#ab737b",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,
                  "AI reconciliation identified this relationship as inconsistent with the stronger case-level identity evidence.",
                  "حددت عملية المطابقة بالذكاء الاصطناعي أن هذه العلاقة غير متوافقة مع أدلة الهوية الأقوى على مستوى الحالة."
                )}
              </div>
            </div>


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
                {isArabic ? (
                  <ArrowLeft
                    size={19}
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight
                    size={19}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>


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
                    "10px",

                  fontWeight:
                    800,

                  letterSpacing:
                    "1px",
                }}
              >
                {caseData.isVerifiedClosed
                  ? L(
                      language,
                      "VERIFIED CANONICAL IDENTITY",
                      "الهوية المرجعية المتحقق منها"
                    )
                  : L(
                      language,
                      "AI CANONICAL RESOLUTION",
                      "الحسم المرجعي بالذكاء الاصطناعي"
                    )}
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
                  <UserCheck
                    size={21}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#679585",

                      fontSize:
                        "10px",
                    }}
                  >
                    {t(
                      "common.canonicalIdentity"
                    )}
                  </span>

                  <strong
                    dir="ltr"
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

                  gap:
                    "12px",
                }}
              >
                <span
                  style={{
                    color:
                      "#719a8b",

                    fontSize:
                      "10px",
                  }}
                >
                  {L(
                    language,
                    "AI Identity Confidence",
                    "ثقة الذكاء الاصطناعي بالهوية"
                  )}
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
            SYNTHETIC CORRELATION + RISK
            =============================================== */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "16px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {t(
                    "caseDetail.syntheticCorrelation"
                  )}
                </div>

                <h2>
                  {t(
                    "caseDetail.identityResolutionEvidence"
                  )}
                </h2>
              </div>

              <Fingerprint
                size={23}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "18px 20px 20px",
              }}
            >
              <div
                style={{
                  padding:
                    "14px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(70,140,255,0.045)",

                  border:
                    "1px solid rgba(70,140,255,0.08)",

                  color:
                    "#8194ad",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.65,
                }}
              >
                {t(
                  "caseDetail.syntheticEvidenceNotice"
                )}
              </div>


              <div
                style={{
                  marginTop:
                    "15px",
                }}
              >
                <div className="detailRow">
                  <span>
                    {t(
                      "caseDetail.canonicalIdentityConfidence"
                    )}
                  </span>

                  <strong className="confidence">
                    {
                      caseData.evidence.resolutionConfidence
                    }
                    %
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "caseDetail.supportingFindings"
                    )}
                  </span>

                  <strong>
                    {caseData.findings}
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "caseDetail.canonicalCandidate"
                    )}
                  </span>

                  <strong
                    className="successText"
                    dir="ltr"
                  >
                    {caseData.proposedIdentity}
                  </strong>
                </div>

                <div className="detailRow">
                  <span>
                    {t(
                      "caseDetail.evidenceSource"
                    )}
                  </span>

                  <strong>
                    {t(
                      "caseDetail.syntheticVectorEvidence"
                    )}
                  </strong>
                </div>
              </div>


              <div
                style={{
                  marginTop:
                    "15px",

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

                  gap:
                    "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#7185a0",

                      fontSize:
                        "10px",

                      fontWeight:
                        750,
                    }}
                  >
                    {t(
                      "caseDetail.canonicalIdentityConfidence"
                    )}
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
                    {
                      caseData.evidence.resolutionConfidence
                    }
                    %
                  </strong>
                </div>

                <BrainCircuit
                  size={28}
                  color="#639fff"
                  aria-hidden="true"
                />
              </div>


              {caseData.isVerifiedClosed && (
                <div
                  className="integrityInfo"
                  style={{
                    margin:
                      "14px 0 0",
                  }}
                >
                  <ShieldCheck
                    size={21}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>
                      {t(
                        "caseDetail.postCorrectionBiometricMatch"
                      )}
                    </strong>

                    <span>
                      {L(
                        language,

                        `Verified biometric match score: ${caseData.evidence.postCorrectionMatchRaw} (${caseData.evidence.postCorrectionMatchPercent}%). This value comes from the completed post-correction verification stage.`,

                        `درجة مطابقة السجل البيومتري المتحقق منها: ${caseData.evidence.postCorrectionMatchRaw} (${caseData.evidence.postCorrectionMatchPercent}%). هذه القيمة ناتجة عن مرحلة التحقق المكتملة بعد التصحيح.`
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "PROTECTIVE RISK MODEL",
                    "نموذج المخاطر الوقائية"
                  )}
                </div>

                <h2>
                  {t(
                    "caseDetail.riskHarmAnalysis"
                  )}
                </h2>
              </div>

              <ShieldAlert
                size={23}
                aria-hidden="true"
              />
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
                label={
                  L(
                    language,
                    "Risk Score",
                    "درجة المخاطر"
                  )
                }
                value={
                  caseData.risk
                }
                type="danger"
              />

              <RiskMetric
                label={
                  t(
                    "commandCenter.harmImpact"
                  )
                }
                value={
                  caseData.harm
                }
                type="danger"
              />

              <RiskMetric
                label={
                  t(
                    "common.protectivePriority"
                  )
                }
                value={
                  caseData.protectivePriority
                }
                type="danger"
              />


              <div className="integrityInfo">
                <ShieldAlert
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {t(
                      "caseDetail.wronglyAffectedPerson"
                    )}
                    {": "}

                    {caseData.wronglyAffected
                      ? t("common.yes")
                      : t("common.no")}
                  </strong>

                  <span>
                    {L(
                      language,
                      "Protective Priority can override normal technical severity when another person may be harmed.",
                      "يمكن للأولوية الوقائية تجاوز شدة المشكلة التقنية المعتادة عندما يكون هناك احتمال لضرر شخص آخر."
                    )}
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
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "CROSS-SYSTEM RECONCILIATION",
                  "المطابقة بين الأنظمة"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Registration Data Comparison",
                  "مقارنة بيانات التسجيل"
                )}
              </h2>
            </div>

            <Database
              size={22}
              aria-hidden="true"
            />
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "FIELD",
                      "الحقل"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "BIOMETRIC SYSTEM",
                      "النظام البيومتري"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "MASTER REFERENCE",
                      "المرجع الرئيسي"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "RESULT",
                      "النتيجة"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {caseData.dataComparison.map(
                  (row) => (
                    <tr
                      key={row.field}
                    >
                      <td>
                        <strong
                          style={{
                            color:
                              "#cbd7e7",
                          }}
                        >
                          {isArabic
                            ? row.fieldAr
                            : row.field}
                        </strong>
                      </td>

                      <td
                        className="mono"
                        dir={
                          isArabic &&
                          row.currentAr
                            ? undefined
                            : "ltr"
                        }
                      >
                        {isArabic &&
                        row.currentAr
                          ? row.currentAr
                          : row.current}
                      </td>

                      <td
                        className="mono"
                        dir={
                          isArabic &&
                          row.referenceAr
                            ? undefined
                            : "ltr"
                        }
                      >
                        {isArabic &&
                        row.referenceAr
                          ? row.referenceAr
                          : row.reference}
                      </td>

                      <td>
                        <span
                          className={
                            row.result ===
                            "MATCH"
                              ? "priority medium"
                              : row.result ===
                                  "RELATED"
                                ? "priority high"
                                : "priority immediate"
                          }
                          style={
                            row.result ===
                            "MATCH"
                              ? {
                                  color:
                                    "#56ca9d",

                                  background:
                                    "rgba(52,211,153,0.07)",

                                  border:
                                    "1px solid rgba(52,211,153,0.13)",
                                }
                              : undefined
                          }
                        >
                          {row.result ===
                          "MATCH"
                            ? L(
                                language,
                                "MATCH",
                                "متطابق"
                              )
                            : row.result ===
                                "RELATED"
                              ? L(
                                  language,
                                  "RELATED",
                                  "مرتبط"
                                )
                              : row.result ===
                                  "MISMATCH"
                                ? L(
                                    language,
                                    "MISMATCH",
                                    "غير متطابق"
                                  )
                                : L(
                                    language,
                                    "CONFLICT",
                                    "تعارض"
                                  )}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* ===============================================
            SUPPORTING FINDINGS
            =============================================== */}

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
                {t(
                  "caseDetail.syntheticSupportingEvidence"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Findings Supporting This Case",
                  "النتائج الداعمة لهذه الحالة"
                )}
              </h2>
            </div>

            <BrainCircuit
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              padding:
                "12px 18px",

              color:
                "#71839a",

              fontSize:
                "10px",

              lineHeight:
                1.6,

              borderBottom:
                "1px solid rgba(255,255,255,0.045)",
            }}
          >
            {t(
              "caseDetail.representativeEvidenceNotice"
            )}
          </div>


          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>
                    {L(
                      language,
                      "FINDING ID",
                      "رقم النتيجة"
                    )}
                  </th>

                  <th>
                    {t(
                      "common.type"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "ROLE",
                      "الدور"
                    )}
                  </th>

                  <th>
                    {L(
                      language,
                      "AI CONFIDENCE",
                      "ثقة الذكاء الاصطناعي"
                    )}
                  </th>
                </tr>
              </thead>


              <tbody>
                {caseData.findingsList.map(
                  (finding) => (
                    <tr
                      key={
                        finding.id
                      }
                    >
                      <td
                        className="mono"
                        dir="ltr"
                      >
                        {finding.id}
                      </td>

                      <td>
                        {localizeFindingType(
                          finding.type,
                          language
                        )}
                      </td>

                      <td>
                        <span
                          className={
                            finding.role ===
                            "PRIMARY"
                              ? "priority high"
                              : "priority medium"
                          }
                        >
                          {finding.role ===
                          "PRIMARY"
                            ? L(
                                language,
                                "PRIMARY",
                                "رئيسي"
                              )
                            : L(
                                language,
                                "CORROBORATING",
                                "داعم"
                              )}
                        </span>
                      </td>

                      <td>
                        <span className="confidence">
                          {
                            finding.confidence
                          }
                          %
                        </span>
                      </td>
                    </tr>
                  )
                )}
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
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "AI REMEDIATION AGENT",
                  "وكيل المعالجة بالذكاء الاصطناعي"
                )}
              </div>

              <h2>
                {caseData.isVerifiedClosed
                  ? L(
                      language,
                      "Executed Correction",
                      "التصحيح المنفذ"
                    )
                  : L(
                      language,
                      "Proposed Correction",
                      "التصحيح المقترح"
                    )}
              </h2>
            </div>

            <GitCompareArrows
              size={22}
              aria-hidden="true"
            />
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
                      "#cd7580",

                    fontSize:
                      "10px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  {L(
                    language,
                    "BEFORE",
                    "قبل"
                  )}
                </div>

                <div
                  dir="ltr"
                  style={{
                    marginTop:
                      "15px",

                    color:
                      "#71839a",

                    fontSize:
                      "10px",
                  }}
                >
                  {
                    caseData.correction.targetRecord
                  }
                </div>

                <strong
                  dir="ltr"
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
                    caseData.correction.before
                  }
                </strong>

                <div
                  dir="ltr"
                  style={{
                    color:
                      "#916a71",

                    fontSize:
                      "10px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    caseData.correction.field
                  }
                </div>
              </div>


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
                      "#5fc79d",

                    fontSize:
                      "10px",

                    fontWeight:
                      800,

                    letterSpacing:
                      "1px",
                  }}
                >
                  {caseData.isVerifiedClosed
                    ? L(
                        language,
                        "VERIFIED AFTER",
                        "بعد التحقق"
                      )
                    : L(
                        language,
                        "AI PROPOSED AFTER",
                        "بعد التصحيح المقترح"
                      )}
                </div>

                <div
                  dir="ltr"
                  style={{
                    marginTop:
                      "15px",

                    color:
                      "#71839a",

                    fontSize:
                      "10px",
                  }}
                >
                  {
                    caseData.correction.targetRecord
                  }
                </div>

                <strong
                  dir="ltr"
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
                    caseData.correction.after
                  }
                </strong>

                <div
                  dir="ltr"
                  style={{
                    color:
                      "#668c7e",

                    fontSize:
                      "10px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    caseData.correction.field
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
                  L(
                    language,
                    "Action",
                    "الإجراء"
                  ),
                  caseData.correction.action,
                ],

                [
                  L(
                    language,
                    "Target System",
                    "النظام المستهدف"
                  ),
                  caseData.correction.targetSystem,
                ],

                [
                  L(
                    language,
                    "Execution",
                    "التنفيذ"
                  ),
                  localizeStatus(
                    caseData.correction.execution,
                    language,
                    t
                  ),
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

                        color:
                          "#c2cfdf",

                        fontSize:
                          "10px",
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
              {caseData.isVerifiedClosed ? (
                <ShieldCheck
                  size={21}
                  aria-hidden="true"
                />
              ) : (
                <LockKeyhole
                  size={21}
                  aria-hidden="true"
                />
              )}

              <div>
                <strong>
                  {caseData.isVerifiedClosed
                    ? L(
                        language,
                        "Controlled Correction Completed",
                        "اكتمل التصحيح الخاضع للتحكم"
                      )
                    : L(
                        language,
                        "Execution Locked",
                        "التنفيذ مقفل"
                      )}
                </strong>

                <span>
                  {caseData.isVerifiedClosed
                    ? L(
                        language,
                        "The correction was executed only after both required human approvals and subsequently passed verification.",
                        "تم تنفيذ التصحيح فقط بعد الحصول على الاعتمادين البشريين المطلوبين، ثم اجتاز مرحلة التحقق."
                      )
                    : L(
                        language,
                        "The AI can recommend and prepare this correction but cannot execute it until both Monitoring Officer and Manager approvals are complete.",
                        "يمكن للذكاء الاصطناعي اقتراح هذا التصحيح وتجهيزه، لكنه لا يستطيع تنفيذه قبل اكتمال اعتماد ضابط المراقبة والمدير."
                      )}
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ===============================================
            HUMAN APPROVALS
            =============================================== */}

        <section
          className="lowerGrid"
          style={{
            gridTemplateColumns:
              "1fr 1fr",

            marginTop:
              "16px",
          }}
        >

          {/* OFFICER */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "HUMAN REVIEW · LEVEL 1",
                    "المراجعة البشرية · المستوى الأول"
                  )}
                </div>

                <h2>
                  {t(
                    "common.monitoringOfficer"
                  )}
                </h2>
              </div>

              <UserCheck
                size={22}
                aria-hidden="true"
              />
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
                        "#71839a",

                      fontSize:
                        "10px",
                    }}
                  >
                    {L(
                      language,
                      "REVIEW STATUS",
                      "حالة المراجعة"
                    )}
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        caseData.officer.status ===
                        "APPROVED"
                          ? "#59cfa0"
                          : "#ffbd67",

                      fontSize:
                        "11px",
                    }}
                  >
                    {localizeStatus(
                      caseData.officer.status,
                      language,
                      t
                    )}
                  </strong>
                </div>

                {caseData.officer.status ===
                "APPROVED" ? (
                  <CheckCircle2
                    size={21}
                    color="#59cfa0"
                    aria-hidden="true"
                  />
                ) : (
                  <Clock3
                    size={21}
                    color="#ffbd67"
                    aria-hidden="true"
                  />
                )}
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Officer",
                    "الضابط"
                  )}
                </span>

                <strong>
                  {isArabic
                    ? (
                        caseData.isVerifiedClosed
                          ? "ضابط المراقبة التجريبي"
                          : "غير معين"
                      )
                    : caseData.officer.name}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Decision",
                    "القرار"
                  )}
                </span>

                <strong>
                  {localizeStatus(
                    caseData.officer.decision,
                    language,
                    t
                  )}
                </strong>
              </div>


              <p
                style={{
                  color:
                    "#788ba2",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.65,
                }}
              >
                {caseData.isVerifiedClosed
                  ? L(
                      language,
                      caseData.officer.comments,
                      "راجع ضابط المراقبة أدلة التحقيق واعتمد التصحيح المقترح."
                    )
                  : L(
                      language,
                      caseData.officer.comments,
                      "بانتظار مراجعة ضابط المراقبة."
                    )}
              </p>


              {!caseData.isVerifiedClosed && (
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
                  <Link
                    href="/officer-review"
                    className="primaryButton"
                    style={{
                      textDecoration:
                        "none",

                      justifyContent:
                        "center",
                    }}
                  >
                    <UserCheck
                      size={17}
                      aria-hidden="true"
                    />

                    {L(
                      language,
                      "Open Officer Review",
                      "فتح مراجعة الضابط"
                    )}
                  </Link>

                  <button
                    type="button"
                    className="searchButton"
                    disabled
                    style={{
                      justifyContent:
                        "center",

                      height:
                        "42px",

                      borderColor:
                        "rgba(255,185,90,0.15)",

                      color:
                        "#e0ad5f",

                      opacity:
                        0.62,

                      cursor:
                        "not-allowed",
                    }}
                  >
                    {L(
                      language,
                      "More Investigation",
                      "مزيد من التحقيق"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* MANAGER */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "HUMAN REVIEW · LEVEL 2",
                    "المراجعة البشرية · المستوى الثاني"
                  )}
                </div>

                <h2>
                  {t(
                    "common.managerApproval"
                  )}
                </h2>
              </div>

              <BadgeCheck
                size={22}
                aria-hidden="true"
              />
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
                        "#71839a",

                      fontSize:
                        "10px",
                    }}
                  >
                    {L(
                      language,
                      "APPROVAL STATUS",
                      "حالة الاعتماد"
                    )}
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "4px",

                      color:
                        caseData.manager.status ===
                        "APPROVED"
                          ? "#59cfa0"
                          : "#8495aa",

                      fontSize:
                        "11px",
                    }}
                  >
                    {localizeStatus(
                      caseData.manager.status,
                      language,
                      t
                    )}
                  </strong>
                </div>

                {caseData.manager.status ===
                "APPROVED" ? (
                  <CheckCircle2
                    size={21}
                    color="#59cfa0"
                    aria-hidden="true"
                  />
                ) : (
                  <LockKeyhole
                    size={21}
                    color="#74869d"
                    aria-hidden="true"
                  />
                )}
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Manager",
                    "المدير"
                  )}
                </span>

                <strong>
                  {isArabic
                    ? (
                        caseData.isVerifiedClosed
                          ? "المدير المشرف التجريبي"
                          : "غير معين"
                      )
                    : caseData.manager.name}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Decision",
                    "القرار"
                  )}
                </span>

                <strong>
                  {localizeStatus(
                    caseData.manager.decision,
                    language,
                    t
                  )}
                </strong>
              </div>


              <p
                style={{
                  color:
                    "#788ba2",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.65,
                }}
              >
                {caseData.isVerifiedClosed
                  ? L(
                      language,
                      caseData.manager.comments,
                      "أكمل المدير المراجعة من المستوى الثاني وصرح بالتنفيذ الخاضع للتحكم."
                    )
                  : L(
                      language,
                      caseData.manager.comments,
                      "تتاح مراجعة المدير فقط بعد اعتماد ضابط المراقبة."
                    )}
              </p>


              {!caseData.isVerifiedClosed && (
                <button
                  type="button"
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
                      0.62,
                  }}
                >
                  <LockKeyhole
                    size={16}
                    aria-hidden="true"
                  />

                  {L(
                    language,
                    "Waiting for Officer Approval",
                    "بانتظار اعتماد الضابط"
                  )}
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
            marginTop:
              "16px",
          }}
        >
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "CONTROLLED CORRECTION LIFECYCLE",
                  "دورة التصحيح الخاضع للتحكم"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Execution & Post-Correction Verification",
                  "التنفيذ والتحقق بعد التصحيح"
                )}
              </h2>
            </div>

            <ShieldCheck
              size={22}
              aria-hidden="true"
            />
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
            {[
              {
                label:
                  L(
                    language,
                    "Execution",
                    "التنفيذ"
                  ),

                value:
                  caseData.correction.execution,

                icon:
                  LockKeyhole,
              },

              {
                label:
                  L(
                    language,
                    "Verification",
                    "التحقق"
                  ),

                value:
                  caseData.verification.status,

                icon:
                  Activity,
              },

              {
                label:
                  L(
                    language,
                    "Case Closure",
                    "إغلاق الحالة"
                  ),

                value:
                  caseData.verification.finalStatus,

                icon:
                  FileCheck2,
              },
            ].map(
              (item) => {
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
                      padding:
                        "17px",

                      borderRadius:
                        "12px",

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
                      aria-hidden="true"
                    />

                    <strong
                      style={{
                        display:
                          "block",

                        marginTop:
                          "12px",

                        fontSize:
                          "11px",
                      }}
                    >
                      {item.label}
                    </strong>

                    <span
                      style={{
                        display:
                          "block",

                        color:
                          complete
                            ? "#59cfa0"
                            : "#71839a",

                        marginTop:
                          "5px",

                        fontSize:
                          "10px",
                      }}
                    >
                      {localizeStatus(
                        item.value,
                        language,
                        t
                      )}
                    </span>
                  </div>
                );
              }
            )}
          </div>


          {caseData.isVerifiedClosed && (
            <div
              style={{
                padding:
                  "0 22px 22px",
              }}
            >
              <div
                className="integrityInfo"
                style={{
                  margin:
                    0,
                }}
              >
                <ShieldCheck
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {t(
                      "caseDetail.verificationScore"
                    )}
                    {": "}
                    {
                      caseData.verification.score
                    }
                  </strong>

                  <span>
                    {L(
                      language,

                      `Biometric Match Score: ${caseData.verification.biometricMatchRaw} (${caseData.verification.biometricMatchPercent}%) · Identity Mapping Valid: ${caseData.verification.identityMappingValid ? "TRUE" : "FALSE"} · Conflict Resolved: ${caseData.verification.conflictResolved ? "TRUE" : "FALSE"} · Secondary Conflict: ${caseData.verification.secondaryConflict ? "TRUE" : "FALSE"}`,

                      `درجة المطابقة البيومترية: ${caseData.verification.biometricMatchRaw} (${caseData.verification.biometricMatchPercent}%) · ربط الهوية صحيح: ${caseData.verification.identityMappingValid ? "نعم" : "لا"} · تم حل التعارض: ${caseData.verification.conflictResolved ? "نعم" : "لا"} · تعارض ثانوي: ${caseData.verification.secondaryConflict ? "نعم" : "لا"}`
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>


        {/* ===============================================
            AUDIT TRAIL
            =============================================== */}

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
                {L(
                  language,
                  "TRACEABLE CASE HISTORY",
                  "سجل الحالة القابل للتتبع"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Audit Sequence",
                  "تسلسل التدقيق"
                )}
              </h2>
            </div>

            <Activity
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              padding:
                "8px 21px 20px",
            }}
          >
            {caseData.audit.map(
              (
                event,
                index
              ) => (
                <div
                  key={
                    `${event.sequence}-${event.action}`
                  }
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "70px 24px 1fr",

                    gap:
                      "10px",

                    padding:
                      "15px 0",

                    borderBottom:
                      index <
                      caseData.audit.length - 1
                        ? "1px solid rgba(255,255,255,0.045)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#687b93",

                      fontSize:
                        "10px",

                      paddingTop:
                        "3px",
                    }}
                  >
                    {L(
                      language,
                      `STEP ${event.sequence}`,
                      `الخطوة ${event.sequence}`
                    )}
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
                    <Check
                      size={12}
                      aria-hidden="true"
                    />
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
                            "11px",

                          color:
                            "#cbd8e7",
                        }}
                      >
                        {isArabic
                          ? event.actionAr
                          : event.action}
                      </strong>

                      <span
                        style={{
                          color:
                            "#6390cd",

                          fontSize:
                            "10px",
                        }}
                      >
                        {isArabic
                          ? event.actorAr
                          : event.actor}
                      </span>
                    </div>

                    <div
                      style={{
                        color:
                          "#74869d",

                        fontSize:
                          "10px",

                        lineHeight:
                          1.6,

                        marginTop:
                          "5px",
                      }}
                    >
                      {isArabic
                        ? event.detailAr
                        : event.detail}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>


        {/* ===============================================
            GOVERNANCE
            =============================================== */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "16px 0 0",

            padding:
              "17px",
          }}
        >
          <ShieldCheck
            size={24}
            aria-hidden="true"
          />

          <div>
            <strong>
              {L(
                language,
                "Human-in-the-Loop Identity Governance",
                "حوكمة الهوية مع إشراف بشري"
              )}
            </strong>

            <span>
              {L(
                language,

                `AI can detect, investigate, prioritize and recommend corrections, but AI approval is disabled. Monitoring Officer and Supervising Manager authorization are required before controlled execution. The Master Reference remains ${GOVERNANCE.masterReferenceAccess}.`,

                "يمكن للذكاء الاصطناعي اكتشاف الحالات والتحقيق فيها وتحديد الأولويات واقتراح التصحيحات، لكن اعتماد الذكاء الاصطناعي غير مسموح. يلزم تصريح ضابط المراقبة والمدير المشرف قبل التنفيذ الخاضع للتحكم. ويظل المرجع الرئيسي للقراءة فقط."
              )}
            </span>
          </div>
        </section>


        {/* ===============================================
            FOOTER
            =============================================== */}

        <footer className="footer">
          <span>
            {t(
              "footer.platform"
            )}

            {" · "}

            {t(
              "footer.demo"
            )}
          </span>

          <div>
            <Clock3
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Traceable Case Lifecycle",
              "دورة حالة قابلة للتتبع"
            )}
          </div>
        </footer>

      </main>
    </div>
  );
}