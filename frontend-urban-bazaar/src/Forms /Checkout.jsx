// import React, { useContext, useState } from "react";
// import mpesa from "../assets/mpesa.png";
// import pesapal from "../assets/pesapal.png";
// import Paypal from "../assets/Paypal.png";
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const { currentUser, authToken } = useContext(UserContext);

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           shipping_address: shippingData,
//           payment_method: paymentMethod,
//           order_total: 70.44, // Replace with the actual order total calculation
//         }),
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

//     const paymentData = {
//       paymentMethod,
//       ...(paymentMethod === "mpesa" && { phoneNumber }),
//       ...(paymentMethod === "pesapal" && { emailAddress }),
//       ...(paymentMethod === "paypal" && { paypalEmail }),
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken || localStorage.getItem("access_token")
//             }`,
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
//     // <div className="bg-gray-100 p-8 min-h-screen">
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">

//         {/* <div className="flex mb-6"> */}
//         <div className="w-full mr-4">
//           <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">Shipping Address</h2>
//           <form onSubmit={handleShippingFormSubmit}>
//             <div className="flex mb-4">
//               <label className="mr-2 flex items-center">
//                 <input type="radio" name="address" className="mr-2" />
//                 Add New Address
//               </label>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Street Address"
//                 value={streetAddress}
//                 onChange={(e) => setStreetAddress(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="grid grid-cols-3 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Apartment Number"
//                 value={apartmentNumber}
//                 onChange={(e) => setApartmentNumber(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//               <input
//                 type="text"
//                 placeholder="Zip"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded"
//               >
//                 Proceed
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* </div> */}
//         <div className="w-full mt-10">
//           <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">Place your order</h2>
//           <div className="bg-gray-100 p-4 rounded">
//             <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//             <div className="flex justify-between mb-2">
//               <span>Items (3)</span>
//               <span>$64.23</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Shipping & Handling</span>
//               <span>$5.99</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Before Tax</span>
//               <span>$70.22</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Tax Collected</span>
//               <span>$0.22</span>
//             </div>
//             <div className="flex justify-between font-semibold">
//               <span>Order Total</span>
//               <span>$70.44</span>
//             </div>
//           </div>
//           {/* <Link to="/ordercomplete"> */}
//             <button className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4">
//               Place Order
//             </button>
//           {/* </Link> */}
//           <p className="text-sm text-gray-600 mb-4">
//             By placing your order, you agree to our company's Privacy Policy
//             and Conditions of Use.
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10 ">
//           <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//           <form className="mx-auto max-w-sm space-y-10 flex flex-col items-center">
//             {/* <div className="flex items-center mb-4 s">
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
//                     <div
//                       className="flex justify-center"
//                       style={{ gap: "450px" }}
//                     >
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
//             )} */}
//             <div className="flex items-center">
//               <section className="flex flex-col rounded-none max-w-[1000px]">
//                 <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
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
//                     <div
//                       className="flex justify-between"
//                       style={{ gap: "650px" }}
//                     >
//                       <h2 className="my-auto text-2xl font-light text-black justify-end">
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
//               <section className="flex flex-col rounded-none max-w-[1000px]">
//                 <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
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
//                     <div
//                       className="flex justify-center"
//                       style={{ gap: "700px" }}
//                     >
//                       <h2 className="my-auto text-2xl font-light text-black">
//                         Paypal
//                       </h2>
//                       <img src={Paypal} alt="Paypal" />
//                     </div>
//                   </div>
//                 </div>
//               </section>
//               {paymentMethod === "paypal" && (
//                 <div className="mb-4 space-y-6">
//                   <input
//                     type="text"
//                     placeholder="Email Address"
//                     className="border p-2 rounded w-full"
//                   />
//                   <div className="flex justify-between gap-4">
//                     <button
//                       type="button"
//                       className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                       Confirm Payment
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//         <Link to="/ordercomplete">
//           <button className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4">
//             Complete Your Order
//           </button>
//         </Link>
//       </div>

//     </div>
//   );
// }

// export default Checkout;

