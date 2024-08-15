import React from 'react';

const DeliveryAndReturns = () => {
  return (
    <div className="container px-4 py-8 max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full">
      <h1 className="text-3xl font-semibold mb-6">Delivery & Returns</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Delivery Information</h2>
        <p className="text-gray-700 mb-4">
          We aim to deliver your order as quickly as possible. Here’s what you need to know about our delivery process:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li className="mb-2">
            <strong>Delivery Time:</strong> Orders are typically processed within 1-2 business days. Standard delivery time is 3-5 business days, depending on your location.
          </li>
          <li className="mb-2">
            <strong>Delivery Charges:</strong> Delivery charges are calculated based on your location and order size. You will see the exact delivery cost at checkout.
          </li>
          <li className="mb-2">
            <strong>Delivery Areas:</strong> We deliver to most areas within the country. If your location is not serviced by our delivery partners, we will notify you to arrange an alternative solution.
          </li>
          <li className="mb-2">
            <strong>Tracking Your Order:</strong> Once your order is dispatched, you will receive a tracking number via email. You can use this to track the status of your delivery.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-4">Returns Policy</h2>
        <p className="text-gray-700 mb-4">
          We strive to ensure you are satisfied with your purchase. If you need to return or exchange an item, please follow these guidelines:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li className="mb-2">
            <strong>Return Period:</strong> You can return items within 30 days of receipt. The items must be in their original condition and packaging.
          </li>
          <li className="mb-2">
            <strong>How to Return:</strong> To initiate a return, contact our customer service team at urbanbazaar@gmail.com or call us at +254712345678. You will receive instructions on how to return your items.
          </li>
          <li className="mb-2">
            <strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the item is faulty or incorrect. We recommend using a trackable shipping service to return your items.
          </li>
          <li className="mb-2">
            <strong>Refunds:</strong> Once we receive your returned items, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method used at checkout.
          </li>
          <li className="mb-2">
            <strong>Exchanges:</strong> If you wish to exchange an item, please contact our customer service team. Exchanges are subject to availability and the same return conditions apply.
          </li>
        </ul>
        <p className="text-gray-700">
          If you have any questions or need further assistance, please do not hesitate to reach out to our customer support team.
        </p>
      </section>
    </div>
  );
};

export default DeliveryAndReturns;
