import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../products/ProductCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Heart, ShoppingBag, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    moveToCartFromWishlist,
    toggleWishlist,
    setCurrentPage,
    openProductDetail
  } = useShop();

  const savedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (savedProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs my-8 animate-in fade-in">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Save favorite gadgets, fashion pieces, and home appliances to your wishlist by clicking the heart icon on any product.
        </p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Your Saved Wishlist
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Products saved for later consideration or quick purchase
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('catalog')}
          className="text-xs font-semibold text-sky-600 hover:underline"
        >
          Add more items
        </button>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between group transition-all"
          >
            <div>
              <div
                onClick={() => openProductDetail(prod.id)}
                className="w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-3 cursor-pointer"
              >
                <ImageWithFallback
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1 uppercase">
                <span>{prod.brand}</span>
                <span>{prod.category}</span>
              </div>

              <h3
                onClick={() => openProductDetail(prod.id)}
                className="font-semibold text-xs text-slate-900 line-clamp-2 hover:text-sky-600 cursor-pointer transition-colors mb-2"
              >
                {prod.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-base font-bold text-slate-900 font-mono-tabular">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
                {prod.originalPrice > prod.price && (
                  <span className="text-xs text-slate-400 line-through font-mono-tabular">
                    ₹{prod.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => moveToCartFromWishlist(prod.id)}
                disabled={prod.stock <= 0}
                className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(prod.id)}
                className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
