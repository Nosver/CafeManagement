import React, { useEffect, useRef, useState } from 'react'
import OrderItem from '../../components/OrderItem';
import OrderCategorySelector from '../../components/OrderStatusSelector';
import { OrderDetailsPopup } from '../../components/OrderDetailsPopup';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../UnauthorizedPage';

const OrdersPage = () => {
  const ROLE = Cookies.get('role');

  if (ROLE !== "CUSTOMER") {
    return (
      <div>
        <UnauthorizedPage />
      </div>
    );
  }

  const [ordersArray, setOrdersArray] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Initialize with null
  const [showOrderDetailsPopup, setShowOrderDetailsPopup] = useState(false);

  const fetchOrders = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "http://localhost:8080/customer_only/getOrdersForCustomer",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrdersArray(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const openShowOrderDetailsPopup = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsPopup(true);
  }

  const closeShowOrderDetailsPopup = () => {
    setSelectedOrder(null);
    setShowOrderDetailsPopup(false);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedStatus, setSelectedStatus] = useState('ORDER_RECEIVED');
  const orderStatusSelectorRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabSelect = (selectedTab) => {
    setSelectedStatus(selectedTab.id);
    setCurrentPage(1);
  };

  const handleRenderItems = () => {
    const filteredItems = ordersArray.filter(order => order.status === selectedStatus);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex).map((order, index) => (
      <OrderItem
        order={order}
        openPopup={openShowOrderDetailsPopup}
        key={index}
      />
    ));
  };

  useEffect(() => { handleRenderItems(); }, [selectedStatus, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {
        showOrderDetailsPopup && selectedOrder && // Check if selectedOrder is defined
        <OrderDetailsPopup order={selectedOrder} closePopup={closeShowOrderDetailsPopup} />
      }
      <div className='my-4 flex justify-center '>
        <OrderCategorySelector ref={orderStatusSelectorRef} onTabSelect={handleTabSelect}></OrderCategorySelector>
      </div>

      <div className="flex justify-center items-center flex-col w-full mb-4">
        {handleRenderItems()}
      </div>

      <nav className="bg-center flex justify-center my-4" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          {Array.from({ length: Math.ceil(ordersArray.filter(item => item.status === selectedStatus).length / itemsPerPage) }, (_, index) => (
            <li key={index}>
              <button onClick={() => handlePageChange(index + 1)} className={`flex items-center justify-center px-4 h-10 leading-tight ${index + 1 === currentPage ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100  hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(ordersArray.filter(item => item.status === selectedStatus).length / itemsPerPage)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default OrdersPage;
