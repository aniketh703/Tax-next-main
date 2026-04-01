import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | VNAV & Associates"
        description="Information regarding the use of cookies on our platform."
      />
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Cookie Policy</span>
          </nav>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight text-[#1C201E] mb-6">
            Cookie Policy
          </h1>
        </div>
      </section>

      <section className="bg-[#FBFBF9] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 font-body text-[#4E5A54] leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">1. What are Cookies?</h2>
            <p>
              Cookies are small text files stored locally within your web browser. They are used to facilitate page navigation, remember preferences, and generate site usage analytics.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">2. How We Use Cookies</h2>
            <p>
              The VNAV & Associates website and TaxNext.in platform use cookies sparingly. We utilize:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for routing and ensuring proper layout rendering.</li>
              <li><strong>Analytical Cookies:</strong> Used to understand aggregated page views and calculator utilization, completely anonymized.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">3. Managing Preferences</h2>
            <p>
              You may configure your web browser to reject or delete cookies. Note that disabling certain essential cookies may limit functionality, especially within interactive forms and calculators on the TaxNext.in platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
