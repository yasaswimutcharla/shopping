export type Category =
  | 'All'
  | 'Electronics'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Books'
  | 'Beauty'
  | 'Sports'
  | 'Toys';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  specifications: Record<string, string>;
  stock: number;
  isBestSeller?: boolean;
  isDealOfTheDay?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: 'Home' | 'Work';
}

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethod = 'cod' | 'upi' | 'card';

export type OrderStatus =
  | 'Ordered'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  paymentDetailsSummary?: string;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
  status: OrderStatus;
  estimatedDelivery: string;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    location: string;
    description: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  defaultAddress?: ShippingAddress;
}

export interface FilterState {
  searchQuery: string;
  category: Category;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrderValue: number;
  description: string;
}
