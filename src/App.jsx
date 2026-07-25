import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogView from './components/CatalogView';
import TiersSelection from './features/booking/TiersSelection';
import DateSlotPicker from './features/booking/DateSlotPicker';
import CheckoutView from './features/booking/CheckoutView';
import Card from './components/ui/Card';
import Button from './components/ui/Button';

function BookingFlow() {
  const { step, selectedExperience, selectExperience, resetBooking, contactInfo, totalPrice } = useBooking();

  if (step === 'catalog') {
    return <CatalogView onSelectExperience={selectExperience} />;
  }
  if (step === 'tiers') return <TiersSelection />;
  if (step === 'slots') return <DateSlotPicker />;
  if (step === 'checkout') return <CheckoutView />;

  if (step === 'confirmed') {
    return (
      <Card className="max-w-xl mx-auto p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Booking Confirmed!</h2>
        <p className="text-sm text-slate-500 mb-6">
          {selectedExperience?.title} — ${totalPrice} total. A confirmation would be emailed to{' '}
          {contactInfo?.email || 'you'} in a real booking system.
        </p>
        <Button onClick={resetBooking}>Book Another Experience</Button>
      </Card>
    );
  }

  return null;
}

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-slate-50 py-6">
        <Navbar />
        <div className="mt-6">
          <BookingFlow />
        </div>
        <Footer />
      </div>
    </BookingProvider>
  );
}