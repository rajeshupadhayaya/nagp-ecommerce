'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  newProducts: Product[];
  featuredProducts: Product[];
  specialProducts: Product[];
  bestsellers: Product[];
}

type TabType = 'new' | 'featured' | 'special' | 'bestsellers';

export default function ProductGrid({
  newProducts,
  featuredProducts,
  specialProducts,
  bestsellers,
}: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>('new');

  const tabs = [
    { id: 'new' as TabType, label: 'New Products', products: newProducts },
    { id: 'featured' as TabType, label: 'Featured', products: featuredProducts },
    { id: 'special' as TabType, label: 'Special', products: specialProducts },
    { id: 'bestsellers' as TabType, label: 'Bestsellers', products: bestsellers },
  ];

  const currentProducts = tabs.find((tab) => tab.id === activeTab)?.products || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        {currentProducts.length > 8 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
