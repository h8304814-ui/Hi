import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { buildWhatsAppLink } from '../utils/formatters';

export const ValueProps: React.FC = () => {
  const { config, setActivePolicyModal } = useStore();

  const features = [
    {
      icon: Truck,
      title: 'Nationwide Cash on Delivery',
      titleUrdu: 'کیش آن ڈلیوری پورے پاکستان میں',
      desc: `Safe and convenient COD across 200+ cities in Pakistan. Pay in cash to courier rider upon delivery. Free shipping over Rs. ${config.shipping.freeShippingThreshold.toLocaleString('en-PK')}.`,
      action: 'View Shipping Policy',
      onClick: () => setActivePolicyModal('shipping'),
    },
    {
      icon: RotateCcw,
      title: '7-Day Hassle-Free Exchange',
      titleUrdu: '۷ دن میں باآسانی تبدیلی',
      desc: 'Not the right fit or color? Exchange easily within 7 days of receiving your parcel with our prepaid courier pickup.',
      action: 'Read Exchange Rules',
      onClick: () => setActivePolicyModal('return'),
    },
    {
      icon: ShieldCheck,
      title: '100% Original Fabrics',
      titleUrdu: 'سو فیصد خالص اور معیاری فیبرک',
      desc: 'Premium high-density lawns, pure raw silk, authentic Boski weaves, and intricate Kashmiri needlework guaranteed.',
      action: 'Fabric & Care Guide',
      onClick: () => setActivePolicyModal('size-guide'),
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Stylist Concierge',
      titleUrdu: 'واٹس ایپ پر فوری آرڈر و رہنمائی',
      desc: 'Speak directly with our Lahore design studio for size advice, bespoke stitching questions, or instant parcel tracking.',
      action: 'Chat on WhatsApp',
      href: buildWhatsAppLink('Salam! I need some sizing advice from your HS Collection stylist.'),
    },
  ];

  return (
    <section className="bg-[#FAF7F0] border-y border-[#EAE4D5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-4 sm:p-5 rounded-2xl bg-[#FDFBF7] border border-[#E8E1D2] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1A1A1A] text-[#C5A059] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#111111] leading-tight">
                  {item.title}
                </h3>
                <span className="text-[11px] font-serif text-[#C5A059] mt-0.5 tracking-wider">
                  {item.titleUrdu}
                </span>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 w-full">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C5A059] transition-colors inline-flex items-center gap-1"
                    >
                      <span>{item.action}</span>
                      <span>→</span>
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C5A059] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.action}</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
