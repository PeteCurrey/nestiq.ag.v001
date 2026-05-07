import { CampaignTemplate } from "@/components/marketing/CampaignTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Fair Property Portal Built for Agents | NestIQ",
  description: "Discover why independent estate agents are joining NestIQ. We are building a fair property portal focused on transparent pricing and data ownership.",
};

export default function Page() {
  return (
    <CampaignTemplate 
      h1="The fair property portal for UK agents."
      intro="We believe a property portal should operate as a transparent partner to the industry, facilitating connections without exploiting the agencies that supply the inventory."
      problemTitle="An Unbalanced Relationship"
      problemDesc="The traditional portal model relies entirely on the hard work of estate agents to source, value, and photograph properties. Yet, once the listing is uploaded, the platform often dictates the rules—leveraging that very data to justify continuous price increases, or worse, using it to launch competing valuation products that attempt to bypass the agent entirely."
      solutionTitle="The Fair Portal Charter"
      solutionDesc="NestIQ is founded on a strict 10-point charter designed to protect independent agents. We guarantee complete data sovereignty, meaning your listings will never be used to train AI models that compete against your business. We commit to a flat pricing structure, equal visibility regardless of agency size, and a strict 'no competing products' promise."
    />
  );
}
