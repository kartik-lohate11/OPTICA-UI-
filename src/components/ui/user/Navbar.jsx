import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import AuthModal from './AuthModal';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null); // null when not logged in

  // Mock login function - replace with your actual authentication logic
  const handleLogin = (userData) => {
    // This is where you'd validate credentials and get user data from your backend
    setUser({
      id: '12345',
      name: userData.name || 'John Doe',
      email: userData.email,
      phone: userData.phone || '+1 (555) 123-4567'
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    // Add any additional logout logic here (clear tokens, etc.)
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">OPTICA</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                Shop Frames
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                Lenses
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                Brands
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                Reviews
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                FAQ
              </a>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Shopping Cart */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 text-black" />
              </button>

              {/* Login/Signup or User Dropdown */}
              {user ? (
                <UserDropdown user={user} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Login
                </button>
              )}

              {/* Book Eye Test Button */}
              <button className="hidden lg:block px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95">
                Book Eye Test
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200">
              Shop Frames
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200">
              Lenses
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200">
              Brands
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200">
              Reviews
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200">
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
