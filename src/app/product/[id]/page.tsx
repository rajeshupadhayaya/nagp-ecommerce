import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { mockProducts as products } from '@/data/products';
import { Product } from '@/types';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <Navigation />
      
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href={`/category/${product.category.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <RelatedProducts products={products} currentProductId={product.id} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Generate static params for all products (optional for SSR optimization)
export async function generateStaticParams() {
  return products.map((product: Product) => ({
    id: product.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Fashion Store`,
    description: product.description,
  };
}
