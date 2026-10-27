import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterState, ProductCategory } from '../types';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { formatPKR } from '../utils/formatters';

export const ShopView: React.FC = () => {
  const { products, filters, setFilters, resetFilters } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'All Designs', value: 'all' },
    { label: 'Ladies Suits', value: 'ladies-suits' },
    { label: 'Gents Suits', value: 'gents-suits' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'New Arrivals', value: 'new-arrivals' },
    { label: 'Best Sellers', value: 'best-sellers' },
    { label: 'Special Offers', value: 'special-offers' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unstitched'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filtering
        if (filters.category === 'new-arrivals' && !product.isNew) return false;
        if (filters.category === 'best-sellers' && !product.isBestSeller) return false;
        if (filters.category === 'special-offers' && !(product.isSpecialOffer || (product.discountPercent && product.discountPercent > 0))) return false;
        if (filters.category !== 'all' && !['new-arrivals', 'best-sellers', 'special-offers'].includes(filters.category)) {
          if (product.category !== filters.category) return false;
        }

        // Subcategory
        if (filters.subcategory && product.subcategory !== filters.subcategory) return false;

        // Price
        if (product.price < filters.minPrice) return false;
        if (filters.maxPrice > 0 && product.price > filters.maxPrice) return false;

        // Size
        if (filters.size && !product.sizes.includes(filters.size)) return false;

        // In-stock
        if (filters.inStockOnly && !product.inStock) return false;

        // Search query
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchUrdu = product.nameUrdu?.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchFabric = product.fabricDetails.toLowerCase().includes(query);
          const matchTags = product.tags?.some((t) => t.toLowerCase().includes(query));
          if (!matchName && !matchUrdu && !matchDesc && !matchFabric && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, filters]);

  // Extract unique subcategories based on current category
  const availableSubcategories = useMemo(() => {
    const relevant =
      filters.category === 'all'
        ? products
        : products.filter((p) => p.category === filters.category);
    return Array.from(new Set(relevant.map((p) => p.subcategory)));
  }, [products, filters.category]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Banner / Heading */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE4D7] pb-6">
        <div>
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A68038] font-bold">
            The Complete Collection
          </span>
          <h1 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] mt-1">
            {categories.find((c) => c.value === filters.category)?.label || 'Shop Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">
            Showing {filteredProducts.length} handcrafted designs available for nationwide delivery.
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-2.5 sm:px-3 py-1.5 shadow-2xs max-w-full">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="text-xs font-medium bg-transparent focus:outline-none cursor-pointer text-stone-800"
            >
              <option value="featured">Featured / Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                category: cat.value,
                subcategory: '',
              }))
            }
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.category === cat.value
                ? 'bg-[#111111] text-[#FDFBF7] shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active Search Badge */}
      {filters.searchQuery && (
        <div className="mb-6 flex items-center gap-2 bg-[#FAF5E8] border border-[#E9DCBE] px-4 py-2.5 rounded-xl text-xs text-stone-800">
          <Search className="w-4 h-4 text-[#C5A059]" />
          <span>
            Search results for: <strong>"{filters.searchQuery}"</strong>
          </span>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
            className="ml-auto text-stone-500 hover:text-black p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Layout: Left Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-[#FAF7F0] p-6 rounded-2xl border border-[#E8E1D0] h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <span>Filter Catalog</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-medium text-stone-500 hover:text-black flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Subcategories */}
          {availableSubcategories.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Subcategory
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, subcategory: '' }))}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                    filters.subcategory === ''
                      ? 'bg-black text-white font-medium'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All Types
                </button>
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        subcategory: prev.subcategory === sub ? '' : sub,
                      }))
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                      filters.subcategory === sub
                        ? 'bg-black text-white font-medium'
                        : 'text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-stone-800">
              <span>Max Price</span>
              <span className="font-mono text-black font-semibold">
                {filters.maxPrice >= 20000 ? 'Any' : formatPKR(filters.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>Rs. 2,000</span>
              <span>Rs. 20,000+</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      size: prev.size === s ? '' : s,
                    }))
                  }
                  className={`px-2.5 py-1 text-xs rounded border transition-all ${
                    filters.size === s
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* In-Stock Only Toggle */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <label className="text-xs font-medium text-stone-800 cursor-pointer">
              In Stock Only
            </label>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
              }
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Grid Area (3 cols on desktop) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#FAF7F0] rounded-2xl border border-[#E8E1D0] p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                No designs found matching your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Try widening your price range, clearing filters, or search for terms like "Lawn", "Chiffon", "Boski", or "Shawl".
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-[85%] max-w-xs sm:max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 p-4 sm:p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-black">Filter Designs</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-stone-600 hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Max Price slider */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-stone-800">
                Max Price: {formatPKR(filters.maxPrice)}
              </label>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-stone-800">Size</label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, size: prev.size === s ? '' : s }))
                    }
                    className={`px-3 py-1 text-xs rounded border cursor-pointer ${
                      filters.size === s ? 'bg-black text-white border-black' : 'bg-white border-stone-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* In stock */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-800">In Stock Only</span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                }
                className="w-4 h-4 accent-black cursor-pointer"
              />
            </div>

            <div className="pt-6 border-t border-stone-200 flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 cursor-pointer min-h-[44px]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer min-h-[44px]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
