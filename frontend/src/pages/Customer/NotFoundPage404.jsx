import React from 'react';
import gif from '../../img/CoffeeSpill.gif'

export const NotFoundPage404 = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-white w-full h-full">
      <div className="text-center">
        
        <p className="font-semibold text-4xl text-black">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <img src={gif} alt="404 GIF" className="mx-auto mb-6 w-80 h-80 mt-5" />
      </div>
    </div>
  );
};
