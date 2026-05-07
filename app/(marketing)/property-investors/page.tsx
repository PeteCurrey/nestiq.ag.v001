import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Search, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Investors Hub | NestIQ",
  description: "Data-driven insights, calculators, and high-yield property listings for UK property investors and portfolio builders.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Data-driven property investment."
      intro="Identify high-yield opportunities, calculate gross margins, and connect with agents specializing in investment properties and HMOs."
      icon={TrendingUp}
      primaryAction={{
        label: "Search Investment Properties",
        href: "/search",
        icon: Search
      }}
      tools={[
        { title: "Rental Yield Calculator", desc: "Instantly calculate gross and net yields." },
        { title: "Stamp Duty Calculator", desc: "Includes the 3% second-home surcharge." },
        { title: "Area Comparison Tool", desc: "Compare demographic and demand data." }
      ]}
      guides={[
        { title: "The 2024 Guide to HMO Investments", readTime: "12 min read" },
        { title: "Section 24: Tax Implications for Landlords", readTime: "8 min read" },
        { title: "Where to Find the Highest Yields in the UK", readTime: "6 min read" },
        { title: "Flipping Properties: A Risk Assessment", readTime: "10 min read" }
      ]}
      faqs={[
        { q: "What is a good rental yield?", a: "Generally, a gross yield of 5-8% is considered healthy in the current UK market, though HMOs (Houses in Multiple Occupation) can often push yields past 10%." },
        { q: "What is the second home stamp duty surcharge?", a: "Anyone purchasing an additional residential property (like a buy-to-let) must pay a 3% surcharge on top of standard SDLT rates for each band." },
        { q: "Do I need a specific mortgage for an HMO?", a: "Yes. Lenders view HMOs as higher risk than standard buy-to-lets, so you will require a specialized HMO mortgage product, often requiring a larger deposit and proven landlord experience." }
      ]}
    />
  );
}
