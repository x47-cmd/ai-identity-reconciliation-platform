"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { useLanguage } from "../../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  VERIFIED_DEMO_CASE,
} from "../../lib/demo-data";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileSearch,
  GitCompareArrows,
  LockKeyhole,
  ShieldAlert,
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
   DEMO CASES
   ========================================================= */

const cases = {
  [VERIFIED_DEMO_CASE.id]: {
    id:
      VERIFIED_DEMO_CASE.id,

    person: {
      en:
        "Salem Mohammed Al Kaabi",

      ar:
        "سالم محمد الكعبي",
    },

    biometric:
      VERIFIED_DEMO_CASE.biometricId,

    caseType: {
      en:
        "Incorrect Identity Link",

      ar:
        "ربط هوية غير صحيح",
    },

    priority:
      "IMMEDIATE",

    currentIdentity: {
      name: {
        en:
          "Khalid Abdullah Al Mansoori",

        ar:
          "خالد عبدالله المنصوري",
      },

      ref:
        VERIFIED_DEMO_CASE.currentIdentity,
    },

    correctIdentity: {
      name: {
        en:
          "Salem Mohammed Al Kaabi",

        ar:
          "سالم محمد الكعبي",
      },

      ref:
        VERIFIED_DEMO_CASE.canonicalIdentity,
    },

    aiConfidence:
      VERIFIED_DEMO_CASE.aiConfidence,

    aiConclusion: {
      en:
        "AI analysis found that the biometric record was linked to the wrong identity. The combined identity evidence strongly matched Salem Mohammed Al Kaabi instead of the previous identity reference.",

      ar:
        "اكتشف تحليل الذكاء الاصطناعي أن السجل البيومتري كان مرتبطًا بهوية غير صحيحة. وأظهرت الأدلة المجمعة تطابقًا قويًا مع سالم محمد الكعبي بدل الهوية المرتبطة سابقًا.",
    },

    aiReason: {
      en:
        "The system compared the biometric relationship, identity attributes and supporting reconciliation findings. The previous relationship was inconsistent, while the proposed identity produced the strongest combined match.",

      ar:
        "قارن النظام علاقة السجل البيومتري وبيانات الهوية ونتائج المطابقة الداعمة. وتبين أن الربط السابق غير متوافق، بينما حققت الهوية المقترحة أقوى تطابق مجمع.",
    },

    humanImpact: {
      en:
        "The incorrect relationship could have affected another person, so the case was treated as urgent.",

      ar:
        "كان من الممكن أن يؤثر الربط الخاطئ على شخص آخر، لذلك تم التعامل مع الحالة كحالة فورية.",
    },

    officer: {
      status:
        "APPROVED",

      name: {
        en:
          "Demo Monitoring Officer",

        ar:
          "ضابط المراقبة التجريبي",
      },
    },

    manager: {
      status:
        "APPROVED",

      name: {
        en:
          "Demo Supervising Manager",

        ar:
          "المدير المشرف التجريبي",
      },
    },

    execution:
      "COMPLETED",

    verification:
      "PASSED",

    verificationScore:
      VERIFIED_DEMO_CASE.verification.score,

    finalStatus:
      "VERIFIED_CLOSED",

    completed:
      true,

    audit: [
      {
        title: {
          en:
            "AI investigation completed",

          ar:
            "اكتمل تحقيق الذكاء الاصطناعي",
        },

        description: {
          en:
            "AI analyzed the identity evidence and prepared the recommended correction.",

          ar:
            "حلل الذكاء الاصطناعي أدلة الهوية وجهز التصحيح الموصى به.",
        },
      },

      {
        title: {
          en:
            "Officer approved",

          ar:
            "اعتمد ضابط المراقبة",
        },

        description: {
          en:
            "The first human review approved the proposed correction.",

          ar:
            "اعتمدت المراجعة البشرية الأولى التصحيح المقترح.",
        },
      },

      {
        title: {
          en:
            "Manager approved",

          ar:
            "اعتمد المدير",
        },

        description: {
          en:
            "The second human review authorized execution.",

          ar:
            "صرحت المراجعة البشرية الثانية بتنفيذ التصحيح.",
        },
      },

      {
        title: {
          en:
            "Correction completed",

          ar:
            "تم تنفيذ التصحيح",
        },

        description: {
          en:
            "The biometric record was linked to the approved identity.",

          ar:
            "تم ربط السجل البيومتري بالهوية المعتمدة.",
        },
      },

      {
        title: {
          en:
            "Verification passed",

          ar:
            "نجح التحقق",
        },

        description: {
          en:
            "The corrected relationship was verified and the case was closed.",

          ar:
            "تم التحقق من صحة الربط الجديد وإغلاق الحالة.",
        },
      },
    ],
  },


  [COMPLEX_DEMO_CASE.id]: {
    id:
      COMPLEX_DEMO_CASE.id,

    person: {
      en:
        "Ali Saeed Al Dhaheri",

      ar:
        "علي سعيد الظاهري",
    },

    biometric:
      COMPLEX_DEMO_CASE.primaryBiometricId,

    caseType: {
      en:
        "Complex Identity Conflict",

      ar:
        "تعارض هوية معقد",
    },

    priority:
      "HIGH",

    currentIdentity: {
      name: {
        en:
          "Ahmed Rashid Al Nuaimi",

        ar:
          "أحمد راشد النعيمي",
      },

      ref:
        COMPLEX_DEMO_CASE.currentIdentity,
    },

    correctIdentity: {
      name: {
        en:
          "Ali Saeed Al Dhaheri",

        ar:
          "علي سعيد الظاهري",
      },

      ref:
        COMPLEX_DEMO_CASE.canonicalIdentity,
    },

    aiConfidence:
      COMPLEX_DEMO_CASE.aiConfidence,

    aiConclusion: {
      en:
        "AI combined five related findings into one investigation and identified Ali Saeed Al Dhaheri as the strongest identity candidate.",

      ar:
        "جمع الذكاء الاصطناعي خمس نتائج مترابطة داخل تحقيق واحد، وحدد علي سعيد الظاهري كأقوى مرشح للهوية.",
    },

    aiReason: {
      en:
        "Several biometric and identity relationships conflicted with each other. AI reconciliation grouped the related evidence and found that REF-002343 had the strongest overall support.",

      ar:
        "وجد النظام عدة علاقات متعارضة بين السجلات البيومترية والهويات. وقام الذكاء الاصطناعي بتجميع الأدلة المرتبطة ووجد أن REF-002343 لديه أقوى دعم إجمالي.",
    },

    humanImpact: {
      en:
        "The conflict should be reviewed before any identity relationship is changed.",

      ar:
        "يجب مراجعة التعارض قبل إجراء أي تغيير على علاقة الهوية.",
    },

    officer: {
      status:
        "PENDING",

      name: {
        en:
          "Not assigned",

        ar:
          "غير معين",
      },
    },

    manager: {
      status:
        "WAITING",

      name: {
        en:
          "Not available yet",

        ar:
          "غير متاح حاليًا",
      },
    },

    execution:
      "NOT_AUTHORIZED",

    verification:
      "NOT_STARTED",

    verificationScore:
      null,

    finalStatus:
      "AI_INVESTIGATED",

    completed:
      false,

    audit: [
      {
        title: {
          en:
            "Identity conflicts detected",

          ar:
            "تم اكتشاف تعارضات في الهوية",
        },

        description: {
          en:
            "AI reconciliation detected several related inconsistencies.",

          ar:
            "اكتشفت المطابقة بالذكاء الاصطناعي عدة اختلافات مترابطة.",
        },
      },

      {
        title: {
          en:
            "Evidence combined",

          ar:
            "تم تجميع الأدلة",
        },

        description: {
          en:
            "Five related findings were grouped into a single investigation.",

          ar:
            "تم جمع خمس نتائج مترابطة داخل تحقيق واحد.",
        },
      },

      {
        title: {
          en:
            "AI identity recommendation prepared",

          ar:
            "تم تجهيز توصية الذكاء الاصطناعي",
        },

        description: {
          en:
            "REF-002343 was identified as the strongest identity candidate and is waiting for human review.",

          ar:
            "تم تحديد REF-002343 كأقوى مرشح للهوية والحالة الآن بانتظار المراجعة البشرية.",
        },
      },
    ],
  },
};


