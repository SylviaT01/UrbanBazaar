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
      </div>
    </div>
  );
};
