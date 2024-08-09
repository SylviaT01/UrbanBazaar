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
      imageSrc: shoe ,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
    {
      imageSrc: shoe ,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
    {
      imageSrc: shoe ,
      name: "Shoes",
      description: "Ultraboost Light Running Shoes",
      quantity: 2,
      price: "Ksh 1,300",
    },
  ];
};
