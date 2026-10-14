import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ShieldCheck, HelpCircle, X } from 'lucide-react';

export const DemoNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { setIsExpoGuideOpen, switchUserRole, currentUser } = useShop();

  if (dismissed) return null;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs px-4 py-1.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            College Expo Demo
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-slate-300">
            Simulated e-commerce prototype. Dummy data & zero real payments.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpoGuideOpen(true)}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Expo Evaluation Guide
          </button>

          <span className="text-slate-600">|</span>

          {currentUser.role !== 'admin' ? (
            <button
              onClick={() => switchUserRole('admin')}
              className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors"
            >
              Switch to Store Admin
            </button>
          ) : (
            <button
              onClick={() => switchUserRole('customer')}
              className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors"
            >
              Switch to Shopper
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors ml-1"
            title="Dismiss notice"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
