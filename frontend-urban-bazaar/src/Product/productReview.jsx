import React from 'react';
import StarRating from './starRating';

const Review = ({ review }) => (
  <div className="border-t pt-4 mb-4">
    <p className="font-semibold">{review.author}</p>
    <StarRating rating={review.rating} />
    <p className="text-gray-600">{review.comment}</p>
  </div>
);

export default Review;
