import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import userimage from "../assets/userimage.svg";
import userdashboard from "../assets/userdashboard.svg";
import orderhistory from "../assets/orderhistory.svg";
import userprofile from "../assets/userprofile.svg";
import whishlist from "../assets/wishlist.svg";
import logoutuser from "../assets/logoutuser.svg";

const UserProfile = () => {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-[#F0F9FF] py-20">
      {/* Sidebar */}
      <aside className="ml-20 w-64 text-[#747474] ">
        <div className="p-4">
          {/* User Profile */}
          <div className="flex items-center mb-4 border-b-2 border-gray-200">
            <img
              src={userimage}
              alt="User Profile"
              className="rounded-full w-24 h-24 mr-2"
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
                  <img
                    src={userdashboard}
                    className="mr-3"
                    alt="User Dashboard"
                  />
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
                  <img
                    src={orderhistory}
                    className="mr-3"
                    alt="Order History"
                  />
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
                  <img src={whishlist} className="mr-3" alt="Wishlist" />
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
                  <img
                    src={userprofile}
                    className="mr-3"
                    alt="Update Profile"
                  />
                  Update Profile
                </NavLink>
              </li>
              <li className="mb-4">
                <button
                  onClick={handleLogout}
                  className=" px-4 py-6 w-full text-left flex items-center bg-[#FFFFFF] hover:bg-[#d1d5db] rounded"
                >
                  <img src={logoutuser} className="mr-3" alt="Logout" />
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
