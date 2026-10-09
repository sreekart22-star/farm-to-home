export type UserRole = 'customer' | 'farmer' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  email: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  bio: string;
  avatar: string;
  farmImage: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  categories: string[];
  rating: number;
  reviewCount: number;
  joinedDate: string;
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  categoryId: string;
  farmerId: string;
  farmerName: string;
  price: number; // in INR (₹)
  originalPrice?: number;
  unit: string; // e.g., '1 kg', '500 g', '1 bunch', '1 litre', '1 dozen'
  stock: number;
  image: string;
  images: string[];
  description: string;
  storageInstructions: string;
  harvestInfo?: string;
  origin?: string;
  isSeasonal?: boolean;
  isFeatured?: boolean;
  available: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  houseNo: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  unit: string;
  farmerId: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_dispatch'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refund_pending'
  | 'refunded';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'cod' | 'online_razorpay';
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: OrderStatus;
  createdAt: string;
  deliveryInstructions?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface Settings {
  announcementText: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  enableCod: boolean;
  enableOnlinePayment: boolean;
  serviceablePincodes: string[];
}
