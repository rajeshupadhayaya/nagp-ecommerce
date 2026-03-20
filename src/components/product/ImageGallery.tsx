'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { ProductImage } from '@/types';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <div
          className="relative w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <Image
            src={images[selectedImage].url}
            alt={images[selectedImage].alt || productName}
            fill
            className={`object-cover transition-transform duration-200 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
            priority
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-80 text-gray-900 px-3 py-2 rounded-lg text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
          Hover to zoom
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {selectedImage + 1} / {images.length}
      </div>
    </div>
  );
}
