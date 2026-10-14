import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ShoppingBag,
  Sparkles,
  Heart,
  CheckCircle2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartItemCount,
    cartDiscountSavings,
    deliveryFee,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    finalCartTotal,
    setCurrentPage,
    openProductDetail,
    toggleWishlist,
    showToast
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-2xl mx-auto shadow-xs my-8 animate-in fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Your ShopSphere Cart is Empty
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
          Your shopping cart is waiting to be filled with top deals, electronics, books, and fashion essentials for this expo demonstration.
        </p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your selected expo demo items before proceeding to multi-step simulated checkout
          </p>
        </div>

        <button
          onClick={() => setShowClearConfirm(true)}
          className="text-xs text-rose-600 hover:text-rose-700 hover:underline font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free shipping progress bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs text-xs">
        {amountNeededForFreeShipping > 0 ? (
          <div className="space-y-2">
            <p className="text-slate-700">
              Add <strong className="text-sky-600 font-mono-tabular">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to your cart to qualify for <strong>FREE Delivery</strong>!
            </p>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-sky-600 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Congratulations! Your simulated order qualifies for FREE Delivery.</span>
          </div>
        )}
      </div>

      {/* 2-Column Grid: Cart Items (left) + Summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                {/* Product thumbnail */}
                <div
                  onClick={() => openProductDetail(product.id)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 cursor-pointer"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details & Controls */}
                <div className="flex-1 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {product.brand} · {product.category}
                        </span>
                        <h3
                          onClick={() => openProductDetail(product.id)}
                          className="font-bold text-sm text-slate-900 hover:text-sky-600 cursor-pointer transition-colors line-clamp-2 mt-0.5"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base font-bold text-slate-900 font-mono-tabular">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </div>
                        {quantity > 1 && (
                          <div className="text-[11px] text-slate-400 font-mono-tabular">
                            ₹{product.price.toLocaleString('en-IN')} each
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      In Stock ({product.stock} available)
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100 text-xs">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 py-1 text-xs font-bold text-slate-900 font-mono-tabular">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          toggleWishlist(product.id);
                          removeFromCart(product.id);
                        }}
                        className="text-slate-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Move to Wishlist</span>
                      </button>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-2">
            <button
              onClick={() => setCurrentPage('catalog')}
              className="text-xs text-sky-600 hover:underline font-semibold"
            >
              &larr; Continue Shopping
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupons */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <h2 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal ({cartItemCount})</span>
                <span className="font-mono-tabular font-medium text-slate-900">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartDiscountSavings > 0 && (
                <div className="flex justify-between text-rose-600 font-medium">
                  <span>Catalogue Savings</span>
                  <span className="font-mono-tabular">
                    -₹{cartDiscountSavings.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo ({appliedCoupon.code})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tabular">
                      -₹{Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={removeCouponCode}
                      className="text-rose-600 hover:text-rose-800 text-[10px]"
                      title="Remove promo"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery</span>
                <span className="font-mono-tabular font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-sm text-slate-900">Total Amount</span>
                <span className="text-2xl font-black text-slate-900 font-mono-tabular">
                  ₹{finalCartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                setCurrentPage('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Promo Code Input */}
            <div className="pt-3 border-t border-slate-100">
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. EXPO2026"
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg uppercase tracking-wider font-mono focus:outline-hidden focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
              </form>

              {/* Sample Coupons Tip */}
              <div className="mt-3 p-2.5 bg-sky-50/70 border border-sky-100 rounded-lg text-[11px] text-sky-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-600" />
                  Available Expo Coupons:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => applyCouponCode('EXPO2026')}
                    className="font-mono bg-white border border-sky-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-sky-800 hover:bg-sky-100"
                  >
                    EXPO2026 (10% off)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCouponCode('SHOPSPHERE')}
                    className="font-mono bg-white border border-sky-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-sky-800 hover:bg-sky-100"
                  >
                    SHOPSPHERE (15% off)
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Simulated Safe Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Clear your shopping cart?
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove all {cartItemCount} items from your cart? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                Keep Items
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
