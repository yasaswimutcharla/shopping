import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUp, Globe, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, updateFilter, resetToInitialData, setIsExpoGuideOpen } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs mt-16 border-t border-slate-800">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b border-slate-800"
      >
        <ArrowUp className="w-4 h-4" />
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold text-sm mb-3.5 tracking-tight">
            Get to Know Us
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => setCurrentPage('support')}
                className="hover:text-white transition-colors"
              >
                About ShopSphere Expo
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsExpoGuideOpen(true)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                Demonstration Guide
              </button>
            </li>
            <li>
              <span className="text-slate-500">Student Project Team</span>
            </li>
            <li>
              <span className="text-slate-500">Department of Computer Science</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3.5 tracking-tight">
            Connect with Us
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => setCurrentPage('support')}
                className="hover:text-white transition-colors"
              >
                College Expo Booth #42
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('support')}
                className="hover:text-white transition-colors"
              >
                Submit Demo Feedback
              </button>
            </li>
            <li>
              <span className="text-slate-500">Technical Architecture Overview</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3.5 tracking-tight">
            Demonstration Features
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => {
                  updateFilter('category', 'Electronics');
                  setCurrentPage('catalog');
                }}
                className="hover:text-white transition-colors"
              >
                Electronics & Computing
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  updateFilter('minDiscount', 30);
                  setCurrentPage('catalog');
                }}
                className="hover:text-white transition-colors"
              >
                Discount Deals & Promos
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('orders')}
                className="hover:text-white transition-colors"
              >
                Live Order Tracking Timeline
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('admin')}
                className="hover:text-amber-400 transition-colors"
              >
                Admin Inventory Management
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3.5 tracking-tight">
            Let Us Help You
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => setCurrentPage('profile')}
                className="hover:text-white transition-colors"
              >
                Your Account & Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('orders')}
                className="hover:text-white transition-colors"
              >
                Returns & Cancellations
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('support')}
                className="hover:text-white transition-colors"
              >
                Simulated Delivery & Rates
              </button>
            </li>
            <li>
              <button
                onClick={resetToInitialData}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                Reset Demo Data
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Middle Brand & Language Bar */}
      <div className="border-t border-slate-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-bold text-white text-sm">ShopSphere</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-800 bg-slate-900">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>English (India)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-800 bg-slate-900 font-mono-tabular">
            <span>₹ INR - Indian Rupee</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-800 bg-slate-900 text-sky-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Simulated Environment</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal & College Expo Disclaimer */}
      <div className="bg-slate-950/80 border-t border-slate-900/60 py-6 px-4 text-center text-[11px] text-slate-500 space-y-1.5">
        <div className="flex flex-wrap justify-center gap-4 text-slate-400">
          <button onClick={() => setCurrentPage('support')} className="hover:underline">Conditions of Use</button>
          <button onClick={() => setCurrentPage('support')} className="hover:underline">Privacy Notice</button>
          <button onClick={() => setCurrentPage('support')} className="hover:underline">College Expo Demonstration Terms</button>
          <button onClick={() => setCurrentPage('support')} className="hover:underline">Interest-Based Ads Notice</button>
        </div>
        <p>
          © 2026 ShopSphere. Built for College Technical Expo Demonstration.
        </p>
        <p className="text-slate-600 max-w-2xl mx-auto">
          All displayed logos, brands, and simulated products are used strictly for educational presentation purposes. No actual financial transactions or deliveries occur.
        </p>
      </div>
    </footer>
  );
};
