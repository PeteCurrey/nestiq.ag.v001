import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Rightmove Alternative for Independent Estate Agents | NestIQ Beta",
  description: "Many independent agencies are reassessing portal dependency. Discover how NestIQ offers a fair, flat-rate alternative designed exclusively for verified estate agents.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="A fairer alternative to legacy property portals."
      intro="Independent agencies across the UK are actively reassessing their portal dependencies in search of fairer pricing, better lead ownership, and more transparent partnerships."
      problemTitle="The Cost of Dependency"
      problemDesc="For years, there has been widespread market debate regarding the escalating fees and restrictive contracts imposed by legacy portals. Many independent agents feel trapped in a system where they provide the crucial listing inventory, yet face continuous price hikes and aggressive upselling just to maintain local visibility."
      solutionTitle="The NestIQ Approach"
      solutionDesc="NestIQ is built differently. We operate on a flat-rate subscription model with zero multi-year lock-ins. We don't believe in pay-to-play visibility tiers. Our algorithmic search ensures that if a property matches a buyer's criteria, it's shown—regardless of whether the listing agency is a single-branch independent or a national corporate."
    />
  );
}
