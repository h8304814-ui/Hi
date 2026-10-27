import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/formatters';

export const WhatsAppFloatingButton: React.FC = () => {
  const { config } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsAppUrl = buildWhatsAppLink(
    'Salam HS Collection! I am browsing your online store and would like to ask a question or place an order.'
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 print:hidden">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative max-w-[250px] min-[360px]:max-w-[280px] sm:max-w-xs bg-white text-stone-900 p-3 sm:p-3.5 rounded-2xl shadow-xl border border-stone-200 text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-stone-400 hover:text-black rounded-full"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[11px] text-[#25D366] uppercase tracking-wider">
              HS Stylist Online
            </span>
          </div>
          <p className="text-stone-600 font-light pr-2">
            Salam! Need help with sizing, fabric choice, or placing an order? Chat with us on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 p-3.5 sm:px-4 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase pr-1">
          WhatsApp Order
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white animate-ping" />
      </a>
    </div>
  );
};
