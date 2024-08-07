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