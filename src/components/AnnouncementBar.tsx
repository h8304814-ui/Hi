import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Sparkles, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/formatters';

export const AnnouncementBar: React.FC = () => {
  const { config } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % config.announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [config.announcements.length]);

  return (
    <div className="bg-[#111111] text-[#FDFBF7] text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 px-2.5 sm:px-4 border-b border-[#262626] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Roman Urdu / Urdu welcome */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300 text-[11px] tracking-wider uppercase shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Pakistan Nationwide Delivery</span>
          <span className="text-stone-600">|</span>
          <span className="text-[#C5A059] font-serif tracking-widest">{config.taglineUrdu}</span>
        </div>

        {/* Center: Rotating messages */}
        <div className="flex-1 text-center overflow-hidden min-h-[22px] flex items-center justify-center min-w-0">
          <div
            key={currentIdx}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-1 text-stone-200 tracking-wide text-[10.5px] sm:text-xs truncate max-w-full px-1"
          >
            {config.announcements[currentIdx]}
          </div>
        </div>

        {/* Right: Quick WhatsApp & Contact */}
        <div className="hidden md:flex items-center gap-4 text-stone-300 text-[11px]">
          <a
            href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#C5A059]" />
            <span>{config.contact.phone}</span>
          </a>
          <span className="text-stone-700">/</span>
          <a
            href={buildWhatsAppLink("Salam HS Collection! I have a question about an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#2ee873] font-semibold flex items-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
