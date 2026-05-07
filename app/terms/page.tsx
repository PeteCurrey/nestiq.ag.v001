export default function TermsPage() {
  return (
    <div className="bg-pearl min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-32 md:py-48">
        <h1 className="text-display-md md:text-display-lg text-obsidian mb-12">Terms of Service</h1>
        
        <div className="prose prose-lg prose-forest max-w-none text-muted space-y-12">
          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Nestiq platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">2. Use of Platform</h2>
            <p>
              Nestiq provides a marketplace for property listings. 
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Consumers:</strong> You may search, save, and enquire about properties for personal use only. Commercial scraping or data harvesting is strictly prohibited.</li>
              <li><strong>Agents:</strong> Estate agents must be verified partners to list properties. All listings must be accurate and comply with UK material information requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">3. Agent Obligations</h2>
            <p>
              Partner agents are responsible for the accuracy and legality of the content they upload to Nestiq. This includes ensuring all properties are currently available and that descriptions do not mislead potential buyers or tenants. Agents must adhere to the Property Ombudsman's Code of Practice.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">4. Consumer Obligations</h2>
            <p>
              When submitting enquiries through Nestiq, you agree to provide accurate contact information and make enquiries in good faith. Misuse of the enquiry system for spam or harassment is a violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">5. Intellectual Property</h2>
            <p>
              Property listings, including photographs and descriptions, remain the intellectual property of the listing agent or their licensors. Nestiq's logo, design, and platform code are the exclusive property of Nestiq Ltd.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">6. Limitation of Liability</h2>
            <p>
              Nestiq is a platform provider and does not own or control the properties listed by agents. We are not responsible for the accuracy of listings, the condition of properties, or any transactions that occur between users and agents.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">7. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
