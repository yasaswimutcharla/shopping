import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, ShoppingCart, Trash2, Star, Check, Layers } from 'lucide-react';

export const ProductCompareModal: React.FC = () => {
  const {
    compareProductIds,
    toggleCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    products,
    addToCart,
    openProductDetail
  } = useShop();

  if (!isCompareModalOpen) return null;

  const comparedProducts = products.filter((p) => compareProductIds.includes(p.id));

  // Collect all unique specification keys
  const allSpecKeys = Array.from(
    new Set(
      comparedProducts.flatMap((p) => Object.keys(p.specifications || {}))
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-semibold text-base">Compare Products ({comparedProducts.length}/3)</h3>
              <p className="text-xs text-slate-300">Side-by-side feature and specification analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 text-sm mb-1">No products selected for comparison</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Click the compare icon on any product card in the store to compare features, specs, and prices side-by-side.
              </p>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(220px,1fr))] gap-4 min-w-[600px]">
                {/* Column headers: blank for specs label */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Product
                  </span>
                </div>

                {comparedProducts.map((prod) => (
                  <div key={prod.id} className="relative p-3 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between">
                    <button
                      onClick={() => toggleCompare(prod.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded bg-white shadow-xs"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <div
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          openProductDetail(prod.id);
                        }}
                        className="w-full h-32 rounded-lg overflow-hidden bg-white mb-2 cursor-pointer"
                      >
                        <ImageWithFallback
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">{prod.brand}</span>
                      <h4
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          openProductDetail(prod.id);
                        }}
                        className="font-semibold text-xs text-slate-900 line-clamp-2 hover:text-sky-600 cursor-pointer mb-1"
                      >
                        {prod.name}
                      </h4>
                      <div className="text-sm font-bold text-slate-900 font-mono-tabular">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="mt-3 w-full py-1.5 px-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="mt-6 border-t border-slate-200 pt-4 space-y-3 min-w-[600px]">
                {/* Rating row */}
                <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-2 border-b border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500">Rating</span>
                  {comparedProducts.map((prod) => (
                    <div key={prod.id} className="flex items-center gap-1 text-slate-800 font-medium">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-400 text-[11px]">({prod.reviewCount})</span>
                    </div>
                  ))}
                </div>

                {/* Stock row */}
                <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-2 border-b border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500">Stock</span>
                  {comparedProducts.map((prod) => (
                    <div key={prod.id} className="text-slate-800">
                      {prod.stock > 0 ? (
                        <span className="text-emerald-700 font-medium">In Stock ({prod.stock} units)</span>
                      ) : (
                        <span className="text-rose-600 font-medium">Out of Stock</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* All specification attributes */}
                {allSpecKeys.map((key) => (
                  <div
                    key={key}
                    className="grid grid-cols-[140px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-2 border-b border-slate-100 text-xs"
                  >
                    <span className="font-semibold text-slate-500">{key}</span>
                    {comparedProducts.map((prod) => (
                      <div key={prod.id} className="text-slate-700">
                        {prod.specifications[key] || '—'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
