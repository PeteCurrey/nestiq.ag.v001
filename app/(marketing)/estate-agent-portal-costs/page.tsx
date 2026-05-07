import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reduce Estate Agent Portal Costs | NestIQ Beta",
  description: "Stop paying inflated fees for property listings. Compare your current portal costs and discover the savings potential with NestIQ's flat-rate ecosystem.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="Take control of your portal costs."
      intro="Independent agencies shouldn't have to sacrifice their profit margins just to get their vendors' properties seen. It's time for a more sustainable economic model."
      problemTitle="Escalating Operating Costs"
      problemDesc="The traditional portal model often penalizes success. As your agency grows, you are frequently pushed into higher pricing tiers or forced to buy expensive 'add-ons' to maintain your competitive edge in local search results. This constant upselling erodes the very profit margins you work so hard to build."
      solutionTitle="Predictable Agency Economics"
      solutionDesc="We've built NestIQ to scale fairly with your business. By charging a flat monthly fee per branch, your costs remain entirely predictable regardless of how many instructions you win or how many leads you generate. Our platform includes advanced lead intelligence, CRM integrations, and premium property displays as standard—no upselling required."
    />
  );
}
