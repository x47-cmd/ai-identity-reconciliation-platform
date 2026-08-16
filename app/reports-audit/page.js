"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

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
    eyebrow: "GOVERNANCE · TRACEABILITY · REPORTING",
    title: "Reports & Audit Trail",
    subtitle:
      "Complete traceability of AI findings, human decisions, approved corrections, verification outcomes and executive reporting.",

    search: "Search audit history",
    auditGovernance: "Audit & Governance",
    reportingCenter: "Reporting Center",

    traceabilityTitle: "Full Case Traceability Active",
    traceabilityMessage:
      "AI actions, human decisions, correction execution, verification outcomes and final case state can be reconstructed through the recorded case lifecycle.",

    auditReady: "AUDIT READY",

    auditEvents: "Audit Events",
    auditEventsDescription: "Selected E2E lifecycle events",

    humanDecisions: "Human Decisions",
    humanDecisionsDescription: "Officer and Manager approvals",

    controlledAiStages: "Controlled AI Stages",
    controlledAiStagesDescription:
      "Investigation, execution and verification",

    verifiedClosed: "Verified Closed",
    verifiedClosedDescription:
      "Completed end-to-end demo case",

    selectedAuditCase: "SELECTED AUDIT CASE",

    caseType: "Case Type",
    priority: "Priority",
    aiConfidence: "AI Confidence",
    protectivePriority: "Protective Priority",

    before: "BEFORE",
    verifiedAfter: "VERIFIED AFTER",

    officerApproval: "Officer Approval",
    managerApproval: "Manager Approval",
    verification: "Verification",
    score: "Score",

    masterModified: "Master Modified",
    masterProtectedValue: "FALSE · READ ONLY",

    originalBiometricModified: "Original Biometric Modified",
    originalProtectedValue: "FALSE · SOURCE PRESERVED",

    traceableCaseHistory: "TRACEABLE CASE HISTORY",
    endToEndAuditSequence: "End-to-End Audit Sequence",
    step: "STEP",

    demoAuditRegister: "DEMO AUDIT REGISTER",
    recordedLifecycleSequence: "Recorded Lifecycle Sequence",

    sequence: "SEQUENCE",
    case: "CASE",
    actor: "ACTOR",
    actorType: "ACTOR TYPE",
    action: "ACTION",
    status: "STATUS",

    formalReporting: "FORMAL REPORTING",
    reportCenter: "Report Center",

    caseReportContent: "CASE REPORT CONTENT",
    formalEvidencePackage: "Formal Evidence Package",

    reportGovernance: "REPORT GOVERNANCE",
    traceabilityControls: "Traceability Controls",

    humanAttribution: "Human Attribution",
    humanAttributionText:
      "Officer and Manager decisions remain attributable to the relevant human review stage.",

    aiAttribution: "AI Attribution",
    aiAttributionText:
      "AI findings, recommendations and lifecycle actions identify the responsible processing component.",

    chronologicalTraceability: "Chronological Traceability",
    chronologicalTraceabilityText:
      "The case lifecycle can be reconstructed from AI investigation through verified closure.",

    masterReferenceProtection: "Master Reference Protection",
    masterReferenceProtectionText:
      "The selected demo confirms that the Master Reference remained unchanged during controlled correction.",

    managementReporting: "MANAGEMENT REPORTING",
    executiveReportingCoverage:
      "Executive Reporting Coverage",

    caseVolume: "Case Volume",
    protectiveCases: "Protective Cases",
    demoVerification: "Demo Verification",
    unresolvedIdentity: "Unresolved Identity",

    currentArtifacts: "CURRENT ARTIFACTS",
    machineReadableOutputs: "Machine-Readable Outputs",

    futureExport: "FUTURE EXPORT",
    formalPdfReporting: "Formal PDF Reporting",

    reportModelReady: "Report Model Ready",
    reportModelReadyText:
      "Required case, AI, approval, correction and verification information is already represented in the reporting design.",

    pdfGeneratorPlanned: "PDF Generator Planned",
    pdfMessage:
      "A formal downloadable PDF generator has not yet been connected to this frontend workspace.",

    finalAuditTitle:
      "Auditable End-to-End Case Lifecycle",

    finalAuditMessage:
      "CASE-2026-00001 demonstrates a traceable lifecycle from AI investigation through Officer and Manager approvals, controlled correction, post-correction verification and VERIFIED_CLOSED status.",

    footer:
      "AI Identity Reconciliation Platform · Reports & Audit Trail Center",

    auditMonitoringActive:
      "Audit Monitoring Active",

    planned:
      "PLANNED",
  },

  ar: {
    eyebrow: "الحوكمة · التتبع · التقارير",
    title: "التقارير وسجل التدقيق",
    subtitle:
      "تتبع شامل لنتائج الذكاء الاصطناعي والقرارات البشرية والتصحيحات المعتمدة ونتائج التحقق والتقارير التنفيذية.",

    search: "البحث في سجل التدقيق",
    auditGovernance: "التدقيق والحوكمة",
    reportingCenter: "مركز التقارير",

    traceabilityTitle: "التتبع الكامل للحالة نشط",
    traceabilityMessage:
      "يمكن إعادة بناء إجراءات الذكاء الاصطناعي والقرارات البشرية وتنفيذ التصحيح ونتائج التحقق والحالة النهائية من خلال دورة حياة الحالة المسجلة.",

    auditReady: "جاهز للتدقيق",

    auditEvents: "أحداث التدقيق",
    auditEventsDescription:
      "أحداث دورة الحياة للحالة التجريبية المحددة",

    humanDecisions: "القرارات البشرية",
    humanDecisionsDescription:
      "اعتمادات الضابط والمدير",

    controlledAiStages:
      "مراحل الذكاء الاصطناعي الخاضعة للتحكم",

    controlledAiStagesDescription:
      "التحقيق والتنفيذ والتحقق",

    verifiedClosed: "تم التحقق والإغلاق",
    verifiedClosedDescription:
      "حالة تجريبية متكاملة مكتملة",

    selectedAuditCase: "حالة التدقيق المحددة",

    caseType: "نوع الحالة",
    priority: "الأولوية",
    aiConfidence: "ثقة الذكاء الاصطناعي",
    protectivePriority: "الأولوية الوقائية",

    before: "قبل",
    verifiedAfter: "بعد التحقق",

    officerApproval: "اعتماد ضابط المراقبة",
    managerApproval: "اعتماد المدير",
    verification: "التحقق",
    score: "الدرجة",

    masterModified: "تم تعديل المرجع الرئيسي",
    masterProtectedValue:
      "لا · للقراءة فقط",

    originalBiometricModified:
      "تم تعديل المصدر البيومتري الأصلي",

    originalProtectedValue:
      "لا · المصدر محفوظ",

    traceableCaseHistory:
      "سجل الحالة القابل للتتبع",

    endToEndAuditSequence:
      "تسلسل التدقيق المتكامل",

    step: "الخطوة",

    demoAuditRegister:
      "سجل التدقيق التجريبي",

    recordedLifecycleSequence:
      "تسلسل دورة الحياة المسجل",

    sequence: "التسلسل",
    case: "الحالة",
    actor: "المنفذ",
    actorType: "نوع المنفذ",
    action: "الإجراء",
    status: "الحالة",

    formalReporting: "التقارير الرسمية",
    reportCenter: "مركز التقارير",

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
      "تبقى قرارات ضابط المراقبة والمدير مرتبطة بمرحلة المراجعة البشرية ذات الصلة.",

    aiAttribution:
      "إسناد إجراءات الذكاء الاصطناعي",

    aiAttributionText:
      "تحدد نتائج وتوصيات وإجراءات الذكاء الاصطناعي المكون المسؤول عن المعالجة.",

    chronologicalTraceability:
      "التتبع الزمني",

    chronologicalTraceabilityText:
      "يمكن إعادة بناء دورة حياة الحالة من تحقيق الذكاء الاصطناعي وحتى الإغلاق بعد التحقق.",

    masterReferenceProtection:
      "حماية المرجع الرئيسي",

    masterReferenceProtectionText:
      "يؤكد العرض المحدد أن المرجع الرئيسي ظل دون تغيير أثناء التصحيح الخاضع للتحكم.",

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

    currentArtifacts:
      "المخرجات الحالية",

    machineReadableOutputs:
      "مخرجات قابلة للقراءة آليًا",

    futureExport:
      "التصدير المستقبلي",

    formalPdfReporting:
      "تقارير PDF الرسمية",

    reportModelReady:
      "نموذج التقرير جاهز",

    reportModelReadyText:
      "تم تمثيل معلومات الحالة والذكاء الاصطناعي والاعتماد والتصحيح والتحقق المطلوبة داخل تصميم التقارير.",

    pdfGeneratorPlanned:
      "مولد PDF مخطط له",

    pdfMessage:
      "لم يتم بعد ربط مولد PDF رسمي قابل للتنزيل بواجهة المنصة.",

    finalAuditTitle:
      "دورة حياة متكاملة وقابلة للتدقيق",

    finalAuditMessage:
      "توضح CASE-2026-00001 دورة حياة قابلة للتتبع تبدأ من تحقيق الذكاء الاصطناعي مرورًا باعتماد ضابط المراقبة والمدير والتصحيح الخاضع للتحكم والتحقق بعد التصحيح وحتى الوصول إلى حالة التحقق والإغلاق.",

    footer:
      "منصة مطابقة وتسوية الهوية بالذكاء الاصطناعي · مركز التقارير والتدقيق",

    auditMonitoringActive:
      "مراقبة التدقيق نشطة",

    planned:
      "مخطط له",
  },
};


