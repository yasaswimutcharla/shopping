import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';
import {
  Menu,
  Flame,
  Award,
  Layers,
  HelpCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

const CATEGORY_ITEMS: { name: string; cat: Category }[] = [
  { name: 'Electronics', cat: 'Electronics' },
  { name: 'Fashion', cat: 'Fashion' },
  { name: 'Home & Kitchen', cat: 'Home & Kitchen' },
  { name: 'Books', cat: 'Books' },
  { name: 'Beauty', cat: 'Beauty' },
  { name: 'Sports', cat: 'Sports' },
  { name: 'Toys', cat: 'Toys' }
];

export const SubNav: React.FC = () => {
  const {
    setCurrentPage,
    executeSearch,
    filters,
    updateFilter,
    compareProductIds,
    setIsCompareModalOpen,
    currentUser,
    switchUserRole
  } = useShop();

  const handleCategoryClick = (cat: Category) => {
    executeSearch('', cat);
  };

  return (
    <nav className="bg-slate-900 border-t border-slate-800 text-slate-200 text-xs px-4 py-1.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {/* Left Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              updateFilter('category', 'All');
              setCurrentPage('catalog');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-slate-800 text-slate-100 font-semibold transition-colors shrink-0"
          >
            <Menu className="w-4 h-4 text-sky-400" />
            <span>All Categories</span>
          </button>

          {CATEGORY_ITEMS.map((item) => {
            const isActive = filters.category === item.cat;
            return (
              <button
                key={item.name}
                onClick={() => handleCategoryClick(item.cat)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white font-medium'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Right Specials & Shortcuts */}
        <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-800">
          <button
            onClick={() => {
              updateFilter('minDiscount', 30);
              setCurrentPage('catalog');
            }}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-amber-300 font-medium whitespace-nowrap transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Deals</span>
          </button>

          <button
            onClick={() => {
              updateFilter('sortBy', 'rating');
              setCurrentPage('catalog');
            }}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white font-medium whitespace-nowrap transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>Best Sellers</span>
          </button>

          {compareProductIds.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800 font-medium whitespace-nowrap transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare ({compareProductIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setCurrentPage('support')}
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Support & FAQ</span>
          </button>

          {currentUser.role === 'admin' ? (
            <button
              onClick={() => setCurrentPage('admin')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium transition-colors whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          ) : (
            <button
              onClick={() => switchUserRole('admin')}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded text-slate-400 hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Demo</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
