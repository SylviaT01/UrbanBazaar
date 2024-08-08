import React, { useState, useEffect } from "react";

useEffect(() => {
  const fetchPayments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/orders", {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setPayments(data.orders);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  fetchPayments();
  if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

export default Payments;
