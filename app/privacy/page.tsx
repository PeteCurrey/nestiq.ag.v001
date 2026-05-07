export default function PrivacyPage() {
  return (
    <div className="bg-pearl min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-32 md:py-48">
        <h1 className="text-display-md md:text-display-lg text-obsidian mb-12">Privacy Policy</h1>
        
        <div className="prose prose-lg prose-forest max-w-none text-muted space-y-12">
          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">1. Who we are</h2>
            <p>
              Nestiq Ltd is a company registered in England and Wales, based in Chesterfield, Derbyshire. We operate the Nestiq property portal, connecting buyers and renters with estate agents across the United Kingdom.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">2. What data we collect</h2>
            <p>
              We collect information that you provide directly to us when you use our platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Contact details: Name, email address, and telephone number when you submit an enquiry.</li>
              <li>Search behavior: Your property search history and saved searches.</li>
              <li>Enquiry data: The specific properties and agents you interact with.</li>
              <li>Technical data: IP address, browser type, and device information used to access Nestiq.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">3. How we use your data</h2>
            <p>
              We process your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>To facilitate property enquiries between you and our partner estate agents.</li>
              <li>To provide personalized search results and saved property alerts.</li>
              <li>To improve our platform's performance and user experience.</li>
              <li>To communicate important service updates and security notices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">4. Who we share data with</h2>
            <p>
              When you submit a "Request Particulars" or contact form for a property, your contact details are shared only with the specific estate agency listing that property. We do not sell your personal data to third-party marketing companies. We never use agent data to compete with valuation services or train models against your interests.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">5. Your rights under UK GDPR</h2>
            <p>
              Under the UK General Data Protection Regulation, you have the right to access, correct, or delete your personal data. You also have the right to data portability and to object to certain processing activities. To exercise these rights, please contact our privacy officer.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">6. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and security. We also use analytical cookies to understand how users interact with our site. For more details, please see our <a href="/cookies" className="text-emerald hover:underline">Cookie Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">7. Contact us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please email us at <span className="font-bold text-obsidian">privacy@nestiq.co.uk</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
