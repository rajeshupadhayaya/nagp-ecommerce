'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>(
    'description'
  );

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'specifications' as const, label: 'Specifications' },
    { id: 'reviews' as const, label: `Reviews (${product.reviewCount || 0})` },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
            
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-b border-gray-200 pb-3">
                <dt className="text-sm text-gray-600 mb-1">Category</dt>
                <dd className="font-medium text-gray-900">{product.category}</dd>
              </div>
              {product.subcategory && (
                <div className="border-b border-gray-200 pb-3">
                  <dt className="text-sm text-gray-600 mb-1">Subcategory</dt>
                  <dd className="font-medium text-gray-900">{product.subcategory}</dd>
                </div>
              )}
              {product.material && (
                <div className="border-b border-gray-200 pb-3">
                  <dt className="text-sm text-gray-600 mb-1">Material</dt>
                  <dd className="font-medium text-gray-900">{product.material}</dd>
                </div>
              )}
              <div className="border-b border-gray-200 pb-3">
                <dt className="text-sm text-gray-600 mb-1">Available Sizes</dt>
                <dd className="font-medium text-gray-900">{product.sizes.join(', ')}</dd>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <dt className="text-sm text-gray-600 mb-1">Available Colors</dt>
                <dd className="flex gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.name}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </dd>
              </div>
              {product.care && product.care.length > 0 && (
                <div className="border-b border-gray-200 pb-3 md:col-span-2">
                  <dt className="text-sm text-gray-600 mb-1">Care Instructions</dt>
                  <dd className="font-medium text-gray-900">
                    <ul className="list-disc list-inside">
                      {product.care.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            
            {/* Reviews Summary */}
            {product.rating && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {product.rating}
                    </div>
                    <div className="flex text-yellow-400 text-2xl mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating!) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {product.reviewCount} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600 w-12">{rating} star</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${Math.random() * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {Math.floor(Math.random() * 50)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sample Reviews */}
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">Customer {review}</div>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < 4 ? '★' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2">Great product!</h4>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
