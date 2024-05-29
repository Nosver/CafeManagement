import React, { useState } from 'react';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { SearchBar } from '../../components/personel/SearchBar';
import faker from 'faker';
import { OrderEditPopup } from '../../components/personel/OrderEditPopup';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const StyledSelect = styled.select`
  appearance: none; 
  borders: none;
`;


export const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [ordersArray, setOrdersArray] = useState(orders);

    // For Search functionality
    const [ordersShow, setOrdersShow] = useState(ordersArray);

    // For order edit popup
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState();

    const fetchOrders = async () => {
        const token = Cookies.get('token')
        try {
            const response = await fetch('http://localhost:8080/employee_and_admin/getOrdersForErp', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
             
            });
      
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
          const data= await response.json();

          setOrdersArray(data)
          setOrdersShow(data)
      
          } catch (error) {
            console.log(error.message);
          }
    }

    const getOrderStatusSelections = async() =>{
        
        try {
            const response = await fetch('http://localhost:8080/public/getOrderStatus', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
             
            });
      
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
          const data = await response.json();

          setStatusOptions(data);
      
          } catch (error) {
            console.log(error.message);
          }
    }

    const handleStatusChange = (event, index) => {
        const newStatus = event.target.value;
        console.log(newStatus);
        console.log(index);
        const updatedOrders = [...ordersShow];
        updatedOrders[index].status = newStatus;
        //api put call
        setOrders(updatedOrders);
    };

    useEffect(() => {
      
        fetchOrders()
        getOrderStatusSelections()
      
    }, [])
    

    const handleShowOrderDetailsPopup = (selectedOrder) => {
        setSelectedOrder(selectedOrder);
        setIsEditPopupOpen(true)
    }

    const closeShowOrderDetailsPopup = () => {
        
        setIsEditPopupOpen(false)
    }


    const [statusOptions, setStatusOptions]= useState([]);

    const searchButtonSubmit = (keyword) => {
        if (keyword == '') {
            if (ordersShow.length != ordersArray.length)
                setOrdersShow(ordersArray);
            return;
        }

        let newArr = ordersArray.filter(order =>
            order.customer.toLowerCase().includes(keyword.toLowerCase())
        );
        setOrdersShow(newArr);
    }


    if (isEditPopupOpen) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }

    return (
        <>
            <Siderbar_1 />
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div class='flex flex-row w-6/6 mb-3'>
                        <SearchBar searchButtonSubmit={searchButtonSubmit} class='mr-auto'></SearchBar>
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
                                            <th scope="col" class="px-6 py-3">
                                            </th>
                                        </tr>
                                    </thead>
                                    <div>
                                    {
                                        isEditPopupOpen &&
                                        <OrderEditPopup selectedOrder={selectedOrder} closePopup={() => closeShowOrderDetailsPopup()} />
                                    }
                                    </div>
                                    <tbody>


                                        {ordersShow.map((orderA, index) => (
                                            <tr
                                                key={index}
                                                class={`border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`
                                                }>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {orderA.id}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {orderA.userName}
                                                </th>
                                                
                                                <td class="px-6 py-4">

                                                    <div>
                                                        <StyledSelect className={`
                                                    ${orderA.status == "READY" ? 'bg-green-300' :
                                                                orderA.status == "TAKEN" ? 'bg-blue-300' :
                                                                    orderA.status == "PREPARING" ? 'bg-yellow-300' :
                                                                        orderA.status == "FULFILLED" ? 'bg-purple-300' :
                                                                            orderA.status == "CANCELLED" ? 'bg-red-300' :
                                                                                'bg-yellow-300'
                                                            }`}
                                                            value={orderA.status} onChange={(event) => handleStatusChange(event, index)}>
                                                            {statusOptions.map((option) => (
                                                                <option value={option}>{option}</option>
                                                            )
                                                        )}
                                                                
                                                        </StyledSelect>
                                                    </div>

                                                </td>
                                                <td class="px-6 py-4">
                                                    {new Date(orderA.createdAt).toString().substring(0, 24)}
                                                </td>
                                                <td class="px-6 py-4">
                                                    ${orderA.totalPrice.toFixed(2)}
                                                </td>
                                                <td class="px-6 py-4"
                                                    onClick={() => {
                                                        handleShowOrderDetailsPopup(orderA);
                                                    }}>
                                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
