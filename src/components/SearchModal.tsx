import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ChevronRight, Tag } from 'lucide-react';
import { formatPKR } from '../utils/formatters';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    viewProductDetail,
    setFilters,
    setActiveView,
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Cmd+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isSearchOpen && (e.target as HTMLElement).tagName !== 'INPUT')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabricDetails.toLowerCase().includes(q) ||
          p.nameUrdu?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    viewProductDetail(product);
  };

  const handleQuickTag = (tag: string) => {
    setQuery(tag);
  };

  const handleViewAllResults = () => {
    setFilters((prev) => ({ ...prev, searchQuery: query, category: 'all' }));
    setIsSearchOpen(false);
    setActiveView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 lg:p-10 pt-12 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col border border-stone-300">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-5 border-b border-stone-200 flex items-center gap-2.5 sm:gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Pakistani suits, Boski kurta, Chiffon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base bg-transparent focus:outline-none placeholder:text-stone-400 font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded border border-stone-200">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs text-stone-600 scrollbar-none">
          <span className="text-[11px] font-semibold uppercase text-stone-400 tracking-wider flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3" /> Popular:
          </span>
          {['Lawn', 'Chiffon', 'Boski', 'Waistcoat', 'Pashmina', 'Khussa', 'Anarkali'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-stone-200 hover:border-black text-[11px] font-medium transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-stone-500">
              Type keywords above to search all luxury pret, menswear, and accessories.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-serif font-semibold text-stone-800">
                No designs found matching "{query}"
              </p>
              <p className="text-xs text-stone-500">
                Try searching for lawn, chiffon, kurta, raw silk, or shawl.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-stone-100 cursor-pointer transition-colors border border-transparent hover:border-stone-200"
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-12 h-14 object-cover object-top rounded-lg bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-sm text-stone-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {product.subcategory} • {product.fabricDetails}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-sm text-stone-900">
                      {formatPKR(product.price)}
                    </span>
                    {product.discountPercent && (
                      <span className="block text-[10px] text-rose-600 font-bold">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              ))}

              {results.length > 6 && (
                <button
                  onClick={handleViewAllResults}
                  className="w-full py-2.5 mt-2 text-center text-xs font-bold uppercase tracking-wider text-black bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
                >
                  View All {results.length} Results in Shop →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
