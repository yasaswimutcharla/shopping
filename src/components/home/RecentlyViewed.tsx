import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { History, Eye } from 'lucide-react';

export const RecentlyViewed: React.FC = () => {
  const { products, recentlyViewedIds } = useShop();

  const viewedProducts = recentlyViewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (viewedProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
          <History className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recently Viewed by You
          </h2>
          <p className="text-xs text-slate-500">
            Jump back into items you inspected during this demo session
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {viewedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
