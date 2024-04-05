import React from 'react';

const TotalStars = ({ rating }) => {
    const stars = [];

    const Newrating=Math.floor(rating)
    // Generate full stars
    for (let i = 0; i < Math.floor(Newrating); i++) {
      stars.push(
        <svg key={i} className="w-7 h-7 text-yellow-300 mt-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  
   
    // Add empty stars to fill up to 5 stars
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <svg key={`empty${i}`} className="w-7 h-7 text-gray-300 dark:text-gray-500 mt-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  
    return (
      <div className="flex items-center">
        {stars}
        <p className="ms-2 mt-6 text-sm  font-medium text-gray-500 dark:text-gray-400">{rating} out of 5</p>
      </div>
    );  
  };
export default TotalStars;
