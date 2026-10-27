import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setActiveView } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8 border-b border-[#EAE4D7] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-black mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
            <h1 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl font-normal text-stone-900">
              My Saved Wishlist
            </h1>
          </div>
          <p className="text-xs text-stone-500 font-light mt-1">
            {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved for later.
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 sm:py-20 text-center bg-[#FAF7F0] rounded-2xl border border-[#E8E1D0] p-6 sm:p-8 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-800">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Click the heart icon on any ladies suit, gent's kurta, or fashion accessory to save it here for later.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
          {savedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
