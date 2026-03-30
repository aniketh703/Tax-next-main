import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ArrowRight, ChevronRight
} from "lucide-react";

const services = [
  "Income Tax Filing (ITR)",
  "GST Registration / Returns",
  "NRI Taxation & FEMA",
  "Business Registration",
  "Startup Compliance",
  "Capital Gains / Investments",
  "Tax Notice Response",
  "Virtual CFO Services",
  "Other",
];

const whatNext = [
  "CA. Prasad reviews your enquiry personally.",
  "You receive a call or message within 24 hours.",
  "We discuss your situation and confirm scope and fees.",
  "No obligation. Work begins only when you're ready.",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Contact</span>
          </nav>
          <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
            Get in Touch
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight leading-[1.1] text-[#1C201E] mb-5 max-w-2xl">
            Talk to CA. Prasad directly.
          </h1>
          <p className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-xl">
            Describe your situation using the form or contact us directly. We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ── WhatsApp CTA Strip ────────────────────────── */}
      <section className="bg-[#E4EDE6] border-b border-[#1A4D2E]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MessageCircle size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
              <p className="font-body text-[0.875rem] text-[#1C201E]">
                <span className="font-medium">Prefer WhatsApp?</span> Send a quick message and we'll respond during business hours.
              </p>
            </div>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-cta-btn"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-4 py-2 font-body text-[0.8125rem] font-semibold hover:bg-[#133b23] transition-colors shrink-0"
            >
              <MessageCircle size={13} strokeWidth={1.5} />
              WhatsApp Us
              <ArrowRight size={12} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">

          {/* ── Left: Contact info ──────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contact items */}
            <div>
              <h2 className="font-heading font-medium text-[1.125rem] text-[#1C201E] mb-6">
                Contact Details
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Phone,         label: "Phone",     value: "+91 00000 00000",        href: "tel:+910000000000" },
                  { icon: MessageCircle, label: "WhatsApp",  value: "+91 00000 00000",        href: "https://wa.me/910000000000" },
                  { icon: Mail,          label: "Email",     value: "info@taxnext.in",         href: "mailto:info@taxnext.in" },
                  { icon: MapPin,        label: "Office",    value: "Hyderabad, Telangana",   href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-testid={`contact-${label.toLowerCase()}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#E4EDE6] flex items-center justify-center shrink-0 group-hover:bg-[#1A4D2E] transition-colors">
                      <Icon size={16} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
                    </div>
                    <div className="pt-0.5">
                      <p className="font-body text-[0.6875rem] text-[#4E5A54] uppercase tracking-[0.08em] mb-0.5">{label}</p>
                      <p className="font-body text-[0.875rem] font-medium text-[#1C201E] group-hover:text-[#1A4D2E] transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div className="bg-[#F2F5F3] rounded-xl border border-[#E8EDE9] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} strokeWidth={1.5} className="text-[#1A4D2E]" />
                <p className="font-heading font-medium text-[#1C201E] text-[0.875rem]">Office Hours</p>
              </div>
              <div className="space-y-1.5 font-body text-[0.875rem] text-[#4E5A54]">
                <p>Monday – Saturday: 9:30 AM – 6:30 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-[#1A4D2E] font-medium mt-3">WhatsApp available after hours</p>
              </div>
            </div>

            {/* What happens next */}
            <div>
              <h3 className="font-body text-[10px] uppercase tracking-[0.13em] font-semibold text-[#9BABA2] mb-5">
                What happens next
              </h3>
              <ol className="divide-y divide-[#E8EDE9]">
                {whatNext.map((step, i) => (
                  <li key={i} className="flex items-start gap-4 py-4 first:pt-0">
                    <span className="font-heading font-light text-[1.75rem] leading-none text-[#D4DAD6] select-none tabular-nums shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.7] pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Trust signal */}
            <div className="flex flex-wrap gap-x-5 gap-y-2.5 pt-2 border-t border-[#E8EDE9]">
              {["ICAI Registered", "10+ years practice", "500+ clients"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                  <CheckCircle size={12} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Form ──────────────────────────── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                data-testid="contact-success"
                className="bg-[#E4EDE6] border border-[#1A4D2E]/15 rounded-2xl p-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1A4D2E] mb-6">
                  <CheckCircle size={24} strokeWidth={1.5} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-[#1C201E] mb-3">
                  Enquiry received.
                </h3>
                <p className="font-body text-[0.875rem] text-[#4E5A54] max-w-sm mx-auto leading-[1.8]">
                  CA. Prasad will review your message and contact you within 24 hours. All enquiries are treated in confidence.
                </p>
              </div>
            ) : (
              <form
                data-testid="contact-form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#E8EDE9] p-8 sm:p-10"
                style={{ boxShadow: "0 4px 24px -8px rgba(0,0,0,0.06)" }}
              >
                <h2 className="font-heading font-medium text-[1.25rem] text-[#1C201E] mb-8">
                  Send an enquiry
                </h2>

                <div className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        data-testid="contact-name-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        data-testid="contact-email-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Phone + Service */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        data-testid="contact-phone-input"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                        Service Required
                      </label>
                      <select
                        id="contact-service"
                        data-testid="contact-service-select"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      data-testid="contact-message-input"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe what you need help with..."
                      className="w-full rounded-lg border border-[#E8EDE9] px-4 py-3 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition resize-none"
                    />
                    <p className="font-body text-[0.75rem] text-[#9BABA2] mt-1.5">
                      Be as brief or detailed as you like. We'll ask for more if needed.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      data-testid="contact-submit-btn"
                      className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-8 py-3.5 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 tracking-wide"
                    >
                      Send Enquiry
                      <Send size={14} strokeWidth={1.5} />
                    </button>
                    <p className="font-body text-[0.75rem] text-[#9BABA2]">
                      All enquiries are treated in confidence.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
