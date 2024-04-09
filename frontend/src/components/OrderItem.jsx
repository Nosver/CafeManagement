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
          order.orderItems.map( orderItem =>
            <img className='rounded-lg mb-4 mx-2' src={image} width={55}></img>
          )
        }
      </div>

      <div className = "flex justify-between flex-row w-5/6 mb-2">
        <button className="text-grey-500 focus:outline-none" onClick={ () => openPopup(order.orderItems, order.status, order.totalPrice)}>
          See Details
        </button>
          <span>
            <Price price={order.totalPrice}/>
          </span>
      </div>

    </div>
  )
}

export default OrderItem
