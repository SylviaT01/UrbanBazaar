import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import RelatedProducts from "./relatedProducts";
import TopPicksFour from "./top-picksfour";
import { useCart } from "../contexts/cartContext";
import { UserContext } from "../contexts/userContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { addToCart, addToWishlist, notification } = useCart();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // Fetch product details
    fetch(`https://backend-urbanbazaar.onrender.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);

        // Set the first image as the default selected image
        if (data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        }

        // Fetch related products
        fetch(
          `https://backend-urbanbazaar.onrender.com/products/category/${data.product.category}`
        )
          .then((response) => response.json())
          .then((relatedData) => {
            setRelatedProducts(
              relatedData.products.filter((p) => p.id !== data.product.id)
            );
          });
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    // Fetch reviews
    fetch(`https://backend-urbanbazaar.onrender.com/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) =>
        console.error("Error fetching product reviews:", error)
      );
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const handleAddToCart = () => {
    if (currentUser) {
      addToCart({ ...product, quantity });
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleAddToWishlist = () => {
    if (currentUser) {
      addToWishlist(product);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container px-4 py-8 max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full">
      {/* Login prompt modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Login Required</h2>
            <p className="mb-4 text-center">
              You need to log in to add items to the cart or wishlist. Please
              log in to continue.
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                to="/login"
                className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 text-center"
              >
                Log In
              </Link>
              <button
                onClick={closeLoginPrompt}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Thumbnail images */}
        <div className="flex flex-wrap lg:flex-col lg:w-1/6 gap-4 mb-4 lg:mb-0">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className={`w-10 h-10 object-cover cursor-pointer rounded-lg shadow-md ${
                selectedImage === image ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        {/* Main product image */}
        <div className="flex-1 mb-4 lg:mb-0">
          <img
            src={selectedImage}
            alt="Main Product"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-medium mb-2">{product.title}</h1>
          <h2 className="mb-2 capitalize text-lg">
            <span className="font-medium text-gray-900">Category:</span>
            <span className="font-normal text-gray-700">
              {" "}
              {product.category}
            </span>
          </h2>
          <h2 className="text-lg mb-4 capitalize">
            <span className="font-medium text-gray-900">Brand:</span>
            <span className="font-normal text-gray-700"> {product.brand}</span>
          </h2>

          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">SKU:</span>
            <span className="font-normal text-gray-700"> {product.sku}</span>
          </p>
          <p className="text-md text-gray-700 mb-2">
            <span className="font-medium text-gray-900">Price:</span> Ksh.{" "}
            {Math.round(
              (product.price * (100 - product.discountPercentage)) / 100
            )}
          </p>
          <p className="text-md text-gray-500 mb-4">
            <span className="font-medium text-gray-900">Original Price:</span>
            <span className="line-through text-gray-700">
              {" "}
              Ksh. {product.price}
            </span>
          </p>
          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">Description:</span>{" "}
            {product.description}
          </p>
          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">Stock:</span>
            <span className="font-normal text-red-500"> {product.stock}</span>
          </p>

          <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:items-center lg:gap-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Add to Wishlist
            </button>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center mx-2 border rounded"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-4 mb-2">
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Shipping:</span>
              <span className="font-light text-gray-700">
                {" "}
                {product.shippingInformation}
              </span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Availability:</span>
              <span className="font-bold text-yellow-500">
                {" "}
                {product.availabilityStatus}
              </span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Return Policy:</span>
              <span className="font-light text-gray-600">
                {" "}
                {product.returnPolicy}
              </span>
            </p>
          </div>
          <div className="flex flex-row justify-between space-x-4 mb-2">
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Weight:</span>
              <span className="font-light text-gray-600">
                {" "}
                {product.weight}g
              </span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Dimensions:</span>
              <span className="font-light text-gray-600">
                {" "}
                {product.dimensions.width}x{product.dimensions.height}x
                {product.dimensions.depth} mm
              </span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Warranty:</span>
              <span className="italic text-gray-700">
                {" "}
                {product.warrantyInformation}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 p-4 md:p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-t pt-4 last:border-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                <span className="font-medium text-gray-900">{review.reviewer_name}</span>
                <span className="ml-2 text-yellow-500 text-sm sm:text-base">{"★".repeat(review.rating)}</span>
                <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts relatedProducts={relatedProducts} />
      <div className="4-items">
        <h1 className="mb-2 flex justify-center text-xl font-semibold">
          Top picks
        </h1>
        <TopPicksFour />
      </div>
      <div className="flex justify-center py-4">
        <Link
          to="/toppicks"
          className="bg-blue-300 text-gray-600 text-sm px-2 py-2 rounded-md"
        >
          View Top Picks
        </Link>
      </div>
      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
