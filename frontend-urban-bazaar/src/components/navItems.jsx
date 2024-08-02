import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NavItems() {
  return (
    <nav className="bg-blue-100 border-b border-gray-300">
      <div className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 bg-blue-200 border-b border-gray-300">
        <div className="flex h-8 items-center justify-end">
          <div className="flex space-x-4">
            <Link to="/join" className="text-gray-700 hover:text-blue-700">
              Join UrbanBazaar
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700">
              About us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-8 left-0 w-full px-4 sm:px-6 lg:px-8 bg-slate-200 border-b border-gray-300">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-blue-700 text-2xl font-bold">
              UrbanBazaar
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/account" className="text-gray-700 hover:text-blue-700 flex items-center text-xs">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
              <span className="ml-1">My Account</span>
            </Link>
            <Link to="/wishlist" className="text-gray-700  hover:text-blue-700 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-700 flex items-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
