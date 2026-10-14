import React from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Sparkles,
  X,
  Search,
  ShoppingCart,
  CreditCard,
  Truck,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const ExpoGuideModal: React.FC = () => {
  const {
    isExpoGuideOpen,
    setIsExpoGuideOpen,
    setCurrentPage,
    switchUserRole,
    resetToInitialData
  } = useShop();

  if (!isExpoGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-semibold text-base leading-tight">
                College Expo Demonstration Guide
              </h3>
              <p className="text-xs text-slate-300">
                Interactive Walkthrough for Faculty & Visitors
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpoGuideOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg text-sm text-sky-900">
            <p className="font-semibold mb-1">
              Welcome to ShopSphere — Amazon-Style Online Shopping Website!
            </p>
            <p className="text-xs text-sky-800 leading-relaxed">
              This application has been engineered as a student capstone project. All data, orders, ratings, and payments are entirely simulated with persistent LocalStorage state. You can test all shopper and administrator workflows seamlessly.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Key Features to Demonstrate to Judges
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <Search className="w-4 h-4 text-sky-600" />
                  1. Discovery & Search
                </div>
                <p className="text-xs text-slate-600">
                  Try searching "laptop", "espresso", or "cotton". Filter by category, price ranges, rating 4★+, discounts, or stock status.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <ShoppingCart className="w-4 h-4 text-sky-600" />
                  2. Cart & Promo Codes
                </div>
                <p className="text-xs text-slate-600">
                  Add items to cart. Increase/decrease quantities with live stock limits. Apply promo coupon <span className="font-mono font-bold text-sky-700">EXPO2026</span> for 10% instant discount.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <CreditCard className="w-4 h-4 text-sky-600" />
                  3. Multi-Step Simulated Checkout
                </div>
                <p className="text-xs text-slate-600">
                  Address verification, standard vs express delivery selection, simulated UPI / Card / COD payment, and order confirmation.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <Truck className="w-4 h-4 text-sky-600" />
                  4. Live Order Tracking & Receipts
                </div>
                <p className="text-xs text-slate-600">
                  Visit the "Orders" page to view order timeline tracking from Ordered to Delivered, plus printable tax invoice summaries.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                  5. Store Admin Dashboard
                </div>
                <p className="text-xs text-slate-600">
                  Switch to Admin role to add/edit products and change order statuses in real time. Changes reflect immediately in the storefront!
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  6. Product Comparison
                </div>
                <p className="text-xs text-slate-600">
                  Select up to 3 products to compare specs, prices, and ratings side-by-side on any device.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                resetToInitialData();
                setIsExpoGuideOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo to Initial State
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  switchUserRole('admin');
                  setIsExpoGuideOpen(false);
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
              >
                Open Admin Dashboard
              </button>

              <button
                onClick={() => {
                  setCurrentPage('catalog');
                  setIsExpoGuideOpen(false);
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
              >
                Browse Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
