import type { Metadata } from "next";
import { ChatWidget } from "@/components/chat-widget";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarketingPixels } from "@/components/marketing-pixels";
import { VisitTracker } from "@/components/visit-tracker";
import { brand } from "@/lib/site";
import "./globals.css";


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
    <html lang="en">
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
