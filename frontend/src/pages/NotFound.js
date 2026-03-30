import { Link } from "react-router-dom";
import { ArrowRight, Home, Search } from "lucide-react";

const HELPFUL_LINKS = [
  { label: "Back to Home",          to: "/" },
  { label: "View our Services",     to: "/services" },
  { label: "Read Insights",         to: "/insights" },
  { label: "Contact CA. Prasad",    to: "/contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FBFBF9]">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center py-20">

        {/* 404 number */}
        <p
          data-testid="404-number"
          className="font-heading font-semibold text-[7rem] sm:text-[9rem] leading-none tracking-tighter text-[#E8EDE9] select-none mb-4"
        >
          404
        </p>

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e8eee9] mb-6 -mt-4">
          <Search size={22} strokeWidth={1.5} className="text-[#1A4D2E]" />
        </div>

        {/* Heading */}
        <h1
          data-testid="404-heading"
          className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3"
        >
          Page not found.
        </h1>
        <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          Try one of the links below.
        </p>

        {/* Helpful links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {HELPFUL_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-testid={`404-link-${link.to.replace("/", "").replace("/", "-") || "home"}`}
              className="flex items-center justify-between bg-white border border-[#E8EDE9] rounded-xl px-4 py-3 font-body text-sm font-medium text-[#1C201E] hover:border-[#1A4D2E]/30 hover:text-[#1A4D2E] transition-colors"
            >
              {link.label}
              <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          ))}
        </div>

        {/* Home button */}
        <Link
          to="/"
          data-testid="404-home-btn"
          className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
        >
          <Home size={15} strokeWidth={1.5} />
          Go back home
        </Link>
      </div>
    </div>
  );
}
