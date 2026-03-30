import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Download, BookOpen, ExternalLink, ArrowRight, ChevronRight
} from "lucide-react";

/* ─── Resource data ─────────────────────────────────────────── */
const resources = [
  {
    id: "itr-salaried-guide",
    icon: FileText,
    title: "ITR Filing Guide for Salaried Employees",
    type: "PDF Guide",
    category: "guides",
    tag: "Income Tax",
    desc: "Step-by-step guide to filing your income tax return as a salaried employee — Form 16, deductions, and deadline.",
    pages: "12 pages",
  },
  {
    id: "gst-registration-checklist",
    icon: FileText,
    title: "GST Registration — Documents Checklist",
    type: "Checklist",
    category: "checklists",
    tag: "GST",
    desc: "Complete list of documents required for GST registration for individuals, sole proprietors, and companies.",
    pages: "2 pages",
  },
  {
    id: "form-26as-ais-guide",
    icon: FileText,
    title: "Form 26AS & AIS — How to Read Them",
    type: "Guide",
    category: "guides",
    tag: "Income Tax",
    desc: "A plain-language explanation of your annual tax credit statement and Annual Information Statement.",
    pages: "8 pages",
  },
  {
    id: "tax-regime-comparison",
    icon: BookOpen,
    title: "New vs Old Tax Regime — Comparison Chart",
    type: "Reference",
    category: "references",
    tag: "Tax Planning",
    desc: "Side-by-side breakeven analysis to help you choose the right regime for FY 2024-25.",
    pages: "3 pages",
  },
  {
    id: "nri-tax-reference",
    icon: FileText,
    title: "NRI Tax Obligations — Quick Reference",
    type: "Reference Card",
    category: "references",
    tag: "NRI",
    desc: "Key obligations, timelines, applicable forms, and DTAA guidance for Non-Resident Indians.",
    pages: "4 pages",
  },
  {
    id: "startup-compliance-checklist",
    icon: FileText,
    title: "Startup Compliance Timeline",
    type: "Checklist",
    category: "checklists",
    tag: "Startups",
    desc: "From incorporation to annual ROC filings — a compliance timeline every startup founder should have.",
    pages: "5 pages",
  },
  {
    id: "80c-investment-guide",
    icon: BookOpen,
    title: "Section 80C Tax Saving — Options and Limits",
    type: "Guide",
    category: "guides",
    tag: "Tax Planning",
    desc: "All 80C investment options (PPF, ELSS, LIC, NSC, home loan) explained with the ₹1.5 lakh cap in context.",
    pages: "6 pages",
  },
  {
    id: "gst-returns-calendar",
    icon: FileText,
    title: "GST Returns Quick Reference Card",
    type: "Reference Card",
    category: "references",
    tag: "GST",
    desc: "All GSTR forms, filing frequency, due dates, and who needs to file — on one page.",
    pages: "1 page",
  },
];

const govLinks = [
  { name: "Income Tax e-Filing Portal",      href: "https://eportal.incometax.gov.in/",   tag: "Income Tax" },
  { name: "GST Portal",                       href: "https://www.gst.gov.in/",              tag: "GST" },
  { name: "MCA21 — Ministry of Corporate Affairs", href: "https://www.mca.gov.in/",        tag: "Business" },
  { name: "TRACES — TDS Reconciliation Portal", href: "https://www.tdscpc.gov.in/",        tag: "TDS" },
  { name: "ICAI Official Website",            href: "https://www.icai.org/",                tag: "CA Profession" },
  { name: "RBI FEMA Guidelines",              href: "https://www.rbi.org.in/",              tag: "NRI" },
  { name: "DPIIT — Startup India Portal",     href: "https://www.startupindia.gov.in/",    tag: "Startups" },
  { name: "Insolvency and Bankruptcy Board",  href: "https://www.ibbi.gov.in/",             tag: "Business" },
];

const CATEGORIES = [
  { id: "all",        label: "All Resources" },
  { id: "guides",     label: "Guides" },
  { id: "checklists", label: "Checklists" },
  { id: "references", label: "Reference Cards" },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? resources
    : resources.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Resources</span>
          </nav>
          <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            Free Resources
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] mb-3 max-w-2xl">
            Guides, checklists, and reference materials.
          </h1>
          <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl">
            Practical resources to help you understand Indian tax and compliance requirements. All prepared and reviewed by CA. Prasad.
          </p>
        </div>
      </section>

      {/* ── Category filter ───────────────────────────── */}
      <div className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                data-testid={`resource-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1 ${
                  activeCategory === cat.id
                    ? "bg-[#1A4D2E] text-white"
                    : "bg-[#F2F5F3] text-[#4E5A54] border border-[#E8EDE9] hover:border-[#1A4D2E]/30 hover:text-[#1A4D2E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Downloads ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <div className="mb-6">
          <p className="font-body text-sm text-[#4E5A54]">
            {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" ? ` · ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : ""}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filtered.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                data-testid={`resource-card-${r.id}`}
                className="group bg-white rounded-xl border border-[#E8EDE9] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e8eee9] flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.5} className="text-[#1A4D2E]" />
                  </div>
                  <span className="text-[0.6875rem] font-body font-semibold text-[#1A4D2E] bg-[#e8eee9] px-2.5 py-0.5 rounded-full">
                    {r.tag}
                  </span>
                </div>
                <h3 className="font-heading font-medium text-sm text-[#1C201E] mb-2 leading-snug">
                  {r.title}
                </h3>
                <p className="font-body text-xs text-[#4E5A54] leading-relaxed mb-5">{r.desc}</p>
                <div className="flex items-center justify-between border-t border-[#E8EDE9] pt-4">
                  <div>
                    <span className="font-body text-[0.6875rem] text-[#4E5A54]">{r.type}</span>
                    <span className="font-body text-[0.6875rem] text-[#4E5A54]"> · {r.pages}</span>
                  </div>
                  <button
                    data-testid={`download-btn-${r.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A4D2E] font-body hover:gap-2 transition-all py-1.5 focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1 rounded"
                  >
                    <Download size={12} strokeWidth={1.5} />
                    Coming soon
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Government links */}
        <div className="mb-14">
          <div className="mb-6">
            <h2 className="font-heading font-medium text-xl text-[#1C201E] mb-1">Useful Government Portals</h2>
            <p className="font-body text-sm text-[#4E5A54]">Official portals for filing, registration, and compliance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {govLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`gov-link-${link.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group flex items-start justify-between bg-white rounded-xl border border-[#E8EDE9] px-4 py-4 hover:border-[#1A4D2E]/30 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="font-body text-sm font-medium text-[#1C201E] group-hover:text-[#1A4D2E] transition-colors leading-snug mb-0.5">
                    {link.name}
                  </p>
                  <p className="font-body text-xs text-[#4E5A54]">{link.tag}</p>
                </div>
                <ExternalLink size={13} strokeWidth={1.5} className="text-[#D4DAD6] group-hover:text-[#1A4D2E] transition-colors shrink-0 mt-0.5 ml-2" />
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-2xl p-8 sm:p-10 grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-2">
              Need personalised guidance?
            </h3>
            <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
              These resources are general. For advice tailored to your specific situation, speak directly with CA. Prasad before making any tax decisions.
            </p>
          </div>
          <div className="sm:text-right">
            <Link
              to="/contact"
              data-testid="resources-cta-btn"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
            >
              Book a Consultation
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
