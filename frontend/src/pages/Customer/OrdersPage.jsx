import React from 'react'
import {DateTime} from '../../components/DateTime'
import {Title} from '../../components/Title'
import {Price} from '../../components/Price'

import image from '../../img/Hot-Chocolate.jpg'; 
import { Link } from 'react-router-dom';


const OrdersPage = () => {

  const orders = [
    {
      id: 1,
      createdAt: new Date(),
      status: 'Taken',
      items: [
        { food: { id: 1, name: 'Coffee', imageUrl: 'coffee.jpg' } },
        { food: { id: 2, name: 'Croissant', imageUrl: 'croissant.jpg' } },
      ],
      totalPrice: 15.99,
    },

    {
      id: 2,
      createdAt: new Date(),
      status: 'Pending',
      items: [
        { food: { id: 3, name: 'Tea', imageUrl: 'tea.jpg' } },
        { food: { id: 4, name: 'Bagel', imageUrl: 'bagel.jpg' } },
      ],
      totalPrice: 12.5,
    },

    {
      id: 3,
      createdAt: new Date(),
      status: 'Taken',
      items: [
        { food: { id: 5, name: 'Americano', imageUrl: 'americano.jpg' } },
        { food: { id: 6, name: 'Sandwich', imageUrl: 'sandwich.jpg' } },
      ],
      totalPrice: 35,
    },

  ];


  return (
    <div className = "flex justify-center items-center flex-col w-full">
      
      <Title title = "Orders" margin= "1.5rem 0 0 .2rem" fontSize= "1.9rem" />
      
      <div className = "flex justify-center items-center flex-col w-full mb-4">
        {/* Order Item */ }

        {orders.map( order =>
          (
            <div className = "flex justify-center items-center flex-col w-4/6 my-3 border-2 rounded-lg">

              <div className = "flex justify-between flex-row w-5/6 mt-2">
                <span>{order.id}</span>
                <span><DateTime date={order.createdAt}/></span>
                <span>{order.status}</span>
              </div>
.
              <div className = "flex justify-start flex-row w-5/6">
                {order.items.map( item =>
                  <img className='rounded-lg mb-4 mx-2' src={image} width={55}></img>
                )}
              </div>

              <div className = "flex justify-between flex-row w-5/6 mb-2">
                <Link className= 'text-gray-500' >Show Order</Link>
                <span>
                  <Price price={order.totalPrice}/>
                </span>
              </div>

            </div>
          )
        )}

        

        {/* Order Item */ }

      </div>

    </div>
  );

}
export default OrdersPage
