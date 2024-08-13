import React, { useState, useEffect } from "react";
import Profile from "../assets/Profile.svg";
import Rating from "react-rating-stars-component";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);

  useEffect(() => {
    fetch("https://backend-urbanbazaar.onrender.com/review")
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbersToShow = 5;
  const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);

  const getPageNumbers = () => {
    let startPage, endPage;

    if (totalPages <= pageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfPageNumbersToShow) {
      startPage = 1;
      endPage = pageNumbersToShow;
    } else if (currentPage + halfPageNumbersToShow >= totalPages) {
      startPage = totalPages - pageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPageNumbersToShow;
      endPage = currentPage + halfPageNumbersToShow;
    }

    return [...Array(endPage - startPage + 1).keys()].map((i) => i + startPage);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-4 ">
      <div className="self-start -mt-4 ml-6 text-2xl font-bold tracking-tight leading-loose text-gray-800 max-md:mt-10 max-md:ml-2.5">
        Reviews
      </div>
      <div className="-mt-12 w-full max-w-[1239px] max-md:max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-md:flex-col">
          {currentReviews.map((review) => (
            <div
              className="flex flex-col p-6 bg-white rounded shadow-[0px_10px_60px_rgba(226,236,249,0.5)"
                
              key={review.id}
            >
              <div className="flex items-center gap-3">
                <img
                  src={Profile}
                  alt="Reviewer"
                  className="object-contain shrink-0 rounded-full w-[53px]"
                />
                <div className="flex flex-col">
                  <div className="font-semibold">{review.reviewer_name}</div>
                  <div className="text-sm text-gray-600">
                    {review.reviewer_email}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Rating
                  value={review.rating}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
              </div>
              <div className="mt-4 text-sm">{review.comment}</div>
              <div className="mt-2 text-xs text-gray-500">{`Product ID: ${review.product_id}`}</div>
              <div className="mt-1 text-xs text-gray-500">{`Date: ${review.date}`}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <span className="text-sm text-gray-500">
            Showing {indexOfFirstReview + 1} to {indexOfLastReview} of{" "}
            {reviews.length} entries
          </span>
          <div className="flex space-x-2 sm:mt-0">
            <button
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"
              }`}
              onClick={() => currentPage > 1 && paginate(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>
            <button
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"
              }`}
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPageNumbers().map((number) => (
              <button
                key={number}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "text-white bg-indigo-600"
                    : "bg-neutral-100"
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-neutral-300" : "bg-neutral-100"
              }`}
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-neutral-300" : "bg-neutral-100"
              }`}
              onClick={() => currentPage < totalPages && paginate(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
