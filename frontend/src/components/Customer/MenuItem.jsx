import React, { useState } from 'react';


const MenuItem = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick function passed from the parent component
    }
  };
  


  return (
    <div className="menu-item bg-white border border-gray-300 rounded-md overflow-hidden " >
      <img src={props.imagePath} alt="Item Image" className="mt-5 ml-5 mb-5 w-36 h-36 object-cover float-left mr-8" />
      <div className="menu-item-info py-5">
        <h2 className="text-xl font-semibold">{props.itemName}</h2>
        <p className="text-gray-600 mb-2">{props.itemDescription}</p>
        <p className="text-custom-light-orange font-bold mb-2">{props.itemPrice} ₺</p>
        <button className="mb-5 mr-5 bg-custom-light-brown text-white py-2 px-4 rounded-md cursor-pointer float-right mt-2 hover:bg-custom-light-orange"  onClick={handleClick} >+</button>
      </div>
      
    </div>
  );
}

export default MenuItem;
