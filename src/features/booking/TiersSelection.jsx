import React from 'react';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function TiersSelection() {
  const {
    selectedExperience,
    adults,
    childrenCount,
    basePrice,
    totalPrice,
    setAdults,
    setChildrenCount,
    goToCatalog,
    goToSlots,
  } = useBooking();

  return (
    <Card className="max-w-xl mx-auto p-8">
      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">STEP 1 OF 3</span>
      <h2 className="text-xl font-extrabold text-slate-900 mt-3 mb-1">Select Visitors &amp; Tiers</h2>
      <p className="text-sm text-slate-500 mb-6">{selectedExperience?.title}</p>

      {/* Adult Counter */}
      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div>
          <div className="font-semibold text-sm text-slate-900">Adult Ticket</div>
          <div className="text-xs text-slate-500">Ages 13+ • ${basePrice} each</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdults(Math.max(1, adults - 1))}
            className="w-8 h-8 rounded-lg border border-slate-300 font-bold"
          >
            -
          </button>
          <span className="w-5 text-center font-bold">{adults}</span>
          <button
            onClick={() => setAdults(adults + 1)}
            className="w-8 h-8 rounded-lg border border-slate-300 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Child Counter */}
      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div>
          <div className="font-semibold text-sm text-slate-900">Child Ticket</div>
          <div className="text-xs text-slate-500">Ages 3-12 • ${Math.round(basePrice * 0.6)} each</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
            className="w-8 h-8 rounded-lg border border-slate-300 font-bold"
          >
            -
          </button>
          <span className="w-5 text-center font-bold">{childrenCount}</span>
          <button
            onClick={() => setChildrenCount(childrenCount + 1)}
            className="w-8 h-8 rounded-lg border border-slate-300 font-bold"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <span className="block text-xs text-slate-500">Total Amount</span>
          <span className="text-xl font-extrabold text-slate-900">${totalPrice}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={goToCatalog}>
            ← Back
          </Button>
          <Button onClick={goToSlots}>Select Date &amp; Time →</Button>
        </div>
      </div>
    </Card>
  );
}