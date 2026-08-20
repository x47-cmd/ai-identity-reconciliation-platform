"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "../../components/Sidebar";
import { useLanguage } from "../../components/LanguageProvider";

import {
  ACTIVE_CASES,
  PLATFORM_METRICS,
} from "../../lib/demo-data";

import {
  initializeDemoCaseStore,
  useCaseStore,
} from "../../lib/case-store";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  CircleAlert,
  FileSearch,
  Filter,
  Search,
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
        "Critical Identity Conflict",

      ar:
        "تعارض هوية حرج",
    },

    WRONG_MAPPING: {
      en:
        "Incorrect Identity Link",

      ar:
        "ربط هوية غير صحيح",
    },

    COMPLEX_IDENTITY_CONFLICT: {
      en:
        "Complex Record Conflict",

      ar:
        "تعارض معقد بين السجلات",
    },

    DUPLICATE_IDENTITY: {
      en:
        "Duplicate Identity",

      ar:
        "سجل هوية مكرر",
    },

    DATA_MISMATCH: {
      en:
        "Data Mismatch",

      ar:
        "اختلاف في البيانات",
    },

    ORPHAN_RECORD: {
      en:
        "Missing Identity Link",

      ar:
        "سجل بدون مرجع مرتبط",
    },
  };


  return (
    labels[
      issue
    ]?.[
      language
    ] ||
    labels[
      issue
    ]?.en ||
    issue
  );
}


/* =========================================================
   STATUS LABELS
   ========================================================= */

function getStatusLabel(
  status,
  language
) {
  const labels = {
    AI_INVESTIGATED: {
      en:
        "AI Analysis Complete",

      ar:
        "اكتمل تحليل الذكاء الاصطناعي",
    },

    READY_FOR_OFFICER_REVIEW: {
      en:
        "Waiting for Employee Review",

      ar:
        "بانتظار تدقيق الموظف",
    },

    AWAITING_MANAGER_APPROVAL: {
      en:
        "Waiting for Manager",

      ar:
        "بانتظار موافقة المدير",
    },

    READY_FOR_CORRECTION: {
      en:
        "Ready for Correction",

      ar:
        "جاهزة لتنفيذ التعديل",
    },

    AWAITING_VERIFICATION: {
      en:
        "Waiting for Verification",

      ar:
        "بانتظار التحقق",
    },

    VERIFICATION_FAILED: {
      en:
        "Verification Requires Review",

      ar:
        "التحقق يحتاج إلى مراجعة",
    },

    OFFICER_REJECTED: {
      en:
        "Returned by Employee",

      ar:
        "لم تعتمد من الموظف",
    },

    MANAGER_REJECTED: {
      en:
        "Not Approved by Manager",

      ar:
        "لم تعتمد من المدير",
    },
  };


  return (
    labels[
      status
    ]?.[
      language
    ] ||
    labels[
      status
    ]?.en ||
    status
  );
}


/* =========================================================
   PRIORITY
   ========================================================= */

function getPriorityLabel(
  priority,
  language
) {
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
    labels[
      priority
    ]?.[
      language
    ] ||
    priority
  );
}


function PriorityBadge({
  priority,
  language,
}) {
  const className =
    priority ===
    "IMMEDIATE"
      ? "priority immediate"
      : priority ===
        "HIGH"
        ? "priority high"
        : "priority medium";


  return (
    <span className={className}>
      {getPriorityLabel(
        priority,
        language
      )}
    </span>
  );
}


/* =========================================================
   STATUS COLORS
   ========================================================= */

