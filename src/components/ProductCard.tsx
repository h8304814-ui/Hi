import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { formatPKR, buildWhatsAppLink, createProductWhatsAppMessage } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProductDetail,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const defaultSize = product.sizes[0] || 'Standard';
  const defaultColor = product.colors[0] || { name: 'Standard', hex: '#111111' };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = createProductWhatsAppMessage(product, defaultSize, defaultColor.name, 1);
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div
      onClick={() => viewProductDetail(product)}
      className="group flex flex-col bg-[#FDFBF7] border border-[#EBE5D8] rounded-xl overflow-hidden hover:border-[#C5A059]/60 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE2]">
        {/* Main image */}
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10 flex flex-col gap-1 sm:gap-1.5">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-sm text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-rose-700 text-white shadow-xs">
              {product.discountPercent}% OFF
            </span>
          ) : null}
          {product.isNew && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-sm text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#111111] text-[#C5A059] shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && !product.discountPercent && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-sm text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#C5A059] text-black shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible) */}
        <button
          onClick={handleToggleFav}
          className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all touch-manipulation cursor-pointer ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-black backdrop-blur-xs'
          }`}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay for Desktop */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 z-10 items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#111111] text-white hover:bg-black text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={handleQuickView}
            className="p-2.5 rounded-lg bg-white/90 text-stone-800 hover:bg-white hover:text-black shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            title="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={handleWhatsAppInquiry}
            className="p-2.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] shadow-md transition-colors cursor-pointer"
            title="Inquire via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500">
            <span className="uppercase tracking-wider font-medium truncate max-w-[120px]">{product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-[#111111] group-hover:text-[#705826] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Urdu Name if available */}
          {product.nameUrdu && (
            <p className="font-serif text-[10px] sm:text-[11px] text-[#A68038] line-clamp-1 italic">
              {product.nameUrdu}
            </p>
          )}
        </div>

        {/* Sizes and Color Dots */}
        <div className="pt-1 flex items-center justify-between gap-1.5 border-t border-[#F0EBE0]">
          {/* Sizes */}
          <div className="flex items-center gap-1 overflow-hidden min-w-0">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-sm bg-[#F0EAE1] text-stone-700 font-medium whitespace-nowrap"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[9px] sm:text-[10px] text-stone-400 shrink-0">+{product.sizes.length - 3}</span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex items-center -space-x-1 shrink-0">
            {product.colors.slice(0, 3).map((color, i) => (
              <span
                key={i}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-white shadow-xs inline-block"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Price & Stock info */}
        <div className="pt-1.5 sm:pt-2 flex items-baseline justify-between gap-1">
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap min-w-0">
            <span className="font-serif text-base sm:text-lg font-bold text-[#111111]">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock hint */}
          <span
            className={`text-[9px] sm:text-[10px] font-medium shrink-0 ${
              product.stockCount <= 10 ? 'text-amber-700 font-semibold' : 'text-emerald-700'
            }`}
          >
            {product.stockCount <= 10 ? `Only ${product.stockCount} left` : 'In Stock'}
          </span>
        </div>

        {/* Mobile-only Quick Action Buttons */}
        <div className="pt-2 flex sm:hidden items-center gap-1.5 border-t border-[#F0EBE0]/80">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-1.5 px-2 rounded-lg bg-[#111111] text-white text-[10px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1 active:scale-95 transition-all touch-manipulation"
          >
            <ShoppingBag className="w-3 h-3 text-[#C5A059]" />
            <span>Add to Bag</span>
          </button>
          <button
            onClick={handleWhatsAppInquiry}
            className="p-1.5 rounded-lg bg-[#25D366] text-white active:scale-95 transition-all touch-manipulation"
            title="Inquire on WhatsApp"
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
