import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Info,
  Lock,
} from 'lucide-react';
import { CustomerDetails, PaymentMethod } from '../types';
import { formatPKR, validatePakistaniPhone } from '../utils/formatters';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartShippingFee,
    appliedCoupon,
    discountAmount,
    cartTotal,
    placeOrder,
    setActiveView,
    config,
  } = useStore();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    deliveryAddress: '',
    areaLandmark: '',
    postalCode: '',
    orderNotes: '',
  });

  const [customCity, setCustomCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Phone validation check
  const phoneValidation = validatePakistaniPhone(formData.phone);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile phone number is required.';
    } else if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message;
    }

    const effectiveCity = formData.city === 'Other' ? customCity.trim() : formData.city;
    if (!effectiveCity) {
      newErrors.city = 'Delivery city is required.';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Full house/street delivery address is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const finalCustomer: CustomerDetails = {
      ...formData,
      city: formData.city === 'Other' ? customCity.trim() : formData.city,
    };

    setTimeout(() => {
      placeOrder(finalCustomer, paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-3xl font-semibold text-stone-900">
          Your Shopping Bag is empty
        </h2>
        <p className="text-xs text-stone-500">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-widest font-bold"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Return to cart */}
      <button
        onClick={() => setActiveView('shop')}
        className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-black mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Continue Shopping</span>
      </button>

      {/* Demo Mode Notice */}
      <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-amber-950">
            DEMO MODE & REAL WHATSAPP CONFIRMATION
          </p>
          <p className="text-amber-800 leading-relaxed">
            This checkout simulates the complete Pakistani e-commerce ordering process. Placed orders are securely stored in your browser's demo order history, and upon placing the order you can also send a 1-click formatted order confirmation directly to HS Collection's WhatsApp team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Left Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Section 1: Customer Contact */}
          <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E1D0] space-y-4">
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between border-b border-stone-200 pb-3 gap-1">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                1. Customer & Contact Details
              </h2>
              <span className="text-[11px] text-stone-500">For parcel SMS tracking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Fatima Ali / Muhammad Usman"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.fullName ? 'border-rose-500' : 'border-stone-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                  <span>Pakistani Mobile Number *</span>
                  <span className="text-[10px] text-stone-400 font-normal">03XX XXXXXXX</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => setPhoneTouched(true)}
                  className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-black font-mono ${
                    errors.phone
                      ? 'border-rose-500 bg-rose-50/30'
                      : phoneTouched && phoneValidation.isValid
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-stone-300'
                  }`}
                />
                {phoneTouched && !phoneValidation.isValid && (
                  <p className="text-[11px] text-rose-600 font-medium">{phoneValidation.message}</p>
                )}
                {phoneTouched && phoneValidation.isValid && (
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Valid format for TCS/Leopards rider delivery</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                  <span>Email Address (Optional)</span>
                  <span className="text-[10px] text-stone-400 font-normal">For invoice</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.pk"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address in Pakistan */}
          <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E1D0] space-y-4">
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between border-b border-stone-200 pb-3 gap-1">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                2. Delivery Destination (Pakistan)
              </h2>
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Nationwide Courier</span>
              </span>
            </div>

            {/* City Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Select City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                >
                  {config.popularCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="Other">Other City / Town...</option>
                </select>
              </div>

              {/* If "Other" city is chosen */}
              {formData.city === 'Other' ? (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">
                    Enter City or Town Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Swat, Chakwal, Kharian"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">
                    Area / Landmark / Sector
                  </label>
                  <input
                    type="text"
                    name="areaLandmark"
                    placeholder="e.g. DHA Phase 5 / Gulshan-e-Iqbal / F-8"
                    value={formData.areaLandmark}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              )}

              {/* Complete Delivery Address */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Complete Street / House Address *
                </label>
                <textarea
                  name="deliveryAddress"
                  rows={2}
                  placeholder="House #, Street #, Mohallah / Building Name"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.deliveryAddress ? 'border-rose-500' : 'border-stone-300'
                  }`}
                />
                {errors.deliveryAddress && (
                  <p className="text-[11px] text-rose-600 font-medium">
                    {errors.deliveryAddress}
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="orderNotes"
                  placeholder="e.g. Call before arriving, leave with security guard, custom sleeve length..."
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E1D0] space-y-4">
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between border-b border-stone-200 pb-3 gap-1">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                3. Payment Method
              </h2>
              <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 w-fit">
                COD Available
              </span>
            </div>

            <div className="space-y-3">
              {/* Option 1: Cash on Delivery (COD) */}
              <label
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-black bg-white ring-1 ring-black shadow-xs'
                    : 'border-stone-300 bg-stone-50 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-black shrink-0 cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-1">
                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1">
                    <span className="font-bold text-stone-900 text-sm">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] font-semibold text-[#8B6B2B] bg-[#F7F1E4] px-2 py-0.5 rounded w-fit">
                      Most Popular in Pakistan
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Pay in cash directly to the courier rider upon delivery of your parcel at your doorstep. No advance payment required.
                  </p>
                </div>
              </label>

              {/* Option 2: Direct Bank Transfer */}
              <label
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-black bg-white ring-1 ring-black shadow-xs'
                    : 'border-stone-300 bg-stone-50 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 accent-black shrink-0 cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-stone-700 shrink-0" />
                      <span>Direct Bank Transfer</span>
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Transfer online from Meezan, HBL, Alfalah, Standard Chartered, or any Pakistani banking app.
                  </p>

                  {/* Account details box */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1 font-mono text-[11px] text-stone-800 break-words">
                      <p><strong>Bank:</strong> {config.bankDetails.bankName}</p>
                      <p><strong>Account Title:</strong> {config.bankDetails.accountTitle}</p>
                      <p><strong>Account #:</strong> {config.bankDetails.accountNumber}</p>
                      <p className="break-all"><strong>IBAN:</strong> {config.bankDetails.iban}</p>
                      <p className="text-stone-500 font-sans text-[10px] pt-1">
                        * After placing order, please send your transfer screenshot on WhatsApp for instant dispatch.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: Credit Card / JazzCash (Gateway Notice) */}
              <label
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all opacity-85 ${
                  paymentMethod === 'online_gateway'
                    ? 'border-black bg-white ring-1 ring-black shadow-xs'
                    : 'border-stone-300 bg-stone-50 hover:border-stone-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online_gateway"
                  checked={paymentMethod === 'online_gateway'}
                  onChange={() => setPaymentMethod('online_gateway')}
                  className="mt-1 accent-black shrink-0 cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-1">
                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-stone-700 shrink-0" />
                      <span>Card / JazzCash / EasyPaisa</span>
                    </span>
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-mono w-fit">
                      Gateway Setup Needed
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Live card processing requires merchant credentials from PayFast, Safepay, or JazzCash. (Please select <strong>Cash on Delivery</strong> or <strong>Bank Transfer</strong> for this store).
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-[#111111] text-[#FDFBF7] hover:bg-black font-semibold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 cursor-pointer min-h-[48px]"
          >
            <Lock className="w-4 h-4 text-[#C5A059]" />
            <span>
              {isSubmitting
                ? 'Processing Your Order...'
                : `Place Order • ${formatPKR(cartTotal)}`}
            </span>
          </button>
        </form>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E1D0] space-y-4 sm:space-y-5 sticky top-20 lg:top-24">
            <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h3>

            {/* Line items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-14 h-16 object-cover object-top rounded-md bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-stone-500 text-[11px]">
                        Size: {item.selectedSize} • {item.selectedColor.name} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-serif font-bold text-stone-900">
                      {formatPKR(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-stone-200 pt-4 text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPKR(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery (Pakistan Nationwide)</span>
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

              <div className="flex justify-between text-lg font-serif font-bold text-black border-t border-stone-200 pt-3">
                <span>Grand Total</span>
                <span>{formatPKR(cartTotal)}</span>
              </div>
            </div>

            {/* Courier info badge */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Estimated Delivery Time:</span>
              </p>
              <p>
                <strong>Major Cities:</strong> 2 to 3 working days (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad).
              </p>
              <p>
                <strong>Other Cities:</strong> 3 to 5 working days via TCS, Leopards, or Trax.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
