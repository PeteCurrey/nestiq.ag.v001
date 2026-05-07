import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Agent Portal Fees | Market Debate & Alternatives | NestIQ",
  description: "As reports of escalating legacy portal fees continue, independent agencies are reviewing their software spend. Learn how NestIQ offers a fairer financial model.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="Reassessing escalating portal fees."
      intro="With ongoing market debate surrounding the reported high profit margins and escalating fee structures of legacy portals, agencies are demanding a fairer financial model."
      problemTitle="The Financial Strain"
      problemDesc="Independent agencies often report that legacy portal fees constitute their largest single marketing expense. The frustration stems from annual fee increases that frequently outpace inflation, coupled with long-term contracts that make it difficult for agencies to easily transition away or negotiate better terms."
      solutionTitle="Transparent, Flat-Rate Pricing"
      solutionDesc="NestIQ is committed to ending the cycle of unpredictable fee hikes. We offer a transparent, flat-rate monthly subscription based purely on your branch count. No hidden fees for lead generation, no premium visibility upgrades required, and absolutely no multi-year lock-ins. You pay for software value, not just access to the market."
    />
  );
}
