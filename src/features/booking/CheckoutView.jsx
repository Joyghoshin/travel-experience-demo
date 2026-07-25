import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function CheckoutView() {
  const { selectedExperience, adults, childrenCount, totalPrice, selectedDate, goToSlots, confirmBooking } =
    useBooking();

  const [formData, setFormData] = useState({ name: '', email: '' });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    confirmBooking(formData);
  }

  return (
    <Card className="max-w-xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={goToSlots} className="text-xs font-semibold text-slate-500 hover:text-slate-800">
          ← Back
        </button>
        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">STEP 3 OF 3</span>
      </div>

      <h2 className="text-xl font-extrabold text-slate-900 mb-1">Secure Checkout</h2>
      <p className="text-xs text-slate-500 mb-6">Review your summary and complete your experience registration.</p>

      {/* Order Summary */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Experience</span>
          <span className="font-semibold text-slate-900">{selectedExperience?.title}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Date</span>
          <span className="font-semibold text-slate-900">{selectedDate}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tickets</span>
          <span className="font-semibold text-slate-900">
            {adults} Adult(s), {childrenCount} Child(ren)
          </span>
        </div>
        <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
          <span>Total Amount</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* Express Checkout mock */}
      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
        <span className="text-xs text-slate-500 block mb-2 font-medium uppercase tracking-wider">
          Express Checkout
        </span>
        <Button
          variant="dark"
          type="button"
          onClick={() => confirmBooking({ name: 'Express Checkout', email: '' })}
          className="w-full"
        >
          Pay with Apple / Google Pay
        </Button>
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400">or continue with email</span>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address (for instant ticket)
          </label>
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
        <Button type="submit" className="w-full mt-2">
          Confirm &amp; Pay ${totalPrice}
        </Button>
        {/* Honest disclaimer instead of the original's false "256-bit encryption" claim —
            no real payment gateway is wired up in this demo. */}
        <p className="text-center text-xs text-slate-400 mt-2">
          🛡️ This is a demo — no real payment is processed.
        </p>
      </form>
    </Card>
  );
}