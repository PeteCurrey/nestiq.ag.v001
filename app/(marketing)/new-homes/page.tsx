import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Search, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Build Homes | NestIQ",
  description: "Search exclusive new build developments and off-plan properties from the UK's leading regional developers and independent agents.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Discover new build homes."
      intro="Explore premium new build developments, eco-homes, and off-plan investment opportunities listed by verified developers and their agency partners."
      icon={Sparkles}
      primaryAction={{
        label: "Search New Homes",
        href: "/search",
        icon: Search
      }}
      tools={[
        { title: "Mortgage Affordability", desc: "Calculate how much you could borrow." },
        { title: "Stamp Duty Calculator", desc: "Calculate exact SDLT on your purchase." },
        { title: "Area Comparison Tool", desc: "Research new development areas." }
      ]}
      guides={[
        { title: "The Benefits of Buying a New Build Home", readTime: "5 min read" },
        { title: "Understanding Off-Plan Property Purchases", readTime: "8 min read" },
        { title: "A Guide to New Home Warranties (NHBC)", readTime: "6 min read" },
        { title: "Snagging Surveys Explained", readTime: "4 min read" }
      ]}
      faqs={[
        { q: "What are the advantages of a new build?", a: "New builds are significantly more energy-efficient (often EPC A or B), come with a 10-year warranty, have no upward chain, and offer a 'blank canvas' for decoration." },
        { q: "What is a snagging survey?", a: "A snagging survey is an independent inspection of a new build property to identify minor defects or unfinished work that the developer needs to fix before or shortly after you move in." },
        { q: "Can I customize a new build home?", a: "If you buy 'off-plan' (before construction is finished), developers often allow you to choose fixtures, fittings, and finishes such as kitchen units and flooring." }
      ]}
    />
  );
}
