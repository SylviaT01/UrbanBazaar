import React, { useState } from 'react';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">1</div>
            <span className="ml-2 text-gray-600">cart</span>
          </div>
