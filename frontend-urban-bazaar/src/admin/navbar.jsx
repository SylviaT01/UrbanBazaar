import React, { useState, useContext, useEffect } from "react";
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
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/admin/messages");
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.messages.slice(0, 5));
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const closeModal = () => {
    setShowNotifications(false);
  };

  const handleViewMore = (id) => {
    setExpandedNotificationId(id);
  };

  const handleViewLess = () => {
    setExpandedNotificationId(null);
  };

  return (
    <div className={`flex flex-col items-center w-full pb-8`}>
      <div className="flex justify-between items-center w-full px-5 pt-2 bg-white max-w-[1440px]">
        <div className="flex gap-5 items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="UrbanBazaar Logo" className="w-32 h-auto p-2" />
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
          <div className="relative flex gap-5 items-center px-2.5 pt-2.5 pb-4 min-h-[50px]">
            <img
              src={bell}
              className="object-contain self-stretch my-auto w-6 aspect-square cursor-pointer "
              alt="Notifications"
              onClick={handleBellClick}
            />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
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

      {/* Dropdown for Notifications */}
      {showNotifications && (
        <div className="fixed top-16 right-5 bg-white border border-gray-300 rounded shadow-lg w-80 max-w-full z-50">
          <div className="p-4 relative max-h-96 overflow-y-auto">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const isExpanded = expandedNotificationId === notification.id;
                const maxLength = 50; 

                return (
                  <div key={notification.id} className="p-4 border-b">
                    <p className="font-semibold">{notification.name} ({notification.email})</p>
                    <p>
                      {isExpanded ? notification.message : notification.message.length > maxLength ? `${notification.message.slice(0, maxLength)}...` : notification.message}
                    </p>
                    {notification.message.length > maxLength && (
                      <button 
                        onClick={() => isExpanded ? handleViewLess() : handleViewMore(notification.id)}
                        className="text-blue-600 hover:underline"
                      >
                        {isExpanded ? 'View less' : 'View more'}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center">No notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
