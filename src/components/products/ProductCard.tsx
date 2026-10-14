import React from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Star, ShoppingCart, Heart, Layers, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const {
    openProductDetail,
    addToCart,
    wishlist,
    toggleWishlist,
    compareProductIds,
    toggleCompare
  } = useShop();

  const isSavedInWishlist = wishlist.includes(product.id);
  const isCompared = compareProductIds.includes(product.id);
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden h-full">
      {/* Top action floating buttons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isSavedInWishlist
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white border border-slate-200'
          }`}
          title={isSavedInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isSavedInWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`}
          />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isCompared
              ? 'bg-sky-50 text-sky-600 border border-sky-300'
              : 'bg-white/90 text-slate-500 hover:text-sky-600 hover:bg-white border border-slate-200'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Compare product'}
          aria-label="Toggle Compare"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => openProductDetail(product.id)}
        className="relative bg-slate-50 pt-[80%] overflow-hidden cursor-pointer"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          fallbackText={product.name}
          categoryHint={product.category}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Subtle Discount / Deal Tag */}
        {product.discountPercentage > 0 && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-rose-600 text-white font-bold text-[11px] rounded shadow-xs">
            {product.discountPercentage}% OFF
          </div>
        )}

        {product.isBestSeller && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wide uppercase rounded shadow-xs">
            Best Seller
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-sky-600 cursor-pointer transition-colors mb-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
              <span className="font-bold ml-1 text-slate-800">{product.rating}</span>
            </div>
            <span className="text-slate-300 text-xs">·</span>
            <span className="text-xs text-slate-500">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-slate-900 font-mono-tabular">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-mono-tabular">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stock Availability indicator */}
          <div className="text-xs mb-3">
            {isOutOfStock ? (
              <span className="text-rose-600 font-medium">Currently Out of Stock</span>
            ) : product.stock <= 10 ? (
              <span className="text-amber-700 font-medium text-[11px]">
                Only {product.stock} units left in stock!
              </span>
            ) : (
              <span className="text-emerald-700 text-[11px] flex items-center gap-1 font-medium">
                <Check className="w-3 h-3 text-emerald-600" />
                In Stock · Ready to Dispatch
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
