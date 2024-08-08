import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext"; // Adjust the import path accordingly
import userimage from "../assets/userimage.svg";
import userdashboard from "../assets/userdashboard.svg";
import orderhistory from "../assets/orderhistory.svg";
import userprofile from "../assets/userprofile.svg";
import whishlist from "../assets/wishlist.svg";
import logoutuser from "../assets/logoutuser.svg";

const UserProfile = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully"); 
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen m-10">
      {/* Sidebar */}
      <div className="w-1/6 bg-white h-screen p-4 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center mb-2 border-b-2 border-gray-200">
            <img
              src={userimage}
              alt="User Profile"
              className="rounded-full w-24 h-24 mr-2"
            />
            <h2 className="text-xl text-gray-700">John Doe</h2>
          </div>

          <nav className="flex flex-col w-full">
            <NavLink
              to="dashboarduser"
              className={({ isActive }) =>
                `py-2 px-4 flex items-center ${
                  isActive
                    ? "text-white bg-[#B5E0F6] border-[#41ADE3]"
                    : "text-[#41ADE3] border-b-2 border-[#41ADE3]"
                }`
              }
            >
              <img src={userdashboard} alt="userdashboard" className="mr-3" />
              Dashboard
            </NavLink>
            <NavLink
              to="orderhistory"
              className={({ isActive }) =>
                `py-2 px-4 flex items-center ${
                  isActive
                    ? "text-white bg-[#B5E0F6] border-[#41ADE3]"
                    : "text-[#41ADE3] border-b-2 border-[#41ADE3]"
                }`
              }
            >
              <img src={orderhistory} alt="orderhistory" className="mr-3" />
              Order History
            </NavLink>
            <NavLink
              to="wishlist"
              className={({ isActive }) =>
                `py-2 px-4 flex items-center ${
                  isActive
                    ? "text-white bg-[#B5E0F6] border-[#41ADE3]"
                    : "text-[#41ADE3] border-b-2 border-[#41ADE3]"
                }`
              }
            >
              <img src={whishlist} alt="wishlist" className="mr-3" />
              Wishlist
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `py-2 px-4 flex items-center ${
                  isActive
                    ? "text-white bg-[#B5E0F6] border-[#41ADE3]"
                    : "text-[#41ADE3] border-b-2 border-[#41ADE3]"
                }`
              }
            >
              <img src={userprofile} alt="userprofile" className="mr-3" />
              Update Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="py-2 px-4 flex items-center text-[#41ADE3] border-b-2 border-[#41ADE3] bg-white hover:bg-[#B5E0F6]"
            >
              <img src={logoutuser} alt="logoutuser" className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-5/6 p-6 bg-[#F0F9FF]">
        <Outlet /> {/* Render the selected component here */}
      </div>
    </div>
  );
};

export default UserProfile;
