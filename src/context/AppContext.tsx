import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Farmer,
  Order,
  CartItem,
  Address,
  User,
  Settings,
  Review,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_FARMERS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentRole: 'customer' | 'farmer' | 'admin' | 'guest';
  setCurrentRole: (role: 'customer' | 'farmer' | 'admin' | 'guest') => void;
  login: (email: string, role?: 'customer' | 'farmer' | 'admin') => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string, role: 'customer' | 'farmer', farmName?: string) => void;

  products: Product[];
  categories: Category[];
  farmers: Farmer[];
  orders: Order[];
  reviews: Review[];
  settings: Settings;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartItemCount: number;

  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  setDefaultAddress: (id: string) => void;
  removeAddress: (id: string) => void;

  placeOrder: (shippingAddress: Address, paymentMethod: 'cod' | 'online_razorpay', instructions?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;

  addProduct: (product: Omit<Product, 'id' | 'createdAt'> & { slug?: string }) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  updateFarmerStatus: (farmerId: string, status: 'approved' | 'rejected') => void;
  updateSettings: (newSettings: Partial<Settings>) => void;

  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  activeRoute: string;
  navigate: (route: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [currentRole, setCurrentRoleState] = useState<'customer' | 'farmer' | 'admin' | 'guest'>(() => {
    const saved = localStorage.getItem('fth_role');
    return (saved as any) || 'customer';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('fth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      id: 'cust-1',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '+91 98123 45678',
      role: 'customer',
      createdAt: '2026-09-01'
    };
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fth_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem('fth_farmers');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fth_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('fth_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fth_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('fth_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('fth_addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 'addr-1',
        name: 'Ananya Sharma',
        phone: '+91 98123 45678',
        houseNo: 'Flat 402, Lotus Towers',
        locality: 'Gachibowli',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500032',
        isDefault: true
      }
    ];
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>('home');

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('fth_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fth_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fth_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem('fth_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fth_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fth_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fth_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('fth_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const navigate = (route: string) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCurrentRole = (role: 'customer' | 'farmer' | 'admin' | 'guest') => {
    setCurrentRoleState(role);
    if (role === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'Administrator',
        email: 'admin@farmtohome.in',
        phone: '+91 90000 00000',
        role: 'admin',
        createdAt: '2025-01-01'
      });
      showToast('Switched to Admin Role', 'info');
    } else if (role === 'farmer') {
      setCurrentUser({
        id: 'farmer-1',
        name: 'Ramesh Reddy',
        email: 'ramesh.reddy@farmtohome.in',
        phone: '+91 98480 12345',
        role: 'farmer',
        createdAt: '2023-01-15'
      });
      showToast('Switched to Farmer Role (Ramesh Reddy)', 'info');
    } else if (role === 'customer') {
      setCurrentUser({
        id: 'cust-1',
        name: 'Ananya Sharma',
        email: 'ananya.sharma@example.com',
        phone: '+91 98123 45678',
        role: 'customer',
        createdAt: '2026-09-01'
      });
      showToast('Switched to Customer Role', 'info');
    } else {
      setCurrentUser(null);
      showToast('Switched to Guest', 'info');
    }
  };

  const login = (email: string, roleHint?: 'customer' | 'farmer' | 'admin') => {
    if (email.includes('admin')) {
      setCurrentRole('admin');
      return true;
    } else if (email.includes('farmer') || email.includes('ramesh')) {
      setCurrentRole('farmer');
      return true;
    } else {
      setCurrentRole('customer');
      setCurrentUser({
        id: 'cust-' + Date.now(),
        name: email.split('@')[0],
        email,
        phone: '+91 98765 43210',
        role: 'customer',
        createdAt: new Date().toISOString()
      });
      showToast('Logged in successfully!');
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('guest');
    showToast('Logged out successfully', 'info');
  };

  const register = (name: string, email: string, phone: string, role: 'customer' | 'farmer', farmName?: string) => {
    const newUser: User = {
      id: role + '-' + Date.now(),
      name,
      email,
      phone,
      role,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    setCurrentRole(role);

    if (role === 'farmer') {
      const newFarmer: Farmer = {
        id: newUser.id,
        name,
        farmName: farmName || `${name}'s Farm`,
        email,
        phone,
        location: 'Hyderabad Outskirts',
        district: 'Rangareddy',
        state: 'Telangana',
        bio: 'New registered farmer partner committed to fresh quality produce.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        farmImage: 'https://images.unsplash.com/photo-1595974482597-4f6c8f706346?auto=format&fit=crop&w=800&q=80',
        verificationStatus: 'pending',
        categories: ['Fresh Vegetables'],
        rating: 5.0,
        reviewCount: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setFarmers([newFarmer, ...farmers]);
    }
    showToast(`Account registered successfully as ${role}!`);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'error');
          return prev;
        }
        showToast(`Updated quantity for ${product.name}`);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        if (quantity > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'error');
          return prev;
        }
        showToast(`Added ${product.name} to cart`);
        return [...prev, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cart.find(i => i.product.id === productId);
    if (item && quantity > item.product.stock) {
      showToast(`Only ${item.product.stock} units available in stock.`, 'error');
      return;
    }
    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotal = cartSubtotal >= settings.freeDeliveryThreshold ? cartSubtotal : cartSubtotal + (cart.length > 0 ? settings.deliveryFee : 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Addresses
  const addAddress = (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addrData,
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0 ? true : addrData.isDefault
    };
    if (newAddr.isDefault) {
      setAddresses(addresses.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses([...addresses, newAddr]);
    }
    showToast('Delivery address saved successfully');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated');
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
    showToast('Address removed', 'info');
  };

  // Orders
  const placeOrder = (
    shippingAddress: Address,
    paymentMethod: 'cod' | 'online_razorpay',
    instructions?: string
  ): Order => {
    // Server validation check for PIN code
    if (!settings.serviceablePincodes.includes(shippingAddress.pincode)) {
      showToast(`Sorry, delivery is currently not available for PIN code ${shippingAddress.pincode}`, 'error');
      throw new Error('Serviceable pincode required');
    }

    const orderId = 'FTH-' + Math.floor(10000 + Math.random() * 90000);
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      unit: item.product.unit,
      farmerId: item.product.farmerId
    }));

    const newOrder: Order = {
      id: orderId,
      customerId: currentUser?.id || 'guest-cust',
      customerName: currentUser?.name || shippingAddress.name,
      customerEmail: currentUser?.email || 'customer@example.com',
      customerPhone: shippingAddress.phone,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryCharge: cartSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee,
      discount: 0,
      total: cartTotal,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'online_razorpay' ? 'paid' : 'pending',
      status: 'placed',
      createdAt: new Date().toISOString(),
      deliveryInstructions: instructions,
      statusHistory: [
        { status: 'placed', timestamp: new Date().toISOString(), note: 'Order successfully placed' }
      ]
    };

    // Reduce stock
    setProducts(prevProds => {
      let updated = [...prevProds];
      cart.forEach(cartItem => {
        updated = updated.map(p =>
          p.id === cartItem.product.id
            ? { ...p, stock: Math.max(0, p.stock - cartItem.quantity) }
            : p
        );
      });
      return updated;
    });

    setOrders([newOrder, ...orders]);
    clearCart();
    showToast(`Order #${orderId} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const newHistory = [
            ...ord.statusHistory,
            { status, timestamp: new Date().toISOString(), note: note || `Status updated to ${status}` }
          ];
          return { ...ord, status, statusHistory: newHistory };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} updated to ${status}`);
  };

  // Farmer operations
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      slug: prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([newProduct, ...products]);
    showToast('Product added successfully!');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted successfully', 'info');
  };

  const updateFarmerStatus = (farmerId: string, status: 'approved' | 'rejected') => {
    setFarmers(prev =>
      prev.map(f => (f.id === farmerId ? { ...f, verificationStatus: status } : f))
    );
    showToast(`Farmer verification status updated to ${status}`);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Platform settings updated successfully!');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        login,
        logout,
        register,
        products,
        categories,
        farmers,
        orders,
        reviews,
        settings,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addresses,
        addAddress,
        setDefaultAddress,
        removeAddress,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateFarmerStatus,
        updateSettings,
        toast,
        showToast,
        activeRoute,
        navigate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
