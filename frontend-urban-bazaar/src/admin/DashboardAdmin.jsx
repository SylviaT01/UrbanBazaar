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
    <div>
      <div>
        <div>Earnings</div>
        <div>{`Ksh ${totalEarnings}`}</div>
        <div>Orders</div>
        <div>{orders.length}</div>
        <div>Signups</div>
        <div>123</div>
      </div>
      <div>Admin Dashboard</div>
    </div>
  );
}

export default AdminDashboard;
