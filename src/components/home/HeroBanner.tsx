import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

import heroTechImg from '../../assets/images/hero_banner_tech_1791990750273.jpg';
import catElectronicsImg from '../../assets/images/category_electronics_1791990751074.jpg';
import catFashionImg from '../../assets/images/category_fashion_1791990751429.jpg';
import catHomeKitchenImg from '../../assets/images/category_home_kitchen_1791990754810.jpg';

export const HeroBanner: React.FC = () => {
  const { setCurrentPage, updateFilter, executeSearch } = useShop();

  return (
    <div className="space-y-6">
      {/* Primary Hero Split Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px]">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Great Expo Festival Deals</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 text-balance">
                Next-Gen Shopping, Built for the Expo.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-lg leading-relaxed">
                Discover curated smartphones, ultrabooks, designer fashion, and home barista appliances with simulated one-click checkout and real-time order tracking.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    updateFilter('minDiscount', 30);
                    setCurrentPage('catalog');
                  }}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-950/50 flex items-center gap-2 transition-all hover:translate-y-[-1px]"
                >
                  <span>Explore Today's Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    updateFilter('category', 'Electronics');
                    setCurrentPage('catalog');
                  }}
                  className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  Browse Electronics
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Free Shipping &gt; ₹999</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>7-Day Replacements</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Demo Verified Order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full">
            <ImageWithFallback
              src={heroTechImg}
              alt="ShopSphere Expo Workspace Setup"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-transparent lg:to-transparent" />
            
            {/* Floating Hero Card */}
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl max-w-xs text-xs text-white shadow-xl hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Expo Spotlight
              </span>
              <p className="font-semibold text-sm line-clamp-1 mt-0.5">
                Zenith UltraBook Pro 15.6"
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono-tabular font-bold text-sky-400">₹84,990</span>
                <span className="text-[11px] text-emerald-400 font-semibold">15% Discount</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Featured Category Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Electronics Card */}
        <div
          onClick={() => {
            updateFilter('category', 'Electronics');
            setCurrentPage('catalog');
          }}
          className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Up to 50% Off</span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-0.5">
              Electronics & Audio
            </h3>
            <p className="text-xs text-slate-500 mt-1">Laptops, ANC headphones, smartwatches</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 mt-3 group-hover:translate-x-1 transition-transform">
              Shop Electronics &rarr;
            </span>
          </div>
          <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 ml-3">
            <ImageWithFallback
              src={catElectronicsImg}
              alt="Electronics"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Fashion Card */}
        <div
          onClick={() => {
            updateFilter('category', 'Fashion');
            setCurrentPage('catalog');
          }}
          className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Trending Style</span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-0.5">
              Modern Fashion
            </h3>
            <p className="text-xs text-slate-500 mt-1">Overshirts, sneakers, waxed backpacks</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 mt-3 group-hover:translate-x-1 transition-transform">
              Browse Wardrobe &rarr;
            </span>
          </div>
          <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 ml-3">
            <ImageWithFallback
              src={catFashionImg}
              alt="Fashion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Home & Kitchen Card */}
        <div
          onClick={() => {
            updateFilter('category', 'Home & Kitchen');
            setCurrentPage('catalog');
          }}
          className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Premium Living</span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mt-0.5">
              Home & Kitchen
            </h3>
            <p className="text-xs text-slate-500 mt-1">Barista espresso, air fryers, cast iron</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 mt-3 group-hover:translate-x-1 transition-transform">
              Explore Kitchen &rarr;
            </span>
          </div>
          <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 ml-3">
            <ImageWithFallback
              src={catHomeKitchenImg}
              alt="Home and Kitchen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
