'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Women',
      href: '/category/women',
      submenu: [
        { label: 'Dresses', href: '/category/women/dresses' },
        { label: 'Tops', href: '/category/women/tops' },
        { label: 'Jackets', href: '/category/women/jackets' },
        { label: 'Shoes', href: '/category/women/shoes' },
      ],
    },
    {
      label: 'Men',
      href: '/category/men',
      submenu: [
        { label: 'Shirts', href: '/category/men/shirts' },
        { label: 'Jeans', href: '/category/men/jeans' },
        { label: 'Jackets', href: '/category/men/jackets' },
        { label: 'Shoes', href: '/category/men/shoes' },
      ],
    },
    { label: 'Accessories', href: '/category/accessories' },
    { label: 'Search', href: '/search' },
    { label: 'Sale', href: '/sale' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center h-14">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 top-full mt-0 w-48 bg-white text-gray-900 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <ul className="py-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between h-14">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-semibold">MENU</span>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
