export default function CookiesPage() {
  return (
    <div className="bg-pearl min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-32 md:py-48">
        <h1 className="text-display-md md:text-display-lg text-obsidian mb-12">Cookie Policy</h1>
        
        <div className="prose prose-lg prose-forest max-w-none text-muted space-y-12">
          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">What are cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">How we use cookies</h2>
            <p>
              Nestiq uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function, such as managing your login session and security.</li>
              <li><strong>Functional Cookies:</strong> These remember your preferences, such as your saved searches and recently viewed properties.</li>
              <li><strong>Analytical Cookies:</strong> We use services like Vercel Analytics to understand how visitors use our site, which helps us improve the user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">How to control cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can choose to block all cookies, but please note that some parts of the Nestiq platform may not function correctly if you do so.
            </p>
            <p className="mt-4">
              To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">www.aboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">Updates to this policy</h2>
            <p>
              We may update our Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-display-xs text-obsidian mb-6 uppercase tracking-wider">Contact</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at <span className="font-bold text-obsidian">hello@nestiq.co.uk</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
