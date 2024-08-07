import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-gray-400" />
      ))}
    </div>
  );
};

export default StarRating;
