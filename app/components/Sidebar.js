"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "./LanguageProvider";

import {
  BarChart3,
  BadgeCheck,
  FileSearch,
  Fingerprint,
  History,
  LayoutDashboard,
} from "lucide-react";


/* =========================================================
   NAVIGATION
   ========================================================= */

const navigationItems = [
  {
    label: {
      en: "Home",
      ar: "الرئيسية",
    },
    href: "/",
    icon: LayoutDashboard,
  },

  {
    label: {
      en: "Cases",
      ar: "الحالات",
    },
    href: "/cases",
    icon: FileSearch,
    count: "53",
    matchPaths: [
      "/cases",
    ],
  },

  {
    label: {
      en: "Approvals",
      ar: "الموافقات",
    },
    href: "/officer-review",
    icon: BadgeCheck,
    count: "5",
    matchPaths: [
      "/officer-review",
      "/manager-approval",
      "/corrections-verification",
    ],
  },

  {
    label: {
      en: "Reports & History",
      ar: "التقارير والسجل",
    },
    href: "/reports-audit",
    icon: History,
    matchPaths: [
      "/reports-audit",
    ],
  },

  {
    label: {
      en: "Analytics",
      ar: "التحليلات",
    },
    href: "/analytics",
    icon: BarChart3,
    matchPaths: [
      "/analytics",
      "/data-integrity",
    ],
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

function getLabel(
  item,
  language
) {
  return (
    item.label[language] ||
    item.label.en
  );
}


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

  if (item.matchPaths) {
    return item.matchPaths.some(
      (path) =>
        pathname === path ||
        pathname.startsWith(
          `${path}/`
        )
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


  const isArabic =
    language === "ar";


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
        aria-label={
          isArabic
            ? "الرئيسية"
            : "Home"
        }
      >
        <div className="brandIcon">
          <Fingerprint
            size={25}
            aria-hidden="true"
          />
        </div>

        <div>
          <div className="brandTitle">
            {isArabic
              ? "مراقبة سلامة الهوية"
              : "Identity Integrity"}
          </div>

          <div className="brandSubtitle">
            {isArabic
              ? "المراقبة والمطابقة الذكية"
              : "Smart Monitoring & Reconciliation"}
          </div>
        </div>
      </Link>


      {/* ==================================================
          MAIN NAVIGATION
          ================================================== */}

      <nav
        className="navigation"
        aria-label={
          isArabic
            ? "التنقل الرئيسي"
            : "Main navigation"
        }
      >
        <div>
          <div className="navLabel">
            {isArabic
              ? "القائمة الرئيسية"
              : "MAIN"}
          </div>


          {navigationItems.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                isItemActive(
                  pathname,
                  item
                );


              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "navItem active"
                      : "navItem"
                  }
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  aria-label={
                    getLabel(
                      item,
                      language
                    )
                  }
                >
                  <Icon
                    size={19}
                    aria-hidden="true"
                  />

                  <span>
                    {getLabel(
                      item,
                      language
                    )}
                  </span>

                  {item.count && (
                    <span
                      className="navCount"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            }
          )}
        </div>
      </nav>


      {/* ==================================================
          LANGUAGE
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
          SYSTEM STATUS
          ================================================== */}

      <div className="sidebarFooter">
        <div
          className="systemDot"
          aria-hidden="true"
        />

        <div>
          <div className="systemTitle">
            {isArabic
              ? "المراقبة نشطة"
              : "Monitoring Active"}
          </div>

          <div className="systemSubtitle">
            {isArabic
              ? "بيانات تجريبية فقط"
              : "Synthetic demo data only"}
          </div>
        </div>
      </div>

    </aside>
  );
}