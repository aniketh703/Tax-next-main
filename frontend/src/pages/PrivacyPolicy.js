import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | VNAV & Associates"
        description="Privacy policy governing data handling and client confidentiality."
      />
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Privacy Policy</span>
          </nav>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight text-[#1C201E] mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-[#4E5A54]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="bg-[#FBFBF9] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 font-body text-[#4E5A54] leading-relaxed space-y-8">
          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">1. Confidentiality Assurance</h2>
            <p>
              VNAV & Associates ("the Firm") is bound by the strict confidentiality guidelines stipulated by the Institute of Chartered Accountants of India (ICAI). All client data, financial documents, and personal details shared with the Firm are kept strictly confidential and are used purely for professional engagements.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">2. Data Collection on TaxNext.in</h2>
            <p>
              TaxNext.in, serving as an informational platform, may collect non-identifiable data (such as analytics or cookies) to improve user experience. When you utilize the calculators, we do not store or transmit any input values to our servers. All calculations are executed on the client-side (in your browser).
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">3. Use of Personal Information</h2>
            <p>
              When you submit a contact inquiry, your contact details form the basis of our subsequent communication. We do not sell, rent, or distribute personal information to third parties, unless mandated by law or a valid statutory authority.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">4. Security</h2>
            <p>
              We implement reasonable physical, administrative, and technical safeguards to protect your personal information from unauthorized access, use, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-3">5. Contact Information</h2>
            <p>
              For privacy-related matters, you may contact the Firm at taxnext0204.in@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
