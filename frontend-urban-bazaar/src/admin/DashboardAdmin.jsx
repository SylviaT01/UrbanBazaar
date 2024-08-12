import React, { useState, useEffect } from "react";
import OrdersIcons from "../assets/OrdersIcons.svg";
import SignupsIcons from "../assets/SignupsIcon.svg";
import EarningsIcons from "../assets/earningsIcon.svg";
import SalesChart from "./SalesChart"; // Import the SalesChart component

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/order", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6 bg-blue-500 text-white rounded-lg shadow-md p-6 md:p-8 items-center">
          <img
            src={EarningsIcons}
            alt="Earnings Icon"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Earnings</div>
            <div className="text-2xl md:text-3xl mt-2">
              Ksh{" "}
              {Math.round(
                orders
                  .reduce((total, order) => total + order.order_total, 0)
                  .toFixed(2)
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 bg-green-500 text-white rounded-lg shadow-md p-6 md:p-8 items-center">
          <img
            src={OrdersIcons}
            alt="Orders Icon"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Orders</div>
            <div className="text-2xl md:text-3xl mt-2">{orders.length}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 bg-yellow-500 text-white rounded-lg shadow-md p-6 md:p-8 items-center">
          <img
            src={SignupsIcons}
            alt="Signups Icon"
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">SignUps</div>

            <div className="text-2xl md:text-3xl mt-2">20</div>
          </div>
        </div>
      </div>
      {/* Sales Report Graph */}
      <SalesChart orders={orders} /> {/* Add the SalesChart component */}
      {/* Orders Table */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Id
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.user.username}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.item}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Ksh {order.order_total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
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
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(orders.length / ordersPerPage)
              }
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:bg-gray-300"
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
