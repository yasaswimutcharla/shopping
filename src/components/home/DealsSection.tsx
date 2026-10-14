import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { Flame, ArrowRight, Clock } from 'lucide-react';

export const DealsSection: React.FC = () => {
  const { products, setCurrentPage, updateFilter } = useShop();

  const deals = products
    .filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35)
    .slice(0, 4);

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Today's Featured Deals
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                Up to 50% Off
              </span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulated flash deals refresh every 24 hours</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            updateFilter('minDiscount', 30);
            setCurrentPage('catalog');
          }}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
        >
          <span>See all deals</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
