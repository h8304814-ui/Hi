import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Heart,
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Share2,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { formatPKR, buildWhatsAppLink, createProductWhatsAppMessage } from '../utils/formatters';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setActiveView,
    addToCart,
    products,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setActivePolicyModal,
    showToast,
    config,
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center">
        <p className="text-stone-500">No product selected.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-6 py-2 bg-black text-white text-xs uppercase font-bold rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const product = selectedProduct;
  const isFavorited = isInWishlist(product.id);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'fabric' | 'shipping' | 'care'>('fabric');

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const msg = createProductWhatsAppMessage(product, selectedSize, selectedColor.name, quantity);
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on HS Collection Pakistan!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
        <button
          onClick={() => setActiveView('home')}
          className="hover:text-black transition-colors cursor-pointer shrink-0"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <button
          onClick={() => setActiveView('shop')}
          className="hover:text-black transition-colors cursor-pointer shrink-0"
        >
          Shop All
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="capitalize text-stone-700 shrink-0">{product.category.replace('-', ' ')}</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="text-black font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery + Purchasing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Left: Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-y-auto max-h-[560px] pb-2 md:pb-0 shrink-0 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F2EDE2] border border-[#E8E1D2] shadow-xs group">
            <img
              src={product.images[activeImgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-col gap-1.5 sm:gap-2">
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="px-2.5 sm:px-3 py-1 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-rose-700 text-white shadow-md">
                  {product.discountPercent}% Off Sale
                </span>
              )}
              {product.isNew && (
                <span className="px-2.5 sm:px-3 py-1 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#111111] text-[#C5A059] shadow-md">
                  New Arrival
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-md touch-manipulation cursor-pointer ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 text-stone-700 hover:bg-white hover:text-black'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right: Info & Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
          <div className="space-y-3.5 sm:space-y-4">
            {/* Category, SKU, and Rating */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-widest text-[#93702A] bg-[#F5EEDD] px-2.5 py-1 rounded text-[10px] sm:text-xs">
                {product.subcategory}
              </span>
              <span className="text-stone-400 font-mono text-[10px] sm:text-xs">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] leading-tight">
                {product.name}
              </h1>
              {product.nameUrdu && (
                <p className="font-serif text-sm sm:text-base text-[#93702A] mt-1 italic tracking-wide">
                  {product.nameUrdu}
                </p>
              )}
            </div>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-800">
                {product.rating} / 5.0
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-[11px] sm:text-xs text-stone-500">
                ({product.reviewCount} verified Pakistani reviews)
              </span>
            </div>

            {/* Price section */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF6EE] border border-[#EBE3D3] flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-500 block">
                  Price (All Taxes Included)
                </span>
                <div className="flex items-baseline gap-2.5 sm:gap-3 mt-0.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs sm:text-sm text-stone-400 line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] sm:text-xs font-bold text-rose-700 bg-rose-100 px-2 sm:px-2.5 py-1 rounded">
                  Save {formatPKR(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-2 pt-1 sm:pt-2">
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center justify-between">
                <span>Color: <strong className="text-black capitalize">{selectedColor.name}</strong></span>
              </label>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-black bg-white ring-1 ring-black shadow-xs font-semibold'
                        : 'border-stone-300 bg-stone-50 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-1 sm:pt-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 uppercase tracking-wider">
                  Size: <strong className="text-black">{selectedSize}</strong>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-stone-600 hover:text-black flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Size Chart (Inches)</span>
                </button>
              </div>

              <div className="grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-2 sm:px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#111111] text-[#FDFBF7] border-black shadow-xs'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Stock status */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3.5 sm:px-4 py-1.5 text-xs font-bold text-black min-w-[2.2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock level badge */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-emerald-800 font-medium text-[11px] sm:text-xs">
                  {product.stockCount} in stock (Ready to Dispatch)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#EAE4D7] space-y-2.5 sm:space-y-3">
            {/* Primary Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-[#111111] text-[#FDFBF7] hover:bg-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer touch-manipulation"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <span className="truncate">Add to Shopping Bag • {formatPKR(product.price * quantity)}</span>
            </button>

            {/* Buy Now & WhatsApp Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-[#F0ECE1] hover:bg-[#E4DDCF] text-stone-900 border border-[#D5CCBC] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer touch-manipulation"
              >
                <span>Direct Checkout</span>
                <span>→</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Share link button */}
            <div className="flex items-center justify-center pt-1">
              <button
                onClick={handleShare}
                className="text-xs text-stone-500 hover:text-black flex items-center gap-1 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share this design with friends or family</span>
              </button>
            </div>
          </div>

          {/* Delivery & Assurance mini banner */}
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#E8E1D0] space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>TCS / Leopards Courier:</strong> 3 to 5 business days nationwide.
              </span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <RotateCcw className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>7-Day Exchange:</strong> Hassle-free size or color swap.
              </span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>Payment:</strong> Cash on Delivery (COD) or Direct Bank Transfer.
              </span>
            </div>
          </div>

          {/* Tabs for detailed info */}
          <div className="pt-2">
            <div className="flex border-b border-stone-300 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-2.5 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'fabric'
                    ? 'border-black text-black'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Fabric Details
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2.5 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'shipping'
                    ? 'border-black text-black'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Pakistan Delivery
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'care'
                    ? 'border-black text-black'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Care Guide
              </button>
            </div>

            <div className="py-4 text-xs text-stone-600 leading-relaxed font-light">
              {activeTab === 'fabric' && (
                <div className="space-y-2">
                  <p><strong>Composition & Weave:</strong> {product.fabricDetails}</p>
                  <p>
                    Every ensemble at HS Collection is crafted using premium certified yarn, high-count pure cotton lawns, authentic Pakistani raw silk, or traditional Kashmiri needlework.
                  </p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>
                    We deliver to all major Pakistani metropolitan cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Gujranwala, Sialkot) and 150+ smaller towns via tracked TCS, Leopards, and Trax couriers.
                  </p>
                  <p>
                    <strong>Cash on Delivery (COD):</strong> Rider will collect the exact parcel total in Pakistani Rupees upon arrival.
                  </p>
                </div>
              )}
              {activeTab === 'care' && (
                <div className="space-y-2">
                  <p><strong>Recommended Care:</strong> {product.careInstructions}</p>
                  <p>
                    To preserve delicate tilla threadwork, zari, and stone embellishments, avoid direct iron contact on embroidered motifs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-[#EAE4D7]">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
                Complete Your Look
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-[#111111] mt-0.5">
                You May Also Like
              </h2>
            </div>
            <button
              onClick={() => setActiveView('shop')}
              className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#C5A059] flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
