import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Search, Home } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buying a Home | NestIQ",
  description: "Expert advice, guides, and tools to help you find and buy your perfect home through verified independent estate agents.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Find your next home."
      intro="Whether you're a first-time buyer or looking for your forever home, we provide the tools, insights, and local agent connections to make it happen."
      icon={Home}
      primaryAction={{
        label: "Search Properties for Sale",
        href: "/search",
        icon: Search
      }}
      tools={[
        { title: "Mortgage Affordability Calculator", desc: "Find out how much you could borrow." },
        { title: "Stamp Duty Calculator", desc: "Calculate exact SDLT on your purchase." },
        { title: "Moving Cost Calculator", desc: "Estimate conveyancing and removal fees." }
      ]}
      guides={[
        { title: "A Complete Guide for First-Time Buyers", readTime: "10 min read" },
        { title: "How to Make a Winning Offer", readTime: "5 min read" },
        { title: "Understanding Surveys and Conveyancing", readTime: "8 min read" },
        { title: "New Build vs Older Properties", readTime: "6 min read" }
      ]}
      faqs={[
        { q: "How much deposit do I need?", a: "Typically, you'll need at least 5% of the property's value as a deposit, though 10% or more will usually secure better mortgage rates." },
        { q: "What is an Agreement in Principle (AIP)?", a: "An AIP is a written estimate from a lender indicating how much they would be willing to lend you. It shows estate agents you are a serious buyer." },
        { q: "Are the listings on NestIQ verified?", a: "Yes, all properties on NestIQ are listed exclusively by our network of verified, professional independent estate agencies." }
      ]}
    />
  );
}
