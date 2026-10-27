/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { WishlistView } from './components/WishlistView';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { PolicyModal } from './components/PolicyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#111111]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header & Nav */}
      <Header />

      {/* Main Routed View */}
      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'shop' && <ShopView />}
        {activeView === 'product-detail' && <ProductDetailView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'order-confirmation' && <OrderConfirmationView />}
        {activeView === 'track-order' && <OrderTrackingView />}
        {activeView === 'wishlist' && <WishlistView />}
        {activeView === 'admin' && <AdminPortal />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <CartDrawer />
      <ProductQuickViewModal />
      <SearchModal />
      <PolicyModal />
      <WhatsAppFloatingButton />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
