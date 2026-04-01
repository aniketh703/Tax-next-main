import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";

const IMGS = {
  budget:   "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
  gst:      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
  nri:      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
  tax:      "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
  startup:  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
  compliance: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&w=600&q=75",
};

const articles = [
  {
    slug: "budget-2025-tax-changes",
    img: IMGS.budget,
    tag: "Budget 2025",
    title: "Union Budget 2025: Key Tax Changes for Salaried Individuals",
    date: "February 2025",
    desc: "An analysis of the major income tax changes announced in Union Budget 2025 and what they mean for employees in the new tax regime.",
    readTime: "6 min read",
    hasFull: true,
  },
  {
    slug: "gst-compliance-checklist-2025",
    img: IMGS.gst,
    tag: "GST",
    title: "GST Compliance Checklist for Small Businesses in 2025",
    date: "January 2025",
    desc: "A practical checklist every small business owner should follow to stay GST-compliant through the year — returns, ITC, and annual filings.",
    readTime: "4 min read",
    hasFull: true,
  },
  {
    slug: "nri-itr-filing-guide",
    img: IMGS.nri,
    tag: "NRI Guide",
    title: "ITR Filing for NRIs: A Complete Step-by-Step Guide",
    date: "December 2024",
    desc: "Everything an NRI needs to know about filing income tax returns in India — eligibility, applicable forms, DTAA claims, and deadlines.",
    readTime: "7 min read",
    hasFull: true,
  },
  {
    slug: "save-tax-deductions-2024-25",
    img: IMGS.tax,
    tag: "Tax Planning",
    title: "How to Save Tax Legally: Top Deductions for FY 2024-25",
    date: "November 2024",
    desc: "Legal tax-saving options under 80C, 80D, HRA, and other deductions — explained plainly with examples relevant to salaried individuals.",
    readTime: "6 min read",
    hasFull: true,
  },
  {
    slug: "startup-compliance-calendar",
    img: IMGS.startup,
    tag: "Startups",
    title: "Startup India: Compliance Calendar and Key Deadlines",
    date: "October 2024",
    desc: "A founder's guide to statutory compliance — from incorporation to annual ROC filings, TDS, GST, and income tax obligations.",
    readTime: "5 min read",
  },
  {
    slug: "gst-input-tax-credit-explained",
    img: IMGS.gst,
    tag: "GST",
    title: "Understanding Input Tax Credit (ITC) Under GST",
    date: "September 2024",
    desc: "A plain-language explanation of ITC eligibility, conditions under Section 16, GSTR-2B matching, and common mistakes businesses make.",
    readTime: "5 min read",
  },
  {
    slug: "new-vs-old-tax-regime-comparison",
    img: IMGS.tax,
    tag: "Income Tax",
    title: "New vs Old Tax Regime: Which Is Better for You?",
    date: "August 2024",
    desc: "A practical comparison of the two tax regimes for salaried employees — with breakeven analysis based on income and deduction levels.",
    readTime: "6 min read",
  },
  {
    slug: "tds-guide-2024-25",
    img: IMGS.compliance,
    tag: "Compliance",
    title: "TDS: What Payers Need to Know in 2024-25",
    date: "July 2024",
    desc: "Rates, thresholds, due dates for deposit, and filing obligations under TDS provisions — a reference guide for businesses and individuals.",
    readTime: "4 min read",
  },
  {
    slug: "nri-banking-fema-nro-nre",
    img: IMGS.nri,
    tag: "NRI Guide",
    title: "FEMA and NRI Banking: NRO, NRE, and FCNR Accounts",
    date: "June 2024",
    desc: "How NRIs should structure their banking in India — the difference between NRO and NRE accounts, repatriation limits, and tax implications.",
    readTime: "5 min read",
  },
];

const TAGS = ["All", "Budget 2025", "GST", "NRI Guide", "Tax Planning", "Income Tax", "Startups", "Compliance"];

export default function Insights() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All"
    ? articles
    : articles.filter((a) => a.tag === activeTag);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Insights</span>
          </nav>
          <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            Knowledge Hub
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] mb-3 max-w-2xl">
            Tax insights and practical guidance.
          </h1>
          <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl">
            Articles covering tax updates, GST developments, and regulatory changes — written and reviewed by VNAV & Associates professionals.
          </p>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────── */}
      <div className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                data-testid={`tag-filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1 ${
                  activeTag === tag
                    ? "bg-[#1A4D2E] text-white"
                    : "bg-[#F2F5F3] text-[#4E5A54] border border-[#E8EDE9] hover:border-[#1A4D2E]/30 hover:text-[#1A4D2E]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Articles ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-[#4E5A54] text-sm">No articles in this category yet.</p>
          </div>
        ) : (
          <div
            data-testid="insights-grid"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          >
            {filtered.map((art, i) => (
              <article
                key={i}
                data-testid={`insight-card-${i}`}
                className="group bg-white rounded-xl border border-[#E8EDE9] overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/insights/${art.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-[#F2F5F3]">
                    <img
                      src={art.img}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1A4D2E] text-[0.6875rem] font-semibold font-body px-2.5 py-1 rounded-full">
                      {art.tag}
                    </span>
                    {art.hasFull && (
                      <span className="absolute top-3 right-3 bg-[#1A4D2E] text-white text-[0.6875rem] font-semibold font-body px-2 py-0.5 rounded-full">
                        Full article
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-xs text-[#4E5A54]">{art.date}</span>
                    <span className="text-[#D4DAD6]">·</span>
                    <span className="font-body text-xs text-[#4E5A54]">{art.readTime}</span>
                  </div>
                  <Link to={`/insights/${art.slug}`}>
                    <h3 className="font-heading font-medium text-base text-[#1C201E] leading-snug mb-2 group-hover:text-[#1A4D2E] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                  </Link>
                  <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-4 line-clamp-3">
                    {art.desc}
                  </p>
                  <Link
                    to={`/insights/${art.slug}`}
                    data-testid={`article-link-${art.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1A4D2E] font-body group-hover:gap-2 transition-all"
                  >
                    Read article <ArrowRight size={13} strokeWidth={1.5} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-[#1A4D2E] rounded-2xl p-8 sm:p-10 grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <BookOpen size={24} strokeWidth={1.5} className="text-white/60 mb-3" />
            <h2 className="font-heading font-semibold text-[1.5rem] sm:text-[1.75rem] text-white mb-2">
              Stay ahead of tax changes.
            </h2>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Curated tax updates and compliance reminders, delivered to your inbox. No spam.
            </p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                data-testid="insights-email-input"
                placeholder="your@email.com"
                className="flex-1 h-11 rounded-lg px-4 text-sm font-body text-[#1C201E] bg-white border border-transparent focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                data-testid="insights-subscribe-btn"
                className="h-11 bg-white/15 text-white border border-white/25 rounded-lg px-5 text-sm font-medium font-body hover:bg-white/20 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="font-body text-xs text-white/40 mt-2">
              Curated by the partners at VNAV & Associates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
