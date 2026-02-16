import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, Eye, CheckCircle } from 'lucide-react';

const BookEyeTestModal = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Success
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
    // Here you would send data to your backend
    console.log('Booking submitted:', formData);
    setStep(2); // Show success message
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
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {step === 1 ? (
            <>
              {/* Header */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="space-y-5">
                  {/* Personal Information Section */}
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

                  {/* Appointment Details Section */}
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

                  {/* Additional Information Section */}
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

                  {/* Submit Button */}
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
            // Success Screen
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

export default BookEyeTestModal;
