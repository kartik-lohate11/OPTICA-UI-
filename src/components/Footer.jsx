import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">OPTICA</h3>
            <p className="text-sm text-gray-300 mb-4">
              Premium eyewear that combines exceptional style with precision optics.
            </p>
            <div className="flex space-x-4" data-testid="social-links">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Shop Frames', 'Lenses', 'Brands', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {['FAQ', 'Shipping Info', 'Returns', 'Warranty', 'Track Order'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@optica.com</li>
              <li>Phone: 1-800-OPTICA</li>
              <li>Hours: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2025 OPTICA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
