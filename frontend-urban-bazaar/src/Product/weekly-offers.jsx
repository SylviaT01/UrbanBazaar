import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const WeeklyOffers = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        const products = data.products;

        if (Array.isArray(products)) {
          // Group products by category
          const categoryMap = new Map();
          products.forEach((product) => {
            if (!categoryMap.has(product.category)) {
              categoryMap.set(product.category, product);
            }
          });

          // Extract one product per category
          const uniqueCategoryProducts = Array.from(categoryMap.values());
          setTopProducts(uniqueCategoryProducts);
        } else {
          setError('Expected an array of products under "products" key');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 bg-blue-50 z-100 px-4 py-4 mb-0">
      {topProducts.map((product) => (
        <div
          key={product.id}
          className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white aos-init"
        >
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
                      <img
                        src={image}
                        alt={`Product avatar ${imageIndex + 1}`}
                        className="max-h-[300px] object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <h3 className="font-medium text-sm mb-1">{product.title}</h3>
          <p className="text-gray-700 mb-2">
            Ksh.{" "}
            {Math.round(
              (product.price * (100 - product.discountPercentage)) / 100
            )}
          </p>
          <p className="text-gray-700 mb-2 line-through">
            Ksh. {product.price}
          </p>
          <div className="flex items-center space-x-6">
            <button className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md">
              Add to cart
            </button>
            <button className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md">
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyOffers;
