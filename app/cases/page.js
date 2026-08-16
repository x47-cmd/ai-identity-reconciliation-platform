"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  PLATFORM_METRICS,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileSearch,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   LANGUAGE
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
   REPRESENTATIVE CASES

   Synthetic demonstration names only.
   Only supported detail routes are linked.
   ========================================================= */

const cases = [
  {
    id:
      "CASE-2026-00002",

    person: {
      en:
        "Khalid Rashid Al Mansoori",

      ar:
        "خالد راشد المنصوري",
    },

    issue:
      "HARM_IMPACT",

    aiFinding: {
      en:
        "AI detected that the biometric record may be linked to the wrong person.",

      ar:
        "اكتشف الذكاء الاصطناعي احتمال ربط السجل البيومتري بالشخص الخطأ.",
    },

    confidence:
      99.98,

    priority:
      "IMMEDIATE",

    status:
      "READY_FOR_OFFICER_REVIEW",

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00003",

    person: {
      en:
        "Maryam Ahmed Al Nuaimi",

      ar:
        "مريم أحمد النعيمي",
    },

    issue:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    aiFinding: {
      en:
        "AI detected a critical conflict between linked records with possible wrong-person impact.",

      ar:
        "اكتشف الذكاء الاصطناعي تعارضًا حرجًا بين السجلات المرتبطة مع احتمال التأثير على شخص آخر.",
    },

    confidence:
      99.98,

    priority:
      "IMMEDIATE",

    status:
      "AI_INVESTIGATED",

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00005",

    person: {
      en:
        "Ahmed Saeed Al Shamsi",

      ar:
        "أحمد سعيد الشامسي",
    },

    issue:
      "CRITICAL_HARM_IDENTITY_CONFLICT",

    aiFinding: {
      en:
        "AI analysis confirmed a high-risk record conflict and prepared a correction recommendation.",

      ar:
        "أكد تحليل الذكاء الاصطناعي وجود تعارض عالي الخطورة بين السجلات وتم تجهيز توصية بالتصحيح.",
    },

    confidence:
      99.96,

    priority:
      "IMMEDIATE",

    status:
      "AWAITING_MANAGER_APPROVAL",

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00007",

    person: {
      en:
        "Fatima Ali Al Suwaidi",

      ar:
        "فاطمة علي السويدي",
    },

    issue:
      "WRONG_MAPPING",

    aiFinding: {
      en:
        "AI detected an incorrect biometric-to-person link and identified a stronger matching reference.",

      ar:
        "اكتشف الذكاء الاصطناعي ربطًا غير صحيح بين السجل البيومتري والشخص وحدد مرجعًا آخر أكثر تطابقًا.",
    },

    confidence:
      99.95,

    priority:
      "HIGH",

    status:
      "AI_INVESTIGATED",

    hasDetail:
      false,
  },

  {
    id:
      COMPLEX_DEMO_CASE.id,

    person: {
      en:
        "Ali Saeed Al Dhaheri",

      ar:
        "علي سعيد الظاهري",
    },

    issue:
      COMPLEX_DEMO_CASE.caseType,

    aiFinding: {
      en:
        "AI combined five related findings and identified REF-002343 as the strongest reference candidate.",

      ar:
        "جمع الذكاء الاصطناعي خمس نتائج مترابطة وحدد REF-002343 كأقوى مرجع مطابق للسجل.",
    },

    confidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    priority:
      COMPLEX_DEMO_CASE.priority,

    status:
      COMPLEX_DEMO_CASE.finalStatus,

    hasDetail:
      true,
  },

  {
    id:
      VERIFIED_DEMO_CASE.id,

    person: {
      en:
        "Salem Mohammed Al Kaabi",

      ar:
        "سالم محمد الكعبي",
    },

    issue:
      VERIFIED_DEMO_CASE.caseType,

    aiFinding: {
      en:
        "AI detected an incorrect biometric-to-person link. The approved correction was completed and verified.",

      ar:
        "اكتشف الذكاء الاصطناعي ربطًا غير صحيح للسجل البيومتري، وتم اعتماد التصحيح وتنفيذه والتحقق منه.",
    },

    confidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    priority:
      VERIFIED_DEMO_CASE.priority,

    status:
      VERIFIED_DEMO_CASE.finalStatus,

    hasDetail:
      true,
  },
];


/* =========================================================
   ISSUE LABELS
   ========================================================= */

