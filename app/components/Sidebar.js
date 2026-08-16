"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "./LanguageProvider";

import {
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CircleCheckBig,
  Database,
  FileSearch,
  Fingerprint,
  History,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
} from "lucide-react";


/* =========================================================
   NAVIGATION
   ========================================================= */

const navigationGroups = [
  {
    labelKey: "sidebar.workspace",

    items: [
      {
        labelKey: "sidebar.commandCenter",
        href: "/",
        icon: LayoutDashboard,
      },

      {
        labelKey: "sidebar.cases",
        href: "/cases",
        icon: FileSearch,
        count: "53",
        matchPrefix: "/cases",
      },

      {
        labelKey: "sidebar.aiInvestigations",
        href: "/cases",
        icon: BrainCircuit,

        /*
         * Dedicated AI Investigations index route
         * is not implemented yet.
         *
         * This entry intentionally opens Cases
         * but does not take ownership of the
         * /cases active navigation state.
         */
        secondary: true,
      },

      {
        labelKey: "sidebar.officerReview",
        href: "/officer-review",
        icon: UserCheck,
        count: "5",
      },

      {
        labelKey: "sidebar.managerApproval",
        href: "/manager-approval",
        icon: BadgeCheck,
        count: "3",
      },

      {
        labelKey:
          "sidebar.correctionsVerification",
        href: "/corrections-verification",
        icon: CircleCheckBig,
        count: "1",
      },
    ],
  },

  {
    labelKey: "sidebar.intelligence",

    items: [
      {
        labelKey: "sidebar.analytics",
        href: "/analytics",
        icon: BarChart3,
      },

      {
        labelKey: "sidebar.dataIntegrity",
        href: "/data-integrity",
        icon: Database,
      },

      {
        labelKey: "sidebar.reportsAudit",
        href: "/reports-audit",
        icon: History,
      },
    ],
  },
];


/* =========================================================
   ACTIVE ROUTE HELPER
   ========================================================= */

function isItemActive(
  pathname,
  item
) {
  if (!pathname) {
    return false;
  }

  if (item.href === "/") {
    return pathname === "/";
  }

  if (item.matchPrefix) {
    return pathname.startsWith(
      item.matchPrefix
    );
  }

  return pathname === item.href;
}


/* =========================================================
   SIDEBAR
   ========================================================= */

export default function Sidebar() {
  const pathname =
    usePathname();

  const {
    language,
    changeLanguage,
    t,
  } = useLanguage();


  return (
    <aside className="sidebar">

      {/* ==================================================
          BRAND
          ================================================== */}

      <Link
        href="/"
        className="brand"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        aria-label={t(
          "sidebar.commandCenter"
        )}
      >
        <div className="brandIcon">
          <Fingerprint size={25} />
        </div>

        <div>
          <div className="brandTitle">
            {t(
              "sidebar.platformName"
            )}
          </div>

          <div className="brandSubtitle">
            {t(
              "sidebar.platformSubtitle"
            )}
          </div>
        </div>
      </Link>


      {/* ==================================================
          NAVIGATION
          ================================================== */}

      <nav
        className="navigation"
        aria-label={t(
          "sidebar.workspace"
        )}
      >
        {navigationGroups.map(
          (
            group,
            groupIndex
          ) => (
            <div
              key={group.labelKey}
            >
              <div
                className={
                  groupIndex === 0
                    ? "navLabel"
                    : "navLabel navSecond"
                }
              >
                {t(group.labelKey)}
              </div>


              {group.items.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    isItemActive(
                      pathname,
                      item
                    );

                  const forceInactive =
                    Boolean(
                      item.secondary
                    );

                  const isCurrentPage =
                    active &&
                    !forceInactive;


                  return (
                    <Link
                      key={
                        item.labelKey
                      }
                      href={item.href}
                      className={
                        isCurrentPage
                          ? "navItem active"
                          : "navItem"
                      }
                      aria-current={
                        isCurrentPage
                          ? "page"
                          : undefined
                      }
                    >
                      <Icon
                        size={19}
                        aria-hidden="true"
                      />

                      <span>
                        {t(
                          item.labelKey
                        )}
                      </span>

                      {item.count && (
                        <span
                          className="navCount"
                          aria-label={`${item.count}`}
                        >
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                }
              )}
            </div>
          )
        )}
      </nav>


      {/* ==================================================
          LANGUAGE SWITCHER
          ================================================== */}

      <div
        className="languageSwitcher"
        role="group"
        aria-label={t(
          "common.language"
        )}
      >
        <button
          type="button"
          className={
            language === "en"
              ? "languageButton active"
              : "languageButton"
          }
          onClick={() =>
            changeLanguage("en")
          }
          aria-pressed={
            language === "en"
          }
          aria-label="English"
        >
          EN
        </button>

        <button
          type="button"
          className={
            language === "ar"
              ? "languageButton active"
              : "languageButton"
          }
          onClick={() =>
            changeLanguage("ar")
          }
          aria-pressed={
            language === "ar"
          }
          aria-label="العربية"
        >
          عربي
        </button>
      </div>


      {/* ==================================================
          PLATFORM STATUS
          ================================================== */}

      <div className="sidebarFooter">
        <div
          className="systemDot"
          aria-hidden="true"
        />

        <div>
          <div className="systemTitle">
            {t(
              "common.systemOperational"
            )}
          </div>

          <div className="systemSubtitle">
            {t(
              "common.syntheticDemoEnvironment"
            )}
          </div>
        </div>
      </div>


      {/* ==================================================
          SAFETY STATUS
          ================================================== */}

      <div
        style={{
          marginTop: "9px",
          padding: "11px 12px",
          borderRadius: "11px",

          border:
            "1px solid rgba(52,211,153,0.07)",

          background:
            "rgba(52,211,153,0.025)",

          display: "flex",
          alignItems: "center",
          gap: "9px",
        }}
      >
        <ShieldCheck
          size={15}
          color="#59cfa0"
          aria-hidden="true"
        />

        <div>
          <div
            style={{
              color: "#76baa0",
              fontSize: "8px",
              fontWeight: 750,
            }}
          >
            {t(
              "common.masterProtected"
            )}
          </div>

          <div
            style={{
              color: "#4e6c62",
              fontSize: "7px",
              marginTop: "2px",
            }}
          >
            {t(
              "common.readOnlyReference"
            )}
          </div>
        </div>
      </div>

    </aside>
  );
}