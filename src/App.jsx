import React, { useState } from 'react';
import CatalogView from './components/CatalogView';

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [step, setStep] = useState('catalog');
  
  // Booking state details
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState('2026-07-28');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');

  const handleSelectExperience = (exp) => {
    setSelectedExperience(exp);
    setStep('tiers');
  };

  const basePrice = selectedExperience?.price || 38;
  const totalPrice = (adults * basePrice) + (children * Math.round(basePrice * 0.6));

  return (
    <div className="app-root" style={{ padding: '20px', fontFamily: 'inherit', color: '#1e293b' }}>
      
      {/* STEP 1: CATALOG VIEW */}
      {step === 'catalog' && (
        <CatalogView onSelectExperience={handleSelectExperience} />
      )}

      {/* STEP 2: TIER & PARTICIPANT SELECTION */}
      {step === 'tiers' && (
        <div style={{ maxWidth: '650px', margin: '40px auto', background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', background: '#e0e7ff', padding: '4px 8px', borderRadius: '4px' }}>STEP 2 OF 3</span>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '12px 0 6px 0' }}>Select Visitors & Tiers</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>{selectedExperience?.title}</p>

          {/* Adult Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Adult Ticket</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Ages 13+ • ${basePrice} each</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >-</button>
              <span style={{ fontSize: '16px', fontWeight: '700', width: '20px', textAlign: 'center' }}>{adults}</span>
              <button 
                onClick={() => setAdults(adults + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >+</button>
            </div>
          </div>

          {/* Child Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Child Ticket</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Ages 3-12 • ${Math.round(basePrice * 0.6)} each</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => setChildren(Math.max(0, children - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >-</button>
              <span style={{ fontSize: '16px', fontWeight: '700', width: '20px', textAlign: 'center' }}>{children}</span>
              <button 
                onClick={() => setChildren(children + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >+</button>
            </div>
          </div>

          {/* Total & Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Total Amount</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>${totalPrice}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setStep('catalog')}
                style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                ← Back
              </button>
              <button 
                onClick={() => setStep('slots')}
                style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                Select Date & Time →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME SLOT PICKER */}
      {step === 'slots' && (
        <div style={{ maxWidth: '650px', margin: '40px auto', background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', background: '#e0e7ff', padding: '4px 8px', borderRadius: '4px' }}>STEP 3 OF 3</span>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '12px 0 6px 0' }}>Choose Date & Time Slot</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>{selectedExperience?.title}</p>

          {/* Date Picker Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Select Date</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          {/* Time Slot Buttons */}
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Available Time Slots</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '30px' }}>
            {['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'].map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: selectedTimeSlot === slot ? '2px solid #6366f1' : '1px solid #cbd5e1',
                  background: selectedTimeSlot === slot ? '#e0e7ff' : '#fff',
                  color: selectedTimeSlot === slot ? '#4338ca' : '#1e293b',
                  fontWeight: selectedTimeSlot === slot ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Summary Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Summary</span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{adults} Adult(s), {children} Child(ren) • {selectedDate} @ {selectedTimeSlot}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setStep('tiers')}
                style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                ← Back
              </button>
              <button 
                onClick={() => alert(`Booking Confirmed! Experience: ${selectedExperience?.title}, Date: ${selectedDate}, Time: ${selectedTimeSlot}, Total: $${totalPrice}`)}
                style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#10b981', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                Confirm & Pay (${totalPrice}) ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}