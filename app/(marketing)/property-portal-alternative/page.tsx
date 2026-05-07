import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Property Portal Alternative for Independent Agents | NestIQ",
  description: "NestIQ is the technology-first property portal alternative designed to give independent estate agents better leads, fairer pricing, and complete data ownership.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="The fair property portal alternative."
      intro="Built exclusively for verified independent estate agents, NestIQ provides the technology infrastructure needed to compete without the prohibitive legacy costs."
      problemTitle="The Duopoly Problem"
      problemDesc="For too long, the UK property market has been dominated by a small number of massive platforms. This concentration of power has led to an environment where independent agents feel they have little choice but to accept unfavorable terms, aggressive pricing strategies, and the monetization of their own listing data."
      solutionTitle="A Balanced Ecosystem"
      solutionDesc="NestIQ represents a fundamental shift in the portal landscape. We view ourselves as your technology partner, not a gatekeeper. By capping our fees, refusing to sell competing direct-to-vendor valuation products, and prioritizing high-intent lead generation, we're building a platform where independent agencies can thrive on their own terms."
    />
  );
}