function getStatusColors(
  status
) {
  if (
    status ===
    "READY_FOR_OFFICER_REVIEW"
  ) {
    return {
      color:
        "#59cfa0",

      background:
        "rgba(89,207,160,0.07)",

      border:
        "rgba(89,207,160,0.18)",
    };
  }


  if (
    status ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return {
      color:
        "#ffbd67",

      background:
        "rgba(255,189,103,0.07)",

      border:
        "rgba(255,189,103,0.18)",
    };
  }


  if (
    status ===
    "READY_FOR_CORRECTION"
  ) {
    return {
      color:
        "#59cfa0",

      background:
        "rgba(89,207,160,0.07)",

      border:
        "rgba(89,207,160,0.18)",
    };
  }


  if (
    status ===
    "VERIFICATION_FAILED"
  ) {
    return {
      color:
        "#ff7c89",

      background:
        "rgba(255,80,100,0.07)",

      border:
        "rgba(255,80,100,0.18)",
    };
  }


  return {
    color:
      "#79a9ff",

    background:
      "rgba(121,169,255,0.07)",

    border:
      "rgba(121,169,255,0.17)",
  };
}


/* =========================================================
   NEXT ACTION
   ========================================================= */

function getCaseAction(
  item,
  language
) {
  const status =
    item.workflowStatus ||
    item.finalStatus;


  if (
    status ===
    "READY_FOR_OFFICER_REVIEW"
  ) {
    return {
      href:
        `/officer-review?case=${item.id}`,

      label:
        L(
          language,
          "Start Employee Review",
          "بدء تدقيق الموظف"
        ),

      color:
        "#59cfa0",
    };
  }


  if (
    status ===
    "AWAITING_MANAGER_APPROVAL"
  ) {
    return {
      href:
        `/manager-approval?case=${item.id}`,

      label:
        L(
          language,
          "Open Manager Approval",
          "فتح موافقة المدير"
        ),

      color:
        "#ffbd67",
    };
  }


  if (
    status ===
    "READY_FOR_CORRECTION"
  ) {
    return {
      href:
        `/corrections-verification?case=${item.id}`,

      label:
        L(
          language,
          "Execute Correction",
          "تنفيذ التعديل"
        ),

      color:
        "#59cfa0",
    };
  }


  if (
    status ===
      "AWAITING_VERIFICATION" ||
    status ===
      "VERIFICATION_FAILED"
  ) {
    return {
      href:
        `/corrections-verification?case=${item.id}`,

      label:
        L(
          language,
          "Open Verification",
          "فتح التحقق"
        ),

      color:
        "#79a9ff",
    };
  }


  return {
    href:
      `/cases/${item.id}`,

    label:
      L(
        language,
        "View Analysis",
        "عرض تحليل الحالة"
      ),

    color:
      "#79a9ff",
  };
}


/* =========================================================
   FILTER BUTTON
   ========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      style={{
        minHeight:
          "34px",

        padding:
          "0 12px",

        borderRadius:
          "9px",

        border:
          active
            ? "1px solid rgba(90,156,255,0.28)"
            : "1px solid rgba(255,255,255,0.07)",

        background:
          active
            ? "rgba(70,140,255,0.11)"
            : "rgba(255,255,255,0.025)",

        color:
          active
            ? "#8cb7ff"
            : "#7d90a8",

        fontSize:
          "9px",

        fontWeight:
          800,
      }}
    >
      {children}
    </button>
  );
}


/* =========================================================
   CASE CARD
   ========================================================= */

