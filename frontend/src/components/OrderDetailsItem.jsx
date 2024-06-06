import React from 'react'
import image from '../img/Hot-Chocolate.jpg'
import { Button } from "flowbite-react";
import { useState } from 'react';
import Review from './Customer/Review';


const OrderDetailsItem = ({cartItem, orderStatus, orderId, reviewedProducts}) => {

  const [openReviewPopup,setOpenReviewPopup] = useState(false);

  const closeShowOrderDetailsPopup = () => {
    setOpenReviewPopup(false);
};

  alreadyCommented = reviewedProducts.includes(cartItem.product.name);

  return (
    <div className = "flex justify-center items-center flex-row w-9/12 mb-3 border-2 rounded-lg">
        <div className = "flex flex-col w-2/6 mt-2 ml-4 items-start">
          <img className='rounded-lg mb-2' src={cartItem.product.imagePath} width={80} height={80}></img>
        </div>

        <div className = "flex flex-col w-full items-start">
          <span>Product Name: {cartItem.product.name}</span>
          <span>Amount: {cartItem.amount}</span>
          <span>Size: {cartItem.size}</span>
        </div>

        {alreadyCommented && 
        <Button disabled className='bg-red-500 mb-2 mr-10 w-56 h-16 ' >You already rated this product</Button>}

        {orderStatus === "SERVED" 
        && !alreadyCommented
        && <Button className='bg-gray-700 mb-2 mr-10 w-56 h-16 ' onClick={() => setOpenReviewPopup(true)}>Rate the Product</Button>}


        {openReviewPopup && 
            
            <Review
            productId={cartItem.product.id}
            title={cartItem.product.name}
            close= {closeShowOrderDetailsPopup}
            orderId={orderId}
            />}

        </div>
  )
}

export default OrderDetailsItem
