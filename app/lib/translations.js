const translations = {
  en: {
    common: {
      searchCase: "Search case",
      monitoringOfficer: "Monitoring Officer",
      operations: "Operations",
      syntheticDemo: "Synthetic Demo",
      syntheticDemoEnvironment: "Synthetic Demo Environment",
      systemOperational: "System Operational",
      active: "Active",
      ready: "Ready",
      operational: "Operational",
      environment: "Environment",
      processingState: "Processing state",
      viewDetails: "View details",
      review: "Review",
      open: "Open",
      approved: "Approved",
      completed: "Completed",
      passed: "Passed",
      pending: "Pending",
      immediate: "Immediate",
      high: "High",
      medium: "Medium",
      total: "Total",
      case: "Case",
      type: "Type",
      biometric: "Biometric",
      identity: "Identity",
      confidence: "Confidence",
      priority: "Priority",
      status: "Status",
      risk: "Risk",
      harm: "Harm",
      protectivePriority: "Protective Priority",
      currentIdentity: "Current Identity",
      proposedIdentity: "Proposed Identity",
      canonicalIdentity: "Canonical Identity",
      previousIdentity: "Previous Identity",
      verifiedIdentity: "Verified Identity",
      biometricRecord: "Biometric Record",
      verification: "Verification",
      no: "No",
      yes: "Yes",
      notStarted: "Not Started",
      notReady: "Not Ready",
      notAuthorized: "Not Authorized",
      verifiedClosed: "Verified Closed",
      aiInvestigated: "AI Investigated",
      officerReview: "Officer Review",
      managerApproval: "Manager Approval",
      readOnly: "Read-only",
      masterProtected: "Master Protected",
      readOnlyReference: "Read-only reference",
      syntheticDemonstration: "Synthetic Demonstration",
      continuousMonitoringActive: "Continuous Monitoring Active",
      language: "Language",
      english: "English",
      arabic: "العربية",
    },

    sidebar: {
      workspace: "WORKSPACE",
      intelligence: "INTELLIGENCE",
      commandCenter: "Command Center",
      cases: "Cases",
      aiInvestigations: "AI Investigations",
      officerReview: "Officer Review",
      managerApproval: "Manager Approval",
      correctionsVerification: "Corrections & Verification",
      analytics: "Analytics",
      dataIntegrity: "Data Integrity",
      reportsAudit: "Reports & Audit",
      platformName: "Identity AI",
      platformSubtitle: "Reconciliation Platform",
    },

    commandCenter: {
      eyebrow: "AI IDENTITY OPERATIONS",
      title: "Command Center",
      subtitle:
        "Continuous identity reconciliation, protective risk detection and AI-assisted investigation.",

      protectiveEngine: "Protective Priority Engine Active",
      protectiveMessage:
        "9 protective cases were identified in the current synthetic demo dataset where identity conflicts may create potential wrong-person impact.",
      reviewCases: "Review Cases",

      totalCases: "Total Cases",
      totalCasesSubtitle: "Aggregated identity integrity cases",

      immediatePriority: "Immediate Priority",
      immediatePrioritySubtitle: "Protective intervention priority",

      highPriority: "High Priority",
      highPrioritySubtitle: "Require accelerated human review",

      unresolvedIdentity: "Unresolved Identity",
      unresolvedIdentitySubtitle: "All cases have canonical candidates",

      demoKpi: "DEMO KPI",
      aiPriorityQueue: "AI PRIORITY QUEUE",
      casesRequiringAttention: "Cases Requiring Attention",
      viewAllCases: "View all cases",
      aiIdentity: "AI Identity",

      agenticAi: "AGENTIC AI",
      agentOperations: "Agent Operations",
      monitoringAgent: "Monitoring Agent",
      reconciliationAgent: "Reconciliation Agent",
      investigationAgent: "Investigation Agent",
      approvalWorkflow: "Approval Workflow",
      verificationAgent: "Verification Agent",

      latestVerifiedProtectiveCase:
        "LATEST VERIFIED PROTECTIVE CASE",

      harmImpact: "Harm impact",
      endToEndVerificationPassed:
        "End-to-End Verification Passed",

      verificationPassedMessage:
        "The approved correction passed post-correction verification and reached VERIFIED_CLOSED status.",

      protectiveWrongPersonDetected:
        "Protective wrong-person impact was detected",

      protectiveWrongPersonMessage:
        "The identity conflict was assigned immediate protective priority, reviewed by both required human approval levels, corrected in the permitted target and subsequently verified closed.",

      viewVerifiedLifecycle:
        "View Verified Case Lifecycle",

      platformHealth: "Platform Health",
      canonicalCaseResolution: "Canonical case resolution",
      protectiveDetection: "Protective detection",
      unexplainedFalsePositives: "Unexplained false positives",

      masterReferenceProtected:
        "Master Reference protected",

      masterProtectionMessage:
        "The authoritative Master Reference remains read only. Automated corrections target only the permitted Biometric System runtime dataset after required human approval.",

      openDataIntegrityCenter:
        "Open Data Integrity Center",
    },

    cases: {
      title: "Cases",
      eyebrow: "IDENTITY CASE MANAGEMENT",
      subtitle:
        "Review aggregated reconciliation cases, protective priorities and AI identity resolution outcomes.",

      totalCases: "Total Cases",
      immediate: "Immediate",
      high: "High",
      medium: "Medium",

      protectiveHarmCases:
        "Protective / Harm Cases",

      searchPlaceholder:
        "Search case, biometric or identity",

      allCases: "All Cases",
      caseType: "Case Type",
      biometricRecord: "Biometric Record",
      identityChange: "Identity Change",
      protectiveScore: "Protective Score",

      openInvestigation: "Open Investigation",
      detailUnavailable: "Detail unavailable in demo",

      verifiedClosed: "VERIFIED CLOSED",
      aiInvestigated: "AI INVESTIGATED",
    },

    caseDetail: {
      backToCases: "Back to Cases",
      investigation: "AI Investigation",
      caseOverview: "Case Overview",
      identityResolution: "Identity Resolution",
      riskHarmAnalysis: "Risk & Harm Analysis",
      approvalLifecycle: "Approval Lifecycle",
      correctionVerification: "Correction & Verification",
      auditHistory: "Audit History",

      syntheticCorrelation: "SYNTHETIC CORRELATION",
      identityResolutionEvidence:
        "Identity Resolution Evidence",

      syntheticEvidenceNotice:
        "The backend uses synthetic vector-based correlation and does not expose separate face, fingerprint or iris similarity scores.",

      canonicalIdentityConfidence:
        "Canonical Identity Confidence",

      supportingFindings: "Supporting Findings",
      canonicalCandidate: "Canonical Candidate",
      evidenceSource: "Evidence Source",
      syntheticVectorEvidence:
        "Synthetic Vector Evidence",

      postCorrectionBiometricMatch:
        "Post-Correction Biometric Match",

      currentMapping: "Current Mapping",
      canonicalResolution: "Canonical Resolution",

      syntheticSupportingEvidence:
        "SYNTHETIC SUPPORTING EVIDENCE",

      representativeEvidenceNotice:
        "This breakdown is representative frontend evidence. Case-level metrics remain the authoritative synthetic demo values.",

      wronglyAffectedPerson:
        "Wrongly Affected Person",

      monitoringOfficerDecision:
        "Monitoring Officer Decision",

      supervisingManagerDecision:
        "Supervising Manager Decision",

      executionStatus: "Execution Status",
      verificationStatus: "Verification Status",
      verificationScore: "Verification Score",
      mappingValid: "Identity Mapping Valid",
      conflictResolved: "Conflict Resolved",
      secondaryConflict: "Secondary Conflict",

      auditTrail: "Audit Trail",
      traceableEvents: "Traceable Events",
    },

    officerReview: {
      eyebrow: "HUMAN OVERSIGHT",
      title: "Officer Review",
      subtitle:
        "Monitoring Officer review queue for AI-investigated identity reconciliation cases.",

      awaitingOfficer: "Awaiting Officer",
      awaitingManager: "Awaiting Manager",
      immediateCases: "Immediate",
      highCases: "High",
      mediumCases: "Medium",
      wrongPersonCases: "Wrong-Person Impact",
      aiInvestigated: "AI Investigated",

      reviewQueue: "Officer Review Queue",
      queueOrder: "Queue Order",
      recommendation: "AI Recommendation",
      action: "Action",
      reviewCase: "Review Case",

      nextRecommended:
        "Next Recommended Review",

      humanApprovalRequired:
        "Human approval required before any correction can proceed.",
    },

    managerApproval: {
      eyebrow: "FINAL HUMAN AUTHORIZATION",
      title: "Manager Approval",
      subtitle:
        "Supervising Manager authorization queue for officer-approved correction proposals.",

      awaitingManager: "Awaiting Manager",
      immediateCases: "Immediate",
      highCases: "High",
      mediumCases: "Medium",
      officerApproved: "Officer Approved",
      executionAuthorized: "Execution Authorized",

      approvalQueue: "Manager Approval Queue",
      finalReview: "Final Review",
      approvalPackage: "Approval Package",
      queueOrder: "Queue Order",

      recommendedCase:
        "Recommended Final Review",

      twoHumanApproval:
        "Two-human approval is mandatory before correction execution.",
    },

    corrections: {
      eyebrow: "AUTHORIZED REMEDIATION",
      title: "Corrections & Verification",
      subtitle:
        "Controlled correction execution and post-correction verification workspace.",

      completedCorrections: "Completed Corrections",
      verifiedClosed: "Verified Closed",
      pendingAuthorization: "Pending Authorization",
      verificationPassed: "Verification Passed",

      correctionLifecycle: "Correction Lifecycle",
      before: "Before",
      after: "After",
      execution: "Execution",
      verification: "Verification",

      authorizedCorrection:
        "Authorized Correction",

      masterModified:
        "Master Reference Modified",

      originalDatasetModified:
        "Original Biometric Dataset Modified",

      protectedSourceMessage:
        "Protected source datasets remain unchanged. Authorized corrections apply only to the permitted runtime target.",

      verificationPassedMessage:
        "Post-correction verification passed and the identity conflict was resolved.",
    },

    analytics: {
      eyebrow: "OPERATIONAL INTELLIGENCE",
      title: "Analytics",
      subtitle:
        "Validated synthetic demo metrics for reconciliation quality, protective detection and case operations.",

      totalBiometricRecords: "Biometric Records",
      masterIdentities: "Master Identities",
      rawFindings: "Raw Findings",
      aggregatedCases: "Aggregated Cases",

      caseTypeBreakdown: "Case Type Breakdown",
      evidenceFlow: "Evidence & Case Flow",
      qualityMetrics: "Quality Metrics",
      operationalSnapshot: "Operational Snapshot",

      dataMismatch: "Data Mismatch",
      wrongMapping: "Wrong Mapping",
      complexIdentityConflict:
        "Complex Identity Conflict",
      duplicateIdentity: "Duplicate Identity",
      harmImpact: "Harm Impact",
      orphan: "Orphan",
      criticalHarmIdentityConflict:
        "Critical Harm Identity Conflict",

      expectedAnomalies: "Expected Anomalies",
      detectedAnomalies: "Detected Anomalies",
      missedAnomalies: "Missed Anomalies",
      detectionRecall: "Detection Recall",
      rawPrecision: "Raw Precision",
      f1Score: "F1 Score",
      diagnosticPrecision: "Diagnostic Precision",
      protectiveDetection: "Protective Detection",
      protectivePriorityAccuracy:
        "Protective Priority Accuracy",
      unexplainedFalsePositives:
        "Unexplained False Positives",

      corroboratingFindings:
        "Corroborating Findings",
      multifindingCases: "Multi-Finding Cases",
      protectiveCases: "Protective Cases",

      officerQueue: "Officer Queue",
      managerQueue: "Manager Queue",
      completedCorrection: "Completed Correction",
      verifiedClosed: "Verified Closed",

      powerBi: "Power BI",
      planned: "PLANNED",
      integrationReady: "Integration Ready",
      powerBiMessage:
        "Power BI integration is planned and is not connected in the current demo.",
    },

    dataIntegrity: {
      eyebrow: "RECONCILIATION CONTROL",
      title: "Data Integrity",
      subtitle:
        "Monitor source protection, reconciliation evidence and canonical identity resolution.",

      masterReference: "Master Reference",
      aiReconciliation: "AI Reconciliation",
      biometricSystem: "Biometric System",

      authoritativeSource:
        "Authoritative source",
      controlledCorrectionTarget:
        "Controlled correction target",

      records: "Records",
      identities: "Identities",

      reconciliationSnapshot:
        "Current Demo Reconciliation",

      aggregatedCases: "Aggregated Cases",
      corroboratingFindings:
        "Corroborating Findings",

      caseTaxonomy: "Case Taxonomy",
      qualityValidation: "Quality Validation",

      canonicalResolution:
        "Canonical Case Resolution",
      diagnosticPrecision:
        "Diagnostic Precision",
      protectiveDetection:
        "Protective Detection",
      protectivePriorityAccuracy:
        "Protective Priority Accuracy",

      masterReadOnly:
        "Master Reference is read-only",

      masterReadOnlyMessage:
        "The reconciliation platform can compare against the authoritative Master Reference but cannot automatically modify it.",

      resolutionNotice:
        "53 / 53 canonical case resolution means every case has a canonical identity candidate. It does not mean all 53 cases are closed.",
    },

    reportsAudit: {
      eyebrow: "GOVERNANCE & TRACEABILITY",
      title: "Reports & Audit",
      subtitle:
        "Traceable governance history for AI investigation, human approvals, correction execution and verification.",

      auditEvents: "Audit Events",
      humanDecisions: "Human Decisions",
      controlledAiStages: "Controlled AI Stages",
      verifiedClosed: "Verified Closed",

      selectedAuditCase:
        "Selected Audit Case",

      endToEndAuditTrail:
        "End-to-End Audit Trail",

      officerApproval:
        "Monitoring Officer Approval",

      managerApproval:
        "Supervising Manager Approval",

      correctionExecution:
        "Correction Execution",

      postCorrectionVerification:
        "Post-Correction Verification",

      finalCaseStatus:
        "Final Case Status",

      traceable: "Traceable",
      auditHistory: "Audit History",

      dataProtection:
        "Data Protection",

      masterModified:
        "Master Reference Modified",

      originalBiometricModified:
        "Original Biometric Dataset Modified",

      pdfAuditReport:
        "PDF Audit Report",

      planned:
        "PLANNED",

      pdfMessage:
        "PDF audit report generation is planned and is not enabled in the current demo.",

      governanceMessage:
        "AI stages are controlled and traceable. Sensitive correction decisions require human approval.",
    },

    priorities: {
      IMMEDIATE: "IMMEDIATE",
      HIGH: "HIGH",
      MEDIUM: "MEDIUM",
    },

    statuses: {
      VERIFIED_CLOSED: "VERIFIED CLOSED",
      AI_INVESTIGATED: "AI INVESTIGATED",
      PENDING: "PENDING",
      APPROVED: "APPROVED",
      COMPLETED: "COMPLETED",
      PASSED: "PASSED",
      NOT_READY: "NOT READY",
      NOT_STARTED: "NOT STARTED",
      NOT_AUTHORIZED: "NOT AUTHORIZED",
    },

    caseTypes: {
      HARM_IMPACT: "HARM IMPACT",
      CRITICAL_HARM_CONFLICT:
        "CRITICAL HARM CONFLICT",
      COMPLEX_IDENTITY_CONFLICT:
        "COMPLEX IDENTITY CONFLICT",
      DATA_MISMATCH: "DATA MISMATCH",
      WRONG_MAPPING: "WRONG MAPPING",
      DUPLICATE_IDENTITY: "DUPLICATE IDENTITY",
      ORPHAN: "ORPHAN",
    },

    footer: {
      platform:
        "AI Identity Reconciliation Platform",
      demo: "Synthetic Demonstration",
      monitoring:
        "Continuous Monitoring Active",
    },
  },


  ar: {
    common: {
      searchCase: "البحث عن حالة",
      monitoringOfficer: "ضابط المراقبة",
      operations: "العمليات",
      syntheticDemo: "بيئة تجريبية اصطناعية",
      syntheticDemoEnvironment: "بيئة تجريبية اصطناعية",
      systemOperational: "النظام يعمل",
      active: "نشط",
      ready: "جاهز",
      operational: "قيد التشغيل",
      environment: "البيئة",
      processingState: "حالة المعالجة",
      viewDetails: "عرض التفاصيل",
      review: "مراجعة",
      open: "فتح",
      approved: "معتمد",
      completed: "مكتمل",
      passed: "ناجح",
      pending: "قيد الانتظار",
      immediate: "فوري",
      high: "مرتفع",
      medium: "متوسط",
      total: "الإجمالي",
      case: "الحالة",
      type: "النوع",
      biometric: "السجل البيومتري",
      identity: "الهوية",
      confidence: "الثقة",
      priority: "الأولوية",
      status: "الحالة",
      risk: "المخاطر",
      harm: "الضرر",
      protectivePriority: "الأولوية الوقائية",
      currentIdentity: "الهوية الحالية",
      proposedIdentity: "الهوية المقترحة",
      canonicalIdentity: "الهوية المرجعية الصحيحة",
      previousIdentity: "الهوية السابقة",
      verifiedIdentity: "الهوية المتحقق منها",
      biometricRecord: "السجل البيومتري",
      verification: "التحقق",
      no: "لا",
      yes: "نعم",
      notStarted: "لم يبدأ",
      notReady: "غير جاهز",
      notAuthorized: "غير مصرح",
      verifiedClosed: "تم التحقق والإغلاق",
      aiInvestigated: "تم التحقيق بالذكاء الاصطناعي",
      officerReview: "مراجعة الضابط",
      managerApproval: "اعتماد المدير",
      readOnly: "للقراءة فقط",
      masterProtected: "المرجع الرئيسي محمي",
      readOnlyReference: "مرجع للقراءة فقط",
      syntheticDemonstration: "عرض تجريبي اصطناعي",
      continuousMonitoringActive: "المراقبة المستمرة نشطة",
      language: "اللغة",
      english: "English",
      arabic: "العربية",
    },

    sidebar: {
      workspace: "مساحة العمل",
      intelligence: "التحليلات والذكاء",
      commandCenter: "مركز القيادة",
      cases: "الحالات",
      aiInvestigations: "تحقيقات الذكاء الاصطناعي",
      officerReview: "مراجعة الضابط",
      managerApproval: "اعتماد المدير",
      correctionsVerification: "التصحيح والتحقق",
      analytics: "التحليلات",
      dataIntegrity: "سلامة البيانات",
      reportsAudit: "التقارير والتدقيق",
      platformName: "Identity AI",
      platformSubtitle: "منصة مطابقة الهوية",
    },

    commandCenter: {
      eyebrow: "عمليات الهوية بالذكاء الاصطناعي",
      title: "مركز القيادة",
      subtitle:
        "مطابقة مستمرة للهوية، واكتشاف المخاطر الوقائية، وتحقيقات مدعومة بالذكاء الاصطناعي.",

      protectiveEngine: "محرك الأولوية الوقائية نشط",
      protectiveMessage:
        "تم تحديد 9 حالات وقائية ضمن مجموعة البيانات التجريبية الاصطناعية الحالية، حيث قد تؤدي تعارضات الهوية إلى تأثير محتمل على الشخص الخطأ.",
      reviewCases: "مراجعة الحالات",

      totalCases: "إجمالي الحالات",
      totalCasesSubtitle: "حالات سلامة الهوية المجمعة",

      immediatePriority: "أولوية فورية",
      immediatePrioritySubtitle: "أولوية التدخل الوقائي",

      highPriority: "أولوية مرتفعة",
      highPrioritySubtitle: "تتطلب مراجعة بشرية عاجلة",

      unresolvedIdentity: "هوية غير محسومة",
      unresolvedIdentitySubtitle: "جميع الحالات لديها هوية مرجحة",

      demoKpi: "مؤشر تجريبي",
      aiPriorityQueue: "قائمة أولويات الذكاء الاصطناعي",
      casesRequiringAttention: "حالات تتطلب الانتباه",
      viewAllCases: "عرض جميع الحالات",
      aiIdentity: "الهوية المقترحة",

      agenticAi: "وكلاء الذكاء الاصطناعي",
      agentOperations: "عمليات الوكلاء",
      monitoringAgent: "وكيل المراقبة",
      reconciliationAgent: "وكيل المطابقة",
      investigationAgent: "وكيل التحقيق",
      approvalWorkflow: "مسار الاعتماد",
      verificationAgent: "وكيل التحقق",

      latestVerifiedProtectiveCase:
        "أحدث حالة وقائية تم التحقق منها",

      harmImpact: "تأثير الضرر",
      endToEndVerificationPassed:
        "نجح التحقق من البداية إلى النهاية",

      verificationPassedMessage:
        "اجتاز التصحيح المعتمد التحقق اللاحق وتم إغلاق الحالة بعد التحقق.",

      protectiveWrongPersonDetected:
        "تم اكتشاف تأثير وقائي محتمل على الشخص الخطأ",

      protectiveWrongPersonMessage:
        "تم تصنيف تعارض الهوية بأولوية وقائية فورية، ومراجعته من مستويي الاعتماد البشري المطلوبين، وتصحيحه في النظام المسموح ثم التحقق من إغلاقه.",

      viewVerifiedLifecycle:
        "عرض دورة حياة الحالة المتحقق منها",

      platformHealth: "صحة المنصة",
      canonicalCaseResolution: "حسم الهوية المرجعية للحالات",
      protectiveDetection: "الاكتشاف الوقائي",
      unexplainedFalsePositives: "التنبيهات الخاطئة غير المفسرة",

      masterReferenceProtected:
        "المرجع الرئيسي محمي",

      masterProtectionMessage:
        "يبقى المرجع الرئيسي المعتمد للقراءة فقط. تستهدف التصحيحات الآلية فقط بيانات التشغيل المسموح بها في النظام البيومتري وبعد الاعتماد البشري المطلوب.",

      openDataIntegrityCenter:
        "فتح مركز سلامة البيانات",
    },

    cases: {
      title: "الحالات",
      eyebrow: "إدارة حالات الهوية",
      subtitle:
        "مراجعة حالات المطابقة المجمعة والأولويات الوقائية ونتائج حسم الهوية بالذكاء الاصطناعي.",

      totalCases: "إجمالي الحالات",
      immediate: "فوري",
      high: "مرتفع",
      medium: "متوسط",

      protectiveHarmCases:
        "الحالات الوقائية وحالات الضرر",

      searchPlaceholder:
        "البحث عن حالة أو سجل بيومتري أو هوية",

      allCases: "جميع الحالات",
      caseType: "نوع الحالة",
      biometricRecord: "السجل البيومتري",
      identityChange: "تغيير الهوية",
      protectiveScore: "درجة الأولوية الوقائية",

      openInvestigation: "فتح التحقيق",
      detailUnavailable: "التفاصيل غير متاحة في النسخة التجريبية",

      verifiedClosed: "تم التحقق والإغلاق",
      aiInvestigated: "تم التحقيق بالذكاء الاصطناعي",
    },

    caseDetail: {
      backToCases: "العودة إلى الحالات",
      investigation: "تحقيق الذكاء الاصطناعي",
      caseOverview: "نظرة عامة على الحالة",
      identityResolution: "حسم الهوية",
      riskHarmAnalysis: "تحليل المخاطر والضرر",
      approvalLifecycle: "دورة الاعتماد",
      correctionVerification: "التصحيح والتحقق",
      auditHistory: "سجل التدقيق",

      syntheticCorrelation: "المطابقة الاصطناعية",
      identityResolutionEvidence:
        "أدلة حسم الهوية",

      syntheticEvidenceNotice:
        "يستخدم النظام الخلفي مطابقة قائمة على متجهات اصطناعية ولا يعرض درجات منفصلة للوجه أو البصمة أو قزحية العين.",

      canonicalIdentityConfidence:
        "درجة الثقة بالهوية المرجعية",

      supportingFindings: "النتائج الداعمة",
      canonicalCandidate: "الهوية المرجحة",
      evidenceSource: "مصدر الأدلة",
      syntheticVectorEvidence:
        "أدلة المتجهات الاصطناعية",

      postCorrectionBiometricMatch:
        "مطابقة السجل البيومتري بعد التصحيح",

      currentMapping: "الربط الحالي",
      canonicalResolution: "الحسم المرجعي",

      syntheticSupportingEvidence:
        "الأدلة الاصطناعية الداعمة",

      representativeEvidenceNotice:
        "هذا التفصيل يمثل أدلة توضيحية في الواجهة، بينما تظل مقاييس الحالة هي القيم المرجعية المعتمدة للعرض التجريبي.",

      wronglyAffectedPerson:
        "شخص متأثر بشكل خاطئ",

      monitoringOfficerDecision:
        "قرار ضابط المراقبة",

      supervisingManagerDecision:
        "قرار المدير المشرف",

      executionStatus: "حالة التنفيذ",
      verificationStatus: "حالة التحقق",
      verificationScore: "درجة التحقق",
      mappingValid: "ربط الهوية صحيح",
      conflictResolved: "تم حل التعارض",
      secondaryConflict: "تعارض ثانوي",

      auditTrail: "مسار التدقيق",
      traceableEvents: "أحداث قابلة للتتبع",
    },

    officerReview: {
      eyebrow: "الإشراف البشري",
      title: "مراجعة الضابط",
      subtitle:
        "قائمة مراجعة ضابط المراقبة للحالات التي تم التحقيق فيها بالذكاء الاصطناعي.",

      awaitingOfficer: "بانتظار الضابط",
      awaitingManager: "بانتظار المدير",
      immediateCases: "فوري",
      highCases: "مرتفع",
      mediumCases: "متوسط",
      wrongPersonCases: "تأثير على الشخص الخطأ",
      aiInvestigated: "تم التحقيق بالذكاء الاصطناعي",

      reviewQueue: "قائمة مراجعة الضابط",
      queueOrder: "ترتيب القائمة",
      recommendation: "توصية الذكاء الاصطناعي",
      action: "الإجراء",
      reviewCase: "مراجعة الحالة",

      nextRecommended:
        "الحالة التالية الموصى بمراجعتها",

      humanApprovalRequired:
        "يتطلب أي تصحيح اعتمادًا بشريًا قبل التنفيذ.",
    },

    managerApproval: {
      eyebrow: "الاعتماد البشري النهائي",
      title: "اعتماد المدير",
      subtitle:
        "قائمة اعتماد المدير المشرف لمقترحات التصحيح التي وافق عليها الضابط.",

      awaitingManager: "بانتظار المدير",
      immediateCases: "فوري",
      highCases: "مرتفع",
      mediumCases: "متوسط",
      officerApproved: "معتمد من الضابط",
      executionAuthorized: "مصرح بالتنفيذ",

      approvalQueue: "قائمة اعتماد المدير",
      finalReview: "المراجعة النهائية",
      approvalPackage: "حزمة الاعتماد",
      queueOrder: "ترتيب القائمة",

      recommendedCase:
        "الحالة الموصى بمراجعتها نهائيًا",

      twoHumanApproval:
        "يلزم اعتماد بشري من مستويين قبل تنفيذ أي تصحيح.",
    },

    corrections: {
      eyebrow: "المعالجة المصرح بها",
      title: "التصحيح والتحقق",
      subtitle:
        "مساحة تنفيذ التصحيحات المصرح بها والتحقق منها بعد التنفيذ.",

      completedCorrections: "التصحيحات المكتملة",
      verifiedClosed: "تم التحقق والإغلاق",
      pendingAuthorization: "بانتظار التصريح",
      verificationPassed: "نجح التحقق",

      correctionLifecycle: "دورة حياة التصحيح",
      before: "قبل",
      after: "بعد",
      execution: "التنفيذ",
      verification: "التحقق",

      authorizedCorrection:
        "التصحيح المصرح به",

      masterModified:
        "تم تعديل المرجع الرئيسي",

      originalDatasetModified:
        "تم تعديل مجموعة البيانات البيومترية الأصلية",

      protectedSourceMessage:
        "تظل مصادر البيانات المحمية دون تغيير، وتطبق التصحيحات المصرح بها فقط على هدف التشغيل المسموح.",

      verificationPassedMessage:
        "نجح التحقق بعد التصحيح وتم حل تعارض الهوية.",
    },

    analytics: {
      eyebrow: "الذكاء التشغيلي",
      title: "التحليلات",
      subtitle:
        "مقاييس العرض الاصطناعي المعتمدة لجودة المطابقة والاكتشاف الوقائي وعمليات الحالات.",

      totalBiometricRecords: "السجلات البيومترية",
      masterIdentities: "هويات المرجع الرئيسي",
      rawFindings: "النتائج الأولية",
      aggregatedCases: "الحالات المجمعة",

      caseTypeBreakdown: "توزيع أنواع الحالات",
      evidenceFlow: "تدفق الأدلة والحالات",
      qualityMetrics: "مقاييس الجودة",
      operationalSnapshot: "ملخص العمليات",

      dataMismatch: "اختلاف البيانات",
      wrongMapping: "ربط خاطئ",
      complexIdentityConflict:
        "تعارض هوية معقد",
      duplicateIdentity: "هوية مكررة",
      harmImpact: "تأثير ضرر",
      orphan: "سجل دون مرجع",
      criticalHarmIdentityConflict:
        "تعارض هوية ذو ضرر حرج",

      expectedAnomalies: "الشذوذ المتوقع",
      detectedAnomalies: "الشذوذ المكتشف",
      missedAnomalies: "الشذوذ غير المكتشف",
      detectionRecall: "استدعاء الاكتشاف",
      rawPrecision: "الدقة الأولية",
      f1Score: "درجة F1",
      diagnosticPrecision: "الدقة التشخيصية",
      protectiveDetection: "الاكتشاف الوقائي",
      protectivePriorityAccuracy:
        "دقة الأولوية الوقائية",
      unexplainedFalsePositives:
        "التنبيهات الخاطئة غير المفسرة",

      corroboratingFindings:
        "النتائج الداعمة",
      multifindingCases: "الحالات متعددة النتائج",
      protectiveCases: "الحالات الوقائية",

      officerQueue: "قائمة الضابط",
      managerQueue: "قائمة المدير",
      completedCorrection: "تصحيح مكتمل",
      verifiedClosed: "تم التحقق والإغلاق",

      powerBi: "Power BI",
      planned: "مخطط",
      integrationReady: "جاهز للتكامل",
      powerBiMessage:
        "تكامل Power BI مخطط له وغير متصل في النسخة التجريبية الحالية.",
    },

    dataIntegrity: {
      eyebrow: "التحكم في المطابقة",
      title: "سلامة البيانات",
      subtitle:
        "مراقبة حماية المصادر وأدلة المطابقة وحسم الهوية المرجعية.",

      masterReference: "المرجع الرئيسي",
      aiReconciliation: "مطابقة الذكاء الاصطناعي",
      biometricSystem: "النظام البيومتري",

      authoritativeSource:
        "المصدر المعتمد",
      controlledCorrectionTarget:
        "هدف التصحيح الخاضع للتحكم",

      records: "السجلات",
      identities: "الهويات",

      reconciliationSnapshot:
        "مطابقة العرض التجريبي الحالية",

      aggregatedCases: "الحالات المجمعة",
      corroboratingFindings:
        "النتائج الداعمة",

      caseTaxonomy: "تصنيف الحالات",
      qualityValidation: "التحقق من الجودة",

      canonicalResolution:
        "حسم الهوية المرجعية للحالات",
      diagnosticPrecision:
        "الدقة التشخيصية",
      protectiveDetection:
        "الاكتشاف الوقائي",
      protectivePriorityAccuracy:
        "دقة الأولوية الوقائية",

      masterReadOnly:
        "المرجع الرئيسي للقراءة فقط",

      masterReadOnlyMessage:
        "يمكن لمنصة المطابقة المقارنة مع المرجع الرئيسي المعتمد، لكنها لا تستطيع تعديله تلقائيًا.",

      resolutionNotice:
        "حسم الهوية المرجعية لـ 53 من 53 حالة يعني أن لكل حالة هوية مرجحة، ولا يعني أن جميع الحالات الـ53 مغلقة.",
    },

    reportsAudit: {
      eyebrow: "الحوكمة والتتبع",
      title: "التقارير والتدقيق",
      subtitle:
        "سجل حوكمة قابل للتتبع لتحقيقات الذكاء الاصطناعي والاعتمادات البشرية وتنفيذ التصحيح والتحقق.",

      auditEvents: "أحداث التدقيق",
      humanDecisions: "القرارات البشرية",
      controlledAiStages: "مراحل الذكاء الاصطناعي الخاضعة للتحكم",
      verifiedClosed: "تم التحقق والإغلاق",

      selectedAuditCase:
        "الحالة المحددة للتدقيق",

      endToEndAuditTrail:
        "مسار التدقيق من البداية إلى النهاية",

      officerApproval:
        "اعتماد ضابط المراقبة",

      managerApproval:
        "اعتماد المدير المشرف",

      correctionExecution:
        "تنفيذ التصحيح",

      postCorrectionVerification:
        "التحقق بعد التصحيح",

      finalCaseStatus:
        "الحالة النهائية",

      traceable: "قابل للتتبع",
      auditHistory: "سجل التدقيق",

      dataProtection:
        "حماية البيانات",

      masterModified:
        "تم تعديل المرجع الرئيسي",

      originalBiometricModified:
        "تم تعديل البيانات البيومترية الأصلية",

      pdfAuditReport:
        "تقرير التدقيق PDF",

      planned:
        "مخطط",

      pdfMessage:
        "إنشاء تقرير تدقيق PDF مخطط له وغير مفعّل في النسخة التجريبية الحالية.",

      governanceMessage:
        "مراحل الذكاء الاصطناعي خاضعة للتحكم وقابلة للتتبع، وتتطلب قرارات التصحيح الحساسة اعتمادًا بشريًا.",
    },

    priorities: {
      IMMEDIATE: "فوري",
      HIGH: "مرتفع",
      MEDIUM: "متوسط",
    },

    statuses: {
      VERIFIED_CLOSED: "تم التحقق والإغلاق",
      AI_INVESTIGATED: "تم التحقيق بالذكاء الاصطناعي",
      PENDING: "قيد الانتظار",
      APPROVED: "معتمد",
      COMPLETED: "مكتمل",
      PASSED: "ناجح",
      NOT_READY: "غير جاهز",
      NOT_STARTED: "لم يبدأ",
      NOT_AUTHORIZED: "غير مصرح",
    },

    caseTypes: {
      HARM_IMPACT: "تأثير ضرر",
      CRITICAL_HARM_CONFLICT:
        "تعارض ذو ضرر حرج",
      COMPLEX_IDENTITY_CONFLICT:
        "تعارض هوية معقد",
      DATA_MISMATCH: "اختلاف بيانات",
      WRONG_MAPPING: "ربط خاطئ",
      DUPLICATE_IDENTITY: "هوية مكررة",
      ORPHAN: "سجل دون مرجع",
    },

    footer: {
      platform:
        "منصة مطابقة الهوية بالذكاء الاصطناعي",
      demo: "عرض تجريبي اصطناعي",
      monitoring:
        "المراقبة المستمرة نشطة",
    },
  },
};


export default translations;