import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { Award, ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, setCurrentPage, updateFilter } = useShop();

  const bestSellers = products
    .filter((p) => p.isBestSeller || p.rating >= 4.8)
    .slice(0, 4);

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Award className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Best Sellers in Store
            </h2>
            <p className="text-xs text-slate-500">
              Highest rated by students, faculty, and verified expo shoppers
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            updateFilter('sortBy', 'rating');
            setCurrentPage('catalog');
          }}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
        >
          <span>Explore all best sellers</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bestSellers.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
