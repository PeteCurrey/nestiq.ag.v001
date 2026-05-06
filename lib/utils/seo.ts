import Head from "next/head";
import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterHandle?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage = "https://nestiq.avorria.com/og-image.jpg",
  ogType = "website",
  noindex = false,
}: SEOProps): Metadata {
  const fullTitle = `${title} | NESTIQ`;
  const url = canonical ? `https://nestiq.avorria.com${canonical}` : "https://nestiq.avorria.com";

  return {
    title: fullTitle,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: "NESTIQ",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_GB",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: [ogImage],
      creator: "@nestiq_uk",
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
