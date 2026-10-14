import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';
import {
  Search,
  ShoppingCart,
  MapPin,
  Heart,
  User,
  Package,
  Layers,
  Sparkles,
  ChevronDown,
  X,
  Menu,
  ShieldAlert
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

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartItemCount,
    cartSubtotal,
    wishlist,
    compareProductIds,
    setIsCompareModalOpen,
    deliveryLocation,
    setIsLocationModalOpen,
    currentUser,
    setIsAuthModalOpen,
    switchUserRole,
    setIsExpoGuideOpen,
    executeSearch,
    filters
  } = useShop();

  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [selectedCat, setSelectedCat] = useState<Category>(filters.category);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery, selectedCat);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as Category;
    setSelectedCat(cat);
  };

  return (
    <header className="bg-slate-950 text-white sticky top-0 z-40 shadow-md">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3 md:gap-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 text-slate-300 hover:text-white rounded focus:outline-hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-left group shrink-0 focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-inner group-hover:bg-sky-500 transition-colors">
            <span className="font-extrabold text-lg tracking-tighter">S</span>
          </div>
          <div className="leading-none">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              Shop<span className="text-sky-400">Sphere</span>
            </span>
            <span className="block text-[9px] tracking-wider text-slate-400 font-semibold uppercase mt-0.5">
              Expo Edition
            </span>
          </div>
        </button>

        {/* Delivery Location Trigger */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:outline-1 hover:outline-slate-700 transition-all text-left shrink-0"
          title="Change delivery location"
        >
          <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-tight">
            <span className="text-slate-400 block text-[11px]">Deliver to</span>
            <span className="font-semibold text-slate-100 whitespace-nowrap">
              {deliveryLocation.city} {deliveryLocation.pinCode}
            </span>
          </div>
        </button>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 flex items-stretch h-10 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-sky-500"
        >
          <div className="relative hidden sm:block shrink-0 bg-slate-100 border-r border-slate-200">
            <select
              value={selectedCat}
              onChange={handleCategorySelect}
              className="appearance-none bg-transparent h-full px-3 pr-7 text-xs font-medium text-slate-700 focus:outline-hidden cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, electronics, fashion, appliances..."
              className="w-full h-full px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  executeSearch('', selectedCat);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 mr-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-4 bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Compare Button */}
          {compareProductIds.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-sky-400 hover:bg-slate-900 border border-sky-600/40"
              title="Compare selected products"
            >
              <Layers className="w-4 h-4" />
              <span>Compare</span>
              <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">
                {compareProductIds.length}
              </span>
            </button>
          )}

          {/* User Account / Role Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:outline-1 hover:outline-slate-700 transition-all text-left"
            >
              <User className="w-4 h-4 text-slate-300 shrink-0" />
              <div className="text-xs leading-tight hidden sm:block">
                <span className="text-slate-400 block text-[10px]">
                  Hello, {currentUser.name.split(' ')[0]}
                </span>
                <span className="font-semibold text-slate-100 flex items-center gap-1">
                  {currentUser.role === 'admin' ? 'Store Admin' : 'Account & Lists'}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 text-slate-800 text-xs animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      Role: {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentPage('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                      <Package className="w-3.5 h-3.5 text-slate-500" />
                      Your Orders & Tracking
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-slate-500" />
                      Your Wishlist ({wishlist.length})
                    </button>
                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => {
                          setCurrentPage('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-900 font-semibold transition-colors flex items-center gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        Admin Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          switchUserRole('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-800 font-semibold transition-colors flex items-center gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        Switch to Store Admin
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sky-600 hover:bg-slate-100 font-medium"
                    >
                      Sign In with different account
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            onClick={() => setCurrentPage('orders')}
            className="hidden md:block px-2.5 py-1.5 rounded-md hover:outline-1 hover:outline-slate-700 transition-all text-left text-xs"
          >
            <span className="text-slate-400 block text-[10px]">Returns</span>
            <span className="font-semibold text-slate-100">& Orders</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => setCurrentPage('wishlist')}
            className="relative p-2 rounded-md hover:outline-1 hover:outline-slate-700 text-slate-200 transition-all"
            title="View Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setCurrentPage('cart')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              currentPage === 'cart'
                ? 'bg-sky-600 text-white'
                : 'hover:outline-1 hover:outline-slate-700 text-white'
            }`}
            title="View Cart"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[11px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <span className="text-slate-400 block text-[10px]">Cart</span>
              <span className="font-bold text-amber-300 font-mono-tabular">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-2 text-sm text-slate-200 animate-in fade-in">
          <button
            onClick={() => {
              setIsLocationModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 py-1.5 text-xs text-sky-400"
          >
            <MapPin className="w-4 h-4" />
            <span>Deliver to {deliveryLocation.city} ({deliveryLocation.pinCode})</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => {
                setCurrentPage('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 bg-slate-800 rounded text-left font-medium"
            >
              All Categories
            </button>
            <button
              onClick={() => {
                setCurrentPage('orders');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 bg-slate-800 rounded text-left font-medium"
            >
              My Orders
            </button>
            <button
              onClick={() => {
                setCurrentPage('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 bg-slate-800 rounded text-left font-medium"
            >
              Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => {
                setIsExpoGuideOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 bg-sky-900/60 text-sky-300 rounded text-left font-medium"
            >
              Expo Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
