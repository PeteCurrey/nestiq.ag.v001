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

interface ConfirmationEmailProps {
  userName: string;
  propertyAddress: string;
  propertyPrice: string;
  propertyImage: string;
  agentName: string;
  propertyId: string;
}

export const EnquiryConfirmationEmail = ({
  userName,
  propertyAddress,
  propertyPrice,
  propertyImage,
  agentName,
  propertyId,
}: ConfirmationEmailProps) => {
  const previewText = `Your enquiry has been sent — ${propertyAddress}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>NESTIQ</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Enquiry Received</Heading>
            <Text style={text}>
              Hi {userName}, your enquiry for the following property has been sent to the agent.
            </Text>

            <Section style={propertyCard}>
              <Img
                src={propertyImage}
                width="480"
                height="260"
                alt="Property"
                style={propertyImg}
              />
              <div style={propertyInfo}>
                <Text style={propertyPriceText}>{propertyPrice}</Text>
                <Text style={propertyAddressText}>{propertyAddress}</Text>
              </div>
            </Section>

            <Heading style={h2}>What happens next?</Heading>
            <Section style={stepsSection}>
              <div style={step}>
                <div style={stepNumber}>1</div>
                <Text style={stepText}><strong>Agent reviews:</strong> {agentName} will review your message and property requirements.</Text>
              </div>
              <div style={step}>
                <div style={stepNumber}>2</div>
                <Text style={stepText}><strong>Direct contact:</strong> They'll reach out via phone or email to discuss the details.</Text>
              </div>
              <div style={step}>
                <div style={stepNumber}>3</div>
                <Text style={stepText}><strong>Viewing arranged:</strong> If you're both happy, a physical or virtual viewing will be scheduled.</Text>
              </div>
            </Section>

            <Button
              style={button}
              href={`https://nestiq.avorria.com/property/${propertyId}`}
            >
              View Property
            </Button>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Find Home. Fair and Fast.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EnquiryConfirmationEmail;

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

const h2 = {
  color: "#0A0A0A",
  fontSize: "18px",
  fontWeight: "700",
  margin: "32px 0 16px",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "12px 0",
};

const propertyCard = {
  backgroundColor: "#F9FAFB",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  margin: "24px 0",
};

const propertyImg = {
  borderRadius: "8px",
  objectFit: "cover" as const,
  width: "100%",
};

const propertyInfo = {
  marginTop: "16px",
};

const propertyPriceText = {
  fontSize: "18px",
  fontWeight: "800",
  color: "#1A6B4A",
  margin: "0",
};

const propertyAddressText = {
  fontSize: "14px",
  color: "#6B7280",
  margin: "4px 0 0",
};

const stepsSection = {
  margin: "24px 0",
};

const step = {
  display: "flex",
  gap: "16px",
  marginBottom: "16px",
};

const stepNumber = {
  width: "24px",
  height: "24px",
  backgroundColor: "#2ECC87",
  color: "#1A6B4A",
  borderRadius: "50%",
  fontSize: "12px",
  fontWeight: "800",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const stepText = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "20px",
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
