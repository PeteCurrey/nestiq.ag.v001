import { ConsumerHubTemplate } from "@/components/marketing/ConsumerHubTemplate";
import { Search, Briefcase } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Property | NestIQ",
  description: "Search commercial real estate including retail, office space, industrial units, and leisure properties from independent commercial agents.",
};

export default function Page() {
  return (
    <ConsumerHubTemplate 
      h1="Find commercial space."
      intro="Whether you are expanding your retail footprint or seeking modern office space, connect with specialized independent commercial agents."
      icon={Briefcase}
      primaryAction={{
        label: "Search Commercial Property",
        href: "/search",
        icon: Search
      }}
      tools={[
        { title: "Commercial Stamp Duty Calculator", desc: "Calculate SDLT for non-residential property." },
        { title: "Rental Yield Calculator", desc: "Analyze commercial investment yields." },
        { title: "Area Comparison Tool", desc: "Research local demographic data." }
      ]}
      guides={[
        { title: "Understanding Commercial Lease Terms", readTime: "10 min read" },
        { title: "Use Classes Explained (Class E changes)", readTime: "8 min read" },
        { title: "A Guide to Business Rates", readTime: "6 min read" },
        { title: "Dilapidations: What Tenants Need to Know", readTime: "7 min read" }
      ]}
      faqs={[
        { q: "What is an FRI lease?", a: "FRI stands for Full Repairing and Insuring. It means the tenant is responsible for all repair and maintenance costs of the property, as well as the building insurance premium." },
        { q: "What are Use Classes?", a: "Use Classes determine what a commercial property can legally be used for (e.g., retail, office, restaurant). Recent changes introduced 'Class E', which broadly combines many commercial uses to allow more flexibility." },
        { q: "Do I have to pay business rates?", a: "Most non-domestic properties are subject to business rates, though you may be eligible for Small Business Rate Relief depending on the property's rateable value." }
      ]}
    />
  );
}
