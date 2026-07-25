import React from 'react';
import { useBooking } from '../context/BookingContext';

const STEPS = [
  { key: 'catalog', label: 'Explore' },
  { key: 'tiers', label: 'Tickets' },
  { key: 'slots', label: 'Date & Time' },
  { key: 'checkout', label: 'Checkout' },
];

export default function Navbar() {
  const { step } = useBooking();
  const activeIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <nav className="max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between">
      <span className="font-bold text-slate-900 text-sm">🧭 Travel &amp; Experience Booking</span>
      {activeIndex >= 0 && (
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.key}>
              <span className={i === activeIndex ? 'font-semibold text-indigo-600' : ''}>{s.label}</span>
              {i < STEPS.length - 1 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </nav>
  );
}