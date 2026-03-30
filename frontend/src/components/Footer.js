import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

const servicesLinks = [
  { name: "GST Registration & Returns", href: "/services#gst" },
  { name: "Income Tax Filing", href: "/services#itr" },
  { name: "Company Registration", href: "/services#business" },
  { name: "NRI Taxation", href: "/services#nri" },
  { name: "Startup Compliance", href: "/services#startup" },
  { name: "Audit & Assurance", href: "/services#audit" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Tax Calculators", href: "/calculators" },
  { name: "Compliance Calendar", href: "/compliance-calendar" },
  { name: "Resources", href: "/resources" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#1C201E] text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex flex-col leading-none mb-5">
              <span className="font-heading font-semibold text-2xl text-white tracking-tight">
                TaxNext<span className="text-[#6b9e7a] font-normal">.in</span>
              </span>
              <span className="font-body text-[10px] tracking-[0.04em] text-[#9baba2] mt-0.5">
                by VNAV Associates
              </span>
            </Link>
            <p className="font-body text-sm leading-relaxed text-[#9baba2] mb-5">
              Expert-led tax and compliance services by CA. V.V.N.Prasad. Gupta.
              Trusted by 500+ clients across India.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1A4D2E] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C201E]"
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1A4D2E] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C201E]"
              >
                <Twitter size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1A4D2E] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C201E]"
              >
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-[0.07em] mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-[#9baba2] hover:text-white transition-colors flex items-center gap-1.5 group py-0.5"
                  >
                    <ArrowRight size={13} className="text-[#1A4D2E] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-[0.07em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-[#9baba2] hover:text-white transition-colors py-0.5 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/ai-tax-assistant"
                  className="font-body text-sm text-[#4E5A54] hover:text-[#9baba2] transition-colors italic py-0.5 block"
                >
                  AI Tax Assistant (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/client-portal"
                  className="font-body text-sm text-[#4E5A54] hover:text-[#9baba2] transition-colors italic py-0.5 block"
                >
                  Client Portal (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-[0.07em] mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                <span className="font-body text-sm text-[#9baba2] leading-snug">
                  Hyderabad, Telangana<br />India — 500 000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                <a href="tel:+910000000000" className="font-body text-sm text-[#9baba2] hover:text-white transition-colors">
                  +91 00000 00000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                <a href="mailto:info@taxnext.in" className="font-body text-sm text-[#9baba2] hover:text-white transition-colors">
                  info@taxnext.in
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-btn"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white text-sm font-medium font-body rounded-lg px-4 py-2.5 hover:bg-[#133b23] transition-colors"
              >
                WhatsApp Us
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[#7a8c82] text-center sm:text-left">
            © {new Date().getFullYear()} VNAV Associates. All rights reserved. CA. V.V.N.Prasad. Gupta — Chartered Accountant.
          </p>
          <p className="font-body text-xs text-[#7a8c82] text-center sm:text-right">
            Registered with ICAI &nbsp;|&nbsp; TaxNext.in is a registered brand
          </p>
        </div>
      </div>
    </footer>
  );
}
