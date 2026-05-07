import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { ShieldCheck, UserCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landlord Hub | NestIQ",
  description: "Resources, calculators, and expert connections for UK landlords. Manage your property portfolio efficiently.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Protect your investment."
      intro="Whether you are an accidental landlord or managing a large portfolio, connect with verified ARLA-accredited letting agents to secure reliable tenants."
      icon={UserCheck}
      primaryAction={{
        label: "Find a Letting Agent",
        href: "/agents/directory",
        icon: ShieldCheck
      }}
      tools={[
        { title: "Rental Yield Calculator", desc: "Calculate gross and net property yields." },
        { title: "Property Value Estimate", desc: "Track the capital growth of your portfolio." },
        { title: "Area Comparison Tool", desc: "Research new investment territories." }
      ]}
      guides={[
        { title: "The 2024 Guide to Landlord Compliance", readTime: "12 min read" },
        { title: "Fully Managed vs Let Only: Which is Best?", readTime: "6 min read" },
        { title: "Understanding Section 21 and Section 8", readTime: "8 min read" },
        { title: "Preparing a Property for the Rental Market", readTime: "5 min read" }
      ]}
      faqs={[
        { q: "What are my legal obligations as a landlord?", a: "Key obligations include ensuring the property has a valid Gas Safety Certificate, an EPC rating of E or above, safe electrical installations, and working smoke alarms." },
        { q: "Should I use a letting agent?", a: "A professional letting agent ensures you remain compliant with over 150 pieces of legislation, handles tenant vetting, manages deposits, and deals with maintenance emergencies 24/7." },
        { q: "How is my tenant's deposit protected?", a: "By law, landlords or their agents must place a tenant's deposit into a government-backed tenancy deposit scheme (TDP) within 30 days of receiving it." }
      ]}
    />
  );
}
