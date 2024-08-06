import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/order")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className='flex overflow-hidden flex-col items-center px-20 pb-8'
    >
      <div className="mt-7 ml-28 text-2xl font-bold tracking-tight leading-loose text-gray-800">
        Orders
      </div>
      <div className="flex flex-col mt-5 w-full max-w-[1240px] max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-base font-medium tracking-widest whitespace-nowrap min-h-[570px] max-md:mt-10"></div>
            </div>
            <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-center px-1.5 py-14 mx-auto w-full font-medium bg-white rounded max-md:mt-10 max-md:max-w-full">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Shipping Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.user_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.order_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.shipping_address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.payment_method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.order_total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4 w-full">
                  <span className="text-sm text-gray-500">
                    Showing {indexOfFirstOrder + 1} to {indexOfLastOrder} of {orders.length} entries
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-neutral-300' : 'bg-neutral-100'}`}
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'text-white bg-indigo-600' : 'bg-neutral-100'}`}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </button>
                    ))}
                    <button
                      className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-neutral-300' : 'bg-neutral-100'}`}
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
