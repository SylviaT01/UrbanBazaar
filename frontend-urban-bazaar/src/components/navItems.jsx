import React from 'react';
import { Link } from 'react-router-dom';

export default function NavItems() {
  return (
    <nav className="bg-blue-100 border-b border-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-1">
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
    </nav>
  )
}
