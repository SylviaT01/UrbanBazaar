import React, { useState, useEffect, useContext } from "react";
import star from "../assets/star.svg";
import { UserContext } from "../contexts/userContext";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateValue, setUpdateValue] = useState("");
  const [notification, setNotification] = useState(null);
  const productsPerPage = 6;
  const { currentUser, authToken } = useContext(UserContext);

  // Function to fetch product data
  const fetchData = () => {
    fetch("https://backend-urbanbazaar.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

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

  // Handle price update
  const handleEditPrice = (productId) => {
    if (currentUser.username !== "admin") {
      alert("You do not have permission to edit prices.");
      return;
    }

    const token = authToken || localStorage.getItem("access_token");
    fetch(`https://backend-urbanbazaar.onrender.com/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price: updateValue }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        setNotification(`Price updated to Ksh ${updateValue}`);
        setEditingProduct(null);
        setUpdateValue("");
        fetchData(); // Refresh the product list
      })
      .catch((error) => console.error("Error updating price:", error));
  };

  // Handle discount percentage update
  const handleDiscountPercentage = (productId) => {
    if (currentUser.username !== "admin") {
      alert("You do not have permission to update discounts.");
      return;
    }

    const token = authToken || localStorage.getItem("access_token");
    const discount_percentage = Number(updateValue);

    if (
      isNaN(discount_percentage) ||
      discount_percentage < 0 ||
      discount_percentage > 100
    ) {
      alert("Please enter a valid discount percentage between 0 and 100.");
      return;
    }

    fetch(`https://backend-urbanbazaar.onrender.com/products/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount_percentage: discount_percentage }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        setNotification(
          `Discount percentage updated to ${discount_percentage}%`
        );
        setEditingProduct(null);
        setUpdateValue("");
        fetchData(); // Refresh the product list
      })
      .catch((error) =>
        console.error("Error updating discount percentage:", error)
      );
  };

  // Handle stock update
  const handleStockChange = (productId) => {
    if (currentUser.username !== "admin") {
      alert("You do not have permission to change stock.");
      return;
    }

    const token = authToken || localStorage.getItem("access_token");
    const stockChange = Number(updateValue);

    if (isNaN(stockChange) || stockChange < 0) {
      alert("Please enter a valid number for stock change.");
      return;
    }

    fetch(`https://backend-urbanbazaar.onrender.com/products/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: stockChange }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
        setNotification(`Stock updated to ${stockChange}`);
        setEditingProduct(null);
        setUpdateValue("");
        fetchData(); // Refresh the product list
      })
      .catch((error) => console.error("Error updating stock:", error));
  };

  // Handle input changes for update
  const handleUpdateChange = (e) => {
    setUpdateValue(e.target.value);
  };

  // Handle form submission for updates
  const handleUpdateSubmit = (productId) => {
    if (editingProduct) {
      if (editingProduct.action === "price") {
        handleEditPrice(productId);
      } else if (editingProduct.action === "discount_percentage") {
        handleDiscountPercentage(productId);
      } else if (editingProduct.action === "stock") {
        handleStockChange(productId);
      }
    }
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting option changes
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.title
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    .sort((a, b) => {
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "instock") return b.stock - a.stock;
      return 0;
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="ml-10">
      <div className="bg-white p-4 min-h-screen">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center md:flex-1 space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="text-xl font-bold md:flex-1">All Products</h1>
            <div className="relative flex-shrink-0 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border rounded-md w-full"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.78-5.61A7.5 7.5 0 1112 5a7.5 7.5 0 015.61 1.78z"
                  ></path>
                </svg>
              </span>
            </div>

            <select
              value={sortOption}
              onChange={handleSort}
              className="p-2 border rounded-md md:w-1/3"
            >
              <option value="newest">Sort by Newest</option>
              <option value="price">Sort by Price</option>
              <option value="instock">Sort by In Stock</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="p-4 border rounded-md">
              <div className="w-[300px] mx-auto flex justify-center items-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="max-h-[300px] h-[300px] object-cover"
                />
              </div>

              <h2 className="font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-gray-800 flex items-center">
                <img src={star} alt="rating" className="mr-2" />
                {product.rating.toFixed(1)} Reviews
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">Ksh {product.price}</span>
                {currentUser.username === "admin" && (
                  <button
                    onClick={() => {
                      setEditingProduct({
                        id: product.id,
                        action: "price",
                      });
                      setUpdateValue(product.price);
                    }}
                    className="bg-[#7C7C7C] text-white px-7 py-2 rounded-md"
                  >
                    Edit Price
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center mt-2">
                {currentUser.username === "admin" && (
                  <>
                    <button
                      onClick={() => {
                        setEditingProduct({
                          id: product.id,
                          action: "discount_percentage",
                        });
                        setUpdateValue(product.discount_percentage);
                      }}
                      className="bg-[#24D20D] text-white px-8 py-2 rounded-md"
                    >
                      Discount
                    </button>
                    <button
                      onClick={() => {
                        setEditingProduct({
                          id: product.id,
                          action: "stock",
                        });
                        setUpdateValue(product.stock);
                      }}
                      className="bg-[#FF0F0F] text-white px-11 py-2 rounded-md"
                    >
                      Stock
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-2">
                {editingProduct.action === "price"
                  ? "Update Price"
                  : editingProduct.action === "discount_percentage"
                  ? "Update Discount Percentage"
                  : "Update Stock"}
              </h3>
              {editingProduct.action === "price" && (
                <div>
                  <label className="block mb-2">New Price:</label>
                  <input
                    type="number"
                    value={updateValue}
                    onChange={handleUpdateChange}
                    className="p-2 border rounded-md w-full mb-2"
                  />
                  <button
                    onClick={() => handleUpdateSubmit(editingProduct.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              )}
              {editingProduct.action === "discount_percentage" && (
                <div>
                  <label className="block mb-2">Discount Percentage:</label>
                  <input
                    type="number"
                    value={updateValue}
                    onChange={handleUpdateChange}
                    className="p-2 border rounded-md w-full mb-2"
                    placeholder="Enter discount percentage"
                    min="0"
                    max="100"
                  />
                  <button
                    onClick={() => handleUpdateSubmit(editingProduct.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              )}
              {editingProduct.action === "stock" && (
                <div>
                  <label className="block mb-2">Stock Change:</label>
                  <input
                    type="number"
                    value={updateValue}
                    onChange={handleUpdateChange}
                    className="p-2 border rounded-md w-full mb-2"
                    placeholder="Enter stock change"
                  />
                  <button
                    onClick={() => handleUpdateSubmit(editingProduct.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              )}
              <button
                onClick={() => setEditingProduct(null)}
                className="mt-2 text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-lg">
            {notification}
          </div>
        )}

        <footer className="flex flex-col items-center mt-4">
          {filteredProducts.length > productsPerPage && (
            <div className="flex flex-wrap justify-center mb-2">
              {Array.from(
                {
                  length: Math.min(
                    6,
                    Math.ceil(filteredProducts.length / productsPerPage)
                  ),
                },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 mx-1 ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } rounded-md`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              {Math.ceil(filteredProducts.length / productsPerPage) > 6 && (
                <div className="flex items-center">
                  <span className="mx-2">...</span>
                  <input
                    type="number"
                    min="1"
                    max={Math.ceil(filteredProducts.length / productsPerPage)}
                    value={currentPage}
                    onChange={(e) => paginate(Number(e.target.value))}
                    className="w-12 p-1 border rounded-md text-center"
                  />
                  <span className="mx-2">
                    of {Math.ceil(filteredProducts.length / productsPerPage)}
                  </span>
                </div>
              )}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
