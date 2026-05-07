import type { Metadata } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils/cn";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";

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
  title: "NestIQ | The Fair Property Portal Built for Independent Agents",
  description: "The AI-powered property portal and growth platform for independent estate agents. Fair pricing, true data ownership, and high-intent leads.",
  keywords: ["property portal", "estate agent software", "rightmove alternative", "uk real estate", "property leads"],
  metadataBase: new URL('https://nestiq.avorria.com'),
  openGraph: {
    title: "NestIQ | The Fair Property Portal",
    description: "The AI-powered property portal and growth platform for independent estate agents.",
    url: "https://nestiq.avorria.com",
    siteName: "NestIQ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "NestIQ Agent Dashboard",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NestIQ | The Fair Property Portal",
    description: "The AI-powered property portal and growth platform for independent estate agents.",
    images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "NestIQ Agent Platform",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "99.00",
        "priceCurrency": "GBP"
      }
    },
    {
      "@type": "Organization",
      "name": "Avorria Property Technology Project",
      "url": "https://nestiq.avorria.com",
      "logo": "https://nestiq.avorria.com/logo.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          dmSans.variable,
          syne.variable,
          jetbrainsMono.variable,
          "min-h-screen bg-silk font-sans antialiased selection:bg-emerald/30 selection:text-forest"
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" theme="dark" />
        <CookieBanner />
      </body>
    </html>
  );
}
