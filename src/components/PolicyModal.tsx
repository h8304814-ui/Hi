import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Truck, RotateCcw, HelpCircle, Shield, Ruler } from 'lucide-react';
import { formatPKR } from '../utils/formatters';

export const PolicyModal: React.FC = () => {
  const {
    activePolicyModal,
    setActivePolicyModal,
    isSizeGuideOpen,
    setIsSizeGuideOpen,
    config,
  } = useStore();

  const isOpen = activePolicyModal !== null || isSizeGuideOpen;
  const currentModal = isSizeGuideOpen ? 'size-guide' : activePolicyModal;

  if (!isOpen) return null;

  const handleClose = () => {
    setActivePolicyModal(null);
    setIsSizeGuideOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl p-4 sm:p-8 z-10 max-h-[85vh] overflow-y-auto space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            {currentModal === 'shipping' && <Truck className="w-5 h-5 text-[#C5A059] shrink-0" />}
            {currentModal === 'return' && <RotateCcw className="w-5 h-5 text-[#C5A059] shrink-0" />}
            {currentModal === 'faqs' && <HelpCircle className="w-5 h-5 text-[#C5A059] shrink-0" />}
            {currentModal === 'privacy' && <Shield className="w-5 h-5 text-[#C5A059] shrink-0" />}
            {currentModal === 'size-guide' && <Ruler className="w-5 h-5 text-[#C5A059] shrink-0" />}

            <h2 className="font-serif text-lg sm:text-2xl font-bold text-stone-900 leading-snug">
              {currentModal === 'shipping' && 'Shipping & Delivery Policy (Pakistan)'}
              {currentModal === 'return' && '7-Day Return & Exchange Policy'}
              {currentModal === 'faqs' && 'Frequently Asked Questions (FAQs)'}
              {currentModal === 'privacy' && 'Privacy Policy & Customer Trust'}
              {currentModal === 'size-guide' && 'Standard Sizing Chart (Inches)'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="text-xs text-stone-700 space-y-4 leading-relaxed font-light">
          {/* SHIPPING */}
          {currentModal === 'shipping' && (
            <>
              <div className="p-4 bg-[#FAF7F0] rounded-xl border border-stone-200 space-y-1">
                <p className="font-bold text-stone-900">Nationwide Free Shipping Threshold:</p>
                <p>
                  Orders over <strong>{formatPKR(config.shipping.freeShippingThreshold)}</strong> qualify for 100% Free Courier Delivery across all cities in Pakistan. Orders under this amount are charged a nominal flat fee of <strong>{formatPKR(config.shipping.standardShippingFee)}</strong>.
                </p>
              </div>

              <h4 className="font-bold text-stone-900 text-sm">Delivery Timelines</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Major Cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad):</strong> 2 to 3 business days.
                </li>
                <li>
                  <strong>Other Cities & Towns:</strong> 3 to 5 business days.
                </li>
                <li>
                  <strong>Unstitched Suits:</strong> Dispatched within 24 hours of confirmation.
                </li>
              </ul>

              <h4 className="font-bold text-stone-900 text-sm">Courier Partners</h4>
              <p>
                We exclusively dispatch parcels through trusted, trackable courier networks: TCS Express, Leopards Courier, and Trax Logistics. As soon as your order is dispatched, you will receive an SMS and WhatsApp update containing your live tracking number.
              </p>

              <h4 className="font-bold text-stone-900 text-sm">Cash on Delivery (COD) Rules</h4>
              <p>
                Please keep the exact cash amount ready for the delivery rider. Couriers usually attempt delivery twice before returning parcels to our Lahore fulfillment warehouse.
              </p>
            </>
          )}

          {/* RETURN & EXCHANGE */}
          {currentModal === 'return' && (
            <>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-emerald-950">
                <p className="font-bold">7-Day Hassle-Free Exchange Guarantee</p>
                <p>
                  We want you to love your HS Collection attire. If the sizing is not right or you wish to exchange for another color or design, you may request an exchange within 7 days of receiving your parcel.
                </p>
              </div>

              <h4 className="font-bold text-stone-900 text-sm">Conditions for Exchange</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Item must be unused, unwashed, and with all original brand tags and garment bags intact.</li>
                <li>For unstitched suits, the fabric must not be cut or altered in any way.</li>
                <li>Footwear (Khussas) must not show scuffs or outdoor wear on the leather sole.</li>
              </ul>

              <h4 className="font-bold text-stone-900 text-sm">How to Initiate an Exchange</h4>
              <p>
                Simply message our WhatsApp support concierge at <strong>{config.contact.whatsAppDisplay}</strong> with your Order Reference Number and photos of the item. Our team will arrange a reverse pickup or advise on the exchange parcel.
              </p>
            </>
          )}

          {/* FAQS */}
          {currentModal === 'faqs' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-stone-900">Q: Can I place my entire order through WhatsApp?</p>
                <p>
                  <strong>Yes, absolutely!</strong> Every product and the shopping bag include an "Order via WhatsApp" button. Clicking it pre-fills your selected items and size so you can finalize your order directly with our Lahore studio staff.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-900">Q: Is Cash on Delivery available in smaller towns?</p>
                <p>
                  Yes, we offer Cash on Delivery across 200+ cities, tehsils, and towns throughout Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and Azad Jammu & Kashmir via Trax and TCS.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-900">Q: How do I know my exact size?</p>
                <p>
                  Please refer to our Size Chart (in inches) below or message us on WhatsApp with your chest and shoulder measurements; our master tailors will recommend the perfect fit.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-900">Q: What if I receive a defective or damaged product?</p>
                <p>
                  In the rare event of a manufacturing defect, we will immediately provide a free replacement or full refund upon inspection.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {currentModal === 'privacy' && (
            <>
              <p>
                At HS Collection, we take customer privacy with the utmost seriousness. Your contact details, phone number, and physical address are solely used for fulfilling and delivering your orders via authorized Pakistani couriers.
              </p>
              <h4 className="font-bold text-stone-900 text-sm">Data Protection</h4>
              <p>
                We do not sell, rent, or distribute customer details to third-party marketing companies. SMS and WhatsApp communications are sent solely for order confirmations, shipping status updates, and occasional VIP discounts.
              </p>
            </>
          )}

          {/* SIZE GUIDE */}
          {currentModal === 'size-guide' && (
            <div className="space-y-4">
              <p className="text-stone-600">
                All measurements below are in <strong>Inches</strong>. Measure around the fullest part of your chest and waist for the best fit.
              </p>

              {/* Ladies Sizing Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900">Ladies Prêt Sizing (Inches)</h4>
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full min-w-[480px] text-center border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-stone-100 font-bold text-stone-700 border-b">
                        <th className="p-2 text-left">Size</th>
                        <th className="p-2">Chest</th>
                        <th className="p-2">Waist</th>
                        <th className="p-2">Hips</th>
                        <th className="p-2">Shirt Length</th>
                        <th className="p-2">Trouser Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="p-2 text-left font-bold">Extra Small (XS)</td>
                        <td className="p-2">36"</td>
                        <td className="p-2">32"</td>
                        <td className="p-2">38"</td>
                        <td className="p-2">42"</td>
                        <td className="p-2">37"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Small (S)</td>
                        <td className="p-2">38"</td>
                        <td className="p-2">34"</td>
                        <td className="p-2">40"</td>
                        <td className="p-2">43"</td>
                        <td className="p-2">38"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Medium (M)</td>
                        <td className="p-2">41"</td>
                        <td className="p-2">37"</td>
                        <td className="p-2">44"</td>
                        <td className="p-2">44"</td>
                        <td className="p-2">39"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Large (L)</td>
                        <td className="p-2">44"</td>
                        <td className="p-2">41"</td>
                        <td className="p-2">47"</td>
                        <td className="p-2">45"</td>
                        <td className="p-2">40"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Extra Large (XL)</td>
                        <td className="p-2">48"</td>
                        <td className="p-2">45"</td>
                        <td className="p-2">51"</td>
                        <td className="p-2">45"</td>
                        <td className="p-2">40"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gents Sizing Table */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-stone-900">Gents Kurta Shalwar Sizing (Inches)</h4>
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full min-w-[480px] text-center border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-stone-100 font-bold text-stone-700 border-b">
                        <th className="p-2 text-left">Size</th>
                        <th className="p-2">Collar / Ban</th>
                        <th className="p-2">Chest</th>
                        <th className="p-2">Kurta Length</th>
                        <th className="p-2">Sleeve Length</th>
                        <th className="p-2">Shalwar Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="p-2 text-left font-bold">Small (S)</td>
                        <td className="p-2">14.5"</td>
                        <td className="p-2">40"</td>
                        <td className="p-2">40"</td>
                        <td className="p-2">24.5"</td>
                        <td className="p-2">41"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Medium (M)</td>
                        <td className="p-2">15.5"</td>
                        <td className="p-2">43"</td>
                        <td className="p-2">42"</td>
                        <td className="p-2">25.5"</td>
                        <td className="p-2">42"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Large (L)</td>
                        <td className="p-2">16.5"</td>
                        <td className="p-2">46"</td>
                        <td className="p-2">44"</td>
                        <td className="p-2">26.0"</td>
                        <td className="p-2">43"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold">Extra Large (XL)</td>
                        <td className="p-2">17.5"</td>
                        <td className="p-2">49"</td>
                        <td className="p-2">45"</td>
                        <td className="p-2">26.5"</td>
                        <td className="p-2">44"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 pt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
