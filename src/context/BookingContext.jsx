import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [step, setStep] = useState('catalog'); // catalog | tiers | slots | checkout | confirmed
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState('2026-07-28');
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  const basePrice = selectedExperience?.basePrice ?? selectedExperience?.price ?? 38;
  const totalPrice = adults * basePrice + childrenCount * Math.round(basePrice * 0.6);

  function selectExperience(exp) {
    setSelectedExperience(exp);
    setStep('tiers');
  }

  function goToCatalog() {
    setStep('catalog');
  }

  function goToTiers() {
    setStep('tiers');
  }

  function goToSlots() {
    setStep('slots');
  }

  function goToCheckout() {
    setStep('checkout');
  }

  function confirmBooking(info) {
    setContactInfo(info);
    setStep('confirmed');
  }

  function resetBooking() {
    setStep('catalog');
    setSelectedExperience(null);
    setAdults(2);
    setChildrenCount(0);
    setSelectedDate('2026-07-28');
    setSelectedSlotId(null);
    setContactInfo(null);
  }

  const value = {
    step,
    selectedExperience,
    adults,
    childrenCount,
    selectedDate,
    selectedSlotId,
    contactInfo,
    basePrice,
    totalPrice,
    setAdults,
    setChildrenCount,
    setSelectedDate,
    setSelectedSlotId,
    selectExperience,
    goToCatalog,
    goToTiers,
    goToSlots,
    goToCheckout,
    confirmBooking,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return ctx;
}