function getIssueLabel(
  issue,
  language
) {
  const labels = {
    HARM_IMPACT: {
      en:
        "Possible Wrong-Person Impact",

      ar:
        "احتمال تأثير على شخص آخر",
    },

    CRITICAL_HARM_IDENTITY_CONFLICT: {
      en:
        "Critical Record Conflict",

      ar:
        "تعارض حرج في الربط",
    },

    WRONG_MAPPING: {
      en:
        "Incorrect Biometric Link",

      ar:
        "ربط بيومتري غير صحيح",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en:
        "Complex Record Conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Reference Record",

      ar:
        "تكرار في السجل المرجعي",
    },

    DATA_MISMATCH: {
      en:
        "Data Mismatch",

      ar:
        "اختلاف بين البيانات",
    },

    ORPHAN_RECORD: {
      en:
        "Biometric Record Without Reference",

      ar:
        "سجل بيومتري بدون مرجع",
    },
  };


  return (
    labels[issue]?.[
      language
    ] ||
    labels[issue]?.en ||
    issue
  );
}


/* =========================================================
   STATUS
   ========================================================= */

function getStatusLabel(
  status,
  language
) {
  const labels = {
    READY_FOR_OFFICER_REVIEW: {
      en:
        "Waiting for Officer",

      ar:
        "بانتظار الضابط",
    },

    AWAITING_MANAGER_APPROVAL: {
      en:
        "Waiting for Manager",

      ar:
        "بانتظار المدير",
    },

    AI_INVESTIGATED: {
      en:
        "AI Analysis Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
    },

    VERIFIED_CLOSED: {
      en:
        "Resolved & Verified",

      ar:
        "تم الحل والتحقق",
    },
  };


  return (
    labels[status]?.[
      language
    ] ||
    labels[status]?.en ||
    status
  );
}


function getStatusColor(
  status
) {
  if (
    status ===
    "VERIFIED_CLOSED"
  ) {
    return "#59cfa0";
  }


  if (
    status ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return "#ffbd67";
  }


  return "#79a9ff";
}


/* =========================================================
   PRIORITY
   ========================================================= */

function PriorityBadge({
  priority,
  language,
}) {
  const className =
    priority === "IMMEDIATE"
      ? "priority immediate"
      : priority === "HIGH"
        ? "priority high"
        : "priority medium";


  const labels = {
    IMMEDIATE: {
      en:
        "Urgent",

      ar:
        "فوري",
    },

    HIGH: {
      en:
        "High",

      ar:
        "مرتفع",
    },

    MEDIUM: {
      en:
        "Medium",

      ar:
        "متوسط",
    },
  };


  return (
    <span className={className}>
      {labels[
        priority
      ]?.[
        language
      ] ||
        priority}
    </span>
  );
}


/* =========================================================
   METRIC
   ========================================================= */

