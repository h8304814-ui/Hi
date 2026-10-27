import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/formatters';
import { ProductCategory } from '../types';

interface Slide {
  id: number;
  tag: string;
  tagUrdu: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  image: string;
  badge: string;
  accentColor: string;
}

export const HeroSlider: React.FC = () => {
  const { openShopCategory, config } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 0,
      tag: 'New Festive Prêt 2026',
      tagUrdu: 'شاہی فیسٹیو کلیکشن',
      title: 'Embroidered Grandeur & Ethereal Chiffon',
      subtitle: 'Handcrafted zardozi, shimmering tilla, and pure organza dupattas designed for the unforgettable celebrations of Pakistan.',
      category: 'ladies-suits',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85',
      badge: 'Festive Pret',
      accentColor: '#C5A059',
    },
    {
      id: 1,
      tag: 'Gentlemen’s Signature Heritage',
      tagUrdu: 'بوسکی و کاٹن کرتا شلوار',
      title: 'The Royal Boski & Egyptian Cotton Edit',
      subtitle: 'Experience unmatched drape, breathability, and bespoke tailoring. Traditional kurta shalwars and embroidered raw silk waistcoats.',
      category: 'gents-suits',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
      badge: 'Pure Boski & Cotton',
      accentColor: '#D4AF37',
    },
    {
      id: 2,
      tag: 'Heirloom Craftsmanship',
      tagUrdu: 'دستکاری شالیں و کھسے',
      title: 'Kashmiri Sozni Shawls & Tilla Khussas',
      subtitle: 'Complete your festive look with hand-embroidered wool pashminas, camel-leather padded khussas, and vintage raw silk clutches.',
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1800&q=85',
      badge: 'Artisanal Essentials',
      accentColor: '#C5A059',
    },
  ];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#111111] text-[#FDFBF7]">
      {/* Background slide images with crossfade */}
      <div className="relative h-[500px] min-[400px]:h-[540px] sm:h-[620px] lg:h-[700px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center brightness-[0.42]"
            />
            {/* Gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
          </div>
        ))}

        {/* Hero Content Layer */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl space-y-3 sm:space-y-5 animate-in fade-in slide-in-from-left-6 duration-700">
            {/* Tag / Category Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-[#C5A059]/20 text-[#E7C67D] border border-[#C5A059]/40 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E7C67D] shrink-0" />
                <span>{active.tag}</span>
              </span>
              <span className="text-stone-400 font-serif text-xs sm:text-sm italic tracking-widest hidden min-[400px]:inline">
                ({active.tagUrdu})
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              {active.title}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-xs sm:text-base lg:text-lg font-light leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
              {active.subtitle}
            </p>

            {/* Buttons */}
            <div className="pt-1 sm:pt-2 flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-2.5 sm:gap-4">
              <button
                onClick={() => openShopCategory(active.category)}
                className="w-full min-[480px]:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#FDFBF7] text-[#111111] hover:bg-[#EAE5D9] text-[11px] sm:text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer touch-manipulation"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </button>

              <a
                href={buildWhatsAppLink(
                  `Salam HS Collection! I am interested in exploring the ${active.title}. Please share current availability and catalogue.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-[480px]:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4EFA8B] border border-[#25D366]/50 text-[11px] sm:text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all backdrop-blur-xs touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[10.5px] sm:text-[11px] text-stone-300 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0"></span>
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0"></span>
                <span>Free Shipping over Rs. {config.shipping.freeShippingThreshold.toLocaleString('en-PK')}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0"></span>
                <span>7-Day Return/Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide
                    ? 'w-7 sm:w-8 bg-[#C5A059]'
                    : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Prev Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
              }
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer touch-manipulation"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer touch-manipulation"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
