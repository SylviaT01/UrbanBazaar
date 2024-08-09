// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./userContext.jsx";

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { currentUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/cart")
//       .then((response) => response.json())
//       .then((data) => {
//         setCart(data.cart || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//         setLoading(false);
//       });

//     fetch("http://127.0.0.1:5000/wishlist")
//       .then((response) => response.json())
//       .then((data) => {
//         setWishlist(data.wishlist || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist:", error);
//         setLoading(false);
//       });
//   }, []);

//   const isInCart = (productId) => {
//     return cart.some((item) => item.id === productId);
//   };

//   const isInWishlist = (productId) => {
//     return wishlist.some((item) => item.id === productId);
//   };

//   const addToCart = async (product) => {
//     const { id, quantity, price } = product;
//     const user_id = currentUser ? currentUser.id : null; // Retrieve user_id from currentUser

//     console.log("Product Data:", { product_id: id, quantity, price, user_id });

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the cart.");
//       navigate("/login");
//       return;
//     }

//     if (!isInCart(id)) {
//       setCart((prevCart) => [...prevCart, { ...product, user_id }]);
//       setNotification(`✅ Product successfully added to your cart!`);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify({
//             user_id: user_id, // Include user_id here
//             product_id: id, // Make sure the product_id is correctly referenced
//             quantity: quantity,
//             price: price,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Error adding to cart: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//       }

//       if (isInWishlist(id)) {
//         setWishlist((prevWishlist) =>
//           prevWishlist.filter((item) => item.id !== id)
//         );

//         try {
//           const response = await fetch(`http://127.0.0.1:5000/wishlist/${id}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${currentUser.token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error(
//               `Error removing from wishlist: ${response.statusText}`
//             );
//           }
//         } catch (error) {
//           console.error("Error removing from wishlist:", error);
//         }
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your cart!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     fetch(`http://127.0.0.1:5000/cart/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser.token}`,
//       },
//     }).catch((error) => console.error("Error removing from cart:", error));
//   };

//   const addToWishlist = async (product) => {
//     const { id, quantity, price } = product;
//     const user_id = currentUser ? currentUser.id : null; // Retrieve user_id from currentUser
//     console.log("Product Data:", { product_id: id, quantity, price, user_id });

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the wishlist.");
//       navigate("/login");
//       return;
//     }

//     // Ensure product is not already in the wishlist
//     if (!isInWishlist(id)) {
//       setWishlist((prevWishlist) => [...prevWishlist, product]);
//       setNotification(`❤️ Product successfully added to your wishlist!`);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/wishlist", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify({
//             user_id: user_id,
//             product_id: id, // Ensure correct product_id
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Unknown error occurred");
//         }
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//         setNotification(`Error adding to wishlist: ${error.message}`);
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your wishlist!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((item) => item.id !== productId)
//     );

//     fetch(`http://127.0.0.1:5000/wishlist/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser.token}`,
//       },
//     }).catch((error) => console.error("Error removing from wishlist:", error));
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         loading,
//         notification,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./userContext.jsx";

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { currentUser } = useContext(UserContext); // Access current user from UserContext
//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     // Fetch cart data
//     fetch("http://127.0.0.1:5000/cart", {
//       headers: {
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCart(data.cart || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//         setLoading(false);
//       });

//     // Fetch wishlist data
//     fetch("http://127.0.0.1:5000/wishlist", {
//       headers: {
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setWishlist(data.wishlist || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist:", error);
//         setLoading(false);
//       });
//   }, [currentUser]);

//   const isInCart = (productId) => {
//     return cart.some((item) => item.id === productId);
//   };

//   const isInWishlist = (productId) => {
//     return wishlist.some((item) => item.id === productId);
//   };

//   const addToCart = async (product) => {
//     const { id, quantity, price } = product;
//     const user_id = currentUser?.id;

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the cart.");
//       navigate("/login");
//       return;
//     }

//     if (!isInCart(id)) {
//       setCart((prevCart) => [...prevCart, { ...product, user_id }]);
//       setNotification(`✅ Product successfully added to your cart!`);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify({
//             user_id,
//             product_id: id,
//             quantity,
//             price,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Error adding to cart: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//         setNotification(`Error adding to cart: ${error.message}`);
//       }

//       // Remove from wishlist if in wishlist
//       if (isInWishlist(id)) {
//         setWishlist((prevWishlist) =>
//           prevWishlist.filter((item) => item.id !== id)
//         );

//         try {
//           const response = await fetch(`http://127.0.0.1:5000/wishlist/${id}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${currentUser.token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error(
//               `Error removing from wishlist: ${response.statusText}`
//             );
//           }
//         } catch (error) {
//           console.error("Error removing from wishlist:", error);
//         }
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your cart!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     fetch(`http://127.0.0.1:5000/cart/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     }).catch((error) => console.error("Error removing from cart:", error));
//   };

//   const addToWishlist = async (product) => {
//     const { id } = product;
//     const user_id = currentUser ? currentUser.id : null;

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the wishlist.");
//       navigate("/login");
//       return;
//     }

//     if (!isInWishlist(id)) {
//       setWishlist((prevWishlist) => [...prevWishlist, product]);
//       setNotification(`❤️ Product successfully added to your wishlist!`);

//       const payload = {
//         user_id,
//         product_id: id,
//       };

//       console.log("Payload to be sent:", payload); // Log the payload

//       try {
//         const response = await fetch("http://127.0.0.1:5000/wishlist", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error response from server:", errorData); // Log server error
//           throw new Error(errorData.msg || "Unknown error occurred");
//         }
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//         setNotification(`Error adding to wishlist: ${error.message}`);
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your wishlist!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((item) => item.id !== productId)
//     );

//     fetch(`http://127.0.0.1:5000/wishlist/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     }).catch((error) => console.error("Error removing from wishlist:", error));
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         loading,
//         notification,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./userContext.jsx";

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { currentUser } = useContext(UserContext); // Access current user from UserContext
//   const navigate = useNavigate();

//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     console.log("Fetching cart data...");
//     fetch("http://127.0.0.1:5000/cart", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => {
//         console.log("Cart fetch response status:", response.status);
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Cart data fetched:", data);
//         setCart(data.cart || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//         setLoading(false);
//       });

//     console.log("Fetching wishlist data...");
//     fetch("http://127.0.0.1:5000/wishlist", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => {
//         console.log("Wishlist fetch response status:", response.status);
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Wishlist data fetched:", data);
//         setWishlist(data.wishlist || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist:", error);
//         setLoading(false);
//       });
//   }, [currentUser]);

//   const isInCart = (productId) => {
//     const found = cart.some((item) => item.id === productId);
//     console.log(`Product ${productId} in cart:`, found);
//     return found;
//   };

//   const isInWishlist = (productId) => {
//     const found = wishlist.some((item) => item.id === productId);
//     console.log(`Product ${productId} in wishlist:`, found);
//     return found;
//   };

//   const addToCart = async (product) => {
//     const { id, quantity, price } = product;
//     const user_id = currentUser?.id;

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the cart.");
//       navigate("/login");
//       return;
//     }

//     if (!isInCart(id)) {
//       setCart((prevCart) => [...prevCart, { ...product, user_id }]);
//       setNotification(`✅ Product successfully added to your cart!`);
//       console.log("Adding product to cart:", product);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/cart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify({
//             user_id,
//             product_id: id,
//             quantity,
//             price,
//           }),
//         });

//         console.log("Add to cart response status:", response.status);

//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error response from server:", errorData);
//           throw new Error(errorData.msg || "Unknown error occurred");
//         }
//         console.log("Product added to cart successfully.");
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//         setNotification(`Error adding to cart: ${error.message}`);
//       }

//       // Remove from wishlist if in wishlist
//       if (isInWishlist(id)) {
//         console.log("Removing product from wishlist:", id);
//         setWishlist((prevWishlist) =>
//           prevWishlist.filter((item) => item.id !== id)
//         );

//         try {
//           const response = await fetch(`http://127.0.0.1:5000/wishlist/${id}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${currentUser.token}`,
//             },
//           });

//           console.log("Remove from wishlist response status:", response.status);

//           if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Error response from server:", errorData);
//             throw new Error(errorData.msg || "Unknown error occurred");
//           }
//           console.log("Product removed from wishlist successfully.");
//         } catch (error) {
//           console.error("Error removing from wishlist:", error);
//         }
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your cart!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromCart = (productId) => {
//     console.log("Removing product from cart:", productId);
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

//     fetch(`http://127.0.0.1:5000/cart/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => {
//         console.log("Remove from cart response status:", response.status);
//         if (!response.ok) {
//           return response.json().then((errorData) => {
//             console.error("Error response from server:", errorData);
//             throw new Error(errorData.msg || "Unknown error occurred");
//           });
//         }
//       })
//       .catch((error) => console.error("Error removing from cart:", error));
//   };

//   const addToWishlist = async (product) => {
//     const { id } = product;
//     const user_id = currentUser ? currentUser.id : null;

//     if (!currentUser) {
//       setNotification("You need to log in to add items to the wishlist.");
//       navigate("/login");
//       return;
//     }

//     if (!isInWishlist(id)) {
//       setWishlist((prevWishlist) => [...prevWishlist, product]);
//       setNotification(`❤️ Product successfully added to your wishlist!`);
//       console.log("Adding product to wishlist:", product);

//       const payload = {
//         user_id,
//         product_id: id,
//       };

//       console.log("Payload to be sent:", payload);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/wishlist", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         console.log("Add to wishlist response status:", response.status);

//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error response from server:", errorData);
//           throw new Error(errorData.msg || "Unknown error occurred");
//         }
//         console.log("Product added to wishlist successfully.");
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//         setNotification(`Error adding to wishlist: ${error.message}`);
//       }

//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     } else {
//       setNotification("Product is already in your wishlist!");
//       setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     console.log("Removing product from wishlist:", productId);
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((item) => item.id !== productId)
//     );

//     fetch(`http://127.0.0.1:5000/wishlist/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${currentUser?.token}`,
//       },
//     })
//       .then((response) => {
//         console.log("Remove from wishlist response status:", response.status);
//         if (!response.ok) {
//           return response.json().then((errorData) => {
//             console.error("Error response from server:", errorData);
//             throw new Error(errorData.msg || "Unknown error occurred");
//           });
//         }
//       })
//       .catch((error) => console.error("Error removing from wishlist:", error));
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         loading,
//         notification,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
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
