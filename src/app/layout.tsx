import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AiFax | AI-Powered HIPAA-Compliant Faxing",
  description:
    "Modern AI faxing platform for healthcare, legal, and enterprise teams. Automate workflows, summarize incoming faxes, and integrate instantly."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
