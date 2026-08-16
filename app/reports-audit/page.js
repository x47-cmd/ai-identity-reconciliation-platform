"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  GOVERNANCE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  History,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";


/* =========================================================
   LANGUAGE
   ========================================================= */

const copy = {
  en: {
    eyebrow:
      "GOVERNANCE · TRACEABILITY · REPORTING",

    title:
      "Reports & Audit Trail",

    subtitle:
      "Traceable reporting of AI findings, human decisions, controlled corrections, verification outcomes and executive identity-integrity metrics.",

    search:
      "Search audit history",

    auditGovernance:
      "Audit & Governance",

    reportingCenter:
      "Reporting Center",

    traceabilityTitle:
      "Traceable Case Lifecycle Active",

    traceabilityMessage:
      "The selected demonstration case can be reconstructed across AI investigation, human approvals, controlled execution, post-correction verification and final closure.",

    traceable:
      "TRACEABLE",

    auditEvents:
      "Audit Events",

    auditEventsDescription:
      "Recorded E2E lifecycle events",

    humanDecisions:
      "Human Decisions",

    humanDecisionsDescription:
      "Officer and Manager approvals",

    controlledStages:
      "Controlled Processing Stages",

    controlledStagesDescription:
      "Investigation, execution and verification",

    verifiedClosed:
      "Verified Closed",

    verifiedClosedDescription:
      "Completed E2E demonstration case",

    selectedAuditCase:
      "SELECTED AUDIT CASE",

    caseType:
      "Case Type",

    priority:
      "Priority",

    aiConfidence:
      "AI Confidence",

    protectivePriority:
      "Protective Priority",

    before:
      "BEFORE",

    verifiedAfter:
      "VERIFIED AFTER",

    officerApproval:
      "Officer Approval",

    managerApproval:
      "Manager Approval",

    verification:
      "Verification",

    score:
      "Score",

    masterModified:
      "Master Modified",

    masterProtectedValue:
      "FALSE · READ ONLY",

    originalBiometricModified:
      "Original Biometric Dataset Modified",

    originalProtectedValue:
      "FALSE · SOURCE PRESERVED",

    traceableCaseHistory:
      "TRACEABLE CASE HISTORY",

    endToEndAuditSequence:
      "End-to-End Audit Sequence",

    step:
      "STEP",

    demoAuditRegister:
      "DEMO AUDIT REGISTER",

    recordedLifecycleSequence:
      "Recorded Lifecycle Sequence",

    sequence:
      "SEQUENCE",

    case:
      "CASE",

    actor:
      "ACTOR",

    actorType:
      "ACTOR TYPE",

    action:
      "ACTION",

    status:
      "STATUS",

    formalReporting:
      "FORMAL REPORTING",

    reportCenter:
      "Report Center",

    caseReportContent:
      "CASE REPORT CONTENT",

    formalEvidencePackage:
      "Formal Evidence Package",

    reportGovernance:
      "REPORT GOVERNANCE",

    traceabilityControls:
      "Traceability Controls",

    humanAttribution:
      "Human Attribution",

    humanAttributionText:
      "Officer and Manager decisions remain attributable to their respective human review stages.",

    aiAttribution:
      "AI Attribution",

    aiAttributionText:
      "AI findings, recommendations and lifecycle actions identify the responsible processing component.",

    chronologicalTraceability:
      "Chronological Traceability",

    chronologicalTraceabilityText:
      "The selected case lifecycle can be reconstructed from AI investigation through verified closure.",

    masterReferenceProtection:
      "Master Reference Protection",

    masterReferenceProtectionText:
      "The selected demonstration confirms that the Master Reference remained unchanged during controlled correction.",

    auditStorageBoundary:
      "Audit Storage Boundary",

    auditStorageBoundaryText:
      "This demonstration provides traceable lifecycle records. Immutable or tamper-evident audit storage is not represented as implemented.",

    managementReporting:
      "MANAGEMENT REPORTING",

    executiveReportingCoverage:
      "Executive Reporting Coverage",

    caseVolume:
      "Case Volume",

    protectiveCases:
      "Protective Cases",

    demoVerification:
      "Demo Verification",

    unresolvedIdentity:
      "Unresolved Identity",

    structuredModel:
      "STRUCTURED REPORTING MODEL",

    machineReadableCoverage:
      "Machine-Readable Data Coverage",

    futureExport:
      "FUTURE EXPORT",

    formalPdfReporting:
      "Formal PDF Reporting",

    reportModelReady:
      "Reporting Data Model Ready",

    reportModelReadyText:
      "Case, AI, approval, correction and verification information required for future reporting is represented in the demonstration data model.",

    pdfGeneratorPlanned:
      "PDF Generator Planned",

    pdfMessage:
      "A formal downloadable PDF report generator has not yet been implemented in this frontend demonstration.",

    formatCoverageNotice:
      "These formats describe structured reporting coverage and do not represent downloadable exports currently exposed by this frontend.",

    finalAuditTitle:
      "Traceable End-to-End Case Lifecycle",

    finalAuditMessage:
      "The verified demonstration case shows a traceable lifecycle from AI investigation through Officer and Manager approvals, controlled correction, post-correction verification and VERIFIED_CLOSED status.",

    footer:
      "AI Identity Reconciliation Platform · Reports & Audit Trail Center",

    auditMonitoringActive:
      "Traceability Monitoring Active",

    planned:
      "PLANNED",
  },


  ar: {
    eyebrow:
      "الحوكمة · التتبع · التقارير",

    title:
      "التقارير وسجل التدقيق",

    subtitle:
      "تقارير قابلة للتتبع لنتائج الذكاء الاصطناعي والقرارات البشرية والتصحيحات الخاضعة للتحكم ونتائج التحقق ومؤشرات سلامة الهوية التنفيذية.",

    search:
      "البحث في سجل التدقيق",

    auditGovernance:
      "التدقيق والحوكمة",

    reportingCenter:
      "مركز التقارير",

    traceabilityTitle:
      "دورة حياة الحالة قابلة للتتبع",

    traceabilityMessage:
      "يمكن إعادة بناء الحالة التجريبية المحددة عبر تحقيق الذكاء الاصطناعي والاعتمادات البشرية والتنفيذ الخاضع للتحكم والتحقق بعد التصحيح والإغلاق النهائي.",

    traceable:
      "قابل للتتبع",

    auditEvents:
      "أحداث التدقيق",

    auditEventsDescription:
      "أحداث دورة الحياة المتكاملة المسجلة",

    humanDecisions:
      "القرارات البشرية",

    humanDecisionsDescription:
      "اعتمادات الضابط والمدير",

    controlledStages:
      "مراحل المعالجة الخاضعة للتحكم",

    controlledStagesDescription:
      "التحقيق والتنفيذ والتحقق",

    verifiedClosed:
      "تم التحقق والإغلاق",

    verifiedClosedDescription:
      "حالة تجريبية متكاملة مكتملة",

    selectedAuditCase:
      "حالة التدقيق المحددة",

    caseType:
      "نوع الحالة",

    priority:
      "الأولوية",

    aiConfidence:
      "ثقة الذكاء الاصطناعي",

    protectivePriority:
      "الأولوية الوقائية",

    before:
      "قبل",

    verifiedAfter:
      "بعد التحقق",

    officerApproval:
      "اعتماد ضابط المراقبة",

    managerApproval:
      "اعتماد المدير",

    verification:
      "التحقق",

    score:
      "الدرجة",

    masterModified:
      "تم تعديل المرجع الرئيسي",

    masterProtectedValue:
      "لا · للقراءة فقط",

    originalBiometricModified:
      "تم تعديل مجموعة البيانات البيومترية الأصلية",

    originalProtectedValue:
      "لا · المصدر محفوظ",

    traceableCaseHistory:
      "سجل الحالة القابل للتتبع",

    endToEndAuditSequence:
      "تسلسل التدقيق المتكامل",

    step:
      "الخطوة",

    demoAuditRegister:
      "سجل التدقيق التجريبي",

    recordedLifecycleSequence:
      "تسلسل دورة الحياة المسجل",

    sequence:
      "التسلسل",

    case:
      "الحالة",

    actor:
      "المنفذ",

    actorType:
      "نوع المنفذ",

    action:
      "الإجراء",

    status:
      "الحالة",

    formalReporting:
      "التقارير الرسمية",

    reportCenter:
      "مركز التقارير",

    caseReportContent:
      "محتوى تقرير الحالة",

    formalEvidencePackage:
      "حزمة الأدلة الرسمية",

    reportGovernance:
      "حوكمة التقارير",

    traceabilityControls:
      "ضوابط التتبع",

    humanAttribution:
      "إسناد القرارات البشرية",

    humanAttributionText:
      "تبقى قرارات ضابط المراقبة والمدير مرتبطة بمراحل المراجعة البشرية ذات الصلة.",

    aiAttribution:
      "إسناد إجراءات الذكاء الاصطناعي",

    aiAttributionText:
      "تحدد نتائج وتوصيات وإجراءات الذكاء الاصطناعي مكون المعالجة المسؤول عنها.",

    chronologicalTraceability:
      "التتبع الزمني",

    chronologicalTraceabilityText:
      "يمكن إعادة بناء دورة حياة الحالة المحددة من تحقيق الذكاء الاصطناعي وحتى الإغلاق بعد التحقق.",

    masterReferenceProtection:
      "حماية المرجع الرئيسي",

    masterReferenceProtectionText:
      "يؤكد العرض التجريبي أن المرجع الرئيسي ظل دون تغيير أثناء التصحيح الخاضع للتحكم.",

    auditStorageBoundary:
      "حدود تخزين التدقيق",

    auditStorageBoundaryText:
      "يوفر هذا العرض سجلات دورة حياة قابلة للتتبع، ولا يتم تقديم التخزين غير القابل للتغيير أو المقاوم للعبث على أنه منفذ حاليًا.",

    managementReporting:
      "تقارير الإدارة",

    executiveReportingCoverage:
      "تغطية التقارير التنفيذية",

    caseVolume:
      "حجم الحالات",

    protectiveCases:
      "الحالات الوقائية",

    demoVerification:
      "التحقق التجريبي",

    unresolvedIdentity:
      "هويات غير محسومة",

    structuredModel:
      "نموذج التقارير المهيكلة",

    machineReadableCoverage:
      "تغطية البيانات القابلة للقراءة آليًا",

    futureExport:
      "التصدير المستقبلي",

    formalPdfReporting:
      "تقارير PDF الرسمية",

    reportModelReady:
      "نموذج بيانات التقارير جاهز",

    reportModelReadyText:
      "تم تمثيل معلومات الحالة والذكاء الاصطناعي والاعتماد والتصحيح والتحقق اللازمة للتقارير المستقبلية داخل نموذج بيانات العرض.",

    pdfGeneratorPlanned:
      "مولد PDF مخطط له",

    pdfMessage:
      "لم يتم بعد تنفيذ مولد رسمي لتقارير PDF القابلة للتنزيل داخل واجهة العرض الحالية.",

    formatCoverageNotice:
      "تمثل هذه الصيغ تغطية نموذج التقارير المهيكل، ولا تعني وجود ملفات تصدير قابلة للتنزيل حاليًا من هذه الواجهة.",

    finalAuditTitle:
      "دورة حياة متكاملة وقابلة للتتبع",

    finalAuditMessage:
      "توضح الحالة التجريبية المتحقق منها دورة حياة قابلة للتتبع تبدأ من تحقيق الذكاء الاصطناعي مرورًا باعتماد ضابط المراقبة والمدير والتصحيح الخاضع للتحكم والتحقق بعد التصحيح وحتى الوصول إلى حالة VERIFIED_CLOSED.",

    footer:
      "منصة مطابقة وتسوية الهوية بالذكاء الاصطناعي · مركز التقارير والتدقيق",

    auditMonitoringActive:
      "مراقبة التتبع نشطة",

    planned:
      "مخطط له",
  },
};


