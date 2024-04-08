import React, { useEffect, useRef, useState } from 'react'
import OrderItem from '../../components/OrderItem';
import OrderCategorySelector from '../../components/OrderStatusSelector';
import { OrderDetailsPopup } from '../../components/OrderDetailsPopup';


const OrdersPage = () => {


  const [selectedOrderItems, setSelectedOrderItems] = useState([
    { id: 1, food: { id: 1, name: 'Coffee', imageUrl: 'coffee.jpg' }, amount: 2 },
  ]);

  const addOrderItem = (orderItem) => {
    setSelectedOrderItems([
        ...selectedOrderItems,
        {id: orderItem.id, food: {id: orderItem.food.id, name: orderItem.food.name, imageUrl: orderItem.food.imageUrl}}
      ])
  };

  const [showOrderDetailsPopup, setShowOrderDetailsPopup] = useState(false)

  const openShowOrderDetailsPopup = (orderItems) => {
    orderItems.forEach( orderItem => addOrderItem(orderItem))
    setShowOrderDetailsPopup(true)
  }

  const closeShowOrderDetailsPopup = () => {
    setSelectedOrderItems([])
    setShowOrderDetailsPopup(false)
  }
  


  const orders = [
    {
      id: 1,
      createdAt: new Date(),
      status: 'Taken',
      orderItems: [
        { id: 1, food: { id: 1, name: 'Coffee', imageUrl: 'coffee.jpg' }, amount: 2 },
        { id: 2, food: { id: 2, name: 'Croissant', imageUrl: 'croissant.jpg' }, amount: 1 },
      ],
      totalPrice: 15.99,
    },
    {
      id: 2,
      createdAt: new Date(),
      status: 'Preparing',
      orderItems: [
        { id: 1, food: { id: 3, name: 'Tea', imageUrl: 'tea.jpg' }, amount: 1 },
        { id: 2, food: { id: 4, name: 'Bagel', imageUrl: 'bagel.jpg' }, amount: 3 },
      ],
      totalPrice: 12.5,
    },
    {
      id: 3,
      createdAt: new Date(),
      status: 'Taken',
      orderItems: [
        { id: 1, food: { id: 5, name: 'Americano', imageUrl: 'americano.jpg' }, amount: 2 },
        { id: 2, food: { id: 6, name: 'Sandwich', imageUrl: 'sandwich.jpg' }, amount: 1 },
      ],
      totalPrice: 35,
    },
    {
      id: 4,
      createdAt: new Date(),
      status: 'Canceled',
      orderItems: [
        { id: 1, food: { id: 5, name: 'Americano', imageUrl: 'americano.jpg' }, amount: 2 },
        { id: 2, food: { id: 6, name: 'Sandwich', imageUrl: 'sandwich.jpg' }, amount: 1 },
      ],
      totalPrice: 35,
    },
    {
      id: 5,
      createdAt: new Date(),
      status: 'Taken',
      orderItems: [
        { id: 1, food: { id: 1, name: 'Coffee', imageUrl: 'coffee.jpg' }, amount: 2 },
        { id: 2, food: { id: 2, name: 'Croissant', imageUrl: 'croissant.jpg' }, amount: 1 },
      ],
      totalPrice: 15.99,
    },
    {
      id: 6,
      createdAt: new Date(),
      status: 'Preparing',
      orderItems: [
        { id: 1, food: { id: 3, name: 'Tea', imageUrl: 'tea.jpg' }, amount: 1 },
        { id: 2, food: { id: 4, name: 'Bagel', imageUrl: 'bagel.jpg' }, amount: 3 },
      ],
      totalPrice: 12.5,
    },
    {
      id: 7,
      createdAt: new Date(),
      status: 'Taken',
      orderItems: [
        { id: 1, food: { id: 5, name: 'Americano', imageUrl: 'americano.jpg' }, amount: 2 },
        { id: 2, food: { id: 6, name: 'Sandwich', imageUrl: 'sandwich.jpg' }, amount: 1 },
      ],
      totalPrice: 35,
    },
    {
      id: 8,
      createdAt: new Date(),
      status: 'Canceled',
      orderItems: [
        { id: 1, food: { id: 5, name: 'Americano', imageUrl: 'americano.jpg' }, amount: 2 },
        { id: 2, food: { id: 6, name: 'Sandwich', imageUrl: 'sandwich.jpg' }, amount: 1 },
      ],
      totalPrice: 35,
    }
];



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const [selectedStatus, setSelectedStatus] = useState('Taken');
  const orderStatusSelectorRef = useRef(null); 


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabSelect = (selectedTab) => {
    setSelectedStatus(selectedTab.id);
    setCurrentPage(1);
  };

  const handleRenderItems = () => {
    const filteredItems = orders.filter(order => order.status === selectedStatus);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex).map((order, index) => (
        <OrderItem
            order={order}
            openPopup={openShowOrderDetailsPopup}
        />
    ));
  };

  useEffect(() => {handleRenderItems();}, [selectedStatus, currentPage]);

  return (
    <div className = "flex justify-center items-center flex-col w-full">
      {
      showOrderDetailsPopup && 
      <OrderDetailsPopup order = {selectedOrderItems} closePopup = {() => closeShowOrderDetailsPopup()} />
      }
      <div className='my-4 flex justify-center '>
        <OrderCategorySelector ref={orderStatusSelectorRef} onTabSelect={handleTabSelect}></OrderCategorySelector>
      </div>

      <div className = "flex justify-center items-center flex-col w-full mb-4">
        {handleRenderItems()}
      </div>

      <nav  className="bg-center flex justify-center my-4" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          {Array.from({ length: Math.ceil(orders.filter(item => item.status === selectedStatus).length / itemsPerPage) }, (_, index) => (
          <li key={index}>
            <button onClick={() => handlePageChange(index + 1)} className={`flex items-center justify-center px-4 h-10 leading-tight ${index + 1 === currentPage ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100  hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              {index + 1}
            </button>
          </li>
          ))}
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(orders.filter(item => item.status === selectedStatus).length / itemsPerPage)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
          </li>
        </ul>
      </nav>

    </div>
  );

}
export default OrdersPage
