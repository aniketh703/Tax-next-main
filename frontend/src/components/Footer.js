import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

const servicesLinks = [
  { name: "Audit & Assurance", href: "/services" },
  { name: "Direct Taxation (ITR)", href: "/services" },
  { name: "Indirect Tax (GST)", href: "/services" },
  { name: "Business Advisory", href: "/services" },
  { name: "Regulatory & ROC", href: "/services" },
  { name: "NRI Taxation", href: "/services" },
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
            <Link to="/" className="inline-flex flex-col leading-none mb-6">
              <span className="font-heading font-semibold text-[1.5rem] text-[#1A4D2E] tracking-tight leading-none bg-white px-2 py-1.5 rounded-sm w-fit mb-2 shadow-sm">
                TaxNext.in
              </span>
              <span className="font-body text-[10.5px] tracking-[0.1em] text-white mt-1 uppercase font-semibold">
                VNAV & ASSOCIATES | Chartered Accountants
              </span>
              <div className="mt-3 flex items-center gap-2 text-[0.625rem] text-[#9baba2] font-body uppercase tracking-wider">
                <span className="px-1.5 py-0.5 border border-white/20 rounded">ICAI Registered</span>
                <span className="px-1.5 py-0.5 border border-white/20 rounded">Peer Reviewed</span>
              </div>
            </Link>
            <p className="font-body text-sm leading-relaxed text-[#9baba2] mb-5">
              A professionally managed Chartered Accountancy firm providing reliable and ethical professional services in audit, taxation, and advisory.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ca-prasadguptavustepalle/"
                target="_blank"
                rel="noopener noreferrer"
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
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                <span className="font-body text-sm text-[#9baba2] leading-snug">
                  <strong>Kurnool:</strong> 404, Suresh Towers, Santosh Nagar, NH 44 Road, Kurnool – 518003<br />
                  <span className="mt-2 block"><strong>Chennai:</strong> Flat No. C, No. 9, Jai Nagar, 15th Street, Arumbakkam, Chennai – 600106</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                <a href="tel:+919440428417" className="font-body text-sm text-[#9baba2] hover:text-white transition-colors">
                  +91 94404 28417
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                <a href="mailto:taxnext.in@gmail.com" className="font-body text-sm text-[#9baba2] hover:text-white transition-colors">
                  taxnext.in@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://wa.me/919440428417"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp-btn"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white text-sm font-medium font-body rounded-lg px-4 py-2.5 hover:bg-[#133b23] transition-colors"
              >
                WhatsApp Contact
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <p className="font-body text-xs text-[#7a8c82]">
              © {new Date().getFullYear()} VNAV & Associates | Chartered Accountants
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-6">
              <Link to="/privacy-policy" className="font-body text-xs text-[#7a8c82] hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/disclaimer" className="font-body text-xs text-[#7a8c82] hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/terms-and-conditions" className="font-body text-xs text-[#7a8c82] hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/cookie-policy" className="font-body text-xs text-[#7a8c82] hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <p className="font-body text-[0.6875rem] text-[#7a8c82] text-center lg:text-right max-w-xl leading-relaxed">
            In compliance with the ICAI Code of Ethics: This website is for general informational purposes only, does not constitute professional advice, and does not solicit professional work.
          </p>
        </div>
      </div>
    </footer>
  );
}
