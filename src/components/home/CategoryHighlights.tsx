import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Category } from '../../types';
import {
  Laptop,
  Shirt,
  Coffee,
  BookOpen,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Grid
} from 'lucide-react';

interface CategoryItem {
  name: Category;
  label: string;
  count: number;
  icon: React.ReactNode;
}

export const CategoryHighlights: React.FC = () => {
  const { setCurrentPage, updateFilter, products } = useShop();

  const categories: CategoryItem[] = [
    {
      name: 'Electronics',
      label: 'Electronics',
      count: products.filter((p) => p.category === 'Electronics').length,
      icon: <Laptop className="w-6 h-6 text-sky-600" />
    },
    {
      name: 'Fashion',
      label: 'Fashion & Apparel',
      count: products.filter((p) => p.category === 'Fashion').length,
      icon: <Shirt className="w-6 h-6 text-amber-600" />
    },
    {
      name: 'Home & Kitchen',
      label: 'Home & Kitchen',
      count: products.filter((p) => p.category === 'Home & Kitchen').length,
      icon: <Coffee className="w-6 h-6 text-emerald-600" />
    },
    {
      name: 'Books',
      label: 'Books & Guides',
      count: products.filter((p) => p.category === 'Books').length,
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />
    },
    {
      name: 'Beauty',
      label: 'Beauty & Wellness',
      count: products.filter((p) => p.category === 'Beauty').length,
      icon: <Sparkles className="w-6 h-6 text-rose-500" />
    },
    {
      name: 'Sports',
      label: 'Fitness & Sports',
      count: products.filter((p) => p.category === 'Sports').length,
      icon: <Dumbbell className="w-6 h-6 text-cyan-600" />
    },
    {
      name: 'Toys',
      label: 'STEM & Hobbies',
      count: products.filter((p) => p.category === 'Toys').length,
      icon: <Gamepad2 className="w-6 h-6 text-violet-600" />
    }
  ];

  const handleSelect = (category: Category) => {
    updateFilter('category', category);
    setCurrentPage('catalog');
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs text-slate-500">
            Browse our full catalogue of expo demonstration products
          </p>
        </div>
        <button
          onClick={() => {
            updateFilter('category', 'All');
            setCurrentPage('catalog');
          }}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
        >
          View All ({products.length})
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleSelect(cat.name)}
            className="flex flex-col items-center p-4 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
              {cat.label}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              {cat.count} Items
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