/* =========================================================
   LABELS
   ========================================================= */

function priorityLabel(
  priority,
  language
) {
  if (
    priority === "IMMEDIATE"
  ) {
    return L(
      language,
      "Urgent",
      "فوري"
    );
  }

  if (
    priority === "HIGH"
  ) {
    return L(
      language,
      "High",
      "مرتفع"
    );
  }

  return L(
    language,
    "Medium",
    "متوسط"
  );
}


function statusLabel(
  status,
  language
) {
  const labels = {
    APPROVED: {
      en:
        "Approved",

      ar:
        "معتمد",
    },

    PENDING: {
      en:
        "Waiting for Review",

      ar:
        "بانتظار المراجعة",
    },

    WAITING: {
      en:
        "Waiting for Officer Approval",

      ar:
        "بانتظار اعتماد الضابط",
    },

    COMPLETED: {
      en:
        "Completed",

      ar:
        "مكتمل",
    },

    NOT_AUTHORIZED: {
      en:
        "Not Authorized",

      ar:
        "غير مصرح بالتنفيذ",
    },

    PASSED: {
      en:
        "Passed",

      ar:
        "ناجح",
    },

    NOT_STARTED: {
      en:
        "Not Started",

      ar:
        "لم يبدأ",
    },

    VERIFIED_CLOSED: {
      en:
        "Resolved & Verified",

      ar:
        "تم الحل والتحقق",
    },

    AI_INVESTIGATED: {
      en:
        "AI Analysis Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
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


/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({
  status,
  language,
}) {
  const success = [
    "APPROVED",
    "COMPLETED",
    "PASSED",
    "VERIFIED_CLOSED",
  ].includes(status);


  const waiting = [
    "PENDING",
    "WAITING",
  ].includes(status);


  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        minHeight:
          "26px",

        padding:
          "0 10px",

        borderRadius:
          "7px",

        color:
          success
            ? "#59cfa0"
            : waiting
              ? "#ffbd67"
              : "#79a9ff",

        background:
          success
            ? "rgba(52,211,153,0.07)"
            : waiting
              ? "rgba(255,185,90,0.06)"
              : "rgba(70,140,255,0.07)",

        border:
          success
            ? "1px solid rgba(52,211,153,0.13)"
            : waiting
              ? "1px solid rgba(255,185,90,0.12)"
              : "1px solid rgba(70,140,255,0.12)",

        fontSize:
          "10px",

        fontWeight:
          800,
      }}
    >
      {statusLabel(
        status,
        language
      )}
    </span>
  );
}


