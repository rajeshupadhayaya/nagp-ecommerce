'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CategorySidebar from '@/components/category/CategorySidebar';
import ViewControls from '@/components/category/ViewControls';
import ProductCard from '@/components/products/ProductCard';
import ProductListView from '@/components/products/ProductListView';
import Pagination from '@/components/category/Pagination';
import { mockProducts as products } from '@/data/products';
import { Product } from '@/types';

export default function SalePage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState<any>({});

  // Filter products that are on sale (have originalPrice)
  const saleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);

  // Apply sorting
  let sortedProducts = [...saleProducts];
  switch (sortBy) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
      sortedProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      // Default - keep original order
      break;
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Calculate total savings
  const totalSavings = saleProducts.reduce((sum, product) => {
    if (product.originalPrice) {
      return sum + (product.originalPrice - product.price);
    }
    return sum;
  }, 0);

  return (
    <>
      <Header />
      <Navigation />

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm mb-4 text-white/80">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Sale</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Sale Items</h1>
                <p className="text-white/90">
                  {saleProducts.length} products on sale - Save big on your favorite items!
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                <div className="text-sm text-white/80">Total Savings Available</div>
                <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sale Banner */}
        <div className="bg-yellow-50 border-y border-yellow-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">🔥</span>
              <p className="text-gray-900 font-semibold">
                Limited Time Sale! Up to 50% OFF on selected items
              </p>
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <CategorySidebar onFilterChange={setFilters} />
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* View Controls */}
              <ViewControls
                viewType={viewType}
                onViewChange={setViewType}
                sortBy={sortBy}
                onSortChange={setSortBy}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
              />

              {/* Products Grid/List */}
              {currentProducts.length > 0 ? (
                <>
                  {viewType === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 mb-8">
                      {currentProducts.map((product) => (
                        <ProductListView key={product.id} product={product} />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Sale Items Available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Check back soon for amazing deals!
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sale Features */}
        <div className="bg-white border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
                <p className="text-gray-600">Get the best deals on quality products</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600">On orders over $100</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy on sale items</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
