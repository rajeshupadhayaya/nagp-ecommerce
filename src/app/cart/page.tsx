'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <>
      <Header />
      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some items to get started</p>
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6"
                  >
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          {item.selectedColor && (
                            <div>Color: <span className="font-medium">{item.selectedColor}</span></div>
                          )}
                          {item.selectedSize && (
                            <div>Size: <span className="font-medium">{item.selectedSize}</span></div>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                        {/* Price */}
                        <div className="text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 font-semibold border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${cart.tax.toFixed(2)}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-semibold">-${cart.discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {cart.subtotal < 100 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                      <p className="text-sm text-blue-800">
                        Add <span className="font-semibold">${(100 - cart.subtotal).toFixed(2)}</span> more to get free shipping!
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg font-semibold text-lg transition-colors mb-3"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/"
                    className="block w-full text-center text-blue-600 hover:text-blue-700 font-semibold py-2 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
