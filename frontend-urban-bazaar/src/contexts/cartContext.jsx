import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/cart')
      .then(response => response.json())
      .then(data => {
        setCart(data.cart || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    setNotification(`✅Product successfully added to your cart!`);

    fetch('http://127.0.0.1:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .catch(error => console.error('Error adding to cart:', error));
    
    setTimeout(() => {
      setNotification(null); // Clear the notification after 3 seconds
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(product => product.id !== productId));
    setNotification(`❌Product successfully removed from your cart!`);

    fetch(`http://127.0.0.1:5000/cart/${productId}`, {
      method: 'DELETE',
    })
    .catch(error => console.error('Error removing from cart:', error));
    
    setTimeout(() => {
      setNotification(null); // Clear the notification after 3 seconds
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, loading, notification }}>
      {children}
    </CartContext.Provider>
  );
};
