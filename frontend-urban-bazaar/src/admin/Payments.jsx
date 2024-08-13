import React, { useState, useEffect } from "react";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 8;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/admin/orders", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPayments(data.orders);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate the current payments to display
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  // Calculate total payment
  const totalPayment = currentPayments.reduce((total, payment) => total + payment.order_total, 0);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous and next button clicks
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(payments.length / paymentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full bg-aliceblue min-h-screen overflow-hidden text-left text-base text-black font-poppins p-4 sm:p-6 md:p-8">
      <div className="mt-1 text-2xl font-bold text-gray-800 lg:ml-28">
        Payment
      </div>
      <div className="flex flex-col mt-5 w-full">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col w-full lg:w-[22%]">
            {/* Optional sidebar content */}
          </div>
          <div className="flex flex-col w-full lg:ml-5 bg-white rounded p-4 lg:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayments.map((payment, index) => (
                    <tr key={payment.id}>
                      <td className="px-4 py-2 text-sm text-gray-500">{index + indexOfFirstPayment + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{payment.user_email}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {payment.created_at ? new Date(payment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Invalid Date'}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">{payment.shipping_address}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{payment.payment_method}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">Kshs. {payment.order_total.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-right text-sm font-bold text-gray-700">Total:</td>
                    <td colSpan="2" className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Kshs. {totalPayment.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <nav>
                <ul className="flex list-none gap-2">
                  <li>
                    <button
                      onClick={handlePrevious}
                      className={`px-4 py-2 border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-800'}`}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(payments.length / paymentsPerPage) }, (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 border ${currentPage === index + 1 ? 'bg-blue-400 text-white' : 'bg-white text-gray-800'}`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleNext}
                      className={`px-4 py-2 border ${currentPage === Math.ceil(payments.length / paymentsPerPage) ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-800'}`}
                      disabled={currentPage === Math.ceil(payments.length / paymentsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Payments;
