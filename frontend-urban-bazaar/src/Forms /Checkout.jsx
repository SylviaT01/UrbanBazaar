import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderTotal, setOrderTotal] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [authToken, setAuthToken] = useState("");
  const { authToken: contextToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState({
    numberOfItems: 0,
    totalPrice: 0,
    shippingAndHandling: 50, // Fixed price
    beforeTax: 0,
    taxCollected: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    const fetchCartData = async () => {
      const token =
        authToken || contextToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setOrderTotal(
          result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
        const totalPrice = result.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shippingAndHandling = 50;
        const beforeTax = totalPrice + shippingAndHandling;
        const taxCollected = beforeTax * 0.16; // 16% tax
        const orderTotal = beforeTax + taxCollected;

        setOrderSummary({
          numberOfItems: result.cart.length,
          totalPrice,
          shippingAndHandling,
          orderTotal,
          beforeTax,
        })
    

      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, [authToken, contextToken]);
  console.log(orderSummary)

  const handleShippingFormSubmit = async (e) => {
    e.preventDefault();
    const token =
      authToken || contextToken || localStorage.getItem("access_token");

    const shippingData = {
      name: `${firstName} ${lastName}`,
      street_address: streetAddress,
      apartment_number: apartmentNumber,
      city,
      zip_code: zip,
    };

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shippingData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setCurrentStep(2);
    } catch (error) {
      console.error("Error submitting shipping form:", error);
    }
  };

  const handlePaymentFormSubmit = async (e) => {
    e.preventDefault();
    const token =
      authToken || contextToken || localStorage.getItem("access_token");

    const paymentData = {
      email: email,
    };

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setCurrentStep(3); // Proceed to PayPal payment
    } catch (error) {
      console.error("Error submitting payment form:", error);
    }
  };

  const handlePaymentWithPayPal = async () => {
    const token =
      authToken || contextToken || localStorage.getItem("access_token");

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_total: orderTotal }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      window.location.href = result.payment_link; // Redirect to PayPal for payment
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const handleCheckout = async () => {
    const token =
      authToken || contextToken || localStorage.getItem("access_token");

    const checkoutData = {
      shipping_address: {
        name: `${firstName} ${lastName}`,
        street_address: streetAddress,
        apartment_number: apartmentNumber,
        city,
        zip_code: zip,
      },
      payment_method: email,
    };

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checkoutData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log("Checkout successful:", result);
      navigate("/order-complete"); // Redirect after successful checkout
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
      <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
        {/* Shipping Address Form */}
        {currentStep === 1 && (
          <div className="w-full mr-4">
            <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
              Shipping Address
            </h2>
            <form onSubmit={handleShippingFormSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Apartment Number"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment Method Form */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
              Payment Information
            </h2>
            <form onSubmit={handlePaymentFormSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save Payment Info
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Order Summary and PayPal Payment */}
        {currentStep === 3 && (
          <div>
            {/* <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
              Order Summary
            </h2>
            <div className="mb-4 flex justify-center">
              <p>Total: Ksh. {orderTotal.toFixed(2)}</p>
            </div> */}

<div className="flex justify-between mb-2">
                <span>Items ({orderSummary.numberOfItems})</span>
                <span>Ksh. {orderSummary.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping & Handling</span>
                <span>Ksh. {orderSummary.shippingAndHandling.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Before Tax</span>
                <span>Ksh. {orderSummary.beforeTax}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Collected</span>
                <span>Ksh. {orderSummary.taxCollected}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Order Total</span>
                <span>Ksh.{orderSummary.orderTotal.toFixed(2)}</span>
                </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
          onClick={() => setCurrentStep(2)}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handlePaymentWithPayPal}
        >
          Pay with PayPal
        </button>
      </div>
    </div>
  )
}
      </div >
    </div >
  );
}

export default Checkout;