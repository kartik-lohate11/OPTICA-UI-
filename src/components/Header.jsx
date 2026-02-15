import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Shop Frames', href: '#products' },
    { name: 'Lenses', href: '#lenses' },
    { name: 'Brands', href: '#brands' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">OPTICA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="cart-button"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </button>
            <Button 
              className="hidden md:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-all"
              data-testid="book-eye-test-button"
            >
              Book Eye Test
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-base font-medium text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
              data-testid="mobile-book-eye-test-button"
            >
              Book Eye Test
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
