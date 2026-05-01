import type { Metadata } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NESTIQ | Find Home. Fair and Fast.",
  description: "The AI-powered property marketplace for buying, selling, renting and letting residential and commercial property in the UK.",
  keywords: ["property", "uk", "real estate", "buy", "rent", "commercial", "nestiq"],
  openGraph: {
    title: "NESTIQ | Find Home. Fair and Fast.",
    description: "The AI-powered property marketplace for buying, selling, renting and letting.",
    url: "https://nestiq.co.uk",
    siteName: "NESTIQ",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          dmSans.variable,
          syne.variable,
          jetbrainsMono.variable,
          "min-h-screen bg-pearl font-sans antialiased selection:bg-emerald/30 selection:text-forest"
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          {/* Footer will go here */}
        </div>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
