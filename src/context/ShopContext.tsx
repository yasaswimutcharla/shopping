import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  FilterState,
  Coupon,
  Category,
  OrderStatus,
  ProductReview
} from '../types';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../data/initialProducts';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export type AppPage =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'wishlist'
  | 'profile'
  | 'support'
  | 'admin';

interface ShopContextType {
  // Navigation
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addProductReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  resetToInitialData: () => void;

  // Search & Filter
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  executeSearch: (query: string, category?: Category) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  cartDiscountSavings: number;
  deliveryFee: number;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;
  finalCartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  moveToCartFromWishlist: (productId: string) => void;

  // Compare
  compareProductIds: string[];
  toggleCompare: (productId: string) => boolean;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewedIds: string[];

  // Orders
  orders: Order[];
  placeOrder: (orderInput: Omit<Order, 'id' | 'date' | 'status' | 'trackingHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // User & Demo Roles
  currentUser: UserProfile;
  switchUserRole: (role: 'customer' | 'admin' | 'guest') => void;
  deliveryLocation: { city: string; pinCode: string };
  setDeliveryLocation: (location: { city: string; pinCode: string }) => void;

  // Modals & UI
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isExpoGuideOpen: boolean;
  setIsExpoGuideOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 100000,
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
  sortBy: 'featured'
};

const DEMO_CUSTOMER: UserProfile = {
  id: 'usr-student-01',
  name: 'Rohan Sharma',
  email: 'rohan.sharma@college.edu',
  role: 'customer',
  phone: '+91 98765 43210',
  defaultAddress: {
    fullName: 'Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'rohan.sharma@college.edu',
    addressLine1: 'Room 304, Campus Tech Hostel',
    addressLine2: 'Engineering College Campus, Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400076',
    addressType: 'Home'
  }
};

const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  name: 'Demo Admin (Store Manager)',
  email: 'admin@shopsphere.demo',
  role: 'admin',
  phone: '+91 98111 22334'
};

