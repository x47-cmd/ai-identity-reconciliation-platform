import "./globals.css";

import { LanguageProvider } from "./components/LanguageProvider";

export const metadata = {
  title: "AI Identity Reconciliation Platform",
  description:
    "AI-powered post-registration identity reconciliation, biometric conflict detection, investigation, controlled correction, verification, and audit platform.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}