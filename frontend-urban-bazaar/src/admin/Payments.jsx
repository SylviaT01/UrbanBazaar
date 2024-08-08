import React, { useState, useEffect } from "react";
const totalPayment = currentPayments.reduce((total, payment) => total + payment.order_total, 0);

return (
  <div>
    {/* Table content */}
    <tfoot>
      <tr>
        <td colSpan="5">Total:</td>
        <td colSpan="2">Kshs. {totalPayment.toFixed(2)}</td>
      </tr>
    </tfoot>
  </div>
);

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
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePrint = () => {
  window.print();
    <div>
      {/* Table content */}
      <div>
        <button 
          onClick={handlePrint} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Print
        </button>
        {/* Pagination buttons */}
      </div>
    </div>
  );
};

return (
  <div>
    {/* Table content */}
    <div>
      <button 
        onClick={handlePrint} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Print
      </button>
      {/* Pagination buttons */}
    </div>
  </div>
);
  const handleNext = () => {
    if (currentPage < Math.ceil(payments.length / paymentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div>
      {/* Table content */}
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );<div>
  {/* Table content */}
  <div>
    <button
      onClick={handlePrevious}
      className={`px-4 py-2 border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-800'}`}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      className={`px-4 py-2 border ${currentPage === Math.ceil(payments.length / paymentsPerPage) ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-800'}`}
      disabled={currentPage === Math.ceil(payments.length / paymentsPerPage)}
    >
      Next
    </button>
  </div>
</div>
  fetchPayments();
  if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
const [currentPage, setCurrentPage] = useState(1);
const paymentsPerPage = 8;

const indexOfLastPayment = currentPage * paymentsPerPage;
const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);
return (
  <div>
    <table className="min-w-full divide-gray-200">
      <thead>
        <tr>
          <th>No.</th>
          <th>Customer</th>
          <th>Order Date</th>
          <th>Shipping Address</th>
          <th>Payment Method</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {currentPayments.map((payment, index) => (
          <tr key={payment.id}>
            <td>{index + indexOfFirstPayment + 1}</td>
            <td>{payment.user_email}</td>
            <td>{payment.created_at ? new Date(payment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Invalid Date'}</td>

            <td>{payment.shipping_address}</td>
            <td>{payment.payment_method}</td>
            <td>Kshs. {payment.order_total.toFixed(2)}</td>
            <td>{payment.status}</td>
          </tr>
const handleNext = () => {
  if (currentPage < Math.ceil(payments.length / paymentsPerPage)) {
    setCurrentPage(currentPage + 1);
  }
};
        ))}
      </tbody>
    </=table>
  </div>
);
<div>
    {/* Table content */}
    <tfoot>
      <tr>
        <td colSpan="5">Total:</td>
        <td colSpan="2">Kshs. {totalPayment.toFixed(2)}</td>
      </tr>
    </tfoot>
  </div>

export default Payments;
