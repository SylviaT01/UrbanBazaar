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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F0F9FF] pt-10">
      {/* Toggle Button */}
      <button
        className="md:hidden p-4 bg-[#45B1E8] text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 bg-white text-[#747474] shadow-md transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-full md:h-auto pt-16 z-20`}
      >
        <nav className="p-4">
          <ul>
            <li className="mb-4">
              <NavLink
                to="dashboardAdmin"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={home} className="mr-3 w-6 h-6" alt="Home" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <button
                onClick={handleProductsClick}
                className="w-full text-left flex items-center px-4 py-6 block bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
              >
                <img src={product} className="mr-3 w-6 h-6" alt="product" />
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
                          ? "block px-4 py-4 bg-[#45B1E8] rounded flex items-center text-white"
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
                          ? "block px-4 py-4 bg-[#45B1E8] rounded flex items-center text-white"
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
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={orders} className="mr-3 w-6 h-6" alt="order" />
                Orders
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={reviews} className="mr-3 w-6 h-6" alt="reviews" />
                Reviews
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="customers"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={profile} className="mr-3 w-6 h-6" alt="profile" />
                Customers
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="payments"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={payments} className="mr-3 w-6 h-6" alt="payments" />
                Payments
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="contacts"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-6 bg-[#45B1E8] rounded flex items-center text-white"
                    : "block px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                }
              >
                <img src={profile} className="mr-3 w-6 h-6" alt="contacts" />
                Contacts
              </NavLink>
            </li>
            <li className="mb-4">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-6 block bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
              >
                <img src={logoutIcon} className="mr-3 w-6 h-6" alt="logout" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F0F9FF] p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
