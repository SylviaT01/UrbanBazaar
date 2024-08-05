import React, { useState } from 'react';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };