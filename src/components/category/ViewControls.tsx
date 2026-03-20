'use client';

import { Grid, List } from 'lucide-react';

interface ViewControlsProps {
  viewType: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

export default function ViewControls({
  viewType,
  onViewChange,
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
}: ViewControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Show:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 transition-colors ${
                viewType === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 transition-colors ${
                viewType === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
