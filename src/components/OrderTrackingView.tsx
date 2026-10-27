import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  MessageCircle,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { formatPKR, buildWhatsAppLink } from '../utils/formatters';

export const OrderTrackingView: React.FC = () => {
  const { orders, setActiveView } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === term ||
        o.orderNumber.toLowerCase().includes(term) ||
        o.customer.phone.replace(/[\s\-]/g, '').includes(term.replace(/[\s\-]/g, ''))
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received in system', key: 'pending' },
    { title: 'Confirmed by Studio', desc: 'Fabric & sizing verified', key: 'confirmed' },
    { title: 'Quality Check & Packing', desc: 'Ironing & fragrance packaging', key: 'processing' },
    { title: 'Dispatched via Courier', desc: 'Handed to TCS / Trax rider', key: 'shipped' },
    { title: 'Delivered', desc: 'Completed successfully', key: 'delivered' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
          Courier Status In Pakistan
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900">
          Track Your HS Collection Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light">
          Enter your Order Reference Number (e.g., <strong>HSC-2026-1049</strong>) or your 11-digit mobile number to check delivery progress.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="flex flex-col min-[420px]:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Order # or 03XX XXXXXXX"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 pl-10 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-black font-mono shadow-xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 sm:top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 sm:py-3 bg-[#111111] hover:bg-black text-[#FDFBF7] text-xs uppercase tracking-widest font-bold rounded-xl shadow-md transition-all cursor-pointer min-h-[44px] shrink-0"
          >
            Track Parcel
          </button>
        </div>
      </form>

      {/* Quick Select from existing orders in browser session */}
      {orders.length > 0 && !searchedOrder && (
        <div className="max-w-xl mx-auto mb-10 p-4 bg-[#FAF7F0] rounded-xl border border-[#E8E1D0]">
          <p className="text-xs font-semibold text-stone-700 mb-2">
            Your Recent Orders in this Browser:
          </p>
          <div className="space-y-1.5">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => {
                  setSearchTerm(ord.orderNumber);
                  setSearchedOrder(ord);
                  setHasSearched(true);
                }}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <strong className="font-mono">{ord.orderNumber}</strong> • {ord.customer.fullName} ({ord.customer.city})
                </div>
                <div className="flex items-center gap-2">
                  <span className="capitalize text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {ord.status}
                  </span>
                  <span className="text-stone-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Box */}
      {hasSearched && searchedOrder && (
        <div className="bg-[#FAF7F0] border border-[#E8E1D0] rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-stone-200 pb-5">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
                Order Tracking Details
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                #{searchedOrder.orderNumber}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase text-stone-500 block">Courier Status</span>
              <span className="inline-block mt-1 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {searchedOrder.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-2 sm:py-4">
            <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
              {steps.map((step, idx) => {
                const currentIdx = getStepIndex(searchedOrder.status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={step.key} className="flex-1 flex md:flex-col items-center md:text-center gap-3 md:gap-2 relative">
                    {/* Circle icon */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-colors shrink-0 ${
                        isPassed
                          ? 'bg-[#111111] text-[#C5A059]'
                          : 'bg-stone-200 text-stone-400'
                      } ${isCurrent ? 'ring-4 ring-[#C5A059]/30' : ''}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059]" /> : idx + 1}
                    </div>

                    <div className="flex-1 md:flex-none">
                      <p className={`text-xs font-bold ${isPassed ? 'text-black' : 'text-stone-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-stone-500 font-light">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 sm:p-5 rounded-xl border border-stone-200 text-xs">
            <div className="space-y-1">
              <p className="text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                Assigned Logistics Partner
              </p>
              <p className="font-semibold text-stone-900 text-sm">
                {searchedOrder.courierName || 'Trax Logistics / TCS Pakistan'}
              </p>
              <p className="text-stone-600 font-mono">
                Tracking Number: <strong>{searchedOrder.trackingNumber || 'TRX-8392019'}</strong>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                Delivery Address
              </p>
              <p className="font-semibold text-stone-900">{searchedOrder.customer.fullName}</p>
              <p className="text-stone-600">
                {searchedOrder.customer.deliveryAddress}, {searchedOrder.customer.city}
              </p>
              <p className="text-stone-500 font-mono">{searchedOrder.customer.phone}</p>
            </div>
          </div>

          {/* WhatsApp Support CTA */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-emerald-900">
            <div>
              <p className="font-bold text-emerald-950">Have a question about this shipment?</p>
              <p className="text-emerald-800">
                Contact our customer support team directly on WhatsApp for real-time dispatch updates.
              </p>
            </div>
            <a
              href={buildWhatsAppLink(
                `Salam HS Collection! I am inquiring about tracking for Order #${searchedOrder.orderNumber} (${searchedOrder.customer.fullName}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold flex items-center justify-center gap-1.5 hover:bg-[#20ba59] transition-colors whitespace-nowrap shadow-xs cursor-pointer min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* No Order Found */}
      {hasSearched && !searchedOrder && (
        <div className="p-8 bg-[#FAF7F0] rounded-2xl border border-[#E8E1D0] text-center space-y-3 max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Order Reference Not Found
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We could not find an order matching "<strong>{searchTerm}</strong>". Please verify your order number from your confirmation message or contact our team via WhatsApp.
          </p>
          <a
            href={buildWhatsAppLink(`Salam HS Collection! I am trying to locate my order: ${searchTerm}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:underline pt-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire with WhatsApp Support</span>
          </a>
        </div>
      )}
    </div>
  );
};
