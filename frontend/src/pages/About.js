import { Link } from "react-router-dom";
import {
  ChevronRight, CheckCircle, ArrowRight, Phone,
  Shield, RefreshCw, Bell, MessageSquare
} from "lucide-react";

const FOUNDER_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/aebe5bae-79f1-412a-a57c-d6d295c09f4e/images/aaef25480ca9796d22d26e78854d76269059d727b7df3c2906a383a97297df42.png";

const aboutStats = [
  { value: "500+", label: "Client Engagements", sub: "Salaried, NRI, business, startup" },
  { value: "10+",  label: "Years in Practice",  sub: "Active CA practice since 2014" },
  { value: "ICAI", label: "Registered Member",  sub: "Institute of Chartered Accountants" },
  { value: "0",    label: "Late Filings",        sub: "Every return filed on time" },
];

const whyCards = [
  {
    icon: Shield,
    title: "CA-led, without exception",
    desc: "Every filing is reviewed and approved by CA. Prasad. Work is not passed to junior staff or automated systems.",
  },
  {
    icon: RefreshCw,
    title: "Continuity across years",
    desc: "We retain context from previous engagements. You do not repeat yourself at the start of each filing season.",
  },
  {
    icon: Bell,
    title: "Deadlines tracked, not missed",
    desc: "Due dates are monitored and you are informed in advance. You should not need to track the compliance calendar yourself.",
  },
  {
    icon: MessageSquare,
    title: "Honest before the engagement",
    desc: "If a service is not right for your situation, we will say so clearly — before any work begins.",
  },
];

const founderCredentials = [
  "Member, Institute of Chartered Accountants of India (ICAI)",
  "10+ years in active CA practice",
  "Specialisation: GST, Income Tax & Business Compliance",
  "Personal oversight of every client engagement — no delegation",
  "Digital-first: phone, WhatsApp, or email — whichever works for you",
];

const processSteps = [
  {
    num: "01",
    title: "Initial consultation",
    desc: "A brief call to understand your situation. We confirm what we can do, what it will cost, and what you need to prepare — before any engagement begins.",
  },
  {
    num: "02",
    title: "Preparation and review",
    desc: "CA. Prasad reviews your documents, identifies applicable deductions, and prepares accurate filings. Nothing is submitted without your explicit approval.",
  },
  {
    num: "03",
    title: "Filed on time. Followed up.",
    desc: "All filings are submitted before the statutory due date and confirmed in writing. Any subsequent department correspondence is handled by the same CA.",
  },
];

