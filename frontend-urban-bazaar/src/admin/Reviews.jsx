import React, { useState, useEffect } from "react";
import profile from "../assets/profile.svg";
import Rating from "react-rating-stars-component";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);
  const [selectedReviews, setSelectedReviews] = useState([]);
};

useEffect(() => {
  fetch("http://127.0.0.1:5000/review")
    .then((response) => response.json())
    .then((data) => setReviews(data.reviews))
    .catch((error) => console.error("Error fetching reviews:", error));
}, []);

const indexOfLastReview = currentPage * reviewsPerPage;
const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
const totalPages = Math.ceil(reviews.length / reviewsPerPage);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

const handleSelectReview = (reviewId) => {
  setSelectedReviews((prevSelectedReviews) =>
    prevSelectedReviews.includes(reviewId)
      ? prevSelectedReviews.filter((id) => id !== reviewId)
      : [...prevSelectedReviews, reviewId]
  );
};

const handleDeleteSelected = () => {
  fetch("http://127.0.0.1:5000/delete_reviews", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review_ids: selectedReviews }),
  })
    .then((response) => response.json())
    .then((data) => {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => !selectedReviews.includes(review.id))
      );
      setSelectedReviews([]);
    })
    .catch((error) => console.error("Error deleting reviews:", error));
};

return (
  <div className="flex flex-col items-center px-4 sm:px-6 lg:px-4 -mt-20">
    <div className="self-start -mt-4 ml-20 text-2xl font-bold tracking-tight leading-loose text-gray-800 max-md:mt-10 max-md:ml-2.5">
      Reviews
    </div>
    <div className="-mt-12 w-full max-w-[1239px] max-md:max-w-full">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDeleteSelected}
          disabled={selectedReviews.length === 0}
        >
          Delete Selected
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-md:flex-col">
        {currentReviews.map((review) => (
          <div
            className={`flex flex-col p-6 bg-white rounded shadow-[0px_10px_60px_rgba(226,236,249,0.5)] ${
              selectedReviews.includes(review.id)
                ? "border-2 border-blue-500"
                : ""
            }`}
            key={review.id}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedReviews.includes(review.id)}
                onChange={() => handleSelectReview(review.id)}
              />
              <img
                src={profile}
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
      <div className="flex justify-between items-center p-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstReview + 1} to {indexOfLastReview} of{" "}
          {reviews.length} entries
        </span>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"
            }`}
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              className={`px-3 py-1 rounded ${
                currentPage === number + 1
                  ? "text-white bg-indigo-600"
                  : "bg-neutral-100"
              }`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
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
        </div>
      </div>
    </div>
  </div>
);
