import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Layers,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  Clock,
  MapPin,
  Plus,
  Minus,
  MessageSquare,
  ThumbsUp,
  Share2,
  ArrowLeft
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    selectedProductId,
    products,
    setCurrentPage,
    addToCart,
    wishlist,
    toggleWishlist,
    compareProductIds,
    toggleCompare,
    deliveryLocation,
    setIsLocationModalOpen,
    addProductReview,
    currentUser,
    showToast
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-600 mb-4">Product not found.</p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const isSavedInWishlist = wishlist.includes(product.id);
  const isCompared = compareProductIds.includes(product.id);
  const isOutOfStock = product.stock <= 0;

  // Similar / Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const added = addToCart(product, quantity);
    if (added) {
      setCurrentPage('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast('Please provide both a headline and a comment for your review.', 'warning');
      return;
    }

    addProductReview(product.id, {
      userName: currentUser.name || 'Verified Expo Visitor',
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewTitle('');
    setReviewComment('');
    setIsReviewModalOpen(false);
  };

  // Thumbnail list
  const galleryImages = [product.image, ...(product.additionalImages || [])];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-white rounded-lg px-4 py-2.5 border border-slate-200/80">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <button
            onClick={() => setCurrentPage('catalog')}
            className="hover:text-sky-600 transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </button>
          <span>/</span>
          <span className="text-slate-600 font-medium">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast('Product link copied to clipboard!', 'info');
          }}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors ml-2"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Main 2-Column Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        {/* Left Column: Gallery & Image Viewport (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
            <ImageWithFallback
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-600 text-white font-bold text-xs rounded-md shadow-xs">
                {product.discountPercentage}% OFF
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xs">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail row if multiple */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-sky-600 ring-2 ring-sky-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-600">
            <div className="p-2 rounded-lg bg-slate-50 flex flex-col items-center">
              <Truck className="w-4 h-4 text-sky-600 mb-1" />
              <span className="font-semibold">Free Delivery</span>
              <span className="text-[10px] text-slate-400">On orders &gt; ₹999</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 flex flex-col items-center">
              <RefreshCw className="w-4 h-4 text-sky-600 mb-1" />
              <span className="font-semibold">7-Day Return</span>
              <span className="text-[10px] text-slate-400">Hassle-free demo</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-sky-600 mb-1" />
              <span className="font-semibold">1-Year Warranty</span>
              <span className="text-[10px] text-slate-400">Brand supported</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Price, Buy Actions, & Specs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Brand & Category */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1.5">
              <span>{product.brand}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{product.category}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating Stars & Reviews link */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                <span className="font-bold text-slate-900">{product.rating}</span>
              </div>
              <span className="text-slate-300">·</span>
              <a href="#reviews-section" className="text-xs text-sky-600 hover:underline font-medium">
                {product.reviewCount.toLocaleString('en-IN')} customer reviews
              </a>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                Verified Expo Item
              </span>
            </div>

            <div className="border-t border-b border-slate-100 py-4 mb-4">
              {/* Pricing breakdown */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono-tabular">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-slate-400 line-through font-mono-tabular">
                      M.R.P.: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-bold text-rose-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercentage}%)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                Inclusive of all simulated taxes. EMI options available from ₹{Math.round(product.price / 6)}/mo.
              </p>
            </div>

            {/* Delivery Estimation Box */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 mb-5 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>
                    Deliver to <strong className="text-slate-900">{deliveryLocation.city} - {deliveryLocation.pinCode}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-sky-600 hover:underline font-semibold"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong>FREE Delivery Tomorrow</strong> if ordered within the next 4 hours.
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-700 leading-relaxed mb-6">
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">About this item</h3>
              <p>{product.description}</p>
            </div>

            {/* Stock status & Quantity selection */}
            <div className="space-y-4 mb-6">
              <div>
                {isOutOfStock ? (
                  <span className="text-sm font-bold text-rose-600">Currently Out of Stock</span>
                ) : product.stock <= 10 ? (
                  <span className="text-sm font-bold text-amber-700">
                    Only {product.stock} left in stock - order soon!
                  </span>
                ) : (
                  <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    In Stock ({product.stock} units available)
                  </span>
                )}
              </div>

              {!isOutOfStock && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1 text-xs font-bold text-slate-900 font-mono-tabular">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="p-1.5 text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Primary Action Buttons (Add to Cart / Buy Now) */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={isOutOfStock}
                className="py-3 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="py-3 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now (Express)</span>
              </button>
            </div>

            {/* Secondary Wishlist / Compare Row */}
            <div className="flex items-center justify-between text-xs pt-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  isSavedInWishlist ? 'text-rose-600' : 'text-slate-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSavedInWishlist ? 'fill-rose-600' : ''}`} />
                <span>{isSavedInWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={() => toggleCompare(product.id)}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  isCompared ? 'text-sky-600' : 'text-slate-600 hover:text-sky-600'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{isCompared ? 'Added to Compare' : 'Compare Product'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
          {Object.entries(product.specifications || {}).map(([key, val]) => (
            <div key={key} className="flex justify-between py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-500">{key}</span>
              <span className="text-slate-900 font-medium text-right">{val}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-500">Category</span>
            <span className="text-slate-900 font-medium">{product.category}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="font-semibold text-slate-500">Model / SKU ID</span>
            <span className="text-slate-900 font-mono-tabular uppercase">{product.id}</span>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Customer Reviews ({product.reviewCount})
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-amber-400 stroke-amber-500'
                        : 'stroke-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">{product.rating} out of 5</span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {(product.reviews || []).length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">
              No customer reviews written yet for this demo product. Be the first to share your simulated feedback!
            </p>
          ) : (
            product.reviews?.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px]">
                      {rev.userName[0]}
                    </div>
                    <span className="font-semibold text-slate-900">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 text-[11px]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 stroke-amber-500'
                            : 'stroke-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.title}</h4>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Similar Products in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-semibold text-sm">Write a Review for {product.name.slice(0, 30)}...</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'fill-amber-400 stroke-amber-500'
                            : 'stroke-slate-300 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="What's most important to know?"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Review
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you like or dislike? How does it perform in daily usage?"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
