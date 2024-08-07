import React, { useState, useEffect } from "react";
import profile from "../assets/profile.svg";
import Rating from "react-rating-stars-component";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);
  const [selectedReviews, setSelectedReviews] = useState([]);
};
