import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, Settings, Mail, Phone, ChevronDown, Eye, EyeOff, Lock, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// AuthModal Component
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    
    if (onLogin) {
      onLogin(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-center text-black">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              {isLogin ? 'Login to your account' : 'Sign up to get started'}
            </p>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-black hover:underline font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all mt-6"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
                  }}
                  className="text-black font-semibold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// UserDropdown Component
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold text-sm">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="hidden md:block text-sm font-medium text-black">
          {user.name?.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black truncate">{user.name}</p>
                  <p className="text-sm text-gray-600">ID: {user.id}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3 border-b border-gray-200">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
              )}
            </div>

            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-black">My Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-black">Settings</span>
              </button>
            </div>

            <div className="p-2 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-left group"
              >
                <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                <span className="text-sm font-medium text-black group-hover:text-red-600">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// BookEyeTestModal Component
const BookEyeTestModal = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    time: '',
    location: '',
    concerns: '',
    previousTest: '',
    wearGlasses: 'no',
    preferredDoctor: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      date: '',
      time: '',
      location: '',
      concerns: '',
      previousTest: '',
      wearGlasses: 'no',
      preferredDoctor: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {step === 1 ? (
            <>
              <div className="relative p-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black">Book Eye Test</h2>
                    <p className="text-sm text-gray-600">Schedule your comprehensive eye examination</p>
                  </div>
                </div>
                
                {user && (
                  <div className="mt-3 px-4 py-2 bg-black/5 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Booking for:</span> {user.name}
                    </p>
                  </div>
                )}
                
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          When was your last eye test?
                        </label>
                        <select
                          name="previousTest"
                          value={formData.previousTest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        >
                          <option value="">Select...</option>
                          <option value="never">Never had one</option>
                          <option value="6months">Within 6 months</option>
                          <option value="1year">1 year ago</option>
                          <option value="2years">2 years ago</option>
                          <option value="3+years">3+ years ago</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Appointment Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Preferred Time <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select time...</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-black">
                          Preferred Location <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select location...</option>
                          <option value="connaught">Connaught Place, Delhi</option>
                          <option value="saket">Saket, Delhi</option>
                          <option value="dwarka">Dwarka, Delhi</option>
                          <option value="gurgaon">Cyber City, Gurgaon</option>
                          <option value="noida">Sector 18, Noida</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Preferred Doctor (Optional)
                        </label>
                        <input
                          type="text"
                          name="preferredDoctor"
                          value={formData.preferredDoctor}
                          onChange={handleChange}
                          placeholder="Dr. Name"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-black">
                          Do you currently wear glasses?
                        </label>
                        <div className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="wearGlasses"
                              value="yes"
                              checked={formData.wearGlasses === 'yes'}
                              onChange={handleChange}
                              className="w-4 h-4 accent-black"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="wearGlasses"
                              value="no"
                              checked={formData.wearGlasses === 'no'}
                              onChange={handleChange}
                              className="w-4 h-4 accent-black"
                            />
                            <span className="text-sm text-gray-700">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Additional Information
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-black">
                        Any specific concerns or symptoms? (Optional)
                      </label>
                      <textarea
                        name="concerns"
                        value={formData.concerns}
                        onChange={handleChange}
                        placeholder="E.g., Blurry vision, eye strain, headaches, etc."
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Confirm Booking
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      You will receive a confirmation email and SMS shortly
                    </p>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-black mb-3">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">Your eye test appointment has been successfully scheduled</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-black">{formData.fullName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold text-black">
                      {new Date(formData.date).toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {formData.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-black">{formData.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                >
                  Done
                </button>
                <p className="text-sm text-gray-500">
                  Confirmation sent to <span className="font-medium text-black">{formData.email}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Main Header Component
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navLinks = [
    { name: 'Shop Frames', href: '#products' },
    { name: 'Lenses', href: '#lenses' },
    { name: 'Brands', href: '#brands' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleLogin = (formData) => {
    setUser({
      id: 'USR' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone || '+91 98765 43210'
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleBookEyeTest = () => {
    if (!user) {
      // If not logged in, prompt to login first
      alert('Please login first to book an eye test');
      setIsAuthModalOpen(true);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">OPTICA</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </button>

              {user ? (
                <UserDropdown user={user} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  Login
                </button>
              )}

              <Button 
                onClick={handleBookEyeTest}
                className="hidden lg:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Book Eye Test
              </Button>

              <button
                className="md:hidden p-2 rounded-md text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-base font-medium text-gray-700 hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <div className="pt-3 border-t border-gray-200">
                  <UserDropdown user={user} onLogout={handleLogout} />
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold"
                >
                  Login
                </button>
              )}

              <Button 
                onClick={() => {
                  handleBookEyeTest();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg"
              >
                Book Eye Test
              </Button>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <BookEyeTestModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        user={user}
      />
    </>
  );
};
