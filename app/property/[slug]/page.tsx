import { allProperties } from "@/lib/data/properties";
import { notFound } from "next/navigation";
import { PropertyDetail } from "./_PropertyDetail";

// Next.js 15: params is a Promise — must be awaited in server components
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = allProperties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}

export async function generateStaticParams() {
  return allProperties.map((p) => ({ slug: p.slug }));
}
