import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.svg';
import { useCart } from '../contexts/cartContext';
import { UserContext } from '../contexts/userContext'; // Adjust the import path accordingly

export default function NavItems() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart, wishlist } = useCart(); // Access wishlist from context
  const { authToken } = useContext(UserContext); // Access authentication state

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
    <nav className="bg-blue-100 border-b border-gray-300 relative">
      <div className="bg-blue-200 border-b border-gray-300">
        <div className="flex h-8 items-center justify-end px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <Link to="/signup" className="text-gray-700 font-medium text-sm hover:text-blue-700">
              Join UrbanBazaar
            </Link>
            <Link to="/about" className="text-gray-700 font-medium text-sm hover:text-blue-700">
              About us
            </Link>
            <Link to="/contact" className="text-gray-700 font-medium text-sm hover:text-blue-700">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-b border-gray-300">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="UrbanBazaar Logo"
                className="w-32 h-auto p-2"
              />
            </Link>
          </div>
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
          <div className="flex items-center space-x-6">
            {authToken ? (
              <Link to="userprofile/dashboarduser" className="text-gray-700 hover:text-blue-700 flex items-center text-xs">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-1">My Account</span>
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-700 flex items-center text-xs">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-1 text-md">Login</span>
              </Link>
            )}
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-700 flex items-center relative">
              <FontAwesomeIcon icon={faHeart} className="text-lg border border-gray-400 rounded-full p-1" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full text-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-700 flex items-center relative">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg border border-gray-400 rounded-full p-1" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full text-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="bg-slate-200 h-8 w-full flex items-center">
          <div className="flex justify-start space-x-8 px-4 sm:px-6 lg:px-8">
            <Link to="/products" className="text-gray-700 font-medium text-sm hover:text-blue-700">
              Shop by Category
            </Link>
            <Link to="/products" className="text-gray-700 font-medium text-sm hover:text-blue-700">
              Shop by Brand
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
