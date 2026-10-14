import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { Category, Product } from '../../types';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  Star,
  Check,
  Search,
  RotateCcw,
  PackageOpen,
  ArrowUpDown
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Beauty',
  'Sports',
  'Toys'
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 1000000 },
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 - ₹20,000', min: 5000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: 1000000 }
];

export const ProductCatalog: React.FC = () => {
  const { products, filters, updateFilter, resetFilters } = useShop();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesCategory = prod.category.toLowerCase().includes(query);
        const matchesTags = prod.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = prod.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All' && prod.category !== filters.category) {
        return false;
      }

      // 3. Price Range
      if (prod.price < filters.minPrice || prod.price > filters.maxPrice) {
        return false;
      }

      // 4. Rating
      if (filters.minRating > 0 && prod.rating < filters.minRating) {
        return false;
      }

      // 5. Discount
      if (filters.minDiscount > 0 && prod.discountPercentage < filters.minDiscount) {
        return false;
      }

      // 6. In Stock
      if (filters.inStockOnly && prod.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, filters]);

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 100000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  // Price range preset check
  const activePricePreset = PRICE_RANGES.find(
    (r) => r.min === filters.minPrice && r.max === filters.maxPrice
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>Catalogue</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">
              {filters.category === 'All' ? 'All Products' : filters.category}
            </span>
            {filters.searchQuery && (
              <>
                <span>/</span>
                <span className="text-sky-600 font-medium">"{filters.searchQuery}"</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-900">{products.length}</strong> products
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFilterCount})</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-slate-500 whitespace-nowrap hidden sm:inline">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="appearance-none bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg px-3 py-2 pr-8 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount %</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded hover:bg-rose-50 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-6 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Refine Results</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Category
            </h4>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isSelected = filters.category === cat;
                const count =
                  cat === 'All'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isSelected
                        ? 'bg-sky-50 text-sky-900 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] text-slate-400 font-mono-tabular">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Price Range
            </h4>
            <div className="space-y-1.5 mb-3">
              {PRICE_RANGES.map((range) => {
                const isSelected =
                  filters.minPrice === range.min && filters.maxPrice === range.max;
                return (
                  <button
                    key={range.label}
                    onClick={() => {
                      updateFilter('minPrice', range.min);
                      updateFilter('maxPrice', range.max);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50 text-sky-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Price Inputs */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Min (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono-tabular"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Max (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={filters.maxPrice >= 1000000 ? '' : filters.maxPrice}
                  onChange={(e) =>
                    updateFilter('maxPrice', Number(e.target.value) || 1000000)
                  }
                  placeholder="100000"
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono-tabular"
                />
              </div>
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Customer Rating
            </h4>
            <div className="space-y-1">
              {[4, 3, 2].map((stars) => {
                const isSelected = filters.minRating === stars;
                return (
                  <button
                    key={stars}
                    onClick={() => updateFilter('minRating', isSelected ? 0 : stars)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isSelected
                        ? 'bg-sky-50 text-sky-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < stars
                              ? 'fill-amber-400 stroke-amber-500'
                              : 'stroke-slate-300 fill-slate-100'
                          }`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discount Percentage Filter */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Discount
            </h4>
            <div className="space-y-1">
              {[10, 20, 30, 40].map((disc) => {
                const isSelected = filters.minDiscount === disc;
                return (
                  <button
                    key={disc}
                    onClick={() => updateFilter('minDiscount', isSelected ? 0 : disc)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isSelected
                        ? 'bg-sky-50 text-sky-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{disc}% off or more</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability (In Stock) */}
          <div className="border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
              />
              <span>In Stock items only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (3 Columns on desktop) */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
              <PackageOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-900 mb-2">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                We couldn't find any items matching your active search criteria. Try removing filters or searching for terms like "headphones", "laptop", or "espresso".
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-sky-400" />
                <h3 className="font-semibold text-sm">Filter Products</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Category</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateFilter('category', cat)}
                      className={`p-2 rounded border text-left ${
                        filters.category === cat
                          ? 'bg-sky-600 text-white font-bold border-sky-600'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Price Range</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => {
                        updateFilter('minPrice', r.min);
                        updateFilter('maxPrice', r.max);
                      }}
                      className={`p-2 rounded border text-left ${
                        filters.minPrice === r.min && filters.maxPrice === r.max
                          ? 'bg-sky-600 text-white font-bold border-sky-600'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 w-4 h-4"
                  />
                  <span>Show only In Stock products</span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
