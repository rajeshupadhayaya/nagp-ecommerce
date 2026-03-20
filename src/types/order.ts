/**
 * Order and order management related types
 */

import { CartItem } from './cart';
import { Address, User } from './user';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'credit-card'
  | 'debit-card'
  | 'paypal'
  | 'cash-on-delivery';

export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  size: string;
  color: string;
  price: number; // Price at the time of order
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string; // Human-readable order number
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  total: number;
  status: OrderStatus;
  itemCount: number;
  createdAt: Date;
}

export interface CreateOrderData {
  items: CartItem[];
  shippingAddressId: string;
  billingAddressId: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}
