import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const OrderHistory = () => {
  const { authToken } = useContext(UserContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const token = authToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          throw new Error(errorData.msg || "Failed to fetch order history");
        }
        const data = await response.json();
        setOrderHistory(data.cart || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [authToken]);

  if (loading) return <p>Loading...</p>;

  if (orderHistory.length === 0) {
    return <p>No orders found.</p>;
  }

  const totalPrice = orderHistory.reduce((total, item) => {
    if (item.price && item.discount_percentage && item.quantity) {
      return total + ((item.price * (100 - item.discount_percentage)) / 100) * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="p-6">
      {/* <h3 className="text-lg sm:text-xl font-semibold mb-4">Order History</h3> */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Desktop View (Table) */}
        <div className="hidden sm:block">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover mr-4"
                            />
                            <div>
                              <h4 className="text-sm font-medium">{item.title}</h4>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Ksh {Math.round((item.price * (100 - item.discount_percentage)) / 100).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Ksh {(Math.round((item.price * (100 - item.discount_percentage)) / 100) * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium">Total Price:</h4>
                    <p className="text-sm font-medium">Ksh {Math.round(totalPrice).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View (Cards) */}
        <div className="block sm:hidden">
          {orderHistory.map((item) => (
            <div key={item.id} className="bg-white border rounded-md shadow-sm mb-4 p-4">
              <div className="flex items-center mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-gray-600">Price: Ksh {Math.round((item.price * (100 - item.discount_percentage)) / 100).toLocaleString()}</p>
                  <p className="text-gray-600">Subtotal: Ksh {(Math.round((item.price * (100 - item.discount_percentage)) / 100) * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium">Total Price:</h4>
            <p className="text-sm font-medium">Ksh {Math.round(totalPrice).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
