import React, { useEffect, useRef, useState } from "react";
import OrderItem from "../../components/OrderItem";
import OrderCategorySelector from "../../components/OrderStatusSelector";
import { OrderDetailsPopup } from "../../components/OrderDetailsPopup";
import Cookies from "js-cookie";
import UnauthorizedPage from "../UnauthorizedPage";

const OrdersPage = () => {
  const ROLE = Cookies.get("role");

  if (ROLE !== "CUSTOMER") {
    return (
      <div>
        <UnauthorizedPage />
      </div>
    );
  }

  const [ordersArray, setOrdersArray] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsPopup, setShowOrderDetailsPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedStatus, setSelectedStatus] = useState("ORDER_RECEIVED");
  const orderStatusSelectorRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    const token = Cookies.get("token");

    try {
      setIsLoading(true);
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
      setIsLoading(false);

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
  };

  const closeShowOrderDetailsPopup = () => {
    setSelectedOrder(null);
    setShowOrderDetailsPopup(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabSelect = (selectedTab) => {
    setSelectedStatus(selectedTab.id);
    setCurrentPage(1);
  };

  const handleRenderItems = () => {
    const filteredItems = ordersArray.filter(
      (order) => order.status === selectedStatus
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems
      .slice(startIndex, endIndex)
      .map((order, index) => (
        <OrderItem
          order={order}
          openPopup={openShowOrderDetailsPopup}
          key={index}
        />
      ));
  };

  useEffect(() => {
    handleRenderItems();
  }, [selectedStatus, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {showOrderDetailsPopup &&
        selectedOrder && ( // Check if selectedOrder is defined
          <OrderDetailsPopup
            order={selectedOrder}
            closePopup={closeShowOrderDetailsPopup}
          />
        )}
      <div className="my-4 flex justify-center ">
        <OrderCategorySelector
          ref={orderStatusSelectorRef}
          onTabSelect={handleTabSelect}
        ></OrderCategorySelector>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div className="flex justify-center items-center flex-col w-full mb-4">
        {handleRenderItems()}
      </div>

      <nav
        className="bg-center flex justify-center my-4"
        aria-label="Page navigation example"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {Array.from(
            {
              length: Math.ceil(
                ordersArray.filter((item) => item.status === selectedStatus)
                  .length / itemsPerPage
              ),
            },
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    index + 1 === currentPage
                      ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 border-gray-300 bg-white hover:bg-gray-100  hover:text-gray-700"
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(
                  ordersArray.filter((item) => item.status === selectedStatus)
                    .length / itemsPerPage
                )
              }
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default OrdersPage;
