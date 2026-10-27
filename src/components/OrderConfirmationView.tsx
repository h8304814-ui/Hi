import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Printer,
  MessageCircle,
  Truck,
  ArrowRight,
  PackageCheck,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import { formatPKR, buildWhatsAppLink, createOrderWhatsAppMessage } from '../utils/formatters';

export const OrderConfirmationView: React.FC = () => {
  const { lastPlacedOrder, setActiveView, config } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <p className="text-stone-500">No recent order found.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-full"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const msg = createOrderWhatsAppMessage(order);
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
      {/* Success Box */}
      <div className="bg-[#FAF7F0] border border-[#E8E1D0] rounded-2xl p-4 sm:p-8 md:p-10 shadow-lg space-y-6 sm:space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Header with checkmark */}
        <div className="text-center space-y-3 pb-6 border-b border-stone-200">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold block">
            Thank You For Shopping With HS Collection
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900">
            Your Order Has Been Placed!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-lg mx-auto">
            Order Reference: <strong className="font-mono text-black font-bold">#{order.orderNumber}</strong>
          </p>
          <span className="inline-block text-[10px] sm:text-[11px] font-medium bg-amber-100/90 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
            Demo Mode: Order recorded in local system. Use WhatsApp button below to push to store team.
          </span>
        </div>

        {/* Action Buttons for WhatsApp & Print */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 print:hidden">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order Details to WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => setActiveView('track-order')}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[44px]"
          >
            <Truck className="w-4 h-4 text-[#C5A059]" />
            <span>Track Status</span>
          </button>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-xl border border-stone-200 text-xs">
          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 border-b pb-1">
              Customer Information
            </h4>
            <p><strong>Name:</strong> {order.customer.fullName}</p>
            <p><strong>Mobile:</strong> <span className="font-mono">{order.customer.phone}</span></p>
            {order.customer.email && <p><strong>Email:</strong> {order.customer.email}</p>}
            <p>
              <strong>Payment:</strong>{' '}
              {order.paymentMethod === 'cod'
                ? 'Cash on Delivery (COD)'
                : order.paymentMethod === 'bank_transfer'
                ? 'Direct Bank Transfer'
                : 'Online Payment'}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 border-b pb-1">
              Shipping Destination (Pakistan)
            </h4>
            <p><strong>City:</strong> {order.customer.city}</p>
            <p><strong>Address:</strong> {order.customer.deliveryAddress}</p>
            {order.customer.areaLandmark && (
              <p><strong>Area / Landmark:</strong> {order.customer.areaLandmark}</p>
            )}
            {order.customer.orderNotes && (
              <p><strong>Notes:</strong> {order.customer.orderNotes}</p>
            )}
            <p className="text-emerald-700 font-medium pt-1">
              Estimated Delivery: 3 to 5 business days
            </p>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            Items in This Order
          </h4>
          <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl bg-white overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-16 object-cover object-top rounded-md bg-stone-100 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-stone-900">{item.productName}</p>
                    <p className="text-stone-500 text-[11px]">
                      SKU: {item.sku} • Size: {item.selectedSize} • Color: {item.selectedColor}
                    </p>
                    <p className="text-stone-500 text-[11px]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-serif font-bold text-sm text-stone-900 self-end min-[420px]:self-auto">
                  {formatPKR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5 text-xs text-stone-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">{formatPKR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-stone-900">
              {order.shippingFee === 0 ? (
                <span className="text-emerald-700 font-bold">FREE</span>
              ) : (
                formatPKR(order.shippingFee)
              )}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Discount ({order.couponCode || 'Promo'})</span>
              <span>-{formatPKR(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-serif font-bold text-black border-t border-stone-200 pt-2">
            <span>Amount Due</span>
            <span>{formatPKR(order.total)}</span>
          </div>
        </div>

        {/* Bank instructions if selected */}
        {order.paymentMethod === 'bank_transfer' && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1.5 text-blue-900">
            <h5 className="font-bold flex items-center gap-1.5 text-blue-950">
              <Building2 className="w-4 h-4 text-blue-700" />
              Bank Transfer Instructions
            </h5>
            <p>
              Please transfer <strong>{formatPKR(order.total)}</strong> to our official Meezan Bank account:
            </p>
            <div className="font-mono text-[11px] p-2 bg-white rounded border border-blue-200 space-y-0.5 break-words">
              <p>Account: {config.bankDetails.accountTitle}</p>
              <p>Account #: {config.bankDetails.accountNumber}</p>
              <p className="break-all">IBAN: {config.bankDetails.iban}</p>
            </div>
            <p className="text-[11px] text-blue-800">
              After transferring, please click "Send Order Details to WhatsApp" and attach your transfer slip.
            </p>
          </div>
        )}

        {/* Return to shop */}
        <div className="text-center pt-4 print:hidden">
          <button
            onClick={() => setActiveView('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:text-[#C5A059] transition-colors"
          >
            <span>Continue Shopping at HS Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
