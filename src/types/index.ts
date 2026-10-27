/**
 * HS Collection - TypeScript Type Definitions
 */

export type ProductCategory =
  | 'ladies-suits'
  | 'gents-suits'
  | 'accessories'
  | 'new-arrivals'
  | 'best-sellers'
  | 'special-offers';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameUrdu?: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  fabricDetails: string;
  careInstructions: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // unique item id composed of productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'bank_transfer' | 'online_gateway';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItemSummary {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  deliveryAddress: string;
  areaLandmark?: string;
  postalCode?: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerDetails;
  items: OrderItemSummary[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
  courierName?: string;
  isDemo: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productTitle: string;
  verifiedBuyer: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
}

export interface FilterState {
  category: ProductCategory | 'all';
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  color: string;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export type ActiveView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'checkout'
  | 'order-confirmation'
  | 'track-order'
  | 'wishlist'
  | 'admin';

export type PolicyModalType =
  | 'shipping'
  | 'return'
  | 'faqs'
  | 'privacy'
  | 'size-guide'
  | null;