/* =========================================================
   SELECTED VERIFIED CASE
   ========================================================= */

const caseSummary = {
  caseId:
    VERIFIED_DEMO_CASE.id,

  type:
    VERIFIED_DEMO_CASE.caseType,

  priority:
    VERIFIED_DEMO_CASE.priority,

  biometric:
    VERIFIED_DEMO_CASE.biometricId,

  before:
    VERIFIED_DEMO_CASE.execution.before,

  after:
    VERIFIED_DEMO_CASE.execution.after,

  confidence:
    VERIFIED_DEMO_CASE.aiConfidence,

  protective:
    VERIFIED_DEMO_CASE.protectivePriority,

  officer:
    VERIFIED_DEMO_CASE.officer.actor,

  officerDecision:
    VERIFIED_DEMO_CASE.officer.decision,

  manager:
    VERIFIED_DEMO_CASE.manager.actor,

  managerDecision:
    VERIFIED_DEMO_CASE.manager.decision,

  verification:
    VERIFIED_DEMO_CASE.verification.status,

  verificationScore:
    VERIFIED_DEMO_CASE.verification.score,

  finalStatus:
    VERIFIED_DEMO_CASE.finalStatus,

  masterModified:
    VERIFIED_DEMO_CASE.masterModified,

  originalBiometricDatasetModified:
    VERIFIED_DEMO_CASE.originalBiometricDatasetModified,
};