// import React, { useContext, useState } from "react";
// import mpesa from "../assets/mpesa.png";
// import pesapal from "../assets/pesapal.png";
// import Paypal from "../assets/Paypal.png";
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const { currentUser, authToken } = useContext(UserContext);

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = authToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           shipping_address: shippingData,
//           payment_method: paymentMethod,
//           order_total: 70.44, // Replace with the actual order total calculation
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Shipping data submitted:", result);
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }

//     setCurrentStep(2); // Move to Place Your Order section
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const paymentData = {
//       paymentMethod,
//       ...(paymentMethod === "mpesa" && { phoneNumber }),
//       ...(paymentMethod === "pesapal" && { emailAddress }),
//       ...(paymentMethod === "paypal" && { paypalEmail }),
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${
//             authToken || localStorage.getItem("access_token")
//           }`,
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Payment data submitted:", result);
//       setCurrentStep(4); // Move to Complete Your Order section
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
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
//         )}

//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Place your order
//             </h2>
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
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4"
//               onClick={() => setCurrentStep(3)}
//             >
//               Place Order
//             </button>
//             <p className="text-sm text-gray-600 mb-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {currentStep === 3 && (
//           <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10">
//             <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//             <form
//               className="mx-auto max-w-sm space-y-10 flex flex-col items-center"
//               onSubmit={handlePaymentFormSubmit}
//             >
//               <div className="flex items-center">
//                 <section className="flex flex-col rounded-none max-w-[1000px]">
//                   <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
//                     <div className="flex gap-6 my-auto">
//                       <input
//                         type="radio"
//                         id="pesapal"
//                         name="paymentMethod"
//                         value="pesapal"
//                         checked={paymentMethod === "pesapal"}
//                         onChange={() => handlePaymentMethodChange("pesapal")}
//                         className="mr-2"
//                       />
//                       <div
//                         className="flex justify-center"
//                         style={{ gap: "450px" }}
//                       >
//                         <h2 className="my-auto text-2xl font-light text-black">
//                           Pesapal
//                         </h2>
//                         <img src={pesapal} alt="Pesapal" />
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               </div>
//               {paymentMethod === "pesapal" && (
//                 <div className="mb-4 space-y-6">
//                   <input
//                     type="text"
//                     placeholder="Email Address"
//                     value={emailAddress}
//                     onChange={(e) => setEmailAddress(e.target.value)}
//                     className="border p-2 rounded w-full"
//                   />
//                   <div className="flex justify-between gap-4">
//                     <button
//                       type="button"
//                       className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                       onClick={() => setCurrentStep(2)}
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                       Pay Now
//                     </button>
//                   </div>
//                 </div>
//               )}
//               <div className="flex items-center">
//                 <section className="flex flex-col rounded-none max-w-[1000px]">
//                   <div className="flex flex-wrap gap-5 justify-between px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
//                     <div className="flex gap-6 my-auto">
//                       <input
//                         type="radio"
//                         id="paypal"
//                         name="paymentMethod"
//                         value="paypal"
//                         checked={paymentMethod === "paypal"}
//                         onChange={() => handlePaymentMethodChange("paypal")}
//                         className="mr-2"
//                       />
//                       <div
//                         className="flex justify-center"
//                         style={{ gap: "450px" }}
//                       >
//                         <h2 className="my-auto text-2xl font-light text-black">
//                           Paypal
//                         </h2>
//                         <img src={Paypal} alt="Paypal" />
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               </div>
//               {paymentMethod === "paypal" && (
//                 <div className="mb-4 space-y-6">
//                   <input
//                     type="text"
//                     placeholder="Paypal Email"
//                     value={paypalEmail}
//                     onChange={(e) => setPaypalEmail(e.target.value)}
//                     className="border p-2 rounded w-full"
//                   />
//                   <div className="flex justify-between gap-4">
//                     <button
//                       type="button"
//                       className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                       onClick={() => setCurrentStep(2)}
//                     >
//                       Back
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-blue-500 text-white py-2 px-4 rounded"
//                     >
//                       Pay Now
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         {currentStep === 4 && (
//           <div className="w-full mt-10 flex flex-col items-center">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Complete Your Order
//             </h2>
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
//             <Link
//               to="/thank-you"
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4 text-center"
//             >
//               Complete Order
//             </Link>
//             <p className="text-sm text-gray-600 mb-4">
//               Thank you for your purchase! You will receive an email
//               confirmation shortly.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState } from "react";
// import Paypal from "../assets/Paypal.png"; // Ensure this image exists
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState(""); // Ensure authToken is handled correctly
//   const { currentUser, authToken: contextToken } = useContext(UserContext);

// // Handle shipping form submission
// const handleShippingFormSubmit = async (e) => {
//   e.preventDefault();
//   const token =
//     authToken || contextToken || localStorage.getItem("access_token");

//   const shippingData = {
//     name: `${firstName} ${lastName}`,
//     street_address: streetAddress,
//     apartment_number: apartmentNumber,
//     city,
//     zip_code: zip,
//   };

//   try {
//     const response = await fetch("http://127.0.0.1:5000/shipping", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(shippingData),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const result = await response.json();
//     console.log("Shipping data submitted:", result);
//     setCurrentStep(2); // Move to Payment Method section
//   } catch (error) {
//     console.error("Error submitting shipping form:", error);
//   }
// };

//   // Handle payment form submission
//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       paypalEmail,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
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
//       console.log("Payment method added:", result);
//       setCurrentStep(3); // Move to Checkout section
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   // Handle checkout form submission
//   const handleCheckout = async () => {
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           shipping_address: shippingData,
//           payment_method: { paypalEmail },
//           order_total: 70.44, // Replace with actual order total calculation
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Order placed:", result);
//       setCurrentStep(4); // Move to Complete Your Order section
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
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
//         )}

//         {/* Payment Method Selection */}
//         {currentStep === 2 && (
//           <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10">
//             <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//             <form
//               className="mx-auto max-w-sm space-y-10 flex flex-col items-center"
//               onSubmit={handlePaymentFormSubmit}
//             >
//               <div className="flex items-center">
//                 <section className="flex flex-col rounded-none max-w-[1000px]">
//                   <div className="flex flex-wrap gap-5 justify-center px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-[540px] max-sm:gap-0">
//                     <img
//                       src={Paypal}
//                       alt="PayPal"
//                       className="w-32 h-12 border-2 border-blue-500 rounded-md shadow-sm"
//                     />
//                   </div>
//                 </section>
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="PayPal Email"
//                   value={paypalEmail}
//                   onChange={(e) => setPaypalEmail(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 w-full rounded"
//               >
//                 Add Payment Method
//               </button>
//             </form>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={handleCheckout}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 3 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import Paypal from "../assets/Paypal.png"; // Ensure this image exists
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState(""); // Ensure authToken is handled correctly
//   const { currentUser, authToken: contextToken } = useContext(UserContext);

//   const [cartItems, setCartItems] = useState([]);
//   const [orderSummary, setOrderSummary] = useState({
//     numberOfItems: 0,
//     totalPrice: 0,
//     shippingAndHandling: 50, // Fixed price
//     beforeTax: 0,
//     taxCollected: 0,
//     orderTotal: 0,
//   });

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");

//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setCartItems(result.items);

//         const totalPrice = result.items.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0
//         );
//         const shippingAndHandling = 50;
//         const beforeTax = totalPrice + shippingAndHandling;
//         const taxCollected = beforeTax * 0.16; // 16% tax
//         const orderTotal = beforeTax + taxCollected;

//         setOrderSummary({
//           numberOfItems: result.items.length,
//           totalPrice,
//           shippingAndHandling,
//           beforeTax,
//           taxCollected,
//           orderTotal,
//         });
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     fetchCartData();
//   }, [authToken, contextToken]);

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
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
//       setCurrentStep(2); // Move to Payment Method section
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       paypalEmail,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
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
//       console.log("Payment method added:", result);
//       setCurrentStep(3); // Move to Checkout section
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   const handleCheckout = async () => {
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           shipping_address: shippingData,
//           payment_method: { paypalEmail },
//           order_total: orderSummary.orderTotal, // Use calculated order total
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Order placed:", result);
//       setCurrentStep(4); // Move to Complete Your Order section
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
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
//         )}

//         {/* Payment Method Selection */}
//         {currentStep === 2 && (
//           <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10">
//             <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//             <form
//               className="mx-auto max-w-sm space-y-10 flex flex-col items-center"
//               onSubmit={handlePaymentFormSubmit}
//             >
//               <div className="flex items-center">
//                 <section className="flex flex-col rounded-none max-w-[1000px]">
//                   <div className="flex flex-wrap gap-5 justify-center px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-[540px] max-sm:gap-0">
//                     <img
//                       src={Paypal}
//                       alt="PayPal"
//                       className="w-32 h-12 border-2 border-blue-500 rounded-md shadow-sm"
//                     />
//                   </div>
//                 </section>
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="PayPal Email"
//                   value={paypalEmail}
//                   onChange={(e) => setPaypalEmail(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 w-full rounded"
//               >
//                 Add Payment Method
//               </button>
//             </form>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={handleCheckout}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         )}

//         {/* Order Summary */}
//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Place your order
//             </h2>
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//               <div className="flex justify-between mb-2">
//                 <span>Items ({orderSummary.numberOfItems})</span>
//                 <span>${orderSummary.totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping & Handling</span>
//                 <span>${orderSummary.shippingAndHandling.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Before Tax</span>
//                 <span>${orderSummary.beforeTax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax Collected</span>
//                 <span>${orderSummary.taxCollected.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>${orderSummary.orderTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mb-4"
//               onClick={() => setCurrentStep(3)}
//             >
//               Place Order
//             </button>
//             <p className="text-sm text-gray-600 mb-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 3 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import Paypal from "../assets/Paypal.png"; // Ensure this image exists
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState(""); // Ensure authToken is handled correctly
//   const { authToken: contextToken } = useContext(UserContext);

//   const [cartItems, setCartItems] = useState([]);
//   const [orderSummary, setOrderSummary] = useState({
//     numberOfItems: 0,
//     totalPrice: 0,
//     shippingAndHandling: 50, // Fixed price
//     beforeTax: 0,
//     taxCollected: 0,
//     orderTotal: 0,
//   });

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No auth token available");
//         return;
//       }
//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.msg || "Failed to fetch cart data");
//         }

//         const result = await response.json();
//         console.log(result);
//         setCartItems(result.cart);

//         const totalPrice = result.cart.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0
//         );
//         const shippingAndHandling = 50;
//         const beforeTax = totalPrice + shippingAndHandling;
//         const taxCollected = beforeTax * 0.16; // 16% tax
//         const orderTotal = beforeTax + taxCollected;

//         setOrderSummary({
//           numberOfItems: result.cart.length,
//           totalPrice,
//           shippingAndHandling,
//           beforeTax,
//           taxCollected,
//           orderTotal,
//         });
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     fetchCartData();
//   }, [authToken, contextToken]);
//   console.log(cartItems);
//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
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
//       setCurrentStep(2); // Move to Payment Method section
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };
//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       paypalEmail,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
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
//       console.log("Payment method added:", result);
//       setCurrentStep(4); // Move to Complete Your Order section
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
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
//         )}

//         {/* Order Summary */}
//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Order Summary
//             </h2>
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//               <div className="flex justify-between mb-2">
//                 <span>Items ({orderSummary.numberOfItems})</span>
//                 <span>Ksh {orderSummary.totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping & Handling</span>
//                 <span>ksh {orderSummary.shippingAndHandling.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Before Tax</span>
//                 <span>ksh {orderSummary.beforeTax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax Collected</span>
//                 <span>ksh {orderSummary.taxCollected.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>ksh {orderSummary.orderTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded"
//               onClick={() => setCurrentStep(3)}
//             >
//               Proceed to Payment Method
//             </button>
//             <p className="text-sm text-gray-600 mb-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {/* Payment Method Selection */}
//         {currentStep === 3 && (
//           <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10">
//             <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//             <form
//               className="mx-auto max-w-sm space-y-10 flex flex-col items-center"
//               onSubmit={handlePaymentFormSubmit}
//             >
//               <div className="flex items-center">
//                 <section className="flex flex-col rounded-none max-w-[1000px]">
//                   <div className="flex flex-wrap gap-5 justify-center px-11 py-6 w-[1000px] rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-[540px] max-sm:gap-0">
//                     <img
//                       src={Paypal}
//                       alt="PayPal"
//                       className="w-32 h-12 border-2 border-blue-500 rounded-md shadow-sm"
//                     />
//                   </div>
//                 </section>
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="PayPal Email"
//                   value={paypalEmail}
//                   onChange={(e) => setPaypalEmail(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 w-full rounded"
//               >
//                 Add Payment Method
//               </button>
//             </form>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={() => setCurrentStep(4)}
//             >
//               Complete Order
//             </button>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 4 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import Paypal from "../assets/Paypal.png"; // Ensure this image exists
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paypalEmail, setPaypalEmail] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardType, setCardType] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState(""); // Ensure authToken is handled correctly
//   const { authToken: contextToken } = useContext(UserContext);

//   const [cartItems, setCartItems] = useState([]);
//   const [orderSummary, setOrderSummary] = useState({
//     numberOfItems: 0,
//     totalPrice: 0,
//     shippingAndHandling: 50, // Fixed price
//     beforeTax: 0,
//     taxCollected: 0,
//     orderTotal: 0,
//   });

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No auth token available");
//         return;
//       }
//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.msg || "Failed to fetch cart data");
//         }

//         const result = await response.json();
//         console.log(result);
//         setCartItems(result.cart);

//         const totalPrice = result.cart.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0
//         );
//         const shippingAndHandling = 50;
//         const beforeTax = totalPrice + shippingAndHandling;
//         const taxCollected = beforeTax * 0.16; // 16% tax
//         const orderTotal = beforeTax + taxCollected;

//         setOrderSummary({
//           numberOfItems: result.cart.length,
//           totalPrice,
//           shippingAndHandling,
//           beforeTax,
//           taxCollected,
//           orderTotal,
//         });
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     fetchCartData();
//   }, [authToken, contextToken]);

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
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
//       setCurrentStep(2); // Move to Order Summary section
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       card_number: cardNumber,
//       card_type: cardType,
//       expiration_date: expirationDate,
//       billing_address: billingAddress,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
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
//       console.log("Payment method added:", result);
//       setCurrentStep(4); // Move to Complete Your Order section
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
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
//         )}

//         {/* Order Summary */}
//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Order Summary
//             </h2>
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//               <div className="flex justify-between mb-2">
//                 <span>Items ({orderSummary.numberOfItems})</span>
//                 <span>Ksh {orderSummary.totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping & Handling</span>
//                 <span>Ksh {orderSummary.shippingAndHandling.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Before Tax</span>
//                 <span>Ksh {orderSummary.beforeTax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax Collected</span>
//                 <span>Ksh {orderSummary.taxCollected.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>Ksh {orderSummary.orderTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={() => setCurrentStep(3)}
//             >
//               Proceed to Payment Method
//             </button>
//             <p className="text-sm text-gray-600 mt-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {/* Payment Method Selection */}
//         {currentStep === 3 && (
//           <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-6 mt-10">
//             <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
//             <form
//               className="mx-auto max-w-sm space-y-6 flex flex-col items-center"
//               onSubmit={handlePaymentFormSubmit}
//             >
//               <div className="flex items-center mb-4">
//                 <section className="flex flex-col rounded-none max-w-full">
//                   <div className="flex flex-wrap gap-5 justify-center px-11 py-6 w-full rounded-xl bg-white bg-opacity-20 shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
//                     <img
//                       src={Paypal}
//                       alt="PayPal"
//                       className="w-32 h-12 border-2 border-blue-500 rounded-md shadow-sm"
//                     />
//                   </div>
//                 </section>
//               </div>
//               <div className="mb-4 w-full">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4 mb-4 w-full">
//                 <input
//                   type="text"
//                   placeholder="Card Type"
//                   value={cardType}
//                   onChange={(e) => setCardType(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Expiration Date (MM/YYYY)"
//                   value={expirationDate}
//                   onChange={(e) => setExpirationDate(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <div className="mb-4 w-full">
//                 <input
//                   type="text"
//                   placeholder="Billing Address"
//                   value={billingAddress}
//                   onChange={(e) => setBillingAddress(e.target.value)}
//                   className="border p-2 rounded w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 w-full rounded"
//               >
//                 Add Payment Method
//               </button>
//             </form>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={() => setCurrentStep(4)}
//             >
//               Complete Order
//             </button>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 4 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import Paypal from "../assets/Paypal.png"; // Ensure this image exists
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [orderTotal, setOrderTotal] = useState(0);
//   const [email, setEmail] = useState("");
//   // const [cardNumber, setCardNumber] = useState("");
//   // const [cardType, setCardType] = useState("");
//   // const [expirationDate, setExpirationDate] = useState("");
//   // const [billingAddress, setBillingAddress] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState("");
//   const { authToken: contextToken } = useContext(UserContext);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No auth token available");
//         return;
//       }
//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Network response was not ok");
//         const result = await response.json();
//         setOrderTotal(
//           result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         ); // Assuming total is returned
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
//     fetchCartData();
//   }, [authToken, contextToken]);

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(shippingData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(2);
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       email: email,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(paymentData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(3); // Proceed to PayPal payment
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   const handlePaymentWithPayPal = async () => {
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/create-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ order_total: orderTotal }),
//       });

//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();
//       window.location.href = result.payment_link; // Redirect to PayPal for payment
//     } catch (error) {
//       console.error("Error creating payment:", error);
//     }
//   };
//   console.log(orderTotal);
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
//             <form onSubmit={handleShippingFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Street Address"
//                 value={streetAddress}
//                 onChange={(e) => setStreetAddress(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Apartment Number"
//                 value={apartmentNumber}
//                 onChange={(e) => setApartmentNumber(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Zip Code"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
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
//         )}

//         {/* Payment Method Form */}
//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Payment Method
//             </h2>
//             <form onSubmit={handlePaymentFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />

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
//                   Save Payment Method
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Order Summary */}
//         {currentStep === 3 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Order Summary
//             </h2>
//             <div className="bg-gray-100 p-4 rounded">
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>Ksh {orderTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={() => handlePaymentWithPayPal()}
//             >
//               Proceed to Payment
//             </button>
//             <p className="text-sm text-gray-600 mt-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 4 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [orderTotal, setOrderTotal] = useState(0);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState("");
//   const { authToken: contextToken } = useContext(UserContext);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No auth token available");
//         return;
//       }
//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Network response was not ok");
//         const result = await response.json();
//         setOrderTotal(
//           result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         );
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
//     fetchCartData();
//   }, [authToken, contextToken]);

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(shippingData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(2);
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       email: email,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(paymentData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(3); // Proceed to PayPal payment
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   const handlePaymentWithPayPal = async () => {
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/create-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ order_total: orderTotal }),
//       });

//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();
//       window.location.href = result.payment_link; // Redirect to PayPal for payment
//     } catch (error) {
//       console.error("Error creating payment:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
//             <form onSubmit={handleShippingFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Street Address"
//                 value={streetAddress}
//                 onChange={(e) => setStreetAddress(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Apartment Number"
//                 value={apartmentNumber}
//                 onChange={(e) => setApartmentNumber(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Zip Code"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
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
//         )}

//         {/* Payment Method Form */}
//         {currentStep === 2 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Payment Method
//             </h2>
//             <form onSubmit={handlePaymentFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
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
//                   Save Payment Method
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Order Summary */}
//         {currentStep === 3 && (
//           <div className="w-full mt-10">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Order Summary
//             </h2>
//             <div className="bg-gray-100 p-4 rounded">
//               <div className="flex justify-between font-semibold">
//                 <span>Order Total</span>
//                 <span>${orderTotal.toFixed(2)}</span>
//               </div>
//             </div>
//             <button
//               className="bg-blue-500 text-white py-2 px-4 w-full rounded mt-4"
//               onClick={handlePaymentWithPayPal}
//             >
//               Proceed to Payment
//             </button>
//             <p className="text-sm text-gray-600 mt-4">
//               By placing your order, you agree to our company's Privacy Policy
//               and Conditions of Use.
//             </p>
//           </div>
//         )}

//         {/* Complete Your Order */}
//         {currentStep === 4 && (
//           <div className="w-full mt-10 text-center">
//             <h2 className="text-lg font-semibold mb-4">Order Completed</h2>
//             <p className="text-gray-600 mb-4">Thank you for your order!</p>
//             <Link to="/" className="text-blue-500 underline">
//               Return to Home
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../contexts/userContext";
// import { Link } from "react-router-dom";

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [orderTotal, setOrderTotal] = useState(0);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zip, setZip] = useState("");
//   const [authToken, setAuthToken] = useState("");
//   const { authToken: contextToken } = useContext(UserContext);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       const token =
//         authToken || contextToken || localStorage.getItem("access_token");
//       if (!token) {
//         console.error("No auth token available");
//         return;
//       }
//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Network response was not ok");
//         const result = await response.json();
//         setOrderTotal(
//           result.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         );
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
//     fetchCartData();
//   }, [authToken, contextToken]);

//   const handleShippingFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const shippingData = {
//       name: `${firstName} ${lastName}`,
//       street_address: streetAddress,
//       apartment_number: apartmentNumber,
//       city,
//       zip_code: zip,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/shipping", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(shippingData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(2);
//     } catch (error) {
//       console.error("Error submitting shipping form:", error);
//     }
//   };

//   const handlePaymentFormSubmit = async (e) => {
//     e.preventDefault();
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     const paymentData = {
//       email: email,
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(paymentData),
//       });
//       if (!response.ok) throw new Error("Network response was not ok");
//       setCurrentStep(3); // Proceed to PayPal payment
//     } catch (error) {
//       console.error("Error submitting payment form:", error);
//     }
//   };

//   const handlePaymentWithPayPal = async () => {
//     const token =
//       authToken || contextToken || localStorage.getItem("access_token");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/create-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ order_total: orderTotal }),
//       });

//       if (!response.ok) throw new Error("Network response was not ok");
//       const result = await response.json();
//       window.location.href = result.payment_link; // Redirect to PayPal for payment
//     } catch (error) {
//       console.error("Error creating payment:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-10 sm:px-12 lg:px-16 m-10">
//       <div className="container mx-auto bg-[#F0FFF5] p-6 rounded-md shadow-md">
//         {/* Shipping Address Form */}
//         {currentStep === 1 && (
//           <div className="w-full mr-4">
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Shipping Address
//             </h2>
//             <form onSubmit={handleShippingFormSubmit}>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Street Address"
//                 value={streetAddress}
//                 onChange={(e) => setStreetAddress(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Apartment Number"
//                 value={apartmentNumber}
//                 onChange={(e) => setApartmentNumber(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Zip Code"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
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
//         )}

//         {/* Payment Method Form */}
//         {currentStep === 2 && (
//           <div>
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Payment Information
//             </h2>
//             <form onSubmit={handlePaymentFormSubmit}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mb-4 p-2 border rounded"
//                 required
//               />
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                   onClick={() => setCurrentStep(1)}
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded"
//                 >
//                   Save Payment Info
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Order Summary and PayPal Payment */}
//         {currentStep === 3 && (
//           <div>
//             <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
//               Order Summary
//             </h2>
//             <div className="mb-4 flex justify-center">
//               <p>Total: ${orderTotal.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                 onClick={() => setCurrentStep(2)}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handlePaymentWithPayPal}
//                 className="bg-blue-500 text-white py-2 px-4 rounded"
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;
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

  useEffect(() => {
    const fetchCartData = async () => {
      const token =
        authToken || contextToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5000/cart", {
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
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, [authToken, contextToken]);

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
      const response = await fetch("http://127.0.0.1:5000/shipping", {
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
      const response = await fetch("http://127.0.0.1:5000/payment", {
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
      const response = await fetch("http://127.0.0.1:5000/create-payment", {
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
      const response = await fetch("http://127.0.0.1:5000/checkout", {
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
            <h2 className="text-lg font-semibold mb-4 flex justify-center text-center">
              Order Summary
            </h2>
            <div className="mb-4 flex justify-center">
              <p>Total: ${orderTotal.toFixed(2)}</p>
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
        )}
      </div>
    </div>
  );
}

export default Checkout;
