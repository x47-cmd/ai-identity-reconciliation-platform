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

   Identity-name policy:
   - First Name + Second Name only
   - No third name
   - No surname
   - No family name
   - No tribe name

   Only the validated demo case has a detail route.
   ========================================================= */

const completedReports = [
  {
    id:
      VERIFIED_DEMO_CASE.id,

    person:
      VERIFIED_DEMO_CASE.person,

    issue: {
      en:
        "Incorrect Biometric Link",

      ar:
        "ربط بيومتري غير صحيح",
    },

    aiResult: {
      en:
        "AI identified the strongest matching reference and recommended correcting the biometric link.",

      ar:
        "حدد الذكاء الاصطناعي أقوى مرجع مطابق وأوصى بتصحيح ربط السجل البيومتري.",
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
        "Mariam Ahmed",

      ar:
        "مريم أحمد",
    },

    issue: {
      en:
        "Duplicate Reference Record",

      ar:
        "تكرار في السجل المرجعي",
    },

    aiResult: {
      en:
        "AI detected a duplicate record relationship and prepared a correction recommendation.",

      ar:
        "اكتشف الذكاء الاصطناعي علاقة مكررة بين السجلات وجهز توصية بالتصحيح.",
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
        "Khalid Rashid",

      ar:
        "خالد راشد",
    },

    issue: {
      en:
        "Reference Data Mismatch",

      ar:
        "اختلاف في البيانات المرجعية",
    },

    aiResult: {
      en:
        "AI detected conflicting record information and recommended the verified reference.",

      ar:
        "اكتشف الذكاء الاصطناعي اختلافًا بين بيانات السجلات وأوصى بالمرجع الذي تم التحقق منه.",
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
        "AI analyzed the biometric and reference evidence and prepared the recommended link correction.",

      ar:
        "حلل الذكاء الاصطناعي الأدلة البيومترية والمرجعية وجهز تصحيح الربط الموصى به.",
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
        "The Monitoring Officer reviewed the evidence and approved the recommended correction.",

      ar:
        "راجع ضابط المراقبة الأدلة واعتمد التصحيح الموصى به.",
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
        "The Supervising Manager completed the required second human approval.",

      ar:
        "أكمل المدير المشرف الاعتماد البشري الثاني المطلوب.",
    },
  },

  {
    icon:
      FileCheck2,

    title: {
      en:
        "Biometric link corrected",

      ar:
        "تم تصحيح الربط البيومتري",
    },

    description: {
      en:
        "The approved biometric record link was corrected in the permitted Biometric System.",

      ar:
        "تم تصحيح ربط السجل البيومتري المعتمد داخل النظام البيومتري المسموح.",
    },
  },

  {
    icon:
      CheckCircle2,

    title: {
      en:
        "Post-correction verification passed",

      ar:
        "نجح التحقق بعد التصحيح",
    },

    description: {
      en:
        "The corrected biometric-to-person relationship passed verification and the case was closed.",

      ar:
        "اجتازت العلاقة المصححة بين السجل البيومتري والشخص عملية التحقق وتم إغلاق الحالة.",
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


  const verifiedPersonName =
    VERIFIED_DEMO_CASE.person?.[
      language
    ]
    ||
    VERIFIED_DEMO_CASE.person?.en
    ||
    VERIFIED_DEMO_CASE.id;


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
                "COMPLETED BIOMETRIC CASES & AUDIT HISTORY",
                "الحالات البيومترية المكتملة وسجل التدقيق"
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
                "Review completed biometric cases, AI investigation results, human approvals, corrections and final verification.",
                "راجع الحالات البيومترية المكتملة ونتائج تحقيق الذكاء الاصطناعي والاعتمادات البشرية والتصحيحات ونتائج التحقق النهائي."
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
                "Completed cases remain available for audit and reference",
                "يتم الاحتفاظ بالحالات المكتملة للرجوع إليها والتدقيق"
              )}
            </strong>


            <span>
              {L(
                language,
                "Each completed case records what the AI detected, the recommended biometric link, the human approvals, the correction performed and the final verification result.",
                "تسجل كل حالة مكتملة ما اكتشفه الذكاء الاصطناعي، والربط البيومتري الموصى به، والاعتمادات البشرية، والتصحيح المنفذ، ونتيجة التحقق النهائي."
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
                "Representative synthetic case history",
                "سجل تمثيلي لحالات تجريبية"
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
                "Recorded in completed case reports",
                "مسجلة ضمن تقارير الحالات المكتملة"
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
                "Full workflow completed successfully",
                "اكتمل مسارها بالكامل بنجاح"
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
                  "CASE ARCHIVE",
                  "أرشيف الحالات"
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
                          "Detected Problem",
                          "المشكلة المكتشفة"
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
                          "AI Investigation Result",
                          "نتيجة تحقيق الذكاء الاصطناعي"
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
                {verifiedPersonName}
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
                {" · "}
                {VERIFIED_DEMO_CASE.biometricId}
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
                  "AI Investigation & Identity Resolution",
                  "تحقيق الذكاء الاصطناعي وحسم الهوية"
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
                  "AI detected that the biometric record was linked to the wrong person and identified the strongest verified reference with high confidence.",
                  "اكتشف الذكاء الاصطناعي أن السجل البيومتري كان مرتبطًا بالشخص الخطأ، وحدد أقوى مرجع صحيح بدرجة ثقة مرتفعة."
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
                    "Previous Incorrect Reference",
                    "المرجع السابق الخاطئ"
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
                    "Verified Reference",
                    "المرجع الصحيح بعد التحقق"
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

                <strong dir="ltr">
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
                    "Biometric Link Correction",
                    "تصحيح الربط البيومتري"
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
                    "Post-Correction Verification",
                    "التحقق بعد التصحيح"
                  )}
                </span>

                <strong
                  className="successText"
                  dir="ltr"
                >
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
                "Open Full Case Investigation",
                "فتح تحقيق الحالة الكامل"
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
                  "TRACEABLE AUDIT HISTORY",
                  "سجل التدقيق القابل للتتبع"
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
                "Formal PDF case report",
                "تقرير حالة رسمي PDF"
              )}
            </strong>


            <span>
              {L(
                language,
                "The structured report data is available in the demonstration model. Downloadable PDF generation is planned for a later implementation stage.",
                "بيانات التقرير المنظمة متوفرة داخل النموذج التجريبي، وسيتم إضافة إنشاء تقرير PDF قابل للتنزيل في مرحلة تنفيذ لاحقة."
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
                "The audit history records AI investigation, human approvals, controlled biometric correction and final verification so completed cases can be reviewed later.",
                "يسجل سجل التدقيق تحقيق الذكاء الاصطناعي والاعتمادات البشرية والتصحيح البيومتري الخاضع للتحكم والتحقق النهائي حتى يمكن مراجعة الحالات المكتملة لاحقًا."
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
              "AI Biometric Reconciliation Platform · Reports & History",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · التقارير والسجل"
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