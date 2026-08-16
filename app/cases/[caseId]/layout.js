import {
  COMPLEX_CASE_ID,
  VERIFIED_CASE_ID,
} from "../../lib/demo-data";


/* =========================================================
   STATIC CASE ROUTES

   GitHub Pages / static export supports only the
   case detail routes generated here.

   Any other caseId returns 404.
   ========================================================= */

export const dynamicParams = false;


export function generateStaticParams() {
  return [
    {
      caseId: VERIFIED_CASE_ID,
    },

    {
      caseId: COMPLEX_CASE_ID,
    },
  ];
}


/* =========================================================
   CASE LAYOUT
   ========================================================= */

export default function CaseLayout({
  children,
}) {
  return children;
}