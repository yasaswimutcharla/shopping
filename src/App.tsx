/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { DemoNotice } from './components/common/DemoNotice';
import { Header } from './components/common/Header';
import { SubNav } from './components/common/SubNav';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LocationModal } from './components/common/LocationModal';
import { AuthModal } from './components/auth/AuthModal';
import { ExpoGuideModal } from './components/expo/ExpoGuideModal';
import { ProductCompareModal } from './components/products/ProductCompareModal';

// Pages
import { HomePage } from './components/home/HomePage';
import { ProductCatalog } from './components/products/ProductCatalog';
import { ProductDetail } from './components/products/ProductDetail';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrdersPage } from './components/orders/OrdersPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { SupportPage } from './components/support/SupportPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* College Expo Demo Notice */}
      <DemoNotice />

      {/* Primary Header */}
      <Header />

      {/* Secondary Categories & Shortcuts Navigation */}
      <SubNav />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <ProductCatalog />}
        {currentPage === 'product-detail' && <ProductDetail />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'support' && <SupportPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals & Notifications */}
      <LocationModal />
      <AuthModal />
      <ExpoGuideModal />
      <ProductCompareModal />
      <Toast />

      {/* Comprehensive E-Commerce Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
