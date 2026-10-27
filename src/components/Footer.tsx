import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Truck,
  Heart,
  Instagram,
  Facebook,
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/formatters';

export const Footer: React.FC = () => {
  const {
    openShopCategory,
    setActiveView,
    setActivePolicyModal,
    setIsSizeGuideOpen,
    config,
  } = useStore();

  return (
    <footer className="bg-[#111111] text-[#FDFBF7] pt-12 sm:pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-800">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-stone-700 bg-stone-900 text-[#C5A059] flex items-center justify-center font-serif font-bold text-lg">
                HS
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-widest uppercase text-white">
                  HS Collection
                </h3>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] block">
                  {config.taglineUrdu}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              HS Collection represents the pinnacle of Pakistani sartorial elegance. From lavishly embroidered festive lawn suits and handwoven Kashmiri shawls to signature royal Boski kurta ensembles, we deliver couture perfection to doorsteps across Pakistan.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={config.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#C5A059] hover:text-black flex items-center justify-center text-stone-300 transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={config.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#C5A059] hover:text-black flex items-center justify-center text-stone-300 transition-colors"
                title="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink("Salam HS Collection! I am reaching out from your website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => openShopCategory('ladies-suits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ladies Festive & Lawn
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShopCategory('gents-suits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gents Boski & Cotton
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShopCategory('accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pashmina Shawls & Khussa
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShopCategory('new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShopCategory('best-sellers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => openShopCategory('special-offers')}
                  className="hover:text-[#C5A059] font-medium transition-colors cursor-pointer"
                >
                  Special Festive Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Customer Concierge
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setActiveView('track-order')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Track Courier Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Standard Size Guide (Inches)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('return')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  7-Day Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy & Data Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white">
              Studio & Orders
            </h4>
            <div className="space-y-2 text-xs text-stone-400 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{config.contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${config.contact.phone}`} className="hover:text-white">
                  {config.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={buildWhatsAppLink("Salam HS Collection! I need assistance with an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium text-emerald-400"
                >
                  WhatsApp: {config.contact.whatsAppDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${config.contact.email}`} className="hover:text-white">
                  {config.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{config.contact.operatingHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Accepted Payment & Courier Badges in Pakistan */}
        <div className="py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 text-xs text-stone-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold w-full md:w-auto text-center md:text-left">
              Payment & Logistics in Pakistan:
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-[11px]">
              Cash on Delivery (COD)
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-[11px]">
              Meezan Bank / HBL
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-[11px]">
              TCS & Leopards Courier
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-[11px]">
              Trax Logistics
            </span>
          </div>

          <div className="flex items-center gap-2 text-stone-300 text-xs shrink-0">
            <span>🇵🇰</span>
            <span>Crafted with pride in Lahore, Pakistan</span>
          </div>
        </div>

        {/* Bottom copyright & admin toggle */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} HS Collection (SMC-PVT) Ltd. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-stone-300 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('shipping')}
              className="hover:text-stone-300 cursor-pointer"
            >
              Shipping Terms
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveView('admin')}
              className="hover:text-amber-400 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
