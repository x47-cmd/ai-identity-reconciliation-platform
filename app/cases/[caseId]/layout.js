import {
  TOTAL_CASE_COUNT,
} from "../../lib/demo-data";


/* =========================================================
   STATIC CASE ROUTES

   GitHub Pages uses Next.js Static Export.

   Every synthetic case detail route must therefore be
   generated during the build.

   Valid synthetic case range:

   CASE-2026-00001
   →
   CASE-2026-00053

   Closed cases remain accessible from Reports & Audit.

   Active cases remain accessible from the Cases workspace.
   ========================================================= */

export const dynamicParams =
  false;


/* =========================================================
   GENERATE ALL CASE ROUTES
   ========================================================= */

export function generateStaticParams() {
  return Array.from(
    {
      length:
        TOTAL_CASE_COUNT,
    },

    (
      _,
      index
    ) => ({
      caseId:
        `CASE-2026-${String(
          index + 1
        ).padStart(
          5,
          "0"
        )}`,
    })
  );
}


/* =========================================================
   CASE LAYOUT
   ========================================================= */

export default function CaseLayout({
  children,
}) {
  return children;
}