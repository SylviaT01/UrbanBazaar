import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/order");
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

  const totalEarnings = orders.reduce((total, order) => total + order.order_total, 0).toFixed(2);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 -mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-6xl">
        <div className="bg-blue-500 text-white rounded-lg shadow-md p-6">
          <div>Earnings</div>
          <div className="text-3xl">{`Ksh ${totalEarnings}`}</div>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow-md p-6">
          <div>Orders</div>
          <div className="text-3xl">{orders.length}</div>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6">
          <div>Signups</div>
          <div className="text-3xl">123</div>
        </div>
      </div>
      <div className="w-full max-w-6xl">
        <div>Admin Dashboard</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
