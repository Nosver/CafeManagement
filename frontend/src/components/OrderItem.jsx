import React from 'react'

import image from '../img/Hot-Chocolate.jpg'; 
import { DateTime } from './DateTime';
import { Price } from './Price';
import { Link } from 'react-router-dom';

const OrderItem = ({order, openPopup}) => {


  return (
    <div className = "flex justify-center items-center flex-col w-4/6 my-3 border-2 rounded-lg">

      <div className = "flex justify-between flex-row w-5/6 mt-2">
        <span>{order.id}</span>
        <span><DateTime date={order.createdAt}/></span>
        <span>{order.status}</span>
      </div>

      <div className = "flex justify-start flex-row w-5/6 mt-3">
        {
          order.cartItems.map( cartItem =>
            <img className='rounded-lg mb-4 mx-2' src={cartItem.product.imagePath} width={55}></img>
          )
        }
      </div>

      <div className = "flex justify-between flex-row w-5/6 mb-2">
        <button className="text-grey-500 focus:outline-none" onClick={ () => openPopup(order)}>
          See Details
        </button>
          <span className='text-green-500'>  
            {order.totalPrice && order.totalPrice.toFixed(2)}₺
          </span>
      </div>

    </div>
  )
}

export default OrderItem
