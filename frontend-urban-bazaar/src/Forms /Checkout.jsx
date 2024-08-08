import React, { useState } from "react";
import mpesa from "../assets/mpesa.png";
import pesapal from "../assets/pesapal.png";
import Paypal from "../assets/Paypal.png";
function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
              1
            </div>
            <span className="ml-2 text-gray-600">cart</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
              2
            </div>
            <span className="ml-2 text-gray-600">checkout</span>
          </div>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 mr-4">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <form>
              <div className="flex mb-4">
                <label className="mr-2 flex items-center">
                  <input type="radio" name="address" className="mr-2" />
                  Add New Address
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Apartment Number"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Zip"
                  className="border p-2 rounded w-full"
                />
              </div>
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
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-4">Place your order</h2>
            <button className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4">
              Place Order
            </button>
            <p className="text-sm text-gray-600 mb-4">
              By placing your order, you agree to our company's Privacy Policy
              and Conditions of Use.
            </p>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Items (3)</span>
                <span>$64.23</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping & Handling</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Before Tax</span>
                <span>$70.22</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Collected</span>
                <span>$0.22</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Order Total</span>
                <span>$70.44</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6  h-[1000px]">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <form className="mx-auto max-w-sm space-y-32 flex flex-col items-center">
            <div className="flex items-center mb-4 s">
              <section className="flex flex-col rounded-none max-w-[731px]">
                <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-6 my-auto">
                    <input
                      type="radio"
                      id="mpesa"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === "mpesa"}
                      onChange={() => handlePaymentMethodChange("mpesa")}
                      className="mr-2"
                    />
                    <div
                      className="flex justify-center"
                      style={{ gap: "450px" }}
                    >
                      <h2 className="my-auto text-2xl font-light text-black">
                        M-Pesa
                      </h2>
                      <img src={mpesa} alt="M-pesa" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {paymentMethod === "mpesa" && (
              <div className="mb-4 space-y-6">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-2 rounded w-full"
                />
                <div className="flex justify-between gap-4">
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
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
            <div className="flex items-center mt-4">
              <section className="flex flex-col rounded-none max-w-[731px]">
                <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-6 my-auto">
                    <input
                      type="radio"
                      id="pesapal"
                      name="paymentMethod"
                      value="pesapal"
                      checked={paymentMethod === "pesapal"}
                      onChange={() => handlePaymentMethodChange("pesapal")}
                      className="mr-2"
                    />
                    <div
                      className="flex justify-between"
                      style={{ gap: "400px" }}
                    >
                      <h2 className="my-auto text-2xl font-light text-black">
                        Pesapal
                      </h2>
                      <img src={pesapal} alt="Pesapal" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {paymentMethod === "pesapal" && (
              <div className="mb-4 space-y-6">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="border p-2 rounded w-full"
                />
                <div className="flex justify-between gap-4">
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
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center mt-4 gap-4">
              <section className="flex flex-col rounded-none max-w-[731px]">
                <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-6 my-auto">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => handlePaymentMethodChange("paypal")}
                      className="mr-2"
                    />
                    <div
                      className="flex justify-center"
                      style={{ gap: "450px" }}
                    >
                      <h2 className="my-auto text-2xl font-light text-black">
                        Paypal
                      </h2>
                      <img src={Paypal} alt="Paypal" />
                    </div>
                  </div>
                </div>
              </section>
              {paymentMethod === "paypal" && (
                <div className="mb-4 space-y-6">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="border p-2 rounded w-full"
                  />
                  <div className="flex justify-between gap-4">
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
                      Confirm Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
