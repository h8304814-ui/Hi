import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSlider } from './HeroSlider';
import { ValueProps } from './ValueProps';
import { CategoryShowcase } from './CategoryShowcase';
import { ProductCard } from './ProductCard';
import { PromoBanner } from './PromoBanner';
import { ReviewsSection } from './ReviewsSection';
import { Newsletter } from './Newsletter';
import { ArrowRight, Sparkles, Instagram, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ProductCategory } from '../types';

export const HomeView: React.FC = () => {
  const { products, openShopCategory, setActiveView } = useStore();
  const [activeTab, setActiveTab] = useState<'new' | 'trending' | 'ladies' | 'gents'>('trending');

  // Filter products for the tabs
  const tabProducts = React.useMemo(() => {
    switch (activeTab) {
      case 'new':
        return products.filter((p) => p.isNew).slice(0, 8);
      case 'trending':
        return products.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 8);
      case 'ladies':
        return products.filter((p) => p.category === 'ladies-suits').slice(0, 8);
      case 'gents':
        return products.filter((p) => p.category === 'gents-suits').slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  }, [products, activeTab]);

  return (
    <div className="space-y-0">
      {/* 1. Large Editorial Fashion Hero */}
      <HeroSlider />

      {/* 2. Nationwide Trust & COD Pillars */}
      <ValueProps />

      {/* 3. 6 Main Product Categories Showcase */}
      <CategoryShowcase />

      {/* 4. Curated Featured Products with Interactive Tabs */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F0ECE1] text-[#705826] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Selections</span>
            </div>
            <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Trending Pakistani Pret
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mt-3" />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { id: 'trending', label: 'Trending Now' },
              { id: 'new', label: 'New Arrivals 2026' },
              { id: 'ladies', label: 'Ladies Suits' },
              { id: 'gents', label: 'Gents Collection' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#111111] text-[#FDFBF7] shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tabProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openShopCategory('all')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-stone-800 bg-transparent hover:bg-black hover:text-white text-xs uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>View All {products.length} Designs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Promotional Voucher Banner */}
      <PromoBanner />

      {/* 6. Heritage Story & Craftsmanship Spotlight */}
      <section className="py-14 sm:py-20 bg-[#FAF7F0] border-y border-[#EAE4D7]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
                The Heritage of HS Collection
              </span>
              <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
                Rooted in Pakistani Craft, Tailored for the Modern Muse
              </h2>
              <div className="w-16 h-0.5 bg-[#C5A059]" />
              <p className="text-stone-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                Founded with a vision to celebrate Pakistan’s rich textile legacy, HS Collection merges generational embroidery techniques—from intricate Kashmiri sozni needlework to royal zardozi and delicate Chikankari—with contemporary pret silhouettes.
              </p>
              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                Every fabric is meticulously tested: whether it is high-density 80/80 luxury lawn woven for breathable summers, featherlight micro-Boski for gentlemen’s Friday formals, or plush 9000-grade micro-velvet for winter weddings.
              </p>

              <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-stone-200 text-center min-[380px]:text-left">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider">
                    Pure Authentic Fabrics
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block">
                    200+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider">
                    Cities Delivered in Pakistan
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 block">
                    7 Days
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider">
                    Guaranteed Easy Exchange
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Mosaic (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                alt="Embroidered fabric closeup"
                className="rounded-2xl object-cover h-48 sm:h-64 w-full shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80"
                alt="Pakistani gentlemen's kurta"
                className="rounded-2xl object-cover h-48 sm:h-64 w-full shadow-md mt-4 sm:mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Pakistani Customer Testimonials */}
      <ReviewsSection />

      {/* 8. Instagram / Lookbook Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-semibold uppercase tracking-widest">
            <Instagram className="w-4 h-4 text-[#C5A059]" />
            <span>@hscollection.pk</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
            Follow Our Festive Journey
          </h2>
          <p className="text-xs text-stone-500 font-light">
            Tag #HSCollectionLook on Instagram to be featured on our official gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 min-[420px]:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=500&q=80',
          ].map((src, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={src}
                alt="HS Collection Instagram look"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter Signup */}
      <Newsletter />
    </div>
  );
};
