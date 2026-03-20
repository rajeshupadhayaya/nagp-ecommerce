'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
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
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
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

        {/* Quick Action Buttons */}
        <div
          className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating!) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex gap-1 mb-3">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-600 transition-colors"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {showSuccess && (
          <div className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2">
            <span>✓</span>
            Added to Cart!
          </div>
        )}
        {!showSuccess && (
          <button
            onClick={handleAddToCart}
            className={`mt-3 w-full bg-gray-900 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
