import React, { useState } from 'react';

const CheckoutView = ({ bookingDetails, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '4242 •••• •••• 4242',
    exp: '12/28',
    cvc: '321',
    zip: '56001'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Back to Tiers
        </button>
        <h3 className="text-lg font-bold text-slate-900">Secure Checkout</h3>
        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Step 3/3</span>
      </div>

      {/* Express Checkout Mock */}
      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
        <span className="text-xs text-slate-500 block mb-2 font-medium uppercase tracking-wider">Express Checkout</span>
        <button 
          type="button"
          onClick={() => onSuccess(formData)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <span> Pay / Google Pay Instant Checkout</span>
        </button>
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400">or pay with card</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (for instant ticket)</label>
          <input 
            type="email" 
            name="email"
            required
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
          <input 
            type="text" 
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">MM/YY</label>
            <input 
              type="text" 
              name="exp"
              value={formData.exp}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
            <input 
              type="text" 
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Zip Code</label>
            <input 
              type="text" 
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
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