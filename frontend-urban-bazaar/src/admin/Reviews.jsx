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
  </div>
);