/* =========================================================
   AUDIT EVENTS
   ========================================================= */

const auditEvents = [
  {
    id: "AUD-SEQ-01",
    caseId: "CASE-2026-00001",
    sequence: "01",
    actor: "Investigation Agent",
    actorAr: "وكيل التحقيق",
    actorType: "AI_AGENT",
    actorTypeAr: "وكيل ذكاء اصطناعي",
    action: "AI_INVESTIGATION_COMPLETED",
    actionAr: "اكتمل تحقيق الذكاء الاصطناعي",
    status: "COMPLETED",
    detail:
      "AI investigation completed and the proposed identity correction package was prepared for human review.",
    detailAr:
      "اكتمل تحقيق الذكاء الاصطناعي وتم إعداد حزمة تصحيح الهوية المقترحة للمراجعة البشرية.",
  },

  {
    id: "AUD-SEQ-02",
    caseId: "CASE-2026-00001",
    sequence: "02",
    actor: "Demo Monitoring Officer",
    actorAr: "ضابط المراقبة التجريبي",
    actorType: "HUMAN",
    actorTypeAr: "بشري",
    action: "OFFICER_APPROVAL_RECORDED",
    actionAr: "تم تسجيل اعتماد ضابط المراقبة",
    status: "APPROVED",
    detail:
      "Monitoring Officer reviewed the evidence and approved the proposed correction.",
    detailAr:
      "راجع ضابط المراقبة الأدلة واعتمد التصحيح المقترح.",
  },

  {
    id: "AUD-SEQ-03",
    caseId: "CASE-2026-00001",
    sequence: "03",
    actor: "Demo Supervising Manager",
    actorAr: "المدير المشرف التجريبي",
    actorType: "HUMAN",
    actorTypeAr: "بشري",
    action: "MANAGER_APPROVAL_RECORDED",
    actionAr: "تم تسجيل اعتماد المدير",
    status: "APPROVED",
    detail:
      "Manager completed the second-level review and authorized controlled correction execution.",
    detailAr:
      "أكمل المدير المراجعة من المستوى الثاني وصرح بتنفيذ التصحيح الخاضع للتحكم.",
  },

  {
    id: "AUD-SEQ-04",
    caseId: "CASE-2026-00001",
    sequence: "04",
    actor: "Execution Agent",
    actorAr: "وكيل التنفيذ",
    actorType: "AI_AGENT",
    actorTypeAr: "وكيل ذكاء اصطناعي",
    action: "CONTROLLED_CORRECTION_EXECUTED",
    actionAr: "تم تنفيذ التصحيح الخاضع للتحكم",
    status: "COMPLETED",
    detail:
      "BIO-000166 was changed from REF-002711 to REF-001009 in the isolated controlled runtime dataset.",
    detailAr:
      "تم تغيير BIO-000166 من REF-002711 إلى REF-001009 داخل مجموعة بيانات التشغيل المعزولة والخاضعة للتحكم.",
  },

  {
    id: "AUD-SEQ-05",
    caseId: "CASE-2026-00001",
    sequence: "05",
    actor: "Verification Agent",
    actorAr: "وكيل التحقق",
    actorType: "AI_AGENT",
    actorTypeAr: "وكيل ذكاء اصطناعي",
    action: "POST_CORRECTION_VERIFICATION_PASSED",
    actionAr: "نجح التحقق بعد التصحيح",
    status: "VERIFIED_CLOSED",
    detail:
      "Post-correction verification passed with score 100. Mapping was validated, the original conflict was resolved and the case reached VERIFIED_CLOSED.",
    detailAr:
      "نجح التحقق بعد التصحيح بدرجة 100، وتم التحقق من صحة الربط وحل التعارض الأصلي ووصلت الحالة إلى مرحلة التحقق والإغلاق.",
  },
];


