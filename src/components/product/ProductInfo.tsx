'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product, ProductSize, ProductColor } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize || 'nosize'}-${selectedColor.name}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor.name,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600">{product.category}</p>
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating!) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-2xl text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Color: {selectedColor.name}
          </label>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor.name === color.name
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Size: {selectedSize || 'Please select'}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span className="px-6 py-2 font-semibold border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600">
            {product.stock && Object.values(product.stock).reduce((a, b) => a + b, 0)} items in stock
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="font-semibold">✓</span>
            <span>Added to cart successfully!</span>
          </div>
        )}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <div className="flex gap-3">
          <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <Heart className="w-5 h-5" />
            Add to Wishlist
          </button>
          <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-gray-700">
          <Truck className="w-5 h-5 text-blue-600" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>2-year warranty included</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          <span>30-day return policy</span>
        </div>
      </div>

      {/* Product Details */}
      {product.material && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex">
              <dt className="w-32 text-gray-600">Material:</dt>
              <dd className="text-gray-900 font-medium">{product.material}</dd>
            </div>
            {product.care && product.care.length > 0 && (
              <div className="flex">
                <dt className="w-32 text-gray-600">Care:</dt>
                <dd className="text-gray-900">
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
    </div>
  );
}
