import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | VNAV & Associates"
        description="Legal and professional disclaimers compliant with ICAI guidelines."
      />
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Disclaimer</span>
          </nav>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight text-[#1C201E] mb-6">
            Disclaimer
          </h1>
          <p className="font-body text-[#4E5A54] leading-relaxed mb-6">
            In compliance with the Code of Ethics stipulated by the Institute of Chartered Accountants of India (ICAI).
          </p>
        </div>
      </section>

      <section className="bg-[#FBFBF9] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 font-body text-[#4E5A54] leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">1. No Advertisement or Solicitation</h2>
            <p>
              Under the rules of the Institute of Chartered Accountants of India (ICAI), Chartered Accountants are prohibited from soliciting work or advertising their services. This website (and its associated knowledge platform, TaxNext.in) is meant solely to provide general information about VNAV & Associates, its partners, and its practice areas. It is not intended to be an advertisement, promotion, or solicitation of work.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">2. No Guarantee of Results</h2>
            <p>
              VNAV & Associates provides professional services governed by the ICAI framework. We do not provide guarantees or assurances of any specific outcome relating to assessments, audits, tax refunds, or judicial matters. Any information regarding past engagements and scenarios is representative and does not constitute a promise of future results.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">3. No Professional Advice</h2>
            <p>
              The materials provided on this website, including calculators, insights, compliance timelines, and articles on the TaxNext.in platform, are provided "as is" for general informational and awareness purposes only. They do not constitute accounting, tax, legal, investment, or other professional advice. Users should consult a qualified professional for matters specific to their financial situation prior to acting on any information accessed herein.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">4. Limitation of Liability</h2>
            <p>
              VNAV & Associates shall not be held liable for any inaccuracies, omissions, or consequences arising from the use of, or reliance upon, the information presented on this website. Links to external platforms are provided as a convenience, and the Firm does not endorse, control, or assume liability for third-party content.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
