import React, { useState } from 'react';
import Sidebar from '../../imported-assets/partials/Sidebar';
import Header from '../../imported-assets/partials/Header';
import Popup from '../../components/MenuPopup';


const OrderStatus = {
    READY: 'Ready',
    PREPARING: 'Preparing',
    SERVED: 'Served',
    CANCELED: 'Canceled',
    ORDER_TAKEN: 'Order Taken',
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

    constructor(id, customer, payment_type, status, date, total_price) {
        this.id = Math.random().toString(36).substring(7);
        this.customer = customer;
        this.payment_type = payment_type;
        this.status = status;
        this.date = date;
        this.total_price = total_price;
    }

    static generateRandomOrder() {
        const id = Math.random().toString(36).substring(7);
        const customers = ['Kemal Yıldırım', 'Doğukan Yılmaz', 'Masis Aramyan', 'Güney Kırcı', 'Ahmet Demir', 'John Doe', 'Jane Smith', 'Doe Johnson', 'Smith Brown', 'Alice Williams', 'Bob Johnson', 'Charlie Davis', 'David Wilson', 'Eve Taylor', 'Frank Anderson', 'Grace Thomas', 'Heidi Jackson'];
        const statuses = [OrderStatus.READY, OrderStatus.PREPARING, OrderStatus.SERVED, OrderStatus.CANCELED, OrderStatus.ORDER_TAKEN];
        const payment_types = [PaymentType.CASH, PaymentType.CREDIT_CARD, PaymentType.COFFE_CARD];
        const randomPaymentType = payment_types[Math.floor(Math.random() * payment_types.length)];
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomstatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomDate = Date.now();
        const randomtotal_price = Math.floor(Math.random() * 100.0) + 1.0;

        return new Order(id, randomCustomer, randomPaymentType, randomstatus, randomDate, randomtotal_price);
    }
}

const closePopup = () => {
    setIsPopupOpen(false);
};

export const Orders = () => {

    const orders = [];

    for (let i = 0; i < 100; i++) {
        orders.push(Order.generateRandomOrder());
    }

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // Add this line


    return (
        <>

            {/* FIX THIS POP UP !!! */}
            {selectedOrder && (
                <Popup isOpen={true} onClose={() => setSelectedOrder(null)}>
                    {/* Display selectedOrder details */}
                    <h2>Order Details</h2>
                    <p>Customer: {selectedOrder.customer}</p>
                    <p>Payment Type: {selectedOrder.payment_type}</p>
                    <p>Status: {selectedOrder.status}</p>
                    <p>Date: {new Date(selectedOrder.date).toString().substring(0, 24)}</p>
                    <p>Total Price: ${selectedOrder.total_price.toFixed(2)}</p>
                </Popup>
            )}


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Content area */}
                    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                        <main>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">
                                                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-all" class="sr-only">checkbox</label>
                                            </div>
                                        </th>
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
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => setSelectedOrder(order)}
                                            class={`
                                        ${order.status === OrderStatus.READY ? 'bg-green-300' :
                                                    order.status === OrderStatus.PREPARING ? 'bg-yellow-100' :
                                                        order.status === OrderStatus.DELIVERED ? 'bg-purple-200' :
                                                            order.status === OrderStatus.CANCELED ? 'bg-red-200' :
                                                                order.status === OrderStatus.SERVED ? 'bg-violet-200' :
                                                                    'bg-gray-200'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}>
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                    <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order.customer}
                                            </th>
                                            <td class="px-6 py-4">
                                                {order.payment_type.toString()}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.status.toString()}
                                            </td>
                                            <td class="px-6 py-4">
                                                {new Date(order.date).toString().substring(0, 24)}
                                            </td>
                                            <td class="px-6 py-4">
                                                ${order.total_price.toFixed(2)}
                                            </td>
                                            <td class="px-6 py-4">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </main>
                    </div>
                </div>

            </div>


        </>


    )
}