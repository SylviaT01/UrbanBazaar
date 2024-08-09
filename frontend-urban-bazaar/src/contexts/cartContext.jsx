import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userContext.jsx';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

    fetch('http://127.0.0.1:5000/wishlist')
      .then(response => response.json())
      .then(data => {
        setWishlist(data.wishlist || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      });
  }, []);

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const addToCart = (product) => {
    if (!currentUser) {
      setNotification('You need to log in to add items to the cart.');
      navigate('/login');
      return;
    }

    if (!isInCart(product.id)) {
      setCart(prevCart => [...prevCart, product]);
      setNotification(`✅ Product successfully added to your cart!`);

      fetch('http://127.0.0.1:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(),
      })
      .catch(error => console.error('Error adding to cart:', error));

      if (isInWishlist(product.id)) {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== product.id));

        fetch(`http://127.0.0.1:5000/wishlist/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          },
        })
        .catch(error => console.error('Error removing from wishlist:', error));
      }

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      setNotification('Product is already in your cart!');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));

    fetch(`http://127.0.0.1:5000/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
    })
    .catch(error => console.error('Error removing from cart:', error));
  };

  const addToWishlist = (product) => {
    if (!currentUser) {
      setNotification('You need to log in to add items to the wishlist.');
      navigate('/login');
      return;
    }

    if (!isInCart(product.id)) {
      setWishlist(prevWishlist => [...prevWishlist, product]);
      setNotification(`❤️ Product successfully added to your wishlist!`);

      fetch('http://127.0.0.1:5000/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(product),
      })
      .catch(error => console.error('Error adding to wishlist:', error));

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      setNotification('Product is already in your cart!');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));

    fetch(`http://127.0.0.1:5000/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
    })
    .catch(error => console.error('Error removing from wishlist:', error));
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      loading, 
      notification 
    }}>
      {children}
    </CartContext.Provider>
  );
};
