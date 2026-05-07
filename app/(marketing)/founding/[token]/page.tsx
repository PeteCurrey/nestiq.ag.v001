import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FoundingCampaignClient } from "@/components/founding/FoundingCampaignClient";

export default async function PersonalizedFoundingPage({ 
  params 
}: { 
  params: Promise<{ token: string }> 
}) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  if (!token || token.length !== 8) {
    redirect('/founding');
  }

  const supabase = await createClient();
  const { data: recipient, error } = await supabase
    .from("founding_recipients")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !recipient) {
    redirect('/founding');
  }

  // Check expiration
  if (recipient.held_until && new Date(recipient.held_until) < new Date() && ['unclaimed', 'viewed'].includes(recipient.state)) {
    // We could update state to expired here, but API/view tracking should handle it to be safe
    // For now, if expired, we show the expired fallback inside the Client Component or handle it server-side
    // Let's pass the recipient to the client and handle the UI states there.
  }

  return (
    <FoundingCampaignClient recipient={recipient} />
  );
}
