'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ProductCategory, ProductSize } from '@/types';

interface CategoryFilterProps {
  onFilterChange: (filters: any) => void;
}

export default function CategorySidebar({ onFilterChange }: CategoryFilterProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true,
    brands: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500],
    colors: [] as string[],
    sizes: [] as string[],
    brands: [] as string[],
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  const handleCheckboxChange = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
    const currentValues = selectedFilters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newFilters = { ...selectedFilters, [category]: newValues };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (category: keyof typeof selectedFilters, value: string) => {
    const currentValues = selectedFilters[category] as string[];
    const newValues = currentValues.filter((v) => v !== value);
    const newFilters = { ...selectedFilters, [category]: newValues };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      categories: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      brands: [],
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const categories = [
    { name: 'Women\'s Clothing', count: 156 },
    { name: 'Men\'s Clothing', count: 142 },
    { name: 'Accessories', count: 48 },
    { name: 'Shoes', count: 85 },
    { name: 'Activewear', count: 64 },
  ];

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Yellow', hex: '#FFFF00' },
  ];

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada'];

  const hasActiveFilters =
    selectedFilters.categories.length > 0 ||
    selectedFilters.colors.length > 0 ||
    selectedFilters.sizes.length > 0 ||
    selectedFilters.brands.length > 0;

  return (
    <aside className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Active Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>
          <div className="space-y-2">
            {selectedFilters.categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span className="text-sm">{cat}</span>
                <button
                  onClick={() => clearFilter('categories', cat)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {selectedFilters.colors.map((color) => (
              <div
                key={color}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span className="text-sm">{color}</span>
                <button
                  onClick={() => clearFilter('colors', color)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {selectedFilters.sizes.map((size) => (
              <div
                key={size}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span className="text-sm">Size: {size}</span>
                <button
                  onClick={() => clearFilter('sizes', size)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between p-4 font-semibold text-gray-900"
        >
          Categories
          {openSections.categories ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSections.categories && (
          <div className="px-4 pb-4 space-y-2">
            {categories.map((cat) => (
              <label key={cat.name} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(cat.name)}
                  onChange={() => handleCheckboxChange('categories', cat.name)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {cat.name} ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 font-semibold text-gray-900"
        >
          Price Range
          {openSections.price ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSections.price && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">
                ${selectedFilters.priceRange[0]}
              </span>
              <span className="text-sm text-gray-600">
                ${selectedFilters.priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={selectedFilters.priceRange[1]}
              onChange={(e) => {
                const newFilters = {
                  ...selectedFilters,
                  priceRange: [0, parseInt(e.target.value)],
                };
                setSelectedFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between p-4 font-semibold text-gray-900"
        >
          Colors
          {openSections.colors ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSections.colors && (
          <div className="px-4 pb-4 grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleCheckboxChange('colors', color.name)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedFilters.colors.includes(color.name)
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => toggleSection('sizes')}
          className="w-full flex items-center justify-between p-4 font-semibold text-gray-900"
        >
          Sizes
          {openSections.sizes ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSections.sizes && (
          <div className="px-4 pb-4 grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleCheckboxChange('sizes', size)}
                className={`py-2 px-4 rounded-lg border transition-all ${
                  selectedFilters.sizes.includes(size)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between p-4 font-semibold text-gray-900"
        >
          Brands
          {openSections.brands ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {openSections.brands && (
          <div className="px-4 pb-4 space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.brands.includes(brand)}
                  onChange={() => handleCheckboxChange('brands', brand)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
