import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the faHeart icon
import profile from "../assets/Profile.svg";
import orders from "../assets/order.svg";
import logoutIcon from "../assets/logout.svg";

const UserProfile = () => {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        Please log in to access your profile.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F0F9FF] py-5">
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
        className={`fixed md:relative top-0 left-0 w-64 text-[#747474] bg-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-full md:h-auto pt-16 z-20`}
      >
        <div className="p-4">
          {/* User Profile */}
          <div className="flex items-center mb-4 border-b-2 border-gray-200">
            <img
              src={profile}
              alt="User Profile"
              className="rounded-full w-12 h-12 mr-2 py-3 px-3 bg-blue-300 mb-4"
            />
            <h2 className="text-md text-gray-700">
              {currentUser.username || "User"}
            </h2>
          </div>

          {/* Navigation */}
          <nav>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="dashboarduser"
                  className={({ isActive }) =>
                    isActive
                      ? " px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                      : " px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                  }
                >
                  <img src={profile} className="mr-3" alt="User Dashboard" />
                  Dashboard
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="orderhistory"
                  className={({ isActive }) =>
                    isActive
                      ? " px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                      : " px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                  }
                >
                  <img src={orders} className="mr-3" alt="Order History" />
                  Order History
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? " px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                      : " px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                  }
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-3" />{" "}
                  {/* Updated to use faHeart icon */}
                  Wishlist
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive
                      ? " px-4 py-6 bg-[#45B1E8] rounded flex items-center"
                      : " px-4 py-6 bg-[#FFFFFF] hover:bg-[#d1d5db] rounded flex items-center"
                  }
                >
                  <img src={profile} className="mr-3" alt="Update Profile" />
                  Update Profile
                </NavLink>
              </li>
              <li className="mb-4">
                <button
                  onClick={handleLogout}
                  className=" px-4 py-6 w-full text-left flex items-center bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
                >
                  <img src={logoutIcon} className="mr-3" alt="Logout" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F0F9FF] p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
