import React, { useState } from 'react';

const CheckoutView = ({ bookingDetails, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-200 font-sans">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          ← Back to Tiers
        </button>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Step 4 of 4: Checkout
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">Secure Checkout</h2>
      <p className="text-xs text-slate-500 mb-6">Review your summary and complete your experience registration.</p>

      {/* Order Summary Box */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Selected Tier</span>
          <span className="font-semibold text-slate-900 capitalize">{bookingDetails?.tier || 'Standard'} Pass</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tickets</span>
          <span className="font-semibold text-slate-900">
            {bookingDetails?.tickets?.adults || 2} Adults, {bookingDetails?.tickets?.children || 0} Children
          </span>
        </div>
        <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
          <span>Total Amount</span>
          <span>${bookingDetails?.total || 56}.00</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-xs"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-xs"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
          <input 
            type="text" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 text-xs"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-medium text-sm transition-colors shadow-sm mt-6"
        >
          Confirm & Pay ${bookingDetails?.total || 56}
        </button>
        <p className="text-center text-xs text-slate-400 mt-2">🛡️ 256-bit Secure Encryption • Free Cancellation</p>
      </form>
    </div>
  );
};

export default CheckoutView;