import React from "react";

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helpers to generate specific schemas
export const schemas = {
  property: (property: any) => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://nestiq.avorria.com/property/${property.slug}`,
    "image": property.images?.[0]?.url,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "GBP"
    },
    "numberOfRooms": (property.bedrooms || 0) + (property.reception_rooms || 0),
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.sqft,
      "unitCode": "FTK"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address_line1,
      "addressLocality": property.town,
      "addressRegion": property.county,
      "postalCode": property.postcode,
      "addressCountry": "GB"
    }
  }),
  agent: (agency: any) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": agency.name,
    "url": `https://nestiq.avorria.com/agents/${agency.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": agency.address_line1,
      "addressLocality": agency.city,
      "postalCode": agency.postcode,
      "addressCountry": "GB"
    },
    "telephone": agency.phone,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agency.avg_rating,
      "reviewCount": agency.review_count
    }
  }),
  breadcrumb: (items: { name: string; item: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  }),
  faq: (questions: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  })
};
