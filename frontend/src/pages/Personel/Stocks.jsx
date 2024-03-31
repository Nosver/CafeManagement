import React from 'react'
import Sidebar from '../../imported-assets/partials/Sidebar';
import Header from '../../imported-assets/partials/Header';
import { useState } from 'react';
import { CButton } from '../../components/CButton';

class stock {


    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.ongoing_stock = 0;
        this.total_price = price * quantity;
    }

    static getRandomStock() {
        const id = Math.floor(Math.random() * 1000);
        const names = ['Arabic Bean', 'Milk', 'Water', 'Syrup', 'Sugar', 'Espresso', 'Latte', 'Cappuccino', 'Mocha', 'Filter Coffee', 'Iced Coffee', 'Turkish Coffee', 'Tea', 'Hot Chocolate', 'Milkshake', 'Smoothie', 'Cake'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPrice = Math.floor(Math.random() * 10.0) + 1.0;
        const randomQuantity = Math.floor(Math.random() * 100) + 1;

        return new stock(id, randomName, randomPrice, randomQuantity);
    }


}

export const Stocks = () => {

    // Create random stocks for cafe
    const stocks = [];

    for (let i = 0; i < 50; i++) {
        stocks.push(stock.getRandomStock());
    }

    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [quantity, setQuantity] = useState(stock.quantity);


    return (
        <div>
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
                                            Stock ID
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Ongoing Order
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
                                    {stocks.map((stock, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => setSelectedOrder(order)}
                                            class={`
                                        ${stock.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                                        >
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                    <input id={`checkbox-table-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for={`checkbox-table-${index}`} class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {stock.id}
                                            </th>
                                            <td class="px-6 py-4">
                                                {stock.name.toString()}
                                            </td>
                                            <td class="px-6 py-4">
                                                <CButton color='red' name='-' onclick={() => setQuantity(quantity - 1)}/>
                                                {'  ' + stock.quantity.toString()}
                                                <CButton color='green' name='+' onclick={() => setQuantity(quantity + 1)}/>          
                                            </td>
                                            <td class="px-6 py-4">
                                                {stock.price.toString()}€
                                            </td>
                                            <td class="px-6 py-4">
                                                {stock.ongoing_stock.toString()}
                                            </td>
                                            <td class="px-6 py-4">
                                                ${stock.total_price.toFixed(2)}
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
        </div>
    )
}
