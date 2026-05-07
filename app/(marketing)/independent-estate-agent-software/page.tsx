import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Estate Agent Software | NestIQ Beta",
  description: "Modern software and lead generation for independent estate agents. NestIQ provides the technology to compete locally without the enterprise price tag.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="Premium software for independent agencies."
      intro="Compete at the highest level without the enterprise software costs. NestIQ provides independent agents with the advanced intelligence tools previously reserved for national networks."
      problemTitle="The Technology Gap"
      problemDesc="As property marketing becomes increasingly digital and data-driven, independent agencies often find themselves priced out of top-tier software. From advanced CRM integrations to AI-driven listing tools and local market velocity analytics, piecing together a modern software stack from multiple vendors is both expensive and highly inefficient."
      solutionTitle="Integrated Agency Intelligence"
      solutionDesc="NestIQ bridges the gap by providing an all-in-one growth platform. Your subscription includes access to our AI listing assistant, deep local market insights, and a centralized lead dashboard that scores buyer intent. By consolidating these tools into one unified portal ecosystem, we dramatically reduce your overall software expenditure while improving your digital capabilities."
    />
  );
}
