import React, { useState } from "react";
import { Siderbar_1 } from "../../components/personel/Siderbar_1";
import { SearchBar } from "../../components/personel/SearchBar";
import faker from "faker";
import { OrderEditPopup } from "../../components/personel/OrderEditPopup";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useEffect } from "react";

const StyledSelect = styled.select`
  appearance: none;
  borders: none;
`;

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [ordersArray, setOrdersArray] = useState(orders);

  // For Search functionality
  const [ordersShow, setOrdersShow] = useState(ordersArray);

  // For order edit popup
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState();

  const fetchOrders = async () => {
    const token = Cookies.get("token");
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/employee_and_admin/getOrdersForErp",
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
      setIsLoading(false);
      setOrdersArray(data);
      setOrdersShow(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrderStatusSelections = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/public/getOrderStatus",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setStatusOptions(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusChange = async (event, index) => {
    event.preventDefault();

    const newStatus = event.target.value;
    const updatedOrders = [...ordersShow];
    updatedOrders[index].status = newStatus;

    //API put call
    const token = Cookies.get("token");

    if (!token) {
      setMessage("No token found. Please login.");
      return;
    }

    const orderData = {
      id: updatedOrders[index].id,
      status: newStatus,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/employee_and_admin/updateOrderStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    /////

    setOrders(updatedOrders);
    window.location.reload();
  };

  useEffect(() => {
    fetchOrders();
    getOrderStatusSelections();
  }, []);

  const handleShowOrderDetailsPopup = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    setIsEditPopupOpen(true);
  };

  const closeShowOrderDetailsPopup = () => {
    setIsEditPopupOpen(false);
  };

  const [statusOptions, setStatusOptions] = useState([]);

  const searchButtonSubmit = (keyword) => {
    if (keyword == "") {
      if (ordersShow.length != ordersArray.length) setOrdersShow(ordersArray);
      return;
    }

    let newArr = ordersArray.filter((order) =>
      order.customer.toLowerCase().includes(keyword.toLowerCase())
    );
    setOrdersShow(newArr);
  };

  if (isEditPopupOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <Siderbar_1 />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="flex flex-row w-6/6 mb-3">
            <SearchBar
              searchButtonSubmit={searchButtonSubmit}
              class="mr-auto"
            ></SearchBar>
          </div>
          <div className="flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <main>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Customer Name
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Date of Creation
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Total Price
                      </th>
                      <th scope="col" class="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <div>
                    {isEditPopupOpen && (
                      <OrderEditPopup
                        selectedOrder={selectedOrder}
                        closePopup={() => closeShowOrderDetailsPopup()}
                      />
                    )}
                  </div>
                  <tbody>
                    {ordersShow.map((orderA, index) => (
                      <tr
                        key={index}
                        class={`border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {orderA.id}
                        </th>
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {orderA.userName}
                        </th>

                        <td class="px-6 py-4">
                          <div>
                            <StyledSelect
                              className={`
                                                    ${
                                                      orderA.status == "ORDER_RECEIVED"
                                                        ? "bg-green-300"
                                                        : orderA.status ==
                                                          "PREPARING"
                                                        ? "bg-blue-300"
                                                        : orderA.status ==
                                                          "READY"
                                                        ? "bg-yellow-300"
                                                        : orderA.status ==
                                                          "SERVED"
                                                        ? "bg-purple-300"
                                                        : orderA.status ==
                                                          "CANCELLED"
                                                        ? "bg-red-300"
                                                        : "bg-yellow-300"
                                                    }`}
                              value={orderA.status}
                              onChange={(event) =>
                                handleStatusChange(event, index)
                              }
                              disabled={orderA.status === "CANCELLED"}

                            >
                              {statusOptions.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </StyledSelect>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          {new Date(orderA.createdAt)
                            .toString()
                            .substring(0, 24)}
                        </td>
                        <td class="px-6 py-4">
                          {orderA.totalPrice.toFixed(2)}₺
                        </td>
                        <td
                          class="px-6 py-4"
                          onClick={() => {
                            handleShowOrderDetailsPopup(orderA);
                          }}
                        >
                          <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Details
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isLoading && (
                  <div className="flex items-center justify-center ">
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
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
