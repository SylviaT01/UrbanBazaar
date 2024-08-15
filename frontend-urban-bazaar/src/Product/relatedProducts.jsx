import React, { useState } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Calculate the index of the first and last product to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = relatedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Determine the start and end page numbers for pagination
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  return (
    <div className="container px-4 py-8 max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full">
      <h2 className="mb-2 flex justify-center text-xl font-semibold">
        You May Also Like This
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 bg-blue-50 z-100 px-4 py-4 mb-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white aos-init"
          >
            <div className="flex-grow border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[200px] mx-auto flex justify-center items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-[300px] object-cover"
                  />
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
              {/* <button className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md">Add to Cart</button> */}
              <Link
                to={`/products/${product.id}`}
                className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex items-center space-x-2">
            <li>
              <button
                onClick={handlePreviousPage}
                className="px-4 py-2 border rounded-md bg-white text-blue-400"
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {start > 1 && (
              <>
                <li>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="px-4 py-2 border rounded-md bg-white text-blue-400"
                  >
                    1
                  </button>
                </li>
                {start > 2 && (
                  <li>
                    <span className="px-4 py-2 text-gray-500">...</span>
                  </li>
                )}
              </>
            )}
            {Array.from(
              { length: end - start + 1 },
              (_, index) => start + index
            ).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded-md ${
                    page === currentPage
                      ? "bg-blue-400 text-white"
                      : "bg-white text-blue-400"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            {end < totalPages && (
              <>
                {end < totalPages - 1 && (
                  <li>
                    <span className="px-4 py-2 text-gray-500">...</span>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 border rounded-md bg-white text-blue-400"
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 border rounded-md bg-white text-blue-400"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RelatedProducts;
