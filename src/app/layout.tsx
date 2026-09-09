import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarketingPixels } from "@/components/marketing-pixels";
import { VisitTracker } from "@/components/visit-tracker";
import { brand } from "@/lib/site";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <VisitTracker />
        <Header />
        {children}
        <Footer />
        <ChatWidget />
        <MarketingPixels />
      </body>
    </html>
  );
}
