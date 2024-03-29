import React, { useState } from 'react';
import Sidebar from '../../imported-assets/partials/Sidebar';
import Header from '../../imported-assets/partials/Header';


const OrderStatus = {
    READY: 'Ready',
    PREPARING: 'Preparing',
    SERVED: 'Served',
    CANCELED: 'Canceled',
    ORDER_TAKEN: 'Order Taken',
    // Add more statuses as needed
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


class OrderItem {
    constructor(customer, product, size, category, progress, date, price) {
        this.customer = customer;
        this.product = product;
        this.size = size;
        this.category = category;
        this.progress = progress;
        this.date = date;
        this.price = price;
    }
    
    static generateRandomOrderItem(){
        const customers = ['Kemal', 'Doğukan', 'Masis', 'Güney', 'Ahmet', 'John', 'Jane', 'Doe', 'Smith', 'Brown', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
        const products = ['Cappuccino', 'Latte', 'Espresso', 'Mocha', 'Americano', 'Macchiato', 'Flat White', 'Iced Coffee', 'Green Tea', 'Chai Latte', 'Hot Chocolate', 'Iced Tea', 'Black Tea', 'Fruit Smoothie', 'Lemonade', 'Milkshake', 'Matcha Latte', 'Bubble Tea', 'Iced Latte', 'Frappuccino'];
        const sizes = ['Small', 'Medium', 'Large'];
        const categories = [Category.HOT_BEVERAGE, Category.COLD_BEVERAGE, Category.DESSERT, Category._PASTRY, Category.SANDWICH, Category.PASTRY, Category.SMOOTIE, Category.OTHER];
        const progresses = [OrderStatus.READY, OrderStatus.PREPARING, OrderStatus.SERVED, OrderStatus.CANCELED, OrderStatus.ORDER_TAKEN];
        const prices = ['$1.50', '$2.00', '$2.50', '$3.00', '$3.50', '$4.00', '$4.50', '$5.00', '$5.50', '$6.00', '$6.50', '$7.00', '$7.50', '$8.00', '$8.50', '$9.00', '$9.50', '$10.00'];
        
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomProgress = progresses[Math.floor(Math.random() * progresses.length)];
        const randomDate = Date.now();
        const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    
        return new OrderItem(randomCustomer, randomProduct, randomSize, randomCategory, randomProgress, randomDate, randomPrice);
    }
}



export const Orders = () => {


    // put all orders in an array
    const orders = [];

    for(let i = 0; i < 100; i++){
        orders.push(OrderItem.generateRandomOrderItem());
    }

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
                                <h2 className="text-base dark:text-white shadow-lg mb-4 text-center leading-none tracking-tight text-black md:text-5xl lg:text-4xl decoration-8 decoration-custom-green dark:decoration-blue-600" > Customer: {orders[0].customer} </h2>
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
                                            Product
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Size
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
                                        <tr key={index} class={`${order.progress == OrderStatus.READY ? 'bg-green-200' : 'bg-white'} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${order.progress === OrderStatus.READY ? 'bg-green-200' : ''}`}>                                            
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
