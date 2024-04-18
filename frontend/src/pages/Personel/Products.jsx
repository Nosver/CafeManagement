import React, { useState } from 'react';
import { Siderbar_1 } from '../../components/personel/Siderbar_1';
import { InsertButton } from '../../components/personel/InsertButton';
import { ItemPopup } from '../../components/personel/ItemPopup';
import { SearchBar } from '../../components/personel/SearchBar';

class product {
    constructor(id, name, quantity, price, total_price, category) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.total_price = total_price;
    }

    static getRandomProduct() {
        const id = Math.floor(Math.random() * 1000);
        const names = ['Premium Arabic Coffee', 'Premium Italian Latte', 'Standard Espresso', 'Strawberry Milkshake', 'Caramel Frappuccino', 'Vanilla Ice Cream', 'Black Coffee', 'Green Tea', 'Blueberry Muffin', 'Chocolate Chip Cookie', 'Cinnamon Roll', 'Apple Pie', 'Cheese Cake', 'Brownie', 'Mocha', 'Cappuccino', 'Hot Chocolate', 'Iced Tea', 'Lemonade', 'Orange Juice'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomQuantity = Math.floor(Math.random() * 100) + 1;
        const randomPrice = (Math.random() * 20.0).toFixed(2);
        const randomTotalPrice = randomPrice * randomQuantity;

        return new product(id, randomName, randomQuantity, randomPrice, randomTotalPrice, 'Other');
    }

    static getAllProducts() {
        const products = [];
        const names = ['Premium Arabic Coffee', 'Premium Italian Latte', 'Standard Espresso', 'Strawberry Milkshake', 'Caramel Frappuccino', 'Vanilla Ice Cream', 'Black Coffee', 'Green Tea', 'Blueberry Muffin', 'Chocolate Chip Cookie', 'Cinnamon Roll', 'Apple Pie', 'Cheese Cake', 'Brownie', 'Mocha', 'Cappuccino', 'Hot Chocolate', 'Iced Tea', 'Lemonade', 'Orange Juice'];
        const categories = ['Coffee', 'Milkshake', 'Frappuccino', 'Ice Cream', 'Tea', 'Muffin', 'Cookie', 'Roll', 'Pie', 'Cake', 'Brownie', 'Mocha', 'Cappuccino', 'Hot Chocolate', 'Iced Tea', 'Lemonade', 'Juice'];

        for (let name of names) {
            const productName = name;
            const productPrice = (Math.random() * 20.0).toFixed(2);
            const productQuantity = Math.floor(Math.random() * 100) + 1;
            const productIngredient = name; // Assuming the ingredient is the same as the product name
            const randomID = Math.floor(Math.random() * 1000);

            // Assign a category based on the product name
            const productCategory = categories.find(category => productName.includes(category)) || 'Other';

            const newProduct = new product(randomID, productName, productQuantity, productPrice, productPrice * productQuantity, productCategory);
            products.push(newProduct);
        }

        return products;
    }
}

export const Products = () => {

    // Create random products for cafe
    const products = product.getAllProducts();

    const [productsArray, setProductsArray] = useState(products);
    const [productsShow, setProductsShow] = useState(productsArray);

    const [showPopup, setShowPopup] = useState(false);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const [showPopup_edit, setShowPopup_edit] = useState(false);
    const openPopup_edit = () => setShowPopup_edit(true);
    const closePopup_edit = () => setShowPopup_edit(false);

    const searchButtonSubmit = (keyword) => {
        if(keyword == ''){
            if(productsShow.length != productsArray.length)
                setProductsShow(productsArray);
            return;
        }

        let newArr = productsArray.filter( product =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );   
        setProductsShow(newArr);
    }

    if (showPopup || showPopup_edit) {
        document.body.classList.add('overflow-hidden')
    } else {
        document.body.classList.remove('overflow-hidden')
    }

    return (
        <div>

            <Siderbar_1 />

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div class='flex flex-row w-6/6 mb-3'>
                        <SearchBar searchButtonSubmit = {searchButtonSubmit} class='mr-auto'></SearchBar>
                        <InsertButton description="Add new product" onClick={openPopup} />
                    </div>
                    <div className="flex h-screen overflow-hidden">

                        {/* Content area */}
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                            <main>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Product Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Unit Price
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Total Price
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                                        {showPopup &&
                                            <ItemPopup
                                                title="Add New Product"
                                                closePopup={closePopup}
                                                inputs={[
                                                    { id: 'name', label: 'Name', type: 'text', hint: 'Type product name' },
                                                    { id: 'price', label: 'Price', type: 'number', hint: '$2999' },
                                                    { id: 'category', label: 'Category', type: 'select', hint: 'Select category' },
                                                    { id: 'quantity', label: 'Quantity', type: 'number', hint: 'Type quantity' },
                                                    { id: 'img_path', label: 'Image', type: 'text', hint: 'Type image path' },
                                                    { id: 'description', label: 'Product Description', type: 'textarea', hint: 'Write product description here' }
                                                ]}
                                            />
                                        }

                                        {showPopup_edit &&
                                            <ItemPopup
                                                title="Edit Product"
                                                submitButtonDescription='Edit Product'
                                                closePopup={closePopup_edit}
                                                inputs={[
                                                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Type product name' },
                                                    { id: 'price', label: 'Price', type: 'number', placeholder: '$2999' },
                                                    { id: 'category', label: 'Category', type: 'select', placeholder: 'Select category' },
                                                    { id: 'quantity', label: 'Quantity', type: 'number', placeholder: 'Type quantity' },
                                                    { id: 'img_path', label: 'Image', type: 'text', placeholder: 'Type image path' },
                                                    { id: 'description', label: 'Product Description', type: 'textarea', placeholder: 'Write product description here' }
                                                ]}
                                            />
                                        }

                                        {productsShow.map((product, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => setSelectedOrder(order)}
                                                class={`
                                            ${product.quantity == 1 ? 'bg-red-400' : product.quantity < 5 ? 'bg-red-300' : product.quantity < 10 ? 'bg-red-200' : product.quantity < 20 ? 'bg-red-100' : 'bg-white'} border-b dark:bg-gray-800 dark:border-black-700 hover:bg-white dark:hover:bg-gray-600 }`}
                                            >
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {product.id}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {product.name.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.category.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.quantity.toString()}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {product.price.toString()}€
                                                </td>

                                                <td class="px-6 py-4">
                                                    ${product.total_price.toFixed(2)}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div
                                                        onClick={() => setShowPopup_edit(true)}
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
            </div>


        </div>
    )
}
