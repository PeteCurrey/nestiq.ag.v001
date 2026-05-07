import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reduce Rightmove Dependency | NestIQ Beta",
  description: "Learn how independent estate agents are strategically reducing their dependency on legacy portals and reclaiming control of their marketing budgets.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="Strategic independence for estate agents."
      intro="Forward-thinking independent agencies are actively diversifying their digital presence to reduce reliance on any single legacy portal and protect their long-term profitability."
      problemTitle="The Danger of Overreliance"
      problemDesc="Relying on a single platform for the vast majority of your applicant pipeline creates a dangerous business vulnerability. When an agency becomes overly dependent on one legacy portal, they lose all negotiating power. This dynamic forces agents to accept continuous fee hikes and restrictive terms, simply because the perceived risk of leaving is too high."
      solutionTitle="Diversify Your Lead Pipeline"
      solutionDesc="NestIQ offers a highly effective channel to begin diversifying your lead generation. By joining our Founding Agent Programme, you can lock in a low, flat-rate fee and start capturing high-intent leads through a fairer ecosystem. We provide the tools, the audience, and the analytics to help you gradually reduce your dependency on expensive legacy platforms without sacrificing local market share."
    />
  );
}
