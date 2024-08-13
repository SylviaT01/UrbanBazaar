import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import print from "../assets/print.svg";
import shoe from "../assets/shoe.svg";

const OrderComplete = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Order Summary",
    pageStyle: `
        @page {
          size: A4;
          margin: 20mm;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `,
  });

  const products = [
    {
      imageSrc: shoe,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
    {
      imageSrc: shoe,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
    {
      imageSrc: shoe,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-50 px-4">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <header className="flex flex-col md:flex-row gap-5 justify-between items-center self-center mt-14 w-full font-medium text-black max-w-[1230px] max-md:mt-10 max-md:max-w-full">
          <h1 className="text-3xl md:text-5xl font-bold">
            Your order is complete!
          </h1>
          <button
            className="flex items-center gap-2 px-4 py-2 text-xl bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            onClick={handlePrint}
          >
            <img src={print} alt="Print" className="w-8 h-8" />
            <span>Print</span>
          </button>
        </header>


        {/* Main content to be printed */}
        <main ref={printRef}>
          <section className="self-center px-8 py-0.5 mt-7 bg-white rounded-lg border border-solid border-gray-200 w-full max-w-[1240px] max-md:px-5">
            <div className="flex flex-wrap md:flex-nowrap gap-1">
              <section className="flex flex-col w-full md:w-1/2">
                <h2 className="text-3xl font-semibold mb-5 mt-3">
                  Shipping Info
                </h2>
                <hr className="flex border-t border-gray-300 mb-5 w-80" />
                <div className="text-xl text-gray-700 space-y-5">
                  <p>
                    Name:{" "}
                    <span className="font-medium text-gray-900">John Doe</span>
                  </p>
                  <p>
                    Phone:{" "}
                    <span className="font-medium text-gray-900">
                      +254123456789
                    </span>
                  </p>
                  <p>
                    City:{" "}
                    <span className="font-medium text-gray-900">
                      Nairobi, Kenya
                    </span>
                  </p>
                  <p>
                    Company Name:{" "}
                    <span className="font-medium text-gray-900">
                      Urbanbazaar Ltd
                    </span>
                  </p>
                </div>
              </section>
              <section className="flex flex-col w-full md:w-1/2">
                <div className="text-xl text-gray-700 space-y-5 py-20">
                  <p>
                    Email:{" "}
                    <span className="font-medium text-blue-600">
                      johndoe@company.com
                    </span>
                  </p>
                  <p>
                    Zip:{" "}
                    <span className="font-medium text-gray-900">01110</span>
                  </p>
                  <p>
                    Address:{" "}
                    <span className="font-medium text-gray-900">
                      Cross road towers, mweni road
                    </span>
                  </p>
                  <p>
                    Company Phone:{" "}
                    <span className="font-medium text-gray-900">
                      +25412345678
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </section>
          <section className="self-center px-8 py-1 mt-7 bg-white rounded-lg border border-solid border-gray-200 w-full max-w-[1240px] max-md:px-5">
            <div className="flex gap-10">
              <section className="flex flex-col w-full md:w-1/2">
                <h2 className="text-3xl font-semibold mb-5 mt-5">
                  Order Details
                </h2>
                <hr className="border-t border-gray-300 mb-5" />
                <div className="text-xl text-gray-700 space-y-5">
                  <p>
                    Order No:{" "}
                    <span className="font-medium text-gray-900">55555567</span>
                  </p>
                  <p>
                    Order Date:{" "}
                    <span className="font-medium text-gray-900">
                      02/08/2024
                    </span>
                  </p>
                  <p>
                    Transaction ID:{" "}
                    <span className="font-medium text-gray-900">55555567</span>
                  </p>
                  <p>
                    Shipping Arrival:{" "}
                    <span className="font-medium text-gray-900">
                      02/08/2024
                    </span>
                  </p>
                </div>
              </section>

              <section className="flex flex-col w-full md:w-1/2">
                <h2 className="text-3xl font-semibold mb-5 mt-5">
                  Payment Details
                </h2>
                <hr className="border-t border-gray-300 mb-5" />
                <div className="text-xl text-gray-700 space-y-5">
                  <p>
                    Transaction Time:{" "}
                    <span className="font-medium text-gray-900">
                      02/08/2024 at 00:59
                    </span>
                  </p>
                  <p>
                    Card Details:{" "}
                    <span className="font-medium text-gray-900">
                      **** **** **** 5446
                    </span>
                  </p>
                  <p>
                    Amount:{" "}
                    <span className="font-medium text-gray-900">
                      Ksh 56,789
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </section>
          <section className="flex flex-col self-center px-14 py-10 mt-12 bg-white rounded-lg border border-solid border-gray-200 max-w-[1240px] max-md:px-5 max-md:mt-10">
            <div className="flex flex-wrap justify-between text-xl font-semibold mb-5">
              <span className="w-1/3">Product</span>
              <span className="w-1/3 text-center">Quantity</span>
              <span className="w-1/3 text-right">Price</span>
            </div>
            <hr className="border-t border-gray-300 mb-5" />
            {products.map((product, index) => (
              <div
                className="flex justify-between items-center text-xl text-gray-700 mb-5"
                key={index}
              >
                <div className="w-1/3 flex items-center">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
                <div className="w-1/3 text-center my-auto text-base font-semibold">
                  {product.quantity}
                </div>
                <div className="w-1/3 text-right my-auto text-base font-semibold">
                  {product.price}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-5 justify-between mt-6 ml-3 w-full max-w-[1102px] max-md:max-w-full">
              <p className="text-xl font-medium">Discount 10%</p>
              <p className="my-auto text-base font-semibold mr-4">Ksh 390</p>
            </div>
            <hr className="shrink-0 mt-6 w-full border border-black border-solid h-[3px]" />
            <div className="z-10 shrink-0 w-full border border-black border-solid h-[3px]" />
            <div className="flex flex-wrap gap-5 justify-between mt-6 ml-3 w-full max-w-[1102px] max-md:max-w-full">
              <p className="text-xl font-medium">Shipping</p>
              <p className="my-auto text-base font-semibold mr-4">Ksh 120</p>
            </div>
            <hr className="shrink-0 mt-6 w-full border border-black border-solid h-[3px]" />
            <div className="flex flex-wrap gap-5 justify-between mt-6 ml-3 w-full max-w-[1099px] max-md:max-w-full">
              <p className="text-xl font-medium">VAT</p>
              <p className="my-auto text-base font-semibold mr-4">Ksh 140</p>
            </div>
            <hr className="shrink-0 mt-6 w-full border border-black border-solid h-[3px]" />
            <div className="flex flex-wrap gap-5 justify-between mt-6 ml-3 text-3xl font-medium max-md:max-w-full">
              <p>TOTAL</p>
              <p>Ksh 3,770</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OrderComplete;
