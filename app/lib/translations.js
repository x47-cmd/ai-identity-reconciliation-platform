const translations = {
  en: {
    common: {
      searchCase: "Search cases",
      monitoringOfficer: "Monitoring Officer",
      operations: "Identity Operations",
      syntheticDemo: "Demo Data",
      syntheticDemoEnvironment: "Demo Environment",
      systemOperational: "System Active",
      active: "Active",
      ready: "Ready",
      operational: "Active",
      environment: "Environment",
      processingState: "System Status",
      viewDetails: "View Details",
      review: "Review",
      open: "Open",
      approved: "Approved",
      completed: "Completed",
      passed: "Passed",
      failed: "Failed",
      pending: "Pending",
      immediate: "Urgent",
      high: "High",
      medium: "Medium",
      low: "Low",
      total: "Total",
      case: "Case",
      type: "Issue",
      biometric: "Biometric Record",
      identity: "Identity",
      confidence: "AI Confidence",
      priority: "Priority",
      status: "Status",
      risk: "Risk",
      harm: "Potential Impact",
      protectivePriority: "Protection Priority",
      currentIdentity: "Current Identity",
      proposedIdentity: "Recommended Identity",
      canonicalIdentity: "Recommended Identity",
      previousIdentity: "Previous Identity",
      verifiedIdentity: "Verified Identity",
      biometricRecord: "Biometric Record",
      verification: "Verification",
      execution: "Correction",
      before: "Before",
      after: "After",
      score: "Score",
      action: "Action",
      recommendation: "AI Recommendation",
      decision: "Decision",
      no: "No",
      yes: "Yes",
      notStarted: "Not Started",
      notReady: "Waiting",
      notAuthorized: "Not Authorized",
      verifiedClosed: "Resolved & Verified",
      aiInvestigated: "AI Analysis Complete",
      officerReview: "Officer Review",
      managerApproval: "Manager Approval",
      readOnly: "Read Only",
      masterProtected: "Master Reference Protected",
      readOnlyReference: "Read-Only Reference",
      syntheticDemonstration: "Demo Data",
      continuousMonitoringActive: "Continuous Monitoring Active",
      language: "Language",
      english: "English",
      arabic: "العربية",
    },

    sidebar: {
      workspace: "MAIN",
      intelligence: "REPORTING",
      commandCenter: "Home",
      cases: "Cases",
      aiInvestigations: "AI Analysis",
      officerReview: "Approvals",
      managerApproval: "Manager Approval",
      correctionsVerification: "Correction & Verification",
      analytics: "Analytics",
      dataIntegrity: "Data Integrity",
      reportsAudit: "Reports & History",
      platformName: "Identity Integrity",
      platformSubtitle: "AI Monitoring Platform",
    },

    commandCenter: {
      eyebrow: "AI IDENTITY MONITORING",
      title: "Identity Monitoring Dashboard",
      subtitle:
        "Monitor identity relationships, detect problems with AI and send cases requiring action for human review.",

      protectiveEngine: "High-Risk Identity Protection Active",
      protectiveMessage:
        "9 cases were identified where an incorrect identity relationship may affect another person.",
      reviewCases: "View Cases",

      totalCases: "Detected Cases",
      totalCasesSubtitle: "Identity issues detected by the system",

      immediatePriority: "Urgent Cases",
      immediatePrioritySubtitle: "Require priority human attention",

      highPriority: "High Priority",
      highPrioritySubtitle: "Require accelerated review",

      unresolvedIdentity: "Unresolved Identity",
      unresolvedIdentitySubtitle: "Cases without a recommended identity",

      demoKpi: "DEMO DATA",
      aiPriorityQueue: "AI-IDENTIFIED CASES",
      casesRequiringAttention: "Cases Requiring Attention",
      viewAllCases: "View All Cases",
      aiIdentity: "AI Recommendation",

      agenticAi: "AI SYSTEM",
      agentOperations: "Smart Monitoring Status",
      monitoringAgent: "Continuous Monitoring",
      reconciliationAgent: "AI Identity Comparison",
      investigationAgent: "AI Case Analysis",
      approvalWorkflow: "Human Approval Workflow",
      verificationAgent: "Final Verification",

      latestVerifiedProtectiveCase:
        "LATEST RESOLVED CASE",

      harmImpact: "Potential Human Impact",

      endToEndVerificationPassed:
        "Correction Successfully Verified",

      verificationPassedMessage:
        "The approved correction passed final verification and the case was safely closed.",

      protectiveWrongPersonDetected:
        "Possible Wrong-Person Impact Detected",

      protectiveWrongPersonMessage:
        "The system detected an identity conflict that could affect another person. The case was reviewed, approved, corrected and verified.",

      viewVerifiedLifecycle:
        "View Case Details",

      platformHealth: "System Status",

      canonicalCaseResolution:
        "Cases With Recommended Identity",

      protectiveDetection:
        "High-Risk Case Detection",

      unexplainedFalsePositives:
        "Unexplained Alerts",

      masterReferenceProtected:
        "Master Reference Protected",

      masterProtectionMessage:
        "The authoritative Master Reference remains read-only. Approved corrections can only be applied to the permitted Biometric System.",

      openDataIntegrityCenter:
        "View Data Status",
    },

    cases: {
      title: "Cases",
      eyebrow: "AI-DETECTED IDENTITY CASES",
      subtitle:
        "Review identity problems detected by the system and follow each case until it is resolved.",

      totalCases: "Detected Cases",
      immediate: "Urgent",
      high: "High",
      medium: "Medium",

      protectiveHarmCases:
        "Possible Wrong-Person Impact",

      searchPlaceholder:
        "Search case, person or reference",

      allCases: "All Cases",
      caseType: "Issue",
      biometricRecord: "Biometric Record",
      identityChange: "Recommended Change",
      protectiveScore: "Protection Score",

      openInvestigation: "View AI Investigation",
      detailUnavailable: "Detailed demo view is not available for this case",

      verifiedClosed: "RESOLVED & VERIFIED",
      aiInvestigated: "AI ANALYSIS COMPLETE",
    },

    caseDetail: {
      backToCases: "Back to Cases",
      investigation: "AI Investigation",
      caseOverview: "Case Overview",
      identityResolution: "Identity Recommendation",
      riskHarmAnalysis: "Risk & Human Impact",
      approvalLifecycle: "Approval Status",
      correctionVerification: "Correction & Verification",
      auditHistory: "Case History",

      syntheticCorrelation: "AI IDENTITY COMPARISON",

      identityResolutionEvidence:
        "Evidence Supporting the Recommendation",

      syntheticEvidenceNotice:
        "This demonstration uses synthetic biometric-vector evidence and does not contain real biometric or personal data.",

      canonicalIdentityConfidence:
        "AI Identity Confidence",

      supportingFindings:
        "Supporting Findings",

      canonicalCandidate:
        "Recommended Identity",

      evidenceSource:
        "Evidence Source",

      syntheticVectorEvidence:
        "Synthetic Biometric Evidence",

      postCorrectionBiometricMatch:
        "Post-Correction Biometric Verification",

      currentMapping:
        "Current Identity Link",

      canonicalResolution:
        "AI Recommended Identity",

      syntheticSupportingEvidence:
        "SUPPORTING AI EVIDENCE",

      representativeEvidenceNotice:
        "The supporting evidence shown is part of the synthetic demonstration.",

      wronglyAffectedPerson:
        "Possible Impact on Another Person",

      monitoringOfficerDecision:
        "Officer Decision",

      supervisingManagerDecision:
        "Manager Decision",

      executionStatus:
        "Correction Status",

      verificationStatus:
        "Verification Status",

      verificationScore:
        "Verification Score",

      mappingValid:
        "Identity Link Valid",

      conflictResolved:
        "Conflict Resolved",

      secondaryConflict:
        "Additional Conflict",

      auditTrail:
        "Audit History",

      traceableEvents:
        "Recorded Events",
    },

    officerReview: {
      eyebrow: "HUMAN APPROVAL WORKFLOW",
      title: "Approvals",
      subtitle:
        "Review AI recommendations and follow cases through Officer approval, Manager approval, correction and verification.",

      awaitingOfficer:
        "Waiting for Officer",

      awaitingManager:
        "Waiting for Manager",

      immediateCases:
        "Urgent",

      highCases:
        "High",

      mediumCases:
        "Medium",

      wrongPersonCases:
        "Possible Wrong-Person Impact",

      aiInvestigated:
        "AI Analysis Complete",

      reviewQueue:
        "Cases Awaiting Review",

      queueOrder:
        "Priority Order",

      recommendation:
        "AI Recommendation",

      action:
        "Action",

      reviewCase:
        "View Case",

      nextRecommended:
        "Next Priority Case",

      humanApprovalRequired:
        "Human approval is required before any sensitive correction can be executed.",
    },

    managerApproval: {
      eyebrow: "SECOND HUMAN APPROVAL",
      title: "Manager Approval",
      subtitle:
        "Manager review of correction recommendations already approved by the Monitoring Officer.",

      awaitingManager:
        "Waiting for Manager",

      immediateCases:
        "Urgent",

      highCases:
        "High",

      mediumCases:
        "Medium",

      officerApproved:
        "Officer Approved",

      executionAuthorized:
        "Approved for Correction",

      approvalQueue:
        "Cases Awaiting Manager",

      finalReview:
        "Manager Review",

      approvalPackage:
        "Case Information",

      queueOrder:
        "Priority Order",

      recommendedCase:
        "Next Priority Case",

      twoHumanApproval:
        "Officer and Manager approval are required before correction.",
    },

    corrections: {
      eyebrow: "APPROVED CORRECTIONS",
      title: "Correction & Verification",
      subtitle:
        "Track approved identity corrections and confirm that they pass final verification.",

      completedCorrections:
        "Completed Corrections",

      verifiedClosed:
        "Resolved & Verified",

      pendingAuthorization:
        "Waiting for Approval",

      verificationPassed:
        "Verification Passed",

      correctionLifecycle:
        "Correction Status",

      before: "Before",
      after: "After",
      execution: "Correction",
      verification: "Verification",

      authorizedCorrection:
        "Approved Correction",

      masterModified:
        "Master Reference Changed",

      originalDatasetModified:
        "Original Biometric Data Changed",

      protectedSourceMessage:
        "The protected Master Reference remains unchanged. Approved corrections apply only to the permitted Biometric System.",

      verificationPassedMessage:
        "Final verification passed and the identity conflict was resolved.",
    },

    analytics: {
      eyebrow: "AI PERFORMANCE & MANAGEMENT KPIs",
      title: "Analytics",
      subtitle:
        "Management view of identity cases, priorities, AI performance, approvals and resolution results.",

      totalBiometricRecords:
        "Biometric Records",

      masterIdentities:
        "Reference Identities",

      rawFindings:
        "Initial AI Findings",

      aggregatedCases:
        "Detected Cases",

      caseTypeBreakdown:
        "Cases by Issue Type",

      evidenceFlow:
        "Detection Flow",

      qualityMetrics:
        "AI Quality",

      operationalSnapshot:
        "Workflow Status",

      dataMismatch:
        "Data Mismatch",

      wrongMapping:
        "Incorrect Identity Link",

      complexIdentityConflict:
        "Complex Identity Conflict",

      duplicateIdentity:
        "Duplicate Identity",

      harmImpact:
        "Possible Wrong-Person Impact",

      orphan:
        "Missing Identity Link",

      criticalHarmIdentityConflict:
        "Critical Identity Conflict",

      expectedAnomalies:
        "Expected Test Issues",

      detectedAnomalies:
        "Detected Test Issues",

      missedAnomalies:
        "Missed Issues",

      detectionRecall:
        "Detection Rate",

      rawPrecision:
        "Initial Detection Precision",

      f1Score:
        "Overall Detection Score",

      diagnosticPrecision:
        "Final Analysis Accuracy",

      protectiveDetection:
        "High-Risk Case Detection",

      protectivePriorityAccuracy:
        "High-Risk Priority Accuracy",

      unexplainedFalsePositives:
        "Unexplained Alerts",

      corroboratingFindings:
        "Supporting Findings",

      multifindingCases:
        "Cases With Multiple Findings",

      protectiveCases:
        "Possible Wrong-Person Cases",

      officerQueue:
        "Waiting for Officer",

      managerQueue:
        "Waiting for Manager",

      completedCorrection:
        "Correction Completed",

      verifiedClosed:
        "Resolved & Verified",

      powerBi:
        "Power BI",

      planned:
        "PLANNED",

      integrationReady:
        "Reporting Data Ready",

      powerBiMessage:
        "Live Power BI integration is planned and is not connected in the current demonstration.",
    },

    dataIntegrity: {
      eyebrow: "DATA PROTECTION & COMPARISON",
      title: "Data Integrity",
      subtitle:
        "Monitor source protection, identity comparison and system data consistency.",

      masterReference:
        "Master Reference",

      aiReconciliation:
        "AI Identity Comparison",

      biometricSystem:
        "Biometric System",

      authoritativeSource:
        "Authoritative Reference",

      controlledCorrectionTarget:
        "Permitted Correction System",

      records:
        "Records",

      identities:
        "Identities",

      reconciliationSnapshot:
        "Current Comparison Results",

      aggregatedCases:
        "Detected Cases",

      corroboratingFindings:
        "Supporting Findings",

      caseTaxonomy:
        "Issue Types",

      qualityValidation:
        "AI Quality Check",

      canonicalResolution:
        "Cases With Recommended Identity",

      diagnosticPrecision:
        "Final Analysis Accuracy",

      protectiveDetection:
        "High-Risk Case Detection",

      protectivePriorityAccuracy:
        "High-Risk Priority Accuracy",

      masterReadOnly:
        "Master Reference Is Read Only",

      masterReadOnlyMessage:
        "The system can compare data with the authoritative Master Reference but cannot automatically modify it.",

      resolutionNotice:
        "53 of 53 cases have a recommended identity. This does not mean all 53 cases have been approved, corrected or closed.",
    },

    reportsAudit: {
      eyebrow: "COMPLETED CASES & AUDIT HISTORY",
      title: "Reports & History",
      subtitle:
        "Review completed cases, AI findings, human approvals, corrections and final verification results.",

      auditEvents:
        "Recorded Events",

      humanDecisions:
        "Human Approvals",

      controlledAiStages:
        "AI Processing Stages",

      verifiedClosed:
        "Resolved & Verified",

      selectedAuditCase:
        "Selected Case",

      endToEndAuditTrail:
        "Complete Case History",

      officerApproval:
        "Officer Approval",

      managerApproval:
        "Manager Approval",

      correctionExecution:
        "Correction",

      postCorrectionVerification:
        "Final Verification",

      finalCaseStatus:
        "Final Status",

      traceable:
        "Recorded",

      auditHistory:
        "Audit History",

      dataProtection:
        "Data Protection",

      masterModified:
        "Master Reference Changed",

      originalBiometricModified:
        "Original Biometric Data Changed",

      pdfAuditReport:
        "PDF Case Report",

      planned:
        "PLANNED",

      pdfMessage:
        "Downloadable PDF report generation is planned and is not enabled in the current demonstration.",

      governanceMessage:
        "AI analysis and human decisions are recorded. Sensitive corrections require authorized human approval.",
    },

    priorities: {
      IMMEDIATE: "URGENT",
      HIGH: "HIGH",
      MEDIUM: "MEDIUM",
      LOW: "LOW",
    },

    statuses: {
      VERIFIED_CLOSED:
        "RESOLVED & VERIFIED",

      AI_INVESTIGATED:
        "AI ANALYSIS COMPLETE",

      PENDING:
        "PENDING",

      APPROVED:
        "APPROVED",

      COMPLETED:
        "COMPLETED",

      PASSED:
        "PASSED",

      FAILED:
        "FAILED",

      NOT_READY:
        "WAITING",

      NOT_STARTED:
        "NOT STARTED",

      NOT_AUTHORIZED:
        "NOT AUTHORIZED",

      AWAITING_OFFICER:
        "WAITING FOR OFFICER",

      AWAITING_MANAGER:
        "WAITING FOR MANAGER",

      OFFICER_APPROVED:
        "OFFICER APPROVED",

      EXECUTION_AUTHORIZED:
        "APPROVED FOR CORRECTION",
    },

    caseTypes: {
      HARM_IMPACT:
        "POSSIBLE WRONG-PERSON IMPACT",

      CRITICAL_HARM_CONFLICT:
        "CRITICAL IDENTITY CONFLICT",

      CRITICAL_HARM_IDENTITY_CONFLICT:
        "CRITICAL IDENTITY CONFLICT",

      COMPLEX_IDENTITY_CONFLICT:
        "COMPLEX IDENTITY CONFLICT",

      DATA_MISMATCH:
        "DATA MISMATCH",

      WRONG_MAPPING:
        "INCORRECT IDENTITY LINK",

      DUPLICATE_IDENTITY:
        "DUPLICATE IDENTITY",

      ORPHAN:
        "MISSING IDENTITY LINK",

      ORPHAN_RECORD:
        "MISSING IDENTITY LINK",
    },

    footer: {
      platform:
        "AI Identity Reconciliation Platform",

      demo:
        "Synthetic Demo",

      monitoring:
        "Continuous Monitoring Active",
    },
  },


  ar: {
    common: {
      searchCase: "البحث في الحالات",
      monitoringOfficer: "ضابط المراقبة",
      operations: "عمليات الهوية",
      syntheticDemo: "بيانات تجريبية",
      syntheticDemoEnvironment: "بيئة تجريبية",
      systemOperational: "النظام نشط",
      active: "نشط",
      ready: "جاهز",
      operational: "نشط",
      environment: "البيئة",
      processingState: "حالة النظام",
      viewDetails: "عرض التفاصيل",
      review: "مراجعة",
      open: "فتح",
      approved: "معتمد",
      completed: "مكتمل",
      passed: "ناجح",
      failed: "فشل",
      pending: "بانتظار القرار",
      immediate: "فوري",
      high: "مرتفع",
      medium: "متوسط",
      low: "منخفض",
      total: "الإجمالي",
      case: "الحالة",
      type: "المشكلة",
      biometric: "السجل البيومتري",
      identity: "الهوية",
      confidence: "ثقة الذكاء الاصطناعي",
      priority: "الأولوية",
      status: "الحالة",
      risk: "المخاطر",
      harm: "التأثير المحتمل",
      protectivePriority: "أولوية الحماية",
      currentIdentity: "الهوية الحالية",
      proposedIdentity: "الهوية الموصى بها",
      canonicalIdentity: "الهوية الموصى بها",
      previousIdentity: "الهوية السابقة",
      verifiedIdentity: "الهوية الصحيحة بعد التحقق",
      biometricRecord: "السجل البيومتري",
      verification: "التحقق",
      execution: "التصحيح",
      before: "قبل",
      after: "بعد",
      score: "الدرجة",
      action: "الإجراء",
      recommendation: "توصية الذكاء الاصطناعي",
      decision: "القرار",
      no: "لا",
      yes: "نعم",
      notStarted: "لم يبدأ",
      notReady: "بانتظار المرحلة السابقة",
      notAuthorized: "غير مصرح بالتنفيذ",
      verifiedClosed: "تم الحل والتحقق",
      aiInvestigated: "اكتمل تحليل الذكاء الاصطناعي",
      officerReview: "مراجعة الضابط",
      managerApproval: "اعتماد المدير",
      readOnly: "للقراءة فقط",
      masterProtected: "المرجع الرئيسي محمي",
      readOnlyReference: "مرجع للقراءة فقط",
      syntheticDemonstration: "بيانات تجريبية",
      continuousMonitoringActive: "المراقبة المستمرة نشطة",
      language: "اللغة",
      english: "English",
      arabic: "العربية",
    },

    sidebar: {
      workspace: "القائمة الرئيسية",
      intelligence: "التقارير",
      commandCenter: "الرئيسية",
      cases: "الحالات",
      aiInvestigations: "تحليل الذكاء الاصطناعي",
      officerReview: "الموافقات",
      managerApproval: "اعتماد المدير",
      correctionsVerification: "التصحيح والتحقق",
      analytics: "التحليلات",
      dataIntegrity: "سلامة البيانات",
      reportsAudit: "التقارير والسجل",
      platformName: "مراقبة سلامة الهوية",
      platformSubtitle: "منصة مراقبة ذكية",
    },

    commandCenter: {
      eyebrow: "مراقبة الهوية بالذكاء الاصطناعي",

      title:
        "لوحة مراقبة الهوية",

      subtitle:
        "مراقبة علاقات الهوية واكتشاف المشكلات بالذكاء الاصطناعي وتحويل الحالات التي تحتاج إجراء إلى الموظف المختص.",

      protectiveEngine:
        "حماية الحالات عالية الخطورة نشطة",

      protectiveMessage:
        "تم اكتشاف 9 حالات قد يؤدي فيها ربط الهوية بشكل خاطئ إلى التأثير على شخص آخر.",

      reviewCases:
        "عرض الحالات",

      totalCases:
        "الحالات المكتشفة",

      totalCasesSubtitle:
        "مشكلات هوية رصدها النظام",

      immediatePriority:
        "حالات فورية",

      immediatePrioritySubtitle:
        "تحتاج إلى أولوية في المراجعة",

      highPriority:
        "أولوية مرتفعة",

      highPrioritySubtitle:
        "تحتاج إلى مراجعة عاجلة",

      unresolvedIdentity:
        "هويات غير محسومة",

      unresolvedIdentitySubtitle:
        "حالات لم يتم تحديد هوية مرجحة لها",

      demoKpi:
        "بيانات تجريبية",

      aiPriorityQueue:
        "حالات اكتشفها الذكاء الاصطناعي",

      casesRequiringAttention:
        "حالات تحتاج إلى متابعة",

      viewAllCases:
        "عرض جميع الحالات",

      aiIdentity:
        "توصية الذكاء الاصطناعي",

      agenticAi:
        "النظام الذكي",

      agentOperations:
        "حالة المراقبة الذكية",

      monitoringAgent:
        "المراقبة المستمرة",

      reconciliationAgent:
        "مطابقة الهوية بالذكاء الاصطناعي",

      investigationAgent:
        "تحليل الحالات بالذكاء الاصطناعي",

      approvalWorkflow:
        "مسار الاعتماد البشري",

      verificationAgent:
        "التحقق النهائي",

      latestVerifiedProtectiveCase:
        "آخر حالة تم حلها",

      harmImpact:
        "التأثير المحتمل على الأشخاص",

      endToEndVerificationPassed:
        "تم التحقق من التصحيح بنجاح",

      verificationPassedMessage:
        "اجتاز التصحيح المعتمد عملية التحقق النهائي وتم إغلاق الحالة بأمان.",

      protectiveWrongPersonDetected:
        "تم اكتشاف احتمال تأثير على شخص آخر",

      protectiveWrongPersonMessage:
        "اكتشف النظام تعارضًا في الهوية قد يؤثر على شخص آخر، وتمت مراجعته واعتماده وتصحيحه والتحقق منه.",

      viewVerifiedLifecycle:
        "عرض تفاصيل الحالة",

      platformHealth:
        "حالة النظام",

      canonicalCaseResolution:
        "حالات لديها هوية مرجحة",

      protectiveDetection:
        "اكتشاف الحالات الحساسة",

      unexplainedFalsePositives:
        "تنبيهات غير مفسرة",

      masterReferenceProtected:
        "المرجع الرئيسي محمي",

      masterProtectionMessage:
        "يبقى المرجع الرئيسي المعتمد للقراءة فقط، ولا يتم التصحيح إلا على النظام البيومتري المسموح وبعد الاعتمادات المطلوبة.",

      openDataIntegrityCenter:
        "عرض حالة البيانات",
    },

    cases: {
      title:
        "الحالات",

      eyebrow:
        "حالات الهوية المكتشفة بالذكاء الاصطناعي",

      subtitle:
        "راجع مشكلات الهوية التي رصدها النظام وتابع كل حالة حتى يتم حلها.",

      totalCases:
        "الحالات المكتشفة",

      immediate:
        "فوري",

      high:
        "مرتفع",

      medium:
        "متوسط",

      protectiveHarmCases:
        "احتمال تأثير على شخص آخر",

      searchPlaceholder:
        "البحث عن حالة أو شخص أو مرجع",

      allCases:
        "جميع الحالات",

      caseType:
        "المشكلة",

      biometricRecord:
        "السجل البيومتري",

      identityChange:
        "التغيير الموصى به",

      protectiveScore:
        "درجة الحماية",

      openInvestigation:
        "عرض تحقيق الذكاء الاصطناعي",

      detailUnavailable:
        "التفاصيل الكاملة غير متاحة لهذه الحالة التجريبية",

      verifiedClosed:
        "تم الحل والتحقق",

      aiInvestigated:
        "اكتمل تحليل الذكاء الاصطناعي",
    },

    caseDetail: {
      backToCases:
        "العودة إلى الحالات",

      investigation:
        "تحقيق الذكاء الاصطناعي",

      caseOverview:
        "ملخص الحالة",

      identityResolution:
        "توصية الهوية",

      riskHarmAnalysis:
        "المخاطر والتأثير المحتمل",

      approvalLifecycle:
        "حالة الموافقات",

      correctionVerification:
        "التصحيح والتحقق",

      auditHistory:
        "تاريخ الحالة",

      syntheticCorrelation:
        "مطابقة الهوية بالذكاء الاصطناعي",

      identityResolutionEvidence:
        "الأدلة الداعمة للتوصية",

      syntheticEvidenceNotice:
        "يستخدم هذا العرض بيانات بيومترية اصطناعية فقط ولا يحتوي على بيانات شخصية أو بيومترية حقيقية.",

      canonicalIdentityConfidence:
        "ثقة الذكاء الاصطناعي بالهوية",

      supportingFindings:
        "النتائج الداعمة",

      canonicalCandidate:
        "الهوية الموصى بها",

      evidenceSource:
        "مصدر الأدلة",

      syntheticVectorEvidence:
        "أدلة بيومترية اصطناعية",

      postCorrectionBiometricMatch:
        "التحقق البيومتري بعد التصحيح",

      currentMapping:
        "ربط الهوية الحالي",

      canonicalResolution:
        "الهوية التي أوصى بها الذكاء الاصطناعي",

      syntheticSupportingEvidence:
        "أدلة الذكاء الاصطناعي الداعمة",

      representativeEvidenceNotice:
        "الأدلة المعروضة جزء من البيانات التجريبية الاصطناعية.",

      wronglyAffectedPerson:
        "احتمال تأثير على شخص آخر",

      monitoringOfficerDecision:
        "قرار الضابط",

      supervisingManagerDecision:
        "قرار المدير",

      executionStatus:
        "حالة التصحيح",

      verificationStatus:
        "حالة التحقق",

      verificationScore:
        "درجة التحقق",

      mappingValid:
        "ربط الهوية صحيح",

      conflictResolved:
        "تم حل التعارض",

      secondaryConflict:
        "تعارض إضافي",

      auditTrail:
        "سجل التدقيق",

      traceableEvents:
        "الأحداث المسجلة",
    },

    officerReview: {
      eyebrow:
        "مسار الاعتماد البشري",

      title:
        "الموافقات",

      subtitle:
        "راجع توصيات الذكاء الاصطناعي وتابع الحالات من مراجعة الضابط واعتماد المدير وحتى التصحيح والتحقق.",

      awaitingOfficer:
        "بانتظار الضابط",

      awaitingManager:
        "بانتظار المدير",

      immediateCases:
        "فوري",

      highCases:
        "مرتفع",

      mediumCases:
        "متوسط",

      wrongPersonCases:
        "احتمال تأثير على شخص آخر",

      aiInvestigated:
        "اكتمل تحليل الذكاء الاصطناعي",

      reviewQueue:
        "الحالات بانتظار المراجعة",

      queueOrder:
        "ترتيب الأولوية",

      recommendation:
        "توصية الذكاء الاصطناعي",

      action:
        "الإجراء",

      reviewCase:
        "عرض الحالة",

      nextRecommended:
        "الحالة التالية حسب الأولوية",

      humanApprovalRequired:
        "يلزم الاعتماد البشري قبل تنفيذ أي تصحيح حساس.",
    },

    managerApproval: {
      eyebrow:
        "الاعتماد البشري الثاني",

      title:
        "اعتماد المدير",

      subtitle:
        "مراجعة المدير لتوصيات التصحيح التي اعتمدها ضابط المراقبة.",

      awaitingManager:
        "بانتظار المدير",

      immediateCases:
        "فوري",

      highCases:
        "مرتفع",

      mediumCases:
        "متوسط",

      officerApproved:
        "معتمد من الضابط",

      executionAuthorized:
        "معتمد للتصحيح",

      approvalQueue:
        "حالات بانتظار المدير",

      finalReview:
        "مراجعة المدير",

      approvalPackage:
        "معلومات الحالة",

      queueOrder:
        "ترتيب الأولوية",

      recommendedCase:
        "الحالة التالية حسب الأولوية",

      twoHumanApproval:
        "يلزم اعتماد الضابط والمدير قبل تنفيذ التصحيح.",
    },

    corrections: {
      eyebrow:
        "التصحيحات المعتمدة",

      title:
        "التصحيح والتحقق",

      subtitle:
        "متابعة تصحيحات الهوية المعتمدة والتأكد من نجاح التحقق النهائي.",

      completedCorrections:
        "التصحيحات المكتملة",

      verifiedClosed:
        "تم الحل والتحقق",

      pendingAuthorization:
        "بانتظار الاعتماد",

      verificationPassed:
        "نجح التحقق",

      correctionLifecycle:
        "حالة التصحيح",

      before:
        "قبل",

      after:
        "بعد",

      execution:
        "التصحيح",

      verification:
        "التحقق",

      authorizedCorrection:
        "التصحيح المعتمد",

      masterModified:
        "تم تغيير المرجع الرئيسي",

      originalDatasetModified:
        "تم تغيير البيانات البيومترية الأصلية",

      protectedSourceMessage:
        "يبقى المرجع الرئيسي المحمي دون تغيير، وتطبق التصحيحات المعتمدة فقط على النظام البيومتري المسموح.",

      verificationPassedMessage:
        "نجح التحقق النهائي وتم حل تعارض الهوية.",
    },

    analytics: {
      eyebrow:
        "أداء الذكاء الاصطناعي ومؤشرات الإدارة",

      title:
        "التحليلات",

      subtitle:
        "عرض إداري لحالات الهوية والأولويات وأداء الذكاء الاصطناعي والموافقات ونتائج معالجة الحالات.",

      totalBiometricRecords:
        "السجلات البيومترية",

      masterIdentities:
        "الهويات المرجعية",

      rawFindings:
        "نتائج الذكاء الاصطناعي الأولية",

      aggregatedCases:
        "الحالات المكتشفة",

      caseTypeBreakdown:
        "الحالات حسب نوع المشكلة",

      evidenceFlow:
        "مسار الاكتشاف",

      qualityMetrics:
        "جودة الذكاء الاصطناعي",

      operationalSnapshot:
        "حالة سير العمل",

      dataMismatch:
        "اختلاف في البيانات",

      wrongMapping:
        "ربط هوية غير صحيح",

      complexIdentityConflict:
        "تعارض هوية معقد",

      duplicateIdentity:
        "هوية مكررة",

      harmImpact:
        "احتمال تأثير على شخص آخر",

      orphan:
        "سجل بدون هوية مرتبطة",

      criticalHarmIdentityConflict:
        "تعارض هوية حرج",

      expectedAnomalies:
        "المشكلات التجريبية المتوقعة",

      detectedAnomalies:
        "المشكلات التي تم اكتشافها",

      missedAnomalies:
        "مشكلات لم يتم اكتشافها",

      detectionRecall:
        "نسبة اكتشاف الحالات",

      rawPrecision:
        "دقة الاكتشاف الأولي",

      f1Score:
        "مؤشر جودة الاكتشاف",

      diagnosticPrecision:
        "دقة التحليل النهائي",

      protectiveDetection:
        "اكتشاف الحالات الحساسة",

      protectivePriorityAccuracy:
        "دقة تحديد الحالات الحساسة",

      unexplainedFalsePositives:
        "تنبيهات غير مفسرة",

      corroboratingFindings:
        "النتائج الداعمة",

      multifindingCases:
        "حالات لديها عدة نتائج",

      protectiveCases:
        "حالات قد تؤثر على شخص آخر",

      officerQueue:
        "بانتظار الضابط",

      managerQueue:
        "بانتظار المدير",

      completedCorrection:
        "تم التصحيح",

      verifiedClosed:
        "تم الحل والتحقق",

      powerBi:
        "Power BI",

      planned:
        "مخطط له",

      integrationReady:
        "بيانات التقارير جاهزة",

      powerBiMessage:
        "ربط Power BI الفعلي مخطط له وغير متصل في النسخة التجريبية الحالية.",
    },

    dataIntegrity: {
      eyebrow:
        "حماية البيانات والمطابقة",

      title:
        "سلامة البيانات",

      subtitle:
        "مراقبة حماية المصادر ومطابقة الهوية واتساق البيانات بين الأنظمة.",

      masterReference:
        "المرجع الرئيسي",

      aiReconciliation:
        "مطابقة الهوية بالذكاء الاصطناعي",

      biometricSystem:
        "النظام البيومتري",

      authoritativeSource:
        "المرجع المعتمد",

      controlledCorrectionTarget:
        "النظام المسموح بالتصحيح فيه",

      records:
        "السجلات",

      identities:
        "الهويات",

      reconciliationSnapshot:
        "نتائج المطابقة الحالية",

      aggregatedCases:
        "الحالات المكتشفة",

      corroboratingFindings:
        "النتائج الداعمة",

      caseTaxonomy:
        "أنواع المشكلات",

      qualityValidation:
        "فحص جودة الذكاء الاصطناعي",

      canonicalResolution:
        "حالات لديها هوية مرجحة",

      diagnosticPrecision:
        "دقة التحليل النهائي",

      protectiveDetection:
        "اكتشاف الحالات الحساسة",

      protectivePriorityAccuracy:
        "دقة تحديد الحالات الحساسة",

      masterReadOnly:
        "المرجع الرئيسي للقراءة فقط",

      masterReadOnlyMessage:
        "يمكن للنظام مقارنة البيانات مع المرجع الرئيسي المعتمد، لكنه لا يستطيع تعديله تلقائيًا.",

      resolutionNotice:
        "وجود هوية مرجحة لـ53 من 53 حالة لا يعني أن جميع الحالات تمت الموافقة عليها أو تصحيحها أو إغلاقها.",
    },

    reportsAudit: {
      eyebrow:
        "الحالات المكتملة وسجل التدقيق",

      title:
        "التقارير والسجل",

      subtitle:
        "راجع الحالات المكتملة ونتائج الذكاء الاصطناعي والاعتمادات البشرية والتصحيحات ونتائج التحقق النهائية.",

      auditEvents:
        "الأحداث المسجلة",

      humanDecisions:
        "الاعتمادات البشرية",

      controlledAiStages:
        "مراحل معالجة الذكاء الاصطناعي",

      verifiedClosed:
        "تم الحل والتحقق",

      selectedAuditCase:
        "الحالة المحددة",

      endToEndAuditTrail:
        "تاريخ الحالة الكامل",

      officerApproval:
        "اعتماد الضابط",

      managerApproval:
        "اعتماد المدير",

      correctionExecution:
        "التصحيح",

      postCorrectionVerification:
        "التحقق النهائي",

      finalCaseStatus:
        "الحالة النهائية",

      traceable:
        "مسجل",

      auditHistory:
        "سجل التدقيق",

      dataProtection:
        "حماية البيانات",

      masterModified:
        "تم تغيير المرجع الرئيسي",

      originalBiometricModified:
        "تم تغيير البيانات البيومترية الأصلية",

      pdfAuditReport:
        "تقرير الحالة PDF",

      planned:
        "مخطط له",

      pdfMessage:
        "إنشاء تقرير PDF قابل للتنزيل مخطط له وغير مفعّل في النسخة التجريبية الحالية.",

      governanceMessage:
        "يتم تسجيل تحليل الذكاء الاصطناعي والقرارات البشرية، وتتطلب التصحيحات الحساسة اعتماد الموظفين المخولين.",
    },

    priorities: {
      IMMEDIATE:
        "فوري",

      HIGH:
        "مرتفع",

      MEDIUM:
        "متوسط",

      LOW:
        "منخفض",
    },

    statuses: {
      VERIFIED_CLOSED:
        "تم الحل والتحقق",

      AI_INVESTIGATED:
        "اكتمل تحليل الذكاء الاصطناعي",

      PENDING:
        "بانتظار القرار",

      APPROVED:
        "معتمد",

      COMPLETED:
        "مكتمل",

      PASSED:
        "ناجح",

      FAILED:
        "فشل",

      NOT_READY:
        "بانتظار المرحلة السابقة",

      NOT_STARTED:
        "لم يبدأ",

      NOT_AUTHORIZED:
        "غير مصرح بالتنفيذ",

      AWAITING_OFFICER:
        "بانتظار الضابط",

      AWAITING_MANAGER:
        "بانتظار المدير",

      OFFICER_APPROVED:
        "معتمد من الضابط",

      EXECUTION_AUTHORIZED:
        "معتمد للتصحيح",
    },

    caseTypes: {
      HARM_IMPACT:
        "احتمال تأثير على شخص آخر",

      CRITICAL_HARM_CONFLICT:
        "تعارض هوية حرج",

      CRITICAL_HARM_IDENTITY_CONFLICT:
        "تعارض هوية حرج",

      COMPLEX_IDENTITY_CONFLICT:
        "تعارض هوية معقد",

      DATA_MISMATCH:
        "اختلاف في البيانات",

      WRONG_MAPPING:
        "ربط هوية غير صحيح",

      DUPLICATE_IDENTITY:
        "هوية مكررة",

      ORPHAN:
        "سجل بدون هوية مرتبطة",

      ORPHAN_RECORD:
        "سجل بدون هوية مرتبطة",
    },

    footer: {
      platform:
        "منصة مطابقة الهوية بالذكاء الاصطناعي",

      demo:
        "بيانات تجريبية",

      monitoring:
        "المراقبة المستمرة نشطة",
    },
  },
};

export default translations;