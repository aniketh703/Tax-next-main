import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function PageShell({ title, subtitle, breadcrumbs = [], children, badge }) {
  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav
              data-testid="breadcrumbs"
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54]"
            >
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-[#1A4D2E] transition-colors"
              >
                <Home size={14} strokeWidth={1.5} />
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={14} className="text-[#C4CAC6]" aria-hidden="true" />
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-[#1A4D2E] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#1C201E] font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {badge && (
            <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
              {badge}
            </span>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.1] font-semibold text-[#1C201E] mb-3 max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-[#4E5A54] font-body leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Page Content */}
      {children && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {children}
        </div>
      )}
    </>
  );
}