/* =========================================================
   AUDIT EVENTS

   Representative frontend audit sequence for the
   backend-confirmed five-event verified lifecycle.
   ========================================================= */

const auditEvents = [
  {
    id:
      "DEMO-AUD-01",

    caseId:
      VERIFIED_DEMO_CASE.id,

    sequence:
      "01",

    actor:
      "Investigation Agent",

    actorAr:
      "وكيل التحقيق",

    actorType:
      "AI_AGENT",

    actorTypeAr:
      "وكيل ذكاء اصطناعي",

    action:
      "AI_INVESTIGATION_COMPLETED",

    actionAr:
      "اكتمل تحقيق الذكاء الاصطناعي",

    status:
      "COMPLETED",

    detail:
      "AI investigation completed and the proposed identity correction package was prepared for human review.",

    detailAr:
      "اكتمل تحقيق الذكاء الاصطناعي وتم إعداد حزمة تصحيح الهوية المقترحة للمراجعة البشرية.",
  },

  {
    id:
      "DEMO-AUD-02",

    caseId:
      VERIFIED_DEMO_CASE.id,

    sequence:
      "02",

    actor:
      VERIFIED_DEMO_CASE.officer.actor,

    actorAr:
      "ضابط المراقبة التجريبي",

    actorType:
      "HUMAN",

    actorTypeAr:
      "بشري",

    action:
      "OFFICER_APPROVAL_RECORDED",

    actionAr:
      "تم تسجيل اعتماد ضابط المراقبة",

    status:
      VERIFIED_DEMO_CASE.officer.decision,

    detail:
      "The Monitoring Officer reviewed the investigation evidence and approved the proposed correction.",

    detailAr:
      "راجع ضابط المراقبة أدلة التحقيق واعتمد التصحيح المقترح.",
  },

  {
    id:
      "DEMO-AUD-03",

    caseId:
      VERIFIED_DEMO_CASE.id,

    sequence:
      "03",

    actor:
      VERIFIED_DEMO_CASE.manager.actor,

    actorAr:
      "المدير المشرف التجريبي",

    actorType:
      "HUMAN",

    actorTypeAr:
      "بشري",

    action:
      "MANAGER_APPROVAL_RECORDED",

    actionAr:
      "تم تسجيل اعتماد المدير",

    status:
      VERIFIED_DEMO_CASE.manager.decision,

    detail:
      "The Supervising Manager completed the second-level review and authorized controlled execution.",

    detailAr:
      "أكمل المدير المشرف المراجعة من المستوى الثاني وصرح بالتنفيذ الخاضع للتحكم.",
  },

  {
    id:
      "DEMO-AUD-04",

    caseId:
      VERIFIED_DEMO_CASE.id,

    sequence:
      "04",

    actor:
      "Execution Agent",

    actorAr:
      "وكيل التنفيذ",

    actorType:
      "AI_AGENT",

    actorTypeAr:
      "وكيل ذكاء اصطناعي",

    action:
      "CONTROLLED_CORRECTION_COMPLETED",

    actionAr:
      "اكتمل التصحيح الخاضع للتحكم",

    status:
      VERIFIED_DEMO_CASE.execution.status,

    detail:
      `${VERIFIED_DEMO_CASE.biometricId} was reassigned from ${VERIFIED_DEMO_CASE.execution.before} to ${VERIFIED_DEMO_CASE.execution.after} in the permitted Biometric System runtime target.`,

    detailAr:
      `تمت إعادة ربط ${VERIFIED_DEMO_CASE.biometricId} من ${VERIFIED_DEMO_CASE.execution.before} إلى ${VERIFIED_DEMO_CASE.execution.after} داخل هدف التشغيل المسموح في النظام البيومتري.`,
  },

  {
    id:
      "DEMO-AUD-05",

    caseId:
      VERIFIED_DEMO_CASE.id,

    sequence:
      "05",

    actor:
      "Verification Agent",

    actorAr:
      "وكيل التحقق",

    actorType:
      "AI_AGENT",

    actorTypeAr:
      "وكيل ذكاء اصطناعي",

    action:
      "POST_CORRECTION_VERIFICATION_PASSED",

    actionAr:
      "نجح التحقق بعد التصحيح",

    status:
      VERIFIED_DEMO_CASE.finalStatus,

    detail:
      `Post-correction verification passed with score ${VERIFIED_DEMO_CASE.verification.score}. The mapping was validated, the original conflict was resolved and the case reached ${VERIFIED_DEMO_CASE.finalStatus}.`,

    detailAr:
      `نجح التحقق بعد التصحيح بدرجة ${VERIFIED_DEMO_CASE.verification.score}، وتم التحقق من صحة الربط وحل التعارض الأصلي ووصلت الحالة إلى ${VERIFIED_DEMO_CASE.finalStatus}.`,
  },
];


