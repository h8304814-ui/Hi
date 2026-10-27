/**
 * HS Collection - Main Store Context & State Management
 * Handles Cart, Wishlist, Orders, Products, Search, Filters, and Navigation
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORE_CONFIG, StoreConfig } from '../config/storeConfig';
import { INITIAL_PRODUCTS, PROMO_COUPONS } from '../data/products';
import {
  ActiveView,
  CartItem,
  Coupon,
  CustomerDetails,
  FilterState,
  Order,
  OrderStatus,
  PaymentMethod,
  PolicyModalType,
  Product,
  ProductCategory,
  ProductColor,
} from '../types';
import { generateOrderNumber } from '../utils/formatters';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Store Config
  config: StoreConfig;
  updateConfig: (newConfig: Partial<StoreConfig>) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Navigation & Views
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  viewProductDetail: (product: Product) => void;
  openShopCategory: (category: ProductCategory | 'all') => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartShippingFee: number;
  freeShippingGap: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  cartTotal: number;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activePolicyModal: PolicyModalType;
  setActivePolicyModal: (modal: PolicyModalType) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Notifications
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  subcategory: '',
  minPrice: 0,
  maxPrice: 20000,
  size: '',
  color: '',
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

const CART_STORAGE_KEY = 'hs_collection_cart_v1';
const WISHLIST_STORAGE_KEY = 'hs_collection_wishlist_v1';
const ORDERS_STORAGE_KEY = 'hs_collection_orders_v1';
const PRODUCTS_STORAGE_KEY = 'hs_collection_products_v1';
const CONFIG_STORAGE_KEY = 'hs_collection_config_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Config
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : STORE_CONFIG;
    } catch {
      return STORE_CONFIG;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Views & Routing
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Preload 1 realistic demo order for admin visibility
      return [
        {
          id: 'order-demo-01',
          orderNumber: 'HSC-2026-1049',
          customer: {
            fullName: 'Zainab Qureshi',
            phone: '03028472910',
            email: 'zainab.q@example.pk',
            city: 'Lahore',
            deliveryAddress: 'House 42, Street 8, Phase 4, DHA',
            areaLandmark: 'Near Lalik Jan Chowk',
            orderNotes: 'Please ring the bell twice, thank you!',
          },
          items: [
            {
              productId: 'prod-ls-01',
              productName: 'Zahra - Luxury Embroidered Chiffon 3-Piece',
              sku: 'HSC-LS-01',
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
              price: 11850,
              quantity: 1,
              selectedSize: 'M',
              selectedColor: 'Crimson Rose',
            },
          ],
          subtotal: 11850,
          shippingFee: 0,
          discount: 0,
          total: 11850,
          paymentMethod: 'cod',
          status: 'confirmed',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          trackingNumber: 'TRX-9481920',
          courierName: 'Trax Logistics',
          isDemo: true,
        },
      ];
    } catch {
      return [];
    }
  });
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Filters & Search
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyModalType>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed for cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed for wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed for orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed for products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed for config', e);
    }
  }, [config]);

  // Show Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3800);
  };

  // Products CRUD
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added ${newProduct.name} to catalog!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Product details updated successfully.', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Store settings saved successfully.', 'success');
  };

  // Navigation helpers
  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openShopCategory = (category: ProductCategory | 'all') => {
    setFilters((prev) => ({
      ...prev,
      category,
      subcategory: '',
      searchQuery: '',
    }));
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Management
  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" (${size}) to cart.`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const freeShippingGap = useMemo(() => {
    const remaining = config.shipping.freeShippingThreshold - cartSubtotal;
    return remaining > 0 ? remaining : 0;
  }, [cartSubtotal, config.shipping.freeShippingThreshold]);

  const cartShippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (cartSubtotal >= config.shipping.freeShippingThreshold) return 0;
    if (appliedCoupon?.code === 'FREESHIP') return 0;
    return config.shipping.standardShippingFee;
  }, [cart.length, cartSubtotal, config.shipping, appliedCoupon]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal === 0) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    }
    return appliedCoupon.discountValue;
  }, [appliedCoupon, cartSubtotal]);

  const cartTotal = useMemo(() => {
    const total = cartSubtotal + cartShippingFee - discountAmount;
    return total > 0 ? total : 0;
  }, [cartSubtotal, cartShippingFee, discountAmount]);

  const applyCouponCode = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    const found = PROMO_COUPONS.find((c) => c.code === normalized);

    if (!found) {
      return { success: false, message: 'Invalid promo coupon code.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `This coupon requires a minimum spend of Rs. ${found.minSpend.toLocaleString('en-PK')}.`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied! ${found.description}`, 'success');
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Filters Reset
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Place Order
  const placeOrder = (
    customer: CustomerDetails,
    paymentMethod: PaymentMethod
  ): Order => {
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      image: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor.name,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customer,
      items: orderItems,
      subtotal: cartSubtotal,
      shippingFee: cartShippingFee,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total: cartTotal,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      trackingNumber: `TRX-${Math.floor(1000000 + Math.random() * 9000000)}`,
      courierName: 'Trax Logistics / TCS',
      isDemo: true, // Clearly marks demo mode as requested
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setActiveView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order status updated to "${status.toUpperCase()}".`, 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        viewProductDetail,
        openShopCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        cartShippingFee,
        freeShippingGap,
        appliedCoupon,
        discountAmount,
        cartTotal,
        applyCouponCode,
        removeCouponCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        filters,
        setFilters,
        resetFilters,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        activePolicyModal,
        setActivePolicyModal,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        lastPlacedOrder,
        setLastPlacedOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
