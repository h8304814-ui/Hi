import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Phone,
  MessageCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { ProductCategory } from '../types';
import { buildWhatsAppLink, formatPKR } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    openShopCategory,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    config,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; category: ProductCategory | 'all'; badge?: string; badgeColor?: string }[] = [
    { label: 'Ladies Suits', category: 'ladies-suits', badge: 'Pret & Lawn' },
    { label: 'Gents Suits', category: 'gents-suits', badge: 'Boski' },
    { label: 'Accessories', category: 'accessories' },
    { label: 'New Arrivals', category: 'new-arrivals', badge: 'New', badgeColor: 'bg-[#C5A059]' },
    { label: 'Best Sellers', category: 'best-sellers' },
    { label: 'Special Offers', category: 'special-offers', badge: 'Sale', badgeColor: 'bg-rose-600' },
  ];

  const handleNavClick = (category: ProductCategory | 'all') => {
    openShopCategory(category);
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setActiveView('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE5D9] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-3 md:gap-4">
          
          {/* Mobile menu button & search */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-stone-800 hover:text-black focus:outline-none touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-800 hover:text-black focus:outline-none touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start min-w-0 px-1">
            <button
              onClick={handleHomeClick}
              className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#1A1A1A] flex items-center justify-center bg-[#1A1A1A] text-[#FDFBF7] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <span className="font-serif font-bold text-sm sm:text-lg tracking-wider text-[#C5A059]">HS</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-wider sm:tracking-widest text-[#111111] uppercase leading-none truncate">
                  HS Collection
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.2em] sm:tracking-[0.25em] text-stone-500 uppercase mt-0.5 truncate hidden min-[360px]:block">
                  Couture & Prêt • Pakistan
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            <button
              onClick={handleHomeClick}
              className={`px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'text-black border-b-2 border-black'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Home
            </button>

            {navLinks.map((item) => (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className="relative px-3 py-2 text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-black transition-colors group cursor-pointer"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 text-[9px] font-bold text-white rounded-full ${
                      item.badgeColor || 'bg-stone-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 shrink-0">
            
            {/* Desktop Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 bg-[#F4EFE6] hover:bg-[#EAE4D7] rounded-full border border-[#DED7C8] transition-all cursor-pointer"
              title="Search products (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-600" />
              <span className="pr-4">Search Lawn, Kurta, Shawls...</span>
              <kbd className="text-[10px] bg-white text-stone-400 px-1.5 py-0.5 rounded border border-stone-200">
                /
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveView('wishlist')}
              className={`relative p-2 rounded-full transition-colors touch-manipulation cursor-pointer ${
                activeView === 'wishlist'
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-stone-700 hover:text-black hover:bg-[#F2ECE1]'
              }`}
              title="Saved Wishlist"
              aria-label="View saved wishlist"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full bg-[#111111] text-[#FDFBF7] hover:bg-black transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">Bag</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A059] text-black text-[10px] sm:text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
              {cartCount > 0 && (
                <span className="text-xs font-medium text-stone-300 hidden md:inline ml-1 border-l border-stone-700 pl-2">
                  {formatPKR(cartSubtotal)}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
              className={`hidden md:flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'text-stone-500 border-stone-300 hover:text-stone-900 hover:border-stone-400'
              }`}
              title="Store Owner Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-[85%] max-w-xs sm:max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#EAE5D9] flex items-center justify-between bg-stone-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-[#C5A059] flex items-center justify-center font-serif font-bold text-sm">
                  HS
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-black">HS Collection</h3>
                  <p className="text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-widest">
                    Pakistani Designer Wear
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-600 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="p-4 space-y-1 flex-1">
              <button
                onClick={handleHomeClick}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-stone-100"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Categories
              </div>

              {navLinks.map((item) => (
                <button
                  key={item.category}
                  onClick={() => handleNavClick(item.category)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold text-white rounded-full ${
                          item.badgeColor || 'bg-stone-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}

              <div className="pt-4 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Quick Tools
              </div>

              <button
                onClick={() => {
                  setActiveView('track-order');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium text-stone-800 hover:bg-stone-100"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-600" />
                  Track My Order (Pakistan)
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => {
                  setActiveView('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium text-amber-900 bg-amber-50/70 hover:bg-amber-100"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Admin Dashboard
                </span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            {/* Mobile Footer with Direct WhatsApp */}
            <div className="p-4 bg-stone-100 border-t border-[#EAE5D9] space-y-3">
              <a
                href={buildWhatsAppLink("Salam! I want to inquire about Pakistani suits at HS Collection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp ({config.contact.whatsAppDisplay})</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Helpline: {config.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
