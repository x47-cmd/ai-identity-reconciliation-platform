"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  COMPLEX_DEMO_CASE,
  VERIFIED_DEMO_CASE,
} from "../lib/demo-data";

import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
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
   APPROVAL CASES

   Names are synthetic demo identities.
   Only supported detail routes are linked.
   ========================================================= */

const approvalCases = [
  {
    id:
      COMPLEX_DEMO_CASE.id,

    person: {
      en:
        "Ali Saeed Al Dhaheri",

      ar:
        "علي سعيد الظاهري",
    },

    issue: {
      en:
        "Complex Identity Conflict",

      ar:
        "تعارض هوية معقد",
    },

    aiRecommendation: {
      en:
        "AI recommends linking the biometric record to REF-002343.",

      ar:
        "يوصي الذكاء الاصطناعي بربط السجل البيومتري بالهوية REF-002343.",
    },

    confidence:
      `${COMPLEX_DEMO_CASE.aiConfidence}%`,

    priority:
      "HIGH",

    officer:
      "PENDING",

    manager:
      "WAITING",

    correction:
      "NOT_AUTHORIZED",

    verification:
      "NOT_STARTED",

    stage:
      "OFFICER",

    hasDetail:
      true,
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

    issue: {
      en:
        "Critical Identity Conflict",

      ar:
        "تعارض هوية حرج",
    },

    aiRecommendation: {
      en:
        "AI analysis recommends correcting the current identity relationship.",

      ar:
        "يوصي تحليل الذكاء الاصطناعي بتصحيح علاقة الهوية الحالية.",
    },

    confidence:
      "99.96%",

    priority:
      "IMMEDIATE",

    officer:
      "APPROVED",

    manager:
      "PENDING",

    correction:
      "NOT_AUTHORIZED",

    verification:
      "NOT_STARTED",

    stage:
      "MANAGER",

    hasDetail:
      false,
  },


  {
    id:
      "CASE-2026-00006",

    person: {
      en:
        "Mariam Khalid Al Nuaimi",

      ar:
        "مريم خالد النعيمي",
    },

    issue: {
      en:
        "Possible Wrong-Person Impact",

      ar:
        "احتمال تأثير على شخص آخر",
    },

    aiRecommendation: {
      en:
        "AI found a stronger identity candidate and recommends human review.",

      ar:
        "حدد الذكاء الاصطناعي هوية أكثر تطابقًا ويوصي بالمراجعة البشرية.",
    },

    confidence:
      "99.96%",

    priority:
      "IMMEDIATE",

    officer:
      "PENDING",

    manager:
      "WAITING",

    correction:
      "NOT_AUTHORIZED",

    verification:
      "NOT_STARTED",

    stage:
      "OFFICER",

    hasDetail:
      false,
  },


  {
    id:
      "CASE-2026-00009",

    person: {
      en:
        "Fatima Ali Al Suwaidi",

      ar:
        "فاطمة علي السويدي",
    },

    issue: {
      en:
        "Duplicate Identity",

      ar:
        "هوية مكررة",
    },

    aiRecommendation: {
      en:
        "AI recommendation was approved by both human reviewers.",

      ar:
        "تم اعتماد توصية الذكاء الاصطناعي من المراجعين البشريين.",
    },

    confidence:
      "99.92%",

    priority:
      "HIGH",

    officer:
      "APPROVED",

    manager:
      "APPROVED",

    correction:
      "READY",

    verification:
      "NOT_STARTED",

    stage:
      "CORRECTION",

    hasDetail:
      false,
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

    issue: {
      en:
        "Incorrect Identity Link",

      ar:
        "ربط هوية غير صحيح",
    },

    aiRecommendation: {
      en:
        "AI recommendation was approved, corrected and successfully verified.",

      ar:
        "تم اعتماد توصية الذكاء الاصطناعي وتنفيذ التصحيح والتحقق منه بنجاح.",
    },

    confidence:
      `${VERIFIED_DEMO_CASE.aiConfidence}%`,

    priority:
      "IMMEDIATE",

    officer:
      "APPROVED",

    manager:
      "APPROVED",

    correction:
      "COMPLETED",

    verification:
      "PASSED",

    stage:
      "COMPLETED",

    hasDetail:
      true,
  },
];


