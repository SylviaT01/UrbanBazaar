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
        <header className="...">
          <h1 className="text-3xl md:text-5xl font-bold">
            Your order is complete!
          </h1>
          <button
            className="..."
            onClick={handlePrint} // Triggering print functionality
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
        </main>
      </div>
    </div>
  );
};
