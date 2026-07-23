import React, { useState } from 'react';
import { experienceData } from '../../data/experiences';

const DateSlotPicker = ({ onBack, onNext }) => {
  const [selectedDate, setSelectedDate] = useState('2026-07-25');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketCount, setTicketCount] = useState({ adults: 2, children: 0 });

  // Generate mock upcoming dates for the calendar row
  const upcomingDates = [
    { day: 'Wed', date: '25', full: '2026-07-25' },
    { day: 'Thu', date: '26', full: '2026-07-26' },
    { day: 'Fri', date: '27', full: '2026-07-27' },
    { day: 'Sat', date: '28', full: '2026-07-28' },
    { day: 'Sun', date: '29', full: '2026-07-29' },
  ];

  const handleUpdateCount = (type, delta) => {
    setTicketCount(prev => {
      const updated = prev[type] + delta;
      if (updated < 0) return prev;
      if (type === 'adults' && updated < 1) return prev; // At least 1 adult required
      return { ...prev, [type]: updated };
    });
  };

  const handleContinue = () => {
    if (!selectedSlot) return;
    onNext({
      date: selectedDate,
      slot: selectedSlot,
      tickets: ticketCount
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Back to Experience
        </button>
        <h3 className="text-lg font-bold text-slate-900">Select Date & Time</h3>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      {/* Date Selector Row */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-700 block mb-3 uppercase tracking-wider">
          1. Choose Date
        </label>
        <div className="grid grid-cols-5 gap-2">
          {upcomingDates.map((item) => {
            const isSelected = selectedDate === item.full;
            return (
              <button
                key={item.full}
                onClick={() => setSelectedDate(item.full)}
                className={`py-3 px-2 rounded-xl border text-center transition-all ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' 
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="block text-xs font-medium opacity-80">{item.day}</span>
                <span className="block text-lg font-bold">{item.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Chips */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-700 block mb-3 uppercase tracking-wider">
          2. Choose Time Slot
        </label>
        <div className="grid grid-cols-2 gap-3">
          {experienceData.availableSlots.map((slot) => {
            const isSelected = selectedSlot === slot.id;
            return (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot.id)}
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
                  {!slot.available ? 'Sold Out' : (isSelected ? 'Selected' : 'Available')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ticket Counter */}
      <div className="mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="text-xs font-semibold text-slate-700 block mb-3 uppercase tracking-wider">
          3. Attendees
        </label>
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <div>
            <span className="block text-sm font-medium text-slate-900">Adults (18+)</span>
            <span className="block text-xs text-slate-500">${experienceData.basePrice} per ticket</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleUpdateCount('adults', -1)}
              className="w-8 h-8 rounded-lg border border-slate-300 bg-white text-slate-600 font-bold hover:bg-slate-100"
            >
              -
            </button>
            <span className="font-semibold text-slate-900 w-4 text-center">{ticketCount.adults}</span>
            <button 
              onClick={() => handleUpdateCount('adults', 1)}
              className="w-8 h-8 rounded-lg border border-slate-300 bg-white text-slate-600 font-bold hover:bg-slate-100"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="block text-sm font-medium text-slate-900">Children (Under 18)</span>
            <span className="block text-xs text-slate-500">$20 per ticket</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleUpdateCount('children', -1)}
              className="w-8 h-8 rounded-lg border border-slate-300 bg-white text-slate-600 font-bold hover:bg-slate-100"
            >
              -
            </button>
            <span className="font-semibold text-slate-900 w-4 text-center">{ticketCount.children}</span>
            <button 
              onClick={() => handleUpdateCount('children', 1)}
              className="w-8 h-8 rounded-lg border border-slate-300 bg-white text-slate-600 font-bold hover:bg-slate-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <button
        disabled={!selectedSlot}
        onClick={handleContinue}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-colors shadow-sm text-center ${
          !selectedSlot 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
        }`}
      >
        Continue to Upsell Tiers
      </button>
    </div>
  );
};

export default DateSlotPicker;