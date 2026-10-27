import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Star, ShoppingBag, MessageCircle, Check, Sparkles, ChevronRight } from 'lucide-react';
import { formatPKR, buildWhatsAppLink, createProductWhatsAppMessage } from '../utils/formatters';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    viewProductDetail,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    setQuickViewProduct(null);
    viewProductDetail(product);
  };

  const handleWhatsApp = () => {
    const msg = createProductWhatsAppMessage(product, selectedSize, selectedColor.name, quantity);
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl shadow-2xl z-10 flex flex-col md:flex-row max-h-[92vh] overflow-y-auto md:overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 text-stone-700 hover:bg-black hover:text-white transition-all shadow-md touch-manipulation cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 p-3 sm:p-5 md:p-6 bg-[#F4EFE6] flex flex-col items-center justify-between shrink-0">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none aspect-[4/5] rounded-xl overflow-hidden bg-white shadow-xs mx-auto">
            <img
              src={product.images[selectedImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.discountPercent && (
              <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase bg-rose-700 text-white rounded-sm">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto w-full justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    idx === selectedImgIdx ? 'border-[#C5A059] scale-105' : 'border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Config */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto space-y-4 sm:space-y-5">
          <div className="space-y-3.5 sm:space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
                {product.subcategory} • SKU: {product.sku}
              </span>
              <div className="flex items-center gap-1 text-amber-600 text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount})</span>
              </div>
            </div>

            {/* Title & Urdu */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-[#111111]">
                {product.name}
              </h2>
              {product.nameUrdu && (
                <p className="font-serif text-xs sm:text-sm text-[#A68038] mt-0.5 italic">
                  {product.nameUrdu}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs sm:text-sm text-stone-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Cash on Delivery Available
              </span>
            </div>

            {/* Brief Fabric Specs */}
            <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#E9E1D2] text-xs space-y-1">
              <p className="font-semibold text-stone-900">Fabric & Craftsmanship:</p>
              <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs">{product.fabricDetails}</p>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-stone-700">
                  Color: <strong className="text-black">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedColor.name === c.name
                        ? 'border-black bg-white ring-1 ring-black shadow-xs font-semibold'
                        : 'border-stone-300 bg-stone-50 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-stone-700">
                  Select Size: <strong className="text-black">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-stone-500 hover:text-black underline cursor-pointer"
                >
                  Size Chart (Inches)
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#111111] text-[#FDFBF7] border-black shadow-xs'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <span className="text-xs font-medium text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 sm:px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="px-2.5 sm:px-3 py-1 text-xs font-bold text-black min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-2.5 sm:px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] sm:text-xs text-stone-500">
                ({product.stockCount} available)
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 sm:pt-4 border-t border-[#EAE4D7] space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-[#111111] text-white hover:bg-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer touch-manipulation"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span className="truncate">Add to Bag • {formatPKR(product.price * quantity)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer touch-manipulation shrink-0 ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:border-black text-stone-700'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
              <button
                onClick={handleWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b7a3e] border border-[#25D366]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                onClick={handleFullDetail}
                className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer touch-manipulation"
              >
                <span>View Full Page</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
