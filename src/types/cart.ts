/**
 * Shopping cart related types and interfaces
 */

import { ProductSize, ProductImage } from './product';

export interface CartItem {
  id: string; // Unique cart item ID
  productId: string; // Reference to the product
  name: string;
  price: number; // Price at the time of adding to cart
  quantity: number;
  image: ProductImage; // Product image
  selectedSize?: ProductSize;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}
