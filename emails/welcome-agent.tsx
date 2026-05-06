import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const WelcomeAgentEmail = ({ agencyName }: { agencyName: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Nestiq — Let's get your first listing live</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>NESTIQ</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Welcome to the direct challenger, {agencyName}.</Heading>
            <Text style={text}>
              You're joining a community of forward-thinking agents who are saving up to £6,000 a month. Let's get you set up:
            </Text>

            <Section style={checklist}>
              {[
                "Complete your agency profile",
                "Add your high-res logo",
                "Create your first listing",
                "Set up your automated lead alerts",
                "Invite your team members"
              ].map((step, i) => (
                <div key={i} style={checkItem}>
                  <div style={bullet}>✓</div>
                  <Text style={checkText}>{step}</Text>
                </div>
              ))}
            </Section>

            <Section style={savingsBox}>
              <Text style={savingsTitle}>The Nestiq Advantage</Text>
              <Text style={savingsText}>
                By switching from Rightmove, you're currently projected to save over <strong>£24,000 per year</strong> in portal fees.
              </Text>
            </Section>

            <Button style={button} href="https://nestiq.avorria.com/agent/dashboard">
              Go to Dashboard
            </Button>

            <Hr style={hr} />
            <Text style={footer}>NESTIQ FOR AGENTS</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeAgentEmail;

const main = { backgroundColor: "#F9FAFB", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "20px 0 48px", width: "580px" };
const header = { backgroundColor: "#1A6B4A", padding: "32px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const logo = { color: "#FFFFFF", fontSize: "24px", fontWeight: "800", margin: "0" };
const content = { backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "0 0 8px 8px" };
const h1 = { color: "#0A0A0A", fontSize: "24px", fontWeight: "700", margin: "0 0 24px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "24px", margin: "12px 0" };
const checklist = { margin: "32px 0" };
const checkItem = { display: "flex", gap: "12px", marginBottom: "12px" };
const bullet = { color: "#2ECC87", fontWeight: "800" };
const checkText = { color: "#1F2937", fontSize: "15px", margin: "0" };
const savingsBox = { backgroundColor: "#1A6B4A", padding: "24px", borderRadius: "8px", color: "#FFFFFF", margin: "32px 0" };
const savingsTitle = { color: "#2ECC87", fontSize: "12px", fontWeight: "800", textTransform: "uppercase" as const, margin: "0 0 8px" };
const savingsText = { margin: "0", lineHeight: "22px" };
const button = { backgroundColor: "#1A6B4A", borderRadius: "6px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "block", padding: "16px", marginTop: "32px" };
const hr = { borderColor: "#E5E7EB", margin: "32px 0" };
const footer = { color: "#9CA3AF", fontSize: "14px", textAlign: "center" as const };
