import React, { useState } from "react";
import { useCart } from "../contexts/cartContext"; // Import useCart context
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist } = useCart(); // Add removeFromWishlist to the context
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  if (loading) return <p>Loading...</p>;

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/products");
  };

  const continueShopping = () => {
    navigate("/products");
  };
  console.log(wishlist);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-[1000px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="sticky top-0 bg-white pb-5 pt-4">
                <div className="flex justify-between items-center border-b border-t border-gray-200 pb-4 pt-4">
                  <h3 className="text-xl font-semibold">Wishlist</h3>
                  <button
                    className="text-gray-500 hover:text-gray-600 focus:outline-none"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-center mt-4">Your wishlist is empty.</p>
              ) : (
                <div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {wishlist.map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover mr-4"
                            />
                            <div>
                              <h4 className="text-sm font-medium">
                                {item.title}
                              </h4>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Ksh{" "}
                            {Math.round(
                              (item.price * (100 - item.discount_percentage)) /
                                100
                            ).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={continueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