function Metric({
  icon: Icon,
  value,
  title,
  description,
}) {
  return (
    <div className="metricCard">

      <div className="metricIcon">
        <Icon
          size={20}
          aria-hidden="true"
        />
      </div>


      <div className="metricValue">
        {value}
      </div>


      <div className="metricTitle">
        {title}
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
  const {
    language,
  } = useLanguage();


  const isArabic =
    language === "ar";


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


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
              <BrainCircuit
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI-DETECTED BIOMETRIC CASES",
                "الحالات البيومترية المكتشفة بالذكاء الاصطناعي"
              )}
            </div>


            <h1>
              {L(
                language,
                "Cases",
                "الحالات"
              )}
            </h1>


            <p>
              {L(
                language,

                "Review biometric matching and linking problems detected by the system, understand the AI analysis, and follow each case until it is resolved.",

                "راجع مشكلات المطابقة والربط في السجلات البيومترية التي رصدها النظام، واطلع على تحليل الذكاء الاصطناعي، وتابع كل حالة حتى يتم حلها."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            SIMPLE EXPLANATION
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
          <BrainCircuit
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "How are these cases detected?",
                "كيف يكتشف النظام هذه الحالات؟"
              )}
            </strong>


            <span>
              {L(
                language,

                `AI continuously compares ${PLATFORM_METRICS.biometricRecords.toLocaleString()} biometric records with ${PLATFORM_METRICS.masterIdentities.toLocaleString()} records in the authoritative reference. The current synthetic demo detected ${PLATFORM_METRICS.aggregatedCases} cases that require investigation, review or follow-up.`,

                `يقارن الذكاء الاصطناعي بشكل مستمر ${PLATFORM_METRICS.biometricRecords.toLocaleString()} سجل بيومتري مع ${PLATFORM_METRICS.masterIdentities.toLocaleString()} سجل في المرجع المعتمد. واكتشف العرض التجريبي الحالي ${PLATFORM_METRICS.aggregatedCases} حالة تحتاج إلى تحقيق أو مراجعة أو متابعة.`
              )}
            </span>

          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={FileSearch}
            value={
              PLATFORM_METRICS.aggregatedCases
            }
            title={
              L(
                language,
                "Detected Cases",
                "الحالات المكتشفة"
              )
            }
            description={
              L(
                language,
                "Matching and linking problems detected by the system",
                "مشكلات في المطابقة والربط رصدها النظام"
              )
            }
          />


          <Metric
            icon={CircleAlert}
            value={
              PLATFORM_METRICS.priority.immediate
            }
            title={
              L(
                language,
                "Urgent Cases",
                "حالات فورية"
              )
            }
            description={
              L(
                language,
                "Require priority human attention",
                "تحتاج إلى أولوية في المراجعة"
              )
            }
          />


          <Metric
            icon={UserCheck}
            value="5"
            title={
              L(
                language,
                "Awaiting Review",
                "بانتظار المراجعة"
              )
            }
            description={
              L(
                language,
                "Waiting for a human decision",
                "تنتظر قرارًا بشريًا"
              )
            }
          />


          <Metric
            icon={CheckCircle2}
            value="1"
            title={
              L(
                language,
                "Resolved & Verified",
                "تم الحل والتحقق"
              )
            }
            description={
              L(
                language,
                "Completed demonstration case",
                "حالة تجريبية مكتملة"
              )
            }
          />

        </section>


        {/* ================================================
            URGENT WARNING
            ================================================ */}

        <section className="alertBanner">

          <div className="alertIcon">
            <AlertTriangle
              size={24}
              aria-hidden="true"
            />
          </div>


          <div className="alertText">

            <strong>
              {L(
                language,

                `${PLATFORM_METRICS.wronglyAffectedCases} cases may affect another person`,

                `${PLATFORM_METRICS.wronglyAffectedCases} حالات قد تؤثر على شخص آخر`
              )}
            </strong>


            <span>
              {L(
                language,

                "AI identified these cases as requiring additional protection because an incorrect biometric-to-person link may negatively affect someone else.",

                "حدد الذكاء الاصطناعي هذه الحالات كحالات تحتاج إلى حماية إضافية لأن ربط السجل البيومتري بشخص غير صحيح قد يؤثر سلبًا على شخص آخر."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            CASE LIST
            ================================================ */}

        <section className="panel">

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "CURRENT CASES",
                  "الحالات الحالية"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Cases Requiring Attention",
                  "الحالات التي تحتاج إلى متابعة"
                )}
              </h2>

            </div>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "7px",

                color:
                  "#6f829a",

                fontSize:
                  "10px",
              }}
            >
              <Activity
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "AI monitoring active",
                "المراقبة الذكية نشطة"
              )}
            </div>

          </div>


          <div
            style={{
              padding:
                "4px 18px",
            }}
          >

            {cases.map(
              (item) => {

                const personName =
                  item.person[
                    language
                  ] ||
                  item.person.en;


                const aiFinding =
                  item.aiFinding[
                    language
                  ] ||
                  item.aiFinding.en;


                const row = (
                  <div
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "minmax(170px,0.9fr) minmax(200px,1fr) minmax(250px,1.5fr) minmax(150px,0.8fr) auto",

                      alignItems:
                        "center",

                      gap:
                        "16px",

                      padding:
                        "18px 0",

                      borderBottom:
                        "1px solid rgba(255,255,255,0.045)",
                    }}
                  >

                    {/* PERSON */}

                    <div>

                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#e0e9f5",

                          fontSize:
                            "12px",
                        }}
                      >
                        {personName}
                      </strong>


                      <span
                        dir="ltr"
                        style={{
                          display:
                            "block",

                          marginTop:
                            "4px",

                          color:
                            "#61738b",

                          fontSize:
                            "9px",
                        }}
                      >
                        {item.id}
                      </span>

                    </div>


                    {/* ISSUE */}

                    <div>

                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#c3d0df",

                          fontSize:
                            "11px",
                        }}
                      >
                        {getIssueLabel(
                          item.issue,
                          language
                        )}
                      </strong>


                      <span
                        style={{
                          display:
                            "block",

                          marginTop:
                            "5px",

                          color:
                            "#6d8098",

                          fontSize:
                            "9px",
                        }}
                      >
                        {L(
                          language,
                          `AI Confidence: ${item.confidence}%`,
                          `ثقة الذكاء الاصطناعي: ${item.confidence}%`
                        )}
                      </span>

                    </div>


                    {/* AI FINDING */}

                    <div>

                      <div
                        style={{
                          display:
                            "flex",

                          gap:
                            "7px",

                          alignItems:
                            "flex-start",
                        }}
                      >
                        <BrainCircuit
                          size={15}
                          color="#69a2ff"
                          aria-hidden="true"
                        />

                        <span
                          style={{
                            color:
                              "#8193aa",

                            fontSize:
                              "10px",

                            lineHeight:
                              1.55,
                          }}
                        >
                          {aiFinding}
                        </span>

                      </div>

                    </div>


                    {/* STATUS */}

                    <div>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            getStatusColor(
                              item.status
                            ),

                          fontSize:
                            "10px",

                          fontWeight:
                            750,

                          lineHeight:
                            1.45,
                        }}
                      >
                        {getStatusLabel(
                          item.status,
                          language
                        )}
                      </span>


                      <div
                        style={{
                          marginTop:
                            "7px",
                        }}
                      >
                        <PriorityBadge
                          priority={
                            item.priority
                          }
                          language={
                            language
                          }
                        />
                      </div>

                    </div>


                    {/* OPEN */}

                    <div>

                      {item.hasDetail ? (
                        <div
                          style={{
                            width:
                              "34px",

                            height:
                              "34px",

                            borderRadius:
                              "9px",

                            display:
                              "grid",

                            placeItems:
                              "center",

                            border:
                              "1px solid rgba(90,150,255,0.13)",

                            color:
                              "#79a9ff",

                            background:
                              "rgba(70,140,255,0.05)",
                          }}
                        >
                          <ChevronRight
                            size={17}
                            style={
                              arrowStyle
                            }
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width:
                              "34px",

                            height:
                              "34px",
                          }}
                        />
                      )}

                    </div>

                  </div>
                );


                if (
                  item.hasDetail
                ) {
                  return (
                    <Link
                      key={item.id}
                      href={
                        `/cases/${item.id}`
                      }
                      style={{
                        display:
                          "block",

                        color:
                          "inherit",

                        textDecoration:
                          "none",
                      }}
                    >
                      {row}
                    </Link>
                  );
                }


                return (
                  <div
                    key={item.id}
                  >
                    {row}
                  </div>
                );
              }
            )}

          </div>


          <div
            style={{
              padding:
                "14px 18px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              color:
                "#657890",

              fontSize:
                "9px",

              lineHeight:
                1.6,
            }}
          >
            {L(
              language,

              `This screen shows representative demonstration cases. The validated synthetic dataset contains ${PLATFORM_METRICS.aggregatedCases} detected cases in total.`,

              `تعرض هذه الشاشة حالات تجريبية تمثيلية، بينما تحتوي مجموعة البيانات الاصطناعية المعتمدة على ${PLATFORM_METRICS.aggregatedCases} حالة مكتشفة إجمالًا.`
            )}
          </div>

        </section>


        {/* ================================================
            GOVERNANCE
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "16px 0 0",

            padding:
              "18px",
          }}
        >
          <ShieldCheck
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "AI analyzes — authorized staff decide",
                "الذكاء الاصطناعي يحلل — والموظف المخول يقرر"
              )}
            </strong>


            <span>
              {L(
                language,

                "AI detects biometric matching and linking problems, analyzes the evidence and recommends the most likely correction. Sensitive changes still require authorized human approval before execution.",

                "يكتشف الذكاء الاصطناعي مشكلات المطابقة والربط في السجلات البيومترية، ويحلل الأدلة ويقترح التصحيح المرجح، بينما تتطلب التغييرات الحساسة اعتماد الموظفين المخولين قبل التنفيذ."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            FOOTER
            ================================================ */}

        <footer className="footer">

          <span>
            {L(
              language,
              "AI Biometric Reconciliation Platform · Cases",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · الحالات"
            )}
          </span>


          <div>

            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Continuous Monitoring Active",
              "المراقبة المستمرة نشطة"
            )}

          </div>

        </footer>

      </main>

    </div>
  );
}