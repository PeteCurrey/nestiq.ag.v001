import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PropertyDetail } from "./_PropertyDetail";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from('properties')
    .select('*, property_images(*), agencies(*)')
    .eq('slug', slug)
    .single();

  if (error || !property) {
    notFound();
  }

  return <PropertyDetail property={property as any} />;
}
