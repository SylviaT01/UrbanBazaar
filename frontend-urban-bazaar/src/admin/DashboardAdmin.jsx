import React, { useState, useEffect } from "react";
import OrdersIcons from "../assets/OrdersIcons.svg";
import SignupsIcons from "../assets/SignupsIcon.svg";
import earningdIcons from "../assets/earningsIcon.svg";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/admin/orders", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
console.log (orders);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-4 -mt-20">
      <div className="text-2xl font-bold text-gray-800 mb-4">
        Admin Dashboard
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-6xl">
        <div className="flex flex-row gap-6 bg-blue-500 text-white rounded-lg shadow-md p-6 items-center">
          <div>
            <img src={earningdIcons} alt="src Orders" />
          </div>

          <div className="text-lg font-semibold">Earnings</div>
          <div className="text-3xl mt-2">
            Ksh{" "}
            {orders
              .reduce((total, order) => total + order.order_total, 0)
              .toFixed(2)}
          </div>
        </div>
        <div className="flex flex-row gap-6 bg-green-500 text-white rounded-lg shadow-md p-6 items-center">
          <div>
            <img src={OrdersIcons} alt="src Orders" />
          </div>
          {/* <div className= "flex flex-col"> */}
          <div className="text-lg font-semibold">Orders</div>
          <div className="text-3xl mt-2">{orders.length}</div>
          {/* </div> */}
        </div>
        <div className="flex flex-row gap-6 bg-yellow-500 text-white rounded-lg shadow-md p-6 items-center">
          <div>
            <img src={SignupsIcons} alt="src Orders" />
          </div>
          <div className="text-lg font-semibold">SignUps</div>
          <div className="text-3xl mt-2">
            {/* Include logic for counting signups */}123
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="w-full max-w-6xl">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
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
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "Invalid Date"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.shipping_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ksh {order.order_total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between p-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(orders.length / ordersPerPage)
              }
              className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
