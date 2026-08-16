import "./globals.css";

export const metadata = {
  title: "AI Identity Reconciliation Platform",
  description:
    "AI-powered post-registration identity reconciliation and biometric conflict management platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}