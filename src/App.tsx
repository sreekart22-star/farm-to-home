import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Public pages
import { Home } from './pages/public/Home';
import { Shop } from './pages/public/Shop';
import { CategoriesPage } from './pages/public/CategoriesPage';
import { ProductDetail } from './pages/public/ProductDetail';
import { FarmersPage } from './pages/public/FarmersPage';
import { FarmerDetail } from './pages/public/FarmerDetail';
import { HowItWorks } from './pages/public/HowItWorks';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Faq } from './pages/public/Faq';
import { Privacy } from './pages/public/Privacy';
import { Terms } from './pages/public/Terms';
import { ShippingPolicy } from './pages/public/ShippingPolicy';
import { RefundPolicy } from './pages/public/RefundPolicy';

// Customer pages
import { Cart } from './pages/customer/Cart';
import { Checkout } from './pages/customer/Checkout';
import { Account } from './pages/customer/Account';
import { OrdersList } from './pages/customer/OrdersList';
import { OrderDetail } from './pages/customer/OrderDetail';
import { AddressesPage } from './pages/customer/AddressesPage';
import { WishlistPage } from './pages/customer/WishlistPage';

// Auth pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Farmer pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerProducts } from './pages/farmer/FarmerProducts';
import { FarmerProductNew } from './pages/farmer/FarmerProductNew';
import { FarmerOrders } from './pages/farmer/FarmerOrders';
import { FarmerEarnings } from './pages/farmer/FarmerEarnings';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminFarmers } from './pages/admin/AdminFarmers';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminSettings } from './pages/admin/AdminSettings';

const AppContent: React.FC = () => {
  const { activeRoute, navigate } = useApp();

  // Sync hash changes with state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      navigate(hash);
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activeRoute changes
  useEffect(() => {
    window.location.hash = `#/${activeRoute}`;
  }, [activeRoute]);

  const renderRoute = () => {
    if (activeRoute === 'home') return <Home />;
    if (activeRoute === 'shop' || activeRoute.startsWith('shop?')) return <Shop />;
    if (activeRoute === 'categories') return <CategoriesPage />;
    if (activeRoute.startsWith('product/')) return <ProductDetail />;
    if (activeRoute === 'farmers') return <FarmersPage />;
    if (activeRoute.startsWith('farmers/')) return <FarmerDetail />;
    if (activeRoute === 'how-it-works') return <HowItWorks />;
    if (activeRoute === 'about') return <About />;
    if (activeRoute === 'contact') return <Contact />;
    if (activeRoute === 'faq') return <Faq />;
    if (activeRoute === 'privacy') return <Privacy />;
    if (activeRoute === 'terms') return <Terms />;
    if (activeRoute === 'shipping-policy') return <ShippingPolicy />;
    if (activeRoute === 'refund-policy') return <RefundPolicy />;

    if (activeRoute === 'cart') return <Cart />;
    if (activeRoute === 'checkout') return <Checkout />;
    if (activeRoute === 'account') return <Account />;
    if (activeRoute === 'account/orders') return <OrdersList />;
    if (activeRoute.startsWith('account/orders/')) return <OrderDetail />;
    if (activeRoute === 'account/addresses') return <AddressesPage />;
    if (activeRoute === 'wishlist') return <WishlistPage />;

    if (activeRoute === 'login') return <Login />;
    if (activeRoute === 'register') return <Register />;
    if (activeRoute === 'forgot-password') return <ForgotPassword />;

    if (activeRoute === 'farmer-dashboard') return <FarmerDashboard />;
    if (activeRoute === 'farmer/products') return <FarmerProducts />;
    if (activeRoute === 'farmer/products/new') return <FarmerProductNew />;
    if (activeRoute === 'farmer/orders') return <FarmerOrders />;
    if (activeRoute === 'farmer/earnings') return <FarmerEarnings />;

    if (activeRoute === 'admin-dashboard') return <AdminDashboard />;
    if (activeRoute === 'admin/orders') return <AdminOrders />;
    if (activeRoute === 'admin/farmers') return <AdminFarmers />;
    if (activeRoute === 'admin/products') return <AdminProducts />;
    if (activeRoute === 'admin/settings') return <AdminSettings />;

    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6EE] text-[#242B25] font-sans antialiased">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{renderRoute()}</main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