const DEMO_GUEST: UserProfile = {
  id: 'usr-guest-01',
  name: 'Expo Visitor (Guest)',
  email: 'guest@visitor.demo',
  role: 'customer'
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'SP-982410-EXP',
    date: '2026-10-12T14:32:00.000Z',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // AeroPulse Studio ANC
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[15], // Atomic Habits
        quantity: 1
      }
    ],
    shippingAddress: DEMO_CUSTOMER.defaultAddress!,
    deliveryMethod: 'standard',
    deliveryFee: 0,
    paymentMethod: 'upi',
    paymentDetailsSummary: 'UPI ID: rohan@oksbi',
    subtotal: 8998,
    discount: 7299,
    couponDiscount: 0,
    total: 8998,
    status: 'Shipped',
    estimatedDelivery: 'Tomorrow, by 8 PM',
    trackingHistory: [
      {
        status: 'Ordered',
        timestamp: '2026-10-12 14:32',
        location: 'ShopSphere Central Hub, Mumbai',
        description: 'Order placed by simulated student account.'
      },
      {
        status: 'Confirmed',
        timestamp: '2026-10-12 14:45',
        location: 'Merchant Warehouse',
        description: 'Seller processed payment and generated invoice.'
      },
      {
        status: 'Packed',
        timestamp: '2026-10-13 09:15',
        location: 'Sorting Facility, Bhiwandi',
        description: 'Package secured with tamper-proof seal.'
      },
      {
        status: 'Shipped',
        timestamp: '2026-10-13 18:20',
        location: 'Regional Hub, Powai Depot',
        description: 'In transit to destination delivery station.'
      }
    ]
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_products');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_cart');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_wishlist');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[8].id];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_orders');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_DEMO_ORDERS;
  });

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_user');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEMO_CUSTOMER;
  });

  // Location
  const [deliveryLocation, setDeliveryLocation] = useState<{ city: string; pinCode: string }>(() => {
    try {
      const stored = localStorage.getItem('shopsphere_location');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return { city: 'Mumbai', pinCode: '400076' };
  });

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isExpoGuideOpen, setIsExpoGuideOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Compare & Recently viewed
  const [compareProductIds, setCompareProductIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => [
    INITIAL_PRODUCTS[0].id,
    INITIAL_PRODUCTS[2].id,
    INITIAL_PRODUCTS[8].id
  ]);

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('shopsphere_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopsphere_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('shopsphere_location', JSON.stringify(deliveryLocation));
  }, [deliveryLocation]);

  // Toast helper
  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation handlers
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add to recently viewed
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1): boolean => {
    if (product.stock <= 0) {
      showToast(`${product.name} is currently out of stock.`, 'warning');
      return false;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const existing = cart[existingIndex];
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) {
        showToast(`Only ${product.stock} units available in stock.`, 'warning');
        return false;
      }
      const updated = [...cart];
      updated[existingIndex] = { ...existing, quantity: newQty };
      setCart(updated);
    } else {
      const initialQty = Math.min(quantity, product.stock);
      setCart([...cart, { product, quantity: initialQty }]);
    }

    showToast(`Added "${product.name.slice(0, 28)}..." to cart.`, 'success');
    return true;
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    if (quantity > item.product.stock) {
      showToast(`Cannot exceed available stock of ${item.product.stock}.`, 'warning');
      return;
    }

    setCart(
      cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart(cart.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name.slice(0, 24)}..." from cart.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast('Your cart has been cleared.', 'info');
  };

  // Cart calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const cartDiscountSavings = cart.reduce((acc, item) => {
    const savingsPerUnit = Math.max(0, item.product.originalPrice - item.product.price);
    return acc + savingsPerUnit * item.quantity;
  }, 0);

  const deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;

  const couponDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100)
    : 0;

  const finalCartTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const match = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!match) {
      return { success: false, message: 'Invalid promo code. Try "EXPO2026" or "SHOPSPHERE".' };
    }

    if (cartSubtotal < match.minOrderValue) {
      return {
        success: false,
        message: `Code ${match.code} requires a minimum order value of ₹${match.minOrderValue.toLocaleString('en-IN')}.`
      };
    }

    setAppliedCoupon(match);
    showToast(`Coupon ${match.code} applied: ${match.discountPercentage}% off!`, 'success');
    return { success: true, message: `Applied ${match.discountPercentage}% discount!` };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);
    const title = product?.name.slice(0, 24) || 'Item';

    if (exists) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast(`Removed "${title}..." from Wishlist.`, 'info');
    } else {
      setWishlist([...wishlist, productId]);
      showToast(`Saved "${title}..." to Wishlist.`, 'success');
    }
  };

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const added = addToCart(product, 1);
    if (added) {
      setWishlist(wishlist.filter((id) => id !== productId));
    }
  };

  // Compare products operations
  const toggleCompare = (productId: string): boolean => {
    if (compareProductIds.includes(productId)) {
      setCompareProductIds(compareProductIds.filter((id) => id !== productId));
      showToast('Removed item from comparison.', 'info');
      return false;
    } else {
      if (compareProductIds.length >= 3) {
        showToast('You can compare up to 3 products at a time.', 'warning');
        return false;
      }
      setCompareProductIds([...compareProductIds, productId]);
      showToast('Added to comparison table.', 'success');
      return true;
    }
  };

  const clearCompare = () => {
    setCompareProductIds([]);
  };

  // Orders operations
  const placeOrder = (orderInput: Omit<Order, 'id' | 'date' | 'status' | 'trackingHistory'>): Order => {
    const orderId = `SP-${Math.floor(100000 + Math.random() * 900000)}-EXP`;
    const now = new Date();
    const formattedDate = now.toISOString();

    const newOrder: Order = {
      ...orderInput,
      id: orderId,
      date: formattedDate,
      status: 'Confirmed',
      trackingHistory: [
        {
          status: 'Ordered',
          timestamp: 'Just now',
          location: 'ShopSphere Central Hub',
          description: 'Simulated order placed successfully.'
        },
        {
          status: 'Confirmed',
          timestamp: 'Just now',
          location: 'Merchant Warehouse',
          description: 'Demo payment simulated. Inventory allocated.'
        }
      ]
    };

    // Deduct stock locally from products
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = orderInput.items.find((i) => i.product.id === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartMatch.quantity)
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    showToast(`Order #${orderId} simulated successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newHistory = [
            ...ord.trackingHistory,
            {
              status,
              timestamp,
              location: 'Regional Logistics Center',
              description: `Status updated to ${status} via Store Admin panel.`
            }
          ];
          return {
            ...ord,
            status,
            trackingHistory: newHistory
          };
        }
        return ord;
      })
    );
    showToast(`Updated Order #${orderId} to "${status}".`, 'info');
  };

  // Admin Product management
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-custom-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProd,
      id,
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          userName: 'Admin Preview',
          rating: 5,
          date: 'Today',
          title: 'Newly added expo catalogue item',
          comment: 'Verified and stocked for demonstration.',
          verifiedPurchase: true
        }
      ]
    };

    setProducts((prev) => [fullProduct, ...prev]);
    showToast(`Product "${fullProduct.name}" added to catalogue!`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}".`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Product removed from store.', 'info');
  };

  const addProductReview = (productId: string, reviewInput: Omit<ProductReview, 'id' | 'date'>) => {
    const newRev: ProductReview = {
      ...reviewInput,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const existingReviews = prod.reviews || [];
          const updatedReviews = [newRev, ...existingReviews];
          const newCount = prod.reviewCount + 1;
          const newAvg = Number(
            (
              (prod.rating * prod.reviewCount + reviewInput.rating) /
              newCount
            ).toFixed(1)
          );
          return {
            ...prod,
            reviews: updatedReviews,
            reviewCount: newCount,
            rating: newAvg
          };
        }
        return prod;
      })
    );

    showToast('Thank you! Your verified expo review was published.', 'success');
  };

  const resetToInitialData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_DEMO_ORDERS);
    setCart([
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ]);
    setWishlist([INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[8].id]);
    localStorage.removeItem('shopsphere_products');
    localStorage.removeItem('shopsphere_orders');
    localStorage.removeItem('shopsphere_cart');
    localStorage.removeItem('shopsphere_wishlist');
    showToast('Restored pristine initial demo data for college expo.', 'info');
  };

  // Search & Filtering
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const executeSearch = (query: string, category: Category = 'All') => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      category: category || prev.category
    }));
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role switching
  const switchUserRole = (role: 'customer' | 'admin' | 'guest') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
      setCurrentPage('admin');
      showToast('Switched to Demo Admin (Store Manager) mode.', 'info');
    } else if (role === 'guest') {
      setCurrentUser(DEMO_GUEST);
      showToast('Browsing as Expo Visitor (Guest).', 'info');
    } else {
      setCurrentUser(DEMO_CUSTOMER);
      showToast('Switched to Demo Student Shopper (Rohan Sharma).', 'info');
    }
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        openProductDetail,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        addProductReview,
        resetToInitialData,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        executeSearch,
        cart,
        addToCart,
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
        wishlist,
        toggleWishlist,
        moveToCartFromWishlist,
        compareProductIds,
        toggleCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        recentlyViewedIds,
        orders,
        placeOrder,
        updateOrderStatus,
        currentUser,
        switchUserRole,
        deliveryLocation,
        setDeliveryLocation,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isExpoGuideOpen,
        setIsExpoGuideOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
