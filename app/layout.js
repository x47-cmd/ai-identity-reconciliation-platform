import "./globals.css";

import {
  LanguageProvider,
} from "./components/LanguageProvider";

export const metadata = {
  title: "AI Identity Reconciliation Platform",
  description:
    "AI-powered post-registration identity reconciliation and biometric conflict management platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}