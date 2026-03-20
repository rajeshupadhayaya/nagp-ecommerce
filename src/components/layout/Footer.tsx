import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-semibold text-white">Subscribe to Our Newsletter</h3>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-lg bg-white text-gray-900 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm mb-4">
              Shop+ is your destination for quality clothing and accessories. We offer the latest trends
              with exceptional customer service.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Valencia Road, Dumaguete city, Italy</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+ 1 (800) 2364 332 23 16</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>your@email.com</span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Wish List
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/women" className="hover:text-white transition-colors">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/men" className="hover:text-white transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="hover:text-white transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-white transition-colors">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © 2026 Shop+. All rights reserved. Made with ❤️ for fashion lovers
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
