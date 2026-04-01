import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Phone, ChevronDown, 
  ArrowRight, Globe, Shield, Landmark, 
  Briefcase, Scale, BarChart3,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const SERVICE_CATEGORIES = [
  { id: "audit", label: "Audit & Assurance", desc: "Statutory & Internal Audits", icon: BarChart3 },
  { id: "direct", label: "Direct Taxation", desc: "Income Tax & Representation", icon: Shield },
  { id: "indirect", label: "Indirect Tax (GST)", desc: "Registration & Compliance", icon: Landmark },
  { id: "business", label: "Business Advisory", desc: "Planning & Structuring", icon: Briefcase },
  { id: "regulatory", label: "Regulatory Services", desc: "ROC & Incorporation", icon: Scale },
  { id: "nri", label: "NRI Taxation", desc: "Cross-border Compliance", icon: Globe },
];

const navLinks = [
  { name: "Home",                href: "/" },
  { name: "About",               href: "/about" },
  { name: "Services",            href: "/services", hasMenu: true },
  { name: "Calculators",         href: "/calculators" },
  { name: "Insights",            href: "/insights" },
  { name: "Compliance Calendar", href: "/compliance-calendar" },
  { name: "Resources",           href: "/resources" },
  { name: "Contact",             href: "/contact" },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function Header() {
  const [mobileOpen,        setMobileOpen]        = useState(false);
  const [servicesOpen,      setServicesOpen]      = useState(false);
  const [mobileServicesOpen,setMobileServicesOpen]= useState(false);
  const [scrolled,          setScrolled]          = useState(false);
  const [scrollProgress,    setScrollProgress]    = useState(0);

  const megaMenuRef = useRef(null);
  const location    = useLocation();

  /* scroll shadow & progress */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
      
      // Calculate scroll progress %
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  /* lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* close mega menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          HEADER — always solid, never transparent
      ───────────────────────────────────────────────────────── */}
      <header
        data-testid="site-header"
        className="sticky top-0 z-50 bg-white"
        style={{
          borderBottom: "1px solid #E8EDE9",
          boxShadow: scrolled
            ? "0 2px 16px -4px rgba(0,0,0,0.08), 0 1px 0 0 #E8EDE9"
            : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="fixed top-0 left-0 h-[2px] bg-[#4A7C59] z-[60] transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Green accent line — top */}
        <div className="h-[3px] bg-[#1A4D2E]" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">

            {/* ── Logo ─────────────────────────────────────── */}
            <Link
              to="/"
              data-testid="header-logo"
              className="flex flex-col leading-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="font-heading font-bold text-[1.25rem] text-[#1A4D2E] tracking-tight leading-none">
                TaxNext.in
              </span>
              <span className="font-body text-[9px] tracking-[0.07em] text-[#6B7B72] mt-[3px] uppercase font-medium">
                VNAV & Associates · Chartered Accountants
              </span>
            </Link>

            {/* ── Desktop Nav ───────────────────────────────── */}
            <nav
              data-testid="desktop-nav"
              className="hidden xl:flex items-center"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) =>
                link.hasMenu ? (
                  /* Services with mega menu */
                  <div
                    key={link.name}
                    ref={megaMenuRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      data-testid="services-nav-btn"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls="services-mega-menu"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`
                        flex items-center gap-[3px] px-2.5 py-2 text-[0.8rem] font-body
                        rounded-md transition-colors duration-150 relative whitespace-nowrap
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1
                        ${isActive(link.href)
                          ? "text-[#1A4D2E] font-semibold"
                          : "text-[#374040] font-medium hover:text-[#1A4D2E] hover:bg-[#F4F7F5]"
                        }
                      `}
                    >
                      {link.name}
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`mt-px opacity-50 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                      {/* active underline */}
                      {isActive(link.href) && (
                        <span className="absolute bottom-[-1px] left-2.5 right-2.5 h-[2px] bg-[#1A4D2E] rounded-full" />
                      )}
                    </button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          id="services-mega-menu"
                          data-testid="services-mega-menu"
                          className="absolute top-full left-1/2 -translate-x-1/2 z-50"
                          style={{ marginTop: "0px" }}
                          role="region"
                          aria-label="Services menu"
                        >
                          {/* invisible bridge so hover doesn't break */}
                          <div className="h-[6px]" />
                          <div
                            className="w-[760px] bg-white rounded-xl border border-[#E0E6E2] p-7"
                            style={{
                              boxShadow: "0 20px 48px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                            }}
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {SERVICE_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <Link
                                    key={cat.id}
                                    to="/services"
                                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[#F2F5F3] transition-all duration-200"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E8EDE9] flex items-center justify-center shrink-0 group-hover:border-[#1A4D2E]/20 group-hover:shadow-sm transition-all">
                                      <Icon size={18} strokeWidth={1.5} className="text-[#1A4D2E]" />
                                    </div>
                                    <div>
                                      <p className="font-heading font-medium text-[0.875rem] text-[#1C201E] group-hover:text-[#1A4D2E] transition-colors">{cat.label}</p>
                                      <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5">{cat.desc}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Footer row */}
                            <div className="mt-6 pt-4 border-t border-[#F0F4F1] flex items-center justify-between">
                              <p className="text-[0.8125rem] text-[#6B7B72] font-body">
                                Not sure what you need?{" "}
                                <Link
                                  to="/contact"
                                  className="text-[#1A4D2E] font-medium hover:underline underline-offset-2"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  Contact the firm
                                </Link>
                              </p>
                              <Link
                                to="/services"
                                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#1A4D2E] hover:text-[#133b23] font-body"
                                onClick={() => setServicesOpen(false)}
                              >
                                All services
                                <ArrowRight size={13} strokeWidth={2} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular nav link */
                  <Link
                    key={link.name}
                    to={link.href}
                    data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`
                      px-2.5 py-2 text-[0.8rem] font-body rounded-md transition-colors duration-150 relative whitespace-nowrap
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1
                      ${isActive(link.href)
                        ? "text-[#1A4D2E] font-semibold"
                        : "text-[#374040] font-medium hover:text-[#1A4D2E] hover:bg-[#F4F7F5]"
                      }
                    `}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <span className="absolute bottom-[-1px] left-2.5 right-2.5 h-[2px] bg-[#1A4D2E] rounded-full" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* ── Desktop CTA ───────────────────────────────── */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <a
                href="tel:+919440428417"
                data-testid="header-call-btn"
                className="flex items-center gap-1.5 text-[0.8rem] font-medium text-[#4E5A54] hover:text-[#1A4D2E] font-body transition-colors"
              >
                <Phone size={13} strokeWidth={1.5} className="text-[#1A4D2E]" />
                +91 94404 28417
              </a>
              <Link
                to="/contact"
                data-testid="header-cta-btn"
                className="bg-[#1A4D2E] text-white rounded-lg px-4 py-2.5 text-[0.8125rem] font-semibold font-body hover:bg-[#133b23] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 tracking-wide"
              >
                Contact Us
              </Link>
            </div>

            {/* ── Mobile Hamburger ─────────────────────────── */}
            <button
              data-testid="mobile-menu-btn"
              className="xl:hidden p-2 rounded-md text-[#374040] hover:bg-[#F2F5F3] hover:text-[#1A4D2E] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
            </button>

          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
          MOBILE — backdrop
      ───────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 z-40 lg:hidden bg-black/30 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─────────────────────────────────────────────────────────
          MOBILE — slide-in drawer
      ───────────────────────────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        data-testid="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-white lg:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.12)" }}
        aria-hidden={!mobileOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[67px] border-b border-[#E8EDE9] shrink-0">
          <div className="h-[3px] bg-[#1A4D2E] absolute top-0 left-0 right-0" />
          <Link
            to="/"
            className="flex flex-col leading-none mt-0.5"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-heading font-bold text-[1.0625rem] text-[#1A4D2E] leading-none">
              VNAV & ASSOCIATES
            </span>
            <span className="font-body text-[7.5px] tracking-[0.07em] text-[#9BABA2] mt-[3px] uppercase font-medium">
              Chartered Accountants
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-[#4E5A54] hover:bg-[#F2F5F3] focus-visible:ring-2 focus-visible:ring-[#1A4D2E]"
            aria-label="Close navigation menu"
            data-testid="mobile-menu-close-btn"
          >
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div key={link.name}>
                <button
                  data-testid="mobile-services-btn"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-submenu"
                  className="w-full flex items-center justify-between px-3.5 py-3.5 rounded-lg text-[#1C201E] font-medium font-body hover:bg-[#F4F7F5] transition-colors text-[0.875rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1"
                >
                  Services
                  <ChevronDown
                    size={15}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 text-[#6B7B72] ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div id="mobile-services-submenu" className="ml-2 mt-1 mb-2 space-y-4 bg-[#FBFBF9] rounded-lg px-3 py-3">
                    {servicesMenu.map((group) => (
                      <div key={group.category}>
                        <p className="text-[9px] uppercase tracking-[0.12em] font-bold text-[#1A4D2E] mb-2 font-body">
                          {group.category}
                        </p>
                        <div className="space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block px-2.5 py-2.5 text-[0.8125rem] text-[#4E5A54] hover:text-[#1A4D2E] rounded-md hover:bg-[#EFF3F1] font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/services"
                      className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#1A4D2E] font-body pt-2 border-t border-[#E8EDE9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] rounded"
                      onClick={() => setMobileOpen(false)}
                    >
                      View all services
                      <ArrowRight size={13} strokeWidth={2} />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center px-3.5 py-3.5 rounded-lg text-[0.875rem] font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1 ${
                  isActive(link.href)
                    ? "text-[#1A4D2E] font-semibold bg-[#EFF3F1]"
                    : "text-[#1C201E] font-medium hover:bg-[#F4F7F5] hover:text-[#1A4D2E]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Drawer footer: CTA */}
        <div className="px-4 py-5 border-t border-[#E8EDE9] space-y-2.5 shrink-0">
          <a
            href="tel:+919440428417"
            className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg text-[0.875rem] font-medium text-[#4E5A54] hover:bg-[#F4F7F5] font-body transition-colors"
          >
            <Phone size={14} strokeWidth={1.5} className="text-[#1A4D2E]" />
            +91 94404 28417
          </a>
          <Link
            to="/contact"
            data-testid="mobile-cta-btn"
            className="flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-5 py-3 text-[0.875rem] font-semibold font-body hover:bg-[#133b23] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </>
  );
}
