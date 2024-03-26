import React from 'react'

function MenuItem(props) {


  return (
    
      <div class="menu-item bg-white border border-gray-300 rounded-md overflow-hidden">
        <img src={props.imagePath} alt="Item Image" class="mt-5 ml-5 mb-5 w-36 h-auto float-left mr-8" />
        <div class="menu-item-info py-5">
          <h2 class="text-xl font-semibold">{props.itemName}</h2>
          <p class="text-gray-600 mb-2">{props.itemDescription}</p>
          <p class="text-CustomLightOrange font-bold mb-2">{props.itemPrice} ₺</p>
          <button class="mb-5 mr-5 bg-custom-light-brown text-white py-2 px-4 rounded-md cursor-pointer float-right mt-2 hover:bg-custom-light-orange">Add to Cart</button>
        </div>
      </div>
    
  );
}

export default MenuItem