/* =========================================================
   STATUS LABELS
   ========================================================= */

function statusLabel(
  status,
  language
) {
  const labels = {
    PENDING: {
      en:
        "Waiting",

      ar:
        "بانتظار القرار",
    },

    WAITING: {
      en:
        "Not Available Yet",

      ar:
        "بانتظار المرحلة السابقة",
    },

    APPROVED: {
      en:
        "Approved",

      ar:
        "معتمد",
    },

    NOT_AUTHORIZED: {
      en:
        "Not Authorized",

      ar:
        "غير مصرح بالتنفيذ",
    },

    READY: {
      en:
        "Ready for Correction",

      ar:
        "جاهز للتصحيح",
    },

    COMPLETED: {
      en:
        "Completed",

      ar:
        "تم التصحيح",
    },

    NOT_STARTED: {
      en:
        "Not Started",

      ar:
        "لم يبدأ",
    },

    PASSED: {
      en:
        "Passed",

      ar:
        "تم التحقق",
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
   STAGE
   ========================================================= */

function stageLabel(
  stage,
  language
) {
  const labels = {
    OFFICER: {
      en:
        "Waiting for Officer",

      ar:
        "بانتظار الضابط",
    },

    MANAGER: {
      en:
        "Waiting for Manager",

      ar:
        "بانتظار المدير",
    },

    CORRECTION: {
      en:
        "Approved for Correction",

      ar:
        "معتمد للتصحيح",
    },

    COMPLETED: {
      en:
        "Resolved & Verified",

      ar:
        "تم الحل والتحقق",
    },
  };


  return (
    labels[stage]?.[
      language
    ] ||
    labels[stage]?.en ||
    stage
  );
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


  const label =
    priority === "IMMEDIATE"
      ? L(
          language,
          "Urgent",
          "فوري"
        )
      : priority === "HIGH"
        ? L(
            language,
            "High",
            "مرتفع"
          )
        : L(
            language,
            "Medium",
            "متوسط"
          );


  return (
    <span className={className}>
      {label}
    </span>
  );
}


/* =========================================================
   STATUS VALUE
   ========================================================= */

function StatusValue({
  status,
  language,
}) {
  const success = [
    "APPROVED",
    "COMPLETED",
    "PASSED",
  ].includes(status);


  const warning = [
    "PENDING",
    "READY",
  ].includes(status);


  return (
    <strong
      style={{
        color:
          success
            ? "#59cfa0"
            : warning
              ? "#ffbd67"
              : "#8496ac",

        fontSize:
          "10px",

        lineHeight:
          1.45,
      }}
    >
      {statusLabel(
        status,
        language
      )}
    </strong>
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

export default function ApprovalsPage() {
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
              <BadgeCheck
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "HUMAN APPROVAL WORKFLOW",
                "مسار الاعتماد البشري"
              )}
            </div>


            <h1>
              {L(
                language,
                "Approvals",
                "الموافقات"
              )}
            </h1>


            <p>
              {L(
                language,
                "Follow AI recommendations through Officer review, Manager approval, correction and final verification.",
                "تابع توصيات الذكاء الاصطناعي من مراجعة الضابط واعتماد المدير وحتى التصحيح والتحقق النهائي."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            SIMPLE WORKFLOW
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
                "AI recommends — authorized staff decide",
                "الذكاء الاصطناعي يوصي — والموظفون المخولون يقررون"
              )}
            </strong>

            <span>
              {L(
                language,
                "The AI investigation prepares the recommended correction. Officer and Manager approval are both required before a sensitive identity correction can be executed.",
                "يجهز تحقيق الذكاء الاصطناعي التصحيح الموصى به. ويلزم اعتماد الضابط والمدير قبل تنفيذ أي تصحيح حساس للهوية."
              )}
            </span>
          </div>
        </section>


        {/* ================================================
            KPIs
            ================================================ */}

        <section className="statsGrid">

          <Metric
            icon={UserCheck}
            value="2"
            title={
              L(
                language,
                "Waiting for Officer",
                "بانتظار الضابط"
              )
            }
            description={
              L(
                language,
                "First human decision required",
                "تحتاج إلى القرار البشري الأول"
              )
            }
          />


          <Metric
            icon={BadgeCheck}
            value="1"
            title={
              L(
                language,
                "Waiting for Manager",
                "بانتظار المدير"
              )
            }
            description={
              L(
                language,
                "Officer review already completed",
                "تمت مراجعة الضابط"
              )
            }
          />


          <Metric
            icon={FileCheck2}
            value="1"
            title={
              L(
                language,
                "Ready for Correction",
                "جاهزة للتصحيح"
              )
            }
            description={
              L(
                language,
                "Both approvals completed",
                "اكتمل الاعتمادان"
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
                "Correction and verification completed",
                "اكتمل التصحيح والتحقق"
              )
            }
          />

        </section>


        {/* ================================================
            APPROVAL FLOW
            ================================================ */}

        <section
          className="panel"
          style={{
            marginBottom:
              "16px",

            padding:
              "17px 18px",
          }}
        >

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              gap:
                "8px",

              flexWrap:
                "wrap",
            }}
          >

            {[
              L(
                language,
                "AI Analysis",
                "تحليل الذكاء الاصطناعي"
              ),

              L(
                language,
                "Officer",
                "الضابط"
              ),

              L(
                language,
                "Manager",
                "المدير"
              ),

              L(
                language,
                "Correction",
                "التصحيح"
              ),

              L(
                language,
                "Verification",
                "التحقق"
              ),
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={item}
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap:
                      "8px",
                  }}
                >

                  <div
                    style={{
                      padding:
                        "9px 12px",

                      borderRadius:
                        "9px",

                      background:
                        "rgba(70,140,255,0.05)",

                      border:
                        "1px solid rgba(70,140,255,0.09)",

                      color:
                        "#90a8c7",

                      fontSize:
                        "10px",

                      fontWeight:
                        700,
                    }}
                  >
                    {item}
                  </div>


                  {index < 4 && (
                    <ChevronRight
                      size={14}
                      style={
                        arrowStyle
                      }
                      color="#52647b"
                      aria-hidden="true"
                    />
                  )}

                </div>
              )
            )}

          </div>

        </section>


        {/* ================================================
            CASES
            ================================================ */}

        <section className="panel">

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "APPROVAL STATUS",
                  "حالة الموافقات"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Cases in the Approval Process",
                  "الحالات ضمن مسار الاعتماد"
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
                "5px 18px",
            }}
          >

            {approvalCases.map(
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


                const recommendation =
                  item.aiRecommendation[
                    language
                  ] ||
                  item.aiRecommendation.en;


                const content = (
                  <div
                    style={{
                      padding:
                        "18px 0",

                      borderBottom:
                        "1px solid rgba(255,255,255,0.045)",
                    }}
                  >

                    {/* TOP */}

                    <div
                      style={{
                        display:
                          "flex",

                        alignItems:
                          "flex-start",

                        justifyContent:
                          "space-between",

                        gap:
                          "16px",

                        flexWrap:
                          "wrap",
                      }}
                    >

                      <div>
                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#e0e9f5",

                            fontSize:
                              "13px",
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


                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "8px",

                          flexWrap:
                            "wrap",
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

                        <span
                          style={{
                            color:
                              item.stage ===
                              "COMPLETED"
                                ? "#59cfa0"
                                : item.stage ===
                                  "CORRECTION"
                                  ? "#59cfa0"
                                  : "#79a9ff",

                            fontSize:
                              "10px",

                            fontWeight:
                              800,
                          }}
                        >
                          {stageLabel(
                            item.stage,
                            language
                          )}
                        </span>
                      </div>

                    </div>


                    {/* ISSUE / AI */}

                    <div
                      style={{
                        marginTop:
                          "14px",

                        display:
                          "grid",

                        gridTemplateColumns:
                          "minmax(160px,0.7fr) minmax(240px,1.3fr)",

                        gap:
                          "12px",
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
                              "#c3d0df",

                            fontSize:
                              "11px",

                            marginTop:
                              "5px",
                          }}
                        >
                          {issue}
                        </strong>
                      </div>


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
                              "#71839a",

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
                            "AI Recommendation",
                            "توصية الذكاء الاصطناعي"
                          )}
                        </span>

                        <strong
                          style={{
                            display:
                              "block",

                            color:
                              "#92a6bf",

                            fontSize:
                              "10px",

                            lineHeight:
                              1.6,

                            marginTop:
                              "5px",
                          }}
                        >
                          {recommendation}
                        </strong>

                        <span
                          style={{
                            display:
                              "block",

                            color:
                              "#659eff",

                            fontSize:
                              "9px",

                            marginTop:
                              "5px",
                          }}
                        >
                          {L(
                            language,
                            `AI Confidence ${item.confidence}`,
                            `ثقة الذكاء الاصطناعي ${item.confidence}`
                          )}
                        </span>
                      </div>

                    </div>


                    {/* APPROVAL STATUS */}

                    <div
                      style={{
                        display:
                          "grid",

                        gridTemplateColumns:
                          "repeat(4,minmax(125px,1fr))",

                        gap:
                          "8px",

                        marginTop:
                          "15px",
                      }}
                    >

                      {[
                        {
                          label:
                            L(
                              language,
                              "Officer",
                              "الضابط"
                            ),

                          value:
                            item.officer,
                        },

                        {
                          label:
                            L(
                              language,
                              "Manager",
                              "المدير"
                            ),

                          value:
                            item.manager,
                        },

                        {
                          label:
                            L(
                              language,
                              "Correction",
                              "التصحيح"
                            ),

                          value:
                            item.correction,
                        },

                        {
                          label:
                            L(
                              language,
                              "Verification",
                              "التحقق"
                            ),

                          value:
                            item.verification,
                        },
                      ].map(
                        (step) => (
                          <div
                            key={
                              step.label
                            }
                            style={{
                              padding:
                                "11px",

                              borderRadius:
                                "9px",

                              background:
                                "rgba(255,255,255,0.022)",

                              border:
                                "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <span
                              style={{
                                display:
                                  "block",

                                color:
                                  "#667991",

                                fontSize:
                                  "9px",
                              }}
                            >
                              {
                                step.label
                              }
                            </span>

                            <div
                              style={{
                                marginTop:
                                  "5px",
                              }}
                            >
                              <StatusValue
                                status={
                                  step.value
                                }
                                language={
                                  language
                                }
                              />
                            </div>
                          </div>
                        )
                      )}

                    </div>


                    {/* OPEN */}

                    {item.hasDetail && (
                      <div
                        style={{
                          marginTop:
                            "14px",

                          display:
                            "flex",

                          justifyContent:
                            isArabic
                              ? "flex-start"
                              : "flex-end",
                        }}
                      >
                        <div
                          className="textButton"
                          style={{
                            width:
                              "fit-content",
                          }}
                        >
                          {L(
                            language,
                            "View Case Details",
                            "عرض تفاصيل الحالة"
                          )}

                          <ChevronRight
                            size={15}
                            style={
                              arrowStyle
                            }
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    )}

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
            CONTROL NOTE
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
                "Two human approvals are required",
                "يلزم اعتمادان بشريان"
              )}
            </strong>

            <span>
              {L(
                language,
                "AI can analyze the evidence and recommend a correction, but it cannot approve or execute the correction independently. Officer approval and Manager approval are mandatory.",
                "يمكن للذكاء الاصطناعي تحليل الأدلة واقتراح التصحيح، لكنه لا يستطيع اعتماد أو تنفيذ التصحيح بشكل مستقل. اعتماد الضابط والمدير إلزامي."
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
              "AI Identity Reconciliation Platform · Approvals",
              "منصة مطابقة الهوية بالذكاء الاصطناعي · الموافقات"
            )}
          </span>


          <div>
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            {L(
              language,
              "Human approval controls active",
              "ضوابط الاعتماد البشري نشطة"
            )}
          </div>

        </footer>

      </main>
    </div>
  );
}