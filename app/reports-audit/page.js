"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { useLanguage } from "../components/LanguageProvider";

import {
  CASE_TYPE_LABELS,
  CLOSED_CASES,
} from "../lib/demo-data";

import {
  initializeDemoCaseStore,
  useCaseStore,
} from "../lib/case-store";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  History,
  Search,
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
   LOCALIZED VALUE
   ========================================================= */

function localizedValue(
  value,
  language,
  fallback = ""
) {
  if (
    typeof value ===
    "string"
  ) {
    return value;
  }


  if (
    value &&
    typeof value ===
      "object" &&
    !Array.isArray(
      value
    )
  ) {
    return (
      value[
        language
      ] ||
      value.en ||
      fallback
    );
  }


  return fallback;
}


/* =========================================================
   CASE TYPE
   ========================================================= */

function getCaseTypeLabel(
  caseType,
  language
) {
  return (
    CASE_TYPE_LABELS[
      caseType
    ]?.[
      language
    ] ||
    CASE_TYPE_LABELS[
      caseType
    ]?.en ||
    caseType ||
    L(
      language,
      "Identity Case",
      "حالة هوية"
    )
  );
}


/* =========================================================
   INFO CARD
   ========================================================= */

function InfoCard({
  label,
  value,
  color = "#d6e1ee",
  dir,
}) {
  return (
    <div
      style={{
        padding:
          "12px",

        borderRadius:
          "10px",

        border:
          "1px solid rgba(255,255,255,0.045)",

        background:
          "rgba(255,255,255,0.02)",
      }}
    >
      <span
        style={{
          display:
            "block",

          color:
            "#687b93",

          fontSize:
            "8px",
        }}
      >
        {label}
      </span>


      <strong
        dir={
          dir
        }
        style={{
          display:
            "block",

          marginTop:
            "5px",

          color,

          fontSize:
            "10px",

          lineHeight:
            1.5,

          overflowWrap:
            "anywhere",
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   DETAIL ROW
   ========================================================= */

function DetailRow({
  label,
  value,
  success = false,
  dir,
}) {
  return (
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "space-between",

        gap:
          "14px",

        padding:
          "11px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span
        style={{
          color:
            "#71849c",

          fontSize:
            "9px",
        }}
      >
        {label}
      </span>


      <strong
        dir={
          dir
        }
        style={{
          color:
            success
              ? "#59cfa0"
              : "#d0dbe8",

          fontSize:
            "9.5px",

          textAlign:
            "end",
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* =========================================================
   ARCHIVE CARD
   ========================================================= */

function ArchiveCard({
  item,
  language,
  selected,
  onSelect,
}) {
  const personName =
    localizedValue(
      item.person,
      language,
      item.id
    );


  const caseType =
    getCaseTypeLabel(
      item.caseType,
      language
    );


  const score =
    item.verification?.score ??
    "—";


  return (
    <button
      type="button"
      onClick={
        () => {
          onSelect(
            item.id
          );
        }
      }
      style={{
        width:
          "100%",

        display:
          "block",

        padding:
          "14px",

        borderRadius:
          "11px",

        border:
          selected
            ? "1px solid rgba(89,207,160,0.20)"
            : "1px solid rgba(255,255,255,0.045)",

        background:
          selected
            ? "rgba(89,207,160,0.045)"
            : "rgba(255,255,255,0.018)",

        textAlign:
          "start",

        fontFamily:
          "inherit",

        cursor:
          "pointer",
      }}
    >

      <div
        style={{
          display:
            "flex",

          alignItems:
            "flex-start",

          justifyContent:
            "space-between",

          gap:
            "10px",
        }}
      >

        <div>

          <strong
            style={{
              display:
                "block",

              color:
                selected
                  ? "#dff4eb"
                  : "#dce6f1",

              fontSize:
                "11px",
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
                "#62758d",

              fontSize:
                "8px",
            }}
          >
            {item.id}
          </span>

        </div>


        <CheckCircle2
          size={17}
          color="#59cfa0"
          aria-hidden="true"
        />

      </div>


      <div
        style={{
          marginTop:
            "10px",

          color:
            "#7c8fa6",

          fontSize:
            "8.5px",

          lineHeight:
            1.5,
        }}
      >
        {caseType}
      </div>


      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "8px",

          marginTop:
            "10px",

          paddingTop:
            "9px",

          borderTop:
            "1px solid rgba(255,255,255,0.04)",
        }}
      >

        <span
          style={{
            color:
              "#59cfa0",

            fontSize:
              "8px",

            fontWeight:
              850,
          }}
        >
          {L(
            language,
            "Verified & Closed",
            "تم التحقق والإغلاق"
          )}
        </span>


        <span
          dir="ltr"
          style={{
            color:
              "#8ba2bb",

            fontSize:
              "8px",
          }}
        >
          {L(
            language,
            `Score ${score}`,
            `الدرجة ${score}`
          )}
        </span>

      </div>

    </button>
  );
}


/* =========================================================
   AUDIT EVENT
   ========================================================= */

function AuditEvent({
  icon: Icon,
  title,
  description,
  timestamp,
}) {
  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "32px 1fr",

        gap:
          "10px",

        padding:
          "11px 0",

        borderBottom:
          "1px solid rgba(255,255,255,0.04)",
      }}
    >

      <div
        style={{
          width:
            "28px",

          height:
            "28px",

          display:
            "grid",

          placeItems:
            "center",

          borderRadius:
            "50%",

          color:
            "#59cfa0",

          background:
            "rgba(89,207,160,0.06)",

          border:
            "1px solid rgba(89,207,160,0.10)",
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
              "#c9d6e4",

            fontSize:
              "9.5px",
          }}
        >
          {title}
        </strong>


        {description && (
          <span
            style={{
              display:
                "block",

              marginTop:
                "4px",

              color:
                "#71849c",

              fontSize:
                "8.5px",

              lineHeight:
                1.55,
            }}
          >
            {description}
          </span>
        )}


        {timestamp && (
          <span
            dir="ltr"
            style={{
              display:
                "block",

              marginTop:
                "4px",

              color:
                "#53677f",

              fontSize:
                "7.5px",
            }}
          >
            {timestamp}
          </span>
        )}

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
  } =
    useLanguage();


  const store =
    useCaseStore();


  const [
    selectedCaseId,
    setSelectedCaseId,
  ] =
    useState(
      null
    );


  const [
    searchTerm,
    setSearchTerm,
  ] =
    useState(
      ""
    );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  useEffect(
    () => {
      initializeDemoCaseStore();


      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }


      const params =
        new URLSearchParams(
          window.location.search
        );


      const requestedCaseId =
        params.get(
          "case"
        );


      if (
        requestedCaseId
      ) {
        setSelectedCaseId(
          requestedCaseId
        );
      }
    },
    []
  );


  /* =======================================================
     CLOSED CASES ONLY

     Store is the live source of truth.

     Fallback:
     historical validated closed case.
     ======================================================= */

  const closedCases =
    useMemo(
      () => {

        const source =
          store.initialized
            ? store.cases
            : CLOSED_CASES;


        return source
          .filter(
            (
              item
            ) =>
              Boolean(
                item.closed
              ) ||
              item.finalStatus ===
                "VERIFIED_CLOSED" ||
              item.workflowStatus ===
                "VERIFIED_CLOSED"
          )
          .sort(
            (
              a,
              b
            ) => {

              const aTime =
                new Date(
                  a.closedAt ||
                  a.verifiedAt ||
                  a.updatedAt ||
                  0
                ).getTime();


              const bTime =
                new Date(
                  b.closedAt ||
                  b.verifiedAt ||
                  b.updatedAt ||
                  0
                ).getTime();


              if (
                bTime !==
                aTime
              ) {
                return (
                  bTime -
                  aTime
                );
              }


              return (
                b.id.localeCompare(
                  a.id
                )
              );
            }
          );

      },
      [
        store.cases,
        store.initialized,
      ]
    );


  /* =======================================================
     SEARCH
     ======================================================= */

  const filteredClosedCases =
    useMemo(
      () => {

        const search =
          searchTerm
            .trim()
            .toLowerCase();


        if (
          !search
        ) {
          return (
            closedCases
          );
        }


        return closedCases.filter(
          (
            item
          ) => {

            const personEn =
              item.person?.en ||
              "";


            const personAr =
              item.person?.ar ||
              "";


            const text =
              [
                item.id,

                item.biometricId,

                item.caseType,

                personEn,

                personAr,

                item.execution?.before,

                item.execution?.after,

                getCaseTypeLabel(
                  item.caseType,
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
              text.includes(
                search
              )
            );
          }
        );

      },
      [
        closedCases,
        language,
        searchTerm,
      ]
    );


  /* =======================================================
     SELECT REPORT

     URL case is preferred.
     Otherwise latest closed case.
     ======================================================= */

  const selectedCase =
    closedCases.find(
      (
        item
      ) =>
        item.id ===
        selectedCaseId
    ) ||
    closedCases[0] ||
    null;


  /* =======================================================
     KEEP SELECTION VALID
     ======================================================= */

  useEffect(
    () => {
      if (
        !selectedCaseId &&
        closedCases.length >
          0
      ) {
        setSelectedCaseId(
          closedCases[0].id
        );
      }
    },
    [
      closedCases,
      selectedCaseId,
    ]
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
     EMPTY ARCHIVE
     ======================================================= */

  if (
    !selectedCase
  ) {
    return (
      <div className="appShell">

        <Sidebar />


        <main className="mainContent">

          <header className="topbar">

            <div>

              <div className="eyebrow">
                <History
                  size={15}
                  aria-hidden="true"
                />

                {L(
                  language,
                  "REPORTS & AUDIT",
                  "التقارير والسجل"
                )}
              </div>


              <h1>
                {L(
                  language,
                  "Reports & History",
                  "التقارير والسجل"
                )}
              </h1>

            </div>

          </header>


          <section
            className="panel"
            style={{
              padding:
                "45px 20px",

              textAlign:
                "center",
            }}
          >

            <History
              size={34}
              color="#71849c"
              aria-hidden="true"
            />


            <h2>
              {L(
                language,
                "No completed cases yet",
                "لا توجد حالات مكتملة حتى الآن"
              )}
            </h2>


            <p
              style={{
                color:
                  "#71849c",

                fontSize:
                  "9.5px",
              }}
            >
              {L(
                language,

                "A case appears here automatically after correction and successful verification.",

                "تظهر الحالة هنا تلقائيًا بعد تنفيذ التعديل ونجاح التحقق."
              )}
            </p>


            <Link
              href="/cases"
              className="primaryButton"
              style={{
                textDecoration:
                  "none",
              }}
            >
              {L(
                language,
                "Open Active Cases",
                "فتح الحالات النشطة"
              )}
            </Link>

          </section>

        </main>

      </div>
    );
  }


  /* =======================================================
     SELECTED REPORT VALUES
     ======================================================= */

  const personName =
    localizedValue(
      selectedCase.person,
      language,
      selectedCase.id
    );


  const biometricId =
    selectedCase.biometricId ||
    selectedCase.execution
      ?.targetRecord ||
    "—";


  const beforeReference =
    selectedCase.execution
      ?.before ||
    selectedCase.currentIdentity ||
    "—";


  const afterReference =
    selectedCase.execution
      ?.after ||
    selectedCase.proposedIdentity ||
    selectedCase.canonicalIdentity ||
    "—";


  const beforeName =
    localizedValue(
      selectedCase.execution
        ?.beforeName ||
      selectedCase.currentIdentityName,
      language,
      L(
        language,
        "Previous linked reference",
        "المرجع المرتبط سابقًا"
      )
    );


  const afterName =
    localizedValue(
      selectedCase.execution
        ?.afterName ||
      selectedCase.proposedIdentityName ||
      selectedCase.canonicalIdentityName,
      language,
      personName
    );


  const aiSummary =
    localizedValue(
      selectedCase.aiSummary,
      language,
      L(
        language,

        "AI identified an identity relationship that required correction and prepared the supported recommendation.",

        "حدد الذكاء الاصطناعي مشكلة في ربط الهوية وجهز التوصية المدعومة للتعديل."
      )
    );


  const verificationScore =
    selectedCase.verification
      ?.score ??
    "—";


  const biometricMatch =
    selectedCase.verification
      ?.biometricMatchPercent ??
    null;


  const officerApproved =
    (
      selectedCase.officerDecision ||
      selectedCase.officer
        ?.decision
    ) ===
    "APPROVED";


  const managerApproved =
    (
      selectedCase.managerDecision ||
      selectedCase.manager
        ?.decision
    ) ===
    "APPROVED";


  /* =======================================================
     AUDIT HISTORY

     If detailed persisted audit events exist, use them.
     Otherwise create the standard five-stage verified trace.
     ======================================================= */

  const storedAudit =
    Array.isArray(
      selectedCase.audit
    )
      ? selectedCase.audit
      : [];


  const standardAudit = [
    {
      icon:
        BrainCircuit,

      title:
        L(
          language,
          "AI analysis completed",
          "اكتمل تحليل الذكاء الاصطناعي"
        ),

      description:
        L(
          language,
          "The problem was detected and a supported correction recommendation was prepared.",
          "تم اكتشاف المشكلة وتجهيز توصية مدعومة بالتعديل."
        ),
    },

    {
      icon:
        UserCheck,

      title:
        L(
          language,
          "Employee approval recorded",
          "تم تسجيل اعتماد الموظف"
        ),

      description:
        L(
          language,
          "The employee reviewed the evidence and approved the recommendation.",
          "راجع الموظف الأدلة واعتمد التوصية."
        ),
    },

    {
      icon:
        ShieldCheck,

      title:
        L(
          language,
          "Manager approval recorded",
          "تم تسجيل موافقة المدير"
        ),

      description:
        L(
          language,
          "The Manager provided the required second human approval.",
          "سجل المدير الموافقة البشرية الثانية المطلوبة."
        ),
    },

    {
      icon:
        FileCheck2,

      title:
        L(
          language,
          "Approved correction executed",
          "تم تنفيذ التعديل المعتمد"
        ),

      description:
        L(
          language,

          `${biometricId} was moved from ${beforeReference} to ${afterReference}.`,

          `تم نقل السجل ${biometricId} من المرجع ${beforeReference} إلى المرجع ${afterReference}.`
        ),
    },

    {
      icon:
        CheckCircle2,

      title:
        L(
          language,
          "Verification passed and case closed",
          "نجح التحقق وتم إغلاق الحالة"
        ),

      description:
        L(
          language,
          "The corrected relationship passed final verification and the case was archived.",
          "اجتاز الربط المصحح التحقق النهائي وتم نقل الحالة إلى الأرشيف."
        ),
    },
  ];


  const auditEvents =
    storedAudit.length >
    0
      ? storedAudit.map(
          (
            event,
            index
          ) => {

            const fallback =
              standardAudit[
                Math.min(
                  index,
                  standardAudit.length -
                    1
                )
              ];


            return {
              icon:
                fallback.icon,

              title:
                localizedValue(
                  event.title,
                  language,
                  event.action ||
                  event.type ||
                  fallback.title
                ),

              description:
                localizedValue(
                  event.description,
                  language,
                  event.message ||
                  fallback.description
                ),

              timestamp:
                event.at ||
                event.timestamp ||
                null,
            };
          }
        )
      : standardAudit;


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
                "COMPLETED CASE ARCHIVE",
                "أرشيف الحالات المكتملة"
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

                "Completed and verified cases are kept here with their AI analysis, human approvals, correction and final verification history.",

                "يتم الاحتفاظ هنا بالحالات المكتملة والمتحقق منها مع تحليل الذكاء الاصطناعي والموافقات البشرية والتعديل ونتيجة التحقق النهائية."
              )}
            </p>

          </div>

        </header>


        {/* ================================================
            SIMPLE SUMMARY
            ================================================ */}

        <section
          className="reportMetrics"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(3,minmax(0,1fr))",

            gap:
              "10px",

            marginBottom:
              "14px",
          }}
        >

          <InfoCard
            label={
              L(
                language,
                "Closed Cases",
                "الحالات المغلقة"
              )
            }
            value={
              closedCases.length
            }
            color="#59cfa0"
            dir="ltr"
          />


          <InfoCard
            label={
              L(
                language,
                "Verified Cases",
                "الحالات المتحقق منها"
              )
            }
            value={
              closedCases.filter(
                (
                  item
                ) =>
                  item.verification
                    ?.status ===
                    "PASSED"
              ).length
            }
            color="#59cfa0"
            dir="ltr"
          />


          <InfoCard
            label={
              L(
                language,
                "Human Approval Levels",
                "مستويات الاعتماد"
              )
            }
            value="2"
            color="#79a9ff"
            dir="ltr"
          />

        </section>


        {/* ================================================
            ARCHIVE + REPORT
            ================================================ */}

        <section
          className="reportLayout"
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "minmax(245px,0.72fr) minmax(0,1.28fr)",

            gap:
              "14px",
          }}
        >

          {/* ==============================================
              ARCHIVE
              ============================================== */}

          <section className="panel">

            <div className="panelHeader">

              <div>

                <div className="panelEyebrow">
                  {L(
                    language,
                    "ARCHIVE",
                    "الأرشيف"
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
                size={21}
                aria-hidden="true"
              />

            </div>


            <div
              style={{
                padding:
                  "14px",
              }}
            >

              {/* SEARCH */}

              <div
                style={{
                  minHeight:
                    "39px",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    "8px",

                  padding:
                    "0 11px",

                  borderRadius:
                    "9px",

                  background:
                    "rgba(255,255,255,0.025)",

                  border:
                    "1px solid rgba(255,255,255,0.055)",
                }}
              >

                <Search
                  size={15}
                  color="#687b93"
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
                      "Search closed cases...",
                      "ابحث في الحالات المغلقة..."
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
                      "#d5e0ec",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "9px",
                  }}
                />

              </div>


              {/* LIST */}

              <div
                style={{
                  display:
                    "grid",

                  gap:
                    "8px",

                  marginTop:
                    "11px",
                }}
              >

                {filteredClosedCases.map(
                  (
                    item
                  ) => (
                    <ArchiveCard
                      key={
                        item.id
                      }
                      item={
                        item
                      }
                      language={
                        language
                      }
                      selected={
                        selectedCase.id ===
                        item.id
                      }
                      onSelect={
                        setSelectedCaseId
                      }
                    />
                  )
                )}


                {filteredClosedCases.length ===
                  0 && (
                  <div
                    style={{
                      padding:
                        "30px 10px",

                      textAlign:
                        "center",

                      color:
                        "#71849c",

                      fontSize:
                        "9px",
                    }}
                  >
                    {L(
                      language,
                      "No matching completed cases.",
                      "لا توجد حالات مكتملة مطابقة."
                    )}
                  </div>
                )}

              </div>

            </div>

          </section>


          {/* ==============================================
              SELECTED REPORT
              ============================================== */}

          <div
            style={{
              display:
                "grid",

              gap:
                "14px",
            }}
          >

            {/* REPORT HEADER */}

            <section
              style={{
                padding:
                  "17px",

                borderRadius:
                  "15px",

                border:
                  "1px solid rgba(89,207,160,0.16)",

                background:
                  "rgba(89,207,160,0.035)",
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "flex-start",

                  justifyContent:
                    "space-between",

                  gap:
                    "12px",

                  flexWrap:
                    "wrap",
                }}
              >

                <div>

                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap:
                        "7px",

                      color:
                        "#59cfa0",

                      fontSize:
                        "8px",

                      fontWeight:
                        850,
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      aria-hidden="true"
                    />

                    {L(
                      language,
                      "VERIFIED & CLOSED",
                      "تم التحقق والإغلاق"
                    )}
                  </div>


                  <h2
                    style={{
                      margin:
                        "8px 0 0",

                      color:
                        "#e3edf7",

                      fontSize:
                        "17px",
                    }}
                  >
                    {personName}
                  </h2>


                  <span
                    dir="ltr"
                    style={{
                      display:
                        "block",

                      marginTop:
                        "5px",

                      color:
                        "#667a92",

                      fontSize:
                        "8.5px",
                    }}
                  >
                    {selectedCase.id}
                    {" · "}
                    {biometricId}
                  </span>

                </div>


                <div
                  style={{
                    minWidth:
                      "90px",

                    textAlign:
                      "center",
                  }}
                >

                  <span
                    style={{
                      color:
                        "#6f8299",

                      fontSize:
                        "7.5px",
                    }}
                  >
                    {L(
                      language,
                      "VERIFICATION SCORE",
                      "درجة التحقق"
                    )}
                  </span>


                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "2px",

                      color:
                        "#59cfa0",

                      fontSize:
                        "28px",
                    }}
                  >
                    {verificationScore}
                  </strong>

                </div>

              </div>

            </section>


            {/* AI RESULT */}

            <section className="panel">

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "AI RESULT",
                      "نتيجة الذكاء الاصطناعي"
                    )}
                  </div>


                  <h2>
                    {getCaseTypeLabel(
                      selectedCase.caseType,
                      language
                    )}
                  </h2>

                </div>


                <BrainCircuit
                  size={21}
                  aria-hidden="true"
                />

              </div>


              <div
                style={{
                  padding:
                    "17px",
                }}
              >

                <p
                  style={{
                    margin:
                      0,

                    color:
                      "#aebdcc",

                    fontSize:
                      "10px",

                    lineHeight:
                      1.7,
                  }}
                >
                  {aiSummary}
                </p>


                <div
                  className="reportInfoGrid"
                  style={{
                    display:
                      "grid",

                    gridTemplateColumns:
                      "repeat(2,minmax(0,1fr))",

                    gap:
                      "8px",

                    marginTop:
                      "13px",
                  }}
                >

                  <InfoCard
                    label={
                      L(
                        language,
                        "AI Confidence",
                        "ثقة الذكاء الاصطناعي"
                      )
                    }
                    value={
                      `${selectedCase.aiConfidence}%`
                    }
                    color="#79a9ff"
                    dir="ltr"
                  />


                  <InfoCard
                    label={
                      L(
                        language,
                        "Final Status",
                        "الحالة النهائية"
                      )
                    }
                    value="VERIFIED_CLOSED"
                    color="#59cfa0"
                    dir="ltr"
                  />

                </div>

              </div>

            </section>


            {/* CORRECTION RESULT */}

            <section className="panel">

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "CORRECTION RESULT",
                      "نتيجة التعديل"
                    )}
                  </div>


                  <h2>
                    {L(
                      language,
                      "What changed?",
                      "ما الذي تم تغييره؟"
                    )}
                  </h2>

                </div>


                <FileCheck2
                  size={21}
                  aria-hidden="true"
                />

              </div>


              <div
                className="reportMappingGrid"
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "1fr auto 1fr",

                  alignItems:
                    "center",

                  gap:
                    "11px",

                  padding:
                    "17px",
                }}
              >

                {/* BEFORE */}

                <div
                  style={{
                    padding:
                      "14px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid rgba(255,80,100,0.09)",

                    background:
                      "rgba(255,80,100,0.03)",
                  }}
                >

                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#a46d75",

                      fontSize:
                        "8px",

                      fontWeight:
                        850,
                    }}
                  >
                    {L(
                      language,
                      "BEFORE",
                      "قبل التعديل"
                    )}
                  </span>


                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "7px",

                      color:
                        "#dce6f1",

                      fontSize:
                        "10px",
                    }}
                  >
                    {beforeName}
                  </strong>


                  <span
                    dir="ltr"
                    style={{
                      display:
                        "block",

                      marginTop:
                        "5px",

                      color:
                        "#ff7c89",

                      fontSize:
                        "11px",

                      fontWeight:
                        850,
                    }}
                  >
                    {beforeReference}
                  </span>

                </div>


                <ChevronRight
                  className="reportMappingArrow"
                  size={19}
                  color="#71849c"
                  style={
                    arrowStyle
                  }
                  aria-hidden="true"
                />


                {/* AFTER */}

                <div
                  style={{
                    padding:
                      "14px",

                    borderRadius:
                      "10px",

                    border:
                      "1px solid rgba(89,207,160,0.11)",

                    background:
                      "rgba(89,207,160,0.035)",
                  }}
                >

                  <span
                    style={{
                      display:
                        "block",

                      color:
                        "#59937e",

                      fontSize:
                        "8px",

                      fontWeight:
                        850,
                    }}
                  >
                    {L(
                      language,
                      "AFTER",
                      "بعد التعديل"
                    )}
                  </span>


                  <strong
                    style={{
                      display:
                        "block",

                      marginTop:
                        "7px",

                      color:
                        "#dce6f1",

                      fontSize:
                        "10px",
                    }}
                  >
                    {afterName}
                  </strong>


                  <span
                    dir="ltr"
                    style={{
                      display:
                        "block",

                      marginTop:
                        "5px",

                      color:
                        "#59cfa0",

                      fontSize:
                        "11px",

                      fontWeight:
                        850,
                    }}
                  >
                    {afterReference}
                  </span>

                </div>

              </div>


              <div
                style={{
                  margin:
                    "0 17px 17px",

                  padding:
                    "10px",

                  borderRadius:
                    "9px",

                  color:
                    "#8193aa",

                  background:
                    "rgba(255,255,255,0.018)",

                  border:
                    "1px solid rgba(255,255,255,0.04)",

                  fontSize:
                    "9px",

                  lineHeight:
                    1.6,
                }}
              >
                {L(
                  language,

                  `${biometricId} was removed from ${beforeReference} and assigned to ${afterReference}.`,

                  `تمت إزالة السجل ${biometricId} من المرجع ${beforeReference} وربطه بالمرجع ${afterReference}.`
                )}
              </div>

            </section>


            {/* APPROVAL + VERIFICATION */}

            <section className="panel">

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "FINAL RESULT",
                      "النتيجة النهائية"
                    )}
                  </div>


                  <h2>
                    {L(
                      language,
                      "Approvals & Verification",
                      "الموافقات والتحقق"
                    )}
                  </h2>

                </div>


                <ShieldCheck
                  size={21}
                  aria-hidden="true"
                />

              </div>


              <div
                style={{
                  padding:
                    "8px 17px 17px",
                }}
              >

                <DetailRow
                  label={
                    L(
                      language,
                      "Employee Approval",
                      "اعتماد الموظف"
                    )
                  }
                  value={
                    officerApproved
                      ? L(
                          language,
                          "Approved",
                          "معتمد"
                        )
                      : "—"
                  }
                  success={
                    officerApproved
                  }
                />


                <DetailRow
                  label={
                    L(
                      language,
                      "Manager Approval",
                      "موافقة المدير"
                    )
                  }
                  value={
                    managerApproved
                      ? L(
                          language,
                          "Approved",
                          "معتمد"
                        )
                      : "—"
                  }
                  success={
                    managerApproved
                  }
                />


                <DetailRow
                  label={
                    L(
                      language,
                      "Correction",
                      "التعديل"
                    )
                  }
                  value={
                    selectedCase.execution
                      ?.status ===
                    "COMPLETED"
                      ? L(
                          language,
                          "Completed",
                          "مكتمل"
                        )
                      : "—"
                  }
                  success={
                    selectedCase.execution
                      ?.status ===
                    "COMPLETED"
                  }
                />


                <DetailRow
                  label={
                    L(
                      language,
                      "Verification",
                      "التحقق"
                    )
                  }
                  value={
                    selectedCase.verification
                      ?.status ===
                    "PASSED"
                      ? L(
                          language,
                          `Passed · ${verificationScore}`,
                          `ناجح · ${verificationScore}`
                        )
                      : selectedCase.verification
                          ?.status ||
                        "—"
                  }
                  success={
                    selectedCase.verification
                      ?.status ===
                    "PASSED"
                  }
                />


                <DetailRow
                  label={
                    L(
                      language,
                      "Biometric Match",
                      "مطابقة السجل البيومتري"
                    )
                  }
                  value={
                    biometricMatch !==
                    null
                      ? `${biometricMatch}%`
                      : "—"
                  }
                  success={
                    biometricMatch !==
                    null
                  }
                  dir="ltr"
                />

              </div>

            </section>


            {/* AUDIT */}

            <section className="panel">

              <div className="panelHeader">

                <div>

                  <div className="panelEyebrow">
                    {L(
                      language,
                      "AUDIT HISTORY",
                      "سجل الإجراءات"
                    )}
                  </div>


                  <h2>
                    {L(
                      language,
                      "Case Timeline",
                      "تسلسل الحالة"
                    )}
                  </h2>

                </div>


                <History
                  size={21}
                  aria-hidden="true"
                />

              </div>


              <div
                style={{
                  padding:
                    "8px 17px 17px",
                }}
              >

                {auditEvents.map(
                  (
                    event,
                    index
                  ) => (
                    <AuditEvent
                      key={
                        `${selectedCase.id}-${index}`
                      }
                      icon={
                        event.icon
                      }
                      title={
                        event.title
                      }
                      description={
                        event.description
                      }
                      timestamp={
                        event.timestamp
                      }
                    />
                  )
                )}

              </div>

            </section>


            {/* ACTIONS */}

            <section
              className="reportActions"
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "1fr 1fr",

                gap:
                  "8px",
              }}
            >

              <Link
                href={
                  `/cases/${selectedCase.id}`
                }
                style={{
                  minHeight:
                    "42px",

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
                    "#071c17",

                  background:
                    "linear-gradient(90deg,#4bc58f,#68d9ab)",

                  border:
                    "1px solid rgba(111,230,180,0.40)",

                  fontSize:
                    "9.5px",

                  fontWeight:
                    900,
                }}
              >

                <FileCheck2
                  size={14}
                  aria-hidden="true"
                />


                {L(
                  language,
                  "Open Full Case",
                  "فتح الحالة الكاملة"
                )}


                <ChevronRight
                  size={14}
                  style={
                    arrowStyle
                  }
                  aria-hidden="true"
                />

              </Link>


              <Link
                href="/cases"
                style={{
                  minHeight:
                    "42px",

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
                    "#79a9ff",

                  background:
                    "rgba(121,169,255,0.04)",

                  border:
                    "1px solid rgba(121,169,255,0.11)",

                  fontSize:
                    "9.5px",

                  fontWeight:
                    850,
                }}
              >
                {L(
                  language,
                  "Active Cases",
                  "الحالات النشطة"
                )}

                <ChevronRight
                  size={14}
                  style={
                    arrowStyle
                  }
                  aria-hidden="true"
                />
              </Link>

            </section>

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
                "Closed cases remain traceable",
                "الحالات المغلقة تبقى قابلة للتتبع"
              )}
            </strong>


            <span>
              {L(
                language,

                "Closing a case removes it from the active work queue, but does not delete it. Its decisions, correction result and verification history remain available here.",

                "إغلاق الحالة يزيلها من قائمة العمل النشطة فقط ولا يحذفها. تبقى القرارات ونتيجة التعديل وسجل التحقق محفوظة هنا."
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
              size={14}
              aria-hidden="true"
            />


            {L(
              language,
              `${closedCases.length} closed cases`,
              `${closedCases.length} حالة مغلقة`
            )}

          </div>

        </footer>


        {/* ================================================
            MOBILE
            ================================================ */}

        <style jsx>{`

          @media (
            max-width: 920px
          ) {

            .reportLayout {
              grid-template-columns:
                1fr
                !important;
            }

          }


          @media (
            max-width: 760px
          ) {

            .reportMetrics {
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


            .reportMappingGrid {
              grid-template-columns:
                1fr
                !important;
            }


            :global(.reportMappingArrow) {
              margin:
                0 auto;

              transform:
                rotate(90deg)
                !important;
            }

          }


          @media (
            max-width: 520px
          ) {

            .reportMetrics {
              grid-template-columns:
                1fr
                1fr
                1fr
                !important;
            }


            .reportActions {
              grid-template-columns:
                1fr
                !important;
            }

          }

        `}</style>

      </main>

    </div>
  );
}