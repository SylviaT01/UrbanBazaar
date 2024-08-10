import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext.jsx";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser, authToken } = useContext(UserContext); // Access current user from UserContext
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  console.log(currentUser, authToken);
  useEffect(() => {
    const fetchCartData = async () => {
      const token = authToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }
      try {
        console.log("Fetching cart data...");
        const response = await fetch("http://127.0.0.1:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Cart fetch response status:", response.status);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          throw new Error(errorData.msg || "Failed to fetch cart data");
        }
        const data = await response.json();
        console.log("Cart data fetched:", data);
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
        console.log("Fetching wishlist data...");
        const response = await fetch("http://127.0.0.1:5000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Wishlist fetch response status:", response.status);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response from server:", errorData);
          throw new Error(errorData.msg || "Failed to fetch wishlist data");
        }
        const data = await response.json();
        console.log("Wishlist data fetched:", data);
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

  const isInCart = (productId) => {
    const found = cart.some((item) => item.id === productId);
    console.log(`Product ${productId} in cart:`, found);
    return found;
  };

  const isInWishlist = (productId) => {
    const found = wishlist.some((item) => item.id === productId);
    console.log(`Product ${productId} in wishlist:`, found);
    return found;
  };

  const addToCart = async (product) => {
    const { id, quantity, price } = product;
    const user_id = currentUser?.id;
    const token = authToken || localStorage.getItem("access_token");

    if (!currentUser) {
      setNotification("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    if (!isInCart(id)) {
      setCart((prevCart) => [...prevCart, { ...product, user_id }]);
      setNotification(`✅ Product successfully added to your cart!`);
      console.log("Adding product to cart:", product);

      try {
        const response = await fetch(`http://127.0.0.1:5000/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: id, quantity, price, user_id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error adding to cart:", errorData);
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

    if (!isInWishlist(id)) {
      setWishlist((prevWishlist) => [...prevWishlist, { ...product, user_id }]);
      setNotification(`✅ Product successfully added to your wishlist!`);
      console.log("Adding product to wishlist:", product);

      try {
        const response = await fetch(`http://127.0.0.1:5000/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: id, user_id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error adding to wishlist:", errorData);
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
    console.log("Removing product from cart:", productId);

    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error removing from cart:", errorData);
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
    console.log("Removing product from wishlist:", productId);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/wishlist/${productId}`,
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
        console.error("Error removing from wishlist:", errorData);
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
        wishlist,
        isInCart,
        isInWishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        loading,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
