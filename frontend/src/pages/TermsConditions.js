import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

export default function TermsConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions | VNAV & Associates"
        description="Terms and conditions for use of the VNAV & Associates website."
      />
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Terms & Conditions</span>
          </nav>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight text-[#1C201E] mb-6">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <section className="bg-[#FBFBF9] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 font-body text-[#4E5A54] leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">1. Website Usage</h2>
            <p>
              Access to this website is provided solely on an "as is" basis. Use of our general knowledge platform (TaxNext.in) and calculators implies your agreement to these terms.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">2. Professional Relationship</h2>
            <p>
              Using the contact forms or website calculators does not create a professional Chartered Accountant-client relationship. Such a relationship is only established upon formal mutual agreement and receipt of an engagement letter.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">3. Proprietary Rights</h2>
            <p>
              The content, calculators, text, and graphics compiled on this website are the property of VNAV & Associates and its licensors. They may not be copied, reproduced, or distributed without written permission from the Firm.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">4. Modifications</h2>
            <p>
              VNAV & Associates reserves the right to modify these terms and the content on the website without prior notice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
