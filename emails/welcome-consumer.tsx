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

export const WelcomeConsumerEmail = ({ userName }: { userName: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Nestiq 👋</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>NESTIQ</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Welcome to the future of UK property, {userName}.</Heading>
            <Text style={text}>
              Nestiq was built to be fair and fast. Here are three things you can do right now to find your next home:
            </Text>

            <Section style={actionGrid}>
              <div style={actionItem}>
                <Text style={actionTitle}>1. Save a Search</Text>
                <Text style={actionDesc}>Narrow down exactly what you're looking for with our AI filters.</Text>
              </div>
              <div style={actionItem}>
                <Text style={actionTitle}>2. Set an Alert</Text>
                <Text style={actionDesc}>Be the first to know when a property matching your criteria hits the market.</Text>
              </div>
              <div style={actionItem}>
                <Text style={actionTitle}>3. Find an Agent</Text>
                <Text style={actionDesc}>Browse our directory of 800+ verified partner agencies.</Text>
              </div>
            </Section>

            <Button style={button} href="https://nestiq.avorria.com/search">
              Start Searching
            </Button>

            <Hr style={hr} />
            <Text style={footer}>Find Home. Fair and Fast.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeConsumerEmail;

const main = { backgroundColor: "#F9FAFB", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "20px 0 48px", width: "580px" };
const header = { backgroundColor: "#1A6B4A", padding: "32px", textAlign: "center" as const, borderRadius: "8px 8px 0 0" };
const logo = { color: "#FFFFFF", fontSize: "24px", fontWeight: "800", margin: "0" };
const content = { backgroundColor: "#FFFFFF", padding: "40px", borderRadius: "0 0 8px 8px" };
const h1 = { color: "#0A0A0A", fontSize: "24px", fontWeight: "700", margin: "0 0 24px" };
const text = { color: "#374151", fontSize: "16px", lineHeight: "24px", margin: "12px 0" };
const actionGrid = { margin: "32px 0" };
const actionItem = { marginBottom: "20px" };
const actionTitle = { fontWeight: "700", color: "#1A6B4A", margin: "0 0 4px" };
const actionDesc = { fontSize: "14px", color: "#6B7280", margin: "0" };
const button = { backgroundColor: "#1A6B4A", borderRadius: "6px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "block", padding: "16px", marginTop: "32px" };
const hr = { borderColor: "#E5E7EB", margin: "32px 0" };
const footer = { color: "#9CA3AF", fontSize: "14px", textAlign: "center" as const };
