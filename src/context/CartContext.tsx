'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Cart, CartItem, CartContextType } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updatedItems };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
};

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const discount = 0;
  const total = subtotal + tax + shipping - discount;

  return { subtotal, tax, shipping, discount, total };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const totals = calculateTotals(cart.items);
    const updatedCart = { ...cart, ...totals };
    
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totals = calculateTotals(cart.items);

  return (
    <CartContext.Provider
      value={{
        cart: { ...cart, ...totals },
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