/* =========================================================
   PRIORITY BADGE
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


  return (
    <span className={className}>
      {priorityLabel(
        priority,
        language
      )}
    </span>
  );
}


/* =========================================================
   NOT FOUND
   ========================================================= */

function CaseNotFound({
  language,
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
            />
          ) : (
            <ArrowLeft
              size={16}
            />
          )}

          {L(
            language,
            "Back to Cases",
            "العودة إلى الحالات"
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
          <FileSearch
            size={38}
          />

          <h1>
            {L(
              language,
              "Case not found",
              "الحالة غير موجودة"
            )}
          </h1>
        </div>

      </main>
    </div>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function CasePage() {
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
  } = useLanguage();


  const isArabic =
    language === "ar";


  const caseData =
    cases[caseId];


  if (!caseData) {
    return (
      <CaseNotFound
        language={
          language
        }
      />
    );
  }


  const personName =
    caseData.person[
      language
    ] ||
    caseData.person.en;


  const currentName =
    caseData.currentIdentity.name[
      language
    ] ||
    caseData.currentIdentity.name.en;


  const correctName =
    caseData.correctIdentity.name[
      language
    ] ||
    caseData.correctIdentity.name.en;


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
            BACK
            ================================================ */}

        <Link
          href="/cases"
          className="textButton"
          style={{
            width:
              "fit-content",

            padding:
              0,

            marginBottom:
              "16px",

            textDecoration:
              "none",
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

          {L(
            language,
            "Back to Cases",
            "العودة إلى الحالات"
          )}
        </Link>


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
                "AI CASE INVESTIGATION",
                "تحقيق الحالة بالذكاء الاصطناعي"
              )}
            </div>


            <h1>
              {personName}
            </h1>


            <p>
              {caseData.caseType[
                language
              ] ||
                caseData.caseType.en}
            </p>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                flexWrap:
                  "wrap",

                gap:
                  "8px",

                marginTop:
                  "10px",
              }}
            >
              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "10px",
                }}
              >
                {caseData.id}
              </span>

              <span
                dir="ltr"
                style={{
                  color:
                    "#71839a",

                  fontSize:
                    "10px",
                }}
              >
                {caseData.biometric}
              </span>

              <PriorityBadge
                priority={
                  caseData.priority
                }
                language={
                  language
                }
              />

              <StatusBadge
                status={
                  caseData.finalStatus
                }
                language={
                  language
                }
              />
            </div>

          </div>

        </header>


        {/* ================================================
            IMPORTANT STATUS
            ================================================ */}

        {caseData.completed ? (
          <section
            className="integrityInfo"
            style={{
              margin:
                "0 0 20px",

              padding:
                "18px",
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
                  "Case resolved successfully",
                  "تم حل الحالة بنجاح"
                )}
              </strong>

              <span>
                {L(
                  language,
                  "The approved identity correction was completed and passed the required post-correction verification.",
                  "تم تنفيذ تصحيح الهوية المعتمد واجتاز التحقق المطلوب بعد التصحيح."
                )}
              </span>
            </div>
          </section>
        ) : (
          <section className="alertBanner">

            <div className="alertIcon">
              <Clock3
                size={24}
                aria-hidden="true"
              />
            </div>


            <div className="alertText">
              <strong>
                {L(
                  language,
                  "Human review required",
                  "مراجعة بشرية مطلوبة"
                )}
              </strong>

              <span>
                {L(
                  language,
                  "AI analysis is complete. No identity correction can be executed until the required human approvals are completed.",
                  "اكتمل تحليل الذكاء الاصطناعي، ولا يمكن تنفيذ أي تصحيح للهوية قبل اكتمال الاعتمادات البشرية المطلوبة."
                )}
              </span>
            </div>

          </section>
        )}


        {/* ================================================
            SIMPLE SUMMARY
            ================================================ */}

        <section className="statsGrid">

          <div className="metricCard">

            <div className="metricIcon">
              <BrainCircuit
                size={20}
                aria-hidden="true"
              />
            </div>

            <div className="metricValue">
              {caseData.aiConfidence}%
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
                "Confidence in the recommended identity",
                "الثقة في الهوية التي أوصى بها النظام"
              )}
            </div>

          </div>


          <div className="metricCard">

            <div className="metricIcon">
              <ShieldAlert
                size={20}
                aria-hidden="true"
              />
            </div>

            <div className="metricValue">
              {priorityLabel(
                caseData.priority,
                language
              )}
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Case Priority",
                "أولوية الحالة"
              )}
            </div>

            <div className="metricSubtitle">
              {caseData.humanImpact[
                language
              ] ||
                caseData.humanImpact.en}
            </div>

          </div>


          <div className="metricCard">

            <div className="metricIcon">
              <UserCheck
                size={20}
                aria-hidden="true"
              />
            </div>

            <div
              className="metricValue"
              style={{
                fontSize:
                  "18px",
              }}
            >
              {statusLabel(
                caseData.officer.status,
                language
              )}
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Officer Review",
                "مراجعة الضابط"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "First human review",
                "المراجعة البشرية الأولى"
              )}
            </div>

          </div>


          <div className="metricCard">

            <div className="metricIcon">
              <ShieldCheck
                size={20}
                aria-hidden="true"
              />
            </div>

            <div
              className="metricValue"
              style={{
                fontSize:
                  "18px",
              }}
            >
              {statusLabel(
                caseData.manager.status,
                language
              )}
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Manager Approval",
                "اعتماد المدير"
              )}
            </div>

            <div className="metricSubtitle">
              {L(
                language,
                "Second human approval",
                "الاعتماد البشري الثاني"
              )}
            </div>

          </div>

        </section>


        {/* ================================================
            AI INVESTIGATION
            ================================================ */}

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
                    "What did the AI find?",
                    "ماذا اكتشف الذكاء الاصطناعي؟"
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
                  "20px",
              }}
            >

              <div
                style={{
                  padding:
                    "17px",

                  borderRadius:
                    "12px",

                  background:
                    "rgba(70,140,255,0.055)",

                  border:
                    "1px solid rgba(70,140,255,0.10)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#d7e6f9",

                    fontSize:
                      "12px",
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
                      "#8fa1b7",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.75,

                    margin:
                      "8px 0 0",
                  }}
                >
                  {caseData.aiConclusion[
                    language
                  ] ||
                    caseData.aiConclusion.en}
                </p>
              </div>


              <div
                style={{
                  marginTop:
                    "18px",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#becbda",

                    fontSize:
                      "11px",
                  }}
                >
                  {L(
                    language,
                    "Why did AI reach this conclusion?",
                    "لماذا وصل الذكاء الاصطناعي لهذه النتيجة؟"
                  )}
                </strong>

                <p
                  style={{
                    color:
                      "#7f91a8",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.75,

                    margin:
                      "7px 0 0",
                  }}
                >
                  {caseData.aiReason[
                    language
                  ] ||
                    caseData.aiReason.en}
                </p>
              </div>


              <div
                style={{
                  marginTop:
                    "18px",

                  padding:
                    "14px",

                  borderRadius:
                    "10px",

                  background:
                    "rgba(255,185,90,0.04)",

                  border:
                    "1px solid rgba(255,185,90,0.08)",
                }}
              >
                <strong
                  style={{
                    display:
                      "block",

                    color:
                      "#d4a75e",

                    fontSize:
                      "10px",
                  }}
                >
                  {L(
                    language,
                    "Potential Human Impact",
                    "التأثير المحتمل على الأشخاص"
                  )}
                </strong>

                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#8f8067",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.65,

                    marginTop:
                      "5px",
                  }}
                >
                  {caseData.humanImpact[
                    language
                  ] ||
                    caseData.humanImpact.en}
                </span>
              </div>

            </div>

          </div>


          {/* ==============================================
              CURRENT STATUS
              ============================================== */}

          <div className="panel">

            <div className="panelHeader">

              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "CURRENT STATUS",
                    "الحالة الحالية"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Where is the case now?",
                    "وين وصلت الحالة؟"
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
                  "8px 18px 18px",
              }}
            >

              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "AI Analysis",
                    "تحليل الذكاء الاصطناعي"
                  )}
                </span>

                <strong className="successText">
                  {L(
                    language,
                    "Completed",
                    "مكتمل"
                  )}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Officer Review",
                    "مراجعة الضابط"
                  )}
                </span>

                <strong>
                  {statusLabel(
                    caseData.officer.status,
                    language
                  )}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Manager Approval",
                    "اعتماد المدير"
                  )}
                </span>

                <strong>
                  {statusLabel(
                    caseData.manager.status,
                    language
                  )}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Correction",
                    "التصحيح"
                  )}
                </span>

                <strong>
                  {statusLabel(
                    caseData.execution,
                    language
                  )}
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Verification",
                    "التحقق"
                  )}
                </span>

                <strong>
                  {statusLabel(
                    caseData.verification,
                    language
                  )}
                </strong>
              </div>


              {!caseData.completed && (
                <Link
                  href="/officer-review"
                  className="primaryButton"
                  style={{
                    textDecoration:
                      "none",
                  }}
                >
                  {L(
                    language,
                    "Open Approvals",
                    "فتح الموافقات"
                  )}

                  <ChevronRight
                    size={17}
                    style={
                      arrowStyle
                    }
                    aria-hidden="true"
                  />
                </Link>
              )}

            </div>

          </div>

        </section>


        {/* ================================================
            IDENTITY CORRECTION
            ================================================ */}

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
                  "AI IDENTITY RECOMMENDATION",
                  "توصية الذكاء الاصطناعي للهوية"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "What should be corrected?",
                  "ما هو التصحيح المطلوب؟"
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
              display:
                "grid",

              gridTemplateColumns:
                "1fr auto 1fr",

              alignItems:
                "center",

              gap:
                "16px",

              padding:
                "22px",
            }}
          >

            {/* CURRENT */}

            <div
              style={{
                padding:
                  "20px",

                borderRadius:
                  "13px",

                background:
                  "rgba(255,80,100,0.045)",

                border:
                  "1px solid rgba(255,80,100,0.10)",
              }}
            >

              <span
                style={{
                  color:
                    "#a66f77",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,
                }}
              >
                {caseData.completed
                  ? L(
                      language,
                      "PREVIOUS INCORRECT LINK",
                      "الربط السابق الخاطئ"
                    )
                  : L(
                      language,
                      "CURRENT LINK",
                      "الربط الحالي"
                    )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  color:
                    "#ff8290",

                  fontSize:
                    "15px",

                  marginTop:
                    "13px",
                }}
              >
                {currentName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  color:
                    "#8a666c",

                  fontSize:
                    "10px",

                  marginTop:
                    "5px",
                }}
              >
                {
                  caseData.currentIdentity.ref
                }
              </span>

            </div>


            {/* ARROW */}

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

                color:
                  "#69a2ff",

                background:
                  "rgba(70,140,255,0.08)",
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


            {/* CORRECT */}

            <div
              style={{
                padding:
                  "20px",

                borderRadius:
                  "13px",

                background:
                  "rgba(52,211,153,0.045)",

                border:
                  "1px solid rgba(52,211,153,0.10)",
              }}
            >

              <span
                style={{
                  color:
                    "#61a98d",

                  fontSize:
                    "10px",

                  fontWeight:
                    800,
                }}
              >
                {caseData.completed
                  ? L(
                      language,
                      "VERIFIED IDENTITY",
                      "الهوية الصحيحة بعد التحقق"
                    )
                  : L(
                      language,
                      "AI RECOMMENDED IDENTITY",
                      "الهوية التي أوصى بها الذكاء الاصطناعي"
                    )}
              </span>


              <strong
                style={{
                  display:
                    "block",

                  color:
                    "#59cfa0",

                  fontSize:
                    "15px",

                  marginTop:
                    "13px",
                }}
              >
                {correctName}
              </strong>


              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  color:
                    "#628777",

                  fontSize:
                    "10px",

                  marginTop:
                    "5px",
                }}
              >
                {
                  caseData.correctIdentity.ref
                }
              </span>


              <span
                style={{
                  display:
                    "block",

                  color:
                    "#74a992",

                  fontSize:
                    "9px",

                  marginTop:
                    "9px",
                }}
              >
                {L(
                  language,
                  `AI Confidence ${caseData.aiConfidence}%`,
                  `ثقة الذكاء الاصطناعي ${caseData.aiConfidence}%`
                )}
              </span>

            </div>

          </div>


          <div
            className="integrityInfo"
            style={{
              margin:
                "0 22px 22px",
            }}
          >
            <LockKeyhole
              size={21}
              aria-hidden="true"
            />

            <div>
              <strong>
                {L(
                  language,
                  "Human approval is mandatory",
                  "الاعتماد البشري إلزامي"
                )}
              </strong>

              <span>
                {L(
                  language,
                  "AI can recommend the correction, but it cannot approve or execute a sensitive identity change on its own.",
                  "يمكن للذكاء الاصطناعي اقتراح التصحيح، لكنه لا يستطيع اعتماد أو تنفيذ تغيير حساس على الهوية بشكل مستقل."
                )}
              </span>
            </div>
          </div>

        </section>


        {/* ================================================
            APPROVALS
            ================================================ */}

        <section
          className="dashboardGrid"
          style={{
            marginTop:
              "16px",

            gridTemplateColumns:
              "1fr 1fr",
          }}
        >

          <div className="panel">

            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "FIRST APPROVAL",
                    "الاعتماد الأول"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Monitoring Officer",
                    "ضابط المراقبة"
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
              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Reviewer",
                    "المراجع"
                  )}
                </span>

                <strong>
                  {caseData.officer.name[
                    language
                  ] ||
                    caseData.officer.name.en}
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

                <StatusBadge
                  status={
                    caseData.officer.status
                  }
                  language={
                    language
                  }
                />
              </div>
            </div>

          </div>


          <div className="panel">

            <div className="panelHeader">
              <div>
                <div className="panelEyebrow">
                  {L(
                    language,
                    "SECOND APPROVAL",
                    "الاعتماد الثاني"
                  )}
                </div>

                <h2>
                  {L(
                    language,
                    "Supervising Manager",
                    "المدير المشرف"
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
                  "18px",
              }}
            >
              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Reviewer",
                    "المراجع"
                  )}
                </span>

                <strong>
                  {caseData.manager.name[
                    language
                  ] ||
                    caseData.manager.name.en}
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

                <StatusBadge
                  status={
                    caseData.manager.status
                  }
                  language={
                    language
                  }
                />
              </div>
            </div>

          </div>

        </section>


        {/* ================================================
            CORRECTION / VERIFICATION
            ================================================ */}

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
                  "CORRECTION STATUS",
                  "حالة التصحيح"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Execution & Verification",
                  "التنفيذ والتحقق"
                )}
              </h2>
            </div>

            <CheckCircle2
              size={22}
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3,minmax(0,1fr))",

              gap:
                "10px",

              padding:
                "20px",
            }}
          >

            {[
              {
                label:
                  L(
                    language,
                    "Correction",
                    "التصحيح"
                  ),

                value:
                  caseData.execution,
              },

              {
                label:
                  L(
                    language,
                    "Verification",
                    "التحقق"
                  ),

                value:
                  caseData.verification,
              },

              {
                label:
                  L(
                    language,
                    "Final Status",
                    "الحالة النهائية"
                  ),

                value:
                  caseData.finalStatus,
              },
            ].map(
              (item) => (
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
                    {item.label}
                  </span>

                  <strong
                    style={{
                      display:
                        "block",

                      color:
                        [
                          "COMPLETED",
                          "PASSED",
                          "VERIFIED_CLOSED",
                        ].includes(
                          item.value
                        )
                          ? "#59cfa0"
                          : "#8fa0b5",

                      marginTop:
                        "6px",

                      fontSize:
                        "11px",
                    }}
                  >
                    {statusLabel(
                      item.value,
                      language
                    )}
                  </strong>
                </div>
              )
            )}

          </div>


          {caseData.completed && (
            <div
              className="integrityInfo"
              style={{
                margin:
                  "0 20px 20px",
              }}
            >
              <ShieldCheck
                size={21}
                aria-hidden="true"
              />

              <div>
                <strong>
                  {L(
                    language,
                    `Verification Score: ${caseData.verificationScore}`,
                    `درجة التحقق: ${caseData.verificationScore}`
                  )}
                </strong>

                <span>
                  {L(
                    language,
                    "The corrected identity relationship passed verification and the case was safely closed.",
                    "اجتاز ربط الهوية المصحح عملية التحقق وتم إغلاق الحالة بأمان."
                  )}
                </span>
              </div>
            </div>
          )}

        </section>


        {/* ================================================
            AUDIT HISTORY
            ================================================ */}

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
                  "AUDIT HISTORY",
                  "سجل التدقيق"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Case History",
                  "تاريخ الحالة"
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
                "8px 20px 20px",
            }}
          >

            {caseData.audit.map(
              (
                event,
                index
              ) => (
                <div
                  key={
                    event.title.en
                  }
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "30px 1fr",

                    gap:
                      "11px",

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
                      width:
                        "25px",

                      height:
                        "25px",

                      borderRadius:
                        "50%",

                      display:
                        "grid",

                      placeItems:
                        "center",

                      color:
                        "#69a2ff",

                      background:
                        "rgba(70,140,255,0.08)",
                    }}
                  >
                    {index + 1}
                  </div>


                  <div>

                    <strong
                      style={{
                        display:
                          "block",

                        color:
                          "#cbd7e7",

                        fontSize:
                          "11px",
                      }}
                    >
                      {event.title[
                        language
                      ] ||
                        event.title.en}
                    </strong>


                    <span
                      style={{
                        display:
                          "block",

                        color:
                          "#71839a",

                        fontSize:
                          "10px",

                        lineHeight:
                          1.6,

                        marginTop:
                          "4px",
                      }}
                    >
                      {event.description[
                        language
                      ] ||
                        event.description.en}
                    </span>

                  </div>

                </div>
              )
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
                "AI supports the decision — humans authorize it",
                "الذكاء الاصطناعي يدعم القرار — والإنسان يعتمد"
              )}
            </strong>

            <span>
              {L(
                language,
                "The AI detects, investigates and recommends. Officer and Manager approval are required before sensitive correction. The authoritative Master Reference remains read-only.",
                "يكتشف الذكاء الاصطناعي المشكلة ويحقق فيها ويقدم التوصية، بينما يلزم اعتماد الضابط والمدير قبل أي تصحيح حساس. ويبقى المرجع الرئيسي المعتمد للقراءة فقط."
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
              "AI Identity Reconciliation Platform · Case Investigation",
              "منصة مطابقة الهوية بالذكاء الاصطناعي · تحقيق الحالة"
            )}
          </span>

          <div>
            <BrainCircuit
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "AI-assisted investigation",
              "تحقيق مدعوم بالذكاء الاصطناعي"
            )}
          </div>

        </footer>

      </main>
    </div>
  );
}