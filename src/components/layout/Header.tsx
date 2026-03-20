'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">+ 1 (800) 2364 332 23 16</span>
              <span className="text-gray-600">your@email.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 flex items-center">
                <User className="w-4 h-4 mr-1" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Shop<span className="text-blue-600">+</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/wishlist" className="relative hover:text-blue-600 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="/cart" className="relative hover:text-blue-600 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <div className="hidden md:block text-sm">
              <div className="text-gray-600">{itemCount} items</div>
              <div className="font-semibold">${cart.total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
