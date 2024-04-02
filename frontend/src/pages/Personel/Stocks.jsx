import React from 'react'
import Sidebar from '../../imported-assets/partials/Sidebar';
import Header from '../../imported-assets/partials/Header';
import { useState } from 'react';
import { CButton } from '../../components/CButton';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { Edit_Product_Popup } from '../../components/personel/Edit_Product_Popup';
import { Create_Stock } from '../../components/Create_Stock';
import { InsertButton } from '../../components/personel/InsertButton';
import { AddItemPopup } from '../../components/personel/AddItemPopup';

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
        const names = [
            'Arabic Bean',
            'Milk',
            'Water',
            'Syrup',
            'Sugar',
            'Ice',
            'Turkish Coffee',
            'Tea Leafs',
            'Raw Chocolate',
            'Yoghurt',
            'Cake',
            'Vanilla Extract',
            'Cinnamon',
            'Whipped Cream',
            'Caramel Sauce',
            'Hazelnut Syrup',
            'Almond Milk',
            'Oat Milk',
            'Soy Milk',
            'Matcha Powder',
            'Cocoa Powder',
            'Espresso Shot',
            'Chai Concentrate',
            'Pumpkin Spice',
            'Peppermint Syrup'
        ];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPrice = Math.floor(Math.random() * 10.0) + 1.0;
        const randomQuantity = Math.floor(Math.random() * 100) + 1;

        return new stock(id, randomName, randomPrice, randomQuantity);
    }

    static getAllStocks() {
        const stocks = [];
        const names = [
            'Arabic Bean',
            'Milk',
            'Water',
            'Syrup',
            'Sugar',
            'Ice',
            'Turkish Coffee',
            'Tea Leafs',
            'Raw Chocolate',
            'Yoghurt',
            'Cake',
            'Vanilla Extract',
            'Cinnamon',
            'Whipped Cream',
            'Caramel Sauce',
            'Hazelnut Syrup',
            'Almond Milk',
            'Oat Milk',
            'Soy Milk',
            'Matcha Powder',
            'Cocoa Powder',
            'Espresso Shot',
            'Chai Concentrate',
            'Pumpkin Spice',
            'Peppermint Syrup'
        ];
        for (name in names) {
            stocks.push(new stock(name, names[name], Math.floor(Math.random() * 10.0) + 1.0, Math.floor(Math.random() * 100) + 1));
        }
        return stocks;
    }

}

export const Stocks = () => {

    // Create random stocks for cafe
    const stocks = stock.getAllStocks();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [quantity, setQuantity] = useState(stock.quantity);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    return (
        <div>

            <Siderbar_1 />


            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <main>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="p-4">
                                        <InsertButton description="Add new stock" onClick={openPopup} />
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Unit Price
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

                                {showPopup &&
                                    <AddItemPopup
                                        title="Add new stock"
                                        closePopup={closePopup}
                                        inputs={[
                                            { id: 'name', name: 'name', type: 'text', label: 'Name', placeholder: 'Enter the name' },
                                            { id: 'quantity', name: 'quantity', type: 'number', label: 'Quantity', placeholder: 'Enter the quantity' },
                                            { id: 'unit_price', name: 'unit_price', type: 'number', label: 'Unit Price', placeholder: 'Enter the unit price' },
                                        ]}
                                    />
                                }

                                {isPopupOpen && <Edit_Product_Popup closePopup={() => setIsPopupOpen(false)} />}

                                {stocks.map((stock, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => setSelectedOrder(order)}
                                        class={`
                                            ${stock.quantity == 1 ? 'bg-red-400' : stock.quantity < 5 ? 'bg-red-300' : stock.quantity < 10 ? 'bg-red-200' : stock.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
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
                                            {stock.quantity.toString()}
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
                                            <div
                                                onClick={() => setIsPopupOpen(true)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                            >
                                                Edit
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>

        </div>
    )
}
