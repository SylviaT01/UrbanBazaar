import React, { useState, useEffect } from 'react';
import Categories from './categories'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
        <h2 className="text-xl font-semibold text-center uppercase">Products</h2>
        <div className=" text-center mb-2 border-b">
        <Categories
          categories={categories.map(cat => ({ id: cat, name: cat }))}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 bg-blue-50 z-100 px-4 py-4 mb-0">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            {/* <img 
              src={product.images[0]}
              alt={product.title} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            /> */}
            <div className="flex-grow border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                            <div className="w-full h-full flex justify-center items-center">
                                <div className="w-[200px] mx-auto flex justify-center items-center">
                                    <Swiper
                                        spaceBetween={30}
                                        navigation
                                        pagination={{ clickable: true }}
                                    >
                                        {product.images.map((image, imageIndex) => (
                                            <SwiperSlide key={imageIndex}>
                                                <img src={image} alt={`Product avatar ${imageIndex + 1}`} className="max-h-[300px] image-cover" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
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
