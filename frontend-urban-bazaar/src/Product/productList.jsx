import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=0')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        const uniqueCategories = ['All', ...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.images[0]} // Display the first image
              alt={product.title} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-2">Ksh {product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
