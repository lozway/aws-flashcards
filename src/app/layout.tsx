import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS Flash Cards",
  description: "Learn AWS services with AI-powered flash cards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
