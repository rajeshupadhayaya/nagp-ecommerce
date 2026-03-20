'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: '2026 Summer Collection',
    subtitle: 'Upgrade your style with us',
    description: 'All the fashion trends you need this season. Fill your closet right now.',
    buttonText: 'Go to Collection',
    bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600',
  },
  {
    id: 2,
    title: 'Super Elegant Shop',
    subtitle: 'Shop+ Collections',
    description: 'Men Collections • Women Collections • Awesome Accessories',
    buttonText: 'Shop Now',
    bgImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600',
  },
  {
    id: 3,
    title: 'Elegant & Functional Shop',
    subtitle: 'We designed for you',
    description: 'Beautiful and functional shop with many options and categories.',
    buttonText: 'Explore Now',
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h2 className="text-sm md:text-base font-semibold mb-2 uppercase tracking-wider">
                {slide.subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slide.description}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-2 rounded-full transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-2 rounded-full transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white text-sm font-semibold z-10">
        {currentSlide + 1}/{slides.length}
      </div>
    </section>
  );
}
