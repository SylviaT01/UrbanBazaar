import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-2 text-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full max-w-md px-2 py-1 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
