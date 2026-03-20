/**
 * Product related types and interfaces for the e-commerce store
 */

export type ProductCategory = 
  | 'mens-clothing'
  | 'womens-clothing'
  | 'kids-clothing'
  | 'accessories'
  | 'shoes'
  | 'activewear';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  category: ProductCategory;
  subcategory?: string;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: {
    [key: string]: number; // key: "size-color", value: quantity
  };
  rating?: number;
  reviewCount?: number;
  material?: string;
  care?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  sizes?: ProductSize[];
  colors?: string[];
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'rating';
}
