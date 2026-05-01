import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EnquiryEmailProps {
  enquirerName: string;
  enquirerEmail: string;
  enquirerPhone?: string;
  propertyAddress: string;
  propertyPrice: string;
  propertyImage: string;
  message: string;
  preferredContact: string;
  enquiryId: string;
}

export const EnquiryToAgentEmail = ({
  enquirerName,
  enquirerEmail,
  enquirerPhone,
  propertyAddress,
  propertyPrice,
  propertyImage,
  message,
  preferredContact,
  enquiryId,
}: EnquiryEmailProps) => {
  const previewText = `New enquiry for ${propertyAddress} from ${enquirerName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>NESTIQ</Text>
          </Section>
          
          <Section style={propertySection}>
            <Img
              src={propertyImage}
              width="560"
              height="300"
              alt="Property"
              style={propertyImg}
            />
            <div style={propertyInfo}>
              <Text style={propertyPriceText}>{propertyPrice}</Text>
              <Text style={propertyAddressText}>{propertyAddress}</Text>
            </div>
          </Section>

          <Section style={content}>
            <Heading style={h1}>New Property Lead</Heading>
            <Text style={text}>
              <strong>From:</strong> {enquirerName} ({enquirerEmail})
            </Text>
            {enquirerPhone && (
              <Text style={text}>
                <strong>Phone:</strong> {enquirerPhone}
              </Text>
            )}
            <Text style={text}>
              <strong>Preferred Contact:</strong> {preferredContact}
            </Text>
            
            <Section style={quoteSection}>
              <Text style={quoteText}>"{message}"</Text>
            </Section>

            <Button
              style={button}
              href={`https://nestiq.co.uk/agent/leads/${enquiryId}`}
            >
              View Lead in Dashboard
            </Button>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Reply directly to this email to contact {enquirerName}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EnquiryToAgentEmail;

const main = {
  backgroundColor: "#F9FAFB",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const header = {
  backgroundColor: "#1A6B4A",
  padding: "32px",
  textAlign: "center" as const,
  borderRadius: "8px 8px 0 0",
};

const logo = {
  color: "#FFFFFF",
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "0.05em",
  margin: "0",
};

const propertySection = {
  backgroundColor: "#FFFFFF",
  padding: "20px",
  borderBottom: "1px solid #E5E7EB",
};

const propertyImg = {
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const propertyInfo = {
  marginTop: "16px",
};

const propertyPriceText = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#1A6B4A",
  margin: "0",
};

const propertyAddressText = {
  fontSize: "14px",
  color: "#6B7280",
  margin: "4px 0 0",
};

const content = {
  backgroundColor: "#FFFFFF",
  padding: "40px",
  borderRadius: "0 0 8px 8px",
};

const h1 = {
  color: "#0A0A0A",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 24px",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "12px 0",
};

const quoteSection = {
  backgroundColor: "#F4F0E8",
  padding: "24px",
  borderRadius: "8px",
  margin: "24px 0",
};

const quoteText = {
  color: "#1F2937",
  fontSize: "16px",
  fontStyle: "italic",
  margin: "0",
};

const button = {
  backgroundColor: "#1A6B4A",
  borderRadius: "6px",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "16px",
  marginTop: "32px",
};

const hr = {
  borderColor: "#E5E7EB",
  margin: "32px 0",
};

const footer = {
  color: "#9CA3AF",
  fontSize: "14px",
  textAlign: "center" as const,
};
