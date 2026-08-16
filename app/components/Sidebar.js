"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Activity,
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


const navigationGroups = [
  {
    label: "WORKSPACE",

    items: [
      {
        label: "Command Center",
        href: "/",
        icon: LayoutDashboard,
      },

      {
        label: "Cases",
        href: "/cases",
        icon: FileSearch,
        count: "53",
        matchPrefix: "/cases",
      },

      {
        label: "AI Investigations",
        href: "/cases",
        icon: BrainCircuit,
        secondary: true,
      },

      {
        label: "Officer Review",
        href: "/officer-review",
        icon: UserCheck,
        count: "6",
      },

      {
        label: "Manager Approval",
        href: "/manager-approval",
        icon: BadgeCheck,
        count: "3",
      },

      {
        label: "Corrections & Verification",
        href: "/corrections-verification",
        icon: CircleCheckBig,
        count: "1",
      },
    ],
  },

  {
    label: "INTELLIGENCE",

    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },

      {
        label: "Data Integrity",
        href: "/data-integrity",
        icon: Database,
      },

      {
        label: "Reports & Audit",
        href: "/reports-audit",
        icon: History,
      },
    ],
  },
];


function isItemActive(
  pathname,
  item
) {
  if (
    item.href === "/"
  ) {
    return pathname === "/";
  }


  if (
    item.matchPrefix
  ) {
    return pathname.startsWith(
      item.matchPrefix
    );
  }


  return pathname === item.href;
}


export default function Sidebar() {
  const pathname = usePathname();


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
      >
        <div className="brandIcon">
          <Fingerprint size={25} />
        </div>

        <div>
          <div className="brandTitle">
            Identity AI
          </div>

          <div className="brandSubtitle">
            Reconciliation Platform
          </div>
        </div>
      </Link>


      {/* ==================================================
          NAVIGATION
          ================================================== */}

      <nav className="navigation">

        {
          navigationGroups.map(
            (
              group,
              groupIndex
            ) => (
              <div
                key={group.label}
              >
                <div
                  className={
                    groupIndex === 0
                      ? "navLabel"
                      : "navLabel navSecond"
                  }
                >
                  {group.label}
                </div>


                {
                  group.items.map(
                    (item) => {
                      const Icon =
                        item.icon;


                      const active =
                        isItemActive(
                          pathname,
                          item
                        );


                      /*
                       * AI Investigations currently uses
                       * the Cases workspace until its
                       * dedicated investigation index
                       * page is added.
                       *
                       * We do not mark it active while
                       * the user is on /cases because
                       * Cases owns that route.
                       */

                      const forceInactive =
                        item.secondary;


                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={
                            active
                            &&
                            !forceInactive
                              ? "navItem active"
                              : "navItem"
                          }
                        >
                          <Icon size={19} />

                          <span>
                            {item.label}
                          </span>


                          {
                            item.count
                            &&
                            (
                              <span className="navCount">
                                {item.count}
                              </span>
                            )
                          }
                        </Link>
                      );
                    }
                  )
                }

              </div>
            )
          )
        }

      </nav>


      {/* ==================================================
          PLATFORM STATUS
          ================================================== */}

      <div className="sidebarFooter">
        <div className="systemDot" />

        <div>
          <div className="systemTitle">
            System Operational
          </div>

          <div className="systemSubtitle">
            Synthetic Demo Environment
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
        />

        <div>
          <div
            style={{
              color: "#76baa0",
              fontSize: "8px",
              fontWeight: 750,
            }}
          >
            Master Protected
          </div>

          <div
            style={{
              color: "#4e6c62",
              fontSize: "7px",
              marginTop: "2px",
            }}
          >
            Read-only reference
          </div>
        </div>
      </div>

    </aside>
  );
}