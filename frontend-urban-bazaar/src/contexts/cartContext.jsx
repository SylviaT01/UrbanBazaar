import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext.jsx";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser, authToken } = useContext(UserContext); 
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      // Set up a timer to clear the notification after 2 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const fetchCartData = async () => {
      const token = authToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to fetch cart data");
        }

        const data = await response.json();
        setCart(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlistData = async () => {
      const token = authToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/wishlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to fetch wishlist data");
        }

        const data = await response.json();
        setWishlist(data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchCartData();
      fetchWishlistData();
    }
  }, [currentUser, authToken]);

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  const addToCart = async (product) => {
    const { id, quantity, price } = product;
    const user_id = currentUser?.id;
    const token = authToken || localStorage.getItem("access_token");

    if (!currentUser) {
      setNotification("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    if (isInWishlist(id)) {
      await removeFromWishlist(id); 
    }

    if (!isInCart(id)) {
      setCart((prevCart) => [...prevCart, { ...product, user_id }]);
      setNotification(`✅ Product successfully added to your cart!`);

      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: id, quantity, price, user_id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to add to cart");
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
        setNotification(`⚠️ Failed to add item to cart.`);
      }
    } else {
      setNotification(`❗️ Item is already in your cart.`);
    }
  };

  const addToWishlist = async (product) => {
    const { id } = product;
    const user_id = currentUser?.id;
    const token = authToken || localStorage.getItem("access_token");

    if (!currentUser) {
      setNotification("You need to log in to add items to the wishlist.");
      navigate("/login");
      return;
    }

    if (isInCart(id)) {
      await removeFromCart(id); // Remove from cart if it exists
    }

    if (!isInWishlist(id)) {
      setWishlist((prevWishlist) => [...prevWishlist, { ...product, user_id }]);
      setNotification(`✅ Product successfully added to your wishlist!`);

      try {
        const response = await fetch("https://backend-urbanbazaar.onrender.com/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: id, user_id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to add to wishlist");
        }
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        setNotification(`⚠️ Failed to add item to wishlist.`);
      }
    } else {
      setNotification(`❗️ Item is already in your wishlist.`);
    }
  };

  const removeFromCart = async (productId) => {
    const token = authToken || localStorage.getItem("access_token");

    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    try {
      const response = await fetch(`https://backend-urbanbazaar.onrender.com/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to remove from cart");
      }
      setNotification(`✅ Product successfully removed from your cart.`);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      setNotification(`⚠️ Failed to remove item from cart.`);
    }
  };

  const removeFromWishlist = async (productId) => {
    const token = authToken || localStorage.getItem("access_token");

    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );

    try {
      const response = await fetch(
        `https://backend-urbanbazaar.onrender.com/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to remove from wishlist");
      }
      setNotification(`✅ Product successfully removed from your wishlist.`);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      setNotification(`⚠️ Failed to remove item from wishlist.`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        isInCart,
        isInWishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        loading,
        setLoading,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