/* =========================================================
   REPORT TYPES
   ========================================================= */

const reports = [
  {
    title:
      "Case Investigation Report",

    titleAr:
      "تقرير تحقيق الحالة",

    description:
      "AI investigation, evidence, risk analysis, identity resolution and proposed correction.",

    descriptionAr:
      "تحقيق الذكاء الاصطناعي والأدلة وتحليل المخاطر وحسم الهوية والتصحيح المقترح.",

    type:
      "CASE REPORT",

    typeAr:
      "تقرير حالة",

    icon:
      BrainCircuit,
  },

  {
    title:
      "Correction & Verification Report",

    titleAr:
      "تقرير التصحيح والتحقق",

    description:
      "Before / After correction, approvals, execution result and post-correction verification.",

    descriptionAr:
      "حالة ما قبل وبعد التصحيح والاعتمادات ونتيجة التنفيذ والتحقق بعد التصحيح.",

    type:
      "CORRECTION REPORT",

    typeAr:
      "تقرير تصحيح",

    icon:
      FileCheck2,
  },

  {
    title:
      "Full Audit Report",

    titleAr:
      "تقرير التدقيق الكامل",

    description:
      "Chronological lifecycle record covering AI actions, human decisions, execution and verification.",

    descriptionAr:
      "سجل زمني لدورة الحياة يشمل إجراءات الذكاء الاصطناعي والقرارات البشرية والتنفيذ والتحقق.",

    type:
      "AUDIT REPORT",

    typeAr:
      "تقرير تدقيق",

    icon:
      History,
  },

  {
    title:
      "Harm Impact Report",

    titleAr:
      "تقرير تأثير الضرر",

    description:
      "Protective cases where identity errors may negatively affect an unrelated person.",

    descriptionAr:
      "الحالات الوقائية التي قد تؤثر فيها أخطاء الهوية سلبًا على شخص غير مرتبط بالحالة.",

    type:
      "PROTECTIVE REPORT",

    typeAr:
      "تقرير وقائي",

    icon:
      ShieldAlert,
  },

  {
    title:
      "Executive Monthly Report",

    titleAr:
      "التقرير التنفيذي الشهري",

    description:
      "Management KPIs, case volumes, priorities, AI performance and resolution outcomes.",

    descriptionAr:
      "مؤشرات الإدارة وحجم الحالات والأولويات وأداء الذكاء الاصطناعي ونتائج الحسم.",

    type:
      "EXECUTIVE REPORT",

    typeAr:
      "تقرير تنفيذي",

    icon:
      BarChart3,
  },

  {
    title:
      "Data Integrity Report",

    titleAr:
      "تقرير سلامة البيانات",

    description:
      "Cross-system mismatches, duplicates, orphan records, source protection and reconciliation results.",

    descriptionAr:
      "الاختلافات بين الأنظمة والسجلات المكررة والمعزولة وحماية المصادر ونتائج المطابقة.",

    type:
      "DATA REPORT",

    typeAr:
      "تقرير بيانات",

    icon:
      Database,
  },
];


/* =========================================================
   STATUS LABELS
   ========================================================= */

const statusLabels = {
  COMPLETED: {
    en:
      "COMPLETED",

    ar:
      "مكتمل",
  },

  APPROVED: {
    en:
      "APPROVED",

    ar:
      "معتمد",
  },

  PASSED: {
    en:
      "PASSED",

    ar:
      "ناجح",
  },

  VERIFIED_CLOSED: {
    en:
      "VERIFIED CLOSED",

    ar:
      "تم التحقق والإغلاق",
  },
};


const priorityLabels = {
  IMMEDIATE: {
    en:
      "IMMEDIATE",

    ar:
      "فورية",
  },

  HIGH: {
    en:
      "HIGH",

    ar:
      "عالية",
  },

  MEDIUM: {
    en:
      "MEDIUM",

    ar:
      "متوسطة",
  },
};


const caseTypeLabels = {
  HARM_IMPACT: {
    en:
      "HARM IMPACT",

    ar:
      "تأثير ضرر",
  },

  WRONG_MAPPING: {
    en:
      "WRONG MAPPING",

    ar:
      "ربط خاطئ",
  },

  DATA_MISMATCH: {
    en:
      "DATA MISMATCH",

    ar:
      "اختلاف بيانات",
  },

  DUPLICATE_IDENTITY: {
    en:
      "DUPLICATE IDENTITY",

    ar:
      "هوية مكررة",
  },

  COMPLEX_IDENTITY_CONFLICT: {
    en:
      "COMPLEX IDENTITY CONFLICT",

    ar:
      "تعارض هوية معقد",
  },

  CRITICAL_HARM_IDENTITY_CONFLICT: {
    en:
      "CRITICAL HARM IDENTITY CONFLICT",

    ar:
      "تعارض هوية حرج ذو تأثير ضار",
  },

  ORPHAN_RECORD: {
    en:
      "ORPHAN RECORD",

    ar:
      "سجل معزول",
  },
};


