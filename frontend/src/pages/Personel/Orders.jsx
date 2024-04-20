import React, { useState } from 'react';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { SearchBar } from '../../components/personel/SearchBar';
import faker from 'faker';
import { OrderDetailsPopup } from '../../components/OrderDetailsPopup';
import { OrderEditPopup } from '../../components/personel/OrderEditPopup';
import styled from 'styled-components';


const StyledSelect = styled.select`
  appearance: none; 
  background: none;
  borders: none;
`;

const OrderStatus = {
    FULFILLED: 'Fulfilled',
    PREPARING: 'Preparing',
    READY: 'Ready',
    CANCELED: 'Canceled',
    TAKEN: 'Taken',
};

const Category = {
    HOT_BEVERAGE: 'Hot Beverage',
    COLD_BEVERAGE: 'Cold Beverage',
    DESSERT: 'Dessert',
    _PASTRY: 'Pastry',
    SANDWICH: 'Sandwich',
    PASTRY: 'Pastry',
    SMOOTIE: 'Smoothie',
    OTHER: 'Other'
};

const PaymentType = {
    CASH: 'Cash',
    CREDIT_CARD: 'Credit Card',
    COFFE_CARD: 'Coffee Card',
}

class Order {

    constructor(id, customer, payment_type, status, date, total_price, orderItems) {
        this.id = Math.random().toString(36).substring(7);
        this.customer = customer;
        this.payment_type = payment_type;
        this.status = status;
        this.date = date;
        this.orderItems = orderItems;
        this.total_price = total_price;
    }

    static generateRandomOrderItems(numOrders) {
        const orderItems = [];

        for (let i = 1; i <= numOrders; i++) {
            const numItems = faker.random.number({ min: 1, max: 5 });
    
            for (let j = 1; j <= numItems; j++) {
                const foodId = faker.random.number({ min: 1, max: 6 });
                const foodName = faker.commerce.productName();
                const amount = faker.random.number({ min: 1, max: 5 });
                const unitPrice = parseFloat(faker.commerce.price());
    
                orderItems.push(
                    {
                    id: j,
                    food: {
                        id: foodId,
                        name: foodName,
                    },
                    amount: amount
                }
            );}
        }
        return orderItems;
    }

    static generateRandomOrder() {
        const id = Math.random().toString(36).substring(7);
        const customers = ['Kemal Yıldırım', 'Doğukan Yılmaz', 'Masis Aramyan', 'Güney Kırcı', 'Ahmet Demir', 'John Doe', 'Jane Smith', 'Doe Johnson', 'Smith Brown', 'Alice Williams', 'Bob Johnson', 'Charlie Davis', 'David Wilson', 'Eve Taylor', 'Frank Anderson', 'Grace Thomas', 'Heidi Jackson'];
        const statuses = [OrderStatus.READY, OrderStatus.PREPARING, OrderStatus.FULFILLED, OrderStatus.CANCELED, OrderStatus.TAKEN];
        const payment_types = [PaymentType.CASH, PaymentType.CREDIT_CARD, PaymentType.COFFE_CARD];
        const randomPaymentType = payment_types[Math.floor(Math.random() * payment_types.length)];
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomstatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomDate = Date.now();
        const randomtotal_price = Math.floor(Math.random() * 100.0) + 1.0;
        const randomOrderItems = this.generateRandomOrderItems(2);

        return new Order(id, randomCustomer, randomPaymentType, randomstatus, randomDate, randomtotal_price, randomOrderItems);
    }
}

