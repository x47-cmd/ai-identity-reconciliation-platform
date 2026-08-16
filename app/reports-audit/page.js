"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  History,
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
   COMPLETED REPORTS

   Synthetic demonstration history.
   Only the validated demo case has a detail route.
   ========================================================= */

const completedReports = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    person: {
      en:
        "Salem Mohammed Al Kaabi",

      ar:
        "سالم محمد الكعبي",
    },

    issue: {
      en:
        "Incorrect Identity Link",

      ar:
        "ربط هوية غير صحيح",
    },

    aiResult: {
      en:
        "AI identified the correct identity and recommended reassignment.",

      ar:
        "حدد الذكاء الاصطناعي الهوية الصحيحة وأوصى بإعادة الربط.",
    },

    result: {
      en:
        "Corrected & Verified",

      ar:
        "تم التصحيح والتحقق",
    },

    status:
      "VERIFIED",

    hasDetail:
      true,
  },

  {
    id:
      "CASE-2026-00018",

    person: {
      en:
        "Mariam Ahmed Al Nuaimi",

      ar:
        "مريم أحمد النعيمي",
    },

    issue: {
      en:
        "Duplicate Identity",

      ar:
        "هوية مكررة",
    },

    aiResult: {
      en:
        "AI detected a duplicate relationship and prepared a correction recommendation.",

      ar:
        "اكتشف الذكاء الاصطناعي علاقة مكررة وجهز توصية بالتصحيح.",
    },

    result: {
      en:
        "Corrected & Verified",

      ar:
        "تم التصحيح والتحقق",
    },

    status:
      "VERIFIED",

    hasDetail:
      false,
  },

  {
    id:
      "CASE-2026-00021",

    person: {
      en:
        "Khalid Rashid Al Mansoori",

      ar:
        "خالد راشد المنصوري",
    },

    issue: {
      en:
        "Identity Data Mismatch",

      ar:
        "اختلاف في بيانات الهوية",
    },

    aiResult: {
      en:
        "AI detected conflicting identity information and recommended the verified reference.",

      ar:
        "اكتشف الذكاء الاصطناعي اختلافًا في بيانات الهوية وأوصى بالمرجع المتحقق منه.",
    },

    result: {
      en:
        "Reviewed & Closed",

      ar:
        "تمت المراجعة والإغلاق",
    },

    status:
      "CLOSED",

    hasDetail:
      false,
  },
];


/* =========================================================
   VERIFIED DEMO AUDIT HISTORY
   ========================================================= */

const auditHistory = [
  {
    icon:
      BrainCircuit,

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
    icon:
      UserCheck,

    title: {
      en:
        "Officer approval recorded",

      ar:
        "تم تسجيل اعتماد الضابط",
    },

    description: {
      en:
        "The Monitoring Officer reviewed the evidence and approved the recommendation.",

      ar:
        "راجع ضابط المراقبة الأدلة واعتمد التوصية.",
    },
  },

  {
    icon:
      ShieldCheck,

    title: {
      en:
        "Manager approval recorded",

      ar:
        "تم تسجيل اعتماد المدير",
    },

    description: {
      en:
        "The Supervising Manager completed the second approval.",

      ar:
        "أكمل المدير المشرف الاعتماد الثاني.",
    },
  },

  {
    icon:
      FileCheck2,

    title: {
      en:
        "Correction completed",

      ar:
        "تم تنفيذ التصحيح",
    },

    description: {
      en:
        "The approved identity relationship was corrected in the permitted Biometric System.",

      ar:
        "تم تصحيح علاقة الهوية المعتمدة داخل النظام البيومتري المسموح.",
    },
  },

  {
    icon:
      CheckCircle2,

    title: {
      en:
        "Verification passed",

      ar:
        "نجح التحقق",
    },

    description: {
      en:
        "The corrected relationship passed verification and the case was closed.",

      ar:
        "اجتاز الربط المصحح عملية التحقق وتم إغلاق الحالة.",
    },
  },
];


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

