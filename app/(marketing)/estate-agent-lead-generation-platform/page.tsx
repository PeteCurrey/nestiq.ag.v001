import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Agent Lead Generation Platform | NestIQ",
  description: "Generate high-quality vendor and buyer leads. NestIQ focuses on verified, intent-driven enquiries to help independent estate agents grow their pipeline.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="Better leads. Higher conversions."
      intro="Stop paying for low-quality, duplicated enquiries. NestIQ focuses on delivering verified, high-intent leads that actually convert into instructions and sales."
      problemTitle="The Volume Illusion"
      problemDesc="Many legacy platforms justify their high fees by pointing to massive volume metrics and thousands of 'leads' generated. However, agents know that much of this volume consists of low-intent clicks, duplicate enquiries sent to multiple competitors simultaneously, and generalized spam that wastes valuable negotiating time."
      solutionTitle="Intelligence-Driven Lead Capture"
      solutionDesc="NestIQ prioritizes lead quality over vanity metrics. Our platform utilizes advanced qualification flows to score incoming enquiries based on readiness to move, financial qualification, and valuation intent. By capturing richer data upfront, we deliver leads that require less qualification time and yield a significantly higher conversion rate for your negotiators."
    />
  );
}
