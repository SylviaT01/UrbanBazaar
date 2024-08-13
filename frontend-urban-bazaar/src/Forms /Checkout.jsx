// import React, { useContext, useState } from "react";
// import mpesa from "../assets/mpesa.png";
// import pesapal from "../assets/pesapal.png";
// import Paypal from "../assets/Paypal.png";
// import { UserContext } from "../contexts/userContext";
// function Checkout() {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const { currentUser, authToken } = useContext(UserContext);

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const shippingData = {
//       firstName,
//       lastName,
//       streetAddress,
//       apartmentNumber,
//       city,
//       zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(shippingData),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Shipping data submitted:", result);
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const paymentData = {
//       paymentMethod,
//       ...(paymentMethod === "mpesa" && {
//         phoneNumber: e.target.phoneNumber.value,
//       }),
//       ...(paymentMethod === "pesapal" && {
//         emailAddress: e.target.emailAddress.value,
//       }),
//       ...(paymentMethod === "paypal" && {
//         paypalEmail: e.target.paypalEmail.value,
//       }),
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Payment data submitted:", result);
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-8 min-h-screen">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         <div className="flex justify-between mb-4">
//           <div className="flex items-center">
//             <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
//               1
//             </div>
//             <span className="ml-2 text-gray-600">cart</span>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
//               2
//             </div>
//             <span className="ml-2 text-gray-600">checkout</span>
//           </div>
//         </div>

//         <div className="flex mb-6">
//           <div className="w-1/2 mr-4">
//             <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
//             <form onSubmit={handleShippingFormSubmit}>
//               <div className="flex mb-4">
//                 <label className="mr-2 flex items-center">
//                   <input type="radio" name="address" className="mr-2" />
//                   Add New Address
//                 </label>
//               </div>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   value={streetAddress}
//                   onChange={(e) => setStreetAddress(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <input
//                   type="text"
//                   placeholder="Apartment Number"
//                   value={apartmentNumber}
//                   onChange={(e) => setApartmentNumber(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Zip"
//                   value={zip}
//                   onChange={(e) => setZip(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded"
//                 >
//                   Proceed
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="w-1/2">
//             <h2 className="text-lg font-semibold mb-4">Place your order</h2>
//             <button className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4">
//               Place Order
//             </button>
//             <p className="text-sm text-gray-600 mb-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//               <div className="flex justify-between mb-2">
//                 <span>Items (3)</span>
//                 <span>$64.23</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping & Handling</span>
//                 <span>$5.99</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Before Tax</span>
//                 <span>$70.22</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax Collected</span>
//                 <span>$0.22</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>$70.44</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6">
//           <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//           <form
//             onSubmit={handlePaymentFormSubmit}
//             className="mx-auto max-w-sm space-y-6"
//           >
//             <div className="flex items-center mb-4">
//               <section className="flex flex-col rounded-none max-w-[731px]">
//                 <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
//                   <div className="flex gap-6 my-auto">
//                     <input
//                       type="radio"
//                       id="mpesa"
//                       name="paymentMethod"
//                       value="mpesa"
//                       checked={paymentMethod === "mpesa"}
//                       onChange={() => handlePaymentMethodChange("mpesa")}
//                       className="mr-2"
//                     />
//                     <div className="flex justify-between w-full">
//                       <h2 className="my-auto text-2xl font-light text-black">
//                         M-Pesa
//                       </h2>
//                       <img src={mpesa} alt="M-pesa" />
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {paymentMethod === "mpesa" && (
//               <div className="mb-4 space-y-6">
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   className="border p-2 rounded w-full"
//                 />
//                 <div className="flex justify-between gap-4">
//                   <button
//                     type="button"
//                     className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded"
//                   >
//                     Confirm Payment
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center mt-4">
//               <section className="flex flex-col rounded-none max-w-[731px]">
//                 <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
//                   <div className="flex gap-6 my-auto">
//                     <input
//                       type="radio"
//                       id="pesapal"
//                       name="paymentMethod"
//                       value="pesapal"
//                       checked={paymentMethod === "pesapal"}
//                       onChange={() => handlePaymentMethodChange("pesapal")}
//                       className="mr-2"
//                     />
//                     <div className="flex justify-between w-full">
//                       <h2 className="my-auto text-2xl font-light text-black">
//                         Pesapal
//                       </h2>
//                       <img src={pesapal} alt="Pesapal" />
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {paymentMethod === "pesapal" && (
//               <div className="mb-4 space-y-6">
//                 <input
//                   type="text"
//                   placeholder="Email Address"
//                   className="border p-2 rounded w-full"
//                 />
//                 <div className="flex justify-between gap-4">
//                   <button
//                     type="button"
//                     className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded"
//                   >
//                     Confirm Payment
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col items-center mt-4 gap-4">
//               <section className="flex flex-col rounded-none max-w-[731px]">
//                 <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[731px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
//                   <div className="flex gap-6 my-auto">
//                     <input
//                       type="radio"
//                       id="paypal"
//                       name="paymentMethod"
//                       value="paypal"
//                       checked={paymentMethod === "paypal"}
//                       onChange={() => handlePaymentMethodChange("paypal")}
//                       className="mr-2"
//                     />
//                     <div className="flex justify-between w-full">
//                       <h2 className="my-auto text-2xl font-light text-black">
//                         Paypal
//                       </h2>
//                       <img src={Paypal} alt="Paypal" />
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {paymentMethod === "paypal" && (
//               <div className="mb-4 space-y-6">
//                 <input
//                   type="text"
//                   placeholder="Email Address"
//                   className="border p-2 rounded w-full"
//                 />
//                 <div className="flex justify-between gap-4">
//                   <button
//                     type="button"
//                     className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded"
//                   >
//                     Confirm Payment
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
import React, { useContext, useState } from "react";
import mpesa from "../assets/mpesa.png";
import pesapal from "../assets/pesapal.png";
import Paypal from "../assets/Paypal.png";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const { currentUser, authToken } = useContext(UserContext);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleShippingFormSubmit = async (e) => {
    e.preventDefault();
    const token = authToken || localStorage.getItem("access_token");

    const shippingData = {
      name: `${firstName} ${lastName}`,
      street_address: streetAddress,
      apartment_number: apartmentNumber,
      city,
      zip_code: zip,
    };

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipping_address: shippingData,
          payment_method: paymentMethod,
          order_total: 70.44, // Replace with the actual order total calculation
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Shipping data submitted:", result);
    } catch (error) {
      console.error("Error submitting shipping form:", error);
    }
  };

  const handlePaymentFormSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      paymentMethod,
      ...(paymentMethod === "mpesa" && { phoneNumber }),
      ...(paymentMethod === "pesapal" && { emailAddress }),
      ...(paymentMethod === "paypal" && { paypalEmail }),
    };

    try {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            authToken || localStorage.getItem("access_token")
          }`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Payment data submitted:", result);
    } catch (error) {
      console.error("Error submitting payment form:", error);
    }
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
            <form onSubmit={handleShippingFormSubmit}>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Apartment Number"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
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
            <Link to="/ordercomplete">
              <button className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4">
                Place Order
              </button>
            </Link>
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