function ActiveCaseCard({
  item,
  language,
  arrowStyle,
}) {
  const personName =
    item.person?.[
      language
    ] ||
    item.person?.en ||
    item.id;


  const status =
    item.workflowStatus ||
    item.finalStatus;


  const statusColors =
    getStatusColors(
      status
    );


  const action =
    getCaseAction(
      item,
      language
    );


  const summary =
    item.aiSummary?.[
      language
    ] ||
    item.aiSummary?.en ||
    L(
      language,
      "AI analysis is available for this case.",
      "تحليل الذكاء الاصطناعي متاح لهذه الحالة."
    );


  return (
    <article
      className="allCaseCard"
      style={{
        padding:
          "17px",

        borderRadius:
          "14px",

        border:
          item.wronglyAffected
            ? "1px solid rgba(255,90,105,0.13)"
            : "1px solid rgba(255,255,255,0.06)",

        background:
          item.wronglyAffected
            ? "linear-gradient(135deg, rgba(64,25,37,0.18), rgba(10,28,48,0.84))"
            : "rgba(11,29,50,0.72)",
      }}
    >

      {/* ================================================
          TOP
          ================================================ */}

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",

          gap:
            "12px",
        }}
      >

        <div
          style={{
            minWidth:
              0,
          }}
        >

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              flexWrap:
                "wrap",

              gap:
                "7px",
            }}
          >
            <strong
              style={{
                color:
                  "#e2ebf6",

                fontSize:
                  "13px",
              }}
            >
              {personName}
            </strong>


            {
              item.wronglyAffected && (
                <ShieldAlert
                  size={14}
                  color="#ff7887"
                  aria-hidden="true"
                />
              )
            }
          </div>


          <span
            dir="ltr"
            style={{
              display:
                "block",

              marginTop:
                "4px",

              color:
                "#657990",

              fontSize:
                "9px",
            }}
          >
            {item.id}

            {" · "}

            {item.biometricId}
          </span>

        </div>


        <PriorityBadge
          priority={
            item.priority
          }
          language={
            language
          }
        />

      </div>


      {/* ================================================
          DETAILS
          ================================================ */}

      <div
        className="allCaseDetails"
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "1.15fr 0.6fr 1fr",

          gap:
            "10px",

          marginTop:
            "15px",
        }}
      >

        {/* PROBLEM */}

        <div>
          <span
            style={{
              display:
                "block",

              color:
                "#677b93",

              fontSize:
                "8px",
            }}
          >
            {L(
              language,
              "Problem",
              "المشكلة"
            )}
          </span>

          <strong
            style={{
              display:
                "block",

              marginTop:
                "4px",

              color:
                "#cbd7e5",

              fontSize:
                "10px",

              lineHeight:
                1.45,
            }}
          >
            {getIssueLabel(
              item.caseType,
              language
            )}
          </strong>
        </div>


        {/* CONFIDENCE */}

        <div>
          <span
            style={{
              display:
                "block",

              color:
                "#677b93",

              fontSize:
                "8px",
            }}
          >
            {L(
              language,
              "AI Confidence",
              "ثقة الذكاء"
            )}
          </span>

          <strong
            dir="ltr"
            style={{
              display:
                "block",

              marginTop:
                "4px",

              color:
                "#dbe7f6",

              fontSize:
                "12px",
            }}
          >
            {item.aiConfidence}%
          </strong>
        </div>


        {/* STATUS */}

        <div>
          <span
            style={{
              display:
                "block",

              color:
                "#677b93",

              fontSize:
                "8px",
            }}
          >
            {L(
              language,
              "Current Step",
              "المرحلة الحالية"
            )}
          </span>

          <span
            style={{
              display:
                "inline-flex",

              marginTop:
                "4px",

              padding:
                "5px 7px",

              borderRadius:
                "7px",

              color:
                statusColors.color,

              background:
                statusColors.background,

              border:
                `1px solid ${statusColors.border}`,

              fontSize:
                "8.5px",

              fontWeight:
                800,
            }}
          >
            {getStatusLabel(
              status,
              language
            )}
          </span>
        </div>

      </div>


      {/* ================================================
          AI SUMMARY
          ================================================ */}

      <div
        style={{
          display:
            "flex",

          alignItems:
            "flex-start",

          gap:
            "7px",

          marginTop:
            "14px",

          paddingTop:
            "12px",

          borderTop:
            "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <BrainCircuit
          size={14}
          color="#69a2ff"
          aria-hidden="true"
        />

        <span
          className="allCaseSummary"
          style={{
            color:
              "#8193aa",

            fontSize:
              "9px",

            lineHeight:
              1.55,
          }}
        >
          {summary}
        </span>
      </div>


      {/* ================================================
          ACTION
          ================================================ */}

      <Link
        href={
          action.href
        }
        style={{
          minHeight:
            "38px",

          marginTop:
            "13px",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          gap:
            "6px",

          borderRadius:
            "9px",

          textDecoration:
            "none",

          color:
            action.color,

          background:
            `${action.color}0D`,

          border:
            `1px solid ${action.color}28`,

          fontSize:
            "9.5px",

          fontWeight:
            850,
        }}
      >
        {action.label}

        <ChevronRight
          size={14}
          style={
            arrowStyle
          }
          aria-hidden="true"
        />
      </Link>

    </article>
  );
}