function localizedValue(
  map,
  value,
  language
) {
  return (
    map[value]?.[
      language
    ] ||
    map[value]?.en ||
    value
  );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  label,
  value,
  description,
  stateLabel,
}) {
  return (
    <div className="metricCard">
      <div className="metricTop">
        <div className="metricIcon">
          <Icon
            size={20}
            aria-hidden="true"
          />
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
          {stateLabel}
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
   STATUS BADGE
   ========================================================= */

function StatusBadge({
  value,
  language,
}) {
  const successValues = [
    "COMPLETED",
    "APPROVED",
    "PASSED",
    "VERIFIED_CLOSED",
  ];


  const success =
    successValues.includes(
      value
    );


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
          "24px",

        padding:
          "0 9px",

        borderRadius:
          "7px",

        color:
          success
            ? "#59cfa0"
            : "#76a9ff",

        background:
          success
            ? "rgba(52,211,153,0.07)"
            : "rgba(70,140,255,0.07)",

        border:
          success
            ? "1px solid rgba(52,211,153,0.12)"
            : "1px solid rgba(70,140,255,0.12)",

        fontSize:
          "8px",

        fontWeight:
          800,

        whiteSpace:
          "nowrap",
      }}
    >
      {localizedValue(
        statusLabels,
        value,
        language
      )}
    </span>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function ReportsAuditPage() {
  const {
    language,
  } = useLanguage();


  const c =
    copy[language] ||
    copy.en;


  const isArabic =
    language === "ar";


  const navigationArrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  const evidenceItems = [
    {
      en:
        "Case ID & lifecycle metadata",

      ar:
        "معرف الحالة وبيانات دورة الحياة",
    },

    {
      en:
        "Case type & priority",

      ar:
        "نوع الحالة والأولوية",
    },

    {
      en:
        "AI investigation conclusion",

      ar:
        "خلاصة تحقيق الذكاء الاصطناعي",
    },

    {
      en:
        "Identity resolution evidence",

      ar:
        "أدلة حسم الهوية",
    },

    {
      en:
        "Synthetic vector evidence",

      ar:
        "أدلة المتجهات الاصطناعية",
    },

    {
      en:
        "Risk & harm assessment",

      ar:
        "تقييم المخاطر والضرر",
    },

    {
      en:
        "Wrong-person impact analysis",

      ar:
        "تحليل تأثير الشخص الخطأ",
    },

    {
      en:
        "Before / After correction",

      ar:
        "ما قبل / بعد التصحيح",
    },

    {
      en:
        "Officer decision",

      ar:
        "قرار ضابط المراقبة",
    },

    {
      en:
        "Manager decision",

      ar:
        "قرار المدير",
    },

    {
      en:
        "Execution result",

      ar:
        "نتيجة التنفيذ",
    },

    {
      en:
        "Post-correction verification",

      ar:
        "التحقق بعد التصحيح",
    },

    {
      en:
        "Final case status",

      ar:
        "الحالة النهائية",
    },

    {
      en:
        "Audit sequence",

      ar:
        "تسلسل التدقيق",
    },
  ];


  const structuredOutputs = [
    {
      en:
        "Case data",

      ar:
        "بيانات الحالات",

      value:
        "CSV / JSON",
    },

    {
      en:
        "AI findings",

      ar:
        "نتائج الذكاء الاصطناعي",

      value:
        "CSV / JSON",
    },

    {
      en:
        "Investigations",

      ar:
        "التحقيقات",

      value:
        "CSV / JSON",
    },

    {
      en:
        "Approval state",

      ar:
        "حالة الاعتماد",

      value:
        "JSON",
    },

    {
      en:
        "Execution results",

      ar:
        "نتائج التنفيذ",

      value:
        "CSV / JSON",
    },

    {
      en:
        "Verification results",

      ar:
        "نتائج التحقق",

      value:
        "CSV / JSON",
    },
  ];


  return (
    <div className="appShell">

      <Sidebar />


      <main className="mainContent">

        {/* =================================================
            HEADER
            ================================================= */}

        <header className="topbar">
          <div>
            <div className="eyebrow">
              <History
                size={15}
                aria-hidden="true"
              />

              {c.eyebrow}
            </div>

            <h1>
              {c.title}
            </h1>

            <p>
              {c.subtitle}
            </p>
          </div>


          <div className="topbarActions">
            <button
              className="searchButton"
              type="button"
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              <span>
                {c.search}
              </span>
            </button>


            <div className="profile">
              <div className="avatar">
                AU
              </div>

              <div className="profileText">
                <strong>
                  {c.auditGovernance}
                </strong>

                <span>
                  {c.reportingCenter}
                </span>
              </div>
            </div>
          </div>
        </header>


        {/* =================================================
            TRACEABILITY NOTICE
            ================================================= */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "0 0 20px",

            padding:
              "18px",
          }}
        >
          <LockKeyhole
            size={25}
            aria-hidden="true"
          />

          <div>
            <strong>
              {c.traceabilityTitle}
            </strong>

            <span>
              {c.traceabilityMessage}
            </span>
          </div>
        </section>


        {/* =================================================
            KPI CARDS
            ================================================= */}

        <section className="statsGrid">
          <Metric
            icon={History}
            label={
              c.auditEvents
            }
            value={
              VERIFIED_DEMO_CASE.auditTrailEventCount
            }
            description={
              c.auditEventsDescription
            }
            stateLabel={
              c.traceable
            }
          />

          <Metric
            icon={Users}
            label={
              c.humanDecisions
            }
            value="2"
            description={
              c.humanDecisionsDescription
            }
            stateLabel={
              c.traceable
            }
          />

          <Metric
            icon={BrainCircuit}
            label={
              c.controlledStages
            }
            value="3"
            description={
              c.controlledStagesDescription
            }
            stateLabel={
              c.traceable
            }
          />

          <Metric
            icon={CheckCircle2}
            label={
              c.verifiedClosed
            }
            value="1"
            description={
              c.verifiedClosedDescription
            }
            stateLabel={
              c.traceable
            }
          />
        </section>


        {/* =================================================
            SELECTED CASE
            ================================================= */}

        <section className="panel">
          <div className="panelHeader">
            <div>
              <div className="panelEyebrow">
                {c.selectedAuditCase}
              </div>

              <h2 dir="ltr">
                {
                  caseSummary.caseId
                }
              </h2>
            </div>

            <StatusBadge
              value={
                caseSummary.finalStatus
              }
              language={
                language
              }
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
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(4,1fr)",

                gap:
                  "10px",
              }}
            >
              {[
                {
                  label:
                    c.caseType,

                  value:
                    localizedValue(
                      caseTypeLabels,
                      caseSummary.type,
                      language
                    ),
                },

                {
                  label:
                    c.priority,

                  value:
                    localizedValue(
                      priorityLabels,
                      caseSummary.priority,
                      language
                    ),
                },

                {
                  label:
                    c.aiConfidence,

                  value:
                    `${caseSummary.confidence}%`,
                },

                {
                  label:
                    c.protectivePriority,

                  value:
                    caseSummary.protective,
                },
              ].map(
                (item) => (
                  <div
                    key={
                      item.label
                    }
                    style={{
                      padding:
                        "14px",

                      borderRadius:
                        "11px",

                      background:
                        "rgba(255,255,255,0.025)",

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

                        marginTop:
                          "5px",

                        color:
                          "#d0dceb",

                        fontSize:
                          "12px",
                      }}
                    >
                      {item.value}
                    </strong>
                  </div>
                )
              )}
            </div>


            {/* BEFORE / AFTER */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr auto 1fr",

                alignItems:
                  "center",

                gap:
                  "14px",

                marginTop:
                  "16px",
              }}
            >
              <div
                style={{
                  padding:
                    "18px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(255,80,100,0.045)",

                  border:
                    "1px solid rgba(255,80,100,0.1)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#9b626a",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  {c.before}
                </span>

                <span
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {
                    caseSummary.biometric
                  }
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#ff7b89",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {
                    caseSummary.before
                  }
                </strong>
              </div>


              <ChevronRight
                size={21}
                color="#5f94df"
                style={
                  navigationArrowStyle
                }
                aria-hidden="true"
              />


              <div
                style={{
                  padding:
                    "18px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(52,211,153,0.045)",

                  border:
                    "1px solid rgba(52,211,153,0.1)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#56806f",

                    fontSize:
                      "8px",

                    fontWeight:
                      800,
                  }}
                >
                  {c.verifiedAfter}
                </span>

                <span
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#61738b",

                    fontSize:
                      "8px",

                    marginTop:
                      "10px",
                  }}
                >
                  {
                    caseSummary.biometric
                  }
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#59cfa0",

                    fontSize:
                      "21px",

                    marginTop:
                      "4px",
                  }}
                >
                  {
                    caseSummary.after
                  }
                </strong>
              </div>
            </div>


            {/* HUMAN DECISIONS */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr 1fr",

                gap:
                  "10px",

                marginTop:
                  "14px",
              }}
            >
              <div className="integrityInfo">
                <UserCheck
                  size={20}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.officerApproval}
                  </strong>

                  <span>
                    {isArabic
                      ? "ضابط المراقبة التجريبي"
                      : caseSummary.officer}

                    {" · "}

                    {localizedValue(
                      statusLabels,
                      caseSummary.officerDecision,
                      language
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BadgeCheck
                  size={20}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.managerApproval}
                  </strong>

                  <span>
                    {isArabic
                      ? "المدير المشرف التجريبي"
                      : caseSummary.manager}

                    {" · "}

                    {localizedValue(
                      statusLabels,
                      caseSummary.managerDecision,
                      language
                    )}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <ShieldCheck
                  size={20}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.verification}
                  </strong>

                  <span>
                    {localizedValue(
                      statusLabels,
                      caseSummary.verification,
                      language
                    )}

                    {" · "}

                    {c.score}

                    {" "}

                    {
                      caseSummary.verificationScore
                    }
                  </span>
                </div>
              </div>
            </div>


            {/* SOURCE PROTECTION */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "10px",

                marginTop:
                  "10px",
              }}
            >
              <div className="integrityInfo">
                <Database
                  size={20}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.masterModified}
                  </strong>

                  <span>
                    {
                      caseSummary.masterModified
                        ? "TRUE"
                        : c.masterProtectedValue
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <LockKeyhole
                  size={20}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {
                      c.originalBiometricModified
                    }
                  </strong>

                  <span>
                    {
                      caseSummary.originalBiometricDatasetModified
                        ? "TRUE"
                        : c.originalProtectedValue
                    }
                  </span>
                </div>
              </div>
            </div>


            <Link
              href={
                `/cases/${caseSummary.caseId}`
              }
              className="textButton"
              style={{
                width:
                  "fit-content",

                marginTop:
                  "15px",

                textDecoration:
                  "none",
              }}
            >
              {isArabic
                ? "فتح الحالة الكاملة"
                : "Open Full Case"}

              <ChevronRight
                size={16}
                style={
                  navigationArrowStyle
                }
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>


        {/* =================================================
            AUDIT TIMELINE
            ================================================= */}

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
                {c.traceableCaseHistory}
              </div>

              <h2>
                {c.endToEndAuditSequence}
              </h2>
            </div>

            <History
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              padding:
                "7px 21px 20px",
            }}
          >
            {auditEvents.map(
              (
                event,
                index
              ) => (
                <div
                  key={
                    event.id
                  }
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "65px 28px 175px 1fr 120px",

                    alignItems:
                      "start",

                    gap:
                      "11px",

                    padding:
                      "16px 0",

                    borderBottom:
                      index <
                      auditEvents.length - 1
                        ? "1px solid rgba(255,255,255,0.045)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#52647b",

                      fontSize:
                        "9px",

                      paddingTop:
                        "5px",
                    }}
                  >
                    {c.step}
                    {" "}
                    {event.sequence}
                  </div>


                  <div
                    style={{
                      width:
                        "24px",

                      height:
                        "24px",

                      borderRadius:
                        "50%",

                      display:
                        "grid",

                      placeItems:
                        "center",

                      background:
                        event.actorType ===
                        "HUMAN"
                          ? "rgba(255,185,90,0.08)"
                          : "rgba(70,140,255,0.08)",

                      color:
                        event.actorType ===
                        "HUMAN"
                          ? "#ffbd67"
                          : "#69a2ff",
                    }}
                  >
                    {event.actorType ===
                    "HUMAN" ? (
                      <Users
                        size={13}
                        aria-hidden="true"
                      />
                    ) : (
                      <BrainCircuit
                        size={13}
                        aria-hidden="true"
                      />
                    )}
                  </div>


                  <div>
                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#cbd7e7",

                        fontSize:
                          "9px",
                      }}
                    >
                      {isArabic
                        ? event.actorAr
                        : event.actor}
                    </strong>

                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#566980",

                        fontSize:
                          "8px",

                        marginTop:
                          "4px",
                      }}
                    >
                      {isArabic
                        ? event.actorTypeAr
                        : event.actorType}
                    </span>
                  </div>


                  <div>
                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#9eb0c5",

                        fontSize:
                          "9px",
                      }}
                    >
                      {isArabic
                        ? event.actionAr
                        : event.action}
                    </strong>

                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#63758d",

                        fontSize:
                          "9px",

                        lineHeight:
                          1.6,

                        marginTop:
                          "5px",
                      }}
                    >
                      {isArabic
                        ? event.detailAr
                        : event.detail}
                    </span>
                  </div>


                  <StatusBadge
                    value={
                      event.status
                    }
                    language={
                      language
                    }
                  />
                </div>
              )
            )}
          </div>
        </section>


        {/* =================================================
            AUDIT REGISTER
            ================================================= */}

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
                {c.demoAuditRegister}
              </div>

              <h2>
                {
                  c.recordedLifecycleSequence
                }
              </h2>
            </div>

            <Activity
              size={22}
              aria-hidden="true"
            />
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth:
                  "1100px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    {c.sequence}
                  </th>

                  <th>
                    {c.case}
                  </th>

                  <th>
                    {c.actor}
                  </th>

                  <th>
                    {c.actorType}
                  </th>

                  <th>
                    {c.action}
                  </th>

                  <th>
                    {c.status}
                  </th>
                </tr>
              </thead>


              <tbody>
                {auditEvents.map(
                  (event) => (
                    <tr
                      key={
                        event.id
                      }
                    >
                      <td
                        className="mono"
                        dir="ltr"
                      >
                        {
                          event.sequence
                        }
                      </td>


                      <td>
                        <Link
                          href={
                            `/cases/${event.caseId}`
                          }
                          className="caseId"
                          style={{
                            textDecoration:
                              "none",
                          }}
                        >
                          <span dir="ltr">
                            {event.caseId}
                          </span>
                        </Link>
                      </td>


                      <td>
                        {isArabic
                          ? event.actorAr
                          : event.actor}
                      </td>


                      <td>
                        <span
                          style={{
                            color:
                              event.actorType ===
                              "HUMAN"
                                ? "#ffbd67"
                                : "#76a9ff",

                            fontSize:
                              "8px",

                            fontWeight:
                              800,
                          }}
                        >
                          {isArabic
                            ? event.actorTypeAr
                            : event.actorType}
                        </span>
                      </td>


                      <td>
                        {isArabic
                          ? event.actionAr
                          : event.action}
                      </td>


                      <td>
                        <StatusBadge
                          value={
                            event.status
                          }
                          language={
                            language
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* =================================================
            REPORT CENTER
            ================================================= */}

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
                {c.formalReporting}
              </div>

              <h2>
                {c.reportCenter}
              </h2>
            </div>

            <FileText
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,1fr)",

              gap:
                "12px",

              padding:
                "20px",
            }}
          >
            {reports.map(
              (report) => {
                const Icon =
                  report.icon;

                return (
                  <div
                    key={
                      report.title
                    }
                    style={{
                      padding:
                        "18px",

                      borderRadius:
                        "13px",

                      border:
                        "1px solid rgba(255,255,255,0.055)",

                      background:
                        "rgba(255,255,255,0.022)",

                      display:
                        "flex",

                      flexDirection:
                        "column",

                      minHeight:
                        "215px",
                    }}
                  >
                    <div className="metricIcon">
                      <Icon
                        size={20}
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      style={{
                        color:
                          "#5f91dd",

                        fontSize:
                          "8px",

                        fontWeight:
                          800,

                        marginTop:
                          "16px",
                      }}
                    >
                      {isArabic
                        ? report.typeAr
                        : report.type}
                    </span>

                    <strong
                      style={{
                        color:
                          "#d1ddea",

                        fontSize:
                          "11px",

                        marginTop:
                          "5px",
                      }}
                    >
                      {isArabic
                        ? report.titleAr
                        : report.title}
                    </strong>

                    <p
                      style={{
                        color:
                          "#63758d",

                        fontSize:
                          "9px",

                        lineHeight:
                          1.6,

                        margin:
                          "8px 0 16px",
                      }}
                    >
                      {isArabic
                        ? report.descriptionAr
                        : report.description}
                    </p>

                    <button
                      type="button"
                      className="searchButton"
                      disabled
                      title={
                        c.pdfMessage
                      }
                      style={{
                        marginTop:
                          "auto",

                        width:
                          "100%",

                        justifyContent:
                          "center",

                        cursor:
                          "not-allowed",

                        opacity:
                          0.62,
                      }}
                    >
                      <FileText
                        size={15}
                        aria-hidden="true"
                      />

                      {
                        c.pdfGeneratorPlanned
                      }
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </section>


        {/* =================================================
            EVIDENCE + GOVERNANCE
            ================================================= */}

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
                  {c.caseReportContent}
                </div>

                <h2>
                  {
                    c.formalEvidencePackage
                  }
                </h2>
              </div>

              <FileText
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {evidenceItems.map(
                (item) => (
                  <div
                    key={
                      item.en
                    }
                    className="detailRow"
                  >
                    <span>
                      {isArabic
                        ? item.ar
                        : item.en}
                    </span>

                    <CheckCircle2
                      size={15}
                      color="#59cfa0"
                      aria-hidden="true"
                    />
                  </div>
                )
              )}
            </div>
          </div>


          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {c.reportGovernance}
                </div>

                <h2>
                  {
                    c.traceabilityControls
                  }
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
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <LockKeyhole
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.humanAttribution}
                  </strong>

                  <span>
                    {
                      c.humanAttributionText
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <BrainCircuit
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.aiAttribution}
                  </strong>

                  <span>
                    {c.aiAttributionText}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <History
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {
                      c.chronologicalTraceability
                    }
                  </strong>

                  <span>
                    {
                      c.chronologicalTraceabilityText
                    }
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <Database
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {
                      c.masterReferenceProtection
                    }
                  </strong>

                  <span>
                    {
                      c.masterReferenceProtectionText
                    }
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.1)",

                  background:
                    "rgba(255,185,90,0.04)",
                }}
              >
                <ShieldAlert
                  size={21}
                  color="#ffbd67"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#d0a35f",
                    }}
                  >
                    {
                      c.auditStorageBoundary
                    }
                  </strong>

                  <span>
                    {
                      c.auditStorageBoundaryText
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =================================================
            EXECUTIVE REPORTING
            ================================================= */}

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
                {c.managementReporting}
              </div>

              <h2>
                {
                  c.executiveReportingCoverage
                }
              </h2>
            </div>

            <BarChart3
              size={22}
              aria-hidden="true"
            />
          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                "10px",

              padding:
                "20px",
            }}
          >
            {[
              {
                label:
                  c.caseVolume,

                value:
                  PLATFORM_METRICS.aggregatedCases,

                Icon:
                  FileSearch,
              },

              {
                label:
                  c.protectiveCases,

                value:
                  PLATFORM_METRICS.wronglyAffectedCases,

                Icon:
                  ShieldAlert,
              },

              {
                label:
                  c.demoVerification,

                value:
                  localizedValue(
                    statusLabels,
                    VERIFIED_DEMO_CASE.verification.status,
                    language
                  ),

                Icon:
                  ShieldCheck,
              },

              {
                label:
                  c.unresolvedIdentity,

                value:
                  PLATFORM_METRICS.unresolvedIdentityCases,

                Icon:
                  CheckCircle2,
              },
            ].map(
              (item) => {
                const Icon =
                  item.Icon;

                return (
                  <div
                    key={
                      item.label
                    }
                    style={{
                      padding:
                        "16px",

                      borderRadius:
                        "11px",

                      background:
                        "rgba(255,255,255,0.024)",

                      border:
                        "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Icon
                      size={18}
                      color="#69a2ff"
                      aria-hidden="true"
                    />

                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#d2deeb",

                        fontSize:
                          "21px",

                        marginTop:
                          "12px",
                      }}
                    >
                      {item.value}
                    </strong>

                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#61738b",

                        fontSize:
                          "8px",

                        marginTop:
                          "4px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </section>


        {/* =================================================
            STRUCTURED REPORTING MODEL
            ================================================= */}

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
                  {c.structuredModel}
                </div>

                <h2>
                  {
                    c.machineReadableCoverage
                  }
                </h2>
              </div>

              <Database
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {structuredOutputs.map(
                (item) => (
                  <div
                    className="detailRow"
                    key={
                      item.en
                    }
                  >
                    <span>
                      {isArabic
                        ? item.ar
                        : item.en}
                    </span>

                    <strong dir="ltr">
                      {item.value}
                    </strong>
                  </div>
                )
              )}


              <div
                style={{
                  marginTop:
                    "12px",

                  color:
                    "#687b93",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                {
                  c.formatCoverageNotice
                }
              </div>
            </div>
          </div>


          {/* PDF */}

          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {c.futureExport}
                </div>

                <h2>
                  {c.formalPdfReporting}
                </h2>
              </div>

              <FileText
                size={22}
                aria-hidden="true"
              />
            </div>


            <div
              style={{
                padding:
                  "17px",
              }}
            >
              <div className="integrityInfo">
                <CheckCircle2
                  size={21}
                  aria-hidden="true"
                />

                <div>
                  <strong>
                    {c.reportModelReady}
                  </strong>

                  <span>
                    {
                      c.reportModelReadyText
                    }
                  </span>
                </div>
              </div>


              <div
                className="integrityInfo"
                style={{
                  borderColor:
                    "rgba(255,185,90,0.09)",

                  background:
                    "rgba(255,185,90,0.04)",
                }}
              >
                <FileText
                  size={21}
                  color="#ffbd67"
                  aria-hidden="true"
                />

                <div>
                  <strong
                    style={{
                      color:
                        "#d0a35f",
                    }}
                  >
                    {c.pdfGeneratorPlanned}
                  </strong>

                  <span>
                    {c.pdfMessage}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =================================================
            GOVERNANCE SUMMARY
            ================================================= */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "18px",
          }}
        >
          <ShieldCheck
            size={25}
            aria-hidden="true"
          />

          <div>
            <strong>
              {isArabic
                ? "حوكمة التنفيذ البشري"
                : "Human-Controlled Execution Governance"}
            </strong>

            <span>
              {isArabic
                ? "لا يستطيع الذكاء الاصطناعي اعتماد تصحيحه بنفسه. يلزم اعتماد ضابط المراقبة والمدير قبل التنفيذ، ويظل المرجع الرئيسي للقراءة فقط."
                : `AI cannot approve its own correction. Monitoring Officer and Manager approval are required before execution, and the Master Reference remains ${GOVERNANCE.masterReferenceAccess}.`}
            </span>
          </div>
        </section>


        {/* =================================================
            FINAL AUDIT STATUS
            ================================================= */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "14px 0 0",

            padding:
              "18px",
          }}
        >
          <CheckCircle2
            size={25}
            aria-hidden="true"
          />

          <div>
            <strong>
              {c.finalAuditTitle}
            </strong>

            <span>
              {c.finalAuditMessage}
            </span>
          </div>
        </section>


        {/* =================================================
            FOOTER
            ================================================= */}

        <footer className="footer">
          <span>
            {c.footer}
          </span>

          <div>
            <Activity
              size={15}
              aria-hidden="true"
            />

            {c.auditMonitoringActive}
          </div>
        </footer>

      </main>
    </div>
  );
}