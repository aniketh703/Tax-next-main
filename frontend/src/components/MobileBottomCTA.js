import { Phone, MessageCircle } from "lucide-react";

export default function MobileBottomCTA() {
  return (
    <div
      data-testid="mobile-bottom-cta"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8EDE9] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex gap-3 sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <a
        href="tel:+910000000000"
        data-testid="mobile-call-btn"
        className="flex-1 flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 min-h-[48px]"
      >
        <Phone size={18} strokeWidth={1.5} />
        Call Us
      </a>
      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="mobile-whatsapp-btn"
        className="flex-1 flex items-center justify-center gap-2 bg-[#F2F5F3] text-[#1A4D2E] border border-[#E8EDE9] rounded-lg py-3 font-medium font-body text-sm hover:bg-[#e8eee9] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 min-h-[48px]"
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        WhatsApp
      </a>
    </div>
  );
}
