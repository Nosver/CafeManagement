import React from 'react';

const Popup = ({ onClose, itemName, itemDescription, itemPrice, imagePath }) => {
  
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">{itemName}</h2>
        <img src={imagePath} alt="Item Image" className="w-64 h-64 object-cover mb-4" />
        <p className="text-lg mb-4">{itemDescription}</p>
        <p className="text-xl font-bold">{itemPrice} ₺</p>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4" onClick={onClose}>close</button>
      </div>
    </div>
  );
};

export default Popup;
