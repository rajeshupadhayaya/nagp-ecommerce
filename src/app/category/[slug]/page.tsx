'use client';

import { useState, useMemo, use } from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/category/Breadcrumb';
import CategorySidebar from '@/components/category/CategorySidebar';
import ViewControls from '@/components/category/ViewControls';
import ProductCard from '@/components/products/ProductCard';
import ProductListView from '@/components/products/ProductListView';
import Pagination from '@/components/category/Pagination';
import { mockProducts } from '@/data/products';
import { Product } from '@/types';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any>({});

  // Get category name from slug
  const categoryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply category filter based on slug
    if (slug !== 'all') {
      products = products.filter(
        (p) =>
          p.category.toLowerCase().includes(slug.toLowerCase()) ||
          p.subcategory?.toLowerCase().includes(slug.toLowerCase())
      );
    }

    // Apply filters
    if (filters.categories && filters.categories.length > 0) {
      products = products.filter((p) =>
        filters.categories.some((cat: string) =>
          p.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      products = products.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    if (filters.sizes && filters.sizes.length > 0) {
      products = products.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    if (filters.priceRange) {
      products = products.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return products;
  }, [slug, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryName}
              </h1>
              <Breadcrumb
                items={[{ label: categoryName }]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <CategorySidebar onFilterChange={setFilters} />
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Banner - Optional */}
            <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Special Offer!</h2>
              <p className="text-lg">Up to 50% off on selected items</p>
            </div>

            {/* View Controls */}
            <ViewControls
              viewType={viewType}
              onViewChange={setViewType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
            />

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedProducts.length)} of{' '}
              {filteredAndSortedProducts.length} results
            </div>

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
                  <div className="space-y-4 mb-8">
                    {currentProducts.map((product) => (
                      <ProductListView key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
