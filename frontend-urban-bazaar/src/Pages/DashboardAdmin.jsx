import React, { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import home from "../assets/home.svg";
import logoutIcon from "../assets/logout.svg";
import orders from "../assets/order.svg";
import payments from "../assets/payments.svg";
import product from "../assets/product.svg";
import profile from "../assets/Profile.svg";
import reviews from "../assets/reviews.svg";

const Dashboard = () => {
  const { currentUser, logout } = useContext(UserContext);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProductsClick = () => {
    setProductsOpen(!isProductsOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // This assumes you have a logout function to handle the process
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F9FF] py-20">
      {/* Sidebar */}
      <aside className="ml-20 w-64 text-[#747474]">
        <nav className="p-4">
          <ul>
            <li className="mb-4">
              <NavLink
                to="dashboardAdmin"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={home} className="mr-3" alt="Home" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <button
                onClick={handleProductsClick}
                className="w-full text-left flex items-center px-4 py-6 block bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
              >
                <img src={product} className="mr-3" alt="product" />
                Products
                <span
                  className={`ml-auto transition-transform ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </button>
              {isProductsOpen && (
                <ul className="ml-4">
                  <li className="mb-4">
                    <NavLink
                      to="products/all"
                      className={({ isActive }) =>
                        isActive
                          ? "block px-4 py-4 bg-[#45B1E8] rounded flex items-center"
                          : "block px-4 py-4 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                      }
                    >
                      All Products
                    </NavLink>
                  </li>
                  <li className="mb-4">
                    <NavLink
                      to="products/add"
                      className={({ isActive }) =>
                        isActive
                          ? "block px-4 py-4 bg-[#45B1E8] rounded flex items-center"
                          : "block px-4 py-4 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                      }
                    >
                      Add Product
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-4">
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={orders} className="mr-3" alt="order" />
                Orders
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={reviews} className="mr-3" alt="reviews" />
                Reviews
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="customers"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={profile} className="mr-3" alt="profile" />
                Customers
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="payments"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={payments} className="mr-3" alt="payments" />
                Payments
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="contacts"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={profile} className="mr-3" alt="logout" />
                Contacts
              </NavLink>
            </li>
            <li className="mb-4">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-6 block bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
              >
                <img src={logoutIcon} className="mr-3" alt="logout" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F0F9FF]">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
