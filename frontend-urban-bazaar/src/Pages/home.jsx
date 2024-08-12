import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import WeeklyOffersFour from "../Product/weeklyoffersfour";
import TopPicksFour from "../Product/top-picksfour";

const Home = () => {
  const sliderRef = useRef(null);
  const [categoryImages, setCategoryImages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();

    // Fetch all products from API
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          const products = data.products;

          // Define the categories you want to fetch
          const desiredCategories = [
            "furniture",
            "home-decoration",
            "mens-shoes",
            "womens-dresses",
            "laptops",
          ];

          // Filter products by the desired categories
          const filteredProducts = products.filter((product) =>
            desiredCategories.includes(product.category)
          );

          // Extract one product per category
          const uniqueCategoryProducts = Array.from(
            new Set(filteredProducts.map((p) => p.category))
          ).map((category) => {
            return filteredProducts.find((p) => p.category === category);
          });

          const categoryImages = uniqueCategoryProducts.map((product) => ({
            category: product.category,
            imageUrl: product.images[0],
          }));

          setCategoryImages(categoryImages);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-full overflow-hidden relative">
          <div className="slider-container h-full">
            <Slider ref={sliderRef} {...settings}>
              <div className="relative">
                <img
                  src={slide1}
                  alt="Woman after shopping"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="relative">
                <img
                  src={slide2}
                  alt="Enjoy the view"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="relative">
                <img
                  src={slide3}
                  alt="Smile after shopping"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
            </Slider>
            <button
              onClick={goToPrevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-md z-10 text-white"
            >
              <GoChevronLeft />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-md z-10 text-white"
            >
              <GoChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-[10%] w-full flex justify-center bg-transparent z-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-xl flex gap-4 sm:gap-6 lg:gap-8 py-4 overflow-x-auto">
          {categoryImages.map((category, index) => (
            <div
              key={index}
              className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white transition transform hover:scale-105"
            >
              <div className="flex-grow border border-[#e4e4e4] h-[200px] sm:h-[250px] lg:h-[300px] mb-4 relative overflow-hidden group">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="w-[150px] sm:w-[200px] mx-auto flex justify-center items-center">
                    <img
                      src={category.imageUrl}
                      alt={category.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-sm sm:text-base mb-1 capitalize text-center">
                {category.category}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-[150px] sm:pt-[200px] lg:pt-[250px]">
        <div className="flex justify-center py-10 mt-12">
          <Link
            to="/products"
            className="bg-blue-300 text-gray-600 text-sm sm:text-base px-4 py-2 rounded-md "
          >
            View All Categories
          </Link>
        </div>
        <div className="4-items">
          <h1 className="mb-2 flex justify-center text-xl sm:text-2xl font-semibold">Weekly Offers</h1>
          <WeeklyOffersFour />
          <div className="flex justify-center py-4">
            <Link
              to="/weeklyoffers"
              className="bg-blue-300 text-gray-600 text-sm sm:text-base px-4 py-2 rounded-md "
            >
              View All Offers
            </Link>
          </div>
          <div className="4-items">
            <h1 className="mb-2 flex justify-center text-xl sm:text-2xl font-semibold">Top Picks</h1>
            <TopPicksFour />
          </div>
          <div className="flex justify-center py-4">
            <Link
              to="/toppicks"
              className="bg-blue-300 text-gray-600 text-sm sm:text-base px-4 py-2 rounded-md "
            >
              View Top Picks
            </Link>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Home;