/* =========================================================
   REPORT TYPES
   ========================================================= */

const reports = [
  {
    title: "Case Investigation Report",
    titleAr: "تقرير تحقيق الحالة",
    description:
      "AI investigation, evidence, risk analysis, identity resolution and proposed correction.",
    descriptionAr:
      "تحقيق الذكاء الاصطناعي والأدلة وتحليل المخاطر وحسم الهوية والتصحيح المقترح.",
    type: "CASE REPORT",
    typeAr: "تقرير حالة",
    icon: BrainCircuit,
  },

  {
    title: "Correction & Verification Report",
    titleAr: "تقرير التصحيح والتحقق",
    description:
      "Before/After correction, approvals, execution result and post-correction verification.",
    descriptionAr:
      "حالة ما قبل وبعد التصحيح والاعتمادات ونتيجة التنفيذ والتحقق بعد التصحيح.",
    type: "CORRECTION REPORT",
    typeAr: "تقرير تصحيح",
    icon: FileCheck2,
  },

  {
    title: "Full Audit Report",
    titleAr: "تقرير التدقيق الكامل",
    description:
      "Chronological lifecycle record covering AI actions, human decisions, execution and verification.",
    descriptionAr:
      "سجل زمني لدورة الحياة يشمل إجراءات الذكاء الاصطناعي والقرارات البشرية والتنفيذ والتحقق.",
    type: "AUDIT REPORT",
    typeAr: "تقرير تدقيق",
    icon: History,
  },

  {
    title: "Harm Impact Report",
    titleAr: "تقرير تأثير الضرر",
    description:
      "Protective cases where identity errors may negatively affect an unrelated person.",
    descriptionAr:
      "الحالات الوقائية التي قد تؤثر فيها أخطاء الهوية سلبًا على شخص غير مرتبط بالحالة.",
    type: "PROTECTIVE REPORT",
    typeAr: "تقرير وقائي",
    icon: ShieldAlert,
  },

  {
    title: "Executive Monthly Report",
    titleAr: "التقرير التنفيذي الشهري",
    description:
      "Management KPIs, case volumes, priorities, AI performance and resolution outcomes.",
    descriptionAr:
      "مؤشرات الإدارة وحجم الحالات والأولويات وأداء الذكاء الاصطناعي ونتائج الحسم.",
    type: "EXECUTIVE REPORT",
    typeAr: "تقرير تنفيذي",
    icon: BarChart3,
  },

  {
    title: "Data Integrity Report",
    titleAr: "تقرير سلامة البيانات",
    description:
      "Cross-system mismatches, duplicates, orphan records, source health and reconciliation results.",
    descriptionAr:
      "الاختلافات بين الأنظمة والسجلات المكررة والمعزولة وسلامة المصادر ونتائج المطابقة.",
    type: "DATA REPORT",
    typeAr: "تقرير بيانات",
    icon: Database,
  },
];


