// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  slug: string;
}

// Cart types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Coupon types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  isPercentage: boolean;
  validFrom: Date;
  validUntil: Date;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
}