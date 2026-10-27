import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  MessageCircle,
  Truck,
  Tag,
  Check,
} from 'lucide-react';
import { formatPKR, buildWhatsAppLink, createCartWhatsAppMessage } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartCount,
    cartSubtotal,
    cartShippingFee,
    freeShippingGap,
    appliedCoupon,
    discountAmount,
    cartTotal,
    applyCouponCode,
    removeCouponCode,
    setActiveView,
    config,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const msg = createCartWhatsAppMessage(
      cart,
      cartSubtotal,
      cartShippingFee,
      discountAmount,
      cartTotal,
      appliedCoupon?.code
    );
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  // Calculate free delivery progress percentage
  const freeShippingThreshold = config.shipping.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE4D7] flex items-center justify-between bg-stone-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-black">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3.5 sm:p-4 bg-[#FAF7F0] border-b border-[#E8E1D0]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                {freeShippingGap === 0 ? (
                  <span className="text-emerald-700 font-bold">
                    🎉 Congratulations! You unlocked FREE Delivery across Pakistan!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatPKR(freeShippingGap)}</strong> more for FREE Delivery!
                  </span>
                )}
              </span>
              <span className="text-stone-400 font-mono text-[10px] shrink-0 ml-1">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C5A059] to-[#705826] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List or Empty state */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-800">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Discover our latest Pakistani lawn, embroidered chiffons, and gentlemen’s kurta suits.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl bg-white border border-[#EFE9DE] shadow-2xs hover:border-stone-300 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-top rounded-lg bg-stone-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span className="px-1.5 py-0.5 bg-stone-100 rounded">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Price */}
                      <span className="font-serif text-sm font-bold text-stone-900">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and CTAs */}
          {cart.length > 0 && (
            <div className="p-3.5 sm:p-5 bg-stone-50 border-t border-[#EAE4D7] space-y-3 sm:space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex flex-col min-[380px]:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full px-3 py-2 pl-8 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-black uppercase placeholder:normal-case font-mono"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1 font-mono font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      {appliedCoupon.code} applied (-{formatPKR(discountAmount)})
                    </span>
                    <button
                      type="button"
                      onClick={removeCouponCode}
                      className="text-stone-500 hover:text-stone-800 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPKR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Nationwide Pakistan)</span>
                  <span className="font-semibold text-stone-900">
                    {cartShippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPKR(cartShippingFee)
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-black border-t border-stone-200 pt-2">
                  <span>Estimated Total</span>
                  <span>{formatPKR(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#111111] text-[#FDFBF7] hover:bg-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b7a3e] border border-[#25D366]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order Entire Bag via WhatsApp</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400">
                Cash on Delivery (COD) available for all cities in Pakistan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
