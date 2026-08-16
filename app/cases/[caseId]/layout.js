export const dynamicParams = false;

export function generateStaticParams() {
  return [
    {
      caseId: "CASE-2026-00001",
    },
    {
      caseId: "CASE-2026-00014",
    },
  ];
}

export default function CaseLayout({
  children,
}) {
  return children;
}