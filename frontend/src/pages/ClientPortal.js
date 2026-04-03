import { Link } from "react-router-dom";
import {
  ChevronRight, Lock, ArrowRight, Clock, CheckCircle,
  LayoutDashboard, FileCheck, Bell, MessageSquare
} from "lucide-react";

const portalFeatures = [
  {
    icon: LayoutDashboard,
    title: "Compliance Dashboard",
    desc: "All your filings, upcoming deadlines, and compliance status — visible at a glance.",
  },
  {
    icon: FileCheck,
    title: "Document Vault",
    desc: "Securely store and access ITRs, GST returns, balance sheets, and correspondence.",
  },
  {
    icon: Bell,
    title: "Deadline Reminders",
    desc: "Automated alerts before every filing due date — no more manual tracking.",
  },
  {
    icon: MessageSquare,
    title: "Direct CA Messaging",
    desc: "Communicate with CA. V.V.N. Prasad Gupta in a secure, private channel — not over email.",
  },
];

/* ── Static portal UI teaser ──── */
function PortalTeaser() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8EDE9] shadow-sm overflow-hidden">
      {/* Fake top bar */}
      <div className="bg-[#1A4D2E] px-5 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-body text-[0.6875rem] text-white/60 ml-2">Client Portal — VNAV Associates</span>
      </div>

      {/* Fake dashboard */}
      <div className="p-5 bg-[#F2F5F3]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-3 w-28 bg-[#D4DAD6] rounded mb-1.5" />
            <div className="h-2 w-20 bg-[#E8EDE9] rounded" />
          </div>
          <div className="h-8 w-28 bg-[#1A4D2E]/20 rounded-lg" />
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {["bg-white", "bg-white", "bg-white"].map((bg, i) => (
            <div key={i} className={`${bg} rounded-xl p-3 border border-[#E8EDE9]`}>
              <div className="h-5 w-10 bg-[#1A4D2E]/20 rounded mb-2" />
              <div className="h-2 w-14 bg-[#E8EDE9] rounded" />
            </div>
          ))}
        </div>
        {/* Table rows */}
        <div className="bg-white rounded-xl border border-[#E8EDE9] overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-[#E8EDE9]" : ""}`}>
              <div className="w-7 h-7 rounded bg-[#e8eee9]" />
              <div className="flex-1">
                <div className="h-2 w-32 bg-[#E8EDE9] rounded mb-1" />
                <div className="h-2 w-20 bg-[#F2F5F3] rounded" />
              </div>
              <div className="h-5 w-14 bg-[#e8eee9] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="relative -mt-px">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/0 flex flex-col items-center justify-end pb-6 pt-12">
          <div className="inline-flex items-center gap-1.5 bg-[#e8eee9] border border-[#1A4D2E]/20 text-[#1A4D2E] text-xs font-medium font-body rounded-full px-3 py-1">
            <Lock size={11} strokeWidth={1.5} />
            Launching Q4 2025
          </div>
        </div>
        <div className="h-16" />
      </div>
    </div>
  );
}

export default function ClientPortal() {
  return (
    <>
      <SEO
        title="Client Portal | Secure Compliance Dashboard"
        description="Private dashboard for VNAV Associates clients to track filings, store documents, and communicate securely."
        canonical="/client-portal"
      />
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" />
            <span className="text-[#1C201E] font-medium">Client Portal</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium font-body rounded-full px-3.5 py-1.5 mb-5">
            <Clock size={12} strokeWidth={1.5} />
            In Development — Launching Q4 2025
          </div>

          <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            Secure Client Access
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] tracking-tight leading-[1.1] text-[#1C201E] mb-4 max-w-3xl">
            Your compliance, in one secure place.
          </h1>
          <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl mb-6">
            The VNAV Associates Client Portal gives you a private dashboard to view filings,
            track deadlines, store documents, and communicate directly with CA. V.V.N. Prasad Gupta.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Secure & private", "All filings in one place", "Direct CA access"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Preview + features ────────────────────────── */}
      <section className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Teaser */}
            <div>
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                Portal Preview
              </span>
              <h2 className="font-heading font-medium text-[1.75rem] text-[#1C201E] tracking-tight mb-5">
                A preview of what's coming.
              </h2>
              <PortalTeaser />
            </div>

            {/* Feature list */}
            <div>
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                What's Included
              </span>
              <h2 className="font-heading font-medium text-[1.75rem] text-[#1C201E] tracking-tight mb-5">
                Everything in one private dashboard.
              </h2>
              <div className="space-y-4">
                {portalFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      data-testid={`portal-feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-white rounded-xl border border-[#E8EDE9] p-5 flex gap-4 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#e8eee9] flex items-center justify-center shrink-0">
                        <Icon size={17} strokeWidth={1.5} className="text-[#1A4D2E]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-medium text-sm text-[#1C201E] mb-1">{f.title}</h3>
                        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Current client + CTA ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid sm:grid-cols-2 gap-5">

          {/* Existing client note */}
          <div
            data-testid="portal-existing-client"
            className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-2xl p-7"
          >
            <Lock size={20} strokeWidth={1.5} className="text-[#1A4D2E] mb-4" />
            <h3 className="font-heading font-medium text-lg text-[#1C201E] mb-2">
              Already a VNAV Associates client?
            </h3>
            <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-5">
              Documents and communication are currently handled directly via email and WhatsApp.
              The portal will bring everything into one place when it launches.
            </p>
            <a
              href="https://wa.me/919440428417"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="portal-whatsapp-btn"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-5 py-2.5 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
            >
              Contact via WhatsApp
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
          </div>

          {/* New client CTA */}
          <div className="bg-white border border-[#E8EDE9] rounded-2xl p-7 shadow-sm">
            <LayoutDashboard size={20} strokeWidth={1.5} className="text-[#1A4D2E] mb-4" />
            <h3 className="font-heading font-medium text-lg text-[#1C201E] mb-2">
              Not a client yet?
            </h3>
            <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-5">
              Book a free 15-minute call with CA. V.V.N. Prasad Gupta. Once we begin working together,
              you'll be among the first to access the portal at launch.
            </p>
            <Link
              to="/contact"
              data-testid="portal-new-client-cta"
              className="inline-flex items-center gap-2 border border-[#1A4D2E] text-[#1A4D2E] rounded-lg px-5 py-2.5 font-medium font-body text-sm hover:bg-[#1A4D2E] hover:text-white transition-colors"
            >
              Book a Free Consultation
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
