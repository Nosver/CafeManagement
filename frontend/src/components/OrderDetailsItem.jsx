import React from 'react'

const OrderDetailsItem = ({orderItem}) => {
  return (
    <div className = "flex justify-center items-center flex-row w-4/6 my-3 border-2 rounded-lg">
        <div className = "flex justify-between flex-col w-5/6 mt-2">
            <span>orderItem.food.name</span>
        </div>

        <div className = "flex justify-start flex-col w-5/6 mt-3">
        {
            <span>orderItem.amount</span>
        }
        </div>


        </div>
  )
}

export default OrderDetailsItem
