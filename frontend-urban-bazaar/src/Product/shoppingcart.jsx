// import React from 'react';
// import { useCart } from '../contexts/cartContext';

// const Cart = () => {
//   const { cart, loading } = useCart();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto px-4 py-4">
//       <h2 className="text-xl font-semibold text-center uppercase">Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cart.map((item) => (
//             <div key={item.id} className="border p-4 flex flex-col justify-between shadow-xl rounded-lg bg-white">
//               <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover mb-4" />
//               <h3 className="font-medium text-sm mb-2">{item.title}</h3>
//               <p className="text-gray-700 mb-2">Ksh. {Math.round((item.price * (100 - item.discountPercentage)) / 100)}</p>
//               <p className="text-gray-700 mb-2 line-through">Ksh. {item.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React from 'react';
import { useCart } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, loading, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => 
    total + (item.price * (100 - item.discountPercentage) / 100) * item.quantity, 
    0
  );

  // Function to close the modal
  const closeModal = () => {
    // Implement logic to close the modal, e.g., set state or call context function
    // Example: setModalOpen(false);
    console.log('Modal closed');
  };

  // Function to continue shopping
  const continueShopping = () => {
    navigate('/'); // Redirect to the homepage or products page
  };

  // Function to handle checkout
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to the checkout page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-[1000px] max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="sticky top-0 bg-white pb-5 pt-4">
            <div className="flex justify-between items-center border-b border-t border-gray-200 pb-4 pt-4">
              <h3 className="text-xl font-semibold">Shopping Cart</h3>
              <button
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
          {cart.length === 0 ? (
            <p className="text-center mt-4">Your cart is empty.</p>
          ) : (
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h4 className="text-sm font-medium">{item.title}</h4>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Ksh {Math.round((item.price * (100 - item.discountPercentage)) / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Ksh {(Math.round((item.price * (100 - item.discountPercentage)) / 100) * item.quantity).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.id)}
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
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium">Total Price:</h4>
                <p className="text-sm font-medium">Ksh {totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={continueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
