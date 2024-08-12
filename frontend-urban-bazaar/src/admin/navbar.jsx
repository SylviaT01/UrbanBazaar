import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import bell from "../assets/bell.svg";
import { UserContext } from "../contexts/userContext";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={`flex flex-col items-center w-full pb-8`}>
      <div className="flex justify-between items-center w-full px-5 pt-2 bg-white max-w-[1440px]">
        <div className="flex gap-5 items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="UrbanBazaar Logo"
              className="w-32 h-auto p-2"
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 flex-grow justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-2 py-1 border border-gray-300 rounded-md"
            />
            <button type="submit" className="ml-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-700 text-lg" />
            </button>
          </form>
          
        </div>
        <div className="flex gap-4">
          <div className="flex gap-5 items-start px-2.5 pt-2.5 pb-4 min-h-[50px]">
            {/* <DarkModeToggle
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            /> */}
            <div className="flex gap-5 items-center w-6">
              <img
                src={bell}
                className="object-contain self-stretch my-auto w-6 aspect-square"
                alt="Notifications"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {authToken ? (
              <Link to="/dashboard/dashboardAdmin" className="text-gray-700 hover:text-blue-700 flex items-center text-xs">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-1">My Account</span>
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-700 flex items-center text-xs">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-1 text-md">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
