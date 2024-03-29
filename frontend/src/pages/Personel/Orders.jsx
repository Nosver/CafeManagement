import React, { useState } from 'react';
import Sidebar from '../../imported-assets/partials/Sidebar';
import Header from '../../imported-assets/partials/Header';


const OrderStatus = {
    READY: 'Ready',
    PREPARING: 'Preparing',
    DELIVERED: 'Delivered',
    // Add more statuses as needed
};

class Order {
    constructor(customer, product, size, category, progress, date, price) {
        this.customer = customer;
        this.product = product;
        this.size = size;
        this.category = category;
        this.progress = progress;
        this.date = date;
        this.price = price;
    }

    // You can add methods here
}


export const Orders = () => {

    const order1 = new Order('Kemal', 'Cappuccino', 'Medium', 'Hot Beverage', OrderStatus.READY, Date.now(), '$3.50');
    const order2 = new Order('Doğukan', 'Latte', 'Large', 'Hot Beverage', OrderStatus.PREPARING, Date.now(), '$4.50');
    const order3 = new Order('Masis', 'Espresso', 'Small', 'Hot Beverage', OrderStatus.DELIVERED, Date.now(), '$2.50');
    const order4 = new Order('Güney', 'Mocha', 'Medium', 'Hot Beverage', OrderStatus.READY, Date.now(), '$4.00');
    const order5 = new Order('Ahmet', 'Americano', 'Large', 'Hot Beverage', OrderStatus.PREPARING, Date.now(), '$3.00');
    const order6 = new Order('Ahmet', 'Macchiato', 'Small', 'Hot Beverage', OrderStatus.DELIVERED, Date.now(), '$2.00');
    const order7 = new Order('Ahmet', 'Flat White', 'Medium', 'Hot Beverage', OrderStatus.READY, Date.now(), '$3.50');
    const order8 = new Order('John', 'Iced Coffee', 'Large', 'Cold Beverage', OrderStatus.PREPARING, Date.now(), '$3.00');
    const order9 = new Order('Jane', 'Green Tea', 'Medium', 'Hot Beverage', OrderStatus.READY, Date.now(), '$2.50');
    const order10 = new Order('Doe', 'Chai Latte', 'Small', 'Hot Beverage', OrderStatus.DELIVERED, Date.now(), '$4.00');
    const order11 = new Order('Smith', 'Hot Chocolate', 'Large', 'Hot Beverage', OrderStatus.READY, Date.now(), '$3.50');
    const order12 = new Order('Brown', 'Iced Tea', 'Medium', 'Cold Beverage', OrderStatus.PREPARING, Date.now(), '$2.50');
    const order13 = new Order('Alice', 'Black Tea', 'Small', 'Hot Beverage', OrderStatus.DELIVERED, Date.now(), '$1.50');
    const order14 = new Order('Bob', 'Fruit Smoothie', 'Large', 'Cold Beverage', OrderStatus.READY, Date.now(), '$5.00');
    const order15 = new Order('Charlie', 'Lemonade', 'Medium', 'Cold Beverage', OrderStatus.PREPARING, Date.now(), '$2.75');
    const order16 = new Order('David', 'Milkshake', 'Large', 'Cold Beverage', OrderStatus.DELIVERED, Date.now(), '$4.50');
    const order17 = new Order('Eve', 'Matcha Latte', 'Medium', 'Hot Beverage', OrderStatus.READY, Date.now(), '$4.25');
    const order18 = new Order('Frank', 'Bubble Tea', 'Large', 'Cold Beverage', OrderStatus.PREPARING, Date.now(), '$4.75');
    const order19 = new Order('Grace', 'Iced Latte', 'Medium', 'Cold Beverage', OrderStatus.DELIVERED, Date.now(), '$3.75');
    const order20 = new Order('Heidi', 'Frappuccino', 'Large', 'Cold Beverage', OrderStatus.READY, Date.now(), '$5.50');

    // put all orders in an array
    const orders = [order1, order2, order3, order4, order5, order6, order7, order8, order9, order10, order11, order12, order13, order14, order15, order16, order17, order18, order19, order20];

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>




            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Content area */}
                    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                        <h1 className="text-base font-extrabold dark:text-white shadow-lg mb-4 text-center leading-none tracking-tight text-black md:text-5xl lg:text-4xl decoration-8 decoration-custom-green dark:decoration-blue-600">
                            Order Management
                        </h1>
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
                                            Customer
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Progress
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date of Creation
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index} class={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${order.progress === OrderStatus.READY ? 'bg-green-200' : ''}`}>
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                    <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order.product}
                                            </th>
                                            <td class="px-6 py-4">
                                                {order.size}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.category}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.progress}
                                            </td>
                                            <td class="px-6 py-4">
                                                {new Date(order.date).toString().substring(0, 24)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {order.price}
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
