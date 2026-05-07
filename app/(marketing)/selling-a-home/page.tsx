import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Building2, Tag } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selling Your Home | NestIQ",
  description: "Get an indicative valuation and connect with the best independent estate agents in your area to sell your home.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Sell your home."
      intro="Achieve the best price by instructing an independent local expert. Use our data to prepare, then connect with a verified NestIQ partner agency."
      icon={Tag}
      primaryAction={{
        label: "Find a Local Valuation Expert",
        href: "/agents/directory",
        icon: Building2
      }}
      tools={[
        { title: "Property Value Estimate", desc: "Get an indicative baseline valuation." },
        { title: "Moving Cost Calculator", desc: "Estimate conveyancing and agent fees." },
        { title: "Seller Preparation Checklist", desc: "Ensure your home is viewing-ready." }
      ]}
      guides={[
        { title: "How to Prepare Your Home for Viewings", readTime: "7 min read" },
        { title: "Why Independent Agents Achieve Better Prices", readTime: "5 min read" },
        { title: "Understanding EPCs When Selling", readTime: "4 min read" },
        { title: "Negotiating an Offer: Best Practices", readTime: "6 min read" }
      ]}
      faqs={[
        { q: "How much does it cost to sell a house?", a: "Costs typically include estate agent fees (usually 1-2% + VAT), conveyancing fees, and potentially an EPC if you don't have a valid one." },
        { q: "Why should I use an independent agent?", a: "Independent agents rely on local reputation. They often have deep, nuanced knowledge of the hyper-local market and provide a more dedicated, personal service compared to national call-center models." },
        { q: "Do I need to do viewings myself?", a: "Most full-service independent agents will conduct all viewings on your behalf, ensuring professional negotiation and immediate feedback." }
      ]}
    />
  );
}