export default function ReportsAuditPage() {
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
              <History
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "COMPLETED CASES & AUDIT HISTORY",
                "الحالات المكتملة وسجل التدقيق"
              )}
            </div>


            <h1>
              {L(
                language,
                "Reports & History",
                "التقارير والسجل"
              )}
            </h1>


            <p>
              {L(
                language,
                "Review completed identity cases, AI findings, human approvals, corrections and final verification results.",
                "راجع الحالات المكتملة ونتائج الذكاء الاصطناعي والاعتمادات البشرية والتصحيحات ونتائج التحقق النهائية."
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

          <FileText
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "Completed cases are preserved here for reference and audit",
                "يتم حفظ الحالات المكتملة هنا للرجوع إليها والتدقيق"
              )}
            </strong>


            <span>
              {L(
                language,
                "Each completed case records what the AI detected, what humans approved, what was corrected and whether final verification passed.",
                "تسجل كل حالة مكتملة ما اكتشفه الذكاء الاصطناعي وما تم اعتماده بشريًا وما تم تصحيحه ونتيجة التحقق النهائي."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={History}
            value="3"
            title={
              L(
                language,
                "Completed Reports",
                "تقارير مكتملة"
              )
            }
            description={
              L(
                language,
                "Synthetic case history available",
                "سجل حالات تجريبي متوفر"
              )
            }
          />


          <Metric
            icon={BrainCircuit}
            value="3"
            title={
              L(
                language,
                "AI Investigations",
                "تحقيقات الذكاء الاصطناعي"
              )
            }
            description={
              L(
                language,
                "Recorded in completed reports",
                "مسجلة ضمن التقارير المكتملة"
              )
            }
          />


          <Metric
            icon={UserCheck}
            value="2"
            title={
              L(
                language,
                "Human Approval Levels",
                "مستويات الاعتماد البشري"
              )
            }
            description={
              L(
                language,
                "Officer and Manager",
                "الضابط والمدير"
              )
            }
          />


          <Metric
            icon={CheckCircle2}
            value="1"
            title={
              L(
                language,
                "Fully Verified Demo",
                "حالة تجريبية متحقق منها"
              )
            }
            description={
              L(
                language,
                "End-to-end validated case",
                "حالة مكتملة من البداية للنهاية"
              )
            }
          />

        </section>


        {/* ================================================
            COMPLETED REPORTS
            ================================================ */}

        <section className="panel">

          <div className="panelHeader">

            <div>
              <div className="panelEyebrow">
                {L(
                  language,
                  "REPORT ARCHIVE",
                  "أرشيف التقارير"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Completed Cases",
                  "الحالات المكتملة"
                )}
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
                "5px 18px",
            }}
          >

            {completedReports.map(
              (item) => {

                const name =
                  item.person[
                    language
                  ] ||
                  item.person.en;


                const issue =
                  item.issue[
                    language
                  ] ||
                  item.issue.en;


                const aiResult =
                  item.aiResult[
                    language
                  ] ||
                  item.aiResult.en;


                const result =
                  item.result[
                    language
                  ] ||
                  item.result.en;


                const content = (
                  <div
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "minmax(170px,0.8fr) minmax(180px,0.8fr) minmax(260px,1.4fr) minmax(150px,0.7fr) auto",

                      alignItems:
                        "center",

                      gap:
                        "15px",

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
                        {name}
                      </strong>

                      <span
                        dir="ltr"
                        style={{
                          display:
                            "block",

                          color:
                            "#61738b",

                          fontSize:
                            "9px",

                          marginTop:
                            "4px",
                        }}
                      >
                        {item.id}
                      </span>
                    </div>


                    {/* ISSUE */}

                    <div>
                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#71839a",

                          fontSize:
                            "9px",
                        }}
                      >
                        {L(
                          language,
                          "Identity Issue",
                          "المشكلة"
                        )}
                      </span>

                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#c4d1df",

                          fontSize:
                            "10px",

                          marginTop:
                            "5px",
                        }}
                      >
                        {issue}
                      </strong>
                    </div>


                    {/* AI */}

                    <div>
                      <span
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "5px",

                          color:
                            "#6c8098",

                          fontSize:
                            "9px",
                        }}
                      >
                        <BrainCircuit
                          size={13}
                          aria-hidden="true"
                        />

                        {L(
                          language,
                          "AI Finding",
                          "نتيجة الذكاء الاصطناعي"
                        )}
                      </span>

                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#8da0b7",

                          fontSize:
                            "10px",

                          lineHeight:
                            1.55,

                          marginTop:
                            "5px",
                        }}
                      >
                        {aiResult}
                      </span>
                    </div>


                    {/* RESULT */}

                    <div>
                      <span
                        style={{
                          display:
                            "block",

                          color:
                            "#71839a",

                          fontSize:
                            "9px",
                        }}
                      >
                        {L(
                          language,
                          "Final Result",
                          "النتيجة النهائية"
                        )}
                      </span>

                      <strong
                        style={{
                          display:
                            "block",

                          color:
                            "#59cfa0",

                          fontSize:
                            "10px",

                          marginTop:
                            "5px",
                        }}
                      >
                        {result}
                      </strong>
                    </div>


                    {/* OPEN */}

                    <div>
                      {item.hasDetail && (
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

                            color:
                              "#79a9ff",

                            background:
                              "rgba(70,140,255,0.05)",

                            border:
                              "1px solid rgba(70,140,255,0.10)",
                          }}
                        >
                          <ChevronRight
                            size={16}
                            style={
                              arrowStyle
                            }
                            aria-hidden="true"
                          />
                        </div>
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

                        textDecoration:
                          "none",

                        color:
                          "inherit",
                      }}
                    >
                      {content}
                    </Link>
                  );
                }


                return (
                  <div
                    key={item.id}
                  >
                    {content}
                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* ================================================
            VERIFIED CASE REPORT
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
                  "VERIFIED CASE REPORT",
                  "تقرير حالة متحقق منها"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Salem Mohammed Al Kaabi",
                  "سالم محمد الكعبي"
                )}
              </h2>

              <span
                dir="ltr"
                style={{
                  display:
                    "block",

                  color:
                    "#61738b",

                  fontSize:
                    "9px",

                  marginTop:
                    "5px",
                }}
              >
                {VERIFIED_DEMO_CASE.id}
              </span>
            </div>


            <CheckCircle2
              size={22}
              color="#59cfa0"
              aria-hidden="true"
            />

          </div>


          <div
            style={{
              padding:
                "20px",
            }}
          >

            {/* AI SUMMARY */}

            <div
              style={{
                padding:
                  "16px",

                borderRadius:
                  "11px",

                background:
                  "rgba(70,140,255,0.05)",

                border:
                  "1px solid rgba(70,140,255,0.09)",
              }}
            >
              <strong
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "7px",

                  color:
                    "#d1e1f4",

                  fontSize:
                    "11px",
                }}
              >
                <BrainCircuit
                  size={17}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "AI Investigation Result",
                  "نتيجة تحقيق الذكاء الاصطناعي"
                )}
              </strong>

              <p
                style={{
                  color:
                    "#8498b0",

                  fontSize:
                    "10px",

                  lineHeight:
                    1.7,

                  margin:
                    "8px 0 0",
                }}
              >
                {L(
                  language,
                  "AI identified that the biometric record was linked to the wrong identity and recommended the verified identity reference with high confidence.",
                  "حدد الذكاء الاصطناعي أن السجل البيومتري كان مرتبطًا بالهوية الخطأ، وأوصى بمرجع الهوية الصحيح بدرجة ثقة مرتفعة."
                )}
              </p>
            </div>


            {/* BEFORE / AFTER */}

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "12px",

                marginTop:
                  "14px",
              }}
            >

              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(255,80,100,0.04)",

                  border:
                    "1px solid rgba(255,80,100,0.08)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#956a71",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Previous Incorrect Identity",
                    "الهوية السابقة الخاطئة"
                  )}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#ff7d8a",

                    fontSize:
                      "16px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.execution.before
                  }
                </strong>
              </div>


              <div
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "11px",

                  background:
                    "rgba(52,211,153,0.04)",

                  border:
                    "1px solid rgba(52,211,153,0.08)",
                }}
              >
                <span
                  style={{
                    display:
                      "block",

                    color:
                      "#618b7a",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Verified Identity",
                    "الهوية الصحيحة بعد التحقق"
                  )}
                </span>

                <strong
                  dir="ltr"
                  style={{
                    display:
                      "block",

                    color:
                      "#59cfa0",

                    fontSize:
                      "16px",

                    marginTop:
                      "7px",
                  }}
                >
                  {
                    VERIFIED_DEMO_CASE.execution.after
                  }
                </strong>
              </div>

            </div>


            {/* SUMMARY */}

            <div
              style={{
                marginTop:
                  "14px",
              }}
            >

              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "AI Confidence",
                    "ثقة الذكاء الاصطناعي"
                  )}
                </span>

                <strong>
                  {
                    VERIFIED_DEMO_CASE.aiConfidence
                  }%
                </strong>
              </div>


              <div className="detailRow">
                <span>
                  {L(
                    language,
                    "Officer Approval",
                    "اعتماد الضابط"
                  )}
                </span>

                <strong className="successText">
                  {L(
                    language,
                    "Approved",
                    "معتمد"
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

                <strong className="successText">
                  {L(
                    language,
                    "Approved",
                    "معتمد"
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
                    "Final Verification",
                    "التحقق النهائي"
                  )}
                </span>

                <strong className="successText">
                  {L(
                    language,
                    `Passed · Score ${VERIFIED_DEMO_CASE.verification.score}`,
                    `ناجح · الدرجة ${VERIFIED_DEMO_CASE.verification.score}`
                  )}
                </strong>
              </div>

            </div>


            <Link
              href={
                `/cases/${VERIFIED_DEMO_CASE.id}`
              }
              className="primaryButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              {L(
                language,
                "Open Full Case",
                "فتح الحالة الكاملة"
              )}

              <ChevronRight
                size={17}
                style={
                  arrowStyle
                }
                aria-hidden="true"
              />
            </Link>

          </div>

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
                  "AUDIT TRAIL",
                  "سجل التدقيق"
                )}
              </div>

              <h2>
                {L(
                  language,
                  "Recorded Case History",
                  "تاريخ الحالة المسجل"
                )}
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
                "8px 20px 20px",
            }}
          >

            {auditHistory.map(
              (
                event,
                index
              ) => {

                const Icon =
                  event.icon;


                return (
                  <div
                    key={
                      event.title.en
                    }
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "34px 1fr",

                      gap:
                        "11px",

                      padding:
                        "15px 0",

                      borderBottom:
                        index <
                        auditHistory.length - 1
                          ? "1px solid rgba(255,255,255,0.045)"
                          : "none",
                    }}
                  >

                    <div
                      style={{
                        width:
                          "27px",

                        height:
                          "27px",

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
                      <Icon
                        size={14}
                        aria-hidden="true"
                      />
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
                );
              }
            )}

          </div>

        </section>


        {/* ================================================
            PDF
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

          <FileText
            size={23}
            aria-hidden="true"
          />

          <div>

            <strong>
              {L(
                language,
                "Formal PDF report",
                "تقرير PDF رسمي"
              )}
            </strong>

            <span>
              {L(
                language,
                "The report data is ready in the demonstration model. Downloadable PDF generation is planned for a later implementation stage.",
                "بيانات التقرير جاهزة داخل النموذج التجريبي، وسيتم إضافة إنشاء تقرير PDF قابل للتنزيل في مرحلة لاحقة."
              )}
            </span>

          </div>

        </section>


        {/* ================================================
            AUDIT CONTROL
            ================================================ */}

        <section
          className="integrityInfo"
          style={{
            margin:
              "12px 0 0",

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
                "Full decision traceability",
                "تتبع كامل للقرارات"
              )}
            </strong>

            <span>
              {L(
                language,
                "The history records AI analysis, human approvals, controlled correction and verification so completed cases can be reviewed later.",
                "يسجل السجل تحليل الذكاء الاصطناعي والاعتمادات البشرية والتصحيح الخاضع للتحكم والتحقق حتى يمكن مراجعة الحالات لاحقًا."
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
              "AI Identity Reconciliation Platform · Reports & History",
              "منصة مطابقة الهوية بالذكاء الاصطناعي · التقارير والسجل"
            )}
          </span>


          <div>
            <Activity
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Audit history available",
              "سجل التدقيق متوفر"
            )}
          </div>

        </footer>

      </main>
    </div>
  );
}