export const Orders = () => {

    const [orders,setOrders] = useState([]);

    for (let i = 0; i < 100; i++) {
        orders.push(Order.generateRandomOrder());
    }

    const [ordersArray, setOrdersArray] = useState(orders);

    // For Search functionality
    const [ordersShow, setOrdersShow] = useState(ordersArray);

    // For order edit popup
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

    const [selectedOrderItems, setSelectedOrderItems] = useState([]);

    const [selectedOrderStatus, setSelectedOrderStatus] = useState("")

    const [selectedOrderTotalPrice, setSelectedOrderTotalPrice] = useState(0)

    const addOrderItem = (orderItem) => {
        setSelectedOrderItems((prevSelectedOrderItems) => [
            ...prevSelectedOrderItems,
            orderItem
        ]);
    };

    const openShowOrderDetailsPopup = (orderItems, orderStatus, orderTotalPrice) => {
        orderItems.forEach( orderItem => addOrderItem(orderItem))
        setSelectedOrderStatus(orderStatus)
        setSelectedOrderTotalPrice(orderTotalPrice)
        setIsEditPopupOpen(true)
    }
    
    const closeShowOrderDetailsPopup = () => {
        setSelectedOrderItems([])
        setSelectedOrderStatus("")
        setSelectedOrderTotalPrice(0)
        setIsEditPopupOpen(false)
    }

    
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(null);
    

    const searchButtonSubmit = (keyword) => {
        if(keyword == ''){
            if(ordersShow.length != ordersArray.length)
                setOrdersShow(ordersArray);
            return;
        }

        let newArr = ordersArray.filter( order =>
            order.customer.toLowerCase().includes(keyword.toLowerCase())
        );   
        setOrdersShow(newArr);
    }


    if (isEditPopupOpen) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }

    const handleStatusChange = (event, index) => {
        const newStatus = event.target.value;
        console.log(newStatus);
        console.log(index);
        const updatedOrders = [...orders];
        updatedOrders[index].status = newStatus;
        //api put call
        setOrders(updatedOrders);
    };

    return (
        <>
            <Siderbar_1 />
            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div class='flex flex-row w-6/6 mb-3'>
                        <SearchBar searchButtonSubmit = {searchButtonSubmit} class='mr-auto'></SearchBar>
                    </div>
                    <div className="flex h-screen overflow-hidden">

                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                            <main>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Customer Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Payment Type
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
                                    <tbody>

                                        {
                                            isEditPopupOpen &&
                                            <OrderEditPopup orderItems = {selectedOrderItems} orderStatus = {selectedOrderStatus} orderTotalPrice = {selectedOrderTotalPrice} closePopup = {() => closeShowOrderDetailsPopup()} />
                                        }
                                        {ordersShow.map((orderA, index) => (
                                            <tr
                                                key={index}
                                                class={`
                                        ${orderA.status === OrderStatus.READY ? 'bg-green-300' :
                                                        orderA.status === OrderStatus.PREPARING ? 'bg-yellow-100' :
                                                            orderA.status === OrderStatus.FULFILLED ? 'bg-purple-200' :
                                                                orderA.status === OrderStatus.CANCELED ? 'bg-red-200' :
                                                                    orderA.status === OrderStatus.TAKEN ? 'bg-violet-300' :
                                                                        'bg-gray-200'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {orderA.customer}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {orderA.payment_type.toString()}
                                                </td>
                                                <td class="px-6 py-4">

                                                <div>
                                                    <StyledSelect value={orderA.status} onChange={(event) => handleStatusChange(event, index)}>
                                                        <option value="Taken">Taken</option>
                                                        <option value="Preparing">Preparing</option>
                                                        <option value="Ready">Ready</option>
                                                        <option value="Fulfilled">Fulfilled</option>
                                                        <option value="Canceled">Canceled</option>
                                                    </StyledSelect>
                                                </div>
                                                    
                                                </td>
                                                <td class="px-6 py-4">
                                                    {new Date(orderA.date).toString().substring(0, 24)}
                                                </td>
                                                <td class="px-6 py-4">
                                                    ${orderA.total_price.toFixed(2)}
                                                </td>
                                                <td class="px-6 py-4"
                                                onClick={() => {
                                                    openShowOrderDetailsPopup(orderA.orderItems, orderA.status, orderA.total_price)
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