export default function About() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">About</span>
          </nav>
          <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
            VNAV Associates
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] lg:text-[3.125rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6 max-w-3xl">
            A CA firm that takes professional responsibility seriously.
          </h1>
          <p className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-2xl mb-8">
            VNAV Associates is a Chartered Accountancy practice based in Hyderabad. Founded and personally led by CA. V.V.N.Prasad. Gupta — ICAI registered, 10+ years in active practice.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2.5">
            {["10+ years in active CA practice", "ICAI Registered", "500+ clients served"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── About TaxNext ──────────────────────────────── */}
      <section data-testid="about-taxnext-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Left: positioning */}
            <div>
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-5 font-body">
                What We Do
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-7">
                Professional tax and compliance work.<br />By a CA, not a portal.
              </h2>
              <div className="space-y-5 font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
                <p>
                  TaxNext.in is the practice of CA. Prasad — not a software product. Every service is delivered by a qualified Chartered Accountant who is personally accountable for the outcome.
                </p>
                <p>
                  Most online tax services automate what should be handled with care. VNAV Associates works the other way: CA. Prasad reviews each client's specific situation before advising. No standardised outputs. No generic deduction suggestions.
                </p>
                <p className="text-[#1C201E] font-medium">
                  The result is a filing you can stand behind — one that a qualified professional has actually reviewed.
                </p>
              </div>
              <Link
                to="/services"
                data-testid="about-services-link"
                className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1A4D2E] font-body mt-8 hover:gap-2.5 transition-all"
              >
                View our services
                <ChevronRight size={14} strokeWidth={2} />
              </Link>
            </div>

            {/* Right: stat display */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12">
              {aboutStats.map((s) => (
                <div
                  key={s.label}
                  data-testid={`about-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <p className="font-heading font-semibold text-[2.5rem] lg:text-[3rem] text-[#1C201E] tracking-tight leading-none">
                    {s.value}
                  </p>
                  <p className="font-heading font-medium text-[#1A4D2E] text-[0.8125rem] mt-2.5">{s.label}</p>
                  <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5 leading-snug">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ────────────────────────────────────── */}
      <section data-testid="founder-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Photo */}
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-2xl overflow-hidden border border-[#E8EDE9]" style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.08)" }}>
                <img
                  src={FOUNDER_IMAGE}
                  alt="CA. V.V.N.Prasad. Gupta — Founder, VNAV Associates"
                  className="w-full h-[480px] object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 right-4 sm:right-8 bg-white rounded-xl border border-[#E8EDE9] px-5 py-3.5" style={{ boxShadow: "0 4px 16px -4px rgba(0,0,0,0.1)" }}>
                <p className="font-heading font-semibold text-[#1C201E] text-[0.875rem] leading-snug">
                  CA. V.V.N.Prasad. Gupta
                </p>
                <p className="font-body text-[0.75rem] text-[#4E5A54]">ICAI Member · Founder, VNAV Associates</p>
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2 pt-0 lg:pt-4">
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-5 font-body">
                The CA Behind TaxNext.in
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-6">
                CA. V.V.N.Prasad. Gupta
              </h2>
              <div className="space-y-5 font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8] mb-7">
                <p>
                  CA. Prasad founded VNAV Associates because straightforward, expert tax guidance was harder to find than it should be. Most people file incorrectly — not through carelessness, but because accessible CA-level advice simply wasn't available to them.
                </p>
                <p>
                  Every client engagement is reviewed personally. No delegation to juniors. No generic-output software standing in for professional judgment.
                </p>
              </div>

              <blockquote className="border-l-2 border-[#1A4D2E] pl-5 mb-8">
                <p className="font-heading font-medium text-[#1C201E] text-[1rem] leading-[1.6] italic">
                  "Tax law in India changes every year. My job is to make sure those changes work in your favour — not catch you out."
                </p>
                <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2.5">
                  — CA. V.V.N.Prasad. Gupta
                </footer>
              </blockquote>

              <ul className="space-y-3 mb-9">
                {founderCredentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-[0.8375rem] text-[#4E5A54]">{c}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                data-testid="founder-cta"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
              >
                Book a Consultation
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why TaxNext ────────────────────────────────── */}
      <section data-testid="why-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Why VNAV Associates
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-4">
              What sets this practice apart.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
              Not promises. These are operational commitments built into how VNAV Associates works with every client.
            </p>
          </div>

          <div className="divide-y divide-[#E8EDE9]">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  data-testid={`why-card-${i}`}
                  className="flex items-start gap-6 py-7 first:pt-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E4EDE6] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} strokeWidth={1.5} className="text-[#1A4D2E]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-[1rem] text-[#1C201E] mb-2">{card.title}</h3>
                    <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.8]">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Work ────────────────────────────────── */}
      <section data-testid="process-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-14 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Our Process
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3">
              A clear process, from first call to final filing.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] max-w-xl leading-[1.8]">
              Designed to reduce your effort. Every step handled by the same CA who advises you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {processSteps.map((step) => (
              <div
                key={step.num}
                data-testid={`process-step-${step.num}`}
              >
                <span className="font-heading font-light text-[5rem] leading-none select-none block mb-4" style={{ color: "#DDE3DE" }}>
                  {step.num}
                </span>
                <h3 className="font-heading font-medium text-[1rem] text-[#1C201E] mb-2.5">{step.title}</h3>
                <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.8]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              data-testid="process-cta"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3.5 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
            >
              Start with a free consultation
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section data-testid="about-cta-section" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/45 mb-5 font-body">
              Get Started
            </span>
            <h2 className="font-heading font-semibold text-[1.875rem] sm:text-[2.375rem] text-white tracking-tight leading-[1.2] mb-4">
              Ready to work with a CA you can trust?
            </h2>
            <p className="font-body text-[0.9375rem] text-white/65 mb-10 leading-[1.8]">
              Book a free 15-minute call with CA. Prasad. Tell us your situation and we'll confirm exactly how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                to="/contact"
                data-testid="about-cta-btn"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-3.5 font-semibold font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm tracking-wide"
              >
                Book a Free Consultation
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="tel:+910000000000"
                data-testid="about-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/25 rounded-lg px-8 py-3.5 font-medium font-body text-[0.9375rem] hover:bg-white/10 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 00000 00000
              </a>
            </div>
            <p className="font-body text-[0.75rem] text-white/35">
              No commitment required &nbsp;·&nbsp; We respond within 24 hours
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