/* =========================================================
   SELECTED DEMO CASE
   ========================================================= */

const caseSummary = {
  caseId: "CASE-2026-00001",
  type: "HARM_IMPACT",
  priority: "IMMEDIATE",
  biometric: "BIO-000166",
  before: "REF-002711",
  after: "REF-001009",
  confidence: "99.99%",
  protective: "98.0",
  officer: "Demo Monitoring Officer",
  officerAr: "ضابط المراقبة التجريبي",
  officerDecision: "APPROVED",
  manager: "Demo Supervising Manager",
  managerAr: "المدير المشرف التجريبي",
  managerDecision: "APPROVED",
  verification: "PASSED",
  verificationScore: "100",
  finalStatus: "VERIFIED_CLOSED",
};


/* =========================================================
   LOCALIZATION HELPERS
   ========================================================= */

const statusLabels = {
  COMPLETED: {
    en: "COMPLETED",
    ar: "مكتمل",
  },

  APPROVED: {
    en: "APPROVED",
    ar: "معتمد",
  },

  PASSED: {
    en: "PASSED",
    ar: "ناجح",
  },

  VERIFIED_CLOSED: {
    en: "VERIFIED CLOSED",
    ar: "تم التحقق والإغلاق",
  },
};


const priorityLabels = {
  IMMEDIATE: {
    en: "IMMEDIATE",
    ar: "فورية",
  },

  HIGH: {
    en: "HIGH",
    ar: "عالية",
  },

  MEDIUM: {
    en: "MEDIUM",
    ar: "متوسطة",
  },
};


