import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import HeroSlider from '@/components/layout/HeroSlider';
import ProductGrid from '@/components/products/ProductGrid';
import Footer from '@/components/layout/Footer';
import { Truck, Shield, Zap } from 'lucide-react';
import {
  mockProducts,
  getNewProducts,
  getFeaturedProducts,
  getSpecialProducts,
  getBestsellers,
} from '@/data/products';

export const dynamic = 'force-dynamic';

export default function Home() {
  const newProducts = getNewProducts();
  const featuredProducts = getFeaturedProducts();
  const specialProducts = getSpecialProducts();
  const bestsellers = getBestsellers();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main>
        <HeroSlider />

        {/* Category Banners */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">Women</h3>
                    <p className="text-lg">Spring Collection</p>
                  </div>
                </div>
              </div>
              <div className="relative h-64 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">Men</h3>
                    <p className="text-lg">New Arrivals</p>
                  </div>
                </div>
              </div>
              <div className="relative h-64 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                <div className="relative h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">Accessories</h3>
                    <p className="text-lg">Up to 50% Off</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid
          newProducts={newProducts}
          featuredProducts={featuredProducts}
          specialProducts={specialProducts}
          bestsellers={bestsellers}
        />

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Truck className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">
                  Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Money Back Guarantee</h3>
                <p className="text-gray-600">
                  30-day money back guarantee. Shop with confidence and peace of mind.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Express delivery available. Get your order in 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
