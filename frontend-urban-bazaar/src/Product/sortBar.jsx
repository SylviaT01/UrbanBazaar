import React from 'react';

const SortBar = ({ sortOption, onSortChange }) => {
  return (
    <div className="ml-4 inline-block">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={onSortChange}
        className="px-2 py-1 border rounded-md bg-white text-gray-700"
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="titleAsc">Title: A-Z</option>
        <option value="titleDesc">Title: Z-A</option>
      </select>
    </div>
  );
};

export default SortBar;