/* =========================================================
   PAGE
   ========================================================= */

export default function AllActiveCasesPage() {
  const {
    language,
  } =
    useLanguage();


  const store =
    useCaseStore();


  const [
    searchTerm,
    setSearchTerm,
  ] =
    useState(
      ""
    );


  const [
    priorityFilter,
    setPriorityFilter,
  ] =
    useState(
      "ALL"
    );


  const [
    stageFilter,
    setStageFilter,
  ] =
    useState(
      "ALL"
    );


  useEffect(
    () => {
      initializeDemoCaseStore();
    },
    []
  );


  const isArabic =
    language ===
    "ar";


  const arrowStyle = {
    transform:
      isArabic
        ? "rotate(180deg)"
        : "none",
  };


  /* =======================================================
     ACTIVE CASES ONLY
     ======================================================= */

  const activeCases =
    store.initialized
      ? store.cases.filter(
          (
            item
          ) =>
            item.active &&
            !item.closed &&
            item.finalStatus !==
              "VERIFIED_CLOSED"
        )
      : ACTIVE_CASES;


  /* =======================================================
     COUNTS
     ======================================================= */

  const urgentCount =
    activeCases.filter(
      (
        item
      ) =>
        item.priority ===
        "IMMEDIATE"
    ).length;


  const protectiveCount =
    activeCases.filter(
      (
        item
      ) =>
        Boolean(
          item.wronglyAffected
        )
    ).length;


  /* =======================================================
     FILTER + SORT
     ======================================================= */

  const filteredCases =
    useMemo(
      () => {

        const normalizedSearch =
          searchTerm
            .trim()
            .toLowerCase();


        const priorityOrder = {
          IMMEDIATE:
            3,

          HIGH:
            2,

          MEDIUM:
            1,
        };


        return [
          ...activeCases,
        ]
          .filter(
            (
              item
            ) => {

              if (
                priorityFilter !==
                  "ALL" &&
                item.priority !==
                  priorityFilter
              ) {
                return false;
              }


              const status =
                item.workflowStatus ||
                item.finalStatus;


              if (
                stageFilter !==
                  "ALL" &&
                status !==
                  stageFilter
              ) {
                return false;
              }


              if (
                !normalizedSearch
              ) {
                return true;
              }


              const personEn =
                item.person?.en ||
                "";


              const personAr =
                item.person?.ar ||
                "";


              const searchable =
                [
                  item.id,

                  item.biometricId,

                  item.currentIdentity,

                  item.proposedIdentity,

                  item.canonicalIdentity,

                  item.caseType,

                  personEn,

                  personAr,

                  getIssueLabel(
                    item.caseType,
                    language
                  ),

                  getStatusLabel(
                    status,
                    language
                  ),
                ]
                  .filter(
                    Boolean
                  )
                  .join(
                    " "
                  )
                  .toLowerCase();


              return (
                searchable.includes(
                  normalizedSearch
                )
              );
            }
          )
          .sort(
            (
              a,
              b
            ) => {

              const priorityDifference =
                (
                  priorityOrder[
                    b.priority
                  ] ||
                  0
                )
                -
                (
                  priorityOrder[
                    a.priority
                  ] ||
                  0
                );


              if (
                priorityDifference !==
                0
              ) {
                return (
                  priorityDifference
                );
              }


              const protectiveDifference =
                Number(
                  b.protectivePriority ||
                  0
                )
                -
                Number(
                  a.protectivePriority ||
                  0
                );


              if (
                protectiveDifference !==
                0
              ) {
                return (
                  protectiveDifference
                );
              }


              return (
                a.id.localeCompare(
                  b.id
                )
              );
            }
          );

      },
      [
        activeCases,
        language,
        priorityFilter,
        searchTerm,
        stageFilter,
      ]
    );


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
              "15px",

            textDecoration:
              "none",
          }}
        >
          {
            isArabic ? (
              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            ) : (
              <ArrowLeft
                size={15}
                aria-hidden="true"
              />
            )
          }

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
              <FileSearch
                size={15}
                aria-hidden="true"
              />

              {L(
                language,
                "ACTIVE CASE REGISTER",
                "سجل الحالات النشطة"
              )}
            </div>


            <h1>
              {L(
                language,
                "All Active Cases",
                "جميع الحالات النشطة"
              )}
            </h1>


            <p>
              {L(
                language,

                "All open identity cases are shown here. Completed and verified cases are automatically removed from this list and retained in Reports & Audit.",

                "تظهر هنا جميع حالات الهوية المفتوحة. وبعد اكتمال التصحيح والتحقق تختفي الحالة تلقائيًا من هذه القائمة وتبقى محفوظة في التقارير والسجل."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            SUMMARY
            ================================================ */}

        <section
          className="allCasesSummary"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",

            gap:
              "10px",

            marginBottom:
              "16px",
          }}
        >

          <div className="metricCard">
            <div className="metricIcon">
              <FileSearch
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="metricValue">
              {
                activeCases.length
              }
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Active Cases",
                "الحالات النشطة"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <CircleAlert
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="metricValue">
              {
                urgentCount
              }
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Urgent Cases",
                "حالات فورية"
              )}
            </div>
          </div>


          <div className="metricCard">
            <div className="metricIcon">
              <ShieldAlert
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="metricValue">
              {
                protectiveCount
              }
            </div>

            <div className="metricTitle">
              {L(
                language,
                "Protective Cases",
                "حالات حماية"
              )}
            </div>
          </div>

        </section>


        {/* ================================================
            SEARCH + FILTERS
            ================================================ */}

        <section
          className="panel"
          style={{
            padding:
              "15px",

            marginBottom:
              "15px",
          }}
        >

          <div
            className="allCasesSearchRow"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "minmax(240px, 1fr) auto",

              alignItems:
                "center",

              gap:
                "12px",
            }}
          >

            {/* SEARCH */}

            <div
              style={{
                minHeight:
                  "42px",

                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "9px",

                padding:
                  "0 13px",

                borderRadius:
                  "10px",

                background:
                  "rgba(255,255,255,0.03)",

                border:
                  "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Search
                size={17}
                color="#71849c"
                aria-hidden="true"
              />

              <input
                value={
                  searchTerm
                }
                onChange={
                  (
                    event
                  ) => {
                    setSearchTerm(
                      event.target.value
                    );
                  }
                }
                placeholder={
                  L(
                    language,
                    "Search by name, case, biometric or reference...",
                    "ابحث بالاسم أو رقم الحالة أو السجل أو المرجع..."
                  )
                }
                style={{
                  width:
                    "100%",

                  border:
                    0,

                  outline:
                    "none",

                  background:
                    "transparent",

                  color:
                    "#dce7f5",

                  fontSize:
                    "10px",
                }}
              />
            </div>


            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "6px",

                color:
                  "#71849c",

                fontSize:
                  "9px",
              }}
            >
              <Filter
                size={14}
                aria-hidden="true"
              />

              {L(
                language,
                `${filteredCases.length} shown`,
                `${filteredCases.length} معروضة`
              )}
            </div>

          </div>


          {/* ==============================================
              PRIORITY FILTER
              ============================================== */}

          <div
            style={{
              marginTop:
                "13px",

              display:
                "flex",

              alignItems:
                "center",

              flexWrap:
                "wrap",

              gap:
                "6px",
            }}
          >
            <span
              style={{
                color:
                  "#667991",

                fontSize:
                  "8px",

                fontWeight:
                  800,

                marginInlineEnd:
                  "3px",
              }}
            >
              {L(
                language,
                "PRIORITY",
                "الأولوية"
              )}
            </span>


            {
              [
                [
                  "ALL",

                  L(
                    language,
                    "All",
                    "الكل"
                  ),
                ],

                [
                  "IMMEDIATE",

                  L(
                    language,
                    "Urgent",
                    "فوري"
                  ),
                ],

                [
                  "HIGH",

                  L(
                    language,
                    "High",
                    "مرتفع"
                  ),
                ],

                [
                  "MEDIUM",

                  L(
                    language,
                    "Medium",
                    "متوسط"
                  ),
                ],
              ].map(
                (
                  [
                    value,
                    label,
                  ]
                ) => (
                  <FilterButton
                    key={
                      value
                    }
                    active={
                      priorityFilter ===
                      value
                    }
                    onClick={
                      () => {
                        setPriorityFilter(
                          value
                        );
                      }
                    }
                  >
                    {label}
                  </FilterButton>
                )
              )
            }
          </div>


          {/* ==============================================
              WORKFLOW FILTER
              ============================================== */}

          <div
            style={{
              marginTop:
                "9px",

              display:
                "flex",

              alignItems:
                "center",

              flexWrap:
                "wrap",

              gap:
                "6px",
            }}
          >
            <span
              style={{
                color:
                  "#667991",

                fontSize:
                  "8px",

                fontWeight:
                  800,

                marginInlineEnd:
                  "3px",
              }}
            >
              {L(
                language,
                "STEP",
                "المرحلة"
              )}
            </span>


            {
              [
                [
                  "ALL",

                  L(
                    language,
                    "All",
                    "الكل"
                  ),
                ],

                [
                  "AI_INVESTIGATED",

                  L(
                    language,
                    "AI Analysis",
                    "تحليل الذكاء"
                  ),
                ],

                [
                  "READY_FOR_OFFICER_REVIEW",

                  L(
                    language,
                    "Employee Review",
                    "تدقيق الموظف"
                  ),
                ],

                [
                  "AWAITING_MANAGER_APPROVAL",

                  L(
                    language,
                    "Manager",
                    "المدير"
                  ),
                ],

                [
                  "READY_FOR_CORRECTION",

                  L(
                    language,
                    "Correction",
                    "التعديل"
                  ),
                ],

                [
                  "AWAITING_VERIFICATION",

                  L(
                    language,
                    "Verification",
                    "التحقق"
                  ),
                ],
              ].map(
                (
                  [
                    value,
                    label,
                  ]
                ) => (
                  <FilterButton
                    key={
                      value
                    }
                    active={
                      stageFilter ===
                      value
                    }
                    onClick={
                      () => {
                        setStageFilter(
                          value
                        );
                      }
                    }
                  >
                    {label}
                  </FilterButton>
                )
              )
            }
          </div>

        </section>


        {/* ================================================
            ACTIVE CASES
            ================================================ */}

        <section className="panel">

          <div className="panelHeader">

            <div>

              <div className="panelEyebrow">
                {L(
                  language,
                  "OPEN CASES",
                  "الحالات المفتوحة"
                )}
              </div>


              <h2>
                {L(
                  language,
                  "Active Case Queue",
                  "قائمة الحالات النشطة"
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
                  "6px",

                color:
                  "#6d8199",

                fontSize:
                  "9px",
              }}
            >
              <Activity
                size={14}
                aria-hidden="true"
              />

              {L(
                language,
                "Live Demo Queue",
                "قائمة المحاكاة النشطة"
              )}
            </div>

          </div>


          {
            filteredCases.length >
            0 ? (
              <div
                className="allCasesGrid"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",

                  gap:
                    "11px",

                  padding:
                    "15px",
                }}
              >
                {
                  filteredCases.map(
                    (
                      item
                    ) => (
                      <ActiveCaseCard
                        key={
                          item.id
                        }
                        item={
                          item
                        }
                        language={
                          language
                        }
                        arrowStyle={
                          arrowStyle
                        }
                      />
                    )
                  )
                }
              </div>
            ) : (
              <div
                style={{
                  padding:
                    "50px 20px",

                  textAlign:
                    "center",
                }}
              >
                <Search
                  size={30}
                  color="#657991"
                  aria-hidden="true"
                />

                <strong
                  style={{
                    display:
                      "block",

                    marginTop:
                      "11px",

                    color:
                      "#cbd8e7",

                    fontSize:
                      "12px",
                  }}
                >
                  {L(
                    language,
                    "No matching active cases",
                    "لا توجد حالات نشطة مطابقة"
                  )}
                </strong>


                <span
                  style={{
                    display:
                      "block",

                    marginTop:
                      "5px",

                    color:
                      "#687b93",

                    fontSize:
                      "9px",
                  }}
                >
                  {L(
                    language,
                    "Change the search or filters and try again.",
                    "غيّر البحث أو الفلاتر وحاول مرة أخرى."
                  )}
                </span>
              </div>
            )
          }


          <div
            style={{
              padding:
                "13px 16px",

              borderTop:
                "1px solid rgba(255,255,255,0.05)",

              color:
                "#657890",

              fontSize:
                "9px",

              lineHeight:
                1.55,
            }}
          >
            {L(
              language,

              `The validated demonstration contains ${PLATFORM_METRICS.aggregatedCases} detected cases in total. Only open cases appear here; verified and closed cases are retained in Reports & Audit.`,

              `تحتوي المحاكاة المعتمدة على ${PLATFORM_METRICS.aggregatedCases} حالة مكتشفة إجمالًا. تظهر هنا الحالات المفتوحة فقط، بينما تنتقل الحالات التي تم التحقق منها وإغلاقها إلى التقارير والسجل.`
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
              "14px 0 0",

            padding:
              "15px",
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
                "One queue — one current step",
                "كل حالة تظهر في مرحلتها الحالية"
              )}
            </strong>


            <span>
              {L(
                language,

                "Each case button opens the exact workflow step that currently requires action. When verification succeeds, the case automatically leaves this active queue.",

                "يفتح زر كل حالة المرحلة التي تحتاج إلى إجراء حاليًا، وبعد نجاح التحقق تخرج الحالة تلقائيًا من قائمة الحالات النشطة."
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
              "AI Biometric Reconciliation Platform · Active Case Register",
              "منصة المطابقة البيومترية بالذكاء الاصطناعي · سجل الحالات النشطة"
            )}
          </span>


          <div>
            <Activity
              size={14}
              aria-hidden="true"
            />

            {L(
              language,
              `${activeCases.length} active`,
              `${activeCases.length} حالة نشطة`
            )}
          </div>

        </footer>


        {/* ================================================
            MOBILE
            ================================================ */}

        <style jsx>{`

          @media (
            max-width: 900px
          ) {

            .allCasesGrid {
              grid-template-columns:
                1fr
                !important;
            }

          }


          @media (
            max-width: 760px
          ) {

            .allCasesSummary {
              grid-template-columns:
                repeat(
                  3,
                  minmax(
                    0,
                    1fr
                  )
                )
                !important;
            }


            .allCasesSearchRow {
              grid-template-columns:
                1fr
                !important;
            }


            .allCaseDetails {
              grid-template-columns:
                1fr
                1fr
                !important;
            }


            .allCaseDetails
            > div:last-child {
              grid-column:
                1 / -1;
            }

          }


          @media (
            max-width: 480px
          ) {

            .allCasesSummary {
              grid-template-columns:
                repeat(
                  3,
                  minmax(
                    0,
                    1fr
                  )
                )
                !important;
            }


            .allCaseSummary {
              font-size:
                8.5px
                !important;
            }

          }

        `}</style>

      </main>

    </div>
  );
}