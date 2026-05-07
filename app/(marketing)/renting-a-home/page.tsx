import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Search, Key } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renting a Home | NestIQ",
  description: "Find your next rental property. Access affordability tools, tenant guides, and high-quality rental listings from professional letting agents.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Find your next rental."
      intro="Discover high-quality rental properties from verified professional letting agencies. We provide the tools you need to secure your ideal home quickly."
      icon={Key}
      primaryAction={{
        label: "Search Properties to Rent",
        href: "/search",
        icon: Search
      }}
      tools={[
        { title: "Rent Affordability Calculator", desc: "Calculate your comfortable monthly limit." },
        { title: "Moving Cost Calculator", desc: "Estimate deposits and removal costs." },
        { title: "Area Comparison Tool", desc: "Compare local amenities and transport." }
      ]}
      guides={[
        { title: "The Ultimate Tenant Checklist", readTime: "8 min read" },
        { title: "Understanding Your Tenancy Agreement", readTime: "6 min read" },
        { title: "How Deposit Protection Schemes Work", readTime: "5 min read" },
        { title: "Knowing Your Rights as a Tenant", readTime: "10 min read" }
      ]}
      faqs={[
        { q: "What fees do I have to pay?", a: "Under the Tenant Fees Act, most letting fees are banned. You typically only pay your rent, a refundable holding deposit (capped at 1 week's rent), and a security deposit (capped at 5 weeks' rent)." },
        { q: "How do I prove my income?", a: "Letting agents usually require your last 3 months of bank statements, payslips, or a letter from your employer to verify your affordability." },
        { q: "Can I rent with a pet?", a: "This depends entirely on the landlord. Always use our 'Pets Allowed' advanced filter when searching for properties." }
      ]}
    />
  );
}