const caseTypeLabels = {
  HARM_IMPACT: {
    en: "HARM IMPACT",
    ar: "تأثير ضرر",
  },

  WRONG_MAPPING: {
    en: "WRONG MAPPING",
    ar: "ربط خاطئ",
  },

  DATA_MISMATCH: {
    en: "DATA MISMATCH",
    ar: "عدم تطابق البيانات",
  },

  DUPLICATE_IDENTITY: {
    en: "DUPLICATE IDENTITY",
    ar: "هوية مكررة",
  },

  COMPLEX_IDENTITY_CONFLICT: {
    en: "COMPLEX IDENTITY CONFLICT",
    ar: "تعارض هوية معقد",
  },

  CRITICAL_HARM_CONFLICT: {
    en: "CRITICAL HARM CONFLICT",
    ar: "تعارض ضرر حرج",
  },

  ORPHAN: {
    en: "ORPHAN",
    ar: "سجل معزول",
  },
};


function localizedValue(
  map,
  value,
  language
) {
  return (
    map[value]?.[language] ||
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
  auditReady,
}) {
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
          {auditReady}
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
    successValues.includes(value);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "24px",
        padding: "0 9px",
        borderRadius: "7px",

        color: success
          ? "#59cfa0"
          : "#76a9ff",

        background: success
          ? "rgba(52,211,153,0.07)"
          : "rgba(70,140,255,0.07)",

        border: success
          ? "1px solid rgba(52,211,153,0.12)"
          : "1px solid rgba(70,140,255,0.12)",

        fontSize: "8px",
        fontWeight: 800,
        whiteSpace: "nowrap",
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
  const { language } =
    useLanguage();

  const c =
    copy[language] || copy.en;

  const isArabic =
    language === "ar";


  const evidenceItems = [
    {
      en: "Case ID & lifecycle metadata",
      ar: "معرف الحالة وبيانات دورة الحياة",
    },
    {
      en: "Case type & priority",
      ar: "نوع الحالة والأولوية",
    },
    {
      en: "AI investigation conclusion",
      ar: "خلاصة تحقيق الذكاء الاصطناعي",
    },
    {
      en: "Identity resolution evidence",
      ar: "أدلة حسم الهوية",
    },
    {
      en: "Synthetic correlation evidence",
      ar: "أدلة المطابقة الاصطناعية",
    },
    {
      en: "Risk & harm assessment",
      ar: "تقييم المخاطر والضرر",
    },
    {
      en: "Wrong-person impact analysis",
      ar: "تحليل تأثير الشخص الخطأ",
    },
    {
      en: "Before / After correction",
      ar: "ما قبل / بعد التصحيح",
    },
    {
      en: "Officer decision",
      ar: "قرار ضابط المراقبة",
    },
    {
      en: "Manager decision",
      ar: "قرار المدير",
    },
    {
      en: "Execution result",
      ar: "نتيجة التنفيذ",
    },
    {
      en: "Post-correction verification",
      ar: "التحقق بعد التصحيح",
    },
    {
      en: "Final case status",
      ar: "الحالة النهائية",
    },
    {
      en: "Audit sequence",
      ar: "تسلسل التدقيق",
    },
  ];


  const machineOutputs = [
    {
      en: "Case data",
      ar: "بيانات الحالات",
      value: "CSV / JSON",
    },
    {
      en: "AI findings",
      ar: "نتائج الذكاء الاصطناعي",
      value: "CSV / JSON",
    },
    {
      en: "Investigations",
      ar: "التحقيقات",
      value: "CSV / JSON",
    },
    {
      en: "Approval state",
      ar: "حالة الاعتماد",
      value: "JSON",
    },
    {
      en: "Execution results",
      ar: "نتائج التنفيذ",
      value: "CSV / JSON",
    },
    {
      en: "Verification results",
      ar: "نتائج التحقق",
      value: "CSV / JSON",
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
              <History size={15} />
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
              <Search size={18} />

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
            margin: "0 0 20px",
            padding: "18px",
          }}
        >
          <LockKeyhole size={25} />

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
            label={c.auditEvents}
            value="5"
            description={
              c.auditEventsDescription
            }
            auditReady={c.auditReady}
          />

          <Metric
            icon={Users}
            label={c.humanDecisions}
            value="2"
            description={
              c.humanDecisionsDescription
            }
            auditReady={c.auditReady}
          />

          <Metric
            icon={BrainCircuit}
            label={c.controlledAiStages}
            value="3"
            description={
              c.controlledAiStagesDescription
            }
            auditReady={c.auditReady}
          />

          <Metric
            icon={CheckCircle2}
            label={c.verifiedClosed}
            value="1"
            description={
              c.verifiedClosedDescription
            }
            auditReady={c.auditReady}
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
                {caseSummary.caseId}
              </h2>
            </div>

            <StatusBadge
              value={
                caseSummary.finalStatus
              }
              language={language}
            />
          </div>


          <div
            style={{
              padding: "21px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "10px",
              }}
            >
              {[
                {
                  label: c.caseType,
                  value: localizedValue(
                    caseTypeLabels,
                    caseSummary.type,
                    language
                  ),
                },

                {
                  label: c.priority,
                  value: localizedValue(
                    priorityLabels,
                    caseSummary.priority,
                    language
                  ),
                },

                {
                  label: c.aiConfidence,
                  value:
                    caseSummary.confidence,
                },

                {
                  label:
                    c.protectivePriority,
                  value:
                    caseSummary.protective,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "14px",
                    borderRadius: "11px",
                    background:
                      "rgba(255,255,255,0.025)",
                    border:
                      "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      color: "#596c84",
                      fontSize: "8px",
                    }}
                  >
                    {item.label}
                  </span>

                  <strong
                    style={{
                      display: "block",
                      marginTop: "5px",
                      color: "#d0dceb",
                      fontSize: "12px",
                    }}
                  >
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>


            {/* BEFORE / AFTER */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr auto 1fr",
                alignItems: "center",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  padding: "18px",
                  borderRadius: "12px",
                  background:
                    "rgba(255,80,100,0.045)",
                  border:
                    "1px solid rgba(255,80,100,0.1)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "#9b626a",
                    fontSize: "8px",
                    fontWeight: 800,
                  }}
                >
                  {c.before}
                </span>

                <span
                  dir="ltr"
                  style={{
                    display: "block",
                    color: "#61738b",
                    fontSize: "8px",
                    marginTop: "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display: "block",
                    color: "#ff7b89",
                    fontSize: "21px",
                    marginTop: "4px",
                  }}
                >
                  {caseSummary.before}
                </strong>
              </div>


              <ChevronRight
                size={21}
                color="#5f94df"
                style={{
                  transform: isArabic
                    ? "rotate(180deg)"
                    : "none",
                }}
              />


              <div
                style={{
                  padding: "18px",
                  borderRadius: "12px",
                  background:
                    "rgba(52,211,153,0.045)",
                  border:
                    "1px solid rgba(52,211,153,0.1)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "#56806f",
                    fontSize: "8px",
                    fontWeight: 800,
                  }}
                >
                  {c.verifiedAfter}
                </span>

                <span
                  dir="ltr"
                  style={{
                    display: "block",
                    color: "#61738b",
                    fontSize: "8px",
                    marginTop: "10px",
                  }}
                >
                  {caseSummary.biometric}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display: "block",
                    color: "#59cfa0",
                    fontSize: "21px",
                    marginTop: "4px",
                  }}
                >
                  {caseSummary.after}
                </strong>
              </div>
            </div>


            {/* HUMAN DECISIONS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              <div className="integrityInfo">
                <UserCheck size={20} />

                <div>
                  <strong>
                    {c.officerApproval}
                  </strong>

                  <span>
                    {isArabic
                      ? caseSummary.officerAr
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
                <BadgeCheck size={20} />

                <div>
                  <strong>
                    {c.managerApproval}
                  </strong>

                  <span>
                    {isArabic
                      ? caseSummary.managerAr
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
                <ShieldCheck size={20} />

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
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div className="integrityInfo">
                <Database size={20} />

                <div>
                  <strong>
                    {c.masterModified}
                  </strong>

                  <span>
                    {c.masterProtectedValue}
                  </span>
                </div>
              </div>


              <div className="integrityInfo">
                <LockKeyhole size={20} />

                <div>
                  <strong>
                    {
                      c.originalBiometricModified
                    }
                  </strong>

                  <span>
                    {c.originalProtectedValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =================================================
            AUDIT TIMELINE
            ================================================= */}

        <section
          className="panel"
          style={{
            marginTop: "14px",
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

            <History size={22} />
          </div>


          <div
            style={{
              padding:
                "7px 21px 20px",
            }}
          >
            {auditEvents.map(
              (event, index) => (
                <div
                  key={event.id}
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "65px 28px 175px 1fr 120px",

                    alignItems: "start",

                    gap: "11px",

                    padding: "16px 0",

                    borderBottom:
                      index <
                      auditEvents.length - 1
                        ? "1px solid rgba(255,255,255,0.045)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      color: "#52647b",
                      fontSize: "9px",
                      paddingTop: "5px",
                    }}
                  >
                    {c.step}{" "}
                    {event.sequence}
                  </div>


                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",

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
                      <Users size={13} />
                    ) : (
                      <BrainCircuit
                        size={13}
                      />
                    )}
                  </div>


                  <div>
                    <strong
                      style={{
                        display: "block",
                        color: "#cbd7e7",
                        fontSize: "9px",
                      }}
                    >
                      {isArabic
                        ? event.actorAr
                        : event.actor}
                    </strong>

                    <span
                      style={{
                        display: "block",
                        color: "#566980",
                        fontSize: "8px",
                        marginTop: "4px",
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
                        display: "block",
                        color: "#9eb0c5",
                        fontSize: "9px",
                      }}
                    >
                      {isArabic
                        ? event.actionAr
                        : event.action}
                    </strong>

                    <span
                      style={{
                        display: "block",
                        color: "#63758d",
                        fontSize: "9px",
                        lineHeight: 1.6,
                        marginTop: "5px",
                      }}
                    >
                      {isArabic
                        ? event.detailAr
                        : event.detail}
                    </span>
                  </div>


                  <StatusBadge
                    value={event.status}
                    language={language}
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
            marginTop: "14px",
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

            <Activity size={22} />
          </div>


          <div className="tableWrap">
            <table
              style={{
                minWidth: "1100px",
              }}
            >
              <thead>
                <tr>
                  <th>{c.sequence}</th>
                  <th>{c.case}</th>
                  <th>{c.actor}</th>
                  <th>{c.actorType}</th>
                  <th>{c.action}</th>
                  <th>{c.status}</th>
                </tr>
              </thead>

              <tbody>
                {auditEvents.map(
                  (event) => (
                    <tr key={event.id}>
                      <td
                        className="mono"
                        dir="ltr"
                      >
                        {event.sequence}
                      </td>

                      <td>
                        <Link
                          href={`/cases/${event.caseId}`}
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

                            fontSize: "8px",
                            fontWeight: 800,
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
            marginTop: "14px",
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

            <FileText size={22} />
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3,1fr)",
              gap: "12px",
              padding: "20px",
            }}
          >
            {reports.map(
              (report) => {
                const Icon =
                  report.icon;

                return (
                  <div
                    key={report.title}
                    style={{
                      padding: "18px",
                      borderRadius:
                        "13px",

                      border:
                        "1px solid rgba(255,255,255,0.055)",

                      background:
                        "rgba(255,255,255,0.022)",

                      display: "flex",
                      flexDirection:
                        "column",

                      minHeight:
                        "215px",
                    }}
                  >
                    <div className="metricIcon">
                      <Icon size={20} />
                    </div>

                    <span
                      style={{
                        color: "#5f91dd",
                        fontSize: "8px",
                        fontWeight: 800,
                        marginTop: "16px",
                      }}
                    >
                      {isArabic
                        ? report.typeAr
                        : report.type}
                    </span>

                    <strong
                      style={{
                        color: "#d1ddea",
                        fontSize: "11px",
                        marginTop: "5px",
                      }}
                    >
                      {isArabic
                        ? report.titleAr
                        : report.title}
                    </strong>

                    <p
                      style={{
                        color: "#63758d",
                        fontSize: "9px",
                        lineHeight: 1.6,
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
                      style={{
                        marginTop: "auto",
                        width: "100%",
                        justifyContent:
                          "center",
                        cursor:
                          "not-allowed",
                        opacity: 0.62,
                      }}
                    >
                      <FileText size={15} />

                      {c.pdfGeneratorPlanned}
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
            marginTop: "14px",
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

              <FileText size={22} />
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
                    key={item.en}
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

              <ShieldCheck size={22} />
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
                <BrainCircuit size={21} />

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
                <History size={21} />

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
                <Database size={21} />

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
            </div>
          </div>
        </section>


        {/* =================================================
            EXECUTIVE REPORTING
            ================================================= */}

        <section
          className="panel"
          style={{
            marginTop: "14px",
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

            <BarChart3 size={22} />
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4,1fr)",
              gap: "10px",
              padding: "20px",
            }}
          >
            {[
              {
                label: c.caseVolume,
                value: "53",
                Icon: FileSearch,
              },

              {
                label:
                  c.protectiveCases,
                value: "9",
                Icon: ShieldAlert,
              },

              {
                label:
                  c.demoVerification,
                value: localizedValue(
                  statusLabels,
                  "PASSED",
                  language
                ),
                Icon: ShieldCheck,
              },

              {
                label:
                  c.unresolvedIdentity,
                value: "0",
                Icon: CheckCircle2,
              },
            ].map((item) => {
              const Icon =
                item.Icon;

              return (
                <div
                  key={item.label}
                  style={{
                    padding: "16px",
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
                  />

                  <strong
                    style={{
                      display: "block",
                      color: "#d2deeb",
                      fontSize: "21px",
                      marginTop: "12px",
                    }}
                  >
                    {item.value}
                  </strong>

                  <span
                    style={{
                      display: "block",
                      color: "#61738b",
                      fontSize: "8px",
                      marginTop: "4px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>


        {/* =================================================
            EXPORT READINESS
            ================================================= */}

        <section
          className="dashboardGrid"
          style={{
            marginTop: "14px",
          }}
        >
          <div className="panel">
            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {c.currentArtifacts}
                </div>

                <h2>
                  {
                    c.machineReadableOutputs
                  }
                </h2>
              </div>

              <Database size={22} />
            </div>


            <div
              style={{
                padding:
                  "8px 18px 18px",
              }}
            >
              {machineOutputs.map(
                (item) => (
                  <div
                    className="detailRow"
                    key={item.en}
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
            </div>
          </div>


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

              <FileText size={22} />
            </div>


            <div
              style={{
                padding: "17px",
              }}
            >
              <div className="integrityInfo">
                <CheckCircle2 size={21} />

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
            FINAL AUDIT STATUS
            ================================================= */}

        <section
          className="integrityInfo"
          style={{
            margin: "14px 0 0",
            padding: "18px",
          }}
        >
          <CheckCircle2 size={25} />

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
            <Activity size={15} />

            {c.auditMonitoringActive}
          </div>
        </footer>

      </main>
    </div>
  );
}