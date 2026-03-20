'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductListViewProps {
  product: Product;
}

export default function ProductListView({ product }: ProductListViewProps) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: `${product.id}-${product.sizes[0] || 'nosize'}-${product.colors[0].name}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      selectedSize: product.sizes[0] || undefined,
      selectedColor: product.colors[0].name,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="relative md:w-1/3 aspect-[4/3] md:aspect-auto">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              className="object-cover"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating!) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-4">
            {product.material && (
              <div className="text-sm">
                <span className="text-gray-500">Material:</span>{' '}
                <span className="text-gray-900">{product.material}</span>
              </div>
            )}
            <div className="text-sm">
              <span className="text-gray-500">Available Sizes:</span>{' '}
              <span className="text-gray-900">{product.sizes.join(', ')}</span>
            </div>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Colors:</span>
              <div className="flex gap-1">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              {showSuccess ? (
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <span>✓</span>
                  Added!
                </div>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
