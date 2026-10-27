import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryCard {
  category: ProductCategory;
  title: string;
  titleUrdu: string;
  subtitle: string;
  image: string;
  tag: string;
  gridSpan: string;
}

export const CategoryShowcase: React.FC = () => {
  const { openShopCategory, products } = useStore();

  const getProductCount = (cat: ProductCategory) => {
    if (cat === 'new-arrivals') return products.filter((p) => p.isNew).length;
    if (cat === 'best-sellers') return products.filter((p) => p.isBestSeller).length;
    if (cat === 'special-offers') return products.filter((p) => p.isSpecialOffer || (p.discountPercent && p.discountPercent > 0)).length;
    return products.filter((p) => p.category === cat).length;
  };

  const categories: CategoryCard[] = [
    {
      category: 'ladies-suits',
      title: 'Ladies Suits',
      titleUrdu: 'خواتین کے سوٹ',
      subtitle: 'Luxury Lawn, Embroidered Chiffon & Festive Pret 3-Piece',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      tag: 'Couture & Lawn',
      gridSpan: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
    },
    {
      category: 'gents-suits',
      title: 'Gents Suits',
      titleUrdu: 'مردانہ سوٹ و کرتا شلوار',
      subtitle: 'Pure Boski, Egyptian Giza Cotton & Raw Silk Waistcoats',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80',
      tag: 'Heritage Menswear',
      gridSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
    },
    {
      category: 'accessories',
      title: 'Fashion Accessories',
      titleUrdu: 'شالیں، کھسے و کفلنکس',
      subtitle: 'Handwoven Pashmina Shawls, Tilla Khussas & Evening Clutches',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
      tag: 'Artisanal Craft',
      gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    },
    {
      category: 'new-arrivals',
      title: 'New Arrivals',
      titleUrdu: 'تازہ ترین ڈیزائن',
      subtitle: 'Just released festive and seasonal collections for 2026',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=80',
      tag: 'Season 2026',
      gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    },
    {
      category: 'best-sellers',
      title: 'Best Sellers',
      titleUrdu: 'سب سے زیادہ پسندیدہ',
      subtitle: 'Customer favorites tested and loved across Pakistan',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      tag: '5-Star Rated',
      gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    },
    {
      category: 'special-offers',
      title: 'Special Offers',
      titleUrdu: 'خصوصی رعایت',
      subtitle: 'Exclusive discounts up to 30% off for festive shopping',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=80',
      tag: 'Up to 30% Off',
      gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-[#F0ECE1] text-[#705826] mb-2 sm:mb-3">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Curated Collections</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#111111] tracking-tight">
          Explore by Category
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3 sm:mt-4 mb-2 sm:mb-3" />
        <p className="text-xs sm:text-sm md:text-base text-stone-600 font-light max-w-2xl mx-auto">
          From opulent festive pret to classic gentlemen’s kurta shalwars and artisanal footwear, discover the complete wardrobe of HS Collection.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, idx) => {
          const count = getProductCount(cat.category);
          return (
            <div
              key={idx}
              onClick={() => openShopCategory(cat.category)}
              className={`group relative overflow-hidden rounded-2xl bg-stone-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[250px] sm:min-h-[280px] md:min-h-[320px] flex flex-col justify-end touch-manipulation ${cat.gridSpan}`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-xs">
                  {cat.tag}
                </span>
              </div>

              {/* Arrow Icon in Top Right */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-xs group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-4 sm:p-6 text-white space-y-1 sm:space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-serif tracking-widest text-[#C5A059] italic">
                    {cat.titleUrdu}
                  </span>
                  <span className="text-[10px] tracking-wider text-stone-300 uppercase">
                    {count} {count === 1 ? 'Design' : 'Designs'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white group-hover:text-[#C5A059] transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-stone-300 font-light line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                <div className="pt-1.5 sm:pt-2 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
