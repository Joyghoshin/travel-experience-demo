import React from 'react';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function DateSlotPicker() {
  const {
    selectedExperience,
    basePrice,
    adults,
    childrenCount,
    totalPrice,
    selectedDate,
    setSelectedDate,
    selectedSlotId,
    setSelectedSlotId,
    goToTiers,
    goToCheckout,
  } = useBooking();

  const slots = selectedExperience?.availableSlots || [];

  return (
    <Card className="max-w-xl mx-auto p-8">
      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">STEP 2 OF 3</span>
      <h2 className="text-xl font-extrabold text-slate-900 mt-3 mb-1">Choose Date &amp; Time Slot</h2>
      <p className="text-sm text-slate-500 mb-6">{selectedExperience?.title}</p>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-700 mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 text-sm"
        />
      </div>

      <label className="block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">
        Available Time Slots
      </label>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {slots.map((slot) => {
          const isSelected = selectedSlotId === slot.id;
          return (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => setSelectedSlotId(slot.id)}
              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                !slot.available
                  ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 text-slate-900 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="block font-semibold text-sm">{slot.time}</span>
                <span className="block text-xs text-slate-500">{slot.category} Session</span>
              </div>
              <span className="text-xs font-medium">
                {!slot.available ? 'Sold Out' : isSelected ? 'Selected' : 'Available'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
        <div className="flex items-center justify-between py-1 text-sm">
          <span className="text-slate-600">Adults ({adults}) × ${basePrice}</span>
          <span className="font-semibold">${adults * basePrice}</span>
        </div>
        {childrenCount > 0 && (
          <div className="flex items-center justify-between py-1 text-sm">
            <span className="text-slate-600">
              Children ({childrenCount}) × ${Math.round(basePrice * 0.6)}
            </span>
            <span className="font-semibold">${childrenCount * Math.round(basePrice * 0.6)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="block text-xs text-slate-500">Total Amount</span>
          <span className="text-xl font-extrabold text-slate-900">${totalPrice}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={goToTiers}>
            ← Back
          </Button>
          <Button onClick={goToCheckout} disabled={!selectedSlotId}>
            Continue to Checkout →
          </Button>
        </div>
      </div>
    </Card>
  );
}