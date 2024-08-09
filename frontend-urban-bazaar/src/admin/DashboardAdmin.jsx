import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://127.0.0.1:5000/order");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return <div>Admin Dashboard</div>;
}

export default AdminDashboard;
