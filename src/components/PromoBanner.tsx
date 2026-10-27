import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { openShopCategory, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const couponCode = 'WELCOME10';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    showToast(`Code "${couponCode}" copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden bg-[#161616] text-[#FDFBF7] py-12 sm:py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 bg-gradient-to-r from-stone-900/90 via-[#1C1A17] to-stone-900/90 p-5 sm:p-8 md:p-12 rounded-3xl border border-[#C5A059]/30 shadow-2xl">
          {/* Left Text */}
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C5A059]/20 text-[#E7C67D] border border-[#C5A059]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Festive Season Celebration</span>
            </div>

            <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
              Flat 10% Off Your First Order
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
              Experience the craftsmanship of Pakistan’s finest luxury lawn, pure raw silk, and embroidered pret. Use our welcome promo voucher at checkout or via WhatsApp order.
            </p>
          </div>

          {/* Right Action & Coupon */}
          <div className="flex flex-col min-[420px]:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
            {/* Coupon Code Pill */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-black/60 border border-[#C5A059]/50 backdrop-blur-xs w-full min-[420px]:w-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                  Promo Voucher
                </span>
                <span className="font-mono font-bold text-base sm:text-lg text-[#E7C67D] tracking-wider">
                  {couponCode}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#C5A059]" />
                )}
              </button>
            </div>

            {/* Shop Button */}
            <button
              onClick={() => openShopCategory('special-offers')}
              className="w-full min-[420px]:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-[#C5A059] hover:bg-[#b59047] text-black font-serif font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 whitespace-nowrap cursor-pointer min-h-[44px]"
            >
              <span>Explore Offers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
