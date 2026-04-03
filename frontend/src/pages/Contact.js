import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ArrowRight, ChevronRight
} from "lucide-react";
import Highlighter from "../components/ui/Highlighter";
import SEO from "../components/SEO";

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
  "Our team reviews your enquiry.",
  "We coordinate a response as per professional requirements.",
  "We discuss your situation and confirm scope and fees.",
  "Strictly confidential. Proceed only when you're ready.",
];


/* ─── Motion Variants ────────────────────────────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name} — ${form.service || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nService Required: ${form.service || 'Not specified'}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:taxnext.in@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact VNAV Associates | Chartered Accountants in Kurnool & Chennai"
        description="Get in touch with CA. V.V.N. Prasad Gupta for professional tax and compliance services."
        canonical="/contact"
      />
      {/* ── Hero ─────────────────────────────────────── */}
      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white border-b border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Contact</span>
          </motion.nav>
          <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
            Communication Channels
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] tracking-tight leading-[1.1] text-[#1C201E] mb-5 max-w-2xl">
            Communication <Highlighter>Channels</Highlighter>
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-xl">
            Describe your situation using the form or <span className="text-emphasize">reach out to our offices</span>. We provide professional support as per requirements.
          </motion.p>
        </div>
      </motion.section>

      {/* ── WhatsApp CTA Strip ────────────────────────── */}
      <motion.section {...fadeInUp} className="bg-[#E4EDE6] border-b border-[#1A4D2E]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
              <MessageCircle size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
              <p className="font-body text-[0.875rem] text-[#1C201E]">
                <span className="font-medium">WhatsApp Contact:</span> Professional enquiries can be sent via WhatsApp for timely coordination.
              </p>
            </motion.div>
            <motion.a
              variants={fadeInUp}
              href="https://wa.me/919440428417"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-4 py-2 font-body text-[0.8125rem] font-semibold hover:bg-[#133b23] transition-colors shrink-0"
            >
              <MessageCircle size={13} strokeWidth={1.5} />
              WhatsApp Contact
              <ArrowRight size={12} strokeWidth={1.5} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Main Content ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">

          {/* ── Left: Contact info ──────────────────── */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="lg:col-span-2 space-y-10">

            {/* Contact items */}
            <motion.div variants={fadeInUp}>
              <h2 className="font-heading font-medium text-[1.125rem] text-[#1C201E] mb-6">
                Contact Details
              </h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Kurnool Office", value: "404, Suresh Towers, Santosh Nagar, NH 44 Road, Kurnool – 518003", href: "https://maps.app.goo.gl/4ySrtxgVsj1inkts5" },
                  { icon: Phone, label: "Kurnool Phone", value: "+91 94404 28417", href: "tel:+919440428417" },
                  { icon: Mail, label: "Kurnool Email", value: "vnav.knl@gmail.com", href: "mailto:vnav.knl@gmail.com" },
                  { icon: MapPin, label: "Chennai Office", value: "Flat No. C, No. 9, Jai Nagar, 15th Street, Arumbakkam, Chennai – 600106", href: "#" },
                  { icon: Phone, label: "Chennai Phone", value: "+91 94404 28417", href: "tel:+919440428417" },
                  { icon: Mail, label: "Chennai Email", value: "vnav.chennai@gmail.com", href: "mailto:vnav.chennai@gmail.com" },
                  { icon: Phone, label: "General Phone", value: "+91 94404 28417", href: "tel:+919440428417" },
                  { icon: Mail, label: "General Email", value: "taxnext.in@gmail.com", href: "mailto:taxnext.in@gmail.com" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
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
            </motion.div>

            {/* Office hours */}
            <motion.div variants={fadeInUp} className="bg-[#F2F5F3] rounded-xl border border-[#E8EDE9] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} strokeWidth={1.5} className="text-[#1A4D2E]" />
                <p className="font-heading font-medium text-[#1C201E] text-[0.875rem]">Office Hours</p>
              </div>
              <div className="space-y-1.5 font-body text-[0.875rem] text-[#4E5A54]">
                <p>Monday – Saturday: 9:30 AM – 6:30 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-[#1A4D2E] font-medium mt-3">WhatsApp available after hours</p>
              </div>
            </motion.div>

            {/* Kurnool Location QR */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl border border-[#E8EDE9] p-5 shadow-sm">
              <p className="font-heading font-medium text-[#1C201E] text-[0.875rem] mb-4">Kurnool Office Location</p>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-32 h-32 bg-[#F2F5F3] rounded-lg overflow-hidden border border-[#E8EDE9] flex items-center justify-center">
                  <img 
                    src={process.env.PUBLIC_URL + "/Kurnool Office.png"} 
                    alt="Scan for Kurnool Office Direction" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-body text-[0.8125rem] text-[#4E5A54] leading-relaxed mb-3">
                    Scan this QR code with your mobile camera to get direct directions on Google Maps.
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/4ySrtxgVsj1inkts5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#1A4D2E] hover:underline"
                  >
                    Open in Maps
                    <ArrowRight size={12} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* What happens next */}
            <motion.div variants={fadeInUp}>
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
            </motion.div>

            {/* Trust signal */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-x-5 gap-y-2.5 pt-2 border-t border-[#E8EDE9]">
              {["ICAI Registered", "10+ years practice", "Professional Compliance"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                  <CheckCircle size={12} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Form ──────────────────────────── */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#E4EDE6] border border-[#1A4D2E]/15 rounded-2xl p-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1A4D2E] mb-6">
                  <CheckCircle size={24} strokeWidth={1.5} className="text-white" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-[#1C201E] mb-3">
                  Enquiry received.
                </h3>
                <p className="font-body text-[0.875rem] text-[#4E5A54] max-w-sm mx-auto leading-[1.8]">
                  Our team will review your enquiry and provide professional support as per requirements. All communications are strictly confidential.
                </p>
              </motion.div>
            ) : (
              <div className="relative">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-[#E8EDE9] p-8 sm:p-10 relative z-10"
                  style={{ boxShadow: "0 4px 24px -8px rgba(0,0,0,0.06)" }}
                  aria-label="Contact Enquiry Form"
                >
                  <motion.h2 variants={fadeInUp} className="font-heading font-medium text-[1.25rem] text-[#1C201E] mb-8">
                    Send an enquiry
                  </motion.h2>

                  <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
                    {/* Name + Email */}
                    <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                          Full Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          aria-label="Full Name"
                          aria-required="true"
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
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          aria-label="Email Address"
                          aria-required="true"
                          className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                        />
                      </div>
                    </motion.div>

                    {/* Phone + Service */}
                    <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-phone" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                          Phone Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          aria-label="Phone Number"
                          className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-service" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                          Service Required
                        </label>
                        <select
                          id="contact-service"
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          aria-label="Service Required"
                          className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="contact-message" className="block font-body text-[0.8125rem] font-medium text-[#1C201E] mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        aria-label="Your Message"
                        className="w-full rounded-lg border border-[#E8EDE9] px-4 py-3 font-body text-[0.875rem] text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#AEBDB4] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition resize-none"
                      />
                      <p className="font-body text-[0.75rem] text-[#9BABA2] mt-1.5">
                        Be as brief or detailed as you like. We'll ask for more if needed.
                      </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-8 py-3.5 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 tracking-wide"
                      >
                        Submit Enquiry
                        <Send size={14} strokeWidth={1.5} />
                      </button>
                      <p className="font-body text-[0.75rem] text-[#9BABA2]">
                        All enquiries are treated in confidence.
                      </p>
                    </motion.div>
                  </motion.div>
                </form>
                {/* Fallback copy email */}
                <div className="mt-4 text-center">
                  <p className="font-body text-xs text-[#9BABA2] mb-2">Technical issues with the form?</p>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText("taxnext.in@gmail.com");
                        alert("Email address copied to clipboard!");
                    }}
                    className="text-[0.75rem] font-medium text-[#1A4D2E] hover:underline"
                  >
                    Copy email address (taxnext.in@gmail.com)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
